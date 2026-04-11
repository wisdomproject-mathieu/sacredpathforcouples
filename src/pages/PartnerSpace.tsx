import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
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
  title: string;
  subtitle: string;
  iconClass: string;
}[] = [
  {
    key: "home",
    icon: Home,
    title: "Temple Home",
    subtitle: "Begin where the relationship is right now and choose the next sacred move.",
    iconClass: "text-amber-300",
  },
  {
    key: "weather",
    icon: Cloud,
    title: "Intimacy Weather",
    subtitle: "Name the climate before choosing touch, truth, or ritual.",
    iconClass: "text-sky-300",
  },
  {
    key: "rituals",
    icon: Sparkles,
    title: "Rituals",
    subtitle: "Open guided practices for softness, presence, longing, devotion, or desire.",
    iconClass: "text-fuchsia-300",
  },
  {
    key: "positions",
    icon: Heart,
    title: "Positions",
    subtitle: "Explore embodied doorways into closeness, charge, and sacred sensual contact.",
    iconClass: "text-rose-300",
  },
  {
    key: "messages",
    icon: MessageCircle,
    title: "Messages",
    subtitle: "Send something warm, honest, reassuring, playful, or deeply desired.",
    iconClass: "text-violet-300",
  },
  {
    key: "guide",
    icon: Compass,
    title: "Temple Guide",
    subtitle: "Receive a wiser suggestion when you do not know what the relationship needs.",
    iconClass: "text-cyan-300",
  },
  {
    key: "repair",
    icon: Shield,
    title: "Repair",
    subtitle: "Return after tension, distance, or hurt with more softness and less defensiveness.",
    iconClass: "text-red-300",
  },
  {
    key: "pathways",
    icon: Route,
    title: "Pathways",
    subtitle: "Walk a longer journey instead of starting over every night.",
    iconClass: "text-emerald-300",
  },
  {
    key: "altar",
    icon: Bookmark,
    title: "Altar",
    subtitle: "Save what matters so the relationship becomes a lived memory, not only a moment.",
    iconClass: "text-orange-300",
  },
];

const PartnerSpace = () => {
  const { user } = useAuth();
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

  const activeMeta = useMemo(
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
          <h2 className="mt-5 font-display text-3xl text-foreground">Connect first</h2>
          <p className="mt-3 font-body text-muted-foreground">The Temple becomes alive once both partners are inside the same shared space.</p>
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
              <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Temple</p>
              <h1 className="mt-3 font-display text-3xl text-foreground md:text-5xl">A private sanctuary for two</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                The Temple is where wisdom becomes lived experience — through breath, weather, rituals, messages, repair, and embodied pathways back into one another.
              </p>
            </div>

            <div className="rounded-[24px] border border-border/30 bg-card/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Currently open</div>
              <div className="mt-2 flex items-center gap-3">
                <div className={`rounded-2xl border border-border/30 bg-background/45 p-3 ${activeMeta.iconClass}`}>
                  <activeMeta.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-xl text-foreground">{activeMeta.title}</div>
                  <div className="text-sm text-muted-foreground">{activeMeta.subtitle}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Doorways</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">Choose the right doorway for tonight</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative overflow-hidden rounded-[26px] border p-5 text-left transition-all ${
                    active
                      ? "border-primary/30 bg-primary/10 shadow-[0_18px_50px_-36px_rgba(255,173,70,0.42)]"
                      : "border-border/30 bg-card/45 hover:border-primary/20 hover:bg-card/55"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-65">
                    <div className="absolute -right-6 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                    <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />
                  </div>
                  <div className="relative flex h-full flex-col">
                    <div className={`inline-flex w-fit rounded-2xl border border-border/30 bg-background/45 p-3 ${tab.iconClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-2xl text-foreground">{tab.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{tab.subtitle}</p>
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
