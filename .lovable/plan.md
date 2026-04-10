

# Sacred Path for Couples — Web App Build Plan

## Design System
- Dark theme: bg `#09040a`, gold accent `#c8924a`
- Fonts: Cormorant Garamond (headings) + Jost (body)
- Shiva-Shakti icon as app logo
- Mystical, sacred aesthetic throughout

## Phase 1: Foundation & Auth (Priority)
- Connect to Supabase project (`yjjwpvsutnllzhpjtaol`)
- Auth with email/password + Google OAuth
- User profiles table with couple_code field
- Protected routes and session management

## Phase 2: Partner Connect Flow
- **Screen A — "Find Your Person"**: Invite partner or enter code
- **Screen B — "Your Invite Code"**: Display generated couple code with copy/share
- **Screen C — "Enter Partner Code"**: Input field with validation
- Supabase `couples` table with RLS (partner_a, partner_b)
- Realtime subscription for partner join detection
- Auto-navigate to home when partner connects

## Phase 3: Stripe Payment Gateway
- Enable Stripe integration for $2.99/mo and $19.99/yr subscriptions
- 7-day free trial
- Paywall with blurred premium content pattern
- Premium status stored in Supabase, gated features in UI

## Phase 4: Marketing Landing Page
- Hero section with app value proposition
- Feature showcase (Intimacy Weather, The Thread, Daily Whisper, etc.)
- Teacher profiles preview (Osho, Deida, Chia, Richardson...)
- Pricing comparison table
- App Store download link (when ready)
- Privacy policy page

## Phase 5: Reconnect Page Icon Redesign
- Replace basic Lucide icons with custom tantra-inspired SVG icons
- Sacred geometry, lotus, chakra, flame, breath motifs
- Match the gold-on-dark aesthetic

## Pages & Routes
- `/` — Marketing landing page
- `/app` — Home (daily wisdom, weather, thread)
- `/app/connect` — Partner connect flow
- `/app/reconnect` — Reconnect page with new icons
- `/app/teachings` — Wisdom library with free/premium gating
- `/auth` — Login/signup
- `/privacy` — Privacy policy
- `/pricing` — Subscription plans

