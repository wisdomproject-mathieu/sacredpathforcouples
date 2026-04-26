-- Ritual Sessions: log of completed ritual timer runs
CREATE TABLE public.ritual_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id uuid NOT NULL,
  user_id uuid NOT NULL,
  ritual_title text NOT NULL,
  ritual_source text NOT NULL DEFAULT 'sacred-repair',
  chapter_id text,
  minutes_spent integer NOT NULL CHECK (minutes_spent >= 0),
  note text,
  completed_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_ritual_sessions_couple_completed
  ON public.ritual_sessions (couple_id, completed_at DESC);

ALTER TABLE public.ritual_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partners can view their couple ritual sessions"
ON public.ritual_sessions
FOR SELECT
TO authenticated
USING (
  couple_id IN (
    SELECT couples.id
    FROM couples
    WHERE couples.partner_a = auth.uid() OR couples.partner_b = auth.uid()
  )
);

CREATE POLICY "Partners can insert ritual sessions for their couple"
ON public.ritual_sessions
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid()
  AND couple_id IN (
    SELECT couples.id
    FROM couples
    WHERE couples.partner_a = auth.uid() OR couples.partner_b = auth.uid()
  )
);

CREATE POLICY "Authors can delete their ritual sessions"
ON public.ritual_sessions
FOR DELETE
TO authenticated
USING (user_id = auth.uid());