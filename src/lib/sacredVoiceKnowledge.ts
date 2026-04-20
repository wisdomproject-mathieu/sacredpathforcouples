import type {
  SacredVoiceSourceTag,
  SacredVoiceTerritory,
} from "@/lib/sacredPathVoiceContent";

export type SacredVoiceGuideLevel = 1 | 2 | 3;

export type SacredVoiceGuideSource = {
  territory: SacredVoiceTerritory;
  primaryPath: string;
  fallbackLocalPath: string;
  summary: string;
};

export type SacredVoiceGuideProfile = {
  teacher: string;
  opening: string;
  reflection: string;
  closing: string;
  levelRituals: Record<SacredVoiceGuideLevel, string[]>;
  onePracticeOnly?: boolean;
};

export const SACRED_VOICE_GUIDE_SOURCES: Record<SacredVoiceTerritory, SacredVoiceGuideSource> = {
  repair: {
    territory: "repair",
    primaryPath: "/mnt/data/sacred_path_repair_reconnect_ai_guide.md",
    fallbackLocalPath:
      "/Users/mathieuescande/Documents/SacredLibrary/sacred_path_repair_reconnect_ai_guide.md",
    summary: "Repair and reconnect logic with leveling, teacher routing, and escalation rules.",
  },
  deepen: {
    territory: "deepen",
    primaryPath: "/mnt/data/sacred_path_deepen_intimacy_ai_guide.md",
    fallbackLocalPath:
      "/Users/mathieuescande/Documents/SacredLibrary/sacred_path_deepen_intimacy_ai_guide.md",
    summary: "Deepen intimacy logic for tenderness, ritual nights, and erotic renewal without active conflict.",
  },
  mismatch: {
    territory: "mismatch",
    primaryPath: "/mnt/data/sacred_path_desire_mismatch_ai_guide.md",
    fallbackLocalPath:
      "/Users/mathieuescande/Documents/SacredLibrary/sacred_path_desire_mismatch_ai_guide.md",
    summary: "Desire mismatch guidance for pressure loops, different pace, and long mismatch patterns.",
  },
  daily: {
    territory: "daily",
    primaryPath: "/mnt/data/sacred_path_daily_connection_ai_guide.md",
    fallbackLocalPath:
      "/Users/mathieuescande/Documents/SacredLibrary/sacred_path_daily_connection_ai_guide.md",
    summary: "Daily micro-ritual logic to prevent drift and keep couples connected in ordinary life.",
  },
  reading: {
    territory: "reading",
    primaryPath: "/mnt/data/Sacred_Path_for_Couples.pdf",
    fallbackLocalPath:
      "/Users/mathieuescande/Documents/SacredLibrary/Sacred_Path_for_Couples.pdf",
    summary: "Long-form Sacred Path readings with a linked embodied practice closing.",
  },
};

const DEFAULT_PROFILE: SacredVoiceGuideProfile = {
  teacher: "Sacred Path",
  opening: "Begin slowly. Let this be a shared return to presence.",
  reflection: "What does your bond need most from you in this moment?",
  closing: "Close with one appreciation each before ending.",
  levelRituals: {
    1: ["one_minute_appreciations", "soft_eye_gazing"],
    2: ["daily_homecoming_ritual", "coherent_heart_breath"],
    3: ["appreciation_witness", "daily_homecoming_hold"],
  },
};

