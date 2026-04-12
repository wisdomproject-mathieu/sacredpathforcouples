import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Brain,
  Bookmark,
  Cloud,
  Compass,
  Flame,
  Heart,
  Home,
  Lock,
  MessageCircle,
  Route,
  Shield,
  Sparkles,
  Stars,
} from "lucide-react";

import IntimacyWeather from "@/components/space/IntimacyWeather";
import RitualCards from "@/components/space/RitualCards";
import PositionDeck from "@/components/space/PositionDeck";
import TempleMessages from "@/components/space/TempleMessages";
import Pathways from "@/components/space/Pathways";
import MemoryAltar from "@/components/space/MemoryAltar";
import RepairMode from "@/components/space/RepairMode";
import TempleGuide from "@/components/space/TempleGuide";
import WisdomOracle from "@/components/space/WisdomOracle";
import ShareCardButton from "@/components/space/ShareCardButton";
import { Tables } from "@/integrations/supabase/types";
import { isPremiumTier, MembershipTier } from "@/lib/Premium";

type ToolKey = "weather" | "rituals" | "positions" | "messages" | "guide" | "repair" | "pathways" | "altar";
type ViewMode = "doorways" | "journey" | "oracle";

type ActivityState = {
  partnerNote: string;
  lastMove: string;
  rhythmCount: number;
  streakCount: number;
  altarNote: string;
  nextSuggestion: string;
};

type JourneyItem = Pick<Tables<"partner_messages">, "id" | "content" | "created_at" | "sender_id" | "message_type">;

const tools: {
  key: ToolKey;
  icon: typeof Home;
  title: string;
  subtitle: string;
  iconClass: string;
}[] = [
  {
    key: "weather",
    icon: Cloud,
    title: "Intimacy Weather",
    subtitle: "Begin with truth: name the emotional weather so tenderness lands where it is needed.",
    iconClass: "text-sky-300",
  },
  {
    key: "rituals",
    icon: Sparkles,
    title: "Rituals",
    subtitle: "Guided sacred practices for softness, devotion, longing, and embodied presence.",
    iconClass: "text-fuchsia-300",
  },
  {
    key: "positions",
    icon: Heart,
    title: "Positions",
    subtitle: "Body-led doorways that awaken trust, polarity, tenderness, and magnetic charge.",
    iconClass: "text-rose-300",
  },
  {
    key: "messages",
    icon: MessageCircle,
    title: "Teasing & Messages",
    subtitle: "Whispers, gratitude, desire, and repair notes that keep love moving.",
    iconClass: "text-violet-300",
  },
  {
    key: "guide",
    icon: Compass,
    title: "Sacred Guide",
    subtitle: "Receive a wise next step when the heart wants direction.",
    iconClass: "text-cyan-300",
  },
  {
    key: "repair",
    icon: Shield,
    title: "Repair",
    subtitle: "Return from friction into closeness with gentle, safety-first repair.",
    iconClass: "text-red-300",
  },
  {
    key: "pathways",
    icon: Route,
    title: "Pathways",
    subtitle: "Turn beautiful nights into a living relational path you both can feel.",
    iconClass: "text-emerald-300",
  },
  {
    key: "altar",
    icon: Bookmark,
    title: "Altar",
    subtitle: "Keep sacred moments, vows, and breakthroughs alive in memory.",
    iconClass: "text-orange-300",
  },
];

const templeViews: {
  key: ViewMode;
  icon: typeof Home;
  title: string;
  subtitle: string;
  iconClass: string;
  premium: boolean;
}[] = [
  {
    key: "doorways",
    icon: Sparkles,
    title: "Sacred Doorways",
    subtitle: "Eight sensual tools for the exact moment you are in.",
    iconClass: "text-fuchsia-300",
    premium: false,
  },
  {
    key: "journey",
    icon: Route,
    title: "Our Journey",
    subtitle: "See your shared pulse, patterns, and the next loving move.",
    iconClass: "text-amber-300",
    premium: true,
  },
  {
    key: "oracle",
    icon: Brain,
    title: "Wisdom Oracle",
    subtitle: "Personalized relationship intelligence for what opens next.",
    iconClass: "text-cyan-300",
    premium: true,
  },
];

