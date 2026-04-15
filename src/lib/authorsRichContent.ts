/**
 * SACRED PATH — PREMIUM AUTHOR RICH CONTENT v1.0
 * 
 * FOR CLAUDE CODE:
 * In src/pages/Authors.tsx, find each premium author entry by their slug.
 * Replace the `content: { teaser: [...] }` block with the full content
 * object provided below for each author.
 * 
 * The exact field schema (matching Deida's structure):
 * content: {
 *   heroIntro: string[]
 *   whoItsFor: { title: string, body: string }[]
 *   practicePreview: { title: string, body: string, steps: string[] }
 *   beginnerTrack: { title: string, body: string, steps: string[] }
 *   advancedTrack: { title: string, body: string, steps: string[] }
 *   quote: { text: string, source: string }
 *   whyMatters: string[]
 *   coreTeachings: { title: string, body: string, beginnerReframe: string, advancedReframe: string }[]
 *   modernUse: { title: string, body: string }[]
 *   shadowToAvoid: { title: string, body: string, beginnerReframe: string, advancedReframe: string }[]
 *   exercises: { title: string, setup: string, steps: string[], integration: string, beginnerNote: string, advancedNote: string }[]
 *   reflectionPrompts: string[]
 *   relatedPaths: { name: string, note: string }[]
 *   premiumBanner: string
 * }
 */

// ─────────────────────────────────────────────────────────────────────────────
// MANTAK CHIA  (slug: "mantak-chia")
// ─────────────────────────────────────────────────────────────────────────────
export const mantakChiaContent = {
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
};

// ─────────────────────────────────────────────────────────────────────────────
// DIANA RICHARDSON  (slug: "diana-richardson")
// ─────────────────────────────────────────────────────────────────────────────
export const dianaRichardsonContent = {
  heroIntro: [
    "Diana Richardson spent three decades working with one counterintuitive discovery: slowing down is not settling for less. It is the only path to everything intimacy has been trying to offer.",
    "Her Slow Sex framework teaches couples that the body has its own erotic intelligence — one that is far more sophisticated than anything the mind can plan — and that this intelligence becomes available only in genuine stillness.",
  ],
  whoItsFor: [
    {
      title: "Couples who sense their intimate life has become routine",
      body: "When the same sequence produces diminishing returns, adding more technique only deepens the rut. Richardson's approach goes in the opposite direction — and finds what's been waiting there.",
    },
    {
      title: "Couples where one or both partners struggle to be fully present",
      body: "Performance anxiety, goal-orientation, and the habitual need to 'get somewhere' all live in the thinking mind. Slow Sex offers a specific exit from the mind's management of eros.",
    },
    {
      title: "Couples recovering intimacy after a difficult period",
      body: "After illness, grief, betrayal, or simply years of emotional distance, the slow approach rebuilds the body's trust before asking for its surrender.",
    },
    {
      title: "Couples who want depth more than frequency",
      body: "One genuinely present, unhurried encounter changes more than ten mechanical ones. Richardson's work is for couples who understand this and want practices to support it.",
    },
  ],
  practicePreview: {
    title: "The Arrival Practice",
    body: "Before any touch, both partners take ten minutes to arrive fully in their bodies and in the room. Most couples skip this entirely — and skip the depth that follows from it.",
    steps: [
      "Lie down separately, eyes closed, and spend three minutes simply feeling your body from the inside — weight, temperature, breath.",
      "Place both hands on your heart and take five slow breaths, releasing the day on each exhale.",
      "When you feel genuinely present — not performing presence, but actually here — turn to face your partner.",
      "Make eye contact for one minute without speaking. Let the seeing be complete.",
      "Only then, begin.",
    ],
  },
  beginnerTrack: {
    title: "Beginner Track: Learning Stillness",
    body: "The first challenge is tolerating stillness without immediately filling it. Most couples have never attempted this — and are surprised by what it reveals.",
    steps: [
      "Begin with non-sexual touch only: spend fifteen minutes simply resting hands on each other's bodies without any agenda.",
      "When the mind wants to direct — to move, to increase sensation, to progress somewhere — notice that impulse and consciously release it.",
      "Let any movement arise from genuine inner impulse, not from the idea of what should happen.",
      "Close each session by sharing one honest sentence about what you actually felt — not what you expected to feel.",
    ],
  },
  advancedTrack: {
    title: "Advanced Track: Inner Touch",
    body: "Inner touch — feeling sensation from the inside of the body rather than projecting attention onto the surface — transforms the entire quality of erotic contact.",
    steps: [
      "During intimacy, withdraw attention from the surface of the skin and direct it inward — to the warmth, the magnetic quality, the subtle movement of energy through the tissues.",
      "Practice staying with whatever sensation is actually present rather than seeking more intense sensation.",
      "When you notice goal-seeking arising, use the breath to return to inner awareness.",
      "Experiment with extended periods of complete physical stillness — bodies in contact, no movement, simply inhabiting the aliveness that is already there.",
    ],
  },
  quote: {
    text: "Sex is not something you do. It is something you allow. The body knows exactly what it wants when the mind finally gets out of the way.",
    source: "Diana Richardson, Slow Sex",
  },
  whyMatters: [
    "She is the only major teacher who makes the case for subtraction rather than addition — and has three decades of couples' testimony to support it.",
    "Her work addresses the core mechanism of routine intimacy: not boredom, but the absence of genuine presence, which no technique can substitute for.",
    "The inner touch practice she developed is technically simple and practically transformative — accessible to any couple regardless of experience.",
    "Her approach is uniquely sustainable: slow sex gets better with age and familiarity, not worse.",
  ],
  coreTeachings: [
    {
      title: "Sexual energy is intelligent",
      body: "When the conditions are right — relaxation, presence, absence of goal — the body's erotic intelligence moves exactly as it needs to. The partners' role is to create the conditions, not direct the energy.",
      beginnerReframe: "For one session, make a rule: no movement unless it arises from genuine inner impulse, not from the idea of what should happen next.",
      advancedReframe: "Track the quality of spontaneous movement that arises from inner impulse versus directed movement. Notice the energetic difference.",
    },
    {
      title: "Relaxation is the most erotic state available",
      body: "A deeply relaxed body is a maximally receptive body. Its capacity for sensation, energetic exchange, and genuine presence is orders of magnitude greater than a contracted, activated one.",
      beginnerReframe: "Before and during intimacy, consciously relax the jaw, the shoulders, the belly, the pelvic floor. Notice what changes.",
      advancedReframe: "Use deep relaxation as the entry point rather than arousal. Begin in stillness and let arousal arise naturally from presence.",
    },
    {
      title: "The closing matters as much as the beginning",
      body: "How a couple ends an intimate encounter determines how much of it they actually receive. Abrupt endings discharge what was built. Conscious closings allow it to settle as a resource.",
      beginnerReframe: "After intimacy, lie together in silence for at least ten minutes before speaking or separating. Let the experience complete itself.",
      advancedReframe: "Use a specific closing ritual: synchronized breath, hands on hearts, one whispered truth about what you experienced.",
    },
    {
      title: "Orgasm is optional; presence is not",
      body: "When orgasm is the goal, everything before it becomes instrumental — a means to an end rather than an experience in itself. Releasing orgasm as goal paradoxically makes the whole encounter more pleasurable.",
      beginnerReframe: "For one encounter, agree in advance that orgasm is not the goal. Notice how this single agreement changes the quality of everything that follows.",
      advancedReframe: "Explore the extended plateau state: sustained aliveness without the arc of tension-release. This is where the most profound erotic experiences live.",
    },
  ],
  modernUse: [
    {
      title: "When busy lives make intimacy feel like one more task",
      body: "The slow approach actually requires less energy than conventional sex — it restores rather than depletes. This makes it sustainable even in genuinely busy lives.",
    },
    {
      title: "When penetration feels disconnected from genuine intimacy",
      body: "Richardson's work on meditative intercourse — completely still, focused entirely on inner sensation — transforms the quality of physical union from mechanical to genuinely intimate.",
    },
    {
      title: "When one partner consistently disconnects or dissociates during sex",
      body: "The slow approach, with its emphasis on inner awareness rather than performance, gradually rebuilds the capacity for genuine presence for partners who have learned to leave during intimacy.",
    },
  ],
  shadowToAvoid: [
    {
      title: "Using slowness to avoid genuine contact",
      body: "Stillness can become another form of protection — a spiritual-looking way to stay safely within familiar territory. Genuine slow sex requires vulnerability, not just inactivity.",
      beginnerReframe: "Distinguish between stillness that feels alive and expanding versus stillness that feels flat and avoidant. Only the first is the practice.",
      advancedReframe: "If sessions consistently feel peaceful but emotionally empty, bring one honest disclosure before the next session begins.",
    },
    {
      title: "Performance of non-performance",
      body: "Trying to do Slow Sex correctly is still trying. The paradox resolves when 'doing it right' is released entirely.",
      beginnerReframe: "There is no correct slow sex. Any encounter in which both partners are genuinely present is successful.",
      advancedReframe: "Notice when you are monitoring your own performance of presence. That monitoring is the thing that needs to be released.",
    },
  ],
  exercises: [
    {
      title: "Sensate Focus Stillness (20 minutes)",
      setup: "No agenda beyond sensation itself. This is not foreplay.",
      steps: [
        "One partner lies still with eyes closed. The other explores their body slowly with hands only — no purpose beyond genuine curiosity.",
        "The giving partner moves at a pace that feels genuinely exploratory, not seductive.",
        "The receiving partner focuses entirely on inner sensation — feeling from the inside of the body.",
        "After ten minutes, switch.",
        "Close with five minutes lying side by side, not touching, integrating what arose.",
      ],
      integration: "Practice weekly for one month before layering any additional technique.",
      beginnerNote: "If the mind wanders to goals or performance, simply return attention to the physical sensation currently present.",
      advancedNote: "Experiment with complete stillness — no movement at all — and notice the aliveness that exists without action.",
    },
    {
      title: "Polar Rest (30 minutes)",
      setup: "Both partners lie together in a comfortable position of maximum physical contact.",
      steps: [
        "Close eyes and synchronize breathing for five minutes.",
        "Allow complete physical relaxation — release any held tension, any agenda.",
        "Remain in this position for twenty minutes without speaking, without deliberate movement.",
        "If energy moves — if one or both bodies want to adjust, touch differently, respond — allow it from inner impulse only.",
        "Close with eye contact and one shared breath.",
      ],
      integration: "This practice builds the container for all deeper Slow Sex work. Return to it whenever the practice feels effortful.",
      beginnerNote: "Boredom or restlessness in the first ten minutes is normal — it is the mind's protest before it settles.",
      advancedNote: "Extend to sixty minutes. The quality of what becomes available in the second half of a long polar rest is not available in any shorter practice.",
    },
  ],
  reflectionPrompts: [
    "When was the last time I was genuinely, completely present during intimacy — not thinking, not performing, not going somewhere?",
    "What am I afraid would happen if I stopped trying to make sex good and simply let it be whatever it is?",
    "What does my body actually want from intimacy, beneath what I think it should want?",
    "Where do I hold tension during sex that I rarely acknowledge? What is that tension protecting?",
    "What would our intimate life look like in ten years if we practiced genuine presence once a week?",
  ],
  relatedPaths: [
    { name: "Slow Love", note: "The wisdom path built entirely around Richardson's framework — stillness, inner touch, and the body's own erotic intelligence." },
    { name: "The Embodied Heart", note: "Boehm and Day's somatic approach shares Richardson's emphasis on the body's truth over the mind's management." },
    { name: "Tantric Wisdom", note: "The ancient tradition that Richardson draws from — particularly Osho's teaching that genuine presence is the only Tantra worth practicing." },
  ],
  premiumBanner: "Enter Diana Richardson's complete Slow Sex system: the inner touch practices, meditative intercourse techniques, the polar rest sequence, and the specific tools for dissolving performance anxiety and restoring the body's own erotic intelligence.",
};

// ─────────────────────────────────────────────────────────────────────────────
// MARGOT ANAND  (slug: "margot-anand")
// ─────────────────────────────────────────────────────────────────────────────
export const margotAnandContent = {
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
};

