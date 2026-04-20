import type { SacredVoiceAudioProvider } from "@/lib/sacredPathVoiceContent";

export const SACRED_VOICE_ELEVENLABS_VOICE_ID = "8quEMRkSpwEaWBzHvTLv";

export type SacredVoiceTtsResult = {
  provider: SacredVoiceAudioProvider;
  audioUrl: string;
  fromCache: boolean;
};

const audioCache = new Map<string, string>();

const buildCacheKey = (sessionId: string, voiceId: string) => `${sessionId}:${voiceId}`;

const getSacredVoiceTtsEndpoints = () => {
  const envEndpoint =
    typeof import.meta !== "undefined" && typeof import.meta.env?.VITE_SACRED_VOICE_TTS_URL === "string"
      ? import.meta.env.VITE_SACRED_VOICE_TTS_URL.trim()
      : "";

  const endpoints = [
    envEndpoint,
    "/api/sacred-voice-tts",
    "/.netlify/functions/sacred-voice-tts",
  ].filter(Boolean);

  return Array.from(new Set(endpoints));
};

const parseErrorMessage = async (response: Response) => {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (contentType.includes("application/json")) {
    const payload = await response.json().catch(() => ({}));
    if (typeof payload?.error === "string") return payload.error;
    if (typeof payload?.message === "string") return payload.message;
  }

  const text = await response.text().catch(() => "");
  return text.slice(0, 240).trim();
};

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

  const endpoints = getSacredVoiceTtsEndpoints();
  const attempts: string[] = [];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
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
        const detail = await parseErrorMessage(response);
        attempts.push(`${endpoint} -> ${response.status}${detail ? ` (${detail})` : ""}`);
        continue;
      }

      const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
      if (!contentType.includes("audio/")) {
        const detail = await parseErrorMessage(response);
        attempts.push(
          `${endpoint} -> invalid content type "${contentType || "unknown"}"${detail ? ` (${detail})` : ""}`,
        );
        continue;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      audioCache.set(key, audioUrl);

      return {
        provider: "elevenlabs",
        audioUrl,
        fromCache: false,
      };
    } catch (error) {
      attempts.push(
        `${endpoint} -> ${
          error instanceof Error ? error.message : "network error"
        }`,
      );
    }
  }

  throw new Error(
    `ElevenLabs request failed across all endpoints. ${attempts.join(" | ")}`.trim(),
  );
};
