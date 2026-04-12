import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Heart, Lock, MessageCircle, Sparkles, Stars, type LucideIcon } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type RitualItem = Tables<"ritual_items">;
type Pathway = Tables<"pathways">;
type PartnerMessage = Tables<"partner_messages">;
type AltarItem = Tables<"altar_items">;

type DailyFamily = "ritual" | "learning" | "position" | "quote" | "reconnect";

type DailyFlowStep = {
  id: string;
  family: DailyFamily;
  label: string;
  title: string;
  description: string;
  cta: string;
  route: string;
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
    note: "Let the pace itself become the practice.",
  },
  {
    id: "quote-deida",
    author: "David Deida",
    quote: "Love deepens when presence, truth, and attraction are all still welcome in the room.",
    note: "Say one honest thing without losing tenderness.",
  },
  {
    id: "quote-chia",
    author: "Mantak Chia",
    quote: "Breath and awareness turn intensity into nourishment instead of depletion.",
    note: "Slow the breath before you ask the body for more.",
  },
  {
    id: "quote-osho",
    author: "Osho",
    quote: "When lovers meet in awareness, even silence becomes intimate.",
    note: "Let quietness do part of the work today.",
  },
] as const;

const positions = [
  {
    id: "position-hand-on-heart",
    title: "Hand on heart",
    description: "Start with chest-to-chest stillness and let safety arrive before intensity.",
    route: "/app/space?tool=positions",
  },
  {
    id: "position-back-to-back",
    title: "Back to back",
    description: "Share breath without pressure and let your nervous systems meet first.",
    route: "/app/space?tool=positions",
  },
  {
    id: "position-seated-closeness",
    title: "Seated closeness",
    description: "Face each other, stay near, and allow desire to grow from presence.",
    route: "/app/space?tool=positions",
  },
  {
    id: "position-synchronized-exhale",
    title: "Synchronized exhale",
    description: "Use a shared exhale to soften the room and open one clear next step.",
    route: "/app/space?tool=positions",
  },
] as const;

