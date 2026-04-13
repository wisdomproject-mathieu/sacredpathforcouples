import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Flame,
  Heart,
  Lock,
  LockOpen,
  MessageCircleHeart,
  MoonStar,
  PlayCircle,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSeoMetadata } from "@/lib/seo";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { getEffectiveMembershipTier, isPremiumTier } from "@/lib/Premium";

type Tier = "free" | "premium";

type Insight = {
  title: string;
  body: string;
  beginnerReframe?: string;
  advancedReframe?: string;
};

type Exercise = {
  title: string;
  setup: string;
  steps: string[];
  integration: string;
  beginnerNote?: string;
  advancedNote?: string;
};

type GrowthTrack = {
  title: string;
  body: string;
  steps: string[];
};

type RelatedLink = {
  name: string;
  kind: "Path" | "Author";
  note: string;
};

type FreeReconnectContent = {
  heroIntro: string[];
  beginnerTrack?: GrowthTrack;
  advancedTrack?: GrowthTrack;
  quote: {
    text: string;
    source: string;
  };
  useWhen: string[];
  whyItWorks: Insight[];
  modernUse: Insight[];
  whatToAvoid: Insight[];
  exercises: Exercise[];
  reflectionPrompts: string[];
  related: RelatedLink[];
  premiumBanner: string;
};

type ReconnectTool = {
  slug: string;
  title: string;
  tier: Tier;
  icon: LucideIcon;
  iconClass: string;
  descriptor: string;
  oneLiner: string;
  overviewLine: string;
  teaser?: string[];
  content?: FreeReconnectContent;
};

const libraryPages = [
  {
    to: "/app/paths",
    labelKey: "pagePaths",
    subtitleKey: "pagePathsSubtitle",
    icon: Waves,
    iconClass: "text-violet-300",
  },
  {
    to: "/app/authors",
    labelKey: "pageAuthors",
    subtitleKey: "pageAuthorsSubtitle",
    icon: Heart,
    iconClass: "text-rose-300",
  },
  {
    to: "/app/reconnect",
    labelKey: "pageReconnect",
    subtitleKey: "pageReconnectSubtitle",
    icon: MessageCircleHeart,
    iconClass: "text-amber-300",
  },
];

