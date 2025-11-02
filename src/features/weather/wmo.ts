export function wmoInfo(code?: number): { label: string; icon: string } {
  if (code === undefined || code === null) return { label: '—', icon: '☁️' };
  const ranges: Array<[number | [number, number], string, string]> = [
    [0, 'Despejado', '☀️'],
    [[1, 3], 'Nubes', '⛅'],
    [[45, 48], 'Niebla', '🌫️'],
    [[51, 57], 'Llovizna', '🌦️'],
    [[61, 67], 'Lluvia', '🌧️'],
    [[71, 77], 'Nieve', '❄️'],
    [[80, 82], 'Chubascos', '🌦️'],
    [[95, 99], 'Tormenta', '⛈️'],
  ];
  for (const [r, label, icon] of ranges) {
    if (typeof r === 'number' && r === code) return { label, icon };
    if (Array.isArray(r) && code >= r[0] && code <= r[1]) return { label, icon };
  }
  return { label: '—', icon: '☁️' };
}


