import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

type Tier = "free" | "premium";

type Teaching = {
  title: string;
  body: string;
};

type Exercise = {
  title: string;
  setup: string;
  steps: string[];
  integration: string;
};

type RelatedPath = {
  name: string;
  note: string;
};

type FreeAuthorContent = {
  heroIntro: string[];
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

const libraryTabs = [
  { to: "/app/paths", label: "Paths" },
  { to: "/app/authors", label: "Authors" },
  { to: "/app/reconnect", label: "Reconnect" },
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
        "David Deida is useful when a relationship still has loyalty and care, but erotic aliveness has thinned out. He translates ancient polarity principles into language modern couples can use tonight.",
        "At his best, Deida is not about rigid roles. He is about conscious contrast, directed presence, and devotional intensity that stays consensual, grounded, and supportive of lasting closeness.",
      ],
      quote: {
        text: "Attraction often returns when partners stop managing each other and start meeting each other with directed, loving presence.",
        source: "Sacred Path editorial summary",
      },
      whyMatters: [
        "He names the gap between companionate love and erotic charge without shaming either partner.",
        "He offers practical language for leadership, receptivity, honesty, and devotion.",
        "He helps long-term couples reintroduce anticipation and tension without abandoning tenderness.",
      ],
      coreTeachings: [
        {
          title: "Presence is erotic",
          body: "The body senses directed attention before the mind finishes analyzing. Presence itself changes desire.",
        },
        {
          title: "Conscious difference creates magnetism",
          body: "Too much sameness can flatten chemistry; conscious contrast can revive it.",
        },
        {
          title: "Devotion and desire reinforce each other",
          body: "Reverence does not weaken erotic life when it is paired with embodied truth.",
        },
        {
          title: "Truth keeps charge alive",
          body: "Hidden resentment and polite avoidance kill attraction faster than conflict does.",
        },
      ],
      modernUse: [
        {
          title: "When routines erase erotic anticipation",
          body: "Create brief transitions from logistics mode to lover mode before touch begins.",
        },
        {
          title: "When communication is strong but chemistry is weak",
          body: "Use embodied leading/receiving rounds instead of more analysis.",
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
        },
        {
          title: "Intensity without consent",
          body: "Edge must stay in dialogue with nervous-system safety and mutual choice.",
        },
        {
          title: "Performance over intimacy",
          body: "If it becomes theater, the body disconnects even when the scene looks dramatic.",
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
        },
      ],
      reflectionPrompts: [
        "Where has our relationship become safe but energetically neutral?",
        "What kind of polarity feels alive without feeling fake?",
        "What truth am I avoiding that is costing us desire?",
        "What devotional action would help my partner feel chosen this week?",
      ],
      relatedPaths: [
        { name: "Polarity", note: "Conscious energetic contrast and devotional edge." },
        { name: "Tantra", note: "Breath and presence to hold charge with depth." },
        { name: "Kama Sutra", note: "Atmosphere and anticipation as erotic architecture." },
      ],
      premiumBanner:
        "Unlock advanced polarity pathways, guided scripts for erotic honesty, and progressive modules that help long-term couples move toward sacred love.",
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
        "Osho's practical value is method, not mythology: bring awareness into sensation, emotion, and relational patterning. His teachings help modern couples move from unconscious reactivity into conscious contact.",
        "He distinguishes suppression from integration. The invitation is neither collapse nor control, but witnessing: feel fully, breathe fully, and remain present so closeness can return naturally.",
      ],
      quote: {
        text: "Love deepens when partners stop controlling inner weather and learn to witness it together.",
        source: "Sacred Path editorial summary",
      },
      whyMatters: [
        "He gives couples permission to feel deeply without dramatizing every emotion.",
        "He reframes intimacy as awareness practice, not only compatibility outcome.",
        "He uses body-led methods that reduce conversational looping.",
      ],
      coreTeachings: [
        { title: "Awareness transforms intensity", body: "Witnessed sensation becomes information, not threat." },
        { title: "The body is the doorway", body: "Breath, sound, and movement reveal truth faster than abstract debate." },
        { title: "Freedom with attunement", body: "Authenticity is strongest when paired with relational care." },
        { title: "Meditation inside intimacy", body: "Stillness and breath can make simple contact feel sacred and clean." },
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
        { title: "Spiritual bypassing", body: "Awareness language should not replace accountability and repair." },
        { title: "Catharsis without integration", body: "Release helps only if behavior and agreements also change." },
        { title: "Boundary blur", body: "Exploration still requires explicit consent and pacing." },
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
        },
      ],
      reflectionPrompts: [
        "What do I suppress in intimacy, and what does it cost us?",
        "Where do I confuse expression with responsibility?",
        "What helps me stay present when sensation rises?",
        "Which 5-minute daily awareness ritual would most help us?",
      ],
      relatedPaths: [
        { name: "Tantra", note: "Sacred embodied awareness and breath-led intimacy." },
        { name: "Tao", note: "Regulated pacing and nourishing sensual flow." },
        { name: "Polarity", note: "Conscious charge shaped with presence." },
      ],
      premiumBanner:
        "Unlock deeper Osho-inspired practices, guided meditative intimacy tracks, and advanced integration pathways for couples growing sacred love as a daily discipline.",
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

