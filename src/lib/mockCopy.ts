import { BusinessInput, GeneratedCopy } from './schemas/copy-schema';

export const demoInput: BusinessInput = {
  name: 'Aura Sanctuary Spa',
  location: 'Indiranagar 100 Feet Road',
  vertical: 'Premium Wellness & Skincare Clinic',
  services: [
    'Rejuvenating Ayurvedic Facial',
    'Holistic Detox Deep Tissue Therapy',
    'Precision Dermaceutical Peels'
  ],
  uniqueSellingPoints: [
    'Dr. Certified Organic Botanic Serums',
    'Elite Multi-Sensory Therapy Rooms',
    'Tailored Dermal Mapping Blueprints'
  ],
  targetCustomer: 'Highly ambitious corporate professionals & creators seeking authentic mental restoration',
  tone: 'professional',
  city: 'Bengaluru'
};

export const demoCopy: GeneratedCopy = {
  homepage: {
    headline: 'True Dermal Science Fused with Ayurvedic Wisdom',
    subheadline: 'Step into Indiranagar’s premier sanctuary for science-backed skin restoration and advanced cellular de-stressing.',
    intro: 'Welcome to Aura Sanctuary Spa. Our custom formulations combine clinically proven medical science with centuries-trusted Ayurvedic botanic oils, ensuring each therapy is an exquisite investment in your health. Designed precisely for high-achieving individuals who refuse to compromise on wellness.'
  },
  services: [
    {
      name: 'Rejuvenating Ayurvedic Facial',
      tagline: 'Ancient copper-bowl massage matched with pure collagen serums',
      description: 'Experience clinical skin lifting powered by authentic neem, wild kashmiri saffron, and bioactive cellular peptides. This signature treatment hydrates deep muscular levels, instantly contouring the jawline and restoring natural dermal luminosity.',
      whyUs: 'We use non-comedogenic premium organic oils hand-ground each morning.'
    },
    {
      name: 'Holistic Detox Deep Tissue Therapy',
      tagline: 'Therapeutic pressure targeted to dissolve chronic neuro-muscular fatigue',
      description: 'Advanced therapeutic techniques coupled with heated black volcanic basalt stones. We address localized tension from prolonged screen exposure, restoring micro-circulation and realigning the muscle fibers.',
      whyUs: 'Every practitioner maintains over 1,000 recorded clinical hours.'
    },
    {
      name: 'Precision Dermaceutical Peels',
      tagline: 'Medical-grade mild chemical re-texturing for lasting clarity',
      description: 'A bespoke botanical peel system customized to your personal melanin levels. Gently sloughs off environmental dead surface cells, revealing tight, flawless skin layers with zero downtime or redness.',
      whyUs: 'Includes a complimentary post-peel recovery kit valued at $45.'
    }
  ],
  cta: {
    primary: 'Book Custom Session',
    supporting: 'Secure your premium time slot today. We respond with a dedicated dermal mapping blueprint within four hours.',
    urgency: 'Only 3 Priority Saturday Slots Remaining This Week — Reserve Yours Automatically Now!',
    trust: 'Trust Verified - ISO 9001:2 quality certified and 100% money-back satisfaction guaranteed'
  }
};

export function getDemoData(): { inputData: BusinessInput, copy: GeneratedCopy } {
  return {
    inputData: demoInput,
    copy: demoCopy
  };
}
