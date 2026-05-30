import { TONE_MAP } from './tone-map';
import { BusinessInput } from '../schemas/copy-schema';

export function buildUserPrompt(input: BusinessInput): string {
  return `
Generate complete website copy for the following local business.

BUSINESS DETAILS:
- Name: ${input.name}
- Location: ${input.location}, ${input.city}
- Type: ${input.vertical}
- Services offered: ${input.services.join(', ')}
- What makes them special: ${input.uniqueSellingPoints.join('; ')}
- Primary customer: ${input.targetCustomer}
- Desired tone: ${input.tone}

TONE GUIDANCE:
${TONE_MAP[input.tone]}

Generate copy that feels written FOR this specific business, not a template.
Make the headline immediately answer: "Why should I choose THIS ${input.vertical}?"
`.trim();
}
