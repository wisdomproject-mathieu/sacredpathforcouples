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
  - `/app/paths` — Sacred Paths (Tantra free, Tao free, Kama Sutra premium, Sacred Sexuality premium)
  - `/app/authors` — Guiding Authors (Osho free, Deida free, Anand free, Richardson premium, Chia premium)

## Nav items (AppLayout)
Home, Connect, Paths, Authors — NO Reconnect in nav

## Free/Premium structure
- Each free Path: 1 quote + 1 ritual free, 2 premium quotes + 2 premium rituals
- Each free Author: 1 quote + 1 ritual free, 1 premium quote + 1 premium ritual
- Reconnect: 2 free rituals (Synchronized Breath, Candle Gazing), 4 premium
