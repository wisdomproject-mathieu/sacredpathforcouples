import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Compass,
  Flame,
  Gem,
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
  badgeClass: string;
  teaser?: string[];
  content?: FreeAuthorContent;
};

type MoreAuthorRow = {
  slug: string;
  name: string;
  line: string;
  tier: Tier;
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
    descriptor: "Polarity, devotional edge, and erotic presence for long-term love.",
    oneLiner:
      "Helps couples recover charge when love is steady but desire has gone flat.",
    overviewLine:
      "Polarity and devotional intimacy for couples who want depth and charge.",
    icon: Flame,
    iconClass: "text-amber-300",
    badgeClass: "border-emerald-400/30 bg-emerald-500/12 text-emerald-200",
    content: {
      heroIntro: [
        "David Deida is useful when a relationship still has love, loyalty, and friendship but erotic aliveness has quietly faded. He gives language to a subtle problem modern couples rarely name: emotional safety can increase while magnetic tension decreases.",
        "His work is not a script for gender performance. At its best, it is a practice of conscious contrast: direction and surrender, devotion and edge, steadiness and fire. The point is not role-play. The point is charge that is loving, consensual, and alive.",
      ],
      quote: {
        text: "Attraction often returns when partners stop managing each other and start meeting each other with directed presence.",
        source: "Sacred Path editorial summary of Deida's core teaching",
      },
      whyMatters: [
        "He names the gap between companionate love and erotic polarity without shaming either partner.",
        "He gives couples practical language for leadership, receptivity, truth, and devotional intensity.",
        "He helps long-term partners bring back anticipation and charge without abandoning tenderness.",
      ],
      coreTeachings: [
        {
          title: "Presence is felt physically",
          body: "The body notices directed attention faster than words. Deep attention often reawakens desire before any explicit technique does.",
        },
        {
          title: "Conscious difference creates magnetism",
          body: "When both partners collapse into the same emotional posture all the time, attraction can flatten. Chosen energetic contrast can restore spark.",
        },
        {
          title: "Devotion and desire can coexist",
          body: "Erotic life does not need to be separate from reverence. The strongest intimacy often combines rawness with care.",
        },
        {
          title: "Truth before strategy",
          body: "Charge dies in politeness and hidden resentment. Honest, kind truth keeps the field alive.",
        },
      ],
      modernUse: [
        {
          title: "When schedules kill anticipation",
          body: "Use Deida's lens to reintroduce ritual transitions between logistical mode and lover mode.",
        },
        {
          title: "When communication is excellent but chemistry is low",
          body: "Move from endless analysis to embodied polarity moments: deliberate leading, deliberate receiving, and breath-led pauses.",
        },
        {
          title: "When one partner over-functions",
          body: "Practice directional leadership in one domain and surrendered trust in another so both partners can feel contrast again.",
        },
      ],
      shadowToAvoid: [
        {
          title: "Stereotypes disguised as spirituality",
          body: "Polarity is not rigid gender coding. If either partner feels reduced to a caricature, the practice has drifted.",
        },
        {
          title: "Using 'edge' to bypass consent",
          body: "Intensity without explicit attunement is not sacred. Erotic charge must stay in dialogue with safety and mutual choice.",
        },
        {
          title: "Performing power instead of embodying love",
          body: "If the relationship becomes theater, nervous systems disconnect. Keep tenderness and repair active.",
        },
      ],
      exercises: [
        {
          title: "Directional Breath Frame (8 minutes)",
          setup:
            "Choose one partner to hold directional structure for the practice while the other receives and mirrors.",
          steps: [
            "Face each other, knees touching or close enough to feel warmth.",
            "Leader sets a simple breathing rhythm for two minutes, receiver follows without correcting.",
            "Switch roles and repeat for two minutes.",
            "Close with one sentence each: 'When you led, I felt…' / 'When you received, I felt…'.",
          ],
          integration: "Repeat twice weekly to restore trust in leading and receiving without overwhelm.",
        },
        {
          title: "Truth + Devotion Check-In (10 minutes)",
          setup:
            "Sit side by side. One hand on your own heart, one hand touching your partner's shoulder or leg.",
          steps: [
            "Partner A names one erotic truth and one devotional commitment.",
            "Partner B reflects back what they heard without argument.",
            "Switch roles.",
            "End by naming one tiny action for the next 24 hours.",
          ],
          integration: "Use when resentment is subtle but growing.",
        },
        {
          title: "Edge Window Practice (6 minutes)",
          setup: "Agree on a gentle intensity level from 1-10 before beginning.",
          steps: [
            "Hold eye contact while one partner gives slow directional touch (arm, face, neck).",
            "Receiver tracks breath and says 'more', 'same', or 'pause'.",
            "Switch roles after three minutes.",
          ],
          integration: "Builds erotic charge without losing co-regulation.",
        },
      ],
      reflectionPrompts: [
        "Where did our relationship become safe but energetically neutral?",
        "What form of polarity feels enlivening to me without feeling fake?",
        "When do I avoid truth to avoid friction, and what does that cost our desire?",
        "What devotional action from me would make my partner feel chosen this week?",
      ],
      relatedPaths: [
        { name: "Polarity", note: "Conscious contrast, leadership, receptivity, and erotic charge." },
        { name: "Tantra", note: "Presence and breath to hold charge without rushing." },
        { name: "Kama Sutra", note: "Atmosphere and anticipation to support erotic expression." },
      ],
      premiumBanner:
        "Unlock guided polarity sequences, communication scripts for erotic truth, and structured pathways for reigniting long-term attraction without losing emotional safety.",
    },
  },
  {
    slug: "osho",
    name: "Osho",
    tier: "free",
    descriptor: "Meditative intimacy, emotional honesty, and aliveness through awareness.",
    oneLiner:
      "Useful for couples who feel numb, over-mental, or disconnected from embodied joy.",
    overviewLine:
      "Awareness-centered Tantra with emotional freedom and meditative intimacy.",
    icon: SunMoon,
    iconClass: "text-fuchsia-300",
    badgeClass: "border-emerald-400/30 bg-emerald-500/12 text-emerald-200",
    content: {
      heroIntro: [
        "Osho's value for modern couples is not ideology but method: bring awareness into the body, into emotion, and into relationship patterns that usually run unconsciously. His approach helps couples who are affectionate but shut down, mentally overloaded, or spiritually hungry.",
        "He emphasizes that suppression and unconscious indulgence are two sides of the same trap. The middle way is witnessing: feel fully, breathe fully, and stay conscious while desire, fear, tenderness, and intensity move through the system.",
      ],
      quote: {
        text: "Love deepens when partners stop controlling their inner weather and learn to witness it together.",
        source: "Sacred Path editorial summary of Osho's relational teaching",
      },
      whyMatters: [
        "He gives couples permission to feel deeply without collapsing into chaos.",
        "He reframes intimacy as an awareness practice, not just a compatibility outcome.",
        "He offers body-based methods that move stuck energy before trying to talk everything through.",
      ],
      coreTeachings: [
        {
          title: "Awareness transforms intensity",
          body: "When sensation is witnessed instead of resisted, it becomes information rather than threat.",
        },
        {
          title: "The body is the doorway",
          body: "Breath, sound, movement, and stillness help couples access truth faster than intellectual debate.",
        },
        {
          title: "Freedom with responsibility",
          body: "Authenticity matters, but so does relational care. Real freedom includes attunement.",
        },
        {
          title: "Meditation inside intimacy",
          body: "Silence, eye contact, and breath can make ordinary touch feel sacred and emotionally clean.",
        },
      ],
      modernUse: [
        {
          title: "When both partners are chronically stressed",
          body: "Use active discharge first (movement, shaking, breath), then connect from regulation instead of tension.",
        },
        {
          title: "When conversations loop without resolution",
          body: "Pause discussion and run a short witnessing ritual so both partners can speak from the present instead of old activation.",
        },
        {
          title: "When desire feels blocked by shame",
          body: "Use compassionate awareness language to normalize sensation without forcing outcomes.",
        },
      ],
      shadowToAvoid: [
        {
          title: "Spiritual bypassing",
          body: "Meditative language should never erase practical accountability, repair, or boundaries.",
        },
        {
          title: "Mistaking catharsis for integration",
          body: "Emotional release can help, but without reflection and behavior change it becomes a repeating cycle.",
        },
        {
          title: "Boundary confusion",
          body: "Conscious exploration still needs explicit consent, pacing, and shared agreements.",
        },
      ],
      exercises: [
        {
          title: "Witnessing Breath (7 minutes)",
          setup: "Sit back-to-back so each partner can feel the other's breath without eye-contact pressure.",
          steps: [
            "Breathe naturally for one minute and notice pace differences without correcting.",
            "Gradually synchronize exhalation for three minutes.",
            "Turn to face each other and keep the same pace for three more minutes.",
          ],
          integration: "Excellent before difficult conversations.",
        },
        {
          title: "Dynamic Shake + Stillness (9 minutes)",
          setup: "Stand with feet grounded and knees soft.",
          steps: [
            "Shake the body for three minutes to release held tension.",
            "Breathe through the mouth and sound softly for two minutes.",
            "Sit in complete stillness for four minutes and notice emotional shifts.",
          ],
          integration: "Use on days with anxiety, irritability, or emotional numbness.",
        },
        {
          title: "Sacred Listening Circle (12 minutes)",
          setup: "Set a timer with two rounds per partner.",
          steps: [
            "Speaker shares what feels alive right now for 2 minutes.",
            "Listener responds with only: 'I hear you. Tell me more.'",
            "Switch and repeat.",
            "Close with one gratitude and one request each.",
          ],
          integration: "Builds emotional honesty without over-processing.",
        },
      ],
      reflectionPrompts: [
        "What do I habitually suppress in intimacy, and what does suppression cost us?",
        "Where do I confuse emotional expression with emotional responsibility?",
        "What helps me feel safe enough to stay present with sensation?",
        "Which daily 5-minute awareness ritual would most improve our relationship climate?",
      ],
      relatedPaths: [
        { name: "Tantra", note: "Breath-led presence and sacred embodied union." },
        { name: "Tao", note: "Nervous-system regulation and nourishing sensual rhythm." },
        { name: "Polarity", note: "Channeling intensity into conscious relational charge." },
      ],
      premiumBanner:
        "Unlock deeper Osho-inspired meditations, relational integration guides, and advanced embodied practices designed for couples who want awareness to become daily intimacy.",
    },
  },
  {
    slug: "mantak-chia",
    name: "Mantak Chia",
    tier: "premium",
    descriptor: "Taoist sexual alchemy, energy circulation, and vitality stewardship.",
    oneLiner: "Learn how couples transform arousal into long-term vitality and deep steadiness.",
    overviewLine:
      "Taoist intimate longevity and micro-practices for energy conservation.",
    icon: Waves,
    iconClass: "text-cyan-300",
    badgeClass: "border-amber-400/30 bg-amber-500/12 text-amber-200",
    teaser: [
      "Mantak Chia's work gives couples a full map for breath, pelvic awareness, and energy circulation that supports intimacy without depletion.",
      "The premium library unpacks beginner-to-advanced partner practices so charge becomes sustainable instead of exhausting.",
      "Includes guided progressions for pacing, containment, and post-intimacy recovery.",
    ],
  },
  {
    slug: "margot-anand",
    name: "Margot Anand",
    tier: "premium",
    descriptor: "Ecstatic Tantra, devotion, and joyful sacred sensual ceremony.",
    oneLiner: "For couples who want erotic celebration with spiritual heart and elegant ritual.",
    overviewLine:
      "Ecstatic sacred sensuality with ceremonial structure for modern partners.",
    icon: Sparkles,
    iconClass: "text-rose-300",
    badgeClass: "border-amber-400/30 bg-amber-500/12 text-amber-200",
    teaser: [
      "Margot Anand helps couples bring play, reverence, and ecstatic ritual into intimacy without losing emotional grounding.",
      "Premium access includes ceremonial templates, sensual preparation, and partner attunement structures.",
      "Ideal for couples who want sensuality that feels devotional, playful, and intentional.",
    ],
  },
  {
    slug: "daniel-odier",
    name: "Daniel Odier",
    tier: "premium",
    descriptor: "Non-dual Tantra, refined attention, and subtle relational presence.",
    oneLiner: "For couples drawn to meditative intimacy and deep stillness inside desire.",
    overviewLine:
      "Subtle Tantra and non-dual intimacy for deeply contemplative couples.",
    icon: Star,
    iconClass: "text-violet-300",
    badgeClass: "border-amber-400/30 bg-amber-500/12 text-amber-200",
    teaser: [
      "Daniel Odier's teachings center on subtle attention, presence, and intimacy as a direct contemplative path.",
      "Premium includes guided stillness practices and paired meditations for couples who prefer depth over performance.",
      "A strong fit for relationships where silence and nuanced sensation matter.",
    ],
  },
  {
    slug: "michaela-boehm",
    name: "Michaela Boehm",
    tier: "premium",
    descriptor: "Embodied relational work, nervous-system literacy, and feminine depth practices.",
    oneLiner: "Learn practical embodiment skills for attraction, regulation, and emotional honesty.",
    overviewLine:
      "Embodiment-driven intimacy and nervous-system intelligence in partnership.",
    icon: Heart,
    iconClass: "text-orange-300",
    badgeClass: "border-amber-400/30 bg-amber-500/12 text-amber-200",
    teaser: [
      "Michaela Boehm bridges somatic work with modern relationship pressure points: overwhelm, shutdown, and attraction fatigue.",
      "Premium includes movement-based partner drills, tension-release protocols, and embodied communication practices.",
      "Best for couples who want grounded transformation, not abstract theory.",
    ],
  },
];

