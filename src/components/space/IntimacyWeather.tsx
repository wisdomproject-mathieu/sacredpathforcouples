import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { Cloud, Heart, Snowflake, SunMedium, Zap } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";
import SacredPathBrand from "@/components/SacredPathBrand";

interface Props {
  coupleId?: string;
  onNavigate: (tab: string) => void;
  myName?: string | null;
  partnerName?: string | null;
}

type WeatherEntry = Pick<Tables<"weather_entries">, "state" | "created_at" | "user_id"> & { id?: string };

type WeatherStateDef = {
  key: string;
  group: "distant" | "bonded";
  label: Record<Language, string>;
  hint: Record<Language, string>;
  Icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
  activeBorderClass: string;
  activeGlowClass: string;
};

type SideRole = "shiva" | "shakti";

type PanelDescriptor = {
  side: "left" | "right";
  owner: "me" | "partner";
  role: SideRole;
  displayName: string;
  selectedKey: string | null;
  onSelect: Dispatch<SetStateAction<string | null>>;
};

const STATES: WeatherStateDef[] = [
  {
    key: "stormy",
    group: "distant",
    label: { en: "Stormy", fr: "Orageux", cs: "Bouřlivé" },
    hint: { en: "Tense, hurt, or charged with something unspoken.", fr: "Tendu, blessé, ou chargé d'un non-dit.", cs: "Napjatý, zraněný nebo nabitý nevyřčeným." },
    Icon: Zap,
    iconClass: "text-slate-300",
    activeBorderClass: "border-slate-400/70",
    activeGlowClass: "shadow-[0_0_18px_-4px_rgba(148,163,184,0.6)]",
  },
  {
    key: "foggy",
    group: "distant",
    label: { en: "Foggy", fr: "Brumeux", cs: "Mlhavé" },
    hint: { en: "Unclear, drifting, not quite here.", fr: "Flou, incertain, pas tout à fait là.", cs: "Nejasný, unášený, ne zcela přítomný." },
    Icon: Cloud,
    iconClass: "text-slate-300",
    activeBorderClass: "border-slate-400/70",
    activeGlowClass: "shadow-[0_0_18px_-4px_rgba(148,163,184,0.6)]",
  },
  {
    key: "frozen",
    group: "distant",
    label: { en: "Frozen", fr: "Gelé", cs: "Zamrzlé" },
    hint: { en: "Numb, tired, shut down in the body.", fr: "Engourdi, fatigué, fermé dans le corps.", cs: "Znecitlivělý, unavený, uzavřený v těle." },
    Icon: Snowflake,
    iconClass: "text-sky-300",
    activeBorderClass: "border-sky-400/70",
    activeGlowClass: "shadow-[0_0_18px_-4px_rgba(125,211,252,0.55)]",
  },
  {
    key: "warm",
    group: "bonded",
    label: { en: "Warm", fr: "Chaleureux", cs: "Vřelé" },
    hint: { en: "Soft, tender, or wanting closeness.", fr: "Doux, tendre, ou désireux de proximité.", cs: "Jemný, něžný nebo toužící po blízkosti." },
    Icon: Heart,
    iconClass: "text-rose-400",
    activeBorderClass: "border-rose-400/70",
    activeGlowClass: "shadow-[0_0_18px_-4px_rgba(251,113,133,0.6)]",
  },
  {
    key: "electric",
    group: "bonded",
    label: { en: "Electric", fr: "Électrique", cs: "Elektrické" },
    hint: { en: "Crackling, drawn, awake in the body.", fr: "Pétillant, attiré, éveillé dans le corps.", cs: "Třaskavý, přitahovaný, probuzený v těle." },
    Icon: Zap,
    iconClass: "text-violet-400",
    activeBorderClass: "border-violet-400/70",
    activeGlowClass: "shadow-[0_0_18px_-4px_rgba(167,139,250,0.6)]",
  },
  {
    key: "sunny",
    group: "bonded",
    label: { en: "Sunny", fr: "Ensoleillé", cs: "Slunečné" },
    hint: { en: "Clear, light, easy with my partner today.", fr: "Clair, léger, à l'aise avec mon partenaire.", cs: "Jasný, lehký, v pohodě s partnerem dnes." },
    Icon: SunMedium,
    iconClass: "text-amber-400",
    activeBorderClass: "border-amber-400/70",
    activeGlowClass: "shadow-[0_0_18px_-4px_rgba(251,191,36,0.6)]",
  },
];