// ─────────────────────────────────────────────────────────────────────────────
// DANIEL ODIER  (slug: "daniel-odier")
// ─────────────────────────────────────────────────────────────────────────────
export const danielOdierContent = {
  heroIntro: [
    "Daniel Odier received direct initiation in Kashmir Shaivism — the most philosophically rigorous non-dual Tantric lineage — and has spent his career making its fierce, beautiful teaching accessible without diluting it.",
    "His central gift to couples: the practice of non-grasping reception — the capacity to receive the beloved's presence, beauty, and touch without immediately trying to hold it, increase it, or redirect it. In this non-grasping, something occurs that all ordinary desire is trying to reach.",
  ],
  whoItsFor: [
    {
      title: "Couples drawn to non-dual philosophy as lived practice",
      body: "Kashmir Shaivism is not a belief system but a perceptual training. Odier's practices make its central recognition — that everything is already the divine — directly felt rather than conceptually understood.",
    },
    {
      title: "Couples where intensity has stopped opening depth",
      body: "When more sensation, more technique, and more effort no longer deepen contact, the subtle approach becomes relevant. Odier's barely-perceptible touch practices reach dimensions that intensity cannot.",
    },
    {
      title: "Couples who want to experience the divine in each other",
      body: "Not as metaphor. Odier's recognition practices make this a direct somatic experience — the beloved perceived as a living expression of Śakti, felt in the body, available in any moment of genuine presence.",
    },
    {
      title: "Couples ready for a genuinely demanding practice",
      body: "Kashmir Shaivism does not offer comfort or gradual improvement. It offers immediate recognition — which requires the willingness to drop all spiritual and psychological protection simultaneously.",
    },
  ],
  practicePreview: {
    title: "Spanda Recognition",
    body: "Spanda — the divine pulse — is already moving between two bodies in any moment of genuine contact. This practice teaches couples to recognize and stay with it rather than immediately acting on it.",
    steps: [
      "Sit facing each other without touching. Close eyes and feel your own aliveness — the subtle vibration of being alive.",
      "Open eyes and feel the space between your bodies. Notice that this space is not empty — it has a quality, a charge.",
      "Without moving, let your awareness extend into that space. Feel the pulse of it.",
      "When the impulse to move or touch arises, wait. Stay with the impulse without acting on it for thirty seconds.",
      "Then move from genuine inner impulse — not from the idea of what should happen, but from what the body actually feels.",
    ],
  },
  beginnerTrack: {
    title: "Beginner Track: The Space Before Touch",
    body: "Learning to inhabit the space between bodies before contact is the foundation of Odier's approach. Most couples rush through this space; learning to live in it changes everything.",
    steps: [
      "Practice holding hands with complete awareness for five minutes — feeling every quality of the contact without trying to make it more.",
      "Before any touch, spend thirty seconds feeling the warmth and energy radiating from your partner's skin without contact.",
      "Practice receiving touch without reaching back — simply being the receptive presence for two minutes.",
      "Build tolerance for the state of open, unresolved aliveness that Odier calls 'non-grasping reception.'",
    ],
  },
  advancedTrack: {
    title: "Advanced Track: Tantric Recognition",
    body: "The advanced practice is the direct perception of the beloved as an expression of Śakti — not as a spiritual idea but as a lived somatic experience.",
    steps: [
      "In deep eye contact, practice looking through the surface of the beloved to the aliveness behind it.",
      "Use the breath to soften the observer — let the boundary between seer and seen become less fixed.",
      "When the recognition occurs — a moment of seeing the divine in the beloved's face — stay with it without immediately translating it into action.",
      "Let this recognition accumulate over multiple sessions into a genuine transformation of how you perceive each other.",
    ],
  },
  quote: {
    text: "Desire is not the enemy of spiritual life. It is the most direct path to it — if you can stay with desire without immediately trying to resolve it.",
    source: "Daniel Odier, Desire: The Tantric Path to Awakening",
  },
  whyMatters: [
    "He offers the only genuinely non-dual approach to couples practice — one that doesn't ask partners to become more spiritual but to recognize what is already sacred in this moment.",
    "His subtle touch practices reach depths that sensation-intensity cannot — they are among the most intimate practices available precisely because they require complete attention rather than physical effort.",
    "The Kashmir Shaivism framework gives couples a philosophical grounding for the transcendent experiences that can arise in deep intimacy — rather than leaving those experiences without context.",
    "His practice of non-grasping reception addresses the single most common obstacle to genuine erotic depth: the compulsive need to immediately act on, increase, or secure whatever feels good.",
  ],
  coreTeachings: [
    {
      title: "Desire is the doorway, not the obstacle",
      body: "In Kashmir Shaivism, desire is not something to transcend or manage. It is the divine energy of Śakti in its most concentrated, accessible form. The practice is to stay with desire rather than immediately resolving it.",
      beginnerReframe: "When desire arises, pause for thirty seconds before acting. Simply feel the quality of desire itself — its temperature, its texture, its aliveness. Then act.",
      advancedReframe: "Sustain desire without resolution for extended periods. Notice that what lives in this sustained state is not frustration but a quality of alive, open presence.",
    },
    {
      title: "Everything is already Spanda",
      body: "The divine pulse — Spanda — is not somewhere else. It is the aliveness of this moment. The sound of breath. The warmth of skin. The quality of attention between two genuinely present people.",
      beginnerReframe: "In the next intimate encounter, find one moment of Spanda — one instant when the aliveness of the experience is undeniable. Rest there.",
      advancedReframe: "Expand the recognition of Spanda from moments during intimacy to ordinary moments: the morning light, a cup of tea, the quality of air on skin.",
    },
    {
      title: "Non-grasping is not withholding",
      body: "The practice of receiving without grasping is not emotional distance or spiritual aloofness. It is the fullest possible reception — open, unhurried, allowing the beloved's presence to arrive completely.",
      beginnerReframe: "Practice receiving a compliment, a touch, or a gesture from your partner without immediately giving something back. Simply let it land.",
      advancedReframe: "During intimacy, practice being the pure receiver for ten minutes — not withholding response, but allowing each sensation to arrive completely before any response arises.",
    },
    {
      title: "The beloved is Śakti",
      body: "This is not a romantic metaphor. It is the central Tantric recognition: the aliveness, beauty, and presence of the beloved is the divine creative energy of the universe expressing itself through a temporary human form.",
      beginnerReframe: "For one minute in your partner's presence, look at them as if you have never seen them before. Who is actually there?",
      advancedReframe: "Use eye contact to practice the direct recognition: look through the surface of the beloved to the Śakti moving behind the eyes. Let this recognition change how you touch them.",
    },
  ],
  modernUse: [
    {
      title: "When couples have tried many approaches and still feel something is missing",
      body: "Odier's work addresses the deepest layer — the quality of consciousness brought to intimacy, not the content of it. This is often the missing dimension after every technique has been tried.",
    },
    {
      title: "When spiritual depth and erotic aliveness feel incompatible",
      body: "Kashmir Shaivism dissolves this false dichotomy more completely than any other tradition — eros is not the enemy of awakening but one of its most direct expressions.",
    },
    {
      title: "When the ordinary has lost its charge",
      body: "Spanda recognition practice re-enchants the ordinary: the quality of light in a room, the texture of skin, the pause between two people looking at each other — all of it becomes charged with the same aliveness.",
    },
  ],
  shadowToAvoid: [
    {
      title: "Using non-dual philosophy to avoid emotional accountability",
      body: "'Everything is Śakti' can become a spiritual bypass for not taking responsibility for actual behavior in a relationship. The recognition of the divine in the beloved does not eliminate the need for ordinary relational honesty.",
      beginnerReframe: "Practice Spanda recognition and honest emotional check-ins on the same day. They are not in conflict.",
      advancedReframe: "Let the recognition of the beloved as sacred increase rather than decrease accountability — if she is Śakti, she deserves complete truth.",
    },
    {
      title: "Subtle practices as avoidance of full embodiment",
      body: "Extreme subtlety can become a form of disembodiment — a spiritual-looking way to stay safely in the head. Genuine non-dual practice includes full, grounded physical presence.",
      beginnerReframe: "If sessions feel ethereal but physically disconnected, spend five minutes of pure physical grounding before any subtle practice.",
      advancedReframe: "The subtlest practices should increase somatic aliveness, not reduce it. If the body feels less present, the practice is incomplete.",
    },
  ],
  exercises: [
    {
      title: "The Feather Touch (15 minutes)",
      setup: "One partner lies still. The other makes contact so light it is at the threshold of perception.",
      steps: [
        "Touch begins at the edge of perceptibility — fingertips barely grazing skin.",
        "Move at the pace of extreme slowness — three minutes to travel the length of an arm.",
        "The giver maintains complete attention: not performing gentleness but genuinely feeling the quality of contact at every point.",
        "The receiver maintains inner awareness: feeling from the inside of the body where touch is landing.",
        "After ten minutes, rest both hands on the receiver for two minutes of complete stillness.",
        "Switch.",
      ],
      integration: "Practice weekly. The subtlety of the touch gradually calibrates both partners' sensitivity to each other.",
      beginnerNote: "The threshold of perception is the point — if touch is clearly felt, it is probably too much pressure.",
      advancedNote: "Experiment with touch that stops just before contact — hovering one millimeter above the skin. Notice what is felt.",
    },
    {
      title: "The Space Between (10 minutes)",
      setup: "Both partners sit facing each other, two feet apart, not touching.",
      steps: [
        "Close eyes and feel your individual aliveness for two minutes.",
        "Open eyes and direct awareness into the space between your bodies.",
        "Without speaking, extend your right hand toward your partner until your palms are three inches apart.",
        "Hold this position for five minutes. Feel the quality of the space between your palms.",
        "Let the awareness of Spanda — the living pulse of that space — become clear.",
        "Slowly bring palms together and hold for one minute.",
      ],
      integration: "Use before lovemaking to pre-activate the energetic connection. The quality of subsequent physical contact transforms.",
      beginnerNote: "If you feel nothing in the space initially, simply feel the warmth radiating from your partner's palm. That warmth is a form of Spanda.",
      advancedNote: "Practice without the hand extension — simply feeling the Spanda between two seated bodies across the room.",
    },
  ],
  reflectionPrompts: [
    "When have I experienced a moment of genuine recognition — seeing through the ordinary surface of something to its actual aliveness? What were the conditions?",
    "What would it feel like to hold desire without immediately trying to resolve it? Where does that discomfort live in the body?",
    "Have I ever experienced the beloved as genuinely sacred — not as a romantic idea but as a direct perception? What opened that?",
    "Where in my intimate life do I grasp — try to hold, increase, or secure what feels good rather than simply receiving it?",
    "What would change in our relationship if I consistently practiced seeing my partner as a living expression of the divine?",
  ],
  relatedPaths: [
    { name: "Tantric Wisdom", note: "The broader Tantric framework within which Odier's Kashmir Shaivism teaching sits — particularly the Spanda and Śiva/Śakti pillars." },
    { name: "Conscious Union", note: "The recognition practices of conscious union share Odier's emphasis on seeing the beloved truly, beyond image and expectation." },
    { name: "Sacred Polarity", note: "The Śiva/Śakti polarity at the heart of Kashmir Shaivism maps directly onto Deida's masculine/feminine framework." },
  ],
  premiumBanner: "Access Odier's complete Kashmir Shaivism couples practices: the full Spanda recognition sequence, advanced non-grasping reception techniques, the Tantric touch practices from his lineage, and the philosophical framework that makes the sacred genuinely felt rather than conceptually understood.",
};

