import { useQuery } from '@tanstack/react-query';
import { meteo } from '../../lib/openmeteo';
import type { CurrentWeather } from './types';

function weatherCodeToText(code?: number): string {
  // Minimal mapping
  if (code === undefined || code === null) return '';
  const map: Record<number, string> = {
    0: 'Despejado',
    1: 'Mayormente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Niebla',
    48: 'Niebla',
    51: 'Llovizna ligera',
    53: 'Llovizna',
    55: 'Llovizna intensa',
    61: 'Lluvia ligera',
    63: 'Lluvia',
    65: 'Lluvia intensa',
    71: 'Nieve ligera',
    73: 'Nieve',
    75: 'Nieve intensa',
    80: 'Chubascos',
    81: 'Chubascos fuertes',
    82: 'Chubascos violentos',
    95: 'Tormenta',
  };
  return map[code] ?? '—';
}

export function useCurrentWeather(lat?: number, lon?: number) {
  return useQuery<CurrentWeather>({
    queryKey: ['weather', lat, lon],
    queryFn: async () => {
      const { data } = await meteo.get('/forecast', {
        params: {
          latitude: lat,
          longitude: lon,
          current_weather: true,
          timezone: 'auto',
        },
      });
      const cw = data?.current_weather as
        | { temperature?: number; windspeed?: number; weathercode?: number }
        | undefined;
      const desc = weatherCodeToText(cw?.weathercode);
      const mapped: CurrentWeather = {
        name: '',
        sys: { country: '' },
        weather: [{ id: cw?.weathercode ?? 0, main: desc, description: desc, icon: '' }],
        main: {
          temp: cw?.temperature ?? NaN,
          feels_like: cw?.temperature ?? NaN,
          temp_min: NaN,
          temp_max: NaN,
          humidity: NaN,
          pressure: NaN,
        },
        wind: { speed: cw?.windspeed ?? NaN },
      };
      return mapped;
    },
    enabled: typeof lat === 'number' && typeof lon === 'number',
    staleTime: 60_000,
  });
}


