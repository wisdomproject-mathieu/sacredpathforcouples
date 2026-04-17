import { useMemo, useState } from "react";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { BookOpen, Check, ChevronDown, ChevronUp, Copy, Hand, Heart, Sparkles, Wind } from "lucide-react";

import type { Language } from "@/contexts/LanguageContext";
import type { WeatherMatchResult, RitualRecommendation } from "@/lib/weatherMatch";
import type { WeatherCardData } from "@/components/space/journey/SharedWeatherCard";

type WeatherStateMode = "none" | "mine_only" | "beloved_only" | "both";
type ThemeKey = "massage" | "breathing" | "touch" | "learnings";

type Props = {
  lang: Language;
  weatherMatch: WeatherMatchResult | null;
  weatherStateMode: WeatherStateMode;
  myWeather: WeatherCardData | null;
  belovedWeather: WeatherCardData | null;
  sharedStatusLabel: string;
};

const hashString = (value: string) =>
  Array.from(value).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 11);

const copyByLang: Record<Language, {
  eyebrow: string;
  title: string;
  waitingTitle: string;
  waitingBody: string;
  ritualLabel: string;
  stepsLabel: string;
  sendLabel: string;
  sendButton: string;
  sentButton: string;
  themesLabel: string;
  themesBody: string;
  guidanceLabel: string;
  respectLabel: string;
  positionsLabel: string;
  quoteLabel: string;
  yourWeather: string;
  belovedWeather: string;
  waitingWeather: string;
  themeTitles: Record<ThemeKey, string>;
  themeBodies: Record<ThemeKey, string>;
  themeEmpty: string;
  respectPrompts: string[];
  fallbackSteps: string[];
  fallbackPositions: string[];
  quotes: Array<{ author: string; quote: string }>;
}> = {
  en: {
    eyebrow: "Tonight Path",
    title: "A complete ritual for your shared weather",
    waitingTitle: "Your Tonight Path is preparing",
    waitingBody: "When both partners share weather, your full ritual sequence appears here with practical guidance.",
    ritualLabel: "Tonight ritual",
    stepsLabel: "Step-by-step",
    sendLabel: "Message to your beloved",
    sendButton: "Copy message",
    sentButton: "Copied",
    themesLabel: "Practice themes",
    themesBody: "All available practices are grouped so you can quickly choose what fits tonight.",
    guidanceLabel: "Guidance for your dynamic",
    respectLabel: "Respect and reconnect",
    positionsLabel: "Positions and touch cues",
    quoteLabel: "Quote of the night",
    yourWeather: "Your weather",
    belovedWeather: "Beloved weather",
    waitingWeather: "Waiting",
    themeTitles: {
      massage: "Massage",
      breathing: "Breathing",
      touch: "Touch",
      learnings: "Learnings",
    },
    themeBodies: {
      massage: "Slow body regulation and grounded warmth.",
      breathing: "Nervous-system co-regulation before intensity.",
      touch: "Safe closeness through gaze, contact, and pacing.",
      learnings: "Wisdom cues to keep tonight intentional.",
    },
    themeEmpty: "No direct practices in this theme yet for this match.",
    respectPrompts: [
      "Name one feeling before making a request.",
      "Mirror your partner's words before offering a next step.",
      "Choose slowness over performance whenever tension appears.",
    ],
    fallbackSteps: [
      "Sit face-to-face and sync your breathing for one minute.",
      "Share one feeling each in one sentence.",
      "Offer one intentional touch and ask for consent.",
    ],
    fallbackPositions: [
      "Seated face-to-face, knees touching.",
      "One hand on heart, one hand on belly.",
      "Side-by-side breath before moving forward.",
    ],
    quotes: [
      { author: "Diana Richardson", quote: "Slowness lets intimacy become truthful, not performative." },
      { author: "David Deida", quote: "Presence is the doorway where love and desire can meet." },
      { author: "Mantak Chia", quote: "Breath turns intensity into nourishment for both partners." },
      { author: "Osho", quote: "When awareness enters touch, silence itself becomes connection." },
    ],
  },
  fr: {
    eyebrow: "Chemin de ce soir",
    title: "Un rituel complet pour votre météo partagée",
    waitingTitle: "Votre chemin de ce soir se prépare",
    waitingBody: "Quand les deux partenaires partagent leur météo, la séquence complète apparaît ici avec des repères pratiques.",
    ritualLabel: "Rituel de ce soir",
    stepsLabel: "Étapes",
    sendLabel: "Message à votre partenaire",
    sendButton: "Copier le message",
    sentButton: "Copié",
    themesLabel: "Thèmes de pratique",
    themesBody: "Toutes les pratiques disponibles sont regroupées pour agir vite selon votre soirée.",
    guidanceLabel: "Guidance pour votre dynamique",
    respectLabel: "Respect et reconnexion",
    positionsLabel: "Positions et repères de toucher",
    quoteLabel: "Citation du soir",
    yourWeather: "Votre météo",
    belovedWeather: "Météo du partenaire",
    waitingWeather: "En attente",
    themeTitles: {
      massage: "Massage",
      breathing: "Respiration",
      touch: "Toucher",
      learnings: "Apprentissages",
    },
    themeBodies: {
      massage: "Régulation corporelle lente et chaleur ancrée.",
      breathing: "Co-régulation du système nerveux avant l'intensité.",
      touch: "Proximité sûre par le regard, le contact et le rythme.",
      learnings: "Repères de sagesse pour garder la soirée intentionnelle.",
    },
    themeEmpty: "Aucune pratique directe dans ce thème pour ce match.",
    respectPrompts: [
      "Nommez une émotion avant de formuler une demande.",
      "Reformulez les mots du partenaire avant de proposer la suite.",
      "Choisissez la lenteur plutôt que la performance dès qu'une tension apparaît.",
    ],
    fallbackSteps: [
      "Asseyez-vous face à face et synchronisez la respiration pendant une minute.",
      "Partagez une émotion chacun en une phrase.",
      "Offrez un toucher intentionnel en demandant le consentement.",
    ],
    fallbackPositions: [
      "Assis face à face, genoux en contact.",
      "Une main sur le cœur, une main sur le ventre.",
      "Respiration côte à côte avant d'aller plus loin.",
    ],
    quotes: [
      { author: "Diana Richardson", quote: "La lenteur permet une intimité vraie, sans performance." },
      { author: "David Deida", quote: "La présence est la porte où l'amour et le désir se rencontrent." },
      { author: "Mantak Chia", quote: "Le souffle transforme l'intensité en nourriture pour les deux." },
      { author: "Osho", quote: "Quand la conscience entre dans le toucher, le silence devient lien." },
    ],
  },
  cs: {
    eyebrow: "Dnešní cesta",
    title: "Kompletní rituál pro vaše sdílené počasí",
    waitingTitle: "Dnešní cesta se připravuje",
    waitingBody: "Jakmile oba partneři nasdílí počasí, objeví se zde plná rituální sekvence s praktickým vedením.",
    ritualLabel: "Dnešní rituál",
    stepsLabel: "Krok za krokem",
    sendLabel: "Zpráva partnerovi",
    sendButton: "Kopírovat zprávu",
    sentButton: "Zkopírováno",
    themesLabel: "Témata praxe",
    themesBody: "Všechny dostupné praxe jsou seskupené, abyste rychle zvolili, co dnes sedí.",
    guidanceLabel: "Vedení pro vaši dynamiku",
    respectLabel: "Respekt a znovupropojení",
    positionsLabel: "Pozice a dotekové podněty",
    quoteLabel: "Citát večera",
    yourWeather: "Vaše počasí",
    belovedWeather: "Počasí partnera",
    waitingWeather: "Čekání",
    themeTitles: {
      massage: "Masáž",
      breathing: "Dýchání",
      touch: "Dotek",
      learnings: "Učení",
    },
    themeBodies: {
      massage: "Pomalá tělesná regulace a ukotvené teplo.",
      breathing: "Koregulace nervového systému před intenzitou.",
      touch: "Bezpečná blízkost skrze pohled, kontakt a tempo.",
      learnings: "Moudré podněty pro záměrný večer.",
    },
    themeEmpty: "Pro tuto shodu zatím v tématu nejsou přímé praxe.",
    respectPrompts: [
      "Nejprve pojmenujte jednu emoci, až potom žádost.",
      "Než navrhnete další krok, zrcadlete partnerova slova.",
      "Když se objeví napětí, zvolte pomalost místo výkonu.",
    ],
    fallbackSteps: [
      "Sedněte si čelem k sobě a minutu slaďte dech.",
      "Každý sdílejte jednu emoci v jedné větě.",
      "Nabídněte jeden vědomý dotek a vyžádejte souhlas.",
    ],
    fallbackPositions: [
      "Sed čelem k sobě, kolena v kontaktu.",
      "Jedna ruka na srdci, druhá na břiše.",
      "Dýchání bok po boku před dalším krokem.",
    ],
    quotes: [
      { author: "Diana Richardson", quote: "Pomalost dává intimitě pravdivost, ne výkon." },
      { author: "David Deida", quote: "Přítomnost je brána, kde se potkávají láska a touha." },
      { author: "Mantak Chia", quote: "Dech mění intenzitu ve výživu pro oba partnery." },
      { author: "Osho", quote: "Když do doteku vstoupí vědomí, i ticho je propojení." },
    ],
  },
};

