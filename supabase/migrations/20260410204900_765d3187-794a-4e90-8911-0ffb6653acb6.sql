
CREATE TABLE public.partner_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id uuid REFERENCES public.couples(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid NOT NULL,
  message_type text NOT NULL DEFAULT 'whisper',
  content text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.partner_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their couple messages"
  ON public.partner_messages FOR SELECT TO authenticated
  USING (
    couple_id IN (
      SELECT id FROM public.couples 
      WHERE partner_a = auth.uid() OR partner_b = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages to their couple"
  ON public.partner_messages FOR INSERT TO authenticated
  WITH CHECK (
    sender_id = auth.uid() AND
    couple_id IN (
      SELECT id FROM public.couples 
      WHERE partner_a = auth.uid() OR partner_b = auth.uid()
    )
  );

ALTER PUBLICATION supabase_realtime ADD TABLE public.partner_messages;
