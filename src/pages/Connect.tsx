import { useCallback, useEffect, useMemo, useState } from "react";
import { Copy, HeartHandshake, Link as LinkIcon, MessageCircleHeart, Sparkles, Users, Wand2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { fetchCoupleStateForUser, markEverConnected, storeConnectedCoupleId, markForceDisconnected, clearForceDisconnected } from "@/lib/couples";

const connectCopy: Record<Language, Record<string, string>> = {
  en: {
    badge: "Connect",
    title: "Connect with Partner",
    subtitle: "Shared code. Shared rituals. Shared emotional state. Difficult truth. Gratitude thread. Connect once and keep your couple flow alive every day.",
    enterTemple: "Enter Sacred Temple",
    continueSolo: "Continue without account",
    status: "Status",
    connected: "Connected",
    waiting: "Waiting to connect",
    connectedSub: "Your temple is shared.",
    waitingSub: "Create an invite or enter a code.",
    yourCoupleCode: "Your Couple Code",
    createSharedCode: "Create your shared code",
    createSharedCodeDesc: "Generate a private code and send it to your partner. Once they enter it, your couple temple becomes active.",
    createInvite: "Create invite code",
    yourInviteCode: "Your invite code",
    copyInvite: "Copy invite",
    linkReady: "Link ready",
    joinPartner: "Join Partner",
    enterPartnerInvite: "Enter your partner’s invite",
    enterPartnerInviteDesc: "Paste the code you received and step into the same shared space.",
    inviteCode: "Invite code",
    joinTemple: "Join the temple",
    weather: "Intimacy Weather",
    weatherDesc: "Name your emotional state first so touch, words, and pace match the reality of tonight.",
    unsaid: "The Unsaid",
    unsaidDesc: "Write what feels difficult before it hardens into distance, then share with care.",
    thread: "The Thread",
    threadDesc: "Leave one gratitude line each day and let tenderness accumulate over time.",
    errCreateInvite: "Could not create invite right now.",
    errCodeNotFound: "This invite code could not be found.",
    errOwnCode: "This is already your invite code.",
    errJoin: "Could not join this couple right now.",
    okConnected: "You are now connected.",
    okCopied: "Invite copied.",
    errCopy: "Copy failed. Please select and copy manually.",
  },
  fr: {
    badge: "Connexion",
    title: "Se connecter au partenaire",
    subtitle: "Code partagé. Rituels partagés. État émotionnel partagé. Vérité difficile. Fil de gratitude. Connectez-vous une fois et gardez le flow du couple vivant chaque jour.",
    enterTemple: "Entrer dans le temple sacré",
    continueSolo: "Continuer sans compte",
    status: "Statut",
    connected: "Connecté",
    waiting: "En attente de connexion",
    connectedSub: "Votre temple est partagé.",
    waitingSub: "Créez une invitation ou entrez un code.",
    yourCoupleCode: "Votre code de couple",
    createSharedCode: "Créer votre code partagé",
    createSharedCodeDesc: "Générez un code privé et envoyez-le à votre partenaire. Une fois saisi, votre temple de couple s'active.",
    createInvite: "Créer un code d'invitation",
    yourInviteCode: "Votre code d'invitation",
    copyInvite: "Copier l'invitation",
    linkReady: "Lien prêt",
    joinPartner: "Rejoindre le partenaire",
    enterPartnerInvite: "Entrer l'invitation du partenaire",
    enterPartnerInviteDesc: "Collez le code reçu et entrez dans le même espace partagé.",
    inviteCode: "Code d'invitation",
    joinTemple: "Rejoindre le temple",
    weather: "Météo d'intimité",
    weatherDesc: "Nommez d'abord votre état émotionnel pour que le toucher, les mots et le rythme correspondent à la réalité de ce soir.",
    unsaid: "Le non-dit",
    unsaidDesc: "Écrivez ce qui est difficile avant que cela ne devienne distance, puis partagez avec soin.",
    thread: "Le fil",
    threadDesc: "Laissez une ligne de gratitude chaque jour et laissez la tendresse s'accumuler.",
    errCreateInvite: "Impossible de créer l'invitation pour le moment.",
    errCodeNotFound: "Ce code d'invitation est introuvable.",
    errOwnCode: "C'est déjà votre code d'invitation.",
    errJoin: "Impossible de rejoindre ce couple pour le moment.",
    okConnected: "Vous êtes maintenant connectés.",
    okCopied: "Invitation copiée.",
    errCopy: "Échec de la copie. Veuillez copier manuellement.",
  },
  cs: {
    badge: "Propojení",
    title: "Propojit s partnerem",
    subtitle: "Sdílený kód. Sdílené rituály. Sdílený emoční stav. Těžká pravda. Nit vděčnosti. Propojte se jednou a udržujte párový flow živý každý den.",
    enterTemple: "Vstoupit do posvátného chrámu",
    continueSolo: "Pokračovat bez účtu",
    status: "Stav",
    connected: "Propojeno",
    waiting: "Čeká na propojení",
    connectedSub: "Váš chrám je sdílený.",
    waitingSub: "Vytvořte pozvánku nebo zadejte kód.",
    yourCoupleCode: "Váš párový kód",
    createSharedCode: "Vytvořit váš sdílený kód",
    createSharedCodeDesc: "Vygenerujte soukromý kód a pošlete ho partnerovi. Jakmile ho zadá, váš párový chrám se aktivuje.",
    createInvite: "Vytvořit zvací kód",
    yourInviteCode: "Váš zvací kód",
    copyInvite: "Zkopírovat pozvánku",
    linkReady: "Odkaz připraven",
    joinPartner: "Připojit partnera",
    enterPartnerInvite: "Zadejte partnerovu pozvánku",
    enterPartnerInviteDesc: "Vložte přijatý kód a vstupte do stejného sdíleného prostoru.",
    inviteCode: "Zvací kód",
    joinTemple: "Připojit se do chrámu",
    weather: "Počasí intimity",
    weatherDesc: "Nejprve pojmenujte svůj emoční stav, aby dotek, slova i tempo odpovídaly dnešní realitě.",
    unsaid: "Nevyřčené",
    unsaidDesc: "Napište to, co je těžké, než to ztvrdne v odstup, a pak to sdílejte s péčí.",
    thread: "Nit",
    threadDesc: "Zanechte každý den jednu větu vděčnosti a nechte něhu postupně narůstat.",
    errCreateInvite: "Pozvánku se teď nepodařilo vytvořit.",
    errCodeNotFound: "Tento zvací kód nebyl nalezen.",
    errOwnCode: "Tohle je už váš zvací kód.",
    errJoin: "K tomuto páru se teď nelze připojit.",
    okConnected: "Teď jste propojeni.",
    okCopied: "Pozvánka zkopírována.",
    errCopy: "Kopírování selhalo. Zkopírujte prosím ručně.",
  },
};

const Connect = () => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const copy = connectCopy[lang];
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [justConnected, setJustConnected] = useState(false);
  const [myDisplayName, setMyDisplayName] = useState("");
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);

  const disconnectPartner = async () => {
    if (!user) return;

    // Set force-disconnect flag FIRST so any subsequent fetchCoupleState calls return disconnected
    markForceDisconnected(user.id);

    // Attempt DB cleanup in background (may fail silently due to RLS)
    supabase.from("couples").update({ partner_b: null }).eq("partner_b", user.id);
    supabase.from("couples").update({ couple_code: `DEAD_${user.id.slice(0, 8)}` }).eq("partner_a", user.id);

    // Clear all local state
    localStorage.removeItem(`sacred_path_ever_connected_${user.id}`);
    localStorage.removeItem(`sacred_path_connected_couple_id_${user.id}`);
    setIsConnected(false);
    setInviteCode(null);
    setShowDisconnectConfirm(false);
  };

  const loadCoupleState = useCallback(async () => {
    if (!user) {
      setIsConnected(false);
      setInviteCode(null);
      setLoading(false);
      return;
    }

    const resolved = await fetchCoupleStateForUser(supabase, user.id);
    if (resolved.connected && resolved.activeCouple?.id) {
      markEverConnected(user.id);
      storeConnectedCoupleId(user.id, resolved.activeCouple.id);
    }

    setIsConnected(resolved.connected);
    if (resolved.connected) {
      clearForceDisconnected(user.id);
      setInviteCode(resolved.activeCouple?.couple_code ?? null);
    } else {
      setInviteCode(resolved.pendingInvite?.couple_code ?? null);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    void loadCoupleState();
  }, [loadCoupleState]);

  useEffect(() => {
    const inviteFromUrl = searchParams.get("invite");
    if (!inviteFromUrl) return;
    setCode((current) => current || inviteFromUrl.trim().toUpperCase());
  }, [searchParams]);

  useEffect(() => {
    if (!user) return;

    const refresh = () => {
      void loadCoupleState();
    };

    const channelAsPartnerA = supabase
      .channel(`couples_partner_a_${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "couples", filter: `partner_a=eq.${user.id}` },
        refresh,
      )
      .subscribe();

    const channelAsPartnerB = supabase
      .channel(`couples_partner_b_${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "couples", filter: `partner_b=eq.${user.id}` },
        refresh,
      )
      .subscribe();

    window.addEventListener("focus", refresh);

    return () => {
      window.removeEventListener("focus", refresh);
      supabase.removeChannel(channelAsPartnerA);
      supabase.removeChannel(channelAsPartnerB);
    };
  }, [loadCoupleState, user]);

  const inviteLink = useMemo(() => {
    if (!inviteCode) return "";
    return `${window.location.origin}/app/connect?invite=${inviteCode}`;
  }, [inviteCode]);

  const generateCode = () => Math.random().toString(36).slice(2, 8).toUpperCase();

  const createInvite = async () => {
    if (!user) return;

    setStatus("idle");
    setMessage("");

    const existingState = await fetchCoupleStateForUser(supabase, user.id);
    const existingPending = existingState.pendingInvite;
    if (existingPending?.couple_code) {
      setInviteCode(existingPending.couple_code);
      setMessage(copy.linkReady);
      return;
    }

    // Retry up to 3 times in case of duplicate code collision
    let lastError: string | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      const newCode = generateCode();
      const { error } = await supabase.from("couples").insert({
        partner_a: user.id,
        couple_code: newCode,
      });
      if (!error) {
        await loadCoupleState();
        return;
      }
      lastError = error.message;
      // Only retry on unique constraint violations
      if (!error.message?.includes("unique") && !error.code?.includes("23505")) break;
    }

    setStatus("error");
    setMessage(lastError || copy.errCreateInvite);
  };

  const joinWithCode = async () => {
    if (!user || !code.trim()) return;

    setStatus("idle");
    setMessage("");

    const cleanCode = code.trim().toUpperCase();

    // Step 1: Look up the pending invite.
    // Requires the "Authenticated users can view pending invites" RLS policy
    // (partner_b IS NULL AND auth.uid() IS NOT NULL) — see migration 20260416140000.
    const { data: target, error: fetchError } = await supabase
      .from("couples")
      .select("id, partner_a, partner_b")
      .eq("couple_code", cleanCode)
      .is("partner_b", null)
      .maybeSingle();

    if (fetchError) {
      setStatus("error");
      setMessage(fetchError.message || copy.errCodeNotFound);
      return;
    }

    if (!target) {
      setStatus("error");
      setMessage(copy.errCodeNotFound);
      return;
    }

    if (target.partner_a === user.id) {
      setStatus("error");
      setMessage(copy.errOwnCode);
      return;
    }

    // Step 2: Update display name if provided
    if (myDisplayName.trim()) {
      await supabase
        .from("profiles")
        .update({ display_name: myDisplayName.trim() })
        .eq("user_id", user.id);
    }

    // Step 3: Claim the open partner_b slot.
    // Requires the "Authenticated users can join open couples" RLS policy
    // USING (partner_b IS NULL) WITH CHECK (auth.uid() = partner_b).
    const { data: updatedRows, error: updateError } = await supabase
      .from("couples")
      .update({ partner_b: user.id })
      .eq("id", target.id)
      .is("partner_b", null)
      .select("id, partner_b");

    if (updateError) {
      setStatus("error");
      setMessage(updateError.message || copy.errJoin);
      return;
    }

    // Guard: if RLS silently blocked the update, updatedRows will be empty
    const joined = (updatedRows ?? []).find((r) => r.partner_b === user.id);
    if (!joined) {
      setStatus("error");
      setMessage(copy.errJoin);
      return;
    }

    clearForceDisconnected(user.id);
    await loadCoupleState();
    setCode("");
    setMessage(copy.okConnected);
    setJustConnected(true);
  };

  const copyInvite = async () => {
    if (!inviteCode) return;
    try {
      await navigator.clipboard.writeText(inviteLink || inviteCode);
      setStatus("copied");
      setMessage(copy.okCopied);
      window.setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("error");
      setMessage(copy.errCopy);
    }
  };

  if (loading) return <div className="min-h-screen bg-background" />;

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">{copy.badge}</p>
            <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">{copy.title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              {copy.subtitle}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/app/space"
                className="inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
              >
                {copy.enterTemple}
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-4 py-2 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
              >
                {copy.continueSolo}
              </Link>
            </div>
          </div>
          <div className="rounded-[22px] border border-border/30 bg-card/45 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{copy.status}</div>
            <div className="mt-2 flex items-center gap-3">
              <div className={`rounded-2xl border border-border/30 bg-background/45 p-3 ${isConnected ? "text-emerald-300" : "text-cyan-300"}`}>
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-xl text-foreground">{isConnected ? copy.connected : copy.waiting}</div>
                <div className="text-sm text-muted-foreground">{isConnected ? copy.connectedSub : copy.waitingSub}</div>
              </div>
            </div>
            {isConnected && (
              <div className="mt-4 border-t border-border/20 pt-4">
                {!showDisconnectConfirm ? (
                  <button
                    onClick={() => setShowDisconnectConfirm(true)}
                    className="text-xs text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors underline underline-offset-2"
                  >
                    Disconnect from partner
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      Are you sure?
                    </span>
                    <button
                      onClick={disconnectPartner}
                      className="text-xs text-red-400/70 hover:text-red-400 transition-colors"
                    >
                      Yes, disconnect
                    </button>
                    <button
                      onClick={() => setShowDisconnectConfirm(false)}
                      className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[28px] border border-border/30 bg-card/45 p-6">
          <div className="flex items-center gap-2 text-cyan-300">
            <Wand2 className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.22em]">{copy.yourCoupleCode}</span>
          </div>
          <h2 className="mt-4 font-display text-2xl text-foreground">{copy.createSharedCode}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {copy.createSharedCodeDesc}
          </p>

          {!inviteCode ? (
            <button
              type="button"
              onClick={createInvite}
              className="mt-6 rounded-2xl border border-primary/25 bg-primary/12 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
            >
              {copy.createInvite}
            </button>
          ) : (
            <div className="mt-6 rounded-[24px] border border-border/30 bg-background/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{copy.yourInviteCode}</div>
              <div className="mt-2 font-display text-3xl tracking-[0.2em] text-foreground">{inviteCode}</div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyInvite}
                  className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-4 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
                >
                  <Copy className="h-4 w-4" />
                  {status === "copied" ? "Copied!" : copy.copyInvite}
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent("I want us to try Sacred Path together 🌿 Use my code to connect: " + inviteCode)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-green-500/30 bg-green-950/20 px-4 py-3 text-sm text-green-300 transition-all hover:border-green-500/50"
                >
                  <span>💬</span> WhatsApp
                </a>
                <a
                  href={`sms:?body=${encodeURIComponent("I want us to try Sacred Path together 🌿 Use my code: " + inviteCode)}`}
                  className="inline-flex items-center gap-2 rounded-2xl border border-blue-500/30 bg-blue-950/20 px-4 py-3 text-sm text-blue-300 transition-all hover:border-blue-500/50"
                >
                  <span>✉️</span> Message
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-[28px] border border-border/30 bg-card/45 p-6">
          <div className="flex items-center gap-2 text-fuchsia-300">
            <Users className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.22em]">{copy.joinPartner}</span>
          </div>
          <h2 className="mt-4 font-display text-2xl text-foreground">{copy.enterPartnerInvite}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {copy.enterPartnerInviteDesc}
          </p>

          <div className="mt-6 rounded-[24px] border border-border/30 bg-background/45 p-4">
            <div className="mb-4">
              <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Your name (so your partner can see it)
              </label>
              <input
                type="text"
                value={myDisplayName}
                onChange={(e) => setMyDisplayName(e.target.value)}
                placeholder="Enter your name"
                className="mt-2 w-full rounded-[16px] border border-border/30 bg-background/45 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-border"
                maxLength={40}
              />
            </div>
            <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{copy.inviteCode}</label>
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
              {copy.joinTemple}
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-amber-300/25 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.14),transparent_60%),linear-gradient(135deg,rgba(245,158,11,0.10),rgba(15,23,42,0.06))] p-6 shadow-[0_20px_60px_-42px_rgba(255,173,70,0.45)]">
        <p className="text-xs uppercase tracking-[0.28em] text-amber-300">Sacred Temple</p>
        <h3 className="mt-3 font-display text-3xl text-foreground md:text-4xl">Your daily practice, together.</h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          The Temple is where your relationship becomes a living practice. Each day you arrive together — or return alone — and let one small act of presence open what words cannot. Weather, ritual, body, message, pathway, memory: six doorways into the same sacred ground.
        </p>

        <blockquote className="mt-5 border-l-2 border-amber-400/50 pl-4">
          <p className="text-sm leading-7 text-muted-foreground italic">
            "The body is the doorway. When two people slow down and arrive in their bodies together, everything changes. Presence is the practice."
          </p>
          <footer className="mt-2 text-xs uppercase tracking-[0.18em] text-amber-300/80">Diana Richardson</footer>
        </blockquote>

        <ul className="mt-5 space-y-2">
          {[
            "Read the emotional climate before choosing any practice",
            "Open guided rituals for softness, longing, devotion, or repair",
            "Let the body lead when words have run dry",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="mt-0.5 text-amber-400">✦</span>
              <span className="leading-6">{line}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/app/space"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-amber-400/30 bg-amber-400/12 px-5 py-3 text-sm text-foreground transition-all hover:border-amber-400/50 hover:bg-amber-400/18"
        >
          Enter the Temple →
        </Link>
      </section>

      {justConnected && (
        <section className="rounded-[28px] border border-emerald-400/25 bg-emerald-950/30 p-6 text-center">
          <p className="text-2xl mb-3">🌿</p>
          <h3 className="font-display text-2xl text-foreground">{copy.okConnected}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your sacred space is now shared. Enter the Temple to begin tonight's practice together.
          </p>
          <Link
            to="/app/space"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-emerald-400/35 bg-emerald-500/14 px-6 py-3 text-sm text-foreground transition-all hover:border-emerald-400/55 hover:bg-emerald-500/20"
          >
            Enter the Temple →
          </Link>
        </section>
      )}

      {message && !justConnected && (
        <div className={`rounded-[22px] border p-4 text-sm ${status === "error" ? "border-red-400/25 bg-red-500/8 text-red-200" : "border-emerald-400/20 bg-emerald-500/8 text-emerald-200"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Connect;
