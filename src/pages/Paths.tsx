import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Crown,
  Flame,
  Heart,
  Lock,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";

type Tier = "free" | "premium";

type Pillar = {
  name: string;
  body: string;
};

type Block = {
  title: string;
  body: string;
};

type Practice = {
  title: string;
  setup: string;
  steps: string[];
  integration: string;
};

type RelatedAuthor = {
  name: string;
  tier: Tier;
  note: string;
};

type PathContent = {
  hero: string[];
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
        "Tantric Wisdom is a path of integration. It does not split desire from consciousness or tenderness from intensity. It invites couples to stay present with longing, pleasure, vulnerability, devotion, and silence.",
        "In modern life this means replacing rushed, goal-oriented intimacy with intentional pacing. The point is not to appear spiritual, but to become relationally awake and closer together.",
      ],
      quote: {
        text: "Tantra matures intimacy by turning attention into devotion and sensation into awareness.",
        source: "Sacred Path Tantric Wisdom summary",
      },
      whatItIsNot: [
        "It is not spiritual aesthetics layered over disconnection.",
        "It is not pressure for endless intensity or perfect performance.",
        "It is not permission to bypass consent or emotional accountability.",
      ],
      pillars: [
        { name: "Presence", body: "Returning attention to what is truly alive right now." },
        { name: "Breath", body: "Using breath to regulate emotion, arousal, and safety." },
        { name: "Polarity", body: "Cultivating conscious contrast so charge can move." },
        { name: "Devotion", body: "Holding intimacy with reverence, care, and intention." },
        { name: "Embodied Awareness", body: "Tracking sensation and truth in the body first." },
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
      ],
      misunderstandings: [
        { title: "Tantra equals constant intensity", body: "Real Tantra includes stillness, softness, and pause." },
        { title: "Tantra is only technique", body: "Technique is secondary to awareness quality and relational integrity." },
        { title: "Tantra avoids conflict", body: "It does not remove friction; it gives better ways to meet it." },
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
        },
      ],
      reflections: [
        "Where do we rush instead of arrive?",
        "Which of the five pillars is strongest for us right now?",
        "What would devotion look like in one concrete weekly action?",
        "How can we bring embodied awareness into our conflict cycles?",
      ],
      relatedAuthors: [
        { name: "Osho", tier: "free", note: "Awareness-based intimacy and witnessing." },
        { name: "David Deida", tier: "free", note: "Polarity and devotional edge." },
        { name: "Margot Anand", tier: "premium", note: "Ecstatic ceremony and sacred sensuality." },
      ],
      premiumBanner:
        "Unlock full Tantric Wisdom journeys with guided audio, chakra-informed partner rituals, and progressive tracks that help couples move toward sacred love.",
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
        "Tao is the path of flow. In intimacy it teaches softness, pacing, warmth, and circulation so closeness feels replenishing instead of draining.",
        "It is especially useful for modern couples under stress load. Tao restores rhythm and body trust so partners can reconnect without force.",
      ],
      quote: {
        text: "Taoist intimacy is measured by how nourished you feel after connection, not by how dramatic it looked.",
        source: "Sacred Path Tao summary",
      },
      whatItIsNot: [
        "It is not repression or anti-passion restraint.",
        "It is not emotional detachment disguised as calm.",
        "It is not only solo energetics; it is a partner skillset.",
      ],
      pillars: [
        { name: "Softness", body: "Relaxation enables deeper sensation and better flow." },
        { name: "Breath Rhythm", body: "Breath sets pace and prevents overwhelm." },
        { name: "Conservation", body: "Stewarding energy supports long-term vitality." },
        { name: "Circulation", body: "Distributing warmth through the body reduces depletion." },
        { name: "Nourishment", body: "The aim is restorative intimacy for both partners." },
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
      ],
      misunderstandings: [
        { title: "Slow equals boring", body: "Slow pacing often increases sensitivity and depth." },
        { title: "Conservation equals withholding", body: "Conservation is circulation, not distance." },
        { title: "Tao kills passion", body: "Tao stabilizes passion so it can last." },
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
        },
      ],
      reflections: [
        "Where are we depleting ourselves in intimacy?",
        "What would calmer pacing change for us?",
        "How does my body signal that I need slower rhythm?",
        "What helps me feel replenished after closeness?",
      ],
      relatedAuthors: [
        { name: "Mantak Chia", tier: "premium", note: "Taoist circulation and alchemy." },
        { name: "Osho", tier: "free", note: "Awareness and embodied regulation." },
        { name: "Michaela Boehm", tier: "premium", note: "Somatic relational grounding." },
      ],
      premiumBanner:
        "Unlock advanced Tao pathways for partner breathing maps, circulation work, sensual longevity training, and vitality routines for lasting couple closeness.",
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