// ─────────────────────────────────────────────────────────────────────────────
// MICHAELA BOEHM  (slug: "michaela-boehm")
// ─────────────────────────────────────────────────────────────────────────────
export const michaelaBoehmContent = {
  heroIntro: [
    "Michaela Boehm has spent three decades at the intersection of Tantric tradition and somatic science, working with thousands of couples internationally with one foundational discovery: most intimacy problems are nervous system problems before they are relationship problems.",
    "Her Non-Linear Movement Method and relational somatic work give couples concrete tools for creating the specific physiological conditions in which genuine eros can emerge — not manufactured, not performed, but actually present.",
  ],
  whoItsFor: [
    {
      title: "Couples where desire has quietly decreased over time",
      body: "When desire diminishes in a loving relationship, the usual diagnosis is wrong. Boehm's work shows that the missing ingredient is almost always genuine somatic safety — a specific physiological state that makes authentic eros structurally available.",
    },
    {
      title: "Couples where one partner frequently disconnects during intimacy",
      body: "Dissociation during sex is a nervous system response, not a character flaw or lack of love. NLMM and somatic practices gradually restore the body's capacity to be genuinely present.",
    },
    {
      title: "Couples carrying unprocessed stress or emotional tension",
      body: "The body stores what the mind hasn't processed. Boehm's movement practices provide a direct, non-verbal route to discharging accumulated tension — restoring the aliveness that chronic activation suppresses.",
    },
    {
      title: "Couples where analytical intelligence gets in the way of erotic presence",
      body: "The thinking mind that is an asset in every other area of life becomes a liability in intimate contact. Boehm's somatic approach bypasses the analytical mind entirely, working directly with the body's own intelligence.",
    },
  ],
  practicePreview: {
    title: "Somatic Arrival",
    body: "Before any intimate contact, both partners spend eight minutes arriving fully in their bodies. This is not a technique — it is the prerequisite for everything that follows.",
    steps: [
      "Stand separately. Close eyes and feel your feet on the floor — the actual physical sensation of ground beneath you.",
      "Breathe slowly and feel the weight of your body: the heaviness of your limbs, the solidity of your torso.",
      "Scan for any area of holding or tension. Don't try to change it — simply feel it completely.",
      "Begin slow, non-directed movement. Let the body move as it wants to, not as you direct it.",
      "After five minutes, open eyes and find your partner. Make eye contact before any touch.",
    ],
  },
  beginnerTrack: {
    title: "Beginner Track: Building Somatic Safety",
    body: "The first months of practice are about creating the physiological conditions for genuine erotic presence. This is infrastructure work — invisible but foundational.",
    steps: [
      "Practice individual NLMM for ten minutes before shared intimate time — discharge accumulated activation before bringing it into contact.",
      "Establish a clear signal for 'I need to pause' that both partners can use without shame or explanation during intimacy.",
      "Practice checking in somatically before sex: 'What does my body actually feel right now?' Share the answer honestly.",
      "Build a genuine understanding of your own nervous system patterns — what activates you, what regulates you, what specific conditions your body needs to feel genuinely safe.",
    ],
  },
  advancedTrack: {
    title: "Advanced Track: Erotic Attunement",
    body: "Once both partners have developed somatic literacy in themselves, genuine attunement — feeling and responding to a partner's actual living energetic state — becomes available.",
    steps: [
      "Practice reading your partner's somatic state through physical contact alone — before any verbal communication.",
      "Develop the capacity to feel the difference between your partner's genuine arousal and their conditioned willingness.",
      "Learn to track energetic contraction and expansion in real time — adjusting presence and touch accordingly without verbal negotiation.",
      "Practice following the body's genuine signal through unexpected directions — including non-sexual contact, stillness, or complete withdrawal of touch.",
    ],
  },
  quote: {
    text: "The body never lies. When you learn to feel what is actually happening in your own tissues and in your partner's, you never have to guess about what intimacy needs — it tells you directly.",
    source: "Michaela Boehm, The Wild Woman Book",
  },
  whyMatters: [
    "She offers the most clinically precise framework for understanding why eros disappears in loving relationships — and it's physiological, not psychological, which makes it actionable.",
    "Her NLMM practice is unique: it restores authentic expression by removing the mind's direction entirely, allowing the body's own intelligence to resurface.",
    "Her collaboration with Deida gives her work unusual breadth — she understands both the polarity dimension and the somatic safety dimension, and knows how they interact.",
    "She addresses the specific challenge of high-achieving, analytical couples — people whose intellectual strengths become obstacles to genuine presence.",
  ],
  coreTeachings: [
    {
      title: "Safety is the prerequisite for eros",
      body: "The parasympathetic nervous system — the physiological state of genuine rest and openness — is required for authentic eros. When the sympathetic system is running at any level, eros is structurally offline regardless of desire, love, or intention.",
      beginnerReframe: "Before intimacy, ask honestly: does my body feel genuinely safe right now? Not conceptually safe — somatically safe. If not, address that first.",
      advancedReframe: "Learn to create parasympathetic activation in your partner through specific qualities of presence, touch, and unhurried attention — this is one of the most intimate skills available.",
    },
    {
      title: "Authentic yes versus habituated yes",
      body: "Most people in relationships have learned to say yes from habit, politeness, or relationship maintenance rather than from genuine somatic readiness. Learning to distinguish these is the foundation of genuine erotic honesty.",
      beginnerReframe: "Before any intimate encounter, check in honestly with your body: is this a genuine yes or a habituated yes? Share what you find.",
      advancedReframe: "Build a relationship culture where 'not yet' or 'not tonight' is received without injury — this is what makes genuine yes possible.",
    },
    {
      title: "The body stores what the mind avoids",
      body: "Unprocessed emotion, unacknowledged tension, and unexpressed truth accumulate in the body's tissues. This accumulation is the primary cause of sexual flatness in long-term relationships — not lack of love.",
      beginnerReframe: "After any significant emotional event, use movement or breath before attempting intimacy. Let the body process what the mind has been holding.",
      advancedReframe: "Develop a regular practice of somatic discharge — NLMM, shaking, expressive movement — as maintenance for the intimate relationship.",
    },
    {
      title: "Erotic attunement is a learnable skill",
      body: "The capacity to feel and respond to a partner's actual living energetic state — rather than projecting desire onto them — is not a gift or chemistry. It is a skill developed through practice, honesty, and genuine willingness to be surprised.",
      beginnerReframe: "For one session, focus entirely on what you feel in your partner's body rather than what you want from it. Let your touch be responsive rather than directive.",
      advancedReframe: "Practice tracking somatic signal in real time: contraction, expansion, genuine arousal, withdrawal. Respond to what you feel, not to what you want to feel.",
    },
  ],
  modernUse: [
    {
      title: "When high-stress lives consistently interfere with intimate connection",
      body: "Boehm's pre-intimacy somatic practices create a genuine physiological transition from work-mode to intimate presence — something that intention alone cannot accomplish.",
    },
    {
      title: "When a partner's past trauma affects present intimacy",
      body: "The somatic approach works with the nervous system directly — bypassing the narrative of trauma and addressing the physiological patterns it has created in the body.",
    },
    {
      title: "When couples have good communication but poor erotic aliveness",
      body: "Talking about intimacy and inhabiting it are different skills. Boehm's work addresses the embodiment gap — the space between understanding what's needed and actually feeling it.",
    },
  ],
  shadowToAvoid: [
    {
      title: "Using somatic language to avoid erotic commitment",
      body: "'My nervous system isn't ready' can become a perpetual deferral of genuine intimacy. Somatic awareness is meant to enable genuine presence, not provide infinite postponement.",
      beginnerReframe: "Distinguish between genuine somatic unreadiness that deserves respect and habitual avoidance that deserves gentle challenge.",
      advancedReframe: "Practice leaning gently toward intimacy even when the nervous system is slightly activated — building the capacity to be present with mild activation.",
    },
    {
      title: "Analysis replacing embodiment",
      body: "Talking about somatic experience is not the same as having it. The work is in the body, not in discussing the body's patterns.",
      beginnerReframe: "After any somatic practice, sit in silence for two minutes before talking about it. Let the experience settle before analysis begins.",
      advancedReframe: "Periodically have sessions where no verbal processing occurs — before, during, or after. Let the body's experience be complete in itself.",
    },
  ],
  exercises: [
    {
      title: "Non-Linear Movement Method — Couples Version (15 minutes)",
      setup: "Both partners in the same space, not touching, eyes open or closed.",
      steps: [
        "Begin moving individually — no style, no direction, no goal. Follow whatever impulse arises in the body.",
        "Allow any quality of movement: slow and subtle to large and expressive. The only rule is non-direction — don't plan the next movement.",
        "After five minutes, allow awareness of your partner's movement without adjusting your own.",
        "After ten minutes, let the movements begin to respond to each other organically — not choreographed, but genuinely responsive.",
        "End by coming to stillness together and making eye contact.",
      ],
      integration: "Use before intimacy to discharge accumulated activation and restore authentic aliveness.",
      beginnerNote: "There is no correct way to move. Self-consciousness is the only obstacle — and moving through it is part of the practice.",
      advancedNote: "Allow the movement to express emotional content that hasn't been verbalized. Let the body say what the mind has been holding.",
    },
    {
      title: "Somatic Check-In (10 minutes)",
      setup: "Before any intimate encounter. Seated facing each other.",
      steps: [
        "Each partner takes three minutes alone to honestly scan their body: what is actually present right now? Tension, tiredness, aliveness, contraction, openness?",
        "Share the scan honestly — not the narrative around it, just the actual somatic truth: 'My chest feels tight. My belly is relaxed. I feel a kind of low-grade activation that I can't locate.'",
        "Listen to your partner's scan without trying to fix or respond to it. Simply receive the information.",
        "Together, decide honestly: what kind of contact does the truth of right now actually call for?",
      ],
      integration: "Makes every subsequent intimate encounter more honest and more genuinely satisfying.",
      beginnerNote: "The check-in is not about getting permission — it is about genuine information that makes real intimacy possible.",
      advancedNote: "Over time, the check-in develops into a continuous real-time tracking of somatic state during intimacy itself.",
    },
  ],
  reflectionPrompts: [
    "When do I notice my body genuinely relaxing into a yes versus going along with what I think should happen?",
    "What specific conditions — environmental, relational, physiological — consistently make genuine erotic presence available for me?",
    "Where do I carry the most tension in my body? How does that tension affect my capacity for genuine intimacy?",
    "When have I felt genuinely attuned to my partner — feeling what was actually happening in them rather than projecting what I wanted to happen?",
    "What would our intimate life be if both of us consistently brought our genuine somatic truth to it rather than our idea of what should be happening?",
  ],
  relatedPaths: [
    { name: "The Embodied Heart", note: "The path built around Boehm and Jan Day's work — nervous system safety, somatic disclosure, and body-led love." },
    { name: "Slow Love", note: "Richardson's approach shares Boehm's emphasis on the body's own intelligence over the mind's direction." },
    { name: "Sacred Polarity", note: "Boehm's somatic safety work creates the physiological foundation that makes Deida's polarity practices genuinely safe and effective." },
  ],
  premiumBanner: "Access Boehm's complete somatic couples system: the full Non-Linear Movement Method as a couples practice, the erotic attunement sequence, somatic safety-building tools, and the specific practices for restoring authentic desire after it has been flattened by accumulated stress or emotional protection.",
};

