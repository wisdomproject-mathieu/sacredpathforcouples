import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Crown,
  Flame,
  Heart,
  MoonStar,
  Sparkles,
  Stars,
  Waves,
} from "lucide-react";

type PathDetail = {
  slug: string;
  name: string;
  icon: typeof Sparkles;
  iconClass: string;
  oneLine: string;
  what: string;
  not: string;
  helps: string[];
  principles: string[];
  modernCard: {
    title: string;
    body: string;
    tonight: string;
  };
  practices: { name: string; body: string }[];
  premium: string;
};

const libraryTabs = [
  { to: "/app/paths", label: "Paths" },
  { to: "/app/authors", label: "Authors" },
  { to: "/app/reconnect", label: "Reconnect" },
];

const freePaths: PathDetail[] = [
  {
    slug: "tantra",
    name: "Tantra",
    icon: Sparkles,
    iconClass: "text-fuchsia-300",
    oneLine: "Body, breath, energy, and consciousness woven into one living field of intimacy.",
    what:
      "Tantra is the path of weaving. It refuses the split between the sacred and the sensual. Instead of treating intimacy as a performance, it invites lovers to slow down enough to feel what is actually here: breath, longing, tenderness, charge, stillness, fear, devotion, and aliveness. In Tantra, the body becomes a temple of attention and the relationship becomes a place where desire can mature into presence.",
    not:
      "It is not decorative mysticism, not a race toward intensity, and not a costume for appearing spiritual. It is not about doing more to each other. It is about becoming more present with what is already alive between you.",
    helps: [
      "Couples who feel rushed, patterned, or emotionally underfed in intimacy and want something slower, deeper, and more sacred.",
      "Partners drawn to breath, chakras, reverence, sacred union, energy, or the sense that sexuality can become part of awakening rather than separate from it.",
      "Relationships that want to transform longing, tenderness, frustration, desire, and emotional charge into deeper union rather than pushing those states aside.",
    ],
    principles: [
      "Presence before performance — the quality of attention changes everything.",
      "Slowness creates sensitivity — when urgency softens, subtle pleasure and truth appear.",
      "Breath guides energy — breath becomes the bridge between body, emotion, and intimacy.",
    ],
    modernCard: {
      title: "Quick card for modern couples",
      body: "Use Tantra when the relationship feels hurried, disconnected, too mental, or too outcome-driven. It is the path for couples who want to feel more without having to do more.",
      tonight: "Tonight, sit face to face for two minutes without fixing anything. Breathe together. Let the body notice what changes when no one is rushing.",
    },
    practices: [
      {
        name: "The Arrival",
        body: "Do nothing except truly arrive. Sit facing each other and let presence become enough before any next step is chosen.",
      },
      {
        name: "Yab-Yum",
        body: "Seated face-to-face union where breath, stillness, and relaxed contact become stronger than urgency.",
      },
      {
        name: "Shakti Wave",
        body: "Movement and witnessing meet. The body is not hidden or managed; it becomes part of the ritual itself.",
      },
    ],
    premium:
      "Unlock deeper tantric teachings, chakra-based journeys, sacred touch sequences, guided audio, and a fuller map of how Tantra can shape the whole relationship over time.",
  },
  {
    slug: "tao",
    name: "Tao",
    icon: Waves,
    iconClass: "text-cyan-300",
    oneLine: "Natural flow, sensual longevity, softness, rhythm, and vitality that nourishes life.",
    what:
      "Tao is the path of flow. It teaches couples to move with life instead of against it. In intimacy, that means pacing, breath, warmth, relaxation, and energy that circulates instead of burning out too quickly. Taoist intimacy is less about drama and more about nourishment. It helps the relationship feel steadier, softer, and more sustainable.",
    not:
      "It is not cold restraint and not a rejection of passion. Tao does not kill intensity; it teaches the couple how to hold intensity more wisely so connection feels replenishing rather than draining.",
    helps: [
      "Couples who want intimacy to feel nourishing, steady, and less depleting.",
      "Partners drawn to breath, pacing, body wisdom, erotic longevity, and the intelligence of softness.",
      "Relationships that need calm, sensual rhythm instead of all-or-nothing charge.",
    ],
    principles: [
      "Softness improves flow — when the body relaxes, more vitality can circulate.",
      "Breath shapes the whole field — breathing changes pace, regulation, and depth.",
      "Conservation is intimate — what is held wisely can become steadiness and glow.",
    ],
    modernCard: {
      title: "Quick card for modern couples",
      body: "Use Tao when you feel too stressed, tired, overstimulated, or depleted for heavy emotional work but still want closeness that genuinely restores you.",
      tonight: "Lie side by side and breathe into the lower belly for five slow rounds. Put one hand on each other’s abdomen and let calm become the first form of intimacy.",
    },
    practices: [
      {
        name: "Lower Belly Breath",
        body: "Breathe low and wide rather than high and fast. This instantly changes the emotional temperature of the room.",
      },
      {
        name: "Orbit of Warmth",
        body: "Let attention travel through chest, belly, pelvis, and spine as if warmth can move through the whole body rather than gather in one place.",
      },
      {
        name: "Soft Rhythm",
        body: "Stay under the threshold of rushing. Let pacing become sensual medicine.",
      },
    ],
    premium:
      "Unlock richer Taoist practices for breath, energy circulation, partner pacing, sensual longevity, and the art of leaving intimacy feeling fed rather than emptied.",
  },
  {
    slug: "kama-sutra",
    name: "Kama Sutra",
    icon: Crown,
    iconClass: "text-amber-300",
    oneLine: "Pleasure, beauty, courtship, refinement, and the art of making love a cultivated experience.",
    what:
      "Kama Sutra is not only a catalog of positions. It belongs to a wider art of love: aesthetic pleasure, anticipation, refinement, conversation, touch, mood, scent, preparation, and the cultivation of desire as part of a meaningful life. In Sacred Path, Kama Sutra becomes a path of elegant sensuality rather than mechanical novelty.",
    not:
      "It is not a performance challenge, not acrobatics for their own sake, and not reduced to a list of postures. Without atmosphere, pacing, and emotional intelligence, it loses the thing that makes it beautiful.",
    helps: [
      "Couples who want more beauty, play, anticipation, and sensual artistry in the relationship.",
      "Partners who enjoy flirtation, ornament, aesthetics, and the idea that desire can be cultivated long before touch begins.",
      "Relationships that need a more playful, elegant, or courtly erotic language.",
    ],
    principles: [
      "Atmosphere matters — the mood before touch shapes the whole encounter.",
      "Anticipation is erotic — desire often deepens before anything overt happens.",
      "Pleasure is cultivated — beauty, language, pacing, and ritual all belong.",
    ],
    modernCard: {
      title: "Quick card for modern couples",
      body: "Use Kama Sutra when love has become practical and you want beauty, play, flirtation, and a return to the art of turning each other on before the body takes over.",
      tonight: "Dress the room differently, speak more slowly, and choose one kind of touch you will linger in without escalating too fast.",
    },
    practices: [
      {
        name: "Art of Anticipation",
        body: "Begin long before contact. Use glances, language, scent, and setup to make the evening itself part of desire.",
      },
      {
        name: "Sensual Refinement",
        body: "Reduce noise, sharpen attention, and let elegance replace urgency.",
      },
      {
        name: "Position as Expression",
        body: "Treat positions as carriers of mood and meaning, not as goals in themselves.",
      },
    ],
    premium:
      "Unlock a richer world of erotic artistry, atmosphere, positions with meaning, anticipation rituals, and elegant pathways that help desire feel cultivated rather than accidental.",
  },
  {
    slug: "polarity",
    name: "Polarity",
    icon: Flame,
    iconClass: "text-rose-300",
    oneLine: "Magnetic difference, devotional tension, edge, and the charge that lives in conscious contrast.",
    what:
      "Polarity is the path of conscious charge. It helps couples understand why affection can remain while erotic energy fades — and how difference, edge, direction, surrender, and devotion can bring life back into the field. In Sacred Path, Polarity is not about rigid gender performance; it is about feeling the erotic intelligence of complementary forces.",
    not:
      "It is not domination theater, not emotional carelessness, and not a cliché about masculine and feminine roles. Without love, consciousness, and consent, polarity becomes noise instead of magnetism.",
    helps: [
      "Couples whose love is real but whose attraction has flattened into familiarity.",
      "Partners curious about energetic contrast, charge, longing, surrender, and directional love.",
      "Relationships that need more spark, edge, or erotic aliveness instead of only more analysis.",
    ],
    principles: [
      "Difference creates charge — too much sameness often softens erotic life.",
      "Presence is magnetic — the body feels directed attention.",
      "Devotion intensifies depth — surrender and steadiness can deepen attraction.",
    ],
    modernCard: {
      title: "Quick card for modern couples",
      body: "Use Polarity when the relationship feels affectionate but flat. It is for the nights when you want more charge, more edge, and a little more delicious tension.",
      tonight: "Let one partner lead the room, the breath, or the first touch for three minutes while the other receives fully without correcting the moment.",
    },
    practices: [
      {
        name: "Lead and Receive",
        body: "Let contrast become conscious. When one leads and one receives, the field often starts to wake up.",
      },
      {
        name: "Charged Eye Contact",
        body: "Look longer than usual and do not soften the charge too quickly with words.",
      },
      {
        name: "Devotional Edge",
        body: "Mix reverence with desire so the relationship feels both safe and alive.",
      },
    ],
    premium:
      "Unlock deeper work on attraction, masculine/feminine energetics, erotic devotion, charged communication, and structured pathways for reigniting long-term spark.",
  },
];