const PremiumMiniCard = () => (
  <section className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.24),transparent_55%),linear-gradient(135deg,rgba(245,158,11,0.18),rgba(15,23,42,0.15))] p-4 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.62)]">
    <div className="flex items-center gap-2 text-amber-200">
      <Lock className="h-4 w-4" />
      <span className="text-xs uppercase tracking-[0.16em]">Locked</span>
    </div>
    <p className="mt-3 text-sm leading-6 text-foreground/90">
      Unlock full path journeys with advanced practices, richer context, and direct bridges into sacred-love transformation for couples.
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

const FreePathContent = ({ path }: { path: PathDetail }) => {
  if (!path.content) return null;

  const data = path.content;

  return (
    <main className="space-y-5">
      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">1. What {path.name} Really Is</p>
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

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">2. What {path.name} Is Not</p>
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
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">3. The 5 Pillars</p>
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
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">4. {path.name} For Modern Couples</p>
        <div className="mt-4 space-y-3">
          {data.modernCouples.map((item) => (
            <article key={item.title} className="rounded-2xl border border-primary/20 bg-background/50 p-4">
              <h4 className="font-body text-sm text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">5. Common Misunderstandings</p>
        <div className="mt-4 space-y-3">
          {data.misunderstandings.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <h4 className="font-body text-sm text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">6. 3 Beginner Practices</p>
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
              <p className="mt-3 text-sm leading-6 text-primary/85">Integration: {practice.integration}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">7. Reflection Prompts</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {data.reflections.map((prompt) => (
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
          <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Advanced teachings</div>
          <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Practice progression</div>
          <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Locked guidance</div>
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

const PremiumPathContent = ({ path }: { path: PathDetail }) => (
  <main className="space-y-5">
    <section className="rounded-[28px] border border-amber-400/20 bg-gradient-to-br from-amber-500/12 via-background to-background p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.5)]">
      <div className="flex items-center gap-2">
        <TierBadge tier="premium" />
        <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-amber-200">
          Locked Path
        </span>
      </div>
      <h3 className="mt-3 font-display text-3xl text-foreground">{path.name}</h3>
      <p className="mt-3 text-sm leading-7 text-foreground/90">{path.overviewLine}</p>
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

    <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What unlocks for couples here</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Layered educational map</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Ancient foundations, modern translation, advanced applications, and clear progression.</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Guided exercises</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Practice flows with timing, prompts, and integration checkpoints for immediate use.</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Misunderstanding safeguards</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Clear boundaries for consent, pacing, and healthy couple implementation.</p>
        </article>
        <article className="rounded-2xl border border-border/25 bg-card/35 p-4">
          <h4 className="font-body text-sm text-foreground">Cross-library links</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Related authors, reconnect tools, and next-step continuity for shared growth.
          </p>
        </article>
      </div>
    </section>

    <section className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.2),transparent_58%),linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,23,42,0.08))] p-5 shadow-[0_20px_60px_-42px_rgba(255,173,70,0.58)]">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Locked Banner</p>
      <p className="mt-3 text-sm leading-7 text-foreground/90">
        Unlock complete path transmissions: deeper context, advanced techniques, and guided integration designed for lasting couple closeness and sacred love.
      </p>
      <div className="mt-4 grid gap-2 md:grid-cols-3">
        <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Master-level depth</div>
        <div className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">Use-now guidance</div>
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

const Paths = () => {
  const [selectedSlug, setSelectedSlug] = useState(pathDetails[0].slug);
  const selected = useMemo(() => pathDetails.find((path) => path.slug === selectedSlug) ?? pathDetails[0], [selectedSlug]);

  const freeCount = pathDetails.filter((path) => path.tier === "free").length;
  const premiumCount = pathDetails.filter((path) => path.tier === "premium").length;

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Library · Paths</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Ancient pathways translated for modern couples</h1>
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

      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Paths Overview</p>
        <h2 className="mt-2 font-display text-3xl text-foreground">Choose a path for immediate closeness and long-term sacred growth</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pathDetails.map((path) => {
            const Icon = path.icon;
            const isSelected = selectedSlug === path.slug;
            return (
              <button
                key={path.slug}
                type="button"
                onClick={() => setSelectedSlug(path.slug)}
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
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{path.overviewLine}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">Free Paths</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{freeCount} fully open paths so couples can apply wisdom now and reconnect in the same moment.</p>
          </div>
          <div className="rounded-2xl border border-amber-400/25 bg-amber-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-amber-200">Locked Paths</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{premiumCount} locked paths for deeper inspiration, richer guidance, and a structured journey toward sacred love.</p>
          </div>
        </div>
      </section>

      <section className="grid items-start gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24">
          <PathHeroCard path={selected} />
          <PremiumMiniCard />
        </aside>

        {selected.tier === "free" ? <FreePathContent path={selected} /> : <PremiumPathContent path={selected} />}
      </section>
    </div>
  );
};

export default Paths;
