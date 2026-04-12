import { useEffect, useMemo, useState } from "react";
import { Heart, MessageCircleHeart, Send, Sparkles, Star } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import DoorwayShell from "@/components/space/DoorwayShell";
import ShareCardButton from "@/components/space/ShareCardButton";

interface Props {
  coupleId?: string;
  onNavigate?: (tab: string) => void;
}

const messageStarters = [
  "Tonight I want to feel closer by…",
  "One thing I’m grateful for in us is…",
  "A kind touch I would love tonight is…",
  "Something my heart needs from you is…",
  "One small ritual I want with you this week is…",
];

const TempleMessages = ({ coupleId, onNavigate }: Props) => {
  const { user } = useAuth();
  const isPreview = !coupleId;
  const [messages, setMessages] = useState<any[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const featuredStarter = useMemo(
    () => messageStarters[new Date().getDate() % messageStarters.length],
    []
  );

  useEffect(() => {
    if (!coupleId) return;

    const loadMessages = async () => {
      const { data } = await supabase
        .from("partner_messages")
        .select("*")
        .eq("couple_id", coupleId)
        .order("created_at", { ascending: false })
        .limit(20);

      if (data) setMessages(data);
    };

    loadMessages();

    const channel = supabase
      .channel(`partner_messages_${coupleId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "partner_messages", filter: `couple_id=eq.${coupleId}` },
        () => loadMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [coupleId]);

  const sendMessage = async () => {
    if (!user || !draft.trim() || !coupleId) return;

    setSending(true);
    const { error } = await supabase.from("partner_messages").insert({
      couple_id: coupleId,
      sender_id: user.id,
      message_type: "message",
      content: draft.trim(),
    });

    if (!error) setDraft("");
    setSending(false);
  };

  return (
    <DoorwayShell
      label="Temple Messages"
      title="Send something that softens the distance"
      description="Small loving notes keep the temple alive. Keep it simple, true, and specific."
      actionLabel="Open repair mode"
      onAction={onNavigate ? () => onNavigate("repair") : undefined}
    >

      <section className="rounded-[24px] border border-border/30 bg-card/45 p-4">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Prompt for tonight</div>
        <div className="mt-2 text-sm text-foreground">{featuredStarter}</div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-border/30 bg-card/45 p-6">
          <div className="flex items-center gap-2 text-violet-300">
            <MessageCircleHeart className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.22em]">Write now</span>
          </div>
          <h3 className="mt-4 font-display text-2xl text-foreground">A note your partner can feel</h3>

          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={featuredStarter}
            rows={6}
            className="mt-5 w-full rounded-[24px] border border-border/35 bg-background/45 px-4 py-4 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/35"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setDraft(featuredStarter)}
              className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-4 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              <Sparkles className="h-4 w-4" />
              Use starter
            </button>
            <button
              type="button"
              disabled={sending || !draft.trim() || isPreview}
              onClick={sendMessage}
              className="inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {isPreview ? "Connect to send" : sending ? "Sending..." : "Send message"}
            </button>
            <ShareCardButton
              coupleId={coupleId}
              messageType="message_prompt_share"
              content={`Message starter card ✦ ${featuredStarter}`}
              label="Share starter card"
            />
          </div>
        </div>

        <div className="rounded-[28px] border border-border/30 bg-card/45 p-6">
          <div className="flex items-center gap-2 text-rose-300">
            <Heart className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.22em]">Shared notes</span>
          </div>
          <h3 className="mt-4 font-display text-2xl text-foreground">Recent messages</h3>

          <div className="mt-5 space-y-3">
            {messages.length === 0 ? (
              <div className="rounded-[22px] border border-border/30 bg-background/45 p-5 text-sm leading-6 text-muted-foreground">
                {isPreview
                  ? "Preview mode is active. Connect with your partner to send and sync messages."
                  : "No messages yet. Start with one sentence, not a perfect speech."}
              </div>
            ) : (
              messages.map((message) => {
                const mine = message.sender_id === user?.id;
                return (
                  <div
                    key={message.id}
                    className={`rounded-[22px] border p-4 ${
                      mine
                        ? "border-primary/20 bg-primary/8"
                        : "border-border/30 bg-background/45"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {mine ? "You" : "Partner"}
                      </div>
                      <div className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Star className="h-3 w-3" />
                        {new Date(message.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-foreground/90">{message.content}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </DoorwayShell>
  );
};

export default TempleMessages;
