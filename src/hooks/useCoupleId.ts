import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export const useCoupleId = (): string | null => {
  const { user } = useAuth();
  const [coupleId, setCoupleId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!user?.id) {
        setCoupleId(null);
        return;
      }
      const { data } = await supabase
        .from("couples")
        .select("id")
        .or(`partner_a.eq.${user.id},partner_b.eq.${user.id}`)
        .limit(1)
        .maybeSingle();
      if (!cancelled) setCoupleId(data?.id ?? null);
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  return coupleId;
};
