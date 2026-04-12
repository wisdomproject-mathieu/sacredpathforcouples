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
      <section className="rounded-[28px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_26px_90px_-50px_rgba(255,173,70,0.42)]">
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
