
CREATE TABLE public.memory_altar (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  author_id UUID NOT NULL,
  memory_type TEXT NOT NULL DEFAULT 'moment',
  title TEXT NOT NULL,
  content TEXT,
  pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.memory_altar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their couple memories"
ON public.memory_altar FOR SELECT TO authenticated
USING (couple_id IN (SELECT id FROM couples WHERE partner_a = auth.uid() OR partner_b = auth.uid()));

CREATE POLICY "Users can insert memories for their couple"
ON public.memory_altar FOR INSERT TO authenticated
WITH CHECK (
  author_id = auth.uid() AND
  couple_id IN (SELECT id FROM couples WHERE partner_a = auth.uid() OR partner_b = auth.uid())
);

CREATE POLICY "Users can delete their own memories"
ON public.memory_altar FOR DELETE TO authenticated
USING (author_id = auth.uid());
