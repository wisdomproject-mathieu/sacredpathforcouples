import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartHandshake, Menu, MessageCircleHeart, Sparkles, X } from "lucide-react";

import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { Button } from "@/components/ui/button";
import LotusIcon from "@/components/tantra-icons/LotusIcon";
import SacredGeometryIcon from "@/components/tantra-icons/SacredGeometryIcon";
import ChakraIcon from "@/components/tantra-icons/ChakraIcon";
import FlameIcon from "@/components/tantra-icons/FlameIcon";
import BreathIcon from "@/components/tantra-icons/BreathIcon";
import YinYangIcon from "@/components/tantra-icons/YinYangIcon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const scrollToHashTarget = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      target.scrollIntoView({ behavior: "auto", block: "start" });
    };

    const frame = window.requestAnimationFrame(scrollToHashTarget);
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToHashTarget);
    };
  }, []);

  const features = [
    { icon: YinYangIcon, title: "Your Couple Code", desc: "Create one shared code and connect your relationship in a private couple space." },
    { icon: FlameIcon, title: "Join Partner", desc: "Enter your partner code and activate your shared path in seconds." },
    { icon: LotusIcon, title: "Intimacy Weather", desc: "Name your emotional climate before touch to reduce friction and reconnect faster." },
    { icon: ChakraIcon, title: "The Unsaid", desc: "Write what is hard to say before it hardens into distance." },
    { icon: BreathIcon, title: "The Thread", desc: "Leave one gratitude line and keep tenderness alive day by day." },
    { icon: SacredGeometryIcon, title: "Sacred Wisdom Library", desc: "Ancient paths and modern guidance from teachers, authors, and practical rituals." },
  ];

  const teachers = [
    { name: "Osho", tradition: "Neo-Tantra" },
    { name: "David Deida", tradition: "Masculine-Feminine Polarity" },
    { name: "Mantak Chia", tradition: "Taoist Sexual Alchemy" },
    { name: "Diana Richardson", tradition: "Slow Love" },
    { name: "Barry Long", tradition: "Making Love" },
    { name: "Margot Anand", tradition: "SkyDancing Tantra" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/85 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={shivaShaktiIcon} alt="Sacred Path" className="h-8 w-8" />
            <span className="font-heading text-xl font-semibold text-foreground">Sacred Path</span>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/35 bg-card/45 text-foreground md:hidden"
            aria-label="Open menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <div className="hidden items-center gap-4 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground font-body">
              Features
            </a>
            <Link to="/connect" className="text-sm text-muted-foreground transition-colors hover:text-foreground font-body">
              Connect with Partner
            </Link>
            <Link to="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground font-body">
              {t("nav.pricing")}
            </Link>
            <LanguageSwitcher />
            <Link to="/auth">
              <Button variant="outline" size="sm" className="font-body">
                {t("nav.login")}
              </Button>
            </Link>
            <Link to="/connect">
              <Button size="sm" className="font-body">
                Connect with Partner
              </Button>
            </Link>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-border/35 bg-background px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <a
                href="#features"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-sm text-foreground"
              >
                Features
              </a>
              <Link
                to="/connect"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-primary/30 bg-primary/12 px-3 py-2 text-sm text-foreground"
              >
                Connect with Partner
              </Link>
              <Link
                to="/pricing"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-sm text-foreground"
              >
                {t("nav.pricing")}
              </Link>
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-sm text-foreground"
              >
                {t("nav.login")}
              </Link>
              <div className="rounded-xl border border-border/35 bg-card/45 px-3 py-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        ) : null}
      </nav>

      <section className="flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
        <img src={shivaShaktiIcon} alt="Shiva Shakti" className="mb-8 h-24 w-24 animate-float md:h-28 md:w-28" />
        <h1 className="font-heading text-4xl font-bold leading-tight md:text-7xl">
          <span className="gold-gradient">{t("landing.title_1")}</span>
          <br />
          <span className="text-foreground">{t("landing.title_2")}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground font-body">{t("landing.subtitle")}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to="/connect">
            <Button size="lg" className="font-body text-base px-8">
              Connect with Partner
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg" className="font-body text-base px-8">
              {t("landing.explore")}
            </Button>
          </a>
          <Link to="/auth">
            <Button variant="outline" size="lg" className="font-body text-base px-8">
              Continue without account
            </Button>
          </Link>
        </div>
      </section>

      <section id="features" className="scroll-mt-24 py-24 px-4">
        <div className="container">
          <h2 className="text-center font-heading text-4xl font-semibold text-foreground mb-4">Features</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-3xl mx-auto font-body">
            Sacred Path has two equal pillars: couple connection tools and sacred wisdom paths. Both are visible from first entry.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <f.icon className="text-primary mb-4" size={48} />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-card/50">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-[26px] border border-primary/20 bg-primary/10 p-6 md:p-8">
            <div className="inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 text-rose-300">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-foreground md:text-4xl">Connect with Partner</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
              Shared code, shared rituals, shared emotional state, difficult truth, and gratitude thread. This is core product flow, not an optional add-on.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/connect">
                <Button size="lg" className="font-body text-base px-8">
                  Connect with Partner
                </Button>
              </Link>
              <Link to="/app">
                <Button variant="outline" size="lg" className="font-body text-base px-8">
                  Enter App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container">
          <h2 className="text-center font-heading text-4xl font-semibold text-foreground mb-4">{t("landing.wisdom_lineage")}</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto font-body">{t("landing.wisdom_lineage_desc")}</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <div key={teacher.name} className="flex items-center gap-4 rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-heading text-xl font-bold">{teacher.name[0]}</div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{teacher.name}</h3>
                  <p className="text-sm text-muted-foreground font-body">{teacher.tradition}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 text-center">
        <div className="container max-w-2xl">
          <MessageCircleHeart className="text-primary mx-auto mb-6 h-16 w-16" />
          <h2 className="font-heading text-4xl font-semibold text-foreground mb-4">Start with partner connection, then deepen with wisdom</h2>
          <p className="text-muted-foreground mb-8 font-body">
            First reconnect together, then expand through paths, teachers, rituals, and daily guidance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/connect">
              <Button size="lg" className="font-body text-base px-10">
                Connect with Partner
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="font-body text-base px-10">
                {t("landing.start_trial")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12 px-4">
        <div className="container flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <img src={shivaShaktiIcon} alt="Sacred Path" className="h-6 w-6" />
            <span className="font-heading text-sm text-muted-foreground">Sacred Path for Couples</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground font-body">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              {t("landing.privacy")}
            </Link>
            <Link to="/pricing" className="hover:text-foreground transition-colors">
              {t("nav.pricing")}
            </Link>
            <Link to="/connect" className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-foreground transition-all hover:border-primary/45 hover:bg-primary/15">
              Connect with Partner
              <HeartHandshake className="h-4 w-4" />
            </Link>
            <Link to="/app" className="inline-flex items-center gap-2 rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-foreground transition-all hover:border-border/55 hover:bg-card/60">
              Enter App
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-xs text-muted-foreground font-body">&copy; 2026 Sacred Path. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
