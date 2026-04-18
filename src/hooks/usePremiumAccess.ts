import { useMemo } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { getEffectiveMembershipTier, isPremiumTier, type MembershipTier } from "@/lib/Premium";

export type PremiumAccessState = {
  membershipTier: MembershipTier;
  hasPremiumAccess: boolean;
  entitlementResolved: boolean;
};

export const usePremiumAccess = (): PremiumAccessState => {
  const { user, loading } = useAuth();

  const membershipTier = useMemo(() => getEffectiveMembershipTier(user), [user]);
  const hasPremiumAccess = isPremiumTier(membershipTier);

  return {
    membershipTier,
    hasPremiumAccess,
    entitlementResolved: !loading,
  };
};
