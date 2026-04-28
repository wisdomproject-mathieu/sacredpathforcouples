import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  BookHeart,
  Check,
  Copy,
  Eye,
  Flame,
  Hand,
  Heart,
  HeartHandshake,
  MessageCircle,
  MoveHorizontal,
  Orbit,
  PauseCircle,
  Sparkles,
  Volume2,
  Wind,
} from "lucide-react";

import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { fetchCoupleStateForUser } from "@/lib/couples";
import { getLocalDayRange, pickLatestWeatherForCouple } from "@/lib/weatherEntries";
import { resolveTonightPathSixCards, useSelectedDailyMainCard, type SelectedDailyMainCard } from "@/lib/weatherEngine";
import RitualTimerButton from "@/components/ritual/RitualTimerButton";

type WeatherEntry = Pick<Tables<"weather_entries">, "id" | "state" | "user_id" | "created_at">;

// ─── Theme visuals (mirrors TonightPathExperience) ───────────────────────────

type ThemeKey =
  | "breath" | "gaze" | "touch" | "massage" | "embrace"
  | "movement" | "stillness" | "sound" | "union"
  | "emotional_clearing" | "energy" | "reading";

const themeVisuals: Record<ThemeKey | string, { icon: ComponentType<{ className?: string }>; toneClass: string }> = {
  breath:    { icon: Wind,         toneClass: "border-cyan-300/30 bg-gradient-to-br from-cyan-500/12 via-card/70 to-card/35" },
  gaze:      { icon: Eye,          toneClass: "border-indigo-300/30 bg-gradient-to-br from-indigo-500/12 via-card/70 to-card/35" },
  touch:     { icon: HeartHandshake, toneClass: "border-rose-300/30 bg-gradient-to-br from-rose-500/12 via-card/70 to-card/35" },
  massage:   { icon: Hand,         toneClass: "border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-card/70 to-card/35" },
  embrace:   { icon: Heart,        toneClass: "border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-card/70 to-card/35" },
  movement:  { icon: MoveHorizontal, toneClass: "border-orange-300/30 bg-gradient-to-br from-orange-500/12 via-card/70 to-card/35" },
  stillness: { icon: PauseCircle,  toneClass: "border-slate-300/30 bg-gradient-to-br from-slate-500/12 via-card/70 to-card/35" },
  sound:     { icon: Volume2,      toneClass: "border-pink-300/30 bg-gradient-to-br from-pink-500/12 via-card/70 to-card/35" },
  union:     { icon: Flame,        toneClass: "border-red-300/30 bg-gradient-to-br from-red-500/12 via-card/70 to-card/35" },
  emotional_clearing: { icon: MessageCircle, toneClass: "border-emerald-300/30 bg-gradient-to-br from-emerald-500/12 via-card/70 to-card/35" },
  energy:    { icon: Orbit,        toneClass: "border-violet-300/30 bg-gradient-to-br from-violet-500/12 via-card/70 to-card/35" },
  reading:   { icon: BookHeart,    toneClass: "border-amber-200/25 bg-gradient-to-br from-amber-400/10 via-card/70 to-card/35" },
};

const fallbackVisual = { icon: Sparkles, toneClass: "border-primary/30 bg-gradient-to-br from-primary/12 via-card/70 to-card/35" };
const getThemeVisual = (theme: string) => themeVisuals[theme as ThemeKey] ?? fallbackVisual;

// ─── 8 standalone rituals ────────────────────────────────────────────────────
// Accessible to all users — no premium gate. Ordered easiest first.

