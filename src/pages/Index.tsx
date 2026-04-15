import { Link } from "react-router-dom";

import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/85 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={shivaShaktiIcon} alt="Sacred Path" className="h-8 w-8" />
            <span className="font-heading text-xl font-semibold text-foreground">{t("landing.brand")}</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/auth">
              <Button variant="outline" size="sm" className="font-body">
                {t("nav.login")}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
        <img
          src={shivaShaktiIcon}
          alt="Sacred Path for Couples"
          className="w-28 h-28 rounded-[28px] shadow-[0_0_60px_rgba(200,146,74,0.3)]"
        />

        <h1 className="mt-8 leading-tight">
          <span className="block font-display text-5xl md:text-6xl text-amber-300/90">Sacred Path</span>
          <span className="block font-display text-5xl md:text-6xl text-white font-light">for Couples</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-md text-center leading-8">
          Where ancient Tantric and Taoist wisdom becomes<br className="hidden md:block" />
          a daily practice between two people.<br className="hidden md:block" />
          Presence. Desire. Sacred connection.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Link to="/connect">
            <Button size="lg" className="font-body text-base px-10">
              Begin Together
            </Button>
          </Link>
          <Link to="/app/paths">
            <Button variant="outline" size="lg" className="font-body text-base px-10">
              Explore the Library
            </Button>
          </Link>
          <Link to="/auth">
            <button type="button" className="mt-1 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Continue without account
            </button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground/50 text-center mt-6">
          Tantra · Taoism · David Deida · Diana Richardson · Osho
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <img src={shivaShaktiIcon} alt="Sacred Path" className="h-5 w-5" />
            <span className="font-heading text-sm text-muted-foreground">{t("landing.brand_full")}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground font-body">
            <Link to="/privacy" className="hover:text-foreground transition-colors">{t("landing.privacy")}</Link>
            <Link to="/pricing" className="hover:text-foreground transition-colors">{t("nav.pricing")}</Link>
          </div>
          <p className="text-xs text-muted-foreground font-body">&copy; 2026 Sacred Path. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
