import type { SacredVoiceAudioProvider } from "@/lib/sacredPathVoiceContent";

export const SACRED_VOICE_ELEVENLABS_VOICE_ID = "8quEMRkSpwEaWBzHvTLv";

export type SacredVoiceTtsResult = {
  provider: SacredVoiceAudioProvider;
  audioUrl: string;
  fromCache: boolean;
};

const audioCache = new Map<string, string>();

const buildCacheKey = (sessionId: string, voiceId: string) => `${sessionId}:${voiceId}`;

export const clearSacredVoiceAudioCache = () => {
  for (const url of audioCache.values()) {
    URL.revokeObjectURL(url);
  }
  audioCache.clear();
};

export const synthesizeSacredVoiceAudio = async ({
  sessionId,
  text,
  voiceId = SACRED_VOICE_ELEVENLABS_VOICE_ID,
}: {
  sessionId: string;
  text: string;
  voiceId?: string;
}): Promise<SacredVoiceTtsResult> => {
  const key = buildCacheKey(sessionId, voiceId);
  const cached = audioCache.get(key);
  if (cached) {
    return {
      provider: "elevenlabs",
      audioUrl: cached,
      fromCache: true,
    };
  }

  const response = await fetch("/api/sacred-voice-tts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      voiceId,
      modelId: "eleven_multilingual_v2",
    }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const message =
      typeof payload?.error === "string"
        ? payload.error
        : `ElevenLabs request failed (${response.status})`;
    throw new Error(message);
  }

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  audioCache.set(key, audioUrl);

  return {
    provider: "elevenlabs",
    audioUrl,
    fromCache: false,
  };
};
