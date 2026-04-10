import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
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
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>("choose");
  const [coupleCode, setCoupleCode] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Check if already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("couples")
        .select("*")
        .or(`partner_a.eq.${user.id},partner_b.eq.${user.id}`)
        .maybeSingle();
      if (data?.partner_a && data?.partner_b) {
        setIsConnected(true);
      }
    };
    checkConnection();
  }, [user]);

  // Generate invite code
  const handleInvite = async () => {
    if (!user) return;
    setLoading(true);
    const code = generateCoupleCode();

    // Check if user already has a pending couple
    const { data: existing } = await supabase
      .from("couples")
      .select("*")
      .eq("partner_a", user.id)
      .is("partner_b", null)
      .maybeSingle();

    if (existing) {
      setCoupleCode(existing.couple_code);
    } else {
      const { error } = await supabase.from("couples").insert({
        partner_a: user.id,
        couple_code: code,
      });
      if (error) {
        toast.error("Failed to generate code");
        setLoading(false);
        return;
      }
      setCoupleCode(code);
    }
    setScreen("invite");
    setLoading(false);
  };

  // Listen for partner joining
  useEffect(() => {
    if (screen !== "invite" || !user) return;
    const channel = supabase
      .channel("couple-connect")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "couples",
          filter: `partner_a=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new.partner_b) {
            toast.success("Your partner has connected! 🎉");
            setIsConnected(true);
          }
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [screen, user]);

  // Enter partner's code
  const handleEnterCode = async () => {
    if (!user || !partnerCode.trim()) return;
    setLoading(true);
    const code = partnerCode.trim().toUpperCase();

    const { data, error } = await supabase
      .from("couples")
      .select("*")
      .eq("couple_code", code)
      .is("partner_b", null)
      .maybeSingle();

    if (error || !data) {
      toast.error("Invalid or expired code");
      setLoading(false);
      return;
    }

    if (data.partner_a === user.id) {
      toast.error("You can't connect with yourself!");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("couples")
      .update({ partner_b: user.id })
      .eq("id", data.id);

    if (updateError) {
      toast.error("Failed to connect");
    } else {
      toast.success("Connected with your partner! 🎉");
      setIsConnected(true);
    }
    setLoading(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(coupleCode);
    toast.success("Code copied!");
  };

  if (isConnected) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <img src={shivaShaktiIcon} alt="Connected" className="h-20 w-20 mb-6 animate-float" />
        <h2 className="font-heading text-3xl font-semibold text-foreground mb-2">You Are Connected</h2>
        <p className="text-muted-foreground font-body mb-8">Your sacred path together has begun.</p>
        <Button onClick={() => navigate("/app")} className="font-body">
          Enter the Temple <ArrowRight className="ml-2 h-4 w-4" />
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
            <h2 className="font-heading text-3xl font-semibold text-foreground">Find Your Person</h2>
            <p className="text-muted-foreground font-body">
              Connect with your beloved to share the sacred journey together
            </p>
            <div className="space-y-4 pt-4">
              <Button onClick={handleInvite} className="w-full font-body" size="lg" disabled={loading}>
                <Users className="mr-2 h-5 w-5" />
                Invite My Partner
              </Button>
              <Button
                variant="outline"
                onClick={() => setScreen("enter")}
                className="w-full font-body"
                size="lg"
              >
                I Have a Code
              </Button>
            </div>
          </>
        )}

        {screen === "invite" && (
          <>
            <h2 className="font-heading text-3xl font-semibold text-foreground">Your Invite Code</h2>
            <p className="text-muted-foreground font-body">
              Share this code with your partner to connect your paths
            </p>
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="rounded-lg border-2 border-primary bg-card px-8 py-4 font-mono text-3xl tracking-[0.3em] text-primary sacred-glow">
                {coupleCode}
              </div>
              <Button variant="outline" size="icon" onClick={copyCode}>
                <Copy className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground font-body animate-pulse-glow">
              Waiting for your partner to enter this code...
            </p>
            <Button variant="ghost" onClick={() => setScreen("choose")} className="font-body">
              Go Back
            </Button>
          </>
        )}

        {screen === "enter" && (
          <>
            <h2 className="font-heading text-3xl font-semibold text-foreground">Enter Partner's Code</h2>
            <p className="text-muted-foreground font-body">
              Enter the 6-character code your partner shared with you
            </p>
            <div className="space-y-4 pt-4">
              <Input
                value={partnerCode}
                onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                placeholder="Enter code"
                maxLength={6}
                className="text-center font-mono text-2xl tracking-[0.3em] bg-card border-border h-14"
              />
              <Button
                onClick={handleEnterCode}
                className="w-full font-body"
                size="lg"
                disabled={loading || partnerCode.length !== 6}
              >
                {loading ? "Connecting..." : "Connect"}
              </Button>
              <Button variant="ghost" onClick={() => setScreen("choose")} className="font-body">
                Go Back
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Connect;
