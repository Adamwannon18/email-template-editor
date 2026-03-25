import { createContext, useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';

const mediators = [
  { id: 1, slug: 'matthew-proudfoot', name: 'Matthew Proudfoot' },
  { id: 2, slug: 'joel-bertet', name: 'Joel Bertet' },
  { id: 3, slug: 'eric-wannon', name: 'Eric Wannon' },
];

export const MediatorContext = createContext(null);
export function useMediator() { return useContext(MediatorContext); }

function Header() {
  const { mediator, setMediator } = useMediator();
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">SM</span>
        </div>
        <span className="font-semibold text-gray-900 text-sm">Scale Mediation</span>
        <span className="text-gray-300 text-sm">|</span>
        <span className="text-gray-500 text-sm">Email Template Editor</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Viewing as:</span>
        <select
          value={mediator.id}
          onChange={(e) => setMediator(mediators.find((m) => m.id === Number(e.target.value)))}
          className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {mediators.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>
    </header>
  );
}

export default function App() {
  const [mediator, setMediator] = useState(mediators[0]);
  return (
    <MediatorContext.Provider value={{ mediator, setMediator, mediators }}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/edit/:templateId" element={<Editor />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </MediatorContext.Provider>
  );
}
