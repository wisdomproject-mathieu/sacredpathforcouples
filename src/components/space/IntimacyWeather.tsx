import { useEffect, useMemo, useState } from "react";
import { Cloud, Heart, MoonStar, Sparkles, SunMedium, Wind } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import DoorwayShell from "@/components/space/DoorwayShell";
import ShareCardButton from "@/components/space/ShareCardButton";

interface Props {
  coupleId?: string;
  onNavigate: (tab: string) => void;
}

type WeatherStateMeta = {
  key: string;
  label: string;
  emoji: string;
  hint: string;
  icon: typeof SunMedium;
  iconClass: string;
};

const weatherStatesByLanguage: Record<Language, WeatherStateMeta[]> = {
  en: [
    { key: "open", label: "Open", emoji: "☀️", hint: "Available, spacious, ready for closeness.", icon: SunMedium, iconClass: "text-amber-300" },
    { key: "tender", label: "Tender", emoji: "💗", hint: "Soft, emotional, wanting warmth and care.", icon: Heart, iconClass: "text-rose-300" },
    { key: "playful", label: "Playful", emoji: "✨", hint: "Light, curious, flirtatious, laughing energy.", icon: Sparkles, iconClass: "text-fuchsia-300" },
    { key: "stressed", label: "Stressed", emoji: "☁️", hint: "Full mind, low capacity, needing gentleness.", icon: Cloud, iconClass: "text-sky-300" },
    { key: "longing", label: "Longing", emoji: "🌙", hint: "Missing something, wanting depth or contact.", icon: MoonStar, iconClass: "text-violet-300" },
    { key: "erotic", label: "Erotic", emoji: "🔥", hint: "Desire is present and wants direction.", icon: Sparkles, iconClass: "text-orange-300" },
    { key: "tired", label: "Tired", emoji: "🫧", hint: "Low energy, low pressure, slow rhythm needed.", icon: Wind, iconClass: "text-cyan-300" },
    { key: "reassurance", label: "Reassurance", emoji: "⚡", hint: "Needs safety, soothing, and emotional grounding.", icon: Heart, iconClass: "text-emerald-300" },
  ],
  fr: [
    { key: "open", label: "Ouvert", emoji: "☀️", hint: "Disponible, spacieux, prêt pour la proximité.", icon: SunMedium, iconClass: "text-amber-300" },
    { key: "tender", label: "Tendre", emoji: "💗", hint: "Doux et émotionnel, besoin de chaleur et de soin.", icon: Heart, iconClass: "text-rose-300" },
    { key: "playful", label: "Joueur", emoji: "✨", hint: "Léger, curieux, flirtant, énergie joyeuse.", icon: Sparkles, iconClass: "text-fuchsia-300" },
    { key: "stressed", label: "Stressé", emoji: "☁️", hint: "Mental chargé, faible capacité, besoin de douceur.", icon: Cloud, iconClass: "text-sky-300" },
    { key: "longing", label: "En manque", emoji: "🌙", hint: "Manque de contact, envie de profondeur.", icon: MoonStar, iconClass: "text-violet-300" },
    { key: "erotic", label: "Érotique", emoji: "🔥", hint: "Le désir est là et demande une direction.", icon: Sparkles, iconClass: "text-orange-300" },
    { key: "tired", label: "Fatigué", emoji: "🫧", hint: "Énergie basse, pression basse, rythme lent nécessaire.", icon: Wind, iconClass: "text-cyan-300" },
    { key: "reassurance", label: "Réassurance", emoji: "⚡", hint: "Besoin de sécurité, d'apaisement et d'ancrage émotionnel.", icon: Heart, iconClass: "text-emerald-300" },
  ],
  cs: [
    { key: "open", label: "Otevřenost", emoji: "☀️", hint: "Dostupnost, prostor, připravenost na blízkost.", icon: SunMedium, iconClass: "text-amber-300" },
    { key: "tender", label: "Něžnost", emoji: "💗", hint: "Jemný emoční stav, potřeba tepla a péče.", icon: Heart, iconClass: "text-rose-300" },
    { key: "playful", label: "Hravost", emoji: "✨", hint: "Lehkost, zvědavost, flirt a radostná energie.", icon: Sparkles, iconClass: "text-fuchsia-300" },
    { key: "stressed", label: "Stres", emoji: "☁️", hint: "Přehlcená mysl, menší kapacita, potřeba jemnosti.", icon: Cloud, iconClass: "text-sky-300" },
    { key: "longing", label: "Touha", emoji: "🌙", hint: "Chybí kontakt, volání po hloubce.", icon: MoonStar, iconClass: "text-violet-300" },
    { key: "erotic", label: "Erotično", emoji: "🔥", hint: "Touha je přítomná a chce jasný směr.", icon: Sparkles, iconClass: "text-orange-300" },
    { key: "tired", label: "Únava", emoji: "🫧", hint: "Nízká energie, nízký tlak, potřeba pomalého rytmu.", icon: Wind, iconClass: "text-cyan-300" },
    { key: "reassurance", label: "Ujištění", emoji: "⚡", hint: "Potřeba bezpečí, zklidnění a emočního ukotvení.", icon: Heart, iconClass: "text-emerald-300" },
  ],
};

