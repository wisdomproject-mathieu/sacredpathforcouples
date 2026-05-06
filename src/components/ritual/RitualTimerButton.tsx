import { useState } from "react";
import { Timer as TimerIcon } from "lucide-react";

import RitualTimer from "@/components/ritual/RitualTimer";

type Props = {
  ritualTitle: string;
  ritualSource: string;
  chapterId?: string | null;
  coupleId?: string | null;
  suggestedDuration?: string | null;
  className?: string;
  variant?: "default" | "subtle" | "pill";
  label?: string;
};

const variants = {
  default:
    "inline-flex items-center gap-1.5 rounded-xl border border-amber-300/45 bg-gradient-to-r from-amber-500/18 to-amber-400/10 px-3.5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-amber-100 transition-all hover:from-amber-500/28 hover:to-amber-400/18",
  subtle:
    "inline-flex items-center gap-1.5 rounded-lg border border-amber-300/35 bg-amber-500/10 px-2.5 py-1.5 text-[11px] uppercase tracking-[0.12em] text-amber-200 transition-all hover:bg-amber-500/18",
  pill:
    "inline-flex items-center gap-1 rounded-full border border-amber-300/40 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-amber-200 transition-all hover:bg-amber-500/20",
};

const RitualTimerButton = ({
  ritualTitle,
  ritualSource,
  chapterId,
  coupleId,
  suggestedDuration,
  className = "",
  variant = "default",
  label = "Start timer",
}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
        className={`${variants[variant]} ${className}`}
      >
        <TimerIcon className="h-3.5 w-3.5" />
        {label}
      </button>
      <RitualTimer
        open={open}
        onClose={() => setOpen(false)}
        ritualTitle={ritualTitle}
        ritualSource={ritualSource}
        chapterId={chapterId}
        coupleId={coupleId}
        suggestedDuration={suggestedDuration}
      />
    </>
  );
};

export default RitualTimerButton;
