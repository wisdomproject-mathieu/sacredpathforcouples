import NotificationBadge from "@/components/space/journey/NotificationBadge";

type Props = {
  title: string;
  preview: string;
  timestamp?: string;
  emptyText: string;
  unreadCount?: number;
  newChipLabel: string;
  primaryCta: string;
  secondaryCta: string;
  onPrimary: () => void;
  onSecondary: () => void;
};

const LatestBelovedCard = ({
  title,
  preview,
  timestamp,
  emptyText,
  unreadCount = 0,
  newChipLabel,
  primaryCta,
  secondaryCta,
  onPrimary,
  onSecondary,
}: Props) => (
  <article className="relative rounded-[20px] border border-border/30 bg-card/45 p-4">
    <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{title}</p>
    <p className="mt-2 line-clamp-3 text-sm leading-6 text-foreground/90">{preview || emptyText}</p>
    {timestamp ? <p className="mt-1 text-xs text-muted-foreground">{new Date(timestamp).toLocaleString()}</p> : null}
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={onPrimary}
        className="rounded-lg border border-primary/25 bg-primary/12 px-3 py-1.5 text-xs text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
      >
        {primaryCta}
      </button>
      <button
        type="button"
        onClick={onSecondary}
        className="rounded-lg border border-border/35 bg-background/45 px-3 py-1.5 text-xs text-foreground transition-all hover:border-border/55 hover:bg-background/60"
      >
        {secondaryCta}
      </button>
    </div>
    <NotificationBadge show={unreadCount > 0} count={unreadCount} chipLabel={unreadCount > 0 ? newChipLabel : undefined} />
  </article>
);

export default LatestBelovedCard;
