import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Wind } from "lucide-react";

import { Button } from "@/components/ui/button";

type Mode = "timer" | "breathing";
type BreathingPattern = "box" | "478";

const DURATIONS = [3, 5, 10] as const;

const BREATHING_CONFIG: Record<BreathingPattern, { label: string; sequence: Array<{ label: string; seconds: number }> }> = {
  box: {
    label: "Box",
    sequence: [
      { label: "Inhale", seconds: 4 },
      { label: "Hold", seconds: 4 },
      { label: "Exhale", seconds: 4 },
      { label: "Hold", seconds: 4 },
    ],
  },
  "478": {
    label: "4-7-8",
    sequence: [
      { label: "Inhale", seconds: 4 },
      { label: "Hold", seconds: 7 },
      { label: "Exhale", seconds: 8 },
    ],
  },
};

const formatClock = (totalSeconds: number): string => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const BreatheTimer = () => {
  const [mode, setMode] = useState<Mode>("timer");
  const [durationMinutes, setDurationMinutes] = useState<(typeof DURATIONS)[number]>(3);
  const [pattern, setPattern] = useState<BreathingPattern>("box");
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(BREATHING_CONFIG.box.sequence[0].seconds);
  const intervalRef = useRef<number | null>(null);

  const activeSequence = BREATHING_CONFIG[pattern].sequence;

  useEffect(() => {
    setIsRunning(false);
    setSecondsLeft(durationMinutes * 60);
    setPhaseIndex(0);
    setPhaseSecondsLeft(activeSequence[0].seconds);
  }, [durationMinutes, pattern, mode, activeSequence]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });

      if (mode === "breathing") {
        setPhaseSecondsLeft((prev) => {
          if (prev <= 1) {
            const nextIndex = (phaseIndex + 1) % activeSequence.length;
            setPhaseIndex(nextIndex);
            return activeSequence[nextIndex].seconds;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, mode, phaseIndex, activeSequence]);

  const currentPhase = useMemo(() => {
    if (mode !== "breathing") return null;
    return activeSequence[phaseIndex];
  }, [mode, activeSequence, phaseIndex]);

  const resetSession = () => {
    setIsRunning(false);
    setSecondsLeft(durationMinutes * 60);
    setPhaseIndex(0);
    setPhaseSecondsLeft(activeSequence[0].seconds);
  };

  return (
    <div className="space-y-4">
      <section className="rounded-3xl border border-primary/20 bg-card/70 p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Breath space</p>
        <h1 className="mt-2 font-display text-3xl text-foreground md:text-4xl">Timer & Breathing</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a simple timer or a guided breathing rhythm for 3, 5, or 10 minutes.
        </p>
      </section>

      <section className="rounded-3xl border border-border/40 bg-card/75 p-5 md:p-6 space-y-5">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">Mode</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode("timer")}
              className={`rounded-2xl border px-3 py-3 text-sm transition ${
                mode === "timer"
                  ? "border-primary/50 bg-primary/15 text-foreground"
                  : "border-border/40 bg-background/40 text-foreground/80"
              }`}
            >
              Timer
            </button>
            <button
              type="button"
              onClick={() => setMode("breathing")}
              className={`rounded-2xl border px-3 py-3 text-sm transition ${
                mode === "breathing"
                  ? "border-primary/50 bg-primary/15 text-foreground"
                  : "border-border/40 bg-background/40 text-foreground/80"
              }`}
            >
              Breathing
            </button>
          </div>
        </div>

        {mode === "breathing" ? (
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">Pattern</p>
            <div className="grid grid-cols-2 gap-2">
              {(["box", "478"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPattern(value)}
                  className={`rounded-2xl border px-3 py-3 text-sm transition ${
                    pattern === value
                      ? "border-primary/50 bg-primary/15 text-foreground"
                      : "border-border/40 bg-background/40 text-foreground/80"
                  }`}
                >
                  {BREATHING_CONFIG[value].label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">Duration</p>
          <div className="grid grid-cols-3 gap-2">
            {DURATIONS.map((minutes) => (
              <button
                key={minutes}
                type="button"
                onClick={() => setDurationMinutes(minutes)}
                className={`rounded-2xl border px-3 py-3 text-sm transition ${
                  durationMinutes === minutes
                    ? "border-primary/50 bg-primary/15 text-foreground"
                    : "border-border/40 bg-background/40 text-foreground/80"
                }`}
              >
                {minutes} min
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/8 via-card/80 to-card/70 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 text-primary">
          <Wind className="h-6 w-6" />
        </div>
        <p className="mt-4 font-display text-5xl tabular-nums text-foreground">{formatClock(secondsLeft)}</p>

        {mode === "breathing" && currentPhase ? (
          <div className="mt-3">
            <p className="text-sm uppercase tracking-[0.16em] text-primary/85">{currentPhase.label}</p>
            <p className="text-xs text-muted-foreground">{phaseSecondsLeft}s</p>
          </div>
        ) : (
          <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted-foreground">{isRunning ? "In session" : "Ready"}</p>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Button
            type="button"
            onClick={() => setIsRunning((value) => !value)}
            className="rounded-2xl"
          >
            {isRunning ? <Pause className="mr-1 h-4 w-4" /> : <Play className="mr-1 h-4 w-4" />}
            {isRunning ? "Pause" : secondsLeft === durationMinutes * 60 ? "Start" : "Resume"}
          </Button>
          <Button type="button" variant="outline" onClick={resetSession} className="rounded-2xl">
            <RotateCcw className="mr-1 h-4 w-4" /> Reset
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BreatheTimer;
