import type { Language } from "@/contexts/LanguageContext";
import NotificationBadge from "@/components/space/journey/NotificationBadge";
import type { SacredComposerType } from "@/components/space/journey/SacredMessageComposer";

export type SacredBoardItem = {
  id: string;
  type: string;
  authorLabel: string;
  body: string;
  createdAt: string;
  mine: boolean;
  unread: boolean;
};

type Props = {
  lang: Language;
  title: string;
  subtitle: string;
  items: SacredBoardItem[];
  unreadCount: number;
  onOpen: () => void;
  onAcknowledge: (item: SacredBoardItem) => void;
  onQuickCompose: (type: SacredComposerType) => void;
};

const typeLabels: Record<Language, Record<string, string>> = {
  en: {
    note: "Beloved Note",
    invitation: "Ritual Invitation",
    ritual_share: "Shared Ritual",
    offering: "Offering",
    nudge: "Gentle Nudge",
    intention: "Intention",
    acknowledgement: "Acknowledgement",
  },
  fr: {
    note: "Note du partenaire",
    invitation: "Invitation rituelle",
    ritual_share: "Rituel partagé",
    offering: "Offrande",
    nudge: "Nudge doux",
    intention: "Intention",
    acknowledgement: "Accusé de réception",
  },
  cs: {
    note: "Vzkaz partnerovi",
    invitation: "Rituální pozvání",
    ritual_share: "Sdílený rituál",
    offering: "Sdílení",
    nudge: "Jemné postrčení",
    intention: "Záměr",
    acknowledgement: "Potvrzení",
  },
};

const SacredTempleBoard = ({
  lang,
  title,
  subtitle,
  items,
  unreadCount,
  onOpen,
  onAcknowledge,
  onQuickCompose,
}: Props) => (
  <section className="relative rounded-[24px] border border-border/30 bg-card/45 p-4" onClick={onOpen}>
    <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{title}</p>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">{subtitle}</p>

    <div className="mt-4 flex flex-wrap gap-2">
      {(["note", "ritual_share", "invitation", "nudge"] as SacredComposerType[]).map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onQuickCompose(type)}
          className="rounded-full border border-border/35 bg-background/45 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-foreground transition-all hover:border-border/55 hover:bg-background/60"
        >
          {typeLabels[lang][type]}
        </button>
      ))}
    </div>

    <div className="mt-4 space-y-2">
      {items.length === 0 ? (
        <div className="rounded-[16px] border border-border/30 bg-background/45 p-3 text-sm text-muted-foreground">
          {lang === "fr"
            ? "Aucun message partagé pour le moment."
            : lang === "cs"
            ? "Zatím žádné sdílené zprávy."
            : "No shared messages yet."}
        </div>
      ) : (
        items.slice(0, 4).map((item) => (
          <article
            key={item.id}
            className={`rounded-[16px] border p-3 ${item.mine ? "border-primary/20 bg-primary/8" : "border-border/30 bg-background/45"}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full border border-border/35 bg-card/45 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {typeLabels[lang][item.type] ?? (lang === "fr" ? "Message" : lang === "cs" ? "Zpráva" : "Message")}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {item.authorLabel} · {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-foreground/90">{item.body}</p>
            {!item.mine ? (
              <button
                type="button"
                onClick={() => onAcknowledge(item)}
                className="mt-2 rounded-lg border border-primary/25 bg-primary/12 px-2.5 py-1 text-xs text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
              >
                {lang === "fr" ? "Accuser réception" : lang === "cs" ? "Potvrdit" : "Acknowledge"}
              </button>
            ) : null}
          </article>
        ))
      )}
    </div>

    <NotificationBadge show={unreadCount > 0} count={unreadCount} />
  </section>
);

export default SacredTempleBoard;
