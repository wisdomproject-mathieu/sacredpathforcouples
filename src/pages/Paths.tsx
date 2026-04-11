import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  Crown,
  Feather,
  Flame,
  Heart,
  MoonStar,
  Sparkles,
  Stars,
  Waves,
} from "lucide-react";

const foundationalPaths = [
  {
    name: "Tantra",
    icon: Sparkles,
    iconClass: "text-fuchsia-300",
    line: "Body, breath, energy, and consciousness woven into one living field of intimacy.",
  },
  {
    name: "Tao",
    icon: Waves,
    iconClass: "text-cyan-300",
    line: "Natural flow, sensual longevity, softness, rhythm, and vitality that nourishes life.",
  },
  {
    name: "Polarity",
    icon: Flame,
    iconClass: "text-amber-300",
    line: "Magnetic difference, devotion, edge, and the charge that lives in conscious contrast.",
  },
];

const teacherTeasers = [
  {
    name: "David Deida",
    icon: Compass,
    iconClass: "text-amber-300",
    line: "Polarity, presence, depth, surrender, and the electric tension between two lovers.",
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
    line: "Ecstatic Tantra, sacred sensual celebration, and pleasure as awakening.",
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
    summary: "Returning after distance, stress, shutdown, resentment, or hurt with more softness and truth.",
  },
  {
    name: "Energy Mastery",
    icon: Crown,
    iconClass: "text-orange-300",
    summary: "Advanced pacing, breath, energetic containment, and body-led sacred intimacy.",
  },
];

const glowCard =
  "relative overflow-hidden rounded-[26px] border border-border/30 bg-card/45 p-5 transition-all hover:border-primary/25 hover:bg-card/60 hover:shadow-[0_20px_60px_-42px_rgba(255,170,70,0.45)]";

const Paths = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Library</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Ancient wisdom for the sacred life of a couple</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            The Library is where two people learn the deeper languages of intimacy: how to soften, how to breathe together, how to repair, how to desire more consciously, and how to make the relationship feel both sacred and alive.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[28px] border border-border/30 bg-card/45 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-violet-300">What the Library is for</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Understand quickly. Feel drawn in. Practice tonight.</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            The Library should never feel like a pile of labels. It should help the user understand what each path offers, who each teacher helps, and what to bring into the Temple next.
          </p>
        </div>

        <div className="rounded-[28px] border border-primary/15 bg-primary/8 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-primary/80">How to use it</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Learn by path. Deepen by teacher.</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/90">
            Start with the foundational paths. Then meet the teachers who shaped those worlds. Finally, go deeper with premium when the relationship is ready for richer guidance.
          </p>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Foundational paths</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">The first sacred doorways</h2>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {foundationalPaths.map((path) => {
            const Icon = path.icon;
            return (
              <div key={path.name} className={glowCard}>
                <div className="pointer-events-none absolute inset-0 opacity-60">
                  <div className="absolute -right-8 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                  <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />
                </div>
                <div className="relative">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${path.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-foreground">{path.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{path.line}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[30px] border border-border/30 bg-card/45 p-6 md:p-7">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.22em] text-fuchsia-300">Featured path</p>
          <h2 className="mt-2 font-display text-4xl text-foreground">Tantra</h2>
          <p className="mt-3 text-base leading-8 text-foreground/90">
            Tantra is the path of weaving. Body, breath, energy, emotion, and consciousness are not separated here. The body is not an obstacle to awakening; it becomes one of the instruments of it. Instead of rushing toward a result, Tantra invites lovers to inhabit the moment so completely that presence itself becomes intimate, sacred, and deeply alive.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-4">
            <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">What it is</div>
              <p className="mt-3 text-sm leading-7 text-foreground/90">
                Tantra asks the couple to slow down enough to feel more. It transforms intimacy from something automatic into something conscious. Breath matters. Presence matters. Slowness matters. Desire is not rejected; it is entered more fully, so that it becomes part of a larger field of connection, reverence, and awakening.
              </p>
            </div>

            <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">What it is not</div>
              <p className="mt-3 text-sm leading-7 text-foreground/90">
                It is not performance spirituality, not decorative exoticism, and not a rush toward intensity. It is not about appearing evolved. It is about becoming more present, more embodied, and more willing to let the relationship become a place of truth and transformation.
              </p>
            </div>

            <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Who it helps most</div>
              <div className="mt-4 space-y-3">
                {[
                  "Couples who feel rushed, patterned, or emotionally undernourished in intimacy and want more depth, reverence, and full-bodied connection.",
                  "Partners who are drawn to sacred union, breath, polarity, energy, chakras, and the sense that sensuality can become spiritual without losing warmth or aliveness.",
                  "Couples who want to transform longing, tenderness, frustration, desire, and emotional charge into deeper union instead of treating those states as interruptions.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground/90">
                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Three core principles</div>
              <div className="mt-3 space-y-3">
                {[
                  "Presence before performance — the quality of attention changes everything.",
                  "Slowness creates depth — when urgency softens, sensitivity increases.",
                  "Breath guides energy — breath becomes the bridge between body, emotion, and intimacy.",
                ].map((item, index) => (
                  <div key={item} className="rounded-2xl border border-border/25 bg-card/35 p-4">
                    <div className="text-[11px] uppercase tracking-[0.14em] text-primary/80">Principle {index + 1}</div>
                    <p className="mt-2 text-sm leading-6 text-foreground/90">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-primary/15 bg-primary/8 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Practices inside the path</div>
              <div className="mt-3 space-y-3 text-sm leading-7 text-foreground/90">
                <p><strong>The Arrival:</strong> do nothing except truly arrive. Sit facing each other and let presence become enough.</p>
                <p><strong>Yab-Yum:</strong> face-to-face seated union, breathing in stillness until the shared field becomes stronger than urgency.</p>
                <p><strong>Shakti Wave:</strong> stillness meets movement, witnessing meets expression, and the body becomes part of the ritual.</p>
              </div>
            </div>

            <div className="rounded-[24px] border border-amber-400/15 bg-amber-500/6 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-amber-300">Go deeper with premium</div>
              <p className="mt-3 text-sm leading-7 text-foreground/90">
                Unlock deeper tantric teachings, richer rituals, chakra-based journeys, sacred touch sequences, audio guidance, and a fuller map of how Tantra can shape the relationship over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-7">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Deeper sanctum</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Go deeper into the sacred path</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Premium should feel like entering a richer chamber of the Library: more detail, more sensual nuance, more guidance, more voice, more pathway, more sacred atmosphere.
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/pricing" className="inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16">
            Explore premium depth
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Teacher voices</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">The guides behind the paths</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            Paths give the relationship a language. Teachers give that language a voice. Enter the author library when you want to understand who shaped each current and what each voice can bring to your relationship.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {teacherTeasers.map((author) => {
            const Icon = author.icon;
            return (
              <div key={author.name} className={glowCard}>
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

        <div className="mt-5">
          <Link to="/app/authors" className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60">
            Enter the author library
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Premium depth clusters</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">What opens deeper inside the library</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {premiumClusters.map((cluster) => {
            const Icon = cluster.icon;
            return (
              <div key={cluster.name} className={glowCard}>
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
    </div>
  );
};

export default Paths;
