import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import LotusIcon from "@/components/tantra-icons/LotusIcon";
import FlameIcon from "@/components/tantra-icons/FlameIcon";
import YinYangIcon from "@/components/tantra-icons/YinYangIcon";
import ChakraIcon from "@/components/tantra-icons/ChakraIcon";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const weatherEmojis = ["🌧️", "⛅", "🌤️", "☀️", "🔥"];
const weatherKeys = ["stormy", "cloudy", "partly", "sunny", "hot"] as const;

const AppHome = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const today = new Date();
  const dayIndex = today.getDay();
  const [selectedWeather, setSelectedWeather] = useState<number | null>(null);

  return (
    <div className="px-4 py-8 pb-24">
      <div className="w-full max-w-lg mx-auto space-y-6">
        <div className="text-center space-y-3">
          <img src={shivaShaktiIcon} alt="Sacred Path" className="mx-auto h-16 w-16 animate-float" />
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            {t("home.welcome")}<span className="gold-gradient">{t("home.beloved_soul")}</span>
          </h1>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <LotusIcon className="text-primary mx-auto mb-3" size={28} />
          <h3 className="font-heading text-xs uppercase tracking-widest text-primary mb-3 text-center">{t("home.daily_whisper")}</h3>
          <p className="text-foreground font-body italic leading-relaxed text-sm text-center">
            &ldquo;{t(`wisdom.${dayIndex % 7}`)}&rdquo;
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <YinYangIcon className="text-primary mx-auto mb-3" size={28} />
          <h3 className="font-heading text-xs uppercase tracking-widest text-primary mb-3 text-center">{t("home.thread_of_day")}</h3>
          <p className="text-foreground font-body leading-relaxed text-sm text-center mb-4">{t(`thread.${dayIndex % 7}`)}</p>
          <p className="text-xs text-muted-foreground text-center font-body">{t("home.thread_hint")}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <FlameIcon className="text-primary mx-auto mb-3" size={28} />
          <h3 className="font-heading text-xs uppercase tracking-widest text-primary mb-3 text-center">{t("home.intimacy_weather")}</h3>
          <p className="text-xs text-muted-foreground text-center font-body mb-4">{t("home.how_feeling")}</p>
          <div className="flex justify-center gap-2">
            {weatherKeys.map((key, i) => (
              <button
                key={key}
                onClick={() => setSelectedWeather(i)}
                className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-all ${
                  selectedWeather === i
                    ? "bg-primary/20 border border-primary/40 scale-110"
                    : "hover:bg-card border border-transparent"
                }`}
              >
                <span className="text-2xl">{weatherEmojis[i]}</span>
                <span className="text-[10px] text-muted-foreground font-body">{t(`weather.${key}`)}</span>
              </button>
            ))}
          </div>
          {selectedWeather !== null && (
            <p className="text-xs text-primary text-center mt-3 font-body animate-fade-in">
              {t(`weather.${weatherKeys[selectedWeather]}_desc`)}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link to="/app/connect">
            <Button variant="outline" className="w-full font-body h-auto py-4 flex-col gap-2">
              <ChakraIcon className="text-primary" size={24} />
              <span className="text-xs">{t("home.connect_partner")}</span>
            </Button>
          </Link>
          <Link to="/app/reconnect">
            <Button variant="outline" className="w-full font-body h-auto py-4 flex-col gap-2">
              <LotusIcon className="text-primary" size={24} />
              <span className="text-xs">{t("home.rituals")}</span>
            </Button>
          </Link>
          <Link to="/app/teachings">
            <Button variant="outline" className="w-full font-body h-auto py-4 flex-col gap-2">
              <FlameIcon className="text-primary" size={24} />
              <span className="text-xs">{t("home.teachings")}</span>
            </Button>
          </Link>
          <Link to="/app/reconnect">
            <Button variant="outline" className="w-full font-body h-auto py-4 flex-col gap-2">
              <YinYangIcon className="text-primary" size={24} />
              <span className="text-xs">{t("home.polarity")}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppHome;
