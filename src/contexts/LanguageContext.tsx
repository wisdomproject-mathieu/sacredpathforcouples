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
  "weather.stormy_desc": { en: "Tension in the air", fr: "Tension dans l'air", cs: "Napětí ve vzduchu" },
  "weather.cloudy": { en: "Cloudy", fr: "Nuageux", cs: "Oblačno" },
  "weather.cloudy_desc": { en: "Slight distance", fr: "Légère distance", cs: "Lehký odstup" },
  "weather.partly": { en: "Partly Sunny", fr: "Partiellement Ensoleillé", cs: "Polojasno" },
  "weather.partly_desc": { en: "Close, but quiet", fr: "Proche, mais silencieux", cs: "Blízko, ale ticho" },
  "weather.sunny": { en: "Sunny", fr: "Ensoleillé", cs: "Jasno" },
  "weather.sunny_desc": { en: "Harmony and warmth", fr: "Harmonie et chaleur", cs: "Harmonie a teplo" },
  "weather.hot": { en: "Hot", fr: "Brûlant", cs: "Žhavé" },
  "weather.hot_desc": { en: "Passion and connection", fr: "Passion et connexion", cs: "Vášeň a spojení" },

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
  "reconnect.title": { en: "Connection Rituals", fr: "Rituels de Connexion", cs: "Rituály spojení" },
  "reconnect.desc": { en: "Sacred practices for deepening physical, emotional and spiritual bonds", fr: "Pratiques sacrées pour approfondir les liens physiques, émotionnels et spirituels", cs: "Posvátné praktiky pro prohloubení fyzického, emočního a duchovního pouta" },
  "reconnect.step_guide": { en: "Step-by-step Guide", fr: "Guide Étape par Étape", cs: "Průvodce krok za krokem" },

  // Ritual names
  "ritual.0.title": { en: "Synchronized Breath", fr: "Respiration Synchronisée", cs: "Synchronizovaný dech" },
  "ritual.0.desc": { en: "Sit facing each other. Breathe together — inhale for 4 counts, hold for 4, exhale for 8. Let your energies merge through breath.", fr: "Asseyez-vous face à face. Respirez ensemble — inspirez 4 temps, retenez 4, expirez 8. Laissez vos énergies fusionner par le souffle.", cs: "Sedněte si čelem k sobě. Dýchejte společně — nádech na 4 doby, zadržení na 4, výdech na 8. Nechte vaše energie splynout skrze dech." },
  "ritual.1.title": { en: "Candle Gazing", fr: "Contemplation de Bougie", cs: "Hledění do svíčky" },
  "ritual.1.desc": { en: "Light a candle between you. Gently gaze into your partner's left eye. Allow vulnerability to surface without words.", fr: "Allumez une bougie entre vous. Regardez doucement dans l'œil gauche de votre partenaire. Laissez la vulnérabilité émerger sans mots.", cs: "Zapalte svíčku mezi sebou. Jemně hleďte do levého oka svého partnera. Dovolte zranitelnosti vystoupit bez slov." },
  "ritual.2.title": { en: "Heart-to-Heart Meditation", fr: "Méditation Cœur à Cœur", cs: "Srdce na srdce meditace" },
  "ritual.2.desc": { en: "Place your right hand on your partner's heart, their right hand on yours. Feel the rhythm of love flowing between you.", fr: "Placez votre main droite sur le cœur de votre partenaire, sa main droite sur le vôtre. Sentez le rythme de l'amour couler entre vous.", cs: "Položte pravou ruku na srdce partnera, jeho pravou ruku na vaše. Cítíte rytmus lásky proudící mezi vámi." },
  "ritual.3.title": { en: "Chakra Alignment", fr: "Alignement des Chakras", cs: "Zarovnání čaker" },
  "ritual.3.desc": { en: "Sit back-to-back, spines aligned. Visualize energy rising from root to crown, merging above in golden light.", fr: "Asseyez-vous dos à dos, colonnes alignées. Visualisez l'énergie montant de la racine à la couronne, fusionnant au-dessus en lumière dorée.", cs: "Sedněte si zády k sobě, páteře v jedné linii. Vizualizujte energii stoupající od kořene ke koruně, splývající nahoře ve zlatém světle." },
  "ritual.4.title": { en: "Sacred Touch", fr: "Toucher Sacré", cs: "Posvátný dotek" },
  "ritual.4.desc": { en: "Take turns slowly tracing sacred geometry patterns on your partner's skin. Each stroke is a prayer of devotion.", fr: "Tracez à tour de rôle des motifs de géométrie sacrée sur la peau de votre partenaire. Chaque trait est une prière de dévotion.", cs: "Střídejte se v pomalém kreslení vzorů posvátné geometrie na kůži partnera. Každý tah je modlitba oddanosti." },
  "ritual.5.title": { en: "Polarity Dance", fr: "Danse de Polarité", cs: "Tanec polarity" },
  "ritual.5.desc": { en: "One leads, the other follows — then switch. Explore the dynamic flow of masculine and feminine energy within you both.", fr: "L'un mène, l'autre suit — puis échangez. Explorez le flux dynamique de l'énergie masculine et féminine en vous deux.", cs: "Jeden vede, druhý následuje — pak se vyměníte. Prozkoumejte dynamický proud maskulinní a femininní energie ve vás obou." },

  // Ritual steps (using arrays would be complex, so we use numbered keys)
  "ritual.0.step.0": { en: "Sit comfortably facing each other, knees may touch", fr: "Asseyez-vous confortablement face à face, genoux pouvant se toucher", cs: "Sedněte si pohodlně čelem k sobě, kolena se mohou dotýkat" },
  "ritual.0.step.1": { en: "Close your eyes and calm your mind", fr: "Fermez les yeux et calmez votre esprit", cs: "Zavřete oči a zklidněte mysl" },
  "ritual.0.step.2": { en: "Begin breathing together: inhale 4 counts", fr: "Commencez à respirer ensemble: inspirez 4 temps", cs: "Začněte dýchat společně: nádech 4 doby" },
  "ritual.0.step.3": { en: "Hold breath for 4 counts", fr: "Retenez le souffle 4 temps", cs: "Zadržte dech na 4 doby" },
  "ritual.0.step.4": { en: "Slowly exhale for 8 counts", fr: "Expirez lentement sur 8 temps", cs: "Pomalu vydechněte na 8 dob" },
  "ritual.0.step.5": { en: "Repeat 10 cycles, then open eyes and look at your partner", fr: "Répétez 10 cycles, puis ouvrez les yeux et regardez votre partenaire", cs: "Opakujte 10 cyklů, pak otevřete oči a podívejte se na partnera" },

  "ritual.1.step.0": { en: "Prepare a quiet space and light a candle", fr: "Préparez un espace calme et allumez une bougie", cs: "Připravte klidný prostor a zapalte svíčku" },
  "ritual.1.step.1": { en: "Sit so the candle is between you", fr: "Asseyez-vous de façon que la bougie soit entre vous", cs: "Sedněte si tak, aby svíčka byla mezi vámi" },
  "ritual.1.step.2": { en: "Gently gaze into your partner's left eye", fr: "Regardez doucement dans l'œil gauche de votre partenaire", cs: "Hleďte jemně do levého oka partnera" },
  "ritual.1.step.3": { en: "If emotions arise, let them flow", fr: "Si des émotions surgissent, laissez-les couler", cs: "Pokud přijdou emoce, nechte je proudit" },
  "ritual.1.step.4": { en: "Don't look away — stay present", fr: "Ne détournez pas le regard — restez présent", cs: "Nedívejte se stranou — zůstaňte přítomní" },
  "ritual.1.step.5": { en: "After 10 minutes, quietly embrace", fr: "Après 10 minutes, enlacez-vous en silence", cs: "Po 10 minutách se tiše obejměte" },

  "ritual.2.step.0": { en: "Sit facing each other, close enough to touch", fr: "Asseyez-vous face à face, assez près pour se toucher", cs: "Sedněte čelem k sobě, dostatečně blízko na dotek" },
  "ritual.2.step.1": { en: "Each place your right hand on your partner's heart", fr: "Chacun place sa main droite sur le cœur de l'autre", cs: "Každý položte pravou ruku na srdce partnera" },
  "ritual.2.step.2": { en: "Close your eyes and synchronize your breath", fr: "Fermez les yeux et synchronisez votre respiration", cs: "Zavřete oči a synchronizujte dech" },
  "ritual.2.step.3": { en: "Visualize golden light flowing between hearts", fr: "Visualisez une lumière dorée coulant entre les cœurs", cs: "Vizualizujte zlaté světlo proudící mezi srdci" },
  "ritual.2.step.4": { en: "Feel the other's heartbeat", fr: "Sentez le battement de cœur de l'autre", cs: "Cítíte tlukot srdce toho druhého" },
  "ritual.2.step.5": { en: "Remain in silence and connection", fr: "Restez dans le silence et la connexion", cs: "Zůstaňte v tichu a spojení" },

  "ritual.3.step.0": { en: "Sit back-to-back on the floor", fr: "Asseyez-vous dos à dos sur le sol", cs: "Sedněte si zády k sobě na podlahu" },
  "ritual.3.step.1": { en: "Straighten your spine and lean against your partner", fr: "Redressez votre colonne et appuyez-vous contre votre partenaire", cs: "Narovnejte páteř a nechte se opřít o partnera" },
  "ritual.3.step.2": { en: "Start at root chakra — visualize red light", fr: "Commencez au chakra racine — visualisez une lumière rouge", cs: "Začněte u kořenové čakry — vizualizujte červené světlo" },
  "ritual.3.step.3": { en: "Slowly move energy up: orange, yellow, green...", fr: "Montez lentement l'énergie: orange, jaune, vert...", cs: "Pomalu posunujte energii nahoru: oranžová, žlutá, zelená..." },
  "ritual.3.step.4": { en: "Blue, indigo, violet — to the crown chakra", fr: "Bleu, indigo, violet — jusqu'au chakra couronne", cs: "Modrá, indigo, fialová — až ke korunní čakře" },
  "ritual.3.step.5": { en: "Imagine your energies meeting above your heads in golden light", fr: "Imaginez vos énergies se rencontrant au-dessus de vos têtes en lumière dorée", cs: "Představte si, jak se vaše energie setkávají nad hlavami ve zlatém světle" },

  "ritual.4.step.0": { en: "One lies down, the other sits beside", fr: "L'un s'allonge, l'autre s'assoit à côté", cs: "Jeden si lehne, druhý sedí vedle" },
  "ritual.4.step.1": { en: "Slowly trace spirals on your partner's back with your fingers", fr: "Tracez lentement des spirales sur le dos de votre partenaire", cs: "Pomalu kreslíte prsty spirály na zádech partnera" },
  "ritual.4.step.2": { en: "Draw infinity symbols (∞) between the shoulder blades", fr: "Dessinez des symboles infini (∞) entre les omoplates", cs: "Kresby infinity symbolů (∞) mezi lopatkami" },
  "ritual.4.step.3": { en: "Gentle circles around the heart", fr: "Cercles doux autour du cœur", cs: "Jemné kruhy kolem srdce" },
  "ritual.4.step.4": { en: "After 5 minutes, switch roles", fr: "Après 5 minutes, échangez les rôles", cs: "Po 5 minutách si vyměňte role" },
  "ritual.4.step.5": { en: "End by gently placing palms on the back", fr: "Terminez en posant doucement les paumes sur le dos", cs: "Zakončete jemným položením dlaní na záda" },

  "ritual.5.step.0": { en: "Stand facing each other and join palms", fr: "Tenez-vous face à face et joignez les paumes", cs: "Postavte se čelem k sobě a spojte dlaně" },
  "ritual.5.step.1": { en: "One begins to slowly lead the movement", fr: "L'un commence à mener lentement le mouvement", cs: "Jeden začne pomalu vést pohyb" },
  "ritual.5.step.2": { en: "The other follows every movement with trust", fr: "L'autre suit chaque mouvement avec confiance", cs: "Druhý s důvěrou následuje každý pohyb" },
  "ritual.5.step.3": { en: "After 6 minutes, switch roles", fr: "Après 6 minutes, échangez les rôles", cs: "Po 6 minutách si vyměňte role" },
  "ritual.5.step.4": { en: "Explore how each role feels", fr: "Explorez comment chaque rôle se ressent", cs: "Prozkoumejte, jak se cítíte v každé roli" },
  "ritual.5.step.5": { en: "End with a hug and share your feelings", fr: "Terminez par une étreinte et partagez vos sentiments", cs: "Zakončete objetím a sdílením pocitů" },

  // Teachings
  "teachings.lineage": { en: "Wisdom Lineage", fr: "Lignée de Sagesse", cs: "Linie moudrosti" },
  "teachings.title": { en: "Sacred Teachings", fr: "Enseignements Sacrés", cs: "Posvátná učení" },
  "teachings.subtitle": { en: "Two ancient traditions and three modern guides for the sacred life of a couple", fr: "Deux traditions anciennes et trois guides modernes pour la vie sacrée d'un couple", cs: "Dvě starověké tradice a tři moderní průvodci pro posvátný život páru" },
  "teachings.premium": { en: "Premium", fr: "Premium", cs: "Premium" },
  "teachings.unlock_hint": { en: "Unlock this teaching with a Sacred subscription...", fr: "Débloquez cet enseignement avec un abonnement Sacred...", cs: "Odemkněte toto učení s předplatným Sacred..." },
  "teachings.unlock_all": { en: "Unlock all teachings", fr: "Débloquer tous les enseignements", cs: "Odemkněte všechna učení" },
  "teachings.lesson_count": { en: "50+ lessons from tantric masters. 7 days free.", fr: "50+ leçons de maîtres tantriques. 7 jours gratuits.", cs: "50+ lekcí od tantrických mistrů. 7 dní zdarma." },
  "teachings.view_plans": { en: "View plans", fr: "Voir les plans", cs: "Zobrazit plány" },

  // Tab descriptions
  "teach.tantra.name": { en: "Tantra", fr: "Tantra", cs: "Tantra" },
  "teach.tantra.desc": { en: "The path of weaving. Body, breath, energy and consciousness united. The body is not an obstacle to awakening — it is the instrument of it.", fr: "Le chemin du tissage. Corps, souffle, énergie et conscience unis. Le corps n'est pas un obstacle à l'éveil — il en est l'instrument.", cs: "Cesta tkaní. Tělo, dech, energie a vědomí sjednocené. Tělo není překážkou probuzení — je jeho nástrojem." },
  "teach.tao.name": { en: "Tao", fr: "Tao", cs: "Tao" },
  "teach.tao.desc": { en: "The path of natural flow. Yin-yang harmony, chi cultivation, loving longevity. Energy conserved becomes vitality that nourishes life.", fr: "Le chemin du flux naturel. Harmonie yin-yang, cultivation du chi. L'énergie conservée devient vitalité.", cs: "Cesta přirozeného toku. Harmonie jin-jang, kultivace čchi. Uchovaná energie se stává vitalitou." },
  "teach.deida.name": { en: "David Deida", fr: "David Deida", cs: "David Deida" },
  "teach.deida.desc": { en: "The electricity between masculine and feminine. Depth, presence, polarity. The courage to love without holding back anything.", fr: "L'électricité entre masculin et féminin. Profondeur, présence, polarité. Le courage d'aimer sans retenue.", cs: "Elektřina mezi maskulinním a femininním. Hloubka, přítomnost, polarita. Odvaha milovat beze zbytku." },
  "teach.richardson.name": { en: "Diana Richardson", fr: "Diana Richardson", cs: "Diana Richardson" },
  "teach.richardson.desc": { en: "Slow love. Soft presence. Stillness as the deepest intimacy. The goal is not ecstasy — it is presence.", fr: "Amour lent. Présence douce. L'immobilité comme intimité la plus profonde. Le but n'est pas l'extase — c'est la présence.", cs: "Pomalá láska. Jemná přítomnost. Ticho jako nejhlubší intimita. Cílem není extáze — je to přítomnost." },
  "teach.anand.name": { en: "Margot Anand", fr: "Margot Anand", cs: "Margot Anand" },
  "teach.anand.desc": { en: "SkyDancing Tantra — where pleasure, love, and awakening become one. Ecstasy is not a distraction from the spiritual path. It is the path.", fr: "SkyDancing Tantra — où plaisir, amour et éveil ne font qu'un. L'extase n'est pas une distraction du chemin spirituel. C'est le chemin.", cs: "SkyDancing Tantra — kde se potěšení, láska a probuzení stávají jedním. Extáze není odvedení od duchovní cesty. Je tou cestou." },

  // Tantra teachings
  "teach.tantra.0.title": { en: "Osho — Tantric Wisdom", fr: "Osho — Sagesse Tantrique", cs: "Osho — Tantrická moudrost" },
  "teach.tantra.0.content": { en: "Tantra says: accept yourself as you are. Don't fight with yourself, don't be divided within. The moment you accept yourself totally, something relaxes, and in that relaxation energy starts moving upward. Tantra's radical departure is its insistence on total self-acceptance. Rather than transcending desire, you move through it consciously.", fr: "Le Tantra dit: acceptez-vous tel que vous êtes. Ne luttez pas contre vous-même. Au moment où vous vous acceptez totalement, quelque chose se détend et l'énergie commence à monter.", cs: "Tantra říká: přijmi sebe takového, jaký jsi. Nebojuj sám se sebou. V okamžiku, kdy se zcela přijmete, něco se uvolní a energie se začne pohybovat vzhůru." },
  "teach.tantra.0.tags": { en: "acceptance · energy · consciousness", fr: "acceptation · énergie · conscience", cs: "přijetí · energie · vědomí" },
  "teach.tantra.1.title": { en: "Vijnanabhairava Tantra — Sacred Union", fr: "Vijnanabhairava Tantra — Union Sacrée", cs: "Vijnanabhairava Tantra — Posvátné sjednocení" },
  "teach.tantra.1.content": { en: "When two people merge in sacred embrace, the mind dissolves into the heart, the heart dissolves into breath, and breath dissolves into the infinite. This is samadhi dressed as lovemaking. The Vijnanabhairava Tantra describes 112 methods of entering expanded states — several involve conscious union as a direct doorway to transcendence.", fr: "Quand deux personnes fusionnent dans une étreinte sacrée, l'esprit se dissout dans le cœur, le cœur dans le souffle, et le souffle dans l'infini.", cs: "Když se dva lidé slijí v posvátném objetí, mysl se rozpustí v srdci, srdce v dechu a dech v nekonečnu. To je samádhi oblečené do milování." },
  "teach.tantra.1.tags": { en: "sacred union · samadhi · dissolution", fr: "union sacrée · samadhi · dissolution", cs: "posvátné sjednocení · samádhi · rozpuštění" },
  "teach.tantra.2.title": { en: "Osho — From Sex to Superconsciousness", fr: "Osho — Du Sexe à la Superconscience", cs: "Osho — Od sexu k supervědomí" },
  "teach.tantra.2.content": { en: "", fr: "", cs: "" },
  "teach.tantra.2.tags": { en: "love · ego-dissolution · presence", fr: "amour · dissolution de l'ego · présence", cs: "láska · rozpuštění ega · přítomnost" },
  "teach.tantra.3.title": { en: "Shiva-Shakti — Feminine Power", fr: "Shiva-Shakti — Pouvoir Féminin", cs: "Šiva-Šakti — Femininní síla" },
  "teach.tantra.3.content": { en: "", fr: "", cs: "" },
  "teach.tantra.3.tags": { en: "shakti · shiva · feminine power", fr: "shakti · shiva · pouvoir féminin", cs: "šakti · šiva · femininní síla" },

  // Tao teachings
  "teach.tao.0.title": { en: "Mantak Chia — Cultivating Sexual Energy", fr: "Mantak Chia — Cultiver l'Énergie Sexuelle", cs: "Mantak Chia — Kultivace sexuální energie" },
  "teach.tao.0.content": { en: "When you learn to conserve and circulate sexual energy rather than discharge it, you discover an inexhaustible source of vitality. The Taoist masters taught that jing (sexual essence) can be transformed into chi (life force) and then into shen (spiritual radiance).", fr: "Quand vous apprenez à conserver et faire circuler l'énergie sexuelle, vous découvrez une source inépuisable de vitalité.", cs: "Když se naučíte uchovávat a cirkulovat sexuální energii místo jejího vybití, objevíte nevyčerpatelný zdroj vitality." },
  "teach.tao.0.tags": { en: "jing · chi · shen · vitality", fr: "jing · chi · shen · vitalité", cs: "ťing · čchi · šen · vitalita" },
  "teach.tao.1.title": { en: "Lao Tzu — The Way of Stillness", fr: "Lao Tseu — La Voie de l'Immobilité", cs: "Lao-c' — Cesta ticha" },
  "teach.tao.1.content": { en: "To the mind that is still, the whole universe surrenders. And to two bodies that are still together, the whole universe opens like a flower. The Tao teaches that the greatest power comes not from effort but from effortless alignment with natural flow.", fr: "À l'esprit immobile, tout l'univers se rend. Le Tao enseigne que le plus grand pouvoir vient non pas de l'effort mais de l'alignement sans effort.", cs: "Klidné mysli se celý vesmír poddá. Tao učí, že největší síla pochází nikoli z úsilí, ale z přirozeného souznění s tokem." },
  "teach.tao.1.tags": { en: "stillness · wu wei · natural flow", fr: "immobilité · wu wei · flux naturel", cs: "ticho · wu wei · přirozený tok" },
  "teach.tao.2.title": { en: "Valley Orgasm & Chi Cultivation", fr: "Orgasme de la Vallée & Culture du Chi", cs: "Údolní orgasmus a kultivace čchi" },
  "teach.tao.2.content": { en: "", fr: "", cs: "" },
  "teach.tao.2.tags": { en: "valley orgasm · chi flow · longevity", fr: "orgasme de la vallée · flux de chi · longévité", cs: "údolní orgasmus · tok čchi · dlouhověkost" },

  // Deida teachings
  "teach.deida.0.title": { en: "Way of the Superior Man — Polarity", fr: "La Voie de l'Homme Supérieur — Polarité", cs: "Cesta vyššího muže — Polarita" },
  "teach.deida.0.content": { en: "Sexual attraction is the flow between poles — masculine and feminine. The stronger the polarity, the deeper the attraction. Masculine energy is presence, direction, depth. Feminine energy is flow, radiance, luminosity. Both poles live in each of us.", fr: "L'attraction sexuelle est le flux entre les pôles — masculin et féminin. Plus la polarité est forte, plus l'attraction est profonde.", cs: "Sexuální přitažlivost je proudění mezi póly — maskulinním a femininním. Čím silnější polarita, tím hlubší přitažlivost." },
  "teach.deida.0.tags": { en: "polarity · presence · edge · surrender", fr: "polarité · présence · limite · abandon", cs: "polarita · přítomnost · hrana · odevzdání" },
  "teach.deida.1.title": { en: "Intimate Communion — Opening Beyond Fear", fr: "Communion Intime — S'Ouvrir Au-delà de la Peur", cs: "Intimní společenství — Otevření za strach" },
  "teach.deida.1.content": { en: "If you are waiting for your partner to change before you open your heart fully, you are living in a prison of your own making. Real love begins when you stop negotiating and start offering your deepest gift — regardless of what you receive in return.", fr: "Si vous attendez que votre partenaire change avant d'ouvrir pleinement votre cœur, vous vivez dans une prison de votre propre fabrication.", cs: "Pokud čekáte, až se váš partner změní, než otevřete srdce, žijete ve vězení vlastní výroby." },
  "teach.deida.1.tags": { en: "openness · courage · devotion", fr: "ouverture · courage · dévotion", cs: "otevřenost · odvaha · oddanost" },
  "teach.deida.2.title": { en: "Blue Truth — Living the Deepest Moment", fr: "Vérité Bleue — Vivre le Moment le Plus Profond", cs: "Modrá pravda — Žít nejhlubší okamžik" },
  "teach.deida.2.content": { en: "", fr: "", cs: "" },
  "teach.deida.2.tags": { en: "truth · depth · moment", fr: "vérité · profondeur · moment", cs: "pravda · hloubka · okamžik" },

  // Richardson teachings
  "teach.rich.0.title": { en: "Heart of Tantric Sex — Slow Presence", fr: "Cœur du Sexe Tantrique — Présence Lente", cs: "Srdce tantrického sexu — Pomalá přítomnost" },
  "teach.rich.0.content": { en: "The goal is not ecstasy. It is presence. Ecstasy may arise, but it is never the target. When we slow down and bring full awareness to our bodies, something profound shifts. We move from doing to being, from performance to presence.", fr: "Le but n'est pas l'extase. C'est la présence. Quand nous ralentissons et apportons une pleine conscience à nos corps, quelque chose de profond change.", cs: "Cílem není extáze. Je to přítomnost. Když zpomalíme a přineseme plné uvědomění k našim tělům, něco hlubokého se změní." },
  "teach.rich.0.tags": { en: "slow sex · soft entry · stillness · healing", fr: "slow sex · entrée douce · immobilité · guérison", cs: "pomalý sex · jemný vstup · ticho · uzdravení" },
  "teach.rich.1.title": { en: "Slow Sex — Seeing Your Partner Again", fr: "Slow Sex — Revoir Votre Partenaire", cs: "Slow Sex — Opětovné vidění partnera" },
  "teach.rich.1.content": { en: "After years of conventional sex, many couples have become strangers in bed. Slow sex is the practice of seeing your partner again, as if for the very first time. It requires dropping all expectations and approaching each other with fresh curiosity.", fr: "Après des années de sexe conventionnel, beaucoup de couples sont devenus des étrangers au lit. Le slow sex est la pratique de revoir son partenaire.", cs: "Po letech konvenčního sexu se mnoho párů stalo cizinci v posteli. Pomalý sex je praxí opětovného vidění partnera." },
  "teach.rich.1.tags": { en: "presence · renewal · softness", fr: "présence · renouveau · douceur", cs: "přítomnost · obnova · jemnost" },
  "teach.rich.2.title": { en: "Tantric Sex for Men — The Art of Receiving", fr: "Sexe Tantrique pour Hommes — L'Art de Recevoir", cs: "Tantrický sex pro muže — Umění přijímat" },
  "teach.rich.2.content": { en: "", fr: "", cs: "" },
  "teach.rich.2.tags": { en: "masculine · receiving · vulnerability", fr: "masculin · réception · vulnérabilité", cs: "maskulinní · přijímání · zranitelnost" },

  // Anand teachings
  "teach.anand.0.title": { en: "The Art of Sexual Ecstasy", fr: "L'Art de l'Extase Sexuelle", cs: "Umění sexuální extáze" },
  "teach.anand.0.content": { en: "Sexual energy is the most powerful creative force available to human beings. In Tantra, instead of releasing this energy in a moment of pleasure, you learn to circulate it, amplify it, and direct it — transforming it into vitality, creativity, and love.", fr: "L'énergie sexuelle est la force créatrice la plus puissante. En Tantra, au lieu de la libérer, vous apprenez à la faire circuler, l'amplifier et la diriger.", cs: "Sexuální energie je nejmocnější tvůrčí síla dostupná lidem. V tantře se místo jejího uvolnění naučíte ji cirkulovat, zesilovat a směrovat." },
  "teach.anand.0.tags": { en: "SkyDancing · ecstasy · sexual magic · awakening", fr: "SkyDancing · extase · magie sexuelle · éveil", cs: "SkyDancing · extáze · sexuální magie · probuzení" },
  "teach.anand.1.title": { en: "The Art of Sexual Magic", fr: "L'Art de la Magie Sexuelle", cs: "Umění sexuální magie" },
  "teach.anand.1.content": { en: "", fr: "", cs: "" },
  "teach.anand.1.tags": { en: "ritual · manifestation · energy", fr: "rituel · manifestation · énergie", cs: "rituál · manifestace · energie" },

  // Pricing
  "pricing.title": { en: "Choose Your Path", fr: "Choisissez Votre Chemin", cs: "Vyberte si svou cestu" },
  "pricing.desc": { en: "Begin with a free practice or unlock the full sacred library with a subscription", fr: "Commencez avec une pratique gratuite ou débloquez la bibliothèque sacrée complète", cs: "Začněte se zdarma nebo odemkněte celou posvátnou knihovnu s předplatným" },
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
  "pricing.feat_rituals_basic": { en: "Basic Reconnect rituals", fr: "Rituels de base", cs: "Základní rituály" },
  "pricing.feat_everything_free": { en: "Everything in Free", fr: "Tout dans Gratuit", cs: "Vše ze Zdarma" },
  "pricing.feat_library": { en: "Full teaching library (50+ lessons)", fr: "Bibliothèque complète (50+ leçons)", cs: "Celá knihovna učení (50+ lekcí)" },
  "pricing.feat_all_rituals": { en: "All Reconnect rituals", fr: "Tous les rituels", cs: "Všechny rituály" },
  "pricing.feat_weather": { en: "Intimacy Weather tracking", fr: "Suivi Météo d'Intimité", cs: "Sledování počasí intimity" },
  "pricing.feat_thread": { en: "The Thread daily questions", fr: "Questions quotidiennes Le Fil", cs: "Denní otázky Nit dne" },
  "pricing.feat_priority": { en: "Priority new content", fr: "Contenu prioritaire", cs: "Prioritní nový obsah" },
  "pricing.feat_everything_sacred": { en: "Everything in Sacred", fr: "Tout dans Sacré", cs: "Vše z Posvátné" },
  "pricing.feat_save": { en: "Save 44%", fr: "Économisez 44%", cs: "Ušetřete 44%" },
  "pricing.feat_exclusive": { en: "Exclusive annual-only teachings", fr: "Enseignements exclusifs annuels", cs: "Exkluzivní roční učení" },
  "pricing.feat_early": { en: "Early access to new features", fr: "Accès anticipé aux nouvelles fonctionnalités", cs: "Předčasný přístup k novinkám" },
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
