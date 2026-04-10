import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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

  const features = [
    { icon: LotusIcon, title: t("feat.intimacy_weather"), desc: t("feat.intimacy_weather_desc") },
    { icon: FlameIcon, title: t("feat.the_thread"), desc: t("feat.the_thread_desc") },
    { icon: BreathIcon, title: t("feat.daily_whisper"), desc: t("feat.daily_whisper_desc") },
    { icon: ChakraIcon, title: t("feat.reconnect_rituals"), desc: t("feat.reconnect_rituals_desc") },
    { icon: SacredGeometryIcon, title: t("feat.sacred_teachings"), desc: t("feat.sacred_teachings_desc") },
    { icon: YinYangIcon, title: t("feat.partner_connect"), desc: t("feat.partner_connect_desc") },
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
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={shivaShaktiIcon} alt="Sacred Path" className="h-8 w-8" />
            <span className="font-heading text-xl font-semibold text-foreground">Sacred Path</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
              {t("nav.pricing")}
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="sm" className="font-body">{t("nav.login")}</Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="font-body">{t("nav.start_free")}</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
        <img src={shivaShaktiIcon} alt="Shiva Shakti" className="mb-8 h-28 w-28 animate-float" />
        <h1 className="font-heading text-5xl font-bold leading-tight md:text-7xl">
          <span className="gold-gradient">{t("landing.title_1")}</span>
          <br />
          <span className="text-foreground">{t("landing.title_2")}</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground font-body">{t("landing.subtitle")}</p>
        <div className="mt-10 flex gap-4">
          <Link to="/auth">
            <Button size="lg" className="font-body text-base px-8">{t("landing.begin_journey")}</Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg" className="font-body text-base px-8">{t("landing.explore")}</Button>
          </a>
        </div>
      </section>

      <section id="features" className="py-24 px-4">
        <div className="container">
          <h2 className="text-center font-heading text-4xl font-semibold text-foreground mb-4">{t("landing.sacred_tools")}</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto font-body">{t("landing.sacred_tools_desc")}</p>
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
          <h2 className="text-center font-heading text-4xl font-semibold text-foreground mb-4">{t("landing.wisdom_lineage")}</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto font-body">{t("landing.wisdom_lineage_desc")}</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teachers.map((tc) => (
              <div key={tc.name} className="flex items-center gap-4 rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-heading text-xl font-bold">{tc.name[0]}</div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{tc.name}</h3>
                  <p className="text-sm text-muted-foreground font-body">{tc.tradition}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 text-center">
        <div className="container max-w-2xl">
          <LotusIcon className="text-primary mx-auto mb-6" size={64} />
          <h2 className="font-heading text-4xl font-semibold text-foreground mb-4">{t("landing.ready_title")}</h2>
          <p className="text-muted-foreground mb-8 font-body">{t("landing.ready_desc")}</p>
          <Link to="/auth">
            <Button size="lg" className="font-body text-base px-10">{t("landing.start_trial")}</Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-12 px-4">
        <div className="container flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <img src={shivaShaktiIcon} alt="Sacred Path" className="h-6 w-6" />
            <span className="font-heading text-sm text-muted-foreground">Sacred Path for Couples</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground font-body">
            <Link to="/privacy" className="hover:text-foreground transition-colors">{t("landing.privacy")}</Link>
            <Link to="/pricing" className="hover:text-foreground transition-colors">{t("nav.pricing")}</Link>
          </div>
          <p className="text-xs text-muted-foreground font-body">&copy; 2025 Sacred Path. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
