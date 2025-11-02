import { useEffect, useRef, useState } from 'react';
import SearchResults from '../components/SearchResults';
import ConfigAlert from '../components/ConfigAlert';
import { isOwConfigPresent } from '../lib/axios';
import { DEFAULT_CITIES } from '../features/geocoding/defaultCities';
import { Input } from '../components/ui/input';

export default function HomePage() {
  
  const [filter, setFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(24);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 24, DEFAULT_CITIES.length));
        }
      });
    }, { rootMargin: '200px' });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const filtered = DEFAULT_CITIES.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()));
  const citiesToShow = filtered.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      <div className="w-full max-w-ls">
          <label htmlFor="filter" className="text-sm font-medium">Filtrar por ciudad</label>
          <Input id="filter" placeholder="Escribe una ciudad…" value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
      {!isOwConfigPresent && <ConfigAlert />}
      <section className="space-y-3">
        
        <SearchResults cities={citiesToShow} />
        <div className="mt-2 text-center text-sm text-gray-600" aria-live="polite">
          {visibleCount < filtered.length ? 'Desplázate para cargar más' : (filtered.length === 0 ? 'Sin resultados' : '')}
        </div>
        {visibleCount < filtered.length && <div ref={sentinelRef} className="h-10" />}
      </section>
    </div>
  );
}


