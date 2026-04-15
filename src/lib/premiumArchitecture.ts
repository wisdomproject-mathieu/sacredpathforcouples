import type { Language } from "@/contexts/LanguageContext";

export type PremiumBucket = {
  title: string;
  free: string;
  premium: string;
};

export type FeatureSplit = {
  free: string[];
  premium: string[];
};

export type TempleJourneyTemplate = {
  id: string;
  title: string;
  duration: string;
  teaser: string;
  freePreview: boolean;
};

export type PremiumTriggerKey =
  | "match_unlock"
  | "deeper_ritual"
  | "source_depth"
  | "journey_memory"
  | "journey_program";

const templeMembershipNameByLanguage: Record<Language, string> = {
  en: "Temple Access",
  fr: "Accès Temple",
  cs: "Chrámový přístup",
};

const premiumBucketsByLanguage: Record<Language, PremiumBucket[]> = {
  en: [
    {
      title: "Deeper Rituals",
      free: "One meaningful ritual for your current shared weather.",
      premium: "Multiple ritual depths for the same match: gentle, medium, and deep.",
    },
    {
      title: "Deeper Wisdom",
      free: "Tradition chips and a concise source line.",
      premium: "Expanded lineage notes across Tantra, Tao, Kama, Slow Sex, and polarity.",
    },
    {
      title: "Deeper Guidance",
      free: "Light oracle and one clear next step.",
      premium: "Full contextual sequencing from weather, history, and ritual response.",
    },
    {
      title: "Deeper Memory",
      free: "Recent shared moments and latest relational signals.",
      premium: "Long-term pattern memory, favorites, and evolving couple milestones.",
    },
    {
      title: "Deeper Beauty",
      free: "Core sacred visual language.",
      premium: "Premium archetype art variations and ceremonial visual states.",
    },
  ],
  fr: [
    {
      title: "Rituels plus profonds",
      free: "Un rituel utile pour votre météo partagée.",
      premium: "Plusieurs niveaux de rituels pour le même match: doux, moyen et profond.",
    },
    {
      title: "Sagesse plus profonde",
      free: "Chips de tradition et courte note de source.",
      premium: "Notes de lignée étendues entre Tantra, Tao, Kama, Slow Sex et polarité.",
    },
    {
      title: "Guidance plus profonde",
      free: "Oracle léger et prochain pas clair.",
      premium: "Séquençage contextuel complet à partir de la météo, de l'historique et des rituels.",
    },
    {
      title: "Mémoire plus profonde",
      free: "Moments récents et signaux relationnels clés.",
      premium: "Mémoire longue, favoris et jalons évolutifs du couple.",
    },
    {
      title: "Beauté plus profonde",
      free: "Langage visuel sacré essentiel.",
      premium: "Variations artistiques premium par archétype et états cérémoniels.",
    },
  ],
  cs: [
    {
      title: "Hlubší rituály",
      free: "Jeden smysluplný rituál pro vaše sdílené počasí.",
      premium: "Více hloubek rituálů pro stejnou shodu: jemná, střední a hluboká.",
    },
    {
      title: "Hlubší moudrost",
      free: "Štítky tradic a krátká zdrojová poznámka.",
      premium: "Rozšířené liniové poznámky napříč Tantrou, Tao, Kamou, Slow Sex a polaritou.",
    },
    {
      title: "Hlubší vedení",
      free: "Lehký oracle a jeden jasný další krok.",
      premium: "Plné kontextové sekvenování z počasí, historie a odpovědí na rituál.",
    },
    {
      title: "Hlubší paměť",
      free: "Nedávné společné momenty a klíčové signály vztahu.",
      premium: "Dlouhodobá paměť vzorců, oblíbené rituály a milníky páru.",
    },
    {
      title: "Hlubší krása",
      free: "Základní posvátný vizuální jazyk.",
      premium: "Premium varianty archetypových obrazů a ceremoniální vizuální stavy.",
    },
  ],
};