const reconnectPrompts = [
  {
    id: "reconnect-soft-checkin",
    title: "Soft check-in",
    description: "Ask: “What would help you feel cherished tonight?” Then mirror the answer in one sentence.",
    route: "/app/reconnect",
  },
  {
    id: "reconnect-90-second-repair",
    title: "90-second repair",
    description: "Hold hands, breathe for 90 seconds, then each share one thing you appreciate right now.",
    route: "/app/reconnect",
  },
  {
    id: "reconnect-sensual-pause",
    title: "Sensual pause",
    description: "Pause all logistics for five minutes. Stay close, breathe together, and let the body lead.",
    route: "/app/reconnect",
  },
  {
    id: "reconnect-devotion-line",
    title: "Devotion line",
    description: "Whisper one line of devotion to your partner and ask for one line back.",
    route: "/app/reconnect",
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

const clipText = (value: string, max = 108) => {
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
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [hasConnectedPartner, setHasConnectedPartner] = useState(false);
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
        setHasConnectedPartner(false);
        setMessages([]);
        setAltarItems([]);
        setLoading(false);
        return;
      }

      setHasConnectedPartner(Boolean(couple.partner_a && couple.partner_b));

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
      title: hasConnectedPartner ? "Shared rhythm" : "Daily rhythm",
      detail: hasConnectedPartner
        ? "No strong fresh signal yet, so Sacred Path is drawing from your shared story."
        : "A quiet daily sequence to help your love stay intentional.",
    };
  }, [hasConnectedPartner, latestMemory, latestPartnerMessage, latestSharedMessage]);

  const dailySeed = useMemo(() => {
    return `${todayKey}:${user?.id ?? "guest"}:${signal.detail}`;
  }, [signal.detail, todayKey, user?.id]);

  const dailyFlow = useMemo<DailyFlowStep[]>(() => {
    const ritualChoice =
      rituals.length > 0
        ? pickBySeed(rituals, `${dailySeed}:ritual`)
        : {
            id: "ritual-fallback",
            title: "Soft arrival ritual",
            hook: "Begin with one minute of touch and one honest sentence.",
            category: "presence",
          };

    const pathwayChoice =
      pathways.length > 0
        ? pickBySeed(pathways, `${dailySeed}:learning`)
        : {
            id: "learning-fallback",
            title: "Slow Down",
            description: "Return to breath, touch, and presence for a few days in a row.",
            duration_days: 7,
          };

    const positionChoice = pickBySeed(positions, `${dailySeed}:position`);
    const quoteChoice = pickBySeed(quotes, `${dailySeed}:quote`);
    const reconnectChoice = pickBySeed(reconnectPrompts, `${dailySeed}:reconnect`);

    return [
      {
        id: `ritual-${ritualChoice.id}`,
        family: "ritual" as const,
        label: "Ritual",
        title: ritualChoice.title,
        description: ritualChoice.hook || "A guided move to soften the threshold between you.",
        cta: "Open ritual",
        route: "/app/space?tool=rituals",
        icon: Sparkles,
        accentClass: "text-amber-300",
      },
      {
        id: quoteChoice.id,
        family: "quote" as const,
        label: "Author quote",
        title: `A line from ${quoteChoice.author}`,
        description: `“${quoteChoice.quote}”`,
        cta: "Open quotes",
        route: "/app/authors",
        icon: Stars,
        accentClass: "text-sky-300",
      },
      {
        id: positionChoice.id,
        family: "position" as const,
        label: "Position",
        title: positionChoice.title,
        description: positionChoice.description,
        cta: "Open positions",
        route: positionChoice.route,
        icon: Heart,
        accentClass: "text-rose-300",
      },
      {
        id: `learning-${pathwayChoice.id}`,
        family: "learning" as const,
        label: "Quick learning insight",
        title: pathwayChoice.title,
        description:
          pathwayChoice.description || `${pathwayChoice.duration_days} days of guided relationship practice.`,
        cta: "Open learning",
        route: "/app/paths",
        icon: BookOpen,
        accentClass: "text-violet-300",
      },
      {
        id: reconnectChoice.id,
        family: "reconnect" as const,
        label: "Reconnect move",
        title: reconnectChoice.title,
        description: reconnectChoice.description,
        cta: "Open reconnect",
        route: reconnectChoice.route,
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
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">Your daily sacred flow is ready.</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            Sacred Path now chooses the day for you. Five guided moves. One clear rhythm. One devotion to infinite love.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Today&apos;s promise</p>
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
              One ritual. One quote. One position. One insight. One reconnect move.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              {loading
                ? "Gathering your shared rhythm and selecting today’s sequence."
                : "This sequence stays fixed all day, then returns tomorrow as a fresh sacred page."}
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-[22px] border border-border/30 bg-card/40 p-4">
              <div className="flex items-center gap-2 text-violet-300">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.18em]">{signal.title}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-foreground/90">{signal.detail}</p>
            </div>

            <div className="rounded-[22px] border border-border/30 bg-card/40 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Daily cadence</div>
              <p className="mt-3 font-display text-2xl text-foreground">{loading ? "Tuning..." : "Preselected for you"}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {loading
                  ? "The page is drawing your five moves."
                  : "Open each card in order, share what resonates, and let your journey carry the continuity."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-amber-400/35 bg-gradient-to-br from-amber-500/12 via-card/65 to-card/35 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Locked Premium Expansion</p>
            <h2 className="mt-2 font-display text-2xl text-foreground">15 additional daily cards across the entire app</h2>
          </div>
          <button
            type="button"
            onClick={() => navigate("/pricing")}
            className="rounded-2xl border border-amber-300/45 bg-amber-500/15 px-4 py-2 text-sm text-foreground transition-all hover:border-amber-200/70 hover:bg-amber-500/20"
          >
            Unlock plans
          </button>
        </div>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Expand your daily rhythm with deeper Temple moments, richer Sacred Library wisdom, advanced reconnect guidance, and Wisdom Oracle precision for next-step intimacy.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {premiumDailyCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => navigate("/pricing")}
              className="w-full rounded-2xl border border-amber-300/30 bg-amber-500/8 p-4 text-left transition-all hover:border-amber-200/60 hover:bg-amber-500/12"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex rounded-full border border-amber-300/45 bg-amber-400/15 p-1.5 text-amber-100">
                  <Lock className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-amber-100/90">{card.area}</p>
                  <p className="mt-1 text-sm leading-5 text-foreground/95">{card.title}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Preselected daily sequence</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Follow today&apos;s five sacred moves</h2>
        </div>

        <div className="grid gap-4">
          {dailyFlow.map((step, index) => {
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => navigate(step.route)}
                className="w-full rounded-[24px] border border-border/30 bg-card/45 p-5 text-left transition-all hover:border-primary/25 hover:bg-card/60"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary/80">
                      Step {index + 1} · {step.label}
                    </p>
                    <h3 className="mt-3 font-display text-2xl text-foreground">{step.title}</h3>
                  </div>
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${step.accentClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                <div className="mt-4 text-sm text-foreground/90">{step.cta}</div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AppHome;
