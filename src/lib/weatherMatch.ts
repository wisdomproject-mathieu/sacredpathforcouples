import type { Language } from "@/contexts/LanguageContext";

export type WeatherKey =
  | "open"
  | "tender"
  | "playful"
  | "stressed"
  | "longing"
  | "erotic"
  | "tired"
  | "reassurance";

type Localized = {
  en: string;
  fr: string;
  cs: string;
};

type WeatherMeta = {
  label: Localized;
  hint: Localized;
  meaning: Localized;
  emoji: string;
  energy: 1 | 2 | 3 | 4 | 5;
  intimacy: 1 | 2 | 3 | 4 | 5;
};

export type RitualRecommendation = {
  id: string;
  title: string;
  description: string;
};

export type WeatherMatchResult = {
  matchKey: string;
  pairLabel: string;
  interpretation: string;
  summary: string;
  recommendations: RitualRecommendation[];
  firstMeaning: string;
  secondMeaning: string;
  combinedMeaning: string;
};

const text = (value: Localized, lang: Language) => (lang === "fr" ? value.fr : lang === "cs" ? value.cs : value.en);

const weatherMeta: Record<WeatherKey, WeatherMeta> = {
  open: {
    label: { en: "Open", fr: "Ouvert", cs: "Otevřenost" },
    hint: {
      en: "Available, spacious, ready for closeness.",
      fr: "Disponible, spacieux, prêt pour la proximité.",
      cs: "Dostupnost, prostor, připravenost na blízkost.",
    },
    meaning: {
      en: "Open energy welcomes direct connection and clear emotional contact.",
      fr: "L'énergie ouverte accueille une connexion directe et un contact émotionnel clair.",
      cs: "Otevřená energie vítá přímé propojení a jasný emoční kontakt.",
    },
    emoji: "☀️",
    energy: 3,
    intimacy: 4,
  },
  tender: {
    label: { en: "Tender", fr: "Tendre", cs: "Něžnost" },
    hint: {
      en: "Soft, emotional, wanting warmth and care.",
      fr: "Doux, émotionnel, besoin de chaleur et de soin.",
      cs: "Jemný emoční stav, potřeba tepla a péče.",
    },
    meaning: {
      en: "Tender weather asks for slower touch, emotional safety, and warmth.",
      fr: "Le climat tendre demande un toucher plus lent, sécurité émotionnelle et chaleur.",
      cs: "Něžné počasí volá po pomalejším doteku, bezpečí a vřelosti.",
    },
    emoji: "💗",
    energy: 2,
    intimacy: 4,
  },
  playful: {
    label: { en: "Playful", fr: "Joueur", cs: "Hravost" },
    hint: {
      en: "Light, curious, flirtatious, laughing energy.",
      fr: "Léger, curieux, flirtant, énergie joyeuse.",
      cs: "Lehkost, zvědavost, flirt a radostná energie.",
    },
    meaning: {
      en: "Playful weather keeps pressure low and connection alive through joy.",
      fr: "Le climat joueur garde une faible pression et nourrit le lien par la joie.",
      cs: "Hravé počasí snižuje tlak a drží spojení živé skrze radost.",
    },
    emoji: "✨",
    energy: 4,
    intimacy: 3,
  },
  stressed: {
    label: { en: "Stressed", fr: "Stressé", cs: "Stres" },
    hint: {
      en: "Full mind, low capacity, needing gentleness.",
      fr: "Mental chargé, faible capacité, besoin de douceur.",
      cs: "Přehlcená mysl, menší kapacita, potřeba jemnosti.",
    },
    meaning: {
      en: "Stressed weather needs regulation first, then intimacy.",
      fr: "Le climat stressé a besoin de régulation d'abord, puis d'intimité.",
      cs: "Stresové počasí potřebuje nejprve regulaci a až potom intimitu.",
    },
    emoji: "☁️",
    energy: 2,
    intimacy: 2,
  },
  longing: {
    label: { en: "Longing", fr: "En manque", cs: "Touha" },
    hint: {
      en: "Missing something, wanting depth or contact.",
      fr: "Manque de contact, envie de profondeur.",
      cs: "Chybí kontakt, volání po hloubce.",
    },
    meaning: {
      en: "Longing weather seeks depth, reassurance, and meaningful contact.",
      fr: "Le climat de manque recherche profondeur, réassurance et contact significatif.",
      cs: "Počasí touhy hledá hloubku, ujištění a smysluplný kontakt.",
    },
    emoji: "🌙",
    energy: 3,
    intimacy: 5,
  },
  erotic: {
    label: { en: "Erotic", fr: "Érotique", cs: "Erotično" },
    hint: {
      en: "Desire is present and wants direction.",
      fr: "Le désir est là et demande une direction.",
      cs: "Touha je přítomná a chce jasný směr.",
    },
    meaning: {
      en: "Erotic weather carries desire and responds to attuned pacing.",
      fr: "Le climat érotique porte le désir et répond au bon rythme.",
      cs: "Erotické počasí nese touhu a reaguje na vyladěné tempo.",
    },
    emoji: "🔥",
    energy: 5,
    intimacy: 4,
  },
  tired: {
    label: { en: "Tired", fr: "Fatigué", cs: "Únava" },
    hint: {
      en: "Low energy, low pressure, slow rhythm needed.",
      fr: "Énergie basse, pression basse, rythme lent nécessaire.",
      cs: "Nízká energie, nízký tlak, potřeba pomalého rytmu.",
    },
    meaning: {
      en: "Tired weather asks for co-regulation, low pressure, and restoration.",
      fr: "Le climat fatigué demande co-régulation, faible pression et restauration.",
      cs: "Unavené počasí volá po koregulaci, nízkém tlaku a obnově.",
    },
    emoji: "🫧",
    energy: 1,
    intimacy: 2,
  },
  reassurance: {
    label: { en: "Reassurance", fr: "Réassurance", cs: "Ujištění" },
    hint: {
      en: "Needs safety, soothing, and emotional grounding.",
      fr: "Besoin de sécurité, d'apaisement et d'ancrage émotionnel.",
      cs: "Potřeba bezpečí, zklidnění a emočního ukotvení.",
    },
    meaning: {
      en: "Reassurance weather seeks safety before depth.",
      fr: "Le climat de réassurance cherche la sécurité avant la profondeur.",
      cs: "Počasí ujištění hledá nejprve bezpečí a teprve pak hloubku.",
    },
    emoji: "⚡",
    energy: 2,
    intimacy: 3,
  },
};

