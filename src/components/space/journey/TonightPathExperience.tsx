import { useEffect, useMemo, useRef, useState } from "react";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { BookOpen, Check, Copy, Eye, Flame, Hand, Heart, MessageCircle, MoveHorizontal, Orbit, PauseCircle, Volume2, Wind } from "lucide-react";
import RITUAL_LIBRARY_55 from "@/data/sacred_path_ritual_library_55.json";

import type { Language } from "@/contexts/LanguageContext";
import type { WeatherMatchResult } from "@/lib/weatherMatch";
import type { SelectedDailyMainCard, WeatherEngineDebugState } from "@/lib/weatherEngine";
import type { TonightPathStatusViewModel } from "@/lib/tonightPathStatus";
import type { WeatherCardData } from "@/components/space/journey/SharedWeatherCard";
import { resolveTonightPath, type TonightTheme } from "@/lib/tonightPathResolver";

type WeatherStateMode = "none" | "mine_only" | "beloved_only" | "both";
type ThemeKey = TonightTheme;

type Props = {
  lang: Language;
  weatherMatch: WeatherMatchResult | null;
  weatherStateMode: WeatherStateMode;
  myWeather: WeatherCardData | null;
  belovedWeather: WeatherCardData | null;
  tonightPathStatus: TonightPathStatusViewModel;
  coupleId?: string | null;
  selectedDailyMainCard: SelectedDailyMainCard | null;
  alternateCards: SelectedDailyMainCard[];
  weatherEngineDebug: WeatherEngineDebugState;
};

type PracticeItem = {
  id: string;
  title: string;
  purpose: string;
  actions: string[];
  tags: string[];
  theme: ThemeKey;
  subtitle: string;
};

type ThemeMeta = {
  title: string;
  whyTonight: string;
};

type ThemePracticeOverride = {
  ritualId: string;
  title: string;
  purpose: string;
  actions: string[];
  tags?: string[];
};

const hashString = (value: string) =>
  Array.from(value).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 17);

