import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
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
  path: "/api/create-customer-portal-session",
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

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!stripeSecret || !supabaseUrl || !supabaseServiceRoleKey) {
    return json(500, { error: "Missing server env vars for billing portal." }, requestOrigin);
  }

  let parsedBody: { userId?: string; email?: string };
  try {
    parsedBody = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body." }, requestOrigin);
  }

  const userId = parsedBody.userId?.trim();
  const email = parsedBody.email?.trim();
  if (!userId) {
    return json(400, { error: "User ID is required." }, requestOrigin);
  }

  const stripe = new Stripe(stripeSecret);
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  const token = extractBearerToken(event.headers?.authorization || event.headers?.Authorization);
  if (!token) {
    return json(401, { error: "Missing bearer token." }, requestOrigin);
  }

  try {
    const authResult = await supabaseAdmin.auth.getUser(token);
    const authenticatedUser = authResult.data.user;
    if (!authenticatedUser) {
      return json(401, { error: "Invalid session token." }, requestOrigin);
    }
    if (authenticatedUser.id !== userId) {
      return json(403, { error: "User mismatch for billing portal request." }, requestOrigin);
    }

    const { data: subscription } = await supabaseAdmin
      .from("billing_subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    let customerId = subscription?.stripe_customer_id ?? null;

    const queryEmail = authenticatedUser.email || email;
    if (!customerId && queryEmail) {
      const customers = await stripe.customers.list({
        email: queryEmail,
        limit: 1,
      });
      customerId = customers.data[0]?.id ?? null;
    }

    if (!customerId) {
      return json(404, { error: "No Stripe customer found for this account yet." }, requestOrigin);
    }

    const origin = getOrigin(event.rawUrl, event.headers?.origin);
    const returnUrl = process.env.STRIPE_CUSTOMER_PORTAL_RETURN_URL || `${origin}/pricing`;
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return json(200, { url: session.url }, requestOrigin);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create billing portal session.";
    return json(500, { error: message }, requestOrigin);
  }
};
