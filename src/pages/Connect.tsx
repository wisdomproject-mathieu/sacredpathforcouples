import { useEffect, useMemo, useState } from "react";
import { Copy, HeartHandshake, Link as LinkIcon, MessageCircleHeart, Sparkles, Users, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Connect = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const { data: connected } = await supabase
        .from("couples")
        .select("id, invite_code, partner_b")
        .or(`partner_a.eq.${user.id},partner_b.eq.${user.id}`)
        .not("partner_b", "is", null)
        .maybeSingle();

      if (connected) {
        setIsConnected(true);
        setInviteCode(connected.invite_code ?? null);
        setLoading(false);
        return;
      }

      const { data: pending } = await supabase
        .from("couples")
        .select("id, invite_code")
        .eq("partner_a", user.id)
        .is("partner_b", null)
        .maybeSingle();

      if (pending?.invite_code) setInviteCode(pending.invite_code);
      setLoading(false);
    };

    load();
  }, [user]);

  const inviteLink = useMemo(() => {
    if (!inviteCode) return "";
    return `${window.location.origin}/app/connect?invite=${inviteCode}`;
  }, [inviteCode]);

  const generateCode = () => Math.random().toString(36).slice(2, 8).toUpperCase();

  const createInvite = async () => {
    if (!user) return;

    setStatus("idle");
    setMessage("");

    const newCode = generateCode();
    const { error } = await supabase.from("couples").insert({
      partner_a: user.id,
      invite_code: newCode,
    });

    if (error) {
      setStatus("error");
      setMessage(error.message || "Could not create invite right now.");
      return;
    }

    setInviteCode(newCode);
  };

  const joinWithCode = async () => {
    if (!user || !code.trim()) return;

    setStatus("idle");
    setMessage("");

    const cleanCode = code.trim().toUpperCase();

    const { data: target, error: fetchError } = await supabase
      .from("couples")
      .select("id, partner_a, partner_b")
      .eq("invite_code", cleanCode)
      .is("partner_b", null)
      .maybeSingle();

    if (fetchError || !target) {
      setStatus("error");
      setMessage("This invite code could not be found.");
      return;
    }

    if (target.partner_a === user.id) {
      setStatus("error");
      setMessage("This is already your invite code.");
      return;
    }

    const { error: updateError } = await supabase
      .from("couples")
      .update({ partner_b: user.id })
      .eq("id", target.id);

    if (updateError) {
      setStatus("error");
      setMessage(updateError.message || "Could not join this couple right now.");
      return;
    }

    setIsConnected(true);
    setInviteCode(cleanCode);
    setMessage("You are now connected.");
  };

  const copyInvite = async () => {
    if (!inviteCode) return;
    try {
      await navigator.clipboard.writeText(inviteLink || inviteCode);
      setStatus("copied");
      setMessage("Invite copied.");
      window.setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("error");
      setMessage("Copy failed. Please select and copy manually.");
    }
  };

  if (loading) return <div className="min-h-screen bg-background" />;

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Connect</p>
            <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Connect with Partner</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              Shared code. Shared rituals. Shared emotional state. Difficult truth. Gratitude thread. Connect once and keep your couple flow alive every day.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/app/space"
                className="inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
              >
                Enter Sacred Temple
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-4 py-2 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
              >
                Continue without account
              </Link>
            </div>
          </div>
          <div className="rounded-[22px] border border-border/30 bg-card/45 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Status</div>
            <div className="mt-2 flex items-center gap-3">
              <div className={`rounded-2xl border border-border/30 bg-background/45 p-3 ${isConnected ? "text-emerald-300" : "text-cyan-300"}`}>
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-xl text-foreground">{isConnected ? "Connected" : "Waiting to connect"}</div>
                <div className="text-sm text-muted-foreground">{isConnected ? "Your temple is shared." : "Create an invite or enter a code."}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[28px] border border-border/30 bg-card/45 p-6">
          <div className="flex items-center gap-2 text-cyan-300">
            <Wand2 className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.22em]">Your Couple Code</span>
          </div>
          <h2 className="mt-4 font-display text-2xl text-foreground">Create your shared code</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Generate a private code and send it to your partner. Once they enter it, your couple temple becomes active.
          </p>

          {!inviteCode ? (
            <button
              type="button"
              onClick={createInvite}
              className="mt-6 rounded-2xl border border-primary/25 bg-primary/12 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
            >
              Create invite code
            </button>
          ) : (
            <div className="mt-6 rounded-[24px] border border-border/30 bg-background/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Your invite code</div>
              <div className="mt-2 font-display text-3xl tracking-[0.2em] text-foreground">{inviteCode}</div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyInvite}
                  className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-4 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
                >
                  <Copy className="h-4 w-4" />
                  Copy invite
                </button>
                {inviteLink && (
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-border/30 bg-card/35 px-4 py-3 text-xs text-muted-foreground">
                    <LinkIcon className="h-4 w-4" />
                    Link ready
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-[28px] border border-border/30 bg-card/45 p-6">
          <div className="flex items-center gap-2 text-fuchsia-300">
            <Users className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.22em]">Join Partner</span>
          </div>
          <h2 className="mt-4 font-display text-2xl text-foreground">Enter your partner’s invite</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Paste the code you received and step into the same shared space.
          </p>

          <div className="mt-6 rounded-[24px] border border-border/30 bg-background/45 p-4">
            <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Invite code</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              className="mt-3 w-full rounded-2xl border border-border/35 bg-card/45 px-4 py-3 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/35"
            />
            <button
              type="button"
              onClick={joinWithCode}
              className="mt-4 rounded-2xl border border-primary/25 bg-primary/12 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
            >
              Join the temple
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            icon: Sparkles,
            iconClass: "text-cyan-300",
            title: "Intimacy Weather",
            desc: "Name your emotional state first so touch, words, and pace match the reality of tonight.",
          },
          {
            icon: MessageCircleHeart,
            iconClass: "text-violet-300",
            title: "The Unsaid",
            desc: "Write what feels difficult before it hardens into distance, then share with care.",
          },
          {
            icon: Users,
            iconClass: "text-emerald-300",
            title: "The Thread",
            desc: "Leave one gratitude line each day and let tenderness accumulate over time.",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-[26px] border border-border/30 bg-card/45 p-5">
              <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${item.iconClass}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
            </div>
          );
        })}
      </section>

      {message && (
        <div className={`rounded-[22px] border p-4 text-sm ${status === "error" ? "border-red-400/25 bg-red-500/8 text-red-200" : "border-emerald-400/20 bg-emerald-500/8 text-emerald-200"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Connect;
