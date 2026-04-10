import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Cloud, Sun, Zap, Heart, Flame, Moon, Shield, Sparkles } from "lucide-react";

const weatherStates = [
  { key: "open", icon: Sun, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  { key: "tender", icon: Heart, color: "text-pink-400", bg: "bg-pink-400/10 border-pink-400/20" },
  { key: "playful", icon: Sparkles, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
  { key: "stressed", icon: Cloud, color: "text-slate-400", bg: "bg-slate-400/10 border-slate-400/20" },
  { key: "longing", icon: Moon, color: "text-indigo-400", bg: "bg-indigo-400/10 border-indigo-400/20" },
  { key: "erotic", icon: Flame, color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
  { key: "tired", icon: Shield, color: "text-muted-foreground", bg: "bg-muted/50 border-muted-foreground/20" },
  { key: "reassurance", icon: Zap, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
];

interface Props {
  coupleId: string;
}

const IntimacyWeather = ({ coupleId }: Props) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [myWeather, setMyWeather] = useState<string | null>(null);
  const [partnerWeather] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const selectWeather = (key: string) => {
    setMyWeather(key);
    setSaved(false);
  };

  const saveWeather = async () => {
    if (!myWeather || !user || !coupleId) return;
    await supabase.from("partner_messages").insert({
      couple_id: coupleId,
      sender_id: user.id,
      message_type: "weather",
      content: myWeather,
    });
    setSaved(true);
  };

  const myState = weatherStates.find((w) => w.key === myWeather);
  const partnerState = weatherStates.find((w) => w.key === partnerWeather);

  return (
    <div className="px-4 py-6">
      <div className="text-center mb-8">
        <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
          {t("weather.title")}
        </h3>
        <p className="text-muted-foreground font-body text-sm md:text-base max-w-md mx-auto">
          {t("weather.subtitle")}
        </p>
      </div>

      {/* Weather Grid */}
      <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto mb-8">
        {weatherStates.map((w) => {
          const Icon = w.icon;
          const selected = myWeather === w.key;
          return (
            <button
              key={w.key}
              onClick={() => selectWeather(w.key)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 ${
                selected
                  ? `${w.bg} scale-105 shadow-lg`
                  : "border-border/30 hover:border-border/60 bg-card/30"
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

      {/* Shared View */}
      {myWeather && (
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-8 mb-6">
            {/* My weather */}
            <div className="text-center">
              <p className="text-xs font-body text-muted-foreground mb-2 uppercase tracking-wider">{t("weather.you")}</p>
              <div className={`h-20 w-20 rounded-full flex items-center justify-center ${myState?.bg} border`}>
                {myState && <myState.icon className={`h-9 w-9 ${myState.color}`} />}
              </div>
              <p className="text-sm font-body text-foreground mt-2">{t(`weather.${myWeather}`)}</p>
            </div>

            <div className="text-2xl text-muted-foreground/30">✦</div>

            {/* Partner weather */}
            <div className="text-center">
              <p className="text-xs font-body text-muted-foreground mb-2 uppercase tracking-wider">{t("weather.partner")}</p>
              <div className={`h-20 w-20 rounded-full flex items-center justify-center ${partnerState?.bg || "bg-muted/30 border-border/30"} border`}>
                {partnerState ? (
                  <partnerState.icon className={`h-9 w-9 ${partnerState.color}`} />
                ) : (
                  <span className="text-muted-foreground/40 text-xs font-body">{t("weather.waiting")}</span>
                )}
              </div>
              <p className="text-sm font-body text-foreground mt-2">
                {partnerState ? t(`weather.${partnerWeather}`) : "..."}
              </p>
            </div>
          </div>

          {!saved && (
            <button
              onClick={saveWeather}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-body text-base font-medium hover:bg-primary/90 transition-colors"
            >
              {t("weather.share")}
            </button>
          )}
          {saved && (
            <p className="text-center text-sm text-primary font-body">{t("weather.shared")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default IntimacyWeather;
