import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Crown,
  Flame,
  Heart,
  Lock,
  LockOpen,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSeoMetadata } from "@/lib/seo";

type Tier = "free" | "premium";

type Pillar = {
  name: string;
  body: string;
};

type Block = {
  title: string;
  body: string;
  beginnerReframe?: string;
  advancedReframe?: string;
};

type Practice = {
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

type RelatedAuthor = {
  name: string;
  tier: Tier;
  note: string;
};

type PathContent = {
  hero: string[];
  whyMatters?: string[];
  whoItsFor?: Block[];
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
  whatItIsNot: string[];
  pillars: Pillar[];
  modernCouples: Block[];
  misunderstandings: Block[];
  practices: Practice[];
  reflections: string[];
  relatedAuthors: RelatedAuthor[];
  premiumBanner: string;
};

type PathDetail = {
  slug: string;
  name: string;
  tier: Tier;
  oneLine: string;
  overviewLine: string;
  icon: LucideIcon;
  iconClass: string;
  content?: PathContent;
  teaser?: string[];
};

const libraryPages = [
  {
    to: "/app/paths",
    label: "Paths",
    subtitle: "Ancient pathways for modern love",
    icon: Sparkles,
    iconClass: "text-violet-300",
  },
  {
    to: "/app/authors",
    label: "Authors",
    subtitle: "Voices that guide intimacy",
    icon: Heart,
    iconClass: "text-rose-300",
  },
  {
    to: "/app/reconnect",
    label: "Reconnect",
    subtitle: "Repair and return to closeness",
    icon: Flame,
    iconClass: "text-amber-300",
  },
];

const pathDetails: PathDetail[] = [
  {
    slug: "tantra",
    name: "Tantric Wisdom",
    tier: "free",
    oneLine: "An ancient path translated for modern couples through breath, presence, polarity, and devotion.",
    overviewLine: "For couples who want intimacy to feel conscious tonight and grow spiritually over time.",
    icon: Sparkles,
    iconClass: "text-fuchsia-300",
    content: {
      hero: [
        "Historically, Tantra developed as a body-inclusive spiritual path in Hindu and Buddhist traditions, using breath, attention, ritual, mantra, and devotion to transform raw energy into awareness.",
        "For couples, the practical translation is simple: do not split desire from consciousness. Stay connected to sensation, emotion, and meaning in the same moment.",
        "Tantric pacing helps modern partners regulate first, open second, and intensify only when both bodies are genuinely ready. That sequence protects trust and increases sustainable attraction.",
        "The shift is from performance to practice. Intimacy becomes a repeatable path where eros, tenderness, truth, and reverence grow together over time.",
      ],
      whyMatters: [
        "It gives long-term couples a framework for growing erotic depth without sacrificing emotional safety.",
        "It offers practical pacing when one partner wants intensity and the other needs grounding first.",
        "Sexual mindfulness research points toward stronger relational flourishing when partners stay present in body and awareness.",
        "It turns breath into a co-regulation tool that can lower stress load before difficult conversations or deeper touch.",
        "It restores reverence in relationships that have become efficient but emotionally dry.",
        "It creates repeatable rituals, so closeness does not depend on perfect mood, timing, or chemistry spikes.",
      ],
      whoItsFor: [
        {
          title: "Couples with strong loyalty but fading erotic charge",
          body: "Use tantric pacing and polarity to revive desire without pressuring either nervous system.",
        },
        {
          title: "Couples healing from stress loops",
          body: "Use breath-led regulation before touch so closeness becomes safe, warm, and emotionally reachable again.",
        },
        {
          title: "Couples ready for sacred depth",
          body: "Build devotional rituals that support both erotic aliveness and spiritual intimacy in daily life.",
        },
        {
          title: "Couples rebuilding trust after rupture or avoidance",
          body: "Use explicit consent language and structured rituals to restore confidence, clarity, and steady contact.",
        },
      ],
      practicePreview: {
        title: "Tantric Arrival Sequence",
        body: "A low-pressure sequence that moves from stress to presence before any intensity.",
        steps: [
          "Sit face-to-face, hands connected, and breathe in sync for 2 minutes.",
          "Each partner names one present feeling and one relational intention for tonight.",
          "Use 3 minutes of devotional non-goal touch in non-genital zones.",
          "Pause and ask: more, same, slower, or stop before moving forward.",
        ],
      },
      beginnerTrack: {
        title: "Beginner Track: Build Safety Before Intensity",
        body: "For the first 2-3 weeks, prioritize consistency over intensity. The goal is to make your bodies trust the process so desire can return naturally.",
        steps: [
          "Run a 6-10 minute arrival ritual three times per week.",
          "Use explicit consent language every round: more, same, slower, pause, stop.",
          "Keep intensity under 6/10 and end while both still feel regulated.",
          "Close with 2 minutes of integration: one gratitude and one request for next time.",
        ],
      },
      advancedTrack: {
        title: "Advanced Track: Deepen Charge Without Losing Coherence",
        body: "Once regulation and trust are stable, layer polarity, breath depth, and devotional intent without sacrificing clarity or consent.",
        steps: [
          "Alternate 2 minutes of directional polarity with 1 minute of stillness for 4 rounds.",
          "Use wave pacing: build charge, pause for breath integration, then re-enter contact.",
          "Introduce truth-and-devotion dialogue before touch: one edge truth, one offering.",
          "Debrief after every session: what opened, what overwhelmed, what to adjust next time.",
        ],
      },
      quote: {
        text: "Tantric intimacy grows when attention, consent, and devotion stay alive in the same breath.",
        source: "Sacred Path Tantric editorial synthesis",
      },
      whatItIsNot: [
        "It is not spiritual aesthetics layered over disconnection.",
        "It is not pressure for endless intensity or perfect performance.",
        "It is not permission to bypass consent or emotional accountability.",
        "It is not a shortcut that avoids emotional repair or honest communication.",
        "It is not about exotic novelty; it is about consistency, depth, and embodied truth.",
      ],
      pillars: [
        { name: "Presence", body: "Returning attention to what is truly alive right now." },
        { name: "Breath", body: "Using breath to regulate emotion, arousal, and safety." },
        { name: "Polarity", body: "Cultivating conscious contrast so charge can move." },
        { name: "Devotion", body: "Holding intimacy with reverence, care, and intention." },
        { name: "Embodied Awareness", body: "Tracking sensation and truth in the body first." },
        { name: "Consent Language", body: "Keeping every step explicit, mutual, and adjustable in real time." },
        { name: "Integration", body: "Closing intimate moments with reflection so trust compounds over time." },
      ],
      modernCouples: [
        {
          title: "When love is present but intimacy feels mechanical",
          body: "Use short pre-intimacy rituals to shift from logistics mode to presence mode.",
        },
        {
          title: "When one partner wants depth and the other feels pressure",
          body: "Tantric pacing lets depth grow without violating nervous-system boundaries.",
        },
        {
          title: "When stress suppresses desire",
          body: "Breath-led regulation reopens relational contact without forcing chemistry.",
        },
        {
          title: "When conflict residue lingers for days",
          body: "Use devotional repair rituals that pair accountability with soothing body contact.",
        },
        {
          title: "When intimacy feels disconnected from daily life",
          body: "Anchor one 10-minute tantric ritual into your weekly rhythm so closeness stays alive.",
        },
      ],
      misunderstandings: [
        {
          title: "Tantra equals constant intensity",
          body: "Popular imagery can make Tantra look like endless high charge. Real tantric training uses waves of activation and settling so the nervous system can integrate instead of crash.",
          beginnerReframe: "Beginner move: keep sessions short and end before overwhelm appears.",
          advancedReframe: "Advanced move: cycle intensity and stillness intentionally to build resilience and depth.",
        },
        {
          title: "Tantra is only technique",
          body: "Technique helps, but it is not the core. Quality of attention, consent clarity, and emotional honesty determine whether practice becomes truly connective.",
          beginnerReframe: "Beginner move: choose one simple ritual and execute it with full presence.",
          advancedReframe: "Advanced move: track subtle state shifts and adjust pace in real time.",
        },
        {
          title: "Tantra avoids conflict",
          body: "Tantra does not remove friction. It gives couples better ways to meet friction through body regulation, truth, and repair-oriented contact.",
          beginnerReframe: "Beginner move: pause conflict with breath sync before discussing content.",
          advancedReframe: "Advanced move: pair accountability language with soothing touch and integration.",
        },
        {
          title: "Tantra is only for advanced couples",
          body: "Beginners often benefit fastest because foundational tools are simple: arrive, breathe, ask consent, and move slowly. Depth comes from repetition, not complexity.",
          beginnerReframe: "Beginner move: repeat one 8-minute ritual three times this week.",
          advancedReframe: "Advanced move: layer polarity and devotional truth once consistency is stable.",
        },
        {
          title: "Tantra replaces communication",
          body: "Embodied practice works best when paired with clear language. Somatic depth without communication can create confusion; language without embodiment can stay dry.",
          beginnerReframe: "Beginner move: name one feeling and one need before touch.",
          advancedReframe: "Advanced move: use structured debriefs to convert insight into relational agreements.",
        },
      ],
      practices: [
        {
          title: "Arrival Ritual (6 minutes)",
          setup: "Sit face-to-face with one point of hand contact.",
          steps: [
            "Take ten synchronized breaths.",
            "Each partner names one present feeling.",
            "Each partner names one desire for the evening.",
          ],
          integration: "Use before intimacy and before repair talks.",
          beginnerNote: "Keep this practice exactly as written for your first two weeks.",
          advancedNote: "Add one minute of eye-gazing silence before naming desires.",
        },
        {
          title: "Three-Phase Breath (8 minutes)",
          setup: "Stay seated or side-by-side lying down.",
          steps: [
            "Low belly breathing for regulation.",
            "Chest breathing for emotional opening.",
            "Whole-body breathing with eye softness.",
          ],
          integration: "Builds shared coherence quickly.",
          beginnerNote: "If dysregulated, stay longer in phase one and shorten phases two and three.",
          advancedNote: "Use subtle sound on the exhale to increase release and emotional clarity.",
        },
        {
          title: "Devotional Touch Round (10 minutes)",
          setup: "One gives, one receives, then switch.",
          steps: [
            "Giver uses slow touch in non-genital zones.",
            "Receiver communicates with more/same/pause cues.",
            "Switch roles after five minutes.",
          ],
          integration: "Improves trust, consent, and attunement.",
          beginnerNote: "Keep touch non-goal and non-genital so safety stays high.",
          advancedNote: "Add one intentional polarity shift before switching roles.",
        },
        {
          title: "Polarity and Tenderness Loop (9 minutes)",
          setup: "Alternate one minute of directional leading and one minute of receptive stillness.",
          steps: [
            "Partner A leads with voice and pace for one minute.",
            "Partner B receives and signals more/same/pause.",
            "Switch roles and repeat for four rounds.",
          ],
          integration: "Rebuilds erotic contrast while keeping emotional warmth intact.",
          beginnerNote: "Use slower voice pace and lower intensity to keep confidence steady.",
          advancedNote: "Layer in one truth statement per round to increase intimacy depth.",
        },
      ],
      reflections: [
        "Where do we rush instead of arrive?",
        "Which of the five pillars is strongest for us right now?",
        "What would devotion look like in one concrete weekly action?",
        "How can we bring embodied awareness into our conflict cycles?",
        "What makes each of us feel both desired and safe at the same time?",
        "Which ritual from this page can we realistically repeat twice this week?",
        "Where do we still prioritize performance over presence?",
      ],
      relatedAuthors: [
        { name: "Osho", tier: "free", note: "Awareness-based intimacy and witnessing." },
        { name: "David Deida", tier: "free", note: "Polarity and devotional edge." },
        { name: "Margot Anand", tier: "premium", note: "Ecstatic ceremony and sacred sensuality." },
        { name: "Sally Kempton", tier: "premium", note: "Kashmir Shaivism and intimate recognition practice." },
      ],
      premiumBanner:
        "Unlock full Tantric Wisdom journeys with guided audio, consent-forward ritual progressions, and layered modules that turn chemistry into a durable sacred couple practice.",
    },
  },
  {
    slug: "tao",
    name: "Tao",
    tier: "free",
    oneLine: "Flow, breath, and sensual longevity from ancient Taoist practice for modern couples.",
    overviewLine: "For couples who want calm intensity now and sustainable erotic energy long-term.",
    icon: Waves,
    iconClass: "text-cyan-300",
    content: {
      hero: [
        "Classical Taoist teaching emphasizes harmony with the Dao through balance, non-forcing (wu wei), and flow. In intimacy, that becomes softness, precise pacing, and full-body circulation.",
        "Tao is especially useful during high-stress seasons: it helps couples reconnect without force, pressure, or emotional collapse.",
        "Instead of chasing peaks, Tao trains continuity. You learn to preserve erotic energy, reduce depletion, and keep desire alive across ordinary weeknights.",
        "With practice, calm and passion stop competing. They become one integrated rhythm that supports long-term closeness.",
      ],
      whyMatters: [
        "It helps couples recover closeness on low-energy days when intensity would backfire.",
        "It gives practical pacing for mismatched desire rhythms without shame or withdrawal.",
        "It uses slow breath and circulation principles that can reduce stress activation and improve emotional access.",
        "It lowers post-intimacy depletion by teaching conservation, grounding, and recovery.",
        "It makes touch safer for sensitive or anxious nervous systems.",
        "It builds erotic longevity for couples who want depth that lasts years, not weeks.",
      ],
      whoItsFor: [
        {
          title: "Couples in high-output life seasons",
          body: "Use Tao to reconnect when work, parenting, and fatigue compress emotional capacity.",
        },
        {
          title: "Couples with energy mismatch",
          body: "Use breath rhythm and pressure reduction to stay connected without forcing chemistry.",
        },
        {
          title: "Couples recovering from burnout",
          body: "Use restorative intimacy to rebuild vitality and trust in the body.",
        },
        {
          title: "Couples seeking long-term sensual health",
          body: "Use Tao circulation practices to make desire sustainable and nourishing over time.",
        },
      ],
      practicePreview: {
        title: "Tao Evening Reset",
        body: "A stress-compatible sequence for moving from overdrive into connected sensual presence.",
        steps: [
          "Lie side-by-side with one hand on each other’s lower belly.",
          "Breathe 4-count inhale and 6-count exhale for five rounds.",
          "Pause and name one place in your body that softened.",
          "Close with three minutes of non-goal touch under 6/10 intensity.",
        ],
      },
      beginnerTrack: {
        title: "Beginner Track: Restore Rhythm and Safety",
        body: "For the first month, Tao practice is about downshifting stress and rebuilding body trust. Calm consistency is more important than erotic intensity.",
        steps: [
          "Use a 5-8 minute Tao reset on weeknights before any heavy conversation.",
          "Stay under 6/10 intensity and keep breath longer on exhale than inhale.",
          "Track one body signal of softening and one signal of overload each session.",
          "Close with a short aftercare check: what felt nourishing, what should slow down next time.",
        ],
      },
      advancedTrack: {
        title: "Advanced Track: Refine Flow and Longevity",
        body: "Once regulation is stable, build sustained sensual charge through circulation, pacing precision, and recovery intelligence.",
        steps: [
          "Run 12-18 minute circulation sessions with alternating stillness and movement phases.",
          "Use shared breath cadence as the primary intensity regulator rather than willpower.",
          "Practice full-body warmth circulation before any high-charge focus zone work.",
          "Maintain next-day vitality check-ins to ensure practice is nourishing, not depleting.",
        ],
      },
      quote: {
        text: "Tao intimacy is measured by nourishment, steadiness, and the quality of connection you can sustain.",
        source: "Sacred Path Tao editorial synthesis",
      },
      whatItIsNot: [
        "It is not repression or anti-passion restraint.",
        "It is not emotional detachment disguised as calm.",
        "It is not only solo energetics; it is a partner skillset.",
        "It is not avoidance of desire; it is desire with steadier regulation.",
        "It is not endless slowness; pace can rise once both bodies are resourced.",
      ],
      pillars: [
        { name: "Softness", body: "Relaxation enables deeper sensation and better flow." },
        { name: "Breath Rhythm", body: "Breath sets pace and prevents overwhelm." },
        { name: "Conservation", body: "Stewarding energy supports long-term vitality." },
        { name: "Circulation", body: "Distributing warmth through the body reduces depletion." },
        { name: "Nourishment", body: "The aim is restorative intimacy for both partners." },
        { name: "Grounding", body: "Anchor contact in lower-body awareness to reduce reactivity." },
        { name: "Recovery", body: "Use aftercare and closure so connection leaves both partners clearer." },
      ],
      modernCouples: [
        {
          title: "For high-stress seasons",
          body: "Tao lowers activation so connection remains possible on hard weeks.",
        },
        {
          title: "For desire rhythm mismatch",
          body: "Breath and pacing lower pressure while preserving sensual connection.",
        },
        {
          title: "For burnout recovery",
          body: "Tao rebuilds erotic vitality gradually rather than forcing intensity.",
        },
        {
          title: "For post-conflict intimacy hesitation",
          body: "Use low-intensity Tao reset rituals before attempting high-charge contact.",
        },
        {
          title: "For partners with different touch thresholds",
          body: "Use structured pacing language to maintain connection while respecting boundaries.",
        },
      ],
      misunderstandings: [
        {
          title: "Slow equals boring",
          body: "In Tao practice, slower pacing often increases sensitivity, anticipation, and full-body awareness. Fast escalation can numb the system before depth has time to build.",
          beginnerReframe: "Beginner move: use one deliberately slow touch pattern for 3 minutes.",
          advancedReframe: "Advanced move: alternate slow and medium rhythm to sharpen erotic contrast.",
        },
        {
          title: "Conservation equals withholding",
          body: "Conservation is not emotional distance. It means circulating and stewarding energy so both partners stay nourished after intimacy.",
          beginnerReframe: "Beginner move: prioritize sessions that leave both partners clearer afterward.",
          advancedReframe: "Advanced move: track post-practice vitality over 24 hours and adjust intensity.",
        },
        {
          title: "Tao kills passion",
          body: "Tao does not reduce passion; it stabilizes passion. The aim is desire that stays alive over years rather than burning out in short spikes.",
          beginnerReframe: "Beginner move: keep desire gentle but continuous across the week.",
          advancedReframe: "Advanced move: build longer arcs of anticipation before peak intensity.",
        },
        {
          title: "Tao is only physical technique",
          body: "Technique matters, but emotional trust and co-regulation are central. Without relational safety, physical methods lose their depth quickly.",
          beginnerReframe: "Beginner move: include one emotional check-in before touch begins.",
          advancedReframe: "Advanced move: integrate repair language into circulation practice after tense days.",
        },
        {
          title: "Tao is too gentle for attraction",
          body: "Gentle pacing often increases precision and erotic responsiveness. Pressure can flatten arousal, while attuned pacing tends to amplify it.",
          beginnerReframe: "Beginner move: lower pressure and focus on responsiveness cues.",
          advancedReframe: "Advanced move: use pacing ladders to increase intensity without losing flow.",
        },
      ],
      practices: [
        {
          title: "Lower Belly Sync (5 minutes)",
          setup: "Lie side-by-side and place a hand on each other's lower abdomen.",
          steps: [
            "Inhale 4 counts into the lower belly.",
            "Exhale 6 counts.",
            "Keep words minimal and attention soft.",
          ],
          integration: "A fast reset after difficult days.",
          beginnerNote: "Use this whenever either partner feels mentally overloaded.",
          advancedNote: "Add synchronized pelvic floor softening on every exhale.",
        },
        {
          title: "Orbit of Warmth (8 minutes)",
          setup: "Sit with gentle contact and relaxed posture.",
          steps: [
            "Move attention through chest, belly, pelvis, spine.",
            "Breathe three rounds in each region.",
            "Share one place that softened.",
          ],
          integration: "Builds full-body erotic sensitivity.",
          beginnerNote: "Keep it simple: chest, belly, pelvis only for your first week.",
          advancedNote: "Add spine and throat pathways for finer energetic circulation.",
        },
        {
          title: "Soft Rhythm Exchange (10 minutes)",
          setup: "Choose one non-goal touch pattern.",
          steps: [
            "Partner A sets slow rhythm for five minutes.",
            "Partner B mirrors exactly, then switch.",
            "Keep intensity under 6/10.",
          ],
          integration: "Trains pace control and shared regulation.",
          beginnerNote: "Use timer cues so neither partner has to manage duration mentally.",
          advancedNote: "Introduce micro-pauses every 60 seconds to heighten sensitivity.",
        },
        {
          title: "Partner Grounding Spiral (7 minutes)",
          setup: "Sit back-to-back and coordinate breath with subtle spine movement.",
          steps: [
            "Inhale and lengthen through spine together.",
            "Exhale and soften shoulders, jaw, and pelvis.",
            "End by naming one word for your current relational state.",
          ],
          integration: "Excellent before difficult conversations or evening reconnection.",
          beginnerNote: "Stay small and gentle with movement; breath quality matters more than range.",
          advancedNote: "Add synchronized hum on exhale to deepen vagal settling.",
        },
      ],
      reflections: [
        "Where are we depleting ourselves in intimacy?",
        "What would calmer pacing change for us?",
        "How does my body signal that I need slower rhythm?",
        "What helps me feel replenished after closeness?",
        "What is one Tao rhythm we could make our default weeknight reconnect?",
        "How can we preserve attraction while lowering pressure?",
        "Which moments in our intimacy currently feel forced rather than flowing?",
      ],
      relatedAuthors: [
        { name: "Mantak Chia", tier: "premium", note: "Taoist circulation and alchemy." },
        { name: "Osho", tier: "free", note: "Awareness and embodied regulation." },
        { name: "Michaela Boehm", tier: "premium", note: "Somatic relational grounding." },
        { name: "Barry Long", tier: "premium", note: "Simplicity and relational integrity in intimate practice." },
      ],
      premiumBanner:
        "Unlock advanced Tao pathways with partner breathing maps, circulation drills, and sensual longevity sequences that protect attraction while preserving your energy.",
    },
  },
  {
    slug: "kama-sutra",
    name: "Kama Sutra",
    tier: "premium",
    oneLine: "Ancient arts of cultivated desire, atmosphere, and elegant erotic expression.",
    overviewLine: "Premium path for couples practicing sensual refinement in service of sacred love.",
    icon: Crown,
    iconClass: "text-amber-300",
    teaser: [
      "Go far beyond positions into mood, anticipation, and relational erotic design for modern couples.",
      "Learn to make desire intentional, beautiful, and emotionally connected.",
      "Premium includes structured rituals, scripts, and guided progression you can actually sustain.",
    ],
  },
  {
    slug: "polarity",
    name: "Polarity",
    tier: "premium",
    oneLine: "Conscious energetic contrast that restores magnetic charge in long-term partnership.",
    overviewLine: "Premium path for couples rebuilding erotic tension, edge, and devotion safely.",
    icon: Flame,
    iconClass: "text-rose-300",
    teaser: [
      "Rebuild attraction where affection remains but charge has flattened.",
      "Train leading and receiving dynamics with consent, precision, and emotional care.",
      "Premium includes progressive drills and relational scripts for modern couples.",
    ],
  },
  {
    slug: "sacred-desire",
    name: "Sacred Desire",
    tier: "premium",
    oneLine: "A devotional-erotic path for couples cultivating longing, reverence, and embodied magnetism.",
    overviewLine: "Premium path for couples who want intimacy to feel sacred, alive, and deeply connected.",
    icon: Heart,
    iconClass: "text-orange-300",
    teaser: [
      "Integrate longing, tenderness, and erotic intensity without fragmentation.",
      "Learn devotional practices that keep desire emotionally connected in daily life.",
      "Premium includes advanced rituals, pacing maps, and partner prompts for sacred partnership.",
    ],
  },
  {
    slug: "shamanism",
    name: "Shamanism",
    tier: "premium",
    oneLine: "Ecstatic ritual and energetic channeling through direct spiritual experience for couples.",
    overviewLine: "Premium path exploring altered-state practice, energy work, and bonded sacred ceremony.",
    icon: Flame,
    iconClass: "text-orange-300",
    teaser: [
      "Explore shamanic journey frameworks for relational and energetic transformation.",
      "Bridge trance, ritual, and embodied intimacy in a grounded modern context.",
      "Premium includes safety-first ceremonial maps, partner prompts, and integration guides for couples.",
    ],
  },
  {
    slug: "neo-tantra",
    name: "Neo-Tantra",
    tier: "premium",
    oneLine: "A modern synthesis of classical Tantra and contemporary psychological insight for couples.",
    overviewLine: "Premium path focused on sacred sexuality, shared empowerment, and conscious intimacy.",
    icon: Sparkles,
    iconClass: "text-fuchsia-300",
    teaser: [
      "Blend ancient tantric principles with modern relational and therapeutic language.",
      "Practice intimacy as both personal healing and bonded erotic awakening.",
      "Premium includes guided modules, communication scripts, and integration sequences for partners.",
    ],
  },
  {
    slug: "qigong-neidan",
    name: "Qigong & Neidan",
    tier: "premium",
    oneLine: "Internal alchemy practices for cultivating, storing, and circulating life-force in partnership.",
    overviewLine: "Premium path for vitality, longevity, and refined energetic couple practice.",
    icon: Waves,
    iconClass: "text-cyan-300",
    teaser: [
      "Learn partner-aware Qi cultivation and internal alchemy foundations.",
      "Develop circulation patterns that support both health and sensual depth.",
      "Premium includes stepwise energetic training maps and co-practice protocols for long-term love.",
    ],
  },
  {
    slug: "kundalini-kriya-yoga",
    name: "Kundalini / Kriya Yoga",
    tier: "premium",
    oneLine: "Awakening and directing latent energy through breath, bandha, and meditative discipline.",
    overviewLine: "Premium path for chakra-oriented energetic ascent with grounded couple integration.",
    icon: Flame,
    iconClass: "text-rose-300",
    teaser: [
      "Work with structured kriya and kundalini-oriented energy awakening principles.",
      "Integrate spinal energy cultivation with relational grounding and consent.",
      "Premium includes guided progression, pacing safeguards, and integration practices for modern partners.",
    ],
  },
  {
    slug: "sufism",
    name: "Sufism",
    tier: "premium",
    oneLine: "Heart-centered mysticism through remembrance, devotion, and direct divine experience.",
    overviewLine: "Premium path for sacred love, embodied remembrance, and heart-led couple intimacy.",
    icon: Heart,
    iconClass: "text-emerald-300",
    teaser: [
      "Explore dhikr-inspired presence practices for couples and contemplative lovers.",
      "Unite heart devotion, music, movement, and surrendered awareness.",
      "Premium includes guided devotional sequences and relational integration prompts for daily closeness.",
    ],
  },
  {
    slug: "buddhism-forum",
    name: "Buddhism Forum",
    tier: "premium",
    oneLine: "Contemplative relational path emphasizing awareness, compassion, and ethical intimacy.",
    overviewLine: "Premium path for mindful partnership, direct experience, and disciplined shared growth.",
    icon: Crown,
    iconClass: "text-violet-300",
    teaser: [
      "Develop meditation-informed intimacy with compassion-centered communication.",
      "Work with attachment, reactivity, and desire through mindful relational practice.",
      "Premium includes contemplative partner protocols and integration frameworks for modern couples.",
    ],
  },
  {
    slug: "vajrayana-kashmir-shaivism",
    name: "Vajrayana & Kashmir Shaivism",
    tier: "premium",
    oneLine: "Diamond-vehicle energy transformation meets non-dual recognition of divine consciousness.",
    overviewLine: "Premium path combining Vajrayana and Shaivism for couples seeking sacred, embodied intimacy.",
    icon: Crown,
    iconClass: "text-indigo-300",
    teaser: [
      "Work with mantra, visualization, channels, winds, and meditative concentration responsibly.",
      "Integrate recognition-based Kashmir Shaivism practice into modern relational intimacy.",
      "Premium includes safety-aware energetic sequencing and deep integration maps for couple practice.",
    ],
  },
];

const pathUpgradeCopy: Record<
  string,
  {
    headline: string;
    benefit: string;
    bullets: string[];
    cta: string;
  }
> = {
  tantra: {
    headline: "Turn sacred intimacy into a lived weekly rhythm.",
    benefit: "Move from occasional depth to a repeatable couple practice that keeps trust, devotion, and desire aligned.",
    bullets: [
      "Guided tantric audio journeys with breath pacing, attunement cues, and polarity calibration.",
      "Progressive partner rituals with devotion prompts and integration checkpoints.",
      "Advanced consent and emotional-safety maps for deeper erotic trust.",
    ],
    cta: "Unlock Tantric Premium",
  },
  tao: {
    headline: "Protect your energy while deepening desire.",
    benefit: "Learn partner-ready Tao pacing so intimacy feels replenishing instead of draining.",
    bullets: [
      "Circulation sequences for stress-heavy weeks and low-energy evenings.",
      "Longevity drills for erotic vitality, softness, and sustainable sensual charge.",
      "Step-by-step Tao progression from calming reset to advanced partner flow.",
    ],
    cta: "Unlock Tao Premium",
  },
  "kama-sutra": {
    headline: "Make desire intentional, elegant, and emotionally connected.",
    benefit: "Go beyond positions into mood design, anticipation, and relational erotic craft.",
    bullets: [
      "Atmosphere frameworks for building anticipation before touch starts.",
      "Guided scripts for sensual communication, consent, and pacing.",
      "Progressive couple rituals that turn chemistry into a reliable art.",
    ],
    cta: "Unlock Kama Sutra Premium",
  },
  polarity: {
    headline: "Rebuild magnetic charge without emotional chaos.",
    benefit: "Use clear leading-receiving structures that restore attraction while preserving safety.",
    bullets: [
      "Consent-first polarity drills for real long-term relationships.",
      "Truth-and-devotion scripts that prevent shutdown and defensiveness.",
      "Progressive edge training that keeps tenderness fully intact.",
    ],
    cta: "Unlock Polarity Premium",
  },
  "sacred-desire": {
    headline: "Let longing become a devotional force between you.",
    benefit: "Blend reverence, tenderness, and erotic intensity in one coherent couple practice.",
    bullets: [
      "Ritual maps for building anticipation and emotional resonance.",
      "Guided partner sequences for embodied magnetism and trust.",
      "Integration prompts that carry sacred intimacy into daily life.",
    ],
    cta: "Unlock Sacred Desire Premium",
  },
  shamanism: {
    headline: "Explore altered-state intimacy with grounded structure.",
    benefit: "Use ceremony responsibly so intensity deepens connection instead of destabilizing it.",
    bullets: [
      "Safety-first ceremonial frameworks for partner practice.",
      "Guided energetic rituals with clear pacing and closure.",
      "Integration paths that convert peak moments into lasting trust.",
    ],
    cta: "Unlock Shamanism Premium",
  },
  "neo-tantra": {
    headline: "Modernize sacred sexuality without losing depth.",
    benefit: "Combine classical tantric principles with clear modern relationship language.",
    bullets: [
      "Module-based partner journeys from basics to advanced practice.",
      "Communication scripts that keep vulnerability embodied and practical.",
      "Progression maps linking intimacy, healing, and relational growth.",
    ],
    cta: "Unlock Neo-Tantra Premium",
  },
  "qigong-neidan": {
    headline: "Build couple vitality that lasts.",
    benefit: "Train circulation, grounding, and internal energy care as shared relationship skills.",
    bullets: [
      "Partner-aware qi cultivation and conservation sequences.",
      "Guided full-body circulation drills for sensual resilience.",
      "Long-range vitality routines for sustained intimacy over years.",
    ],
    cta: "Unlock Qigong & Neidan Premium",
  },
  "kundalini-kriya-yoga": {
    headline: "Channel intensity with discipline and care.",
    benefit: "Work with awakening practices in a paced, consent-aware couple container.",
    bullets: [
      "Structured breath and bandha progressions for partners.",
      "Activation safeguards with grounding and recovery protocols.",
      "Integration guidance for translating energy work into daily intimacy.",
    ],
    cta: "Unlock Kundalini / Kriya Premium",
  },
  sufism: {
    headline: "Let heart devotion shape daily intimacy.",
    benefit: "Turn remembrance, tenderness, and sacred attention into shared relational practice.",
    bullets: [
      "Guided heart-centered rituals for emotional and spiritual bonding.",
      "Devotional prompts that deepen affection without performance pressure.",
      "Practice tracks that anchor spiritual love in everyday partnership.",
    ],
    cta: "Unlock Sufism Premium",
  },
  "buddhism-forum": {
    headline: "Bring mindful compassion into your hardest moments.",
    benefit: "Use contemplative discipline to reduce reactivity and strengthen relational clarity.",
    bullets: [
      "Partner meditative protocols for conflict and repair windows.",
      "Attachment-aware reflection sequences for steady emotional growth.",
      "Ethical intimacy frameworks for trust, honesty, and long-term alignment.",
    ],
    cta: "Unlock Buddhism Premium",
  },
  "vajrayana-kashmir-shaivism": {
    headline: "Integrate subtle energy and non-dual intimacy with precision.",
    benefit: "Study advanced sacred frameworks inside a grounded modern couple pathway.",
    bullets: [
      "Guided mantra, visualization, and channel-awareness progression.",
      "Recognition-based Shaivism practices adapted for relational life.",
      "Safety-aware sequencing that protects emotional and energetic stability.",
    ],
    cta: "Unlock Vajrayana & Shaivism Premium",
  },
};

const shellCardClass =
  "rounded-[28px] border border-border/30 bg-card/45 p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.46)]";

const tierBadgeClass: Record<Tier, string> = {
  free: "border-amber-400/30 bg-amber-500/12 text-amber-200",
  premium: "border-amber-400/30 bg-amber-500/12 text-amber-200",
};

const TierBadge = ({ tier }: { tier: Tier }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${tierBadgeClass[tier]}`}>
    {tier === "free" ? <LockOpen className="h-3.5 w-3.5" aria-label="Open access" /> : <Lock className="h-3.5 w-3.5" aria-label="Locked" />}
  </span>
);

const PathHeroCard = ({ path }: { path: PathDetail }) => {
  const Icon = path.icon;
  return (
    <section className={shellCardClass}>
      <div className="flex items-start justify-between gap-3">
        <div className={`inline-flex rounded-2xl border border-border/30 bg-background/55 p-3 ${path.iconClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <TierBadge tier={path.tier} />
      </div>
      <h2 className="mt-4 font-display text-3xl text-foreground">{path.name}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{path.oneLine}</p>
      <p className="mt-3 text-sm leading-6 text-foreground/90">{path.overviewLine}</p>
      {path.tier === "premium" ? (
        <Link
          to="/pricing"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/18"
        >
          <Lock className="h-4 w-4" />
          Unlock this couple path journey
        </Link>
      ) : null}
    </section>
  );
};

const PremiumMiniCard = ({ path }: { path: PathDetail }) => {
  const upgradeCopy = pathUpgradeCopy[path.slug] ?? {
    benefit: "Add guided depth, clearer progression, and stronger partner integration.",
  };

  const miniLine = path.tier === "free"
    ? path.content?.premiumBanner ?? upgradeCopy.benefit
    : upgradeCopy.benefit;

  return (
  <section className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.24),transparent_55%),linear-gradient(135deg,rgba(245,158,11,0.18),rgba(15,23,42,0.15))] p-4 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.62)]">
    <div className="flex items-center gap-2 text-amber-200">
      <Lock className="h-4 w-4" />
      <span className="text-xs uppercase tracking-[0.16em]">Locked</span>
    </div>
    <p className="mt-3 text-sm leading-6 text-foreground/90">
      {miniLine}
    </p>
    <div className="mt-3 flex flex-wrap gap-2">
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Guided Tracks</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Energy Maps</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Sacred Love Library</span>
    </div>
    <Link
      to="/pricing"
      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-500/14 px-3 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
    >
      View plans and trial
      <ArrowRight className="h-4 w-4" />
    </Link>
  </section>
  );
};

