import { useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BookOpen, Heart, Home, LogOut, MessageCircle } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";

const AppLayout = () => {
  const { signOut } = useAuth();
  const location = useLocation();

  const navItems = useMemo(
    () => [
      { to: "/app", icon: Home, label: "Home", iconClass: "text-amber-300" },
      { to: "/app/paths", icon: BookOpen, label: "Library", iconClass: "text-violet-300" },
      { to: "/app/space", icon: MessageCircle, label: "Temple", iconClass: "text-fuchsia-300" },
      { to: "/app/reconnect", icon: Heart, label: "Reconnect", iconClass: "text-rose-300" },
    ],
    []
  );

  const isActive = (to: string) => {
    if (to === "/app") return location.pathname === "/app";
    return location.pathname.startsWith(to);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 md:px-6 lg:flex-row lg:gap-6 lg:py-6">
        <aside className="lg:w-[290px] lg:shrink-0">
          <div className="rounded-[28px] border border-border/30 bg-card/45 p-4 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.65)] backdrop-blur-md lg:sticky lg:top-6">
            <div className="rounded-[24px] border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-background p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                  <img src={shivaShaktiIcon} alt="Sacred Path" className="h-10 w-10 object-contain" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-primary/80">Sacred Path</p>
                  <h1 className="font-display text-xl text-foreground">for Couples</h1>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Temple for shared practice. Library for ancient wisdom. One living path for two.
              </p>
            </div>

            <nav className="mt-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`group flex items-center gap-3 rounded-2xl border px-3 py-3 transition-all ${
                      active
                        ? "border-primary/25 bg-primary/10"
                        : "border-transparent bg-transparent hover:border-border/30 hover:bg-background/45"
                    }`}
                  >
                    <div className={`rounded-xl border border-border/30 bg-card/45 p-2 ${item.iconClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="font-body text-sm text-foreground">{item.label}</div>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-border/30 bg-background/40 p-3">
              <LanguageSwitcher />
              <Button variant="ghost" size="icon" onClick={signOut} className="rounded-xl border border-border/30 bg-card/45 hover:bg-card/60">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 py-2 lg:py-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
