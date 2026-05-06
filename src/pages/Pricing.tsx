import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Check, Crown, HeartHandshake, Sparkles, Stars } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { createCheckoutSession, createCustomerPortalSession, type BillingPlan } from "@/lib/billing";
import { getEffectiveMembershipTier, isPremiumTier } from "@/lib/Premium";
import { getFeatureSplit, getPremiumBuckets, getPremiumTriggerCopy, getTempleMembershipName, type PremiumTriggerKey } from "@/lib/premiumArchitecture";

const pricingTiers = [
  {
    plan: "monthly" as BillingPlan,
    price: "$5.99",
    icon: Sparkles,
    iconClass: "text-cyan-300",
    featured: false,
  },
  {
    plan: "yearly" as BillingPlan,
    price: "$39.99",
    icon: Crown,
    iconClass: "text-amber-300",
    featured: true,
  },
  {
    plan: "founding" as BillingPlan,
    price: "$29.99",
    icon: Stars,
    iconClass: "text-fuchsia-300",
    featured: false,
  },
];

type PlanCopy = {
  name: string;
  subline: string;
  highlight: string;
  cta: string;
};

type PricingCopy = {
  membership: string;
  heroTitle: string;
  heroDescription: string;
  premiumActive: string;
  planMonthlyLabel: string;
  planYearlyLabel: string;
  redirecting: string;
  includedPremium: string;
  postureLabel: string;
  postureTitle: string;
  postureBody: string;
  launchGuidance: string;
  launchGuidanceBody: string;
  returnToApp: string;
  openingBilling: string;
  manageSubscription: string;
  paymentSuccess: string;
  paymentCanceled: string;
  loginToStart: string;
  loginToManage: string;
  missingSession: string;
  checkoutError: string;
  portalError: string;
  plans: Record<BillingPlan, PlanCopy>;
  features: string[];
};

