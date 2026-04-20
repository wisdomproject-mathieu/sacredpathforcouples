import type { SacredVoiceSession } from "@/lib/sacredPathVoiceContent";

export type SacredVoicePlayerStatus = "idle" | "playing" | "paused" | "ended";

export type SacredVoicePlaybackState = {
  status: SacredVoicePlayerStatus;
  currentBlockIndex: number;
  elapsedSeconds: number;
  totalSeconds: number;
};

type SacredVoiceStartOptions = {
  onEnd?: () => void;
};

let currentUtterance: SpeechSynthesisUtterance | null = null;
let activeSessionId: string | null = null;
let startedAtMs = 0;
let pausedAtMs: number | null = null;
let pausedDurationMs = 0;
let sessionEndCallback: (() => void) | null = null;

const hasSpeechSynthesis = () =>
  typeof window !== "undefined" &&
  "speechSynthesis" in window &&
  typeof window.SpeechSynthesisUtterance !== "undefined";

const blockDurations = (session: SacredVoiceSession) => {
  const blockCount = Math.max(1, session.spokenBlocks.length);
  const totalSeconds = session.duration * 60;
  const base = Math.max(8, Math.floor(totalSeconds / blockCount));
  const arr = Array.from({ length: blockCount }, () => base);
  const allocated = arr.reduce((sum, value) => sum + value, 0);
  const delta = totalSeconds - allocated;
  if (delta !== 0) {
    arr[arr.length - 1] += delta;
  }
  return arr;
};

const deriveBlockIndex = (elapsedSeconds: number, durations: number[]) => {
  let running = 0;
  for (let i = 0; i < durations.length; i += 1) {
    running += durations[i];
    if (elapsedSeconds < running) return i;
  }
  return durations.length - 1;
};

const pickVoice = () => {
  if (!hasSpeechSynthesis()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const preferred = [
    "Samantha",
    "Google UK English Female",
    "Google US English",
    "Karen",
    "Moira",
    "Ava",
  ];

  for (const name of preferred) {
    const match = voices.find((voice) => voice.name.includes(name));
    if (match) return match;
  }

  return voices.find((voice) => /en-/i.test(voice.lang)) ?? voices[0];
};

const buildNarrationText = (session: SacredVoiceSession) => {
  const blocks = [session.introText, ...session.spokenBlocks, session.closingText].filter(Boolean);
  return blocks.join("\n\n");
};

const resetClock = () => {
  startedAtMs = Date.now();
  pausedAtMs = null;
  pausedDurationMs = 0;
};

const getElapsedSeconds = () => {
  if (!startedAtMs) return 0;
  const now = Date.now();
  const totalPaused = pausedDurationMs + (pausedAtMs ? now - pausedAtMs : 0);
  return Math.max(0, Math.floor((now - startedAtMs - totalPaused) / 1000));
};

const clearSpeech = () => {
  if (!hasSpeechSynthesis()) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
  activeSessionId = null;
  pausedAtMs = null;
};

export const startSacredVoiceSession = (
  session: SacredVoiceSession,
  options?: SacredVoiceStartOptions,
): SacredVoicePlaybackState => {
  clearSpeech();
  sessionEndCallback = options?.onEnd ?? null;

  const totalSeconds = session.duration * 60;
  resetClock();

  if (!hasSpeechSynthesis()) {
    return {
      status: "playing",
      currentBlockIndex: 0,
      elapsedSeconds: 0,
      totalSeconds,
    };
  }

  const utterance = new window.SpeechSynthesisUtterance(buildNarrationText(session));
  const voice = pickVoice();
  if (voice) utterance.voice = voice;

  utterance.rate = 0.9;
  utterance.pitch = 0.98;
  utterance.volume = 1;

  utterance.onend = () => {
    currentUtterance = null;
    activeSessionId = null;
    pausedAtMs = null;
    if (sessionEndCallback) {
      sessionEndCallback();
    }
  };

  utterance.onerror = () => {
    currentUtterance = null;
    activeSessionId = null;
    pausedAtMs = null;
    if (sessionEndCallback) {
      sessionEndCallback();
    }
  };

  currentUtterance = utterance;
  activeSessionId = session.id;
  window.speechSynthesis.speak(utterance);

  return {
    status: "playing",
    currentBlockIndex: 0,
    elapsedSeconds: 0,
    totalSeconds,
  };
};

export const pauseSacredVoiceSession = (state: SacredVoicePlaybackState): SacredVoicePlaybackState => {
  if (hasSpeechSynthesis() && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
    window.speechSynthesis.pause();
  }

  if (!pausedAtMs) {
    pausedAtMs = Date.now();
  }

  return {
    ...state,
    status: "paused",
  };
};

export const resumeSacredVoiceSession = (state: SacredVoicePlaybackState): SacredVoicePlaybackState => {
  if (hasSpeechSynthesis() && window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  if (pausedAtMs) {
    pausedDurationMs += Date.now() - pausedAtMs;
    pausedAtMs = null;
  }

  return {
    ...state,
    status: "playing",
  };
};

export const restartSacredVoiceSession = (
  session: SacredVoiceSession,
  options?: SacredVoiceStartOptions,
): SacredVoicePlaybackState => startSacredVoiceSession(session, options);

export const stopSacredVoiceSession = (
  session?: SacredVoiceSession,
): SacredVoicePlaybackState => {
  clearSpeech();

  return {
    status: "idle",
    currentBlockIndex: 0,
    elapsedSeconds: 0,
    totalSeconds: session ? session.duration * 60 : 0,
  };
};

export const tickSacredVoiceSession = (
  session: SacredVoiceSession,
  state: SacredVoicePlaybackState,
): SacredVoicePlaybackState => {
  if (state.status !== "playing") return state;

  const totalSeconds = session.duration * 60;
  const elapsedSeconds = Math.min(totalSeconds, getElapsedSeconds());
  const durations = blockDurations(session);
  const currentBlockIndex = deriveBlockIndex(elapsedSeconds, durations);

  if (elapsedSeconds >= totalSeconds) {
    return {
      status: "ended",
      currentBlockIndex,
      elapsedSeconds,
      totalSeconds,
    };
  }

  return {
    status: "playing",
    currentBlockIndex,
    elapsedSeconds,
    totalSeconds,
  };
};

export const sacredVoiceProgress = (state: SacredVoicePlaybackState) => {
  if (!state.totalSeconds) return 0;
  return Math.max(0, Math.min(100, (state.elapsedSeconds / state.totalSeconds) * 100));
};

export const isSacredVoiceAudioSupported = () => hasSpeechSynthesis();

export const isSacredVoiceSessionActive = (sessionId: string) => activeSessionId === sessionId;
