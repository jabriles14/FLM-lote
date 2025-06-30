export const SummaryCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-lg bg-green-100 text-green-600">
          {icon}
        </div>
      </div>
    </div>
  );
};