const pricingCopy: Record<Language, PricingCopy> = {
  en: {
    membership: "ONE PATH • TWO HEARTS",
    heroTitle: "Choose the depth your love deserves.",
    heroDescription:
      "Sacred Path Premium is for couples who want to reconnect, heal what feels strained, and keep discovering each other in new ways. It is not just more to read — it is a deeper way to love.",
    premiumActive: "Premium active",
    planMonthlyLabel: "Monthly",
    planYearlyLabel: "Yearly",
    redirecting: "Redirecting...",
    includedPremium: "Included in premium",
    postureLabel: "Recommended price posture",
    postureTitle: "Premium, but not intimidating",
    postureBody:
      "The goal is to feel more elevated than budget apps, while still sitting below the category’s more aggressive pricing. The yearly plan should become the hero offer.",
    launchGuidance: "Launch guidance",
    launchGuidanceBody:
      "Use the founding offer sparingly, then anchor the product around yearly membership as the main choice once the temple experience feels fully integrated.",
    returnToApp: "Return to Sacred Path",
    openingBilling: "Opening billing...",
    manageSubscription: "Manage subscription",
    paymentSuccess: "Payment confirmed. Your premium access should update shortly.",
    paymentCanceled: "Checkout canceled.",
    loginToStart: "Please log in to start your subscription.",
    loginToManage: "Please log in to manage billing.",
    missingSession: "Missing session token. Please log in again.",
    checkoutError: "Unable to start checkout.",
    portalError: "Unable to open billing portal.",
    plans: {
      monthly: { name: "Monthly", subline: "per month", highlight: "Flexible entry", cta: "Start your deeper journey" },
      yearly: { name: "Yearly", subline: "per year", highlight: "Best value", cta: "Start your deeper journey" },
      founding: { name: "Founding Offer", subline: "limited launch year", highlight: "Early believer price", cta: "Start your deeper journey" },
    },
    features: [
      "Reconnect what feels distant between you",
      "Deeper rituals and guided intimacy experiences",
      "Repair what feels strained with gentle tools",
      "Discover new ways to love and grow closer",
      "A shared path for love that wants to grow",
    ],
  },
  fr: {
    membership: "Abonnement",
    heroTitle: "Faites de Sacred Path une expérience premium, tout en restant accessible",
    heroDescription:
      "Positionnez l'app en dessous des offres couples les plus chères, tout en préservant la profondeur, la beauté et l'originalité de votre expérience du temple.",
    premiumActive: "Premium actif",
    planMonthlyLabel: "Mensuel",
    planYearlyLabel: "Annuel",
    redirecting: "Redirection...",
    includedPremium: "Inclus dans premium",
    postureLabel: "Positionnement recommandé",
    postureTitle: "Premium, sans intimidation",
    postureBody:
      "L'objectif est de paraître plus élevé que les apps low-cost, tout en restant en dessous des tarifs les plus agressifs de la catégorie. L'offre annuelle doit devenir l'offre phare.",
    launchGuidance: "Conseil de lancement",
    launchGuidanceBody:
      "Utilisez l'offre fondateur avec parcimonie, puis ancrez le produit autour de l'abonnement annuel comme choix principal dès que l'expérience temple est pleinement intégrée.",
    returnToApp: "Retourner à Sacred Path",
    openingBilling: "Ouverture de la facturation...",
    manageSubscription: "Gérer l'abonnement",
    paymentSuccess: "Paiement confirmé. Votre accès premium sera mis à jour sous peu.",
    paymentCanceled: "Paiement annulé.",
    loginToStart: "Connectez-vous pour démarrer votre abonnement.",
    loginToManage: "Connectez-vous pour gérer la facturation.",
    missingSession: "Session manquante. Veuillez vous reconnecter.",
    checkoutError: "Impossible de démarrer le paiement.",
    portalError: "Impossible d'ouvrir le portail de facturation.",
    plans: {
      monthly: { name: "Mensuel", subline: "par mois", highlight: "Entrée flexible", cta: "Choisir mensuel" },
      yearly: { name: "Annuel", subline: "par an", highlight: "Meilleure valeur", cta: "Choisir annuel" },
      founding: { name: "Offre fondateur", subline: "année de lancement limitée", highlight: "Prix early believer", cta: "Choisir fondateur" },
    },
    features: [
      "Enseignements d'auteurs premium et parcours étendus",
      "Rituels, positions et voyages d'intimité plus profonds",
      "Une expérience temple privée plus riche pour les couples",
      "Améliorations visuelles continues et nouvelles pratiques guidées",
      "Accès anticipé aux futures sorties de contenu sacré",
    ],
  },
  cs: {
    membership: "Členství",
    heroTitle: "Udělej ze Sacred Path premium zážitek, ale stále dostupný",
    heroDescription:
      "Umísti aplikaci pod nejdražší párové aplikace, ale zachovej hloubku, krásu a originalitu vašeho chrámového zážitku.",
    premiumActive: "Premium aktivní",
    planMonthlyLabel: "Měsíční",
    planYearlyLabel: "Roční",
    redirecting: "Přesměrování...",
    includedPremium: "Zahrnuto v premium",
    postureLabel: "Doporučené cenové nastavení",
    postureTitle: "Premium, ale ne odrazující",
    postureBody:
      "Cílem je působit hodnotněji než low-cost aplikace a zároveň zůstat pod nejagresivnějším pricingem v kategorii. Roční plán by měl být hlavní volba.",
    launchGuidance: "Doporučení pro launch",
    launchGuidanceBody:
      "Founding nabídku používej omezeně a potom postav produkt kolem ročního členství jako hlavní volby, jakmile bude chrámový zážitek plně integrovaný.",
    returnToApp: "Zpět do Sacred Path",
    openingBilling: "Otevírám fakturaci...",
    manageSubscription: "Spravovat předplatné",
    paymentSuccess: "Platba potvrzena. Premium přístup se brzy aktualizuje.",
    paymentCanceled: "Platba zrušena.",
    loginToStart: "Přihlas se pro spuštění předplatného.",
    loginToManage: "Přihlas se pro správu fakturace.",
    missingSession: "Chybí token relace. Přihlas se znovu.",
    checkoutError: "Nepodařilo se spustit checkout.",
    portalError: "Nepodařilo se otevřít billing portál.",
    plans: {
      monthly: { name: "Měsíční", subline: "za měsíc", highlight: "Flexibilní start", cta: "Vybrat měsíční" },
      yearly: { name: "Roční", subline: "za rok", highlight: "Nejlepší hodnota", cta: "Vybrat roční" },
      founding: { name: "Founding nabídka", subline: "limitovaný launch rok", highlight: "Cena pro early podporovatele", cta: "Vybrat founding" },
    },
    features: [
      "Premium učení autorů a rozšířené cesty",
      "Hlubší rituály, pozice a intimní cesty",
      "Bohatší soukromý chrámový zážitek pro páry",
      "Průběžné vizuální upgrady a nové vedené praxe",
      "Přednostní přístup k budoucímu sacred obsahu",
    ],
  },
};

