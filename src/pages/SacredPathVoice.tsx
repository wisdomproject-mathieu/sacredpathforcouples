import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mic, Pause, Play, RefreshCcw, Sparkles, Square } from "lucide-react";

import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { sacredVisualSystem } from "@/lib/sacredVisualSystem";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import {
  SACRED_VOICE_DURATIONS,
  SACRED_VOICE_INTENTIONS,
  buildSacredVoiceSession,
  type SacredVoiceAudioProvider,
  type SacredVoiceSelection,
  type SacredVoiceSession,
} from "@/lib/sacredPathVoiceContent";
import {
  isSacredVoiceAudioSupported,
  pauseSacredVoiceSession,
  restartSacredVoiceSession,
  resumeSacredVoiceSession,
  sacredVoiceProgress,
  startSacredVoiceSession,
  stopSacredVoiceSession,
  tickSacredVoiceSession,
  type SacredVoicePlaybackState,
  type SacredVoiceStartResult,
} from "@/lib/sacredPathVoiceService";

const fmtTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const optionCardClass = (active: boolean) =>
  `flex min-h-[80px] cursor-pointer items-center justify-center rounded-2xl border p-4 text-center transition-all ${
    active
      ? "border-primary/50 bg-primary/12 shadow-[0_14px_40px_-28px_rgba(255,173,70,0.55)]"
      : "border-border/30 bg-background/45 hover:border-primary/30 hover:bg-card/55"
  }`;

const optionLabelClass = (active: boolean) =>
  `font-display text-lg leading-snug md:text-xl ${active ? "text-foreground" : "text-foreground/95"}`;

