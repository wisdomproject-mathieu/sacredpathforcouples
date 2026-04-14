---
name: App structure
description: Routes, nav items, and page organization
type: feature
---
## Routes
- `/` — Landing page
- `/auth` — Login/signup
- `/pricing` — Pricing plans
- `/privacy` — Privacy policy
- `/app` — Protected app shell (AppLayout)
  - `/app` — AppHome (hero, quotes, today's practice)
  - `/app/connect` — Partner connect flow
  - `/app/reconnect` — 6 rituals (2 free, 4 premium) — accessed via "Right Now" button, NOT in nav
  - `/app/paths` — Sacred Paths (Tantra free, Tao free, + 11 premium including Semen Retention)
  - `/app/authors` — Guiding Authors (Osho free, Deida free, Anand free, + 9 premium)
  - `/app/space` — The Temple (partner space, requires couple connection)

## Subscription model
- One subscription per couple (not per account)
- First partner subscribes, both get full access
- Premium banners target men: repair, closeness, intimacy, stamina, semen retention

## Nav items (AppLayout)
Home, Connect, Paths, Authors, Reconnect, Temple

## Temple tabs (PartnerSpace)
Home / Weather / Rituals / Messages / Guide / Repair / Pathways / Altar

## Paths (13 total)
Free: Tantra, Tao
Premium: Kama Sutra, Polarity, Embodied Heart, Shamanism, Slow Love, Qigong & Neidan, Kundalini/Kriya, Sufism, Buddhism Forum, Conscious Union, Semen Retention

## DB Tables
- weather_entries, ritual_items, pathways, pathway_progress, altar_items, partner_messages, memory_altar, couples, profiles
