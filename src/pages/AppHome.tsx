import { useAuth } from "@/contexts/AuthContext";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";
import LotusIcon from "@/components/tantra-icons/LotusIcon";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const wisdoms = [
  "The meeting of two personalities is like the contact of two chemical substances: if there is any reaction, both are transformed. — C.G. Jung",
  "Love is not about possession. Love is about appreciation. — Osho",
  "The greatest thing you'll ever learn is just to love and be loved in return. — David Deida",
];

const AppHome = () => {
  const { user } = useAuth();
  const todayWisdom = wisdoms[new Date().getDay() % wisdoms.length];

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center space-y-8">
        <img src={shivaShaktiIcon} alt="Sacred Path" className="mx-auto h-20 w-20 animate-float" />
        <h1 className="font-heading text-3xl font-semibold text-foreground">
          Welcome, <span className="gold-gradient">Beloved</span>
        </h1>

        {/* Daily Whisper */}
        <div className="rounded-xl border border-border bg-card p-8">
          <LotusIcon className="text-primary mx-auto mb-4" size={36} />
          <h3 className="font-heading text-sm uppercase tracking-widest text-primary mb-4">Daily Whisper</h3>
          <p className="text-foreground font-body italic leading-relaxed text-sm">
            "{todayWisdom}"
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/app/connect">
            <Button variant="outline" className="w-full font-body h-auto py-4 flex-col gap-2">
              <span className="text-primary text-lg">♾️</span>
              <span>Partner Connect</span>
            </Button>
          </Link>
          <Link to="/app/reconnect">
            <Button variant="outline" className="w-full font-body h-auto py-4 flex-col gap-2">
              <span className="text-primary text-lg">🪷</span>
              <span>Reconnect</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppHome;
