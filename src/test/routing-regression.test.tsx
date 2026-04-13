import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";

vi.mock("@/integrations/supabase/client", () => {
  const chain = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    or: vi.fn().mockReturnThis(),
    not: vi.fn().mockReturnThis(),
    is: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    insert: vi.fn(async () => ({ error: null })),
    maybeSingle: vi.fn(async () => ({ data: null, error: null })),
  };

  return {
    supabase: {
      auth: {
        onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
        getSession: vi.fn(async () => ({ data: { session: null } })),
        signOut: vi.fn(async () => ({ error: null })),
      },
      from: vi.fn(() => chain),
    },
  };
});

const renderAt = (path: string) => {
  window.history.pushState({}, "Test route", path);
  return render(<App />);
};

describe("routing regressions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.setItem("sacred-path-lang", "en");
  });

  it("renders homepage with connect CTA and features anchor", async () => {
    renderAt("/");

    const connectButtons = await screen.findAllByRole("button", { name: /connect with partner/i });
    expect(connectButtons.length).toBeGreaterThan(0);
    expect(document.getElementById("features")).toBeInTheDocument();
    const featuresLink = screen.getAllByRole("link", { name: /features/i })[0];
    expect(featuresLink).toHaveAttribute("href", "#features");
  });

  it("shows connect entry inside mobile menu", async () => {
    renderAt("/");

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getAllByRole("link", { name: /connect with partner/i }).length).toBeGreaterThan(0);
  });

  it("switches landing content language, not only nav labels", async () => {
    renderAt("/");

    fireEvent.click(screen.getByTitle(/switch to fr/i));
    expect((await screen.findAllByText(/chemin sacré/i)).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/se connecter au partenaire/i).length).toBeGreaterThan(0);
  });

  it("renders public connect route with core partner modules", async () => {
    renderAt("/connect");

    expect(await screen.findByRole("heading", { name: /connect with partner/i })).toBeInTheDocument();
    expect(screen.getAllByText(/your couple code/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/join partner/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/intimacy weather/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/the unsaid/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/the thread/i).length).toBeGreaterThan(0);
  });

  it("renders /app fallback shell with visible heading and primary CTA", async () => {
    renderAt("/app");

    expect(await screen.findByRole("heading", { name: /the app is live and ready/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /connect with partner/i })).toBeInTheDocument();
  });

  it("renders /app/connect without blank page for unauthenticated users", async () => {
    renderAt("/app/connect");

    expect(await screen.findByRole("heading", { name: /the app is live and ready/i })).toBeInTheDocument();
  });
});
