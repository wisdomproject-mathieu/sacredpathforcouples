# Sacred Path weather engine kit for Codex

## Source truth from the uploaded PDF
The PDF contains 55 rituals across 10 practice families and names the source teachers and lineages for each ritual. Use this PDF inventory as canonical content for home cards and Tonight Path cards.

## Main bug to fix
- Stop collapsing unmatched weather pairs into one fallback card.
- The home main card and Tonight Path main ritual must come from the same selectedDailyMainCard state.
- Recompute immediately when either partner changes weather.
- Add anti-repeat history so the same main card is not shown again too soon.

## Deterministic implementation rules
1. Normalize each pair into a stable key like `stormy|warm`.
2. Resolve that key through the 25-combination matrix.
3. Pick the `main` ritual unless it appears in recent history.
4. If recent, use the first alternate not in the last 7 shown cards.
5. Save selectedDailyMainCard in shared state and read it from both Home and Tonight Path.
6. Add a dev-only debug panel showing partner A weather, partner B weather, normalized key, archetype, selected card, and recent history.
7. Remove any old generic default logic.

## Hardcoded richer case
open|longing|erotic + open|longing|erotic
=> riding_the_wave_of_bliss
alternates => karezza, eight_embraces_mutual_massage, slow_sex

## Input files
- data/sacred_path_weather_matrix_25.json
- data/sacred_path_ritual_library_55.json
