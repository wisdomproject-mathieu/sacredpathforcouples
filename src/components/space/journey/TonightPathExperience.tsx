import { useEffect, useMemo, useState } from "react";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { BookOpen, Check, Copy, Flame, Hand, Heart, MessageCircle, Wind } from "lucide-react";

import type { Language } from "@/contexts/LanguageContext";
import type { WeatherMatchResult, RitualRecommendation } from "@/lib/weatherMatch";
import type { WeatherCardData } from "@/components/space/journey/SharedWeatherCard";

type WeatherStateMode = "none" | "mine_only" | "beloved_only" | "both";
type ThemeKey = "touch" | "breathing" | "massage" | "emotional_connection" | "sacred_intimacy" | "reflection";

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
  purpose: string;
  actions: string[];
  tags: string[];
  theme: ThemeKey;
};

type ThemeMeta = {
  title: string;
  whyTonight: string;
};

const hashString = (value: string) =>
  Array.from(value).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 17);

const themeOrder: ThemeKey[] = [
  "touch",
  "breathing",
  "massage",
  "emotional_connection",
  "sacred_intimacy",
  "reflection",
];

const themeVisuals: Record<ThemeKey, { icon: typeof Heart; wrapClass: string; iconClass: string }> = {
  touch: {
    icon: Heart,
    wrapClass: "border-rose-300/30 bg-gradient-to-br from-rose-500/12 via-background/60 to-background/40",
    iconClass: "text-rose-200",
  },
  breathing: {
    icon: Wind,
    wrapClass: "border-cyan-300/30 bg-gradient-to-br from-cyan-500/12 via-background/60 to-background/40",
    iconClass: "text-cyan-200",
  },
  massage: {
    icon: Hand,
    wrapClass: "border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-background/60 to-background/40",
    iconClass: "text-amber-200",
  },
  emotional_connection: {
    icon: MessageCircle,
    wrapClass: "border-emerald-300/30 bg-gradient-to-br from-emerald-500/12 via-background/60 to-background/40",
    iconClass: "text-emerald-200",
  },
  sacred_intimacy: {
    icon: Flame,
    wrapClass: "border-orange-300/30 bg-gradient-to-br from-orange-500/12 via-background/60 to-background/40",
    iconClass: "text-orange-200",
  },
  reflection: {
    icon: BookOpen,
    wrapClass: "border-violet-300/30 bg-gradient-to-br from-violet-500/12 via-background/60 to-background/40",
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
  ritualPurposeLabel: string;
  stepsLabel: string;
  sendLabel: string;
  sendButton: string;
  sentButton: string;
  themesLabel: string;
  themesBody: string;
  guidanceLabel: string;
  respectLabel: string;
  respectContextLine: string;
  positionsLabel: string;
  reflectionLabel: string;
  quoteLabel: string;
  yourWeather: string;
  belovedWeather: string;
  waitingWeather: string;
  tagBestForPrefix: string;
  tagsPaceSlow: string;
  tagsEmotionalSafety: string;
  tagsConsentForward: string;
  themeMeta: Record<ThemeKey, ThemeMeta>;
  respectPrompts: string[];
  fallbackSteps: string[];
  fallbackPositions: string[];
  reflectionPrompt: string;
  quotes: Array<{ author: string; quote: string }>;
}> = {
  en: {
    eyebrow: "Tonight Path",
    title: "Practical connection guidance inspired by sacred intimacy traditions.",
    waitingTitle: "Your Tonight Path is preparing",
    waitingBody: "When both partners share their weather, this page builds a complete, actionable ritual flow for tonight.",
    ritualLabel: "Main ritual",
    ritualPurposeLabel: "Why this matters tonight",
    stepsLabel: "What to do now",
    sendLabel: "Message to your beloved",
    sendButton: "Copy message",
    sentButton: "Copied",
    themesLabel: "Practice themes",
    themesBody: "Choose one theme and run one clear practice now. All practices are selected for your current weather combination.",
    guidanceLabel: "Guidance for your dynamic",
    respectLabel: "Respect and reconnect",
    respectContextLine:
      "Tonight one of you may want momentum while the other needs reassurance. Slow down enough for both bodies to feel safe.",
    positionsLabel: "Optional posture and touch cues",
    reflectionLabel: "Gentle reflection prompt",
    quoteLabel: "Quote of the night",
    yourWeather: "Your weather",
    belovedWeather: "Beloved weather",
    waitingWeather: "Waiting",
    tagBestForPrefix: "Best for",
    tagsPaceSlow: "Pace: slow and grounded",
    tagsEmotionalSafety: "Emotional safety first",
    tagsConsentForward: "Consent and check-ins included",
    themeMeta: {
      touch: {
        title: "Touch",
        whyTonight: "When you want closeness without pressure.",
      },
      breathing: {
        title: "Breathing",
        whyTonight: "When both nervous systems need to settle first.",
      },
      massage: {
        title: "Massage",
        whyTonight: "When the body needs warmth before deeper intimacy.",
      },
      emotional_connection: {
        title: "Emotional connection",
        whyTonight: "When understanding each other matters more than speed.",
      },
      sacred_intimacy: {
        title: "Sacred intimacy",
        whyTonight: "When desire is present and you want to deepen safely.",
      },
      reflection: {
        title: "Reflection",
        whyTonight: "When you want tonight to become lasting relationship growth.",
      },
    },
    respectPrompts: [
      "Name one feeling before making any request.",
      "Mirror your partner's words before offering a next step.",
      "If either body tenses, slow down and return to breath.",
    ],
    fallbackSteps: [
      "Sit facing each other and breathe slowly together for one minute.",
      "Each partner says one honest sentence about what they need tonight.",
      "Offer one intentional touch and ask if your partner wants softer, same, or more.",
    ],
    fallbackPositions: [
      "Face-to-face seated posture with knees gently touching.",
      "One hand on your own heart, one on your partner's forearm.",
      "Side-by-side breath for two rounds before deepening touch.",
    ],
    reflectionPrompt:
      "After the practice, each partner answers: What helped me feel most safe and most desired tonight?",
    quotes: [
      { author: "Diana Richardson", quote: "Slowness lets intimacy become truthful, not performative." },
      { author: "David Deida", quote: "Presence is the doorway where love and desire can meet." },
      { author: "Mantak Chia", quote: "Breath turns intensity into nourishment for both partners." },
      { author: "Osho", quote: "When awareness enters touch, silence itself becomes connection." },
    ],
  },
  fr: {
    eyebrow: "Chemin de ce soir",
    title: "Un guide concret inspiré des traditions d'intimité sacrée.",
    waitingTitle: "Votre chemin de ce soir se prépare",
    waitingBody: "Quand les deux partenaires partagent leur météo, cette page construit un flow complet et actionnable pour ce soir.",
    ritualLabel: "Rituel principal",
    ritualPurposeLabel: "Pourquoi c'est important ce soir",
    stepsLabel: "Ce que vous faites maintenant",
    sendLabel: "Message à votre partenaire",
    sendButton: "Copier le message",
    sentButton: "Copié",
    themesLabel: "Thèmes de pratique",
    themesBody: "Choisissez un thème et lancez une pratique claire maintenant. Toutes les pratiques sont sélectionnées pour votre combinaison actuelle.",
    guidanceLabel: "Guidance pour votre dynamique",
    respectLabel: "Respect et reconnexion",
    respectContextLine:
      "Ce soir, l'un peut vouloir avancer tandis que l'autre a besoin d'être rassuré. Ralentissez juste assez pour que les deux corps se sentent en sécurité.",
    positionsLabel: "Positions et repères de toucher",
    reflectionLabel: "Question de réflexion douce",
    quoteLabel: "Citation du soir",
    yourWeather: "Votre météo",
    belovedWeather: "Météo du partenaire",
    waitingWeather: "En attente",
    tagBestForPrefix: "Idéal pour",
    tagsPaceSlow: "Rythme : lent et ancré",
    tagsEmotionalSafety: "Sécurité émotionnelle d'abord",
    tagsConsentForward: "Consentement et check-ins inclus",
    themeMeta: {
      touch: { title: "Toucher", whyTonight: "Quand vous voulez de la proximité sans pression." },
      breathing: { title: "Respiration", whyTonight: "Quand les deux systèmes nerveux doivent d'abord se poser." },
      massage: { title: "Massage", whyTonight: "Quand le corps a besoin de chaleur avant d'aller plus loin." },
      emotional_connection: { title: "Connexion émotionnelle", whyTonight: "Quand se comprendre compte plus que la vitesse." },
      sacred_intimacy: { title: "Intimité sacrée", whyTonight: "Quand le désir est présent et que vous voulez approfondir en sécurité." },
      reflection: { title: "Réflexion", whyTonight: "Quand vous voulez transformer la soirée en croissance durable." },
    },
    respectPrompts: [
      "Nommez une émotion avant toute demande.",
      "Reformulez les mots du partenaire avant de proposer la suite.",
      "Si l'un des corps se tend, ralentissez et revenez au souffle.",
    ],
    fallbackSteps: [
      "Asseyez-vous face à face et respirez lentement ensemble pendant une minute.",
      "Chaque partenaire dit une phrase honnête sur son besoin de ce soir.",
      "Offrez un toucher intentionnel et demandez : plus doux, pareil, ou plus ?",
    ],
    fallbackPositions: [
      "Posture assise face à face avec contact léger des genoux.",
      "Une main sur votre cœur, une main sur l'avant-bras du partenaire.",
      "Respiration côte à côte pendant deux cycles avant d'approfondir.",
    ],
    reflectionPrompt:
      "Après la pratique, chacun répond: Qu'est-ce qui m'a aidé à me sentir le plus en sécurité et le plus désiré ce soir ?",
    quotes: [
      { author: "Diana Richardson", quote: "La lenteur permet une intimité vraie, sans performance." },
      { author: "David Deida", quote: "La présence est la porte où l'amour et le désir se rencontrent." },
      { author: "Mantak Chia", quote: "Le souffle transforme l'intensité en nourriture pour les deux." },
      { author: "Osho", quote: "Quand la conscience entre dans le toucher, le silence devient lien." },
    ],
  },
  cs: {
    eyebrow: "Dnešní cesta",
    title: "Praktické vedení inspirované tradicemi posvátné intimity.",
    waitingTitle: "Dnešní cesta se připravuje",
    waitingBody: "Jakmile oba partneři nasdílí své počasí, tato stránka vytvoří kompletní a použitelný večerní flow.",
    ritualLabel: "Hlavní rituál",
    ritualPurposeLabel: "Proč je to dnes důležité",
    stepsLabel: "Co udělat teď",
    sendLabel: "Zpráva partnerovi",
    sendButton: "Kopírovat zprávu",
    sentButton: "Zkopírováno",
    themesLabel: "Témata praxe",
    themesBody: "Vyberte jedno téma a spusťte jednu jasnou praxi hned teď. Vše je vybrané pro vaši aktuální kombinaci.",
    guidanceLabel: "Vedení pro vaši dynamiku",
    respectLabel: "Respekt a znovupropojení",
    respectContextLine:
      "Dnes večer může jeden z vás chtít tempo, zatímco druhý potřebuje ujištění. Zpomalte tak, aby se obě těla cítila bezpečně.",
    positionsLabel: "Volitelné pozice a dotekové podněty",
    reflectionLabel: "Jemná reflexní otázka",
    quoteLabel: "Citát večera",
    yourWeather: "Vaše počasí",
    belovedWeather: "Počasí partnera",
    waitingWeather: "Čekání",
    tagBestForPrefix: "Vhodné pro",
    tagsPaceSlow: "Tempo: pomalé a ukotvené",
    tagsEmotionalSafety: "Nejdřív emoční bezpečí",
    tagsConsentForward: "Souhlas a check-iny součástí",
    themeMeta: {
      touch: { title: "Dotek", whyTonight: "Když chcete blízkost bez tlaku." },
      breathing: { title: "Dýchání", whyTonight: "Když se nejdřív potřebují uklidnit oba nervové systémy." },
      massage: { title: "Masáž", whyTonight: "Když tělo potřebuje teplo před hlubší intimitou." },
      emotional_connection: { title: "Emoční propojení", whyTonight: "Když je důležitější porozumění než rychlost." },
      sacred_intimacy: { title: "Posvátná intimita", whyTonight: "Když je přítomná touha a chcete bezpečně prohloubit kontakt." },
      reflection: { title: "Reflexe", whyTonight: "Když chcete dnešní večer proměnit v dlouhodobý růst." },
    },
    respectPrompts: [
      "Nejprve pojmenujte jednu emoci, až potom žádost.",
      "Než navrhnete další krok, zrcadlete partnerova slova.",
      "Když se některé tělo napne, zpomalte a vraťte se k dechu.",
    ],
    fallbackSteps: [
      "Sedněte si čelem k sobě a minutu pomalu dýchejte spolu.",
      "Každý řekněte jednu upřímnou větu o tom, co dnes večer potřebujete.",
      "Nabídněte vědomý dotek a zeptejte se: jemněji, stejně, nebo více?",
    ],
    fallbackPositions: [
      "Sed čelem k sobě s jemným kontaktem kolen.",
      "Jedna ruka na vlastním srdci, druhá na partnerově předloktí.",
      "Dvě kola dýchání bok po boku před prohloubením doteku.",
    ],
    reflectionPrompt:
      "Po praxi oba odpovězte: Co mi dnes večer nejvíc pomohlo cítit se bezpečně a zároveň žádoucně?",
    quotes: [
      { author: "Diana Richardson", quote: "Pomalost dává intimitě pravdivost, ne výkon." },
      { author: "David Deida", quote: "Přítomnost je brána, kde se potkávají láska a touha." },
      { author: "Mantak Chia", quote: "Dech mění intenzitu ve výživu pro oba partnery." },
      { author: "Osho", quote: "Když do doteku vstoupí vědomí, i ticho je propojení." },
    ],
  },
};

const formatSourceLabel = (recommendation: RitualRecommendation, lang: Language) => {
  const labelByLang = {
    en: {
      withTraditionAndAuthor: (tradition: string, author: string) => `Inspired by ${tradition} and ${author}`,
      withTradition: (tradition: string) => `Inspired by ${tradition} tradition`,
      withAuthor: (author: string) => `Inspired by ${author}`,
      fallback: "Inspired by sacred relationship practice",
    },
    fr: {
      withTraditionAndAuthor: (tradition: string, author: string) => `Inspiré par ${tradition} et ${author}`,
      withTradition: (tradition: string) => `Inspiré par la tradition ${tradition}`,
      withAuthor: (author: string) => `Inspiré par ${author}`,
      fallback: "Inspiré par une pratique relationnelle sacrée",
    },
    cs: {
      withTraditionAndAuthor: (tradition: string, author: string) => `Inspirováno ${tradition} a ${author}`,
      withTradition: (tradition: string) => `Inspirováno tradicí ${tradition}`,
      withAuthor: (author: string) => `Inspirováno ${author}`,
      fallback: "Inspirováno posvátnou vztahovou praxí",
    },
  }[lang];
  const tradition = recommendation.sourceTraditions[0];
  const author = recommendation.sourceAuthors[0];
  if (tradition && author) return labelByLang.withTraditionAndAuthor(tradition, author);
  if (tradition) return labelByLang.withTradition(tradition);
  if (author) return labelByLang.withAuthor(author);
  return labelByLang.fallback;
};

const classifyTheme = (recommendation: RitualRecommendation): ThemeKey => {
  const text = [
    recommendation.title,
    recommendation.subtitle,
    recommendation.description,
    recommendation.primaryNeed,
    recommendation.tonightEnergy,
    recommendation.whatToAvoid,
    ...recommendation.ritualSteps,
    ...recommendation.sourceConcepts,
  ]
    .join(" ")
    .toLowerCase();

  if (/(breath|breathing|respir|souffle|dech|dých)/.test(text)) return "breathing";
  if (/(massage|bodywork|pressure|masáž|huile)/.test(text)) return "massage";
  if (/(repair|reconnect|truth|listen|safe|sécur|uklid|znovu)/.test(text)) return "emotional_connection";
  if (/(polarity|desire|erotic|flirt|charge|tantra|tao)/.test(text)) return "sacred_intimacy";
  if (/(afterglow|reflect|gratitude|integration|journal|debrief)/.test(text)) return "reflection";
  return "touch";
};

const buildGeneratedPractices = (
  myLabel: string,
  belovedLabel: string,
  archetypeTitle: string,
  copy: (typeof copyByLang)[Language],
): PracticeItem[] => [
  {
    id: "generated-touch",
    theme: "touch",
    title: "Gaze and Palm Contact",
    purpose: "A gentle way to reconnect without pressure.",
    actions: [
      "Sit facing each other.",
      "Place one palm against your partner's.",
      "Hold eye contact for three breaths.",
      "Say one honest sentence about what you need tonight.",
    ],
    tags: [
      "7 minutes · slow eye contact and palm-to-palm connection",
      `${copy.tagBestForPrefix} couples wanting closeness before intensity`,
      copy.tagsEmotionalSafety,
    ],
  },
  {
    id: "generated-breathing",
    theme: "breathing",
    title: "4-6 Co-Regulation Breath",
    purpose: `${myLabel} + ${belovedLabel} can meet more gently when both nervous systems settle first.`,
    actions: [
      "Inhale for 4 counts and exhale for 6 counts.",
      "Stay with this for five rounds.",
      "Between rounds, ask: 'Do you feel more here now?'",
    ],
    tags: [
      "5 minutes · breath-led grounding before touch",
      `${copy.tagBestForPrefix} tired or emotionally sensitive evenings`,
      copy.tagsPaceSlow,
    ],
  },
  {
    id: "generated-massage",
    theme: "massage",
    title: "Shoulder and Neck Melt",
    purpose: "Release body tension so tenderness has space to arrive.",
    actions: [
      "Partner A receives 90 seconds of slow shoulder pressure.",
      "Switch and repeat for Partner B.",
      "After both rounds, hold each other for three breaths.",
    ],
    tags: [
      "8 minutes · soft pressure and warm regulation",
      "Tao-inspired slow touch and grounding",
      copy.tagsConsentForward,
    ],
  },
  {
    id: "generated-emotional-connection",
    theme: "emotional_connection",
    title: "Respect and Reconnect Round",
    purpose: "Closeness deepens when each partner feels understood before anything physical.",
    actions: [
      "Each partner shares one feeling and one need.",
      "Mirror your partner's words back in one sentence.",
      "Agree on one shared intention for tonight.",
    ],
    tags: [
      "6 minutes · emotional attunement before intimacy",
      `${copy.tagBestForPrefix} moments with subtle disconnection`,
      copy.tagsEmotionalSafety,
    ],
  },
  {
    id: "generated-sacred-intimacy",
    theme: "sacred_intimacy",
    title: "Lead and Receive Practice",
    purpose: `${archetypeTitle} becomes safer and more alive when leadership and receptivity alternate.`,
    actions: [
      "Round one: Partner A leads one slow movement or touch pattern.",
      "Round two: Partner B leads with a different rhythm.",
      "Round three: blend both rhythms and stay attuned.",
    ],
      tags: [
        "9 minutes · polarity with consent and pacing",
        `${copy.tagBestForPrefix} couples wanting gentle sacred intensity`,
        copy.tagsConsentForward,
      ],
  },
  {
    id: "generated-reflection",
    theme: "reflection",
    title: "Afterglow Integration",
    purpose: "Keep tonight meaningful by closing with reflection instead of rushing away.",
    actions: [
      "Each partner names one moment they want to remember.",
      "Share one gratitude line out loud.",
      "Set one tiny intention for tomorrow evening.",
    ],
      tags: [
        "4 minutes · emotional integration and closure",
        `${copy.tagBestForPrefix} modern couples building consistency`,
        "Reflection that strengthens trust over time",
      ],
  },
];

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

  const recommendationPractices = useMemo<PracticeItem[]>(() => {
    if (!weatherMatch) return [];
    return weatherMatch.recommendations.slice(0, 3).map((rec, index) => ({
      id: `rec-${rec.id}`,
      title: rec.title,
      purpose: rec.description || rec.subtitle,
      actions: rec.ritualSteps.slice(0, 4),
      tags: [
        `${rec.ritualDuration || `${7 + index} minutes`} · ${rec.intimacyLevel || "gentle pacing"}`,
        `${copy.tagBestForPrefix} ${rec.primaryNeed}`,
        formatSourceLabel(rec, lang),
      ],
      theme: classifyTheme(rec),
    }));
  }, [copy.tagBestForPrefix, lang, weatherMatch]);

  const generatedPractices = useMemo(
    () =>
      buildGeneratedPractices(
        myWeather?.label ?? copy.waitingWeather,
        belovedWeather?.label ?? copy.waitingWeather,
        weatherMatch?.archetype.title ?? copy.waitingTitle,
        copy,
      ),
    [belovedWeather?.label, copy, myWeather?.label, weatherMatch?.archetype.title],
  );

  const tonightPractices = useMemo(() => {
    const combined = [...recommendationPractices, ...generatedPractices];
    const selected: PracticeItem[] = [];
    const usedTitles = new Set<string>();

    for (const theme of themeOrder) {
      const candidate = combined.find((item) => item.theme === theme && !usedTitles.has(item.title));
      if (candidate) {
        selected.push(candidate);
        usedTitles.add(candidate.title);
      }
    }

    for (const item of combined) {
      if (selected.length >= 6) break;
      if (usedTitles.has(item.title)) continue;
      selected.push(item);
      usedTitles.add(item.title);
    }

    return selected.slice(0, 6);
  }, [generatedPractices, recommendationPractices]);

  const availableThemes = useMemo(
    () =>
      themeOrder.filter((theme) => tonightPractices.some((item) => item.theme === theme)),
    [tonightPractices],
  );

  const [activeTheme, setActiveTheme] = useState<ThemeKey>(availableThemes[0] ?? "touch");

  useEffect(() => {
    if (!availableThemes.length) return;
    if (!availableThemes.includes(activeTheme)) {
      setActiveTheme(availableThemes[0]);
    }
  }, [activeTheme, availableThemes]);

  const activeThemePractices = useMemo(
    () => tonightPractices.filter((item) => item.theme === activeTheme),
    [activeTheme, tonightPractices],
  );

  const primaryRitual = tonightPractices[0] ?? null;
  const mainSteps = primaryRitual?.actions?.slice(0, 4) ?? copy.fallbackSteps;
  const positionCues = primaryRitual?.actions?.slice(1, 4) ?? copy.fallbackPositions;
  const suggestionText = weatherMatch?.recommendations?.[0]?.messageSuggestion ?? copy.waitingBody;

  const quote = useMemo(() => {
    const seed = `${new Date().toDateString()}:${weatherMatch?.matchKey ?? weatherStateMode}`;
    return copy.quotes[hashString(seed) % copy.quotes.length];
  }, [copy.quotes, weatherMatch?.matchKey, weatherStateMode]);

  const copySuggestion = async () => {
    try {
      await navigator.clipboard.writeText(suggestionText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
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
        <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">
          {weatherMatch
            ? `${copy.title} ${
                weatherMatch.summary
              }`
            : copy.waitingBody}
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

        <div className="mt-5 grid items-start gap-4 lg:grid-cols-[1.05fr_1fr_1fr]">
          <article className="flex h-full flex-col rounded-[24px] border border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-card/65 to-card/35 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200/90">{copy.ritualLabel}</p>
            <h3 className="mt-2 font-display text-2xl text-foreground">
              {primaryRitual?.title ?? copy.waitingTitle}
            </h3>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-amber-100/80">{copy.ritualPurposeLabel}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {primaryRitual?.purpose ?? copy.waitingBody}
            </p>

            {primaryRitual?.tags?.length ? (
              <div className="mt-3 space-y-1.5">
                {primaryRitual.tags.map((tag) => (
                  <p key={tag} className="break-words rounded-lg border border-border/30 bg-background/45 px-2.5 py-1.5 text-xs text-foreground/85">
                    {tag}
                  </p>
                ))}
              </div>
            ) : null}

            <div className="mt-4 rounded-xl border border-border/30 bg-background/45 p-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{copy.stepsLabel}</p>
              <ol className="mt-2 space-y-1.5 text-sm leading-6 text-foreground/90">
                {mainSteps.map((step, index) => (
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

          <article className="flex h-full flex-col rounded-[24px] border border-fuchsia-300/25 bg-gradient-to-br from-fuchsia-500/12 via-card/65 to-card/35 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-200/90">{copy.themesLabel}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.themesBody}</p>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {availableThemes.map((theme) => {
                const meta = copy.themeMeta[theme];
                const active = activeTheme === theme;
                const Icon = themeVisuals[theme].icon;
                return (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => setActiveTheme(theme)}
                    className={`rounded-xl border p-2.5 text-left transition-all ${
                      active
                        ? `${themeVisuals[theme].wrapClass} shadow-[0_14px_35px_-24px_rgba(255,173,70,0.5)]`
                        : "border-border/30 bg-background/45 hover:border-primary/25 hover:bg-card/55"
                    }`}
                  >
                    <div className="inline-flex items-center gap-1.5">
                      <Icon className={`h-4 w-4 ${active ? themeVisuals[theme].iconClass : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium text-foreground">{meta.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {activeThemePractices.length ? (
              <div className="mt-3 flex-1 space-y-2">
                <div className={`rounded-xl border p-3 ${themeVisuals[activeTheme].wrapClass}`}>
                  <p className="text-xs leading-5 text-foreground/90">{copy.themeMeta[activeTheme].whyTonight}</p>
                </div>

                {activeThemePractices.map((practice) => (
                  <div key={practice.id} className={`rounded-xl border p-3 ${themeVisuals[practice.theme].wrapClass}`}>
                    <h4 className="font-display text-lg text-foreground">{practice.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-foreground/85">{practice.purpose}</p>
                    <ul className="mt-2 space-y-1 text-sm leading-6 text-muted-foreground">
                      {practice.actions.slice(0, 4).map((action) => (
                        <li key={`${practice.id}-${action}`}>• {action}</li>
                      ))}
                    </ul>
                    <div className="mt-2 space-y-1">
                      {practice.tags.map((tag) => (
                        <p key={`${practice.id}-${tag}`} className="break-words text-xs text-foreground/80">{tag}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </article>

          <article className="flex h-full flex-col rounded-[24px] border border-cyan-300/25 bg-gradient-to-br from-cyan-500/12 via-card/65 to-card/35 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/90">{copy.guidanceLabel}</p>
            <div className="mt-3 space-y-3">
              <div className="rounded-xl border border-border/30 bg-background/45 p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{copy.respectLabel}</p>
                <p className="mt-1 text-sm leading-6 text-foreground/90">
                  {weatherMatch ? copy.respectContextLine : copy.waitingBody}
                </p>
                <p className="mt-1 text-sm leading-6 text-foreground/90">
                  {weatherMatch ? weatherMatch.interpretation : ""}
                </p>
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

              <div className="rounded-xl border border-violet-300/30 bg-violet-500/10 p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-violet-100/90">{copy.reflectionLabel}</p>
                <p className="mt-2 text-sm leading-6 text-foreground/90">{copy.reflectionPrompt}</p>
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
