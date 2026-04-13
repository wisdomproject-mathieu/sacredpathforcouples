import NotificationBadge from "@/components/space/journey/NotificationBadge";
import type { JourneyTimelineItem } from "@/components/space/journey/SharedTimelineItem";

type Props = {
  title: string;
  subtitle: string;
  items: JourneyTimelineItem[];
  unreadCount?: number;
  emptyText: string;
  viewFullLabel: string;
  newChipLabel: string;
  onViewFull: () => void;
};

const TimelinePreviewCard = ({
  title,
  subtitle,
  items,
  unreadCount = 0,
  emptyText,
  viewFullLabel,
  newChipLabel,
  onViewFull,
}: Props) => (
  <section className="relative rounded-[20px] border border-border/30 bg-card/45 p-4">
    <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{title}</p>
    <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    <div className="mt-3 space-y-2">
      {items.length ? (
        items.slice(0, 3).map((item) => (
          <article
            key={item.id}
            className={`rounded-xl border p-2.5 ${item.unread ? "border-primary/25 bg-primary/8" : "border-border/30 bg-background/45"}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{item.typeLabel ?? item.type}</p>
              <p className="text-[10px] text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-foreground/90">{item.preview}</p>
          </article>
        ))
      ) : (
        <p className="rounded-xl border border-border/30 bg-background/45 p-3 text-sm text-muted-foreground">{emptyText}</p>
      )}
    </div>

    <button
      type="button"
      onClick={onViewFull}
      className="mt-3 rounded-lg border border-border/35 bg-background/45 px-3 py-1.5 text-xs text-foreground transition-all hover:border-border/55 hover:bg-background/60"
    >
      {viewFullLabel}
    </button>

    <NotificationBadge show={unreadCount > 0} count={unreadCount} chipLabel={unreadCount > 0 ? newChipLabel : undefined} />
  </section>
);

export default TimelinePreviewCard;
