import RITUAL_LIBRARY_55 from "@/data/sacred_path_ritual_library_55.json";
import RITUAL_RESERVE_30 from "@/data/sacred_path_ritual_reserve_30.json";
import type { SelectedDailyMainCard } from "@/lib/weatherEngine";

export type TonightTheme =
  | "breath"
  | "gaze"
  | "touch"
  | "embrace"
  | "movement"
  | "stillness"
  | "sound"
  | "union"
  | "emotional_clearing"
  | "energy";

type ResolveTonightPathInput = {
  weatherA?: string | null;
  weatherB?: string | null;
  normalizedKey?: string | null;
  archetype?: string | null;
  coupleId?: string | null;
  selectedMainCard: SelectedDailyMainCard | null;
  alternates: SelectedDailyMainCard[];
};

export type TonightPathResolved = {
  mainCard: SelectedDailyMainCard | null;
  themes: TonightTheme[];
  themedRituals: Record<TonightTheme, SelectedDailyMainCard[]>;
  defaultTheme: TonightTheme;
};

const allThemes: TonightTheme[] = [
  "breath",
  "gaze",
  "touch",
  "embrace",
  "movement",
  "stillness",
  "sound",
  "union",
  "emotional_clearing",
  "energy",
];

const asCard = (value: unknown): SelectedDailyMainCard | null => {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const id = typeof row.id === "string" ? row.id : "";
  const title = typeof row.title === "string" ? row.title : "";
  if (!id || !title) return null;
  const steps = Array.isArray(row.ritualSteps)
    ? row.ritualSteps.filter((step): step is string => typeof step === "string").slice(0, 6)
    : [];
  return {
    id,
    title,
    subtitle: typeof row.subtitle === "string" ? row.subtitle : "",
    description: typeof row.description === "string" ? row.description : "",
    duration: typeof row.duration === "string" ? row.duration : "7 minutes",
    intimacyLevel: typeof row.intimacyLevel === "string" ? row.intimacyLevel : "Gentle to medium",
    primaryNeed: typeof row.primaryNeed === "string" ? row.primaryNeed : "Connection",
    ritualSteps: steps.length ? steps : ["Begin with one shared breath and one sentence of intention."],
    theme: typeof row.theme === "string" ? row.theme : "touch",
  };
};

const normalizeText = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const classifyTheme = (card: SelectedDailyMainCard): TonightTheme => {
  const text = normalizeText(
    [card.theme, card.title, card.subtitle, card.description, card.primaryNeed, ...card.ritualSteps].join(" "),
  );
  if (/(breath|respir|coherent|exhale|inhale)/.test(text)) return "breath";
  if (/(gaze|eye|seeing|soft eye)/.test(text)) return "gaze";
  if (/(touch|palm|hand|contact|stroke)/.test(text)) return "touch";
  if (/(embrace|hug|holding|homecoming|yab yum|lataveshtitaka)/.test(text)) return "embrace";
  if (/(movement|rocking|shaking|twining|dynamic|dance)/.test(text)) return "movement";
  if (/(still|stillness|pause|slow|karezza|resting)/.test(text)) return "stillness";
  if (/(sound|voice|unsaid|gibberish|hum|speak|appreciation aloud)/.test(text)) return "sound";
  if (/(union|lovemaking|bliss|sexual|devotion|karezza|yab yum)/.test(text)) return "union";
  if (/(repair|clear|clearing|yes no|parts|shadow|truth|witness|emotion)/.test(text)) return "emotional_clearing";
  if (/(energy|chakra|orbit|fire|qi|vitality|alchem)/.test(text)) return "energy";
  return "touch";
};

const supportByPrimary: Record<TonightTheme, TonightTheme[]> = {
  breath: ["gaze", "stillness", "embrace", "touch"],
  gaze: ["breath", "stillness", "embrace", "touch"],
  touch: ["embrace", "breath", "gaze", "stillness"],
  embrace: ["breath", "touch", "stillness", "gaze"],
  movement: ["breath", "energy", "touch", "embrace"],
  stillness: ["breath", "gaze", "union", "embrace"],
  sound: ["emotional_clearing", "breath", "embrace", "stillness"],
  union: ["breath", "gaze", "stillness", "energy"],
  emotional_clearing: ["sound", "breath", "embrace", "stillness"],
  energy: ["breath", "stillness", "union", "movement"],
};