const canonicalPair = (left: WeatherKey, right: WeatherKey) => [left, right].sort().join("+");

type ComboTemplate = {
  interpretation: Localized;
  summary: Localized;
  combinedMeaning: Localized;
  recommendations: Array<{ id: string; title: Localized; description: Localized }>;
};

const comboTemplates: Record<string, ComboTemplate> = {
  [canonicalPair("erotic", "playful")]: {
    interpretation: {
      en: "Desire meets lightness.",
      fr: "Le désir rencontre la légèreté.",
      cs: "Touha se setkává s lehkostí.",
    },
    summary: {
      en: "This pairing opens teasing, curiosity, laughter, and sensual play without heavy pressure.",
      fr: "Cette combinaison ouvre le jeu, la curiosité, le rire et la sensualité sans pression lourde.",
      cs: "Tato kombinace otevírá škádlení, zvědavost, smích a smyslnou hru bez těžkého tlaku.",
    },
    combinedMeaning: {
      en: "Keep it alive, playful, and responsive while honoring consent and pacing.",
      fr: "Gardez cela vivant, joueur et réactif tout en respectant le consentement et le rythme.",
      cs: "Držte to živé, hravé a citlivé při respektu k souhlasu i tempu.",
    },
    recommendations: [
      {
        id: "teasing-ritual",
        title: { en: "Playful teasing ritual", fr: "Rituel de taquinerie", cs: "Hravý škádlivý rituál" },
        description: {
          en: "Trade three flirt lines each before any physical escalation.",
          fr: "Échangez trois phrases de flirt avant toute montée physique.",
          cs: "Vyměňte si tři flirtující věty před jakýmkoli fyzickým zrychlením.",
        },
      },
      {
        id: "eye-touch-game",
        title: { en: "Eye contact + touch game", fr: "Jeu regard + toucher", cs: "Hra oční kontakt + dotek" },
        description: {
          en: "Alternate eye contact and one intentional touch for 5 minutes.",
          fr: "Alternez regard et un toucher intentionnel pendant 5 minutes.",
          cs: "Střídejte oční kontakt a jeden vědomý dotek po dobu 5 minut.",
        },
      },
      {
        id: "sensual-questions",
        title: { en: "Sensual question cards", fr: "Cartes questions sensuelles", cs: "Smyslné otázkové karty" },
        description: {
          en: "Ask light desire questions and answer with honesty and humor.",
          fr: "Posez des questions de désir légères et répondez avec honnêteté et humour.",
          cs: "Ptejte se na lehké otázky touhy a odpovídejte upřímně a s humorem.",
        },
      },
      {
        id: "song-movement",
        title: { en: "One-song movement ritual", fr: "Rituel mouvement d'une chanson", cs: "Rituál pohybu na jednu píseň" },
        description: {
          en: "Move together for one song, then pause and share what awakened.",
          fr: "Bougez ensemble pendant une chanson puis partagez ce qui s'est éveillé.",
          cs: "Pohybujte se spolu během jedné písně a pak sdílejte, co se probudilo.",
        },
      },
    ],
  },
  [canonicalPair("erotic", "tired")]: {
    interpretation: {
      en: "Desire is present, energy is low.",
      fr: "Le désir est présent, l'énergie est basse.",
      cs: "Touha je přítomná, energie nízká.",
    },
    summary: {
      en: "Bridge sensuality with softness so neither pressure nor shutdown takes over.",
      fr: "Reliez sensualité et douceur pour éviter pression ou fermeture.",
      cs: "Propojte smyslnost s jemností, aby nepřevzal kontrolu tlak ani stažení.",
    },
    combinedMeaning: {
      en: "Prioritize co-regulation first, then let desire unfold in small waves.",
      fr: "Priorisez d'abord la co-régulation, puis laissez le désir se déployer par vagues.",
      cs: "Nejprve upřednostněte koregulaci, pak nechte touhu rozvíjet se po vlnách.",
    },
    recommendations: [
      {
        id: "gentle-cuddle",
        title: { en: "Gentle cuddle ritual", fr: "Rituel de câlin doux", cs: "Jemný tulivý rituál" },
        description: {
          en: "Hold each other for 5 minutes with no performance goal.",
          fr: "Tenez-vous 5 minutes sans objectif de performance.",
          cs: "Objímejte se 5 minut bez cíle výkonu.",
        },
      },
      {
        id: "breath-touch",
        title: { en: "5-minute breath and touch", fr: "5 minutes souffle et toucher", cs: "5 minut dech a dotek" },
        description: {
          en: "Match breathing and add one soft touch each minute.",
          fr: "Synchronisez le souffle et ajoutez un toucher doux chaque minute.",
          cs: "Slaďte dech a každou minutu přidejte jeden jemný dotek.",
        },
      },
      {
        id: "rest-first",
        title: { en: "Rest together first", fr: "Reposez-vous ensemble d'abord", cs: "Nejprve spolu odpočívejte" },
        description: {
          en: "Pause intensity and choose comfort before deeper sensuality.",
          fr: "Mettez l'intensité en pause et choisissez le confort avant plus de sensualité.",
          cs: "Pozastavte intenzitu a zvolte pohodlí před hlubší smyslností.",
        },
      },
    ],
  },
  [canonicalPair("playful", "tired")]: {
    interpretation: {
      en: "Low-pressure reconnection.",
      fr: "Reconnexion sans pression.",
      cs: "Nízkotlaké znovuspojení.",
    },
    summary: {
      en: "Use light energy to reconnect without demanding intensity.",
      fr: "Utilisez une énergie légère pour vous reconnecter sans exiger d'intensité.",
      cs: "Použijte lehkou energii ke znovupropojení bez nároku na intenzitu.",
    },
    combinedMeaning: {
      en: "Choose playful warmth with short, easy rituals.",
      fr: "Choisissez une chaleur joueuse avec des rituels courts et faciles.",
      cs: "Zvolte hravou vřelost s krátkými a snadnými rituály.",
    },
    recommendations: [
      {
        id: "silly-checkin",
        title: { en: "Silly check-in", fr: "Check-in léger", cs: "Bláznivý check-in" },
        description: {
          en: "Each shares one funny truth and one real need.",
          fr: "Chacun partage une vérité drôle et un besoin réel.",
          cs: "Každý sdílí jednu vtipnou pravdu a jednu reálnou potřebu.",
        },
      },
      {
        id: "mini-game",
        title: { en: "Mini sofa game", fr: "Mini jeu canapé", cs: "Mini hra na gauči" },
        description: {
          en: "Play one 3-minute game in bed or on the sofa.",
          fr: "Jouez un jeu de 3 minutes au lit ou sur le canapé.",
          cs: "Zahrajte si jednu 3minutovou hru v posteli nebo na gauči.",
        },
      },
      {
        id: "one-song-break",
        title: { en: "One-song movement break", fr: "Pause mouvement d'une chanson", cs: "Pohybová pauza na jednu píseň" },
        description: {
          en: "Move lightly for one song and end with a hug.",
          fr: "Bougez légèrement pendant une chanson et finissez par un câlin.",
          cs: "Lehce se hýbejte během jedné písně a zakončete objetím.",
        },
      },
      {
        id: "humor-ritual",
        title: { en: "Affectionate humor ritual", fr: "Rituel d'humour affectueux", cs: "Rituál láskyplného humoru" },
        description: {
          en: "Share one playful appreciation before sleep.",
          fr: "Partagez une appréciation joueuse avant de dormir.",
          cs: "Před spaním sdílejte jedno hravé ocenění.",
        },
      },
    ],
  },
  [canonicalPair("tired", "tired")]: {
    interpretation: {
      en: "Restoration and co-regulation night.",
      fr: "Soirée de restauration et co-régulation.",
      cs: "Večer obnovy a koregulace.",
    },
    summary: {
      en: "Your relationship asks for nervous system care before intensity.",
      fr: "Votre relation demande du soin du système nerveux avant l'intensité.",
      cs: "Váš vztah potřebuje péči o nervový systém před intenzitou.",
    },
    combinedMeaning: {
      en: "Slow down deeply and make rest itself your ritual.",
      fr: "Ralentissez profondément et faites du repos votre rituel.",
      cs: "Výrazně zpomalte a udělejte z odpočinku svůj rituál.",
    },
    recommendations: [
      {
        id: "shared-exhale",
        title: { en: "Shared exhale practice", fr: "Pratique d'expiration partagée", cs: "Praxe společného výdechu" },
        description: {
          en: "Take ten long exhales together while holding hands.",
          fr: "Prenez dix longs expirations ensemble en vous tenant la main.",
          cs: "Dejte si deset dlouhých výdechů společně při držení za ruce.",
        },
      },
      {
        id: "grounding-touch",
        title: { en: "Feet touch grounding", fr: "Ancrage pieds en contact", cs: "Uzemenění dotekem chodidel" },
        description: {
          en: "Lie back-to-back or feet-to-feet for gentle grounding.",
          fr: "Allongez-vous dos à dos ou pieds contre pieds pour vous ancrer.",
          cs: "Lehněte si zády k sobě nebo chodidly k sobě pro jemné uzemnění.",
        },
      },
      {
        id: "silent-tea",
        title: { en: "Silent tea ritual", fr: "Rituel de thé silencieux", cs: "Rituál tichého čaje" },
        description: {
          en: "Prepare tea in silence and share one gratitude line.",
          fr: "Préparez un thé en silence puis partagez une ligne de gratitude.",
          cs: "Připravte čaj v tichu a sdílejte jednu větu vděčnosti.",
        },
      },
      {
        id: "early-rest",
        title: { en: "Early rest with reassurance", fr: "Repos tôt avec réassurance", cs: "Brzký odpočinek s ujištěním" },
        description: {
          en: "End early with one reassurance sentence each.",
          fr: "Terminez tôt avec une phrase de réassurance chacun.",
          cs: "Zakončete dříve a každý řekněte jednu větu ujištění.",
        },
      },
    ],
  },
  [canonicalPair("erotic", "erotic")]: {
    interpretation: {
      en: "Strong sensual alignment.",
      fr: "Forte alignement sensuel.",
      cs: "Silné smyslné sladění.",
    },
    summary: {
      en: "Both of you are in desire-rich energy that can deepen with presence.",
      fr: "Vous êtes tous les deux dans une énergie de désir qui peut s'approfondir avec présence.",
      cs: "Oba jste v energii touhy, která se může prohloubit skrze přítomnost.",
    },
    combinedMeaning: {
      en: "Move with reverence and pacing so intensity stays connected.",
      fr: "Avancez avec respect et rythme pour garder l'intensité connectée.",
      cs: "Pohybujte se s úctou a tempem, aby intenzita zůstala propojená.",
    },
    recommendations: [
      {
        id: "tantric-presence",
        title: { en: "Tantric presence ritual", fr: "Rituel de présence tantrique", cs: "Tantrický rituál přítomnosti" },
        description: {
          en: "Stay in eye contact for 3 minutes before touch.",
          fr: "Restez en regard pendant 3 minutes avant le toucher.",
          cs: "Zůstaňte 3 minuty v očním kontaktu před dotekem.",
        },
      },
      {
        id: "desire-map",
        title: { en: "Desire mapping prompt", fr: "Prompt cartographie du désir", cs: "Prompt mapování touhy" },
        description: {
          en: "Each shares one yes, one no, and one maybe.",
          fr: "Chacun partage un oui, un non et un peut-être.",
          cs: "Každý sdílí jedno ano, jedno ne a jedno možná.",
        },
      },
      {
        id: "guided-touch",
        title: { en: "Guided touch ritual", fr: "Rituel de toucher guidé", cs: "Vedený rituál doteku" },
        description: {
          en: "Alternate giving and receiving for 8 minutes each.",
          fr: "Alternez donner et recevoir pendant 8 minutes chacun.",
          cs: "Střídejte dávání a přijímání po 8 minutách.",
        },
      },
      {
        id: "longer-temple",
        title: { en: "Longer temple invitation", fr: "Invitation temple longue", cs: "Pozvání na delší chrámovou praxi" },
        description: {
          en: "Open a longer temple session with clear pacing.",
          fr: "Ouvrez une session plus longue avec un rythme clair.",
          cs: "Otevřete delší chrámovou seanci s jasným tempem.",
        },
      },
    ],
  },
  [canonicalPair("playful", "playful")]: {
    interpretation: {
      en: "Joy and movement alignment.",
      fr: "Alignement de joie et de mouvement.",
      cs: "Sladění radosti a pohybu.",
    },
    summary: {
      en: "You are both in light energy that can build intimacy through fun.",
      fr: "Vous êtes tous les deux dans une énergie légère qui peut créer de l'intimité par le jeu.",
      cs: "Oba jste v lehké energii, která může budovat intimitu skrze zábavu.",
    },
    combinedMeaning: {
      en: "Let laughter lead and closeness will follow naturally.",
      fr: "Laissez le rire mener et la proximité suivra naturellement.",
      cs: "Nechte vést smích a blízkost přijde přirozeně.",
    },
    recommendations: [
      {
        id: "flirt-game",
        title: { en: "Flirt game", fr: "Jeu de flirt", cs: "Flirt hra" },
        description: {
          en: "Take turns giving playful dares with consent.",
          fr: "Donnez-vous des défis joueurs avec consentement.",
          cs: "Střídejte se v hravých výzvách se souhlasem.",
        },
      },
      {
        id: "couple-quiz",
        title: { en: "Couple quiz", fr: "Quiz couple", cs: "Párový kvíz" },
        description: {
          en: "Ask 5 quick curiosity questions about each other.",
          fr: "Posez 5 questions rapides de curiosité l'un sur l'autre.",
          cs: "Položte si 5 rychlých zvídavých otázek o sobě.",
        },
      },
      {
        id: "laughter-ritual",
        title: { en: "Laughter ritual", fr: "Rituel de rire", cs: "Rituál smíchu" },
        description: {
          en: "Share one funny memory and one affectionate touch.",
          fr: "Partagez un souvenir drôle et un toucher affectueux.",
          cs: "Sdílejte jednu vtipnou vzpomínku a jeden láskyplný dotek.",
        },
      },
      {
        id: "spontaneous-date",
        title: { en: "Spontaneous date prompt", fr: "Prompt rendez-vous spontané", cs: "Prompt spontánního rande" },
        description: {
          en: "Plan a 20-minute mini-date tonight.",
          fr: "Planifiez un mini rendez-vous de 20 minutes ce soir.",
          cs: "Naplánujte dnes večer 20minutové mini-rande.",
        },
      },
    ],
  },
};

