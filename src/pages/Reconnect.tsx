import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flame,
  Heart,
  MessageCircleHeart,
  MoonStar,
  PlayCircle,
  Sparkles,
  Waves,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

const tools = [
  {
    title: "Soft Landing",
    desc: "A gentle sequence for couples who want to settle, breathe, and arrive back into one another.",
    icon: MoonStar,
    iconClass: "text-cyan-300",
    chip: "Calm · Tender",
    ritual: "Sit knee to knee. Share one exhale together. Then each say one thing your body needs tonight.",
  },
  {
    title: "Heart Opening",
    desc: "A warm path into gratitude, affection, and emotional reassurance.",
    icon: Heart,
    iconClass: "text-rose-300",
    chip: "Emotional · Loving",
    ritual: "Place one hand on your own heart and one on your partner’s. Alternate: ‘I appreciate…’ for three rounds.",
  },
  {
    title: "Playful Spark",
    desc: "Lightness, teasing, laughter, and a little mischievous energy for tonight.",
    icon: PlayCircle,
    iconClass: "text-amber-300",
    chip: "Fun · Flirty",
    ritual: "Take turns making one impossible request and one real desire. Guess which is which before answering.",
  },
  {
    title: "Sacred Desire",
    desc: "A more erotic route for couples who want slowness, anticipation, and magnetic tension.",
    icon: Flame,
    iconClass: "text-orange-300",
    chip: "Sensual · Erotic",
    ritual: "Spend two minutes touching only hands, face, and hair. Do not kiss yet. Let anticipation build first.",
  },
  {
    title: "Breath Bridge",
    desc: "Use breathing and nervous-system co-regulation to reconnect without pressure.",
    icon: Waves,
    iconClass: "text-emerald-300",
    chip: "Breath · Regulation",
    ritual: "Inhale for four together, exhale for six together, five rounds. End by saying one word for what changed.",
  },
  {
    title: "Speak the Unsent",
    desc: "A guided verbal opener when something needs to be said more softly and more truthfully.",
    icon: MessageCircleHeart,
    iconClass: "text-violet-300",
    chip: "Communication · Repair",
    ritual: "Complete this sentence slowly: ‘Something I have been carrying that I want to share with care is…’",
  },
];

const Reconnect = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(tools[0].title);

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/12 via-background to-background p-6 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.45)] md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Reconnect</p>
            <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Choose the energy for tonight</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              Move from distance into closeness with guided emotional, playful, sensual, and breath-led tools.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/app/space")}
            className="rounded-2xl border border-primary/20 bg-primary/10 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/35 hover:bg-primary/14"
          >
            Enter the Temple
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-border/30 bg-card/45 p-5 md:p-6">
          <div className="flex items-center gap-2 text-fuchsia-300">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.22em]">Tonight’s invitation</span>
          </div>
          <h2 className="mt-4 font-display text-2xl text-foreground">Pick a doorway, not a perfect mood</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Reconnection does not need to start with certainty. Start with honesty, choose an energy, and let the ritual do the rest.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300">Best for</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">New couples, long-term couples, low-energy nights, and nights that need a reset.</p>
            </div>
            <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-amber-300">Use it when</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">You want connection now but do not know whether you need play, tenderness, breath, or desire.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-border/30 bg-card/45 p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Featured practice</p>
          <h2 className="mt-3 font-display text-2xl text-foreground">Three-minute arrival</h2>
          <div className="mt-4 rounded-[24px] border border-border/30 bg-background/45 p-5">
            <p className="text-sm leading-7 text-muted-foreground">
              Face each other in silence for 30 seconds. Then each answer: “What is here in me right now?” Finish with one shared breath and one warm hand placed on the other’s chest.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Tool set</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">Choose your reconnection mode</h2>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isOpen = expanded === tool.title;

            return (
              <div key={tool.title} className="rounded-[28px] border border-border/30 bg-card/45 transition-all hover:border-primary/20 hover:bg-card/55">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : tool.title)}
                  className="w-full p-5 text-left md:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className={`inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 ${tool.iconClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="rounded-full border border-border/30 bg-background/55 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {tool.chip}
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-2xl text-foreground">{tool.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{tool.desc}</p>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 md:px-6 md:pb-6">
                    <div className="rounded-[22px] border border-primary/15 bg-primary/8 p-4">
                      <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Suggested first move</div>
                      <p className="mt-2 text-sm leading-6 text-foreground/90">{tool.ritual}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Reconnect;
