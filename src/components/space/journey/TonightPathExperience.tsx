import { useMemo, useState } from "react";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { BookOpen, Check, Copy, Flame, Hand, Heart, MessageCircle, Sparkles, Wind } from "lucide-react";

import type { Language } from "@/contexts/LanguageContext";
import type { WeatherMatchResult, RitualRecommendation } from "@/lib/weatherMatch";
import type { WeatherCardData } from "@/components/space/journey/SharedWeatherCard";

type WeatherStateMode = "none" | "mine_only" | "beloved_only" | "both";
type ThemeKey = "touch" | "massage" | "breathing" | "reconnect" | "polarity" | "integration";

type Props = {
  lang: Language;
  weatherMatch: WeatherMatchResult | null;
  weatherStateMode: WeatherStateMode;
  myWeather: WeatherCardData | null;
  belovedWeather: WeatherCardData | null;
  sharedStatusLabel: string;
};

type PracticeItem = {
  id: string;
  title: string;
  summary: string;
  minutes: string;
  source: string;
  steps: string[];
  theme: ThemeKey;
};

const hashString = (value: string) =>
  Array.from(value).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 13);

const themeOrder: ThemeKey[] = ["touch", "massage", "breathing", "reconnect", "polarity", "integration"];

const themeVisuals: Record<ThemeKey, { icon: typeof Heart; wrapClass: string; iconClass: string }> = {
  touch: {
    icon: Heart,
    wrapClass: "border-rose-300/30 bg-gradient-to-br from-rose-500/10 via-background/55 to-background/35",
    iconClass: "text-rose-200",
  },
  massage: {
    icon: Hand,
    wrapClass: "border-amber-300/30 bg-gradient-to-br from-amber-500/10 via-background/55 to-background/35",
    iconClass: "text-amber-200",
  },
  breathing: {
    icon: Wind,
    wrapClass: "border-cyan-300/30 bg-gradient-to-br from-cyan-500/10 via-background/55 to-background/35",
    iconClass: "text-cyan-200",
  },
  reconnect: {
    icon: MessageCircle,
    wrapClass: "border-emerald-300/30 bg-gradient-to-br from-emerald-500/10 via-background/55 to-background/35",
    iconClass: "text-emerald-200",
  },
  polarity: {
    icon: Flame,
    wrapClass: "border-orange-300/30 bg-gradient-to-br from-orange-500/10 via-background/55 to-background/35",
    iconClass: "text-orange-200",
  },
  integration: {
    icon: BookOpen,
    wrapClass: "border-violet-300/30 bg-gradient-to-br from-violet-500/10 via-background/55 to-background/35",
    iconClass: "text-violet-200",
  },
};

