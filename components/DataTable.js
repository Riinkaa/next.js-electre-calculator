// d:\Program Edukasi\Hacktiv8 x IBM\real project\electre-calculator\components\DataTable.js
import React from "react";

const DataTable = ({ title, headers, data, rowLabels }) => {
  if (!data) {
    return null;
  }
  if (
    data.length === 0 &&
    title === "1. Tabel Alternatif, Kriteria, dan Nilai Awal"
  ) {
    // Khusus untuk tabel input awal, jangan tampilkan "Data tidak tersedia" jika memang belum ada input
    return null;
  }
  if (data.length === 0) {
    return null; // Akan ditangani oleh UI utama
  }

  const displayData = (val) => {
    if (typeof val === "number") {
      if (Number.isInteger(val)) {
        return val.toString();
      } else {
        const roundedVal = parseFloat(val.toFixed(4));
        return roundedVal.toString();
      }
    }
    return val; // Kembalikan nilai asli jika bukan angka (misalnya, string '-')
  };

  return (
    <div className="mb-8 overflow-x-auto">
      <h3 className="text-xl font-semibold mb-3 text-gray-700">{title}</h3>
      <table className="min-w-full border-collapse border border-gray-300 shadow-sm rounded-lg">
        <thead className="bg-slate-100">
          <tr>
            {rowLabels && rowLabels.length > 0 && (
              <th className="p-3 border border-gray-300 text-left text-sm font-medium text-gray-600 min-w-[120px]">
                Alternatif
              </th>
            )}
            {headers &&
              headers.map((header, index) => (
                <th
                  className="p-3 border border-gray-300 text-left text-sm font-medium text-gray-600"
                  key={`header-${index}`}
                >
                  {header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {rowLabels && rowLabels.length > rowIndex && (
                <td className="p-3 border border-gray-300 text-sm text-gray-700">
                  <b>{rowLabels[rowIndex]}</b>
                </td>
              )}
              {Array.isArray(row) ? (
                row.map((cell, cellIndex) => (
                  <td
                    className="p-3 border border-gray-300 text-sm text-gray-700 text-right"
                    key={`cell-${rowIndex}-${cellIndex}`}
                  >
                    {displayData(cell)}
                  </td>
                ))
              ) : (
                <td className="p-3 border border-gray-300 text-sm text-gray-700 text-right">
                  {displayData(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
