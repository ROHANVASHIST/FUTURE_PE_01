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
        <div className="flex flex-col gap-6" contentEditable suppressContentEditableWarning>
          <div className="text-center py-4">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#121619] dark:text-[#F1F3F5] leading-tight outline-none mb-4">
              {copy.homepage.headline}
            </h1>
            <p className="text-lg font-sans text-[#4D5358] dark:text-[#DDE1E6] max-w-xl mx-auto leading-relaxed outline-none">
              {copy.homepage.subheadline}
            </p>
          </div>
          <div className="border-t border-[#DDE1E6] dark:border-[#343A3F] pt-6 mt-2">
            <h4 className="text-[10px] font-bold text-[#0052CC] dark:text-[#4589ff] uppercase mb-3 tracking-widest">Introduction Story</h4>
            <p className="text-sm font-sans text-[#1A1C1E] dark:text-[#DDE1E6] leading-relaxed outline-none max-w-3xl">
              {copy.homepage.intro}
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard 
        id="services" 
        title="2. Capability Matrix"
        textToCopy={copy.services.map(s => `### ${s.name}\n**${s.tagline}**\n${s.description}\n*Why Us: ${s.whyUs}*`).join('\n\n')}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" contentEditable suppressContentEditableWarning>
          {copy.services.map((service, idx) => (
            <div key={idx} className="p-5 bg-[#F8F9FA] dark:bg-[#1A1C1E] border border-[#DDE1E6] dark:border-[#343A3F] rounded-xl flex flex-col outline-none cursor-text shadow-sm hover:border-[#0052CC] dark:hover:border-[#4589ff] transition-colors hover:shadow-md">
              <h3 className="text-lg font-serif font-bold text-[#1A1C1E] dark:text-[#F1F3F5]">{service.name}</h3>
              <p className="text-[11px] font-sans font-bold uppercase text-[#0052CC] dark:text-[#4589ff] mt-1 mb-3 tracking-widest">{service.tagline}</p>
              <p className="text-sm text-[#4D5358] dark:text-[#A2A9B0] leading-relaxed flex-1">{service.description}</p>
              <div className="mt-4 pt-4 border-t border-[#DDE1E6] dark:border-[#343A3F]">
                <p className="text-[9px] font-bold text-[#878D96] dark:text-[#697077] uppercase tracking-wider mb-1.5">Differentiator</p>
                <p className="text-sm italic font-serif text-[#1A1C1E] dark:text-[#DDE1E6] leading-snug">"{service.whyUs}"</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard 
        id="cta" 
        title="3. Conversion Hooks"
        textToCopy={`Primary: ${copy.cta.primary}\nSupporting: ${copy.cta.supporting}\nUrgency: ${copy.cta.urgency}\nTrust: ${copy.cta.trust}`}
      >
        <div className="flex flex-col items-center py-6 outline-none" contentEditable suppressContentEditableWarning>
          <button className="px-8 py-3.5 bg-[#1A1C1E] dark:bg-[#F1F3F5] text-white dark:text-[#121619] text-sm font-sans font-bold uppercase tracking-widest rounded-full shadow-lg pointer-events-none mb-4 transition-colors">
            {copy.cta.primary}
          </button>
          <p className="text-sm font-serif italic text-[#697077] dark:text-[#A2A9B0] mb-8 tracking-wide text-center max-w-md">{copy.cta.supporting}</p>
          
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#FFF5F5] dark:bg-[#2A1E1E] p-4 rounded-xl border border-[#FFD6D6] dark:border-[#5C3333] cursor-text transition-colors">
              <span className="text-[10px] font-bold text-[#FF5F57] uppercase tracking-wider mb-2 block">Urgency Factor</span>
              <p className="text-xs font-sans text-[#4D5358] dark:text-[#DDE1E6] leading-relaxed">{copy.cta.urgency}</p>
            </div>
            <div className="bg-[#F0FFF4] dark:bg-[#1E2A22] p-4 rounded-xl border border-[#C6F6D5] dark:border-[#335C41] cursor-text transition-colors">
              <span className="text-[10px] font-bold text-[#28C840] uppercase tracking-wider mb-2 block">Trust Metric</span>
              <p className="text-xs font-sans text-[#4D5358] dark:text-[#DDE1E6] leading-relaxed">{copy.cta.trust}</p>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
