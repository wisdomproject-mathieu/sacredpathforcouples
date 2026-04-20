import RITUAL_LIBRARY_55 from "@/data/sacred_path_ritual_library_55.json";
import RITUAL_RESERVE_30 from "@/data/sacred_path_ritual_reserve_30.json";
import {
  AUTHOR_COMPENDIUM_FULL_DESCRIPTION_BY_SLUG,
  PATH_COMPENDIUM_FULL_DESCRIPTION_BY_SLUG,
} from "@/lib/compendiumOverrides";

export type SacredVoiceIntention =
  | "meditate"
  | "breathe"
  | "guide_us"
  | "read_ancient_wisdom"
  | "repair_after_tension"
  | "deeper_intimacy";

export type SacredVoiceSourceTag =
  | "tantra"
  | "tao"
  | "slow_love"
  | "polarity"
  | "heart_path"
  | "osho"
  | "diana_richardson"
  | "deida"
  | "margot_anand"
  | "jan_day"
  | "daniel_odier"
  | "sacred_path";

export type SacredVoiceMode = "read_to_us" | "guide_step_by_step" | "reflect_with_us";

export type SacredVoiceDuration = 3 | 6 | 8 | 10 | 15 | 20;

export type SacredVoiceTerritory =
  | "repair"
  | "deepen"
  | "mismatch"
  | "daily"
  | "reading";

export type SacredVoiceAudioProvider = "elevenlabs" | "browser";

export type SacredVoiceSelection = {
  intention: SacredVoiceIntention;
  sourceTag: SacredVoiceSourceTag;
  duration: SacredVoiceDuration;
  mode: SacredVoiceMode;
};

export type SacredVoiceRitual = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  ritualSteps: string[];
  theme: string;
  sourceTraditions: string[];
  sourceAuthors: string[];
};

export type SacredVoiceSession = {
  id: string;
  title: string;
  premium: true;
  intention: SacredVoiceIntention;
  sourceTag: SacredVoiceSourceTag;
  duration: SacredVoiceDuration;
  mode: SacredVoiceMode;
  promptTemplate: string;
  introText: string;
  spokenBlocks: string[];
  transcriptBlocks: string[];
  ritualRefs: string[];
  excerptRefs: string[];
  closingText: string;
  territory: SacredVoiceTerritory;
  knowledgeSource: string;
  teacherAttribution: string;
  audioProvider?: SacredVoiceAudioProvider;
};

export const SACRED_VOICE_INTENTIONS: Array<{ id: SacredVoiceIntention; label: string }> = [
  { id: "meditate", label: "Meditate" },
  { id: "breathe", label: "Breathe" },
  { id: "guide_us", label: "Guide Us" },
  { id: "read_ancient_wisdom", label: "Read Ancient Wisdom" },
  { id: "repair_after_tension", label: "Repair After Tension" },
  { id: "deeper_intimacy", label: "Deeper Intimacy" },
];

export const SACRED_VOICE_SOURCES: Array<{ id: SacredVoiceSourceTag; label: string }> = [
  { id: "tantra", label: "Tantra" },
  { id: "tao", label: "Tao" },
  { id: "slow_love", label: "Slow Love" },
  { id: "polarity", label: "Polarity" },
  { id: "heart_path", label: "Heart Path" },
  { id: "osho", label: "Osho" },
  { id: "diana_richardson", label: "Diana Richardson" },
  { id: "deida", label: "Deida" },
  { id: "margot_anand", label: "Margot Anand" },
  { id: "jan_day", label: "Jan Day" },
  { id: "daniel_odier", label: "Daniel Odier" },
  { id: "sacred_path", label: "Sacred Path" },
];

export const SACRED_VOICE_DURATIONS: SacredVoiceDuration[] = [3, 6, 8, 10, 15, 20];

export const SACRED_VOICE_MODES: Array<{ id: SacredVoiceMode; label: string }> = [
  { id: "read_to_us", label: "Read to us" },
  { id: "guide_step_by_step", label: "Guide us step by step" },
  { id: "reflect_with_us", label: "Reflect with us" },
];

