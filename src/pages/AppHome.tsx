import { useState } from "react";
import { Link } from "react-router-dom";
import SacredPathBrand from "@/components/SacredPathBrand";
import { Button } from "@/components/ui/button";
import { type WeatherState } from "@/data/ritualLibrary";

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

  return (
    <div className="px-4 py-6 md:py-8">
      <div className="container max-w-5xl space-y-6 md:space-y-8">
        {/* Brand — Mathieu + Edita */}
        <div className="flex flex-col items-center gap-3 text-center">
          <SacredPathBrand className="w-full max-w-[360px]" />
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            How are you two feeling today?
          </h1>
        </div>

        {/* Weather selection */}
        <div className="space-y-6 rounded-3xl border border-border bg-card/70 p-5 md:p-6">
          <WeatherPicker title="My weather" value={myWeather} onChange={setMyWeather} />
          <WeatherPicker title="Partner weather" value={partnerWeather} onChange={setPartnerWeather} />

          <Link to={`/app/tonight-paths?me=${myWeather}&partner=${partnerWeather}`} className="block">
            <Button className="w-full md:w-auto">Open Tonight Path</Button>
          </Link>
        </div>

        {/* Gratitude card */}
        <Link
          to="/app/space?tab=messages&kind=gratitude"
          className="block rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card/90 to-card/90 p-5 md:p-6 transition hover:border-primary/50"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Gratitude whisper</p>
          <h2 className="mt-2 font-display text-2xl md:text-3xl text-foreground">
            Send one small thank-you
          </h2>
          <p className="mt-2 text-muted-foreground">
            One sentence of gratitude keeps love warm between the great moments.
          </p>
        </Link>
      </div>
    </div>
  );
}
