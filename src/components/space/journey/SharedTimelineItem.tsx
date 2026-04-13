import { useState } from "react";

export type JourneyTimelineItem = {
  id: string;
  type: "weather" | "ritual" | "message" | "offering" | "oracle" | "invitation" | "note" | "intention" | "nudge" | "acknowledgement";
  typeLabel?: string;
  authorLabel: string;
  preview: string;
  createdAt: string;
  unread: boolean;
  actionLabel?: string;
  onAction?: () => void;
};

type Props = {
  item: JourneyTimelineItem;
  expandLabel: string;
  collapseLabel: string;
};

const SharedTimelineItem = ({ item, expandLabel, collapseLabel }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = item.preview.length > 120;

  return (
    <article className={`rounded-[16px] border p-3 ${item.unread ? "border-primary/25 bg-primary/8" : "border-border/30 bg-background/45"}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full border border-border/35 bg-card/45 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          {item.typeLabel ?? item.type}
        </span>
        <span className="text-[11px] text-muted-foreground">
          {item.authorLabel} · {new Date(item.createdAt).toLocaleString()}
        </span>
      </div>

      <p className={`mt-2 text-sm leading-6 text-foreground/90 ${!expanded ? "line-clamp-2" : ""}`}>{item.preview}</p>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {isLong ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="rounded-lg border border-border/35 bg-card/45 px-2.5 py-1 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
          >
            {expanded ? collapseLabel : expandLabel}
          </button>
        ) : null}
        {item.actionLabel && item.onAction ? (
          <button
            type="button"
            onClick={item.onAction}
            className="rounded-lg border border-border/35 bg-card/45 px-2.5 py-1 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
          >
            {item.actionLabel}
          </button>
        ) : null}
      </div>
    </article>
  );
};

export default SharedTimelineItem;