const freeDoorways: ToolKey[] = ["weather", "rituals"];

const dayKey = (iso?: string | null) => (iso ? new Date(iso).toISOString().slice(0, 10) : null);

const isToolKey = (value?: string | null): value is ToolKey =>
  Boolean(value && tools.some((tool) => tool.key === value));

const isViewKey = (value?: string | null): value is ViewMode =>
  Boolean(value && templeViews.some((view) => view.key === value));

const messageTypeLabel = (messageType?: string | null) => {
  switch (messageType) {
    case "doorway_share":
      return "Doorway offering";
    case "weather_share":
      return "Weather offering";
    case "ritual_share":
      return "Ritual offering";
    case "position_share":
      return "Position offering";
    case "guide_share":
      return "Guide offering";
    case "repair_share":
      return "Repair offering";
    case "pathway_share":
      return "Pathway offering";
    case "altar_share":
      return "Altar offering";
    case "oracle_move_share":
      return "Oracle guidance";
    case "oracle_sequence_share":
      return "Oracle sequence";
    case "oracle_config_share":
      return "Oracle intention";
    case "message_prompt_share":
      return "Message prompt";
    case "message":
      return "Whisper";
    case "invitation":
      return "Invitation";
    default:
      return "Shared offering";
  }
};

const computeStreak = (dates: string[]) => {
  const unique = Array.from(new Set(dates.filter(Boolean))).sort().reverse();
  if (!unique.length) return 0;

  let streak = 1;
  let cursor = new Date(unique[0]);

  for (let i = 1; i < unique.length; i++) {
    const prev = new Date(cursor);
    prev.setDate(prev.getDate() - 1);
    const expected = prev.toISOString().slice(0, 10);
    if (unique[i] === expected) {
      streak += 1;
      cursor = prev;
    } else {
      break;
    }
  }

  return streak;
};

const truncateText = (value: string, max = 132) => {
  if (value.length <= max) return value;
  return `${value.slice(0, max).trimEnd()}...`;
};

