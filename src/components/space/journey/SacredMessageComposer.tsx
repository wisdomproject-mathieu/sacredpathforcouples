import { useMemo, useState } from "react";
import type { Language } from "@/contexts/LanguageContext";

export type SacredComposerType =
  | "note"
  | "invitation"
  | "ritual_share"
  | "offering"
  | "nudge"
  | "intention";

type Props = {
  lang: Language;
  onSend: (type: SacredComposerType, body: string) => Promise<void> | void;
  disabled?: boolean;
};

const typeLabels: Record<Language, Record<SacredComposerType, string>> = {
  en: {
    note: "Beloved Note",
    invitation: "Ritual Invitation",
    ritual_share: "Shared Ritual",
    offering: "Oracle / Offering",
    nudge: "Gentle Nudge",
    intention: "Intention",
  },
  fr: {
    note: "Note du partenaire",
    invitation: "Invitation rituelle",
    ritual_share: "Rituel partagé",
    offering: "Oracle / Offrande",
    nudge: "Nudge doux",
    intention: "Intention",
  },
  cs: {
    note: "Vzkaz partnerovi",
    invitation: "Rituální pozvání",
    ritual_share: "Sdílený rituál",
    offering: "Oracle / Sdílení",
    nudge: "Jemné postrčení",
    intention: "Záměr",
  },
};

const copyByLanguage: Record<Language, { title: string; placeholder: string; button: string }> = {
  en: {
    title: "Sacred Temple Board",
    placeholder: "Write a note, invitation, ritual offering, or gentle nudge...",
    button: "Send",
  },
  fr: {
    title: "Tableau du Temple sacré",
    placeholder: "Écrivez une note, invitation, offrande rituelle ou nudge doux...",
    button: "Envoyer",
  },
  cs: {
    title: "Posvátná chrámová nástěnka",
    placeholder: "Napište vzkaz, pozvání, sdílení rituálu nebo jemné postrčení...",
    button: "Odeslat",
  },
};

const composerTypes: SacredComposerType[] = ["note", "invitation", "ritual_share", "offering", "nudge", "intention"];

const SacredMessageComposer = ({ lang, onSend, disabled = false }: Props) => {
  const [type, setType] = useState<SacredComposerType>("note");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const copy = copyByLanguage[lang];

  const canSend = useMemo(() => body.trim().length > 0 && !disabled && !sending, [body, disabled, sending]);

  const handleSend = async () => {
    if (!canSend) return;
    try {
      setSending(true);
      await onSend(type, body.trim());
      setBody("");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="rounded-[22px] border border-border/30 bg-card/45 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{copy.title}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {composerTypes.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setType(item)}
            className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] transition-all ${
              type === item
                ? "border-primary/35 bg-primary/14 text-foreground"
                : "border-border/35 bg-background/45 text-muted-foreground hover:border-border/55 hover:text-foreground"
            }`}
          >
            {typeLabels[lang][item]}
          </button>
        ))}
      </div>

      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder={copy.placeholder}
        rows={3}
        className="mt-3 w-full resize-none rounded-xl border border-border/35 bg-background/45 px-3 py-2 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/30"
      />

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          disabled={!canSend}
          onClick={handleSend}
          className="rounded-xl border border-primary/25 bg-primary/12 px-3 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16 disabled:opacity-60"
        >
          {sending ? "..." : copy.button}
        </button>
      </div>
    </section>
  );
};

export default SacredMessageComposer;
