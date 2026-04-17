import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Eye, EyeOff, Mail } from "lucide-react";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useLanguage();
  const returnTo = (location.state as { returnTo?: string } | null)?.returnTo;
  const safeReturnTo = typeof returnTo === "string" && returnTo.startsWith("/") ? returnTo : "/app";

  if (user) {
    navigate(safeReturnTo);
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error(t("auth.fill_fields"));
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate(safeReturnTo);
      } else {
        if (!fullName.trim()) {
          toast.error("Please enter your name so your partner can recognize you.");
          setLoading(false);
          return;
        }
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName.trim() },
          },
        });
        if (error) throw error;
        // Best-effort: ensure profile.display_name is set immediately
        if (data.user) {
          await supabase
            .from("profiles")
            .update({ display_name: fullName.trim() })
            .eq("id", data.user.id);
        }
        toast.success(t("auth.check_email"));
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}${safeReturnTo}`,
    });
    if (result && "error" in result && result.error) {
      toast.error(String(result.error));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <img src={shivaShaktiIcon} alt="Sacred Path" className="h-20 w-20 animate-float" />
          <h1 className="font-heading text-3xl font-semibold text-foreground sacred-glow">Sacred Path</h1>
          <p className="text-sm text-muted-foreground font-body">
            {isLogin ? t("auth.welcome_back") : t("auth.begin_journey")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              type="text"
              placeholder="Your name (so your partner sees it)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              maxLength={60}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          )}
          <Input
            type="email"
            placeholder={t("auth.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={t("auth.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <Button type="submit" className="w-full font-body" disabled={loading}>
            {loading ? t("auth.please_wait") : isLogin ? t("auth.enter_temple") : t("auth.create_account")}
          </Button>
        </form>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">{t("auth.or")}</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Button variant="outline" className="w-full font-body" onClick={handleGoogleLogin}>
          <Mail className="mr-2 h-4 w-4" />
          {t("auth.google")}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? t("auth.new_path") : t("auth.have_account")}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-medium">
            {isLogin ? t("auth.signup") : t("auth.login")}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
