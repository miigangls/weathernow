import { useInfiniteQuery } from '@tanstack/react-query';
import { geodb } from '../../lib/geodb';
import type { GeoCity } from '../geocoding/types';

// Continents per GeoDB Cities API
export type GeoDBContinent = 'AF' | 'AN' | 'AS' | 'EU' | 'NA' | 'OC' | 'SA' | 'ALL';

function mapToGeoCity(item: any): GeoCity {
  return {
    name: item.city,
    lat: item.latitude,
    lon: item.longitude,
    country: item.countryCode,
    state: item.regionCode,
  };
}

export function useRegionCitiesInfinite(continent: GeoDBContinent, pageSize = 24) {
  return useInfiniteQuery<GeoCity[]>({
    queryKey: ['geodb', { continent, pageSize }],
    initialPageParam: 0, // offset
    queryFn: async ({ pageParam }) => {
      const offset = pageParam as number;
      const continents = continent === 'ALL' ? ['AF','AS','EU','NA','OC','SA'] : [continent];
      const results: GeoCity[] = [];
      for (const c of continents) {
        const { data } = await geodb.get(`/continents/${c}/cities`, {
          params: { limit: pageSize, offset, sort: '-population' },
        });
        const items: any[] = data?.data ?? [];
        results.push(...items.map(mapToGeoCity));
      }
      return results;
    },
    getNextPageParam: (_last, _all, lastOffset) => (lastOffset as number) + pageSize,
    staleTime: 60 * 60 * 1000,
  });
}


