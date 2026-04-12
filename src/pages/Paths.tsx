import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Crown,
  Flame,
  Lock,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";

type Pillar = {
  name: string;
  body: string;
};

type Block = {
  title: string;
  body: string;
};

type Practice = {
  title: string;
  setup: string;
  steps: string[];
  integration: string;
};

type RelatedAuthor = {
  name: string;
  tier: "free" | "premium";
  note: string;
};

type PathContent = {
  hero: string[];
  quote: {
    text: string;
    source: string;
  };
  whatItIsNot: string[];
  pillars: Pillar[];
  modernCouples: Block[];
  misunderstandings: Block[];
  practices: Practice[];
  reflections: string[];
  relatedAuthors: RelatedAuthor[];
  premiumBanner: string;
};

type PathDetail = {
  slug: string;
  name: string;
  oneLine: string;
  overviewLine: string;
  icon: LucideIcon;
  iconClass: string;
  content: PathContent;
};

const libraryTabs = [
  { to: "/app/paths", label: "Paths" },
  { to: "/app/authors", label: "Authors" },
  { to: "/app/reconnect", label: "Reconnect" },
];

const pathDetails: PathDetail[] = [
  {
    slug: "tantra",
    name: "Tantric Wisdom",
    oneLine: "A sacred-intimate path that unites breath, presence, polarity, and devotion.",
    overviewLine:
      "For couples who want intimacy to feel conscious, embodied, and spiritually alive.",
    icon: Sparkles,
    iconClass: "text-fuchsia-300",
    content: {
      hero: [
        "Tantric Wisdom is a path of integration. It does not separate desire from consciousness, or tenderness from intensity. Instead, it teaches couples to stay present with the full spectrum of intimacy: longing, pleasure, vulnerability, fear, devotion, and silence.",
        "In a modern context, this means replacing rushed intimacy with intelligent pacing. The goal is not to perform spirituality; the goal is to become more honest, more embodied, and more relationally awake together.",
      ],
      quote: {
        text: "Tantra matures intimacy by turning attention into devotion and sensation into awareness.",
        source: "Sacred Path Tantric Wisdom summary",
      },
      whatItIsNot: [
        "It is not spiritual decoration layered on top of the same old disconnection.",
        "It is not a pressure to be endlessly intense, erotic, or emotionally perfect.",
        "It is not an excuse to bypass consent, pacing, or emotional responsibility.",
      ],
      pillars: [
        {
          name: "Presence",
          body: "Staying here, now, with what is real in the body and heart instead of escaping into performance.",
        },
        {
          name: "Breath",
          body: "Using breath as the central regulator of emotion, arousal, and nervous-system safety.",
        },
        {
          name: "Polarity",
          body: "Creating conscious energetic contrast so desire has room to move and magnetize.",
        },
        {
          name: "Devotion",
          body: "Meeting intimacy with reverence so erotic energy is held with care and meaning.",
        },
        {
          name: "Embodied Awareness",
          body: "Tracking sensation, boundaries, and truth directly in the body before stories take over.",
        },
      ],
      modernCouples: [
        {
          title: "When love is strong but connection feels mechanical",
          body: "Use Tantric micro-rituals to move from task mode into embodied presence before intimacy begins.",
        },
        {
          title: "When one partner wants depth and the other feels pressure",
          body: "Tantric pacing lets both partners stay in consent while still increasing emotional and erotic depth over time.",
        },
        {
          title: "When stress kills desire",
          body: "Breath and body-led regulation can reopen closeness without forcing chemistry.",
        },
      ],
      misunderstandings: [
        {
          title: "'Tantra means endless intensity'",
          body: "Real Tantra includes stillness, pauses, and receptive listening, not constant escalation.",
        },
        {
          title: "'Tantra is only sexual technique'",
          body: "Technique matters less than attention quality, emotional truth, and relational integrity.",
        },
        {
          title: "'Tantra removes conflict'",
          body: "It does not remove friction; it gives couples tools to meet friction consciously.",
        },
      ],
      practices: [
        {
          title: "Arrival Ritual (6 minutes)",
          setup: "Sit face to face. No fixing, no agenda, just arrival.",
          steps: [
            "Place one hand on your heart and one on your partner's hand.",
            "Breathe in sync for 10 rounds.",
            "Each partner names one feeling and one desire for the evening.",
          ],
          integration: "Use before intimacy or difficult conversations.",
        },
        {
          title: "Three-Phase Breath (8 minutes)",
          setup: "Stay seated or lying side-by-side.",
          steps: [
            "Phase 1: low belly breathing for regulation.",
            "Phase 2: chest breathing for emotional opening.",
            "Phase 3: whole-body breathing with soft eye contact.",
          ],
          integration: "Builds shared rhythm and emotional coherence.",
        },
        {
          title: "Devotional Touch Round (10 minutes)",
          setup: "One partner offers touch, the other receives with clear verbal feedback.",
          steps: [
            "Giver offers slow touch to non-genital zones.",
            "Receiver responds with 'more', 'lighter', 'pause', or 'yes'.",
            "Switch after five minutes.",
          ],
          integration: "Strengthens consent, trust, and erotic attunement.",
        },
      ],
      reflections: [
        "Where in our intimacy do we rush instead of arrive?",
        "Which pillar feels strongest for us right now, and which needs cultivation?",
        "What would devotion look like in one concrete action this week?",
        "How can we bring more embodied awareness into conflict repair?",
      ],
      relatedAuthors: [
        { name: "Osho", tier: "free", note: "Awareness-based intimacy and meditative witnessing." },
        { name: "David Deida", tier: "free", note: "Polarity and devotional edge." },
        { name: "Margot Anand", tier: "premium", note: "Ecstatic ritual and sacred sensual celebration." },
      ],
      premiumBanner:
        "Unlock full Tantric Wisdom journeys with guided audio practices, chakra-informed partner rituals, and progressive modules from beginner to advanced integration.",
    },
  },
  {
    slug: "tao",
    name: "Tao",
    oneLine: "Flow, breath, and sensual longevity that leaves both partners nourished.",
    overviewLine:
      "For couples who want calm intensity, better pacing, and energy that replenishes.",
    icon: Waves,
    iconClass: "text-cyan-300",
    content: {
      hero: [
        "Tao is the art of moving with life instead of against it. In intimacy, Tao invites couples to soften, slow down, and circulate energy so closeness feels sustainable rather than draining.",
        "This path is especially valuable for modern couples living under stress load. Tao restores rhythm: breath, warmth, pacing, and body awareness that can convert pressure into pleasure and nervous-system steadiness.",
      ],
      quote: {
        text: "Taoist intimacy is less about peak moments and more about leaving each encounter more alive than before.",
        source: "Sacred Path Tao summary",
      },
      whatItIsNot: [
        "It is not repression or denial of erotic fire.",
        "It is not passive disengagement disguised as calm.",
        "It is not only solo energy work; it is relational skill in shared rhythm.",
      ],
      pillars: [
        {
          name: "Softness",
          body: "Muscular softness allows sensation and emotion to circulate without collapse.",
        },
        {
          name: "Breath Rhythm",
          body: "Breath sets pace, regulates arousal, and prevents nervous-system overload.",
        },
        {
          name: "Conservation",
          body: "Retaining and distributing energy supports vitality and long-term erotic resilience.",
        },
        {
          name: "Circulation",
          body: "Attention moves through the whole body so pleasure is distributed rather than localized and depleted.",
        },
        {
          name: "Nourishment",
          body: "The metric is not performance but how restored both partners feel afterward.",
        },
      ],
      modernCouples: [
        {
          title: "For high-stress seasons",
          body: "Tao practices lower activation quickly so connection remains possible even when life is intense.",
        },
        {
          title: "For mismatched desire cycles",
          body: "Breath and pacing reduce pressure while preserving intimacy and erotic respect.",
        },
        {
          title: "For burnout recovery",
          body: "Tao rebuilds sensual vitality through gradual, repeatable regulation instead of force.",
        },
      ],
      misunderstandings: [
        {
          title: "'Slow means boring'",
          body: "Slow pacing increases sensitivity; it usually deepens feeling rather than dulling it.",
        },
        {
          title: "'Conservation means withholding'",
          body: "Conservation is about circulation and stewardship, not emotional distance.",
        },
        {
          title: "'Tao is anti-passion'",
          body: "Tao refines passion so it can be sustained instead of burning out quickly.",
        },
      ],
      practices: [
        {
          title: "Lower Belly Sync (5 minutes)",
          setup: "Lie side by side and place a hand on each other's lower abdomen.",
          steps: [
            "Inhale for a count of 4 into the lower belly.",
            "Exhale for a count of 6.",
            "Stay with eye softness and minimal words.",
          ],
          integration: "A strong reset after conflict or long workdays.",
        },
        {
          title: "Orbit of Warmth (8 minutes)",
          setup: "Sit or stand with gentle contact.",
          steps: [
            "Guide attention through chest, belly, pelvis, spine, and back to chest.",
            "Breathe with each zone for 3 rounds.",
            "Name one place where warmth increased.",
          ],
          integration: "Builds whole-body sensuality and calm arousal.",
        },
        {
          title: "Soft Rhythm Exchange (10 minutes)",
          setup: "Choose one non-goal touch pattern.",
          steps: [
            "Partner A leads a very slow rhythm for five minutes.",
            "Partner B mirrors exactly, then switch.",
            "Keep intensity under 6/10.",
          ],
          integration: "Trains pacing and prevents rush dynamics.",
        },
      ],
      reflections: [
        "What habits deplete us during intimacy?",
        "Where could we replace urgency with rhythm?",
        "How does my body signal that I need slower pacing?",
        "What helps me feel nourished after closeness?",
      ],
      relatedAuthors: [
        { name: "Mantak Chia", tier: "premium", note: "Taoist alchemy and energy circulation." },
        { name: "Osho", tier: "free", note: "Awareness and embodied emotional release." },
        { name: "Michaela Boehm", tier: "premium", note: "Somatic regulation in relationship." },
      ],
      premiumBanner:
        "Unlock advanced Tao modules for partner breathing sequences, circulation maps, sensual longevity training, and vitality-focused integration plans.",
    },
  },
  {
    slug: "kama-sutra",
    name: "Kama Sutra",
    oneLine: "The art of cultivated desire, atmosphere, and elegant erotic expression.",
    overviewLine:
      "For couples who want intimacy to feel beautiful, intentional, and playfully alive.",
    icon: Crown,
    iconClass: "text-amber-300",
    content: {
      hero: [
        "Kama Sutra is a refined relational art, not a checklist of positions. It includes atmosphere, language, aesthetics, pacing, anticipation, and emotional tone. It teaches couples how to cultivate desire before touch begins.",
        "In modern relationships, this path restores courtship energy inside commitment. It helps partners move from purely functional routines to sensual experiences that feel designed, meaningful, and alive.",
      ],
      quote: {
        text: "The erotic field begins in attention, environment, and anticipation long before physical climax.",
        source: "Sacred Path Kama Sutra summary",
      },
      whatItIsNot: [
        "It is not a performance competition.",
        "It is not acrobatics without emotional attunement.",
        "It is not reduced to novelty for novelty's sake.",
      ],
      pillars: [
        {
          name: "Atmosphere",
          body: "Lighting, scent, texture, and tone shape the nervous system before touch.",
        },
        {
          name: "Anticipation",
          body: "Desire deepens through pacing and playful delay.",
        },
        {
          name: "Aesthetic Attention",
          body: "Beauty and intentionality make intimacy feel chosen, not automatic.",
        },
        {
          name: "Communication",
          body: "Flirtation, verbal cues, and emotional responsiveness guide the experience.",
        },
        {
          name: "Embodied Play",
          body: "Erotic expression becomes exploratory and relational, not rigidly goal-driven.",
        },
      ],
      modernCouples: [
        {
          title: "When partnership has become logistical",
          body: "Kama Sutra helps reintroduce courtship and sensual intention into daily life.",
        },
        {
          title: "When attraction needs novelty with depth",
          body: "This path offers structured play that remains emotionally connected.",
        },
        {
          title: "When intimacy lacks mood and romance",
          body: "Atmosphere design can reawaken desire without pressure.",
        },
      ],
      misunderstandings: [
        {
          title: "'It's all about positions'",
          body: "Positions are one small part of a larger relational aesthetic and emotional art.",
        },
        {
          title: "'Refinement is superficial'",
          body: "Refinement can increase safety, anticipation, and embodied confidence.",
        },
        {
          title: "'Play undermines seriousness'",
          body: "Play often restores tenderness and spontaneity in long-term bonds.",
        },
      ],
      practices: [
        {
          title: "Atmosphere Reset (15 minutes)",
          setup: "Prepare one intentional sensory element each.",
          steps: [
            "One partner sets lighting and texture.",
            "One partner chooses scent or music.",
            "Enter the space in silence for 60 seconds before speaking.",
          ],
          integration: "Creates a ritual bridge from daily mode to erotic mode.",
        },
        {
          title: "Anticipation Dialogue (8 minutes)",
          setup: "Face each other and keep touch minimal.",
          steps: [
            "Each partner shares three things they find attractive right now.",
            "Each partner names one boundary and one invitation.",
            "Close with one sentence: 'Tonight I want to savor…'.",
          ],
          integration: "Improves consent and builds playful charge.",
        },
        {
          title: "Mood-Led Touch Sequence (10 minutes)",
          setup: "Choose a mood word: playful, devotional, mischievous, or reverent.",
          steps: [
            "Let touch style follow the mood for five minutes.",
            "Switch giver/receiver and keep same mood.",
            "End with one reflection each.",
          ],
          integration: "Teaches couples to use touch as expression, not only stimulation.",
        },
      ],
      reflections: [
        "What atmosphere helps me feel most open and desired?",
        "Where has practicality replaced courtship in our relationship?",
        "What kind of erotic play feels both exciting and safe for us?",
        "How can we keep beauty and consent equally central?",
      ],
      relatedAuthors: [
        { name: "Margot Anand", tier: "premium", note: "Ecstatic sensual ritual and celebration." },
        { name: "Daniel Odier", tier: "premium", note: "Subtle contemplative intimacy." },
        { name: "David Deida", tier: "free", note: "Polarity and devotional intensity." },
      ],
      premiumBanner:
        "Unlock advanced Kama Sutra pathways with intentional position progressions, anticipation rituals, and refined sensual design frameworks for modern couples.",
    },
  },
  {
    slug: "polarity",
    name: "Polarity",
    oneLine: "Conscious energetic contrast that restores magnetic charge in long-term love.",
    overviewLine:
      "For couples who are affectionate but miss tension, direction, and erotic aliveness.",
    icon: Flame,
    iconClass: "text-rose-300",
    content: {
      hero: [
        "Polarity explores the erotic intelligence of difference. It helps couples understand why emotional closeness can increase while desire declines, then offers practical ways to restore charge through contrast, direction, receptivity, and devotion.",
        "In Sacred Path, polarity is not rigid role assignment. It is conscious relational choreography where both partners can practice leading, receiving, and creating dynamic tension with consent and care.",
      ],
      quote: {
        text: "Erotic charge often returns when partners stop flattening difference and start honoring it consciously.",
        source: "Sacred Path Polarity summary",
      },
      whatItIsNot: [
        "It is not domination without attunement.",
        "It is not gender essentialism.",
        "It is not permission for emotional roughness or bypassed repair.",
      ],
      pillars: [
        {
          name: "Directed Presence",
          body: "Intentional attention creates safety and arousal at the same time.",
        },
        {
          name: "Conscious Contrast",
          body: "Difference in rhythm, energy, and expression generates magnetism.",
        },
        {
          name: "Receptive Depth",
          body: "Receiving becomes active, responsive, and emotionally alive.",
        },
        {
          name: "Devotional Intention",
          body: "Charge stays relational when rooted in care, reverence, and consent.",
        },
        {
          name: "Truthful Communication",
          body: "Erotic honesty keeps the field clean; hidden resentment collapses polarity.",
        },
      ],
      modernCouples: [
        {
          title: "For affectionate-but-flat relationships",
          body: "Polarity drills can reintroduce anticipation and erotic edge without destabilizing trust.",
        },
        {
          title: "For over-analytical dynamics",
          body: "Embodied leading/receiving interrupts endless verbal loops and restores felt connection.",
        },
        {
          title: "For desire mismatch",
          body: "Energetic contrast often creates new pathways for desire that words alone cannot.",
        },
      ],
      misunderstandings: [
        {
          title: "'Polarity means fixed roles forever'",
          body: "Healthy polarity is flexible and negotiated, not rigid identity assignment.",
        },
        {
          title: "'More intensity is always better'",
          body: "Without regulation and consent, intensity becomes overwhelm, not intimacy.",
        },
        {
          title: "'Conflict will disappear'",
          body: "Polarity doesn't erase conflict; it can make repair and desire more honest.",
        },
      ],
      practices: [
        {
          title: "Lead / Receive Round (8 minutes)",
          setup: "Agree on a clear leader for round one.",
          steps: [
            "Leader sets breath, posture, and pace for four minutes.",
            "Receiver follows while tracking inner response.",
            "Switch roles and repeat.",
          ],
          integration: "Builds trust in energetic contrast.",
        },
        {
          title: "Charged Eye Contact (5 minutes)",
          setup: "Sit close and maintain relaxed shoulders.",
          steps: [
            "Hold gaze with slow exhale.",
            "Name one desire without explanation.",
            "Respond with one boundary and one invitation.",
          ],
          integration: "Combines honesty with erotic tension.",
        },
        {
          title: "Devotional Edge Script (10 minutes)",
          setup: "Use structured speaking turns.",
          steps: [
            "Partner A: 'I desire… I fear… I commit…'.",
            "Partner B mirrors and responds with same format.",
            "Close with one embodied action in the next 24 hours.",
          ],
          integration: "Prevents charge from drifting into confusion.",
        },
      ],
      reflections: [
        "Where has sameness replaced healthy energetic contrast for us?",
        "What forms of leading and receiving feel exciting and safe?",
        "How do we keep polarity connected to devotion rather than control?",
        "What truth would most improve our erotic connection this week?",
      ],
      relatedAuthors: [
        { name: "David Deida", tier: "free", note: "Directed presence and polarity frameworks." },
        { name: "Michaela Boehm", tier: "premium", note: "Embodied charge and nervous-system awareness." },
        { name: "Osho", tier: "free", note: "Awareness and emotional witnessing inside intensity." },
      ],
      premiumBanner:
        "Unlock full polarity pathways with guided drills, communication scripts, and sequenced progression plans for couples rebuilding long-term erotic magnetism.",
    },
  },
];

