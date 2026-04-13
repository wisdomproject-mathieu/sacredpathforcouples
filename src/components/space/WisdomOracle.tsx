import { useEffect, useMemo, useState } from "react";
import { Brain, Compass, Flame, Heart, MessageCircle, Route, Shield, Sparkles, Stars } from "lucide-react";

import DoorwayShell from "@/components/space/DoorwayShell";
import ShareCardButton from "@/components/space/ShareCardButton";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

interface Props {
  coupleId?: string;
  onNavigate: (tab: string) => void;
}

type WeatherEntry = Tables<"weather_entries">;
type PartnerMessage = Tables<"partner_messages">;
type AltarItem = Tables<"altar_items">;
type PathwayProgress = Tables<"pathway_progress">;
type Pathway = Tables<"pathways">;
type Ritual = Tables<"ritual_items">;

type OracleTone = "romantic" | "erotic" | "playful" | "healing" | "devotional";
type HeatLevel = "soft" | "balanced" | "intense";
type OracleFocus = "bonding" | "attraction" | "repair" | "growth";

type OracleMove = {
  id: string;
  title: string;
  why: string;
  cta: string;
  target: string;
  iconClass: string;
};

type OracleStep = {
  id: string;
  title: string;
  detail: string;
  target: string;
  iconClass: string;
};

const tonePresets: {
  key: OracleTone;
  title: string;
  subtitle: string;
  iconClass: string;
  categories: string[];
  openingTarget: string;
}[] = [
  {
    key: "romantic",
    title: "Romantic",
    subtitle: "Tender atmosphere, devotion, and emotional closeness.",
    iconClass: "text-rose-300",
    categories: ["presence", "touch", "reconnect"],
    openingTarget: "messages",
  },
  {
    key: "erotic",
    title: "Erotic",
    subtitle: "Magnetic charge, erotic pacing, and embodied polarity.",
    iconClass: "text-orange-300",
    categories: ["polarity", "touch", "playful"],
    openingTarget: "positions",
  },
  {
    key: "playful",
    title: "Playful",
    subtitle: "Lightness, teasing, novelty, and spontaneous delight.",
    iconClass: "text-fuchsia-300",
    categories: ["playful", "presence", "reconnect"],
    openingTarget: "rituals",
  },
  {
    key: "healing",
    title: "Healing",
    subtitle: "Regulation-first repair and nervous-system safety.",
    iconClass: "text-sky-300",
    categories: ["breath", "reconnect", "bedtime"],
    openingTarget: "repair",
  },
  {
    key: "devotional",
    title: "Devotional",
    subtitle: "Sacred intention, gratitude, and ceremony over speed.",
    iconClass: "text-amber-300",
    categories: ["presence", "reconnect", "touch"],
    openingTarget: "guide",
  },
];

const heatOptions: { key: HeatLevel; label: string; note: string }[] = [
  { key: "soft", label: "Soft", note: "Slow pace and emotional safety first" },
  { key: "balanced", label: "Balanced", note: "Warm connection with some charge" },
  { key: "intense", label: "Intense", note: "High-energy intimacy with structure" },
];

const focusOptions: { key: OracleFocus; label: string; note: string }[] = [
  { key: "bonding", label: "Bonding", note: "Deepen emotional closeness tonight" },
  { key: "attraction", label: "Attraction", note: "Awaken playful and erotic momentum" },
  { key: "repair", label: "Repair", note: "Soothe tension and reconnect" },
  { key: "growth", label: "Growth", note: "Invest in a long-term sacred path" },
];

const dayKey = (iso?: string | null) => (iso ? new Date(iso).toISOString().slice(0, 10) : null);

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

const daysAgo = (iso?: string | null) => {
  if (!iso) return null;
  const now = new Date();
  const then = new Date(iso);
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
};

