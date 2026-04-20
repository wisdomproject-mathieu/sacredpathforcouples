import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Mic,
  Pause,
  Play,
  RefreshCcw,
  Sparkles,
  Square,
  Volume2,
  Waves,
} from "lucide-react";

import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { sacredVisualSystem } from "@/lib/sacredVisualSystem";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import {
  getSacredVoiceExcerptByRef,
  getSacredVoiceRituals,
  getSacredVoiceTemplateLibrary,
  SACRED_VOICE_DURATIONS,
  SACRED_VOICE_INTENTIONS,
  SACRED_VOICE_MODES,
  SACRED_VOICE_SOURCES,
  type SacredVoiceAudioProvider,
  type SacredVoiceSelection,
  type SacredVoiceSession,
} from "@/lib/sacredPathVoiceContent";
import { generateSacredVoiceSession as generateRoutedSacredVoiceSession } from "@/lib/sacredVoiceRouter";
import {
  isSacredVoiceAudioSupported,
  pauseSacredVoiceSession,
  restartSacredVoiceSession,
  resumeSacredVoiceSession,
  sacredVoiceProgress,
  startSacredVoiceSession,
  stopSacredVoiceSession,
  tickSacredVoiceSession,
  type SacredVoiceStartResult,
  type SacredVoicePlaybackState,
} from "@/lib/sacredPathVoiceService";

const fmtTime = (seconds: number) => {
  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
};

const optionCardClass = (active: boolean) =>
  `flex min-h-[78px] cursor-pointer items-center justify-center rounded-2xl border p-4 text-center transition-all ${
    active
      ? "border-primary/60 bg-gradient-to-br from-primary/25 via-primary/15 to-amber-500/10 shadow-[0_18px_55px_-32px_rgba(255,173,70,0.65)]"
      : "border-amber-300/30 bg-gradient-to-br from-card/55 via-background/40 to-card/55 hover:border-primary/45 hover:from-primary/10 hover:to-amber-500/10"
  }`;

const optionLabelClass = (active: boolean) =>
  `font-display text-xl leading-snug md:text-2xl ${active ? "text-foreground" : "text-foreground/95"}`;

const groupEyebrowClass = "text-[11px] uppercase tracking-[0.22em] text-primary/80";

const groupShellClass =
  "rounded-[20px] border border-emerald-300/30 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-4 md:p-5";

const groupShellGoldClass =
  "rounded-[20px] border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-4 md:p-5";

