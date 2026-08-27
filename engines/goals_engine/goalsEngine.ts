import { TargetContext, TargetContextSchema } from '../../schema/goals';

import { FSM_LOOKUP_TABLE } from './lookupTable';
import type { EngineEvent, ActionEffect } from './types';

export class GoalEngineFSM {
  /**
   * Main transition reducer. Accepts target state context and incoming event,
   * queries the lookup table, calculates next mathematical state and executes side-effects.
   */
  public static processEvent(context: TargetContext, event: EngineEvent): TargetContext {
    const currentState = context.currentState;
    const transitionHandler = FSM_LOOKUP_TABLE[currentState][event.type];

    // If event isn't defined for current state, return context un-mutated (Guard Safety)
    if (!transitionHandler) {
      return context;
    }

    // Query lookup matrix
    const { nextState, actions } = transitionHandler(context, event);

    // Deep clone context for pure deterministic mutation
    const updatedCtx: TargetContext = JSON.parse(JSON.stringify(context));
    updatedCtx.currentState = nextState;

    // Update common trackers
    this.updateTrackers(updatedCtx, event);

    // Apply resolved side effects
    for (const action of actions) {
      this.executeAction(updatedCtx, action, event);
    }

    return TargetContextSchema.parse(updatedCtx);
  }

  private static updateTrackers(ctx: TargetContext, event: EngineEvent): void {
    if (event.type === 'CHECK_IN_PASS') {
      ctx.consecutivePasses += 1;
      ctx.consecutiveMisses = 0;
      ctx.totalLoggedDays += 1;
    } else if (event.type === 'CHECK_IN_FAIL' || event.type === 'SYSTEM_DAY_LAPSE') {
      ctx.consecutiveMisses += 1;
      ctx.consecutivePasses = 0;
      ctx.totalLoggedDays += 1;
    } else if (event.type === 'CHECK_IN_PARTIAL') {
      ctx.consecutivePasses = 0;
      ctx.totalLoggedDays += 1;
    } else if (event.type === 'MANUAL_REALIGNMENT') {
      ctx.consecutiveMisses = 0;
      ctx.consecutivePasses = 0;
    }

    // Recalculate rolling 30-day adherence rate
    const passWeight = ctx.consecutivePasses > 0 ? 1 : 0;
    ctx.adherenceRate =
      ctx.totalLoggedDays > 0
        ? Number(((ctx.totalLoggedDays - ctx.consecutiveMisses) / ctx.totalLoggedDays).toFixed(2))
        : 1.0;
  }

  private static executeAction(ctx: TargetContext, action: ActionEffect, event: EngineEvent): void {
    switch (action) {
      case 'SCALE_UP_TARGET':
        // Cap max positive scaling at +20% (1.20x)
        ctx.scaleMultiplier = Number(Math.min(1.2, ctx.scaleMultiplier + 0.02).toFixed(2));
        break;

      case 'SCALE_DOWN_FRICTION':
        // Floor negative scaling at -20% (0.80x)
        ctx.scaleMultiplier = Number(Math.max(0.8, ctx.scaleMultiplier - 0.02).toFixed(2));
        break;

      case 'ADVANCE_POINTER':
        if (ctx.goalType === 'SEQUENTIAL_CURRICULUM' && ctx.syllabus) {
          ctx.currentSyllabusPointer = Math.min(
            ctx.syllabus.length,
            ctx.currentSyllabusPointer + 1,
          );
        }
        break;

      case 'HOLD_POINTER':
        // Pointer does NOT advance on failure/partial check-ins for curriculum goals
        break;

      case 'TRIGGER_DEAD_OVERLAY':
        // Freeze scaling multiplier
        break;

      case 'RESET_BASELINE':
        ctx.scaleMultiplier = 1.0;
        if (event.type === 'MANUAL_REALIGNMENT' && event.updatedSyllabus) {
          ctx.syllabus = event.updatedSyllabus;
          ctx.currentSyllabusPointer = 1;
        }
        break;
    }
  }
}
