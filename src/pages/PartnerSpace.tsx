import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Brain,
  Bookmark,
  Cloud,
  Compass,
  Heart,
  Home,
  Lock,
  LockOpen,
  MessageCircle,
  Route,
  Shield,
  Sparkles,
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
import TempleUpgradeCard from "@/components/premium/TempleUpgradeCard";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import CompactMatchCard from "@/components/space/journey/CompactMatchCard";
import CompactSharedWeatherRow from "@/components/space/journey/CompactSharedWeatherRow";
import EmptyStateCard from "@/components/space/journey/EmptyStateCard";
import LatestBelovedCard from "@/components/space/journey/LatestBelovedCard";
import SacredMessageComposer, { type SacredComposerType } from "@/components/space/journey/SacredMessageComposer";
import SacredTempleBoard, { type SacredBoardItem } from "@/components/space/journey/SacredTempleBoard";
import SharedTimeline from "@/components/space/journey/SharedTimeline";
import type { JourneyTimelineItem } from "@/components/space/journey/SharedTimelineItem";
import TempleJourneysCard from "@/components/space/journey/TempleJourneysCard";
import TempleBoardPreviewCard from "@/components/space/journey/TempleBoardPreviewCard";
import TimelinePreviewCard from "@/components/space/journey/TimelinePreviewCard";
import { type WeatherCardData } from "@/components/space/journey/SharedWeatherCard";
import WaitingForPartnerCard from "@/components/space/journey/WaitingForPartnerCard";
import WeatherMatchCard from "@/components/space/journey/WeatherMatchCard";
import TonightPathExperience from "@/components/space/journey/TonightPathExperience";
import { Tables } from "@/integrations/supabase/types";
import {
  markJourneySectionRead,
  readJourneySeenMap,
  toTimestamp,
  unreadCountSince,
  type JourneyNotificationSection,
} from "@/lib/journeyNotifications";
import { buildWeatherMatchResult, getWeatherPresentation } from "@/lib/weatherMatch";
import {
  fetchCoupleStateForUser,
  markEverConnected,
  readConnectedCoupleId,
  readEverConnected,
  storeConnectedCoupleId,
} from "@/lib/couples";
import { getEffectiveMembershipTier, isPremiumTier } from "@/lib/Premium";
import { getPremiumTriggerCopy, getTempleJourneys, getTempleMembershipName } from "@/lib/premiumArchitecture";
import { useIsMobile } from "@/hooks/use-mobile";

type ToolKey = "weather" | "rituals" | "positions" | "messages" | "guide" | "repair" | "pathways" | "altar";
type ViewMode = "doorways" | "journey" | "oracle";

type JourneyItem = Pick<Tables<"partner_messages">, "id" | "content" | "created_at" | "sender_id" | "message_type">;
type JourneyWeatherItem = Pick<Tables<"weather_entries">, "id" | "created_at" | "state" | "user_id" | "note">;
type JourneyAltarItem = Pick<Tables<"altar_items">, "id" | "title" | "created_at" | "user_id" | "item_type" | "note">;
type CuratedJourneyMessage = JourneyItem & { sanitizedContent: string };

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
    premium: false,
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

const isToolKey = (value?: string | null): value is ToolKey =>
  Boolean(value && toolDefs.some((tool) => tool.key === value));

const isViewKey = (value?: string | null): value is ViewMode =>
  Boolean(value && templeViewDefs.some((view) => view.key === value));

