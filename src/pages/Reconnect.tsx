import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BreathIcon from "@/components/tantra-icons/BreathIcon";
import FlameIcon from "@/components/tantra-icons/FlameIcon";
import LotusIcon from "@/components/tantra-icons/LotusIcon";
import ChakraIcon from "@/components/tantra-icons/ChakraIcon";
import SacredGeometryIcon from "@/components/tantra-icons/SacredGeometryIcon";
import YinYangIcon from "@/components/tantra-icons/YinYangIcon";

const ritualIcons = [BreathIcon, FlameIcon, LotusIcon, ChakraIcon, SacredGeometryIcon, YinYangIcon];
const ritualDurations = ["5 min", "10 min", "7 min", "15 min", "10 min", "12 min"];
const freeRituals = [0, 1]; // indices of free rituals

const Reconnect = () => {
  const { t } = useLanguage();
  const [expandedRitual, setExpandedRitual] = useState<number | null>(null);

  return (
    <div className="px-4 py-8 pb-24">
      <div className="container max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-semibold text-foreground mb-2">{t("reconnect.title")}</h1>
          <p className="text-muted-foreground font-body max-w-xl mx-auto text-sm">{t("reconnect.desc")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {ritualIcons.map((Icon, index) => {
            const isFree = freeRituals.includes(index);
            return (
              <div
                key={index}
                className={`group rounded-xl border bg-card p-5 transition-all ${
                  isFree ? "cursor-pointer" : ""
                } ${
                  expandedRitual === index ? "border-primary/60 shadow-lg shadow-primary/10" : 
                  isFree ? "border-border hover:border-primary/30" : "border-border/50"
                }`}
                onClick={() => isFree && setExpandedRitual(expandedRitual === index ? null : index)}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 mt-1 ${isFree ? "text-primary" : "text-muted-foreground/50"}`}>
                    <Icon size={36} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className={`font-heading text-base font-semibold ${isFree ? "text-foreground" : "text-muted-foreground/70"}`}>
                        {t(`ritual.${index}.title`)}
                      </h3>
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                        {!isFree && (
                          <span className="flex items-center gap-1 text-[10px] text-primary font-body bg-primary/10 px-2 py-0.5 rounded-full">
                            <Lock size={10} /> {t("teachings.premium")}
                          </span>
                        )}
                        <span className="text-[10px] text-primary font-body bg-primary/10 px-2 py-0.5 rounded-full">
                          {ritualDurations[index]}
                        </span>
                      </div>
                    </div>
                    <p className={`text-xs font-body leading-relaxed ${isFree ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                      {t(`ritual.${index}.desc`)}
                    </p>
                    {!isFree && (
                      <p className="text-xs text-muted-foreground font-body italic mt-2">{t("teachings.unlock_hint")}</p>
                    )}
                    {expandedRitual === index && isFree && (
                      <div className="mt-4 space-y-2 animate-fade-in">
                        <h4 className="text-xs font-heading uppercase tracking-widest text-primary">{t("reconnect.step_guide")}</h4>
                        <ol className="space-y-1.5">
                          {[0, 1, 2, 3, 4, 5].map((si) => (
                            <li key={si} className="flex items-start gap-2 text-xs text-muted-foreground font-body">
                              <span className="text-primary font-semibold mt-px">{si + 1}.</span>
                              {t(`ritual.${index}.step.${si}`)}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unlock CTA */}
        <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
          <span className="text-2xl block mb-3">✦</span>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{t("reconnect.unlock")}</h3>
          <p className="text-xs text-muted-foreground font-body mb-4">{t("reconnect.unlock_desc")}</p>
          <Link to="/pricing">
            <Button className="font-body" size="sm">{t("teachings.view_plans")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reconnect;
