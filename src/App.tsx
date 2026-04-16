import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useSeoMetadata } from "@/lib/seo";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AppHome from "./pages/AppHome";
import Connect from "./pages/Connect";
import ConnectLanding from "./pages/ConnectLanding";
import Reconnect from "./pages/Reconnect";
import Rituals from "./pages/Rituals";
import Paths from "./pages/Paths";
import Authors from "./pages/Authors";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import TempleEntry from "./pages/TempleEntry";
import PartnerSpace from "./pages/PartnerSpace";
import ShareWisdom from "./pages/ShareWisdom";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RouteSeoDefaults = () => {
  const location = useLocation();

  const fallbackSeo = useMemo(() => {
    if (location.pathname === "/") {
      return {
        title: "Sacred Path for Couples",
        description:
          "Ancient wisdom for modern love. Sacred Path helps couples deepen intimacy through guided paths, reconnect tools, and practical rituals.",
        path: "/",
        surface: "marketing" as const,
        noIndex: false,
      };
    }

    if (location.pathname === "/pricing") {
      return {
        title: "Pricing",
        description: "Compare Sacred Path plans and unlock deeper guidance for lasting relational intimacy.",
        path: "/pricing",
        surface: "marketing" as const,
        noIndex: false,
      };
    }

    if (location.pathname === "/privacy") {
      return {
        title: "Privacy",
        description: "Read how Sacred Path for Couples handles data, consent, and privacy for relationship support.",
        path: "/privacy",
        surface: "marketing" as const,
        noIndex: false,
      };
    }

    if (location.pathname === "/auth") {
      return {
        title: "Login",
        description: "Access your Sacred Path account and continue your relationship journey.",
        path: "/auth",
        surface: "marketing" as const,
        noIndex: false,
      };
    }

    if (location.pathname === "/connect") {
      return {
        title: "Connect with Partner",
        description: "Create a shared code and activate your couple experience in Sacred Path for Couples.",
        path: "/connect",
        surface: "marketing" as const,
        noIndex: false,
      };
    }

    if (location.pathname.startsWith("/app/paths") || location.pathname.startsWith("/app/authors") || location.pathname.startsWith("/app/reconnect")) {
      return {
        title: "Sacred Path Library",
        description: "Ancient wisdom for modern love.",
        path: location.pathname,
        surface: "app" as const,
        noIndex: true,
        disabled: true,
      };
    }

    if (location.pathname.startsWith("/app")) {
      return {
        title: "Sacred Path App",
        description: "Practice daily intimacy, reconnect with intention, and grow together in Sacred Path for Couples.",
        path: location.pathname,
        surface: "app" as const,
        noIndex: true,
      };
    }

    return {
      title: "Sacred Path for Couples",
      description: "Ancient wisdom for modern love.",
      path: location.pathname,
      surface: "marketing" as const,
      noIndex: false,
    };
  }, [location.pathname]);

  useSeoMetadata(fallbackSeo);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <RouteSeoDefaults />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/connect" element={<ConnectLanding />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AppHome />} />
                <Route path="connect" element={<Connect />} />
                <Route path="reconnect" element={<Reconnect />} />
                <Route path="rituals" element={<Rituals />} />
                <Route path="paths" element={<Paths />} />
                <Route path="authors" element={<Authors />} />
                <Route path="temple" element={<TempleEntry />} />
                <Route path="space" element={<PartnerSpace />} />
                <Route path="wisdom" element={<ShareWisdom />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