const normalizeLegacyJourneyCopy = (value: string) =>
  value
    .replace(/I am arriving as/gi, "My weather is")
    .replace(/arriving as/gi, "weather is")
    .replace(/How are you arriving tonight\?/gi, "How is your weather tonight?")
    .replace(/\s+/g, " ")
    .trim();

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
  const [matchDrawerOpen, setMatchDrawerOpen] = useState(false);
  const [templeDrawerOpen, setTempleDrawerOpen] = useState(false);
  const [timelineDrawerOpen, setTimelineDrawerOpen] = useState(false);
  const [journeysDrawerOpen, setJourneysDrawerOpen] = useState(false);
  const [composeDrawerOpen, setComposeDrawerOpen] = useState(false);
  const [activityTick, setActivityTick] = useState(0);
  const [partnerUserId, setPartnerUserId] = useState<string | null>(null);
  const [myDisplayName, setMyDisplayName] = useState<string | null>(null);
  const [partnerDisplayName, setPartnerDisplayName] = useState<string | null>(null);
  const [weatherEntries, setWeatherEntries] = useState<JourneyWeatherItem[]>([]);
  const [journeyMessages, setJourneyMessages] = useState<JourneyItem[]>([]);
  const [altarEvents, setAltarEvents] = useState<JourneyAltarItem[]>([]);
  const [seenMap, setSeenMap] = useState<Partial<Record<JourneyNotificationSection, number>>>({});
  const membershipTier = getEffectiveMembershipTier(user);
  const hasPremiumAccess = isPremiumTier(membershipTier);
  const templeAccessName = getTempleMembershipName(lang);
  const matchTriggerCopy = getPremiumTriggerCopy(lang, "match_unlock");
  const journeyProgramTriggerCopy = getPremiumTriggerCopy(lang, "journey_program");
  const memoryTriggerCopy = getPremiumTriggerCopy(lang, "journey_memory");
  const templeJourneys = useMemo(() => getTempleJourneys(lang), [lang]);

  const isToolUnlocked = (tool: ToolKey) => hasPremiumAccess || freeDoorways.includes(tool);
  const isViewUnlocked = (view: ViewMode) => (view === "oracle" ? hasPremiumAccess : true);
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
      const resolved = await fetchCoupleStateForUser(supabase, user.id);
      const stickyConnected = readEverConnected(user.id);
      const stickyCoupleId = readConnectedCoupleId(user.id);

      if (resolved.connected && resolved.activeCouple?.id) {
        markEverConnected(user.id);
        storeConnectedCoupleId(user.id, resolved.activeCouple.id);
      }

      if (resolved.activeCouple) {
        setCoupleId(resolved.activeCouple.id);
        setHasConnectedPartner(resolved.connected || stickyConnected || stickyCoupleId === resolved.activeCouple.id);
        setPartnerUserId(resolved.partnerId);
        setSeenMap(readJourneySeenMap(user.id, resolved.activeCouple.id));
      } else {
        setCoupleId(stickyCoupleId);
        setHasConnectedPartner(Boolean(stickyConnected || stickyCoupleId));
        setPartnerUserId(null);
        if (stickyCoupleId) {
          setSeenMap(readJourneySeenMap(user.id, stickyCoupleId));
        } else {
          setSeenMap({});
        }
      }
      // Resolve display names for header "MyName & PartnerName"
      const resolveName = (profile: { display_name: string | null } | null, fallbackEmail?: string | null) => {
        const n = profile?.display_name?.trim();
        if (n) return n;
        const prefix = fallbackEmail?.split("@")[0]?.trim();
        return prefix || null;
      };

      const [{ data: myProfile }, { data: partnerProfile }] = await Promise.all([
        supabase.from("profiles").select("display_name").eq("user_id", user.id).maybeSingle(),
        resolved.partnerId
          ? supabase.from("profiles").select("display_name").eq("user_id", resolved.partnerId).maybeSingle()
          : Promise.resolve({ data: null }),
      ]);
      const metaName = typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name.trim() : "";
      setMyDisplayName(resolveName(myProfile, user.email) || metaName || null);
      setPartnerDisplayName(resolveName(partnerProfile));

      setLoading(false);
    };

    load();
  }, [user]);

  useEffect(() => {
    if (isViewKey(viewParam)) {
      setViewMode(viewParam);
    }
    if (isToolKey(toolParam)) {
      activateTool(toolParam);
    }
  }, [toolParam, viewParam, hasPremiumAccess]);

  useEffect(() => {
    if (!coupleId || !user) return;

    const loadActivity = async () => {
      const [weatherRes, messageRes, altarRes] = await Promise.all([
        supabase
          .from("weather_entries")
          .select("id, state, note, created_at, user_id")
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
          .select("id, title, note, item_type, created_at, user_id")
          .eq("couple_id", coupleId)
          .order("created_at", { ascending: false })
          .limit(20),
      ]);

      setWeatherEntries(weatherRes.data ?? []);
      setJourneyMessages(messageRes.data ?? []);
      setAltarEvents(altarRes.data ?? []);
    };

    loadActivity();
  }, [activityTick, coupleId, user]);

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

  const markSectionRead = (section: JourneyNotificationSection, at?: number) => {
    if (!user || !coupleId) return;
    const timestamp = at ?? Date.now();
    markJourneySectionRead(user.id, coupleId, section, timestamp);
    setSeenMap((current) => ({ ...current, [section]: timestamp }));
  };

  const myWeatherEntry = useMemo(
    () => weatherEntries.find((item) => item.user_id === user?.id) ?? null,
    [weatherEntries, user?.id],
  );
  const belovedWeatherEntry = useMemo(
    () =>
      weatherEntries.find((item) =>
        partnerUserId ? item.user_id === partnerUserId : item.user_id !== user?.id,
      ) ?? null,
    [partnerUserId, weatherEntries, user?.id],
  );

  const myWeatherCard: WeatherCardData | null = useMemo(() => {
    if (!myWeatherEntry) return null;
    const weather = getWeatherPresentation(myWeatherEntry.state, lang);
    return {
      key: weather.key,
      label: weather.label,
      emoji: weather.emoji,
      hint: weather.hint,
      createdAt: myWeatherEntry.created_at,
    };
  }, [lang, myWeatherEntry]);

  const belovedWeatherCard: WeatherCardData | null = useMemo(() => {
    if (!belovedWeatherEntry) return null;
    const weather = getWeatherPresentation(belovedWeatherEntry.state, lang);
    return {
      key: weather.key,
      label: weather.label,
      emoji: weather.emoji,
      hint: weather.hint,
      createdAt: belovedWeatherEntry.created_at,
    };
  }, [belovedWeatherEntry, lang]);

  const weatherStateMode = useMemo(() => {
    if (!myWeatherEntry && !belovedWeatherEntry) return "none";
    if (myWeatherEntry && !belovedWeatherEntry) return "mine_only";
    if (!myWeatherEntry && belovedWeatherEntry) return "beloved_only";
    return "both";
  }, [belovedWeatherEntry, myWeatherEntry]);

  const weatherMatch = useMemo(
    () =>
      myWeatherEntry && belovedWeatherEntry
        ? buildWeatherMatchResult(myWeatherEntry.state, belovedWeatherEntry.state, lang)
        : null,
    [belovedWeatherEntry, lang, myWeatherEntry],
  );

  // Home entry should land users directly on a complete Tonight Path surface.
  useEffect(() => {
    if (searchParams.get("openMatch") === "1") {
      setViewMode("journey");
    }
  }, [searchParams]);

  const matchTimestamp = useMemo(() => {
    if (!myWeatherEntry || !belovedWeatherEntry) return 0;
    return Math.max(toTimestamp(myWeatherEntry.created_at), toTimestamp(belovedWeatherEntry.created_at));
  }, [belovedWeatherEntry, myWeatherEntry]);

  const seenSharedWeather = seenMap.shared_weather ?? 0;
  const seenCombinedMatch = seenMap.combined_match ?? 0;
  const seenNewBeloved = seenMap.new_from_beloved ?? 0;
  const seenTempleBoard = seenMap.temple_board ?? 0;
  const seenTimeline = seenMap.timeline ?? 0;

  const partnerWeatherTimestamps = useMemo(
    () =>
      weatherEntries
        .filter((item) => (partnerUserId ? item.user_id === partnerUserId : item.user_id !== user?.id))
        .map((item) => toTimestamp(item.created_at)),
    [partnerUserId, user?.id, weatherEntries],
  );
  const sharedWeatherUnreadCount = unreadCountSince(partnerWeatherTimestamps, seenSharedWeather);
  const combinedMatchUnreadCount = weatherMatch && matchTimestamp > seenCombinedMatch ? 1 : 0;

  const curatedMessages = useMemo<CuratedJourneyMessage[]>(() => {
    const deduped: CuratedJourneyMessage[] = [];
    const seen = new Map<string, number>();

    for (const item of journeyMessages) {
      const sanitizedContent = normalizeLegacyJourneyCopy(item.content);
      const key = `${item.sender_id}:${item.message_type ?? "message"}:${sanitizedContent.toLowerCase()}`;
      const currentTs = toTimestamp(item.created_at);
      const previousTs = seen.get(key);
      if (previousTs && Math.abs(previousTs - currentTs) < 1000 * 60 * 45) continue;
      seen.set(key, currentTs);
      deduped.push({ ...item, sanitizedContent });
    }

    return deduped.slice(0, 36);
  }, [journeyMessages]);

  const partnerMessages = useMemo(
    () =>
      curatedMessages.filter((item) =>
        partnerUserId ? item.sender_id === partnerUserId : item.sender_id !== user?.id,
      ),
    [curatedMessages, partnerUserId, user?.id],
  );
  const partnerMessageTimestamps = useMemo(
    () => partnerMessages.map((item) => toTimestamp(item.created_at)),
    [partnerMessages],
  );
  const partnerOfferings = useMemo(
    () =>
      altarEvents.filter((item) =>
        partnerUserId ? item.user_id === partnerUserId : item.user_id !== user?.id,
      ),
    [altarEvents, partnerUserId, user?.id],
  );
  const partnerOfferingTimestamps = useMemo(
    () => partnerOfferings.map((item) => toTimestamp(item.created_at)),
    [partnerOfferings],
  );
  const belovedEventTimestamps = useMemo(
    () => [...partnerWeatherTimestamps, ...partnerMessageTimestamps, ...partnerOfferingTimestamps],
    [partnerMessageTimestamps, partnerOfferingTimestamps, partnerWeatherTimestamps],
  );
  const newBelovedUnreadCount = unreadCountSince(belovedEventTimestamps, seenNewBeloved);
  const templeBoardUnreadCount = unreadCountSince(partnerMessageTimestamps, seenTempleBoard);

  const boardItems: SacredBoardItem[] = useMemo(
    () =>
      curatedMessages.map((item) => ({
        id: item.id,
        type: item.message_type ?? "note",
        authorLabel: item.sender_id === user?.id ? l("You", "Vous", "Ty") : l("Beloved", "Partenaire", "Milovaný protějšek"),
        body: item.sanitizedContent,
        createdAt: item.created_at,
        mine: item.sender_id === user?.id,
        unread: item.sender_id !== user?.id && toTimestamp(item.created_at) > seenTempleBoard,
      })),
    [curatedMessages, l, seenTempleBoard, user?.id],
  );

  const latestBelovedWeatherSignal = useMemo(() => {
    if (!belovedWeatherEntry) return null;
    const weather = getWeatherPresentation(belovedWeatherEntry.state, lang);
    return {
      id: belovedWeatherEntry.id,
      createdAt: belovedWeatherEntry.created_at,
      preview:
        l("Beloved shared ", "Partenaire a partagé ", "Partner sdílel ") + `${weather.label} ${weather.emoji}`,
    };
  }, [belovedWeatherEntry, lang, l]);

  const latestBelovedMessageSignal = useMemo(() => {
    if (!partnerMessages.length) return null;
    const latest = partnerMessages[0];
    return {
      id: latest.id,
      createdAt: latest.created_at,
      preview: latest.sanitizedContent,
    };
  }, [partnerMessages]);

  const latestBelovedOfferingSignal = useMemo(() => {
    const offering = partnerOfferings[0];
    if (!offering) return null;
    return {
      id: offering.id,
      createdAt: offering.created_at,
      preview:
        l("Beloved shared an offering: ", "Partenaire a partagé une offrande : ", "Partner sdílel nabídku: ") +
        offering.title,
    };
  }, [l, partnerOfferings]);

  const latestFromBeloved = useMemo(() => {
    const candidates = [latestBelovedWeatherSignal, latestBelovedMessageSignal, latestBelovedOfferingSignal].filter(Boolean) as Array<{
      id: string;
      createdAt: string;
      preview: string;
    }>;
    if (!candidates.length) return null;
    return candidates.sort((a, b) => toTimestamp(b.createdAt) - toTimestamp(a.createdAt))[0];
  }, [latestBelovedMessageSignal, latestBelovedOfferingSignal, latestBelovedWeatherSignal]);

  const templeBoardSummary = useMemo(() => {
    if (latestFromBeloved) {
      return {
        title: l("Latest sacred signal", "Dernier signal sacré", "Poslední posvátný signál"),
        body: latestFromBeloved.preview,
      };
    }
    if (weatherMatch) {
      return {
        title: l("Current archetype", "Archétype actuel", "Aktuální archetyp"),
        body: `${weatherMatch.archetype.title}. ${weatherMatch.summary}`,
      };
    }
    return {
      title: l("Temple board intent", "Intention du tableau", "Záměr chrámové nástěnky"),
      body: l(
        "Use this space for meaningful notes, ritual invitations, and gentle offerings.",
        "Utilisez cet espace pour des notes importantes, des invitations rituelles et des offrandes douces.",
        "Používejte tento prostor pro smysluplné vzkazy, rituální pozvání a jemná sdílení.",
      ),
    };
  }, [l, latestFromBeloved, weatherMatch]);
  const latestBoardItem = boardItems[0] ?? null;
  const sharedStatusLabel = weatherStateMode === "both"
    ? l("Both shared", "Les deux ont partagé", "Oba sdíleli")
    : weatherStateMode === "mine_only"
    ? l("Waiting for beloved", "En attente du partenaire", "Čeká se na partnera")
    : weatherStateMode === "beloved_only"
    ? l("Your turn", "À votre tour", "Teď jsi na řadě")
    : l("Not shared yet", "Pas encore partagé", "Zatím nesdíleno");

  const timelineItems: JourneyTimelineItem[] = useMemo(() => {
    const typeLabels: Record<JourneyTimelineItem["type"], string> = {
      weather: l("Weather", "Météo", "Počasí"),
      ritual: l("Ritual", "Rituel", "Rituál"),
      message: l("Message", "Message", "Zpráva"),
      offering: l("Offering", "Offrande", "Sdílení"),
      oracle: l("Oracle", "Oracle", "Oracle"),
      invitation: l("Invitation", "Invitation", "Pozvání"),
      note: l("Note", "Note", "Vzkaz"),
      intention: l("Intention", "Intention", "Záměr"),
      nudge: l("Nudge", "Nudge", "Postrčení"),
      acknowledgement: l("Response", "Réponse", "Reakce"),
    };

    const getAction = (type: JourneyTimelineItem["type"]) => {
      if (type === "weather") {
        return {
          actionLabel: l("Open weather", "Ouvrir météo", "Otevřít počasí"),
          onAction: () => activateTool("weather"),
        };
      }
      if (type === "invitation" || type === "ritual") {
        return {
          actionLabel: l("Open rituals", "Ouvrir rituels", "Otevřít rituály"),
          onAction: () => activateTool("rituals"),
        };
      }
      if (type === "oracle") {
        return {
          actionLabel: l("Open Oracle", "Ouvrir Oracle", "Otevřít Oracle"),
          onAction: () => setViewMode("oracle"),
        };
      }
      if (type === "message" || type === "note" || type === "nudge" || type === "acknowledgement") {
        return {
          actionLabel: l("Open messages", "Ouvrir messages", "Otevřít zprávy"),
          onAction: () => activateTool("messages"),
        };
      }
      if (type === "offering" || type === "intention") {
        return {
          actionLabel: l("Open temple board", "Ouvrir le tableau", "Otevřít chrámovou nástěnku"),
          onAction: () => markSectionRead("temple_board"),
        };
      }
      return {};
    };

    const messageToTimelineType = (messageType?: string | null): JourneyTimelineItem["type"] => {
      if (!messageType) return "message";
      if (messageType === "invitation") return "invitation";
      if (messageType === "ritual_share" || messageType === "pathway_share") return "ritual";
      if (messageType === "weather_share") return "weather";
      if (messageType === "nudge") return "nudge";
      if (messageType === "intention") return "intention";
      if (messageType === "offering" || messageType.endsWith("_share")) return "offering";
      if (messageType.includes("oracle")) return "oracle";
      if (messageType === "acknowledgement") return "acknowledgement";
      if (messageType === "note") return "note";
      return "message";
    };

    const latestWeatherByUser = new Map<string, JourneyWeatherItem>();
    for (const item of weatherEntries) {
      if (!latestWeatherByUser.has(item.user_id)) {
        latestWeatherByUser.set(item.user_id, item);
      }
    }

    const fromWeather: JourneyTimelineItem[] = Array.from(latestWeatherByUser.values()).map((item) => {
      const weather = getWeatherPresentation(item.state, lang);
      const mine = item.user_id === user?.id;
      const action = getAction("weather");
      return {
        id: `weather-${item.id}`,
        type: "weather",
        typeLabel: typeLabels.weather,
        authorLabel: mine ? l("You", "Vous", "Ty") : l("Beloved", "Partenaire", "Milovaný protějšek"),
        preview: mine
          ? l("You shared ", "Vous avez partagé ", "Sdílel(a) jsi ") + `${weather.label} ${weather.emoji}`
          : l("Beloved shared ", "Partenaire a partagé ", "Partner sdílel ") + `${weather.label} ${weather.emoji}`,
        createdAt: item.created_at,
        unread: !mine && toTimestamp(item.created_at) > seenTimeline,
        ...action,
      };
    });

    const fromMessages: JourneyTimelineItem[] = curatedMessages.map((item) => {
      const mine = item.sender_id === user?.id;
      const mappedType = messageToTimelineType(item.message_type);
      const action = getAction(mappedType);
      return {
        id: `message-${item.id}`,
        type: mappedType,
        typeLabel: typeLabels[mappedType],
        authorLabel: mine ? l("You", "Vous", "Ty") : l("Beloved", "Partenaire", "Milovaný protějšek"),
        preview: item.sanitizedContent,
        createdAt: item.created_at,
        unread: !mine && toTimestamp(item.created_at) > seenTimeline,
        ...action,
      };
    });

    const fromAltar: JourneyTimelineItem[] = altarEvents.map((item) => {
      const mine = item.user_id === user?.id;
      const action = getAction("offering");
      return {
        id: `offering-${item.id}`,
        type: "offering",
        typeLabel: typeLabels.offering,
        authorLabel: mine ? l("You", "Vous", "Ty") : l("Beloved", "Partenaire", "Milovaný protějšek"),
        preview: mine
          ? l("You shared an offering: ", "Vous avez partagé une offrande : ", "Sdílel(a) jsi nabídku: ") + item.title
          : l("Beloved shared an offering: ", "Partenaire a partagé une offrande : ", "Partner sdílel nabídku: ") +
            item.title,
        createdAt: item.created_at,
        unread: !mine && toTimestamp(item.created_at) > seenTimeline,
        ...action,
      };
    });

    const matchEvent: JourneyTimelineItem[] =
      weatherMatch && matchTimestamp
        ? [
            {
              id: `match-${weatherMatch.matchKey}-${Math.floor(matchTimestamp / 60000)}`,
              type: "ritual",
              typeLabel: l("Match unlocked", "Match débloqué", "Shoda odemčena"),
              authorLabel: l("Shared field", "Champ partagé", "Sdílené pole"),
              preview: l(
                "Shared weather unlocked: ",
                "Météo partagée débloquée : ",
                "Sdílené počasí odemčeno: ",
              ) + `${weatherMatch.archetype.title}. ${weatherMatch.summary}`,
              createdAt: new Date(matchTimestamp).toISOString(),
              unread: matchTimestamp > seenTimeline,
              actionLabel: l("Enter ritual", "Entrer dans le rituel", "Vstoupit do rituálu"),
              onAction: () => activateTool("rituals"),
            },
          ]
        : [];

    const combined = [...matchEvent, ...fromMessages, ...fromAltar, ...fromWeather].sort(
      (a, b) => toTimestamp(b.createdAt) - toTimestamp(a.createdAt),
    );

    const unique: JourneyTimelineItem[] = [];
    const seen = new Set<string>();
    for (const item of combined) {
      const signature = `${item.type}:${item.authorLabel}:${item.preview.toLowerCase()}`;
      if (seen.has(signature)) continue;
      seen.add(signature);
      unique.push(item);
    }
    return unique.slice(0, 40);
  }, [
    altarEvents,
    curatedMessages,
    lang,
    l,
    matchTimestamp,
    seenTimeline,
    user?.id,
    weatherEntries,
    weatherMatch,
  ]);

  const timelineDrawerLimit = hasPremiumAccess ? 40 : 12;
  const timelineDrawerItems = useMemo(
    () => timelineItems.slice(0, timelineDrawerLimit),
    [timelineItems, timelineDrawerLimit],
  );
  const timelinePreviewItems = useMemo(
    () => timelineDrawerItems.slice(0, 3),
    [timelineDrawerItems],
  );
  const hiddenTimelineCount = Math.max(0, timelineItems.length - timelineDrawerItems.length);

  const timelineUnreadCount = useMemo(
    () => unreadCountSince(belovedEventTimestamps, seenTimeline),
    [belovedEventTimestamps, seenTimeline],
  );
  const latestPartnerWeatherTimestamp = partnerWeatherTimestamps.length ? Math.max(...partnerWeatherTimestamps) : 0;
  const latestPartnerMessageTimestamp = partnerMessageTimestamps.length ? Math.max(...partnerMessageTimestamps) : 0;
  const latestBelovedTimestamp = belovedEventTimestamps.length ? Math.max(...belovedEventTimestamps) : 0;
  const sharedMatchesThisWeek = useMemo(() => {
    const threshold = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const myCount = weatherEntries.filter((item) => item.user_id === user?.id && toTimestamp(item.created_at) >= threshold).length;
    const belovedCount = weatherEntries.filter((item) =>
      (partnerUserId ? item.user_id === partnerUserId : item.user_id !== user?.id) && toTimestamp(item.created_at) >= threshold
    ).length;
    return Math.min(myCount, belovedCount);
  }, [partnerUserId, user?.id, weatherEntries]);
  const shouldShowDepthUpgrade = Boolean(!hasPremiumAccess && weatherMatch && sharedMatchesThisWeek >= 3);

  const sendSacredMessage = async (type: SacredComposerType | "acknowledgement", body: string) => {
    if (!coupleId || !user || !body.trim()) return;
    await supabase.from("partner_messages").insert({
      couple_id: coupleId,
      sender_id: user.id,
      message_type: type,
      content: body.trim(),
    });
    setActivityTick((value) => value + 1);
  };

  const quickComposeTemplates: Record<SacredComposerType, string> = {
    note: l("I shared this from my heart for us tonight.", "Je partage ceci depuis mon cœur pour nous ce soir.", "Sdílím to ze srdce pro nás na dnešní večer."),
    invitation: l("Would you like to open our ritual after dinner?", "Souhaites-tu ouvrir notre rituel après le dîner ?", "Chceš po večeři otevřít náš rituál?"),
    ritual_share: l("I sent you a ritual invitation for us.", "Je t'ai envoyé une invitation rituelle pour nous.", "Poslal(a) jsem ti rituální pozvání pro nás."),
    offering: l("I shared a temple offering for our journey.", "J'ai partagé une offrande du temple pour notre parcours.", "Sdílel(a) jsem chrámovou nabídku pro naši cestu."),
    nudge: l("When you're ready, share your weather so our ritual appears.", "Quand tu es prêt(e), partage ta météo pour faire apparaître notre rituel.", "Až budeš připraven(a), sdílej počasí, ať se objeví náš rituál."),
    intention: l("Tonight my intention is softness and presence with you.", "Ce soir, mon intention est douceur et présence avec toi.", "Můj dnešní záměr je jemnost a přítomnost s tebou."),
  };

  const handleQuickCompose = async (type: SacredComposerType) => {
    await sendSacredMessage(type, quickComposeTemplates[type]);
  };

  const openWeatherSection = () => {
    markSectionRead("shared_weather", latestPartnerWeatherTimestamp || Date.now());
  };

  const openMatchSection = () => {
    markSectionRead("combined_match", matchTimestamp || Date.now());
  };

  const openBelovedSection = () => {
    markSectionRead("new_from_beloved", latestBelovedTimestamp || Date.now());
  };

  const openTempleBoardSection = () => {
    markSectionRead("temple_board", latestPartnerMessageTimestamp || Date.now());
  };

  const openTimelineSection = () => {
    markSectionRead("timeline", latestBelovedTimestamp || Date.now());
  };

  const navigateTool = (tab: string) => {
    if (!isToolKey(tab)) return;
    activateTool(tab);
  };

  const activeMeta = useMemo(() => tools.find((tool) => tool.key === activeTool) ?? tools[0], [activeTool, tools]);
  const showClosingPremiumBanner = !hasPremiumAccess && viewMode === "doorways" && activeToolUnlocked;
  const showDoorwayCards = !isMobile || !mobileDoorwayDetailMode;
  const showDoorwayContent = !isMobile || mobileDoorwayDetailMode;
  const isJourneyView = viewMode === "journey";

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

      <div className="rounded-[24px] border border-border/30 bg-card/45 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
          {l("Light Oracle (free)", "Oracle léger (gratuit)", "Lehký Oracle (zdarma)")}
        </p>
        <p className="mt-2 text-sm leading-6 text-foreground/90">
          {weatherMatch
            ? `${weatherMatch.archetype.title}: ${weatherMatch.summary}`
            : l(
                "Share both weather states to receive a contextual oracle line.",
                "Partagez les deux météos pour recevoir une ligne oracle contextuelle.",
                "Sdílejte obě počasí, abyste získali kontextovou Oracle větu.",
              )}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => activateTool("weather")}
            className="rounded-xl border border-border/35 bg-background/45 px-3 py-2 text-xs text-foreground transition-all hover:border-border/55 hover:bg-background/60"
          >
            {l("Refresh shared weather", "Actualiser la météo partagée", "Obnovit sdílené počasí")}
          </button>
          <Link
            to="/pricing?entry=oracle-depth"
            className="rounded-xl border border-amber-300/35 bg-amber-500/12 px-3 py-2 text-xs text-foreground transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
          >
            {l("Unlock full oracle sequencing", "Débloquer le séquençage oracle complet", "Odemknout plné Oracle sekvenování")}
          </Link>
        </div>
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
    <div className="relative min-h-screen bg-background px-4 py-6 text-foreground md:px-6">
      {/* Shiva/Shakti background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <img
          src={shivaShaktiIcon}
          alt=""
          className="h-full w-full object-contain object-center opacity-[0.18] md:opacity-[0.26]"
          style={{ transform: "scale(1.08)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/65 to-background/88" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-transparent to-background/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl space-y-6">
        {!hasConnectedPartner && !coupleId && (
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

        <section className={`relative overflow-hidden rounded-[30px] border border-primary/18 bg-gradient-to-br from-primary/14 via-background/92 to-background/88 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] backdrop-blur-sm ${isJourneyView ? "p-4 md:p-5" : "p-6 md:p-7"}`}>
          <div className="absolute top-4 right-4 opacity-10 hover:opacity-20 transition-opacity">
            <img src={shivaShaktiIcon} alt="" className="h-12 w-12 rounded-[10px]" />
          </div>
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">{l("Sacred Temple", "Temple sacré", "Posvátný chrám")}</p>
            {(myDisplayName || partnerDisplayName) && (
              <p className="mt-2 font-display text-base text-foreground/90 md:text-lg">
                {myDisplayName ?? l("You", "Vous", "Ty")}
                <span className="text-amber-400/70"> &amp; </span>
                {partnerDisplayName ?? l("your beloved", "votre bien-aimé(e)", "tvůj milovaný protějšek")}
              </p>
            )}
            <h1 className={`mt-3 font-display text-foreground ${isJourneyView ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"}`}>
              {isJourneyView
                ? l("Our Journey Dashboard", "Tableau Notre parcours", "Panel Naše cesta")
                : l("A private sanctuary for modern lovers", "Un sanctuaire privé pour les amoureux modernes", "Soukromá svatyně pro moderní milence")}
            </h1>
            <p className={`mt-3 max-w-2xl text-sm text-muted-foreground ${isJourneyView ? "leading-6" : "leading-7 md:text-base"}`}>
              {isJourneyView
                ? l(
                    "See your shared state, act on the next ritual step, and keep your couple rhythm alive.",
                    "Voyez votre état partagé, agissez sur le prochain rituel, et gardez votre rythme de couple vivant.",
                    "Uvidíte sdílený stav, uděláte další rituální krok a udržíte párový rytmus živý.",
                  )
                : l(
                    "Ancient wisdom meets living intimacy: read your inner weather, open sensual ritual, repair gently, and weave a shared rhythm that deepens over time.",
                    "La sagesse ancienne rencontre l'intimité vivante: lisez votre météo intérieure, ouvrez un rituel sensuel, réparez en douceur, et tissez un rythme partagé qui se renforce avec le temps.",
                    "Starodávná moudrost se setkává s živou intimitou: čtěte vnitřní počasí, otevřete smyslný rituál, jemně opravujte a tkejte společný rytmus, který se časem prohlubuje.",
                  )}
            </p>
          </div>

          {isJourneyView ? (
            <div className="mt-5 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[22px] border border-rose-300/30 bg-gradient-to-br from-rose-500/10 via-card/60 to-card/35 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-rose-200/85">{l("Tonight intention", "Intention de ce soir", "Dnešní záměr")}</p>
                <h3 className="mt-2 font-display text-2xl text-foreground">
                  {l("Move slowly and stay emotionally attuned", "Avancez lentement et restez émotionnellement accordés", "Jděte pomalu a zůstaňte emočně naladění")}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {l(
                    "This page gives you a complete shared path for tonight: practical steps, theme-based practices, and guidance to respect each other's feelings while getting closer.",
                    "Cette page vous donne un chemin partagé complet pour ce soir : étapes pratiques, pratiques par thème, et guidance pour respecter les ressentis de chacun tout en vous rapprochant.",
                    "Tato stránka vám dává kompletní sdílenou cestu na dnešní večer: praktické kroky, tematické praxe a vedení, jak respektovat pocity toho druhého a přitom se přiblížit.",
                  )}
                </p>
              </div>
              <div className="rounded-[22px] border border-amber-300/30 bg-gradient-to-br from-amber-500/12 via-card/60 to-card/35 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200/90">{l("Sacred vow", "Vœu sacré", "Posvátný slib")}</p>
                <p className="mt-2 font-display text-xl leading-8 text-foreground">
                  {l(
                    "Tonight we choose safety first, truth second, and desire that grows from both.",
                    "Ce soir, nous choisissons d'abord la sécurité, ensuite la vérité, et un désir qui grandit pour les deux.",
                    "Dnes večer volíme nejdřív bezpečí, potom pravdu a touhu, která roste pro oba.",
                  )}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-border/30 bg-background/45 px-2.5 py-1 text-[11px] text-foreground/90">
                    {l("Shared pulse active", "Pulse partagé actif", "Sdílený puls aktivní")}
                  </span>
                  <span className="rounded-full border border-border/30 bg-background/45 px-2.5 py-1 text-[11px] text-foreground/90">
                    {l("Romantic focus", "Focus romantique", "Romantické zaměření")}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="w-full rounded-[24px] border border-border/25 bg-card/55 p-4 backdrop-blur-sm">
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
                        <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-2.5 ${view.iconClass}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="mt-3 font-display text-xl text-foreground">{view.title}</div>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{view.subtitle}</p>
                        {locked ? (
                          <p className="mt-2 text-xs leading-5 text-amber-100/85">
                            {l("Premium page", "Page premium", "Premium stránka")}
                          </p>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => setViewMode(view.key)}
                          className="mt-3 rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
                        >
                          {l("Open page", "Ouvrir la page", "Otevřít stránku")}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>

        {viewMode === "doorways" && (
          <>
            {showDoorwayCards ? (
            <section>
              <div className="mb-4">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{l("Sacred Doorways", "Portes sacrées", "Posvátné brány")}</p>
                <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">{l("Choose the doorway your love needs tonight", "Choisissez la porte dont votre amour a besoin ce soir", "Vyberte bránu, kterou vaše láska dnes večer potřebuje")}</h2>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  const active = activeTool === tool.key;
                  const locked = !isToolUnlocked(tool.key);
                  return (
                    <div
                      key={tool.key}
                      className={`relative overflow-hidden rounded-[26px] border p-4 text-left backdrop-blur-sm transition-all ${
                        active
                          ? "border-primary/30 bg-primary/12 shadow-[0_18px_50px_-36px_rgba(255,173,70,0.42)]"
                          : "border-border/25 bg-card/55 hover:border-primary/20 hover:bg-card/65"
                      } ${locked ? "border-amber-300/25 bg-amber-500/8" : ""}`}
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
                        <h3 className="mt-3 font-display text-base text-foreground">{tool.title}</h3>
                        <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{tool.subtitle}</p>
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
                      <div className="relative mt-4 flex flex-wrap items-center gap-3">
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
                              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
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

        {viewMode === "journey" && (
          <section className="space-y-5">
            <TonightPathExperience
              lang={lang}
              weatherMatch={weatherMatch}
              weatherStateMode={weatherStateMode}
              myWeather={myWeatherCard}
              belovedWeather={belovedWeatherCard}
              sharedStatusLabel={sharedStatusLabel}
            />
          </section>
        )}

        {viewMode === "oracle" &&
          (isViewUnlocked("oracle") ? (
            <section>
              <WisdomOracle coupleId={coupleId ?? undefined} onNavigate={navigateTool} />
            </section>
          ) : (
            oraclePreview
          ))}

      </div>
    </div>
  );
};

export default PartnerSpace;
