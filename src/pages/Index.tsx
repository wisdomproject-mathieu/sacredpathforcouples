import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LotusIcon from "@/components/tantra-icons/LotusIcon";
import SacredGeometryIcon from "@/components/tantra-icons/SacredGeometryIcon";
import ChakraIcon from "@/components/tantra-icons/ChakraIcon";
import FlameIcon from "@/components/tantra-icons/FlameIcon";
import BreathIcon from "@/components/tantra-icons/BreathIcon";
import YinYangIcon from "@/components/tantra-icons/YinYangIcon";

const features = [
  { icon: LotusIcon, title: "Intimacy Weather", desc: "Track emotional closeness with your partner daily" },
  { icon: FlameIcon, title: "The Thread", desc: "A sacred question each day to deepen your bond" },
  { icon: BreathIcon, title: "Daily Whisper", desc: "Wisdom from ancient teachings, delivered at dawn" },
  { icon: ChakraIcon, title: "Reconnect Rituals", desc: "Guided practices for physical and spiritual union" },
  { icon: SacredGeometryIcon, title: "Sacred Teachings", desc: "Library of tantric wisdom from master teachers" },
  { icon: YinYangIcon, title: "Partner Connect", desc: "Link with your beloved for a shared sacred journey" },
];

const teachers = [
  { name: "Osho", tradition: "Neo-Tantra" },
  { name: "David Deida", tradition: "Masculine-Feminine Polarity" },
  { name: "Mantak Chia", tradition: "Taoist Sexual Alchemy" },
  { name: "Diana Richardson", tradition: "Slow Love" },
  { name: "Barry Long", tradition: "Making Love" },
  { name: "Margot Anand", tradition: "SkyDancing Tantra" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={shivaShaktiIcon} alt="Sacred Path" className="h-8 w-8" />
            <span className="font-heading text-xl font-semibold text-foreground">Sacred Path</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
              Pricing
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="sm" className="font-body">Log In</Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="font-body">Start Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
        <img src={shivaShaktiIcon} alt="Shiva Shakti" className="mb-8 h-28 w-28 animate-float" />
        <h1 className="font-heading text-5xl font-bold leading-tight md:text-7xl">
          <span className="gold-gradient">Sacred Path</span>
          <br />
          <span className="text-foreground">for Couples</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground font-body">
          Ancient tantric wisdom meets modern love. Deepen your connection through daily practices, 
          sacred teachings, and intimate rituals shared with your beloved.
        </p>
        <div className="mt-10 flex gap-4">
          <Link to="/auth">
            <Button size="lg" className="font-body text-base px-8">
              Begin Your Journey
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg" className="font-body text-base px-8">
              Explore
            </Button>
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="container">
          <h2 className="text-center font-heading text-4xl font-semibold text-foreground mb-4">
            The Sacred Tools
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto font-body">
            Everything you need to nurture the divine connection between you and your partner
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <f.icon className="text-primary mb-4" size={48} />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="py-24 px-4 bg-card/50">
        <div className="container">
          <h2 className="text-center font-heading text-4xl font-semibold text-foreground mb-4">
            Wisdom Lineage
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto font-body">
            Teachings curated from the world's most profound tantric masters
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teachers.map((t) => (
              <div
                key={t.name}
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-heading text-xl font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{t.name}</h3>
                  <p className="text-sm text-muted-foreground font-body">{t.tradition}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="container max-w-2xl">
          <LotusIcon className="text-primary mx-auto mb-6" size={64} />
          <h2 className="font-heading text-4xl font-semibold text-foreground mb-4">
            Ready to Walk the Sacred Path?
          </h2>
          <p className="text-muted-foreground mb-8 font-body">
            Join thousands of couples deepening their love through ancient wisdom.
            Start your 7-day free trial today.
          </p>
          <Link to="/auth">
            <Button size="lg" className="font-body text-base px-10">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <img src={shivaShaktiIcon} alt="Sacred Path" className="h-6 w-6" />
            <span className="font-heading text-sm text-muted-foreground">Sacred Path for Couples</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground font-body">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </div>
          <p className="text-xs text-muted-foreground font-body">© 2025 Sacred Path. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
