import { useMemo, useState } from "react";
import {
  Bell,
  BookHeart,
  Check,
  Copy,
  HeartHandshake,
  ImageIcon,
  MessageCircleHeart,
  Newspaper,
  Quote,
  RefreshCcw,
  Send,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import HomeHeroBannerShell from "@/components/shared/HomeHeroBannerShell";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Language } from "@/contexts/LanguageContext";

type TempleMessage = {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  message_type: string | null;
};

type TempleMemory = {
  id: string;
  title: string;
  note: string | null;
  created_at: string;
  user_id: string;
  item_type: string;
};

type NotificationType = "whisper" | "gratitude" | "quote" | "memory" | "news";

type TempleNotification = {
  id: string;
  type: NotificationType;
  title: string;
  preview: string;
  content: string;
  sender: string;
  createdAt: string;
  mine: boolean;
};

type ComposerMode = "whisper" | "gratitude" | "quote" | "news";

type Props = {
  lang: Language;
  dateLabel: string;
  title: string;
  relationshipConnected: boolean;
  partnerName: string;
  userId?: string;
  messages: TempleMessage[];
  memories: TempleMemory[];
  onOpenTemple: () => void;
  onSendMessage: (type: string, content: string) => Promise<void>;
  onAddMemory: (title: string, note: string) => Promise<void>;
};

const clip = (value: string, max = 120) => (value.length > max ? `${value.slice(0, max).trimEnd()}...` : value);
const toTs = (value: string) => new Date(value).getTime();

const quoteSets: Record<
  Language,
  Array<{ id: string; theme: string; quote: string }>
> = {
  en: [
    { id: "devotion-1", theme: "Devotion", quote: "Love returns when two people choose each other again in the middle of ordinary life." },
    { id: "gratitude-1", theme: "Gratitude", quote: "Gratitude is one of the oldest love rituals: to see, to name, to honor." },
    { id: "presence-1", theme: "Polarity", quote: "Passion grows where presence lives." },
    { id: "healing-1", theme: "Healing", quote: "A conscious couple does not avoid distance; they learn how to walk back to each other." },
    { id: "sacred-1", theme: "Sacred partnership", quote: "The sacred is not elsewhere. It begins in the way we touch, speak, listen, and remember." },
    { id: "devotion-2", theme: "Tenderness", quote: "Ancient wisdom teaches this gently: devotion is built in small repeated acts." },
  ],
  fr: [
    { id: "devotion-1", theme: "Dévotion", quote: "L'amour revient quand deux personnes se choisissent encore, au milieu de la vie ordinaire." },
    { id: "gratitude-1", theme: "Gratitude", quote: "La gratitude est l'un des plus anciens rituels d'amour: voir, nommer, honorer." },
    { id: "presence-1", theme: "Polarité", quote: "La passion grandit là où la présence habite." },
    { id: "healing-1", theme: "Guérison", quote: "Un couple conscient n'évite pas la distance; il apprend à revenir l'un vers l'autre." },
    { id: "sacred-1", theme: "Partenariat sacré", quote: "Le sacré n'est pas ailleurs. Il commence dans la façon de toucher, parler, écouter, et se souvenir." },
    { id: "devotion-2", theme: "Tendresse", quote: "La sagesse ancienne l'enseigne doucement: la dévotion se construit dans de petits actes répétés." },
  ],
  cs: [
    { id: "devotion-1", theme: "Oddanost", quote: "Láska se vrací, když se dva lidé znovu zvolí uprostřed obyčejného života." },
    { id: "gratitude-1", theme: "Vděčnost", quote: "Vděčnost je jeden z nejstarších rituálů lásky: vidět, pojmenovat, uctít." },
    { id: "presence-1", theme: "Polarita", quote: "Vášeň roste tam, kde žije přítomnost." },
    { id: "healing-1", theme: "Léčení", quote: "Vědomý pár se vzdálenosti nevyhýbá; učí se, jak se k sobě vracet." },
    { id: "sacred-1", theme: "Posvátné partnerství", quote: "Posvátno není někde jinde. Začíná v tom, jak se dotýkáme, mluvíme, nasloucháme a pamatujeme." },
    { id: "devotion-2", theme: "Něžnost", quote: "Starodávná moudrost učí jemně: oddanost se buduje malými opakovanými činy." },
  ],
};

