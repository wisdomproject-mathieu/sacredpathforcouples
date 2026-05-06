import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

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
  locked?: boolean;
  premiumTeaser?: string;
  unlockLabel?: string;
  unlockTo?: string;
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
  locked = false,
  premiumTeaser,
  unlockLabel,
  unlockTo = "/pricing",
  actionLabel,
  sourceCtaLabel,
  onAction,
}: Props) => (
  <article className={`rounded-[18px] border p-3 ${locked ? "border-amber-300/25 bg-amber-500/6" : "border-border/30 bg-background/45"}`}>
    <h4 className="font-display text-xl text-foreground">{title}</h4>
    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-primary/80">{subtitle}</p>
    <p className={`mt-2 text-sm leading-6 ${locked ? "text-foreground/80" : "text-muted-foreground"}`}>
      {locked && premiumTeaser ? premiumTeaser : description}
    </p>

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

    <p className="mt-2 text-xs leading-5 text-muted-foreground">
      {locked && premiumTeaser ? premiumTeaser : sourceExplanation}
    </p>

    <div className="mt-3 flex flex-wrap gap-2">
      {locked && unlockLabel ? (
        <Link
          to={unlockTo}
          className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300/35 bg-amber-500/12 px-3 py-1.5 text-xs text-foreground transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
        >
          <Lock className="h-3 w-3" />
          {unlockLabel}
        </Link>
      ) : null}
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="rounded-lg border border-primary/25 bg-primary/12 px-3 py-1.5 text-xs text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
        >
          {actionLabel}
        </button>
      ) : null}
      {!locked ? libraryLinks.slice(0, 2).map((link) => (
        <span
          key={`${link.label}-${link.to}`}
          className="rounded-lg border border-border/35 bg-card/45 px-3 py-1.5 text-xs text-foreground/85"
        >
          {sourceCtaLabel}: {link.label}
        </span>
      )) : null}
    </div>
  </article>
);

export default RitualRecommendationCard;
