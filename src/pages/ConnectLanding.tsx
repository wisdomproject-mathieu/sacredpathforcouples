import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake, Lock, MessageCircleHeart, Sparkles, Users } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMetadata } from "@/lib/seo";

const ConnectLanding = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const primaryTarget = user ? "/app/connect" : "/auth";
  const modules = [
    { title: t("connect.module.1.title"), body: t("connect.module.1.body") },
    { title: t("connect.module.2.title"), body: t("connect.module.2.body") },
    { title: t("connect.module.3.title"), body: t("connect.module.3.body") },
    { title: t("connect.module.4.title"), body: t("connect.module.4.body") },
    { title: t("connect.module.5.title"), body: t("connect.module.5.body") },
  ];

  useSeoMetadata({
    title: t("connect.headline"),
    description:
      "Create a couple code, join your partner, and unlock Intimacy Weather, The Unsaid, and The Thread as a shared relationship flow.",
    path: "/connect",
    surface: "marketing",
    noIndex: false,
  });

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-foreground">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">{t("connect.partner_flow")}</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">{t("connect.headline")}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            {t("connect.hero_desc")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={primaryTarget}
              className="inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/15 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/45 hover:bg-primary/20"
            >
              <HeartHandshake className="h-4 w-4" />
              {t("cta.connect_partner")}
            </Link>
            <Link
              to="/app/connect"
              className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              {t("cta.join_partner")}
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

        <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("connect.shared_experience")}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {modules.map((module) => (
              <article key={module.title} className="rounded-[22px] border border-border/30 bg-background/45 p-4">
                <h2 className="font-display text-xl text-foreground">{module.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{module.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[24px] border border-border/30 bg-card/45 p-5">
            <div className="inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 text-cyan-300">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-2xl text-foreground">{t("connect.shared_first_title")}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {t("connect.shared_first_body")}
            </p>
          </article>
          <article className="rounded-[24px] border border-border/30 bg-card/45 p-5">
            <div className="inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 text-fuchsia-300">
              <MessageCircleHeart className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-2xl text-foreground">{t("connect.unsaid_thread_title")}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {t("connect.unsaid_thread_body")}
            </p>
          </article>
          <article className="rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_58%),linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,23,42,0.12))] p-5">
            <div className="inline-flex rounded-2xl border border-amber-300/35 bg-amber-500/14 p-3 text-amber-200">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-2xl text-foreground">Make this a journey for two.</h3>
            <p className="mt-2 text-sm leading-7 text-foreground/90">
              When both partners can explore, reflect, and grow together, intimacy becomes easier to protect, repair, and deepen.
            </p>
            <Link
              to="/pricing"
              className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-amber-300/35 bg-amber-500/14 px-4 py-2 text-sm text-foreground transition-all hover:border-amber-300/50 hover:bg-amber-500/20"
            >
              Open the shared path
              <Sparkles className="h-4 w-4" />
            </Link>
          </article>
        </section>
      </div>
    </div>
  );
};

export default ConnectLanding;
