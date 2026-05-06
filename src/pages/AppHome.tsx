import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Cloud, Copy, Heart, HeartHandshake, Snowflake, SunMedium, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";

import SacredPathBrand from "@/components/SacredPathBrand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchCoupleStateForUser,
  markEverConnected,
  storeConnectedCoupleId,
  clearForceDisconnected,
} from "@/lib/couples";
import { type WeatherState } from "@/data/ritualLibrary";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────────
   Sacred Temple weather definitions — mirror IntimacyWeather component
   (Bonded / Distant grouping, amber-on-deep-purple aesthetic).
   ──────────────────────────────────────────────────────────────────── */

type WeatherStateDef = {
  key: WeatherState;
  group: "distant" | "bonded";
  label: Record<Language, string>;
  hint: Record<Language, string>;
  Icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
  activeBorderClass: string;
  activeGlowClass: string;
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
  "bg-violet-500 shadow-[0_0_8px_2px_rgba(139,92,246,0.7)]",
  "bg-indigo-400 shadow-[0_0_8px_2px_rgba(99,102,241,0.7)]",
  "bg-sky-400 shadow-[0_0_8px_2px_rgba(56,189,248,0.7)]",
  "bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.7)]",
  "bg-yellow-400 shadow-[0_0_8px_2px_rgba(250,204,21,0.7)]",
  "bg-orange-400 shadow-[0_0_8px_2px_rgba(251,146,60,0.7)]",
  "bg-rose-500 shadow-[0_0_8px_2px_rgba(244,63,94,0.7)]",
];

/* ────────────────────────────────────────────────────────────────────
   Localised copy
   ──────────────────────────────────────────────────────────────────── */

type CopyDef = {
  greeting: string;
  prompt: string;
  youLabel: string;
  partnerLabel: string;
  shivaAspect: string;
  shaktiAspect: string;
  distantLabel: string;
  bondedLabel: string;
  twoEnergies: string;
  oneJourney: string;
  centerText: string;
  openTonightPath: string;
  pickBoth: string;
  // Connect card
  connectKicker: string;
  connectTitle: string;
  connectIntro: string;
  yourInviteCode: string;
  yourCoupleCode: string;
  createInvite: string;
  copy: string;
  share: string;
  haveCode: string;
  enterCode: string;
  joinPartner: string;
  soloHint: string;
  connectedKicker: string;
  connectedTitle: string;
  connectedDesc: string;
};

