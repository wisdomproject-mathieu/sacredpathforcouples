type Props = {
  title: string;
  body: string;
  ctaLabel?: string;
  onCta?: () => void;
};

const WaitingForPartnerCard = ({ title, body, ctaLabel, onCta }: Props) => (
  <div className="rounded-[22px] border border-amber-300/30 bg-amber-500/10 p-4">
    <h3 className="font-display text-2xl text-foreground">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-foreground/90">{body}</p>
    {ctaLabel && onCta ? (
      <button
        type="button"
        onClick={onCta}
        className="mt-4 rounded-xl border border-amber-300/35 bg-amber-500/14 px-3 py-2 text-sm text-foreground transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
      >
        {ctaLabel}
      </button>
    ) : null}
  </div>
);

export default WaitingForPartnerCard;
