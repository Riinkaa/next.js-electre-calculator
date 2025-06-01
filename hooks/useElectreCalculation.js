// d:\Program Edukasi\Hacktiv8 x IBM\real project\electre-calculator\hooks\useElectreCalculation.js
import { useState, useEffect } from "react";
import * as electre from "../lib/electre";

export function useElectreCalculation(parsedData) {
  const [normalizedMatrix, setNormalizedMatrix] = useState(null);
  const [weightedNormalizedMatrix, setWeightedNormalizedMatrix] =
    useState(null);
  const [concordanceMatrix, setConcordanceMatrix] = useState(null);
  const [discordanceMatrix, setDiscordanceMatrix] = useState(null);
  const [concordanceThreshold, setConcordanceThreshold] = useState(0);
  const [discordanceThreshold, setDiscordanceThreshold] = useState(0);
  const [concordanceDominanceMatrix, setConcordanceDominanceMatrix] =
    useState(null);
  const [discordanceDominanceMatrix, setDiscordanceDominanceMatrix] =
    useState(null);
  const [aggregateDominanceMatrix, setAggregateDominanceMatrix] =
    useState(null);
  const [rankingResults, setRankingResults] = useState(null);
  const [calculationError, setCalculationError] = useState("");

  useEffect(() => {
    if (!parsedData) {
      setNormalizedMatrix(null);
      setWeightedNormalizedMatrix(null);
      setConcordanceMatrix(null);
      setDiscordanceMatrix(null);
      setConcordanceThreshold(0);
      setDiscordanceThreshold(0);
      setConcordanceDominanceMatrix(null);
      setDiscordanceDominanceMatrix(null);
      setAggregateDominanceMatrix(null);
      setRankingResults(null);
      setCalculationError("");
      return;
    }

    try {
      setCalculationError("");
      const {
        alternatives: pAlternatives,
        criteria: pCriteria,
        performanceMatrix: pPerfMatrix,
      } = parsedData;

      const currentWeights = pCriteria.map((c) => c.weight);
      const criteriaTypes = pCriteria.map((c) => c.type);
      let transformedPerfMatrix = pPerfMatrix.map((row) => [...row]);

      for (let j = 0; j < criteriaTypes.length; j++) {
        if (criteriaTypes[j] === "cost") {
          for (let i = 0; i < transformedPerfMatrix.length; i++) {
            if (transformedPerfMatrix[i][j] !== 0) {
              transformedPerfMatrix[i][j] = 1 / transformedPerfMatrix[i][j];
            } else {
              transformedPerfMatrix[i][j] = Infinity;
            }
          }
        }
      }

      const normMatrix = electre.calculateNormalizedDecisionMatrix(
        transformedPerfMatrix
      );
      setNormalizedMatrix(normMatrix);

      const weightedNormMatrix =
        electre.calculateWeightedNormalizedDecisionMatrix(
          normMatrix,
          currentWeights
        );
      setWeightedNormalizedMatrix(weightedNormMatrix);

      const { concordanceMatrix: conMatrix, discordanceMatrix: disMatrix } =
        electre.calculateConcordanceAndDiscordanceMatrices(
          weightedNormMatrix,
          currentWeights,
          criteriaTypes
        );
      setConcordanceMatrix(conMatrix);
      setDiscordanceMatrix(disMatrix);

      if (
        conMatrix &&
        conMatrix.length > 0 &&
        disMatrix &&
        disMatrix.length > 0
      ) {
        const conThreshold = electre.calculateThresholds(conMatrix);
        const disThreshold = electre.calculateThresholds(disMatrix);
        setConcordanceThreshold(conThreshold);
        setDiscordanceThreshold(disThreshold);

        const conDomMatrix = electre.calculateDominanceMatrix(
          conMatrix,
          conThreshold,
          true
        );
        const disDomMatrix = electre.calculateDominanceMatrix(
          disMatrix,
          disThreshold,
          false
        );
        setConcordanceDominanceMatrix(conDomMatrix);
        setDiscordanceDominanceMatrix(disDomMatrix);

        const aggDomMatrix = electre.calculateAggregateDominanceMatrix(
          conDomMatrix,
          disDomMatrix
        );
        setAggregateDominanceMatrix(aggDomMatrix);

        if (
          aggDomMatrix &&
          aggDomMatrix.length > 0 &&
          pAlternatives &&
          pAlternatives.length > 0
        ) {
          const ranking = electre.calculateRankingAndScores(
            aggDomMatrix,
            pAlternatives
          );
          setRankingResults(ranking);
        } else {
          setRankingResults(null);
        }
      } else {
        setConcordanceThreshold(0);
        setDiscordanceThreshold(0);
        setConcordanceDominanceMatrix(null);
        setDiscordanceDominanceMatrix(null);
        setAggregateDominanceMatrix(null);
        setRankingResults(null);
      }
    } catch (e) {
      setCalculationError("Error during ELECTRE calculation: " + e.message);
      // Reset all calculation states
      setNormalizedMatrix(null);
      setWeightedNormalizedMatrix(null);
      setConcordanceMatrix(null);
      // ... reset other states ...
      setRankingResults(null);
    }
  }, [parsedData]);

  return {
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
    calculationError,
  };
}
