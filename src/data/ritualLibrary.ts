import { MASTER_RITUAL_REGISTRY } from "@/lib/masterRitualRegistry";

export type WeatherState = "sunny" | "warm" | "electric" | "foggy" | "frozen" | "stormy";
export type RitualTier = "free-daily" | "premium";
export type RitualCategory =
  | "repair"
  | "connection"
  | "desire"
  | "touch"
  | "conversation"
  | "voice"
  | "oracle"
  | "journey";

export interface Ritual {
  id: string;
  title: string;
  subtitle: string;
  category: RitualCategory;
  weather: WeatherState[];
  pairings?: Array<`${WeatherState}_${WeatherState}`>;
  durationMinutes: 3 | 5 | 8 | 12 | 20;
  intensity: "gentle" | "medium" | "deep";
  tier: RitualTier;
  imageMood: WeatherState;
  intro: string;
  steps: string[];
  closing: string;
  tags: string[];
}

const FREE_DAILY_IDS = new Set([
  "tk001",
  "tk002",
  "tk003",
  "tk005",
  "tk006",
  "tk013",
  "tk018",
  "tk022",
  "tk031",
  "tk036",
  "tk050",
  "tk077",
  "tk084",
  "tk092",
  "tk093",
  "tk094",
  "tk099",
  "vs001",
  "vs002",
  "vs003",
]);

const weatherOrder: WeatherState[] = ["stormy", "frozen", "foggy", "warm", "electric", "sunny"];

function parseDurationMinutes(duration: string): 3 | 5 | 8 | 12 | 20 {
  const value = Number.parseInt(duration, 10);
  if (value <= 4) return 3;
  if (value <= 6) return 5;
  if (value <= 9) return 8;
  if (value <= 16) return 12;
  return 20;
}

function parseCategory(input: string): RitualCategory {
  const v = input.toLowerCase();
  if (v.includes("repair") || v.includes("clearing")) return "repair";
  if (v.includes("voice") || v.includes("sound")) return "voice";
  if (v.includes("desire") || v.includes("union") || v.includes("energy")) return "desire";
  if (v.includes("touch") || v.includes("massage") || v.includes("embrace")) return "touch";
  if (v.includes("conversation") || v.includes("gaze")) return "conversation";
  if (v.includes("journey")) return "journey";
  if (v.includes("oracle")) return "oracle";
  return "connection";
}

function parseIntensity(input: string): "gentle" | "medium" | "deep" {
  const v = input.toLowerCase();
  if (v.includes("deep")) return "deep";
  if (v.includes("medium")) return "medium";
  return "gentle";
}

function parseWeather(tags?: string[]): WeatherState[] {
  if (!tags?.length) return weatherOrder;
  const normalized = new Set<WeatherState>();
  for (const tag of tags) {
    const token = tag.toLowerCase();
    if (token.includes("stormy")) normalized.add("stormy");
    if (token.includes("frozen")) normalized.add("frozen");
    if (token.includes("foggy") || token.includes("cloudy")) normalized.add("foggy");
    if (token.includes("warm")) normalized.add("warm");
    if (token.includes("electric")) normalized.add("electric");
    if (token.includes("sunny") || token.includes("radiant")) normalized.add("sunny");
  }
  return normalized.size ? Array.from(normalized) : weatherOrder;
}

function inferImageMood(weather: WeatherState[]): WeatherState {
  return weather[0] ?? "warm";
}

export const rituals: Ritual[] = MASTER_RITUAL_REGISTRY.map((entry, index) => {
  const weather = parseWeather(entry.weatherTags);
  return {
    id: entry.id,
    title: entry.title,
    subtitle: entry.subtitle || entry.primaryNeed,
    category: parseCategory(entry.theme),
    weather,
    durationMinutes: parseDurationMinutes(entry.duration),
    intensity: parseIntensity(entry.intimacyLevel),
    tier: FREE_DAILY_IDS.has(entry.id) || index < 1 ? "free-daily" : "premium",
    imageMood: inferImageMood(weather),
    intro: entry.description || "A practical ritual to reconnect with intention.",
    steps: entry.ritualSteps.slice(0, 6),
    closing: "Close by sharing one appreciation and one next gentle step.",
    tags: [entry.theme, entry.primaryNeed].filter(Boolean),
  };
});

export const ritualById = new Map(rituals.map((item) => [item.id, item]));

export function getRitualById(id: string): Ritual | null {
  return ritualById.get(id) ?? null;
}

export function getDailyFreeRitual(date: Date, weatherA: WeatherState, weatherB: WeatherState): Ritual {
  const daySeed = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}-${weatherA}-${weatherB}`;
  const hash = Array.from(daySeed).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 7);
  const pool = rituals.filter((r) => r.tier === "free-daily" && (r.weather.includes(weatherA) || r.weather.includes(weatherB)));
  const source = pool.length ? pool : rituals.filter((r) => r.tier === "free-daily");
  return source[hash % source.length] ?? rituals[0];
}

export function getPremiumRituals(filters?: {
  weather?: WeatherState | "all";
  duration?: 3 | 5 | 8 | 12 | 20 | "all";
  intensity?: "gentle" | "medium" | "deep" | "all";
  category?: RitualCategory | "all";
  query?: string;
}): Ritual[] {
  return rituals.filter((item) => {
    if (filters?.weather && filters.weather !== "all" && !item.weather.includes(filters.weather)) return false;
    if (filters?.duration && filters.duration !== "all" && item.durationMinutes !== filters.duration) return false;
    if (filters?.intensity && filters.intensity !== "all" && item.intensity !== filters.intensity) return false;
    if (filters?.category && filters.category !== "all" && item.category !== filters.category) return false;
    if (filters?.query) {
      const q = filters.query.toLowerCase().trim();
      const hay = `${item.title} ${item.subtitle} ${item.tags.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
