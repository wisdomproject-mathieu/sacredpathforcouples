import NotificationBadge from "@/components/space/journey/NotificationBadge";

type Props = {
  title: string;
  latestSignalLabel: string;
  latestSignalBody: string;
  lastMessageLabel: string;
  lastMessageBody: string;
  unreadCount?: number;
  openBoardLabel: string;
  composeLabel: string;
  newChipLabel: string;
  onOpenBoard: () => void;
  onCompose: () => void;
};

const TempleBoardPreviewCard = ({
  title,
  latestSignalLabel,
  latestSignalBody,
  lastMessageLabel,
  lastMessageBody,
  unreadCount = 0,
  openBoardLabel,
  composeLabel,
  newChipLabel,
  onOpenBoard,
  onCompose,
}: Props) => (
  <article className="relative rounded-[20px] border border-border/30 bg-card/45 p-4">
    <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{title}</p>
    <div className="mt-3 rounded-xl border border-border/30 bg-background/45 p-3">
      <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{latestSignalLabel}</p>
      <p className="mt-1 line-clamp-2 text-sm text-foreground/90">{latestSignalBody}</p>
    </div>
    <div className="mt-2 rounded-xl border border-border/30 bg-background/45 p-3">
      <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{lastMessageLabel}</p>
      <p className="mt-1 line-clamp-2 text-sm text-foreground/90">{lastMessageBody}</p>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={onOpenBoard}
        className="rounded-lg border border-primary/25 bg-primary/12 px-3 py-1.5 text-xs text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
      >
        {openBoardLabel}
      </button>
      <button
        type="button"
        onClick={onCompose}
        className="rounded-lg border border-border/35 bg-background/45 px-3 py-1.5 text-xs text-foreground transition-all hover:border-border/55 hover:bg-background/60"
      >
        {composeLabel}
      </button>
    </div>
    <NotificationBadge show={unreadCount > 0} count={unreadCount} chipLabel={unreadCount > 0 ? newChipLabel : undefined} />
  </article>
);

export default TempleBoardPreviewCard;
