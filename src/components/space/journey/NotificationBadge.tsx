type Props = {
  count?: number;
  show?: boolean;
  chipLabel?: string;
  className?: string;
};

const NotificationBadge = ({ count = 0, show = false, chipLabel, className = "" }: Props) => {
  if (!show && !chipLabel) return null;

  return (
    <div className={`pointer-events-none absolute bottom-3 right-3 flex items-center gap-2 ${className}`}>
      {chipLabel ? (
        <span className="rounded-full border border-primary/30 bg-primary/12 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-primary/90">
          {chipLabel}
        </span>
      ) : null}
      {show ? (
        count > 1 ? (
          <span className="inline-flex min-w-5 items-center justify-center rounded-full border border-primary/30 bg-primary/16 px-1.5 py-0.5 text-[10px] font-medium text-primary/95 shadow-[0_0_18px_-8px_rgba(255,173,70,0.85)]">
            {count}
          </span>
        ) : (
          <span
            aria-label="Unread"
            className="inline-flex h-2.5 w-2.5 rounded-full border border-primary/35 bg-primary shadow-[0_0_18px_-6px_rgba(255,173,70,0.95)]"
          />
        )
      ) : null}
    </div>
  );
};

export default NotificationBadge;