const moreAuthorsRows: MoreAuthorRow[] = [
  {
    slug: "osho",
    name: "Osho",
    line: "Meditative awareness and emotional freedom in intimacy.",
    tier: "free",
  },
  {
    slug: "mantak-chia",
    name: "Mantak Chia",
    line: "Taoist alchemy, breath, and sensual longevity.",
    tier: "premium",
  },
  {
    slug: "margot-anand",
    name: "Margot Anand",
    line: "Ecstatic sacred sensuality and ceremony.",
    tier: "premium",
  },
  {
    slug: "daniel-odier",
    name: "Daniel Odier",
    line: "Subtle Tantra and non-dual presence.",
    tier: "premium",
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
    {tier === "free" ? "Free" : "Premium"}
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
          Unlock this author
        </Link>
      ) : null}
    </section>
  );
};

const MoreAuthorsCard = ({
  selectedSlug,
  onSelect,
}: {
  selectedSlug: string;
  onSelect: (slug: string) => void;
}) => (
  <section className={shellCardClass}>
    <div className="flex items-center justify-between gap-3">
      <h3 className="font-display text-xl text-foreground">More Authors</h3>
      <BookOpen className="h-4 w-4 text-primary/80" />
    </div>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">
      Explore nearby voices without leaving the page.
    </p>

    <div className="mt-4 space-y-2">
      {moreAuthorsRows.map((row) => {
        const isSelected = row.slug === selectedSlug;
        return (
          <button
            key={row.slug}
            type="button"
            onClick={() => onSelect(row.slug)}
            className={`w-full rounded-2xl border p-3 text-left transition-all ${
              isSelected
                ? "border-primary/30 bg-primary/10"
                : "border-border/25 bg-background/45 hover:border-primary/20 hover:bg-card/55"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-body text-sm text-foreground">{row.name}</div>
                <div className="mt-1 text-xs leading-5 text-muted-foreground">{row.line}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <TierBadge tier={row.tier} />
                {row.tier === "free" ? (
                  <ChevronRight className="h-4 w-4 text-primary/70" />
                ) : (
                  <Lock className="h-4 w-4 text-amber-300/90" />
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  </section>
);

const PremiumMiniCard = () => (
  <section className="rounded-[24px] border border-amber-400/20 bg-gradient-to-br from-amber-500/14 via-background/95 to-background p-4">
    <div className="flex items-center gap-2 text-amber-200">
      <Lock className="h-4 w-4" />
      <span className="text-xs uppercase tracking-[0.16em]">Premium</span>
    </div>
    <p className="mt-3 text-sm leading-6 text-foreground/90">
      Unlock the full author library with guided practices, layered teachings, and integration plans.
    </p>
    <Link
      to="/pricing"
      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-500/14 px-3 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
    >
      See premium
      <ArrowRight className="h-4 w-4" />
    </Link>
  </section>
);

const FreeAuthorContent = ({ author }: { author: Author }) => {
  if (!author.content) {
    return null;
  }

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

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">8. Related Paths</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {data.relatedPaths.map((path) => (
            <article key={path.name} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <h4 className="font-body text-sm text-foreground">{path.name}</h4>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{path.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-amber-400/20 bg-amber-500/8 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">9. Premium Library Expansion</p>
        <p className="mt-3 text-sm leading-7 text-foreground/90">{data.premiumBanner}</p>
        <Link
          to="/pricing"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-500/14 px-4 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
        >
          Unlock premium authors
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
        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${author.badgeClass}`}>
          Locked author
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
        Unlock this author in premium
      </Link>
    </section>

    <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What you'll find inside</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Guided educational modules</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Structured lessons that move from foundations to practical integration.
          </p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Couple exercises and scripts</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Partner prompts and embodied drills designed for real nights, not theory-only reading.
          </p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Modern misuse safeguards</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Clear guidance on consent, pacing, and healthy application in contemporary relationships.
          </p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Pathway mapping</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Related paths and progressions so each teaching becomes part of a larger growth arc.
          </p>
        </article>
      </div>
    </section>

    <section className="rounded-[24px] border border-amber-400/20 bg-amber-500/8 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Premium Access</p>
      <p className="mt-3 text-sm leading-7 text-foreground/90">
        Premium turns locked author pages into full mini-libraries with deep context, practical application, and progression plans.
      </p>
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
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Author wisdom, rebuilt as a real learning space</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            Explore substantial author pages with practical relationship guidance, clear structure, and premium depth where you need it.
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
        <h2 className="mt-2 font-display text-3xl text-foreground">Choose an author and go deep</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
                {author.tier === "premium" ? (
                  <p className="mt-3 text-xs leading-5 text-amber-200/90">
                    Rich teaser now, full teachings with premium unlock.
                  </p>
                ) : (
                  <p className="mt-3 text-xs leading-5 text-emerald-200/90">Open access with full educational depth.</p>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">Free authors</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">
              {freeAuthors.map((author) => author.name).join(" and ")} include full educational sections, practices, and reflection prompts.
            </p>
          </div>
          <div className="rounded-2xl border border-amber-400/25 bg-amber-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-amber-200">Premium authors</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">
              {premiumAuthors.map((author) => author.name).join(", ")} are presented with elegant lock teasers and direct inline upgrade paths.
            </p>
          </div>
        </div>
      </section>

      <section className="grid items-start gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24">
          <AuthorHeroCard author={selected} />
          <MoreAuthorsCard selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
          <PremiumMiniCard />
        </aside>

        {selected.tier === "free" ? <FreeAuthorContent author={selected} /> : <PremiumAuthorContent author={selected} />}
      </section>
    </div>
  );
};

export default Authors;
