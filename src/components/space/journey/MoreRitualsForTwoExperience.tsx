import { useEffect, useMemo, useState } from "react";
import {
  BookHeart,
  Brain,
  Check,
  Compass,
  Copy,
  Hand,
  HeartHandshake,
  MessageCircleHeart,
  Sparkles,
  Wind,
} from "lucide-react";

import type { Language } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import type { WeatherMatchResult, RitualRecommendation } from "@/lib/weatherMatch";
import RitualTimerButton from "@/components/ritual/RitualTimerButton";

type ThemeKey =
  | "breathing"
  | "massage"
  | "touch_rituals"
  | "positions"
  | "quotes"
  | "sacred_guide"
  | "wisdom_oracle"
  | "reconnect";

type RitualRow = {
  id: string;
  title: string;
  hook: string | null;
  category: string;
  duration: string | null;
  tone: string | null;
  intensity: number | null;
  premium_required: boolean;
  steps: unknown;
};

type PathwayRow = {
  id: string;
  title: string;
  description: string | null;
  duration_days: number;
  premium_required: boolean;
};

type ActionCard = {
  id: string;
  title: string;
  purpose: string;
  steps: string[];
  tags: string[];
  source: string;
  theme: ThemeKey;
  shareText: string;
  premium?: boolean;
};

type Props = {
  lang: Language;
  weatherMatch: WeatherMatchResult | null;
  isPremium: boolean;
  canSend: boolean;
  coupleId?: string | null;
  onSend?: (message: string) => Promise<boolean>;
};

const themeOrder: ThemeKey[] = [
  "breathing",
  "massage",
  "touch_rituals",
  "positions",
  "quotes",
  "sacred_guide",
  "wisdom_oracle",
  "reconnect",
];

const copyByLang: Record<
  Language,
  {
    eyebrow: string;
    title: string;
    intro: string;
    filtersLabel: string;
    hiddenHint: string;
    noCards: string;
    copy: string;
    copied: string;
    send: string;
    sent: string;
    premiumTag: string;
    themeMeta: Record<ThemeKey, { title: string; subtitle: string; icon: typeof Sparkles; toneClass: string }>;
    sourceLabels: {
      ritualLibrary: string;
      positionDeck: string;
      sacredGuide: string;
      wisdomOracle: string;
      reconnect: string;
      couplePathways: string;
      tonightPath: string;
      quotePractice: string;
    };
  }
