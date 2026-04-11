import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Feather, Lightbulb, Lock, Sparkles, Star } from "lucide-react";

type Insight = {
  title: string;
  body: string;
};

type Author = {
  slug: string;
  name: string;
  identity: string;
  knownFor: string;
  why: string;
  helps: string[];
  teaching: string;
  insights: Insight[];
  takeaway: string;
  ritual: string;
  relatedPaths: string[];
  premiumDepth: string;
  iconClass: string;
};

const authors: Author[] = [
  {
    slug: "deida",
    name: "David Deida",
    identity: "Teacher of polarity, depth, presence, and the electric tension between complementary energies.",
    knownFor: "Explaining why attraction can weaken inside good relationships — and how conscious energetic difference can renew it.",
    why: "David Deida matters because he names a subtle truth many couples feel but do not know how to describe: love may still be present, but the charge has faded. His work helps users explore devotion, direction, surrender, edge, courage, and the difference between emotional safety and erotic aliveness. He is useful when the relationship needs more spark, more truth, and more conscious energetic movement.",
    helps: [
      "Couples who love each other but feel that attraction has become softer, flatter, or less alive.",
      "Partners curious about masculine and feminine dynamics beyond clichés and surface-level dating advice.",
      "Couples who want to reawaken desire without descending into chaos, immaturity, or emotional games.",
      "Users drawn to themes like presence, surrender, leadership, devotion, and conscious eros.",
    ],
    teaching: "Attraction often grows when energy becomes more conscious, more directional, and more alive between two people.",
    insights: [
      {
        title: "Presence is erotic",
        body: "When someone is fully present, the nervous system feels them differently. Desire is not only about body; it is also about depth of attention.",
      },
      {
        title: "Difference matters",
        body: "Many couples lose spark not because they stopped loving each other, but because all energetic difference was flattened into sameness or management.",
      },
      {
        title: "Devotion is not weakness",
        body: "Deeper erotic life often asks for more truth, more courage, and more willingness to offer oneself fully rather than strategically.",
      },
    ],
    takeaway: "Do not assume that communication alone restores chemistry. Sometimes the relationship needs more aliveness, not just more explanation.",
    ritual: "One partner leads the room, the first breath, and the first touch. The other releases management and receives fully for three minutes. Then switch and compare the internal shift.",
    relatedPaths: ["Polarity", "Sacred Desire"],
    premiumDepth: "Unlock deeper polarity teachings, attraction renewal sequences, devotional eros practices, and more advanced contrast-based rituals.",
    iconClass: "text-amber-300",
  },
  {
    slug: "richardson",
    name: "Diana Richardson",
    identity: "Teacher of slow love, stillness, tenderness, and the healing intelligence of relaxed intimacy.",
    knownFor: "Showing couples that soft presence can be more intimate than urgency, and stillness can be more erotic than effort.",
    why: "Diana Richardson matters because she offers a direct antidote to rushed, pressured, performance-based intimacy. She helps couples rediscover that closeness does not need to be dramatic to be profound. Her work appeals strongly to couples who want the body to soften, the nervous system to calm, and the emotional field to become safer, more tender, and more sensitive.",
    helps: [
      "Couples who want slower, more healing, more emotionally attuned sensuality.",
      "Partners exhausted by pressure, overstimulation, or the feeling that intimacy must always build toward a goal.",
      "People who suspect that tenderness and stillness might hold more depth than friction and urgency.",
      "Couples who want sensuality to feel safe, nourishing, and deeply embodied.",
    ],
    teaching: "Slow down enough to truly feel. Presence itself is already intimate.",
    insights: [
      {
        title: "Slowness reveals sensation",
        body: "When you stop rushing, the body begins to register subtler layers of pleasure, emotion, and connection that were previously missed.",
      },
      {
        title: "Relaxation is not less erotic",
        body: "Many people have learned to equate arousal with effort or friction. Richardson shows that relaxation can actually deepen sensual aliveness.",
      },
      {
        title: "Presence is the first gift",
        body: "The most intimate thing is often not what you do, but the quality of how you are there while doing it.",
      },
    ],
    takeaway: "When pressure leaves, the body often becomes more honest, more sensitive, and more willing to open.",
    ritual: "Touch only face, hands, shoulders, and hair for two minutes. No escalation. No agenda. Let the body relearn that tenderness can be enough.",
    relatedPaths: ["Tantra", "Heart Devotion"],
    premiumDepth: "Unlock deeper slow-intimacy teachings, stillness rituals, soft-entry practices, and more nervous-system-friendly sensual pathways.",
    iconClass: "text-rose-300",
  },
  {
    slug: "anand",
    name: "Margot Anand",
    identity: "Teacher of ecstatic Tantra, sacred sensual celebration, and pleasure as awakening.",
    knownFor: "Bringing more radiance, joy, erotic creativity, and ritualized beauty into Tantric intimacy.",
    why: "Margot Anand matters because she helps Tantra feel alive, celebratory, and sensually inviting. Her voice allows the library to include not only seriousness and presence, but also ecstasy, color, pleasure, and luminous ritual. She is an important bridge for users who want intimacy to feel sacred without becoming austere.",
    helps: [
      "Couples who want sacred sensuality to feel radiant, warm, and inviting.",
      "Partners drawn to pleasure-positive spiritual language and ritualized intimacy.",
      "Couples who want more joy, play, and expansiveness inside sacred erotic experience.",
      "Users who want to transform sexual energy into something creative and whole-life enriching.",
    ],
    teaching: "Pleasure becomes transformative when it is conscious, intentional, and woven into the whole being.",
    insights: [
      {
        title: "Ecstasy is not separate from spirit",
        body: "Sacred sensuality does not need to split pleasure and awakening. The body can become one of the places where awakening is felt.",
      },
      {
        title: "Ritual creates intensity",
        body: "Preparation, symbolism, and atmosphere can increase meaning before a single touch even begins.",
      },
      {
        title: "Erotic energy is creative energy",
        body: "The same energy that fuels desire can also fuel vitality, devotion, expression, and aliveness in the whole relationship.",
      },
    ],
    takeaway: "Pleasure deepens when it is no longer treated as a short peak, but as a current allowed to expand through the whole experience.",
    ritual: "Create a small sensual altar: light, cloth, scent, music. Begin with breath before touch. Let the environment itself prepare the body for sacred attention.",
    relatedPaths: ["Tantra", "Sacred Desire"],
    premiumDepth: "Unlock ecstatic Tantra journeys, ritual design, sensual altar practices, and deeper pleasure-based sacred content.",
    iconClass: "text-fuchsia-300",
  },
  {
    slug: "mantak-chia",
    name: "Mantak Chia",
    identity: "Teacher of Taoist energy cultivation, breath, pacing, and sensual longevity.",
    knownFor: "Helping people understand intimacy as something that can nourish vitality rather than only consume it.",
    why: "Mantak Chia matters because he gives Sacred Path a more structured Taoist body-wisdom dimension. He helps users see that breath, rhythm, conservation, and circulation are not abstract ideas; they can become practical ways to make intimacy steadier, calmer, and more energizing. His work is especially valuable for couples who feel drained by intensity or want more refined pacing.",
    helps: [
      "Couples interested in Taoist body wisdom, breath, and subtle energetic practice.",
      "Partners who want calm, rhythm, pacing, and sustainability in sensual life.",
      "Users who want sensuality to generate vitality rather than depletion.",
      "Couples who want to move from urgency to wise embodied timing.",
    ],
    teaching: "Energy can be cultivated, contained, and circulated rather than only discharged.",
    insights: [
      {
        title: "Breath changes the whole field",
        body: "Breathing pattern shapes arousal, emotion, pacing, and nervous-system regulation far more than most couples realize.",
      },
      {
        title: "Conservation is not denial",
        body: "Holding energy more consciously is not about repression; it is about learning how to work with vitality more intelligently.",
      },
      {
        title: "Softness improves power",
        body: "When the body is less tense, energy often moves more efficiently and pleasure becomes more sustainable.",
      },
    ],
    takeaway: "The body frequently opens more when it is guided by breath and rhythm instead of pushed by urgency.",
    ritual: "Begin with five lower-belly breaths together. Keep shoulders, jaw, and pelvic floor soft. Let warmth build before intensity rises.",
    relatedPaths: ["Tao", "Energy Mastery"],
    premiumDepth: "Unlock Taoist partner breathwork, pacing methods, energy circulation, and longer sensual longevity practices.",
    iconClass: "text-cyan-300",
  },
  {
    slug: "barry-long",
    name: "Barry Long",
    identity: "Teacher of truth, presence, and a less compulsive approach to love and desire.",
    knownFor: "Bringing honesty, clarity, and spiritual directness into sensual life.",
    why: "Barry Long matters because he prevents Sacred Path from becoming only aesthetic or euphoric. He brings truth into the room. His lens helps users ask whether intimacy is being led by habit, craving, performance, or genuine presence. He is valuable for couples who want to clean up the inner atmosphere of desire, not just intensify it.",
    helps: [
      "Couples who want more truth and less performance in intimacy.",
      "Users tired of unconscious habit driving erotic life.",
      "Partners drawn to spiritual maturity and directness.",
      "Couples willing to trade fantasy for something cleaner, deeper, and more awake.",
    ],
    teaching: "When awareness enters desire, the quality of the whole experience changes.",
    insights: [
      {
        title: "Compulsion is not love",
        body: "Intensity alone does not prove depth. Sometimes it only proves habit, anxiety, or unexamined craving.",
      },
      {
        title: "Presence changes desire",
        body: "When you stop moving automatically, desire stops feeling like a reflex and starts revealing its real texture.",
      },
      {
        title: "Honesty is intimate",
        body: "Truth itself can open a deeper form of closeness than seduction sometimes can.",
      },
    ],
    takeaway: "Pause before you move automatically. Clear seeing is often the first sacred act.",
    ritual: "Before any touch, each partner says one plain true sentence about what is actually present in body, heart, or desire. No decoration.",
    relatedPaths: ["Tao", "Emotional Repair", "Sacred Desire"],
    premiumDepth: "Unlock deeper teachings on truth, lust, love, honesty, presence, and conscious adult intimacy.",
    iconClass: "text-emerald-300",
  },
];

