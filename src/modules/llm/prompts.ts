export const initialPrompt = (
  userGoals: string,
) => `You are an expert curriculum architect and habit coach. Your objective is to deconstruct a high-level goal into a structured, 30-day sequential execution plan.

CRITICAL CONSTRAINTS:
1. You MUST generate exactly 30 daily steps.
2. Each step must have a clear, actionable title and a verifiable daily deliverable.
3. Output MUST adhere strictly to the requested JSON schema. Do NOT wrap output in markdown formatting, code fences, or explanatory text.

INPUT GOAL:
"${userGoals}"

OUTPUT SCHEMA:
{
  "title": "Short normalized title (max 5 words)",
  "goalType": "SEQUENTIAL_CURRICULUM",
  "syllabus": [
    {
      "dayIndex": 1,
      "title": "Topic Name",
      "deliverable": "Specific action item to complete",
      "targetDurationMins": 45
    }
    // ... exactly 30 items
  ]
}`;

export const fuzzyToDeterminsitic = (
  userHabit: string,
) => `You are a quantitative goal engineer. Extract the daily metric and target value from the user's habit statement.

CRITICAL CONSTRAINTS:
1. Identify the unit of measurement (e.g., "words", "minutes", "pages", "reps").
2. Set a realistic baseline quantity for a 30-day block.
3. Output strictly valid JSON matching the schema below.

INPUT GOAL:
"${userHabit}"

OUTPUT SCHEMA:
{
  "title": "Short normalized title",
  "goalType": "STATIC_HABIT",
  "staticRule": {
    "dailyAction": "Action verb description",
    "targetQuantity": 500,
    "unit": "words"
  }
}`;
export const realignmentPrompt = (
  targetTitle: string,
  currentDayPointer: string,
  userFriction: string,
) => `You are a behavioral realignment coach. The user's target has entered the DEAD state due to repeated missed days and high friction.

CONTEXT:
- Target Title: "${targetTitle}"
- Current Day Index: ${currentDayPointer}
- User Friction Note: "${userFriction}"

OBJECTIVE:
Analyze the friction point and generate a revised syllabus for the remaining days (Days {CURRENT_DAY_POINTER} to 30). Reduce daily scope by 30-50% to rebuild momentum.

OUTPUT SCHEMA:
{
  "realignmentSummary": "1-sentence summary of what changed to lower friction",
  "updatedSyllabus": [
    {
      "dayIndex": ${currentDayPointer},
      "title": "Adjusted low-friction step",
      "deliverable": "Reduced scope action",
      "targetDurationMins": 20
    }
  ]
}`;
