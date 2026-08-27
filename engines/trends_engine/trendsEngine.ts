import { CheckInRecord } from '../../schema/checkIn';
import { TrendAnalysisResult } from '../../schema/checkIn';

import { calculateSpearmanRho, applyLaplaceSmoothing, matrixPower } from './core';
import { Matrix4x4 } from './types';
// Map FSM states to 0-indexed matrix indices: INITIAL=0, MOMENTUM=1, INERTIA=2, DEAD=3
const STATE_INDEX_MAP: Record<string, number> = {
  INITIAL: 0,
  MOMENTUM: 1,
  INERTIA: 2,
  DEAD: 3,
};

export class TrendsEngine {
  /**
   * Consumes raw historical check-in records for a target and computes all trend metrics.
   */
  public static analyzeTargetHistory(
    targetId: string,
    records: CheckInRecord[],
  ): TrendAnalysisResult {
    // Filter records specifically for target and sort chronologically
    const targetRecords = records
      .filter(r => r.targetId === targetId)
      .sort((a, b) => a.loggedDate.localeCompare(b.loggedDate));

    const sampleSize = targetRecords.length;

    // Default fallback if insufficient data
    if (sampleSize < 2) {
      return this.getEmptyAnalysis(targetId, sampleSize);
    }

    // 1. Compute Spearman Rank Correlations
    const correlations = this.computeCorrelations(targetRecords);

    // 2. Compute Markov Matrix Exponentiation (P7 Trajectory)
    const markovTrajectories = this.computeMarkovTrajectories(targetRecords);

    return {
      targetId,
      sampleSize,
      correlations,
      markovTrajectories,
    };
  }

  private static computeCorrelations(records: CheckInRecord[]) {
    const adherenceScores: number[] = [];
    const stressLevels: number[] = [];
    const sleepHours: number[] = [];

    // Map binary status into numeric adherence scale: PASS=1.0, PARTIAL=0.5, FAIL=0.0
    for (const record of records) {
      const numericAdherence =
        record.status === 'PASS' ? 1.0 : record.status === 'PARTIAL' ? 0.5 : 0.0;

      if (record.stressLevel !== undefined) {
        adherenceScores.push(numericAdherence);
        stressLevels.push(record.stressLevel);
      }

      if (record.sleepHours !== undefined) {
        // Only pair sleep if adherence score exists for that day
        if (record.stressLevel === undefined) adherenceScores.push(numericAdherence);
        sleepHours.push(record.sleepHours);
      }
    }

    const stressCorrelation =
      stressLevels.length >= 2 ? calculateSpearmanRho(stressLevels, adherenceScores) : 0;
    const sleepCorrelation =
      sleepHours.length >= 2 ? calculateSpearmanRho(sleepHours, adherenceScores) : 0;

    return { stressCorrelation, sleepCorrelation };
  }

  private static computeMarkovTrajectories(records: CheckInRecord[]) {
    // Initialize 4x4 transition count matrix with zeros
    const rawCounts: Matrix4x4 = Array.from({ length: 4 }, () => Array(4).fill(0));

    // Count transitions from Day N (state t) to Day N+1 (state t+1)
    for (let i = 0; i < records.length - 1; i++) {
      const fromState = records[i].stateAtCheckIn;
      const toState = records[i + 1].stateAtCheckIn;

      const fromIdx = STATE_INDEX_MAP[fromState];
      const toIdx = STATE_INDEX_MAP[toState];

      if (fromIdx !== undefined && toIdx !== undefined) {
        rawCounts[fromIdx][toIdx] += 1;
      }
    }

    // Apply Laplace Smoothing (alpha = 1.0) to get 1-step probability matrix P^1
    const transitionMatrixP1 = applyLaplaceSmoothing(rawCounts, 1.0);

    // Exponentiate matrix to 7 steps: P^7 = P^1 * P^1 ... (7 times)
    const transitionMatrixP7 = matrixPower(transitionMatrixP1, 7);

    // Grab success trajectory: Current state transition to MOMENTUM (Index 1) after 7 days
    const currentState = records[records.length - 1].stateAtCheckIn;
    const currentIdx = STATE_INDEX_MAP[currentState] ?? 0;
    const p7SuccessProbability = Number(transitionMatrixP7[currentIdx][1].toFixed(2));

    return {
      transitionMatrixP1,
      transitionMatrixP7,
      p7SuccessProbability,
    };
  }

  private static getEmptyAnalysis(targetId: string, sampleSize: number): TrendAnalysisResult {
    const identityP1: Matrix4x4 = [
      [0.25, 0.25, 0.25, 0.25],
      [0.25, 0.25, 0.25, 0.25],
      [0.25, 0.25, 0.25, 0.25],
      [0.25, 0.25, 0.25, 0.25],
    ];
    return {
      targetId,
      sampleSize,
      correlations: { stressCorrelation: 0, sleepCorrelation: 0 },
      markovTrajectories: {
        transitionMatrixP1: identityP1,
        transitionMatrixP7: identityP1,
        p7SuccessProbability: 0.25,
      },
    };
  }
}
