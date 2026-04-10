import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import FlameIcon from "@/components/tantra-icons/FlameIcon";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const teachingMeta = [
  { teacher: "Osho", free: true },
  { teacher: "David Deida", free: true },
  { teacher: "Margot Anand", free: true },
  { teacher: "Mantak Chia", free: false },
  { teacher: "Diana Richardson", free: false },
  { teacher: "Barry Long", free: false },
  { teacher: "Osho", free: false },
  { teacher: "David Deida", free: false },
];

const Teachings = () => {
  const { t } = useLanguage();
  const [expandedTeaching, setExpandedTeaching] = useState<number | null>(null);

  return (
    <div className="px-4 py-8 pb-24">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-semibold text-foreground mb-2">{t("teachings.title")}</h1>
          <p className="text-muted-foreground font-body text-sm">{t("teachings.desc")}</p>
        </div>

        <div className="space-y-3">
          {teachingMeta.map((tm, i) => {
            const title = i < 3 ? t(`teaching.${i}.title`) : t(`teaching.${i}.title`);
            const content = i < 3 ? t(`teaching.${i}.content`) : "";

            return (
              <div
                key={i}
                className={`rounded-xl border bg-card transition-all overflow-hidden ${
                  tm.free ? "border-border hover:border-primary/40 cursor-pointer" : "border-border/50"
                } ${expandedTeaching === i ? "border-primary/60 shadow-lg shadow-primary/10" : ""}`}
                onClick={() => { if (tm.free) setExpandedTeaching(expandedTeaching === i ? null : i); }}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-heading font-bold text-sm">
                        {tm.teacher[0]}
                      </div>
                      <div>
                        <h3 className="font-heading text-sm font-semibold text-foreground">{title}</h3>
                        <p className="text-xs text-muted-foreground font-body">{tm.teacher}</p>
                      </div>
                    </div>
                    {!tm.free && (
                      <span className="flex items-center gap-1 text-[10px] text-primary font-body bg-primary/10 px-2 py-0.5 rounded-full">
                        <Lock size={10} /> {t("teachings.premium")}
                      </span>
                    )}
                  </div>
                </div>
                {expandedTeaching === i && tm.free && (
                  <div className="px-4 pb-4 animate-fade-in">
                    <div className="border-t border-border pt-4">
                      <p className="text-sm text-foreground font-body leading-relaxed">{content}</p>
                    </div>
                  </div>
                )}
                {!tm.free && (
                  <div className="px-4 pb-4">
                    <div className="border-t border-border/50 pt-3">
                      <p className="text-xs text-muted-foreground font-body italic">{t("teachings.unlock_hint")}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
          <FlameIcon className="text-primary mx-auto mb-3" size={32} />
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
