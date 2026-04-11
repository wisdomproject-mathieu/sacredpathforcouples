import { useEffect, useMemo, useState } from "react";
import { Bookmark, Cloud, Heart, MessageCircle, Route, Sparkles } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  coupleId: string;
  onNavigate: (tab: string) => void;
}

interface WeatherEntry {
  state: string;
  user_id: string;
  created_at: string;
}

interface AltarItem {
  title: string;
  item_type: string;
  created_at: string;
}

interface RitualItem {
  id: string;
  title: string;
  hook: string | null;
  duration: string | null;
  category: string;
}

const TempleHome = ({ coupleId, onNavigate }: Props) => {
  const { user } = useAuth();
  const [myWeather, setMyWeather] = useState<WeatherEntry | null>(null);
  const [partnerWeather, setPartnerWeather] = useState<WeatherEntry | null>(null);
  const [recentAltar, setRecentAltar] = useState<AltarItem | null>(null);
  const [suggestedRitual, setSuggestedRitual] = useState<RitualItem | null>(null);

  useEffect(() => {
    if (!coupleId || !user) return;

    const today = new Date().toISOString().slice(0, 10);

    const loadWeather = async () => {
      const { data } = await supabase
        .from("weather_entries")
        .select("*")
        .eq("couple_id", coupleId)
        .gte("created_at", today)
        .order("created_at", { ascending: false });

      if (data) {
        const mine = data.find((w: any) => w.user_id === user.id);
        const partner = data.find((w: any) => w.user_id !== user.id);
        if (mine) setMyWeather(mine);
        if (partner) setPartnerWeather(partner);
      }
    };

    const loadAltar = async () => {
      const { data } = await supabase
        .from("altar_items")
        .select("*")
        .eq("couple_id", coupleId)
        .order("created_at", { ascending: false })
        .limit(1);

      if (data && data.length > 0) setRecentAltar(data[0]);
    };

    const loadRitual = async () => {
      const { data } = await supabase
        .from("ritual_items")
        .select("*")
        .eq("premium_required", false)
        .limit(5);

      if (data && data.length > 0) {
        const idx = new Date().getDate() % data.length;
        setSuggestedRitual(data[idx]);
      }
    };

    loadWeather();
    loadAltar();
    loadRitual();
  }, [coupleId, user]);

  const weatherEmoji: Record<string, string> = {
    open: "☀️",
    tender: "💗",
    playful: "✨",
    stressed: "☁️",
    longing: "🌙",
    erotic: "🔥",
    tired: "🫧",
    reassurance: "⚡",
  };

  const quickActions = useMemo(
    () => [
      {
        key: "weather",
        icon: Cloud,
        title: "Read the climate",
        subtitle: "Name the emotional weather before choosing anything else.",
        iconClass: "text-sky-300",
      },
      {
        key: "rituals",
        icon: Sparkles,
        title: "Open a ritual",
        subtitle: "Choose a guided practice for softness, longing, devotion, or desire.",
        iconClass: "text-amber-300",
      },
      {
        key: "positions",
        icon: Heart,
        title: "Enter by the body",
        subtitle: "Use posture, closeness, and charge to open embodied intimacy.",
        iconClass: "text-rose-300",
      },
      {
        key: "messages",
        icon: MessageCircle,
        title: "Send one warm truth",
        subtitle: "A soft sentence can sometimes open more than a whole conversation.",
        iconClass: "text-violet-300",
      },
      {
        key: "pathways",
        icon: Route,
        title: "Walk a deeper path",
        subtitle: "Let tonight become part of a longer journey instead of an isolated moment.",
        iconClass: "text-emerald-300",
      },
      {
        key: "altar",
        icon: Bookmark,
        title: "Remember what opened",
        subtitle: "Save one thing the relationship should not lose.",
        iconClass: "text-orange-300",
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_24px_80px_-42px_rgba(255,173,70,0.45)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Temple Home</p>
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">Begin with what the relationship needs now</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              The Temple should feel like a set of real tools, not only categories. Each doorway should suggest a specific kind of movement: calm, truth, spark, tenderness, devotion, or repair.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("weather")}
            className="rounded-2xl border border-primary/20 bg-primary/8 px-4 py-3 text-left transition-all hover:border-primary/35 hover:bg-primary/12"
          >
            <div className="text-xs uppercase tracking-[0.22em] text-primary/80">Your weather</div>
            <div className="mt-2 flex items-center gap-3">
              <div className="text-2xl">{myWeather ? weatherEmoji[myWeather.state] || "✦" : "—"}</div>
              <div>
                <div className="text-sm text-foreground">{myWeather ? myWeather.state : "Not checked in yet"}</div>
                <div className="text-xs text-muted-foreground">Read the climate first</div>
              </div>
            </div>
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-sky-300">Current climate</p>
          <h3 className="mt-2 font-display text-2xl text-foreground">The relationship atmosphere tonight</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">You</div>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-2xl">{myWeather ? weatherEmoji[myWeather.state] || "✦" : "—"}</span>
                <span className="text-sm text-foreground">{myWeather ? myWeather.state : "Not checked in"}</span>
              </div>
            </div>
            <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Partner</div>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-2xl">{partnerWeather ? weatherEmoji[partnerWeather.state] || "✦" : "—"}</span>
                <span className="text-sm text-foreground">{partnerWeather ? partnerWeather.state : "No check-in yet"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-300">Suggested ritual</p>
          <h3 className="mt-2 font-display text-2xl text-foreground">{suggestedRitual?.title || "Open tonight’s practice"}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {suggestedRitual?.hook || "When you do not know where to begin, let one small guided practice soften the threshold."}
          </p>
          <button
            type="button"
            onClick={() => onNavigate("rituals")}
            className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-foreground transition-all hover:border-amber-400/35 hover:bg-amber-400/14"
          >
            Open rituals
          </button>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Temple tools</p>
          <h3 className="mt-2 font-display text-3xl text-foreground">Choose the tool, not only the category</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.key}
                type="button"
                onClick={() => onNavigate(action.key)}
                className="relative overflow-hidden rounded-[26px] border border-border/30 bg-card/45 p-5 text-left transition-all hover:border-primary/25 hover:bg-card/60"
              >
                <div className="pointer-events-none absolute inset-0 opacity-65">
                  <div className="absolute -right-6 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                  <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />
                </div>
                <div className="relative flex h-full flex-col">
                  <div className={`inline-flex w-fit rounded-2xl border border-border/30 bg-background/45 p-3 ${action.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-4 font-display text-2xl text-foreground">{action.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{action.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Memory</p>
            <h3 className="mt-2 font-display text-2xl text-foreground">What wants to be remembered</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {recentAltar ? recentAltar.title : "After something meaningful happens, save it in the altar so the relationship keeps what it opens."}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Pathway</p>
            <h3 className="mt-2 font-display text-2xl text-foreground">From moment to journey</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Use pathways when the couple needs continuity, not only one beautiful evening. Return, deepen, and let the sacred become lived over time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TempleHome;