const reconnectTools: ReconnectTool[] = [
  {
    slug: "soft-landing",
    title: "Soft Landing",
    tier: "free",
    icon: MoonStar,
    iconClass: "text-cyan-300",
    descriptor: "A gentle sequence to settle, breathe, and arrive back into each other quickly.",
    oneLiner: "Best when both partners want closeness but feel overstimulated, tired, or far away.",
    overviewLine: "Nervous-system-first reconnection for real-life stress days and fast repair.",
    content: {
      heroIntro: [
        "Soft Landing is the reconnect tool for overloaded evenings. It lowers emotional temperature without draining erotic possibility.",
        "Instead of pushing depth too fast, it creates a believable bridge from stress physiology to relational presence and renewed couple closeness.",
      ],
      beginnerTrack: {
        title: "Beginner Track: Reliable 5-10 Minute Reset",
        body: "Use Soft Landing as your default transition ritual after difficult days. Consistency matters more than depth in early phase.",
        steps: [
          "Run one short reset before discussing logistics or conflict.",
          "Keep language minimal: body state, one need, one appreciation.",
          "Stay at low intensity and prioritize felt safety.",
          "Repeat at least four nights per week for two weeks.",
        ],
      },
      advancedTrack: {
        title: "Advanced Track: Integrate Reset Into Conflict Recovery",
        body: "Once the base ritual is stable, use Soft Landing to prevent escalation and accelerate repair after tense exchanges.",
        steps: [
          "Start with synchronized breath before any high-stakes dialogue.",
          "Use two short regulation intervals during hard conversations.",
          "Add one direct accountability statement plus one reassurance statement.",
          "Close with a next-step agreement for the next 24 hours.",
        ],
      },
      quote: {
        text: "When the body feels safer, love becomes easier to feel and easier to offer.",
        source: "Sacred Path Reconnect editorial synthesis",
      },
      useWhen: [
        "After stressful days, travel, parenting load, or digital overload.",
        "When both partners care but feel emotionally unarrived.",
        "When big conversation would likely backfire tonight.",
      ],
      whyItWorks: [
        {
          title: "Low demand, high return",
          body: "It asks for very little effort and quickly creates relational softening.",
          beginnerReframe: "Beginner move: do the ritual even when you only have five minutes.",
          advancedReframe: "Advanced move: insert micro-resets during difficult conversations.",
        },
        {
          title: "Regulation before interpretation",
          body: "Bodies settle first, then communication quality improves naturally.",
          beginnerReframe: "Beginner move: wait for slower breath before discussing content.",
          advancedReframe: "Advanced move: track partner cues and recalibrate pace in real time.",
        },
        {
          title: "Protects connection momentum",
          body: "Small successful contact prevents longer emotional drift.",
          beginnerReframe: "Beginner move: end with one warm gesture every session.",
          advancedReframe: "Advanced move: convert each reset into a concrete relational next step.",
        },
      ],
      modernUse: [
        { title: "Weeknight reset", body: "Use as a 10-minute transition ritual before dinner or bedtime." },
        { title: "Post-conflict de-escalation", body: "Run Soft Landing before attempting repair language." },
        { title: "Desire-friendly calm", body: "Calm can become fertile ground for tenderness and erotic openness." },
      ],
      whatToAvoid: [
        {
          title: "Turning it into performance",
          body: "Keep it simple; over-optimizing kills its effect.",
          beginnerReframe: "Beginner move: run the same short structure repeatedly.",
          advancedReframe: "Advanced move: change only one variable at a time when refining.",
        },
        {
          title: "Forcing disclosure",
          body: "The goal is arrival, not immediate emotional excavation.",
          beginnerReframe: "Beginner move: share one feeling, not full story.",
          advancedReframe: "Advanced move: sequence deeper disclosure after regulation is stable.",
        },
        {
          title: "Skipping consent cues",
          body: "Even gentle tools require mutual pacing and choice.",
          beginnerReframe: "Beginner move: ask before touch every round.",
          advancedReframe: "Advanced move: use explicit pacing checkpoints during longer sessions.",
        },
      ],
      exercises: [
        {
          title: "3-Breath Arrival",
          setup: "Sit knee-to-knee with one point of hand contact.",
          steps: [
            "Take three long synchronized exhales.",
            "Each partner says: 'Right now my body feels…'.",
            "Each partner says one simple need for tonight.",
          ],
          integration: "Use as a daily micro-ritual.",
          beginnerNote: "Keep answers short and concrete to avoid cognitive overload.",
          advancedNote: "Add one relational intention after naming needs.",
        },
        {
          title: "Shoulder Drop Reset",
          setup: "Stand facing each other.",
          steps: [
            "Inhale together and shrug shoulders up.",
            "Exhale and release tension down through feet.",
            "Repeat for five rounds with eye softness.",
          ],
          integration: "Fast reset after commute transitions.",
          beginnerNote: "Use this right after arriving home to prevent friction carryover.",
          advancedNote: "Pair round five with one appreciation sentence.",
        },
        {
          title: "One-Minute Presence Loop",
          setup: "Set a one-minute timer.",
          steps: [
            "One partner shares what they appreciate in this moment.",
            "Switch and repeat.",
            "Close with one gentle touch and no analysis.",
          ],
          integration: "Useful when energy is low but connection matters.",
          beginnerNote: "Keep appreciation specific and current.",
          advancedNote: "Add one short request after appreciation loop.",
        },
      ],
      reflectionPrompts: [
        "What helps my body feel emotionally reachable?",
        "What is our most reliable 5-minute reconnect habit?",
        "How can we reduce transition friction in daily life?",
        "Where do we expect depth before regulation?",
      ],
      related: [
        { name: "Tao", kind: "Path", note: "Pacing and nervous-system nourishment." },
        { name: "Osho", kind: "Author", note: "Awareness and embodied settling." },
        { name: "Tantric Wisdom", kind: "Path", note: "Presence-first intimacy foundation." },
      ],
      premiumBanner:
        "Unlock guided co-regulation sequences, layered reconnect scripts, and advanced transition rituals for high-pressure seasons in modern couple life.",
    },
  },
  {
    slug: "heart-opening",
    title: "Heart Opening",
    tier: "free",
    icon: Heart,
    iconClass: "text-rose-300",
    descriptor: "A warm route into appreciation, tenderness, reassurance, and emotional closeness.",
    oneLiner: "Ideal when love is present but emotional nourishment has thinned out.",
    overviewLine: "Gratitude-led intimacy recovery couples can use tonight.",
    content: {
      heroIntro: [
        "Heart Opening helps couples move from functional partnership back into felt affection. It is not dramatic repair; it is emotional rewarming.",
        "This tool works especially well when neither partner is hostile, but both feel under-loved or under-seen in modern daily life.",
      ],
      beginnerTrack: {
        title: "Beginner Track: Rebuild Daily Warmth",
        body: "Start with short appreciation rituals that are easy to repeat. The objective is emotional nourishment, not perfect processing.",
        steps: [
          "Run a 5-minute appreciation round at least three times weekly.",
          "Keep praise specific, concrete, and present tense.",
          "Include one emotional need statement without blame.",
          "Close each practice with 30 seconds of warm touch.",
        ],
      },
      advancedTrack: {
        title: "Advanced Track: Blend Warmth With Repair Precision",
        body: "When baseline warmth returns, use Heart Opening to support harder conversations and strengthen trust repair.",
        steps: [
          "Lead with appreciation before discussing sensitive topics.",
          "Use mirror listening to confirm emotional understanding.",
          "Pair reassurance with one specific behavior commitment.",
          "Review weekly which reassurance signals are most effective for each partner.",
        ],
      },
      quote: {
        text: "Tenderness grows when appreciation becomes active rather than assumed.",
        source: "Sacred Path Reconnect editorial synthesis",
      },
      useWhen: [
        "When the relationship feels flat but not fractured.",
        "After practical weeks with little affectionate ritual.",
        "When one or both partners need reassurance and emotional warmth.",
      ],
      whyItWorks: [
        {
          title: "Creates felt safety",
          body: "Appreciation lowers defensiveness and opens relational trust.",
          beginnerReframe: "Beginner move: appreciate behavior, not vague traits.",
          advancedReframe: "Advanced move: combine appreciation with explicit repair commitments.",
        },
        {
          title: "Builds emotional momentum",
          body: "Small gratitude loops produce cumulative softening.",
          beginnerReframe: "Beginner move: keep loops short enough to stay consistent.",
          advancedReframe: "Advanced move: track which appreciation themes shift mood fastest.",
        },
        {
          title: "Prepares deeper intimacy",
          body: "Warmth often becomes the foundation for erotic aliveness.",
          beginnerReframe: "Beginner move: stop after warmth if energy is low.",
          advancedReframe: "Advanced move: bridge warmth into sensual practice with consent check.",
        },
      ],
      modernUse: [
        { title: "Post-busy-day reconnect", body: "Use before screens and logistics consume the evening." },
        { title: "Repair support", body: "Follow conflict with reassurance and acknowledgement rounds." },
        { title: "Affection restoration", body: "Rebuild touch confidence with low-pressure emotional contact." },
      ],
      whatToAvoid: [
        {
          title: "Transactional gratitude",
          body: "Do not use appreciation as hidden leverage.",
          beginnerReframe: "Beginner move: appreciate without attaching a demand.",
          advancedReframe: "Advanced move: separate gratitude round from negotiation round.",
        },
        {
          title: "Over-talking",
          body: "Keep language simple so the body can stay open.",
          beginnerReframe: "Beginner move: limit each share to one or two sentences.",
          advancedReframe: "Advanced move: alternate words with brief silence intervals.",
        },
        {
          title: "Skipping reciprocity",
          body: "Both partners need space to give and receive.",
          beginnerReframe: "Beginner move: use equal timed turns.",
          advancedReframe: "Advanced move: track whether one partner consistently over-gives.",
        },
      ],
      exercises: [
        {
          title: "Three Appreciations Round",
          setup: "Sit side-by-side with gentle touch.",
          steps: [
            "Partner A shares three specific appreciations.",
            "Partner B responds only with 'thank you'.",
            "Switch roles.",
          ],
          integration: "Use twice weekly for emotional warmth maintenance.",
          beginnerNote: "Choose small everyday actions to keep appreciation believable.",
          advancedNote: "Add one appreciation for how partner handled recent tension.",
        },
        {
          title: "Hand-on-Heart Mirror",
          setup: "Each partner places one hand on own heart and one on partner's arm.",
          steps: [
            "A says one current feeling and one need.",
            "B mirrors exactly what they heard.",
            "Switch roles.",
          ],
          integration: "Strengthens clarity with kindness.",
          beginnerNote: "Keep needs specific and actionable.",
          advancedNote: "Add one reassurance request and one reassurance offer each.",
        },
        {
          title: "Warm Closure Minute",
          setup: "Use before sleep.",
          steps: [
            "Each partner names one thing they are grateful for today.",
            "Each names one way they felt supported.",
            "Close with 30 seconds of silent touch.",
          ],
          integration: "Prevents slow emotional drift.",
          beginnerNote: "Do this even on low-energy nights to keep connection continuity.",
          advancedNote: "Add one sentence about tomorrow's emotional intention.",
        },
      ],
      reflectionPrompts: [
        "How does my partner best receive appreciation?",
        "What daily tenderness ritual would be sustainable for us?",
        "Where do we assume love instead of expressing it?",
        "What reassurance do I need but rarely ask for clearly?",
      ],
      related: [
        { name: "Osho", kind: "Author", note: "Awareness and emotional honesty." },
        { name: "Tantric Wisdom", kind: "Path", note: "Devotion and presence alignment." },
        { name: "David Deida", kind: "Author", note: "Devotion as living relational practice." },
      ],
      premiumBanner:
        "Unlock deeper heart-devotion reconnect journeys, guided reassurance rituals, and advanced emotional repair pathways for long-term sacred partnership.",
    },
  },
  {
    slug: "playful-spark",
    title: "Playful Spark",
    tier: "free",
    icon: PlayCircle,
    iconClass: "text-amber-300",
    descriptor: "A light route into teasing, flirtation, and relational aliveness for modern couples.",
    oneLiner: "Useful when the relationship feels too serious, practical, or emotionally heavy.",
    overviewLine: "Playful reactivation for chemistry, emotional oxygen, and closeness now.",
    content: {
      heroIntro: [
        "Playful Spark reintroduces levity without losing intimacy. It is a bridge from over-seriousness back into attraction and fun.",
        "The goal is not forced humor. The goal is movement, curiosity, and low-pressure erotic aliveness couples can sustain.",
      ],
      beginnerTrack: {
        title: "Beginner Track: Reintroduce Lightness Safely",
        body: "Use short playful moments to break heaviness without forcing sexual escalation.",
        steps: [
          "Choose one playful micro-practice three times this week.",
          "Keep tone warm and kind, never sarcastic or critical.",
          "Pause if either partner feels pressured or disconnected.",
          "Close with one appreciation so play ends in safety.",
        ],
      },
      advancedTrack: {
        title: "Advanced Track: Build Play Into Erotic Momentum",
        body: "When safety is stable, use playful energy to build anticipation and reconnect sensual polarity.",
        steps: [
          "Sequence playful banter into structured touch rounds.",
          "Use contrast shifts: playful, tender, then magnetic.",
          "Add consent checkpoints before moving toward higher charge.",
          "Debrief what type of play most reliably increases attraction for each partner.",
        ],
      },
      quote: {
        text: "A little play can reopen desire where analysis has exhausted it.",
        source: "Sacred Path Reconnect editorial synthesis",
      },
      useWhen: [
        "When conversations feel responsible but lifeless.",
        "When attraction feels sleepy, not broken.",
        "When both partners need emotional oxygen before depth.",
      ],
      whyItWorks: [
        {
          title: "Breaks heavy loops",
          body: "Play interrupts rigid relational scripts.",
          beginnerReframe: "Beginner move: start with gentle humor, not teasing edge.",
          advancedReframe: "Advanced move: use playful contrast to shift into sensual polarity.",
        },
        {
          title: "Invites spontaneous attraction",
          body: "Novelty and laughter can quickly increase felt connection.",
          beginnerReframe: "Beginner move: try one new playful prompt each date night.",
          advancedReframe: "Advanced move: map which novelty cues awaken desire for each partner.",
        },
        {
          title: "Builds positive momentum",
          body: "Light interactions accumulate into stronger emotional tone.",
          beginnerReframe: "Beginner move: keep playful contact short and frequent.",
          advancedReframe: "Advanced move: chain playful contact into a longer intimacy sequence.",
        },
      ],
      modernUse: [
        { title: "Date-night ignition", body: "Use as a first phase before slower intimacy practices." },
        { title: "After logistical overload", body: "Shift out of project-management dynamic quickly." },
        { title: "Before difficult topics", body: "Soften relational field before heavier dialogue." },
      ],
      whatToAvoid: [
        {
          title: "Sarcasm as play",
          body: "Play should increase safety, not disguise criticism.",
          beginnerReframe: "Beginner move: avoid jokes about vulnerabilities.",
          advancedReframe: "Advanced move: keep edgy play inside explicit mutual agreement.",
        },
        {
          title: "Forced extroversion",
          body: "Keep exercises adaptable for quieter personalities.",
          beginnerReframe: "Beginner move: choose low-verbal play formats if needed.",
          advancedReframe: "Advanced move: personalize play styles instead of copying templates.",
        },
        {
          title: "Escalation pressure",
          body: "Play does not need to become sexual every time.",
          beginnerReframe: "Beginner move: end on warmth even without sexual follow-through.",
          advancedReframe: "Advanced move: signal clearly when shifting from playful to erotic mode.",
        },
      ],
      exercises: [
        {
          title: "Impossible Request Game",
          setup: "Take turns naming one impossible request and one real desire.",
          steps: [
            "Partner A shares two statements.",
            "Partner B guesses which is real.",
            "Switch roles and repeat.",
          ],
          integration: "Builds playful honesty and desire language.",
          beginnerNote: "Keep requests gentle and emotionally safe.",
          advancedNote: "Add one structured sensual follow-through when desire is mutual.",
        },
        {
          title: "Compliment Roulette",
          setup: "Use a 3-minute timer.",
          steps: [
            "Each partner gives specific, playful compliments.",
            "No repetition allowed.",
            "End with one appreciation that surprised you.",
          ],
          integration: "Great quick reconnection before bed.",
          beginnerNote: "Avoid body critique disguised as humor.",
          advancedNote: "Shift from playful compliment into one desire invitation.",
        },
        {
          title: "Mood Shift Touch",
          setup: "Choose playful, tender, or mischievous mood.",
          steps: [
            "Partner A leads one minute of mood-matched touch.",
            "Partner B names what felt best.",
            "Switch roles.",
          ],
          integration: "Reintroduces body confidence and responsiveness.",
          beginnerNote: "Use gentle zones first to keep confidence high.",
          advancedNote: "Layer intentional polarity shifts between each mood round.",
        },
      ],
      reflectionPrompts: [
        "What kind of play feels connective for us?",
        "Where has seriousness replaced aliveness?",
        "How can we flirt without pressure?",
        "What helps me stay open while being playful?",
      ],
      related: [
        { name: "Kama Sutra", kind: "Path", note: "Atmosphere and anticipation artistry." },
        { name: "Margot Anand", kind: "Author", note: "Ecstatic playful sacred sensuality." },
        { name: "Polarity", kind: "Path", note: "Playful edge and erotic contrast." },
      ],
      premiumBanner:
        "Unlock advanced playful scripts, anticipation games, and flirtation-to-intimacy bridges designed for long-term couples who want chemistry and sacred warmth back.",
    },
  },
  {
    slug: "sacred-desire",
    title: "Sacred Desire",
    tier: "premium",
    icon: Flame,
    iconClass: "text-orange-300",
    descriptor: "A sensual premium reconnect arc for magnetic tension, devotional longing, and bonded intimacy.",
    oneLiner: "For couples ready to move from reconnection into embodied erotic depth.",
    overviewLine: "Premium reconnect track for long-term attraction renewal and sacred love.",
    teaser: [
      "Restore erotic aliveness with structure and emotional safety.",
      "Blend anticipation, devotion, and embodied desire sequencing for modern partnership.",
      "Premium includes progressive rituals and partner scripts for lasting closeness.",
    ],
  },
  {
    slug: "breath-bridge",
    title: "Breath Bridge",
    tier: "premium",
    icon: Waves,
    iconClass: "text-emerald-300",
    descriptor: "Co-regulation reconnect protocol for moments when words are too sharp or exhausted.",
    oneLiner: "For high-conflict or high-fatigue moments needing physiological reset first.",
    overviewLine: "Premium nervous-system reconnect framework for difficult modern relationship days.",
    teaser: [
      "Use breath-led sequencing to rebuild contact safely after rupture.",
      "Lower activation before attempting complex emotional dialogue together.",
      "Premium includes guided pacing maps and escalation guardrails for couples.",
    ],
  },
  {
    slug: "speak-the-unsent",
    title: "Speak The Unsent",
    tier: "premium",
    icon: MessageCircleHeart,
    iconClass: "text-violet-300",
    descriptor: "A structured language framework for what has been carried but not spoken.",
    oneLiner: "For couples needing honest expression without collapse, shutdown, or blame loops.",
    overviewLine: "Premium communication bridge for unresolved emotional backlog and deeper trust.",
    teaser: [
      "Turn emotional backlog into clear, kind, high-integrity conversation.",
      "Use turn-based scripts that reduce reactivity and defensiveness.",
      "Premium includes repair flows and follow-up integration prompts for lasting closeness.",
    ],
  },
  {
    slug: "polarity-reset",
    title: "Polarity Reset",
    tier: "premium",
    icon: Flame,
    iconClass: "text-rose-300",
    descriptor: "A premium reconnect protocol for rebuilding erotic edge after emotional flattening.",
    oneLiner: "For couples who still love each other but miss charge, anticipation, and directional tension.",
    overviewLine: "Premium edge-restoration track for long-term chemistry renewal and relational devotion.",
    teaser: [
      "Reintroduce conscious leading and receiving dynamics with precision and care.",
      "Use structured polarity drills that preserve consent and emotional safety.",
      "Premium includes step-by-step charge recovery scripts and integration prompts for couples.",
    ],
  },
  {
    slug: "ritual-aftercare",
    title: "Ritual Aftercare",
    tier: "premium",
    icon: MoonStar,
    iconClass: "text-cyan-300",
    descriptor: "A premium post-intimacy and post-conflict integration track that protects relational trust.",
    oneLiner: "For couples who want closeness to stay stable after big emotional or erotic moments.",
    overviewLine: "Premium aftercare system for emotional safety, bonding, and sacred continuity.",
    teaser: [
      "Transform intense moments into secure attachment rather than confusion or crash.",
      "Practice debrief, reassurance, and body-led recovery in a structured format.",
      "Premium includes aftercare templates, check-ins, and next-day integration maps for modern couples.",
    ],
  },
];