const supportByWeather = (weatherA?: string | null, weatherB?: string | null): TonightTheme[] => {
  const keys = [weatherA, weatherB].filter(Boolean).map((value) => String(value).toLowerCase());
  const support = new Set<TonightTheme>();
  if (keys.some((key) => ["stressed"].includes(key))) {
    support.add("emotional_clearing");
    support.add("sound");
    support.add("breath");
  }
  if (keys.some((key) => ["tired"].includes(key))) {
    support.add("stillness");
    support.add("embrace");
    support.add("breath");
  }
  if (keys.some((key) => ["reassurance", "tender"].includes(key))) {
    support.add("embrace");
    support.add("touch");
    support.add("stillness");
  }
  if (keys.some((key) => ["playful"].includes(key))) {
    support.add("movement");
    support.add("touch");
    support.add("gaze");
  }
  if (keys.some((key) => ["open", "longing", "erotic"].includes(key))) {
    support.add("union");
    support.add("energy");
    support.add("gaze");
  }
  return Array.from(support);
};

const hashString = (value: string) =>
  Array.from(value).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 17);

const signatureKey = (coupleId?: string | null) => `sacred_tonight_path_signature_${coupleId || "global"}`;
const todayKey = () => new Date().toDateString();

const readPreviousSignature = (coupleId?: string | null) => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(signatureKey(coupleId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { day: string; signature: string };
    if (typeof parsed?.day === "string" && typeof parsed?.signature === "string") return parsed;
  } catch {
    // ignore
  }
  return null;
};

const writeSignature = (coupleId: string | null | undefined, signature: string) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(signatureKey(coupleId), JSON.stringify({ day: todayKey(), signature }));
  } catch {
    // ignore
  }
};

const rotate = <T>(items: T[]): T[] => (items.length > 1 ? [...items.slice(1), items[0]] : items);

