// Sacred Voice TTS — Microsoft Edge TTS (free, neural) as primary,
// ElevenLabs as optional premium, both proxied here so the browser
// receives clean audio/mpeg bytes.

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

// ---------- Microsoft Edge TTS (free, no API key) ----------
// Uses the same WebSocket endpoint Microsoft Edge's "Read aloud" feature uses.
// Voice list: https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/voices/list

const EDGE_TRUSTED_TOKEN =
  "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const EDGE_WSS_URL =
  `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${EDGE_TRUSTED_TOKEN}`;

const generateConnectId = () =>
  crypto.randomUUID().replace(/-/g, "").toUpperCase();

const escapeXml = (input: string) =>
  input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const buildSsml = (
  text: string,
  voice: string,
  rate: string,
  pitch: string,
) => {
  const safeText = escapeXml(text);
  return (
    `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>` +
    `<voice name='${voice}'>` +
    `<prosody rate='${rate}' pitch='${pitch}'>${safeText}</prosody>` +
    `</voice></speak>`
  );
};

type EdgeTtsParams = {
  text: string;
  voice?: string;
  rate?: string;
  pitch?: string;
};

const synthesizeWithEdgeTts = ({
  text,
  voice = "en-US-AriaNeural",
  rate = "-18%",
  pitch = "-2%",
}: EdgeTtsParams): Promise<Uint8Array> =>
  new Promise((resolve, reject) => {
    const connectId = generateConnectId();
    const audioChunks: Uint8Array[] = [];
    let settled = false;

    const finish = (
      action: "resolve" | "reject",
      payload: Uint8Array | Error,
    ) => {
      if (settled) return;
      settled = true;
      try {
        socket.close();
      } catch {
        /* ignore */
      }
      if (action === "resolve") resolve(payload as Uint8Array);
      else reject(payload as Error);
    };

    const socket = new WebSocket(EDGE_WSS_URL);
    socket.binaryType = "arraybuffer";

    const timeout = setTimeout(() => {
      finish("reject", new Error("Edge TTS timed out after 30s"));
    }, 30_000);

    socket.onopen = () => {
      const ts = new Date().toISOString();
      const configMessage =
        `X-Timestamp:${ts}\r\n` +
        `Content-Type:application/json; charset=utf-8\r\n` +
        `Path:speech.config\r\n\r\n` +
        `{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`;
      socket.send(configMessage);

      const ssml = buildSsml(text, voice, rate, pitch);
      const ssmlMessage =
        `X-RequestId:${connectId}\r\n` +
        `Content-Type:application/ssml+xml\r\n` +
        `X-Timestamp:${ts}\r\n` +
        `Path:ssml\r\n\r\n` +
        ssml;
      socket.send(ssmlMessage);
    };

    socket.onmessage = (event) => {
      if (typeof event.data === "string") {
        if (event.data.includes("Path:turn.end")) {
          clearTimeout(timeout);
          const total = audioChunks.reduce((acc, c) => acc + c.length, 0);
          const merged = new Uint8Array(total);
          let offset = 0;
          for (const chunk of audioChunks) {
            merged.set(chunk, offset);
            offset += chunk.length;
          }
          if (merged.length === 0) {
            finish("reject", new Error("Edge TTS returned no audio"));
          } else {
            finish("resolve", merged);
          }
        }
        return;
      }

      // Binary frame: first 2 bytes = big-endian length of header block.
      const buffer = event.data as ArrayBuffer;
      const view = new DataView(buffer);
      const headerLength = view.getUint16(0, false);
      const audioStart = 2 + headerLength;
      if (buffer.byteLength > audioStart) {
        audioChunks.push(new Uint8Array(buffer, audioStart));
      }
    };

    socket.onerror = () => {
      clearTimeout(timeout);
      finish("reject", new Error("Edge TTS websocket error"));
    };

    socket.onclose = (event) => {
      if (settled) return;
      clearTimeout(timeout);
      if (audioChunks.length > 0) {
        const total = audioChunks.reduce((acc, c) => acc + c.length, 0);
        const merged = new Uint8Array(total);
        let offset = 0;
        for (const chunk of audioChunks) {
          merged.set(chunk, offset);
          offset += chunk.length;
        }
        finish("resolve", merged);
      } else {
        finish(
          "reject",
          new Error(`Edge TTS closed without audio (code ${event.code})`),
        );
      }
    };
  });

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
    const err = new Error(
      `ElevenLabs failed (${response.status}) ${providerStatus} ${providerMessage}`.trim(),
    );
    (err as { status?: number }).status = response.status;
    throw err;
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
    provider?: "edge" | "elevenlabs" | "auto";
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

  // Provider order: explicit choice wins, otherwise Edge first (free, reliable).
  const order: Array<"edge" | "elevenlabs"> =
    requested === "elevenlabs"
      ? ["elevenlabs", "edge"]
      : requested === "edge"
        ? ["edge"]
        : ["edge", "elevenlabs"];

  const errors: string[] = [];

  for (const provider of order) {
    try {
      if (provider === "edge") {
        console.info("[sacred-voice-tts] trying Edge TTS");
        const audio = await synthesizeWithEdgeTts({ text });
        return new Response(audio, {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "audio/mpeg",
            "X-TTS-Provider": "edge",
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
