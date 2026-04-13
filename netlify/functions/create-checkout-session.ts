import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

import { billingPlanConfig, isBillingPlan } from "./_shared/billing";
import { buildCorsHeaders } from "./_shared/cors";

type FunctionResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

const json = (statusCode: number, body: unknown, requestOrigin?: string): FunctionResponse => ({
  statusCode,
  headers: {
    ...buildCorsHeaders(requestOrigin),
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const getOrigin = (rawUrl?: string, originHeader?: string) => {
  if (originHeader) return originHeader;
  if (!rawUrl) return "http://localhost:8888";
  try {
    return new URL(rawUrl).origin;
  } catch {
    return "http://localhost:8888";
  }
};

const extractBearerToken = (authorizationHeader?: string) => {
  if (!authorizationHeader) return null;
  const [type, token] = authorizationHeader.split(" ");
  if (!type || !token) return null;
  if (type.toLowerCase() !== "bearer") return null;
  return token.trim();
};

export const config = {
  path: "/api/create-checkout-session",
};

export const handler = async (event: {
  httpMethod?: string;
  body?: string | null;
  headers?: Record<string, string | undefined>;
  rawUrl?: string;
}): Promise<FunctionResponse> => {
  const requestOrigin = event.headers?.origin || event.headers?.Origin;

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: buildCorsHeaders(requestOrigin),
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" }, requestOrigin);
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secretKey) {
    return json(500, { error: "Stripe secret key is missing." }, requestOrigin);
  }
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return json(500, { error: "Supabase server env vars are missing." }, requestOrigin);
  }

  let parsedBody: { plan?: string; userId?: string; email?: string };
  try {
    parsedBody = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body." }, requestOrigin);
  }

  const plan = parsedBody.plan ?? "";
  const userId = parsedBody.userId?.trim();
  const email = parsedBody.email?.trim();

  if (!isBillingPlan(plan)) {
    return json(400, { error: "Invalid plan." }, requestOrigin);
  }

  if (!userId) {
    return json(400, { error: "User ID is required." }, requestOrigin);
  }

  const token = extractBearerToken(event.headers?.authorization || event.headers?.Authorization);
  if (!token) {
    return json(401, { error: "Missing bearer token." }, requestOrigin);
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  const authResult = await supabaseAdmin.auth.getUser(token);
  const authenticatedUser = authResult.data.user;
  if (!authenticatedUser) {
    return json(401, { error: "Invalid session token." }, requestOrigin);
  }
  if (authenticatedUser.id !== userId) {
    return json(403, { error: "User mismatch for checkout request." }, requestOrigin);
  }

  const priceId = process.env[billingPlanConfig[plan].envPriceKey];
  if (!priceId) {
    return json(500, { error: `Missing price id for plan ${plan}.` }, requestOrigin);
  }

  const stripe = new Stripe(secretKey);
  const origin = getOrigin(event.rawUrl, event.headers?.origin);
  const successUrl = process.env.STRIPE_CHECKOUT_SUCCESS_URL || `${origin}/pricing?billing=success`;
  const cancelUrl = process.env.STRIPE_CHECKOUT_CANCEL_URL || `${origin}/pricing?billing=canceled`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      customer_email: authenticatedUser.email || email || undefined,
      client_reference_id: userId,
      metadata: {
        plan,
        supabase_user_id: userId,
      },
      subscription_data: {
        metadata: {
          plan,
          supabase_user_id: userId,
        },
      },
    });

    return json(200, { url: session.url }, requestOrigin);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe checkout creation failed.";
    return json(500, { error: message }, requestOrigin);
  }
};
