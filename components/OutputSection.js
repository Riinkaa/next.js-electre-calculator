// d:\Program Edukasi\Hacktiv8 x IBM\real project\electre-calculator\components\OutputSection.js
import React from "react";
import DataTable from "./DataTable";

const OutputSection = ({
  performanceMatrix,
  criteriaNamesForTable,
  alternatives,
  normalizedMatrix,
  weightedNormalizedMatrix,
  concordanceMatrix,
  discordanceMatrix,
  concordanceThreshold,
  discordanceThreshold,
  concordanceDominanceMatrix,
  discordanceDominanceMatrix,
  aggregateDominanceMatrix,
  rankingResults,
}) => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-semibold mb-8 text-slate-700 text-center">
        Output Perhitungan
      </h2>
      {performanceMatrix && performanceMatrix.length > 0 ? (
        <>
          <DataTable
            title="1. Tabel Alternatif, Kriteria, dan Nilai Awal"
            headers={criteriaNamesForTable}
            data={performanceMatrix}
            rowLabels={alternatives}
          />
          <DataTable
            title="2. Matriks Normalisasi Keputusan (R)"
            headers={criteriaNamesForTable}
            data={normalizedMatrix}
            rowLabels={alternatives}
          />
          <DataTable
            title="3. Matriks Normalisasi Terbobot (V)"
            headers={criteriaNamesForTable}
            data={weightedNormalizedMatrix}
            rowLabels={alternatives}
          />
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">
              4. Himpunan Concordance dan Discordance
            </h3>
            <p className="text-sm text-blue-600">
              Himpunan Concordance dan Discordance digunakan untuk menghitung
              matriks di bawah ini. Himpunan ini adalah kumpulan kriteria di
              mana satu alternatif lebih baik atau sama dengan (concordance)
              atau lebih buruk dari (discordance) alternatif lain untuk setiap
              pasangan alternatif.
            </p>
          </div>

          <DataTable
            title="5. Matriks Concordance (C)"
            headers={alternatives}
            data={concordanceMatrix}
            rowLabels={alternatives}
          />
          <DataTable
            title="5. Matriks Discordance (D)"
            headers={alternatives}
            data={discordanceMatrix}
            rowLabels={alternatives}
          />

          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-green-700">
              6. Threshold Concordance dan Discordance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p className="text-green-600">
                Concordance Threshold (c̄):{" "}
                <strong className="font-mono bg-green-100 px-2 py-1 rounded">
                  {concordanceThreshold
                    ? concordanceThreshold.toFixed(4)
                    : "N/A"}
                </strong>
              </p>
              <p className="text-green-600">
                Discordance Threshold (d̄):{" "}
                <strong className="font-mono bg-green-100 px-2 py-1 rounded">
                  {discordanceThreshold
                    ? discordanceThreshold.toFixed(4)
                    : "N/A"}
                </strong>
              </p>
            </div>
          </div>
          <DataTable
            title="7. Matriks Dominan Concordance (F)"
            headers={alternatives}
            data={concordanceDominanceMatrix}
            rowLabels={alternatives}
          />
          <DataTable
            title="7. Matriks Dominan Discordance (G)"
            headers={alternatives}
            data={discordanceDominanceMatrix}
            rowLabels={alternatives}
          />
          <DataTable
            title="8. Matriks Agregat Dominan (E)"
            headers={alternatives}
            data={aggregateDominanceMatrix}
            rowLabels={alternatives}
          />
          {/* Section 9: Ranking */}
          {rankingResults && rankingResults.length > 0 && (
            <DataTable
              title="9. Peringkat Alternatif dan Skor Dominasi"
              headers={["Peringkat", "Alternatif", "Skor Dominasi"]}
              data={rankingResults.map((r) => [r.rank, r.name, r.score])}
            />
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-slate-500 text-lg">
            Belum ada data untuk ditampilkan.
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Silakan masukkan data dan klik "Hitung ELECTRE".
          </p>
        </div>
      )}
    </div>
  );
};

export default OutputSection;
