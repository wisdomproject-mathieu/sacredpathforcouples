import { buildCorsHeaders } from "./_shared/cors";

type FunctionResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
  isBase64Encoded?: boolean;
};

const json = (statusCode: number, body: unknown, requestOrigin?: string): FunctionResponse => ({
  statusCode,
  headers: {
    ...buildCorsHeaders(requestOrigin),
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

export const config = {
  path: "/api/sacred-voice-tts",
};

export const handler = async (event: {
  httpMethod?: string;
  body?: string | null;
  headers?: Record<string, string | undefined>;
}): Promise<FunctionResponse> => {
  const requestOrigin = event.headers?.origin || event.headers?.Origin;

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: buildCorsHeaders(requestOrigin),
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" }, requestOrigin);
  }

  let parsedBody: { text?: string; voiceId?: string; modelId?: string };
  try {
    parsedBody = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body." }, requestOrigin);
  }

  const text = parsedBody.text?.trim();
  if (!text) {
    return json(400, { error: "Text is required." }, requestOrigin);
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return json(503, { error: "ElevenLabs API key is not configured." }, requestOrigin);
  }

  const voiceId = parsedBody.voiceId?.trim() || "8quEMRkSpwEaWBzHvTLv";
  const modelId = parsedBody.modelId?.trim() || "eleven_multilingual_v2";

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
    const errorBody = await response.text().catch(() => "");
    return json(
      response.status,
      {
        error: "ElevenLabs synthesis failed.",
        detail: errorBody.slice(0, 400),
      },
      requestOrigin,
    );
  }

  const audioBuffer = await response.arrayBuffer();
  return {
    statusCode: 200,
    headers: {
      ...buildCorsHeaders(requestOrigin),
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=1800",
    },
    body: Buffer.from(audioBuffer).toString("base64"),
    isBase64Encoded: true,
  };
};