const STANDALONE_RITUALS: SelectedDailyMainCard[] = [
  {
    id: "standalone-soft-eye",
    title: "The Soft Eye",
    subtitle: "Diana Richardson · gaze primer · 1 min",
    description:
      "Instead of looking at your partner, receive them. Let your eyes go wide and unfocused so the face becomes light rather than feature. Works beautifully as a solo reflection on how to look at your partner when they arrive.",
    duration: "1 min",
    intimacyLevel: "Gentle",
    primaryNeed: "Presence",
    theme: "gaze",
    ritualSteps: [
      "Sit comfortably. If alone, sit in front of a candle or close your eyes and picture your partner.",
      "Let your eyes go wide and slightly out of focus — soft, peripheral.",
      "Notice how the softness changes what you see and how you feel.",
      "Hold for 1 minute. Notice what opens.",
    ],
  },
  {
    id: "standalone-stillness-after",
    title: "The Stillness After",
    subtitle: "Barry Long · stillness practice · 1 min",
    description:
      "Barry Long taught that lovemaking does not end when movement ends. The stillness that follows — held without rushing to phone or conversation — is where the real exchange happens. Practice it now as a preview of what is possible tonight.",
    duration: "1 min",
    intimacyLevel: "Sacred",
    primaryNeed: "Integration",
    theme: "stillness",
    ritualSteps: [
      "Sit or lie still. Let the body be completely quiet.",
      "Do not reach for anything. Do not plan anything.",
      "Feel the quality of the silence in the room.",
      "For 1 minute, let the stillness be the whole practice.",
    ],
  },
  {
    id: "standalone-body-already-knows",
    title: "What the Body Already Knows",
    subtitle: "Diana Richardson · grounding before connection · 3 min",
    description:
      "Before any practice, Richardson teaches arriving in the body itself — not in thought about the body. Three minutes of simple body awareness opens a receptivity that nothing else can manufacture.",
    duration: "3 min",
    intimacyLevel: "Gentle",
    primaryNeed: "Grounding",
    theme: "breath",
    ritualSteps: [
      "Sit quietly. Close your eyes.",
      "Breathe into the belly. Feel the weight of your body on the chair or floor.",
      "Scan slowly: feet, legs, belly, chest, hands, face. Not looking for anything — just noticing.",
      "Ask internally: 'What does my body already know about tonight?' Let an answer arrive without forcing it.",
    ],
  },
  {
    id: "standalone-first-hour",
    title: "The First Hour",
    subtitle: "Diana Richardson · morning or evening reflection · 1 min",
    description:
      "Richardson often teaches that the first hour of the day — or the last hour before sleep — sets the entire quality of the partnership. One minute of conscious intention before you meet your partner changes everything that follows.",
    duration: "1 min",
    intimacyLevel: "Gentle",
    primaryNeed: "Intention",
    theme: "stillness",
    ritualSteps: [
      "Before you see your partner, pause for 1 minute.",
      "Breathe slowly. Soften your shoulders.",
      "Set one intention for how you want to meet them: 'I will arrive with presence, not urgency.'",
      "Carry that intention into the room with you.",
    ],
  },
  {
    id: "standalone-body-is-temple",
    title: "The Body Is the Temple",
    subtitle: "Sacred Path reading · evening practice",
    description:
      "An evening reading to open the heart before intimacy. The body is not an obstacle to the sacred — it is where the sacred arrives. Read this slowly, aloud if possible, and let it settle before anything else begins.",
    duration: "3 min",
    intimacyLevel: "Reflective",
    primaryNeed: "Reverence",
    theme: "reading",
    ritualSteps: [
      "Read slowly. Do not rush. Let each sentence land before moving to the next.",
      "'The body already knows what the mind is still learning. It does not need permission to be sacred.'",
      "'When two people meet with full presence — not performance, not urgency — the room itself changes.'",
      "'Tonight is an invitation. Not a demand. An opening. Begin there.'",
      "Sit with what you have read for one minute of silence.",
    ],
  },
  {
    id: "standalone-melting-hug",
    title: "The Melting Hug",
    subtitle: "Diana Richardson · embrace · 2 min solo or with partner",
    description:
      "When practiced alone, this is a self-embrace — both arms crossing the chest, hands resting on shoulders. When practiced with a partner, it is six minutes of full-body contact until both nervous systems drop. Tonight's version works either way.",
    duration: "2 min",
    intimacyLevel: "Tender",
    primaryNeed: "Co-regulation",
    theme: "embrace",
    ritualSteps: [
      "Solo: cross your arms over your chest, hands resting softly on your shoulders. Close your eyes.",
      "With partner: stand front to front, full-body contact, arms wrapped softly — not gripping.",
      "Breathe slowly through the nose. Let your weight settle.",
      "Stay through the first minute without shifting or talking. Around minute two, notice the softening.",
    ],
  },
  {
    id: "standalone-reading-rumi",
    title: "Reading Rumi Aloud",
    subtitle: "Sufi devotional · 3 min",
    description:
      "From the Sufi tradition: read three or four short Rumi poems slowly, aloud, taking turns. Do not analyse them. Let the words land where they land. The tradition has observed that reading together opens the heart between the two readers as much as it opens it toward the poetry.",
    duration: "3 min",
    intimacyLevel: "Devotional",
    primaryNeed: "Heart-opening",
    theme: "reading",
    ritualSteps: [
      "Light a candle if you have one. Sit close.",
      "Take turns reading one short Rumi poem aloud. Slowly. No analysis.",
      "After the last poem, sit in silence for 30 seconds.",
      "Place one hand on your own heart, or your partner's. Let what the poems opened complete itself in silence.",
    ],
  },
  {
    id: "standalone-synchronized-heart-breathing",
    title: "Synchronized Heart Breathing",
    subtitle: "Diana Richardson · attunement primer · 10 min",
    description:
      "The simplest tantric practice and often the most effective. You sync your breath rhythms until two nervous systems begin to entrain. The full couple ritual unlocks when your partner checks in. Begin here, alone or together.",
    duration: "10 min",
    intimacyLevel: "Gentle",
    primaryNeed: "Attunement",
    theme: "breath",
    ritualSteps: [
      "Sit cross-legged facing each other, or alone with hands on your own heart.",
      "With partner: place your right palm on their heart. Feel their right palm on yours.",
      "Close your eyes. Breathe naturally for 1 minute.",
      "Slowly begin to match the breath — inhale together, exhale together.",
      "Hold synchrony for 5 minutes. If you drift, return without judgment.",
      "Open eyes for 1 minute of soft mutual gazing. End with one shared deep breath.",
    ],
  },
];

