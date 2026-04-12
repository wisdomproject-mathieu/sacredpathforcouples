import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Heart,
  Lock,
  MessageCircle,
  Sparkles,
  Stars,
  ThumbsDown,
  ThumbsUp,
  type LucideIcon,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type RitualItem = Tables<"ritual_items">;
type Pathway = Tables<"pathways">;
type PartnerMessage = Tables<"partner_messages">;
type AltarItem = Tables<"altar_items">;

type DailyCard = {
  id: string;
  label: string;
  title: string;
  description: string;
  quickInsight: string;
  steps: string[];
  icon: LucideIcon;
  accentClass: string;
};

type ReactionType = "up" | "down" | null;
type ReactionMap = Record<string, ReactionType>;
type FeedbackTotals = Record<string, { up: number; down: number }>;

const quotes = [
  {
    id: "quote-richardson",
    author: "Diana Richardson",
    quote: "When slowness enters intimacy, the body starts telling a much deeper truth.",
  },
  {
    id: "quote-deida",
    author: "David Deida",
    quote: "Love deepens when presence, truth, and attraction are all still welcome in the room.",
  },
  {
    id: "quote-chia",
    author: "Mantak Chia",
    quote: "Breath and awareness turn intensity into nourishment instead of depletion.",
  },
  {
    id: "quote-osho",
    author: "Osho",
    quote: "When lovers meet in awareness, even silence becomes intimate.",
  },
] as const;

const positions = [
  {
    id: "position-hand-on-heart",
    title: "Hand on heart",
    description: "Start chest-to-chest and let safety arrive before intensity.",
  },
  {
    id: "position-back-to-back",
    title: "Back to back",
    description: "Share breath without pressure and let your nervous systems settle together.",
  },
  {
    id: "position-seated-closeness",
    title: "Seated closeness",
    description: "Face each other, stay near, and allow desire to grow from presence.",
  },
  {
    id: "position-synchronized-exhale",
    title: "Synchronized exhale",
    description: "Use a shared exhale to soften the room and open one clear next move.",
  },
] as const;

const templePulses = [
  {
    id: "temple-soft",
    title: "Soft and receptive",
    description: "Tonight favors tenderness, gentle touch, and slow eye contact.",
  },
  {
    id: "temple-playful",
    title: "Playful and alive",
    description: "Bring laughter, curiosity, and one light sensual invitation.",
  },
  {
    id: "temple-devotional",
    title: "Devotional and deep",
    description: "Less noise, more reverence. Stay with breath and heart-led words.",
  },
  {
    id: "temple-magnetic",
    title: "Magnetic and erotic",
    description: "Build anticipation slowly and let polarity unfold without rushing.",
  },
] as const;

const reconnectMoves = [
  {
    id: "reconnect-soft-checkin",
    title: "Soft check-in",
    description: "Ask: “What would help you feel cherished tonight?” and mirror the answer with warmth.",
  },
  {
    id: "reconnect-90-second-reset",
    title: "90-second reset",
    description: "Hold hands, breathe together, and each share one appreciation before anything else.",
  },
  {
    id: "reconnect-devotion-line",
    title: "Devotion line",
    description: "Whisper one line of love and one desire for deeper closeness tonight.",
  },
  {
    id: "reconnect-sensual-pause",
    title: "Sensual pause",
    description: "Pause logistics for five minutes and let touch lead before words.",
  },
] as const;

const hashString = (value: string) =>
  Array.from(value).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 7);

const pickBySeed = <T,>(items: readonly T[], seed: string): T => items[hashString(seed) % items.length];

const clipText = (value: string, max = 96) => {
  if (value.length <= max) return value;
  return `${value.slice(0, max).trimEnd()}...`;
};

const localDayKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const FEEDBACK_TOTALS_KEY = "sacredpath_home_card_feedback_totals_v1";
const feedbackDailyKey = (dayKey: string) => `sacredpath_home_card_feedback_daily_v1_${dayKey}`;

const readFeedbackTotals = (): FeedbackTotals => {
  try {
    const raw = window.localStorage.getItem(FEEDBACK_TOTALS_KEY);
    return raw ? (JSON.parse(raw) as FeedbackTotals) : {};
  } catch {
    return {};
  }
};

const readDailyReactions = (dayKey: string): ReactionMap => {
  try {
    const raw = window.localStorage.getItem(feedbackDailyKey(dayKey));
    return raw ? (JSON.parse(raw) as ReactionMap) : {};
  } catch {
    return {};
  }
};

const writeFeedbackTotals = (value: FeedbackTotals) => {
  window.localStorage.setItem(FEEDBACK_TOTALS_KEY, JSON.stringify(value));
};

