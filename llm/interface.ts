import { LLMCurriculumResponse, LLMCurriculumResponseSchema } from '../schema/llm';

/**
 * Executes Gemini API request and validates JSON response against Zod schema.
 */
export const generateSyllabusFromLLM = async (
  userPrompt: string,
  apiKey: string,
): Promise<LLMCurriculumResponse> => {
  const systemPrompt = `You are a curriculum architect. Convert the goal into a 30-day plan. Output valid JSON matching the schema.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nINPUT GOAL: ${userPrompt}` }] },
        ],
        generationConfig: { responseMimeType: 'application/json' },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini API Error: ${response.statusText}`);
  }

  const data = await response.json();
  const rawJsonString = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawJsonString) {
    throw new Error('Received empty payload from Gemini API.');
  }

  // Parse raw JSON string and validate against rigid Zod schema
  const parsedJson = JSON.parse(rawJsonString);
  return LLMCurriculumResponseSchema.parse(parsedJson);
};