const stateOrFallback = (value: string): WeatherKey => {
  if (value in weatherMeta) return value as WeatherKey;
  return "open";
};

const fallbackRecommendations = (first: WeatherKey, second: WeatherKey, lang: Language): RitualRecommendation[] => {
  const left = weatherMeta[first];
  const right = weatherMeta[second];
  const avgEnergy = Math.round((left.energy + right.energy) / 2);
  const avgIntimacy = Math.round((left.intimacy + right.intimacy) / 2);

  const lowEnergy = avgEnergy <= 2;
  const highEnergy = avgEnergy >= 4;
  const highIntimacy = avgIntimacy >= 4;

  const intro = lowEnergy
    ? text(
        {
          en: "Begin with a low-pressure co-regulation ritual.",
          fr: "Commencez par un rituel de co-régulation sans pression.",
          cs: "Začněte nízkotlakým rituálem koregulace.",
        },
        lang,
      )
    : highEnergy
    ? text(
        {
          en: "Use your available energy with attuned pacing.",
          fr: "Utilisez votre énergie disponible avec un rythme ajusté.",
          cs: "Použijte dostupnou energii s vyladěným tempem.",
        },
        lang,
      )
    : text(
        {
          en: "Choose an easy bridge ritual and deepen step by step.",
          fr: "Choisissez un rituel passerelle simple et approfondissez pas à pas.",
          cs: "Zvolte jednoduchý mostní rituál a prohlubujte krok za krokem.",
        },
        lang,
      );

  const closeness = highIntimacy
    ? text(
        {
          en: "Keep emotional honesty close while staying gentle.",
          fr: "Gardez la vérité émotionnelle proche tout en restant doux.",
          cs: "Udržte emoční upřímnost blízko a zůstaňte jemní.",
        },
        lang,
      )
    : text(
        {
          en: "Build emotional safety first, then open sensuality.",
          fr: "Construisez d'abord la sécurité émotionnelle puis ouvrez la sensualité.",
          cs: "Nejprve budujte emoční bezpečí a poté otevírejte smyslnost.",
        },
        lang,
      );

  return [
    {
      id: "fallback-bridge",
      title: text(
        { en: "Bridge ritual", fr: "Rituel passerelle", cs: "Mostní rituál" },
        lang,
      ),
      description: intro,
    },
    {
      id: "fallback-touch",
      title: text(
        { en: "Attuned touch", fr: "Toucher ajusté", cs: "Vyladěný dotek" },
        lang,
      ),
      description: closeness,
    },
    {
      id: "fallback-invitation",
      title: text(
        { en: "Shared invitation", fr: "Invitation partagée", cs: "Sdílené pozvání" },
        lang,
      ),
      description: text(
        {
          en: "Offer one clear invitation and one boundary before moving forward.",
          fr: "Proposez une invitation claire et une limite avant d'avancer.",
          cs: "Nabídněte jedno jasné pozvání a jednu hranici před pokračováním.",
        },
        lang,
      ),
    },
  ];
};

