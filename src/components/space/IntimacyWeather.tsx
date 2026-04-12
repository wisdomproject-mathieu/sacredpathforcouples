import { useEffect, useMemo, useState } from "react";
import { Cloud, Heart, MoonStar, Sparkles, SunMedium, Wind } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import DoorwayShell from "@/components/space/DoorwayShell";

interface Props {
  coupleId?: string;
  onNavigate: (tab: string) => void;
}

const states = [
  { key: "open", label: "Open", emoji: "☀️", hint: "Available, spacious, ready for closeness.", icon: SunMedium, iconClass: "text-amber-300" },
  { key: "tender", label: "Tender", emoji: "💗", hint: "Soft, emotional, wanting warmth and care.", icon: Heart, iconClass: "text-rose-300" },
  { key: "playful", label: "Playful", emoji: "✨", hint: "Light, curious, flirtatious, laughing energy.", icon: Sparkles, iconClass: "text-fuchsia-300" },
  { key: "stressed", label: "Stressed", emoji: "☁️", hint: "Full mind, low capacity, needing gentleness.", icon: Cloud, iconClass: "text-sky-300" },
  { key: "longing", label: "Longing", emoji: "🌙", hint: "Missing something, wanting depth or contact.", icon: MoonStar, iconClass: "text-violet-300" },
  { key: "erotic", label: "Erotic", emoji: "🔥", hint: "Desire is present and wants direction.", icon: Sparkles, iconClass: "text-orange-300" },
  { key: "tired", label: "Tired", emoji: "🫧", hint: "Low energy, low pressure, slow rhythm needed.", icon: Wind, iconClass: "text-cyan-300" },
  { key: "reassurance", label: "Reassurance", emoji: "⚡", hint: "Needs safety, soothing, and emotional grounding.", icon: Heart, iconClass: "text-emerald-300" },
] as const;

const IntimacyWeather = ({ coupleId, onNavigate }: Props) => {
  const { user } = useAuth();
  const isPreview = !coupleId;
  const [selected, setSelected] = useState<string | null>(null);
  const [myEntry, setMyEntry] = useState<any | null>(null);
  const [partnerEntry, setPartnerEntry] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const selectedState = useMemo(
    () => states.find((state) => state.key === selected) ?? null,
    [selected]
  );

  useEffect(() => {
    if (!coupleId || !user) return;

    const today = new Date().toISOString().slice(0, 10);

    const load = async () => {
      const { data } = await supabase
        .from("weather_entries")
        .select("*")
        .eq("couple_id", coupleId)
        .gte("created_at", today)
        .order("created_at", { ascending: false });

      if (data) {
        const mine = data.find((item: any) => item.user_id === user.id);
        const partner = data.find((item: any) => item.user_id !== user.id);
        setMyEntry(mine ?? null);
        setPartnerEntry(partner ?? null);
        if (mine?.state) setSelected(mine.state);
      }
    };

    load();

    const channel = supabase
      .channel(`weather_entries_${coupleId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "weather_entries", filter: `couple_id=eq.${coupleId}` },
        () => load()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [coupleId, user]);

  const saveWeather = async () => {
    if (!user || !selected || !coupleId) return;

    setSaving(true);
    const { error } = await supabase.from("weather_entries").insert({
      couple_id: coupleId,
      user_id: user.id,
      state: selected,
    });

    if (!error) {
      setMyEntry({ state: selected, user_id: user.id, created_at: new Date().toISOString() });
    }
    setSaving(false);
  };

  const renderCard = (title: string, entry: any | null, mine = false) => {
    const stateMeta = states.find((state) => state.key === entry?.state) ?? null;
    return (
      <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{title}</div>
        {stateMeta ? (
          <>
            <div className="mt-3 flex items-center gap-3">
              <div className={`rounded-2xl border border-border/30 bg-card/45 p-3 ${stateMeta.iconClass}`}>
                <stateMeta.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-2xl text-foreground">{stateMeta.emoji} {stateMeta.label}</div>
                <div className="text-sm text-muted-foreground">{stateMeta.hint}</div>
              </div>
            </div>
            {mine && <div className="mt-4 text-xs text-muted-foreground">You can update your weather at any time.</div>}
          </>
        ) : (
          <div className="mt-3 text-sm text-muted-foreground">No check-in yet today.</div>
        )}
      </div>
    );
  };

  return (
    <DoorwayShell
      label="Intimacy Weather"
      title="Name the climate before choosing the ritual"
      description="Check in first. It makes the next step kinder, more accurate, and more connecting."
      actionLabel="Go to rituals"
      onAction={() => onNavigate("rituals")}
    >

      <section className="grid gap-4 lg:grid-cols-2">
        {renderCard("Your weather", myEntry, true)}
        {isPreview && !partnerEntry ? (
          <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Partner weather</div>
            <div className="mt-3 text-sm text-muted-foreground">
              Connect with your partner to sync shared weather here.
            </div>
          </div>
        ) : (
          renderCard("Partner weather", partnerEntry)
        )}
      </section>

      <section className="rounded-[28px] border border-border/30 bg-card/45 p-6">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Choose your state</p>
          <h3 className="mt-2 font-display text-2xl text-foreground">How are you arriving tonight?</h3>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {states.map((state) => {
            const Icon = state.icon;
            const active = selected === state.key;
            return (
              <button
                key={state.key}
                type="button"
                onClick={() => setSelected(state.key)}
                className={`rounded-[24px] border p-4 text-left transition-all ${
                  active
                    ? "border-primary/30 bg-primary/10 shadow-[0_18px_50px_-36px_rgba(255,173,70,0.42)]"
                    : "border-border/25 bg-background/35 hover:border-border/45 hover:bg-background/55"
                }`}
              >
                <div className={`inline-flex rounded-2xl border border-border/30 bg-card/45 p-3 ${state.iconClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-xl text-foreground">{state.emoji} {state.label}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{state.hint}</p>
              </button>
            );
          })}
        </div>

        {selectedState && (
          <div className="mt-5 rounded-[24px] border border-primary/15 bg-primary/8 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Suggested next step</div>
            <p className="mt-2 text-sm leading-6 text-foreground/90">
              {selectedState.key === "stressed" || selectedState.key === "tired"
                ? "Choose a short breathing or soft-touch ritual rather than intensity."
                : selectedState.key === "erotic"
                ? "Open Positions or a sensual ritual and keep the pace slow at first."
                : selectedState.key === "playful"
                ? "Try a lighter reconnect tool before deeper emotional work."
                : "A gratitude or heart-opening ritual will likely land well tonight."}
            </p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!selected || saving || isPreview}
            onClick={saveWeather}
            className="rounded-2xl border border-primary/25 bg-primary/12 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16 disabled:opacity-60"
          >
            {isPreview ? "Connect to save weather" : saving ? "Saving..." : "Save my weather"}
          </button>
          <button
            type="button"
            onClick={() => onNavigate("messages")}
            className="rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
          >
            Send a message next
          </button>
        </div>
      </section>
    </DoorwayShell>
  );
};

export default IntimacyWeather;
