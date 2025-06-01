// lib/electre.js

// Helper function for sum of squares
const sumOfSquares = (arr) => arr.reduce((acc, val) => acc + val * val, 0);

// 1. Matriks Normalisasi Keputusan (R)
export function calculateNormalizedDecisionMatrix(performanceMatrix) {
  const numAlternatives = performanceMatrix.length;
  if (numAlternatives === 0) return [];
  const numCriteria = performanceMatrix[0].length;
  const normalizedMatrix = Array(numAlternatives)
    .fill(null)
    .map(() => Array(numCriteria).fill(0));

  for (let j = 0; j < numCriteria; j++) {
    const column = performanceMatrix.map((row) => row[j]);
    const denominator = Math.sqrt(sumOfSquares(column.map(Number))); // Pastikan nilai adalah angka
    if (denominator === 0) {
      for (let i = 0; i < numAlternatives; i++) {
        normalizedMatrix[i][j] = 0;
      }
    } else {
      for (let i = 0; i < numAlternatives; i++) {
        normalizedMatrix[i][j] = Number(performanceMatrix[i][j]) / denominator;
      }
    }
  }
  return normalizedMatrix;
}

// 2. Matriks Normalisasi Terbobot (V)
export function calculateWeightedNormalizedDecisionMatrix(
  normalizedMatrix,
  weights
) {
  if (normalizedMatrix.length === 0) return [];
  return normalizedMatrix.map((row) =>
    row.map((val, j) => val * Number(weights[j]))
  );
}

// 3. Matriks Concordance (C) dan Discordance (D)
export function calculateConcordanceAndDiscordanceMatrices(
  weightedNormalizedMatrix,
  weights,
  criteriaTypes // Kembalikan parameter ini
) {
  const numAlternatives = weightedNormalizedMatrix.length;
  if (numAlternatives === 0)
    return { concordanceMatrix: [], discordanceMatrix: [] };
  const numCriteria = weights.length;

  const concordanceMatrix = Array(numAlternatives)
    .fill(null)
    .map(() => Array(numAlternatives).fill(0));
  const discordanceMatrix = Array(numAlternatives)
    .fill(null)
    .map(() => Array(numAlternatives).fill(0));

  let maxOverallDiff = 0;
  if (numAlternatives > 1) {
    for (let k = 0; k < numAlternatives; k++) {
      for (let l = 0; l < numAlternatives; l++) {
        if (k === l) continue;
        for (let j = 0; j < numCriteria; j++) {
          const diff = Math.abs(
            weightedNormalizedMatrix[k][j] - weightedNormalizedMatrix[l][j]
          );
          if (diff > maxOverallDiff) {
            maxOverallDiff = diff;
          }
        }
      }
    }
  }
  if (maxOverallDiff === 0 && numAlternatives > 1) maxOverallDiff = 1; // Hindari pembagian dengan nol jika semua nilai identik

  for (let k = 0; k < numAlternatives; k++) {
    for (let l = 0; l < numAlternatives; l++) {
      if (k === l) {
        concordanceMatrix[k][l] = "-";
        discordanceMatrix[k][l] = "-";
        continue;
      }

      let concordanceSum = 0;
      let maxDiscordanceValue = 0;
      let discordanceSetExists = false;

      for (let j = 0; j < numCriteria; j++) {
        // Concordance
        // Asumsi: weightedNormalizedMatrix sudah ditransformasi sehingga nilai lebih tinggi selalu lebih baik
        if (weightedNormalizedMatrix[k][j] >= weightedNormalizedMatrix[l][j]) {
          concordanceSum += Number(weights[j]);
        }

        // Discordance
        // Asumsi: weightedNormalizedMatrix sudah ditransformasi sehingga nilai lebih tinggi selalu lebih baik
        // Maka, k lebih buruk dari l jika nilai k < nilai l
        if (weightedNormalizedMatrix[k][j] < weightedNormalizedMatrix[l][j]) {
          discordanceSetExists = true;
          const diff = Math.abs(
            weightedNormalizedMatrix[k][j] - weightedNormalizedMatrix[l][j]
          );
          if (diff > maxDiscordanceValue) {
            maxDiscordanceValue = diff;
          }
        }
      }
      concordanceMatrix[k][l] = concordanceSum;
      if (numAlternatives <= 1 || maxOverallDiff === 0) {
        // Handle edge case with single alternative or no differences
        discordanceMatrix[k][l] = 0;
      } else {
        discordanceMatrix[k][l] = discordanceSetExists
          ? maxDiscordanceValue / maxOverallDiff
          : 0;
      }
    }
  }
  return { concordanceMatrix, discordanceMatrix };
}

