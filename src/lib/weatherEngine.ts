import { useMemo } from "react";
import WEATHER_MATRIX_25 from "@/data/sacred_path_weather_matrix_25.json";
import {
  MASTER_RITUAL_REGISTRY,
  type MasterRitualRegistryEntry,
} from "@/lib/masterRitualRegistry";

type AppWeather =
  | "open"
  | "tender"
  | "playful"
  | "stressed"
  | "longing"
  | "erotic"
  | "tired"
  | "reassurance";

type MatrixWeather = "stormy" | "cloudy" | "warm" | "electric" | "radiant";

type MatrixEntry = (typeof WEATHER_MATRIX_25)[keyof typeof WEATHER_MATRIX_25];
type RitualLibraryCard = MasterRitualRegistryEntry;

export type SelectedDailyMainCard = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  intimacyLevel: string;
  primaryNeed: string;
  ritualSteps: string[];
  theme: string;
};

export type WeatherEngineDebugState = {
  partnerAWeather: string | null;
  partnerBWeather: string | null;
  normalizedKey: string | null;
  archetype: string | null;
  selectedMainCardId: string | null;
  alternateIds: string[];
  recentHistory: string[];
};

export type SelectedDailyMainCardState = {
  selectedDailyMainCard: SelectedDailyMainCard | null;
  alternates: SelectedDailyMainCard[];
  normalizedKey: string | null;
  archetype: string | null;
  debug: WeatherEngineDebugState;
  ready: boolean;
};

type ResolveInput = {
  partnerAWeather: string | null | undefined;
  partnerBWeather: string | null | undefined;
  coupleId?: string | null;
};

const WEATHER_TO_MATRIX: Record<AppWeather, MatrixWeather> = {
  stressed: "stormy",
  tired: "cloudy",
  tender: "warm",
  reassurance: "warm",
  playful: "electric",
  open: "radiant",
  longing: "radiant",
  erotic: "radiant",
};

const WEATHER_VARIANCE_INDEX: Record<AppWeather, number> = {
  open: 0,
  tender: 1,
  playful: 2,
  stressed: 3,
  longing: 4,
  erotic: 5,
  tired: 6,
  reassurance: 7,
};

const isRadiantSet = (value: string | null | undefined) =>
  value === "open" || value === "longing" || value === "erotic";

const libraryById = new Map<string, RitualLibraryCard>(MASTER_RITUAL_REGISTRY.map((card) => [card.id, card]));

const historyKey = (coupleId?: string | null) => `sacred_path_weather_card_history_${coupleId || "global"}`;
const dailySelectionKey = (coupleId?: string | null) => `sacred_path_daily_selected_card_${coupleId || "global"}`;
const todayKey = () => new Date().toDateString();

const readHistory = (coupleId?: string | null): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(historyKey(coupleId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
};

const writeHistory = (coupleId: string | null | undefined, history: string[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(historyKey(coupleId), JSON.stringify(history.slice(-30)));
  } catch {
    // ignore storage errors in private contexts
  }
};

type PersistedSelection = {
  dayKey: string;
  normalizedKey: string;
  weatherPairKey?: string;
  selectedId: string;
  alternateIds: string[];
};

const readDailySelection = (coupleId?: string | null): PersistedSelection | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(dailySelectionKey(coupleId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedSelection;
    if (
      typeof parsed?.dayKey === "string" &&
      typeof parsed?.normalizedKey === "string" &&
      typeof parsed?.selectedId === "string" &&
      Array.isArray(parsed?.alternateIds)
    ) {
      return parsed;
    }
  } catch {
    // ignore parse/storage issues
  }
  return null;
};

const writeDailySelection = (coupleId: string | null | undefined, value: PersistedSelection) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(dailySelectionKey(coupleId), JSON.stringify(value));
  } catch {
    // ignore storage errors in private contexts
  }
};

const hashString = (value: string) =>
  Array.from(value).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 19);

const rotateBy = <T,>(items: T[], index: number): T[] => {
  if (!items.length) return [];
  const offset = ((index % items.length) + items.length) % items.length;
  if (!offset) return items.slice();
  return [...items.slice(offset), ...items.slice(0, offset)];
};

