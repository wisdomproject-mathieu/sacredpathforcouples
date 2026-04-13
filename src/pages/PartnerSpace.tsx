import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Brain,
  Bookmark,
  Cloud,
  Compass,
  Flame,
  Heart,
  Home,
  Lock,
  LockOpen,
  MessageCircle,
  Route,
  Shield,
  Sparkles,
  Stars,
} from "lucide-react";

import IntimacyWeather from "@/components/space/IntimacyWeather";
import RitualCards from "@/components/space/RitualCards";
import PositionDeck from "@/components/space/PositionDeck";
import TempleMessages from "@/components/space/TempleMessages";
import Pathways from "@/components/space/Pathways";
import MemoryAltar from "@/components/space/MemoryAltar";
import RepairMode from "@/components/space/RepairMode";
import TempleGuide from "@/components/space/TempleGuide";
import WisdomOracle from "@/components/space/WisdomOracle";
import ShareCardButton from "@/components/space/ShareCardButton";
import { Tables } from "@/integrations/supabase/types";
import { resolveCoupleStateForUser } from "@/lib/couples";
import { getEffectiveMembershipTier, isPremiumTier } from "@/lib/Premium";
import { useIsMobile } from "@/hooks/use-mobile";

type ToolKey = "weather" | "rituals" | "positions" | "messages" | "guide" | "repair" | "pathways" | "altar";
type ViewMode = "doorways" | "journey" | "oracle";

type ActivityState = {
  partnerNote: string;
  lastMove: string;
  rhythmCount: number;
  streakCount: number;
  altarNote: string;
  nextSuggestion: string;
};

type JourneyItem = Pick<Tables<"partner_messages">, "id" | "content" | "created_at" | "sender_id" | "message_type">;

const toolDefs: {
  key: ToolKey;
  icon: typeof Home;
  iconClass: string;
}[] = [
  {
    key: "weather",
    icon: Cloud,
    iconClass: "text-sky-300",
  },
  {
    key: "rituals",
    icon: Sparkles,
    iconClass: "text-fuchsia-300",
  },
  {
    key: "positions",
    icon: Heart,
    iconClass: "text-rose-300",
  },
  {
    key: "messages",
    icon: MessageCircle,
    iconClass: "text-violet-300",
  },
  {
    key: "guide",
    icon: Compass,
    iconClass: "text-cyan-300",
  },
  {
    key: "repair",
    icon: Shield,
    iconClass: "text-red-300",
  },
  {
    key: "pathways",
    icon: Route,
    iconClass: "text-emerald-300",
  },
  {
    key: "altar",
    icon: Bookmark,
    iconClass: "text-orange-300",
  },
];

const toolTextByLanguage: Record<Language, Record<ToolKey, { title: string; subtitle: string }>> = {
  en: {
    weather: { title: "Intimacy Weather", subtitle: "Begin with truth: name the emotional weather so tenderness lands where it is needed." },
    rituals: { title: "Rituals", subtitle: "Guided sacred practices for softness, devotion, longing, and embodied presence." },
    positions: { title: "Positions", subtitle: "Body-led doorways that awaken trust, polarity, tenderness, and magnetic charge." },
    messages: { title: "Teasing & Messages", subtitle: "Whispers, gratitude, desire, and repair notes that keep love moving." },
    guide: { title: "Sacred Guide", subtitle: "Receive a wise next step when the heart wants direction." },
    repair: { title: "Repair", subtitle: "Return from friction into closeness with gentle, safety-first repair." },
    pathways: { title: "Pathways", subtitle: "Turn beautiful nights into a living relational path you both can feel." },
    altar: { title: "Altar", subtitle: "Keep sacred moments, vows, and breakthroughs alive in memory." },
  },
  fr: {
    weather: { title: "Météo d'intimité", subtitle: "Commencez par la vérité: nommez le climat émotionnel pour que la tendresse tombe au bon endroit." },
    rituals: { title: "Rituels", subtitle: "Pratiques sacrées guidées pour la douceur, la dévotion, l'élan et la présence incarnée." },
    positions: { title: "Positions", subtitle: "Portes corporelles qui réveillent confiance, polarité, tendresse et charge magnétique." },
    messages: { title: "Messages & Désir", subtitle: "Murmures, gratitude, désir et notes de réparation qui gardent l'amour en mouvement." },
    guide: { title: "Guide sacré", subtitle: "Recevez une prochaine étape sage quand le cœur cherche une direction." },
    repair: { title: "Réparation", subtitle: "Revenez du frottement vers la proximité avec une réparation douce et sécurisante." },
    pathways: { title: "Parcours", subtitle: "Transformez de belles nuits en chemin relationnel vivant que vous pouvez ressentir à deux." },
    altar: { title: "Autel", subtitle: "Gardez vivants les moments sacrés, les vœux et les percées en mémoire." },
  },
  cs: {
    weather: { title: "Počasí intimity", subtitle: "Začněte pravdou: pojmenujte emoční klima, aby něha dopadla tam, kde je potřeba." },
    rituals: { title: "Rituály", subtitle: "Vedené posvátné praktiky pro jemnost, oddanost, touhu a vtělenou přítomnost." },
    positions: { title: "Pozice", subtitle: "Tělesné brány, které probouzí důvěru, polaritu, něhu a magnetické napětí." },
    messages: { title: "Zprávy a touha", subtitle: "Vzkazy, vděčnost, touha a opravné zprávy, které udržují lásku v pohybu." },
    guide: { title: "Posvátný průvodce", subtitle: "Získejte moudrý další krok, když srdce hledá směr." },
    repair: { title: "Oprava", subtitle: "Vraťte se z napětí do blízkosti skrze jemnou a bezpečnou opravu." },
    pathways: { title: "Cesty", subtitle: "Proměňte krásné večery v živou vztahovou cestu, kterou oba cítíte." },
    altar: { title: "Oltář", subtitle: "Uchovávejte posvátné momenty, sliby a průlomy v živé paměti." },
  },
};

