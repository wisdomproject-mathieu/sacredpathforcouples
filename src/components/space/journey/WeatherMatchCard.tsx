import { useState } from "react";

import NotificationBadge from "@/components/space/journey/NotificationBadge";
import RitualRecommendationCard from "@/components/space/journey/RitualRecommendationCard";
import type { WeatherMatchResult } from "@/lib/weatherMatch";

type Props = {
  title: string;
  result: WeatherMatchResult;
  unreadCount?: number;
  openRitualLabel: string;
  exploreLabel: string;
  firstEnergyLabel: string;
  secondEnergyLabel: string;
  combinedEnergyLabel: string;
  newChipLabel: string;
  onOpenRitual: () => void;
  onExplore: () => void;
  recommendationActionLabel: string;
};

const WeatherMatchCard = ({
  title,
  result,
  unreadCount = 0,
  openRitualLabel,
  exploreLabel,
  firstEnergyLabel,
  secondEnergyLabel,
  combinedEnergyLabel,
  newChipLabel,
  onOpenRitual,
  onExplore,
  recommendationActionLabel,
}: Props) => {
  const [showExplore, setShowExplore] = useState(false);

  return (
    <article className="relative rounded-[24px] border border-primary/25 bg-primary/10 p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-primary/80">{title}</p>
      <h3 className="mt-2 font-display text-3xl text-foreground">{result.pairLabel}</h3>
      <p className="mt-2 text-sm leading-6 text-foreground/90">{result.interpretation}</p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{result.summary}</p>

      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {result.recommendations.slice(0, 4).map((item) => (
          <RitualRecommendationCard
            key={item.id}
            title={item.title}
            description={item.description}
            actionLabel={recommendationActionLabel}
            onAction={onOpenRitual}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onOpenRitual}
          className="rounded-xl border border-primary/25 bg-primary/15 px-3 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/20"
        >
          {openRitualLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowExplore((value) => !value);
            onExplore();
          }}
          className="rounded-xl border border-border/35 bg-background/45 px-3 py-2 text-sm text-foreground transition-all hover:border-border/55 hover:bg-background/60"
        >
          {exploreLabel}
        </button>
      </div>

      {showExplore ? (
        <div className="mt-4 space-y-2 rounded-[18px] border border-border/30 bg-background/45 p-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{firstEnergyLabel}</p>
          <p className="text-sm leading-6 text-foreground/90">{result.firstMeaning}</p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{secondEnergyLabel}</p>
          <p className="text-sm leading-6 text-foreground/90">{result.secondMeaning}</p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{combinedEnergyLabel}</p>
          <p className="text-sm leading-6 text-primary/90">{result.combinedMeaning}</p>
        </div>
      ) : null}

      <NotificationBadge
        show={unreadCount > 0}
        count={unreadCount}
        chipLabel={unreadCount > 0 ? newChipLabel : undefined}
      />
    </article>
  );
};

export default WeatherMatchCard;