const inferType = (messageType: string | null): NotificationType => {
  const value = (messageType || "").toLowerCase();
  if (value.includes("gratitude")) return "gratitude";
  if (value.includes("quote")) return "quote";
  if (value.includes("news") || value.includes("note") || value.includes("offering") || value.includes("intention")) return "news";
  if (value.includes("memory") || value.includes("altar")) return "memory";
  return "whisper";
};

const typeStyles: Record<NotificationType, { label: string; badgeClass: string; iconClass: string }> = {
  whisper: {
    label: "Whisper",
    badgeClass: "border-rose-300/35 bg-rose-500/15 text-rose-200",
    iconClass: "text-rose-200",
  },
  gratitude: {
    label: "Gratitude",
    badgeClass: "border-emerald-300/35 bg-emerald-500/15 text-emerald-200",
    iconClass: "text-emerald-200",
  },
  quote: {
    label: "Quote",
    badgeClass: "border-violet-300/35 bg-violet-500/15 text-violet-200",
    iconClass: "text-violet-200",
  },
  memory: {
    label: "Memory",
    badgeClass: "border-amber-300/35 bg-amber-500/15 text-amber-200",
    iconClass: "text-amber-200",
  },
  news: {
    label: "News",
    badgeClass: "border-cyan-300/35 bg-cyan-500/15 text-cyan-200",
    iconClass: "text-cyan-200",
  },
};

