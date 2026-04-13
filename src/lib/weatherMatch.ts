import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import type { Language } from "@/contexts/LanguageContext";

export type WeatherKey =
  | "open"
  | "tender"
  | "playful"
  | "stressed"
  | "longing"
  | "erotic"
  | "tired"
  | "reassurance";

type Localized = {
  en: string;
  fr: string;
  cs: string;
};

export type SourceMode = "tradition" | "author" | "hybrid";
export type SourceConfidence = "high" | "medium" | "low";

export type LibraryLink = {
  label: string;
  to: string;
};

export type SourceLineage = {
  sourceTraditions: string[];
  sourceAuthors: string[];
  sourceConcepts: string[];
  sourceMode: SourceMode;
  sourceNotes: string;
  sourceConfidence: Exclude<SourceConfidence, "low">;
};

export type RitualRecommendation = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accessTier: "free" | "premium";
  premiumTeaser: string;
  matchArchetypes: string[];
  energyProfiles: WeatherKey[];
  ritualDuration: string;
  intimacyLevel: string;
  primaryNeed: string;
  ritualSteps: string[];
  messageSuggestion: string;
  tonightEnergy: string;
  whatToAvoid: string;
  afterglowPrompt: string;
  sourceTraditions: string[];
  sourceAuthors: string[];
  sourceConcepts: string[];
  sourceExplanation: string;
  libraryLinks: LibraryLink[];
  heroImageKey: string;
};

export type MatchArchetype = {
  key: string;
  title: string;
  symbolicMeaning: string;
  bestPath: string;
  wordingTone: string;
  sourceFamilies: string[];
};

export type HeroImage = {
  key: string;
  src: string;
  alt: string;
};

export type WeatherMatchResult = {
  matchKey: string;
  pairLabel: string;
  interpretation: string;
  summary: string;
  firstMeaning: string;
  secondMeaning: string;
  combinedMeaning: string;
  archetype: MatchArchetype;
  heroImage: HeroImage;
  recommendations: RitualRecommendation[];
  lineage: SourceLineage;
  lineageLine: string;
  libraryLinks: LibraryLink[];
};

type WeatherMeta = {
  label: Localized;
  hint: Localized;
  meaning: Localized;
  emoji: string;
  energy: 1 | 2 | 3 | 4 | 5;
  intimacy: 1 | 2 | 3 | 4 | 5;
};

type LinkTemplate = {
  type: "paths" | "authors";
  slug: string;
  label: Localized;
};

type RitualTemplate = {
  id: string;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  premiumTeaser?: Localized;
  matchArchetypes: string[];
  energyProfiles: WeatherKey[];
  ritualDuration: Localized;
  intimacyLevel: Localized;
  primaryNeed: Localized;
  ritualSteps: Localized[];
  messageSuggestion: Localized;
  tonightEnergy: Localized;
  whatToAvoid: Localized;
  afterglowPrompt: Localized;
  sourceTraditions: string[];
  sourceAuthors: string[];
  sourceConcepts: string[];
  sourceMode: SourceMode;
  sourceNotes: Localized;
  sourceConfidence: SourceConfidence;
  libraryLinks: LinkTemplate[];
  heroImageKey: string;
};

type ArchetypeTemplate = {
  key: string;
  title: Localized;
  symbolicMeaning: Localized;
  bestPath: Localized;
  wordingTone: Localized;
  interpretation: Localized;
  summary: Localized;
  combinedMeaning: Localized;
  heroImageKey: string;
  rituals: RitualTemplate[];
  sourceTraditions: string[];
  sourceAuthors: string[];
  sourceConcepts: string[];
  sourceMode: SourceMode;
  sourceNotes: Localized;
  sourceConfidence: SourceConfidence;
};

const lz = (en: string, fr?: string, cs?: string): Localized => ({
  en,
  fr: fr ?? en,
  cs: cs ?? en,
});

const t = (value: Localized, lang: Language) => (lang === "fr" ? value.fr : lang === "cs" ? value.cs : value.en);

