// components/AlternativeInput.js
import React from "react";

const AlternativeInput = ({
  alternativesList,
  onAddAlternative,
  onRemoveAlternative,
  onNameChange,
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h4 style={{ marginBottom: "10px" }}>Nama Alternatif:</h4>
      {alternativesList.map((alt, index) => (
        <div key={alt.id} className="flex items-center mb-2 gap-2">
          <input
            type="text"
            value={alt.name}
            onChange={(e) => onNameChange(alt.id, e.target.value)}
            placeholder={`Nama Alternatif ${index + 1}`}
            className="flex-grow p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
          />
          {alternativesList.length > 1 && (
            <button
              onClick={() => onRemoveAlternative(alt.id)}
              className="px-3 py-2.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors shadow-sm"
            >
              Hapus
            </button>
          )}
        </div>
      ))}
      <button
        onClick={onAddAlternative}
        className="mt-3 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors shadow-sm"
      >
        Tambah Alternatif
      </button>
    </div>
  );
};

export default AlternativeInput;
