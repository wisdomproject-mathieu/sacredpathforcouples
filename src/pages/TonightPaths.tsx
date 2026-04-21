import { useEffect, useMemo, useState } from "react";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { fetchCoupleStateForUser } from "@/lib/couples";
import { getLocalDayRange, pickLatestWeatherForCouple } from "@/lib/weatherEntries";
import { resolveTonightPathSixCards, useSelectedDailyMainCard } from "@/lib/weatherEngine";

type WeatherEntry = Pick<Tables<"weather_entries">, "id" | "state" | "user_id" | "created_at">;

const copyByLanguage = {
  en: {
    connect: "Connect your partner to unlock tonight paths.",
    waiting: "Waiting for both weather check-ins to build tonight paths.",
  },
  fr: {
    connect: "Connectez votre partenaire pour débloquer les chemins de ce soir.",
    waiting: "En attente des deux check-ins météo pour créer les chemins de ce soir.",
  },
  cs: {
    connect: "Pro odemčení dnešních cest propojte partnera.",
    waiting: "Čekáme na oba check-iny počasí, abychom vytvořili dnešní cesty.",
  },
} as const;

const TonightPaths = () => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const copy = copyByLanguage[lang];

  const [loading, setLoading] = useState(true);
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [partnerUserId, setPartnerUserId] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [myWeatherEntry, setMyWeatherEntry] = useState<WeatherEntry | null>(null);
  const [partnerWeatherEntry, setPartnerWeatherEntry] = useState<WeatherEntry | null>(null);

  useEffect(() => {
    if (!user) return;

    const syncWeather = async (activeCoupleId: string, partnerId: string | null) => {
      const { startIso, endIso } = getLocalDayRange();
      const { data } = await supabase
        .from("weather_entries")
        .select("id, state, user_id, created_at")
        .eq("couple_id", activeCoupleId)
        .gte("created_at", startIso)
        .lt("created_at", endIso)
        .order("created_at", { ascending: false })
        .order("id", { ascending: false });

      const { myEntry, partnerEntry } = pickLatestWeatherForCouple(
        data ?? [],
        user.id,
        partnerId,
      );
      setMyWeatherEntry(myEntry);
      setPartnerWeatherEntry(partnerEntry);
    };

    const load = async () => {
      setLoading(true);
      const coupleState = await fetchCoupleStateForUser(supabase, user.id);
      if (!coupleState.connected || !coupleState.activeCouple) {
        setConnected(false);
        setCoupleId(null);
        setPartnerUserId(null);
        setMyWeatherEntry(null);
        setPartnerWeatherEntry(null);
        setLoading(false);
        return;
      }

      setConnected(true);
      setCoupleId(coupleState.activeCouple.id);
      setPartnerUserId(coupleState.partnerId ?? null);
      await syncWeather(coupleState.activeCouple.id, coupleState.partnerId ?? null);
      setLoading(false);
    };

    void load();

    const couplesAChannel = supabase
      .channel(`tonight_paths_couples_a_${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "couples", filter: `partner_a=eq.${user.id}` },
        () => void load(),
      )
      .subscribe();

    const couplesBChannel = supabase
      .channel(`tonight_paths_couples_b_${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "couples", filter: `partner_b=eq.${user.id}` },
        () => void load(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(couplesAChannel);
      supabase.removeChannel(couplesBChannel);
    };
  }, [user]);

  useEffect(() => {
    if (!user || !coupleId) return;

    const syncWeather = async () => {
      const { startIso, endIso } = getLocalDayRange();
      const { data } = await supabase
        .from("weather_entries")
        .select("id, state, user_id, created_at")
        .eq("couple_id", coupleId)
        .gte("created_at", startIso)
        .lt("created_at", endIso)
        .order("created_at", { ascending: false })
        .order("id", { ascending: false });

      const { myEntry, partnerEntry } = pickLatestWeatherForCouple(data ?? [], user.id, partnerUserId);
      setMyWeatherEntry(myEntry);
      setPartnerWeatherEntry(partnerEntry);
    };

    void syncWeather();

    const weatherChannel = supabase
      .channel(`tonight_paths_weather_${coupleId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "weather_entries", filter: `couple_id=eq.${coupleId}` },
        () => void syncWeather(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(weatherChannel);
    };
  }, [coupleId, partnerUserId, user]);

  const selectedMainCardState = useSelectedDailyMainCard({
    partnerAWeather: myWeatherEntry?.state ?? null,
    partnerBWeather: partnerWeatherEntry?.state ?? null,
    coupleId,
  });

  const tonightCards = useMemo(
    () => resolveTonightPathSixCards(selectedMainCardState, 6),
    [
      selectedMainCardState.selectedDailyMainCard?.id,
      selectedMainCardState.normalizedKey,
      selectedMainCardState.alternates,
    ],
  );

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-primary/20 bg-gradient-to-br from-primary/12 via-background/94 to-background/90 p-4 shadow-[0_28px_90px_-46px_rgba(255,173,70,0.42)] md:p-6">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img src={shivaShaktiIcon} alt="" className="h-full w-full object-cover opacity-[0.14]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-background/58 to-background/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/64 via-transparent to-background/52" />
      </div>

      <div className="relative">
        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-24 animate-pulse rounded-[18px] border border-border/30 bg-card/45" />
            ))}
          </div>
        ) : !connected ? (
          <div className="rounded-[18px] border border-border/30 bg-card/45 px-4 py-5 text-sm text-foreground/90">
            {copy.connect}
          </div>
        ) : !selectedMainCardState.ready || tonightCards.length < 1 ? (
          <div className="rounded-[18px] border border-border/30 bg-card/45 px-4 py-5 text-sm text-foreground/90">
            {copy.waiting}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {tonightCards.map((card, index) => (
              <article
                key={card.id}
                className={`rounded-[18px] border bg-card/55 px-4 py-4 backdrop-blur-sm ${
                  index === 0
                    ? "border-amber-300/40 bg-gradient-to-br from-amber-500/12 via-card/70 to-card/45 shadow-[0_14px_35px_-24px_rgba(255,173,70,0.5)]"
                    : "border-border/30"
                }`}
              >
                <h2 className="font-display text-xl leading-7 text-foreground">{card.title}</h2>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TonightPaths;
