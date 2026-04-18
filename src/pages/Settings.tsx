import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Settings = () => {
  const { signOut, session } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (deleting) return;

    const confirmed = window.confirm(t("settings.delete_confirm"));
    if (!confirmed) return;

    if (!session?.access_token) {
      toast.error(t("settings.delete_session_missing"));
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        throw new Error(payload?.error || t("settings.delete_failed"));
      }

      Object.keys(localStorage)
        .filter((key) => key.startsWith("sacred_path_") || key.startsWith("weather_pending_"))
        .forEach((key) => localStorage.removeItem(key));
      toast.success(t("settings.delete_success"));
      await signOut();
      navigate("/auth", { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : t("settings.delete_failed");
      toast.error(message);
    } finally {
      setDeleting(false);
    }
  };

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
            <Button variant="destructive" className="font-body" onClick={() => void handleDeleteAccount()} disabled={deleting}>
              {deleting ? t("settings.deleting_account") : t("settings.delete_account")}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            {t("settings.delete_account_note")}
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">
              {t("settings.privacy_link")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