const weatherMeta: Record<WeatherKey, WeatherMeta> = {
  open: {
    label: lz("Open", "Ouvert", "Otevřenost"),
    hint: lz("Available, spacious, ready for closeness.", "Disponible et prêt pour la proximité.", "Dostupnost a připravenost na blízkost."),
    meaning: lz(
      "Open weather welcomes direct connection and clearer emotional contact.",
      "Le climat ouvert accueille une connexion directe et un contact émotionnel plus clair.",
      "Otevřené počasí vítá přímé spojení a jasnější emoční kontakt.",
    ),
    emoji: "☀️",
    energy: 3,
    intimacy: 4,
  },
  tender: {
    label: lz("Tender", "Tendre", "Něžnost"),
    hint: lz("Soft and emotional, wanting warmth and care.", "Doux et émotionnel, avec besoin de chaleur.", "Jemný emoční stav s potřebou tepla."),
    meaning: lz(
      "Tender weather asks for slower touch, emotional safety, and warmth.",
      "Le climat tendre demande un toucher plus lent, sécurité émotionnelle et chaleur.",
      "Něžné počasí volá po pomalejším doteku, bezpečí a vřelosti.",
    ),
    emoji: "💗",
    energy: 2,
    intimacy: 4,
  },
  playful: {
    label: lz("Playful", "Joueur", "Hravost"),
    hint: lz("Light, curious, flirtatious energy.", "Énergie légère, curieuse et joueuse.", "Lehká, zvídavá a flirtující energie."),
    meaning: lz(
      "Playful weather keeps pressure low and connection alive through joy.",
      "Le climat joueur garde la pression basse et nourrit le lien par la joie.",
      "Hravé počasí snižuje tlak a drží spojení živé skrze radost.",
    ),
    emoji: "✨",
    energy: 4,
    intimacy: 3,
  },
  stressed: {
    label: lz("Stressed", "Stressé", "Stres"),
    hint: lz("Full mind, low capacity, needing gentleness.", "Mental chargé, faible capacité.", "Přehlcená mysl a menší kapacita."),
    meaning: lz(
      "Stressed weather needs regulation first, then intimacy.",
      "Le climat stressé a besoin de régulation avant l'intimité.",
      "Stresové počasí potřebuje nejprve regulaci a pak intimitu.",
    ),
    emoji: "☁️",
    energy: 2,
    intimacy: 2,
  },
  longing: {
    label: lz("Longing", "En manque", "Touha"),
    hint: lz("Missing something, wanting depth or contact.", "Manque de contact et envie de profondeur.", "Chybí kontakt a volání po hloubce."),
    meaning: lz(
      "Longing weather seeks depth, reassurance, and meaningful contact.",
      "Le climat de manque cherche profondeur, réassurance et contact significatif.",
      "Počasí touhy hledá hloubku, ujištění a smysluplný kontakt.",
    ),
    emoji: "🌙",
    energy: 3,
    intimacy: 5,
  },
  erotic: {
    label: lz("Erotic", "Érotique", "Erotično"),
    hint: lz("Desire is present and wants direction.", "Le désir est présent et demande une direction.", "Touha je přítomná a chce směr."),
    meaning: lz(
      "Erotic weather carries desire and responds to attuned pacing.",
      "Le climat érotique porte le désir et répond au bon rythme.",
      "Erotické počasí nese touhu a reaguje na vyladěné tempo.",
    ),
    emoji: "🔥",
    energy: 5,
    intimacy: 4,
  },
  tired: {
    label: lz("Tired", "Fatigué", "Únava"),
    hint: lz("Low energy, low pressure, slow rhythm needed.", "Énergie basse, pression basse.", "Nízká energie a potřeba pomalého rytmu."),
    meaning: lz(
      "Tired weather asks for co-regulation, low pressure, and restoration.",
      "Le climat fatigué demande co-régulation, faible pression et restauration.",
      "Unavené počasí volá po koregulaci, nízkém tlaku a obnově.",
    ),
    emoji: "🫧",
    energy: 1,
    intimacy: 2,
  },
  reassurance: {
    label: lz("Reassurance", "Réassurance", "Ujištění"),
    hint: lz("Needs safety, soothing, and emotional grounding.", "Besoin de sécurité et d'apaisement.", "Potřeba bezpečí, uklidnění a ukotvení."),
    meaning: lz(
      "Reassurance weather seeks safety before depth.",
      "Le climat de réassurance cherche la sécurité avant la profondeur.",
      "Počasí ujištění hledá nejprve bezpečí a teprve pak hloubku.",
    ),
    emoji: "⚡",
    energy: 2,
    intimacy: 3,
  },
};

const heroImageByKey: Record<string, { src: string; alt: Localized }> = {
  "hold-me-then-ignite": {
    src: shivaShaktiIcon,
    alt: lz("Shiva holding Shakti in devotional reassurance"),
  },
  "shared-fire": {
    src: shivaShaktiIcon,
    alt: lz("Sacred facing couple with central current"),
  },
  "playful-fire": {
    src: shivaShaktiIcon,
    alt: lz("Playful luminous sacred couple energy"),
  },
  "sacred-rest": {
    src: shivaShaktiIcon,
    alt: lz("Sacred rest in moonlit stillness"),
  },
  "nectar-play": {
    src: shivaShaktiIcon,
    alt: lz("Radiant playful couple in motion"),
  },
  "approach-with-reverence": {
    src: shivaShaktiIcon,
    alt: lz("Near-touch invitation with patience and tenderness"),
  },
  "attuned-bridge": {
    src: shivaShaktiIcon,
    alt: lz("Two partners crossing toward shared attunement"),
  },
};

const toLibraryLink = (template: LinkTemplate, lang: Language): LibraryLink => {
  const base = template.type === "paths" ? "/app/paths" : "/app/authors";
  return {
    label: t(template.label, lang),
    to: `${base}?focus=${template.slug}`,
  };
};

