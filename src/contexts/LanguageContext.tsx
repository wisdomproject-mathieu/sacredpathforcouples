import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "fr" | "cs";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

const translations: Record<string, Record<Language, string>> = {
  // Nav & Global
  "nav.home": { en: "Home", fr: "Accueil", cs: "Domů" },
  "nav.connect": { en: "Connect", fr: "Connexion", cs: "Propojit" },
  "nav.paths": { en: "Paths", fr: "Chemins", cs: "Cesty" },
  "nav.authors": { en: "Authors", fr: "Auteurs", cs: "Autoři" },
  "nav.reconnect": { en: "Reconnect", fr: "Reconnecter", cs: "Rituály" },
  "nav.teachings": { en: "Teachings", fr: "Enseignements", cs: "Učení" },
  "nav.pricing": { en: "Pricing", fr: "Tarifs", cs: "Ceník" },
  "nav.login": { en: "Log In", fr: "Connexion", cs: "Přihlásit" },
  "nav.start_free": { en: "Start Free", fr: "Commencer", cs: "Začít zdarma" },

  // Landing page
  "landing.title_1": { en: "Sacred Path", fr: "Chemin Sacré", cs: "Posvátná Cesta" },
  "landing.title_2": { en: "for Couples", fr: "pour Couples", cs: "pro Páry" },
  "landing.subtitle": {
    en: "Ancient tantric wisdom meets modern love. Deepen your connection through daily practices, sacred teachings, and intimate rituals shared with your beloved.",
    fr: "La sagesse tantrique ancienne rencontre l'amour moderne. Approfondissez votre connexion à travers des pratiques quotidiennes, des enseignements sacrés et des rituels intimes partagés avec votre bien-aimé(e).",
    cs: "Starodávná tantrická moudrost potkává moderní lásku. Prohloubte své spojení prostřednictvím každodenních praktik, posvátných učení a intimních rituálů sdílených s vaším milovaným.",
  },
  "landing.begin_journey": { en: "Begin Your Journey", fr: "Commencez Votre Voyage", cs: "Začněte svou cestu" },
  "landing.explore": { en: "Explore", fr: "Explorer", cs: "Prozkoumat" },
  "landing.sacred_tools": { en: "The Sacred Tools", fr: "Les Outils Sacrés", cs: "Posvátné nástroje" },
  "landing.sacred_tools_desc": {
    en: "Everything you need to nurture the divine connection between you and your partner",
    fr: "Tout ce dont vous avez besoin pour nourrir la connexion divine entre vous et votre partenaire",
    cs: "Vše, co potřebujete k péči o božské spojení mezi vámi a vaším partnerem",
  },
  "landing.wisdom_lineage": { en: "Wisdom Lineage", fr: "Lignée de Sagesse", cs: "Linie moudrosti" },
  "landing.wisdom_lineage_desc": {
    en: "Teachings curated from the world's most profound tantric masters",
    fr: "Enseignements des maîtres tantriques les plus profonds du monde",
    cs: "Učení od nejhlubších tantrických mistrů světa",
  },
  "landing.ready_title": { en: "Ready to Walk the Sacred Path?", fr: "Prêt à Marcher sur le Chemin Sacré?", cs: "Připraveni kráčet Posvátnou Cestou?" },
  "landing.ready_desc": {
    en: "Join thousands of couples deepening their love through ancient wisdom. Start your 7-day free trial today.",
    fr: "Rejoignez des milliers de couples approfondissant leur amour grâce à la sagesse ancienne. Commencez votre essai gratuit de 7 jours.",
    cs: "Připojte se k tisícům párů, které prohlubují svou lásku prostřednictvím starodávné moudrosti. Začněte 7denní zkušební období zdarma.",
  },
  "landing.start_trial": { en: "Start Free Trial", fr: "Essai Gratuit", cs: "Začít zkušební období" },
  "landing.privacy": { en: "Privacy Policy", fr: "Politique de Confidentialité", cs: "Zásady ochrany" },

  // Features
  "feat.intimacy_weather": { en: "Intimacy Weather", fr: "Météo d'Intimité", cs: "Počasí intimity" },
  "feat.intimacy_weather_desc": { en: "Track emotional closeness with your partner daily", fr: "Suivez la proximité émotionnelle avec votre partenaire", cs: "Sledujte emocionální blízkost s partnerem" },
  "feat.the_thread": { en: "The Thread", fr: "Le Fil", cs: "Nit dne" },
  "feat.the_thread_desc": { en: "A sacred question each day to deepen your bond", fr: "Une question sacrée chaque jour pour approfondir votre lien", cs: "Posvátná otázka každý den pro prohloubení vašeho pouta" },
  "feat.daily_whisper": { en: "Daily Whisper", fr: "Murmure Quotidien", cs: "Denní šepot" },
  "feat.daily_whisper_desc": { en: "Wisdom from ancient teachings, delivered at dawn", fr: "Sagesse des enseignements anciens, livrée à l'aube", cs: "Moudrost ze starodávných učení, doručená za úsvitu" },
  "feat.reconnect_rituals": { en: "Reconnect Rituals", fr: "Rituels de Reconnexion", cs: "Rituály spojení" },
  "feat.reconnect_rituals_desc": { en: "Guided practices for physical and spiritual union", fr: "Pratiques guidées pour l'union physique et spirituelle", cs: "Vedené praktiky pro fyzické a duchovní sjednocení" },
  "feat.sacred_teachings": { en: "Sacred Teachings", fr: "Enseignements Sacrés", cs: "Posvátná učení" },
  "feat.sacred_teachings_desc": { en: "Library of tantric wisdom from master teachers", fr: "Bibliothèque de sagesse tantrique des maîtres", cs: "Knihovna tantrické moudrosti od mistrů" },
  "feat.partner_connect": { en: "Partner Connect", fr: "Connexion Partenaire", cs: "Propojení partnera" },
  "feat.partner_connect_desc": { en: "Link with your beloved for a shared sacred journey", fr: "Connectez-vous avec votre bien-aimé(e) pour un voyage sacré partagé", cs: "Propojte se s milovanou osobou pro společnou posvátnou cestu" },

  // Auth
  "auth.welcome_back": { en: "Welcome back, beloved", fr: "Bienvenue, bien-aimé(e)", cs: "Vítej zpět, milovaná duše" },
  "auth.begin_journey": { en: "Begin your sacred journey", fr: "Commencez votre voyage sacré", cs: "Začněte svou posvátnou cestu" },
  "auth.email": { en: "Email", fr: "E-mail", cs: "E-mail" },
  "auth.password": { en: "Password", fr: "Mot de passe", cs: "Heslo" },
  "auth.enter_temple": { en: "Enter the Temple", fr: "Entrer dans le Temple", cs: "Vstoupit do chrámu" },
  "auth.create_account": { en: "Create Account", fr: "Créer un Compte", cs: "Vytvořit účet" },
  "auth.please_wait": { en: "Please wait...", fr: "Veuillez patienter...", cs: "Čekejte prosím..." },
  "auth.or": { en: "or", fr: "ou", cs: "nebo" },
  "auth.google": { en: "Continue with Google", fr: "Continuer avec Google", cs: "Pokračovat přes Google" },
  "auth.new_path": { en: "New to the path? ", fr: "Nouveau sur le chemin? ", cs: "Nový na cestě? " },
  "auth.have_account": { en: "Already have an account? ", fr: "Déjà un compte? ", cs: "Již máte účet? " },
  "auth.signup": { en: "Sign up", fr: "S'inscrire", cs: "Registrovat se" },
  "auth.login": { en: "Log in", fr: "Se connecter", cs: "Přihlásit se" },
  "auth.fill_fields": { en: "Please fill in all fields", fr: "Veuillez remplir tous les champs", cs: "Vyplňte prosím všechna pole" },
  "auth.check_email": { en: "Check your email to confirm your account!", fr: "Vérifiez votre e-mail pour confirmer votre compte!", cs: "Zkontrolujte svůj e-mail pro potvrzení účtu!" },

  // App Home
  "home.sanctuary": { en: "A Sanctuary for Two", fr: "Un Sanctuaire pour Deux", cs: "Útočiště pro dva" },
  "home.our_sacred_path": { en: "Our Sacred Path", fr: "Notre Chemin Sacré", cs: "Naše Posvátná Cesta" },
  "home.hero_desc": {
    en: "The practices here have been reshaping couples for centuries. One ritual at a time. One breath. One moment of real presence. What begins quietly has a way of changing everything.",
    fr: "Les pratiques ici transforment les couples depuis des siècles. Un rituel à la fois. Un souffle. Un moment de vraie présence. Ce qui commence doucement a le pouvoir de tout changer.",
    cs: "Praktiky zde proměňují páry po staletí. Jeden rituál po druhém. Jeden nádech. Jeden okamžik skutečné přítomnosti. Co začíná tiše, má způsob, jak vše změnit.",
  },
  "home.right_now": { en: "Right Now", fr: "Maintenant", cs: "Právě teď" },
  "home.todays_practice": { en: "Today's Practice", fr: "Pratique du Jour", cs: "Dnešní praktika" },
  "home.open_practice": { en: "Open full practice", fr: "Ouvrir la pratique", cs: "Otevřít praktiku" },

  // Quotes
  "home.q0_book": { en: "Tantra", fr: "Tantra", cs: "Tantra" },
  "home.q0": {
    en: "The moment you accept yourself totally, something relaxes, and in that relaxation energy starts moving upward.",
    fr: "Au moment où vous vous acceptez totalement, quelque chose se détend, et dans cette détente l'énergie commence à monter.",
    cs: "V okamžiku, kdy se zcela přijmete, něco se uvolní a v tom uvolnění se energie začne pohybovat vzhůru.",
  },
  "home.q1_book": { en: "Taoist Secrets", fr: "Secrets Taoïstes", cs: "Taoistická tajemství" },
  "home.q1": {
    en: "When you learn to conserve and circulate sexual energy rather than discharge it, you discover an inexhaustible source of vitality.",
    fr: "Quand vous apprenez à conserver et faire circuler l'énergie sexuelle plutôt qu'à la décharger, vous découvrez une source inépuisable de vitalité.",
    cs: "Když se naučíte uchovávat a cirkulovat sexuální energii místo jejího vybití, objevíte nevyčerpatelný zdroj vitality.",
  },
  "home.q2_book": { en: "Way of the Superior Man", fr: "La Voie de l'Homme Supérieur", cs: "Cesta vyššího muže" },
  "home.q2": {
    en: "The most loving thing you can do for your partner is to be fully present — not managing the moment, but inhabiting it completely.",
    fr: "La chose la plus aimante que vous puissiez faire est d'être pleinement présent — non pas gérer le moment, mais l'habiter complètement.",
    cs: "To nejláskyplnější, co můžete pro partnera udělat, je být plně přítomni — nesnažit se řídit okamžik, ale plně ho prožívat.",
  },
  "home.q3_book": { en: "Heart of Tantric Sex", fr: "Cœur du Sexe Tantrique", cs: "Srdce tantrického sexu" },
  "home.q3": {
    en: "The goal is not ecstasy. It is presence. Ecstasy may arise, but it is never the target.",
    fr: "Le but n'est pas l'extase. C'est la présence. L'extase peut surgir, mais elle n'est jamais la cible.",
    cs: "Cílem není extáze. Je to přítomnost. Extáze může přijít, ale nikdy není cíl.",
  },
  "home.q4": {
    en: "When two people merge in sacred embrace, the mind dissolves into the heart, and breath dissolves into the infinite. This is samadhi dressed as lovemaking.",
    fr: "Quand deux personnes fusionnent dans une étreinte sacrée, l'esprit se dissout dans le cœur, et le souffle se dissout dans l'infini.",
    cs: "Když se dva lidé slijí v posvátném objetí, mysl se rozpustí v srdci a dech se rozpustí v nekonečnu. To je samádhi oblečené do milování.",
  },
  "home.q5_book": { en: "Tao Te Ching", fr: "Tao Te King", cs: "Tao Te Ťing" },
  "home.q5": {
    en: "To the mind that is still, the whole universe surrenders. And to two bodies that are still together, the whole universe opens like a flower.",
    fr: "À l'esprit qui est immobile, tout l'univers se rend. Et à deux corps immobiles ensemble, tout l'univers s'ouvre comme une fleur.",
    cs: "Klidné mysli se celý vesmír poddá. A dvěma tělům, která jsou spolu v klidu, se celý vesmír otevře jako květ.",
  },
  "home.q6_book": { en: "Intimate Communion", fr: "Communion Intime", cs: "Intimní společenství" },
  "home.q6": {
    en: "If you are waiting for your partner to change before you open your heart fully, you are living in a prison of your own making.",
    fr: "Si vous attendez que votre partenaire change avant d'ouvrir pleinement votre cœur, vous vivez dans une prison de votre propre fabrication.",
    cs: "Pokud čekáte, až se váš partner změní, než plně otevřete své srdce, žijete ve vězení vlastní výroby.",
  },
  "home.q7_book": { en: "Slow Sex", fr: "Slow Sex", cs: "Slow Sex" },
  "home.q7": {
    en: "After years of conventional sex, many couples have become strangers in bed. Slow sex is the practice of seeing your partner again, as if for the very first time.",
    fr: "Après des années de sexe conventionnel, beaucoup de couples sont devenus des étrangers au lit. Le slow sex est la pratique de revoir son partenaire, comme pour la toute première fois.",
    cs: "Po letech konvenčního sexu se mnoho párů stalo cizinci v posteli. Pomalý sex je praxí opětovného vidění vašeho partnera, jako by to bylo poprvé.",
  },

  // Today's practices (day-indexed)
  "home.prac0_title": { en: "Eye Gazing", fr: "Regard dans les Yeux", cs: "Hledění do očí" },
  "home.prac0_desc": { en: "Sit facing each other. Maintain soft eye contact for 5 minutes without looking away. Let yourself be fully seen.", fr: "Asseyez-vous face à face. Maintenez un doux contact visuel pendant 5 minutes sans détourner le regard.", cs: "Sedněte si čelem k sobě. Udržujte jemný oční kontakt po dobu 5 minut, aniž byste se dívali jinam." },
  "home.prac1_title": { en: "Synchronized Breath", fr: "Respiration Synchronisée", cs: "Synchronizovaný dech" },
  "home.prac1_desc": { en: "Breathe together — inhale for 4 counts, hold for 4, exhale for 8. Let your energies merge through breath.", fr: "Respirez ensemble — inspirez 4 temps, retenez 4, expirez 8.", cs: "Dýchejte společně — nádech na 4 doby, zadržení na 4, výdech na 8." },
  "home.prac2_title": { en: "Soft Touch Meditation", fr: "Méditation du Toucher Doux", cs: "Meditace jemným dotykem" },
  "home.prac2_desc": { en: "One partner lies still while the other touches with full presence — not to arouse, but to truly feel.", fr: "Un partenaire reste immobile tandis que l'autre touche avec pleine présence — non pour exciter, mais pour vraiment ressentir.", cs: "Jeden partner leží a druhý se dotýká s plnou přítomností — ne aby vzrušoval, ale aby skutečně cítil." },
  "home.prac3_title": { en: "Heart Connection", fr: "Connexion du Cœur", cs: "Spojení srdcí" },
  "home.prac3_desc": { en: "Place your hand on your partner's heart, their hand on yours. Feel the rhythm of love flowing between you.", fr: "Placez votre main sur le cœur de votre partenaire, sa main sur le vôtre. Sentez le rythme de l'amour.", cs: "Položte ruku na srdce partnera, jeho ruku na vaše. Cítíte rytmus lásky proudící mezi vámi." },
  "home.prac4_title": { en: "Yab-Yum Stillness", fr: "Immobilité Yab-Yum", cs: "Ticho Yab-Yum" },
  "home.prac4_desc": { en: "Sit in the sacred Yab-Yum posture. Breathe together in complete stillness for 10 minutes.", fr: "Asseyez-vous dans la posture sacrée Yab-Yum. Respirez ensemble en immobilité complète pendant 10 minutes.", cs: "Sedněte si do posvátné pozice Yab-Yum. Dýchejte společně v naprostém tichu po dobu 10 minut." },
  "home.prac5_title": { en: "Presence Without Words", fr: "Présence Sans Mots", cs: "Přítomnost beze slov" },
  "home.prac5_desc": { en: "Spend 10 minutes together without speaking. No phones, no agenda. Just be with each other.", fr: "Passez 10 minutes ensemble sans parler. Pas de téléphones, pas d'agenda. Simplement être ensemble.", cs: "Strávte 10 minut spolu bez mluvení. Žádné telefony, žádná agenda. Prostě buďte spolu." },
  "home.prac6_title": { en: "Gratitude Ritual", fr: "Rituel de Gratitude", cs: "Rituál vděčnosti" },
  "home.prac6_desc": { en: "Each partner speaks three specific things they appreciate about the other. Receive each one in silence.", fr: "Chaque partenaire nomme trois choses spécifiques qu'il apprécie chez l'autre. Recevez chacune en silence.", cs: "Každý partner řekne tři konkrétní věci, které si na tom druhém cení. Každou přijměte v tichu." },

  // Wisdoms (day-indexed)
  "wisdom.0": {
    en: "The meeting of two souls is like the contact of two elements: if there is a reaction, both are transformed. — C.G. Jung",
    fr: "La rencontre de deux âmes est comme le contact de deux éléments: s'il y a réaction, les deux sont transformés. — C.G. Jung",
    cs: "Setkání dvou duší je jako dotek dvou prvků: pokud dojde k reakci, oba se promění. — C.G. Jung",
  },
  "wisdom.1": {
    en: "Love is not about possession. Love is about appreciation. — Osho",
    fr: "L'amour n'est pas une question de possession. L'amour est une question d'appréciation. — Osho",
    cs: "Láska není o vlastnictví. Láska je o ocenění. — Osho",
  },
  "wisdom.2": {
    en: "The greatest thing you'll ever learn is just to love and be loved in return. — David Deida",
    fr: "La plus grande chose que vous apprendrez jamais est d'aimer et d'être aimé en retour. — David Deida",
    cs: "To největší, co se kdy naučíš, je milovat a být milován. — David Deida",
  },
  "wisdom.3": {
    en: "Tantra says: accept yourself as you are. You are a great mystery. — Osho",
    fr: "Le Tantra dit: acceptez-vous tel que vous êtes. Vous êtes un grand mystère. — Osho",
    cs: "Tantra říká: přijmi sebe takového, jaký jsi. Jsi velké tajemství. — Osho",
  },
  "wisdom.4": {
    en: "True intimacy is the courage to be vulnerable before another. — Brené Brown",
    fr: "La vraie intimité est le courage d'être vulnérable devant un autre. — Brené Brown",
    cs: "Skutečná intimita je odvaha být zranitelný před druhým. — Brené Brown",
  },
  "wisdom.5": {
    en: "The energy of love is the most powerful force in the universe. — Diana Richardson",
    fr: "L'énergie de l'amour est la force la plus puissante de l'univers. — Diana Richardson",
    cs: "Energie lásky je nejmocnější síla ve vesmíru. — Diana Richardson",
  },
  "wisdom.6": {
    en: "Two people who meet in presence create a portal to eternity. — Eckhart Tolle",
    fr: "Deux personnes qui se rencontrent dans la présence créent un portail vers l'éternité. — Eckhart Tolle",
    cs: "Dva lidé, kteří se setkají v přítomnosti, vytvoří portál do věčnosti. — Eckhart Tolle",
  },

  // Thread questions
  "thread.0": { en: "What pleased you most about your partner today?", fr: "Qu'est-ce qui vous a le plus plu chez votre partenaire aujourd'hui?", cs: "Co tě dnes na tvém partnerovi/partnerce nejvíce potěšilo?" },
  "thread.1": { en: "When did you last feel truly seen by your partner?", fr: "Quand vous êtes-vous senti(e) vraiment vu(e) par votre partenaire?", cs: "Kdy jsi se naposledy cítil/a skutečně viděn/a svým partnerem?" },
  "thread.2": { en: "What shared experience from the past week do you value most?", fr: "Quelle expérience partagée de la semaine passée appréciez-vous le plus?", cs: "Jaký společný zážitek z posledního týdne si nejvíce ceníš?" },
  "thread.3": { en: "What would you like your partner to know about your feelings right now?", fr: "Que voudriez-vous que votre partenaire sache sur vos sentiments en ce moment?", cs: "Co bys chtěl/a, aby tvůj partner věděl o tvých pocitech právě teď?" },
  "thread.4": { en: "Which moment today was most intimate for you two?", fr: "Quel moment aujourd'hui a été le plus intime pour vous deux?", cs: "Který okamžik dneška byl pro vás dva nejintimnější?" },
  "thread.5": { en: "How can you show gratitude to your partner today?", fr: "Comment pouvez-vous montrer de la gratitude à votre partenaire aujourd'hui?", cs: "Jak můžeš dnes svému partnerovi ukázat vděčnost?" },
  "thread.6": { en: "What dream would you like to fulfill together?", fr: "Quel rêve aimeriez-vous réaliser ensemble?", cs: "Jaký sen byste chtěli splnit společně?" },

  // Intimacy weather
  "weather.stormy": { en: "Stormy", fr: "Orageux", cs: "Bouřkovo" },
  "weather.cloudy": { en: "Cloudy", fr: "Nuageux", cs: "Oblačno" },
  "weather.warm": { en: "Warm", fr: "Chaleureux", cs: "Teplo" },
  "weather.electric": { en: "Electric", fr: "Électrique", cs: "Elektrické" },
  "weather.radiant": { en: "Radiant", fr: "Radieux", cs: "Zářivé" },
  "weather.you": { en: "YOU", fr: "VOUS", cs: "TY" },
  "weather.partner": { en: "PARTNER", fr: "PARTENAIRE", cs: "PARTNER" },
  "weather.result_title": { en: "Your Intimacy Forecast", fr: "Votre Prévision d'Intimité", cs: "Vaše předpověď intimity" },
  "weather.reset": { en: "Reset for tomorrow", fr: "Réinitialiser pour demain", cs: "Reset na zítra" },
  "weather.pick_desc": { en: "Each of you picks your inner state today — privately. Then see each other's. One glance, no explanation needed.", fr: "Chacun choisit son état intérieur — en privé. Puis voyez celui de l'autre.", cs: "Každý si soukromě vybere svůj vnitřní stav. Pak se podívejte na ten druhého." },

  // Weather combination messages
  "weather.combo.stormy_stormy": { en: "Two storms meeting. Tonight isn't about fixing — it's about being honest that it's hard. Sit together in silence first.", fr: "Deux tempêtes. Ce soir, soyez honnêtes.", cs: "Dvě bouřky. Dnes večer buďte upřímní." },
  "weather.combo.electric_warm": { en: "Warmth and charge — a beautifully creative pairing. Something intentional wants to emerge.", fr: "Chaleur et charge — quelque chose d'intentionnel veut émerger.", cs: "Teplo a náboj — něco záměrného chce vyjít najevo." },
  "weather.combo.radiant_radiant": { en: "Both radiant — this is rare and beautiful. Let yourselves be seen fully tonight.", fr: "Tous deux radieux — rare et beau. Laissez-vous voir pleinement.", cs: "Oba záříte — vzácné a krásné. Nechte se dnes plně vidět." },
  "weather.combo.default": { en: "Choose one practice together before you begin. Let the direction be mutual.", fr: "Choisissez une pratique ensemble. Que la direction soit mutuelle.", cs: "Vyberte si společně jednu praktiku. Ať je směr vzájemný." },

  // Intimacy games prompts
  "games.prompt.0": { en: "What is something you've never told your partner about what attracts you to them?", fr: "Qu'est-ce que vous n'avez jamais dit à votre partenaire sur ce qui vous attire?", cs: "Co jste partnerovi nikdy neřekli o tom, co vás k němu přitahuje?" },
  "games.prompt.1": { en: "Describe a moment when you felt the deepest connection with your partner.", fr: "Décrivez un moment de connexion profonde avec votre partenaire.", cs: "Popište okamžik, kdy jste cítili nejhlubší spojení s partnerem." },
  "games.prompt.2": { en: "If you could relive one intimate moment together, which would it be?", fr: "Si vous pouviez revivre un moment intime, lequel serait-ce?", cs: "Kdybyste mohli znovu prožít jeden intimní okamžik, který by to byl?" },
  "games.prompt.3": { en: "What does your partner do that makes you feel most loved?", fr: "Que fait votre partenaire qui vous fait sentir le plus aimé(e)?", cs: "Co dělá váš partner, díky čemu se cítíte nejvíce milováni?" },
  "games.prompt.4": { en: "Share a fantasy or dream you'd like to explore together.", fr: "Partagez un fantasme que vous aimeriez explorer ensemble.", cs: "Sdílejte fantazii, kterou byste chtěli prozkoumat společně." },
  "games.prompt.5": { en: "What is one thing you'd like more of in your intimate life?", fr: "Qu'aimeriez-vous avoir plus dans votre vie intime?", cs: "Co byste si přáli více ve svém intimním životě?" },
  "games.prompt.6": { en: "Tell your partner three things you find beautiful about their body.", fr: "Dites trois choses que vous trouvez belles chez votre partenaire.", cs: "Řekněte partnerovi tři věci, které na jeho těle považujete za krásné." },
  "games.prompt.7": { en: "What was the first thing that attracted you to your partner?", fr: "Quelle a été la première chose qui vous a attiré(e)?", cs: "Co vás na partnerovi přitáhlo jako první?" },
  "games.draw": { en: "Draw a Card", fr: "Tirer une Carte", cs: "Vytáhnout kartu" },
  "games.next": { en: "Next Card", fr: "Carte Suivante", cs: "Další karta" },
  "games.subscribe_banner": { en: "You've explored the free prompts! Unlock 50+ intimate conversation cards with a Sacred subscription.", fr: "Débloquez 50+ cartes avec un abonnement Sacred.", cs: "Odemkněte 50+ karet s předplatným Sacred." },
  "games.back": { en: "← Back to all tools", fr: "← Retour aux outils", cs: "← Zpět na nástroje" },

  // Connect page
  "connect.find_person": { en: "Find Your Person", fr: "Trouvez Votre Personne", cs: "Najděte svou osobu" },
  "connect.find_desc": { en: "Connect with your beloved to share the sacred journey together", fr: "Connectez-vous avec votre bien-aimé(e) pour partager le voyage sacré ensemble", cs: "Propojte se s milovanou osobou pro společnou posvátnou cestu" },
  "connect.invite": { en: "Invite My Partner", fr: "Inviter Mon Partenaire", cs: "Pozvat partnera" },
  "connect.have_code": { en: "I Have a Code", fr: "J'ai un Code", cs: "Mám kód" },
  "connect.your_code": { en: "Your Invite Code", fr: "Votre Code d'Invitation", cs: "Váš zvací kód" },
  "connect.share_code": { en: "Share this code with your partner to connect your paths", fr: "Partagez ce code avec votre partenaire pour connecter vos chemins", cs: "Sdílejte tento kód s partnerem pro propojení vašich cest" },
  "connect.waiting": { en: "Waiting for your partner to enter this code...", fr: "En attente que votre partenaire entre ce code...", cs: "Čekám, až váš partner zadá tento kód..." },
  "connect.go_back": { en: "Go Back", fr: "Retour", cs: "Zpět" },
  "connect.enter_code": { en: "Enter Partner's Code", fr: "Entrer le Code du Partenaire", cs: "Zadejte kód partnera" },
  "connect.enter_code_desc": { en: "Enter the 6-character code your partner shared with you", fr: "Entrez le code à 6 caractères partagé par votre partenaire", cs: "Zadejte 6znakový kód, který s vámi partner sdílel" },
  "connect.enter_placeholder": { en: "Enter code", fr: "Entrer le code", cs: "Zadejte kód" },
  "connect.connecting": { en: "Connecting...", fr: "Connexion...", cs: "Připojuji..." },
  "connect.connect_btn": { en: "Connect", fr: "Connecter", cs: "Propojit" },
  "connect.connected_title": { en: "You Are Connected", fr: "Vous Êtes Connectés", cs: "Jste propojeni" },
  "connect.connected_desc": { en: "Your sacred path together has begun.", fr: "Votre chemin sacré ensemble a commencé.", cs: "Vaše společná posvátná cesta začala." },
  "connect.enter_temple": { en: "Enter the Temple", fr: "Entrer dans le Temple", cs: "Vstoupit do chrámu" },
  "connect.code_copied": { en: "Code copied!", fr: "Code copié!", cs: "Kód zkopírován!" },
  "connect.partner_connected": { en: "Your partner has connected! 🎉", fr: "Votre partenaire s'est connecté(e)! 🎉", cs: "Váš partner se připojil! 🎉" },
  "connect.failed_generate": { en: "Failed to generate code", fr: "Échec de la génération du code", cs: "Nepodařilo se vygenerovat kód" },
  "connect.invalid_code": { en: "Invalid or expired code", fr: "Code invalide ou expiré", cs: "Neplatný nebo expirovaný kód" },
  "connect.cant_self": { en: "You can't connect with yourself!", fr: "Vous ne pouvez pas vous connecter avec vous-même!", cs: "Nemůžete se propojit sami se sebou!" },
  "connect.failed_connect": { en: "Failed to connect", fr: "Échec de la connexion", cs: "Nepodařilo se připojit" },

  // Reconnect
  "reconnect.for_two": { en: "FOR TWO", fr: "POUR DEUX", cs: "PRO DVA" },
  "reconnect.title": { en: "Reconnect", fr: "Reconnexion", cs: "Znovuspojení" },
  "reconnect.desc": { en: "Practical tools to help you return to each other tonight — through breath, honesty, touch, softness and embodied presence.", fr: "Des outils pratiques pour vous retrouver ce soir — à travers le souffle, l'honnêteté, le toucher, la douceur et la présence incarnée.", cs: "Praktické nástroje, které vám pomohou se k sobě dnes večer vrátit — skrze dech, upřímnost, dotek, jemnost a ztělesněnou přítomnost." },
  "reconnect.tonight_label": { en: "RECONNECT TONIGHT", fr: "RECONNEXION CE SOIR", cs: "ZNOVUSPOJENÍ DNES VEČER" },
  "reconnect.tonight_text": { en: "Choose one doorway back\ninto each other — then let\nthe rest disappear.", fr: "Choisissez une porte\npour revenir l'un vers l'autre — puis laissez\nle reste disparaître.", cs: "Vyberte si jedny dveře zpět\nk sobě navzájem — a nechte\nvše ostatní zmizet." },
  "reconnect.how_to": { en: "HOW IT WORKS", fr: "COMMENT ÇA MARCHE", cs: "JAK TO FUNGUJE" },

  // Reconnect tools
  "reconnect.tool.intimacy_games.title": { en: "Intimacy Games", fr: "Jeux d'Intimité", cs: "Hry intimity" },
  "reconnect.tool.intimacy_games.desc": { en: "A playful prompt to share through the day or start the evening with.", fr: "Un jeu ludique à partager dans la journée ou pour commencer la soirée.", cs: "Hravý impulz ke sdílení během dne nebo k zahájení večera." },
  "reconnect.tool.intimacy_games.step.0": { en: "Draw a random prompt card together", fr: "Tirez une carte ensemble", cs: "Vytáhněte si společně náhodnou kartu" },
  "reconnect.tool.intimacy_games.step.1": { en: "Read it aloud to each other", fr: "Lisez-la à haute voix", cs: "Přečtěte si ji nahlas" },
  "reconnect.tool.intimacy_games.step.2": { en: "Take turns answering honestly", fr: "Répondez à tour de rôle honnêtement", cs: "Střídejte se v upřímných odpovědích" },
  "reconnect.tool.intimacy_games.step.3": { en: "Let the conversation flow naturally", fr: "Laissez la conversation couler", cs: "Nechte konverzaci plynout přirozeně" },

  "reconnect.tool.intimacy_weather.title": { en: "Intimacy Weather", fr: "Météo d'Intimité", cs: "Počasí intimity" },
  "reconnect.tool.intimacy_weather.desc": { en: "Name your emotional climate before touch and receive a gentler doorway back into each other.", fr: "Nommez votre climat émotionnel avant le toucher et recevez une porte plus douce vers l'autre.", cs: "Pojmenujte své emoční klima před dotykem a otevřete jemnější cestu k sobě navzájem." },
  "reconnect.tool.intimacy_weather.step.0": { en: "Sit quietly together for a moment", fr: "Asseyez-vous tranquillement ensemble", cs: "Sedněte si spolu v tichu" },
  "reconnect.tool.intimacy_weather.step.1": { en: "Each describe your inner weather: stormy, sunny, cloudy...", fr: "Décrivez chacun votre météo intérieure", cs: "Každý popište své vnitřní počasí: bouřlivé, slunečné, zatažené..." },
  "reconnect.tool.intimacy_weather.step.2": { en: "Listen without trying to fix", fr: "Écoutez sans essayer de réparer", cs: "Naslouchejte bez snahy opravovat" },
  "reconnect.tool.intimacy_weather.step.3": { en: "Find one small way to meet each other where you are", fr: "Trouvez un petit moyen de vous rejoindre là où vous êtes", cs: "Najděte jeden malý způsob, jak se potkat tam, kde jste" },

  "reconnect.tool.the_unsaid.title": { en: "The Unsaid", fr: "Le Non-Dit", cs: "Nevyřčené" },
  "reconnect.tool.the_unsaid.desc": { en: "Write what feels unspoken first, privately, before it hardens into distance.", fr: "Écrivez ce qui est non-dit d'abord, en privé, avant que cela ne se durcisse en distance.", cs: "Napište nejprve soukromě to, co cítíte jako nevyřčené, než to ztuhne v odstup." },

  "reconnect.tool.the_thread.title": { en: "The Thread", fr: "Le Fil", cs: "Nit" },
  "reconnect.tool.the_thread.desc": { en: "Leave one small gratitude for tonight and let tenderness accumulate over time.", fr: "Laissez une petite gratitude pour ce soir et laissez la tendresse s'accumuler.", cs: "Zanechte jeden malý vděk na dnešní večer a nechte něhu narůstat časem." },

  "reconnect.tool.date_night.title": { en: "Date Night Ideas", fr: "Idées de Soirée", cs: "Nápady na rande" },
  "reconnect.tool.date_night.desc": { en: "One idea, chosen for you. Shuffle until something calls to you both.", fr: "Une idée, choisie pour vous. Mélangez jusqu'à ce que quelque chose vous appelle.", cs: "Jeden nápad vybraný pro vás. Míchejte, dokud vás něco neosloví." },

  "reconnect.tool.shared_messages.title": { en: "Shared Messages", fr: "Messages Partagés", cs: "Sdílené zprávy" },
  "reconnect.tool.shared_messages.desc": { en: "Ready-made words to send — or write your own.", fr: "Des mots prêts à envoyer — ou écrivez les vôtres.", cs: "Připravená slova k odeslání — nebo napište vlastní." },

  "reconnect.unlock": { en: "Unlock all 6 tools", fr: "Débloquer les 6 outils", cs: "Odemknout všech 6 nástrojů" },
  "reconnect.unlock_desc": { en: "Access all sacred reconnection tools with a Sacred subscription. 7 days free.", fr: "Accédez à tous les outils sacrés avec un abonnement Sacred. 7 jours gratuits.", cs: "Přístup ke všem posvátným nástrojům s předplatným Sacred. 7 dní zdarma." },

  // Rituals page (behind Right Now)
  "rituals.title": { en: "Connection Rituals", fr: "Rituels de Connexion", cs: "Rituály spojení" },
  "rituals.desc": { en: "Sacred practices for deepening physical, emotional and spiritual bonds", fr: "Pratiques sacrées pour approfondir les liens physiques, émotionnels et spirituels", cs: "Posvátné praktiky pro prohloubení fyzického, emočního a duchovního pouta" },
  "rituals.step_guide": { en: "Step-by-step Guide", fr: "Guide Étape par Étape", cs: "Průvodce krok za krokem" },
  "rituals.unlock": { en: "Unlock all 6 rituals", fr: "Débloquer les 6 rituels", cs: "Odemknout všech 6 rituálů" },
  "rituals.unlock_desc": { en: "Access all sacred connection rituals with a Sacred subscription. 7 days free.", fr: "Accédez à tous les rituels sacrés avec un abonnement Sacred. 7 jours gratuits.", cs: "Přístup ke všem posvátným rituálům s předplatným Sacred. 7 dní zdarma." },

  "ritual.0.title": { en: "Synchronized Breath", fr: "Souffle Synchronisé", cs: "Synchronizovaný dech" },
  "ritual.0.desc": { en: "Breathe as one. A foundational practice that aligns your nervous systems and opens the channel of intimacy.", fr: "Respirez comme un seul être. Une pratique fondamentale.", cs: "Dýchejte jako jeden. Základní praktika, která sladí vaše nervové systémy." },
  "ritual.0.step.0": { en: "Sit facing each other, knees touching if possible.", fr: "Asseyez-vous face à face, genoux se touchant.", cs: "Sedněte si čelem k sobě, kolena se dotýkají." },
  "ritual.0.step.1": { en: "Place your right hand on your partner's heart.", fr: "Main droite sur le cœur de votre partenaire.", cs: "Položte pravou ruku na srdce partnera." },
  "ritual.0.step.2": { en: "Close your eyes and breathe together — inhale for 4 counts.", fr: "Fermez les yeux, inspirez pendant 4 temps.", cs: "Zavřete oči a dýchejte společně — nádech na 4 doby." },
  "ritual.0.step.3": { en: "Hold for 2 counts at the top of the breath.", fr: "Retenez pendant 2 temps.", cs: "Zadržte na 2 doby na vrcholu nádechu." },
  "ritual.0.step.4": { en: "Exhale slowly for 6 counts, releasing all tension.", fr: "Expirez lentement pendant 6 temps.", cs: "Pomalu vydechněte na 6 dob, uvolněte napětí." },
  "ritual.0.step.5": { en: "Continue for 5 minutes, feeling your heartbeats synchronize.", fr: "Continuez 5 minutes, sentez vos cœurs se synchroniser.", cs: "Pokračujte 5 minut, vnímejte synchronizaci srdcí." },
  "ritual.1.title": { en: "Candle Gazing", fr: "Regard de Bougie", cs: "Pohled do svíčky" },
  "ritual.1.desc": { en: "Gaze into each other's eyes by candlelight. This ancient Trataka practice dissolves barriers between souls.", fr: "Regardez-vous dans les yeux à la lueur des bougies.", cs: "Dívejte se sobě do očí při svíčce. Starodávná praxe Trataka." },
  "ritual.1.step.0": { en: "Light a candle and place it between you at eye level.", fr: "Allumez une bougie entre vous.", cs: "Zapalte svíčku a umístěte ji mezi vás." },
  "ritual.1.step.1": { en: "Sit comfortably facing each other in dim light.", fr: "Asseyez-vous face à face dans la pénombre.", cs: "Pohodlně se usaďte čelem k sobě v přítmí." },
  "ritual.1.step.2": { en: "Gaze softly into your partner's left eye.", fr: "Regardez doucement l'œil gauche.", cs: "Jemně se dívejte do levého oka partnera." },
  "ritual.1.step.3": { en: "Allow emotions to surface without judgment.", fr: "Laissez les émotions monter sans jugement.", cs: "Dovolte emocím vynořit se bez posuzování." },
  "ritual.1.step.4": { en: "If your gaze drifts, gently return to your partner's eye.", fr: "Si votre regard dérive, revenez doucement.", cs: "Pokud vám pohled uteče, jemně se vraťte." },
  "ritual.1.step.5": { en: "After 10 minutes, close your eyes and bow to each other.", fr: "Après 10 minutes, inclinez-vous.", cs: "Po 10 minutách zavřete oči a ukloňte se." },
  "ritual.2.title": { en: "Sacred Touch Mapping", fr: "Cartographie du Toucher Sacré", cs: "Mapování posvátného doteku" },
  "ritual.2.desc": { en: "Discover the landscape of your partner's body with present, intentional touch.", fr: "Découvrez le corps de votre partenaire avec un toucher intentionnel.", cs: "Objevte krajinu těla partnera přítomným, záměrným dotekem." },
  "ritual.3.title": { en: "Energy Circuit", fr: "Circuit d'Énergie", cs: "Energetický obvod" },
  "ritual.3.desc": { en: "Create a closed loop of energy between your bodies. Feel the current of life force flowing.", fr: "Créez une boucle fermée d'énergie entre vos corps.", cs: "Vytvořte uzavřený okruh energie mezi vašimi těly." },
  "ritual.4.title": { en: "Devotional Bathing", fr: "Bain Dévotionnel", cs: "Oddanostní koupel" },
  "ritual.4.desc": { en: "Bathe your partner as an act of worship. Water as purification, touch as prayer.", fr: "Baignez votre partenaire comme un acte de dévotion.", cs: "Koupejte partnera jako akt uctívání. Voda jako očista, dotek jako modlitba." },
  "ritual.5.title": { en: "Midnight Whisper Ritual", fr: "Rituel du Murmure de Minuit", cs: "Rituál půlnočního šepotu" },
  "ritual.5.desc": { en: "In complete darkness, whisper your deepest truths. The night holds space for what daylight cannot.", fr: "Dans l'obscurité, chuchotez vos vérités profondes.", cs: "V úplné tmě šeptejte své nejhlubší pravdy." },

  // Paths page
  "paths.lineage": { en: "Ancient Traditions", fr: "Traditions Anciennes", cs: "Starověké tradice" },
  "paths.title": { en: "Sacred Paths", fr: "Chemins Sacrés", cs: "Posvátné cesty" },
  "paths.subtitle": { en: "Explore the ancient traditions that guide couples toward deeper union", fr: "Explorez les traditions anciennes qui guident les couples", cs: "Prozkoumejte starověké tradice, které vedou páry k hlubšímu sjednocení" },
  "paths.quote": { en: "Quote", fr: "Citation", cs: "Citát" },
  "paths.ritual": { en: "Ritual", fr: "Rituel", cs: "Rituál" },
  "paths.unlock": { en: "Premium Path", fr: "Chemin Premium", cs: "Premium cesta" },
  "paths.unlock_desc": { en: "Unlock this path with a Sacred subscription. 7 days free.", fr: "Débloquez ce chemin avec un abonnement Sacred. 7 jours gratuits.", cs: "Odemkněte tuto cestu s předplatným Sacred. 7 dní zdarma." },
  "paths.unlock_all": { en: "Unlock all paths & teachings", fr: "Débloquer tous les chemins", cs: "Odemknout všechny cesty" },
  "paths.unlock_all_desc": { en: "Access Kama Sutra, Sacred Sexuality and more. 7 days free.", fr: "Accédez au Kama Sutra et plus. 7 jours gratuits.", cs: "Přístup ke Kama Sútře a dalším. 7 dní zdarma." },

  "path.tantra.name": { en: "Tantra", fr: "Tantra", cs: "Tantra" },
  "path.tantra.desc": { en: "The path of weaving. Body, breath, energy and consciousness united. The body is not an obstacle to awakening — it is the instrument.", fr: "Le chemin du tissage. Corps, souffle, énergie et conscience unis.", cs: "Cesta tkaní. Tělo, dech, energie a vědomí sjednocené." },
  "path.tantra.quote": { en: "Tantra says: accept yourself as you are. You are a great mystery of many energies, and hidden behind all those energies is the divine.", fr: "Le Tantra dit: acceptez-vous tel que vous êtes. Vous êtes un grand mystère.", cs: "Tantra říká: přijmi sebe takového, jaký jsi. Za všemi energiemi se skrývá božské." },
  "path.tantra.ritual_title": { en: "Heart-to-Heart Meditation", fr: "Méditation Cœur à Cœur", cs: "Srdce na srdce meditace" },
  "path.tantra.ritual_desc": { en: "Sit facing each other. Place your right hand on your partner's heart, their right hand on yours. Close your eyes, synchronize your breath, and visualize golden light flowing between your hearts for 10 minutes.", fr: "Asseyez-vous face à face. Main droite sur le cœur de l'autre. Visualisez une lumière dorée pendant 10 minutes.", cs: "Sedněte čelem k sobě. Ruku na srdce partnera. Vizualizujte zlaté světlo proudící mezi srdci po 10 minut." },
  "path.tantra.pq1": { en: "When two bodies dissolve into each other, that is the beginning of the divine experience.", fr: "Quand deux corps se dissolvent, c'est le début de l'expérience divine.", cs: "Když se dvě těla rozpustí jedno v druhém, je to začátek božské zkušenosti." },
  "path.tantra.pq2": { en: "In the sacred embrace, the mind dissolves into the heart, and breath dissolves into the infinite.", fr: "Dans l'étreinte sacrée, l'esprit se dissout dans le cœur.", cs: "V posvátném objetí se mysl rozpustí v srdci." },
  "path.tantra.pr1": { en: "Shiva-Shakti Polarity Practice", fr: "Pratique de Polarité Shiva-Shakti", cs: "Praxe polarity Šiva-Šakti" },
  "path.tantra.pr2": { en: "Kundalini Awakening Couples Ritual", fr: "Rituel d'Éveil de la Kundalini", cs: "Rituál probuzení kundaliní" },

  "path.tao.name": { en: "Tao", fr: "Tao", cs: "Tao" },
  "path.tao.desc": { en: "The path of natural flow. Yin-yang harmony, chi cultivation, loving longevity.", fr: "Le chemin du flux naturel. Harmonie yin-yang, cultivation du chi.", cs: "Cesta přirozeného toku. Harmonie jin-jang, kultivace čchi." },
  "path.tao.quote": { en: "To the mind that is still, the whole universe surrenders. And to two bodies that are still together, the whole universe opens like a flower.", fr: "À l'esprit immobile, tout l'univers se rend.", cs: "Klidné mysli se celý vesmír poddá." },
  "path.tao.ritual_title": { en: "Microcosmic Orbit for Two", fr: "Orbite Microcosmique pour Deux", cs: "Mikrokosmická orbita pro dva" },
  "path.tao.ritual_desc": { en: "Sit facing each other. Breathe together — visualize energy circulating up the spine on inhale and down the front on exhale. After 10 cycles, connect your orbits through joined hands.", fr: "Face à face. Visualisez l'énergie circulant le long de la colonne.", cs: "Čelem k sobě. Vizualizujte energii cirkulující podél páteře." },
  "path.tao.pq1": { en: "When you learn to conserve sexual energy, you discover an inexhaustible source of vitality.", fr: "Quand vous conservez l'énergie sexuelle, vous découvrez une source inépuisable.", cs: "Když uchováváte sexuální energii, objevíte nevyčerpatelný zdroj vitality." },
  "path.tao.pq2": { en: "The valley orgasm is not a peak — it is an ocean spreading through every cell.", fr: "L'orgasme de la vallée n'est pas un sommet — c'est un océan.", cs: "Údolní orgasmus není vrchol — je to oceán." },
  "path.tao.pr1": { en: "Valley Orgasm Couples Practice", fr: "Pratique d'Orgasme de la Vallée", cs: "Praxe údolního orgasmu" },
  "path.tao.pr2": { en: "Chi Circulation for Longevity", fr: "Circulation du Chi", cs: "Cirkulace čchi pro dlouhověkost" },

  "path.kamasutra.name": { en: "Kama Sutra", fr: "Kama Sutra", cs: "Kámasútra" },
  "path.kamasutra.desc": { en: "The ancient art of love. Beyond positions — a complete guide to desire, connection, and the art of living fully as lovers.", fr: "L'art ancien de l'amour.", cs: "Starobylé umění lásky." },
  "path.sacred_sexuality.name": { en: "Sacred Sexuality", fr: "Sexualité Sacrée", cs: "Posvátná sexualita" },
  "path.sacred_sexuality.desc": { en: "Where ancient wisdom meets modern understanding. A holistic approach to sexuality as a spiritual practice.", fr: "Où la sagesse ancienne rencontre la compréhension moderne.", cs: "Kde se moudrost potkává s moderním porozuměním." },

  // Authors page
  "authors.lineage": { en: "Guiding Masters", fr: "Maîtres Guides", cs: "Průvodci" },
  "authors.title": { en: "Guiding Authors", fr: "Auteurs Guides", cs: "Průvodci a autoři" },
  "authors.subtitle": { en: "Wisdom from the masters who have illuminated the path of sacred love", fr: "Sagesse des maîtres qui ont illuminé le chemin de l'amour sacré", cs: "Moudrost od mistrů posvátné lásky" },
  "authors.unlock": { en: "Premium Author", fr: "Auteur Premium", cs: "Premium autor" },
  "authors.unlock_desc": { en: "Unlock this author's teachings with a Sacred subscription. 7 days free.", fr: "Débloquez avec un abonnement Sacred.", cs: "Odemkněte s předplatným Sacred." },
  "authors.unlock_all": { en: "Unlock all authors & teachings", fr: "Débloquer tous les auteurs", cs: "Odemknout všechny autory" },
  "authors.unlock_all_desc": { en: "Access Richardson, Mantak Chia, Jan Day, Barry Long and more. 7 days free.", fr: "Accédez à Richardson, Mantak Chia, Jan Day, Barry Long et plus.", cs: "Přístup k Richardson, Mantak Chia, Jan Day, Barry Long a dalším." },

  "author.osho.name": { en: "Osho", fr: "Osho", cs: "Osho" },
  "author.osho.desc": { en: "The rebellious mystic who bridged ancient Tantra with modern seekers. His radical teachings on love and consciousness have transformed millions.", fr: "Le mystique rebelle qui a relié le Tantra ancien aux chercheurs modernes.", cs: "Rebelský mystik, který propojil tantru s moderními hledajícími." },
  "author.osho.quote": { en: "The moment you accept yourself totally, something relaxes, and in that relaxation energy starts moving upward. This is the alchemy of Tantra.", fr: "Au moment où vous vous acceptez totalement, quelque chose se détend et l'énergie monte.", cs: "V okamžiku, kdy se zcela přijmete, něco se uvolní a energie se začne pohybovat vzhůru." },
  "author.osho.ritual_title": { en: "Dynamic Presence Meditation for Couples", fr: "Méditation de Présence Dynamique", cs: "Dynamická meditace přítomnosti pro páry" },
  "author.osho.ritual_desc": { en: "Stand facing each other. For 5 minutes, shake your whole body vigorously while breathing deeply. Then stop — stand still, look into each other's eyes in total silence for 5 minutes.", fr: "Debout face à face. Secouez le corps 5 minutes. Puis silence et regard 5 minutes.", cs: "Čelem k sobě. 5 minut protřepávejte tělem. Pak klid — oční kontakt v tichu 5 minut." },
  "author.osho.pq1": { en: "Love is not about possession. Love is about appreciation.", fr: "L'amour n'est pas une question de possession.", cs: "Láska není o vlastnictví. Láska je o ocenění." },
  "author.osho.pr1": { en: "Osho's Dynamic Couples Meditation", fr: "Méditation Dynamique d'Osho", cs: "Oshova dynamická meditace" },

  "author.deida.name": { en: "David Deida", fr: "David Deida", cs: "David Deida" },
  "author.deida.desc": { en: "A modern master of masculine-feminine polarity. His teachings on presence, depth, and fearless loving are essential for conscious couples.", fr: "Un maître moderne de la polarité masculin-féminin.", cs: "Moderní mistr polarity maskulinního a femininního." },
  "author.deida.quote": { en: "The most loving thing you can do for your partner is to be fully present — not managing the moment, but inhabiting it completely.", fr: "La chose la plus aimante est d'être pleinement présent.", cs: "To nejláskyplnější je být plně přítomni — ne řídit okamžik, ale plně ho prožívat." },
  "author.deida.ritual_title": { en: "Polarity Breath Practice", fr: "Pratique de Respiration de Polarité", cs: "Praxe dechu polarity" },
  "author.deida.ritual_desc": { en: "One partner embodies masculine presence (stillness, depth) while the other embodies feminine flow (movement, radiance). Breathe together for 10 minutes, then switch roles.", fr: "Un incarne la présence masculine, l'autre le flux féminin. 10 minutes, puis échangez.", cs: "Jeden ztělesňuje maskulinní přítomnost, druhý femininní tok. 10 minut, pak výměna." },
  "author.deida.pq1": { en: "If you are waiting for your partner to change before you open your heart fully, you are living in a prison of your own making.", fr: "Si vous attendez que votre partenaire change, vous vivez dans une prison.", cs: "Pokud čekáte, až se partner změní, žijete ve vězení vlastní výroby." },
  "author.deida.pr1": { en: "Deida's Edge Practice for Couples", fr: "Pratique du Bord de Deida", cs: "Deidova praxe na hraně" },

  "author.anand.name": { en: "Margot Anand", fr: "Margot Anand", cs: "Margot Anand" },
  "author.anand.desc": { en: "Creator of SkyDancing Tantra. She teaches couples to transform sexual energy into ecstatic states of love.", fr: "Créatrice du SkyDancing Tantra.", cs: "Tvůrkyně SkyDancing Tantry." },
  "author.anand.quote": { en: "Sexual energy is the most powerful creative force available to human beings. In Tantra, you learn to circulate it, amplify it, and direct it.", fr: "L'énergie sexuelle est la force créatrice la plus puissante.", cs: "Sexuální energie je nejmocnější tvůrčí síla." },
  "author.anand.ritual_title": { en: "SkyDancing Heart Opening", fr: "Ouverture du Cœur SkyDancing", cs: "Otevření srdce SkyDancing" },
  "author.anand.ritual_desc": { en: "Sit in Yab-Yum. Breathe in through nose, out through mouth into partner's heart. After 5 minutes, begin gentle rocking with eye contact.", fr: "En Yab-Yum. Respirez vers le cœur de l'autre. Après 5 min, balancez-vous doucement.", cs: "V Yab-Yum. Dýchejte do srdce partnera. Po 5 minutách jemné houpání s očním kontaktem." },
  "author.anand.pq1": { en: "Ecstasy is not a distraction from the spiritual path. It is the path itself.", fr: "L'extase n'est pas une distraction. C'est le chemin.", cs: "Extáze není odvedení od cesty. Je tou cestou." },
  "author.anand.pr1": { en: "Anand's Wave of Bliss Ritual", fr: "Rituel de la Vague de Béatitude", cs: "Rituál vlny blaženosti" },

  "author.richardson.name": { en: "Diana Richardson", fr: "Diana Richardson", cs: "Diana Richardson" },
  "author.richardson.desc": { en: "Pioneer of slow sex and tantric presence. Stillness is the most intimate act.", fr: "Pionnière du slow sex et de la présence tantrique.", cs: "Průkopnice pomalého sexu a tantrické přítomnosti." },
  "author.chia.name": { en: "Mantak Chia", fr: "Mantak Chia", cs: "Mantak Chia" },
  "author.chia.desc": { en: "Taoist master of sexual alchemy. His teachings have helped millions discover vitality and deeper intimacy.", fr: "Maître taoïste de l'alchimie sexuelle.", cs: "Taoistický mistr sexuální alchymie." },

  "author.day.name": { en: "Jan Day", fr: "Jan Day", cs: "Jan Day" },
  "author.day.desc": { en: "A contemporary tantra teacher who brings sexuality, emotional truth, and spiritual growth into one embodied path for modern couples.", fr: "Une enseignante contemporaine de tantra qui unit sexualité, vérité émotionnelle et croissance spirituelle.", cs: "Současná učitelka tantry, která spojuje sexualitu, emoční pravdivost a duchovní růst do jedné ztělesněné cesty." },

  "author.bush.name": { en: "Max Bush", fr: "Max Bush", cs: "Max Bush" },
  "author.bush.desc": { en: "A practical modern sex-and-intimacy guide focused on connection, positions, and accessible techniques for couples exploring pleasure together.", fr: "Un guide pratique moderne du sexe et de l'intimité axé sur la connexion et les techniques accessibles.", cs: "Praktický moderní průvodce sexem a intimitou zaměřený na propojení, pozice a přístupné techniky." },

  "author.hollander.name": { en: "Xaviera Hollander", fr: "Xaviera Hollander", cs: "Xaviera Hollander" },
  "author.hollander.desc": { en: "An outspoken guide to erotic honesty and pleasure, known for bringing directness, curiosity, and unapologetic sexual candor into intimate life.", fr: "Une guide franche de l'honnêteté érotique et du plaisir, connue pour sa franchise et sa curiosité.", cs: "Otevřená průvodkyně erotickou upřímností a rozkoší, známá svou přímostí a neomlouvající se sexuální otevřeností." },

  "author.gold.name": { en: "Victor Gold", fr: "Victor Gold", cs: "Victor Gold" },
  "author.gold.desc": { en: "A teacher of erotic spirituality who blends sexual healing, potency work, and spiritual transformation through conscious sexual energy.", fr: "Un enseignant de la spiritualité érotique mêlant guérison sexuelle et transformation spirituelle.", cs: "Učitel erotické spirituality, který propojuje sexuální uzdravení, práci s potencí a duchovní transformaci." },

  "author.long.name": { en: "Barry Long", fr: "Barry Long", cs: "Barry Long" },
  "author.long.desc": { en: "A spiritual teacher whose work on sexual love focuses on truth, purity, and the rediscovery of deep union between man and woman.", fr: "Un enseignant spirituel dont l'œuvre sur l'amour sexuel se concentre sur la vérité et l'union profonde.", cs: "Duchovní učitel, jehož dílo o sexuální lásce se zaměřuje na pravdu, čistotu a znovuobjevení hlubokého spojení." },

  // Shared keys
  "teachings.premium": { en: "Premium", fr: "Premium", cs: "Premium" },
  "teachings.unlock_hint": { en: "Unlock with a Sacred subscription...", fr: "Débloquez avec un abonnement Sacred...", cs: "Odemkněte s předplatným Sacred..." },
  "teachings.view_plans": { en: "View plans", fr: "Voir les plans", cs: "Zobrazit plány" },

  // Pricing
  "pricing.title": { en: "Choose Your Path", fr: "Choisissez Votre Chemin", cs: "Vyberte si svou cestu" },
  "pricing.desc": { en: "Begin with a free practice or unlock the full sacred library", fr: "Commencez gratuitement ou débloquez la bibliothèque sacrée", cs: "Začněte zdarma nebo odemkněte celou posvátnou knihovnu" },
  "pricing.free": { en: "Free", fr: "Gratuit", cs: "Zdarma" },
  "pricing.forever": { en: "forever", fr: "pour toujours", cs: "navždy" },
  "pricing.sacred": { en: "Sacred", fr: "Sacré", cs: "Posvátné" },
  "pricing.month": { en: "/month", fr: "/mois", cs: "/měsíc" },
  "pricing.sacred_yearly": { en: "Sacred Yearly", fr: "Sacré Annuel", cs: "Posvátné roční" },
  "pricing.year": { en: "/year", fr: "/an", cs: "/rok" },
  "pricing.most_popular": { en: "Most Popular", fr: "Le Plus Populaire", cs: "Nejoblíbenější" },
  "pricing.get_started": { en: "Get Started", fr: "Commencer", cs: "Začít" },
  "pricing.start_trial": { en: "Start 7-Day Trial", fr: "Essai Gratuit 7 Jours", cs: "Začít 7denní zkušební období" },
  "pricing.feat_whisper": { en: "Daily Whisper wisdom quote", fr: "Citation de sagesse quotidienne", cs: "Denní moudrost" },
  "pricing.feat_teachings_free": { en: "2 free teachings", fr: "2 enseignements gratuits", cs: "2 učení zdarma" },
  "pricing.feat_partner": { en: "Partner Connect", fr: "Connexion Partenaire", cs: "Propojení partnera" },
  "pricing.feat_rituals_basic": { en: "2 free Reconnect rituals", fr: "2 rituels gratuits", cs: "2 rituály zdarma" },
  "pricing.feat_everything_free": { en: "Everything in Free", fr: "Tout dans Gratuit", cs: "Vše ze Zdarma" },
  "pricing.feat_library": { en: "Full teaching library (50+ lessons)", fr: "Bibliothèque complète (50+ leçons)", cs: "Celá knihovna (50+ lekcí)" },
  "pricing.feat_all_rituals": { en: "All 6 Reconnect rituals", fr: "Les 6 rituels", cs: "Všech 6 rituálů" },
  "pricing.feat_weather": { en: "Intimacy Weather tracking", fr: "Suivi Météo d'Intimité", cs: "Sledování intimity" },
  "pricing.feat_thread": { en: "The Thread daily questions", fr: "Questions quotidiennes", cs: "Denní otázky" },
  "pricing.feat_priority": { en: "Priority new content", fr: "Contenu prioritaire", cs: "Prioritní obsah" },
  "pricing.feat_everything_sacred": { en: "Everything in Sacred", fr: "Tout dans Sacré", cs: "Vše z Posvátné" },
  "pricing.feat_save": { en: "Save 44%", fr: "Économisez 44%", cs: "Ušetřete 44%" },
  "pricing.feat_exclusive": { en: "Exclusive annual-only teachings", fr: "Enseignements exclusifs annuels", cs: "Exkluzivní roční učení" },
  "pricing.feat_early": { en: "Early access to new features", fr: "Accès anticipé", cs: "Předčasný přístup" },

  // Nav space
  "nav.space": { en: "Temple", fr: "Temple", cs: "Chrám" },

  // Temple Entry
  "temple.slide1_label": { en: "ANCIENT WISDOM", fr: "SAGESSE ANCIENNE", cs: "PRADÁVNÁ MOUDROST" },
  "temple.slide1_title": { en: "Thousands of years of sacred teaching — for the two of you.", fr: "Des milliers d'années d'enseignement sacré — pour vous deux.", cs: "Tisíce let posvátného učení — pro vás dva." },
  "temple.slide1_desc": { en: "Tantra, Tao, and the world's most honest teachers on love. All distilled into one daily practice that brings you genuinely closer.", fr: "Tantra, Tao et les enseignants les plus honnêtes du monde sur l'amour. Le tout distillé en une pratique quotidienne qui vous rapproche sincèrement.", cs: "Tantra, Tao a nejupřímnější učitelé lásky na světě. Vše destilováno do jedné denní praxe, která vás opravdu sblíží." },
  "temple.slide1_btn": { en: "Continue", fr: "Continuer", cs: "Pokračovat" },

  "temple.slide2_label": { en: "FEEL EACH OTHER AGAIN", fr: "SE SENTIR À NOUVEAU", cs: "ZNOVU SE CÍTIT" },
  "temple.slide2_title": { en: "Most couples stop really touching. Sacred Path brings you back.", fr: "La plupart des couples arrêtent de vraiment se toucher. Sacred Path vous ramène.", cs: "Většina párů se přestane opravdu dotýkat. Sacred Path vás vrátí zpět." },
  "temple.slide2_desc": { en: "Diana Richardson's Slow Sex. David Deida's polarity work. Taoist intimacy practices. Real teachings. Real presence. Real change.", fr: "Le Slow Sex de Diana Richardson. Le travail de polarité de David Deida. Les pratiques d'intimité taoïstes. De vrais enseignements. Une vraie présence. Un vrai changement.", cs: "Pomalý sex Diany Richardson. Práce s polaritou Davida Deidy. Taoistické intimní praktiky. Skutečné učení. Skutečná přítomnost. Skutečná změna." },
  "temple.slide2_btn": { en: "I want this", fr: "Je veux ça", cs: "Chci to" },

  "temple.slide3_label": { en: "YOUR DAILY PRACTICE", fr: "VOTRE PRATIQUE QUOTIDIENNE", cs: "VAŠE DENNÍ PRAXE" },
  "temple.slide3_title": { en: "One ritual a day. A relationship that deepens over time.", fr: "Un rituel par jour. Une relation qui s'approfondit avec le temps.", cs: "Jeden rituál denně. Vztah, který se postupně prohlubuje." },
  "temple.slide3_desc": { en: "Daily wisdom, intimacy weather, shared gratitude, and the unsaid — the thread that connects two people who have chosen each other.", fr: "Sagesse quotidienne, météo de l'intimité, gratitude partagée et le non-dit — le fil qui relie deux personnes qui se sont choisies.", cs: "Denní moudrost, počasí intimity, sdílená vděčnost a nevyřčené — nit, která spojuje dva lidi, kteří si vybrali jeden druhého." },
  "temple.slide3_btn": { en: "Begin Our Path", fr: "Commencer notre chemin", cs: "Začít naši cestu" },

  // Partner Space
  "space.title": { en: "Your Sacred Space", fr: "Votre Espace Sacré", cs: "Váš Posvátný Prostor" },
  "space.subtitle": { en: "A private place for you and your partner", fr: "Un lieu privé pour vous et votre partenaire", cs: "Soukromé místo pro vás a vašeho partnera" },
  "space.whisper": { en: "Whisper", fr: "Murmure", cs: "Šepot" },
  "space.teaser": { en: "Teaser", fr: "Taquinerie", cs: "Škádlení" },
  "space.thread": { en: "Thread", fr: "Fil", cs: "Nit" },
  "space.ritual_invite": { en: "Ritual", fr: "Rituel", cs: "Rituál" },
  "space.send_teaser": { en: "Send Teaser 🔥", fr: "Envoyer Taquinerie 🔥", cs: "Poslat škádlení 🔥" },
  "space.invite_ritual": { en: "Invite to Ritual ✦", fr: "Inviter au rituel ✦", cs: "Pozvat k rituálu ✦" },
  "space.ritual_invite_msg": { en: "I'd love to do a ritual together tonight… ✦", fr: "J'aimerais faire un rituel ensemble ce soir… ✦", cs: "Chtěl/a bych dnes večer udělat rituál společně… ✦" },
  "space.placeholder": { en: "Write something sacred...", fr: "Écrivez quelque chose de sacré...", cs: "Napište něco posvátného..." },
  "space.empty": { en: "Your sacred space awaits its first whisper...", fr: "Votre espace sacré attend son premier murmure...", cs: "Váš posvátný prostor čeká na první šepot..." },
  "space.not_connected": { en: "No Partner Connected", fr: "Pas de partenaire connecté", cs: "Žádný partner nepřipojen" },
  "space.connect_first": { en: "Connect with your partner first to unlock your sacred space.", fr: "Connectez-vous d'abord avec votre partenaire.", cs: "Nejprve se spojte se svým partnerem." },
  "space.teaser_1": { en: "I can't stop thinking about you right now… 🔥", fr: "Je ne peux pas arrêter de penser à toi…🔥", cs: "Nemůžu přestat na tebe myslet… 🔥" },
  "space.teaser_2": { en: "Tonight, I want to look into your eyes and just breathe together.", fr: "Ce soir, je veux te regarder dans les yeux et juste respirer ensemble.", cs: "Dnes v noci se ti chci dívat do očí a jen spolu dýchat." },
  "space.teaser_3": { en: "You have no idea what you do to me…", fr: "Tu n'as aucune idée de ce que tu me fais…", cs: "Nemáš tušení, co se mnou děláš…" },
  "space.teaser_4": { en: "I want to trace every line of your body slowly tonight…", fr: "Je veux tracer chaque ligne de ton corps lentement ce soir…", cs: "Dnes v noci chci pomalu projít každou linii tvého těla…" },
  "space.teaser_5": { en: "Let's do something sacred tonight. Just us. 🕯", fr: "Faisons quelque chose de sacré ce soir. Juste nous. 🕯", cs: "Pojďme dnes večer udělat něco posvátného. Jen my dva. 🕯" },
  "space.teaser_6": { en: "I want to feel you close. Really close. ✨", fr: "Je veux te sentir près. Vraiment près. ✨", cs: "Chci tě cítit blízko. Opravdu blízko. ✨" },

  // Temple tabs
  "temple.title": { en: "The Temple", fr: "Le Temple", cs: "Chrám" },
  "temple.subtitle": { en: "Your private sacred space — reconnect, play, and deepen together.", fr: "Votre espace sacré privé — reconnectez-vous, jouez et approfondissez ensemble.", cs: "Váš soukromý posvátný prostor — znovu se spojte, hrajte si a prohlubujte společně." },
  "temple.tab.weather": { en: "Weather", fr: "Météo", cs: "Počasí" },
  "temple.tab.rituals": { en: "Rituals", fr: "Rituels", cs: "Rituály" },
  "temple.tab.positions": { en: "Positions", fr: "Positions", cs: "Pozice" },
  "temple.tab.messages": { en: "Messages", fr: "Messages", cs: "Zprávy" },
  "temple.tab.pathways": { en: "Pathways", fr: "Chemins", cs: "Cesty" },
  "temple.tab.altar": { en: "Altar", fr: "Autel", cs: "Oltář" },
  "temple.tab.repair": { en: "Repair", fr: "Réparer", cs: "Oprava" },
  "temple.tab.guide": { en: "Guide", fr: "Guide", cs: "Průvodce" },

  // Intimacy Weather
  "weather.title": { en: "Intimacy Weather", fr: "Météo de l'intimité", cs: "Počasí intimity" },
  "weather.subtitle": { en: "How are you feeling today? Share your inner climate with your partner.", fr: "Comment vous sentez-vous aujourd'hui ? Partagez votre climat intérieur.", cs: "Jak se dnes cítíte? Sdílejte svůj vnitřní stav s partnerem." },
  "weather.open": { en: "Open", fr: "Ouvert", cs: "Otevřený" },
  "weather.tender": { en: "Tender", fr: "Tendre", cs: "Něžný" },
  "weather.playful": { en: "Playful", fr: "Joueur", cs: "Hravý" },
  "weather.stressed": { en: "Stressed", fr: "Stressé", cs: "Stresovaný" },
  "weather.longing": { en: "Longing", fr: "Nostalgie", cs: "Toužící" },
  "weather.erotic": { en: "Erotic", fr: "Érotique", cs: "Erotický" },
  "weather.tired": { en: "Tired", fr: "Fatigué", cs: "Unavený" },
  "weather.reassurance": { en: "Need Care", fr: "Besoin de soin", cs: "Potřebuji péči" },
  "weather.waiting": { en: "Waiting…", fr: "En attente…", cs: "Čeká…" },
  "weather.share": { en: "Share My Weather", fr: "Partager ma météo", cs: "Sdílet moje počasí" },
  "weather.shared": { en: "Shared ✦ Your partner will see your state", fr: "Partagé ✦ Votre partenaire verra votre état", cs: "Sdíleno ✦ Váš partner uvidí váš stav" },

  // Ritual Cards
  "ritual_cards.title": { en: "Ritual Cards", fr: "Cartes Rituelles", cs: "Rituální karty" },
  "ritual_cards.subtitle": { en: "Swipe through sacred practices — from breath to bedtime.", fr: "Parcourez les pratiques sacrées — du souffle au coucher.", cs: "Procházejte posvátné praktiky — od dechu po spaní." },
  "ritual_cards.tap": { en: "Tap to reveal", fr: "Toucher pour révéler", cs: "Klepněte pro odhalení" },
  "ritual_cards.unlock_all": { en: "Unlock All Ritual Cards", fr: "Débloquer toutes les cartes", cs: "Odemknout všechny karty" },
  "ritual_cards.cat.breath": { en: "Breath", fr: "Souffle", cs: "Dech" },
  "ritual_cards.cat.touch": { en: "Touch", fr: "Toucher", cs: "Dotek" },
  "ritual_cards.cat.eye_contact": { en: "Eye Contact", fr: "Regard", cs: "Oční kontakt" },
  "ritual_cards.cat.gratitude": { en: "Gratitude", fr: "Gratitude", cs: "Vděčnost" },
  "ritual_cards.cat.repair": { en: "Repair", fr: "Réparer", cs: "Oprava" },
  "ritual_cards.cat.polarity": { en: "Polarity", fr: "Polarité", cs: "Polarita" },
  "ritual_cards.cat.bedtime": { en: "Bedtime", fr: "Coucher", cs: "Před spaním" },
  "ritual_cards.cat.morning": { en: "Morning", fr: "Matin", cs: "Ráno" },
  "ritual_cards.cat.distance": { en: "Distance", fr: "Distance", cs: "Na dálku" },
  "ritual_cards.cat.date_night": { en: "Date Night", fr: "Soirée", cs: "Rande" },

  // Ritual card content
  "ritual_card.breath.1.title": { en: "Synchronized Breath", fr: "Souffle synchronisé", cs: "Synchronizovaný dech" },
  "ritual_card.breath.1.desc": { en: "Sit facing each other. Breathe in together for 4 counts, hold for 4, exhale for 6. Repeat 10 times with eyes closed.", fr: "Asseyez-vous face à face. Inspirez ensemble 4 temps, retenez 4, expirez 6. Répétez 10 fois les yeux fermés.", cs: "Sedněte si čelem k sobě. Nadechněte se společně na 4 doby, zadržte na 4, vydechněte na 6. Opakujte 10×." },
  "ritual_card.breath.2.title": { en: "Back-to-Back Breathing", fr: "Dos à dos respirant", cs: "Dýchání zády k sobě" },
  "ritual_card.breath.2.desc": { en: "Sit back-to-back. Feel your partner's breath through your spine. Slowly match their rhythm without speaking. 5 minutes.", fr: "Asseyez-vous dos à dos. Sentez le souffle de votre partenaire. Synchronisez lentement. 5 minutes.", cs: "Sedněte si zády k sobě. Cítíte dech partnera přes páteř. Pomalu se slaďte. 5 minut." },
  "ritual_card.breath.3.title": { en: "Tantric Breath Circle", fr: "Cercle de souffle tantrique", cs: "Tantrický dechový kruh" },
  "ritual_card.breath.3.desc": { en: "One breathes in while the other breathes out. Visualize energy flowing in a circle between you. 10 minutes.", fr: "L'un inspire tandis que l'autre expire. Visualisez l'énergie circulant entre vous. 10 minutes.", cs: "Jeden se nadechuje, druhý vydechuje. Vizualizujte energii proudící v kruhu mezi vámi. 10 minut." },

  "ritual_card.touch.1.title": { en: "Hand-on-Heart Stillness", fr: "Main sur le cœur", cs: "Ruka na srdci" },
  "ritual_card.touch.1.desc": { en: "Place your hand on your partner's heart. Feel their heartbeat. Stay still for 3 minutes. No words needed.", fr: "Posez votre main sur le cœur de votre partenaire. Sentez ses battements. 3 minutes en silence.", cs: "Položte ruku na srdce partnera. Cítíte jeho tlukot. Zůstaňte 3 minuty v tichu." },
  "ritual_card.touch.2.title": { en: "Slow Touch Circles", fr: "Cercles de toucher lent", cs: "Pomalé dotekové kruhy" },
  "ritual_card.touch.2.desc": { en: "With fingertips, draw slow circles on your partner's forearm. Focus entirely on the sensation. Switch after 3 minutes.", fr: "Du bout des doigts, tracez des cercles lents sur l'avant-bras. Concentrez-vous sur la sensation. Alternez après 3 minutes.", cs: "Konečky prstů kreslete pomalé kruhy na předloktí partnera. Soustřeďte se na pocit. Po 3 minutách se vyměňte." },
  "ritual_card.touch.3.title": { en: "Sacred Body Mapping", fr: "Cartographie sacrée du corps", cs: "Posvátné mapování těla" },
  "ritual_card.touch.3.desc": { en: "Explore your partner's body with intention. Each touch is a question: 'What do you feel here?' Move slowly from head to feet.", fr: "Explorez le corps avec intention. Chaque toucher est une question. Avancez lentement de la tête aux pieds.", cs: "Prozkoumejte tělo partnera se záměrem. Každý dotek je otázka. Pomalu od hlavy k patě." },

  "ritual_card.eye.1.title": { en: "Soul Gazing", fr: "Regard dans l'âme", cs: "Pohled do duše" },
  "ritual_card.eye.1.desc": { en: "Sit close, look into each other's left eye. Hold the gaze for 5 minutes. Let whatever arises be welcome.", fr: "Asseyez-vous, regardez l'œil gauche. Tenez le regard 5 minutes. Laissez tout surgir.", cs: "Sedněte si blízko, dívejte se do levého oka partnera. Držte pohled 5 minut." },
  "ritual_card.eye.2.title": { en: "Candlelit Eye Connection", fr: "Connexion par le regard à la bougie", cs: "Spojení pohledem při svíčkách" },
  "ritual_card.eye.2.desc": { en: "Light a candle between you. Gaze through the flame into each other. Let the fire hold what words cannot.", fr: "Allumez une bougie entre vous. Regardez-vous à travers la flamme.", cs: "Zapalte svíčku mezi sebou. Dívejte se přes plamen na sebe." },

  "ritual_card.gratitude.1.title": { en: "Three Things I Love", fr: "Trois choses que j'aime", cs: "Tři věci, které miluji" },
  "ritual_card.gratitude.1.desc": { en: "Take turns sharing three things you love about your partner right now. Be specific. Let them receive it fully.", fr: "Partagez trois choses que vous aimez chez l'autre en ce moment. Soyez précis.", cs: "Střídejte se ve sdílení tří věcí, které právě teď na partnerovi milujete." },
  "ritual_card.gratitude.2.title": { en: "Gratitude Letter", fr: "Lettre de gratitude", cs: "Dopis vděčnosti" },
  "ritual_card.gratitude.2.desc": { en: "Write a short letter to your partner expressing what they bring to your life. Read it aloud together.", fr: "Écrivez une courte lettre exprimant ce que l'autre apporte à votre vie. Lisez-la ensemble.", cs: "Napište krátký dopis partnerovi o tom, co přináší do vašeho života. Přečtěte si ho společně." },

  "ritual_card.repair.1.title": { en: "Regulate & Return", fr: "Réguler et revenir", cs: "Regulovat a vrátit se" },
  "ritual_card.repair.1.desc": { en: "After tension: 4 breaths together → name one feeling each → own one impact → ask for one need → close with a touch.", fr: "Après une tension : 4 souffles → nommez un sentiment → reconnaissez un impact → demandez un besoin → toucher.", cs: "Po napětí: 4 dechy → pojmenujte pocit → přiznejte dopad → požádejte o potřebu → zakončete dotykem." },
  "ritual_card.repair.2.title": { en: "After-Arguing Ceremony", fr: "Cérémonie après dispute", cs: "Ceremonie po hádce" },
  "ritual_card.repair.2.desc": { en: "4-minute flow: regulate breath, name the feeling, own impact, ask for one need, close with touch or gratitude.", fr: "4 minutes : régulez le souffle, nommez le sentiment, reconnaissez l'impact, demandez un besoin, terminez par un toucher.", cs: "4minutový rituál: regulujte dech, pojmenujte pocit, přiznejte dopad, požádejte, zakončete dotykem." },

  "ritual_card.polarity.1.title": { en: "Yin-Yang Embrace", fr: "Étreinte Yin-Yang", cs: "Objetí Jin-Jang" },
  "ritual_card.polarity.1.desc": { en: "One leads, one surrenders. Hold for 3 minutes, then switch roles. Feel the energy shift between giving and receiving.", fr: "L'un guide, l'autre s'abandonne. 3 minutes, puis inversez. Sentez le changement d'énergie.", cs: "Jeden vede, druhý se odevzdá. 3 minuty, pak si vyměňte role." },
  "ritual_card.polarity.2.title": { en: "Magnetic Presence", fr: "Présence magnétique", cs: "Magnetická přítomnost" },
  "ritual_card.polarity.2.desc": { en: "Stand apart. Walk toward each other slowly, feeling the pull. Stop when the energy peaks. Stay there.", fr: "Tenez-vous éloignés. Approchez-vous lentement, sentez l'attraction.", cs: "Postavte se daleko od sebe. Pomalu k sobě přicházejte." },

  "ritual_card.bedtime.1.title": { en: "Goodnight Gratitude", fr: "Gratitude du soir", cs: "Večerní vděčnost" },
  "ritual_card.bedtime.1.desc": { en: "Before sleep, share one thing from today that made you grateful for your partner. Touch foreheads. Breathe together.", fr: "Avant de dormir, partagez une chose qui vous rend reconnaissant. Front contre front.", cs: "Před spaním sdílejte jednu věc, za kterou jste dnes partnerovi vděční." },
  "ritual_card.bedtime.2.title": { en: "Midnight Whisper Ritual", fr: "Rituel du murmure de minuit", cs: "Rituál půlnočního šepotu" },
  "ritual_card.bedtime.2.desc": { en: "In the dark, whisper something you've never said. Let the darkness hold your vulnerability.", fr: "Dans le noir, murmurez quelque chose que vous n'avez jamais dit.", cs: "Ve tmě pošeptejte něco, co jste nikdy neřekli." },

  "ritual_card.morning.1.title": { en: "Morning Connection", fr: "Connexion matinale", cs: "Ranní spojení" },
  "ritual_card.morning.1.desc": { en: "Before reaching for your phone: 30 seconds of eye contact, one breath together, one intention for the day.", fr: "Avant de prendre votre téléphone : 30 secondes de contact visuel, un souffle, une intention.", cs: "Než sáhnete po telefonu: 30 vteřin očního kontaktu, jeden společný nádech, jeden záměr." },
  "ritual_card.morning.2.title": { en: "Sunrise Intention Setting", fr: "Intention au lever du soleil", cs: "Ranní nastavení záměru" },
  "ritual_card.morning.2.desc": { en: "Face a window together. Set a shared intention for the day. Seal it with a kiss on the forehead.", fr: "Face à une fenêtre, fixez une intention commune. Scellez avec un baiser sur le front.", cs: "Postavte se spolu k oknu. Nastavte si společný záměr. Zapečeťte polibkem na čelo." },

  "ritual_card.distance.1.title": { en: "Parallel Breathing", fr: "Respiration parallèle", cs: "Paralelní dýchání" },
  "ritual_card.distance.1.desc": { en: "At an agreed time, both close your eyes and breathe together for 3 minutes. Feel the invisible connection.", fr: "À une heure convenue, fermez les yeux et respirez ensemble 3 minutes.", cs: "V dohodnutý čas zavřete oči a dýchejte spolu 3 minuty." },
  "ritual_card.distance.2.title": { en: "Voice Card Exchange", fr: "Échange de cartes vocales", cs: "Výměna hlasových karet" },
  "ritual_card.distance.2.desc": { en: "Record a 60-second voice message: what you see, what you feel, what you wish you could touch right now.", fr: "Enregistrez 60 secondes : ce que vous voyez, ressentez, aimeriez toucher.", cs: "Nahrajte 60vteřinovou zprávu: co vidíte, co cítíte, čeho byste se chtěli dotknout." },

  "ritual_card.date.1.title": { en: "Temple Date Night", fr: "Soirée temple", cs: "Chrámový večer" },
  "ritual_card.date.1.desc": { en: "Create sacred space: candles, music, no phones. Begin with eye contact, share a question, end with a ritual.", fr: "Créez un espace sacré : bougies, musique, sans téléphones. Commencez par le regard.", cs: "Vytvořte posvátný prostor: svíčky, hudba, žádné telefony. Začněte očním kontaktem." },
  "ritual_card.date.2.title": { en: "Sensual Discovery Evening", fr: "Soirée de découverte sensuelle", cs: "Večer smyslového objevování" },
  "ritual_card.date.2.desc": { en: "Blindfold one partner. Guide them through textures, scents, tastes. Awaken all senses before revealing.", fr: "Bandez les yeux d'un partenaire. Guidez-le à travers textures, odeurs, goûts.", cs: "Zavažte partnerovi oči. Proveďte ho texturami, vůněmi, chutěmi." },

  // Temple Messages
  "temple_msg.empty": { en: "Your temple awaits its first message…", fr: "Votre temple attend son premier message…", cs: "Váš chrám čeká na první zprávu…" },
  "temple_msg.empty_hint": { en: "Send gratitude, a whisper, or a blessing to your partner.", fr: "Envoyez de la gratitude, un murmure ou une bénédiction.", cs: "Pošlete vděčnost, šepot nebo požehnání partnerovi." },
  "temple_msg.placeholder": { en: "Write something sacred…", fr: "Écrivez quelque chose de sacré…", cs: "Napište něco posvátného…" },
  "temple_msg.type.gratitude": { en: "Gratitude", fr: "Gratitude", cs: "Vděčnost" },
  "temple_msg.type.appreciation": { en: "Appreciation", fr: "Appréciation", cs: "Ocenění" },
  "temple_msg.type.longing": { en: "Longing", fr: "Nostalgie", cs: "Touha" },
  "temple_msg.type.invitation": { en: "Invitation", fr: "Invitation", cs: "Pozvání" },
  "temple_msg.type.blessing": { en: "Blessing", fr: "Bénédiction", cs: "Požehnání" },
  "temple_msg.type.whisper": { en: "Whisper", fr: "Murmure", cs: "Šepot" },
  "temple_msg.type.tonight": { en: "Tonight", fr: "Ce soir", cs: "Dnes večer" },
  "temple_msg.type.fantasy": { en: "Fantasy", fr: "Fantaisie", cs: "Fantazie" },

  "premium.unlock": { en: "Premium", fr: "Premium", cs: "Premium" },

  // Position & Practice Deck
  "position.title": { en: "Position & Practice Deck", fr: "Positions & Pratiques", cs: "Pozice a praktiky" },
  "position.subtitle": { en: "Elegant guided postures and practices for sacred closeness.", fr: "Postures et pratiques guidées pour une proximité sacrée.", cs: "Elegantní vedené pozice a praktiky pro posvátnou blízkost." },
  "position.unlock_all": { en: "Unlock All Positions", fr: "Débloquer toutes les positions", cs: "Odemknout všechny pozice" },
  "position.seated_closeness.title": { en: "Seated Closeness", fr: "Proximité assise", cs: "Blízkost vsedě" },
  "position.seated_closeness.desc": { en: "Sit facing each other, knees touching. Place hands on each other's thighs. Breathe slowly. Feel the warmth transfer between you.", fr: "Asseyez-vous face à face, genoux qui se touchent. Mains sur les cuisses de l'autre. Respirez.", cs: "Sedněte si čelem k sobě, kolena se dotýkají. Položte ruce na stehna partnera. Dýchejte pomalu." },
  "position.seated_closeness.duration": { en: "5 minutes", fr: "5 minutes", cs: "5 minut" },
  "position.back_to_back.title": { en: "Back-to-Back Breath", fr: "Dos-à-dos respirant", cs: "Dech zády k sobě" },
  "position.back_to_back.desc": { en: "Sit back-to-back on the floor. Feel your partner's spine and breath. Slowly sync your rhythms without speaking.", fr: "Dos à dos sur le sol. Sentez la colonne et le souffle. Synchronisez sans parler.", cs: "Sedněte si zády k sobě na podlahu. Cítíte páteř a dech partnera. Pomalu se synchronizujte." },
  "position.back_to_back.duration": { en: "5 minutes", fr: "5 minutes", cs: "5 minut" },
  "position.hand_on_heart.title": { en: "Hand-on-Heart Stillness", fr: "Main sur le cœur en silence", cs: "Ruka na srdci v tichu" },
  "position.hand_on_heart.desc": { en: "One places hand on the other's heart. The receiver closes their eyes. Hold for 3 minutes. Switch. No words needed.", fr: "L'un pose la main sur le cœur de l'autre. Le receveur ferme les yeux. 3 minutes. Alternez.", cs: "Jeden položí ruku na srdce druhého. Příjemce zavře oči. 3 minuty. Vyměňte si." },
  "position.hand_on_heart.duration": { en: "6 minutes", fr: "6 minutes", cs: "6 minut" },
  "position.synchronized_exhale.title": { en: "Synchronized Exhale", fr: "Expiration synchronisée", cs: "Synchronizovaný výdech" },
  "position.synchronized_exhale.desc": { en: "Face each other close. Inhale through the nose together for 4 counts. Hold. Exhale through the mouth for 8. Feel the shared release.", fr: "Face à face. Inspirez ensemble 4 temps. Retenez. Expirez 8 temps. Sentez le relâchement partagé.", cs: "Čelem k sobě zblízka. Nadechněte se nosem na 4. Zadržte. Vydechněte ústy na 8." },
  "position.synchronized_exhale.duration": { en: "5 minutes", fr: "5 minutes", cs: "5 minut" },
  "position.slow_touch_circles.title": { en: "Slow Touch Circles", fr: "Cercles de toucher lent", cs: "Pomalé dotekové kruhy" },
  "position.slow_touch_circles.desc": { en: "With fingertips, draw slow circles on your partner's forearm, neck, or scalp. Focus entirely on sensation. Switch after 3 minutes.", fr: "Du bout des doigts, tracez des cercles sur l'avant-bras, le cou ou le cuir chevelu. Alternez.", cs: "Konečky prstů kreslete pomalé kruhy na předloktí, krku nebo hlavě partnera. Po 3 minutách se vyměňte." },
  "position.slow_touch_circles.duration": { en: "6 minutes", fr: "6 minutes", cs: "6 minut" },
  "position.yinyang_rest.title": { en: "Yin-Yang Rest", fr: "Repos Yin-Yang", cs: "Jin-Jang odpočinek" },
  "position.yinyang_rest.desc": { en: "Lie on your sides facing each other. Interlock legs. One hand on heart, one on hip. Breathe and rest in stillness.", fr: "Allongez-vous côte à côte. Entrelacez les jambes. Une main sur le cœur, l'autre sur la hanche.", cs: "Lehněte si na bok čelem k sobě. Propleťte nohy. Jedna ruka na srdci, druhá na boku." },
  "position.yinyang_rest.duration": { en: "10 minutes", fr: "10 minutes", cs: "10 minut" },
  "position.temple_date.title": { en: "Temple Date Ritual", fr: "Rituel de soirée temple", cs: "Chrámový rande rituál" },
  "position.temple_date.desc": { en: "Create sacred space with candles and music. Begin with soul gazing, move to synchronized breath, and end with shared intention.", fr: "Créez un espace sacré. Commencez par le regard, passez au souffle synchronisé, terminez par une intention.", cs: "Vytvořte posvátný prostor se svíčkami. Začněte pohledem do duše, pokračujte synchronizovaným dechem." },
  "position.temple_date.duration": { en: "20 minutes", fr: "20 minutes", cs: "20 minut" },
  "position.standing_embrace.title": { en: "Standing Embrace", fr: "Étreinte debout", cs: "Objetí vestoje" },
  "position.standing_embrace.desc": { en: "Stand and hold each other. Feel the full length of your bodies touching. Breathe together for 3 minutes without moving.", fr: "Debout, enlacez-vous. Sentez toute la longueur de vos corps. 3 minutes sans bouger.", cs: "Postavte se a obejměte se. Cítíte celou délku svých těl. 3 minuty bez pohybu." },
  "position.standing_embrace.duration": { en: "3 minutes", fr: "3 minutes", cs: "3 minuty" },

  // Pathways
  "pathways.title": { en: "Sacred Pathways", fr: "Chemins Sacrés", cs: "Posvátné cesty" },
  "pathways.subtitle": { en: "Curated multi-day journeys to transform your relationship together.", fr: "Parcours de plusieurs jours pour transformer votre relation ensemble.", cs: "Vícedenní cesty k proměně vašeho vztahu společně." },
  "pathways.days": { en: "day", fr: "jour", cs: "denní" },
  "pathways.journey": { en: "journey", fr: "parcours", cs: "cesta" },
  "pathways.begin": { en: "Begin This Journey", fr: "Commencer ce parcours", cs: "Začít tuto cestu" },
  "pathways.reignite.title": { en: "Reignite", fr: "Raviver", cs: "Znovu zapálit" },
  "pathways.reignite.desc": { en: "7 days of practices designed to bring back spark, desire, and intentional closeness. For couples who feel the distance growing.", fr: "7 jours de pratiques pour raviver l'étincelle, le désir et la proximité intentionnelle.", cs: "7 dní praktik navržených k navrácení jiskry, touhy a záměrné blízkosti." },
  "pathways.slow_down.title": { en: "Slow Down", fr: "Ralentir", cs: "Zpomalit" },
  "pathways.slow_down.desc": { en: "21 days of intentional deceleration. Learn to be fully present with each other through breath, touch, and silence.", fr: "21 jours de décélération intentionnelle. Apprenez à être pleinement présent à travers le souffle.", cs: "21 dní záměrného zpomalení. Naučte se být plně přítomni skrze dech, dotek a ticho." },
  "pathways.heal_stress.title": { en: "Heal After Stress", fr: "Guérir après le stress", cs: "Uzdravit po stresu" },
  "pathways.heal_stress.desc": { en: "7 days of gentle repair practices after periods of high stress, conflict, or emotional distance.", fr: "7 jours de pratiques de réparation douce après le stress, les conflits ou la distance émotionnelle.", cs: "7 dní jemných opravných praktik po období vysokého stresu nebo emoční vzdálenosti." },
  "pathways.long_distance.title": { en: "Long-Distance Bonding", fr: "Lien à distance", cs: "Spojení na dálku" },
  "pathways.long_distance.desc": { en: "21 days of practices designed for partners who are physically apart. Voice, breath, gaze, and shared intention across distance.", fr: "21 jours de pratiques pour partenaires physiquement séparés.", cs: "21 dní praktik navržených pro partnery, kteří jsou fyzicky od sebe." },
  "pathways.parents.title": { en: "Parents Reconnecting", fr: "Parents qui se reconnectent", cs: "Rodiče se znovu spojují" },
  "pathways.parents.desc": { en: "7 days of low-energy, high-impact rituals for couples with children. Short, meaningful, possible even when exhausted.", fr: "7 jours de rituels à faible énergie pour les couples avec enfants.", cs: "7 dní rituálů s nízkou náročností pro páry s dětmi. Krátké, smysluplné, možné i při vyčerpání." },
  "pathways.sacred_sexuality.title": { en: "Sacred Sexuality Foundations", fr: "Fondements de la sexualité sacrée", cs: "Základy posvátné sexuality" },
  "pathways.sacred_sexuality.desc": { en: "30 days exploring tantric presence, polarity, breath-body connection, and intimate communication. A profound shared path.", fr: "30 jours explorant la présence tantrique, la polarité et la communication intime.", cs: "30 dní zkoumání tantrické přítomnosti, polarity, spojení dechu a těla." },

  // Memory Altar
  "altar.title": { en: "Memory Altar", fr: "Autel des souvenirs", cs: "Oltář vzpomínek" },
  "altar.subtitle": { en: "Save your most sacred moments, vows, and shared wins.", fr: "Sauvegardez vos moments les plus sacrés, vœux et victoires partagées.", cs: "Uložte si nejposvátnější chvíle, sliby a společná vítězství." },
  "altar.all": { en: "All", fr: "Tout", cs: "Vše" },
  "altar.ritual": { en: "Rituals", fr: "Rituels", cs: "Rituály" },
  "altar.vow": { en: "Vows", fr: "Vœux", cs: "Sliby" },
  "altar.moment": { en: "Moments", fr: "Moments", cs: "Chvíle" },
  "altar.date": { en: "Dates", fr: "Dates", cs: "Data" },
  "altar.empty": { en: "Your altar is waiting for its first memory…", fr: "Votre autel attend son premier souvenir…", cs: "Váš oltář čeká na první vzpomínku…" },
  "altar.title_placeholder": { en: "Title of this memory…", fr: "Titre de ce souvenir…", cs: "Název této vzpomínky…" },
  "altar.content_placeholder": { en: "Add a note, feeling, or detail… (optional)", fr: "Ajoutez une note… (optionnel)", cs: "Přidejte poznámku… (volitelné)" },
  "altar.save": { en: "Save to Altar", fr: "Sauvegarder à l'autel", cs: "Uložit na oltář" },

  // Repair Mode
  "repair.title": { en: "Repair Mode", fr: "Mode réparation", cs: "Režim opravy" },
  "repair.subtitle": { en: "A gentle 5-step flow to come back together after friction or distance.", fr: "Un flux doux en 5 étapes pour se retrouver après une friction.", cs: "Jemný 5kroký proces k návratu k sobě po napětí nebo vzdálenosti." },
  "repair.step": { en: "Step", fr: "Étape", cs: "Krok" },
  "repair.begin": { en: "Begin Repair", fr: "Commencer la réparation", cs: "Začít opravu" },
  "repair.next": { en: "Next Step", fr: "Étape suivante", cs: "Další krok" },
  "repair.finish": { en: "Complete & Close", fr: "Terminer et fermer", cs: "Dokončit a zavřít" },
  "repair.breathe.title": { en: "Regulate Breath", fr: "Réguler le souffle", cs: "Regulujte dech" },
  "repair.breathe.instruction": { en: "Close your eyes. Take 4 slow breaths together. In through the nose for 4 counts. Out through the mouth for 6. Let the nervous system settle before words.", fr: "Fermez les yeux. 4 respirations lentes ensemble. Inspirez 4 temps. Expirez 6. Laissez le système nerveux se calmer.", cs: "Zavřete oči. 4 pomalé nádechy společně. Nosem na 4 doby. Ústy na 6. Nechte nervový systém se uklidnit." },
  "repair.name.title": { en: "Name the Feeling", fr: "Nommer le sentiment", cs: "Pojmenujte pocit" },
  "repair.name.instruction": { en: "Each person says one feeling — not a story, not a blame. Just: 'I feel hurt.' 'I feel scared.' 'I feel distant.' Hear each other without responding.", fr: "Chacun dit un sentiment — pas une histoire. 'Je me sens blessé.' 'J'ai peur.' Écoutez sans répondre.", cs: "Každý řekne jeden pocit — ne příběh, ne obvinění. Jen: 'Cítím se zraněný.' 'Cítím se vzdálený.' Poslouchejte bez reakce." },
  "repair.own.title": { en: "Own Your Impact", fr: "Reconnaître son impact", cs: "Přiznejte svůj dopad" },
  "repair.own.instruction": { en: "Each person owns one thing they did that contributed to the tension. Not defending — owning. 'I know I shut down.' 'I was harsh.'", fr: "Chacun reconnaît une chose qui a contribué à la tension. 'Je sais que je me suis fermé.' 'J'ai été dur.'", cs: "Každý přizná jednu věc, kterou přispěl k napětí. Ne obrana — přiznání. 'Vím, že jsem se uzavřel.' 'Byl/a jsem tvrdý/á.'" },
  "repair.ask.title": { en: "Ask for One Need", fr: "Demander un besoin", cs: "Požádejte o jednu potřebu" },
  "repair.ask.instruction": { en: "Each person asks for one thing they need right now. 'I need a hug.' 'I need 10 minutes alone first.' 'I need to know we're okay.'", fr: "Chacun demande une chose dont il a besoin. 'J'ai besoin d'un câlin.' 'J'ai besoin de 10 minutes seul.'", cs: "Každý požádá o jednu věc, kterou právě teď potřebuje. 'Potřebuji objetí.' 'Potřebuji 10 minut o samotě.' 'Potřebuji vědět, že jsme v pořádku.'" },
  "repair.close.title": { en: "Close with Touch", fr: "Terminer par un toucher", cs: "Zakončete dotykem" },
  "repair.close.instruction": { en: "End with physical contact — a hug, forehead touch, hands held. No more words needed. Let the body complete what the mind started.", fr: "Terminez par un contact physique — un câlin, front contre front, mains tenues. Plus de mots. Laissez le corps finir.", cs: "Zakončete fyzickým kontaktem — objetí, dotek čel, držení za ruce. Žádná další slova. Nechte tělo dokončit, co mysl začala." },

  // Temple Guide
  "guide.title": { en: "Temple Guide", fr: "Guide du temple", cs: "Průvodce chrámem" },
  "guide.subtitle": { en: "Tell me your energy, time, and setting — I'll suggest tonight's practice.", fr: "Dites-moi votre énergie, temps et cadre — je vous suggère la pratique de ce soir.", cs: "Řekněte mi svou energii, čas a prostředí — navrhnu vám dnešní praktiku." },
  "guide.energy_label": { en: "Your energy right now", fr: "Votre énergie maintenant", cs: "Vaše energie právě teď" },
  "guide.energy.low": { en: "Low", fr: "Faible", cs: "Nízká" },
  "guide.energy.medium": { en: "Medium", fr: "Moyenne", cs: "Střední" },
  "guide.energy.high": { en: "High", fr: "Haute", cs: "Vysoká" },
  "guide.time_label": { en: "Time available", fr: "Temps disponible", cs: "Dostupný čas" },
  "guide.privacy_label": { en: "Your setting", fr: "Votre cadre", cs: "Vaše prostředí" },
  "guide.privacy.public": { en: "Public", fr: "Public", cs: "Veřejné" },
  "guide.privacy.private": { en: "Private", fr: "Privé", cs: "Soukromé" },
  "guide.privacy.intimate": { en: "Intimate", fr: "Intime", cs: "Intimní" },
  "guide.tonight": { en: "✦ TONIGHT'S RECOMMENDATION", fr: "✦ RECOMMANDATION CE SOIR", cs: "✦ DNEŠNÍ DOPORUČENÍ" },
  "guide.start": { en: "Begin This Practice", fr: "Commencer cette pratique", cs: "Začít tuto praktiku" },
  "guide.rec.forehead_touch": { en: "Forehead Touch", fr: "Contact des fronts", cs: "Dotek čel" },
  "guide.rec.forehead_touch.desc": { en: "Simply press foreheads together. Close your eyes. Breathe for 2 minutes. The simplest gesture when energy is low.", fr: "Pressez simplement les fronts l'un contre l'autre. Fermez les yeux. 2 minutes.", cs: "Jednoduše přitiskněte čela k sobě. Zavřete oči. Dýchejte 2 minuty." },
  "guide.rec.back_to_back": { en: "Back-to-Back Rest", fr: "Repos dos à dos", cs: "Odpočinek zády k sobě" },
  "guide.rec.back_to_back.desc": { en: "Sit on the floor back-to-back. Feel each other's breath and warmth. No effort needed — just presence.", fr: "Dos à dos sur le sol. Sentez le souffle et la chaleur. Aucun effort — juste la présence.", cs: "Sedněte si na podlahu zády k sobě. Cítíte dech a teplo. Žádné úsilí — jen přítomnost." },
  "guide.rec.goodnight_gratitude": { en: "Goodnight Gratitude", fr: "Gratitude du soir", cs: "Večerní vděčnost" },
  "guide.rec.goodnight_gratitude.desc": { en: "Before sleep, share one thing you're grateful for about today and about each other. Touch foreheads. Drift off together.", fr: "Avant de dormir, partagez une gratitude. Front contre front.", cs: "Před spaním sdílejte jednu vděčnost o dnešku a o sobě navzájem." },
  "guide.rec.eye_contact": { en: "3-Minute Gaze", fr: "Regard de 3 minutes", cs: "3minutový pohled" },
  "guide.rec.eye_contact.desc": { en: "Sit close. Look into each other's left eye for 3 minutes. Let whatever arises — laughter, tears, discomfort — be welcome.", fr: "Asseyez-vous. Regardez l'œil gauche 3 minutes. Laissez tout surgir.", cs: "Sedněte si blízko. Dívejte se do levého oka partnera 3 minuty. Cokoliv přijde, přivítejte." },
  "guide.rec.synchronized_breath": { en: "Synchronized Breathing", fr: "Respiration synchronisée", cs: "Synchronizované dýchání" },
  "guide.rec.synchronized_breath.desc": { en: "Face each other. Match your breathing: in for 4, hold for 4, out for 6. 10 cycles. Feel the shared rhythm settle your bodies.", fr: "Face à face. Synchronisez : inspirez 4, retenez 4, expirez 6. 10 cycles.", cs: "Čelem k sobě. Slaďte dýchání: nádech na 4, zadržte na 4, výdech na 6. 10 cyklů." },
  "guide.rec.slow_touch": { en: "Slow Touch Meditation", fr: "Méditation du toucher lent", cs: "Meditace pomalého doteku" },
  "guide.rec.slow_touch.desc": { en: "One partner closes their eyes. The other traces slow, intentional paths across their hands, arms, face. Switch after 6 minutes.", fr: "L'un ferme les yeux. L'autre trace des chemins lents sur les mains, bras, visage. Alternez.", cs: "Jeden partner zavře oči. Druhý pomalu sleduje cesty po rukou, pažích, obličeji. Po 6 minutách se vyměňte." },
  "guide.rec.polarity_pull": { en: "Polarity Pull", fr: "Attraction polaire", cs: "Polaritní přitažlivost" },
  "guide.rec.polarity_pull.desc": { en: "Stand apart. Walk toward each other very slowly. Feel the magnetic pull. Stop when the energy peaks. Hold the tension.", fr: "Debout, éloignés. Approchez-vous très lentement. Sentez l'attraction magnétique.", cs: "Postavte se daleko. Pomalu k sobě přicházejte. Cítíte magnetické přitahování. Zastavte se ve vrcholu." },
  "guide.rec.temple_date": { en: "Temple Date", fr: "Soirée temple", cs: "Chrámové rande" },
  "guide.rec.temple_date.desc": { en: "Create sacred space: candles, music, phones away. Begin with eye contact, then breath, then a shared question. End with gratitude.", fr: "Créez un espace sacré : bougies, musique, sans téléphones. Regard, souffle, question partagée, gratitude.", cs: "Vytvořte posvátný prostor: svíčky, hudba, telefony pryč. Začněte pohledem, pak dech, sdílená otázka. Zakončete vděčností." },
  "guide.rec.sacred_body": { en: "Sacred Body Exploration", fr: "Exploration sacrée du corps", cs: "Posvátné zkoumání těla" },
  "guide.rec.sacred_body.desc": { en: "Explore each other with slow, reverent touch. Each touch is a question: 'What do you feel here?' Move from head to feet. 12 minutes of presence.", fr: "Explorez-vous avec un toucher lent et révérencieux. Chaque toucher est une question. De la tête aux pieds.", cs: "Prozkoumejte se pomalým, uctivým dotekem. Každý dotek je otázka: 'Co zde cítíš?' Od hlavy k patě." },

  // Temple Home
  "temple.tab.home": { en: "Home", fr: "Accueil", cs: "Domů" },
  "temple_home.greeting": { en: "Welcome back", fr: "Bon retour", cs: "Vítejte zpět" },
  "temple_home.subtitle": { en: "Return to each other", fr: "Revenez l'un à l'autre", cs: "Vraťte se k sobě navzájem" },
  "temple_home.weather_label": { en: "Your Inner Climate", fr: "Votre climat intérieur", cs: "Vaše vnitřní klima" },
  "temple_home.check_in_prompt": { en: "Check in", fr: "S'enregistrer", cs: "Zapsat se" },
  "temple_home.tonight": { en: "Tonight's Doorway", fr: "La porte de ce soir", cs: "Dnešní brána" },
  "temple_home.action.check_in": { en: "Check In", fr: "S'enregistrer", cs: "Zapsat pocit" },
  "temple_home.action.ritual": { en: "Start Ritual", fr: "Commencer un rituel", cs: "Začít rituál" },
  "temple_home.action.message": { en: "Send Message", fr: "Envoyer un message", cs: "Poslat zprávu" },
  "temple_home.action.pathway": { en: "Continue Path", fr: "Continuer le chemin", cs: "Pokračovat v cestě" },
  "temple_home.recent_altar": { en: "Recent Altar Moment", fr: "Moment d'autel récent", cs: "Nedávný okamžik oltáře" },

  // Weather recommendations
  "weather.note_placeholder": { en: "Add a note (optional)...", fr: "Ajouter une note (optionnel)...", cs: "Přidat poznámku (volitelné)..." },
  "weather.rec.label": { en: "A Gentle Suggestion", fr: "Une suggestion douce", cs: "Jemný návrh" },
  "weather.rec.open": { en: "You are open and available. This is a beautiful moment to deepen your connection through a shared ritual.", fr: "Vous êtes ouvert et disponible. C'est un beau moment pour approfondir votre connexion.", cs: "Jste otevření a dostupní. Toto je krásný moment pro prohloubení vašeho spojení skrze sdílený rituál." },
  "weather.rec.tender": { en: "Tenderness is flowing. Hold this softness — a gentle presence practice will nurture it beautifully.", fr: "La tendresse coule. Un rituel de présence douce la nourrira.", cs: "Něha proudí. Podržte tuto měkkost — jemná praktika přítomnosti ji krásně vyživí." },
  "weather.rec.playful": { en: "Playful energy is alive! Channel it into a ritual that celebrates the joy between you.", fr: "L'énergie ludique est vivante ! Canalisez-la dans un rituel de joie.", cs: "Hravá energie žije! Proměňte ji v rituál, který slaví radost mezi vámi." },
  "weather.rec.stressed": { en: "Stress needs softness, not force. Begin with a gentle repair practice to come back to safety.", fr: "Le stress a besoin de douceur. Commencez par une pratique de réparation.", cs: "Stres potřebuje měkkost, ne sílu. Začněte jemnou praktikou opravy pro návrat k bezpečí." },
  "weather.rec.longing": { en: "Longing is a bridge — it means your heart is reaching. Send a message or begin a reconnection ritual.", fr: "Le désir est un pont — votre cœur cherche. Envoyez un message ou commencez un rituel.", cs: "Touha je most — znamená, že vaše srdce sahá. Pošlete zprávu nebo začněte rituál znovupropojení." },
  "weather.rec.erotic": { en: "Sacred fire is present. Honor it with a polarity practice or energizing ritual.", fr: "Le feu sacré est présent. Honorez-le avec une pratique de polarité.", cs: "Posvátný oheň je přítomen. Uctěte ho praktikou polarity nebo energizujícím rituálem." },
  "weather.rec.tired": { en: "Rest is sacred too. A soft goodnight ritual can bring closeness without effort.", fr: "Le repos est sacré aussi. Un doux rituel du soir peut rapprocher sans effort.", cs: "Odpočinek je také posvátný. Jemný rituál na dobrou noc může přinést blízkost bez námahy." },
  "weather.rec.reassurance": { en: "You are asking for care. Let your partner know — begin with repair mode or send a gentle message.", fr: "Vous demandez du soin. Faites savoir à votre partenaire — commencez par le mode réparation.", cs: "Žádáte o péči. Dejte partnerovi vědět — začněte režimem opravy nebo pošlete jemnou zprávu." },
  "weather.rec.go_repair": { en: "Open Repair Mode →", fr: "Ouvrir le mode réparation →", cs: "Otevřít režim opravy →" },
  "weather.rec.go_ritual": { en: "Browse Rituals →", fr: "Parcourir les rituels →", cs: "Prohlédnout rituály →" },
  "weather.rec.go_guide": { en: "Open Guide →", fr: "Ouvrir le guide →", cs: "Otevřít průvodce →" },

  // Ritual actions
  "ritual.step": { en: "Step", fr: "Étape", cs: "Krok" },
  "ritual.prev": { en: "Back", fr: "Retour", cs: "Zpět" },
  "ritual.next_step": { en: "Next Step", fr: "Étape suivante", cs: "Další krok" },
  "ritual.complete": { en: "Complete ✦", fr: "Terminer ✦", cs: "Dokončit ✦" },
  "ritual.save": { en: "Save to Altar", fr: "Sauver à l'autel", cs: "Uložit na oltář" },
  "ritual.send": { en: "Send to Partner", fr: "Envoyer au partenaire", cs: "Poslat partnerovi" },
  "ritual.saved_altar": { en: "Saved to your altar ✦", fr: "Sauvegardé à votre autel ✦", cs: "Uloženo na váš oltář ✦" },
  "ritual.sent_partner": { en: "Sent to your partner ✦", fr: "Envoyé à votre partenaire ✦", cs: "Odesláno vašemu partnerovi ✦" },
  "ritual_cards.all": { en: "All", fr: "Tous", cs: "Vše" },
  "ritual_cards.type.rituals": { en: "Rituals", fr: "Rituels", cs: "Rituály" },
  "ritual_cards.type.positions": { en: "Positions", fr: "Positions", cs: "Pozice" },
  "ritual_cards.empty": { en: "No practices found in this category", fr: "Aucune pratique trouvée", cs: "V této kategorii nebyly nalezeny žádné praktiky" },
  "ritual_cards.cat.presence": { en: "Presence", fr: "Présence", cs: "Přítomnost" },
  "ritual_cards.cat.reconnect": { en: "Reconnect", fr: "Reconnecter", cs: "Znovupropojení" },

  // Pathways
  "pathways.day": { en: "Day", fr: "Jour", cs: "Den" },
  "pathways.completed": { en: "completed", fr: "complétés", cs: "dokončeno" },
  "pathways.started": { en: "Journey begun ✦", fr: "Voyage commencé ✦", cs: "Cesta začala ✦" },
  "pathways.complete_day": { en: "Complete Day", fr: "Terminer le jour", cs: "Dokončit den" },
  "pathways.day_complete": { en: "Day completed ✦", fr: "Jour complété ✦", cs: "Den dokončen ✦" },
  "pathways.journey_complete": { en: "Journey complete — you walked this path together", fr: "Voyage terminé — vous avez marché ce chemin ensemble", cs: "Cesta dokončena — prošli jste ji společně" },

  // Settings
  "nav.settings": { en: "Settings", fr: "Réglages", cs: "Nastavení" },
  "settings.title": { en: "Settings", fr: "Réglages", cs: "Nastavení" },
  "settings.subtitle": { en: "Manage your Sacred Path experience.", fr: "Gérez votre expérience Sacred Path.", cs: "Spravujte svůj zážitek Sacred Path." },
  "settings.language": { en: "Language", fr: "Langue", cs: "Jazyk" },
  "settings.language_desc": { en: "Choose how Sacred Path speaks to you.", fr: "Choisissez la langue de Sacred Path.", cs: "Vyberte jazyk Sacred Path." },
  "settings.membership": { en: "Membership", fr: "Abonnement", cs: "Členství" },
  "settings.membership_desc": { en: "View your plan and unlock more intimacy tools.", fr: "Consultez votre plan et débloquez plus d'outils d'intimité.", cs: "Zobrazte svůj plán a odemkněte další nástroje intimity." },
  "settings.view_plans": { en: "View plans", fr: "Voir les plans", cs: "Zobrazit plány" },
  "settings.account": { en: "Account", fr: "Compte", cs: "Účet" },
  "settings.account_desc": { en: "Sign out now. Account deletion flow will be finalized next.", fr: "Déconnectez-vous. La suppression du compte sera finalisée ensuite.", cs: "Odhlaste se. Smazání účtu dokončíme v další fázi." },
  "settings.sign_out": { en: "Sign out", fr: "Déconnexion", cs: "Odhlásit se" },
  "settings.delete_account": { en: "Delete account", fr: "Supprimer le compte", cs: "Smazat účet" },
  "settings.delete_account_note": { en: "Next phase: wire this button to a secure account deletion flow.", fr: "Étape suivante : connecter ce bouton à un flux sécurisé de suppression du compte.", cs: "Další fáze: napojit toto tlačítko na bezpečné smazání účtu." },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("sacred-path-lang");
    return (saved as Language) || "en";
  });

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("sacred-path-lang", newLang);
  };

  const t = (key: string): string => {
    return translations[key]?.[lang] || translations[key]?.["en"] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("sacred-path-lang");
    return (saved as Language) || "en";
  });

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("sacred-path-lang", newLang);
  };

  const t = (key: string): string => {
    return translations[key]?.[lang] || translations[key]?.["en"] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};"nav.settings": {
  en: "Settings",
  fr: "Réglages",
  cs: "Nastavení"
},
"settings.title": {
  en: "Settings",
  fr: "Réglages",
  cs: "Nastavení"
},
"settings.subtitle": {
  en: "Manage your Sacred Path experience.",
  fr: "Gérez votre expérience Sacred Path.",
  cs: "Spravujte svůj zážitek Sacred Path."
},
"settings.language": {
  en: "Language",
  fr: "Langue",
  cs: "Jazyk"
},
"settings.language_desc": {
  en: "Choose how Sacred Path speaks to you.",
  fr: "Choisissez la langue de Sacred Path.",
  cs: "Vyberte jazyk Sacred Path."
},
"settings.membership": {
  en: "Membership",
  fr: "Abonnement",
  cs: "Členství"
},
"settings.membership_desc": {
  en: "View your plan and unlock more intimacy tools.",
  fr: "Consultez votre plan et débloquez plus d’outils d’intimité.",
  cs: "Zobrazte svůj plán a odemkněte další nástroje intimity."
},
"settings.view_plans": {
  en: "View plans",
  fr: "Voir les plans",
  cs: "Zobrazit plány"
},
"settings.account": {
  en: "Account",
  fr: "Compte",
  cs: "Účet"
},
"settings.account_desc": {
  en: "Sign out now. Account deletion flow will be finalized next.",
  fr: "Déconnectez-vous. La suppression du compte sera finalisée ensuite.",
  cs: "Odhlaste se. Smazání účtu dokončíme v další fázi."
},
"settings.sign_out": {
  en: "Sign out",
  fr: "Déconnexion",
  cs: "Odhlásit se"
},
"settings.delete_account": {
  en: "Delete account",
  fr: "Supprimer le compte",
  cs: "Smazat účet"
},
"settings.delete_account_note": {
  en: "Next phase: wire this button to a secure account deletion flow.",
  fr: "Étape suivante : connecter ce bouton à un flux sécurisé de suppression du compte.",
  cs: "Další fáze: napojit toto tlačítko na bezpečné smazání účtu."
},