// ─── Copy / translations ─────────────────────────────────────────────────────

type TonightState = "both_checked_in" | "waiting_for_partner" | "solo";

const copyByLang: Record<
  Language,
  {
    eyebrow: string;
    // State A
    tonight_state_a_title: string;
    tonight_state_a_subtitle: string;
    // State B
    tonight_state_b_title: (partnerName: string) => string;
    tonight_state_b_subtitle: string;
    // State C
    tonight_state_c_title: string;
    tonight_state_c_subtitle: string;
    // Shared UI
    mainTag: string;
    stepsLabel: string;
    copy: string;
    copied: string;
    weatherCombo: string;
    forTonightLabel: string;
  }
> = {
  en: {
    eyebrow: "Tonight Path",
    tonight_state_a_title: "Tonight, for the two of you",
    tonight_state_a_subtitle: "Your weather combined. A practice chosen for where you both are.",
    tonight_state_b_title: (name) => `While you wait for ${name}`,
    tonight_state_b_subtitle: "Something to soften into. Your shared evening practice will open when they check in.",
    tonight_state_c_title: "Tonight",
    tonight_state_c_subtitle: "A few of the most beautiful evening practices in the Sacred Path. No partner needed yet — choose one.",
    mainTag: "Main ritual",
    stepsLabel: "What to do",
    copy: "Copy practice",
    copied: "Copied",
    weatherCombo: "Weather combination",
    forTonightLabel: "For tonight",
  },
  fr: {
    eyebrow: "Chemin de ce soir",
    tonight_state_a_title: "Ce soir, pour vous deux",
    tonight_state_a_subtitle: "Vos météos réunies. Une pratique choisie pour là où vous êtes tous les deux.",
    tonight_state_b_title: (name) => `En attendant ${name}`,
    tonight_state_b_subtitle: "Quelque chose pour s'adoucir. Votre pratique du soir s'ouvrira quand iel se connectera.",
    tonight_state_c_title: "Ce soir",
    tonight_state_c_subtitle: "Quelques-unes des plus belles pratiques du soir du Sacred Path. Pas besoin de partenaire — choisissez-en une.",
    mainTag: "Rituel principal",
    stepsLabel: "Que faire",
    copy: "Copier la pratique",
    copied: "Copié",
    weatherCombo: "Combinaison météo",
    forTonightLabel: "Pour ce soir",
  },
  cs: {
    eyebrow: "Dnešní cesta",
    tonight_state_a_title: "Dnes večer, pro vás dva",
    tonight_state_a_subtitle: "Vaše počasí spojené. Praxe vybraná pro to, kde jste oba.",
    tonight_state_b_title: (name) => `Než se ${name} přidá`,
    tonight_state_b_subtitle: "Něco, do čeho se uvolnit. Vaše společná večerní praxe se otevře, jakmile se přihlásí.",
    tonight_state_c_title: "Dnes večer",
    tonight_state_c_subtitle: "Několik nejkrásnějších večerních praxí Sacred Path. Partner zatím není potřeba — vyberte si jednu.",
    mainTag: "Hlavní rituál",
    stepsLabel: "Co dělat",
    copy: "Kopírovat praxi",
    copied: "Zkopírováno",
    weatherCombo: "Kombinace počasí",
    forTonightLabel: "Pro dnešní večer",
  },
};

