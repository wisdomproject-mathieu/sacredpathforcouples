import LotusIcon from "@/components/tantra-icons/LotusIcon";
import SacredGeometryIcon from "@/components/tantra-icons/SacredGeometryIcon";
import ChakraIcon from "@/components/tantra-icons/ChakraIcon";
import FlameIcon from "@/components/tantra-icons/FlameIcon";
import BreathIcon from "@/components/tantra-icons/BreathIcon";
import YinYangIcon from "@/components/tantra-icons/YinYangIcon";

const rituals = [
  {
    icon: BreathIcon,
    title: "Synchronized Breathing",
    description: "Sit facing your partner. Breathe together — inhale for 4 counts, hold for 4, exhale for 8. Let your energies merge through breath.",
    duration: "5 min",
  },
  {
    icon: FlameIcon,
    title: "Candle Gazing",
    description: "Light a candle between you. Gaze softly into each other's left eye. Allow vulnerability to arise without words.",
    duration: "10 min",
  },
  {
    icon: LotusIcon,
    title: "Heart-to-Heart Meditation",
    description: "Place your right hand on your partner's heart, their right hand on yours. Feel the rhythm of love pulsing between you.",
    duration: "7 min",
  },
  {
    icon: ChakraIcon,
    title: "Chakra Alignment",
    description: "Sit back to back, spines aligned. Visualize energy rising from base to crown, merging at the top in golden light.",
    duration: "15 min",
  },
  {
    icon: SacredGeometryIcon,
    title: "Sacred Touch",
    description: "Take turns slowly tracing sacred geometry patterns on your partner's skin. Each stroke is a prayer of devotion.",
    duration: "10 min",
  },
  {
    icon: YinYangIcon,
    title: "Polarity Dance",
    description: "One leads, one follows — then switch. Explore the dynamic flow of masculine and feminine energy within you both.",
    duration: "12 min",
  },
];

const Reconnect = () => {
  return (
    <div className="min-h-[80vh] px-4 py-12">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-semibold text-foreground mb-3">
            Reconnect Rituals
          </h1>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Sacred practices to deepen your physical, emotional, and spiritual bond
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {rituals.map((ritual) => (
            <div
              key={ritual.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-primary">
                  <ritual.icon size={44} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {ritual.title}
                    </h3>
                    <span className="text-xs text-primary font-body bg-primary/10 px-2 py-1 rounded-full">
                      {ritual.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {ritual.description}
                  </p>
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
