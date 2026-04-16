-- Allow users to delete couple records they are part of
CREATE POLICY "Users can delete their own couple record"
ON public.couples
FOR DELETE
USING (
  auth.uid() = partner_a OR auth.uid() = partner_b
);
