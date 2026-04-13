import type { User } from "@supabase/supabase-js";

export type MembershipTier = "free" | "sacred_monthly" | "sacred_yearly";

export const isPremiumTier = (tier?: MembershipTier | null) => {
  return tier === "sacred_monthly" || tier === "sacred_yearly";
};

const explicitTesterEmails = [
  "mathieu.escande@gmail.com",
  "eeeditka@seznam.cz",
];

const envTesterEmails = (import.meta.env.VITE_PREMIUM_TEST_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const premiumTesterEmails = new Set(
  [...explicitTesterEmails, ...envTesterEmails].map((email) => email.toLowerCase()),
);

export const hasPremiumTesterOverride = (email?: string | null) => {
  if (!email) return false;
  return premiumTesterEmails.has(email.toLowerCase());
};

export const getEffectiveMembershipTier = (user?: User | null): MembershipTier => {
  const userTier = (user?.user_metadata?.membership_tier ?? user?.app_metadata?.membership_tier) as MembershipTier | undefined;
  if (isPremiumTier(userTier)) {
    return userTier;
  }

  if (hasPremiumTesterOverride(user?.email)) {
    return "sacred_yearly";
  }

  return "free";
};
