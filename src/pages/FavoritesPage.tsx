import { useAtom } from 'jotai';
import { favoritesAtom } from '../features/favorites/atoms';
import { useCurrentWeather } from '../features/weather/useCurrentWeather';
import WeatherCard from '../components/WeatherCard';
import EmptyState from '../components/EmptyState';

function FavoriteCityCard({ lat, lon }: { lat: number; lon: number }) {
  const { data, isLoading, isError } = useCurrentWeather(lat, lon);
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const isFavorite = favorites.some((c) => c.lat === lat && c.lon === lon);

  if (isLoading) return <div className="rounded-xl border border-gray-200 bg-white p-6">Cargando…</div>;
  if (isError || !data) return <div className="rounded-xl border border-gray-200 bg-white p-6">Error</div>;

  return (
    <WeatherCard
      data={data}
      isFavorite={isFavorite}
      onToggleFavorite={() => {
        setFavorites((prev) => prev.filter((c) => !(c.lat === lat && c.lon === lon)));
      }}
      onViewDetail={undefined}
    />
  );
}

export default function FavoritesPage() {
  const [favorites] = useAtom(favoritesAtom);

  if (favorites.length === 0) {
    return <EmptyState title="Aún no tienes favoritos" description="Agrega ciudades a favoritos desde su tarjeta de clima." />
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {favorites.map((c) => (
        <FavoriteCityCard key={`${c.lat},${c.lon}`} lat={c.lat} lon={c.lon} />
      ))}
    </div>
  );
}


