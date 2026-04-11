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
  - `/app/space` — The Temple (partner space, requires couple connection)

## Nav items (AppLayout)
Home, Connect, Paths, Authors, Reconnect, Temple — NO Reconnect in nav per original spec but currently shown

## Temple tabs (PartnerSpace)
Home / Weather / Rituals / Messages / Guide / Repair / Pathways / Altar
- Positions merged under Rituals as sub-category toggle
- Temple Home is default entry point with greeting, weather status, tonight's ritual, quick actions

## DB Tables
- weather_entries — daily couple check-ins with state + optional note
- ritual_items — seeded library of rituals and positions
- pathways — multi-day couple journeys
- pathway_progress — tracks couple progress through pathways
- altar_items — saved rituals, vows, moments
- partner_messages — realtime couple messaging
- memory_altar — legacy, being replaced by altar_items

## Free/Premium structure
- Each free Path: 1 quote + 1 ritual free, 2 premium quotes + 2 premium rituals
- Each free Author: 1 quote + 1 ritual free, 1 premium quote + 1 premium ritual
- Reconnect: 2 free rituals (Synchronized Breath, Candle Gazing), 4 premium
- Rituals: 7 free, 4 premium
- Pathways: 2 free, 4 premium
