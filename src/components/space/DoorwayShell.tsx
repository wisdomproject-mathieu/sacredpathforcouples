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
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[26px] border border-primary/15 bg-gradient-to-br from-primary/14 via-background/95 to-background p-5 shadow-[0_22px_80px_-46px_rgba(255,173,70,0.38)] backdrop-blur-sm md:p-6">
        <div className="pointer-events-none absolute inset-0 opacity-65">
          <div className="absolute -left-10 top-0 h-28 w-28 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-32 w-32 rounded-full bg-amber-400/8 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-fuchsia-400/8 blur-3xl" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-primary/75">{label}</p>
          <h2 className="mt-2.5 font-display text-2xl text-foreground md:text-3xl">{title}</h2>
          <p className="mt-2.5 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </section>

      {children}
    </div>
  );
};

export default DoorwayShell;
