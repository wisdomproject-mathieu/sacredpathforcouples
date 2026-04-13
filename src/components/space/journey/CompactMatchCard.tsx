import { Link } from "react-router-dom";

import ExpandableWisdomSection from "@/components/space/journey/ExpandableWisdomSection";
import NotificationBadge from "@/components/space/journey/NotificationBadge";
import type { WeatherMatchResult } from "@/lib/weatherMatch";

type Props = {
  title: string;
  result: WeatherMatchResult | null;
  unreadCount?: number;
  emptyTitle: string;
  emptyBody: string;
  primaryCta: string;
  secondaryCta: string;
  openFullRitualLabel: string;
  viewAlternatesLabel: string;
  whyFitsLabel: string;
  wisdomBehindLabel: string;
  expandLabel: string;
  collapseLabel: string;
  newChipLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
  onOpenFull: () => void;
};

const CompactMatchCard = ({
  title,
  result,
  unreadCount = 0,
  emptyTitle,
  emptyBody,
  primaryCta,
  secondaryCta,
  openFullRitualLabel,
  viewAlternatesLabel,
  whyFitsLabel,
  wisdomBehindLabel,
  expandLabel,
  collapseLabel,
  newChipLabel,
  onPrimary,
  onSecondary,
  onOpenFull,
}: Props) => {
  if (!result) {
    return (
      <section className="rounded-[22px] border border-border/30 bg-card/45 p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{title}</p>
        <h3 className="mt-2 font-display text-2xl text-foreground">{emptyTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{emptyBody}</p>
        <button
          type="button"
          onClick={onPrimary}
          className="mt-3 rounded-xl border border-primary/25 bg-primary/12 px-3 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
        >
          {primaryCta}
        </button>
      </section>
    );
  }

  const primaryRitual = result.recommendations[0];

  return (
    <section className="relative rounded-[22px] border border-primary/25 bg-primary/10 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{title}</p>
      <h3 className="mt-2 font-display text-3xl text-foreground">{result.archetype.title}</h3>
      <p className="mt-1 text-sm text-foreground/90">{result.interpretation}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {result.lineage.sourceTraditions.slice(0, 3).map((item) => (
          <span
            key={item}
            className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-primary/90"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-border/30 bg-background/45 p-3">
        <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{result.pairLabel}</p>
        <p className="mt-1 text-sm text-foreground/90">
          {primaryRitual ? primaryRitual.title : result.combinedMeaning}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onPrimary}
          className="rounded-xl border border-primary/25 bg-primary/15 px-3 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/20"
        >
          {primaryCta}
        </button>
        <button
          type="button"
          onClick={onSecondary}
          className="rounded-xl border border-border/35 bg-background/45 px-3 py-2 text-sm text-foreground transition-all hover:border-border/55 hover:bg-background/60"
        >
          {secondaryCta}
        </button>
      </div>

      <div className="mt-3 space-y-2">
        <ExpandableWisdomSection
          title={whyFitsLabel}
          preview={result.archetype.symbolicMeaning}
          expandLabel={expandLabel}
          collapseLabel={collapseLabel}
        >
          <p className="text-sm leading-6 text-foreground/90">{result.combinedMeaning}</p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">{result.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onOpenFull}
              className="rounded-lg border border-border/35 bg-card/45 px-3 py-1.5 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              {openFullRitualLabel}
            </button>
            {result.recommendations.length > 1 ? (
              <button
                type="button"
                onClick={onOpenFull}
                className="rounded-lg border border-border/35 bg-card/45 px-3 py-1.5 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
              >
                {viewAlternatesLabel}
              </button>
            ) : null}
          </div>
        </ExpandableWisdomSection>

        <ExpandableWisdomSection
          title={wisdomBehindLabel}
          preview={result.lineageLine}
          expandLabel={expandLabel}
          collapseLabel={collapseLabel}
        >
          <p className="text-sm leading-6 text-foreground/90">{result.lineage.sourceNotes}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {result.libraryLinks.slice(0, 2).map((link) => (
              <Link
                key={`${link.to}-${link.label}`}
                to={link.to}
                className="rounded-lg border border-border/35 bg-card/45 px-3 py-1.5 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </ExpandableWisdomSection>
      </div>

      <NotificationBadge
        show={unreadCount > 0}
        count={unreadCount}
        chipLabel={unreadCount > 0 ? newChipLabel : undefined}
      />
    </section>
  );
};

export default CompactMatchCard;
