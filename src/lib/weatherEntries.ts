export type WeatherEntryLike = {
  id?: string | null;
  created_at?: string | null;
  user_id: string;
  state: string;
};

const toTimestamp = (value?: string | null): number => {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const compareWeatherEntryRecency = <T extends WeatherEntryLike>(left: T, right: T): number => {
  const byCreatedAt = toTimestamp(right.created_at) - toTimestamp(left.created_at);
  if (byCreatedAt !== 0) return byCreatedAt;

  const leftId = left.id ?? "";
  const rightId = right.id ?? "";
  if (leftId === rightId) return 0;
  return rightId.localeCompare(leftId);
};

export const sortWeatherEntriesByRecency = <T extends WeatherEntryLike>(entries: readonly T[]): T[] =>
  [...entries].sort(compareWeatherEntryRecency);

export const pickLatestWeatherForCouple = <T extends WeatherEntryLike>(
  entries: readonly T[],
  currentUserId: string,
  partnerUserId?: string | null,
): { myEntry: T | null; partnerEntry: T | null } => {
  const sorted = sortWeatherEntriesByRecency(entries);
  const latestByUser = new Map<string, T>();

  for (const entry of sorted) {
    if (!latestByUser.has(entry.user_id)) {
      latestByUser.set(entry.user_id, entry);
    }
  }

  const myEntry = latestByUser.get(currentUserId) ?? null;
  const partnerEntry = partnerUserId
    ? (latestByUser.get(partnerUserId) ?? null)
    : (sorted.find((entry) => entry.user_id !== currentUserId) ?? null);

  return { myEntry, partnerEntry };
};

export const getLocalDayRange = (baseDate: Date = new Date()) => {
  const dayStart = new Date(baseDate);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);
  return {
    startIso: dayStart.toISOString(),
    endIso: dayEnd.toISOString(),
  };
};
