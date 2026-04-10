import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Wind, Hand, Eye, Heart, Wrench, Sparkles, Moon, Sun, MapPin, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const categories = [
  { key: "breath", icon: Wind, color: "text-sky-400" },
  { key: "touch", icon: Hand, color: "text-pink-400" },
  { key: "eye_contact", icon: Eye, color: "text-indigo-400" },
  { key: "gratitude", icon: Heart, color: "text-red-400" },
  { key: "repair", icon: Wrench, color: "text-amber-400" },
  { key: "polarity", icon: Sparkles, color: "text-primary" },
  { key: "bedtime", icon: Moon, color: "text-purple-400" },
  { key: "morning", icon: Sun, color: "text-yellow-400" },
  { key: "distance", icon: MapPin, color: "text-emerald-400" },
  { key: "date_night", icon: Coffee, color: "text-orange-400" },
];

const ritualCardsData: Record<string, { titleKey: string; descKey: string; free: boolean }[]> = {
  breath: [
    { titleKey: "ritual_card.breath.1.title", descKey: "ritual_card.breath.1.desc", free: true },
    { titleKey: "ritual_card.breath.2.title", descKey: "ritual_card.breath.2.desc", free: true },
    { titleKey: "ritual_card.breath.3.title", descKey: "ritual_card.breath.3.desc", free: false },
  ],
  touch: [
    { titleKey: "ritual_card.touch.1.title", descKey: "ritual_card.touch.1.desc", free: true },
    { titleKey: "ritual_card.touch.2.title", descKey: "ritual_card.touch.2.desc", free: true },
    { titleKey: "ritual_card.touch.3.title", descKey: "ritual_card.touch.3.desc", free: false },
  ],
  eye_contact: [
    { titleKey: "ritual_card.eye.1.title", descKey: "ritual_card.eye.1.desc", free: true },
    { titleKey: "ritual_card.eye.2.title", descKey: "ritual_card.eye.2.desc", free: false },
  ],
  gratitude: [
    { titleKey: "ritual_card.gratitude.1.title", descKey: "ritual_card.gratitude.1.desc", free: true },
    { titleKey: "ritual_card.gratitude.2.title", descKey: "ritual_card.gratitude.2.desc", free: false },
  ],
  repair: [
    { titleKey: "ritual_card.repair.1.title", descKey: "ritual_card.repair.1.desc", free: true },
    { titleKey: "ritual_card.repair.2.title", descKey: "ritual_card.repair.2.desc", free: false },
  ],
  polarity: [
    { titleKey: "ritual_card.polarity.1.title", descKey: "ritual_card.polarity.1.desc", free: true },
    { titleKey: "ritual_card.polarity.2.title", descKey: "ritual_card.polarity.2.desc", free: false },
  ],
  bedtime: [
    { titleKey: "ritual_card.bedtime.1.title", descKey: "ritual_card.bedtime.1.desc", free: true },
    { titleKey: "ritual_card.bedtime.2.title", descKey: "ritual_card.bedtime.2.desc", free: false },
  ],
  morning: [
    { titleKey: "ritual_card.morning.1.title", descKey: "ritual_card.morning.1.desc", free: true },
    { titleKey: "ritual_card.morning.2.title", descKey: "ritual_card.morning.2.desc", free: false },
  ],
  distance: [
    { titleKey: "ritual_card.distance.1.title", descKey: "ritual_card.distance.1.desc", free: true },
    { titleKey: "ritual_card.distance.2.title", descKey: "ritual_card.distance.2.desc", free: false },
  ],
  date_night: [
    { titleKey: "ritual_card.date.1.title", descKey: "ritual_card.date.1.desc", free: true },
    { titleKey: "ritual_card.date.2.title", descKey: "ritual_card.date.2.desc", free: false },
  ],
};

const RitualCards = () => {
  const { t } = useLanguage();
  const [activeCat, setActiveCat] = useState("breath");
  const [flipped, setFlipped] = useState<number | null>(null);

  const cards = ritualCardsData[activeCat] || [];
  const catConfig = categories.find((c) => c.key === activeCat);

  return (
    <div className="px-4 py-6">
      <div className="text-center mb-6">
        <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
          {t("ritual_cards.title")}
        </h3>
        <p className="text-muted-foreground font-body text-sm md:text-base max-w-md mx-auto">
          {t("ritual_cards.subtitle")}
        </p>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const active = activeCat === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => { setActiveCat(cat.key); setFlipped(null); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body whitespace-nowrap transition-all border ${
                active
                  ? "bg-primary/15 text-primary border-primary/30"
                  : "text-muted-foreground border-border/30 hover:border-border/60"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? cat.color : ""}`} />
              {t(`ritual_cards.cat.${cat.key}`)}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="grid gap-4 max-w-lg mx-auto">
        {cards.map((card, idx) => {
          const isFlipped = flipped === idx;
          const CatIcon = catConfig?.icon || Sparkles;
          return (
            <div key={idx} className="relative">
              {!card.free && (
                <div className="absolute inset-0 z-10 rounded-2xl bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                  <Lock className="h-5 w-5 text-primary/60" />
                  <span className="text-xs font-body text-muted-foreground">{t("premium.unlock")}</span>
                </div>
              )}
              <button
                onClick={() => card.free && setFlipped(isFlipped ? null : idx)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                  isFlipped
                    ? "bg-primary/10 border-primary/30"
                    : "bg-card/50 border-border/30 hover:border-border/60"
                } ${!card.free ? "opacity-50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <CatIcon className={`h-6 w-6 mt-0.5 ${catConfig?.color || "text-primary"}`} />
                  <div className="flex-1">
                    <h4 className="font-heading text-lg text-foreground mb-1">{t(card.titleKey)}</h4>
                    {isFlipped && (
                      <p className="text-sm font-body text-muted-foreground leading-relaxed animate-fade-in">
                        {t(card.descKey)}
                      </p>
                    )}
                    {!isFlipped && (
                      <p className="text-xs font-body text-muted-foreground/60">{t("ritual_cards.tap")}</p>
                    )}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Premium CTA */}
      <div className="mt-8 text-center">
        <Button variant="outline" className="font-body text-sm gap-2 border-primary/30 text-primary hover:bg-primary/10">
          <Sparkles className="h-4 w-4" />
          {t("ritual_cards.unlock_all")}
        </Button>
      </div>
    </div>
  );
};

export default RitualCards;
