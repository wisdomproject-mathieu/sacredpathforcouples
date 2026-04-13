type Props = {
  title: string;
  body: string;
  ctaLabel?: string;
  onCta?: () => void;
};

const EmptyStateCard = ({ title, body, ctaLabel, onCta }: Props) => (
  <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
    <h3 className="font-display text-2xl text-foreground">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    {ctaLabel && onCta ? (
      <button
        type="button"
        onClick={onCta}
        className="mt-4 rounded-xl border border-primary/25 bg-primary/12 px-3 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
      >
        {ctaLabel}
      </button>
    ) : null}
  </div>
);

export default EmptyStateCard;
