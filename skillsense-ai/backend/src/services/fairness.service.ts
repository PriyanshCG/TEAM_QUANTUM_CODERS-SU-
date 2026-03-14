import OpenAI from 'openai';
import { FairnessReport, Intervention } from '../types/ai.types';
import logger from '../utils/logger';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Runs fairness analysis on cohort data to detect biases in skill scores or placements.
 */
export const runFairnessAnalysis = async (cohortData: any[]): Promise<FairnessReport> => {
  if (!cohortData || cohortData.length === 0) {
    return { isFair: true, flags: [], recommendations: [] };
  }

  try {
    const prompt = `You are an AI bias auditor for an educational platform in India.
Analyse the following cohort data for potential biases in skill scores or placements across demographics (gender, region, institution type).

Cohort Data:
${JSON.stringify(cohortData.slice(0, 50))} // Limit to 50 for token safety

Return a JSON object:
- isFair: boolean
- flags: string[] (identifying specific disparities, e.g., "Gender gap in digital literacy scores")
- recommendations: string[] (actionable steps to mitigate bias)

Return ONLY valid JSON.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    });

    const content = completion.choices[0]?.message?.content ?? '{}';
    const parsed = JSON.parse(content);

    return {
      isFair: parsed.isFair ?? true,
      flags: parsed.flags ?? [],
      recommendations: parsed.recommendations ?? [],
    };
  } catch (err) {
    logger.error('Fairness analysis error:', err);
    return { isFair: true, flags: [], recommendations: [] };
  }
};

/**
 * Generates specific interventions for a student based on their profile.
 * Delegates to ai.service for deeper logic.
 */
export const generateInterventions = async (studentId: string): Promise<Intervention[]> => {
  // This is handled in ai.service.ts as generateAIInterventions
  // This stub can be used as a wrapper or for non-AI rule-based interventions
  return [];
};
