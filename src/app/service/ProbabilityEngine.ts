export type StateIndex = 0 | 1 | 2 | 3; // 0: INITIAL, 1: MOMENTUM, 2: INERTIA, 3: DEAD

export class MarkovPredictionEngine {
  // Default Laplace Prior Matrix (Row = Current, Col = Next)
  private static DEFAULT_TRANSITIONS: number[][] = [
    // I    M    N    D
    [0.4, 0.3, 0.2, 0.1], // INITIAL
    [0.1, 0.7, 0.15, 0.05], // MOMENTUM
    [0.1, 0.2, 0.5, 0.2], // INERTIA
    [0.2, 0.0, 0.1, 0.7], // DEAD (Absorbing/Sluggish)
  ];

  /**
   * Multiplies two 4x4 matrices.
   */
  private static multiply4x4(A: number[][], B: number[][]): number[][] {
    const C = Array(4)
      .fill(0)
      .map(() => Array(4).fill(0));
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 4; k++) {
          C[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    return C;
  }

  /**
   * Computes P^n using matrix exponentiation.
   */
  public static computePn(P: number[][], n: number): number[][] {
    let result = P;
    for (let i = 1; i < n; i++) {
      result = this.multiply4x4(result, P);
    }
    return result;
  }

  /**
   * Predicts 7-day outcome vector given current state.
   */
  public static predict7DayDistribution(
    currentState: 'INITIAL' | 'MOMENTUM' | 'INERTIA' | 'DEAD',
    customTransitionCounts?: number[][],
  ): { momentumProb: number; inertiaProb: number; deadProb: number; successScore: number } {
    const stateMap: Record<string, StateIndex> = { INITIAL: 0, MOMENTUM: 1, INERTIA: 2, DEAD: 3 };
    const currentIndex = stateMap[currentState];

    // Compute transition matrix with Laplace smoothing if custom counts exist
    const P = customTransitionCounts
      ? this.applyLaplaceSmoothing(customTransitionCounts)
      : this.DEFAULT_TRANSITIONS;

    // Calculate P^7 matrix
    const P7 = this.computePn(P, 7);

    // Initial state vector v_t (1.0 at current state index, 0 elsewhere)
    const v7 = P7[currentIndex]; // Extract corresponding row

    const momentumProb = Number(v7[1].toFixed(3));
    const inertiaProb = Number(v7[2].toFixed(3));
    const deadProb = Number(v7[3].toFixed(3));

    // Weighted Success Score: Full weight for Momentum, partial for Inertia
    const successScore = Number((momentumProb + 0.5 * inertiaProb).toFixed(2));

    return {
      momentumProb,
      inertiaProb,
      deadProb,
      successScore,
    };
  }

  private static applyLaplaceSmoothing(counts: number[][], alpha = 1): number[][] {
    return counts.map(row => {
      const rowSum = row.reduce((a, b) => a + b, 0) + 4 * alpha;
      return row.map(count => (count + alpha) / rowSum);
    });
  }
}
