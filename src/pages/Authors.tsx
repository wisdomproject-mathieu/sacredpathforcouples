import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import {
  ArrowRight,
  Compass,
  Feather,
  Flame,
  Heart,
  Lock,
  Sparkles,
  Star,
  SunMoon,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useSeoMetadata } from "@/lib/seo";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { AUTHOR_LONGFORM_BY_SLUG } from "@/lib/libraryLongform";
import {
  dianaRichardsonContent,
  danielOdierContent,
  michaelaBoehmContent,
  barryLongContent,
  janDayContent,
  charlesMuirContent,
  sallyKemptonContent,
  maxBushContent,
  victorGoldContent,
} from "@/lib/authorsRichContent";
import LibraryDetailBody from "@/components/library/LibraryDetailBody";
import LibraryDetailSplitLayout from "@/components/library/LibraryDetailSplitLayout";

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
  tradition?: string;
  oneLiner: string;
  overviewLine: string;
  icon: LucideIcon;
  iconClass: string;
  teaser?: string[];
  content?: FreeAuthorContent;
};

type AuthorLocalizationOverrides = Partial<Omit<Author, "content">> & {
  content?: Partial<FreeAuthorContent>;
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
];

const authors: Author[] = [
  {
    slug: "deida",
    name: "David Deida",
    tier: "free",
    descriptor: "Ancient polarity wisdom translated into practical intimacy for modern couples.",
    tradition: "Sacred Masculinity & Conscious Polarity",
    oneLiner: "The edge of love, presence, and polarity",
    overviewLine: "Use now for erotic clarity and devotion, then go deeper as a couple over time.",
    icon: Flame,
    iconClass: "text-amber-300",
    content: {
      heroIntro: [
        "David Deida's work stands at the intersection of spiritual practice and erotic intelligence. Drawing from Zen, Tantra, and decades working directly with couples, Deida maps the invisible currents that flow between masculine and feminine — not as rigid gender roles, but as poles of consciousness and energy that every couple navigates.",
        "His central insight: most modern relationships collapse not from lack of love, but from collapsed polarity. When both partners unconsciously occupy the same energetic territory, desire dims and genuine contact flattens.",
        "Deida's teachings restore the living charge between two people — the specific quality of directed presence in one partner that calls out the radiant openness of the other.",
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
        title: "Directional Breath Frame",
        body: "A partner breathing practice designed to restore polarity through directed presence and energetic distinction. One partner holds space; the other fills it. Eight minutes that reorient a couple's entire nervous system toward each other.",
        steps: [
          "One partner takes the directional role: breathe with clear intention, establishing presence and direction.",
          "The other partner receives — breathing into the space being held, following rather than leading.",
          "Sustain for four minutes with soft eye contact, then switch roles completely.",
          "Close with two minutes of synchronized, equal breath — no direction, pure shared presence.",
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
    tradition: "Tantric Meditation & Sacred Presence",
    oneLiner: "Meditation as the deepest form of love",
    overviewLine: "Awareness-based intimacy tools you can apply now and deepen over time together.",
    icon: SunMoon,
    iconClass: "text-fuchsia-300",
    content: {
      heroIntro: [
        "Osho brought the ancient Tantric texts — particularly the Vigyan Bhairav Tantra, a five-thousand-year-old dialogue between Shiva and Parvati on the one hundred and twelve methods of awakening — into language modern couples can actually inhabit.",
        "His radical reframe: sex is not the enemy of enlightenment, and enlightenment is not the enemy of pleasure. They are the same energy moving in different directions. Osho taught that most couples never truly meet, because they are not present. Two absences cannot create intimacy.",
        "The entire Tantric path, in Osho's rendering, is the journey from mechanical, goal-driven lovemaking toward conscious union — in which every moment of touch becomes an act of meditation, and the beloved becomes the doorway to the absolute.",
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
        title: "Witnessing Breath",
        body: "A Tantric practice of becoming the silent witness within lovemaking — present without grasping, open without performance. The witness does not judge, does not direct, does not want. It simply sees — and in that seeing, love deepens.",
        steps: [
          "Sit or lie together in comfortable proximity, eyes soft or gently closed.",
          "Breathe naturally — do not direct, control, or shape the breath in any way.",
          "Become the silent witness: observe sensation, feeling, and thought without engaging or narrating them.",
          "If presence wavers, return gently to breath. Close with one word each: what you witnessed.",
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
    tradition: "Taoist Sexual Alchemy",
    oneLiner: "Life force as the true currency of love",
    overviewLine: "Ancient Taoist mechanics for modern couples who want lasting erotic energy.",
    icon: Waves,
    iconClass: "text-cyan-300",
    content: {
      heroIntro: [
        "Mantak Chia spent decades translating sealed Taoist sexual classics into practices any couple can learn. His central discovery: the depletion couples feel after lovemaking is not inevitable — it is a choice that can be reversed.",
        "His Universal Tao system teaches couples to redirect sexual energy through the body rather than discharge it, transforming lovemaking from a brief peak into a renewable source of vitality and deepening love.",
      ],
      whoItsFor: [
        {
          title: "Couples who feel depleted after sex",
          body: "The flatness, mild withdrawal, or quiet emotional distance after lovemaking is the body signaling energy loss. Chia's practices stop the leak.",
        },
        {
          title: "Couples who want their intimate life to build health",
          body: "Learn to circulate rather than discharge vital essence — turning each encounter into a net gain rather than a net loss of life force.",
        },
        {
          title: "Couples ready for a practice that deepens over decades",
          body: "Unlike novelty-based approaches, Taoist cultivation builds capacity over time. A couple who practices for ten years has something extraordinary.",
        },
        {
          title: "Partners curious about the body's subtle architecture",
          body: "If you've sensed that there's more happening energetically during intimacy than physical sensation alone, this framework maps that territory precisely.",
        },
      ],
      practicePreview: {
        title: "Synchronized Belly Breath",
        body: "The entry point to all Taoist couples work. Two bodies synchronizing their breath activates the shared energy field before any other practice begins.",
        steps: [
          "Sit facing each other, one hand on your own belly, one hand on your partner's belly.",
          "Breathe slowly and deeply together for two minutes, feeling the rise and fall synchronize.",
          "On each exhale, consciously relax the pelvic floor and lower belly.",
          "On each inhale, draw energy upward from the base of the spine toward the heart.",
          "Close with thirty seconds of held eye contact and one full breath taken together.",
        ],
      },
      beginnerTrack: {
        title: "Beginner Track: Learning to Feel Energy",
        body: "Before circulating energy, couples must learn to feel it. The first weeks are about developing sensitivity — noticing what is already moving.",
        steps: [
          "Practice synchronized belly breath daily for one week before any other technique.",
          "After lovemaking, instead of separating immediately, lie together for ten minutes with hands on each other's hearts.",
          "Begin learning the solo Microcosmic Orbit before attempting it as a couple.",
          "Track energy levels before and after intimacy — this builds the self-knowledge that makes practice meaningful.",
        ],
      },
      advancedTrack: {
        title: "Advanced Track: Shared Microcosmic Orbit",
        body: "Once both partners can feel chi moving independently, the shared orbit becomes available — two bodies creating one continuous circuit.",
        steps: [
          "Both partners establish their individual orbit through breath and intention before physical contact.",
          "In seated embrace, synchronize breath and imagine a single current flowing from your base up your partner's spine and back down through yours.",
          "Practice the Big Draw together — coordinated muscle contractions that move energy upward simultaneously.",
          "Extend sessions gradually: quality of attention matters more than duration.",
        ],
      },
      quote: {
        text: "The goal is not to suppress sexual energy but to transform and recycle it — to use it as fuel for higher consciousness and lasting vitality.",
        source: "Mantak Chia, Healing Love Through the Tao",
      },
      whyMatters: [
        "He is one of the only teachers who approaches sexuality as a health science, not just a spiritual metaphor — the practices have measurable physiological effects.",
        "His work addresses the energy depletion problem directly — something most intimacy traditions ignore entirely.",
        "The multi-orgasmic practices he systematized give couples access to sustained erotic states rather than brief peaks followed by withdrawal.",
        "His emphasis on both partners' cultivation creates genuine energetic reciprocity — nobody is being drained to satisfy the other.",
      ],
      coreTeachings: [
        {
          title: "Jīng is currency, not waste",
          body: "Sexual energy is the body's most refined vital essence. Spending it carelessly is the energetic equivalent of spending savings without earning. Cultivation means managing this resource consciously.",
          beginnerReframe: "After sex, notice how you feel. Track whether you feel more or less alive than before. This awareness is the beginning of the practice.",
          advancedReframe: "Use the Big Draw to redirect orgasmic energy upward before discharge. Practice extending the plateau phase before any peak.",
        },
        {
          title: "The valley is deeper than the peak",
          body: "Peak orgasm is the most familiar but least sustainable form of erotic pleasure. Valley orgasm — waves of full-body aliveness without the discharge arc — is available through relaxation and conscious redirection.",
          beginnerReframe: "Slow down ten minutes before orgasm. Let sensation spread through the whole body rather than concentrate toward release.",
          advancedReframe: "Practice sustaining the pre-orgasmic state for twenty to thirty minutes. Let the energy circulate rather than crest.",
        },
        {
          title: "Both partners must cultivate",
          body: "The Taoist system requires both partners to develop their own energy cultivation capacity. This is not a one-sided technique — it is a mutual practice.",
          beginnerReframe: "Each partner learns the solo Microcosmic Orbit first. Bring that capacity into shared practice.",
          advancedReframe: "Practice synchronized Big Draw — both partners drawing energy upward simultaneously, combining the current.",
        },
        {
          title: "Lovemaking heals the organs",
          body: "Each organ system corresponds to specific emotional and energetic qualities. Conscious lovemaking can direct healing energy to areas of depletion or holding in the body.",
          beginnerReframe: "After lovemaking, place both hands on the area of your body that feels most in need of nourishment. Breathe there for two minutes.",
          advancedReframe: "Use the organ-sound healing sequence from Chia's Healing Love to direct energy to specific organ systems during practice.",
        },
      ],
      modernUse: [
        {
          title: "When exhaustion makes intimacy feel impossible",
          body: "The Taoist approach is particularly valuable here: practices that restore rather than deplete energy make intimacy something to look forward to even when tired.",
        },
        {
          title: "When one partner's libido is significantly lower",
          body: "Often this reflects genuine energy depletion rather than lack of desire. Cultivation practices restore the underlying vitality from which desire naturally rises.",
        },
        {
          title: "When couples want a practice that grows with age",
          body: "Unlike approaches dependent on physical intensity, Taoist cultivation deepens as practitioners age — the energy becomes subtler and more refined, not less available.",
        },
      ],
      shadowToAvoid: [
        {
          title: "Technique replacing presence",
          body: "Chia's practices require genuine presence to work. If executing technique becomes the goal, the energetic connection — which is the actual point — evaporates.",
          beginnerReframe: "If a practice feels mechanical, stop the technique and simply breathe together for two minutes. Reconnect before continuing.",
          advancedReframe: "Use technique as a scaffold to enter deeper states of presence, then release the technique and inhabit the state directly.",
        },
        {
          title: "Pressure around non-ejaculation",
          body: "Chia's teachings on conserving ejaculation can become a performance demand that creates anxiety and shame. This defeats the entire purpose.",
          beginnerReframe: "Begin with extending the plateau phase, not eliminating orgasm. Gradual expansion is sustainable; rigid rules are not.",
          advancedReframe: "When the energy is genuinely cultivated rather than suppressed, the body naturally prefers circulation over discharge. Don't force it.",
        },
        {
          title: "Spiritual bypassing through energy work",
          body: "Energy practices can become an escape from emotional truth. If both partners are not genuinely honest with each other, no amount of chi cultivation creates real intimacy.",
          beginnerReframe: "Check in emotionally before any energy practice. Five minutes of honest check-in changes the quality of everything that follows.",
          advancedReframe: "Use the energy sensitivity developed through cultivation to feel your partner's emotional state directly — and respond to what you feel.",
        },
      ],
      exercises: [
        {
          title: "Microcosmic Orbit — Solo Foundation (10 minutes)",
          setup: "Sit quietly alone before attempting this as a couple.",
          steps: [
            "Close eyes and breathe slowly into the lower belly.",
            "On each inhale, imagine energy rising from the base of the spine, up through each vertebra to the crown.",
            "On each exhale, imagine energy flowing down through the forehead, throat, chest, belly, returning to the base.",
            "Complete nine full circuits of this orbit.",
            "Rest for two minutes, feeling the energy settle.",
          ],
          integration: "Practice solo for one week before attempting with a partner.",
          beginnerNote: "Visualization is enough — you do not need to feel physical sensation for the practice to work.",
          advancedNote: "Add the three locks (root, abdominal, throat) to amplify the circulation on the inhale.",
        },
        {
          title: "Synchronized Heart-Genital Circuit (15 minutes)",
          setup: "Sit in yab-yum (one partner in the other's lap, facing each other) or stand in close embrace.",
          steps: [
            "Both partners close eyes and establish individual belly breath.",
            "After two minutes, open eyes and synchronize breath rhythm.",
            "Imagine a figure-eight circuit: energy rising from your pelvis to your partner's heart, and from their pelvis to your heart.",
            "Sustain this visualization through ten complete breath cycles.",
            "Close with foreheads touching and one minute of shared silence.",
          ],
          integration: "Use before lovemaking to pre-activate the shared energy field.",
          beginnerNote: "If visualization is difficult, simply feel the warmth of physical contact and let that be the 'energy.'",
          advancedNote: "Add sound — a sustained hum on each exhale amplifies the circuit significantly.",
        },
      ],
      reflectionPrompts: [
        "Where do I notice energy leaving my body during or after intimacy? Where does it feel like it goes?",
        "What would it feel like if lovemaking left me more energized than before it began?",
        "Do I approach my partner's body as a source of pleasure for me, or as a living system I am in relationship with?",
        "What is the difference between satisfied and genuinely nourished? When did I last feel the second?",
        "What would a ten-year Taoist cultivation practice with my partner look like — and what might we have built by then?",
      ],
      relatedPaths: [
        { name: "Taoist Alchemy", note: "The path built directly around Chia's complete system — energy maps, chi cultivation tracks, and the full Healing Love sequence." },
        { name: "Tantric Wisdom", note: "Parallel subtle-body framework from the Indian tradition — the two systems inform and deepen each other." },
        { name: "Slow Love", note: "Diana Richardson's approach shares Chia's emphasis on non-goal lovemaking and the body's own intelligence." },
      ],
      premiumBanner: "Access Chia's complete Universal Tao couples system: the Microcosmic Orbit as a shared practice, the full Healing Love sequence, valley orgasm training, and the meridian maps that make the invisible architecture of sexual energy visible.",
    },
  },
  {
    slug: "margot-anand",
    name: "Margot Anand",
    tier: "premium",
    descriptor: "Ecstatic Tantra and sacred sensuality translated for modern couple ritual life.",
    tradition: "SkyDancing Tantra",
    oneLiner: "Ecstasy as a path, not a peak",
    overviewLine: "Ceremonial Tantra for partners growing closer through beauty and intention.",
    icon: Sparkles,
    iconClass: "text-rose-300",
    content: {
      heroIntro: [
        "Margot Anand's SkyDancing Tantra refuses the split between the sacred and the erotic — insisting that beauty, ritual, and genuine aliveness are not decorations around intimacy but the very substance of it.",
        "Her four-decade teaching lineage, transmitted to tens of thousands of couples internationally, centers on one discovery: ecstasy is not a peak to chase but a quality of presence to inhabit — and it is available in any moment of genuine sacred contact.",
      ],
      whoItsFor: [
        {
          title: "Couples who want their intimate life to feel ceremonial",
          body: "When lovemaking is approached with the same care and intention as a sacred ritual, its quality transforms entirely. SkyDancing teaches exactly how to create that atmosphere.",
        },
        {
          title: "Couples where playfulness and depth feel mutually exclusive",
          body: "Anand's work dissolves this false choice. In SkyDancing, laughter and reverence coexist — erotic play and genuine spiritual contact are not in tension but expressions of the same energy.",
        },
        {
          title: "Couples ready to work with the chakra system as a living reality",
          body: "Not as a belief system but as a practical map for exploring different dimensions of erotic and spiritual experience together.",
        },
        {
          title: "Couples who want beauty as a spiritual practice",
          body: "SkyDancing treats the creation of beautiful intimate space — lighting, music, scent, intention — as genuine sadhana, not superficial decoration.",
        },
      ],
      practicePreview: {
        title: "Sacred Space Creation",
        body: "Before any touch, both partners spend twenty minutes creating the space and themselves. In SkyDancing, this preparation is not preliminary — it is the practice.",
        steps: [
          "Together, prepare the physical space: soft lighting, meaningful objects, a scent that feels sacred, music that opens rather than distracts.",
          "Separately, bathe or shower mindfully — treating the body as a temple being prepared for ceremony.",
          "Dress in something that makes you feel beautiful, or undress with conscious intention.",
          "Sit facing each other at the threshold of the prepared space. Take three breaths together.",
          "Enter the space as if crossing into sacred territory — because you are.",
        ],
      },
      beginnerTrack: {
        title: "Beginner Track: Learning Sacred Space",
        body: "The most immediate and transformative entry point in SkyDancing is simply learning to create conditions of genuine beauty and reverence before intimacy begins.",
        steps: [
          "Once a week, take thirty minutes to prepare the space before intimacy — not as foreplay, but as ceremony.",
          "Agree on one element of beauty to add each time: a candle, a flower, music that feels sacred.",
          "Begin each encounter with eye contact in the prepared space before any touch.",
          "Notice how the quality of everything that follows differs from encounters that begin without this preparation.",
        ],
      },
      advancedTrack: {
        title: "Advanced Track: Chakra Awakening Sequence",
        body: "Moving through the seven chakras as a couples practice opens distinct dimensions of erotic and spiritual experience that random intimacy cannot reach.",
        steps: [
          "Learn the location and quality of each chakra before attempting to work with them together.",
          "Begin each session by awakening the root — grounding, presence, safety — through breath and conscious touch at the base of the spine.",
          "Move upward through the centers: sacral (pleasure, flow), solar plexus (power, will), heart (love, connection), throat (truth, expression), third eye (vision, intuition), crown (transcendence).",
          "Allow each center its own time — don't rush the ascent. Some sessions may never leave the heart.",
        ],
      },
      quote: {
        text: "When two people meet in genuine sacred space — when beauty has been honored and bodies have been prepared — what happens between them is no longer ordinary. It is a form of prayer.",
        source: "Margot Anand, The Art of Sexual Ecstasy",
      },
      whyMatters: [
        "She bridges the gap between spiritual practice and erotic aliveness more elegantly than any other teacher — making both accessible without diminishing either.",
        "Her emphasis on sacred atmosphere addresses the single most common intimacy failure: coming to lovemaking without any transition from ordinary consciousness.",
        "The SkyDancing chakra work gives couples a practical map for exploring different dimensions of intimacy systematically rather than randomly.",
        "Her integration of play and reverence gives couples permission to be both joyful and sacred — dissolving the false seriousness that burdens many spiritual approaches to sex.",
      ],
      coreTeachings: [
        {
          title: "Preparation is the practice",
          body: "The quality of what happens during intimacy is almost entirely determined by the quality of transition that precedes it. Arriving consciously, in a prepared space, changes everything.",
          beginnerReframe: "Spend fifteen minutes preparing the space before any intimate encounter this week. Notice the difference.",
          advancedReframe: "Extend the preparation into your own inner state — meditate, move, or breathe alone for ten minutes before meeting your partner.",
        },
        {
          title: "Beauty is a spiritual technology",
          body: "Creating beauty — in the space, in the body, in the atmosphere — shifts the nervous system into a receptive, open state. This is not aesthetics; it is applied spirituality.",
          beginnerReframe: "Add one element of genuine beauty to your intimate space. Not because it looks good, but because beauty genuinely shifts your inner state.",
          advancedReframe: "Create a dedicated sacred space in your home — even a single corner — that holds the energy of your practice.",
        },
        {
          title: "Play and reverence are the same energy",
          body: "In SkyDancing, laughter and joy are not interruptions to sacred intimacy but expressions of it. The body's delight and the spirit's reverence arise from the same open, undefended place.",
          beginnerReframe: "If something funny happens during intimacy, let the laughter be complete before returning. Suppressed laughter is suppressed aliveness.",
          advancedReframe: "Deliberately introduce elements of play into your practice — not to make it lighter, but to keep it alive.",
        },
        {
          title: "Ecstasy is ordinary presence fully inhabited",
          body: "The ecstatic states described in Tantric texts are not special altered states requiring years of practice. They are what ordinary presence feels like when performance, protection, and goal-seeking have been set aside.",
          beginnerReframe: "For one minute during intimacy, drop every agenda and simply be completely here. That quality of presence — even for sixty seconds — is what ecstasy is.",
          advancedReframe: "Practice sustaining this quality of presence for increasingly longer periods. Ecstasy is not intensity; it is depth of presence.",
        },
      ],
      modernUse: [
        {
          title: "When intimacy feels mechanical despite genuine love",
          body: "The missing ingredient is almost always atmosphere and intention. SkyDancing's sacred space practices address this directly — adding the ceremonial quality that transforms mechanical into meaningful.",
        },
        {
          title: "When couples want to celebrate their relationship, not just maintain it",
          body: "SkyDancing offers specific rituals for milestones, anniversaries, and conscious renewal — ways of marking the relationship's depth and trajectory with genuine ceremony.",
        },
        {
          title: "When spiritual life and erotic life feel disconnected",
          body: "For couples where one or both partners have active spiritual practices that feel separate from their intimate life, SkyDancing provides the bridge that makes both richer.",
        },
      ],
      shadowToAvoid: [
        {
          title: "Ceremony replacing genuine contact",
          body: "Beautiful ritual can become elaborate avoidance of genuine intimacy. The preparation must serve genuine meeting — not replace it.",
          beginnerReframe: "Check: is the preparation creating genuine openness, or is it becoming another performance? Simplify if it feels theatrical.",
          advancedReframe: "Periodically strip back all ritual and meet simply, with nothing prepared. Notice what the ritual actually provides versus what you assumed it provided.",
        },
        {
          title: "Spiritual intensity as spiritual bypassing",
          body: "Powerful Tantric experiences can be used to avoid the ordinary emotional work a relationship requires. Ecstasy does not substitute for honest communication.",
          beginnerReframe: "After powerful sessions, check in about ordinary relationship truth — not just the transcendent experience.",
          advancedReframe: "Integrate insights from sacred practice into ordinary relationship behavior. Spiritual experience that doesn't change daily life is incomplete.",
        },
      ],
      exercises: [
        {
          title: "The Greeting Ceremony (10 minutes)",
          setup: "Use at the beginning of any dedicated intimate time together.",
          steps: [
            "Stand facing each other at arm's length. Close your eyes and take three slow breaths alone.",
            "Open your eyes and meet your partner's gaze. Take three more breaths together.",
            "Place your right hand on your own heart and bow slightly, silently acknowledging: 'I see you as sacred.'",
            "Step forward into an embrace. Feel the full contact of your bodies.",
            "Rest in the embrace for one minute, not moving, simply arriving.",
          ],
          integration: "Use before any intimate encounter. Takes ten minutes and changes everything that follows.",
          beginnerNote: "If this feels awkward, that awkwardness is the ordinary mind's resistance to genuine ceremony. Let it be awkward and continue.",
          advancedNote: "Add a spoken element: each partner says one true thing they love about the other before the embrace.",
        },
        {
          title: "Chakra Awakening Touch (20 minutes)",
          setup: "One partner lies comfortably. The other moves slowly up the body.",
          steps: [
            "Begin with both hands resting lightly on the feet. Feel the ground quality of the root chakra.",
            "Move slowly to the pelvis and lower belly — the center of pleasure and creative life force.",
            "Continue to the solar plexus — the seat of personal power and embodied confidence.",
            "Rest at the heart for the longest time — hands on the chest, feeling the warmth and aliveness there.",
            "Brief touch at the throat (truth), third eye (vision), crown (openness to the infinite).",
            "Then reverse — descend back to the earth, grounding the energy before completing.",
            "Switch and repeat.",
          ],
          integration: "Use as preparation before lovemaking or as a complete practice in itself.",
          beginnerNote: "This is not massage. Move slowly enough that presence, not technique, is what the receiver feels.",
          advancedNote: "As the giver, tune into each center as you touch it. Feel what is open and what is contracted. Let your touch respond to what you feel.",
        },
      ],
      reflectionPrompts: [
        "What does sacred space mean to me? When have I felt it — in any context — and what created it?",
        "Where in my life do I allow genuine beauty to affect my inner state? Why not in my intimate life?",
        "What would it feel like to approach my partner's body with the same quality of attention I would bring to something genuinely holy?",
        "When was the last time I felt genuinely ecstatic — not intense, but fully alive and open? What were the conditions?",
        "What is the one element of ceremony or beauty that would most change the quality of our intimate life if I introduced it consistently?",
      ],
      relatedPaths: [
        { name: "Tantric Wisdom", note: "The complete Tantric framework that SkyDancing draws from — presence, polarity, breath, and the sacred body." },
        { name: "Conscious Union", note: "The path of ceremony and recognition that shares SkyDancing's emphasis on intentional, beautiful intimate space." },
        { name: "Sacred Polarity", note: "Deida's framework pairs naturally with SkyDancing — polarity creates the charge that SkyDancing's sacred space allows to move freely." },
      ],
      premiumBanner: "Access Anand's complete SkyDancing system: the full chakra awakening sequence as a couples practice, the sacred space creation rituals, the SkyDancing approach to ecstatic states, and the ceremony library for marking relationship milestones.",
    },
  },
  {
    slug: "diana-richardson",
    name: "Diana Richardson",
    tier: "premium",
    descriptor: "Slow Sex pioneer teaching couples to access the body's own erotic intelligence through stillness.",
    tradition: "Slow Sex & Meditative Intimacy",
    oneLiner: "The body knows — when the mind gets out of the way",
    overviewLine: "Stillness-based intimacy for couples ready to trade performance for genuine presence.",
    icon: Heart,
    iconClass: "text-pink-300",
    content: dianaRichardsonContent,
  },
  {
    slug: "daniel-odier",
    name: "Daniel Odier",
    tier: "premium",
    descriptor: "Non-dual Tantra and subtle attention for couples seeking contemplative erotic depth.",
    tradition: "Non-Dual Kashmir Shaivism Tantra",
    oneLiner: "Desire itself as the doorway to the absolute",
    overviewLine: "Contemplative intimacy for partners who value depth over performance pressure.",
    icon: Star,
    iconClass: "text-violet-300",
    content: danielOdierContent,
  },
  {
    slug: "michaela-boehm",
    name: "Michaela Boehm",
    tier: "premium",
    descriptor: "Embodiment and relational nervous-system literacy for modern couple intimacy.",
    tradition: "Somatic Tantra & Nervous System Intimacy",
    oneLiner: "The wild somatic intelligence of love",
    overviewLine: "Somatic relational skills for attraction, regulation, and honest connection.",
    icon: Heart,
    iconClass: "text-orange-300",
    content: michaelaBoehmContent,
  },
  {
    slug: "barry-long",
    name: "Barry Long",
    tier: "premium",
    descriptor: "Relational truth, simplicity, and disciplined conscious love for committed partners.",
    tradition: "Sacred Love & Conscious Union",
    oneLiner: "Lovemaking as the most direct return to God",
    overviewLine: "Presence-led relational integrity for modern couples seeking grounded sacred love.",
    icon: Feather,
    iconClass: "text-emerald-300",
    content: barryLongContent,
  },
  {
    slug: "jan-day",
    name: "Jan Day",
    tier: "premium",
    descriptor: "Body-led intimacy, relational healing, and emotional courage for modern couples.",
    tradition: "Conscious Relating & Tantric Embodiment",
    oneLiner: "Emotional truth as the foundation of erotic depth",
    overviewLine: "Embodied intimacy repair with practical exercises for deeper connection.",
    icon: Compass,
    iconClass: "text-violet-300",
    content: janDayContent,
  },
  {
    slug: "max-bush",
    name: "Max Bush",
    tier: "premium",
    descriptor: "Erotic confidence and practical sensual development for connected modern couples.",
    tradition: "Embodied Masculine Eros",
    oneLiner: "Erotic confidence grounded in relational integrity",
    overviewLine: "Practical erotic craft with confidence-building progression for long-term love.",
    icon: Flame,
    iconClass: "text-amber-300",
    content: maxBushContent,
  },
  {
    slug: "victor-gold",
    name: "Victor Gold",
    tier: "premium",
    descriptor: "Refined erotic craftsmanship, devotion, and magnetic relational form for couples.",
    tradition: "Sacred Erotic Craftsmanship",
    oneLiner: "The refined art of conscious erotic form",
    overviewLine: "Advanced relational erotics with structure, depth, and sacred intentionality.",
    icon: Star,
    iconClass: "text-rose-300",
    content: victorGoldContent,
  },
  {
    slug: "charles-muir",
    name: "Charles Muir",
    tier: "premium",
    descriptor: "Modern sacred intimacy facilitation and practical tantric partner work for couples.",
    tradition: "Heart Tantra & Sacred Healing",
    oneLiner: "Healing the heart through sacred sexual union",
    overviewLine: "Applied Neo-Tantra sequencing that turns insight into embodied closeness.",
    icon: Waves,
    iconClass: "text-cyan-300",
    content: charlesMuirContent,
  },
  {
    slug: "sally-kempton",
    name: "Sally Kempton",
    tier: "premium",
    descriptor: "Kashmir Shaivism-inspired contemplative practice for intimate recognition and presence.",
    tradition: "Kashmir Shaivism & Tantric Meditation",
    oneLiner: "Shakti: the living power that moves through all love",
    overviewLine: "Kashmir Shaivism depth translated for modern couples seeking sacred love.",
    icon: SunMoon,
    iconClass: "text-violet-300",
    content: sallyKemptonContent,
  },
];

const localizedAuthorOverrides: Partial<Record<Exclude<Language, "en">, Record<string, AuthorLocalizationOverrides>>> = {
  fr: {
    deida: {
      descriptor: "Sagesse de polarité traduite en intimité concrète pour les couples modernes.",
      oneLiner: "Aide les couples à raviver la charge quand l'amour est stable mais le désir s'est aplati.",
      overviewLine: "À utiliser dès ce soir pour retrouver clarté érotique, vérité et dévotion incarnée.",
      content: {
        heroIntro: [
          "Deida est particulièrement utile quand le couple reste loyal et tendre, mais que la vie érotique a perdu sa vivacité.",
          "L'approche la plus saine n'est pas le stéréotype, mais la présence dirigée, la vérité relationnelle et le consentement clair.",
          "Traduit en pratique: courts rituels de vérité, alternance lead/receive, puis intégration concrète dans la semaine.",
        ],
        whoItsFor: [
          { title: "Couples proches émotionnellement mais plats érotiquement", body: "Réintroduire tension vivante sans perdre la tendresse." },
          { title: "Couples en boucle mentale", body: "Passer du débat infini au corps régulé et directionnel." },
          { title: "Couples avec ressentiment discret", body: "Nettoyer l'évitement qui éteint l'attraction." },
          { title: "Couples prêts à une croissance dévotionnelle", body: "Pratiquer présence, contraste et engagement réel." },
        ],
        practicePreview: {
          title: "Check-in de polarité Deida",
          body: "Séquence courte avant intimité pour reconnecter désir et intégrité.",
          steps: [
            "Nommer une vérité relationnelle évitée cette semaine.",
            "Nommer une action dévotionnelle pour ce soir.",
            "Faire 2 minutes de souffle lead/receive, puis inversion.",
            "Conclure avec plus/pareil/plus lent/pause selon le consentement.",
          ],
        },
        beginnerTrack: {
          title: "Parcours débutant: remettre du mouvement sans surcharge",
          body: "Sessions courtes, claires, répétées. La sécurité émotionnelle reste la base.",
          steps: [
            "Un check-in de 8 minutes, trois fois par semaine.",
            "Intensité sous 6/10, priorité à la clarté.",
            "Une phrase de vérité + une phrase de dévotion par tour.",
            "Finir avec une action concrète pour les 24h suivantes.",
          ],
        },
        advancedTrack: {
          title: "Parcours avancé: polarité, vérité, dévotion",
          body: "Quand la base est stable, approfondir la charge sans perdre consentement et chaleur.",
          steps: [
            "2 minutes dirigées + 1 minute de réceptivité, 4 cycles.",
            "Check-ins système nerveux à chaque cycle.",
            "Parler vrai avec écoute non défensive.",
            "Debrief: ce qui augmente l'attraction et ce qui réduit la confiance.",
          ],
        },
        quote: {
          text: "L'attraction revient souvent quand les partenaires cessent de se gérer et se rencontrent avec une présence aimante et orientée.",
          source: "Synthèse éditoriale Sacred Path · Deida",
        },
        whyMatters: [
          "Nommer l'écart entre amour compagnon et charge érotique sans culpabiliser.",
          "Donner un langage utilisable pour leadership, réceptivité et vérité.",
          "Réintroduire anticipation et tension saine dans les relations longues.",
          "Transformer les micro-bids en moments de connexion incarnée.",
        ],
        coreTeachings: [
          {
            title: "La présence est érotique",
            body: "Le corps sent la direction de l'attention avant l'analyse mentale.",
            beginnerReframe: "Débutant: 20 secondes de regard avant de parler.",
            advancedReframe: "Avancé: garder la présence pendant une vérité difficile.",
          },
          {
            title: "La différence consciente crée du magnétisme",
            body: "Trop de similarité peut aplatir la chimie; le contraste conscient la relance.",
            beginnerReframe: "Débutant: un round lead/receive avec consentement explicite.",
            advancedReframe: "Avancé: alterner les qualités de leadership sans perdre l'accordage.",
          },
          {
            title: "Vérité + dévotion",
            body: "La vérité sans cœur blesse; la dévotion sans vérité s'épuise.",
            beginnerReframe: "Débutant: une petite vérité + une offrande concrète.",
            advancedReframe: "Avancé: rounds de vérité chronométrés avec fermeture réparatrice.",
          },
        ],
        modernUse: [
          { title: "Routine qui tue l'anticipation", body: "Créer un passage logistique -> amoureux avant le toucher." },
          { title: "Communication correcte mais chimie faible", body: "Introduire des rounds incarnés au lieu de plus d'analyse." },
          { title: "Sur-fonctionnement d'un partenaire", body: "Rééquilibrer dynamique et responsabilité en sécurité." },
        ],
        shadowToAvoid: [
          {
            title: "Stéréotypes déguisés en spiritualité",
            body: "La polarité est dynamique, pas une identité rigide.",
            beginnerReframe: "Débutant: définir des rôles temporaires et consentis.",
            advancedReframe: "Avancé: jouer la fluidité tout en gardant le contraste.",
          },
          {
            title: "Intensité sans consentement",
            body: "Le bord n'a de valeur que s'il reste dialogué et régulé.",
            beginnerReframe: "Débutant: ralentir au premier signe de fermeture.",
            advancedReframe: "Avancé: utiliser des paliers d'intensité avec checkpoints.",
          },
        ],
        exercises: [
          {
            title: "Cadre respiratoire directionnel (8 minutes)",
            setup: "Un mène le rythme, l'autre reçoit, puis inversion.",
            steps: [
              "Définir un tempo de souffle commun.",
              "Maintenir deux minutes de direction claire.",
              "Inverser les rôles et conclure par un partage bref.",
            ],
            integration: "À répéter deux fois par semaine.",
            beginnerNote: "Voix calme, direction claire, zéro domination.",
            advancedNote: "Ajouter une phrase de vérité à mi-parcours.",
          },
          {
            title: "Vérité et dévotion (10 minutes)",
            setup: "Assis côte à côte, un point de contact.",
            steps: [
              "A partage vérité + engagement dévotionnel.",
              "B reflète mot à mot.",
              "Inversion puis clôture avec prochaine micro-action.",
            ],
            integration: "Excellent pour les tensions invisibles.",
            beginnerNote: "Commencer par une vérité à faible enjeu.",
            advancedNote: "Monter progressivement en enjeu avec intention réparatrice.",
          },
        ],
        reflectionPrompts: [
          "Où sommes-nous devenus sûrs mais énergétiquement neutres ?",
          "Quelle forme de polarité nous semble vraie, pas théâtrale ?",
          "Quelle vérité évitée coûte actuellement notre désir ?",
          "Quel geste dévotionnel ferait sentir mon partenaire choisi cette semaine ?",
        ],
        relatedPaths: [
          { name: "Polarity", note: "Contraste conscient et dévotion active." },
          { name: "Tantra", note: "Souffle et présence pour tenir la charge." },
          { name: "Kama Sutra", note: "Architecture du désir et anticipation." },
        ],
        premiumBanner:
          "Débloquez les modules Deida avancés avec scripts de polarité, séquences vérité-dévotion et progression guidée pour raviver la charge en sécurité.",
      },
    },
    osho: {
      descriptor: "Intimité méditative issue des enseignements de présence, adaptée aux couples modernes.",
      oneLiner: "Aide à reconnecter rapidement quand le couple se sent figé, mentalisé ou émotionnellement bloqué.",
      overviewLine: "Outils de conscience utilisables immédiatement puis approfondis à deux.",
      content: {
        heroIntro: [
          "La force d'Osho est méthodologique: revenir au corps et à l'observation avant la réaction.",
          "L'idée n'est ni de se contrôler ni de se déverser, mais de témoigner avec souffle et présence.",
          "Pour les couples: réguler, nommer le réel, puis reparler depuis un système nerveux plus ouvert.",
        ],
        quote: {
          text: "L'amour s'approfondit quand les partenaires cessent de contrôler le climat intérieur et apprennent à le traverser ensemble.",
          source: "Synthèse éditoriale Sacred Path · Osho",
        },
        whyMatters: [
          "Autorise l'émotion sans dramatisation automatique.",
          "Réduit les boucles verbales en revenant au corps.",
          "Transforme l'intimité en pratique de conscience quotidienne.",
          "Favorise la présence partagée, socle du désir durable.",
        ],
        coreTeachings: [
          {
            title: "L'observation transforme l'intensité",
            body: "Une sensation observée devient information plutôt que menace.",
            beginnerReframe: "Débutant: nommer sensation avant interprétation.",
            advancedReframe: "Avancé: rester présent même en charge émotionnelle forte.",
          },
          {
            title: "Le corps est la porte",
            body: "Souffle, son et mouvement débloquent ce que la discussion seule ne résout pas.",
            beginnerReframe: "Débutant: 2 minutes de souffle synchronisé avant un sujet sensible.",
            advancedReframe: "Avancé: recalibrer le rythme selon les micro-signaux corporels.",
          },
          {
            title: "Authenticité + accordage",
            body: "Dire vrai sans perdre le soin relationnel.",
            beginnerReframe: "Débutant: une émotion honnête + une intention de soin.",
            advancedReframe: "Avancé: maintenir la sécurité du partenaire en parlant direct.",
          },
        ],
        exercises: [
          {
            title: "Souffle témoin (7 minutes)",
            setup: "Dos à dos puis face à face.",
            steps: [
              "Observer les rythmes respiratoires sans corriger.",
              "Synchroniser progressivement l'expiration.",
              "Tourner face à face et tenir 3 minutes.",
            ],
            integration: "Avant conversation sensible.",
            beginnerNote: "Si tension, revenir 1 minute dos à dos.",
            advancedNote: "Ajouter 1 minute de regard silencieux.",
          },
          {
            title: "Secousse et silence (9 minutes)",
            setup: "Debout, pieds ancrés.",
            steps: [
              "3 minutes de secousse douce.",
              "2 minutes de souffle + son.",
              "4 minutes d'immobilité.",
            ],
            integration: "Très utile les jours anxieux.",
            beginnerNote: "Priorité à l'ancrage, pas à l'intensité.",
            advancedNote: "Allonger le son à l'expiration pour réguler davantage.",
          },
        ],
        reflectionPrompts: [
          "Qu'est-ce que je supprime dans l'intimité et à quel prix ?",
          "Qu'est-ce qui m'aide à rester présent quand la sensation monte ?",
          "Quel mini-rituel de 5 minutes nous serait le plus utile chaque jour ?",
          "À quelle vitesse revenons-nous au contact après le premier signal de stress ?",
        ],
        premiumBanner:
          "Débloquez des parcours Osho approfondis avec séquences guidées de witnessing et protocoles d'intégration pour convertir le stress quotidien en intimité consciente.",
      },
    },
  },
  cs: {
    deida: {
      descriptor: "Moudrost polarity převedená do praktické intimity pro moderní páry.",
      oneLiner: "Pomáhá obnovit erotickou jiskru tam, kde láska drží, ale touha se zploštila.",
      overviewLine: "Použitelné hned dnes večer: jasnost, pravda, oddanost a bezpečné tempo.",
      content: {
        heroIntro: [
          "Deida je užitečný hlavně tam, kde je loajalita a péče, ale méně živosti v přitažlivosti.",
          "Zdravé čtení není o stereotypech, ale o směrované přítomnosti, pravdě a jasném souhlasu.",
          "V praxi jde o krátké rituály: pravda, lead/receive kolo a konkrétní integrace do týdne.",
        ],
        quote: {
          text: "Přitažlivost se často vrací, když se partneři přestanou řídit navzájem a setkají se v láskyplné, směrované přítomnosti.",
          source: "Redakční syntéza Sacred Path · Deida",
        },
        whyMatters: [
          "Pojmenuje rozdíl mezi partnerskou láskou a erotickou jiskrou bez studu.",
          "Dává použitelný jazyk pro vedení, receptivitu a pravdu.",
          "Vrací očekávání a zdravé napětí do dlouhodobých vztahů.",
          "Mění malé spojovací momenty v vtělenou blízkost.",
        ],
        coreTeachings: [
          {
            title: "Přítomnost je erotická",
            body: "Tělo cítí kvalitu pozornosti dřív než mysl dokončí analýzu.",
            beginnerReframe: "Začátečník: 20 sekund očního kontaktu před mluvením.",
            advancedReframe: "Pokročilý: udržet přítomnost i při těžké pravdě.",
          },
          {
            title: "Vědomý rozdíl vytváří magnetismus",
            body: "Přílišná stejnost může chemii zploštit; vědomý kontrast ji oživí.",
            beginnerReframe: "Začátečník: jedno lead/receive kolo s explicitním souhlasem.",
            advancedReframe: "Pokročilý: střídat kvality vedení bez ztráty naladění.",
          },
          {
            title: "Pravda + oddanost",
            body: "Pravda bez srdce zraňuje, oddanost bez pravdy vysychá.",
            beginnerReframe: "Začátečník: malá pravda + jeden konkrétní oddaný krok.",
            advancedReframe: "Pokročilý: časovaná kola pravdy s opravnou závěrečnou fází.",
          },
        ],
        exercises: [
          {
            title: "Směrovaný dechový rámec (8 minut)",
            setup: "Jeden vede dech, druhý přijímá, pak výměna.",
            steps: [
              "Nastavte jednoduché společné tempo dechu.",
              "Dvě minuty držte jasné vedení.",
              "Výměna rolí a krátké sdílení závěrem.",
            ],
            integration: "Dvakrát týdně pro stabilní kontrast a důvěru.",
            beginnerNote: "Klidný hlas, jasné vedení, bez dominance.",
            advancedNote: "V polovině přidejte jednu pravdivou větu.",
          },
          {
            title: "Pravda a oddanost (10 minut)",
            setup: "Sed vedle sebe s jedním bodem kontaktu.",
            steps: [
              "A sdílí pravdu + oddaný závazek.",
              "B zrcadlí doslova.",
              "Výměna a závěr s jedním dalším krokem.",
            ],
            integration: "Vhodné pro skryté napětí.",
            beginnerNote: "Začněte nízkým rizikem pro bezpečí.",
            advancedNote: "Postupně zvyšujte náročnost s opravnou intencí.",
          },
        ],
        reflectionPrompts: [
          "Kde jsme bezpeční, ale energeticky neutrální?",
          "Jaká forma polarity je pro nás živá a pravdivá?",
          "Jaká neřčená pravda nás stojí touhu?",
          "Jaký oddaný krok by partnerovi ukázal, že je volený?",
        ],
        premiumBanner:
          "Odemkněte pokročilé Deida moduly se skripty polarity, pravda-oddanost sekvencemi a vedenou progresí pro obnovu jiskry v bezpečí.",
      },
    },
    osho: {
      descriptor: "Meditativní intimita z učení vědomé přítomnosti, adaptovaná pro moderní páry.",
      oneLiner: "Pomáhá rychle obnovit kontakt, když pár cítí otupění, přemýšlení nebo emoční blok.",
      overviewLine: "Nástroje vědomí použitelné hned teď a prohlubitelné v čase.",
      content: {
        heroIntro: [
          "Síla Osha je v metodě: návrat k tělu a pozorování dřív než reakce.",
          "Nejde o potlačení ani vybití, ale o svědčení s dechem a přítomností.",
          "Pro páry: nejdřív regulace, potom pojmenování reality, pak teprve dialog.",
        ],
        quote: {
          text: "Láska se prohlubuje, když partneři přestanou řídit vnitřní počasí a naučí se jím procházet spolu.",
          source: "Redakční syntéza Sacred Path · Osho",
        },
        whyMatters: [
          "Umožňuje emoci bez automatické dramatizace.",
          "Snižuje slovní smyčky návratem do těla.",
          "Mění intimitu na každodenní praxi vědomí.",
          "Podporuje sdílenou přítomnost, základ dlouhodobé touhy.",
        ],
        coreTeachings: [
          {
            title: "Pozorování mění intenzitu",
            body: "Pozorovaný pocit je informace, ne hrozba.",
            beginnerReframe: "Začátečník: pojmenuj vjem před interpretací.",
            advancedReframe: "Pokročilý: zůstaň přítomný i v silné emoční náloži.",
          },
          {
            title: "Tělo je vstupní brána",
            body: "Dech, zvuk a pohyb otevřou to, co samotná debata nedokáže.",
            beginnerReframe: "Začátečník: 2 minuty synchronního dechu před citlivým tématem.",
            advancedReframe: "Pokročilý: ladit tempo podle mikro-signálů těla.",
          },
          {
            title: "Autenticita + naladění",
            body: "Říct pravdu a zároveň držet vztahovou péči.",
            beginnerReframe: "Začátečník: jedna upřímná emoce + jedna pečující intence.",
            advancedReframe: "Pokročilý: mluvit přímo bez ztráty bezpečí partnera.",
          },
        ],
        exercises: [
          {
            title: "Svědecký dech (7 minut)",
            setup: "Zády k sobě, pak čelem k sobě.",
            steps: [
              "Pozorujte rozdíly v dechu bez opravování.",
              "Postupně slaďujte výdech.",
              "Otočte se čelem a držte 3 minuty.",
            ],
            integration: "Před citlivým rozhovorem.",
            beginnerNote: "Při napětí se na minutu vraťte zády k sobě.",
            advancedNote: "Přidejte minutu tichého očního kontaktu.",
          },
          {
            title: "Třes a ticho (9 minut)",
            setup: "Ve stoje, chodidla uzemněná.",
            steps: [
              "3 minuty jemného třesu.",
              "2 minuty dech + zvuk.",
              "4 minuty nehybnosti.",
            ],
            integration: "Výborné ve dnech úzkosti nebo podráždění.",
            beginnerNote: "Priorita je uzemnění, ne síla.",
            advancedNote: "Prodlouž výdechový zvuk pro hlubší zklidnění.",
          },
        ],
        reflectionPrompts: [
          "Co v intimitě potlačuji a co to stojí nás oba?",
          "Co mi pomáhá zůstat přítomný, když roste intenzita?",
          "Který 5minutový denní rituál by nám nejvíc pomohl?",
          "Jak rychle se vracíme ke kontaktu po prvním signálu stresu?",
        ],
        premiumBanner:
          "Odemkněte hlubší Osho cesty s vedeným witnessingem a integračními protokoly, které mění denní stres na vědomou intimitu.",
      },
    },
  },
};

const applyAuthorLocalization = (author: Author, lang: Language): Author => {
  if (lang === "en") return author;
  const override = localizedAuthorOverrides[lang]?.[author.slug];
  if (!override) return author;

  return {
    ...author,
    ...override,
    content: override.content ? { ...author.content, ...override.content } : author.content,
  };
};

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
    heroEyebrow: "ANCIENT WISDOM FOR MODERN LOVE",
    heroTitle: "Sacred Library",
    heroDesc:
      "The teachers and paths gathered here have changed thousands of relationships — not by adding techniques, but by restoring what was always possible between two people willing to go deeper. Start anywhere. Something here will change you.",
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
    whatYouWillDiscover: "What you'll discover",
    coreThemesLabel: "Core themes",
    keyWorksLabel: "Key works",
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
    heroEyebrow: "SAGESSE ANCIENNE POUR L'AMOUR MODERNE",
    heroTitle: "Bibliothèque sacrée",
    heroDesc:
      "Les enseignants et les chemins réunis ici ont transformé des milliers de relations — non pas en ajoutant des techniques, mais en restaurant ce qui a toujours été possible entre deux personnes prêtes à aller plus loin. Commencez n'importe où. Quelque chose ici vous changera.",
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
    whatYouWillDiscover: "Ce que vous allez découvrir",
    coreThemesLabel: "Thèmes centraux",
    keyWorksLabel: "Lectures clés",
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
    heroEyebrow: "STARODÁVNÁ MOUDROST PRO MODERNÍ LÁSKU",
    heroTitle: "Posvátná knihovna",
    heroDesc:
      "Učitelé a cesty zde shromážděné změnily tisíce vztahů — ne přidáváním technik, ale obnovením toho, co bylo vždy možné mezi dvěma lidmi ochotnými jít hlouběji. Začněte kdekoliv. Něco tady vás změní.",
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
    whatYouWillDiscover: "Co objevíte",
    coreThemesLabel: "Hlavní témata",
    keyWorksLabel: "Klíčová díla",
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

const TierBadge = ({ tier }: { tier: Tier }) => {
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();
  const locked = entitlementResolved && tier === "premium" && !hasPremiumAccess;

  if (hasPremiumAccess || !entitlementResolved) return null;

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${badgeByTier[tier]}`}>
      {locked ? <Lock className="h-3.5 w-3.5" aria-label="Locked" /> : "Free"}
    </span>
  );
};

const AuthorHeroCard = ({ author }: { author: Author }) => {
  const { lang } = useLanguage();
  const ui = authorsUiCopy[lang];
  const Icon = author.icon;
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();
  const isLocked = entitlementResolved && author.tier === "premium" && !hasPremiumAccess;

  return (
    <section className={shellCardClass}>
      <div className="flex items-start justify-between gap-3">
        <div className={`inline-flex rounded-2xl border border-border/30 bg-background/55 p-3 ${author.iconClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <TierBadge tier={author.tier} />
      </div>

      <h2 className="mt-4 font-display text-3xl text-foreground">{author.name}</h2>
      {author.tradition ? (
        <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-primary/70">{author.tradition}</p>
      ) : null}
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{author.descriptor}</p>
      <p className="mt-3 text-sm leading-6 text-foreground/90 italic">{author.oneLiner}</p>

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
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();
  if (hasPremiumAccess || !entitlementResolved) return null;
  const upgradeCopy = authorUpgradeCopy[author.slug] ?? {
    benefit: "Turn insight into guided couple practice with structure that lasts.",
  };
  const miniLine = author.tier === "free"
    ? author.content?.premiumBanner ?? upgradeCopy.benefit
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
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Feel closer</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Heal what's stuck</span>
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

const AuthorPremiumBlock = ({ author }: { author: Author }) => {
  const { lang } = useLanguage();
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();

  if (hasPremiumAccess || !entitlementResolved) return null;

  return (
    <section className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_58%),linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,23,42,0.08))] p-5 shadow-[0_20px_60px_-42px_rgba(255,173,70,0.58)]">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-300">READY TO GO DEEPER</p>
      <h4 className="mt-2 font-display text-2xl text-foreground">Bring this wisdom into your relationship.</h4>
      <p className="mt-3 text-sm leading-7 text-foreground/90">Reading can open the heart. Premium helps you turn insight into lived intimacy through guided exploration, deeper teachings, and shared practices that nourish love.</p>
      <Link
        to="/pricing"
        className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-500/14 px-4 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
      >
        Continue the journey together
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
};

const FreeAuthorContent = ({ author }: { author: Author }) => {
  const { lang } = useLanguage();
  const ui = authorsUiCopy[lang];
  if (!author.content) {
    return (
      <LibraryDetailBody>
        <section className={shellCardClass}>
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{ui.whatThisAuthorIsAbout}</p>
          <h3 className="mt-2 font-display text-3xl text-foreground">{author.name}</h3>
          <p className="mt-4 text-sm leading-7 text-foreground/90">{author.descriptor}</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{author.oneLiner}</p>
        </section>
        <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.whyThisAuthorMatters}</p>
          <div className="mt-3 space-y-2 text-sm leading-7 text-foreground/90">
            <p>{author.descriptor}</p>
            <p>{author.overviewLine}</p>
          </div>
        </section>
      </LibraryDetailBody>
    );
  }

  const data = author.content;
  const longform = AUTHOR_LONGFORM_BY_SLUG[author.slug];
  const longformParagraphs = longform?.fullDescription.split("\n\n") ?? [];

  return (
    <LibraryDetailBody>
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

      {longformParagraphs.length ? (
        <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {lang === "fr" ? "Contexte de tradition" : lang === "cs" ? "Kontext tradice" : "Lineage Context"}
          </p>
          {longform.tradition ? (
            <p className="mt-2 text-xs uppercase tracking-[0.12em] text-primary/80">{longform.tradition}</p>
          ) : null}
          <div className="mt-3 space-y-3 text-sm leading-7 text-foreground/90">
            {longformParagraphs.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          {longform.keyWorks.length ? (
            <div className="mt-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-primary/80">{ui.keyWorksLabel}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {longform.keyWorks.map((work) => (
                  <span
                    key={work}
                    className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-primary/85"
                  >
                    {work}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

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
    </LibraryDetailBody>
  );
};

const PremiumAuthorContent = ({ author }: { author: Author }) => {
  const { lang } = useLanguage();
  const ui = authorsUiCopy[lang];
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();
  const longform = AUTHOR_LONGFORM_BY_SLUG[author.slug];
  const longformParagraphs = longform?.fullDescription.split("\n\n") ?? [];
  const upgradeFallback = authorUpgradeCopy[author.slug];
  const narrativeParagraphs = longformParagraphs.length
    ? longformParagraphs
    : author.teaser?.length
      ? author.teaser
      : [author.overviewLine, upgradeFallback?.benefit ?? ui.premiumPracticeBody];
  const topThemes = longform?.coreThemes.slice(0, 6) ?? [];
  const works = longform?.keyWorks.slice(0, 6) ?? [];

  return (
  <LibraryDetailBody>
    <section className="rounded-[28px] border border-amber-400/20 bg-gradient-to-br from-amber-500/12 via-background to-background p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.5)]">
      <div className="flex flex-wrap items-center gap-2">
        <TierBadge tier="premium" />
        <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-amber-200">
          {hasPremiumAccess ? ui.premiumAuthor : ui.lockedAuthor}
        </span>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-primary/80">{ui.whatThisAuthorOffers}</p>
      <h3 className="mt-2 font-display text-3xl text-foreground">{author.name}</h3>
      <p className="mt-3 text-sm leading-7 text-foreground/90">{longform?.shortDescription ?? author.descriptor}</p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{longform?.tagline ?? author.oneLiner}</p>
      {longform?.tradition ? (
        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-primary/80">{longform.tradition}</p>
      ) : null}
      <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
        {narrativeParagraphs.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {entitlementResolved && !hasPremiumAccess ? (
        <Link
          to="/pricing"
          className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/18"
        >
          <Lock className="h-4 w-4" />
          {ui.unlockThisAuthorJourney}
        </Link>
      )}
    </section>

    <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.whyThisAuthorMatters}</p>
      <div className="mt-4 space-y-3 text-sm leading-7 text-foreground/90">
        {narrativeParagraphs.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>

    <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.whatYouWillDiscover}</p>
      <p className="mt-3 text-sm leading-7 text-foreground/90">{longform?.premiumPreview ?? ui.premiumPracticeBody}</p>
    </section>

    <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.coreThemesLabel}</p>
      {topThemes.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {topThemes.map((theme) => (
            <span
              key={theme}
              className="rounded-full border border-primary/25 bg-primary/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-primary/85"
            >
              {theme}
            </span>
          ))}
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{ui.premiumWhy1}</span>
          </div>
        </div>
      )}
    </section>

    <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.keyWorksLabel}</p>
      <div className="mt-4 space-y-2">
        {(works.length ? works : [ui.premiumWhoCard4Body]).map((work) => (
          <div key={work} className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{work}</span>
          </div>
        ))}
      </div>
    </section>

    <AuthorPremiumBlock author={author} />
  </LibraryDetailBody>
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
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();
  const [searchParams, setSearchParams] = useSearchParams();
  const localizedAuthors = useMemo(
    () => authors.map((author) => applyAuthorLocalization(author, lang)),
    [lang],
  );
  const focusSlug = searchParams.get("focus")?.trim().toLowerCase();
  const defaultSelectedSlug = useMemo(
    () =>
      localizedAuthors.find((author) => author.slug === focusSlug)?.slug ??
      localizedAuthors[0]?.slug ??
      "deida",
    [focusSlug, localizedAuthors],
  );
  const [selectedSlug, setSelectedSlug] = useState(defaultSelectedSlug);
  const [mobileDetailMode, setMobileDetailMode] = useState(false);
  const [detailOnlyMode, setDetailOnlyMode] = useState(Boolean(focusSlug));
  const detailPaneRef = useRef<HTMLDivElement | null>(null);
  const sidePaneRef = useRef<HTMLElement | null>(null);
  const selected = useMemo(
    () => localizedAuthors.find((author) => author.slug === selectedSlug) ?? localizedAuthors[0],
    [localizedAuthors, selectedSlug],
  );

  const freeAuthors = localizedAuthors.filter((author) => author.tier === "free");
  const premiumAuthors = localizedAuthors.filter((author) => author.tier === "premium");
  const relatedAuthors = localizedAuthors.filter((author) => author.slug !== selectedSlug).slice(0, 6);
  const showBrowse = isMobile ? !mobileDetailMode : !detailOnlyMode;
  const showDetail = isMobile ? mobileDetailMode : true;
  const desktopFocusedDetail = !isMobile && detailOnlyMode;

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

  useEffect(() => {
    if (!localizedAuthors.some((author) => author.slug === selectedSlug)) {
      setSelectedSlug(localizedAuthors[0]?.slug ?? "deida");
    }
  }, [localizedAuthors, selectedSlug]);

  useEffect(() => {
    if (!focusSlug) return;
    if (!localizedAuthors.some((author) => author.slug === focusSlug)) return;
    setSelectedSlug(focusSlug);
    if (isMobile) {
      setMobileDetailMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [focusSlug, isMobile, localizedAuthors]);

  useEffect(() => {
    if (isMobile) return;
    detailPaneRef.current?.scrollTo({ top: 0, behavior: "auto" });
    sidePaneRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [isMobile, selectedSlug]);

  const handleSelectAuthor = (slug: string) => {
    setSelectedSlug(slug);
    if (!isMobile) {
      setDetailOnlyMode(true);
    }
    const next = new URLSearchParams(searchParams);
    next.set("focus", slug);
    setSearchParams(next, { replace: true });
    if (isMobile) {
      setMobileDetailMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const openCardHint = lang === "fr"
    ? "Ouvrir cet auteur"
    : lang === "cs"
      ? "Otevřít tohoto autora"
      : "Open this author";

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

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-2">
          {localizedAuthors.map((author) => {
            const Icon = author.icon;
            const isSelected = selectedSlug === author.slug;
            return (
              <button
                key={author.slug}
                type="button"
                onClick={() => handleSelectAuthor(author.slug)}
                className={`group flex min-h-[236px] flex-col rounded-[24px] border p-4 text-left transition-all ${
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
                <h3 className="mt-3 font-display text-[1.75rem] leading-[1.15] text-foreground">{author.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground/95">
                  {AUTHOR_LONGFORM_BY_SLUG[author.slug]?.shortDescription ?? author.descriptor}
                </p>
                <p className="mt-2 text-xs leading-5 text-foreground/82">
                  {author.tier === "free"
                    ? `${ui.practicePreview}: ${author.content?.exercises[0]?.title ?? ui.practicePreviewFallback}`
                    : `${ui.premiumPreview}: ${AUTHOR_LONGFORM_BY_SLUG[author.slug]?.tagline ?? author.oneLiner ?? ui.premiumPreviewFallback}`}
                </p>
                <p className="mt-auto pt-3 text-xs uppercase tracking-[0.12em] text-primary/85 group-hover:text-primary">
                  {openCardHint}
                </p>
              </button>
            );
          })}
          {entitlementResolved && !hasPremiumAccess ? (
            <Link
              to="/pricing"
              className="md:col-span-2 xl:col-span-2 rounded-[24px] border border-amber-400/20 bg-gradient-to-br from-amber-950/40 via-card/60 to-card/40 shadow-[0_20px_60px_-42px_rgba(255,173,70,0.58)] transition-all hover:border-amber-400/35 hover:shadow-[0_24px_70px_-40px_rgba(255,173,70,0.68)]"
            >
              <div className="flex h-full flex-col justify-between p-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.22em] text-amber-400/80">
                    DEEPER PATH FOR TWO
                  </span>
                  <h3 className="mt-2 font-display text-2xl text-foreground">
                    Open the door to deeper intimacy.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Premium is for couples who want more than inspiration. It helps you reconnect when distance appears, repair what feels fragile, explore new rituals together, and build a love life that feels more alive, loving, and fulfilling.
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  {[
                    "Reconnect what feels distant",
                    "Repair what has been strained",
                    "Try new rituals that bring joy",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-0.5 text-amber-400/70">◆</span>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-4 h-px w-full bg-border/20" />

                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-[14px] border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-medium text-amber-300 transition-colors hover:bg-amber-400/20">
                  Deepen intimacy together
                  <span>→</span>
                </button>

                <p className="mt-2 text-center text-[10px] text-muted-foreground/60">
                  One shared path for both hearts.
                </p>
              </div>
            </Link>
          ) : null}
        </div>

        {entitlementResolved && !hasPremiumAccess ? (
          <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-500/6 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-amber-200">WHY GO DEEPER</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">Some wisdom can inspire in a moment. Deeper guidance helps you live it together, especially when love needs renewal, courage, and care.</p>
          </div>
        ) : null}
      </section>
      ) : null}

      {showDetail ? (
      <LibraryDetailSplitLayout
        isMobile={isMobile}
        focusedDetail={desktopFocusedDetail}
        showDesktopBack={true}
        backLabel={ui.backToLibrary}
        onBack={() => setDetailOnlyMode(false)}
        mobileHeader={
          <MobileDetailHeader
            title={selected.name}
            tier={selected.tier}
            onBack={() => setMobileDetailMode(false)}
          />
        }
        sidePaneRef={sidePaneRef}
        detailPaneRef={detailPaneRef}
        sidePane={(
          <>
            <AuthorHeroCard author={selected} />
            {entitlementResolved && !hasPremiumAccess ? <PremiumMiniCard author={selected} /> : null}
          </>
        )}
        detailPane={(
          <>
            {selected.tier === "free" ? <FreeAuthorContent author={selected} /> : <PremiumAuthorContent author={selected} />}
            {isMobile ? <RelatedAuthorCarousel items={relatedAuthors} onSelect={handleSelectAuthor} /> : null}
          </>
        )}
      />
      ) : null}
    </div>
  );
};

export default Authors;
