import { useQuery } from '@tanstack/react-query';
import { meteo } from '../../lib/openmeteo';
import type { ForecastResponse } from '../forecast/types';

export function useForecast(lat?: number, lon?: number) {
  return useQuery<ForecastResponse>({
    queryKey: ['forecast', lat, lon],
    queryFn: async () => {
      const params = {
        latitude: lat,
        longitude: lon,
        current:
          'temperature_2m,apparent_temperature,precipitation,cloud_cover,relative_humidity_2m,wind_speed_10m,weather_code',
        hourly:
          'temperature_2m,apparent_temperature,precipitation,precipitation_probability,relative_humidity_2m,cloud_cover,wind_speed_10m,wind_gusts_10m',
        daily:
          'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weather_code,sunrise,sunset',
        timezone: 'auto',
      } as const;
      const { data } = await meteo.get('/forecast', { params });
      return {
        current: data.current ?? {},
        hourly: {
          time: data.hourly?.time ?? [],
          temperature_2m: data.hourly?.temperature_2m ?? [],
          apparent_temperature: data.hourly?.apparent_temperature ?? [],
          precipitation: data.hourly?.precipitation ?? [],
          precipitation_probability: data.hourly?.precipitation_probability ?? [],
          relative_humidity_2m: data.hourly?.relative_humidity_2m ?? [],
          cloud_cover: data.hourly?.cloud_cover ?? [],
          wind_speed_10m: data.hourly?.wind_speed_10m ?? [],
          wind_gusts_10m: data.hourly?.wind_gusts_10m ?? [],
        },
        daily: {
          time: data.daily?.time ?? [],
          temperature_2m_max: data.daily?.temperature_2m_max ?? [],
          temperature_2m_min: data.daily?.temperature_2m_min ?? [],
          precipitation_sum: data.daily?.precipitation_sum ?? [],
          precipitation_probability_max: data.daily?.precipitation_probability_max ?? [],
          weather_code: data.daily?.weather_code ?? [],
          sunrise: data.daily?.sunrise ?? [],
          sunset: data.daily?.sunset ?? [],
        },
      } satisfies ForecastResponse;
    },
    enabled: typeof lat === 'number' && typeof lon === 'number',
    staleTime: 10 * 60 * 1000,
  });
}


