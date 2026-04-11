import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Compass, Heart, MessageCircle, Sparkles, Users } from "lucide-react";

const AppHome = () => {
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = useMemo(
    () => [
      {
        author: "David Deida",
        quote: "Depth, presence, and polarity are not ideas to admire. They are forces to feel inside the body of a relationship.",
      },
      {
        author: "Diana Richardson",
        quote: "The deepest intimacy often begins where effort softens and stillness starts speaking.",
      },
      {
        author: "Margot Anand",
        quote: "Pleasure becomes transformative when it is welcomed consciously and given a sacred container.",
      },
    ],
    []
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [quotes.length]);

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/14 via-background to-background p-6 shadow-[0_24px_80px_-40px_rgba(255,170,70,0.45)] md:p-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sanctuary</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">Sacred Path for Couples</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            Home should guide the couple: where you are, what you need, what to learn, and what to practice next.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate("/app/space")}
            className="rounded-2xl border border-primary/25 bg-primary/12 px-5 py-3 font-body text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
          >
            Enter the Temple
          </button>
          <button
            type="button"
            onClick={() => navigate("/app/paths")}
            className="rounded-2xl border border-border/35 bg-card/45 px-5 py-3 font-body text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
          >
            Open the Library
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-violet-300">Current journey phase</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Arrival</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            The app should eventually make this dynamic. For now, Home can already frame the couple journey and guide the next move.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Recommended next step</div>
              <p className="mt-2 text-sm text-foreground/90">Check in with Intimacy Weather, then open one soft ritual.</p>
            </div>
            <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Library recommendation</div>
              <p className="mt-2 text-sm text-foreground/90">Read Diana Richardson or Tao first when the couple needs softness and calm.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-300">Wisdom</p>
          <div className="mt-4 rounded-[24px] border border-border/25 bg-background/45 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{quotes[quoteIndex].author}</div>
            <p className="mt-3 font-display text-2xl leading-relaxed text-foreground">“{quotes[quoteIndex].quote}”</p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Three worlds</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Where to go next</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: "Connect",
              desc: "Invite your partner and activate the shared temple space.",
              icon: Users,
              iconClass: "text-emerald-300",
              to: "/app/connect",
            },
            {
              title: "Sacred Library",
              desc: "Learn the paths, teachers, and wisdom that shape the relationship journey.",
              icon: BookOpen,
              iconClass: "text-violet-300",
              to: "/app/paths",
            },
            {
              title: "Temple",
              desc: "Turn what you learn into rituals, messages, positions, and shared practice.",
              icon: MessageCircle,
              iconClass: "text-fuchsia-300",
              to: "/app/space",
            },
            {
              title: "Reconnect",
              desc: "Use lighter tools when you need to restart movement, warmth, or spark.",
              icon: Heart,
              iconClass: "text-rose-300",
              to: "/app/reconnect",
            },
            {
              title: "Pathways",
              desc: "Build progression over time instead of relying only on one-off moments.",
              icon: Compass,
              iconClass: "text-cyan-300",
              to: "/app/space",
            },
            {
              title: "Ritual Tonight",
              desc: "Open one small step now. Presence first. Practice second. Depth follows.",
              icon: Sparkles,
              iconClass: "text-amber-300",
              to: "/app/space",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.title}
                type="button"
                onClick={() => navigate(card.to)}
                className="rounded-[26px] border border-border/30 bg-card/45 p-5 text-left transition-all hover:border-primary/25 hover:bg-card/60 hover:shadow-[0_20px_60px_-42px_rgba(255,170,70,0.45)]"
              >
                <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${card.iconClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.desc}</p>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AppHome;