const SacredPathVoice = () => {
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();

  const [selection, setSelection] = useState<SacredVoiceSelection>({
    intention: "meditate",
    sourceTag: "heart_path",
    duration: 6,
    mode: "read_to_us",
  });

  const [activeSession, setActiveSession] = useState<SacredVoiceSession | null>(null);
  const [playback, setPlayback] = useState<SacredVoicePlaybackState | null>(null);
  const [savedNotice, setSavedNotice] = useState<string>("");
  const [audioSupported, setAudioSupported] = useState(true);
  const [audioProvider, setAudioProvider] = useState<SacredVoiceAudioProvider | null>(null);
  const [voiceStatusNote, setVoiceStatusNote] = useState<string>("");
  const [isStarting, setIsStarting] = useState(false);
  const [sessionSignal, setSessionSignal] = useState("");

  useEffect(() => {
    setAudioSupported(isSacredVoiceAudioSupported());
  }, []);

  useEffect(() => {
    if (!activeSession || !playback || playback.status !== "playing") return;
    const timer = window.setInterval(() => {
      setPlayback((previous) => {
        if (!previous) return previous;
        return tickSacredVoiceSession(activeSession, previous);
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [activeSession, playback]);

  useEffect(() => {
    return () => {
      stopSacredVoiceSession(activeSession ?? undefined);
    };
  }, [activeSession]);

  useEffect(() => {
    if (!savedNotice) return;
    const t = window.setTimeout(() => setSavedNotice(""), 2400);
    return () => window.clearTimeout(t);
  }, [savedNotice]);

  const currentProgress = playback ? sacredVoiceProgress(playback) : 0;
  const rituals = useMemo(() => (activeSession ? getSacredVoiceRituals(activeSession) : []), [activeSession]);
  const excerpt = useMemo(() => {
    if (!activeSession) return null;
    return getSacredVoiceExcerptByRef(activeSession.excerptRefs[0] ?? "");
  }, [activeSession]);

  const selectedIntention = SACRED_VOICE_INTENTIONS.find((item) => item.id === selection.intention)?.label ?? "Meditate";
  const selectedSource = SACRED_VOICE_SOURCES.find((item) => item.id === selection.sourceTag)?.label ?? "Sacred Path";
  const selectedMode = SACRED_VOICE_MODES.find((item) => item.id === selection.mode)?.label ?? "Read to us";

  const previewCopy =
    selection.intention === "repair_after_tension"
      ? "A calm repair flow with one clear practice, one reflection, and grounded next steps."
      : selection.intention === "read_ancient_wisdom"
        ? "A source-grounded reading followed by one practical ritual you can run tonight."
        : "A guided couple session with voice pacing, ritual structure, and a clean closing.";

  const markEnded = () => {
    setPlayback((previous) =>
      previous
        ? {
            ...previous,
            status: "ended",
            elapsedSeconds: previous.totalSeconds,
          }
        : previous,
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

    const curated = generateRoutedSacredVoiceSession(selection, sessionSignal);
    const initialPlayback = await startSacredVoiceSession(curated, {
      onEnd: markEnded,
    });

    setActiveSession(curated);
    applyStartResult(initialPlayback);
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
    if (playback.status === "ended") {
      void handleRestart();
    }
  };

  const handleRestart = async () => {
    if (!activeSession || isStarting) return;
    setIsStarting(true);
    const restarted = await restartSacredVoiceSession(activeSession, {
      onEnd: () => {
        markEnded();
      },
    });
    applyStartResult(restarted);
    setIsStarting(false);
  };

  const handleStop = () => {
    setPlayback(stopSacredVoiceSession(activeSession ?? undefined));
  };

  const handleSaveSession = async () => {
    if (!activeSession) return;
    const payload = {
      id: activeSession.id,
      title: activeSession.title,
      intention: activeSession.intention,
      sourceTag: activeSession.sourceTag,
      duration: activeSession.duration,
      mode: activeSession.mode,
      savedAt: new Date().toISOString(),
    };

    try {
      const key = "sacred_voice_saved_sessions";
      const existingRaw = window.localStorage.getItem(key);
      const existing = existingRaw ? (JSON.parse(existingRaw) as Array<Record<string, unknown>>) : [];
      const next = [payload, ...existing.filter((row) => row.id !== payload.id)].slice(0, 30);
      window.localStorage.setItem(key, JSON.stringify(next));
      setSavedNotice("Session saved");
    } catch {
      setSavedNotice("Saved locally");
    }
  };

  const handleNextPractice = async () => {
    if (!activeSession || isStarting) return;
    const library = getSacredVoiceTemplateLibrary();
    const next =
      library.find(
        (candidate) =>
          candidate.id !== activeSession.id &&
          candidate.intention === activeSession.intention,
      ) ?? library.find((candidate) => candidate.id !== activeSession.id);

    if (!next) return;

    const nextSelection: SacredVoiceSelection = {
      intention: next.intention,
      sourceTag: next.sourceTag,
      duration: next.duration,
      mode: next.mode,
    };

    setSelection(nextSelection);
    setIsStarting(true);
    const routed = generateRoutedSacredVoiceSession(nextSelection, sessionSignal);
    const nextPlayback = await startSacredVoiceSession(routed, {
      onEnd: markEnded,
    });

    setActiveSession(routed);
    applyStartResult(nextPlayback);
    setIsStarting(false);
  };

  const subtitle =
    "A sacred voice companion for breath, ritual, repair, and ancient wisdom.";

  return (
    <div className="space-y-4 md:space-y-5">
      <section className={sacredVisualSystem.heroFrame}>
        <div className="absolute -right-12 -top-2 opacity-20">
          <img src={shivaShaktiIcon} alt="" className="h-48 w-48 rounded-[20px]" />
        </div>

        <p className="text-xs uppercase tracking-[0.22em] text-primary/75">Sacred Voice</p>
        <h1 className="mt-2 font-display text-3xl text-foreground md:text-4xl">Sacred Voice</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground/90">{subtitle}</p>
      </section>

      <section className={sacredVisualSystem.contourEmerald}>
        <p className={sacredVisualSystem.contourEyebrow}>Shape your session</p>
        <p className="mt-1 text-xs text-muted-foreground/80">
          Choose intention, source, length and style — same flow as the Sacred Temple.
        </p>

        <div className="mt-4 space-y-4">
          <div className={groupShellClass}>
            <p className={groupEyebrowClass}>Intention</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {SACRED_VOICE_INTENTIONS.map((item) => {
                const active = selection.intention === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelection((current) => ({ ...current, intention: item.id }))}
                    className={optionCardClass(active)}
                  >
                    <p className={optionLabelClass(active)}>{item.label}</p>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className={groupShellClass}>
              <p className={groupEyebrowClass}>Session Length</p>
              <div className="mt-3 grid gap-3 grid-cols-2 sm:grid-cols-3">
                {SACRED_VOICE_DURATIONS.map((duration) => {
                  const active = selection.duration === duration;
                  return (
                    <button
                      key={duration}
                      type="button"
                      onClick={() => setSelection((current) => ({ ...current, duration }))}
                      className={optionCardClass(active)}
                    >
                      <p className={optionLabelClass(active)}>{duration} min</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={groupShellGoldClass}>
              <p className={groupEyebrowClass}>Session Style</p>
              <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2">
                {SACRED_VOICE_MODES.map((mode) => {
                  const active = selection.mode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setSelection((current) => ({ ...current, mode: mode.id }))}
                      className={optionCardClass(active)}
                    >
                      <p className={optionLabelClass(active)}>{mode.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-primary/25 bg-primary/8 p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Session Summary</p>
        <div className="mt-3 grid gap-2 text-sm text-foreground/90 md:grid-cols-2">
          <p><span className="text-muted-foreground">Intention:</span> {selectedIntention}</p>
          
          <p><span className="text-muted-foreground">Length:</span> {selection.duration} min</p>
          <p><span className="text-muted-foreground">Style:</span> {selectedMode}</p>
        </div>
        <div className="mt-3">
          <label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Session Context (optional)
          </label>
          <textarea
            value={sessionSignal}
            onChange={(event) => setSessionSignal(event.target.value)}
            rows={3}
            placeholder="Example: We feel busy and disconnected, but not in conflict."
            className="mt-2 w-full rounded-2xl border border-border/35 bg-background/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/75 focus:outline-none focus:ring-1 focus:ring-primary/35"
          />
        </div>
        <p className="mt-3 text-sm leading-7 text-foreground/90">{previewCopy}</p>

        {entitlementResolved && !hasPremiumAccess ? (
          <div className="mt-4 rounded-2xl border border-amber-300/25 bg-amber-500/10 p-4">
            <p className="text-sm leading-7 text-foreground/90">
              Sacred Voice is part of premium access. One subscription unlocks the full guided voice path for both partners.
            </p>
            <Link
              to="/pricing"
              className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-amber-300/35 bg-amber-500/14 px-4 py-2 text-sm text-foreground transition-all hover:bg-amber-500/20"
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
            className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-primary/35 bg-primary/16 px-5 py-2.5 text-sm text-foreground transition-all hover:bg-primary/24 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Mic className="h-4 w-4" /> {isStarting ? "Starting..." : "Begin Sacred Voice"}
          </button>
        )}
      </section>

      {hasPremiumAccess && activeSession && playback ? (
        <section className="rounded-[24px] border border-border/30 bg-background/45 p-5 md:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Now Playing</p>
              <h2 className="mt-1 font-display text-3xl text-foreground">{activeSession.title}</h2>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-primary/80">
                {activeSession.intention.split("_").join(" ")} · {activeSession.sourceTag.split("_").join(" ")} · {activeSession.duration} min
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Voice status: {audioSupported ? playback.status : "audio unavailable"} {audioProvider ? `· ${audioProvider}` : ""}
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
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/35 bg-primary/12 text-primary transition-all hover:bg-primary/20"
                aria-label={playback.status === "playing" ? "Pause" : "Play"}
              >
                {playback.status === "playing" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => void handleRestart()}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/35 bg-card/45 text-foreground transition-all hover:bg-card/65"
                aria-label="Restart"
              >
                <RefreshCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleStop}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/35 bg-card/45 text-foreground transition-all hover:bg-card/65"
                aria-label="Stop"
              >
                <Square className="h-4 w-4" />
              </button>
              <div className="relative ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-500/10 text-emerald-100">
                <Waves className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div>
            <div className="h-2 overflow-hidden rounded-full border border-border/35 bg-background/65">
              <div className="h-full bg-gradient-to-r from-primary/85 to-emerald-300/70 transition-all" style={{ width: `${currentProgress}%` }} />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{fmtTime(playback.elapsedSeconds)}</span>
              <span>{fmtTime(playback.totalSeconds)}</span>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
            <article className="rounded-[18px] border border-primary/20 bg-primary/8 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-primary/80">Transcript</p>
              <div className="mt-3 space-y-3">
                {activeSession.transcriptBlocks.map((block, index) => (
                  <p
                    key={`${activeSession.id}-${index}`}
                    className={`rounded-2xl border p-3 text-base leading-8 md:text-[1.05rem] ${
                      index === playback.currentBlockIndex
                        ? "border-primary/35 bg-primary/12 text-foreground"
                        : "border-border/30 bg-background/35 text-muted-foreground"
                    }`}
                  >
                    {block}
                  </p>
                ))}
                <p className="rounded-2xl border border-emerald-300/30 bg-emerald-500/8 p-3 text-base leading-8 text-foreground/92 md:text-[1.05rem]">
                  {activeSession.closingText}
                </p>
              </div>
            </article>

            <div className="space-y-4">
              {excerpt ? (
                <article className="rounded-[18px] border border-border/30 bg-background/40 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Ancient Wisdom Excerpt</p>
                  <h3 className="mt-2 font-display text-2xl text-foreground">{excerpt.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-foreground/92">{excerpt.text}</p>
                </article>
              ) : null}

              <article className="rounded-[18px] border border-border/30 bg-background/40 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Ritual Links</p>
                <div className="mt-3 space-y-2">
                  {rituals.map((ritual) => (
                    <div key={ritual.id} className="rounded-2xl border border-border/25 bg-card/35 p-3">
                      <p className="text-sm text-foreground">{ritual.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{ritual.duration}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void handleNextPractice()}
              className="rounded-full border border-border/35 bg-card/45 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-foreground transition-all hover:bg-card/65"
            >
              Next practice
            </button>
            <button
              type="button"
              onClick={handleSaveSession}
              className="rounded-full border border-border/35 bg-card/45 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-foreground transition-all hover:bg-card/65"
            >
              Save this session
            </button>
            {savedNotice ? <span className="text-xs text-emerald-200/85">{savedNotice}</span> : null}
            {!audioSupported ? (
              <span className="inline-flex items-center gap-1 text-xs text-amber-200/85">
                <Volume2 className="h-3.5 w-3.5" /> Voice playback depends on browser speech support.
              </span>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default SacredPathVoice;
