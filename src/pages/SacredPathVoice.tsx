import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Crown,
  Mic,
  Pause,
  Play,
  RefreshCcw,
  Sparkles,
  Volume2,
} from "lucide-react";

import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import {
  generateSacredVoiceSession as generateCuratedSacredVoiceSession,
  getSacredVoiceExcerptByRef,
  getSacredVoiceRituals,
  getSacredVoiceTemplateLibrary,
  SACRED_VOICE_DURATIONS,
  SACRED_VOICE_INTENTIONS,
  SACRED_VOICE_MODES,
  SACRED_VOICE_SOURCES,
  type SacredVoiceSelection,
  type SacredVoiceSession,
} from "@/lib/sacredPathVoiceContent";
import {
  generateSacredVoiceSession,
  pauseSacredVoiceSession,
  playSacredVoiceSession,
  restartSacredVoiceSession,
  sacredVoiceProgress,
  stopSacredVoiceSession,
  tickSacredVoiceSession,
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

const selectionButtonClass = (active: boolean) =>
  `rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.14em] transition-all ${
    active
      ? "border-primary/35 bg-primary/14 text-foreground"
      : "border-border/35 bg-background/40 text-muted-foreground hover:border-primary/25 hover:text-foreground"
  }`;

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

  useEffect(() => {
    if (!activeSession || !playback || playback.status !== "playing") return;
    const timer = window.setInterval(() => {
      setPlayback((previous) => {
        if (!previous) return previous;
        return tickSacredVoiceSession(activeSession, previous, 1);
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [activeSession, playback]);

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

  const startSession = () => {
    const curated = generateCuratedSacredVoiceSession(selection);
    const generated = generateSacredVoiceSession(curated);
    const initialPlayback = playSacredVoiceSession(generated);
    setActiveSession(generated);
    setPlayback(initialPlayback);
  };

  const handlePlayPause = () => {
    if (!activeSession || !playback) return;
    if (playback.status === "playing") {
      setPlayback(pauseSacredVoiceSession(playback));
      return;
    }
    if (playback.status === "paused" || playback.status === "ended") {
      setPlayback(playSacredVoiceSession(activeSession, playback));
    }
  };

  const handleRestart = () => {
    if (!activeSession) return;
    setPlayback(restartSacredVoiceSession(activeSession));
  };

  const handleStop = () => {
    if (!activeSession) return;
    setPlayback(stopSacredVoiceSession(activeSession));
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
      const key = "sacred_path_voice_saved_sessions";
      const existingRaw = window.localStorage.getItem(key);
      const existing = existingRaw ? (JSON.parse(existingRaw) as Array<Record<string, unknown>>) : [];
      const next = [payload, ...existing.filter((row) => row.id !== payload.id)].slice(0, 30);
      window.localStorage.setItem(key, JSON.stringify(next));
      setSavedNotice("Session saved");
    } catch {
      setSavedNotice("Saved locally");
    }
  };

  const handleNextPractice = () => {
    if (!activeSession) return;
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
    const generated = generateSacredVoiceSession(next);
    setActiveSession(generated);
    setPlayback(playSacredVoiceSession(generated));
  };

  const subtitle =
    "A sacred voice companion for breath, ritual, repair, and ancient wisdom.";

  return (
    <div className="space-y-4 md:space-y-5">
      <section className="relative overflow-hidden rounded-[24px] border border-amber-400/20 bg-card/35 p-5">
        <div className="absolute -right-10 top-0 opacity-20">
          <img src={shivaShaktiIcon} alt="" className="h-44 w-44 rounded-[20px]" />
        </div>

        <p className="text-xs uppercase tracking-[0.22em] text-amber-400/75">Sacred Library</p>
        <h1 className="mt-2 flex items-center gap-2 font-display text-3xl text-foreground">
          Sacred Path Voice
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/35 bg-amber-400/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-amber-200">
            <Crown className="h-3 w-3" /> Premium
          </span>
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground/90">{subtitle}</p>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-[18px] border border-primary/20 bg-primary/8 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-primary/80">Voice Intent</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">
              Select your intention, choose a lineage, set your time, and begin one guided sacred session without leaving this page.
            </p>
          </div>
          <div className="rounded-[18px] border border-emerald-300/25 bg-emerald-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/85">For Couples</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">
              One subscription unlocks this guided voice experience for both partners: read ancient wisdom aloud, run rituals together, and return to presence after tension.
            </p>
          </div>
        </div>
      </section>

      {entitlementResolved && !hasPremiumAccess ? (
        <section className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.2),transparent_55%),linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,23,42,0.08))] p-5 shadow-[0_20px_60px_-42px_rgba(255,173,70,0.58)]">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300">UNLOCK SACRED PATH VOICE</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">A sacred listening chamber for two.</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/90">
            Open guided meditation, breath journeys, repair sessions, and source-grounded wisdom readings.
            Premium unlocks the full voice companion once, and both partners benefit.
          </p>
          <div className="mt-4 grid gap-2 md:grid-cols-3">
            {[
              "Read ancient wisdom together",
              "Run guided rituals in real time",
              "Repair, reconnect, deepen intimacy",
            ].map((line) => (
              <div key={line} className="rounded-2xl border border-amber-300/25 bg-background/40 p-3 text-sm text-foreground/90">
                {line}
              </div>
            ))}
          </div>
          <Link
            to="/pricing"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-500/14 px-4 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
          >
            Unlock Sacred Path Voice
            <Sparkles className="h-4 w-4" />
          </Link>
        </section>
      ) : null}

      {hasPremiumAccess ? (
        <>
          <section className="rounded-[24px] border border-border/30 bg-background/45 p-5 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Intention</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SACRED_VOICE_INTENTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelection((current) => ({ ...current, intention: item.id }))}
                    className={selectionButtonClass(selection.intention === item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Source / Flavor</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SACRED_VOICE_SOURCES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelection((current) => ({ ...current, sourceTag: item.id }))}
                    className={selectionButtonClass(selection.sourceTag === item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Session Length</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SACRED_VOICE_DURATIONS.map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      onClick={() => setSelection((current) => ({ ...current, duration }))}
                      className={selectionButtonClass(selection.duration === duration)}
                    >
                      {duration} min
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Session Style</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SACRED_VOICE_MODES.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setSelection((current) => ({ ...current, mode: mode.id }))}
                      className={selectionButtonClass(selection.mode === mode.id)}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[18px] border border-primary/20 bg-primary/8 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-sm leading-6 text-foreground/90">
                Begin one guided session that blends ritual structure with source-grounded wisdom.
              </p>
              <button
                type="button"
                onClick={startSession}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/35 bg-primary/15 px-5 py-2.5 text-sm text-foreground transition-all hover:bg-primary/22"
              >
                <Mic className="h-4 w-4" /> Begin Sacred Path Voice
              </button>
            </div>
          </section>

          {activeSession && playback ? (
            <section className="rounded-[24px] border border-border/30 bg-background/45 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Now Playing</p>
                  <h2 className="mt-1 font-display text-3xl text-foreground">{activeSession.title}</h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-primary/80">
                    {activeSession.intention.replaceAll("_", " ")} · {activeSession.sourceTag.replaceAll("_", " ")} · {activeSession.duration} min
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePlayPause}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/35 bg-primary/12 text-primary transition-all hover:bg-primary/20"
                    aria-label={playback.status === "playing" ? "Pause" : "Play"}
                  >
                    {playback.status === "playing" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/35 bg-card/45 text-foreground transition-all hover:bg-card/65"
                    aria-label="Restart"
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleStop}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/35 bg-card/45 text-foreground transition-all hover:bg-card/65"
                    aria-label="Stop"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <div className="h-2 rounded-full bg-background/65 overflow-hidden border border-border/35">
                  <div className="h-full bg-gradient-to-r from-primary/85 to-emerald-300/70 transition-all" style={{ width: `${currentProgress}%` }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{fmtTime(playback.elapsedSeconds)}</span>
                  <span>{fmtTime(playback.totalSeconds)}</span>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
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
                  onClick={handleNextPractice}
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
              </div>
            </section>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default SacredPathVoice;
