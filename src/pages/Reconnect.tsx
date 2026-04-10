import { useState } from "react";
import LotusIcon from "@/components/tantra-icons/LotusIcon";
import SacredGeometryIcon from "@/components/tantra-icons/SacredGeometryIcon";
import ChakraIcon from "@/components/tantra-icons/ChakraIcon";
import FlameIcon from "@/components/tantra-icons/FlameIcon";
import BreathIcon from "@/components/tantra-icons/BreathIcon";
import YinYangIcon from "@/components/tantra-icons/YinYangIcon";

const rituals = [
  {
    icon: BreathIcon,
    title: "Synchronizovaný dech",
    description: "Sedněte si čelem k sobě. Dýchejte společně — nádech na 4 doby, zadržení na 4, výdech na 8. Nechte vaše energie splynout skrze dech.",
    duration: "5 min",
    steps: [
      "Sedněte si pohodlně čelem k sobě, kolena se mohou dotýkat",
      "Zavřete oči a zklidněte mysl",
      "Začněte dýchat společně: nádech 4 doby",
      "Zadržte dech na 4 doby",
      "Pomalu vydechněte na 8 dob",
      "Opakujte 10 cyklů, pak otevřete oči a podívejte se na partnera",
    ],
  },
  {
    icon: FlameIcon,
    title: "Hledění do svíčky",
    description: "Zapalte svíčku mezi sebou. Jemně hleďte do levého oka svého partnera. Dovolte zranitelnosti vystoupit bez slov.",
    duration: "10 min",
    steps: [
      "Připravte klidný prostor a zapalte svíčku",
      "Sedněte si tak, aby svíčka byla mezi vámi",
      "Hleďte jemně do levého oka partnera",
      "Pokud přijdou emoce, nechte je proudit",
      "Nedívejte se stranou — zůstaňte přítomní",
      "Po 10 minutách se tiše obejměte",
    ],
  },
  {
    icon: LotusIcon,
    title: "Srdce na srdce meditace",
    description: "Položte pravou ruku na srdce partnera, jeho pravou ruku na vaše. Cítíte rytmus lásky proudící mezi vámi.",
    duration: "7 min",
    steps: [
      "Sedněte čelem k sobě, dostatečně blízko na dotek",
      "Každý položte pravou ruku na srdce partnera",
      "Zavřete oči a synchronizujte dech",
      "Vizualizujte zlaté světlo proudící mezi srdci",
      "Cítíte tlukot srdce toho druhého",
      "Zůstaňte v tichu a spojení",
    ],
  },
  {
    icon: ChakraIcon,
    title: "Zarovnání čaker",
    description: "Sedněte si zády k sobě, páteře v jedné linii. Vizualizujte energii stoupající od kořene ke koruně, splývající nahoře ve zlatém světle.",
    duration: "15 min",
    steps: [
      "Sedněte si zády k sobě na podlahu",
      "Narovnejte páteř a nechte se opřít o partnera",
      "Začněte u kořenové čakry — vizualizujte červené světlo",
      "Pomalu posunujte energii nahoru: oranžová, žlutá, zelená...",
      "Modrá, indigo, fialová — až ke korunní čakře",
      "Představte si, jak se vaše energie setkávají nad hlavami ve zlatém světle",
    ],
  },
  {
    icon: SacredGeometryIcon,
    title: "Posvátný dotek",
    description: "Střídejte se v pomalém kreslení vzorů posvátné geometrie na kůži partnera. Každý tah je modlitba oddanosti.",
    duration: "10 min",
    steps: [
      "Jeden si lehne, druhý sedí vedle",
      "Pomalu kreslíte prsty spirály na zádech partnera",
      "Kresby infinity symbolů (∞) mezi lopatkami",
      "Jemné kruhy kolem srdce",
      "Po 5 minutách si vyměňte role",
      "Zakončete jemným položením dlaní na záda",
    ],
  },
  {
    icon: YinYangIcon,
    title: "Tanec polarity",
    description: "Jeden vede, druhý následuje — pak se vyměníte. Prozkoumejte dynamický proud maskulinní a femininní energie ve vás obou.",
    duration: "12 min",
    steps: [
      "Postavte se čelem k sobě a spojte dlaně",
      "Jeden začne pomalu vést pohyb",
      "Druhý s důvěrou následuje každý pohyb",
      "Po 6 minutách si vyměňte role",
      "Prozkoumejte, jak se cítíte v každé roli",
      "Zakončete objetím a sdílením pocitů",
    ],
  },
];

const Reconnect = () => {
  const [expandedRitual, setExpandedRitual] = useState<number | null>(null);

  return (
    <div className="px-4 py-8 pb-24">
      <div className="container max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-semibold text-foreground mb-2">
            Rituály spojení
          </h1>
          <p className="text-muted-foreground font-body max-w-xl mx-auto text-sm">
            Posvátné praktiky pro prohloubení fyzického, emočního a duchovního pouta
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {rituals.map((ritual, index) => (
            <div
              key={ritual.title}
              className={`group rounded-xl border bg-card p-5 transition-all cursor-pointer ${
                expandedRitual === index
                  ? "border-primary/60 shadow-lg shadow-primary/10"
                  : "border-border hover:border-primary/30"
              }`}
              onClick={() =>
                setExpandedRitual(expandedRitual === index ? null : index)
              }
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-primary mt-1">
                  <ritual.icon size={36} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-heading text-base font-semibold text-foreground">
                      {ritual.title}
                    </h3>
                    <span className="text-[10px] text-primary font-body bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                      {ritual.duration}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-body leading-relaxed">
                    {ritual.description}
                  </p>

                  {expandedRitual === index && (
                    <div className="mt-4 space-y-2 animate-fade-in">
                      <h4 className="text-xs font-heading uppercase tracking-widest text-primary">
                        Průvodce krok za krokem
                      </h4>
                      <ol className="space-y-1.5">
                        {ritual.steps.map((step, si) => (
                          <li
                            key={si}
                            className="flex items-start gap-2 text-xs text-muted-foreground font-body"
                          >
                            <span className="text-primary font-semibold mt-px">
                              {si + 1}.
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reconnect;