// ─────────────────────────────────────────────────────────────────────────────
// BARRY LONG  (slug: "barry-long")
// ─────────────────────────────────────────────────────────────────────────────
export const barryLongContent = {
  heroIntro: [
    "Barry Long is the most uncompromising voice in sacred sexuality — and the most tender. His single conviction, held for four decades without deviation: lovemaking, made with total inner stillness and genuine presence, is among the most direct spiritual experiences available to a human being.",
    "He did not offer techniques. He offered the radical possibility that what most couples call sex has nothing to do with what he called making love — and that the difference is not effort or skill but quality of inner stillness.",
  ],
  whoItsFor: [
    {
      title: "Couples exhausted by technique-based approaches",
      body: "When adding more — more skills, more variety, more effort — has produced diminishing returns, Long's ruthlessly simple approach offers genuine relief: the invitation to stop trying and start being.",
    },
    {
      title: "Partners who sense that ordinary sex is not what they actually want",
      body: "Long spoke directly to couples who knew, without being able to articulate it, that something genuinely sacred was possible between them — and who kept finding ordinary sexuality in its place.",
    },
    {
      title: "Couples ready for the discipline of inner stillness",
      body: "Long's path requires something more demanding than any technique: the genuine quieting of the wanting, comparing, performing mind during lovemaking. This is real practice.",
    },
    {
      title: "Partners where the man wants to understand his deeper role",
      body: "Long's teaching on the man as the bearer of stillness and loving space — not performance or skill — is one of the most precise and practically useful frameworks for masculine presence in intimate life.",
    },
  ],
  practicePreview: {
    title: "The Stillness Practice",
    body: "Long's foundational practice has no steps and no technique. It is simply the practice of becoming genuinely still before and during lovemaking.",
    steps: [
      "Before touching, sit quietly alone for three minutes. Let the thinking mind come to rest — not forced, but gently released.",
      "Ask internally: am I here? Not performing, not wanting, not managing — just here?",
      "Come together without agenda. Let the contact be what it is without directing it toward any destination.",
      "When the mind begins to compare, evaluate, or perform — notice this, and return to stillness.",
      "Let lovemaking end when the body genuinely wants to rest, not when a goal has been achieved.",
    ],
  },
  beginnerTrack: {
    title: "Beginner Track: Meeting in Stillness",
    body: "The entry point is simply learning what genuine inner stillness feels like — and discovering how rarely it is actually present during sex.",
    steps: [
      "For one intimate encounter, commit to noticing every moment when the thinking mind is active — comparing, performing, wanting, evaluating.",
      "Each time you notice the mind's activity, simply return to the physical sensation of the present moment.",
      "Do not try to achieve anything. Let this encounter be whatever it genuinely is.",
      "Afterward, share honestly: how much of that encounter were you actually present for?",
    ],
  },
  advancedTrack: {
    title: "Advanced Track: Meditative Lovemaking",
    body: "When genuine stillness becomes available, lovemaking transforms from a peak experience into a meditative state — one that Long describes as a form of prayer.",
    steps: [
      "Both partners establish genuine inner stillness before physical contact — not as preparation but as the substance of the encounter.",
      "Allow lovemaking to unfold without direction — the body moves from genuine impulse, not from any idea of what should happen.",
      "When transcendent states arise — dissolution of the boundary between self and other, the experience of consciousness itself — remain still within them rather than grasping.",
      "Close with extended physical stillness and silence. Let the experience complete itself.",
    ],
  },
  quote: {
    text: "Most people have never made love. They have had sex — which is something else entirely. Making love requires you to be actually, completely, undefendedly here.",
    source: "Barry Long, Making Love",
  },
  whyMatters: [
    "He is the only teacher who refuses to compromise: he will not accept ordinary sexuality as close enough to what is possible. This uncompromising quality is exactly what some couples need to hear.",
    "His teaching on masculine inner stillness is the most precise and practically useful framework available for what it actually means to be a present partner during lovemaking.",
    "His work requires no technique, no ritual, no special knowledge — only genuine presence, which is simultaneously the simplest and the most demanding requirement.",
    "His directness bypasses the elaborate frameworks of other teachers and goes straight to the single thing that either is or isn't present: genuine consciousness in contact.",
  ],
  coreTeachings: [
    {
      title: "Sex and making love are not the same thing",
      body: "Sex is the release of unconscious tension in the temporary company of another person. Making love is consciousness meeting consciousness through the medium of the body. Most couples have the first; very few have sustained access to the second.",
      beginnerReframe: "In the next encounter, notice the quality of consciousness present: is this tension-release or genuine meeting? No judgment — just honest observation.",
      advancedReframe: "Commit to making love rather than having sex as a genuine practice intention. Notice what this requires and what it changes.",
    },
    {
      title: "The man's stillness creates the space for the woman's opening",
      body: "Long's teaching on gender is precise and non-negotiable: the man's role is to bring genuine inner stillness — not as technique but as the actual quality of his consciousness. Without this, the woman cannot fully open, regardless of her willingness.",
      beginnerReframe: "Man: before touching, ask honestly — am I actually still inside right now, or am I performing stillness while wanting something?",
      advancedReframe: "Develop genuine inner stillness as a daily practice, not only in intimate contexts. The quality of stillness available during lovemaking is the quality you have cultivated all day.",
    },
    {
      title: "Woman's love is the substance of the encounter",
      body: "In Long's framework, the woman's genuine feeling — not performed emotion, not managed love, but actual, unguarded, honest feeling — is what makes lovemaking sacred rather than mechanical.",
      beginnerReframe: "Woman: notice where you manage or moderate your emotional expression during lovemaking. What would full, unguarded feeling look like?",
      advancedReframe: "Practice offering genuine feeling without condition — not dependent on the man's performance but arising from your own love regardless.",
    },
    {
      title: "Wanting kills what it wants",
      body: "The specific quality of wanting — grasping, needing, pursuing — is the single thing that most reliably prevents genuine lovemaking from occurring. It cannot be suppressed. It can be seen through.",
      beginnerReframe: "When wanting arises during intimacy, name it internally: 'wanting is here.' This honest acknowledgment creates a small but real separation between the wanting and the observer of the wanting.",
      advancedReframe: "Practice resting in the quality of love — genuine care and presence for the beloved — as the foundation from which all impulse arises. Desire that arises from love is different in quality from desire that arises from wanting.",
    },
  ],
  modernUse: [
    {
      title: "When couples sense the sacred dimension of their intimacy but don't know how to access it",
      body: "Long names this dimension directly and precisely — and offers the single practical requirement for entering it. No ceremony or framework required.",
    },
    {
      title: "When a partner's performance anxiety prevents genuine presence",
      body: "Long's approach dissolves performance anxiety by removing performance as a relevant category entirely. There is nothing to perform — only to be present.",
    },
    {
      title: "When a couple's spiritual practice feels disconnected from their intimate life",
      body: "Long insists on their identity: lovemaking, practiced correctly, is spiritual practice. This integration is particularly valuable for couples with active meditation or contemplative lives.",
    },
  ],
  shadowToAvoid: [
    {
      title: "Using stillness as emotional unavailability",
      body: "Inner stillness in Long's sense is not emotional distance or withholding. It is the still ground from which full presence, genuine feeling, and complete engagement become available.",
      beginnerReframe: "If stillness feels like distance or disconnection, it is not Long's stillness. Genuine inner stillness is warm, present, and fully available.",
      advancedReframe: "Develop the capacity for stillness that is simultaneously fully alive — the Buddhist quality of equanimity within full engagement.",
    },
    {
      title: "Spiritual hierarchy in the bedroom",
      body: "Long's framework can be misused to establish a spiritual hierarchy — the 'more conscious' partner judging the other's lack of presence. This is precisely contrary to his teaching.",
      beginnerReframe: "Long's work is a mirror for your own consciousness, not a measuring stick for your partner's.",
      advancedReframe: "If you find yourself evaluating your partner's stillness, that evaluation is evidence of your own lack of it.",
    },
  ],
  exercises: [
    {
      title: "Pre-Contact Stillness (5 minutes)",
      setup: "Before any intimate encounter. Each partner alone.",
      steps: [
        "Sit quietly and let the mind come to rest. Not forced — simply noticed and gently released.",
        "Feel the quality of your consciousness right now: is it restless, wanting, performing, or genuinely still?",
        "When genuine stillness is present — even briefly — notice its quality. This is what you are bringing to your partner.",
        "Come together only when you feel actually, genuinely present.",
      ],
      integration: "The five minutes of pre-contact stillness changes more about the quality of lovemaking than any technique practiced during it.",
      beginnerNote: "Genuine stillness may last only ten seconds at first. Ten seconds of real stillness is worth more than ten minutes of performed stillness.",
      advancedNote: "Extend the stillness practice to include the entire day preceding a dedicated intimate evening. The quality of consciousness cultivated all day is the quality available at night.",
    },
    {
      title: "The Conscious Ending (10 minutes)",
      setup: "At the close of any intimate encounter.",
      steps: [
        "When lovemaking comes to its natural end, do not immediately separate or speak.",
        "Lie together in complete stillness for at least five minutes.",
        "If words arise, let them be true: not performance, not evaluation, not narrating the experience — only what is genuinely present.",
        "Before separating, acknowledge the encounter with gratitude — internally or together.",
      ],
      integration: "The conscious ending determines how much of the encounter is actually received and integrated. Abrupt endings waste what was built.",
      beginnerNote: "Resist the impulse to speak immediately. The silence after genuine lovemaking has its own intelligence.",
      advancedNote: "Extend the ending stillness to twenty minutes. Notice what arises in the second ten minutes that wasn't available in the first.",
    },
  ],
  reflectionPrompts: [
    "Have I ever made love in Long's sense — genuinely present, genuinely still, genuinely here? What were the conditions?",
    "What is the quality of my consciousness during lovemaking — where does my mind go, what does it want, what does it perform?",
    "What would it mean to bring genuine inner stillness to intimacy rather than technique, effort, or the desire to please?",
    "Where in our intimate life am I having sex rather than making love? What is the honest difference between them?",
    "What would I need to release — what wanting, what performing, what managing — for genuine lovemaking to become possible?",
  ],
  relatedPaths: [
    { name: "Sacred Polarity", note: "Long's teaching on masculine stillness and feminine love is the most precise expression of the polarity principle in any tradition." },
    { name: "Conscious Union", note: "The synthesis path that draws directly on Long's work — full presence, honest love, and the daily practice of genuine meeting." },
    { name: "Slow Love", note: "Richardson's approach to stillness in lovemaking shares Long's emphasis on presence over technique and inner awareness over outer direction." },
  ],
  premiumBanner: "Access Barry Long's complete teaching on conscious lovemaking: the full stillness practice, the masculine and feminine paths as he described them, his teaching on love as the ground of genuine sexuality, and the specific practices that make meditative lovemaking available in ordinary life.",
};

// ─────────────────────────────────────────────────────────────────────────────
// JAN DAY  (slug: "jan-day")
// ─────────────────────────────────────────────────────────────────────────────
export const janDayContent = {
  heroIntro: [
    "Jan Day has spent thirty years at the specific intersection that most intimacy teaching avoids: the point where emotional honesty and erotic aliveness meet. Her discovery is simple and uncomfortable — they are the same dimension of a person's life, not two separate ones.",
    "Her body-led disclosure practices give couples the specific tools to share emotional truth from the body rather than from the narrative mind — and the experience of doing so changes the erotic charge between partners more reliably than any other single approach.",
  ],
  whoItsFor: [
    {
      title: "Couples with good communication but low erotic aliveness",
      body: "When couples can discuss everything clearly but feel erotically flat, the missing dimension is almost always somatic honesty — the kind that lives in the body rather than the mind.",
    },
    {
      title: "Couples where unspoken resentment or distance has accumulated",
      body: "Emotional accumulation is stored in the body and affects erotic availability directly. Day's practices address the body-stored truth that conversation alone cannot reach.",
    },
    {
      title: "Partners who carry shame around their erotic nature",
      body: "Shame lives in the body before it lives in the mind — as holding, contraction, and withdrawal. Day's somatic approach works with shame at the level where it actually lives.",
    },
    {
      title: "Couples ready for the courage of genuine visibility",
      body: "The desire that comes from being fully known — not just loved but genuinely seen — is available only through the specific vulnerability of somatic honesty. Day's work leads there.",
    },
  ],
  practicePreview: {
    title: "The Body-Led Check-In",
    body: "Before any intimate encounter, both partners share not what they think or feel about the relationship but what is actually physically present in their bodies right now.",
    steps: [
      "Sit facing each other. Each takes two minutes in silence to scan the body honestly — not to explain or narrate, just to feel.",
      "Partner A shares their somatic truth: 'My throat is tight. My belly is soft. There's a warmth in my chest and something cool in my pelvis.'",
      "Partner B listens without responding — simply receiving the information.",
      "Partner B shares their somatic truth in the same way.",
      "Together, decide what kind of contact the truth of right now actually calls for.",
    ],
  },
  beginnerTrack: {
    title: "Beginner Track: Learning Somatic Honesty",
    body: "The first practice is simply learning to feel and name body-truth rather than mind-truth — to distinguish between what the body actually holds and what the mind narrates about it.",
    steps: [
      "Practice the body-led check-in before each intimate encounter for one month.",
      "When emotional content arises during intimacy, practice naming the body experience rather than the story: 'I feel a contraction in my chest' rather than 'I feel hurt because...'",
      "Build tolerance for sharing somatic truth that doesn't have a clear narrative explanation.",
      "Practice receiving a partner's somatic truth without immediately trying to fix or respond to it.",
    ],
  },
  advancedTrack: {
    title: "Advanced Track: Real-Time Somatic Disclosure",
    body: "The advanced practice is continuous real-time disclosure of somatic truth during intimacy — creating a living, honest energetic field between two fully visible partners.",
    steps: [
      "During intimacy, begin naming somatic experience in real time: 'There's heat here. I feel an opening. Something just contracted.'",
      "Develop the capacity to share somatic truth that moves counter to the expected narrative — 'There's a sadness arising' during pleasure, 'I feel joy' during difficulty.",
      "Let the somatic disclosures guide the direction of the encounter rather than a predetermined script.",
      "Notice how the quality of erotic charge changes when both partners are genuinely present to each other's actual somatic truth.",
    ],
  },
  quote: {
    text: "The walls you've built to protect yourself from hurt are the same walls that keep ecstasy out. Protection and surrender use the same gates.",
    source: "Jan Day, Embodied Relating",
  },
  whyMatters: [
    "She addresses the core mechanism of long-term erotic flatness that other teachers ignore: the accumulation of unspoken emotional truth in the body directly suppresses erotic availability.",
    "Her body-led disclosure approach bypasses the narrative mind's defenses and works directly with the somatic truth — which is the level at which genuine erotic charge is either present or absent.",
    "She works at the specific intersection of shame and eros — understanding that shame, stored in the body, is the primary suppressor of genuine erotic self-expression in most people.",
    "Her clinical training gives her work unusual practical precision — she offers not just philosophy but specific, learnable practices.",
  ],
  coreTeachings: [
    {
      title: "The body stores what the mind avoids",
      body: "Unspoken truth, unexpressed emotion, and accumulated resentment are not abstract psychological phenomena. They are stored in the body's tissues as tension, holding, and contraction — and they directly suppress erotic availability.",
      beginnerReframe: "After any period of emotional distance or unspoken tension, use the body-led check-in before attempting intimacy. Address what the body holds before asking the body to open.",
      advancedReframe: "Develop a regular practice of somatic disclosure — not only before intimacy but as ongoing relational hygiene. Preventing accumulation is easier than addressing it.",
    },
    {
      title: "Shame is body-stored, not mind-stored",
      body: "Erotic shame — the contraction that says 'this part of me cannot be seen' — lives in the body as holding before it lives in the mind as belief. Intellectual understanding of shame's origins does not dissolve the somatic holding.",
      beginnerReframe: "Notice where in your body shame lives during intimate moments. Just feeling it — without explanation or analysis — begins the process of dissolution.",
      advancedReframe: "Practice offering the held, shameful parts of your erotic nature to your partner's genuine acceptance — not all at once, but gradually, with awareness of what you're offering.",
    },
    {
      title: "Emotional honesty is an erotic act",
      body: "The desire that arises from being fully known — from complete visibility rather than selective presentation — has a quality and intensity that conventionally generated desire cannot match. This is the erotic logic of honesty.",
      beginnerReframe: "Share one true thing about your actual erotic experience with your partner this week — not what you think they want to hear, but what is actually true.",
      advancedReframe: "Build a relationship culture where genuine erotic truth is consistently welcome — where the honest naming of desire, discomfort, or complexity is received with curiosity rather than anxiety.",
    },
    {
      title: "Contact requires genuine visibility",
      body: "Genuine erotic contact — two people actually meeting — is only possible when both partners are genuinely visible rather than strategically presenting the acceptable version of themselves.",
      beginnerReframe: "In the next intimate encounter, notice one moment when you edit or manage your self-presentation. What would it feel like to offer the unedited version?",
      advancedReframe: "Work gradually toward complete erotic visibility — offering all dimensions of your genuine erotic experience, including the ones that feel risky or unseemly.",
    },
  ],
  modernUse: [
    {
      title: "When couples have processed conflict intellectually but still feel distant",
      body: "Intellectual resolution of conflict doesn't always dissolve body-stored tension. Day's somatic practices address the residue that conversation leaves behind.",
    },
    {
      title: "When one partner feels chronically unseen or unknown erotically",
      body: "This feeling almost always reflects genuine invisibility — the partner's authentic erotic nature being managed or hidden rather than offered. Day's practices create the specific safety in which genuine erotic self-disclosure becomes possible.",
    },
    {
      title: "When couples want to rebuild erotic trust after a rupture",
      body: "Day's body-led repair practices address trust at the somatic level — rebuilding the actual felt sense of safety in the other's presence that abstract reassurance cannot restore.",
    },
  ],
  shadowToAvoid: [
    {
      title: "Using somatic language to weaponize vulnerability",
      body: "Somatic disclosure can be used manipulatively — strategically deploying emotional truth to create obligation or guilt. This is the direct inversion of the practice.",
      beginnerReframe: "Share somatic truth as information, not as leverage. 'My chest is tight' — not 'my chest is tight because of what you did.'",
      advancedReframe: "Distinguish sharply between genuine somatic disclosure and emotional communication that happens to use body language. The first is neutral; the second carries agenda.",
    },
    {
      title: "Emotional processing as avoidance of erotic presence",
      body: "Genuine emotional honesty is in service of deeper contact — including erotic contact. If processing consistently delays or replaces intimacy, it has inverted its purpose.",
      beginnerReframe: "Set a gentle time limit on pre-intimacy check-ins. The check-in is meant to clear the path, not become the destination.",
      advancedReframe: "Practice moving fluidly between emotional honesty and erotic presence in the same encounter — they are not separate phases but simultaneous dimensions.",
    },
  ],
  exercises: [
    {
      title: "The Truth Before Touch (15 minutes)",
      setup: "Before any dedicated intimate time. Seated facing each other.",
      steps: [
        "Each partner takes three minutes alone with eyes closed, scanning the body honestly.",
        "Each shares in turn — body experience only, no narrative: location, temperature, texture, quality of what is present.",
        "Listen to each other without response or interpretation.",
        "Together, name any unspoken truth between you — not to process it fully, but to acknowledge it exists.",
        "Decide together what kind of contact the honest truth of right now calls for.",
      ],
      integration: "Practicing this consistently for one month changes the average quality of intimate encounters more than any other single practice.",
      beginnerNote: "If nothing comes up somatically, that itself is information — numbness or blankness is a somatic state worth naming.",
      advancedNote: "Extend the practice to naming erotic truth as well as emotional truth — what your body actually wants, as distinct from what it thinks it should want.",
    },
    {
      title: "Shame Mapping (20 minutes)",
      setup: "A private, dedicated conversation. Not before intimacy — as its own practice.",
      steps: [
        "Each partner takes five minutes to identify one area of their erotic life where shame is present — a desire, a quality of expression, a dimension of self that feels risky to reveal.",
        "Each shares that area with their partner — not the full content of it necessarily, but that it exists and roughly where it lives.",
        "The listening partner simply acknowledges: 'I receive that. It's safe here.'",
        "Neither partner needs to explore further unless genuinely moved to do so.",
        "Close with physical contact — not sexual, but warm and present.",
      ],
      integration: "Repeat monthly. The gradual dissolution of erotic shame through consistent acceptance creates deepening availability over time.",
      beginnerNote: "Naming that shame exists without revealing its full content is enough to begin the process.",
      advancedNote: "As trust builds, gradually reveal more of what lives in the areas of shame. The consistent experience of genuine acceptance is what dissolves the holding.",
    },
  ],
  reflectionPrompts: [
    "What somatic truth do I consistently withhold from my partner before and during intimacy? What am I protecting?",
    "Where does erotic shame live in my body? What does it feel like, and what part of my erotic nature is it suppressing?",
    "When have I felt genuinely known by my partner — seen in my actual erotic nature rather than in the version I manage? What made that possible?",
    "What would I need to share with my partner to feel completely visible? What stops me from sharing it?",
    "What is the difference between the erotic person I present to my partner and the erotic person I actually am?",
  ],
  relatedPaths: [
    { name: "The Embodied Heart", note: "The path built around Day and Boehm's work — nervous system safety, somatic disclosure, and body-led love." },
    { name: "Conscious Union", note: "The synthesis path that draws on Day's emphasis on honest love and genuine visibility as the foundation of sacred partnership." },
    { name: "Slow Love", note: "Richardson's stillness practices create the somatic conditions in which Day's body-led disclosure becomes most accessible." },
  ],
  premiumBanner: "Access Jan Day's complete body-led disclosure system: the full somatic check-in sequence, shame dissolution practices, real-time erotic disclosure tools, and the specific practices for rebuilding genuine erotic trust after accumulated emotional distance.",
};

