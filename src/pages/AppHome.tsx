import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import {
  ArrowRight,
  BookOpen,
  Cloud,
  Heart,
  Lock,
  MessageCircle,
  Snowflake,
  Sparkles,
  Stars,
  SunMedium,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import {
  clearForceDisconnected,
  fetchCoupleStateForUser,
  markEverConnected,
  markForceDisconnected,
  readConnectedCoupleId,
  readEverConnected,
  storeConnectedCoupleId,
} from "@/lib/couples";
import { deriveActiveTonightExperience, getWeatherPresentation, type WeatherKey } from "@/lib/weatherMatch";
import { getLocalDayRange, pickLatestWeatherForCouple } from "@/lib/weatherEntries";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useSelectedDailyMainCard } from "@/lib/weatherEngine";
import { deriveTonightPathStatus } from "@/lib/tonightPathStatus";

type RitualItem = Tables<"ritual_items">;
type Pathway = Tables<"pathways">;
type PartnerMessage = Tables<"partner_messages">;
type AltarItem = Tables<"altar_items">;
type Profile = Tables<"profiles">;
type HomeWeatherEntry = Pick<Tables<"weather_entries">, "id" | "state" | "user_id" | "created_at">;

type DailyCard = {
  id: string;
  label: string;
  title: string;
  description: string;
  quickInsight: string;
  steps: string[];
  icon: LucideIcon;
  accentClass: string;
};

const quoteSets: Record<Language, Array<{ id: string; author: string; quote: string }>> = {
  en: [
    { id: "quote-richardson", author: "Diana Richardson", quote: "When slowness enters intimacy, the body starts telling a much deeper truth." },
    { id: "quote-deida", author: "David Deida", quote: "Love deepens when presence, truth, and attraction are all still welcome in the room." },
    { id: "quote-chia", author: "Mantak Chia", quote: "Breath and awareness turn intensity into nourishment instead of depletion." },
    { id: "quote-osho", author: "Osho", quote: "When lovers meet in awareness, even silence becomes intimate." },
  ],
  fr: [
    { id: "quote-richardson", author: "Diana Richardson", quote: "Quand la lenteur entre dans l'intimité, le corps commence à dire une vérité plus profonde." },
    { id: "quote-deida", author: "David Deida", quote: "L'amour s'approfondit quand la présence, la vérité et l'attirance restent toutes les trois dans la pièce." },
    { id: "quote-chia", author: "Mantak Chia", quote: "Le souffle et la conscience transforment l'intensité en nourriture plutôt qu'en épuisement." },
    { id: "quote-osho", author: "Osho", quote: "Quand deux amants se rencontrent en conscience, même le silence devient intime." },
  ],
  cs: [
    { id: "quote-richardson", author: "Diana Richardson", quote: "Když do intimity vstoupí pomalost, tělo začne mluvit mnohem hlubší pravdou." },
    { id: "quote-deida", author: "David Deida", quote: "Láska se prohlubuje, když jsou v prostoru zároveň přítomnost, pravda i přitažlivost." },
    { id: "quote-chia", author: "Mantak Chia", quote: "Dech a vědomí mění intenzitu ve výživu místo vyčerpání." },
    { id: "quote-osho", author: "Osho", quote: "Když se milenci setkají ve vědomé přítomnosti, i ticho se stává intimním." },
  ],
};

const positionSets: Record<Language, Array<{ id: string; title: string; description: string }>> = {
  en: [
    { id: "position-hand-on-heart", title: "Hand on heart", description: "Start chest-to-chest and let safety arrive before intensity." },
    { id: "position-back-to-back", title: "Back to back", description: "Share breath without pressure and let your nervous systems settle together." },
    { id: "position-seated-closeness", title: "Seated closeness", description: "Face each other, stay near, and allow desire to grow from presence." },
    { id: "position-synchronized-exhale", title: "Synchronized exhale", description: "Use a shared exhale to soften the room and open one clear next move." },
  ],
  fr: [
    { id: "position-hand-on-heart", title: "Main sur le cœur", description: "Commencez poitrine contre poitrine et laissez la sécurité arriver avant l'intensité." },
    { id: "position-back-to-back", title: "Dos à dos", description: "Partagez le souffle sans pression et laissez vos systèmes nerveux se réguler ensemble." },
    { id: "position-seated-closeness", title: "Proximité assise", description: "Asseyez-vous face à face, restez proches, et laissez le désir grandir depuis la présence." },
    { id: "position-synchronized-exhale", title: "Expiration synchronisée", description: "Utilisez une expiration commune pour adoucir l'espace et ouvrir une prochaine étape claire." },
  ],
  cs: [
    { id: "position-hand-on-heart", title: "Ruka na srdci", description: "Začněte hrudník na hrudník a nechte bezpečí přijít dřív než intenzitu." },
    { id: "position-back-to-back", title: "Zády k sobě", description: "Sdílejte dech bez tlaku a nechte nervový systém uklidnit se společně." },
    { id: "position-seated-closeness", title: "Blízkost vsedě", description: "Sedněte si čelem k sobě, zůstaňte blízko, a nechte touhu růst z přítomnosti." },
    { id: "position-synchronized-exhale", title: "Synchronní výdech", description: "Použijte společný výdech, aby se prostor zjemnil a otevřel jeden jasný další krok." },
  ],
};

const templePulseSets: Record<Language, Array<{ id: string; title: string; description: string }>> = {
  en: [
    { id: "temple-soft", title: "Soft and receptive", description: "Tonight favors tenderness, gentle touch, and slow eye contact." },
    { id: "temple-playful", title: "Playful and alive", description: "Bring laughter, curiosity, and one light sensual invitation." },
    { id: "temple-devotional", title: "Devotional and deep", description: "Less noise, more reverence. Stay with breath and heart-led words." },
    { id: "temple-magnetic", title: "Magnetic and erotic", description: "Build anticipation slowly and let polarity unfold without rushing." },
  ],
  fr: [
    { id: "temple-soft", title: "Doux et réceptif", description: "Ce soir favorise la tendresse, le toucher doux et le regard lent." },
    { id: "temple-playful", title: "Joueur et vivant", description: "Apportez du rire, de la curiosité et une invitation sensuelle légère." },
    { id: "temple-devotional", title: "Dévotion et profondeur", description: "Moins de bruit, plus de révérence. Restez avec le souffle et des mots guidés par le cœur." },
    { id: "temple-magnetic", title: "Magnétique et érotique", description: "Construisez l'anticipation lentement et laissez la polarité se déployer sans précipitation." },
  ],
  cs: [
    { id: "temple-soft", title: "Jemné a přijímající", description: "Dnešní večer přeje něze, jemnému doteku a pomalému očnímu kontaktu." },
    { id: "temple-playful", title: "Hravé a živé", description: "Přineste smích, zvědavost a jedno lehké smyslné pozvání." },
    { id: "temple-devotional", title: "Oddané a hluboké", description: "Méně hluku, více úcty. Zůstaňte u dechu a slov vedených srdcem." },
    { id: "temple-magnetic", title: "Magnetické a erotické", description: "Budujte očekávání pomalu a nechte polaritu rozvinout bez spěchu." },
  ],
};

const reconnectMoveSets: Record<Language, Array<{ id: string; title: string; description: string }>> = {
  en: [
    { id: "reconnect-soft-checkin", title: "Soft check-in", description: "Ask: “What would help you feel cherished tonight?” and mirror the answer with warmth." },
    { id: "reconnect-90-second-reset", title: "90-second reset", description: "Hold hands, breathe together, and each share one appreciation before anything else." },
    { id: "reconnect-devotion-line", title: "Devotion line", description: "Whisper one line of love and one desire for deeper closeness tonight." },
    { id: "reconnect-sensual-pause", title: "Sensual pause", description: "Pause logistics for five minutes and let touch lead before words." },
  ],
  fr: [
    { id: "reconnect-soft-checkin", title: "Check-in doux", description: "Demandez: « Qu'est-ce qui t'aiderait à te sentir chéri(e) ce soir? » puis reflétez la réponse avec chaleur." },
    { id: "reconnect-90-second-reset", title: "Reset 90 secondes", description: "Tenez-vous les mains, respirez ensemble, et partagez chacun une appréciation avant tout le reste." },
    { id: "reconnect-devotion-line", title: "Ligne de dévotion", description: "Chuchotez une ligne d'amour et un désir de plus grande proximité ce soir." },
    { id: "reconnect-sensual-pause", title: "Pause sensuelle", description: "Mettez la logistique en pause cinq minutes et laissez le toucher guider avant les mots." },
  ],
  cs: [
    { id: "reconnect-soft-checkin", title: "Jemný check-in", description: "Zeptejte se: „Co by ti dnes večer pomohlo cítit se milovaně?“ a odpověď zrcadlete s laskavostí." },
    { id: "reconnect-90-second-reset", title: "90s reset", description: "Držte se za ruce, dýchejte spolu a každý sdílejte jedno ocenění ještě před čímkoli dalším." },
    { id: "reconnect-devotion-line", title: "Věta oddanosti", description: "Zašeptete jednu větu lásky a jedno přání po hlubší blízkosti dnes večer." },
    { id: "reconnect-sensual-pause", title: "Smyslná pauza", description: "Na pět minut zastavte logistiku a nechte dotek vést dřív než slova." },
  ],
};

const connectedReminderSets: Record<Language, string[]> = {
  en: [
    "Presence is the first form of touch.",
    "A softer beginning often opens the deepest door.",
    "When both partners feel seen, desire has space to return.",
    "Repair starts when one person becomes gentle first.",
    "Two people stay close when they choose each other again.",
    "A loving ritual can begin with one steady breath.",
  ],
  fr: [
    "La connexion se construit dans de petits gestes de présence.",
    "La gratitude garde l'amour vivant entre les grands moments.",
    "Aujourd'hui, choisissez la douceur avant la vitesse.",
    "Le lien se renforce quand les deux cœurs restent disponibles.",
    "Deux personnes restent proches quand elles se choisissent à nouveau, chaque jour.",
    "Un rituel d'amour peut commencer par un message tendre.",
  ],
  cs: [
    "Spojení se tvoří malými akty přítomnosti.",
    "Vděčnost drží lásku v teple mezi velkými momenty.",
    "Dnes zvolte jemnost před spěchem.",
    "Pouto sílí, když zůstávají otevřená obě srdce.",
    "Blízkost nevzniká náhodou. Dva lidé se k sobě vracejí záměrně.",
    "Láskyplný rituál může začít jednou jemnou zprávou.",
  ],
};

