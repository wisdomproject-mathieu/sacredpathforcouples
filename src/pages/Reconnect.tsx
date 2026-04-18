import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import {
  ArrowRight,
  Flame,
  Heart,
  Lock,
  MessageCircleHeart,
  MoonStar,
  PlayCircle,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useSeoMetadata } from "@/lib/seo";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

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

type ReconnectLocalizationOverrides = Partial<Omit<ReconnectTool, "content">> & {
  content?: Partial<FreeReconnectContent>;
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
];

const reconnectTools: ReconnectTool[] = [
  {
    slug: "three-breath-return",
    title: "The Three-Breath Return",
    tier: "free",
    icon: Heart,
    iconClass: "text-rose-300",
    descriptor: "Three conscious breaths taken together — the simplest reconnection practice across all traditions.",
    oneLiner: "Any moment of disconnection — after conflict, after a busy day, before sleep.",
    overviewLine: "Universal practice for returning to each other in three minutes or less.",
    content: {
      heroIntro: [
        "The simplest and most ancient reconnection practice across every tradition: three conscious breaths taken together. Not as a technique, but as a genuine act of return.",
        "Barry Long called it 'coming home.' Osho called it 'the first meeting.' Three breaths is enough to dissolve the accumulated distance of an ordinary day.",
      ],
      quote: {
        text: "Feel the breath of your partner as your own.",
        source: "Vigyan Bhairav Tantra, Method 47",
      },
      useWhen: [
        "After conflict, after a busy day, or before sleep.",
        "Any moment you feel the distance between you growing.",
        "When words feel too heavy and you need a simpler return.",
      ],
      whyItWorks: [
        {
          title: "Breath synchronises nervous systems",
          body: "Matching breath rhythms triggers co-regulation — your autonomic systems begin to attune.",
          beginnerReframe: "Start here every evening before any other practice.",
          advancedReframe: "Extend to seven breaths and track the shift in body temperature and relaxation.",
        },
        {
          title: "Touch activates oxytocin",
          body: "A hand on the heart creates an immediate physiological bonding response.",
          beginnerReframe: "If touch feels too much tonight, stand close enough to sense each other's warmth.",
          advancedReframe: "Add eye contact on the third breath to deepen the bonding response.",
        },
        {
          title: "The name as a sacred act",
          body: "Silently saying your partner's name during the third breath reactivates recognition — the opposite of the invisible stranger feeling.",
          beginnerReframe: "Keep it simple: just the name, nothing more.",
          advancedReframe: "Add one quality you love about them as you exhale their name.",
        },
      ],
      modernUse: [
        { title: "Evening transition", body: "Three minutes of return before dinner after difficult days — before anything else." },
        { title: "Post-conflict bridge", body: "Use as the first move after a rupture, before any repair conversation." },
        { title: "Morning arrival", body: "Begin the day consciously — meeting each other before phones or logistics." },
      ],
      whatToAvoid: [
        {
          title: "Counting instead of feeling",
          body: "Three breaths is not a timer. It is a quality of presence. Feel each one.",
          beginnerReframe: "Slow down until each breath takes at least 10 seconds total.",
          advancedReframe: "Practice until breath naturally synchronises without effort.",
        },
        {
          title: "Skipping the eye contact",
          body: "The 10 seconds of open gaze at the end is not optional — it is where the return completes.",
          beginnerReframe: "Start with 5 seconds if 10 feels too intense.",
          advancedReframe: "Try soft-gaze eye contact for the full duration of all three breaths.",
        },
        {
          title: "Rushing to what comes next",
          body: "Three breaths is complete in itself. Do not immediately launch into tasks or deep conversation.",
          beginnerReframe: "After the three breaths, sit in silence for 30 more seconds.",
          advancedReframe: "Use the silence after the third breath as an open space for whatever needs to emerge.",
        },
      ],
      exercises: [
        {
          title: "Classic Three-Breath Return",
          setup: "Both partners face each other. Each places their right hand on the other's heart.",
          steps: [
            "Close your eyes. Feel the warmth of your partner's hand on your heart.",
            "Breath 1 — Inhale together slowly (4 counts). Exhale together (6 counts). On this breath: release the day.",
            "Breath 2 — Inhale (4 counts). Exhale (6 counts). On this breath: feel the warmth of the hand on your heart.",
            "Breath 3 — Inhale (4 counts). Exhale (6 counts). On this breath: silently say your partner's name.",
            "Open your eyes and hold the gaze for 10 seconds.",
            "That is enough. You are back.",
          ],
          integration: "That is enough. You are back.",
          beginnerNote: "If 4-count inhale feels fast, use whatever speed feels natural.",
          advancedNote: "Extend to seven breaths and notice the deepening quality of presence.",
        },
      ],
      reflectionPrompts: [
        "What does it feel like when we complete three breaths and I look into your eyes?",
        "When during the day do we most need this practice?",
        "What changes in the quality of our evening when we begin this way?",
      ],
      related: [],
      premiumBanner:
        "Unlock guided breath synchronisation sequences and extended co-regulation practices for deeper nervous system attunement.",
    },
  },
  {
    slug: "twenty-second-hold",
    title: "The 20-Second Hold",
    tier: "free",
    icon: Heart,
    iconClass: "text-emerald-300",
    descriptor: "A held embrace of twenty seconds that triggers oxytocin release and begins to dissolve the physiological state of separation.",
    oneLiner: "Daily — especially when leaving or arriving home.",
    overviewLine: "Somatic research meets ancient embrace: the threshold where the body begins to believe it is safe.",
    content: {
      heroIntro: [
        "Neuroscience confirms what Tantric teachers knew: a held embrace of twenty seconds or more triggers the release of oxytocin — the bonding hormone — and begins to dissolve the physiological state of separation.",
        "The Taoist tradition called sustained physical contact 'merging the fields.' Twenty seconds is the threshold where the body begins to genuinely believe it is safe.",
      ],
      quote: {
        text: "Sustained physical contact without agenda is the fastest route to genuine nervous system safety — the prerequisite for all Tantric practice.",
        source: "Diana Richardson, Slow Sex research",
      },
      useWhen: [
        "Daily — especially when leaving or arriving home.",
        "When words feel inadequate but closeness is needed.",
        "After long periods of parallel activity with no physical contact.",
      ],
      whyItWorks: [
        {
          title: "Oxytocin threshold at 20 seconds",
          body: "Research confirms that embraces under 20 seconds do not trigger the same bonding hormonal response.",
          beginnerReframe: "Count silently if you need to — 20 is the minimum, 40 is better.",
          advancedReframe: "One full minute of held embrace transforms the nervous system state entirely.",
        },
        {
          title: "Chest-to-chest activates the heart field",
          body: "Both Tantric and cardiac coherence research show the heart generates its own electromagnetic field — full chest contact synchronises these fields.",
          beginnerReframe: "Start with side-by-side if full chest contact feels too intimate right now.",
          advancedReframe: "Add heart-focused intention: imagine warmth radiating from your chest to theirs.",
        },
        {
          title: "No agenda removes performance pressure",
          body: "Unlike sexual touch, a hold with no destination removes the pressure of where this is going.",
          beginnerReframe: "Say out loud: 'This is complete in itself.' Then hold.",
          advancedReframe: "Use the hold as a transition doorway into slower, conscious sensual contact.",
        },
      ],
      modernUse: [
        { title: "Arrival ritual", body: "20 seconds minimum upon arriving home — before phones, logistics, or conversation." },
        { title: "Sleep transition", body: "Hold at bedtime before separating to sleep — closes the day with contact." },
        { title: "Conflict reset", body: "After a difficult conversation: hold for 40 seconds before any further words." },
      ],
      whatToAvoid: [
        {
          title: "The pat-and-release",
          body: "A back-pat signals the end of the hug. Stay completely still and let the hold deepen.",
          beginnerReframe: "Drop the hands, soften the arms, and simply rest.",
          advancedReframe: "Try exhaling completely at the 10-second mark and noticing what opens.",
        },
        {
          title: "Keeping your pelvis back",
          body: "Full body contact includes the lower body. Stepping closer is the physical act of arrival.",
          beginnerReframe: "If this feels too much, start with heart-to-heart contact and build gradually.",
          advancedReframe: "Full body contact in stillness, with matched breath — this is the complete practice.",
        },
        {
          title: "Holding your breath",
          body: "Held breath signals the nervous system to stay alert. Let the breath soften and slow as you hold.",
          beginnerReframe: "Focus only on your exhale for the first 10 seconds.",
          advancedReframe: "Let your breath naturally synchronise with your partner's chest movement.",
        },
      ],
      exercises: [
        {
          title: "The Daily Hold",
          setup: "Full embrace, chests touching, arms wrapped. Both close eyes.",
          steps: [
            "Come together in full body contact: chests, bellies, arms fully wrapped.",
            "Both partners close their eyes.",
            "Feel the other person's breath moving their chest against yours.",
            "Let your own breathing slow to match theirs.",
            "Release any agenda for what comes next.",
            "Hold for at least 20 seconds — 40 is better. One minute transforms the nervous system state entirely.",
            "Before separating: one partner whispers one true thing. As simple as: 'I'm glad you're here.'",
          ],
          integration: "The whispered truth before separating is not optional — it keeps the practice from becoming purely somatic.",
          beginnerNote: "Set a gentle phone timer for 30 seconds so neither partner is counting.",
          advancedNote: "Work toward 2-minute holds without speaking — let the body settle completely.",
        },
      ],
      reflectionPrompts: [
        "What happens in my body when we hold for longer than I expected to?",
        "What true thing do I most need to whisper tonight?",
        "How often do we actually stop and hold each other like this?",
      ],
      related: [],
      premiumBanner:
        "Unlock guided somatic attunement sequences and touch-based co-regulation practices for deeper physical bonding.",
    },
  },
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
    slug: "eye-gazing",
    title: "Eye Gazing — The Soul Recognition",
    tier: "premium",
    icon: Heart,
    iconClass: "text-rose-300",
    descriptor: "5 minutes of unbroken eye contact that dissolves the accumulated image of the beloved and restores genuine seeing.",
    oneLiner: "For couples who have stopped truly seeing each other beneath the roles, the routines, and the familiar.",
    overviewLine: "Kashmir Shaivism and Osho both taught that the eyes are the first doorway — before touch, before words.",
    teaser: [
      "Dissolve the habitual image of your partner and meet the person who is actually here.",
      "Use structured gaze intervals that move from contact to recognition to devotion.",
      "Premium includes guided eye-gazing sequences for different emotional temperatures.",
    ],
  },
  {
    slug: "polarity-reset",
    title: "The Polarity Reset",
    tier: "premium",
    icon: Flame,
    iconClass: "text-rose-300",
    descriptor: "A 10-minute partner practice from David Deida that restores energetic distinction when sameness has flattened desire.",
    oneLiner: "For couples who still love each other but miss charge, anticipation, and directional tension.",
    overviewLine: "Sacred Polarity — the conscious restoration of masculine and feminine energetic difference.",
    teaser: [
      "Reintroduce conscious leading and receiving dynamics with precision and care.",
      "Use structured polarity drills that preserve consent and emotional safety.",
      "Premium includes step-by-step charge recovery scripts and integration prompts for couples.",
    ],
  },
  {
    slug: "synchronized-heart-orbit",
    title: "Synchronized Heart Orbit",
    tier: "premium",
    icon: Waves,
    iconClass: "text-violet-300",
    descriptor: "Mantak Chia's Microcosmic Orbit adapted for two bodies — creating a shared circuit of vital energy through breath alone.",
    oneLiner: "For couples who want to create a tangible shared field through conscious breathing together.",
    overviewLine: "Taoist Alchemy — circulating sexual energy into nourishment rather than depletion.",
    teaser: [
      "Build a shared energy circuit that both partners can feel during and after practice.",
      "Use Taoist breath sequencing to transform arousal into bonding vitality.",
      "Premium includes the full two-body Microcosmic Orbit with guided pacing for couples.",
    ],
  },
  {
    slug: "unsaid-round",
    title: "The Unsaid Round",
    tier: "premium",
    icon: MessageCircleHeart,
    iconClass: "text-amber-300",
    descriptor: "A structured 15-minute practice for safely voicing the things that have been accumulating between you.",
    oneLiner: "For couples with unspoken truths — things carried silently that slowly create invisible distance.",
    overviewLine: "Jan Day / Conscious Relating — honest expression within a container that protects the bond.",
    teaser: [
      "Use timed, turn-based rounds that prevent reactivity and defensiveness.",
      "Learn the Jan Day framework for honest speech that strengthens rather than damages trust.",
      "Premium includes full facilitation scripts and repair integration for after the round.",
    ],
  },
  {
    slug: "sacred-space-creation",
    title: "Sacred Space Creation",
    tier: "premium",
    icon: MoonStar,
    iconClass: "text-cyan-300",
    descriptor: "Margot Anand's 20-minute ritual for transitioning from ordinary life into genuine sacred intimacy.",
    oneLiner: "For couples who want the quality of their intimate time to be genuinely different from the rest of the day.",
    overviewLine: "SkyDancing Tantra — the art of consciously crossing the threshold into sacred space together.",
    teaser: [
      "Use Margot Anand's step-by-step space-creation ritual to signal the body that this time is different.",
      "Incorporate altar, intention-setting, and opening invocation into a repeatable couple practice.",
      "Premium includes the full SkyDancing Tantra space-creation sequence with guided partner roles.",
    ],
  },
];

