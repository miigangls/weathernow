import { useEffect, useRef, useState } from 'react';
import SearchResults from '../components/SearchResults';
import { DEFAULT_CITIES } from '../features/geocoding/defaultCities';

export default function PopularPage() {
  const [visibleCount, setVisibleCount] = useState(24);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const s = sentinelRef.current;
    if (!s) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setVisibleCount((p) => Math.min(p + 24, DEFAULT_CITIES.length));
        }
      });
    }, { rootMargin: '200px' });
    io.observe(s);
    return () => io.disconnect();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Ciudades populares del mundo</h1>
      <SearchResults cities={DEFAULT_CITIES.slice(0, visibleCount)} />
      {visibleCount < DEFAULT_CITIES.length && <div ref={sentinelRef} className="h-10" />}
    </div>
  );
}


