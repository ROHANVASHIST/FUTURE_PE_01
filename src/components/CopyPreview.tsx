import React, { useState, useMemo, useRef, useEffect } from 'react';
import { GeneratedCopy, BusinessInput } from '../lib/schemas/copy-schema';
import { 
  Copy, Check, ChevronDown, ChevronRight, RefreshCw, Loader2, 
  Laptop, Tablet, Smartphone, Edit3, Eye, Compass, CheckCircle, 
  MessageSquare, Send, Star, Lightbulb, Grid, Sparkles, AlertCircle,
  Menu, X, Sliders, Award, Users, Shield, Zap, Flame, Info, HelpCircle, 
  BadgeCheck, BarChart3, Calculator, ZoomIn, Heart, ChevronLeft, ArrowRight, ArrowLeft, Wrench
} from 'lucide-react';

interface Props {
  copy: GeneratedCopy;
  inputData: BusinessInput | null;
  onUpdateCopy: (updatedSection: any, sectionName: string) => void;
  onOpenEditor?: () => void;
}

export default function CopyPreview({ copy, inputData, onUpdateCopy, onOpenEditor }: Props) {
  const [activeTab, setActiveTab] = useState<'live' | 'cards'>('live');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isEditable, setIsEditable] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  // Simulated Lead Capture state
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSent, setLeadSent] = useState(false);

  // --- FULL FLetchED INTERACTIVE WEBSITE STATES ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<'all' | 'workspace' | 'details' | 'people'>('all');
  const [selectedImageFilter, setSelectedImageFilter] = useState<'normal' | 'noir' | 'vintage' | 'cool' | 'pop'>('normal');
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);
  const [selectedLightboxTitle, setSelectedLightboxTitle] = useState<string>('');
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Real-time Estimator state variables
  const [estimatorServices, setEstimatorServices] = useState<string[]>([]);
  const [estimatorPackageTier, setEstimatorPackageTier] = useState<'starter' | 'growth' | 'pro'>('growth');
  const [estimatorUrgencyMultiplier, setEstimatorUrgencyMultiplier] = useState<number>(1.0);
  const [estimatorSelectedNote, setEstimatorSelectedNote] = useState<string>('Standard 2-3 Weeks');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync initial estimatorServices when services are loaded
  useEffect(() => {
    if (inputData?.services && inputData.services.length > 0) {
      setEstimatorServices(inputData.services.slice(0, 2));
    }
  }, [inputData?.services]);

  // Dynamic Vertical Theme Customizer Engine for high-fidelity images
  const verticalSettings = useMemo(() => {
    const verticalLower = (inputData?.vertical || '').toLowerCase();
    
    // Default & Corporate fallback settings
    let hero = [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
    ];
    let services = [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop"
    ];
    let whyUsImages = [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop"
    ];
    let taglinePrefix = "✨ Elite Dynamic Acceleration";
    let iconName = "Zap"; 
    let badgeLabel = "Premium Professional Blueprint";

    if (verticalLower.includes('salon') || verticalLower.includes('spa') || verticalLower.includes('beauty') || verticalLower.includes('cosmetic') || verticalLower.includes('skin') || verticalLower.includes('wellness')) {
      hero = [
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop"
      ];
      services = [
        "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=600&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1604654894610-df4906b1850d?q=80&w=600&auto=format&fit=crop"
      ];
      whyUsImages = [
        "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop"
      ];
      taglinePrefix = "🌿 Holistic Biological Rejuvenation";
      iconName = "Heart";
      badgeLabel = "Certified Natural Wellness Sanctuary";
    } else if (verticalLower.includes('cafe') || verticalLower.includes('coffee') || verticalLower.includes('restaurant') || verticalLower.includes('bakery') || verticalLower.includes('food') || verticalLower.includes('dining')) {
      hero = [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
      ];
      services = [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"
      ];
      whyUsImages = [
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=800&auto=format&fit=crop"
      ];
      taglinePrefix = "☕ Fresh Organic Roast Hub";
      iconName = "Flame";
      badgeLabel = "Artisan Baking & Gastronomy Lounge";
    } else if (verticalLower.includes('health') || verticalLower.includes('medical') || verticalLower.includes('clinic') || verticalLower.includes('dentist') || verticalLower.includes('therapy')) {
      hero = [
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
      ];
      services = [
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=600&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?q=80&w=600&auto=format&fit=crop"
      ];
      whyUsImages = [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop"
      ];
      taglinePrefix = "⚕️ Clinical Longevity Diagnostics";
      iconName = "Award";
      badgeLabel = "ISO 9001:2 Certified Healthcare Clinic";
    } else if (verticalLower.includes('tech') || verticalLower.includes('software') || verticalLower.includes('consulting') || verticalLower.includes('marketing') || verticalLower.includes('finance') || verticalLower.includes('b2b') || verticalLower.includes('service')) {
      hero = [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
      ];
      services = [
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop"
      ];
      whyUsImages = [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop"
      ];
      taglinePrefix = "⚡ Advanced Cybernetic Acceleration";
      iconName = "Zap";
      badgeLabel = "High-Density Full Stack Engineering Hub";
    }

    return { hero, services, whyUsImages, taglinePrefix, iconName, badgeLabel };
  }, [inputData?.vertical]);

  // Helper to render the brand icon based on vertical settings
  const RenderBrandIcon = () => {
    switch (verticalSettings.iconName) {
      case 'Heart': return <Heart className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Award': return <Award className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (activeTab !== 'live') {
      setActiveTab('live');
    }
    setTimeout(() => {
      const parent = scrollContainerRef.current;
      if (!parent) return;
      const targetElement = parent.querySelector(`#${targetId}`);
      if (targetElement) {
        const parentRect = parent.getBoundingClientRect();
        const elementRect = targetElement.getBoundingClientRect();
        const targetScrollTop = parent.scrollTop + (elementRect.top - parentRect.top) - 16;
        parent.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
      }
    }, activeTab === 'live' ? 0 : 150);
    setIsMobileMenuOpen(false);
  };

  // Vertical-aware beautiful Portfolio Stock Gallery Images (Add More Images requested!)
  const portfolioImages = useMemo(() => {
    const verticalLower = (inputData?.vertical || '').toLowerCase();
    
    let items = [
      { id: 1, category: 'workspace', title: 'Creative Consultation Workspace', description: 'Collaborative hubs where strategic blueprints are mapped.', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop' },
      { id: 2, category: 'details', title: 'The Fine Print Focus', description: 'Meticulous microcopy, spacing, and typography alignments.', url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop' },
      { id: 3, category: 'people', title: 'Customer Experience Research', description: 'Connecting user personas directly with dynamic brand touchpoints.', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop' },
      { id: 4, category: 'workspace', title: 'Prototyping Lab & Sandbox', description: 'Designing interactive content modules and fast-loading web previews.', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop' },
      { id: 5, category: 'details', title: 'Minimalist Layout Alignment', description: 'Structuring information grids with balanced columns and typography.', url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=600&auto=format&fit=crop' },
      { id: 6, category: 'people', title: 'Empathetic Client Creative Sprints', description: 'Cooperating in live feedback loops to elevate digital narratives.', url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop' },
      { id: 7, category: 'workspace', title: 'Vanguard Strategy Room', description: 'High-altitude war-room optimized for tactical brand projections.', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop' },
      { id: 8, category: 'details', title: 'Design Component Schematics', description: 'Reviewing component architectures and high-resolution wireframe states.', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop' },
      { id: 9, category: 'people', title: 'Brainstorming Sprint Group', description: 'Fast multi-disciplinary collaborative teams drawing active solutions.', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop' }
    ];

    if (verticalLower.includes('salon') || verticalLower.includes('spa') || verticalLower.includes('beauty') || verticalLower.includes('cosmetic') || verticalLower.includes('skin') || verticalLower.includes('wellness')) {
      items = [
        { id: 1, category: 'workspace', title: 'Premium Earth-Toned Ritual Suite', description: 'Quiet, airy luxury treatment rooms promoting instant sensory comfort.', url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop' },
        { id: 2, category: 'details', title: 'Organic Essential Botanicals', description: 'Cold-pressed active botanical oils and calming herbal therapy serums.', url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop' },
        { id: 3, category: 'people', title: 'Tailored Aesthetic Consultation', description: 'Certified beauty therapists tailoring active solutions to your skin profile.', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop' },
        { id: 4, category: 'workspace', title: 'Chic Sculpture & Toning Salons', description: 'Equipped with spacious individual styling stations and warm ambient lighting.', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop' },
        { id: 5, category: 'details', title: 'Soothing Facial Cell Masks', description: 'Infusing vitamins and rich minerals to revive glowing skin energy.', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop' },
        { id: 6, category: 'people', title: 'Aesthetic Treatment Care', description: 'Providing luxurious healing therapies and massage courses.', url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop' },
        { id: 7, category: 'workspace', title: 'Zen Hydrotherapy Chamber', description: 'Soothing stream pools and active biological steam chambers for wellness.', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop' },
        { id: 8, category: 'details', title: 'Mineral Detox Clay Rituals', description: 'Premium volcanic sand formulas to draw skin toxins delicately.', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop' },
        { id: 9, category: 'people', title: 'Mindful Breathing Coach', description: 'Deep calming guided meditation practitioners matching therapeutic states.', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop' }
      ];
    } else if (verticalLower.includes('cafe') || verticalLower.includes('coffee') || verticalLower.includes('restaurant') || verticalLower.includes('bakery') || verticalLower.includes('food') || verticalLower.includes('dining')) {
      items = [
        { id: 1, category: 'workspace', title: 'Cozy Espresso Lounge', description: 'Warm, rustic timber counters filled with single-origin beans.', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop' },
        { id: 2, category: 'details', title: 'Pour-Over V60 Brewing Craft', description: 'Showcasing precise heat distributions and custom bloom filters.', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop' },
        { id: 3, category: 'people', title: 'Precision Artisan Barista extraction', description: 'Artisans dialing in high-pressure steam profiles for rich lattes.', url: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=600&auto=format&fit=crop' },
        { id: 4, category: 'workspace', title: 'Stone-Deck Sourdough Ovens', description: 'Thick blistered loaves baked fresh daily with organic stone-milled wheat.', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop' },
        { id: 5, category: 'details', title: 'Dynamic Pastry Laminations', description: 'Rolling pure farm-churned butter sheets for crisp flaky structures.', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop' },
        { id: 6, category: 'people', title: 'Organic Farm-to-Table Plating', description: 'Chefs arranging crisp regenerative leaves and fresh garden harvests.', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop' },
        { id: 7, category: 'workspace', title: 'Sunlit Coffee Patio', description: 'Beautiful airy outdoor seating arrangements suited for afternoon work sessions.', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop' },
        { id: 8, category: 'details', title: 'Artfully Structured Coffee Beans', description: 'Vibrant washed-process Arabica beans roasting under custom timers.', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop' },
        { id: 9, category: 'people', title: 'Warm Guest Service Interactions', description: 'Serving fresh hand-crafted beverages and warm croissants with a smile.', url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop' }
      ];
    } else if (verticalLower.includes('health') || verticalLower.includes('medical') || verticalLower.includes('clinic') || verticalLower.includes('dentist') || verticalLower.includes('wellness') || verticalLower.includes('therapy')) {
      items = [
        { id: 1, category: 'workspace', title: 'Advanced Sanitized Diagnostics Suite', description: 'Warm consulting spaces employing natural timber and ambient daylight.', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop' },
        { id: 2, category: 'details', title: 'High Frequency Diagnostic Imagery', description: 'Ultrasound arrays tracking soft-tissue behaviors in active real-time.', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop' },
        { id: 3, category: 'people', title: 'Elite Clinical Consulting Lead', description: 'Compassionate specialists engineering biological joint-longevity programs.', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop' },
        { id: 4, category: 'workspace', title: 'Spacious Active Therapy Suite', description: 'Equipped with custom orthopedic testing pulleys and visual coordinates.', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop' },
        { id: 5, category: 'details', title: 'Organic Nutritive Apothecary', description: 'Crafting personalized botanical formulations to assist recovery.', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop' },
        { id: 6, category: 'people', title: 'Laser Orthotic Scanning Prep', description: 'Engineers designing anatomical insoles mapping active weight loads.', url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop' },
        { id: 7, category: 'workspace', title: 'Cardiopulmonary Lab Room', description: 'Clean analysis decks configured with highly calibrated metrics scanners.', url: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=600&auto=format&fit=crop' },
        { id: 8, category: 'details', title: 'Molecular Bio-Serum Decks', description: 'Vials of premium organic nutrients undergoing advanced centrifuge cycles.', url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop' },
        { id: 9, category: 'people', title: 'Dynamic Physical Recharging Session', description: 'Applying structural manual adjustments to back and core kinetic chains.', url: 'https://images.unsplash.com/photo-1597764690523-15bea4c581c9?q=80&w=600&auto=format&fit=crop' }
      ];
    } else if (verticalLower.includes('tech') || verticalLower.includes('software') || verticalLower.includes('consulting') || verticalLower.includes('marketing') || verticalLower.includes('finance') || verticalLower.includes('b2b')) {
      items = [
        { id: 1, category: 'workspace', title: 'Strategic Product Architecture Suite', description: 'Performance sandboxes utilizing terminal grids and glass panels.', url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600&auto=format&fit=crop' },
        { id: 2, category: 'details', title: 'System Latency Observability Monitor', description: 'Telemetry consoles displaying sub-microsecond event loops.', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop' },
        { id: 3, category: 'people', title: 'Core Agile Retrospective Sprints', description: 'Engineering crews drafting user workflows and flowcharts in code.', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop' },
        { id: 4, category: 'workspace', title: 'Collaborative Ideation Think Tank', description: 'Quiet creative chambers optimized for micro-consultations.', url: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=600&auto=format&fit=crop' },
        { id: 5, category: 'details', title: 'Interactive wireframing mocks', description: 'Evaluating margin balances and visual conversion triggers.', url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop' },
        { id: 6, category: 'people', title: 'Continuous Server Deployment audit', description: 'Advising start-ups on system vulnerabilities and speed parameters.', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop' },
        { id: 7, category: 'workspace', title: 'Executive Presentation suite', description: 'Equipped with wide monitors displaying dynamic pipeline graphics.', url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop' },
        { id: 8, category: 'details', title: 'Refined UI components schematic', description: 'Inspecting border ratios and contrasting primary branding colors.', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop' },
        { id: 9, category: 'people', title: 'Founder Advisory Call Sync', description: 'Reviewing key brand conversion performance markers over coffee.', url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=600&auto=format&fit=crop' }
      ];
    }
    return items;
  }, [inputData?.vertical]);

  // Vertical-aware beautiful client reviews
  const testimonials = useMemo(() => {
    const biz = inputData?.name || 'our partner';
    const loc = inputData?.city || 'this area';
    return [
      {
        quote: `I was critical at first, but ${biz} translated my vague expectations into outstanding reality. Our team is fully aligned, and user engagement metrics surged by 45% within three weeks of launch!`,
        author: "Sarah Jenkins",
        role: "Managing Director",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        rating: 5
      },
      {
        quote: `They are unmatched in their attention to visual layout and meticulous planning. For anyone looking to work with top-tier talent in ${loc}, ${biz} is the absolute gold standard. Recommended without reservation!`,
        author: "David Chen",
        role: "Regional Operations Lead",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        rating: 5
      },
      {
        quote: `Incredible reaction timing, clean processes, and warm support. They helped scale our product line smoothly while staying fully authentic to our core customer personas. Real craftsmanship.`,
        author: "Elena Rostov",
        role: "Lead Creative Designer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
        rating: 5
      }
    ];
  }, [inputData]);

  // Live Pricing / Cost Estimation engine math calculator
  const estimatorPriceResult = useMemo(() => {
    const basePricePerService = 350;
    const count = estimatorServices.length;
    let surcharge = 0;
    if (estimatorPackageTier === 'starter') surcharge = 100;
    if (estimatorPackageTier === 'growth') surcharge = 450;
    if (estimatorPackageTier === 'pro') surcharge = 900;
    
    return Math.round((count * basePricePerService + surcharge) * estimatorUrgencyMultiplier);
  }, [estimatorServices, estimatorPackageTier, estimatorUrgencyMultiplier]);

  const handleApplyEstimateToForm = () => {
    // Scroll to booking, fill default prompt text notification
    const bookingSection = document.getElementById('booking-view');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cycleHeroImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setHeroImageIndex((prev) => (prev + 1) % verticalSettings.hero.length);
  };

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // State calculations for exact matching brand palettes matching ExportPanel
  const brand = useMemo(() => {
    let hash = 0;
    const str = inputData?.name || 'Brand';
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash);
    const hue = index % 360;
    const complementaryHue = (hue + 180) % 360;
    const fonts = [
      { h: 'Outfit', b: 'Inter' },
      { h: 'Playfair Display', b: 'DM Sans' },
      { h: 'Space Grotesk', b: 'Roboto' },
      { h: 'Cormorant', b: 'Montserrat' },
      { h: 'Syne', b: 'Work Sans' },
    ];
    return {
      primary: `hsl(${hue}, 75%, 25%)`,
      primaryHover: `hsl(${hue}, 75%, 15%)`,
      accent: `hsl(${complementaryHue}, 85%, 45%)`,
      background: `hsl(${hue}, 15%, 98%)`,
      lightPrimaryBg: `hsl(${hue}, 85%, 95%)`,
      lightAccentBg: `hsl(${complementaryHue}, 85%, 95%)`,
      darkPrimaryBg: `hsl(${hue}, 40%, 12%)`,
      fonts: fonts[index % fonts.length]
    };
  }, [inputData?.name]);

  const handleRegenerate = async (sectionId: string) => {
    if (!inputData) return;
    try {
      setRegeneratingSection(sectionId);
      const response = await fetch('/api/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: inputData,
          currentCopy: copy,
          section: sectionId
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to regenerate section');
      }
      
      if (result.sectionData) {
        onUpdateCopy(result.sectionData, sectionId);
      }
    } catch (error) {
      console.error("Regeneration error:", error);
    } finally {
      setRegeneratingSection(null);
    }
  };

  // Direct edit event handler to save content Editable properties safely
  const handleHomepageEdit = (field: 'headline' | 'subheadline' | 'intro', value: string) => {
    if (!value.trim() || value === copy.homepage[field]) return;
    onUpdateCopy({
      ...copy.homepage,
      [field]: value.trim()
    }, 'homepage');
  };

  const handleServiceEdit = (index: number, field: 'name' | 'tagline' | 'description' | 'whyUs', value: string) => {
    if (!value.trim() || value === copy.services[index][field]) return;
    const updatedServices = [...copy.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value.trim()
    };
    onUpdateCopy(updatedServices, 'services');
  };

  const handleCTAEdit = (field: 'primary' | 'supporting' | 'urgency' | 'trust', value: string) => {
    if (!value.trim() || value === copy.cta[field]) return;
    onUpdateCopy({
      ...copy.cta,
      [field]: value.trim()
    }, 'cta');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSent(true);
    setTimeout(() => {
      setLeadSent(false);
      setLeadName('');
      setLeadEmail('');
    }, 4000);
  };

  // Standard Segment component for Outline Cards Tab
  const SectionCard = ({ id, title, children, textToCopy }: { id: string, title: string, children: React.ReactNode, textToCopy: string }) => {
    const [isOpen, setIsOpen] = useState(true);
    const isRegenerating = regeneratingSection === id;

    return (
      <div className="bg-white dark:bg-[#21272A] rounded-lg border border-[#DDE1E6] dark:border-[#343A3F] flex flex-col shadow-sm shrink-0 transition-colors relative">
        <div className="h-10 border-b border-[#F2F4F8] dark:border-[#343A3F] flex items-center px-3 justify-between bg-[#F8F9FA] dark:bg-[#1A1C1E] rounded-t-lg cursor-pointer transition-colors" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center gap-2">
            {isOpen ? <ChevronDown className="w-4 h-4 text-[#878D96] dark:text-[#697077]" /> : <ChevronRight className="w-4 h-4 text-[#878D96] dark:text-[#697077]" />}
            <h3 className="text-[11px] font-bold text-[#697077] dark:text-[#A2A9B0] uppercase tracking-wider">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRegenerate(id);
              }}
              disabled={isRegenerating}
              className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded transition-colors uppercase tracking-wider border border-transparent hover:border-[#DDE1E6] dark:hover:border-[#343A3F] hover:bg-white dark:hover:bg-[#343A3F] text-[#1A1C1E] dark:text-[#F1F3F5] disabled:opacity-50"
            >
              {isRegenerating ? <Loader2 className="w-3 h-3 text-[#0052CC] animate-spin" /> : <RefreshCw className="w-3 h-3 text-[#0052CC]" />}
              {isRegenerating ? "REGENERATING..." : "REGENERATE"}
            </button>
            <div className="w-px h-3 bg-[#DDE1E6] dark:bg-[#4D5358]"></div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(textToCopy, id);
              }}
              className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded transition-colors uppercase tracking-wider border border-transparent hover:border-[#DDE1E6] dark:hover:border-[#343A3F] hover:bg-white dark:hover:bg-[#343A3F] text-[#1A1C1E] dark:text-[#F1F3F5]"
            >
              {copiedSection === id ? <Check className="w-3 h-3 text-[#28C840]" /> : <Copy className="w-3 h-3 text-[#697077] dark:text-[#A2A9B0]" />}
              {copiedSection === id ? "COPY_OK" : "CLIPBOARD"}
            </button>
          </div>
        </div>
        {isOpen && (
           <div className={`flex-1 bg-white dark:bg-[#21272A] p-4 sm:p-6 overflow-hidden flex flex-col border-t border-[#F2F4F8] dark:border-[#343A3F] transition-colors ${isRegenerating ? 'opacity-50 pointer-events-none' : ''}`}>
            {children}
          </div>
        )}
      </div>
    );
  };

  const viewportWidthClass = {
    desktop: 'w-full',
    tablet: 'max-w-[768px] border-x border-[#DDE1E6] dark:border-[#343A3F] shadow-2xl',
    mobile: 'max-w-[380px] border-x border-[#DDE1E6] dark:border-[#343A3F] shadow-2xl'
  }[viewport];

  return (
    <div className="flex flex-col h-full gap-3">
      {/* SECTION TOP TABS CONTAINER */}
      <div className="bg-white dark:bg-[#21272A] p-1.5 rounded-lg border border-[#DDE1E6] dark:border-[#343A3F] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0 shadow-sm">
        <div className="flex items-center gap-1 bg-[#F1F3F5] dark:bg-[#121619] p-1 rounded-md">
          <button
            onClick={() => setActiveTab('live')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              activeTab === 'live' 
                ? 'bg-white dark:bg-[#21272A] text-[#0052CC] dark:text-[#4589ff] shadow-sm' 
                : 'text-[#697077] dark:text-[#A2A9B0] hover:text-[#1A1C1E] dark:hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Live Preview Pane
          </button>
          <button
            onClick={() => setActiveTab('cards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              activeTab === 'cards' 
                ? 'bg-white dark:bg-[#21272A] text-[#0052CC] dark:text-[#4589ff] shadow-sm' 
                : 'text-[#697077] dark:text-[#A2A9B0] hover:text-[#1A1C1E] dark:hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Content Outlines
          </button>
          {onOpenEditor && (
            <button
              id="open-creator-from-preview"
              onClick={onOpenEditor}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all text-[#0052CC] dark:text-[#4589ff] bg-[#0052CC]/5 dark:bg-[#4589ff]/5 border border-[#0052CC]/20 hover:bg-[#0052CC]/10 hover:border-[#0052CC]/40 shadow-sm ml-2 group"
            >
              <Wrench className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              Open Website Creator
            </button>
          )}
        </div>

        {/* UTILITIES PER ACTIVE VIEW */}
        {activeTab === 'live' ? (
          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Direct Inline Edit Mode Toggle */}
            <div className="flex items-center gap-2 bg-[#F1F3F5] dark:bg-[#121619] p-1 rounded-md border border-[#DDE1E6] dark:border-transparent">
              <button
                onClick={() => setIsEditable(false)}
                className={`p-1 px-2.5 text-[10px] font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1 ${
                  !isEditable 
                    ? 'bg-white dark:bg-[#21272A] text-[#1D1D20] dark:text-white shadow-xs' 
                    : 'text-[#697077] dark:text-[#A2A9B0]'
                }`}
                title="Preview Mockup as a Visitor"
              >
                <Eye className="w-3 h-3" />
                Preview Mode
              </button>
              <button
                onClick={() => setIsEditable(true)}
                className={`p-1 px-2.5 text-[10px] font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1 ${
                  isEditable 
                    ? 'bg-white dark:bg-[#21272A] text-[#0052CC] dark:text-[#4589ff] shadow-xs' 
                    : 'text-[#697077] dark:text-[#A2A9B0]'
                }`}
                title="Edit Copy Direct-on-Screen"
              >
                <Edit3 className="w-3 h-3" />
                Direct Edit
              </button>
            </div>

            {/* Viewport Resizer */}
            <div className="flex items-center gap-1 bg-[#F1F3F5] dark:bg-[#121619] p-1 rounded-md">
              <button
                onClick={() => setViewport('desktop')}
                className={`p-1.5 rounded transition-colors ${viewport === 'desktop' ? 'bg-white dark:bg-[#21272A] text-[#0052CC] dark:text-[#4589ff]' : 'text-[#697077]'}`}
                title="Desktop View"
              >
                <Laptop className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                className={`p-1.5 rounded transition-colors ${viewport === 'tablet' ? 'bg-white dark:bg-[#21272A] text-[#0052CC] dark:text-[#4589ff]' : 'text-[#697077]'}`}
                title="Tablet View"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                className={`p-1.5 rounded transition-colors ${viewport === 'mobile' ? 'bg-white dark:bg-[#21272A] text-[#0052CC] dark:text-[#4589ff]' : 'text-[#697077]'}`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-[10px] text-[#697077] uppercase font-bold tracking-widest px-2 hidden sm:block">
            Structured Copy Sections
          </p>
        )}
      </div>

      {/* RENDER DYNAMIC WINDOW CONTENT */}
      <div className="flex-1 overflow-y-auto pr-1" ref={scrollContainerRef}>
        {activeTab === 'live' ? (
          <div className="flex justify-center items-start min-h-full py-4 bg-[#E8EAED] dark:bg-[#121619] rounded-xl border border-[#DDE1E6] dark:border-[#343A3F] transition-colors relative">
            <div className={`bg-white dark:bg-[#1A1C1E] text-[#1D1D20] dark:text-[#F1F3F5] transition-all flex flex-col min-h-[600px] ${viewportWidthClass} relative overflow-hidden font-sans border border-[#DDE1E6] dark:border-[#3D444B]`}>
              
              {/* Direct Editing Information Bar */}
              {isEditable && (
                <div className="bg-[#EAF5FF] dark:bg-[#1E3A5F] text-[#0052CC] dark:text-[#A7D1FF] text-[10px] px-4 py-2 font-semibold flex items-center justify-between gap-2 border-b border-sky-200 dark:border-sky-950">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#0052CC] dark:text-[#4589ff]" />
                    <span><strong>Inline Edit Active:</strong> You can click inside any block highlighted with dashed lines and type directly to refine your copies! Changes sync automatically.</span>
                  </div>
                  <button onClick={() => setIsEditable(false)} className="underline hover:no-underline hover:opacity-85 text-[9px] uppercase tracking-wider font-bold">Done</button>
                </div>
              )}

              {/* ----------------- HIGH-FIDELITY PROFESSIONAL NAVBAR ----------------- */}
              <nav className="sticky top-0 bg-white/80 dark:bg-[#1A1C1E]/80 backdrop-blur-xl border-b border-[#F2F4F8]/50 dark:border-[#343A3F]/50 px-4 sm:px-8 h-16 flex items-center justify-between z-40 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110" style={{ backgroundColor: brand.primary }}>
                    <RenderBrandIcon />
                  </div>
                  <div className="flex flex-col -gap-1">
                    <span className="font-serif italic font-black text-sm sm:text-base tracking-tight text-[#111625] dark:text-white transition-opacity group-hover:opacity-80">
                      {inputData?.name || 'My Brand'}
                    </span>
                    <span className="text-[7px] font-black uppercase tracking-[0.3em] text-[#697077] dark:text-[#A2A9B0] opacity-60">
                      {inputData?.vertical || 'Professional Solutions'}
                    </span>
                  </div>
                </div>
                
                {/* Nav Menu Links - Enhanced with professional spacing and hover states */}
                <div className="hidden lg:flex items-center gap-8 text-[9px] font-black text-[#4D5358] dark:text-[#A2A9B0] uppercase tracking-[0.15em]">
                  <a href="#services-view" onClick={(e) => handleAnchorClick(e, 'services-view')} className="group relative py-2 transition-colors hover:text-[#0052CC] dark:hover:text-[#4589ff]">
                    <span className="flex items-center gap-1.5">
                      <Grid className="w-3.5 h-3.5 text-[#aa33ff] opacity-70 group-hover:opacity-100" /> Capabilities
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0052CC] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a href="#why-us-view" onClick={(e) => handleAnchorClick(e, 'why-us-view')} className="group relative py-2 transition-colors hover:text-[#0052CC] dark:hover:text-[#4589ff]">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-yellow-500 opacity-70 group-hover:opacity-100" /> Differentiation
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a href="#gallery-view" onClick={(e) => handleAnchorClick(e, 'gallery-view')} className="group relative py-2 transition-colors hover:text-[#0052CC] dark:hover:text-[#4589ff]">
                    <span className="flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5 text-sky-500 opacity-70 group-hover:opacity-100" /> Gallery
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a href="#estimator-view" onClick={(e) => handleAnchorClick(e, 'estimator-view')} className="group relative py-2 transition-colors hover:text-[#0052CC] dark:hover:text-[#4589ff]">
                    <span className="flex items-center gap-1.5">
                      <Calculator className="w-3.5 h-3.5 text-emerald-500 opacity-70 group-hover:opacity-100" /> ROI Tool
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden xl:flex items-center gap-1.5 text-[8px] font-bold text-[#697077] dark:text-[#A2A9B0] uppercase mr-2 opacity-60">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span>24/7 Availability</span>
                  </div>
                  <a 
                    href="#booking-view" 
                    onClick={(e) => handleAnchorClick(e, 'booking-view')}
                    className="hidden sm:inline-flex px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] text-white transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 active:scale-95" 
                    style={{ 
                      backgroundColor: brand.primary,
                      backgroundImage: `linear-gradient(135deg, ${brand.primary}, ${brand.accent}55)`
                    }}
                  >
                    {copy.cta.primary || 'Get Started'}
                  </a>
                  
                  {/* Mobile hamburger icon trigger */}
                  <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden p-1.5 rounded text-[#4D5358] dark:text-[#DDE1E6] hover:bg-[#F2F4F8] dark:hover:bg-[#343A3F] transition-colors"
                    title="Menu"
                  >
                    {isMobileMenuOpen ? <X className="w-5 h-5 text-red-500 animate-pulse" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              </nav>

              {/* MOBILE MENU NAV DRAWER OVERLAY */}
              {isMobileMenuOpen && (
                <div className="absolute inset-x-0 top-16 bg-white/98 dark:bg-[#1C1E22]/98 backdrop-blur-xl border-b border-[#DDE1E6] dark:border-[#383E44] z-50 p-5 flex flex-col gap-4 shadow-2xl lg:hidden select-none">
                  <p className="text-[9px] font-bold text-[#878D96] uppercase tracking-widest border-b pb-2">Navigation Links</p>
                  <div className="flex flex-col gap-3.5 text-xs font-bold text-[#4D5358] dark:text-[#DDE1E6]">
                    <a 
                      href="#services-view" 
                      onClick={(e) => handleAnchorClick(e, 'services-view')}
                      className="hover:text-[#0052CC] py-1 border-b border-[#F2F4F8] dark:border-[#2C3238] flex items-center gap-2"
                    >
                      <Grid className="w-4 h-4 text-[#0052CC]" />
                      Our Services & Capabilities
                    </a>
                    <a 
                      href="#why-us-view" 
                      onClick={(e) => handleAnchorClick(e, 'why-us-view')}
                      className="hover:text-[#0052CC] py-1 border-b border-[#F2F4F8] dark:border-[#2C3238] flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-[#0052CC]" />
                      Market Differentiation (USP)
                    </a>
                    <a 
                      href="#gallery-view" 
                      onClick={(e) => handleAnchorClick(e, 'gallery-view')}
                      className="hover:text-[#0052CC] py-1 border-b border-[#F2F4F8] dark:border-[#2C3238] flex items-center gap-2"
                    >
                      <ZoomIn className="w-4 h-4 text-[#0052CC]" />
                      Visual Media Showcase
                    </a>
                    <a 
                      href="#estimator-view" 
                      onClick={(e) => handleAnchorClick(e, 'estimator-view')}
                      className="hover:text-[#0052CC] py-1 border-b border-[#F2F4F8] dark:border-[#2C3238] flex items-center gap-2"
                    >
                      <Calculator className="w-4 h-4 text-[#0052CC]" />
                      Dynamic Rate Estimator Calculator
                    </a>
                    <a 
                      href="#testimonials-view" 
                      onClick={(e) => handleAnchorClick(e, 'testimonials-view')}
                      className="hover:text-[#0052CC] py-1 border-b border-[#F2F4F8] dark:border-[#2C3238] flex items-center gap-2"
                    >
                      <Star className="w-4 h-4 text-[#0052CC]" />
                      Client Endorsements & Reviews
                    </a>
                    <a 
                      href="#booking-view" 
                      onClick={(e) => handleAnchorClick(e, 'booking-view')}
                      className="hover:text-[#0052CC] py-1 flex items-center gap-2"
                    >
                      <Send className="w-4 h-4 text-[#0052CC]" />
                      Submit Project Lead Form
                    </a>
                  </div>
                  <a 
                    href="#booking-view"
                    onClick={(e) => handleAnchorClick(e, 'booking-view')}
                    className="w-full py-2 flex items-center justify-center text-center text-xs font-black uppercase tracking-widest text-white rounded shadow-sm"
                    style={{ backgroundColor: brand.primary }}
                  >
                    {copy.cta.primary}
                  </a>
                </div>
              )}

              {/* ----------------- THE DYNAMIC HERO STAGE ----------------- */}
              <section className="relative w-full overflow-hidden flex flex-col justify-end min-h-[300px] sm:min-h-[440px] pt-20 pb-16">
                {/* Hero dynamic image slider backdrop */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img 
                    key={heroImageIndex}
                    src={verticalSettings.hero[heroImageIndex]} 
                    alt="Hero banner" 
                    className="w-full h-full object-cover opacity-85 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1E] via-[#1A1C1E]/60 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A1C1E] via-[#1A1C1E]/40 to-transparent"></div>
                </div>

                <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
                  <button 
                    onClick={cycleHeroImage}
                    className="bg-black/40 hover:bg-black/60 backdrop-blur border border-white/20 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    Set Style Background
                  </button>
                  <span className="bg-black/40 backdrop-blur border border-white/20 text-white text-[8px] tracking-widest px-2 py-1 rounded">
                    IMG {heroImageIndex + 1}/{verticalSettings.hero.length}
                  </span>
                </div>

                {/* Hero Headline content */}
                <div className="relative z-10 px-6 sm:px-12 w-full max-w-4xl text-left text-white mt-auto select-text">
                  <div className="max-w-2xl">
                    <h1 
                      contentEditable={isEditable} 
                      suppressContentEditableWarning
                      onBlur={(e) => handleHomepageEdit('headline', e.currentTarget.innerText)}
                      className={`text-2xl sm:text-4xl lg:text-5xl font-serif font-black leading-tight tracking-tight mb-4 text-white drop-shadow-md outline-none cursor-text ${
                        isEditable ? 'border border-dashed border-sky-300 rounded p-1.5 bg-sky-900/40' : ''
                      }`}
                    >
                      {copy.homepage.headline}
                    </h1>
                    <p 
                      contentEditable={isEditable} 
                      suppressContentEditableWarning
                      onBlur={(e) => handleHomepageEdit('subheadline', e.currentTarget.innerText)}
                      className={`text-xs sm:text-base text-gray-100 font-sans leading-relaxed drop-shadow-xs max-w-xl outline-none cursor-text mb-6 ${
                        isEditable ? 'border border-dashed border-sky-300 rounded p-1.5 bg-sky-900/40' : ''
                      }`}
                    >
                      {copy.homepage.subheadline}
                    </p>
                  </div>
                </div>
              </section>

              {/* ----------------- SEAMLESS INTRO TESTIMONIAL / STORY ----------------- */}
              <section className="bg-white dark:bg-[#202428] py-8 border-y border-[#F2F4F8] dark:border-[#3D444B] px-6 sm:px-12 select-text">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="flex justify-center mb-2.5">
                    <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                  </div>
                  <h4 className="text-[10px] font-bold uppercase text-[#0052CC] dark:text-[#4589ff] tracking-widest mb-3">Our Core Message</h4>
                  <p 
                    contentEditable={isEditable} 
                    suppressContentEditableWarning
                    onBlur={(e) => handleHomepageEdit('intro', e.currentTarget.innerText)}
                    className={`text-xs sm:text-sm text-[#4D5358] dark:text-[#DDE1E6] leading-relaxed italic outline-none cursor-text ${
                      isEditable ? 'border border-dashed border-sky-300 rounded p-1.5 bg-sky-50 dark:bg-sky-950/20' : ''
                    }`}
                  >
                    "{copy.homepage.intro}"
                  </p>
                </div>
              </section>

              {/* ----------------- FUNCTIONAL CAPABILITIES SERVICES GRID ----------------- */}
              <section id="services-view" className="py-12 sm:py-16 px-6 sm:px-12 bg-[#F8F9FA] dark:bg-[#1A1C1E] select-text">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-10">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#697077] dark:text-[#A2A9B0] px-2 py-1 bg-[#DDE1E6] dark:bg-[#343A3F] rounded-full">
                      Capabilities Grid
                    </span>
                    <h2 className="text-xl sm:text-3xl font-serif font-black text-[#1A1C1E] dark:text-white mt-3.5">
                      Services & Specialities
                    </h2>
                    <div className="w-12 h-1 bg-[#0052CC] mx-auto mt-3 rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {copy.services.map((service, idx) => {
                      const imgSrc = verticalSettings.services[idx % verticalSettings.services.length];

                      return (
                        <div key={idx} className="bg-white dark:bg-[#202428] rounded-xl border border-[#DDE1E6] dark:border-[#3D444B] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group">
                           {/* Image frame */}
                          <div className="h-32 w-full overflow-hidden relative">
                            <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-[8px] font-extrabold px-2 py-1 rounded-full text-[#FFE066] tracking-widest uppercase border border-white/10 shadow-lg z-10 select-none">
                              From ${idx * 40 + 95}.00
                            </span>
                            <img src={imgSrc} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            
                            <h3 
                              contentEditable={isEditable} 
                              suppressContentEditableWarning
                              onBlur={(e) => handleServiceEdit(idx, 'name', e.currentTarget.innerText)}
                              className={`absolute bottom-3 left-4 right-4 text-xs sm:text-base font-serif font-bold text-white leading-tight outline-none cursor-text ${
                                isEditable ? 'border border-dashed border-sky-400 rounded bg-[#1A1C1E] p-0.5' : ''
                              }`}
                            >
                              {service.name}
                            </h3>
                          </div>

                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <p 
                                contentEditable={isEditable} 
                                suppressContentEditableWarning
                                onBlur={(e) => handleServiceEdit(idx, 'tagline', e.currentTarget.innerText)}
                                className={`text-[9px] font-sans font-black uppercase text-[#0052CC] dark:text-[#4589ff] tracking-widest mb-2 outline-none cursor-text ${
                                  isEditable ? 'border border-dashed border-sky-300 rounded bg-sky-50 dark:bg-sky-950/20 px-1 py-0.5' : ''
                                }`}
                              >
                                {service.tagline}
                              </p>
                              
                              <p 
                                contentEditable={isEditable} 
                                suppressContentEditableWarning
                                onBlur={(e) => handleServiceEdit(idx, 'description', e.currentTarget.innerText)}
                                className={`text-xs text-[#4D5358] dark:text-[#DDE1E6] leading-relaxed outline-none cursor-text mb-4 ${
                                  isEditable ? 'border border-dashed border-sky-300 rounded bg-sky-50 dark:bg-sky-950/20 px-1' : ''
                                }`}
                              >
                                {service.description}
                              </p>
                            </div>

                            {/* Differentiator Sub-card block */}
                            <div className="pt-3 border-t border-[#F2F4F8] dark:border-[#343A3F]">
                              <p className="text-[8px] font-bold text-[#878D96] dark:text-[#697077] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                <Check className="w-2.5 h-2.5 text-[#0052CC] shrink-0" />
                                Why Choice Differentiator
                              </p>
                              <p 
                                contentEditable={isEditable} 
                                suppressContentEditableWarning
                                onBlur={(e) => handleServiceEdit(idx, 'whyUs', e.currentTarget.innerText)}
                                className={`text-[11px] italic font-serif text-[#1D1D20] dark:text-white leading-normal outline-none cursor-text ${
                                  isEditable ? 'border border-dashed border-sky-300 rounded bg-sky-50 dark:bg-sky-950/20 px-1' : ''
                                }`}
                              >
                                "{service.whyUs}"
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* ----------------- UNIQUE SELLING PROPOSITIONS / DIFFERENTIATORS SECTION ----------------- */}
              <section id="why-us-view" className="py-12 sm:py-20 px-6 sm:px-12 bg-white dark:bg-[#1E2225] text-[#1D1D20] dark:text-[#F1F3F5] outline-none border-b border-[#F2F4F8] dark:border-[#2C3238]">
                <div className="max-w-5xl mx-auto select-text">
                  <div className="text-center mb-12">
                    <span className="text-[10px] font-black text-white px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg animate-pulse" style={{ backgroundColor: brand.primary }}>
                      The {inputData?.name?.toUpperCase() || 'BRAND'} EDGE
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-serif font-black mt-6 leading-tight text-[#1A1C1E] dark:text-white tracking-tight">
                      Why We Standardize <span style={{ color: brand.primary }}>Excellence</span>
                    </h2>
                    <p className="text-[11px] sm:text-[13px] text-[#697077] dark:text-[#A2A9B0] mt-3 font-medium max-w-xl mx-auto leading-relaxed">
                      Beyond standard procedures. We integrate high-fidelity logic with artisan focus to deliver results that redefine your market position.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="grid grid-cols-1 gap-6">
                      {/* Render USP 1 */}
                      <div className="relative p-6 sm:p-8 rounded-3xl border border-[#DDE1E6] dark:border-[#2C3238] bg-[#F8F9FA] dark:bg-[#15181B] shadow-sm flex flex-col gap-4 group hover:border-[#0052CC] transition-all duration-500 overflow-hidden">
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#202428] shadow-md border border-[#DDE1E6] dark:border-[#3D444B] flex items-center justify-center text-[#0052CC] shrink-0 font-black font-mono text-sm z-10">
                          01
                        </div>
                        <div className="z-10">
                          <h4 className="font-serif font-black text-sm sm:text-base text-[#1A1C1E] dark:text-white uppercase tracking-tight">
                            {inputData?.uniqueSellingPoints?.[0] || 'Uncompromising Craft'}
                          </h4>
                          <p className="text-[11px] sm:text-[12px] text-[#697077] dark:text-[#A2A9B0] leading-relaxed mt-2.5">
                            Integrating local expertise with detailed content analysis blueprints. Every asset is strategically measured and calibrated for peak resonance.
                          </p>
                        </div>
                      </div>

                      {/* Render USP 2 */}
                      <div className="relative p-6 sm:p-8 rounded-3xl border border-[#DDE1E6] dark:border-[#2C3238] bg-[#F8F9FA] dark:bg-[#15181B] shadow-sm flex flex-col gap-4 group hover:border-[#0052CC] transition-all duration-500 overflow-hidden">
                         <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#202428] shadow-md border border-[#DDE1E6] dark:border-[#3D444B] flex items-center justify-center text-[#28C840] shrink-0 font-black font-mono text-sm z-10">
                          02
                        </div>
                        <div className="z-10">
                          <h4 className="font-serif font-black text-sm sm:text-base text-[#1A1C1E] dark:text-white uppercase tracking-tight">
                            {inputData?.uniqueSellingPoints?.[1] || 'Real ROI Orientation'}
                          </h4>
                          <p className="text-[11px] sm:text-[12px] text-[#697077] dark:text-[#A2A9B0] leading-relaxed mt-2.5">
                            We target the specific target customer profile to guarantee peak copy conversion scores and user actions in {inputData?.city || 'real-time'}.
                          </p>
                        </div>
                      </div>

                      {/* Render USP 3 */}
                      <div className="relative p-6 sm:p-8 rounded-3xl border border-[#DDE1E6] dark:border-[#2C3238] bg-[#F8F9FA] dark:bg-[#15181B] shadow-sm flex flex-col gap-4 group hover:border-[#0052CC] transition-all duration-500 overflow-hidden">
                         <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#202428] shadow-md border border-[#DDE1E6] dark:border-[#3D444B] flex items-center justify-center text-amber-500 shrink-0 font-black font-mono text-sm z-10">
                          03
                        </div>
                        <div className="z-10">
                          <h4 className="font-serif font-black text-sm sm:text-base text-[#1A1C1E] dark:text-white uppercase tracking-tight">
                            {inputData?.uniqueSellingPoints?.[2] || 'Dynamic Local Context'}
                          </h4>
                          <p className="text-[11px] sm:text-[12px] text-[#697077] dark:text-[#A2A9B0] leading-relaxed mt-2.5">
                            Tensioned specifically inside {inputData?.city || 'this city'} with personalized high performance quality that outpaces international competitors.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* NEW: Multi-Image Mosaic for Why Us */}
                    <div className="relative grid grid-cols-2 gap-4 h-full min-h-[400px]">
                      <div className="flex flex-col gap-4">
                        <img 
                          src={verticalSettings.whyUsImages[0]} 
                          alt="Quality Detail" 
                          className="w-full h-1/2 object-cover rounded-3xl shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-500 border border-white/10" 
                        />
                         <img 
                          src={verticalSettings.whyUsImages[1]} 
                          alt="Team focus" 
                          className="w-full h-1/2 object-cover rounded-3xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-white/10" 
                        />
                      </div>
                      <div className="flex flex-col gap-4 pt-8">
                         <img 
                          src={verticalSettings.whyUsImages[2]} 
                          alt="Atmosphere" 
                          className="w-full h-1/2 object-cover rounded-3xl shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-500 border border-white/10" 
                        />
                        <div className="w-full h-1/2 bg-[#0052CC] rounded-3xl p-6 flex flex-col justify-end text-white shadow-xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-4 opacity-10 transform scale-150 group-hover:rotate-12 transition-transform duration-700">
                             <Award className="w-24 h-24" />
                           </div>
                           <h5 className="font-serif italic font-black text-xl leading-tight z-10">Market Leader since 2018</h5>
                           <p className="text-[10px] font-bold uppercase tracking-widest mt-2 z-10 opacity-80">Certified Excellence</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ----------------- INTERACTIVE PHOTO GALLERY FILTER ENGINE (Add More Images!) ----------------- */}
              <section id="gallery-view" className="py-12 sm:py-16 px-6 sm:px-12 bg-[#F8F9FA] dark:bg-[#16181B] border-b border-[#F2F4F8] dark:border-[#2C3238]">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <span className="text-[9px] font-bold text-green-700 bg-green-50 dark:text-green-300 dark:bg-green-950/40 border border-green-200/20 px-3 py-1 rounded-full uppercase tracking-widest">
                      III. Stock Media Repository
                    </span>
                    <h2 className="text-xl sm:text-3xl font-serif font-black mt-3.5 leading-tight text-[#1A1C1E] dark:text-white">
                      Filterable Image Portfolio
                    </h2>
                    <p className="text-[10px] sm:text-[11px] text-[#697077] dark:text-[#A2A9B0] mt-2 font-medium max-w-sm mx-auto">
                      Explore beautiful Unsplash images aligned to the '{inputData?.vertical || 'Modern Workspace'}' vertical. Try applying styling presets!
                    </p>
                    <div className="w-12 h-1 bg-[#0052CC] mx-auto mt-3 rounded-full"></div>
                  </div>

                  {/* Filter controls tab row */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6 bg-white dark:bg-[#1E2225] p-2.5 rounded-xl border border-[#DDE1E6] dark:border-[#2C3238] shadow-xs select-none">
                    {/* Category Filter tabs */}
                    <div className="flex flex-wrap items-center gap-1">
                      {[
                        { id: 'all', label: 'Show All' },
                        { id: 'workspace', label: 'Atmosphere' },
                        { id: 'details', label: 'Close-Ups' },
                        { id: 'people', label: 'In Action' }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedGalleryCategory(cat.id as any)}
                          className={`text-[9px] px-2.5 py-1.5 rounded-md font-bold uppercase tracking-wider transition-all duration-200 ${
                            selectedGalleryCategory === cat.id 
                              ? 'bg-[#0052CC] text-white shadow-xs' 
                              : 'text-[#4D5358] dark:text-[#A2A9B0] hover:bg-[#F1F3F5] dark:hover:bg-[#2A2E33]'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Filter preset effects slider control */}
                    <div className="flex items-center gap-1 bg-[#F1F3F5] dark:bg-[#15181B] p-1 rounded-md border border-[#DDE1E6] dark:border-transparent">
                      <Sliders className="w-3.5 h-3.5 text-[#0052CC] ml-1.5 mr-0.5 shrink-0" />
                      <span className="text-[8px] font-black uppercase text-[#697077] dark:text-[#A2A9B0] mr-2">Color Preset:</span>
                      
                      <div className="flex gap-1">
                        {[
                          { id: 'normal', label: 'RAW' },
                          { id: 'noir', label: 'NOIR' },
                          { id: 'vintage', label: 'SEPIA' },
                          { id: 'cool', label: 'STEEL' },
                          { id: 'pop', label: 'VIVID' }
                        ].map((fx) => (
                          <button
                            key={fx.id}
                            type="button"
                            onClick={() => setSelectedImageFilter(fx.id as any)}
                            className={`text-[8px] px-2 py-0.5 font-bold uppercase rounded border transition-colors ${
                              selectedImageFilter === fx.id 
                                ? 'bg-white dark:bg-[#2C3238] border-zinc-300 dark:border-transparent text-[#0052CC] dark:text-blue-400 shadow-xs' 
                                : 'border-transparent text-gray-400 hover:text-[#1A1C1E] dark:hover:text-white'
                            }`}
                          >
                            {fx.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Grid of cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {portfolioImages
                      .filter(img => selectedGalleryCategory === 'all' || img.category === selectedGalleryCategory)
                      .map((img) => {
                        const presetClasses = {
                          normal: '',
                          noir: 'grayscale contrast-[1.25] brightness-95',
                          vintage: 'sepia contrast-[0.95] saturate-[1.6] brightness-95',
                          cool: 'hue-rotate-[180deg] saturate-[1.1] brightness-[1.05]',
                          pop: 'saturate-[2.1] contrast-[1.15]'
                        }[selectedImageFilter];

                        return (
                          <div 
                            key={img.id}
                            onClick={() => {
                              setSelectedLightboxImage(img.url);
                              setSelectedLightboxTitle(img.title);
                            }}
                            className="group bg-white dark:bg-[#1E2225] border border-[#DDE1E6] dark:border-[#2C3238] rounded-xl overflow-hidden cursor-zoom-in relative aspect-square shadow-xs transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                          >
                            <div className="w-full h-full overflow-hidden relative">
                              <img 
                                src={img.url} 
                                alt={img.title}
                                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${presetClasses}`}
                              />
                              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 z-10 text-white">
                                <div className="self-end bg-black/55 backdrop-blur-md p-1 rounded-full text-white">
                                  <ZoomIn className="w-3.5 h-3.5" />
                                </div>
                                <div className="text-left">
                                  <span className="text-[7px] font-mono uppercase tracking-widest text-emerald-400 block mb-0.5">{img.category}</span>
                                  <h4 className="text-[10px] font-bold font-serif leading-tight text-white line-clamp-1">{img.title}</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* GALLERY LIGHTBOX POPULAR MODAL */}
                  {selectedLightboxImage && (
                    <div className="absolute inset-0 bg-black/95 dark:bg-black/98 backdrop-blur-md z-50 flex flex-col justify-center items-center p-6 animate-fade-in select-none">
                      <button 
                        onClick={() => setSelectedLightboxImage(null)}
                        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 border border-white/20 transition-transform hover:scale-105"
                        title="Close Overlay"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      
                      <div className="max-w-xl w-full flex flex-col gap-3">
                        <div className="aspect-4/3 sm:aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl relative">
                          <img 
                            src={selectedLightboxImage} 
                            alt={selectedLightboxTitle} 
                            className={`w-full h-full object-cover border border-transparent ${{
                              normal: '',
                              noir: 'grayscale contrast-[1.25] brightness-95',
                              vintage: 'sepia contrast-[0.95] saturate-[1.6] brightness-95',
                              cool: 'hue-rotate-[180deg] saturate-[1.1] brightness-[1.05]',
                              pop: 'saturate-[2.1] contrast-[1.15]'
                            }[selectedImageFilter]}`}
                          />
                        </div>
                        <div className="text-left px-1 mt-1 text-white">
                          <span className="text-[8px] uppercase tracking-widest font-bold text-sky-400">Cinematic Capture Matrix</span>
                          <h3 className="font-serif font-bold text-[#F8F9FA] text-base leading-snug">{selectedLightboxTitle}</h3>
                          <p className="text-[10px] sm:text-[11px] text-gray-400 leading-relaxed mt-1">
                            Optimized utilizing standard visual dimensions, custom filter calibrations, and responsive bounds sizing coordinates.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* ----------------- INTERACTIVE CONSULTATION PRICE ESTIMATOR ----------------- */}
              <section id="estimator-view" className="py-12 sm:py-16 px-6 sm:px-12 bg-white dark:bg-[#1E2225] text-[#1D1D20] dark:text-[#F1F3F5] border-b border-[#F2F4F8] dark:border-[#2C3238]">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-10 select-text">
                    <span className="text-[9px] font-bold text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-950/40 border border-blue-200/20 px-3 py-1 rounded-full uppercase tracking-widest">
                      IV. Consultation Pricing Estimator
                    </span>
                    <h2 className="text-xl sm:text-3xl font-serif font-black mt-3.5 leading-tight text-[#1A1C1E] dark:text-white">
                      Customize Your Plan & Rates
                    </h2>
                    <p className="text-[10px] sm:text-[11px] text-[#697077] dark:text-[#A2A9B0] mt-1.5 font-medium max-w-sm mx-auto">
                      Dynamic checkout simulator computes estimated rates in real-time. Pick specific features below to craft your quote.
                    </p>
                    <div className="w-12 h-1 bg-[#0052CC] mx-auto mt-3 rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
                    {/* Calculator parameter controls */}
                    <div className="md:col-span-7 flex flex-col gap-5 bg-[#F8F9FA] dark:bg-[#15181B] border border-[#DDE1E6] dark:border-[#2C3238] rounded-2xl p-5 shadow-xs select-none">
                      {/* Step A: Check services checkboxes */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase text-[#697077] dark:text-[#A2A9B0] tracking-wider flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0052CC]" /> Select Included Focus Modules
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                          {(inputData?.services && inputData.services.length > 0 ? inputData.services : ['Service Core Option', 'Alternative Focus Delivery', 'Integrated Audits']).map((serv) => {
                            const isChecked = estimatorServices.includes(serv);
                            return (
                              <button
                                key={serv}
                                type="button"
                                onClick={() => {
                                  if (isChecked) {
                                    setEstimatorServices(estimatorServices.filter(s => s !== serv));
                                  } else {
                                    setEstimatorServices([...estimatorServices, serv]);
                                  }
                                }}
                                className={`p-2.5 rounded-lg border text-[10px] font-bold text-left transition-all duration-200 flex items-center gap-2 ${
                                  isChecked 
                                    ? 'bg-[#EAF5FF] border-[#0052CC] dark:bg-sky-950/30 text-[#0052CC] dark:text-[#4589ff] font-extrabold shadow-xs' 
                                    : 'bg-white dark:bg-[#1E2225] border-zinc-200 dark:border-zinc-800 text-[#4D5358] dark:text-zinc-400 hover:border-[#0052CC]'
                                }`}
                              >
                                {isChecked ? <Check className="w-3.5 h-3.5 text-[#0052CC] shrink-0" /> : <div className="w-3.5 h-3.5 rounded border border-gray-300 dark:border-gray-600 shrink-0"></div>}
                                <span className="line-clamp-1 text-[10px]">{serv}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step B: Select service tier */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase text-[#697077] dark:text-[#A2A9B0] tracking-wider flex items-center gap-1">
                          <Sliders className="w-3.5 h-3.5 text-[#0052CC]" /> Package Scale Tier
                        </label>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          {[
                            { id: 'starter', label: 'Bronze Core', desc: 'Direct deployment' },
                            { id: 'growth', label: 'Silver Growth', desc: 'Detailed support' },
                            { id: 'pro', label: 'Gold Pro Elite', desc: 'Prestige priority' }
                          ].map((tier) => (
                            <button
                              key={tier.id}
                              type="button"
                              onClick={() => setEstimatorPackageTier(tier.id as any)}
                              className={`p-2 rounded-lg border flex flex-col items-center justify-center text-center transition-all ${
                                estimatorPackageTier === tier.id 
                                  ? 'bg-[#0052CC] text-white border-[#0052CC] font-bold shadow-sm' 
                                  : 'bg-white dark:bg-[#1E2225] border-zinc-200 dark:border-[#2C3238] text-[#4D5358] dark:text-zinc-400 hover:bg-[#F2F4F8]'
                              }`}
                            >
                              <span className="text-[10px] font-black uppercase tracking-wider">{tier.label}</span>
                              <span className={`text-[7px] block font-medium opacity-80 mt-0.5 ${estimatorPackageTier === tier.id ? 'text-white' : 'text-gray-500'}`}>{tier.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Step C: Toggle Urgency */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase text-[#697077] dark:text-[#A2A9B0] tracking-wider flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-[#0052CC]" /> Urgency & Timeline Speed
                        </label>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          {[
                            { mult: 1.0, note: 'Standard 2-3 Weeks', label: 'Regular Span' },
                            { mult: 1.3, note: 'Expedited 5 Days', label: 'Expedited Rush' },
                            { mult: 1.6, note: 'Next-Day Sprint', label: 'Extreme Sprints' }
                          ].map((u) => (
                            <button
                              key={u.note}
                              type="button"
                              onClick={() => {
                                setEstimatorUrgencyMultiplier(u.mult);
                                setEstimatorSelectedNote(u.note);
                              }}
                              className={`p-1.5 rounded-lg border text-center transition-all ${
                                estimatorUrgencyMultiplier === u.mult 
                                  ? 'bg-[#E5F9EA] border-[#2EC843] text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300 font-extrabold shadow-xs' 
                                  : 'bg-white dark:bg-[#1E2225] border-zinc-200 dark:border-[#2C3238] text-[#4D5358] dark:text-zinc-400 hover:border-[#2EC843]'
                              }`}
                            >
                              <span className="text-[8px] font-bold tracking-wider uppercase block">{u.label}</span>
                              <span className="text-[7px] text-gray-500 block font-semibold mt-0.5">{u.mult}x factor</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Invoice Receipt Mockup */}
                    <div className="md:col-span-5 flex flex-col bg-[#F8F9FA] dark:bg-[#15181B] border border-amber-200/30 dark:border-amber-950/10 rounded-2xl overflow-hidden shadow-sm self-stretch select-text">
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border-b border-amber-200/20 text-amber-800 dark:text-amber-300 text-[9px] font-extrabold uppercase tracking-widest text-center flex items-center justify-center gap-1 select-none">
                        <BadgeCheck className="w-3.5 h-3.5 text-amber-600 animate-pulse animate-pulse" /> Estimated Quote Projections
                      </div>
                      
                      <div className="p-5 flex-1 flex flex-col justify-between font-mono text-[9px] text-[#4D5358] dark:text-zinc-400 leading-relaxed">
                        <div className="space-y-3.5">
                          {/* Invoice header */}
                          <div className="flex justify-between border-b border-dashed pb-2 border-zinc-200 dark:border-zinc-800">
                            <div>
                              <p className="font-bold text-[#1A1C1E] dark:text-white uppercase font-serif">QUOTE MATRIX_X</p>
                              <p className="text-[7px] text-blue-500 font-bold">CLIENT: {inputData?.name?.toUpperCase() || 'BRAND'}</p>
                            </div>
                            <span className="text-right uppercase">DATE: {new Date().toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
                          </div>

                          {/* Items iteration */}
                          <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
                            <div className="flex justify-between font-bold">
                              <span>BASE BLUEPRINT FOCUS</span>
                              <span>$350.00</span>
                            </div>
                            
                            {estimatorServices.map((s, i) => (
                              <div key={i} className="flex justify-between pl-2">
                                <span className="line-clamp-1">+ {s}</span>
                                <span>$125.00</span>
                              </div>
                            ))}
                            
                            {estimatorPackageTier !== 'starter' && (
                              <div className="flex justify-between">
                                <span className="uppercase">+ {estimatorPackageTier} Tier Surcharge</span>
                                <span>{estimatorPackageTier === 'growth' ? '$150.00' : '$400.00'}</span>
                              </div>
                            )}

                            {estimatorUrgencyMultiplier > 1.0 && (
                              <div className="flex justify-between text-red-500 font-bold">
                                <span>+ TIMELINE EXPEDITION ({estimatorUrgencyMultiplier}x)</span>
                                <span>+{Math.round((estimatorUrgencyMultiplier - 1.0) * 100)}%</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Summary Block */}
                        <div className="pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800 mt-5">
                          <div className="flex items-center justify-between font-serif text-[#1D1D20] dark:text-white pb-3 select-none">
                            <span className="text-[12px] font-black uppercase tracking-tight">Estimated Total:</span>
                            <span className="text-base font-extrabold text-[#0052CC] dark:text-blue-400">${estimatorPriceResult}.00 *</span>
                          </div>
                          
                          <p className="text-[7px] italic text-zinc-400 text-center leading-normal mb-4 select-none">
                            * Pricing estimation comprises a simulated workspace model. Final quotes mapped upon full contract creative briefings.
                          </p>

                          <button 
                            onClick={handleApplyEstimateToForm}
                            className="w-full py-2 bg-[#0052CC] hover:bg-[#0042A3] hover:shadow transition-all text-white text-[9px] uppercase font-bold tracking-widest rounded flex items-center justify-center gap-1 select-none cursor-pointer"
                          >
                            Lock in Estimate & Book <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ----------------- INTERACTIVE REVIEW CAROUSEL SECTION ----------------- */}
              <section id="testimonials-view" className="py-12 sm:py-16 px-6 sm:px-12 bg-white dark:bg-[#15181B] border-b border-[#F2F4F8] dark:border-[#2C3238]">
                <div className="max-w-xl mx-auto select-none">
                  <div className="text-center mb-8 select-text">
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-950/40 border border-amber-200/20 px-3 py-1 rounded-full uppercase tracking-widest">
                      V. Client Reviews
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-black mt-3.5 leading-tight text-[#1A1C1E] dark:text-white">
                      Endorsed by Fast Growing Brands
                    </h2>
                    <div className="w-12 h-1 bg-[#0052CC] mx-auto mt-3 rounded-full"></div>
                  </div>

                  {/* Testimonial Active Display Slide */}
                  <div className="bg-[#F8F9FA] dark:bg-[#1E2225] p-6 rounded-2xl border border-[#DDE1E6] dark:border-[#2C3238] shadow-xs relative overflow-hidden transition-all duration-300 text-left">
                    <div className="absolute top-3 right-4 opacity-5 dark:opacity-15 font-serif text-8xl text-zinc-400 select-none leading-none pointer-events-none">
                      "
                    </div>

                    <div className="flex flex-col gap-4 relative z-10">
                      {/* Rating stars */}
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm italic leading-relaxed text-[#4D5358] dark:text-[#DDE1E6] font-serif select-text">
                        "{testimonials[currentTestimonialIndex].quote}"
                      </p>

                      <div className="flex items-center justify-between border-t border-zinc-200 dark:border-[#2C3238] pt-4 mt-1.5 select-text">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={testimonials[currentTestimonialIndex].avatar} 
                            alt={testimonials[currentTestimonialIndex].author} 
                            className="w-8 h-8 rounded-full object-cover border border-white/20 select-none shrink-0"
                          />
                          <div>
                            <h5 className="font-serif font-bold text-[11px] text-[#1A1C1E] dark:text-white leading-none">{testimonials[currentTestimonialIndex].author}</h5>
                            <p className="text-[9px] text-[#697077] dark:text-[#A2A9B0] mt-1">{testimonials[currentTestimonialIndex].role}</p>
                          </div>
                        </div>

                        {/* Arrow Nav sliders */}
                        <div className="flex items-center gap-1.5 select-none">
                          <button
                            type="button"
                            onClick={() => setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                            className="w-6 h-6 rounded-full border border-zinc-200 dark:border-[#2C3238] bg-white dark:bg-[#1E2225] hover:bg-zinc-100 dark:hover:bg-[#15181B] flex items-center justify-center transition-colors text-[#4D5358] dark:text-[#DDE1E6] cursor-pointer"
                            title="Previous Review"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[8px] font-mono text-zinc-500">{currentTestimonialIndex + 1}/{testimonials.length}</span>
                          <button
                            type="button"
                            onClick={() => setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
                            className="w-6 h-6 rounded-full border border-zinc-200 dark:border-[#2C3238] bg-white dark:bg-[#1E2225] hover:bg-zinc-100 dark:hover:bg-[#15181B] flex items-center justify-center transition-colors text-[#4D5358] dark:text-[#DDE1E6] cursor-pointer"
                            title="Next Review"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ----------------- MODERN LEAD & BOOSTER CONVERSION HOOKS ----------------- */}
              <section id="booking-view" className="py-12 sm:py-16 px-6 sm:px-12 bg-[#F8F9FA] dark:bg-[#16181B] relative overflow-hidden select-text border-b border-[#F2F4F8] dark:border-[#2C3238]">
                <div className="absolute top-0 right-0 p-8 opacity-[0.02] dark:opacity-5 pointer-events-none">
                  <Star className="w-48 h-48 text-[#0052CC]" />
                </div>

                <div className="max-w-xl mx-auto flex flex-col items-center text-center relative z-10 font-sans">
                  <span className="text-[9px] text-[#28C840] font-bold px-2.5 py-0.5 rounded-full bg-[#E5F9EA] dark:bg-[#1B3824] uppercase tracking-widest mb-3 flex items-center gap-1 select-none">
                    <CheckCircle className="w-2.5 h-2.5 text-[#28C840]" />
                    {copy.cta.trust || 'Trust Verified'}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-serif font-black text-[#1A1C1E] dark:text-white leading-tight mb-3">
                    Submit Project Reservation
                  </h3>
                  
                  <p 
                    contentEditable={isEditable} 
                    suppressContentEditableWarning
                    onBlur={(e) => handleCTAEdit('supporting', e.currentTarget.innerText)}
                    className={`text-xs sm:text-sm text-[#4D5358] dark:text-[#A2A9B0] mb-8 leading-relaxed max-w-sm outline-none cursor-text ${
                      isEditable ? 'border border-dashed border-sky-300 rounded bg-sky-50 dark:bg-sky-950/20 p-1' : ''
                    }`}
                  >
                    {copy.cta.supporting}
                  </p>

                  {/* ACTUAL INTERACTIVE BOOKING LEAD SHELL */}
                  {leadSent ? (
                    <div className="w-full bg-[#E5F9EA] dark:bg-[#1D3224]/50 border border-[#28C840]/30 rounded-xl p-6 text-center text-[#28C840] flex flex-col items-center justify-center animate-fade-in mb-8">
                      <CheckCircle className="w-10 h-10 mb-2.5 animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-wider">Inquiry Submitted Successfully!</span>
                      <p className="text-[10px] text-[#4D5358] dark:text-[#A2A9B0] mt-1.5 leading-relaxed">
                        Thank you for your briefing! We noted your dynamic timeline preference ({estimatorSelectedNote}) and estimated price target of <strong>${estimatorPriceResult}.00</strong>. We will respond within 4 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="w-full bg-white dark:bg-[#1E2225] rounded-xl border border-[#DDE1E6] dark:border-[#2C3238] p-5 sm:p-6 mb-8 text-left shadow-sm">
                      <div className="flex flex-col gap-3.5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-bold text-[#697077] dark:text-[#A2A9B0] uppercase tracking-wider">Full Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="John Doe" 
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            className="bg-[#F8F9FA] dark:bg-[#15181B] border border-[#DDE1E6] dark:border-[#2C3238] rounded p-2 text-xs focus:ring-1 focus:ring-[#0052CC] focus:outline-none dark:text-white"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-bold text-[#697077] dark:text-[#A2A9B0] uppercase tracking-wider">Email Address</label>
                          <input 
                            type="email" 
                            required
                            placeholder="johndoe@gmail.com" 
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            className="bg-[#F8F9FA] dark:bg-[#15181B] border border-[#DDE1E6] dark:border-[#2C3238] rounded p-2 text-xs focus:ring-1 focus:ring-[#0052CC] focus:outline-none dark:text-white"
                          />
                        </div>

                        {/* Prefilled Estimate Quote status block */}
                        <div className="bg-[#EAF5FF] dark:bg-sky-950/20 rounded-md border border-sky-100 dark:border-sky-900/30 p-2.5 flex justify-between items-center text-[10px]">
                          <span className="font-extrabold text-[#0052CC] uppercase">Plan Estimate quote:</span>
                          <span className="font-mono font-black text-[#1D1D20] dark:text-white">${estimatorPriceResult}.00 ({estimatorSelectedNote})</span>
                        </div>
                        
                        <button 
                          className="w-full py-2.5 text-xs text-white uppercase font-bold tracking-wider rounded transition-colors text-center shadow-xs flex items-center justify-center gap-1.5 hover:opacity-90 cursor-pointer"
                          style={{ backgroundColor: brand.primary }}
                          type="submit"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span 
                            contentEditable={isEditable}
                            suppressContentEditableWarning
                            onBlur={(e) => handleCTAEdit('primary', e.currentTarget.innerText)}
                            onClick={(e) => e.stopPropagation()}
                            className={isEditable ? 'border border-dashed border-white px-1' : ''}
                          >
                            {copy.cta.primary}
                          </span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* URGENCY VALUE BANNER */}
                  <div className="inline-flex items-center gap-2 rounded bg-red-50 dark:bg-rose-950/20 border border-red-100 dark:border-rose-900/30 px-3.5 py-1.5 text-[10px] font-semibold text-rose-600 dark:text-rose-400 select-none">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
                    <span 
                      contentEditable={isEditable}
                      suppressContentEditableWarning
                      onBlur={(e) => handleCTAEdit('urgency', e.currentTarget.innerText)}
                      className={isEditable ? 'border border-dashed border-red-500 rounded px-1' : ''}
                    >
                      {copy.cta.urgency}
                    </span>
                  </div>
                </div>
              </section>

              {/* ----------------- MINIMALIST FOOTER SECTION ----------------- */}
              <footer className="bg-[#15181B] py-8 border-t border-[#2C3238] text-center select-none mt-auto">
                <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-400 font-medium uppercase tracking-widest leading-none font-sans">
                  <span className="font-serif italic font-black text-gray-300 lowercase">{inputData?.name?.toLowerCase() || 'brand'}</span>
                  <span>&copy; {new Date().getFullYear()} {inputData?.name || 'Brand LLC'}. ALL RIGHTS RESERVED</span>
                </div>
              </footer>

            </div>
          </div>
        ) : (
          /* OTHERWISE RENDER ORIGINAL COPY OUTLINE CARD VIEWS */
          <div className="flex flex-col gap-3">
            <SectionCard 
              id="homepage" 
              title="1. Core Typography Engine" 
              textToCopy={`# ${copy.homepage.headline}\n\n${copy.homepage.subheadline}\n\n${copy.homepage.intro}`}
            >
              <div className="flex flex-col gap-0 overflow-hidden rounded-xl border border-[#DDE1E6] dark:border-[#343A3F] group relative" contentEditable suppressContentEditableWarning>
                <div className="w-full h-56 sm:h-72 relative bg-[#E8EAED] dark:bg-[#121619] overflow-hidden" contentEditable={false}>
                  <img 
                    key={heroImageIndex}
                    src={verticalSettings.hero[heroImageIndex]} 
                    alt="Hero background" 
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
                  
                  <button 
                    onClick={cycleHeroImage}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors z-20 border border-white/20"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Change Image
                  </button>
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded border border-white/20 opacity-80 z-20">
                    Image {heroImageIndex + 1} of {verticalSettings.hero.length}
                  </div>
                </div>
                
                <div className="relative -mt-32 sm:-mt-40 px-6 sm:px-8 z-10 pb-6 sm:pb-8 flex flex-col items-start text-left">
                  <div className="w-full max-w-3xl mb-8">
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight mb-4 drop-shadow-lg outline-none">
                      {copy.homepage.headline}
                    </h1>
                    <p className="text-sm sm:text-lg font-sans text-white/90 leading-relaxed drop-shadow-md outline-none">
                      {copy.homepage.subheadline}
                    </p>
                  </div>
                  
                  <div className="w-full bg-white/95 dark:bg-[#1A1C1E]/95 backdrop-blur-xl rounded-xl p-6 sm:p-8 border border-white/20 dark:border-[#343A3F] shadow-xl">
                    <div className="flex items-center gap-3 mb-4" contentEditable={false}>
                      <div className="w-8 h-[2px] bg-[#0052CC] dark:bg-[#4589ff]"></div>
                      <h4 className="text-[10px] font-bold text-[#0052CC] dark:text-[#4589ff] uppercase tracking-widest">Introduction</h4>
                    </div>
                    <p className="text-sm sm:text-base font-sans text-[#4D5358] dark:text-[#DDE1E6] leading-relaxed outline-none">
                      {copy.homepage.intro}
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard 
              id="services" 
              title="2. Capability Matrix"
              textToCopy={copy.services.map(s => `### ${s.name}\n**${s.tagline}**\n${s.description}\n*Why Us: ${s.whyUs}*`).join('\n\n')}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-sans" contentEditable suppressContentEditableWarning>
                {copy.services.map((service, idx) => {
                  const imgSrc = verticalSettings.services[idx % verticalSettings.services.length];

                  return (
                    <div key={idx} className="bg-[#F8F9FA] dark:bg-[#1A1C1E] border border-[#DDE1E6] dark:border-[#343A3F] rounded-xl flex flex-col outline-none cursor-text shadow-sm hover:border-[#0052CC] dark:hover:border-[#4589ff] transition-colors hover:shadow-md overflow-hidden group">
                      <div className="relative h-32 w-full overflow-hidden" contentEditable={false}>
                        <img src={imgSrc} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <h3 className="absolute bottom-3 left-4 right-4 text-lg font-serif font-bold text-white drop-shadow-md leading-tight outline-none">{service.name}</h3>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <p className="text-[10px] font-sans font-bold uppercase text-[#0052CC] dark:text-[#4589ff] mb-2 tracking-widest leading-normal outline-none">{service.tagline}</p>
                        <p className="text-sm text-[#4D5358] dark:text-[#A2A9B0] leading-relaxed flex-1 mb-4 outline-none">{service.description}</p>
                        <div className="pt-4 border-t border-[#DDE1E6] dark:border-[#343A3F]">
                          <p className="text-[9px] font-bold text-[#878D96] dark:text-[#697077] uppercase tracking-wider mb-1.5 flex items-center gap-1"><Check className="w-3 h-3 text-[#0052CC]" /> Differentiator</p>
                          <p className="text-sm italic font-serif text-[#1A1C1E] dark:text-[#DDE1E6] leading-snug outline-none">"{service.whyUs}"</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard 
              id="cta" 
              title="3. Conversion Hooks"
              textToCopy={`Primary: ${copy.cta.primary}\nSupporting: ${copy.cta.supporting}\nUrgency: ${copy.cta.urgency}\nTrust: ${copy.cta.trust}`}
            >
              <div className="flex flex-col outline-none overflow-hidden rounded-xl border border-[#DDE1E6] dark:border-[#343A3F] shadow-sm relative font-sans" contentEditable suppressContentEditableWarning>
                <div className="absolute inset-0 z-0 bg-[#0052CC] dark:bg-[#003B99] opacity-5"></div>
                <div className="relative z-10 flex flex-col items-center py-12 px-6 sm:px-12 text-center items-center justify-center">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1C1E] dark:text-[#F1F3F5] mb-3 leading-tight max-w-lg outline-none">
                    Ready to take the next step?
                  </h2>
                  <p className="text-sm sm:text-base font-sans text-[#4D5358] dark:text-[#A2A9B0] mb-8 max-w-md leading-relaxed outline-none">
                    {copy.cta.supporting}
                  </p>
                  
                  <button className="px-8 py-3.5 bg-[#0052CC] hover:bg-[#003B99] text-white text-sm font-sans font-bold uppercase tracking-widest rounded shadow-lg pointer-events-none mb-8 transition-colors flex items-center justify-center gap-2">
                    {copy.cta.primary} <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div className="bg-white/80 dark:bg-[#1A1C1E]/80 backdrop-blur p-4 rounded-lg border border-[#FFD6D6] dark:border-[#5C3333] cursor-text transition-colors shadow-sm relative overflow-hidden group hover:border-[#FF5F57]">
                      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-125 transition-transform"><Check className="w-8 h-8 text-[#FF5F57]" /></div>
                      <span className="text-[10px] font-bold text-[#FF5F57] uppercase tracking-wider mb-2 block flex items-center gap-1.5 relative z-10">Urgency Factor</span>
                      <p className="text-xs font-sans text-[#4D5358] dark:text-[#DDE1E6] leading-relaxed relative z-10 outline-none">{copy.cta.urgency}</p>
                    </div>
                    <div className="bg-white/80 dark:bg-[#1A1C1E]/80 backdrop-blur p-4 rounded-lg border border-[#C6F6D5] dark:border-[#335C41] cursor-text transition-colors shadow-sm relative overflow-hidden group hover:border-[#28C840]">
                      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-125 transition-transform"><Check className="w-8 h-8 text-[#28C840]" /></div>
                      <span className="text-[10px] font-bold text-[#28C840] uppercase tracking-wider mb-2 block flex items-center gap-1.5 relative z-10">Trust Metric</span>
                      <p className="text-xs font-sans text-[#4D5358] dark:text-[#DDE1E6] leading-relaxed relative z-10 outline-none">{copy.cta.trust}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        )}
      </div>
    </div>
  );
}
