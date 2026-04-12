import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Bookmark,
  Clock,
  Eye,
  Hand,
  Heart,
  Lock,
  MessageCircle,
  Moon,
  Send,
  Sparkles,
  Wind,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import DoorwayShell from "@/components/space/DoorwayShell";

type CategoryKey =
  | "all"
  | "breath"
  | "presence"
  | "touch"
  | "reconnect"
  | "polarity"
  | "bedtime"
  | "playful";

interface RitualItem {
  id: string;
  title: string;
  hook: string | null;
  item_type: string;
  category: string;
  duration: string | null;
  tone: string | null;
  intensity: number | null;
  steps: string[];
  premium_required: boolean;
}

interface Props {
  coupleId?: string;
  onNavigate?: (tab: string) => void;
}

const categoryIcons: Record<string, typeof Sparkles> = {
  breath: Wind,
  touch: Hand,
  presence: Eye,
  reconnect: Heart,
  polarity: Sparkles,
  bedtime: Moon,
  playful: Zap,
};

const categoryFilters: CategoryKey[] = [
  "all",
  "breath",
  "presence",
  "touch",
  "reconnect",
  "polarity",
  "bedtime",
  "playful",
];

const RitualCards = ({ coupleId, onNavigate }: Props) => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const [rituals, setRituals] = useState<RitualItem[]>([]);
  const [filter, setFilter] = useState<CategoryKey>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("ritual_items")
        .select("*")
        .order("premium_required", { ascending: true })
        .order("intensity", { ascending: true });

      if (!data) return;

      const normalized = data.map((r: any) => ({
        ...r,
        steps: Array.isArray(r.steps) ? r.steps : JSON.parse(r.steps || "[]"),
      }));

      setRituals(normalized.filter((r: RitualItem) => r.item_type === "ritual"));
    };

    load();
  }, []);

  const filtered = rituals.filter((r) => filter === "all" || r.category === filter);

  const saveToAltar = async (ritual: RitualItem) => {
    if (!user || !coupleId) return;

    await supabase.from("altar_items").insert({
      couple_id: coupleId,
      user_id: user.id,
      item_type: "ritual",
      source_id: ritual.id,
      title: ritual.title,
    });

    toast.success(t("ritual.save"));
  };

  const sendToPartner = async (ritual: RitualItem) => {
    if (!user || !coupleId) return;

    await supabase.from("partner_messages").insert({
      couple_id: coupleId,
      sender_id: user.id,
      message_type: "invitation",
      content: `✦ ${ritual.title} — ${ritual.hook || ""}`,
    });

    toast.success(t("ritual.send"));
  };

  return (
    <DoorwayShell
      label="Rituals"
      title={t("ritual_cards.title")}
      description={t("ritual_cards.subtitle")}
      actionLabel="Open temple guide"
      onAction={onNavigate ? () => onNavigate("guide") : undefined}
    >

      <div className="overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {categoryFilters.map((cat) => {
            const Icon = categoryIcons[cat] || Sparkles;
            const active = filter === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setFilter(cat);
                  setExpanded(null);
                  setActiveStep(0);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body whitespace-nowrap transition-all border ${
                  active
                    ? "bg-primary/15 text-primary border-primary/30"
                    : "text-muted-foreground border-border/30 hover:border-border/60"
                }`}
              >
                {cat !== "all" && <Icon className="h-4 w-4" />}
                {cat === "all" ? t("ritual_cards.all") : t(`ritual_cards.cat.${cat}`)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((ritual) => {
          const isExpanded = expanded === ritual.id;
          const Icon = categoryIcons[ritual.category] || Sparkles;
          const safeSteps = ritual.steps?.length ? ritual.steps : [ritual.hook || ritual.title];
          const intensity = Math.max(0, Math.min(4, ritual.intensity ?? 1));

          return (
            <div
              key={ritual.id}
              className={`rounded-2xl border transition-all duration-300 ${
                isExpanded
                  ? "bg-primary/5 border-primary/30"
                  : "bg-card/50 border-border/30 hover:border-border/60"
              } ${ritual.premium_required ? "opacity-70" : ""}`}
            >
              <button
                type="button"
                disabled={ritual.premium_required}
                onClick={() => {
                  setExpanded(isExpanded ? null : ritual.id);
                  setActiveStep(0);
                }}
                className="w-full text-left p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-xl bg-primary/10 p-2 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg text-foreground">{ritual.title}</h4>
                      {ritual.hook && (
                        <p className="mt-1 text-sm font-body text-muted-foreground">{ritual.hook}</p>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        {ritual.duration && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {ritual.duration}
                          </span>
                        )}
                        {ritual.tone && <span>✦ {ritual.tone}</span>}
                        <span>{"●".repeat(intensity)}{"○".repeat(4 - intensity)}</span>
                      </div>
                    </div>
                  </div>

                  {ritual.premium_required && (
                    <div className="inline-flex items-center gap-1 rounded-full border border-border/30 px-2.5 py-1 text-xs text-muted-foreground">
                      <Lock className="h-3.5 w-3.5" />
                      {t("premium.unlock")}
                    </div>
                  )}
                </div>
              </button>

              {isExpanded && !ritual.premium_required && (
                <div className="px-5 pb-5">
                  <div className="rounded-2xl border border-border/30 bg-background/40 p-4">
                    <div className="mb-3 text-xs font-body text-muted-foreground">
                      {t("ritual.step")} {activeStep + 1} / {safeSteps.length}
                    </div>
                    <p className="font-body text-sm text-foreground">{safeSteps[activeStep]}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeStep > 0 && (
                      <button
                        type="button"
                        onClick={() => setActiveStep((s) => s - 1)}
                        className="px-4 py-2 rounded-lg border border-border/40 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {t("ritual.prev")}
                      </button>
                    )}

                    {activeStep < safeSteps.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setActiveStep((s) => s + 1)}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-body hover:bg-primary/90 transition-colors"
                      >
                        {t("ritual.next_step")}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setExpanded(null);
                          setActiveStep(0);
                        }}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-body hover:bg-primary/90 transition-colors"
                      >
                        {t("ritual.complete")}
                      </button>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => saveToAltar(ritual)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/30 text-xs font-body text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      {t("ritual.save")}
                    </button>

                    <button
                      type="button"
                      onClick={() => sendToPartner(ritual)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/30 text-xs font-body text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                    >
                      <Send className="h-3.5 w-3.5" />
                      {t("ritual.send")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-border/30 bg-card/40 p-5 text-center">
            <p className="font-body text-muted-foreground">{t("ritual_cards.empty")}</p>
          </div>
        )}
      </div>
    </DoorwayShell>
  );
};

export default RitualCards;