const canonicalPair = (left: WeatherKey, right: WeatherKey) => [left, right].sort().join("+");

const smoothBridgeRitual = (heroImageKey: string): RitualTemplate => ({
  id: "bridge-soft-start",
  title: lz("Warmth Before Fire"),
  subtitle: lz("Containment before escalation"),
  description: lz("Begin with devotional holding, then open breath and touch only if both bodies soften."),
  matchArchetypes: ["hold-me-then-ignite", "approach-with-reverence", "attuned-bridge"],
  energyProfiles: ["playful", "erotic", "tired", "reassurance", "tender", "stressed"],
  ritualDuration: lz("8 minutes"),
  intimacyLevel: lz("Gentle to medium"),
  primaryNeed: lz("Safety and attuned arousal"),
  ritualSteps: [
    lz("Sit close. One partner holds, one receives, for 90 seconds."),
    lz("Breathe together: 4-count inhale, 6-count exhale, for five rounds."),
    lz("Each says one sentence: “What I need first is…”"),
    lz("Only then choose soft touch or restful closeness."),
  ],
  messageSuggestion: lz("I want to hold you first, then see what opens naturally."),
  tonightEnergy: lz("Warm, reassuring, pressure-light."),
  whatToAvoid: lz("No performance pressure. No escalation by force."),
  afterglowPrompt: lz("Which moment made your body feel safer with me?"),
  sourceTraditions: ["Slow Sex", "Tao", "Tantra"],
  sourceAuthors: ["Diana Richardson", "Mantak Chia"],
  sourceConcepts: ["presence over performance", "energetic pacing", "devotional touch"],
  sourceMode: "hybrid",
  sourceNotes: lz("This sequence uses Slow Sex pacing and Taoist down-regulation before sensual opening."),
  sourceConfidence: "high",
  libraryLinks: [
    { type: "paths", slug: "tao", label: lz("Open Tao path") },
    { type: "paths", slug: "tantra", label: lz("Open Tantra path") },
    { type: "authors", slug: "mantak-chia", label: lz("Open Mantak Chia") },
  ],
  heroImageKey,
});

