import { useMemo } from "react";
import WEATHER_MATRIX_25 from "@/data/sacred_path_weather_matrix_25.json";
import RITUAL_LIBRARY_55 from "@/data/sacred_path_ritual_library_55.json";

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
type RitualLibraryCard = (typeof RITUAL_LIBRARY_55)[number];

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

const isRadiantSet = (value: string | null | undefined) =>
  value === "open" || value === "longing" || value === "erotic";

const libraryById = new Map<string, RitualLibraryCard>(RITUAL_LIBRARY_55.map((card) => [card.id, card]));

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

const toCard = (card: RitualLibraryCard | undefined, fallbackId: string): SelectedDailyMainCard | null => {
  if (!card) return null;
  return {
    id: card.id || fallbackId,
    title: card.title,
    subtitle: card.subtitle,
    description: card.description,
    duration: card.duration,
    intimacyLevel: card.intimacyLevel,
    primaryNeed: card.primaryNeed,
    ritualSteps: Array.isArray(card.ritualSteps) ? card.ritualSteps.slice(0, 6) : [],
    theme: card.theme || "touch",
  };
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
      candidates.includes(persistedSelection.selectedId),
  );
  const selectedId = persistedStillValid
    ? (persistedSelection as PersistedSelection).selectedId
    : candidates.find((id) => !recentLast7.includes(id)) ?? hardcodedRichMain;
  const alternateIds = hardcodedRichAlternates.filter((id) => id !== selectedId);
  const selectedCard = toCard(libraryById.get(selectedId), selectedId);
  const alternateCards = alternateIds
    .map((id) => toCard(libraryById.get(id), id))
    .filter((card): card is SelectedDailyMainCard => Boolean(card));

  if (selectedCard) {
    if (!persistedStillValid) {
      const nextHistory = [...recentHistory, selectedCard.id];
      writeHistory(input.coupleId, nextHistory);
    }
    writeDailySelection(input.coupleId, {
      dayKey: activeDayKey,
      normalizedKey,
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
