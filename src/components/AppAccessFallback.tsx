import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AppAccessFallback = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">{t("app_fallback.badge")}</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">{t("app_fallback.title")}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">{t("app_fallback.desc")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/connect"
              className="inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/15 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/45 hover:bg-primary/20"
            >
              <HeartHandshake className="h-4 w-4" />
              {t("cta.connect_partner")}
            </Link>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              {t("cta.enter_app_account")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              {t("cta.continue_without_account")}
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-[24px] border border-border/30 bg-card/45 p-5">
            <div className="inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 text-fuchsia-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-display text-2xl text-foreground">{t("app_fallback.two_pillars_title")}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{t("app_fallback.two_pillars_desc")}</p>
          </article>
          <article className="rounded-[24px] border border-border/30 bg-card/45 p-5">
            <div className="inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 text-rose-300">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-display text-2xl text-foreground">{t("app_fallback.partner_first_title")}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{t("app_fallback.partner_first_desc")}</p>
          </article>
        </section>
      </div>
    </div>
  );
};

export default AppAccessFallback;
