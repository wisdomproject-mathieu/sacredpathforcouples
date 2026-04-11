import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Feather, Heart, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

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
  ritual: string;
  relatedPath: string;
  iconClass: string;
};

const authors: Author[] = [
  {
    slug: "deida",
    name: "David Deida",
    identity: "Polarity, presence, devotion, and the charge that lives between two lovers.",
    why: "David Deida matters when the relationship needs more aliveness, edge, and conscious attraction. His work helps users understand why love can remain while charge fades — and how depth, direction, surrender, and polarity can renew that field.",
    helps: [
      "Couples whose affection remains but whose attraction has flattened into familiarity.",
      "Partners curious about masculine and feminine energetic dynamics beyond clichés.",
      "Relationships that need more spark, depth, and conscious eros rather than only better explanation.",
    ],
    teaching: "Attraction often grows when energy becomes more conscious and more alive between two people.",
    insights: [
      {
        title: "Presence is erotic",
        body: "Desire is not only physical. The body feels the depth of attention it is being met with.",
      },
      {
        title: "Difference matters",
        body: "Too much sameness can soften charge. Conscious contrast can bring life back.",
      },
      {
        title: "Devotion strengthens desire",
        body: "Depth and surrender do not weaken attraction. They often intensify it.",
      },
    ],
    ritual: "Let one partner lead the room, the first breath, and the first touch. Let the other fully receive without managing the moment for three minutes.",
    relatedPath: "Polarity",
    iconClass: "text-amber-300",
  },
  {
    slug: "richardson",
    name: "Diana Richardson",
    identity: "Slow love, soft presence, stillness, and the healing intelligence of relaxed intimacy.",
    why: "Diana Richardson matters when the relationship needs tenderness, nervous-system calm, and a softer way back into the body. She shows that stillness can be deeply intimate and that pressure often blocks the very sensitivity couples are looking for.",
    helps: [
      "Couples who feel rushed, pressured, or subtly performance-driven.",
      "Partners who want intimacy to feel safer, slower, softer, and more nourishing.",
      "Relationships where tenderness needs to become stronger than urgency.",
    ],
    teaching: "Slow down enough to truly feel what is here. Presence itself is already intimate.",
    insights: [
      {
        title: "Slowness increases sensitivity",
        body: "When urgency softens, the body begins to register subtler layers of pleasure and feeling.",
      },
      {
        title: "Relaxation can be more intimate than effort",
        body: "Not every erotic doorway opens through intensity. Some open through softness.",
      },
      {
        title: "Stillness is a practice",
        body: "The absence of rush often reveals more truth than constant movement.",
      },
    ],
    ritual: "Touch only face, hands, shoulders, and hair for two minutes. No escalation. Let tenderness become enough.",
    relatedPath: "Tantra / Heart Devotion",
    iconClass: "text-rose-300",
  },
  {
    slug: "anand",
    name: "Margot Anand",
    identity: "Ecstatic Tantra, sacred sensual celebration, and pleasure as awakening.",
    why: "Margot Anand matters because she makes Tantra feel luminous, embodied, and joyfully alive. She gives the library more radiance, more ritual, more sensual celebration, and more permission to let pleasure become part of sacred intimacy.",
    helps: [
      "Couples drawn to sacred sensuality and erotic celebration.",
      "Partners who want pleasure to feel meaningful rather than mechanical.",
      "Relationships ready for more color, ritual, and ecstatic aliveness.",
    ],
    teaching: "Pleasure becomes transformative when it is approached consciously and given a sacred container.",
    insights: [
      {
        title: "Ecstasy can be spiritual",
        body: "The body is not separate from awakening. It can become one of its doorways.",
      },
      {
        title: "Ritual changes the atmosphere",
        body: "The way lovers enter the moment shapes the whole field that follows.",
      },
      {
        title: "Erotic energy is creative",
        body: "What fuels desire can also fuel vitality, devotion, radiance, and aliveness.",
      },
    ],
    ritual: "Create a sensual altar with light, cloth, music, and breath before any touch begins.",
    relatedPath: "Tantra / Sacred Desire",
    iconClass: "text-fuchsia-300",
  },
  {
    slug: "mantak-chia",
    name: "Mantak Chia",
    identity: "Taoist energy cultivation, breath, pacing, and sensual longevity.",
    why: "Mantak Chia brings body wisdom, pacing, and energetic intelligence into the library. He helps couples understand how intimacy can conserve and circulate vitality rather than only spend it.",
    helps: [
      "Couples drawn to breath, rhythm, pacing, and Taoist body awareness.",
      "Partners who want sensuality to nourish life rather than leave them depleted.",
      "Relationships that need calm, steadiness, and more energetic intelligence.",
    ],
    teaching: "Energy can be cultivated, guided, and circulated rather than only discharged.",
    insights: [
      {
        title: "Breath changes the whole field",
        body: "Breath shapes arousal, regulation, pacing, and presence.",
      },
      {
        title: "Softness improves energy flow",
        body: "When the body is less tense, more vitality can move through it.",
      },
      {
        title: "Conservation is intelligent, not cold",
        body: "What is held more consciously can become steadiness and nourishment.",
      },
    ],
    ritual: "Begin with five lower-belly breaths and let warmth build before intensity does.",
    relatedPath: "Tao",
    iconClass: "text-cyan-300",
  },
  {
    slug: "barry-long",
    name: "Barry Long",
    identity: "Truth, presence, and a less compulsive way of meeting desire.",
    why: "Barry Long matters because he brings honesty into the erotic field. He helps the library avoid becoming only aesthetic or ecstatic by reminding users that truth, presence, and freedom from compulsion matter deeply.",
    helps: [
      "Couples who want more truth and less performance in intimacy.",
      "Users tired of automatic desire patterns driving the relationship.",
      "Partners drawn to spiritual directness and mature presence.",
    ],
    teaching: "When awareness enters desire, the quality of the whole experience changes.",
    insights: [
      {
        title: "Compulsion is not love",
        body: "Intensity alone does not prove depth. It may only prove habit.",
      },
      {
        title: "Presence changes desire",
        body: "What is seen clearly no longer controls in the same way.",
      },
      {
        title: "Honesty is intimate",
        body: "Truth itself can open a deeper field than seduction sometimes can.",
      },
    ],
    ritual: "Before touch, each partner says one plain true sentence about what is actually present in body, heart, or desire.",
    relatedPath: "Tao / Emotional Repair",
    iconClass: "text-emerald-300",
  },
];