const premiumPaths = [
  { name: "Sacred Desire", icon: Heart, iconClass: "text-rose-300", line: "Erotic intelligence, anticipation, and magnetic aliveness." },
  { name: "Heart Devotion", icon: MoonStar, iconClass: "text-violet-300", line: "Tenderness, reverence, reassurance, and spiritual warmth." },
  { name: "Emotional Repair", icon: Sparkles, iconClass: "text-emerald-300", line: "Returning after distance, shutdown, tension, or hurt." },
  { name: "Energy Mastery", icon: Stars, iconClass: "text-orange-300", line: "Advanced pacing, breath, containment, and sacred sensual skill." },
];

const subNavClass =
  "inline-flex items-center rounded-full border border-border/30 bg-background/45 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/20 hover:text-foreground";

const cardClass =
  "rounded-[28px] border border-border/30 bg-card/45 p-5 shadow-[0_20px_60px_-45px_rgba(255,173,70,0.42)]";

const Paths = () => {
  const [selectedSlug, setSelectedSlug] = useState(freePaths[0].slug);
  const selected = useMemo(() => freePaths.find((path) => path.slug === selectedSlug) ?? freePaths[0], [selectedSlug]);
  const SelectedIcon = selected.icon;

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Library · Paths</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Foundational paths for sacred intimacy</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            This page should feel like Authors: clear choices on the left, real substance on the right, and no empty dead space. Choose a path and go deep without leaving the app.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {libraryTabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className={`${subNavClass} ${tab.to === "/app/paths" ? "border-primary/25 bg-primary/10 text-foreground" : ""}`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-4">
          {freePaths.map((path) => {
            const Icon = path.icon;
            return (
              <button
                key={path.slug}
                type="button"
                onClick={() => setSelectedSlug(path.slug)}
                className={`w-full rounded-[28px] border p-5 text-left transition-all ${selectedSlug === path.slug ? "border-primary/30 bg-primary/10 shadow-[0_18px_50px_-36px_rgba(255,173,70,0.42)]" : "border-border/30 bg-card/45 hover:border-primary/20 hover:bg-card/55"}`}
              >
                <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${path.iconClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-display text-2xl text-foreground">{path.name}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{path.oneLine}</p>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          <section className={cardClass}>
            <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${selected.iconClass}`}>
              <SelectedIcon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-display text-4xl text-foreground">{selected.name}</h2>
            <p className="mt-3 text-base leading-8 text-foreground/90">{selected.oneLine}</p>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="space-y-4">
              <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">What it is</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.what}</p>
              </div>

              <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">What it is not</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.not}</p>
              </div>

              <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Who it helps most</div>
                <div className="mt-4 space-y-3">
                  {selected.helps.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground/90">
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Three core principles</div>
                <div className="mt-3 space-y-3">
                  {selected.principles.map((item, index) => (
                    <div key={item} className="rounded-2xl border border-border/25 bg-card/35 p-4">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-primary/80">Principle {index + 1}</div>
                      <p className="mt-2 text-sm leading-6 text-foreground/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-primary/15 bg-primary/8 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">{selected.modernCard.title}</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.modernCard.body}</p>
                <div className="mt-4 rounded-2xl border border-primary/15 bg-background/45 p-4">
                  <div className="text-[11px] uppercase tracking-[0.14em] text-primary/80">Try this tonight</div>
                  <p className="mt-2 text-sm leading-6 text-foreground/90">{selected.modernCard.tonight}</p>
                </div>
              </div>

              <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Practices inside this path</div>
                <div className="mt-3 space-y-3">
                  {selected.practices.map((practice) => (
                    <div key={practice.name} className="rounded-2xl border border-border/25 bg-card/35 p-4">
                      <div className="font-body text-sm text-foreground">{practice.name}</div>
                      <p className="mt-2 text-sm leading-6 text-foreground/90">{practice.body}</p>
                    </div>
                  ))}
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
            <p className="text-xs uppercase tracking-[0.22em] text-primary/80">More paths in premium</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">More pathways, more depth, more guided progression</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
              Premium opens many more paths and layered progressions for couples who want emotional repair, devotional love, sacred desire, breath-led mastery, and richer bridges from the Library into the Temple.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {premiumPaths.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="rounded-[24px] border border-border/30 bg-background/45 p-4">
                    <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${item.iconClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="mt-3 font-display text-xl text-foreground">{item.name}</div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.line}</p>
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

export default Paths;
