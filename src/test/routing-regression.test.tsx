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
    upsert: vi.fn(async () => ({ error: null })),
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

  it("renders homepage entry with auth links", async () => {
    renderAt("/");

    expect(await screen.findByText(/sacred path for couples/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /sign in/i }).length).toBeGreaterThan(0);
  });

  it("switches homepage language toggle", async () => {
    renderAt("/");

    const toggle = screen.getByRole("button", { name: /en/i });
    fireEvent.click(toggle);
    expect(await screen.findByRole("button", { name: /fr/i })).toBeInTheDocument();
  });

  it("redirects /connect to auth", async () => {
    renderAt("/connect");

    expect(await screen.findByPlaceholderText(/email/i)).toBeInTheDocument();
  });

  it("redirects /app to auth for unauthenticated users", async () => {
    renderAt("/app");

    expect(await screen.findByPlaceholderText(/email/i)).toBeInTheDocument();
  });

  it("redirects /app/connect to auth for unauthenticated users", async () => {
    renderAt("/app/connect");

    expect(await screen.findByPlaceholderText(/email/i)).toBeInTheDocument();
  });
});