// ─────────────────────────────────────────────────────────────────────────────
// CHARLES MUIR  (slug: "charles-muir")
// ─────────────────────────────────────────────────────────────────────────────
export const charlesMuirContent = {
  heroIntro: [
    "Charles Muir co-founded the Source School of Tantra Yoga in 1985 and has spent four decades on one central discovery: reverence is not a spiritual attitude toward the body. It is the specific quality of attention that makes genuine Tantric healing available.",
    "His honoring practices — drawn from classical puja and refined through thousands of hours with couples — are among the most effective tools available for dissolving the performance anxiety, shame, and protective holding that accumulate in any couple's erotic life over time.",
  ],
  whoItsFor: [
    {
      title: "Couples where familiarity has replaced genuine appreciation",
      body: "When the beloved's body has become known terrain — mapped, somewhat predictable, no longer encountered with genuine fresh attention — Muir's reverential practices restore the quality of seeing that makes the familiar genuinely extraordinary again.",
    },
    {
      title: "Couples carrying erotic wounding or shame",
      body: "The body holds the history of every intimate encounter. Muir's healing approach works directly with body-stored wounding — dissolving the holding that protects old hurt and creating the safety for genuine healing.",
    },
    {
      title: "Partners who want their intimate life to be genuinely ceremonial",
      body: "Muir brings classical Indian ritual consciousness to modern couples — teaching lovemaking as genuine puja, the body of the beloved as an actual sacred space deserving ceremony.",
    },
    {
      title: "Couples where one partner feels objectified rather than genuinely honored",
      body: "The shift from desired to genuinely reverenced — from being wanted to being honored — is one of the most healing experiences available in intimate life. Muir's practices create it systematically.",
    },
  ],
  practicePreview: {
    title: "The Honoring Practice",
    body: "The simplest and most powerful entry point in Muir's work: approaching the beloved's body as if encountering something genuinely sacred, with the quality of attention that genuine reverence requires.",
    steps: [
      "Before touching, make eye contact and silently acknowledge: 'I see you as sacred.'",
      "Begin with the feet — touching slowly, with complete attention, as if discovering something of genuine beauty.",
      "Move unhurriedly through the body, bringing the same quality of reverent attention to each area.",
      "When the giving partner notices their attention wandering into desire or agenda, return to simple reverence.",
      "Close with hands on the heart and a genuine moment of gratitude.",
    ],
  },
  beginnerTrack: {
    title: "Beginner Track: Learning Reverence",
    body: "Reverence as a practice — not as sentiment but as a specific quality of attention — is learned through repetition. The first weeks are about discovering what genuine reverence actually feels like to give and to receive.",
    steps: [
      "Practice the honoring practice once a week with no agenda beyond genuine reverence.",
      "Notice the difference between touching with desire and touching with reverence — they are not opposites, but they are genuinely different.",
      "Practice receiving the honoring with genuine openness — neither performing response nor withholding it.",
      "Bring the quality of reverence into ordinary daily physical contact: the hand held, the shoulder touched, the embrace offered.",
    ],
  },
  advancedTrack: {
    title: "Advanced Track: Sacred Lovemaking as Ceremony",
    body: "When both partners have developed the capacity for genuine reverence, lovemaking transforms into ceremony — an intentional, sacred act with opening, middle, and closing, all held in conscious awareness.",
    steps: [
      "Establish an opening ritual that marks the transition from ordinary life into sacred space.",
      "Enter lovemaking with the conscious intention that both bodies are temples and both partners are priests serving the other's healing and aliveness.",
      "Maintain the quality of reverence through the encounter — not as a constraint but as an attitude that deepens pleasure rather than limiting it.",
      "Close with genuine ceremony: acknowledgment, gratitude, and the conscious marking of what has been shared.",
    ],
  },
  quote: {
    text: "When you approach your partner's body with genuine reverence — not as a performance of reverence but as an actual perception of the sacred — something opens that desire alone cannot open.",
    source: "Charles Muir, Source School of Tantra Yoga",
  },
  whyMatters: [
    "He addresses the specific failure mode of long-term familiarity — the gradual replacement of genuine wonder with comfortable habit — through a practice that is simultaneously ancient and practically accessible.",
    "His healing approach acknowledges that bodies carry history, and that this history requires specific attention — not just presence and technique but genuine reverential care.",
    "His emphasis on lovemaking as ceremony gives couples a framework that transforms the quality of their intimate encounters from recreational to genuinely sacred.",
    "His work is practically grounded in decades of direct facilitation — the honoring practices he teaches have been refined through actual work with couples, not theoretical construction.",
  ],
  coreTeachings: [
    {
      title: "The body of the beloved is a sacred space",
      body: "This is not a metaphor in Muir's teaching. It is a direct perception available through the specific quality of attention that reverence provides — and it changes the entire experience of physical contact.",
      beginnerReframe: "Touch your partner's hand for thirty seconds as if it were genuinely sacred — not precious or fragile, but worthy of complete, unhurried attention. Notice what changes.",
      advancedReframe: "Bring this quality of perception to lovemaking itself: the conscious recognition that what you are entering is genuinely holy, and behave accordingly.",
    },
    {
      title: "Reverence dissolves protective holding",
      body: "The body's defensive holding — the subtle muscular contraction that protects old wounds and manages the vulnerability of genuine exposure — dissolves reliably in the consistent presence of genuine reverence. This is the healing mechanism.",
      beginnerReframe: "Notice where in your own body you hold when a partner touches you. Breathe into that area and consciously allow the holding to soften.",
      advancedReframe: "As the giver, develop the sensitivity to feel where your partner holds — and let your touch be so genuinely reverent that the holding has nothing to protect against.",
    },
    {
      title: "Ceremony creates transformation",
      body: "Intentional opening and closing of intimate encounters — the creation of a ceremonial container — changes the quality of what occurs within it. The same physical acts within a ceremony have a different quality than the same acts without one.",
      beginnerReframe: "Add one ceremonial element to an intimate encounter this week — a candle lit with intention, three breaths taken together, a spoken acknowledgment before beginning.",
      advancedReframe: "Develop a complete ceremony unique to your relationship — specific opening and closing rituals that mark the sacred nature of what you share.",
    },
    {
      title: "Lovemaking heals what wounded",
      body: "The same medium through which wounding occurred — intimate contact — is the medium through which genuine healing occurs. Muir's Tantric healing approach uses conscious, reverent touch to restore areas of the body that carry sexual shame or wounding.",
      beginnerReframe: "Bring your partner's awareness to an area of their body they rarely receive positive touch — not sexual touch, but genuinely reverential contact.",
      advancedReframe: "Learn the specific yoni and lingam honoring sequences from the Source School tradition — practices designed specifically for healing the body's intimate history.",
    },
  ],
  modernUse: [
    {
      title: "When a partner feels used rather than genuinely honored",
      body: "The shift from desired to reverenced — from being wanted for pleasure to being honored as sacred — is one of the most healing experiences available in intimate life. Muir's practices create this shift systematically.",
    },
    {
      title: "When couples want to ceremonially mark relationship milestones",
      body: "Source School offers specific rituals for anniversaries, renewals of commitment, passages through difficulty, and celebrations of depth — ways of honoring the relationship's sacred nature with genuine ceremony.",
    },
    {
      title: "When the body carries shame from past experiences",
      body: "The reverential approach to the body — treating every area with genuine sacred attention — is one of the most effective approaches to dissolving body-stored shame and restoring genuine erotic availability.",
    },
  ],
  shadowToAvoid: [
    {
      title: "Performing reverence rather than feeling it",
      body: "Reverence as performance is easily detected by the body of the receiver and does not produce the healing effects of genuine reverence. The practice requires actual inner state change, not behavioral mimicry.",
      beginnerReframe: "If reverence doesn't feel genuine, look for something genuinely remarkable about your partner's body. Find something you actually find beautiful and begin there.",
      advancedReframe: "Develop a genuine inner practice of recognizing the sacred — not only in your partner's body but in the bodies of all living things. The perception available in lovemaking is the same perception cultivated everywhere.",
    },
    {
      title: "Sacred atmosphere replacing genuine honesty",
      body: "Beautiful ceremony can become a substitute for the honest relational conversation that the relationship actually needs. Reverence serves genuine meeting — it does not replace it.",
      beginnerReframe: "Combine ceremonial practice with genuine emotional check-in. They belong together.",
      advancedReframe: "Develop the capacity to hold both simultaneously: the quality of sacred ceremony and the quality of complete relational honesty in the same encounter.",
    },
  ],
  exercises: [
    {
      title: "Full Body Honoring (30 minutes)",
      setup: "One partner receives completely. The other gives with genuine reverence.",
      steps: [
        "The receiver lies comfortably. The giver begins at the crown of the head with both hands resting lightly.",
        "Move slowly down the body — spending three to five minutes with each area: head, face, throat, shoulders, chest, belly, hips, legs, feet.",
        "The touch is reverential rather than sensual: not seeking response, not creating arousal, simply acknowledging the sacred quality of what is there.",
        "If the receiver cries, or expresses emotion, or shows any response — simply acknowledge it with gentle presence and continue.",
        "At the feet, reverse and return to the crown.",
        "Close with both hands on the heart for two minutes of complete stillness.",
        "Switch.",
      ],
      integration: "Practice monthly. The cumulative effect on both partners' body-relationship and erotic availability is substantial.",
      beginnerNote: "Avoid sexual areas in early practice. Let reverence establish itself with the whole body before bringing it to the most charged areas.",
      advancedNote: "Extend practice to include the specific yoni and lingam honoring sequences from the Source School tradition.",
    },
    {
      title: "Opening Ceremony (10 minutes)",
      setup: "Before any dedicated intimate time.",
      steps: [
        "Both partners bathe or wash hands — the physical act of preparation marking the transition from ordinary to sacred.",
        "Light a candle together with the explicit intention of honoring what you are about to share.",
        "Stand facing each other. Each partner speaks one sentence of genuine appreciation for the other.",
        "Three breaths taken together.",
        "Enter the intimate space.",
      ],
      integration: "The ten-minute opening ceremony changes more about the quality of what follows than anything attempted during the encounter itself.",
      beginnerNote: "If ceremony feels awkward, that awkwardness is worth working through. The discomfort is the ordinary mind's resistance to genuine sacred attention.",
      advancedNote: "Develop a ceremony specific to your relationship — elements that have genuine meaning for both partners rather than generic ritual forms.",
    },
  ],
  reflectionPrompts: [
    "When did I last approach my partner's body with genuine wonder — as if encountering something truly remarkable? What created that quality?",
    "Where in my own body do I hold when a partner touches me? What is that holding protecting?",
    "What would it mean to treat our intimate life as genuinely ceremonial — with opening, middle, and closing, all held in conscious care?",
    "Have I ever felt genuinely reverenced by my partner — honored rather than desired? What was different about that experience?",
    "What one ceremonial practice could we introduce to our intimate life that would most transform its quality?",
  ],
  relatedPaths: [
    { name: "Conscious Union", note: "The synthesis path that draws directly on Muir's emphasis on ceremony, honoring, and the sacred marking of intimate encounters." },
    { name: "Tantric Wisdom", note: "The complete Tantric framework from which Muir's Source School draws — particularly the body-as-temple and bhakti pillars." },
    { name: "The Embodied Heart", note: "The somatic safety work of Boehm and Day creates the physiological conditions in which Muir's reverential healing practices become fully effective." },
  ],
  premiumBanner: "Access the complete Source School of Tantra Yoga couples system: the full body honoring practices, yoni and lingam healing sequences, ceremony library, and the specific Tantric healing tools for dissolving body-stored shame and restoring genuine erotic reverence.",
};