const DISTANT = STATES.filter((s) => s.group === "distant");
const BONDED = STATES.filter((s) => s.group === "bonded");

const CHAKRA_COLORS = [
  "bg-violet-500 shadow-[0_0_8px_2px_rgba(139,92,246,0.7)]",   // crown
  "bg-indigo-400 shadow-[0_0_8px_2px_rgba(99,102,241,0.7)]",   // third eye
  "bg-sky-400 shadow-[0_0_8px_2px_rgba(56,189,248,0.7)]",      // throat
  "bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.7)]",  // heart
  "bg-yellow-400 shadow-[0_0_8px_2px_rgba(250,204,21,0.7)]",   // solar
  "bg-orange-400 shadow-[0_0_8px_2px_rgba(251,146,60,0.7)]",   // sacral
  "bg-rose-500 shadow-[0_0_8px_2px_rgba(244,63,94,0.7)]",      // root
];

type CopyDef = {
  title: string;
  subtitle: string;
  youLabel: string;
  partnerLabel: string;
  shivaAspect: string;
  shaktiAspect: string;
  showRituals: string;
  premiumForTwo: string;
  distantLabel: string;
  bondedLabel: string;
  twoEnergies: string;
  oneJourney: string;
  centerText: string;
  sealWeather: string;
  saving: string;
  connectToSave: string;
  noCheckinYet: string;
};

const COPY: Record<Language, CopyDef> = {
  en: {
    title: "Your shared intimacy weather",
    subtitle: "Take a moment. Breathe. Share your current state, then welcome your partner's weather with love, respect, and curiosity.",
    youLabel: "YOU",
    partnerLabel: "PARTNER",
    shivaAspect: "Shiva Aspect",
    shaktiAspect: "Shakti Aspect",
    showRituals: "Show Ritual",
    premiumForTwo: "Premium for 2",
    distantLabel: "Distant",
    bondedLabel: "Bonded",
    twoEnergies: "TWO ENERGIES.",
    oneJourney: "ONE PATH.",
    centerText:
      "The secret to these rituals is not perfection. It is the intention you bring. If you feel rushed, pause, breathe, and reset. Intimacy is a garden - water it daily, and watch it bloom.",
    sealWeather: "Seal my weather",
    saving: "Saving…",
    connectToSave: "Connect to save",
    noCheckinYet: "No check-in yet today.",
  },
  fr: {
    title: "Votre météo d'intimité partagée",
    subtitle: "Prenez un moment. Respirez. Partagez votre état actuel, puis accueillez la météo de votre partenaire avec amour, respect et curiosité.",
    youLabel: "VOUS",
    partnerLabel: "PARTENAIRE",
    shivaAspect: "Aspect Shiva",
    shaktiAspect: "Aspect Shakti",
    showRituals: "Voir le rituel",
    premiumForTwo: "Premium pour 2",
    distantLabel: "Distant",
    bondedLabel: "Lié",
    twoEnergies: "DEUX ÉNERGIES.",
    oneJourney: "UN SEUL CHEMIN.",
    centerText:
      "Le secret de ces pratiques n'est pas la perfection. C'est l'intention que vous apportez. Si vous vous sentez pressés, arrêtez-vous, respirez et réinitialisez. L'intimité est un jardin - arrosez-la chaque jour et regardez-la fleurir.",
    sealWeather: "Sceller ma météo",
    saving: "Enregistrement…",
    connectToSave: "Connectez-vous pour sauvegarder",
    noCheckinYet: "Pas encore de check-in aujourd'hui.",
  },
  cs: {
    title: "Vaše sdílené počasí intimity",
    subtitle: "Zastavte se. Nadechněte se. Sdílejte svůj aktuální stav a přivítejte partnerovo počasí s láskou, respektem a zvědavostí.",
    youLabel: "VY",
    partnerLabel: "PARTNER",
    shivaAspect: "Aspekt Šivy",
    shaktiAspect: "Aspekt Šakti",
    showRituals: "Zobrazit rituál",
    premiumForTwo: "Premium pro 2",
    distantLabel: "Vzdálené",
    bondedLabel: "Propojené",
    twoEnergies: "DVĚ ENERGIE.",
    oneJourney: "JEDNA CESTA.",
    centerText:
      "Tajemství těchto praktik není dokonalost. Je to záměr, který přinášíte. Když spěcháte, zastavte se, nadechněte se a začněte znovu. Intimita je zahrada - zalévejte ji každý den a sledujte, jak rozkvétá.",
    sealWeather: "Uložit moje počasí",
    saving: "Ukládám…",
    connectToSave: "Propojte se pro uložení",
    noCheckinYet: "Dnes ještě není check-in.",
  },
};

const getLocalDayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { startIso: start.toISOString(), endIso: end.toISOString() };
};

const resolveDisplayName = (value: string | null | undefined, fallback: string) => value?.trim() || fallback;
const weatherPreviewKey = (coupleId?: string) => `sacred_path_weather_preview_${coupleId ?? "global"}`;

/* ─── Ornate weather card ─────────────────────────────────────── */
const WeatherCard = ({
  def,
  lang,
  selected,
  onClick,
}: {
  def: WeatherStateDef;
  lang: Language;
  selected: boolean;
  onClick?: () => void;
}) => {
  const Icon = def.Icon;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "relative w-full rounded-xl border p-3 text-left transition-all group",
        selected
          ? cn("border-amber-400/60 bg-[#1a1035]", def.activeBorderClass, def.activeGlowClass)
          : "border-amber-400/20 bg-[#0f0a20] hover:border-amber-400/40",
        onClick ? "cursor-pointer" : "cursor-default",
      )}
    >
      {/* Corner ornaments */}
      <span className="pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-amber-400/50" />
      <span className="pointer-events-none absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-amber-400/50" />
      <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-amber-400/50" />
      <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-amber-400/50" />

      <Icon className={cn("mb-1.5 h-3.5 w-3.5", selected ? def.iconClass : "text-amber-400/40")} />
      <p className={cn("text-xs font-bold leading-tight", selected ? "text-foreground" : "text-foreground/60")}>
        {def.label[lang]}
      </p>
      <p className="mt-1 text-[10px] leading-[1.35] text-muted-foreground/60">
        {def.hint[lang]}
      </p>
    </button>
  );
};

/* ─── Chakra figure placeholder ──────────────────────────────── */
const ChakraFigure = ({ label }: { label: string }) => (
  <div className="relative flex flex-col items-center py-2 select-none">
    {/* Head */}
    <div className="mb-1.5 h-9 w-9 rounded-full bg-gradient-to-b from-[#2a1f4a] to-[#1a1035] border border-amber-400/20 shadow-[0_0_16px_rgba(251,191,36,0.1)]" />
    {/* Body */}
    <div className="relative flex w-14 flex-col items-center rounded-b-[2rem] bg-gradient-to-b from-[#241845] to-[#1a1035] border-x border-b border-amber-400/12" style={{ height: 120 }}>
      {/* Chakra dots */}
      {CHAKRA_COLORS.map((cls, i) => (
        <div
          key={i}
          className={cn("absolute w-3 h-3 rounded-full", cls)}
          style={{ top: `${i * 15 + 4}px` }}
        />
      ))}
    </div>
    <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-amber-400/50">{label}</p>
  </div>
);