const archetypeTemplates: Record<string, ArchetypeTemplate> = {
  "playful-fire": {
    key: "playful-fire",
    title: lz("Playful Fire"),
    symbolicMeaning: lz("Desire meets lightness."),
    bestPath: lz("Teasing, curious, low-pressure sensuality."),
    wordingTone: lz("Lively, flirtatious, responsive."),
    interpretation: lz("Desire meets curiosity in a playful current."),
    summary: lz("Keep this alive through teasing, laughter, eye contact, and consented sensual play."),
    combinedMeaning: lz("Tonight’s path: light touch, clear signals, and joyful erotic attention."),
    heroImageKey: "playful-fire",
    sourceTraditions: ["Tantra", "Kama Sutra", "Polarity"],
    sourceAuthors: ["David Deida"],
    sourceConcepts: ["sexual polarity", "aesthetic sensuality", "energetic pacing"],
    sourceMode: "hybrid",
    sourceNotes: lz("Kama-inspired anticipation with tantric presence keeps joy and eros in one field."),
    sourceConfidence: "high",
    rituals: [
      {
        id: "tease-gaze-touch",
        title: lz("Tease, Gaze, Touch"),
        subtitle: lz("A pressure-light ignition ritual"),
        description: lz("Trade playful lines, hold eye contact, then add one intentional touch each round."),
        matchArchetypes: ["playful-fire", "nectar-play"],
        energyProfiles: ["playful", "erotic"],
        ritualDuration: lz("7 minutes"),
        intimacyLevel: lz("Medium"),
        primaryNeed: lz("Spark with safety"),
        ritualSteps: [
          lz("Share one playful invitation each."),
          lz("Hold eye contact for 20 seconds before touch."),
          lz("Take turns offering one intentional touch."),
          lz("Pause and ask: more, same, or softer?"),
        ],
        messageSuggestion: lz("I’m in a playful mood. Want to open a teasing ritual with me?"),
        tonightEnergy: lz("Luminous, teasing, curious."),
        whatToAvoid: lz("Avoid rushing to intensity or over-talking."),
        afterglowPrompt: lz("When did teasing become true intimacy?"),
        sourceTraditions: ["Kama Sutra", "Tantra"],
        sourceAuthors: ["David Deida"],
        sourceConcepts: ["anticipation", "presence over performance", "sexual polarity"],
        sourceMode: "hybrid",
        sourceNotes: lz("Kama-inspired anticipation is grounded in tantric pacing and conscious polarity."),
        sourceConfidence: "high",
        libraryLinks: [
          { type: "paths", slug: "kama-sutra", label: lz("Open Kama path") },
          { type: "paths", slug: "tantra", label: lz("Open Tantra path") },
          { type: "authors", slug: "deida", label: lz("Open David Deida") },
        ],
        heroImageKey: "playful-fire",
      },
      {
        id: "one-song-current",
        title: lz("One Song Current"),
        subtitle: lz("Move before words"),
        description: lz("Let one song guide movement and polarity, then share one desire sentence each."),
        matchArchetypes: ["playful-fire", "nectar-play"],
        energyProfiles: ["playful", "erotic", "open"],
        ritualDuration: lz("5 minutes"),
        intimacyLevel: lz("Medium"),
        primaryNeed: lz("Embodied playful charge"),
        ritualSteps: [
          lz("Choose one song and stay connected through movement."),
          lz("No analysis. Track breath and rhythm."),
          lz("At the end, each shares one desire sentence."),
        ],
        messageSuggestion: lz("One song with me tonight? Let’s feel before we decide."),
        tonightEnergy: lz("Light, embodied, magnetizing."),
        whatToAvoid: lz("Avoid judgment of movement or performance."),
        afterglowPrompt: lz("What felt most alive in your body during the song?"),
        sourceTraditions: ["Kama Sutra", "Polarity"],
        sourceAuthors: ["Margot Anand"],
        sourceConcepts: ["aesthetic sensuality", "relational charge", "embodied invitation"],
        sourceMode: "hybrid",
        sourceNotes: lz("Uses Kama’s aesthetic play and polarity dynamics through simple embodied movement."),
        sourceConfidence: "medium",
        libraryLinks: [
          { type: "paths", slug: "kama-sutra", label: lz("Open Kama path") },
          { type: "paths", slug: "polarity", label: lz("Open Polarity path") },
          { type: "authors", slug: "margot-anand", label: lz("Open Margot Anand") },
        ],
        heroImageKey: "playful-fire",
      },
    ],
  },
  "hold-me-then-ignite": {
    key: "hold-me-then-ignite",
    title: lz("Hold Me, Then Ignite Me"),
    symbolicMeaning: lz("Spark is present, but safety must come first."),
    bestPath: lz("Containment, reassurance, breath, gradual awakening."),
    wordingTone: lz("Warm, reverent, calming."),
    interpretation: lz("Desire is alive, yet one body needs holding before opening."),
    summary: lz("Begin with reassurance and regulation. Let eros rise only after safety is felt."),
    combinedMeaning: lz("Warmth before fire. Holding before demand."),
    heroImageKey: "hold-me-then-ignite",
    sourceTraditions: ["Slow Sex", "Tao", "Tantra", "Polarity"],
    sourceAuthors: ["Diana Richardson", "Mantak Chia", "David Deida"],
    sourceConcepts: ["sacred rest", "presence over performance", "devotional touch", "energetic pacing"],
    sourceMode: "hybrid",
    sourceNotes: lz("This archetype uses Taoist regulation and Slow Sex pacing before conscious polarity."),
    sourceConfidence: "high",
    rituals: [
      smoothBridgeRitual("hold-me-then-ignite"),
      {
        id: "devotional-hold",
        title: lz("Devotional Holding"),
        subtitle: lz("Safety-led reconnection"),
        description: lz("Use stillness, hand placement, and breath to reassure the nervous system before sensuality."),
        matchArchetypes: ["hold-me-then-ignite", "sacred-rest"],
        energyProfiles: ["tired", "reassurance", "tender", "erotic"],
        ritualDuration: lz("10 minutes"),
        intimacyLevel: lz("Gentle"),
        primaryNeed: lz("Co-regulation and reassurance"),
        ritualSteps: [
          lz("Lie side-by-side or in a held embrace."),
          lz("One hand on heart, one hand on lower belly."),
          lz("Breathe slowly and say: “You do not need to perform with me.”"),
          lz("Choose rest or one soft sensual invitation."),
        ],
        messageSuggestion: lz("I want to hold you gently first. We can stay soft tonight."),
        tonightEnergy: lz("Reassuring and devotional."),
        whatToAvoid: lz("Avoid asking for intensity before softening."),
        afterglowPrompt: lz("What made you feel most protected and desired at once?"),
        sourceTraditions: ["Tantra", "Slow Sex", "Tao"],
        sourceAuthors: ["Diana Richardson", "Mantak Chia"],
        sourceConcepts: ["devotional touch", "co-regulation", "non-forcing"],
        sourceMode: "hybrid",
        sourceNotes: lz("A devotional containment ritual inspired by Slow Sex and Taoist non-forcing."),
        sourceConfidence: "high",
        libraryLinks: [
          { type: "paths", slug: "tantra", label: lz("Open Tantra path") },
          { type: "paths", slug: "tao", label: lz("Open Tao path") },
          { type: "authors", slug: "mantak-chia", label: lz("Open Mantak Chia") },
        ],
        heroImageKey: "hold-me-then-ignite",
      },
    ],
  },
  "sacred-rest": {
    key: "sacred-rest",
    title: lz("Sacred Rest"),
    symbolicMeaning: lz("Restore the field before asking for intensity."),
    bestPath: lz("Co-regulation, stillness, reassurance, low-demand touch."),
    wordingTone: lz("Grounded, soothing, nourishing."),
    interpretation: lz("Both nervous systems are asking for restoration."),
    summary: lz("Treat rest as intimate practice. Safety and closeness come before charge."),
    combinedMeaning: lz("Tonight is for replenishment, not performance."),
    heroImageKey: "sacred-rest",
    sourceTraditions: ["Tao", "Slow Sex", "Tantra"],
    sourceAuthors: ["Mantak Chia", "Diana Richardson"],
    sourceConcepts: ["sacred rest", "nervous-system care", "presence over performance"],
    sourceMode: "hybrid",
    sourceNotes: lz("A restorative template rooted in Taoist regulation and Slow Sex non-goal intimacy."),
    sourceConfidence: "high",
    rituals: [
      {
        id: "moon-exhale",
        title: lz("Moon Exhale Practice"),
        subtitle: lz("Shared downshift"),
        description: lz("Synchronize long exhales and let shared calm become tonight’s intimacy."),
        matchArchetypes: ["sacred-rest"],
        energyProfiles: ["tired", "stressed", "reassurance"],
        ritualDuration: lz("6 minutes"),
        intimacyLevel: lz("Gentle"),
        primaryNeed: lz("Regulation and calm closeness"),
        ritualSteps: [
          lz("Sit or lie side-by-side."),
          lz("Take ten shared slow exhales."),
          lz("Keep one point of body contact in silence."),
          lz("Close with one reassurance sentence each."),
        ],
        messageSuggestion: lz("Can we do six minutes of soft breathing together tonight?"),
        tonightEnergy: lz("Moonlit stillness."),
        whatToAvoid: lz("Avoid debate, problem-solving, and pressure."),
        afterglowPrompt: lz("Did rest increase trust between us tonight?"),
        sourceTraditions: ["Tao", "Slow Sex"],
        sourceAuthors: ["Mantak Chia"],
        sourceConcepts: ["energy pacing", "co-regulation", "nourishment"],
        sourceMode: "hybrid",
        sourceNotes: lz("Taoist breath pacing with a Slow Sex style of pressure-free closeness."),
        sourceConfidence: "high",
        libraryLinks: [
          { type: "paths", slug: "tao", label: lz("Open Tao path") },
          { type: "authors", slug: "mantak-chia", label: lz("Open Mantak Chia") },
        ],
        heroImageKey: "sacred-rest",
      },
      smoothBridgeRitual("sacred-rest"),
    ],
  },
  "shared-fire": {
    key: "shared-fire",
    title: lz("Shared Fire"),
    symbolicMeaning: lz("Mutual desire with room for deeper practice."),
    bestPath: lz("Presence, gaze, breath, attuned escalation."),
    wordingTone: lz("Devotional, magnetic, focused."),
    interpretation: lz("Both of you are in erotic alignment."),
    summary: lz("Let intensity rise through attunement, not urgency."),
    combinedMeaning: lz("Slow charge, clear consent, reverent fire."),
    heroImageKey: "shared-fire",
    sourceTraditions: ["Tantra", "Polarity", "Tao"],
    sourceAuthors: ["David Deida", "Mantak Chia", "Margot Anand"],
    sourceConcepts: ["sexual polarity", "energetic union", "attuned escalation"],
    sourceMode: "hybrid",
    sourceNotes: lz("Combines tantric presence with polarity direction and Taoist pacing."),
    sourceConfidence: "high",
    rituals: [
      {
        id: "gaze-current",
        title: lz("Gaze and Current"),
        subtitle: lz("Charge through presence"),
        description: lz("Use eye contact and synchronized breath before any stronger touch."),
        matchArchetypes: ["shared-fire"],
        energyProfiles: ["erotic", "open", "longing"],
        ritualDuration: lz("9 minutes"),
        intimacyLevel: lz("Medium to deep"),
        primaryNeed: lz("Conscious erotic coherence"),
        ritualSteps: [
          lz("Sit facing, knees or hands connected."),
          lz("Breathe together for three rounds."),
          lz("Hold eye contact for one minute."),
          lz("Enter touch slowly and keep check-ins verbal."),
        ],
        messageSuggestion: lz("I feel strong desire. Want to meet in a slower sacred way tonight?"),
        tonightEnergy: lz("Focused and devotional."),
        whatToAvoid: lz("Avoid jumping to fast intensity."),
        afterglowPrompt: lz("Where did desire feel most connected to reverence?"),
        sourceTraditions: ["Tantra", "Polarity"],
        sourceAuthors: ["David Deida", "Margot Anand"],
        sourceConcepts: ["presence", "polarity", "devotional eros"],
        sourceMode: "hybrid",
        sourceNotes: lz("A polarity-aware tantric gaze ritual to keep desire connected to attunement."),
        sourceConfidence: "high",
        libraryLinks: [
          { type: "paths", slug: "tantra", label: lz("Open Tantra path") },
          { type: "paths", slug: "polarity", label: lz("Open Polarity path") },
          { type: "authors", slug: "deida", label: lz("Open David Deida") },
        ],
        heroImageKey: "shared-fire",
      },
      {
        id: "desire-map-round",
        title: lz("Desire Map Round"),
        subtitle: lz("Clarity keeps fire clean"),
        description: lz("Each partner names one yes, one no, and one maybe before touching."),
        matchArchetypes: ["shared-fire", "playful-fire"],
        energyProfiles: ["erotic", "open"],
        ritualDuration: lz("6 minutes"),
        intimacyLevel: lz("Medium"),
        primaryNeed: lz("Consent clarity"),
        ritualSteps: [
          lz("Name one clear yes."),
          lz("Name one clear no."),
          lz("Name one curious maybe."),
          lz("Choose one shared yes to begin."),
        ],
        messageSuggestion: lz("Let’s map our yes/no/maybe first so tonight stays connected."),
        tonightEnergy: lz("Clear, intentional, charged."),
        whatToAvoid: lz("Avoid assumption-based escalation."),
        afterglowPrompt: lz("Which consent moment increased desire most?"),
        sourceTraditions: ["Slow Sex", "Tantra"],
        sourceAuthors: ["Diana Richardson"],
        sourceConcepts: ["presence over performance", "consent language", "attuned pacing"],
        sourceMode: "hybrid",
        sourceNotes: lz("Slow Sex consent pacing layered into a tantric charge ritual."),
        sourceConfidence: "high",
        libraryLinks: [
          { type: "paths", slug: "tantra", label: lz("Open Tantra path") },
          { type: "authors", slug: "deida", label: lz("Open David Deida") },
        ],
        heroImageKey: "shared-fire",
      },
    ],
  },
  "nectar-play": {
    key: "nectar-play",
    title: lz("Nectar Play"),
    symbolicMeaning: lz("Joy, movement, and flirt become connection."),
    bestPath: lz("Laughter, movement, curiosity, pressure-light warmth."),
    wordingTone: lz("Radiant, playful, affectionate."),
    interpretation: lz("Both of you are in playful alignment."),
    summary: lz("Use joy as doorway. Keep things light while staying emotionally real."),
    combinedMeaning: lz("Let laughter open closeness."),
    heroImageKey: "nectar-play",
    sourceTraditions: ["Kama Sutra", "Tantra"],
    sourceAuthors: ["Margot Anand"],
    sourceConcepts: ["aesthetic sensuality", "curiosity", "embodied joy"],
    sourceMode: "hybrid",
    sourceNotes: lz("Kama’s art-of-pleasure meets tantric presence in a non-demanding format."),
    sourceConfidence: "medium",
    rituals: [
      {
        id: "flirt-circuit",
        title: lz("Flirt Circuit"),
        subtitle: lz("Three rounds of playful polarity"),
        description: lz("Alternate playful dares and appreciative touch with consent cues."),
        matchArchetypes: ["nectar-play", "playful-fire"],
        energyProfiles: ["playful", "open"],
        ritualDuration: lz("8 minutes"),
        intimacyLevel: lz("Light to medium"),
        primaryNeed: lz("Joyful reconnection"),
        ritualSteps: [
          lz("Each gives one playful invitation."),
          lz("Each offers one appreciative touch."),
          lz("Pause and share one sentence of gratitude."),
        ],
        messageSuggestion: lz("Want to do a playful flirt circuit for eight minutes tonight?"),
        tonightEnergy: lz("Joyful and bright."),
        whatToAvoid: lz("Avoid sarcasm or edgy teasing that harms safety."),
        afterglowPrompt: lz("What playful moment made you feel most chosen?"),
        sourceTraditions: ["Kama Sutra", "Polarity"],
        sourceAuthors: ["Margot Anand"],
        sourceConcepts: ["anticipation", "relational charge", "aesthetic sensuality"],
        sourceMode: "hybrid",
        sourceNotes: lz("Kama play and polarity contrast used for low-pressure intimacy momentum."),
        sourceConfidence: "medium",
        libraryLinks: [
          { type: "paths", slug: "kama-sutra", label: lz("Open Kama path") },
          { type: "authors", slug: "margot-anand", label: lz("Open Margot Anand") },
        ],
        heroImageKey: "nectar-play",
      },
      {
        id: "one-minute-appreciations",
        title: lz("One-Minute Appreciations"),
        subtitle: lz("Affection before agenda"),
        description: lz("Each partner offers one minute of verbal and physical appreciation."),
        matchArchetypes: ["nectar-play", "approach-with-reverence"],
        energyProfiles: ["playful", "tender", "open"],
        ritualDuration: lz("4 minutes"),
        intimacyLevel: lz("Gentle"),
        primaryNeed: lz("Warm emotional contact"),
        ritualSteps: [
          lz("Set a one-minute timer each."),
          lz("Offer specific appreciation, then gentle touch."),
          lz("Close with one shared smile and one breath."),
        ],
        messageSuggestion: lz("Let’s do one-minute appreciations before anything else."),
        tonightEnergy: lz("Warm and bright."),
        whatToAvoid: lz("Avoid turning this into a fix-it conversation."),
        afterglowPrompt: lz("Which appreciation landed deepest in your body?"),
        sourceTraditions: ["Tantra", "Slow Sex"],
        sourceAuthors: [],
        sourceConcepts: ["presence", "devotional language", "low-pressure intimacy"],
        sourceMode: "tradition",
        sourceNotes: lz("A simple devotional language ritual rooted in presence-first traditions."),
        sourceConfidence: "medium",
        libraryLinks: [
          { type: "paths", slug: "tantra", label: lz("Open Tantra path") },
          { type: "paths", slug: "tao", label: lz("Open Tao path") },
        ],
        heroImageKey: "nectar-play",
      },
    ],
  },
  "approach-with-reverence": {
    key: "approach-with-reverence",
    title: lz("Approach With Reverence"),
    symbolicMeaning: lz("One partner is open, the other guarded or tender."),
    bestPath: lz("Invitation, patience, non-forcing, emotional safety."),
    wordingTone: lz("Patient, soft, respectful."),
    interpretation: lz("The field asks for invitation without pressure."),
    summary: lz("Move slowly, ask clearly, and let trust lead pacing."),
    combinedMeaning: lz("Approach with reverence, not urgency."),
    heroImageKey: "approach-with-reverence",
    sourceTraditions: ["Slow Sex", "Tao", "Devotional intimacy"],
    sourceAuthors: ["Diana Richardson"],
    sourceConcepts: ["non-forcing", "sacred approach", "emotional safety"],
    sourceMode: "hybrid",
    sourceNotes: lz("A safety-first approach drawn from Slow Sex and Taoist non-forcing principles."),
    sourceConfidence: "high",
    rituals: [smoothBridgeRitual("approach-with-reverence")],
  },
};

