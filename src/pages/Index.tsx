import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import onboardingArt from "@/assets/onboarding/onboarding-icon.png";

const slides = [
  {
    id: "wisdom",
    eyebrow: "ANCIENT WISDOM",
    headline: "Thousands of years of sacred teaching - for the two of you.",
    body: "Tantra, Tao, and the world's most honest teachings, distilled into one gentle daily practice.",
    sub: "Simple · Beautiful · Real",
    cta: "Continue",
    image: onboardingArt,
  },
  {
    id: "daily-practice",
    eyebrow: "YOUR DAILY PRACTICE",
    headline: "One ritual a day.\nA relationship that deepens over time.",
    body: "Daily wisdom, intimacy weather, gratitude, and the unsaid - where two people reconnect.",
    sub: "Daily loop for two",
    cta: "Begin our path",
    image: onboardingArt,
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
  const handlePrimaryAction = () => {
    if (isLast) {
      navigate("/auth");
      return;
    }
    goNext();
  };

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
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-14">
        <div className="w-full max-w-[420px] rounded-[30px] border border-amber-400/20 bg-black/45 p-4 backdrop-blur-sm">
          <div className="relative overflow-hidden rounded-[24px] border border-amber-400/20 bg-black/60">
            <img src={slide.image} alt="" className="h-[44vh] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-x-4 bottom-4">
              <p
                key={`eyebrow-${slide.id}`}
                className="inline-flex rounded-full border border-amber-400/30 bg-black/65 px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-amber-300"
              >
                {slide.eyebrow}
              </p>
              <h1
                key={`headline-${slide.id}`}
                className="mt-3 font-display text-[30px] leading-tight text-amber-50 animate-fade-in"
                style={{ whiteSpace: "pre-line" }}
              >
                {slide.headline}
              </h1>
              <p
                key={`body-${slide.id}`}
                className="mt-2 text-sm leading-6 text-amber-50/80 animate-fade-in"
              >
                {slide.body}
              </p>
              {slide.sub && (
                <p
                  key={`sub-${slide.id}`}
                  className="mt-3 text-[11px] uppercase tracking-[0.2em] text-amber-200/55"
                >
                  {slide.sub}
                </p>
              )}
            </div>
          </div>
        </div>
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

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="inline-flex h-11 items-center justify-center rounded-[13px] bg-amber-500 px-8 text-sm font-semibold text-amber-950 transition-all hover:bg-amber-400 active:scale-95"
          >
            {slide.cta}
          </button>
          {!isLast && (
            <button
              type="button"
              onClick={() => navigate("/auth")}
              className="text-xs text-muted-foreground/45 transition-colors hover:text-muted-foreground/80"
            >
              Skip
            </button>
          )}
          {isLast && (
            <Link to="/auth" className="text-xs text-muted-foreground/55 transition-colors hover:text-muted-foreground/90">
              Already have an account? Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
