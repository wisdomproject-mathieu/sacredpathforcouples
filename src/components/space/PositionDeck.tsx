import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const practices = [
  { key: "seated_closeness", free: true, emoji: "🪷" },
  { key: "back_to_back", free: true, emoji: "🔄" },
  { key: "hand_on_heart", free: true, emoji: "🫀" },
  { key: "synchronized_exhale", free: true, emoji: "💨" },
  { key: "slow_touch_circles", free: false, emoji: "🌀" },
  { key: "yinyang_rest", free: false, emoji: "☯️" },
  { key: "temple_date", free: false, emoji: "🕯" },
  { key: "standing_embrace", free: false, emoji: "🫂" },
];

const PositionDeck = () => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="px-4 py-6">
      <div className="text-center mb-8">
        <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
          {t("position.title")}
        </h3>
        <p className="text-muted-foreground font-body text-sm md:text-base max-w-md mx-auto">
          {t("position.subtitle")}
        </p>
      </div>

      <div className="grid gap-3 max-w-lg mx-auto">
        {practices.map((p, idx) => {
          const isOpen = expanded === idx;
          return (
            <div key={p.key} className="relative">
              {!p.free && (
                <div className="absolute inset-0 z-10 rounded-2xl bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                  <Lock className="h-5 w-5 text-primary/60" />
                  <span className="text-xs font-body text-muted-foreground">{t("premium.unlock")}</span>
                </div>
              )}
              <button
                onClick={() => p.free && setExpanded(isOpen ? null : idx)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-primary/10 border-primary/30"
                    : "bg-card/50 border-border/30 hover:border-border/60"
                } ${!p.free ? "opacity-50" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl mt-0.5">{p.emoji}</span>
                  <div className="flex-1">
                    <h4 className="font-heading text-lg text-foreground mb-1">
                      {t(`position.${p.key}.title`)}
                    </h4>
                    {isOpen ? (
                      <div className="animate-fade-in">
                        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-3">
                          {t(`position.${p.key}.desc`)}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-primary font-body">
                          <span>⏱ {t(`position.${p.key}.duration`)}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs font-body text-muted-foreground/60">{t("ritual_cards.tap")}</p>
                    )}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" className="font-body text-sm gap-2 border-primary/30 text-primary hover:bg-primary/10">
          <Sparkles className="h-4 w-4" />
          {t("position.unlock_all")}
        </Button>
      </div>
    </div>
  );
};

export default PositionDeck;
