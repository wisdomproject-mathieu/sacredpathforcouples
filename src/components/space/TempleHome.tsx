import { useEffect, useMemo, useState } from "react";
import {
  Bookmark,
  Cloud,
  Heart,
  MessageCircle,
  Route,
  Sparkles,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();

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
        title: t("temple_home.action.check_in"),
        subtitle: "Name today’s energy",
        iconClass: "text-sky-300",
        cardClass: "from-sky-500/12 to-cyan-500/6",
      },
      {
        key: "rituals",
        icon: Sparkles,
        title: t("temple_home.action.ritual"),
        subtitle: "Choose tonight’s practice",
        iconClass: "text-amber-300",
        cardClass: "from-amber-500/12 to-orange-500/6",
      },
      {
        key: "positions",
        icon: Heart,
        title: t("temple_home.action.positions"),
        subtitle: "Explore body-led closeness",
        iconClass: "text-rose-300",
        cardClass: "from-rose-500/12 to-pink-500/6",
      },
      {
        key: "messages",
        icon: MessageCircle,
        title: t("temple_home.action.message"),
        subtitle: "Send a soft note now",
        iconClass: "text-violet-300",
        cardClass: "from-violet-500/12 to-fuchsia-500/6",
      },
      {
        key: "pathways",
        icon: Route,
        title: t("temple_home.action.pathway"),
        subtitle: "Walk a longer journey",
        iconClass: "text-emerald-300",
        cardClass: "from-emerald-500/12 to-teal-500/6",
      },
    ],
    [t]
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_24px_80px_-42px_rgba(255,173,70,0.45)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Temple Home</p>
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
              {t("temple_home.greeting")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              {t("temple_home.subtitle")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("weather")}
            className="rounded-2xl border border-primary/20 bg-primary/8 px-4 py-3 text-left transition-all hover:border-primary/35 hover:bg-primary/12"
          >
            <div className="text-xs uppercase tracking-[0.22em] text-primary/80">
              {t("temple_home.weather_label")}
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="text-2xl">{myWeather ? weatherEmoji[myWeather.state] || "✦" : "—"}</div>
              <div>
                <div className="text-sm text-foreground">{t("weather.you")}</div>
                <div className="text-xs text-muted-foreground">
                  {myWeather ? t(`weather.${myWeather.state}`) : t("temple_home.check_in_prompt")}
                </div>
              </div>
            </div>
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <button
          type="button"
          onClick={() => onNavigate("weather")}
          className="rounded-[26px] border border-border/30 bg-card/45 p-5 text-left transition-all hover:border-sky-400/30 hover:bg-card/60"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-sky-300">Current weather</p>
              <h3 className="mt-2 font-display text-xl text-foreground">Your emotional climate tonight</h3>
            </div>
            <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-3 text-sky-300">
              <Cloud className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/30 bg-background/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("weather.you")}</div>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-2xl">{myWeather ? weatherEmoji[myWeather.state] || "✦" : "—"}</span>
                <span className="text-sm text-foreground">
                  {myWeather ? t(`weather.${myWeather.state}`) : t("temple_home.check_in_prompt")}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-border/30 bg-background/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("weather.partner")}</div>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-2xl">{partnerWeather ? weatherEmoji[partnerWeather.state] || "✦" : "—"}</span>
                <span className="text-sm text-foreground">
                  {partnerWeather ? t(`weather.${partnerWeather.state}`) : t("weather.waiting")}
                </span>
              </div>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate("rituals")}
          className="rounded-[26px] border border-amber-400/20 bg-gradient-to-br from-amber-500/10 via-card/55 to-background p-5 text-left transition-all hover:border-amber-400/35 hover:from-amber-500/14"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Tonight’s recommendation</p>
              <h3 className="mt-2 font-display text-xl text-foreground">
                {suggestedRitual?.title || "Open the ritual library"}
              </h3>
            </div>
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-3 text-amber-300">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {suggestedRitual?.hook || "Choose a guided ritual to bring attention, breath, and touch back into the evening."}
          </p>

          {suggestedRitual?.duration && (
            <div className="mt-4 inline-flex rounded-full border border-border/30 bg-background/45 px-3 py-1 text-xs text-muted-foreground">
              ⏱ {suggestedRitual.duration}
            </div>
          )}
        </button>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Quick actions</p>
            <h3 className="mt-2 font-display text-2xl text-foreground">Move the relationship gently tonight</h3>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.key}
                type="button"
                onClick={() => onNavigate(action.key)}
                className={`rounded-[24px] border border-border/30 bg-gradient-to-br ${action.cardClass} via-card/50 p-5 text-left transition-all hover:border-primary/25 hover:shadow-[0_20px_60px_-40px_rgba(255,170,70,0.45)]`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className={`rounded-2xl border border-border/30 bg-background/45 p-3 ${action.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Open</span>
                </div>
                <h4 className="mt-4 font-display text-lg text-foreground">{action.title}</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{action.subtitle}</p>
              </button>
            );
          })}
        </div>
      </section>

      {recentAltar && (
        <section>
          <button
            type="button"
            onClick={() => onNavigate("altar")}
            className="w-full rounded-[26px] border border-border/30 bg-card/40 p-5 text-left transition-all hover:border-primary/25 hover:bg-card/55"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-300">{t("temple_home.recent_altar")}</p>
                <h3 className="mt-2 font-display text-xl text-foreground">{recentAltar.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A saved moment is waiting in your shared altar.
                </p>
              </div>
              <div className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/10 p-3 text-fuchsia-300">
                <Bookmark className="h-5 w-5" />
              </div>
            </div>
          </button>
        </section>
      )}
    </div>
  );
};

export default TempleHome;
