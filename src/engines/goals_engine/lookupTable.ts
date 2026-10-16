import { TransitionTable } from './types';

export const FSM_LOOKUP_TABLE: TransitionTable = {
  INITIAL: {
    CHECK_IN_PASS: ctx => ({
      nextState: ctx.consecutivePasses + 1 >= 3 ? 'MOMENTUM' : 'INITIAL',
      actions: ['ADVANCE_POINTER'],
    }),
    CHECK_IN_PARTIAL: () => ({
      nextState: 'INITIAL',
      actions: ['HOLD_POINTER'],
    }),
    CHECK_IN_FAIL: () => ({
      nextState: 'INERTIA',
      actions: ['HOLD_POINTER', 'SCALE_DOWN_FRICTION'],
    }),
    SYSTEM_DAY_LAPSE: () => ({
      nextState: 'INERTIA',
      actions: ['HOLD_POINTER', 'SCALE_DOWN_FRICTION'],
    }),
  },

  MOMENTUM: {
    CHECK_IN_PASS: () => ({
      nextState: 'MOMENTUM',
      actions: ['SCALE_UP_TARGET', 'ADVANCE_POINTER'],
    }),
    CHECK_IN_PARTIAL: () => ({
      nextState: 'MOMENTUM',
      actions: ['HOLD_POINTER'],
    }),
    CHECK_IN_FAIL: ctx => ({
      // 2 consecutive misses drop MOMENTUM to INERTIA
      nextState: ctx.consecutiveMisses + 1 >= 2 ? 'INERTIA' : 'MOMENTUM',
      actions: ['HOLD_POINTER', 'SCALE_DOWN_FRICTION'],
    }),
    SYSTEM_DAY_LAPSE: ctx => ({
      nextState: ctx.consecutiveMisses + 1 >= 2 ? 'INERTIA' : 'MOMENTUM',
      actions: ['HOLD_POINTER', 'SCALE_DOWN_FRICTION'],
    }),
  },

  INERTIA: {
    CHECK_IN_PASS: ctx => ({
      // Require 3 consecutive passes to escape INERTIA back to MOMENTUM
      nextState: ctx.consecutivePasses + 1 >= 3 ? 'MOMENTUM' : 'INERTIA',
      actions: ['ADVANCE_POINTER'],
    }),
    CHECK_IN_PARTIAL: () => ({
      nextState: 'INERTIA',
      actions: ['HOLD_POINTER'],
    }),
    CHECK_IN_FAIL: ctx => ({
      // 4 consecutive misses trigger DEAD lockout state
      nextState: ctx.consecutiveMisses + 1 >= 4 || ctx.adherenceRate < 0.3 ? 'DEAD' : 'INERTIA',
      actions:
        ctx.consecutiveMisses + 1 >= 4 || ctx.adherenceRate < 0.3
          ? ['TRIGGER_DEAD_OVERLAY']
          : ['HOLD_POINTER', 'SCALE_DOWN_FRICTION'],
    }),
    SYSTEM_DAY_LAPSE: ctx => ({
      nextState: ctx.consecutiveMisses + 1 >= 4 || ctx.adherenceRate < 0.3 ? 'DEAD' : 'INERTIA',
      actions:
        ctx.consecutiveMisses + 1 >= 4 || ctx.adherenceRate < 0.3
          ? ['TRIGGER_DEAD_OVERLAY']
          : ['HOLD_POINTER', 'SCALE_DOWN_FRICTION'],
    }),
  },

  DEAD: {
    MANUAL_REALIGNMENT: () => ({
      nextState: 'INITIAL',
      actions: ['RESET_BASELINE'],
    }),
    // DEAD state ignores daily check-ins until explicit realignment
    CHECK_IN_PASS: () => ({ nextState: 'DEAD', actions: ['TRIGGER_DEAD_OVERLAY'] }),
    CHECK_IN_PARTIAL: () => ({ nextState: 'DEAD', actions: ['TRIGGER_DEAD_OVERLAY'] }),
    CHECK_IN_FAIL: () => ({ nextState: 'DEAD', actions: ['TRIGGER_DEAD_OVERLAY'] }),
    SYSTEM_DAY_LAPSE: () => ({ nextState: 'DEAD', actions: ['TRIGGER_DEAD_OVERLAY'] }),
  },
};
