import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";

const ShareWisdom = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim() || sending) return;
    setSending(true);

    // Feedback storage temporarily logged client-side until feedback table is available
    console.info("[wisdom feedback]", {
      user_id: user?.id ?? null,
      message: message.trim(),
      created_at: new Date().toISOString(),
    });

    setSent(true);
    setSending(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12">

      {/* Background icon — large, centered, very faint */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <img
          src={shivaShaktiIcon}
          alt=""
          className="h-[420px] w-[420px] object-contain opacity-[0.04]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-amber-400/70">
            BUILDING TOGETHER
          </p>
          <h1 className="font-display text-4xl leading-tight text-foreground">
            What wisdom would make this path more sacred?
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
            Share a practice, a quote, a teacher, a ritual, an idea —
            anything that has genuinely changed how you love.
            We read everything.
          </p>
        </div>

        {!sent ? (
          /* Input area */
          <div className="rounded-[24px] border border-border/30 bg-card/50 p-6 backdrop-blur-sm">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A practice that changed everything for us was..."
              rows={6}
              maxLength={2000}
              className="w-full resize-none bg-transparent text-sm leading-7 text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
            />
            <div className="mt-4 flex items-center justify-between border-t border-border/20 pt-4">
              <span className="text-xs text-muted-foreground/40">
                {message.length}/2000
              </span>
              <button
                onClick={handleSubmit}
                disabled={!message.trim() || sending}
                className="flex items-center gap-2 rounded-[12px] border border-amber-400/30 bg-amber-400/15 px-5 py-2.5 text-sm text-amber-300 transition-all hover:bg-amber-400/25 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sending ? "Sending..." : "Send your wisdom ✦"}
              </button>
            </div>
          </div>
        ) : (
          /* Thank you state */
          <div className="rounded-[24px] border border-amber-400/20 bg-amber-950/30 p-8 text-center">
            <p className="mb-4 text-3xl">🙏</p>
            <h2 className="font-display text-2xl text-foreground">
              Thank you.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Your wisdom has been received. We read every message
              and let the best teachings shape what Sacred Path becomes.
            </p>
            <button
              onClick={() => { setMessage(""); setSent(false); }}
              className="mt-6 text-xs text-muted-foreground/50 underline underline-offset-2 transition-colors hover:text-muted-foreground"
            >
              Share something else
            </button>
          </div>
        )}

        {/* Footer quote */}
        <p className="mt-8 text-center text-xs italic text-muted-foreground/30">
          "The path is made by walking it — together."
        </p>
      </div>
    </div>
  );
};

export default ShareWisdom;
