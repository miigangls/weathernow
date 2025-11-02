import { Card, CardBody } from "./ui/card";
import { formatTemp, formatPercent, formatKmh } from "../lib/format";
import type { CurrentWeather } from "../features/weather/types";

interface Props {
  data: CurrentWeather;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onViewDetail?: () => void;
  title?: string; // Optional explicit header label
  onClick?: () => void;
  extra?: {
    humidity?: number;
    windKmh?: number;
    precipMm?: number;
    precipProb?: number;
  };
}

export function WeatherCard({ data, title, extra }: Props) {
  const weather = data.weather?.[0];
  const cityLabel =
    title || [data.name, data.sys?.country].filter(Boolean).join(", ");

  function circleColorFromCode(code?: number): string {
    if (code === undefined || code === null) return "bg-gray-300";
    // Open‑Meteo weather codes mapping to simple color semantics
    if (code === 0) return "bg-yellow-400"; // Clear
    if (code === 1 || code === 2) return "bg-amber-300"; // Mostly clear / partly cloudy
    if (code === 3) return "bg-gray-300"; // Overcast
    if (code === 45 || code === 48) return "bg-gray-200"; // Fog
    if (code === 51 || code === 53 || code === 55) return "bg-sky-300"; // Drizzle
    if (
      code === 61 ||
      code === 63 ||
      code === 65 ||
      code === 80 ||
      code === 81 ||
      code === 82
    )
      return "bg-blue-400"; // Rain / showers
    if (code === 71 || code === 73 || code === 75) return "bg-slate-200"; // Snow
    if (code === 95) return "bg-indigo-600"; // Thunderstorm
    return "bg-gray-300";
  }
  const circleClass = circleColorFromCode(weather?.id);

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
      <CardBody>
        <div className="flex flex-col items-center text-center">
          <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
            {cityLabel || "—"}
          </h3>

          <div
            className={`mt-6 mb-6 h-32 w-32 rounded-full ${circleClass} shadow-inner flex items-center justify-center`}
            aria-hidden
          >
            <span className="text-3xl font-bold text-gray-900">
              {formatTemp(data.main?.temp)}
            </span>
          </div>

          <div className="mt-2 text-xl text-gray-500 capitalize">
            {weather?.main || weather?.description || ""}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-gray-700">
            <div className="rounded-md bg-gray-50 p-2">
              Humedad
              <br />
              <span className="font-semibold">{formatPercent(extra?.humidity ?? NaN)}</span>
            </div>
            <div className="rounded-md bg-gray-50 p-2">
              Viento
              <br />
              <span className="font-semibold">{formatKmh(extra?.windKmh ?? NaN)}</span>
            </div>
            <div className="rounded-md bg-gray-50 p-2">
              Prec.
              <br />
              <span className="font-semibold">
                {typeof extra?.precipMm === "number" ? extra.precipMm.toFixed(1) + " mm" : "—"}
                {typeof extra?.precipProb === "number" ? ` · ${Math.round(extra.precipProb)}%` : ""}
              </span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default WeatherCard;
