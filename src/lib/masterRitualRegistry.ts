import RITUAL_LIBRARY_55 from "@/data/sacred_path_ritual_library_55.json";
import RITUAL_RESERVE_30 from "@/data/sacred_path_ritual_reserve_30.json";
import WEATHER_MATRIX_25 from "@/data/sacred_path_weather_matrix_25.json";
import { SACRED_REPAIR_CHAPTERS } from "@/lib/sacredRepairData";
import { RITUAL_CONTENT_OVERLAYS } from "@/lib/ritualContentOverlay";

export type MasterRitualTheme =
  | "breath"
  | "gaze"
  | "touch"
  | "massage"
  | "embrace"
  | "movement"
  | "stillness"
  | "sound"
  | "union"
  | "emotional_clearing"
  | "energy";

export type MasterRitualRegistryEntry = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  intimacyLevel: string;
  primaryNeed: string;
  theme: MasterRitualTheme;
  ritualSteps: string[];
  sourceCategory: string;
  sourceTraditions?: string[];
  sourceAuthors?: string[];
  sourceConcepts?: string[];
  weatherTags?: string[];
  coupleUseCase?: string;
  premium: boolean;
};

type WeatherMatrixEntry = (typeof WEATHER_MATRIX_25)[keyof typeof WEATHER_MATRIX_25];
type WeatherLibraryItem = (typeof RITUAL_LIBRARY_55)[number];
type ReserveLibraryItem = (typeof RITUAL_RESERVE_30)[number];

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const normalizeTheme = (value: string): MasterRitualTheme => {
  const token = normalizeText(value);
  if (/(breath|respir|dech|dych|souffle)/.test(token)) return "breath";
  if (/(gaze|eye|regard|pohled|seeing)/.test(token)) return "gaze";
  if (/(massage|bodywork|masaz|masáž|qigong)/.test(token)) return "massage";
  if (/(touch|contact|dotek|toucher|yoni|lingam)/.test(token)) return "touch";
  if (/(embrace|hug|holding|etreinte|objeti)/.test(token)) return "embrace";
  if (/(movement|move|rocking|shaking|dance|mouvement|pohyb)/.test(token)) return "movement";
  if (/(still|stillness|rest|pause|immobil|klid|karezza)/.test(token)) return "stillness";
  if (/(sound|voice|speak|unsaid|gibberish|hlas|voix)/.test(token)) return "sound";
  if (/(union|lovemaking|erotic|sexual|spojeni|ecstatic|bliss)/.test(token)) return "union";
  if (/(emotion|repair|clear|truth|witness|reconnect|vycisteni|clarte)/.test(token)) return "emotional_clearing";
  if (/(energy|qi|chi|chakra|orbit|fire|vitality)/.test(token)) return "energy";
  return "touch";
};

const normalizeSteps = (steps: string[]) =>
  Array.from(
    new Set(
      steps
        .map((step) => step.trim())
        .filter(Boolean),
    ),
  );

const isBoilerplateSentence = (value: string) => {
  const normalized = normalizeText(value);
  return (
    normalized.includes("a guided sequence aligned to the active couple weather combination") ||
    normalized.includes("a supporting practice chosen to reinforce tonight s main weather ritual") ||
    normalized.includes("weather aligned ritual for tonight") ||
    normalized.includes("reserve supporting ritual")
  );
};

const isBoilerplateSteps = (steps: string[]) => {
  const normalized = steps.map(normalizeText);
  if (!normalized.length) return true;
  const hasPrimaryTemplate =
    normalized.includes("arrive with one shared breath and one sentence of intention") &&
    normalized.includes("follow slow pacing check in clearly and keep contact attuned") &&
    normalized.includes("close with one appreciation and one next step invitation");
  const hasReserveTemplate =
    normalized.includes("begin with one shared breath and eye contact") &&
    normalized.includes("move slowly and check in with consent language") &&
    normalized.includes("close with one appreciation and one next step for tomorrow");
  return hasPrimaryTemplate || hasReserveTemplate;
};

const mergeList = (a?: string[], b?: string[]) =>
  Array.from(new Set([...(a ?? []), ...(b ?? [])].map((item) => item.trim()).filter(Boolean)));

const scoreEntry = (entry: MasterRitualRegistryEntry) => {
  const descriptionScore = isBoilerplateSentence(entry.description) ? 0 : entry.description.length;
  const subtitleScore = isBoilerplateSentence(entry.subtitle) ? 0 : entry.subtitle.length;
  const stepScore = isBoilerplateSteps(entry.ritualSteps) ? 0 : entry.ritualSteps.join(" ").length + entry.ritualSteps.length * 20;
  const useCaseScore = (entry.coupleUseCase ?? "").length;
  return descriptionScore + subtitleScore + stepScore + useCaseScore;
};

