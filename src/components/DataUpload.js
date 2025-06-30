import { useState } from 'react';

export const DataUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const fileContent = e.target.result;
        let parsedData;

        if (file.name.endsWith('.json')) {
          parsedData = JSON.parse(fileContent);
        } else if (file.name.endsWith('.csv')) {
          const lines = fileContent.split('\n').filter(line => line.trim() !== '');
          if (lines.length === 0) {
            alert('El archivo CSV está vacío.');
            return;
          }
          const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
          parsedData = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            const row = {};
            headers.forEach((header, index) => {
              row[header] = values[index];
            });
            return {
              lote: row.lote,
              red: row.red,
              valvula: row.valvula,
              hectareas: parseFloat(row.hectareas),
              rollos: parseInt(row.rollos, 10),
            };
          });
        } else {
          alert('Tipo de archivo no soportado. Por favor, sube un archivo JSON o CSV.');
          return;
        }

        const formattedData = parsedData.map(row => ({
          lote: row.lote || '',
          red: row.red || '',
          valvula: row.valvula || '',
          hectareas: parseFloat(row.hectareas) || 0,
          rollos: parseInt(row.rollos, 10) || 0,
        }));

        onUpload(formattedData);
      } catch (error) {
        console.error("Error al procesar el archivo:", error);
        alert('Error al procesar el archivo. Asegúrate de que sea un JSON o CSV válido y con las columnas correctas (lote, red, valvula, hectareas, rollos).');
      }
    };

    if (file.name.endsWith('.json') || file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      alert('Tipo de archivo no soportado. Por favor, sube un archivo JSON o CSV.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subir datos locales (JSON o CSV)</label>
          <input
            type="file"
            accept=".json,.csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={!file}
          className={`px-4 py-2 rounded-lg font-medium ${file ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'} transition-colors`}
        >
          Procesar Datos
        </button>
      </div>
    </div>
  );
};