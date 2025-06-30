export const ResultsTable = ({ data }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lote</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Red</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Válvula</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hectáreas</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rollos</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.lote}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.red}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.valvula}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.hectareas}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.rollos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};