const subNavClass =
  "inline-flex items-center rounded-full border border-border/30 bg-background/45 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/20 hover:text-foreground";

const shellCardClass =
  "rounded-[28px] border border-border/30 bg-card/45 p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.46)]";

const badgeByTier: Record<Tier, string> = {
  free: "border-emerald-400/30 bg-emerald-500/12 text-emerald-200",
  premium: "border-amber-400/30 bg-amber-500/12 text-amber-200",
};

const TierBadge = ({ tier }: { tier: Tier }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${badgeByTier[tier]}`}>
    {tier === "free" ? "Free" : <Lock className="h-3.5 w-3.5" aria-label="Locked" />}
  </span>
);

const AuthorHeroCard = ({ author }: { author: Author }) => {
  const Icon = author.icon;

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

      {author.tier === "premium" ? (
        <Link
          to="/pricing"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/18"
        >
          <Lock className="h-4 w-4" />
          Unlock this couple author journey
        </Link>
      ) : null}
    </section>
  );
};

const PremiumMiniCard = () => (
  <section className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.24),transparent_55%),linear-gradient(135deg,rgba(245,158,11,0.18),rgba(15,23,42,0.15))] p-4 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.62)]">
    <div className="flex items-center gap-2 text-amber-200">
      <Lock className="h-4 w-4" />
      <span className="text-xs uppercase tracking-[0.16em]">Locked</span>
    </div>
    <p className="mt-3 text-sm leading-6 text-foreground/90">
      Unlock deeper author journeys with guided partner practices, integration maps, and sacred-love pathways built for real couples.
    </p>
    <div className="mt-3 flex flex-wrap gap-2">
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Guided Journeys</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Practice Scripts</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Sacred Love Paths</span>
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

const FreeAuthorContent = ({ author }: { author: Author }) => {
  if (!author.content) return null;

  const data = author.content;

  return (
    <main className="space-y-5">
      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">1. Hero Intro</p>
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

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">2. Why This Author Matters</p>
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
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">3. Core Teachings</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {data.coreTeachings.map((teaching, index) => (
            <article key={teaching.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-primary/80">Teaching {index + 1}</p>
              <h4 className="mt-2 font-body text-sm text-foreground">{teaching.title}</h4>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{teaching.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">4. What Modern Couples Can Use Today</p>
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
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">5. Shadow / Misuse / What To Avoid</p>
        <div className="mt-4 space-y-3">
          {data.shadowToAvoid.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <h4 className="font-body text-sm text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">6. 3 Practical Exercises</p>
        <div className="mt-4 space-y-4">
          {data.exercises.map((exercise, index) => (
            <article key={exercise.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <div className="text-[11px] uppercase tracking-[0.14em] text-primary/80">Practice {index + 1}</div>
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
              <p className="mt-3 text-sm leading-6 text-primary/85">Integration: {exercise.integration}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">7. Reflection Prompts</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {data.reflectionPrompts.map((prompt) => (
            <article key={prompt} className="rounded-2xl border border-border/25 bg-card/35 p-4 text-sm leading-7 text-foreground/90">
              {prompt}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_58%),linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,23,42,0.08))] p-5 shadow-[0_20px_60px_-42px_rgba(255,173,70,0.58)]">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">8. Locked Library Expansion</p>
        <p className="mt-3 text-sm leading-7 text-foreground/90">{data.premiumBanner}</p>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Advanced author maps</div>
          <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Guided couple practices</div>
          <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Direct Temple bridges</div>
        </div>
        <Link
          to="/pricing"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-500/14 px-4 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
        >
          View premium plans
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
};

const PremiumAuthorContent = ({ author }: { author: Author }) => (
  <main className="space-y-5">
    <section className="rounded-[28px] border border-amber-400/20 bg-gradient-to-br from-amber-500/12 via-background to-background p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.5)]">
      <div className="flex flex-wrap items-center gap-2">
        <TierBadge tier="premium" />
        <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-amber-200">
          Locked Author
        </span>
      </div>
      <h3 className="mt-3 font-display text-3xl text-foreground">{author.name}</h3>
      <p className="mt-3 text-sm leading-7 text-foreground/90">{author.descriptor}</p>
      <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
        {author.teaser?.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <Link
        to="/pricing"
        className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/18"
      >
        <Lock className="h-4 w-4" />
        Unlock this author journey
      </Link>
    </section>

    <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What unlocks for your relationship</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Deep educational modules</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Layered ancient teachings translated for modern couple life and shared growth.</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Practice blocks and scripts</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Ready-to-use exercises, dialogue prompts, and integration steps for immediate closeness.</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Misuse safeguards</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Clear guardrails for consent, pacing, and relational integrity in every practice.</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Cross-path progression</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Mapped links into Paths and Temple routines so couples keep moving forward together.</p>
        </article>
      </div>
    </section>

    <section className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.2),transparent_58%),linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,23,42,0.08))] p-5 shadow-[0_20px_60px_-42px_rgba(255,173,70,0.58)]">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Locked Banner</p>
      <p className="mt-3 text-sm leading-7 text-foreground/90">
        Unlock full author transmissions with depth, warmth, and practical implementation so your relationship can keep moving toward sacred love.
      </p>
      <div className="mt-4 grid gap-2 md:grid-cols-3">
        <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Deep wisdom tracks</div>
        <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Use-tonight prompts</div>
        <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Sacred love progression</div>
      </div>
      <Link
        to="/pricing"
        className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-500/14 px-4 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
      >
        View plans and start trial
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  </main>
);

const Authors = () => {
  const [selectedSlug, setSelectedSlug] = useState("deida");
  const selected = useMemo(() => authors.find((author) => author.slug === selectedSlug) ?? authors[0], [selectedSlug]);

  const freeAuthors = authors.filter((author) => author.tier === "free");
  const premiumAuthors = authors.filter((author) => author.tier === "premium");

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Library · Authors</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Ancient voices for modern couples in real relationship life</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            Read for one minute and feel closer tonight, or study deeply when you have time. Every page is designed to turn timeless wisdom into practical closeness with your partner.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {libraryTabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className={`${subNavClass} ${tab.to === "/app/authors" ? "border-primary/25 bg-primary/10 text-foreground" : ""}`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </section>

      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Authors Overview</p>
        <h2 className="mt-2 font-display text-3xl text-foreground">Choose an author for immediate closeness and deeper shared growth</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {authors.map((author, index) => {
            const Icon = author.icon;
            const isSelected = selectedSlug === author.slug;
            return (
              <button
                key={author.slug}
                type="button"
                onClick={() => setSelectedSlug(author.slug)}
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
                  <div className="flex items-center gap-2">
                    {index === 0 ? (
                      <span className="inline-flex rounded-full border border-primary/30 bg-primary/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-primary/90">
                        Featured first
                      </span>
                    ) : null}
                    <TierBadge tier={author.tier} />
                  </div>
                </div>
                <h3 className="mt-3 font-display text-2xl text-foreground">{author.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{author.overviewLine}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">Free Authors</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{freeAuthors.map((author) => author.name).join(" and ")} are fully open so couples can apply ancient wisdom immediately and feel closer today.</p>
          </div>
          <div className="rounded-2xl border border-amber-400/25 bg-amber-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-amber-200">Locked Authors</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{premiumAuthors.length} locked voices for couples who want more inspiration, deeper wisdom, and a guided path toward sacred love.</p>
          </div>
        </div>
      </section>

      <section className="grid items-start gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24">
          <AuthorHeroCard author={selected} />
          <PremiumMiniCard />
        </aside>

        {selected.tier === "free" ? <FreeAuthorContent author={selected} /> : <PremiumAuthorContent author={selected} />}
      </section>
    </div>
  );
};

export default Authors;
