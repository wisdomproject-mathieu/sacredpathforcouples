
export type MembershipTier = "free" | "sacred_monthly" | "sacred_yearly";

export const isPremiumTier = (tier?: MembershipTier | null) => {
  return tier === "sacred_monthly" || tier === "sacred_yearly";
};