// ─────────────────────────────────────────────────────────────────────────────
// SALLY KEMPTON  (slug: "sally-kempton")
// ─────────────────────────────────────────────────────────────────────────────
export const sallyKemptonContent = {
  heroIntro: [
    "Sally Kempton spent eleven years as a sannyasi in the Siddha Yoga tradition before becoming one of the most precise and accessible translators of Kashmir Shaivism in the English language. Her particular gift: making the most abstract non-dual philosophy feel immediately true in the body.",
    "For couples, her work opens a dimension of intimacy that transcends the interpersonal entirely — the direct recognition that what you love in your partner is the same living divine energy that animates all of existence, and that this recognition is not a concept but a felt experience available in ordinary moments of genuine presence.",
  ],
  whoItsFor: [
    {
      title: "Couples with active spiritual or meditation practices",
      body: "Kempton shows how the insights available in meditation are available in intimacy — and how a committed relationship is itself one of the most powerful spiritual practices available to a human being.",
    },
    {
      title: "Couples drawn to the divine feminine as a living reality",
      body: "Śakti — the creative energy of the universe — is not a symbol for Kempton. It is a direct experience available through specific recognition practices. Her work makes this experience genuinely accessible.",
    },
    {
      title: "Partners who experience their relationship as spiritually meaningful",
      body: "Kempton provides the philosophical framework and practical practices that make this intuition precise — transforming a vague sense of the sacred in love into a specific, cultivable experience.",
    },
    {
      title: "Couples ready to work with the subtle dimensions of consciousness",
      body: "Kashmir Shaivism maps consciousness with extraordinary precision. Kempton's translation of this map into relational practice gives couples access to dimensions of their shared experience that most frameworks never acknowledge.",
    },
  ],
  practicePreview: {
    title: "Recognition Practice",
    body: "The central practice of Kashmir Shaivism applied to intimate relationship: the direct perception of the beloved as a living expression of Śakti.",
    steps: [
      "In a quiet moment with your partner, close your eyes and recall the specific quality of aliveness you first felt in their presence.",
      "Open your eyes and look at your partner as if for the first time — letting the familiar image soften.",
      "Look for the aliveness behind the surface — the quality of presence and energy that is more fundamental than appearance or personality.",
      "When you feel even a flicker of genuine recognition — the sense of seeing something genuinely extraordinary in the ordinary face — rest there.",
      "Let this recognition change the quality of how you touch your partner today.",
    ],
  },
  beginnerTrack: {
    title: "Beginner Track: Developing Recognition",
    body: "Recognition in Kashmir Shaivism is not a special state but a perceptual skill developed through practice. The beginning practice is learning to look through the surface to the aliveness beneath.",
    steps: [
      "Practice the recognition exercise once daily — looking for Śakti in your partner's face for sixty seconds with genuine curiosity.",
      "Notice moments when recognition occurs spontaneously — when your partner's aliveness suddenly becomes undeniable. What creates those moments?",
      "Read Kempton's Awakening Shakti alongside the practice — the philosophical grounding deepens and stabilizes what the practice reveals.",
      "Bring the recognition quality to non-intimate encounters: a conversation, a meal together, an ordinary moment of physical contact.",
    ],
  },
  advancedTrack: {
    title: "Advanced Track: Relationship as Sadhana",
    body: "When recognition becomes a reliable capacity, the entire relationship transforms into a continuous spiritual practice — every encounter an opportunity for the direct experience of non-dual awareness.",
    steps: [
      "Establish a daily recognition practice: each morning, look at your partner and consciously perceive the Śakti moving within them.",
      "Use intimate encounters as laboratories for non-dual awareness — the specific states available in deep lovemaking as direct recognition of Śiva/Śakti union.",
      "Bring the recognition practice to moments of conflict: even in difficulty, practice perceiving the divine energy moving within the other person's frustration or pain.",
      "Develop the capacity to recognize Śakti in yourself as well — to perceive your own nature as divine creative energy rather than as a fixed, limited self.",
    ],
  },
  quote: {
    text: "When you recognize Śakti in your beloved — actually feel the divine creative energy moving within them — love is no longer something between two separate people. It is consciousness recognizing itself.",
    source: "Sally Kempton, Awakening Shakti",
  },
  whyMatters: [
    "She offers the most precise and accessible translation of Kashmir Shaivism's non-dual framework into relational practice — making the most sophisticated Tantric philosophy genuinely practical.",
    "Her recognition practices give couples access to transcendent experiences within ordinary intimate moments — not requiring special states or retreat conditions.",
    "She grounds the concept of the divine feminine in lived experience rather than in mythology — Śakti becomes a felt reality rather than a cultural symbol.",
    "Her integration of scholarly depth and direct practice experience makes her work both intellectually rigorous and genuinely transformative.",
  ],
  coreTeachings: [
    {
      title: "Śakti is not a concept",
      body: "The creative energy of the universe — what Tantra calls Śakti — is not a belief or a symbol. It is a direct experience available in any moment of genuine presence: the aliveness of a living body, the quality of attention between two genuinely present people.",
      beginnerReframe: "In this conversation, right now, notice the quality of aliveness in the room. That quality is Śakti. It is not separate from ordinary experience — it is the living nature of ordinary experience.",
      advancedReframe: "Develop the capacity to recognize Śakti continuously — not only in peak intimate moments but in the ordinary aliveness of daily life. This recognition transforms everything.",
    },
    {
      title: "The beloved is Śakti in form",
      body: "In Kashmir Shaivism, the beloved is not merely a person you love. They are a particular expression of the divine creative energy that animates all of existence. Recognizing this directly — not as metaphor but as perception — changes the quality of intimate contact entirely.",
      beginnerReframe: "Look at your partner and genuinely ask: who is actually here? Beyond the familiar personality and the accumulated image — what is the actual living presence in this body?",
      advancedReframe: "Practice perceiving your partner as Śakti consistently — not only during peak moments but in their ordinariness, their difficulty, their most unglamorous moments.",
    },
    {
      title: "Consciousness and energy are one",
      body: "Kashmir Shaivism's central insight — that Śiva (pure consciousness) and Śakti (creative energy) are not two things but one reality appearing in different modes — has a radical implication: the stillness of deep presence and the aliveness of genuine eros are not opposites. They are the same thing.",
      beginnerReframe: "In a moment of genuine stillness with your partner — not going anywhere, not doing anything — notice the aliveness of that stillness. That is Śiva/Śakti in union.",
      advancedReframe: "Use deep intimate stillness as a direct pointer to non-dual awareness. The state available in genuine shared presence is the state the whole of Tantric philosophy is pointing toward.",
    },
    {
      title: "Recognition is the practice, not achievement",
      body: "Non-dual recognition in Kashmir Shaivism is not a permanent attainment reached after years of practice. It is a flash of direct perception available in any moment — and the practice is to recognize it when it occurs and allow it to deepen.",
      beginnerReframe: "Notice moments when recognition occurs spontaneously: when your partner's aliveness suddenly becomes undeniable, when love is simply, obviously present. These moments are recognition. Practice returning to them.",
      advancedReframe: "Use the recognition of contracted states as equally valid practice: the moment when you recognize that limitation, doubt, or fear is also Śakti moving is the same recognition as recognizing love.",
    },
  ],
  modernUse: [
    {
      title: "When intimate life feels spiritual but lacks a framework",
      body: "Many couples have genuine intimations of the sacred in their intimate life but lack the philosophical container to understand or deepen what they're experiencing. Kempton's work provides that container.",
    },
    {
      title: "When relationship feels like a spiritual practice but also like a constant test",
      body: "Kashmir Shaivism reframes the difficulty of relationship: the places where a partner challenges you are the places where recognition is being invited. Kempton's work makes this not a platitude but a genuine perceptual shift.",
    },
    {
      title: "When couples want their intimate life to deepen their individual spiritual practice",
      body: "Kempton shows how the insights available in lovemaking and in the presence of the beloved are precisely the insights available in meditation — and how cultivating one deepens the other.",
    },
  ],
  shadowToAvoid: [
    {
      title: "Using spiritual framework to bypass genuine relational difficulty",
      body: "'We are both Śakti' can become a bypass for addressing actual relational pain, broken agreements, or accumulated resentment. Recognition of the divine does not replace ordinary relational honesty.",
      beginnerReframe: "Bring the recognition practice and honest communication to the same relationship. They are not in conflict — genuine recognition increases rather than decreases accountability.",
      advancedReframe: "Practice perceiving the Śakti moving within your partner's frustration or pain as equally as you perceive it within their joy or beauty. This is complete practice.",
    },
    {
      title: "Philosophy replacing embodied practice",
      body: "Kashmir Shaivism's intellectual sophistication can become an elaborate avoidance of the direct, embodied experience it points toward. The concepts are maps — not the territory.",
      beginnerReframe: "For every concept understood, seek the direct somatic experience it describes. Understanding that Śakti is aliveness is different from actually feeling Śakti in your partner's body.",
      advancedReframe: "Periodically set the philosophical framework entirely aside and simply practice: look, feel, touch, breathe, be present. Let the experience precede the interpretation.",
    },
  ],
  exercises: [
    {
      title: "Śakti Gaze (10 minutes)",
      setup: "Both partners seated facing each other. No touching initially.",
      steps: [
        "Close eyes and breathe for two minutes. Let the mind settle.",
        "Open eyes and make soft eye contact — not staring, not performing, but genuinely looking.",
        "Begin looking for the aliveness behind your partner's eyes — the quality of awareness and presence more fundamental than expression.",
        "When recognition occurs — even briefly — let it register fully before moving on.",
        "After five minutes of gaze, close the distance slowly. Let physical contact arise from the recognition rather than preceding it.",
      ],
      integration: "Practice weekly. The quality of recognition available in the gaze gradually becomes available throughout intimate life.",
      beginnerNote: "If the gaze feels uncomfortable, soften your focus — look at the general region of the face rather than directly into the eyes.",
      advancedNote: "Practice the gaze during lovemaking — maintaining genuine recognition of the Śakti in the beloved even at the height of physical intensity.",
    },
    {
      title: "Śiva/Śakti Meditation (15 minutes)",
      setup: "Both partners seated in comfortable embrace or facing each other.",
      steps: [
        "One partner consciously inhabits the Śiva quality — pure, still, witnessing consciousness. The other inhabits the Śakti quality — alive, moving, creative energy.",
        "The Śiva partner practices genuine inner stillness and spacious awareness. The Śakti partner allows genuine expression of aliveness — movement, sound, feeling — without direction or agenda.",
        "After seven minutes, switch roles.",
        "Close with both partners returning to a quality that includes both: still and alive, present and open simultaneously.",
      ],
      integration: "This practice develops the direct somatic experience of Śiva and Śakti as poles of consciousness and energy — making the philosophical reality a felt experience.",
      beginnerNote: "The roles are not performances. Śiva practice is genuine meditation. Śakti practice is genuine expression. Both require complete authenticity.",
      advancedNote: "Extend the practice into the dissolution of the roles — the moment when Śiva and Śakti are no longer distinguishable. That dissolution is the practice's highest point.",
    },
  ],
  reflectionPrompts: [
    "When have I experienced my partner as genuinely sacred — not as a romantic idea but as a direct perception? What opened that?",
    "What is the difference between loving someone and recognizing the divine within them? Have I experienced the second?",
    "Where in my intimate life do I feel the boundary between two selves becoming permeable? What creates those moments?",
    "How does my meditation or spiritual practice relate to my intimate life? Are they the same practice or two separate ones?",
    "What would change in our relationship if I consistently practiced perceiving my partner as Śakti in form?",
  ],
  relatedPaths: [
    { name: "Tantric Wisdom", note: "The complete Tantric framework that Kempton's Kashmir Shaivism sits within — particularly the Spanda, Śiva/Śakti, and Samādhi pillars." },
    { name: "Conscious Union", note: "The recognition and ceremony of conscious union are direct expressions of the Kashmir Shaivism practice Kempton teaches." },
    { name: "Sacred Polarity", note: "The Śiva/Śakti framework maps precisely onto the sacred polarity path — giving Deida's masculine/feminine teaching its deepest philosophical grounding." },
  ],
  premiumBanner: "Access Kempton's complete Kashmir Shaivism couples practice: the full Śakti recognition sequence, Śiva/Śakti meditation, the recognition practices for transforming ordinary moments into direct spiritual experience, and the philosophical framework that makes the transcendent genuinely available in intimate life.",
};

