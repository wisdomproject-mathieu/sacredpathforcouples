import { ReactNode } from "react";

interface DoorwayShellProps {
  label: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionDisabled?: boolean;
  children: ReactNode;
}

const DoorwayShell = ({
  label,
  title,
  description,
  actionLabel,
  onAction,
  actionDisabled,
  children,
}: DoorwayShellProps) => {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[28px] border border-primary/15 bg-gradient-to-br from-primary/16 via-background to-background p-6 shadow-[0_26px_90px_-50px_rgba(255,173,70,0.42)]">
        <div className="pointer-events-none absolute inset-0 opacity-75">
          <div className="absolute -left-10 top-0 h-28 w-28 rounded-full bg-rose-500/12 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-fuchsia-400/10 blur-3xl" />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">{label}</p>
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">{title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">{description}</p>
          </div>

          {actionLabel && onAction && (
            <button
              type="button"
              onClick={onAction}
              disabled={actionDisabled}
              className="rounded-2xl border border-primary/25 bg-primary/12 px-4 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16 disabled:opacity-60"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </section>

      {children}
    </div>
  );
};

export default DoorwayShell;
