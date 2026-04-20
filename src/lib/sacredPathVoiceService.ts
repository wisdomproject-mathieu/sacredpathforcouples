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

  // Prefer warm, sensual female English voices. Order tuned for naturalness.
  const preferred = [
    "Samantha",        // macOS / iOS — warm and natural
    "Ava (Premium)",   // macOS premium — very natural
    "Ava",
    "Allison",
    "Serena",
    "Moira",           // soft Irish lilt
    "Karen",           // warm Australian
    "Microsoft Aria",  // Windows neural
    "Microsoft Jenny", // Windows neural
    "Google UK English Female",
    "Google US English",
  ];

  for (const name of preferred) {
    const match = voices.find((voice) => voice.name.includes(name));
    if (match) return match;
  }

  // Fallback: any English female-sounding voice, then any English voice.
  const female = voices.find(
    (voice) => /en-/i.test(voice.lang) && /female|woman|samantha|aria|jenny|ava|allison|serena/i.test(voice.name),
  );
  if (female) return female;

  return voices.find((voice) => /en-/i.test(voice.lang)) ?? voices[0];
};

// Split text into short, breath-friendly phrases so the synthesizer
// produces natural prosody and pauses instead of a robotic monotone.
const splitIntoPhrases = (text: string): string[] => {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return [];
  // Split on sentence boundaries first.
  const sentences = cleaned.match(/[^.!?…]+[.!?…]+|[^.!?…]+$/g) ?? [cleaned];
  const phrases: string[] = [];
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
    // Further split very long sentences on commas / semicolons / colons / dashes.
    if (trimmed.length > 90) {
      const parts = trimmed.split(/(?<=[,;:—–])\s+/);
      for (const part of parts) {
        const p = part.trim();
        if (p) phrases.push(p);
      }
    } else {
      phrases.push(trimmed);
    }
  }
  return phrases;
};

const buildNarrationPhrases = (session: SacredVoiceSession): string[] => {
  const blocks = [session.introText, ...session.spokenBlocks, session.closingText].filter(Boolean);
  const phrases: string[] = [];
  blocks.forEach((block, blockIdx) => {
    const blockPhrases = splitIntoPhrases(block);
    phrases.push(...blockPhrases);
    // Extra breath between blocks.
    if (blockIdx < blocks.length - 1 && blockPhrases.length) {
      phrases.push("…");
    }
  });
  return phrases;
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

// Queue of phrases for the current session, played sequentially with
// breathing pauses between them. This produces a much warmer, more
// sensual cadence than dumping the whole script into one utterance.
let phraseQueue: string[] = [];
let phraseIndex = 0;
let pauseTimer: ReturnType<typeof setTimeout> | null = null;

const clearPauseTimer = () => {
  if (pauseTimer) {
    clearTimeout(pauseTimer);
    pauseTimer = null;
  }
};

const speakNextPhrase = () => {
  if (!hasSpeechSynthesis()) return;
  if (phraseIndex >= phraseQueue.length) {
    currentUtterance = null;
    activeSessionId = null;
    pausedAtMs = null;
    if (sessionEndCallback) sessionEndCallback();
    return;
  }

  const phrase = phraseQueue[phraseIndex];
  phraseIndex += 1;

  // Treat ellipsis-only tokens as a longer breath between sections.
  if (/^[…\.\s]+$/.test(phrase)) {
    pauseTimer = setTimeout(speakNextPhrase, 1100);
    return;
  }

  const utterance = new window.SpeechSynthesisUtterance(phrase);
  const voice = pickVoice();
  if (voice) utterance.voice = voice;

  // Sensual, slow, breathy delivery.
  utterance.rate = 0.78;
  utterance.pitch = 0.92;
  utterance.volume = 1;

  utterance.onend = () => {
    currentUtterance = null;
    // Short natural pause between phrases — longer after sentence enders.
    const endsSentence = /[.!?…]\s*$/.test(phrase);
    const gapMs = endsSentence ? 700 : 320;
    pauseTimer = setTimeout(speakNextPhrase, gapMs);
  };

  utterance.onerror = () => {
    currentUtterance = null;
    // Continue rather than abort on a single phrase error.
    pauseTimer = setTimeout(speakNextPhrase, 200);
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
};

export const startSacredVoiceSession = (
  session: SacredVoiceSession,
  options?: SacredVoiceStartOptions,
): SacredVoicePlaybackState => {
  clearSpeech();
  clearPauseTimer();
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

  phraseQueue = buildNarrationPhrases(session);
  phraseIndex = 0;
  activeSessionId = session.id;

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length && typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null;
      speakNextPhrase();
    };
  } else {
    speakNextPhrase();
  }

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