const REPAIR_PROFILES: Partial<Record<SacredVoiceSourceTag, SacredVoiceGuideProfile>> = {
  osho: {
    teacher: "Osho",
    opening: "After tension, clear the charge before trying to solve anything.",
    reflection: "What softens when your body discharges first and words come second?",
    closing: "Sit in silence for two minutes before any conversation.",
    onePracticeOnly: true,
    levelRituals: {
      1: ["witnessing_breath"],
      2: ["gibberish_release", "chaotic_breathing"],
      3: ["the_unsaid_voice"],
    },
  },
  jan_day: {
    teacher: "Jan Day",
    opening: "Repair begins when consent and truth return to the body.",
    reflection: "What yes is real tonight, and what no needs to be spoken with care?",
    closing: "Name one clear boundary and one clear invitation.",
    onePracticeOnly: true,
    levelRituals: {
      1: ["yes_no_exercise"],
      2: ["parts_work_dialogue", "yes_no_exercise"],
      3: ["the_unsaid_voice"],
    },
  },
  deida: {
    teacher: "David Deida",
    opening: "Steady presence before strategy. Breath before argument.",
    reflection: "What happens if you stay present without fixing or defending?",
    closing: "Reconnect with one intentional embrace once the charge drops.",
    onePracticeOnly: true,
    levelRituals: {
      1: ["bridge_soft_start"],
      2: ["parts_work_dialogue", "bridge_soft_start"],
      3: ["the_unsaid_voice"],
    },
  },
  tao: {
    teacher: "Mantak Chia",
    opening: "When the body settles, emotional clarity returns.",
    reflection: "Where is tension living in your body right now?",
    closing: "Keep your breath low in the belly for one extra minute.",
    onePracticeOnly: true,
    levelRituals: {
      1: ["inner_smile_with_partner"],
      2: ["three_fires"],
      3: ["the_unsaid_voice"],
    },
  },
  tantra: {
    teacher: "Daniel Odier / Classical Tantra",
    opening: "Do not push emotion away; breathe with it and let it reveal itself.",
    reflection: "Which feeling asks to be witnessed, not solved?",
    closing: "Rest in shared stillness before speaking again.",
    onePracticeOnly: true,
    levelRituals: {
      1: ["space_between_breaths"],
      2: ["vigyan_bhairava_emotional_yoga"],
      3: ["the_unsaid_voice"],
    },
  },
};

const DEEPEN_PROFILES: Partial<Record<SacredVoiceSourceTag, SacredVoiceGuideProfile>> = {
  slow_love: {
    teacher: "Diana Richardson / Slow Love",
    opening: "Slow enough to feel. Soft enough to stay.",
    reflection: "What changes when you remove destination from the practice?",
    closing: "Close in stillness and let the body remember this pace.",
    levelRituals: {
      1: ["soft_eye", "synchronized_heart_breathing"],
      2: ["slow_sex", "space_between_breaths"],
      3: ["karezza", "blissful_stillness_after_love"],
    },
  },
  diana_richardson: {
    teacher: "Diana Richardson",
    opening: "Tonight is for presence over performance.",
    reflection: "Can you choose tenderness before urgency?",
    closing: "Stay close and unhurried for the final minute.",
    levelRituals: {
      1: ["soft_eye", "synchronized_heart_breathing"],
      2: ["slow_sex", "circular_breath_of_love"],
      3: ["karezza", "blissful_stillness_after_love"],
    },
  },
  margot_anand: {
    teacher: "Margot Anand",
    opening: "Consecrate the moment and let the ritual hold you.",
    reflection: "What intention will guide your touch tonight?",
    closing: "Bow out slowly and name one desire sentence each.",
    levelRituals: {
      1: ["heart_salutation", "melting_hug"],
      2: ["yab_yum_embrace", "skydancing_tantric_massage"],
      3: ["riding_the_wave_of_bliss", "sacred_spot_massage_yoni"],
    },
  },
  tao: {
    teacher: "Mantak Chia",
    opening: "Cultivate the current before you spend it.",
    reflection: "Where does your shared energy feel strongest right now?",
    closing: "End by circling one final breath through heart and belly.",
    levelRituals: {
      1: ["inner_smile_with_partner"],
      2: ["circular_breath_of_love", "fire_water_dual_cultivation"],
      3: ["microcosmic_orbit_dual", "big_draw"],
    },
  },
  deida: {
    teacher: "David Deida",
    opening: "Erotic depth grows when polarity is lived with love.",
    reflection: "What quality of presence wants to lead this session?",
    closing: "Complete with one grateful line and one invitation for tomorrow.",
    levelRituals: {
      1: ["one_heart_gazing"],
      2: ["conscious_lovemaking", "circular_breath_of_love"],
      3: ["riding_the_wave_of_bliss", "conscious_lovemaking_barry_long_way"],
    },
  },
};