const Pricing = () => {
  const { lang } = useLanguage();
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activePlan, setActivePlan] = useState<BillingPlan | null>(null);
  const [openingPortal, setOpeningPortal] = useState(false);
  const membershipTier = getEffectiveMembershipTier(user);
  const hasPremiumAccess = isPremiumTier(membershipTier);
  const copy = pricingCopy[lang];
  const templeAccessName = getTempleMembershipName(lang);
  const premiumBuckets = getPremiumBuckets(lang);
  const featureSplit = getFeatureSplit(lang);
  const triggerByEntry: Partial<Record<string, PremiumTriggerKey>> = {
    "match-unlock": "match_unlock",
    "deeper-ritual": "deeper_ritual",
    "source-depth": "source_depth",
    "journey-memory": "journey_memory",
    "journey-program": "journey_program",
    "oracle-depth": "source_depth",
    "temple-board": "journey_program",
  };
  const triggerKey = searchParams.get("entry");
  const activeTrigger =
    triggerKey && triggerByEntry[triggerKey]
      ? getPremiumTriggerCopy(lang, triggerByEntry[triggerKey] as PremiumTriggerKey)
      : null;

  useEffect(() => {
    const billingStatus = searchParams.get("billing");
    if (billingStatus === "success") {
      toast.success(copy.paymentSuccess);
    }
    if (billingStatus === "canceled") {
      toast.message(copy.paymentCanceled);
    }
  }, [copy.paymentCanceled, copy.paymentSuccess, searchParams]);

  const handleCheckout = async (plan: BillingPlan) => {
    if (!user) {
      toast.message(copy.loginToStart);
      navigate("/auth");
      return;
    }
    if (!session?.access_token) {
      toast.error(copy.missingSession);
      navigate("/auth");
      return;
    }

    try {
      setActivePlan(plan);
      const checkoutUrl = await createCheckoutSession({
        plan,
        userId: user.id,
        accessToken: session.access_token,
        email: user.email ?? undefined,
      });
      window.location.assign(checkoutUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : copy.checkoutError;
      toast.error(message);
    } finally {
      setActivePlan(null);
    }
  };

  const handleManageBilling = async () => {
    if (!user) {
      toast.message(copy.loginToManage);
      navigate("/auth");
      return;
    }
    if (!session?.access_token) {
      toast.error(copy.missingSession);
      navigate("/auth");
      return;
    }

    try {
      setOpeningPortal(true);
      const portalUrl = await createCustomerPortalSession({
        userId: user.id,
        accessToken: session.access_token,
        email: user.email ?? undefined,
      });
      window.location.assign(portalUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : copy.portalError;
      toast.error(message);
    } finally {
      setOpeningPortal(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-foreground md:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[32px] border border-primary/15 bg-gradient-to-br from-primary/14 via-background to-background p-6 shadow-[0_30px_100px_-48px_rgba(255,173,70,0.48)] md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">{copy.membership}</p>
            <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
              {lang === "fr"
                ? `${templeAccessName} · le sanctuaire complet`
                : lang === "cs"
                ? `${templeAccessName} · plná svatyně`
                : `${templeAccessName} · the full sanctuary`}
            </h1>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              {copy.heroDescription}
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground/90">
              {lang === "fr"
                ? "Un chemin partagé pour l'amour qui veut grandir."
                : lang === "cs"
                ? "Sdílená cesta pro lásku, která chce růst."
                : "A shared path for love that wants to grow."}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-primary/85">
              {lang === "fr"
                ? "Un chemin · Deux cœurs"
                : lang === "cs"
                ? "Jedna cesta · Dvě srdce"
                : "One path · Two hearts"}
            </p>
            {hasPremiumAccess ? (
              <div className="mt-5 inline-flex rounded-full border border-emerald-300/35 bg-emerald-500/12 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-emerald-200">
                {copy.premiumActive} · {membershipTier === "sacred_yearly" ? copy.planYearlyLabel : copy.planMonthlyLabel}
              </div>
            ) : null}
          </div>
        </section>

        {activeTrigger ? (
          <section className="rounded-[24px] border border-amber-300/30 bg-amber-500/8 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200">{templeAccessName}</p>
            <h2 className="mt-2 font-display text-2xl text-foreground">{activeTrigger.title}</h2>
            <p className="mt-2 text-sm leading-7 text-foreground/90">{activeTrigger.body}</p>
          </section>
        ) : null}

        {!hasPremiumAccess ? (
          <section className="grid gap-4 xl:grid-cols-3">
            {pricingTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.plan}
                  className={`rounded-[30px] border p-6 ${
                    tier.featured
                      ? "border-primary/25 bg-primary/8 shadow-[0_28px_90px_-50px_rgba(255,173,70,0.52)]"
                      : "border-border/30 bg-card/45"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${tier.iconClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="rounded-full border border-border/30 bg-background/55 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {copy.plans[tier.plan].highlight}
                    </div>
                  </div>

                  <h2 className="mt-5 font-display text-2xl text-foreground">{copy.plans[tier.plan].name}</h2>
                  <div className="mt-3 flex items-end gap-2">
                    <div className="font-display text-5xl text-foreground">{tier.price}</div>
                    <div className="pb-1 text-sm text-muted-foreground">{copy.plans[tier.plan].subline}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCheckout(tier.plan)}
                    disabled={activePlan === tier.plan}
                    className={`mt-6 w-full rounded-2xl px-4 py-3 text-sm transition-all ${
                      tier.featured
                        ? "border border-primary/30 bg-primary/12 text-foreground hover:border-primary/40 hover:bg-primary/16"
                        : "border border-border/35 bg-card/45 text-foreground hover:border-border/55 hover:bg-card/60"
                    } disabled:cursor-not-allowed disabled:opacity-65`}
                  >
                    {activePlan === tier.plan ? copy.redirecting : copy.plans[tier.plan].cta}
                  </button>
                </div>
              );
            })}
          </section>
        ) : (
          <section className="rounded-[28px] border border-emerald-300/35 bg-emerald-500/10 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">{copy.premiumActive}</p>
            <h2 className="mt-2 font-display text-2xl text-foreground">
              {lang === "fr"
                ? "Votre accès premium est déjà actif."
                : lang === "cs"
                  ? "Váš premium přístup je už aktivní."
                  : "Your premium access is already active."}
            </h2>
            <p className="mt-2 text-sm leading-6 text-foreground/90">
              {lang === "fr"
                ? "Gérez votre abonnement si vous souhaitez mettre à jour le plan ou la facturation."
                : lang === "cs"
                  ? "Spravujte předplatné, pokud chcete upravit plán nebo fakturaci."
                  : "Use manage subscription if you want to update plan or billing details."}
            </p>
          </section>
        )}

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[28px] border border-border/30 bg-card/45 p-6">
            <div className="flex items-center gap-2 text-emerald-300">
              <HeartHandshake className="h-5 w-5" />
              <span className="text-xs uppercase tracking-[0.22em]">
                {lang === "fr" ? "Ce que le gratuit vous offre" : lang === "cs" ? "Co nabízí zdarma" : "What free gives your couple"}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {featureSplit.free.map((feature) => (
                <div key={`free-${feature}`} className="flex items-start gap-3 rounded-[20px] border border-border/25 bg-background/40 p-4">
                  <div className="mt-0.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 p-1 text-emerald-300">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-primary/20 bg-primary/8 p-6 shadow-[0_24px_70px_-42px_rgba(255,173,70,0.5)]">
            <div className="text-xs uppercase tracking-[0.22em] text-primary/80">{copy.includedPremium}</div>
            <h2 className="mt-3 font-display text-2xl text-foreground">
              {lang === "fr" ? "Ce que Accès Temple ouvre" : lang === "cs" ? "Co odemkne Chrámový přístup" : "What Temple Access unlocks"}
            </h2>
            <div className="mt-4 space-y-3">
              {featureSplit.premium.map((feature) => (
                <div key={`premium-${feature}`} className="flex items-start gap-3 rounded-[20px] border border-primary/20 bg-background/40 p-4">
                  <div className="mt-0.5 rounded-full border border-primary/25 bg-primary/10 p-1 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-sm leading-6 text-foreground/90">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {premiumBuckets.map((bucket) => (
            <article key={bucket.title} className="rounded-[24px] border border-border/30 bg-card/45 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{bucket.title}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {lang === "fr" ? "Gratuit:" : lang === "cs" ? "Zdarma:" : "Free:"} {bucket.free}
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground/90">
                {lang === "fr" ? "Accès Temple:" : lang === "cs" ? "Chrámový přístup:" : "Temple Access:"} {bucket.premium}
              </p>
            </article>
          ))}
        </section>

        <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
          <div className="text-xs uppercase tracking-[0.22em] text-fuchsia-300">{copy.postureLabel}</div>
          <h2 className="mt-3 font-display text-2xl text-foreground">{copy.postureTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {copy.postureBody}
          </p>

          <div className="mt-5 rounded-[24px] border border-primary/15 bg-primary/8 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{copy.launchGuidance}</div>
            <p className="mt-2 text-sm leading-6 text-foreground/90">
              {copy.launchGuidanceBody}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/app"
              className="inline-flex items-center justify-center rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              {copy.returnToApp}
            </Link>

            {user && hasPremiumAccess ? (
              <button
                type="button"
                onClick={handleManageBilling}
                disabled={openingPortal}
                className="inline-flex items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/45 hover:bg-primary/16 disabled:cursor-not-allowed disabled:opacity-65"
              >
                {openingPortal ? copy.openingBilling : copy.manageSubscription}
              </button>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pricing;