const mergeEntries = (
  base: MasterRitualRegistryEntry,
  incoming: MasterRitualRegistryEntry,
): MasterRitualRegistryEntry => {
  const baseScore = scoreEntry(base);
  const incomingScore = scoreEntry(incoming);
  const winner = incomingScore >= baseScore ? incoming : base;
  const fallback = winner === incoming ? base : incoming;

  const mergedSteps = (() => {
    const winnerSteps = normalizeSteps(winner.ritualSteps);
    if (winnerSteps.length && !isBoilerplateSteps(winnerSteps)) return winnerSteps;
    const fallbackSteps = normalizeSteps(fallback.ritualSteps);
    if (fallbackSteps.length && !isBoilerplateSteps(fallbackSteps)) return fallbackSteps;
    return winnerSteps.length ? winnerSteps : fallbackSteps;
  })();

  return {
    id: base.id,
    title: winner.title || fallback.title,
    subtitle: !isBoilerplateSentence(winner.subtitle) ? winner.subtitle : fallback.subtitle,
    description: !isBoilerplateSentence(winner.description) ? winner.description : fallback.description,
    duration: winner.duration || fallback.duration,
    intimacyLevel: winner.intimacyLevel || fallback.intimacyLevel,
    primaryNeed: winner.primaryNeed || fallback.primaryNeed,
    theme: winner.theme || fallback.theme,
    ritualSteps: mergedSteps,
    sourceCategory: mergeList([base.sourceCategory], [incoming.sourceCategory]).join(" | "),
    sourceTraditions: mergeList(base.sourceTraditions, incoming.sourceTraditions),
    sourceAuthors: mergeList(base.sourceAuthors, incoming.sourceAuthors),
    sourceConcepts: mergeList(base.sourceConcepts, incoming.sourceConcepts),
    weatherTags: mergeList(base.weatherTags, incoming.weatherTags),
    coupleUseCase: winner.coupleUseCase || fallback.coupleUseCase,
    premium: base.premium || incoming.premium,
  };
};

const chapterThemeMap: Record<string, MasterRitualTheme> = {
  "touch-massage-sacred-spot": "touch",
  "embrace-embodied-connection": "embrace",
  "sacred-union-rituals": "union",
  "emotional-clearing-authentic-relating": "emotional_clearing",
};

const buildWeatherTagsByRitualId = () => {
  const map = new Map<string, Set<string>>();
  Object.entries(WEATHER_MATRIX_25 as Record<string, WeatherMatrixEntry>).forEach(([weatherKey, entry]) => {
    const ids = [entry.main, ...(entry.alternates ?? [])];
    ids.forEach((id) => {
      if (!map.has(id)) map.set(id, new Set<string>());
      map.get(id)?.add(weatherKey);
    });
  });
  return map;
};

const weatherTagsByRitualId = buildWeatherTagsByRitualId();

const fromWeatherLibrary55 = (item: WeatherLibraryItem): MasterRitualRegistryEntry => ({
  id: item.id,
  title: item.title,
  subtitle: isBoilerplateSentence(item.subtitle) ? "" : item.subtitle,
  description: isBoilerplateSentence(item.description) ? "" : item.description,
  duration: item.duration,
  intimacyLevel: item.intimacyLevel,
  primaryNeed: item.primaryNeed,
  theme: normalizeTheme(item.theme),
  ritualSteps: normalizeSteps(item.ritualSteps),
  sourceCategory: "weather_core_55",
  sourceTraditions: item.sourceTraditions ?? [],
  sourceAuthors: item.sourceAuthors ?? [],
  sourceConcepts: item.sourceConcepts ?? [],
  weatherTags: Array.from(weatherTagsByRitualId.get(item.id) ?? []),
  premium: false,
});

const fromReserveLibrary30 = (item: ReserveLibraryItem): MasterRitualRegistryEntry => ({
  id: item.id,
  title: item.title,
  subtitle: isBoilerplateSentence(item.subtitle) ? "" : item.subtitle,
  description: isBoilerplateSentence(item.description) ? "" : item.description,
  duration: item.duration,
  intimacyLevel: item.intimacyLevel,
  primaryNeed: item.primaryNeed,
  theme: normalizeTheme(item.theme),
  ritualSteps: normalizeSteps(item.ritualSteps),
  sourceCategory: "weather_reserve_30",
  sourceTraditions: [],
  sourceAuthors: [],
  sourceConcepts: [],
  weatherTags: Array.from(weatherTagsByRitualId.get(item.id) ?? []),
  premium: false,
});

