import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  Feather,
  Flame,
  Heart,
  Lock,
  LockOpen,
  Sparkles,
  Star,
  SunMoon,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSeoMetadata } from "@/lib/seo";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { getEffectiveMembershipTier, isPremiumTier } from "@/lib/Premium";

type Tier = "free" | "premium";

type Teaching = {
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

type RelatedPath = {
  name: string;
  note: string;
};

type FreeAuthorContent = {
  heroIntro: string[];
  whoItsFor?: Teaching[];
  practicePreview?: {
    title: string;
    body: string;
    steps: string[];
  };
  beginnerTrack?: GrowthTrack;
  advancedTrack?: GrowthTrack;
  quote: {
    text: string;
    source: string;
  };
  whyMatters: string[];
  coreTeachings: Teaching[];
  modernUse: Teaching[];
  shadowToAvoid: Teaching[];
  exercises: Exercise[];
  reflectionPrompts: string[];
  relatedPaths: RelatedPath[];
  premiumBanner: string;
};

type Author = {
  slug: string;
  name: string;
  tier: Tier;
  descriptor: string;
  oneLiner: string;
  overviewLine: string;
  icon: LucideIcon;
  iconClass: string;
  teaser?: string[];
  content?: FreeAuthorContent;
};

const libraryPages = [
  {
    to: "/app/paths",
    labelKey: "pagePaths",
    subtitleKey: "pagePathsSubtitle",
    icon: Sparkles,
    iconClass: "text-violet-300",
  },
  {
    to: "/app/authors",
    labelKey: "pageAuthors",
    subtitleKey: "pageAuthorsSubtitle",
    icon: Feather,
    iconClass: "text-rose-300",
  },
  {
    to: "/app/reconnect",
    labelKey: "pageReconnect",
    subtitleKey: "pageReconnectSubtitle",
    icon: Heart,
    iconClass: "text-amber-300",
  },
];

const authors: Author[] = [
  {
    slug: "deida",
    name: "David Deida",
    tier: "free",
    descriptor: "Ancient polarity wisdom translated into practical intimacy for modern couples.",
    oneLiner: "Helps couples recover charge quickly when love is steady but desire has gone flat.",
    overviewLine: "Use now for erotic clarity and devotion, then go deeper as a couple over time.",
    icon: Flame,
    iconClass: "text-amber-300",
    content: {
      heroIntro: [
        "David Deida is most useful when a relationship still has loyalty and care, but erotic aliveness has flattened. His work gives couples language for restoring charge without abandoning tenderness.",
        "Read skillfully, this is not about rigid gender scripts. It is about directed presence, conscious contrast, emotional truth, and devotion held inside explicit consent.",
        "For modern couples, Deida becomes practical when translated into short rituals: truth naming, lead/receive rounds, and clear pacing signals that protect nervous-system safety.",
      ],
      whoItsFor: [
        {
          title: "Couples who feel emotionally close but erotically flat",
          body: "Deida gives language and structure for restoring attraction without abandoning tenderness.",
        },
        {
          title: "Couples stuck in over-analysis loops",
          body: "Use directional embodied rounds to create movement before more conversation.",
        },
        {
          title: "Couples carrying subtle resentment",
          body: "Use truth-forward polarity dialogue to clear charge-draining avoidance.",
        },
        {
          title: "Couples ready for devotional-erotic growth",
          body: "Train presence, contrast, and reverence as practical relationship skills.",
        },
      ],
      practicePreview: {
        title: "Deida polarity check-in",
        body: "A structured pre-intimacy sequence for reconnecting desire with emotional integrity.",
        steps: [
          "Name one relational truth you have been avoiding this week.",
          "Name one devotional action you will take tonight.",
          "Run a 2-minute lead/receive breath round and switch.",
          "Close with explicit more, same, slower, or pause consent language.",
        ],
      },
      beginnerTrack: {
        title: "Beginner Track: Restore Charge Without Overwhelm",
        body: "For the first weeks, use Deida principles in short, low-pressure rounds. The aim is to rebuild directional energy while keeping emotional safety stable.",
        steps: [
          "Run one 8-minute polarity check-in three times per week.",
          "Keep touch intensity under 6/10 and prioritize clarity over intensity.",
          "Use one truth sentence and one devotional sentence each round.",
          "Close every practice with one concrete next action for the next 24 hours.",
        ],
      },
      advancedTrack: {
        title: "Advanced Track: Integrate Polarity, Truth, and Devotion",
        body: "Once stability is strong, deepen contrast and charge while preserving consent, warmth, and accountability.",
        steps: [
          "Alternate 2-minute directional rounds with 1-minute receptive stillness for 4 cycles.",
          "Use edge language plus nervous-system check-ins every cycle.",
          "Practice truth delivery with direct tone and non-defensive listening.",
          "Debrief each session: what increased attraction, what reduced trust, what needs recalibration.",
        ],
      },
      quote: {
        text: "Attraction often returns when partners stop managing each other and start meeting with directed, loving presence.",
        source: "Sacred Path Deida editorial synthesis",
      },
      whyMatters: [
        "He names the gap between companionate love and erotic charge without shaming either partner.",
        "He offers practical language for leadership, receptivity, honesty, and devotion.",
        "He helps long-term couples reintroduce anticipation and tension without abandoning tenderness.",
        "His framework pairs well with research on emotional bids: turning toward each other consistently restores connection momentum.",
      ],
      coreTeachings: [
        {
          title: "Presence is erotic",
          body: "The body senses directed attention before the mind finishes analyzing. Presence itself changes desire.",
          beginnerReframe: "Beginner move: hold eye contact for 20 seconds before speaking.",
          advancedReframe: "Advanced move: sustain directed attention while naming difficult truth without collapse.",
        },
        {
          title: "Conscious difference creates magnetism",
          body: "Too much sameness can flatten chemistry; conscious contrast can revive it.",
          beginnerReframe: "Beginner move: practice one lead/receive round with explicit consent language.",
          advancedReframe: "Advanced move: alternate leadership quality while maintaining emotional attunement.",
        },
        {
          title: "Devotion and desire reinforce each other",
          body: "Reverence does not weaken erotic life when it is paired with embodied truth.",
          beginnerReframe: "Beginner move: make one devotional offering before any sensual practice.",
          advancedReframe: "Advanced move: pair longing expression with grounded aftercare and integration.",
        },
        {
          title: "Truth keeps charge alive",
          body: "Hidden resentment and polite avoidance kill attraction faster than conflict does.",
          beginnerReframe: "Beginner move: name one small avoided truth this week.",
          advancedReframe: "Advanced move: run timed truth rounds with mirror reflection and repair closure.",
        },
      ],
      modernUse: [
        {
          title: "When routines erase erotic anticipation",
          body: "Create brief transitions from logistics mode to lover mode before touch begins.",
        },
        {
          title: "When communication is strong but chemistry is weak",
          body: "Use embodied leading/receiving rounds instead of adding more analysis.",
        },
        {
          title: "When one partner over-functions",
          body: "Practice role contrast with explicit consent so both partners can feel dynamic energy again.",
        },
      ],
      shadowToAvoid: [
        {
          title: "Stereotypes disguised as spirituality",
          body: "Polarity is not an excuse for rigid identity scripts.",
          beginnerReframe: "Beginner move: define polarity as dynamic role, not fixed identity.",
          advancedReframe: "Advanced move: explore role fluidity while preserving energetic contrast.",
        },
        {
          title: "Intensity without consent",
          body: "Edge must stay in dialogue with nervous-system safety and mutual choice.",
          beginnerReframe: "Beginner move: slow down at first sign of freeze, shutdown, or confusion.",
          advancedReframe: "Advanced move: use intensity ladders and explicit recalibration checkpoints.",
        },
        {
          title: "Performance over intimacy",
          body: "If it becomes theater, the body disconnects even when the scene looks dramatic.",
          beginnerReframe: "Beginner move: shorten sessions and remove performative goals.",
          advancedReframe: "Advanced move: track authenticity over intensity in post-session debriefs.",
        },
      ],
      exercises: [
        {
          title: "Directional Breath Frame (8 minutes)",
          setup: "One partner leads rhythm, one receives, then switch.",
          steps: [
            "Face each other and set a simple shared breathing pace.",
            "Leader holds the frame for two minutes while receiver tracks sensations.",
            "Switch and repeat.",
            "Close with one sentence each about what shifted.",
          ],
          integration: "Repeat twice weekly to rebuild trust in energetic contrast.",
          beginnerNote: "Keep voice calm and directional, not dominant.",
          advancedNote: "Add a truth sentence at minute four without breaking breath pace.",
        },
        {
          title: "Truth and Devotion Check-In (10 minutes)",
          setup: "Sit side by side with one point of physical contact.",
          steps: [
            "Partner A names one erotic truth and one devotional commitment.",
            "Partner B reflects back exactly what they heard.",
            "Switch roles.",
            "End with one tiny next action for 24 hours.",
          ],
          integration: "Use when tension is subtle but persistent.",
          beginnerNote: "Choose low-stakes truth first to build safety.",
          advancedNote: "Use higher-stakes truth with explicit repair intention and closure.",
        },
        {
          title: "Edge Window Practice (6 minutes)",
          setup: "Agree on intensity limit before starting.",
          steps: [
            "Use slow directional touch and eye contact.",
            "Receiver responds only with more/same/pause.",
            "Switch after three minutes.",
          ],
          integration: "Builds charge while preserving co-regulation.",
          beginnerNote: "Keep intensity cap conservative during first week.",
          advancedNote: "Use micro-pauses to amplify anticipation without losing regulation.",
        },
      ],
      reflectionPrompts: [
        "Where has our relationship become safe but energetically neutral?",
        "What kind of polarity feels alive without feeling fake?",
        "What truth am I avoiding that is costing us desire?",
        "What devotional action would help my partner feel chosen this week?",
        "What small daily bid for connection am I currently missing?",
      ],
      relatedPaths: [
        { name: "Polarity", note: "Conscious energetic contrast and devotional edge." },
        { name: "Tantra", note: "Breath and presence to hold charge with depth." },
        { name: "Kama Sutra", note: "Atmosphere and anticipation as erotic architecture." },
      ],
      premiumBanner:
        "Unlock advanced Deida pathways with guided polarity scripts, truth-and-devotion flows, and progressive modules that restore charge while protecting emotional safety.",
    },
  },
  {
    slug: "osho",
    name: "Osho",
    tier: "free",
    descriptor: "Meditative intimacy from ancient awareness teachings, adapted for modern couples.",
    oneLiner: "Helps couples reconnect fast when they feel numb, over-mental, or emotionally blocked.",
    overviewLine: "Awareness-based intimacy tools you can apply now and deepen over time together.",
    icon: SunMoon,
    iconClass: "text-fuchsia-300",
    content: {
      heroIntro: [
        "Osho's practical value is method, not mythology: bring awareness into sensation, emotion, and relational patterning so reactivity does not run the relationship.",
        "He distinguishes suppression from integration. The invitation is neither collapse nor control, but witnessing: feel fully, breathe fully, and stay present enough for connection to return.",
        "For couples, the usable piece is simple: regulate the body, name what is real, and re-enter dialogue from awareness instead of defensive reflex.",
      ],
      whoItsFor: [
        {
          title: "Couples overwhelmed by stress reactivity",
          body: "Osho-inspired witnessing practices help regulate before escalation takes over.",
        },
        {
          title: "Couples trapped in repetitive arguments",
          body: "Shift from verbal looping to body-led awareness, then return to dialogue with more clarity.",
        },
        {
          title: "Couples disconnected from sensation",
          body: "Use breath, stillness, and emotional witnessing to reopen body-level connection.",
        },
        {
          title: "Couples exploring intimacy as spiritual practice",
          body: "Build awareness rituals that make daily closeness more conscious and meaningful.",
        },
      ],
      practicePreview: {
        title: "Witnessing reset loop",
        body: "A practical sequence for turning charged evenings into regulated connection.",
        steps: [
          "Sit back-to-back and track breath without changing it.",
          "Name one sensation and one emotion without explanation.",
          "Turn face-to-face and mirror each other’s words exactly.",
          "Close with one shared intention for the next hour.",
        ],
      },
      beginnerTrack: {
        title: "Beginner Track: Move From Reactivity to Presence",
        body: "Start with short body-led resets that lower activation quickly. The goal is to prevent emotional spirals before they harden into distance.",
        steps: [
          "Use a 5-7 minute witnessing reset on stressful evenings.",
          "Name sensation first, then emotion, before interpretation.",
          "Keep language simple and avoid analysis during regulation phase.",
          "Close with one shared intention for the next hour.",
        ],
      },
      advancedTrack: {
        title: "Advanced Track: Integrate Awareness Into Conflict And Desire",
        body: "When base regulation is stable, expand into deeper emotional honesty and conscious erotic presence without bypassing accountability.",
        steps: [
          "Run 12-minute awareness rounds before high-stakes dialogue.",
          "Practice mirrored listening plus one direct repair request each.",
          "Integrate stillness, breath, and touch into one coherent sequence.",
          "Review patterns weekly: triggers, recovery speed, and trust impact.",
        ],
      },
      quote: {
        text: "Love deepens when partners stop controlling inner weather and learn to witness it together.",
        source: "Sacred Path Osho editorial synthesis",
      },
      whyMatters: [
        "He gives couples permission to feel deeply without dramatizing every emotion.",
        "He reframes intimacy as awareness practice, not only compatibility outcome.",
        "He uses body-led methods that reduce conversational looping.",
        "His approach supports the same present-moment attention linked to stronger sexual and relational flourishing.",
      ],
      coreTeachings: [
        {
          title: "Awareness transforms intensity",
          body: "Witnessed sensation becomes information, not threat.",
          beginnerReframe: "Beginner move: pause and name sensation before reacting.",
          advancedReframe: "Advanced move: stay present during high emotional charge without shutting down.",
        },
        {
          title: "The body is the doorway",
          body: "Breath, sound, and movement reveal truth faster than abstract debate.",
          beginnerReframe: "Beginner move: use breath sync before any hard conversation.",
          advancedReframe: "Advanced move: track subtle body shifts during dialogue and recalibrate pace.",
        },
        {
          title: "Freedom with attunement",
          body: "Authenticity is strongest when paired with relational care.",
          beginnerReframe: "Beginner move: express one honest feeling plus one caring intention.",
          advancedReframe: "Advanced move: hold direct truth while actively maintaining partner safety.",
        },
        {
          title: "Meditation inside intimacy",
          body: "Stillness and breath can make simple contact feel sacred and clean.",
          beginnerReframe: "Beginner move: add one minute of stillness before touch.",
          advancedReframe: "Advanced move: use stillness intervals between polarity or desire rounds.",
        },
      ],
      modernUse: [
        {
          title: "When stress dominates the relationship climate",
          body: "Use short active-release practices before expecting emotionally nuanced conversation.",
        },
        {
          title: "When talks keep circling",
          body: "Pause verbal processing and regulate together, then return to dialogue.",
        },
        {
          title: "When shame blocks desire",
          body: "Use non-judgmental awareness language and paced embodiment.",
        },
      ],
      shadowToAvoid: [
        {
          title: "Spiritual bypassing",
          body: "Awareness language should not replace accountability and repair.",
          beginnerReframe: "Beginner move: pair every insight with one behavioral commitment.",
          advancedReframe: "Advanced move: use awareness plus repair protocol after each rupture.",
        },
        {
          title: "Catharsis without integration",
          body: "Release helps only if behavior and agreements also change.",
          beginnerReframe: "Beginner move: after release, set one concrete next step for tomorrow.",
          advancedReframe: "Advanced move: track whether each release changes recurring patterns.",
        },
        {
          title: "Boundary blur",
          body: "Exploration still requires explicit consent and pacing.",
          beginnerReframe: "Beginner move: ask consent before each new practice phase.",
          advancedReframe: "Advanced move: use explicit pacing checkpoints in long sessions.",
        },
      ],
      exercises: [
        {
          title: "Witnessing Breath (7 minutes)",
          setup: "Begin back-to-back, then turn face-to-face.",
          steps: [
            "Notice breath differences without correcting.",
            "Synchronize exhalation gradually.",
            "Turn toward each other and continue for three minutes.",
          ],
          integration: "Use before sensitive conversations.",
          beginnerNote: "If tension rises, return to back-to-back breathing for one minute.",
          advancedNote: "Add one minute of silent eye contact before speaking.",
        },
        {
          title: "Shake and Stillness (9 minutes)",
          setup: "Stand grounded with soft knees.",
          steps: [
            "Shake for three minutes to release charge.",
            "Breathe and vocalize gently for two minutes.",
            "Sit in stillness for four minutes.",
          ],
          integration: "Useful on anxious or irritable days.",
          beginnerNote: "Keep shake intensity low and prioritize grounded feet.",
          advancedNote: "Add intentional sound release on exhale to deepen settling.",
        },
        {
          title: "Sacred Listening Round (12 minutes)",
          setup: "Use strict timed turns.",
          steps: [
            "Speaker shares for two minutes.",
            "Listener responds only with validating prompts.",
            "Switch and repeat.",
            "Close with one gratitude and one request each.",
          ],
          integration: "Builds honesty without escalation.",
          beginnerNote: "Keep requests small and actionable to protect follow-through.",
          advancedNote: "Add one repair acknowledgment before gratitude close.",
        },
      ],
      reflectionPrompts: [
        "What do I suppress in intimacy, and what does it cost us?",
        "Where do I confuse expression with responsibility?",
        "What helps me stay present when sensation rises?",
        "Which 5-minute daily awareness ritual would most help us?",
        "How quickly do we return to contact after our first stress signal?",
      ],
      relatedPaths: [
        { name: "Tantra", note: "Sacred embodied awareness and breath-led intimacy." },
        { name: "Tao", note: "Regulated pacing and nourishing sensual flow." },
        { name: "Polarity", note: "Conscious charge shaped with presence." },
      ],
      premiumBanner:
        "Unlock deeper Osho-inspired practices, guided witnessing sequences, and advanced integration pathways that turn daily stress into deeper conscious intimacy.",
    },
  },
  {
    slug: "mantak-chia",
    name: "Mantak Chia",
    tier: "premium",
    descriptor: "Taoist alchemy translated into partner practices for sustainable intimacy and vitality.",
    oneLiner: "For couples learning to transform arousal into shared life-force and deeper connection.",
    overviewLine: "Ancient Taoist mechanics for modern couples who want lasting erotic energy.",
    icon: Waves,
    iconClass: "text-cyan-300",
    teaser: [
      "Learn the practical architecture of Taoist couple energy work for modern relationship life.",
      "Move from depletion cycles to circulation-based intimacy that leaves both partners nourished.",
      "Premium includes guided progression from first practices to advanced couple sequencing.",
    ],
  },
  {
    slug: "margot-anand",
    name: "Margot Anand",
    tier: "premium",
    descriptor: "Ecstatic Tantra and sacred sensuality translated for modern couple ritual life.",
    oneLiner: "For couples wanting joy, devotion, and erotic celebration with relational structure.",
    overviewLine: "Ceremonial Tantra for partners growing closer through beauty and intention.",
    icon: Sparkles,
    iconClass: "text-rose-300",
    teaser: [
      "Bring play and reverence into the same erotic field without losing emotional safety.",
      "Explore ceremonial frameworks that feel alive, tasteful, and usable in modern life.",
      "Premium includes guided rituals, scripts, and progression maps toward sacred love.",
    ],
  },
  {
    slug: "daniel-odier",
    name: "Daniel Odier",
    tier: "premium",
    descriptor: "Non-dual Tantra and subtle attention for couples seeking contemplative erotic depth.",
    oneLiner: "For couples drawn to silence, subtlety, and refined presence that builds intimacy.",
    overviewLine: "Contemplative intimacy for partners who value depth over performance pressure.",
    icon: Star,
    iconClass: "text-violet-300",
    teaser: [
      "Subtle tantric teachings for meditative relational work that supports modern couples.",
      "Bridge sensuality and non-dual awareness with practical methods you can apply gently.",
      "Premium includes paired contemplative practices and integration guides for ongoing closeness.",
    ],
  },
  {
    slug: "michaela-boehm",
    name: "Michaela Boehm",
    tier: "premium",
    descriptor: "Embodiment and relational nervous-system literacy for modern couple intimacy.",
    oneLiner: "For couples who want grounded somatic tools they can use immediately.",
    overviewLine: "Somatic relational skills for attraction, regulation, and honest connection.",
    icon: Heart,
    iconClass: "text-orange-300",
    teaser: [
      "Translate body intelligence into better connection and desire in everyday relationship moments.",
      "Work with tension, shutdown, and over-activation in real time, together.",
      "Premium includes embodied drills and partner regulation maps for durable closeness.",
    ],
  },
  {
    slug: "barry-long",
    name: "Barry Long",
    tier: "premium",
    descriptor: "Relational truth, simplicity, and disciplined conscious love for committed partners.",
    oneLiner: "For couples who want less drama and more clarity that restores respect and closeness.",
    overviewLine: "Presence-led relational integrity for modern couples seeking grounded sacred love.",
    icon: Feather,
    iconClass: "text-emerald-300",
    teaser: [
      "Cut through noise and performative relationship habits that create distance.",
      "Practice direct honesty with emotional sobriety and mutual care.",
      "Premium includes clarity practices for long-term partnership and daily repair.",
    ],
  },
  {
    slug: "jan-day",
    name: "Jan Day",
    tier: "premium",
    descriptor: "Body-led intimacy, relational healing, and emotional courage for modern couples.",
    oneLiner: "For couples rebuilding trust in touch, vulnerability, and honest expression.",
    overviewLine: "Embodied intimacy repair with practical exercises for deeper connection.",
    icon: Compass,
    iconClass: "text-violet-300",
    teaser: [
      "Use body-awareness to repair disconnect and shame patterns without overwhelm.",
      "Build communication that feels honest and gentle at the same time.",
      "Premium includes guided repair rituals for modern couples moving toward sacred partnership.",
    ],
  },
  {
    slug: "max-bush",
    name: "Max Bush",
    tier: "premium",
    descriptor: "Erotic confidence and practical sensual development for connected modern couples.",
    oneLiner: "For couples who want skillful erotic communication that strengthens emotional trust.",
    overviewLine: "Practical erotic craft with confidence-building progression for long-term love.",
    icon: Flame,
    iconClass: "text-amber-300",
    teaser: [
      "Turn intention into embodied erotic skill step by step, with relational integrity.",
      "Build confidence without losing tenderness, consent, or emotional attunement.",
      "Premium includes practical progression drills and partner scripts for real-life use.",
    ],
  },
  {
    slug: "victor-gold",
    name: "Victor Gold",
    tier: "premium",
    descriptor: "Refined erotic craftsmanship, devotion, and magnetic relational form for couples.",
    oneLiner: "For couples exploring elegant polarity and deeper erotic architecture together.",
    overviewLine: "Advanced relational erotics with structure, depth, and sacred intentionality.",
    icon: Star,
    iconClass: "text-rose-300",
    teaser: [
      "Explore nuanced erotic form without performative excess or pressure.",
      "Integrate devotion, structure, and sensual intelligence in a grounded way.",
      "Premium includes layered pathways for advanced couples growing sacred love.",
    ],
  },
  {
    slug: "charles-muir",
    name: "Charles Muir",
    tier: "premium",
    descriptor: "Modern sacred intimacy facilitation and practical tantric partner work for couples.",
    oneLiner: "For couples who want usable ritual structure with grounded, modern language.",
    overviewLine: "Applied Neo-Tantra sequencing that turns insight into embodied closeness.",
    icon: Waves,
    iconClass: "text-cyan-300",
    teaser: [
      "Learn modernized tantric partner rituals built for real relationship life.",
      "Bridge sensual exploration, communication, and emotional safety in one coherent arc.",
      "Premium includes modular ritual scripts and progression tracks for couples growing together.",
    ],
  },
  {
    slug: "sally-kempton",
    name: "Sally Kempton",
    tier: "premium",
    descriptor: "Kashmir Shaivism-inspired contemplative practice for intimate recognition and presence.",
    oneLiner: "For couples drawn to heart-depth, non-dual intimacy, and subtle consciousness work.",
    overviewLine: "Kashmir Shaivism depth translated for modern couples seeking sacred love.",
    icon: SunMoon,
    iconClass: "text-violet-300",
    teaser: [
      "Work with recognition-based practice rather than performance-heavy spirituality.",
      "Unify meditation, tenderness, and intimate presence through non-dual awareness.",
      "Premium includes guided contemplations, partner prompts, and integration rituals for daily life.",
    ],
  },
];

const authorUpgradeCopy: Record<
  string,
  {
    headline: string;
    benefit: string;
    bullets: string[];
    cta: string;
  }
> = {
  deida: {
    headline: "Bring devotion and polarity back into your real week.",
    benefit: "Use guided structure to rebuild erotic charge without losing emotional safety.",
    bullets: [
      "Polarity scripts for nights when attraction feels flat but love is still strong.",
      "Truth-and-devotion dialogue flows that prevent shutdown and defensive loops.",
      "Progressive partner practices for sustained chemistry, not one-off intensity.",
    ],
    cta: "Unlock Deida Premium",
  },
  osho: {
    headline: "Turn awareness into practical relationship repair.",
    benefit: "Use guided witnessing and regulation tracks that reduce reactivity and restore emotional contact.",
    bullets: [
      "Meditative co-regulation sequences for stressful evenings and conflict residue.",
      "Body-led dialogue scripts that reduce looping and increase clarity.",
      "Progressive awareness modules for steady sacred intimacy in daily life.",
    ],
    cta: "Unlock Osho Premium",
  },
  "mantak-chia": {
    headline: "Build erotic vitality without burnout.",
    benefit: "Learn Taoist couple alchemy that preserves energy and deepens attraction over time.",
    bullets: [
      "Partner circulation protocols for low-energy and high-stress seasons.",
      "Breath and conservation drills for sustainable sensual longevity.",
      "Progressive modules from first practice to advanced energetic intimacy.",
    ],
    cta: "Unlock Mantak Chia Premium",
  },
  "margot-anand": {
    headline: "Make intimacy feel ecstatic, warm, and intentional.",
    benefit: "Use ceremonial structures that blend joy, devotion, and erotic creativity.",
    bullets: [
      "Guided sacred sensual rituals designed for modern partnership life.",
      "Playful-to-devotional transitions with clear consent and pacing.",
      "Layered journey tracks for lasting emotional and erotic closeness.",
    ],
    cta: "Unlock Margot Anand Premium",
  },
  "daniel-odier": {
    headline: "Choose subtle depth over performative intensity.",
    benefit: "Practice contemplative intimacy that makes silence, touch, and attention profoundly connective.",
    bullets: [
      "Non-dual intimacy sequences for grounded couple meditation.",
      "Gentle partner practices for presence-led erotic refinement.",
      "Integration prompts that carry subtle awareness into daily life.",
    ],
    cta: "Unlock Daniel Odier Premium",
  },
  "michaela-boehm": {
    headline: "Let body intelligence guide your relationship.",
    benefit: "Use somatic tools to recover attraction, co-regulation, and honest emotional contact.",
    bullets: [
      "Nervous-system-informed partner drills for stress and shutdown patterns.",
      "Embodied communication scripts for hard moments that need precision.",
      "Progression maps for stable chemistry and long-term relational resilience.",
    ],
    cta: "Unlock Michaela Boehm Premium",
  },
  "barry-long": {
    headline: "Replace drama loops with grounded relational truth.",
    benefit: "Apply disciplined clarity practices that increase respect, sobriety, and warmth.",
    bullets: [
      "Direct-honesty frameworks for difficult but loving conversations.",
      "Presence-first rituals for emotional integrity in daily partnership.",
      "Repair structures that prevent resentment from accumulating quietly.",
    ],
    cta: "Unlock Barry Long Premium",
  },
  "jan-day": {
    headline: "Rebuild trust in touch, vulnerability, and expression.",
    benefit: "Use body-led repair practices that move couples from guarded to open.",
    bullets: [
      "Guided safety rituals for touch confidence and emotional honesty.",
      "Trauma-sensitive communication flows for rupture recovery.",
      "Integration sequences that turn breakthrough moments into new habits.",
    ],
    cta: "Unlock Jan Day Premium",
  },
  "max-bush": {
    headline: "Grow erotic skill without losing tenderness.",
    benefit: "Train practical sensual communication that strengthens both confidence and trust.",
    bullets: [
      "Stepwise erotic craft modules for long-term couples.",
      "Partner scripts that blend directness, care, and consent.",
      "Practice progressions that keep chemistry alive beyond date night.",
    ],
    cta: "Unlock Max Bush Premium",
  },
  "victor-gold": {
    headline: "Refine polarity and sensual form with depth.",
    benefit: "Access advanced relational erotic architecture grounded in devotion and precision.",
    bullets: [
      "Layered practices for leading, receiving, and magnetic contrast.",
      "High-integrity erotic communication frameworks for committed couples.",
      "Advanced progression maps for sustained sacred sensual growth.",
    ],
    cta: "Unlock Victor Gold Premium",
  },
  "charles-muir": {
    headline: "Bring Neo-Tantra into real relationship life.",
    benefit: "Use modular partner rituals that integrate intimacy, communication, and emotional safety.",
    bullets: [
      "Guided ritual scripts adapted for modern schedules and stress.",
      "Progressive couple sequences for embodied connection and trust.",
      "Cross-library integration with Paths and Reconnect for continuity.",
    ],
    cta: "Unlock Charles Muir Premium",
  },
  "sally-kempton": {
    headline: "Let contemplative recognition deepen your bond.",
    benefit: "Practice heart-led non-dual intimacy in forms modern couples can actually sustain.",
    bullets: [
      "Kashmir Shaivism-inspired partner contemplations for daily closeness.",
      "Guided awareness rituals that join tenderness and depth.",
      "Integration prompts for carrying sacred presence into ordinary life.",
    ],
    cta: "Unlock Sally Kempton Premium",
  },
};

const shellCardClass =
  "rounded-[28px] border border-border/30 bg-card/45 p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.46)]";

const authorsUiCopy: Record<Language, Record<string, string>> = {
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
    relatedAuthors: "Related Authors",
    heroEyebrow: "Sacred Library · Authors",
    heroTitle: "Ancient voices for modern couples in real relationship life",
    heroDesc:
      "Read for one minute and feel closer tonight, or study deeply when you have time. Every page is designed to turn timeless wisdom into practical closeness with your partner.",
    sacredPages: "Sacred pages",
    overviewEyebrow: "Authors Overview",
    overviewTitle: "Choose an author for immediate closeness and deeper shared growth",
    practicePreview: "Practice preview",
    practicePreviewFallback: "Guided author exercise",
    premiumPreview: "Premium preview",
    premiumPreviewFallback: "Expanded guided author journey",
    openAuthors: "Open-access Authors",
    openAuthorsBodySuffix:
      "are fully open so couples can apply ancient wisdom immediately and feel closer today.",
    lockedAuthors: "Locked Authors",
    lockedAuthorsBody:
      "locked voices for couples who want more inspiration, deeper wisdom, and a guided path toward sacred love.",
    unlockCoupleAuthorJourney: "Unlock this couple author journey",
    premiumActive: "Premium Active",
    locked: "Locked",
    guidedJourneys: "Guided Journeys",
    practiceScripts: "Practice Scripts",
    sacredLovePaths: "Sacred Love Paths",
    viewPlansAndTrial: "View plans and trial",
    premiumValue: "8. Premium Value",
    whatThisAuthorIsAbout: "What This Author Is About",
    whoThisIsFor: "Who This Is For",
    concretePracticePreview: "Concrete Practice Preview",
    whyThisAuthorMatters: "Why This Author Matters",
    coreTeachings: "Core Teachings",
    teaching: "Teaching",
    whatModernCouplesCanUseToday: "What Modern Couples Can Use Today",
    beginnerAndAdvancedPath: "Beginner And Advanced Path",
    beginner: "Beginner",
    advanced: "Advanced",
    shadowMisuseAvoid: "Shadow / Misuse / What To Avoid",
    practicalExercises: "Practical Exercises",
    practice: "Practice",
    integration: "Integration",
    reflectionPrompts: "Reflection Prompts",
    premiumAuthor: "Premium Author",
    lockedAuthor: "Locked Author",
    whatThisAuthorOffers: "What This Author Offers",
    unlockThisAuthorJourney: "Unlock this author journey",
    whyItMattersForCouples: "Why It Matters For Couples",
    premiumWhoCard1Title: "Couples craving deeper guidance",
    premiumWhoCard1Body: "Go beyond short quotes into structured couple implementation.",
    premiumWhoCard2Title: "Couples navigating recurring tension",
    premiumWhoCard2Body: "Use premium scripts and frameworks to break repetitive emotional loops.",
    premiumWhoCard3Title: "Couples rebuilding sensual confidence",
    premiumWhoCard3Body: "Pair emotional depth with embodied practice so attraction can return safely.",
    premiumWhoCard4Title: "Couples seeking long-term sacred growth",
    premiumWhoCard4Body: "Follow progression maps that connect Authors, Paths, and Reconnect tools.",
    premiumPracticeTitle: "Premium author integration sequence",
    premiumPracticeBody:
      "A guided sequence that translates one teaching into breath, dialogue, touch, and integration in the same session.",
    premiumPracticeStep1: "Choose one teaching and one relational pain-point to work on tonight.",
    premiumPracticeStep2: "Run a timed dialogue plus body-regulation sequence from the premium module.",
    premiumPracticeStep3: "Close with one integration commitment and one next-step recommendation.",
    premiumWhy1: "Translate philosophy into practical relational behavior that works in real life.",
    premiumWhy2: "Upgrade communication, touch quality, and emotional clarity in the same framework.",
    premiumWhy3: "Build a consistent couple practice instead of waiting for random moments of closeness.",
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
    relatedAuthors: "Auteurs liés",
    heroEyebrow: "Bibliothèque sacrée · Auteurs",
    heroTitle: "Des voix anciennes pour les couples modernes dans la vraie vie relationnelle",
    heroDesc:
      "Lisez une minute et sentez-vous plus proches ce soir, ou étudiez en profondeur quand vous avez du temps. Chaque page transforme une sagesse intemporelle en proximité concrète avec votre partenaire.",
    sacredPages: "Pages sacrées",
    overviewEyebrow: "Vue d'ensemble des auteurs",
    overviewTitle: "Choisissez un auteur pour une proximité immédiate et une croissance partagée plus profonde",
    practicePreview: "Aperçu de pratique",
    practicePreviewFallback: "Exercice auteur guidé",
    premiumPreview: "Aperçu premium",
    premiumPreviewFallback: "Parcours auteur guidé étendu",
    openAuthors: "Auteurs en accès libre",
    openAuthorsBodySuffix:
      "sont totalement ouverts pour appliquer immédiatement la sagesse ancienne et se sentir plus proches aujourd'hui.",
    lockedAuthors: "Auteurs verrouillés",
    lockedAuthorsBody:
      "voix verrouillées pour les couples qui veulent plus d'inspiration, une sagesse plus profonde et un chemin guidé vers l'amour sacré.",
    unlockCoupleAuthorJourney: "Déverrouiller ce parcours auteur de couple",
    premiumActive: "Premium actif",
    locked: "Verrouillé",
    guidedJourneys: "Parcours guidés",
    practiceScripts: "Scripts de pratique",
    sacredLovePaths: "Chemins d'amour sacré",
    viewPlansAndTrial: "Voir les plans et l'essai",
    premiumValue: "8. Valeur Premium",
    whatThisAuthorIsAbout: "De quoi parle cet auteur",
    whoThisIsFor: "Pour qui c'est",
    concretePracticePreview: "Aperçu d'une pratique concrète",
    whyThisAuthorMatters: "Pourquoi cet auteur compte",
    coreTeachings: "Enseignements centraux",
    teaching: "Enseignement",
    whatModernCouplesCanUseToday: "Ce que les couples modernes peuvent utiliser aujourd'hui",
    beginnerAndAdvancedPath: "Parcours débutant et avancé",
    beginner: "Débutant",
    advanced: "Avancé",
    shadowMisuseAvoid: "Ombre / mauvais usage / à éviter",
    practicalExercises: "Exercices pratiques",
    practice: "Pratique",
    integration: "Intégration",
    reflectionPrompts: "Questions de réflexion",
    premiumAuthor: "Auteur premium",
    lockedAuthor: "Auteur verrouillé",
    whatThisAuthorOffers: "Ce que cet auteur apporte",
    unlockThisAuthorJourney: "Déverrouiller cet auteur",
    whyItMattersForCouples: "Pourquoi c'est important pour les couples",
    premiumWhoCard1Title: "Couples en quête de guidance plus profonde",
    premiumWhoCard1Body: "Allez au-delà des citations courtes vers une implémentation structurée en couple.",
    premiumWhoCard2Title: "Couples qui traversent des tensions récurrentes",
    premiumWhoCard2Body: "Utilisez des scripts premium et des cadres pour casser les boucles émotionnelles répétitives.",
    premiumWhoCard3Title: "Couples qui reconstruisent leur confiance sensuelle",
    premiumWhoCard3Body: "Associez profondeur émotionnelle et pratique incarnée pour ramener l'attraction en sécurité.",
    premiumWhoCard4Title: "Couples cherchant une croissance sacrée à long terme",
    premiumWhoCard4Body: "Suivez des cartes de progression qui relient Auteurs, Parcours et outils Reconnect.",
    premiumPracticeTitle: "Séquence d'intégration premium auteur",
    premiumPracticeBody:
      "Une séquence guidée qui traduit un enseignement en souffle, dialogue, toucher et intégration dans la même session.",
    premiumPracticeStep1: "Choisissez un enseignement et un point de douleur relationnel à travailler ce soir.",
    premiumPracticeStep2: "Lancez un dialogue chronométré plus une séquence de régulation corporelle du module premium.",
    premiumPracticeStep3: "Terminez avec un engagement d'intégration et une recommandation pour l'étape suivante.",
    premiumWhy1: "Traduisez la philosophie en comportement relationnel concret qui fonctionne dans la vraie vie.",
    premiumWhy2: "Améliorez communication, qualité du toucher et clarté émotionnelle dans le même cadre.",
    premiumWhy3: "Construisez une pratique de couple régulière au lieu d'attendre des moments de proximité aléatoires.",
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
    relatedAuthors: "Související autoři",
    heroEyebrow: "Posvátná knihovna · Autoři",
    heroTitle: "Starověké hlasy pro moderní páry v reálném vztahovém životě",
    heroDesc:
      "Čti jednu minutu a už dnes večer se cítíte blíž, nebo studujte do hloubky, když máte čas. Každá stránka převádí nadčasovou moudrost do praktické blízkosti s partnerem.",
    sacredPages: "Posvátné stránky",
    overviewEyebrow: "Přehled autorů",
    overviewTitle: "Vyber autora pro okamžitou blízkost a hlubší společný růst",
    practicePreview: "Náhled praxe",
    practicePreviewFallback: "Vedené autorské cvičení",
    premiumPreview: "Náhled premium",
    premiumPreviewFallback: "Rozšířená vedená autorská cesta",
    openAuthors: "Volně dostupní autoři",
    openAuthorsBodySuffix:
      "jsou plně otevření, aby páry mohly starověkou moudrost použít hned a cítit se dnes blíž.",
    lockedAuthors: "Uzamčení autoři",
    lockedAuthorsBody:
      "uzamčené hlasy pro páry, které chtějí více inspirace, hlubší moudrost a vedenou cestu k posvátné lásce.",
    unlockCoupleAuthorJourney: "Odemknout tuto párovou autorskou cestu",
    premiumActive: "Premium aktivní",
    locked: "Uzamčeno",
    guidedJourneys: "Vedené cesty",
    practiceScripts: "Skripty praxe",
    sacredLovePaths: "Cesty posvátné lásky",
    viewPlansAndTrial: "Zobrazit plány a zkušební verzi",
    premiumValue: "8. Premium hodnota",
    whatThisAuthorIsAbout: "O čem tento autor je",
    whoThisIsFor: "Pro koho je to určeno",
    concretePracticePreview: "Ukázka konkrétní praxe",
    whyThisAuthorMatters: "Proč je tento autor důležitý",
    coreTeachings: "Hlavní učení",
    teaching: "Učení",
    whatModernCouplesCanUseToday: "Co mohou moderní páry použít už dnes",
    beginnerAndAdvancedPath: "Začátečnická a pokročilá cesta",
    beginner: "Začátečník",
    advanced: "Pokročilý",
    shadowMisuseAvoid: "Stín / zneužití / čemu se vyhnout",
    practicalExercises: "Praktická cvičení",
    practice: "Praxe",
    integration: "Integrace",
    reflectionPrompts: "Otázky k zamyšlení",
    premiumAuthor: "Premium autor",
    lockedAuthor: "Uzamčený autor",
    whatThisAuthorOffers: "Co tento autor nabízí",
    unlockThisAuthorJourney: "Odemknout tuto autorskou cestu",
    whyItMattersForCouples: "Proč je to důležité pro páry",
    premiumWhoCard1Title: "Páry toužící po hlubším vedení",
    premiumWhoCard1Body: "Jděte za krátké citáty k strukturované párové implementaci.",
    premiumWhoCard2Title: "Páry řešící opakované napětí",
    premiumWhoCard2Body: "Použijte premium skripty a rámce k přerušení opakujících se emočních smyček.",
    premiumWhoCard3Title: "Páry obnovující smyslnou sebedůvěru",
    premiumWhoCard3Body: "Spojte emoční hloubku s vtělenou praxí, aby se přitažlivost mohla bezpečně vrátit.",
    premiumWhoCard4Title: "Páry hledající dlouhodobý posvátný růst",
    premiumWhoCard4Body: "Sledujte mapy progrese, které propojují Autory, Cesty a nástroje Reconnect.",
    premiumPracticeTitle: "Premium integrační sekvence autora",
    premiumPracticeBody:
      "Vedená sekvence, která převádí jedno učení do dechu, dialogu, doteku a integrace v rámci jednoho sezení.",
    premiumPracticeStep1: "Vyberte jedno učení a jeden vztahový bolestivý bod, na kterém dnes večer pracovat.",
    premiumPracticeStep2: "Spusťte časovaný dialog plus sekvenci regulace těla z premium modulu.",
    premiumPracticeStep3: "Ukončete jedním integračním závazkem a jedním doporučením dalšího kroku.",
    premiumWhy1: "Převeďte filozofii do praktického vztahového chování, které funguje v reálném životě.",
    premiumWhy2: "Vylepšete komunikaci, kvalitu doteku a emoční jasnost v jednom rámci.",
    premiumWhy3: "Vybudujte konzistentní párovou praxi místo čekání na náhodné chvíle blízkosti.",
  },
};

