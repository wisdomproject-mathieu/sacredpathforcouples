# Sacred Path for Couples

## Local development

1. Copy `.env.example` to `.env` and fill values.
2. Install deps: `npm install`
3. Run app: `npm run dev`

## Premium tester override

The app supports premium tester email overrides through:

- hardcoded tester emails in `src/lib/Premium.ts`
- `VITE_PREMIUM_TEST_EMAILS` in `.env`

Current tester emails include:

- `mathieu.escande@gmail.com`
- `eeeditka@seznam.cz`

## Stripe billing flow

Frontend starts checkout from `src/pages/Pricing.tsx` via:

- `netlify/functions/create-checkout-session.ts`
- `netlify/functions/stripe-webhook.ts`
- `netlify/functions/create-customer-portal-session.ts`

Function routes in production are exposed through `/api/*`:

- `/api/create-checkout-session`
- `/api/create-customer-portal-session`
- `/api/stripe-webhook` (use this URL in Stripe webhook settings)

Webhook and subscription state are persisted in:

- `supabase/migrations/20260413091000_create_billing_subscriptions.sql`

Required env vars are listed in `.env.example`.
