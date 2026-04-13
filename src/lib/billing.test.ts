import { beforeEach, describe, expect, it, vi } from "vitest";

import { createCheckoutSession } from "@/lib/billing";

const fetchMock = vi.fn<typeof fetch>();

describe("billing api fallback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", fetchMock);
    delete (import.meta.env as Record<string, string | undefined>).VITE_BILLING_API_ORIGIN;
  });

  it("uses same-origin billing endpoint by default", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ url: "https://checkout.stripe.com/same-origin" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const checkoutUrl = await createCheckoutSession({
      plan: "monthly",
      userId: "user-1",
      accessToken: "token-1",
      email: "test@example.com",
    });

    expect(checkoutUrl).toBe("https://checkout.stripe.com/same-origin");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/create-checkout-session",
      expect.objectContaining({
        method: "POST",
      }),
    );
  });

  it("falls back to configured billing origin when same-origin returns html", async () => {
    (import.meta.env as Record<string, string | undefined>).VITE_BILLING_API_ORIGIN =
      "https://main--sacrespathforcouples.netlify.app/";

    fetchMock.mockResolvedValueOnce(
      new Response("<!DOCTYPE html><html><body>app shell</body></html>", {
        status: 200,
        headers: { "Content-Type": "text/html" },
      }),
    );
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ url: "https://checkout.stripe.com/fallback" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const checkoutUrl = await createCheckoutSession({
      plan: "yearly",
      userId: "user-2",
      accessToken: "token-2",
      email: "fallback@example.com",
    });

    expect(checkoutUrl).toBe("https://checkout.stripe.com/fallback");
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0]?.[0]).toBe("/api/create-checkout-session");
    expect(fetchMock.mock.calls[1]?.[0]).toBe(
      "https://main--sacrespathforcouples.netlify.app/api/create-checkout-session",
    );
  });

  it("surfaces non-retryable api errors", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ error: "User mismatch for checkout request." }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await expect(
      createCheckoutSession({
        plan: "founding",
        userId: "user-3",
        accessToken: "token-3",
      }),
    ).rejects.toThrow("User mismatch for checkout request.");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