const Authors = () => {
  const [selectedSlug, setSelectedSlug] = useState(authors[0].slug);
  const selected = useMemo(() => authors.find((author) => author.slug === selectedSlug) ?? authors[0], [selectedSlug]);

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Author Library</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">The voices behind the paths</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            Teachers matter because they give the paths their voice. Enter here when you want to understand who shaped the wisdom and what each voice can bring to your relationship.
          </p>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-4">
          {authors.map((author) => (
            <button
              key={author.slug}
              type="button"
              onClick={() => setSelectedSlug(author.slug)}
              className={`w-full rounded-[26px] border p-5 text-left transition-all ${selectedSlug === author.slug ? "border-primary/30 bg-primary/10 shadow-[0_18px_50px_-36px_rgba(255,173,70,0.42)]" : "border-border/30 bg-card/45 hover:border-primary/20 hover:bg-card/55"}`}
            >
              <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${author.iconClass}`}>
                <Feather className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-2xl text-foreground">{author.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{author.identity}</p>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <section className="rounded-[30px] border border-border/30 bg-card/45 p-6 md:p-7">
            <h2 className="font-display text-4xl text-foreground">{selected.name}</h2>
            <p className="mt-3 text-base leading-8 text-foreground/90">{selected.identity}</p>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
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

              <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                <div className="flex items-center gap-2 text-fuchsia-300">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">Try this tonight</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">{selected.ritual}</p>
              </div>

              <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
                <div className="flex items-center gap-2 text-amber-300">
                  <Star className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">Related path</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-foreground/90">{selected.relatedPath}</p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Return to the paths</p>
                <h3 className="mt-2 font-display text-2xl text-foreground">Teachers give the path a voice. The path gives the teacher a place.</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Move back and forth between both until the wisdom feels alive in the relationship.
                </p>
              </div>
              <Link to="/app/paths" className="inline-flex items-center gap-2 rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60">
                Return to the path library
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Authors;
