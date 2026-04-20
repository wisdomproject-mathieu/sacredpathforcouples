import type { SacredVoiceAudioProvider } from "@/lib/sacredPathVoiceContent";

export const SACRED_VOICE_ELEVENLABS_VOICE_ID = "8quEMRkSpwEaWBzHvTLv";

export type SacredVoiceTtsResult = {
  provider: SacredVoiceAudioProvider;
  audioUrl: string;
  fromCache: boolean;
};

const audioCache = new Map<string, string>();

const buildCacheKey = (sessionId: string, voiceId: string) => `${sessionId}:${voiceId}`;

const getSupabaseFunctionEndpoint = () => {
  const envOverride =
    typeof import.meta !== "undefined" && typeof import.meta.env?.VITE_SACRED_VOICE_TTS_URL === "string"
      ? import.meta.env.VITE_SACRED_VOICE_TTS_URL.trim()
      : "";
  if (envOverride) return envOverride;

  const supabaseUrl =
    typeof import.meta !== "undefined" && typeof import.meta.env?.VITE_SUPABASE_URL === "string"
      ? import.meta.env.VITE_SUPABASE_URL.trim()
      : "";
  if (!supabaseUrl) return "";

  return `${supabaseUrl.replace(/\/+$/, "")}/functions/v1/sacred-voice-tts`;
};

const getSupabasePublishableKey = () =>
  typeof import.meta !== "undefined" && typeof import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY === "string"
    ? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY.trim()
    : "";

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

  const endpoint = getSupabaseFunctionEndpoint();
  const publishableKey = getSupabasePublishableKey();
  if (!endpoint) {
    throw new Error("Supabase function endpoint is not configured.");
  }
  if (!publishableKey) {
    throw new Error("Supabase publishable key is not configured.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    body: JSON.stringify({
      text,
      ...(voiceId && voiceId !== SACRED_VOICE_ELEVENLABS_VOICE_ID ? { voiceId } : {}),
      modelId: "eleven_multilingual_v2",
    }),
  });

  if (!response.ok) {
    const detail = await parseErrorMessage(response);
    throw new Error(
      detail ? `Supabase TTS request failed (${response.status}): ${detail}` : `Supabase TTS request failed (${response.status})`,
    );
  }

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("audio/")) {
    const detail = await parseErrorMessage(response);
    throw new Error(
      `Supabase TTS returned invalid content type "${contentType || "unknown"}"${detail ? ` (${detail})` : ""}`,
    );
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