type RitualRow = (typeof RITUAL_LIBRARY_55)[number] | (typeof RITUAL_RESERVE_30)[number];

const ritualMap = new Map<string, RitualRow>(
  [...RITUAL_LIBRARY_55, ...RITUAL_RESERVE_30].map((ritual) => [ritual.id, ritual]),
);

const sanitizeParagraphs = (value: string) =>
  value
    .split(/\n\n+/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);

const excerptFrom = (raw: string, count = 2, skipHeadings = true) => {
  const paragraphs = sanitizeParagraphs(raw);
  const filtered = skipHeadings
    ? paragraphs.filter((paragraph) => !/^[A-Z][A-Za-z\s\-']{2,40}$/.test(paragraph))
    : paragraphs;
  return filtered.slice(0, count).join("\n\n");
};

const sourceExcerpts: Record<
  SacredVoiceSourceTag,
  {
    title: string;
    excerptId: string;
    text: string;
  }
> = {
  tantra: {
    title: "Tantric Wisdom",
    excerptId: "path_tantra_opening",
    text: excerptFrom(PATH_COMPENDIUM_FULL_DESCRIPTION_BY_SLUG.tantra, 2),
  },
  tao: {
    title: "Taoist Alchemy",
    excerptId: "path_tao_opening",
    text: excerptFrom(PATH_COMPENDIUM_FULL_DESCRIPTION_BY_SLUG.tao, 2),
  },
  slow_love: {
    title: "Slow Love",
    excerptId: "path_slow_love_opening",
    text: excerptFrom(PATH_COMPENDIUM_FULL_DESCRIPTION_BY_SLUG["neo-tantra"], 2),
  },
  polarity: {
    title: "Polarity",
    excerptId: "path_polarity_opening",
    text: excerptFrom(PATH_COMPENDIUM_FULL_DESCRIPTION_BY_SLUG.polarity, 2),
  },
  heart_path: {
    title: "The Embodied Heart",
    excerptId: "path_heart_opening",
    text: excerptFrom(PATH_COMPENDIUM_FULL_DESCRIPTION_BY_SLUG["sacred-desire"], 2),
  },
  osho: {
    title: "Osho",
    excerptId: "author_osho_opening",
    text: excerptFrom(AUTHOR_COMPENDIUM_FULL_DESCRIPTION_BY_SLUG.osho, 2),
  },
  diana_richardson: {
    title: "Diana Richardson",
    excerptId: "author_diana_opening",
    text: excerptFrom(AUTHOR_COMPENDIUM_FULL_DESCRIPTION_BY_SLUG["diana-richardson"], 2),
  },
  deida: {
    title: "David Deida",
    excerptId: "author_deida_opening",
    text: excerptFrom(AUTHOR_COMPENDIUM_FULL_DESCRIPTION_BY_SLUG.deida, 2),
  },
  margot_anand: {
    title: "Margot Anand",
    excerptId: "author_margot_opening",
    text: excerptFrom(AUTHOR_COMPENDIUM_FULL_DESCRIPTION_BY_SLUG["margot-anand"], 2),
  },
  jan_day: {
    title: "Jan Day",
    excerptId: "author_jan_day_opening",
    text: excerptFrom(AUTHOR_COMPENDIUM_FULL_DESCRIPTION_BY_SLUG["jan-day"], 2),
  },
  daniel_odier: {
    title: "Daniel Odier",
    excerptId: "author_daniel_opening",
    text: excerptFrom(AUTHOR_COMPENDIUM_FULL_DESCRIPTION_BY_SLUG["daniel-odier"], 2),
  },
  sacred_path: {
    title: "Conscious Union",
    excerptId: "path_conscious_union_opening",
    text: excerptFrom(PATH_COMPENDIUM_FULL_DESCRIPTION_BY_SLUG["vajrayana-kashmir-shaivism"], 2),
  },
};

const toVoiceRitual = (ritualId: string): SacredVoiceRitual | null => {
  const row = ritualMap.get(ritualId);
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    duration: row.duration,
    ritualSteps: row.ritualSteps.slice(0, 6),
    theme: row.theme,
    sourceTraditions: "sourceTraditions" in row ? row.sourceTraditions : [row.source],
    sourceAuthors: "sourceAuthors" in row ? row.sourceAuthors : [],
  };
};

const formatRitualSteps = (ritualId: string) => {
  const ritual = toVoiceRitual(ritualId);
  if (!ritual) return [] as string[];
  // Title only — duration is governed by the user-selected session length.
  const header = ritual.title;
  const steps = ritual.ritualSteps.map((step, index) => `Step ${index + 1}: ${step}`);
  return [header, ...steps];
};

const promptByIntention: Record<SacredVoiceIntention, string> = {
  meditate: "Guide a couple through a short heart-centred stillness practice with breath and grounded tenderness.",
  breathe: "Guide a couple through a structured shared-breath ritual with clear pacing and calming transitions.",
  guide_us: "Guide a couple through practical ritual steps they can run tonight, with no abstract filler.",
  read_ancient_wisdom: "Read a source-grounded excerpt from Sacred Path compendium, then lead one linked practice.",
  repair_after_tension: "Offer a calm repair session after tension with emotional safety, one reflection, and one simple ritual.",
  deeper_intimacy: "Guide a couple toward deeper intimacy with slow, reverent, non-explicit ritual language.",
};

const territoryByIntention: Record<SacredVoiceIntention, SacredVoiceTerritory> = {
  meditate: "daily",
  breathe: "daily",
  guide_us: "deepen",
  read_ancient_wisdom: "reading",
  repair_after_tension: "repair",
  deeper_intimacy: "deepen",
};

type TemplateDefinition = {
  id: string;
  title: string;
  intention: SacredVoiceIntention;
  sourceTag: SacredVoiceSourceTag;
  duration: SacredVoiceDuration;
  mode: SacredVoiceMode;
  introText: string;
  ritualRefs: string[];
  excerptRefs: string[];
  blocks: string[];
  closingText: string;
};

type RepairLevel = 1 | 2 | 3;

type RepairRoute = {
  level: RepairLevel;
  teacher: string;
  practiceId: string;
  teaching: string;
  reflectionPrompt: string;
  closing: string;
};

const repairGuideRoutes: Record<SacredVoiceSourceTag, RepairRoute> = {
  // Primary source: /Users/mathieuescande/Documents/SacredLibrary/sacred_path_repair_reconnect_ai_guide.md
  tantra: {
    level: 2,
    teacher: "Daniel Odier / Classical Tantra",
    practiceId: "vigyan_bhairava_emotional_yoga",
    teaching: "Classical Tantra invites full attention to the emotion instead of suppression or reaction.",
    reflectionPrompt: "Which emotion is strongest right now, and what changes when you breathe into it instead of acting from it?",
    closing: "Rest in silence for ten breaths before deciding what to say next.",
  },
  tao: {
    level: 1,
    teacher: "Mantak Chia / Taoist Alchemy",
    practiceId: "inner_smile_with_partner",
    teaching: "Taoist repair begins in the body: calm the organs, then language becomes clearer.",
    reflectionPrompt: "Where is tension stored in your body right now, and how does it shift when you soften there?",
    closing: "Keep your breath low in the belly for one extra minute together.",
  },
  slow_love: {
    level: 1,
    teacher: "Diana Richardson / Slow Love",
    practiceId: "synchronized_heart_breathing",
    teaching: "When the nervous system settles first, closeness returns without force.",
    reflectionPrompt: "Can we choose softness before speed for the next ten minutes?",
    closing: "End with one sentence each: I want to stay close with you.",
  },
  polarity: {
    level: 2,
    teacher: "David Deida / Polarity",
    practiceId: "bridge_soft_start",
    teaching: "After tension, polarity rebuilds through grounded presence instead of defense.",
    reflectionPrompt: "What would steadiness look like in your body before your next words?",
    closing: "Let your final breath be slow and deliberate before re-entering conversation.",
  },
  heart_path: {
    level: 1,
    teacher: "Sacred Path / The Embodied Heart",
    practiceId: "daily_homecoming_ritual",
    teaching: "Small daily rituals prevent distance from hardening into rupture.",
    reflectionPrompt: "What one gentle action would help your partner feel safe with you tonight?",
    closing: "Keep tonight simple: one request, one yes/no check-in, one thank you.",
  },
  osho: {
    level: 2,
    teacher: "Osho",
    practiceId: "gibberish_release",
    teaching: "Clear the emotional charge first; conversation works better after the body discharges.",
    reflectionPrompt: "What are you carrying in your nervous system that words alone are not clearing?",
    closing: "After the practice, sit in quiet for two minutes before speaking.",
  },
  diana_richardson: {
    level: 1,
    teacher: "Diana Richardson",
    practiceId: "soft_eye",
    teaching: "Slow attention and soft gaze can melt defensiveness faster than analysis.",
    reflectionPrompt: "Can we stay with each other for one minute without fixing or persuading?",
    closing: "Close by touching foreheads and sharing one appreciation each.",
  },
  deida: {
    level: 2,
    teacher: "David Deida",
    practiceId: "parts_work_dialogue",
    teaching: "Presence is the repair move: respond from grounded love, not from reactivity.",
    reflectionPrompt: "Which protective part is speaking right now, and what does it actually need?",
    closing: "When the charge softens, reconnect through one intentional embrace.",
  },
  margot_anand: {
    level: 1,
    teacher: "Margot Anand",
    practiceId: "heart_salutation",
    teaching: "Ceremony helps couples re-enter each other with dignity after friction.",
    reflectionPrompt: "What intention do you want to set before you touch each other tonight?",
    closing: "Bow out slowly and name one quality you want to bring into the rest of your evening.",
  },
  jan_day: {
    level: 2,
    teacher: "Jan Day",
    practiceId: "yes_no_exercise",
    teaching: "Repair deepens when partners restore agency and clear consent in the body.",
    reflectionPrompt: "What yes feels true tonight, and what no needs to be spoken with care?",
    closing: "End by naming one clear boundary and one clear invitation.",
  },
  daniel_odier: {
    level: 2,
    teacher: "Daniel Odier",
    practiceId: "space_between_breaths",
    teaching: "The pause between breaths interrupts reactivity and restores presence.",
    reflectionPrompt: "What becomes possible between you when you allow a real pause?",
    closing: "Stay in that pause for three final breaths together.",
  },
  sacred_path: {
    level: 1,
    teacher: "Sacred Path",
    practiceId: "appreciation_witness",
    teaching: "Micro-repair keeps love warm between the difficult moments.",
    reflectionPrompt: "What appreciation have you not spoken yet that could soften tonight?",
    closing: "Close with one sincere appreciation each, spoken slowly and directly.",
  },
};

const sessionTemplates: TemplateDefinition[] = [
  {
    id: "meditate-heart-6",
    title: "Heart-Centred Arrival",
    intention: "meditate",
    sourceTag: "heart_path",
    duration: 6,
    mode: "guide_step_by_step",
    introText: "A short heart-centred return for two people who want calm before words.",
    ritualRefs: ["synchronized_heart_breathing", "space_between_breaths"],
    excerptRefs: [sourceExcerpts.heart_path.excerptId],
    blocks: [
      "Sit facing each other and place one palm on your own heart. Let the first minute be silence.",
      ...formatRitualSteps("synchronized_heart_breathing"),
      "Close by saying one gentle line: I am here, and I want us to stay close.",
    ],
    closingText: "End with one slow exhale together and keep the room quiet for ten breaths.",
  },
  {
    id: "breathe-slow-love-6",
    title: "Slow Breath, Soft Eyes",
    intention: "breathe",
    sourceTag: "slow_love",
    duration: 6,
    mode: "guide_step_by_step",
    introText: "Breath first, pace second, tenderness always.",
    ritualRefs: ["synchronized_heart_breathing", "soft_eye"],
    excerptRefs: [sourceExcerpts.slow_love.excerptId],
    blocks: [
      ...formatRitualSteps("synchronized_heart_breathing"),
      ...formatRitualSteps("soft_eye"),
    ],
    closingText: "Touch foreheads for three breaths before moving to the next part of your evening.",
  },
  {
    id: "guide-tantra-10",
    title: "Tantric Guided Sequence",
    intention: "guide_us",
    sourceTag: "tantra",
    duration: 10,
    mode: "guide_step_by_step",
    introText: "A practical tantric sequence: open, see, hold.",
    ritualRefs: ["heart_salutation", "soul_gazing", "melting_hug"],
    excerptRefs: [],
    blocks: [
      ...formatRitualSteps("heart_salutation"),
      ...formatRitualSteps("soul_gazing"),
      ...formatRitualSteps("melting_hug"),
    ],
    closingText: "End with one appreciation each before choosing your next touch.",
  },
  {
    id: "read-tantra-10",
    title: "Tantric Wisdom Reading + Practice",
    intention: "read_ancient_wisdom",
    sourceTag: "tantra",
    duration: 10,
    mode: "read_to_us",
    introText: "First, a source-grounded reading. Then one embodied practice.",
    ritualRefs: ["heart_salutation"],
    excerptRefs: [sourceExcerpts.tantra.excerptId],
    blocks: [sourceExcerpts.tantra.text, ...formatRitualSteps("heart_salutation")],
    closingText: "Let one sentence from the reading stay with you while you move slowly into touch.",
  },
  {
    id: "read-tao-10",
    title: "Taoist Alchemy Reading + Breath",
    intention: "read_ancient_wisdom",
    sourceTag: "tao",
    duration: 10,
    mode: "read_to_us",
    introText: "Read the lineage, then circulate breath as a shared current.",
    ritualRefs: ["circular_breath_of_love"],
    excerptRefs: [sourceExcerpts.tao.excerptId],
    blocks: [sourceExcerpts.tao.text, ...formatRitualSteps("circular_breath_of_love")],
    closingText: "Keep your breath low and unforced for one extra minute in silence.",
  },
  {
    id: "intimacy-diana-10",
    title: "Slow Love Depth Session",
    intention: "deeper_intimacy",
    sourceTag: "diana_richardson",
    duration: 10,
    mode: "guide_step_by_step",
    introText: "Slow down until the real contact appears.",
    ritualRefs: ["slow_sex", "soft_eye", "space_between_breaths"],
    excerptRefs: [sourceExcerpts.diana_richardson.excerptId],
    blocks: [...formatRitualSteps("soft_eye"), ...formatRitualSteps("slow_sex"), ...formatRitualSteps("space_between_breaths")],
    closingText: "Let the final minute be stillness, not performance.",
  },
  {
    id: "intimacy-margot-10",
    title: "Sacred Setup and Devotional Intimacy",
    intention: "deeper_intimacy",
    sourceTag: "margot_anand",
    duration: 10,
    mode: "guide_step_by_step",
    introText: "Create sacred space first, then open the body with reverence.",
    ritualRefs: ["heart_salutation", "melting_hug", "riding_the_wave_of_bliss"],
    excerptRefs: [sourceExcerpts.margot_anand.excerptId],
    blocks: [...formatRitualSteps("heart_salutation"), ...formatRitualSteps("melting_hug"), ...formatRitualSteps("riding_the_wave_of_bliss")],
    closingText: "Before ending, each partner whispers one desire sentence and one gratitude sentence.",
  },
  {
    id: "read-deida-8",
    title: "Deida Reading + Embodied Next Step",
    intention: "read_ancient_wisdom",
    sourceTag: "deida",
    duration: 8,
    mode: "read_to_us",
    introText: "Read polarity wisdom, then ground it in one immediate embodied practice.",
    ritualRefs: ["one_heart_gazing", "circular_breath_of_love"],
    excerptRefs: [sourceExcerpts.deida.excerptId],
    blocks: [
      sourceExcerpts.deida.text,
      "Embodied next step: stand facing each other, one hand on heart and one on lower belly. Breathe slowly for five rounds before speaking.",
      ...formatRitualSteps("one_heart_gazing"),
    ],
    closingText: "Close by naming one way you can bring steadier presence into tomorrow.",
  },
];

const fallbackByIntention: Record<SacredVoiceIntention, string> = {
  meditate: "meditate-heart-6",
  breathe: "breathe-slow-love-6",
  guide_us: "guide-tantra-10",
  read_ancient_wisdom: "read-tantra-10",
  repair_after_tension: "meditate-heart-6",
  deeper_intimacy: "intimacy-diana-10",
};

const compileSession = (template: TemplateDefinition): SacredVoiceSession => ({
  id: template.id,
  title: template.title,
  premium: true,
  intention: template.intention,
  sourceTag: template.sourceTag,
  duration: template.duration,
  mode: template.mode,
  promptTemplate: promptByIntention[template.intention],
  introText: template.introText,
  spokenBlocks: template.blocks,
  transcriptBlocks: template.blocks,
  ritualRefs: template.ritualRefs,
  excerptRefs: template.excerptRefs,
  closingText: template.closingText,
  territory: territoryByIntention[template.intention],
  knowledgeSource:
    template.intention === "read_ancient_wisdom"
      ? "/mnt/data/Sacred_Path_for_Couples.pdf"
      : "/mnt/data/Sacred_Practices_for_Couples.pdf",
  teacherAttribution: SACRED_VOICE_SOURCES.find((item) => item.id === template.sourceTag)?.label ?? "Sacred Path",
  audioProvider: "elevenlabs",
});

const findTemplate = (selection: SacredVoiceSelection) => {
  const exact = sessionTemplates.find(
    (template) =>
      template.intention === selection.intention &&
      template.sourceTag === selection.sourceTag &&
      template.duration === selection.duration &&
      template.mode === selection.mode,
  );
  if (exact) return exact;

  const byDuration = sessionTemplates.find(
    (template) =>
      template.intention === selection.intention &&
      template.sourceTag === selection.sourceTag &&
      template.duration === selection.duration,
  );
  if (byDuration) return byDuration;

  const bySource = sessionTemplates.find(
    (template) => template.intention === selection.intention && template.sourceTag === selection.sourceTag,
  );
  if (bySource) return bySource;

  return sessionTemplates.find((template) => template.id === fallbackByIntention[selection.intention]) ?? sessionTemplates[0];
};

const resolveRepairLevel = (selection: SacredVoiceSelection, baseLevel: RepairLevel): RepairLevel => {
  if (selection.duration >= 15) return 3;
  if (selection.duration >= 8) return Math.max(2, baseLevel) as RepairLevel;
  return baseLevel;
};

const buildRepairSession = (selection: SacredVoiceSelection): SacredVoiceSession => {
  const route = repairGuideRoutes[selection.sourceTag] ?? repairGuideRoutes.sacred_path;
  const level = resolveRepairLevel(selection, route.level);

  const levelSpecific =
    level === 3
      ? {
          ritualId: "the_unsaid_voice",
          teacher: "Jan Day",
          teaching:
            "Rupture-level moments need structured truth-telling and slower, supported repair.",
          reflectionPrompt:
            "What truth has stayed unsaid that must be spoken without rebuttal?",
          closing:
            "If there is betrayal, ongoing deception, violence, or self-harm risk, pair this with a trained therapist or crisis support immediately.",
        }
      : route;

  const ritualId = "ritualId" in levelSpecific ? levelSpecific.ritualId : undefined;
  const ritualSteps = formatRitualSteps(ritualId);
  const excerpt = sourceExcerpts[selection.sourceTag];

  return {
    id: `repair-${selection.sourceTag}-${selection.duration}-${selection.mode}`,
    title: `${levelSpecific.teacher} Repair Session`,
    premium: true,
    intention: "repair_after_tension",
    sourceTag: selection.sourceTag,
    duration: selection.duration,
    mode: selection.mode,
    promptTemplate:
      "Use the Sacred Path repair guide: match repair level, cite one teacher lens, and offer one practice only.",
    introText: `Repair level ${level}: begin with emotional safety, then one grounded practice.`,
    spokenBlocks: [
      `${levelSpecific.teacher} lens: ${levelSpecific.teaching}`,
      `Reflection: ${levelSpecific.reflectionPrompt}`,
      ...ritualSteps,
    ],
    transcriptBlocks: [
      `${levelSpecific.teacher} lens: ${levelSpecific.teaching}`,
      `Reflection: ${levelSpecific.reflectionPrompt}`,
      ...ritualSteps,
    ],
    ritualRefs: [ritualId],
    excerptRefs: excerpt ? [excerpt.excerptId] : [],
    closingText: levelSpecific.closing,
    territory: "repair",
    knowledgeSource: "/mnt/data/sacred_path_repair_reconnect_ai_guide.md",
    teacherAttribution: levelSpecific.teacher,
    audioProvider: "elevenlabs",
  };
};

const intentionLabel: Record<SacredVoiceIntention, string> = {
  meditate: "Meditation",
  breathe: "Breath Practice",
  guide_us: "Guided Sequence",
  read_ancient_wisdom: "Wisdom Reading",
  repair_after_tension: "Repair Session",
  deeper_intimacy: "Intimacy Session",
};

const sourceLabel: Record<SacredVoiceSourceTag, string> = {
  tantra: "Tantra",
  tao: "Tao",
  slow_love: "Slow Love",
  polarity: "Polarity",
  heart_path: "Heart Path",
  osho: "Osho",
  diana_richardson: "Diana Richardson",
  deida: "Deida",
  margot_anand: "Margot Anand",
  jan_day: "Jan Day",
  daniel_odier: "Daniel Odier",
  sacred_path: "Sacred Path",
};

export const generateSacredVoiceSession = (selection: SacredVoiceSelection): SacredVoiceSession => {
  if (selection.intention === "repair_after_tension") {
    const repair = buildRepairSession(selection);
    return { ...repair, duration: selection.duration, mode: selection.mode };
  }

  const template = findTemplate(selection);
  const base = compileSession(template);

  // Always honor the user's selection for duration, mode, source and title
  // so the "Now Playing" card never shows a stale ritual name or length.
  const dynamicTitle = `${sourceLabel[selection.sourceTag]} ${intentionLabel[selection.intention]} · ${selection.duration} min`;

  return {
    ...base,
    id: `${base.id}-${selection.sourceTag}-${selection.duration}-${selection.mode}`,
    sourceTag: selection.sourceTag,
    duration: selection.duration,
    mode: selection.mode,
    title: dynamicTitle,
  };
};

export const getSacredVoiceRituals = (session: SacredVoiceSession) =>
  session.ritualRefs
    .map((ritualId) => toVoiceRitual(ritualId))
    .filter((ritual): ritual is SacredVoiceRitual => Boolean(ritual));

export const getSacredVoiceExcerptByRef = (excerptRef: string) => {
  const match = Object.values(sourceExcerpts).find((source) => source.excerptId === excerptRef);
  return match ?? null;
};

export const getSacredVoiceTemplateLibrary = () => sessionTemplates.map(compileSession);

export const formatSacredVoiceRitualSteps = (ritualId: string) => formatRitualSteps(ritualId);

export const getSacredVoiceRitualById = (ritualId: string) => toVoiceRitual(ritualId);

export const getSacredVoiceExcerptBySourceTag = (sourceTag: SacredVoiceSourceTag) =>
  sourceExcerpts[sourceTag] ?? null;

export const getSacredVoicePromptTemplate = (intention: SacredVoiceIntention) =>
  promptByIntention[intention];
