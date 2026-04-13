import { Link } from "react-router-dom";

import type { LibraryLink } from "@/lib/weatherMatch";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  ritualDuration: string;
  intimacyLevel: string;
  primaryNeed: string;
  sourceTraditions: string[];
  sourceAuthors: string[];
  sourceExplanation: string;
  libraryLinks: LibraryLink[];
  actionLabel?: string;
  sourceCtaLabel: string;
  onAction?: () => void;
};

const RitualRecommendationCard = ({
  title,
  subtitle,
  description,
  ritualDuration,
  intimacyLevel,
  primaryNeed,
  sourceTraditions,
  sourceAuthors,
  sourceExplanation,
  libraryLinks,
  actionLabel,
  sourceCtaLabel,
  onAction,
}: Props) => (
  <article className="rounded-[18px] border border-border/30 bg-background/45 p-3">
    <h4 className="font-display text-xl text-foreground">{title}</h4>
    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-primary/80">{subtitle}</p>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>

    <div className="mt-3 flex flex-wrap gap-2">
      <span className="rounded-full border border-border/35 bg-card/45 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-foreground/90">
        {ritualDuration}
      </span>
      <span className="rounded-full border border-border/35 bg-card/45 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-foreground/90">
        {intimacyLevel}
      </span>
      <span className="rounded-full border border-border/35 bg-card/45 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-foreground/90">
        {primaryNeed}
      </span>
    </div>

    <div className="mt-3 flex flex-wrap gap-1.5">
      {sourceTraditions.slice(0, 3).map((tag) => (
        <span key={`tradition-${tag}`} className="rounded-full border border-primary/30 bg-primary/12 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-primary/90">
          {tag}
        </span>
      ))}
      {sourceAuthors.slice(0, 2).map((tag) => (
        <span key={`author-${tag}`} className="rounded-full border border-border/35 bg-card/45 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-foreground/90">
          {tag}
        </span>
      ))}
    </div>

    <p className="mt-2 text-xs leading-5 text-muted-foreground">{sourceExplanation}</p>

    <div className="mt-3 flex flex-wrap gap-2">
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="rounded-lg border border-primary/25 bg-primary/12 px-3 py-1.5 text-xs text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
        >
          {actionLabel}
        </button>
      ) : null}
      {libraryLinks.slice(0, 2).map((link) => (
        <Link
          key={`${link.label}-${link.to}`}
          to={link.to}
          className="rounded-lg border border-border/35 bg-card/45 px-3 py-1.5 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
        >
          {sourceCtaLabel}: {link.label}
        </Link>
      ))}
    </div>
  </article>
);

export default RitualRecommendationCard;
