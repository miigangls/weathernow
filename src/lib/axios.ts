import axios from 'axios';

const DEFAULT_BASE_URL = 'https://api.openweathermap.org';

export const api = axios.create({
  baseURL: (import.meta.env.VITE_OWM_BASE_URL as string) || DEFAULT_BASE_URL,
});

export const isOwConfigPresent = Boolean(import.meta.env.VITE_OWM_API_KEY);

api.interceptors.request.use((config) => {
  const params: Record<string, unknown> = {
    ...(config.params || {}),
    units: 'metric',
    lang: 'es',
  };
  const appid = import.meta.env.VITE_OWM_API_KEY;
  if (appid) params.appid = appid;
  config.params = params;
  return config;
});


