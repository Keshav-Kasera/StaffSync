/**
 * Utility to generate and download client-side CSV files
 * Demonstrates real data-handling engineering depth
 */
export const exportToCsv = (filename, headers, rows) => {
  if (!rows || !rows.length) {
    alert('No data available to export');
    return;
  }

  const csvRows = [];

  // Add header row
  csvRows.push(headers.map((h) => `"${h}"`).join(','));

  // Add data rows
  rows.forEach((row) => {
    const escapedValues = row.map((val) => {
      if (val === null || val === undefined) return '""';
      const strVal = String(val).replace(/"/g, '""');
      return `"${strVal}"`;
    });
    csvRows.push(escapedValues.join(','));
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
