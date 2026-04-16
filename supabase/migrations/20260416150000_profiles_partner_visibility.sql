-- FIX: Allow connected partners to read each other's profiles.
--
-- Problem: the profiles SELECT policy is USING (auth.uid() = user_id), meaning
-- each user can only read their own profile.  When AppHome tries to fetch the
-- partner's display_name it always gets NULL and the UI falls back to "your
-- beloved" / "votre partenaire" instead of the partner's real name.
--
-- Solution: add a second SELECT policy that allows reading a profile when the
-- reader and the profile owner share an active couple record.

DROP POLICY IF EXISTS "Partners can view each other's profiles" ON public.profiles;

CREATE POLICY "Partners can view each other's profiles"
ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.couples
    WHERE
      (partner_a = auth.uid() AND partner_b = user_id)
      OR
      (partner_b = auth.uid() AND partner_a = user_id)
  )
);
