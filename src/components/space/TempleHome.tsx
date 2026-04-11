import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Cloud, Sparkles, MessageCircle, Route, Bookmark, ChevronRight } from "lucide-react";

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
    open: "☀️", tender: "💗", playful: "✨", stressed: "☁️",
    longing: "🌙", erotic: "🔥", tired: "😴", reassurance: "🤲",
  };

  return (
    <div className="px-5 py-6 max-w-xl mx-auto space-y-6">
      {/* Greeting */}
      <div className="text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-2">
          {t("temple_home.greeting")}
        </h2>
        <p className="text-base md:text-lg text-muted-foreground font-body">
          {t("temple_home.subtitle")}
        </p>
      </div>

      {/* Weather Status */}
      <div
        onClick={() => onNavigate("weather")}
        className="rounded-2xl border border-border/40 bg-card/50 p-5 cursor-pointer hover:border-primary/30 transition-all"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-body uppercase tracking-[0.2em] text-primary">
            {t("temple_home.weather_label")}
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center flex-1">
            <p className="text-xs text-muted-foreground font-body mb-1">{t("weather.you")}</p>
            <p className="text-3xl">{myWeather ? weatherEmoji[myWeather.state] || "✦" : "—"}</p>
            <p className="text-sm font-body text-foreground mt-1">
              {myWeather ? t(`weather.${myWeather.state}`) : t("temple_home.check_in_prompt")}
            </p>
          </div>
          <div className="text-xl text-muted-foreground/20">✦</div>
          <div className="text-center flex-1">
            <p className="text-xs text-muted-foreground font-body mb-1">{t("weather.partner")}</p>
            <p className="text-3xl">{partnerWeather ? weatherEmoji[partnerWeather.state] || "✦" : "—"}</p>
            <p className="text-sm font-body text-foreground mt-1">
              {partnerWeather ? t(`weather.${partnerWeather.state}`) : t("weather.waiting")}
            </p>
          </div>
        </div>
      </div>

      {/* Tonight's Recommendation */}
      {suggestedRitual && (
        <div
          onClick={() => onNavigate("rituals")}
          className="rounded-2xl border border-primary/20 bg-primary/5 p-5 cursor-pointer hover:bg-primary/10 transition-all"
        >
          <span className="text-xs font-body uppercase tracking-[0.2em] text-primary block mb-2">
            {t("temple_home.tonight")}
          </span>
          <h4 className="font-heading text-xl md:text-2xl text-foreground mb-1">{suggestedRitual.title}</h4>
          <p className="text-sm md:text-base text-muted-foreground font-body">{suggestedRitual.hook}</p>
          {suggestedRitual.duration && (
            <p className="text-xs text-primary/70 font-body mt-2">⏱ {suggestedRitual.duration}</p>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { key: "weather", icon: Cloud, label: t("temple_home.action.check_in") },
          { key: "rituals", icon: Sparkles, label: t("temple_home.action.ritual") },
          { key: "messages", icon: MessageCircle, label: t("temple_home.action.message") },
          { key: "pathways", icon: Route, label: t("temple_home.action.pathway") },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.key}
              onClick={() => onNavigate(action.key)}
              className="flex items-center gap-3 p-4 rounded-2xl border border-border/30 bg-card/40 hover:border-primary/30 hover:bg-card/60 transition-all text-left"
            >
              <Icon className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm md:text-base font-body text-foreground">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Recent Altar Moment */}
      {recentAltar && (
        <div
          onClick={() => onNavigate("altar")}
          className="rounded-2xl border border-border/30 bg-card/40 p-5 cursor-pointer hover:border-primary/20 transition-all"
        >
          <div className="flex items-center gap-3">
            <Bookmark className="h-5 w-5 text-primary/60 shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-body text-muted-foreground/60 uppercase tracking-wider">
                {t("temple_home.recent_altar")}
              </span>
              <h4 className="font-heading text-base md:text-lg text-foreground truncate">{recentAltar.title}</h4>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TempleHome;