export const getWeatherPresentation = (state: string, lang: Language) => {
  const key = stateOrFallback(state);
  const meta = weatherMeta[key];
  return {
    key,
    label: text(meta.label, lang),
    hint: text(meta.hint, lang),
    emoji: meta.emoji,
    meaning: text(meta.meaning, lang),
  };
};

export const buildWeatherMatchResult = (
  firstRaw: string,
  secondRaw: string,
  lang: Language,
): WeatherMatchResult => {
  const first = stateOrFallback(firstRaw);
  const second = stateOrFallback(secondRaw);
  const firstMeta = getWeatherPresentation(first, lang);
  const secondMeta = getWeatherPresentation(second, lang);
  const key = canonicalPair(first, second);
  const template = comboTemplates[key];

  const recommendations = template
    ? template.recommendations.map((item) => ({
        id: item.id,
        title: text(item.title, lang),
        description: text(item.description, lang),
      }))
    : fallbackRecommendations(first, second, lang);

  return {
    matchKey: key,
    pairLabel: `${firstMeta.label} ${firstMeta.emoji} + ${secondMeta.label} ${secondMeta.emoji}`,
    interpretation: template
      ? text(template.interpretation, lang)
      : text(
          {
            en: "A unique shared weather is forming.",
            fr: "Un climat partagé unique est en train de se former.",
            cs: "Formuje se jedinečné sdílené počasí.",
          },
          lang,
        ),
    summary: template
      ? text(template.summary, lang)
      : text(
          {
            en: "This pairing asks for a personalized rhythm instead of a generic ritual.",
            fr: "Cette combinaison demande un rythme personnalisé plutôt qu'un rituel générique.",
            cs: "Tato kombinace potřebuje personalizovaný rytmus místo generického rituálu.",
          },
          lang,
        ),
    firstMeaning: firstMeta.meaning,
    secondMeaning: secondMeta.meaning,
    combinedMeaning: template
      ? text(template.combinedMeaning, lang)
      : text(
          {
            en: "Let both energies coexist and choose rituals that honor the real pace between you.",
            fr: "Laissez coexister les deux énergies et choisissez des rituels qui respectent votre vrai rythme.",
            cs: "Nechte obě energie spolu existovat a vybírejte rituály, které respektují vaše skutečné tempo.",
          },
          lang,
        ),
    recommendations,
  };
};
