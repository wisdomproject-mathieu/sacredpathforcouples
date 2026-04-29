import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getDailyFreeRitual, getRitualById, type WeatherState } from "@/data/ritualLibrary";
import { getWeatherRitualOutcome } from "@/lib/mainstreamWeather";

const WEATHER: Array<{ key: WeatherState; label: string; emoji: string; tones: string }> = [
  { key: "sunny", label: "Sunny", emoji: "☀️", tones: "from-amber-300 to-yellow-500" },
  { key: "warm", label: "Warm", emoji: "🌅", tones: "from-rose-300 to-orange-400" },
  { key: "electric", label: "Electric", emoji: "⚡️", tones: "from-violet-400 to-blue-500" },
  { key: "foggy", label: "Foggy", emoji: "🌫️", tones: "from-slate-300 to-violet-300" },
  { key: "frozen", label: "Frozen", emoji: "❄️", tones: "from-cyan-300 to-blue-400" },
  { key: "stormy", label: "Stormy", emoji: "⛈️", tones: "from-slate-500 to-slate-700" },
];

function WeatherPicker({
  title,
  value,
  onChange,
}: {
  title: string;
  value: WeatherState;
  onChange: (value: WeatherState) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-base font-semibold text-foreground">{title}</p>
      <div className="grid grid-cols-3 gap-2">
        {WEATHER.map((item) => {
          const active = value === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChange(item.key)}
              className={`flex flex-col items-center gap-1 rounded-2xl border p-2.5 transition ${
                active
                  ? "border-primary bg-primary/15 shadow-sm shadow-primary/20"
                  : "border-border bg-card/70 hover:bg-card"
              }`}
            >
              <span className="text-xl leading-none">{item.emoji}</span>
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AppHome() {
  const [myWeather, setMyWeather] = useState<WeatherState>("warm");
  const [partnerWeather, setPartnerWeather] = useState<WeatherState>("sunny");

  const outcome = useMemo(() => getWeatherRitualOutcome(myWeather, partnerWeather), [myWeather, partnerWeather]);
  const primary = useMemo(() => getRitualById(outcome.primaryRitualId), [outcome.primaryRitualId]);
  const daily = useMemo(() => getDailyFreeRitual(new Date(), myWeather, partnerWeather), [myWeather, partnerWeather]);

  const stepPreview = (primary?.steps ?? daily.steps).slice(0, 3);

  return (
    <div className="px-1 pt-2 pb-6 md:px-4 md:py-8">
      <div className="container max-w-6xl space-y-6 px-0 md:space-y-8">
        {/* Hero — simple & confident */}
        <header className="space-y-3 text-center md:text-left">
          <h1 className="font-display text-[2rem] leading-tight font-semibold text-foreground md:text-5xl">
            How are you two feeling today?
          </h1>
          <p className="text-base text-muted-foreground md:text-lg max-w-2xl md:mx-0 mx-auto">
            Pick your moods and we&apos;ll suggest one practice to bring you closer — no pressure.
          </p>
        </header>

        {/* Mood pickers — one card */}
        <div className="space-y-5 rounded-3xl border border-border bg-card/70 p-4 md:p-6">
          <WeatherPicker title="You" value={myWeather} onChange={setMyWeather} />
          <WeatherPicker title="Your partner" value={partnerWeather} onChange={setPartnerWeather} />
        </div>

        {/* Result — bigger, clearer */}
        <div className="space-y-4 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card/90 to-card/90 p-5 md:p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">
            Today&apos;s suggestion
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-foreground leading-snug">
            {outcome.title}
          </h2>
          <p className="text-base text-muted-foreground">{outcome.subtitle}</p>

          <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
            <h3 className="text-lg md:text-xl font-semibold">{primary?.title ?? daily.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{primary?.subtitle ?? daily.subtitle}</p>
            <ol className="mt-3 space-y-2">
              {stepPreview.map((step, index) => (
                <li key={index} className="text-[15px] text-foreground/90">
                  <span className="text-primary font-semibold mr-2">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link to="/app/tonight-paths" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">Start this practice</Button>
            </Link>
            <Link to="/app/space" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">Open our space</Button>
            </Link>
          </div>
        </div>

        {/* Pricing nudge — desktop only, mobile keeps it light */}
        <div className="hidden md:block rounded-2xl border border-primary/30 bg-primary/10 p-5">
          <p className="text-sm text-foreground">
            Unlock the full library for both of you — $29/year. 300+ practices, voice guidance, and your shared journey.
          </p>
          <Link to="/pricing" className="inline-block mt-3">
            <Button>Unlock for both of us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
