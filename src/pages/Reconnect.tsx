import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Flame,
  Heart,
  Lock,
  MessageCircleHeart,
  MoonStar,
  PlayCircle,
  Waves,
  type LucideIcon,
} from "lucide-react";

type Tier = "free" | "premium";

type Insight = {
  title: string;
  body: string;
};

type Exercise = {
  title: string;
  setup: string;
  steps: string[];
  integration: string;
};

type RelatedLink = {
  name: string;
  kind: "Path" | "Author";
  note: string;
};

type FreeReconnectContent = {
  heroIntro: string[];
  quote: {
    text: string;
    source: string;
  };
  useWhen: string[];
  whyItWorks: Insight[];
  modernUse: Insight[];
  whatToAvoid: Insight[];
  exercises: Exercise[];
  reflectionPrompts: string[];
  related: RelatedLink[];
  premiumBanner: string;
};

type ReconnectTool = {
  slug: string;
  title: string;
  tier: Tier;
  icon: LucideIcon;
  iconClass: string;
  descriptor: string;
  oneLiner: string;
  overviewLine: string;
  teaser?: string[];
  content?: FreeReconnectContent;
};

const libraryTabs = [
  { to: "/app/paths", label: "Paths" },
  { to: "/app/authors", label: "Authors" },
  { to: "/app/reconnect", label: "Reconnect" },
];