const badgeByTier: Record<Tier, string> = {
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
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${badgeByTier[tier]}`}>
    {locked ? <Lock className="h-3.5 w-3.5" aria-label="Locked" /> : <LockOpen className="h-3.5 w-3.5" aria-label="Open access" />}
  </span>
  );
};

const AuthorHeroCard = ({ author }: { author: Author }) => {
  const { lang } = useLanguage();
  const ui = authorsUiCopy[lang];
  const Icon = author.icon;
  const hasPremiumAccess = usePremiumAccess();
  const isLocked = author.tier === "premium" && !hasPremiumAccess;

  return (
    <section className={shellCardClass}>
      <div className="flex items-start justify-between gap-3">
        <div className={`inline-flex rounded-2xl border border-border/30 bg-background/55 p-3 ${author.iconClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <TierBadge tier={author.tier} />
      </div>

      <h2 className="mt-4 font-display text-3xl text-foreground">{author.name}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{author.descriptor}</p>
      <p className="mt-3 text-sm leading-6 text-foreground/90">{author.oneLiner}</p>

      {isLocked ? (
        <Link
          to="/pricing"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/18"
        >
          <Lock className="h-4 w-4" />
          {ui.unlockCoupleAuthorJourney}
        </Link>
      ) : null}
    </section>
  );
};

