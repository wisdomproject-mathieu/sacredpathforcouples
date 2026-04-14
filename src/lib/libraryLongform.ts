export type LongformPracticePreview = {
  title: string;
  durationMinutes?: number;
  description: string;
};

export type LongformAuthor = {
  tagline: string;
  tradition: string;
  shortDescription: string;
  fullDescription: string;
  practicePreview?: LongformPracticePreview | null;
  premiumPreview: string;
  coreThemes: string[];
  keyWorks: string[];
};

export type LongformPillar = {
  id: string;
  label: string;
  title: string;
  body: string;
};

export type LongformPremiumFeature = {
  id: string;
  label: string;
  description: string;
};

export type LongformPath = {
  tagline: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  forCouples: string;
  sacredInvitation: {
    title: string;
    body: string;
    resonances: string[];
  };
  pillars: LongformPillar[];
  premiumFeatures: LongformPremiumFeature[];
};

export const AUTHOR_LONGFORM_BY_SLUG: Record<string, LongformAuthor> = {
  deida: {
    tagline: "The living edge of love, presence, and polarity",
    tradition: "Sacred Masculinity and Conscious Polarity",
    shortDescription:
      "The teacher who gave modern couples a language for what desire requires and why it fades when polarity collapses.",
    fullDescription:
      "David Deida draws from Zen, Tantra, and decades of direct relational teaching to name a core modern dilemma: couples can become fair, loving, and safe, yet lose erotic charge. His central lens is polarity as a living energetic contrast, not a fixed role script.\n\nIn practice, his work is less about performance and more about being: directed presence, honest truth, and devotional offering. The invitation is to keep equality and emotional safety while restoring magnetic aliveness between two people.",
    practicePreview: {
      title: "Directional Breath Frame",
      durationMinutes: 8,
      description:
        "One partner holds clear directional presence while the other receives and expands. Then switch. Close in shared equal breath to integrate charge with tenderness.",
    },
    premiumPreview:
      "Enter Deida's full map of intimacy stages, polarity restoration, and devotion-in-action practices for long-term couples.",
    coreThemes: ["Polarity", "Masculine presence", "Feminine radiance", "The edge", "Spiritual intimacy", "Stage Three love"],
    keyWorks: ["The Way of the Superior Man", "Blue Truth", "Finding God Through Sex", "Dear Lover", "Intimate Communion", "Wild Nights"],
  },
  osho: {
    tagline: "Where meditation and love are the same path",
    tradition: "Tantric Meditation and Sacred Awareness",
    shortDescription:
      "The teacher who refused the split between spiritual life and erotic life and showed why presence is the missing ingredient in intimacy.",
    fullDescription:
      "Osho's relationship teachings are rooted in awareness first. He taught that two people who are not present cannot create real intimacy, only a simulation of closeness.\n\nHis practical translation for couples is direct: witness breath, sensation, thought, and desire without grasping. As presence deepens, touch becomes less performative and more alive, and love becomes a state of being rather than a mood.",
    practicePreview: {
      title: "Witnessing Breath",
      durationMinutes: 7,
      description:
        "Sit face to face, soften effort, and witness the beloved's breath with no agenda. Return to witnessing whenever mind pulls toward control or performance.",
    },
    premiumPreview:
      "Explore a complete awareness-based path from mechanical sexuality toward meditative intimacy and embodied prayer.",
    coreThemes: ["Presence", "Witnessing", "Sacred sexuality", "Meditation in love", "Non-grasping", "Love as liberation"],
    keyWorks: ["Tantra: The Supreme Understanding", "The Book of Secrets", "Tantric Love", "Love Sex Prayer", "From Sex to Superconsciousness", "Being in Love"],
  },
  "mantak-chia": {
    tagline: "Sexual energy as intimate life force",
    tradition: "Taoist Sexual Alchemy and Universal Tao",
    shortDescription:
      "The teacher who translated Taoist sexual classics into practical cultivation methods for modern couples.",
    fullDescription:
      "Mantak Chia's Taoist framework treats sexual energy as vital essence, not only erotic impulse. The emphasis is not suppression, but circulation and refinement, so intimacy nourishes rather than depletes.\n\nFor couples, this means pacing, breath, and subtle energetic awareness. Over time, practices like the Microcosmic Orbit support vitality, steadier attraction, and longer relational stamina.",
    practicePreview: null,
    premiumPreview:
      "Learn couple-based circulation methods, valley-style orgasmic expansion, and longevity-oriented Tao pathways adapted for modern partnership.",
    coreThemes: ["Jing cultivation", "Microcosmic Orbit", "Healing love", "Sexual alchemy", "Valley orgasm", "Taoist chi kung"],
    keyWorks: ["The Multi-Orgasmic Couple", "Healing Love Through the Tao", "The Multi-Orgasmic Man", "Sexual Reflexology", "Taoist Secrets of Love", "The Multi-Orgasmic Woman"],
  },
  "diana-richardson": {
    tagline: "Stillness as deep erotic intelligence",
    tradition: "Slow Sex and Tantric Presence",
    shortDescription:
      "The teacher who showed couples that slowing down is often the fastest way back to real intimacy.",
    fullDescription:
      "Diana Richardson's Slow Sex approach challenges the habit of chasing intensity. Her core proposal is that stillness, relaxation, and inner awareness open dimensions of sensation and connection that effort cannot produce.\n\nThis work is especially potent for couples exhausted by performance pressure. It restores body trust, lowers anxiety, and helps desire emerge from presence instead of force.",
    practicePreview: null,
    premiumPreview:
      "Access complete Slow Sex pathways for non-goal lovemaking, deep body awareness, and sustainable erotic connection.",
    coreThemes: ["Slow Sex", "Tantric stillness", "Internal awareness", "Non-goal lovemaking", "Body intelligence", "Dissolving performance"],
    keyWorks: ["Slow Sex: The Path to Fulfilling and Sustainable Sexuality", "The Heart of Tantric Sex", "Tantric Orgasm for Women", "Conscious Men", "Tantric Love: Feeling versus Emotion"],
  },
  "margot-anand": {
    tagline: "Ecstasy as quality of presence",
    tradition: "SkyDancing Tantra",
    shortDescription:
      "The teacher who made ritual atmosphere, beauty, and sacred sensuality practical for everyday couples.",
    fullDescription:
      "Margot Anand's work integrates Tantra, ritual intelligence, and somatic preparation. A central contribution is teaching couples how to prepare internal and external space before intimacy begins.\n\nThat preparation changes the entire nervous-system field: less rushed contact, more reverence, and deeper embodied availability. In this approach, atmosphere is not decoration, it is part of the practice.",
    practicePreview: null,
    premiumPreview:
      "Unlock SkyDancing-based ceremonial sequences, chakra-oriented couple practices, and sacred-space preparation frameworks.",
    coreThemes: ["Sacred space", "Chakra awakening", "Erotic ritual", "Somatic safety", "Ecstatic presence", "SkyDancing"],
    keyWorks: ["The Art of Sexual Ecstasy", "The Art of Everyday Ecstasy", "Sexual Secrets for Women", "Love, Sex, and Awakening"],
  },
  "daniel-odier": {
    tagline: "Desire as doorway to non-dual awareness",
    tradition: "Kashmir Shaivism Tantra",
    shortDescription:
      "A lineage-grounded teacher of non-dual tantra, subtle touch, and awareness-led erotic presence.",
    fullDescription:
      "Daniel Odier's transmission emphasizes direct recognition rather than performance. In this view, desire is not an obstacle but a movement of consciousness when met without grasping.\n\nHis couple practice style is subtle and precise: deep listening, minimal force, and high awareness. The result is less spectacle and more depth.",
    practicePreview: null,
    premiumPreview:
      "Explore non-grasping reception, subtle-touch practices, and Shaivist recognition methods adapted to couple intimacy.",
    coreThemes: ["Non-dual awareness", "Spanda", "Subtle touch", "Desire as sacred", "Kashmir Shaivism", "Non-grasping"],
    keyWorks: ["Tantric Quest", "Desire: The Tantric Path to Awakening", "Yoga Spandakarika", "Tantric Kali", "The Doors of Joy"],
  },
  "michaela-boehm": {
    tagline: "Nervous system truth for lasting eros",
    tradition: "Somatic Tantra and Relational Nervous System Work",
    shortDescription:
      "A teacher who integrates somatic precision and tantric depth to help couples build real safety and real desire.",
    fullDescription:
      "Michaela Boehm's core insight is practical: many erotic struggles are nervous-system struggles first. If the body is not truly safe, desire does not stabilize.\n\nHer work teaches partners to track authentic yes/no signals, regulate activation, and create conditions where eros can emerge naturally. This shifts couples from pressure to attunement.",
    practicePreview: null,
    premiumPreview:
      "Access body-led regulation drills, relational attunement protocols, and non-linear movement integrations for couples.",
    coreThemes: ["Nervous system safety", "Non-linear sexuality", "Somatic embodiment", "Erotic presence", "Body-led intimacy", "Wild feminine"],
    keyWorks: ["The Wild Woman Book", "Non-Linear Movement Method Training", "Embodied Relationship Retreat Series"],
  },
  "barry-long": {
    tagline: "Stillness in love as spiritual practice",
    tradition: "Sacred Love and Mystical Union",
    shortDescription:
      "A radically clear voice on conscious lovemaking, truth, and inner stillness in long-term partnership.",
    fullDescription:
      "Barry Long taught that conscious lovemaking is not separate from meditation. His emphasis is uncompromising simplicity: less performance, more presence.\n\nIn couple work, this translates to inner quiet, honest contact, and disciplined relational integrity. The reward is not novelty, but depth that continues to unfold.",
    practicePreview: null,
    premiumPreview:
      "Learn stillness-based intimate practice, conscious closure, and truth-led relational forms inspired by Barry Long's teaching.",
    coreThemes: ["Stillness in eros", "Conscious lovemaking", "Love as presence", "Spiritual union", "Dissolving performance"],
    keyWorks: ["Making Love: Sexual Love the Divine Way", "To Woman in Love", "Knowing Yourself"],
  },
  "jan-day": {
    tagline: "Emotional truth as erotic foundation",
    tradition: "Conscious Relating and Somatic Tantra",
    shortDescription:
      "A guide for couples who want desire rooted in honesty, body-awareness, and courageous disclosure.",
    fullDescription:
      "Jan Day's relational work centers on body-led truth. She teaches that unresolved shame, defended expression, and emotional avoidance flatten intimacy over time.\n\nHer practices help couples disclose from sensation rather than accusation, creating contact that feels safer and more alive. This often restores attraction where technique alone fails.",
    practicePreview: null,
    premiumPreview:
      "Unlock body-led disclosure methods, shame-dissolution pathways, and repair practices that rebuild erotic trust.",
    coreThemes: ["Emotional courage", "Shame dissolution", "Body-led truth", "Erotic trust", "Conscious relating"],
    keyWorks: ["The New Intimacy", "Longwave Tantra", "Embodied Relating"],
  },
  "charles-muir": {
    tagline: "The body as sacred ceremonial space",
    tradition: "Heart Tantra and Sacred Healing",
    shortDescription:
      "A foundational western tantra teacher focused on reverence, ceremony, and healing partner practice.",
    fullDescription:
      "Charles Muir's approach emphasizes how partners enter and hold the relational field. Reverence is not poetic framing in this lineage - it is a practical state that transforms touch.\n\nHis honoring practices help dissolve performance anxiety and emotional armor by shifting contact from habit to ceremony. That shift often reopens trust and desire together.",
    practicePreview: null,
    premiumPreview:
      "Access honoring rituals, ceremony frameworks, and heart-centered tantric practice arcs from the Source School lineage.",
    coreThemes: ["Sacred reverence", "Heart Tantra", "Healing love", "Ceremony", "Body as temple", "Honoring practices"],
    keyWorks: ["Tantra: The Art of Conscious Loving", "Source School curriculum", "Heart Tantra teachings"],
  },
  "sally-kempton": {
    tagline: "Shakti as living relational energy",
    tradition: "Kashmir Shaivism and Tantric Meditation",
    shortDescription:
      "A clear modern voice translating Shaiva recognition practice into intimate relational life.",
    fullDescription:
      "Sally Kempton brought deep Shaiva scholarship into direct lived practice. Her teaching invites couples to experience the beloved as living Shakti, not as concept.\n\nThis lens makes intimacy both tender and luminous: ordinary moments become sites of recognition, reverence, and devotional awareness.",
    practicePreview: null,
    premiumPreview:
      "Explore non-dual partner meditations, recognition practices, and Shakti-centered contemplative intimacy pathways.",
    coreThemes: ["Shakti recognition", "Non-dual meditation", "Kashmir Shaivism", "Divine feminine", "Relationship as sadhana"],
    keyWorks: ["Awakening Shakti", "Meditation for the Love of It", "Doorways to the Infinite", "The Heart of Meditation"],
  },
  "max-bush": {
    tagline: "Erotic presence earned through awareness",
    tradition: "Embodied Masculine Eros",
    shortDescription:
      "Practical training in confident, attuned erotic leadership without performance posturing.",
    fullDescription:
      "Max Bush teaches the distinction between projected confidence and embodied presence. One can be performed; the other is felt in the partner's body as both safety and attraction.\n\nHis practices build moment-to-moment attunement, helping partners respond to real signals rather than fixed scripts. The result is cleaner confidence and deeper relational trust.",
    practicePreview: null,
    premiumPreview:
      "Get progression-based erotic attunement drills, leadership pacing protocols, and partner-safe confidence training.",
    coreThemes: ["Erotic attunement", "Conscious masculinity", "Somatic skill", "Relational integrity", "Embodied confidence"],
    keyWorks: [],
  },
  "victor-gold": {
    tagline: "Love refined through craft and devotion",
    tradition: "Sacred Erotic Craft and Conscious Form",
    shortDescription:
      "A craft-based approach to intimacy where attention quality matters more than novelty.",
    fullDescription:
      "Victor Gold's contribution is erotic craft: refining touch, pacing, and presence with the care of an art form. He frames routine not as lack of chemistry, but as lack of conscious attention.\n\nCouples in this work learn to arrive freshly in familiar forms. That shift turns repetition into depth and makes devotion practical.",
    practicePreview: null,
    premiumPreview:
      "Unlock advanced craft protocols for conscious erotic form, aesthetic sensuality, and devotion-led couple practice.",
    coreThemes: ["Erotic craft", "Creative presence", "Devotion", "Conscious form", "Sacred aesthetics", "Depth over novelty"],
    keyWorks: [],
  },
};

