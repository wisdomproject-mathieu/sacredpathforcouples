import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const quotes = [
  { authorKey: "Osho", bookKey: "home.q0_book", quoteKey: "home.q0", tagKey: "Tantra" },
  { authorKey: "Mantak Chia", bookKey: "home.q1_book", quoteKey: "home.q1", tagKey: "Tao" },
  { authorKey: "David Deida", bookKey: "home.q2_book", quoteKey: "home.q2", tagKey: "Deida" },
  { authorKey: "Diana Richardson", bookKey: "home.q3_book", quoteKey: "home.q3", tagKey: "Richardson" },
  { authorKey: "Vijnanabhairava Tantra", bookKey: "", quoteKey: "home.q4", tagKey: "Tantra" },
  { authorKey: "Lao Tzu", bookKey: "home.q5_book", quoteKey: "home.q5", tagKey: "Tao" },
  { authorKey: "David Deida", bookKey: "home.q6_book", quoteKey: "home.q6", tagKey: "Deida" },
  { authorKey: "Diana Richardson", bookKey: "home.q7_book", quoteKey: "home.q7", tagKey: "Richardson" },
];

const practices = [
  { titleKey: "home.prac0_title", descKey: "home.prac0_desc", tag: "Deida" },
  { titleKey: "home.prac1_title", descKey: "home.prac1_desc", tag: "Tantra" },
  { titleKey: "home.prac2_title", descKey: "home.prac2_desc", tag: "Richardson" },
  { titleKey: "home.prac3_title", descKey: "home.prac3_desc", tag: "Tao" },
  { titleKey: "home.prac4_title", descKey: "home.prac4_desc", tag: "Tantra" },
  { titleKey: "home.prac5_title", descKey: "home.prac5_desc", tag: "Deida" },
  { titleKey: "home.prac6_title", descKey: "home.prac6_desc", tag: "Richardson" },
];

const AppHome = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const today = new Date();
  const dayIndex = today.getDay();
  const [quoteIndex, setQuoteIndex] = useState(0);

  const practice = practices[dayIndex % practices.length];

  const prevQuote = () => setQuoteIndex((quoteIndex - 1 + quotes.length) % quotes.length);
  const nextQuote = () => setQuoteIndex((quoteIndex + 1) % quotes.length);

  return (
    <div className="px-4 py-8 pb-24">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body">{t("home.sanctuary")}</p>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            {t("home.our_sacred_path")}
          </h1>
          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-lg mx-auto">
            {t("home.hero_desc")}
          </p>
          <Link to="/app/rituals">
            <Button className="font-body mt-2 px-8 py-5 text-sm gap-2">
              ▶ {t("home.right_now")}
            </Button>
          </Link>
        </div>

        {/* Quote Carousel */}
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-body mb-3">
            {quotes[quoteIndex].authorKey} — {quotes[quoteIndex].bookKey ? t(quotes[quoteIndex].bookKey) : ""}
          </p>
          <p className="text-foreground font-heading italic text-lg leading-relaxed mb-3">
            &ldquo;{t(quotes[quoteIndex].quoteKey)}&rdquo;
          </p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">
            {quotes[quoteIndex].tagKey}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button onClick={prevQuote} className="p-2 rounded-full border border-border hover:border-primary/40 transition-colors">
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <span className="text-xs text-muted-foreground font-body">{quoteIndex + 1} / {quotes.length}</span>
          <button onClick={nextQuote} className="p-2 rounded-full border border-border hover:border-primary/40 transition-colors">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Today's Practice — self-contained, no link */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-body">{t("home.todays_practice")}</p>
            <span className="text-[10px] text-muted-foreground font-body bg-secondary px-2 py-0.5 rounded-full">{practice.tag}</span>
          </div>
          <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{t(practice.titleKey)}</h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">{t(practice.descKey)}</p>
        </div>
      </div>
    </div>
  );
};

export default AppHome;