const featureSplitByLanguage: Record<Language, FeatureSplit> = {
  en: {
    free: [
      "Partner connection and shared weather",
      "Basic match insight with one real ritual",
      "Temple board notes and gentle nudges",
      "Limited library paths and author previews",
      "Recent journey memory and light oracle access",
    ],
    premium: [
      "Full ritual depth for each match archetype",
      "Expanded source lineage and wisdom bridges",
      "Guided couple journeys and ceremonial experiences",
      "Advanced oracle sequencing across weather + history",
      "Extended journey memory and premium visual storytelling",
    ],
  },
  fr: {
    free: [
      "Connexion partenaire et météo partagée",
      "Insight de match avec un vrai rituel",
      "Notes du temple et nudges doux",
      "Parcours limités et aperçus d'auteurs",
      "Mémoire récente et accès oracle léger",
    ],
    premium: [
      "Profondeur rituelle complète par archétype",
      "Lignée de sagesse enrichie et ponts de sources",
      "Parcours guidés de couple et expériences cérémonielles",
      "Séquençage oracle avancé météo + historique",
      "Mémoire longue et narration visuelle premium",
    ],
  },
  cs: {
    free: [
      "Propojení partnerů a sdílené počasí",
      "Základní shoda s jedním reálným rituálem",
      "Vzkazy na chrámové nástěnce a jemná postrčení",
      "Omezené cesty knihovny a náhledy autorů",
      "Nedávná paměť cesty a lehký oracle přístup",
    ],
    premium: [
      "Plná hloubka rituálů pro každý archetyp",
      "Rozšířená zdrojová linie a mosty moudrosti",
      "Vedené párové cesty a ceremoniální zážitky",
      "Pokročilé oracle sekvenování počasí + historie",
      "Rozšířená paměť cesty a premium vizuální příběh",
    ],
  },
};

const templeJourneysByLanguage: Record<Language, TempleJourneyTemplate[]> = {
  en: [
    {
      id: "sacred-rest-for-two",
      title: "Sacred Rest for Two",
      duration: "3 nights",
      teaser: "Co-regulation, tenderness, and breath-first intimacy after heavy days.",
      freePreview: true,
    },
    {
      id: "rekindle-the-flame",
      title: "Rekindle the Flame",
      duration: "7 nights",
      teaser: "Rebuild desire through polarity, playful charge, and devotional touch.",
      freePreview: false,
    },
    {
      id: "soft-repair",
      title: "Soft Repair",
      duration: "7 nights",
      teaser: "Transform friction into closeness with guided repair and reassurance.",
      freePreview: false,
    },
    {
      id: "weekend-temple",
      title: "Weekend Temple",
      duration: "2 days",
      teaser: "A ceremonial reset with sacred entry, guided ritual, and integration.",
      freePreview: false,
    },
  ],
  fr: [
    {
      id: "sacred-rest-for-two",
      title: "Repos sacré à deux",
      duration: "3 soirées",
      teaser: "Co-régulation, tendresse et intimité guidée par le souffle.",
      freePreview: true,
    },
    {
      id: "rekindle-the-flame",
      title: "Rallumer la flamme",
      duration: "7 soirées",
      teaser: "Réactiver le désir par polarité, jeu et toucher dévotionnel.",
      freePreview: false,
    },
    {
      id: "soft-repair",
      title: "Réparation douce",
      duration: "7 soirées",
      teaser: "Transformer la friction en proximité avec guidance relationnelle.",
      freePreview: false,
    },
    {
      id: "weekend-temple",
      title: "Temple du week-end",
      duration: "2 jours",
      teaser: "Reset cérémoniel avec entrée sacrée, rituel guidé et intégration.",
      freePreview: false,
    },
  ],
  cs: [
    {
      id: "sacred-rest-for-two",
      title: "Posvátný odpočinek ve dvou",
      duration: "3 večery",
      teaser: "Koregulace, něha a dechová intimita po náročných dnech.",
      freePreview: true,
    },
    {
      id: "rekindle-the-flame",
      title: "Znovu zažehnout plamen",
      duration: "7 večerů",
      teaser: "Obnova touhy skrze polaritu, hravost a oddaný dotek.",
      freePreview: false,
    },
    {
      id: "soft-repair",
      title: "Jemná oprava",
      duration: "7 večerů",
      teaser: "Proměna napětí v blízkost díky vedené opravě a ujištění.",
      freePreview: false,
    },
    {
      id: "weekend-temple",
      title: "Víkendový chrám",
      duration: "2 dny",
      teaser: "Ceremoniální restart s posvátným vstupem, rituálem a integrací.",
      freePreview: false,
    },
  ],
};

