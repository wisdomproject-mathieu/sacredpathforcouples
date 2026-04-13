type Props = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

const RitualRecommendationCard = ({ title, description, actionLabel, onAction }: Props) => (
  <article className="rounded-[18px] border border-border/30 bg-background/45 p-3">
    <h4 className="font-display text-xl text-foreground">{title}</h4>
    <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
    {actionLabel && onAction ? (
      <button
        type="button"
        onClick={onAction}
        className="mt-3 rounded-lg border border-primary/25 bg-primary/12 px-3 py-1.5 text-xs text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
      >
        {actionLabel}
      </button>
    ) : null}
  </article>
);

export default RitualRecommendationCard;
