// Simplified Sacred Voice content layer.
// 4 themes × 2 lengths (3 & 5 min) = 8 curated sessions sourced from the App library.

export type SacredVoiceIntention =
  | "breathe_together"
  | "guide_us"
  | "deepen_intimacy"
  | "repair_us";

export type SacredVoiceDuration = 3 | 5;

export type SacredVoiceAudioProvider = "edge" | "elevenlabs" | "browser";

export type SacredVoiceSelection = {
  intention: SacredVoiceIntention;
  duration: SacredVoiceDuration;
};

export type SacredVoiceSession = {
  id: string;
  title: string;
  intention: SacredVoiceIntention;
  duration: SacredVoiceDuration;
  /** Short tagline shown under the title. */
  tagline: string;
  /** Where to send users when they tap "Go deeper". */
  goDeeperHref: string;
  goDeeperLabel: string;
  /** Fully-formed narration text, already paced for slow ElevenLabs delivery. */
  narrationText: string;
  audioProvider?: SacredVoiceAudioProvider;
};

export const SACRED_VOICE_INTENTIONS: Array<{
  id: SacredVoiceIntention;
  label: string;
  tagline: string;
  goDeeperHref: string;
  goDeeperLabel: string;
}> = [
  {
    id: "breathe_together",
    label: "Breathe Together",
    tagline: "Synchronise breath, soften the nervous system.",
    goDeeperHref: "/app/rituals",
    goDeeperLabel: "Open the breath rituals",
  },
  {
    id: "guide_us",
    label: "Guide Us",
    tagline: "A gentle step-by-step ritual for tonight.",
    goDeeperHref: "/app/rituals",
    goDeeperLabel: "Open the ritual library",
  },
  {
    id: "deepen_intimacy",
    label: "Deepen Intimacy",
    tagline: "Slow contact, soft eyes, sacred presence.",
    goDeeperHref: "/app/paths",
    goDeeperLabel: "Open the intimacy paths",
  },
  {
    id: "repair_us",
    label: "Repair Us",
    tagline: "Soft-start repair after tension.",
    goDeeperHref: "/app/reconnect",
    goDeeperLabel: "Open the reconnect path",
  },
];

export const SACRED_VOICE_DURATIONS: SacredVoiceDuration[] = [3, 5];

// Slow pacing helpers — these symbols are kept as ellipses & line breaks.
// ElevenLabs honors them as natural breath pauses; the browser TTS will too.
const PAUSE_SHORT = "…";
const PAUSE_LONG = "……";

const join = (...parts: string[]) => parts.filter(Boolean).join("\n\n");

/**
 * The 4×2 curated session library.
 * Texts are short, impactful extracts inspired by the App's ritual library
 * (Synchronised Heart Breathing, Soft Eye, Heart Salutation, Soul Gazing,
 * Yes/No, Soft-Start Repair, Daily Homecoming, Slow Sex pacing).
 * They are written for slow, sensual narration — never explicit.
 */
const sessionLibrary: Record<
  SacredVoiceIntention,
  Record<SacredVoiceDuration, { title: string; body: string }>
