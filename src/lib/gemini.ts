import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT } from './prompts/system-prompt';
import { buildUserPrompt } from './prompts/homepage';
import { CopySchema, GeneratedCopy, BusinessInput, HomepageSchema, ServiceSchema, CTASchema } from './schemas/copy-schema';
import { z } from 'zod';

export async function generateWebsiteCopy(
  input: BusinessInput
): Promise<GeneratedCopy> {
  const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY 
  });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: buildUserPrompt(input),
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: 'application/json',
      temperature: 0.7,
    }
  });

  const rawText = response.text || '';
  const cleaned = rawText.replace(/```json|```/g, '').trim();

  try {
    const parsed = JSON.parse(cleaned);
    return CopySchema.parse(parsed); // Zod validation
  } catch (error) {
    console.error("Failed to parse JSON response:", cleaned);
    throw new Error('AI returned an invalid response format.');
  }
}

export async function regenerateSection(
  input: BusinessInput,
  currentCopy: GeneratedCopy,
  section: string
): Promise<any> {
  const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY 
  });

  let responseSchema;
  if (section === 'homepage') responseSchema = HomepageSchema;
  else if (section === 'services') responseSchema = z.array(ServiceSchema).min(1).max(8);
  else if (section === 'cta') responseSchema = CTASchema;
  else throw new Error('Invalid section');

  const prompt = `You are updating a specific section of website copy.
Business Details:
${buildUserPrompt(input)}

Current Copy context (for alignment):
${JSON.stringify(currentCopy, null, 2)}

Your task is to REGENERATE ONLY the "${section}" section.
Make it noticeably different but better, aligning with the business details and tone.
Return ONLY valid JSON matching the schema for the ${section} section. Do not wrap it in another top-level object, just return the ${section} object/array directly.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction: "You are an expert copywriter. Output only the requested JSON for the specific section.",
      responseMimeType: 'application/json',
      temperature: 0.8,
    }
  });

  const rawText = response.text || '';
  const cleaned = rawText.replace(/```json|```/g, '').trim();

  try {
    const parsed = JSON.parse(cleaned);
    return responseSchema.parse(parsed); // Zod validation
  } catch (error) {
    console.error(`Failed to parse JSON response for section ${section}:`, cleaned);
    throw new Error('AI returned an invalid response format during regeneration.');
  }
}
