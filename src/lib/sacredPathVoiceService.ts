import type {
  SacredVoiceAudioProvider,
  SacredVoiceSession,
} from "@/lib/sacredPathVoiceContent";
import { synthesizeSacredVoiceAudio } from "@/lib/sacredVoiceTts";

export type SacredVoicePlayerStatus = "idle" | "playing" | "paused" | "ended";

export type SacredVoicePlaybackState = {
  status: SacredVoicePlayerStatus;
  elapsedSeconds: number;
  totalSeconds: number;
};

type SacredVoiceStartOptions = {
  onEnd?: () => void;
};

export type SacredVoiceStartResult = {
  playback: SacredVoicePlaybackState;
  provider: SacredVoiceAudioProvider;
  message?: string;
};

let currentUtterance: SpeechSynthesisUtterance | null = null;
let activeAudio: HTMLAudioElement | null = null;
let activeProvider: SacredVoiceAudioProvider | null = null;
let activeSessionId: string | null = null;
let startedAtMs = 0;
let pausedAtMs: number | null = null;
let pausedDurationMs = 0;
let sessionEndCallback: (() => void) | null = null;

const hasSpeechSynthesis = () =>
  typeof window !== "undefined" &&
  "speechSynthesis" in window &&
  typeof window.SpeechSynthesisUtterance !== "undefined";

