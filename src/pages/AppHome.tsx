import { useEffect, useMemo, useState } from "react";
import { BookOpen, Heart, Lock, MessageCircle, Sparkles, Stars, type LucideIcon } from "lucide-react";

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
  icon: LucideIcon;
  accentClass: string;
};

type PremiumDailyCard = {
  id: string;
  area: string;
  title: string;
};

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

const premiumDailyCards: PremiumDailyCard[] = [
  { id: "p-temple-weather", area: "Sacred Temple", title: "Intimacy Weather Deep Decode" },
  { id: "p-temple-polarity", area: "Sacred Temple", title: "Polarity Ritual of the Day" },
  { id: "p-temple-ladder", area: "Sacred Temple", title: "Slow-Burn Position Ladder" },
  { id: "p-library-desire", area: "Sacred Library", title: "Desire Cycles Quick Insight" },
  { id: "p-library-trust", area: "Sacred Library", title: "Trust Repair in 24 Hours" },
  { id: "p-library-author", area: "Sacred Library", title: "Author Reflection Pairing" },
  { id: "p-reconnect-reset", area: "Reconnect", title: "After-Conflict Tender Reset" },
  { id: "p-reconnect-magnetic", area: "Reconnect", title: "Nightly Magnetic Check-In" },
  { id: "p-reconnect-text", area: "Reconnect", title: "Devotion Text Prompt" },
  { id: "p-oracle-timing", area: "Wisdom Oracle", title: "Erotic Timing Forecast" },
  { id: "p-oracle-bridge", area: "Wisdom Oracle", title: "Emotional Bridge Move" },
  { id: "p-oracle-map", area: "Wisdom Oracle", title: "Weeklong Intimacy Map" },
  { id: "p-journey-milestone", area: "Our Journey", title: "Shared Milestone Card" },
  { id: "p-journey-celebration", area: "Our Journey", title: "Celebration Memory Prompt" },
  { id: "p-journey-next", area: "Our Journey", title: "Next Sacred Leap" },
];

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

const AppHome = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<PartnerMessage[]>([]);
  const [altarItems, setAltarItems] = useState<AltarItem[]>([]);
  const [rituals, setRituals] = useState<RitualItem[]>([]);
  const [pathways, setPathways] = useState<Pathway[]>([]);

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

    return [
      {
        id: `ritual-${ritualChoice.id}`,
        label: "Today Ritual",
        title: ritualChoice.title,
        description: ritualChoice.hook || "A grounded opening for emotional and sensual closeness.",
        icon: Sparkles,
        accentClass: "text-amber-300",
      },
      {
        id: quoteChoice.id,
        label: "Today Quote",
        title: `From ${quoteChoice.author}`,
        description: `“${quoteChoice.quote}”`,
        icon: Stars,
        accentClass: "text-sky-300",
      },
      {
        id: `insight-${pathwayChoice.id}`,
        label: "Today Insight",
        title: pathwayChoice.title,
        description:
          pathwayChoice.description || "One practical learning insight for couples building lasting intimacy.",
        icon: BookOpen,
        accentClass: "text-violet-300",
      },
      {
        id: positionChoice.id,
        label: "Today Position",
        title: positionChoice.title,
        description: positionChoice.description,
        icon: Heart,
        accentClass: "text-rose-300",
      },
      {
        id: templePulse.id,
        label: "Today Temple Pulse",
        title: templePulse.title,
        description: templePulse.description,
        icon: MessageCircle,
        accentClass: "text-teal-300",
      },
    ];
  }, [dailySeed, pathways, rituals]);

  return (
    <div className="space-y-5">
      <section className="rounded-[28px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_24px_80px_-40px_rgba(255,170,70,0.35)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">{todayLabel}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">Daily Sacred Starter for Modern Couples</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            Five preselected cards. Calm direction. Shared intimacy momentum. This page renews every day to support your path toward infinite love.
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
          <h2 className="mt-2 font-display text-3xl text-foreground">5 cards selected for your relationship today</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dailyCards.map((card) => {
            const Icon = card.icon;

            return (
              <div key={card.id} className="rounded-[24px] border border-border/30 bg-card/45 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{card.label}</p>
                    <h3 className="mt-3 font-display text-2xl text-foreground">{loading ? "Selecting..." : card.title}</h3>
                  </div>
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${card.accentClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {loading ? "Calibrating your daily relationship guidance." : card.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[24px] border border-amber-400/35 bg-gradient-to-br from-amber-500/12 via-card/65 to-card/35 p-5">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-amber-100" />
          <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Premium Expansion</p>
        </div>
        <h2 className="mt-2 font-display text-2xl text-foreground">15 more daily cards across Temple, Library, Reconnect, Oracle, and Journey</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Premium unlocks deeper daily guidance for modern couples ready to move from good moments to a true sacred relationship lifestyle.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {premiumDailyCards.map((card) => (
            <div key={card.id} className="rounded-2xl border border-amber-300/30 bg-amber-500/8 p-4 text-left">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex rounded-full border border-amber-300/45 bg-amber-400/15 p-1.5 text-amber-100">
                  <Lock className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-amber-100/90">{card.area}</p>
                  <p className="mt-1 text-sm leading-5 text-foreground/95">{card.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AppHome;