const stateOrFallback = (value: string): WeatherKey => {
  if (value in weatherMeta) return value as WeatherKey;
  return "open";
};

const resolveArchetypeKey = (first: WeatherKey, second: WeatherKey) => {
  const canonical = canonicalPair(first, second);
  if (canonical === canonicalPair("playful", "erotic")) return "playful-fire";
  if (canonical === canonicalPair("erotic", "erotic")) return "shared-fire";
  if (canonical === canonicalPair("playful", "playful")) return "nectar-play";
  if (canonical === canonicalPair("tired", "tired")) return "sacred-rest";

  const sparkStates: WeatherKey[] = ["playful", "erotic"];
  const sootheStates: WeatherKey[] = ["tired", "reassurance", "tender", "stressed"];
  if ((sparkStates.includes(first) && sootheStates.includes(second)) || (sparkStates.includes(second) && sootheStates.includes(first))) {
    return "hold-me-then-ignite";
  }

  if ((first === "open" && sootheStates.includes(second)) || (second === "open" && sootheStates.includes(first))) {
    return "approach-with-reverence";
  }

  return "attuned-bridge";
};

const fallbackArchetype = (first: WeatherKey, second: WeatherKey): ArchetypeTemplate => {
  const left = weatherMeta[first];
  const right = weatherMeta[second];
  const avgEnergy = Math.round((left.energy + right.energy) / 2);
  const avgIntimacy = Math.round((left.intimacy + right.intimacy) / 2);

  const energyTone = avgEnergy <= 2
    ? lz("Low pressure and restorative")
    : avgEnergy >= 4
    ? lz("Alive and expressive")
    : lz("Balanced and gradual");
  const intimacyTone = avgIntimacy >= 4
    ? lz("Emotionally close and depth-seeking")
    : lz("Needs gentle trust-building first");

  return {
    key: "attuned-bridge",
    title: lz("Attuned Bridge"),
    symbolicMeaning: lz("Two different energies meeting in one shared practice."),
    bestPath: lz("Find shared pace, then choose depth."),
    wordingTone: lz("Grounded, precise, caring."),
    interpretation: lz("A unique shared weather is forming."),
    summary: lz("This pairing needs personalized pacing rather than generic ritual advice."),
    combinedMeaning: lz("Honor both energies and choose one concrete next step together."),
    heroImageKey: "attuned-bridge",
    sourceTraditions: ["Tantra", "Tao", "Slow Sex"],
    sourceAuthors: [],
    sourceConcepts: ["energetic pacing", "presence over performance", "non-forcing"],
    sourceMode: "tradition",
    sourceNotes: lz(`This bridge blends ${t(energyTone, "en")} with ${t(intimacyTone, "en")} using cross-tradition pacing.`),
    sourceConfidence: "medium",
    rituals: [smoothBridgeRitual("attuned-bridge")],
  };
};

