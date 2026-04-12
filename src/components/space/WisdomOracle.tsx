import { useEffect, useMemo, useState } from "react";
import { Brain, Compass, Heart, Route, Shield, Sparkles, Stars } from "lucide-react";

import DoorwayShell from "@/components/space/DoorwayShell";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

interface Props {
  coupleId?: string;
  onNavigate: (tab: string) => void;
}

type WeatherEntry = Tables<"weather_entries">;
type PartnerMessage = Tables<"partner_messages">;
type AltarItem = Tables<"altar_items">;
type PathwayProgress = Tables<"pathway_progress">;
type Pathway = Tables<"pathways">;
type Ritual = Tables<"ritual_items">;

type OracleMove = {
  id: string;
  title: string;
  why: string;
  cta: string;
  target: string;
  iconClass: string;
};

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

const daysAgo = (iso?: string | null) => {
  if (!iso) return null;
  const now = new Date();
  const then = new Date(iso);
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
};

const WisdomOracle = ({ coupleId, onNavigate }: Props) => {
  const { user } = useAuth();

  const [weatherEntries, setWeatherEntries] = useState<WeatherEntry[]>([]);
  const [messages, setMessages] = useState<PartnerMessage[]>([]);
  const [altarItems, setAltarItems] = useState<AltarItem[]>([]);
  const [progressRows, setProgressRows] = useState<PathwayProgress[]>([]);
  const [pathways, setPathways] = useState<Pathway[]>([]);
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);

      const [pathwaysRes, ritualsRes] = await Promise.all([
        supabase.from("pathways").select("*").order("premium_required", { ascending: true }),
        supabase
          .from("ritual_items")
          .select("*")
          .eq("item_type", "ritual")
          .order("premium_required", { ascending: true }),
      ]);

      setPathways(pathwaysRes.data ?? []);
      setRituals(ritualsRes.data ?? []);

      if (!coupleId) {
        setWeatherEntries([]);
        setMessages([]);
        setAltarItems([]);
        setProgressRows([]);
        setLoading(false);
        return;
      }

      const [weatherRes, messagesRes, altarRes, progressRes] = await Promise.all([
        supabase
          .from("weather_entries")
          .select("*")
          .eq("couple_id", coupleId)
          .order("created_at", { ascending: false })
          .limit(80),
        supabase
          .from("partner_messages")
          .select("*")
          .eq("couple_id", coupleId)
          .order("created_at", { ascending: false })
          .limit(80),
        supabase
          .from("altar_items")
          .select("*")
          .eq("couple_id", coupleId)
          .order("created_at", { ascending: false })
          .limit(80),
        supabase
          .from("pathway_progress")
          .select("*")
          .eq("couple_id", coupleId)
          .order("last_opened_at", { ascending: false }),
      ]);

      setWeatherEntries(weatherRes.data ?? []);
      setMessages(messagesRes.data ?? []);
      setAltarItems(altarRes.data ?? []);
      setProgressRows(progressRes.data ?? []);
      setLoading(false);
    };

    load();
  }, [coupleId, refreshTick, user]);

  const analytics = useMemo(() => {
    const latestWeather = weatherEntries[0] ?? null;
    const latestMessage = messages[0] ?? null;
    const latestAltar = altarItems[0] ?? null;

    const allDates = [
      ...weatherEntries.map((item) => dayKey(item.created_at)),
      ...messages.map((item) => dayKey(item.created_at)),
      ...altarItems.map((item) => dayKey(item.created_at)),
    ].filter(Boolean) as string[];

    const rhythmDays = new Set(allDates).size;
    const streakCount = computeStreak(allDates);
    const silentDays = daysAgo(latestMessage?.created_at);

    const startedPathwayIds = new Set(progressRows.map((row) => row.pathway_id));
    const activeProgress = progressRows[0] ?? null;
    const activePathway = pathways.find((pathway) => pathway.id === activeProgress?.pathway_id) ?? null;
    const nextPathway =
      pathways.find((pathway) => !pathway.premium_required && !startedPathwayIds.has(pathway.id)) ??
      pathways.find((pathway) => !pathway.premium_required) ??
      pathways[0] ??
      null;

    const categoryHints: Record<string, string[]> = {
      stressed: ["breath", "reconnect"],
      reassurance: ["reconnect", "presence"],
      tired: ["breath", "bedtime"],
      longing: ["touch", "presence"],
      tender: ["touch", "presence"],
      open: ["presence", "reconnect"],
      playful: ["playful", "polarity"],
      erotic: ["polarity", "touch"],
    };

    const categories = latestWeather ? categoryHints[latestWeather.state] ?? ["presence"] : ["presence"];
    const suggestedRitual =
      rituals.find((ritual) => !ritual.premium_required && categories.includes(ritual.category)) ??
      rituals.find((ritual) => !ritual.premium_required) ??
      rituals[0] ??
      null;

    return {
      latestWeather,
      latestMessage,
      latestAltar,
      rhythmDays,
      streakCount,
      silentDays,
      activeProgress,
      activePathway,
      nextPathway,
      suggestedRitual,
    };
  }, [altarItems, messages, pathways, progressRows, rituals, weatherEntries]);

  const oracleMoves = useMemo(() => {
    const moves: OracleMove[] = [];

    if (!coupleId) {
      moves.push({
        id: "preview-start-weather",
        title: "Start with one shared signal",
        why: "Once your partner connects, one weather check-in each gives Oracle clean data to work from.",
        cta: "Open weather",
        target: "weather",
        iconClass: "text-sky-300",
      });

      if (analytics.suggestedRitual) {
        moves.push({
          id: "preview-ritual",
          title: `Try: ${analytics.suggestedRitual.title}`,
          why: "This recommendation comes from your current Temple content and works as a simple first practice.",
          cta: "Open rituals",
          target: "rituals",
          iconClass: "text-fuchsia-300",
        });
      }

      if (analytics.nextPathway) {
        moves.push({
          id: "preview-pathway",
          title: `Prepare pathway: ${analytics.nextPathway.title}`,
          why: "Choosing one pathway now makes couple onboarding smoother once both partners are in.",
          cta: "Open pathways",
          target: "pathways",
          iconClass: "text-emerald-300",
        });
      }

      return moves;
    }

    if (!analytics.latestWeather) {
      moves.push({
        id: "check-weather",
        title: "Name tonight's emotional climate",
        why: "Oracle performs best when both partners check in at least once per day.",
        cta: "Open weather",
        target: "weather",
        iconClass: "text-sky-300",
      });
    } else if (["stressed", "reassurance", "tired"].includes(analytics.latestWeather.state)) {
      moves.push({
        id: "repair-first",
        title: "Lead with regulation before intensity",
        why: `Latest shared climate is "${analytics.latestWeather.state}", which usually responds best to repair and soft pacing.`,
        cta: "Open repair",
        target: "repair",
        iconClass: "text-red-300",
      });
    } else if (["playful", "erotic"].includes(analytics.latestWeather.state)) {
      moves.push({
        id: "channel-energy",
        title: "Channel charge into a shaped ritual",
        why: "Your current weather is high-energy; structure helps convert chemistry into connection.",
        cta: "Open positions",
        target: "positions",
        iconClass: "text-rose-300",
      });
    } else {
      moves.push({
        id: "guided-step",
        title: "Take one guided next step",
        why: "The emotional field is open enough for a short guided ritual to deepen contact.",
        cta: "Open rituals",
        target: "rituals",
        iconClass: "text-fuchsia-300",
      });
    }

    if (!analytics.latestMessage || (analytics.silentDays !== null && analytics.silentDays >= 2)) {
      moves.push({
        id: "message-bridge",
        title: "Bridge the silence with one warm sentence",
        why: "A short message prevents drift and keeps momentum alive between rituals.",
        cta: "Open messages",
        target: "messages",
        iconClass: "text-violet-300",
      });
    }

    if (analytics.activePathway && analytics.activeProgress) {
      moves.push({
        id: "continue-pathway",
        title: `Continue ${analytics.activePathway.title}`,
        why: `You are on day ${analytics.activeProgress.current_day}. Continuity is your highest leverage move.`,
        cta: "Open pathways",
        target: "pathways",
        iconClass: "text-emerald-300",
      });
    } else if (analytics.nextPathway) {
      moves.push({
        id: "start-pathway",
        title: `Start pathway: ${analytics.nextPathway.title}`,
        why: "Oracle sees enough activity to support a longer arc, not just one-off moments.",
        cta: "Open pathways",
        target: "pathways",
        iconClass: "text-emerald-300",
      });
    }

    if (analytics.rhythmDays >= 4 && !analytics.latestAltar) {
      moves.push({
        id: "save-altar",
        title: "Capture one memory while it is still alive",
        why: "You have meaningful rhythm. Saving a memory now reinforces emotional continuity.",
        cta: "Open altar",
        target: "altar",
        iconClass: "text-orange-300",
      });
    }

    if (moves.length < 4) {
      moves.push({
        id: "oracle-guide",
        title: "Let Temple Guide refine tonight's move",
        why: "When multiple options are viable, Guide narrows to energy, time, and privacy constraints.",
        cta: "Open guide",
        target: "guide",
        iconClass: "text-cyan-300",
      });
    }

    return moves.slice(0, 4);
  }, [analytics, coupleId]);

  const signals = useMemo(
    () => [
      {
        label: "Rhythm days",
        value: coupleId ? String(analytics.rhythmDays) : "—",
        note: "Days with recorded shared activity",
      },
      {
        label: "Current streak",
        value: coupleId ? String(analytics.streakCount) : "—",
        note: "Consecutive active days",
      },
      {
        label: "Latest climate",
        value: coupleId ? analytics.latestWeather?.state ?? "No check-in" : "Preview mode",
        note: "Most recent intimacy weather",
      },
      {
        label: "Message gap",
        value: coupleId ? (analytics.silentDays === null ? "No messages" : `${analytics.silentDays} day(s)`) : "Preview mode",
        note: "Days since last partner message",
      },
    ],
    [analytics.latestWeather?.state, analytics.rhythmDays, analytics.silentDays, analytics.streakCount, coupleId]
  );

  return (
    <DoorwayShell
      label="Wisdom Oracle"
      title="AI-guided next steps for your relationship rhythm"
      description="Oracle reads your Temple data, then maps it to rituals, repair, pathways, and messaging moves so you always know what to do next."
      actionLabel="Refresh oracle"
      onAction={() => setRefreshTick((value) => value + 1)}
      actionDisabled={loading}
    >
      {loading ? (
        <section className="rounded-[24px] border border-border/30 bg-card/45 p-6">
          <p className="text-sm text-muted-foreground">Reading your latest temple data and composing next best moves…</p>
        </section>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {signals.map((signal) => (
              <div key={signal.label} className="rounded-[24px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{signal.label}</div>
                <div className="mt-3 font-display text-3xl text-foreground">{signal.value}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{signal.note}</p>
              </div>
            ))}
          </section>

          <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
            <div className="flex items-center gap-2 text-primary/80">
              <Brain className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.22em]">Oracle moves</p>
            </div>
            <h3 className="mt-2 font-display text-3xl text-foreground">What to do next</h3>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {oracleMoves.map((move) => (
                <div key={move.id} className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${move.iconClass}`}>
                    <Stars className="h-5 w-5" />
                  </div>
                  <h4 className="mt-4 font-display text-2xl text-foreground">{move.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{move.why}</p>
                  <button
                    type="button"
                    onClick={() => onNavigate(move.target)}
                    className="mt-4 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
                  >
                    {move.cta}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
            <div className="flex items-center gap-2 text-amber-300">
              <Sparkles className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.22em]">Oracle innovations</p>
            </div>
            <h3 className="mt-2 font-display text-3xl text-foreground">How Wisdom Oracle thinks</h3>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
                <div className="inline-flex rounded-xl border border-border/30 bg-card/45 p-2 text-sky-300">
                  <Heart className="h-4 w-4" />
                </div>
                <h4 className="mt-3 font-display text-xl text-foreground">Relationship signal weave</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Blends weather, messages, and altar memory into one live emotional map.</p>
              </div>

              <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
                <div className="inline-flex rounded-xl border border-border/30 bg-card/45 p-2 text-emerald-300">
                  <Route className="h-4 w-4" />
                </div>
                <h4 className="mt-3 font-display text-xl text-foreground">Progressive next-step logic</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Matches your saved rhythm with pathway progress and recommends the highest-leverage next move.</p>
              </div>

              <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
                <div className="inline-flex rounded-xl border border-border/30 bg-card/45 p-2 text-violet-300">
                  <Compass className="h-4 w-4" />
                </div>
                <h4 className="mt-3 font-display text-xl text-foreground">Content-aware guidance</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Uses live Temple content to route couples into rituals, repair, messages, and pathways that fit now.</p>
              </div>
            </div>

            <div className="mt-4 rounded-[22px] border border-border/30 bg-background/45 p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-primary mt-1" />
                <p className="text-sm leading-6 text-muted-foreground">
                  Oracle is advisory, not absolute. It gives a strong first move so couples avoid decision fatigue and stay connected to what matters most right now.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </DoorwayShell>
  );
};

export default WisdomOracle;
