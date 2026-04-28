import { useMemo, useState } from "react";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import {
  BookHeart,
  Check,
  Copy,
  Eye,
  Flame,
  Hand,
  Heart,
  HeartHandshake,
  MessageCircle,
  MoveHorizontal,
  Orbit,
  PauseCircle,
  Sparkles,
  Volume2,
  Wind,
} from "lucide-react";

import type { Language } from "@/contexts/LanguageContext";
import type { WeatherMatchResult } from "@/lib/weatherMatch";
import {
  resolveTonightPathSixCards,
  type SelectedDailyMainCard,
  type WeatherEngineDebugState,
} from "@/lib/weatherEngine";
import type { TonightPathStatusViewModel } from "@/lib/tonightPathStatus";
import type { WeatherCardData } from "@/components/space/journey/SharedWeatherCard";
import RitualTimerButton from "@/components/ritual/RitualTimerButton";

type WeatherStateMode = "none" | "mine_only" | "beloved_only" | "both";

type Props = {
  lang: Language;
  weatherMatch: WeatherMatchResult | null;
  weatherStateMode: WeatherStateMode;
  myWeather: WeatherCardData | null;
  belovedWeather: WeatherCardData | null;
  myName?: string | null;
  belovedName?: string | null;
  tonightPathStatus: TonightPathStatusViewModel;
  coupleId?: string | null;
  selectedDailyMainCard: SelectedDailyMainCard | null;
  alternateCards: SelectedDailyMainCard[];
  weatherEngineDebug: WeatherEngineDebugState;
};

type ThemeKey =
  | "breath"
  | "gaze"
  | "touch"
  | "massage"
  | "embrace"
  | "movement"
  | "stillness"
  | "sound"
  | "union"
  | "emotional_clearing"
  | "energy";

const themeVisuals: Record<ThemeKey, { icon: typeof Heart; toneClass: string }> = {
  breath: {
    icon: Wind,
    toneClass: "border-cyan-300/30 bg-gradient-to-br from-cyan-500/12 via-card/70 to-card/35",
  },
  gaze: {
    icon: Eye,
    toneClass: "border-indigo-300/30 bg-gradient-to-br from-indigo-500/12 via-card/70 to-card/35",
  },
  touch: {
    icon: HeartHandshake,
    toneClass: "border-rose-300/30 bg-gradient-to-br from-rose-500/12 via-card/70 to-card/35",
  },
  massage: {
    icon: Hand,
    toneClass: "border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-card/70 to-card/35",
  },
  embrace: {
    icon: Heart,
    toneClass: "border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-card/70 to-card/35",
  },
  movement: {
    icon: MoveHorizontal,
    toneClass: "border-orange-300/30 bg-gradient-to-br from-orange-500/12 via-card/70 to-card/35",
  },
  stillness: {
    icon: PauseCircle,
    toneClass: "border-slate-300/30 bg-gradient-to-br from-slate-500/12 via-card/70 to-card/35",
  },
  sound: {
    icon: Volume2,
    toneClass: "border-pink-300/30 bg-gradient-to-br from-pink-500/12 via-card/70 to-card/35",
  },
  union: {
    icon: Flame,
    toneClass: "border-red-300/30 bg-gradient-to-br from-red-500/12 via-card/70 to-card/35",
  },
  emotional_clearing: {
    icon: MessageCircle,
    toneClass: "border-emerald-300/30 bg-gradient-to-br from-emerald-500/12 via-card/70 to-card/35",
  },
  energy: {
    icon: Orbit,
    toneClass: "border-violet-300/30 bg-gradient-to-br from-violet-500/12 via-card/70 to-card/35",
  },
};

const fallbackVisual = {
  icon: Sparkles,
  toneClass: "border-primary/30 bg-gradient-to-br from-primary/12 via-card/70 to-card/35",
};

const getThemeVisual = (theme: string) => themeVisuals[theme as ThemeKey] ?? fallbackVisual;

const copyByLang: Record<
  Language,
  {
    eyebrow: string;
    title: string;
    intro: (pair: string) => string;
    waitingTitle: string;
    waitingBody: string;
    mainTag: string;
    stepsLabel: string;
    copy: string;
    copied: string;
    weatherCombo: string;
    forCombo: (pair: string) => string;
  }
