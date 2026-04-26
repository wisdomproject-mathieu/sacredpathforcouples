import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { ArrowLeft, Flame, Hand, Heart, Lock, MessageCircle, Sparkles, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";

import { useAuth } from "@/contexts/AuthContext";
import { useCoupleId } from "@/hooks/useCoupleId";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { supabase } from "@/integrations/supabase/client";
import { SACRED_REPAIR_CHAPTERS, type SacredRepairChapter, type SacredRepairRitual } from "@/lib/sacredRepairData";
import { sacredVisualSystem } from "@/lib/sacredVisualSystem";
import LotusIcon from "@/components/tantra-icons/LotusIcon";
import FlameIcon from "@/components/tantra-icons/FlameIcon";
import ChakraIcon from "@/components/tantra-icons/ChakraIcon";
import SacredGeometryIcon from "@/components/tantra-icons/SacredGeometryIcon";
import RitualTimerButton from "@/components/ritual/RitualTimerButton";

type SacredIconComponent = ComponentType<{ className?: string; size?: number }>;

type ChapterVisual = {
  icon: LucideIcon;
  iconClass: string;
  glowClass: string;
  sacredIcon: SacredIconComponent;
  accentClass: string;
};

const chapterVisuals: Record<string, ChapterVisual> = {
  "touch-massage-sacred-spot": {
    icon: Hand,
    iconClass: "text-amber-200",
    glowClass: "from-amber-500/20 via-amber-900/5 to-transparent",
    sacredIcon: LotusIcon,
    accentClass: "text-amber-300/80",
  },
  "embrace-embodied-connection": {
    icon: Heart,
    iconClass: "text-rose-200",
    glowClass: "from-rose-500/20 via-rose-900/5 to-transparent",
    sacredIcon: ChakraIcon,
    accentClass: "text-rose-300/80",
  },
  "sacred-union-rituals": {
    icon: Flame,
    iconClass: "text-orange-200",
    glowClass: "from-orange-500/20 via-orange-900/5 to-transparent",
    sacredIcon: FlameIcon,
    accentClass: "text-orange-300/80",
  },
  "emotional-clearing-authentic-relating": {
    icon: MessageCircle,
    iconClass: "text-cyan-200",
    glowClass: "from-cyan-500/20 via-cyan-900/5 to-transparent",
    sacredIcon: SacredGeometryIcon,
    accentClass: "text-cyan-300/80",
  },
};

const FREE_RITUAL_BY_CHAPTER: Record<string, string> = {
  "touch-massage-sacred-spot": "The Yoga of Touch",
  "embrace-embodied-connection": "The Melting Hug",
  "sacred-union-rituals": "Slow Sex — Diana Richardson's Core Practice",
  "emotional-clearing-authentic-relating": "Appreciation & Witness",
};

type ChapterNarrative = {
  subtitle: string;
  supportingCopy: string;
};

const CHAPTER_NARRATIVE_BY_ID: Record<string, ChapterNarrative> = {
  "touch-massage-sacred-spot": {
    subtitle: "Repair through reverent touch",
    supportingCopy:
      "Begin where the body still says yes. Slow touch and devotional practice soften defense and rebuild trust through presence.",
  },
  "embrace-embodied-connection": {
    subtitle: "Repair through holding and nervous-system settling",
    supportingCopy:
      "Before passion returns, safety returns first. These practices help couples hold, breathe, settle, and feel each other again.",
  },
  "sacred-union-rituals": {
    subtitle: "Repair through conscious lovemaking",
    supportingCopy:
      "When tenderness reopens, union becomes medicine. Slow intimacy practices replace urgency with attunement and care.",
  },
  "emotional-clearing-authentic-relating": {
    subtitle: "Repair through truth and emotional honesty",
    supportingCopy:
      "For the truths that sit between you. Clear, relational practices help love breathe again after distance or tension.",
  },
};

const getRitualPreview = (ritual: SacredRepairRitual) => {
  const intentionSentence = ritual.intention.split(".")[0]?.trim();
  const setupSentence = ritual.setup.split(".")[0]?.trim();
  return [intentionSentence, setupSentence].filter(Boolean).map((line) => `${line}.`).join(" ");
};

const ChapterCard = ({
  chapter,
  selected,
  compact,
  onClick,
}: {
  chapter: SacredRepairChapter;
  selected?: boolean;
  compact?: boolean;
  onClick?: () => void;
}) => {
  const visual = chapterVisuals[chapter.id] ?? chapterVisuals["touch-massage-sacred-spot"];
  const SacredIcon = visual.sacredIcon;
  const narrative = CHAPTER_NARRATIVE_BY_ID[chapter.id];

  const className = compact
    ? `flex w-full items-center rounded-[18px] border p-3 text-left transition-all ${
        selected
          ? "border-emerald-300/45 bg-gradient-to-br from-emerald-500/12 via-card/55 to-card/30 shadow-[0_14px_40px_-32px_rgba(16,185,129,0.35)]"
          : "border-emerald-300/30 bg-emerald-500/8 hover:border-emerald-300/50"
      }`
    : `${sacredVisualSystem.overviewCardBase} min-h-0 p-4 md:p-5 ${
        selected
          ? `${sacredVisualSystem.overviewCardActive} border-emerald-300/45 bg-emerald-500/12`
          : `${sacredVisualSystem.overviewCardIdle} border-emerald-300/30 bg-emerald-500/8`
      }`;

  const body = (
    <>
      <div className={`flex items-start ${compact ? "gap-3" : "gap-4"}`}>
        <div className={`shrink-0 rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-500/10 via-card/40 to-transparent ${compact ? "p-2" : "p-3"} ${visual.accentClass}`}>
          <SacredIcon className="opacity-90" size={compact ? 32 : 52} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className={`min-w-0 font-display leading-[1.15] text-foreground ${compact ? "text-[1.35rem] md:text-[1.5rem]" : "text-[1.95rem]"}`}>
            {chapter.title}
          </h2>
          {compact ? (
            <p className="mt-1 text-sm leading-6 text-primary/85">
              {narrative?.subtitle ?? chapter.emotionalFrame}
            </p>
          ) : null}
        </div>
      </div>
      {!compact ? (
        <p className="mt-3 rounded-[12px] border border-emerald-300/25 bg-emerald-500/8 px-3 py-2.5 text-[1.05rem] leading-7 text-primary/90">
          {narrative?.subtitle ?? chapter.emotionalFrame}
        </p>
      ) : null}
      {!compact ? (
        <p className="mt-2 line-clamp-3 text-[0.98rem] leading-7 text-foreground/90">
          {narrative?.supportingCopy}
        </p>
      ) : null}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {body}
      </button>
    );
  }

  return <article className={className}>{body}</article>;
};

