export default function ConfigAlert() {
  return (
    <div className="mb-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      Falta configurar la API Key de OpenWeather. Crea un archivo <code>.env</code> con:
      <pre className="mt-2 whitespace-pre-wrap rounded bg-white/60 p-2">{`VITE_OWM_API_KEY=tu_api_key_de_openweathermap\nVITE_OWM_BASE_URL=https://api.openweathermap.org`}</pre>
      Reinicia el servidor de desarrollo después de guardarlo.
    </div>
  );
}