/* ─── Main component ─────────────────────────────────────────── */
const IntimacyWeather = ({ coupleId, onNavigate, myName, partnerName }: Props) => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const copy = COPY[lang];

  const [mySelected, setMySelected] = useState<string | null>(null);
  const [partnerState, setPartnerState] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [ownNameFallback, setOwnNameFallback] = useState<string>("You");
  const [partnerNameFallback, setPartnerNameFallback] = useState<string>("Partner");

  useEffect(() => {
    if (!coupleId || !user) return;
    const load = async () => {
      const { startIso, endIso } = getLocalDayRange();
      const { data } = await supabase
        .from("weather_entries")
        .select("id, state, created_at, user_id")
        .eq("couple_id", coupleId)
        .gte("created_at", startIso)
        .lt("created_at", endIso)
        .order("created_at", { ascending: false });

      if (data) {
        const latest = new Map<string, WeatherEntry>();
        for (const item of data) if (!latest.has(item.user_id)) latest.set(item.user_id, item);
        const mine = latest.get(user.id) ?? null;
        const partner = Array.from(latest.values()).find((e) => e.user_id !== user.id) ?? null;
        if (mine?.state) setMySelected(mine.state);
        if (partner?.state) setPartnerState(partner.state);
      }
    };
    load();
    const ch = supabase
      .channel(`weather_${coupleId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "weather_entries", filter: `couple_id=eq.${coupleId}` }, load)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [coupleId, user]);

  useEffect(() => {
    setOwnNameFallback(resolveDisplayName(myName, "You"));
  }, [myName]);

  useEffect(() => {
    setPartnerNameFallback(resolveDisplayName(partnerName, "Partner"));
  }, [partnerName]);

  useEffect(() => {
    if (!coupleId) return;
    try {
      localStorage.setItem(
        weatherPreviewKey(coupleId),
        JSON.stringify({
          myWeather: mySelected ?? null,
          partnerWeather: partnerState ?? null,
          updatedAt: new Date().toISOString(),
        }),
      );
    } catch {
      // ignore storage errors
    }
  }, [coupleId, mySelected, partnerState]);

  const saveWeather = async () => {
    if (!user || !mySelected || !coupleId) return;
    setSaving(true);
    await supabase.from("weather_entries").insert({ couple_id: coupleId, user_id: user.id, state: mySelected });
    setSaving(false);
  };

  const selectedWeatherLabel = (key: string | null) => {
    const def = key ? STATES.find((item) => item.key === key) : null;
    if (!def) return copy.noCheckinYet;
    return def.label[lang];
  };

  const panelDescriptors = useMemo(() => {
    const left = {
      side: "left" as const,
      owner: "me" as const,
      role: "shiva" as const,
      displayName: ownNameFallback,
      selectedKey: mySelected,
      onSelect: setMySelected,
    };

    const right = {
      side: "right" as const,
      owner: "partner" as const,
      role: "shakti" as const,
      displayName: partnerNameFallback,
      selectedKey: partnerState,
      onSelect: setPartnerState,
    };

    return [left, right];
  }, [mySelected, ownNameFallback, partnerNameFallback, partnerState]);

  /* ─── Side panel ────────────────────────────────────────────── */
  const SidePanel = ({ panel }: { panel: PanelDescriptor }) => {
    const selectedKey = panel.selectedKey;
    const figureLabel = panel.role === "shiva" ? "Shiva" : "Shakti";
    const selectedWeatherText = selectedWeatherLabel(selectedKey);
    const selectedDef = selectedKey ? STATES.find((state) => state.key === selectedKey) ?? null : null;

    return (
      <div className="flex flex-col gap-3">
        {/* Bonded row */}
        <div>
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-amber-500/80">
            {copy.bondedLabel}
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {BONDED.map((def) => (
              <WeatherCard
                key={def.key}
                def={def}
                lang={lang}
                selected={selectedKey === def.key}
                onClick={() => panel.onSelect(def.key)}
              />
            ))}
          </div>
        </div>

        {/* Chakra figure */}
        <div className="rounded-[22px] border border-amber-400/18 bg-gradient-to-b from-background/48 via-card/46 to-background/36 p-3 shadow-[0_20px_55px_-40px_rgba(0,0,0,0.7)]">
          <div className="mt-2 flex justify-center">
            <ChakraFigure label={figureLabel} />
          </div>
          {selectedKey ? (
            <>
              <p className="mt-2 text-center font-display text-xl text-foreground">{selectedWeatherText}</p>
              <p className="mt-1 text-center text-sm leading-6 text-muted-foreground/80">
                {selectedDef?.hint[lang] ?? copy.noCheckinYet}
              </p>
            </>
          ) : null}
        </div>

        {/* Distant row */}
        <div>
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-500/80">
            {copy.distantLabel}
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {DISTANT.map((def) => (
              <WeatherCard
                key={def.key}
                def={def}
                lang={lang}
                selected={selectedKey === def.key}
                onClick={() => panel.onSelect(def.key)}
              />
            ))}
          </div>
        </div>

        {/* Save – my side only */}
        {panel.owner === "me" && (
          <button
            type="button"
            onClick={saveWeather}
            disabled={!mySelected || saving || !coupleId}
            className="mt-1 w-full rounded-xl border border-amber-400/25 bg-amber-500/8 py-2.5 text-xs font-semibold uppercase tracking-widest text-foreground/80 transition-all hover:border-amber-400/50 hover:bg-amber-500/14 disabled:opacity-40"
          >
            {!coupleId ? copy.connectToSave : saving ? copy.saving : copy.sealWeather}
          </button>
        )}
      </div>
    );
  };

  /* ─── Render ─────────────────────────────────────────────────── */
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-start">
        <SacredPathBrand />
      </div>

      {/* Header */}
      <div className="text-center">
        <h2 className="font-display text-3xl text-foreground">{copy.title}</h2>
        <p className="mx-auto mt-1.5 max-w-3xl text-sm text-muted-foreground">{copy.subtitle}</p>
      </div>

      {/* Three-column grid — fixed at md+ */}
      <div className="grid gap-3 md:grid-cols-[1fr_220px_1fr]">

        {/* YOU */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-400/15 bg-[#0d0920]/80 p-4 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(245,158,11,0.06)]">
          {/* Subtle inner glow */}
          <div className="pointer-events-none absolute -left-8 top-0 h-24 w-24 rounded-full bg-amber-400/5 blur-3xl" />
          <SidePanel panel={panelDescriptors[0]} />
        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center gap-3 py-2">
          <button
            type="button"
            onClick={() => onNavigate("show_ritual")}
            className="w-full rounded-[22px] border border-amber-300/35 bg-gradient-to-b from-amber-300/92 to-amber-500/78 px-4 py-4 text-sm font-semibold leading-5 tracking-[0.03em] text-[#201308] shadow-[0_18px_45px_-28px_rgba(251,191,36,0.8)] transition-all hover:scale-[1.01] hover:border-amber-200/60"
          >
            {copy.showRituals}
          </button>

          <button
            type="button"
            onClick={() => onNavigate("pricing")}
            className="w-full rounded-[22px] border border-amber-400/18 bg-gradient-to-b from-amber-400/16 via-amber-300/10 to-background/45 px-4 py-4 text-sm font-semibold leading-5 tracking-[0.03em] text-foreground/95 shadow-[0_16px_45px_-32px_rgba(0,0,0,0.7)] transition-all hover:border-amber-300/40 hover:bg-amber-400/18"
          >
            {copy.premiumForTwo}
          </button>

          <div className="w-full rounded-[22px] border border-amber-400/18 bg-card/55 px-4 py-4 text-center shadow-[0_16px_45px_-32px_rgba(0,0,0,0.7)] backdrop-blur">
            <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-amber-300">{copy.twoEnergies}</p>
            <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-amber-300">{copy.oneJourney}</p>
            <p className="mx-auto mt-3 max-w-[22ch] text-base leading-8 text-muted-foreground/90">
              {copy.centerText}
            </p>
          </div>

        </div>

        {/* PARTNER */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-400/15 bg-[#0d0920]/80 p-4 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(245,158,11,0.06)]">
          <div className="pointer-events-none absolute -right-8 top-0 h-24 w-24 rounded-full bg-amber-400/5 blur-3xl" />
          <SidePanel panel={panelDescriptors[1]} />
        </div>
      </div>
    </div>
  );
};

export default IntimacyWeather;
