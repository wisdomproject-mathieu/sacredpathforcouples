import { useState } from "react";
import { Link } from "react-router-dom";

import NotificationBadge from "@/components/space/journey/NotificationBadge";
import RitualRecommendationCard from "@/components/space/journey/RitualRecommendationCard";
import type { WeatherMatchResult } from "@/lib/weatherMatch";

type Props = {
  title: string;
  result: WeatherMatchResult;
  unreadCount?: number;
  enterRitualLabel: string;
  readEnergiesLabel: string;
  firstEnergyLabel: string;
  secondEnergyLabel: string;
  combinedEnergyLabel: string;
  sourceHeadingLabel: string;
  sourceCtaLabel: string;
  whyFitsLabel: string;
  newChipLabel: string;
  onEnterRitual: () => void;
  onReadEnergies: () => void;
};

const WeatherMatchCard = ({
  title,
  result,
  unreadCount = 0,
  enterRitualLabel,
  readEnergiesLabel,
  firstEnergyLabel,
  secondEnergyLabel,
  combinedEnergyLabel,
  sourceHeadingLabel,
  sourceCtaLabel,
  whyFitsLabel,
  newChipLabel,
  onEnterRitual,
  onReadEnergies,
}: Props) => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <article className="relative overflow-hidden rounded-[24px] border border-primary/25 bg-primary/10 p-5">
      <div className="relative overflow-hidden rounded-[16px] border border-border/30 bg-background/45">
        <img src={result.heroImage.src} alt={result.heroImage.alt} className="h-44 w-full object-cover md:h-52" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs uppercase tracking-[0.18em] text-primary/90">{title}</p>
          <h3 className="mt-1 font-display text-3xl text-white">{result.archetype.title}</h3>
          <p className="mt-1 text-sm leading-6 text-white/85">{result.archetype.symbolicMeaning}</p>
        </div>
      </div>

      <p className="mt-4 text-sm uppercase tracking-[0.16em] text-primary/85">{result.pairLabel}</p>
      <p className="mt-2 text-base leading-7 text-foreground">{result.interpretation}</p>
      <p className="mt-1 text-sm leading-7 text-muted-foreground">{result.summary}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {result.lineage.sourceTraditions.map((tag) => (
          <span key={`tradition-${tag}`} className="rounded-full border border-primary/30 bg-primary/12 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-primary/90">
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{result.lineageLine}</p>

      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {result.recommendations.slice(0, 4).map((item) => (
          <RitualRecommendationCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            description={item.description}
            ritualDuration={item.ritualDuration}
            intimacyLevel={item.intimacyLevel}
            primaryNeed={item.primaryNeed}
            sourceTraditions={item.sourceTraditions}
            sourceAuthors={item.sourceAuthors}
            sourceExplanation={item.sourceExplanation}
            libraryLinks={item.libraryLinks}
            actionLabel={enterRitualLabel}
            sourceCtaLabel={sourceCtaLabel}
            onAction={onEnterRitual}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onEnterRitual}
          className="rounded-xl border border-primary/25 bg-primary/15 px-3 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/20"
        >
          {enterRitualLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowDrawer((value) => !value);
            onReadEnergies();
          }}
          className="rounded-xl border border-border/35 bg-background/45 px-3 py-2 text-sm text-foreground transition-all hover:border-border/55 hover:bg-background/60"
        >
          {readEnergiesLabel}
        </button>
      </div>

      {showDrawer ? (
        <div className="mt-4 space-y-3 rounded-[18px] border border-border/30 bg-background/45 p-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{firstEnergyLabel}</p>
          <p className="text-sm leading-6 text-foreground/90">{result.firstMeaning}</p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{secondEnergyLabel}</p>
          <p className="text-sm leading-6 text-foreground/90">{result.secondMeaning}</p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{combinedEnergyLabel}</p>
          <p className="text-sm leading-6 text-primary/90">{result.combinedMeaning}</p>

          <div className="rounded-xl border border-primary/20 bg-primary/8 p-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-primary/85">{sourceHeadingLabel}</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{result.lineage.sourceNotes}</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{whyFitsLabel}: {result.archetype.bestPath}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {result.libraryLinks.slice(0, 3).map((link) => (
              <Link
                key={`${link.to}-${link.label}`}
                to={link.to}
                className="rounded-lg border border-border/35 bg-card/45 px-3 py-1.5 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
              >
                {sourceCtaLabel}: {link.label}
              </Link>
            ))}
          </div>
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