const classifyTheme = (practice: RitualRecommendation): ThemeKey => {
  const text = [
    practice.title,
    practice.subtitle,
    practice.description,
    practice.primaryNeed,
    practice.tonightEnergy,
    practice.whatToAvoid,
    ...practice.ritualSteps,
    ...practice.sourceConcepts,
  ]
    .join(" ")
    .toLowerCase();

  if (/(massage|bodywork|huile|masáž|pressure|press)/.test(text)) return "massage";
  if (/(breath|breathing|respir|souffle|dech|dých)/.test(text)) return "breathing";
  if (/(touch|gaze|hold|caress|kiss|dotek|toucher|regard)/.test(text)) return "touch";
  return "learnings";
};

const themeOrder: ThemeKey[] = ["massage", "breathing", "touch", "learnings"];

const themeIcon = {
  massage: Hand,
  breathing: Wind,
  touch: Heart,
  learnings: BookOpen,
} as const;

const TonightPathExperience = ({
  lang,
  weatherMatch,
  weatherStateMode,
  myWeather,
  belovedWeather,
  sharedStatusLabel,
}: Props) => {
  const copy = copyByLang[lang];
  const [expandedTheme, setExpandedTheme] = useState<ThemeKey | null>("touch");
  const [copied, setCopied] = useState(false);

  const recommendations = weatherMatch?.recommendations ?? [];
  const primaryRitual = recommendations[0] ?? null;

  const groupedThemes = useMemo(() => {
    const grouped: Record<ThemeKey, RitualRecommendation[]> = {
      massage: [],
      breathing: [],
      touch: [],
      learnings: [],
    };
    recommendations.forEach((practice) => {
      grouped[classifyTheme(practice)].push(practice);
    });
    return grouped;
  }, [recommendations]);

  const tonightSteps = primaryRitual?.ritualSteps?.slice(0, 4) ?? copy.fallbackSteps;
  const positionCues = primaryRitual?.ritualSteps?.slice(1, 4) ?? copy.fallbackPositions;

  const quote = useMemo(() => {
    const seed = `${new Date().toDateString()}:${weatherMatch?.matchKey ?? weatherStateMode}`;
    return copy.quotes[hashString(seed) % copy.quotes.length];
  }, [copy.quotes, weatherMatch?.matchKey, weatherStateMode]);

  const suggestionText = primaryRitual?.messageSuggestion ?? weatherMatch?.summary ?? copy.waitingBody;

  const copySuggestion = async () => {
    try {
      await navigator.clipboard.writeText(suggestionText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore clipboard failures
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-primary/20 bg-gradient-to-br from-primary/12 via-background/94 to-background/90 p-4 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.42)] md:p-6">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img src={shivaShaktiIcon} alt="" className="h-full w-full object-cover opacity-[0.16]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-background/58 to-background/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/64 via-transparent to-background/52" />
      </div>

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.26em] text-primary/80">{copy.eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
          {weatherMatch ? weatherMatch.archetype.title : copy.waitingTitle}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          {weatherMatch ? `${copy.title} ${weatherMatch.summary}` : copy.waitingBody}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-border/30 bg-background/45 px-2.5 py-1 text-[11px] text-foreground/90">
            {copy.yourWeather}: {myWeather ? `${myWeather.emoji} ${myWeather.label}` : copy.waitingWeather}
          </span>
          <span className="rounded-full border border-border/30 bg-background/45 px-2.5 py-1 text-[11px] text-foreground/90">
            {copy.belovedWeather}: {belovedWeather ? `${belovedWeather.emoji} ${belovedWeather.label}` : copy.waitingWeather}
          </span>
          <span className="rounded-full border border-primary/25 bg-primary/12 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-primary/90">
            {sharedStatusLabel}
          </span>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-3">
          <article className="rounded-[24px] border border-border/30 bg-card/55 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{copy.ritualLabel}</p>
            <h3 className="mt-2 font-display text-2xl text-foreground">
              {primaryRitual?.title ?? copy.waitingTitle}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {primaryRitual?.description ?? copy.waitingBody}
            </p>

            {primaryRitual ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-full border border-border/35 bg-background/45 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-foreground/90">
                  {primaryRitual.ritualDuration}
                </span>
                <span className="rounded-full border border-border/35 bg-background/45 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-foreground/90">
                  {primaryRitual.intimacyLevel}
                </span>
                <span className="rounded-full border border-border/35 bg-background/45 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-foreground/90">
                  {primaryRitual.primaryNeed}
                </span>
              </div>
            ) : null}

            <div className="mt-4 rounded-xl border border-border/30 bg-background/45 p-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{copy.stepsLabel}</p>
              <ol className="mt-2 space-y-1.5 text-sm leading-6 text-foreground/90">
                {tonightSteps.map((step, index) => (
                  <li key={`${step}-${index}`}>{index + 1}. {step}</li>
                ))}
              </ol>
            </div>

            <div className="mt-3 rounded-xl border border-primary/20 bg-primary/8 p-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-primary/85">{copy.sendLabel}</p>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{suggestionText}</p>
              <button
                type="button"
                onClick={() => void copySuggestion()}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-border/35 bg-card/45 px-3 py-1.5 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? copy.sentButton : copy.sendButton}
              </button>
            </div>
          </article>

          <article className="rounded-[24px] border border-border/30 bg-card/55 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{copy.themesLabel}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.themesBody}</p>

            <div className="mt-3 space-y-2">
              {themeOrder.map((theme) => {
                const Icon = themeIcon[theme];
                const practices = groupedThemes[theme];
                const expanded = expandedTheme === theme;
                return (
                  <div key={theme} className="rounded-xl border border-border/30 bg-background/45 p-3">
                    <button
                      type="button"
                      onClick={() => setExpandedTheme(expanded ? null : theme)}
                      className="flex w-full items-start justify-between gap-3 text-left"
                    >
                      <div>
                        <div className="inline-flex items-center gap-2">
                          <Icon className="h-4 w-4 text-primary/90" />
                          <span className="font-medium text-foreground">{copy.themeTitles[theme]}</span>
                          <span className="rounded-full border border-border/30 bg-card/45 px-2 py-0.5 text-[10px] text-muted-foreground">
                            {practices.length}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{copy.themeBodies[theme]}</p>
                      </div>
                      {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </button>
                    {expanded ? (
                      <div className="mt-2 border-t border-border/20 pt-2">
                        {practices.length ? (
                          <ul className="space-y-1 text-sm leading-6 text-foreground/90">
                            {practices.map((practice) => (
                              <li key={`${theme}-${practice.id}`}>• {practice.title}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm leading-6 text-muted-foreground">{copy.themeEmpty}</p>
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-[24px] border border-border/30 bg-card/55 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{copy.guidanceLabel}</p>
            <div className="mt-3 space-y-3">
              <div className="rounded-xl border border-border/30 bg-background/45 p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{copy.respectLabel}</p>
                <p className="mt-1 text-sm leading-6 text-foreground/90">{weatherMatch?.firstMeaning ?? copy.waitingBody}</p>
                <p className="mt-1 text-sm leading-6 text-foreground/90">{weatherMatch?.secondMeaning ?? ""}</p>
                <ul className="mt-2 space-y-1 text-sm leading-6 text-muted-foreground">
                  {copy.respectPrompts.map((prompt) => (
                    <li key={prompt}>• {prompt}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border/30 bg-background/45 p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{copy.positionsLabel}</p>
                <ul className="mt-2 space-y-1 text-sm leading-6 text-foreground/90">
                  {positionCues.map((cue, index) => (
                    <li key={`${cue}-${index}`}>• {cue}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-amber-300/25 bg-amber-500/8 p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-amber-200">{copy.quoteLabel}</p>
                <p className="mt-2 font-display text-lg leading-7 text-foreground/90">“{quote.quote}”</p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">{quote.author}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default TonightPathExperience;
