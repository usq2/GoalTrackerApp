import { Matrix4x4 } from './types';

/**
 * Multiplies two 4x4 matrices.
 */
export const multiply4x4 = (A: Matrix4x4, B: Matrix4x4): Matrix4x4 => {
  const C: Matrix4x4 = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        C[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return C;
};

/**
 * Computes P^n using matrix exponentiation.
 */
export const matrixPower = (P: Matrix4x4, n: number): Matrix4x4 => {
  let result = P;
  for (let i = 1; i < n; i++) {
    result = multiply4x4(result, P);
  }
  return result;
};

/**
 * Applies Laplace Smoothing (alpha = 1.0) to raw transition count matrix.
 */
export const applyLaplaceSmoothing = (counts: Matrix4x4, alpha = 1.0): Matrix4x4 => {
  return counts.map(row => {
    const rowSum = row.reduce((a, b) => a + b, 0) + 4 * alpha;
    return row.map(count => (count + alpha) / rowSum);
  });
};

/**
 * Computes Spearman's Rank Correlation Coefficient (rho) with tie handling.
 */
export const calculateSpearmanRho = (x: number[], y: number[]): number => {
  const n = x.length;
  if (n < 2 || n !== y.length) return 0;

  const rank = (arr: number[]): number[] => {
    const sorted = arr.map((val, i) => ({ val, i })).sort((a, b) => a.val - b.val);
    const ranks = new Array(n);
    let i = 0;
    while (i < n) {
      let j = i;
      while (j < n - 1 && sorted[j + 1].val === sorted[j].val) j++;
      const avgRank = (i + 1 + j + 1) / 2;
      for (let k = i; k <= j; k++) ranks[sorted[k].i] = avgRank;
      i = j + 1;
    }
    return ranks;
  };

  const rx = rank(x);
  const ry = rank(y);

  const meanX = (n + 1) / 2;
  const meanY = (n + 1) / 2;

  let num = 0,
    denX = 0,
    denY = 0;
  for (let i = 0; i < n; i++) {
    const dx = rx[i] - meanX;
    const dy = ry[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }

  const denominator = Math.sqrt(denX * denY);
  return denominator === 0 ? 0 : Number((num / denominator).toFixed(3));
};
