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
  accessToken: string;
  email?: string;
};

type CreateCustomerPortalSessionInput = {
  userId: string;
  accessToken: string;
  email?: string;
};

export const createCheckoutSession = async ({ plan, userId, accessToken, email }: CreateCheckoutSessionInput) => {
  const direct = getDirectPaymentLink(plan);
  if (direct) return direct;

  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
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

export const createCustomerPortalSession = async ({ userId, accessToken, email }: CreateCustomerPortalSessionInput) => {
  const response = await fetch("/api/create-customer-portal-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      userId,
      email,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create billing portal session.");
  }

  const payload = (await response.json()) as { url?: string };
  if (!payload.url) {
    throw new Error("Customer portal URL missing in response.");
  }

  return payload.url;
};
