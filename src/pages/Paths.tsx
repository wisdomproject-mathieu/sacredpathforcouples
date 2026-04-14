import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Crown,
  Flame,
  Heart,
  Lock,
  LockOpen,
  Shield,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSeoMetadata } from "@/lib/seo";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { getEffectiveMembershipTier, isPremiumTier } from "@/lib/Premium";
import { PATH_LONGFORM_BY_SLUG } from "@/lib/libraryLongform";

type Tier = "free" | "premium";

type Pillar = {
  id?: string;
  label?: string;
  title?: string;
  name?: string;
  body: string;
};

type SacredInvitation = {
  title: string;
  body: string;
  resonances: string[];
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
  whatItIsNot?: string[];
  sacredInvitation?: SacredInvitation;
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

type PathLocalizationOverrides = Partial<Omit<PathDetail, "content">> & {
  content?: Partial<PathContent>;
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
    icon: Heart,
    iconClass: "text-rose-300",
  },
  {
    to: "/app/reconnect",
    labelKey: "pageReconnect",
    subtitleKey: "pageReconnectSubtitle",
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
      sacredInvitation: {
        title: "Who This Path Calls",
        body: "This path calls to couples who sense that something more is possible — not just more pleasure or more frequency, but a different quality of contact altogether. Couples who have noticed that even in their most intimate moments, something in them is watching, waiting, slightly elsewhere. Couples who want the body to be a doorway rather than a destination, and who are willing to slow down, breathe, and learn to inhabit each moment of love with full awareness.",
        resonances: [
          "You want depth more than technique.",
          "You sense that your lovemaking has more silence, more reverence, and more aliveness available than you have yet discovered.",
          "You are drawn to the idea that spiritual practice and erotic life belong together.",
          "You want both partners to feel genuinely seen — not merely desired.",
          "You are willing to be changed by intimacy, not just satisfied by it.",
        ],
      },
      pillars: [
        {
          id: "shiva_shakti",
          label: "SHIVA & SHAKTI",
          title: "Sacred Polarity",
          body: "At the heart of Tantra is the recognition that existence itself is a dance between two principles: pure witnessing consciousness (Shiva) and living creative energy (Shakti). In your relationship, these poles are alive and present in every moment of genuine contact. One partner holds space; the other fills it. One is still; the other moves. The quality of your intimacy depends on how consciously you inhabit and honor these complementary currents — not as fixed roles, but as a living exchange that flows and changes between you.",
        },
        {
          id: "prana",
          label: "PRĀṆA",
          title: "Breath as Bridge",
          body: "In Tantric physiology, breath is not merely oxygenation. It is the vehicle of prana — the animating life force that flows through the subtle body. Conscious breathing during intimacy transforms the quality of contact: it regulates the nervous system, opens the body to deeper sensation, and carries awareness into the areas where holding and protection have accumulated over time. In partner breathing practices, it creates a shared rhythm that synchronizes the subtle bodies before the physical bodies even touch. Learning to breathe together is among the most intimate things two people can do.",
        },
        {
          id: "deha",
          label: "DEHA",
          title: "Body as Temple",
          body: "Tantra was the first tradition to fully consecrate the physical body — to insist, against prevailing spiritual currents of its time, that the body is not an obstacle to the sacred but its most immediate home. The Tantric body is not a machine of sensation. It is a living temple of intelligence, memory, and divine energy. Every part of it is worthy of reverence. In relationship, this means learning to approach your partner's body — and your own — with the quality of attention you would bring to a sacred space: unhurried, genuinely curious, and full of gratitude.",
        },
        {
          id: "bhakti",
          label: "BHAKTI",
          title: "Devotion",
          body: "Bhakti is the yogic path of love as spiritual practice — the recognition that devotion is not a sentiment but a discipline. In Tantric relationship, bhakti transforms how partners meet: not as two individuals negotiating needs and differences, but as two expressions of divine consciousness recognizing each other. This does not require religious belief. It requires the willingness to look at your partner as if for the first time, to see past the familiar image to the aliveness beneath it — and to let that aliveness actually land in the body. That landing is devotion.",
        },
        {
          id: "spanda",
          label: "SPANDA",
          title: "The Divine Pulse",
          body: "Spanda — the vibrant, pulsing aliveness that Kashmir Shaivism recognizes as the fundamental nature of reality — is not something to be created in intimacy. It is something to be recognized. It is already present in the trembling of genuine excitement, in the pause between exhale and inhale, in the moment when two bodies first touch with full awareness. Tantric practice teaches couples to recognize Spanda and stay with it rather than immediately redirecting it. Learning to simply be with the living pulse of energy — rather than managing, performing, or chasing it — is one of the deepest skills in intimate life.",
        },
        {
          id: "samadhi",
          label: "SAMĀDHI",
          title: "Union",
          body: "In classical yoga, samadhi is the dissolution of the boundary between the observer and the observed — a state of non-dual awareness in which the separate self temporarily ceases. Tantra locates this possibility within the erotic body. At the depth of genuine conscious lovemaking, something occurs beyond pleasure: the boundary between two selves becomes permeable, and for a moment, the couple is not two people experiencing each other but one field of awareness experiencing itself. This state cannot be forced. It arises when everything else — presence, breath, polarity, devotion, pulse — is fully and honestly inhabited.",
        },
        {
          id: "samskara",
          label: "SAṂSKĀRA",
          title: "Completion Ritual",
          body: "In Tantric practice, how a couple closes an intimate encounter is as important as how they enter it. Samskara — the impressions left on consciousness by lived experience — determines how intimacy accumulates over time. Couples who close their encounters with care: a moment of held stillness, a gentle breath together, whispered truth, or silent gratitude, create a different quality of shared history than those who immediately return to ordinary distraction. The closing ritual is where the experience is fully received and allowed to settle into the body and the relationship as a genuine resource.",
        },
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
    name: "Taoist Alchemy",
    tier: "free",
    oneLine: "Taoist sexual medicine translated into sustainable vitality and deep intimacy for modern couples.",
    overviewLine: "For couples who want their intimate life to leave them more alive, more in love, and more energized — not less.",
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
      sacredInvitation: {
        title: "Who This Path Calls",
        body: "This path calls to couples who have noticed that conventional lovemaking often leaves a subtle depletion in its wake — a flatness after the peak, a quiet withdrawal from each other in the hours that follow. Couples who are curious about the body's deeper intelligence. Who want their erotic life to contribute to their health and vitality rather than drawing from it. Who sense that pleasure and energy need not be opposites.",
        resonances: [
          "You want your intimate life to leave you feeling more energized, not less.",
          "You are curious about the body's subtle energetic architecture.",
          "You want a practice that can deepen over decades rather than depend on novelty.",
          "You are drawn to ancient science applied with practical precision.",
          "You want both partners to benefit equally from the energy between you.",
        ],
      },
      pillars: [
        {
          id: "jing",
          label: "JĪNG",
          title: "Vital Essence",
          body: "Jing is the most fundamental form of life force in Taoist physiology — the concentrated essence stored in the kidneys that governs vitality, sexual function, and longevity. Sexual energy is jing in its most potent, accessible form. Conventional lovemaking spends it. The Taoist path begins with the simple recognition that jing can be cultivated, conserved, and redirected through the body rather than discharged — and that this redirection is not deprivation but expansion: more sensation, more aliveness, more connection, sustained over time.",
        },
        {
          id: "chi",
          label: "CHI",
          title: "Life Current",
          body: "Chi is the animating current that flows through the body's meridian system — the same energy acupuncture works with, the same force that martial artists cultivate in chi kung. In lovemaking, chi determines the quality of energetic contact between partners: whether touch feels alive or mechanical, whether presence feels mutual or absent. Learning to feel chi in your own body, and then to feel the current between your body and your partner's, transforms the experience of physical intimacy from sensation alone into something that can genuinely be called energy exchange.",
        },
        {
          id: "shen",
          label: "SHÉN",
          title: "Spirit & Luminosity",
          body: "The third Taoist treasure, shen governs consciousness, emotional radiance, and the quality of genuine presence. In intimate life, shen is what you feel when a partner is truly with you rather than merely physically close — the lit-quality in the eyes, the attention that feels complete. Taoist sexual cultivation aims ultimately at shen: the refinement of sexual and vital energy all the way up through the heart and mind, until lovemaking becomes an act of full spiritual presence, and physical union opens into conscious union.",
        },
        {
          id: "microcosmic_orbit",
          label: "MICROCOSMIC ORBIT",
          title: "Shared Energy Circulation",
          body: "The Microcosmic Orbit is the foundational Taoist internal practice: the conscious circulation of chi up the spine, over the crown, and down through the front of the body in a continuous loop. As a solo practice, it integrates and vitalizes the entire energy system. As a couples practice, it becomes something extraordinary: two bodies learning to share and circulate their combined energy field through synchronized breath, attention, and touch — creating a circuit of vitality that belongs to neither partner alone but to the living relationship between them.",
        },
        {
          id: "yin_yang",
          label: "YĪN YÁNG",
          title: "Complementary Energies",
          body: "In Taoist cosmology, yin and yang are not opposites in conflict but complementary principles in dynamic balance. In relationship, they describe the specific energetic qualities each partner brings: the receptive, cooling, lunar quality of yin; the active, warming, solar quality of yang. Healthy Taoist lovemaking honors both qualities in both partners — recognizing that genuine intimacy requires not the dominance of one force but the fluid, conscious exchange of both, with each partner capable of inhabiting either pole as the moment requires.",
        },
        {
          id: "valley_orgasm",
          label: "VALLEY ORGASM",
          title: "Expanded Pleasure",
          body: "The Taoist teaching on orgasm is its most radical and practical gift to modern couples: the distinction between peak orgasm, which discharges energy, and valley orgasm, which expands and circulates it. Valley orgasm is not the absence of pleasure — it is pleasure sustained and deepened over time, without the arc of tension and release that leaves both partners depleted. Couples who learn to ride the valley together discover a dimension of erotic experience that is not available through conventional lovemaking: waves of full-body sensation that build without cresting, deepening the connection between partners rather than temporarily resolving it.",
        },
        {
          id: "healing_love",
          label: "HEALING LOVE",
          title: "Lovemaking as Medicine",
          body: "The ancient Taoist physicians were among the first to document what modern endocrinology confirms: that conscious, loving sexual practice has measurable effects on hormonal balance, immune function, and longevity. The Healing Love practices of Mantak Chia systematize this ancient medical wisdom for modern couples: specific techniques for circulating sexual energy through the body's organ systems, transforming lovemaking from a recreational act into a genuine health practice that both partners can benefit from over the course of a lifetime.",
        },
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
    name: "The Embodied Heart",
    tier: "premium",
    oneLine: "Where the nervous system meets the sacred through somatic truth, emotional courage, and body-led love.",
    overviewLine: "Premium path for couples who know safety and honesty are the doorway to lasting desire.",
    icon: Heart,
    iconClass: "text-orange-300",
    teaser: [
      "Build real co-regulation and emotional honesty before pushing intensity.",
      "Use body-led disclosure and repair rituals that restore trust and attraction together.",
      "Premium includes guided somatic practices and repair pathways for modern couples.",
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
    name: "Slow Love",
    tier: "premium",
    oneLine: "What arrives when you finally stop rushing: stillness, internal awareness, and unhurried contact.",
    overviewLine: "Premium path for couples who want deeper intimacy through relaxation instead of performance.",
    icon: Sparkles,
    iconClass: "text-fuchsia-300",
    teaser: [
      "Learn non-goal lovemaking, inner touch, and pressure-free erotic pacing.",
      "Replace urgency and performance loops with steady embodied presence.",
      "Premium includes Slow Love sequences and daily integration practices.",
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
    name: "Conscious Union",
    tier: "premium",
    oneLine: "Two people genuinely meeting through presence, ceremony, and conscious recognition.",
    overviewLine: "Premium path for couples ready to make the whole relationship a daily sacred practice.",
    icon: Crown,
    iconClass: "text-indigo-300",
    teaser: [
      "Bring ritual quality and deliberate intention into ordinary daily moments together.",
      "Practice recognition, truth, and shared silence as living relational disciplines.",
      "Premium includes ceremony frameworks and conscious union practice maps.",
    ],
  },
  {
    slug: "semen-retention",
    name: "Semen Retention",
    tier: "premium",
    oneLine: "Last longer, feel deeper, and channel your energy into the love she actually wants from you.",
    overviewLine: "Premium path for men who want to stop losing energy after sex and start building real magnetic presence.",
    icon: Shield,
    iconClass: "text-sky-300",
    teaser: [
      "Learn valley orgasm techniques that replace 10-second peaks with 30-minute full-body waves of pleasure — for both of you.",
      "Stop the post-sex crash. Retain your vitality, clarity, and desire to be close to her the morning after.",
      "Premium includes progressive retention drills, couple integration sequences, and the science behind why this transforms relationships.",
    ],
  },
];

const localizedPathOverrides: Partial<Record<Exclude<Language, "en">, Record<string, PathLocalizationOverrides>>> = {
  fr: {
    tantra: {
      name: "Sagesse tantrique",
      oneLine: "Une voie ancienne traduite pour les couples modernes à travers souffle, présence, polarité et dévotion.",
      overviewLine: "Pour les couples qui veulent une intimité consciente ce soir et une croissance spirituelle durable.",
      content: {
        hero: [
          "Le Tantra historique est une voie spirituelle qui inclut pleinement le corps: souffle, attention, rituel, mantra et présence.",
          "Pour un couple moderne, la traduction est simple: ne pas séparer désir, conscience et lien émotionnel.",
          "Le rythme tantrique aide à réguler d'abord, s'ouvrir ensuite, puis intensifier seulement quand les deux corps sont prêts.",
          "On passe d'une logique de performance à une pratique répétable où eros, tendresse, vérité et révérence grandissent ensemble.",
        ],
        whyMatters: [
          "Offre un cadre concret pour approfondir l'érotisme sans sacrifier la sécurité émotionnelle.",
          "Aide quand un partenaire veut plus d'intensité et l'autre a besoin d'ancrage.",
          "Transforme le souffle en outil de co-régulation avant les conversations sensibles.",
          "Redonne de la qualité relationnelle aux couples efficaces mais émotionnellement asséchés.",
          "Crée des rituels reproductibles pour ne plus dépendre d'un « moment parfait ». ",
        ],
        whoItsFor: [
          {
            title: "Couples loyaux avec une charge érotique en baisse",
            body: "Réactiver le désir sans pression grâce au rythme et au consentement explicite.",
          },
          {
            title: "Couples pris dans des boucles de stress",
            body: "Réapprendre l'arrivée dans le corps avant le toucher.",
          },
          {
            title: "Couples en reconstruction de confiance",
            body: "Poser des repères clairs de sécurité, de langage et de progression.",
          },
          {
            title: "Couples attirés par une intimité sacrée",
            body: "Ancrer une pratique hebdomadaire qui relie amour et profondeur spirituelle.",
          },
        ],
        practicePreview: {
          title: "Séquence d'arrivée tantrique",
          body: "Une entrée douce pour passer du stress à la présence partagée.",
          steps: [
            "Asseyez-vous face à face et synchronisez le souffle pendant 2 minutes.",
            "Nommez chacun un état présent et une intention relationnelle pour ce soir.",
            "Faites 3 minutes de toucher dévotionnel non orienté vers la performance.",
            "Avant d'aller plus loin: « plus, pareil, plus lent, pause ou stop ? »",
          ],
        },
        beginnerTrack: {
          title: "Parcours débutant: sécurité et constance",
          body: "Pendant 2 à 3 semaines, privilégiez la répétition simple. La confiance corporelle précède l'intensité.",
          steps: [
            "Rituel d'arrivée de 6 à 10 minutes, trois fois par semaine.",
            "Utilisez à chaque tour un langage de consentement explicite.",
            "Restez sous une intensité 6/10 et terminez en état régulé.",
            "Clôturez avec gratitude + une demande concrète pour la prochaine fois.",
          ],
        },
        advancedTrack: {
          title: "Parcours avancé: approfondir sans perdre la cohérence",
          body: "Quand la base est stable, ajoutez polarité, profondeur de souffle et vérité dévotionnelle sans sacrifier la clarté.",
          steps: [
            "Alternez 2 minutes de polarité dirigée et 1 minute d'immobilité.",
            "Utilisez une progression en vagues: monter, intégrer, reprendre.",
            "Avant le toucher: une vérité de bord + une offrande dévotionnelle.",
            "Debrief: qu'est-ce qui a ouvert, saturé, et que calibrer ensuite.",
          ],
        },
        quote: {
          text: "L'intimité tantrique grandit quand attention, consentement et dévotion respirent ensemble.",
          source: "Synthèse éditoriale Sacred Path · Tantra",
        },
        whatItIsNot: [
          "Ce n'est pas une esthétique spirituelle posée sur de la déconnexion.",
          "Ce n'est pas une quête d'intensité permanente.",
          "Ce n'est pas un contournement du consentement ni de la responsabilité.",
          "Ce n'est pas un raccourci qui évite réparation et communication honnête.",
          "Ce n'est pas une nouveauté exotique: c'est une discipline de présence.",
        ],
        pillars: [
          { name: "Présence", body: "Revenir à ce qui est vivant maintenant." },
          { name: "Souffle", body: "Réguler émotion, arousal et sécurité." },
          { name: "Polarité", body: "Créer un contraste conscient qui remet du mouvement." },
          { name: "Dévotion", body: "Tenir l'intimité avec respect et intention." },
          { name: "Conscience incarnée", body: "Lire la vérité du corps avant l'analyse." },
          { name: "Langage du consentement", body: "Rendre chaque étape explicite et ajustable." },
          { name: "Intégration", body: "Clôturer pour que la confiance s'accumule." },
        ],
        modernCouples: [
          { title: "Amour présent, intimité mécanique", body: "Instaurer des transitions courtes vers la présence." },
          { title: "Un veut de la profondeur, l'autre se sent pressé", body: "Le rythme tantrique permet d'ouvrir sans forcer." },
          { title: "Stress chronique et désir en baisse", body: "Le souffle partagé rouvre l'accès relationnel." },
          { title: "Résidus de conflit", body: "Associer réparation verbale et contact apaisant." },
          { title: "Déconnexion entre quotidien et intimité", body: "Ancrer un rituel hebdomadaire non négociable." },
        ],
        misunderstandings: [
          {
            title: "Le Tantra = intensité constante",
            body: "La vraie pratique alterne activation et apaisement. Sans intégration, le système sature.",
            beginnerReframe: "Débutant: sessions courtes, terminer avant surcharge.",
            advancedReframe: "Avancé: rythmer volontairement intensité et silence.",
          },
          {
            title: "Le Tantra = technique",
            body: "La technique aide, mais la qualité d'attention et la clarté du consentement font la différence.",
            beginnerReframe: "Débutant: un seul rituel, exécuté avec présence.",
            advancedReframe: "Avancé: ajuster le rythme en temps réel selon les signaux.",
          },
          {
            title: "Le Tantra remplace la communication",
            body: "Sans langage relationnel clair, la pratique corporelle devient floue.",
            beginnerReframe: "Débutant: nommer un ressenti et un besoin avant le toucher.",
            advancedReframe: "Avancé: debrief structuré après chaque session.",
          },
        ],
        practices: [
          {
            title: "Rituel d'arrivée (6 minutes)",
            setup: "Face à face, un point de contact des mains.",
            steps: [
              "Dix respirations synchronisées.",
              "Un ressenti présent chacun.",
              "Une intention pour la soirée chacun.",
            ],
            integration: "À utiliser avant intimité ou conversation de réparation.",
            beginnerNote: "Gardez exactement cette structure les deux premières semaines.",
            advancedNote: "Ajoutez une minute de silence regard dans les yeux.",
          },
          {
            title: "Souffle en trois phases (8 minutes)",
            setup: "Assis ou allongés côte à côte.",
            steps: [
              "Respiration bas-ventre pour réguler.",
              "Respiration thoracique pour ouvrir l'émotion.",
              "Respiration corps entier avec regard doux.",
            ],
            integration: "Crée rapidement de la cohérence à deux.",
            beginnerNote: "Restez plus longtemps en phase 1 si surcharge.",
            advancedNote: "Ajoutez un son léger à l'expiration.",
          },
          {
            title: "Tour de toucher dévotionnel (10 minutes)",
            setup: "Un donne, un reçoit, puis inversion.",
            steps: [
              "Toucher lent en zones non génitales.",
              "Le receveur guide avec « plus/pareil/pause ».",
              "Inversion après cinq minutes.",
            ],
            integration: "Renforce confiance, consentement et accordage.",
            beginnerNote: "Restez non-performatif et non-génital.",
            advancedNote: "Ajoutez un changement de polarité avant l'inversion.",
          },
        ],
        reflections: [
          "Où accélérons-nous au lieu d'arriver vraiment ?",
          "Quel pilier est déjà fort chez nous ?",
          "Quel rituel pouvons-nous répéter deux fois cette semaine ?",
          "Où la performance remplace encore la présence ?",
          "Qu'est-ce qui nous fait sentir désir et sécurité en même temps ?",
        ],
        relatedAuthors: [
          { name: "Osho", tier: "free", note: "Présence et conscience incarnée." },
          { name: "David Deida", tier: "free", note: "Polarité et vérité dévotionnelle." },
          { name: "Margot Anand", tier: "premium", note: "Cérémonial et sensualité sacrée." },
          { name: "Sally Kempton", tier: "premium", note: "Reconnaissance intime et non-dualité." },
        ],
        premiumBanner:
          "Débloquez les parcours tantriques complets avec audio guidé, progressions consent-first et modules avancés pour transformer l'alchimie en pratique de couple durable.",
      },
    },
    tao: {
      name: "Tao",
      oneLine: "Flux, souffle et longévité sensuelle des pratiques taoïstes pour les couples modernes.",
      overviewLine: "Pour les couples qui veulent une intensité calme maintenant et une énergie durable dans le temps.",
      content: {
        hero: [
          "Le Tao intime repose sur l'harmonie, la non-forçance (wu wei) et la circulation de l'énergie.",
          "En pratique de couple: plus de douceur, moins de pression, plus de continuité.",
          "Au lieu de courir après des pics, on apprend à nourrir le lien sans épuisement.",
          "Le calme et la passion cessent d'être opposés: ils deviennent un même rythme partagé.",
        ],
        whyMatters: [
          "Utile les jours de fatigue où l'intensité brutale couperait la connexion.",
          "Aide à gérer les décalages de désir sans honte ni retrait.",
          "Réduit l'épuisement post-intimité grâce à la conservation et à la récupération.",
          "Rend le toucher plus sûr pour les systèmes nerveux sensibles.",
          "Construit une vitalité érotique soutenable sur des années.",
        ],
        whoItsFor: [
          { title: "Couples en saison de forte charge", body: "Se reconnecter malgré travail, parentalité et fatigue." },
          { title: "Couples avec rythmes différents", body: "Rester reliés sans forcer la chimie." },
          { title: "Couples en sortie de burnout", body: "Rebâtir l'énergie et la confiance corporelle." },
          { title: "Couples visant la longévité sensuelle", body: "Cultiver une intimité nourrissante et durable." },
        ],
        practicePreview: {
          title: "Reset tao du soir",
          body: "Une séquence compatible avec les journées lourdes.",
          steps: [
            "Allongés côte à côte, une main sur le bas-ventre de l'autre.",
            "Inspire 4, expire 6, cinq cycles.",
            "Chacun nomme un endroit du corps qui s'est adouci.",
            "Trois minutes de toucher doux sous intensité 6/10.",
          ],
        },
        beginnerTrack: {
          title: "Parcours débutant: restaurer rythme et sécurité",
          body: "Le premier mois, priorité à la régulation et à la répétition simple.",
          steps: [
            "Reset Tao 5 à 8 minutes les soirs de semaine.",
            "Expiration plus longue que l'inspiration.",
            "Noter un signal d'apaisement et un signal de surcharge.",
            "Clôturer par une courte vérification de nourrissement.",
          ],
        },
        advancedTrack: {
          title: "Parcours avancé: flow et longévité",
          body: "Quand la base est stable, raffiner circulation, précision du rythme et récupération.",
          steps: [
            "Sessions de circulation de 12 à 18 minutes.",
            "Utiliser le souffle partagé comme régulateur principal d'intensité.",
            "Réchauffer tout le corps avant les zones de haute charge.",
            "Vérifier la vitalité du lendemain pour ajuster la dose.",
          ],
        },
        quote: {
          text: "L'intimité tao se mesure à la qualité de nourishment, de stabilité et de connexion que vous pouvez maintenir.",
          source: "Synthèse éditoriale Sacred Path · Tao",
        },
        whatItIsNot: [
          "Ce n'est pas de la répression.",
          "Ce n'est pas de la distance émotionnelle déguisée en calme.",
          "Ce n'est pas une pratique uniquement solo.",
          "Ce n'est pas l'évitement du désir.",
          "Ce n'est pas une lenteur infinie: le rythme monte quand le corps est prêt.",
        ],
        pillars: [
          { name: "Douceur", body: "La détente augmente la sensibilité." },
          { name: "Rythme respiratoire", body: "Le souffle règle la cadence." },
          { name: "Conservation", body: "Préserver l'énergie soutient la durée." },
          { name: "Circulation", body: "Distribuer la chaleur réduit l'épuisement." },
          { name: "Nourrissement", body: "L'objectif est réparateur pour les deux." },
          { name: "Ancrage", body: "Rester présent au bas du corps diminue la réactivité." },
          { name: "Récupération", body: "Clôturer pour sortir plus clairs, pas plus vides." },
        ],
        modernCouples: [
          { title: "Semaines sous pression", body: "Le Tao baisse l'activation et garde le lien accessible." },
          { title: "Désir désynchronisé", body: "Le rythme partagé évite la pression." },
          { title: "Après conflit", body: "Utiliser un reset doux avant un contact plus intense." },
          { title: "Seuils de toucher différents", body: "Cadencer explicitement pour respecter les limites." },
          { title: "Fatigue accumulée", body: "Favoriser les pratiques qui laissent les deux partenaires nourris." },
        ],
        misunderstandings: [
          {
            title: "Lent = ennuyeux",
            body: "Le ralentissement augmente souvent finesse, anticipation et sensibilité.",
            beginnerReframe: "Débutant: un pattern lent de 3 minutes sans accélérer.",
            advancedReframe: "Avancé: alterner lent et moyen pour créer du contraste.",
          },
          {
            title: "Conserver = se retenir",
            body: "La conservation n'est pas fermeture: c'est orienter l'énergie pour qu'elle nourrisse.",
            beginnerReframe: "Débutant: privilégier les sessions qui laissent clarté et chaleur.",
            advancedReframe: "Avancé: suivre l'état énergétique sur 24 heures.",
          },
          {
            title: "Le Tao tue la passion",
            body: "Le Tao stabilise la passion pour la rendre durable.",
            beginnerReframe: "Débutant: désir doux mais continu dans la semaine.",
            advancedReframe: "Avancé: construire des arcs d'anticipation plus longs.",
          },
        ],
        practices: [
          {
            title: "Synchronisation bas-ventre (5 minutes)",
            setup: "Allongés côte à côte, main sur l'abdomen inférieur.",
            steps: [
              "Inspire 4 temps dans le bas-ventre.",
              "Expire 6 temps.",
              "Moins de mots, plus de ressenti.",
            ],
            integration: "Reset rapide après une journée dense.",
            beginnerNote: "Utiliser dès qu'un partenaire se sent saturé mentalement.",
            advancedNote: "Ajouter relâchement du plancher pelvien à l'expiration.",
          },
          {
            title: "Orbites de chaleur (8 minutes)",
            setup: "Assis en contact doux.",
            steps: [
              "Faire circuler l'attention poitrine, ventre, bassin, dos.",
              "Trois respirations par zone.",
              "Partager la zone la plus adoucie.",
            ],
            integration: "Renforce la sensibilité érotique globale.",
            beginnerNote: "Commencez simplement: poitrine, ventre, bassin.",
            advancedNote: "Ajoutez colonne et gorge pour affiner la circulation.",
          },
          {
            title: "Échange de rythme doux (10 minutes)",
            setup: "Choisir un seul motif de toucher non-performatif.",
            steps: [
              "Partenaire A mène 5 minutes.",
              "Partenaire B reflète exactement, puis inversion.",
              "Rester sous intensité 6/10.",
            ],
            integration: "Entraîne la co-régulation et la précision du tempo.",
            beginnerNote: "Utilisez un minuteur pour alléger la charge mentale.",
            advancedNote: "Ajoutez des micro-pauses toutes les 60 secondes.",
          },
        ],
        reflections: [
          "Où notre intimité nous épuise-t-elle encore ?",
          "Quel rythme nous recharge le plus ?",
          "Quel signal corporel dit « ralentis » chez chacun ?",
          "Que pouvons-nous instaurer comme reconnect par défaut en semaine ?",
          "Comment garder la passion tout en réduisant la pression ?",
        ],
        relatedAuthors: [
          { name: "Mantak Chia", tier: "premium", note: "Circulation taoïste et alchimie interne." },
          { name: "Osho", tier: "free", note: "Présence et régulation incarnée." },
          { name: "Michaela Boehm", tier: "premium", note: "Ancrage somatique relationnel." },
          { name: "Barry Long", tier: "premium", note: "Simplicité et intégrité intime." },
        ],
        premiumBanner:
          "Débloquez les parcours Tao avancés avec cartes respiratoires à deux, exercices de circulation et séquences de longévité sensuelle qui protègent votre énergie et votre attraction.",
      },
    },
  },
  cs: {
    tantra: {
      name: "Tantrická moudrost",
      oneLine: "Starověká cesta přeložená pro moderní páry skrze dech, přítomnost, polaritu a oddanost.",
      overviewLine: "Pro páry, které chtějí vědomou intimitu už dnes večer a duchovní růst v čase.",
      content: {
        hero: [
          "Historická tantra je tělem zahrnující duchovní cesta: dech, pozornost, rituál, mantra a vědomí.",
          "Pro moderní pár to znamená nesdělovat touhu od vědomí a emoční blízkosti.",
          "Tantrické tempo vede k tomu, že nejdřív regulujeme, potom otevíráme a až pak zesilujeme.",
          "Místo výkonu vzniká opakovatelná praxe, kde spolu rostou eros, něha, pravda i úcta.",
        ],
        whyMatters: [
          "Dává jasný rámec pro erotickou hloubku bez ztráty emočního bezpečí.",
          "Pomáhá při rozdílných potřebách intenzity mezi partnery.",
          "Dělá z dechu nástroj společné regulace před náročným rozhovorem.",
          "Vrací živost do vztahů, které jsou funkční, ale vnitřně vyschlé.",
          "Vytváří opakovatelné rituály místo čekání na dokonalý moment.",
        ],
        whoItsFor: [
          { title: "Páry s věrností, ale slabší erotickou jiskrou", body: "Obnovit přitažlivost bez tlaku a přetížení." },
          { title: "Páry ve stresových smyčkách", body: "Nejprve návrat do těla, potom dotek." },
          { title: "Páry obnovující důvěru", body: "Jasná pravidla bezpečí, jazyka a tempa." },
          { title: "Páry hledající posvátnou hloubku", body: "Ukotvit týdenní praxi, která drží lásku živou." },
        ],
        practicePreview: {
          title: "Tantrická příchozí sekvence",
          body: "Jemný vstup ze stresu do sdílené přítomnosti.",
          steps: [
            "Sedněte si čelem k sobě a 2 minuty dýchejte synchronně.",
            "Každý pojmenuje jeden aktuální pocit a jeden záměr na večer.",
            "3 minuty ne-výkonového oddaného doteku.",
            "Před pokračováním: více, stejně, pomaleji, pauza nebo stop?",
          ],
        },
        beginnerTrack: {
          title: "Začátečnická cesta: bezpečí a konzistence",
          body: "První 2-3 týdny je klíčová jednoduchá opakovatelnost, ne intenzita.",
          steps: [
            "Rituál příjezdu 6-10 minut, třikrát týdně.",
            "Každé kolo s explicitním jazykem souhlasu.",
            "Zůstaňte pod intenzitou 6/10 a končete v regulaci.",
            "Závěr: vděčnost + jedna konkrétní prosba na příště.",
          ],
        },
        advancedTrack: {
          title: "Pokročilá cesta: prohloubit bez ztráty soudržnosti",
          body: "Když je základ stabilní, přidejte polaritu, hlubší dech a pravdu bez ztráty jasnosti.",
          steps: [
            "Střídejte 2 minuty vedené polarity a 1 minutu ticha.",
            "Pracujte ve vlnách: zvýšit, integrovat, znovu vstoupit.",
            "Před dotekem: jedna hraniční pravda + jedna oddaná nabídka.",
            "Debrief: co otevřelo, co zahltilo, co upravit příště.",
          ],
        },
        quote: {
          text: "Tantrická intimita roste, když jsou pozornost, souhlas a oddanost živé v jednom dechu.",
          source: "Redakční syntéza Sacred Path · Tantra",
        },
        whatItIsNot: [
          "Není to spirituální estetika překrývající odpojení.",
          "Není to tlak na trvalou intenzitu.",
          "Není to obejití souhlasu ani odpovědnosti.",
          "Není to zkratka bez oprav a otevřené komunikace.",
          "Není to exotická novinka, ale disciplína přítomnosti.",
        ],
        pillars: [
          { name: "Přítomnost", body: "Návrat k tomu, co je teď živé." },
          { name: "Dech", body: "Regulace emocí, vzrušení a bezpečí." },
          { name: "Polarita", body: "Vědomý kontrast, který vrací proudění." },
          { name: "Oddanost", body: "Úcta a záměr v intimním prostoru." },
          { name: "Vtělené uvědomění", body: "Nejdřív číst tělo, potom analyzovat." },
          { name: "Jazyk souhlasu", body: "Každý krok je explicitní a upravitelný." },
          { name: "Integrace", body: "Uzavírat tak, aby důvěra rostla." },
        ],
        modernCouples: [
          { title: "Láska je, ale intimita je mechanická", body: "Krátké přechody do přítomnosti před dotekem." },
          { title: "Jeden chce hloubku, druhý cítí tlak", body: "Tantrické tempo otevírá bez nátlaku." },
          { title: "Stres tlumí touhu", body: "Sdílený dech vrací kontakt bez nucení chemie." },
          { title: "Po konfliktu zůstává napětí", body: "Spojit opravný jazyk s uklidňujícím dotekem." },
          { title: "Intimita je oddělená od běžného života", body: "Ukotvit jeden týdenní rituál, který se drží." },
        ],
        misunderstandings: [
          {
            title: "Tantra = stálá intenzita",
            body: "Skutečná praxe střídá aktivaci a zklidnění. Bez integrace systém přetížíte.",
            beginnerReframe: "Začátečník: krátké sezení, konec před zahlcením.",
            advancedReframe: "Pokročilý: vědomě střídat intenzitu a ticho.",
          },
          {
            title: "Tantra = technika",
            body: "Technika pomáhá, ale rozhoduje kvalita pozornosti a jasnost souhlasu.",
            beginnerReframe: "Začátečník: jeden jednoduchý rituál s plnou přítomností.",
            advancedReframe: "Pokročilý: ladit tempo podle signálů v reálném čase.",
          },
          {
            title: "Tantra nahrazuje komunikaci",
            body: "Bez jasného vztahového jazyka je tělesná praxe nejasná.",
            beginnerReframe: "Začátečník: před dotekem pojmenuj pocit a potřebu.",
            advancedReframe: "Pokročilý: strukturovaný debrief po každé praxi.",
          },
        ],
        practices: [
          {
            title: "Příchodový rituál (6 minut)",
            setup: "Čelem k sobě, jeden bod kontaktu rukou.",
            steps: ["Deset synchronních dechů.", "Každý pojmenuje aktuální pocit.", "Každý pojmenuje záměr pro večer."],
            integration: "Používejte před intimitou i před opravnými rozhovory.",
            beginnerNote: "První dva týdny držte přesně tuto strukturu.",
            advancedNote: "Přidejte minutu tichého očního kontaktu.",
          },
          {
            title: "Třífázový dech (8 minut)",
            setup: "Vsedě nebo vleže vedle sebe.",
            steps: [
              "Dolní břicho pro regulaci.",
              "Hrudník pro emoční otevření.",
              "Celé tělo s měkkým pohledem.",
            ],
            integration: "Rychle vytváří společnou koherenci.",
            beginnerNote: "Při přetížení zůstaňte déle ve fázi 1.",
            advancedNote: "Přidejte jemný zvuk na výdechu.",
          },
          {
            title: "Oddaný dotek (10 minut)",
            setup: "Jeden dává, druhý přijímá, pak výměna.",
            steps: [
              "Pomalý dotek v negentilních zónách.",
              "Přijímající vede přes více/stejně/pauza.",
              "Po pěti minutách výměna rolí.",
            ],
            integration: "Posiluje důvěru, souhlas a naladění.",
            beginnerNote: "Zůstaňte ne-výkonově, bez cíle.",
            advancedNote: "Před výměnou přidejte jeden posun polarity.",
          },
        ],
        reflections: [
          "Kde zrychlujeme místo opravdového příchodu?",
          "Který pilíř je u nás teď nejsilnější?",
          "Jaký rituál zvládneme tento týden zopakovat alespoň dvakrát?",
          "Kde ještě upřednostňujeme výkon před přítomností?",
          "Co nám dává zároveň bezpečí i touhu?",
        ],
        relatedAuthors: [
          { name: "Osho", tier: "free", note: "Přítomnost a vtělené uvědomění." },
          { name: "David Deida", tier: "free", note: "Polarita a oddaná pravda." },
          { name: "Margot Anand", tier: "premium", note: "Ceremoniální smyslnost." },
          { name: "Sally Kempton", tier: "premium", note: "Rozpoznání a intimní nedualita." },
        ],
        premiumBanner:
          "Odemkněte plné tantrické cesty s vedeným audiem, consent-first progresí a pokročilými moduly, které mění chemii v dlouhodobou párovou praxi.",
      },
    },
    tao: {
      name: "Tao",
      oneLine: "Proudění, dech a smyslná dlouhověkost z taoistické praxe pro moderní páry.",
      overviewLine: "Pro páry, které chtějí klidnou intenzitu teď a udržitelnou energii dlouhodobě.",
      content: {
        hero: [
          "Tao v intimitě stojí na harmonii, ne-vynucování (wu wei) a citlivém vedení energie.",
          "V praxi to znamená méně tlaku, více jemnosti a lepší kontinuitu.",
          "Místo lovení vrcholů se učíte udržet kontakt bez vyčerpání.",
          "Klid a vášeň přestávají soupeřit a začínají se podporovat.",
        ],
        whyMatters: [
          "Pomáhá ve dnech s nízkou energií, kdy by tlak vše zhoršil.",
          "Dává tempo při rozdílném libidu bez studu a uzavření.",
          "Snižuje vyčerpání po intimitě díky konzervaci a obnově.",
          "Zvyšuje bezpečí doteku pro citlivější nervové systémy.",
          "Buduje erotickou vitalitu, která vydrží roky.",
        ],
        whoItsFor: [
          { title: "Páry v náročném životním období", body: "Zůstat propojení i při vysoké zátěži." },
          { title: "Páry s rozdílným tempem touhy", body: "Zachovat blízkost bez nátlaku." },
          { title: "Páry po vyhoření", body: "Obnovit energii i důvěru v těle krok za krokem." },
          { title: "Páry zaměřené na dlouhodobou intimitu", body: "Pěstovat živost, která je vyživující, ne vyčerpávající." },
        ],
        practicePreview: {
          title: "Večerní tao reset",
          body: "Sekvence vhodná i po těžkém dni.",
          steps: [
            "Lehněte si vedle sebe, ruka na spodním břiše partnera.",
            "Nádech 4, výdech 6, pět kol.",
            "Každý pojmenuje, kde se tělo změkčilo.",
            "Tři minuty jemného doteku pod intenzitou 6/10.",
          ],
        },
        beginnerTrack: {
          title: "Začátečnická cesta: rytmus a bezpečí",
          body: "První měsíc je hlavní cíl regulace a konzistence.",
          steps: [
            "Tao reset 5-8 minut ve všední dny.",
            "Výdech delší než nádech.",
            "Po každé praxi zaznamenat 1 signál uvolnění a 1 přetížení.",
            "Krátký závěr: co bylo vyživující, co příště zpomalit.",
          ],
        },
        advancedTrack: {
          title: "Pokročilá cesta: flow a dlouhověkost",
          body: "Když je základ stabilní, rozvíjejte cirkulaci, přesnost tempa a následnou obnovu.",
          steps: [
            "Cirkulační praxe 12-18 minut se střídáním pohybu a klidu.",
            "Sdílený dech jako hlavní regulátor intenzity.",
            "Zahřát celé tělo před vysokou intenzitou.",
            "Kontrola vitality další den a úprava dávky.",
          ],
        },
        quote: {
          text: "Tao intimita se pozná podle výživy, stability a kvality spojení, kterou dokážete udržet.",
          source: "Redakční syntéza Sacred Path · Tao",
        },
        whatItIsNot: [
          "Není to potlačení vášně.",
          "Není to emoční odstup maskovaný klidem.",
          "Není to jen solo energetika.",
          "Není to vyhýbání touze.",
          "Není to nekonečné zpomalování: tempo roste, když je tělo připravené.",
        ],
        pillars: [
          { name: "Jemnost", body: "Uvolnění zvyšuje citlivost a proudění." },
          { name: "Dechový rytmus", body: "Dech nastavuje bezpečné tempo." },
          { name: "Konzervace", body: "Šetření energie podporuje dlouhodobost." },
          { name: "Cirkulace", body: "Rozvedení tepla snižuje vyčerpání." },
          { name: "Výživa", body: "Cíl je obnovující kontakt pro oba." },
          { name: "Uzemnění", body: "Spodní tělo tlumí reaktivitu." },
          { name: "Obnova", body: "Dobré uzavření chrání následující den." },
        ],
        modernCouples: [
          { title: "Vysoký pracovní tlak", body: "Tao snižuje aktivaci a zpřístupní blízkost." },
          { title: "Nesladěné libido", body: "Sdílené tempo snižuje tlak, ne blízkost." },
          { title: "Po konfliktu", body: "Nejprve jemný reset, potom hlubší kontakt." },
          { title: "Různé prahy doteku", body: "Explicitní tempo drží respekt i propojení." },
          { title: "Kumulovaná únava", body: "Volte praxe, které oba po setkání posílí." },
        ],
        misunderstandings: [
          {
            title: "Pomalé = nudné",
            body: "Pomalost často zvyšuje citlivost, očekávání i jemné vzrušení.",
            beginnerReframe: "Začátečník: 3 minuty jednoho pomalého vzorce bez zrychlení.",
            advancedReframe: "Pokročilý: střídat pomalé a střední tempo pro kontrast.",
          },
          {
            title: "Konzervace = zadržování",
            body: "Nejde o stažení, ale o vedení energie tak, aby oba zůstali vyživení.",
            beginnerReframe: "Začátečník: volit praxe, po kterých přichází více jasnosti.",
            advancedReframe: "Pokročilý: sledovat efekt na energii během 24 hodin.",
          },
          {
            title: "Tao zabíjí vášeň",
            body: "Tao vášeň stabilizuje, aby nevzplála a nevyhasla v krátkých špičkách.",
            beginnerReframe: "Začátečník: jemná, ale pravidelná touha během týdne.",
            advancedReframe: "Pokročilý: delší oblouky očekávání před vrcholem.",
          },
        ],
        practices: [
          {
            title: "Synchronizace spodního břicha (5 minut)",
            setup: "Ležte vedle sebe, ruka na podbřišku partnera.",
            steps: ["Nádech 4 do podbřišku.", "Výdech 6.", "Méně slov, více vjemu."],
            integration: "Rychlý reset po náročném dni.",
            beginnerNote: "Použijte vždy, když je někdo mentálně přehlcený.",
            advancedNote: "Přidejte uvolnění pánevního dna při výdechu.",
          },
          {
            title: "Oběžnice tepla (8 minut)",
            setup: "Sed v jemném kontaktu.",
            steps: [
              "Vést pozornost: hrudník, břicho, pánev, záda.",
              "Tři dechy v každé oblasti.",
              "Sdílet, kde přišlo největší změknutí.",
            ],
            integration: "Posiluje celotělovou smyslovou citlivost.",
            beginnerNote: "Začněte jednoduše: hrudník, břicho, pánev.",
            advancedNote: "Přidejte páteř a krk pro jemnější cirkulaci.",
          },
          {
            title: "Výměna jemného rytmu (10 minut)",
            setup: "Zvolte jeden ne-výkonový vzorec doteku.",
            steps: [
              "Partner A vede 5 minut.",
              "Partner B přesně zrcadlí, potom výměna.",
              "Držte intenzitu pod 6/10.",
            ],
            integration: "Trénuje tempo a společnou regulaci.",
            beginnerNote: "Použijte časovač, ať mysl nemusí hlídat čas.",
            advancedNote: "Vkládejte mikro-pauzu každých 60 sekund.",
          },
        ],
        reflections: [
          "Kde nás intimita ještě vyčerpává?",
          "Jaké tempo nás nejvíc vyživuje?",
          "Jaké tělesné signály říkají „zpomal“?",
          "Jaký reconnect rituál uděláme výchozím ve všední den?",
          "Jak držet vášeň bez zbytečného tlaku?",
        ],
        relatedAuthors: [
          { name: "Mantak Chia", tier: "premium", note: "Taoistická cirkulace a vnitřní alchymie." },
          { name: "Osho", tier: "free", note: "Přítomnost a vtělená regulace." },
          { name: "Michaela Boehm", tier: "premium", note: "Somatické vztahové ukotvení." },
          { name: "Barry Long", tier: "premium", note: "Jednoduchost a integrita intimní praxe." },
        ],
        premiumBanner:
          "Odemkněte pokročilé Tao cesty s párovými dechovými mapami, cirkulačními drill-y a sekvencemi smyslné dlouhověkosti, které chrání energii i přitažlivost.",
      },
    },
  },
};

const applyPathLocalization = (path: PathDetail, lang: Language): PathDetail => {
  if (lang === "en") return path;
  const override = localizedPathOverrides[lang]?.[path.slug];
  if (!override) return path;

  return {
    ...path,
    ...override,
    content: override.content ? { ...path.content, ...override.content } : path.content,
  };
};

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
    headline: "Open the embodied heart before asking for more intensity.",
    benefit: "Build safety, somatic honesty, and repair capacity so desire can return with trust.",
    bullets: [
      "Guided nervous-system regulation and body-led disclosure practices.",
      "Repair-first sequences for reconnecting after shutdown or conflict.",
      "Somatic intimacy pathways that support both tenderness and eros.",
    ],
    cta: "Unlock Embodied Heart Premium",
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
    headline: "Let slowness become your intimacy advantage.",
    benefit: "Replace pressure with presence using stillness, inner touch, and non-goal connection.",
    bullets: [
      "Guided Slow Love rituals for low-pressure, high-presence connection.",
      "Body-awareness and relaxation tracks that deepen sensation naturally.",
      "Daily micro-practices that keep intimacy alive during real-life stress.",
    ],
    cta: "Unlock Slow Love Premium",
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
    headline: "Make your whole relationship a conscious union practice.",
    benefit: "Use presence, ceremony, and recognition to deepen intimacy across everyday life, not only special nights.",
    bullets: [
      "Ceremony frameworks for openings, closings, and key relational transitions.",
      "Recognition and truth practices that keep contact alive and honest.",
      "Union pathways linking devotion, repair, and daily relational discipline.",
    ],
    cta: "Unlock Conscious Union Premium",
  },
  "semen-retention": {
    headline: "Last longer. Feel more. Become the partner she dreams about.",
    benefit: "Most men lose energy, presence, and desire to connect after sex. This path reverses that — you'll learn to sustain pleasure, stay present, and wake up the next morning wanting to be closer, not distant.",
    bullets: [
      "Valley orgasm techniques that replace quick peaks with 30-minute full-body waves — for both of you.",
      "Retention drills that build stamina, emotional presence, and magnetic confidence over weeks.",
      "Couple integration practices so she feels the difference too — more attention, more touch, more you.",
    ],
    cta: "Unlock Semen Retention Path",
  },
};

const shellCardClass =
  "rounded-[28px] border border-border/30 bg-card/45 p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.46)]";

const pathsUiCopy: Record<Language, Record<string, string>> = {
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
    relatedPaths: "Related Paths",
    heroEyebrow: "Sacred Library · Paths",
    heroTitle: "Ancient pathways translated for modern couples",
    heroDesc:
      "Start with a quick insight you can use immediately, then go deeper as a couple when you have space. Each path helps you move from information to real closeness.",
    sacredPages: "Sacred pages",
    overviewEyebrow: "Paths Overview",
    overviewTitle: "Choose a path for immediate closeness and long-term sacred growth",
    practicePreview: "Practice preview",
    practicePreviewFallback: "Foundational couple exercise",
    premiumPreview: "Premium preview",
    premiumPreviewFallback: "Deep guided path content",
    openAccessPaths: "Open-access Paths",
    openAccessPathsBody:
      "fully open paths so couples can apply wisdom now and reconnect in the same moment.",
    lockedPaths: "Locked Paths",
    lockedPathsBody:
      "locked paths for deeper inspiration, richer guidance, and a structured journey toward sacred love.",
    unlockCouplePathJourney: "Unlock this couple path journey",
    premiumActive: "Premium Active",
    locked: "Locked",
    guidedTracks: "Guided Tracks",
    energyMaps: "Energy Maps",
    sacredLoveLibrary: "Sacred Love Library",
    viewPlansAndTrial: "View plans and trial",
    premiumValue: "8. Premium Value",
    whatThisPathIs: "What This Path Is",
    whyItMattersForCouples: "Why It Matters For Couples",
    whoItIsFor: "Who It Is For",
    concretePracticePreview: "Concrete Practice Preview",
    whatThisPathIsNot: "What This Path Is Not",
    corePillars: "Core Pillars",
    pillar: "Pillar",
    whyItMattersInModernRelationshipLife: "Why It Matters In Modern Relationship Life",
    beginnerAndAdvancedPath: "Beginner And Advanced Path",
    beginner: "Beginner",
    advanced: "Advanced",
    commonMisunderstandings: "Common Misunderstandings",
    practicesYouCanRunTonight: "Practices You Can Run Tonight",
    practice: "Practice",
    integration: "Integration",
    reflectionPrompts: "Reflection Prompts",
    premiumPath: "Premium Path",
    lockedPath: "Locked Path",
    unlockThisPathJourney: "Unlock this path journey",
    premiumPathWhatItIs: "What This Path Is",
    premiumWhoThisIsFor: "Who This Is For",
    premiumOrientationTitle: "Premium path orientation sequence",
    premiumOrientationBody:
      "A structured first-night sequence that calibrates emotional safety, sensual pace, and relational intention before deeper modules.",
    premiumOrientationStep1: "Set one relationship intention and one embodied intention for tonight.",
    premiumOrientationStep2: "Run guided breath and touch pacing according to the path module structure.",
    premiumOrientationStep3: "Close with a two-minute integration check so the next module fits your actual couple state.",
    premiumWhoCard1Title: "Couples with stable love but unclear direction",
    premiumWhoCard1Body: "Use a structured premium path to create continuity and momentum.",
    premiumWhoCard2Title: "Couples rebuilding trust in intimacy",
    premiumWhoCard2Body: "Get pacing safeguards, progressive scripts, and grounded relational guardrails.",
    premiumWhoCard3Title: "Couples seeking advanced erotic-spiritual depth",
    premiumWhoCard3Body: "Access layered modules that blend desire, devotion, and embodied awareness.",
    premiumWhoCard4Title: "Couples wanting long-term progression",
    premiumWhoCard4Body: "Map each phase from first practices to deeper couple integration.",
    premiumWhy1: "Translate ancient philosophy into a structured modern intimacy path you can actually sustain.",
    premiumWhy2: "Move from episodic closeness into progressive relationship growth with shared language and pacing.",
    premiumWhy3: "Protect attraction, emotional trust, and spiritual depth at the same time.",
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
    relatedPaths: "Parcours liés",
    heroEyebrow: "Bibliothèque sacrée · Parcours",
    heroTitle: "Des parcours anciens adaptés aux couples modernes",
    heroDesc:
      "Commencez avec un insight rapide utilisable immédiatement, puis allez plus loin en couple quand vous avez de l'espace. Chaque parcours transforme la connaissance en vraie proximité.",
    sacredPages: "Pages sacrées",
    overviewEyebrow: "Vue d'ensemble des parcours",
    overviewTitle: "Choisissez un parcours pour une proximité immédiate et une croissance sacrée durable",
    practicePreview: "Aperçu de pratique",
    practicePreviewFallback: "Exercice couple fondamental",
    premiumPreview: "Aperçu premium",
    premiumPreviewFallback: "Contenu guidé approfondi",
    openAccessPaths: "Parcours en accès libre",
    openAccessPathsBody:
      "parcours entièrement ouverts pour appliquer la sagesse dès maintenant et se reconnecter dans le même moment.",
    lockedPaths: "Parcours verrouillés",
    lockedPathsBody:
      "parcours verrouillés pour plus d'inspiration, de guidance et un chemin structuré vers l'amour sacré.",
    unlockCouplePathJourney: "Déverrouiller ce parcours de couple",
    premiumActive: "Premium actif",
    locked: "Verrouillé",
    guidedTracks: "Parcours guidés",
    energyMaps: "Cartes énergétiques",
    sacredLoveLibrary: "Bibliothèque d'amour sacré",
    viewPlansAndTrial: "Voir les plans et l'essai",
    premiumValue: "8. Valeur Premium",
    whatThisPathIs: "Ce qu'est ce parcours",
    whyItMattersForCouples: "Pourquoi c'est important pour les couples",
    whoItIsFor: "Pour qui c'est",
    concretePracticePreview: "Aperçu d'une pratique concrète",
    whatThisPathIsNot: "Ce que ce parcours n'est pas",
    corePillars: "Piliers centraux",
    pillar: "Pilier",
    whyItMattersInModernRelationshipLife: "Pourquoi c'est important dans la vie relationnelle moderne",
    beginnerAndAdvancedPath: "Parcours débutant et avancé",
    beginner: "Débutant",
    advanced: "Avancé",
    commonMisunderstandings: "Malentendus fréquents",
    practicesYouCanRunTonight: "Pratiques à faire ce soir",
    practice: "Pratique",
    integration: "Intégration",
    reflectionPrompts: "Questions de réflexion",
    premiumPath: "Parcours premium",
    lockedPath: "Parcours verrouillé",
    unlockThisPathJourney: "Déverrouiller ce parcours",
    premiumPathWhatItIs: "Ce qu'est ce parcours",
    premiumWhoThisIsFor: "Pour qui c'est",
    premiumOrientationTitle: "Séquence d'orientation du parcours premium",
    premiumOrientationBody:
      "Une séquence structurée de première soirée qui calibre la sécurité émotionnelle, le rythme sensuel et l'intention relationnelle avant les modules plus profonds.",
    premiumOrientationStep1: "Fixez une intention relationnelle et une intention incarnée pour ce soir.",
    premiumOrientationStep2: "Suivez le rythme guidé de souffle et de toucher selon la structure du module.",
    premiumOrientationStep3: "Terminez par une vérification d'intégration de deux minutes pour adapter le module suivant à votre état réel de couple.",
    premiumWhoCard1Title: "Couples avec un amour stable mais une direction floue",
    premiumWhoCard1Body: "Utilisez un parcours premium structuré pour créer continuité et élan.",
    premiumWhoCard2Title: "Couples qui reconstruisent la confiance dans l'intimité",
    premiumWhoCard2Body: "Accédez à des garde-fous de rythme, des scripts progressifs et des repères relationnels solides.",
    premiumWhoCard3Title: "Couples cherchant une profondeur érotico-spirituelle avancée",
    premiumWhoCard3Body: "Accédez à des modules en couches qui relient désir, dévotion et conscience incarnée.",
    premiumWhoCard4Title: "Couples voulant une progression à long terme",
    premiumWhoCard4Body: "Cartographiez chaque phase, des premières pratiques à une intégration plus profonde du couple.",
    premiumWhy1: "Traduisez la philosophie ancienne en un parcours d'intimité moderne et durable.",
    premiumWhy2: "Passez d'une proximité ponctuelle à une croissance relationnelle progressive avec un langage et un rythme partagés.",
    premiumWhy3: "Préservez attraction, confiance émotionnelle et profondeur spirituelle en même temps.",
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
    relatedPaths: "Související cesty",
    heroEyebrow: "Posvátná knihovna · Cesty",
    heroTitle: "Starověké cesty přeložené pro moderní páry",
    heroDesc:
      "Začni rychlým vhledem, který můžeš použít hned, a pak jděte v páru do větší hloubky. Každá cesta převádí informace do skutečné blízkosti.",
    sacredPages: "Posvátné stránky",
    overviewEyebrow: "Přehled cest",
    overviewTitle: "Vyber cestu pro okamžitou blízkost a dlouhodobý posvátný růst",
    practicePreview: "Náhled praxe",
    practicePreviewFallback: "Základní párové cvičení",
    premiumPreview: "Náhled premium",
    premiumPreviewFallback: "Hluboký vedený obsah",
    openAccessPaths: "Volně dostupné cesty",
    openAccessPathsBody:
      "plně otevřené cesty, aby páry mohly použít moudrost hned a znovu se propojit ve stejném momentu.",
    lockedPaths: "Uzamčené cesty",
    lockedPathsBody:
      "uzamčené cesty pro hlubší inspiraci, bohatší vedení a strukturovanou cestu k posvátné lásce.",
    unlockCouplePathJourney: "Odemknout tuto párovou cestu",
    premiumActive: "Premium aktivní",
    locked: "Uzamčeno",
    guidedTracks: "Vedené trasy",
    energyMaps: "Mapy energie",
    sacredLoveLibrary: "Knihovna posvátné lásky",
    viewPlansAndTrial: "Zobrazit plány a zkušební verzi",
    premiumValue: "8. Premium hodnota",
    whatThisPathIs: "Co je tato cesta",
    whyItMattersForCouples: "Proč je to důležité pro páry",
    whoItIsFor: "Pro koho je to určeno",
    concretePracticePreview: "Ukázka konkrétní praxe",
    whatThisPathIsNot: "Co tato cesta není",
    corePillars: "Hlavní pilíře",
    pillar: "Pilíř",
    whyItMattersInModernRelationshipLife: "Proč je to důležité v moderním partnerském životě",
    beginnerAndAdvancedPath: "Začátečnická a pokročilá cesta",
    beginner: "Začátečník",
    advanced: "Pokročilý",
    commonMisunderstandings: "Častá nedorozumění",
    practicesYouCanRunTonight: "Praxe, které můžete udělat dnes večer",
    practice: "Praxe",
    integration: "Integrace",
    reflectionPrompts: "Otázky k zamyšlení",
    premiumPath: "Premium cesta",
    lockedPath: "Uzamčená cesta",
    unlockThisPathJourney: "Odemknout tuto cestu",
    premiumPathWhatItIs: "Co je tato cesta",
    premiumWhoThisIsFor: "Pro koho je to určeno",
    premiumOrientationTitle: "Úvodní sekvence premium cesty",
    premiumOrientationBody:
      "Strukturovaná sekvence na první večer, která ladí emoční bezpečí, smyslné tempo a vztahový záměr před hlubšími moduly.",
    premiumOrientationStep1: "Nastavte jeden vztahový záměr a jeden tělesný záměr pro dnešní večer.",
    premiumOrientationStep2: "Projděte vedené dýchání a dotykové tempo podle struktury modulu cesty.",
    premiumOrientationStep3: "Zakončete dvouminutovou integrační kontrolou, aby další modul odpovídal vašemu reálnému stavu páru.",
    premiumWhoCard1Title: "Páry se stabilní láskou, ale nejasným směrem",
    premiumWhoCard1Body: "Použijte strukturovanou premium cestu pro kontinuitu a momentum.",
    premiumWhoCard2Title: "Páry obnovující důvěru v intimitě",
    premiumWhoCard2Body: "Získáte ochranné tempo, progresivní skripty a pevné vztahové mantinely.",
    premiumWhoCard3Title: "Páry hledající pokročilou eroticko-duchovní hloubku",
    premiumWhoCard3Body: "Získejte vrstvené moduly, které spojují touhu, oddanost a vtělené uvědomění.",
    premiumWhoCard4Title: "Páry, které chtějí dlouhodobý progres",
    premiumWhoCard4Body: "Zmapujte každou fázi od prvních praktik až po hlubší párovou integraci.",
    premiumWhy1: "Převeďte starověkou filozofii do strukturované moderní intimní cesty, kterou lze dlouhodobě držet.",
    premiumWhy2: "Přejděte od epizodické blízkosti k postupnému vztahovému růstu se sdíleným jazykem a tempem.",
    premiumWhy3: "Chraňte přitažlivost, emoční důvěru i duchovní hloubku zároveň.",
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

const PathHeroCard = ({ path }: { path: PathDetail }) => {
  const { lang } = useLanguage();
  const ui = pathsUiCopy[lang];
  const Icon = path.icon;
  const hasPremiumAccess = usePremiumAccess();
  const isLocked = path.tier === "premium" && !hasPremiumAccess;
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
      {isLocked ? (
        <Link
          to="/pricing"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/18"
        >
          <Lock className="h-4 w-4" />
          {ui.unlockCouplePathJourney}
        </Link>
      ) : null}
    </section>
  );
};

const PremiumMiniCard = ({ path }: { path: PathDetail }) => {
  const { lang } = useLanguage();
  const ui = pathsUiCopy[lang];
  const hasPremiumAccess = usePremiumAccess();
  const upgradeCopy = pathUpgradeCopy[path.slug] ?? {
    benefit: "Add guided depth, clearer progression, and stronger partner integration.",
  };

  const miniLine = path.tier === "free"
    ? path.content?.premiumBanner ?? upgradeCopy.benefit
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
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{ui.guidedTracks}</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{ui.energyMaps}</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{ui.sacredLoveLibrary}</span>
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

const PathPremiumBlock = ({ path }: { path: PathDetail }) => {
  const { lang } = useLanguage();
  const ui = pathsUiCopy[lang];
  const hasPremiumAccess = usePremiumAccess();
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

const FreePathContent = ({ path }: { path: PathDetail }) => {
  const { lang } = useLanguage();
  const ui = pathsUiCopy[lang];
  if (!path.content) return null;

  const data = path.content;

  return (
    <main className="space-y-5">
      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{ui.whatThisPathIs}</p>
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
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{ui.whyItMattersForCouples}</p>
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
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.whoItIsFor}</p>
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
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.concretePracticePreview}</p>
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

      {data.sacredInvitation ? (
        <section className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{data.sacredInvitation.title}</p>
          <p className="mt-3 text-sm leading-7 text-foreground/90">{data.sacredInvitation.body}</p>
          <div className="mt-4 space-y-2">
            {data.sacredInvitation.resonances.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground/90">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      ) : data.whatItIsNot?.length ? (
        <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.whatThisPathIsNot}</p>
          <div className="mt-4 space-y-3">
            {data.whatItIsNot.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground/90">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.corePillars}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {data.pillars.map((pillar, index) => (
            <article key={pillar.id ?? pillar.name ?? String(index)} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-primary/80">{pillar.label ?? `${ui.pillar} ${index + 1}`}</p>
              <h4 className="mt-2 font-body text-sm text-foreground">{pillar.title ?? pillar.name}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{ui.whyItMattersInModernRelationshipLife}</p>
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
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.commonMisunderstandings}</p>
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
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.practicesYouCanRunTonight}</p>
        <div className="mt-4 space-y-4">
          {data.practices.map((practice, index) => (
            <article key={practice.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-primary/80">{ui.practice} {index + 1}</p>
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
              {practice.beginnerNote ? <p className="mt-3 text-sm leading-6 text-emerald-200/90">{ui.beginner}: {practice.beginnerNote}</p> : null}
              {practice.advancedNote ? <p className="mt-1 text-sm leading-6 text-amber-200/90">{ui.advanced}: {practice.advancedNote}</p> : null}
              <p className="mt-3 text-sm leading-6 text-primary/85">{ui.integration}: {practice.integration}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.reflectionPrompts}</p>
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

const PremiumPathContent = ({ path }: { path: PathDetail }) => {
  const { lang } = useLanguage();
  const ui = pathsUiCopy[lang];
  const hasPremiumAccess = usePremiumAccess();
  const longform = PATH_LONGFORM_BY_SLUG[path.slug];
  const longformParagraphs = longform?.fullDescription.split("\n\n") ?? [];

  return (
  <main className="space-y-5">
    <section className="rounded-[28px] border border-amber-400/20 bg-gradient-to-br from-amber-500/12 via-background to-background p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.5)]">
      <div className="flex items-center gap-2">
        <TierBadge tier="premium" />
        <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-amber-200">
          {hasPremiumAccess ? ui.premiumPath : ui.lockedPath}
        </span>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-primary/80">{ui.premiumPathWhatItIs}</p>
      <h3 className="mt-2 font-display text-3xl text-foreground">{path.name}</h3>
      <p className="mt-3 text-sm leading-7 text-foreground/90">{longform?.shortDescription ?? path.oneLine}</p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{longform?.tagline ?? path.overviewLine}</p>
      {longform?.subtitle ? (
        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-primary/80">{longform.subtitle}</p>
      ) : null}
      <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
        {(longformParagraphs.length ? longformParagraphs : path.teaser ?? []).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {hasPremiumAccess ? null : (
        <Link
          to="/pricing"
          className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/18"
        >
          <Lock className="h-4 w-4" />
          {ui.unlockThisPathJourney}
        </Link>
      )}
    </section>

    <section className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{ui.whyItMattersForCouples}</p>
      <div className="mt-4 space-y-2">
        {(longform?.forCouples
          ? [longform.forCouples, ...longformParagraphs.slice(0, 2)]
          : [ui.premiumWhy1, ui.premiumWhy2, ui.premiumWhy3]
        ).map((line) => (
          <div key={line} className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{line}</span>
          </div>
        ))}
      </div>
    </section>

    {longform?.sacredInvitation ? (
      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{longform.sacredInvitation.title}</p>
        <p className="mt-3 text-sm leading-7 text-foreground/90">{longform.sacredInvitation.body}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {longform.sacredInvitation.resonances.map((item) => (
            <article key={item} className="rounded-2xl border border-border/25 bg-card/35 p-4 text-sm leading-6 text-muted-foreground">
              {item}
            </article>
          ))}
        </div>
      </section>
    ) : (
      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.premiumWhoThisIsFor}</p>
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
    )}

    {longform?.pillars.length ? (
      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.corePillars}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {longform.pillars.map((pillar) => (
            <article key={pillar.id} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-primary/80">{pillar.label}</p>
              <h4 className="mt-2 font-body text-sm text-foreground">{pillar.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>
    ) : null}

    <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.concretePracticePreview}</p>
      <h4 className="mt-2 font-display text-2xl text-foreground">{ui.premiumOrientationTitle}</h4>
      <p className="mt-2 text-sm leading-7 text-foreground/90">
        {longform?.shortDescription ?? ui.premiumOrientationBody}
      </p>
      {longform?.premiumFeatures.length ? (
        <div className="mt-3 space-y-2">
          {longform.premiumFeatures.map((feature) => (
            <div key={feature.id} className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
              <span>
                <span className="font-medium text-foreground">{feature.label}:</span> {feature.description}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{ui.premiumOrientationStep1}</span>
          </div>
          <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{ui.premiumOrientationStep2}</span>
          </div>
          <div className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{ui.premiumOrientationStep3}</span>
          </div>
        </div>
      )}
    </section>

    <PathPremiumBlock path={path} />
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
  const ui = pathsUiCopy[lang];
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

const RelatedPathCarousel = ({
  items,
  onSelect,
}: {
  items: PathDetail[];
  onSelect: (slug: string) => void;
}) => {
  const { lang } = useLanguage();
  const ui = pathsUiCopy[lang];

  return (
  <section className="rounded-[24px] border border-border/30 bg-card/40 p-4">
    <p className="text-xs uppercase tracking-[0.18em] text-primary/80">{ui.relatedPaths}</p>
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
};

const Paths = () => {
  const { lang } = useLanguage();
  const ui = pathsUiCopy[lang];
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const localizedPathDetails = useMemo(
    () => pathDetails.map((path) => applyPathLocalization(path, lang)),
    [lang],
  );
  const focusSlug = searchParams.get("focus")?.trim().toLowerCase();
  const defaultSelectedSlug = useMemo(
    () =>
      localizedPathDetails.find((path) => path.slug === focusSlug)?.slug ??
      localizedPathDetails[0]?.slug ??
      pathDetails[0].slug,
    [focusSlug, localizedPathDetails],
  );
  const [selectedSlug, setSelectedSlug] = useState(defaultSelectedSlug);
  const [mobileDetailMode, setMobileDetailMode] = useState(false);
  const selected = useMemo(
    () => localizedPathDetails.find((path) => path.slug === selectedSlug) ?? localizedPathDetails[0],
    [localizedPathDetails, selectedSlug],
  );

  const freeCount = localizedPathDetails.filter((path) => path.tier === "free").length;
  const premiumCount = localizedPathDetails.filter((path) => path.tier === "premium").length;
  const relatedPaths = localizedPathDetails.filter((path) => path.slug !== selectedSlug).slice(0, 6);
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

  useEffect(() => {
    if (!localizedPathDetails.some((path) => path.slug === selectedSlug)) {
      setSelectedSlug(localizedPathDetails[0]?.slug ?? pathDetails[0].slug);
    }
  }, [localizedPathDetails, selectedSlug]);

  useEffect(() => {
    if (!focusSlug) return;
    if (!localizedPathDetails.some((path) => path.slug === focusSlug)) return;
    setSelectedSlug(focusSlug);
    if (isMobile) {
      setMobileDetailMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [focusSlug, isMobile, localizedPathDetails]);

  const handleSelectPath = (slug: string) => {
    setSelectedSlug(slug);
    const next = new URLSearchParams(searchParams);
    next.set("focus", slug);
    setSearchParams(next, { replace: true });
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
          {localizedPathDetails.map((path, idx) => {
            const Icon = path.icon;
            const isSelected = selectedSlug === path.slug;
            const isLastAlone = idx === localizedPathDetails.length - 1 && localizedPathDetails.length % 4 !== 0;
            return (
              <button
                key={path.slug}
                type="button"
                onClick={() => handleSelectPath(path.slug)}
                className={`rounded-[24px] border p-4 text-left transition-all ${
                  isSelected
                    ? "border-primary/30 bg-primary/10 shadow-[0_16px_50px_-40px_rgba(255,173,70,0.45)]"
                    : "border-border/30 bg-background/45 hover:border-primary/20 hover:bg-card/55"
                } ${isLastAlone ? "xl:col-span-4 xl:max-w-none" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${path.iconClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <TierBadge tier={path.tier} />
                </div>
                <h3 className="mt-3 font-display text-2xl text-foreground">{path.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {PATH_LONGFORM_BY_SLUG[path.slug]?.shortDescription ?? path.oneLine}
                </p>
                <p className="mt-2 text-xs leading-5 text-foreground/80">
                  {path.tier === "free"
                    ? `${ui.practicePreview}: ${path.content?.practices[0]?.title ?? ui.practicePreviewFallback}`
                    : `${ui.premiumPreview}: ${PATH_LONGFORM_BY_SLUG[path.slug]?.shortDescription ?? path.teaser?.[0] ?? ui.premiumPreviewFallback}`}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">{ui.openAccessPaths}</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{freeCount} {ui.openAccessPathsBody}</p>
          </div>
          <div className="rounded-2xl border border-amber-400/25 bg-amber-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-amber-200">{ui.lockedPaths}</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{premiumCount} {ui.lockedPathsBody}</p>
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
