export type JourneyNotificationSection =
  | "shared_weather"
  | "combined_match"
  | "new_from_beloved"
  | "temple_board"
  | "timeline";

type SeenMap = Partial<Record<JourneyNotificationSection, number>>;

const storageKey = (userId: string, coupleId: string) => `sacred_path_journey_seen_${userId}_${coupleId}`;

export const readJourneySeenMap = (userId: string, coupleId: string): SeenMap => {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(storageKey(userId, coupleId));
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as SeenMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

export const markJourneySectionRead = (
  userId: string,
  coupleId: string,
  section: JourneyNotificationSection,
  at?: number,
) => {
  if (typeof window === "undefined") return;
  const current = readJourneySeenMap(userId, coupleId);
  current[section] = at ?? Date.now();
  window.localStorage.setItem(storageKey(userId, coupleId), JSON.stringify(current));
};

export const toTimestamp = (iso?: string | null) => {
  if (!iso) return 0;
  const parsed = Date.parse(iso);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const unreadCountSince = (timestamps: number[], seenAt: number) =>
  timestamps.reduce((count, value) => (value > seenAt ? count + 1 : count), 0);