const localizedReconnectOverrides: Partial<Record<Exclude<Language, "en">, Record<string, ReconnectLocalizationOverrides>>> = {
  fr: {
    "soft-landing": {
      descriptor: "Une séquence douce pour se poser, respirer et revenir l'un vers l'autre rapidement.",
      oneLiner: "Idéal quand vous voulez la proximité mais que vos systèmes sont surchargés.",
      overviewLine: "Reconnexion orientée système nerveux pour les journées de stress réel.",
      content: {
        heroIntro: [
          "Soft Landing est conçu pour les soirées saturées: baisser la température émotionnelle sans éteindre la possibilité érotique.",
          "Au lieu de forcer la profondeur, l'outil crée un pont crédible entre stress et présence relationnelle.",
        ],
        quote: {
          text: "Quand le corps se sent plus en sécurité, l'amour devient plus facile à ressentir et à offrir.",
          source: "Synthèse éditoriale Sacred Path · Reconnect",
        },
        useWhen: [
          "Après journées denses, charge parentale, voyage ou surcharge numérique.",
          "Quand l'amour est là mais l'arrivée émotionnelle manque.",
          "Quand une grande discussion risquerait d'échouer ce soir.",
        ],
        whyItWorks: [
          {
            title: "Faible effort, grand retour",
            body: "Peu d'énergie demandée, beaucoup de détente relationnelle.",
            beginnerReframe: "Débutant: faites-le même en version 5 minutes.",
            advancedReframe: "Avancé: insérez des micro-resets en conversation difficile.",
          },
          {
            title: "Réguler avant d'interpréter",
            body: "Une fois le corps apaisé, la communication devient naturellement plus propre.",
            beginnerReframe: "Débutant: attendre le souffle lent avant d'entrer dans le fond.",
            advancedReframe: "Avancé: suivre les signaux partenaire et recalibrer en direct.",
          },
        ],
        modernUse: [
          { title: "Transition de soirée", body: "10 minutes avant dîner ou coucher pour éviter la friction résiduelle." },
          { title: "Après tension", body: "Faire Soft Landing avant langage de réparation." },
          { title: "Calme favorable au désir", body: "Le calme peut redevenir terrain d'ouverture sensuelle." },
        ],
        whatToAvoid: [
          {
            title: "Transformer l'outil en performance",
            body: "La simplicité fait l'efficacité; sur-optimiser casse l'effet.",
            beginnerReframe: "Débutant: répéter la même structure courte.",
            advancedReframe: "Avancé: changer une variable à la fois.",
          },
          {
            title: "Forcer le dévoilement",
            body: "Le but est l'arrivée, pas l'excavation émotionnelle immédiate.",
            beginnerReframe: "Débutant: un ressenti, pas toute l'histoire.",
            advancedReframe: "Avancé: séquencer la profondeur après régulation.",
          },
        ],
        exercises: [
          {
            title: "Arrivée en 3 souffles",
            setup: "Genoux face à face, un point de contact des mains.",
            steps: [
              "Trois longues expirations synchronisées.",
              "Chacun: « mon corps se sent… »",
              "Chacun: un besoin simple pour ce soir.",
            ],
            integration: "Micro-rituel quotidien.",
            beginnerNote: "Réponses courtes et concrètes.",
            advancedNote: "Ajouter une intention relationnelle claire.",
          },
          {
            title: "Reset épaules",
            setup: "Debout face à face.",
            steps: [
              "Inspirez ensemble en montant les épaules.",
              "Expirez en relâchant vers les pieds.",
              "Cinq cycles avec regard doux.",
            ],
            integration: "Très efficace au retour à la maison.",
            beginnerNote: "À faire dès l'arrivée pour éviter le report de tension.",
            advancedNote: "Associer le dernier cycle à une phrase d'appréciation.",
          },
        ],
        reflectionPrompts: [
          "Qu'est-ce qui rend mon corps émotionnellement accessible ?",
          "Quel est notre reset de 5 minutes le plus fiable ?",
          "Où créons-nous de la friction de transition dans notre quotidien ?",
        ],
        premiumBanner:
          "Débloquez des séquences de co-régulation guidées, des scripts de reconnexion avancés et des rituels de transition pour les saisons de forte pression.",
      },
    },
    "heart-opening": {
      descriptor: "Une voie chaleureuse vers l'appréciation, la tendresse et la proximité émotionnelle.",
      oneLiner: "Idéal quand l'amour est présent mais que le nourrissement émotionnel s'est aminci.",
      overviewLine: "Réparation douce par gratitude et reassurance utilisable ce soir.",
      content: {
        heroIntro: [
          "Heart Opening aide à passer d'un partenariat fonctionnel à un lien ressenti.",
          "Ce n'est pas une réparation dramatique, c'est une remise en chaleur émotionnelle.",
        ],
        premiumBanner:
          "Débloquez des protocoles avancés d'ouverture du cœur, des scripts de reassurance et des séquences guidées pour transformer l'affection en attachement sécurisé.",
      },
    },
    "playful-spark": {
      descriptor: "Une reconnexion ludique qui réintroduit légèreté, curiosité et désir complice.",
      oneLiner: "Quand la relation est trop sérieuse et que la spontanéité a disparu.",
      overviewLine: "Ramener jeu et attraction sans perdre sécurité émotionnelle.",
      content: {
        heroIntro: [
          "Playful Spark réactive la complicité quand la relation devient purement logistique.",
          "Le jeu bien cadré peut faire revenir le désir sans pression de performance.",
        ],
        premiumBanner:
          "Débloquez des jeux de reconnexion guidés, des scripts de flirt conscient et des parcours progressifs pour restaurer spontanéité et charge érotique.",
      },
    },
  },
  cs: {
    "soft-landing": {
      descriptor: "Jemná sekvence pro zklidnění, dech a rychlý návrat k sobě navzájem.",
      oneLiner: "Ideální, když chcete blízkost, ale oba systémy jsou přetížené.",
      overviewLine: "Nervový systém na prvním místě: reconnect pro reálné stresové dny.",
      content: {
        heroIntro: [
          "Soft Landing je pro přetížené večery: sníží emoční teplotu bez ztráty erotického potenciálu.",
          "Místo tlačení do hloubky vytváří bezpečný most mezi stresem a vzájemnou přítomností.",
        ],
        quote: {
          text: "Když se tělo cítí bezpečněji, láska se snáz cítí i dává.",
          source: "Redakční syntéza Sacred Path · Reconnect",
        },
        useWhen: [
          "Po náročném dni, cestování, rodičovské zátěži nebo digitálním přehlcení.",
          "Když péče existuje, ale emoční příchod chybí.",
          "Když by velký rozhovor dnes večer pravděpodobně selhal.",
        ],
        whyItWorks: [
          {
            title: "Nízký nárok, vysoký efekt",
            body: "Minimum energie, rychlé změkčení vztahové atmosféry.",
            beginnerReframe: "Začátečník: udělej to i v 5minutové verzi.",
            advancedReframe: "Pokročilý: vkládej mikro-reset i během těžkých rozhovorů.",
          },
          {
            title: "Nejdřív regulace, pak interpretace",
            body: "Po zklidnění těla se kvalita komunikace zvedá přirozeně.",
            beginnerReframe: "Začátečník: počkej na pomalejší dech, pak teprve obsah.",
            advancedReframe: "Pokročilý: čti signály partnera a kalibruj tempo.",
          },
        ],
        modernUse: [
          { title: "Večerní přechod", body: "10 minut před večeří nebo spaním pro snížení tření." },
          { title: "Po napětí", body: "Nejprve Soft Landing, potom opravný jazyk." },
          { title: "Klid podporující touhu", body: "Klid může být vstupem k něze i otevřenosti." },
        ],
        whatToAvoid: [
          {
            title: "Udělání z praxe výkonu",
            body: "Jednoduchost je síla, překomplikování efekt oslabí.",
            beginnerReframe: "Začátečník: opakuj stejnou krátkou strukturu.",
            advancedReframe: "Pokročilý: měň vždy jen jednu proměnnou.",
          },
          {
            title: "Nucené odhalení",
            body: "Cíl je příchod, ne okamžitá hluboká psychoanalýza.",
            beginnerReframe: "Začátečník: sdílej jeden pocit, ne celý příběh.",
            advancedReframe: "Pokročilý: hloubku řaď až po stabilní regulaci.",
          },
        ],
        exercises: [
          {
            title: "Příchod ve 3 deších",
            setup: "Kolena proti sobě, jeden bod kontaktu rukou.",
            steps: [
              "Tři dlouhé synchronní výdechy.",
              "Každý: „moje tělo teď cítí…“",
              "Každý: jedna jednoduchá potřeba na dnešní večer.",
            ],
            integration: "Denní mikro-rituál.",
            beginnerNote: "Odpovědi krátké a konkrétní.",
            advancedNote: "Přidej jednu jasnou vztahovou intenci.",
          },
          {
            title: "Reset ramen",
            setup: "Ve stoje čelem k sobě.",
            steps: [
              "Nádech společně se zdvižením ramen.",
              "Výdech a uvolnění až do chodidel.",
              "Pět kol s měkkým pohledem.",
            ],
            integration: "Skvělé hned po příchodu domů.",
            beginnerNote: "Použijte jako přechod po příchodu.",
            advancedNote: "Poslední kolo spojte s větou ocenění.",
          },
        ],
        reflectionPrompts: [
          "Co dělá moje tělo emočně dostupným?",
          "Jaký 5minutový reconnect funguje nejspolehlivěji?",
          "Kde v běžném dni vytváříme přechodové tření?",
        ],
        premiumBanner:
          "Odemkněte vedené co-regulační sekvence, pokročilé reconnect skripty a přechodové rituály pro období vysokého tlaku.",
      },
    },
    "heart-opening": {
      descriptor: "Teplá cesta k ocenění, něze a emoční blízkosti.",
      oneLiner: "Ideální, když láska je přítomná, ale emoční výživa se ztenčila.",
      overviewLine: "Jemná obnova blízkosti skrze vděčnost a ujištění.",
      content: {
        heroIntro: [
          "Heart Opening vrací pár z funkčního režimu do skutečně cítěné blízkosti.",
          "Nejde o dramatickou opravu, ale o postupné znovu-zahřátí vztahu.",
        ],
        premiumBanner:
          "Odemkněte pokročilé heart-opening protokoly, ujišťovací skripty a vedené sekvence pro bezpečnější citovou vazbu.",
      },
    },
    "playful-spark": {
      descriptor: "Hravý reconnect, který vrací lehkost, zvědavost a partnerskou jiskru.",
      oneLiner: "Když je vztah příliš vážný a spontánnost zmizela.",
      overviewLine: "Vrátit hru a přitažlivost bez ztráty emoční bezpečnosti.",
      content: {
        heroIntro: [
          "Playful Spark oživuje hravost tam, kde převládla logistika a rutina.",
          "Dobře vedená hra může vrátit touhu bez výkonového tlaku.",
        ],
        premiumBanner:
          "Odemkněte vedené hravé reconnect cesty, skripty vědomého flirtu a progresivní mapy pro obnovu spontánnosti.",
      },
    },
  },
};

