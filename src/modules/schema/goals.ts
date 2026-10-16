import { z } from 'zod';

export const DayPlanStepSchema = z.object({
  dayIndex: z.number().min(1).max(30), // Day 1 to Day 30 of the focus block
  title: z.string(), // e.g., "Memory Allocation & Pointers in Go"
  deliverable: z.string(), // e.g., "Implement custom slab allocator on paper"
  targetDurationMins: z.number().optional(),
});

export const FocusTargetSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  goalType: z.enum(['STATIC_HABIT', 'SEQUENTIAL_CURRICULUM']),

  // Static Habit Rule (e.g., Daily Writing)
  staticRule: z
    .object({
      dailyAction: z.string(),
      targetQuantity: z.number(),
      unit: z.string(),
    })
    .optional(),

  // Daywise Curriculum Plan (e.g., Study Plan / Workout Split)
  syllabus: z.array(DayPlanStepSchema).optional(),
});
export type TargetState = 'INITIAL' | 'MOMENTUM' | 'INERTIA' | 'DEAD';
export type GoalType = 'STATIC_HABIT' | 'SEQUENTIAL_CURRICULUM';

export type DayPlanStep = z.infer<typeof DayPlanStepSchema>;

export const TargetContextSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  goalType: z.enum(['STATIC_HABIT', 'SEQUENTIAL_CURRICULUM']),
  currentState: z.enum(['INITIAL', 'MOMENTUM', 'INERTIA', 'DEAD']),

  // Trackers
  consecutiveMisses: z.number().default(0),
  consecutivePasses: z.number().default(0),
  totalLoggedDays: z.number().default(0),
  adherenceRate: z.number().default(1.0), // 0.0 to 1.0

  // Progression Trackers
  scaleMultiplier: z.number().default(1.0), // 1.0 baseline, +/- 0.02 scaling
  currentSyllabusPointer: z.number().default(1), // Pointer to active dayIndex (1-30)

  // Goal Type Specific Payloads
  staticRule: z
    .object({
      dailyAction: z.string(),
      targetQuantity: z.number(),
      unit: z.string(),
    })
    .optional(),

  syllabus: z.array(DayPlanStepSchema).optional(),
});
export type TargetContext = z.infer<typeof TargetContextSchema>;
