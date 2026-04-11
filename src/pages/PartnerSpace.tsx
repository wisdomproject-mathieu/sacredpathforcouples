import { useEffect, useMemo, useState } from "react";
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

const tabs: {
  key: TabKey;
  icon: typeof Home;
  labelKey: string;
  iconClass: string;
  ringClass: string;
}[] = [
  { key: "home", icon: Home, labelKey: "temple.tab.home", iconClass: "text-amber-300", ringClass: "hover:border-amber-400/25" },
  { key: "weather", icon: Cloud, labelKey: "temple.tab.weather", iconClass: "text-sky-300", ringClass: "hover:border-sky-400/25" },
  { key: "rituals", icon: Sparkles, labelKey: "temple.tab.rituals", iconClass: "text-fuchsia-300", ringClass: "hover:border-fuchsia-400/25" },
  { key: "positions", icon: Heart, labelKey: "temple.tab.positions", iconClass: "text-rose-300", ringClass: "hover:border-rose-400/25" },
  { key: "messages", icon: MessageCircle, labelKey: "temple.tab.messages", iconClass: "text-violet-300", ringClass: "hover:border-violet-400/25" },
  { key: "guide", icon: Compass, labelKey: "temple.tab.guide", iconClass: "text-cyan-300", ringClass: "hover:border-cyan-400/25" },
  { key: "repair", icon: Shield, labelKey: "temple.tab.repair", iconClass: "text-red-300", ringClass: "hover:border-red-400/25" },
  { key: "pathways", icon: Route, labelKey: "temple.tab.pathways", iconClass: "text-emerald-300", ringClass: "hover:border-emerald-400/25" },
  { key: "altar", icon: Bookmark, labelKey: "temple.tab.altar", iconClass: "text-orange-300", ringClass: "hover:border-orange-400/25" },
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

  const activeTabMeta = useMemo(
    () => tabs.find((tab) => tab.key === activeTab) ?? tabs[0],
    [activeTab]
  );

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!coupleId) {
    return (
      <div className="min-h-screen bg-background px-4 py-10 text-foreground md:px-6">
        <div className="mx-auto max-w-2xl rounded-[30px] border border-border/30 bg-card/45 p-8 text-center shadow-[0_24px_80px_-42px_rgba(0,0,0,0.65)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
            <Heart className="h-7 w-7" />
          </div>
          <h2 className="mt-5 font-display text-3xl text-foreground">{t("space.not_connected")}</h2>
          <p className="mt-3 font-body text-muted-foreground">{t("space.connect_first")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6 text-foreground md:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Private sanctuary</p>
              <h1 className="mt-3 font-display text-3xl text-foreground md:text-5xl">{t("temple.title")}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">{t("temple.subtitle")}</p>
            </div>

            <div className="rounded-[24px] border border-border/30 bg-card/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Now open</div>
              <div className="mt-2 flex items-center gap-3">
                <div className={`rounded-2xl border border-border/30 bg-background/45 p-3 ${activeTabMeta.iconClass}`}>
                  <activeTabMeta.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-xl text-foreground">{t(activeTabMeta.labelKey)}</div>
                  <div className="text-sm text-muted-foreground">Move through the temple together, one step at a time.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-border/30 bg-card/45 p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Temple navigation</p>
              <h2 className="mt-2 font-display text-2xl text-foreground">Choose your doorway</h2>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-[22px] border p-4 text-left transition-all ${
                    active
                      ? "border-primary/30 bg-primary/10 shadow-[0_18px_50px_-38px_rgba(255,173,70,0.55)]"
                      : `border-border/25 bg-background/35 hover:bg-background/55 ${tab.ringClass}`
                  }`}
                >
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${tab.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 font-display text-lg text-foreground">{t(tab.labelKey)}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {active ? "Currently open" : "Open section"}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

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
