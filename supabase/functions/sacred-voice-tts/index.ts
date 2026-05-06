// Sacred Voice TTS — free Google Translate TTS as primary (no API key needed),
// ElevenLabs as optional premium fallback when credits are available.
// Returns audio/mpeg bytes so the client just plays the blob.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const config = {
  verify_jwt: false,
};

const json = (status: number, payload: Record<string, unknown>) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

// ---------- Google Translate TTS (free, no key) ----------
// Public endpoint used by translate.google.com. Returns MP3.
// Limit: ~200 chars per request, so we chunk on sentence boundaries
// and concatenate the resulting MP3 segments.

const GOOGLE_TTS_MAX_CHARS = 190;

const splitForGoogleTts = (text: string): string[] => {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  // Split on sentence boundaries first.
  const sentences = normalized.match(/[^.!?]+[.!?]?/g) ?? [normalized];
  const chunks: string[] = [];
  let current = "";

  const pushCurrent = () => {
    if (current.trim()) chunks.push(current.trim());
    current = "";
  };

  for (const sentence of sentences) {
    const piece = sentence.trim();
    if (!piece) continue;

    if (piece.length > GOOGLE_TTS_MAX_CHARS) {
      // Sentence itself too long: split on commas / spaces.
      pushCurrent();
      const words = piece.split(" ");
      let buffer = "";
      for (const word of words) {
        if ((buffer + " " + word).trim().length > GOOGLE_TTS_MAX_CHARS) {
          if (buffer.trim()) chunks.push(buffer.trim());
          buffer = word;
        } else {
          buffer = buffer ? `${buffer} ${word}` : word;
        }
      }
      if (buffer.trim()) chunks.push(buffer.trim());
      continue;
    }

    if ((current + " " + piece).trim().length > GOOGLE_TTS_MAX_CHARS) {
      pushCurrent();
      current = piece;
    } else {
      current = current ? `${current} ${piece}` : piece;
    }
  }
  pushCurrent();
  return chunks;
};

const fetchGoogleTtsChunk = async (
  chunk: string,
  lang: string,
  index: number,
  total: number,
): Promise<Uint8Array> => {
  const url =
    `https://translate.google.com/translate_tts?ie=UTF-8` +
    `&q=${encodeURIComponent(chunk)}` +
    `&tl=${encodeURIComponent(lang)}` +
    `&total=${total}&idx=${index}` +
    `&textlen=${chunk.length}` +
    `&client=tw-ob&prev=input`;

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      Referer: "https://translate.google.com/",
      Accept: "audio/mpeg,*/*",
    },
  });

  if (!response.ok) {
    throw new Error(`Google TTS chunk ${index} failed: ${response.status}`);
  }
  return new Uint8Array(await response.arrayBuffer());
};

const synthesizeWithGoogleTts = async ({
  text,
  lang = "en",
}: {
  text: string;
  lang?: string;
}): Promise<Uint8Array> => {
  const chunks = splitForGoogleTts(text);
  if (chunks.length === 0) throw new Error("Google TTS: empty text");

  const total = chunks.length;
  const audioParts = await Promise.all(
    chunks.map((chunk, idx) => fetchGoogleTtsChunk(chunk, lang, idx, total)),
  );

  const totalLength = audioParts.reduce((acc, part) => acc + part.length, 0);
  const merged = new Uint8Array(totalLength);
  let offset = 0;
  for (const part of audioParts) {
    merged.set(part, offset);
    offset += part.length;
  }
  return merged;
};

// ---------- ElevenLabs (optional premium) ----------

const synthesizeWithElevenLabs = async ({
  text,
  voiceId,
  modelId,
  apiKey,
}: {
  text: string;
  voiceId: string;
  modelId: string;
  apiKey: string;
}) => {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.72,
          similarity_boost: 0.85,
          style: 0.15,
          use_speaker_boost: true,
          speed: 0.82,
        },
      }),
    },
  );

  if (!response.ok) {
    const rawBody = await response.text().catch(() => "");
    let providerStatus = "";
    let providerMessage = "";
    try {
      const parsed = JSON.parse(rawBody);
      providerStatus =
        parsed?.detail?.status ??
        parsed?.status ??
        parsed?.error?.code ??
        parsed?.error ??
        "";
      providerMessage =
        parsed?.detail?.message ??
        parsed?.message ??
        parsed?.detail ??
        "";
    } catch {
      /* ignore */
    }
    throw new Error(
      `ElevenLabs failed (${response.status}) ${providerStatus} ${providerMessage}`.trim(),
    );
  }

  return new Uint8Array(await response.arrayBuffer());
};

// ---------- Handler ----------

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  let parsedBody: {
    text?: string;
    voiceId?: string;
    modelId?: string;
    lang?: string;
    provider?: "google" | "elevenlabs" | "auto";
  };
  try {
    parsedBody = await request.json();
  } catch {
    return json(400, { error: "Invalid JSON body." });
  }

  const text = parsedBody.text?.trim();
  if (!text) return json(400, { error: "Text is required." });

  const requested = parsedBody.provider ?? "auto";
  const elevenKey = Deno.env.get("ELEVENLABS_API_KEY");

  // Provider order:
  //  - "elevenlabs": try ElevenLabs first, then Google
  //  - "google" or "auto": Google first (free, reliable), ElevenLabs only if explicit
  const order: Array<"google" | "elevenlabs"> =
    requested === "elevenlabs"
      ? ["elevenlabs", "google"]
      : ["google"];

  const errors: string[] = [];

  for (const provider of order) {
    try {
      if (provider === "google") {
        console.info("[sacred-voice-tts] trying Google TTS");
        const audio = await synthesizeWithGoogleTts({
          text,
          lang: parsedBody.lang || "en",
        });
        return new Response(audio, {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "audio/mpeg",
            "X-TTS-Provider": "google",
            "Cache-Control": "public, max-age=1800",
          },
        });
      }

      if (provider === "elevenlabs") {
        if (!elevenKey) {
          errors.push("elevenlabs: no API key configured");
          continue;
        }
        console.info("[sacred-voice-tts] trying ElevenLabs");
        const voiceId =
          Deno.env.get("ELEVENLABS_VOICE_ID")?.trim() ||
          parsedBody.voiceId?.trim() ||
          "8quEMRkSpwEaWBzHvTLv";
        const modelId = parsedBody.modelId?.trim() || "eleven_multilingual_v2";
        const audio = await synthesizeWithElevenLabs({
          text,
          voiceId,
          modelId,
          apiKey: elevenKey,
        });
        return new Response(audio, {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "audio/mpeg",
            "X-TTS-Provider": "elevenlabs",
            "Cache-Control": "public, max-age=1800",
          },
        });
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`[sacred-voice-tts] ${provider} failed`, msg);
      errors.push(`${provider}: ${msg}`);
    }
  }

  return json(502, {
    error: "All TTS providers failed.",
    detail: errors.join(" | "),
  });
});
