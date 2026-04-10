import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Cloud, Sparkles, MessageCircle, Layers, Route, Bookmark, Shield, Compass } from "lucide-react";
import IntimacyWeather from "@/components/space/IntimacyWeather";
import RitualCards from "@/components/space/RitualCards";
import TempleMessages from "@/components/space/TempleMessages";
import PositionDeck from "@/components/space/PositionDeck";
import Pathways from "@/components/space/Pathways";
import MemoryAltar from "@/components/space/MemoryAltar";
import RepairMode from "@/components/space/RepairMode";
import TempleGuide from "@/components/space/TempleGuide";

const tabs = [
  { key: "weather", icon: Cloud, labelKey: "temple.tab.weather" },
  { key: "rituals", icon: Sparkles, labelKey: "temple.tab.rituals" },
  { key: "positions", icon: Layers, labelKey: "temple.tab.positions" },
  { key: "messages", icon: MessageCircle, labelKey: "temple.tab.messages" },
  { key: "pathways", icon: Route, labelKey: "temple.tab.pathways" },
  { key: "altar", icon: Bookmark, labelKey: "temple.tab.altar" },
  { key: "repair", icon: Shield, labelKey: "temple.tab.repair" },
  { key: "guide", icon: Compass, labelKey: "temple.tab.guide" },
];

const PartnerSpace = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("weather");

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("couples")
        .select("*")
        .or(`partner_a.eq.${user.id},partner_b.eq.${user.id}`)
        .not("partner_b", "is", null)
        .maybeSingle();
      if (data) setCoupleId(data.id);
      setLoading(false);
    };
    load();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!coupleId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <Heart className="h-14 w-14 text-muted-foreground/20 mb-5" />
        <h2 className="font-heading text-3xl text-foreground mb-3">{t("space.not_connected")}</h2>
        <p className="text-muted-foreground font-body text-base">{t("space.connect_first")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border/50 bg-card/30">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">{t("temple.title")}</h2>
        <p className="text-sm md:text-base text-muted-foreground font-body mt-1">{t("temple.subtitle")}</p>
      </div>

      {/* Scrollable tab bar */}
      <div className="px-3 py-2.5 border-b border-border/30 bg-card/20 overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-body whitespace-nowrap transition-all ${
                  active
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{t(tab.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "weather" && <IntimacyWeather coupleId={coupleId} />}
        {activeTab === "rituals" && <RitualCards />}
        {activeTab === "positions" && <PositionDeck />}
        {activeTab === "messages" && (
          <div className="flex flex-col h-full">
            <TempleMessages coupleId={coupleId} />
          </div>
        )}
        {activeTab === "pathways" && <Pathways />}
        {activeTab === "altar" && <MemoryAltar coupleId={coupleId} />}
        {activeTab === "repair" && <RepairMode />}
        {activeTab === "guide" && <TempleGuide />}
      </div>
    </div>
  );
};

export default PartnerSpace;