> = {
  en: {
    eyebrow: "More Rituals For Two",
    title: "Practices That Bring You Back To Each Other",
    intro:
      "Choose the ritual, reflection, or intimate practice that meets this moment. Each offering is here to help couples return to presence, deepen understanding, and make love a lived practice.",
    filtersLabel: "Choose a theme",
    hiddenHint: "Only the selected theme is shown to keep this page calm and easy to scan.",
    noCards: "No practices yet in this theme.",
    copy: "Copy practice",
    copied: "Copied",
    send: "Send to partner",
    sent: "Sent",
    premiumTag: "Premium",
    themeMeta: {
      breathing: {
        title: "Breathing",
        subtitle: "Settle nervous systems before touch.",
        icon: Wind,
        toneClass: "border-cyan-300/30 bg-gradient-to-br from-cyan-500/12 via-card/70 to-card/35",
      },
      massage: {
        title: "Massage",
        subtitle: "Warm regulation through slow body care.",
        icon: Hand,
        toneClass: "border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-card/70 to-card/35",
      },
      touch_rituals: {
        title: "Touch Rituals",
        subtitle: "Intentional touch with consent and pacing.",
        icon: HeartHandshake,
        toneClass: "border-rose-300/30 bg-gradient-to-br from-rose-500/12 via-card/70 to-card/35",
      },
      positions: {
        title: "Positions",
        subtitle: "Simple embodied forms for closeness.",
        icon: BookHeart,
        toneClass: "border-fuchsia-300/30 bg-gradient-to-br from-fuchsia-500/12 via-card/70 to-card/35",
      },
      quotes: {
        title: "Quote Practice",
        subtitle: "One sentence that turns insight into action.",
        icon: MessageCircleHeart,
        toneClass: "border-violet-300/30 bg-gradient-to-br from-violet-500/12 via-card/70 to-card/35",
      },
      sacred_guide: {
        title: "Sacred Guide",
        subtitle: "Fast decision support for tonight's context.",
        icon: Compass,
        toneClass: "border-emerald-300/30 bg-gradient-to-br from-emerald-500/12 via-card/70 to-card/35",
      },
      wisdom_oracle: {
        title: "Wisdom Oracle",
        subtitle: "Relationship intelligence translated into action.",
        icon: Brain,
        toneClass: "border-sky-300/30 bg-gradient-to-br from-sky-500/12 via-card/70 to-card/35",
      },
      reconnect: {
        title: "Reconnect",
        subtitle: "Repair tension and return to safety quickly.",
        icon: Sparkles,
        toneClass: "border-orange-300/30 bg-gradient-to-br from-orange-500/12 via-card/70 to-card/35",
      },
    },
    sourceLabels: {
      ritualLibrary: "Ritual library",
      positionDeck: "Position deck",
      sacredGuide: "Sacred Guide",
      wisdomOracle: "Wisdom Oracle",
      reconnect: "Reconnect flow",
      couplePathways: "Couple pathways",
      tonightPath: "Tonight Path",
      quotePractice: "Quote practice",
    },
  },
  fr: {
    eyebrow: "Plus de rituels à deux",
    title: "Tous les outils du couple sur une seule page",
    intro:
      "Choisissez un thème, ouvrez une pratique, puis passez à l'action immédiatement. Tout reste sur cette page pour éviter une navigation confuse.",
    filtersLabel: "Choisissez un thème",
    hiddenHint: "Seul le thème sélectionné est affiché pour garder cette page claire et facile à lire.",
    noCards: "Pas encore de pratique dans ce thème.",
    copy: "Copier la pratique",
    copied: "Copié",
    send: "Envoyer au partenaire",
    sent: "Envoyé",
    premiumTag: "Premium",
    themeMeta: {
      breathing: {
        title: "Respiration",
        subtitle: "Apaiser le système nerveux avant le toucher.",
        icon: Wind,
        toneClass: "border-cyan-300/30 bg-gradient-to-br from-cyan-500/12 via-card/70 to-card/35",
      },
      massage: {
        title: "Massage",
        subtitle: "Régulation corporelle douce et chaleur.",
        icon: Hand,
        toneClass: "border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-card/70 to-card/35",
      },
      touch_rituals: {
        title: "Rituels de toucher",
        subtitle: "Toucher intentionnel avec consentement.",
        icon: HeartHandshake,
        toneClass: "border-rose-300/30 bg-gradient-to-br from-rose-500/12 via-card/70 to-card/35",
      },
      positions: {
        title: "Positions",
        subtitle: "Formes simples pour la proximité.",
        icon: BookHeart,
        toneClass: "border-fuchsia-300/30 bg-gradient-to-br from-fuchsia-500/12 via-card/70 to-card/35",
      },
      quotes: {
        title: "Pratique citation",
        subtitle: "Une phrase qui devient action.",
        icon: MessageCircleHeart,
        toneClass: "border-violet-300/30 bg-gradient-to-br from-violet-500/12 via-card/70 to-card/35",
      },
      sacred_guide: {
        title: "Guide sacré",
        subtitle: "Décision rapide pour ce soir.",
        icon: Compass,
        toneClass: "border-emerald-300/30 bg-gradient-to-br from-emerald-500/12 via-card/70 to-card/35",
      },
      wisdom_oracle: {
        title: "Oracle de sagesse",
        subtitle: "Intelligence relationnelle en actions concrètes.",
        icon: Brain,
        toneClass: "border-sky-300/30 bg-gradient-to-br from-sky-500/12 via-card/70 to-card/35",
      },
      reconnect: {
        title: "Reconnexion",
        subtitle: "Réparer la tension et revenir à la sécurité.",
        icon: Sparkles,
        toneClass: "border-orange-300/30 bg-gradient-to-br from-orange-500/12 via-card/70 to-card/35",
      },
    },
    sourceLabels: {
      ritualLibrary: "Bibliothèque de rituels",
      positionDeck: "Deck positions",
      sacredGuide: "Guide sacré",
      wisdomOracle: "Oracle de sagesse",
      reconnect: "Flow de réparation",
      couplePathways: "Parcours du couple",
      tonightPath: "Chemin de ce soir",
      quotePractice: "Pratique citation",
    },
  },
  cs: {
    eyebrow: "Více rituálů pro dva",
    title: "Všechny nástroje páru na jedné stránce",
    intro:
      "Vyberte téma, otevřete jednu praxi a hned ji použijte. Vše zůstává na této stránce, aby se pár neztrácel v navigaci.",
    filtersLabel: "Vyberte téma",
    hiddenHint: "Zobrazuje se jen vybrané téma, aby stránka zůstala klidná a přehledná.",
    noCards: "V tomto tématu zatím nejsou praxe.",
    copy: "Kopírovat praxi",
    copied: "Zkopírováno",
    send: "Poslat partnerovi",
    sent: "Odesláno",
    premiumTag: "Premium",
    themeMeta: {
      breathing: {
        title: "Dýchání",
        subtitle: "Zklidnění nervového systému před dotekem.",
        icon: Wind,
        toneClass: "border-cyan-300/30 bg-gradient-to-br from-cyan-500/12 via-card/70 to-card/35",
      },
      massage: {
        title: "Masáž",
        subtitle: "Jemná regulace těla a zahřátí.",
        icon: Hand,
        toneClass: "border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-card/70 to-card/35",
      },
      touch_rituals: {
        title: "Rituály doteku",
        subtitle: "Vědomý dotek se souhlasem a tempem.",
        icon: HeartHandshake,
        toneClass: "border-rose-300/30 bg-gradient-to-br from-rose-500/12 via-card/70 to-card/35",
      },
      positions: {
        title: "Pozice",
        subtitle: "Jednoduché pozice pro blízkost.",
        icon: BookHeart,
        toneClass: "border-fuchsia-300/30 bg-gradient-to-br from-fuchsia-500/12 via-card/70 to-card/35",
      },
      quotes: {
        title: "Citátová praxe",
        subtitle: "Jedna věta, která se promění v akci.",
        icon: MessageCircleHeart,
        toneClass: "border-violet-300/30 bg-gradient-to-br from-violet-500/12 via-card/70 to-card/35",
      },
      sacred_guide: {
        title: "Posvátný průvodce",
        subtitle: "Rychlé vedení pro dnešní večer.",
        icon: Compass,
        toneClass: "border-emerald-300/30 bg-gradient-to-br from-emerald-500/12 via-card/70 to-card/35",
      },
      wisdom_oracle: {
        title: "Oracle moudrosti",
        subtitle: "Vztahová inteligence převedená do kroků.",
        icon: Brain,
        toneClass: "border-sky-300/30 bg-gradient-to-br from-sky-500/12 via-card/70 to-card/35",
      },
      reconnect: {
        title: "Znovunapojení",
        subtitle: "Rychlá oprava napětí a návrat do bezpečí.",
        icon: Sparkles,
        toneClass: "border-orange-300/30 bg-gradient-to-br from-orange-500/12 via-card/70 to-card/35",
      },
    },
    sourceLabels: {
      ritualLibrary: "Knihovna rituálů",
      positionDeck: "Balíček pozic",
      sacredGuide: "Posvátný průvodce",
      wisdomOracle: "Oracle moudrosti",
      reconnect: "Flow opravy",
      couplePathways: "Párové cesty",
      tonightPath: "Dnešní cesta",
      quotePractice: "Praxe s citátem",
    },
  },
};

