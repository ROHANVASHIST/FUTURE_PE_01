import { z } from 'zod';

export const ServiceSchema = z.object({
  name: z.string().min(2),
  tagline: z.string().min(4),
  description: z.string().min(20),
  whyUs: z.string().min(10),
});

export const HomepageSchema = z.object({
  headline: z.string().min(5),
  subheadline: z.string().min(10),
  intro: z.string().min(30),
});

export const CTASchema = z.object({
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

export const BusinessInputSchema = z.object({
  name: z.string().min(2),
  location: z.string().min(2),
  vertical: z.string().min(2),
  services: z.array(z.string()).min(1),
  uniqueSellingPoints: z.array(z.string()).min(1),
  targetCustomer: z.string().min(5),
  tone: z.enum(['friendly', 'professional', 'confident']),
  city: z.string().min(2),
});

export type BusinessInput = z.infer<typeof BusinessInputSchema>;
