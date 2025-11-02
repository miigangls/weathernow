import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Country } from '../countries/types';
import type { GeoCity } from '../geocoding/types';

export const countryAtom = atom<Country | null>(null);

export const lastCitiesAtom = atomWithStorage<GeoCity[]>(
  'weathernow:lastCities',
  [],
);

export const favoritesAtom = atomWithStorage<GeoCity[]>(
  'weathernow:favorites',
  [],
);

export const themeAtom = atomWithStorage<'light' | 'dark'>(
  'weathernow:theme',
  'light',
);

export const unitAtom = atomWithStorage<'C' | 'F'>(
  'weathernow:unit',
  'C',
);

export const lastOpenedCityAtom = atomWithStorage<{ name: string; lat: number; lon: number } | null>(
  'weathernow:lastOpenedCity',
  null,
);