const COPY: Record<Language, CopyDef> = {
  en: {
    greeting: "How are you two feeling tonight?",
    prompt: "Take a moment. Breathe. Choose the weather inside you, then the weather you sense in your partner.",
    youLabel: "YOU",
    partnerLabel: "PARTNER",
    shivaAspect: "Shiva",
    shaktiAspect: "Shakti",
    distantLabel: "Distant",
    bondedLabel: "Bonded",
    twoEnergies: "TWO ENERGIES.",
    oneJourney: "ONE PATH.",
    centerText: "The path opens once both weathers are named. Choose tenderly — the temple meets you exactly where you are.",
    openTonightPath: "Open Tonight Path",
    pickBoth: "Choose both weathers to open tonight's path",
    connectKicker: "Connect with partner",
    connectTitle: "One code links your temple",
    connectIntro: "Share a code with your beloved. Once it is entered, your weathers, rituals, and gratitude flow between you.",
    yourInviteCode: "Your invite code",
    yourCoupleCode: "Your couple code",
    createInvite: "Create invite code",
    copy: "Copy",
    share: "Share",
    haveCode: "Have a code from your partner?",
    enterCode: "ENTER CODE",
    joinPartner: "Join partner",
    soloHint: "You can also continue solo — your weather and rituals still work without a partner.",
    connectedKicker: "Connected",
    connectedTitle: "Your temple is shared",
    connectedDesc: "You and your beloved are linked. Weather, rituals, and gratitude now flow between you.",
  },
  fr: {
    greeting: "Comment vous sentez-vous, vous deux ce soir ?",
    prompt: "Prenez un moment. Respirez. Choisissez la météo en vous, puis la météo que vous percevez chez votre partenaire.",
    youLabel: "VOUS",
    partnerLabel: "PARTENAIRE",
    shivaAspect: "Shiva",
    shaktiAspect: "Shakti",
    distantLabel: "Distant",
    bondedLabel: "Lié",
    twoEnergies: "DEUX ÉNERGIES.",
    oneJourney: "UN SEUL CHEMIN.",
    centerText: "Le chemin s'ouvre quand les deux météos sont nommées. Choisissez avec tendresse — le temple vous rejoint là où vous êtes.",
    openTonightPath: "Ouvrir le chemin de ce soir",
    pickBoth: "Choisissez les deux météos pour ouvrir le chemin",
    connectKicker: "Se connecter au partenaire",
    connectTitle: "Un code relie votre temple",
    connectIntro: "Partagez un code avec votre bien-aimé(e). Une fois saisi, vos météos, rituels et gratitudes circulent entre vous.",
    yourInviteCode: "Votre code d'invitation",
    yourCoupleCode: "Votre code de couple",
    createInvite: "Créer un code",
    copy: "Copier",
    share: "Partager",
    haveCode: "Vous avez un code de votre partenaire ?",
    enterCode: "ENTRER LE CODE",
    joinPartner: "Rejoindre",
    soloHint: "Vous pouvez aussi continuer seul(e) — la météo et les rituels fonctionnent sans partenaire.",
    connectedKicker: "Connectés",
    connectedTitle: "Votre temple est partagé",
    connectedDesc: "Vous et votre bien-aimé(e) êtes liés. Météo, rituels et gratitude circulent désormais entre vous.",
  },
  cs: {
    greeting: "Jak se dnes večer cítíte spolu?",
    prompt: "Zastavte se. Nadechněte se. Zvolte počasí ve vás, pak počasí, které cítíte u svého partnera.",
    youLabel: "VY",
    partnerLabel: "PARTNER",
    shivaAspect: "Šiva",
    shaktiAspect: "Šakti",
    distantLabel: "Vzdálené",
    bondedLabel: "Propojené",
    twoEnergies: "DVĚ ENERGIE.",
    oneJourney: "JEDNA CESTA.",
    centerText: "Cesta se otevře, když jsou obě počasí pojmenována. Vybírejte něžně — chrám vás potká přesně tam, kde jste.",
    openTonightPath: "Otevřít dnešní cestu",
    pickBoth: "Zvolte obě počasí pro otevření cesty",
    connectKicker: "Propojit s partnerem",
    connectTitle: "Jeden kód propojí váš chrám",
    connectIntro: "Sdílejte kód se svým milovaným. Jakmile jej zadá, vaše počasí, rituály a vděčnost mezi vámi proudí.",
    yourInviteCode: "Váš zvací kód",
    yourCoupleCode: "Váš párový kód",
    createInvite: "Vytvořit kód",
    copy: "Kopírovat",
    share: "Sdílet",
    haveCode: "Máte kód od partnera?",
    enterCode: "ZADEJTE KÓD",
    joinPartner: "Připojit",
    soloHint: "Můžete také pokračovat sami — počasí a rituály fungují i bez partnera.",
    connectedKicker: "Propojeno",
    connectedTitle: "Váš chrám je sdílený",
    connectedDesc: "Vy a váš milovaný jste propojeni. Počasí, rituály a vděčnost mezi vámi nyní proudí.",
  },
};

/* ────────────────────────────────────────────────────────────────────
   Ornate weather card — same visual language as IntimacyWeather.
   ──────────────────────────────────────────────────────────────────── */

