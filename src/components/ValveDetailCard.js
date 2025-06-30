export const ValveDetailCard = ({ valveData }) => {
  if (!valveData) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center text-gray-500">
        Selecciona una válvula para ver sus detalles.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Detalle de Válvula: {valveData.valvula || 'N/A'}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Lote:</span>
          <span className="text-lg font-semibold text-gray-900">{valveData.lote}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Red:</span>
          <span className="text-lg font-semibold text-gray-900">{valveData.red}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Hectáreas:</span>
          <span className="text-lg font-semibold text-gray-900">{valveData.hectareas.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Rollos:</span>
          <span className="text-lg font-semibold text-gray-900">{valveData.rollos}</span>
        </div>
      </div>
    </div>
  );
};