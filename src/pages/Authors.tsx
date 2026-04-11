import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lock, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const authors = [
  {
    id: "osho",
    symbol: "◉",
    free: true,
    tags: ["Tantra", "Consciousness", "Acceptance", "Energy"],
    books: "From Sex to Superconsciousness · Book of Secrets · Tantra",
  },
  {
    id: "deida",
    symbol: "✦",
    free: true,
    tags: ["Polarity", "Presence", "Edge", "Surrender"],
    books: "Way of the Superior Man · Intimate Communion · Blue Truth",
  },
  {
    id: "anand",
    symbol: "✧",
    free: true,
    tags: ["SkyDancing", "Ecstasy", "Sexual Magic", "Awakening"],
    books: "The Art of Sexual Ecstasy · The Art of Sexual Magic",
  },
  {
    id: "richardson",
    symbol: "✿",
    free: false,
    tags: ["Slow Sex", "Soft Entry", "Stillness", "Healing"],
    books: "Heart of Tantric Sex · Slow Sex · Tantric Sex for Men",
  },
  {
    id: "chia",
    symbol: "☯",
    free: false,
    tags: ["Chi Flow", "Jing", "Orbit", "Longevity"],
    books: "Taoist Secrets of Love · Multi-Orgasmic Couple · Healing Love",
  },
  {
    id: "day",
    symbol: "❋",
    free: false,
    tags: ["Tantra", "Embodiment", "Relationship", "Healing"],
    books: "Living Tantra · Sex, Spirit & Relationship · Practical Tantra",
  },
  {
    id: "bush",
    symbol: "⬡",
    free: false,
    tags: ["Technique", "Positions", "Connection", "Pleasure"],
    books: "Tantric Sex · Sex Positions · Guided Techniques",
  },
  {
    id: "hollander",
    symbol: "♠",
    free: false,
    tags: ["Erotic Honesty", "Play", "Pleasure", "Expression"],
    books: "The Happy Hooker · Happy Hooker's Guide to Sex · Xaviera's Fantastic Sex",
  },
  {
    id: "gold",
    symbol: "⟡",
    free: false,
    tags: ["Erotic Spirituality", "Potency", "Healing", "Energy"],
    books: "The Potency Principles · Long Time Coming · Sexual Energy Mastery",
  },
  {
    id: "long",
    symbol: "◈",
    free: false,
    tags: ["Truth", "Love", "Sexual Union", "Stillness"],
    books: "Making Love · To Woman in Love · Living Love",
  },
];

const Authors = () => {
  const { t } = useLanguage();
  const [expandedAuthor, setExpandedAuthor] = useState<string | null>(null);

  return (
    <div className="px-4 py-8 pb-24">
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-2">{t("authors.lineage")}</p>
          <h1 className="font-heading text-3xl font-semibold text-foreground mb-3">{t("authors.title")}</h1>
          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-lg mx-auto">{t("authors.subtitle")}</p>
        </div>

        {/* Author Cards */}
        <div className="space-y-4">
          {authors.map((author) => {
            const isLocked = !author.free;
            const isExpanded = expandedAuthor === author.id;
            const data = author.free ? {
              quoteKey: `author.${author.id}.quote`,
              ritualTitleKey: `author.${author.id}.ritual_title`,
              ritualDescKey: `author.${author.id}.ritual_desc`,
            } : null;

            return (
              <div key={author.id} className="rounded-xl border border-border bg-card overflow-hidden">
                {/* Card Header */}
                <div
                  className={`p-6 ${author.free ? "cursor-pointer" : ""}`}
                  onClick={() => author.free && setExpandedAuthor(isExpanded ? null : author.id)}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl text-primary flex-shrink-0 mt-1">{author.symbol}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="font-heading text-xl font-semibold text-foreground">
                          {t(`author.${author.id}.name`)}
                        </h2>
                        {isLocked && (
                          <span className="flex items-center gap-1 text-[10px] text-primary font-body bg-primary/10 px-2 py-0.5 rounded-full">
                            <Lock size={10} /> {t("teachings.premium")}
                          </span>
                        )}
                        {author.free && (
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
                        {t(`author.${author.id}.desc`)}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {author.tags.map((tag) => (
                          <span key={tag} className="text-[10px] text-primary/80 font-body bg-primary/5 px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] text-muted-foreground/60 font-body">{author.books}</p>
                    </div>
                  </div>
                </div>

                {/* Expanded Content — Free authors only */}
                {isExpanded && data && (
                  <div className="border-t border-border px-6 pb-6 pt-4 space-y-4 animate-fade-in">
                    {/* Free Quote */}
                    <div className="rounded-lg bg-secondary/30 p-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-body mb-2">
                        {t(`author.${author.id}.name`)}
                      </p>
                      <p className="text-foreground font-heading italic text-base leading-relaxed">
                        &ldquo;{t(data.quoteKey)}&rdquo;
                      </p>
                    </div>

                    {/* Free Ritual */}
                    <div className="rounded-lg bg-secondary/30 p-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-body mb-2">{t("paths.ritual")}</p>
                      <h3 className="font-heading text-sm font-semibold text-foreground mb-1.5">{t(data.ritualTitleKey)}</h3>
                      <p className="text-xs text-muted-foreground font-body leading-relaxed">{t(data.ritualDescKey)}</p>
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

                {/* Locked overlay for premium authors */}
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
          <p className="text-sm text-muted-foreground font-body mb-3">{t("authors.unlock_all_desc")}</p>
          <Link to="/pricing">
            <Button className="font-body" size="sm">{t("authors.unlock_all")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Authors;
