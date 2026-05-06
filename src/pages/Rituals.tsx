import { useMemo, useState } from "react";
import SacredPathBrand from "@/components/SacredPathBrand";
import { Button } from "@/components/ui/button";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { getDailyFreeRitual, getPremiumRituals, type RitualCategory, type WeatherState } from "@/data/ritualLibrary";

type DurationFilter = 3 | 5 | 8 | 12 | 20 | "all";
type IntensityFilter = "gentle" | "medium" | "deep" | "all";

export default function Rituals() {
  const { hasPremiumAccess } = usePremiumAccess();
  const [weather, setWeather] = useState<WeatherState | "all">("all");
  const [duration, setDuration] = useState<DurationFilter>("all");
  const [intensity, setIntensity] = useState<IntensityFilter>("all");
  const [category, setCategory] = useState<RitualCategory | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const freeToday = useMemo(() => getDailyFreeRitual(new Date(), "warm", "sunny"), []);
  const rituals = useMemo(
    () => getPremiumRituals({ weather, duration, intensity, category }),
    [weather, duration, intensity, category],
  );
  const selected = useMemo(() => rituals.find((item) => item.id === selectedId) ?? freeToday, [rituals, selectedId, freeToday]);

  return (
    <div className="px-4 py-8 pb-24">
      <div className="container max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <SacredPathBrand className="w-full max-w-[420px]" />
          <div className="flex-1 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-semibold">A complete intimacy library for the two of you.</h1>
            <p className="mt-2 text-muted-foreground">
              One daily practice is free, and every premium practice is crafted to keep your connection growing with fresh rituals added regularly.
            </p>
          </div>
        </div>

        <section className="rounded-3xl border border-primary/30 bg-primary/10 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Free today</p>
          <h2 className="text-2xl font-semibold mt-2">{freeToday.title}</h2>
          <p className="text-muted-foreground">{freeToday.subtitle}</p>
          <p className="mt-2 text-sm">{freeToday.intro}</p>
        </section>

        <section className="grid gap-3 md:grid-cols-4 rounded-2xl border border-border bg-card/70 p-4">
          <select className="rounded-xl bg-background border border-border p-2" value={weather} onChange={(e) => setWeather(e.target.value as WeatherState | "all")}>
            <option value="all">All weather</option>
            <option value="sunny">Sunny</option>
            <option value="warm">Warm</option>
            <option value="electric">Electric</option>
            <option value="foggy">Foggy</option>
            <option value="frozen">Frozen</option>
            <option value="stormy">Stormy</option>
          </select>
          <select className="rounded-xl bg-background border border-border p-2" value={duration} onChange={(e) => setDuration((e.target.value === "all" ? "all" : Number(e.target.value)) as DurationFilter)}>
            <option value="all">All duration</option>
            <option value="3">3 min</option>
            <option value="5">5 min</option>
            <option value="8">8 min</option>
            <option value="12">12 min</option>
            <option value="20">20 min</option>
          </select>
          <select className="rounded-xl bg-background border border-border p-2" value={intensity} onChange={(e) => setIntensity(e.target.value as IntensityFilter)}>
            <option value="all">All intensity</option>
            <option value="gentle">Gentle</option>
            <option value="medium">Medium</option>
            <option value="deep">Deep</option>
          </select>
          <select className="rounded-xl bg-background border border-border p-2" value={category} onChange={(e) => setCategory(e.target.value as RitualCategory | "all")}>
            <option value="all">All goals</option>
            <option value="connection">Connection</option>
            <option value="repair">Repair</option>
            <option value="desire">Desire</option>
            <option value="touch">Touch</option>
            <option value="conversation">Conversation</option>
          </select>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {rituals.map((ritual) => {
              const locked = !hasPremiumAccess && ritual.id !== freeToday.id && ritual.tier !== "free-daily";
              return (
                <button
                  key={ritual.id}
                  type="button"
                  onClick={() => setSelectedId(ritual.id)}
                  className={`relative rounded-3xl border text-left p-4 transition ${
                    selected?.id === ritual.id ? "border-primary bg-primary/10" : "border-border bg-card/70 hover:bg-card"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{ritual.imageMood}</p>
                  <h3 className="mt-2 text-lg font-semibold">{ritual.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{ritual.subtitle}</p>
                  <p className="text-xs mt-2 text-muted-foreground">{ritual.durationMinutes} min · {ritual.category}</p>
                  {locked && (
                    <div className="absolute inset-0 rounded-3xl bg-background/75 grid place-items-center">
                      <span className="text-sm font-semibold text-foreground">Premium</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <aside className="rounded-3xl border border-border bg-card p-5">
            <h3 className="text-2xl font-semibold">{selected.title}</h3>
            <p className="text-muted-foreground mt-1">{selected.subtitle}</p>
            <p className="text-sm mt-3">{selected.intro}</p>
            <ol className="space-y-2 mt-4">
              {selected.steps.map((step, index) => (
                <li key={index} className="text-sm">
                  <span className="font-semibold text-primary mr-2">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="text-sm mt-4 text-muted-foreground">{selected.closing}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="secondary">Play Sacred Voice</Button>
              <Button variant="secondary">Save to Journey</Button>
              <Button>Send to Partner</Button>
            </div>
          </aside>
        </section>

      </div>
    </div>
  );
}
