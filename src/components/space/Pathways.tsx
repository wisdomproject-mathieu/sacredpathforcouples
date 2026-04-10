import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Flame, Wind, Heart, MapPin, Baby, Sparkles, Lock, ChevronRight } from "lucide-react";

const journeys = [
  { key: "reignite", icon: Flame, color: "text-red-400", bg: "bg-red-400/10", days: 7, free: true },
  { key: "slow_down", icon: Wind, color: "text-sky-400", bg: "bg-sky-400/10", days: 21, free: true },
  { key: "heal_stress", icon: Heart, color: "text-pink-400", bg: "bg-pink-400/10", days: 7, free: false },
  { key: "long_distance", icon: MapPin, color: "text-emerald-400", bg: "bg-emerald-400/10", days: 21, free: false },
  { key: "parents", icon: Baby, color: "text-amber-400", bg: "bg-amber-400/10", days: 7, free: false },
  { key: "sacred_sexuality", icon: Sparkles, color: "text-primary", bg: "bg-primary/10", days: 30, free: false },
];

const Pathways = () => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="px-4 py-6">
      <div className="text-center mb-8">
        <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
          {t("pathways.title")}
        </h3>
        <p className="text-muted-foreground font-body text-sm md:text-base max-w-md mx-auto">
          {t("pathways.subtitle")}
        </p>
      </div>

      <div className="grid gap-3 max-w-lg mx-auto">
        {journeys.map((j) => {
          const Icon = j.icon;
          const isSelected = selected === j.key;
          return (
            <div key={j.key} className="relative">
              {!j.free && (
                <div className="absolute inset-0 z-10 rounded-2xl bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                  <Lock className="h-5 w-5 text-primary/60" />
                  <span className="text-xs font-body text-muted-foreground">{t("premium.unlock")}</span>
                </div>
              )}
              <button
                onClick={() => j.free && setSelected(isSelected ? null : j.key)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-primary/10 border-primary/30"
                    : "bg-card/50 border-border/30 hover:border-border/60"
                } ${!j.free ? "opacity-50" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl ${j.bg} border border-current/10 flex items-center justify-center shrink-0`}>
                    <Icon className={`h-6 w-6 ${j.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-lg text-foreground mb-0.5">
                      {t(`pathways.${j.key}.title`)}
                    </h4>
                    <p className="text-sm font-body text-muted-foreground">
                      {j.days}-{t("pathways.days")} {t("pathways.journey")}
                    </p>
                  </div>
                  <ChevronRight className={`h-5 w-5 text-muted-foreground/40 transition-transform ${isSelected ? "rotate-90" : ""}`} />
                </div>
                {isSelected && (
                  <div className="mt-4 pl-16 animate-fade-in">
                    <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">
                      {t(`pathways.${j.key}.desc`)}
                    </p>
                    <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-body text-sm font-medium hover:bg-primary/90 transition-colors">
                      {t("pathways.begin")}
                    </button>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pathways;
