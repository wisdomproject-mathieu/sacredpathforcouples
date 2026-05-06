import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Timer, Wind } from "lucide-react";

import { Button } from "@/components/ui/button";

type ToolMode = "timer" | "breathing";
type BreathingMode = "box" | "478";

const DURATIONS = [3, 5, 10] as const;
const BOX_CYCLE_SECONDS = 16;
const FOUR_SEVEN_EIGHT_SECONDS = 19;

const formatClock = (totalSeconds: number) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const getBoxPhase = (elapsedSeconds: number) => {
  const cycle = elapsedSeconds % BOX_CYCLE_SECONDS;
  if (cycle < 4) return "Inhale";
  if (cycle < 8) return "Hold";
  if (cycle < 12) return "Exhale";
  return "Hold";
};

const get478Phase = (elapsedSeconds: number) => {
  const cycle = elapsedSeconds % FOUR_SEVEN_EIGHT_SECONDS;
  if (cycle < 4) return "Inhale";
  if (cycle < 11) return "Hold";
  return "Exhale";
};

export default function Tools() {
  const [toolMode, setToolMode] = useState<ToolMode>("timer");
  const [breathingMode, setBreathingMode] = useState<BreathingMode>("box");
  const [durationMinutes, setDurationMinutes] = useState<(typeof DURATIONS)[number]>(3);
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setIsRunning(false);
    setSecondsLeft(durationMinutes * 60);
  }, [durationMinutes, toolMode, breathingMode]);

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
    }, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const totalSeconds = durationMinutes * 60;
  const elapsedSeconds = totalSeconds - secondsLeft;

  const breathingPhase = useMemo(() => {
    if (toolMode !== "breathing") return "";
    return breathingMode === "box" ? getBoxPhase(elapsedSeconds) : get478Phase(elapsedSeconds);
  }, [toolMode, breathingMode, elapsedSeconds]);

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(durationMinutes * 60);
  };

  return (
    <div className="px-4 py-8 pb-24">
      <style>{`
        @keyframes box-orbit {
          0% { transform: translate(0px, 0px); }
          24.99% { transform: translate(176px, 0px); }
          25% { transform: translate(176px, 0px); }
          49.99% { transform: translate(176px, 176px); }
          50% { transform: translate(176px, 176px); }
          74.99% { transform: translate(0px, 176px); }
          75% { transform: translate(0px, 176px); }
          100% { transform: translate(0px, 0px); }
        }

        @keyframes breath-478 {
          0% { transform: scale(0.72); opacity: 0.75; }
          21.05% { transform: scale(1); opacity: 1; }    /* inhale 4s */
          57.89% { transform: scale(1); opacity: 0.95; } /* hold 7s */
          100% { transform: scale(0.72); opacity: 0.82; }/* exhale 8s */
        }
      `}</style>

      <div className="container max-w-5xl space-y-6">
        <section className="rounded-3xl border border-primary/25 bg-card/70 p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Tools</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">Timer & Breathing</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Practical tools for grounding together: simple timer, box breathing, and 4-7-8.
          </p>
        </section>

        <section className="grid gap-3 md:grid-cols-3 rounded-2xl border border-border bg-card/70 p-4">
          <button
            type="button"
            onClick={() => setToolMode("timer")}
            className={`rounded-xl border p-2.5 text-sm transition ${toolMode === "timer" ? "border-primary bg-primary/15" : "border-border bg-background/50"}`}
          >
            <Timer className="mx-auto mb-1 h-4 w-4" />
            Simple timer
          </button>
          <button
            type="button"
            onClick={() => {
              setToolMode("breathing");
              setBreathingMode("box");
            }}
            className={`rounded-xl border p-2.5 text-sm transition ${toolMode === "breathing" && breathingMode === "box" ? "border-primary bg-primary/15" : "border-border bg-background/50"}`}
          >
            <Wind className="mx-auto mb-1 h-4 w-4" />
            Box breathing
          </button>
          <button
            type="button"
            onClick={() => {
              setToolMode("breathing");
              setBreathingMode("478");
            }}
            className={`rounded-xl border p-2.5 text-sm transition ${toolMode === "breathing" && breathingMode === "478" ? "border-primary bg-primary/15" : "border-border bg-background/50"}`}
          >
            <Wind className="mx-auto mb-1 h-4 w-4" />
            4-7-8 breathing
          </button>
        </section>

        <section className="grid gap-3 grid-cols-3 rounded-2xl border border-border bg-card/70 p-4">
          {DURATIONS.map((minutes) => (
            <button
              key={minutes}
              type="button"
              onClick={() => setDurationMinutes(minutes)}
              className={`rounded-xl border p-2.5 text-sm transition ${durationMinutes === minutes ? "border-primary bg-primary/15" : "border-border bg-background/50"}`}
            >
              {minutes} min
            </button>
          ))}
        </section>

        <section className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/85 to-card/70 p-5 md:p-6">
          <p className="text-center font-display text-5xl tabular-nums">{formatClock(secondsLeft)}</p>
          {toolMode === "breathing" ? (
            <p className="mt-2 text-center text-sm uppercase tracking-[0.16em] text-primary/80">{breathingPhase}</p>
          ) : (
            <p className="mt-2 text-center text-sm uppercase tracking-[0.16em] text-muted-foreground">Simple timer</p>
          )}

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Button type="button" onClick={() => setIsRunning((value) => !value)}>
              {isRunning ? <Pause className="mr-1 h-4 w-4" /> : <Play className="mr-1 h-4 w-4" />}
              {isRunning ? "Pause" : secondsLeft === totalSeconds ? "Start" : "Resume"}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              <RotateCcw className="mr-1 h-4 w-4" />
              Reset
            </Button>
          </div>

          {toolMode === "breathing" && breathingMode === "box" ? (
            <div className="mt-6 flex justify-center">
              <div className="relative h-[212px] w-[212px] rounded-2xl border border-primary/30 bg-background/40 p-4">
                <div className="absolute left-4 top-4 h-44 w-44 rounded-xl border-2 border-primary/45" />
                <div
                  className="absolute left-4 top-4 h-4 w-4 rounded-full bg-primary shadow-[0_0_18px_rgba(255,190,110,0.9)]"
                  style={{
                    animationName: "box-orbit",
                    animationDuration: `${BOX_CYCLE_SECONDS}s`,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                    animationPlayState: isRunning ? "running" : "paused",
                  }}
                />
              </div>
            </div>
          ) : null}

          {toolMode === "breathing" && breathingMode === "478" ? (
            <div className="mt-6 flex justify-center">
              <div className="relative grid h-56 w-56 place-items-center rounded-full border border-primary/25 bg-background/30">
                <div
                  className="h-36 w-36 rounded-full bg-gradient-to-br from-primary/70 to-amber-300/40"
                  style={{
                    animationName: "breath-478",
                    animationDuration: `${FOUR_SEVEN_EIGHT_SECONDS}s`,
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                    animationPlayState: isRunning ? "running" : "paused",
                  }}
                />
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}

