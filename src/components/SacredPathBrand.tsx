import { cn } from "@/lib/utils";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";

type SacredPathBrandProps = {
  className?: string;
};

const SacredPathBrand = ({ className }: SacredPathBrandProps) => (
  <div className={cn("flex items-center gap-3 rounded-[22px] border border-amber-400/22 bg-card/58 px-3 py-2.5 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.72)] backdrop-blur", className)}>
    <div className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-amber-400/20 bg-amber-400/10">
      <img src={shivaShaktiIcon} alt="" className="h-7 w-7 object-contain" />
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-[0.24em] text-amber-300/90">Sacred Path</p>
      <p className="font-display text-lg text-foreground">for Couples</p>
      <p className="text-[11px] leading-4 text-muted-foreground/80">Ancient wisdom for modern couples</p>
    </div>
  </div>
);

export default SacredPathBrand;
