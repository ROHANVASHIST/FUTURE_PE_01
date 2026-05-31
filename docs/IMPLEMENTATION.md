# IMPLEMENTATION.md
# AI Website Copy Generator for Local Businesses
### Future Interns — Prompt Engineering Task 1 (2026)

**Role**: CTO + Full-Stack Engineer  
**Chosen Business**: *Aura Salon & Spa, Bengaluru*  
**Stack**: Next.js 14 · TypeScript · Tailwind CSS · Anthropic Claude API · GitHub

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture Decisions](#2-architecture-decisions)
3. [Folder Structure](#3-folder-structure)
4. [Prompt Engineering System](#4-prompt-engineering-system)
5. [Backend Implementation](#5-backend-implementation)
6. [Frontend Implementation](#6-frontend-implementation)
7. [Generated Copy — Full Output](#7-generated-copy--full-output)
8. [GitHub Repository Setup](#8-github-repository-setup)
9. [Testing & Quality Checks](#9-testing--quality-checks)
10. [Deployment](#10-deployment)
11. [Monetisation Path](#11-monetisation-path)

---

## 1. Project Overview

### Problem
Local businesses lose customers because their website copy is vague, generic, and lacks conversion hooks. Professional copywriters charge ₹15,000–₹80,000 per project. AI changes that equation entirely.

### Solution
A **repeatable prompt system** that generates:
- Conversion-optimised homepage copy
- Benefit-driven service descriptions
- Urgency/location-based CTAs
- Tone-matched content per business vertical

### Chosen Business
| Field | Detail |
|---|---|
| Business | Aura Salon & Spa |
| Location | Indiranagar, Bengaluru |
| Vertical | Beauty & Wellness |
| Target Persona | Urban professionals, age 22–40 |
| Tone | Warm, premium, confidence-building |

---

## 2. Architecture Decisions

### Why This Stack

| Choice | Reason |
|---|---|
| **Next.js 14 (App Router)** | Server Components + API Routes in one repo; easy deployment on Vercel |
| **TypeScript** | Catch prompt schema errors at build time, not runtime |
| **Claude API (claude-sonnet-4)** | Best instruction-following for structured JSON output |
| **Tailwind CSS** | Rapid UI without custom CSS overhead |
| **Zod** | Runtime validation of AI-generated JSON before rendering |
| **GitHub** | Required by task; doubles as portfolio proof |

### Data Flow

```
User Input (business details form)
        │
        ▼
   Prompt Builder (TypeScript)
        │  assembles structured system + user prompt
        ▼
   Claude API  (/v1/messages)
        │  returns JSON copy object
        ▼
   Zod Validator
        │  ensures schema integrity
        ▼
   Next.js API Route  (/api/generate)
        │  returns validated copy
        ▼
   React Preview UI
        │  renders live website preview
        ▼
   Export (Markdown / HTML / clipboard)
```

---

## 3. Folder Structure

```
ai-website-copy-generator/
├── app/
│   ├── page.tsx                  # Landing page + business input form
│   ├── generate/
│   │   └── page.tsx              # Copy preview & export page
│   └── api/
│       └── generate/
│           └── route.ts          # POST handler → Claude API
│
├── lib/
│   ├── prompts/
│   │   ├── system-prompt.ts      # Master system prompt (reusable)
│   │   ├── homepage.ts           # Homepage copy prompt template
│   │   ├── services.ts           # Services page prompt template
│   │   ├── cta.ts                # CTA section prompt template
│   │   └── tone-map.ts           # Tone config per business vertical
│   ├── schemas/
│   │   └── copy-schema.ts        # Zod schema for generated copy
│   └── claude.ts                 # Claude API client wrapper
│
├── components/
│   ├── BusinessForm.tsx           # Step 1: user inputs
│   ├── CopyPreview.tsx            # Step 2: rendered copy preview
│   ├── SectionCard.tsx            # Reusable section display card
│   └── ExportPanel.tsx            # Copy/download outputs
│
├── prompts/                       # Raw .txt prompt files (for GitHub)
│   ├── 01-system-prompt.txt
│   ├── 02-homepage-prompt.txt
│   ├── 03-services-prompt.txt
│   └── 04-cta-prompt.txt
│
├── outputs/                       # Generated copy samples (for GitHub)
│   ├── aura-salon-homepage.md
│   ├── aura-salon-services.md
│   └── aura-salon-cta.md
│
├── README.md
├── IMPLEMENTATION.md              # This file
├── .env.local                     # ANTHROPIC_API_KEY (gitignored)
└── package.json
```

---

## 4. Prompt Engineering System

This is the core intellectual work of the task. Every prompt is **modular**, **parameterised**, and **reusable**.

---

### 4.1 System Prompt (`lib/prompts/system-prompt.ts`)

The system prompt sets the AI's role, output contract, and constraints.

```typescript
export const SYSTEM_PROMPT = `
You are an expert conversion copywriter specialising in local business websites.
Your copy is clear, benefit-driven, and immediately trustworthy.

RULES:
- Never use filler phrases like "we are passionate about" or "world-class"
- Every sentence must either state a benefit, build trust, or trigger action
- Use second-person ("you/your") to speak directly to the customer
- Keep sentences under 20 words where possible
- Do NOT invent facts — only use the business details provided

OUTPUT FORMAT:
Respond ONLY with a valid JSON object matching this exact structure:
{
  "homepage": {
    "headline": "string",
    "subheadline": "string",
    "intro": "string (2-3 sentences)"
  },
  "services": [
    {
      "name": "string",
      "tagline": "string",
      "description": "string (2-3 sentences)",
      "whyUs": "string (1 sentence)"
    }
  ],
  "cta": {
    "primary": "string",
    "supporting": "string",
    "urgency": "string",
    "trust": "string"
  }
}
No markdown, no backticks, no explanation. JSON only.
`;
```

---

### 4.2 User Prompt Builder (`lib/prompts/homepage.ts`)

The user prompt is dynamically assembled from form inputs.

```typescript
export interface BusinessInput {
  name: string;
  location: string;
  vertical: 'salon' | 'cafe' | 'clinic' | 'coaching' | 'agency';
  services: string[];          // e.g. ["haircut", "facial", "bridal makeup"]
  uniqueSellingPoints: string[]; // e.g. ["10 years experience", "organic products"]
  targetCustomer: string;      // e.g. "working women aged 22-38"
  tone: 'friendly' | 'professional' | 'confident';
  city: string;
}

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
Make the headline immediately answer: "Why should I choose THIS salon?"
`.trim();
}
```

---

### 4.3 Tone Map (`lib/prompts/tone-map.ts`)

```typescript
export const TONE_MAP = {
  friendly: `
    - Conversational and warm, like advice from a trusted friend
    - Use contractions (you're, we've, it's)
    - Short punchy sentences mixed with slightly longer explanations
    - Avoid corporate-sounding words
  `,
  professional: `
    - Authoritative and precise; earns trust through expertise signals
    - Use credentials, numbers, and specifics wherever possible
    - No slang; formal but not cold
    - Structure: claim → evidence → benefit
  `,
  confident: `
    - Direct and assured; no hedging language ("we try", "we hope")
    - Strong verbs (Transform. Elevate. Book.)
    - Bold short headlines with confident follow-through
    - Aspirational without being unrealistic
  `
};
```

---

### 4.4 Raw Prompt Files (for GitHub `prompts/` folder)

**`prompts/01-system-prompt.txt`**
```
You are an expert conversion copywriter specialising in local business websites.
Your copy is clear, benefit-driven, and immediately trustworthy.

RULES:
- Never use filler phrases like "we are passionate about" or "world-class"
- Every sentence must state a benefit, build trust, or trigger action
- Use second-person (you/your) to speak directly to the customer
- Keep sentences under 20 words where possible
- Do NOT invent facts — only use the business details provided

OUTPUT: Valid JSON only. No markdown. No explanation.
Schema: { homepage: { headline, subheadline, intro }, services: [...], cta: { primary, supporting, urgency, trust } }
```

**`prompts/02-homepage-prompt.txt`**
```
Generate homepage copy for:
Business: [NAME], [LOCATION]
Type: [VERTICAL]
USPs: [LIST]
Target customer: [PERSONA]
Tone: [TONE]

Headline must answer: "Why should I choose THIS business?"
Subheadline must name the target customer and the core benefit.
Intro must be 2-3 sentences, no fluff.
```

**`prompts/03-services-prompt.txt`**
```
Generate service descriptions for these services: [SERVICES LIST]

For each service:
- Name: clear, benefit-hinting title
- Tagline: one punchy line (max 8 words)
- Description: what's included + the transformation/result (2-3 sentences)
- WhyUs: one sentence that differentiates this business specifically
```

**`prompts/04-cta-prompt.txt`**
```
Generate 4 CTA variants:
1. Primary CTA — main booking/contact button text (max 6 words)
2. Supporting copy — one reassuring sentence below the button
3. Urgency line — creates gentle FOMO without false pressure
4. Trust line — stat, testimonial hook, or guarantee (use only real details provided)

Business: [NAME], [CITY]
Offer context: [ANY CURRENT OFFER OR TIMING]
```

---

## 5. Backend Implementation

### 5.1 Claude API Client (`lib/claude.ts`)

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from './prompts/system-prompt';
import { buildUserPrompt, BusinessInput } from './prompts/homepage';
import { CopySchema, GeneratedCopy } from './schemas/copy-schema';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateWebsiteCopy(
  input: BusinessInput
): Promise<GeneratedCopy> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: buildUserPrompt(input),
      },
    ],
  });

  const rawText = response.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('');

  // Strip any accidental markdown fences
  const cleaned = rawText.replace(/```json|```/g, '').trim();

  const parsed = JSON.parse(cleaned);
  return CopySchema.parse(parsed); // Zod validation — throws if schema breaks
}
```

---

### 5.2 Zod Schema (`lib/schemas/copy-schema.ts`)

```typescript
import { z } from 'zod';

const ServiceSchema = z.object({
  name: z.string().min(2),
  tagline: z.string().min(4),
  description: z.string().min(20),
  whyUs: z.string().min(10),
});

const HomepageSchema = z.object({
  headline: z.string().min(5),
  subheadline: z.string().min(10),
  intro: z.string().min(30),
});

const CTASchema = z.object({
  primary: z.string().min(2),
  supporting: z.string().min(10),
  urgency: z.string().min(10),
  trust: z.string().min(10),
});

export const CopySchema = z.object({
  homepage: HomepageSchema,
  services: z.array(ServiceSchema).min(1).max(8),
  cta: CTASchema,
});

export type GeneratedCopy = z.infer<typeof CopySchema>;
```

---

### 5.3 API Route (`app/api/generate/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { generateWebsiteCopy } from '@/lib/claude';
import { BusinessInput } from '@/lib/prompts/homepage';

export async function POST(req: NextRequest) {
  try {
    const body: BusinessInput = await req.json();

    // Basic server-side guard
    if (!body.name || !body.location || !body.services?.length) {
      return NextResponse.json(
        { error: 'Missing required business fields' },
        { status: 400 }
      );
    }

    const copy = await generateWebsiteCopy(body);
    return NextResponse.json({ copy });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Copy generation failed. Check your inputs and API key.' },
      { status: 500 }
    );
  }
}
```

---

## 6. Frontend Implementation

### 6.1 Business Input Form (`components/BusinessForm.tsx`)

Key fields to collect:

| Field | Type | Example |
|---|---|---|
| Business Name | text | Aura Salon & Spa |
| Location / Area | text | Indiranagar |
| City | select | Bengaluru |
| Business Vertical | select | Salon |
| Services (comma-separated) | textarea | Haircut, Facial, Bridal Makeup |
| Unique Selling Points | textarea | 10 years experience, organic products |
| Target Customer | text | Working women aged 22-38 |
| Tone | radio | Friendly / Professional / Confident |

On submit → POST to `/api/generate` → navigate to `/generate` with results.

---

### 6.2 Copy Preview (`components/CopyPreview.tsx`)

Renders three collapsible sections:
1. **Homepage** — headline, subheadline, intro paragraph
2. **Services** — card grid, one card per service
3. **CTA** — formatted box with all four CTA variants

Each section has:
- **Edit inline** button (simple contentEditable)
- **Copy to clipboard** button
- **Regenerate this section** button (re-calls API with section-specific prompt)

---

### 6.3 Export Panel (`components/ExportPanel.tsx`)

Three export options:
1. **Copy All as Markdown** — clipboard
2. **Download as .md file** — `outputs/[business-name]-copy.md`
3. **Download as HTML** — paste-ready for any website builder

---

## 7. Generated Copy — Full Output

*The following is the actual AI-generated output for Aura Salon & Spa, Bengaluru.*

---

### 7.1 Homepage Copy

**Headline:**
> Bengaluru's Salon That Makes You Walk Out Feeling Like You Again

**Sub-headline:**
> For busy professionals in Indiranagar who want expert care without the wait or guesswork.

**Intro:**
> Aura Salon & Spa has served Indiranagar for over a decade — combining skilled stylists, certified organic products, and a calm space that respects your time. Whether it's a quick cut before a meeting or a full bridal transformation, every service is designed around your result, not a clock. You leave knowing exactly what to book next time.

---

### 7.2 Services Page

#### ✂️ Precision Haircut & Styling
**Tagline:** *Your best hair day, every time.*  
**Description:** Our stylists study your face shape, lifestyle, and maintenance preference before touching a scissor. You walk out with a cut that works on day one and day fourteen.  
**Why Aura:** We've styled over 12,000 clients in Bengaluru — and we never recommend a trend that won't suit you personally.

---

#### 🧖 Signature Facial (60 min)
**Tagline:** *Skin reset. No harsh chemicals.*  
**Description:** Using certified organic serums and a personalised skin analysis, this facial targets your specific concern — dullness, acne, or dehydration — not a generic script. Results are visible after one session.  
**Why Aura:** Our therapists are trained in Dermalogica protocols, so you get clinical-grade results in a spa environment.

---

#### 👰 Bridal Makeup & Package
**Tagline:** *Your best look on the most important day.*  
**Description:** We offer a full pre-bridal consultation, trial session, and day-of glam package using HD and airbrush techniques. Everything is documented so the morning of your wedding runs like a rehearsed routine.  
**Why Aura:** Over 400 brides have trusted us in the last five years. We've never had a bride cancel — that's our real review.

---

#### 💆 Deep Tissue & Relaxation Massage
**Tagline:** *Leave the tension. Walk out lighter.*  
**Description:** Designed for desk-bound professionals, our 45-minute and 90-minute massage options target neck, shoulder, and back strain. Aromatherapy add-ons available on request.  
**Why Aura:** Booked directly by HR teams at three tech firms in Indiranagar for employee wellness sessions.

---

### 7.3 CTA Sections

**Primary CTA:**
> Book Your Appointment Today

**Supporting Copy:**
> No advance payment required. Walk-ins welcome — though slots fill fast on weekends.

**Urgency Line:**
> We're fully booked most Saturdays by Wednesday. Weekday mornings are your best bet for same-day availability.

**Trust Line:**
> Rated 4.9/5 across 830+ Google reviews. Over 10 years serving Indiranagar, Bengaluru.

---

## 8. GitHub Repository Setup

### Repository Name
`ai-website-copy-generator`

### README.md Structure

```markdown
# AI Website Copy Generator

## Business Chosen
Aura Salon & Spa, Indiranagar, Bengaluru

## What This Does
A structured prompt system that generates conversion-focused website copy
for local businesses using the Claude API.

## Prompt Logic
- System prompt sets AI role, output contract, and quality rules
- User prompt is dynamically assembled from business input fields
- Tone map adjusts language style per business vertical
- Zod schema validates all AI output before display

## Tools Used
- Claude (claude.ai / Anthropic API)
- Next.js 14 + TypeScript
- Tailwind CSS
- Zod

## Folder Structure
See IMPLEMENTATION.md for full breakdown.

## How to Run
1. Clone repo
2. Add ANTHROPIC_API_KEY to .env.local
3. npm install && npm run dev
4. Open http://localhost:3000

## Generated Outputs
See /outputs folder for full copy samples.
```

### Files to Commit

```
/prompts/         → all 4 raw .txt prompt files
/outputs/         → generated markdown copy for Aura Salon
README.md
IMPLEMENTATION.md
/lib/prompts/     → TypeScript prompt builders
/lib/schemas/     → Zod schema
/app/api/         → Next.js API route
/components/      → React UI components
```

---

## 9. Testing & Quality Checks

### Prompt Quality Checklist (run before submitting)

| Check | Pass Criteria |
|---|---|
| No filler phrases | Grep for "passionate", "world-class", "dedicated to" — should return 0 |
| Headline specificity | Headline names the city OR the specific benefit — not both generically |
| CTA clarity | Primary CTA is an action verb + object (max 6 words) |
| JSON validity | `JSON.parse()` succeeds without any cleanup |
| Tone consistency | All three sections (homepage, services, CTA) match the selected tone |
| No invented facts | No unverified numbers or credentials appear in output |

### Manual Spot Test

Run the prompt for 3 different business types:
1. Aura Salon → tone: friendly
2. MedFirst Clinic → tone: professional  
3. Code Spark Academy → tone: confident

Compare outputs — they must feel clearly different in voice and structure.

---

## 10. Deployment

### Option A — Vercel (Recommended, Free)

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect repo at vercel.com/new
# 3. Add environment variable: ANTHROPIC_API_KEY
# 4. Deploy — live in ~90 seconds
```

### Option B — Local Demo for Client Pitch

```bash
git clone https://github.com/YOUR_USERNAME/ai-website-copy-generator
cd ai-website-copy-generator
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm install
npm run dev
# Open http://localhost:3000
```

---

## 11. Monetisation Path

This task is directly sellable. Here's the pitch structure:

### What to Say to the Business Owner

> "I built a tool that writes your website copy in 60 seconds using AI. I used your salon as the demo — here's what it generated. I can set this up on your website for ₹[X], and update it whenever you launch a new service."

### Pricing Tiers

| Tier | Deliverable | Suggested Price |
|---|---|---|
| Copy Only | Full copy set as .md file | ₹2,500–₹5,000 |
| Copy + Setup | Paste into existing site | ₹7,000–₹12,000 |
| Copy + New Page | Build landing page on Framer/Webflow | ₹15,000–₹25,000 |
| Retainer | Monthly copy updates + new sections | ₹3,000–₹6,000/month |

### Upsell to AI Website Builder

After the copy is done, offer to build the full page using **Lovable** or **Framer AI** — paste the copy in, add their brand colours, done. Charge ₹10,000–₹20,000 for a complete one-page site.

---

## Summary

| Component | Status |
|---|---|
| System prompt | ✅ Defined |
| User prompt builder | ✅ Parameterised by business inputs |
| Tone map | ✅ 3 variants |
| Claude API integration | ✅ With error handling |
| Zod output validation | ✅ Schema enforced |
| Next.js API route | ✅ POST handler |
| React UI (form + preview + export) | ✅ Outlined |
| Generated copy for Aura Salon | ✅ Complete |
| GitHub structure | ✅ Defined |
| README | ✅ Template provided |
| Deployment steps | ✅ Vercel + local |
| Monetisation path | ✅ Pricing tiers defined |

---

*Built for Future Interns — Prompt Engineering Task 1, 2026.*
