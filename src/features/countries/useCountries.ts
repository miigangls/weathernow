import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { Country } from './types';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * ONE_DAY_MS;

// Alternative public API: https://date.nager.at/api/v3/AvailableCountries
// It returns: Array<{ countryCode: string; name: string }>
const NAGER_AVAILABLE_URL = 'https://date.nager.at/api/v3/AvailableCountries';

function iso2ToFlag(code: string): string {
  if (!code || code.length !== 2) return '';
  const base = 127397;
  const chars = code.toUpperCase().split('');
  try {
    return String.fromCodePoint(...chars.map((c) => base + c.charCodeAt(0)));
  } catch {
    return '';
  }
}

export function useCountries() {
  return useQuery<Country[]>({
    queryKey: ['countries'],
    queryFn: async () => {
      const { data } = await axios.get<{ countryCode: string; name: string }[]>(NAGER_AVAILABLE_URL);
      return data
        .map((item) => ({
          name: { common: item.name },
          cca2: item.countryCode,
          flag: iso2ToFlag(item.countryCode),
        }))
        .filter((c) => c.cca2 && c.name.common)
        .sort((a, b) => a.name.common.localeCompare(b.name.common));
    },
    staleTime: SEVEN_DAYS_MS,
  });
}


