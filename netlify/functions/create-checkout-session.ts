import Stripe from "stripe";

import { billingPlanConfig, isBillingPlan } from "./_shared/billing";

type FunctionResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

const json = (statusCode: number, body: unknown): FunctionResponse => ({
  statusCode,
  headers: {
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

export const handler = async (event: {
  httpMethod?: string;
  body?: string | null;
  headers?: Record<string, string | undefined>;
  rawUrl?: string;
}): Promise<FunctionResponse> => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return json(500, { error: "Stripe secret key is missing." });
  }

  let parsedBody: { plan?: string; userId?: string; email?: string };
  try {
    parsedBody = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body." });
  }

  const plan = parsedBody.plan ?? "";
  const userId = parsedBody.userId?.trim();
  const email = parsedBody.email?.trim();

  if (!isBillingPlan(plan)) {
    return json(400, { error: "Invalid plan." });
  }

  if (!userId) {
    return json(400, { error: "User ID is required." });
  }

  const priceId = process.env[billingPlanConfig[plan].envPriceKey];
  if (!priceId) {
    return json(500, { error: `Missing price id for plan ${plan}.` });
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
      customer_email: email || undefined,
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

    return json(200, { url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe checkout creation failed.";
    return json(500, { error: message });
  }
};