const subNavClass =
  "inline-flex items-center rounded-full border border-border/30 bg-background/45 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/20 hover:text-foreground";

const shellCardClass =
  "rounded-[28px] border border-border/30 bg-card/45 p-5 shadow-[0_24px_70px_-45px_rgba(255,173,70,0.46)]";

const tierBadgeClass: Record<"free" | "premium", string> = {
  free: "border-emerald-400/30 bg-emerald-500/12 text-emerald-200",
  premium: "border-amber-400/30 bg-amber-500/12 text-amber-200",
};

const TierBadge = ({ tier }: { tier: "free" | "premium" }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${tierBadgeClass[tier]}`}>
    {tier}
  </span>
);

const PathHeroCard = ({ path }: { path: PathDetail }) => {
  const Icon = path.icon;

  return (
    <section className={shellCardClass}>
      <div className={`inline-flex rounded-2xl border border-border/30 bg-background/55 p-3 ${path.iconClass}`}>
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="mt-4 font-display text-3xl text-foreground">{path.name}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{path.oneLine}</p>
      <p className="mt-3 text-sm leading-6 text-foreground/90">{path.overviewLine}</p>
    </section>
  );
};

const RelatedPathsCard = ({
  selectedSlug,
  onSelect,
}: {
  selectedSlug: string;
  onSelect: (slug: string) => void;
}) => (
  <section className={shellCardClass}>
    <div className="flex items-center justify-between gap-3">
      <h3 className="font-display text-xl text-foreground">Related Paths</h3>
      <BookOpen className="h-4 w-4 text-primary/80" />
    </div>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">
      Move across the library without losing context.
    </p>

    <div className="mt-4 space-y-2">
      {pathDetails.map((path) => {
        const isSelected = path.slug === selectedSlug;
        return (
          <button
            key={path.slug}
            type="button"
            onClick={() => onSelect(path.slug)}
            className={`w-full rounded-2xl border p-3 text-left transition-all ${
              isSelected
                ? "border-primary/30 bg-primary/10"
                : "border-border/25 bg-background/45 hover:border-primary/20 hover:bg-card/55"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-body text-sm text-foreground">{path.name}</div>
                <div className="mt-1 text-xs leading-5 text-muted-foreground">{path.oneLine}</div>
              </div>
              <ChevronRight className="h-4 w-4 text-primary/70" />
            </div>
          </button>
        );
      })}
    </div>
  </section>
);

