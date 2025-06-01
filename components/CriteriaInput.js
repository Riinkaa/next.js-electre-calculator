// components/CriteriaInput.js
import React from "react";

const CriteriaInput = ({
  criteriaList,
  onAddCriterion,
  onRemoveCriterion,
  onNameChange,
  onWeightChange,
  onTypeChange,
}) => {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-medium mb-3 text-slate-600">
        Kriteria dan Bobot:
      </h4>
      {criteriaList.map((crit, index) => (
        <div
          key={crit.id}
          className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-2 items-center mb-2"
        >
          <input
            type="text"
            value={crit.name}
            onChange={(e) => onNameChange(crit.id, e.target.value)}
            placeholder={`Nama Kriteria ${index + 1}`}
            className="p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
          />
          <input
            type="number"
            value={crit.weight}
            onChange={(e) => onWeightChange(crit.id, e.target.value)}
            placeholder={`Bobot`}
            step="0.01"
            className="p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
          />
          <select
            value={crit.type}
            onChange={(e) => onTypeChange(crit.id, e.target.value)}
            className="p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white"
          >
            <option value="benefit">Benefit</option>
            <option value="cost">Cost</option>
          </select>
          {criteriaList.length > 1 && (
            <button
              onClick={() => onRemoveCriterion(crit.id)}
              className="px-3 py-2.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors shadow-sm h-full"
            >
              Hapus
            </button>
          )}
        </div>
      ))}
      <button
        onClick={onAddCriterion}
        className="mt-3 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors shadow-sm"
      >
        Tambah Kriteria
      </button>
    </div>
  );
};

export default CriteriaInput;