const homeCopy: Record<Language, Record<string, string>> = {
  en: {
    beloved: "Beloved",
    heroTitle: "Daily Sacred Starter for Modern Couples",
    heroDesc: "Six preselected cards. Calm direction. Shared intimacy momentum. This page renews every day to support your path toward infinite love.",
    relationship: "Relationship",
    partnerFallback: "your love",
    journeyLine: "On a journey to sacred intimacy.",
    notConnectedLine: "Not connected yet. Invite your partner to begin your shared path.",
    connected: "Connected",
    solo: "Solo",
    syncing: "Syncing",
    syncingLine: "Checking your connection status...",
    signalPreparing: "Preparing today's flow...",
    signalPartner: "Partner pulse",
    signalMemory: "Saved memory",
    signalThread: "Shared thread",
    signalDaily: "Daily rhythm",
    signalDailyDetail: "A gentle daily plan for modern couples who want depth without decision fatigue.",
    todayFlowLabel: "Draw closer today",
    todayFlowTitle: "One small act of presence changes everything between two people.",
    selecting: "Selecting...",
    calibrating: "Calibrating your daily relationship guidance.",
    labelRitual: "Today Ritual",
    labelQuote: "Today Quote",
    labelInsight: "Today Insight",
    labelPosition: "Today Position",
    labelTemple: "Temple Pulse",
    labelReconnect: "Reconnect Move",
    fallbackRitualTitle: "Soft arrival ritual",
    fallbackRitualDesc: "Begin with one minute of touch and one honest sentence.",
    fallbackInsightTitle: "Slow down before intensity",
    fallbackInsightDesc: "Presence first, performance second. Let your nervous systems meet.",
    fallbackCardDesc: "A grounded opening for emotional and sensual closeness.",
    fallbackInsightCardDesc: "One practical learning insight for couples building lasting intimacy.",
    quickInsight: "Quick insight",
    stepByStep: "Step by step",
    goDeeper: "Deepen intimacy together",
    goDeeperDesc: "Premium helps couples reconnect, heal what feels strained, and discover new ways to love.",
    useful: "Was this useful?",
    ritualInsight: "A short ritual lowers stress and raises emotional and erotic safety in minutes.",
    quoteInsight: "Use one line of wisdom as tonight's shared intention.",
    insightInsight: "Tiny daily learning loops create long-term relational transformation.",
    positionInsight: "Body-led connection can reopen closeness faster than long conversations.",
    templeInsight: "Match the mood of your connection before asking for more intensity.",
    reconnectInsight: "One repair micro-move protects trust and attraction over time.",
    checkIntimacyWeather: "Check your intimacy weather",
    saveThisPractice: "Save this practice",
    savedToYourPath: "Saved to your path",
    fromAuthorPattern: "From {author}",
    lockedDaily: "FOR THE TWO OF YOU",
    lockedDailyTitle: "Grow closer, gently.",
    lockedDailyDesc: "Reconnect intimacy, repair what feels strained, and try something new together.",
    chipExtraCards: "Reconnect",
    chipDailyRefresh: "Heal",
    chipSensualGuidance: "Discover",
    buttonDailyPlans: "Explore your shared path",
    lockedFull: "DEEPER PATH FOR TWO",
    lockedFullTitle: "Open the door to deeper intimacy.",
    lockedFullDesc: "Premium is for couples who want more than inspiration. It helps you reconnect when distance appears, repair what feels fragile, explore new rituals together, and build a love life that feels more alive, loving, and fulfilling.",
    chipTemple: "Feel closer",
    chipLibrary: "Heal what's stuck",
    chipOracle: "Discover new ways",
    buttonFullPlans: "Deepen intimacy together",
    premiumActive: "Premium Active",
    premiumActiveTitle: "Your full Sacred Path is unlocked",
    premiumActiveDesc:
      "You now have full access to all temple doorways, complete library depth, advanced reconnect tracks, and full Oracle intelligence.",
    buttonOpenTemple: "Open Sacred Temple",
    buttonOpenLibrary: "Open Sacred Library",
    stepRitual1: "Take three synchronized breaths.",
    stepRitual2: "Share one feeling each.",
    stepRitual3: "Close with one intentional touch.",
    stepQuote1: "Read the quote aloud slowly.",
    stepQuote2: "Each partner shares one sentence it awakens.",
    stepQuote3: "Choose one action to embody it tonight.",
    stepInsight1: "Name the one insight that matters most today.",
    stepInsight2: "Apply it in one 5-minute moment.",
    stepInsight3: "Reflect together tonight: what shifted?",
    stepPosition1: "Set a gentle timer for 3-5 minutes.",
    stepPosition2: "Stay in position and track breath together.",
    stepPosition3: "Share one word each before moving on.",
    stepTemple1: "Name tonight's emotional tone.",
    stepTemple2: "Choose touch and words that fit that tone.",
    stepTemple3: "Re-check in after five minutes.",
    stepReconnect1: "Pause everything for a brief reconnection.",
    stepReconnect2: "Offer one appreciation and one need.",
    stepReconnect3: "Close with warmth, not analysis.",
  },
  fr: {
    beloved: "Bien-aimé(e)",
    heroTitle: "Démarrage sacré du jour pour couples modernes",
    heroDesc: "Six cartes présélectionnées. Direction calme. Élan d'intimité partagé. Cette page se renouvelle chaque jour.",
    relationship: "Relation",
    partnerFallback: "ton amour",
    journeyLine: "En chemin vers une intimité sacrée.",
    notConnectedLine: "Pas encore connectés. Invitez votre partenaire pour commencer votre chemin partagé.",
    connected: "Connectés",
    solo: "Solo",
    syncing: "Synchronisation",
    syncingLine: "Vérification du statut de connexion...",
    signalPreparing: "Préparation du flow du jour...",
    signalPartner: "Pouls du partenaire",
    signalMemory: "Souvenir sauvegardé",
    signalThread: "Fil partagé",
    signalDaily: "Rythme quotidien",
    signalDailyDetail: "Un plan quotidien doux pour les couples modernes qui veulent de la profondeur sans fatigue décisionnelle.",
    todayFlowLabel: "Rapprochez-vous aujourd'hui",
    todayFlowTitle: "Un petit geste de présence change tout entre deux personnes.",
    selecting: "Sélection...",
    calibrating: "Calibrage de votre guidance relationnelle du jour.",
    labelRitual: "Rituel du jour",
    labelQuote: "Citation du jour",
    labelInsight: "Insight du jour",
    labelPosition: "Position du jour",
    labelTemple: "Pulse du temple",
    labelReconnect: "Mouvement de reconnexion",
    fallbackRitualTitle: "Rituel d'arrivée douce",
    fallbackRitualDesc: "Commencez par une minute de toucher et une phrase honnête.",
    fallbackInsightTitle: "Ralentir avant l'intensité",
    fallbackInsightDesc: "Présence d'abord, performance ensuite. Laissez vos systèmes nerveux se rencontrer.",
    fallbackCardDesc: "Une ouverture ancrée vers la proximité émotionnelle et sensuelle.",
    fallbackInsightCardDesc: "Un insight pratique pour les couples qui construisent une intimité durable.",
    quickInsight: "Insight rapide",
    stepByStep: "Étape par étape",
    goDeeper: "Aller plus loin",
    goDeeperDesc: "Débloquez 14 cartes quotidiennes supplémentaires construites depuis votre rythme de couple.",
    useful: "Utile pour vous?",
    ritualInsight: "Un rituel court réduit le stress et augmente la sécurité émotionnelle et érotique.",
    quoteInsight: "Utilisez une ligne de sagesse comme intention partagée de ce soir.",
    insightInsight: "Les micro-boucles d'apprentissage transforment la relation sur le long terme.",
    positionInsight: "La connexion par le corps peut rouvrir la proximité plus vite que de longues conversations.",
    templeInsight: "Accordez l'intensité au climat réel de votre connexion.",
    reconnectInsight: "Un micro-geste de réparation protège confiance et attirance.",
    checkIntimacyWeather: "Vérifier votre météo d'intimité",
    saveThisPractice: "Sauvegarder cette pratique",
    savedToYourPath: "Sauvegardé dans votre chemin",
    fromAuthorPattern: "De {author}",
    lockedDaily: "Extension quotidienne verrouillée",
    lockedDailyTitle: "Plus de cette page: 14 cartes quotidiennes",
    lockedDailyDesc: "Gardez votre rythme frais avec des rituels, citations, insights, positions et pulses supplémentaires.",
    chipExtraCards: "14 cartes en plus",
    chipDailyRefresh: "Refresh quotidien",
    chipSensualGuidance: "Guidance sensuelle",
    buttonDailyPlans: "Voir les plans d'extension",
    lockedFull: "Expérience complète verrouillée",
    lockedFullTitle: "Plus de Sacred Path dans toute l'app",
    lockedFullDesc: "Débloquez les huit portes du temple, toute la profondeur de la bibliothèque et l'intelligence de parcours complète.",
    chipTemple: "Temple sacré",
    chipLibrary: "Bibliothèque sacrée",
    chipOracle: "Oracle de sagesse",
    buttonFullPlans: "Voir les plans complets",
    premiumActive: "Premium actif",
    premiumActiveTitle: "Votre Sacred Path complet est débloqué",
    premiumActiveDesc:
      "Vous avez maintenant accès à toutes les portes du temple, à toute la profondeur de la bibliothèque, aux tracks reconnect avancés et à l'intelligence complète de l'Oracle.",
    buttonOpenTemple: "Ouvrir le Temple Sacré",
    buttonOpenLibrary: "Ouvrir la Bibliothèque Sacrée",
    stepRitual1: "Prenez trois respirations synchronisées.",
    stepRitual2: "Partagez chacun un ressenti.",
    stepRitual3: "Terminez par un toucher intentionnel.",
    stepQuote1: "Lisez la citation à voix haute et lentement.",
    stepQuote2: "Chaque partenaire partage une phrase qu'elle réveille.",
    stepQuote3: "Choisissez une action pour l'incarner ce soir.",
    stepInsight1: "Nommez l'insight le plus important aujourd'hui.",
    stepInsight2: "Appliquez-le dans un moment de 5 minutes.",
    stepInsight3: "Refaites un bilan ce soir: qu'est-ce qui a bougé?",
    stepPosition1: "Posez un minuteur doux de 3-5 minutes.",
    stepPosition2: "Restez dans la position et suivez le souffle ensemble.",
    stepPosition3: "Partagez un mot chacun avant de continuer.",
    stepTemple1: "Nommez le ton émotionnel de ce soir.",
    stepTemple2: "Choisissez toucher et mots qui correspondent.",
    stepTemple3: "Refaites un check-in après cinq minutes.",
    stepReconnect1: "Mettez tout en pause pour une brève reconnexion.",
    stepReconnect2: "Offrez une appréciation et un besoin.",
    stepReconnect3: "Fermez avec chaleur, pas avec analyse.",
  },
  cs: {
    beloved: "Milovaná duše",
    heroTitle: "Denní posvátný start pro moderní páry",
    heroDesc: "Šest předvybraných karet. Klidný směr. Sdílená intimní dynamika. Tato stránka se obnovuje každý den.",
    relationship: "Vztah",
    partnerFallback: "tvá láska",
    journeyLine: "Na cestě k posvátné intimitě.",
    notConnectedLine: "Ještě nejste propojeni. Pozvěte partnera a začněte společnou cestu.",
    connected: "Propojeno",
    solo: "Solo",
    syncing: "Synchronizuji",
    syncingLine: "Ověřuji stav propojení...",
    signalPreparing: "Připravuji dnešní flow...",
    signalPartner: "Pulz partnera",
    signalMemory: "Uložená vzpomínka",
    signalThread: "Sdílené vlákno",
    signalDaily: "Denní rytmus",
    signalDailyDetail: "Jemný denní plán pro moderní páry, které chtějí hloubku bez rozhodovací únavy.",
    todayFlowLabel: "Přibližte se dnes",
    todayFlowTitle: "Jeden malý čin přítomnosti změní vše mezi dvěma lidmi.",
    selecting: "Vybírám...",
    calibrating: "Kalibruji vaše dnešní vztahové vedení.",
    labelRitual: "Dnešní rituál",
    labelQuote: "Dnešní citát",
    labelInsight: "Dnešní vhled",
    labelPosition: "Dnešní pozice",
    labelTemple: "Pulz chrámu",
    labelReconnect: "Reconnect krok",
    fallbackRitualTitle: "Jemný příchozí rituál",
    fallbackRitualDesc: "Začněte jednou minutou doteku a jednou upřímnou větou.",
    fallbackInsightTitle: "Zpomalte před intenzitou",
    fallbackInsightDesc: "Nejprve přítomnost, potom výkon. Nechte se potkat nervové systémy.",
    fallbackCardDesc: "Ukotvené otevření k emoční i smyslné blízkosti.",
    fallbackInsightCardDesc: "Jeden praktický vhled pro páry budující dlouhodobou intimitu.",
    quickInsight: "Rychlý vhled",
    stepByStep: "Krok za krokem",
    goDeeper: "Jít hlouběji",
    goDeeperDesc: "Odemkněte 14 dalších denních karet postavených na rytmu vašeho páru.",
    useful: "Bylo to užitečné?",
    ritualInsight: "Krátký rituál snižuje stres a zvyšuje emoční i erotické bezpečí během minut.",
    quoteInsight: "Použijte jednu větu moudrosti jako dnešní společný záměr.",
    insightInsight: "Malé denní smyčky učení tvoří velkou dlouhodobou změnu vztahu.",
    positionInsight: "Tělesné propojení často otevře blízkost rychleji než dlouhé rozhovory.",
    templeInsight: "Než přidáte intenzitu, slaďte se s aktuální náladou vztahu.",
    reconnectInsight: "Jeden mikrokrok opravy dlouhodobě chrání důvěru i přitažlivost.",
    checkIntimacyWeather: "Zkontrolovat vaše počasí intimity",
    saveThisPractice: "Uložit tuto praxi",
    savedToYourPath: "Uloženo do vaší cesty",
    fromAuthorPattern: "Od {author}",
    lockedDaily: "Uzamčené denní rozšíření",
    lockedDailyTitle: "Více z této stránky: 14 extra denních karet",
    lockedDailyDesc: "Udržte svůj denní rytmus svěží dalšími rituály, citáty, vhledy, pozicemi a chrámovými pulzy.",
    chipExtraCards: "14 extra karet",
    chipDailyRefresh: "Denní obnova",
    chipSensualGuidance: "Smyslné vedení",
    buttonDailyPlans: "Zobrazit plány rozšíření",
    lockedFull: "Uzamčený plný zážitek",
    lockedFullTitle: "Více Sacred Path v celé aplikaci",
    lockedFullDesc: "Odemkněte všech osm chrámových bran, plnou hloubku knihovny a kompletní inteligenci cesty.",
    chipTemple: "Posvátný chrám",
    chipLibrary: "Posvátná knihovna",
    chipOracle: "Oracle moudrosti",
    buttonFullPlans: "Zobrazit plné plány",
    premiumActive: "Premium aktivní",
    premiumActiveTitle: "Tvá plná Sacred Path je odemčená",
    premiumActiveDesc:
      "Nyní máš plný přístup ke všem chrámovým branám, kompletní hloubce knihovny, pokročilým reconnect trackům i plné inteligenci Orákula.",
    buttonOpenTemple: "Otevřít Posvátný chrám",
    buttonOpenLibrary: "Otevřít Posvátnou knihovnu",
    stepRitual1: "Dejte si tři synchronní nádechy a výdechy.",
    stepRitual2: "Každý sdílejte jeden pocit.",
    stepRitual3: "Uzavřete jedním záměrným dotekem.",
    stepQuote1: "Přečtěte citát nahlas a pomalu.",
    stepQuote2: "Každý řekněte jednu větu, co to ve vás probouzí.",
    stepQuote3: "Vyberte jednu akci, jak to dnes ztělesnit.",
    stepInsight1: "Pojmenujte jeden dnešní klíčový vhled.",
    stepInsight2: "Použijte ho v jednom 5minutovém momentu.",
    stepInsight3: "Večer spolu zhodnoťte: co se posunulo?",
    stepPosition1: "Nastavte jemný časovač na 3-5 minut.",
    stepPosition2: "Zůstaňte v pozici a sledujte dech spolu.",
    stepPosition3: "Než půjdete dál, řekněte každý jedno slovo.",
    stepTemple1: "Pojmenujte dnešní emoční tón.",
    stepTemple2: "Vyberte dotek a slova, které tomu odpovídají.",
    stepTemple3: "Po pěti minutách se znovu nalaďte.",
    stepReconnect1: "Na chvíli vše zastavte pro krátké znovupropojení.",
    stepReconnect2: "Nabídněte jedno ocenění a jednu potřebu.",
    stepReconnect3: "Uzavřete to teplem, ne analýzou.",
  },
};

