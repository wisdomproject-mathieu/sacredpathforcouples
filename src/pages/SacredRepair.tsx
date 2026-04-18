import { useMemo, useRef, useState } from "react";
import { ArrowLeft, Flame, Hand, Heart, Lock, MessageCircle, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { SACRED_REPAIR_CHAPTERS, type SacredRepairChapter, type SacredRepairRitual } from "@/lib/sacredRepairData";

const shellCardClass =
  "rounded-[28px] border border-border/30 bg-card/45 p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.46)]";

type ChapterVisual = {
  icon: LucideIcon;
  iconClass: string;
  glowClass: string;
};

const chapterVisuals: Record<string, ChapterVisual> = {
  "touch-massage-sacred-spot": {
    icon: Hand,
    iconClass: "text-amber-200",
    glowClass: "from-amber-500/20 via-amber-900/5 to-transparent",
  },
  "embrace-embodied-connection": {
    icon: Heart,
    iconClass: "text-rose-200",
    glowClass: "from-rose-500/20 via-rose-900/5 to-transparent",
  },
  "sacred-union-rituals": {
    icon: Flame,
    iconClass: "text-orange-200",
    glowClass: "from-orange-500/20 via-orange-900/5 to-transparent",
  },
  "emotional-clearing-authentic-relating": {
    icon: MessageCircle,
    iconClass: "text-cyan-200",
    glowClass: "from-cyan-500/20 via-cyan-900/5 to-transparent",
  },
};

const FREE_RITUAL_BY_CHAPTER: Record<string, string> = {
  "touch-massage-sacred-spot": "The Yoga of Touch",
  "embrace-embodied-connection": "The Melting Hug",
  "sacred-union-rituals": "Slow Sex — Diana Richardson's Core Practice",
  "emotional-clearing-authentic-relating": "Appreciation & Witness",
};

const getRitualPreview = (ritual: SacredRepairRitual) => {
  const sentence = ritual.intention.split(".")[0]?.trim();
  return sentence ? `${sentence}.` : ritual.intention;
};

const ChapterCard = ({
  chapter,
  selected,
  onClick,
}: {
  chapter: SacredRepairChapter;
  selected?: boolean;
  onClick?: () => void;
}) => {
  const Icon = (chapterVisuals[chapter.id] ?? chapterVisuals["touch-massage-sacred-spot"]).icon;
  const iconClass = (chapterVisuals[chapter.id] ?? chapterVisuals["touch-massage-sacred-spot"]).iconClass;

  const className = `group flex min-h-[236px] flex-col rounded-[24px] border p-4 text-left transition-all ${
    selected
      ? "border-primary/30 bg-primary/10 shadow-[0_16px_50px_-40px_rgba(255,173,70,0.45)]"
      : "border-border/30 bg-background/45 hover:border-primary/20 hover:bg-card/55"
  }`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${iconClass}`}>
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="mt-3 font-display text-[1.9rem] leading-[1.14] text-foreground">{chapter.title}</h2>
        <p className="mt-2 text-base leading-7 text-muted-foreground/95">{chapter.emotionalFrame}</p>
      </button>
    );
  }

  return (
    <article className={className}>
      <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${iconClass}`}>
        <Icon className="h-4 w-4" />
      </div>
      <h2 className="mt-3 font-display text-[1.9rem] leading-[1.14] text-foreground">{chapter.title}</h2>
      <p className="mt-2 text-base leading-7 text-muted-foreground/95">{chapter.emotionalFrame}</p>
    </article>
  );
};

