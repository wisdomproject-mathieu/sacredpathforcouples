import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, Clock, Eye, Moon, Zap } from "lucide-react";
import DoorwayShell from "@/components/space/DoorwayShell";

const energyLevels = [
  { key: "low", emoji: "🌙", label: "guide.energy.low" },
  { key: "medium", emoji: "🌤", label: "guide.energy.medium" },
  { key: "high", emoji: "⚡", label: "guide.energy.high" },
];

const timeLevels = [
  { key: "3min", label: "3 min", minutes: 3 },
  { key: "7min", label: "7 min", minutes: 7 },
  { key: "12min", label: "12 min", minutes: 12 },
];

const privacyLevels = [
  { key: "public_space", emoji: "👀", label: "guide.privacy.public" },
  { key: "private", emoji: "🔒", label: "guide.privacy.private" },
  { key: "intimate", emoji: "🕯", label: "guide.privacy.intimate" },
];

const recommendations: Record<string, { titleKey: string; descKey: string; icon: typeof Sparkles }[]> = {
  "low_3min": [
    { titleKey: "guide.rec.forehead_touch", descKey: "guide.rec.forehead_touch.desc", icon: Moon },
  ],
  "low_7min": [
    { titleKey: "guide.rec.back_to_back", descKey: "guide.rec.back_to_back.desc", icon: Moon },
  ],
  "low_12min": [
    { titleKey: "guide.rec.goodnight_gratitude", descKey: "guide.rec.goodnight_gratitude.desc", icon: Moon },
  ],
  "medium_3min": [
    { titleKey: "guide.rec.eye_contact", descKey: "guide.rec.eye_contact.desc", icon: Eye },
  ],
  "medium_7min": [
    { titleKey: "guide.rec.synchronized_breath", descKey: "guide.rec.synchronized_breath.desc", icon: Sparkles },
  ],
  "medium_12min": [
    { titleKey: "guide.rec.slow_touch", descKey: "guide.rec.slow_touch.desc", icon: Sparkles },
  ],
  "high_3min": [
    { titleKey: "guide.rec.polarity_pull", descKey: "guide.rec.polarity_pull.desc", icon: Zap },
  ],
  "high_7min": [
    { titleKey: "guide.rec.temple_date", descKey: "guide.rec.temple_date.desc", icon: Zap },
  ],
  "high_12min": [
    { titleKey: "guide.rec.sacred_body", descKey: "guide.rec.sacred_body.desc", icon: Zap },
  ],
};

interface Props {
  onNavigate?: (tab: string) => void;
}

const TempleGuide = ({ onNavigate }: Props) => {
  const { t } = useLanguage();
  const [energy, setEnergy] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [privacy, setPrivacy] = useState<string | null>(null);

  const recKey = energy && time ? `${energy}_${time}` : null;
  const recs = recKey ? recommendations[recKey] || [] : [];
  const allSelected = energy && time && privacy;

  return (
    <DoorwayShell
      label="Temple Guide"
      title={t("guide.title")}
      description={t("guide.subtitle")}
      actionLabel="Open rituals"
      onAction={onNavigate ? () => onNavigate("rituals") : undefined}
    >

      <div className="max-w-md mx-auto space-y-6 px-4">
        {/* Energy */}
        <div>
          <p className="text-sm font-body text-muted-foreground mb-3 uppercase tracking-wider">
            {t("guide.energy_label")}
          </p>
          <div className="flex gap-2">
            {energyLevels.map((e) => (
              <button
                key={e.key}
                onClick={() => setEnergy(e.key)}
                className={`flex-1 flex flex-col items-center gap-1.5 p-4 rounded-2xl border transition-all ${
                  energy === e.key
                    ? "bg-primary/10 border-primary/30 scale-105"
                    : "border-border/30 bg-card/30 hover:border-border/60"
                }`}
              >
                <span className="text-2xl">{e.emoji}</span>
                <span className="text-xs font-body text-foreground">{t(e.label)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div>
          <p className="text-sm font-body text-muted-foreground mb-3 uppercase tracking-wider">
            {t("guide.time_label")}
          </p>
          <div className="flex gap-2">
            {timeLevels.map((tl) => (
              <button
                key={tl.key}
                onClick={() => setTime(tl.key)}
                className={`flex-1 flex items-center justify-center gap-2 p-3.5 rounded-2xl border transition-all ${
                  time === tl.key
                    ? "bg-primary/10 border-primary/30 scale-105"
                    : "border-border/30 bg-card/30 hover:border-border/60"
                }`}
              >
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-body text-foreground">{tl.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div>
          <p className="text-sm font-body text-muted-foreground mb-3 uppercase tracking-wider">
            {t("guide.privacy_label")}
          </p>
          <div className="flex gap-2">
            {privacyLevels.map((p) => (
              <button
                key={p.key}
                onClick={() => setPrivacy(p.key)}
                className={`flex-1 flex flex-col items-center gap-1.5 p-4 rounded-2xl border transition-all ${
                  privacy === p.key
                    ? "bg-primary/10 border-primary/30 scale-105"
                    : "border-border/30 bg-card/30 hover:border-border/60"
                }`}
              >
                <span className="text-2xl">{p.emoji}</span>
                <span className="text-xs font-body text-foreground">{t(p.label)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        {allSelected && recs.length > 0 && (
          <div className="pt-4 animate-fade-in">
            <div className="text-center mb-4">
              <p className="text-xs font-body text-primary uppercase tracking-wider">{t("guide.tonight")}</p>
            </div>
            {recs.map((rec, idx) => {
              const Icon = rec.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl border border-primary/30 bg-primary/5">
                  <div className="flex items-start gap-4">
                    <Icon className="h-8 w-8 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-heading text-xl text-foreground mb-2">{t(rec.titleKey)}</h4>
                      <p className="text-sm font-body text-muted-foreground leading-relaxed">{t(rec.descKey)}</p>
                    </div>
                  </div>
                  <button className="mt-5 w-full py-3 rounded-xl bg-primary text-primary-foreground font-body text-base font-medium hover:bg-primary/90 transition-colors">
                    {t("guide.start")}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DoorwayShell>
  );
};

export default TempleGuide;