> = {
  en: {
    eyebrow: "Tonight Path",
    title: "Your weather-tailored rituals for tonight",
    intro: (pair) =>
      `One main ritual and supporting practices, hand-picked for your ${pair} pairing. Pick the one that fits the moment.`,
    waitingTitle: "Tonight Path is preparing",
    waitingBody: "When both partners share their weather, this page builds a complete ritual flow tailored to tonight's pairing.",
    mainTag: "Main ritual",
    stepsLabel: "What to do",
    copy: "Copy practice",
    copied: "Copied",
    weatherCombo: "Weather combination",
    forCombo: (pair) => `Selected for: ${pair}`,
  },
  fr: {
    eyebrow: "Chemin de ce soir",
    title: "Vos rituels du soir adaptés à votre météo",
    intro: (pair) =>
      `Un rituel principal et des pratiques de soutien, choisis pour votre combinaison ${pair}. Prenez celui qui correspond à l'instant.`,
    waitingTitle: "Le chemin de ce soir se prépare",
    waitingBody: "Quand les deux partenaires partagent leur météo, cette page construit un flow rituel complet adapté à ce soir.",
    mainTag: "Rituel principal",
    stepsLabel: "Que faire",
    copy: "Copier la pratique",
    copied: "Copié",
    weatherCombo: "Combinaison météo",
    forCombo: (pair) => `Sélectionné pour : ${pair}`,
  },
  cs: {
    eyebrow: "Dnešní cesta",
    title: "Vaše dnešní rituály na míru počasí",
    intro: (pair) =>
      `Jeden hlavní rituál a doprovodné praxe vybrané pro vaši kombinaci ${pair}. Vyberte ten, který sedne k okamžiku.`,
    waitingTitle: "Dnešní cesta se připravuje",
    waitingBody: "Jakmile oba partneři nasdílí své počasí, tato stránka vytvoří kompletní rituální flow přesně pro dnešní kombinaci.",
    mainTag: "Hlavní rituál",
    stepsLabel: "Co dělat",
    copy: "Kopírovat praxi",
    copied: "Zkopírováno",
    weatherCombo: "Kombinace počasí",
    forCombo: (pair) => `Vybráno pro: ${pair}`,
  },
};

const formatPair = (a: string | null | undefined, b: string | null | undefined) => {
  const cap = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
  if (!a && !b) return "—";
  if (a && b) return `${cap(a)} + ${cap(b)}`;
  return cap(String(a || b));
};

const buildShareText = (card: SelectedDailyMainCard) =>
  `Let's try ${card.title} tonight. ${card.subtitle || card.description || ""}`.trim();

