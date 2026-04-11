import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Heart, MessageCircle, Sparkles, Stars } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const homeCards = [
  {
    title: "Sacred Library",
    subtitle: "Enter the wisdom that reshapes how two people soften, desire, repair, and return.",
    icon: BookOpen,
    iconClass: "text-violet-300",
    to: "/app/paths",
  },
  {
    title: "Temple",
    subtitle: "Bring breath, truth, ritual, touch, and memory into lived shared practice.",
    icon: MessageCircle,
    iconClass: "text-fuchsia-300",
    to: "/app/space",
  },
  {
    title: "Reconnect",
    subtitle: "Choose a lighter doorway when the relationship needs warmth, softness, or spark again.",
    icon: Heart,
    iconClass: "text-rose-300",
    to: "/app/reconnect",
  },
];

const AppHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState("Waiting to connect your sacred space.");
  const [activityStatus, setActivityStatus] = useState("Nothing new yet. The temple begins to live when both of you enter it.");

  const quotes = useMemo(
    () => [
      {
        author: "David Deida",
        quote: "Love stays alive when truth, depth, and attraction are all still allowed to breathe.",
        note: "Polarity · Presence · Devotion",
      },
      {
        author: "Diana Richardson",
        quote: "The deepest intimacy often begins where effort softens and stillness starts speaking.",
        note: "Softness · Slowness · Sensitivity",
      },
      {
        author: "Margot Anand",
        quote: "Pleasure becomes transformative when it is welcomed consciously and given a sacred container.",
        note: "Ecstasy · Ritual · Awakening",
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

  useEffect(() => {
    if (!user) return;

    const loadStatus = async () => {
      const { data: couple } = await supabase
        .from("couples")
        .select("id, partner_a, partner_b")
        .or(`partner_a.eq.${user.id},partner_b.eq.${user.id}`)
        .maybeSingle();

      if (!couple) {
        setConnectionStatus("Waiting to connect your sacred space.");
        setActivityStatus("Nothing new yet. The temple begins to live when both of you enter it.");
        return;
      }

      const connected = Boolean(couple.partner_a && couple.partner_b);
      setConnectionStatus(connected ? "You and your partner are inside the same temple." : "Your invitation is open. Your partner has not arrived yet.");

      if (!connected) return;

      const [weatherRes, messageRes, altarRes] = await Promise.all([
        supabase
          .from("weather_entries")
          .select("state, user_id, created_at")
          .eq("couple_id", couple.id)
          .neq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1),
        supabase
          .from("partner_messages")
          .select("content, sender_id, created_at")
          .eq("couple_id", couple.id)
          .neq("sender_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1),
        supabase
          .from("altar_items")
          .select("title, created_at")
          .eq("couple_id", couple.id)
          .order("created_at", { ascending: false })
          .limit(1),
      ]);

      const weather = weatherRes.data?.[0];
      const message = messageRes.data?.[0];
      const altar = altarRes.data?.[0];

      if (message) {
        setActivityStatus("Your partner left something in the temple recently. Open Messages and feel what they sent.");
      } else if (weather) {
        setActivityStatus(`Your partner checked in with a ${weather.state} atmosphere. Read the climate before choosing the next move.`);
      } else if (altar) {
        setActivityStatus("Something sacred has been saved in the altar. Return and see what the relationship wanted to remember.");
      } else {
        setActivityStatus("Your shared temple is open. Begin with weather, one soft message, or a small ritual tonight.");
      }
    };

    loadStatus();
  }, [user]);

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/14 via-background to-background p-6 shadow-[0_24px_80px_-40px_rgba(255,170,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sanctuary</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">Sacred Path for Couples</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            A modern sanctuary rooted in ancient wisdom. Learn the sacred paths, then bring them alive in the Temple through breath, touch, truth, devotion, and desire.
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
            Open Sacred Library
          </button>
          <button
            type="button"
            onClick={() => navigate("/app/space")}
            className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-5 py-3 font-body text-sm text-foreground transition-all hover:border-amber-400/35 hover:bg-amber-500/14"
          >
            Rituals
          </button>
          <button
            type="button"
            onClick={() => navigate("/app/connect")}
            className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 px-5 py-3 font-body text-sm text-foreground transition-all hover:border-fuchsia-400/35 hover:bg-fuchsia-500/14"
          >
            Connect with your partner in Temple
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
          <div className="flex items-center gap-2 text-violet-300">
            <Stars className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.22em]">Couple Journey</span>
          </div>
          <h2 className="mt-3 font-display text-3xl text-foreground">Where the relationship is now</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{connectionStatus}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Current status</div>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{connectionStatus}</p>
            </div>
            <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Temple news</div>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{activityStatus}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-amber-300">Living wisdom</div>
          <div className="mt-4 rounded-[24px] border border-border/25 bg-background/45 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{quotes[quoteIndex].author}</div>
            <p className="mt-3 font-display text-2xl leading-relaxed text-foreground">“{quotes[quoteIndex].quote}”</p>
            <p className="mt-4 text-sm text-muted-foreground">{quotes[quoteIndex].note}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Three sacred worlds</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Where to go next</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {homeCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.title}
                type="button"
                onClick={() => navigate(card.to)}
                className="relative overflow-hidden rounded-[26px] border border-border/30 bg-card/45 p-5 text-left transition-all hover:border-primary/25 hover:bg-card/60 hover:shadow-[0_20px_60px_-42px_rgba(255,170,70,0.45)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-60">
                  <div className="absolute -right-8 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                  <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />
                </div>
                <div className="relative">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${card.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-xl text-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AppHome;