// ─────────────────────────────────────────────────────────────────────────────
// MAX BUSH  (slug: "max-bush")
// ─────────────────────────────────────────────────────────────────────────────
export const maxBushContent = {
  heroIntro: [
    "Max Bush works with the question many partners carry in silence: how do I develop genuine erotic confidence and skill without reducing my partner to an object, and without performing a masculinity that is not authentically mine?",
    "His answer: erotic confidence is not a behavior or a style. It is a quality of embodied presence — grounded, genuinely here, genuinely responsive — that a partner feels as simultaneous safety and attraction. It cannot be performed. It can be cultivated.",
  ],
  whoItsFor: [
    {
      title: "Partners who feel erotic performance pressure",
      body: "The anxiety of needing to get sex right is one of the most reliably erotic-killing experiences available. Bush's work dissolves performance as a relevant category and replaces it with presence — which creates genuine attraction rather than anxious effort.",
    },
    {
      title: "Couples where one partner's eroticism consistently overshadows the other's",
      body: "When erotic confidence is absent in one partner, the other often over-functions or withdraws. Genuine erotic presence restores the balance — not by the confident partner becoming less, but by the other developing genuine embodied confidence.",
    },
    {
      title: "Partners developing their erotic nature after a period of suppression",
      body: "After years of erotic suppression — whether from past experience, cultural messaging, or relationship patterns — genuine erotic confidence requires cultivation. Bush's practices provide the specific developmental framework.",
    },
    {
      title: "Couples who want erotic leadership to feel safe rather than pressured",
      body: "Genuine erotic presence — the quality that leads from genuine groundedness rather than need or performance — creates safety rather than pressure. Bush teaches exactly how to develop this specific quality.",
    },
  ],
  practicePreview: {
    title: "Grounded Arrival",
    body: "The foundational practice: arriving fully in your own body before arriving with your partner. Most erotic anxiety is a symptom of not being fully present in yourself.",
    steps: [
      "Before any intimate encounter, stand alone for two minutes with feet firmly on the ground.",
      "Feel the weight of your body — the actual physical sensation of your feet on the floor, your hips, your chest.",
      "Breathe slowly into the lower belly until you feel genuinely grounded — not performing groundedness but actually feeling it.",
      "Notice the difference between your body's actual present-moment state and what you think should be happening.",
      "Enter your partner's presence from this actual ground — not from what you think they want or from what you think you should offer.",
    ],
  },
  beginnerTrack: {
    title: "Beginner Track: Building Somatic Groundedness",
    body: "Genuine erotic confidence is built from the body up — not from the mind's idea of confidence but from the actual physiological state of genuine embodied presence.",
    steps: [
      "Practice grounded arrival before every intimate encounter for one month.",
      "Develop a daily embodiment practice: five minutes of slow, deliberate physical movement that keeps you in somatic contact with your body throughout the day.",
      "Notice the specific conditions that make genuine presence available versus the conditions that trigger performance anxiety.",
      "Build the vocabulary for naming your actual somatic state — to yourself and to your partner.",
    ],
  },
  advancedTrack: {
    title: "Advanced Track: Erotic Attunement",
    body: "Once genuine somatic groundedness is established, the next practice is learning to feel and respond to a partner's actual living energetic state — moment by moment, without projection or agenda.",
    steps: [
      "Practice reading your partner's somatic state through quality of touch and attention alone.",
      "Develop the capacity to distinguish between your partner's genuine arousal and their conditioned responsiveness.",
      "Learn to follow genuine signal rather than create response — discovering the specific quality of contact that is genuinely wanted rather than performing what you think should be wanted.",
      "Practice erotic leadership that arises from genuine attunement: directing the encounter from what you feel in your partner rather than from what you want from them.",
    ],
  },
  quote: {
    text: "Genuine erotic confidence is not what you do — it's the quality of consciousness you bring. A partner doesn't feel your technique. They feel whether you're actually here.",
    source: "Max Bush",
  },
  whyMatters: [
    "He addresses the specific suffering of erotic performance anxiety — which is epidemic in men but rarely spoken — with genuine precision and practical tools.",
    "His distinction between performed confidence and embodied presence names something most couples feel but can't articulate — and offers a clear developmental path from the first to the second.",
    "His integration of somatic work with erotic development gives the work an unusual depth: this is not pickup artistry or sexual technique but genuine embodied development.",
    "His emphasis on attunement — responsiveness to a partner's actual state — transforms erotic confidence from something done to a partner into something done with them.",
  ],
  coreTeachings: [
    {
      title: "Embodied presence is more erotic than technique",
      body: "A partner's body responds to the quality of your consciousness before it registers the content of your technique. Genuine presence — actual somatic groundedness and real attention — is felt as attraction. Performance is felt as pressure.",
      beginnerReframe: "For one encounter, forget everything you know about technique. Simply arrive in your body and stay there. Notice what your partner's body does.",
      advancedReframe: "Develop the capacity to maintain genuine somatic groundedness through the entire arc of an intimate encounter — including during the moments when anxiety or performance pressure typically arise.",
    },
    {
      title: "Attunement is the core skill",
      body: "The capacity to feel and respond to a partner's actual living energetic state — not to project desire onto them but to actually feel what they need — is the foundation of genuine erotic leadership.",
      beginnerReframe: "For one intimate encounter, place all your attention on what you feel in your partner's body — temperature, texture, quality of breath, subtle holding or expansion — before deciding what to do.",
      advancedReframe: "Develop the capacity to track your partner's somatic state in real time throughout an encounter — adjusting presence, pace, and touch from what you feel rather than from any predetermined script.",
    },
    {
      title: "Anxiety and performance occupy the same neural space as genuine presence",
      body: "Performance anxiety is not the enemy of erotic presence — it is what presence looks like when attention is displaced into the mind's evaluation loop rather than anchored in the body.",
      beginnerReframe: "When performance anxiety arises, use it as a signal to return attention to physical sensation — feel your feet on the floor, your breath in your chest. This breaks the loop.",
      advancedReframe: "Develop the capacity to be present with mild anxiety without being hijacked by it — building the somatic stability that allows genuine presence even when some activation is present.",
    },
    {
      title: "Erotic leadership comes from genuine care, not from want",
      body: "Erotic leadership that comes from the need to get something — validation, pleasure, response — is felt as pressure. Erotic leadership that comes from genuine care for the beloved's aliveness is felt as invitation.",
      beginnerReframe: "Before intimate contact, check honestly: am I touching from genuine care for this person's aliveness, or am I touching from what I need? Both are human. Only honesty creates the possibility of change.",
      advancedReframe: "Develop the capacity for erotic generosity — presence and touch that is genuinely more interested in the beloved's aliveness than in generating response. This quality of attention is experienced as profoundly erotic.",
    },
  ],
  modernUse: [
    {
      title: "When performance anxiety consistently interrupts genuine intimacy",
      body: "Bush's somatic groundedness practices dissolve performance anxiety at its physiological root — not through managing the anxiety but through establishing the genuine presence that makes anxiety irrelevant.",
    },
    {
      title: "When a partner's erotic confidence is developing after years of suppression",
      body: "The developmental framework Bush offers allows gradual, genuine building of erotic confidence — not performance of confidence before it is genuinely present, but actual cultivation of the embodied quality.",
    },
    {
      title: "When couples want erotic leadership without erotic pressure",
      body: "The specific quality of attuned erotic leadership — confident and genuinely responsive — is exactly what most couples are seeking without having the language for it. Bush provides both the language and the practices.",
    },
  ],
  shadowToAvoid: [
    {
      title: "Confidence as dominance",
      body: "Genuine erotic confidence includes the specific confidence to be genuinely responsive — to follow a partner's actual signal rather than imposing a predetermined approach. Confidence that cannot yield is not confidence; it is control.",
      beginnerReframe: "The most confident thing you can do is follow your partner's genuine signal rather than override it with your agenda. Practice this specifically.",
      advancedReframe: "Develop the capacity to lead and follow simultaneously — to hold direction and respond to signal at the same time. This is the advanced expression of genuine erotic confidence.",
    },
    {
      title: "Somatic development as avoidance of emotional honesty",
      body: "Embodiment practices can become another form of performance — a sophisticated-looking way to stay safely in the physical while avoiding the emotional truth of the relationship.",
      beginnerReframe: "Combine somatic groundedness practice with genuine emotional check-in. Embodied presence and emotional honesty belong together.",
      advancedReframe: "Develop the specific capacity for emotional presence within erotic encounters — the capacity to be genuinely moved by your partner's experience without being destabilized by it.",
    },
  ],
  exercises: [
    {
      title: "Somatic Groundedness Practice (8 minutes)",
      setup: "Alone, before intimate encounters. Standing or seated.",
      steps: [
        "Feel your feet on the floor. Consciously press them down and feel the floor push back.",
        "Feel the weight of your hips — let them be genuinely heavy.",
        "Breathe slowly into the lower belly for two minutes. Feel your breath moving the belly rather than the chest.",
        "Scan for any area of holding or performance — the jaw, the shoulders, the chest. Release what you find.",
        "Ask honestly: am I actually here right now, or am I managing how I appear?",
        "Repeat: 'I am here. Not performing, not wanting — here.' Let this be true before proceeding.",
      ],
      integration: "Practice before every intimate encounter for one month. The physiological state this creates is the foundation of genuine erotic presence.",
      beginnerNote: "If genuine groundedness doesn't arise within eight minutes, extend the practice rather than proceeding without it.",
      advancedNote: "Develop the capacity to return to somatic groundedness quickly within an intimate encounter — using breath and physical sensation to break the performance loop when it arises.",
    },
    {
      title: "Attunement Practice (20 minutes)",
      setup: "With partner. One partner gives, one receives.",
      steps: [
        "Giver: place your hands on your partner's back and spend two minutes simply feeling — temperature, texture, quality of breathing, subtle holding or softness.",
        "Before any movement, form a genuine sense of what this body needs right now.",
        "Move from that sense rather than from your own desire or from any predetermined approach.",
        "Continue for ten minutes, staying with your felt sense of what is genuinely wanted rather than what you want to give.",
        "Close with two minutes of resting hands, feeling the contact without any agenda.",
        "Switch.",
        "Share one sentence each about what you actually felt — not what you performed.",
      ],
      integration: "Practicing genuine attunement changes the quality of every subsequent intimate encounter.",
      beginnerNote: "If you cannot feel a clear sense of what your partner needs, ask with genuine curiosity: 'What does your body want right now?' Then follow the answer.",
      advancedNote: "Develop the capacity to track attunement continuously — feeling and responding to moment-by-moment shifts in your partner's somatic state throughout an encounter.",
    },
  ],
  reflectionPrompts: [
    "Where does performance anxiety most reliably arise for me in intimate contexts? What specifically triggers it?",
    "What is the difference between the erotic presence I perform and the erotic presence I actually have? How large is that gap?",
    "When have I felt genuinely attuned to my partner — actually feeling what they needed rather than projecting what I wanted to give? What created that?",
    "What would genuine erotic confidence feel like in my body — not as an idea, but as an actual somatic state?",
    "What one practice, sustained for three months, would most develop my genuine erotic presence?",
  ],
  relatedPaths: [
    { name: "Sacred Polarity", note: "Deida's framework for masculine presence provides the philosophical context for what Bush teaches as somatic erotic confidence." },
    { name: "The Embodied Heart", note: "Boehm's somatic safety work creates the relational conditions in which Bush's erotic attunement practices can be genuinely practiced." },
    { name: "Conscious Union", note: "The full presence and devotion of conscious union are the relational expressions of the embodied erotic confidence Bush cultivates." },
  ],
  premiumBanner: "Access Bush's complete embodied erotic development system: the full somatic groundedness sequence, erotic attunement practices, performance anxiety dissolution tools, and the specific developmental framework for building genuine erotic confidence from the body up.",
};

