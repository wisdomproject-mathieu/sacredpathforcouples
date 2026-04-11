import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import LotusIcon from "@/components/tantra-icons/LotusIcon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Pricing = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t("pricing.free"),
      price: "$0",
      period: t("pricing.forever"),
      features: [t("pricing.feat_whisper"), t("pricing.feat_teachings_free"), t("pricing.feat_partner"), t("pricing.feat_rituals_basic")],
      cta: t("pricing.get_started"),
      highlight: false,
    },
    {
      name: t("pricing.sacred"),
      price: "$5.99",
      period: t("pricing.month"),
      features: [t("pricing.feat_everything_free"), t("pricing.feat_library"), t("pricing.feat_all_rituals"), t("pricing.feat_weather"), t("pricing.feat_thread"), t("pricing.feat_priority")],
      cta: t("pricing.start_trial"),
      highlight: true,
    },
    {
      name: t("pricing.sacred_yearly"),
      price: "$39.99",
      period: t("pricing.year"),
      features: [t("pricing.feat_everything_sacred"), t("pricing.feat_save"), t("pricing.feat_exclusive"), t("pricing.feat_early")],
      cta: t("pricing.start_trial"),
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background px-4 py-24">
      <div className="absolute top-4 right-4"><LanguageSwitcher /></div>
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <LotusIcon className="text-primary mx-auto mb-6" size={56} />
          <h1 className="font-heading text-4xl font-semibold text-foreground mb-4">{t("pricing.title")}</h1>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">{t("pricing.desc")}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-xl border p-8 transition-all ${plan.highlight ? "border-primary bg-card shadow-lg shadow-primary/10 scale-105" : "border-border bg-card"}`}>
              {plan.highlight && <span className="mb-4 inline-block text-xs font-body uppercase tracking-widest text-primary">{t("pricing.most_popular")}</span>}
              <h3 className="font-heading text-2xl font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground font-body">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth" className="block mt-8">
                <Button className="w-full font-body" variant={plan.highlight ? "default" : "outline"}>{plan.cta}</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
