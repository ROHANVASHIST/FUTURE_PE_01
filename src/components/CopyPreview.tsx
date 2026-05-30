import React, { useState } from 'react';
import { GeneratedCopy, BusinessInput } from '../lib/schemas/copy-schema';
import { Copy, Check, ChevronDown, ChevronRight, RefreshCw, Loader2 } from 'lucide-react';

interface Props {
  copy: GeneratedCopy;
  inputData: BusinessInput | null;
  onUpdateCopy: (updatedSection: any, sectionName: string) => void;
}

export default function CopyPreview({ copy, inputData, onUpdateCopy }: Props) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
  ];

  const cycleHeroImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

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
      // We could add UI error handling here, but for now we'll just log it
    } finally {
      setRegeneratingSection(null);
    }
  };

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

  return (
    <div className="flex flex-col gap-3 h-full">
      <SectionCard 
        id="homepage" 
        title="1. Core Typography Engine" 
        textToCopy={`# ${copy.homepage.headline}\n\n${copy.homepage.subheadline}\n\n${copy.homepage.intro}`}
      >
        <div className="flex flex-col gap-0 overflow-hidden rounded-xl border border-[#DDE1E6] dark:border-[#343A3F] group relative" contentEditable suppressContentEditableWarning>
          <div className="w-full h-56 sm:h-72 relative bg-[#E8EAED] dark:bg-[#121619] overflow-hidden" contentEditable={false}>
            <img 
              key={heroImageIndex} /* Force re-render for transition if needed */
              src={heroImages[heroImageIndex]} 
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
              Image {heroImageIndex + 1} of {heroImages.length}
            </div>
          </div>
          
          <div className="relative -mt-32 sm:-mt-40 px-6 sm:px-8 z-10 pb-6 sm:pb-8 flex flex-col items-start text-left">
            <div className="w-full max-w-3xl mb-8">
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight mb-4 drop-shadow-lg">
                {copy.homepage.headline}
              </h1>
              <p className="text-sm sm:text-lg font-sans text-white/90 leading-relaxed drop-shadow-md">
                {copy.homepage.subheadline}
              </p>
            </div>
            
            <div className="w-full bg-white/95 dark:bg-[#1A1C1E]/95 backdrop-blur-xl rounded-xl p-6 sm:p-8 border border-white/20 dark:border-[#343A3F] shadow-xl">
              <div className="flex items-center gap-3 mb-4" contentEditable={false}>
                <div className="w-8 h-[2px] bg-[#0052CC] dark:bg-[#4589ff]"></div>
                <h4 className="text-[10px] font-bold text-[#0052CC] dark:text-[#4589ff] uppercase tracking-widest">Introduction</h4>
              </div>
              <p className="text-sm sm:text-base font-sans text-[#4D5358] dark:text-[#DDE1E6] leading-relaxed">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" contentEditable suppressContentEditableWarning>
          {copy.services.map((service, idx) => {
            const serviceImages = [
              "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop"
            ];
            const imgSrc = serviceImages[idx % serviceImages.length];

            return (
              <div key={idx} className="bg-[#F8F9FA] dark:bg-[#1A1C1E] border border-[#DDE1E6] dark:border-[#343A3F] rounded-xl flex flex-col outline-none cursor-text shadow-sm hover:border-[#0052CC] dark:hover:border-[#4589ff] transition-colors hover:shadow-md overflow-hidden group">
                <div className="relative h-32 w-full overflow-hidden" contentEditable={false}>
                  <img src={imgSrc} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-3 left-4 right-4 text-lg font-serif font-bold text-white drop-shadow-md leading-tight">{service.name}</h3>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[10px] font-sans font-bold uppercase text-[#0052CC] dark:text-[#4589ff] mb-2 tracking-widest leading-normal">{service.tagline}</p>
                  <p className="text-sm text-[#4D5358] dark:text-[#A2A9B0] leading-relaxed flex-1 mb-4">{service.description}</p>
                  <div className="pt-4 border-t border-[#DDE1E6] dark:border-[#343A3F]">
                    <p className="text-[9px] font-bold text-[#878D96] dark:text-[#697077] uppercase tracking-wider mb-1.5 flex items-center gap-1"><Check className="w-3 h-3 text-[#0052CC]" /> Differentiator</p>
                    <p className="text-sm italic font-serif text-[#1A1C1E] dark:text-[#DDE1E6] leading-snug">"{service.whyUs}"</p>
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
        <div className="flex flex-col outline-none overflow-hidden rounded-xl border border-[#DDE1E6] dark:border-[#343A3F] shadow-sm relative" contentEditable suppressContentEditableWarning>
          <div className="absolute inset-0 z-0 bg-[#0052CC] dark:bg-[#003B99] opacity-5"></div>
          <div className="relative z-10 flex flex-col items-center py-12 px-6 sm:px-12 text-center items-center justify-center">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1C1E] dark:text-[#F1F3F5] mb-3 leading-tight max-w-lg">
              Ready to take the next step?
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#4D5358] dark:text-[#A2A9B0] mb-8 max-w-md leading-relaxed">
              {copy.cta.supporting}
            </p>
            
            <button className="px-8 py-3.5 bg-[#0052CC] hover:bg-[#003B99] text-white text-sm font-sans font-bold uppercase tracking-widest rounded shadow-lg pointer-events-none mb-8 transition-colors flex items-center justify-center gap-2">
              {copy.cta.primary} <ChevronRight className="w-4 h-4" />
            </button>
            
            <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="bg-white/80 dark:bg-[#1A1C1E]/80 backdrop-blur p-4 rounded-lg border border-[#FFD6D6] dark:border-[#5C3333] cursor-text transition-colors shadow-sm relative overflow-hidden group hover:border-[#FF5F57]">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-125 transition-transform"><Check className="w-8 h-8 text-[#FF5F57]" /></div>
                <span className="text-[10px] font-bold text-[#FF5F57] uppercase tracking-wider mb-2 block flex items-center gap-1.5 relative z-10">Urgency Factor</span>
                <p className="text-xs font-sans text-[#4D5358] dark:text-[#DDE1E6] leading-relaxed relative z-10">{copy.cta.urgency}</p>
              </div>
              <div className="bg-white/80 dark:bg-[#1A1C1E]/80 backdrop-blur p-4 rounded-lg border border-[#C6F6D5] dark:border-[#335C41] cursor-text transition-colors shadow-sm relative overflow-hidden group hover:border-[#28C840]">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-125 transition-transform"><Check className="w-8 h-8 text-[#28C840]" /></div>
                <span className="text-[10px] font-bold text-[#28C840] uppercase tracking-wider mb-2 block flex items-center gap-1.5 relative z-10">Trust Metric</span>
                <p className="text-xs font-sans text-[#4D5358] dark:text-[#DDE1E6] leading-relaxed relative z-10">{copy.cta.trust}</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
