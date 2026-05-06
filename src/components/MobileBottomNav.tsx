import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, Mic, Shield, Sparkles, Timer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const MobileBottomNav = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const items = [
    { to: "/app", icon: Home, label: t("nav.home") },
    { to: "/app/space", icon: Sparkles, label: t("nav.temple") },
    { to: "/app/tools", icon: Timer, label: t("nav.tools") },
    { to: "/app/repair", icon: Shield, label: t("nav.repair") },
    { to: "/app/paths", icon: BookOpen, label: t("nav.library") },
    { to: "/app/voice", icon: Mic, label: t("nav.voice") },
  ];

  const isActive = (to: string) =>
    to === "/app" ? location.pathname === "/app" : location.pathname.startsWith(to);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <ul className="mx-auto flex max-w-2xl items-stretch justify-between px-2 py-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          return (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                className={`flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "text-primary" : ""}`} />
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