const reconnectTools: ReconnectTool[] = [
  {
    slug: "soft-landing",
    title: "Soft Landing",
    tier: "free",
    icon: MoonStar,
    iconClass: "text-cyan-300",
    descriptor: "A gentle sequence to settle, breathe, and arrive back into each other quickly.",
    oneLiner: "Best when both partners want closeness but feel overstimulated, tired, or far away.",
    overviewLine: "Nervous-system-first reconnection for real-life stress days and fast repair.",
    content: {
      heroIntro: [
        "Soft Landing is the reconnect tool for overloaded evenings. It lowers emotional temperature without draining erotic possibility.",
        "Instead of pushing depth too fast, it creates a believable bridge from stress physiology to relational presence and renewed couple closeness.",
      ],
      quote: {
        text: "When the body feels safer, love becomes easier to feel and easier to offer.",
        source: "Sacred Path Reconnect summary",
      },
      useWhen: [
        "After stressful days, travel, parenting load, or digital overload.",
        "When both partners care but feel emotionally unarrived.",
        "When big conversation would likely backfire tonight.",
      ],
      whyItWorks: [
        { title: "Low demand, high return", body: "It asks for very little effort and quickly creates relational softening." },
        { title: "Regulation before interpretation", body: "Bodies settle first, then communication quality improves naturally." },
        { title: "Protects connection momentum", body: "Small successful contact prevents longer emotional drift." },
      ],
      modernUse: [
        { title: "Weeknight reset", body: "Use as a 10-minute transition ritual before dinner or bedtime." },
        { title: "Post-conflict de-escalation", body: "Run Soft Landing before attempting repair language." },
        { title: "Desire-friendly calm", body: "Calm can become fertile ground for tenderness and erotic openness." },
      ],
      whatToAvoid: [
        { title: "Turning it into performance", body: "Keep it simple; over-optimizing kills its effect." },
        { title: "Forcing disclosure", body: "The goal is arrival, not immediate emotional excavation." },
        { title: "Skipping consent cues", body: "Even gentle tools require mutual pacing and choice." },
      ],
      exercises: [
        {
          title: "3-Breath Arrival",
          setup: "Sit knee-to-knee with one point of hand contact.",
          steps: [
            "Take three long synchronized exhales.",
            "Each partner says: 'Right now my body feels…'.",
            "Each partner says one simple need for tonight.",
          ],
          integration: "Use as a daily micro-ritual.",
        },
        {
          title: "Shoulder Drop Reset",
          setup: "Stand facing each other.",
          steps: [
            "Inhale together and shrug shoulders up.",
            "Exhale and release tension down through feet.",
            "Repeat for five rounds with eye softness.",
          ],
          integration: "Fast reset after commute transitions.",
        },
        {
          title: "One-Minute Presence Loop",
          setup: "Set a one-minute timer.",
          steps: [
            "One partner shares what they appreciate in this moment.",
            "Switch and repeat.",
            "Close with one gentle touch and no analysis.",
          ],
          integration: "Useful when energy is low but connection matters.",
        },
      ],
      reflectionPrompts: [
        "What helps my body feel emotionally reachable?",
        "What is our most reliable 5-minute reconnect habit?",
        "How can we reduce transition friction in daily life?",
        "Where do we expect depth before regulation?",
      ],
      related: [
        { name: "Tao", kind: "Path", note: "Pacing and nervous-system nourishment." },
        { name: "Osho", kind: "Author", note: "Awareness and embodied settling." },
        { name: "Tantric Wisdom", kind: "Path", note: "Presence-first intimacy foundation." },
      ],
      premiumBanner:
        "Unlock guided co-regulation sequences, layered reconnect scripts, and advanced transition rituals for high-pressure seasons in modern couple life.",
    },
  },
  {
    slug: "heart-opening",
    title: "Heart Opening",
    tier: "free",
    icon: Heart,
    iconClass: "text-rose-300",
    descriptor: "A warm route into appreciation, tenderness, reassurance, and emotional closeness.",
    oneLiner: "Ideal when love is present but emotional nourishment has thinned out.",
    overviewLine: "Gratitude-led intimacy recovery couples can use tonight.",
    content: {
      heroIntro: [
        "Heart Opening helps couples move from functional partnership back into felt affection. It is not dramatic repair; it is emotional rewarming.",
        "This tool works especially well when neither partner is hostile, but both feel under-loved or under-seen in modern daily life.",
      ],
      quote: {
        text: "Tenderness grows when appreciation becomes active rather than assumed.",
        source: "Sacred Path Reconnect summary",
      },
      useWhen: [
        "When the relationship feels flat but not fractured.",
        "After practical weeks with little affectionate ritual.",
        "When one or both partners need reassurance and emotional warmth.",
      ],
      whyItWorks: [
        { title: "Creates felt safety", body: "Appreciation lowers defensiveness and opens relational trust." },
        { title: "Builds emotional momentum", body: "Small gratitude loops produce cumulative softening." },
        { title: "Prepares deeper intimacy", body: "Warmth often becomes the foundation for erotic aliveness." },
      ],
      modernUse: [
        { title: "Post-busy-day reconnect", body: "Use before screens and logistics consume the evening." },
        { title: "Repair support", body: "Follow conflict with reassurance and acknowledgement rounds." },
        { title: "Affection restoration", body: "Rebuild touch confidence with low-pressure emotional contact." },
      ],
      whatToAvoid: [
        { title: "Transactional gratitude", body: "Do not use appreciation as hidden leverage." },
        { title: "Over-talking", body: "Keep language simple so the body can stay open." },
        { title: "Skipping reciprocity", body: "Both partners need space to give and receive." },
      ],
      exercises: [
        {
          title: "Three Appreciations Round",
          setup: "Sit side-by-side with gentle touch.",
          steps: [
            "Partner A shares three specific appreciations.",
            "Partner B responds only with 'thank you'.",
            "Switch roles.",
          ],
          integration: "Use twice weekly for emotional warmth maintenance.",
        },
        {
          title: "Hand-on-Heart Mirror",
          setup: "Each partner places one hand on own heart and one on partner's arm.",
          steps: [
            "A says one current feeling and one need.",
            "B mirrors exactly what they heard.",
            "Switch roles.",
          ],
          integration: "Strengthens clarity with kindness.",
        },
        {
          title: "Warm Closure Minute",
          setup: "Use before sleep.",
          steps: [
            "Each partner names one thing they are grateful for today.",
            "Each names one way they felt supported.",
            "Close with 30 seconds of silent touch.",
          ],
          integration: "Prevents slow emotional drift.",
        },
      ],
      reflectionPrompts: [
        "How does my partner best receive appreciation?",
        "What daily tenderness ritual would be sustainable for us?",
        "Where do we assume love instead of expressing it?",
        "What reassurance do I need but rarely ask for clearly?",
      ],
      related: [
        { name: "Osho", kind: "Author", note: "Awareness and emotional honesty." },
        { name: "Tantric Wisdom", kind: "Path", note: "Devotion and presence alignment." },
        { name: "David Deida", kind: "Author", note: "Devotion as living relational practice." },
      ],
      premiumBanner:
        "Unlock deeper heart-devotion reconnect journeys, guided reassurance rituals, and advanced emotional repair pathways for long-term sacred partnership.",
    },
  },
  {
    slug: "playful-spark",
    title: "Playful Spark",
    tier: "free",
    icon: PlayCircle,
    iconClass: "text-amber-300",
    descriptor: "A light route into teasing, flirtation, and relational aliveness for modern couples.",
    oneLiner: "Useful when the relationship feels too serious, practical, or emotionally heavy.",
    overviewLine: "Playful reactivation for chemistry, emotional oxygen, and closeness now.",
    content: {
      heroIntro: [
        "Playful Spark reintroduces levity without losing intimacy. It is a bridge from over-seriousness back into attraction and fun.",
        "The goal is not forced humor. The goal is movement, curiosity, and low-pressure erotic aliveness couples can sustain.",
      ],
      quote: {
        text: "A little play can reopen desire where analysis has exhausted it.",
        source: "Sacred Path Reconnect summary",
      },
      useWhen: [
        "When conversations feel responsible but lifeless.",
        "When attraction feels sleepy, not broken.",
        "When both partners need emotional oxygen before depth.",
      ],
      whyItWorks: [
        { title: "Breaks heavy loops", body: "Play interrupts rigid relational scripts." },
        { title: "Invites spontaneous attraction", body: "Novelty and laughter can quickly increase felt connection." },
        { title: "Builds positive momentum", body: "Light interactions accumulate into stronger emotional tone." },
      ],
      modernUse: [
        { title: "Date-night ignition", body: "Use as a first phase before slower intimacy practices." },
        { title: "After logistical overload", body: "Shift out of project-management dynamic quickly." },
        { title: "Before difficult topics", body: "Soften relational field before heavier dialogue." },
      ],
      whatToAvoid: [
        { title: "Sarcasm as play", body: "Play should increase safety, not disguise criticism." },
        { title: "Forced extroversion", body: "Keep exercises adaptable for quieter personalities." },
        { title: "Escalation pressure", body: "Play does not need to become sexual every time." },
      ],
      exercises: [
        {
          title: "Impossible Request Game",
          setup: "Take turns naming one impossible request and one real desire.",
          steps: [
            "Partner A shares two statements.",
            "Partner B guesses which is real.",
            "Switch roles and repeat.",
          ],
          integration: "Builds playful honesty and desire language.",
        },
        {
          title: "Compliment Roulette",
          setup: "Use a 3-minute timer.",
          steps: [
            "Each partner gives specific, playful compliments.",
            "No repetition allowed.",
            "End with one appreciation that surprised you.",
          ],
          integration: "Great quick reconnection before bed.",
        },
        {
          title: "Mood Shift Touch",
          setup: "Choose playful, tender, or mischievous mood.",
          steps: [
            "Partner A leads one minute of mood-matched touch.",
            "Partner B names what felt best.",
            "Switch roles.",
          ],
          integration: "Reintroduces body confidence and responsiveness.",
        },
      ],
      reflectionPrompts: [
        "What kind of play feels connective for us?",
        "Where has seriousness replaced aliveness?",
        "How can we flirt without pressure?",
        "What helps me stay open while being playful?",
      ],
      related: [
        { name: "Kama Sutra", kind: "Path", note: "Atmosphere and anticipation artistry." },
        { name: "Margot Anand", kind: "Author", note: "Ecstatic playful sacred sensuality." },
        { name: "Polarity", kind: "Path", note: "Playful edge and erotic contrast." },
      ],
      premiumBanner:
        "Unlock advanced playful scripts, anticipation games, and flirtation-to-intimacy bridges designed for long-term couples who want chemistry and sacred warmth back.",
    },
  },
  {
    slug: "sacred-desire",
    title: "Sacred Desire",
    tier: "premium",
    icon: Flame,
    iconClass: "text-orange-300",
    descriptor: "A sensual premium reconnect arc for magnetic tension, devotional longing, and bonded intimacy.",
    oneLiner: "For couples ready to move from reconnection into embodied erotic depth.",
    overviewLine: "Premium reconnect track for long-term attraction renewal and sacred love.",
    teaser: [
      "Restore erotic aliveness with structure and emotional safety.",
      "Blend anticipation, devotion, and embodied desire sequencing for modern partnership.",
      "Premium includes progressive rituals and partner scripts for lasting closeness.",
    ],
  },
  {
    slug: "breath-bridge",
    title: "Breath Bridge",
    tier: "premium",
    icon: Waves,
    iconClass: "text-emerald-300",
    descriptor: "Co-regulation reconnect protocol for moments when words are too sharp or exhausted.",
    oneLiner: "For high-conflict or high-fatigue moments needing physiological reset first.",
    overviewLine: "Premium nervous-system reconnect framework for difficult modern relationship days.",
    teaser: [
      "Use breath-led sequencing to rebuild contact safely after rupture.",
      "Lower activation before attempting complex emotional dialogue together.",
      "Premium includes guided pacing maps and escalation guardrails for couples.",
    ],
  },
  {
    slug: "speak-the-unsent",
    title: "Speak The Unsent",
    tier: "premium",
    icon: MessageCircleHeart,
    iconClass: "text-violet-300",
    descriptor: "A structured language framework for what has been carried but not spoken.",
    oneLiner: "For couples needing honest expression without collapse, shutdown, or blame loops.",
    overviewLine: "Premium communication bridge for unresolved emotional backlog and deeper trust.",
    teaser: [
      "Turn emotional backlog into clear, kind, high-integrity conversation.",
      "Use turn-based scripts that reduce reactivity and defensiveness.",
      "Premium includes repair flows and follow-up integration prompts for lasting closeness.",
    ],
  },
  {
    slug: "polarity-reset",
    title: "Polarity Reset",
    tier: "premium",
    icon: Flame,
    iconClass: "text-rose-300",
    descriptor: "A premium reconnect protocol for rebuilding erotic edge after emotional flattening.",
    oneLiner: "For couples who still love each other but miss charge, anticipation, and directional tension.",
    overviewLine: "Premium edge-restoration track for long-term chemistry renewal and relational devotion.",
    teaser: [
      "Reintroduce conscious leading and receiving dynamics with precision and care.",
      "Use structured polarity drills that preserve consent and emotional safety.",
      "Premium includes step-by-step charge recovery scripts and integration prompts for couples.",
    ],
  },
  {
    slug: "ritual-aftercare",
    title: "Ritual Aftercare",
    tier: "premium",
    icon: MoonStar,
    iconClass: "text-cyan-300",
    descriptor: "A premium post-intimacy and post-conflict integration track that protects relational trust.",
    oneLiner: "For couples who want closeness to stay stable after big emotional or erotic moments.",
    overviewLine: "Premium aftercare system for emotional safety, bonding, and sacred continuity.",
    teaser: [
      "Transform intense moments into secure attachment rather than confusion or crash.",
      "Practice debrief, reassurance, and body-led recovery in a structured format.",
      "Premium includes aftercare templates, check-ins, and next-day integration maps for modern couples.",
    ],
  },
];