const ritualSacredIcons: SacredIconComponent[] = [LotusIcon, FlameIcon, ChakraIcon, SacredGeometryIcon];

const pickRitualIcon = (title: string): SacredIconComponent => {
  let hash = 0;
  for (let i = 0; i < title.length; i += 1) hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
  return ritualSacredIcons[hash % ritualSacredIcons.length];
};

const RitualCard = ({
  ritual,
  active,
  unlocked,
  isFreeRitual,
  hidePremiumBadges,
  onClick,
}: {
  ritual: SacredRepairRitual;
  active?: boolean;
  unlocked: boolean;
  isFreeRitual?: boolean;
  hidePremiumBadges?: boolean;
  onClick?: () => void;
}) => {
  const SacredIcon = pickRitualIcon(ritual.title);
  const className = `group relative flex min-h-[206px] flex-col overflow-hidden rounded-[20px] border p-4 text-left transition-all md:p-5 ${
    active
      ? "border-amber-300/45 bg-gradient-to-br from-amber-500/12 via-card/60 to-card/30 shadow-[0_18px_50px_-36px_rgba(245,158,11,0.4)]"
      : unlocked
        ? "border-emerald-300/30 bg-gradient-to-br from-emerald-500/8 via-card/55 to-card/30 hover:border-emerald-300/50"
        : "border-amber-300/25 bg-gradient-to-br from-amber-500/6 via-card/55 to-card/30 hover:border-amber-300/45"
  }`;

  const content = (
    <>
      <div className="flex items-start gap-4">
        <div className={`shrink-0 rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-500/10 via-card/40 to-transparent p-2.5 ${unlocked ? "text-amber-300/85" : "text-amber-300/55"}`}>
          <SacredIcon size={42} className="opacity-90" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`font-display text-[1.4rem] leading-[1.2] md:text-[1.55rem] ${unlocked ? "text-foreground" : "text-foreground/80"}`}>
            {ritual.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {!unlocked ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/45 bg-amber-400/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-amber-300">
                <Lock className="h-3 w-3" />
                Premium
              </span>
            ) : !hidePremiumBadges && isFreeRitual ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-emerald-200">
                <Sparkles className="h-3 w-3" />
                Free Ritual
              </span>
            ) : null}
            {ritual.duration ? (
              <span className="inline-flex rounded-full border border-amber-300/25 bg-amber-500/8 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-amber-200/85">
                {ritual.duration.replace(/ or longer$/i, "+").replace("minutes", "min")}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <p className={`mt-3 line-clamp-3 text-sm leading-6 ${unlocked ? "text-muted-foreground/95" : "text-muted-foreground/80"}`}>
        {getRitualPreview(ritual)}
      </p>

      <p className="mt-3 text-xs leading-5 text-foreground/72">Lineage: {ritual.lineage}</p>

      <p className={`mt-auto pt-3 text-xs uppercase tracking-[0.14em] ${unlocked ? "text-emerald-200/85" : "text-amber-300/80"}`}>
        {unlocked ? (active ? "Now reading" : "Open ritual →") : "Unlock with a Sacred subscription →"}
      </p>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return <article className={className}>{content}</article>;
};

const RitualDetail = ({
  ritual,
  chapter,
  coupleId,
  onBackToRituals,
  onBackToRepair,
}: {
  ritual: SacredRepairRitual;
  chapter: SacredRepairChapter;
  coupleId: string | null;
  onBackToRituals: () => void;
  onBackToRepair: () => void;
}) => {
  const visual = chapterVisuals[chapter.id] ?? chapterVisuals["touch-massage-sacred-spot"];
  const Icon = visual.icon;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onBackToRituals}
          className="inline-flex items-center gap-2 rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-xs uppercase tracking-[0.14em] text-foreground transition-all hover:border-border/55 hover:bg-card/60"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to {chapter.title}
        </button>
        <button
          type="button"
          onClick={onBackToRepair}
          className="inline-flex items-center gap-2 rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted-foreground transition-all hover:border-border/55 hover:bg-card/60 hover:text-foreground"
        >
          Back to Sacred Repair
        </button>
      </div>

      <article className={`relative overflow-hidden ${sacredVisualSystem.sectionFrame}`}>
        <div className="pointer-events-none absolute right-3 top-3 opacity-12" aria-hidden="true">
          <div className={`rounded-full bg-gradient-to-br ${visual.glowClass} p-5 blur-[1px]`}>
            <Icon className={`h-16 w-16 md:h-24 md:w-24 ${visual.iconClass}`} />
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary/80">Ritual Detail</p>
            <h3 className="mt-2 font-display text-3xl leading-tight text-foreground md:text-4xl">{ritual.title}</h3>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-foreground/90">
              <span className="rounded-full border border-border/35 bg-background/45 px-3 py-1.5">{ritual.lineage}</span>
              <RitualTimerButton
                ritualTitle={ritual.title}
                ritualSource="sacred-repair"
                chapterId={chapter.id}
                coupleId={coupleId}
                suggestedDuration={ritual.duration}
                label="Start practice timer"
              />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.2fr)]">
            <section className="rounded-[20px] border border-border/30 bg-background/45 p-5">
              <h4 className="text-base uppercase tracking-[0.16em] text-primary/80">Intention</h4>
              <p className="mt-2 text-[1.05rem] leading-8 text-foreground/92 md:text-[1.12rem]">{ritual.intention}</p>
              <h4 className="mt-6 text-base uppercase tracking-[0.16em] text-primary/80">Set-up</h4>
              <p className="mt-2 text-[1.05rem] leading-8 text-foreground/92 md:text-[1.12rem]">{ritual.setup}</p>
            </section>

            <section className="rounded-[20px] border border-border/30 bg-background/45 p-5">
              <h4 className="text-base uppercase tracking-[0.16em] text-primary/80">Practice Steps</h4>
              <ol className="mt-4 space-y-4">
                {ritual.steps.map((step, index) => (
                  <li key={`${ritual.title}-step-${index + 1}`} className="rounded-[16px] border border-border/30 bg-background/40 p-4">
                    <p className="text-xs uppercase tracking-[0.17em] text-primary/80">Step {index + 1}</p>
                    <p className="mt-1.5 text-[1.02rem] leading-8 text-foreground/92 md:text-[1.1rem]">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <section className="rounded-[20px] border border-border/30 bg-background/45 p-5">
            <h4 className="text-base uppercase tracking-[0.16em] text-primary/80">Teaching</h4>
            <p className="mt-2 text-[1.05rem] leading-8 text-foreground/92 md:text-[1.12rem]">{ritual.teaching}</p>
          </section>
        </div>
      </article>
    </section>
  );
};

const SacredRepair = () => {
  const { user } = useAuth();
  const { hasPremiumAccess } = usePremiumAccess();
  const coupleId = useCoupleId();
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [selectedRitualTitle, setSelectedRitualTitle] = useState<string | null>(null);
  const [premiumHighlight, setPremiumHighlight] = useState(false);
  const [repairConnected, setRepairConnected] = useState(true);
  const [myName, setMyName] = useState("Mathieu");
  const [partnerName] = useState("Edita");
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("Mathieu");
  const premiumRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const loadProfileName = async () => {
      if (!user?.id) return;
      const fallback = user.email?.split("@")[0] || "Mathieu";
      const { data } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", user.id)
        .maybeSingle();

      const resolvedName = data?.display_name?.trim() || fallback;
      if (!isCancelled) {
        setMyName(resolvedName);
        setNameDraft(resolvedName);
      }
    };

    void loadProfileName();

    return () => {
      isCancelled = true;
    };
  }, [user?.id, user?.email]);

  const selectedChapter = useMemo(
    () => SACRED_REPAIR_CHAPTERS.find((chapter) => chapter.id === selectedChapterId) ?? null,
    [selectedChapterId],
  );

  const selectedRitual = useMemo(() => {
    if (!selectedChapter || !selectedRitualTitle) return null;
    return selectedChapter.rituals.find((ritual) => ritual.title === selectedRitualTitle) ?? null;
  }, [selectedChapter, selectedRitualTitle]);

  const heroCopy =
    "When love starts to shake, most couples search for help too late. One partner panics. One partner closes. Sacred Repair brings you back through truth, touch, safety, and slow reconnection. Ancient wisdom for modern couples — especially when talking is no longer enough.";
  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
        .format(new Date())
        .toUpperCase(),
    [],
  );

  const scrollToPremium = () => {
    setPremiumHighlight(true);
    window.setTimeout(() => setPremiumHighlight(false), 1700);
    premiumRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isFreeRitualForChapter = (chapterId: string, ritualTitle: string) =>
    FREE_RITUAL_BY_CHAPTER[chapterId] === ritualTitle;

  const isRitualUnlocked = (chapterId: string, ritualTitle: string) =>
    hasPremiumAccess || isFreeRitualForChapter(chapterId, ritualTitle);

  const handleRitualClick = (chapter: SacredRepairChapter, ritual: SacredRepairRitual) => {
    if (!isRitualUnlocked(chapter.id, ritual.title)) {
      scrollToPremium();
      return;
    }
    setSelectedRitualTitle(ritual.title);
  };

  const saveName = async () => {
    const clean = nameDraft.trim();
    if (!clean) return;
    if (user?.id) {
      await supabase
        .from("profiles")
        .upsert({ id: user.id, user_id: user.id, display_name: clean }, { onConflict: "user_id" });
    }
    setMyName(clean);
    setNameDraft(clean);
    setEditingName(false);
  };

  return (
    <div className="space-y-5 md:space-y-6">
      <section className="relative overflow-hidden rounded-[24px] border border-amber-400/20 bg-card/35 p-5">
        <div className="absolute -right-10 top-0 opacity-15">
          <img src={shivaShaktiIcon} alt="" className="h-40 w-40 rounded-[20px]" />
        </div>
        <p className="text-xs uppercase tracking-[0.22em] text-amber-400/75">Sacred Path for Couples</p>
        <p className="mt-2 max-w-2xl text-base italic text-muted-foreground/80">
          "The couple that practices together arrives at each other again and again."
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/65">{todayLabel}</p>
            <h1 className="mt-2 flex flex-wrap items-center gap-2 font-display text-3xl text-foreground">
              <span>
                {myName}
                <span className="text-amber-400/65"> &amp; </span>
                {repairConnected ? partnerName : "your beloved"}
              </span>
              {repairConnected ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/35 bg-emerald-500/10 px-2.5 py-1 text-emerald-200">
                  <Heart className="h-4 w-4 fill-current" />
                  <Sparkles className="h-4 w-4" />
                </span>
              ) : null}
            </h1>
            <p className="mt-2 text-base leading-7 text-muted-foreground/80">
              You are connected. Repair asks for softness, truth, and practices that help you come back to each other slowly and safely.
            </p>
            <div className="mt-3 rounded-[12px] border border-emerald-300/25 bg-emerald-500/8 px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.14em] text-emerald-200/80">TODAY&apos;S REMINDER</p>
              <p className="mt-1 text-base leading-7 text-foreground/90">Repair begins where both hearts feel safe enough to stay.</p>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs ${
                  repairConnected
                    ? "border-emerald-300/35 bg-emerald-500/10 text-emerald-200"
                    : "border-amber-300/25 bg-amber-500/10 text-amber-200"
                }`}
              >
                {repairConnected ? "Connected" : "Solo"}
              </span>
              <button
                type="button"
                onClick={() => setRepairConnected(false)}
                className="rounded-full border border-rose-300/35 bg-rose-500/10 px-3 py-1 text-xs text-rose-200 transition-colors hover:bg-rose-500/18"
              >
                Disconnect
              </button>
              {!editingName ? (
                <button
                  type="button"
                  onClick={() => setEditingName(true)}
                  className="rounded-full border border-border/30 bg-background/35 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-amber-400/35 hover:text-foreground"
                >
                  Edit your name
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    value={nameDraft}
                    onChange={(event) => setNameDraft(event.target.value)}
                    maxLength={40}
                    placeholder="Your name"
                    className="h-8 rounded-lg border border-border/35 bg-background/45 px-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-amber-400/35"
                  />
                  <button
                    type="button"
                    onClick={saveName}
                    disabled={!nameDraft.trim()}
                    className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs text-amber-300 transition-all hover:bg-amber-400/20 disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingName(false);
                      setNameDraft(myName);
                    }}
                    className="rounded-lg border border-border/30 bg-background/40 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="rounded-[18px] border border-emerald-300/25 bg-emerald-500/8 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/85">RETURN TO LOVE</p>
            <p className="mt-2 text-base leading-7 text-foreground/90">{heroCopy}</p>
          </div>
        </div>
      </section>

      {!selectedChapter ? (
        <section className={sacredVisualSystem.contourEmerald}>
          <h2 className="mt-2 font-display text-[2.2rem] leading-tight text-foreground md:text-[2.6rem]">Repairs Overview</h2>
          <p className="mt-3 max-w-3xl text-[1.12rem] leading-8 text-foreground/90">
            Return to presence after tension. Soften defense through embodied practice. Rebuild trust — one honest ritual at a time.
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-2">
            {SACRED_REPAIR_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                onClick={() => {
                  setSelectedChapterId(chapter.id);
                  setSelectedRitualTitle(null);
                }}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="space-y-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <ChapterCard chapter={selectedChapter} selected compact />
            <button
              type="button"
              onClick={() => {
                setSelectedChapterId(null);
                setSelectedRitualTitle(null);
              }}
              className="inline-flex h-fit items-center gap-2 rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-xs uppercase tracking-[0.14em] text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Sacred Repair
            </button>
          </div>

          {!selectedRitual ? (
            <>
              <div className={sacredVisualSystem.contourCyan}>
                <div className="flex items-center justify-between gap-3">
                  <p className={sacredVisualSystem.contourEyebrow}>Practice rituals</p>
                  {hasPremiumAccess ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/45 bg-gradient-to-r from-amber-500/20 to-amber-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-amber-200">
                      <Sparkles className="h-3 w-3" />
                      Sacred access · all rituals open
                    </span>
                  ) : null}
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-2">
                  {selectedChapter.rituals.map((ritual) => (
                    <RitualCard
                      key={ritual.title}
                      ritual={ritual}
                      unlocked={isRitualUnlocked(selectedChapter.id, ritual.title)}
                      isFreeRitual={isFreeRitualForChapter(selectedChapter.id, ritual.title)}
                      hidePremiumBadges={hasPremiumAccess}
                      onClick={() => handleRitualClick(selectedChapter, ritual)}
                    />
                  ))}
                </div>
              </div>

              {!hasPremiumAccess ? (
                <section
                  ref={premiumRef}
                  className={`relative overflow-hidden rounded-[28px] border p-6 transition-all md:p-8 ${
                    premiumHighlight
                      ? "border-amber-300/70 bg-gradient-to-br from-amber-500/18 via-amber-900/30 to-card/40 shadow-[0_24px_70px_-30px_rgba(245,158,11,0.55)]"
                      : "border-amber-300/40 bg-gradient-to-br from-amber-950/70 via-amber-900/25 to-card/40 shadow-[0_18px_60px_-40px_rgba(245,158,11,0.45)]"
                  }`}
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-amber-400/25 via-amber-500/10 to-transparent blur-3xl" aria-hidden="true" />
                  <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-gradient-to-tr from-rose-500/15 via-amber-500/8 to-transparent blur-3xl" aria-hidden="true" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-amber-300/40 bg-gradient-to-br from-amber-400/20 to-amber-600/10 p-2.5 text-amber-300">
                        <LotusIcon size={32} />
                      </div>
                      <p className="text-xs uppercase tracking-[0.24em] text-amber-300/95">Sacred · Unlock deeper repair</p>
                    </div>
                    <h3 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
                      More than 50 sacred rituals for modern couples
                    </h3>
                    <p className="mt-3 max-w-4xl text-lg leading-8 text-muted-foreground">
                      to soften resentment, restore tenderness, rebuild trust, speak the unsaid, and find your way back to each other.
                    </p>

                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                      {[
                        { label: "Repair through touch", Icon: LotusIcon },
                        { label: "Repair through truth", Icon: SacredGeometryIcon },
                        { label: "Repair through conscious intimacy", Icon: FlameIcon },
                      ].map(({ label, Icon }) => (
                        <div
                          key={label}
                          className="flex items-center gap-3 rounded-[18px] border border-amber-300/30 bg-gradient-to-br from-amber-500/8 via-card/55 to-card/30 p-3.5"
                        >
                          <div className="rounded-xl border border-amber-300/30 bg-amber-500/10 p-2 text-amber-300/90">
                            <Icon size={26} />
                          </div>
                          <span className="text-sm leading-6 text-foreground/92">{label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        to="/pricing"
                        className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-amber-400/55 bg-gradient-to-r from-amber-400/30 via-amber-400/20 to-amber-500/15 px-6 py-3 text-sm font-medium text-amber-100 shadow-[0_8px_30px_-12px_rgba(245,158,11,0.5)] transition-all hover:from-amber-400/40 hover:to-amber-500/25"
                      >
                        <Sparkles className="h-4 w-4" />
                        Open Sacred Access
                      </Link>
                      <span className="text-xs uppercase tracking-[0.16em] text-amber-300/70">One subscription · both partners</span>
                    </div>
                  </div>
                </section>
              ) : null}
            </>
          ) : (
            <>
              <div className={sacredVisualSystem.contourCyan}>
                <RitualCard ritual={selectedRitual} unlocked={true} active={true} isFreeRitual={isFreeRitualForChapter(selectedChapter.id, selectedRitual.title)} hidePremiumBadges={hasPremiumAccess} />
              </div>

              <RitualDetail
                ritual={selectedRitual}
                chapter={selectedChapter}
                coupleId={coupleId}
                onBackToRituals={() => setSelectedRitualTitle(null)}
                onBackToRepair={() => {
                  setSelectedRitualTitle(null);
                  setSelectedChapterId(null);
                }}
              />
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default SacredRepair;
