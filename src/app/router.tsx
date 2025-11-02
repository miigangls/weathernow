import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CityPage from '../pages/CityPage';
import FavoritesPage from '../pages/FavoritesPage';
import PopularPage from '../pages/PopularPage';
import { useAtom } from 'jotai';
import { unitAtom } from '../features/favorites/atoms';

function AppHeader() {
  const [unit, setUnit] = useAtom(unitAtom);
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg">Clima APP</Link>
        <nav className="flex gap-4 text-sm items-center">
          {/*  <Link to="/" className="hover:text-blue-600">Inicio</Link>
         <Link to="/popular" className="hover:text-blue-600">Populares</Link> 
          <Link to="/favorites" className="hover:text-blue-600">Favoritos</Link>*/}
          <button
            className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs hover:bg-gray-50"
            onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
            aria-label="Cambiar unidades"
          >{unit === 'C' ? '°C' : '°F'}</button>
        </nav>
      </div>
    </header>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <div className="min-h-full flex flex-col">
        <AppHeader />
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/popular" element={<PopularPage />} />
            <Route path="/city/:lat,:lon" element={<CityPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;