const MISMATCH_PROFILES: Partial<Record<SacredVoiceSourceTag, SacredVoiceGuideProfile>> = {
  jan_day: {
    teacher: "Jan Day",
    opening: "Different pace is workable when pressure is removed first.",
    reflection: "What no needs honoring before a true yes can appear?",
    closing: "Keep the agreement simple, specific, and kind.",
    onePracticeOnly: true,
    levelRituals: {
      1: ["yes_no_exercise", "daily_homecoming_hold"],
      2: ["soft_eye", "slow_sex"],
      3: ["parts_work_dialogue", "the_unsaid_voice"],
    },
  },
  deida: {
    teacher: "David Deida",
    opening: "Give presence as a gift, not pressure as a request.",
    reflection: "How can you offer love tonight without demanding a response?",
    closing: "End with one keepable agreement for tomorrow.",
    onePracticeOnly: true,
    levelRituals: {
      1: ["bridge_soft_start"],
      2: ["slow_sex", "soft_eye"],
      3: ["parts_work_dialogue", "the_unsaid_voice"],
    },
  },
};

const DAILY_PROFILES: Partial<Record<SacredVoiceSourceTag, SacredVoiceGuideProfile>> = {
  sacred_path: {
    teacher: "Sacred Path Daily Stack",
    opening: "Small rituals, repeated with care, keep love warm.",
    reflection: "What one micro-ritual can you keep tonight?",
    closing: "Finish with one gratitude sentence each.",
    levelRituals: {
      1: ["one_minute_appreciations", "soft_eye_gazing", "appreciation_aloud"],
      2: ["daily_homecoming_ritual", "coherent_heart_breath", "witnessing_breath_reset"],
      3: ["daily_homecoming_hold", "one_song_current", "appreciation_witness"],
    },
  },
  heart_path: {
    teacher: "Embodied Heart",
    opening: "Connection grows in small moments of full attention.",
    reflection: "Where can you choose presence before speed tonight?",
    closing: "Carry this tone into the rest of your evening.",
    levelRituals: {
      1: ["palm_to_heart_touch", "one_minute_appreciations"],
      2: ["daily_homecoming_ritual", "coherent_heart_breath"],
      3: ["daily_homecoming_hold", "appreciation_witness"],
    },
  },
};

export const SACRED_VOICE_GUIDE_PROFILES: Record<
  SacredVoiceTerritory,
  Partial<Record<SacredVoiceSourceTag, SacredVoiceGuideProfile>>
> = {
  repair: REPAIR_PROFILES,
  deepen: DEEPEN_PROFILES,
  mismatch: MISMATCH_PROFILES,
  daily: DAILY_PROFILES,
  reading: {},
};

export const resolveGuideProfile = (
  territory: SacredVoiceTerritory,
  sourceTag: SacredVoiceSourceTag,
): SacredVoiceGuideProfile =>
  SACRED_VOICE_GUIDE_PROFILES[territory][sourceTag] ?? DEFAULT_PROFILE;

export const REPAIR_SIGNAL_KEYWORDS = [
  "fight",
  "argument",
  "hurt",
  "tense",
  "storm",
  "blew up",
  "withdraw",
  "silent treatment",
  "resentment",
  "trust",
  "betray",
];

export const MISMATCH_SIGNAL_KEYWORDS = [
  "different pace",
  "pressure",
  "rejected",
  "want more",
  "want less",
  "desire mismatch",
  "not in sync",
  "exhausted",
  "guilty",
  "obligation",
];

export const DAILY_SIGNAL_KEYWORDS = [
  "busy",
  "drift",
  "parent mode",
  "roommates",
  "no time",
  "daily ritual",
  "prevent",
  "micro",
  "routine",
];
