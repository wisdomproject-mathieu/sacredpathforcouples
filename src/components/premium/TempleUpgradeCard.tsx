import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  ctaLabel: string;
  to?: string;
  className?: string;
  compact?: boolean;
};

const TempleUpgradeCard = ({
  eyebrow,
  title,
  body,
  bullets = [],
  ctaLabel,
  to = "/pricing",
  className = "",
  compact = false,
}: Props) => (
  <section
    className={`rounded-[24px] border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_58%),linear-gradient(135deg,rgba(251,191,36,0.12),rgba(15,23,42,0.1))] p-4 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.42)] ${className}`}
  >
    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/35 bg-amber-500/14 text-amber-200">
      <Lock className="h-3.5 w-3.5" />
    </div>
    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-amber-200">{eyebrow}</p>
    <h3 className="mt-2 font-display text-2xl text-foreground">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-foreground/90">{body}</p>

    {!compact && bullets.length ? (
      <div className="mt-3 space-y-2">
        {bullets.slice(0, 3).map((item) => (
          <p
            key={item}
            className="rounded-xl border border-amber-300/20 bg-amber-500/8 px-3 py-2 text-xs leading-5 text-foreground/90"
          >
            {item}
          </p>
        ))}
      </div>
    ) : null}

    <Link
      to={to}
      className="mt-4 inline-flex items-center rounded-xl border border-amber-300/35 bg-amber-500/12 px-4 py-2 text-sm text-foreground transition-all hover:border-amber-300/55 hover:bg-amber-500/20"
    >
      {ctaLabel}
    </Link>
  </section>
);

export default TempleUpgradeCard;
