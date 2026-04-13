const defaultAllowedOrigins = [
  "https://sacredpathforcouples.com",
  "https://www.sacredpathforcouples.com",
  "https://main--sacrespathforcouples.netlify.app",
  "http://localhost:8080",
  "http://localhost:8888",
];

const parseAllowedOrigins = () => {
  const raw = process.env.BILLING_ALLOWED_ORIGINS;
  if (!raw) return defaultAllowedOrigins;
  const parsed = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return parsed.length ? parsed : defaultAllowedOrigins;
};

export const resolveAllowedOrigin = (requestOrigin?: string) => {
  const allowedOrigins = parseAllowedOrigins();
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }
  return allowedOrigins[0];
};

export const buildCorsHeaders = (requestOrigin?: string) => ({
  "Access-Control-Allow-Origin": resolveAllowedOrigin(requestOrigin),
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  Vary: "Origin",
});