const PartnerSpace = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const toolParam = searchParams.get("tool");
  const viewParam = searchParams.get("view");
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [hasConnectedPartner, setHasConnectedPartner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("doorways");
  const [activeTool, setActiveTool] = useState<ToolKey>("weather");
  const [activityTick, setActivityTick] = useState(0);
  const [activity, setActivity] = useState<ActivityState>({
    partnerNote: "No message in your shared thread yet. Offer one honest line and let the night begin.",
    lastMove: "No shared movement yet. Begin with Intimacy Weather or a soft invitation.",
    rhythmCount: 0,
    streakCount: 0,
    altarNote: "No altar memory has been sealed yet.",
    nextSuggestion: "Start with Intimacy Weather to meet each other where you truly are.",
  });
  const [journeyFeed, setJourneyFeed] = useState<JourneyItem[]>([]);
  const membershipTier = (user?.user_metadata?.membership_tier ??
    user?.app_metadata?.membership_tier ??
    "free") as MembershipTier;
  const hasPremiumAccess = isPremiumTier(membershipTier);

  const isToolUnlocked = (tool: ToolKey) => hasPremiumAccess || freeDoorways.includes(tool);
  const isViewUnlocked = (view: ViewMode) => hasPremiumAccess || view === "doorways";
  const activeToolUnlocked = isToolUnlocked(activeTool);

  const activateTool = (tool: ToolKey) => {
    setViewMode("doorways");
    setActiveTool(tool);
  };

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const { data } = await supabase
        .from("couples")
        .select("id, partner_a, partner_b")
        .or(`partner_a.eq.${user.id},partner_b.eq.${user.id}`)
        .maybeSingle();

      if (data) {
        setCoupleId(data.id);
        setHasConnectedPartner(Boolean(data.partner_a && data.partner_b));
      } else {
        setCoupleId(null);
        setHasConnectedPartner(false);
      }
      setLoading(false);
    };

    load();
  }, [user]);

  useEffect(() => {
    if (isViewKey(viewParam)) {
      setViewMode(viewParam);
    }
    if (!isToolKey(toolParam)) return;
    activateTool(toolParam);
  }, [toolParam, viewParam, hasPremiumAccess]);

  useEffect(() => {
    if (!coupleId || !user) return;

    const loadActivity = async () => {
      const [weatherRes, messageRes, altarRes] = await Promise.all([
        supabase
          .from("weather_entries")
          .select("state, created_at, user_id")
          .eq("couple_id", coupleId)
          .order("created_at", { ascending: false })
          .limit(20),
        supabase
          .from("partner_messages")
          .select("id, content, created_at, sender_id, message_type")
          .eq("couple_id", coupleId)
          .order("created_at", { ascending: false })
          .limit(40),
        supabase
          .from("altar_items")
          .select("title, created_at")
          .eq("couple_id", coupleId)
          .order("created_at", { ascending: false })
          .limit(20),
      ]);

      const latestWeather = weatherRes.data?.[0];
      const latestMessage = messageRes.data?.find((item) => item.sender_id !== user.id) ?? messageRes.data?.[0];
      const latestAltar = altarRes.data?.[0];
      setJourneyFeed((messageRes.data ?? []).slice(0, 12));

      const allDates = [
        ...(weatherRes.data?.map((item) => dayKey(item.created_at)) ?? []),
        ...(messageRes.data?.map((item) => dayKey(item.created_at)) ?? []),
        ...(altarRes.data?.map((item) => dayKey(item.created_at)) ?? []),
      ].filter(Boolean) as string[];

      const rhythmCount = new Set(allDates).size;
      const streakCount = computeStreak(allDates);

      let nextSuggestion = "Begin with Intimacy Weather so your next move feels precise and kind.";
      if (latestWeather?.state === "stormy") nextSuggestion = "Lead with Repair or a gentle reassurance note before intensity.";
      if (latestWeather?.state === "warm") nextSuggestion = "A beautiful night for Rituals or a warm teasing message.";
      if (latestWeather?.state === "passionate") nextSuggestion = "Open Positions or Rituals and shape the energy with presence.";

      setActivity({
        partnerNote: latestMessage?.content || "No message in your shared thread yet. Offer one honest line and let the night begin.",
        lastMove: latestWeather ? `Latest shared weather: ${latestWeather.state}.` : latestAltar ? `Latest altar memory: ${latestAltar.title}.` : "No shared movement yet. Begin with Intimacy Weather or a soft invitation.",
        rhythmCount,
        streakCount,
        altarNote: latestAltar?.title || "No altar memory has been sealed yet.",
        nextSuggestion,
      });
    };

    loadActivity();
  }, [activityTick, coupleId, user]);

  useEffect(() => {
    if (!coupleId) return;

    const channel = supabase
      .channel(`temple_activity_${coupleId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "partner_messages", filter: `couple_id=eq.${coupleId}` },
        () => setActivityTick((value) => value + 1)
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "weather_entries", filter: `couple_id=eq.${coupleId}` },
        () => setActivityTick((value) => value + 1)
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "altar_items", filter: `couple_id=eq.${coupleId}` },
        () => setActivityTick((value) => value + 1)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [coupleId]);

  const navigateTool = (tab: string) => {
    if (!isToolKey(tab)) return;
    activateTool(tab);
  };

  const activeMeta = useMemo(() => tools.find((tool) => tool.key === activeTool) ?? tools[0], [activeTool]);
  const showClosingPremiumBanner = !hasPremiumAccess && viewMode === "doorways" && activeToolUnlocked;

  const premiumGateCard = (title: string, description: string) => (
    <section className="rounded-[28px] border border-amber-300/30 bg-gradient-to-br from-amber-500/14 via-background to-background p-6 shadow-[0_26px_80px_-40px_rgba(251,191,36,0.45)]">
      <div className="max-w-3xl">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/35 bg-amber-500/14 text-amber-200">
          <Lock className="h-3.5 w-3.5" />
        </div>
        <h3 className="mt-4 font-display text-3xl text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
        <p className="mt-3 text-sm leading-7 text-foreground/90">
          Free temple includes full Intimacy Weather and one guided ritual per category. Premium opens every doorway, every ritual, and the full couple intelligence experience.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/pricing"
            className="rounded-2xl border border-amber-300/35 bg-amber-500/14 px-5 py-3 text-sm text-foreground transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
          >
            View premium plans
          </Link>
          <button
            type="button"
            onClick={() => activateTool("weather")}
            className="rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
          >
            Continue with Intimacy Weather
          </button>
        </div>
      </div>
    </section>
  );

  const premiumPreviewBanner = (eyebrow: string, title: string, description: string, tags: string[]) => (
    <section className="rounded-[28px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_58%),linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,23,42,0.12))] p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.5)]">
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/35 bg-amber-500/14 text-amber-200">
        <Lock className="h-3.5 w-3.5" />
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-amber-200">{eyebrow}</p>
      <h3 className="mt-2 font-display text-3xl text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-foreground/90">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to="/pricing"
          className="rounded-2xl border border-amber-300/35 bg-amber-500/14 px-5 py-3 text-sm text-foreground transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
        >
          View plans
        </Link>
        <button
          type="button"
          onClick={() => setViewMode("doorways")}
          className="rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
        >
          Continue with free flow
        </button>
      </div>
    </section>
  );

  const journeyPreview = (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Our Journey Preview</p>
        <h2 className="mt-2 font-display text-3xl text-foreground">A living map of your shared love story</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          See where your closeness is growing, what your partner offered most recently, and what Sacred Temple suggests next for your couple rhythm.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Rhythm snapshot</div>
          <div className="mt-3 font-display text-4xl text-foreground">{activity.rhythmCount}</div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Shared temple days detected in your recent connection cycle.</p>
        </div>

        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Continuity streak</div>
          <div className="mt-3 font-display text-4xl text-foreground">{activity.streakCount}</div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Consecutive days of emotional and sensual movement together.</p>
        </div>

        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Beloved signal</div>
          <p className="mt-3 text-sm leading-7 text-foreground/90">{truncateText(activity.partnerNote)}</p>
        </div>

        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Suggested next move</div>
          <p className="mt-3 text-sm leading-7 text-foreground/90">{truncateText(activity.nextSuggestion)}</p>
        </div>
      </div>

      <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
        <div className="flex items-center gap-2 text-violet-300">
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs uppercase tracking-[0.18em]">Timeline preview</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          In premium, every shared doorway and oracle offering becomes a visible timeline with context and relational momentum.
        </p>
        <div className="mt-4 space-y-3">
          {journeyFeed.length === 0 ? (
            <div className="rounded-[22px] border border-border/30 bg-background/45 p-4 text-sm text-muted-foreground">
              No shared offerings yet. Journey preview will populate as soon as you share doorway and oracle cards.
            </div>
          ) : (
            journeyFeed.slice(0, 2).map((item) => (
              <div key={item.id} className="rounded-[22px] border border-border/30 bg-background/45 p-4">
                <div className="inline-flex rounded-full border border-border/35 bg-card/45 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {messageTypeLabel(item.message_type)}
                </div>
                <p className="mt-3 text-sm leading-6 text-foreground/90">{truncateText(item.content, 168)}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {premiumPreviewBanner(
        "Journey Premium",
        "Unlock full couple timeline intelligence",
        "Track your shared patterns, offerings, devotion notes, and next-step momentum so your relationship keeps evolving with clarity and sensual depth.",
        ["Timeline Memory", "Couple Patterns", "Next-Step Guidance"],
      )}
    </section>
  );

  const oraclePreview = (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Wisdom Oracle Preview</p>
        <h2 className="mt-2 font-display text-3xl text-foreground">Relationship intelligence for what opens next</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          The Oracle reads your couple data, emotional weather, and sacred history to propose a personalized next move with romantic and sensual precision.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Oracle tones</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Romantic", "Erotic", "Playful", "Repair"].map((tone) => (
              <span key={tone} className="rounded-full border border-border/30 bg-background/45 px-2.5 py-1 text-[11px] text-foreground/90">
                {tone}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Pre-configure the Oracle to match your couple intention each day.</p>
        </div>

        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Signal blend</div>
          <p className="mt-3 text-sm leading-7 text-foreground/90">
            Oracle blends Intimacy Weather, shared messages, altar memory, and rhythm history before generating guidance.
          </p>
        </div>

        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">3-step oracle flow</div>
          <ol className="mt-3 space-y-2 text-sm leading-6 text-foreground/90">
            <li>1. Read the current couple state</li>
            <li>2. Offer one exact opening move</li>
            <li>3. Sequence the next two intimacy steps</li>
          </ol>
        </div>

        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">What couples receive</div>
          <p className="mt-3 text-sm leading-7 text-foreground/90">
            Romantic guidance, sensual pacing, erotic bridge suggestions, and friction-to-closeness moves tailored for your relationship.
          </p>
        </div>
      </div>

      {premiumPreviewBanner(
        "Oracle Premium",
        "Unlock full Wisdom Oracle innovation",
        "Get personalized next-step coaching, sequence-level recommendations, and sharable oracle cards that flow directly into your Journey page.",
        ["Personalized Oracle", "Sharable Moves", "Journey Sync"],
      )}
    </section>
  );

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6 text-foreground md:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {!hasConnectedPartner && (
          <section className="rounded-[28px] border border-amber-300/30 bg-amber-500/10 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-amber-300/35 bg-background/45 p-3 text-amber-300">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl text-foreground">Sacred Temple preview</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Begin with Intimacy Weather and ritual previews now. Shared syncing awakens the moment both lovers are connected.
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Temple</p>
              <h1 className="mt-3 font-display text-3xl text-foreground md:text-5xl">A private sanctuary for modern lovers</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                Ancient wisdom meets living intimacy: read your inner weather, open sensual ritual, repair gently, and weave a shared rhythm that deepens over time.
              </p>
            </div>

            <div className="rounded-[24px] border border-border/30 bg-card/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Current doorway</div>
              <div className="mt-2 flex items-center gap-3">
                <div className={`rounded-2xl border border-border/30 bg-background/45 p-3 ${activeMeta.iconClass}`}>
                  <activeMeta.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-xl text-foreground">{activeMeta.title}</div>
                  <div className="text-sm text-muted-foreground">{activeMeta.subtitle}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="w-full rounded-[24px] border border-border/30 bg-card/45 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-primary/80">Sacred pages</div>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {templeViews.map((view) => {
                  const Icon = view.icon;
                  const active = viewMode === view.key;
                  const locked = !isViewUnlocked(view.key);
                  return (
                    <div
                      key={view.key}
                      className={`relative overflow-hidden rounded-[20px] border p-4 text-left transition-all ${
                        active
                          ? "border-primary/30 bg-primary/10 shadow-[0_18px_50px_-36px_rgba(255,173,70,0.42)]"
                          : "border-border/30 bg-background/45 hover:border-primary/20 hover:bg-card/55"
                      }`}
                    >
                      {locked && (
                        <button
                          type="button"
                          onClick={() => navigate("/pricing")}
                          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/35 bg-amber-500/14 text-amber-200 transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
                          aria-label="Open plans"
                        >
                          <Lock className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button type="button" onClick={() => setViewMode(view.key)} className="w-full text-left">
                      <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-2.5 ${view.iconClass}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="mt-3 font-display text-xl text-foreground">{view.title}</div>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{view.subtitle}</p>
                      {locked && (
                        <p className="mt-2 text-xs leading-5 text-amber-100/85">
                          Unlock this page in plans to turn your shared data into next-step relationship guidance.
                        </p>
                      )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {viewMode === "doorways" && (
          <>
            <section>
              <div className="mb-4">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Sacred Doorways</p>
                <h2 className="mt-2 font-display text-3xl text-foreground">Choose the doorway your love needs tonight</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  const active = activeTool === tool.key;
                  const locked = !isToolUnlocked(tool.key);
                  return (
                    <div
                      key={tool.key}
                      className={`relative overflow-hidden rounded-[26px] border p-5 text-left transition-all ${
                        active
                          ? "border-primary/30 bg-primary/10 shadow-[0_18px_50px_-36px_rgba(255,173,70,0.42)]"
                          : "border-border/30 bg-card/45 hover:border-primary/20 hover:bg-card/55"
                      } ${locked ? "border-amber-300/25 bg-amber-500/6" : ""}`}
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-65">
                        <div className="absolute -right-6 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                        <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />
                      </div>
                      {locked && (
                        <Link
                          to="/pricing"
                          className="absolute right-4 top-4 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/35 bg-amber-500/14 text-amber-200 transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
                          aria-label="Open plans"
                        >
                          <Lock className="h-3.5 w-3.5" />
                        </Link>
                      )}
                      <button type="button" onClick={() => activateTool(tool.key)} className="relative flex h-full w-full flex-col text-left">
                        <div className={`inline-flex w-fit rounded-2xl border border-border/30 bg-background/45 p-3 ${tool.iconClass}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 font-display text-2xl text-foreground">{tool.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{tool.subtitle}</p>
                        {locked && (
                          <p className="mt-2 text-xs leading-5 text-amber-100/85">
                            This doorway is unlocked in plans. Tap the golden lock to subscribe.
                          </p>
                        )}
                      </button>
                      <div className="relative mt-4 flex flex-wrap gap-2">
                        {!locked && (
                          <>
                            <button
                              type="button"
                              onClick={() => activateTool(tool.key)}
                              className="rounded-2xl border border-primary/25 bg-primary/12 px-3 py-2 text-xs text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
                            >
                              Enter doorway
                            </button>
                            <ShareCardButton
                              coupleId={coupleId ?? undefined}
                              messageType="doorway_share"
                              content={`Doorway card ✦ ${tool.title} — ${tool.subtitle}`}
                              label="Offer this doorway"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              {!activeToolUnlocked && premiumGateCard(activeMeta.title, activeMeta.subtitle)}
              {activeToolUnlocked && activeTool === "weather" && <IntimacyWeather coupleId={coupleId ?? undefined} onNavigate={navigateTool} />}
              {activeToolUnlocked && activeTool === "rituals" && (
                <RitualCards coupleId={coupleId ?? undefined} onNavigate={navigateTool} isPremium={hasPremiumAccess} />
              )}
              {activeToolUnlocked && activeTool === "positions" && <PositionDeck onNavigate={navigateTool} coupleId={coupleId ?? undefined} />}
              {activeToolUnlocked && activeTool === "messages" && <TempleMessages coupleId={coupleId ?? undefined} onNavigate={navigateTool} />}
              {activeToolUnlocked && activeTool === "guide" && <TempleGuide onNavigate={navigateTool} coupleId={coupleId ?? undefined} />}
              {activeToolUnlocked && activeTool === "repair" && <RepairMode onNavigate={navigateTool} coupleId={coupleId ?? undefined} />}
              {activeToolUnlocked && activeTool === "pathways" && <Pathways coupleId={coupleId ?? undefined} onNavigate={navigateTool} />}
              {activeToolUnlocked && activeTool === "altar" && <MemoryAltar coupleId={coupleId ?? undefined} onNavigate={navigateTool} />}
            </section>
          </>
        )}

        {viewMode === "journey" &&
          (isViewUnlocked("journey") ? (
            <section className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Our Journey</p>
              <h2 className="mt-2 font-display text-3xl text-foreground">The living story of your love</h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
                <div className="flex items-center gap-2 text-violet-300">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">Beloved note</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-foreground/90">{activity.partnerNote}</p>
              </div>

              <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
                <div className="flex items-center gap-2 text-amber-300">
                  <Stars className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">Latest shared movement</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-foreground/90">{activity.lastMove}</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
              <div className="flex items-center gap-2 text-cyan-300">
                <Stars className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.18em]">Shared offerings timeline</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Every offering from Doorways and Oracle is woven here, so your relationship story stays visible over time.
              </p>

              <div className="mt-4 space-y-3">
                {journeyFeed.length === 0 ? (
                  <div className="rounded-[22px] border border-border/30 bg-background/45 p-4 text-sm text-muted-foreground">
                    No shared offerings yet. Offer one doorway card to begin your couple timeline.
                  </div>
                ) : (
                  journeyFeed.map((item) => {
                    const mine = item.sender_id === user?.id;
                    return (
                      <div
                        key={item.id}
                        className={`rounded-[22px] border p-4 ${
                          mine ? "border-primary/20 bg-primary/8" : "border-border/30 bg-background/45"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="inline-flex rounded-full border border-border/35 bg-card/45 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                            {messageTypeLabel(item.message_type)}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {new Date(item.created_at).toLocaleDateString()} · {mine ? "You" : "Beloved"}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-foreground/90">{item.content}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Sacred rhythm</div>
                <div className="mt-3 font-display text-4xl text-foreground">{activity.rhythmCount}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Days with shared Sacred Temple activity recorded.</p>
              </div>

              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Continuity streak</div>
                <div className="mt-3 font-display text-4xl text-foreground">{activity.streakCount}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Consecutive active days based on your recent Sacred Temple rhythm.</p>
              </div>

              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Altar resonance</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{activity.altarNote}</p>
              </div>

              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Oracle next move</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{activity.nextSuggestion}</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
                <div className="flex items-center gap-2 text-fuchsia-300">
                  <Flame className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">Cards, history, and teasing</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Let this become the golden thread of your love: desire notes, gratitude offerings, ritual invitations, gentle apologies, and afterglow follow-ups.
                </p>
              </div>

              <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Route className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">Where the journey can grow</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Over time, this page becomes your living sanctuary map: what opened, what healed, what deepened, and what your love is ready for next.
                </p>
              </div>
            </div>
            </section>
          ) : (
            journeyPreview
          ))}

        {viewMode === "oracle" &&
          (isViewUnlocked("oracle") ? (
            <section>
              <WisdomOracle coupleId={coupleId ?? undefined} onNavigate={navigateTool} />
            </section>
          ) : (
            oraclePreview
          ))}

        {showClosingPremiumBanner && (
          <section className="rounded-[30px] border border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(251,191,36,0.45)] md:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-200">Temple Premium</p>
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">Bring the full sanctuary online</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
              Free gives your couple Intimacy Weather plus one ritual per category. Premium unlocks every ritual, all eight doorways, Our Journey analytics, and full Wisdom Oracle innovation for your next shared chapter.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/pricing"
                className="rounded-2xl border border-amber-300/35 bg-amber-500/14 px-5 py-3 text-sm text-foreground transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
              >
                View plans
              </Link>
              <button
                type="button"
                onClick={() => activateTool("weather")}
                className="rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
              >
                Continue with free flow
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PartnerSpace;
