import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Check, Crown, HeartHandshake, Sparkles, Stars } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import { createCheckoutSession, createCustomerPortalSession, type BillingPlan } from "@/lib/billing";
import { getEffectiveMembershipTier, isPremiumTier } from "@/lib/Premium";

const pricingTiers = [
  {
    plan: "monthly" as BillingPlan,
    name: "Monthly",
    price: "$5.99",
    subline: "per month",
    highlight: "Flexible entry",
    icon: Sparkles,
    iconClass: "text-cyan-300",
    featured: false,
    cta: "Choose monthly",
  },
  {
    plan: "yearly" as BillingPlan,
    name: "Yearly",
    price: "$39.99",
    subline: "per year",
    highlight: "Best value",
    icon: Crown,
    iconClass: "text-amber-300",
    featured: true,
    cta: "Choose yearly",
  },
  {
    plan: "founding" as BillingPlan,
    name: "Founding Offer",
    price: "$29.99",
    subline: "limited launch year",
    highlight: "Early believer price",
    icon: Stars,
    iconClass: "text-fuchsia-300",
    featured: false,
    cta: "Choose founding",
  },
];

const features = [
  "Premium author teachings and extended pathways",
  "Deeper rituals, positions, and intimacy journeys",
  "A richer private temple experience for couples",
  "Ongoing visual upgrades and new guided practices",
  "Early access to future sacred content releases",
];

const Pricing = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activePlan, setActivePlan] = useState<BillingPlan | null>(null);
  const [openingPortal, setOpeningPortal] = useState(false);
  const membershipTier = getEffectiveMembershipTier(user);
  const hasPremiumAccess = isPremiumTier(membershipTier);

  useEffect(() => {
    const billingStatus = searchParams.get("billing");
    if (billingStatus === "success") {
      toast.success("Payment confirmed. Your premium access should update shortly.");
    }
    if (billingStatus === "canceled") {
      toast.message("Checkout canceled.");
    }
  }, [searchParams]);

  const handleCheckout = async (plan: BillingPlan) => {
    if (!user) {
      toast.message("Please log in to start your subscription.");
      navigate("/auth");
      return;
    }
    if (!session?.access_token) {
      toast.error("Missing session token. Please log in again.");
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
      const message = error instanceof Error ? error.message : "Unable to start checkout.";
      toast.error(message);
    } finally {
      setActivePlan(null);
    }
  };

  const handleManageBilling = async () => {
    if (!user) {
      toast.message("Please log in to manage billing.");
      navigate("/auth");
      return;
    }
    if (!session?.access_token) {
      toast.error("Missing session token. Please log in again.");
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
      const message = error instanceof Error ? error.message : "Unable to open billing portal.";
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
            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Membership</p>
            <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Make Sacred Path feel premium — and still accessible</h1>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              Position the app below the most expensive couples apps, while still honoring the depth, beauty, and originality of your temple experience.
            </p>
            {hasPremiumAccess ? (
              <div className="mt-5 inline-flex rounded-full border border-emerald-300/35 bg-emerald-500/12 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-emerald-200">
                Premium active · {membershipTier === "sacred_yearly" ? "Yearly" : "Monthly"}
              </div>
            ) : null}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          {pricingTiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
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
                    {tier.highlight}
                  </div>
                </div>

                <h2 className="mt-5 font-display text-2xl text-foreground">{tier.name}</h2>
                <div className="mt-3 flex items-end gap-2">
                  <div className="font-display text-5xl text-foreground">{tier.price}</div>
                  <div className="pb-1 text-sm text-muted-foreground">{tier.subline}</div>
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
                  {activePlan === tier.plan ? "Redirecting..." : tier.cta}
                </button>
              </div>
            );
          })}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[28px] border border-border/30 bg-card/45 p-6">
            <div className="flex items-center gap-2 text-emerald-300">
              <HeartHandshake className="h-5 w-5" />
              <span className="text-xs uppercase tracking-[0.22em]">Included in premium</span>
            </div>

            <div className="mt-5 space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 rounded-[20px] border border-border/25 bg-background/40 p-4">
                  <div className="mt-0.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 p-1 text-emerald-300">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-border/30 bg-card/45 p-6">
            <div className="text-xs uppercase tracking-[0.22em] text-fuchsia-300">Recommended price posture</div>
            <h2 className="mt-3 font-display text-2xl text-foreground">Premium, but not intimidating</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              The goal is to feel more elevated than budget apps, while still sitting below the category’s more aggressive pricing. The yearly plan should become the hero offer.
            </p>

            <div className="mt-5 rounded-[24px] border border-primary/15 bg-primary/8 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Launch guidance</div>
              <p className="mt-2 text-sm leading-6 text-foreground/90">
                Use the founding offer sparingly, then anchor the product around yearly membership as the main choice once the temple experience feels fully integrated.
              </p>
            </div>

            <Link
              to="/app"
              className="mt-6 inline-flex items-center justify-center rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              Return to Sacred Path
            </Link>

            {user && hasPremiumAccess ? (
              <button
                type="button"
                onClick={handleManageBilling}
                disabled={openingPortal}
                className="mt-3 inline-flex items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/45 hover:bg-primary/16 disabled:cursor-not-allowed disabled:opacity-65"
              >
                {openingPortal ? "Opening billing..." : "Manage subscription"}
              </button>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pricing;