const themeVisuals: Record<ThemeKey, { icon: typeof Heart; wrapClass: string; iconClass: string }> = {
  breath: {
    icon: Wind,
    wrapClass: "border-cyan-300/30 bg-gradient-to-br from-cyan-500/12 via-background/60 to-background/40",
    iconClass: "text-cyan-200",
  },
  gaze: {
    icon: Eye,
    wrapClass: "border-indigo-300/30 bg-gradient-to-br from-indigo-500/12 via-background/60 to-background/40",
    iconClass: "text-indigo-200",
  },
  touch: {
    icon: Heart,
    wrapClass: "border-rose-300/30 bg-gradient-to-br from-rose-500/12 via-background/60 to-background/40",
    iconClass: "text-rose-200",
  },
  massage: {
    icon: Hand,
    wrapClass: "border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-background/60 to-background/40",
    iconClass: "text-amber-200",
  },
  embrace: {
    icon: Hand,
    wrapClass: "border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-background/60 to-background/40",
    iconClass: "text-amber-200",
  },
  movement: {
    icon: MoveHorizontal,
    wrapClass: "border-orange-300/30 bg-gradient-to-br from-orange-500/12 via-background/60 to-background/40",
    iconClass: "text-orange-200",
  },
  stillness: {
    icon: PauseCircle,
    wrapClass: "border-slate-300/30 bg-gradient-to-br from-slate-500/12 via-background/60 to-background/40",
    iconClass: "text-slate-200",
  },
  sound: {
    icon: Volume2,
    wrapClass: "border-pink-300/30 bg-gradient-to-br from-pink-500/12 via-background/60 to-background/40",
    iconClass: "text-pink-200",
  },
  union: {
    icon: Flame,
    wrapClass: "border-red-300/30 bg-gradient-to-br from-red-500/12 via-background/60 to-background/40",
    iconClass: "text-red-200",
  },
  emotional_clearing: {
    icon: MessageCircle,
    wrapClass: "border-emerald-300/30 bg-gradient-to-br from-emerald-500/12 via-background/60 to-background/40",
    iconClass: "text-emerald-200",
  },
  energy: {
    icon: Orbit,
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
  focusedThemeLabel: string;
  showAllThemesLabel: string;
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
    focusedThemeLabel: "Focused theme",
    showAllThemesLabel: "Show all themes",
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
      breath: { title: "Breath", whyTonight: "Regulate together before anything intense." },
      gaze: { title: "Gaze", whyTonight: "Rebuild attunement through eye connection." },
      touch: { title: "Touch", whyTonight: "Restore closeness with consent-led contact." },
      massage: { title: "Massage", whyTonight: "Use grounded touch to soften tension before deeper intimacy." },
      embrace: { title: "Embrace", whyTonight: "Let holding re-establish safety and warmth." },
      movement: { title: "Movement", whyTonight: "Discharge tension and find shared rhythm." },
      stillness: { title: "Stillness", whyTonight: "Slow down enough to feel each other again." },
      sound: { title: "Sound", whyTonight: "Speak and release what has been held inside." },
      union: { title: "Union", whyTonight: "Deepen intimacy without rushing the body." },
      emotional_clearing: { title: "Emotional Clearing", whyTonight: "Repair emotional distance with truth and care." },
      energy: { title: "Energy", whyTonight: "Channel shared charge into grounded vitality." },
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
    focusedThemeLabel: "Thème actif",
    showAllThemesLabel: "Voir tous les thèmes",
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
      breath: { title: "Souffle", whyTonight: "Se réguler ensemble avant toute intensité." },
      gaze: { title: "Regard", whyTonight: "Retrouver l'accord par les yeux." },
      touch: { title: "Toucher", whyTonight: "Rétablir la proximité avec consentement." },
      massage: { title: "Massage", whyTonight: "Adoucir les tensions corporelles avant d'aller plus loin." },
      embrace: { title: "Étreinte", whyTonight: "Laisser le corps revenir à la sécurité." },
      movement: { title: "Mouvement", whyTonight: "Libérer la tension et retrouver un rythme commun." },
      stillness: { title: "Immobilité", whyTonight: "Ralentir pour sentir l'autre pleinement." },
      sound: { title: "Voix", whyTonight: "Exprimer ce qui est resté silencieux." },
      union: { title: "Union", whyTonight: "Approfondir l'intimité sans précipitation." },
      emotional_clearing: { title: "Clarté émotionnelle", whyTonight: "Réparer la distance avec vérité et douceur." },
      energy: { title: "Énergie", whyTonight: "Canaliser la charge en présence partagée." },
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
    focusedThemeLabel: "Aktivní téma",
    showAllThemesLabel: "Zobrazit všechna témata",
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
      breath: { title: "Dech", whyTonight: "Nejdřív společně zregulujte nervový systém." },
      gaze: { title: "Pohled", whyTonight: "Obnovte naladění přes oční kontakt." },
      touch: { title: "Dotek", whyTonight: "Vraťte blízkost vědomým dotekem." },
      massage: { title: "Masáž", whyTonight: "Uvolněte tělo vědomým dotekem před hlubší intimitou." },
      embrace: { title: "Objetí", whyTonight: "Nechte těla vrátit se do bezpečí." },
      movement: { title: "Pohyb", whyTonight: "Uvolněte napětí a najděte společný rytmus." },
      stillness: { title: "Klid", whyTonight: "Zpomalte a opravdu se vnímejte." },
      sound: { title: "Hlas", whyTonight: "Vyslovte to, co zůstalo nevyřčené." },
      union: { title: "Spojení", whyTonight: "Prohlubte intimitu bez spěchu." },
      emotional_clearing: { title: "Emoční vyčištění", whyTonight: "Opravte vzdálenost pravdou a péčí." },
      energy: { title: "Energie", whyTonight: "Veďte společnou energii do přítomnosti." },
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

const normalizeSentence = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const isBoilerplateSentence = (value: string) => {
  const normalized = normalizeSentence(value);
  return (
    normalized.includes("a guided sequence aligned to the active couple weather combination") ||
    normalized.includes("a supporting practice chosen to reinforce tonight s main weather ritual") ||
    normalized.includes("weather aligned ritual for tonight") ||
    normalized.includes("reserve supporting ritual")
  );
};

const buildPracticePurpose = (
  card: SelectedDailyMainCard,
  theme: ThemeKey,
  copy: (typeof copyByLang)[Language],
) => {
  if (card.description && !isBoilerplateSentence(card.description)) return card.description;
  if (card.subtitle && !isBoilerplateSentence(card.subtitle)) return card.subtitle;
  return `${copy.themeMeta[theme].whyTonight} ${card.duration} · ${card.intimacyLevel}.`;
};

const hasBoilerplateSteps = (steps: string[]) => {
  const normalized = steps.map((step) => normalizeSentence(step));
  if (!normalized.length) return true;
  const hasPrimaryTemplate =
    normalized.includes("arrive with one shared breath and one sentence of intention") &&
    normalized.includes("follow slow pacing check in clearly and keep contact attuned") &&
    normalized.includes("close with one appreciation and one next step invitation");
  const hasReserveTemplate =
    normalized.includes("begin with one shared breath and eye contact") &&
    normalized.includes("move slowly and check in with consent language") &&
    normalized.includes("close with one appreciation and one next step for tomorrow");

  if (hasPrimaryTemplate || hasReserveTemplate) return true;

  const hasGenericBreathOpening = normalized.some((step) => step.includes("shared breath"));
  const hasGenericConsentStep = normalized.some((step) => step.includes("consent"));
  const hasGenericCloseStep = normalized.some(
    (step) => step.includes("one appreciation") && step.includes("next step"),
  );

  return normalized.length <= 3 && hasGenericBreathOpening && hasGenericConsentStep && hasGenericCloseStep;
};

const buildPracticeSteps = (
  card: SelectedDailyMainCard,
  theme: ThemeKey,
  copy: (typeof copyByLang)[Language],
  themeOverride: ThemePracticeOverride | null,
) => {
  const steps = Array.from(new Set(card.ritualSteps.map((step) => step.trim()).filter(Boolean))).slice(0, 5);
  if (steps.length && !hasBoilerplateSteps(steps)) return steps;
  if (themeOverride?.actions?.length) return themeOverride.actions.slice(0, 5);
  return copy.fallbackSteps.slice(0, 4);
};

const toPracticeItem = (
  card: SelectedDailyMainCard,
  theme: ThemeKey,
  copy: (typeof copyByLang)[Language],
  themeOverride: ThemePracticeOverride | null,
): PracticeItem => ({
  id: card.id,
  title: themeOverride?.title ?? card.title,
  subtitle: isBoilerplateSentence(card.subtitle) ? "" : card.subtitle,
  purpose: themeOverride?.purpose ?? buildPracticePurpose(card, theme, copy),
  actions: buildPracticeSteps(card, theme, copy, themeOverride),
  tags: themeOverride?.tags?.length
    ? themeOverride.tags
    : [
        `${card.duration} · ${card.intimacyLevel}`,
        `${copy.tagBestForPrefix} ${card.primaryNeed}`,
      ],
  theme,
});

const ritualLibraryMap = new Map<string, SelectedDailyMainCard>(
  (RITUAL_LIBRARY_55 as unknown[]).map((row) => {
    const card = row as Record<string, unknown>;
    return [
      String(card.id),
      {
        id: String(card.id),
        title: String(card.title ?? ""),
        subtitle: String(card.subtitle ?? ""),
        description: String(card.description ?? ""),
        duration: String(card.duration ?? "7 minutes"),
        intimacyLevel: String(card.intimacyLevel ?? "Gentle"),
        primaryNeed: String(card.primaryNeed ?? "Connection"),
        ritualSteps: Array.isArray(card.ritualSteps)
          ? card.ritualSteps.filter((step): step is string => typeof step === "string").slice(0, 6)
          : [],
        theme: String(card.theme ?? "touch"),
      } satisfies SelectedDailyMainCard,
    ] as const;
  }),
);

const themePracticeOverrides: Record<ThemeKey, ThemePracticeOverride> = {
  breath: {
    ritualId: "synchronized_heart_breathing",
    title: "Synchronized Heart Breathing",
    purpose: "Regulate together first, then choose your next ritual from a calmer place.",
    actions: [
      "Sit face-to-face and place one hand on your own heart.",
      "Inhale for 4 counts and exhale for 6 counts for five rounds.",
      "After each round, ask: softer, same, or more?",
      "Name one feeling each before moving into touch.",
    ],
    tags: ["5 minutes · Gentle", "Best for nervous-system settling"],
  },
  gaze: {
    ritualId: "soul_gazing",
    title: "Soul Gazing",
    purpose: "Rebuild attunement through direct seeing before words or intensity.",
    actions: [
      "Sit close enough to keep soft eye contact comfortably.",
      "Breathe slowly together for three shared breaths.",
      "Each partner says one sentence beginning with: I feel...",
      "Hold the gaze for one final breath, then choose your next move.",
    ],
    tags: ["6 minutes · Gentle", "Best for emotional attunement"],
  },
  touch: {
    ritualId: "yoga_of_touch",
    title: "The Yoga of Touch",
    purpose: "Use listening touch to restore closeness with consent and clarity.",
    actions: [
      "Place one hand on your partner's shoulder and one on their forearm.",
      "Keep pressure light and move slower than your impulse.",
      "Pause every 30 seconds for a consent check-in.",
      "Close with one appreciation and one clear next-step invitation.",
    ],
    tags: ["7 minutes · Gentle to medium", "Best for safe closeness"],
  },
  massage: {
    ritualId: "skydancing_tantric_massage",
    title: "SkyDancing Tantric Massage",
    purpose: "Soften body tension and emotional guard before deeper intimacy.",
    actions: [
      "Warm your hands first and begin with shoulders and upper back.",
      "Use long, slow strokes and stay with the breath rhythm.",
      "Switch giver and receiver after 3 minutes.",
      "End with still palms and one question: What do you need now?",
    ],
    tags: ["8 minutes · Medium", "Best for grounded warmth"],
  },
  embrace: {
    ritualId: "melting_hug",
    title: "The Melting Hug",
    purpose: "Re-establish safety and warmth through steady holding.",
    actions: [
      "Stand and hold each other chest-to-chest without speaking.",
      "Breathe in sync for one full minute.",
      "Relax shoulders and jaw while keeping contact.",
      "Share one sentence of reassurance before moving on.",
    ],
    tags: ["6 minutes · Gentle", "Best for reassurance and trust"],
  },
  movement: {
    ritualId: "spinal_rocking",
    title: "Spinal Rocking — Back to Back",
    purpose: "Discharge tension and restore shared rhythm quickly.",
    actions: [
      "Sit back-to-back with both spines upright.",
      "Inhale as one partner rocks back and the other leans forward.",
      "Switch on each exhale for ten slow cycles.",
      "Finish in stillness and choose one intentional touch.",
    ],
    tags: ["5 minutes · Medium", "Best for rhythm reset"],
  },
  stillness: {
    ritualId: "karezza",
    title: "Karezza — Union Without Discharge",
    purpose: "Slow down and stay in contact without pressure or performance.",
    actions: [
      "Choose still contact: hand-to-heart or seated embrace.",
      "Breathe slowly and keep movement minimal for two minutes.",
      "Name one need and one boundary before deepening.",
      "Close with a soft exhale together and appreciation.",
    ],
    tags: ["7 minutes · Gentle", "Best for pacing and calm desire"],
  },
  sound: {
    ritualId: "the_unsaid_voice",
    title: "The Unsaid Voice",
    purpose: "Release what is held inside so touch can feel safer and clearer.",
    actions: [
      "Take one breath together and soften your tone.",
      "Each partner says one truth in a single sentence.",
      "The listener mirrors the sentence back before responding.",
      "End with one shared phrase: I hear you, I stay with you.",
    ],
    tags: ["6 minutes · Gentle", "Best for emotional clarity"],
  },
  union: {
    ritualId: "slow_sex",
    title: "Slow Sex — Diana Richardson's Core Practice",
    purpose: "Build intimacy through presence, pacing, and full-body awareness.",
    actions: [
      "Begin with two minutes of breath and eye contact.",
      "Choose slow, minimal movement and stay aware of comfort.",
      "Pause often to check if both partners remain open.",
      "End in stillness before separating contact.",
    ],
    tags: ["9 minutes · Medium", "Best for conscious union"],
  },
  emotional_clearing: {
    ritualId: "appreciation_witness",
    title: "Appreciation & Witness",
    purpose: "Repair emotional distance through truth, witnessing, and appreciation.",
    actions: [
      "Each partner names one feeling and one unmet need.",
      "The listener mirrors without defending or fixing.",
      "Each shares one appreciation for the other.",
      "Agree on one gentle repair move for tonight.",
    ],
    tags: ["7 minutes · Gentle", "Best for repair and reconnection"],
  },
  energy: {
    ritualId: "microcosmic_orbit_dual",
    title: "Microcosmic Orbit in Dual Cultivation",
    purpose: "Channel shared charge into grounded vitality and presence.",
    actions: [
      "Sit aligned and breathe into lower belly for five rounds.",
      "On inhale, imagine energy rising along the spine.",
      "On exhale, imagine energy descending through the front body.",
      "Stay synchronized and close with one gratitude sentence.",
    ],
    tags: ["8 minutes · Medium", "Best for energy circulation"],
  },
};

const TonightPathExperience = ({
  lang,
  weatherMatch,
  weatherStateMode,
  myWeather,
  belovedWeather,
  tonightPathStatus,
  coupleId,
  selectedDailyMainCard,
  alternateCards,
  weatherEngineDebug,
}: Props) => {
  const copy = copyByLang[lang];
  const [copied, setCopied] = useState(false);
  const themeResultsRef = useRef<HTMLDivElement | null>(null);
  const resolvedTonightPath = useMemo(
    () =>
      resolveTonightPath({
        weatherA: myWeather?.key ?? null,
        weatherB: belovedWeather?.key ?? null,
        normalizedKey: weatherEngineDebug.normalizedKey,
        archetype: weatherEngineDebug.archetype,
        coupleId: coupleId ?? null,
        selectedMainCard: selectedDailyMainCard,
        alternates: alternateCards,
      }),
    [
      alternateCards,
      belovedWeather?.key,
      coupleId,
      myWeather?.key,
      selectedDailyMainCard,
      weatherEngineDebug.archetype,
      weatherEngineDebug.normalizedKey,
    ],
  );

  const availableThemes = resolvedTonightPath.themes;
  const [activeTheme, setActiveTheme] = useState<ThemeKey>(resolvedTonightPath.defaultTheme);
  const [themeFocused, setThemeFocused] = useState(false);

  useEffect(() => {
    if (!availableThemes.length) return;
    if (!availableThemes.includes(activeTheme)) {
      setActiveTheme(availableThemes[0]);
      setThemeFocused(false);
    }
  }, [activeTheme, availableThemes, resolvedTonightPath.defaultTheme]);

  useEffect(() => {
    // Always return to button-only state when the weather pair or selected main ritual changes.
    setThemeFocused(false);
  }, [
    weatherEngineDebug.normalizedKey,
    weatherEngineDebug.partnerAWeather,
    weatherEngineDebug.partnerBWeather,
    weatherEngineDebug.selectedMainCardId,
  ]);

  const activeThemePractices = useMemo(() => {
    const cards = resolvedTonightPath.themedRituals[activeTheme] ?? [];
    const themeOverride = themePracticeOverrides[activeTheme] ?? null;
    const themed = cards.map((card) => toPracticeItem(card, activeTheme, copy, themeOverride));
    if (themed.length) return themed;

    const fallbackCard = ritualLibraryMap.get(themeOverride?.ritualId ?? "");
    if (!fallbackCard) return themed;
    return [toPracticeItem(fallbackCard, activeTheme, copy, themeOverride)];
  }, [activeTheme, copy, resolvedTonightPath.themedRituals]);

  const primaryRitual = useMemo(() => {
    const card = resolvedTonightPath.mainCard;
    if (!card) return null;
    const mainTheme =
      availableThemes.find((theme) =>
        (resolvedTonightPath.themedRituals[theme] ?? []).some((item) => item.id === card.id),
      ) ?? resolvedTonightPath.defaultTheme;
    return toPracticeItem(card, mainTheme, copy, null);
  }, [availableThemes, copy, resolvedTonightPath]);
  const mainSteps = primaryRitual?.actions?.slice(0, 4) ?? copy.fallbackSteps;
  const positionCues = copy.fallbackPositions;
  const suggestionText = primaryRitual
    ? [primaryRitual.actions[0], primaryRitual.actions[1]].filter(Boolean).join(" ")
    : copy.waitingBody;
  const visibleThemes = availableThemes;

  const quote = useMemo(() => {
    const seed = `${new Date().toDateString()}:${weatherEngineDebug.normalizedKey ?? tonightPathStatus.waitingOn ?? weatherStateMode}`;
    return copy.quotes[hashString(seed) % copy.quotes.length];
  }, [copy.quotes, tonightPathStatus.waitingOn, weatherEngineDebug.normalizedKey, weatherStateMode]);

  const matchHeadline = tonightPathStatus.isTonightPathReady && weatherEngineDebug.archetype
    ? weatherEngineDebug.archetype.replaceAll("_", " ")
    : tonightPathStatus.isTonightPathReady && weatherMatch
      ? `${weatherMatch.archetype.title} · ${weatherMatch.pairLabel}`
      : tonightPathStatus.waitingTitle;

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
        <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
          {matchHeadline}
        </h2>
        {tonightPathStatus.isTonightPathReady && (weatherMatch?.summary || primaryRitual?.purpose) ? (
          <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">
            {weatherMatch?.summary ?? primaryRitual?.purpose}
          </p>
        ) : null}

        <div className="mt-5 grid items-start gap-4 lg:grid-cols-[1.05fr_1fr_1fr]">
          <article className="flex h-full flex-col rounded-[24px] border border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-card/65 to-card/35 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200/90">{copy.ritualLabel}</p>
            <h3 className="mt-2 font-display text-2xl text-foreground">
              {primaryRitual?.title ?? tonightPathStatus.waitingTitle}
            </h3>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-amber-100/80">{copy.ritualPurposeLabel}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {primaryRitual?.purpose ?? tonightPathStatus.waitingBody}
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

            <div className="mt-3 rounded-xl border border-amber-300/30 bg-amber-500/10 p-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-amber-200">{copy.quoteLabel}</p>
              <p className="mt-2 font-display text-lg leading-7 text-foreground/90">“{quote.quote}”</p>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">{quote.author}</p>
            </div>
          </article>

          <article className="flex h-full flex-col rounded-[24px] border border-fuchsia-300/25 bg-gradient-to-br from-fuchsia-500/12 via-card/65 to-card/35 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-200/90">{copy.themesLabel}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {visibleThemes.map((theme) => {
                const meta = copy.themeMeta[theme];
                const active = activeTheme === theme;
                const Icon = themeVisuals[theme].icon;
                return (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => {
                      setActiveTheme(theme);
                      setThemeFocused(true);
                      window.requestAnimationFrame(() => {
                        themeResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      });
                    }}
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

            {themeFocused && activeThemePractices.length ? (
              <div ref={themeResultsRef} className="mt-3 flex-1 space-y-2">
                {activeThemePractices.slice(0, 1).map((practice) => (
                  <div key={practice.id} className={`rounded-xl border p-3 ${themeVisuals[practice.theme].wrapClass}`}>
                    <ol className="space-y-1 text-sm leading-6 text-foreground/90">
                      {practice.actions.slice(0, 5).map((action, index) => (
                        <li key={`${practice.id}-${action}`}>{index + 1}. {action}</li>
                      ))}
                    </ol>
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
                  {primaryRitual ? copy.respectContextLine : tonightPathStatus.waitingBody}
                </p>
                {weatherMatch?.interpretation ? <p className="mt-1 text-sm leading-6 text-foreground/90">{weatherMatch.interpretation}</p> : null}
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

            </div>
          </article>
        </div>

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
    resolvedThemes: resolvedTonightPath.themes,
    activeTheme,
    themedCounts: Object.fromEntries(
      resolvedTonightPath.themes.map((theme) => [theme, resolvedTonightPath.themedRituals[theme]?.length ?? 0]),
    ),
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
