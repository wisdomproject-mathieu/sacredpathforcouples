import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Bookmark,
  Cloud,
  Compass,
  Flame,
  Heart,
  Home,
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

type ToolKey = "weather" | "rituals" | "positions" | "messages" | "guide" | "repair" | "pathways" | "altar";
type ViewMode = "doorways" | "journey";

type ActivityState = {
  partnerNote: string;
  lastMove: string;
  rhythmCount: number;
  streakCount: number;
  altarNote: string;
  nextSuggestion: string;
};

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
    subtitle: "Read the emotional climate before choosing touch, truth, teasing, or repair.",
    iconClass: "text-sky-300",
  },
  {
    key: "rituals",
    icon: Sparkles,
    title: "Rituals",
    subtitle: "Open guided practices for softness, devotion, anticipation, and sacred presence.",
    iconClass: "text-fuchsia-300",
  },
  {
    key: "positions",
    icon: Heart,
    title: "Positions",
    subtitle: "Explore embodied postures that carry tenderness, charge, intimacy, and depth.",
    iconClass: "text-rose-300",
  },
  {
    key: "messages",
    icon: MessageCircle,
    title: "Teasing & Messages",
    subtitle: "Send warmth, desire, gratitude, reassurance, play, or one honest sentence that matters.",
    iconClass: "text-violet-300",
  },
  {
    key: "guide",
    icon: Compass,
    title: "Temple Guide",
    subtitle: "Receive a wiser suggestion when you do not know what the relationship needs tonight.",
    iconClass: "text-cyan-300",
  },
  {
    key: "repair",
    icon: Shield,
    title: "Repair",
    subtitle: "Return after distance or tension with less defensiveness and more care.",
    iconClass: "text-red-300",
  },
  {
    key: "pathways",
    icon: Route,
    title: "Pathways",
    subtitle: "Turn scattered moments into a longer journey the couple can actually feel growing.",
    iconClass: "text-emerald-300",
  },
  {
    key: "altar",
    icon: Bookmark,
    title: "Altar",
    subtitle: "Keep the moments that should not disappear after the night is over.",
    iconClass: "text-orange-300",
  },
];

const dayKey = (iso?: string | null) => (iso ? new Date(iso).toISOString().slice(0, 10) : null);

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

