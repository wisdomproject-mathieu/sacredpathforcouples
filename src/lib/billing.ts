export type BillingPlan = "monthly" | "yearly" | "founding";

const planLinkEnvMap: Record<BillingPlan, string | undefined> = {
  monthly: import.meta.env.VITE_STRIPE_PAYMENT_LINK_MONTHLY,
  yearly: import.meta.env.VITE_STRIPE_PAYMENT_LINK_YEARLY,
  founding: import.meta.env.VITE_STRIPE_PAYMENT_LINK_FOUNDING,
};

export const getDirectPaymentLink = (plan: BillingPlan) => {
  const value = planLinkEnvMap[plan];
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
};

type CreateCheckoutSessionInput = {
  plan: BillingPlan;
  userId: string;
  email?: string;
};

export const createCheckoutSession = async ({ plan, userId, email }: CreateCheckoutSessionInput) => {
  const direct = getDirectPaymentLink(plan);
  if (direct) return direct;

  const response = await fetch("/.netlify/functions/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan,
      userId,
      email,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create checkout session.");
  }

  const payload = (await response.json()) as { url?: string };
  if (!payload.url) {
    throw new Error("Checkout URL missing in response.");
  }

  return payload.url;
};
