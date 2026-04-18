import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Flame,
  Hand,
  Heart,
  MessageCircle,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
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

const getRitualPreview = (ritual: SacredRepairRitual) => {
  const sentence = ritual.intention.split(".")[0]?.trim();
  return sentence ? `${sentence}.` : ritual.intention;
};

const RitualDetail = ({
  ritual,
  chapter,
  onBackToChapter,
  onBackToHome,
}: {
  ritual: SacredRepairRitual;
  chapter: SacredRepairChapter;
  onBackToChapter: () => void;
  onBackToHome: () => void;
}) => {
  const visual = chapterVisuals[chapter.id] ?? chapterVisuals["touch-massage-sacred-spot"];
  const Icon = visual.icon;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onBackToChapter}
          className="inline-flex items-center gap-2 rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-xs uppercase tracking-[0.14em] text-foreground transition-all hover:border-border/55 hover:bg-card/60"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to {chapter.title}
        </button>
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted-foreground transition-all hover:border-border/55 hover:bg-card/60 hover:text-foreground"
        >
          Back to Sacred Repair
        </button>
      </div>

      <article className="relative overflow-hidden rounded-[28px] border border-primary/25 bg-gradient-to-br from-background/92 via-card/75 to-background/90 p-5 md:p-6">
        <div className="pointer-events-none absolute right-4 top-4 opacity-20" aria-hidden="true">
          <div className={`rounded-full bg-gradient-to-br ${visual.glowClass} p-5 blur-[1px]`}>
            <Icon className={`h-24 w-24 md:h-32 md:w-32 ${visual.iconClass}`} />
          </div>
        </div>

        <div className="relative z-10 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-primary/80">Ritual Detail</p>
            <h3 className="mt-2 font-display text-3xl leading-tight text-foreground md:text-4xl">{ritual.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-foreground/85">
              <span className="rounded-full border border-border/35 bg-background/45 px-3 py-1.5">{ritual.lineage}</span>
              <span className="rounded-full border border-border/35 bg-background/45 px-3 py-1.5">{ritual.duration}</span>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <section className="rounded-[22px] border border-border/30 bg-card/50 p-4 md:p-5">
              <h4 className="text-xs uppercase tracking-[0.18em] text-primary/80">Intention</h4>
              <p className="mt-2 text-sm leading-7 text-foreground/90 md:text-base">{ritual.intention}</p>
              <h4 className="mt-5 text-xs uppercase tracking-[0.18em] text-primary/80">Set-up</h4>
              <p className="mt-2 text-sm leading-7 text-foreground/90 md:text-base">{ritual.setup}</p>
            </section>

            <section className="rounded-[22px] border border-border/30 bg-card/50 p-4 md:p-5">
              <h4 className="text-xs uppercase tracking-[0.18em] text-primary/80">Practice Steps</h4>
              <ol className="mt-3 space-y-3">
                {ritual.steps.map((step, index) => (
                  <li key={`${ritual.title}-step-${index + 1}`} className="rounded-[16px] border border-border/30 bg-background/40 p-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-primary/80">Step {index + 1}</p>
                    <p className="mt-1 text-sm leading-6 text-foreground/90">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <section className="rounded-[22px] border border-border/30 bg-card/50 p-4 md:p-5">
            <h4 className="text-xs uppercase tracking-[0.18em] text-primary/80">Teaching</h4>
            <p className="mt-2 text-sm leading-7 text-foreground/90 md:text-base">{ritual.teaching}</p>
          </section>
        </div>
      </article>
    </section>
  );
};

const SacredRepair = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [selectedRitualTitle, setSelectedRitualTitle] = useState<string | null>(null);

  const selectedChapter = useMemo(
    () => SACRED_REPAIR_CHAPTERS.find((chapter) => chapter.id === selectedChapterId) ?? null,
    [selectedChapterId],
  );

  const selectedRitual = useMemo(() => {
    if (!selectedChapter || !selectedRitualTitle) return null;
    return selectedChapter.rituals.find((ritual) => ritual.title === selectedRitualTitle) ?? null;
  }, [selectedChapter, selectedRitualTitle]);

  const heroCopy =
    "When love starts to shake, most couples search for help too late. One partner panics. One partner closes. Sacred Repair brings you back through truth, touch, safety, and slow reconnection. Do not rush to passion. Return first to presence.";

  return (
    <div className="space-y-5 md:space-y-6">
      <section className={shellCardClass}>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Repair</p>
            <h1 className="mt-2 font-display text-4xl leading-tight text-foreground md:text-5xl">Return to Love</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">{heroCopy}</p>
          </div>
          <div className="relative overflow-hidden rounded-[22px] border border-primary/20 bg-gradient-to-br from-primary/10 via-background/65 to-background/35 p-4">
            <img
              src={shivaShaktiIcon}
              alt=""
              className="pointer-events-none absolute right-2 top-0 h-24 w-24 opacity-15 md:h-32 md:w-32"
            />
            <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Repair Sequence</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-foreground/90">
              <li>1. Safety first</li>
              <li>2. Honesty second</li>
              <li>3. Touch third</li>
              <li>4. Union last</li>
            </ul>
          </div>
        </div>
      </section>

      {!selectedChapter ? (
        <section className="grid gap-4 md:grid-cols-2">
          {SACRED_REPAIR_CHAPTERS.map((chapter) => {
            const visual = chapterVisuals[chapter.id] ?? chapterVisuals["touch-massage-sacred-spot"];
            const Icon = visual.icon;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => {
                  setSelectedChapterId(chapter.id);
                  setSelectedRitualTitle(null);
                }}
                className="group relative overflow-hidden rounded-[28px] border border-border/30 bg-card/45 p-5 text-left transition-all hover:border-primary/25 hover:bg-card/60"
              >
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  <div className={`absolute -right-10 top-0 h-28 w-28 rounded-full bg-gradient-to-br ${visual.glowClass} blur-xl`} />
                </div>
                <div className="relative z-10">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${visual.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-primary/80">{chapter.partLabel}</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight text-foreground">{chapter.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{chapter.emotionalFrame}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.14em] text-foreground/80">
                    {chapter.rituals.length} rituals
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-primary">
                    Open chapter
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </section>
      ) : (
        <section className="space-y-4">
          <div className={`${shellCardClass} border-primary/25 bg-primary/7`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{selectedChapter.partLabel}</p>
                <h2 className="mt-1 font-display text-3xl leading-tight text-foreground md:text-4xl">{selectedChapter.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{selectedChapter.emotionalFrame}</p>
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
          </div>

          {!selectedRitual ? (
            <div className="grid gap-4 md:grid-cols-2">
              {selectedChapter.rituals.map((ritual) => (
                <button
                  key={ritual.title}
                  type="button"
                  onClick={() => setSelectedRitualTitle(ritual.title)}
                  className="group relative overflow-hidden rounded-[24px] border border-border/30 bg-card/45 p-4 text-left transition-all hover:border-primary/25 hover:bg-card/60"
                >
                  <div className="pointer-events-none absolute -right-8 top-0 h-24 w-24 rounded-full bg-primary/12 blur-2xl" />
                  <div className="relative z-10">
                    <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{ritual.duration}</p>
                    <h3 className="mt-2 font-display text-2xl leading-tight text-foreground">{ritual.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{getRitualPreview(ritual)}</p>
                    <p className="mt-2 text-xs text-foreground/80">{ritual.lineage}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-primary">
                      Open ritual
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : selectedRitual ? (
            <div className="space-y-4">
              <article className="rounded-[24px] border border-primary/25 bg-primary/8 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-primary/80">Selected ritual</p>
                <h3 className="mt-1 font-display text-2xl leading-tight text-foreground">{selectedRitual.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{getRitualPreview(selectedRitual)}</p>
              </article>

              <RitualDetail
                ritual={selectedRitual}
                chapter={selectedChapter}
                onBackToChapter={() => setSelectedRitualTitle(null)}
                onBackToHome={() => {
                  setSelectedRitualTitle(null);
                  setSelectedChapterId(null);
                }}
              />
            </div>
          ) : null}
        </section>
      )}

      <section className="rounded-[24px] border border-border/30 bg-card/45 p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl border border-border/35 bg-background/45 p-2.5 text-primary">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-primary/80">Sacred Repair Intention</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              This page moves in one sequence: safety, honesty, soothing touch, reconnection, then sacred union.
            </p>
          </div>
          <div className="ml-auto rounded-xl border border-border/35 bg-background/45 p-2 text-primary/90">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SacredRepair;
