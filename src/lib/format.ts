export function formatTemp(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '-°';
  return `${Math.round(value)}°`;
}

export function formatWind(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '- m/s';
  return `${value.toFixed(1)} m/s`;
}

export function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '-%';
  return `${Math.round(value)}%`;
}

export function toFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function formatKmh(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '- km/h';
  return `${value.toFixed(1)} km/h`;
}



