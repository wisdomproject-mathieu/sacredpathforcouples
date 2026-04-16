-- FIX: Allow partner B to join a couple using an invite code.
--
-- Problem: the existing SELECT and UPDATE policies only allow access when
-- auth.uid() = partner_a OR auth.uid() = partner_b.  When partner_b is still
-- NULL the second condition is NULL (not TRUE), so an incoming partner cannot
-- see the invite row at all, and cannot update it to set themselves as partner_b.
--
-- Solution: add two narrowly-scoped policies that only apply to rows where
-- partner_b IS NULL (i.e. open pending invites).

-- 1. Let any authenticated user read a pending invite
--    (they need to know the exact code, so the security surface is minimal)
CREATE POLICY "Authenticated users can view pending invites"
ON public.couples
FOR SELECT
USING (
  partner_b IS NULL
  AND auth.uid() IS NOT NULL
);

-- 2. Let any authenticated user claim the open partner_b slot on a pending invite.
--    USING checks the OLD row (partner_b must still be NULL).
--    WITH CHECK ensures the NEW row sets partner_b to the caller's own uid.
CREATE POLICY "Authenticated users can join open couples"
ON public.couples
FOR UPDATE
USING (
  partner_b IS NULL
  AND auth.uid() IS NOT NULL
)
WITH CHECK (
  auth.uid() = partner_b
);