const copyByLang: Record<
Language,
{
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
  respectPrompts: string[];
  fallbackSteps: string[];
  fallbackPositions: string[];
  quotes: Array<{ author: string; quote: string }>;
}
> = {
  en: {
    eyebrow: "Tonight Path",
    title: "A complete ritual for your shared weather.",
    waitingTitle: "Your Tonight Path is preparing",
    waitingBody: "When both partners share weather, a full ritual sequence appears here with practical guidance.",
    ritualLabel: "Tonight ritual",
    stepsLabel: "Step-by-step",
    sendLabel: "Message to your beloved",
    sendButton: "Copy message",
    sentButton: "Copied",
    themesLabel: "Practice themes",
    themesBody: "Six relevant practices are generated for your current combination so you can act immediately.",
    guidanceLabel: "Guidance for your dynamic",
    respectLabel: "Respect and reconnect",
    positionsLabel: "Positions and touch cues",
    quoteLabel: "Quote of the night",
    yourWeather: "Your weather",
    belovedWeather: "Beloved weather",
    waitingWeather: "Waiting",
    themeTitles: {
      touch: "Touch",
      massage: "Massage",
      breathing: "Breathing",
      reconnect: "Reconnect tool",
      polarity: "Polarity",
      integration: "Integration",
    },
    respectPrompts: [
      "Name one feeling before making a request.",
      "Mirror your partner's words before offering the next step.",
      "Choose slowness over performance when tension appears.",
    ],
    fallbackSteps: [
      "Sit face-to-face and sync breath for one minute.",
      "Share one feeling each in one sentence.",
      "Offer one intentional touch and ask consent.",
    ],
    fallbackPositions: [
      "Seated face-to-face, knees touching.",
      "One hand on heart, one hand on belly.",
      "Side-by-side breathing before moving forward.",
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
    title: "Un rituel complet pour votre météo partagée.",
    waitingTitle: "Votre chemin de ce soir se prépare",
    waitingBody: "Quand les deux partenaires partagent leur météo, une séquence complète apparaît ici avec des repères pratiques.",
    ritualLabel: "Rituel de ce soir",
    stepsLabel: "Étapes",
    sendLabel: "Message à votre partenaire",
    sendButton: "Copier le message",
    sentButton: "Copié",
    themesLabel: "Thèmes de pratique",
    themesBody: "Six pratiques pertinentes sont générées pour votre combinaison actuelle afin d'agir immédiatement.",
    guidanceLabel: "Guidance pour votre dynamique",
    respectLabel: "Respect et reconnexion",
    positionsLabel: "Positions et repères de toucher",
    quoteLabel: "Citation du soir",
    yourWeather: "Votre météo",
    belovedWeather: "Météo du partenaire",
    waitingWeather: "En attente",
    themeTitles: {
      touch: "Toucher",
      massage: "Massage",
      breathing: "Respiration",
      reconnect: "Reconnect",
      polarity: "Polarité",
      integration: "Intégration",
    },
    respectPrompts: [
      "Nommez une émotion avant de formuler une demande.",
      "Reformulez les mots du partenaire avant de proposer la suite.",
      "Choisissez la lenteur plutôt que la performance quand une tension apparaît.",
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
    title: "Kompletní rituál pro vaše sdílené počasí.",
    waitingTitle: "Dnešní cesta se připravuje",
    waitingBody: "Jakmile oba partneři nasdílí počasí, objeví se zde plná sekvence s praktickým vedením.",
    ritualLabel: "Dnešní rituál",
    stepsLabel: "Kroky",
    sendLabel: "Zpráva partnerovi",
    sendButton: "Kopírovat zprávu",
    sentButton: "Zkopírováno",
    themesLabel: "Témata praxe",
    themesBody: "Pro aktuální kombinaci se generuje šest relevantních praxí, abyste mohli hned jednat.",
    guidanceLabel: "Vedení pro vaši dynamiku",
    respectLabel: "Respekt a znovupropojení",
    positionsLabel: "Pozice a dotekové podněty",
    quoteLabel: "Citát večera",
    yourWeather: "Vaše počasí",
    belovedWeather: "Počasí partnera",
    waitingWeather: "Čekání",
    themeTitles: {
      touch: "Dotek",
      massage: "Masáž",
      breathing: "Dýchání",
      reconnect: "Reconnect nástroj",
      polarity: "Polarita",
      integration: "Integrace",
    },
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

const classifyRecommendationTheme = (practice: RitualRecommendation): ThemeKey => {
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
  if (/(reconnect|repair|truth|listen|safe|sécur|uklid|znovu)/.test(text)) return "reconnect";
  if (/(polarity|charge|desire|playful|erotic|flirt)/.test(text)) return "polarity";
  if (/(integrat|close|afterglow|gratitude|reflection|journal)/.test(text)) return "integration";
  return "touch";
};

const TonightPathExperience = ({
  lang,
  weatherMatch,
  weatherStateMode,
  myWeather,
  belovedWeather,
  sharedStatusLabel,
}: Props) => {
  const copy = copyByLang[lang];
  const [copied, setCopied] = useState(false);

  const recommendations = weatherMatch?.recommendations ?? [];
  const primaryRitual = recommendations[0] ?? null;

  const practiceDeck = useMemo<PracticeItem[]>(() => {
    const fromRecommendations: PracticeItem[] = recommendations.slice(0, 3).map((practice, index) => ({
      id: `rec-${practice.id}`,
      title: practice.title,
      summary: practice.description,
      minutes: practice.ritualDuration || `${6 + index} min`,
      source:
        practice.sourceTraditions.slice(0, 2).join(" + ")
        || practice.sourceAuthors.slice(0, 1).join(" + ")
        || "Sacred Temple",
      steps: practice.ritualSteps.slice(0, 3),
      theme: classifyRecommendationTheme(practice),
    }));

    const weatherPair = `${myWeather?.label ?? copy.waitingWeather} + ${belovedWeather?.label ?? copy.waitingWeather}`;
    const matchName = weatherMatch?.archetype.title ?? "Shared Arc";

    const generated: PracticeItem[] = [
      {
        id: "gen-breath",
        theme: "breathing",
        title: "4-6 Co-Regulation Breath",
        summary: `Use ${weatherPair} to settle both nervous systems before touch.`,
        minutes: "5 min",
        source: "Intimacy Weather + Temple Guide",
        steps: [
          "Inhale for 4, exhale for 6 for five rounds.",
          "Keep one hand on your own heart and one on your partner's arm.",
          "Name one word after each round.",
        ],
      },
      {
        id: "gen-touch",
        theme: "touch",
        title: "Gaze and Palm Contact",
        summary: `${matchName} opens through slow, consent-led contact.`,
        minutes: "7 min",
        source: "Rituals + Positions",
        steps: [
          "Sit facing each other, palm to palm.",
          "Hold eye contact for one minute.",
          "Ask: 'Softer, same, or more?' before changing intensity.",
        ],
      },
      {
        id: "gen-massage",
        theme: "massage",
        title: "Shoulder Melt Reset",
        summary: "Release body tension first so emotional closeness lands gently.",
        minutes: "8 min",
        source: "Rituals + Reconnect",
        steps: [
          "One partner receives shoulder and neck pressure for 90 seconds.",
          "Switch roles and repeat.",
          "Share one sentence: 'What I need now is...'",
        ],
      },
      {
        id: "gen-reconnect",
        theme: "reconnect",
        title: "Truth and Tenderness Round",
        summary: "Repair quickly if there is friction before moving into desire.",
        minutes: "6 min",
        source: "Reconnect Tool + Temple Board",
        steps: [
          "Each partner says one appreciation and one current need.",
          "Mirror your partner's words exactly once.",
          "Confirm one shared intention for tonight.",
        ],
      },
      {
        id: "gen-polarity",
        theme: "polarity",
        title: "Lead / Receive Switch",
        summary: "Keep polarity playful by alternating initiative and surrender.",
        minutes: "9 min",
        source: "Positions + Pathways",
        steps: [
          "Round 1: Partner A leads one slow movement sequence.",
          "Round 2: Partner B leads with a different rhythm.",
          "Round 3: Blend both rhythms into one shared pace.",
        ],
      },
      {
        id: "gen-integration",
        theme: "integration",
        title: "Afterglow Integration",
        summary: "Close with meaning so tonight changes tomorrow's connection.",
        minutes: "4 min",
        source: "Memory Altar + Messages",
        steps: [
          "Each partner names one moment to remember.",
          "Send or save one short gratitude line.",
          "Set one tiny intention for tomorrow evening.",
        ],
      },
    ];

    const combined = [...fromRecommendations, ...generated];
    const selected: PracticeItem[] = [];
    const usedTitles = new Set<string>();
    const usedThemes = new Set<ThemeKey>();

    for (const item of combined) {
      if (selected.length >= 6) break;
      if (usedTitles.has(item.title)) continue;
      if (usedThemes.has(item.theme) && selected.length < 4) continue;
      selected.push(item);
      usedTitles.add(item.title);
      usedThemes.add(item.theme);
    }
    for (const item of combined) {
      if (selected.length >= 6) break;
      if (usedTitles.has(item.title)) continue;
      selected.push(item);
      usedTitles.add(item.title);
    }
    return selected.slice(0, 6);
  }, [belovedWeather?.label, copy.waitingWeather, myWeather?.label, recommendations, weatherMatch?.archetype.title]);

  const groupedThemes = useMemo(() => {
    const grouped = new Map<ThemeKey, PracticeItem[]>();
    practiceDeck.forEach((item) => {
      const list = grouped.get(item.theme) ?? [];
      list.push(item);
      grouped.set(item.theme, list);
    });
    return themeOrder
      .map((theme) => ({ theme, practices: grouped.get(theme) ?? [] }))
      .filter((entry) => entry.practices.length > 0);
  }, [practiceDeck]);

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
          <article className="rounded-[24px] border border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-card/65 to-card/35 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200/90">{copy.ritualLabel}</p>
            <h3 className="mt-2 font-display text-2xl text-foreground">{primaryRitual?.title ?? copy.waitingTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{primaryRitual?.description ?? copy.waitingBody}</p>

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

          <article className="rounded-[24px] border border-fuchsia-300/25 bg-gradient-to-br from-fuchsia-500/10 via-card/65 to-card/35 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-200/90">{copy.themesLabel}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.themesBody}</p>
            <div className="mt-3 space-y-2">
              {groupedThemes.map(({ theme, practices }) => {
                const Icon = themeVisuals[theme].icon;
                return (
                  <div key={theme} className={`rounded-xl border p-3 ${themeVisuals[theme].wrapClass}`}>
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${themeVisuals[theme].iconClass}`} />
                      <span className="font-medium text-foreground">{copy.themeTitles[theme]}</span>
                      <span className="rounded-full border border-border/30 bg-background/45 px-2 py-0.5 text-[10px] text-muted-foreground">
                        {practices.length}
                      </span>
                    </div>
                    <div className="mt-2 space-y-2">
                      {practices.map((practice) => (
                        <div key={practice.id} className="rounded-lg border border-border/25 bg-background/45 p-2.5">
                          <p className="text-sm font-medium text-foreground">{practice.title}</p>
                          <p className="mt-1 text-xs leading-5 text-muted-foreground">{practice.summary}</p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-primary/80">
                            {practice.minutes} · {practice.source}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-[24px] border border-cyan-300/25 bg-gradient-to-br from-cyan-500/10 via-card/65 to-card/35 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/90">{copy.guidanceLabel}</p>
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

              <div className="rounded-xl border border-amber-300/30 bg-amber-500/10 p-3">
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
