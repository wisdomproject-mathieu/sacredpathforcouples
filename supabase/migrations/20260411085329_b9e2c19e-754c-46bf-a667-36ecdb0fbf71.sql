
-- Weather entries for daily check-ins
CREATE TABLE public.weather_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  state TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.weather_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their couple weather" ON public.weather_entries
  FOR SELECT TO authenticated
  USING (couple_id IN (SELECT id FROM couples WHERE partner_a = auth.uid() OR partner_b = auth.uid()));

CREATE POLICY "Users can insert their own weather" ON public.weather_entries
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND couple_id IN (SELECT id FROM couples WHERE partner_a = auth.uid() OR partner_b = auth.uid()));

-- Ritual items (seeded content library)
CREATE TABLE public.ritual_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  hook TEXT,
  item_type TEXT NOT NULL DEFAULT 'ritual',
  category TEXT NOT NULL DEFAULT 'presence',
  duration TEXT,
  tone TEXT,
  intensity INTEGER DEFAULT 1,
  steps JSONB DEFAULT '[]'::jsonb,
  premium_required BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ritual_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read rituals" ON public.ritual_items
  FOR SELECT TO authenticated USING (true);

-- Pathways
CREATE TABLE public.pathways (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration_days INTEGER NOT NULL DEFAULT 7,
  premium_required BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.pathways ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read pathways" ON public.pathways
  FOR SELECT TO authenticated USING (true);

-- Pathway progress
CREATE TABLE public.pathway_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  pathway_id UUID NOT NULL REFERENCES public.pathways(id) ON DELETE CASCADE,
  current_day INTEGER NOT NULL DEFAULT 1,
  completed_days JSONB DEFAULT '[]'::jsonb,
  last_opened_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(couple_id, pathway_id)
);

ALTER TABLE public.pathway_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their couple progress" ON public.pathway_progress
  FOR SELECT TO authenticated
  USING (couple_id IN (SELECT id FROM couples WHERE partner_a = auth.uid() OR partner_b = auth.uid()));

CREATE POLICY "Users can insert progress" ON public.pathway_progress
  FOR INSERT TO authenticated
  WITH CHECK (couple_id IN (SELECT id FROM couples WHERE partner_a = auth.uid() OR partner_b = auth.uid()));

CREATE POLICY "Users can update their couple progress" ON public.pathway_progress
  FOR UPDATE TO authenticated
  USING (couple_id IN (SELECT id FROM couples WHERE partner_a = auth.uid() OR partner_b = auth.uid()));

-- Altar items (unified saved items)
CREATE TABLE public.altar_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  item_type TEXT NOT NULL DEFAULT 'moment',
  source_id TEXT,
  title TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.altar_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their couple altar" ON public.altar_items
  FOR SELECT TO authenticated
  USING (couple_id IN (SELECT id FROM couples WHERE partner_a = auth.uid() OR partner_b = auth.uid()));

CREATE POLICY "Users can add to altar" ON public.altar_items
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND couple_id IN (SELECT id FROM couples WHERE partner_a = auth.uid() OR partner_b = auth.uid()));

CREATE POLICY "Users can delete their altar items" ON public.altar_items
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Enable realtime for weather entries
ALTER PUBLICATION supabase_realtime ADD TABLE public.weather_entries;
