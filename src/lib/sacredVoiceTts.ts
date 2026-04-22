import type { SacredVoiceAudioProvider } from "@/lib/sacredPathVoiceContent";

export const SACRED_VOICE_ELEVENLABS_VOICE_ID = "8quEMRkSpwEaWBzHvTLv";
export const SACRED_VOICE_SUPABASE_FUNCTION_NAME = "sacred-voice-tts";

export type SacredVoiceTtsResult = {
  provider: SacredVoiceAudioProvider;
  audioUrl: string;
  fromCache: boolean;
};

const readProviderHeader = (
  response: Response,
): SacredVoiceAudioProvider => {
  const header = response.headers.get("x-tts-provider")?.toLowerCase();
  if (header === "elevenlabs") return "elevenlabs";
  if (header === "edge") return "edge";
  if (header === "google") return "google";
  return "google";
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

  return `${supabaseUrl.replace(/\/+$/, "")}/functions/v1/${SACRED_VOICE_SUPABASE_FUNCTION_NAME}`;
};

const getSupabasePublishableKey = () =>
  typeof import.meta !== "undefined" && typeof import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY === "string"
    ? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY.trim()
    : "";

const parseErrorMessage = async (response: Response) => {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (contentType.includes("application/json")) {
    const payload = await response.json().catch(() => ({}));
    const providerStatus =
      typeof payload?.providerStatus === "string" ? payload.providerStatus : "";
    const providerMessage =
      typeof payload?.providerMessage === "string" ? payload.providerMessage : "";
    const detail = typeof payload?.detail === "string" ? payload.detail : "";
    if (typeof payload?.error === "string") {
      return [
        payload.error,
        providerStatus ? `providerStatus=${providerStatus}` : "",
        providerMessage ? `providerMessage=${providerMessage}` : "",
        detail ? `detail=${detail.slice(0, 240)}` : "",
      ]
        .filter(Boolean)
        .join(" | ");
    }
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
      provider: "google",
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

  console.info("[Sacred Voice] calling sacred-voice-tts", {
    functionName: SACRED_VOICE_SUPABASE_FUNCTION_NAME,
    endpoint,
    payloadLength: text.length,
    sessionId,
  });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publishableKey,
    },
    body: JSON.stringify({ text }),
  });

  console.info("[Sacred Voice] backend response status", {
    functionName: SACRED_VOICE_SUPABASE_FUNCTION_NAME,
    endpoint,
    status: response.status,
    contentType: response.headers.get("content-type") ?? "unknown",
  });

  if (!response.ok) {
    const detail = await parseErrorMessage(response);
    console.error("[Sacred Voice] backend TTS failed", {
      functionName: SACRED_VOICE_SUPABASE_FUNCTION_NAME,
      endpoint,
      status: response.status,
      detail,
    });
    throw new Error(
      detail ? `Supabase TTS request failed (${response.status}): ${detail}` : `Supabase TTS request failed (${response.status})`,
    );
  }

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("audio/")) {
    const detail = await parseErrorMessage(response);
    console.error("[Sacred Voice] backend TTS non-audio response", {
      functionName: SACRED_VOICE_SUPABASE_FUNCTION_NAME,
      endpoint,
      status: response.status,
      contentType: contentType || "unknown",
      detail,
    });
    throw new Error(
      `Supabase TTS returned invalid content type "${contentType || "unknown"}"${detail ? ` (${detail})` : ""}`,
    );
  }

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  audioCache.set(key, audioUrl);

  return {
    provider: readProviderHeader(response),
    audioUrl,
    fromCache: false,
  };
};
