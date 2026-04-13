import SharedWeatherCard, { type WeatherCardData } from "@/components/space/journey/SharedWeatherCard";

type Props = {
  title: string;
  data: WeatherCardData | null;
  unreadCount?: number;
  emptyText: string;
  onOpen?: () => void;
};

const PartnerWeatherCard = ({ title, data, unreadCount, emptyText, onOpen }: Props) => (
  <SharedWeatherCard title={title} data={data} unreadCount={unreadCount} emptyText={emptyText} onOpen={onOpen} />
);

export default PartnerWeatherCard;