const PartnerSpace = () => {
  const { user } = useAuth();
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("doorways");
  const [activeTool, setActiveTool] = useState<ToolKey>("weather");
  const [activity, setActivity] = useState<ActivityState>({
    partnerNote: "No partner note yet. Once one of you leaves a message, this area becomes the emotional pulse of the temple.",
    lastMove: "No shared ritual or message yet. Begin with Weather or one warm message.",
    rhythmCount: 0,
    streakCount: 0,
    altarNote: "Nothing has been saved in the altar yet.",
    nextSuggestion: "Start with Intimacy Weather. It is the cleanest first move for most couples.",
  });

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const { data } = await supabase
        .from("couples")
        .select("*")
        .or(`partner_a.eq.${user.id},partner_b.eq.${user.id}`)
        .not("partner_b", "is", null)
        .maybeSingle();

      if (data) setCoupleId(data.id);
      setLoading(false);
    };

    load();
  }, [user]);

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
          .select("content, created_at, sender_id")
          .eq("couple_id", coupleId)
          .order("created_at", { ascending: false })
          .limit(20),
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

      const allDates = [
        ...(weatherRes.data?.map((item) => dayKey(item.created_at)) ?? []),
        ...(messageRes.data?.map((item) => dayKey(item.created_at)) ?? []),
        ...(altarRes.data?.map((item) => dayKey(item.created_at)) ?? []),
      ].filter(Boolean) as string[];

      const rhythmCount = new Set(allDates).size;
      const streakCount = computeStreak(allDates);

      let nextSuggestion = "Start with Intimacy Weather. It gives the whole temple a more honest tone.";
      if (latestWeather?.state === "stormy") nextSuggestion = "Choose Repair or a very soft message before attempting anything more intense.";
      if (latestWeather?.state === "warm") nextSuggestion = "This is a good night for Rituals or Teasing & Messages.";
      if (latestWeather?.state === "passionate") nextSuggestion = "Open Positions or Rituals and let the energy move with some conscious shape.";

      setActivity({
        partnerNote: latestMessage?.content || "No partner note yet. Once one of you leaves a message, this area becomes the emotional pulse of the temple.",
        lastMove: latestWeather ? `Latest shared weather: ${latestWeather.state}.` : latestAltar ? `Latest altar memory: ${latestAltar.title}.` : "No shared ritual or message yet. Begin with Weather or one warm message.",
        rhythmCount,
        streakCount,
        altarNote: latestAltar?.title || "Nothing has been saved in the altar yet.",
        nextSuggestion,
      });
    };

    loadActivity();
  }, [coupleId, user]);

  const navigateTool = (tab: string) => {
    setViewMode("doorways");
    setActiveTool(tab as ToolKey);
  };

  const activeMeta = useMemo(() => tools.find((tool) => tool.key === activeTool) ?? tools[0], [activeTool]);

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!coupleId) {
    return (
      <div className="min-h-screen bg-background px-4 py-10 text-foreground md:px-6">
        <div className="mx-auto max-w-2xl rounded-[30px] border border-border/30 bg-card/45 p-8 text-center shadow-[0_24px_80px_-42px_rgba(0,0,0,0.65)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
            <Heart className="h-7 w-7" />
          </div>
          <h2 className="mt-5 font-display text-3xl text-foreground">Connect first</h2>
          <p className="mt-3 font-body text-muted-foreground">The Temple becomes a living sanctuary once both partners are inside the same shared space.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6 text-foreground md:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Temple</p>
              <h1 className="mt-3 font-display text-3xl text-foreground md:text-5xl">A private sanctuary for two</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                The Temple is for shared practice: weather, ritual, positions, teasing, messages, repair, memory, and the living rhythm of your relationship.
              </p>
            </div>

            <div className="rounded-[24px] border border-border/30 bg-card/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Currently open</div>
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
            <button
              type="button"
              onClick={() => setViewMode("doorways")}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${viewMode === "doorways" ? "border-primary/25 bg-primary/10 text-foreground" : "border-border/30 bg-background/45 text-muted-foreground hover:text-foreground"}`}
            >
              Doorways
            </button>
            <button
              type="button"
              onClick={() => setViewMode("journey")}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${viewMode === "journey" ? "border-primary/25 bg-primary/10 text-foreground" : "border-border/30 bg-background/45 text-muted-foreground hover:text-foreground"}`}
            >
              Our Journey
            </button>
          </div>
        </section>

        {viewMode === "doorways" && (
          <>
            <section>
              <div className="mb-4">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Doorways</p>
                <h2 className="mt-2 font-display text-3xl text-foreground">Choose the right doorway for tonight</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  const active = activeTool === tool.key;
                  return (
                    <button
                      key={tool.key}
                      type="button"
                      onClick={() => setActiveTool(tool.key)}
                      className={`relative overflow-hidden rounded-[26px] border p-5 text-left transition-all ${
                        active
                          ? "border-primary/30 bg-primary/10 shadow-[0_18px_50px_-36px_rgba(255,173,70,0.42)]"
                          : "border-border/30 bg-card/45 hover:border-primary/20 hover:bg-card/55"
                      }`}
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-65">
                        <div className="absolute -right-6 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                        <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />
                      </div>
                      <div className="relative flex h-full flex-col">
                        <div className={`inline-flex w-fit rounded-2xl border border-border/30 bg-background/45 p-3 ${tool.iconClass}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 font-display text-2xl text-foreground">{tool.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{tool.subtitle}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              {activeTool === "weather" && <IntimacyWeather coupleId={coupleId} onNavigate={navigateTool} />}
              {activeTool === "rituals" && <RitualCards coupleId={coupleId} />}
              {activeTool === "positions" && <PositionDeck />}
              {activeTool === "messages" && <TempleMessages coupleId={coupleId} />}
              {activeTool === "guide" && <TempleGuide />}
              {activeTool === "repair" && <RepairMode />}
              {activeTool === "pathways" && <Pathways coupleId={coupleId} />}
              {activeTool === "altar" && <MemoryAltar coupleId={coupleId} />}
            </section>
          </>
        )}

        {viewMode === "journey" && (
          <section className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Our Journey</p>
              <h2 className="mt-2 font-display text-3xl text-foreground">What is living in the relationship now</h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
                <div className="flex items-center gap-2 text-violet-300">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">Sticky note from your partner</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-foreground/90">{activity.partnerNote}</p>
              </div>

              <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
                <div className="flex items-center gap-2 text-amber-300">
                  <Stars className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">Last temple movement</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-foreground/90">{activity.lastMove}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Shared rhythm</div>
                <div className="mt-3 font-display text-4xl text-foreground">{activity.rhythmCount}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Days with some shared temple activity recorded.</p>
              </div>

              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Streak count</div>
                <div className="mt-3 font-display text-4xl text-foreground">{activity.streakCount}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Consecutive active days based on your recent temple rhythm.</p>
              </div>

              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Altar memory</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{activity.altarNote}</p>
              </div>

              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Next suggestion</div>
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
                  This space is ready to become the history of what you send each other: teasing cards, gratitude cards, ritual invitations, little apologies, and warm follow-ups after the night is over.
                </p>
              </div>

              <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Route className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">Where the journey can grow</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Over time, this page can become your living dashboard: notes from each other, last rituals completed, streaks, saved memories, message history, and the current season of your relationship.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PartnerSpace;