const TonightPathExperience = ({
  lang,
  weatherMatch,
  myWeather,
  belovedWeather,
  myName,
  belovedName,
  tonightPathStatus,
  coupleId,
  selectedDailyMainCard,
  alternateCards,
  weatherEngineDebug,
}: Props) => {
  const copy = copyByLang[lang];
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const cards = useMemo(
    () =>
      resolveTonightPathSixCards(
        {
          selectedDailyMainCard,
          alternates: alternateCards,
          normalizedKey: weatherEngineDebug.normalizedKey,
        },
        6,
      ),
    [selectedDailyMainCard, alternateCards, weatherEngineDebug.normalizedKey],
  );

  // Auto-expand the main card by default when ready
  const mainId = cards[0]?.id ?? null;
  const effectiveExpandedId = expandedId ?? mainId;

  const pairLabel = useMemo(
    () => formatPair(myWeather?.label ?? weatherEngineDebug.partnerAWeather, belovedWeather?.label ?? weatherEngineDebug.partnerBWeather),
    [belovedWeather?.label, myWeather?.label, weatherEngineDebug.partnerAWeather, weatherEngineDebug.partnerBWeather],
  );

  const ready = tonightPathStatus.isTonightPathReady && cards.length > 0;

  const archetypeHeadline = weatherEngineDebug.archetype
    ? weatherEngineDebug.archetype.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : weatherMatch?.archetype.title ?? null;

  const handleCopy = async (card: SelectedDailyMainCard) => {
    try {
      await navigator.clipboard.writeText(buildShareText(card));
      setCopiedId(card.id);
      window.setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // ignore
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-primary/20 bg-gradient-to-br from-primary/12 via-background/94 to-background/88 p-4 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.42)] md:p-6">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img src={shivaShaktiIcon} alt="" className="h-full w-full object-cover opacity-[0.10]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/65 to-background/85" />
      </div>

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.24em] text-primary/80">{copy.eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
          {ready ? archetypeHeadline ?? copy.title : copy.waitingTitle}
        </h2>
        <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">
          {ready ? copy.intro(pairLabel) : copy.waitingBody}
        </p>

        {ready ? (
          <div className="mt-4 grid items-stretch gap-3 sm:grid-cols-2">
            <div className="h-full rounded-[22px] border border-border/30 bg-card/55 p-4 shadow-[0_16px_45px_-34px_rgba(0,0,0,0.7)]">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">{myName ?? "You"}</p>
              <p className="mt-2 font-display text-2xl text-foreground">
                {myWeather ? `${myWeather.label} ${myWeather.emoji}` : copy.waitingTitle}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{myWeather?.hint ?? copy.waitingBody}</p>
            </div>

            <div className="h-full rounded-[22px] border border-border/30 bg-card/55 p-4 shadow-[0_16px_45px_-34px_rgba(0,0,0,0.7)]">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">{belovedName ?? "Partner"}</p>
              <p className="mt-2 font-display text-2xl text-foreground">
                {belovedWeather ? `${belovedWeather.label} ${belovedWeather.emoji}` : copy.waitingTitle}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{belovedWeather?.hint ?? copy.waitingBody}</p>
            </div>
          </div>
        ) : null}

        {ready ? (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs text-foreground/90">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="uppercase tracking-[0.14em] text-primary/85">{copy.weatherCombo}:</span>
            <span>{pairLabel}</span>
          </div>
        ) : null}

        {ready ? (
          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {cards.map((card, index) => {
              const visual = getThemeVisual(card.theme);
              const Icon = visual.icon;
              const isMain = index === 0;
              const isExpanded = effectiveExpandedId === card.id;
              const stepsToShow = isExpanded ? card.ritualSteps : card.ritualSteps.slice(0, 2);
              return (
                <article
                  key={card.id}
                  className={`h-full rounded-2xl border p-4 transition-all ${visual.toneClass} ${
                    isMain ? "ring-1 ring-amber-300/40 shadow-[0_14px_35px_-24px_rgba(255,173,70,0.5)]" : ""
                  } ${isExpanded ? "lg:col-span-2" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleExpand(card.id)}
                    className="block w-full text-left"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/30 bg-background/55">
                          <Icon className="h-5 w-5 text-foreground/85" />
                        </span>
                        <div>
                          <h3 className="font-display text-2xl text-foreground">{card.title}</h3>
                          {card.subtitle ? (
                            <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                              {card.subtitle}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      {isMain ? (
                        <span className="rounded-full border border-amber-300/35 bg-amber-500/14 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">
                          {copy.mainTag}
                        </span>
                      ) : null}
                    </div>

                    {card.description ? (
                      <p className={`mt-3 text-[0.98rem] leading-7 text-foreground/90 ${isExpanded ? "" : "line-clamp-3"}`}>
                        {card.description}
                      </p>
                    ) : null}

                    {card.ritualSteps.length ? (
                      <div className="mt-3">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{copy.stepsLabel}</p>
                        <ol className="mt-2 space-y-1.5 text-[0.98rem] leading-7 text-foreground/90">
                          {stepsToShow.map((step, stepIndex) => (
                            <li key={`${card.id}-step-${stepIndex}`}>
                              {stepIndex + 1}. {step}
                            </li>
                          ))}
                        </ol>
                        {!isExpanded && card.ritualSteps.length > 2 ? (
                          <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-primary/80">
                            +{card.ritualSteps.length - 2} more · tap to open
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </button>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <RitualTimerButton
                      ritualTitle={card.title}
                      ritualSource="tonight-path"
                      coupleId={coupleId ?? null}
                      suggestedDuration={card.duration}
                      variant="subtle"
                      label={`Timer · ${card.duration}`}
                    />
                    <span className="break-words rounded-lg border border-border/30 bg-background/55 px-2 py-1 text-[11px] text-foreground/85">
                      {card.intimacyLevel}
                    </span>
                    <span className="break-words rounded-lg border border-border/30 bg-background/55 px-2 py-1 text-[11px] text-foreground/85">
                      {card.primaryNeed}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{copy.forCombo(pairLabel)}</p>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        void handleCopy(card);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border/35 bg-card/50 px-3 py-1.5 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/65"
                    >
                      {copiedId === card.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-300" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      {copiedId === card.id ? copy.copied : copy.copy}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-border/30 bg-card/45 p-5 text-sm text-foreground/85">
            {tonightPathStatus.waitingBody || copy.waitingBody}
          </div>
        )}

        {import.meta.env.DEV ? (
          <div className="mt-4 rounded-xl border border-cyan-300/25 bg-cyan-500/10 p-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-cyan-200/85">Tonight Path Debug</p>
            <pre className="mt-2 overflow-auto text-xs leading-5 text-cyan-100/90">
{JSON.stringify(
  {
    partnerAWeather: weatherEngineDebug.partnerAWeather,
    partnerBWeather: weatherEngineDebug.partnerBWeather,
    normalizedKey: weatherEngineDebug.normalizedKey,
    archetype: weatherEngineDebug.archetype,
    selectedMainCard: weatherEngineDebug.selectedMainCardId,
    alternates: weatherEngineDebug.alternateIds,
    recentHistory: weatherEngineDebug.recentHistory,
    renderedCards: cards.map((card) => card.id),
  },
  null,
  2,
)}
            </pre>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default TonightPathExperience;
