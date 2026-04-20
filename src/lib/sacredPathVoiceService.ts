import type {
  SacredVoiceAudioProvider,
  SacredVoiceSession,
} from "@/lib/sacredPathVoiceContent";
import { synthesizeSacredVoiceAudio } from "@/lib/sacredVoiceTts";

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

const blockDurations = (session: SacredVoiceSession, totalSeconds: number) => {
  const blockCount = Math.max(1, session.spokenBlocks.length);
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
  currentBlockIndex: 0,
  elapsedSeconds: 0,
  totalSeconds,
});

const bindAudioLifecycle = (audio: HTMLAudioElement) => {
  audio.onended = () => {
    if (sessionEndCallback) {
      sessionEndCallback();
    }
  };

  audio.onerror = () => {
    if (sessionEndCallback) {
      sessionEndCallback();
    }
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
      playback: {
        status: "idle",
        currentBlockIndex: 0,
        elapsedSeconds: 0,
        totalSeconds,
      },
      provider: "browser",
      message: "Audio playback is unavailable in this browser.",
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
    activeProvider = null;
    pausedAtMs = null;
    if (sessionEndCallback) {
      sessionEndCallback();
    }
  };

  utterance.onerror = () => {
    currentUtterance = null;
    activeSessionId = null;
    activeProvider = null;
    pausedAtMs = null;
    if (sessionEndCallback) {
      sessionEndCallback();
    }
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
      text: buildNarrationText(session),
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
    const fallbackReason =
      error instanceof Error ? error.message : "Unknown backend TTS error";
    console.warn("[Sacred Voice] Falling back to browser speech", {
      reason: fallbackReason,
      sessionId: session.id,
    });
    const fallback = startBrowserSpeech(session, options);
    return {
      ...fallback,
      message:
        error instanceof Error
          ? `ElevenLabs unavailable. Using browser voice. (${error.message})`
          : "ElevenLabs unavailable. Using browser voice.",
    };
  }
};

export const pauseSacredVoiceSession = (state: SacredVoicePlaybackState): SacredVoicePlaybackState => {
  if (activeProvider === "elevenlabs" && activeAudio) {
    activeAudio.pause();
  }

  if (activeProvider === "browser" && hasSpeechSynthesis() && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
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
  if (activeProvider === "elevenlabs" && activeAudio) {
    void activeAudio.play();
  }

  if (activeProvider === "browser" && hasSpeechSynthesis() && window.speechSynthesis.paused) {
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

  const durations = blockDurations(session, Math.max(1, totalSeconds));
  const currentBlockIndex = deriveBlockIndex(elapsedSeconds, durations);

  if (
    (activeProvider === "elevenlabs" && activeAudio?.ended) ||
    elapsedSeconds >= totalSeconds
  ) {
    return {
      status: "ended",
      currentBlockIndex,
      elapsedSeconds: Math.max(elapsedSeconds, totalSeconds),
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

export const isSacredVoiceAudioSupported = () =>
  typeof window !== "undefined" && (typeof window.Audio !== "undefined" || hasSpeechSynthesis());

export const getSacredVoiceAudioProvider = (): SacredVoiceAudioProvider | null => activeProvider;
