```tsx
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const { signOut } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-6 md:px-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl">{t("settings.title")}</h1>
          <p className="mt-2 font-body text-muted-foreground">{t("settings.subtitle")}</p>
        </div>

        <div className="rounded-3xl border border-border/30 bg-card/40 p-5 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg">{t("settings.language")}</h2>
              <p className="text-sm text-muted-foreground">{t("settings.language_desc")}</p>
            </div>
            <LanguageSwitcher />
          </div>
        </div>

        <div className="rounded-3xl border border-border/30 bg-card/40 p-5 space-y-4">
          <div>
            <h2 className="font-display text-lg">{t("settings.membership")}</h2>
            <p className="text-sm text-muted-foreground">{t("settings.membership_desc")}</p>
          </div>
          <Link to="/pricing">
            <Button className="font-body">{t("settings.view_plans")}</Button>
          </Link>
        </div>

        <div className="rounded-3xl border border-border/30 bg-card/40 p-5 space-y-4">
          <div>
            <h2 className="font-display text-lg">{t("settings.account")}</h2>
            <p className="text-sm text-muted-foreground">{t("settings.account_desc")}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="font-body" onClick={signOut}>
              {t("settings.sign_out")}
            </Button>
            <Button variant="destructive" className="font-body">
              {t("settings.delete_account")}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            {t("settings.delete_account_note")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
```