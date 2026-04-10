import LotusIcon from "@/components/tantra-icons/LotusIcon";

const teachings = [
  { teacher: "Osho", title: "The Art of Being Present in Love", free: true },
  { teacher: "David Deida", title: "The Way of the Superior Man — Polarity", free: true },
  { teacher: "Mantak Chia", title: "Cultivating Sexual Energy", free: false },
  { teacher: "Diana Richardson", title: "Slow Love: The Key to Lasting Intimacy", free: false },
  { teacher: "Barry Long", title: "Making Love Without Fear", free: false },
  { teacher: "Margot Anand", title: "The Art of Sexual Ecstasy", free: true },
  { teacher: "Osho", title: "Tantra: The Supreme Understanding", free: false },
  { teacher: "David Deida", title: "Intimate Communion", free: false },
];

const Teachings = () => {
  return (
    <div className="min-h-[80vh] px-4 py-12">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-semibold text-foreground mb-3">
            Sacred Teachings
          </h1>
          <p className="text-muted-foreground font-body">
            Wisdom from the great tantric masters
          </p>
        </div>

        <div className="space-y-4">
          {teachings.map((t, i) => (
            <div
              key={i}
              className={`rounded-lg border bg-card p-5 transition-all ${
                t.free
                  ? "border-border hover:border-primary/40 cursor-pointer"
                  : "border-border/50 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-heading font-bold">
                    {t.teacher[0]}
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground">{t.title}</h3>
                    <p className="text-xs text-muted-foreground font-body">{t.teacher}</p>
                  </div>
                </div>
                {!t.free && (
                  <span className="text-xs text-primary font-body bg-primary/10 px-2 py-1 rounded-full">
                    Premium
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teachings;
