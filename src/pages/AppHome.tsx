import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Heart, MessageCircle, Sparkles, Stars } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type RitualItem = Tables<"ritual_items">;
type Pathway = Tables<"pathways">;
type PartnerMessage = Tables<"partner_messages">;
type AltarItem = Tables<"altar_items">;

type DailyFamily = "ritual" | "learning" | "position" | "quote";

type DailyChoice = {
  id: string;
  family: DailyFamily;
  label: string;
  title: string;
  description: string;
  cta: string;
  route: string;
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

const fullFamilySet: DailyFamily[] = ["ritual", "learning", "position", "quote"];

const hashString = (value: string) =>
  Array.from(value).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 7);

const pickBySeed = <T,>(items: readonly T[], seed: string): T => items[hashString(seed) % items.length];

const clipText = (value: string, max = 108) => {
  if (value.length <= max) return value;
  return `${value.slice(0, max).trimEnd()}...`;
};

const familiesFromMessageType = (messageType?: string | null): DailyFamily[] => {
  if (!messageType) return fullFamilySet;
  if (messageType.includes("ritual")) return ["ritual"];
  if (messageType.includes("position")) return ["position"];
  if (messageType.includes("pathway")) return ["learning"];
  if (messageType.includes("guide") || messageType.includes("weather")) return ["ritual", "position"];
  if (messageType.includes("message")) return ["quote", "ritual"];
  return fullFamilySet;
};

const familiesFromAltarType = (itemType?: string | null): DailyFamily[] => {
  if (!itemType) return fullFamilySet;
  if (itemType.includes("ritual")) return ["ritual"];
  if (itemType.includes("path")) return ["learning"];
  if (itemType.includes("position")) return ["position"];
  if (itemType.includes("quote") || itemType.includes("wisdom")) return ["quote"];
  return ["quote", "ritual", "learning"];
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

  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
      }).format(new Date()),
    []
  );

  const signal = useMemo(() => {
    if (latestPartnerMessage) {
      return {
        title: "Partner signal",
        detail: clipText(latestPartnerMessage.content),
        families: familiesFromMessageType(latestPartnerMessage.message_type),
      };
    }

    if (latestMemory) {
      return {
        title: "Saved memory",
        detail: clipText(latestMemory.note || latestMemory.title),
        families: familiesFromAltarType(latestMemory.item_type),
      };
    }

    if (latestSharedMessage) {
      return {
        title: "Shared thread",
        detail: clipText(latestSharedMessage.content),
        families: familiesFromMessageType(latestSharedMessage.message_type),
      };
    }

    return {
      title: hasConnectedPartner ? "Shared rhythm" : "Daily draw",
      detail: hasConnectedPartner
        ? "No strong fresh signal yet, so Sacred Path is drawing from your shared library."
        : "A quiet daily draw from learning, rituals, positions, and quotes.",
      families: fullFamilySet,
    };
  }, [hasConnectedPartner, latestMemory, latestPartnerMessage, latestSharedMessage]);

  const dailySeed = useMemo(() => {
    const todayKey = new Date().toISOString().slice(0, 10);
    return `${todayKey}:${user?.id ?? "guest"}:${signal.detail}`;
  }, [signal.detail, user?.id]);

  const spotlightChoices = useMemo(() => {
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

    return {
      ritual: {
        id: `ritual-${ritualChoice.id}`,
        family: "ritual" as const,
        label: "Ritual",
        title: ritualChoice.title,
        description: ritualChoice.hook || "A guided move to soften the threshold between you.",
        cta: "Open rituals",
        route: "/app/space?tool=rituals",
      },
      learning: {
        id: `learning-${pathwayChoice.id}`,
        family: "learning" as const,
        label: "Learning",
        title: pathwayChoice.title,
        description:
          pathwayChoice.description || `${pathwayChoice.duration_days} days of guided relationship practice.`,
        cta: "Open learning",
        route: "/app/paths",
      },
      position: {
        id: positionChoice.id,
        family: "position" as const,
        label: "Position",
        title: positionChoice.title,
        description: positionChoice.description,
        cta: "Open positions",
        route: positionChoice.route,
      },
      quote: {
        id: quoteChoice.id,
        family: "quote" as const,
        label: "Quote",
        title: `A line from ${quoteChoice.author}`,
        description: `“${quoteChoice.quote}”`,
        cta: "Open quotes",
        route: "/app/authors",
      },
    };
  }, [dailySeed, pathways, rituals]);

  const dailyAction = useMemo(() => {
    const preferredChoices = signal.families
      .map((family) => spotlightChoices[family])
      .filter(Boolean) as DailyChoice[];

    return pickBySeed(preferredChoices.length > 0 ? preferredChoices : Object.values(spotlightChoices), `${dailySeed}:daily`);
  }, [dailySeed, signal.families, spotlightChoices]);

  const choiceCards = useMemo(
    () => [
      {
        title: "Learning",
        description: "Go deeper through pathways and teachings when you want context, not only a quick spark.",
        note: spotlightChoices.learning.title,
        route: "/app/paths",
        cta: "Choose learning",
        icon: BookOpen,
        iconClass: "text-violet-300",
      },
      {
        title: "Rituals",
        description: "Let a guided practice decide the pace, tone, and first movement of the moment.",
        note: spotlightChoices.ritual.title,
        route: "/app/space?tool=rituals",
        cta: "Choose rituals",
        icon: Sparkles,
        iconClass: "text-amber-300",
      },
      {
        title: "Positions",
        description: "Enter through the body when words feel too slow or too much.",
        note: spotlightChoices.position.title,
        route: "/app/space?tool=positions",
        cta: "Choose positions",
        icon: Heart,
        iconClass: "text-rose-300",
      },
      {
        title: "Quotes",
        description: "Take one line of wisdom into the day and let it shape how you touch, speak, or wait.",
        note: clipText(spotlightChoices.quote.description, 72),
        route: "/app/authors",
        cta: "Choose quotes",
        icon: Stars,
        iconClass: "text-sky-300",
      },
    ],
    [spotlightChoices]
  );

  return (
    <div className="space-y-5">
      <section className="rounded-[28px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_24px_80px_-40px_rgba(255,170,70,0.35)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">{todayLabel}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">One day. One sacred action.</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            One step toward infinite love with Sacred Path for Couples. The app chooses from your saved memory, your latest shared signals, and the living library below.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Today&apos;s sacred action</p>
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
              {loading ? "Listening for the next move..." : dailyAction.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              {loading
                ? "Gathering your rhythm, memory, and shared signals."
                : dailyAction.description}
            </p>

            <button
              type="button"
              onClick={() => navigate(dailyAction.route)}
              className="mt-6 rounded-2xl border border-primary/20 bg-primary/10 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/35 hover:bg-primary/14"
            >
              {dailyAction.cta}
            </button>
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
              <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Today&apos;s direction</div>
              <p className="mt-3 font-display text-2xl text-foreground">{loading ? "Waiting" : dailyAction.label}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {loading
                  ? "The page is drawing your recommendation."
                  : "If you do not want to decide today, let this be enough."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Choose your own sacred action</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Simple boxes. Clear direction.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {choiceCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                type="button"
                onClick={() => navigate(card.route)}
                className="rounded-[24px] border border-border/30 bg-card/45 p-5 text-left transition-all hover:border-primary/25 hover:bg-card/60"
              >
                <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${card.iconClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-2xl text-foreground">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.description}</p>
                <div className="mt-4 text-xs uppercase tracking-[0.16em] text-primary/80">Today: {card.note}</div>
                <div className="mt-4 text-sm text-foreground/90">{card.cta}</div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AppHome;