const WisdomOracle = ({ coupleId, onNavigate }: Props) => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const l = (en: string, fr: string, cs: string) => (lang === "fr" ? fr : lang === "cs" ? cs : en);
  const toneTitle = (toneKey: OracleTone) => {
    switch (toneKey) {
      case "romantic":
        return l("Romantic", "Romantique", "Romantický");
      case "erotic":
        return l("Erotic", "Érotique", "Erotický");
      case "playful":
        return l("Playful", "Joueur", "Hravý");
      case "healing":
        return l("Healing", "Guérison", "Léčení");
      case "devotional":
        return l("Devotional", "Dévotionnel", "Oddaný");
      default:
        return toneKey;
    }
  };
  const toneSubtitle = (toneKey: OracleTone) => {
    switch (toneKey) {
      case "romantic":
        return l("Tender atmosphere, devotion, and emotional closeness.", "Atmosphère tendre, dévotion et proximité émotionnelle.", "Jemná atmosféra, oddanost a emoční blízkost.");
      case "erotic":
        return l("Magnetic charge, erotic pacing, and embodied polarity.", "Charge magnétique, rythme érotique et polarité incarnée.", "Magnetický náboj, erotické tempo a vtělená polarita.");
      case "playful":
        return l("Lightness, teasing, novelty, and spontaneous delight.", "Légèreté, séduction, nouveauté et joie spontanée.", "Lehkost, škádlení, novost a spontánní radost.");
      case "healing":
        return l("Regulation-first repair and nervous-system safety.", "Réparation axée régulation et sécurité du système nerveux.", "Oprava vedená regulací a bezpečím nervového systému.");
      case "devotional":
        return l("Sacred intention, gratitude, and ceremony over speed.", "Intention sacrée, gratitude et cérémonie plutôt que vitesse.", "Posvátný záměr, vděčnost a ceremonie místo spěchu.");
      default:
        return "";
    }
  };
  const heatLabel = (heatKey: HeatLevel) => {
    switch (heatKey) {
      case "soft":
        return l("Soft", "Doux", "Jemné");
      case "balanced":
        return l("Balanced", "Équilibré", "Vyvážené");
      case "intense":
        return l("Intense", "Intense", "Intenzivní");
      default:
        return heatKey;
    }
  };
  const heatNote = (heatKey: HeatLevel) => {
    switch (heatKey) {
      case "soft":
        return l("Slow pace and emotional safety first", "Rythme lent et sécurité émotionnelle d'abord", "Pomalé tempo a emoční bezpečí na prvním místě");
      case "balanced":
        return l("Warm connection with some charge", "Connexion chaleureuse avec un peu de charge", "Hřejivé spojení s dávkou náboje");
      case "intense":
        return l("High-energy intimacy with structure", "Intimité haute énergie avec structure", "Vysoká energie intimity se strukturou");
      default:
        return "";
    }
  };
  const focusLabel = (focusKey: OracleFocus) => {
    switch (focusKey) {
      case "bonding":
        return l("Bonding", "Lien", "Propojení");
      case "attraction":
        return l("Attraction", "Attraction", "Přitažlivost");
      case "repair":
        return l("Repair", "Réparation", "Oprava");
      case "growth":
        return l("Growth", "Croissance", "Růst");
      default:
        return focusKey;
    }
  };
  const focusNote = (focusKey: OracleFocus) => {
    switch (focusKey) {
      case "bonding":
        return l("Deepen emotional closeness tonight", "Approfondir la proximité émotionnelle ce soir", "Dnes večer prohloubit emoční blízkost");
      case "attraction":
        return l("Awaken playful and erotic momentum", "Éveiller l'élan joueur et érotique", "Probudit hravé a erotické momentum");
      case "repair":
        return l("Soothe tension and reconnect", "Apaiser la tension et se reconnecter", "Zklidnit napětí a znovu se propojit");
      case "growth":
        return l("Invest in a long-term sacred path", "Investir dans un chemin sacré à long terme", "Investovat do dlouhodobé posvátné cesty");
      default:
        return "";
    }
  };

  const [weatherEntries, setWeatherEntries] = useState<WeatherEntry[]>([]);
  const [messages, setMessages] = useState<PartnerMessage[]>([]);
  const [altarItems, setAltarItems] = useState<AltarItem[]>([]);
  const [progressRows, setProgressRows] = useState<PathwayProgress[]>([]);
  const [pathways, setPathways] = useState<Pathway[]>([]);
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTick, setRefreshTick] = useState(0);

  const [tone, setTone] = useState<OracleTone>("romantic");
  const [heat, setHeat] = useState<HeatLevel>("balanced");
  const [focus, setFocus] = useState<OracleFocus>("bonding");

  const prefsKey = useMemo(() => {
    const couplePart = coupleId || "solo";
    const userPart = user?.id || "anon";
    return `sacredpath_oracle_prefs_${couplePart}_${userPart}`;
  }, [coupleId, user?.id]);

  useEffect(() => {
    const raw = localStorage.getItem(prefsKey);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as {
        tone?: OracleTone;
        heat?: HeatLevel;
        focus?: OracleFocus;
      };

      if (parsed.tone) setTone(parsed.tone);
      if (parsed.heat) setHeat(parsed.heat);
      if (parsed.focus) setFocus(parsed.focus);
    } catch {
      // ignore corrupted local preferences
    }
  }, [prefsKey]);

  useEffect(() => {
    localStorage.setItem(
      prefsKey,
      JSON.stringify({
        tone,
        heat,
        focus,
      })
    );
  }, [focus, heat, prefsKey, tone]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);

      const [pathwaysRes, ritualsRes] = await Promise.all([
        supabase.from("pathways").select("*").order("premium_required", { ascending: true }),
        supabase
          .from("ritual_items")
          .select("*")
          .eq("item_type", "ritual")
          .order("premium_required", { ascending: true }),
      ]);

      setPathways(pathwaysRes.data ?? []);
      setRituals(ritualsRes.data ?? []);

      if (!coupleId) {
        setWeatherEntries([]);
        setMessages([]);
        setAltarItems([]);
        setProgressRows([]);
        setLoading(false);
        return;
      }

      const [weatherRes, messagesRes, altarRes, progressRes] = await Promise.all([
        supabase
          .from("weather_entries")
          .select("*")
          .eq("couple_id", coupleId)
          .order("created_at", { ascending: false })
          .limit(80),
        supabase
          .from("partner_messages")
          .select("*")
          .eq("couple_id", coupleId)
          .order("created_at", { ascending: false })
          .limit(80),
        supabase
          .from("altar_items")
          .select("*")
          .eq("couple_id", coupleId)
          .order("created_at", { ascending: false })
          .limit(80),
        supabase
          .from("pathway_progress")
          .select("*")
          .eq("couple_id", coupleId)
          .order("last_opened_at", { ascending: false }),
      ]);

      setWeatherEntries(weatherRes.data ?? []);
      setMessages(messagesRes.data ?? []);
      setAltarItems(altarRes.data ?? []);
      setProgressRows(progressRes.data ?? []);
      setLoading(false);
    };

    load();
  }, [coupleId, refreshTick, user]);

  const analytics = useMemo(() => {
    const latestWeather = weatherEntries[0] ?? null;
    const latestMessage = messages[0] ?? null;
    const latestAltar = altarItems[0] ?? null;

    const allDates = [
      ...weatherEntries.map((item) => dayKey(item.created_at)),
      ...messages.map((item) => dayKey(item.created_at)),
      ...altarItems.map((item) => dayKey(item.created_at)),
    ].filter(Boolean) as string[];

    const rhythmDays = new Set(allDates).size;
    const streakCount = computeStreak(allDates);
    const silentDays = daysAgo(latestMessage?.created_at);

    const startedPathwayIds = new Set(progressRows.map((row) => row.pathway_id));
    const activeProgress = progressRows[0] ?? null;
    const activePathway = pathways.find((pathway) => pathway.id === activeProgress?.pathway_id) ?? null;
    const nextPathway =
      pathways.find((pathway) => !pathway.premium_required && !startedPathwayIds.has(pathway.id)) ??
      pathways.find((pathway) => !pathway.premium_required) ??
      pathways[0] ??
      null;

    return {
      latestWeather,
      latestMessage,
      latestAltar,
      rhythmDays,
      streakCount,
      silentDays,
      activeProgress,
      activePathway,
      nextPathway,
    };
  }, [altarItems, messages, pathways, progressRows, weatherEntries]);

  const selectedTone = useMemo(
    () => tonePresets.find((preset) => preset.key === tone) ?? tonePresets[0],
    [tone]
  );

  const tunedRitual = useMemo(() => {
    const focusCategoryMap: Record<OracleFocus, string[]> = {
      bonding: ["presence", "reconnect", "touch"],
      attraction: ["playful", "polarity", "touch"],
      repair: ["breath", "reconnect", "bedtime"],
      growth: ["presence", "reconnect", "polarity"],
    };

    const weatherCategoryMap: Record<string, string[]> = {
      stressed: ["breath", "reconnect"],
      reassurance: ["reconnect", "presence"],
      tired: ["breath", "bedtime"],
      longing: ["touch", "presence"],
      tender: ["touch", "presence"],
      open: ["presence", "reconnect"],
      playful: ["playful", "polarity"],
      erotic: ["polarity", "touch"],
    };

    const desiredCategories = new Set<string>([
      ...selectedTone.categories,
      ...focusCategoryMap[focus],
      ...(analytics.latestWeather ? weatherCategoryMap[analytics.latestWeather.state] ?? [] : []),
    ]);

    return (
      rituals.find((ritual) => !ritual.premium_required && desiredCategories.has(ritual.category)) ??
      rituals.find((ritual) => !ritual.premium_required) ??
      rituals[0] ??
      null
    );
  }, [analytics.latestWeather, focus, rituals, selectedTone.categories]);

  const oraclePlan = useMemo(() => {
    const entryTarget = focus === "repair" ? "repair" : selectedTone.openingTarget;

    const entryStep: OracleStep = {
      id: "entry",
      title: l("1. Arrival signal", "1. Signal d'arrivée", "1. Signál příchodu"),
      detail:
        focus === "repair"
          ? l(
              "Begin with one regulation move so both nervous systems feel safer before deeper content.",
              "Commencez par un geste de régulation pour que les deux systèmes nerveux se sentent en sécurité avant d'aller plus profond.",
              "Začněte jedním regulačním krokem, aby se oba nervové systémy cítily bezpečněji před hlubším obsahem.",
            )
          : l(
              "Open with one short emotional signal so you both enter the same field.",
              "Ouvrez avec un signal émotionnel court pour entrer tous les deux dans le même champ.",
              "Otevřete krátkým emočním signálem, aby oba vstoupili do stejného prostoru.",
            ),
      target: entryTarget,
      iconClass: "text-sky-300",
    };

    const deepenStep: OracleStep = {
      id: "deepen",
      title: l("2. Deepen the moment", "2. Approfondir le moment", "2. Prohloubit moment"),
      detail: tunedRitual
        ? l(
            `Use "${tunedRitual.title}" as your core practice tonight. Keep the pace ${heat}.`,
            `Utilisez "${tunedRitual.title}" comme pratique centrale ce soir. Gardez un rythme ${heatLabel(heat).toLowerCase()}.`,
            `Použijte "${tunedRitual.title}" jako hlavní praktiku dnešního večera. Udržte tempo ${heatLabel(heat).toLowerCase()}.`,
          )
        : l(
            "Choose one guided ritual or position and let the body set the pace.",
            "Choisissez un rituel guidé ou une position, et laissez le corps donner le tempo.",
            "Vyberte jeden vedený rituál nebo pozici a nechte tělo určit tempo.",
          ),
      target: tunedRitual ? "rituals" : "positions",
      iconClass: heat === "intense" ? "text-orange-300" : "text-fuchsia-300",
    };

    const integrateStep: OracleStep = {
      id: "integrate",
      title: l("3. Lock in continuity", "3. Ancrer la continuité", "3. Ukotvit kontinuitu"),
      detail:
        focus === "growth"
          ? l(
              "Close by advancing one pathway day so tonight becomes long-term momentum.",
              "Terminez en avançant un jour de parcours pour transformer ce soir en élan durable.",
              "Uzavřete posunem o jeden den cesty, aby dnešní večer vytvořil dlouhodobé momentum.",
            )
          : l(
              "Close with one message or altar memory so the emotional trace stays alive tomorrow.",
              "Terminez par un message ou une mémoire d'autel pour garder la trace émotionnelle vivante demain.",
              "Zakončete jednou zprávou nebo oltářní vzpomínkou, aby emoční stopa zůstala živá i zítra.",
            ),
      target: focus === "growth" ? "pathways" : "messages",
      iconClass: "text-emerald-300",
    };

    return [entryStep, deepenStep, integrateStep];
  }, [focus, heat, selectedTone.openingTarget, tunedRitual, lang]);

  const oracleMoves = useMemo(() => {
    const moves: OracleMove[] = [];

    moves.push({
      id: "tone-directive",
      title: l(
        `Tonight's Oracle Tone: ${toneTitle(selectedTone.key)}`,
        `Tonalité Oracle de ce soir : ${toneTitle(selectedTone.key)}`,
        `Dnešní Oracle tón: ${toneTitle(selectedTone.key)}`,
      ),
      why: toneSubtitle(selectedTone.key),
      cta: l("Open first doorway", "Ouvrir la première porte", "Otevřít první bránu"),
      target: selectedTone.openingTarget,
      iconClass: selectedTone.iconClass,
    });

    if (!coupleId) {
      moves.push({
        id: "preview-start-weather",
        title: l("Set your first couple baseline", "Définir votre première base de couple", "Nastavit první párovou základnu"),
        why: l(
          "When your beloved connects, two weather check-ins instantly improve Oracle precision.",
          "Quand votre partenaire se connecte, deux check-ins météo améliorent immédiatement la précision de l'Oracle.",
          "Když se partner připojí, dva check-iny počasí okamžitě zlepší přesnost Oracle.",
        ),
        cta: l("Open weather", "Ouvrir météo", "Otevřít počasí"),
        target: "weather",
        iconClass: "text-sky-300",
      });

      if (tunedRitual) {
        moves.push({
          id: "preview-ritual",
          title: l(`Try this first ritual: ${tunedRitual.title}`, `Essayez ce rituel d'abord : ${tunedRitual.title}`, `Nejdřív zkuste tento rituál: ${tunedRitual.title}`),
          why: l(
            "This recommendation is matched to your selected tone and focus.",
            "Cette recommandation est alignée avec votre tonalité et votre focus.",
            "Toto doporučení je sladěno s vybraným tónem a zaměřením.",
          ),
          cta: l("Open rituals", "Ouvrir rituels", "Otevřít rituály"),
          target: "rituals",
          iconClass: "text-fuchsia-300",
        });
      }

      if (analytics.nextPathway) {
        moves.push({
          id: "preview-pathway",
          title: l(`Prepare pathway: ${analytics.nextPathway.title}`, `Préparer le parcours : ${analytics.nextPathway.title}`, `Připravit cestu: ${analytics.nextPathway.title}`),
          why: l(
            "Pre-selecting your pathway avoids startup friction once you are both in.",
            "Pré-sélectionner votre parcours évite les frictions de démarrage quand vous êtes tous les deux connectés.",
            "Předvýběr cesty snižuje startovní tření, jakmile jste oba uvnitř.",
          ),
          cta: l("Open pathways", "Ouvrir parcours", "Otevřít cesty"),
          target: "pathways",
          iconClass: "text-emerald-300",
        });
      }

      return moves.slice(0, 4);
    }

    if (!analytics.latestWeather) {
      moves.push({
        id: "check-weather",
        title: l("Name the emotional climate first", "Nommez d'abord le climat émotionnel", "Nejdřív pojmenujte emoční klima"),
        why: l(
          "Without a fresh weather signal, couples often choose intensity mismatched to reality.",
          "Sans signal météo récent, les couples choisissent souvent une intensité décalée de la réalité.",
          "Bez čerstvého signálu počasí páry často volí intenzitu, která neodpovídá realitě.",
        ),
        cta: l("Open weather", "Ouvrir météo", "Otevřít počasí"),
        target: "weather",
        iconClass: "text-sky-300",
      });
    }

    if (tunedRitual) {
      moves.push({
        id: "tuned-ritual",
        title: l(`Run ritual: ${tunedRitual.title}`, `Lancer le rituel : ${tunedRitual.title}`, `Spustit rituál: ${tunedRitual.title}`),
        why: l(
          `Oracle selected this from your ${toneTitle(selectedTone.key).toLowerCase()} tone, ${focusLabel(focus).toLowerCase()} focus, and recent signals.`,
          `L'Oracle a sélectionné ceci selon votre tonalité ${toneTitle(selectedTone.key).toLowerCase()}, votre focus ${focusLabel(focus).toLowerCase()}, et vos signaux récents.`,
          `Oracle vybral toto podle tónu ${toneTitle(selectedTone.key).toLowerCase()}, zaměření ${focusLabel(focus).toLowerCase()} a posledních signálů.`,
        ),
        cta: l("Open rituals", "Ouvrir rituels", "Otevřít rituály"),
        target: "rituals",
        iconClass: "text-fuchsia-300",
      });
    }

    if (!analytics.latestMessage || (analytics.silentDays !== null && analytics.silentDays >= 2)) {
      moves.push({
        id: "message-bridge",
        title: l("Close the gap with one precise whisper", "Combler l'écart avec un murmure précis", "Uzavřít mezeru jedním přesným vzkazem"),
        why: l(
          "A short shared whisper protects momentum between deeper rituals.",
          "Un murmure court partagé protège l'élan entre des rituels plus profonds.",
          "Krátký sdílený vzkaz chrání momentum mezi hlubšími rituály.",
        ),
        cta: l("Open messages", "Ouvrir messages", "Otevřít zprávy"),
        target: "messages",
        iconClass: "text-violet-300",
      });
    }

    if (analytics.activePathway && analytics.activeProgress) {
      moves.push({
        id: "continue-pathway",
        title: l(`Continue ${analytics.activePathway.title}`, `Continuer ${analytics.activePathway.title}`, `Pokračovat ${analytics.activePathway.title}`),
        why: l(
          `You are on day ${analytics.activeProgress.current_day}. Continuity is your edge right now.`,
          `Vous êtes au jour ${analytics.activeProgress.current_day}. La continuité est votre avantage maintenant.`,
          `Jste ve dni ${analytics.activeProgress.current_day}. Kontinuita je teď vaše výhoda.`,
        ),
        cta: l("Open pathways", "Ouvrir parcours", "Otevřít cesty"),
        target: "pathways",
        iconClass: "text-emerald-300",
      });
    } else if (analytics.nextPathway) {
      moves.push({
        id: "start-pathway",
        title: l(`Start pathway: ${analytics.nextPathway.title}`, `Démarrer le parcours : ${analytics.nextPathway.title}`, `Začít cestu: ${analytics.nextPathway.title}`),
        why: l(
          "Your current data suggests this is the right moment to move from one-off to progression.",
          "Vos données actuelles suggèrent que c'est le bon moment pour passer du ponctuel à la progression.",
          "Aktuální data naznačují, že je správný čas přejít od jednorázových kroků k progresi.",
        ),
        cta: l("Open pathways", "Ouvrir parcours", "Otevřít cesty"),
        target: "pathways",
        iconClass: "text-emerald-300",
      });
    }

    if (moves.length < 4) {
      moves.push({
        id: "oracle-guide",
        title: l("Use Temple Guide for micro-calibration", "Utiliser le Guide du Temple pour une micro-calibration", "Použít chrámového průvodce pro mikro-kalibraci"),
        why: l(
          "Guide helps when multiple options are valid and you want a faster decision.",
          "Le Guide aide quand plusieurs options sont valides et que vous voulez décider plus vite.",
          "Průvodce pomáhá, když je více možností správných a chcete rychlejší rozhodnutí.",
        ),
        cta: l("Open guide", "Ouvrir guide", "Otevřít průvodce"),
        target: "guide",
        iconClass: "text-cyan-300",
      });
    }

    return moves.slice(0, 4);
  }, [analytics, coupleId, focus, selectedTone, tunedRitual, lang]);

  const signals = useMemo(
    () => [
      {
        label: l("Rhythm days", "Jours de rythme", "Dny rytmu"),
        value: coupleId ? String(analytics.rhythmDays) : "—",
        note: l("Days with recorded shared activity", "Jours avec activité partagée enregistrée", "Dny se zaznamenanou sdílenou aktivitou"),
      },
      {
        label: l("Current streak", "Série actuelle", "Aktuální série"),
        value: coupleId ? String(analytics.streakCount) : "—",
        note: l("Consecutive active days", "Jours actifs consécutifs", "Po sobě jdoucí aktivní dny"),
      },
      {
        label: l("Latest climate", "Climat le plus récent", "Nejnovější klima"),
        value: coupleId ? analytics.latestWeather?.state ?? l("No check-in", "Aucun check-in", "Žádný check-in") : l("Temple preview", "Aperçu du temple", "Náhled chrámu"),
        note: l("Most recent intimacy weather", "Dernière météo d'intimité", "Nejnovější počasí intimity"),
      },
      {
        label: l("Message gap", "Intervalle des messages", "Prodleva zpráv"),
        value: coupleId
          ? analytics.silentDays === null
            ? l("No messages", "Aucun message", "Žádné zprávy")
            : l(`${analytics.silentDays} day(s)`, `${analytics.silentDays} jour(s)`, `${analytics.silentDays} den/dní`)
          : l("Temple preview", "Aperçu du temple", "Náhled chrámu"),
        note: l("Days since last partner message", "Jours depuis le dernier message partenaire", "Dny od poslední zprávy partnera"),
      },
    ],
    [analytics.latestWeather?.state, analytics.rhythmDays, analytics.silentDays, analytics.streakCount, coupleId, lang]
  );

  return (
    <DoorwayShell
      label={l("Wisdom Oracle", "Oracle de sagesse", "Oracle moudrosti")}
      title={l("Sacred intelligence for your next loving move", "Intelligence sacrée pour votre prochain geste d'amour", "Posvátná inteligence pro váš další láskyplný krok")}
      description={l(
        "Set the tone you desire tonight, then Oracle composes your next steps from shared signals, memory, and Temple wisdom.",
        "Choisissez la tonalité désirée ce soir, puis l'Oracle compose vos prochaines étapes à partir des signaux partagés, de la mémoire et de la sagesse du Temple.",
        "Nastavte tón dnešního večera a Oracle složí další kroky ze sdílených signálů, paměti a moudrosti chrámu.",
      )}
      actionLabel={l("Receive fresh guidance", "Recevoir une guidance fraîche", "Získat nové vedení")}
      onAction={() => setRefreshTick((value) => value + 1)}
      actionDisabled={loading}
    >
      <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
        <div className="flex items-center gap-2 text-primary/80">
          <Stars className="h-4 w-4" />
          <p className="text-xs uppercase tracking-[0.22em]">{l("Oracle configuration", "Configuration Oracle", "Nastavení Oracle")}</p>
        </div>
        <h3 className="mt-2 font-display text-3xl text-foreground">{l("Co-create tonight's intention", "Co-créez l'intention de ce soir", "Společně vytvořte záměr dnešního večera")}</h3>

        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {tonePresets.map((preset) => {
            const active = tone === preset.key;
            return (
              <button
                key={preset.key}
                type="button"
                onClick={() => setTone(preset.key)}
                className={`rounded-[20px] border p-4 text-left transition-all ${
                  active
                    ? "border-primary/30 bg-primary/10 shadow-[0_16px_42px_-34px_rgba(255,173,70,0.48)]"
                    : "border-border/30 bg-background/45 hover:border-primary/20"
                }`}
              >
                <div className={`inline-flex rounded-xl border border-border/30 bg-card/45 p-2 ${preset.iconClass}`}>
                  {preset.key === "erotic" ? <Flame className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
                </div>
                <div className="mt-3 font-display text-xl text-foreground">{toneTitle(preset.key)}</div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{toneSubtitle(preset.key)}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{l("Intensity", "Intensité", "Intenzita")}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {heatOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setHeat(option.key)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-all ${
                    heat === option.key
                      ? "border-primary/30 bg-primary/10 text-foreground"
                      : "border-border/30 bg-card/45 text-muted-foreground"
                  }`}
                >
                  {heatLabel(option.key)}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{heatNote(heat)}</p>
          </div>

          <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{l("Primary focus", "Focus principal", "Hlavní fokus")}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {focusOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setFocus(option.key)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-all ${
                    focus === option.key
                      ? "border-primary/30 bg-primary/10 text-foreground"
                      : "border-border/30 bg-card/45 text-muted-foreground"
                  }`}
                >
                  {focusLabel(option.key)}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{focusNote(focus)}</p>
          </div>
        </div>

        <div className="mt-4">
          <ShareCardButton
            coupleId={coupleId}
            messageType="oracle_config_share"
            content={`${l("Oracle configuration", "Configuration Oracle", "Nastavení Oracle")} ✦ ${l("Tone", "Tonalité", "Tón")}: ${toneTitle(selectedTone.key)}, ${l("Intensity", "Intensité", "Intenzita")}: ${heatLabel(heat)}, ${l("Focus", "Focus", "Zaměření")}: ${focusLabel(focus)}.`}
            label={l("Offer this intention", "Partager cette intention", "Sdílet tento záměr")}
          />
        </div>
      </section>

      {loading ? (
        <section className="rounded-[24px] border border-border/30 bg-card/45 p-6">
          <p className="text-sm text-muted-foreground">{l("Reading your latest temple data and composing next best moves…", "Lecture de vos dernières données du temple et composition des prochains meilleurs gestes…", "Čtu poslední chrámová data a skládám nejlepší další kroky…")}</p>
        </section>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {signals.map((signal) => (
              <div key={signal.label} className="rounded-[24px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{signal.label}</div>
                <div className="mt-3 font-display text-3xl text-foreground">{signal.value}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{signal.note}</p>
              </div>
            ))}
          </section>

          <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
            <div className="flex items-center gap-2 text-primary/80">
              <Compass className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.22em]">{l("Tonight sequence", "Séquence de ce soir", "Sekvence dnešního večera")}</p>
            </div>
            <h3 className="mt-2 font-display text-3xl text-foreground">{l("Oracle ritual arc for tonight", "Arc rituel Oracle pour ce soir", "Oracle rituální oblouk pro dnešní večer")}</h3>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {oraclePlan.map((step) => (
                <div key={step.id} className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${step.iconClass}`}>
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h4 className="mt-4 font-display text-2xl text-foreground">{step.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.detail}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate(step.target)}
                      className="rounded-2xl border border-primary/25 bg-primary/12 px-4 py-3 text-xs text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
                    >
                      {l("Enter step", "Entrer dans l'étape", "Vstoupit do kroku")}
                    </button>
                    <ShareCardButton
                      coupleId={coupleId}
                      messageType="oracle_sequence_share"
                      content={`Oracle sequence card ✦ ${step.title} — ${step.detail}`}
                      label={l("Offer this step", "Partager cette étape", "Sdílet tento krok")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
            <div className="flex items-center gap-2 text-primary/80">
              <Brain className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.22em]">{l("Oracle moves", "Mouvements Oracle", "Oracle kroky")}</p>
            </div>
            <h3 className="mt-2 font-display text-3xl text-foreground">{l("What love wants next", "Ce que l'amour veut ensuite", "Co láska chce dál")}</h3>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {oracleMoves.map((move) => (
                <div key={move.id} className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${move.iconClass}`}>
                    <Stars className="h-5 w-5" />
                  </div>
                  <h4 className="mt-4 font-display text-2xl text-foreground">{move.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{move.why}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate(move.target)}
                      className="rounded-2xl border border-primary/25 bg-primary/12 px-4 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
                    >
                      {move.cta}
                    </button>
                    <ShareCardButton
                      coupleId={coupleId}
                      messageType="oracle_move_share"
                      content={`Oracle move card ✦ ${move.title} — ${move.why}`}
                      label={l("Offer this move", "Partager ce mouvement", "Sdílet tento krok")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
            <div className="flex items-center gap-2 text-amber-300">
              <Sparkles className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.22em]">{l("Beloved-tier features", "Fonctionnalités niveau Beloved", "Funkce úrovně Beloved")}</p>
            </div>
            <h3 className="mt-2 font-display text-3xl text-foreground">{l("Premium intimacy intelligence couples crave", "Intelligence premium d'intimité que les couples recherchent", "Premium inteligence intimity, po které páry touží")}</h3>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
                <div className="inline-flex rounded-xl border border-border/30 bg-card/45 p-2 text-rose-300">
                  <Heart className="h-4 w-4" />
                </div>
                <h4 className="mt-3 font-display text-xl text-foreground">{l("Desire Synchrony Dial", "Cadence de synchronie du désir", "Měřič synchronie touhy")}</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{l("Tracks how often erotic and emotional tempos match, then proposes exact bridge rituals.", "Suit la fréquence d'alignement des tempos érotiques et émotionnels, puis propose des rituels de pont précis.", "Sleduje, jak často se sladí erotické a emoční tempo, a navrhuje přesné mostové rituály.")}</p>
              </div>

              <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
                <div className="inline-flex rounded-xl border border-border/30 bg-card/45 p-2 text-violet-300">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <h4 className="mt-3 font-display text-xl text-foreground">{l("Afterglow Debrief Engine", "Moteur de débrief afterglow", "Afterglow debrief engine")}</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{l("Transforms shared moments into post-ritual prompts that deepen trust instead of fading overnight.", "Transforme les moments partagés en prompts post-rituel qui renforcent la confiance au lieu de s'effacer pendant la nuit.", "Proměňuje sdílené okamžiky na otázky po rituálu, které prohlubují důvěru místo toho, aby přes noc vybledly.")}</p>
              </div>

              <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
                <div className="inline-flex rounded-xl border border-border/30 bg-card/45 p-2 text-emerald-300">
                  <Route className="h-4 w-4" />
                </div>
                <h4 className="mt-3 font-display text-xl text-foreground">{l("Seasonal Intimacy Forecast", "Prévision saisonnière d'intimité", "Sezónní předpověď intimity")}</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{l("Predicts your next relational season and suggests the precise pathway to sustain momentum.", "Prédit votre prochaine saison relationnelle et suggère le parcours précis pour soutenir l'élan.", "Předpovídá další vztahové období a navrhuje přesnou cestu, jak udržet tempo.")}</p>
              </div>
            </div>

            <div className="mt-4 rounded-[22px] border border-border/30 bg-background/45 p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-primary mt-1" />
                <p className="text-sm leading-6 text-muted-foreground">
                  {l(
                    "Oracle stays devotional to consent and pacing. It offers a strong next move while preserving emotional sovereignty for both lovers.",
                    "L'Oracle reste dévoué au consentement et au bon rythme. Il propose un geste fort tout en préservant la souveraineté émotionnelle des deux partenaires.",
                    "Oracle zůstává věrný souhlasu a tempu. Nabízí silný další krok a zároveň chrání emoční suverenitu obou partnerů.",
                  )}
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </DoorwayShell>
  );
};

export default WisdomOracle;