const reconnectUpgradeCopy: Record<
  string,
  {
    headline: string;
    benefit: string;
    bullets: string[];
    cta: string;
  }
> = {
  "soft-landing": {
    headline: "Stop losing each other in stressful weeks.",
    benefit: "Use guided co-regulation so difficult evenings end in contact, not distance.",
    bullets: [
      "Audio-led downshift sequences for overloaded nervous systems.",
      "Partner pacing scripts for fast, gentle emotional arrival.",
      "Progressive tracks from simple settling to deeper reconnect flow.",
    ],
    cta: "Unlock Soft Landing Premium",
  },
  "heart-opening": {
    headline: "Bring warmth back before resentment grows.",
    benefit: "Use structured reassurance and appreciation rituals that rebuild emotional trust quickly.",
    bullets: [
      "Guided gratitude and reassurance rounds for daily connection.",
      "Repair-safe language prompts that reduce defensiveness.",
      "Progressive tenderness modules for long-term emotional nourishment.",
    ],
    cta: "Unlock Heart Opening Premium",
  },
  "playful-spark": {
    headline: "Bring chemistry back without pressure.",
    benefit: "Use playful scripts to restore curiosity, flirtation, and lightness in long-term love.",
    bullets: [
      "Anticipation games and playful tension-building sequences.",
      "Low-pressure flirtation prompts for different personality styles.",
      "Bridge scripts from laughter into warm sensual closeness.",
    ],
    cta: "Unlock Playful Spark Premium",
  },
  "sacred-desire": {
    headline: "Turn reconnection into devotional erotic depth.",
    benefit: "Move from surface closeness into embodied longing with clear structure and safety.",
    bullets: [
      "Layered rituals for anticipation, devotion, and polarity.",
      "Guided sensual pacing maps for emotional and erotic attunement.",
      "Integration prompts so afterglow becomes lasting relationship growth.",
    ],
    cta: "Unlock Sacred Desire Premium",
  },
  "breath-bridge": {
    headline: "When words fail, reconnect through breath.",
    benefit: "Use body-first reset protocols to reduce activation before difficult conversations.",
    bullets: [
      "Co-regulation sequences for conflict, fatigue, and shutdown states.",
      "Escalation guardrails with consent and pacing checkpoints.",
      "Recovery tracks from stress reactivity to relational availability.",
    ],
    cta: "Unlock Breath Bridge Premium",
  },
  "speak-the-unsent": {
    headline: "Say what matters without blowing up the bond.",
    benefit: "Use structured conversation frameworks that make honesty safer and more productive.",
    bullets: [
      "Turn-based scripts for backlog conversations with lower defensiveness.",
      "Repair prompts that combine accountability with care.",
      "Follow-up integration sequences so clarity becomes new behavior.",
    ],
    cta: "Unlock Speak The Unsent Premium",
  },
  "polarity-reset": {
    headline: "Recover attraction after emotional flattening.",
    benefit: "Use consent-first polarity drills that reintroduce charge without destabilizing trust.",
    bullets: [
      "Guided lead/receive sequences for magnetic contrast and safety.",
      "Truth-and-desire prompts that clear hidden resentment.",
      "Progression maps from reconnection to sustained erotic momentum.",
    ],
    cta: "Unlock Polarity Reset Premium",
  },
  "ritual-aftercare": {
    headline: "Protect connection after big moments.",
    benefit: "Use aftercare systems that turn intensity into secure bonding and continuity.",
    bullets: [
      "Post-intimacy and post-conflict debrief templates for couples.",
      "Reassurance and recovery check-ins for nervous-system safety.",
      "Next-day integration maps that prevent emotional crash and drift.",
    ],
    cta: "Unlock Ritual Aftercare Premium",
  },
};

