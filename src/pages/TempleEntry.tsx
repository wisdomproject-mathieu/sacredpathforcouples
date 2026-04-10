import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";

const slides = [
  {
    labelKey: "temple.slide1_label",
    titleKey: "temple.slide1_title",
    descKey: "temple.slide1_desc",
    btnKey: "temple.slide1_btn",
    gradient: "from-primary/20 via-transparent to-transparent",
  },
  {
    labelKey: "temple.slide2_label",
    titleKey: "temple.slide2_title",
    descKey: "temple.slide2_desc",
    btnKey: "temple.slide2_btn",
    gradient: "from-transparent via-primary/10 to-transparent",
  },
  {
    labelKey: "temple.slide3_label",
    titleKey: "temple.slide3_title",
    descKey: "temple.slide3_desc",
    btnKey: "temple.slide3_btn",
    gradient: "from-transparent via-transparent to-primary/20",
  },
];

const TempleEntry = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else navigate("/app/space");
  };

  const slide = slides[current];

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div className={`absolute inset-0 bg-gradient-to-b ${slide.gradient} opacity-60 transition-all duration-1000`} />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg animate-fade-in" key={current}>
        {/* Sacred icon */}
        <div className="relative mb-10">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-150" />
          <img src={shivaShaktiIcon} alt="" className="relative h-28 w-28 animate-float" />
        </div>

        {/* Label */}
        <span className="text-[10px] font-body uppercase tracking-[0.3em] text-primary mb-4 border border-primary/30 px-4 py-1.5 rounded-full">
          {t(slide.labelKey)}
        </span>

        {/* Title */}
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-5">
          {t(slide.titleKey)}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-10 max-w-sm">
          {t(slide.descKey)}
        </p>

        {/* Button */}
        <Button onClick={next} size="lg" className="font-body px-10 py-6 text-base gap-2 sacred-glow">
          {t(slide.btnKey)} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-12 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-primary" : "w-1.5 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TempleEntry;