> = {
  breathe_together: {
    3: {
      title: "Three-Minute Shared Breath",
      body: join(
        `Welcome${PAUSE_SHORT} sit close, knee to knee${PAUSE_SHORT} and let your eyes rest gently on your partner.`,
        `Place one hand on your own heart${PAUSE_SHORT} and one hand on the heart of your beloved.`,
        `Inhale slowly through the nose${PAUSE_SHORT} for four counts${PAUSE_LONG} and exhale through the mouth${PAUSE_SHORT} for six counts.`,
        `Let the next breath synchronise${PAUSE_SHORT} so that you breathe in together${PAUSE_SHORT} and breathe out together.`,
        `Stay here for ten more rounds${PAUSE_LONG} feeling the warmth between your palms.`,
        `Close with one quiet sentence${PAUSE_SHORT} I am here${PAUSE_SHORT} and I want us to stay close.`,
      ),
    },
    5: {
      title: "Five-Minute Synchronised Heart Breathing",
      body: join(
        `Sit facing each other${PAUSE_SHORT} spines tall${PAUSE_SHORT} shoulders soft.`,
        `Place your right hand on your partner's heart${PAUSE_SHORT} and let their right hand rest on yours.`,
        `For the first minute${PAUSE_SHORT} simply notice the rhythm of your own breath${PAUSE_LONG} without changing it.`,
        `Now slow the inhale${PAUSE_SHORT} four counts in${PAUSE_LONG} and six counts out${PAUSE_LONG}.`,
        `Let your breathing meet${PAUSE_SHORT} as if one wave moved through both of you.`,
        `If your mind wanders${PAUSE_SHORT} return to the warmth beneath your palm.`,
        `Stay with this shared breath for two more minutes${PAUSE_LONG} unhurried${PAUSE_SHORT} undefended.`,
        `When you are ready${PAUSE_SHORT} let your foreheads touch${PAUSE_SHORT} and offer one silent thank you.`,
      ),
    },
  },
  guide_us: {
    3: {
      title: "Three-Minute Heart Salutation",
      body: join(
        `Stand or kneel facing each other${PAUSE_SHORT} bring your palms together at your heart.`,
        `Bow slowly toward your partner${PAUSE_SHORT} honouring the presence in front of you.`,
        `Rise${PAUSE_SHORT} and let your gaze meet${PAUSE_LONG} soft${PAUSE_SHORT} unwavering${PAUSE_SHORT} curious.`,
        `Place your right hand on your partner's heart${PAUSE_SHORT} and feel theirs land on yours.`,
        `Inhale together${PAUSE_LONG} and on the exhale${PAUSE_SHORT} whisper one true thing you feel right now.`,
        `Bow once more${PAUSE_SHORT} sealing this small ceremony.`,
      ),
    },
    5: {
      title: "Five-Minute Soul Gazing Sequence",
      body: join(
        `Sit comfortably${PAUSE_SHORT} close enough that your knees almost touch.`,
        `Begin with three slow breaths together${PAUSE_LONG} in through the nose${PAUSE_SHORT} out through the mouth.`,
        `Soften the muscles around your eyes${PAUSE_SHORT} and let your gaze settle on your partner's left eye.`,
        `You may blink naturally${PAUSE_SHORT} but do not look away.`,
        `For two minutes${PAUSE_SHORT} simply be seen${PAUSE_LONG} and see.`,
        `Notice what arises${PAUSE_SHORT} tenderness${PAUSE_SHORT} discomfort${PAUSE_SHORT} laughter${PAUSE_SHORT} love${PAUSE_LONG} let it all pass through.`,
        `Now place your right hand on your partner's heart${PAUSE_SHORT} and breathe slowly for one more minute.`,
        `Close by saying${PAUSE_SHORT} I see you${PAUSE_SHORT} and I am grateful you are here.`,
      ),
    },
  },
  deepen_intimacy: {
    3: {
      title: "Three-Minute Soft Eye, Soft Touch",
      body: join(
        `Sit very close${PAUSE_SHORT} let your knees rest against each other.`,
        `Soften your jaw${PAUSE_SHORT} your shoulders${PAUSE_SHORT} and the small muscles around your eyes.`,
        `Trace one slow breath together${PAUSE_LONG} feeling the air move through both bodies.`,
        `Take your partner's hand${PAUSE_SHORT} and explore it as if you had never touched it before.`,
        `Let curiosity replace habit${PAUSE_SHORT} let slowness replace urgency.`,
        `Close by bringing their hand to your heart${PAUSE_SHORT} and holding it there for three breaths.`,
      ),
    },
    5: {
      title: "Five-Minute Slow Love Arrival",
      body: join(
        `Begin facing each other${PAUSE_SHORT} fully clothed${PAUSE_SHORT} fully present.`,
        `Let your breathing slow down together${PAUSE_LONG} four counts in${PAUSE_SHORT} six counts out.`,
        `With soft eyes${PAUSE_SHORT} look at your partner as the person you first chose${PAUSE_SHORT} and the person you choose tonight.`,
        `Place your foreheads gently together${PAUSE_LONG} and breathe into this shared space.`,
        `Now slow every movement${PAUSE_SHORT} a hand on the cheek${PAUSE_SHORT} a finger along the jaw${PAUSE_SHORT} unhurried${PAUSE_SHORT} reverent.`,
        `There is nothing to perform${PAUSE_SHORT} nothing to reach${PAUSE_LONG} only this contact${PAUSE_SHORT} this warmth${PAUSE_SHORT} this breath.`,
        `Stay in stillness for the final minute${PAUSE_SHORT} letting the silence speak for you both.`,
        `Close with one whispered desire${PAUSE_SHORT} and one whispered thank you.`,
      ),
    },
  },
  repair_us: {
    3: {
      title: "Three-Minute Soft-Start Repair",
      body: join(
        `Sit beside each other${PAUSE_SHORT} not facing off${PAUSE_SHORT} but side by side${PAUSE_SHORT} as allies.`,
        `Take three slow breaths together${PAUSE_LONG} signalling to your bodies${PAUSE_SHORT} we are safe.`,
        `Each of you${PAUSE_SHORT} silently complete the sentence${PAUSE_SHORT} what I most need you to understand is${PAUSE_LONG}.`,
        `Now${PAUSE_SHORT} one of you speaks first${PAUSE_SHORT} no blame${PAUSE_SHORT} no story${PAUSE_SHORT} only the feeling underneath.`,
        `The other listens${PAUSE_SHORT} without defending${PAUSE_LONG} simply receiving.`,
        `Close by reaching for one hand${PAUSE_SHORT} and saying${PAUSE_SHORT} we are still us.`,
      ),
    },
    5: {
      title: "Five-Minute Reconnect After Tension",
      body: join(
        `Find a quiet place to sit${PAUSE_SHORT} side by side${PAUSE_SHORT} with no screens between you.`,
        `Begin with a long exhale${PAUSE_LONG} releasing whatever you carried into the room.`,
        `Place a hand over your own heart${PAUSE_SHORT} and feel for the part of you that wants to stay close.`,
        `Take turns answering${PAUSE_SHORT} what hurt${PAUSE_LONG} what I needed${PAUSE_LONG} what I appreciate about you anyway.`,
        `When you listen${PAUSE_SHORT} put your defences down${PAUSE_SHORT} this is not the moment to be right${PAUSE_SHORT} only to be present.`,
        `When you speak${PAUSE_SHORT} use I${PAUSE_SHORT} not you${PAUSE_LONG} the truth of your feeling${PAUSE_SHORT} not the verdict on theirs.`,
        `When the words have softened${PAUSE_SHORT} face each other and place hand on hand.`,
        `Breathe together for one full minute${PAUSE_LONG} unhurried${PAUSE_SHORT} unbroken.`,
        `Close with one sentence each${PAUSE_SHORT} I am still choosing us.`,
      ),
    },
  },
};

export const generateSacredVoiceSession = (
  selection: SacredVoiceSelection,
): SacredVoiceSession => {
  const meta = SACRED_VOICE_INTENTIONS.find((item) => item.id === selection.intention)!;
  const entry = sessionLibrary[selection.intention][selection.duration];

  return {
    id: `sv-${selection.intention}-${selection.duration}`,
    title: entry.title,
    intention: selection.intention,
    duration: selection.duration,
    tagline: meta.tagline,
    goDeeperHref: meta.goDeeperHref,
    goDeeperLabel: meta.goDeeperLabel,
    narrationText: entry.body,
    audioProvider: "elevenlabs",
  };
};

export const buildSacredVoiceSession = generateSacredVoiceSession;
