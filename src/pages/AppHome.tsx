import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, HeartHandshake, MessageCircle, Sparkles, Stars } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const AppHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState("You can begin alone in the Library and move into the Temple when the relationship is ready.");
  const [activityStatus, setActivityStatus] = useState("No partner activity yet. Start with the Library to discover a path, then enter the Temple when you want to practice together.");
  const [journeyPhase, setJourneyPhase] = useState("Arrival");

  const quotes = useMemo(
    () => [
      {
        author: "Diana Richardson",
        quote: "When slowness enters intimacy, the body starts telling a much deeper truth.",
        note: "Softness · Sensitivity · Relaxed presence",
      },
      {
        author: "David Deida",
        quote: "Love deepens when presence, truth, and attraction are all still welcome in the room.",
        note: "Polarity · Presence · Devotion",
      },
      {
        author: "Mantak Chia",
        quote: "Breath and awareness turn intensity into nourishment instead of depletion.",
        note: "Tao · Energy · Longevity",
      },
    ],
    []
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, [quotes.length]);

  useEffect(() => {
    if (!user) return;

    const loadStatus = async () => {
      const { data: couple } = await supabase
        .from("couples")
        .select("id, partner_a, partner_b")
        .or(`partner_a.eq.${user.id},partner_b.eq.${user.id}`)
        .maybeSingle();

      if (!couple) {
        setConnectionStatus("You are not connected yet. Sacred Path still works beautifully for one: learn inside the Library, then invite your partner when you are ready.");
        setActivityStatus("Begin with a foundational path, save a few favorites, and let the Temple become your shared space later.");
        setJourneyPhase("Arrival");
        return;
      }

      const connected = Boolean(couple.partner_a && couple.partner_b);
      setConnectionStatus(
        connected
          ? "You and your partner are inside the same temple. Home now becomes a living dashboard for your shared rhythm."
          : "Your invitation is open. While you wait, use the Library to gather the words, rituals, and wisdom you want to bring into the relationship."
      );

      if (!connected) {
        setActivityStatus("No shared activity yet. The moment your partner arrives, this page can start reflecting your real temple rhythm.");
        setJourneyPhase("Invitation");
        return;
      }

      const [weatherRes, messageRes, altarRes] = await Promise.all([
        supabase
          .from("weather_entries")
          .select("state, created_at, user_id")
          .eq("couple_id", couple.id)
          .order("created_at", { ascending: false })
          .limit(4),
        supabase
          .from("partner_messages")
          .select("content, created_at, sender_id")
          .eq("couple_id", couple.id)
          .order("created_at", { ascending: false })
          .limit(4),
        supabase
          .from("altar_items")
          .select("title, created_at")
          .eq("couple_id", couple.id)
          .order("created_at", { ascending: false })
          .limit(4),
      ]);

      const latestWeather = weatherRes.data?.[0];
      const latestMessage = messageRes.data?.[0];
      const latestAltar = altarRes.data?.[0];

      if (latestMessage) {
        setActivityStatus("Your partner left something in the Temple recently. Open the Temple to read it and let the next move come from what was actually felt.");
      } else if (latestWeather) {
        setActivityStatus(`The latest shared climate was ${latestWeather.state}. Let that mood guide whether tonight needs softness, teasing, repair, or stillness.`);
      } else if (latestAltar) {
        setActivityStatus("A memory has already been saved in the altar. The relationship is beginning to leave traces you can return to.");
      } else {
        setActivityStatus("Your shared temple is open. Start with Intimacy Weather, one warm message, or a small ritual that asks very little and gives a lot.");
      }

      const totalTouches = (weatherRes.data?.length || 0) + (messageRes.data?.length || 0) + (altarRes.data?.length || 0);
      if (totalTouches >= 8) setJourneyPhase("Sacred Desire");
      else if (totalTouches >= 4) setJourneyPhase("Rekindling");
      else setJourneyPhase("Softening");
    };

    loadStatus();
  }, [user]);

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-primary/15 bg-gradient-to-br from-primary/14 via-background to-background p-6 shadow-[0_24px_80px_-40px_rgba(255,170,70,0.45)] md:p-8">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Home</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">Ancient wisdom for modern love</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            Sacred Path is built for the quick moment, the long season, the single seeker, and the shared temple of two. Learn inside the Library, then bring what matters into living practice.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate("/app/paths")}
            className="rounded-2xl border border-border/35 bg-card/45 px-5 py-3 font-body text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
          >
            Open Sacred Library
          </button>
          <button
            type="button"
            onClick={() => navigate("/app/space")}
            className="rounded-2xl border border-primary/25 bg-primary/12 px-5 py-3 font-body text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16"
          >
            Connect with your partner in Temple
          </button>
          <button
            type="button"
            onClick={() => navigate("/app/space")}
            className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-5 py-3 font-body text-sm text-foreground transition-all hover:border-amber-400/35 hover:bg-amber-500/14"
          >
            Rituals
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
          <div className="flex items-center gap-2 text-violet-300">
            <Stars className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.22em]">Couple Journey</span>
          </div>
          <h2 className="mt-3 font-display text-3xl text-foreground">Where things stand now</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{connectionStatus}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Current phase</div>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{journeyPhase}</p>
            </div>
            <div className="rounded-[22px] border border-border/30 bg-background/45 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-primary/80">Temple news</div>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{activityStatus}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-amber-300">Living wisdom</div>
          <div className="mt-4 rounded-[24px] border border-border/25 bg-background/45 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{quotes[quoteIndex].author}</div>
            <p className="mt-3 font-display text-2xl leading-relaxed text-foreground">“{quotes[quoteIndex].quote}”</p>
            <p className="mt-4 text-sm text-muted-foreground">{quotes[quoteIndex].note}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
          <div className="inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 text-violet-300">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-display text-3xl text-foreground">Library</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Learn by path, deepen by teacher, and discover what serves a quick modern couple as well as a long devotional one.
          </p>
        </div>

        <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
          <div className="inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 text-fuchsia-300">
            <MessageCircle className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-display text-3xl text-foreground">Temple</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Enter the shared sanctuary for weather, ritual, positions, teasing, messages, repair, memory, and the living rhythm of two people.
          </p>
        </div>

        <div className="rounded-[28px] border border-border/30 bg-card/45 p-5">
          <div className="inline-flex rounded-2xl border border-border/30 bg-background/45 p-3 text-rose-300">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-display text-3xl text-foreground">For one or for two</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Home and Library work beautifully even before a partner joins. Temple becomes the shared field when the relationship is ready to practice together.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AppHome;
