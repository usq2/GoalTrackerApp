export interface CorrelationInsight {
  type: 'TEMPORAL_PATTERN' | 'FACTOR_CORRELATION' | 'LEAD_INDICATOR';
  metricName: string;
  correlationScore: number; // -1.0 to 1.0
  sampleSize: number;
  description: string;
}

export class TrendEngine {
  /**
   * Calculates Spearman's Rank Correlation Coefficient (rho) locally.
   * Ideal for ordinal inputs (e.g., self-reported energy or stress rated 1-5).
   */
  public static calculateSpearman(x: number[], y: number[]): number {
    const n = x.length;
    if (n < 7 || n !== y.length) return 0; // Minimum sample size guardrail

    const rankX = this.getRanks(x);
    const rankY = this.getRanks(y);

    const dSquareSum = rankX.reduce((sum, rx, i) => sum + Math.pow(rx - rankY[i], 2), 0);
    const rho = 1 - (6 * dSquareSum) / (n * (Math.pow(n, 2) - 1));

    return Number(rho.toFixed(2));
  }

  /**
   * Calculates Pearson Correlation Coefficient (r).
   * Ideal for continuous metrics (e.g., hours slept vs completion score).
   */
  public static calculatePearson(x: number[], y: number[]): number {
    const n = x.length;
    if (n < 7 || n !== y.length) return 0;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return denominator === 0 ? 0 : Number((numerator / denominator).toFixed(2));
  }

  private static getRanks(arr: number[]): number[] {
    const sorted = arr.map((val, idx) => ({ val, idx })).sort((a, b) => a.val - b.val);
    const ranks = new Array(arr.length);
    sorted.forEach((item, rank) => {
      ranks[item.idx] = rank + 1;
    });
    return ranks;
  }
}