const templeViewDefs: {
  key: ViewMode;
  icon: typeof Home;
  iconClass: string;
  premium: boolean;
}[] = [
  {
    key: "doorways",
    icon: Sparkles,
    iconClass: "text-fuchsia-300",
    premium: false,
  },
  {
    key: "journey",
    icon: Route,
    iconClass: "text-amber-300",
    premium: true,
  },
  {
    key: "oracle",
    icon: Brain,
    iconClass: "text-cyan-300",
    premium: true,
  },
];

const templeViewTextByLanguage: Record<Language, Record<ViewMode, { title: string; subtitle: string }>> = {
  en: {
    doorways: { title: "Sacred Doorways", subtitle: "Eight sensual tools for the exact moment you are in." },
    journey: { title: "Our Journey", subtitle: "See your shared pulse, patterns, and the next loving move." },
    oracle: { title: "Wisdom Oracle", subtitle: "Personalized relationship intelligence for what opens next." },
  },
  fr: {
    doorways: { title: "Portes sacrées", subtitle: "Huit outils sensuels pour l'instant exact que vous traversez." },
    journey: { title: "Notre parcours", subtitle: "Voyez votre pulsation partagée, vos schémas, et le prochain geste d'amour." },
    oracle: { title: "Oracle de sagesse", subtitle: "Intelligence relationnelle personnalisée pour ce qui veut s'ouvrir ensuite." },
  },
  cs: {
    doorways: { title: "Posvátné brány", subtitle: "Osm smyslných nástrojů pro přesný moment, ve kterém jste." },
    journey: { title: "Naše cesta", subtitle: "Uvidíte společný rytmus, vzorce a další láskyplný krok." },
    oracle: { title: "Oracle moudrosti", subtitle: "Personalizovaná vztahová inteligence pro to, co se má otevřít dál." },
  },
};

const freeDoorways: ToolKey[] = ["weather", "rituals"];

const dayKey = (iso?: string | null) => (iso ? new Date(iso).toISOString().slice(0, 10) : null);

const isToolKey = (value?: string | null): value is ToolKey =>
  Boolean(value && toolDefs.some((tool) => tool.key === value));

const isViewKey = (value?: string | null): value is ViewMode =>
  Boolean(value && templeViewDefs.some((view) => view.key === value));

const messageTypeLabel = (messageType: string | null | undefined, lang: Language) => {
  const labelsByLanguage: Record<Language, Record<string, string>> = {
    en: {
      doorway_share: "Doorway offering",
      weather_share: "Weather offering",
      ritual_share: "Ritual offering",
      position_share: "Position offering",
      guide_share: "Guide offering",
      repair_share: "Repair offering",
      pathway_share: "Pathway offering",
      altar_share: "Altar offering",
      oracle_move_share: "Oracle guidance",
      oracle_sequence_share: "Oracle sequence",
      oracle_config_share: "Oracle intention",
      message_prompt_share: "Message prompt",
      message: "Whisper",
      invitation: "Invitation",
      default: "Shared offering",
    },
    fr: {
      doorway_share: "Offrande de porte",
      weather_share: "Offrande météo",
      ritual_share: "Offrande de rituel",
      position_share: "Offrande de position",
      guide_share: "Offrande de guide",
      repair_share: "Offrande de réparation",
      pathway_share: "Offrande de parcours",
      altar_share: "Offrande d'autel",
      oracle_move_share: "Guidance oracle",
      oracle_sequence_share: "Séquence oracle",
      oracle_config_share: "Intention oracle",
      message_prompt_share: "Prompt de message",
      message: "Murmure",
      invitation: "Invitation",
      default: "Offrande partagée",
    },
    cs: {
      doorway_share: "Sdílení brány",
      weather_share: "Sdílení počasí",
      ritual_share: "Sdílení rituálu",
      position_share: "Sdílení pozice",
      guide_share: "Sdílení průvodce",
      repair_share: "Sdílení opravy",
      pathway_share: "Sdílení cesty",
      altar_share: "Sdílení oltáře",
      oracle_move_share: "Oracle vedení",
      oracle_sequence_share: "Oracle sekvence",
      oracle_config_share: "Oracle záměr",
      message_prompt_share: "Prompt zprávy",
      message: "Vzkaz",
      invitation: "Pozvání",
      default: "Sdílené sdělení",
    },
  };

  const labels = labelsByLanguage[lang];
  switch (messageType) {
    case "doorway_share":
      return labels.doorway_share;
    case "weather_share":
      return labels.weather_share;
    case "ritual_share":
      return labels.ritual_share;
    case "position_share":
      return labels.position_share;
    case "guide_share":
      return labels.guide_share;
    case "repair_share":
      return labels.repair_share;
    case "pathway_share":
      return labels.pathway_share;
    case "altar_share":
      return labels.altar_share;
    case "oracle_move_share":
      return labels.oracle_move_share;
    case "oracle_sequence_share":
      return labels.oracle_sequence_share;
    case "oracle_config_share":
      return labels.oracle_config_share;
    case "message_prompt_share":
      return labels.message_prompt_share;
    case "message":
      return labels.message;
    case "invitation":
      return labels.invitation;
    default:
      return labels.default;
  }
};

const computeStreak = (dates: string[]) => {
  const unique = Array.from(new Set(dates.filter(Boolean))).sort().reverse();
  if (!unique.length) return 0;

  let streak = 1;
  let cursor = new Date(unique[0]);

  for (let i = 1; i < unique.length; i++) {
    const prev = new Date(cursor);
    prev.setDate(prev.getDate() - 1);
    const expected = prev.toISOString().slice(0, 10);
    if (unique[i] === expected) {
      streak += 1;
      cursor = prev;
    } else {
      break;
    }
  }

  return streak;
};

const truncateText = (value: string, max = 132) => {
  if (value.length <= max) return value;
  return `${value.slice(0, max).trimEnd()}...`;
};

