import {
  formatSacredVoiceRitualSteps,
  getSacredVoiceExcerptBySourceTag,
  getSacredVoicePromptTemplate,
  getSacredVoiceRitualById,
  type SacredVoiceSelection,
  type SacredVoiceSession,
  type SacredVoiceSourceTag,
  type SacredVoiceTerritory,
} from "@/lib/sacredPathVoiceContent";
import {
  DAILY_SIGNAL_KEYWORDS,
  MISMATCH_SIGNAL_KEYWORDS,
  REPAIR_SIGNAL_KEYWORDS,
  SACRED_VOICE_GUIDE_SOURCES,
  type SacredVoiceGuideLevel,
  resolveGuideProfile,
} from "@/lib/sacredVoiceKnowledge";

export type SacredVoiceRouteResult = {
  territory: SacredVoiceTerritory;
  level: SacredVoiceGuideLevel;
  knowledgeSource: string;
};

const includesAnyKeyword = (value: string, keywords: string[]) => {
  const normalized = value.toLowerCase();
  return keywords.some((keyword) => normalized.includes(keyword));
};

const toLevel = (duration: SacredVoiceSelection["duration"]): SacredVoiceGuideLevel => {
  if (duration >= 15) return 3;
  if (duration >= 8) return 2;
  return 1;
};

const dedupe = (ids: string[]) => Array.from(new Set(ids));

const readingRitualBySource: Partial<Record<SacredVoiceSourceTag, string[]>> = {
  tantra: ["heart_salutation", "soul_gazing"],
  tao: ["circular_breath_of_love", "microcosmic_orbit_dual"],
  slow_love: ["slow_sex", "soft_eye"],
  polarity: ["one_heart_gazing", "conscious_lovemaking"],
  heart_path: ["daily_homecoming_ritual", "appreciation_witness"],
  osho: ["witnessing_breath", "karezza"],
  diana_richardson: ["slow_sex", "soft_eye"],
  deida: ["one_heart_gazing", "circular_breath_of_love"],
  margot_anand: ["heart_salutation", "yab_yum_embrace"],
  jan_day: ["yes_no_exercise", "appreciation_witness"],
  daniel_odier: ["space_between_breaths", "vigyan_bhairava_emotional_yoga"],
  sacred_path: ["daily_homecoming_ritual", "one_minute_appreciations"],
};

const resolveTerritory = (
  selection: SacredVoiceSelection,
  contextSignal?: string,
): SacredVoiceTerritory => {
  const signal = (contextSignal ?? "").trim().toLowerCase();

  if (selection.mode === "read_to_us" && selection.intention === "read_ancient_wisdom") {
    return "reading";
  }

  if (includesAnyKeyword(signal, REPAIR_SIGNAL_KEYWORDS) || selection.intention === "repair_after_tension") {
    return "repair";
  }

  if (includesAnyKeyword(signal, MISMATCH_SIGNAL_KEYWORDS)) {
    return "mismatch";
  }

  if (
    selection.intention === "deeper_intimacy" &&
    (selection.mode === "reflect_with_us" || ["jan_day", "deida", "sacred_path"].includes(selection.sourceTag))
  ) {
    return "mismatch";
  }

  if (includesAnyKeyword(signal, DAILY_SIGNAL_KEYWORDS)) {
    return "daily";
  }

  if (selection.intention === "read_ancient_wisdom") return "reading";
  if (selection.intention === "deeper_intimacy") return "deepen";
  if (selection.intention === "repair_after_tension") return "repair";

  if (selection.intention === "guide_us") {
    if (["tantra", "tao", "slow_love", "margot_anand", "diana_richardson", "osho"].includes(selection.sourceTag)) {
      return "deepen";
    }
    return "daily";
  }

  return "daily";
};

const pickFirstAvailableRitual = (ids: string[]) => {
  for (const id of ids) {
    if (getSacredVoiceRitualById(id)) return id;
  }
  return null;
};

const modeOpeningLine = (mode: SacredVoiceSelection["mode"]) => {
  if (mode === "guide_step_by_step") return "I will guide this slowly, one step at a time.";
  if (mode === "reflect_with_us") return "Pause after each section and answer aloud together.";
  return "Receive this as a spoken reading you can soften into together.";
};

const modeClosingLine = (mode: SacredVoiceSelection["mode"]) => {
  if (mode === "guide_step_by_step") return "Complete one final step, then close with one appreciation each.";
  if (mode === "reflect_with_us") return "Name one insight each, then choose one action for tonight.";
  return "Let these words settle before you move into the rest of your evening.";
};

