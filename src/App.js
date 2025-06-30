import { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { ResultsTable } from './components/ResultsTable';
import { SummaryCard } from './components/SummaryCard';
import { ValveDetailCard } from './components/ValveDetailCard';
import { SummaryTable } from './components/SummaryTable'; // Asegúrate de importar el componente de la tabla de resumen
import { initialData } from './mock/agricola';
import { calculateTotals, groupByLote } from './utils/calculations';

export default function App() {
  const [data, setData] = useState(initialData);
  const [searchResults, setSearchResults] = useState(initialData);
  const [selectedValve, setSelectedValve] = useState(null);

  const { totalHectareas, totalRollos } = calculateTotals(searchResults);
  // const groupedByLote = groupByLote(searchResults); // Ya no se usa directamente aquí, se pasa a SummaryTable

  const handleSearch = ({ lote, red, valvula }) => {
    let filteredResults = data;

    if (lote) {
      filteredResults = filteredResults.filter(item => String(item.lote) === String(lote));
    }
    if (red) {
      filteredResults = filteredResults.filter(item => String(item.red) === String(red));
    }
    
    setSearchResults(filteredResults);
    setSelectedValve(null);
  };

  const handleSelectValve = (valveData) => {
    setSelectedValve(valveData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Fundo las Mercedes - AGK</h1> {/* Nombre actualizado */}
          <div className="text-sm text-gray-500">Datos precargados</div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SearchForm data={data} onSearch={handleSearch} onSelectValve={handleSelectValve} />
            <ValveDetailCard valveData={selectedValve} />
            <ResultsTable data={searchResults} />
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Resumen General</h2>
              <div className="grid grid-cols-2 gap-4">
                <SummaryCard 
                  title="Hectáreas Totales" 
                  value={totalHectareas.toFixed(2)} 
                  icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>}
                />
                <SummaryCard 
                  title="Rollos Totales" 
                  value={totalRollos} 
                  icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
                />
              </div>
            </div>

            <SummaryTable data={searchResults} /> {/* Usar el componente de tabla de resumen */}
          </div>
        </div>
      </div>
    </div>
  );
}
// DONE