const formatPair = (a: string | null | undefined, b: string | null | undefined) => {
  const cap = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);
  if (!a && !b) return "—";
  if (a && b) return `${cap(a)} + ${cap(b)}`;
  return cap(String(a || b));
};

const buildShareText = (card: SelectedDailyMainCard) =>
  `Let's try ${card.title} tonight. ${card.subtitle || card.description || ""}`.trim();

// ─── Ritual card (shared by all three states) ────────────────────────────────

const RitualCard = ({
  card,
  index,
  isMain,
  copy,
  coupleId,
}: {
  card: SelectedDailyMainCard;
  index: number;
  isMain: boolean;
  copy: typeof copyByLang.en;
  coupleId: string | null;
}) => {
  const [expanded, setExpanded] = useState(index === 0);
  const [copiedId, setCopiedId] = useState(false);

  const visual = getThemeVisual(card.theme);
  const Icon = visual.icon;
  const stepsToShow = expanded ? card.ritualSteps : card.ritualSteps.slice(0, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildShareText(card));
      setCopiedId(true);
      window.setTimeout(() => setCopiedId(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <article
      className={`rounded-2xl border p-4 transition-all ${visual.toneClass} ${
        isMain ? "ring-1 ring-amber-300/40 shadow-[0_14px_35px_-24px_rgba(255,173,70,0.5)]" : ""
      } ${expanded ? "lg:col-span-2" : ""}`}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="block w-full text-left"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/30 bg-background/55">
              <Icon className="h-5 w-5 text-foreground/85" />
            </span>
            <div>
              <h3 className="font-display text-2xl text-foreground">{card.title}</h3>
              {card.subtitle ? (
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {card.subtitle}
                </p>
              ) : null}
            </div>
          </div>
          {isMain ? (
            <span className="rounded-full border border-amber-300/35 bg-amber-500/14 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">
              {copy.mainTag}
            </span>
          ) : null}
        </div>

        {card.description ? (
          <p className={`mt-3 text-[0.98rem] leading-7 text-foreground/90 ${expanded ? "" : "line-clamp-3"}`}>
            {card.description}
          </p>
        ) : null}

        {card.ritualSteps.length > 0 ? (
          <div className="mt-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{copy.stepsLabel}</p>
            <ol className="mt-2 space-y-1.5 text-[0.98rem] leading-7 text-foreground/90">
              {stepsToShow.map((step, stepIndex) => (
                <li key={`${card.id}-step-${stepIndex}`}>
                  {stepIndex + 1}. {step}
                </li>
              ))}
            </ol>
            {!expanded && card.ritualSteps.length > 2 ? (
              <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-primary/80">
                +{card.ritualSteps.length - 2} more · tap to open
              </p>
            ) : null}
          </div>
        ) : null}
      </button>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <RitualTimerButton
          ritualTitle={card.title}
          ritualSource="tonight-path"
          coupleId={coupleId}
          suggestedDuration={card.duration}
          variant="subtle"
          label={`Timer · ${card.duration}`}
        />
        <span className="break-words rounded-lg border border-border/30 bg-background/55 px-2 py-1 text-[11px] text-foreground/85">
          {card.intimacyLevel}
        </span>
        <span className="break-words rounded-lg border border-border/30 bg-background/55 px-2 py-1 text-[11px] text-foreground/85">
          {card.primaryNeed}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{copy.forTonightLabel}</p>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); void handleCopy(); }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/35 bg-card/50 px-3 py-1.5 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/65"
        >
          {copiedId ? (
            <Check className="h-3.5 w-3.5 text-emerald-300" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copiedId ? copy.copied : copy.copy}
        </button>
      </div>
    </article>
  );
};