const PathPremiumBlock = ({ path }: { path: PathDetail }) => {
  const upgradeCopy = pathUpgradeCopy[path.slug] ?? {
    headline: `Go deeper with ${path.name}`,
    benefit: "Add guided depth, clearer progression, and stronger partner integration.",
    bullets: [
      "Layered lessons translated for real modern couple life.",
      "Stepwise practice progression with practical implementation prompts.",
      "Cross-library bridges into Authors and Reconnect for continuity.",
    ],
    cta: "Unlock Premium Path",
  };

  return (
    <section className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_58%),linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,23,42,0.08))] p-5 shadow-[0_20px_60px_-42px_rgba(255,173,70,0.58)]">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-300">8. Premium Value</p>
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
      <Link
        to="/pricing"
        className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-500/14 px-4 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
      >
        {upgradeCopy.cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
};

const FreePathContent = ({ path }: { path: PathDetail }) => {
  if (!path.content) return null;

  const data = path.content;

  return (
    <main className="space-y-5">
      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">What This Path Is</p>
        <h3 className="mt-2 font-display text-3xl text-foreground">{path.name}</h3>
        <div className="mt-4 space-y-3 text-sm leading-7 text-foreground/90">
          {data.hero.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <blockquote className="mt-5 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm leading-7 text-foreground/90">
          “{data.quote.text}”
          <footer className="mt-2 text-xs uppercase tracking-[0.14em] text-primary/80">{data.quote.source}</footer>
        </blockquote>
      </section>

      {data.whyMatters?.length ? (
        <section className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Why It Matters For Couples</p>
          <div className="mt-4 space-y-3">
            {data.whyMatters.map((line) => (
              <div key={line} className="flex items-start gap-3 text-sm leading-7 text-foreground/90">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{line}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.whoItsFor?.length ? (
        <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Who It Is For</p>
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
        <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Concrete Practice Preview</p>
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
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What This Path Is Not</p>
        <div className="mt-4 space-y-3">
          {data.whatItIsNot.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground/90">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Core Pillars</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {data.pillars.map((pillar, index) => (
            <article key={pillar.name} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-primary/80">Pillar {index + 1}</p>
              <h4 className="mt-2 font-body text-sm text-foreground">{pillar.name}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Why It Matters In Modern Relationship Life</p>
        <div className="mt-4 space-y-3">
          {data.modernCouples.map((item) => (
            <article key={item.title} className="rounded-2xl border border-primary/20 bg-background/50 p-4">
              <h4 className="font-body text-sm text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {data.beginnerTrack || data.advancedTrack ? (
        <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Beginner And Advanced Path</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {data.beginnerTrack ? (
              <article className="rounded-2xl border border-emerald-300/25 bg-emerald-500/8 p-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-200">Beginner</p>
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
                <p className="text-[11px] uppercase tracking-[0.14em] text-amber-200">Advanced</p>
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
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Common Misunderstandings</p>
        <div className="mt-4 space-y-3">
          {data.misunderstandings.map((item) => (
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
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Practices You Can Run Tonight</p>
        <div className="mt-4 space-y-4">
          {data.practices.map((practice, index) => (
            <article key={practice.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-primary/80">Practice {index + 1}</p>
              <h4 className="mt-2 font-body text-sm text-foreground">{practice.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{practice.setup}</p>
              <div className="mt-3 space-y-2">
                {practice.steps.map((step) => (
                  <div key={step} className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              {practice.beginnerNote ? <p className="mt-3 text-sm leading-6 text-emerald-200/90">Beginner: {practice.beginnerNote}</p> : null}
              {practice.advancedNote ? <p className="mt-1 text-sm leading-6 text-amber-200/90">Advanced: {practice.advancedNote}</p> : null}
              <p className="mt-3 text-sm leading-6 text-primary/85">Integration: {practice.integration}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Reflection Prompts</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {data.reflections.map((prompt) => (
            <article key={prompt} className="rounded-2xl border border-border/25 bg-card/35 p-4 text-sm leading-7 text-foreground/90">
              {prompt}
            </article>
          ))}
        </div>
      </section>

      <PathPremiumBlock path={path} />
    </main>
  );
};

const PremiumPathContent = ({ path }: { path: PathDetail }) => (
  <main className="space-y-5">
    <section className="rounded-[28px] border border-amber-400/20 bg-gradient-to-br from-amber-500/12 via-background to-background p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.5)]">
      <div className="flex items-center gap-2">
        <TierBadge tier="premium" />
        <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-amber-200">
          Locked Path
        </span>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-primary/80">What This Path Is</p>
      <h3 className="mt-2 font-display text-3xl text-foreground">{path.name}</h3>
      <p className="mt-3 text-sm leading-7 text-foreground/90">{path.oneLine}</p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{path.overviewLine}</p>
      <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
        {path.teaser?.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <Link
        to="/pricing"
        className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/18"
      >
        <Lock className="h-4 w-4" />
        Unlock this path journey
      </Link>
    </section>

    <section className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Why It Matters For Couples</p>
      <div className="mt-4 space-y-2">
        <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Translate ancient philosophy into a structured modern intimacy path you can actually sustain.</span>
        </div>
        <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Move from episodic closeness into progressive relationship growth with shared language and pacing.</span>
        </div>
        <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Protect attraction, emotional trust, and spiritual depth at the same time.</span>
        </div>
      </div>
    </section>

    <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Who This Is For</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Couples with stable love but unclear direction</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Use a structured premium path to create continuity and momentum.</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Couples rebuilding trust in intimacy</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Get pacing safeguards, progressive scripts, and grounded relational guardrails.</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Couples seeking advanced erotic-spiritual depth</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Access layered modules that blend desire, devotion, and embodied awareness.</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Couples wanting long-term progression</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Map each phase from first practices to deeper couple integration.</p>
        </article>
      </div>
    </section>

    <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Concrete Practice Preview</p>
      <h4 className="mt-2 font-display text-2xl text-foreground">Premium path orientation sequence</h4>
      <p className="mt-2 text-sm leading-7 text-foreground/90">
        A structured first-night sequence that calibrates emotional safety, sensual pace, and relational intention before deeper modules.
      </p>
      <div className="mt-3 space-y-2">
        <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Set one relationship intention and one embodied intention for tonight.</span>
        </div>
        <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Run guided breath and touch pacing according to the path module structure.</span>
        </div>
        <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Close with a two-minute integration check so the next module fits your actual couple state.</span>
        </div>
      </div>
    </section>

    <PathPremiumBlock path={path} />
  </main>
);

const MobileDetailHeader = ({
  title,
  tier,
  onBack,
}: {
  title: string;
  tier: Tier;
  onBack: () => void;
}) => (
  <div className="sticky top-2 z-30 rounded-2xl border border-border/40 bg-background/95 p-3 shadow-[0_16px_40px_-32px_rgba(0,0,0,0.7)] backdrop-blur">
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        className="rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-xs uppercase tracking-[0.14em] text-foreground"
      >
        Back to Library
      </button>
      <div className="min-w-0 flex-1 text-right">
        <p className="truncate font-display text-lg text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{tier === "free" ? "Open access" : "Locked in premium"}</p>
      </div>
      <TierBadge tier={tier} />
    </div>
  </div>
);

const RelatedPathCarousel = ({
  items,
  onSelect,
}: {
  items: PathDetail[];
  onSelect: (slug: string) => void;
}) => (
  <section className="rounded-[24px] border border-border/30 bg-card/40 p-4">
    <p className="text-xs uppercase tracking-[0.18em] text-primary/80">Related Paths</p>
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
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.oneLine}</p>
          </button>
        );
      })}
    </div>
  </section>
);

const Paths = () => {
  const isMobile = useIsMobile();
  const [selectedSlug, setSelectedSlug] = useState(pathDetails[0].slug);
  const [mobileDetailMode, setMobileDetailMode] = useState(false);
  const selected = useMemo(() => pathDetails.find((path) => path.slug === selectedSlug) ?? pathDetails[0], [selectedSlug]);

  const freeCount = pathDetails.filter((path) => path.tier === "free").length;
  const premiumCount = pathDetails.filter((path) => path.tier === "premium").length;
  const relatedPaths = pathDetails.filter((path) => path.slug !== selectedSlug).slice(0, 6);
  const showBrowse = !isMobile || !mobileDetailMode;
  const showDetail = !isMobile || mobileDetailMode;

  useSeoMetadata({
    title: `Paths Library - ${selected.name}`,
    description: selected.overviewLine,
    path: "/app/paths",
    surface: "app",
    noIndex: true,
  });

  useEffect(() => {
    if (!isMobile && mobileDetailMode) {
      setMobileDetailMode(false);
    }
  }, [isMobile, mobileDetailMode]);

  const handleSelectPath = (slug: string) => {
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
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Library · Paths</p>
          <h1 className="mt-3 font-display text-3xl text-foreground md:text-5xl">Ancient pathways translated for modern couples</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            Start with a quick insight you can use immediately, then go deeper as a couple when you have space. Each path helps you move from information to real closeness.
          </p>
        </div>

        <div className="mt-6 w-full rounded-[24px] border border-border/30 bg-card/45 p-4">
          <div className="text-xs uppercase tracking-[0.22em] text-primary/80">Sacred pages</div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {libraryPages.map((page) => {
              const Icon = page.icon;
              const active = page.to === "/app/paths";
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
                  <div className="mt-3 font-display text-xl text-foreground">{page.label}</div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{page.subtitle}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      ) : null}

      {showBrowse ? (
      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Paths Overview</p>
        <h2 className="mt-2 font-display text-3xl text-foreground">Choose a path for immediate closeness and long-term sacred growth</h2>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {pathDetails.map((path) => {
            const Icon = path.icon;
            const isSelected = selectedSlug === path.slug;
            return (
              <button
                key={path.slug}
                type="button"
                onClick={() => handleSelectPath(path.slug)}
                className={`rounded-[24px] border p-4 text-left transition-all ${
                  isSelected
                    ? "border-primary/30 bg-primary/10 shadow-[0_16px_50px_-40px_rgba(255,173,70,0.45)]"
                    : "border-border/30 bg-background/45 hover:border-primary/20 hover:bg-card/55"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${path.iconClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <TierBadge tier={path.tier} />
                </div>
                <h3 className="mt-3 font-display text-2xl text-foreground">{path.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{path.oneLine}</p>
                <p className="mt-2 text-xs leading-5 text-foreground/80">
                  {path.tier === "free"
                    ? `Practice preview: ${path.content?.practices[0]?.title ?? "Foundational couple exercise"}`
                    : `Premium preview: ${path.teaser?.[0] ?? "Deep guided path content"}`}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">Open-access Paths</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{freeCount} fully open paths so couples can apply wisdom now and reconnect in the same moment.</p>
          </div>
          <div className="rounded-2xl border border-amber-400/25 bg-amber-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-amber-200">Locked Paths</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{premiumCount} locked paths for deeper inspiration, richer guidance, and a structured journey toward sacred love.</p>
          </div>
        </div>
      </section>
      ) : null}

      {showDetail ? (
      <section className={`${isMobile ? "space-y-4" : "grid items-start gap-6 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]"}`}>
        {isMobile ? <MobileDetailHeader title={selected.name} tier={selected.tier} onBack={() => setMobileDetailMode(false)} /> : null}

        <aside className="space-y-4 lg:sticky lg:top-24">
          <PathHeroCard path={selected} />
          <PremiumMiniCard path={selected} />
        </aside>

        <div className="space-y-4">
          {selected.tier === "free" ? <FreePathContent path={selected} /> : <PremiumPathContent path={selected} />}
          {isMobile ? <RelatedPathCarousel items={relatedPaths} onSelect={handleSelectPath} /> : null}
        </div>
      </section>
      ) : null}
    </div>
  );
};

export default Paths;
