import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import BreathIcon from "@/components/tantra-icons/BreathIcon";
import FlameIcon from "@/components/tantra-icons/FlameIcon";
import LotusIcon from "@/components/tantra-icons/LotusIcon";
import ChakraIcon from "@/components/tantra-icons/ChakraIcon";
import SacredGeometryIcon from "@/components/tantra-icons/SacredGeometryIcon";
import YinYangIcon from "@/components/tantra-icons/YinYangIcon";

const ritualIcons = [BreathIcon, FlameIcon, LotusIcon, ChakraIcon, SacredGeometryIcon, YinYangIcon];
const ritualDurations = ["5 min", "10 min", "7 min", "15 min", "10 min", "12 min"];

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
          {ritualIcons.map((Icon, index) => (
            <div
              key={index}
              className={`group rounded-xl border bg-card p-5 transition-all cursor-pointer ${
                expandedRitual === index ? "border-primary/60 shadow-lg shadow-primary/10" : "border-border hover:border-primary/30"
              }`}
              onClick={() => setExpandedRitual(expandedRitual === index ? null : index)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-primary mt-1"><Icon size={36} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-heading text-base font-semibold text-foreground">{t(`ritual.${index}.title`)}</h3>
                    <span className="text-[10px] text-primary font-body bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">{ritualDurations[index]}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-body leading-relaxed">{t(`ritual.${index}.desc`)}</p>
                  {expandedRitual === index && (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reconnect;
