import NotificationBadge from "@/components/space/journey/NotificationBadge";

export type WeatherCardData = {
  key: string;
  label: string;
  emoji: string;
  hint: string;
  createdAt: string;
};

type Props = {
  title: string;
  data: WeatherCardData | null;
  unreadCount?: number;
  emptyText: string;
  onOpen?: () => void;
};

const SharedWeatherCard = ({ title, data, unreadCount = 0, emptyText, onOpen }: Props) => (
  <article
    className={`relative rounded-[22px] border border-border/30 bg-card/45 p-4 ${
      onOpen ? "cursor-pointer transition-all hover:border-primary/20 hover:bg-card/55" : ""
    }`}
    onClick={onOpen}
    role={onOpen ? "button" : undefined}
    tabIndex={onOpen ? 0 : undefined}
    onKeyDown={onOpen ? (event) => (event.key === "Enter" || event.key === " " ? onOpen() : undefined) : undefined}
  >
    <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{title}</div>
    {data ? (
      <>
        <p className="mt-3 font-display text-3xl text-foreground">
          {data.label} {data.emoji}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{data.hint}</p>
      </>
    ) : (
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{emptyText}</p>
    )}
    <NotificationBadge show={unreadCount > 0} count={unreadCount} />
  </article>
);

export default SharedWeatherCard;