const shellCardClass =
  "rounded-[28px] border border-border/30 bg-card/45 p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.46)]";

const reconnectUiCopy: Record<Language, Record<string, string>> = {
  en: {
    pagePaths: "Paths",
    pagePathsSubtitle: "Ancient pathways for modern love",
    pageAuthors: "Authors",
    pageAuthorsSubtitle: "Voices that guide intimacy",
    pageReconnect: "Reconnect",
    pageReconnectSubtitle: "Repair and return to closeness",
    backToLibrary: "Back to Library",
    lockedInPremium: "Locked in premium",
    openAccess: "Open access",
    relatedTracks: "Related Reconnect Tracks",
    heroEyebrow: "Sacred Library · Reconnect",
    heroTitle: "Ancient reconnect wisdom for modern relationship moments",
    heroDesc:
      "Read, apply, and feel closer right away. Then return for deeper tracks and premium guidance that help your relationship keep moving toward sacred love.",
    sacredPages: "Sacred pages",
    overviewEyebrow: "Reconnect Overview",
    overviewTitle: "Choose the reconnect track your relationship needs right now",
    practicePreview: "Practice preview",
    practicePreviewFallback: "Guided reconnect practice",
    premiumPreview: "Premium preview",
    premiumPreviewFallback: "Expanded reconnect track",
    openTracks: "Open-access Reconnect Tracks",
    openTracksBody: "fully open guides so couples can shift from distance to connection in minutes.",
    lockedTracks: "Locked Reconnect Tracks",
    lockedTracksBody:
      "locked tracks with deeper support, richer wisdom, and guided progression toward sacred partnership.",
    unlockReconnectJourney: "Unlock this reconnect journey",
    premiumActive: "Premium Active",
    locked: "Locked",
    guidedScripts: "Guided Scripts",
    repairTools: "Repair Tools",
    sacredLoveBridges: "Sacred Love Bridges",
    viewPlansAndTrial: "View plans and trial",
    premiumValue: "8. Premium Value",
    heroIntro: "1. Hero Intro",
    useItWhen: "2. Use It When",
    whyThisToolWorks: "3. Why This Tool Works",
    beginnerAndAdvancedRoute: "3.5 Beginner And Advanced Route",
    modernApplication: "4. Modern Application",
    misuseAvoid: "5. Misuse / What To Avoid",
    practicalExercises: "6. 3 Practical Exercises",
    reflectionPrompts: "7. Reflection Prompts",
    practice: "Practice",
    beginner: "Beginner",
    advanced: "Advanced",
    integration: "Integration",
    premiumTool: "Premium Tool",
    lockedTool: "Locked Tool",
    unlockReconnectTrack: "Unlock this reconnect track",
    unlocksForRelationship: "What unlocks for your relationship",
    unlockCard1Title: "Structured scripts",
    unlockCard1Body: "Turn emotional complexity into safe, guided communication flow couples can trust.",
    unlockCard2Title: "Guided partner practices",
    unlockCard2Body: "Audio-led reconnect sequences for difficult and high-intensity moments.",
    unlockCard3Title: "Advanced progression",
    unlockCard3Body: "Move from basic reconnect into deeper repair and intimacy renewal that lasts.",
    unlockCard4Title: "Cross-library integration",
    unlockCard4Body: "Linked Paths and Authors recommendations so partners keep growing together.",
  },
  fr: {
    pagePaths: "Parcours",
    pagePathsSubtitle: "Parcours anciens pour l'amour moderne",
    pageAuthors: "Auteurs",
    pageAuthorsSubtitle: "Voix qui guident l'intimité",
    pageReconnect: "Reconnecter",
    pageReconnectSubtitle: "Réparer et revenir à la proximité",
    backToLibrary: "Retour à la bibliothèque",
    lockedInPremium: "Verrouillé en premium",
    openAccess: "Accès libre",
    relatedTracks: "Parcours reconnect liés",
    heroEyebrow: "Bibliothèque sacrée · Reconnect",
    heroTitle: "Sagesse reconnect ancienne pour les moments relationnels modernes",
    heroDesc:
      "Lisez, appliquez et sentez-vous plus proches immédiatement. Revenez ensuite pour des parcours plus profonds et un guidage premium qui fait avancer votre relation vers l'amour sacré.",
    sacredPages: "Pages sacrées",
    overviewEyebrow: "Vue d'ensemble Reconnect",
    overviewTitle: "Choisissez le parcours reconnect dont votre relation a besoin maintenant",
    practicePreview: "Aperçu de pratique",
    practicePreviewFallback: "Pratique reconnect guidée",
    premiumPreview: "Aperçu premium",
    premiumPreviewFallback: "Parcours reconnect enrichi",
    openTracks: "Parcours Reconnect en accès libre",
    openTracksBody: "guides entièrement ouverts pour passer de la distance à la connexion en quelques minutes.",
    lockedTracks: "Parcours Reconnect verrouillés",
    lockedTracksBody:
      "parcours verrouillés avec plus de soutien, de sagesse et une progression guidée vers un partenariat sacré.",
    unlockReconnectJourney: "Déverrouiller ce parcours reconnect",
    premiumActive: "Premium actif",
    locked: "Verrouillé",
    guidedScripts: "Scripts guidés",
    repairTools: "Outils de réparation",
    sacredLoveBridges: "Ponts d'amour sacré",
    viewPlansAndTrial: "Voir les plans et l'essai",
    premiumValue: "8. Valeur Premium",
    heroIntro: "1. Introduction",
    useItWhen: "2. Quand l'utiliser",
    whyThisToolWorks: "3. Pourquoi cet outil fonctionne",
    beginnerAndAdvancedRoute: "3.5 Parcours débutant et avancé",
    modernApplication: "4. Application moderne",
    misuseAvoid: "5. Mauvais usage / à éviter",
    practicalExercises: "6. 3 exercices pratiques",
    reflectionPrompts: "7. Questions de réflexion",
    practice: "Pratique",
    beginner: "Débutant",
    advanced: "Avancé",
    integration: "Intégration",
    premiumTool: "Outil premium",
    lockedTool: "Outil verrouillé",
    unlockReconnectTrack: "Déverrouiller ce parcours reconnect",
    unlocksForRelationship: "Ce qui se débloque pour votre relation",
    unlockCard1Title: "Scripts structurés",
    unlockCard1Body: "Transformez la complexité émotionnelle en flux de communication sûr et guidé.",
    unlockCard2Title: "Pratiques guidées en couple",
    unlockCard2Body: "Séquences reconnect audio-guidées pour les moments difficiles et intenses.",
    unlockCard3Title: "Progression avancée",
    unlockCard3Body: "Passez du reconnect de base à une réparation plus profonde et à un renouvellement de l'intimité.",
    unlockCard4Title: "Intégration inter-bibliothèque",
    unlockCard4Body: "Recommandations liées de Parcours et Auteurs pour continuer à grandir ensemble.",
  },
  cs: {
    pagePaths: "Cesty",
    pagePathsSubtitle: "Starověké cesty pro moderní lásku",
    pageAuthors: "Autoři",
    pageAuthorsSubtitle: "Hlasy, které vedou intimitu",
    pageReconnect: "Znovuspojení",
    pageReconnectSubtitle: "Opravit a vrátit se k blízkosti",
    backToLibrary: "Zpět do knihovny",
    lockedInPremium: "Uzamčeno v premium",
    openAccess: "Volný přístup",
    relatedTracks: "Související reconnect cesty",
    heroEyebrow: "Posvátná knihovna · Reconnect",
    heroTitle: "Starověká reconnect moudrost pro moderní vztahové momenty",
    heroDesc:
      "Čti, použij a hned se cítíte blíž. Pak se vrať pro hlubší cesty a premium vedení, které drží váš vztah na cestě k posvátné lásce.",
    sacredPages: "Posvátné stránky",
    overviewEyebrow: "Přehled Reconnect",
    overviewTitle: "Vyber reconnect cestu, kterou váš vztah potřebuje právě teď",
    practicePreview: "Náhled praxe",
    practicePreviewFallback: "Vedená reconnect praxe",
    premiumPreview: "Náhled premium",
    premiumPreviewFallback: "Rozšířená reconnect cesta",
    openTracks: "Volně dostupné Reconnect cesty",
    openTracksBody: "plně otevřené průvodce pro posun od odstupu k propojení během minut.",
    lockedTracks: "Uzamčené Reconnect cesty",
    lockedTracksBody:
      "uzamčené cesty s hlubší podporou, bohatší moudrostí a vedenou progresí k posvátnému partnerství.",
    unlockReconnectJourney: "Odemknout tuto reconnect cestu",
    premiumActive: "Premium aktivní",
    locked: "Uzamčeno",
    guidedScripts: "Vedené skripty",
    repairTools: "Nástroje opravy",
    sacredLoveBridges: "Mosty posvátné lásky",
    viewPlansAndTrial: "Zobrazit plány a zkušební verzi",
    premiumValue: "8. Premium hodnota",
    heroIntro: "1. Úvod",
    useItWhen: "2. Kdy to použít",
    whyThisToolWorks: "3. Proč tento nástroj funguje",
    beginnerAndAdvancedRoute: "3.5 Začátečnická a pokročilá trasa",
    modernApplication: "4. Moderní použití",
    misuseAvoid: "5. Zneužití / čemu se vyhnout",
    practicalExercises: "6. 3 praktická cvičení",
    reflectionPrompts: "7. Otázky k zamyšlení",
    practice: "Praxe",
    beginner: "Začátečník",
    advanced: "Pokročilý",
    integration: "Integrace",
    premiumTool: "Premium nástroj",
    lockedTool: "Uzamčený nástroj",
    unlockReconnectTrack: "Odemknout tuto reconnect trasu",
    unlocksForRelationship: "Co se odemkne pro váš vztah",
    unlockCard1Title: "Strukturované skripty",
    unlockCard1Body: "Převeďte emoční složitost do bezpečného a vedeného komunikačního toku.",
    unlockCard2Title: "Vedené párové praxe",
    unlockCard2Body: "Audio-vedené reconnect sekvence pro náročné a vysoce intenzivní momenty.",
    unlockCard3Title: "Pokročilý progres",
    unlockCard3Body: "Posuňte se od základního reconnectu k hlubší opravě a obnově intimity, která vydrží.",
    unlockCard4Title: "Křížová integrace knihovny",
    unlockCard4Body: "Propojená doporučení Cest a Autorů, aby partneři mohli růst společně.",
  },
};

