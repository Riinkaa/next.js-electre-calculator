// "use client" directive makes this a Client Component
"use client";
import React from "react";
import InputSection from "../components/InputSection"; // Impor komponen InputSection
import OutputSection from "../components/OutputSection"; // Impor komponen OutputSection
import { useElectreInputs } from "../hooks/useElectreInput"; // Impor custom hook input
import { useElectreCalculation } from "../hooks/useElectreCalculation";
export default function ElectreCalculator() {
  const {
    alternativesList,
    criteriaList,
    performanceTableInput,
    inputError,
    parsedData,
    actions: inputActions,
  } = useElectreInputs();

  const calculationResults = useElectreCalculation(parsedData);

  return (
    <div
      className="container mx-auto p-4 md:p-8 font-sans text-gray-800" // Menggunakan font dari layout (font-sans akan mengambil dari body)
    >
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-700">
          Kalkulator ELECTRE
        </h1>
        <p className="text-slate-500 mt-2">
          Solusi Cerdas untuk Pengambilan Keputusan Multi-Kriteria
        </p>
      </header>

      <InputSection
        error={inputError || calculationResults.calculationError} // Gabungkan error jika ada
        alternativesList={alternativesList}
        onAddAlternative={inputActions.handleAddAlternative}
        onRemoveAlternative={inputActions.handleRemoveAlternative}
        onAlternativeNameChange={inputActions.handleAlternativeNameChange}
        criteriaList={criteriaList}
        onAddCriterion={inputActions.handleAddCriterion}
        onRemoveCriterion={inputActions.handleRemoveCriterion}
        onCriterionNameChange={inputActions.handleCriterionNameChange}
        onCriterionWeightChange={inputActions.handleCriterionWeightChange}
        onCriterionTypeChange={inputActions.handleCriterionTypeChange}
        performanceTableInput={performanceTableInput}
        onPerformanceTableInputChangeById={
          inputActions.handlePerformanceTableInputChangeById
        }
      />

      <OutputSection
        // Props untuk tabel awal dari parsedData
        performanceMatrix={parsedData?.performanceMatrix}
        criteriaNamesForTable={parsedData?.criteria?.map((c) => c.name)}
        alternatives={parsedData?.alternatives}
        // Props hasil kalkulasi
        normalizedMatrix={calculationResults.normalizedMatrix}
        weightedNormalizedMatrix={calculationResults.weightedNormalizedMatrix}
        concordanceMatrix={calculationResults.concordanceMatrix}
        discordanceMatrix={calculationResults.discordanceMatrix}
        concordanceThreshold={calculationResults.concordanceThreshold}
        discordanceThreshold={calculationResults.discordanceThreshold}
        concordanceDominanceMatrix={
          calculationResults.concordanceDominanceMatrix
        }
        discordanceDominanceMatrix={
          calculationResults.discordanceDominanceMatrix
        }
        aggregateDominanceMatrix={calculationResults.aggregateDominanceMatrix}
        rankingResults={calculationResults.rankingResults}
      />
    </div>
  );
}
