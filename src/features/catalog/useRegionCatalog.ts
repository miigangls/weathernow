import { useInfiniteQuery } from '@tanstack/react-query';
import type { GeoCity } from '../geocoding/types';

export type RegionKey = 'americas' | 'europe' | 'asia' | 'africa' | 'oceania' | 'all';

export function useRegionCatalogInfinite(region: RegionKey) {
  return useInfiniteQuery<GeoCity[]>({
    queryKey: ['catalog', { region }],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;
      const regions: Exclude<RegionKey, 'all'>[] =
        region === 'all' ? ['americas', 'europe', 'asia', 'africa', 'oceania'] : [region as Exclude<RegionKey, 'all'>];

      const pages = await Promise.all(
        regions.map(async (r) => {
          const res = await fetch(`/catalog/${r}-${page}.json`, { cache: 'force-cache' });
          if (!res.ok) return [] as GeoCity[];
          return (await res.json()) as GeoCity[];
        })
      );
      return pages.flat();
    },
    getNextPageParam: (lastPage, _all, lastPageParam) => (lastPage.length > 0 ? (lastPageParam as number) + 1 : undefined),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 30 * 24 * 60 * 60 * 1000,
    refetchOnMount: false,
  });
}