const tierBadgeClass: Record<Tier, string> = {
  free: "border-amber-400/30 bg-amber-500/12 text-amber-200",
  premium: "border-amber-400/30 bg-amber-500/12 text-amber-200",
};

const usePremiumAccess = () => {
  const { user } = useAuth();
  return isPremiumTier(getEffectiveMembershipTier(user));
};

const TierBadge = ({ tier }: { tier: Tier }) => {
  const hasPremiumAccess = usePremiumAccess();
  const locked = tier === "premium" && !hasPremiumAccess;

  return (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${tierBadgeClass[tier]}`}>
    {locked ? <Lock className="h-3.5 w-3.5" aria-label="Locked" /> : <LockOpen className="h-3.5 w-3.5" aria-label="Open access" />}
  </span>
  );
};

const ReconnectHeroCard = ({ tool }: { tool: ReconnectTool }) => {
  const { lang } = useLanguage();
  const ui = reconnectUiCopy[lang];
  const Icon = tool.icon;
  const hasPremiumAccess = usePremiumAccess();
  const isLocked = tool.tier === "premium" && !hasPremiumAccess;

  return (
    <section className={shellCardClass}>
      <div className="flex items-start justify-between gap-3">
        <div className={`inline-flex rounded-2xl border border-border/30 bg-background/55 p-3 ${tool.iconClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <TierBadge tier={tool.tier} />
      </div>
      <h2 className="mt-4 font-display text-3xl text-foreground">{tool.title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{tool.descriptor}</p>
      <p className="mt-3 text-sm leading-6 text-foreground/90">{tool.oneLiner}</p>
      {isLocked ? (
        <Link
          to="/pricing"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/18"
        >
          <Lock className="h-4 w-4" />
          {ui.unlockReconnectJourney}
        </Link>
      ) : null}
    </section>
  );
};

const PremiumMiniCard = ({ tool }: { tool: ReconnectTool }) => {
  const { lang } = useLanguage();
  const ui = reconnectUiCopy[lang];
  const hasPremiumAccess = usePremiumAccess();
  const upgradeCopy = reconnectUpgradeCopy[tool.slug] ?? {
    benefit: "Use premium reconnect tracks to move from friction to closeness with clear, repeatable structure.",
  };
  const miniLine = tool.tier === "free"
    ? tool.content?.premiumBanner ?? upgradeCopy.benefit
    : upgradeCopy.benefit;

  return (
  <section className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.24),transparent_55%),linear-gradient(135deg,rgba(245,158,11,0.18),rgba(15,23,42,0.15))] p-4 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.62)]">
    <div className="flex items-center gap-2 text-amber-200">
      {hasPremiumAccess ? <LockOpen className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
      <span className="text-xs uppercase tracking-[0.16em]">{hasPremiumAccess ? ui.premiumActive : ui.locked}</span>
    </div>
    <p className="mt-3 text-sm leading-6 text-foreground/90">
      {miniLine}
    </p>
    <div className="mt-3 flex flex-wrap gap-2">
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{ui.guidedScripts}</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{ui.repairTools}</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{ui.sacredLoveBridges}</span>
    </div>
    {hasPremiumAccess ? null : (
      <Link
        to="/pricing"
        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-500/14 px-3 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
      >
        {ui.viewPlansAndTrial}
        <ArrowRight className="h-4 w-4" />
      </Link>
    )}
  </section>
  );
};

