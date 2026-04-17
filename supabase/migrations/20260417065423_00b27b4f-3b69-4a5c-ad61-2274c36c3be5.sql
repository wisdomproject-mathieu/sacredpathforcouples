-- Allow a user to read their partner's profile if they share an active couple row.
CREATE POLICY "Partners can view each other's profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.couples c
    WHERE
      (c.partner_a = auth.uid() AND c.partner_b = profiles.user_id)
      OR
      (c.partner_b = auth.uid() AND c.partner_a = profiles.user_id)
  )
);