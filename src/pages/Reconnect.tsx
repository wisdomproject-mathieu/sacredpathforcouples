import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Heart, MessageCircleHeart, MoonStar, PlayCircle, Waves } from "lucide-react";

type Tool = {
  slug: string;
  title: string;
  icon: typeof MoonStar;
  iconClass: string;
  desc: string;
  useWhen: string;
  quality: string[];
  modernCard: { title: string; body: string; tonight: string };
  premium: string;
};

const libraryTabs = [
  { to: "/app/paths", label: "Paths" },
  { to: "/app/authors", label: "Authors" },
  { to: "/app/reconnect", label: "Reconnect" },
];

const freeTools: Tool[] = [
  {
    slug: "soft-landing",
    title: "Soft Landing",
    icon: MoonStar,
    iconClass: "text-cyan-300",
    desc: "A gentle sequence for couples who need to settle, breathe, and arrive back into one another before anything else.",
    useWhen: "Use when there has been stress, travel, parenting, overwork, awkward distance, or simply too much life in the room. Soft Landing lowers the emotional temperature without making the moment flat.",
    quality: [
      "It asks very little and gives a lot.",
      "It works for new couples and long-term couples equally well.",
      "It helps both bodies arrive before the relationship asks for more.",
    ],
    modernCard: {
      title: "Quick card for modern couples",
      body: "This is the best first move when you both want connection but neither of you has much energy for complexity. It is low friction, warm, and believable on a real weeknight.",
      tonight: "Sit knee to knee. Share one long exhale together. Then each say one thing your body needs tonight.",
    },
    premium: "Premium opens deeper guided resets, breath-led co-regulation, and richer reconnect sequences for couples who need more than a simple arrival.",
  },
  {
    slug: "heart-opening",
    title: "Heart Opening",
    icon: Heart,
    iconClass: "text-rose-300",
    desc: "A warm path into gratitude, affection, tenderness, and emotional reassurance.",
    useWhen: "Use when the relationship feels loving but distant, when one partner needs to feel seen again, or when the couple needs more warmth before any erotic energy can emerge.",
    quality: [
      "It builds trust without becoming heavy.",
      "It is one of the cleanest ways to turn affection back into felt closeness.",
      "It helps tenderness become active instead of assumed.",
    ],
    modernCard: {
      title: "Quick card for modern couples",
      body: "This is the best tool when the relationship is not broken but feels undernourished. It is especially strong after busy days, parenting stress, or subtle emotional drift.",
      tonight: "Place one hand on your own heart and one on your partner’s. Alternate: ‘One thing I appreciate right now is…’ for three rounds.",
    },
    premium: "Premium unlocks deeper devotional practices, gratitude cards, heart-softening rituals, and richer pathways for emotionally intimate repair.",
  },
  {
    slug: "playful-spark",
    title: "Playful Spark",
    icon: PlayCircle,
    iconClass: "text-amber-300",
    desc: "A lighter route into teasing, laughter, flirtation, and a little delicious mischief.",
    useWhen: "Use when things feel too serious, too practical, too adult, or too emotionally correct. Playful Spark brings oxygen back into the relationship.",
    quality: [
      "It wakes up chemistry without forcing intensity.",
      "It gives modern couples a believable bridge from daily life into flirtation.",
      "It makes desire feel lighter before it feels deeper.",
    ],
    modernCard: {
      title: "Quick card for modern couples",
      body: "This is the right tool when you do not need a big ritual — just more life, more grin, more teasing, and a reminder that attraction can still play.",
      tonight: "Take turns making one impossible request and one real desire. Guess which is which before answering.",
    },
    premium: "Premium expands teasing cards, playful scripts, sensual anticipation games, and stronger playful-to-erotic bridges for couples who want more spark.",
  },
];

const premiumTools = [
  { title: "Sacred Desire", icon: Flame, iconClass: "text-orange-300", line: "A more erotic route into anticipation, magnetic tension, and embodied longing." },
  { title: "Breath Bridge", icon: Waves, iconClass: "text-emerald-300", line: "Nervous-system co-regulation and breath-led repair when words are too sharp or too tired." },
  { title: "Speak the Unsent", icon: MessageCircleHeart, iconClass: "text-violet-300", line: "A softer verbal opener for what has been carried but not yet spoken with care." },
];

const subNavClass =
  "inline-flex items-center rounded-full border border-border/30 bg-background/45 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/20 hover:text-foreground";

const cardClass =
  "rounded-[28px] border border-border/30 bg-card/45 p-5 shadow-[0_20px_60px_-45px_rgba(255,173,70,0.42)]";

const Reconnect = () => {
  const [selectedSlug, setSelectedSlug] = useState(freeTools[0].slug);
  const selected = useMemo(() => freeTools.find((tool) => tool.slug === selectedSlug) ?? freeTools[0], [selectedSlug]);
  const SelectedIcon = selected.icon;

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Library · Reconnect</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Small doorways back into each other</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            Reconnect now follows the same strong structure as Authors: choose a tool on the left, receive something immediately usable on the right, and go deeper with premium when the relationship needs more range.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {libraryTabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className={`${subNavClass} ${tab.to === "/app/reconnect" ? "border-primary/25 bg-primary/10 text-foreground" : ""}`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-4">
          {freeTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.slug}
                type="button"
                onClick={() => setSelectedSlug(tool.slug)}
                className={`w-full rounded-[28px] border p-5 text-left transition-all ${selectedSlug === tool.slug ? "border-primary/30 bg-primary/10 shadow-[0_18px_50px_-36px_rgba(255,173,70,0.42)]" : "border-border/30 bg-card/45 hover:border-primary/20 hover:bg-card/55"}`}
              >
                <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${tool.iconClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-display text-2xl text-foreground">{tool.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{tool.desc}</p>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          <section className={cardClass}>
            <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${selected.iconClass}`}>
              <SelectedIcon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-display text-4xl text-foreground">{selected.title}</h2>
            <p className="mt-3 text-base leading-8 text-foreground/90">{selected.desc}</p>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="space-y-4">
              <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Use it when</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.useWhen}</p>
              </div>

              <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Why this tool works</div>
                <div className="mt-4 space-y-3">
                  {selected.quality.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground/90">
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[24px] border border-primary/15 bg-primary/8 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{selected.modernCard.title}</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.modernCard.body}</p>
                <div className="mt-4 rounded-2xl border border-primary/15 bg-background/45 p-4">
                  <div className="text-[11px] uppercase tracking-[0.14em] text-primary/80">Try this tonight</div>
                  <p className="mt-2 text-sm leading-6 text-foreground/90">{selected.modernCard.tonight}</p>
                </div>
              </div>

              <div className="rounded-[24px] border border-amber-400/15 bg-amber-500/8 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-amber-300">Go deeper with premium</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.premium}</p>
                <div className="mt-4">
                  <Link
                    to="/pricing"
                    className="inline-flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/12 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/35 hover:bg-primary/16"
                  >
                    View premium plans
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <p className="text-xs uppercase tracking-[0.22em] text-primary/80">More reconnect tools in premium</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">Unlock richer ways back into closeness</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
              Premium expands reconnect with stronger sensual tools, softer repair frameworks, richer teasing and messaging prompts, and more guided bridges from distance back into felt connection.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {premiumTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div key={tool.title} className="rounded-[24px] border border-border/30 bg-background/45 p-4">
                    <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${tool.iconClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="mt-3 font-display text-xl text-foreground">{tool.title}</div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.line}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Reconnect;
