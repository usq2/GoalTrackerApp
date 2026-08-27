import { z } from 'zod';

import { Matrix4x4 } from '../engines/trends_engine/types';

export const CheckInRecordSchema = z.object({
  id: z.string(),
  targetId: z.string(),
  loggedDate: z.string(), // YYYY-MM-DD
  status: z.enum(['PASS', 'PARTIAL', 'FAIL', 'SYSTEM_LAPSE']),
  stateAtCheckIn: z.enum(['INITIAL', 'MOMENTUM', 'INERTIA', 'DEAD']),
  stressLevel: z.number().min(1).max(5).optional(), // Ordinal 1-5 input
  sleepHours: z.number().min(0).max(24).optional(),
});
export type CheckInRecord = z.infer<typeof CheckInRecordSchema>;

export interface TrendAnalysisResult {
  targetId: string;
  sampleSize: number;
  correlations: {
    stressCorrelation: number; // Spearman rho (-1.0 to 1.0)
    sleepCorrelation: number; // Spearman rho (-1.0 to 1.0)
  };
  markovTrajectories: {
    transitionMatrixP1: Matrix4x4; // 1-step smoothed transition probability
    transitionMatrixP7: Matrix4x4; // 7-step projected transition probability
    p7SuccessProbability: number; // Probability of staying in MOMENTUM after 7 days
  };
}
