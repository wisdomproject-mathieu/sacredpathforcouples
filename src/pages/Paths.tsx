import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lock, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const paths = [
  {
    id: "tantra",
    symbol: "◉",
    free: true,
    tags: ["Kundalini", "Chakras", "Sacred Union", "Energy Work"],
    lineage: "Osho · Vijnanabhairava · Margot Anand · Kashmir Shaivism",
    quoteAuthor: "Osho",
    quoteSource: "Tantric Wisdom",
  },
  {
    id: "tao",
    symbol: "◯",
    free: true,
    tags: ["Jing", "Valley Orgasm", "Chi Flow", "Wu Wei"],
    lineage: "Mantak Chia · Lao Tzu · Su Nu Ching · Chuang Tzu",
    quoteAuthor: "Lao Tzu",
    quoteSource: "Tao Te Ching",
  },
  {
    id: "kamasutra",
    symbol: "❋",
    free: false,
    tags: ["Positions", "Desire", "Art of Love", "Connection"],
    lineage: "Vātsyāyana · Ancient Indian Tradition",
    quoteAuthor: "",
    quoteSource: "",
  },
  {
    id: "sacred_sexuality",
    symbol: "✧",
    free: false,
    tags: ["Healing", "Embodiment", "Wholeness", "Presence"],
    lineage: "Modern Tantric Teachers · Somatic Traditions",
    quoteAuthor: "",
    quoteSource: "",
  },
];

const Paths = () => {
  const { t } = useLanguage();
  const [expandedPath, setExpandedPath] = useState<string | null>(null);

  return (
    <div className="px-4 py-8 pb-24">
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-2">{t("paths.lineage")}</p>
          <h1 className="font-heading text-3xl font-semibold text-foreground mb-3">{t("paths.title")}</h1>
          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-lg mx-auto">{t("paths.subtitle")}</p>
        </div>

        {/* Path Cards */}
        <div className="space-y-4">
          {paths.map((path) => {
            const isLocked = !path.free;
            const isExpanded = expandedPath === path.id;

            return (
              <div key={path.id} className="rounded-xl border border-border bg-card overflow-hidden">
                {/* Card Header */}
                <div
                  className={`p-6 ${path.free ? "cursor-pointer" : ""}`}
                  onClick={() => path.free && setExpandedPath(isExpanded ? null : path.id)}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl text-primary flex-shrink-0 mt-1">{path.symbol}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="font-heading text-xl font-semibold text-foreground">
                          {t(`path.${path.id}.name`)}
                        </h2>
                        {isLocked && (
                          <span className="flex items-center gap-1 text-[10px] text-primary font-body bg-primary/10 px-2 py-0.5 rounded-full">
                            <Lock size={10} /> {t("teachings.premium")}
                          </span>
                        )}
                        {path.free && (
                          <span className="ml-auto flex-shrink-0">
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3">
                        {t(`path.${path.id}.desc`)}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {path.tags.map((tag) => (
                          <span key={tag} className="text-[10px] text-primary/80 font-body bg-primary/5 px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] text-muted-foreground/60 font-body">{path.lineage}</p>
                    </div>
                  </div>
                </div>

                {/* Expanded Content — Free paths only */}
                {isExpanded && path.free && (
                  <div className="border-t border-border px-6 pb-6 pt-4 space-y-4 animate-fade-in">
                    {/* Free Quote */}
                    <div className="rounded-lg bg-secondary/30 p-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-body mb-2">
                        {path.quoteAuthor} — {path.quoteSource}
                      </p>
                      <p className="text-foreground font-heading italic text-base leading-relaxed">
                        &ldquo;{t(`path.${path.id}.quote`)}&rdquo;
                      </p>
                    </div>

                    {/* Free Ritual */}
                    <div className="rounded-lg bg-secondary/30 p-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-body mb-2">{t("paths.ritual")}</p>
                      <h3 className="font-heading text-sm font-semibold text-foreground mb-1.5">{t(`path.${path.id}.ritual_title`)}</h3>
                      <p className="text-xs text-muted-foreground font-body leading-relaxed">{t(`path.${path.id}.ritual_desc`)}</p>
                    </div>

                    {/* Premium teaser */}
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
                      <p className="text-xs text-muted-foreground font-body mb-2">{t("teachings.unlock_hint")}</p>
                      <Link to="/pricing">
                        <Button variant="outline" size="sm" className="font-body text-xs border-primary/30 text-primary hover:bg-primary/10">
                          {t("teachings.view_plans")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Locked overlay for premium paths */}
                {isLocked && (
                  <div className="border-t border-border/50 px-6 py-4 bg-card/50 text-center">
                    <Link to="/pricing">
                      <Button variant="outline" size="sm" className="font-body text-xs border-primary/30 text-primary hover:bg-primary/10">
                        <Lock size={12} className="mr-1.5" /> {t("teachings.view_plans")}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-body mb-2">✦</p>
          <p className="text-sm text-muted-foreground font-body mb-3">{t("paths.unlock_all_desc")}</p>
          <Link to="/pricing">
            <Button className="font-body" size="sm">{t("paths.unlock_all")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Paths;
