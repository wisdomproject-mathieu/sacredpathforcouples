import { type ReactNode } from "react";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";

type SacredSectionShellProps = {
  children: ReactNode;
};

const SacredSectionShell = ({ children }: SacredSectionShellProps) => (
  <div className="relative overflow-hidden rounded-[30px] border border-border/25 bg-background/72 p-3 shadow-[0_26px_80px_-46px_rgba(0,0,0,0.72)] backdrop-blur-md md:p-4">
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <img
        src={shivaShaktiIcon}
        alt=""
        className="h-full w-full object-contain object-center opacity-[0.16] md:opacity-[0.22]"
        style={{ transform: "scale(1.06)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/56 via-background/68 to-background/88" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-transparent to-background/45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.58)_100%)]" />
    </div>
    <div className="relative z-10">{children}</div>
  </div>
);

export default SacredSectionShell;
