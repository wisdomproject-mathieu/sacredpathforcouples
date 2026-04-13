import { Link } from "react-router-dom";
import { Lock, LockOpen } from "lucide-react";

import type { Language } from "@/contexts/LanguageContext";
import type { TempleJourneyTemplate } from "@/lib/premiumArchitecture";

type Props = {
  lang: Language;
  title: string;
  subtitle: string;
  journeys: TempleJourneyTemplate[];
  isPremium: boolean;
  previewLimit?: number;
  viewAllLabel?: string;
  onViewAll?: () => void;
};

const TempleJourneysCard = ({
  lang,
  title,
  subtitle,
  journeys,
  isPremium,
  previewLimit,
  viewAllLabel,
  onViewAll,
}: Props) => {
  const visibleJourneys = previewLimit ? journeys.slice(0, previewLimit) : journeys;

  return (
  <section className="rounded-[24px] border border-border/30 bg-card/45 p-4">
    <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{title}</p>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">{subtitle}</p>

    <div className="mt-3 space-y-2">
      {visibleJourneys.map((journey) => {
        const locked = !isPremium && !journey.freePreview;
        return (
          <article
            key={journey.id}
            className={`rounded-[16px] border p-3 ${locked ? "border-amber-300/25 bg-amber-500/6" : "border-border/30 bg-background/45"}`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h4 className="truncate font-display text-xl text-foreground">{journey.title}</h4>
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{journey.duration}</p>
              </div>
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full border ${
                  locked
                    ? "border-amber-300/35 bg-amber-500/14 text-amber-200"
                    : "border-emerald-300/35 bg-emerald-500/14 text-emerald-200"
                }`}
              >
                {locked ? <Lock className="h-3.5 w-3.5" /> : <LockOpen className="h-3.5 w-3.5" />}
              </span>
            </div>
            <p className={`mt-2 text-sm leading-6 ${locked ? "text-foreground/70" : "text-foreground/90"}`}>
              {journey.teaser}
            </p>

            {locked ? (
              <Link
                to="/pricing?entry=journey-program"
                className="mt-3 inline-flex rounded-lg border border-amber-300/35 bg-amber-500/12 px-3 py-1.5 text-xs text-foreground transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
              >
                {lang === "fr"
                  ? "Ouvrir avec Accès Temple"
                  : lang === "cs"
                  ? "Otevřít s Chrámovým přístupem"
                  : "Open with Temple Access"}
              </Link>
            ) : null}
          </article>
        );
      })}
    </div>
    {previewLimit && journeys.length > visibleJourneys.length && onViewAll ? (
      <button
        type="button"
        onClick={onViewAll}
        className="mt-3 rounded-lg border border-border/35 bg-background/45 px-3 py-1.5 text-xs text-foreground transition-all hover:border-border/55 hover:bg-background/60"
      >
        {viewAllLabel ??
          (lang === "fr" ? "Voir tous les parcours" : lang === "cs" ? "Zobrazit všechny cesty" : "View all journeys")}
      </button>
    ) : null}
  </section>
  );
};

export default TempleJourneysCard;
