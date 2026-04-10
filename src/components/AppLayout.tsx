import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useLocation } from "react-router-dom";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { LogOut, Home, Users, Heart, BookOpen } from "lucide-react";

const navItems = [
  { to: "/app", icon: Home, label: "Home" },
  { to: "/app/connect", icon: Users, label: "Connect" },
  { to: "/app/reconnect", icon: Heart, label: "Reconnect" },
  { to: "/app/teachings", icon: BookOpen, label: "Teachings" },
];

const AppLayout = () => {
  const { signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
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
            <Button variant="ghost" size="icon" onClick={signOut} className="ml-2">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-14">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