// 4. Threshold Concordance (c̄) dan Discordance (d̄)
export function calculateThresholds(matrix) {
  let sum = 0;
  let count = 0;
  const numRows = matrix.length;
  if (numRows === 0) return 0;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i !== j && typeof matrix[i][j] === "number") {
        sum += matrix[i][j];
        count++;
      }
    }
  }
  return count > 0 ? sum / count : 0;
}

// 5. Matriks Dominan Concordance (F) dan Discordance (G)
export function calculateDominanceMatrix(matrix, threshold, isConcordance) {
  const numRows = matrix.length;
  if (numRows === 0) return [];
  const numCols = matrix[0] ? matrix[0].length : 0;
  const dominance = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(0));

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (i === j) {
        dominance[i][j] = "-";
        continue;
      }
      if (typeof matrix[i][j] !== "number") {
        // Handle non-numeric like '-'
        dominance[i][j] = "-"; // or some other placeholder
        continue;
      }
      if (isConcordance) {
        dominance[i][j] = matrix[i][j] >= threshold ? 1 : 0;
      } else {
        // Discordance
        dominance[i][j] = matrix[i][j] <= threshold ? 1 : 0;
      }
    }
  }
  return dominance;
}

// 6. Matriks Agregat Dominan (E)
export function calculateAggregateDominanceMatrix(
  concordanceDominance,
  discordanceDominance
) {
  const numRows = concordanceDominance.length;
  if (numRows === 0) return [];
  const numCols = concordanceDominance[0] ? concordanceDominance[0].length : 0;
  const aggregateMatrix = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(0));

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (i === j) {
        aggregateMatrix[i][j] = "-";
        continue;
      }
      if (
        concordanceDominance[i][j] === "-" ||
        discordanceDominance[i][j] === "-"
      ) {
        aggregateMatrix[i][j] = "-"; // Propagate non-comparable
        continue;
      }
      aggregateMatrix[i][j] =
        concordanceDominance[i][j] * discordanceDominance[i][j];
    }
  }
  return aggregateMatrix;
}
export function calculateRankingAndScores(
  aggregateDominanceMatrix,
  alternativeNames
) {
  const numAlternatives = alternativeNames.length;
  if (numAlternatives === 0) return [];

  const scores = Array(numAlternatives).fill(0);

  for (let k = 0; k < numAlternatives; k++) {
    let dominatesCount = 0; // Berapa banyak alternatif yang didominasi oleh k
    let dominatedByCount = 0; // Berapa banyak alternatif yang mendominasi k

    for (let l = 0; l < numAlternatives; l++) {
      if (k === l) continue;

      // Jika E_kl = 1, maka k mendominasi l
      if (aggregateDominanceMatrix[k][l] === 1) {
        dominatesCount++;
      }
      // Jika E_lk = 1, maka l mendominasi k
      if (aggregateDominanceMatrix[l][k] === 1) {
        dominatedByCount++;
      }
    }
    scores[k] = dominatesCount - dominatedByCount; // Skor dominasi bersih
  }

  const rankedAlternatives = alternativeNames.map((name, index) => ({
    name: name,
    score: scores[index],
    rank: 0, // Peringkat akan diisi setelah pengurutan
  }));

  // Urutkan berdasarkan skor secara menurun
  rankedAlternatives.sort((a, b) => b.score - a.score);

  // Tetapkan peringkat, tangani kasus skor yang sama
  let currentRank = 0;
  let lastScore = Infinity;
  rankedAlternatives.forEach((alt, index) => {
    if (alt.score < lastScore) {
      currentRank = index + 1; // Peringkat dimulai dari 1
      lastScore = alt.score;
    }
    alt.rank = currentRank;
  });

  return rankedAlternatives;
}