const writeDailyReactions = (dayKey: string, value: ReactionMap) => {
  window.localStorage.setItem(feedbackDailyKey(dayKey), JSON.stringify(value));
};

const parseRitualSteps = (steps: RitualItem["steps"]): string[] => {
  if (!Array.isArray(steps)) return [];
  const parsed = steps
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (!item || typeof item !== "object") return "";
      const value = (item as { instruction?: string; step?: string; title?: string; body?: string }).instruction
        ?? (item as { instruction?: string; step?: string; title?: string; body?: string }).step
        ?? (item as { instruction?: string; step?: string; title?: string; body?: string }).title
        ?? (item as { instruction?: string; step?: string; title?: string; body?: string }).body;
      return typeof value === "string" ? value.trim() : "";
    })
    .filter(Boolean);

  return parsed.slice(0, 3);
};

const AppHome = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<PartnerMessage[]>([]);
  const [altarItems, setAltarItems] = useState<AltarItem[]>([]);
  const [rituals, setRituals] = useState<RitualItem[]>([]);
  const [pathways, setPathways] = useState<Pathway[]>([]);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [feedbackTotals, setFeedbackTotals] = useState<FeedbackTotals>({});
  const [dailyReactions, setDailyReactions] = useState<ReactionMap>({});

  useEffect(() => {
    if (!user) return;

    const loadHome = async () => {
      setLoading(true);

      const [{ data: ritualData }, { data: pathwayData }, { data: couple }] = await Promise.all([
        supabase
          .from("ritual_items")
          .select("*")
          .eq("premium_required", false)
          .order("created_at", { ascending: true }),
        supabase
          .from("pathways")
          .select("*")
          .eq("premium_required", false)
          .order("created_at", { ascending: true }),
        supabase
          .from("couples")
          .select("id, partner_a, partner_b")
          .or(`partner_a.eq.${user.id},partner_b.eq.${user.id}`)
          .maybeSingle(),
      ]);

      setRituals((ritualData ?? []).filter((item) => item.item_type === "ritual"));
      setPathways(pathwayData ?? []);

      if (!couple) {
        setMessages([]);
        setAltarItems([]);
        setLoading(false);
        return;
      }

      const [{ data: messageData }, { data: altarData }] = await Promise.all([
        supabase
          .from("partner_messages")
          .select("*")
          .eq("couple_id", couple.id)
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("altar_items")
          .select("*")
          .eq("couple_id", couple.id)
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

      setMessages(messageData ?? []);
      setAltarItems(altarData ?? []);
      setLoading(false);
    };

    loadHome();
  }, [user]);

  const latestPartnerMessage = useMemo(
    () => messages.find((message) => message.sender_id !== user?.id) ?? null,
    [messages, user?.id]
  );

  const latestSharedMessage = messages[0] ?? null;
  const latestMemory = altarItems[0] ?? null;

  const todayKey = useMemo(() => localDayKey(new Date()), []);
  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(new Date()),
    []
  );

  const signal = useMemo(() => {
    if (latestPartnerMessage) {
      return {
        title: "Partner pulse",
        detail: clipText(latestPartnerMessage.content),
      };
    }

    if (latestMemory) {
      return {
        title: "Saved memory",
        detail: clipText(latestMemory.note || latestMemory.title),
      };
    }

    if (latestSharedMessage) {
      return {
        title: "Shared thread",
        detail: clipText(latestSharedMessage.content),
      };
    }

    return {
      title: "Daily rhythm",
      detail: "A gentle daily plan for modern couples who want depth without decision fatigue.",
    };
  }, [latestMemory, latestPartnerMessage, latestSharedMessage]);

  const dailySeed = useMemo(() => `${todayKey}:${user?.id ?? "guest"}:${signal.detail}`, [signal.detail, todayKey, user?.id]);

  const dailyCards = useMemo<DailyCard[]>(() => {
    const ritualChoice =
      rituals.length > 0
        ? pickBySeed(rituals, `${dailySeed}:ritual`)
        : {
            id: "ritual-fallback",
            title: "Soft arrival ritual",
            hook: "Begin with one minute of touch and one honest sentence.",
          };

    const pathwayChoice =
      pathways.length > 0
        ? pickBySeed(pathways, `${dailySeed}:insight`)
        : {
            id: "insight-fallback",
            title: "Slow down before intensity",
            description: "Presence first, performance second. Let your nervous systems meet.",
          };

    const quoteChoice = pickBySeed(quotes, `${dailySeed}:quote`);
    const positionChoice = pickBySeed(positions, `${dailySeed}:position`);
    const templePulse = pickBySeed(templePulses, `${dailySeed}:temple`);
    const reconnectMove = pickBySeed(reconnectMoves, `${dailySeed}:reconnect`);
    const ritualSteps = parseRitualSteps("steps" in ritualChoice ? ritualChoice.steps : null);

    return [
      {
        id: `ritual-${ritualChoice.id}`,
        label: "Today Ritual",
        title: ritualChoice.title,
        description: ritualChoice.hook || "A grounded opening for emotional and sensual closeness.",
        quickInsight: "A short ritual lowers stress and raises emotional and erotic safety in minutes.",
        steps: ritualSteps.length > 0
          ? ritualSteps
          : ["Take three synchronized breaths.", "Share one feeling each.", "Close with one intentional touch."],
        icon: Sparkles,
        accentClass: "text-amber-300",
      },
      {
        id: quoteChoice.id,
        label: "Today Quote",
        title: `From ${quoteChoice.author}`,
        description: `“${quoteChoice.quote}”`,
        quickInsight: "Use one line of wisdom as tonight's shared intention.",
        steps: ["Read the quote aloud slowly.", "Each partner shares one sentence it awakens.", "Choose one action to embody it tonight."],
        icon: Stars,
        accentClass: "text-sky-300",
      },
      {
        id: `insight-${pathwayChoice.id}`,
        label: "Today Insight",
        title: pathwayChoice.title,
        description:
          pathwayChoice.description || "One practical learning insight for couples building lasting intimacy.",
        quickInsight: "Tiny daily learning loops create long-term relational transformation.",
        steps: ["Name the one insight that matters most today.", "Apply it in one 5-minute moment.", "Reflect together tonight: what shifted?"],
        icon: BookOpen,
        accentClass: "text-violet-300",
      },
      {
        id: positionChoice.id,
        label: "Today Position",
        title: positionChoice.title,
        description: positionChoice.description,
        quickInsight: "Body-led connection can reopen closeness faster than long conversations.",
        steps: ["Set a gentle timer for 3-5 minutes.", "Stay in position and track breath together.", "Share one word each before moving on."],
        icon: Heart,
        accentClass: "text-rose-300",
      },
      {
        id: templePulse.id,
        label: "Today Temple Pulse",
        title: templePulse.title,
        description: templePulse.description,
        quickInsight: "Match the mood of your connection before asking for more intensity.",
        steps: ["Name tonight's emotional tone.", "Choose touch and words that fit that tone.", "Re-check in after five minutes."],
        icon: MessageCircle,
        accentClass: "text-teal-300",
      },
      {
        id: reconnectMove.id,
        label: "Today Reconnect Move",
        title: reconnectMove.title,
        description: reconnectMove.description,
        quickInsight: "One repair micro-move protects trust and attraction over time.",
        steps: ["Pause everything for a brief reconnection.", "Offer one appreciation and one need.", "Close with warmth, not analysis."],
        icon: Heart,
        accentClass: "text-rose-300",
      },
    ];
  }, [dailySeed, pathways, rituals]);

  useEffect(() => {
    if (dailyCards.length === 0) return;
    setExpandedCardId((current) => current ?? dailyCards[0].id);
  }, [dailyCards]);

  useEffect(() => {
    const totals = readFeedbackTotals();
    const reactions = readDailyReactions(todayKey);
    setFeedbackTotals(totals);
    setDailyReactions(reactions);
  }, [todayKey]);

  const handleCardReaction = (cardId: string, incoming: Exclude<ReactionType, null>) => {
    const previous = dailyReactions[cardId] ?? null;
    const next = previous === incoming ? null : incoming;

    const nextTotals: FeedbackTotals = {
      ...feedbackTotals,
      [cardId]: {
        up: feedbackTotals[cardId]?.up ?? 0,
        down: feedbackTotals[cardId]?.down ?? 0,
      },
    };

    if (previous === "up") nextTotals[cardId].up = Math.max(0, nextTotals[cardId].up - 1);
    if (previous === "down") nextTotals[cardId].down = Math.max(0, nextTotals[cardId].down - 1);
    if (next === "up") nextTotals[cardId].up += 1;
    if (next === "down") nextTotals[cardId].down += 1;

    const nextReactions: ReactionMap = {
      ...dailyReactions,
      [cardId]: next,
    };

    setFeedbackTotals(nextTotals);
    setDailyReactions(nextReactions);
    writeFeedbackTotals(nextTotals);
    writeDailyReactions(todayKey, nextReactions);
  };

  return (
    <div className="space-y-5">
      <section className="rounded-[28px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_24px_80px_-40px_rgba(255,170,70,0.35)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">{todayLabel}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">Daily Sacred Starter for Modern Couples</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            Six preselected cards. Calm direction. Shared intimacy momentum. This page renews every day to support your path toward infinite love.
          </p>
        </div>

        <div className="mt-6 rounded-[22px] border border-border/30 bg-card/40 p-4">
          <div className="flex items-center gap-2 text-violet-300">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.18em]">{signal.title}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-foreground/90">{loading ? "Preparing today’s flow..." : signal.detail}</p>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Today&apos;s fixed flow</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">6 cards selected for your relationship today</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dailyCards.map((card) => {
            const Icon = card.icon;
            const expanded = expandedCardId === card.id;
            const reaction = dailyReactions[card.id] ?? null;
            const totals = feedbackTotals[card.id] ?? { up: 0, down: 0 };

            return (
              <div key={card.id} className="rounded-[24px] border border-border/30 bg-card/45 p-5">
                <button type="button" onClick={() => setExpandedCardId(expanded ? null : card.id)} className="w-full text-left">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{card.label}</p>
                      <h3 className="mt-3 font-display text-2xl text-foreground">{loading ? "Selecting..." : card.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${card.accentClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="inline-flex rounded-xl border border-border/30 bg-background/45 p-2 text-muted-foreground">
                        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {loading ? "Calibrating your daily relationship guidance." : card.description}
                  </p>
                </button>

                {!loading && expanded && (
                  <div className="mt-4 space-y-4 rounded-2xl border border-border/30 bg-background/45 p-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-primary/80">Quick insight</p>
                      <p className="mt-2 text-sm leading-6 text-foreground/90">{card.quickInsight}</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-primary/80">Step by step</p>
                      <ol className="mt-2 space-y-2 text-sm leading-6 text-foreground/90">
                        {card.steps.map((step, index) => (
                          <li key={step}>
                            {index + 1}. {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="rounded-xl border border-amber-300/30 bg-amber-500/8 p-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-amber-200">Go deeper</p>
                      <p className="mt-1 text-sm leading-6 text-foreground/90">
                        Unlock 14 additional daily cards built from your couple rhythm for richer sensual progression.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Was this useful?</span>
                      <button
                        type="button"
                        onClick={() => handleCardReaction(card.id, "up")}
                        className={`inline-flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-xs transition-all ${
                          reaction === "up"
                            ? "border-emerald-300/45 bg-emerald-500/15 text-emerald-100"
                            : "border-border/30 bg-card/45 text-foreground hover:border-emerald-300/35"
                        }`}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" /> {totals.up}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCardReaction(card.id, "down")}
                        className={`inline-flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-xs transition-all ${
                          reaction === "down"
                            ? "border-rose-300/45 bg-rose-500/15 text-rose-100"
                            : "border-border/30 bg-card/45 text-foreground hover:border-rose-300/35"
                        }`}
                      >
                        <ThumbsDown className="h-3.5 w-3.5" /> {totals.down}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_58%),linear-gradient(135deg,rgba(245,158,11,0.18),rgba(15,23,42,0.12))] p-4 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.5)]">
          <div className="flex items-center gap-2 text-amber-200">
            <Lock className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.16em]">Locked Daily Expansion</span>
          </div>
          <h3 className="mt-2 font-display text-xl text-foreground">More of this page: 14 extra daily cards</h3>
          <p className="mt-3 text-sm leading-6 text-foreground/90">
            Keep your daily rhythm fresh with additional rituals, quotes, insights, positions, and temple pulses shaped for modern couples.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">14 Extra Cards</span>
            <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Daily Refresh</span>
            <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Sensual Guidance</span>
          </div>
          <Link
            to="/pricing"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-500/14 px-3 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
          >
            See daily expansion plans
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.2),transparent_60%),linear-gradient(135deg,rgba(251,191,36,0.16),rgba(17,24,39,0.14))] p-4 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.46)]">
          <div className="flex items-center gap-2 text-amber-200">
            <Lock className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.16em]">Locked Full Experience</span>
          </div>
          <h3 className="mt-2 font-display text-xl text-foreground">More of Sacred Path across the entire app</h3>
          <p className="mt-3 text-sm leading-6 text-foreground/90">
            Unlock all eight temple doorways, full Sacred Library depth, advanced reconnect systems, Wisdom Oracle innovation, and complete journey intelligence.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Sacred Temple</span>
            <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Sacred Library</span>
            <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Wisdom Oracle</span>
          </div>
          <Link
            to="/pricing"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-500/14 px-3 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
          >
            View full plans
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AppHome;
