import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface ShareCardButtonProps {
  coupleId?: string;
  content: string;
  messageType?: string;
  label?: string;
  className?: string;
}

const ShareCardButton = ({
  coupleId,
  content,
  messageType = "card_share",
  label = "Share with partner",
  className,
}: ShareCardButtonProps) => {
  const { user } = useAuth();
  const [sharing, setSharing] = useState(false);

  const canShare = Boolean(coupleId && user);

  const share = async () => {
    if (!canShare || !coupleId || !user || !content.trim()) return;

    setSharing(true);
    const { error } = await supabase.from("partner_messages").insert({
      couple_id: coupleId,
      sender_id: user.id,
      message_type: messageType,
      content: content.trim(),
    });

    if (error) toast.error("Could not share right now.");
    else toast.success("Shared to your partner.");
    setSharing(false);
  };

  return (
    <button
      type="button"
      disabled={!canShare || sharing}
      onClick={share}
      className={cn(
        "inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-3 py-2 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60 disabled:opacity-60",
        className
      )}
    >
      <Send className="h-3.5 w-3.5" />
      {canShare ? (sharing ? "Sharing..." : label) : "Connect to share"}
    </button>
  );
};

export default ShareCardButton;
