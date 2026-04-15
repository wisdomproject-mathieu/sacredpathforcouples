import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Heart,
  HeartHandshake,
  Lock,
  MessageCircle,
  Sparkles,
  Stars,
  type LucideIcon,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import {
  fetchCoupleStateForUser,
  markEverConnected,
  readConnectedCoupleId,
  readEverConnected,
  storeConnectedCoupleId,
} from "@/lib/couples";
import { buildWeatherMatchResult, getWeatherPresentation, type WeatherKey } from "@/lib/weatherMatch";
import { getEffectiveMembershipTier, isPremiumTier } from "@/lib/Premium";

type RitualItem = Tables<"ritual_items">;
type Pathway = Tables<"pathways">;
type PartnerMessage = Tables<"partner_messages">;
type AltarItem = Tables<"altar_items">;
type Profile = Tables<"profiles">;

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

type SavedMap = Record<string, boolean>;

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

const SAVED_CARDS_KEY = "sacredpath_home_saved_cards_v1";

const readSavedCards = (): SavedMap => {
  try {
    const raw = window.localStorage.getItem(SAVED_CARDS_KEY);
    return raw ? (JSON.parse(raw) as SavedMap) : {};
  } catch {
    return {};
  }
};

const writeSavedCards = (value: SavedMap) => {
  window.localStorage.setItem(SAVED_CARDS_KEY, JSON.stringify(value));
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
  const hasPremiumAccess = isPremiumTier(getEffectiveMembershipTier(user));
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
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [savedCards, setSavedCards] = useState<SavedMap>({});
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [myWeatherEntry, setMyWeatherEntry] = useState<{ state: string; user_id: string } | null>(null);
  const [partnerWeatherEntry, setPartnerWeatherEntry] = useState<{ state: string; user_id: string } | null>(null);
  const [myWeatherSelected, setMyWeatherSelected] = useState<string | null>(null);
  const [savingWeather, setSavingWeather] = useState(false);
  const [weatherPickerVisible, setWeatherPickerVisible] = useState(false);

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
        .update({ display_name: name.trim() })
        .eq("user_id", user.id);
    }
  };

  useEffect(() => {
    if (!user) return;
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

      if (!activeCouple || !coupleState.connected) {
        setRelationshipConnected(false);
        setCoupleId(null);
        setPartnerName(null);
        setMessages([]);
        setAltarItems([]);
        setMyWeatherEntry(null);
        setPartnerWeatherEntry(null);
        setMyWeatherSelected(null);
        setWeatherPickerVisible(false);
        setLoading(false);
        return;
      }

      if (coupleState.connected) {
        markEverConnected(user.id);
        storeConnectedCoupleId(user.id, activeCouple.id);
      }
      const connected = coupleState.connected;
      setRelationshipConnected(connected);

      setCoupleId(activeCouple.id);

      // Load today's weather entries
      const todayStr = new Date().toISOString().slice(0, 10);
      const { data: weatherData } = await supabase
        .from("weather_entries")
        .select("state, user_id")
        .eq("couple_id", activeCouple.id)
        .gte("created_at", todayStr)
        .order("created_at", { ascending: false });

      if (weatherData) {
        const myW = weatherData.find((w: { state: string; user_id: string }) => w.user_id === user.id) ?? null;
        const partnerW = weatherData.find((w: { state: string; user_id: string }) => w.user_id !== user.id) ?? null;
        setMyWeatherEntry(myW);
        setPartnerWeatherEntry(partnerW);
        if (myW?.state) setMyWeatherSelected(myW.state);
      }

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
  }, [hasPremiumAccess, user]);

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
    setSavedCards(readSavedCards());
  }, [todayKey]);

  const handleSaveCard = (cardId: string) => {
    const next = { ...savedCards, [cardId]: !savedCards[cardId] };
    setSavedCards(next);
    writeSavedCards(next);
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
      setMyWeatherEntry({ state: myWeatherSelected, user_id: user.id });
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
      setMyWeatherEntry({ state: key, user_id: user.id });
      setWeatherPickerVisible(false);
    }
    setSavingWeather(false);
  };

  useEffect(() => {
    setMyName((current) => (fallbackBelovedValues.has(current) ? copy.beloved : current));
  }, [copy.beloved]);

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
  const bothCheckedIn = Boolean(myWeatherEntry && partnerWeatherEntry);
  const weatherMatch = useMemo(
    () =>
      bothCheckedIn && myWeatherEntry && partnerWeatherEntry
        ? buildWeatherMatchResult(myWeatherEntry.state, partnerWeatherEntry.state, lang)
        : null,
    [bothCheckedIn, lang, myWeatherEntry, partnerWeatherEntry],
  );

  const weatherCardState: "picker" | "mine_only" | "both" =
    weatherPickerVisible || !myWeatherEntry
      ? "picker"
      : bothCheckedIn && weatherMatch
      ? "both"
      : "mine_only";

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Block 1: Hero greeting */}
      <div className="rounded-[24px] border border-border/20 bg-card/30 p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground/60">
          {todayLabel}
        </p>
        <h1 className="mt-2 font-display text-3xl text-foreground">
          {myName}
          <span className="text-amber-400/60"> &amp; </span>
          {partnerName ?? copy.partnerFallback}
        </h1>
        <p className="mt-1 text-sm italic text-muted-foreground/70">
          {relationshipConnected ? copy.journeyLine : copy.notConnectedLine}
        </p>
      </div>

      {/* Block 2: Intimacy Weather — single unified card */}
      {relationshipConnected && (
        <div className="overflow-hidden rounded-[24px] border border-amber-400/20 bg-card/50">

          {/* STATE A: picker — user hasn't sealed weather today, or wants to change */}
          {weatherCardState === "picker" && (
            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-amber-400/70">
                {weatherUi.sectionLabel}
              </p>
              <h3 className="mt-2 font-display text-xl text-foreground">
                {weatherUi.sectionTitle}
              </h3>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {weatherMoods.map((mood) => {
                  const active = myWeatherSelected === mood.key;
                  return (
                    <button
                      key={mood.key}
                      type="button"
                      disabled={savingWeather}
                      onClick={() => handleWeatherSelect(mood.key)}
                      className={`flex flex-col items-center gap-1.5 rounded-[12px] border px-2 py-3 text-center transition-all disabled:opacity-50 ${
                        active
                          ? "border-amber-400/50 bg-amber-400/15"
                          : "border-border/30 bg-background/40 hover:border-amber-400/40 hover:bg-amber-400/10"
                      }`}
                    >
                      <span className="text-xl">{mood.emoji}</span>
                      <span className="text-[11px] leading-tight text-muted-foreground">{mood.label}</span>
                    </button>
                  );
                })}
              </div>
              {savingWeather && (
                <p className="mt-3 text-xs text-muted-foreground/60">{weatherUi.sealing}</p>
              )}
            </div>
          )}

          {/* STATE B: mine only — user sealed, waiting for partner */}
          {weatherCardState === "mine_only" && myMood && (
            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-amber-400/70">
                {weatherUi.sectionLabel}
              </p>
              <div className="mt-3 flex gap-3">
                <div className="flex-1 rounded-[14px] bg-background/40 p-3">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {weatherUi.yourWeather}
                  </p>
                  <p className="mt-1 font-display text-lg">
                    {myMood.emoji} {myMood.label}
                  </p>
                </div>
                <div className="flex-1 rounded-[14px] border border-dashed border-border/30 p-3">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {weatherUi.belovedWeather}
                  </p>
                  <p className="mt-1 text-sm italic text-muted-foreground/50">
                    {partnerName ? `Waiting for ${partnerName}…` : weatherUi.waitingForBeloved}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STATE C: both — the beautiful combined view */}
          {weatherCardState === "both" && myMood && partnerMood && weatherMatch && (
            <div>
              {/* Top row: both weathers + artwork */}
              <div className="flex items-stretch">
                <div className="flex-1 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-amber-400/70">
                    {weatherUi.sectionLabel}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground/60">
                        {weatherUi.yourWeather}
                      </p>
                      <p className="font-display text-lg">
                        {myMood.emoji} {myMood.label}
                      </p>
                    </div>
                    <span className="text-xl text-amber-400/40">+</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground/60">
                        {weatherUi.belovedWeather}
                      </p>
                      <p className="font-display text-lg">
                        {partnerMood.emoji} {partnerMood.label}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative w-24 shrink-0 overflow-hidden sm:w-28">
                  <img
                    src={shivaShaktiIcon}
                    alt=""
                    className="h-full w-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-card/70" />
                </div>
              </div>

              {/* Bottom: combined result */}
              <div className="border-t border-amber-400/10 bg-gradient-to-r from-amber-950/30 to-transparent p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-amber-400/60">
                  {weatherMatch.archetype.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {weatherMatch.interpretation}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    to="/app/space?view=journey"
                    className="inline-flex items-center gap-1.5 rounded-[12px] border border-amber-400/30 bg-amber-400/10 px-4 py-2.5 text-sm text-amber-300 transition-all hover:bg-amber-400/20"
                  >
                    {weatherUi.openTonightPath} →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setWeatherPickerVisible(true)}
                    className="text-xs text-muted-foreground/40 transition-colors hover:text-muted-foreground/70"
                  >
                    {lang === "fr" ? "Changer ma météo" : lang === "cs" ? "Změnit počasí" : "Change my weather"}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      <section className="rounded-[24px] border-t border-[rgba(200,146,74,0.2)] bg-[rgba(200,146,74,0.06)] px-4 pb-4 pt-4">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-400/70">{copy.todayFlowLabel}</p>
          <h2 className="mt-1.5 font-display text-2xl text-foreground">{copy.todayFlowTitle}</h2>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {dailyCards.slice(0, 3).map((card) => {
            const Icon = card.icon;
            const expanded = expandedCardId === card.id;
            const saved = savedCards[card.id] ?? false;

            return (
              <div key={card.id} className="h-full rounded-[20px] border border-border/30 bg-card/45 p-4">
                <button type="button" onClick={() => setExpandedCardId(expanded ? null : card.id)} className="flex w-full flex-col text-left">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{card.label}</p>
                      <h3 className="mt-2 font-display text-xl text-foreground">{loading ? copy.selecting : card.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`inline-flex rounded-xl border border-border/30 bg-background/45 p-2.5 ${card.accentClass}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="inline-flex rounded-lg border border-border/30 bg-background/45 p-1.5 text-muted-foreground">
                        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {loading ? copy.calibrating : card.description}
                  </p>
                </button>

                {!loading && expanded && (
                  <div className="mt-3 space-y-3 rounded-xl border border-border/30 bg-background/45 p-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{copy.quickInsight}</p>
                      <p className="mt-1.5 text-sm leading-6 text-foreground/90">{card.quickInsight}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{copy.stepByStep}</p>
                      <ol className="mt-1.5 space-y-1.5 text-sm leading-6 text-foreground/90">
                        {card.steps.map((step, index) => (
                          <li key={step}>{index + 1}. {step}</li>
                        ))}
                      </ol>
                    </div>
                    <div className="rounded-lg border border-amber-300/30 bg-amber-500/8 p-2.5">
                      <p className="text-xs uppercase tracking-[0.14em] text-amber-200">{copy.goDeeper}</p>
                      <p className="mt-1 text-sm leading-6 text-foreground/90">{copy.goDeeperDesc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveCard(card.id)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs transition-all ${
                        saved
                          ? "border-rose-300/45 bg-rose-500/15 text-rose-200"
                          : "border-border/30 bg-card/45 text-muted-foreground hover:border-rose-300/35 hover:text-rose-200"
                      }`}
                    >
                      <Heart className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} />
                      {saved ? copy.savedToYourPath : copy.saveThisPractice}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {!hasPremiumAccess ? (
        <section className="rounded-[28px] bg-[rgba(255,255,255,0.02)] px-5 pb-6 pt-5">
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-amber-400/70">{copy.lockedDaily}</p>
          <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_58%),linear-gradient(135deg,rgba(245,158,11,0.18),rgba(15,23,42,0.12))] p-4 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.5)]">
            <div className="flex items-center gap-2 text-amber-200">
              <Lock className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.16em]">{copy.lockedDaily}</span>
            </div>
            <h3 className="mt-2 font-display text-xl text-foreground">{copy.lockedDailyTitle}</h3>
            <p className="mt-3 text-sm leading-6 text-foreground/90">
              {copy.lockedDailyDesc}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{copy.chipExtraCards}</span>
              <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{copy.chipDailyRefresh}</span>
              <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{copy.chipSensualGuidance}</span>
            </div>
            <Link
              to="/pricing"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-500/14 px-3 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
            >
              {copy.buttonDailyPlans}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.2),transparent_60%),linear-gradient(135deg,rgba(251,191,36,0.16),rgba(17,24,39,0.14))] p-4 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.46)]">
            <div className="flex items-center gap-2 text-amber-200">
              <Lock className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.16em]">{copy.lockedFull}</span>
            </div>
            <h3 className="mt-2 font-display text-xl text-foreground">{copy.lockedFullTitle}</h3>
            <p className="mt-3 text-sm leading-6 text-foreground/90">
              {copy.lockedFullDesc}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{copy.chipTemple}</span>
              <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{copy.chipLibrary}</span>
              <span className="rounded-full border border-amber-300/30 bg-amber-500/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-100">{copy.chipOracle}</span>
            </div>
            <Link
              to="/pricing"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-500/14 px-3 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
            >
              {copy.buttonFullPlans}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          </div>
        </section>
      ) : (
        <section className="rounded-[20px] border border-emerald-300/25 bg-[radial-gradient(circle_at_top_right,rgba(74,222,128,0.22),transparent_58%),linear-gradient(135deg,rgba(16,185,129,0.18),rgba(15,23,42,0.14))] p-4 shadow-[0_24px_70px_-45px_rgba(74,222,128,0.45)]">
          <div className="flex items-center gap-2 text-emerald-200">
            <HeartHandshake className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.16em]">{copy.premiumActive}</span>
          </div>
          <h3 className="mt-1.5 font-display text-xl text-foreground">{copy.premiumActiveTitle}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground/90">{copy.premiumActiveDesc}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              to="/app/space"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/35 bg-emerald-500/14 px-3 py-2 text-sm text-foreground transition-all hover:border-emerald-300/50 hover:bg-emerald-500/20"
            >
              {copy.buttonOpenTemple}
            </Link>
            <Link
              to="/app/paths"
              className="inline-flex items-center gap-2 rounded-xl border border-border/35 bg-card/55 px-3 py-2 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/70"
            >
              {copy.buttonOpenLibrary}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default AppHome;
