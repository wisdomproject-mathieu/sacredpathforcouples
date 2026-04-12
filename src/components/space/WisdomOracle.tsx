import { useEffect, useMemo, useState } from "react";
import { Brain, Compass, Flame, Heart, MessageCircle, Route, Shield, Sparkles, Stars } from "lucide-react";

import DoorwayShell from "@/components/space/DoorwayShell";
import ShareCardButton from "@/components/space/ShareCardButton";
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

type OracleTone = "romantic" | "erotic" | "playful" | "healing" | "devotional";
type HeatLevel = "soft" | "balanced" | "intense";
type OracleFocus = "bonding" | "attraction" | "repair" | "growth";

type OracleMove = {
  id: string;
  title: string;
  why: string;
  cta: string;
  target: string;
  iconClass: string;
};

type OracleStep = {
  id: string;
  title: string;
  detail: string;
  target: string;
  iconClass: string;
};

const tonePresets: {
  key: OracleTone;
  title: string;
  subtitle: string;
  iconClass: string;
  categories: string[];
  openingTarget: string;
}[] = [
  {
    key: "romantic",
    title: "Romantic",
    subtitle: "Tender atmosphere, appreciation, and emotional closeness.",
    iconClass: "text-rose-300",
    categories: ["presence", "touch", "reconnect"],
    openingTarget: "messages",
  },
  {
    key: "erotic",
    title: "Erotic",
    subtitle: "Magnetic charge, erotic pacing, and embodied polarity.",
    iconClass: "text-orange-300",
    categories: ["polarity", "touch", "playful"],
    openingTarget: "positions",
  },
  {
    key: "playful",
    title: "Playful",
    subtitle: "Lightness, novelty, teasing, and spontaneity.",
    iconClass: "text-fuchsia-300",
    categories: ["playful", "presence", "reconnect"],
    openingTarget: "rituals",
  },
  {
    key: "healing",
    title: "Healing",
    subtitle: "Regulation-first repair and nervous-system safety.",
    iconClass: "text-sky-300",
    categories: ["breath", "reconnect", "bedtime"],
    openingTarget: "repair",
  },
  {
    key: "devotional",
    title: "Devotional",
    subtitle: "Sacred intention, gratitude, and ceremony over speed.",
    iconClass: "text-amber-300",
    categories: ["presence", "reconnect", "touch"],
    openingTarget: "guide",
  },
];

const heatOptions: { key: HeatLevel; label: string; note: string }[] = [
  { key: "soft", label: "Soft", note: "Slow pace and emotional safety first" },
  { key: "balanced", label: "Balanced", note: "Warm connection with some charge" },
  { key: "intense", label: "Intense", note: "High-energy intimacy with structure" },
];

