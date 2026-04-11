import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Sparkles, Clock, Bookmark, Send, ChevronRight, Wind, Hand, Eye, Heart, Flame, Moon, Zap, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const categoryIcons: Record<string, typeof Wind> = {
  breath: Wind, touch: Hand, presence: Eye, reconnect: Heart,
  polarity: Sparkles, bedtime: Moon, slow: Clock, playful: Zap,
};

const categoryFilters = ["all", "breath", "presence", "touch", "reconnect", "polarity", "bedtime"];

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
}

const RitualCards = ({ coupleId }: Props) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [rituals, setRituals] = useState<RitualItem[]>([]);
  const [filter, setFilter] = useState("all");
  const [viewType, setViewType] = useState<"rituals" | "positions">("rituals");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("ritual_items")
        .select("*")
        .order("premium_required", { ascending: true })
        .order("intensity", { ascending: true });
      if (data) {
        setRituals(data.map((r: any) => ({
          ...r,
          steps: Array.isArray(r.steps) ? r.steps : JSON.parse(r.steps || "[]"),
        })));
      }
    };
    load();
  }, []);

  const filtered = rituals.filter((r) => {
    const typeMatch = viewType === "positions" ? r.item_type === "position" : r.item_type === "ritual";
    const catMatch = filter === "all" || r.category === filter;
    return typeMatch && catMatch;
  });

  const saveToAltar = async (ritual: RitualItem) => {
    if (!user || !coupleId) return;
    await supabase.from("altar_items").insert({
      couple_id: coupleId,
      user_id: user.id,
      item_type: "ritual",
      source_id: ritual.id,
      title: ritual.title,
    });
    toast.success(t("ritual.saved_altar"));
  };

  const sendToPartner = async (ritual: RitualItem) => {
    if (!user || !coupleId) return;
    await supabase.from("partner_messages").insert({
      couple_id: coupleId,
      sender_id: user.id,
      message_type: "invitation",
      content: `✦ ${ritual.title} — ${ritual.hook || ""}`,
    });
    toast.success(t("ritual.sent_partner"));
  };

  return (
    <div className="px-5 py-6 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
          {t("ritual_cards.title")}
        </h3>
        <p className="text-muted-foreground font-body text-base md:text-lg max-w-md mx-auto">
          {t("ritual_cards.subtitle")}
        </p>
      </div>

      {/* Rituals / Positions toggle */}
      <div className="flex gap-1 p-1 rounded-xl bg-card/50 border border-border/30 max-w-xs mx-auto mb-5">
        {(["rituals", "positions"] as const).map((vt) => (
          <button
            key={vt}
            onClick={() => { setViewType(vt); setExpanded(null); }}
            className={`flex-1 py-2 rounded-lg text-sm font-body transition-all ${
              viewType === vt
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(`ritual_cards.type.${vt}`)}
          </button>
        ))}
      </div>

      {/* Category pills (only for rituals) */}
      {viewType === "rituals" && (
        <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
          {categoryFilters.map((cat) => {
            const Icon = categoryIcons[cat] || Sparkles;
            const active = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setExpanded(null); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body whitespace-nowrap transition-all border ${
                  active
                    ? "bg-primary/15 text-primary border-primary/30"
                    : "text-muted-foreground border-border/30 hover:border-border/60"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat === "all" ? t("ritual_cards.all") : t(`ritual_cards.cat.${cat}`)}
              </button>
            );
          })}
        </div>
      )}

      {/* Cards */}
      <div className="space-y-3">
        {filtered.map((ritual) => {
          const isExpanded = expanded === ritual.id;
          const Icon = categoryIcons[ritual.category] || Sparkles;
          return (
            <div key={ritual.id} className="relative">
              {ritual.premium_required && (
                <div className="absolute inset-0 z-10 rounded-2xl bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                  <Lock className="h-5 w-5 text-primary/60" />
                  <span className="text-sm font-body text-muted-foreground">{t("premium.unlock")}</span>
                </div>
              )}
              <div
                className={`rounded-2xl border transition-all duration-300 ${
                  isExpanded ? "bg-primary/5 border-primary/30" : "bg-card/50 border-border/30"
                } ${ritual.premium_required ? "opacity-50" : ""}`}
              >
                <button
                  onClick={() => !ritual.premium_required && setExpanded(isExpanded ? null : ritual.id)}
                  className="w-full text-left p-5"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-lg md:text-xl text-foreground mb-1">{ritual.title}</h4>
                      <p className="text-sm md:text-base font-body text-muted-foreground">{ritual.hook}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs font-body text-muted-foreground/60">
                        {ritual.duration && <span>⏱ {ritual.duration}</span>}
                        {ritual.tone && <span className="capitalize">✦ {ritual.tone}</span>}
                        {ritual.intensity && (
                          <span>{"●".repeat(ritual.intensity)}{"○".repeat(4 - ritual.intensity)}</span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 text-muted-foreground/40 shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </div>
                </button>

                {/* Expanded: steps + actions */}
                {isExpanded && (
                  <div className="px-5 pb-5 animate-fade-in">
                    <div className="border-t border-border/30 pt-4 mb-4">
                      <p className="text-xs font-body uppercase tracking-wider text-primary mb-3">
                        {t("ritual.step")} {activeStep + 1} / {ritual.steps.length}
                      </p>
                      <p className="text-base md:text-lg font-body text-foreground leading-relaxed min-h-[3rem]">
                        {ritual.steps[activeStep]}
                      </p>
                      <div className="flex gap-2 mt-4">
                        {activeStep > 0 && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setActiveStep((s) => s - 1); }}
                            className="px-4 py-2 rounded-lg border border-border/40 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {t("ritual.prev")}
                          </button>
                        )}
                        {activeStep < ritual.steps.length - 1 ? (
                          <button
                            onClick={(e) => { e.stopPropagation(); setActiveStep((s) => s + 1); }}
                            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-body hover:bg-primary/90 transition-colors"
                          >
                            {t("ritual.next_step")}
                          </button>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); setExpanded(null); setActiveStep(0); }}
                            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-body hover:bg-primary/90 transition-colors"
                          >
                            {t("ritual.complete")}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); saveToAltar(ritual); }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/30 text-xs font-body text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                      >
                        <Bookmark className="h-3.5 w-3.5" />
                        {t("ritual.save")}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); sendToPartner(ritual); }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/30 text-xs font-body text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                      >
                        <Send className="h-3.5 w-3.5" />
                        {t("ritual.send")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="h-8 w-8 text-primary/20 mx-auto mb-3" />
            <p className="text-base text-muted-foreground font-body">{t("ritual_cards.empty")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RitualCards;
