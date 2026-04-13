import { useEffect, useMemo, useState } from "react";
import { Heart, MessageCircleHeart, Send, Sparkles, Star } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import DoorwayShell from "@/components/space/DoorwayShell";
import ShareCardButton from "@/components/space/ShareCardButton";

interface Props {
  coupleId?: string;
  onNavigate?: (tab: string) => void;
}

const messageStartersByLanguage: Record<Language, string[]> = {
  en: [
    "Tonight I long to feel you through…",
    "One thing I cherish in us right now is…",
    "A touch I crave from you tonight is…",
    "What my heart quietly needs from you is…",
    "One sacred ritual I want us to share this week is…",
  ],
  fr: [
    "Ce soir, j'ai envie de te sentir à travers…",
    "Une chose que je chéris en nous maintenant, c'est…",
    "Un toucher que je désire de toi ce soir est…",
    "Ce dont mon cœur a besoin en silence de ta part est…",
    "Un rituel sacré que je veux partager avec toi cette semaine est…",
  ],
  cs: [
    "Dnes večer tě chci cítit skrze…",
    "Jedna věc, které si na nás teď vážím, je…",
    "Dotek, po kterém dnes večer toužím, je…",
    "Co moje srdce potichu potřebuje od tebe, je…",
    "Jeden posvátný rituál, který chci tento týden sdílet, je…",
  ],
};

const messagesCopyByLanguage: Record<Language, Record<string, string>> = {
  en: {
    shellLabel: "Sacred Messages",
    shellTitle: "Whisper what your beloved can truly feel",
    shellDescription: "One honest line can melt distance faster than a long explanation. Keep it true, warm, and embodied.",
    shellActionLabel: "Enter repair",
    whisperPrompt: "Tonight's whisper prompt",
    writeNow: "Write now",
    noteTitle: "A note your beloved can feel",
    useWhisper: "Use whisper",
    connectToSend: "Connect to send",
    sending: "Sending...",
    sendWhisper: "Send whisper",
    sharePrompt: "Offer this prompt",
    sharedThread: "Shared thread",
    recentOfferings: "Recent offerings",
    previewEmpty: "Sacred Temple preview is active. Connect with your beloved to exchange whispers in real time.",
    connectedEmpty: "No offerings yet. Begin with one sincere sentence, not a perfect speech.",
    you: "You",
    beloved: "Beloved",
  },
  fr: {
    shellLabel: "Messages sacrés",
    shellTitle: "Murmurez ce que votre partenaire peut vraiment ressentir",
    shellDescription: "Une ligne honnête peut faire fondre la distance plus vite qu'une longue explication. Gardez-la vraie, chaleureuse et incarnée.",
    shellActionLabel: "Entrer dans la réparation",
    whisperPrompt: "Prompt de murmure ce soir",
    writeNow: "Écrire maintenant",
    noteTitle: "Une note que votre partenaire peut ressentir",
    useWhisper: "Utiliser le murmure",
    connectToSend: "Connectez-vous pour envoyer",
    sending: "Envoi...",
    sendWhisper: "Envoyer le murmure",
    sharePrompt: "Partager ce prompt",
    sharedThread: "Fil partagé",
    recentOfferings: "Offrandes récentes",
    previewEmpty: "Le mode aperçu du Temple sacré est actif. Connectez-vous avec votre partenaire pour échanger des murmures en temps réel.",
    connectedEmpty: "Pas encore d'offrande. Commencez par une phrase sincère, pas un discours parfait.",
    you: "Vous",
    beloved: "Partenaire",
  },
  cs: {
    shellLabel: "Posvátné zprávy",
    shellTitle: "Pošlete vzkaz, který partner opravdu ucítí",
    shellDescription: "Jedna upřímná věta umí rozpustit odstup rychleji než dlouhé vysvětlení. Udržte ji pravdivou, laskavou a živou.",
    shellActionLabel: "Vstoupit do opravy",
    whisperPrompt: "Dnešní prompt pro vzkaz",
    writeNow: "Piš teď",
    noteTitle: "Vzkaz, který tvůj partner ucítí",
    useWhisper: "Použít prompt",
    connectToSend: "Pro odeslání se propojte",
    sending: "Odesílám...",
    sendWhisper: "Poslat vzkaz",
    sharePrompt: "Sdílet tento prompt",
    sharedThread: "Sdílené vlákno",
    recentOfferings: "Nedávná sdílení",
    previewEmpty: "Je aktivní náhled Posvátného chrámu. Propojte se s partnerem a posílejte si vzkazy v reálném čase.",
    connectedEmpty: "Zatím žádné sdílení. Začněte jednou upřímnou větou, ne dokonalým projevem.",
    you: "Ty",
    beloved: "Partner",
  },
};

const TempleMessages = ({ coupleId, onNavigate }: Props) => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const copy = messagesCopyByLanguage[lang];
  const isPreview = !coupleId;
  const [messages, setMessages] = useState<any[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const messageStarters = messageStartersByLanguage[lang];
  const featuredStarter = useMemo(
    () => messageStarters[new Date().getDate() % messageStarters.length],
    [messageStarters]
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
      label={copy.shellLabel}
      title={copy.shellTitle}
      description={copy.shellDescription}
      actionLabel={copy.shellActionLabel}
      onAction={onNavigate ? () => onNavigate("repair") : undefined}
    >

      <section className="rounded-[24px] border border-border/30 bg-card/45 p-4">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{copy.whisperPrompt}</div>
        <div className="mt-2 text-sm text-foreground">{featuredStarter}</div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-border/30 bg-card/45 p-6">
          <div className="flex items-center gap-2 text-violet-300">
            <MessageCircleHeart className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.22em]">{copy.writeNow}</span>
          </div>
          <h3 className="mt-4 font-display text-2xl text-foreground">{copy.noteTitle}</h3>

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
              {copy.useWhisper}
            </button>
            <button
              type="button"
              disabled={sending || !draft.trim() || isPreview}
              onClick={sendMessage}
              className="inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {isPreview ? copy.connectToSend : sending ? copy.sending : copy.sendWhisper}
            </button>
            <ShareCardButton
              coupleId={coupleId}
              messageType="message_prompt_share"
              content={`Message starter card ✦ ${featuredStarter}`}
              label={copy.sharePrompt}
            />
          </div>
        </div>

        <div className="rounded-[28px] border border-border/30 bg-card/45 p-6">
          <div className="flex items-center gap-2 text-rose-300">
            <Heart className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.22em]">{copy.sharedThread}</span>
          </div>
          <h3 className="mt-4 font-display text-2xl text-foreground">{copy.recentOfferings}</h3>

          <div className="mt-5 space-y-3">
            {messages.length === 0 ? (
              <div className="rounded-[22px] border border-border/30 bg-background/45 p-5 text-sm leading-6 text-muted-foreground">
                {isPreview
                  ? copy.previewEmpty
                  : copy.connectedEmpty}
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
                        {mine ? copy.you : copy.beloved}
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
