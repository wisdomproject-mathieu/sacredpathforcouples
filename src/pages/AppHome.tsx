import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SacredPathBrand from "@/components/SacredPathBrand";
import { Button } from "@/components/ui/button";
import { getDailyFreeRitual, getRitualById, type WeatherState } from "@/data/ritualLibrary";
import { getWeatherRitualOutcome } from "@/lib/mainstreamWeather";

const WEATHER: Array<{ key: WeatherState; label: string; subtitle: string; tones: string }> = [
  { key: "sunny", label: "Sunny", subtitle: "Clear and connected", tones: "from-amber-300 to-yellow-500" },
  { key: "warm", label: "Warm", subtitle: "Tender and close", tones: "from-rose-300 to-orange-400" },
  { key: "electric", label: "Electric", subtitle: "Spark and chemistry", tones: "from-violet-400 to-blue-500" },
  { key: "foggy", label: "Foggy", subtitle: "Unclear and distant", tones: "from-slate-300 to-violet-300" },
  { key: "frozen", label: "Frozen", subtitle: "Numb and shut down", tones: "from-cyan-300 to-blue-400" },
  { key: "stormy", label: "Stormy", subtitle: "Charged and tense", tones: "from-slate-500 to-slate-700" },
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
    <div className="space-y-3">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {WEATHER.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={`rounded-2xl border p-3 text-left transition ${
              value === item.key
                ? "border-primary bg-primary/20 shadow-md shadow-primary/20"
                : "border-border bg-card/70 hover:bg-card"
            }`}
          >
            <div className={`h-1.5 rounded-full bg-gradient-to-r ${item.tones} mb-2`} />
            <p className="font-semibold">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.subtitle}</p>
          </button>
        ))}
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
    <div className="px-4 py-8 pb-24">
      <div className="container max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <SacredPathBrand className="w-full max-w-[420px]" />
          <div className="flex-1 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
              Understand the mood between you in seconds.
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Choose your intimacy weather, receive one practice for today, and reconnect without pressure.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6 rounded-3xl border border-border bg-card/70 p-5 md:p-6">
            <WeatherPicker title="My weather" value={myWeather} onChange={setMyWeather} />
            <WeatherPicker title="Partner weather" value={partnerWeather} onChange={setPartnerWeather} />
          </div>

          <div className="space-y-4 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card/90 to-card/90 p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">
              {myWeather} + {partnerWeather}
            </p>
            <h2 className="font-display text-3xl text-foreground">{outcome.title}</h2>
            <p className="text-muted-foreground">{outcome.subtitle}</p>

            <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-primary/80">Today&apos;s path</p>
              <h3 className="mt-2 text-xl font-semibold">{primary?.title ?? daily.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{primary?.subtitle ?? daily.subtitle}</p>
              <ol className="mt-3 space-y-2">
                {stepPreview.map((step, index) => (
                  <li key={index} className="text-sm text-foreground/90">
                    <span className="text-primary font-semibold mr-2">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/app/tonight-paths">
                <Button>Start today&apos;s path</Button>
              </Link>
              <Link to="/app/connect">
                <Button variant="secondary">Invite my partner</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5">
          <p className="text-sm text-foreground">
            Unlock the full intimacy library for both of you - $29/year. One subscription. Two partners. 300+ rituals, Sacred Voice, Oracle prompts, and your shared journey.
          </p>
          <Link to="/pricing" className="inline-block mt-3">
            <Button>Unlock for both of us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
