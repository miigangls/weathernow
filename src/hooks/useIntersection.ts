import { useEffect, useRef, useState } from 'react';

export function useIntersection<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => setIntersecting(e.isIntersecting));
    }, options ?? { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return { ref, isIntersecting } as const;
}


