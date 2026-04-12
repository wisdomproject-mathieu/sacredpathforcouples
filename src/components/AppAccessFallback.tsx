import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake, Sparkles } from "lucide-react";

const AppAccessFallback = () => (
  <div className="min-h-screen bg-background px-4 py-10 text-foreground">
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Path App</p>
        <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">The app is live and ready</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          Enter the couple experience first, then move into Sacred Library and Temple tools. Connection is a core pillar of the product.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/connect"
            className="inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/15 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/45 hover:bg-primary/20"
          >
            <HeartHandshake className="h-4 w-4" />
            Connect with Partner
          </Link>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
          >
            Enter App Account
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
          >
            Continue without account
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-[24px] border border-border/30 bg-card/45 p-5">
          <div className="inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 text-fuchsia-300">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-display text-2xl text-foreground">Two equal pillars</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Sacred wisdom library and couple connection tools now coexist at top level. Neither replaces the other.
          </p>
        </article>
        <article className="rounded-[24px] border border-border/30 bg-card/45 p-5">
          <div className="inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 text-rose-300">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-display text-2xl text-foreground">Partner flow first</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Your Couple Code, shared emotional weather, The Unsaid, and The Thread are restored as first-class entry points.
          </p>
        </article>
      </section>
    </div>
  </div>
);

export default AppAccessFallback;