const ReconnectPremiumBlock = ({ tool }: { tool: ReconnectTool }) => {
  const { lang } = useLanguage();
  const ui = reconnectUiCopy[lang];
  const hasPremiumAccess = usePremiumAccess();
  const upgradeCopy = reconnectUpgradeCopy[tool.slug] ?? {
    headline: "Stop losing each other in stressful weeks.",
    benefit: "Use premium reconnect tracks to move from friction to closeness with clear, repeatable structure.",
    bullets: [
      "Guided scripts for emotional repair without blame or shutdown loops.",
      "Stepwise body-first reset sequences for high-intensity moments.",
      "Progressive reconnect tracks from tender contact to renewed attraction.",
    ],
    cta: "Unlock Reconnect Premium",
  };

  return (
  <section className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_58%),linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,23,42,0.08))] p-5 shadow-[0_20px_60px_-42px_rgba(255,173,70,0.58)]">
    <p className="text-xs uppercase tracking-[0.2em] text-amber-300">{ui.premiumValue}</p>
    <h4 className="mt-2 font-display text-2xl text-foreground">{upgradeCopy.headline}</h4>
    <p className="mt-3 text-sm leading-7 text-foreground/90">{upgradeCopy.benefit}</p>
    <div className="mt-4 space-y-2">
      {upgradeCopy.bullets.map((bullet) => (
        <div key={bullet} className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-300" />
          <span>{bullet}</span>
        </div>
      ))}
    </div>
    {hasPremiumAccess ? null : (
      <Link
        to="/pricing"
        className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-500/14 px-4 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
      >
        {upgradeCopy.cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    )}
  </section>
  );
};