const SacredPathVoice = () => {
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();

  const [selection, setSelection] = useState<SacredVoiceSelection>({
    intention: "breathe_together",
    duration: 3,
  });

  const [activeSession, setActiveSession] = useState<SacredVoiceSession | null>(null);
  const [playback, setPlayback] = useState<SacredVoicePlaybackState | null>(null);
  const [audioSupported, setAudioSupported] = useState(true);
  const [audioProvider, setAudioProvider] = useState<SacredVoiceAudioProvider | null>(null);
  const [voiceStatusNote, setVoiceStatusNote] = useState<string>("");
  const [isStarting, setIsStarting] = useState(false);
  const lastSelectionSignatureRef = useRef<string>("");
  const activeSessionRef = useRef<SacredVoiceSession | null>(null);
  const playbackRef = useRef<SacredVoicePlaybackState | null>(null);

  useEffect(() => {
    setAudioSupported(isSacredVoiceAudioSupported());
  }, []);

  useEffect(() => {
    if (!activeSession || !playback || playback.status !== "playing") return;
    const timer = window.setInterval(() => {
      setPlayback((prev) => (prev ? tickSacredVoiceSession(activeSession, prev) : prev));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [activeSession, playback]);

  useEffect(() => {
    return () => {
      stopSacredVoiceSession(activeSession ?? undefined);
    };
  }, [activeSession]);

  useEffect(() => {
    activeSessionRef.current = activeSession;
    playbackRef.current = playback;
  }, [activeSession, playback]);

  const sessionPreview = useMemo(() => buildSacredVoiceSession(selection), [selection]);
  const selectionSignature = useMemo(() => JSON.stringify(selection), [selection]);

  // Reset playback when the selection changes.
  useEffect(() => {
    if (lastSelectionSignatureRef.current === selectionSignature) return;
    lastSelectionSignatureRef.current = selectionSignature;

    if (activeSessionRef.current || playbackRef.current) {
      stopSacredVoiceSession(activeSessionRef.current ?? undefined);
      setActiveSession(null);
      setPlayback(null);
      setAudioProvider(null);
      setVoiceStatusNote("");
    }
  }, [selectionSignature]);

  const currentProgress = playback ? sacredVoiceProgress(playback) : 0;

  const markEnded = () => {
    setPlayback((prev) =>
      prev ? { ...prev, status: "ended", elapsedSeconds: prev.totalSeconds } : prev,
    );
  };

  const applyStartResult = (result: SacredVoiceStartResult) => {
    setPlayback(result.playback);
    setAudioProvider(result.provider);
    setVoiceStatusNote(result.message ?? "");
  };

  const startSession = async () => {
    if (isStarting) return;
    setIsStarting(true);
    const session = buildSacredVoiceSession(selection);
    const result = await startSacredVoiceSession(session, { onEnd: markEnded });
    setActiveSession(session);
    applyStartResult(result);
    setIsStarting(false);
  };

  const handlePlayPause = () => {
    if (!activeSession || !playback) return;
    if (playback.status === "playing") {
      setPlayback(pauseSacredVoiceSession(playback));
      return;
    }
    if (playback.status === "paused") {
      setPlayback(resumeSacredVoiceSession(playback));
      return;
    }
    if (playback.status === "ended") void handleRestart();
  };

  const handleRestart = async () => {
    if (!activeSession || isStarting) return;
    setIsStarting(true);
    const restarted = await restartSacredVoiceSession(activeSession, { onEnd: markEnded });
    applyStartResult(restarted);
    setIsStarting(false);
  };

  const handleStop = () => {
    setPlayback(stopSacredVoiceSession(activeSession ?? undefined));
  };

  return (
    <div className="space-y-4 md:space-y-5">
      <section className={sacredVisualSystem.heroFrame}>
        <div className="absolute -right-12 -top-2 opacity-20">
          <img src={shivaShaktiIcon} alt="" className="h-48 w-48 rounded-[20px]" />
        </div>
        <p className="text-xs uppercase tracking-[0.22em] text-primary/75">Sacred Voice</p>
        <h1 className="mt-2 font-display text-3xl text-foreground md:text-4xl">Sacred Voice</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground/90">
          A slow, sensual voice companion. Choose what tonight needs and how long you have — we will guide you with one calm practice.
        </p>
      </section>

      <section className={sacredVisualSystem.sectionFrame}>
        <p className="text-[11px] uppercase tracking-[0.22em] text-primary/80">Shape your session</p>
        <h2 className="mt-1 font-display text-xl text-foreground md:text-2xl">Two simple choices</h2>
        <p className="mt-1 text-xs text-muted-foreground/85">The voice does the rest.</p>

        <div className="mt-4 space-y-3">
          <div className={sacredVisualSystem.contourEmerald}>
            <p className={sacredVisualSystem.contourEyebrow}>Tonight we want to</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {SACRED_VOICE_INTENTIONS.map((item) => {
                const active = selection.intention === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelection((prev) => ({ ...prev, intention: item.id }))}
                    className={optionCardClass(active)}
                  >
                    <p className={optionLabelClass(active)}>{item.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={sacredVisualSystem.contourCyan}>
            <p className={sacredVisualSystem.contourEyebrow}>Length</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {SACRED_VOICE_DURATIONS.map((duration) => {
                const active = selection.duration === duration;
                return (
                  <button
                    key={duration}
                    type="button"
                    onClick={() => setSelection((prev) => ({ ...prev, duration }))}
                    className={optionCardClass(active)}
                  >
                    <p className={optionLabelClass(active)}>{duration} min</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {entitlementResolved && !hasPremiumAccess ? (
          <div className="mt-4 rounded-2xl border border-primary/25 bg-primary/8 p-4">
            <p className="text-sm leading-7 text-foreground/90">
              Sacred Voice is part of premium access. One subscription unlocks the full guided voice path for both partners.
            </p>
            <Link
              to="/pricing"
              className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-primary/35 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:bg-primary/20"
            >
              Unlock Sacred Voice
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => void startSession()}
            disabled={isStarting}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-primary/35 bg-primary/15 px-5 py-2.5 text-sm text-foreground transition-all hover:bg-primary/25 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Mic className="h-4 w-4" /> {isStarting ? "Starting…" : "Begin Sacred Voice"}
          </button>
        )}
      </section>

      {hasPremiumAccess && activeSession && playback ? (
        <section className={`${sacredVisualSystem.sectionFrame} space-y-4`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Now Playing</p>
              <h2 className="mt-1 font-display text-2xl text-foreground md:text-3xl">{activeSession.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground/90">{activeSession.tagline}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {audioSupported ? playback.status : "audio unavailable"}
                {audioProvider ? ` · ${audioProvider === "elevenlabs" ? "ElevenLabs voice" : "browser voice"}` : ""}
                {` · ${activeSession.duration} min`}
              </p>
              {voiceStatusNote ? (
                <p className="mt-1 text-xs text-amber-200/85">{voiceStatusNote}</p>
              ) : null}
            </div>

            <div className="relative flex items-center gap-2">
              <div className="pointer-events-none absolute -inset-2 rounded-full bg-primary/10 blur-xl" />
              <button
                type="button"
                onClick={handlePlayPause}
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/35 bg-primary/15 text-primary transition-all hover:bg-primary/25"
                aria-label={playback.status === "playing" ? "Pause" : "Play"}
              >
                {playback.status === "playing" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => void handleRestart()}
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/35 bg-card/45 text-foreground transition-all hover:bg-card/65"
                aria-label="Restart"
              >
                <RefreshCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleStop}
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/35 bg-card/45 text-foreground transition-all hover:bg-card/65"
                aria-label="Stop"
              >
                <Square className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <div className="h-2 overflow-hidden rounded-full border border-border/35 bg-background/65">
              <div
                className="h-full bg-gradient-to-r from-primary/85 to-emerald-300/70 transition-all"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{fmtTime(playback.elapsedSeconds)}</span>
              <span>{fmtTime(playback.totalSeconds)}</span>
            </div>
          </div>

          <Link
            to={activeSession.goDeeperHref}
            className="group inline-flex items-center justify-between gap-3 rounded-2xl border border-emerald-300/35 bg-gradient-to-r from-emerald-500/15 via-emerald-500/8 to-amber-500/12 px-4 py-3 text-sm text-foreground transition-all hover:border-emerald-200/50 hover:from-emerald-500/25 hover:to-amber-500/20"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-200/90" />
              Go deeper · {activeSession.goDeeperLabel}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>
      ) : null}
    </div>
  );
};

export default SacredPathVoice;