export const resolveTonightPath = ({
  weatherA,
  weatherB,
  normalizedKey,
  archetype,
  coupleId,
  selectedMainCard,
  alternates,
}: ResolveTonightPathInput): TonightPathResolved => {
  const sourcePrimary = (RITUAL_LIBRARY_55 as unknown[]).map(asCard).filter((card): card is SelectedDailyMainCard => Boolean(card));
  const sourceReserve = (RITUAL_RESERVE_30 as unknown[]).map(asCard).filter((card): card is SelectedDailyMainCard => Boolean(card));
  const mainCard = selectedMainCard ?? alternates[0] ?? null;

  const deduped = new Map<string, SelectedDailyMainCard>();
  [mainCard, ...alternates, ...sourcePrimary, ...sourceReserve].forEach((card) => {
    if (!card || deduped.has(card.id)) return;
    deduped.set(card.id, card);
  });
  const pool = Array.from(deduped.values());

  const primaryTheme = mainCard ? classifyTheme(mainCard) : supportByWeather(weatherA, weatherB)[0] ?? "touch";
  const candidateThemeOrder: TonightTheme[] = [];
  const addTheme = (theme: TonightTheme) => {
    if (!candidateThemeOrder.includes(theme)) candidateThemeOrder.push(theme);
  };

  addTheme(primaryTheme);
  supportByPrimary[primaryTheme].forEach(addTheme);
  supportByWeather(weatherA, weatherB).forEach(addTheme);
  const archetypeText = normalizeText(archetype ?? "");
  if (/(truth|repair|clear|boundary)/.test(archetypeText)) {
    addTheme("emotional_clearing");
    addTheme("sound");
  }
  if (/(union|bliss|devotion|sacred)/.test(archetypeText)) {
    addTheme("union");
    addTheme("stillness");
    addTheme("energy");
  }
  if (/(rhythm|bridge|arrival|attune)/.test(archetypeText)) {
    addTheme("breath");
    addTheme("gaze");
    addTheme("embrace");
  }
  allThemes.forEach(addTheme);

  const byTheme = new Map<TonightTheme, SelectedDailyMainCard[]>();
  allThemes.forEach((theme) => byTheme.set(theme, []));
  pool.forEach((card) => {
    const theme = classifyTheme(card);
    byTheme.get(theme)?.push(card);
  });

  const alternateIds = new Set(alternates.map((card) => card.id));
  const daySeed = `${todayKey()}:${normalizedKey ?? archetype ?? "tonight"}`;
  const scoreCard = (card: SelectedDailyMainCard, theme: TonightTheme) => {
    let score = 0;
    if (mainCard && card.id === mainCard.id) score += 1000;
    if (alternateIds.has(card.id)) score += 280;
    if (theme === primaryTheme) score += 80;
    if ((weatherA ?? "").toLowerCase() === "stressed" || (weatherB ?? "").toLowerCase() === "stressed") {
      if (theme === "breath" || theme === "emotional_clearing" || theme === "embrace") score += 40;
    }
    if (["open", "longing", "erotic"].includes((weatherA ?? "").toLowerCase()) || ["open", "longing", "erotic"].includes((weatherB ?? "").toLowerCase())) {
      if (theme === "union" || theme === "gaze" || theme === "stillness") score += 40;
    }
    score += (hashString(`${daySeed}:${theme}:${card.id}`) % 21);
    return score;
  };

  const selectedThemes = candidateThemeOrder
    .filter((theme, index) => {
      const cards = byTheme.get(theme) ?? [];
      return cards.length > 0 && index < 10;
    })
    .slice(0, 5);
  while (selectedThemes.length < 3) {
    const fallback = allThemes.find((theme) => !selectedThemes.includes(theme) && (byTheme.get(theme)?.length ?? 0) > 0);
    if (!fallback) break;
    selectedThemes.push(fallback);
  }

  const usedIds = new Set<string>();
  const themedRituals: Record<TonightTheme, SelectedDailyMainCard[]> = {
    breath: [],
    gaze: [],
    touch: [],
    embrace: [],
    movement: [],
    stillness: [],
    sound: [],
    union: [],
    emotional_clearing: [],
    energy: [],
  };

  selectedThemes.forEach((theme) => {
    const candidates = (byTheme.get(theme) ?? [])
      .slice()
      .sort((a, b) => scoreCard(b, theme) - scoreCard(a, theme));

    const picks: SelectedDailyMainCard[] = [];
    for (const card of candidates) {
      if (picks.length >= 4) break;
      if (usedIds.has(card.id)) continue;
      picks.push(card);
      usedIds.add(card.id);
    }

    if (theme === primaryTheme && mainCard && !picks.some((card) => card.id === mainCard.id)) {
      picks.unshift(mainCard);
      while (picks.length > 4) picks.pop();
      usedIds.add(mainCard.id);
    }

    themedRituals[theme] = picks.slice(0, 4);
  });

  const nonEmptyThemes = selectedThemes.filter((theme) => themedRituals[theme].length > 0);
  const effectiveThemes = nonEmptyThemes.length ? nonEmptyThemes : ["touch", "breath", "embrace"];
  const defaultTheme = effectiveThemes[0];

  const toSignature = (themes: TonightTheme[], map: Record<TonightTheme, SelectedDailyMainCard[]>) =>
    themes.map((theme) => `${theme}:${map[theme].map((card) => card.id).join(",")}`).join("|");

  let finalThemes = effectiveThemes;
  let finalThemedRituals = themedRituals;
  const previous = readPreviousSignature(coupleId);
  const currentSignature = toSignature(finalThemes, finalThemedRituals);
  if (previous && previous.day !== todayKey() && previous.signature === currentSignature) {
    const rotatedThemes = rotate(finalThemes);
    const rotatedMap = { ...finalThemedRituals };
    rotatedThemes.forEach((theme) => {
      rotatedMap[theme] = rotate(rotatedMap[theme]);
    });
    finalThemes = rotatedThemes;
    finalThemedRituals = rotatedMap;
  }

  const finalSignature = toSignature(finalThemes, finalThemedRituals);
  writeSignature(coupleId, finalSignature);

  return {
    mainCard,
    themes: finalThemes,
    themedRituals: finalThemedRituals,
    defaultTheme,
  };
};

