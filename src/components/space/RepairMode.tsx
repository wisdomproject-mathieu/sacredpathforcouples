import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Wind, Heart, MessageCircle, Hand, Sparkles, ChevronRight } from "lucide-react";
import DoorwayShell from "@/components/space/DoorwayShell";
import ShareCardButton from "@/components/space/ShareCardButton";

const repairSteps = [
  { key: "breathe", icon: Wind, color: "text-sky-400" },
  { key: "name", icon: MessageCircle, color: "text-indigo-400" },
  { key: "own", icon: Heart, color: "text-pink-400" },
  { key: "ask", icon: Hand, color: "text-amber-400" },
  { key: "close", icon: Sparkles, color: "text-primary" },
];

interface Props {
  onNavigate?: (tab: string) => void;
  coupleId?: string;
}

const RepairMode = ({ onNavigate, coupleId }: Props) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<number | null>(null);
  const [started, setStarted] = useState(false);

  const next = () => {
    if (step === null) { setStep(0); setStarted(true); }
    else if (step < repairSteps.length - 1) setStep(step + 1);
    else { setStep(null); setStarted(false); }
  };

  const currentStep = step !== null ? repairSteps[step] : null;

  return (
    <DoorwayShell
      label="Repair"
      title={t("repair.title")}
      description={t("repair.subtitle")}
      actionLabel="Enter messages"
      onAction={onNavigate ? () => onNavigate("messages") : undefined}
    >

      {!started ? (
        <div className="max-w-md mx-auto px-4 text-center">
          {/* Overview of steps */}
          <div className="grid gap-3 mb-8">
            {repairSteps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={s.key} className="flex items-center gap-4 p-4 rounded-2xl border border-border/30 bg-card/50 text-left">
                  <div className="h-10 w-10 rounded-xl bg-card flex items-center justify-center border border-border/30 shrink-0">
                    <Icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground/60 font-body uppercase tracking-wider">
                      {t("repair.step")} {idx + 1}
                    </p>
                    <h4 className="font-heading text-base text-foreground">
                      {t(`repair.${s.key}.title`)}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={next}
            className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-body text-base font-medium hover:bg-primary/90 transition-colors gap-2 inline-flex items-center"
          >
            {t("repair.begin")}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : currentStep ? (
        <div className="max-w-md mx-auto px-4 text-center animate-fade-in" key={step}>
          {/* Progress */}
          <div className="flex gap-1.5 justify-center mb-8">
            {repairSteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === step ? "w-10 bg-primary" : idx < (step || 0) ? "w-4 bg-primary/40" : "w-1.5 bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>

          <div className="mb-6">
            <p className="text-xs text-muted-foreground/60 font-body uppercase tracking-wider mb-2">
              {t("repair.step")} {(step || 0) + 1} / {repairSteps.length}
            </p>
            <currentStep.icon className={`h-12 w-12 mx-auto mb-4 ${currentStep.color}`} />
            <h4 className="font-heading text-2xl text-foreground mb-3">
              {t(`repair.${currentStep.key}.title`)}
            </h4>
            <p className="text-base font-body text-muted-foreground leading-relaxed max-w-sm mx-auto">
              {t(`repair.${currentStep.key}.instruction`)}
            </p>
          </div>

          <button
            onClick={next}
            className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-body text-base font-medium hover:bg-primary/90 transition-colors gap-2 inline-flex items-center"
          >
            {step < repairSteps.length - 1 ? t("repair.next") : t("repair.finish")}
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="mt-3">
            <ShareCardButton
              coupleId={coupleId}
              messageType="repair_share"
              content={`Repair card ✦ ${t(`repair.${currentStep.key}.title`)} — ${t(`repair.${currentStep.key}.instruction`)}`}
              label="Offer this repair card"
            />
          </div>
        </div>
      ) : null}
    </DoorwayShell>
  );
};

export default RepairMode;
