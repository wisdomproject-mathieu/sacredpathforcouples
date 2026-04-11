import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Cloud, Sun, Zap, Heart, Flame, Moon, Shield, Sparkles, ChevronRight } from "lucide-react";

const weatherStates = [
  { key: "open", icon: Sun, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20", emoji: "☀️" },
  { key: "tender", icon: Heart, color: "text-pink-400", bg: "bg-pink-400/10 border-pink-400/20", emoji: "💗" },
  { key: "playful", icon: Sparkles, color: "text-primary", bg: "bg-primary/10 border-primary/20", emoji: "✨" },
  { key: "stressed", icon: Cloud, color: "text-slate-400", bg: "bg-slate-400/10 border-slate-400/20", emoji: "☁️" },
  { key: "longing", icon: Moon, color: "text-indigo-400", bg: "bg-indigo-400/10 border-indigo-400/20", emoji: "🌙" },
  { key: "erotic", icon: Flame, color: "text-red-400", bg: "bg-red-400/10 border-red-400/20", emoji: "🔥" },
  { key: "tired", icon: Shield, color: "text-muted-foreground", bg: "bg-muted/50 border-muted-foreground/20", emoji: "😴" },
  { key: "reassurance", icon: Zap, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", emoji: "🤲" },
];

type RecommendationType = "rituals" | "repair" | "guide";

const getRecommendation = (state: string): { messageKey: string; actionKey: RecommendationType; actionLabel: string } => {
  if (["stressed", "tired", "reassurance"].includes(state)) {
    return { messageKey: `weather.rec.${state}`, actionKey: "repair", actionLabel: "weather.rec.go_repair" };
  }
  if (["open", "tender"].includes(state)) {
    return { messageKey: `weather.rec.${state}`, actionKey: "rituals", actionLabel: "weather.rec.go_ritual" };
  }
  if (["playful", "erotic"].includes(state)) {
    return { messageKey: `weather.rec.${state}`, actionKey: "rituals", actionLabel: "weather.rec.go_ritual" };
  }
  return { messageKey: `weather.rec.longing`, actionKey: "guide", actionLabel: "weather.rec.go_guide" };
};

interface Props {
  coupleId: string;
  onNavigate?: (tab: string) => void;
}

const IntimacyWeather = ({ coupleId, onNavigate }: Props) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [myWeather, setMyWeather] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [partnerWeather, setPartnerWeather] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!coupleId || !user) return;
    const today = new Date().toISOString().slice(0, 10);
    const load = async () => {
      const { data } = await supabase
        .from("weather_entries")
        .select("*")
        .eq("couple_id", coupleId)
        .gte("created_at", today)
        .order("created_at", { ascending: false });
      if (data) {
        const mine = data.find((w: any) => w.user_id === user.id);
        const partner = data.find((w: any) => w.user_id !== user.id);
        if (mine) { setMyWeather(mine.state); setSaved(true); }
        if (partner) setPartnerWeather(partner.state);
      }
    };
    load();

    // Realtime for partner updates
    const channel = supabase
      .channel("weather-updates")
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "weather_entries",
        filter: `couple_id=eq.${coupleId}`,
      }, (payload) => {
        const entry = payload.new as any;
        if (entry.user_id !== user.id) setPartnerWeather(entry.state);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [coupleId, user]);

  const selectWeather = (key: string) => {
    if (saved) return;
    setMyWeather(key);
  };

  const saveWeather = async () => {
    if (!myWeather || !user || !coupleId || saved) return;
    await supabase.from("weather_entries").insert({
      couple_id: coupleId,
      user_id: user.id,
      state: myWeather,
      note: note.trim() || null,
    });
    setSaved(true);
  };

  const myState = weatherStates.find((w) => w.key === myWeather);
  const partnerState = weatherStates.find((w) => w.key === partnerWeather);
  const rec = myWeather && saved ? getRecommendation(myWeather) : null;

  return (
    <div className="px-5 py-6 max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
          {t("weather.title")}
        </h3>
        <p className="text-muted-foreground font-body text-base md:text-lg max-w-md mx-auto">
          {t("weather.subtitle")}
        </p>
      </div>

      {/* Weather Grid */}
      <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto mb-6">
        {weatherStates.map((w) => {
          const Icon = w.icon;
          const selected = myWeather === w.key;
          return (
            <button
              key={w.key}
              onClick={() => selectWeather(w.key)}
              disabled={saved}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 ${
                selected
                  ? `${w.bg} scale-105 shadow-lg`
                  : saved ? "border-border/20 bg-card/20 opacity-40" : "border-border/30 hover:border-border/60 bg-card/30"
              }`}
            >
              <Icon className={`h-7 w-7 ${selected ? w.color : "text-muted-foreground/60"}`} />
              <span className={`text-xs font-body ${selected ? "text-foreground" : "text-muted-foreground"}`}>
                {t(`weather.${w.key}`)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Note + Save */}
      {myWeather && !saved && (
        <div className="max-w-lg mx-auto space-y-3 mb-6 animate-fade-in">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("weather.note_placeholder")}
            className="w-full rounded-xl border border-border/40 bg-card/30 p-4 text-base font-body text-foreground placeholder:text-muted-foreground/40 resize-none h-20 focus:outline-none focus:border-primary/40"
          />
          <button
            onClick={saveWeather}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body text-base font-medium hover:bg-primary/90 transition-colors"
          >
            {t("weather.share")}
          </button>
        </div>
      )}

      {/* Shared View */}
      {saved && myWeather && (
        <div className="max-w-lg mx-auto animate-fade-in">
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <p className="text-xs font-body text-muted-foreground mb-2 uppercase tracking-wider">{t("weather.you")}</p>
              <div className={`h-20 w-20 rounded-full flex items-center justify-center ${myState?.bg} border mx-auto`}>
                {myState && <myState.icon className={`h-9 w-9 ${myState.color}`} />}
              </div>
              <p className="text-base font-body text-foreground mt-2">{t(`weather.${myWeather}`)}</p>
            </div>
            <div className="text-2xl text-muted-foreground/20">✦</div>
            <div className="text-center">
              <p className="text-xs font-body text-muted-foreground mb-2 uppercase tracking-wider">{t("weather.partner")}</p>
              <div className={`h-20 w-20 rounded-full flex items-center justify-center ${partnerState?.bg || "bg-muted/30 border-border/30"} border mx-auto`}>
                {partnerState ? (
                  <partnerState.icon className={`h-9 w-9 ${partnerState.color}`} />
                ) : (
                  <span className="text-muted-foreground/40 text-xs font-body text-center leading-tight px-1">{t("weather.waiting")}</span>
                )}
              </div>
              <p className="text-base font-body text-foreground mt-2">
                {partnerState ? t(`weather.${partnerWeather}`) : "..."}
              </p>
            </div>
          </div>

          {/* Recommendation */}
          {rec && (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 mt-4">
              <p className="text-xs font-body text-primary uppercase tracking-wider mb-2">
                {t("weather.rec.label")}
              </p>
              <p className="text-base md:text-lg font-heading text-foreground italic leading-relaxed mb-4">
                {t(rec.messageKey)}
              </p>
              {onNavigate && (
                <button
                  onClick={() => onNavigate(rec.actionKey)}
                  className="flex items-center gap-2 text-sm font-body text-primary hover:text-primary/80 transition-colors"
                >
                  {t(rec.actionLabel)}
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground/50 font-body mt-4">
            {t("weather.shared")}
          </p>
        </div>
      )}
    </div>
  );
};

export default IntimacyWeather;