const hashString = (value: string) =>
  Array.from(value).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 7);

const pickBySeed = <T,>(items: readonly T[], seed: string): T => items[hashString(seed) % items.length];

const clipText = (value: string, max = 96) => {
  if (value.length <= max) return value;
  return `${value.slice(0, max).trimEnd()}...`;
};

const localDayKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseRitualSteps = (steps: RitualItem["steps"]): string[] => {
  if (!Array.isArray(steps)) return [];
  const parsed = steps
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (!item || typeof item !== "object") return "";
      const value = (item as { instruction?: string; step?: string; title?: string; body?: string }).instruction
        ?? (item as { instruction?: string; step?: string; title?: string; body?: string }).step
        ?? (item as { instruction?: string; step?: string; title?: string; body?: string }).title
        ?? (item as { instruction?: string; step?: string; title?: string; body?: string }).body;
      return typeof value === "string" ? value.trim() : "";
    })
    .filter(Boolean);

  return parsed.slice(0, 3);
};

const fallbackBelovedValues = new Set(Object.values(homeCopy).map((copySet) => copySet.beloved));
const WEATHER_KEYS: WeatherKey[] = ["open", "tender", "playful", "stressed", "longing", "erotic", "tired", "reassurance"];

const AppHome = () => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const copy = homeCopy[lang];
  const { hasPremiumAccess, entitlementResolved } = usePremiumAccess();
  const quotes = quoteSets[lang];
  const positions = positionSets[lang];
  const templePulses = templePulseSets[lang];
  const reconnectMoves = reconnectMoveSets[lang];

  const [loading, setLoading] = useState(true);
  const [relationshipConnected, setRelationshipConnected] = useState(false);
  const [myName, setMyName] = useState(copy.beloved);
  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [messages, setMessages] = useState<PartnerMessage[]>([]);
  const [altarItems, setAltarItems] = useState<AltarItem[]>([]);
  const [rituals, setRituals] = useState<RitualItem[]>([]);
  const [pathways, setPathways] = useState<Pathway[]>([]);
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [partnerUserId, setPartnerUserId] = useState<string | null>(null);
  const [myWeatherEntry, setMyWeatherEntry] = useState<HomeWeatherEntry | null>(null);
  const [partnerWeatherEntry, setPartnerWeatherEntry] = useState<HomeWeatherEntry | null>(null);
  const [myWeatherSelected, setMyWeatherSelected] = useState<string | null>(null);
  const [savingWeather, setSavingWeather] = useState(false);
  const [weatherPickerVisible, setWeatherPickerVisible] = useState(false);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [copiedInvite, setCopiedInvite] = useState(false);
  const [copiedWeather, setCopiedWeather] = useState(false);
  const [generatingCode, setGeneratingCode] = useState(false);
  const [pendingMoodValue, setPendingMoodValue] = useState<string | null>(null);
  const [pendingMoodEmoji, setPendingMoodEmoji] = useState<string>("");
  const [pendingMoodLabel, setPendingMoodLabel] = useState<string>("");
  const [joinCode, setJoinCode] = useState("");
  const [joiningCode, setJoiningCode] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [joinSuccess, setJoinSuccess] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [nudgeSending, setNudgeSending] = useState(false);
  const [nudgeSent, setNudgeSent] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [showConnectedPopup, setShowConnectedPopup] = useState(false);
  const wasConnectedRef = useRef(false);
  const [searchParams] = useSearchParams();

  const resolvePreferredName = (profile: Pick<Profile, "display_name"> | null, fallbackUser = user) => {
    const profileName = profile?.display_name?.trim();
    if (profileName) return profileName;

    const metadataName = typeof fallbackUser?.user_metadata?.full_name === "string"
      ? fallbackUser.user_metadata.full_name.trim()
      : "";
    if (metadataName) return metadataName;

    const emailPrefix = fallbackUser?.email?.split("@")[0]?.trim();
    if (emailPrefix) return emailPrefix;

    return copy.beloved;
  };

  const saveDisplayNameIfMissing = async (name: string) => {
    if (!user) return;
    const { data: existing } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!existing?.display_name && name.trim()) {
      await supabase
        .from("profiles")
        .upsert({ id: user.id, user_id: user.id, display_name: name.trim() }, { onConflict: "user_id" });
    }
  };

  useEffect(() => {
    if (!user || !entitlementResolved) return;

    // Auto-clear stale force-disconnect flag on fresh app load
    // This prevents stuck disconnected state from testing
    if (user?.id) {
      const key = `sacred_path_force_disconnected_${user.id}`;
      const flagAge = localStorage.getItem(`${key}_timestamp`);
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
      if (flagAge && parseInt(flagAge) < oneDayAgo) {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_timestamp`);
      }
    }

    if (readEverConnected(user.id)) {
      setRelationshipConnected(true);
    }

    const loadHome = async () => {
      setLoading(true);

      const ritualsQuery = supabase
        .from("ritual_items")
        .select("*")
        .order("created_at", { ascending: true });
      const pathwaysQuery = supabase
        .from("pathways")
        .select("*")
        .order("created_at", { ascending: true });

      if (!hasPremiumAccess) {
        ritualsQuery.eq("premium_required", false);
        pathwaysQuery.eq("premium_required", false);
      }

      const [{ data: ritualData }, { data: pathwayData }, coupleState, { data: ownProfile }] = await Promise.all([
        ritualsQuery,
        pathwaysQuery,
        fetchCoupleStateForUser(supabase, user.id),
        supabase
          .from("profiles")
          .select("display_name, user_id")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);

      setRituals((ritualData ?? []).filter((item) => item.item_type === "ritual"));
      setPathways(pathwayData ?? []);
      setMyName(resolvePreferredName(ownProfile));

      const activeCouple = coupleState.activeCouple;

      if (!coupleState.connected) {
        setRelationshipConnected(false);
        setCoupleId(null);
        setPartnerUserId(null);
        setMessages([]);
        setAltarItems([]);
        setMyWeatherEntry(null);
        setPartnerWeatherEntry(null);
        setMyWeatherSelected(null);
        setWeatherPickerVisible(false);
        setInviteCode(coupleState.pendingInvite?.couple_code ?? null);

        // Still fetch partner name if we know the partnerId
        // (covers force-disconnect case where DB connection still exists)
        if (coupleState.partnerId) {
          const { data: partnerProfile } = await supabase
            .from("profiles")
            .select("display_name, user_id")
            .eq("user_id", coupleState.partnerId)
            .maybeSingle();
          setPartnerName(partnerProfile ? resolvePreferredName(partnerProfile, null) : null);
        } else {
          setPartnerName(null);
        }

        setLoading(false);
        return;
      }

      if (coupleState.connected) {
        // If DB shows a real active connection, clear any stale force-disconnect flag
        if (coupleState.activeCouple?.id) {
          clearForceDisconnected(user.id);
        }
        markEverConnected(user.id);
        storeConnectedCoupleId(user.id, activeCouple.id);
      }
      const connected = coupleState.connected;
      setRelationshipConnected(connected);

      setCoupleId(activeCouple.id);
      setPartnerUserId(coupleState.partnerId ?? null);
      setInviteCode(activeCouple.couple_code ?? null);

      // Load weather entries for the local current day and keep only latest per partner.
      const { startIso, endIso } = getLocalDayRange();
      const { data: weatherData } = await supabase
        .from("weather_entries")
        .select("id, state, user_id, created_at")
        .eq("couple_id", activeCouple.id)
        .gte("created_at", startIso)
        .lt("created_at", endIso)
        .order("created_at", { ascending: false })
        .order("id", { ascending: false });

      const { myEntry: myW, partnerEntry: partnerW } = pickLatestWeatherForCouple(
        weatherData ?? [],
        user.id,
        coupleState.partnerId ?? null,
      );

      setMyWeatherEntry(myW);
      setPartnerWeatherEntry(partnerW);
      setMyWeatherSelected(myW?.state ?? null);

      const partnerId = coupleState.partnerId;

      const [{ data: messageData }, { data: altarData }, { data: partnerProfile }] = await Promise.all([
        supabase
          .from("partner_messages")
          .select("*")
          .eq("couple_id", activeCouple.id)
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("altar_items")
          .select("*")
          .eq("couple_id", activeCouple.id)
          .order("created_at", { ascending: false })
          .limit(10),
        partnerId
          ? supabase
            .from("profiles")
            .select("display_name, user_id")
            .eq("user_id", partnerId)
            .maybeSingle()
          : Promise.resolve({ data: null }),
      ]);

      setPartnerName(connected && partnerProfile ? resolvePreferredName(partnerProfile, null) : null);
      setMessages(messageData ?? []);
      setAltarItems(altarData ?? []);
      setLoading(false);
    };

    loadHome();

    // Realtime: refresh home if a couple row referencing this user changes
    // (e.g., partner B accepts the invite — partner A should see it instantly)
    const channelA = supabase
      .channel(`home_couples_a_${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "couples", filter: `partner_a=eq.${user.id}` },
        () => loadHome(),
      )
      .subscribe();
    const channelB = supabase
      .channel(`home_couples_b_${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "couples", filter: `partner_b=eq.${user.id}` },
        () => loadHome(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelA);
      supabase.removeChannel(channelB);
    };
  }, [entitlementResolved, hasPremiumAccess, user]);

  useEffect(() => {
    if (!user || !coupleId) return;

    const syncDailyWeather = async () => {
      const { startIso, endIso } = getLocalDayRange();
      const { data: weatherData } = await supabase
        .from("weather_entries")
        .select("id, state, user_id, created_at")
        .eq("couple_id", coupleId)
        .gte("created_at", startIso)
        .lt("created_at", endIso)
        .order("created_at", { ascending: false })
        .order("id", { ascending: false });

      const { myEntry: myW, partnerEntry: partnerW } = pickLatestWeatherForCouple(
        weatherData ?? [],
        user.id,
        partnerUserId,
      );

      setMyWeatherEntry(myW);
      setPartnerWeatherEntry(partnerW);
      setMyWeatherSelected(myW?.state ?? null);
    };

    void syncDailyWeather();
    const channel = supabase
      .channel(`home_weather_${coupleId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "weather_entries", filter: `couple_id=eq.${coupleId}` },
        () => void syncDailyWeather(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [coupleId, partnerUserId, user]);

  const latestPartnerMessage = useMemo(
    () => messages.find((message) => message.sender_id !== user?.id) ?? null,
    [messages, user?.id]
  );

  const latestSharedMessage = messages[0] ?? null;
  const latestMemory = altarItems[0] ?? null;

  const todayKey = useMemo(() => localDayKey(new Date()), []);
  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(
        lang === "fr" ? "fr-FR" : lang === "cs" ? "cs-CZ" : "en-US",
        {
        weekday: "long",
        month: "long",
        day: "numeric",
      }
      ).format(new Date()),
    [lang]
  );
  const connectedJourneyLine = useMemo(
    () =>
      lang === "fr"
        ? "Vous êtes reliés. Nourrissez ce lien avec présence, tendresse, et gestes qui vous ramènent l'un à l'autre."
        : lang === "cs"
          ? "Jste propojeni. Pečujte o pouto přítomností, něhou a drobnými kroky, které vás vrací k sobě."
          : "You are connected. Keep this bond warm through presence, tenderness, and small acts that bring you back to each other.",
    [lang],
  );
  const connectedReminderLabel = lang === "fr"
    ? "RAPPEL DU JOUR"
    : lang === "cs"
      ? "DNESNÍ PŘIPOMÍNKA"
      : "TODAY'S REMINDER";
  const connectedDailyReminder = useMemo(
    () => pickBySeed(connectedReminderSets[lang], `${todayKey}:connected-reminder`),
    [lang, todayKey],
  );

  const signal = useMemo(() => {
    if (latestPartnerMessage) {
      return {
        title: copy.signalPartner,
        detail: clipText(latestPartnerMessage.content),
      };
    }

    if (latestMemory) {
      return {
        title: copy.signalMemory,
        detail: clipText(latestMemory.note || latestMemory.title),
      };
    }

    if (latestSharedMessage) {
      return {
        title: copy.signalThread,
        detail: clipText(latestSharedMessage.content),
      };
    }

    return {
      title: copy.signalDaily,
      detail: copy.signalDailyDetail,
    };
  }, [copy.signalDaily, copy.signalDailyDetail, copy.signalMemory, copy.signalPartner, copy.signalThread, latestMemory, latestPartnerMessage, latestSharedMessage]);

  const dailySeed = useMemo(() => `${todayKey}:${user?.id ?? "guest"}:${signal.detail}`, [signal.detail, todayKey, user?.id]);

  const dailyCards = useMemo<DailyCard[]>(() => {
    const ritualChoice =
      rituals.length > 0
        ? pickBySeed(rituals, `${dailySeed}:ritual`)
        : {
            id: "ritual-fallback",
            title: copy.fallbackRitualTitle,
            hook: copy.fallbackRitualDesc,
          };

    const pathwayChoice =
      pathways.length > 0
        ? pickBySeed(pathways, `${dailySeed}:insight`)
        : {
            id: "insight-fallback",
            title: copy.fallbackInsightTitle,
            description: copy.fallbackInsightDesc,
          };

    const quoteChoice = pickBySeed(quotes, `${dailySeed}:quote`);
    const positionChoice = pickBySeed(positions, `${dailySeed}:position`);
    const templePulse = pickBySeed(templePulses, `${dailySeed}:temple`);
    const reconnectMove = pickBySeed(reconnectMoves, `${dailySeed}:reconnect`);
    const ritualSteps = parseRitualSteps("steps" in ritualChoice ? ritualChoice.steps : null);

    return [
      {
        id: `ritual-${ritualChoice.id}`,
        label: copy.labelRitual,
        title: ritualChoice.title,
        description: ritualChoice.hook || copy.fallbackCardDesc,
        quickInsight: copy.ritualInsight,
        steps: ritualSteps.length > 0
          ? ritualSteps
          : [copy.stepRitual1, copy.stepRitual2, copy.stepRitual3],
        icon: Sparkles,
        accentClass: "text-amber-300",
      },
      {
        id: quoteChoice.id,
        label: copy.labelQuote,
        title: copy.fromAuthorPattern.replace("{author}", quoteChoice.author),
        description: `“${quoteChoice.quote}”`,
        quickInsight: copy.quoteInsight,
        steps: [copy.stepQuote1, copy.stepQuote2, copy.stepQuote3],
        icon: Stars,
        accentClass: "text-sky-300",
      },
      {
        id: `insight-${pathwayChoice.id}`,
        label: copy.labelInsight,
        title: pathwayChoice.title,
        description:
          pathwayChoice.description || copy.fallbackInsightCardDesc,
        quickInsight: copy.insightInsight,
        steps: [copy.stepInsight1, copy.stepInsight2, copy.stepInsight3],
        icon: BookOpen,
        accentClass: "text-violet-300",
      },
      {
        id: positionChoice.id,
        label: copy.labelPosition,
        title: positionChoice.title,
        description: positionChoice.description,
        quickInsight: copy.positionInsight,
        steps: [copy.stepPosition1, copy.stepPosition2, copy.stepPosition3],
        icon: Heart,
        accentClass: "text-rose-300",
      },
      {
        id: templePulse.id,
        label: copy.labelTemple,
        title: templePulse.title,
        description: templePulse.description,
        quickInsight: copy.templeInsight,
        steps: [copy.stepTemple1, copy.stepTemple2, copy.stepTemple3],
        icon: MessageCircle,
        accentClass: "text-teal-300",
      },
      {
        id: reconnectMove.id,
        label: copy.labelReconnect,
        title: reconnectMove.title,
        description: reconnectMove.description,
        quickInsight: copy.reconnectInsight,
        steps: [copy.stepReconnect1, copy.stepReconnect2, copy.stepReconnect3],
        icon: Heart,
        accentClass: "text-rose-300",
      },
    ];
  }, [copy.fallbackCardDesc, copy.fallbackInsightCardDesc, copy.fallbackInsightDesc, copy.fallbackInsightTitle, copy.fallbackRitualDesc, copy.fallbackRitualTitle, copy.fromAuthorPattern, copy.insightInsight, copy.labelInsight, copy.labelPosition, copy.labelQuote, copy.labelReconnect, copy.labelRitual, copy.labelTemple, copy.positionInsight, copy.quoteInsight, copy.reconnectInsight, copy.ritualInsight, copy.stepInsight1, copy.stepInsight2, copy.stepInsight3, copy.stepPosition1, copy.stepPosition2, copy.stepPosition3, copy.stepQuote1, copy.stepQuote2, copy.stepQuote3, copy.stepReconnect1, copy.stepReconnect2, copy.stepReconnect3, copy.stepRitual1, copy.stepRitual2, copy.stepRitual3, copy.stepTemple1, copy.stepTemple2, copy.stepTemple3, copy.templeInsight, dailySeed, pathways, positions, quotes, reconnectMoves, rituals, templePulses]);

  useEffect(() => {
    if (!user || relationshipConnected) return;
    try {
      const raw = localStorage.getItem(`weather_pending_${user.id}`);
      if (!raw) return;
      const { value, emoji, label, date } = JSON.parse(raw);
      if (date === new Date().toDateString()) {
        setPendingMoodValue(value);
        setPendingMoodEmoji(emoji);
        setPendingMoodLabel(label);
      }
    } catch {
      // Ignore malformed local cache payloads.
    }
  }, [user, relationshipConnected]);

  useEffect(() => {
    const inviteFromUrl = searchParams.get("invite");
    if (!inviteFromUrl) return;
    setJoinCode((current) => current || inviteFromUrl.trim().toUpperCase());
  }, [searchParams]);

  const createInviteOnHome = async () => {
    if (!user || generatingCode) return;
    setGeneratingCode(true);
    try {
      const existing = await fetchCoupleStateForUser(supabase, user.id);
      if (existing.pendingInvite?.couple_code) {
        setInviteCode(existing.pendingInvite.couple_code);
        return;
      }
      // Retry up to 3 times on duplicate code collision
      for (let attempt = 0; attempt < 3; attempt++) {
        const newCode = Math.random().toString(36).slice(2, 8).toUpperCase();
        const { error } = await supabase.from("couples").insert({ partner_a: user.id, couple_code: newCode });
        if (!error) {
          setInviteCode(newCode);
          return;
        }
        if (!error.message?.includes("unique") && !error.code?.includes("23505")) break;
      }
    } finally {
      setGeneratingCode(false);
    }
  };

  const joinWithCodeOnHome = async () => {
    if (!user || !joinCode.trim() || joiningCode) return;

    setJoiningCode(true);
    setJoinError("");
    setJoinSuccess("");
    const cleanCode = joinCode.trim().toUpperCase();

    const { data: target, error: fetchError } = await supabase
      .from("couples")
      .select("id, partner_a, partner_b")
      .eq("couple_code", cleanCode)
      .is("partner_b", null)
      .maybeSingle();

    if (fetchError || !target) {
      setJoinError(lang === "fr" ? "Code introuvable." : lang === "cs" ? "Kód nebyl nalezen." : "Invite code not found.");
      setJoiningCode(false);
      return;
    }

    if (target.partner_a === user.id) {
      setJoinError(lang === "fr" ? "C'est déjà votre code." : lang === "cs" ? "Tohle je už váš kód." : "This is already your code.");
      setJoiningCode(false);
      return;
    }

    const cleanDraftName = nameDraft.trim();
    if (cleanDraftName && !fallbackBelovedValues.has(cleanDraftName)) {
      await supabase
        .from("profiles")
        .upsert({ id: user.id, user_id: user.id, display_name: cleanDraftName }, { onConflict: "user_id" });
      setMyName(cleanDraftName);
    }

    const { data: updatedRows, error: updateError } = await supabase
      .from("couples")
      .update({ partner_b: user.id })
      .eq("id", target.id)
      .is("partner_b", null)
      .select("id, partner_a, partner_b");

    const joined = (updatedRows ?? []).find((row) => row.partner_b === user.id);

    if (updateError || !joined) {
      setJoinError(lang === "fr" ? "Impossible de rejoindre maintenant." : lang === "cs" ? "Teď se nejde připojit." : "Could not join this code right now.");
      setJoiningCode(false);
      return;
    }

    clearForceDisconnected(user.id);
    markEverConnected(user.id);
    storeConnectedCoupleId(user.id, target.id);

    const { data: partnerProfile } = await supabase
      .from("profiles")
      .select("display_name, user_id")
      .eq("user_id", target.partner_a)
      .maybeSingle();

    if (partnerProfile) {
      setPartnerName(resolvePreferredName(partnerProfile, null));
    }

    setRelationshipConnected(true);
    setCoupleId(target.id);
    setInviteCode(cleanCode);
    setJoinCode("");
    setJoinSuccess(lang === "fr" ? "Connecté." : lang === "cs" ? "Propojeno." : "Connected.");
    setShowConnectedPopup(true);
    setJoiningCode(false);
  };

  const handleCopyInvite = async () => {
    if (!inviteCode) return;
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopyCode = handleCopyInvite;

  const handleCopyInviteLink = async () => {
    if (!inviteCode) return;
    try {
      const link = `${window.location.origin}/app?invite=${inviteCode}`;
      await navigator.clipboard.writeText(link);
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleMoodSelect = (value: string, emoji: string, label: string) => {
    setPendingMoodValue(value);
    setPendingMoodEmoji(emoji);
    setPendingMoodLabel(label);
    try {
      localStorage.setItem(`weather_pending_${user?.id}`, JSON.stringify({
        value, emoji, label, date: new Date().toDateString(),
      }));
    } catch {
      // Ignore local storage write failures.
    }
  };

  const saveWeather = async () => {
    if (!user || !myWeatherSelected || !coupleId) return;
    setSavingWeather(true);
    const { error } = await supabase.from("weather_entries").insert({
      couple_id: coupleId,
      user_id: user.id,
      state: myWeatherSelected,
    });
    if (!error) {
      setMyWeatherEntry({
        id: `optimistic-${Date.now()}`,
        state: myWeatherSelected,
        user_id: user.id,
        created_at: new Date().toISOString(),
      });
    }
    setSavingWeather(false);
  };

  const handleWeatherSelect = async (key: string) => {
    setMyWeatherSelected(key);
    if (!user || !coupleId) return;
    setSavingWeather(true);
    const { error } = await supabase.from("weather_entries").insert({
      couple_id: coupleId,
      user_id: user.id,
      state: key,
    });
    if (!error) {
      setMyWeatherEntry({
        id: `optimistic-${Date.now()}`,
        state: key,
        user_id: user.id,
        created_at: new Date().toISOString(),
      });
      setWeatherPickerVisible(false);
    }
    setSavingWeather(false);
  };

  useEffect(() => {
    setMyName((current) => (fallbackBelovedValues.has(current) ? copy.beloved : current));
  }, [copy.beloved]);

  useEffect(() => {
    setNameDraft(myName);
  }, [myName]);

  useEffect(() => {
    if (!wasConnectedRef.current && relationshipConnected && partnerName) {
      wasConnectedRef.current = true;
      setShowConnectedPopup(true);
      const timeout = window.setTimeout(() => setShowConnectedPopup(false), 5200);
      return () => window.clearTimeout(timeout);
    }
    wasConnectedRef.current = relationshipConnected;
  }, [relationshipConnected, partnerName]);

  const saveNameOnHome = async () => {
    const cleanName = nameDraft.trim();
    if (!user || !cleanName || savingName) return;

    setSavingName(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, user_id: user.id, display_name: cleanName }, { onConflict: "user_id" });
    if (!error) {
      setMyName(cleanName);
      setEditingName(false);
    }
    setSavingName(false);
  };

  const sendInviteNudge = async () => {
    if (!inviteCode || nudgeSending) return;
    setNudgeSending(true);
    const reminder = lang === "fr"
      ? `Je t'attends sur Sacred Path. Entre mon code ${inviteCode} pour activer notre espace partagé.`
      : lang === "cs"
        ? `Čekám na tebe v Sacred Path. Zadej můj kód ${inviteCode} a aktivuj náš sdílený prostor.`
        : `I'm waiting for you in Sacred Path. Enter my code ${inviteCode} to activate our shared space.`;
    try {
      await navigator.clipboard.writeText(reminder);
      setNudgeSent(true);
      window.setTimeout(() => setNudgeSent(false), 3200);
    } catch {
      // ignore
    } finally {
      setNudgeSending(false);
    }
  };

  const disconnectPartnerOnHome = async () => {
    if (!user || disconnecting) return;
    setDisconnecting(true);

    // Use the same proven disconnect path used in Connect.tsx.
    markForceDisconnected(user.id);
    void supabase.from("couples").update({ partner_b: null }).eq("partner_b", user.id);
    void supabase.from("couples").update({ couple_code: `DEAD_${user.id.slice(0, 8)}` }).eq("partner_a", user.id);

    localStorage.removeItem(`sacred_path_ever_connected_${user.id}`);
    localStorage.removeItem(`sacred_path_connected_couple_id_${user.id}`);

    setRelationshipConnected(false);
    setCoupleId(null);
    setPartnerUserId(null);
    setInviteCode(null);
    setPartnerName(null);
    setMessages([]);
    setAltarItems([]);
    setMyWeatherEntry(null);
    setPartnerWeatherEntry(null);
    setMyWeatherSelected(null);
    setWeatherPickerVisible(false);
    setShowConnectedPopup(false);
    setJoinCode("");
    setJoinError("");
    setJoinSuccess("");
    wasConnectedRef.current = false;
    setDisconnecting(false);
  };

  const handlePrimaryConnectionAction = async () => {
    if (relationshipConnected) return;
    if (!inviteCode) {
      await createInviteOnHome();
      return;
    }
    await sendInviteNudge();
  };

  const weatherUi = lang === "fr"
    ? {
        sectionLabel: "MÉTÉO D'INTIMITÉ",
        sectionTitle: "Comment arrivez-vous ce soir ?",
        yourWeather: "Votre météo",
        belovedWeather: "Météo du partenaire",
        bothShared: "Les deux partagées",
        latestMatch: "Dernier match",
        tonightPath: "Chemin de ce soir",
        waitingForBeloved: `En attente de ${partnerName ?? "votre partenaire"}…`,
        yourWeatherSealed: "Votre météo est partagée",
        sealMyWeather: "Sceller ma météo",
        sealing: "Enregistrement…",
        goTemple: "Go deeper in Sacred Temple",
        readEnergies: "Read the energies",
        reconnectFirst: "Besoin de se reconnecter ? → Pratiques Reconnect",
        openTonightPath: "Ouvrir la voie de ce soir",
      }
    : lang === "cs"
      ? {
          sectionLabel: "POČASÍ INTIMITY",
          sectionTitle: "Jak dnes večer přicházíte?",
          yourWeather: "Vaše počasí",
          belovedWeather: "Počasí partnera",
          bothShared: "Oba sdíleno",
          latestMatch: "Poslední souhra",
          tonightPath: "Dnešní cesta",
          waitingForBeloved: `Čekám na sdílení od ${partnerName ?? "partnera"}…`,
          yourWeatherSealed: "Vaše počasí je uloženo",
          sealMyWeather: "Uložit moje počasí",
          sealing: "Ukládám…",
          goTemple: "Go deeper in Sacred Temple",
          readEnergies: "Read the energies",
          reconnectFirst: "Nejdřív reconnect? → Reconnect praxe",
          openTonightPath: "Otevřít dnešní cestu",
        }
      : {
          sectionLabel: "INTIMACY WEATHER",
          sectionTitle: "How are you arriving tonight?",
          yourWeather: "Your weather",
          belovedWeather: "Beloved weather",
          bothShared: "Both shared",
          latestMatch: "Latest match",
          tonightPath: "Tonight's path",
          waitingForBeloved: `Waiting for ${partnerName ?? "your beloved"} to share their weather…`,
          yourWeatherSealed: "Your weather sealed",
          sealMyWeather: "Seal my weather",
          sealing: "Sealing…",
          goTemple: "Go deeper in Sacred Temple",
          readEnergies: "Read the energies",
          reconnectFirst: "Need to reconnect first? → Reconnect practices",
          openTonightPath: "Open tonight's path",
        };

  const weatherMoods = useMemo(
    () => WEATHER_KEYS.map((key) => getWeatherPresentation(key, lang)),
    [lang],
  );

  const myMood = myWeatherEntry ? getWeatherPresentation(myWeatherEntry.state, lang) : null;
  const partnerMood = partnerWeatherEntry ? getWeatherPresentation(partnerWeatherEntry.state, lang) : null;
  const activeTonightExperience = useMemo(
    () => deriveActiveTonightExperience(myWeatherEntry?.state, partnerWeatherEntry?.state, lang),
    [lang, myWeatherEntry?.state, partnerWeatherEntry?.state],
  );
  const sharedMainCardState = useSelectedDailyMainCard({
    partnerAWeather: myWeatherEntry?.state,
    partnerBWeather: partnerWeatherEntry?.state,
    coupleId,
  });
  const tonightPathStatus = useMemo(
    () =>
      deriveTonightPathStatus({
        lang,
        isConnected: relationshipConnected,
        userWeatherSelected: Boolean(myWeatherEntry),
        belovedWeatherSelected: Boolean(partnerWeatherEntry),
        partnerName,
      }),
    [lang, myWeatherEntry, partnerName, partnerWeatherEntry, relationshipConnected],
  );
  const bothCheckedIn = tonightPathStatus.isTonightPathReady;
  const weatherMatch = activeTonightExperience.weatherMatch;

  const weatherCardState: "picker" | "mine_only" | "both" =
    weatherPickerVisible || !myWeatherEntry
      ? "picker"
      : bothCheckedIn
      ? "both"
      : "mine_only";

  const shareMood = useMemo(() => {
    if (myWeatherSelected) {
      return getWeatherPresentation(myWeatherSelected, lang);
    }
    if (pendingMoodValue) {
      return {
        key: pendingMoodValue,
        label: pendingMoodLabel,
        emoji: pendingMoodEmoji,
      };
    }
    return null;
  }, [lang, myWeatherSelected, pendingMoodEmoji, pendingMoodLabel, pendingMoodValue]);

  const inviteShareText = useMemo(() => {
    if (!inviteCode) return "";
    return lang === "fr"
      ? `J'ai ouvert notre espace Sacred Path. Utilise ce code: ${inviteCode}. Je t'attends pour notre rituel de ce soir.`
      : lang === "cs"
        ? `Otevřel(a) jsem náš Sacred Path prostor. Použij tento kód: ${inviteCode}. Čekám na tebe na dnešní rituál.`
        : `I opened our Sacred Path space. Use this code: ${inviteCode}. I am waiting for you for tonight's ritual.`;
  }, [inviteCode, lang]);

  const inviteShareLink = useMemo(
    () => (inviteCode ? `${window.location.origin}/app?invite=${inviteCode}` : ""),
    [inviteCode],
  );

  const weatherShareText = useMemo(() => {
    if (!shareMood) return "";
    const withCode = inviteCode ? ` Code: ${inviteCode}.` : "";
    return lang === "fr"
      ? `Ma météo d'intimité ce soir: ${shareMood.emoji} ${shareMood.label}.${withCode} Viens partager la tienne dans Sacred Path pour révéler notre rituel.`
      : lang === "cs"
        ? `Moje intimní počasí pro dnešní večer: ${shareMood.emoji} ${shareMood.label}.${withCode} Přijď sdílet svoje v Sacred Path a odemkneme náš rituál.`
        : `My intimacy weather tonight: ${shareMood.emoji} ${shareMood.label}.${withCode} Come share yours in Sacred Path so we can unlock our ritual.`;
  }, [inviteCode, lang, shareMood]);

  const inviteWhatsAppHref = inviteShareText
    ? `https://wa.me/?text=${encodeURIComponent(`${inviteShareText}\n${inviteShareLink}`.trim())}`
    : "#";
  const inviteSmsHref = inviteShareText
    ? `sms:?body=${encodeURIComponent(`${inviteShareText}\n${inviteShareLink}`.trim())}`
    : "#";

  const weatherWhatsAppHref = weatherShareText
    ? `https://wa.me/?text=${encodeURIComponent(weatherShareText)}`
    : "#";
  const weatherSmsHref = weatherShareText
    ? `sms:?body=${encodeURIComponent(weatherShareText)}`
    : "#";

  const featuredPathTitle = bothCheckedIn
    ? sharedMainCardState.selectedDailyMainCard?.title ?? "No mapped ritual"
    : dailyCards[0]?.title ?? copy.selecting;
  const featuredPathDescription = bothCheckedIn
    ? sharedMainCardState.selectedDailyMainCard?.description ?? "No mapped weather ritual for this pair."
    : dailyCards[0]?.description ?? copy.calibrating;
  const featuredPathLabel = weatherUi.tonightPath;
  const tonightRitual = sharedMainCardState.selectedDailyMainCard;
  const tonightRitualTitle = tonightRitual?.title ?? (bothCheckedIn ? "No mapped ritual" : dailyCards[0]?.title ?? copy.selecting);
  const tonightRitualDescription = tonightRitual?.description ?? featuredPathDescription;
  const tonightRitualSteps = tonightRitual?.ritualSteps?.slice(0, 3) ?? (bothCheckedIn ? [] : dailyCards[0]?.steps?.slice(0, 3) ?? []);
  const waitingPathCopy = tonightPathStatus.waitingBody;
  const enterTonightPathLabel = lang === "fr"
    ? "Entrer dans le chemin de ce soir"
    : lang === "cs"
      ? "Vstoupit do dnešní cesty"
      : "Enter Tonight's Path";
  const rotatingQuote = useMemo(
    () => pickBySeed(quotes, `${todayKey}:home-end-quote`),
    [quotes, todayKey],
  );
  const dailyQuoteCard = (
    <div className="rounded-[20px] border border-amber-300/20 bg-amber-500/6 p-5 text-center">
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-amber-300/70">
        {lang === "fr" ? "Citation du jour" : lang === "cs" ? "Citát dne" : "Daily quote"}
      </p>
      <p className="mx-auto max-w-2xl font-display text-lg italic leading-8 text-foreground/80">
        “{rotatingQuote.quote}”
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground/65">{rotatingQuote.author}</p>
    </div>
  );

  const copyWeatherShare = async () => {
    if (!weatherShareText) return;
    try {
      await navigator.clipboard.writeText(weatherShareText);
      setCopiedWeather(true);
      window.setTimeout(() => setCopiedWeather(false), 2000);
    } catch {
      // ignore
    }
  };

  const connectedPanelUi = lang === "fr"
    ? {
        label: "Connectés",
        stayHere: "Restez ici et ouvrez les cartes rituelles de ce soir ci-dessous.",
        partnerConnected: `${partnerName ?? "Votre partenaire"} est connecté(e).`,
        codeLabel: "Code de connexion",
        disconnect: "Se déconnecter",
      }
    : lang === "cs"
      ? {
          label: "Společně propojeni",
          stayHere: "Zůstaňte zde a otevřete níže dnešní rituální karty.",
          partnerConnected: `${partnerName ?? "Partner"} je propojený.`,
          codeLabel: "Párovací kód",
          disconnect: "Odpojit partnera",
        }
      : {
          label: "Connected together",
          stayHere: "Stay here and open tonight's ritual cards below.",
          partnerConnected: `${partnerName ?? "Your partner"} is connected.`,
          codeLabel: "Connection code",
          disconnect: "Disconnect",
        };
  const connectedTogetherBody = lang === "fr"
    ? `${partnerName ?? "Votre partenaire"} est connecté(e). Restez ici et retrouvez-vous avec présence, patience et douceur. Que ce soir commence par l'écoute, le respect des émotions, et un premier pas tendre l'un vers l'autre.`
    : lang === "cs"
      ? `${partnerName ?? "Partner"} je propojený(á). Zůstaňte tady a setkejte se s přítomností, trpělivostí a péčí. Ať dnešní večer začne nasloucháním, respektem k pocitům a jedním jemným krokem k sobě.`
      : "Your partner is here with you. Take a breath before choosing. Tonight is not about performing, it is about noticing, respecting, and meeting each other honestly.";

  // ── New simplified weather chips for home-page card ──────────────
  const homeWeatherChips = [
    { key: "stormy",   group: "distant", label: "Stormy",   Icon: Zap,       iconClass: "text-slate-300"  },
    { key: "foggy",    group: "distant", label: "Foggy",    Icon: Cloud,     iconClass: "text-slate-300"  },
    { key: "frozen",   group: "distant", label: "Frozen",   Icon: Snowflake, iconClass: "text-sky-300"    },
    { key: "warm",     group: "bonded",  label: "Warm",     Icon: Heart,     iconClass: "text-rose-400"   },
    { key: "electric", group: "bonded",  label: "Electric", Icon: Zap,       iconClass: "text-violet-400" },
    { key: "sunny",    group: "bonded",  label: "Sunny",    Icon: SunMedium, iconClass: "text-amber-400"  },
  ] as const;

  return (
    <div className="space-y-5">
      {/* Connected toast */}
      {showConnectedPopup && relationshipConnected && partnerName && (
        <div className="fixed left-1/2 top-4 z-50 w-[min(92vw,560px)] -translate-x-1/2 animate-in slide-in-from-top-4 fade-in duration-500">
          <div className="rounded-2xl border border-emerald-300/40 bg-emerald-950/85 px-4 py-3 shadow-[0_16px_45px_-28px_rgba(16,185,129,0.65)] backdrop-blur">
            <p className="text-sm text-emerald-100">
              <span className="font-semibold">{partnerName}</span> is connected — start exploring rituals that bring you closer.
            </p>
          </div>
        </div>
      )}

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[28px] border border-amber-400/20 bg-[#0d0920] px-5 pb-8 pt-8 text-center shadow-[0_28px_90px_-55px_rgba(251,191,36,0.45)]">
        {/* Sacred geometry rings */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-15">
          <div className="absolute h-64 w-64 rounded-full border border-amber-400/40" />
          <div className="absolute h-48 w-48 rounded-full border border-amber-400/30" />
          <div className="absolute h-32 w-32 rounded-full border border-amber-400/25" />
          <div className="absolute h-96 w-96 rounded-full border border-amber-400/20" />
        </div>
        {/* Glow halos */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 left-1/4 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 right-1/4 h-32 w-32 rounded-full bg-rose-500/10 blur-3xl" />

        {/* Couple + energy glyph */}
        <div className="relative mx-auto mb-4 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
            <img src={shivaShaktiIcon} alt="" className="h-10 w-10 object-contain" />
          </div>
          <img
            src={shivaShaktiIcon}
            alt="Sacred couple"
            className="h-28 w-28 object-contain opacity-85 drop-shadow-[0_0_20px_rgba(251,191,36,0.35)]"
          />
        </div>

        {/* Title */}
        <h1 className="relative font-display text-2xl font-bold uppercase tracking-[0.08em] text-amber-400 md:text-3xl">
          {lang === "fr"
            ? "COMMENCEZ VOTRE VOYAGE SACRÉ ENSEMBLE"
            : lang === "cs"
              ? "ZAČNĚTE SVOU POSVÁTNOU CESTU SPOLU"
              : "BEGIN YOUR SACRED JOURNEY TOGETHER"}
        </h1>
        <p className="relative mt-2 text-sm text-muted-foreground/80">
          {lang === "fr"
            ? "Un chemin conscient pour un amour plus profond & une connexion plus vraie."
            : lang === "cs"
              ? "Vědomá cesta k hlubší lásce & spojení."
              : "A Conscious Path for Deeper Love & Connection."}
        </p>

        {/* Name badge */}
        {(myName || partnerName) && (
          <div className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-500/8 px-4 py-1.5">
            <span className="text-sm text-foreground/80">{myName}</span>
            {relationshipConnected && partnerName && (
              <>
                <span className="text-amber-400/50">•</span>
                <span className="text-sm text-foreground/80">{partnerName}</span>
                <Heart className="h-3.5 w-3.5 fill-current text-rose-400" />
              </>
            )}
          </div>
        )}
      </section>

      {/* ── THREE FEATURE CARDS ───────────────────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-3">

        {/* LEFT — Intimacy Weather */}
        <Link to="/app/space" className="group block">
          <div className="relative overflow-hidden rounded-2xl border border-amber-400/25 bg-[#0d0920] transition-all hover:border-amber-400/45 hover:shadow-[0_0_30px_-10px_rgba(251,191,36,0.35)]">
            {/* Corner ornaments */}
            <span className="pointer-events-none absolute left-2 top-2 z-10 h-3 w-3 border-l-2 border-t-2 border-amber-400/50" />
            <span className="pointer-events-none absolute right-2 top-2 z-10 h-3 w-3 border-r-2 border-t-2 border-amber-400/50" />
            <span className="pointer-events-none absolute bottom-2 left-2 z-10 h-3 w-3 border-b-2 border-l-2 border-amber-400/50" />
            <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-3 w-3 border-b-2 border-r-2 border-amber-400/50" />

            {/* Card image */}
            <div className="relative h-56 overflow-hidden rounded-t-2xl">
              <img src={shivaShaktiIcon} alt="Intimacy Weather" className="h-full w-full object-cover opacity-90" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d0920] to-transparent" />
            </div>

            {/* Card content */}
            <div className="p-4 pb-5">
              <h3 className="font-display text-xl text-foreground">
                {lang === "fr" ? "Météo d'intimité" : lang === "cs" ? "Počasí intimity" : "Intimacy Weather"}
              </h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground/70">
                {lang === "fr"
                  ? "Vérifiez votre climat interne et la résonance de votre partenaire."
                  : lang === "cs"
                    ? "Zkontrolujte své vnitřní klima a rezonanci partnera."
                    : "Check your internal climate and partner resonance."}
              </p>

              {/* Distant chips */}
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                {homeWeatherChips.filter(c => c.group === "distant").map(chip => {
                  const Icon = chip.Icon;
                  return (
                    <div key={chip.key} className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-center">
                      <Icon className={`mx-auto mb-0.5 h-3 w-3 ${chip.iconClass} opacity-60`} />
                      <p className="text-[9px] font-semibold text-foreground/60">{chip.label}</p>
                    </div>
                  );
                })}
              </div>
              {/* Bonded chips */}
              <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                {homeWeatherChips.filter(c => c.group === "bonded").map(chip => {
                  const Icon = chip.Icon;
                  return (
                    <div key={chip.key} className="rounded-lg border border-amber-400/20 bg-amber-500/8 p-2 text-center">
                      <Icon className={`mx-auto mb-0.5 h-3 w-3 ${chip.iconClass}`} />
                      <p className="text-[9px] font-semibold text-amber-300/80">{chip.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Link>

        {/* CENTER — Shared Rituals */}
        <Link to="/app/rituals" className="group block">
          <div className="relative overflow-hidden rounded-2xl border border-amber-400/25 bg-[#0d0920] transition-all hover:border-amber-400/45 hover:shadow-[0_0_30px_-10px_rgba(251,191,36,0.35)]">
            <span className="pointer-events-none absolute left-2 top-2 z-10 h-3 w-3 border-l-2 border-t-2 border-amber-400/50" />
            <span className="pointer-events-none absolute right-2 top-2 z-10 h-3 w-3 border-r-2 border-t-2 border-amber-400/50" />
            <span className="pointer-events-none absolute bottom-2 left-2 z-10 h-3 w-3 border-b-2 border-l-2 border-amber-400/50" />
            <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-3 w-3 border-b-2 border-r-2 border-amber-400/50" />

            {/* Ritual art header */}
            <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-b from-[#1a1035] to-[#0d0920]">
              <div className="flex items-end gap-4 px-4">
                <div className="flex h-14 w-8 flex-col items-center">
                  <div className="h-10 w-1 rounded-full bg-gradient-to-t from-amber-500 to-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
                  <div className="h-4 w-4 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
                </div>
                <div className="h-10 w-10 rounded-full border border-amber-400/30 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.2)] flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full border border-amber-400/40 bg-amber-400/5" />
                </div>
                <div className="flex h-12 w-9 items-end justify-center rounded-t-sm border-x border-t border-amber-400/20 bg-amber-500/5">
                  <div className="mb-1 h-1 w-6 rounded bg-amber-400/30" />
                </div>
                <div className="h-5 w-5 rotate-45 border border-violet-400/50 bg-violet-500/15 shadow-[0_0_8px_rgba(167,139,250,0.4)]" />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0d0920] to-transparent" />
            </div>

            <div className="p-4 pb-5">
              <h3 className="font-display text-xl text-foreground">
                {lang === "fr" ? "Rituels partagés —" : lang === "cs" ? "Sdílené rituály —" : "Shared Rituals —"}
              </h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground/70">
                {lang === "fr"
                  ? "Créez des connexions significatives par la pratique commune."
                  : lang === "cs"
                    ? "Budujte smysluplné propojení sdílenou praxí."
                    : "Design meaningful connections through shared practice."}
              </p>

              {/* Ritual chips */}
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                {[
                  { icon: "🕯️", label: lang === "fr" ? "Partage à la bougie" : lang === "cs" ? "Při svíčce" : "Candlelight Sharing" },
                  { icon: "🎵", label: lang === "fr" ? "Son sacré" : lang === "cs" ? "Posvátný zvuk" : "Sacred Sound" },
                  { icon: "🌿", label: lang === "fr" ? "Souffle sacré" : lang === "cs" ? "Posvátný dech" : "Sacred Breath" },
                  { icon: "💎", label: lang === "fr" ? "Contact conscient" : lang === "cs" ? "Vědomý dotek" : "Conscious Touch" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 rounded-lg border border-amber-400/15 bg-amber-500/5 px-2 py-1.5">
                    <span className="text-xs">{icon}</span>
                    <p className="text-[9px] font-semibold text-foreground/60 leading-tight">{label}</p>
                  </div>
                ))}
              </div>

              {/* Tagline box */}
              <div className="relative mt-3 rounded-xl border border-amber-400/25 bg-amber-500/6 px-3 py-3 text-center">
                <span className="pointer-events-none absolute left-2 top-2 h-2 w-2 border-l border-t border-amber-400/60" />
                <span className="pointer-events-none absolute right-2 top-2 h-2 w-2 border-r border-t border-amber-400/60" />
                <span className="pointer-events-none absolute bottom-2 left-2 h-2 w-2 border-b border-l border-amber-400/60" />
                <span className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 border-b border-r border-amber-400/60" />
                <p className="text-[9px] font-bold uppercase leading-[1.6] tracking-[0.12em] text-amber-300/90">
                  {lang === "fr"
                    ? "CHOISISSEZ CALMEMENT.\nSENTEZ HONNÊTEMENT.\nDEMANDEZ DOUCEMENT.\nLAISSEZ VOTRE PARTENAIRE CHOISIR AVEC RESPECT."
                    : lang === "cs"
                      ? "VOLTE KLIDNĚ.\nCÍŤTE UPŘÍMNĚ.\nPTEJTE SE JEMNĚ.\nNECHTE PARTNERA VYBRAT S RESPEKTEM."
                      : "CHOOSE CALMLY.\nSENSE HONESTLY.\nASK GENTLY.\nLET YOUR PARTNER\nCHOOSE WITH RESPECT."}
                </p>
              </div>

              <p className="mt-3 text-center font-display text-sm font-bold tracking-wide text-amber-400/80">
                {lang === "fr" ? "DEUX ÉNERGIES. UN SEUL VOYAGE." : lang === "cs" ? "DVĚ ENERGIE. JEDNA CESTA." : "TWO ENERGIES. ONE JOURNEY."}
              </p>
              <p className="mt-1 text-center text-[10px] text-muted-foreground/55">
                {lang === "fr" ? "Commencez la journée avec Présence Consciente." : lang === "cs" ? "Začněte den s vědomou přítomností." : "Start the Day with Conscious Presence."}
              </p>
            </div>
          </div>
        </Link>

        {/* RIGHT — Cosmic Connection */}
        <Link to="/app/paths" className="group block">
          <div className="relative overflow-hidden rounded-2xl border border-amber-400/25 bg-[#0d0920] transition-all hover:border-amber-400/45 hover:shadow-[0_0_30px_-10px_rgba(251,191,36,0.35)]">
            <span className="pointer-events-none absolute left-2 top-2 z-10 h-3 w-3 border-l-2 border-t-2 border-amber-400/50" />
            <span className="pointer-events-none absolute right-2 top-2 z-10 h-3 w-3 border-r-2 border-t-2 border-amber-400/50" />
            <span className="pointer-events-none absolute bottom-2 left-2 z-10 h-3 w-3 border-b-2 border-l-2 border-amber-400/50" />
            <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-3 w-3 border-b-2 border-r-2 border-amber-400/50" />

            {/* Sacred geometry mandala */}
            <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-b from-[#0a0520] to-[#0d0920]">
              {/* Outer rings */}
              {[64, 52, 40, 28, 18].map((size, i) => (
                <div key={i} className="absolute rounded-full border border-amber-400/20" style={{ width: `${size * 4}px`, height: `${size * 4}px` }} />
              ))}
              {/* Chakra nodes */}
              {[
                { color: "bg-violet-500", x: 0, y: -88 },
                { color: "bg-indigo-400", x: 76, y: -44 },
                { color: "bg-sky-400", x: 76, y: 44 },
                { color: "bg-emerald-400", x: 0, y: 88 },
                { color: "bg-yellow-400", x: -76, y: 44 },
                { color: "bg-orange-400", x: -76, y: -44 },
                { color: "bg-rose-500", x: 0, y: 0 },
              ].map(({ color, x, y }, i) => (
                <div
                  key={i}
                  className={`absolute h-4 w-4 rounded-full ${color} shadow-[0_0_10px_currentColor]`}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                />
              ))}
              {/* Center diamond */}
              <div className="relative z-10 h-8 w-8 rotate-45 border-2 border-amber-400/60 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.5)]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0d0920] to-transparent" />
            </div>

            <div className="p-4 pb-5">
              <h3 className="font-display text-xl text-foreground">
                {lang === "fr" ? "Connexion Cosmique" : lang === "cs" ? "Kosmické Propojení" : "Cosmic Connection"}
              </h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground/70">
                {lang === "fr"
                  ? "Découvrez des voies spirituelles et astrologiques sur mesure."
                  : lang === "cs"
                    ? "Objevte přizpůsobené duchovní a astrologické cesty."
                    : "Discover tailored spiritual and astrological pathways."}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Tantra", "Tao", "Polarity", "Kama", "Slow Sex"].map(path => (
                  <span key={path} className="rounded-full border border-violet-400/20 bg-violet-500/8 px-2 py-0.5 text-[9px] text-violet-300/70">{path}</span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* ── PARTNER CONNECTION (when not connected) ───────────────────── */}
      {!relationshipConnected && !loading && (
        <section className="rounded-2xl border border-amber-400/20 bg-[#0d0920] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/70">
            {lang === "fr" ? "CONNECTEZ-VOUS AVEC VOTRE PARTENAIRE" : lang === "cs" ? "PROPOJTE SE S PARTNEREM" : "CONNECT WITH YOUR BELOVED"}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {/* Generate code */}
            <div className="rounded-xl border border-border/25 bg-white/[0.03] p-4">
              <p className="text-xs text-muted-foreground/70">
                {lang === "fr" ? "Invitez votre partenaire" : lang === "cs" ? "Pozvěte partnera" : "Invite your partner"}
              </p>
              <button
                type="button"
                onClick={() => void handlePrimaryConnectionAction()}
                disabled={generatingCode || nudgeSending}
                className="mt-3 w-full rounded-xl border border-amber-400/30 bg-amber-500/10 py-2.5 text-xs font-semibold uppercase tracking-widest text-amber-300 transition-all hover:border-amber-400/50 disabled:opacity-50"
              >
                {!inviteCode ? (generatingCode ? "..." : (lang === "fr" ? "Générer un code" : lang === "cs" ? "Vytvořit kód" : "Generate a code")) : (nudgeSending ? "..." : (lang === "fr" ? "Envoyer une relance" : lang === "cs" ? "Odeslat připomínku" : "Send a nudge"))}
              </button>
              {inviteCode && (
                <div className="mt-2 flex items-center gap-2 rounded-lg border border-border/25 bg-background/30 px-3 py-1.5">
                  <span className="flex-1 font-display text-base tracking-[0.25em] text-foreground">{inviteCode}</span>
                  <button type="button" onClick={handleCopyCode} className="text-[10px] text-amber-300/80">{copiedInvite ? "✓" : "Copy"}</button>
                </div>
              )}
            </div>
            {/* Join code */}
            <div className="rounded-xl border border-border/25 bg-white/[0.03] p-4">
              <p className="text-xs text-muted-foreground/70">
                {lang === "fr" ? "Vous avez un code ?" : lang === "cs" ? "Máte partnerský kód?" : "Have your partner's code?"}
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  value={joinCode}
                  onChange={e => setJoinCode(e.target.value.toUpperCase())}
                  placeholder={lang === "fr" ? "Entrez le code" : lang === "cs" ? "Zadejte kód" : "Enter code"}
                  className="h-10 flex-1 rounded-xl border border-border/35 bg-background/45 px-3 text-sm tracking-[0.15em] text-foreground outline-none focus:border-amber-400/35 placeholder:text-muted-foreground/50 placeholder:tracking-normal"
                />
                <button
                  type="button"
                  onClick={() => void joinWithCodeOnHome()}
                  disabled={joiningCode || !joinCode.trim()}
                  className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 text-xs text-amber-300 transition-all hover:bg-amber-500/20 disabled:opacity-50"
                >
                  {joiningCode ? "..." : "→"}
                </button>
              </div>
              {joinError && <p className="mt-1.5 text-[10px] text-red-300/80">{joinError}</p>}
              {joinSuccess && <p className="mt-1.5 text-[10px] text-emerald-300/80">{joinSuccess}</p>}
            </div>
          </div>
        </section>
      )}

      {/* ── SHIVA / SHAKTI BALANCE ────────────────────────────────────── */}
      <section className="rounded-2xl border border-amber-400/20 bg-[#0d0920] p-5">
        <h2 className="mb-4 text-center text-xs font-bold uppercase tracking-[0.3em] text-amber-400/80">
          {lang === "fr" ? "L'ÉQUILIBRE SHIVA / SHAKTI" : lang === "cs" ? "ROVNOVÁHA ŠIVA / ŠAKTI" : "THE SHIVA/SHAKTI BALANCE"}
        </h2>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3">
          {/* Shiva */}
          <div className="flex flex-col items-center gap-2 rounded-xl border border-amber-400/15 bg-white/[0.03] p-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/25 bg-gradient-to-b from-[#241845] to-[#1a1035] shadow-[0_0_20px_rgba(251,191,36,0.15)]">
              <span className="text-xl">🌙</span>
            </div>
            {!editingName ? (
              <button type="button" onClick={() => setEditingName(true)} className="font-display text-base text-foreground hover:text-amber-300 transition-colors">
                {myName}
              </button>
            ) : (
              <div className="flex flex-col gap-1.5 w-full">
                <input value={nameDraft} onChange={e => setNameDraft(e.target.value)} maxLength={40} className="h-7 w-full rounded-lg border border-border/35 bg-background/45 px-2 text-center text-sm text-foreground outline-none focus:border-amber-400/35" />
                <div className="flex gap-1">
                  <button type="button" onClick={saveNameOnHome} disabled={savingName || !nameDraft.trim()} className="flex-1 rounded-lg border border-amber-400/30 bg-amber-400/10 py-1 text-[10px] text-amber-300 disabled:opacity-50">{savingName ? "..." : "Save"}</button>
                  <button type="button" onClick={() => { setEditingName(false); setNameDraft(myName); }} className="rounded-lg border border-border/30 px-2 py-1 text-[10px] text-muted-foreground">✕</button>
                </div>
              </div>
            )}
            <p className="text-[9px] uppercase tracking-[0.2em] text-amber-400/50">SHIVA · {lang === "fr" ? "Le Consort" : lang === "cs" ? "Consort" : "The Consort"}</p>
          </div>

          {/* Center pillar */}
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent" />
            <div className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent" />
          </div>

          {/* Shakti */}
          <div className="flex flex-col items-center gap-2 rounded-xl border border-amber-400/15 bg-white/[0.03] p-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-rose-400/25 bg-gradient-to-b from-[#2a1040] to-[#1a1035] shadow-[0_0_20px_rgba(251,113,133,0.15)]">
              <span className="text-xl">☀️</span>
            </div>
            <p className="font-display text-base text-foreground">
              {partnerName ?? (lang === "fr" ? "Votre Bien-aimé(e)" : lang === "cs" ? "Váš Milovaný" : "Your Beloved")}
            </p>
            {relationshipConnected && (
              <span className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-300">
                {lang === "fr" ? "Connecté(e)" : lang === "cs" ? "Propojeni" : "Connected"}
              </span>
            )}
            <p className="text-[9px] uppercase tracking-[0.2em] text-rose-400/50">SHAKTI · {lang === "fr" ? "La Création" : lang === "cs" ? "Stvoření" : "The Creation"}</p>
          </div>
        </div>

        {/* Disconnect option */}
        {relationshipConnected && (
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={() => void disconnectPartnerOnHome()}
              disabled={disconnecting}
              className="text-[10px] text-muted-foreground/50 underline underline-offset-2 transition-colors hover:text-rose-300/70 disabled:opacity-50"
            >
              {disconnecting ? "..." : (lang === "fr" ? "Déconnecter" : lang === "cs" ? "Odpojit" : "Disconnect")}
            </button>
          </div>
        )}
      </section>

      {/* ── PREMIUM UPSELL ───────────────────────────────────────────── */}
      {entitlementResolved && !hasPremiumAccess && (
        <section className="rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-500/10 via-card/65 to-rose-500/10 p-5 shadow-[0_24px_70px_-50px_rgba(251,191,36,0.5)]">
          <div className="flex items-center gap-2 text-amber-200/90">
            <Lock className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.16em]">Go deeper together</span>
          </div>
          <h3 className="mt-2 font-display text-2xl text-foreground">One subscription, shared by both partners.</h3>
          <p className="mt-3 text-sm leading-6 text-foreground/90">
            Unlock longer rituals, sensual repair paths, and guided practices that help you reconnect with more tenderness, honesty, and desire.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Longer rituals</span>
            <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Repair pathways</span>
            <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">Guided intimacy</span>
          </div>
          <Link to="/pricing" className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-300/35 bg-amber-500/15 px-3 py-2 text-sm text-foreground transition-all hover:border-amber-300/55 hover:bg-amber-500/22">
            Explore premium for both partners
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      )}
    </div>
  );
};

export default AppHome;
