import { useMemo, useState } from "react";

import type { Language } from "@/contexts/LanguageContext";
import NotificationBadge from "@/components/space/journey/NotificationBadge";
import SharedTimelineItem, { type JourneyTimelineItem } from "@/components/space/journey/SharedTimelineItem";

type TimelineFilter = "all" | "weather" | "rituals" | "messages" | "offerings";

type Props = {
  lang: Language;
  title: string;
  subtitle: string;
  items: JourneyTimelineItem[];
  unreadCount: number;
  onOpen: () => void;
};

const filterLabels: Record<Language, Record<TimelineFilter, string>> = {
  en: { all: "All", weather: "Weather", rituals: "Rituals", messages: "Messages", offerings: "Offerings" },
  fr: { all: "Tout", weather: "Météo", rituals: "Rituels", messages: "Messages", offerings: "Offrandes" },
  cs: { all: "Vše", weather: "Počasí", rituals: "Rituály", messages: "Zprávy", offerings: "Sdílení" },
};

const expandLabels: Record<Language, { more: string; less: string }> = {
  en: { more: "More", less: "Less" },
  fr: { more: "Plus", less: "Moins" },
  cs: { more: "Více", less: "Méně" },
};

const filterMatch = (filter: TimelineFilter, type: JourneyTimelineItem["type"]) => {
  if (filter === "all") return true;
  if (filter === "weather") return type === "weather";
  if (filter === "rituals") return type === "ritual" || type === "invitation";
  if (filter === "messages") return type === "message" || type === "note" || type === "nudge" || type === "acknowledgement";
  return type === "offering" || type === "oracle" || type === "intention";
};

const SharedTimeline = ({ lang, title, subtitle, items, unreadCount, onOpen }: Props) => {
  const [filter, setFilter] = useState<TimelineFilter>("all");

  const filtered = useMemo(
    () => items.filter((item) => filterMatch(filter, item.type)),
    [filter, items],
  );

  return (
    <section className="relative rounded-[24px] border border-border/30 bg-card/45 p-4" onClick={onOpen}>
      <p className="text-xs uppercase tracking-[0.16em] text-primary/80">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{subtitle}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {(["all", "weather", "rituals", "messages", "offerings"] as TimelineFilter[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] transition-all ${
              item === filter
                ? "border-primary/35 bg-primary/14 text-foreground"
                : "border-border/35 bg-background/45 text-muted-foreground hover:border-border/55 hover:text-foreground"
            }`}
          >
            {filterLabels[lang][item]}
          </button>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded-[16px] border border-border/30 bg-background/45 p-3 text-sm text-muted-foreground">
            {lang === "fr"
              ? "Aucun événement pour ce filtre."
              : lang === "cs"
              ? "Pro tento filtr zatím žádné události."
              : "No timeline events for this filter yet."}
          </div>
        ) : (
          filtered.map((item) => (
            <SharedTimelineItem
              key={item.id}
              item={item}
              expandLabel={expandLabels[lang].more}
              collapseLabel={expandLabels[lang].less}
            />
          ))
        )}
      </div>

      <NotificationBadge show={unreadCount > 0} count={unreadCount} />
    </section>
  );
};

export default SharedTimeline;