const normalizeAuthors = (authors: string[]) => authors.filter(Boolean);

const lineageLine = (traditions: string[], authors: string[], lang: Language) => {
  const intro = lang === "fr" ? "Inspiré de " : lang === "cs" ? "Inspirováno " : "Inspired by ";
  const tSegment = traditions.slice(0, 3).join(", ");
  const aSegment = authors.length ? (lang === "fr" ? ` et ${authors.slice(0, 2).join(", ")}` : lang === "cs" ? ` a ${authors.slice(0, 2).join(", ")}` : ` and ${authors.slice(0, 2).join(", ")}`) : "";
  return `${intro}${tSegment}${aSegment}`;
};

const toRitualRecommendation = (template: RitualTemplate, lang: Language, index: number): RitualRecommendation => ({
  id: template.id,
  title: t(template.title, lang),
  subtitle: t(template.subtitle, lang),
  description: t(template.description, lang),
  accessTier: index === 0 ? "free" : "premium",
  premiumTeaser: template.premiumTeaser ? t(template.premiumTeaser, lang) : t(template.subtitle, lang),
  matchArchetypes: template.matchArchetypes,
  energyProfiles: template.energyProfiles,
  ritualDuration: t(template.ritualDuration, lang),
  intimacyLevel: t(template.intimacyLevel, lang),
  primaryNeed: t(template.primaryNeed, lang),
  ritualSteps: template.ritualSteps.map((step) => t(step, lang)),
  messageSuggestion: t(template.messageSuggestion, lang),
  tonightEnergy: t(template.tonightEnergy, lang),
  whatToAvoid: t(template.whatToAvoid, lang),
  afterglowPrompt: t(template.afterglowPrompt, lang),
  sourceTraditions: template.sourceTraditions,
  sourceAuthors: normalizeAuthors(template.sourceAuthors),
  sourceConcepts: template.sourceConcepts,
  sourceExplanation: t(template.sourceNotes, lang),
  libraryLinks: template.libraryLinks.map((link) => toLibraryLink(link, lang)),
  heroImageKey: template.heroImageKey,
});

