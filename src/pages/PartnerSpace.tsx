import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Heart, Flame, MessageCircle, Sparkles } from "lucide-react";

type MessageType = "whisper" | "teaser" | "thread" | "ritual_invite";

const messageTypeConfig: Record<MessageType, { icon: typeof Heart; label: string; color: string }> = {
  whisper: { icon: MessageCircle, label: "space.whisper", color: "text-blue-400" },
  teaser: { icon: Flame, label: "space.teaser", color: "text-orange-400" },
  thread: { icon: Heart, label: "space.thread", color: "text-pink-400" },
  ritual_invite: { icon: Sparkles, label: "space.ritual_invite", color: "text-primary" },
};

const teaserPrompts = [
  "space.teaser_1", "space.teaser_2", "space.teaser_3",
  "space.teaser_4", "space.teaser_5", "space.teaser_6",
];

interface Message {
  id: string;
  sender_id: string;
  message_type: string;
  content: string;
  created_at: string;
}

const PartnerSpace = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [msgType, setMsgType] = useState<MessageType>("whisper");
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const loadCouple = async () => {
      const { data } = await supabase
        .from("couples")
        .select("*")
        .or(`partner_a.eq.${user.id},partner_b.eq.${user.id}`)
        .not("partner_b", "is", null)
        .maybeSingle();
      if (data) {
        setCoupleId(data.id);
        const { data: msgs } = await supabase
          .from("partner_messages")
          .select("*")
          .eq("couple_id", data.id)
          .order("created_at", { ascending: true })
          .limit(100);
        if (msgs) setMessages(msgs);
      }
      setLoading(false);
    };
    loadCouple();
  }, [user]);

  useEffect(() => {
    if (!coupleId) return;
    const channel = supabase
      .channel("partner-messages")
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "partner_messages",
        filter: `couple_id=eq.${coupleId}`,
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Message]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [coupleId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content?: string) => {
    if (!coupleId || !user) return;
    const finalContent = content || text.trim();
    if (!finalContent) return;
    await supabase.from("partner_messages").insert({
      couple_id: coupleId,
      sender_id: user.id,
      message_type: msgType,
      content: finalContent,
    });
    setText("");
  };

  const sendTeaser = () => {
    const prompt = teaserPrompts[Math.floor(Math.random() * teaserPrompts.length)];
    setMsgType("teaser");
    sendMessage(t(prompt));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!coupleId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <Heart className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <h2 className="font-heading text-2xl text-foreground mb-2">{t("space.not_connected")}</h2>
        <p className="text-muted-foreground font-body text-sm">{t("space.connect_first")}</p>
      </div>
    );
  }

  const isMine = (msg: Message) => msg.sender_id === user?.id;

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/50 bg-card/50">
        <h2 className="font-heading text-xl font-semibold text-foreground">{t("space.title")}</h2>
        <p className="text-xs text-muted-foreground font-body">{t("space.subtitle")}</p>
      </div>

      {/* Quick actions */}
      <div className="px-4 py-2 border-b border-border/30 flex gap-2 overflow-x-auto">
        <Button variant="outline" size="sm" className="font-body text-xs gap-1.5 shrink-0" onClick={sendTeaser}>
          <Flame className="h-3.5 w-3.5 text-orange-400" /> {t("space.send_teaser")}
        </Button>
        <Button variant="outline" size="sm" className="font-body text-xs gap-1.5 shrink-0"
          onClick={() => { setMsgType("ritual_invite"); sendMessage(t("space.ritual_invite_msg")); }}>
          <Sparkles className="h-3.5 w-3.5 text-primary" /> {t("space.invite_ritual")}
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="h-8 w-8 text-primary/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground font-body">{t("space.empty")}</p>
          </div>
        )}
        {messages.map((msg) => {
          const config = messageTypeConfig[msg.message_type as MessageType] || messageTypeConfig.whisper;
          const Icon = config.icon;
          return (
            <div key={msg.id} className={`flex ${isMine(msg) ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                isMine(msg)
                  ? "bg-primary/15 border border-primary/20 rounded-br-sm"
                  : "bg-card border border-border/50 rounded-bl-sm"
              }`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className={`h-3 w-3 ${config.color}`} />
                  <span className={`text-[10px] uppercase tracking-wider ${config.color} font-body`}>
                    {t(config.label)}
                  </span>
                </div>
                <p className="text-sm text-foreground font-body leading-relaxed">{msg.content}</p>
                <p className="text-[10px] text-muted-foreground/50 font-body mt-1">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border/50 bg-card/50">
        {/* Type selector */}
        <div className="flex gap-1 mb-2">
          {(Object.keys(messageTypeConfig) as MessageType[]).map((type) => {
            const config = messageTypeConfig[type];
            const Icon = config.icon;
            return (
              <button
                key={type}
                onClick={() => setMsgType(type)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-body uppercase tracking-wider transition-all ${
                  msgType === type
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3 w-3" />
                {t(config.label)}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={t("space.placeholder")}
            className="font-body text-sm bg-background border-border/50"
          />
          <Button size="icon" onClick={() => sendMessage()} disabled={!text.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PartnerSpace;
