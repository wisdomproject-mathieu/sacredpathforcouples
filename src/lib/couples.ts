import { Tables, type Database } from "@/integrations/supabase/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export type CoupleRow = Pick<
  Tables<"couples">,
  "id" | "partner_a" | "partner_b" | "couple_code" | "created_at" | "updated_at"
>;

export type ResolvedCoupleState = {
  activeCouple: CoupleRow | null;
  pendingInvite: CoupleRow | null;
  connected: boolean;
  partnerId: string | null;
};

export type FetchCoupleStateResult = ResolvedCoupleState & {
  rows: CoupleRow[];
};

const everConnectedStorageKey = (userId: string) => `sacred_path_ever_connected_${userId}`;
const connectedCoupleIdStorageKey = (userId: string) => `sacred_path_connected_couple_id_${userId}`;

const parseTime = (value?: string | null) => {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const sortByRecent = (a: CoupleRow, b: CoupleRow) => {
  const byUpdated = parseTime(b.updated_at) - parseTime(a.updated_at);
  if (byUpdated !== 0) return byUpdated;
  return parseTime(b.created_at) - parseTime(a.created_at);
};

const getPartnerIdForUser = (row: CoupleRow, userId: string) => {
  if (row.partner_a === userId) return row.partner_b;
  if (row.partner_b === userId) return row.partner_a;
  return null;
};

const isConnectedForUser = (row: CoupleRow, userId: string) => {
  const partnerId = getPartnerIdForUser(row, userId);
  return Boolean(partnerId && partnerId !== userId);
};

export const resolveCoupleStateForUser = (rows: CoupleRow[], userId: string): ResolvedCoupleState => {
  const ownRows = rows
    .filter((row) => row.partner_a === userId || row.partner_b === userId)
    .sort(sortByRecent);

  const connectedRows = ownRows.filter((row) => isConnectedForUser(row, userId));
  const pendingInvite = ownRows.find((row) => row.partner_a === userId && !row.partner_b) ?? null;
  const activeCouple = connectedRows[0] ?? pendingInvite ?? ownRows[0] ?? null;
  const partnerId = activeCouple ? getPartnerIdForUser(activeCouple, userId) : null;
  const connected = Boolean(activeCouple && partnerId && partnerId !== userId);

  return {
    activeCouple,
    pendingInvite,
    connected,
    partnerId: connected ? partnerId : null,
  };
};

const uniqueById = (rows: CoupleRow[]) => {
  const seen = new Set<string>();
  const unique: CoupleRow[] = [];
  for (const row of rows) {
    if (seen.has(row.id)) continue;
    seen.add(row.id);
    unique.push(row);
  }
  return unique;
};

export const fetchCoupleStateForUser = async (
  client: SupabaseClient<Database>,
  userId: string,
): Promise<FetchCoupleStateResult> => {
  if (readForceDisconnected(userId)) {
    // Still fetch pending invite so invite code generation works
    const { data: pendingRows } = await client
      .from("couples")
      .select("id, partner_a, partner_b, couple_code, created_at, updated_at")
      .eq("partner_a", userId)
      .is("partner_b", null)
      .not("couple_code", "like", "DEAD_%")
      .order("updated_at", { ascending: false });

    const pendingInvite = pendingRows?.[0] ?? null;

    return {
      connected: false,
      activeCouple: null,
      pendingInvite,
      rows: pendingInvite ? [pendingInvite] : [],
      partnerId: null,
    };
  }

  const [asPartnerAResult, asPartnerBResult] = await Promise.all([
    client
      .from("couples")
      .select("id, partner_a, partner_b, couple_code, created_at, updated_at")
      .eq("partner_a", userId)
      .not("couple_code", "like", "DEAD_%")
      .order("updated_at", { ascending: false }),
    client
      .from("couples")
      .select("id, partner_a, partner_b, couple_code, created_at, updated_at")
      .eq("partner_b", userId)
      .not("couple_code", "like", "DEAD_%")
      .order("updated_at", { ascending: false }),
  ]);

  const mergedRows = uniqueById([
    ...(asPartnerAResult.data ?? []),
    ...(asPartnerBResult.data ?? []),
  ]);
  const state = resolveCoupleStateForUser(mergedRows, userId);

  return {
    ...state,
    rows: mergedRows,
  };
};

export const readEverConnected = (userId: string) => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(everConnectedStorageKey(userId)) === "1";
};

export const markEverConnected = (userId: string) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(everConnectedStorageKey(userId), "1");
};

export const readConnectedCoupleId = (userId: string) => {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(connectedCoupleIdStorageKey(userId));
  return value?.trim() ? value : null;
};

export const storeConnectedCoupleId = (userId: string, coupleId: string) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(connectedCoupleIdStorageKey(userId), coupleId);
};

export const markForceDisconnected = (userId: string): void => {
  try {
    localStorage.setItem(`sacred_path_force_disconnected_${userId}`, "true");
  } catch {}
};

export const clearForceDisconnected = (userId: string): void => {
  try {
    localStorage.removeItem(`sacred_path_force_disconnected_${userId}`);
  } catch {}
};

export const readForceDisconnected = (userId: string): boolean => {
  try {
    return localStorage.getItem(`sacred_path_force_disconnected_${userId}`) === "true";
  } catch {
    return false;
  }
};
