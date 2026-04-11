import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useLocation } from "react-router-dom";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { LogOut, Home, Users, Compass, Feather, Heart, MessageCircle } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
<Link to="/app/settings" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
  {t("nav.settings")}
</Link>
const AppLayout = () => {
  const { signOut } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { to: "/app", icon: Home, label: t("nav.home") },
    { to: "/app/connect", icon: Users, label: t("nav.connect") },
    { to: "/app/paths", icon: Compass, label: t("nav.paths") },
    { to: "/app/authors", icon: Feather, label: t("nav.authors") },
    { to: "/app/reconnect", icon: Heart, label: t("nav.reconnect") },
    { to: "/app/space", icon: MessageCircle, label: t("nav.space") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/90 backdrop-blur-lg">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={shivaShaktiIcon} alt="Sacred Path" className="h-7 w-7" />
            <span className="font-heading text-lg font-semibold text-foreground">Sacred Path</span>
          </div>
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                <Button
                  variant={location.pathname === item.to ? "secondary" : "ghost"}
                  size="sm"
                  className="font-body text-xs gap-1.5"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              </Link>
            ))}
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" onClick={signOut} className="ml-1">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>
      <main className="pt-14">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
