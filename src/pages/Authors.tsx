import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Compass, Feather, Heart, Sparkles, Star, Waves } from "lucide-react";

type Insight = {
  title: string;
  body: string;
};

type Author = {
  slug: string;
  name: string;
  identity: string;
  why: string;
  helps: string[];
  teaching: string;
  insights: Insight[];
  modernCard: {
    title: string;
    body: string;
    tonight: string;
  };
  relatedPath: string;
  premium: string;
  iconClass: string;
};

const authors: Author[] = [
  {
    slug: "richardson",
    name: "Diana Richardson",
    identity: "Slow love, soft presence, stillness, and the healing intelligence of relaxed intimacy.",
    why: "Diana Richardson matters because she gives couples permission to stop forcing intimacy. Her work is deeply relevant to modern relationships that feel rushed, pressured, tired, subtly performance-driven, or emotionally undernourished. She helps lovers discover that stillness can be intimate, slowness can be erotic, and softness can reveal more than effort ever could.",
    helps: [
      "Couples who feel rushed, pressured, or slightly tense even when they care about each other deeply.",
      "Partners who want intimacy to feel safer, slower, softer, and more nourishing to the nervous system.",
      "Relationships where tenderness needs to become stronger than urgency or performance.",
    ],
    teaching: "Slow down enough to feel what is really here. Presence itself is already intimate.",
    insights: [
      { title: "Slowness increases sensitivity", body: "When the body is not being pushed, subtle pleasure and emotional truth have room to appear." },
      { title: "Relaxation can be more intimate than effort", body: "Not every erotic doorway opens through intensity. Some open through safety, breath, and stillness." },
      { title: "Stillness is a practice", body: "When movement softens, awareness deepens. What looked empty often turns out to be full." },
    ],
    modernCard: {
      title: "Quick card for modern couples",
      body: "Read Diana when the relationship is loving but tired, affectionate but not deeply felt, or when intimacy feels too outcome-focused. She is one of the best teachers for couples who want tenderness to become intelligent again.",
      tonight: "Touch only hands, face, shoulders, and hair for two minutes. No escalation. Let tenderness become enough before you ask for more.",
    },
    relatedPath: "Tantra / Heart Devotion",
    premium: "Premium unlocks more slow-intimacy teachings, guided practices, and richer sequences inspired by Richardson’s body of work.",
    iconClass: "text-rose-300",
  },
  {
    slug: "deida",
    name: "David Deida",
    identity: "Polarity, presence, devotion, and the charge that lives between two lovers.",
    why: "David Deida matters because he helps explain one of the hardest modern relationship problems: how love can still exist while erotic charge fades. His work speaks to couples who feel bonded but flat, affectionate but no longer deeply magnetized. He brings language for direction, surrender, edge, truth, and the conscious tension that can make long-term intimacy feel alive again.",
    helps: [
      "Couples whose affection remains but whose attraction has flattened into familiarity.",
      "Partners curious about masculine and feminine energetic dynamics beyond stereotypes.",
      "Relationships that need more spark, depth, and erotic honesty instead of only more explanation.",
    ],
    teaching: "Attraction often grows when energy becomes more conscious, directional, and alive between two people.",
    insights: [
      { title: "Presence is erotic", body: "The body feels the depth of attention it is being met with. Presence itself changes attraction." },
      { title: "Difference matters", body: "Too much sameness can flatten charge. Conscious contrast can wake it back up." },
      { title: "Devotion strengthens desire", body: "Depth and surrender do not weaken attraction. They often make it more meaningful." },
    ],
    modernCard: {
      title: "Quick card for modern couples",
      body: "Read Deida when the relationship feels safe but a little flat, or when you miss edge, tension, anticipation, and the sense that attraction still has a pulse.",
      tonight: "Let one partner lead the first breath, the first touch, and the pace for three minutes while the other receives fully without correcting the moment.",
    },
    relatedPath: "Polarity / Sacred Desire",
    premium: "Premium unlocks more on polarity, attraction, devotion, and advanced pathways for long-term couples who want their love to feel alive again.",
    iconClass: "text-amber-300",
  },
];

