import { useEffect, useMemo, useState } from "react";
import { Compass, Crown, Footprints, Lock, Sparkles, Stars } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

interface Props {
  coupleId: string;
}

const defaultPaths = [
  {
    id: "tantra",
    title: "Tantra",
    summary: "Presence, polarity, breath, stillness, and embodied intimacy.",
    ritual: "Begin with three minutes of eye contact and synchronized breathing before any touch.",
    premium: false,
    icon: Sparkles,
    iconClass: "text-fuchsia-300",
  },
  {
    id: "tao",
    title: "Tao",
    summary: "Flow, energy conservation, softness, and deep rhythmic attunement.",
    ritual: "Move slower than you think you need to. Let the breath lead the body.",
    premium: false,
    icon: Compass,
    iconClass: "text-cyan-300",
  },
  {
    id: "heart-devotion",
    title: "Heart Devotion",
    summary: "Gratitude, reassurance, tenderness, and loving repair.",
    ritual: "Each partner names one fear and one appreciation while touching hearts.",
    premium: true,
    icon: Crown,
    iconClass: "text-amber-300",
  },
  {
    id: "sensual-mastery",
    title: "Sensual Mastery",
    summary: "Advanced touch, pacing, anticipation, and pleasure through slowness.",
    ritual: "Touch without rushing toward climax or outcome. Build sensation in layers.",
    premium: true,
    icon: Stars,
    iconClass: "text-rose-300",
  },
];

const Pathways = ({ coupleId }: Props) => {
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [expandedId, setExpandedId] = useState<string | null>(defaultPaths[0].id);

  const cards = useMemo(() => defaultPaths, []);

  useEffect(() => {
    if (!coupleId) return;

    const loadProgress = async () => {
      const { data } = await supabase
        .from("pathway_progress")
        .select("pathway_id, progress_percent")
        .eq("couple_id", coupleId);

      if (data) {
        const next: Record<string, number> = {};
        data.forEach((item: any) => {
          next[item.pathway_id] = item.progress_percent ?? 0;
        });
        setProgress(next);
      }
    };

    loadProgress();
  }, [coupleId]);

  const markProgress = async (pathwayId: string) => {
    const nextValue = Math.min((progress[pathwayId] ?? 0) + 25, 100);

    setProgress((prev) => ({ ...prev, [pathwayId]: nextValue }));

    await supabase.from("pathway_progress").upsert(
      {
        couple_id: coupleId,
        pathway_id: pathwayId,
        current_day: nextValue,
      },
      { onConflict: "couple_id,pathway_id" } as any
    );
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_26px_90px_-50px_rgba(255,173,70,0.42)]">
        <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Pathways</p>
        <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">Walk a longer path together</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
          Pathways turn one-off rituals into deeper shared practice. They give couples momentum, identity, and a reason to come back.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          const isOpen = expandedId === card.id;
          const progressValue = progress[card.id] ?? 0;

          return (
            <div key={card.id} className="rounded-[28px] border border-border/30 bg-card/45 transition-all hover:border-primary/20 hover:bg-card/55">
              <button
                type="button"
                onClick={() => setExpandedId(isOpen ? null : card.id)}
                className="w-full p-6 text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${card.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    {card.premium && (
                      <div className="inline-flex items-center gap-1 rounded-full border border-border/30 bg-background/55 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        <Lock className="h-3 w-3" />
                        Premium
                      </div>
                    )}
                    <div className="inline-flex items-center gap-1 rounded-full border border-border/30 bg-background/55 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      <Footprints className="h-3 w-3" />
                      {progressValue}%
                    </div>
                  </div>
                </div>

                <h3 className="mt-4 font-display text-2xl text-foreground">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.summary}</p>

                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-background/60">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary" style={{ width: `${progressValue}%` }} />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6">
                  <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Suggested practice</div>
                    <p className="mt-2 text-sm leading-6 text-foreground/90">{card.ritual}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => markProgress(card.id)}
                      className="rounded-2xl border border-primary/25 bg-primary/12 px-4 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
                    >
                      Mark one step complete
                    </button>
                    {card.premium && (
                      <div className="rounded-2xl border border-border/35 bg-card/45 px-4 py-3 text-sm text-muted-foreground">
                        Best unlocked with premium
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Pathways;
