import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const readRequestBody = async (req: import("node:http").IncomingMessage) => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
};

const sendJson = (
  res: import("node:http").ServerResponse,
  statusCode: number,
  payload: unknown,
) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
};

// Dev-only proxy so Sacred Voice can use ElevenLabs while running `npm run dev`
// without requiring Netlify Functions locally.
const sacredVoiceDevProxy = (): Plugin => ({
  name: "sacred-voice-dev-proxy",
  configureServer(server: ViteDevServer) {
    server.middlewares.use(async (req, res, next) => {
      const requestPath = req.url?.split("?")[0] ?? "";
      const isTtsPath =
        requestPath.startsWith("/api/sacred-voice-tts") ||
        requestPath.startsWith("/.netlify/functions/sacred-voice-tts");

      if (!isTtsPath) {
        next();
        return;
      }

      if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
      }

      if (req.method !== "POST") {
        sendJson(res, 405, { error: "Method not allowed" });
        return;
      }

      const apiKey = process.env.ELEVENLABS_API_KEY;
      if (!apiKey) {
        sendJson(res, 503, { error: "ElevenLabs API key is not configured for local dev." });
        return;
      }

      let parsedBody: { text?: string; voiceId?: string; modelId?: string } = {};
      try {
        const body = await readRequestBody(req);
        parsedBody = body ? JSON.parse(body) : {};
      } catch {
        sendJson(res, 400, { error: "Invalid JSON body." });
        return;
      }

      const text = parsedBody.text?.trim();
      if (!text) {
        sendJson(res, 400, { error: "Text is required." });
        return;
      }

      const voiceId = parsedBody.voiceId?.trim() || "8quEMRkSpwEaWBzHvTLv";
      const modelId = parsedBody.modelId?.trim() || "eleven_multilingual_v2";

      try {
        const elevenlabsResponse = await fetch(
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

        if (!elevenlabsResponse.ok) {
          const detail = await elevenlabsResponse.text().catch(() => "");
          sendJson(res, elevenlabsResponse.status, {
            error: "ElevenLabs synthesis failed.",
            detail: detail.slice(0, 400),
          });
          return;
        }

        const audioBuffer = Buffer.from(await elevenlabsResponse.arrayBuffer());
        res.statusCode = 200;
        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("Cache-Control", "no-store");
        res.end(audioBuffer);
      } catch (error) {
        sendJson(res, 502, {
          error: "Unable to reach ElevenLabs from local dev proxy.",
          detail: error instanceof Error ? error.message : "Unknown error",
        });
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && sacredVoiceDevProxy(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