const PremiumMiniCard = () => (
  <section className="rounded-[24px] border border-amber-400/20 bg-gradient-to-br from-amber-500/14 via-background to-background p-4">
    <div className="flex items-center gap-2 text-amber-200">
      <Lock className="h-4 w-4" />
      <span className="text-xs uppercase tracking-[0.16em]">Premium</span>
    </div>
    <p className="mt-3 text-sm leading-6 text-foreground/90">
      Unlock deeper path libraries, guided practice arcs, and richer author cross-links.
    </p>
    <Link
      to="/pricing"
      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-500/14 px-3 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
    >
      View premium
      <ArrowRight className="h-4 w-4" />
    </Link>
  </section>
);

const PathContentView = ({ path }: { path: PathDetail }) => {
  const data = path.content;

  return (
    <main className="space-y-5">
      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">1. What {path.name} Really Is</p>
        <h3 className="mt-2 font-display text-3xl text-foreground">{path.name}</h3>
        <div className="mt-4 space-y-3 text-sm leading-7 text-foreground/90">
          {data.hero.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <blockquote className="mt-5 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm leading-7 text-foreground/90">
          “{data.quote.text}”
          <footer className="mt-2 text-xs uppercase tracking-[0.14em] text-primary/80">{data.quote.source}</footer>
        </blockquote>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">2. What {path.name} Is Not</p>
        <div className="mt-4 space-y-3">
          {data.whatItIsNot.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground/90">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">3. The 5 Pillars</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {data.pillars.map((pillar, index) => (
            <article key={pillar.name} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-primary/80">Pillar {index + 1}</p>
              <h4 className="mt-2 font-body text-sm text-foreground">{pillar.name}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">4. {path.name} For Modern Couples</p>
        <div className="mt-4 space-y-3">
          {data.modernCouples.map((item) => (
            <article key={item.title} className="rounded-2xl border border-primary/20 bg-background/50 p-4">
              <h4 className="font-body text-sm text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">5. Common Misunderstandings</p>
        <div className="mt-4 space-y-3">
          {data.misunderstandings.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <h4 className="font-body text-sm text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">6. 3 Beginner Practices</p>
        <div className="mt-4 space-y-4">
          {data.practices.map((practice, index) => (
            <article key={practice.title} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-primary/80">Practice {index + 1}</p>
              <h4 className="mt-2 font-body text-sm text-foreground">{practice.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{practice.setup}</p>
              <div className="mt-3 space-y-2">
                {practice.steps.map((step) => (
                  <div key={step} className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-primary/85">Integration: {practice.integration}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">7. Reflection Prompts</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {data.reflections.map((prompt) => (
            <article key={prompt} className="rounded-2xl border border-border/25 bg-card/35 p-4 text-sm leading-7 text-foreground/90">
              {prompt}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">8. Related Authors</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {data.relatedAuthors.map((author) => (
            <article key={author.name} className="rounded-2xl border border-border/25 bg-card/35 p-4">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-body text-sm text-foreground">{author.name}</h4>
                <TierBadge tier={author.tier} />
              </div>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{author.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-amber-400/20 bg-amber-500/8 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">9. Premium Banner</p>
        <p className="mt-3 text-sm leading-7 text-foreground/90">{data.premiumBanner}</p>
        <Link
          to="/pricing"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-500/14 px-4 py-2 text-sm text-foreground transition-all hover:border-amber-300/45 hover:bg-amber-500/20"
        >
          Unlock premium pathways
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
};

const Paths = () => {
  const [selectedSlug, setSelectedSlug] = useState(pathDetails[0].slug);
  const selected = useMemo(() => pathDetails.find((path) => path.slug === selectedSlug) ?? pathDetails[0], [selectedSlug]);

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Sacred Library · Paths</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Path pages rebuilt as mini-libraries</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            Each path now carries educational depth, practical exercises, modern application, and clear author cross-links.
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

      <section className={shellCardClass}>
        <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Path Overview</p>
        <h2 className="mt-2 font-display text-3xl text-foreground">Choose a path and study deeply</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pathDetails.map((path) => {
            const Icon = path.icon;
            const isSelected = selectedSlug === path.slug;
            return (
              <button
                key={path.slug}
                type="button"
                onClick={() => setSelectedSlug(path.slug)}
                className={`rounded-[24px] border p-4 text-left transition-all ${
                  isSelected
                    ? "border-primary/30 bg-primary/10 shadow-[0_16px_50px_-40px_rgba(255,173,70,0.45)]"
                    : "border-border/30 bg-background/45 hover:border-primary/20 hover:bg-card/55"
                }`}
              >
                <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${path.iconClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-3 font-display text-2xl text-foreground">{path.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{path.overviewLine}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid items-start gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24">
          <PathHeroCard path={selected} />
          <RelatedPathsCard selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
          <PremiumMiniCard />
        </aside>

        <PathContentView path={selected} />
      </section>
    </div>
  );
};

export default Paths;
