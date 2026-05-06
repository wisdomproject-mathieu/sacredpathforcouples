import type { Language } from "@/contexts/LanguageContext";

export type TonightPathWaitingOn = "none" | "user" | "beloved" | "both" | "disconnected";

export type TonightPathStatusViewModel = {
  isConnected: boolean;
  userWeatherSelected: boolean;
  belovedWeatherSelected: boolean;
  isTonightPathReady: boolean;
  waitingOn: TonightPathWaitingOn;
  sharedStatusLabel: string;
  waitingTitle: string;
  waitingBody: string;
  latestMatchWaitingLabel: string;
  userWeatherPlaceholder: string;
  belovedWeatherPlaceholder: string;
};

type Input = {
  lang: Language;
  isConnected: boolean;
  userWeatherSelected: boolean;
  belovedWeatherSelected: boolean;
  partnerName?: string | null;
};

const l = (lang: Language, en: string, fr: string, cs: string) =>
  lang === "fr" ? fr : lang === "cs" ? cs : en;

export const deriveTonightPathStatus = ({
  lang,
  isConnected,
  userWeatherSelected,
  belovedWeatherSelected,
  partnerName,
}: Input): TonightPathStatusViewModel => {
  if (!isConnected) {
    return {
      isConnected,
      userWeatherSelected,
      belovedWeatherSelected,
      isTonightPathReady: false,
      waitingOn: "disconnected",
      sharedStatusLabel: l(lang, "Not connected", "Non connectés", "Nepropojeno"),
      waitingTitle: l(lang, "Tonight Path locked", "Chemin de ce soir verrouillé", "Dnešní cesta uzamčena"),
      waitingBody: l(
        lang,
        "Connect with your partner to unlock shared tonight paths.",
        "Connectez votre partenaire pour débloquer les chemins partagés de ce soir.",
        "Propojte partnera a odemkněte sdílené dnešní cesty.",
      ),
      latestMatchWaitingLabel: l(
        lang,
        "Connect with your partner to reveal your latest match.",
        "Connectez votre partenaire pour révéler votre dernière correspondance.",
        "Propojte partnera a zobrazte poslední shodu.",
      ),
      userWeatherPlaceholder: l(lang, "Not shared yet", "Pas encore partagé", "Zatím nesdíleno"),
      belovedWeatherPlaceholder: l(lang, "Not shared yet", "Pas encore partagé", "Zatím nesdíleno"),
    };
  }

  if (userWeatherSelected && belovedWeatherSelected) {
    return {
      isConnected,
      userWeatherSelected,
      belovedWeatherSelected,
      isTonightPathReady: true,
      waitingOn: "none",
      sharedStatusLabel: l(
        lang,
        "Both weather check-ins complete",
        "Les deux météos sont partagées",
        "Obě počasí jsou sdílená",
      ),
      waitingTitle: l(lang, "Tonight Path ready", "Chemin de ce soir prêt", "Dnešní cesta je připravena"),
      waitingBody: l(
        lang,
        "Both weather check-ins are complete. Tonight's path is ready.",
        "Les deux check-ins météo sont complets. Le chemin de ce soir est prêt.",
        "Oba weather check-iny jsou hotové. Dnešní cesta je připravená.",
      ),
      latestMatchWaitingLabel: l(
        lang,
        "Both weather check-ins are complete.",
        "Les deux check-ins météo sont complets.",
        "Oba weather check-iny jsou hotové.",
      ),
      userWeatherPlaceholder: l(lang, "Not shared yet", "Pas encore partagé", "Zatím nesdíleno"),
      belovedWeatherPlaceholder: l(lang, "Not shared yet", "Pas encore partagé", "Zatím nesdíleno"),
    };
  }

  if (userWeatherSelected && !belovedWeatherSelected) {
    const belovedName = partnerName ?? l(lang, "your beloved", "votre partenaire", "partner");
    return {
      isConnected,
      userWeatherSelected,
      belovedWeatherSelected,
      isTonightPathReady: false,
      waitingOn: "beloved",
      sharedStatusLabel: l(
        lang,
        "Connected · awaiting beloved weather",
        "Connectés · météo du partenaire en attente",
        "Propojeno · čeká se na počasí partnera",
      ),
      waitingTitle: l(lang, "Your Tonight Path is preparing", "Votre chemin de ce soir se prépare", "Dnešní cesta se připravuje"),
      waitingBody: l(
        lang,
        `${belovedName} is connected. Waiting for their weather check-in to unlock tonight's path.`,
        `${belovedName} est connecté(e). En attente de son check-in météo pour débloquer le chemin de ce soir.`,
        `${belovedName} je propojený(á). Čekáme na jeho/její weather check-in pro odemčení dnešní cesty.`,
      ),
      latestMatchWaitingLabel: l(
        lang,
        `Connected. Waiting for ${belovedName}'s weather check-in.`,
        `Connectés. En attente du check-in météo de ${belovedName}.`,
        `Propojeno. Čeká se na weather check-in od ${belovedName}.`,
      ),
      userWeatherPlaceholder: l(lang, "Not shared yet", "Pas encore partagé", "Zatím nesdíleno"),
      belovedWeatherPlaceholder: l(lang, "Awaiting check-in", "Check-in en attente", "Čeká na check-in"),
    };
  }

  if (!userWeatherSelected && belovedWeatherSelected) {
    return {
      isConnected,
      userWeatherSelected,
      belovedWeatherSelected,
      isTonightPathReady: false,
      waitingOn: "user",
      sharedStatusLabel: l(
        lang,
        "Connected · awaiting your weather",
        "Connectés · votre météo en attente",
        "Propojeno · čeká se na vaše počasí",
      ),
      waitingTitle: l(lang, "Your Tonight Path is preparing", "Votre chemin de ce soir se prépare", "Dnešní cesta se připravuje"),
      waitingBody: l(
        lang,
        "Your partner is connected. Share your weather check-in to unlock tonight's path.",
        "Votre partenaire est connecté(e). Partagez votre check-in météo pour débloquer le chemin de ce soir.",
        "Váš partner je propojený. Sdílejte svůj weather check-in a odemkněte dnešní cestu.",
      ),
      latestMatchWaitingLabel: l(
        lang,
        "Connected. Waiting for your weather check-in.",
        "Connectés. En attente de votre check-in météo.",
        "Propojeno. Čeká se na váš weather check-in.",
      ),
      userWeatherPlaceholder: l(lang, "Awaiting your check-in", "Votre check-in est attendu", "Čeká na váš check-in"),
      belovedWeatherPlaceholder: l(lang, "Not shared yet", "Pas encore partagé", "Zatím nesdíleno"),
    };
  }

  return {
    isConnected,
    userWeatherSelected,
    belovedWeatherSelected,
    isTonightPathReady: false,
    waitingOn: "both",
    sharedStatusLabel: l(
      lang,
      "Connected · weather check-ins pending",
      "Connectés · check-ins météo en attente",
      "Propojeno · čekají weather check-iny",
    ),
    waitingTitle: l(lang, "Your Tonight Path is preparing", "Votre chemin de ce soir se prépare", "Dnešní cesta se připravuje"),
    waitingBody: l(
      lang,
      "You are connected. Tonight's path unlocks once both weather check-ins are complete.",
      "Vous êtes connectés. Le chemin de ce soir se débloque une fois les deux check-ins météo complétés.",
      "Jste propojeni. Dnešní cesta se odemkne, jakmile budou hotové oba weather check-iny.",
    ),
    latestMatchWaitingLabel: l(
      lang,
      "Connected. Waiting for both weather check-ins.",
      "Connectés. En attente des deux check-ins météo.",
      "Propojeno. Čeká se na oba weather check-iny.",
    ),
    userWeatherPlaceholder: l(lang, "Awaiting your check-in", "Votre check-in est attendu", "Čeká na váš check-in"),
    belovedWeatherPlaceholder: l(lang, "Awaiting check-in", "Check-in en attente", "Čeká na check-in"),
  };
};
