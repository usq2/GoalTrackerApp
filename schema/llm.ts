import { z } from 'zod';

import { DayPlanStepSchema } from './goals';

// Schema for LLM Curriculum Generation Output
export const LLMCurriculumResponseSchema = z.object({
  title: z.string(),
  goalType: z.literal('SEQUENTIAL_CURRICULUM'),
  syllabus: z.array(DayPlanStepSchema).length(30),
});

export type LLMCurriculumResponse = z.infer<typeof LLMCurriculumResponseSchema>;
