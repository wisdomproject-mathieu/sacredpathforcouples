import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "tantra", label: "Tantra", symbol: "◉" },
  { id: "tao", label: "Tao", symbol: "◯" },
  { id: "deida", label: "Deida", symbol: "✦" },
  { id: "richardson", label: "Richardson", symbol: "✿" },
  { id: "anand", label: "Anand", symbol: "✦" },
];

const teachingsByTab: Record<string, { titleKey: string; contentKey: string; tagsKey: string; free: boolean }[]> = {
  tantra: [
    { titleKey: "teach.tantra.0.title", contentKey: "teach.tantra.0.content", tagsKey: "teach.tantra.0.tags", free: true },
    { titleKey: "teach.tantra.1.title", contentKey: "teach.tantra.1.content", tagsKey: "teach.tantra.1.tags", free: true },
    { titleKey: "teach.tantra.2.title", contentKey: "teach.tantra.2.content", tagsKey: "teach.tantra.2.tags", free: false },
    { titleKey: "teach.tantra.3.title", contentKey: "teach.tantra.3.content", tagsKey: "teach.tantra.3.tags", free: false },
  ],
  tao: [
    { titleKey: "teach.tao.0.title", contentKey: "teach.tao.0.content", tagsKey: "teach.tao.0.tags", free: true },
    { titleKey: "teach.tao.1.title", contentKey: "teach.tao.1.content", tagsKey: "teach.tao.1.tags", free: true },
    { titleKey: "teach.tao.2.title", contentKey: "teach.tao.2.content", tagsKey: "teach.tao.2.tags", free: false },
  ],
  deida: [
    { titleKey: "teach.deida.0.title", contentKey: "teach.deida.0.content", tagsKey: "teach.deida.0.tags", free: true },
    { titleKey: "teach.deida.1.title", contentKey: "teach.deida.1.content", tagsKey: "teach.deida.1.tags", free: true },
    { titleKey: "teach.deida.2.title", contentKey: "teach.deida.2.content", tagsKey: "teach.deida.2.tags", free: false },
  ],
  richardson: [
    { titleKey: "teach.rich.0.title", contentKey: "teach.rich.0.content", tagsKey: "teach.rich.0.tags", free: true },
    { titleKey: "teach.rich.1.title", contentKey: "teach.rich.1.content", tagsKey: "teach.rich.1.tags", free: true },
    { titleKey: "teach.rich.2.title", contentKey: "teach.rich.2.content", tagsKey: "teach.rich.2.tags", free: false },
  ],
  anand: [
    { titleKey: "teach.anand.0.title", contentKey: "teach.anand.0.content", tagsKey: "teach.anand.0.tags", free: true },
    { titleKey: "teach.anand.1.title", contentKey: "teach.anand.1.content", tagsKey: "teach.anand.1.tags", free: false },
  ],
};

const Teachings = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("tantra");
  const [expandedTeaching, setExpandedTeaching] = useState<number | null>(null);

  const teachings = teachingsByTab[activeTab] || [];
  const activeTabInfo = tabs.find((tb) => tb.id === activeTab)!;

  return (
    <div className="px-4 py-8 pb-24">
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-2">{t("teachings.lineage")}</p>
          <h1 className="font-heading text-3xl font-semibold text-foreground mb-2">{t("teachings.title")}</h1>
          <p className="text-muted-foreground font-body text-sm">{t("teachings.subtitle")}</p>
        </div>

        {/* Tab Bar */}
        <div className="flex justify-center gap-1 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setExpandedTeaching(null); }}
              className={`px-4 py-2 rounded-full text-xs font-body transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab description */}
        <div className="text-center mb-8">
          <span className="text-4xl block mb-3">{activeTabInfo.symbol}</span>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">{t(`teach.${activeTab}.name`)}</h2>
          <p className="text-sm text-muted-foreground font-body max-w-lg mx-auto leading-relaxed">{t(`teach.${activeTab}.desc`)}</p>
        </div>

        {/* Teachings list */}
        <div className="space-y-3">
          {teachings.map((teaching, i) => (
            <div
              key={i}
              className={`rounded-xl border bg-card overflow-hidden transition-all ${
                teaching.free
                  ? "border-border hover:border-primary/40 cursor-pointer"
                  : "border-border/50"
              } ${expandedTeaching === i ? "border-primary/60 shadow-lg shadow-primary/10" : ""}`}
              onClick={() => { if (teaching.free) setExpandedTeaching(expandedTeaching === i ? null : i); }}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground mb-1">{t(teaching.titleKey)}</h3>
                    {teaching.free && (
                      <p className="text-xs text-muted-foreground font-body">{t(teaching.tagsKey)}</p>
                    )}
                  </div>
                  {!teaching.free && (
                    <span className="flex items-center gap-1 text-[10px] text-primary font-body bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">
                      <Lock size={10} /> {t("teachings.premium")}
                    </span>
                  )}
                </div>
              </div>
              {expandedTeaching === i && teaching.free && (
                <div className="px-5 pb-5 animate-fade-in">
                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-foreground font-body leading-relaxed">{t(teaching.contentKey)}</p>
                  </div>
                </div>
              )}
              {!teaching.free && (
                <div className="px-5 pb-4">
                  <div className="border-t border-border/50 pt-3">
                    <p className="text-xs text-muted-foreground font-body italic">{t("teachings.unlock_hint")}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Unlock CTA */}
        <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
          <span className="text-2xl block mb-3">✦</span>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{t("teachings.unlock_all")}</h3>
          <p className="text-xs text-muted-foreground font-body mb-4">{t("teachings.lesson_count")}</p>
          <Link to="/pricing">
            <Button className="font-body" size="sm">{t("teachings.view_plans")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Teachings;
