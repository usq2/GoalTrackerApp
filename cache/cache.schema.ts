import { z } from 'zod';

const dynamicSchema = z.record(z.string(), z.array(z.string()));
export const FocusPlanSchema = z.object({
  title: z.string(),
  mission: z.object({
    duration: z.string(),
    priorities: z.array(z.string()),
  }),
  weekday_timetable: z.array(
    z.object({
      time: z.string(),
      activity: z.string(),
    }),
  ),
  workout_plan: z.object({
    morning: z.object({
      duration: z.string(),
      activities: z.array(z.string()),
    }),
    night: z.object({
      duration: z.string(),
      activities: z.array(z.string()),
    }),
  }),
  learning_plan: z.object({
    Monday: z.string(),
    Tuesday: z.string(),
    Wednesday: z.string(),
    Thursday: z.string(),
    Friday: z.string(),
    Saturday: z.array(z.string()),
    Sunday: z.array(z.string()),
  }),
  daily_scorecard: z.object({
    fitness: z.array(z.string()),
    developer: z.array(z.string()),
  }),
  weekly_checkin: z.object({
    send_fields: dynamicSchema,
    assistant_actions: z.array(z.string()),
  }),
  monthly_success_criteria: dynamicSchema,
  rule_for_the_month: z.object({
    questions: z.array(z.string()),
    criteria: z.string(),
  }),
});

export type FocusPlan = z.infer<typeof FocusPlanSchema>;
