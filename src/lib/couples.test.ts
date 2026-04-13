import { describe, expect, it } from "vitest";

import { resolveCoupleStateForUser, type CoupleRow } from "@/lib/couples";

const row = (overrides: Partial<CoupleRow>): CoupleRow => ({
  id: overrides.id ?? "row-1",
  partner_a: overrides.partner_a ?? "user-a",
  partner_b: overrides.partner_b ?? null,
  couple_code: overrides.couple_code ?? "ABC123",
  created_at: overrides.created_at ?? "2026-04-13T10:00:00.000Z",
  updated_at: overrides.updated_at ?? "2026-04-13T10:00:00.000Z",
});

describe("resolveCoupleStateForUser", () => {
  it("prefers a connected couple over pending invites", () => {
    const state = resolveCoupleStateForUser(
      [
        row({ id: "pending", partner_a: "me", partner_b: null, couple_code: "PEND01" }),
        row({ id: "connected", partner_a: "me", partner_b: "partner", couple_code: "LIVE01" }),
      ],
      "me",
    );

    expect(state.connected).toBe(true);
    expect(state.activeCouple?.id).toBe("connected");
    expect(state.partnerId).toBe("partner");
    expect(state.pendingInvite?.id).toBe("pending");
  });

  it("selects the most recently updated connected row when duplicates exist", () => {
    const state = resolveCoupleStateForUser(
      [
        row({
          id: "older-connected",
          partner_a: "me",
          partner_b: "partner-1",
          updated_at: "2026-04-10T10:00:00.000Z",
        }),
        row({
          id: "newer-connected",
          partner_a: "partner-2",
          partner_b: "me",
          updated_at: "2026-04-13T12:00:00.000Z",
        }),
      ],
      "me",
    );

    expect(state.connected).toBe(true);
    expect(state.activeCouple?.id).toBe("newer-connected");
    expect(state.partnerId).toBe("partner-2");
  });

  it("returns pending state when no partner has joined yet", () => {
    const state = resolveCoupleStateForUser(
      [row({ id: "pending-only", partner_a: "me", partner_b: null })],
      "me",
    );

    expect(state.connected).toBe(false);
    expect(state.activeCouple?.id).toBe("pending-only");
    expect(state.pendingInvite?.id).toBe("pending-only");
    expect(state.partnerId).toBeNull();
  });
});
