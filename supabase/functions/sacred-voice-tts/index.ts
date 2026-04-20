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
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });

Deno.serve(async (request) => {
  console.info("[sacred-voice-tts] sacred-voice-tts invoked");
  console.info("[sacred-voice-tts] request method", request.method);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  let parsedBody: { text?: string; voiceId?: string; modelId?: string };
  try {
    parsedBody = await request.json();
  } catch {
    return json(400, { error: "Invalid JSON body." });
  }

  const text = parsedBody.text?.trim();
  console.info("[sacred-voice-tts] text present", Boolean(text));
  if (!text) {
    return json(400, { error: "Text is required." });
  }

  const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
  console.info("[sacred-voice-tts] ELEVENLABS_API_KEY present", Boolean(apiKey));
  if (!apiKey) {
    return json(503, { error: "ELEVENLABS_API_KEY is not configured." });
  }

  const secretVoiceId = Deno.env.get("ELEVENLABS_VOICE_ID")?.trim();
  const voiceId = secretVoiceId || parsedBody.voiceId?.trim() || "8quEMRkSpwEaWBzHvTLv";
  const modelId = parsedBody.modelId?.trim() || "eleven_multilingual_v2";
  console.info("[sacred-voice-tts] ELEVENLABS_VOICE_ID present", Boolean(secretVoiceId));

  try {
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
            stability: 0.55,
            similarity_boost: 0.78,
            style: 0.25,
            use_speaker_boost: true,
          },
        }),
      },
    );

    if (!response.ok) {
      const rawBody = await response.text().catch(() => "");
      const trimmedBody = rawBody.slice(0, 2000);
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
        providerStatus = "";
        providerMessage = "";
      }

      console.error("[sacred-voice-tts] ElevenLabs failure", {
        status: response.status,
        providerStatus: providerStatus || "unknown",
        providerMessage: providerMessage || "unknown",
        responseBody: trimmedBody,
      });
      return json(response.status, {
        error: "ElevenLabs synthesis failed.",
        providerStatus: providerStatus || "unknown",
        providerMessage: providerMessage || "unknown",
        detail: trimmedBody,
      });
    }

    const audioBuffer = await response.arrayBuffer();
    return new Response(audioBuffer, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=1800",
      },
    });
  } catch (error) {
    console.error("[sacred-voice-tts] ElevenLabs request exception", {
      detail: error instanceof Error ? error.message : "Unknown error",
    });
    return json(502, {
      error: "Unable to reach ElevenLabs.",
      detail: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