const RitualCard = ({
  ritual,
  active,
  unlocked,
  onClick,
}: {
  ritual: SacredRepairRitual;
  active?: boolean;
  unlocked: boolean;
  onClick?: () => void;
}) => {
  const className = `group flex min-h-[228px] flex-col rounded-[24px] border p-4 text-left transition-all ${
    active
      ? "border-primary/30 bg-primary/10 shadow-[0_16px_50px_-40px_rgba(255,173,70,0.45)]"
      : "border-border/30 bg-background/45 hover:border-primary/20 hover:bg-card/55"
  }`;

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{ritual.duration || "Ritual"}</p>
        {!unlocked ? (
          <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-400/10 p-2 text-amber-300">
            <Lock className="h-3.5 w-3.5" />
          </span>
        ) : null}
      </div>

      <h3 className="mt-2 font-display text-[2rem] leading-[1.1] text-foreground">{ritual.title}</h3>
      <p className="mt-2 text-base leading-7 text-muted-foreground/95">{getRitualPreview(ritual)}</p>
      <p className="mt-3 text-sm leading-6 text-foreground/82">{ritual.lineage}</p>
      <p className="mt-auto pt-3 text-xs uppercase tracking-[0.12em] text-primary/85">
        {unlocked ? "Open ritual" : "Locked in premium"}
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
  onBackToRituals,
  onBackToRepair,
}: {
  ritual: SacredRepairRitual;
  chapter: SacredRepairChapter;
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

      <article className="relative overflow-hidden rounded-[28px] border border-primary/25 bg-gradient-to-br from-background/92 via-card/75 to-background/90 p-5 md:p-7">
        <div className="pointer-events-none absolute right-4 top-4 opacity-20" aria-hidden="true">
          <div className={`rounded-full bg-gradient-to-br ${visual.glowClass} p-5 blur-[1px]`}>
            <Icon className={`h-24 w-24 md:h-36 md:w-36 ${visual.iconClass}`} />
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary/80">Ritual Detail</p>
            <h3 className="mt-2 font-display text-4xl leading-tight text-foreground md:text-5xl">{ritual.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-foreground/90">
              <span className="rounded-full border border-border/35 bg-background/45 px-3 py-1.5">{ritual.lineage}</span>
              <span className="rounded-full border border-border/35 bg-background/45 px-3 py-1.5">{ritual.duration}</span>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.2fr)]">
            <section className="rounded-[22px] border border-border/30 bg-card/50 p-5">
              <h4 className="text-sm uppercase tracking-[0.18em] text-primary/80">Intention</h4>
              <p className="mt-2 text-base leading-8 text-foreground/92 md:text-lg">{ritual.intention}</p>
              <h4 className="mt-6 text-sm uppercase tracking-[0.18em] text-primary/80">Set-up</h4>
              <p className="mt-2 text-base leading-8 text-foreground/92 md:text-lg">{ritual.setup}</p>
            </section>

            <section className="rounded-[22px] border border-border/30 bg-card/50 p-5">
              <h4 className="text-sm uppercase tracking-[0.18em] text-primary/80">Practice Steps</h4>
              <ol className="mt-4 space-y-4">
                {ritual.steps.map((step, index) => (
                  <li key={`${ritual.title}-step-${index + 1}`} className="rounded-[16px] border border-border/30 bg-background/40 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-primary/80">Step {index + 1}</p>
                    <p className="mt-1.5 text-base leading-7 text-foreground/92 md:text-lg">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <section className="rounded-[22px] border border-border/30 bg-card/50 p-5">
            <h4 className="text-sm uppercase tracking-[0.18em] text-primary/80">Teaching</h4>
            <p className="mt-2 text-base leading-8 text-foreground/92 md:text-lg">{ritual.teaching}</p>
          </section>
        </div>
      </article>
    </section>
  );
};

const SacredRepair = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [selectedRitualTitle, setSelectedRitualTitle] = useState<string | null>(null);
  const [premiumHighlight, setPremiumHighlight] = useState(false);
  const premiumRef = useRef<HTMLElement | null>(null);

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

  const scrollToPremium = () => {
    setPremiumHighlight(true);
    window.setTimeout(() => setPremiumHighlight(false), 1700);
    premiumRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isRitualUnlocked = (chapterId: string, ritualTitle: string) =>
    FREE_RITUAL_BY_CHAPTER[chapterId] === ritualTitle;

  const handleRitualClick = (chapter: SacredRepairChapter, ritual: SacredRepairRitual) => {
    if (!isRitualUnlocked(chapter.id, ritual.title)) {
      scrollToPremium();
      return;
    }
    setSelectedRitualTitle(ritual.title);
  };

  return (
    <div className="space-y-5 md:space-y-6">
      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Repair</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-foreground md:text-6xl">Return to Love</h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground md:text-xl md:leading-9">{heroCopy}</p>
      </section>

      {!selectedChapter ? (
        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-2">
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
        </section>
      ) : (
        <section className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="w-full max-w-[780px]">
              <ChapterCard chapter={selectedChapter} selected />
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedChapterId(null);
                setSelectedRitualTitle(null);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-xs uppercase tracking-[0.14em] text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Sacred Repair
            </button>
          </div>

          {!selectedRitual ? (
            <>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-2">
                {selectedChapter.rituals.map((ritual) => (
                  <RitualCard
                    key={ritual.title}
                    ritual={ritual}
                    unlocked={isRitualUnlocked(selectedChapter.id, ritual.title)}
                    onClick={() => handleRitualClick(selectedChapter, ritual)}
                  />
                ))}
              </div>

              <section
                ref={premiumRef}
                className={`rounded-[24px] border p-5 transition-all md:p-6 ${
                  premiumHighlight
                    ? "border-amber-300/65 bg-amber-500/12 shadow-[0_18px_50px_-36px_rgba(245,158,11,0.45)]"
                    : "border-amber-300/30 bg-gradient-to-br from-amber-950/60 via-card/50 to-card/30"
                }`}
              >
                <p className="text-xs uppercase tracking-[0.22em] text-amber-300/90">Unlock deeper repair</p>
                <h3 className="mt-2 font-display text-4xl leading-tight text-foreground md:text-5xl">More than 50 sacred rituals for modern couples</h3>
                <p className="mt-3 max-w-4xl text-lg leading-8 text-muted-foreground">
                  to soften resentment, restore tenderness, rebuild trust, speak the unsaid, and find your way back to each other.
                </p>
                <p className="mt-3 max-w-4xl text-base leading-7 text-foreground/88">
                  When love feels fragile, do not guess. Enter the full Sacred Path and repair with guidance, presence, and practice.
                </p>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    "Repair through touch",
                    "Repair through truth",
                    "Repair through conscious intimacy",
                  ].map((item) => (
                    <div key={item} className="rounded-[16px] border border-amber-300/25 bg-background/35 p-3 text-sm leading-6 text-foreground/92">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to="/pricing"
                    className="inline-flex items-center justify-center rounded-[12px] border border-amber-400/45 bg-amber-400/15 px-5 py-3 text-sm font-medium text-amber-300 transition-all hover:bg-amber-400/25"
                  >
                    Explore 50+ Rituals
                  </Link>
                </div>
              </section>
            </>
          ) : (
            <>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-2">
                <RitualCard
                  ritual={selectedRitual}
                  unlocked={true}
                  active={true}
                />
              </div>

              <RitualDetail
                ritual={selectedRitual}
                chapter={selectedChapter}
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
