import { useEffect, useMemo, useRef, useState } from 'react';
import { useCitySearch } from '../features/geocoding/useCitySearch';
import type { GeoCity } from '../features/geocoding/types';
import { Input } from './ui/input';

interface Props {
  country?: string;
  onSelect: (city: GeoCity) => void;
}

export function CitySearch({ country, onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const timer = useRef<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDebounced(query.trim()), 300);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [query]);

  const { data, isFetching, isError } = useCitySearch({ name: debounced, country, limit: 10 });
  const suggestions = useMemo(() => data ?? [], [data]);

  useEffect(() => {
    setOpen(Boolean(query.length >= 2 && suggestions.length > 0));
  }, [query, suggestions.length]);

  const handlePick = (city: GeoCity) => {
    onSelect(city);
    setQuery('');
    setDebounced('');
    setOpen(false);
  };

  return (
    <div>
      <div className="space-y-1">
        <label htmlFor="city" className="text-sm font-medium">Ciudad</label>
        <Input
          id="city"
          placeholder="Busca una ciudad"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && suggestions[0]) {
              e.preventDefault();
              handlePick(suggestions[0]);
            }
          }}
          aria-autocomplete="list"
          aria-controls="city-suggestions"
        />
      </div>
      {isFetching ? <p className="mt-2 text-sm text-gray-500">Buscando…</p> : null}
      {isError ? <p className="mt-2 text-sm text-red-600">Error al buscar ciudades</p> : null}
      {open && suggestions.length > 0 && (
        <ul id="city-suggestions" role="listbox" className="mt-2 max-h-60 overflow-auto rounded-md border border-gray-200 bg-white shadow-sm">
          {suggestions.map((c, idx) => (
            <li
              key={`${c.name}-${c.lat}-${c.lon}-${idx}`}
              role="option"
              className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-50"
              onClick={() => handlePick(c)}
            >
              {c.name}{c.state ? `, ${c.state}` : ''} · {c.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CitySearch;


