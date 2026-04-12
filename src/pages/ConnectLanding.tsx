import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake, Lock, MessageCircleHeart, Sparkles, Users } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useSeoMetadata } from "@/lib/seo";

const modules = [
  {
    title: "1. Your Couple Code",
    body: "Create a shared code that links both partners into one private couple space.",
  },
  {
    title: "2. Join Partner",
    body: "Enter your partner's code and activate your shared journey in seconds.",
  },
  {
    title: "3. Intimacy Weather",
    body: "Name your emotional climate before touch so connection meets reality, not assumptions.",
  },
  {
    title: "4. The Unsaid",
    body: "Write what feels difficult to say before it hardens into distance or resentment.",
  },
  {
    title: "5. The Thread",
    body: "Leave one gratitude, one truth, or one tenderness line and let connection compound daily.",
  },
];

const ConnectLanding = () => {
  const { user } = useAuth();
  const primaryTarget = user ? "/app/connect" : "/auth";

  useSeoMetadata({
    title: "Connect with Partner",
    description:
      "Create a couple code, join your partner, and unlock Intimacy Weather, The Unsaid, and The Thread as a shared relationship flow.",
    path: "/connect",
    surface: "marketing",
    noIndex: false,
  });

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-foreground">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Partner Flow</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Connect with Partner</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            Shared code. Shared rituals. Shared emotional state. Difficult truth. Gratitude thread. This is a core product pillar, not a side feature.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={primaryTarget}
              className="inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/15 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/45 hover:bg-primary/20"
            >
              <HeartHandshake className="h-4 w-4" />
              Connect with Partner
            </Link>
            <Link
              to="/app/connect"
              className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              Join Partner
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

        <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Shared Couple Experience</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {modules.map((module) => (
              <article key={module.title} className="rounded-[22px] border border-border/30 bg-background/45 p-4">
                <h2 className="font-display text-xl text-foreground">{module.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{module.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[24px] border border-border/30 bg-card/45 p-5">
            <div className="inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 text-cyan-300">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-2xl text-foreground">Shared first, premium after</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              The first connection experience is visible immediately. Premium deepens the journey, it does not hide entry.
            </p>
          </article>
          <article className="rounded-[24px] border border-border/30 bg-card/45 p-5">
            <div className="inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 text-fuchsia-300">
              <MessageCircleHeart className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-2xl text-foreground">The Unsaid and The Thread</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Preserve difficult truth and daily gratitude so intimacy remains alive between major moments.
            </p>
          </article>
          <article className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_58%),linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,23,42,0.12))] p-5">
            <div className="inline-flex rounded-2xl border border-amber-300/35 bg-amber-500/14 p-3 text-amber-200">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-2xl text-foreground">Premium couple acceleration</h3>
            <p className="mt-2 text-sm leading-7 text-foreground/90">
              Upgrade for deeper shared pathways, expanded reconnect scripts, and richer couple intelligence over time.
            </p>
            <Link
              to="/pricing"
              className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-amber-300/35 bg-amber-500/14 px-4 py-2 text-sm text-foreground transition-all hover:border-amber-300/50 hover:bg-amber-500/20"
            >
              View Premium Plans
              <Sparkles className="h-4 w-4" />
            </Link>
          </article>
        </section>
      </div>
    </div>
  );
};

export default ConnectLanding;
