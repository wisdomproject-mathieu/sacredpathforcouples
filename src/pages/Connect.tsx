import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Copy, Users, ArrowRight } from "lucide-react";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import { useNavigate } from "react-router-dom";

const generateCoupleCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
};

type Screen = "choose" | "invite" | "enter";

const Connect = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>("choose");
  const [coupleCode, setCoupleCode] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("couples")
        .select("*")
        .or(`partner_a.eq.${user.id},partner_b.eq.${user.id}`)
        .maybeSingle();
      if (data?.partner_a && data?.partner_b) setIsConnected(true);
    };
    checkConnection();
  }, [user]);

  const handleInvite = async () => {
    if (!user) return;
    setLoading(true);
    const code = generateCoupleCode();
    const { data: existing } = await supabase
      .from("couples").select("*").eq("partner_a", user.id).is("partner_b", null).maybeSingle();
    if (existing) {
      setCoupleCode(existing.couple_code);
    } else {
      const { error } = await supabase.from("couples").insert({ partner_a: user.id, couple_code: code });
      if (error) { toast.error(t("connect.failed_generate")); setLoading(false); return; }
      setCoupleCode(code);
    }
    setScreen("invite");
    setLoading(false);
  };

  useEffect(() => {
    if (screen !== "invite" || !user) return;
    const channel = supabase
      .channel("couple-connect")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "couples", filter: `partner_a=eq.${user.id}` },
        (payload) => { if (payload.new.partner_b) { toast.success(t("connect.partner_connected")); setIsConnected(true); } }
      ).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [screen, user, t]);

  const handleEnterCode = async () => {
    if (!user || !partnerCode.trim()) return;
    setLoading(true);
    const code = partnerCode.trim().toUpperCase();
    const { data, error } = await supabase
      .from("couples").select("*").eq("couple_code", code).is("partner_b", null).maybeSingle();
    if (error || !data) { toast.error(t("connect.invalid_code")); setLoading(false); return; }
    if (data.partner_a === user.id) { toast.error(t("connect.cant_self")); setLoading(false); return; }
    const { error: updateError } = await supabase.from("couples").update({ partner_b: user.id }).eq("id", data.id);
    if (updateError) { toast.error(t("connect.failed_connect")); }
    else { toast.success(t("connect.partner_connected")); setIsConnected(true); }
    setLoading(false);
  };

  const copyCode = () => { navigator.clipboard.writeText(coupleCode); toast.success(t("connect.code_copied")); };

  if (isConnected) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <img src={shivaShaktiIcon} alt="Connected" className="h-20 w-20 mb-6 animate-float" />
        <h2 className="font-heading text-3xl font-semibold text-foreground mb-2">{t("connect.connected_title")}</h2>
        <p className="text-muted-foreground font-body mb-8">{t("connect.connected_desc")}</p>
        <Button onClick={() => navigate("/app/temple")} className="font-body">
          {t("connect.enter_temple")} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <img src={shivaShaktiIcon} alt="Sacred Path" className="mx-auto h-16 w-16 animate-float" />
        {screen === "choose" && (
          <>
            <h2 className="font-heading text-3xl font-semibold text-foreground">{t("connect.find_person")}</h2>
            <p className="text-muted-foreground font-body">{t("connect.find_desc")}</p>
            <div className="space-y-4 pt-4">
              <Button onClick={handleInvite} className="w-full font-body" size="lg" disabled={loading}>
                <Users className="mr-2 h-5 w-5" /> {t("connect.invite")}
              </Button>
              <Button variant="outline" onClick={() => setScreen("enter")} className="w-full font-body" size="lg">
                {t("connect.have_code")}
              </Button>
            </div>
          </>
        )}
        {screen === "invite" && (
          <>
            <h2 className="font-heading text-3xl font-semibold text-foreground">{t("connect.your_code")}</h2>
            <p className="text-muted-foreground font-body">{t("connect.share_code")}</p>
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="rounded-lg border-2 border-primary bg-card px-8 py-4 font-mono text-3xl tracking-[0.3em] text-primary sacred-glow">{coupleCode}</div>
              <Button variant="outline" size="icon" onClick={copyCode}><Copy className="h-5 w-5" /></Button>
            </div>
            <p className="text-xs text-muted-foreground font-body animate-pulse-glow">{t("connect.waiting")}</p>
            <Button variant="ghost" onClick={() => setScreen("choose")} className="font-body">{t("connect.go_back")}</Button>
          </>
        )}
        {screen === "enter" && (
          <>
            <h2 className="font-heading text-3xl font-semibold text-foreground">{t("connect.enter_code")}</h2>
            <p className="text-muted-foreground font-body">{t("connect.enter_code_desc")}</p>
            <div className="space-y-4 pt-4">
              <Input value={partnerCode} onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                placeholder={t("connect.enter_placeholder")} maxLength={6}
                className="text-center font-mono text-2xl tracking-[0.3em] bg-card border-border h-14" />
              <Button onClick={handleEnterCode} className="w-full font-body" size="lg" disabled={loading || partnerCode.length !== 6}>
                {loading ? t("connect.connecting") : t("connect.connect_btn")}
              </Button>
              <Button variant="ghost" onClick={() => setScreen("choose")} className="font-body">{t("connect.go_back")}</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Connect;
