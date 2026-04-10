
-- Drop old restrictive policies
DROP POLICY IF EXISTS "Users can view their own couples" ON public.couples;
DROP POLICY IF EXISTS "Users can update couples they belong to" ON public.couples;
DROP POLICY IF EXISTS "Users can view own or open couples" ON public.couples;
DROP POLICY IF EXISTS "Users can update couples they belong to or join open ones" ON public.couples;

-- SELECT: own couples + open couples (needed for code lookup)
CREATE POLICY "Users can view own or open couples"
ON public.couples
FOR SELECT
TO authenticated
USING (
  auth.uid() = partner_a
  OR auth.uid() = partner_b
  OR partner_b IS NULL
);

-- UPDATE: members can update, or anyone can join an open couple
CREATE POLICY "Users can update or join couples"
ON public.couples
FOR UPDATE
TO authenticated
USING (
  auth.uid() = partner_a
  OR auth.uid() = partner_b
  OR partner_b IS NULL
)
WITH CHECK (
  auth.uid() = partner_a
  OR auth.uid() = partner_b
);