const normalizeSentence = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const isBoilerplateDescription = (value: string) => {
  const normalized = normalizeSentence(value);
  return (
    normalized.includes("a guided sequence aligned to the active couple weather combination") ||
    normalized.includes("a supporting practice chosen to reinforce tonight s main weather ritual")
  );
};

const toCard = (card: RitualLibraryCard | undefined, fallbackId: string): SelectedDailyMainCard | null => {
  if (!card) return null;
  const subtitle = typeof card.subtitle === "string" && !isBoilerplateDescription(card.subtitle) ? card.subtitle : "";
  const description = typeof card.description === "string" && !isBoilerplateDescription(card.description) ? card.description : "";
  return {
    id: card.id || fallbackId,
    title: card.title,
    subtitle,
    description,
    duration: card.duration,
    intimacyLevel: card.intimacyLevel,
    primaryNeed: card.primaryNeed,
    ritualSteps: Array.isArray(card.ritualSteps) ? card.ritualSteps.slice(0, 6) : [],
    theme: card.theme || "touch",
  };
};

const registryCards: SelectedDailyMainCard[] = MASTER_RITUAL_REGISTRY.map((entry) => toCard(entry, entry.id)).filter(
  (card): card is SelectedDailyMainCard => Boolean(card),
);

export const resolveTonightPathSixCards = (
  state: Pick<SelectedDailyMainCardState, "selectedDailyMainCard" | "alternates" | "normalizedKey">,
  limit = 6,
): SelectedDailyMainCard[] => {
  if (!state.selectedDailyMainCard) return [];

  const picks: SelectedDailyMainCard[] = [];
  const seenIds = new Set<string>();
  const addCard = (card: SelectedDailyMainCard | null | undefined) => {
    if (!card || seenIds.has(card.id) || picks.length >= limit) return;
    seenIds.add(card.id);
    picks.push(card);
  };

  addCard(state.selectedDailyMainCard);
  state.alternates.forEach(addCard);

  if (state.normalizedKey) {
    registryCards.forEach((card) => {
      if (picks.length >= limit) return;
      const source = libraryById.get(card.id);
      if (source?.weatherTags?.includes(state.normalizedKey as string)) addCard(card);
    });
  }

  const mainTheme = normalizeSentence(state.selectedDailyMainCard.theme || "");
  registryCards.forEach((card) => {
    if (picks.length >= limit) return;
    if (normalizeSentence(card.theme || "") === mainTheme) addCard(card);
  });

  const mainNeed = normalizeSentence(state.selectedDailyMainCard.primaryNeed || "");
  registryCards.forEach((card) => {
    if (picks.length >= limit) return;
    if (normalizeSentence(card.primaryNeed || "") === mainNeed) addCard(card);
  });

  const seed = state.normalizedKey || state.selectedDailyMainCard.id;
  const deterministicTail = registryCards
    .slice()
    .sort((a, b) => hashString(`${seed}:${a.id}`) - hashString(`${seed}:${b.id}`));
  deterministicTail.forEach(addCard);

  return picks.slice(0, limit);
};

const defaultState: SelectedDailyMainCardState = {
  selectedDailyMainCard: null,
  alternates: [],
  normalizedKey: null,
  archetype: null,
  ready: false,
  debug: {
    partnerAWeather: null,
    partnerBWeather: null,
    normalizedKey: null,
    archetype: null,
    selectedMainCardId: null,
    alternateIds: [],
    recentHistory: [],
  },
};