const pickVoice = () => {
  if (!hasSpeechSynthesis()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const preferred = [
    "Samantha",
    "Google UK English Female",
    "Karen",
    "Moira",
    "Ava",
    "Google US English",
  ];

  for (const name of preferred) {
    const match = voices.find((voice) => voice.name.includes(name));
    if (match) return match;
  }

  return voices.find((voice) => /en-/i.test(voice.lang)) ?? voices[0];
};

const resetClock = () => {
  startedAtMs = Date.now();
  pausedAtMs = null;
  pausedDurationMs = 0;
};

const getBrowserElapsedSeconds = () => {
  if (!startedAtMs) return 0;
  const now = Date.now();
  const totalPaused = pausedDurationMs + (pausedAtMs ? now - pausedAtMs : 0);
  return Math.max(0, Math.floor((now - startedAtMs - totalPaused) / 1000));
};

const clearSpeech = () => {
  if (!hasSpeechSynthesis()) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
};

const clearAudio = () => {
  if (!activeAudio) return;
  activeAudio.pause();
  activeAudio.src = "";
  activeAudio.load();
  activeAudio = null;
};

const clearOutputs = () => {
  clearSpeech();
  clearAudio();
  activeProvider = null;
  activeSessionId = null;
  pausedAtMs = null;
};

const createPlayingState = (totalSeconds: number): SacredVoicePlaybackState => ({
  status: "playing",
  elapsedSeconds: 0,
  totalSeconds,
});

const bindAudioLifecycle = (audio: HTMLAudioElement) => {
  audio.onended = () => {
    if (sessionEndCallback) sessionEndCallback();
  };
  audio.onerror = () => {
    if (sessionEndCallback) sessionEndCallback();
  };
};

const startBrowserSpeech = (
  session: SacredVoiceSession,
  options?: SacredVoiceStartOptions,
): SacredVoiceStartResult => {
  sessionEndCallback = options?.onEnd ?? null;
  resetClock();

  const totalSeconds = session.duration * 60;

  if (!hasSpeechSynthesis()) {
    return {
      playback: { status: "idle", elapsedSeconds: 0, totalSeconds },
      provider: "browser",
      message: "Audio playback is unavailable in this browser.",
    };
  }

  const utterance = new window.SpeechSynthesisUtterance(session.narrationText);
  const voice = pickVoice();
  if (voice) utterance.voice = voice;

  // Sensual, slow pacing for the fallback voice.
  utterance.rate = 0.78;
  utterance.pitch = 0.95;
  utterance.volume = 1;

  utterance.onend = () => {
    currentUtterance = null;
    activeSessionId = null;
    activeProvider = null;
    pausedAtMs = null;
    if (sessionEndCallback) sessionEndCallback();
  };

  utterance.onerror = () => {
    currentUtterance = null;
    activeSessionId = null;
    activeProvider = null;
    pausedAtMs = null;
    if (sessionEndCallback) sessionEndCallback();
  };

  currentUtterance = utterance;
  activeProvider = "browser";
  activeSessionId = session.id;
  window.speechSynthesis.speak(utterance);

  return {
    playback: createPlayingState(totalSeconds),
    provider: "browser",
  };
};

export const startSacredVoiceSession = async (
  session: SacredVoiceSession,
  options?: SacredVoiceStartOptions,
): Promise<SacredVoiceStartResult> => {
  clearOutputs();
  sessionEndCallback = options?.onEnd ?? null;
  resetClock();

  const totalSeconds = session.duration * 60;

  try {
    const ttsResult = await synthesizeSacredVoiceAudio({
      sessionId: session.id,
      text: session.narrationText,
    });

    const audio = new Audio(ttsResult.audioUrl);
    audio.preload = "auto";
    bindAudioLifecycle(audio);

    activeAudio = audio;
    activeProvider = "elevenlabs";
    activeSessionId = session.id;

    await audio.play();

    return {
      playback: createPlayingState(totalSeconds),
      provider: "elevenlabs",
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown TTS error";
    console.warn("[Sacred Voice] ElevenLabs unavailable, falling back to browser voice", {
      reason,
      sessionId: session.id,
    });
    const isQuota = /quota_exceeded|quota of|credits remaining/i.test(reason);
    const friendly = isQuota
      ? "Premium voice is recharging. Continuing with the gentle browser voice."
      : "Premium voice is resting. Continuing with the gentle browser voice.";
    const fallback = startBrowserSpeech(session, options);
    return {
      ...fallback,
      message: friendly,
    };
  }
};

export const pauseSacredVoiceSession = (
  state: SacredVoicePlaybackState,
): SacredVoicePlaybackState => {
  if (activeProvider === "elevenlabs" && activeAudio) activeAudio.pause();
  if (
    activeProvider === "browser" &&
    hasSpeechSynthesis() &&
    window.speechSynthesis.speaking &&
    !window.speechSynthesis.paused
  ) {
    window.speechSynthesis.pause();
  }
  if (!pausedAtMs) pausedAtMs = Date.now();
  return { ...state, status: "paused" };
};

export const resumeSacredVoiceSession = (
  state: SacredVoicePlaybackState,
): SacredVoicePlaybackState => {
  if (activeProvider === "elevenlabs" && activeAudio) void activeAudio.play();
  if (
    activeProvider === "browser" &&
    hasSpeechSynthesis() &&
    window.speechSynthesis.paused
  ) {
    window.speechSynthesis.resume();
  }
  if (pausedAtMs) {
    pausedDurationMs += Date.now() - pausedAtMs;
    pausedAtMs = null;
  }
  return { ...state, status: "playing" };
};

export const restartSacredVoiceSession = async (
  session: SacredVoiceSession,
  options?: SacredVoiceStartOptions,
): Promise<SacredVoiceStartResult> => startSacredVoiceSession(session, options);

export const stopSacredVoiceSession = (
  session?: SacredVoiceSession,
): SacredVoicePlaybackState => {
  clearOutputs();
  return {
    status: "idle",
    elapsedSeconds: 0,
    totalSeconds: session ? session.duration * 60 : 0,
  };
};

export const tickSacredVoiceSession = (
  session: SacredVoiceSession,
  state: SacredVoicePlaybackState,
): SacredVoicePlaybackState => {
  if (state.status !== "playing") return state;

  let elapsedSeconds = state.elapsedSeconds;
  let totalSeconds = state.totalSeconds || session.duration * 60;

  if (activeProvider === "elevenlabs" && activeAudio) {
    elapsedSeconds = Math.max(0, Math.floor(activeAudio.currentTime));
    if (Number.isFinite(activeAudio.duration) && activeAudio.duration > 0) {
      totalSeconds = Math.floor(activeAudio.duration);
    }
  } else {
    totalSeconds = session.duration * 60;
    elapsedSeconds = Math.min(totalSeconds, getBrowserElapsedSeconds());
  }

  if (
    (activeProvider === "elevenlabs" && activeAudio?.ended) ||
    elapsedSeconds >= totalSeconds
  ) {
    return {
      status: "ended",
      elapsedSeconds: Math.max(elapsedSeconds, totalSeconds),
      totalSeconds,
    };
  }

  return { status: "playing", elapsedSeconds, totalSeconds };
};

export const sacredVoiceProgress = (state: SacredVoicePlaybackState) => {
  if (!state.totalSeconds) return 0;
  return Math.max(0, Math.min(100, (state.elapsedSeconds / state.totalSeconds) * 100));
};

export const isSacredVoiceAudioSupported = () =>
  typeof window !== "undefined" &&
  (typeof window.Audio !== "undefined" || hasSpeechSynthesis());

export const getSacredVoiceAudioProvider = (): SacredVoiceAudioProvider | null =>
  activeProvider;