const WeatherCard = ({
  def,
  lang,
  selected,
  onClick,
}: {
  def: WeatherStateDef;
  lang: Language;
  selected: boolean;
  onClick: () => void;
}) => {
  const Icon = def.Icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full rounded-xl border p-3 text-left transition-all group cursor-pointer",
        selected
          ? cn("border-amber-400/60 bg-[#1a1035]", def.activeBorderClass, def.activeGlowClass)
          : "border-amber-400/20 bg-[#0f0a20] hover:border-amber-400/40",
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

/* ────────────────────────────────────────────────────────────────────
   Chakra figure — same as IntimacyWeather
   ──────────────────────────────────────────────────────────────────── */

const ChakraFigure = ({ label }: { label: string }) => (
  <div className="relative flex flex-col items-center py-2 select-none">
    <div className="mb-1.5 h-9 w-9 rounded-full bg-gradient-to-b from-[#2a1f4a] to-[#1a1035] border border-amber-400/20 shadow-[0_0_16px_rgba(251,191,36,0.1)]" />
    <div
      className="relative flex w-14 flex-col items-center rounded-b-[2rem] bg-gradient-to-b from-[#241845] to-[#1a1035] border-x border-b border-amber-400/12"
      style={{ height: 120 }}
    >
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

/* ────────────────────────────────────────────────────────────────────
   Side panel — Bonded row, chakra figure, Distant row
   ──────────────────────────────────────────────────────────────────── */

const SidePanel = ({
  copy,
  lang,
  ownerLabel,
  figureLabel,
  selected,
  onSelect,
}: {
  copy: CopyDef;
  lang: Language;
  ownerLabel: string;
  figureLabel: string;
  selected: WeatherState | null;
  onSelect: (key: WeatherState) => void;
}) => {
  const selectedDef = selected ? STATES.find((s) => s.key === selected) ?? null : null;

  return (
    <div className="flex flex-col gap-3">
      {/* Owner label */}
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-300/80">
        {ownerLabel}
      </p>

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
              selected={selected === def.key}
              onClick={() => onSelect(def.key)}
            />
          ))}
        </div>
      </div>

      {/* Chakra figure */}
      <div className="rounded-[22px] border border-amber-400/18 bg-gradient-to-b from-background/48 via-card/46 to-background/36 p-3 shadow-[0_20px_55px_-40px_rgba(0,0,0,0.7)]">
        <div className="mt-2 flex justify-center">
          <ChakraFigure label={figureLabel} />
        </div>
        {selectedDef ? (
          <>
            <p className="mt-2 text-center font-display text-xl text-foreground">
              {selectedDef.label[lang]}
            </p>
            <p className="mt-1 text-center text-sm leading-6 text-muted-foreground/80">
              {selectedDef.hint[lang]}
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
              selected={selected === def.key}
              onClick={() => onSelect(def.key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────
   Connect-with-partner block — sits in the CENTER column.
   Visually: the same amber-on-deep-purple temple cards.
   ──────────────────────────────────────────────────────────────────── */

const generateCode = () => Math.random().toString(36).slice(2, 8).toUpperCase();

function PartnerConnectBlock({ copy }: { copy: CopyDef }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const loadState = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    const resolved = await fetchCoupleStateForUser(supabase, user.id);
    if (resolved.connected && resolved.activeCouple?.id) {
      markEverConnected(user.id);
      storeConnectedCoupleId(user.id, resolved.activeCouple.id);
    }
    setIsConnected(resolved.connected);
    setInviteCode(
      resolved.connected
        ? resolved.activeCouple?.couple_code ?? null
        : resolved.pendingInvite?.couple_code ?? null,
    );
    setLoading(false);
  }, [user]);

  useEffect(() => {
    void loadState();
  }, [loadState]);

  useEffect(() => {
    if (!user) return;
    const refresh = () => void loadState();
    const a = supabase
      .channel(`home_couples_a_${user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "couples", filter: `partner_a=eq.${user.id}` }, refresh)
      .subscribe();
    const b = supabase
      .channel(`home_couples_b_${user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "couples", filter: `partner_b=eq.${user.id}` }, refresh)
      .subscribe();
    return () => {
      supabase.removeChannel(a);
      supabase.removeChannel(b);
    };
  }, [user, loadState]);

  const createInvite = async () => {
    if (!user) return;
    setBusy(true);
    const existing = await fetchCoupleStateForUser(supabase, user.id);
    if (existing.pendingInvite?.couple_code) {
      setInviteCode(existing.pendingInvite.couple_code);
      setBusy(false);
      return;
    }
    for (let i = 0; i < 3; i++) {
      const newCode = generateCode();
      const { error } = await supabase.from("couples").insert({ partner_a: user.id, couple_code: newCode });
      if (!error) {
        await loadState();
        setBusy(false);
        return;
      }
      if (!error.message?.includes("unique")) break;
    }
    toast.error("Could not create invite right now.");
    setBusy(false);
  };

  const joinWithCode = async () => {
    if (!user || !code.trim()) return;
    setBusy(true);
    const cleanCode = code.trim().toUpperCase();
    const { data: target } = await supabase
      .from("couples")
      .select("id, partner_a, partner_b")
      .eq("couple_code", cleanCode)
      .is("partner_b", null)
      .maybeSingle();
    if (!target) {
      toast.error("Invite code not found.");
      setBusy(false);
      return;
    }
    if (target.partner_a === user.id) {
      toast.error("This is already your own code.");
      setBusy(false);
      return;
    }
    const { data: updated } = await supabase
      .from("couples")
      .update({ partner_b: user.id })
      .eq("id", target.id)
      .is("partner_b", null)
      .select("id, partner_b");
    if (!updated || !updated.find((r) => r.partner_b === user.id)) {
      toast.error("Could not join this couple right now.");
      setBusy(false);
      return;
    }
    clearForceDisconnected(user.id);
    toast.success("You are now connected.");
    setCode("");
    await loadState();
    setBusy(false);
  };

  const fallbackCopy = (text: string) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  };

  const copyInvite = async () => {
    if (!inviteCode) {
      toast.error("No code yet.");
      return;
    }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(inviteCode);
        toast.success(`Code ${inviteCode} copied.`);
        return;
      }
      throw new Error("no clipboard");
    } catch {
      if (fallbackCopy(inviteCode)) {
        toast.success(`Code ${inviteCode} copied.`);
      } else {
        toast.error("Copy failed. Long-press the code to copy it.");
      }
    }
  };

  const shareInvite = async () => {
    if (!inviteCode) {
      toast.error("No code yet.");
      return;
    }
    const message = `Join me on Sacred Path for Couples. Use my invite code: ${inviteCode}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Sacred Path invite", text: message });
        return;
      }
    } catch (err: any) {
      if (err?.name === "AbortError") return;
    }
    await copyInvite();
  };

  if (loading) {
    return (
      <div className="rounded-[22px] border border-amber-400/18 bg-card/55 px-4 py-6 h-48 animate-pulse" />
    );
  }

  /* ── Connected state ─────────────────────────────────────────── */
  if (isConnected) {
    return (
      <div className="relative w-full rounded-[22px] border border-emerald-400/30 bg-gradient-to-b from-emerald-500/10 via-card/55 to-card/40 px-4 py-4 text-center shadow-[0_16px_45px_-32px_rgba(0,0,0,0.7)] backdrop-blur">
        {/* Corner ornaments */}
        <span className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-amber-400/50" />
        <span className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-amber-400/50" />
        <span className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-amber-400/50" />
        <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-amber-400/50" />

        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/40 bg-background/40 text-emerald-300">
          <HeartHandshake className="h-5 w-5" />
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300/80">
          {copy.connectedKicker}
        </p>
        <h3 className="mt-1 font-display text-lg text-foreground">{copy.connectedTitle}</h3>
        <p className="mx-auto mt-2 max-w-[28ch] text-xs leading-5 text-muted-foreground/85">
          {copy.connectedDesc}
        </p>

        {inviteCode && (
          <div className="mt-3 rounded-xl border border-amber-400/20 bg-[#0f0a20]/70 px-3 py-2.5">
            <p className="text-[9px] uppercase tracking-[0.22em] text-amber-300/70">{copy.yourCoupleCode}</p>
            <code className="mt-1 block font-mono text-base tracking-[0.3em] text-foreground select-all">
              {inviteCode}
            </code>
          </div>
        )}
      </div>
    );
  }

  /* ── Not connected state ─────────────────────────────────────── */
  return (
    <div className="relative w-full rounded-[22px] border border-amber-400/22 bg-gradient-to-b from-amber-400/8 via-card/55 to-card/40 px-4 py-4 shadow-[0_16px_45px_-32px_rgba(0,0,0,0.7)] backdrop-blur">
      {/* Corner ornaments */}
      <span className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-amber-400/60" />
      <span className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-amber-400/60" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-amber-400/60" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-amber-400/60" />

      <div className="text-center">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/40 bg-background/40 text-amber-300">
          <HeartHandshake className="h-5 w-5" />
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-300/85">
          {copy.connectKicker}
        </p>
        <h3 className="mt-1 font-display text-lg text-foreground">{copy.connectTitle}</h3>
        <p className="mx-auto mt-1.5 max-w-[28ch] text-xs leading-5 text-muted-foreground/80">
          {copy.connectIntro}
        </p>
      </div>

      {inviteCode ? (
        <div className="mt-3 rounded-xl border border-amber-400/20 bg-[#0f0a20]/70 px-3 py-2.5">
          <p className="text-[9px] uppercase tracking-[0.22em] text-amber-300/70">
            {copy.yourInviteCode}
          </p>
          <code className="mt-1 block font-mono text-base tracking-[0.3em] text-foreground select-all">
            {inviteCode}
          </code>
          <div className="mt-2 flex gap-1.5">
            <Button size="sm" variant="outline" onClick={copyInvite} className="flex-1 text-xs">
              <Copy className="h-3 w-3 mr-1" /> {copy.copy}
            </Button>
            <Button size="sm" onClick={shareInvite} className="flex-1 text-xs">
              <Sparkles className="h-3 w-3 mr-1" /> {copy.share}
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={createInvite}
          disabled={busy}
          className="mt-3 w-full rounded-xl border border-amber-300/35 bg-gradient-to-b from-amber-300/92 to-amber-500/78 text-[#201308] hover:from-amber-300 hover:to-amber-500"
        >
          <Sparkles className="h-4 w-4 mr-2" /> {copy.createInvite}
        </Button>
      )}

      <div className="mt-3 rounded-xl border border-amber-400/15 bg-[#0f0a20]/55 px-3 py-2.5">
        <p className="text-[9px] uppercase tracking-[0.22em] text-amber-300/60">{copy.haveCode}</p>
        <div className="mt-1.5 flex flex-col gap-1.5">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder={copy.enterCode}
            className="h-9 bg-background/40 font-mono tracking-[0.2em] text-sm uppercase border-amber-400/25"
            maxLength={12}
          />
          <Button
            onClick={joinWithCode}
            disabled={busy || !code.trim()}
            variant="secondary"
            className="h-9 text-xs"
          >
            {copy.joinPartner}
          </Button>
        </div>
      </div>

      <p className="mt-2 text-center text-[10px] leading-4 text-muted-foreground/60">
        {copy.soloHint}
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Main page — Sacred Temple home
   ──────────────────────────────────────────────────────────────────── */

export default function AppHome() {
  const { lang } = useLanguage();
  const copy = COPY[lang];

  const [myWeather, setMyWeather] = useState<WeatherState | null>(null);
  const [partnerWeather, setPartnerWeather] = useState<WeatherState | null>(null);

  const bothChosen = Boolean(myWeather && partnerWeather);
  const tonightHref = useMemo(
    () => (bothChosen ? `/app/tonight-paths?me=${myWeather}&partner=${partnerWeather}` : "#"),
    [bothChosen, myWeather, partnerWeather],
  );

  return (
    <div className="px-4 py-6 md:py-8">
      <div className="container max-w-6xl space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-start">
          <SacredPathBrand />
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="font-display text-3xl text-foreground md:text-4xl">{copy.greeting}</h1>
          <p className="mx-auto mt-1.5 max-w-3xl text-sm text-muted-foreground">
            {copy.prompt}
          </p>
        </div>

        {/* Three-column temple grid: YOU | CENTER (connect + tonight path) | PARTNER */}
        <div className="grid gap-3 md:grid-cols-[1fr_260px_1fr]">
          {/* YOU */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-400/15 bg-[#0d0920]/80 p-4 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(245,158,11,0.06)]">
            <div className="pointer-events-none absolute -left-8 top-0 h-24 w-24 rounded-full bg-amber-400/5 blur-3xl" />
            <SidePanel
              copy={copy}
              lang={lang}
              ownerLabel={copy.youLabel}
              figureLabel={copy.shivaAspect}
              selected={myWeather}
              onSelect={setMyWeather}
            />
          </div>

          {/* CENTER */}
          <div className="flex flex-col items-stretch gap-3 py-2">
            {/* Connect / Connected card */}
            <PartnerConnectBlock copy={copy} />

            {/* Open Tonight Path */}
            {bothChosen ? (
              <Link to={tonightHref} className="block">
                <button
                  type="button"
                  className="w-full rounded-[22px] border border-amber-300/35 bg-gradient-to-b from-amber-300/92 to-amber-500/78 px-4 py-4 text-sm font-semibold leading-5 tracking-[0.03em] text-[#201308] shadow-[0_18px_45px_-28px_rgba(251,191,36,0.8)] transition-all hover:scale-[1.01] hover:border-amber-200/60"
                >
                  {copy.openTonightPath}
                </button>
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="w-full rounded-[22px] border border-amber-400/20 bg-amber-400/5 px-4 py-4 text-sm font-semibold leading-5 tracking-[0.03em] text-foreground/55 cursor-not-allowed"
              >
                {copy.pickBoth}
              </button>
            )}

            {/* Two energies, one path */}
            <div className="w-full rounded-[22px] border border-amber-400/18 bg-card/55 px-4 py-4 text-center shadow-[0_16px_45px_-32px_rgba(0,0,0,0.7)] backdrop-blur">
              <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-amber-300">
                {copy.twoEnergies}
              </p>
              <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-amber-300">
                {copy.oneJourney}
              </p>
              <p className="mx-auto mt-3 max-w-[24ch] text-sm leading-7 text-muted-foreground/90">
                {copy.centerText}
              </p>
            </div>
          </div>

          {/* PARTNER */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-400/15 bg-[#0d0920]/80 p-4 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(245,158,11,0.06)]">
            <div className="pointer-events-none absolute -right-8 top-0 h-24 w-24 rounded-full bg-amber-400/5 blur-3xl" />
            <SidePanel
              copy={copy}
              lang={lang}
              ownerLabel={copy.partnerLabel}
              figureLabel={copy.shaktiAspect}
              selected={partnerWeather}
              onSelect={setPartnerWeather}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
