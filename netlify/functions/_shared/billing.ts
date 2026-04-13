export type BillingPlan = "monthly" | "yearly" | "founding";
export type MembershipTier = "free" | "sacred_monthly" | "sacred_yearly";

type PlanConfig = {
  envPriceKey: string;
  tier: MembershipTier;
};

export const billingPlanConfig: Record<BillingPlan, PlanConfig> = {
  monthly: {
    envPriceKey: "STRIPE_PRICE_SACRED_MONTHLY",
    tier: "sacred_monthly",
  },
  yearly: {
    envPriceKey: "STRIPE_PRICE_SACRED_YEARLY",
    tier: "sacred_yearly",
  },
  founding: {
    envPriceKey: "STRIPE_PRICE_SACRED_FOUNDING",
    tier: "sacred_yearly",
  },
};

export const isBillingPlan = (value: string): value is BillingPlan => {
  return value === "monthly" || value === "yearly" || value === "founding";
};

export const findTierByStripePriceId = (priceId?: string | null): MembershipTier => {
  if (!priceId) return "free";

  const matchingConfig = Object.values(billingPlanConfig).find(
    (config) => process.env[config.envPriceKey] === priceId,
  );

  return matchingConfig?.tier ?? "free";
};