const Authors = () => {
  const [selectedSlug, setSelectedSlug] = useState(authors[0].slug);
  const selected = useMemo(
    () => authors.find((author) => author.slug === selectedSlug) ?? authors[0],
    [selectedSlug]
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Library · Authors</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Teachers with depth, not just names</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            A strong author page should quickly answer three things: why this teacher matters, what they help with, and what the couple can try tonight.
          </p>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-4">
          {authors.map((author) => {
            const active = selectedSlug === author.slug;
            return (
              <button
                key={author.slug}
                type="button"
                onClick={() => setSelectedSlug(author.slug)}
                className={`w-full rounded-[28px] border p-5 text-left transition-all ${
                  active
                    ? "border-primary/30 bg-primary/10 shadow-[0_18px_50px_-36px_rgba(255,173,70,0.42)]"
                    : "border-border/30 bg-card/45 hover:border-primary/20 hover:bg-card/55"
                }`}
              >
                <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${author.iconClass}`}>
                  <Feather className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-display text-2xl text-foreground">{author.name}</h2>
                <p className="mt-2 text-sm text-foreground/90">{author.identity}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{author.knownFor}</p>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          <section className="rounded-[30px] border border-border/30 bg-card/45 p-6 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${selected.iconClass}`}>
                <Feather className="h-6 w-6" />
              </div>
              <div className="rounded-full border border-border/30 bg-background/55 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-emerald-300">
                Foundational teacher
              </div>
            </div>
            <h2 className="mt-4 font-display text-4xl text-foreground">{selected.name}</h2>
            <p className="mt-2 text-base text-foreground/90">{selected.identity}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{selected.knownFor}</p>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="space-y-4">
              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Why this author matters</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.why}</p>
              </div>

              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
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

              <div className="rounded-[26px] border border-primary/15 bg-primary/8 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Core teaching in plain language</div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.teaching}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="flex items-center gap-2 text-violet-300">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">Essential insights</span>
                </div>
                <div className="mt-3 space-y-3">
                  {selected.insights.map((insight, index) => (
                    <div key={insight.title} className="rounded-2xl border border-border/25 bg-background/45 p-4">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-primary/80">Insight {index + 1}</div>
                      <div className="mt-2 font-body text-sm text-foreground">{insight.title}</div>
                      <p className="mt-2 text-sm leading-6 text-foreground/90">{insight.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="flex items-center gap-2 text-amber-300">
                  <Lightbulb className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">Useful takeaway</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.takeaway}</p>
              </div>

              <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
                <div className="flex items-center gap-2 text-fuchsia-300">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">Try this tonight</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.ritual}</p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[26px] border border-border/30 bg-card/45 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Related paths</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selected.relatedPaths.map((path) => (
                  <span key={path} className="rounded-full border border-border/30 bg-background/45 px-3 py-1 text-xs text-muted-foreground">
                    {path}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-amber-400/15 bg-amber-500/6 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-amber-300">Go deeper</div>
              <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.premiumDepth}</p>
            </div>
          </section>

          <section className="rounded-[30px] border border-border/30 bg-card/45 p-6 md:p-7">
            <div className="mb-5">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Premium author depth</p>
              <h3 className="mt-2 font-display text-3xl text-foreground">More depth, more teaching, more usable wisdom</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                "Extended teaching collections",
                "Longer guided interpretations",
                "Author-led practice sequences",
                "Advanced study journeys",
              ].map((block) => (
                <div key={block} className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 text-violet-300">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full border border-border/30 bg-card/35 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      <Lock className="h-3 w-3" /> Premium
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-foreground/90">{block}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Bridge into action</p>
                <h3 className="mt-2 font-display text-2xl text-foreground">Take the teacher’s lens back into the relationship</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The author page should always lead the user toward practice, not leave them only with admiration.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/app/paths" className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-4 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60">
                  Explore paths <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/app/space" className="inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/12 px-4 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16">
                  Open the Temple <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Authors;
