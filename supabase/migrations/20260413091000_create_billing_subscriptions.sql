CREATE TABLE IF NOT EXISTS public.billing_subscriptions (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_price_id TEXT,
  status TEXT NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  tier TEXT NOT NULL DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_billing_subscriptions_user_id
  ON public.billing_subscriptions(user_id);

CREATE INDEX IF NOT EXISTS idx_billing_subscriptions_customer_id
  ON public.billing_subscriptions(stripe_customer_id);

ALTER TABLE public.billing_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own billing subscription"
ON public.billing_subscriptions
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_proc
    WHERE proname = 'update_updated_at_column'
  ) THEN
    DROP TRIGGER IF EXISTS update_billing_subscriptions_updated_at ON public.billing_subscriptions;
    CREATE TRIGGER update_billing_subscriptions_updated_at
    BEFORE UPDATE ON public.billing_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END
$$;
