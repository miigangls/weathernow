import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { GeoCity } from './types';

interface Params {
  name: string;
  country?: string; // ISO2
  limit?: number;
}

export function useCitySearch({ name, country, limit = 10 }: Params) {
  return useQuery<GeoCity[]>({
    queryKey: ['city-search', country ?? 'any', name],
    queryFn: async () => {
      const params: Record<string, string | number> = {
        name,
        count: limit,
        language: 'es',
      };
      if (country) params['country_code'] = country;
      const { data } = await axios.get('https://geocoding-api.open-meteo.com/v1/search', { params });
      const list = (data?.results || []) as Array<{
        name: string;
        latitude: number;
        longitude: number;
        country_code: string;
        admin1?: string;
      }>;
      return list.map((r) => ({
        name: r.name,
        lat: r.latitude,
        lon: r.longitude,
        country: r.country_code,
        state: r.admin1,
      }));
    },
    enabled: Boolean(name && name.length >= 2),
    staleTime: 0,
  });
}


