import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import LotusIcon from "@/components/tantra-icons/LotusIcon";
import FlameIcon from "@/components/tantra-icons/FlameIcon";
import YinYangIcon from "@/components/tantra-icons/YinYangIcon";
import ChakraIcon from "@/components/tantra-icons/ChakraIcon";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const wisdoms = [
  "Setkání dvou duší je jako dotek dvou prvků: pokud dojde k reakci, oba se promění. — C.G. Jung",
  "Láska není o vlastnictví. Láska je o ocenění. — Osho",
  "To největší, co se kdy naučíš, je milovat a být milován. — David Deida",
  "Tantra říká: přijmi sebe takového, jaký jsi. Jsi velké tajemství. — Osho",
  "Skutečná intimita je odvaha být zranitelný před druhým. — Brené Brown",
  "Energie lásky je nejmocnější síla ve vesmíru. — Diana Richardson",
  "Dva lidé, kteří se setkají v přítomnosti, vytvoří portál do věčnosti. — Eckhart Tolle",
];

const threadQuestions = [
  "Co tě dnes na tvém partnerovi/partnerce nejvíce potěšilo?",
  "Kdy jsi se naposledy cítil/a skutečně viděn/a svým partnerem?",
  "Jaký společný zážitek z posledního týdne si nejvíce ceníš?",
  "Co bys chtěl/a, aby tvůj partner věděl o tvých pocitech právě teď?",
  "Který okamžik dneška byl pro vás dva nejintimnější?",
  "Jak můžeš dnes svému partnerovi ukázat vděčnost?",
  "Jaký sen byste chtěli splnit společně?",
];

const intimacyWeather = [
  { emoji: "🌧️", label: "Bouřkovo", description: "Napětí ve vzduchu" },
  { emoji: "⛅", label: "Oblačno", description: "Lehký odstup" },
  { emoji: "🌤️", label: "Polojasno", description: "Blízko, ale ticho" },
  { emoji: "☀️", label: "Jasno", description: "Harmonie a teplo" },
  { emoji: "🔥", label: "Žhavé", description: "Vášeň a spojení" },
];

const AppHome = () => {
  const { user } = useAuth();
  const today = new Date();
  const todayWisdom = wisdoms[today.getDay() % wisdoms.length];
  const todayThread = threadQuestions[today.getDay() % threadQuestions.length];
  const [selectedWeather, setSelectedWeather] = useState<number | null>(null);

  return (
    <div className="px-4 py-8 pb-24">
      <div className="w-full max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <img src={shivaShaktiIcon} alt="Sacred Path" className="mx-auto h-16 w-16 animate-float" />
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            Vítej, <span className="gold-gradient">milovaná duše</span>
          </h1>
        </div>

        {/* Daily Whisper */}
        <div className="rounded-xl border border-border bg-card p-6">
          <LotusIcon className="text-primary mx-auto mb-3" size={28} />
          <h3 className="font-heading text-xs uppercase tracking-widest text-primary mb-3 text-center">
            Denní šepot
          </h3>
          <p className="text-foreground font-body italic leading-relaxed text-sm text-center">
            „{todayWisdom}"
          </p>
        </div>

        {/* The Thread — Daily Question */}
        <div className="rounded-xl border border-border bg-card p-6">
          <YinYangIcon className="text-primary mx-auto mb-3" size={28} />
          <h3 className="font-heading text-xs uppercase tracking-widest text-primary mb-3 text-center">
            Nit dne
          </h3>
          <p className="text-foreground font-body leading-relaxed text-sm text-center mb-4">
            {todayThread}
          </p>
          <p className="text-xs text-muted-foreground text-center font-body">
            Položte si tuto otázku navzájem dnes večer ✨
          </p>
        </div>

        {/* Intimacy Weather */}
        <div className="rounded-xl border border-border bg-card p-6">
          <FlameIcon className="text-primary mx-auto mb-3" size={28} />
          <h3 className="font-heading text-xs uppercase tracking-widest text-primary mb-3 text-center">
            Počasí intimity
          </h3>
          <p className="text-xs text-muted-foreground text-center font-body mb-4">
            Jak se dnes cítíte ve vašem spojení?
          </p>
          <div className="flex justify-center gap-2">
            {intimacyWeather.map((w, i) => (
              <button
                key={i}
                onClick={() => setSelectedWeather(i)}
                className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-all ${
                  selectedWeather === i
                    ? "bg-primary/20 border border-primary/40 scale-110"
                    : "hover:bg-card border border-transparent"
                }`}
              >
                <span className="text-2xl">{w.emoji}</span>
                <span className="text-[10px] text-muted-foreground font-body">{w.label}</span>
              </button>
            ))}
          </div>
          {selectedWeather !== null && (
            <p className="text-xs text-primary text-center mt-3 font-body animate-fade-in">
              {intimacyWeather[selectedWeather].description}
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/app/connect">
            <Button variant="outline" className="w-full font-body h-auto py-4 flex-col gap-2">
              <ChakraIcon className="text-primary" size={24} />
              <span className="text-xs">Propojit partnera</span>
            </Button>
          </Link>
          <Link to="/app/reconnect">
            <Button variant="outline" className="w-full font-body h-auto py-4 flex-col gap-2">
              <LotusIcon className="text-primary" size={24} />
              <span className="text-xs">Rituály</span>
            </Button>
          </Link>
          <Link to="/app/teachings">
            <Button variant="outline" className="w-full font-body h-auto py-4 flex-col gap-2">
              <FlameIcon className="text-primary" size={24} />
              <span className="text-xs">Učení</span>
            </Button>
          </Link>
          <Link to="/app/reconnect">
            <Button variant="outline" className="w-full font-body h-auto py-4 flex-col gap-2">
              <YinYangIcon className="text-primary" size={24} />
              <span className="text-xs">Polarita</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppHome;