const weatherCopyByLanguage: Record<Language, Record<string, string>> = {
  en: {
    shellLabel: "Intimacy Weather",
    shellTitle: "Name the climate before you touch the night",
    shellDescription: "Check in first. When the truth is named, every next move lands with more tenderness and accuracy.",
    shellActionLabel: "Enter rituals",
    chooseState: "Choose your state",
    arrivingTonight: "How is your weather tonight?",
    suggestedNextStep: "Suggested next step",
    stressedSuggestion: "Choose a short breathing or soft-touch ritual rather than intensity.",
    eroticSuggestion: "Open Positions or a sensual ritual and keep the pace slow at first.",
    playfulSuggestion: "Try a lighter reconnect tool before deeper emotional work.",
    defaultSuggestion: "A gratitude or heart-opening ritual will likely open beautifully tonight.",
    connectToSave: "Connect to save weather",
    saving: "Saving...",
    sealWeather: "Seal my weather",
    sendWhisperNext: "Send a whisper next",
    shareCardLabel: "Offer this weather card",
    shareCardText: "Weather card ✦ My weather tonight is {weather}. {hint}",
    yourWeather: "Your weather",
    belovedWeather: "Beloved weather",
    connectBelovedHint: "Connect with your beloved to sync your shared weather here.",
    updateHint: "You can update your weather whenever your inner climate shifts.",
    noCheckinYet: "No check-in yet today.",
  },
  fr: {
    shellLabel: "Météo d'intimité",
    shellTitle: "Nommez le climat avant de toucher la nuit",
    shellDescription: "Commencez par un check-in. Quand la vérité est nommée, chaque pas suivant devient plus tendre et plus juste.",
    shellActionLabel: "Entrer dans les rituels",
    chooseState: "Choisissez votre état",
    arrivingTonight: "Quelle est votre météo ce soir ?",
    suggestedNextStep: "Étape suivante suggérée",
    stressedSuggestion: "Choisissez un rituel court de respiration ou de toucher doux plutôt que l'intensité.",
    eroticSuggestion: "Ouvrez Positions ou un rituel sensuel et gardez un rythme lent au début.",
    playfulSuggestion: "Essayez d'abord un outil de reconnexion léger avant un travail émotionnel plus profond.",
    defaultSuggestion: "Un rituel de gratitude ou d'ouverture du cœur devrait très bien fonctionner ce soir.",
    connectToSave: "Connectez-vous pour enregistrer la météo",
    saving: "Enregistrement...",
    sealWeather: "Sceller ma météo",
    sendWhisperNext: "Envoyer un murmure ensuite",
    shareCardLabel: "Partager cette carte météo",
    shareCardText: "Carte météo ✦ Ma météo ce soir est {weather}. {hint}",
    yourWeather: "Votre météo",
    belovedWeather: "Météo de votre partenaire",
    connectBelovedHint: "Connectez-vous avec votre partenaire pour synchroniser votre météo partagée ici.",
    updateHint: "Vous pouvez mettre à jour votre météo dès que votre climat intérieur change.",
    noCheckinYet: "Pas encore de check-in aujourd'hui.",
  },
  cs: {
    shellLabel: "Počasí intimity",
    shellTitle: "Pojmenujte klima dřív, než otevřete večer",
    shellDescription: "Začněte check-inem. Když je pravda pojmenovaná, další kroky dopadají jemněji a přesněji.",
    shellActionLabel: "Vstoupit do rituálů",
    chooseState: "Vyberte svůj stav",
    arrivingTonight: "Jaké je vaše počasí dnes večer?",
    suggestedNextStep: "Doporučený další krok",
    stressedSuggestion: "Zvolte krátký dechový nebo jemný dotekový rituál místo intenzity.",
    eroticSuggestion: "Otevřete Pozice nebo smyslný rituál a na začátku držte pomalé tempo.",
    playfulSuggestion: "Nejdřív zkuste lehčí nástroj znovupropojení, pak jděte do hlubších emocí.",
    defaultSuggestion: "Rituál vděčnosti nebo otevření srdce dnes večer pravděpodobně funguje nejlépe.",
    connectToSave: "Pro uložení počasí se propojte",
    saving: "Ukládání...",
    sealWeather: "Uložit moje počasí",
    sendWhisperNext: "Pak poslat vzkaz",
    shareCardLabel: "Sdílet tuto kartu počasí",
    shareCardText: "Karta počasí ✦ Moje dnešní počasí je {weather}. {hint}",
    yourWeather: "Vaše počasí",
    belovedWeather: "Počasí partnera",
    connectBelovedHint: "Propojte se s partnerem a synchronizujte zde společné počasí.",
    updateHint: "Počasí můžete kdykoli upravit, když se vnitřní klima změní.",
    noCheckinYet: "Dnes ještě není check-in.",
  },
};

