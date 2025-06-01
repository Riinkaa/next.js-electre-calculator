// d:\Program Edukasi\Hacktiv8 x IBM\real project\electre-calculator\components\InputSection.js
import React from "react";
import AlternativeInput from "./AlternativeInput";
import CriteriaInput from "./CriteriaInput";

const InputSection = ({
  error,
  alternativesList,
  onAddAlternative,
  onRemoveAlternative,
  onAlternativeNameChange,
  criteriaList,
  onAddCriterion,
  onRemoveCriterion,
  onCriterionNameChange,
  onCriterionWeightChange,
  onCriterionTypeChange,
  performanceTableInput,
  onPerformanceTableInputChangeById,
}) => {
  return (
    <div className="mb-10 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-slate-700 border-b pb-3">
        Input Data
      </h2>
      {error && (
        <p className="mb-4 p-3 border border-red-300 bg-red-50 text-red-600 rounded-md text-sm">
          Error: {error}
        </p>
      )}
      {/* Input Alternatif Dinamis */}
      <AlternativeInput
        alternativesList={alternativesList}
        onAddAlternative={onAddAlternative}
        onRemoveAlternative={onRemoveAlternative}
        onNameChange={onAlternativeNameChange}
      />

      {/* Input Kriteria dan Bobot Dinamis */}
      <CriteriaInput
        criteriaList={criteriaList}
        onAddCriterion={onAddCriterion}
        onRemoveCriterion={onRemoveCriterion}
        onNameChange={onCriterionNameChange}
        onWeightChange={onCriterionWeightChange}
        onTypeChange={onCriterionTypeChange}
      />
      {/* Input Tabel Kinerja Dinamis */}
      <div className="mt-6 overflow-x-auto">
        <h4 className="text-lg font-medium mb-3 text-slate-600">
          Nilai Kriteria tiap Alternatif:
        </h4>
        {alternativesList.length > 0 && criteriaList.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="p-3 bg-slate-100 border-b border-gray-300 text-left text-sm font-medium text-gray-600">
                  Alternatif / Kriteria
                </th>
                {criteriaList.map((crit) => (
                  <th
                    key={crit.id} // Use crit.id for key if available and unique
                    className="p-3 bg-slate-100 border-b border-l border-gray-300 text-left text-sm font-medium text-gray-600 min-w-[100px]"
                  >
                    {crit.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alternativesList.map((alt) => (
                <tr key={alt.id}>
                  <td className="p-2.5 border-b border-gray-300 bg-slate-50 font-medium text-slate-700 text-sm">
                    {alt.name}
                  </td>
                  {criteriaList.map((crit) => (
                    <td key={crit.id} style={{ padding: "0" }}>
                      <input
                        type="number" // Atau "text" jika ingin lebih fleksibel dan validasi manual
                        value={
                          performanceTableInput[`${alt.id}-${crit.id}`] || ""
                        }
                        onChange={(e) =>
                          onPerformanceTableInputChangeById(
                            alt.id,
                            crit.id,
                            e.target.value
                          )
                        }
                        className="w-full p-2.5 border-0 box-border text-right bg-transparent focus:ring-1 focus:ring-blue-500 focus:bg-blue-50 rounded-sm transition-all text-sm"
                        placeholder={`Nilai ${crit.name}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-500 text-sm">
            Masukkan nama alternatif dan nama kriteria terlebih dahulu untuk
            menampilkan tabel input nilai.
          </p>
        )}
      </div>
    </div>
  );
};

export default InputSection;
