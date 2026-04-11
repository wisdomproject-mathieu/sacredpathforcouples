import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Crown,
  Feather,
  Flame,
  Heart,
  MoonStar,
  Sparkles,
  Stars,
  Wand2,
  Waves,
} from "lucide-react";

const pathCards = [
  {
    name: "Tantra",
    icon: Sparkles,
    iconClass: "text-fuchsia-300",
    promise: "Body, breath, energy, and consciousness woven into one field of living intimacy.",
    learn: "Presence before performance. Slowness before urgency. Sacred union before automatic habit.",
  },
  {
    name: "Tao",
    icon: Waves,
    iconClass: "text-cyan-300",
    promise: "Natural flow, sensual longevity, and a calmer intelligence inside intimacy.",
    learn: "Less force, more flow. Less strain, more rhythm. Let breath and pacing reshape the whole experience.",
  },
  {
    name: "Polarity",
    icon: Flame,
    iconClass: "text-amber-300",
    promise: "Magnetic difference and conscious contrast brought back to life.",
    learn: "Attraction can awaken when structure, surrender, edge, and devotion become conscious again.",
  },
];

const authorCards = [
  {
    name: "David Deida",
    icon: Compass,
    iconClass: "text-amber-300",
    line: "Polarity, devotion, presence, and the living edge of attraction.",
  },
  {
    name: "Diana Richardson",
    icon: Heart,
    iconClass: "text-rose-300",
    line: "Slow love, soft presence, stillness, and the healing intelligence of relaxed intimacy.",
  },
  {
    name: "Margot Anand",
    icon: Stars,
    iconClass: "text-fuchsia-300",
    line: "Ecstatic Tantra, sacred sensual celebration, and pleasure as a path of awakening.",
  },
  {
    name: "Mantak Chia",
    icon: Compass,
    iconClass: "text-cyan-300",
    line: "Taoist energy cultivation, breath, pacing, and sensual longevity.",
  },
  {
    name: "Barry Long",
    icon: MoonStar,
    iconClass: "text-emerald-300",
    line: "Truth, presence, and a less compulsive way of meeting desire.",
  },
];

const premiumClusters = [
  {
    name: "Sacred Desire",
    icon: Heart,
    iconClass: "text-rose-300",
    summary: "Erotic intelligence, anticipation, polarity, and deeper sensual charge.",
  },
  {
    name: "Heart Devotion",
    icon: MoonStar,
    iconClass: "text-violet-300",
    summary: "Tenderness, reassurance, gratitude, spiritual warmth, and devotional closeness.",
  },
  {
    name: "Emotional Repair",
    icon: Feather,
    iconClass: "text-emerald-300",
    summary: "Guided return after distance, stress, shutdown, resentment, or hurt.",
  },
  {
    name: "Energy Mastery",
    icon: Crown,
    iconClass: "text-orange-300",
    summary: "Advanced pacing, breath, energetic containment, and body-led mastery.",
  },
];

const innovationCards = [
  {
    name: "Wisdom Oracle",
    icon: Wand2,
    iconClass: "text-violet-300",
    summary: "Ask what the couple needs tonight and receive one path, one teacher, one ritual, and one message prompt.",
  },
  {
    name: "Path Prescription",
    icon: Compass,
    iconClass: "text-cyan-300",
    summary: "The Library responds to the current Journey phase and Intimacy Weather.",
  },
  {
    name: "Learn in 60 Seconds",
    icon: BookOpen,
    iconClass: "text-amber-300",
    summary: "Mainstream-friendly fast learning with a deeper layer ready underneath.",
  },
  {
    name: "Audio Journeys",
    icon: Sparkles,
    iconClass: "text-fuchsia-300",
    summary: "Bring voices, atmosphere, and guided immersion into premium learning over time.",
  },
];

const Paths = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Library</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Wisdom for the couple journey</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            The Library should not feel like a shelf of labels. It should feel like a living sanctuary of understanding: quick to enter, deep to explore, and always connected to what the couple needs now.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[28px] border border-border/30 bg-card/45 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-violet-300">Couple Journey</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">The Library should move with the relationship</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Arrival, Softening, Rekindling, Sacred Desire, Healing & Repair, Devotion, Mastery. The Library should eventually surface different paths, teachers, and prompts depending on where the couple is.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Arrival",
              "Softening",
              "Rekindling",
              "Sacred Desire",
              "Healing & Repair",
              "Devotion",
              "Mastery",
            ].map((phase) => (
              <span key={phase} className="rounded-full border border-border/30 bg-background/45 px-3 py-1 text-xs text-muted-foreground">
                {phase}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-primary/15 bg-primary/8 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Go deeper with premium</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Depth, not clutter</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/90">
            Premium should feel like a richer map of intimacy: deeper teachings, stronger path clusters, audio journeys, author depth, guided practices, and more intelligent recommendations.
          </p>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Foundational paths</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">Learn the baseline traditions</h2>
          </div>
          <Link to="/app/space" className="inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16">
            Open the Temple
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {pathCards.map((path) => {
            const Icon = path.icon;
            return (
              <div key={path.name} className="rounded-[28px] border border-border/30 bg-card/45 p-5 transition-all hover:border-primary/20 hover:bg-card/55">
                <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${path.iconClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-2xl text-foreground">{path.name}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{path.promise}</p>
                <div className="mt-4 rounded-[20px] border border-border/30 bg-background/45 p-4 text-sm leading-6 text-foreground/90">
                  {path.learn}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Teachers</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">Featured author depth</h2>
          </div>
          <Link to="/app/authors" className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-4 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60">
            Open author library
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {authorCards.map((author) => {
            const Icon = author.icon;
            return (
              <div key={author.name} className="rounded-[26px] border border-border/30 bg-card/45 p-5 transition-all hover:border-primary/20 hover:bg-card/55">
                <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${author.iconClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-2xl text-foreground">{author.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{author.line}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Premium depth clusters</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Go deeper without showing a wall of locked names</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {premiumClusters.map((cluster) => {
            const Icon = cluster.icon;
            return (
              <div key={cluster.name} className="rounded-[24px] border border-border/30 bg-card/45 p-5">
                <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${cluster.iconClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-2xl text-foreground">{cluster.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{cluster.summary}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Innovations</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">How Sacred Path can beat the category</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {innovationCards.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="rounded-[24px] border border-border/30 bg-card/45 p-5">
                <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${item.iconClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-2xl text-foreground">{item.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.summary}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Paths;