const PremiumMiniCard = ({ author }: { author: Author }) => {
  const { lang } = useLanguage();
  const ui = authorsUiCopy[lang];
  const hasPremiumAccess = usePremiumAccess();
  const upgradeCopy = authorUpgradeCopy[author.slug] ?? {
    benefit: "Turn insight into guided couple practice with structure that lasts.",
  };
  const miniLine = author.tier === "free"
    ? author.content?.premiumBanner ?? upgradeCopy.benefit
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
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{ui.guidedJourneys}</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{ui.practiceScripts}</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{ui.sacredLovePaths}</span>
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

const AuthorPremiumBlock = ({ author }: { author: Author }) => {
  const { lang } = useLanguage();
  const ui = authorsUiCopy[lang];
  const hasPremiumAccess = usePremiumAccess();
  const upgradeCopy = authorUpgradeCopy[author.slug] ?? {
    headline: `Go deeper with ${author.name}`,
    benefit: "Turn insight into guided couple practice with structure that lasts.",
    bullets: [
      "Expanded modules translated into direct relational application.",
      "Step-by-step partner exercises for communication, sensuality, and integration.",
      "Cross-library progression linking authors, paths, and reconnect flows.",
    ],
    cta: "Unlock Author Premium",
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

const FreeAuthorContent = ({ author }: { author: Author }) => {
  const { lang } = useLanguage();
  const ui = authorsUiCopy[lang];
  if (!author.content) return null;

  const data = author.content;

  return (
    <main className="space-y-5">
      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{ui.whatThisAuthorIsAbout}</p>
        <h3 className="mt-2 font-display text-3xl text-foreground">{author.name}</h3>
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

      {data.whoItsFor?.length ? (
        <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.whoThisIsFor}</p>
          <div className="mt-4 space-y-3">
            {data.whoItsFor.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
                <h4 className="font-body text-sm text-foreground">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {data.practicePreview ? (
        <section className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{ui.concretePracticePreview}</p>
          <h4 className="mt-2 font-display text-2xl text-foreground">{data.practicePreview.title}</h4>
          <p className="mt-2 text-sm leading-7 text-foreground/90">{data.practicePreview.body}</p>
          <div className="mt-3 space-y-2">
            {data.practicePreview.steps.map((step) => (
              <div key={step} className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.whyThisAuthorMatters}</p>
        <div className="mt-4 space-y-3">
          {data.whyMatters.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground/90">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.coreTeachings}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {data.coreTeachings.map((teaching, index) => (
            <article key={teaching.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-primary/80">{ui.teaching} {index + 1}</p>
              <h4 className="mt-2 font-body text-sm text-foreground">{teaching.title}</h4>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{teaching.body}</p>
              {teaching.beginnerReframe ? <p className="mt-2 text-sm leading-6 text-emerald-200/90">{teaching.beginnerReframe}</p> : null}
              {teaching.advancedReframe ? <p className="mt-1 text-sm leading-6 text-amber-200/90">{teaching.advancedReframe}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{ui.whatModernCouplesCanUseToday}</p>
        <div className="mt-4 space-y-3">
          {data.modernUse.map((item) => (
            <article key={item.title} className="rounded-2xl border border-primary/20 bg-background/50 p-4">
              <h4 className="font-body text-sm text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {data.beginnerTrack || data.advancedTrack ? (
        <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.beginnerAndAdvancedPath}</p>
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

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.shadowMisuseAvoid}</p>
        <div className="mt-4 space-y-3">
          {data.shadowToAvoid.map((item) => (
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
              <div className="text-[11px] uppercase tracking-[0.14em] text-primary/80">{ui.practice} {index + 1}</div>
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

      <AuthorPremiumBlock author={author} />
    </main>
  );
};

const PremiumAuthorContent = ({ author }: { author: Author }) => {
  const { lang } = useLanguage();
  const ui = authorsUiCopy[lang];
  const hasPremiumAccess = usePremiumAccess();

  return (
  <main className="space-y-5">
    <section className="rounded-[28px] border border-amber-400/20 bg-gradient-to-br from-amber-500/12 via-background to-background p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.5)]">
      <div className="flex flex-wrap items-center gap-2">
        <TierBadge tier="premium" />
        <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-amber-200">
          {hasPremiumAccess ? ui.premiumAuthor : ui.lockedAuthor}
        </span>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-primary/80">{ui.whatThisAuthorOffers}</p>
      <h3 className="mt-2 font-display text-3xl text-foreground">{author.name}</h3>
      <p className="mt-3 text-sm leading-7 text-foreground/90">{author.descriptor}</p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{author.oneLiner}</p>
      <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
        {author.teaser?.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {hasPremiumAccess ? null : (
        <Link
          to="/pricing"
          className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/18"
        >
          <Lock className="h-4 w-4" />
          {ui.unlockThisAuthorJourney}
        </Link>
      )}
    </section>

    <section className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{ui.whyItMattersForCouples}</p>
      <div className="mt-4 space-y-2">
        <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
          <span>{ui.premiumWhy1}</span>
        </div>
        <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
          <span>{ui.premiumWhy2}</span>
        </div>
        <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
          <span>{ui.premiumWhy3}</span>
        </div>
      </div>
    </section>

    <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.whoThisIsFor}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">{ui.premiumWhoCard1Title}</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{ui.premiumWhoCard1Body}</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">{ui.premiumWhoCard2Title}</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{ui.premiumWhoCard2Body}</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">{ui.premiumWhoCard3Title}</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{ui.premiumWhoCard3Body}</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">{ui.premiumWhoCard4Title}</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{ui.premiumWhoCard4Body}</p>
        </article>
      </div>
    </section>

    <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.concretePracticePreview}</p>
      <h4 className="mt-2 font-display text-2xl text-foreground">{ui.premiumPracticeTitle}</h4>
      <p className="mt-2 text-sm leading-7 text-foreground/90">
        {ui.premiumPracticeBody}
      </p>
      <div className="mt-3 space-y-2">
        <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
          <span>{ui.premiumPracticeStep1}</span>
        </div>
        <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
          <span>{ui.premiumPracticeStep2}</span>
        </div>
        <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
          <span>{ui.premiumPracticeStep3}</span>
        </div>
      </div>
    </section>

    <AuthorPremiumBlock author={author} />
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
  const ui = authorsUiCopy[lang];
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

const RelatedAuthorCarousel = ({
  items,
  onSelect,
}: {
  items: Author[];
  onSelect: (slug: string) => void;
}) => {
  const { lang } = useLanguage();
  const ui = authorsUiCopy[lang];

  return (
  <section className="rounded-[24px] border border-border/30 bg-card/40 p-4">
    <p className="text-xs uppercase tracking-[0.18em] text-primary/80">{ui.relatedAuthors}</p>
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
            <h4 className="mt-2 font-display text-xl text-foreground">{item.name}</h4>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.oneLiner}</p>
          </button>
        );
      })}
    </div>
  </section>
  );
};

const Authors = () => {
  const { lang } = useLanguage();
  const ui = authorsUiCopy[lang];
  const authorJoinWord = lang === "fr" ? " et " : lang === "cs" ? " a " : " and ";
  const isMobile = useIsMobile();
  const [selectedSlug, setSelectedSlug] = useState("deida");
  const [mobileDetailMode, setMobileDetailMode] = useState(false);
  const selected = useMemo(() => authors.find((author) => author.slug === selectedSlug) ?? authors[0], [selectedSlug]);

  const freeAuthors = authors.filter((author) => author.tier === "free");
  const premiumAuthors = authors.filter((author) => author.tier === "premium");
  const relatedAuthors = authors.filter((author) => author.slug !== selectedSlug).slice(0, 6);
  const showBrowse = !isMobile || !mobileDetailMode;
  const showDetail = !isMobile || mobileDetailMode;

  useSeoMetadata({
    title: `Authors Library - ${selected.name}`,
    description: selected.overviewLine,
    path: "/app/authors",
    surface: "app",
    noIndex: true,
  });

  useEffect(() => {
    if (!isMobile && mobileDetailMode) {
      setMobileDetailMode(false);
    }
  }, [isMobile, mobileDetailMode]);

  const handleSelectAuthor = (slug: string) => {
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
              const active = page.to === "/app/authors";
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
          {authors.map((author) => {
            const Icon = author.icon;
            const isSelected = selectedSlug === author.slug;
            return (
              <button
                key={author.slug}
                type="button"
                onClick={() => handleSelectAuthor(author.slug)}
                className={`rounded-[24px] border p-4 text-left transition-all ${
                  isSelected
                    ? "border-primary/30 bg-primary/10 shadow-[0_16px_50px_-40px_rgba(255,173,70,0.45)]"
                    : "border-border/30 bg-background/45 hover:border-primary/20 hover:bg-card/55"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${author.iconClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <TierBadge tier={author.tier} />
                </div>
                <h3 className="mt-3 font-display text-2xl text-foreground">{author.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{author.descriptor}</p>
                <p className="mt-2 text-xs leading-5 text-foreground/80">
                  {author.tier === "free"
                    ? `${ui.practicePreview}: ${author.content?.exercises[0]?.title ?? ui.practicePreviewFallback}`
                    : `${ui.premiumPreview}: ${author.teaser?.[0] ?? ui.premiumPreviewFallback}`}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">{ui.openAuthors}</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{freeAuthors.map((author) => author.name).join(authorJoinWord)} {ui.openAuthorsBodySuffix}</p>
          </div>
          <div className="rounded-2xl border border-amber-400/25 bg-amber-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-amber-200">{ui.lockedAuthors}</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{premiumAuthors.length} {ui.lockedAuthorsBody}</p>
          </div>
        </div>
      </section>
      ) : null}

      {showDetail ? (
      <section className={`${isMobile ? "space-y-4" : "grid items-start gap-6 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]"}`}>
        {isMobile ? <MobileDetailHeader title={selected.name} tier={selected.tier} onBack={() => setMobileDetailMode(false)} /> : null}

        <aside className="space-y-4 lg:sticky lg:top-24">
          <AuthorHeroCard author={selected} />
          <PremiumMiniCard author={selected} />
        </aside>

        <div className="space-y-4">
          {selected.tier === "free" ? <FreeAuthorContent author={selected} /> : <PremiumAuthorContent author={selected} />}
          {isMobile ? <RelatedAuthorCarousel items={relatedAuthors} onSelect={handleSelectAuthor} /> : null}
        </div>
      </section>
      ) : null}
    </div>
  );
};

export default Authors;