export const resolveSelectedDailyMainCard = (input: ResolveInput): SelectedDailyMainCardState => {
  const partnerAWeather = input.partnerAWeather ?? null;
  const partnerBWeather = input.partnerBWeather ?? null;
  const ready = Boolean(partnerAWeather && partnerBWeather);
  const recentHistory = readHistory(input.coupleId);

  if (!ready) {
    return {
      ...defaultState,
      debug: {
        ...defaultState.debug,
        partnerAWeather,
        partnerBWeather,
        recentHistory,
      },
    };
  }

  const radiantRichCase = isRadiantSet(partnerAWeather) && isRadiantSet(partnerBWeather);
  const weatherPairKey = `${partnerAWeather}|${partnerBWeather}`;
  const normalizedKey = radiantRichCase
    ? "radiant|radiant"
    : `${WEATHER_TO_MATRIX[partnerAWeather as AppWeather]}|${WEATHER_TO_MATRIX[partnerBWeather as AppWeather]}`;
  const matrixEntry: MatrixEntry | undefined = WEATHER_MATRIX_25[normalizedKey as keyof typeof WEATHER_MATRIX_25];
  if (!matrixEntry) {
    return {
      ...defaultState,
      ready: true,
      normalizedKey,
      debug: {
        partnerAWeather,
        partnerBWeather,
        normalizedKey,
        archetype: null,
        selectedMainCardId: null,
        alternateIds: [],
        recentHistory,
      },
    };
  }

  const hardcodedRichMain = radiantRichCase ? "riding_the_wave_of_bliss" : matrixEntry.main;
  const hardcodedRichAlternates = radiantRichCase
    ? ["karezza", "eight_embraces_mutual_massage", "slow_sex"]
    : matrixEntry.alternates;
  const candidates = Array.from(new Set([hardcodedRichMain, ...hardcodedRichAlternates]));
  const activeDayKey = todayKey();
  const persistedSelection = readDailySelection(input.coupleId);
  const recentLast7 = recentHistory.slice(-7);
  const persistedStillValid = Boolean(
    persistedSelection &&
      persistedSelection.dayKey === activeDayKey &&
      persistedSelection.normalizedKey === normalizedKey &&
      (persistedSelection.weatherPairKey ?? persistedSelection.normalizedKey) === weatherPairKey &&
      candidates.includes(persistedSelection.selectedId),
  );
  const pairSpecificOffset = (() => {
    if (!candidates.length || radiantRichCase) return 0;
    const a = WEATHER_VARIANCE_INDEX[partnerAWeather as AppWeather] ?? 0;
    const b = WEATHER_VARIANCE_INDEX[partnerBWeather as AppWeather] ?? 0;
    // Keep normalized matrix behavior but preserve nuance from the exact pair.
    return (a * 11 + b * 17 + hashString(normalizedKey)) % candidates.length;
  })();
  const candidateOrder = radiantRichCase ? candidates : rotateBy(candidates, pairSpecificOffset);
  const selectedId = persistedStillValid
    ? (persistedSelection as PersistedSelection).selectedId
    : candidateOrder.find((id) => !recentLast7.includes(id)) ?? candidateOrder[0] ?? hardcodedRichMain;
  const alternateIds = candidateOrder.filter((id) => id !== selectedId);
  const selectedCard = toCard(libraryById.get(selectedId), selectedId);
  const alternateCards = alternateIds
    .map((id) => toCard(libraryById.get(id), id))
    .filter((card): card is SelectedDailyMainCard => Boolean(card));

  if (selectedCard) {
    if (!selectedCard.description) {
      selectedCard.description = `Tonight centers on ${selectedCard.title}. ${selectedCard.duration} · ${selectedCard.intimacyLevel}. Focus: ${selectedCard.primaryNeed}.`;
    }
    if (!persistedStillValid) {
      const nextHistory = [...recentHistory, selectedCard.id];
      writeHistory(input.coupleId, nextHistory);
    }
    writeDailySelection(input.coupleId, {
      dayKey: activeDayKey,
      normalizedKey,
      weatherPairKey,
      selectedId: selectedCard.id,
      alternateIds,
    });
  }

  return {
    selectedDailyMainCard: selectedCard,
    alternates: alternateCards,
    normalizedKey,
    archetype: matrixEntry.archetype,
    ready,
    debug: {
      partnerAWeather,
      partnerBWeather,
      normalizedKey,
      archetype: matrixEntry.archetype,
      selectedMainCardId: selectedCard?.id ?? null,
      alternateIds,
      recentHistory: readHistory(input.coupleId).slice(-7),
    },
  };
};

export const useSelectedDailyMainCard = (input: ResolveInput): SelectedDailyMainCardState => {
  const resolved = useMemo(
    () =>
      resolveSelectedDailyMainCard({
        partnerAWeather: input.partnerAWeather ?? null,
        partnerBWeather: input.partnerBWeather ?? null,
        coupleId: input.coupleId ?? null,
      }),
    [input.coupleId, input.partnerAWeather, input.partnerBWeather],
  );
  return resolved;
};
