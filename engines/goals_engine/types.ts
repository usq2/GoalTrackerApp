import type { DayPlanStep, TargetState, TargetContext } from '../../schema/goals';

export type EngineEvent =
  | { type: 'CHECK_IN_PASS'; valueLogged?: number }
  | { type: 'CHECK_IN_PARTIAL'; valueLogged?: number }
  | { type: 'CHECK_IN_FAIL' }
  | { type: 'SYSTEM_DAY_LAPSE' } // Triggered daily at midnight if unlogged
  | { type: 'MANUAL_REALIGNMENT'; updatedSyllabus?: DayPlanStep[] };

export type ActionEffect =
  | 'SCALE_UP_TARGET' // +2% challenge scaling
  | 'SCALE_DOWN_FRICTION' // -2% friction reduction floor
  | 'ADVANCE_POINTER' // Move to next curriculum day
  | 'HOLD_POINTER' // Keep pointer on same curriculum day
  | 'TRIGGER_DEAD_OVERLAY' // Lock UI check-ins, require qualitative input
  | 'RESET_BASELINE'; // Re-initialize parameters

export interface StateTransitionResult {
  nextState: TargetState;
  actions: ActionEffect[];
}

export type TransitionTable = {
  [K in TargetState]: {
    [E in EngineEvent['type']]?: (ctx: TargetContext, event: EngineEvent) => StateTransitionResult;
  };
};
