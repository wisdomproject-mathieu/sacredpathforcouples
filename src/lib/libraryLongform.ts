// ─────────────────────────────────────────────────────────────────────────────
// SACRED PATH FOR COUPLES — libraryLongform.ts  v3.0
// Complete replacement. All 13 authors + 6 paths.
// ─────────────────────────────────────────────────────────────────────────────

export interface LongformPracticePreview {
  title: string;
  durationMinutes?: number;
  description: string;
}

export interface LongformAuthor {
  tagline: string;
  tradition: string;
  shortDescription: string;
  fullDescription: string;
  practicePreview: LongformPracticePreview | null;
  premiumPreview: string;
  coreThemes: string[];
  keyWorks: string[];
}

export interface LongformPillar {
  id: string;
  label: string;
  title: string;
  body: string;
}

export interface LongformPremiumFeature {
  id: string;
  label: string;
  description: string;
}

export interface LongformPath {
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
}

export interface ContentPathPillar {
  id: string;
  label: string;
  title: string;
  body: string;
}

export interface ContentPathFeature {
  id: string;
  label: string;
  description: string;
}

export interface ContentPathEntry {
  id: string;
  name: string;
  tagline: string;
  subtitle: string;
  short_description: string;
  full_description: string;
  for_couples: string;
  sacred_invitation: {
    title: string;
    body: string;
    resonances: string[];
  };
  pillars: ContentPathPillar[];
  premium_features: ContentPathFeature[];
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTHORS
// ─────────────────────────────────────────────────────────────────────────────

export const AUTHOR_LONGFORM_BY_SLUG: Record<string, LongformAuthor> = {

  deida: {
    tagline: "The living edge of love, presence, and polarity",
    tradition: "Sacred Masculinity & Conscious Polarity",
    shortDescription:
      "The teacher who gave modern couples a language for what desire actually requires — and why it quietly disappears when polarity collapses.",
    fullDescription:
      "David Deida spent years inside Zen monasteries and Tantric lineages before finding his own voice — one that is simultaneously ancient and urgently contemporary. His foundational insight: most modern couples are very good at being equal, fair, and safe with each other — and wonder, with genuine confusion, why they have stopped turning each other on. Deida's diagnosis is precise. Polarity — the energetic difference between one partner's directed, penetrating presence and the other's radiant, yielding openness — is not a romantic fantasy or a gendered cliché. It is a law of desire as fundamental as electromagnetism. Where the difference collapses, attraction collapses with it.\n\nHis entire body of work is the map of how to restore that living charge consciously and spiritually, without sacrificing the equality that modern love rightly demands. His approach is rooted not in technique but in being. The masculine path he describes is not a performance of confidence but the genuine cultivation of presence — the capacity to remain still and directional under emotional pressure, to feel the pull toward comfort and choose love's edge instead. The feminine path is not a performance of openness but genuine surrender to a presence that has been genuinely earned — the release of the management and protection that accumulate when that presence has been unreliable.\n\nBoth paths require real courage. Neither is a role to play. Together, they create what Deida calls the third stage of intimacy: a relationship in which spiritual depth and erotic aliveness are not in competition but are the same practice, feeding each other, deepening together over a shared lifetime.",
    practicePreview: {
      title: "Directional Breath Frame",
      durationMinutes: 8,
      description:
        "One partner holds the space — breathing slowly, feeling the ground, directing their full attention toward the other without agenda or wanting. The other breathes into fullness, allowing their energy to expand and move outward without containment. Eight minutes that reorient a couple's entire nervous system back toward genuine contact and energetic distinction.",
    },
    premiumPreview:
      "Discover the complete map of Deida's three stages of intimacy — why Stage Two love (equal, safe, negotiated) structurally kills desire, and what Stage Three requires: the specific daily practice of undivided masculine presence that creates the condition in which feminine radiance can fully open. Learn the partner practices that restore the living current between two people who love each other and want to stay genuinely turned on.",
    coreThemes: ["Polarity", "Masculine presence", "Feminine radiance", "The edge", "Stage Three love", "Spiritual eros"],
    keyWorks: ["The Way of the Superior Man", "Blue Truth", "Finding God Through Sex", "Dear Lover", "Intimate Communion", "Wild Nights"],
  },

  osho: {
    tagline: "Where meditation and love are the same path",
    tradition: "Tantric Meditation & Sacred Awareness",
    shortDescription:
      "The teacher who refused the split between spiritual life and erotic life — and showed why genuine presence is the missing ingredient in intimacy.",
    fullDescription:
      "Osho — born Rajneesh Chandra Mohan Jain in 1931 — was one of the most provocative and penetrating spiritual teachers of the twentieth century, and his teaching on love, sexuality, and meditation remains among the most complete and honest in any tradition. Where other spiritual paths asked practitioners to transcend the body, Osho insisted on inhabiting it completely. The body is not the problem, he taught. Unconsciousness is the problem. And nowhere is unconsciousness more immediately visible — and more immediately transformable — than in the act of lovemaking.\n\nHis primary source text was the Vigyan Bhairav Tantra, a five-thousand-year-old Sanskrit dialogue between Shiva and his consort Parvati in which Shiva offers one hundred and twelve methods of awakening. Osho lectured on all one hundred and twelve methods across decades of teaching, creating the most complete practical Tantric instruction available to modern couples in any Western language.\n\nHis central teaching for couples is as simple as it is radical: you have never truly met. Two people who are not genuinely present — who are lost in thought, performance, memory, or anticipation — cannot create intimacy. They can create proximity. They can create a simulation of closeness that satisfies nobody and slowly deadens both people. The entire Tantric path, in Osho's rendering, is the return to genuine presence in each other's company — a presence so complete that the boundary between two selves begins to dissolve, and what is experienced is no longer two people loving each other but love itself moving through two temporarily distinct forms of consciousness.",
    practicePreview: {
      title: "Witnessing Breath",
      durationMinutes: 7,
      description:
        "Sitting facing each other, both partners become the silent witness of the other's breath. Not directing, not wanting, not performing — simply watching with complete and unhurried attention. The witness does not judge the beloved or manage the moment. It simply sees. In the quality of that seeing — in the willingness to be fully present without agenda — something happens between two people that all of intimacy is trying to create and rarely achieves.",
    },
    premiumPreview:
      "Explore Osho's complete map of love: the journey from unconscious, goal-driven sexuality through awareness and presence all the way to the state he called 'prayer' — in which lovemaking becomes indistinguishable from deep meditation. Includes practices from the Vigyan Bhairav Tantra specifically adapted for couples, teachings on the role of laughter in sacred sexuality, and how to use ordinary daily life together as a continuous meditative practice.",
    coreThemes: ["Presence", "Witnessing", "Sacred sexuality", "Non-grasping", "Meditation in love", "Love as liberation"],
    keyWorks: ["Tantra: The Supreme Understanding", "The Book of Secrets", "Being in Love", "From Sex to Superconsciousness", "Love Sex Prayer", "Tantric Love"],
  },

  "mantak-chia": {
    tagline: "Sexual energy as the most intimate form of life force",
    tradition: "Taoist Sexual Alchemy & Universal Tao",
    shortDescription:
      "The teacher who translated Taoist sexual classics out of sealed imperial lineages into practical cultivation methods for modern couples.",
    fullDescription:
      "Mantak Chia was born in Thailand in 1944 and trained under Master Yi Eng in the complete system of Taoist internal arts before moving to New York in 1979 to begin one of the most remarkable cross-cultural transmissions of esoteric knowledge of the twentieth century. The practices he brought — preserved for millennia within Taoist monasteries and imperial courts, historically accessible only to monks, physicians, and emperors — are among the most sophisticated technologies for working with sexual energy ever developed by any civilization.\n\nThe foundational Taoist recognition, confirmed by modern endocrinology, is that sexual energy is not merely erotic energy. It is jīng — the concentrated vital essence from which all other forms of life force derive. Kidney vitality, creative capacity, emotional resilience, and longevity are all expressions of this same underlying essence. How a couple manages their shared jīng determines not only the quality of their intimate life but the vitality of their bodies and the depth of their bond over decades.\n\nConventional lovemaking discharges jīng in orgasm. Most couples experience the subtle depletion that follows as natural and inevitable — the flatness, the mild withdrawal, the quiet sense that something has been spent. Chia's work reveals that this depletion is a choice, not a law. The practices he systematized — the Microcosmic Orbit, the Healing Love sequence, the Valley Orgasm, the Big Draw — teach couples to redirect sexual energy through the body's subtle channel system rather than releasing it, transforming a brief peak experience into a sustained, circulating current of aliveness that deepens both partners' health and their bond with each encounter.\n\nChia's genius is systematic precision. He maps the subtle body with the rigor of a physician, and his practices are genuinely learnable skills that develop incrementally, with each practice building the capacity for the next. The work does not ask for belief. It asks for practice, patience, and the willingness to discover what the body is actually capable of beyond the narrow range that conventional sexuality reveals.",
    practicePreview: null,
    premiumPreview:
      "Learn the Microcosmic Orbit as a couples practice: two bodies creating a shared circuit of vital energy through synchronized breath, intention, and conscious touch — building over time into a renewable source of health, aliveness, and deepening love. Discover the critical distinction between peak orgasm and valley orgasm, why that distinction is the gateway to a dimension of erotic experience most couples never reach, and the specific techniques Chia developed over forty years for helping couples make that transition safely and sustainably.",
    coreThemes: ["Jīng cultivation", "Microcosmic Orbit", "Healing love", "Valley orgasm", "Sexual alchemy", "Taoist chi kung"],
    keyWorks: ["The Multi-Orgasmic Couple", "Healing Love Through the Tao", "The Multi-Orgasmic Man", "The Multi-Orgasmic Woman", "Taoist Secrets of Love", "Sexual Reflexology"],
  },

  "diana-richardson": {
    tagline: "Stillness is not the opposite of eros — it is its deepest home",
    tradition: "Slow Sex & Tantric Presence",
    shortDescription:
      "The teacher who discovered that slowing everything down — including desire itself — is what finally allows couples to arrive at each other.",
    fullDescription:
      "Diana Richardson trained in the Osho tradition in Pune and spent years in direct contact with both Tantric teachers and somatic practitioners before arriving at the insight that has defined three decades of her couples work: the reason most couples experience a gradual diminishing of their intimate life is not that desire fades. It is that they never learned to be genuinely still together.\n\nEvery conventional approach to improving intimate life adds something — more technique, more variety, more novelty, more intensity, more effort. Richardson's approach, refined through thousands of hours working directly with couples internationally, subtracts. And in the subtraction, something arrives that no technique can manufacture: the specific quality of erotic presence and genuine connection that is only available in genuine stillness.\n\nHer Slow Sex framework is rooted in a Tantric understanding of sexual energy as inherently intelligent. When two bodies are genuinely present, genuinely relaxed, and genuinely free from the direction of goal-seeking mind, the energy between them knows what it wants to do. The role of the partners is not to drive this energy but to create the conditions — stillness, conscious breath, internal awareness, unhurried touch — in which it can move freely and reveal itself.\n\nWhat couples discover in Richardson's work is that underneath all the performance, the goal-orientation, and the unconscious habit of ordinary lovemaking is an entirely different dimension of erotic experience: softer, deeper, more sustaining, and more profoundly connecting than anything technique can reach. She has documented this work with unusual precision in some of the most practically useful books on sacred sexuality in print — books that couples regularly describe as having changed the entire texture of their intimate life.",
    practicePreview: null,
    premiumPreview:
      "Enter the practice of Tantric stillness: how to use complete physical relaxation, conscious internal awareness, and the deliberate setting aside of sexual goals to arrive at a quality of erotic presence that neither partner has experienced before. Learn Richardson's specific practices for dissolving the performance anxiety and goal-orientation that quietly diminish most couples' intimate lives — and discover the body's own erotic intelligence, which has been waiting beneath all the effort to express itself all along.",
    coreThemes: ["Slow Sex", "Tantric stillness", "Internal awareness", "Non-goal lovemaking", "Body intelligence", "Dissolving performance"],
    keyWorks: ["Slow Sex: The Path to Fulfilling and Sustainable Sexuality", "The Heart of Tantric Sex", "Tantric Orgasm for Women", "Tantric Love: Feeling versus Emotion"],
  },

  "margot-anand": {
    tagline: "Ecstasy is not a peak to reach — it is a quality of presence to inhabit",
    tradition: "SkyDancing Tantra",
    shortDescription:
      "The teacher who made ritual atmosphere, beauty, and sacred sensuality practical for everyday couples.",
    fullDescription:
      "Margot Anand trained directly under Osho in Pune in the 1970s before spending years studying Taoist practices, somatic therapies, and Western depth psychology — and then synthesizing everything she had learned into SkyDancing Tantra, a living teaching lineage she has transmitted to tens of thousands of students across six continents over four decades. Her work is distinguished above all by its refusal to choose between the sacred and the sensual, between spiritual depth and erotic aliveness, between reverence and playfulness. In the SkyDancing framework, these apparent opposites are not in tension — they are the same energy moving through different qualities of attention.\n\nAnand's particular contribution to couples work is her meticulous attention to the preparation that precedes intimacy — what she calls the creation of sacred space. Most couples arrive at lovemaking carrying the residue of the day: stress, unresolved tension, the ambient noise of modern life that does not simply disappear when clothes come off. SkyDancing teaches partners how to consciously clear and create the internal and external environment before any physical contact begins. Through ritual, breath, music, slow intentional touch, eye contact, and the deliberate cultivation of mutual reverence, two people transition from ordinary mind into sacred presence together.\n\nThis preparation is not foreplay in the conventional sense. It is the practice itself — and when both partners arrive at genuine contact from this place of prepared, unhurried presence, what becomes available is not simply more pleasure but an entirely different quality of erotic experience. Anand calls it ecstasy — meaning not intensity or peak, but liberation: the body's natural state of aliveness when performance, protection, goal-seeking, and unconscious habit have been gently and beautifully set aside.\n\nHer work with the chakra system as a couples practice is among the most complete available in Western teaching — showing how each energy center, when consciously opened and shared between partners, reveals a distinct dimension of erotic and spiritual experience that neither could access alone.",
    practicePreview: null,
    premiumPreview:
      "Discover Anand's complete ritual framework for creating sacred space — the specific practices couples use to transition from ordinary consciousness into genuine sacred presence before intimacy begins, and why this transition is itself one of the deepest forms of foreplay available. Learn her SkyDancing approach to the seven chakras as a shared couples practice: how conscious activation of each energy center opens a distinct dimension of erotic and spiritual aliveness — and how partners learn to awaken each other through the full living spectrum of these energies.",
    coreThemes: ["Sacred space", "Chakra awakening", "SkyDancing", "Erotic ritual", "Somatic safety", "Ecstatic presence"],
    keyWorks: ["The Art of Sexual Ecstasy", "The Art of Everyday Ecstasy", "Sexual Secrets for Women", "Love, Sex, and Awakening"],
  },

  "daniel-odier": {
    tagline: "Desire itself is the doorway to the absolute",
    tradition: "Non-Dual Kashmir Shaivism Tantra",
    shortDescription:
      "A lineage-grounded teacher of non-dual tantra, subtle touch, and awareness-led erotic presence.",
    fullDescription:
      "Daniel Odier received direct initiation into the Tantric lineage of Kashmir Shaivism from the yogini Lalita Devi — a transmission within one of the most philosophically demanding and spiritually uncompromising non-dual traditions ever produced. Kashmir Shaivism does not offer a path of gradual spiritual improvement. It offers the immediate recognition of what is already the case: that consciousness (Śiva) and creative energy (Śakti) are not two things, that the divine is not elsewhere, and that every experience — including the most intense physical and erotic ones — is already an expression of that single, undivided awareness recognizing itself.\n\nIn this lineage, Tantra is not a set of techniques for better sex. It is the radical, complete acceptance of totality: all energy, all desire, all sensation, all darkness, all light — each recognized as a movement of Spanda, the divine pulse of consciousness itself — and met with complete awareness rather than grasped at, rejected, or managed. Odier's distinctive gift to Western couples is making this demanding and beautiful teaching accessible without diluting it.\n\nHis practices work through the specific quality of touch — sometimes barely perceptible, two fingertips resting on the beloved's skin with absolute attention and no agenda — and through the practice of feeling the living space between two bodies before any touch begins. He calls this 'non-grasping reception': the capacity to receive sensation, beauty, and presence in the beloved without immediately trying to increase it, hold it, or direct it. In this non-grasping, something occurs that all ordinary desire is trying to reach and never does — a complete fullness, in which nothing is missing, nothing needs to be added, and love is simply, overwhelmingly present between two people who have stopped trying to make it happen.",
    practicePreview: null,
    premiumPreview:
      "Explore the practice of Kashmiri Tantric touch: how to use barely perceptible contact — fingertips resting on skin with total awareness but no agenda — to dissolve the boundary between giver and receiver, and what that dissolution reveals about the nature of the beloved. Discover Spanda recognition: how to feel the divine pulse moving through ordinary moments of intimacy — in a breath, a held gaze, the electric pause before contact — and how that recognition, practiced regularly, transforms the entire texture of a couple's life together.",
    coreThemes: ["Non-dual awareness", "Spanda", "Subtle touch", "Desire as sacred", "Kashmir Shaivism", "Non-grasping"],
    keyWorks: ["Tantric Quest", "Desire: The Tantric Path to Awakening", "Yoga Spandakarika", "Tantric Kali", "The Doors of Joy"],
  },

  "michaela-boehm": {
    tagline: "The wild somatic intelligence of the body knows what love needs",
    tradition: "Somatic Tantra & Relational Nervous System Work",
    shortDescription:
      "A teacher who integrates somatic precision and tantric depth to help couples build real safety and real desire.",
    fullDescription:
      "Michaela Boehm was born in Austria and trained in both the Tantric tradition and in somatic therapies before spending three decades developing her integrated approach to intimate life — one she has brought to thousands of couples in intensive retreats across five continents, in deep ongoing collaboration with David Deida, and in her development of the Non-Linear Movement Method (NLMM), now practiced internationally as a standalone somatic practice.\n\nHer foundational clinical insight is deceptively simple and profoundly consequential: most problems that couples experience in their erotic life are nervous system problems before they are relationship problems. When the body does not feel genuinely safe — not conceptually safe, not logically reassured, but actually, somatically safe in its tissues and nervous system — the erotic cannot emerge. Not through effort. Not through romantic setting. Not through the best of intentions. Genuine eros requires the parasympathetic state: the physiological condition of deep rest, openness, and receptivity that is structurally unavailable when the body is running any level of protective activation.\n\nUnderstanding this changes everything about how a couple approaches their intimate life. Creating genuine felt safety for a partner — the specific quality of presence, unhurried attention, and non-demanding contact that shifts the nervous system into genuine openness — is not a preliminary to desire. It is one of the most intimate and erotic acts available between two people.\n\nBoehm's practices go significantly beyond relaxation techniques. They work with the body's own intelligence: teaching couples to feel the difference between genuine arousal and conditioned willingness, between an authentic somatic yes and a habituated going-along. Her Non-Linear Movement Method opens the body to authentic expression by removing the mind's direction entirely, allowing the body's own movement intelligence to surface, discharge accumulated tension, and restore the natural aliveness that chronic activation suppresses.",
    practicePreview: null,
    premiumPreview:
      "Learn Boehm's framework for somatic erotic presence: how to distinguish genuine arousal from conditioned performance in your own body, and how to create the specific nervous system conditions that allow your partner's erotic nature to emerge naturally rather than be coaxed or performed. Discover the Non-Linear Movement Method as a couples practice: how non-directed movement dissolves accumulated tension, restores the body's authentic expressive aliveness, and rebuilds genuine desire after it has been flattened by stress, habit, or the quiet weight of emotional protection.",
    coreThemes: ["Nervous system safety", "Non-linear sexuality", "Somatic embodiment", "Wild feminine", "Body-led intimacy", "Erotic attunement"],
    keyWorks: ["The Wild Woman Book", "Non-Linear Movement Method (NLMM)", "Relating to the Wild (teaching series)", "The Embodied Relationship Retreat Series"],
  },

  "barry-long": {
    tagline: "Lovemaking as the most direct return to what is real",
    tradition: "Sacred Love & Mystical Union",
    shortDescription:
      "A radically clear voice on conscious lovemaking, inner stillness, and the truth that makes genuine union possible in long-term partnership.",
    fullDescription:
      "Barry Long was born in Australia in 1926 and spent the first part of his adult life as a journalist before undergoing a profound spiritual opening in his thirties that eventually led him to teach — first in London, then internationally — until his death in 2003. He is one of the most uncompromising and tender teachers of sacred love in the English language, and his work on conscious lovemaking stands almost completely alone in its refusal of complexity, technique, and spiritual theater. What Long offers is ruthlessly simple — and for exactly that reason, among the most demanding teachings in this entire field.\n\nHis central conviction, which he returned to from every direction across four decades: sexual love, when made with total inner stillness and genuine presence — not the stillness of suppression, but the specific meditative quality of a mind that has genuinely come to rest — is among the most direct and complete spiritual experiences available to a human being. Not because it resembles meditation. Because it is meditation. Because in the moment when two people are truly, wholly present with each other, what is experienced is not two people having sex. It is consciousness experiencing itself through love.\n\nThe difficulty, which Long addressed with unsparing and compassionate honesty, is that most people have never made love. They have had sex — the release of unconscious emotional and physical tension in the temporary company of another person. The wanting, the performance, the anxiety about getting it right, the comparing, the thinking — all of it is the habitual noise of ordinary mind that stands between two people and the genuine meeting their bodies are trying to reach.\n\nLong's teaching on the man's role is particularly distinctive: genuine masculine presence is not confidence or skill but inner stillness — the specific capacity to be completely here, holding the loving space in which the woman can open fully and safely, without the man's own wanting or restlessness disturbing that space.",
    practicePreview: null,
    premiumPreview:
      "Discover Long's teaching on the inner stillness required for genuine lovemaking — the specific quality of consciousness in which physical contact transforms from a transaction between two desires into a meeting between two presences. Learn his approach to making love as a form of meditation and prayer: how the quality of inner stillness that each partner brings determines the depth of union actually available, and why most couples, despite genuinely loving each other, never reach the intimacy their bodies and hearts are actually seeking.",
    coreThemes: ["Stillness in eros", "Conscious lovemaking", "Love as presence", "Making love vs having sex", "Spiritual union", "Inner truth"],
    keyWorks: ["Making Love: Sexual Love the Divine Way", "To Woman in Love", "The Origins of Man and the Universe", "Knowing Yourself"],
  },

  "jan-day": {
    tagline: "Emotional truth is the ground that genuine desire grows from",
    tradition: "Conscious Relating & Somatic Tantra",
    shortDescription:
      "A guide for couples who want desire rooted in honesty, body-awareness, and the courage to be fully known.",
    fullDescription:
      "Jan Day has worked at the intersection of conscious relationship, Tantra, and somatic healing for more than thirty years, training first in the Osho tradition and then in somatic therapies and body-centered psychotherapy before developing her own approach — one that addresses a dimension of intimate life that most Tantric teaching skips entirely: the emotional body.\n\nHer central teaching is as honest as it is uncomfortable: genuine erotic aliveness in a long-term relationship depends not primarily on technique, ritual, or erotic skill. It depends on emotional honesty. The walls that couples build over time to protect themselves from hurt — the defended body, the managed expression, the habitual emotional withdrawal that has accumulated so gradually neither partner quite noticed — are precisely the same walls that keep genuine erotic depth out. Protection and surrender use the same gates. You cannot selectively open to pleasure while keeping emotional truth closed.\n\nDay's practices guide couples through what she calls body-led disclosure: the specific kind of emotional honesty that does not live in the mind's narrative but in the body's direct, felt, present-moment experience. Not 'I feel hurt because you did X,' but the actual tightening in the chest, the held breath, the heat behind the eyes — disclosed as it is, without story layered over it, to the person who is present right now.\n\nThis kind of somatic disclosure, practiced regularly, creates over time a quality of mutual knowing that no amount of conventional communication can substitute for. And it creates, as a natural consequence rather than a goal, the erotic electricity that exists between two people who genuinely know and are genuinely known by each other — the desire that comes not from novelty or performance but from the specific quality of complete visibility.",
    practicePreview: null,
    premiumPreview:
      "Learn Day's body-led disclosure practices: how to share emotional truth from the body rather than from the narrative mind, and why this specific quality of somatic honesty restores erotic charge in long-term relationships more reliably than any other single approach. Discover her work with the emotional architecture of sustained desire — what actually keeps eros alive across years and decades, and the specific practices that rebuild genuine erotic trust after distance, unspoken resentment, or the accumulated weight of emotional self-protection.",
    coreThemes: ["Emotional courage", "Shame dissolution", "Body-led truth", "Erotic trust", "Conscious relating", "Somatic disclosure"],
    keyWorks: ["The New Intimacy (retreat series)", "Longwave Tantra (teaching lineage)", "Embodied Relating (workshop body)"],
  },

  "charles-muir": {
    tagline: "The body of the beloved is a sacred space that deserves ceremony",
    tradition: "Heart Tantra & Sacred Healing",
    shortDescription:
      "A foundational Western Tantra teacher whose work centers on reverence, ceremony, and the healing power of the sacred approach to the beloved's body.",
    fullDescription:
      "Charles Muir co-founded the Source School of Tantra Yoga with Caroline Muir in Hawaii in 1985 and has spent four decades teaching classical Tantric practices to couples, therapists, and healing practitioners across North America and internationally. His lineage draws directly from classical Indian Tantra — particularly its emphasis on the body as a sacred space and the beloved as a living embodiment of the divine — and from his own clinical work with the specific healing dimension of conscious sexuality.\n\nMuir's central contribution is his unwavering focus on reverence as the primary quality from which all genuine Tantric practice must flow. Most couples, even those with genuine spiritual interest, approach each other's bodies with a mixture of desire, familiarity, habit, and unconscious expectation. The body of the beloved has become, over time, known terrain — somewhat predictable, no longer encountered with genuine fresh attention. The Tantric approach Muir teaches asks for something more demanding and more beautiful: the deliberate, practiced cultivation of the capacity to approach the beloved's body as if encountering it for the first time, as genuinely sacred — worthy of the quality of attention one would bring to a holy space.\n\nHis honoring practices — specific partner rituals developed from the ancient Tantric tradition of puja and refined through decades of direct couples facilitation — are among the most practically effective tools available for dissolving the performance anxiety, residual shame, and unconscious defensive holding that accumulate in any couple's erotic life over time. When reverence is genuinely present between two people — not performed but actually felt — the body opens in ways it cannot open to desire alone. Genuine healing of accumulated wounds becomes available. And the depth of connection reaches dimensions that chemistry and skill simply cannot access.",
    practicePreview: null,
    premiumPreview:
      "Discover Muir's honoring practices: specific partner rituals drawn from the classical Tantric tradition that cultivate genuine reverence for the beloved's body — and dissolve, through that reverence, the unconscious performance anxiety and protective holding that most couples bring unexamined to the erotic field. Learn the Source School approach to sacred lovemaking as ceremony: how to create a ritual container in which both partners approach the entire intimate encounter with the quality of conscious attention that transforms ordinary physical contact into conscious, healing, sacred union.",
    coreThemes: ["Sacred reverence", "Heart Tantra", "Healing love", "Ceremony", "Body as temple", "Honoring practices"],
    keyWorks: ["Tantra: The Art of Conscious Loving", "Source School of Tantra Yoga curriculum", "Heart Tantra teachings"],
  },

  "sally-kempton": {
    tagline: "Śakti is not a concept — she is the energy moving through your love right now",
    tradition: "Kashmir Shaivism & Tantric Meditation",
    shortDescription:
      "A clear modern voice translating Shaiva recognition practice into the living reality of intimate relational life.",
    fullDescription:
      "Sally Kempton was a journalist and essayist — including a period writing for Esquire in the early years of second-wave feminism — before a profound encounter with Swami Muktananda in New York in 1974 led her into eleven years as a sannyasi in the Siddha Yoga tradition. She emerged as a teacher with deep scholarly grounding in Sanskrit, Tantric philosophy, and the complete tradition of Kashmir Shaivism, combined with a rare gift for making the most subtle metaphysical insights feel immediately relevant to the texture of ordinary relational and intimate life.\n\nKashmir Shaivism's central teaching — that consciousness (Śiva) and creative energy (Śakti) are not two separate principles but one undivided reality appearing in different modes — has profound consequences for how couples actually experience each other. In the Shaiva framework, the beloved is not merely a person you love. They are, at the deepest level of what is real, a living expression of Śakti: the divine creative energy that animates all of existence. The love you feel for them is not merely a personal emotion. It is the movement of consciousness recognizing itself in another form.\n\nKempton's teaching does not ask couples to believe this intellectually. It offers specific practices — recognition-based meditations, ways of looking, listening, and touching that carry this awareness actively through the body and senses — through which the Shaiva teaching becomes a direct felt experience available in the most ordinary moments of daily life together: across a dinner table, in the quality of a morning greeting, in the specific way one partner holds the other's gaze.\n\nThe result, for couples who engage her work seriously, is not merely a richer erotic life. It is a transformed relationship to existence itself: a growing sense that the love between two people is not a private human transaction but a participation in something that was already happening at the level of the cosmos.",
    practicePreview: null,
    premiumPreview:
      "Discover the recognition practices of Kashmir Shaivism applied to intimate partnership: how to look at your beloved and directly perceive the Śakti moving within them — not as metaphor but as an actual felt experience that deepens with practice. Learn Kempton's approach to Tantric meditation within relationship: how ordinary moments of genuine contact between partners become the laboratory of non-dual awakening, available not only on meditation retreat but in the living intimacy of every shared day.",
    coreThemes: ["Śakti recognition", "Non-dual meditation", "Kashmir Shaivism", "Divine feminine", "Relationship as sadhana", "Tantric philosophy"],
    keyWorks: ["Awakening Shakti", "Meditation for the Love of It", "Doorways to the Infinite", "The Heart of Meditation", "Awakening to Kali"],
  },

  "max-bush": {
    tagline: "Erotic confidence earned through awareness, not performance",
    tradition: "Embodied Masculine Eros",
    shortDescription:
      "Practical training in confident, attuned erotic leadership without performance posturing.",
    fullDescription:
      "Max Bush works with a question that many partners carry largely in silence: how do I develop genuine erotic confidence and skill without reducing my partner to an object, and without performing a sexuality that is not authentically mine? His teaching operates at the specific intersection of conscious masculinity work, somatic practice, and the nervous system dynamics of desire and genuine attunement.\n\nThe central distinction his work turns on is between performed confidence and embodied presence. Performed confidence — the surface behavior of erotic certainty — is available to anyone willing to act the part. It may even produce some of what it is attempting to produce. But a partner's body can feel the difference between genuine presence and its performance, and over time in a committed relationship, that difference determines everything.\n\nEmbodied presence is the specific quality of being — grounded, genuinely here, genuinely attentive, genuinely responsive to what is actually happening rather than what is supposed to happen — that a partner feels in their body as simultaneous safety and attraction. It cannot be faked. It can be cultivated. And the path of cultivation runs directly through the willingness to feel what is actually present in the body — both one's own and the beloved's — without the management of anxiety or the performance of sureness getting in the way.\n\nHis practices develop erotic attunement: the practiced capacity to feel and respond to a partner's living energetic and somatic state, moment by moment, rather than executing a predetermined approach regardless of actual signal. This attunement, developed through honest embodied attention, is what separates erotic confidence that opens a partner from erotic confidence that merely impresses.",
    practicePreview: null,
    premiumPreview:
      "Learn the foundational practices of embodied erotic presence: how to arrive fully in your own body before you arrive with your partner, how to feel and follow a partner's living somatic signals rather than projecting desire onto them, and how to develop the specific quality of grounded, unhurried, genuinely responsive attention that creates safety and genuine desire at the same time — in the partner, and in yourself.",
    coreThemes: ["Erotic attunement", "Conscious masculinity", "Somatic skill", "Relational integrity", "Embodied confidence"],
    keyWorks: [],
  },

  "victor-gold": {
    tagline: "Love as a living art that deepens with devoted attention",
    tradition: "Sacred Erotic Craft & Conscious Form",
    shortDescription:
      "A craft-based approach to intimacy where the quality of attention matters infinitely more than novelty.",
    fullDescription:
      "Victor Gold brings to conscious relationship work an emphasis that most teachers overlook and most couples quietly need: craft. Not technique in the mechanical sense, but the kind of attentive, creative, devoted artistry that a musician brings to a phrase or a poet brings to a line — the quality of presence in which something familiar is continuously transformed into something extraordinary through the sustained, genuine quality of attention given to it.\n\nMost erosion of intimate aliveness in long-term relationships is not a failure of love or chemistry. It is a failure of creative attention. Couples stop truly arriving: they bring the same habitual gestures, the same sequence, the same quality of distracted presence they have always brought — and wonder, with genuine sadness, why the experience feels increasingly familiar in the worst sense of that word. The standard cultural prescription is novelty: change what you do. Gold's teaching addresses something more fundamental and more lasting: deepen how you are present to what is already there.\n\nHis approach draws from sacred erotic traditions, from the Japanese aesthetic of wabi-sabi — the beauty of the impermanent, unrepeatable, and genuinely present — and from decades of direct facilitation work with couples. His central insight is both clarifying and immediately actionable: the quality of creative attention you bring to a single touch, a single moment of genuine eye contact, a single minute of truly unhurried presence with your partner's body, contains more erotic potential than an entire evening of varied technique delivered with half a mind.\n\nThe depth was always there. Craft is what opens it.",
    practicePreview: null,
    premiumPreview:
      "Explore Gold's framework for conscious erotic artistry: how to bring genuine creative presence and devotion to lovemaking in ways that transform the familiar into the sacred, and why this quality of attention — not novelty, not technique — is what determines whether intimacy deepens or gradually empties over time. Learn the practice of arriving fully: the specific quality of inner gathering that determines the depth of an intimate encounter before a single touch occurs.",
    coreThemes: ["Erotic craft", "Creative presence", "Devotion", "Depth over novelty", "Conscious form", "Sacred aesthetics"],
    keyWorks: [],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT PATHS (used by path cards / navigation)
// ─────────────────────────────────────────────────────────────────────────────

export const CONTENT_PATHS: ContentPathEntry[] = [
  {
    id: "tantric_wisdom",
    name: "Tantric Wisdom",
    tagline: "An ancient path translated for modern couples",
    subtitle: "Through breath, presence, polarity, and the sacred body",
    short_description: "The five-thousand-year-old map of consciousness that locates the sacred inside the erotic body.",
    full_description:
      "Tantra is not a technique for better sex. It is a five-thousand-year-old map of consciousness that recognized, long before modern psychology, that the erotic body and the spiritual body are not separate. They are the same body, approached with different qualities of attention. Where most spiritual paths asked practitioners to transcend the senses, Tantra insisted on inhabiting them completely — recognizing in pleasure, sensation, and the living charge between two bodies the most immediate expression of the divine available to human beings.",
    for_couples: "For couples who want intimacy to feel conscious tonight and grow spiritually over time.",
    sacred_invitation: {
      title: "Who This Path Calls",
      body: "This path calls to couples who sense that something more is possible — not simply more pleasure or more frequency, but a different quality of contact altogether. Couples who have noticed that even in their most intimate moments, something in them is still watching, waiting, slightly elsewhere. Couples who want the body to be a doorway rather than a destination.",
      resonances: [
        "You want depth more than technique.",
        "You sense that your lovemaking has more silence, more reverence, and more aliveness available than you have yet discovered.",
        "You are drawn to the idea that spiritual practice and erotic life belong together.",
        "You want both partners to feel genuinely seen — not merely desired.",
        "You are willing to be changed by intimacy, not just satisfied by it.",
      ],
    },
    pillars: [
      { id: "shiva_shakti", label: "ŚIVA & ŚAKTI", title: "Sacred Polarity", body: "At the heart of Tantra is the recognition that existence itself is a dance between two principles: pure witnessing consciousness (Śiva) and living creative energy (Śakti). In your relationship, these poles are alive in every moment of genuine contact. One partner holds space; the other fills it. The quality of your intimacy depends on how consciously you inhabit and honor these complementary currents — not as fixed roles, but as a living exchange that flows and changes between you." },
      { id: "prana", label: "PRĀṆA", title: "Breath as Bridge", body: "In Tantric physiology, breath is the vehicle of prāṇa — the animating life force that flows through the subtle body. Conscious breathing during intimacy transforms the quality of contact: it regulates the nervous system, opens the body to deeper sensation, and carries awareness into the areas where holding and protection have accumulated. In partner breathing practices, it creates a shared rhythm that synchronizes two subtle bodies before the physical bodies even touch." },
      { id: "deha", label: "DEHA", title: "Body as Living Temple", body: "Tantra was the first tradition to fully consecrate the physical body — to insist that the body is not an obstacle to the sacred but its most immediate and complete expression. The Tantric body is not a machine of sensation. It is a living temple of intelligence, memory, and divine energy. Every part of it is worthy of reverence. In relationship, this means approaching your partner's body with the quality of attention you would bring to a genuinely holy space: unhurried, curious, full of gratitude." },
      { id: "bhakti", label: "BHAKTI", title: "Devotion", body: "Bhakti is the yogic path of love as spiritual practice — the recognition that devotion is not a sentiment but a discipline. In Tantric relationship, bhakti transforms how partners meet: not as two individuals negotiating needs, but as two expressions of divine consciousness recognizing each other. It requires the willingness to look at your partner as if for the first time, to see past the familiar image to the aliveness beneath it — and to let that aliveness land in the body as genuine reverence." },
      { id: "spanda", label: "SPANDA", title: "The Divine Pulse", body: "Spanda — the vibrant, pulsing aliveness that Kashmir Shaivism recognizes as the fundamental nature of reality — is not something to be created in intimacy. It is something to be recognized. It is already present in the trembling of genuine excitement, in the pause between exhale and inhale, in the moment when two bodies first touch with full awareness. Tantric practice teaches couples to recognize Spanda and stay with it — to be with the living pulse of energy between them rather than immediately chasing it." },
      { id: "samadhi", label: "SAMĀDHI", title: "The Dissolution", body: "In classical yoga, samādhi is the dissolution of the boundary between observer and observed — non-dual awareness in which the separate self temporarily ceases. Tantra locates this possibility within the erotic body. At the depth of genuine conscious lovemaking, the boundary between two selves becomes permeable, and what is experienced is not two people touching but one field of awareness moving within itself. This state cannot be forced. It arises when presence, breath, polarity, and devotion are all fully inhabited." },
      { id: "samskara", label: "SAṂSKĀRA", title: "The Closing Ritual", body: "How a couple closes an intimate encounter is as important as how they enter it. Saṃskāra — the impressions left on consciousness by lived experience — determines how intimacy accumulates over time. Couples who close their encounters with care: a held stillness, a breath taken together, a whispered truth, or a moment of silent gratitude, create a different quality of shared history. The closing ritual is where the experience is received and allowed to settle as a genuine resource." },
    ],
    premium_features: [
      { id: "guided_tracks", label: "GUIDED TRACKS", description: "Full audio-guided Tantric journeys for couples, from 10-minute presence practices to 60-minute conscious lovemaking rituals." },
      { id: "energy_maps", label: "ENERGY MAPS", description: "Visual guides to the subtle body: chakra systems, prāṇa channels, and the energetic anatomy of conscious union." },
      { id: "sacred_love_library", label: "SACRED LOVE LIBRARY", description: "The complete Tantric Wisdom teaching library: practices by Osho, Margot Anand, Daniel Odier, Sally Kempton, and Charles Muir." },
    ],
  },
  {
    id: "taoist_alchemy",
    name: "Taoist Alchemy",
    tagline: "Sexual energy as vital medicine, not expenditure",
    subtitle: "Through circulation, refinement, and shared life force",
    short_description: "The ancient Taoist science of sexual energy — translated into sustainable vitality and deepening love.",
    full_description:
      "Taoism recognized two thousand years ago what modern medicine is only beginning to map: that sexual energy and life energy are the same force. How a couple manages that force determines not only the quality of their intimate life but the health of their bodies and the depth of their bond over decades. The Taoist path does not suppress desire — it transforms it. From a brief peak that depletes, into a circulating current that heals, vitalizes, and deepens the love between two people with each encounter.",
    for_couples: "For couples who want their intimate life to leave them more alive, more in love, and more energized — not less.",
    sacred_invitation: {
      title: "Who This Path Calls",
      body: "This path calls to couples who have noticed that conventional lovemaking often leaves a subtle depletion in its wake — a flatness after the peak, a quiet withdrawal in the hours that follow. Couples who are curious about the body's deeper intelligence and want their erotic life to contribute to their health and vitality rather than drawing from it.",
      resonances: [
        "You want your intimate life to leave both of you feeling more energized, not less.",
        "You are curious about the body's subtle energetic architecture.",
        "You want a practice that deepens over decades rather than depending on novelty.",
        "You are drawn to ancient science applied with practical precision.",
        "You want both partners to benefit equally and lastingly from what flows between you.",
      ],
    },
    pillars: [
      { id: "jing", label: "JĪNG", title: "Vital Essence", body: "Jīng is the most fundamental form of life force in Taoist physiology — the concentrated essence stored in the kidneys that governs vitality, creativity, and longevity. Sexual energy is jīng in its most potent form. The Taoist path begins with the recognition that jīng can be cultivated and redirected through the body rather than discharged — and that this redirection is not deprivation but expansion: more sensation, more aliveness, more genuine connection, sustained and compounding over time." },
      { id: "chi", label: "CHĪ", title: "Life Current", body: "Chī is the animating current that flows through the body's meridian system — the same energy acupuncture works with, that martial artists cultivate through chi kung. In lovemaking, chī determines whether touch feels alive or mechanical, whether presence feels mutual or absent. Learning to feel chī in your own body — and then the current between your body and your partner's — transforms physical intimacy from sensation alone into genuine energy exchange." },
      { id: "shen", label: "SHÉN", title: "Spirit & Luminosity", body: "Shén governs consciousness, emotional radiance, and genuine presence. In intimate life, shén is what you feel when your partner is truly with you rather than merely physically close — the lit quality in the eyes, the attention that feels complete. Taoist sexual cultivation aims ultimately at shén: the refinement of sexual and vital energy all the way up through the heart and mind, until lovemaking becomes an act of full spiritual presence." },
      { id: "microcosmic_orbit", label: "MICROCOSMIC ORBIT", title: "Shared Energy Circulation", body: "The Microcosmic Orbit — the conscious circulation of chī up the spine, over the crown, and down through the front of the body — is the foundational Taoist internal practice. As a couples practice, it becomes extraordinary: two bodies learning to share and circulate their combined energy field through synchronized breath, intention, and conscious touch — creating a circuit of vitality that belongs to neither partner alone but to the living relationship between them." },
      { id: "yin_yang", label: "YĪN YÁNG", title: "The Dance of Complementary Energies", body: "Yīn and yáng are not opposites in conflict but complementary principles in dynamic balance. In relationship, they describe the specific energetic qualities each partner brings in any given moment: the receptive, cooling, lunar quality of yīn; the active, warming, solar quality of yáng. Genuine intimacy requires the fluid, conscious exchange of both, with each partner capable of inhabiting either pole as the living moment requires." },
      { id: "valley_orgasm", label: "VALLEY ORGASM", title: "Pleasure That Expands", body: "The Taoist teaching on orgasm is its most radical gift to modern couples: the distinction between peak orgasm, which discharges vital energy, and valley orgasm, which expands and circulates it. Valley orgasm is pleasure sustained and deepened over time — full-body waves of sensation that build without the conventional arc of tension and release, leaving both partners more alive and more deeply connected rather than temporarily depleted." },
      { id: "healing_love", label: "HEALING LOVE", title: "Lovemaking as Medicine", body: "The ancient Taoist physicians documented what modern endocrinology confirms: that conscious, loving sexual practice has measurable effects on hormonal balance, immune function, and longevity. Chia's Healing Love practices systematize this ancient wisdom for modern couples — transforming lovemaking from a recreational act into a genuine and renewable health practice that both partners benefit from across a lifetime together." },
    ],
    premium_features: [
      { id: "chi_cultivation", label: "CHI CULTIVATION TRACKS", description: "Audio-guided Taoist energy practices for couples: from the Microcosmic Orbit to the full Healing Love sequence." },
      { id: "body_maps", label: "MERIDIAN MAPS", description: "Visual guides to the Taoist subtle body: chī channels, organ energy systems, and the energetic anatomy of Taoist lovemaking." },
      { id: "chia_library", label: "MANTAK CHIA LIBRARY", description: "The complete Taoist Alchemy teaching library, drawn from Mantak Chia's forty-year body of work." },
    ],
  },
  {
    id: "sacred_polarity",
    name: "Sacred Polarity",
    tagline: "The living charge between two people",
    subtitle: "Restoring desire through presence, direction, and radiance",
    short_description: "For couples who want the magnetic charge back — through genuine presence and radiance, not performance.",
    full_description:
      "Most couples don't fall out of love. They fall out of polarity. The qualities that created the initial attraction — the decisive, directional presence in one partner that felt magnetic, the radiant openness in the other that felt like home — gradually collapse under the demands of modern equality and shared logistics. When the energetic difference flattens, desire has nothing to arc across. This path restores that living charge: not through role-playing, but through the genuine cultivation of directed presence and luminous radiance as spiritual practices.",
    for_couples: "For couples who remember what it felt like to be magnetically drawn to each other — and want that alive quality back.",
    sacred_invitation: {
      title: "Who This Path Calls",
      body: "This path calls to couples who sense that the energetic difference between them has flattened — that they are more colleagues than lovers, more comfortable than turned on. It calls to the partner who wants to rediscover genuine presence, and to the partner who wants to rediscover genuine opening.",
      resonances: [
        "You want to feel magnetically drawn to each other again.",
        "You sense that something has flattened between you and don't know how to restore it.",
        "You want more aliveness in the space between you, not more management.",
        "You are willing to stop negotiating and start inhabiting.",
        "You are curious about the role of energetic difference in sustained desire.",
      ],
    },
    pillars: [
      { id: "presence", label: "PRESENCE", title: "Directed Consciousness", body: "The masculine principle — regardless of who embodies it — is consciousness that has a direction. Not aggression, but the specific quality of attention that moves toward, commits fully, and holds steady under relational pressure. Presence is what a partner feels when the other is truly here — not managing from a slight distance, not performing connection, but actually, bodily, unavoidably here. Its cultivation is the central masculine spiritual practice." },
      { id: "radiance", label: "RADIANCE", title: "Luminous Life Force", body: "The feminine principle — regardless of who embodies it — is energy that moves outward: the natural radiance that animates a space, expresses feeling fully, and creates the living field of aliveness a relationship exists within. Radiance is not performance. It is what happens when a person stops managing their expression and allows their aliveness to move through the body without restriction." },
      { id: "the_edge", label: "THE EDGE", title: "Growth as Devotion", body: "Genuine polarity requires both partners to be continuously growing into their deepest capacity. The masculine edge is the willingness to feel fear and move forward into love anyway. The feminine edge is the willingness to trust — to open to genuine depth rather than testing and contracting when that depth is offered. Both edges are forms of love. Both require courage. Both, practiced together, continuously renew the living charge between two people." },
      { id: "the_gift", label: "THE GIFT", title: "Full Offering", body: "Love is not primarily a feeling but an offering. The deepest masculine gift is undivided presence — the full force of conscious attention offered without reservation. The deepest feminine gift is radiant openness — the full expression of aliveness and feeling, offered without guarding. When both gifts are given simultaneously, the couple enters a living circuit that is indistinguishable from spiritual experience." },
      { id: "devotion", label: "DEVOTION", title: "Seeing the Sacred in the Beloved", body: "Genuine erotic devotion — the capacity to see through the surface of the beloved to the Śakti or divine consciousness moving within them — is not romantic sentiment but a cultivated perceptual practice. It is what distinguishes adoration from objectification, devotion from possession." },
      { id: "surrender", label: "SURRENDER", title: "The Practice of Opening", body: "Surrender is not submission. It is the conscious choice to trust a partner's genuine presence enough to release the management that keeps a person safe and slightly contracted. For the feminine-identified partner, surrender to authentic masculine presence is one of the most profound spiritual practices available. For the masculine-identified partner, surrender is the release of outcome — the giving of full presence with no expectation of return." },
    ],
    premium_features: [
      { id: "polarity_practices", label: "POLARITY PRACTICES", description: "Partner practices specifically designed to restore energetic distinction and the living charge between two people." },
      { id: "deida_library", label: "DEIDA & LONG LIBRARY", description: "The complete Sacred Polarity teaching library drawn from David Deida and Barry Long's full bodies of work." },
      { id: "polarity_maps", label: "POLARITY MAPS", description: "Visual frameworks for understanding, diagnosing, and restoring energetic polarity in long-term relationships." },
    ],
  },
  {
    id: "embodied_heart",
    name: "The Embodied Heart",
    tagline: "Where the nervous system meets the sacred",
    subtitle: "Through somatic truth, emotional courage, and body-led love",
    short_description: "For couples who know that the heart must open before the body can — and want the practices that make that opening real.",
    full_description:
      "The most sophisticated erotic techniques in the world cannot open a body that does not feel genuinely safe. Most couples carry, in their tissues and nervous systems, the accumulated history of every moment they were not fully received. This path works where that accumulation lives — in the body itself — offering the specific practices of somatic honesty, emotional courage, and genuine nervous system safety that allow love to arrive all the way in.",
    for_couples: "For couples who want their love to feel as deep as they know it is — and want to remove what stands between them and that depth.",
    sacred_invitation: {
      title: "Who This Path Calls",
      body: "This path calls to couples who have noticed that something in them stays slightly guarded even with the person they love most. Who sense that their intimate life could be more honest, more vulnerable, more alive — but who have not found the specific practice that makes that openness feel genuinely safe.",
      resonances: [
        "You want to feel genuinely known — not just loved.",
        "You sense that protection has quietly replaced presence in your intimate life.",
        "You are willing to feel what is actually true in your body, even when it is difficult.",
        "You want both partners to feel safe to be fully themselves in each other's presence.",
        "You believe that emotional honesty and erotic aliveness are not in conflict — they are the same movement.",
      ],
    },
    pillars: [
      { id: "soma", label: "SOMA", title: "The Body Knows", body: "The body holds a quality of knowledge the mind cannot manufacture. It knows whether it is genuinely safe or merely reassured. It knows whether desire is authentic or performed. Somatic practice begins with the demanding discipline of learning to feel what the body actually knows — and trusting that intelligence as the primary guide to what intimacy needs in any given moment." },
      { id: "nervous_system", label: "NERVOUS SYSTEM", title: "Safety as Eros", body: "Genuine eros in a long-term relationship requires the parasympathetic state — the physiological condition of rest, openness, and receptivity. Creating genuine felt safety for a partner is not a preliminary to desire. It is one of the most intimate and erotic acts available between two people." },
      { id: "disclosure", label: "DISCLOSURE", title: "Body-Led Truth", body: "Body-led disclosure is the practice of sharing what is present in the body — the tightening, the warmth, the held breath — without the narrative mind's interpretation layered over it. Not 'I feel hurt because you did X,' but the actual sensation, disclosed as it is, in real time. This quality of somatic honesty creates over time a mutual knowing that no amount of conventional communication can substitute for." },
      { id: "shame", label: "SHAME", title: "The Dissolution of Armor", body: "Shame lives in the body before it lives in the mind. It quietly determines which dimensions of desire and authentic self can be expressed — and which must remain hidden. Its dissolution is not a single moment but a gradual, body-led process of discovering, again and again, that genuine exposure to a genuinely safe partner changes what shame said was true about you." },
      { id: "contact", label: "CONTACT", title: "Meeting Without Merging", body: "Genuine contact is rarer than it sounds. Most couples do not lack closeness — they lack genuine contact: two distinct, fully present people actually meeting rather than two familiar patterns interacting from comfortable habit. Contact requires the willingness to be surprised by the beloved — which requires the willingness to actually look." },
      { id: "repair", label: "REPAIR", title: "Rupture as Doorway", body: "The quality of a relationship is not determined by the absence of rupture but by what happens in its aftermath. Couples who learn to repair well develop something more valuable than the absence of conflict: a trust in the relationship's resilience that creates the safety in which genuine vulnerability — and therefore genuine eros — becomes available." },
    ],
    premium_features: [
      { id: "somatic_practices", label: "SOMATIC PRACTICES", description: "Body-centered partner practices for nervous system regulation, somatic disclosure, and the cultivation of genuine felt safety." },
      { id: "boehm_day_library", label: "BOEHM & DAY LIBRARY", description: "The complete Embodied Heart teaching library drawn from Michaela Boehm and Jan Day's full bodies of work." },
      { id: "repair_tools", label: "REPAIR TOOLKIT", description: "Guided repair practices for couples: body-led reconnection after conflict, somatic forgiveness, and rebuilding genuine erotic trust." },
    ],
  },
  {
    id: "slow_love",
    name: "Slow Love",
    tagline: "What arrives when you finally stop rushing",
    subtitle: "Through stillness, internal awareness, and the intelligence of unhurried contact",
    short_description: "The Tantric discovery that slowing down is not settling for less — it is the path to everything intimacy has been trying to offer.",
    full_description:
      "Every conventional approach to improving intimate life adds something — more technique, more variety, more novelty, more effort. Diana Richardson's approach, refined through thousands of hours working directly with couples, subtracts. And in the subtraction, something arrives that no technique can manufacture: the quality of erotic presence and genuine connection only available in genuine stillness.",
    for_couples: "For couples who sense that something quieter, deeper, and more sustaining than what they've known is possible — and are willing to slow down to find it.",
    sacred_invitation: {
      title: "Who This Path Calls",
      body: "This path calls to couples who are tired of trying harder. Who have added enough — enough techniques, enough workshops, enough well-intentioned effort — and who sense that the intimacy they want is not on the other side of more, but on the other side of less.",
      resonances: [
        "You want genuine connection more than performed passion.",
        "You sense that your intimate life would deepen if it slowed down.",
        "You are willing to give up the peak if it means gaining something more lasting.",
        "You want both partners to feel genuinely arrived — not arriving.",
        "You are curious about what the body knows when it is not being directed.",
      ],
    },
    pillars: [
      { id: "stillness", label: "STILLNESS", title: "The Ground of Eros", body: "Stillness is not the absence of desire. It is the specific quality of inner presence — relaxed, alert, genuinely arrived in the body — in which desire can move freely without being chased or managed. Most conventional lovemaking is an unconscious flight from stillness: a continuous escalation designed to stay ahead of the discomfort of genuine presence. The Slow Love path reverses this." },
      { id: "internal_touch", label: "INNER TOUCH", title: "Awareness Inside the Body", body: "Richardson's central practice innovation is 'inner touch' — the cultivation of awareness inside the body during lovemaking rather than projection of attention onto sensation. Instead of experiencing touch as something that happens to the surface, inner touch means inhabiting the body so completely that sensation is felt from within. This simple redirection of attention transforms the quality of intimate contact more profoundly than any external technique." },
      { id: "non_goal", label: "NON-GOAL", title: "Releasing the Destination", body: "Conventional sexuality moves toward orgasm with the same directed effort that drives most of modern life — carrying the same quality of performance pressure and disappointment when the destination is not reached. Non-goal lovemaking liberates pleasure from the tyranny of destination. When neither partner is trying to get anywhere, time expands, sensation deepens, and something arrives that contains more aliveness than orgasm itself." },
      { id: "relaxation", label: "RELAXATION", title: "The Erotic Power of Letting Go", body: "A genuinely relaxed body — the specific quality of deep physiological ease — is among the most erotic states available. A relaxed body is a receptive body. Its capacity for sensation and energetic exchange is orders of magnitude greater than those available in a contracted, goal-seeking body. Learning to genuinely relax in the presence of the beloved, as a practice, is the primary skill of Slow Love." },
      { id: "body_intelligence", label: "BODY INTELLIGENCE", title: "Trust the Deeper Knowing", body: "When two bodies are genuinely present to each other, relaxed, and free from the direction of goal-seeking mind, the energy between them knows what it wants to do. Couples who learn to follow the body's own intelligence rather than the mind's concepts of what should be happening discover an erotic creativity and depth that deliberate effort never achieves." },
      { id: "time", label: "TIME", title: "Inhabiting Duration", body: "One of the most immediate and transformative practices of Slow Love is simply more time: unhurried, without destination, given to the experience of being genuinely present with another person's body. When couples cease to treat intimate time as a task to be completed and begin to inhabit it as a dimension of life worthy of genuine spaciousness, something changes fundamentally in what is available there." },
    ],
    premium_features: [
      { id: "slow_practices", label: "SLOW LOVE PRACTICES", description: "Guided partner practices in stillness, inner touch, and non-goal lovemaking — from brief daily encounters to extended evening rituals." },
      { id: "richardson_library", label: "DIANA RICHARDSON LIBRARY", description: "The complete Slow Love teaching library drawn from Diana Richardson's thirty years of couples work." },
      { id: "integration_practices", label: "INTEGRATION PRACTICES", description: "Daily micro-practices that bring Slow Love awareness into ordinary moments of physical contact." },
    ],
  },
  {
    id: "conscious_union",
    name: "Conscious Union",
    tagline: "Two people genuinely meeting — body, heart, and awareness",
    subtitle: "Through presence, ceremony, and the art of mutual recognition",
    short_description: "For couples ready to bring the full force of conscious awareness to every dimension of their life together.",
    full_description:
      "Conscious union is not a technique or a tradition. It is the distillation of what every authentic intimacy path is pointing toward: two people who are genuinely present to each other, genuinely honest with each other, and genuinely growing together into the fullest expression of what their love makes possible. This path synthesizes the teachings of Barry Long, Charles Muir, and Jan Day into a complete framework for couples who want their entire relationship to be a conscious spiritual practice.",
    for_couples: "For couples who want their relationship to be the most alive, most honest, and most deeply nourishing thing in their lives.",
    sacred_invitation: {
      title: "Who This Path Calls",
      body: "This path calls to couples who sense that their relationship has more potential than it has yet realized — not just in the bedroom but in the full fabric of daily life together. Couples who want their ordinary moments to carry the same quality of genuine presence they aspire to bring to formal practice.",
      resonances: [
        "You want your entire relationship to feel like a sacred practice, not just the intimate parts.",
        "You are drawn to bringing ceremony and intention to ordinary moments.",
        "You want to be genuinely known by your partner — and to genuinely know them.",
        "You want love to be the most serious and the most joyful thing in your life.",
        "You are ready to stop coasting on the assumption of love and begin the practice of it.",
      ],
    },
    pillars: [
      { id: "presence_full", label: "FULL PRESENCE", title: "Arriving Completely", body: "Conscious union begins with the simplest and most demanding of all practices: arriving completely. Not coming to the relationship with half your attention elsewhere, but actually arriving — body, heart, and awareness fully present in this moment, with this person, without reservation. The quality of everything else — communication, lovemaking, shared silence, conflict, repair — depends on this single foundational quality." },
      { id: "ceremony", label: "CEREMONY", title: "Ordinary Life Made Sacred", body: "Ceremony is the practice of bringing conscious attention and genuine intention to an ordinary act — and in doing so, transforming its quality entirely. Couples who bring ceremony to their intimate life discover that the threshold moments — the beginning and end of a lovemaking encounter, the morning greeting, the parting before a day apart — are among the most powerful opportunities available for deepening genuine connection." },
      { id: "recognition", label: "RECOGNITION", title: "Seeing the Beloved Truly", body: "One of the quiet tragedies of long-term relationships is the gradual replacement of the living person with the concept of the person. Partners stop seeing each other — they see their accumulated image, their expectations, their history. The practice of recognition is the ongoing discipline of looking again — meeting the beloved as if for the first time, as the living, changing, fundamentally mysterious person they actually are." },
      { id: "honest_love", label: "HONEST LOVE", title: "Love Without Concealment", body: "Most couples are not living in love but in the fear of losing love — and that fear quietly determines what they say, what they withhold, and what they conceal. Honest love requires being exactly who you are in the presence of the beloved — not the edited, managed version, but the complete truth of this moment's experience. This honesty, when met with genuine acceptance, creates a depth of intimacy no romantic gesture can substitute for." },
      { id: "devotional_practice", label: "DEVOTION", title: "The Daily Practice of Love", body: "Conscious union is not established once and maintained. It is a daily practice — the ongoing choice to bring genuine attention and care to the relationship rather than assuming it will sustain itself on history and romantic residue. Love is not a state you arrive at. It is something you do, every day, with the full force of your conscious attention." },
      { id: "sacred_silence", label: "SACRED SILENCE", title: "Being Together Without Filling", body: "Shared silence — not the silence of emotional withdrawal, but the specific quality of two people genuinely at ease in each other's presence — reveals dimensions of connection that speech cannot reach. In it, something very quiet and very deep has room to move. Cultivating this silence as a conscious practice, rather than allowing it only by accident, is one of the most intimate acts available to a couple." },
    ],
    premium_features: [
      { id: "union_practices", label: "UNION PRACTICES", description: "Daily partner practices for full presence, recognition, and genuine conscious contact in ordinary life." },
      { id: "ceremony_library", label: "CEREMONY LIBRARY", description: "Complete ritual frameworks: honoring practices, closing rituals, morning unions, and the sacred marking of relationship milestones." },
      { id: "long_muir_library", label: "LONG & MUIR LIBRARY", description: "The complete Conscious Union teaching library drawn from Barry Long and Charles Muir's full bodies of work." },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PATH LONGFORM (keyed by slug for detail views)
// ─────────────────────────────────────────────────────────────────────────────

export const PATH_LONGFORM_BY_SLUG: Record<string, LongformPath> = {

  "tantra": {
    tagline: "An ancient path translated for modern couples",
    subtitle: "Through breath, presence, polarity, and the sacred body",
    shortDescription: "The five-thousand-year-old map of consciousness that locates the sacred inside the erotic body.",
    fullDescription:
      "Tantra is not a technique for better sex. It is a five-thousand-year-old map of consciousness that recognized, long before modern psychology, that the erotic body and the spiritual body are not separate. They are the same body, approached with different qualities of attention. Where most spiritual paths asked practitioners to transcend the senses, Tantra insisted on inhabiting them completely — recognizing in pleasure, sensation, and the living charge between two bodies the most immediate expression of the divine available to human beings.",
    forCouples: "For couples who want intimacy to feel conscious tonight and grow spiritually over time.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls to couples who sense that something more is possible — not simply more pleasure or more frequency, but a different quality of contact altogether. Couples who have noticed that even in their most intimate moments, something in them is still watching, waiting, slightly elsewhere.",
      resonances: [
        "You want depth more than technique.",
        "You sense that your lovemaking has more silence, more reverence, and more aliveness available than you have yet discovered.",
        "You are drawn to the idea that spiritual practice and erotic life belong together.",
        "You want both partners to feel genuinely seen — not merely desired.",
        "You are willing to be changed by intimacy, not just satisfied by it.",
      ],
    },
    pillars: [
      { id: "shiva_shakti", label: "ŚIVA & ŚAKTI", title: "Sacred Polarity", body: "At the heart of Tantra is the recognition that existence itself is a dance between pure witnessing consciousness (Śiva) and living creative energy (Śakti). In your relationship, these poles are alive in every moment of genuine contact. One partner holds space; the other fills it. The quality of your intimacy depends on how consciously you inhabit and honor these complementary currents." },
      { id: "prana", label: "PRĀṆA", title: "Breath as Bridge", body: "In Tantric physiology, breath is the vehicle of prāṇa — the animating life force that flows through the subtle body. Conscious breathing during intimacy transforms the quality of contact: it regulates the nervous system, opens the body to deeper sensation, and creates a shared rhythm that synchronizes two subtle bodies before the physical bodies even touch." },
      { id: "deha", label: "DEHA", title: "Body as Living Temple", body: "Tantra was the first tradition to fully consecrate the physical body — to insist that the body is not an obstacle to the sacred but its most immediate and complete expression. Every part of it is worthy of reverence. In relationship, this means approaching your partner's body with the quality of attention you would bring to a genuinely holy space: unhurried, curious, full of gratitude." },
      { id: "bhakti", label: "BHAKTI", title: "Devotion", body: "Bhakti is the yogic path of love as spiritual practice. In Tantric relationship, it transforms how partners meet: not as two individuals negotiating needs, but as two expressions of divine consciousness recognizing each other. It requires the willingness to look at your partner as if for the first time — and to let that aliveness land in the body as genuine reverence." },
      { id: "spanda", label: "SPANDA", title: "The Divine Pulse", body: "Spanda — the vibrant, pulsing aliveness at the heart of Kashmir Shaivism — is not something to be created in intimacy. It is something to be recognized: already present in the trembling of genuine excitement, in the pause between exhale and inhale, in the moment when two bodies first touch with full awareness." },
      { id: "samadhi", label: "SAMĀDHI", title: "The Dissolution", body: "At the depth of genuine conscious lovemaking, the boundary between two selves becomes permeable, and what is experienced is not two people touching but one field of awareness moving within itself. This state cannot be forced. It arises when presence, breath, polarity, and devotion are all fully and honestly inhabited." },
      { id: "samskara", label: "SAṂSKĀRA", title: "The Closing Ritual", body: "How a couple closes an intimate encounter is as important as how they enter it. Couples who close with care — a held stillness, a breath taken together, a whispered truth, or a moment of silent gratitude — create a different quality of shared history. The closing ritual is where the experience settles as a genuine resource." },
    ],
    premiumFeatures: [
      { id: "tantra_preview_1", label: "SOUL GAZING (7 min)", description: "Face each other, soften your eyes, and breathe without fixing. Let seeing come before touch." },
      { id: "tantra_preview_2", label: "HEART SALUTATION (6 min)", description: "A reverent opening ritual that turns intention into embodied presence before intimacy." },
      { id: "tantra_preview_3", label: "YAB-YUM EMBRACE (8 min)", description: "Seated union with synchronized breath to rebuild coherence, safety, and devotional charge." },
      { id: "tantra_preview_4", label: "SLOW SEX (9 min)", description: "Presence-led contact that favors depth and attunement over speed and performance." },
    ],
  },

  "tao": {
    tagline: "Sexual energy as vital medicine, not expenditure",
    subtitle: "Through circulation, refinement, and shared life force",
    shortDescription: "The ancient Taoist science of sexual energy — translated into sustainable vitality and deepening love.",
    fullDescription:
      "Taoism recognized two thousand years ago what modern medicine is only beginning to map: that sexual energy and life energy are the same force. How a couple manages that force determines not only the quality of their intimate life but the health of their bodies and the depth of their bond over decades. The Taoist path transforms desire from a brief peak that depletes into a circulating current that heals, vitalizes, and deepens love with each encounter.",
    forCouples: "For couples who want their intimate life to leave them more alive, more in love, and more energized — not less.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls to couples who have noticed that conventional lovemaking often leaves a subtle depletion in its wake. Couples who are curious about the body's deeper intelligence and want their erotic life to contribute to their health and vitality rather than drawing from it.",
      resonances: [
        "You want your intimate life to leave both of you feeling more energized, not less.",
        "You are curious about the body's subtle energetic architecture.",
        "You want a practice that deepens over decades rather than depending on novelty.",
        "You are drawn to ancient science applied with practical precision.",
        "You want both partners to benefit equally and lastingly from what flows between you.",
      ],
    },
    pillars: [
      { id: "jing", label: "JĪNG", title: "Vital Essence", body: "Jīng is the most fundamental form of life force in Taoist physiology — the concentrated vital essence governing vitality, creativity, and longevity. The Taoist path begins with the recognition that jīng can be cultivated and redirected through the body rather than discharged — not deprivation but expansion: more aliveness, more connection, sustained and compounding over time." },
      { id: "chi", label: "CHĪ", title: "Life Current", body: "Chī is the animating current flowing through the body's meridian system. In lovemaking, chī determines whether touch feels alive or mechanical, whether presence feels mutual or absent. Learning to feel chī in your own body — and then the current between your body and your partner's — transforms physical intimacy into genuine energy exchange." },
      { id: "shen", label: "SHÉN", title: "Spirit & Luminosity", body: "Shén governs consciousness, emotional radiance, and genuine presence — the lit quality in the eyes, the attention that feels complete. Taoist sexual cultivation aims ultimately at shén: the refinement of sexual and vital energy all the way through the heart and mind, until lovemaking becomes an act of full spiritual presence." },
      { id: "microcosmic_orbit", label: "MICROCOSMIC ORBIT", title: "Shared Energy Circulation", body: "The Microcosmic Orbit — the conscious circulation of chī up the spine, over the crown, and down through the front of the body — becomes extraordinary as a couples practice: two bodies learning to share and circulate their combined energy field through synchronized breath, intention, and conscious touch." },
      { id: "yin_yang", label: "YĪN YÁNG", title: "The Dance of Complementary Energies", body: "Yīn and yáng are not opposites in conflict but complementary principles in dynamic balance. Genuine intimacy requires the fluid, conscious exchange of both, with each partner capable of inhabiting either pole as the living moment requires." },
      { id: "valley_orgasm", label: "VALLEY ORGASM", title: "Pleasure That Expands", body: "The distinction between peak orgasm, which discharges vital energy, and valley orgasm, which expands and circulates it, is the gateway to a dimension of erotic experience most couples never reach: full-body waves of sensation that build without the conventional arc of tension and release, leaving both partners more alive and more deeply connected." },
      { id: "healing_love", label: "HEALING LOVE", title: "Lovemaking as Medicine", body: "The ancient Taoist physicians documented what modern endocrinology confirms: that conscious, loving sexual practice has measurable effects on hormonal balance, immune function, and longevity — transforming lovemaking from a recreational act into a genuine and renewable health practice." },
    ],
    premiumFeatures: [
      { id: "tao_preview_1", label: "MICROCOSMIC ORBIT IN DUAL CULTIVATION (9 min)", description: "Circulate shared energy through breath and attention so intimacy leaves both partners nourished." },
      { id: "tao_preview_2", label: "THE BIG DRAW (8 min)", description: "Refine arousal upward through spinal awareness instead of discharging into depletion." },
      { id: "tao_preview_3", label: "INNER SMILE WITH PARTNER (6 min)", description: "A gentle Taoist softening ritual that brings warmth back into stressed connection." },
      { id: "tao_preview_4", label: "FIRE AND WATER DUAL CULTIVATION (10 min)", description: "Balance intensity and calm so desire stays alive without overwhelm." },
    ],
  },

  "polarity": {
    tagline: "The living charge between two people",
    subtitle: "Restoring desire through presence, direction, and radiance",
    shortDescription: "For couples who want the magnetic charge back — through genuine presence and radiance, not performance.",
    fullDescription:
      "Most couples don't fall out of love. They fall out of polarity. The qualities that created the initial attraction gradually collapse under the demands of modern equality and shared logistics. When the energetic difference flattens, desire has nothing to arc across. This path restores that living charge: not through role-playing, but through the genuine cultivation of directed presence and luminous radiance as spiritual practices.",
    forCouples: "For couples who remember what it felt like to be magnetically drawn to each other — and want that alive quality back.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls to couples who sense that the energetic difference between them has flattened — that they are more colleagues than lovers, more comfortable than turned on. It calls to the partner who wants to rediscover genuine presence, and to the partner who wants to rediscover genuine opening.",
      resonances: [
        "You want to feel magnetically drawn to each other again.",
        "You sense that something has flattened between you and don't know how to restore it.",
        "You want more aliveness in the space between you, not more management.",
        "You are willing to stop negotiating and start inhabiting.",
        "You are curious about the role of energetic difference in sustained desire.",
      ],
    },
    pillars: [
      { id: "presence", label: "PRESENCE", title: "Directed Consciousness", body: "The masculine principle is consciousness that has a direction — the specific quality of attention that moves toward, commits fully, and holds steady under relational pressure. Presence is what a partner feels when the other is truly here — not managing from a slight distance, but actually, bodily, unavoidably here." },
      { id: "radiance", label: "RADIANCE", title: "Luminous Life Force", body: "The feminine principle is energy that moves outward: the natural radiance that animates a space, expresses feeling fully, and creates the living field of aliveness a relationship exists within. Radiance is what happens when a person stops managing their expression and allows their aliveness to move through the body without restriction." },
      { id: "the_edge", label: "THE EDGE", title: "Growth as Devotion", body: "Genuine polarity requires both partners to be continuously growing into their deepest capacity. The masculine edge is the willingness to feel fear and move forward into love anyway. The feminine edge is the willingness to trust — to open to genuine depth rather than testing and contracting when that depth is offered." },
      { id: "the_gift", label: "THE GIFT", title: "Full Offering", body: "The deepest masculine gift is undivided presence — the full force of conscious attention offered without reservation. The deepest feminine gift is radiant openness — the full expression of aliveness and feeling, offered without guarding. When both gifts are given simultaneously, the couple enters a living circuit indistinguishable from spiritual experience." },
      { id: "devotion", label: "DEVOTION", title: "Seeing the Sacred in the Beloved", body: "Genuine erotic devotion — the capacity to see through the surface of the beloved to the divine consciousness moving within them — is not romantic sentiment but a cultivated perceptual practice. It is what distinguishes adoration from objectification, devotion from possession." },
      { id: "surrender", label: "SURRENDER", title: "The Practice of Opening", body: "Surrender is the conscious choice to trust a partner's genuine presence enough to release the management that keeps a person safe and slightly contracted. For the feminine-identified partner, surrender to authentic masculine presence is one of the most profound spiritual practices available." },
    ],
    premiumFeatures: [
      { id: "polarity_preview_1", label: "TEASE, GAZE, TOUCH (7 min)", description: "Rebuild magnetic contrast through playful pacing, eye contact, and consent-led touch." },
      { id: "polarity_preview_2", label: "ONE HEART GAZING (6 min)", description: "Train directed presence and radiant openness through still eye-based attunement." },
      { id: "polarity_preview_3", label: "DEVOTIONAL HOLD (6 min)", description: "A structured hold practice for restoring masculine steadiness and feminine trust." },
      { id: "polarity_preview_4", label: "DESIRE MAP ROUND (8 min)", description: "Name edge, need, and invitation so charge grows without confusion or pressure." },
    ],
  },

  "sacred-desire": {
    tagline: "Where the nervous system meets the sacred",
    subtitle: "Through somatic truth, emotional courage, and body-led love",
    shortDescription: "For couples who know that the heart must open before the body can — and want the practices that make that opening real.",
    fullDescription:
      "The most sophisticated erotic techniques in the world cannot open a body that does not feel genuinely safe. Most couples carry, in their tissues and nervous systems, the accumulated history of every moment they were not fully received. This path works where that accumulation lives — in the body itself — offering the specific practices of somatic honesty, emotional courage, and genuine nervous system safety that allow love to arrive all the way in.",
    forCouples: "For couples who want their love to feel as deep as they know it is — and want to remove what stands between them and that depth.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls to couples who have noticed that something in them stays slightly guarded even with the person they love most. Who sense that their intimate life could be more honest, more vulnerable, more alive — but who have not found the specific practice that makes that openness feel genuinely safe.",
      resonances: [
        "You want to feel genuinely known — not just loved.",
        "You sense that protection has quietly replaced presence in your intimate life.",
        "You are willing to feel what is actually true in your body, even when it is difficult.",
        "You want both partners to feel safe to be fully themselves in each other's presence.",
        "You believe that emotional honesty and erotic aliveness are the same movement.",
      ],
    },
    pillars: [
      { id: "soma", label: "SOMA", title: "The Body Knows", body: "The body holds a quality of knowledge the mind cannot manufacture. It knows whether it is genuinely safe or merely reassured. Somatic practice begins with the demanding discipline of learning to feel what the body actually knows — and trusting that intelligence as the primary guide to what intimacy needs." },
      { id: "nervous_system", label: "NERVOUS SYSTEM", title: "Safety as Eros", body: "Genuine eros in a long-term relationship requires the parasympathetic state — the physiological condition of rest, openness, and receptivity. Creating genuine felt safety for a partner is not a preliminary to desire. It is one of the most intimate and erotic acts available between two people." },
      { id: "disclosure", label: "DISCLOSURE", title: "Body-Led Truth", body: "Body-led disclosure is the practice of sharing what is present in the body — the tightening, the warmth, the held breath — without the narrative mind's interpretation layered over it. This quality of somatic honesty creates over time a mutual knowing that no amount of conventional communication can substitute for." },
      { id: "shame", label: "SHAME", title: "The Dissolution of Armor", body: "Shame lives in the body before it lives in the mind. It quietly determines which dimensions of desire and authentic self can be expressed. Its dissolution is a gradual, body-led process of discovering, again and again, that genuine exposure to a genuinely safe partner changes what shame said was true about you." },
      { id: "contact", label: "CONTACT", title: "Meeting Without Merging", body: "Genuine contact requires two distinct, fully present people actually meeting rather than two familiar patterns interacting from comfortable habit. Contact requires the willingness to be surprised by the beloved — which requires the willingness to actually look." },
      { id: "repair", label: "REPAIR", title: "Rupture as Doorway", body: "Couples who learn to repair well develop something more valuable than the absence of conflict: a trust in the relationship's resilience that creates the safety in which genuine vulnerability — and therefore genuine eros — becomes available." },
    ],
    premiumFeatures: [
      { id: "embodied_preview_1", label: "THE YES / NO EXERCISE (7 min)", description: "Rebuild consent clarity and trust through direct, body-honest boundary language." },
      { id: "embodied_preview_2", label: "PARTS WORK DIALOGUE (10 min)", description: "Name protective parts without blame so truth can land safely between partners." },
      { id: "embodied_preview_3", label: "APPRECIATION & WITNESS (7 min)", description: "Pair emotional repair with clear witnessing and relational warmth." },
      { id: "embodied_preview_4", label: "THE UNSAID VOICE (6 min)", description: "Release held truth in a structured format that protects safety and connection." },
    ],
  },

  "neo-tantra": {
    tagline: "What arrives when you finally stop rushing",
    subtitle: "Through stillness, internal awareness, and the intelligence of unhurried contact",
    shortDescription: "The Tantric discovery that slowing down is not settling for less — it is the path to everything intimacy has been trying to offer.",
    fullDescription:
      "Every conventional approach to improving intimate life adds something — more technique, more variety, more novelty, more effort. Diana Richardson's approach, refined through thousands of hours working directly with couples, subtracts. And in the subtraction, something arrives that no technique can manufacture: the quality of erotic presence and genuine connection only available in genuine stillness.",
    forCouples: "For couples who sense that something quieter, deeper, and more sustaining than what they've known is possible.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls to couples who are tired of trying harder — who have added enough techniques, enough workshops, enough well-intentioned effort — and who sense that the intimacy they want is not on the other side of more, but on the other side of less.",
      resonances: [
        "You want genuine connection more than performed passion.",
        "You sense that your intimate life would deepen if it slowed down.",
        "You are willing to give up the peak if it means gaining something more lasting.",
        "You want both partners to feel genuinely arrived — not arriving.",
        "You are curious about what the body knows when it is not being directed.",
      ],
    },
    pillars: [
      { id: "stillness", label: "STILLNESS", title: "The Ground of Eros", body: "Stillness is not the absence of desire. It is the specific quality of inner presence — relaxed, alert, genuinely arrived in the body — in which desire can move freely without being chased or managed. The Slow Love path makes stillness not the problem to be solved by action but the ground from which genuine erotic intelligence naturally moves." },
      { id: "internal_touch", label: "INNER TOUCH", title: "Awareness Inside the Body", body: "Richardson's central practice innovation is 'inner touch' — the cultivation of awareness inside the body during lovemaking. Instead of experiencing touch as something that happens to the surface, inner touch means inhabiting the body so completely that sensation is felt from within. This simple redirection transforms the quality of intimate contact more profoundly than any external technique." },
      { id: "non_goal", label: "NON-GOAL", title: "Releasing the Destination", body: "Non-goal lovemaking liberates pleasure from the tyranny of destination. When neither partner is trying to get anywhere, time expands, sensation deepens, and something arrives that contains more aliveness than orgasm itself — without the depletion." },
      { id: "relaxation", label: "RELAXATION", title: "The Erotic Power of Letting Go", body: "A genuinely relaxed body is among the most erotic states available. Its capacity for sensation and energetic exchange is orders of magnitude greater than those available in a contracted, goal-seeking body. Learning to genuinely relax in the presence of the beloved, as a practice, is the primary skill of Slow Love." },
      { id: "body_intelligence", label: "BODY INTELLIGENCE", title: "Trust the Deeper Knowing", body: "When two bodies are genuinely present to each other, relaxed, and free from the direction of goal-seeking mind, the energy between them knows what it wants to do. Couples who learn to follow the body's own intelligence discover an erotic creativity and depth that deliberate effort never achieves." },
      { id: "time", label: "TIME", title: "Inhabiting Duration", body: "One of the most immediate and transformative practices of Slow Love is simply more time: unhurried, without destination, given to the experience of being genuinely present with another person's body. When couples treat intimate time as worthy of genuine spaciousness, something changes fundamentally in what is available there." },
    ],
    premiumFeatures: [
      { id: "slowlove_preview_1", label: "SYNCHRONIZED HEART BREATHING (5 min)", description: "Use coherent breath to settle both nervous systems before deeper contact." },
      { id: "slowlove_preview_2", label: "THE SOFT EYE (6 min)", description: "Reduce pressure and increase tenderness by softening visual focus and pace." },
      { id: "slowlove_preview_3", label: "BLISSFUL STILLNESS AFTER LOVE (8 min)", description: "Integrate intimacy in stillness so connection accumulates instead of fading." },
      { id: "slowlove_preview_4", label: "VALLEY ORGASM RESTING (9 min)", description: "Train sustained pleasure without urgency, force, or performance goals." },
    ],
  },

  "vajrayana-kashmir-shaivism": {
    tagline: "Two people genuinely meeting — body, heart, and awareness",
    subtitle: "Through presence, ceremony, and the art of mutual recognition",
    shortDescription: "For couples ready to bring the full force of conscious awareness to every dimension of their life together.",
    fullDescription:
      "Conscious union is the distillation of what every authentic intimacy path is pointing toward: two people who are genuinely present to each other, genuinely honest with each other, and genuinely growing together into the fullest expression of what their love makes possible. This path synthesizes the teachings of Barry Long, Charles Muir, and Jan Day into a complete framework for couples who want their entire relationship to be a conscious spiritual practice.",
    forCouples: "For couples who want their relationship to be the most alive, most honest, and most deeply nourishing thing in their lives.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls to couples who sense that their relationship has more potential than it has yet realized — not just in the bedroom but in the full fabric of daily life together. Couples who want their ordinary moments to carry the same quality of genuine presence they aspire to bring to formal practice.",
      resonances: [
        "You want your entire relationship to feel like a sacred practice, not just the intimate parts.",
        "You are drawn to bringing ceremony and intention to ordinary moments.",
        "You want to be genuinely known by your partner — and to genuinely know them.",
        "You want love to be the most serious and the most joyful thing in your life.",
        "You are ready to stop coasting on the assumption of love and begin the practice of it.",
      ],
    },
    pillars: [
      { id: "presence_full", label: "FULL PRESENCE", title: "Arriving Completely", body: "Conscious union begins with the simplest and most demanding of all practices: arriving completely — body, heart, and awareness fully present in this moment, with this person, without reservation. The quality of everything else depends on this single foundational quality." },
      { id: "ceremony", label: "CEREMONY", title: "Ordinary Life Made Sacred", body: "Ceremony is the practice of bringing conscious attention and genuine intention to an ordinary act. Couples who bring ceremony to their intimate life discover that the threshold moments — the beginning and end of a lovemaking encounter, the morning greeting, the parting before a day apart — are among the most powerful opportunities for deepening genuine connection." },
      { id: "recognition", label: "RECOGNITION", title: "Seeing the Beloved Truly", body: "One of the quiet tragedies of long-term relationships is the gradual replacement of the living person with the concept of the person. The practice of recognition is the ongoing discipline of looking again — meeting the beloved as if for the first time, as the living, changing, fundamentally mysterious person they actually are." },
      { id: "honest_love", label: "HONEST LOVE", title: "Love Without Concealment", body: "Honest love requires being exactly who you are in the presence of the beloved — not the edited, managed version, but the complete truth of this moment's experience. This honesty, when met with genuine acceptance, creates a depth of intimacy no romantic gesture can substitute for." },
      { id: "devotional_practice", label: "DEVOTION", title: "The Daily Practice of Love", body: "Conscious union is a daily practice — the ongoing choice to bring genuine attention and care to the relationship rather than assuming it will sustain itself on history and romantic residue. Love is not a state you arrive at. It is something you do, every day, with the full force of your conscious attention." },
      { id: "sacred_silence", label: "SACRED SILENCE", title: "Being Together Without Filling", body: "Shared silence — the specific quality of two people genuinely at ease in each other's presence — reveals dimensions of connection that speech cannot reach. In it, something very quiet and very deep has room to move. Cultivating this silence as a conscious practice is one of the most intimate acts available to a couple." },
    ],
    premiumFeatures: [
      { id: "union_preview_1", label: "DAILY HOMECOMING RITUAL (6 min)", description: "A repeatable arrival practice that turns ordinary evenings into conscious reunion." },
      { id: "union_preview_2", label: "CONSCIOUS LOVEMAKING — THE BARRY LONG WAY (9 min)", description: "Presence-led union that favors truth, stillness, and complete relational contact." },
      { id: "union_preview_3", label: "THE EIGHT EMBRACES & MUTUAL MASSAGE (12 min)", description: "A ceremonial sequence for reverence, attunement, and body-level trust." },
      { id: "union_preview_4", label: "SACRED INTENTION SETTING (5 min)", description: "Open with one shared vow so intimacy aligns with your deepest relationship values." },
    ],
  },

