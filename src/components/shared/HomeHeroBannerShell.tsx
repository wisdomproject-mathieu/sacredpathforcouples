import type { ReactNode } from "react";

import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { cn } from "@/lib/utils";

type HomeHeroBannerShellProps = {
  eyebrow: string;
  quote: string;
  left: ReactNode;
  right: ReactNode;
  className?: string;
  iconSrc?: string;
};

const HomeHeroBannerShell = ({
  eyebrow,
  quote,
  left,
  right,
  className,
  iconSrc = shivaShaktiIcon,
}: HomeHeroBannerShellProps) => (
  <section
    className={cn(
      "relative overflow-hidden rounded-[24px] border border-amber-400/20 bg-card/35 p-5",
      className,
    )}
  >
    <div className="absolute -right-10 top-0 opacity-15">
      <img src={iconSrc} alt="" className="h-40 w-40 rounded-[20px]" />
    </div>
    <p className="text-xs uppercase tracking-[0.22em] text-amber-400/75">{eyebrow}</p>
    <p className="mt-2 max-w-2xl text-sm italic text-muted-foreground/80">“{quote}”</p>
    <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  </section>
);

export default HomeHeroBannerShell;