// ─────────────────────────────────────────────────────────────────────────────
// VICTOR GOLD  (slug: "victor-gold")
// ─────────────────────────────────────────────────────────────────────────────
export const victorGoldContent = {
  heroIntro: [
    "Victor Gold brings to intimate life what most teachers ignore and most couples quietly need: the specific quality of creative attention that transforms the familiar into the extraordinary — not through novelty but through depth.",
    "His central insight: most erosion of erotic aliveness in long-term relationships is not a failure of love or chemistry. It is a failure of creative attention — and creative attention is something that can be learned, practiced, and deliberately deepened.",
  ],
  whoItsFor: [
    {
      title: "Long-term couples where novelty no longer restores erotic aliveness",
      body: "When changing what you do no longer changes how it feels, depth of attention is what's needed — not more content. Gold's work is specifically for couples who have discovered this.",
    },
    {
      title: "Partners with aesthetic sensibility who want their intimate life to match it",
      body: "Many couples bring genuine care for beauty and quality to every other area of their lives and bring unconscious habit to their intimate life. Gold's work closes this gap.",
    },
    {
      title: "Couples drawn to craft and mastery as modes of deepening",
      body: "Gold treats erotic presence as a craftsperson treats their art — something to be continually refined, deepened, and brought to greater levels of quality. This framing works particularly well for people who already understand craft in other domains.",
    },
    {
      title: "Partners who want to give genuine pleasure, not just experience it",
      body: "Gold's emphasis on erotic generosity — the quality of attention directed toward the beloved's aliveness rather than toward one's own satisfaction — speaks directly to partners who derive deep satisfaction from genuinely nourishing another person.",
    },
  ],
  practicePreview: {
    title: "The Single Touch",
    body: "The foundation of all Gold's work: one touch given with complete creative attention — fully present, genuinely curious, unrepeatable.",
    steps: [
      "Choose one area of your partner's body. Before touching, spend thirty seconds simply observing it — its texture, color, the way light falls on it, the way it moves with breath.",
      "Touch it once — slowly, with full attention, as if discovering it for the first time.",
      "Feel every quality of the contact: temperature, texture, the specific shape of what's beneath the surface.",
      "Before any second touch, pause and register fully what you felt.",
      "Continue in this way — each touch given as if it were the first and possibly the last.",
    ],
  },
  beginnerTrack: {
    title: "Beginner Track: Learning to Arrive",
    body: "Arriving fully — bringing genuine creative attention to the present moment rather than executing habitual patterns — is the single most transformative skill in Gold's work.",
    steps: [
      "Before any intimate encounter, spend three minutes genuinely gathering your attention: What is actually here? What is actually possible?",
      "Practice giving one touch per minute of genuine quality rather than continuous mechanical contact.",
      "After each intimate encounter, identify one moment when you were completely present — and one moment when you were executing habit. Notice the difference.",
      "Build the practice of genuine curiosity: treating your partner's body as something you are still discovering, regardless of years of familiarity.",
    ],
  },
  advancedTrack: {
    title: "Advanced Track: Erotic Artistry",
    body: "Advanced practice is the cultivation of consistent creative presence throughout an encounter — the capacity to bring genuine creative attention to every moment rather than only to peak moments.",
    steps: [
      "Develop the capacity to inhabit the space before a touch with the same quality of awareness as the touch itself.",
      "Practice erotic improvisation: allowing each moment to arise from genuine creative response to what is present rather than following any predetermined sequence.",
      "Cultivate the specific quality of erotic devotion — the quality of attention that is more interested in the beloved's experience than in one's own.",
      "Develop your own unique aesthetic language in intimate contact — the specific qualities of attention, pace, and presence that are genuinely yours.",
    ],
  },
  quote: {
    text: "The difference between a mediocre intimate life and an extraordinary one is almost never the content. It is the quality of attention brought to what is already there.",
    source: "Victor Gold",
  },
  whyMatters: [
    "He addresses the actual mechanism of erotic diminishment in long-term relationships — not lack of love but lack of creative attention — which most approaches ignore entirely.",
    "The craft framework he offers is uniquely sustainable: attention to quality deepens over time rather than diminishing. A couple who practices this for twenty years has something extraordinary.",
    "His emphasis on erotic generosity — pleasure given as a genuine art — addresses a dimension of intimate life that most approaches treat as secondary to mutual satisfaction.",
    "His aesthetic framework makes the practice feel genuinely noble — not a management of a problem but a real cultivation of beauty.",
  ],
  coreTeachings: [
    {
      title: "Attention is the primary erotic substance",
      body: "What creates genuine erotic aliveness is not technique, novelty, or physical intensity. It is the specific quality of conscious attention brought to the present moment. The body responds to being genuinely seen and met with a quality of pleasure that technique alone cannot produce.",
      beginnerReframe: "For one encounter, let attention be your only technique. Give complete, unhurried attention to whatever you are doing at each moment. Notice what this creates.",
      advancedReframe: "Develop the capacity for sustained creative attention throughout an entire encounter — not only during peak moments but through all the ordinary, in-between, unhurried moments that most couples rush through.",
    },
    {
      title: "Depth replaces novelty",
      body: "The cultural prescription for maintaining erotic aliveness is novelty: new positions, new settings, new scenarios. Gold's teaching reverses this: depth — the continual discovery of what is already there — is inexhaustible in a way novelty is not.",
      beginnerReframe: "Take one square inch of your partner's body and spend five minutes discovering it with complete attention. What do you actually notice?",
      advancedReframe: "Develop the capacity to find genuine novelty within complete familiarity — the specific quality of attention that makes the ten-thousandth touch feel genuinely unrepeatable.",
    },
    {
      title: "Erotic generosity is a practice",
      body: "The quality of pleasure given as a genuine art — not for reciprocity or validation but from the authentic desire to nourish another person's aliveness — creates an erotic field of unusual depth and sustainability.",
      beginnerReframe: "For one session, focus entirely on your partner's experience. Not strategically, not as martyrdom, but from genuine interest in what creates aliveness in this specific body.",
      advancedReframe: "Develop erotic generosity as a daily practice — not limited to intimate encounters but expressed in every form of physical affection, care, and attention offered throughout the day.",
    },
    {
      title: "Each encounter is unrepeatable",
      body: "The quality of creative attention that comes from treating each intimate encounter as genuinely unique — unrepeatable, happening for the first and last time — is the quality available in the greatest art and in the deepest lovemaking.",
      beginnerReframe: "Before the next intimate encounter, genuinely recall that this moment will never occur again. Let this awareness shift your quality of presence.",
      advancedReframe: "Develop the wabi-sabi consciousness in intimate life: the specific appreciation for the beauty of the impermanent, the unrepeatable, the genuinely present. This consciousness transforms everything it touches.",
    },
  ],
  modernUse: [
    {
      title: "When years of familiarity have produced erotic routine",
      body: "Gold's practices address familiarity directly — not by adding novelty but by deepening the quality of attention brought to what is already there. The familiar becomes extraordinary through depth of seeing.",
    },
    {
      title: "When one partner experiences the other as not fully present during intimacy",
      body: "The experience of not being fully met — of being touched by someone who is somewhere else — is one of the most erotic-deflating experiences in intimate life. Gold's arrival practices address this directly.",
    },
    {
      title: "When couples want their intimate life to feel like a genuine art they are developing together",
      body: "For couples who approach other areas of their life with genuine aesthetic sensibility, Gold's framework gives them a way to bring that same quality of care and refinement to their intimate life.",
    },
  ],
  shadowToAvoid: [
    {
      title: "Aestheticism as emotional distance",
      body: "Beautiful attention can become a sophisticated form of emotional unavailability — a focus on quality of presence that maintains careful distance from genuine vulnerability.",
      beginnerReframe: "If your quality of attention feels beautiful but emotionally cool, bring one moment of genuine emotional truth into the encounter. Let the craft serve genuine contact.",
      advancedReframe: "Develop the capacity for craft and vulnerability simultaneously — the quality of attention that is simultaneously artful and completely unguarded.",
    },
    {
      title: "Perfectionism replacing genuine presence",
      body: "The pursuit of perfect quality can become its own form of absence — the attention diverted from genuine contact toward the evaluation of one's own performance.",
      beginnerReframe: "If you find yourself evaluating the quality of your attention during intimacy, that evaluation is the absence of the presence you're seeking. Release the evaluation.",
      advancedReframe: "Develop the capacity for effortless quality — the specific state in which craft is no longer something you do but something you are. This state is not achieved by trying harder.",
    },
  ],
  exercises: [
    {
      title: "The Five-Minute Discovery (10 minutes total)",
      setup: "One partner receives. The other gives complete creative attention.",
      steps: [
        "Choose one area of your partner's body — a hand, a shoulder, the back of the neck.",
        "Spend five minutes exploring this single area with genuine curiosity: every texture, temperature variation, shape, quality of give and resistance.",
        "Allow your exploration to be genuinely curious rather than technically executed — let what you discover guide where you go next.",
        "Never repeat the same gesture twice. Let each contact be genuinely new.",
        "Close with two minutes of still contact — hands resting on the explored area with complete, quiet presence.",
        "Switch.",
      ],
      integration: "Practice weekly with different areas of the body. After one year, you will know your partner's body with a quality of attention that most couples never achieve in a lifetime.",
      beginnerNote: "If you find yourself repeating habitual gestures, stop and genuinely ask: what haven't I done yet? What haven't I noticed?",
      advancedNote: "Extend the discovery practice to the entire body over a long, unhurried session. Three to four hours of genuine creative attention from arrival to completion.",
    },
    {
      title: "Erotic Haiku (15 minutes)",
      setup: "Both partners, no physical contact. A creative attention practice.",
      steps: [
        "Each partner takes five minutes to observe their partner — their face, their body, the quality of their presence in the room.",
        "Each writes five words about what they genuinely see — not compliments, not evaluation, but specific, true observation. ('The way light falls on your left shoulder. The quality of your breathing right now.')",
        "Read to each other without performance — simply offering what you saw.",
        "Sit in silence for two minutes with what was offered.",
        "Touch from that quality of genuine seeing.",
      ],
      integration: "This practice builds the specific capacity for genuine attention that all Gold's other work depends on.",
      beginnerNote: "The words don't need to be poetic. They need to be true and specific.",
      advancedNote: "Extend the observation period. Develop the capacity to observe your partner — in ordinary moments throughout the day — with the quality of attention you bring to something genuinely beautiful.",
    },
  ],
  reflectionPrompts: [
    "When did I last give my complete, undivided creative attention to my partner's body — genuinely curious, genuinely present? What made that possible?",
    "What habitual patterns do I bring to intimate encounters that prevent genuine arrival? What would I need to release to be truly present?",
    "What is the most beautiful quality in my partner's presence that I have stopped noticing? What would it take to see it again?",
    "What would our intimate life feel like if I brought the same quality of attention to it that I bring to the things I genuinely care about?",
    "What one quality of creative attention, developed consistently over a year, would most transform our intimate life?",
  ],
  relatedPaths: [
    { name: "Conscious Union", note: "The ceremony and recognition practices of conscious union share Gold's emphasis on genuine arrival and the quality of attention as the substance of sacred intimacy." },
    { name: "Slow Love", note: "Richardson's stillness and inner touch practices create the physiological conditions in which Gold's quality of creative attention becomes most available." },
    { name: "Tantric Wisdom", note: "The Tantric teaching on the body as living temple and devotion as spiritual practice are the philosophical foundation of Gold's erotic craft approach." },
  ],
  premiumBanner: "Access Gold's complete erotic artistry system: the full attention cultivation sequence, erotic generosity practices, the wabi-sabi approach to intimate life, and the specific tools for developing the quality of creative presence that transforms long-term intimacy from comfortable habit into living art.",
};
