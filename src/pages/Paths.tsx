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
    promise: "The path of weaving — body, breath, energy, and consciousness united in sacred intimacy.",
    learn: "Enter Tantra when the relationship wants more presence, deeper union, and a slower, more luminous form of closeness.",
  },
  {
    name: "Tao",
    icon: Waves,
    iconClass: "text-cyan-300",
    promise: "The path of natural flow — softness, pacing, sensual longevity, and vitality that nourishes life.",
    learn: "Enter Tao when the couple needs calm, regulation, breath, rhythm, and intimacy that restores instead of depletes.",
  },
  {
    name: "Polarity",
    icon: Flame,
    iconClass: "text-amber-300",
    promise: "The path of magnetic difference — attraction renewed through conscious contrast, edge, and devotion.",
    learn: "Enter Polarity when love is present but charge has flattened and the relationship needs more aliveness again.",
  },
];

const authorCards = [
  {
    name: "David Deida",
    icon: Compass,
    iconClass: "text-amber-300",
    line: "Depth, polarity, presence, and the living edge between two lovers.",
  },
  {
    name: "Diana Richardson",
    icon: Heart,
    iconClass: "text-rose-300",
    line: "Slow love, soft presence, and stillness as one of intimacy’s deepest doorways.",
  },
  {
    name: "Margot Anand",
    icon: Stars,
    iconClass: "text-fuchsia-300",
    line: "Ecstatic Tantra, sacred pleasure, and awakening through conscious sensuality.",
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
    line: "Truth, presence, and a less compulsive, more conscious relationship to desire.",
  },
];

const premiumClusters = [
  {
    name: "Sacred Desire",
    icon: Heart,
    iconClass: "text-rose-300",
    summary: "Erotic intelligence, anticipation, magnetic charge, and deeper sensual aliveness.",
  },
  {
    name: "Heart Devotion",
    icon: MoonStar,
    iconClass: "text-violet-300",
    summary: "Tenderness, reassurance, gratitude, reverence, and spiritual warmth between two people.",
  },
  {
    name: "Emotional Repair",
    icon: Feather,
    iconClass: "text-emerald-300",
    summary: "Returning after stress, distance, shutdown, misattunement, or hurt.",
  },
  {
    name: "Energy Mastery",
    icon: Crown,
    iconClass: "text-orange-300",
    summary: "Advanced pacing, breath, circulation, and body-led sacred intimacy.",
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
    summary: "The Library responds to the current Journey phase and the emotional climate in the Temple.",
  },
  {
    name: "Learn in 60 Seconds",
    icon: BookOpen,
    iconClass: "text-amber-300",
    summary: "Mainstream-friendly entry without losing the ancient wisdom beneath it.",
  },
  {
    name: "Audio Journeys",
    icon: Sparkles,
    iconClass: "text-fuchsia-300",
    summary: "Bring voices, atmosphere, and immersive sacred guidance into premium learning.",
  },
];

const cardClass =
  "relative overflow-hidden rounded-[26px] border border-border/30 bg-card/45 p-5 transition-all hover:border-primary/25 hover:bg-card/60 hover:shadow-[0_20px_60px_-42px_rgba(255,170,70,0.45)]";

const Paths = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Library</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Ancient wisdom for the sacred life of a couple</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            Enter the Library when you want to understand what the relationship needs, which path to walk, which teacher to trust, and how to bring that wisdom back into the Temple tonight.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[28px] border border-border/30 bg-card/45 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-violet-300">Library purpose</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Learn quickly. Feel deeply. Practice tonight.</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            The Library should not feel like a shelf of labels. It should feel like a sensual map of understanding: clear enough for mainstream couples, deep enough to keep the sacred baseline alive.
          </p>
        </div>

        <div className="rounded-[28px] border border-primary/15 bg-primary/8 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Go deeper with premium</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">A richer map, not a harder wall</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/90">
            Premium should feel like entering a deeper sanctum: more teachings, more sensual detail, more guided journeys, more audio, more pathways, and more refined temple recommendations.
          </p>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Foundational paths</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">The first sacred doorways</h2>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {pathCards.map((path) => {
            const Icon = path.icon;
            return (
              <div key={path.name} className={cardClass}>
                <div className="pointer-events-none absolute inset-0 opacity-60">
                  <div className="absolute -right-8 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                  <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />
                </div>
                <div className="relative">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${path.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-foreground">{path.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{path.promise}</p>
                  <div className="mt-4 rounded-[20px] border border-border/30 bg-background/45 p-4 text-sm leading-6 text-foreground/90">
                    {path.learn}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-7">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Deeper sanctum</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Go deeper into the sacred path</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Unlock the deeper teachings, the more intimate guidance, the richer path clusters, and the audio journeys that turn knowledge into devotion, practice, and transformation over time.
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/pricing" className="inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16">
            Explore premium depth
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/app/authors" className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60">
            Open author library
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Featured teachers</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Voices that shape the relationship</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {authorCards.map((author) => {
            const Icon = author.icon;
            return (
              <div key={author.name} className={cardClass}>
                <div className="pointer-events-none absolute inset-0 opacity-60">
                  <div className="absolute -right-8 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                  <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />
                </div>
                <div className="relative">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${author.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-foreground">{author.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{author.line}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Premium depth clusters</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Four deeper currents</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {premiumClusters.map((cluster) => {
            const Icon = cluster.icon;
            return (
              <div key={cluster.name} className={cardClass}>
                <div className="pointer-events-none absolute inset-0 opacity-60">
                  <div className="absolute -right-8 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                  <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />
                </div>
                <div className="relative">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${cluster.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-foreground">{cluster.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{cluster.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Innovations</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">What can make Sacred Path the best</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {innovationCards.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className={cardClass}>
                <div className="pointer-events-none absolute inset-0 opacity-60">
                  <div className="absolute -right-8 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                  <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />
                </div>
                <div className="relative">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${item.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-foreground">{item.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Paths;
