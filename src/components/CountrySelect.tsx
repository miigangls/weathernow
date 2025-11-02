import { Select } from './ui/select';
import { useCountries } from '../features/countries/useCountries';
import type { Country } from '../features/countries/types';

interface Props {
  value: Country | null;
  onChange: (country: Country | null) => void;
}

export function CountrySelect({ value, onChange }: Props) {
  const { data, isLoading, isError } = useCountries();

  return (
    <div className="space-y-1">
      <label htmlFor="country" className="text-sm font-medium">País</label>
      <Select
        id="country"
        aria-label="Seleccionar país"
        value={value?.cca2 ?? ''}
        onChange={(e) => {
          const selected = data?.find((c) => c.cca2 === e.target.value) ?? null;
          onChange(selected);
        }}
        disabled={isLoading || isError}
      >
        <option value="">Todos</option>
        {data?.map((c) => (
          <option key={c.cca2} value={c.cca2}>
            {c.flag ? `${c.flag} ` : ''}{c.name.common}
          </option>
        ))}
      </Select>
      {isLoading ? <p className="text-sm text-gray-500">Cargando países…</p> : null}
      {isError ? <p className="text-sm text-red-600">Error al cargar países</p> : null}
    </div>
  );
}

export default CountrySelect;


