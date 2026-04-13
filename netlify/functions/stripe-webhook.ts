import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

import { findTierByStripePriceId, type MembershipTier } from "./_shared/billing";

type FunctionResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

const textResponse = (statusCode: number, body: string): FunctionResponse => ({
  statusCode,
  body,
});

const decodeBody = (event: { body?: string | null; isBase64Encoded?: boolean }) => {
  const raw = event.body || "";
  return event.isBase64Encoded ? Buffer.from(raw, "base64").toString("utf8") : raw;
};

export const config = {
  path: "/api/stripe-webhook",
};

const findUserIdFromSubscription = async (
  supabaseAdmin: ReturnType<typeof createClient>,
  subscriptionId: string,
  customerId?: string | null,
) => {
  const bySubscription = await supabaseAdmin
    .from("billing_subscriptions")
    .select("user_id")
    .eq("id", subscriptionId)
    .maybeSingle();

  if (bySubscription.data?.user_id) {
    return bySubscription.data.user_id;
  }

  if (!customerId) return null;

  const byCustomer = await supabaseAdmin
    .from("billing_subscriptions")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return byCustomer.data?.user_id ?? null;
};

const resolveMembershipTier = (subscription: Stripe.Subscription): MembershipTier => {
  const status = subscription.status;
  if (status !== "active" && status !== "trialing" && status !== "past_due") {
    return "free";
  }

  const firstPriceId = subscription.items.data[0]?.price?.id ?? null;
  return findTierByStripePriceId(firstPriceId);
};

const upsertBillingSubscription = async (
  supabaseAdmin: ReturnType<typeof createClient>,
  subscription: Stripe.Subscription,
  userId: string,
  tier: MembershipTier,
) => {
  const firstItem = subscription.items.data[0];

  await supabaseAdmin.from("billing_subscriptions").upsert({
    id: subscription.id,
    user_id: userId,
    stripe_customer_id:
      typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id,
    stripe_price_id: firstItem?.price?.id ?? null,
    status: subscription.status,
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    cancel_at_period_end: subscription.cancel_at_period_end,
    tier,
  });
};

const updateUserTier = async (
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string,
  tier: MembershipTier,
) => {
  const userResult = await supabaseAdmin.auth.admin.getUserById(userId);
  const existingUser = userResult.data.user;
  if (!existingUser) return;

  await supabaseAdmin.auth.admin.updateUserById(userId, {
    user_metadata: {
      ...(existingUser.user_metadata ?? {}),
      membership_tier: tier,
    },
    app_metadata: {
      ...(existingUser.app_metadata ?? {}),
      membership_tier: tier,
    },
  });
};

export const handler = async (event: {
  body?: string | null;
  headers?: Record<string, string | undefined>;
  isBase64Encoded?: boolean;
}): Promise<FunctionResponse> => {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!stripeSecret || !webhookSecret || !supabaseUrl || !supabaseServiceRoleKey) {
    return textResponse(500, "Missing server env vars for webhook.");
  }

  const stripe = new Stripe(stripeSecret);
  const signature = event.headers?.["stripe-signature"] || event.headers?.["Stripe-Signature"];
  if (!signature) {
    return textResponse(400, "Missing stripe signature.");
  }

  let parsedEvent: Stripe.Event;
  try {
    parsedEvent = stripe.webhooks.constructEvent(
      decodeBody(event),
      signature,
      webhookSecret,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid webhook signature.";
    return textResponse(400, message);
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    if (parsedEvent.type === "checkout.session.completed") {
      const session = parsedEvent.data.object as Stripe.Checkout.Session;
      if (session.mode === "subscription" && session.subscription) {
        const subscriptionId =
          typeof session.subscription === "string" ? session.subscription : session.subscription.id;
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const userId =
          session.metadata?.supabase_user_id ||
          session.client_reference_id ||
          subscription.metadata?.supabase_user_id ||
          null;

        if (userId) {
          const tier = resolveMembershipTier(subscription);
          await upsertBillingSubscription(supabaseAdmin, subscription, userId, tier);
          await updateUserTier(supabaseAdmin, userId, tier);
        }
      }
    }

    if (parsedEvent.type === "customer.subscription.created" || parsedEvent.type === "customer.subscription.updated") {
      const subscription = parsedEvent.data.object as Stripe.Subscription;
      const userId =
        subscription.metadata?.supabase_user_id ||
        (await findUserIdFromSubscription(
          supabaseAdmin,
          subscription.id,
          typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id,
        ));

      if (userId) {
        const tier = resolveMembershipTier(subscription);
        await upsertBillingSubscription(supabaseAdmin, subscription, userId, tier);
        await updateUserTier(supabaseAdmin, userId, tier);
      }
    }

    if (parsedEvent.type === "customer.subscription.deleted") {
      const subscription = parsedEvent.data.object as Stripe.Subscription;
      const userId =
        subscription.metadata?.supabase_user_id ||
        (await findUserIdFromSubscription(
          supabaseAdmin,
          subscription.id,
          typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id,
        ));

      if (userId) {
        await upsertBillingSubscription(supabaseAdmin, subscription, userId, "free");
        await updateUserTier(supabaseAdmin, userId, "free");
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook handling failed.";
    return textResponse(500, message);
  }

  return textResponse(200, "ok");
};
