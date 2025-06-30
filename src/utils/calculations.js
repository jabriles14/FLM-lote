export const calculateTotals = (data) => {
  return data.reduce((acc, item) => {
    acc.totalHectareas += item.hectareas;
    acc.totalRollos += item.rollos;
    return acc;
  }, { totalHectareas: 0, totalRollos: 0 });
};

export const groupByLote = (data) => {
  const grouped = {};
  data.forEach(item => {
    if (!grouped[item.lote]) {
      grouped[item.lote] = { hectareas: 0, rollos: 0 };
    }
    grouped[item.lote].hectareas += item.hectareas;
    grouped[item.lote].rollos += item.rollos;
  });
  return grouped;
};