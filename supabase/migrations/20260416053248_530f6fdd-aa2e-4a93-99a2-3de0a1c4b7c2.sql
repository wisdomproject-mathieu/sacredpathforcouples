CREATE POLICY "Users can delete own couples"
ON public.couples
FOR DELETE
USING (auth.uid() = partner_a OR auth.uid() = partner_b);