# AI Website Copy Generator

## Business Chosen
Aura Salon & Spa, Indiranagar, Bengaluru

## What This Does
A structured prompt system that generates conversion-focused website copy
for local businesses using the Gemini API.

## Prompt Logic
- System prompt sets AI role, output contract, and quality rules
- User prompt is dynamically assembled from business input fields
- Tone map adjusts language style per business vertical
- Zod schema validates all AI output before display

## Tools Used
- Gemini (@google/genai API)
- React + Vite + Express (Full-Stack adapted from Next.js spec)
- Tailwind CSS
- Zod

## How to Run
1. Clone repo
2. Add GEMINI_API_KEY to .env.local / .env
3. npm install && npm run dev
4. Open http://localhost:3000

## Generated Outputs
See /outputs folder for full copy samples.
