import { useState } from "react";

import type { ReactNode } from "react";

type Props = {
  title: string;
  preview: string;
  expandLabel: string;
  collapseLabel: string;
  children: ReactNode;
};

const ExpandableWisdomSection = ({
  title,
  preview,
  expandLabel,
  collapseLabel,
  children,
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="rounded-xl border border-border/30 bg-background/45 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.14em] text-primary/80">{title}</p>
          <p className="mt-1 text-sm leading-6 text-foreground/90">{preview}</p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="rounded-lg border border-border/35 bg-card/45 px-2.5 py-1 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
        >
          {expanded ? collapseLabel : expandLabel}
        </button>
      </div>
      {expanded ? <div className="mt-3">{children}</div> : null}
    </section>
  );
};

export default ExpandableWisdomSection;
