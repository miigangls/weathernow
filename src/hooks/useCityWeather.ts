import { useMemo } from 'react';
import { useCurrentWeather } from '../features/weather/useCurrentWeather';
import { useForecast } from '../features/weather/useForecast';

export function useCityWeather(lat?: number, lon?: number, enabled = true) {
  const cw = useCurrentWeather(enabled ? lat : undefined, enabled ? lon : undefined);
  const fc = useForecast(enabled ? lat : undefined, enabled ? lon : undefined);

  const extra = useMemo(() => {
    const data = fc.data;
    if (!data?.current?.time || !data.hourly?.time?.length) return {} as {
      humidity?: number; windKmh?: number; precipMm?: number; precipProb?: number
    };
    const iso = new Date(data.current.time).toISOString().slice(0, 13);
    const idx = data.hourly.time.findIndex((t) => t.slice(0, 13) === iso);
    return {
      humidity: data.current.relative_humidity_2m,
      windKmh: data.current.wind_speed_10m,
      precipMm: idx >= 0 ? data.hourly.precipitation[idx] : undefined,
      precipProb: idx >= 0 ? data.hourly.precipitation_probability[idx] : undefined,
    };
  }, [fc.data]);

  return { current: cw, forecast: fc, extra } as const;
}