const fromSacredRepairChapter = (chapterId: string, emotionalFrame: string, ritual: (typeof SACRED_REPAIR_CHAPTERS)[number]["rituals"][number]): MasterRitualRegistryEntry => {
  const [authorToken, ...traditionTokens] = ritual.lineage.split("·").map((segment) => segment.trim()).filter(Boolean);
  const generatedId = slugify(ritual.title);
  return {
    id: generatedId,
    title: ritual.title,
    subtitle: emotionalFrame,
    description: ritual.intention,
    duration: ritual.duration,
    intimacyLevel: "Gentle to medium",
    primaryNeed: "Repair and reconnection",
    theme: chapterThemeMap[chapterId] ?? normalizeTheme(ritual.title),
    ritualSteps: normalizeSteps(ritual.steps),
    sourceCategory: "sacred_repair_pdf",
    sourceTraditions: traditionTokens,
    sourceAuthors: authorToken ? [authorToken] : [],
    sourceConcepts: ["repair", "presence", "attunement"],
    coupleUseCase: emotionalFrame,
    weatherTags: Array.from(weatherTagsByRitualId.get(generatedId) ?? []),
    premium: true,
  };
};

const buildMasterRegistry = (): MasterRitualRegistryEntry[] => {
  const registryById = new Map<string, MasterRitualRegistryEntry>();
  const idByNormalizedTitle = new Map<string, string>();

  const upsert = (rawEntry: MasterRitualRegistryEntry) => {
    const normalizedTitle = normalizeText(rawEntry.title);
    const existingById = registryById.get(rawEntry.id);
    const existingTitleId = idByNormalizedTitle.get(normalizedTitle);

    if (existingById) {
      const merged = mergeEntries(existingById, rawEntry);
      registryById.set(existingById.id, merged);
      idByNormalizedTitle.set(normalizedTitle, existingById.id);
      return;
    }

    if (existingTitleId && registryById.has(existingTitleId)) {
      const existing = registryById.get(existingTitleId) as MasterRitualRegistryEntry;
      const merged = mergeEntries(existing, rawEntry);
      registryById.set(existingTitleId, merged);
      idByNormalizedTitle.set(normalizedTitle, existingTitleId);
      return;
    }

    registryById.set(rawEntry.id, rawEntry);
    idByNormalizedTitle.set(normalizedTitle, rawEntry.id);
  };

  (RITUAL_LIBRARY_55 as WeatherLibraryItem[]).forEach((item) => upsert(fromWeatherLibrary55(item)));
  (RITUAL_RESERVE_30 as ReserveLibraryItem[]).forEach((item) => upsert(fromReserveLibrary30(item)));

  SACRED_REPAIR_CHAPTERS.forEach((chapter) => {
    chapter.rituals.forEach((ritual) => {
      upsert(fromSacredRepairChapter(chapter.id, chapter.emotionalFrame, ritual));
    });
  });

  const sorted = Array.from(registryById.values()).sort((a, b) => a.title.localeCompare(b.title));
  return sorted.map((entry) => {
    const overlay = RITUAL_CONTENT_OVERLAYS[entry.id];
    const merged: MasterRitualRegistryEntry = {
      ...entry,
      weatherTags: mergeList(entry.weatherTags, Array.from(weatherTagsByRitualId.get(entry.id) ?? [])),
      sourceTraditions: mergeList(entry.sourceTraditions, []),
      sourceAuthors: mergeList(entry.sourceAuthors, []),
      sourceConcepts: mergeList(entry.sourceConcepts, []),
      ritualSteps: normalizeSteps(entry.ritualSteps),
    };
    if (!overlay) return merged;
    // Overlay wins for any field that is empty or boilerplate in the merged entry.
    const subtitle = !merged.subtitle || isBoilerplateSentence(merged.subtitle) ? overlay.subtitle : merged.subtitle;
    const description = !merged.description || isBoilerplateSentence(merged.description) ? overlay.description : merged.description;
    const ritualSteps = isBoilerplateSteps(merged.ritualSteps) || merged.ritualSteps.length < 3
      ? normalizeSteps(overlay.ritualSteps)
      : merged.ritualSteps;
    return {
      ...merged,
      subtitle,
      description,
      duration: overlay.duration || merged.duration,
      intimacyLevel: overlay.intimacyLevel || merged.intimacyLevel,
      primaryNeed: overlay.primaryNeed || merged.primaryNeed,
      ritualSteps,
    };
  });
};

export const MASTER_RITUAL_REGISTRY: MasterRitualRegistryEntry[] = buildMasterRegistry();

export const MASTER_RITUAL_REGISTRY_BY_ID = new Map<string, MasterRitualRegistryEntry>(
  MASTER_RITUAL_REGISTRY.map((entry) => [entry.id, entry]),
);

export const getMasterRitualById = (id: string) => MASTER_RITUAL_REGISTRY_BY_ID.get(id) ?? null;

