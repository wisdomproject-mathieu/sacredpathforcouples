import type { SacredVoiceSession } from "@/lib/sacredPathVoiceContent";

export type SacredVoicePlayerStatus = "idle" | "playing" | "paused" | "ended";

export type SacredVoicePlaybackState = {
  status: SacredVoicePlayerStatus;
  currentBlockIndex: number;
  elapsedSeconds: number;
  totalSeconds: number;
};

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

export const generateSacredVoiceSession = (session: SacredVoiceSession) => session;

export const playSacredVoiceSession = (
  session: SacredVoiceSession,
  previous?: SacredVoicePlaybackState,
): SacredVoicePlaybackState => {
  const totalSeconds = session.duration * 60;
  if (previous && previous.status !== "idle") {
    return {
      ...previous,
      status: "playing",
      totalSeconds,
    };
  }

  return {
    status: "playing",
    currentBlockIndex: 0,
    elapsedSeconds: 0,
    totalSeconds,
  };
};

export const pauseSacredVoiceSession = (state: SacredVoicePlaybackState): SacredVoicePlaybackState => ({
  ...state,
  status: "paused",
});

export const stopSacredVoiceSession = (session: SacredVoiceSession): SacredVoicePlaybackState => ({
  status: "idle",
  currentBlockIndex: 0,
  elapsedSeconds: 0,
  totalSeconds: session.duration * 60,
});

export const restartSacredVoiceSession = (session: SacredVoiceSession): SacredVoicePlaybackState => ({
  status: "playing",
  currentBlockIndex: 0,
  elapsedSeconds: 0,
  totalSeconds: session.duration * 60,
});

export const tickSacredVoiceSession = (
  session: SacredVoiceSession,
  state: SacredVoicePlaybackState,
  deltaSeconds = 1,
): SacredVoicePlaybackState => {
  if (state.status !== "playing") return state;

  const totalSeconds = session.duration * 60;
  const elapsedSeconds = Math.min(totalSeconds, state.elapsedSeconds + deltaSeconds);
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