// ─── Main component ──────────────────────────────────────────────────────────

const TonightPaths = () => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const copy = copyByLang[lang];

  const [loading, setLoading] = useState(true);
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [partnerUserId, setPartnerUserId] = useState<string | null>(null);
  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [myWeatherEntry, setMyWeatherEntry] = useState<WeatherEntry | null>(null);
  const [partnerWeatherEntry, setPartnerWeatherEntry] = useState<WeatherEntry | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const syncWeather = async (activeCoupleId: string, partnerId: string | null) => {
      const { startIso, endIso } = getLocalDayRange();
      const { data } = await supabase
        .from("weather_entries")
        .select("id, state, user_id, created_at")
        .eq("couple_id", activeCoupleId)
        .gte("created_at", startIso)
        .lt("created_at", endIso)
        .order("created_at", { ascending: false })
        .order("id", { ascending: false });

      const { myEntry, partnerEntry } = pickLatestWeatherForCouple(data ?? [], user.id, partnerId);
      setMyWeatherEntry(myEntry);
      setPartnerWeatherEntry(partnerEntry);
    };

    const load = async () => {
      setLoading(true);
      const coupleState = await fetchCoupleStateForUser(supabase, user.id);
      if (!coupleState.connected || !coupleState.activeCouple) {
        setConnected(false);
        setCoupleId(null);
        setPartnerUserId(null);
        setMyWeatherEntry(null);
        setPartnerWeatherEntry(null);
        setLoading(false);
        return;
      }

      setConnected(true);
      setCoupleId(coupleState.activeCouple.id);
      setPartnerUserId(coupleState.partnerId ?? null);

      // Fetch partner name from profiles
      if (coupleState.partnerId) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("id", coupleState.partnerId)
          .maybeSingle();
        setPartnerName(profileData?.display_name ?? null);
      }

      await syncWeather(coupleState.activeCouple.id, coupleState.partnerId ?? null);
      setLoading(false);
    };

    void load();

    const couplesAChannel = supabase
      .channel(`tonight_paths_couples_a_${user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "couples", filter: `partner_a=eq.${user.id}` }, () => void load())
      .subscribe();

    const couplesBChannel = supabase
      .channel(`tonight_paths_couples_b_${user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "couples", filter: `partner_b=eq.${user.id}` }, () => void load())
      .subscribe();

    return () => {
      supabase.removeChannel(couplesAChannel);
      supabase.removeChannel(couplesBChannel);
    };
  }, [user]);

  useEffect(() => {
    if (!user || !coupleId) return;

    const syncWeather = async () => {
      const { startIso, endIso } = getLocalDayRange();
      const { data } = await supabase
        .from("weather_entries")
        .select("id, state, user_id, created_at")
        .eq("couple_id", coupleId)
        .gte("created_at", startIso)
        .lt("created_at", endIso)
        .order("created_at", { ascending: false })
        .order("id", { ascending: false });

      const { myEntry, partnerEntry } = pickLatestWeatherForCouple(data ?? [], user.id, partnerUserId);
      setMyWeatherEntry(myEntry);
      setPartnerWeatherEntry(partnerEntry);
    };

    void syncWeather();

    const weatherChannel = supabase
      .channel(`tonight_paths_weather_${coupleId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "weather_entries", filter: `couple_id=eq.${coupleId}` }, () => void syncWeather())
      .subscribe();

    return () => { supabase.removeChannel(weatherChannel); };
  }, [coupleId, partnerUserId, user]);

  const selectedMainCardState = useSelectedDailyMainCard({
    partnerAWeather: myWeatherEntry?.state ?? null,
    partnerBWeather: partnerWeatherEntry?.state ?? null,
    coupleId,
  });

  const weatherCards = useMemo(
    () => resolveTonightPathSixCards(selectedMainCardState, 6),
    [selectedMainCardState.selectedDailyMainCard?.id, selectedMainCardState.normalizedKey, selectedMainCardState.alternates],
  );

  // Determine which of the three states we are in
  const bothCheckedIn = selectedMainCardState.ready && weatherCards.length > 0;
  const oneCheckedIn = connected && (!!myWeatherEntry || !!partnerWeatherEntry) && !bothCheckedIn;

  const tonightState: TonightState = bothCheckedIn
    ? "both_checked_in"
    : oneCheckedIn
      ? "waiting_for_partner"
      : "solo";

  const pairLabel = formatPair(myWeatherEntry?.state, partnerWeatherEntry?.state);
  const effectivePartnerName = partnerName ?? (lang === "fr" ? "votre partenaire" : lang === "cs" ? "vašeho partnera" : "your partner");

  const headerTitle =
    tonightState === "both_checked_in"
      ? copy.tonight_state_a_title
      : tonightState === "waiting_for_partner"
        ? copy.tonight_state_b_title(effectivePartnerName)
        : copy.tonight_state_c_title;

  const headerBody =
    tonightState === "both_checked_in"
      ? copy.tonight_state_a_subtitle
      : tonightState === "waiting_for_partner"
        ? copy.tonight_state_b_subtitle
        : copy.tonight_state_c_subtitle;

  const displayCards: SelectedDailyMainCard[] =
    tonightState === "both_checked_in" ? weatherCards : STANDALONE_RITUALS;

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-primary/20 bg-gradient-to-br from-primary/12 via-background/94 to-background/90 p-4 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.42)] md:p-6">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img src={shivaShaktiIcon} alt="" className="h-full w-full object-cover opacity-[0.14]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-background/58 to-background/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/64 via-transparent to-background/52" />
      </div>

      <div className="relative">
        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-[18px] border border-border/30 bg-card/45" />
            ))}
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-5">
              <p className="text-xs uppercase tracking-[0.24em] text-primary/80">{copy.eyebrow}</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">{headerTitle}</h2>
              {headerBody ? (
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">{headerBody}</p>
              ) : null}


              {/* Weather combo badge — State A only */}
              {tonightState === "both_checked_in" ? (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs text-foreground/90">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="uppercase tracking-[0.14em] text-primary/85">{copy.weatherCombo}:</span>
                  <span>{pairLabel}</span>
                </div>
              ) : null}
            </div>

            {/* Cards grid */}
            <div className="grid gap-3 lg:grid-cols-2">
              {displayCards.map((card, index) => (
                <RitualCard
                  key={card.id}
                  card={card}
                  index={index}
                  isMain={index === 0}
                  copy={copy}
                  coupleId={coupleId}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TonightPaths;