const premiumAuthors = [
  { name: "Margot Anand", line: "Ecstatic Tantra, sacred sensual celebration, and pleasure as awakening.", icon: Sparkles, iconClass: "text-fuchsia-300" },
  { name: "Mantak Chia", line: "Taoist energy cultivation, breath, pacing, and sensual longevity.", icon: Waves, iconClass: "text-cyan-300" },
  { name: "Barry Long", line: "Truth, presence, and a less compulsive relationship to desire.", icon: Feather, iconClass: "text-emerald-300" },
  { name: "Jan Day", line: "Body-based intimacy, emotional honesty, and living connection.", icon: Heart, iconClass: "text-violet-300" },
  { name: "Max Bush", line: "Practical sensual exploration and embodied confidence.", icon: Compass, iconClass: "text-amber-300" },
  { name: "Victor Gold", line: "Erotic craft, depth, and refined masculine-feminine exploration.", icon: Star, iconClass: "text-rose-300" },
];

const libraryTabs = [
  { to: "/app/paths", label: "Paths" },
  { to: "/app/authors", label: "Authors" },
  { to: "/app/reconnect", label: "Reconnect" },
];

const subNavClass =
  "inline-flex items-center rounded-full border border-border/30 bg-background/45 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/20 hover:text-foreground";

const cardClass =
  "rounded-[28px] border border-border/30 bg-card/45 p-5 shadow-[0_20px_60px_-45px_rgba(255,173,70,0.42)]";

const Authors = () => {
  const [selectedSlug, setSelectedSlug] = useState(authors[0].slug);
  const selected = useMemo(() => authors.find((author) => author.slug === selectedSlug) ?? authors[0], [selectedSlug]);

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Library · Authors</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Teacher voices that give the paths their soul</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            Teacher pages should do more than name-drop. They should explain why a voice matters, who it helps, what it teaches in plain language, and what a modern couple can take from it tonight.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {libraryTabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className={`${subNavClass} ${tab.to === "/app/authors" ? "border-primary/25 bg-primary/10 text-foreground" : ""}`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-4">
          {authors.map((author) => (
            <button
              key={author.slug}
              type="button"
              onClick={() => setSelectedSlug(author.slug)}
              className={`w-full rounded-[28px] border p-5 text-left transition-all ${selectedSlug === author.slug ? "border-primary/30 bg-primary/10 shadow-[0_18px_50px_-36px_rgba(255,173,70,0.42)]" : "border-border/30 bg-card/45 hover:border-primary/20 hover:bg-card/55"}`}
            >
              <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${author.iconClass}`}>
                <Compass className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-2xl text-foreground">{author.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{author.identity}</p>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <section className={cardClass}>
            <h2 className="font-display text-4xl text-foreground">{selected.name}</h2>
            <p className="mt-3 text-base leading-8 text-foreground/90">{selected.identity}</p>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="space-y-4">
              <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Why this author matters</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.why}</p>
              </div>

              <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Who they help most</div>
                <div className="mt-4 space-y-3">
                  {selected.helps.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground/90">
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-primary/15 bg-primary/8 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Core teaching in plain language</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.teaching}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                <div className="flex items-center gap-2 text-violet-300">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">Essential insights</span>
                </div>
                <div className="mt-3 space-y-3">
                  {selected.insights.map((insight, index) => (
                    <div key={insight.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-primary/80">Insight {index + 1}</div>
                      <div className="mt-2 font-body text-sm text-foreground">{insight.title}</div>
                      <p className="mt-2 text-sm leading-6 text-foreground/90">{insight.body}</p>
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
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Related path</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.relatedPath}</p>
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
            <p className="text-xs uppercase tracking-[0.22em] text-primary/80">More voices in premium</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">Unlock many more authors, many more paths</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
              Premium expands the teacher library with more voices, more nuance, more practices, and stronger bridges from what you learn into what you do together in the Temple.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {premiumAuthors.map((item) => {
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

export default Authors;