const subNavClass =
  "inline-flex items-center rounded-full border border-border/30 bg-background/45 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/20 hover:text-foreground";

const shellCardClass =
  "rounded-[28px] border border-border/30 bg-card/45 p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.46)]";

const tierBadgeClass: Record<Tier, string> = {
  free: "border-emerald-400/30 bg-emerald-500/12 text-emerald-200",
  premium: "border-amber-400/30 bg-amber-500/12 text-amber-200",
};

const TierBadge = ({ tier }: { tier: Tier }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${tierBadgeClass[tier]}`}>
    {tier === "free" ? "Free" : <Lock className="h-3.5 w-3.5" aria-label="Locked" />}
  </span>
);

const ReconnectHeroCard = ({ tool }: { tool: ReconnectTool }) => {
  const Icon = tool.icon;

  return (
    <section className={shellCardClass}>
      <div className="flex items-start justify-between gap-3">
        <div className={`inline-flex rounded-2xl border border-border/30 bg-background/55 p-3 ${tool.iconClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <TierBadge tier={tool.tier} />
      </div>
      <h2 className="mt-4 font-display text-3xl text-foreground">{tool.title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{tool.descriptor}</p>
      <p className="mt-3 text-sm leading-6 text-foreground/90">{tool.oneLiner}</p>
      {tool.tier === "premium" ? (
        <Link
          to="/pricing"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/18"
        >
          <Lock className="h-4 w-4" />
          Unlock this reconnect journey
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
      Unlock reconnect systems with high-impact scripts, guided pacing, and advanced recovery pathways that move couples toward sacred love.
    </p>
    <div className="mt-3 flex flex-wrap gap-2">
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Guided Scripts</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Repair Tools</span>
      <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Sacred Love Bridges</span>
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

const FreeReconnectContent = ({ tool }: { tool: ReconnectTool }) => {
  if (!tool.content) return null;

  const data = tool.content;

  return (
    <main className="space-y-5">
      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">1. Hero Intro</p>
        <h3 className="mt-2 font-display text-3xl text-foreground">{tool.title}</h3>
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
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">2. Use It When</p>
        <div className="mt-4 space-y-3">
          {data.useWhen.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground/90">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">3. Why This Tool Works</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {data.whyItWorks.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <h4 className="font-body text-sm text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">4. Modern Application</p>
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
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">5. Misuse / What To Avoid</p>
        <div className="mt-4 space-y-3">
          {data.whatToAvoid.map((item) => (
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
              <p className="text-[11px] uppercase tracking-[0.14em] text-primary/80">Practice {index + 1}</p>
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
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">8. Locked Banner</p>
        <p className="mt-3 text-sm leading-7 text-foreground/90">{data.premiumBanner}</p>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Repair scripts</div>
          <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Guided progression</div>
          <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Daily integration</div>
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

const PremiumReconnectContent = ({ tool }: { tool: ReconnectTool }) => (
  <main className="space-y-5">
    <section className="rounded-[28px] border border-amber-400/20 bg-gradient-to-br from-amber-500/12 via-background to-background p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.5)]">
      <div className="flex items-center gap-2">
        <TierBadge tier="premium" />
        <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-amber-200">
          Locked Tool
        </span>
      </div>
      <h3 className="mt-3 font-display text-3xl text-foreground">{tool.title}</h3>
      <p className="mt-3 text-sm leading-7 text-foreground/90">{tool.overviewLine}</p>
      <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
        {tool.teaser?.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <Link
        to="/pricing"
        className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/18"
      >
        <Lock className="h-4 w-4" />
        Unlock this reconnect track
      </Link>
    </section>

    <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What unlocks for your relationship</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Structured scripts</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Turn emotional complexity into safe, guided communication flow couples can trust.</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Guided partner practices</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Audio-led reconnect sequences for difficult and high-intensity moments.</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Advanced progression</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Move from basic reconnect into deeper repair and intimacy renewal that lasts.
          </p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Cross-library integration</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Linked Paths and Authors recommendations so partners keep growing together.
          </p>
        </article>
      </div>
    </section>

    <section className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.2),transparent_58%),linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,23,42,0.08))] p-5 shadow-[0_20px_60px_-42px_rgba(255,173,70,0.58)]">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Locked Banner</p>
      <p className="mt-3 text-sm leading-7 text-foreground/90">
        Unlock reconnect tracks into complete transformation systems, with guided structure from rupture to trust and from distance to sacred closeness.
      </p>
      <div className="mt-4 grid gap-2 md:grid-cols-3">
        <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Structured recovery</div>
        <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Use-now guidance</div>
        <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Sacred love momentum</div>
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

const Reconnect = () => {
  const [selectedSlug, setSelectedSlug] = useState("soft-landing");
  const selected = useMemo(
    () => reconnectTools.find((tool) => tool.slug === selectedSlug) ?? reconnectTools[0],
    [selectedSlug],
  );

  const freeCount = reconnectTools.filter((tool) => tool.tier === "free").length;
  const premiumCount = reconnectTools.filter((tool) => tool.tier === "premium").length;

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Library · Reconnect</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Ancient reconnect wisdom for modern relationship moments</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            Read, apply, and feel closer right away. Then return for deeper tracks and premium guidance that help your relationship keep moving toward sacred love.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {libraryTabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className={`${subNavClass} ${tab.to === "/app/reconnect" ? "border-primary/25 bg-primary/10 text-foreground" : ""}`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </section>

      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Reconnect Overview</p>
        <h2 className="mt-2 font-display text-3xl text-foreground">Choose the reconnect track your relationship needs right now</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reconnectTools.map((tool) => {
            const Icon = tool.icon;
            const isSelected = selectedSlug === tool.slug;
            return (
              <button
                key={tool.slug}
                type="button"
                onClick={() => setSelectedSlug(tool.slug)}
                className={`rounded-[24px] border p-4 text-left transition-all ${
                  isSelected
                    ? "border-primary/30 bg-primary/10 shadow-[0_16px_50px_-40px_rgba(255,173,70,0.45)]"
                    : "border-border/30 bg-background/45 hover:border-primary/20 hover:bg-card/55"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${tool.iconClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <TierBadge tier={tool.tier} />
                </div>
                <h3 className="mt-3 font-display text-2xl text-foreground">{tool.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.overviewLine}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">Free Reconnect Tracks</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{freeCount} fully open guides so couples can shift from distance to connection in minutes.</p>
          </div>
          <div className="rounded-2xl border border-amber-400/25 bg-amber-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-amber-200">Locked Reconnect Tracks</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{premiumCount} locked tracks with deeper support, richer wisdom, and guided progression toward sacred partnership.</p>
          </div>
        </div>
      </section>

      <section className="grid items-start gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24">
          <ReconnectHeroCard tool={selected} />
          <PremiumMiniCard />
        </aside>

        {selected.tier === "free" ? <FreeReconnectContent tool={selected} /> : <PremiumReconnectContent tool={selected} />}
      </section>
    </div>
  );
};

export default Reconnect;
