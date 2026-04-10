import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Send, Heart, Flame, MessageCircle, Sparkles, Gift, Moon, Feather } from "lucide-react";

type MessageType = "gratitude" | "appreciation" | "longing" | "invitation" | "blessing" | "fantasy" | "tonight" | "whisper";

const messageTypes: { key: MessageType; icon: typeof Heart; color: string }[] = [
  { key: "gratitude", icon: Heart, color: "text-pink-400" },
  { key: "appreciation", icon: Sparkles, color: "text-primary" },
  { key: "longing", icon: Moon, color: "text-indigo-400" },
  { key: "invitation", icon: Gift, color: "text-emerald-400" },
  { key: "blessing", icon: Feather, color: "text-yellow-400" },
  { key: "whisper", icon: MessageCircle, color: "text-blue-400" },
  { key: "tonight", icon: Flame, color: "text-red-400" },
];

interface Message {
  id: string;
  sender_id: string;
  message_type: string;
  content: string;
  created_at: string;
}

interface Props {
  coupleId: string;
}

const TempleMessages = ({ coupleId }: Props) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [msgType, setMsgType] = useState<MessageType>("gratitude");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!coupleId) return;
    const load = async () => {
      const { data } = await supabase
        .from("partner_messages")
        .select("*")
        .eq("couple_id", coupleId)
        .neq("message_type", "weather")
        .order("created_at", { ascending: true })
        .limit(100);
      if (data) setMessages(data);
    };
    load();
  }, [coupleId]);

  useEffect(() => {
    if (!coupleId) return;
    const channel = supabase
      .channel("temple-messages")
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "partner_messages",
        filter: `couple_id=eq.${coupleId}`,
      }, (payload) => {
        const msg = payload.new as Message;
        if (msg.message_type !== "weather") {
          setMessages((prev) => [...prev, msg]);
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [coupleId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!coupleId || !user || !text.trim()) return;
    await supabase.from("partner_messages").insert({
      couple_id: coupleId,
      sender_id: user.id,
      message_type: msgType,
      content: text.trim(),
    });
    setText("");
  };

  const isMine = (msg: Message) => msg.sender_id === user?.id;
  const getTypeConfig = (type: string) => messageTypes.find((m) => m.key === type) || messageTypes[0];

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-16">
            <Sparkles className="h-10 w-10 text-primary/20 mx-auto mb-4" />
            <p className="text-base text-muted-foreground font-body">{t("temple_msg.empty")}</p>
            <p className="text-sm text-muted-foreground/60 font-body mt-1">{t("temple_msg.empty_hint")}</p>
          </div>
        )}
        {messages.map((msg) => {
          const config = getTypeConfig(msg.message_type);
          const Icon = config.icon;
          return (
            <div key={msg.id} className={`flex ${isMine(msg) ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                isMine(msg)
                  ? "bg-primary/10 border border-primary/20 rounded-br-sm"
                  : "bg-card border border-border/50 rounded-bl-sm"
              }`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                  <span className={`text-xs uppercase tracking-wider ${config.color} font-body`}>
                    {t(`temple_msg.type.${msg.message_type}`)}
                  </span>
                </div>
                <p className="text-base text-foreground font-body leading-relaxed">{msg.content}</p>
                <p className="text-xs text-muted-foreground/50 font-body mt-2">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-border/50 bg-card/50">
        <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1 scrollbar-hide">
          {messageTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.key}
                onClick={() => setMsgType(type.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body whitespace-nowrap transition-all border ${
                  msgType === type.key
                    ? "bg-primary/15 text-primary border-primary/30"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t(`temple_msg.type.${type.key}`)}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={t("temple_msg.placeholder")}
            className="font-body text-base bg-background border-border/50"
          />
          <button
            onClick={sendMessage}
            disabled={!text.trim()}
            className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:bg-primary/90 transition-colors shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TempleMessages;
