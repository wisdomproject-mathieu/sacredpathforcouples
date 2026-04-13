import type { WeatherCardData } from "@/components/space/journey/SharedWeatherCard";

type Props = {
  title: string;
  yourLabel: string;
  belovedLabel: string;
  waitingLabel: string;
  statusLabel: string;
  latestMatchLabel: string;
  latestMatchTitle?: string;
  yourWeather: WeatherCardData | null;
  belovedWeather: WeatherCardData | null;
  onOpen?: () => void;
};

const CompactSharedWeatherRow = ({
  title,
  yourLabel,
  belovedLabel,
  waitingLabel,
  statusLabel,
  latestMatchLabel,
  latestMatchTitle,
  yourWeather,
  belovedWeather,
  onOpen,
}: Props) => (
  <section
    className={`rounded-[22px] border border-border/30 bg-card/45 p-4 ${
      onOpen ? "cursor-pointer transition-all hover:border-primary/20 hover:bg-card/55" : ""
    }`}
    onClick={onOpen}
    role={onOpen ? "button" : undefined}
    tabIndex={onOpen ? 0 : undefined}
    onKeyDown={onOpen ? (event) => (event.key === "Enter" || event.key === " " ? onOpen() : undefined) : undefined}
  >
    <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{title}</p>
    <div className="mt-3 grid gap-2 md:grid-cols-2">
      <div className="rounded-xl border border-border/30 bg-background/45 p-3">
        <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{yourLabel}</p>
        <p className="mt-1 text-sm text-foreground/90">
          {yourWeather ? `${yourWeather.label} ${yourWeather.emoji}` : waitingLabel}
        </p>
      </div>
      <div className="rounded-xl border border-border/30 bg-background/45 p-3">
        <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{belovedLabel}</p>
        <p className="mt-1 text-sm text-foreground/90">
          {belovedWeather ? `${belovedWeather.label} ${belovedWeather.emoji}` : waitingLabel}
        </p>
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-primary/90">
        {statusLabel}
      </span>
      <span className="rounded-full border border-border/35 bg-background/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-foreground/90">
        {latestMatchLabel}: {latestMatchTitle ?? waitingLabel}
      </span>
    </div>
  </section>
);

export default CompactSharedWeatherRow;
