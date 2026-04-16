import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const slides = [
  {
    id: "welcome",
    eyebrow: "SACRED PATH FOR COUPLES",
    headline: "Where two paths\nbecome one.",
    body: "Ancient Tantric and Taoist wisdom, translated into a daily practice between two people.",
    sub: "Presence · Desire · Sacred Connection",
  },
  {
    id: "wisdom",
    eyebrow: "THOUSANDS OF YEARS OF WISDOM",
    headline: "The great teachers\nawaited your arrival.",
    body: "David Deida, Diana Richardson, Osho — their teachings, woven into rituals you can practice tonight.",
    sub: "Tantra · Taoism · Karezza · Polarity",
  },
  {
    id: "together",
    eyebrow: "BUILT FOR TWO",
    headline: "Daily rituals.\nShared weather.\nOne sacred thread.",
    body: "Each morning the path surfaces what your relationship needs today. Each evening you close with intention.",
    sub: "Sync with your partner in real time",
  },
  {
    id: "begin",
    eyebrow: "YOU ARE READY",
    headline: "Begin the\nSacred Path.",
    body: "Create your couple space and invite your partner. The first ritual takes three minutes.",
    sub: null,
  },
];

const SWIPE_THRESHOLD = 40;

const Index = () => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const navigate = useNavigate();

  const goTo = (index: number) => {
    if (index >= 0 && index < slides.length) setCurrent(index);
  };

  const goNext = () => {
    if (current < slides.length - 1) setCurrent((c) => c + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const isLast = current === slides.length - 1;
  const slide = slides[current];

  return (
    <div
      className="relative flex h-[100dvh] flex-col overflow-hidden bg-background select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2.5">
          <img src={shivaShaktiIcon} alt="Sacred Path" className="h-7 w-7 rounded-[8px] opacity-80" />
          <span className="font-heading text-sm font-medium text-foreground/60 tracking-wide">Sacred Path</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            to="/auth"
            className="text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Background image — large, centered, fading */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <img
          src={shivaShaktiIcon}
          alt=""
          className="h-[70vmax] w-[70vmax] max-h-[680px] max-w-[680px] object-contain opacity-[0.055] transition-opacity duration-700"
          style={{ filter: "blur(2px)" }}
        />
      </div>

      {/* Slide content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p
          key={`eyebrow-${slide.id}`}
          className="text-[10px] uppercase tracking-[0.28em] text-amber-400/60 animate-fade-in"
        >
          {slide.eyebrow}
        </p>

        <h1
          key={`headline-${slide.id}`}
          className="mt-5 font-display text-4xl leading-tight text-foreground sm:text-5xl animate-fade-in"
          style={{ whiteSpace: "pre-line" }}
        >
          {slide.headline}
        </h1>

        <p
          key={`body-${slide.id}`}
          className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground sm:max-w-sm animate-fade-in"
        >
          {slide.body}
        </p>

        {slide.sub && (
          <p
            key={`sub-${slide.id}`}
            className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground/40 animate-fade-in"
          >
            {slide.sub}
          </p>
        )}

        {/* Last slide CTA */}
        {isLast && (
          <div
            key="cta"
            className="mt-10 flex flex-col items-center gap-3 animate-fade-in"
          >
            <Link
              to="/connect"
              className="inline-flex h-12 items-center justify-center rounded-[14px] bg-amber-500 px-10 text-sm font-semibold text-amber-950 shadow-[0_0_40px_rgba(200,146,74,0.35)] transition-all hover:bg-amber-400 active:scale-95"
            >
              Begin Together
            </Link>
            <Link
              to="/auth"
              className="text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
            >
              Already have an account? Sign in
            </Link>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 flex flex-col items-center gap-5 pb-8">
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "h-2 w-6 bg-amber-400"
                  : "h-2 w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Next / skip */}
        {!isLast && (
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-11 items-center justify-center rounded-[13px] border border-border/40 bg-card/50 px-8 text-sm text-foreground/80 backdrop-blur-sm transition-all hover:bg-card/70 active:scale-95"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={() => navigate("/auth")}
              className="text-xs text-muted-foreground/40 transition-colors hover:text-muted-foreground/70"
            >
              Skip
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
