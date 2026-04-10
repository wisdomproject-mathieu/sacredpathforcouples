import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "osho", label: "Osho", symbol: "◉", free: true },
  { id: "deida", label: "Deida", symbol: "✦", free: true },
  { id: "anand", label: "Anand", symbol: "✧", free: true },
  { id: "richardson", label: "Richardson", symbol: "✿", free: false },
  { id: "chia", label: "Mantak Chia", symbol: "☯", free: false },
];

const authorData: Record<string, { quoteKey: string; ritualTitleKey: string; ritualDescKey: string; premiumQuotes: string[]; premiumRituals: string[] }> = {
  osho: {
    quoteKey: "author.osho.quote",
    ritualTitleKey: "author.osho.ritual_title",
    ritualDescKey: "author.osho.ritual_desc",
    premiumQuotes: ["author.osho.pq1"],
    premiumRituals: ["author.osho.pr1"],
  },
  deida: {
    quoteKey: "author.deida.quote",
    ritualTitleKey: "author.deida.ritual_title",
    ritualDescKey: "author.deida.ritual_desc",
    premiumQuotes: ["author.deida.pq1"],
    premiumRituals: ["author.deida.pr1"],
  },
  anand: {
    quoteKey: "author.anand.quote",
    ritualTitleKey: "author.anand.ritual_title",
    ritualDescKey: "author.anand.ritual_desc",
    premiumQuotes: ["author.anand.pq1"],
    premiumRituals: ["author.anand.pr1"],
  },
  richardson: {
    quoteKey: "author.richardson.quote",
    ritualTitleKey: "author.richardson.ritual_title",
    ritualDescKey: "author.richardson.ritual_desc",
    premiumQuotes: [],
    premiumRituals: [],
  },
  chia: {
    quoteKey: "author.chia.quote",
    ritualTitleKey: "author.chia.ritual_title",
    ritualDescKey: "author.chia.ritual_desc",
    premiumQuotes: [],
    premiumRituals: [],
  },
};

const Authors = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("osho");

  const tab = tabs.find((tb) => tb.id === activeTab)!;
  const data = authorData[activeTab];
  const isLocked = !tab.free;

  return (
    <div className="px-4 py-8 pb-24">
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-2">{t("authors.lineage")}</p>
          <h1 className="font-heading text-3xl font-semibold text-foreground mb-2">{t("authors.title")}</h1>
          <p className="text-muted-foreground font-body text-sm">{t("authors.subtitle")}</p>
        </div>

        {/* Tab Bar */}
        <div className="flex justify-center gap-1 mb-8 flex-wrap">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setActiveTab(tb.id)}
              className={`px-4 py-2 rounded-full text-xs font-body transition-all flex items-center gap-1 ${
                activeTab === tb.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {!tb.free && <Lock size={10} />}
              {tb.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="text-center mb-8">
          <span className="text-4xl block mb-3">{tab.symbol}</span>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">{t(`author.${activeTab}.name`)}</h2>
          <p className="text-sm text-muted-foreground font-body max-w-lg mx-auto leading-relaxed">{t(`author.${activeTab}.desc`)}</p>
        </div>

        {isLocked ? (
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
            <Lock className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{t("authors.unlock")}</h3>
            <p className="text-xs text-muted-foreground font-body mb-4">{t("authors.unlock_desc")}</p>
            <Link to="/pricing">
              <Button className="font-body" size="sm">{t("teachings.view_plans")}</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Free Quote */}
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-body mb-3">{t("paths.quote")} — {t(`author.${activeTab}.name`)}</p>
              <p className="text-foreground font-heading italic text-lg leading-relaxed mb-2">
                &ldquo;{t(data.quoteKey)}&rdquo;
              </p>
            </div>

            {/* Free Ritual */}
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-body mb-3">{t("paths.ritual")}</p>
              <h3 className="font-heading text-base font-semibold text-foreground mb-2">{t(data.ritualTitleKey)}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{t(data.ritualDescKey)}</p>
            </div>

            {/* Premium content */}
            {data.premiumQuotes.map((key, i) => (
              <div key={i} className="rounded-xl border border-border/50 bg-card/50 p-6 relative">
                <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] text-primary font-body bg-primary/10 px-2 py-0.5 rounded-full">
                  <Lock size={10} /> {t("teachings.premium")}
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mb-3">{t("paths.quote")}</p>
                <p className="text-muted-foreground/50 font-heading italic text-lg leading-relaxed blur-[3px] select-none">
                  {t(key)}
                </p>
                <p className="text-xs text-muted-foreground font-body italic mt-2">{t("teachings.unlock_hint")}</p>
              </div>
            ))}

            {data.premiumRituals.map((key, i) => (
              <div key={`r${i}`} className="rounded-xl border border-border/50 bg-card/50 p-6 relative">
                <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] text-primary font-body bg-primary/10 px-2 py-0.5 rounded-full">
                  <Lock size={10} /> {t("teachings.premium")}
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mb-3">{t("paths.ritual")}</p>
                <h3 className="font-heading text-base font-semibold text-muted-foreground/50 mb-2 blur-[2px] select-none">{t(key)}</h3>
                <p className="text-xs text-muted-foreground font-body italic mt-2">{t("teachings.unlock_hint")}</p>
              </div>
            ))}
          </div>
        )}

        {/* Unlock CTA */}
        {!isLocked && (
          <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
            <span className="text-2xl block mb-3">✦</span>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{t("authors.unlock_all")}</h3>
            <p className="text-xs text-muted-foreground font-body mb-4">{t("authors.unlock_all_desc")}</p>
            <Link to="/pricing">
              <Button className="font-body" size="sm">{t("teachings.view_plans")}</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authors;
