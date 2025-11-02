import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useForecast } from '../features/weather/useForecast';
import { useAtom } from 'jotai';
import { lastOpenedCityAtom, unitAtom } from '../features/favorites/atoms';
import EmptyState from '../components/EmptyState';
import { wmoInfo } from '../features/weather/wmo';
import { toFahrenheit } from '../lib/format';

export default function CityPage() {
  const params = useParams();
  const [search] = useSearchParams();
  const lat = Number(params.lat);
  const lon = Number(params.lon);
  const name = search.get('name') ?? '';
  const { data, isLoading, isError } = useForecast(lat, lon);
  const [unit] = useAtom(unitAtom);
  const [, setLastOpened] = useAtom(lastOpenedCityAtom);

  useEffect(() => {
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      setLastOpened({ name, lat, lon });
    }
  }, [lat, lon, name, setLastOpened]);

  const [tab, setTab] = useState<'resumen' | 'precip' | 'viento' | 'humedad'>('resumen');

  if (isLoading) return <EmptyState title="Cargando clima…" />;
  if (isError || !data) return <EmptyState title="No se pudo cargar el clima" description="Vuelve a intentarlo más tarde." />;

  const now = data.current;
  const wmo = wmoInfo(now.weather_code);
  const toUnit = (c: number | undefined) => (unit === 'F' && typeof c === 'number' ? toFahrenheit(c) : c ?? NaN);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="text-center">
        <h1 className="text-2xl font-semibold">{name || 'Ciudad'}</h1>
        <div className="mt-4 text-6xl font-bold">{Math.round(toUnit(now.temperature_2m) ?? NaN)}°</div>
        <div className="mt-1 text-gray-600 flex items-center justify-center gap-2">
          <span>{wmo.icon}</span>
          <span>{wmo.label}</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-3 text-sm">
          <div>Sensación {Math.round(toUnit(now.apparent_temperature) ?? NaN)}°</div>
          <div>Humedad {data.current.relative_humidity_2m ?? '—'}%</div>
          <div>Viento {data.current.wind_speed_10m?.toFixed(1) ?? '—'} km/h</div>
        </div>
      </header>

      <div className="flex justify-center gap-2">
        {(['resumen','precip','viento','humedad'] as const).map((k) => (
          <button key={k} className={`rounded-full px-3 py-1 text-sm ${tab===k?'bg-blue-600 text-white':'bg-gray-100'}`} onClick={() => setTab(k)}>
            {k === 'resumen' ? 'Resumen' : k === 'precip' ? 'Precipitaciones' : k === 'viento' ? 'Viento' : 'Humedad'}
          </button>
        ))}
      </div>

      {tab === 'resumen' && (
        <section className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md border p-3">Máx/Mín hoy<br/><span className="font-semibold">{Math.round(toUnit(data.daily.temperature_2m_max[0]))}° / {Math.round(toUnit(data.daily.temperature_2m_min[0]))}°</span></div>
          <div className="rounded-md border p-3">Amanecer/Atardecer<br/><span className="font-semibold">{new Date(data.daily.sunrise[0]).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} / {new Date(data.daily.sunset[0]).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span></div>
          <div className="rounded-md border p-3">Precipitación día<br/><span className="font-semibold">{(data.daily.precipitation_sum[0] ?? 0).toFixed(1)} mm</span></div>
          <div className="rounded-md border p-3">Prob. precip.<br/><span className="font-semibold">{data.daily.precipitation_probability_max[0] ?? 0}%</span></div>
        </section>
      )}

      {tab === 'precip' && (
        <section className="grid grid-cols-3 gap-2 text-xs">
          {data.hourly.time.slice(0, 24).map((t, i) => (
            <div key={t} className="rounded-md border p-2">
              <div className="text-gray-500">{new Date(t).toLocaleTimeString([], {hour:'2-digit'})}</div>
              <div>{(data.hourly.precipitation[i] ?? 0).toFixed(2)} mm</div>
              <div>{data.hourly.precipitation_probability[i] ?? 0}%</div>
            </div>
          ))}
        </section>
      )}

      {tab === 'viento' && (
        <section className="grid grid-cols-3 gap-2 text-xs">
          {data.hourly.time.slice(0, 24).map((t, i) => (
            <div key={t} className="rounded-md border p-2">
              <div className="text-gray-500">{new Date(t).toLocaleTimeString([], {hour:'2-digit'})}</div>
              <div>Vel {data.hourly.wind_speed_10m[i]?.toFixed(1) ?? '—'} km/h</div>
              <div>Ráf {data.hourly.wind_gusts_10m[i]?.toFixed(1) ?? '—'} km/h</div>
            </div>
          ))}
        </section>
      )}

      {tab === 'humedad' && (
        <section className="grid grid-cols-3 gap-2 text-xs">
          {data.hourly.time.slice(0, 24).map((t, i) => (
            <div key={t} className="rounded-md border p-2">
              <div className="text-gray-500">{new Date(t).toLocaleTimeString([], {hour:'2-digit'})}</div>
              <div>Hum {data.hourly.relative_humidity_2m[i] ?? '—'}%</div>
              <div>Nub {data.hourly.cloud_cover[i] ?? '—'}%</div>
            </div>
          ))}
        </section>
      )}

      <section>
        <div className="mb-2 text-sm font-medium">Próximos días</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
          {data.daily.time.slice(0, 7).map((d, i) => (
            <div key={d} className="rounded-md border p-3 text-center">
              <div className="text-gray-500">{new Date(d).toLocaleDateString(undefined, { weekday: 'short' })}</div>
              <div className="text-2xl">{wmoInfo(data.daily.weather_code[i]).icon}</div>
              <div className="font-semibold">{Math.round(toUnit(data.daily.temperature_2m_max[i]))}° / {Math.round(toUnit(data.daily.temperature_2m_min[i]))}°</div>
              <div className="text-gray-600 text-xs">Prob. {data.daily.precipitation_probability_max[i] ?? 0}%</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