export const PATH_LONGFORM_BY_SLUG: Record<string, LongformPath> = {
  tantra: {
    tagline: "An ancient path translated for modern couples",
    subtitle: "Through breath, presence, polarity, and the sacred body",
    shortDescription: "A body-inclusive path where erotic aliveness and spiritual awareness develop together.",
    fullDescription:
      "Tantric practice treats the body as a doorway to consciousness rather than a distraction from it. For couples, this means pacing intimacy through breath, awareness, and consent so trust and desire can grow together.\n\nThe practical shift is from performance to practice: arrive, regulate, attune, and then intensify only when both partners are genuinely available.",
    forCouples: "For couples who want intimacy to feel conscious tonight and deepen over time.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls couples who feel that intimacy can be both sacred and practical. It serves pairs who want deeper presence, cleaner consent, and relational warmth without losing erotic current.",
      resonances: [
        "You want depth more than technique.",
        "You want to feel seen, not only desired.",
        "You want sacred language with practical steps.",
        "You are ready to move from rushing to attunement.",
      ],
    },
    pillars: [
      {
        id: "shiva_shakti",
        label: "SHIVA AND SHAKTI",
        title: "Sacred polarity",
        body: "Consciousness and energy meet as complementary currents. The quality of that meeting shapes desire and trust.",
      },
      {
        id: "prana",
        label: "PRANA",
        title: "Breath as bridge",
        body: "Breath regulates nervous systems and synchronizes relational presence before intensity rises.",
      },
      {
        id: "deha",
        label: "DEHA",
        title: "Body as temple",
        body: "Approach the beloved with reverence, patience, and curiosity. This transforms contact quality.",
      },
      {
        id: "bhakti",
        label: "BHAKTI",
        title: "Devotion",
        body: "Devotion is a discipline of attention and care, not only an emotion. It keeps eros connected to love.",
      },
      {
        id: "spanda",
        label: "SPANDA",
        title: "Divine pulse",
        body: "Recognize subtle aliveness already present between you and stay with it instead of forcing escalation.",
      },
    ],
    premiumFeatures: [
      { id: "guided_tracks", label: "GUIDED TRACKS", description: "Audio-led tantric couple sessions from short resets to deep evening rituals." },
      { id: "energy_maps", label: "ENERGY MAPS", description: "Visual subtle-body maps for practical use in partnered practice." },
      { id: "sacred_love_library", label: "SACRED LOVE LIBRARY", description: "Expanded lineage notes and deep links across relevant authors and traditions." },
    ],
  },
  tao: {
    tagline: "Sexual energy as vital medicine",
    subtitle: "Through circulation, refinement, and shared life force",
    shortDescription: "A Taoist path for couples who want intimacy to nourish vitality instead of draining it.",
    fullDescription:
      "Taoist intimacy views sexual energy as life force. The goal is not suppression and not over-discharge, but smart circulation that supports health, steadiness, and connection.\n\nThis path is especially valuable for stress-heavy life seasons. It teaches softness before escalation and continuity over peak-chasing.",
    forCouples: "For couples who want intimacy to leave both partners more alive and connected.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls couples who feel depletion after intimacy and want a more sustainable erotic rhythm built on flow, timing, and regulation.",
      resonances: [
        "You want replenishment, not crash cycles.",
        "You want practical energetic literacy.",
        "You want attraction with less pressure.",
        "You want long-term vitality as a couple practice.",
      ],
    },
    pillars: [
      { id: "jing", label: "JING", title: "Vital essence", body: "Treat sexual essence as a resource to cultivate and circulate." },
      { id: "chi", label: "CHI", title: "Life current", body: "Track and guide subtle energy through breath, attention, and coordinated pacing." },
      { id: "shen", label: "SHEN", title: "Spirit and luminosity", body: "Refine erotic energy into heartful presence and clearer consciousness." },
      { id: "orbit", label: "MICROCOSMIC ORBIT", title: "Shared circulation", body: "Create synchronized energetic loops that increase coherence and nourishment." },
      { id: "yin_yang", label: "YIN YANG", title: "Complementary balance", body: "Use dynamic balance of receptive and active qualities in both partners." },
    ],
    premiumFeatures: [
      { id: "chi_cultivation", label: "CHI CULTIVATION TRACKS", description: "Guided Taoist couple cultivation paths from foundations to advanced circulation." },
      { id: "meridian_maps", label: "MERIDIAN MAPS", description: "Readable meridian and organ-energy visuals for practical home practice." },
      { id: "chia_library", label: "MANTAK CHIA LIBRARY", description: "Deeper source pathways tied to classic Taoist couple cultivation teachings." },
    ],
  },
  polarity: {
    tagline: "The living charge between two people",
    subtitle: "Restoring magnetism through presence, direction, and radiance",
    shortDescription: "A polarity path for couples who are loving but want desire and energetic contrast alive again.",
    fullDescription:
      "Sacred polarity work restores contrast without rigid role scripts. It is about conscious energetic differentiation, consent, and emotional accountability.\n\nWhen practiced well, polarity brings back anticipation, attraction, and relational aliveness while preserving tenderness and safety.",
    forCouples: "For couples who want magnetic attraction to return without abandoning relational maturity.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls couples who feel relationally loyal but erotically flat and want to rebuild charge with integrity.",
      resonances: [
        "You want attraction without drama games.",
        "You want conscious lead-receive dynamics.",
        "You want devotion and desire in the same field.",
        "You are willing to practice, not just discuss.",
      ],
    },
    pillars: [
      { id: "presence", label: "PRESENCE", title: "Directed consciousness", body: "Presence that moves toward the beloved with steadiness and care." },
      { id: "radiance", label: "RADIANCE", title: "Luminous life force", body: "Expression that is alive, embodied, and relationally connected." },
      { id: "edge", label: "THE EDGE", title: "Growth as devotion", body: "Each partner trains where they habitually collapse, defend, or withdraw." },
      { id: "gift", label: "THE GIFT", title: "Full offering", body: "Erotic charge deepens when presence and openness are genuinely offered." },
      { id: "surrender", label: "SURRENDER", title: "Conscious opening", body: "Release management only where trust and attunement are real." },
    ],
    premiumFeatures: [
      { id: "polarity_practices", label: "POLARITY PRACTICES", description: "Layered drills for restoring charge with consent and regulation." },
      { id: "deida_library", label: "DEIDA AND LONG LIBRARY", description: "Expanded source pathways for polarity, devotion, and conscious union." },
      { id: "polarity_maps", label: "POLARITY MAPS", description: "Decision maps to diagnose and repair flattened attraction patterns." },
    ],
  },
  "sacred-desire": {
    tagline: "Where the nervous system meets the sacred",
    subtitle: "Through somatic truth, emotional courage, and body-led love",
    shortDescription: "A path for couples who need safety, honesty, and repair as foundations for lasting desire.",
    fullDescription:
      "The Embodied Heart path begins with a direct truth: if bodies do not feel safe, erotic depth does not stabilize. This work builds attunement through somatic awareness, disclosure, and co-regulation.\n\nIt is less about intensity and more about contact quality. As shame and protection soften, tenderness and eros can coexist again.",
    forCouples: "For couples who want emotional depth and erotic aliveness to reinforce each other.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls couples who love each other but still feel defended, misunderstood, or subtly guarded in intimate moments.",
      resonances: [
        "You want to feel known, not managed.",
        "You want body-led truth without blame cycles.",
        "You want practical repair pathways.",
        "You want safer nervous-system intimacy.",
      ],
    },
    pillars: [
      { id: "soma", label: "SOMA", title: "The body knows", body: "Track what the body says before the story takes over." },
      { id: "ns", label: "NERVOUS SYSTEM", title: "Safety as eros", body: "Co-regulation is a core erotic skill in long-term intimacy." },
      { id: "disclosure", label: "DISCLOSURE", title: "Body-led truth", body: "Share sensation-level truth to create cleaner contact and less defensiveness." },
      { id: "shame", label: "SHAME", title: "Dissolving armor", body: "Gentle exposure in safe connection reduces hidden shame loops." },
      { id: "repair", label: "REPAIR", title: "Rupture as doorway", body: "Repair skill predicts long-term trust and relational resilience." },
    ],
    premiumFeatures: [
      { id: "somatic_practices", label: "SOMATIC PRACTICES", description: "Guided regulation and disclosure drills for couple coherence." },
      { id: "boehm_day_library", label: "BOEHM AND DAY LIBRARY", description: "Expanded source tracks for nervous-system-aware intimacy and repair." },
      { id: "repair_toolkit", label: "REPAIR TOOLKIT", description: "Structured repair frameworks for conflict, distance, and reconnection." },
    ],
  },
  "neo-tantra": {
    tagline: "What arrives when you stop rushing",
    subtitle: "Through stillness, inner awareness, and unhurried contact",
    shortDescription: "A Slow Love path that shifts couples from pressure and performance to sustained presence.",
    fullDescription:
      "Slow Love teaches that stillness is not less intimacy. It is the condition for deeper intimacy. Instead of chasing outcomes, couples inhabit sensation and awareness with less force.\n\nThis path often reopens desire after burnout because it removes pressure and restores body trust.",
    forCouples: "For couples who want slower, deeper, more sustainable intimacy.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls couples tired of trying harder and ready to practice less force, more presence, and cleaner pacing.",
      resonances: [
        "You want connection over performance.",
        "You want pressure-free erotic growth.",
        "You want steadier intimacy in real life rhythms.",
        "You want to rediscover sensation from the inside out.",
      ],
    },
    pillars: [
      { id: "stillness", label: "STILLNESS", title: "Ground of eros", body: "Stillness stabilizes attention and opens subtler sensation." },
      { id: "inner_touch", label: "INNER TOUCH", title: "Awareness inside the body", body: "Feel from within, not only from external stimulation." },
      { id: "non_goal", label: "NON-GOAL", title: "Release destination pressure", body: "Drop outcome obsession to let aliveness expand naturally." },
      { id: "relaxation", label: "RELAXATION", title: "Erotic letting go", body: "Relaxation increases receptivity, safety, and depth." },
      { id: "time", label: "TIME", title: "Inhabit duration", body: "Unhurried time is a practical erotic technology." },
    ],
    premiumFeatures: [
      { id: "slow_practices", label: "SLOW LOVE PRACTICES", description: "Guided stillness and inner-awareness pathways for couples." },
      { id: "richardson_library", label: "DIANA RICHARDSON LIBRARY", description: "Expanded source teachings for non-goal intimate presence." },
      { id: "integration", label: "DAILY INTEGRATION", description: "Micro-practices that carry slow intimacy into everyday contact." },
    ],
  },
  "vajrayana-kashmir-shaivism": {
    tagline: "Two people genuinely meeting",
    subtitle: "Through presence, ceremony, and conscious recognition",
    shortDescription: "A Conscious Union path for couples who want relationship itself to become sacred daily practice.",
    fullDescription:
      "Conscious Union integrates ritual, presence, and honest love into the full relationship lifecycle, not only explicit intimacy windows.\n\nIts focus is continuity: transitions, repair, devotional attention, and shared silence as living relational disciplines.",
    forCouples: "For couples who want their entire relationship field to feel intentional, alive, and sacred.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls couples ready to move from passive relationship maintenance to active daily practice in love.",
      resonances: [
        "You want your ordinary moments to carry sacred quality.",
        "You want deeper mutual recognition over time.",
        "You value ceremony and consistency.",
        "You are ready to practice love as devotion.",
      ],
    },
    pillars: [
      { id: "presence", label: "FULL PRESENCE", title: "Arriving completely", body: "Bring body, heart, and attention fully into contact." },
      { id: "ceremony", label: "CEREMONY", title: "Ordinary life made sacred", body: "Use threshold rituals to transform daily transitions." },
      { id: "recognition", label: "RECOGNITION", title: "See the beloved truly", body: "Meet the living person, not the old relational image." },
      { id: "honest_love", label: "HONEST LOVE", title: "Love without concealment", body: "Truthful disclosure with care deepens trust and eros." },
      { id: "silence", label: "SACRED SILENCE", title: "Shared stillness", body: "Practice being together without filling every space." },
    ],
    premiumFeatures: [
      { id: "union_practices", label: "UNION PRACTICES", description: "Daily conscious-contact templates for real couple life." },
      { id: "ceremony_library", label: "CEREMONY LIBRARY", description: "Ritual frameworks for mornings, evenings, milestones, and repair." },
      { id: "lineage_links", label: "LINEAGE LINKS", description: "Cross-linked source pathways connecting authors, traditions, and practice." },
    ],
  },
};
