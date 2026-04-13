import { Tables } from "@/integrations/supabase/types";

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
