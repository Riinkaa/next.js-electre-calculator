// d:\Program Edukasi\Hacktiv8 x IBM\real project\electre-calculator\hooks\useElectreInputs.js
import { useState, useEffect, useCallback, useMemo } from "react";

const initialAlternativesData = [
  { id: Date.now() + Math.random(), name: "Alt1" },
  { id: Date.now() + Math.random(), name: "Alt2" },
  { id: Date.now() + Math.random(), name: "Alt3" },
  { id: Date.now() + Math.random(), name: "Alt4" },
];
const initialCriteriaData = [
  { id: Date.now() + Math.random(), name: "Harga", weight: "0.30", type: "cost" },
  { id: Date.now() + Math.random(), name: "Kualitas", weight: "0.25", type: "benefit" },
  { id: Date.now() + Math.random(), name: "Fitur", weight: "0.20", type: "benefit" },
  { id: Date.now() + Math.random(), name: "Garansi", weight: "0.15", type: "benefit" },
  { id: Date.now() + Math.random(), name: "Populer", weight: "0.10", type: "benefit" },
];

export function useElectreInputs() {
  const [alternativesList, setAlternativesList] = useState(initialAlternativesData);
  const [criteriaList, setCriteriaList] = useState(initialCriteriaData);
  const [performanceTableInput, setPerformanceTableInput] = useState({});
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    setPerformanceTableInput((prevInput) => {
      const newTableInput = {};
      const defaultMatrixValues = [
        [2500, 8, 7, 2, 8],
        [2700, 9, 8, 3, 6],
        [2600, 7, 9, 2, 7],
        [2800, 8, 7, 3, 9],
      ];
      const isInitialPopulation = Object.keys(prevInput).length === 0;

      alternativesList.forEach((alt, altIndex) => {
        criteriaList.forEach((crit, critIndex) => {
          const key = `${alt.id}-${crit.id}`;
          if (prevInput[key] !== undefined) {
            newTableInput[key] = prevInput[key];
          } else if (
            isInitialPopulation &&
            defaultMatrixValues[altIndex]?.[critIndex] !== undefined
          ) {
            newTableInput[key] = defaultMatrixValues[altIndex][critIndex].toString();
          } else {
            newTableInput[key] = "";
          }
        });
      });
      return newTableInput;
    });
  }, [alternativesList, criteriaList]);

  const parseInputs = useCallback(() => {
    try {
      const parsedAlternativeNames = alternativesList
        .map((alt) => alt.name.trim())
        .filter((name) => name);
      const parsedCriteriaObjectsFromList = criteriaList
        .map((crit) => ({
          name: crit.name.trim(),
          weight: parseFloat(crit.weight.trim()),
          type: crit.type,
        }))
        .filter((crit) => crit.name);

      const parsedCriteriaNames = parsedCriteriaObjectsFromList.map((c) => c.name);
      const parsedWeights = parsedCriteriaObjectsFromList.map((c) => c.weight);

      if (parsedAlternativeNames.length === 0) {
        return { success: false, error: "Nama alternatif tidak boleh kosong." };
      }
      if (parsedCriteriaNames.length === 0) {
        return { success: false, error: "Nama kriteria tidak boleh kosong." };
      }
      if (parsedWeights.some(isNaN)) {
        return { success: false, error: "Semua bobot harus berupa angka." };
      }
      const totalWeight = parsedWeights.reduce((sum, w) => sum + w, 0);
      if (Math.abs(totalWeight - 1.0) > 0.001) { // Toleransi untuk floating point
        // return { success: false, error: `Total bobot kriteria harus 1 (saat ini: ${totalWeight.toFixed(2)}).` };
      }


      const parsedCriteriaObjects = parsedCriteriaNames.map((name, i) => ({
        name,
        weight: parsedWeights[i],
        type: parsedCriteriaObjectsFromList[i].type,
      }));

      const parsedPerfMatrix = [];
      if (alternativesList.length > 0 && criteriaList.length > 0) {
        for (let i = 0; i < alternativesList.length; i++) {
          const row = [];
          for (let j = 0; j < criteriaList.length; j++) {
            const value = performanceTableInput[`${alternativesList[i].id}-${criteriaList[j].id}`];
            const numValue = parseFloat(value);
            if (value === "" || isNaN(numValue)) {
              return {
                success: false,
                error: `Nilai untuk Alternatif '${alternativesList[i].name}', Kriteria '${criteriaList[j].name}' tidak valid atau kosong.`,
              };
            }
            row.push(numValue);
          }
          parsedPerfMatrix.push(row);
        }
      }

      if (parsedPerfMatrix.length !== alternativesList.length && alternativesList.length > 0) {
        return { success: false, error: `Matriks kinerja harus memiliki ${alternativesList.length} baris.` };
      }
      if (parsedPerfMatrix.length > 0 && parsedPerfMatrix[0]?.length !== criteriaList.length && criteriaList.length > 0) {
        return { success: false, error: `Matriks kinerja harus memiliki ${criteriaList.length} kolom.` };
      }

      return {
        success: true,
        data: {
          alternatives: parsedAlternativeNames,
          criteria: parsedCriteriaObjects,
          performanceMatrix: parsedPerfMatrix,
        },
      };
    } catch (e) {
      return { success: false, error: "Error saat memparsing input: " + e.message };
    }
  }, [alternativesList, criteriaList, performanceTableInput]);

  const parsedResult = useMemo(() => parseInputs(), [parseInputs]);

  useEffect(() => {
    if (!parsedResult.success) {
      setInputError(parsedResult.error);
    } else {
      setInputError("");
    }
  }, [parsedResult]);


  const handlePerformanceTableInputChangeById = (altId, critId, value) => {
    setPerformanceTableInput((prev) => ({ ...prev, [`${altId}-${critId}`]: value }));
  };
  const handleAddAlternative = () => {
    setAlternativesList((prev) => [...prev, { id: Date.now() + Math.random(), name: `Alt${prev.length + 1}` }]);
  };
  const handleRemoveAlternative = (idToRemove) => {
    setAlternativesList((prev) => prev.filter((alt) => alt.id !== idToRemove));
  };
  const handleAlternativeNameChange = (id, newName) => {
    setAlternativesList((prev) => prev.map((alt) => (alt.id === id ? { ...alt, name: newName } : alt)));
  };
  const handleAddCriterion = () => {
    setCriteriaList((prev) => [...prev, { id: Date.now() + Math.random(), name: `Kriteria${prev.length + 1}`, weight: "0.1", type: "benefit" }]);
  };
  const handleRemoveCriterion = (idToRemove) => {
    setCriteriaList((prev) => prev.filter((crit) => crit.id !== idToRemove));
  };
  const handleCriterionNameChange = (id, newName) => {
    setCriteriaList((prev) => prev.map((crit) => (crit.id === id ? { ...crit, name: newName } : crit)));
  };
  const handleCriterionWeightChange = (id, newWeight) => {
    setCriteriaList((prev) => prev.map((crit) => (crit.id === id ? { ...crit, weight: newWeight } : crit)));
  };
  const handleCriterionTypeChange = (id, newType) => {
    setCriteriaList((prev) => prev.map((crit) => (crit.id === id ? { ...crit, type: newType } : crit)));
  };

  return {
    alternativesList,
    criteriaList,
    performanceTableInput,
    inputError,
    parsedData: parsedResult.success ? parsedResult.data : null,
    actions: {
      handleAddAlternative,
      handleRemoveAlternative,
      handleAlternativeNameChange,
      handleAddCriterion,
      handleRemoveCriterion,
      handleCriterionNameChange,
      handleCriterionWeightChange,
      handleCriterionTypeChange,
      handlePerformanceTableInputChangeById,
    },
  };
}