const focusOptions: { key: OracleFocus; label: string; note: string }[] = [
  { key: "bonding", label: "Bonding", note: "More emotional closeness tonight" },
  { key: "attraction", label: "Attraction", note: "More playful/erotic momentum" },
  { key: "repair", label: "Repair", note: "Clear tension and reconnect" },
  { key: "growth", label: "Growth", note: "Invest in long-term pathway" },
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

  const [tone, setTone] = useState<OracleTone>("romantic");
  const [heat, setHeat] = useState<HeatLevel>("balanced");
  const [focus, setFocus] = useState<OracleFocus>("bonding");

  const prefsKey = useMemo(() => {
    const couplePart = coupleId || "solo";
    const userPart = user?.id || "anon";
    return `sacredpath_oracle_prefs_${couplePart}_${userPart}`;
  }, [coupleId, user?.id]);

  useEffect(() => {
    const raw = localStorage.getItem(prefsKey);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as {
        tone?: OracleTone;
        heat?: HeatLevel;
        focus?: OracleFocus;
      };

      if (parsed.tone) setTone(parsed.tone);
      if (parsed.heat) setHeat(parsed.heat);
      if (parsed.focus) setFocus(parsed.focus);
    } catch {
      // ignore corrupted local preferences
    }
  }, [prefsKey]);

  useEffect(() => {
    localStorage.setItem(
      prefsKey,
      JSON.stringify({
        tone,
        heat,
        focus,
      })
    );
  }, [focus, heat, prefsKey, tone]);

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
    };
  }, [altarItems, messages, pathways, progressRows, weatherEntries]);

  const selectedTone = useMemo(
    () => tonePresets.find((preset) => preset.key === tone) ?? tonePresets[0],
    [tone]
  );

  const tunedRitual = useMemo(() => {
    const focusCategoryMap: Record<OracleFocus, string[]> = {
      bonding: ["presence", "reconnect", "touch"],
      attraction: ["playful", "polarity", "touch"],
      repair: ["breath", "reconnect", "bedtime"],
      growth: ["presence", "reconnect", "polarity"],
    };

    const weatherCategoryMap: Record<string, string[]> = {
      stressed: ["breath", "reconnect"],
      reassurance: ["reconnect", "presence"],
      tired: ["breath", "bedtime"],
      longing: ["touch", "presence"],
      tender: ["touch", "presence"],
      open: ["presence", "reconnect"],
      playful: ["playful", "polarity"],
      erotic: ["polarity", "touch"],
    };

    const desiredCategories = new Set<string>([
      ...selectedTone.categories,
      ...focusCategoryMap[focus],
      ...(analytics.latestWeather ? weatherCategoryMap[analytics.latestWeather.state] ?? [] : []),
    ]);

    return (
      rituals.find((ritual) => !ritual.premium_required && desiredCategories.has(ritual.category)) ??
      rituals.find((ritual) => !ritual.premium_required) ??
      rituals[0] ??
      null
    );
  }, [analytics.latestWeather, focus, rituals, selectedTone.categories]);

  const oraclePlan = useMemo(() => {
    const entryTarget = focus === "repair" ? "repair" : selectedTone.openingTarget;

    const entryStep: OracleStep = {
      id: "entry",
      title: "1. Arrival signal",
      detail:
        focus === "repair"
          ? "Begin with one regulation move so both nervous systems feel safer before deeper content."
          : "Open with one short emotional signal so you both enter the same field.",
      target: entryTarget,
      iconClass: "text-sky-300",
    };

    const deepenStep: OracleStep = {
      id: "deepen",
      title: "2. Deepen the moment",
      detail: tunedRitual
        ? `Use "${tunedRitual.title}" as your core practice tonight. Keep the pace ${heat}.`
        : "Choose one guided ritual or position and let the body set the pace.",
      target: tunedRitual ? "rituals" : "positions",
      iconClass: heat === "intense" ? "text-orange-300" : "text-fuchsia-300",
    };

    const integrateStep: OracleStep = {
      id: "integrate",
      title: "3. Lock in continuity",
      detail:
        focus === "growth"
          ? "Close by advancing one pathway day so tonight becomes long-term momentum."
          : "Close with one message or altar memory so the emotional trace stays alive tomorrow.",
      target: focus === "growth" ? "pathways" : "messages",
      iconClass: "text-emerald-300",
    };

    return [entryStep, deepenStep, integrateStep];
  }, [focus, heat, selectedTone.openingTarget, tunedRitual]);

  const oracleMoves = useMemo(() => {
    const moves: OracleMove[] = [];

    moves.push({
      id: "tone-directive",
      title: `Tonight's Oracle Tone: ${selectedTone.title}`,
      why: selectedTone.subtitle,
      cta: "Open first doorway",
      target: selectedTone.openingTarget,
      iconClass: selectedTone.iconClass,
    });

    if (!coupleId) {
      moves.push({
        id: "preview-start-weather",
        title: "Set your first couple baseline",
        why: "When your partner connects, two weather check-ins instantly improve Oracle precision.",
        cta: "Open weather",
        target: "weather",
        iconClass: "text-sky-300",
      });

      if (tunedRitual) {
        moves.push({
          id: "preview-ritual",
          title: `Try this first ritual: ${tunedRitual.title}`,
          why: "This recommendation is matched to your selected tone and focus.",
          cta: "Open rituals",
          target: "rituals",
          iconClass: "text-fuchsia-300",
        });
      }

      if (analytics.nextPathway) {
        moves.push({
          id: "preview-pathway",
          title: `Prepare pathway: ${analytics.nextPathway.title}`,
          why: "Pre-selecting your pathway avoids startup friction once you are both in.",
          cta: "Open pathways",
          target: "pathways",
          iconClass: "text-emerald-300",
        });
      }

      return moves.slice(0, 4);
    }

    if (!analytics.latestWeather) {
      moves.push({
        id: "check-weather",
        title: "Name the emotional climate first",
        why: "Without a fresh weather signal, couples often choose intensity mismatched to reality.",
        cta: "Open weather",
        target: "weather",
        iconClass: "text-sky-300",
      });
    }

    if (tunedRitual) {
      moves.push({
        id: "tuned-ritual",
        title: `Run ritual: ${tunedRitual.title}`,
        why: `Oracle selected this from your ${selectedTone.title.toLowerCase()} tone, ${focus} focus, and recent signals.`,
        cta: "Open rituals",
        target: "rituals",
        iconClass: "text-fuchsia-300",
      });
    }

    if (!analytics.latestMessage || (analytics.silentDays !== null && analytics.silentDays >= 2)) {
      moves.push({
        id: "message-bridge",
        title: "Close the gap with one precise message",
        why: "A short shared note protects momentum between bigger rituals.",
        cta: "Open messages",
        target: "messages",
        iconClass: "text-violet-300",
      });
    }

    if (analytics.activePathway && analytics.activeProgress) {
      moves.push({
        id: "continue-pathway",
        title: `Continue ${analytics.activePathway.title}`,
        why: `You are on day ${analytics.activeProgress.current_day}. Continuity is your edge right now.`,
        cta: "Open pathways",
        target: "pathways",
        iconClass: "text-emerald-300",
      });
    } else if (analytics.nextPathway) {
      moves.push({
        id: "start-pathway",
        title: `Start pathway: ${analytics.nextPathway.title}`,
        why: "Your current data suggests this is the right moment to move from one-off to progression.",
        cta: "Open pathways",
        target: "pathways",
        iconClass: "text-emerald-300",
      });
    }

    if (moves.length < 4) {
      moves.push({
        id: "oracle-guide",
        title: "Use Temple Guide for micro-calibration",
        why: "Guide helps when multiple options are valid and you want a faster decision.",
        cta: "Open guide",
        target: "guide",
        iconClass: "text-cyan-300",
      });
    }

    return moves.slice(0, 4);
  }, [analytics, coupleId, focus, selectedTone, tunedRitual]);

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
      title="Couple intelligence engine for what to do next"
      description="Configure the tone you want tonight, then Oracle composes the next best sequence from your shared signals, saved memory, and Temple content." 
      actionLabel="Refresh oracle"
      onAction={() => setRefreshTick((value) => value + 1)}
      actionDisabled={loading}
    >
      <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
        <div className="flex items-center gap-2 text-primary/80">
          <Stars className="h-4 w-4" />
          <p className="text-xs uppercase tracking-[0.22em]">Oracle configuration</p>
        </div>
        <h3 className="mt-2 font-display text-3xl text-foreground">Pre-configure tonight together</h3>

        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {tonePresets.map((preset) => {
            const active = tone === preset.key;
            return (
              <button
                key={preset.key}
                type="button"
                onClick={() => setTone(preset.key)}
                className={`rounded-[20px] border p-4 text-left transition-all ${
                  active
                    ? "border-primary/30 bg-primary/10 shadow-[0_16px_42px_-34px_rgba(255,173,70,0.48)]"
                    : "border-border/30 bg-background/45 hover:border-primary/20"
                }`}
              >
                <div className={`inline-flex rounded-xl border border-border/30 bg-card/45 p-2 ${preset.iconClass}`}>
                  {preset.key === "erotic" ? <Flame className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
                </div>
                <div className="mt-3 font-display text-xl text-foreground">{preset.title}</div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{preset.subtitle}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Intensity</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {heatOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setHeat(option.key)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-all ${
                    heat === option.key
                      ? "border-primary/30 bg-primary/10 text-foreground"
                      : "border-border/30 bg-card/45 text-muted-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{heatOptions.find((item) => item.key === heat)?.note}</p>
          </div>

          <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Primary focus</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {focusOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setFocus(option.key)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-all ${
                    focus === option.key
                      ? "border-primary/30 bg-primary/10 text-foreground"
                      : "border-border/30 bg-card/45 text-muted-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{focusOptions.find((item) => item.key === focus)?.note}</p>
          </div>
        </div>

        <div className="mt-4">
          <ShareCardButton
            coupleId={coupleId}
            messageType="oracle_config_share"
            content={`Oracle configuration ✦ Tone: ${selectedTone.title}, Intensity: ${heat}, Focus: ${focus}.`}
            label="Share oracle configuration"
          />
        </div>
      </section>

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
              <Compass className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.22em]">Tonight sequence</p>
            </div>
            <h3 className="mt-2 font-display text-3xl text-foreground">Oracle sequence for tonight</h3>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {oraclePlan.map((step) => (
                <div key={step.id} className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${step.iconClass}`}>
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h4 className="mt-4 font-display text-2xl text-foreground">{step.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.detail}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate(step.target)}
                      className="rounded-2xl border border-primary/25 bg-primary/12 px-4 py-3 text-xs text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
                    >
                      Open step
                    </button>
                    <ShareCardButton
                      coupleId={coupleId}
                      messageType="oracle_sequence_share"
                      content={`Oracle sequence card ✦ ${step.title} — ${step.detail}`}
                      label="Share step"
                    />
                  </div>
                </div>
              ))}
            </div>
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
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate(move.target)}
                      className="rounded-2xl border border-primary/25 bg-primary/12 px-4 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
                    >
                      {move.cta}
                    </button>
                    <ShareCardButton
                      coupleId={coupleId}
                      messageType="oracle_move_share"
                      content={`Oracle move card ✦ ${move.title} — ${move.why}`}
                      label="Share move"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
            <div className="flex items-center gap-2 text-amber-300">
              <Sparkles className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.22em]">Niche subscription features</p>
            </div>
            <h3 className="mt-2 font-display text-3xl text-foreground">Premium couple intelligence lovers ask for</h3>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
                <div className="inline-flex rounded-xl border border-border/30 bg-card/45 p-2 text-rose-300">
                  <Heart className="h-4 w-4" />
                </div>
                <h4 className="mt-3 font-display text-xl text-foreground">Desire Synchrony Dial</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Tracks how often erotic and emotional tempos match, then proposes precise bridge rituals.</p>
              </div>

              <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
                <div className="inline-flex rounded-xl border border-border/30 bg-card/45 p-2 text-violet-300">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <h4 className="mt-3 font-display text-xl text-foreground">Afterglow Debrief Engine</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Turns shared moments into post-ritual prompts that deepen trust instead of fading overnight.</p>
              </div>

              <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
                <div className="inline-flex rounded-xl border border-border/30 bg-card/45 p-2 text-emerald-300">
                  <Route className="h-4 w-4" />
                </div>
                <h4 className="mt-3 font-display text-xl text-foreground">Seasonal Intimacy Forecast</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Predicts your next best relational season and suggests the exact pathway to maintain momentum.</p>
              </div>
            </div>

            <div className="mt-4 rounded-[22px] border border-border/30 bg-background/45 p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-primary mt-1" />
                <p className="text-sm leading-6 text-muted-foreground">
                  Oracle stays advisory, never coercive. It gives a strong next move, while preserving emotional consent, pacing, and relational sovereignty.
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
