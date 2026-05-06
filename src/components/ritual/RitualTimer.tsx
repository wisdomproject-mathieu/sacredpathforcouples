import { useEffect, useRef, useState } from "react";
import { Pause, Play, Square, Timer as TimerIcon, X, Check } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

type RitualTimerProps = {
  open: boolean;
  onClose: () => void;
  ritualTitle: string;
  ritualSource: string;
  chapterId?: string | null;
  coupleId?: string | null;
  suggestedDuration?: string | null;
  onSaved?: (minutes: number) => void;
};

const formatClock = (seconds: number): string => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const RitualTimer = ({
  open,
  onClose,
  ritualTitle,
  ritualSource,
  chapterId,
  coupleId,
  suggestedDuration,
  onSaved,
}: RitualTimerProps) => {
  const { user } = useAuth();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) {
      setSeconds(0);
      setRunning(false);
      setSavedMessage(null);
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    } else if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  if (!open) return null;

  const minutesSpent = Math.max(1, Math.round(seconds / 60));
  const canSave = seconds >= 30 && !!user?.id && !!coupleId;

  const handleSave = async () => {
    if (!user?.id || !coupleId) {
      setError("Connect with your beloved to save practice sessions.");
      return;
    }
    setSaving(true);
    setError(null);
    const { error: insertError } = await supabase.from("ritual_sessions").insert({
      couple_id: coupleId,
      user_id: user.id,
      ritual_title: ritualTitle,
      ritual_source: ritualSource,
      chapter_id: chapterId ?? null,
      minutes_spent: minutesSpent,
    });
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setSavedMessage(`Saved ${minutesSpent} min to your practice journey.`);
    setRunning(false);
    onSaved?.(minutesSpent);
    window.setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-md overflow-hidden rounded-[24px] border border-amber-300/35 bg-gradient-to-br from-amber-950/80 via-card/85 to-card/70 p-6 shadow-[0_24px_70px_-30px_rgba(245,158,11,0.55)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full border border-border/35 bg-background/60 p-1.5 text-foreground/70 transition-all hover:text-foreground"
          aria-label="Close timer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          <div className="rounded-2xl border border-amber-300/40 bg-amber-500/12 p-2 text-amber-300">
            <TimerIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-amber-300/85">Sacred timer</p>
            <h3 className="font-display text-lg leading-tight text-foreground">{ritualTitle}</h3>
          </div>
        </div>

        {suggestedDuration ? (
          <p className="mt-3 text-xs text-muted-foreground">Suggested: {suggestedDuration}</p>
        ) : null}

        <div className="mt-5 rounded-[20px] border border-amber-300/25 bg-background/45 p-6 text-center">
          <p className="font-display text-6xl tabular-nums tracking-wider text-foreground">{formatClock(seconds)}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {running ? "Practicing" : seconds === 0 ? "Ready when you are" : "Paused"}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setRunning((value) => !value)}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-300/40 bg-amber-500/15 px-5 py-2.5 text-sm font-medium text-amber-100 transition-all hover:bg-amber-500/25"
          >
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {running ? "Pause" : seconds === 0 ? "Begin" : "Resume"}
          </button>
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setSeconds(0);
            }}
            disabled={seconds === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-border/35 bg-background/55 px-4 py-2.5 text-sm text-foreground/80 transition-all hover:bg-background/70 disabled:opacity-40"
          >
            <Square className="h-4 w-4" />
            Reset
          </button>
        </div>

        <div className="mt-4 rounded-[14px] border border-emerald-300/25 bg-emerald-500/8 p-3 text-center">
          <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-200/85">Save to our practice journey</p>
          <p className="mt-1 text-sm text-foreground/90">{minutesSpent} min</p>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave || saving}
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-emerald-300/40 bg-emerald-500/15 px-4 py-2 text-sm text-emerald-100 transition-all hover:bg-emerald-500/25 disabled:opacity-40"
          >
            <Check className="h-4 w-4" />
            {saving ? "Saving…" : "Save session"}
          </button>
          {!coupleId ? (
            <p className="mt-2 text-[11px] text-muted-foreground">Connect with your beloved to save practice time together.</p>
          ) : seconds < 30 && !savedMessage ? (
            <p className="mt-2 text-[11px] text-muted-foreground">Practice for at least 30 seconds to save.</p>
          ) : null}
          {savedMessage ? (
            <p className="mt-2 text-[11px] text-emerald-200">{savedMessage}</p>
          ) : null}
          {error ? <p className="mt-2 text-[11px] text-rose-300">{error}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default RitualTimer;
