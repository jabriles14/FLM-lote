import { groupByLote } from '../utils/calculations';

export const SummaryTable = ({ data }) => {
  const groupedByLote = groupByLote(data);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Resumen por Lote</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lote</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hectáreas</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rollos</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {Object.entries(groupedByLote).map(([lote, values], index) => (
              <tr key={lote} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{lote}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{values.hectareas.toFixed(2)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{values.rollos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
// DONE