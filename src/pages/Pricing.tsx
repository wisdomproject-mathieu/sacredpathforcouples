import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import LotusIcon from "@/components/tantra-icons/LotusIcon";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Daily Whisper wisdom quote",
      "2 free teachings",
      "Partner Connect",
      "Basic Reconnect rituals",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Sacred",
    price: "$2.99",
    period: "/month",
    features: [
      "Everything in Free",
      "Full teaching library (50+ lessons)",
      "All Reconnect rituals",
      "Intimacy Weather tracking",
      "The Thread daily questions",
      "Priority new content",
    ],
    cta: "Start 7-Day Trial",
    highlight: true,
  },
  {
    name: "Sacred Yearly",
    price: "$19.99",
    period: "/year",
    features: [
      "Everything in Sacred",
      "Save 44%",
      "Exclusive annual-only teachings",
      "Early access to new features",
    ],
    cta: "Start 7-Day Trial",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background px-4 py-24">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <LotusIcon className="text-primary mx-auto mb-6" size={56} />
          <h1 className="font-heading text-4xl font-semibold text-foreground mb-4">
            Choose Your Path
          </h1>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Begin with a free practice or unlock the full sacred library with a subscription
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-8 transition-all ${
                plan.highlight
                  ? "border-primary bg-card shadow-lg shadow-primary/10 scale-105"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlight && (
                <span className="mb-4 inline-block text-xs font-body uppercase tracking-widest text-primary">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading text-2xl font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground font-body">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth" className="block mt-8">
                <Button
                  className="w-full font-body"
                  variant={plan.highlight ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