const applyReconnectLocalization = (tool: ReconnectTool, lang: Language): ReconnectTool => {
  if (lang === "en") return tool;
  const override = localizedReconnectOverrides[lang]?.[tool.slug];
  if (!override) return tool;

  return {
    ...tool,
    ...override,
    content: override.content ? { ...tool.content, ...override.content } : tool.content,
  };
};

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

const TierBadge = ({ tier }: { tier: Tier }) => {
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();
  const locked = entitlementResolved && tier === "premium" && !hasPremiumAccess;

  if (hasPremiumAccess || !entitlementResolved) return null;

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${tierBadgeClass[tier]}`}>
      {locked ? <Lock className="h-3.5 w-3.5" aria-label="Locked" /> : "Free"}
    </span>
  );
};

const ReconnectHeroCard = ({ tool }: { tool: ReconnectTool }) => {
  const { lang } = useLanguage();
  const ui = reconnectUiCopy[lang];
  const Icon = tool.icon;
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();
  const isLocked = entitlementResolved && tool.tier === "premium" && !hasPremiumAccess;

  if (isLocked) {
    return (
      <section className={`${shellCardClass} relative overflow-hidden`}>
        {/* Blurred content behind overlay */}
        <div className="blur-sm select-none pointer-events-none">
          <div className="flex items-start justify-between gap-3">
            <div className={`inline-flex rounded-2xl border border-border/30 bg-background/55 p-3 ${tool.iconClass}`}>
              <Icon className="h-5 w-5" />
            </div>
            <TierBadge tier={tool.tier} />
          </div>
          <h2 className="mt-4 font-display text-3xl text-foreground">{tool.title}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{tool.descriptor}</p>
          <p className="mt-3 text-sm leading-6 text-foreground/90">{tool.oneLiner}</p>
        </div>
        {/* Lock overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-[28px] bg-gradient-to-b from-amber-500/8 via-background/75 to-background/95 px-6 text-center">
          <div className="inline-flex rounded-2xl border border-amber-400/30 bg-amber-500/14 p-3 text-amber-300">
            <Lock className="h-5 w-5" />
          </div>
          <p className="font-display text-xl text-foreground">{tool.title}</p>
          <p className="max-w-[220px] text-xs leading-5 text-muted-foreground">{tool.oneLiner}</p>
          <Link
            to="/pricing"
            className="mt-1 inline-flex items-center gap-2 rounded-2xl border border-amber-400/30 bg-amber-500/14 px-4 py-2 text-sm text-foreground transition-all hover:border-amber-400/50 hover:bg-amber-500/20"
          >
            Unlock Premium
          </Link>
        </div>
      </section>
    );
  }

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
    </section>
  );
};

const PremiumMiniCard = ({ tool }: { tool: ReconnectTool }) => {
  const { lang } = useLanguage();
  const ui = reconnectUiCopy[lang];
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();
  if (hasPremiumAccess || !entitlementResolved) return null;
  const upgradeCopy = reconnectUpgradeCopy[tool.slug] ?? {
    benefit: "Use premium reconnect tracks to move from friction to closeness with clear, repeatable structure.",
  };
  const miniLine = tool.tier === "free"
    ? tool.content?.premiumBanner ?? upgradeCopy.benefit
    : upgradeCopy.benefit;

  return (
  <section className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.24),transparent_55%),linear-gradient(135deg,rgba(245,158,11,0.18),rgba(15,23,42,0.15))] p-4 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.62)]">
    <div className="flex items-center gap-2 text-amber-200">
      <Lock className="h-4 w-4" />
      <span className="text-xs uppercase tracking-[0.16em]">{ui.locked}</span>
    </div>
    <p className="mt-3 text-sm leading-6 text-foreground/90">
      {miniLine}
    </p>
    <div className="mt-3 flex flex-wrap gap-2">
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Reconnect</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Heal</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Grow together</span>
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
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();

  if (hasPremiumAccess || !entitlementResolved) return null;

  return (
  <section className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_58%),linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,23,42,0.08))] p-5 shadow-[0_20px_60px_-42px_rgba(255,173,70,0.58)]">
    <p className="text-xs uppercase tracking-[0.2em] text-amber-300">DEEPER TANTRIC JOURNEY</p>
    <h4 className="mt-2 font-display text-2xl text-foreground">Turn sacred insight into shared experience.</h4>
    <p className="mt-3 text-sm leading-7 text-foreground/90">Premium supports couples who want to move from beautiful ideas into real intimacy — through practices, reflection, repair, and new ways of meeting each other with presence and desire.</p>
    <Link
      to="/pricing"
      className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-500/14 px-4 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
    >
      Enter the deeper journey
      <ArrowRight className="h-4 w-4" />
    </Link>
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
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();

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
      {entitlementResolved && !hasPremiumAccess ? (
        <Link
          to="/pricing"
          className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/18"
        >
          <Lock className="h-4 w-4" />
          {ui.unlockReconnectTrack}
        </Link>
      ) : null}
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
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();
  const isLocked = entitlementResolved && tier === "premium" && !hasPremiumAccess;

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
  const localizedReconnectTools = useMemo(
    () => reconnectTools.map((tool) => applyReconnectLocalization(tool, lang)),
    [lang],
  );
  const [selectedSlug, setSelectedSlug] = useState("soft-landing");
  const [mobileDetailMode, setMobileDetailMode] = useState(false);
  const selected = useMemo(
    () => localizedReconnectTools.find((tool) => tool.slug === selectedSlug) ?? localizedReconnectTools[0],
    [localizedReconnectTools, selectedSlug],
  );

  const freeCount = localizedReconnectTools.filter((tool) => tool.tier === "free").length;
  const premiumCount = localizedReconnectTools.filter((tool) => tool.tier === "premium").length;
  const relatedTools = localizedReconnectTools.filter((tool) => tool.slug !== selectedSlug).slice(0, 6);
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
      <section className="relative overflow-hidden rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-5 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="absolute top-4 right-4 opacity-20 hover:opacity-40 transition-opacity">
          <img src={shivaShaktiIcon} alt="" className="h-12 w-12 rounded-[10px]" />
        </div>
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">{ui.heroEyebrow}</p>
          <h1 className="mt-3 font-display text-3xl text-foreground md:text-5xl">{ui.heroTitle}</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            {ui.heroDesc}
          </p>
        </div>

        <div className="mt-6 w-full rounded-[24px] border border-border/30 bg-card/45 p-4">
          <div className="text-xs uppercase tracking-[0.22em] text-primary/80">{ui.sacredPages}</div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
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
          <div className="mt-3 rounded-2xl border border-border/25 bg-background/40 px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {lang === "fr" ? "Reconnect intégré" : lang === "cs" ? "Reconnect integrován" : "Reconnect integrated"}
            </p>
            <p className="mt-1 text-xs leading-5 text-foreground/85">
              {lang === "fr"
                ? "Les pratiques Reconnect nourrissent aussi Tonight Path, les recommandations météo et More Rituals for Two."
                : lang === "cs"
                  ? "Reconnect praxe napájí také Dnešní cestu, doporučení podle počasí a Více rituálů pro dva."
                  : "Reconnect practices also feed Tonight Path, weather-based recommendations, and More Rituals for Two."}
            </p>
          </div>
        </div>
      </section>
      ) : null}

      {showBrowse ? (
      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.22em] text-primary/80">{ui.overviewEyebrow}</p>
        <h2 className="mt-2 font-display text-3xl text-foreground">{ui.overviewTitle}</h2>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {localizedReconnectTools.map((tool) => {
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

          {!hasPremiumAccess && entitlementResolved ? (
            <div className="relative overflow-hidden flex flex-col items-center justify-center rounded-[24px] border border-amber-400/25 bg-gradient-to-br from-amber-950/60 via-card/50 to-card/30 p-5 text-center">
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <img src={shivaShaktiIcon} alt="" className="h-48 w-48 object-contain" />
              </div>
              <p className="relative z-10 text-xs uppercase tracking-[0.22em] text-amber-400/70">FOR HIM</p>
              <h3 className="relative z-10 mt-2 font-display text-xl text-foreground">
                Presence is the most erotic thing a man can offer.
              </h3>
              <p className="relative z-10 mt-3 text-sm leading-6 text-muted-foreground">
                David Deida, Barry Long, and Mantak Chia show you exactly how. Full access with Sacred Path Premium.
              </p>
              <Link to="/pricing" className="relative z-10 mt-4 rounded-[12px] border border-amber-400/40 bg-amber-400/15 px-5 py-2.5 text-sm text-amber-300 transition-all hover:bg-amber-400/25">
                Explore the masculine path →
              </Link>
            </div>
          ) : null}
        </div>

        {!hasPremiumAccess && entitlementResolved ? (
          <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-500/6 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-amber-200">WHY GO DEEPER</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">Some wisdom can inspire in a moment. Deeper guidance helps you live it together, especially when love needs renewal, courage, and care.</p>
          </div>
        ) : null}
      </section>
      ) : null}

      {showDetail ? (
      <section className={`${isMobile ? "space-y-4" : "grid items-start gap-6 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]"}`}>
        {isMobile ? <MobileDetailHeader title={selected.title} tier={selected.tier} onBack={() => setMobileDetailMode(false)} /> : null}

        <aside className="space-y-4 lg:sticky lg:top-24">
          <ReconnectHeroCard tool={selected} />
          {!hasPremiumAccess && entitlementResolved ? <PremiumMiniCard tool={selected} /> : null}
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