const premiumTriggerByLanguage: Record<Language, Record<PremiumTriggerKey, { title: string; body: string }>> = {
  en: {
    match_unlock: {
      title: "One subscription. Both of you go deeper.",
      body: "You already have a real ritual for this match. Unlock the deeper chambers — your partner gets full access too.",
    },
    deeper_ritual: {
      title: "She'll feel the difference tonight",
      body: "Unlock deeper ritual paths for the same weather — gentle, medium, and deep. One subscription covers both of you.",
    },
    source_depth: {
      title: "Become the man who understands why",
      body: "See the full lineage notes and linked pathways. Knowledge changes how you show up — she'll notice.",
    },
    journey_memory: {
      title: "Your couple story, preserved",
      body: "Keep your full journey — patterns, favorites, milestones — in one living archive. One subscription, both partners.",
    },
    journey_program: {
      title: "Guided journeys for repair, desire & closeness",
      body: "Step into multi-day journeys built for real couples. Repair what's broken. Reignite what's faded. One subscription for both of you.",
    },
  },
  fr: {
    match_unlock: {
      title: "Votre première porte est ouverte",
      body: "Vous avez déjà un rituel réel pour ce match. Accès Temple ouvre les chambres plus profondes.",
    },
    deeper_ritual: {
      title: "Ouvrir le rituel plus profond",
      body: "Débloquez des voies alternatives pour la même météo partagée, du doux au profond.",
    },
    source_depth: {
      title: "Ouvrir la sagesse derrière cela",
      body: "Voyez les notes de lignée complètes et les liens Tantra, Tao, Kama et polarité.",
    },
    journey_memory: {
      title: "Étendre votre mémoire sacrée",
      body: "Gardez votre histoire de couple, vos motifs, favoris et jalons dans une archive vivante.",
    },
    journey_program: {
      title: "Entrer dans les parcours guidés",
      body: "Accédez aux parcours multi-jours pour réparation, désir, repos et reconnexion.",
    },
  },
  cs: {
    match_unlock: {
      title: "První brána je otevřená",
      body: "Pro tuto shodu už máte skutečný rituál. Chrámový přístup odemkne hlubší komnaty.",
    },
    deeper_ritual: {
      title: "Otevřít hlubší rituální cestu",
      body: "Odemkněte alternativní cesty pro stejné sdílené počasí od jemné po hlubokou.",
    },
    source_depth: {
      title: "Otevřít moudrost za tím",
      body: "Zobrazte plné poznámky linie a propojené cesty Tantra, Tao, Kama a polarity.",
    },
    journey_memory: {
      title: "Rozšířit posvátnou paměť",
      body: "Udržte celý příběh páru, vzorce, oblíbené rituály i milníky v živém archivu.",
    },
    journey_program: {
      title: "Vstoupit do vedených párových cest",
      body: "Odemkněte vícedenní cesty pro opravu, touhu, odpočinek a znovuspojení.",
    },
  },
};

export const getTempleMembershipName = (lang: Language) => templeMembershipNameByLanguage[lang];

export const getPremiumBuckets = (lang: Language) => premiumBucketsByLanguage[lang];

export const getFeatureSplit = (lang: Language) => featureSplitByLanguage[lang];

export const getTempleJourneys = (lang: Language) => templeJourneysByLanguage[lang];

export const getPremiumTriggerCopy = (lang: Language, key: PremiumTriggerKey) =>
  premiumTriggerByLanguage[lang][key];

