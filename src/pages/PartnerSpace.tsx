import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Bookmark,
  Cloud,
  Compass,
  Heart,
  Home,
  MessageCircle,
  Route,
  Shield,
  Sparkles,
} from "lucide-react";

import TempleHome from "@/components/space/TempleHome";
import IntimacyWeather from "@/components/space/IntimacyWeather";
import RitualCards from "@/components/space/RitualCards";
import PositionDeck from "@/components/space/PositionDeck";
import TempleMessages from "@/components/space/TempleMessages";
import Pathways from "@/components/space/Pathways";
import MemoryAltar from "@/components/space/MemoryAltar";
import RepairMode from "@/components/space/RepairMode";
import TempleGuide from "@/components/space/TempleGuide";

type TabKey =
  | "home"
  | "weather"
  | "rituals"
  | "positions"
  | "messages"
  | "guide"
  | "repair"
  | "pathways"
  | "altar";

const tabs: { key: TabKey; icon: typeof Home; labelKey: string }[] = [
  { key: "home", icon: Home, labelKey: "temple.tab.home" },
  { key: "weather", icon: Cloud, labelKey: "temple.tab.weather" },
  { key: "rituals", icon: Sparkles, labelKey: "temple.tab.rituals" },
  { key: "positions", icon: Heart, labelKey: "temple.tab.positions" },
  { key: "messages", icon: MessageCircle, labelKey: "temple.tab.messages" },
  { key: "guide", icon: Compass, labelKey: "temple.tab.guide" },
  { key: "repair", icon: Shield, labelKey: "temple.tab.repair" },
  { key: "pathways", icon: Route, labelKey: "temple.tab.pathways" },
  { key: "altar", icon: Bookmark, labelKey: "temple.tab.altar" },
];

const PartnerSpace = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("home");

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

  const navigate = (tab: string) => {
    setActiveTab(tab as TabKey);
  };

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!coupleId) {
    return (
      <div className="min-h-screen bg-background text-foreground px-4 py-10">
        <div className="mx-auto max-w-xl rounded-3xl border border-border/30 bg-card/40 p-8 text-center">
          <h2 className="font-display text-2xl text-foreground">{t("space.not_connected")}</h2>
          <p className="mt-3 font-body text-muted-foreground">{t("space.connect_first")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-6 md:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl text-foreground">{t("temple.title")}</h1>
          <p className="mt-2 font-body text-muted-foreground">{t("temple.subtitle")}</p>
        </header>

        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-body whitespace-nowrap transition-all ${
                    active
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground border border-transparent"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t(tab.labelKey)}
                </button>
              );
            })}
          </div>
        </div>

        <section>
          {activeTab === "home" && <TempleHome coupleId={coupleId} onNavigate={navigate} />}
          {activeTab === "weather" && <IntimacyWeather coupleId={coupleId} onNavigate={navigate} />}
          {activeTab === "rituals" && <RitualCards coupleId={coupleId} />}
          {activeTab === "positions" && <PositionDeck />}
          {activeTab === "messages" && <TempleMessages coupleId={coupleId} />}
          {activeTab === "guide" && <TempleGuide />}
          {activeTab === "repair" && <RepairMode />}
          {activeTab === "pathways" && <Pathways coupleId={coupleId} />}
          {activeTab === "altar" && <MemoryAltar coupleId={coupleId} />}
        </section>
      </div>
    </div>
  );
};

export default PartnerSpace;