const SacredTempleDashboard = ({
  lang,
  dateLabel,
  title,
  relationshipConnected,
  partnerName,
  userId,
  messages,
  memories,
  onOpenTemple,
  onSendMessage,
  onAddMemory,
}: Props) => {
  const quotes = quoteSets[lang];

  const [quoteIndex, setQuoteIndex] = useState(new Date().getDate() % quotes.length);
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerMode, setComposerMode] = useState<ComposerMode>("whisper");
  const [composerText, setComposerText] = useState("");
  const [sending, setSending] = useState(false);
  const [savingMemory, setSavingMemory] = useState(false);
  const [composerBoardTarget, setComposerBoardTarget] = useState(false);

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<TempleNotification | null>(null);
  const [readNotificationIds, setReadNotificationIds] = useState<Set<string>>(new Set());

  const [memoriesOpen, setMemoriesOpen] = useState(false);
  const [newMemoryTitle, setNewMemoryTitle] = useState("");
  const [newMemoryNote, setNewMemoryNote] = useState("");

  const [newsOpen, setNewsOpen] = useState(false);

  const featuredQuote = quotes[quoteIndex];
  const baseShareText = composerText.trim() || "";
  const whatsappHref = baseShareText ? `https://wa.me/?text=${encodeURIComponent(baseShareText)}` : "#";
  const smsHref = baseShareText ? `sms:?body=${encodeURIComponent(baseShareText)}` : "#";

  const openComposer = (mode: ComposerMode, initialText: string) => {
    setComposerMode(mode);
    setComposerText(initialText);
    setComposerBoardTarget(false);
    setComposerOpen(true);
  };

  const notifications = useMemo<TempleNotification[]>(() => {
    const fromMessages = messages.map((message) => {
      const type = inferType(message.message_type);
      const mine = message.sender_id === userId;
      const sender = mine ? "You" : (partnerName || "Beloved");
      const titleByType: Record<NotificationType, string> = {
        whisper: mine ? "You sent a whisper" : `${sender} sent you a whisper`,
        gratitude: mine ? "You shared gratitude" : `${sender} shared gratitude`,
        quote: mine ? "You shared a sacred quote" : "A sacred quote was shared",
        memory: mine ? "You shared a memory" : `${sender} shared a memory`,
        news: mine ? "You posted to couple news" : `${sender} posted couple news`,
      };
      return {
        id: `msg-${message.id}`,
        type,
        title: titleByType[type],
        preview: clip(message.content, 110),
        content: message.content,
        sender,
        createdAt: message.created_at,
        mine,
      };
    });

    const fromMemories = memories.map((memory) => {
      const mine = memory.user_id === userId;
      const sender = mine ? "You" : (partnerName || "Beloved");
      const noteContent = memory.note || memory.title;
      return {
        id: `memory-${memory.id}`,
        type: "memory" as const,
        title: mine ? "You added a memory" : `${sender} added a memory`,
        preview: clip(noteContent, 110),
        content: noteContent,
        sender,
        createdAt: memory.created_at,
        mine,
      };
    });

    return [...fromMessages, ...fromMemories].sort((a, b) => toTs(b.createdAt) - toTs(a.createdAt));
  }, [memories, messages, partnerName, userId]);

  const unreadCount = notifications.filter((item) => !item.mine && !readNotificationIds.has(item.id)).length;
  const recentNotifications = notifications.slice(0, 4);
  const recentMemories = memories.slice(0, 3);
  const coupleNews = notifications.filter((item) => item.type === "news").slice(0, 4);

  const markAllSeen = () => {
    setReadNotificationIds(new Set(notifications.map((item) => item.id)));
  };

  const openNotification = (notification: TempleNotification) => {
    setReadNotificationIds((current) => {
      const next = new Set(current);
      next.add(notification.id);
      return next;
    });
    setSelectedNotification(notification);
  };

  const handleSend = async () => {
    if (!baseShareText || !relationshipConnected) return;
    setSending(true);
    try {
      const type = composerBoardTarget ? "news" : composerMode;
      await onSendMessage(type, baseShareText);
      toast.success(composerBoardTarget ? "Posted to Couple News" : "Sent to your partner");
      setComposerOpen(false);
    } finally {
      setSending(false);
    }
  };

  const handleCreateMemory = async () => {
    if (!newMemoryTitle.trim() || !relationshipConnected) return;
    setSavingMemory(true);
    try {
      await onAddMemory(newMemoryTitle.trim(), newMemoryNote.trim());
      setNewMemoryTitle("");
      setNewMemoryNote("");
      toast.success("Memory saved");
    } finally {
      setSavingMemory(false);
    }
  };

  const notificationBadge = (notification: TempleNotification) => typeStyles[notification.type];

  return (
    <section className="space-y-4">
      <HomeHeroBannerShell
        eyebrow="SACRED TEMPLE"
        quote="Love deepens through small sacred acts repeated with presence."
        left={(
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/65">{dateLabel}</p>
            <h1 className="mt-2 font-display text-3xl text-foreground">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              A shared space for whispers, gratitude, memories, and gentle return.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onOpenTemple}
                className="inline-flex items-center gap-2 rounded-[12px] border border-amber-400/35 bg-amber-400/12 px-4 py-2.5 text-sm text-amber-200 transition-all hover:bg-amber-400/20"
              >
                Open the Temple
                <Sparkles className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => openComposer("whisper", "I want to share something sacred with you tonight.")}
                className="inline-flex items-center gap-2 rounded-[12px] border border-border/35 bg-background/45 px-4 py-2.5 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
              >
                Share something sacred
              </button>
            </div>
          </div>
        )}
        right={(
          <div className="rounded-[18px] border border-emerald-300/25 bg-emerald-500/8 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/85">TEMPLE STATE</p>
            <p className="mt-2 text-sm leading-6 text-foreground/90">
              Your sacred space is open. Send one loving gesture, revisit a memory, or answer what your bond is asking for today.
            </p>
            <div className="mt-3 rounded-[10px] border border-border/30 bg-background/45 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">TODAY’S INVITATION</p>
              <p className="mt-1 text-sm text-foreground">Choose one: Whisper, Gratitude, or a Sacred Quote</p>
            </div>
          </div>
        )}
      />

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-[22px] border border-rose-300/25 bg-gradient-to-br from-rose-500/12 via-card/65 to-card/35 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-rose-200/85">Send a Whisper</p>
          <p className="mt-2 text-sm leading-6 text-foreground/90">
            A soft message for the heart: tender, playful, grounding, or full of desire.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Whispers help love stay alive between the big moments.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setNotificationsOpen(true)}
              className="rounded-[10px] border border-border/35 bg-background/45 px-3 py-2 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              Open whispers
            </button>
            <button
              type="button"
              onClick={() => openComposer("whisper", "Tonight I want to meet you with warmth, honesty, and desire.")}
              className="rounded-[10px] border border-primary/30 bg-primary/12 px-3 py-2 text-xs text-foreground transition-all hover:border-primary/45 hover:bg-primary/18"
            >
              Send now
            </button>
          </div>
        </article>

        <article className="rounded-[22px] border border-emerald-300/25 bg-gradient-to-br from-emerald-500/12 via-card/65 to-card/35 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/85">Send Gratitude</p>
          <p className="mt-2 text-sm leading-6 text-foreground/90">
            Name what you cherish today. Appreciation turns routine back into devotion.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            A single sincere thank you can change the energy of the whole day.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setNotificationsOpen(true)}
              className="rounded-[10px] border border-border/35 bg-background/45 px-3 py-2 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              Open gratitude
            </button>
            <button
              type="button"
              onClick={() => openComposer("gratitude", "Thank you for the way you keep showing up for us, even on ordinary days.")}
              className="rounded-[10px] border border-primary/30 bg-primary/12 px-3 py-2 text-xs text-foreground transition-all hover:border-primary/45 hover:bg-primary/18"
            >
              Send now
            </button>
          </div>
        </article>

        <article className="rounded-[22px] border border-violet-300/25 bg-gradient-to-br from-violet-500/12 via-card/65 to-card/35 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-violet-200/85">Sacred Quotes</p>
          <p className="mt-2 text-sm leading-6 text-foreground/90">
            Rotating words of love, devotion, polarity, tenderness, and conscious union.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Inspired by timeless wisdom, written for modern couples.
          </p>
          <div className="mt-3 rounded-[12px] border border-border/30 bg-background/45 p-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{featuredQuote.theme}</p>
            <p className="mt-1 text-sm leading-6 text-foreground/90">{featuredQuote.quote}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setQuoteIndex((current) => (current + 1) % quotes.length)}
              className="inline-flex items-center gap-1.5 rounded-[10px] border border-border/35 bg-background/45 px-3 py-2 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              New quote
            </button>
            <button
              type="button"
              onClick={() => openComposer("quote", featuredQuote.quote)}
              className="rounded-[10px] border border-primary/30 bg-primary/12 px-3 py-2 text-xs text-foreground transition-all hover:border-primary/45 hover:bg-primary/18"
            >
              Share quote
            </button>
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-[22px] border border-cyan-300/25 bg-gradient-to-br from-cyan-500/12 via-card/65 to-card/35 p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/85">Temple Notifications</p>
            <span className="rounded-full border border-border/30 bg-background/55 px-2 py-0.5 text-[10px] text-foreground/85">
              {unreadCount} unread
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-foreground/90">
            See what your partner sent, what was posted, and what wants your attention.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Everything meaningful, in one calm place.
          </p>
          <div className="mt-3 space-y-2">
            {recentNotifications.length ? (
              recentNotifications.map((notification) => {
                const badge = notificationBadge(notification);
                const unread = !notification.mine && !readNotificationIds.has(notification.id);
                return (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => openNotification(notification)}
                    className={`w-full rounded-[12px] border px-3 py-2 text-left transition-all ${
                      unread
                        ? "border-primary/35 bg-primary/10"
                        : "border-border/30 bg-background/45 hover:border-border/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5">
                        <Bell className={`h-3.5 w-3.5 ${badge.iconClass}`} />
                        <span className="text-xs font-medium text-foreground">{notification.title}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{new Date(notification.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{notification.preview}</p>
                    <span className={`mt-1 inline-flex rounded-full border px-1.5 py-0.5 text-[10px] ${badge.badgeClass}`}>
                      {badge.label}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="rounded-[12px] border border-border/30 bg-background/45 px-3 py-2 text-xs text-muted-foreground">
                No notifications yet.
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setNotificationsOpen(true)}
              className="rounded-[10px] border border-border/35 bg-background/45 px-3 py-2 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              View all
            </button>
            <button
              type="button"
              onClick={markAllSeen}
              className="rounded-[10px] border border-primary/30 bg-primary/12 px-3 py-2 text-xs text-foreground transition-all hover:border-primary/45 hover:bg-primary/18"
            >
              Mark seen
            </button>
          </div>
        </article>

        <article className="rounded-[22px] border border-amber-300/25 bg-gradient-to-br from-amber-500/12 via-card/65 to-card/35 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-200/85">Pictures & Memories</p>
          <p className="mt-2 text-sm leading-6 text-foreground/90">
            A growing archive of moments, rituals, smiles, and sacred milestones.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Memory becomes intimacy when it is revisited together.
          </p>
          <div className="mt-3 space-y-1.5">
            {recentMemories.length ? (
              recentMemories.map((memory) => (
                <div key={memory.id} className="rounded-[10px] border border-border/30 bg-background/45 px-3 py-2">
                  <p className="text-xs text-foreground">{memory.title}</p>
                  <p className="text-[10px] text-muted-foreground">{new Date(memory.created_at).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <div className="rounded-[10px] border border-border/30 bg-background/45 px-3 py-2 text-xs text-muted-foreground">
                No memory yet. Add your first sacred moment.
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMemoriesOpen(true)}
              className="rounded-[10px] border border-border/35 bg-background/45 px-3 py-2 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              Open memories
            </button>
            <button
              type="button"
              onClick={() => setMemoriesOpen(true)}
              className="rounded-[10px] border border-primary/30 bg-primary/12 px-3 py-2 text-xs text-foreground transition-all hover:border-primary/45 hover:bg-primary/18"
            >
              Add memory
            </button>
          </div>
        </article>

        <article className="rounded-[22px] border border-fuchsia-300/25 bg-gradient-to-br from-fuchsia-500/12 via-card/65 to-card/35 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-fuchsia-200/85">Couple News</p>
          <p className="mt-2 text-sm leading-6 text-foreground/90">
            A shared board for little updates, celebrations, intentions, and meaningful moments.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Not social media. A private stream of your living story.
          </p>
          <div className="mt-3 space-y-1.5">
            {coupleNews.length ? (
              coupleNews.map((news) => (
                <button
                  key={news.id}
                  type="button"
                  onClick={() => openNotification(news)}
                  className="w-full rounded-[10px] border border-border/30 bg-background/45 px-3 py-2 text-left transition-all hover:border-border/55"
                >
                  <p className="text-xs text-foreground">{news.title}</p>
                  <p className="text-[10px] text-muted-foreground">{news.preview}</p>
                </button>
              ))
            ) : (
              <div className="rounded-[10px] border border-border/30 bg-background/45 px-3 py-2 text-xs text-muted-foreground">
                No couple news yet.
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setNewsOpen(true)}
              className="rounded-[10px] border border-border/35 bg-background/45 px-3 py-2 text-xs text-foreground transition-all hover:border-border/55 hover:bg-card/60"
            >
              Open board
            </button>
            <button
              type="button"
              onClick={() => openComposer("news", "A small update from my heart for us today...")}
              className="rounded-[10px] border border-primary/30 bg-primary/12 px-3 py-2 text-xs text-foreground transition-all hover:border-primary/45 hover:bg-primary/18"
            >
              Post update
            </button>
          </div>
        </article>
      </section>

      <Sheet open={composerOpen} onOpenChange={setComposerOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto border-border/35 bg-background/98 p-5 sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>
              {composerMode === "whisper"
                ? "Send a Whisper"
                : composerMode === "gratitude"
                  ? "Send Gratitude"
                  : composerMode === "quote"
                    ? "Share Sacred Quote"
                    : "Post Couple News"}
            </SheetTitle>
            <SheetDescription>
              Edit your text, preview it, then share through WhatsApp, Messages, or post directly to your private couple board.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-4 space-y-4">
            <textarea
              value={composerText}
              onChange={(event) => setComposerText(event.target.value)}
              rows={6}
              className="w-full rounded-xl border border-border/35 bg-background/55 px-3 py-3 text-sm leading-6 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/35"
            />

            <div className="rounded-xl border border-border/35 bg-card/45 p-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Preview</p>
              <p className="mt-1 text-sm leading-6 text-foreground/90">{composerText || "Write your sacred message..."}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[10px] border border-green-500/30 bg-green-950/25 px-3 py-2 text-xs text-green-300"
              >
                WhatsApp
              </a>
              <a href={smsHref} className="rounded-[10px] border border-blue-500/30 bg-blue-950/25 px-3 py-2 text-xs text-blue-300">
                Messages
              </a>
              <button
                type="button"
                onClick={() => setComposerBoardTarget((current) => !current)}
                className={`rounded-[10px] border px-3 py-2 text-xs transition-all ${
                  composerBoardTarget
                    ? "border-primary/45 bg-primary/16 text-foreground"
                    : "border-border/35 bg-background/45 text-muted-foreground hover:text-foreground"
                }`}
              >
                Post to Couple News / Our Journey Board
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(composerText);
                    toast.success("Copied");
                  } catch {
                    // ignore clipboard errors
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-[10px] border border-border/35 bg-background/45 px-3 py-2 text-xs text-foreground transition-all hover:border-border/55"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy text
              </button>
            </div>

            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!relationshipConnected || sending || !composerText.trim()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/35 bg-primary/14 px-4 py-3 text-sm text-foreground transition-all hover:border-primary/50 hover:bg-primary/18 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {sending ? "Sending..." : composerBoardTarget ? "Post to Couple News" : "Send now"}
            </button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto border-border/35 bg-background/98 p-5 sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Temple Notifications</SheetTitle>
            <SheetDescription>Tap any item to open full content with quick actions.</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            {notifications.map((notification) => {
              const badge = notificationBadge(notification);
              const unread = !notification.mine && !readNotificationIds.has(notification.id);
              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => openNotification(notification)}
                  className={`w-full rounded-xl border px-3 py-2.5 text-left transition-all ${
                    unread
                      ? "border-primary/35 bg-primary/10"
                      : "border-border/35 bg-card/45 hover:border-border/55"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-foreground">{notification.title}</p>
                    <p className="text-[10px] text-muted-foreground">{new Date(notification.createdAt).toLocaleString()}</p>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{notification.preview}</p>
                  <span className={`mt-1 inline-flex rounded-full border px-1.5 py-0.5 text-[10px] ${badge.badgeClass}`}>{badge.label}</span>
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={Boolean(selectedNotification)} onOpenChange={(open) => !open && setSelectedNotification(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto border-border/35 bg-background/98 p-5 sm:max-w-xl">
          {selectedNotification ? (
            <>
              <SheetHeader>
                <SheetTitle>{selectedNotification.title}</SheetTitle>
                <SheetDescription>
                  {selectedNotification.sender} · {new Date(selectedNotification.createdAt).toLocaleString()}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-border/35 bg-card/45 p-3">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] ${notificationBadge(selectedNotification).badgeClass}`}>
                    {notificationBadge(selectedNotification).label}
                  </span>
                  <p className="mt-2 text-sm leading-6 text-foreground/90">{selectedNotification.content}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedNotification(null);
                      openComposer("whisper", `Replying to your message: ${selectedNotification.content}`);
                    }}
                    className="rounded-[10px] border border-border/35 bg-background/45 px-3 py-2 text-xs text-foreground transition-all hover:border-border/55"
                  >
                    Reply
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.success("Reaction sent")}
                    className="rounded-[10px] border border-border/35 bg-background/45 px-3 py-2 text-xs text-foreground transition-all hover:border-border/55"
                  >
                    React
                  </button>
                  <button
                    type="button"
                    onClick={() => void onAddMemory(selectedNotification.title, selectedNotification.content)}
                    className="rounded-[10px] border border-border/35 bg-background/45 px-3 py-2 text-xs text-foreground transition-all hover:border-border/55"
                  >
                    Save to memories
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedNotification(null);
                      openComposer("news", selectedNotification.content);
                      setComposerBoardTarget(true);
                    }}
                    className="rounded-[10px] border border-primary/30 bg-primary/12 px-3 py-2 text-xs text-foreground transition-all hover:border-primary/45 hover:bg-primary/18"
                  >
                    Post to couple news
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>

      <Sheet open={memoriesOpen} onOpenChange={setMemoriesOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto border-border/35 bg-background/98 p-5 sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Pictures & Memories</SheetTitle>
            <SheetDescription>Revisit shared moments and add a new sacred memory.</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            {memories.length ? (
              memories.map((memory) => (
                <div key={memory.id} className="rounded-xl border border-border/35 bg-card/45 p-3">
                  <p className="text-sm text-foreground">{memory.title}</p>
                  {memory.note ? <p className="mt-1 text-xs leading-5 text-muted-foreground">{memory.note}</p> : null}
                  <p className="mt-1 text-[10px] text-muted-foreground">{new Date(memory.created_at).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-border/35 bg-card/45 p-3 text-xs text-muted-foreground">
                No memory saved yet.
              </div>
            )}
          </div>

          <div className="mt-4 rounded-xl border border-border/35 bg-card/45 p-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Add memory</p>
            <input
              value={newMemoryTitle}
              onChange={(event) => setNewMemoryTitle(event.target.value)}
              placeholder="Memory title"
              className="mt-2 h-10 w-full rounded-lg border border-border/35 bg-background/55 px-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/35"
            />
            <textarea
              value={newMemoryNote}
              onChange={(event) => setNewMemoryNote(event.target.value)}
              placeholder="What made this moment meaningful?"
              rows={3}
              className="mt-2 w-full rounded-lg border border-border/35 bg-background/55 px-3 py-2 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/35"
            />
            <button
              type="button"
              onClick={() => void handleCreateMemory()}
              disabled={savingMemory || !relationshipConnected || !newMemoryTitle.trim()}
              className="mt-3 inline-flex items-center gap-2 rounded-[10px] border border-primary/35 bg-primary/14 px-3 py-2 text-xs text-foreground transition-all hover:border-primary/50 hover:bg-primary/18 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              {savingMemory ? "Saving..." : "Add memory"}
            </button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={newsOpen} onOpenChange={setNewsOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto border-border/35 bg-background/98 p-5 sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Couple News</SheetTitle>
            <SheetDescription>Your private stream of updates, intentions, and shared moments.</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            {coupleNews.length ? (
              coupleNews.map((item) => (
                <div key={item.id} className="rounded-xl border border-border/35 bg-card/45 p-3">
                  <p className="text-sm text-foreground">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.content}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-border/35 bg-card/45 p-3 text-xs text-muted-foreground">
                No couple news yet.
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setNewsOpen(false);
              openComposer("news", "A meaningful update from today...");
              setComposerBoardTarget(true);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-[10px] border border-primary/35 bg-primary/14 px-3 py-2 text-xs text-foreground transition-all hover:border-primary/50 hover:bg-primary/18"
          >
            <Newspaper className="h-3.5 w-3.5" />
            Post update
          </button>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default SacredTempleDashboard;