export const resolveSacredVoiceRoute = (
  selection: SacredVoiceSelection,
  contextSignal?: string,
): SacredVoiceRouteResult => {
  const territory = resolveTerritory(selection, contextSignal);
  const level = toLevel(selection.duration);
  return {
    territory,
    level,
    knowledgeSource: SACRED_VOICE_GUIDE_SOURCES[territory].primaryPath,
  };
};

const buildReadingSession = (
  selection: SacredVoiceSelection,
  route: SacredVoiceRouteResult,
): SacredVoiceSession => {
  const excerpt = getSacredVoiceExcerptBySourceTag(selection.sourceTag);
  const rituals = dedupe([
    ...(readingRitualBySource[selection.sourceTag] ?? []),
    "daily_homecoming_ritual",
  ]);
  const ritualId = pickFirstAvailableRitual(rituals) ?? "daily_homecoming_ritual";

  const ritualSteps = formatSacredVoiceRitualSteps(ritualId);
  const sourceLabel = excerpt?.title ?? "Sacred Path";

  const spokenBlocks = [
    `Pacing: ${selection.duration} minutes.`,
    modeOpeningLine(selection.mode),
    excerpt?.text ?? "Read slowly. Let the words land before you move.",
    `To embody this wisdom tonight, run ${getSacredVoiceRitualById(ritualId)?.title ?? "one gentle ritual"}.`,
    ...ritualSteps,
  ];

  return {
    id: `reading-${selection.sourceTag}-${selection.duration}-${selection.mode}`,
    title: `${sourceLabel} Reading Session`,
    premium: true,
    intention: selection.intention,
    sourceTag: selection.sourceTag,
    duration: selection.duration,
    mode: selection.mode,
    promptTemplate: getSacredVoicePromptTemplate("read_ancient_wisdom"),
    introText: "Ancient wisdom first. One practical ritual second.",
    spokenBlocks,
    transcriptBlocks: spokenBlocks,
    ritualRefs: [ritualId],
    excerptRefs: excerpt ? [excerpt.excerptId] : [],
    closingText: `Keep one sentence from this reading close to your heart for the rest of your evening. ${modeClosingLine(selection.mode)}`,
    territory: route.territory,
    knowledgeSource: route.knowledgeSource,
    teacherAttribution: sourceLabel,
    audioProvider: "elevenlabs",
  };
};

const buildGuidedTerritorySession = (
  selection: SacredVoiceSelection,
  route: SacredVoiceRouteResult,
): SacredVoiceSession => {
  const profile = resolveGuideProfile(route.territory, selection.sourceTag);
  const ritualPool = profile.levelRituals[route.level] ?? profile.levelRituals[1];
  const ritualId = pickFirstAvailableRitual(ritualPool) ?? "daily_homecoming_ritual";

  const ritualSteps = formatSacredVoiceRitualSteps(ritualId);
  const excerpt = getSacredVoiceExcerptBySourceTag(selection.sourceTag);

  const spokenBlocks = [
    `Pacing: ${selection.duration} minutes.`,
    modeOpeningLine(selection.mode),
    profile.opening,
    `Teacher lens: ${profile.teacher}.`,
    `Reflection: ${profile.reflection}`,
    ...ritualSteps,
  ];

  const ritualRefs = profile.onePracticeOnly
    ? [ritualId]
    : dedupe([ritualId, ...(route.level >= 2 ? ["appreciation_witness"] : [])]).filter((id) => Boolean(getSacredVoiceRitualById(id)));

  return {
    id: `${route.territory}-${selection.sourceTag}-${selection.duration}-${selection.mode}`,
    title: `${profile.teacher} ${route.territory === "daily" ? "Daily" : "Guided"} Session`,
    premium: true,
    intention: selection.intention,
    sourceTag: selection.sourceTag,
    duration: selection.duration,
    mode: selection.mode,
    promptTemplate: getSacredVoicePromptTemplate(selection.intention),
    introText: profile.opening,
    spokenBlocks,
    transcriptBlocks: spokenBlocks,
    ritualRefs,
    excerptRefs: excerpt ? [excerpt.excerptId] : [],
    closingText: `${profile.closing} ${modeClosingLine(selection.mode)}`,
    territory: route.territory,
    knowledgeSource: route.knowledgeSource,
    teacherAttribution: profile.teacher,
    audioProvider: "elevenlabs",
  };
};

export const generateSacredVoiceSession = (
  selection: SacredVoiceSelection,
  contextSignal?: string,
): SacredVoiceSession => {
  const route = resolveSacredVoiceRoute(selection, contextSignal);

  if (route.territory === "reading") {
    return buildReadingSession(selection, route);
  }

  return buildGuidedTerritorySession(selection, route);
};