const classifyRecommendationTheme = (recommendation: RitualRecommendation): ThemeKey => {
  const joined = [
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

  if (/(breath|respir|dech|dých)/.test(joined)) return "breathing";
  if (/(massage|bodywork|pressure|masáž)/.test(joined)) return "massage";
  if (/(repair|reconnect|safety|secure|uklid|name|mirror)/.test(joined)) return "reconnect";
  if (/(oracle|guide|insight)/.test(joined)) return "wisdom_oracle";
  return "touch_rituals";
};

const normalizeSteps = (input: unknown): string[] => {
  if (Array.isArray(input)) {
    return input.filter((value): value is string => typeof value === "string" && value.trim().length > 0);
  }
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed)) {
        return parsed.filter((value): value is string => typeof value === "string" && value.trim().length > 0);
      }
    } catch {
      return input ? [input] : [];
    }
  }
  return [];
};

const MoreRitualsForTwoExperience = ({ lang, weatherMatch, isPremium, canSend, coupleId, onSend }: Props) => {
  const copy = copyByLang[lang];
  const [ritualRows, setRitualRows] = useState<RitualRow[]>([]);
  const [pathwayRows, setPathwayRows] = useState<PathwayRow[]>([]);
  const [activeTheme, setActiveTheme] = useState<ThemeKey>("breathing");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sentId, setSentId] = useState<string | null>(null);
  const [sendingId, setSendingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const [{ data: rituals }, { data: pathways }] = await Promise.all([
        supabase
          .from("ritual_items")
          .select("id, title, hook, category, duration, tone, intensity, premium_required, steps")
          .order("premium_required", { ascending: true })
          .order("created_at", { ascending: false }),
        supabase
          .from("pathways")
          .select("id, title, description, duration_days, premium_required")
          .order("premium_required", { ascending: true })
          .order("duration_days", { ascending: true }),
      ]);

      setRitualRows((rituals as RitualRow[] | null) ?? []);
      setPathwayRows((pathways as PathwayRow[] | null) ?? []);
    };

    void load();
  }, []);

  const cards = useMemo<ActionCard[]>(() => {
    const fromWeather: ActionCard[] =
      weatherMatch?.recommendations.slice(0, 4).map((rec, index) => ({
        id: `weather-${rec.id}`,
        title: rec.title,
        purpose: rec.description || rec.subtitle,
        steps: rec.ritualSteps.slice(0, 4),
        tags: [rec.ritualDuration || `${7 + index} min`, rec.intimacyLevel || rec.primaryNeed],
        source: copy.sourceLabels.tonightPath,
        theme: classifyRecommendationTheme(rec),
        shareText: rec.messageSuggestion,
      })) ?? [];

    const fromRitualLibrary: ActionCard[] = ritualRows.map((row) => {
      const normalizedCategory = row.category?.toLowerCase() || "touch";
      const mappedTheme: ThemeKey =
        normalizedCategory === "breath" || normalizedCategory === "bedtime"
          ? "breathing"
          : normalizedCategory === "reconnect"
            ? "reconnect"
            : normalizedCategory === "polarity" || normalizedCategory === "presence" || normalizedCategory === "touch" || normalizedCategory === "playful"
              ? "touch_rituals"
              : "touch_rituals";

      const steps = normalizeSteps(row.steps);
      const fallbackStep = row.hook || row.title;
      const intensity = Math.max(0, Math.min(4, row.intensity ?? 1));

      return {
        id: `library-${row.id}`,
        title: row.title,
        purpose: row.hook || "A guided micro-practice for couple connection.",
        steps: steps.length ? steps.slice(0, 4) : [fallbackStep],
        tags: [
          row.duration || "5-10 min",
          row.tone || "Attuned pacing",
          `${"●".repeat(intensity)}${"○".repeat(4 - intensity)}`,
        ],
        source: copy.sourceLabels.ritualLibrary,
        theme: mappedTheme,
        shareText: `Let's try ${row.title} tonight. ${row.hook ?? ""}`.trim(),
        premium: row.premium_required && !isPremium,
      };
    });

    const positionCards: ActionCard[] = [
      {
        id: "position-seated-closeness",
        title: "Seated closeness",
        purpose: "A low-pressure posture to reconnect before deeper intimacy.",
        steps: [
          "Sit face to face with your knees lightly touching.",
          "Keep one hand on your own heart and one on your partner's forearm.",
          "Stay in slow eye contact for three breaths.",
        ],
        tags: ["6 min", "Emotional safety first"],
        source: copy.sourceLabels.positionDeck,
        theme: "positions",
        shareText: "Can we start with seated closeness tonight and move slowly together?",
      },
      {
        id: "position-hand-heart",
        title: "Hand-to-heart reset",
        purpose: "Ground emotional overwhelm and rebuild trust through simple contact.",
        steps: [
          "One partner receives while the other offers hand-to-heart contact.",
          "Switch after 90 seconds.",
          "Each partner says one honest need in one sentence.",
        ],
        tags: ["7 min", "Best for tired evenings"],
        source: copy.sourceLabels.positionDeck,
        theme: "positions",
        shareText: "Let's do hand-to-heart reset first so both of us feel safe and seen.",
      },
    ];

    const guideCards: ActionCard[] = [
      {
        id: "guide-energy-check",
        title: "Energy check then choose",
        purpose: "Pick one path based on energy, time, and privacy in under 20 seconds.",
        steps: [
          "Choose energy: low, medium, or high.",
          "Choose time: 3, 7, or 12 minutes.",
          "Choose context: public, private, or intimate.",
          "Run the recommended practice immediately.",
        ],
        tags: ["Quick decision", "Low cognitive load"],
        source: copy.sourceLabels.sacredGuide,
        theme: "sacred_guide",
        shareText: "Let's do a quick Sacred Guide check and follow one clear practice tonight.",
      },
    ];

    const oracleCards: ActionCard[] = [
      {
        id: "oracle-tone-sync",
        title: "Oracle tone sync",
        purpose: "Align on the emotional tone before choosing physical intensity.",
        steps: [
          "Pick one tone together: romantic, playful, healing, erotic, or devotional.",
          "Pick tonight's focus: bonding, attraction, repair, or growth.",
          "Name one move to open with and one move to avoid.",
        ],
        tags: ["3-5 min", "Clarity before action"],
        source: copy.sourceLabels.wisdomOracle,
        theme: "wisdom_oracle",
        shareText: "Can we align our tone first so tonight feels easy and connected?",
      },
    ];

    const reconnectCards: ActionCard[] = [
      {
        id: "reconnect-five-step",
        title: "Five-step repair loop",
        purpose: "A practical flow to reduce friction and restore emotional contact.",
        steps: [
          "Breathe slowly for one minute.",
          "Name one feeling without blame.",
          "Own one part you can repair.",
          "Ask clearly for one need.",
          "Close with appreciation and one next step.",
        ],
        tags: ["6-10 min", "Conflict to connection"],
        source: copy.sourceLabels.reconnect,
        theme: "reconnect",
        shareText: "Let's run our five-step reconnect loop so we end tonight closer.",
      },
      ...pathwayRows.slice(0, 4).map((pathway) => ({
        id: `pathway-${pathway.id}`,
        title: pathway.title,
        purpose: pathway.description || "A guided multi-day path for steady couple growth.",
        steps: [
          "Start with day one tonight.",
          "Track one shared intention before bed.",
          "Return tomorrow for the next micro-step.",
        ],
        tags: [`${pathway.duration_days} days`, "Consistency over intensity"],
        source: copy.sourceLabels.couplePathways,
        theme: "reconnect" as const,
        shareText: `Let's start ${pathway.title} together and keep a simple daily rhythm.`,
        premium: pathway.premium_required && !isPremium,
      })),
    ];

    const quoteCards: ActionCard[] = [
      {
        id: "quote-presence",
        title: "Quote into action: presence",
        purpose: "Use one line of wisdom as a concrete behavior for tonight.",
        steps: [
          "Read: Presence is the doorway where love and desire can meet.",
          "Each partner says one way they will stay present tonight.",
          "Check in after 10 minutes: Did we stay with that intention?",
        ],
        tags: ["2 min setup", "Great before touch"],
        source: copy.sourceLabels.quotePractice,
        theme: "quotes",
        shareText: "Tonight let's choose one quote and turn it into one real behavior.",
      },
      {
        id: "quote-slowness",
        title: "Quote into action: slowness",
        purpose: "Translate sacred pacing into practical consent and comfort.",
        steps: [
          "Read: Slowness lets intimacy become truthful, not performative.",
          "Agree on one pace word: softer, same, or more.",
          "Use that word throughout the ritual.",
        ],
        tags: ["2 min setup", "Consent-forward"],
        source: copy.sourceLabels.quotePractice,
        theme: "quotes",
        shareText: "Can we keep tonight slow and check in with softer, same, or more?",
      },
    ];

    const massageCards: ActionCard[] = [
      {
        id: "massage-shoulder-melt",
        title: "Shoulder melt reset",
        purpose: "Release tension so both bodies can soften before closeness.",
        steps: [
          "Partner A receives 90 seconds of shoulder pressure.",
          "Partner B receives 90 seconds next.",
          "Both pause for three deep breaths before continuing.",
        ],
        tags: ["8 min", "Grounding touch"],
        source: copy.sourceLabels.reconnect,
        theme: "massage",
        shareText: "Let's do a shoulder melt reset before anything intense tonight.",
      },
    ];

    return [
      ...fromWeather,
      ...fromRitualLibrary,
      ...positionCards,
      ...guideCards,
      ...oracleCards,
      ...reconnectCards,
      ...quoteCards,
      ...massageCards,
    ];
  }, [
    copy.sourceLabels.couplePathways,
    copy.sourceLabels.positionDeck,
    copy.sourceLabels.quotePractice,
    copy.sourceLabels.reconnect,
    copy.sourceLabels.ritualLibrary,
    copy.sourceLabels.sacredGuide,
    copy.sourceLabels.tonightPath,
    copy.sourceLabels.wisdomOracle,
    isPremium,
    pathwayRows,
    ritualRows,
    weatherMatch,
  ]);

  const countsByTheme = useMemo(
    () =>
      themeOrder.reduce<Record<ThemeKey, number>>((acc, theme) => {
        acc[theme] = cards.filter((card) => card.theme === theme).length;
        return acc;
      }, {} as Record<ThemeKey, number>),
    [cards],
  );

  const visibleThemes = useMemo(
    () => themeOrder.filter((theme) => countsByTheme[theme] > 0),
    [countsByTheme],
  );

  useEffect(() => {
    if (!visibleThemes.length) return;
    if (!visibleThemes.includes(activeTheme)) {
      setActiveTheme(visibleThemes[0]);
    }
  }, [activeTheme, visibleThemes]);

  const activeCards = useMemo(
    () => cards.filter((card) => card.theme === activeTheme),
    [activeTheme, cards],
  );

  const copyCard = async (card: ActionCard) => {
    try {
      await navigator.clipboard.writeText(card.shareText);
      setCopiedId(card.id);
      window.setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // ignore clipboard errors
    }
  };

  const sendCard = async (card: ActionCard) => {
    if (!onSend || !canSend) return;
    setSendingId(card.id);
    try {
      const sent = await onSend(card.shareText);
      if (sent) {
        setSentId(card.id);
        window.setTimeout(() => setSentId(null), 1700);
      }
    } finally {
      setSendingId(null);
    }
  };

  return (
    <section className="rounded-[30px] border border-primary/20 bg-gradient-to-br from-primary/12 via-background/94 to-background/88 p-4 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.42)] md:p-6">
      <p className="text-xs uppercase tracking-[0.24em] text-primary/80">{copy.eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">{copy.title}</h2>
      <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">{copy.intro}</p>

      <div className="mt-4 rounded-2xl border border-border/30 bg-card/45 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{copy.filtersLabel}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {visibleThemes.map((theme) => {
            const meta = copy.themeMeta[theme];
            const Icon = meta.icon;
            const active = activeTheme === theme;
            return (
              <button
                key={theme}
                type="button"
                onClick={() => setActiveTheme(theme)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition-all ${
                  active
                    ? "border-primary/35 bg-primary/14 text-foreground"
                    : "border-border/30 bg-background/45 text-muted-foreground hover:border-border/50 hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {meta.title}
                <span className="rounded-full border border-border/35 bg-background/55 px-1.5 py-0.5 text-[10px] text-foreground/85">
                  {countsByTheme[theme]}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">{copy.hiddenHint}</p>
      </div>

      <div className="mt-4">
        <div className={`rounded-2xl border p-4 ${copy.themeMeta[activeTheme].toneClass}`}>
          <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{copy.themeMeta[activeTheme].title}</p>
          <p className="mt-2 text-sm leading-6 text-foreground/90">{copy.themeMeta[activeTheme].subtitle}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {activeCards.length === 0 ? (
          <div className="rounded-2xl border border-border/30 bg-card/45 p-5 text-sm text-muted-foreground">
            {copy.noCards}
          </div>
        ) : (
          activeCards.map((card) => (
            <article key={card.id} className={`rounded-2xl border p-4 ${copy.themeMeta[card.theme].toneClass}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl text-foreground">{card.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-foreground/85">{card.purpose}</p>
                </div>
                {card.premium ? (
                  <span className="rounded-full border border-amber-300/35 bg-amber-500/14 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">
                    {copy.premiumTag}
                  </span>
                ) : null}
              </div>

              <ul className="mt-3 space-y-1 text-sm leading-6 text-muted-foreground">
                {card.steps.slice(0, 4).map((step, index) => (
                  <li key={`${card.id}-step-${index}`}>• {step}</li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span key={`${card.id}-${tag}`} className="break-words rounded-lg border border-border/30 bg-background/55 px-2 py-1 text-[11px] text-foreground/85">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{card.source}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void copyCard(card)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/35 bg-card/50 px-3 py-2 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/65"
                >
                  {copiedId === card.id ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedId === card.id ? copy.copied : copy.copy}
                </button>
                <button
                  type="button"
                  onClick={() => void sendCard(card)}
                  disabled={!canSend || !onSend || sendingId === card.id}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/12 px-3 py-2 text-xs text-foreground transition-all hover:border-primary/45 hover:bg-primary/18 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sentId === card.id ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <MessageCircleHeart className="h-3.5 w-3.5" />}
                  {sentId === card.id ? copy.sent : copy.send}
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default MoreRitualsForTwoExperience;