  "kama-sutra": {
    tagline: "Cultivated desire as art, atmosphere, and relational intelligence",
    subtitle: "Through preparation, playful polarity, and refined sensual communication",
    shortDescription: "The Kāma Śāstra tradition is not a list of positions but a complete art of cultivating desire, timing, and devotion in daily couple life.",
    fullDescription:
      "The Kāma Sūtra belongs to the broader Indian Kāma Śāstra tradition: a civilizational art of love, aesthetics, timing, and refined sensual presence. Its original intent was never technical acrobatics. It was to teach couples how to prepare mind, body, atmosphere, and relational tone so intimacy becomes elegant, embodied, and emotionally intelligent.\n\nIn modern life, this path helps couples move from rushed intimacy to prepared intimacy. You do not begin with pressure or performance. You begin with refinement: mood, anticipation, touch literacy, playful language, and mutual consent. As refinement grows, desire becomes less fragile and more available.\n\nThe core gift of this path is relational craftsmanship. Small details — pacing, fragrance, quality of gaze, rhythm of approach, how you ask, how you pause, how you close — create the difference between mechanical contact and memorable intimacy. The Kama path trains those details as a devotional art.",
    forCouples: "For couples who want desire to feel beautiful, intelligent, and emotionally connected — not rushed or performative.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls couples who already love each other but want to bring more elegance and intentionality into their erotic life. It is for partners who feel that chemistry alone is not enough and who want a repeatable craft of anticipation, communication, and sensual refinement.",
      resonances: [
        "You want to create atmosphere before intensity.",
        "You want playful erotic connection without emotional chaos.",
        "You value beauty, timing, and quality over pressure and speed.",
        "You want both partners to feel invited, not managed.",
        "You want intimacy to feel lived, not improvised.",
      ],
    },
    pillars: [
      { id: "alankara", label: "ALANKĀRA", title: "Beauty as Preparation", body: "In the Kama tradition, adornment and atmosphere are not superficial; they regulate nervous-system openness and anticipation. Beauty prepares the body to receive." },
      { id: "vilasa", label: "VILĀSA", title: "Playful Artfulness", body: "Erotic play is structured through teasing, pacing, and curiosity. Skillful play keeps desire alive without tipping into coercion or emotional confusion." },
      { id: "sambhoga", label: "SAMBHOGA", title: "Union as Craft", body: "Physical union is approached as cultivated practice: tempo, consent, breath, and response shape quality far more than novelty." },
      { id: "samyama", label: "SAMYAMA", title: "Attention and Timing", body: "The right rhythm matters. Sensual timing trains couples to pause, ask, and modulate intensity so both bodies remain included." },
      { id: "rasa", label: "RASA", title: "Emotional Flavor", body: "Kama wisdom includes emotional tone. Desire deepens when affection, admiration, and playful warmth are consciously included." },
      { id: "samskara_close", label: "COMPLETION", title: "Closing with Care", body: "How intimacy ends shapes memory and trust. Deliberate closure helps erotic confidence grow from encounter to encounter." },
    ],
    premiumFeatures: [
      { id: "kama_preview_1", label: "THE TWINING CREEPER (8 min)", description: "A closeness position that builds charge through entwined bodies and shared pacing." },
      { id: "kama_preview_2", label: "THE EIGHT EMBRACES & MUTUAL MASSAGE (12 min)", description: "Classical embrace progression that develops trust, touch literacy, and sensual anticipation." },
      { id: "kama_preview_3", label: "TEASE, GAZE, TOUCH (7 min)", description: "A playful ignition ritual for couples who want lightness before deeper intimacy." },
      { id: "kama_preview_4", label: "ONE SONG CURRENT (5 min)", description: "Use one shared song to regulate pace, polarity, and emotional connection before touch escalates." },
    ],
  },

  "qigong-neidan": {
    tagline: "Internal alchemy for vitality, longevity, and calm erotic power",
    subtitle: "Through qi cultivation, circulation, and partner-aware energetic discipline",
    shortDescription: "Qigong and Neidan train couples to build, store, and circulate life-force so intimacy becomes energizing, clear, and sustainable.",
    fullDescription:
      "Qigong and Neidan (internal alchemy) come from Taoist cultivation lineages focused on breath, posture, intent, and the refinement of life-force. Applied to relationship, these methods help couples move from intensity spikes and exhaustion to continuity, vitality, and embodied coherence.\n\nThe practical shift is profound: arousal is no longer a pressure event to discharge. It becomes a resource to circulate. Through breath and body alignment, couples learn to transform charge into warmth, presence, and emotional steadiness.\n\nThis path is especially valuable for modern couples under chronic stress. Rather than asking for more willpower, it builds energetic capacity. Over time, both partners feel more resilient, more connected, and less depleted by intimacy.",
    forCouples: "For couples who want intimacy to support health, focus, and long-term devotion — not short-lived peaks followed by collapse.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls couples who feel the cost of modern overstimulation and want a grounded, trainable method for conserving and circulating energy together. It supports partners who value structure, consistency, and measurable progress in intimacy.",
      resonances: [
        "You want sustained vitality after intimacy.",
        "You are drawn to body-based energetic practice.",
        "You want structure, not random experimentation.",
        "You want to reduce stress reactivity in your love life.",
        "You want long-term erotic resilience.",
      ],
    },
    pillars: [
      { id: "qi_cultivation", label: "QI", title: "Energy Cultivation", body: "The first discipline is generating and sensing qi in the body through breath and posture before sharing it with a partner." },
      { id: "dantian", label: "DANTIAN", title: "Lower Belly Root", body: "Stable intimacy begins in grounding. Lower-belly awareness prevents high-charge states from becoming anxious or scattered." },
      { id: "orbit", label: "ORBIT", title: "Circulation Over Discharge", body: "Conscious circulation allows energy to distribute through the whole system, replacing post-intimacy depletion with sustained warmth." },
      { id: "song", label: "SONG", title: "Relaxed Power", body: "Neidan emphasizes relaxed structure: soft tissue, aligned spine, clear intent. This produces deep sensitivity without collapse." },
      { id: "he", label: "HARMONY", title: "Partner Coherence", body: "When two nervous systems entrain through breath and pacing, emotional safety and attraction can rise together." },
      { id: "jing_shen", label: "JING TO SHEN", title: "Refinement Path", body: "Over time, raw drive is refined into vitality, clarity, and devotional presence available in ordinary daily life." },
    ],
    premiumFeatures: [
      { id: "qigong_preview_1", label: "MICROCOSMIC ORBIT IN DUAL CULTIVATION (9 min)", description: "Partner-based orbit practice to circulate shared charge through spine and front channel." },
      { id: "qigong_preview_2", label: "THE BIG DRAW (8 min)", description: "A controlled alchemy drill for upward refinement of sexual energy." },
      { id: "qigong_preview_3", label: "CHAKRA BREATHING FOR TWO (8 min)", description: "A structured channel-opening sequence for full-body energetic coherence." },
      { id: "qigong_preview_4", label: "INNER FLUTE BREATH (6 min)", description: "Subtle breath-and-tone practice for settling and sensitizing the shared field." },
    ],
  },

  "kundalini-kriya-yoga": {
    tagline: "Disciplined awakening of latent energy with grounded couple integration",
    subtitle: "Through breath ratios, bandha, spinal ascent, and careful regulation",
    shortDescription: "Kundalini and Kriya methods cultivate ascending life-force while preserving safety, clarity, and relational responsibility.",
    fullDescription:
      "Kundalini and Kriya Yoga lineages developed precise energetic technologies: breath ratios, locks (bandha), concentration points, and spinal attention designed to awaken dormant potential gradually and safely. In couple context, this path requires mature pacing and explicit consent because energetic intensity can amplify everything already present.\n\nIts modern value is not spectacle but discipline. Partners learn how to prepare body and mind before activation, how to track overload signals early, and how to integrate after high-charge practice so connection deepens rather than destabilizes.\n\nWhen practiced responsibly, this path can increase vitality, emotional clarity, and devotional focus. It turns intensity into transformation through method, containment, and regular integration.",
    forCouples: "For couples called to energetic depth who are willing to prioritize safety, pacing, and integration over intensity chasing.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls couples with sincere spiritual intention who want a structured energetic discipline. It is for partners ready to train consistency, not chase peak experiences, and who understand that safety is part of sacredness.",
      resonances: [
        "You want energetic awakening with clear structure.",
        "You value consent and regulation in high-intensity practice.",
        "You are willing to move slowly and integrate fully.",
        "You want intensity to make love kinder, not harsher.",
        "You are committed to long-term practice.",
      ],
    },
    pillars: [
      { id: "purification", label: "ŚODHANA", title: "Preparation and Purification", body: "Activation without preparation destabilizes. Foundational regulation and breath capacity come first." },
      { id: "prana_control", label: "PRĀṆĀYĀMA", title: "Directed Breath", body: "Breath ratios and pauses shape energetic ascent; precision matters more than force." },
      { id: "bandha", label: "BANDHA", title: "Energetic Locks", body: "Subtle muscular locks guide and protect energetic flow when arousal and activation increase." },
      { id: "sushumna", label: "SUṢUMNĀ", title: "Spinal Channel Awareness", body: "Attention through the central channel supports coherent ascent rather than scattered reactivity." },
      { id: "integration", label: "INTEGRATION", title: "Downregulation and Grounding", body: "Every high-charge practice needs closure: grounding touch, orientation, hydration, and emotional check-in." },
      { id: "relational_ethics", label: "ETHICS", title: "Consent and Stewardship", body: "Energetic power without relational ethics damages trust. Consent and care remain primary at every stage." },
    ],
    premiumFeatures: [
      { id: "kriya_preview_1", label: "THREE FIRES / TAN TIEN ACTIVATION (8 min)", description: "Build lower-body energetic stability before deeper activation rounds." },
      { id: "kriya_preview_2", label: "CIRCULAR BREATH OF LOVE (8 min)", description: "A partner-safe breath loop to direct intensity into coherence rather than urgency." },
      { id: "kriya_preview_3", label: "CHAKRA BREATHING FOR TWO (8 min)", description: "Structured ascent through shared breath and attention with pacing safeguards." },
      { id: "kriya_preview_4", label: "THE SPACE BETWEEN BREATHS (6 min)", description: "Use inter-breath stillness to stabilize and integrate energetic arousal." },
    ],
  },

  "sufism": {
    tagline: "Heart remembrance as a living relationship practice",
    subtitle: "Through dhikr, witnessing, tenderness, and devotional presence",
    shortDescription: "Sufi relational practice teaches couples to remember the heart in real time — especially inside ordinary moments.",
    fullDescription:
      "Sufism centers remembrance (dhikr): returning awareness from distraction to the living heart. In intimacy, this means the beloved is met not as a role or projection, but as a sacred trust to be witnessed, honored, and received.\n\nSufi-informed couple practice values softness, listening, and the refinement of intention. Love is not proven by intensity alone; it is proven by steadiness of heart under stress, by the willingness to repair quickly, and by the discipline of appreciation.\n\nFor modern couples, this path offers a devotional language that remains practical: short remembrance practices, listening rituals, gratitude rounds, and breath-based stillness that restores connection when distance appears.",
    forCouples: "For couples who want a heart-centered path that unites tenderness, truth, and daily remembrance.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls couples who want spirituality to feel relational, warm, and embodied — not abstract. It serves partners who value tenderness and truth equally and who want to practice love as remembrance, not assumption.",
      resonances: [
        "You want devotion expressed through daily behavior.",
        "You want to reconnect quickly after emotional distance.",
        "You value gratitude and witnessing as core intimacy skills.",
        "You want soft strength instead of emotional shutdown.",
        "You want love to feel sacred and practical at once.",
      ],
    },
    pillars: [
      { id: "dhikr", label: "DHIKR", title: "Remembrance", body: "Return attention to the heart repeatedly during conflict, touch, and conversation." },
      { id: "adab", label: "ADAB", title: "Relational Conduct", body: "Sufi adab emphasizes dignity, kindness, and timing in speech; this protects trust under stress." },
      { id: "sama", label: "SAMĀ", title: "Listening as Practice", body: "True listening softens defensiveness and allows emotional truth to land without escalation." },
      { id: "muraqabah", label: "MURĀQABA", title: "Witnessing Presence", body: "Quiet, shared witnessing helps partners feel held beyond performance or argument." },
      { id: "shukr", label: "SHUKR", title: "Gratitude", body: "Spoken gratitude restores emotional safety and keeps affection visible in daily life." },
      { id: "service", label: "KHIDMA", title: "Love Through Service", body: "Small acts of care become devotional acts that rebuild trust and relational warmth." },
    ],
    premiumFeatures: [
      { id: "sufi_preview_1", label: "MURAQABAH PRESENCE (7 min)", description: "A shared witnessing practice to calm reactivity and restore soft relational contact." },
      { id: "sufi_preview_2", label: "ONE HEART GAZING (6 min)", description: "Heart-led eye practice that deepens tenderness and devotional attention." },
      { id: "sufi_preview_3", label: "APPRECIATION & WITNESS (7 min)", description: "Speak gratitude and mirror truth to renew trust in ordinary moments." },
      { id: "sufi_preview_4", label: "SACRED INTENTION SETTING (5 min)", description: "Open the evening with one shared heart intention before any deeper ritual." },
    ],
  },

  "buddhism-forum": {
    tagline: "Mindful intimacy through compassion, clarity, and ethical presence",
    subtitle: "Through awareness, non-reactivity, and deliberate relational practice",
    shortDescription: "Buddhist relational practice helps couples reduce reactivity, increase compassion, and make intimacy an ethical path of awakening.",
    fullDescription:
      "Buddhist traditions place attention on direct experience, non-harming, and the transformation of reactivity through awareness. In couple life, this translates into mindful speech, emotional regulation, and compassionate presence during moments that normally trigger withdrawal or conflict.\n\nThis path does not bypass desire; it clarifies it. By practicing pause, breath, and honest reflection, couples learn to meet craving, fear, and attachment without collapsing into blame or avoidance.\n\nFor modern relationships, Buddhism offers a practical map: less automatic reaction, more conscious response; less story, more contact; less righteousness, more humility and care.",
    forCouples: "For couples who want to turn conflict, attachment, and everyday stress into a disciplined path of compassion and intimacy.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls couples who want emotional maturity as much as chemistry. It supports partners willing to practice awareness under pressure and to choose repair over reactivity.",
      resonances: [
        "You want fewer escalation loops and more calm clarity.",
        "You want to keep compassion present during difficult talks.",
        "You want intimacy rooted in ethical conduct and mutual respect.",
        "You value reflection and mindful speech.",
        "You want practical tools for attachment-trigger moments.",
      ],
    },
    pillars: [
      { id: "sati", label: "SATI", title: "Mindful Presence", body: "Mindfulness interrupts automatic reaction and opens room for conscious relational choice." },
      { id: "karuna", label: "KARUṆĀ", title: "Compassion", body: "Compassion does not erase boundaries; it humanizes the moment so repair stays possible." },
      { id: "upekkha", label: "UPEKKHĀ", title: "Equanimity", body: "Equanimity helps couples remain steady during emotional weather changes." },
      { id: "samyag_vac", label: "RIGHT SPEECH", title: "Ethical Communication", body: "Truthful, timely, and non-harming speech protects trust in high-stakes conversations." },
      { id: "anicca", label: "IMPERMANENCE", title: "State Awareness", body: "Recognizing that states pass reduces panic and softens rigid partner narratives." },
      { id: "sangha", label: "PRACTICE COMMUNITY", title: "Shared Discipline", body: "Consistent shared practice builds resilience more reliably than occasional insight moments." },
    ],
    premiumFeatures: [
      { id: "buddhist_preview_1", label: "WITNESSING BREATH (7 min)", description: "A mindful co-regulation practice for calming conflict activation before dialogue." },
      { id: "buddhist_preview_2", label: "THE YES / NO EXERCISE (7 min)", description: "Train clear boundaries and compassionate consent language under relational stress." },
      { id: "buddhist_preview_3", label: "PARTS WORK DIALOGUE (10 min)", description: "Unblend from reactive parts and speak from awareness instead of defense." },
      { id: "buddhist_preview_4", label: "THE SOFT EYE — A LOVE KEY (6 min)", description: "Use non-grasping visual attention to restore calm intimacy and mutual regard." },
    ],
  },

  "shamanism": {
    tagline: "Ritual intensity grounded in safety, embodiment, and integration",
    subtitle: "Through release, movement, breath, and ceremonial repair",
    shortDescription: "Shamanic-inspired couple practice uses rhythm, release, and intentional ceremony to clear stagnant emotional charge and reopen connection.",
    fullDescription:
      "Shamanic traditions understand that unresolved emotional intensity often lives in the body before it becomes language. Ritualized movement, breath, sound, and symbolic action can help couples discharge accumulated stress and recover relational aliveness.\n\nIn modern relationship work, the value of this path is not altered-state novelty; it is safe discharge plus clear integration. Partners learn to release activation without blaming each other, then return to eye contact, truth, and consent-led touch.\n\nWhen grounded properly, shamanic practice becomes a powerful repair ally: less frozen resentment, less suppressed charge, and more capacity for authentic intimacy.",
    forCouples: "For couples carrying stored tension, emotional backlog, or shutdown patterns who want embodied release followed by clear reconnection.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls couples who feel that talking alone is no longer enough. It supports partners who need safe, embodied release before they can reconnect through words and touch.",
      resonances: [
        "You need to move energy before discussing it.",
        "You want rituals that clear tension quickly and safely.",
        "You want to prevent emotional backlog from hardening into distance.",
        "You want intensity with clear containment and consent.",
        "You want reliable integration after release.",
      ],
    },
    pillars: [
      { id: "ritual_container", label: "CONTAINER", title: "Safety First", body: "Clear start, stop, and check-in rules keep high-energy practice relationally safe." },
      { id: "somatic_release", label: "RELEASE", title: "Body Before Story", body: "Movement and breath can discharge activation faster than analysis when stress is high." },
      { id: "voice", label: "VOICE", title: "Sound as Clearing", body: "Intentional sound releases held charge and restores emotional contact." },
      { id: "reorientation", label: "RETURN", title: "Back to Presence", body: "After release, couples return to gaze, breath, and touch so connection consolidates." },
      { id: "meaning", label: "MEANING", title: "Ritual Intention", body: "Ritual without intention becomes noise; intention gives emotional transformation direction." },
      { id: "integration", label: "INTEGRATION", title: "Close with Care", body: "A grounded closing sequence prevents post-ritual fragmentation and protects trust." },
    ],
    premiumFeatures: [
      { id: "shamanic_preview_1", label: "SHAKTI SHAKING — A COUPLES PRACTICE (7 min)", description: "Structured shaking to release stress load before attempting deeper intimacy." },
      { id: "shamanic_preview_2", label: "CHAOTIC BREATHING — DYNAMIC STAGE ONE (6 min)", description: "A controlled activation drill for discharge and nervous-system reset." },
      { id: "shamanic_preview_3", label: "GIBBERISH RELEASE (6 min)", description: "Voice-based clearing to empty emotional pressure without story escalation." },
      { id: "shamanic_preview_4", label: "VIGYAN BHAIRAVA EMOTIONAL YOGA (8 min)", description: "Bridge release to integration through truth, breath, and conscious reconnection." },
    ],
  },

  "semen-retention": {
    tagline: "Last longer. Feel more. Become the man she can't stop thinking about.",
    subtitle: "Through energy conservation, valley orgasm, and the stamina that transforms relationships",
    shortDescription: "The ancient Taoist and Tantric practice that replaces the post-sex crash with sustained presence, extended pleasure, and magnetic confidence — for both of you.",
    fullDescription:
      "Most men experience intimacy as a build-up toward a peak that lasts seconds — followed by a crash of energy, presence, and desire to be close. Semen retention is the practice of redirecting that energy instead of losing it. The result is not suppression — it is amplification: longer lovemaking, deeper full-body sensation, sustained emotional presence, and the kind of vitality that transforms how she experiences you. Valley orgasm — the extended, non-ejaculatory climax described across Taoist and Tantric traditions — replaces the 10-second spike with rolling 20- to 40-minute waves of whole-body pleasure that both partners feel. Men who practice retention consistently report higher energy, sharper clarity, deeper emotional availability, and a dramatic increase in their partner's attraction. The post-sex distance that silently erodes so many relationships disappears entirely.",
    forCouples: "For couples who want intimacy to leave both partners more energized, more connected, and more magnetically drawn to each other than before — not less.",
    sacredInvitation: {
      title: "Who This Path Calls",
      body: "This path calls to men who sense that something important is being lost every time sex ends the usual way — and to couples who want to discover what becomes possible when that energy is kept, circulated, and shared instead of spent.",
      resonances: [
        "You want to last longer — not through numbing, but through genuine mastery of your own energy.",
        "You want to wake up the morning after feeling more connected to her, not less.",
        "You want the kind of magnetic presence that makes her feel safe, desired, and genuinely met.",
        "You are curious about valley orgasm — the extended full-body climax Taoist masters describe.",
        "You want a concrete, progressive practice — not vague spiritual advice.",
      ],
    },
    pillars: [
      { id: "conservation", label: "CONSERVATION", title: "Keep What Matters", body: "The foundational principle: what is not lost can be transmuted. Learning to conserve is not deprivation — it is the beginning of a completely different relationship with your own vital energy. The body learns quickly when shown a better alternative to the habitual peak-and-crash." },
      { id: "circulation", label: "CIRCULATION", title: "Move the Fire Upward", body: "Retained energy must move. Breathwork, spinal awareness, and pelvic floor engagement teach the body to circulate arousal upward through the torso, heart, and crown — transforming localized pressure into full-body warmth and presence that she can feel." },
      { id: "valley_orgasm", label: "VALLEY ORGASM", title: "The Orgasm Beyond Orgasm", body: "Valley orgasm is the extended, rolling, full-body climax that arrives when energy circulates instead of discharges. It can last 20 to 40 minutes. Both partners experience it. It is not a myth — it is a trainable skill with a clear progression path." },
      { id: "stamina", label: "STAMINA", title: "Expand What You Can Hold", body: "Progressive training builds the capacity to sustain high arousal without crossing into the ejaculatory reflex. This is not about holding back — it is about expanding what the body can contain and enjoy, week by week." },
      { id: "couple_integration", label: "COUPLE WORK", title: "She Feels It Too", body: "Retention practiced solo is useful. Retention practiced as a couple is transformational. Synchronized breathing, shared stillness at peaks, and mutual energy circulation create a quality of union most couples never access." },
      { id: "morning_after", label: "MORNING AFTER", title: "The Proof Is in the Presence", body: "The clearest sign retention is working: the morning after intimacy, you feel more energized, more emotionally available, and more drawn to your partner than before. She notices before you do." },
    ],
    premiumFeatures: [
      { id: "retention_drills", label: "RETENTION DRILLS", description: "Progressive solo and partnered retention exercises: PC muscle training, breath cycling, arousal-edge awareness, and the complete valley orgasm sequence." },
      { id: "couple_practices", label: "COUPLE INTEGRATION", description: "Guided partner practices: synchronized wave-riding, shared stillness at peaks, energy circulation for two, and morning-after reconnection rituals." },
      { id: "chia_library", label: "TAOIST ENERGY LIBRARY", description: "The complete retention teaching library drawn from Mantak Chia's Taoist sexual energy cultivation and adapted for modern couples." },
    ],
  },
};
