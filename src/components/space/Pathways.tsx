import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Lock, ChevronRight, Check, Play } from "lucide-react";
import { toast } from "sonner";
import DoorwayShell from "@/components/space/DoorwayShell";
import ShareCardButton from "@/components/space/ShareCardButton";

interface Pathway {
  id: string;
  title: string;
  description: string | null;
  duration_days: number;
  premium_required: boolean;
}

interface Progress {
  id: string;
  pathway_id: string;
  current_day: number;
  completed_days: number[];
}

interface Props {
  coupleId?: string;
  onNavigate?: (tab: string) => void;
}

const Pathways = ({ coupleId, onNavigate }: Props) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [pathways, setPathways] = useState<Pathway[]>([]);
  const [progress, setProgress] = useState<Record<string, Progress>>({});
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("pathways").select("*").order("premium_required", { ascending: true });
      if (data) setPathways(data);
    };
    load();
  }, []);

  useEffect(() => {
    if (!coupleId) return;
    const loadProgress = async () => {
      const { data } = await supabase
        .from("pathway_progress")
        .select("*")
        .eq("couple_id", coupleId);
      if (data) {
        const map: Record<string, Progress> = {};
        data.forEach((p: any) => {
          map[p.pathway_id] = { ...p, completed_days: Array.isArray(p.completed_days) ? p.completed_days : [] };
        });
        setProgress(map);
      }
    };
    loadProgress();
  }, [coupleId]);

  const startPathway = async (pathwayId: string) => {
    if (!coupleId) return;
    const { data } = await supabase.from("pathway_progress").insert({
      couple_id: coupleId,
      pathway_id: pathwayId,
      current_day: 1,
      completed_days: [],
    }).select().single();
    if (data) {
      setProgress((prev) => ({ ...prev, [pathwayId]: { ...data, completed_days: [] } }));
      toast.success(t("pathways.started"));
    }
  };

  const completeDay = async (pathwayId: string) => {
    const prog = progress[pathwayId];
    if (!prog) return;
    const newCompleted = [...prog.completed_days, prog.current_day];
    const newDay = prog.current_day + 1;
    await supabase.from("pathway_progress")
      .update({ current_day: newDay, completed_days: newCompleted, last_opened_at: new Date().toISOString() })
      .eq("id", prog.id);
    setProgress((prev) => ({
      ...prev,
      [pathwayId]: { ...prog, current_day: newDay, completed_days: newCompleted },
    }));
    toast.success(t("pathways.day_complete"));
  };

  return (
    <DoorwayShell
      label="Pathways"
      title={t("pathways.title")}
      description={t("pathways.subtitle")}
      actionLabel="Open temple guide"
      onAction={onNavigate ? () => onNavigate("guide") : undefined}
    >

      <div className="space-y-3 px-5 max-w-xl mx-auto">
        {pathways.map((p) => {
          const prog = progress[p.id];
          const isSelected = selected === p.id;
          const completedCount = prog?.completed_days?.length || 0;
          const progressPct = prog ? Math.min((completedCount / p.duration_days) * 100, 100) : 0;

          return (
            <div key={p.id} className="relative">
              {p.premium_required && (
                <div className="absolute inset-0 z-10 rounded-2xl bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                  <Lock className="h-5 w-5 text-primary/60" />
                  <span className="text-sm font-body text-muted-foreground">{t("premium.unlock")}</span>
                </div>
              )}
              <button
                onClick={() => !p.premium_required && setSelected(isSelected ? null : p.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                  isSelected ? "bg-primary/5 border-primary/30" : "bg-card/50 border-border/30 hover:border-border/60"
                } ${p.premium_required ? "opacity-50" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-lg md:text-xl text-foreground mb-1">{p.title}</h4>
                    <p className="text-sm md:text-base font-body text-muted-foreground">
                      {p.duration_days} {t("pathways.days")} · {p.description}
                    </p>
                    {/* Progress bar */}
                    {prog && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs font-body text-muted-foreground mb-1">
                          <span>{t("pathways.day")} {prog.current_day} / {p.duration_days}</span>
                          <span>{completedCount} {t("pathways.completed")}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <ChevronRight className={`h-5 w-5 text-muted-foreground/40 shrink-0 transition-transform ${isSelected ? "rotate-90" : ""}`} />
                </div>

                {isSelected && (
                  <div className="mt-4 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                    {!prog ? (
                      <button
                        onClick={() => startPathway(p.id)}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-body text-base font-medium hover:bg-primary/90 transition-colors"
                      >
                        <Play className="h-4 w-4" />
                        {t("pathways.begin")}
                      </button>
                    ) : prog.current_day <= p.duration_days ? (
                      <button
                        onClick={() => completeDay(p.id)}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-body text-base font-medium hover:bg-primary/90 transition-colors"
                      >
                        <Check className="h-4 w-4" />
                        {t("pathways.complete_day")} {prog.current_day}
                      </button>
                    ) : (
                      <p className="text-base font-body text-primary">✦ {t("pathways.journey_complete")}</p>
                    )}
                    <div className="mt-3">
                      <ShareCardButton
                        coupleId={coupleId}
                        messageType="pathway_share"
                        content={`Pathway card ✦ ${p.title} — ${p.description || `${p.duration_days} days`}`}
                        label="Share this pathway card"
                      />
                    </div>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </DoorwayShell>
  );
};

export default Pathways;
