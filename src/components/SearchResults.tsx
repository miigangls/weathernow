import { useAtom } from "jotai";
import type { GeoCity } from "../features/geocoding/types";
import { useCityWeather } from "../hooks/useCityWeather";
import { useIntersection } from "../hooks/useIntersection";
import CardSkeleton from "./skeletons/CardSkeleton";
import WeatherCard from "./WeatherCard";
import { favoritesAtom } from "../features/favorites/atoms";
import { useNavigate } from "react-router-dom";

function ResultCard({
  city,
}: {
  city: GeoCity;
}) {
  const { lat, lon } = city;
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>();
  // Always call hooks in the same order; gate their internal queries with `enabled`
  const { current: cw, extra } = useCityWeather(lat, lon, isIntersecting);
  const { data, isLoading, isError, error } = cw;
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const isFavorite = favorites.some((c) => c.lat === lat && c.lon === lon);
  const navigate = useNavigate();

  const showSkeleton = !isIntersecting || isLoading;
  if (showSkeleton) return <div ref={ref}><CardSkeleton /></div>;
  if (isError || !data) {
    const msg =
      (error as any)?.response?.data?.message ||
      (error as Error)?.message ||
      "Error";
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
        {msg}
      </div>
    );
  }

  return (
    <div ref={ref}>
    <WeatherCard
      data={data}
      title={[city.name, city.state || city.country].filter(Boolean).join(", ")}
      extra={extra}
      isFavorite={isFavorite}
      onToggleFavorite={() => {
        setFavorites((prev) => {
          const exists = prev.some((c) => c.lat === lat && c.lon === lon);
          if (exists)
            return prev.filter((c) => !(c.lat === lat && c.lon === lon));
          return [
            { name: city.name, lat, lon, country: city.country },
            ...prev,
          ];
        });
      }}
      onViewDetail={() => navigate(`/city/${lat},${lon}`)}
    />
    </div>
  );
}

export default function SearchResults({ cities }: { cities: GeoCity[] }) {
  if (cities.length === 0) return null;
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cities.map((c) => (
          <ResultCard key={`${c.lat},${c.lon}`} city={c} />
        ))}
      </div>
    </>
  );
}
