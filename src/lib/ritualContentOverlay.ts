// Authored, distinct content for rituals referenced by the weather matrix.
// These overlays replace the boilerplate copy/steps that ship in the JSON
// data files so every Tonight Path / Library / Reconnect card shows
// unique, source-faithful guidance.
//
// Sources: Diana Richardson, Margot Anand, Mantak & Maneewan Chia, Charles
// & Caroline Muir, Osho, Daniel Odier, Sufi muraqabah practice, Authentic
// Relating canon. Steps are written for couples in a single shared session.

export type RitualContentOverlay = {
  subtitle: string;
  description: string;
  duration: string;
  intimacyLevel: string;
  primaryNeed: string;
  ritualSteps: string[];
};

export const RITUAL_CONTENT_OVERLAYS: Record<string, RitualContentOverlay> = {
  the_unsaid_voice: {
    subtitle: "Speak what has been held back",
    description:
      "A simple turn-taking practice for the things that quietly accumulate between you. Each partner gets uninterrupted space to voice what has not yet been said — without defense or repair from the listener.",
    duration: "15 minutes",
    intimacyLevel: "Tender",
    primaryNeed: "Truth and emotional safety",
    ritualSteps: [
      "Sit facing each other, knees almost touching, one candle between you.",
      "Partner A speaks for 5 minutes uninterrupted: 'What I have not said this week is…' Partner B only listens — no nodding to fix, no answering.",
      "Partner B then mirrors back one sentence: 'What I heard was…' Nothing more.",
      "Switch. Partner B now speaks for 5 minutes. Partner A listens, then mirrors one sentence back.",
      "Close in silence with foreheads touching for three breaths. No discussion tonight. Let it land.",
    ],
  },
  yes_no_exercise: {
    subtitle: "Rebuild consent and trust",
    description:
      "Drawn from authentic relating: a clean practice for re-learning that 'yes' and 'no' are both gifts. Especially useful after a small rupture or a season of unclear consent.",
    duration: "12 minutes",
    intimacyLevel: "Gentle",
    primaryNeed: "Safety and consent",
    ritualSteps: [
      "Partner A asks any small request: 'Can I hold your hand?' 'Can I sit closer?'",
      "Partner B answers only with a clear yes or a clear no — no explanation.",
      "If yes, Partner A receives. If no, Partner A says 'thank you for your no' and asks again differently.",
      "Continue for 5 minutes. Then switch roles for 5 minutes.",
      "Close: each names one thing they noticed about saying or hearing 'no'.",
    ],
  },
  witnessing_breath: {
    subtitle: "Be seen without being fixed",
    description:
      "A two-person practice in pure presence: one breathes, one witnesses. The witness offers no comfort, no advice, no touch — only attention. Often more healing than words.",
    duration: "10 minutes",
    intimacyLevel: "Gentle",
    primaryNeed: "Co-regulation",
    ritualSteps: [
      "Sit facing each other. Partner A closes their eyes and breathes naturally.",
      "Partner B watches — softly, without staring — for 4 minutes. No touching. No speaking.",
      "After 4 minutes, Partner B places one hand briefly on A's heart, then withdraws.",
      "Switch. Partner B closes their eyes for 4 minutes; Partner A witnesses.",
      "Open eyes together. No analysis. Each says one word for what they felt.",
    ],
  },
  melting_hug: {
    subtitle: "Nervous-system reset through long contact",
    description:
      "From Diana Richardson's body-of-love teaching: a 6-minute embrace held long enough for both nervous systems to drop, soften, and synchronise. The release happens around minute four.",
    duration: "8 minutes",
    intimacyLevel: "Tender",
    primaryNeed: "Co-regulation and homecoming",
    ritualSteps: [
      "Stand front to front, full-body contact, arms wrapped softly — not gripping.",
      "Let your weight settle into each other. Knees soft. Breath through the nose.",
      "Do not talk. Do not shift. Stay through the awkward minute (around minute two).",
      "Around minute four you will feel a sigh, a softening, sometimes tears. Do not pull away — this is the doorway.",
      "Stay another two minutes after the softening. Withdraw slowly, foreheads last to part.",
    ],
  },
  shakti_shaking: {
    subtitle: "Discharge the day from the body",
    description:
      "A 7-minute Osho-inspired shaking practice for two. You shake out the static of the day so that what comes next is not contaminated by it.",
    duration: "10 minutes",
    intimacyLevel: "Playful",
    primaryNeed: "Discharge and reset",
    ritualSteps: [
      "Stand with feet hip-width apart, knees soft, eyes closed or half-closed.",
      "Begin to bounce gently from the knees. Let the whole body shake — arms, jaw, belly.",
      "Allow sound: sigh, hum, even a low growl if it wants to come.",
      "Shake for 5 minutes. Do not pose, do not perform. Let it be ugly.",
      "Stop suddenly. Stand still 2 minutes, eyes closed, feeling the buzzing.",
      "Open eyes. Meet your partner's gaze. You are both arrived now.",
    ],
  },
  daily_homecoming_ritual: {
    subtitle: "Reunion at the doorway",
    description:
      "A 90-second ritual for the moment one of you walks through the door. Replaces the absent 'hi, how was your day' with something that actually lands.",
    duration: "5 minutes",
    intimacyLevel: "Gentle",
    primaryNeed: "Reunion",
    ritualSteps: [
      "When the second partner arrives home, both stop whatever you are doing.",
      "Meet at the doorway or in the hallway. No phones in hand.",
      "Hug for at least 20 seconds — long enough to feel the other's breath slow.",
      "Look in each other's eyes. One sentence each: 'I'm glad you're home.'",
      "Then, and only then, return to whatever the evening holds.",
    ],
  },
  appreciation_witness: {
    subtitle: "Three appreciations, fully received",
    description:
      "End the day by training the heart to register what was actually good. Three small, specific, true appreciations — and the discipline to receive them without deflection.",
    duration: "10 minutes",
    intimacyLevel: "Gentle to medium",
    primaryNeed: "Repair and reconnection",
    ritualSteps: [
      "Partner A: 'Three things I appreciate about you today are…' — name three small, specific, true things.",
      "Partner B receives. No 'oh it was nothing.' Just: 'I receive that. Thank you.'",
      "Partner A: 'One thing I'm grateful to have experienced today is…'",
      "Switch roles: Partner B now speaks, Partner A receives.",
      "Close with hands on each other's hearts for one minute of silence.",
    ],
  },
  synchronized_heart_breathing: {
    subtitle: "A soft landing before touch",
    description:
      "Heart-to-heart breathing for couples: you sync your breath rhythms until the two nervous systems begin to entrain. The simplest tantric practice and often the most effective.",
    duration: "8 minutes",
    intimacyLevel: "Gentle",
    primaryNeed: "Attunement",
    ritualSteps: [
      "Sit cross-legged facing each other, or in yab-yum if comfortable.",
      "Place your right palm on your partner's heart, and feel their right palm on yours.",
      "Close your eyes. Breathe naturally for 1 minute. Notice the difference in your rhythms.",
      "Slowly begin to match your partner's breath — inhale together, exhale together.",
      "Hold this synchrony for 5 minutes. If you drift, return without judgment.",
      "Open eyes for 1 minute of soft mutual gazing. End with one shared deep breath.",
    ],
  },
  soft_eye: {
    subtitle: "A love key — softening visual attention",
    description:
      "From the tantric tradition of seeing-without-grasping: you let the eyes go soft and peripheral so that you stop looking at your partner and start receiving them.",
    duration: "7 minutes",
    intimacyLevel: "Gentle",
    primaryNeed: "Presence",
    ritualSteps: [
      "Sit facing each other, an arm's length apart. Light low.",
      "Look at your partner, but instead of focusing sharply, let your eyes go wide and slightly out of focus.",
      "Notice you can see the whole room and your partner at once. The face becomes light, not feature.",
      "Hold the soft gaze for 5 minutes. Blink normally. If you sharpen, soften again.",
      "Close. One sentence each: 'When I let my eyes go soft, I saw…'",
    ],
  },
  spinal_rocking: {
    subtitle: "Back to back rhythm reset",
    description:
      "Sit spine to spine and rock gently. Within minutes the two spines find a shared rhythm. Excellent when one of you is wired and the other is tired.",
    duration: "8 minutes",
    intimacyLevel: "Gentle",
    primaryNeed: "Co-regulation",
    ritualSteps: [
      "Sit cross-legged on the floor, back to back, full spinal contact.",
      "Close your eyes. Feel where your spine touches your partner's.",
      "Begin to rock side to side, very slowly. No agreement on rhythm — let it find itself.",
      "Within 2 minutes you will start moving together without trying. Stay with that for 4 minutes.",
      "Slow to stillness. Sit back to back, breath only, for 1 minute.",
      "Turn to face each other. One sentence: 'Right now I feel…'",
    ],
  },
  yoga_of_touch: {
    subtitle: "Listening touch",
    description:
      "Daniel Odier's transmission from the yogini Lalita Devi: the hand does not massage. It listens. Slow enough that the receiver cannot quite track when movement begins or ends.",
    duration: "30 minutes",
    intimacyLevel: "Medium",
    primaryNeed: "Reverent presence",
    ritualSteps: [
      "Receiver lies down, lightly covered. Giver sits beside, hands on own heart for 2 minutes until palms feel awake.",
      "First contact: one palm on the lower belly, one at the top of the chest. Hold for several breaths. No movement.",
      "Begin to move one hand, incredibly slowly. So slow the receiver cannot quite tell when motion starts.",
      "The hand listens. It pauses wherever the body seems to call it. No technique, only attention.",
      "If emotion arises, do not rush to comfort. Stay. Breath steady. Contact unbroken.",
      "Withdraw the hands even more slowly than they arrived. Sit in silence until the receiver opens their eyes.",
    ],
  },
  soul_gazing: {
    subtitle: "Eye-to-eye recognition",
    description:
      "Sustained mutual gazing into the left eye — long enough to pass through the awkwardness, the urge to laugh, and into recognition.",
    duration: "10 minutes",
    intimacyLevel: "Tender to medium",
    primaryNeed: "Recognition",
    ritualSteps: [
      "Sit facing each other, knees touching. Soft light. No music.",
      "Choose: both look into the left eye of your partner. Hold a soft, kind gaze.",
      "Blink as needed. Breathe naturally. Do not perform — do not soften features artificially.",
      "Around minute three the awkwardness peaks. Do not look away. Stay.",
      "Around minute six, something shifts. The face becomes unfamiliar, then very familiar. Stay with it.",
      "Close eyes together. Foreheads touch. Three shared breaths. No words for one minute after.",
    ],
  },
  space_between_breaths: {
    subtitle: "The pause as portal",
    description:
      "A breath practice that places attention not on the inhale or exhale, but on the small still pauses between them. The pause is where presence lives.",
    duration: "10 minutes",
    intimacyLevel: "Gentle",
    primaryNeed: "Stillness inside charge",
    ritualSteps: [
      "Sit facing each other, hands resting on your own knees. Eyes soft or closed.",
      "Breathe naturally. After each exhale, notice the small empty pause before the next inhale.",
      "Do not lengthen the pause. Just notice it. Rest your attention there.",
      "Continue for 7 minutes. The body will slow itself.",
      "Open eyes. Meet your partner's gaze for one minute without speaking.",
      "Close: 'In the pause I felt…' — one word each.",
    ],
  },
  karezza: {
    subtitle: "Union without discharge",
    description:
      "Drawn from Stockham, Chia, and Diana Richardson: long, still, low-arousal union without orgasm as the goal. Energy circulates instead of discharging.",
    duration: "45 minutes or longer",
    intimacyLevel: "Sacred union",
    primaryNeed: "Sustained intimacy",
    ritualSteps: [
      "Begin with 10 minutes of melting hug or synchronized breathing — no rush to genitals.",
      "Move to gentle, clothed-or-not full body contact. The masculine remains soft on entering, if entering at all.",
      "Stay still inside or alongside each other. Breathe deeply through the nose. No thrusting, no climbing.",
      "If arousal climbs sharply, slow further or stop moving entirely. Let the wave settle.",
      "Continue for 30+ minutes. Eyes meet often. Let the energy spread upward through the body.",
      "Close lying side by side, one hand on each other's heart, for 5 minutes of stillness.",
    ],
  },
  slow_sex: {
    subtitle: "Diana Richardson's core practice",
    description:
      "Cool, slow, present lovemaking with no goal of climax. Slowness itself becomes the doorway into a different kind of charge — bright, quiet, expansive.",
    duration: "60 minutes",
    intimacyLevel: "Sacred union",
    primaryNeed: "Devotional union",
    ritualSteps: [
      "Begin in stillness — lie facing each other, fully present, for 5 minutes before any touch.",
      "Touch slowly, with no destination. Notice when the mind tries to skip ahead — return to this hand, this breath.",
      "Enter, if you enter, in stillness. The body is cool, not heated. The masculine does not need to be hard to be present.",
      "Move only when movement is inevitable. Pause often. Each pause is the practice.",
      "Stay together for 30+ minutes in this slow way. Eyes meet. Breath softens.",
      "End in long stillness, still joined or simply held. The afterglow is the practice too.",
    ],
  },
  conscious_lovemaking: {
    subtitle: "Lovemaking as meditation",
    description:
      "Margot Anand's SkyDancing approach: lovemaking as a moving meditation, with breath, sound, and eye contact deliberately woven through.",
    duration: "60 minutes",
    intimacyLevel: "Sacred union",
    primaryNeed: "Devotional presence",
    ritualSteps: [
      "Begin with 10 minutes of synchronized breathing in yab-yum or face to face.",
      "Move into touch slowly. Each new touch begins with a breath. Each ending of touch ends with a breath.",
      "Eyes meet often. When the eyes meet, slow the body. Let the gaze be the deeper penetration.",
      "Allow sound — sighs, hums, soft tones. Sound circulates the energy.",
      "If climax happens, let it. If it doesn't, that is also full. Both are sacred.",
      "Close with 10 minutes of held stillness, breath syncing back to one rhythm.",
    ],
  },
  yab_yum_embrace: {
    subtitle: "The sacred union posture",
    description:
      "The classical tantric seat: one partner sits cross-legged, the other in their lap, hearts and crowns aligned. The geometry of the body itself becomes the practice.",
    duration: "20 minutes",
    intimacyLevel: "Sacred union",
    primaryNeed: "Devotional union",
    ritualSteps: [
      "Receiver sits cross-legged, spine tall. Other partner sits in their lap, legs wrapped around the first's waist.",
      "Hearts press together. Crowns gently touching. Arms around each other.",
      "Breathe — partner A inhales while partner B exhales, then switch. Circular breath.",
      "Continue circular breathing for 10 minutes. Energy begins to loop between you.",
      "Pause. Stay still in the embrace, foreheads touching, for 5 minutes.",
      "Separate slowly. Sit knee to knee. One sentence each on what you felt.",
    ],
  },
  circular_breath_of_love: {
    subtitle: "A shared energy loop",
    description:
      "The classic tantric circular breath: as one inhales, the other exhales, creating an infinity loop of breath between two bodies. Especially powerful in yab-yum or face to face.",
    duration: "15 minutes",
    intimacyLevel: "Tender to medium",
    primaryNeed: "Energetic union",
    ritualSteps: [
      "Sit close, face to face, foreheads or noses nearly touching.",
      "Begin in normal breath. Notice each other's rhythm.",
      "Now offset: as Partner A inhales, Partner B exhales. As B inhales, A exhales.",
      "Imagine the breath travelling in a loop — out of your mouth into your partner's, and back.",
      "Continue 10 minutes. The loop becomes felt, not imagined.",
      "Close in normal synchronized breath, then one shared deep breath, then silence.",
    ],
  },
  microcosmic_orbit_dual: {
    subtitle: "Shared orbit alchemy",
    description:
      "Mantak Chia's microcosmic orbit, practiced as a couple: the energy travels up the back, down the front, but now also crosses between two bodies through the contact points.",
    duration: "20 minutes",
    intimacyLevel: "Medium",
    primaryNeed: "Energetic cultivation",
    ritualSteps: [
      "Sit in yab-yum or facing, hands clasped, foreheads touching.",
      "Each of you, separately: bring attention to the perineum. Breathe in, draw energy up the spine to the crown.",
      "Breathe out, let energy flow down the front of the body — face, throat, heart, belly, back to the perineum.",
      "Once you have your own orbit going (5 minutes), imagine your orbit linking through your partner at the heart and crown.",
      "Continue together for 10 minutes. The orbit becomes a figure-eight between you.",
      "Close: rest forehead to forehead, hands on each other's hearts, for 3 minutes.",
    ],
  },
  chakra_breathing_for_two: {
    subtitle: "A 7-chakra shared breath arc",
    description:
      "Move shared breath up the chakra column from root to crown, one chakra per minute, with hands placed at each centre. Activates the full energetic channel.",
    duration: "20 minutes",
    intimacyLevel: "Medium",
    primaryNeed: "Full channel activation",
    ritualSteps: [
      "Sit facing each other. Begin with 2 minutes of synchronized heart breathing.",
      "Place both your hands lightly on your partner's root area (lower belly). Two minutes of shared breath here.",
      "Move hands to sacral centre (just below navel) — 2 minutes. Then solar plexus — 2 minutes.",
      "Heart — 3 minutes (linger here, palms over each other's hearts). Then throat — 2 minutes.",
      "Third eye — fingertips touching the centre of the brow, 2 minutes. Crown — palms hovering above the head, 2 minutes.",
      "Bring hands back down to hearts. Sit in stillness, eyes closed, for 3 minutes. Open and meet eyes.",
    ],
  },
  riding_the_wave_of_bliss: {
    subtitle: "Ride and extend shared bliss",
    description:
      "When the energy rises in lovemaking, the impulse is to discharge. This practice teaches you to ride the wave instead — letting it crest and recede many times, expanding the field.",
    duration: "45 minutes",
    intimacyLevel: "Sacred union",
    primaryNeed: "Sustained ecstatic union",
    ritualSteps: [
      "Begin slowly, fully present, with breath and gaze. No goal.",
      "When arousal rises, do not push toward climax. Slow down, stop moving, breathe deeply through the nose.",
      "As the wave recedes, energy moves upward through the body. Feel the heart, the throat, the crown.",
      "Begin again, slower than before. Let another wave rise. Slow again at the peak.",
      "Each cycle expands the field. Eyes meet at every peak. Sound is welcome — long sighs, soft tones.",
      "Close in long stillness, joined or held, for 10 minutes. Let the bliss redistribute through the whole body.",
    ],
  },
  blissful_stillness_after_love: {
    subtitle: "The afterglow as the practice",
    description:
      "Diana Richardson teaches that what happens after lovemaking is at least half the practice. Long stillness while still joined or held lets the energy settle into every cell.",
    duration: "20 minutes",
    intimacyLevel: "Sacred union",
    primaryNeed: "Integration",
    ritualSteps: [
      "After lovemaking, do not move apart. Stay joined, or hold each other heart to heart.",
      "Breathe slowly. Eyes may be closed or softly open.",
      "Do not talk. Do not reach for phone, water, blanket — for at least 15 minutes.",
      "Notice the energy redistributing through your body. Tingling, warmth, deep softness.",
      "If tears come, let them. If laughter comes, let that.",
      "After 15 minutes, one of you may speak first — softly. Or stay in silence.",
    ],
  },
  valley_orgasm_resting: {
    subtitle: "Resting in the valley",
    description:
      "From Tao sexual practice: instead of climbing to a sharp peak orgasm, you rest in the valley — a long, soft, full-body wave that doesn't crest. The valley is wider than the peak.",
    duration: "30 minutes",
    intimacyLevel: "Sacred union",
    primaryNeed: "Sustained union",
    ritualSteps: [
      "Begin in stillness, joined slowly, breathing together for 5 minutes before any movement.",
      "Move very gently. The masculine stays soft enough to remain present, not hard enough to climb.",
      "When sensation rises, soften further. Breathe more deeply. Let the wave widen instead of peaking.",
      "Stay in this gentle rocking, breathing valley for 20+ minutes. The whole body becomes orgasmic without climax.",
      "Close in long stillness, still joined, for 5+ minutes.",
    ],
  },
  three_fires: {
    subtitle: "Tan tien activation — belly, kidneys, heart",
    description:
      "From Taoist inner alchemy: activate the three furnaces of the body — lower belly, kidneys, and heart — through breath and shared touch. Builds vitality you can offer each other.",
    duration: "20 minutes",
    intimacyLevel: "Medium",
    primaryNeed: "Vitality cultivation",
    ritualSteps: [
      "Sit cross-legged facing each other. Place both your palms on your partner's lower belly.",
      "Both breathe deeply into the belly under each other's hands. 5 minutes. Imagine warmth gathering there.",
      "Move hands behind your partner to the kidneys (lower back). Breathe deeply. 5 minutes. Warmth gathers there too.",
      "Move hands to your partner's heart centre. Breathe. 5 minutes. The heart fire kindles.",
      "Bring hands back to hearts. Sit in stillness for 3 minutes, feeling the three fires lit.",
      "Open eyes. Meet gaze. One sentence: 'I feel my fire as…'",
    ],
  },
  inner_flute: {
    subtitle: "The central channel as sound",
    description:
      "Tantric practice of imagining the central channel (sushumna) as a hollow flute through which breath and tone rise from root to crown. Practiced as a duet, the two flutes resonate.",
    duration: "15 minutes",
    intimacyLevel: "Medium",
    primaryNeed: "Energetic resonance",
    ritualSteps: [
      "Sit facing each other, spines tall, eyes closed.",
      "Breathe down into the root. Then breathe up — imagining the breath rising through a hollow channel from root to crown.",
      "Add sound on the exhale: a low 'aaaah' rising in pitch as it travels up the channel.",
      "Continue for 10 minutes. Let your tones meet, blend, separate, meet again.",
      "Stop. Sit in the silence after sound for 3 minutes. The body still vibrates.",
      "Open eyes. Meet gaze. One shared deep breath to close.",
    ],
  },
  big_draw: {
    subtitle: "Drawing the energy upward",
    description:
      "Mantak Chia's classic: at the edge of orgasm, instead of releasing outward, you draw the energy upward through the body with breath, perineum lock, and eye lift.",
    duration: "20 minutes",
    intimacyLevel: "Medium to high",
    primaryNeed: "Energetic cultivation",
    ritualSteps: [
      "Begin in slow union or self-stimulation alongside each other. Build arousal slowly to about 80%.",
      "At the edge: stop all movement. Inhale deeply through the nose.",
      "Squeeze the perineum (PC muscle), clench fists and jaw, and roll the eyes up toward the third eye.",
      "Hold the breath and squeeze for 5–10 seconds, drawing the energy up the spine toward the crown.",
      "Release with a soft exhale. Feel the energy redistribute upward, not outward.",
      "Repeat 3–5 times across the session. Close in long stillness.",
    ],
  },
  fire_water_dual_cultivation: {
    subtitle: "Heart fire meets kidney water",
    description:
      "Taoist alchemy practiced as a couple: the heart's fire descends, the kidneys' water ascends, and the two meet in the lower belly. Performed with palms on each other's hearts and lower backs.",
    duration: "20 minutes",
    intimacyLevel: "Medium",
    primaryNeed: "Energetic balance",
    ritualSteps: [
      "Sit facing. Partner A places palm on Partner B's heart. Partner B places palm on Partner A's lower back (kidneys).",
      "Switch hands so each of you has one hand on the other's heart and one on the other's kidneys.",
      "Both inhale — imagine fire descending from the heart down to the lower belly. Exhale — imagine water rising from the kidneys up to meet it.",
      "Continue this circulation for 12 minutes. The two energies meet and steam in the lower tan tien.",
      "Hands rest, eyes close, for 3 minutes of integration.",
      "Open eyes. Meet gaze. One word for what you feel.",
    ],
  },
  inner_smile_with_partner: {
    subtitle: "Gentle organ-smile meditation",
    description:
      "Mantak Chia's inner smile, practiced as a duet. You smile inward to your own organs, then offer that smile across to your partner's heart, belly, and face.",
    duration: "12 minutes",
    intimacyLevel: "Gentle",
    primaryNeed: "Warmth and goodwill",
    ritualSteps: [
      "Sit comfortably facing each other. Eyes softly closed.",
      "Smile gently — not for show, just enough that the corners of your mouth lift.",
      "Direct that smile inward — to your heart, your belly, your kidneys. Each organ receives the smile for one minute.",
      "Open your eyes. Direct the smile across to your partner's heart, then their belly, then their face. One minute each.",
      "Both close eyes again. Receive the smile sent to you. Notice how the body softens.",
      "Open eyes together. Smile, simply, at each other.",
    ],
  },
  one_heart_gazing: {
    subtitle: "Shakti and Shakta — elevated eye practice",
    description:
      "An advanced gazing practice: instead of looking into your partner's eyes, you both look slightly above and between — into the field of presence the two of you generate together.",
    duration: "12 minutes",
    intimacyLevel: "Tender to medium",
    primaryNeed: "Shared field",
    ritualSteps: [
      "Sit facing each other in yab-yum or cross-legged, spines tall.",
      "Begin with 2 minutes of soft mutual gazing.",
      "Now both lift your gaze slightly — to the space just above and between your two heads. Not at each other, with each other.",
      "Hold this shared gaze for 8 minutes. The 'one heart' is the field that appears in that space.",
      "Slowly bring eyes back down to meet each other. Recognise: that field is what you are.",
      "Close: foreheads touch, three shared breaths.",
    ],
  },
  heart_salutation: {
    subtitle: "A ritual opening",
    description:
      "From the Skydancing tradition: a short, formal salutation to begin any practice together. Marks the threshold from ordinary time into shared sacred time.",
    duration: "5 minutes",
    intimacyLevel: "Gentle",
    primaryNeed: "Sacred opening",
    ritualSteps: [
      "Stand facing each other, an arm's length apart. Eyes meet softly.",
      "Place hands together at your own heart. Bow slightly to your partner.",
      "Step forward. Bring your right hand to your partner's heart. Receive their right hand on yours.",
      "Hold for three slow shared breaths. Eyes meet.",
      "Step back. Hands return to your own heart. Bow once more.",
      "Now you are ready to begin whatever you have come for.",
    ],
  },
  skydancing_tantric_massage: {
    subtitle: "Full-body devotional worship",
    description:
      "Margot Anand's full SkyDancing massage: a long, slow, intentional honoring of the partner's whole body as temple. Not a sensual massage — a devotional one.",
    duration: "60–90 minutes",
    intimacyLevel: "Sacred union",
    primaryNeed: "Devotional worship",
    ritualSteps: [
      "Prepare the room: warm, clean, candles, fresh linen, warmed oil. Phones off.",
      "Greet each other with the Heart Salutation. Sit in Namaste, share two sentences of intention.",
      "The receiver lies face down. The giver begins at the feet — slow, full-handed strokes up the legs, back, arms.",
      "Turn the receiver. Continue: belly, chest, shoulders, face. Each stroke is offered as a prayer.",
      "Linger at the heart. End with hands resting, one on the heart, one on the lower belly, in stillness.",
      "Receiver stays still for 10 minutes after. The giver sits beside, witnessing. No words tonight.",
    ],
  },
  chaotic_breathing: {
    subtitle: "Dynamic stage one — discharge",
    description:
      "The first stage of Osho's Dynamic Meditation, adapted for couples: 5 minutes of fast, chaotic breathing through the nose to discharge accumulated charge before contact.",
    duration: "10 minutes",
    intimacyLevel: "Intense",
    primaryNeed: "Discharge",
    ritualSteps: [
      "Stand an arm's length apart, eyes closed. No music or upbeat percussion.",
      "Breathe fast, chaotically, through the nose. Let the chest and belly heave. No rhythm.",
      "Continue for 5 minutes. The body wants to give up — keep going. Let arms move, jaw move, sound come.",
      "Stop suddenly. Stand still 2 minutes, eyes closed, feeling the buzzing aliveness.",
      "Open eyes. Meet your partner. You are now both arrived in the body.",
      "From here you may move into touch, gaze, or stillness — whatever the energy now wants.",
    ],
  },
  gibberish_release: {
    subtitle: "Speak the unspeakable in nonsense",
    description:
      "An Osho-derived practice: speak nonsense for 5 minutes. Not words — sounds, gibberish, made-up language. Releases what the rational mind has been holding in.",
    duration: "10 minutes",
    intimacyLevel: "Playful to intense",
    primaryNeed: "Discharge of mental static",
    ritualSteps: [
      "Stand or sit facing each other, an arm's length apart.",
      "Both begin to speak gibberish — total nonsense. Sounds, fake words, baby talk, gibberish.",
      "Let it get loud, soft, angry, sad, ridiculous. No real words allowed.",
      "Continue for 5 minutes. Eye contact welcome but not required.",
      "Stop. Stand still in silence for 2 minutes.",
      "One real sentence each: 'After the gibberish I notice…'",
    ],
  },
  parts_work_dialogue: {
    subtitle: "Speak from the part, not the whole",
    description:
      "From Internal Family Systems and authentic relating: instead of 'I am angry,' you say 'a part of me is angry.' Lets the partner hear the part without taking the whole self as enemy.",
    duration: "15 minutes",
    intimacyLevel: "Tender",
    primaryNeed: "Truth without rupture",
    ritualSteps: [
      "Sit facing each other. One candle between you.",
      "Partner A: 'A part of me feels…' Name one charged feeling. Speak only from that part.",
      "Partner B: 'I hear that a part of you feels…' Mirror. Do not defend. Do not fix.",
      "Partner A: 'And what that part needs is…' Name one need.",
      "Switch. Partner B speaks from a part. Partner A mirrors.",
      "Close: hands meet, three shared breaths. The parts have been heard. That is enough tonight.",
    ],
  },
  muraqabah: {
    subtitle: "Sufi watchful presence",
    description:
      "From the Sufi contemplative tradition: muraqabah is the practice of watchful presence with the heart of the beloved. You sit, you watch, you stay — without intervening.",
    duration: "15 minutes",
    intimacyLevel: "Gentle",
    primaryNeed: "Witness without fixing",
    ritualSteps: [
      "Sit facing each other, knees almost touching. Right hand resting over your own heart.",
      "Close your eyes. Bring your attention to your own heart for 3 minutes.",
      "Open your eyes. Place attention on your partner's heart space — not on their eyes, not on their face.",
      "Stay there for 8 minutes. If thoughts come, return. Do not analyse, do not project — only watch the heart.",
      "Close eyes together for 2 minutes of silence.",
      "Open. Meet eyes. One sentence: 'Watching your heart, I felt…'",
    ],
  },
};

export const getRitualOverlay = (id: string): RitualContentOverlay | null =>
  RITUAL_CONTENT_OVERLAYS[id] ?? null;