const DoorwayDetailBar = ({
  title,
  unlocked,
  onBack,
  backLabel,
  accessOpenLabel,
  lockedLabel,
}: {
  title: string;
  unlocked: boolean;
  onBack: () => void;
  backLabel: string;
  accessOpenLabel: string;
  lockedLabel: string;
}) => (
  <div className="sticky top-2 z-30 rounded-2xl border border-border/35 bg-background/95 p-3 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.68)] backdrop-blur">
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        className="rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-xs uppercase tracking-[0.14em] text-foreground"
      >
        {backLabel}
      </button>
      <div className="min-w-0 flex-1 text-right">
        <p className="truncate font-display text-lg text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{unlocked ? accessOpenLabel : lockedLabel}</p>
      </div>
      <div
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full border ${
          unlocked
            ? "border-emerald-300/35 bg-emerald-500/14 text-emerald-200"
            : "border-amber-300/35 bg-amber-500/14 text-amber-200"
        }`}
      >
        {unlocked ? <LockOpen className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
      </div>
    </div>
  </div>
);

const PartnerSpace = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { lang } = useLanguage();
  const l = (en: string, fr: string, cs: string) => (lang === "fr" ? fr : lang === "cs" ? cs : en);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tools = useMemo(
    () => toolDefs.map((tool) => ({ ...tool, ...toolTextByLanguage[lang][tool.key] })),
    [lang],
  );
  const templeViews = useMemo(
    () => templeViewDefs.map((view) => ({ ...view, ...templeViewTextByLanguage[lang][view.key] })),
    [lang],
  );
  const toolParam = searchParams.get("tool");
  const viewParam = searchParams.get("view");
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [hasConnectedPartner, setHasConnectedPartner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("doorways");
  const [activeTool, setActiveTool] = useState<ToolKey>("weather");
  const [mobileDoorwayDetailMode, setMobileDoorwayDetailMode] = useState(false);
  const [activityTick, setActivityTick] = useState(0);
  const [activity, setActivity] = useState<ActivityState>({
    partnerNote: "No message in your shared thread yet. Offer one honest line and let the night begin.",
    lastMove: "No shared movement yet. Begin with Intimacy Weather or a soft invitation.",
    rhythmCount: 0,
    streakCount: 0,
    altarNote: "No altar memory has been sealed yet.",
    nextSuggestion: "Start with Intimacy Weather to meet each other where you truly are.",
  });
  const [journeyFeed, setJourneyFeed] = useState<JourneyItem[]>([]);
  const membershipTier = getEffectiveMembershipTier(user);
  const hasPremiumAccess = isPremiumTier(membershipTier);

  const isToolUnlocked = (tool: ToolKey) => hasPremiumAccess || freeDoorways.includes(tool);
  const isViewUnlocked = (view: ViewMode) => hasPremiumAccess || view === "doorways";
  const activeToolUnlocked = isToolUnlocked(activeTool);

  const activateTool = (tool: ToolKey) => {
    setViewMode("doorways");
    setActiveTool(tool);
    if (isMobile) {
      setMobileDoorwayDetailMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const { data: coupleRows } = await supabase
        .from("couples")
        .select("id, partner_a, partner_b, couple_code, created_at, updated_at")
        .or(`partner_a.eq.${user.id},partner_b.eq.${user.id}`)
        .order("updated_at", { ascending: false })
        .limit(20);

      const resolved = resolveCoupleStateForUser(coupleRows ?? [], user.id);
      if (resolved.activeCouple) {
        setCoupleId(resolved.activeCouple.id);
        setHasConnectedPartner(resolved.connected);
      } else {
        setCoupleId(null);
        setHasConnectedPartner(false);
      }
      setLoading(false);
    };

    load();
  }, [user]);

  useEffect(() => {
    if (isViewKey(viewParam)) {
      setViewMode(viewParam);
    }
    if (!isToolKey(toolParam)) return;
    activateTool(toolParam);
  }, [toolParam, viewParam, hasPremiumAccess]);

  useEffect(() => {
    if (!coupleId || !user) return;

    const loadActivity = async () => {
      const [weatherRes, messageRes, altarRes] = await Promise.all([
        supabase
          .from("weather_entries")
          .select("state, created_at, user_id")
          .eq("couple_id", coupleId)
          .order("created_at", { ascending: false })
          .limit(20),
        supabase
          .from("partner_messages")
          .select("id, content, created_at, sender_id, message_type")
          .eq("couple_id", coupleId)
          .order("created_at", { ascending: false })
          .limit(40),
        supabase
          .from("altar_items")
          .select("title, created_at")
          .eq("couple_id", coupleId)
          .order("created_at", { ascending: false })
          .limit(20),
      ]);

      const latestWeather = weatherRes.data?.[0];
      const latestMessage = messageRes.data?.find((item) => item.sender_id !== user.id) ?? messageRes.data?.[0];
      const latestAltar = altarRes.data?.[0];
      setJourneyFeed((messageRes.data ?? []).slice(0, 12));

      const allDates = [
        ...(weatherRes.data?.map((item) => dayKey(item.created_at)) ?? []),
        ...(messageRes.data?.map((item) => dayKey(item.created_at)) ?? []),
        ...(altarRes.data?.map((item) => dayKey(item.created_at)) ?? []),
      ].filter(Boolean) as string[];

      const rhythmCount = new Set(allDates).size;
      const streakCount = computeStreak(allDates);

      let nextSuggestion = l(
        "Begin with Intimacy Weather so your next move feels precise and kind.",
        "Commencez par la météo d'intimité pour que votre prochain geste soit juste et doux.",
        "Začněte počasím intimity, aby další krok byl přesný a laskavý.",
      );
      if (latestWeather?.state === "stormy")
        nextSuggestion = l(
          "Lead with Repair or a gentle reassurance note before intensity.",
          "Commencez par Réparation ou un message de réassurance avant l'intensité.",
          "Nejprve otevřete Opravu nebo jemné ujištění, až pak intenzitu.",
        );
      if (latestWeather?.state === "warm")
        nextSuggestion = l(
          "A beautiful night for Rituals or a warm teasing message.",
          "Une belle soirée pour des rituels ou un message taquin et tendre.",
          "Krásný večer pro Rituály nebo hravý a laskavý vzkaz.",
        );
      if (latestWeather?.state === "passionate")
        nextSuggestion = l(
          "Open Positions or Rituals and shape the energy with presence.",
          "Ouvrez Positions ou Rituels et façonnez l'énergie avec présence.",
          "Otevřete Pozice nebo Rituály a veďte energii přítomností.",
        );

      setActivity({
        partnerNote:
          latestMessage?.content ||
          l(
            "No message in your shared thread yet. Offer one honest line and let the night begin.",
            "Aucun message partagé pour le moment. Offrez une ligne sincère et laissez la soirée commencer.",
            "Ve sdíleném vlákně zatím není zpráva. Pošlete jednu upřímnou větu a nechte večer začít.",
          ),
        lastMove: latestWeather
          ? l(
              `Latest shared weather: ${latestWeather.state}.`,
              `Dernière météo partagée : ${latestWeather.state}.`,
              `Poslední sdílené počasí: ${latestWeather.state}.`,
            )
          : latestAltar
          ? l(
              `Latest altar memory: ${latestAltar.title}.`,
              `Dernière mémoire d'autel : ${latestAltar.title}.`,
              `Poslední oltářní vzpomínka: ${latestAltar.title}.`,
            )
          : l(
              "No shared movement yet. Begin with Intimacy Weather or a soft invitation.",
              "Pas encore de mouvement partagé. Commencez par la météo d'intimité ou une invitation douce.",
              "Zatím žádný sdílený pohyb. Začněte počasím intimity nebo jemným pozváním.",
            ),
        rhythmCount,
        streakCount,
        altarNote:
          latestAltar?.title ||
          l(
            "No altar memory has been sealed yet.",
            "Aucune mémoire d'autel n'a encore été scellée.",
            "Zatím nebyla uzavřena žádná oltářní vzpomínka.",
          ),
        nextSuggestion,
      });
    };

    loadActivity();
  }, [activityTick, coupleId, user, lang]);

  useEffect(() => {
    if (!coupleId) return;

    const channel = supabase
      .channel(`temple_activity_${coupleId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "partner_messages", filter: `couple_id=eq.${coupleId}` },
        () => setActivityTick((value) => value + 1)
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "weather_entries", filter: `couple_id=eq.${coupleId}` },
        () => setActivityTick((value) => value + 1)
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "altar_items", filter: `couple_id=eq.${coupleId}` },
        () => setActivityTick((value) => value + 1)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [coupleId]);

  const navigateTool = (tab: string) => {
    if (!isToolKey(tab)) return;
    activateTool(tab);
  };

  const activeMeta = useMemo(() => tools.find((tool) => tool.key === activeTool) ?? tools[0], [activeTool, tools]);
  const showClosingPremiumBanner = !hasPremiumAccess && viewMode === "doorways" && activeToolUnlocked;
  const showDoorwayCards = !isMobile || !mobileDoorwayDetailMode;
  const showDoorwayContent = !isMobile || mobileDoorwayDetailMode;

  useEffect(() => {
    if (!isMobile && mobileDoorwayDetailMode) {
      setMobileDoorwayDetailMode(false);
    }
  }, [isMobile, mobileDoorwayDetailMode]);

  useEffect(() => {
    if (viewMode !== "doorways" && mobileDoorwayDetailMode) {
      setMobileDoorwayDetailMode(false);
    }
  }, [mobileDoorwayDetailMode, viewMode]);

  const premiumGateCard = (title: string, description: string) => (
    <section className="rounded-[28px] border border-amber-300/30 bg-gradient-to-br from-amber-500/14 via-background to-background p-6 shadow-[0_26px_80px_-40px_rgba(251,191,36,0.45)]">
      <div className="max-w-3xl">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/35 bg-amber-500/14 text-amber-200">
          <Lock className="h-3.5 w-3.5" />
        </div>
        <h3 className="mt-4 font-display text-3xl text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
        <p className="mt-3 text-sm leading-7 text-foreground/90">
          {l(
            "Open-access temple includes full Intimacy Weather and one guided ritual per category. Premium opens every doorway, every ritual, and the full couple intelligence experience.",
            "Le temple en accès libre inclut toute la Météo d'intimité et un rituel guidé par catégorie. Premium ouvre chaque porte, chaque rituel, et toute l'intelligence de couple.",
            "Chrám v otevřeném přístupu zahrnuje plné Počasí intimity a jeden vedený rituál v každé kategorii. Premium otevírá všechny brány, všechny rituály i plnou párovou inteligenci.",
          )}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/pricing"
            className="rounded-2xl border border-amber-300/35 bg-amber-500/14 px-5 py-3 text-sm text-foreground transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
          >
            {l("View premium plans", "Voir les plans premium", "Zobrazit premium plány")}
          </Link>
          <button
            type="button"
            onClick={() => activateTool("weather")}
            className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
          >
            <LockOpen className="h-4 w-4 text-amber-300" />
            {l("Continue with open access", "Continuer en accès libre", "Pokračovat v otevřeném přístupu")}
          </button>
        </div>
      </div>
    </section>
  );

  const premiumPreviewBanner = (eyebrow: string, title: string, description: string, tags: string[]) => (
    <section className="rounded-[28px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_58%),linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,23,42,0.12))] p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.5)]">
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/35 bg-amber-500/14 text-amber-200">
        <Lock className="h-3.5 w-3.5" />
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-amber-200">{eyebrow}</p>
      <h3 className="mt-2 font-display text-3xl text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-foreground/90">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to="/pricing"
          className="rounded-2xl border border-amber-300/35 bg-amber-500/14 px-5 py-3 text-sm text-foreground transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
        >
          {l("View plans", "Voir les plans", "Zobrazit plány")}
        </Link>
        <button
          type="button"
          onClick={() => setViewMode("doorways")}
          className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
        >
          <LockOpen className="h-4 w-4 text-amber-300" />
          {l("Continue with open access", "Continuer en accès libre", "Pokračovat v otevřeném přístupu")}
        </button>
      </div>
    </section>
  );

  const journeyPreview = (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{l("Our Journey Preview", "Aperçu de notre parcours", "Náhled naší cesty")}</p>
        <h2 className="mt-2 font-display text-3xl text-foreground">{l("A living map of your shared love story", "Une carte vivante de votre histoire d'amour", "Živá mapa vašeho sdíleného příběhu lásky")}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          {l(
            "See where your closeness is growing, what your partner offered most recently, and what Sacred Temple suggests next for your couple rhythm.",
            "Voyez où votre proximité grandit, ce que votre partenaire a offert récemment, et ce que le Temple sacré propose pour la suite.",
            "Uvidíte, kde vaše blízkost roste, co partner naposledy sdílel a co Posvátný chrám doporučuje jako další krok.",
          )}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{l("Rhythm snapshot", "Aperçu du rythme", "Snímek rytmu")}</div>
          <div className="mt-3 font-display text-4xl text-foreground">{activity.rhythmCount}</div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{l("Shared temple days detected in your recent connection cycle.", "Jours de temple partagés détectés sur votre cycle récent.", "Sdílené dny chrámu zaznamenané v posledním cyklu propojení.")}</p>
        </div>

        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{l("Continuity streak", "Série de continuité", "Série kontinuity")}</div>
          <div className="mt-3 font-display text-4xl text-foreground">{activity.streakCount}</div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{l("Consecutive days of emotional and sensual movement together.", "Jours consécutifs de mouvement émotionnel et sensuel à deux.", "Po sobě jdoucí dny emočního a smyslného pohybu spolu.")}</p>
        </div>

        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{l("Beloved signal", "Signal du partenaire", "Signál partnera")}</div>
          <p className="mt-3 text-sm leading-7 text-foreground/90">{truncateText(activity.partnerNote)}</p>
        </div>

        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{l("Suggested next move", "Prochain geste suggéré", "Doporučený další krok")}</div>
          <p className="mt-3 text-sm leading-7 text-foreground/90">{truncateText(activity.nextSuggestion)}</p>
        </div>
      </div>

      <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
        <div className="flex items-center gap-2 text-violet-300">
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs uppercase tracking-[0.18em]">{l("Timeline preview", "Aperçu de la timeline", "Náhled časové osy")}</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {l(
            "In premium, every shared doorway and oracle offering becomes a visible timeline with context and relational momentum.",
            "En premium, chaque porte partagée et chaque offrande Oracle deviennent une timeline visible avec contexte et élan relationnel.",
            "V premium se každá sdílená brána a oracle sdílení promění ve viditelnou časovou osu s kontextem i vztahem.",
          )}
        </p>
        <div className="mt-4 space-y-3">
          {journeyFeed.length === 0 ? (
            <div className="rounded-[22px] border border-border/30 bg-background/45 p-4 text-sm text-muted-foreground">
              {l(
                "No shared offerings yet. Journey preview will populate as soon as you share doorway and oracle cards.",
                "Aucune offrande partagée pour le moment. L'aperçu se remplira dès vos premiers partages de portes et de cartes Oracle.",
                "Zatím žádná sdílení. Náhled cesty se naplní hned, jak začnete sdílet brány a oracle karty.",
              )}
            </div>
          ) : (
            journeyFeed.slice(0, 2).map((item) => (
              <div key={item.id} className="rounded-[22px] border border-border/30 bg-background/45 p-4">
                <div className="inline-flex rounded-full border border-border/35 bg-card/45 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {messageTypeLabel(item.message_type, lang)}
                </div>
                <p className="mt-3 text-sm leading-6 text-foreground/90">{truncateText(item.content, 168)}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {premiumPreviewBanner(
        "Journey Premium",
        "Unlock full couple timeline intelligence",
        "Track your shared patterns, offerings, devotion notes, and next-step momentum so your relationship keeps evolving with clarity and sensual depth.",
        ["Timeline Memory", "Couple Patterns", "Next-Step Guidance"],
      )}
    </section>
  );

  const oraclePreview = (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{l("Wisdom Oracle Preview", "Aperçu Oracle de sagesse", "Náhled Oracle moudrosti")}</p>
        <h2 className="mt-2 font-display text-3xl text-foreground">{l("Relationship intelligence for what opens next", "Intelligence relationnelle pour ce qui s'ouvre ensuite", "Vztahová inteligence pro to, co se otevře dál")}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          {l(
            "The Oracle reads your couple data, emotional weather, and sacred history to propose a personalized next move with romantic and sensual precision.",
            "L'Oracle lit vos données de couple, votre météo émotionnelle et votre histoire sacrée pour proposer un prochain geste personnalisé, romantique et sensuel.",
            "Oracle čte vaše párová data, emoční počasí a posvátnou historii, aby navrhl personalizovaný další krok s romantickou i smyslnou přesností.",
          )}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{l("Oracle tones", "Tonalités Oracle", "Tóny Oracle")}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[l("Romantic", "Romantique", "Romantický"), l("Erotic", "Érotique", "Erotický"), l("Playful", "Joueur", "Hravý"), l("Repair", "Réparation", "Oprava")].map((tone) => (
              <span key={tone} className="rounded-full border border-border/30 bg-background/45 px-2.5 py-1 text-[11px] text-foreground/90">
                {tone}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{l("Pre-configure the Oracle to match your couple intention each day.", "Pré-configurez l'Oracle selon votre intention de couple chaque jour.", "Přednastavte Oracle tak, aby každý den odpovídal vašemu párovému záměru.")}</p>
        </div>

        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{l("Signal blend", "Mélange de signaux", "Směs signálů")}</div>
          <p className="mt-3 text-sm leading-7 text-foreground/90">
            {l(
              "Oracle blends Intimacy Weather, shared messages, altar memory, and rhythm history before generating guidance.",
              "L'Oracle combine la Météo d'intimité, les messages partagés, la mémoire de l'autel et l'historique du rythme avant de générer sa guidance.",
              "Oracle kombinuje Počasí intimity, sdílené zprávy, paměť oltáře a historii rytmu, než vygeneruje vedení.",
            )}
          </p>
        </div>

        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{l("3-step oracle flow", "Flux Oracle en 3 étapes", "3krokový Oracle tok")}</div>
          <ol className="mt-3 space-y-2 text-sm leading-6 text-foreground/90">
            <li>{l("1. Read the current couple state", "1. Lire l'état actuel du couple", "1. Přečíst aktuální stav páru")}</li>
            <li>{l("2. Offer one exact opening move", "2. Navrhnout jeden přesný úvodní krok", "2. Nabídnout jeden přesný otevírací krok")}</li>
            <li>{l("3. Sequence the next two intimacy steps", "3. Poser les deux prochaines étapes d'intimité", "3. Poskládat další dva kroky intimity")}</li>
          </ol>
        </div>

        <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{l("What couples receive", "Ce que les couples reçoivent", "Co páry získají")}</div>
          <p className="mt-3 text-sm leading-7 text-foreground/90">
            {l(
              "Romantic guidance, sensual pacing, erotic bridge suggestions, and friction-to-closeness moves tailored for your relationship.",
              "Guidance romantique, rythme sensuel, ponts érotiques et gestes de passage de la friction à la proximité adaptés à votre relation.",
              "Romantické vedení, smyslné tempo, erotické mosty a kroky od napětí k blízkosti přizpůsobené vašemu vztahu.",
            )}
          </p>
        </div>
      </div>

      {premiumPreviewBanner(
        l("Oracle Premium", "Premium Oracle", "Oracle Premium"),
        l("Unlock full Wisdom Oracle innovation", "Débloquer toute l'innovation Oracle de sagesse", "Odemknout plnou inovaci Oracle moudrosti"),
        l(
          "Get personalized next-step coaching, sequence-level recommendations, and sharable oracle cards that flow directly into your Journey page.",
          "Recevez un coaching personnalisé pour la prochaine étape, des recommandations séquencées, et des cartes Oracle partageables vers votre page Parcours.",
          "Získejte personalizované vedení pro další krok, doporučení na úrovni sekvencí a sdílené Oracle karty přímo do stránky Cesta.",
        ),
        [
          l("Personalized Oracle", "Oracle personnalisé", "Personalizovaný Oracle"),
          l("Sharable Moves", "Mouvements partageables", "Sdílené kroky"),
          l("Journey Sync", "Synchronisation du parcours", "Synchronizace cesty"),
        ],
      )}
    </section>
  );

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6 text-foreground md:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {!hasConnectedPartner && (
          <section className="rounded-[28px] border border-amber-300/30 bg-amber-500/10 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-amber-300/35 bg-background/45 p-3 text-amber-300">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl text-foreground">{l("Sacred Temple preview", "Aperçu du Temple sacré", "Náhled Posvátného chrámu")}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {l(
                    "Begin with Intimacy Weather and ritual previews now. Shared syncing awakens the moment both lovers are connected.",
                    "Commencez maintenant par la Météo d'intimité et les aperçus de rituels. La synchronisation partagée s'éveille dès que les deux partenaires sont connectés.",
                    "Začněte hned Počasím intimity a náhledy rituálů. Sdílená synchronizace se probudí ve chvíli, kdy jsou oba partneři propojeni.",
                  )}
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-7">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">{l("Sacred Temple", "Temple sacré", "Posvátný chrám")}</p>
            <h1 className="mt-3 font-display text-3xl text-foreground md:text-5xl">{l("A private sanctuary for modern lovers", "Un sanctuaire privé pour les amoureux modernes", "Soukromá svatyně pro moderní milence")}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              {l(
                "Ancient wisdom meets living intimacy: read your inner weather, open sensual ritual, repair gently, and weave a shared rhythm that deepens over time.",
                "La sagesse ancienne rencontre l'intimité vivante: lisez votre météo intérieure, ouvrez un rituel sensuel, réparez en douceur, et tissez un rythme partagé qui se renforce avec le temps.",
                "Starodávná moudrost se setkává s živou intimitou: čtěte vnitřní počasí, otevřete smyslný rituál, jemně opravujte a tkejte společný rytmus, který se časem prohlubuje.",
              )}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="w-full rounded-[24px] border border-border/30 bg-card/45 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-primary/80">{l("Sacred pages", "Pages sacrées", "Posvátné stránky")}</div>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {templeViews.map((view) => {
                  const Icon = view.icon;
                  const active = viewMode === view.key;
                  const locked = !isViewUnlocked(view.key);
                  return (
                    <div
                      key={view.key}
                      className={`relative overflow-hidden rounded-[20px] border p-4 text-left transition-all ${
                        active
                          ? "border-primary/30 bg-primary/10 shadow-[0_18px_50px_-36px_rgba(255,173,70,0.42)]"
                          : "border-border/30 bg-background/45 hover:border-primary/20 hover:bg-card/55"
                      }`}
                    >
                      {locked && (
                        <button
                          type="button"
                          onClick={() => navigate("/pricing")}
                          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/35 bg-amber-500/14 text-amber-200 transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
                          aria-label={l("Open plans", "Ouvrir les plans", "Otevřít plány")}
                        >
                          <Lock className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button type="button" onClick={() => setViewMode(view.key)} className="w-full text-left">
                      <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-2.5 ${view.iconClass}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="mt-3 font-display text-xl text-foreground">{view.title}</div>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{view.subtitle}</p>
                      {locked && (
                        <p className="mt-2 text-xs leading-5 text-amber-100/85">
                          {l(
                            "Unlock this page in plans to turn your shared data into next-step relationship guidance.",
                            "Débloquez cette page dans les plans pour transformer vos données partagées en guidance relationnelle.",
                            "Odemkněte tuto stránku v plánech a proměňte sdílená data na vedení pro další krok.",
                          )}
                        </p>
                      )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {viewMode === "doorways" && (
          <>
            {showDoorwayCards ? (
            <section>
              <div className="mb-4">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{l("Sacred Doorways", "Portes sacrées", "Posvátné brány")}</p>
                <h2 className="mt-2 font-display text-3xl text-foreground">{l("Choose the doorway your love needs tonight", "Choisissez la porte dont votre amour a besoin ce soir", "Vyberte bránu, kterou vaše láska dnes večer potřebuje")}</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  const active = activeTool === tool.key;
                  const locked = !isToolUnlocked(tool.key);
                  return (
                    <div
                      key={tool.key}
                      className={`relative overflow-hidden rounded-[26px] border p-5 text-left transition-all ${
                        active
                          ? "border-primary/30 bg-primary/10 shadow-[0_18px_50px_-36px_rgba(255,173,70,0.42)]"
                          : "border-border/30 bg-card/45 hover:border-primary/20 hover:bg-card/55"
                      } ${locked ? "border-amber-300/25 bg-amber-500/6" : ""}`}
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-65">
                        <div className="absolute -right-6 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                        <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />
                      </div>
                      {locked && (
                        <Link
                          to="/pricing"
                          className="absolute right-4 top-4 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/35 bg-amber-500/14 text-amber-200 transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
                          aria-label={l("Open plans", "Ouvrir les plans", "Otevřít plány")}
                        >
                          <Lock className="h-3.5 w-3.5" />
                        </Link>
                      )}
                      {!locked && (
                        <div
                          className="absolute right-4 top-4 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/35 bg-amber-500/14 text-amber-200"
                          aria-label={l("Open access", "Accès libre", "Otevřený přístup")}
                        >
                          <LockOpen className="h-3.5 w-3.5" />
                        </div>
                      )}
                      <button type="button" onClick={() => activateTool(tool.key)} className="relative flex h-full w-full flex-col text-left">
                        <div className={`inline-flex w-fit rounded-2xl border border-border/30 bg-background/45 p-3 ${tool.iconClass}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 font-display text-2xl text-foreground">{tool.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{tool.subtitle}</p>
                        {locked && (
                          <p className="mt-2 text-xs leading-5 text-amber-100/85">
                            {l(
                              "This doorway is unlocked in plans. Tap the golden lock to subscribe.",
                              "Cette porte se débloque dans les plans. Touchez le cadenas doré pour vous abonner.",
                              "Tato brána je odemčená v plánech. Klepněte na zlatý zámek a aktivujte předplatné.",
                            )}
                          </p>
                        )}
                      </button>
                      <div className="relative mt-4 flex flex-wrap gap-2">
                        {!locked && (
                          <>
                            <button
                              type="button"
                              onClick={() => activateTool(tool.key)}
                              className="rounded-2xl border border-primary/25 bg-primary/12 px-3 py-2 text-xs text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
                            >
                              {l("Enter doorway", "Entrer dans la porte", "Vstoupit do brány")}
                            </button>
                            <ShareCardButton
                              coupleId={coupleId ?? undefined}
                              messageType="doorway_share"
                              content={`Doorway card ✦ ${tool.title} — ${tool.subtitle}`}
                              label={l("Offer this doorway", "Partager cette porte", "Sdílet tuto bránu")}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            ) : null}

            {showDoorwayContent ? (
            <section className="space-y-4">
              {isMobile ? (
                <DoorwayDetailBar
                  title={activeMeta.title}
                  unlocked={activeToolUnlocked}
                  onBack={() => setMobileDoorwayDetailMode(false)}
                  backLabel={l("Back to doorways", "Retour aux portes", "Zpět na brány")}
                  accessOpenLabel={l("Open access", "Accès libre", "Otevřený přístup")}
                  lockedLabel={l("Locked in premium", "Verrouillé en premium", "Uzamčeno v premium")}
                />
              ) : null}
              {!activeToolUnlocked && premiumGateCard(activeMeta.title, activeMeta.subtitle)}
              {activeToolUnlocked && activeTool === "weather" && <IntimacyWeather coupleId={coupleId ?? undefined} onNavigate={navigateTool} />}
              {activeToolUnlocked && activeTool === "rituals" && (
                <RitualCards coupleId={coupleId ?? undefined} onNavigate={navigateTool} isPremium={hasPremiumAccess} />
              )}
              {activeToolUnlocked && activeTool === "positions" && (
                <PositionDeck onNavigate={navigateTool} coupleId={coupleId ?? undefined} isPremium={hasPremiumAccess} />
              )}
              {activeToolUnlocked && activeTool === "messages" && <TempleMessages coupleId={coupleId ?? undefined} onNavigate={navigateTool} />}
              {activeToolUnlocked && activeTool === "guide" && <TempleGuide onNavigate={navigateTool} coupleId={coupleId ?? undefined} />}
              {activeToolUnlocked && activeTool === "repair" && <RepairMode onNavigate={navigateTool} coupleId={coupleId ?? undefined} />}
              {activeToolUnlocked && activeTool === "pathways" && (
                <Pathways coupleId={coupleId ?? undefined} onNavigate={navigateTool} isPremium={hasPremiumAccess} />
              )}
              {activeToolUnlocked && activeTool === "altar" && <MemoryAltar coupleId={coupleId ?? undefined} onNavigate={navigateTool} />}
            </section>
            ) : null}
          </>
        )}

        {viewMode === "journey" &&
          (isViewUnlocked("journey") ? (
            <section className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{l("Our Journey", "Notre parcours", "Naše cesta")}</p>
              <h2 className="mt-2 font-display text-3xl text-foreground">{l("The living story of your love", "L'histoire vivante de votre amour", "Živý příběh vaší lásky")}</h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
                <div className="flex items-center gap-2 text-violet-300">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">{l("Beloved note", "Note du partenaire", "Vzkaz partnera")}</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-foreground/90">{activity.partnerNote}</p>
              </div>

              <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
                <div className="flex items-center gap-2 text-amber-300">
                  <Stars className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">{l("Latest shared movement", "Dernier mouvement partagé", "Poslední sdílený pohyb")}</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-foreground/90">{activity.lastMove}</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
              <div className="flex items-center gap-2 text-cyan-300">
                <Stars className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.18em]">{l("Shared offerings timeline", "Timeline des offrandes partagées", "Časová osa sdílení")}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {l(
                  "Every offering from Doorways and Oracle is woven here, so your relationship story stays visible over time.",
                  "Chaque offrande des Portes et de l'Oracle est tissée ici pour garder visible l'histoire de votre relation.",
                  "Každé sdílení z Bran a Oracle se zapisuje sem, aby váš vztahový příběh zůstal viditelný v čase.",
                )}
              </p>

              <div className="mt-4 space-y-3">
                {journeyFeed.length === 0 ? (
                  <div className="rounded-[22px] border border-border/30 bg-background/45 p-4 text-sm text-muted-foreground">
                    {l(
                      "No shared offerings yet. Offer one doorway card to begin your couple timeline.",
                      "Aucune offrande partagée pour le moment. Partagez une carte de porte pour démarrer votre timeline de couple.",
                      "Zatím žádná sdílení. Sdílejte jednu kartu brány a spusťte párovou časovou osu.",
                    )}
                  </div>
                ) : (
                  journeyFeed.map((item) => {
                    const mine = item.sender_id === user?.id;
                    return (
                      <div
                        key={item.id}
                        className={`rounded-[22px] border p-4 ${
                          mine ? "border-primary/20 bg-primary/8" : "border-border/30 bg-background/45"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="inline-flex rounded-full border border-border/35 bg-card/45 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                            {messageTypeLabel(item.message_type, lang)}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {new Date(item.created_at).toLocaleDateString()} · {mine ? l("You", "Vous", "Ty") : l("Beloved", "Partenaire", "Partner")}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-foreground/90">{item.content}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{l("Sacred rhythm", "Rythme sacré", "Posvátný rytmus")}</div>
                <div className="mt-3 font-display text-4xl text-foreground">{activity.rhythmCount}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{l("Days with shared Sacred Temple activity recorded.", "Jours avec activité partagée du Temple sacré enregistrée.", "Dny se zaznamenanou sdílenou aktivitou v Posvátném chrámu.")}</p>
              </div>

              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{l("Continuity streak", "Série de continuité", "Série kontinuity")}</div>
                <div className="mt-3 font-display text-4xl text-foreground">{activity.streakCount}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{l("Consecutive active days based on your recent Sacred Temple rhythm.", "Jours actifs consécutifs selon votre rythme récent du Temple sacré.", "Po sobě jdoucí aktivní dny podle vašeho nedávného rytmu Posvátného chrámu.")}</p>
              </div>

              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{l("Altar resonance", "Résonance de l'autel", "Rezonance oltáře")}</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{activity.altarNote}</p>
              </div>

              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{l("Oracle next move", "Prochain geste Oracle", "Další krok Oracle")}</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{activity.nextSuggestion}</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
                <div className="flex items-center gap-2 text-fuchsia-300">
                  <Flame className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">{l("Cards, history, and teasing", "Cartes, histoire et séduction", "Karty, historie a jiskření")}</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {l(
                    "Let this become the golden thread of your love: desire notes, gratitude offerings, ritual invitations, gentle apologies, and afterglow follow-ups.",
                    "Faites-en le fil d'or de votre amour: notes de désir, offrandes de gratitude, invitations rituelles, excuses douces et suivis d'après-rituel.",
                    "Ať se z toho stane zlatá nit vaší lásky: vzkazy touhy, sdílení vděčnosti, rituální pozvání, jemné omluvy a následná péče.",
                  )}
                </p>
              </div>

              <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Route className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">{l("Where the journey can grow", "Là où le parcours peut grandir", "Kde může cesta růst")}</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {l(
                    "Over time, this page becomes your living sanctuary map: what opened, what healed, what deepened, and what your love is ready for next.",
                    "Avec le temps, cette page devient la carte vivante de votre sanctuaire: ce qui s'est ouvert, réparé, approfondi, et ce que votre amour est prêt à vivre ensuite.",
                    "Časem se z této stránky stane živá mapa vaší svatyně: co se otevřelo, co se uzdravilo, co se prohloubilo a na co je vaše láska připravená dál.",
                  )}
                </p>
              </div>
            </div>
            </section>
          ) : (
            journeyPreview
          ))}

        {viewMode === "oracle" &&
          (isViewUnlocked("oracle") ? (
            <section>
              <WisdomOracle coupleId={coupleId ?? undefined} onNavigate={navigateTool} />
            </section>
          ) : (
            oraclePreview
          ))}

        {showClosingPremiumBanner && (
          <section className="rounded-[30px] border border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(251,191,36,0.45)] md:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-200">{l("Temple Premium", "Temple Premium", "Chrám Premium")}</p>
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">{l("Bring the full sanctuary online", "Activez le sanctuaire complet", "Aktivujte celou svatyni")}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
              {l(
                "Open access gives your couple Intimacy Weather plus one ritual per category. Premium unlocks every ritual, all eight doorways, Our Journey analytics, and full Wisdom Oracle innovation for your next shared chapter.",
                "L'accès libre offre à votre couple la Météo d'intimité plus un rituel par catégorie. Premium débloque tous les rituels, les huit portes, les analyses Notre Parcours, et toute l'innovation Oracle de sagesse.",
                "Otevřený přístup dává vašemu páru Počasí intimity plus jeden rituál v každé kategorii. Premium odemkne všechny rituály, všech osm bran, analytiku Naší cesty a plnou inovaci Oracle moudrosti.",
              )}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/pricing"
                className="rounded-2xl border border-amber-300/35 bg-amber-500/14 px-5 py-3 text-sm text-foreground transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
              >
                {l("View plans", "Voir les plans", "Zobrazit plány")}
              </Link>
              <button
                type="button"
                onClick={() => activateTool("weather")}
                className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
              >
                <LockOpen className="h-4 w-4 text-amber-300" />
                {l("Continue with open access", "Continuer en accès libre", "Pokračovat v otevřeném přístupu")}
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PartnerSpace;