const IntimacyWeather = ({ coupleId, onNavigate }: Props) => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const copy = weatherCopyByLanguage[lang];
  const states = weatherStatesByLanguage[lang];
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
      <div className="rounded-[22px] border border-border/22 bg-background/50 p-4 backdrop-blur-sm">
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
            {mine && <div className="mt-4 text-xs text-muted-foreground">{copy.updateHint}</div>}
          </>
        ) : (
          <div className="mt-3 text-sm text-muted-foreground">{copy.noCheckinYet}</div>
        )}
      </div>
    );
  };

  return (
    <DoorwayShell
      label={copy.shellLabel}
      title={copy.shellTitle}
      description={copy.shellDescription}
    >

      <section className="rounded-[26px] border border-border/25 bg-card/55 p-5 backdrop-blur-sm md:p-6">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{copy.chooseState}</p>
          <h3 className="mt-2 font-display text-2xl text-foreground">{copy.arrivingTonight}</h3>
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
          <p className="mt-3 text-xs leading-5 text-muted-foreground/70">
            {selectedState.key === "stressed" || selectedState.key === "tired"
              ? copy.stressedSuggestion
              : selectedState.key === "erotic"
              ? copy.eroticSuggestion
              : selectedState.key === "playful"
              ? copy.playfulSuggestion
              : copy.defaultSuggestion}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!selected || saving || isPreview}
            onClick={saveWeather}
            className="rounded-2xl border border-primary/25 bg-primary/12 px-5 py-3 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/16 disabled:opacity-60"
          >
            {isPreview ? copy.connectToSave : saving ? copy.saving : copy.sealWeather}
          </button>
          <button
            type="button"
            onClick={() => onNavigate("messages")}
            className="rounded-2xl border border-border/35 bg-card/45 px-5 py-3 text-sm text-foreground transition-all hover:border-border/55 hover:bg-card/60"
          >
            {copy.sendWhisperNext}
          </button>
          {selectedState && (
            <ShareCardButton
              coupleId={coupleId}
              messageType="weather_share"
              content={copy.shareCardText
                .replace("{weather}", `${selectedState.label} ${selectedState.emoji}`)
                .replace("{hint}", selectedState.hint)}
              label={copy.shareCardLabel}
            />
          )}
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        {renderCard(copy.yourWeather, myEntry, true)}
        {isPreview && !partnerEntry ? (
          <div className="rounded-[24px] border border-border/30 bg-background/45 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{copy.belovedWeather}</div>
            <div className="mt-3 text-sm text-muted-foreground">
              {copy.connectBelovedHint}
            </div>
          </div>
        ) : (
          renderCard(copy.belovedWeather, partnerEntry)
        )}
      </section>
    </DoorwayShell>
  );
};

export default IntimacyWeather;
