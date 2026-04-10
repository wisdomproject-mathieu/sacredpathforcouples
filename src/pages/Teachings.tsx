import { useState } from "react";
import LotusIcon from "@/components/tantra-icons/LotusIcon";
import FlameIcon from "@/components/tantra-icons/FlameIcon";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const teachings = [
  {
    teacher: "Osho",
    title: "Umění být přítomný v lásce",
    free: true,
    content:
      "Láska je stav bytí. Nemůžete ji "dělat" — můžete ji pouze být. Když jste plně přítomní se svým partnerem, bez myšlenek na minulost nebo budoucnost, otevíráte dveře do prostoru, kde láska přirozeně proudí. Praxe: Sedněte si dnes s partnerem na 5 minut v tichu. Žádné telefony, žádná slova. Jen buďte spolu.",
  },
  {
    teacher: "David Deida",
    title: "Cesta vyššího muže — Polarita",
    free: true,
    content:
      "Sexuální přitažlivost je proudění mezi póly — maskulinním a femininním. Čím silnější polarita, tím hlubší přitažlivost. Maskulinní energie je přítomnost, směr, hloubka. Femininní energie je tok, zářivost, radiance. Oba póly žijí v každém z nás. Praxe: Všimněte si dnes, kdy vedete a kdy následujete. Prozkoumejte obě role vědomě.",
  },
  {
    teacher: "Margot Anand",
    title: "Umění sexuální extáze",
    free: true,
    content:
      "Tantra nás učí, že sexuální energie je posvátná síla — ta samá síla, která stvořila vesmír. Když se naučíme s ní pracovat vědomě, transformuje se z pouhého fyzického potěšení na cestu k probuzení. Praxe: Začněte každý milostný akt 5 minutami synchronizovaného dechu a očního kontaktu.",
  },
  {
    teacher: "Mantak Chia",
    title: "Kultivace sexuální energie",
    free: false,
    content:
      "Taoistická tradice nás učí, jak recyklovat a transformovat sexuální energii namísto jejího uvolnění. Muži se učí orgasmu bez ejakulace, ženy prohlubují svou schopnost přijímat. Výsledkem je nejen lepší milostný život, ale vyšší vitalita v každém aspektu života.",
  },
  {
    teacher: "Diana Richardson",
    title: "Pomalá láska: Klíč k trvalé intimitě",
    free: false,
    content:
      "Zapomeňte na cíl orgasmu. Skutečná tantrická láska je o zpomalení, o přítomnosti v každém doteku. Když odstraníte tlak výkonu, objevíte hlubší vrstvy slasti a spojení, o kterých jste nevěděli.",
  },
  {
    teacher: "Barry Long",
    title: "Milování bez strachu",
    free: false,
    content:
      "Strach je největší překážkou intimity. Strach ze zranění, z odmítnutí, z nedostatečnosti. Pravá láska začíná tam, kde strach končí. A strach končí tam, kde začíná přítomnost.",
  },
  {
    teacher: "Osho",
    title: "Tantra: Nejvyšší porozumění",
    free: false,
    content:
      "Tantra není o technice — je o transformaci. Je to cesta, která říká ANO všemu — tělu, mysli, duši, sexualitě, hněvu, radosti. Nic není odmítáno, vše je přijato a transmutováno do vyššího vědomí.",
  },
  {
    teacher: "David Deida",
    title: "Intimní společenství",
    free: false,
    content:
      "Tři stádia vztahu: závislost, nezávislost a vzájemné odevzdání. Většina párů uvízne ve druhém stádiu — bojují o moc. Třetí stádium vyžaduje odvahu odevzdat se lásce bez podmínek.",
  },
];

const Teachings = () => {
  const [expandedTeaching, setExpandedTeaching] = useState<number | null>(null);

  return (
    <div className="px-4 py-8 pb-24">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-semibold text-foreground mb-2">
            Posvátná učení
          </h1>
          <p className="text-muted-foreground font-body text-sm">
            Moudrost od velkých tantrických mistrů
          </p>
        </div>

        <div className="space-y-3">
          {teachings.map((t, i) => (
            <div
              key={i}
              className={`rounded-xl border bg-card transition-all overflow-hidden ${
                t.free
                  ? "border-border hover:border-primary/40 cursor-pointer"
                  : "border-border/50"
              } ${expandedTeaching === i ? "border-primary/60 shadow-lg shadow-primary/10" : ""}`}
              onClick={() => {
                if (t.free) setExpandedTeaching(expandedTeaching === i ? null : i);
              }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-heading font-bold text-sm">
                      {t.teacher[0]}
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-foreground">
                        {t.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-body">
                        {t.teacher}
                      </p>
                    </div>
                  </div>
                  {!t.free && (
                    <span className="flex items-center gap-1 text-[10px] text-primary font-body bg-primary/10 px-2 py-0.5 rounded-full">
                      <Lock size={10} />
                      Premium
                    </span>
                  )}
                </div>
              </div>

              {/* Expanded content for free teachings */}
              {expandedTeaching === i && t.free && (
                <div className="px-4 pb-4 animate-fade-in">
                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-foreground font-body leading-relaxed">
                      {t.content}
                    </p>
                  </div>
                </div>
              )}

              {/* Locked overlay for premium */}
              {!t.free && (
                <div className="px-4 pb-4">
                  <div className="border-t border-border/50 pt-3">
                    <p className="text-xs text-muted-foreground font-body italic">
                      Odemkněte toto učení s předplatným Sacred...
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Upsell */}
        <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
          <FlameIcon className="text-primary mx-auto mb-3" size={32} />
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            Odemkněte všechna učení
          </h3>
          <p className="text-xs text-muted-foreground font-body mb-4">
            50+ lekcí od tantrických mistrů. 7 dní zdarma.
          </p>
          <Link to="/pricing">
            <Button className="font-body" size="sm">
              Zobrazit plány
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Teachings;
