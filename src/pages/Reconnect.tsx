import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BreathIcon from "@/components/tantra-icons/BreathIcon";
import FlameIcon from "@/components/tantra-icons/FlameIcon";
import LotusIcon from "@/components/tantra-icons/LotusIcon";
import ChakraIcon from "@/components/tantra-icons/ChakraIcon";
import SacredGeometryIcon from "@/components/tantra-icons/SacredGeometryIcon";
import YinYangIcon from "@/components/tantra-icons/YinYangIcon";

const tools = [
  { icon: BreathIcon, key: "intimacy_games", free: true },
  { icon: FlameIcon, key: "intimacy_weather", free: true },
  { icon: LotusIcon, key: "the_unsaid", free: false },
  { icon: ChakraIcon, key: "the_thread", free: false },
  { icon: SacredGeometryIcon, key: "date_night", free: false },
  { icon: YinYangIcon, key: "shared_messages", free: false },
];

const weatherOptions = [
  { key: "stormy", emoji: "🌧" },
  { key: "cloudy", emoji: "☁️" },
  { key: "warm", emoji: "🌤" },
  { key: "electric", emoji: "⚡" },
  { key: "radiant", emoji: "✨" },
];

const FREE_PROMPT_COUNT = 5;

const IntimacyWeatherTool = ({ t, onBack }: { t: (k: string) => string; onBack: () => void }) => {
  const [yourWeather, setYourWeather] = useState<string | null>(null);
  const [partnerWeather, setPartnerWeather] = useState<string | null>(null);

  const getComboMessage = () => {
    if (!yourWeather || !partnerWeather) return "";
    const combo = `weather.combo.${yourWeather}_${partnerWeather}`;
    const msg = t(combo);
    if (msg !== combo) return msg;
    const reverse = `weather.combo.${partnerWeather}_${yourWeather}`;
    const reverseMsg = t(reverse);
    if (reverseMsg !== reverse) return reverseMsg;
    return t("weather.combo.default");
  };

  const getComboEmojis = () => {
    const y = weatherOptions.find((w) => w.key === yourWeather);
    const p = weatherOptions.find((w) => w.key === partnerWeather);
    return { yours: y?.emoji, partners: p?.emoji };
  };

  const reset = () => {
    setYourWeather(null);
    setPartnerWeather(null);
  };

  const bothSelected = yourWeather && partnerWeather;
  const emojis = getComboEmojis();

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary font-body transition-colors">
        <ArrowLeft className="h-4 w-4" /> {t("games.back")}
      </button>

      <div>
        <span className="text-[10px] font-body uppercase tracking-[0.2em] text-primary bg-primary/15 px-2 py-1 rounded-full">✦ NEW FEATURE</span>
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mt-3 mb-2">
          {t("reconnect.tool.intimacy_weather.title")}
        </h2>
        <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed max-w-2xl">
          {t("weather.pick_desc")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* YOU */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground text-center mb-4">{t("weather.you")}</p>
          <div className="space-y-2">
            {weatherOptions.map((w) => (
              <button
                key={w.key}
                onClick={() => setYourWeather(w.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left font-body text-sm ${
                  yourWeather === w.key
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/50 hover:border-primary/30 text-muted-foreground"
                }`}
              >
                <span className="text-lg">{w.emoji}</span>
                {t(`weather.${w.key}`)}
              </button>
            ))}
          </div>
        </div>

        {/* PARTNER */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground text-center mb-4">{t("weather.partner")}</p>
          <div className="space-y-2">
            {weatherOptions.map((w) => (
              <button
                key={w.key}
                onClick={() => setPartnerWeather(w.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left font-body text-sm ${
                  partnerWeather === w.key
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/50 hover:border-primary/30 text-muted-foreground"
                }`}
              >
                <span className="text-lg">{w.emoji}</span>
                {t(`weather.${w.key}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      {bothSelected && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 md:p-8 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 text-3xl mb-4">
            <span>{emojis.yours}</span>
            <span className="text-primary font-heading text-xl">+</span>
            <span>{emojis.partners}</span>
          </div>
          <p className="font-heading italic text-base md:text-lg text-foreground leading-relaxed mb-3">
            {getComboMessage()}
          </p>
          <p className="text-sm text-muted-foreground font-body mb-4">
            {t("weather.combo.default")}
          </p>
          <button onClick={reset} className="text-primary text-sm font-body underline underline-offset-4 hover:text-primary/80 transition-colors">
            {t("weather.reset")}
          </button>
        </div>
      )}
    </div>
  );
};

const IntimacyGamesTool = ({ t, onBack }: { t: (k: string) => string; onBack: () => void }) => {
  const [currentPrompt, setCurrentPrompt] = useState<number | null>(null);
  const [shownCount, setShownCount] = useState(0);

  const drawCard = () => {
    const next = currentPrompt === null ? 0 : currentPrompt + 1;
    setCurrentPrompt(next);
    setShownCount((c) => Math.max(c, next + 1));
  };

  const hitLimit = shownCount >= FREE_PROMPT_COUNT;

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary font-body transition-colors">
        <ArrowLeft className="h-4 w-4" /> {t("games.back")}
      </button>

      <div>
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-2">
          {t("reconnect.tool.intimacy_games.title")}
        </h2>
        <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed max-w-2xl">
          {t("reconnect.tool.intimacy_games.desc")}
        </p>
      </div>

      {currentPrompt !== null && currentPrompt < 8 && (
        <div className="rounded-xl border border-primary/30 bg-card p-6 md:p-8 animate-fade-in">
          <p className="text-[10px] font-body uppercase tracking-[0.2em] text-primary mb-4">
            Card {currentPrompt + 1} / {FREE_PROMPT_COUNT}+
          </p>
          <p className="font-heading text-lg md:text-xl text-foreground leading-relaxed italic">
            &ldquo;{t(`games.prompt.${currentPrompt}`)}&rdquo;
          </p>
        </div>
      )}

      {hitLimit && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center animate-fade-in">
          <p className="font-heading text-base md:text-lg text-foreground mb-2">✦</p>
          <p className="text-sm text-muted-foreground font-body mb-4 max-w-md mx-auto">
            {t("games.subscribe_banner")}
          </p>
          <Link to="/pricing">
            <Button className="font-body" size="sm">
              {t("teachings.view_plans")}
            </Button>
          </Link>
        </div>
      )}

      {!hitLimit && (
        <div className="text-center">
          <Button onClick={drawCard} className="font-body px-8" size="lg">
            {currentPrompt === null ? t("games.draw") : t("games.next")}
          </Button>
        </div>
      )}
    </div>
  );
};

const Reconnect = () => {
  const { t } = useLanguage();
  const [activeTool, setActiveTool] = useState<string | null>(null);

  if (activeTool === "intimacy_weather") {
    return (
      <div className="px-4 py-8 pb-24">
        <div className="container max-w-4xl">
          <IntimacyWeatherTool t={t} onBack={() => setActiveTool(null)} />
        </div>
      </div>
    );
  }

  if (activeTool === "intimacy_games") {
    return (
      <div className="px-4 py-8 pb-24">
        <div className="container max-w-4xl">
          <IntimacyGamesTool t={t} onBack={() => setActiveTool(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 pb-24">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-body uppercase tracking-[0.25em] text-primary mb-2 block">
            {t("reconnect.for_two")}
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-4">
            {t("reconnect.title")}
          </h1>
          <p className="text-muted-foreground font-body text-sm md:text-base max-w-lg leading-relaxed">
            {t("reconnect.desc")}
          </p>
        </div>

        {/* Reconnect Tonight */}
        <div className="rounded-xl border border-border/50 bg-card/50 p-6 md:p-8 mb-8">
          <span className="text-[10px] font-body uppercase tracking-[0.25em] text-primary mb-3 block">
            {t("reconnect.tonight_label")}
          </span>
          <p className="font-heading text-lg md:text-xl text-foreground leading-relaxed whitespace-pre-line">
            {t("reconnect.tonight_text")}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-3 md:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.key}
                className={`rounded-xl border bg-card/60 p-5 md:p-6 transition-all ${
                  tool.free
                    ? "cursor-pointer border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                    : "border-border/30"
                }`}
                onClick={() => tool.free && setActiveTool(tool.key)}
              >
                <div className={`mb-3 ${tool.free ? "text-primary" : "text-muted-foreground/40"}`}>
                  <Icon size={32} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3
                    className={`font-heading text-lg md:text-xl font-semibold ${
                      tool.free ? "text-foreground" : "text-muted-foreground/60"
                    }`}
                  >
                    {t(`reconnect.tool.${tool.key}.title`)}
                  </h3>
                  {!tool.free && <Lock size={14} className="text-primary/60" />}
                </div>
                <p
                  className={`text-sm font-body leading-relaxed ${
                    tool.free ? "text-muted-foreground" : "text-muted-foreground/40"
                  }`}
                >
                  {t(`reconnect.tool.${tool.key}.desc`)}
                </p>
                {!tool.free && (
                  <p className="text-xs text-muted-foreground/50 font-body italic mt-3">
                    {t("teachings.unlock_hint")}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Unlock CTA */}
        <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            {t("reconnect.unlock")}
          </h3>
          <p className="text-sm text-muted-foreground font-body mb-4 max-w-md mx-auto">
            {t("reconnect.unlock_desc")}
          </p>
          <Link to="/pricing">
            <Button className="font-body" size="sm">
              {t("teachings.view_plans")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reconnect;
