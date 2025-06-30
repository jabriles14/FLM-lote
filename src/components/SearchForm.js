import { useState, useEffect } from 'react';

export const SearchForm = ({ data, onSearch, onSelectValve }) => {
  const [selectedLote, setSelectedLote] = useState('');
  const [selectedRed, setSelectedRed] = useState('');
  const [availableReds, setAvailableReds] = useState([]);
  const [availableValvulas, setAvailableValvulas] = useState([]);

  // Obtener lotes únicos
  const uniqueLotes = [...new Set(data.map(item => item.lote))].sort();

  // Actualizar redes disponibles cuando cambia el lote
  useEffect(() => {
    if (selectedLote) {
      const redsForLote = [...new Set(data.filter(item => item.lote === selectedLote).map(item => item.red))].sort();
      setAvailableReds(redsForLote);
      setSelectedRed(''); // Resetear red al cambiar lote
      setAvailableValvulas([]); // Resetear válvulas
    } else {
      setAvailableReds([]);
      setSelectedRed('');
      setAvailableValvulas([]);
    }
  }, [selectedLote, data]);

  // Actualizar válvulas disponibles cuando cambia el lote o la red
  useEffect(() => {
    if (selectedLote && selectedRed) {
      const valvulasForRed = data.filter(item => item.lote === selectedLote && item.red === selectedRed);
      setAvailableValvulas(valvulasForRed);
    } else {
      setAvailableValvulas([]);
    }
  }, [selectedLote, selectedRed, data]);

  const handleLoteChange = (e) => {
    setSelectedLote(e.target.value);
    onSearch({ lote: e.target.value, red: '', valvula: '' }); // Limpiar búsqueda al cambiar lote
  };

  const handleRedChange = (e) => {
    setSelectedRed(e.target.value);
    onSearch({ lote: selectedLote, red: e.target.value, valvula: '' }); // Limpiar búsqueda al cambiar red
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <select
            value={selectedLote}
            onChange={handleLoteChange}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Selecciona Lote</option>
            {uniqueLotes.map(lote => (
              <option key={lote} value={lote}>{lote}</option>
            ))}
          </select>
          
          <select
            value={selectedRed}
            onChange={handleRedChange}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={!selectedLote}
          >
            <option value="">Selecciona Red</option>
            {availableReds.map(red => (
              <option key={red} value={red}>{red}</option>
            ))}
          </select>
        </div>

        {selectedLote && selectedRed && availableValvulas.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-medium text-gray-700 mb-3">Válvulas disponibles:</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {availableValvulas.map((item, index) => (
                <button
                  key={index}
                  onClick={() => onSelectValve(item)}
                  className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  {item.valvula || 'Sin Válvula'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};