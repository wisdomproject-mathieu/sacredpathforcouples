import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const flags: Record<Language, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  cs: "🇨🇿",
};

const labels: Record<Language, string> = {
  en: "EN",
  fr: "FR",
  cs: "CZ",
};

const langs: Language[] = ["en", "fr", "cs"];

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  const nextIndex = (langs.indexOf(lang) + 1) % langs.length;
  const nextLang = langs[nextIndex];

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => setLang(nextLang)}
      className="font-body text-xs gap-1 px-2"
      title={`Switch to ${labels[nextLang]}`}
    >
      <Globe className="h-3.5 w-3.5" />
      {labels[lang]}
    </Button>
  );
};

export default LanguageSwitcher;