export const getWeatherPresentation = (state: string, lang: Language) => {
  const key = stateOrFallback(state);
  const meta = weatherMeta[key];
  return {
    key,
    label: t(meta.label, lang),
    hint: t(meta.hint, lang),
    emoji: meta.emoji,
    meaning: t(meta.meaning, lang),
  };
};

export const buildWeatherMatchResult = (
  firstRaw: string,
  secondRaw: string,
  lang: Language,
): WeatherMatchResult => {
  const first = stateOrFallback(firstRaw);
  const second = stateOrFallback(secondRaw);
  const firstMeta = getWeatherPresentation(first, lang);
  const secondMeta = getWeatherPresentation(second, lang);
  const matchKey = canonicalPair(first, second);
  const archetypeKey = resolveArchetypeKey(first, second);
  const archetypeTemplate = archetypeTemplates[archetypeKey] ?? fallbackArchetype(first, second);
  const heroRef = heroImageByKey[archetypeTemplate.heroImageKey] ?? heroImageByKey["attuned-bridge"];
  const recommendations = archetypeTemplate.rituals.map((item, index) => toRitualRecommendation(item, lang, index));
  const libraryLinks = Array.from(
    new Map(
      recommendations
        .flatMap((item) => item.libraryLinks)
        .map((link) => [`${link.label}:${link.to}`, link]),
    ).values(),
  );
  const safeConfidence: Exclude<SourceConfidence, "low"> =
    archetypeTemplate.sourceConfidence === "low" ? "medium" : archetypeTemplate.sourceConfidence;
  const sourceAuthors = normalizeAuthors(archetypeTemplate.sourceAuthors);

  return {
    matchKey,
    pairLabel: `${firstMeta.label} ${firstMeta.emoji} + ${secondMeta.label} ${secondMeta.emoji}`,
    interpretation: t(archetypeTemplate.interpretation, lang),
    summary: t(archetypeTemplate.summary, lang),
    firstMeaning: firstMeta.meaning,
    secondMeaning: secondMeta.meaning,
    combinedMeaning: t(archetypeTemplate.combinedMeaning, lang),
    archetype: {
      key: archetypeTemplate.key,
      title: t(archetypeTemplate.title, lang),
      symbolicMeaning: t(archetypeTemplate.symbolicMeaning, lang),
      bestPath: t(archetypeTemplate.bestPath, lang),
      wordingTone: t(archetypeTemplate.wordingTone, lang),
      sourceFamilies: archetypeTemplate.sourceTraditions,
    },
    heroImage: {
      key: archetypeTemplate.heroImageKey,
      src: heroRef.src,
      alt: t(heroRef.alt, lang),
    },
    recommendations,
    lineage: {
      sourceTraditions: archetypeTemplate.sourceTraditions,
      sourceAuthors,
      sourceConcepts: archetypeTemplate.sourceConcepts,
      sourceMode: archetypeTemplate.sourceMode,
      sourceNotes: t(archetypeTemplate.sourceNotes, lang),
      sourceConfidence: safeConfidence,
    },
    lineageLine: lineageLine(archetypeTemplate.sourceTraditions, sourceAuthors, lang),
    libraryLinks,
  };
};
