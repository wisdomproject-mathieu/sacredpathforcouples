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

const tools = [
  { icon: BreathIcon, key: "intimacy_games", free: true },
  { icon: FlameIcon, key: "intimacy_weather", free: true },
  { icon: LotusIcon, key: "the_unsaid", free: false },
  { icon: ChakraIcon, key: "the_thread", free: false },
  { icon: SacredGeometryIcon, key: "date_night", free: false },
  { icon: YinYangIcon, key: "shared_messages", free: false },
];

const Reconnect = () => {
  const { t } = useLanguage();
  const [expandedTool, setExpandedTool] = useState<number | null>(null);

  return (
    <div className="px-4 py-8 pb-24">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-body uppercase tracking-[0.25em] text-primary mb-2 block">
            {t("reconnect.for_two")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-4">
            {t("reconnect.title")}
          </h1>
          <p className="text-muted-foreground font-body text-sm md:text-base max-w-lg leading-relaxed">
            {t("reconnect.desc")}
          </p>
        </div>

        {/* Reconnect Tonight */}
        <div className="rounded-xl border border-border/50 bg-card/50 p-6 md:p-8 mb-8">
          <span className="text-[10px] font-body uppercase tracking-[0.25em] text-primary mb-3 block">
            {t("reconnect.tonight_label")}
          </span>
          <p className="font-heading text-xl md:text-2xl text-foreground leading-relaxed">
            {t("reconnect.tonight_text")}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-3 md:grid-cols-2">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const isExpanded = expandedTool === index;

            return (
              <div
                key={tool.key}
                className={`rounded-xl border bg-card/60 p-5 md:p-6 transition-all ${
                  tool.free
                    ? "cursor-pointer border-border/50 hover:border-primary/30"
                    : "border-border/30"
                } ${isExpanded ? "border-primary/50 shadow-lg shadow-primary/5" : ""}`}
                onClick={() =>
                  tool.free && setExpandedTool(isExpanded ? null : index)
                }
              >
                <div className={`mb-3 ${tool.free ? "text-primary" : "text-muted-foreground/40"}`}>
                  <Icon size={28} />
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h3
                    className={`font-heading text-base md:text-lg font-semibold ${
                      tool.free ? "text-foreground" : "text-muted-foreground/60"
                    }`}
                  >
                    {t(`reconnect.tool.${tool.key}.title`)}
                  </h3>
                  {!tool.free && (
                    <Lock size={12} className="text-primary/60" />
                  )}
                </div>
                <p
                  className={`text-xs md:text-sm font-body leading-relaxed ${
                    tool.free ? "text-muted-foreground" : "text-muted-foreground/40"
                  }`}
                >
                  {t(`reconnect.tool.${tool.key}.desc`)}
                </p>

                {/* Expanded steps for free tools */}
                {isExpanded && tool.free && (
                  <div className="mt-5 pt-4 border-t border-border/30 space-y-2 animate-fade-in">
                    <h4 className="text-[10px] font-body uppercase tracking-[0.2em] text-primary mb-3">
                      {t("reconnect.how_to")}
                    </h4>
                    <ol className="space-y-1.5">
                      {[0, 1, 2, 3].map((si) => (
                        <li
                          key={si}
                          className="flex items-start gap-2 text-xs text-muted-foreground font-body"
                        >
                          <span className="text-primary font-semibold mt-px">
                            {si + 1}.
                          </span>
                          {t(`reconnect.tool.${tool.key}.step.${si}`)}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Premium hint */}
                {!tool.free && (
                  <p className="text-[10px] text-muted-foreground/50 font-body italic mt-2">
                    {t("teachings.unlock_hint")}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Unlock CTA */}
        <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            {t("reconnect.unlock")}
          </h3>
          <p className="text-xs text-muted-foreground font-body mb-4 max-w-md mx-auto">
            {t("reconnect.unlock_desc")}
          </p>
          <Link to="/pricing">
            <Button className="font-body" size="sm">
              {t("teachings.view_plans")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reconnect;