const FreeReconnectContent = ({ tool }: { tool: ReconnectTool }) => {
  const { lang } = useLanguage();
  const ui = reconnectUiCopy[lang];
  if (!tool.content) return null;

  const data = tool.content;

  return (
    <main className="space-y-5">
      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{ui.heroIntro}</p>
        <h3 className="mt-2 font-display text-3xl text-foreground">{tool.title}</h3>
        <div className="mt-4 space-y-3 text-sm leading-7 text-foreground/90">
          {data.heroIntro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <blockquote className="mt-5 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm leading-7 text-foreground/90">
          “{data.quote.text}”
          <footer className="mt-2 text-xs uppercase tracking-[0.14em] text-primary/80">{data.quote.source}</footer>
        </blockquote>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.useItWhen}</p>
        <div className="mt-4 space-y-3">
          {data.useWhen.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground/90">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.whyThisToolWorks}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {data.whyItWorks.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <h4 className="font-body text-sm text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
              {item.beginnerReframe ? <p className="mt-2 text-sm leading-6 text-emerald-200/90">{item.beginnerReframe}</p> : null}
              {item.advancedReframe ? <p className="mt-1 text-sm leading-6 text-amber-200/90">{item.advancedReframe}</p> : null}
            </article>
          ))}
        </div>
      </section>

      {data.beginnerTrack || data.advancedTrack ? (
        <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.beginnerAndAdvancedRoute}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {data.beginnerTrack ? (
              <article className="rounded-2xl border border-emerald-300/25 bg-emerald-500/8 p-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-200">{ui.beginner}</p>
                <h4 className="mt-2 font-body text-sm text-foreground">{data.beginnerTrack.title}</h4>
                <p className="mt-2 text-sm leading-6 text-foreground/90">{data.beginnerTrack.body}</p>
                <div className="mt-3 space-y-2">
                  {data.beginnerTrack.steps.map((step) => (
                    <div key={step} className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </article>
            ) : null}

            {data.advancedTrack ? (
              <article className="rounded-2xl border border-amber-300/25 bg-amber-500/8 p-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-amber-200">{ui.advanced}</p>
                <h4 className="mt-2 font-body text-sm text-foreground">{data.advancedTrack.title}</h4>
                <p className="mt-2 text-sm leading-6 text-foreground/90">{data.advancedTrack.body}</p>
                <div className="mt-3 space-y-2">
                  {data.advancedTrack.steps.map((step) => (
                    <div key={step} className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-300" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </article>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{ui.modernApplication}</p>
        <div className="mt-4 space-y-3">
          {data.modernUse.map((item) => (
            <article key={item.title} className="rounded-2xl border border-primary/20 bg-background/50 p-4">
              <h4 className="font-body text-sm text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.misuseAvoid}</p>
        <div className="mt-4 space-y-3">
          {data.whatToAvoid.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <h4 className="font-body text-sm text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
              {item.beginnerReframe ? <p className="mt-2 text-sm leading-6 text-emerald-200/90">{item.beginnerReframe}</p> : null}
              {item.advancedReframe ? <p className="mt-1 text-sm leading-6 text-amber-200/90">{item.advancedReframe}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.practicalExercises}</p>
        <div className="mt-4 space-y-4">
          {data.exercises.map((exercise, index) => (
            <article key={exercise.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-primary/80">{ui.practice} {index + 1}</p>
              <h4 className="mt-2 font-body text-sm text-foreground">{exercise.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{exercise.setup}</p>
              <div className="mt-3 space-y-2">
                {exercise.steps.map((step) => (
                  <div key={step} className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              {exercise.beginnerNote ? <p className="mt-3 text-sm leading-6 text-emerald-200/90">{ui.beginner}: {exercise.beginnerNote}</p> : null}
              {exercise.advancedNote ? <p className="mt-1 text-sm leading-6 text-amber-200/90">{ui.advanced}: {exercise.advancedNote}</p> : null}
              <p className="mt-3 text-sm leading-6 text-primary/85">{ui.integration}: {exercise.integration}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.reflectionPrompts}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {data.reflectionPrompts.map((prompt) => (
            <article key={prompt} className="rounded-2xl border border-border/25 bg-card/35 p-4 text-sm leading-7 text-foreground/90">
              {prompt}
            </article>
          ))}
        </div>
      </section>

      <ReconnectPremiumBlock tool={tool} />
    </main>
  );
};

const PremiumReconnectContent = ({ tool }: { tool: ReconnectTool }) => {
  const { lang } = useLanguage();
  const ui = reconnectUiCopy[lang];
  const hasPremiumAccess = usePremiumAccess();

  return (
  <main className="space-y-5">
    <section className="rounded-[28px] border border-amber-400/20 bg-gradient-to-br from-amber-500/12 via-background to-background p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.5)]">
      <div className="flex items-center gap-2">
        <TierBadge tier="premium" />
        <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-amber-200">
          {hasPremiumAccess ? ui.premiumTool : ui.lockedTool}
        </span>
      </div>
      <h3 className="mt-3 font-display text-3xl text-foreground">{tool.title}</h3>
      <p className="mt-3 text-sm leading-7 text-foreground/90">{tool.overviewLine}</p>
      <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
        {tool.teaser?.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {hasPremiumAccess ? null : (
        <Link
          to="/pricing"
          className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/18"
        >
          <Lock className="h-4 w-4" />
          {ui.unlockReconnectTrack}
        </Link>
      )}
    </section>

    <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.unlocksForRelationship}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">{ui.unlockCard1Title}</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{ui.unlockCard1Body}</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">{ui.unlockCard2Title}</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{ui.unlockCard2Body}</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">{ui.unlockCard3Title}</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{ui.unlockCard3Body}
          </p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">{ui.unlockCard4Title}</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{ui.unlockCard4Body}
          </p>
        </article>
      </div>
    </section>

    <ReconnectPremiumBlock tool={tool} />
  </main>
  );
};

const MobileDetailHeader = ({
  title,
  tier,
  onBack,
}: {
  title: string;
  tier: Tier;
  onBack: () => void;
}) => {
  const { lang } = useLanguage();
  const ui = reconnectUiCopy[lang];
  const hasPremiumAccess = usePremiumAccess();
  const isLocked = tier === "premium" && !hasPremiumAccess;

  return (
  <div className="sticky top-2 z-30 rounded-2xl border border-border/40 bg-background/95 p-3 shadow-[0_16px_40px_-32px_rgba(0,0,0,0.7)] backdrop-blur">
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        className="rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-xs uppercase tracking-[0.14em] text-foreground"
      >
        {ui.backToLibrary}
      </button>
      <div className="min-w-0 flex-1 text-right">
        <p className="truncate font-display text-lg text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{isLocked ? ui.lockedInPremium : ui.openAccess}</p>
      </div>
      <TierBadge tier={tier} />
    </div>
  </div>
  );
};

const RelatedReconnectCarousel = ({
  items,
  onSelect,
}: {
  items: ReconnectTool[];
  onSelect: (slug: string) => void;
}) => {
  const { lang } = useLanguage();
  const ui = reconnectUiCopy[lang];

  return (
  <section className="rounded-[24px] border border-border/30 bg-card/40 p-4">
    <p className="text-xs uppercase tracking-[0.18em] text-primary/80">{ui.relatedTracks}</p>
    <div className="mt-3 flex snap-x gap-3 overflow-x-auto pb-1">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.slug}
            type="button"
            onClick={() => onSelect(item.slug)}
            className="min-w-[220px] snap-start rounded-2xl border border-border/30 bg-background/50 p-3 text-left"
          >
            <div className="flex items-start justify-between gap-2">
              <div className={`inline-flex rounded-xl border border-border/30 bg-card/45 p-2 ${item.iconClass}`}>
                <Icon className="h-4 w-4" />
              </div>
              <TierBadge tier={item.tier} />
            </div>
            <h4 className="mt-2 font-display text-xl text-foreground">{item.title}</h4>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.oneLiner}</p>
          </button>
        );
      })}
    </div>
  </section>
  );
};

const Reconnect = () => {
  const { lang } = useLanguage();
  const ui = reconnectUiCopy[lang];
  const isMobile = useIsMobile();
  const [selectedSlug, setSelectedSlug] = useState("soft-landing");
  const [mobileDetailMode, setMobileDetailMode] = useState(false);
  const selected = useMemo(
    () => reconnectTools.find((tool) => tool.slug === selectedSlug) ?? reconnectTools[0],
    [selectedSlug],
  );

  const freeCount = reconnectTools.filter((tool) => tool.tier === "free").length;
  const premiumCount = reconnectTools.filter((tool) => tool.tier === "premium").length;
  const relatedTools = reconnectTools.filter((tool) => tool.slug !== selectedSlug).slice(0, 6);
  const showBrowse = !isMobile || !mobileDetailMode;
  const showDetail = !isMobile || mobileDetailMode;

  useSeoMetadata({
    title: `Reconnect Library - ${selected.title}`,
    description: selected.overviewLine,
    path: "/app/reconnect",
    surface: "app",
    noIndex: true,
  });

  useEffect(() => {
    if (!isMobile && mobileDetailMode) {
      setMobileDetailMode(false);
    }
  }, [isMobile, mobileDetailMode]);

  const handleSelectTool = (slug: string) => {
    setSelectedSlug(slug);
    if (isMobile) {
      setMobileDetailMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {showBrowse ? (
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-5 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">{ui.heroEyebrow}</p>
          <h1 className="mt-3 font-display text-3xl text-foreground md:text-5xl">{ui.heroTitle}</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            {ui.heroDesc}
          </p>
        </div>

        <div className="mt-6 w-full rounded-[24px] border border-border/30 bg-card/45 p-4">
          <div className="text-xs uppercase tracking-[0.22em] text-primary/80">{ui.sacredPages}</div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {libraryPages.map((page) => {
              const Icon = page.icon;
              const active = page.to === "/app/reconnect";
              return (
                <Link
                  key={page.to}
                  to={page.to}
                  className={`rounded-[20px] border p-4 text-left transition-all ${
                    active
                      ? "border-primary/30 bg-primary/10 shadow-[0_18px_50px_-36px_rgba(255,173,70,0.42)]"
                      : "border-border/30 bg-background/45 hover:border-primary/20 hover:bg-card/55"
                  }`}
                >
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-2.5 ${page.iconClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="mt-3 font-display text-xl text-foreground">{ui[page.labelKey]}</div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{ui[page.subtitleKey]}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      ) : null}

      {showBrowse ? (
      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.22em] text-primary/80">{ui.overviewEyebrow}</p>
        <h2 className="mt-2 font-display text-3xl text-foreground">{ui.overviewTitle}</h2>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {reconnectTools.map((tool) => {
            const Icon = tool.icon;
            const isSelected = selectedSlug === tool.slug;
            return (
              <button
                key={tool.slug}
                type="button"
                onClick={() => handleSelectTool(tool.slug)}
                className={`rounded-[24px] border p-4 text-left transition-all ${
                  isSelected
                    ? "border-primary/30 bg-primary/10 shadow-[0_16px_50px_-40px_rgba(255,173,70,0.45)]"
                    : "border-border/30 bg-background/45 hover:border-primary/20 hover:bg-card/55"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${tool.iconClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <TierBadge tier={tool.tier} />
                </div>
                <h3 className="mt-3 font-display text-2xl text-foreground">{tool.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.descriptor}</p>
                <p className="mt-2 text-xs leading-5 text-foreground/80">
                  {tool.tier === "free"
                    ? `${ui.practicePreview}: ${tool.content?.exercises[0]?.title ?? ui.practicePreviewFallback}`
                    : `${ui.premiumPreview}: ${tool.teaser?.[0] ?? ui.premiumPreviewFallback}`}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">{ui.openTracks}</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{freeCount} {ui.openTracksBody}</p>
          </div>
          <div className="rounded-2xl border border-amber-400/25 bg-amber-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-amber-200">{ui.lockedTracks}</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{premiumCount} {ui.lockedTracksBody}</p>
          </div>
        </div>
      </section>
      ) : null}

      {showDetail ? (
      <section className={`${isMobile ? "space-y-4" : "grid items-start gap-6 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]"}`}>
        {isMobile ? <MobileDetailHeader title={selected.title} tier={selected.tier} onBack={() => setMobileDetailMode(false)} /> : null}

        <aside className="space-y-4 lg:sticky lg:top-24">
          <ReconnectHeroCard tool={selected} />
          <PremiumMiniCard tool={selected} />
        </aside>

        <div className="space-y-4">
          {selected.tier === "free" ? <FreeReconnectContent tool={selected} /> : <PremiumReconnectContent tool={selected} />}
          {isMobile ? <RelatedReconnectCarousel items={relatedTools} onSelect={handleSelectTool} /> : null}
        </div>
      </section>
      ) : null}
    </div>
  );
};

export default Reconnect;
