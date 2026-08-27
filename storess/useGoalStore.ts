import { create } from 'zustand';

import { GoalEngineFSM } from '../engines/goals_engine/goalsEngine';
import { EngineEvent } from '../engines/goals_engine/types';
import { TargetContext } from '../schema/goals';

interface GoalStoreState {
  activeTargets: TargetContext[];
  logDailyCheckIn: (targetId: string, event: EngineEvent) => void;
  triggerSystemMidnightLapse: () => void;
}

export const useGoalStore = create<GoalStoreState>((set, get) => ({
  activeTargets: [],

  logDailyCheckIn: (targetId, event) => {
    set(state => ({
      activeTargets: state.activeTargets.map(target => {
        if (target.id !== targetId) return target;

        // 1. Process deterministic state update through FSM Engine
        const updatedTarget = GoalEngineFSM.processEvent(target, event);

        // 2. Persist directly to local WatermelonDB/SQLite storage here
        // await Database.saveTarget(updatedTarget);

        return updatedTarget;
      }),
    }));
  },

  triggerSystemMidnightLapse: () => {
    // Midnight background job checks for unlogged goals
    const unloggedTargets = get().activeTargets.filter(/* logic */);
    unloggedTargets.forEach(target => {
      get().logDailyCheckIn(target.id, { type: 'SYSTEM_DAY_LAPSE' });
    });
  },
}));
