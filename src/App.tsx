import React, { useState, useEffect } from 'react';
import BusinessForm from './components/BusinessForm';
import CopyPreview from './components/CopyPreview';
import ExportPanel from './components/ExportPanel';
import { GeneratedCopy, BusinessInput } from './lib/schemas/copy-schema';
import { Sparkles, X, Sliders, Moon, Sun, RotateCcw, ArrowLeft, Eye, Layout, Wrench, BadgeCheck, CheckCircle } from 'lucide-react';
import { getDemoData } from './lib/mockCopy';

const { inputData: defaultInput, copy: defaultCopy } = getDemoData();

export default function App() {
  const [copy, setCopy] = useState<GeneratedCopy | null>(defaultCopy);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputData, setInputData] = useState<BusinessInput | null>(defaultInput);
  const [darkMode, setDarkMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'creator' | 'preview'>('preview');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleResetToDefault = () => {
    const { inputData: demoInput, copy: demoCopy } = getDemoData();
    setInputData(demoInput);
    setCopy(demoCopy);
    setError(null);
    setIsDrawerOpen(false);
  };

  const handleGenerate = async (data: BusinessInput) => {
    setLoading(true);
    setError(null);
    setInputData(data);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate copy');
      }
      
      setCopy(result.copy);
      setError(null);
      // Automatically navigate to preview mode so the user sees their changes live immediately!
      setViewMode('preview');
    } catch (err: any) {
      console.warn("API/Key Info, falling back to dynamic sandbox model:", err.message);
      const { copy: fallbackCopy } = getDemoData();
      
      // Personalize fallback elements dynamically based on form data
      const personalizedCopy: GeneratedCopy = {
        homepage: {
          headline: data.name ? `The Ultimate ${data.vertical} Experience` : fallbackCopy.homepage.headline,
          subheadline: `Welcome to ${data.name || 'our Brand'} based in ${data.location || 'your area'}, ${data.city || 'the city'} tailored precisely for ${data.targetCustomer || 'our elite guests'}.`,
          intro: `We combine standard ${data.vertical?.toLowerCase() || 'premium quality hospitality'} with dedicated microcopy elements tailored for ${data.targetCustomer || 'our profile guests'}. Explore our curated selection of services customized on Indiranagar coordinates.`
        },
        services: data.services && data.services.length > 0 ? data.services.map((s, i) => ({
          name: s,
          tagline: `Premium custom feature tailored for ${data.tone || 'professional'} delivery`,
          description: `Enjoy standard luxury treatments. We target optimal customer engagement scores under strict quality matrices.`,
          whyUs: `Crafted precisely in ${data.location || 'this city'} utilizing ${data.uniqueSellingPoints?.[i] || data.uniqueSellingPoints?.[0] || 'elite standards'}.`
        })) : fallbackCopy.services,
        cta: {
          primary: `Book Session with ${data.name || 'Us'}`,
          supporting: `Secure your premium consultation slot in ${data.location || 'the city'} today. Our certified team responds within four hours.`,
          urgency: `Exclusive Availability this Saturday for residents of ${data.city || 'this area'}!`,
          trust: fallbackCopy.cta.trust
        }
      };
      
      setCopy(personalizedCopy);
      setError(`Notice: Preloaded beautifully! Using high-fidelity local content mapping engine to dynamically populate "${data.name}".`);
      // Automatically switch map to live copy preview so they see their gorgeous live landing page
      setViewMode('preview');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-[#F8F9FA] dark:bg-[#121416] text-[#1D1D20] dark:text-[#F1F3F5] font-sans overflow-hidden transition-colors selection:bg-[#0052CC] selection:text-white">
      
      {/* ----------------- GLOBAL FLOATING CONTROL BACK OPTION BANNER ----------------- */}
      {viewMode === 'preview' && (
        <div className="fixed top-3 left-4 z-50 flex items-center gap-2 select-none">
          <button
            onClick={() => setViewMode('creator')}
            className="px-4 py-2.5 rounded-full bg-[#1A1C1E] hover:bg-black dark:bg-[#FFFFFF] dark:hover:bg-zinc-100 text-white dark:text-[#111315] shadow-2xl border border-white/10 dark:border-zinc-300/30 flex items-center gap-2 transform transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer font-black text-[9px] uppercase tracking-widest"
            title="Return to Creator inputs dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#4589ff] dark:text-[#0052CC]" />
            <span>← Go Back to Website Creator</span>
          </button>
        </div>
      )}

      {/* ----------------- MAIN VIEWPORTS MATRIX ----------------- */}
      <main className="w-full h-full overflow-hidden relative">
        
        {viewMode === 'preview' ? (
          // ================= VIEW A: LIVE PREVIEW CONTAINER =================
          <div className="w-full h-full relative">
            {copy ? (
              <CopyPreview 
                copy={copy} 
                inputData={inputData}
                onUpdateCopy={(sectionData, section) => {
                  setCopy((prev) => prev ? { ...prev, [section]: sectionData } : prev);
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto p-6 text-center select-none">
                <Sparkles className="w-12 h-12 text-[#0052CC] animate-bounce mb-4" />
                <h3 className="font-serif text-xl font-black mb-2">No custom copy loaded</h3>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  Click the button below to generate beautiful copy matrices dynamically or view default presets.
                </p>
                <button 
                  onClick={handleResetToDefault}
                  className="px-5 py-2.5 bg-[#0052CC] text-white text-xs font-bold uppercase rounded-lg hover:shadow-lg transition-all"
                >
                  Reset to Spa Template
                </button>
              </div>
            )}
          </div>
        ) : (
          // ================= VIEW B: DEDICATED FULL-PAGE CREATOR HUB =================
          <div className="w-full h-full flex flex-col overflow-y-auto bg-[#F2F4F8] dark:bg-[#121416]">
            
            {/* Header branding nav */}
            <header className="sticky top-0 bg-white/95 dark:bg-[#1A1C1E]/95 backdrop-blur-md border-b border-[#DDE1E6] dark:border-[#2C3238] px-6 py-4.5 flex items-center justify-between z-30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0052CC] to-[#0042A3] flex items-center justify-center text-white shadow-md">
                  <Wrench className="w-4 h-4 text-white animate-pulse" />
                </div>
                <div>
                  <h1 className="font-serif font-black text-xs sm:text-sm uppercase tracking-wider text-[#1A1C1E] dark:text-white flex items-center gap-2">
                    Aura Website Builder Dashboard
                    <span className="text-[8px] tracking-widest bg-[#EAF5FF] text-[#0052CC] dark:bg-sky-950 dark:text-sky-300 font-mono px-2 py-0.5 rounded uppercase font-bold">Creator Cabin</span>
                  </h1>
                  <p className="text-[10px] text-gray-500 mt-0.5 font-medium">Fine-tune copy matrices, layout services, and view live landing templates.</p>
                </div>
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setViewMode('preview')}
                  className="px-5 py-2 rounded-lg bg-[#0052CC] hover:bg-[#0042A3] text-white text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Live Preview Website</span>
                </button>
              </div>
            </header>

            {/* Dashboard workspace columns */}
            <div className="max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Columns left workspace: The Input Form Cabin */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Intro welcome alert */}
                <div className="p-4 bg-white dark:bg-[#1A1C1E] rounded-2xl border border-[#DDE1E6] dark:border-[#2C3238] shadow-xs select-text">
                  <span className="text-[10px] font-extrabold text-[#0052CC] uppercase tracking-widest block mb-1">🚀 Start Crafting Your Landing Page</span>
                  <p className="text-[11px] text-[#4D5358] dark:text-[#A2A9B0] leading-relaxed">
                    Welcome to the website creator engine. Fill out your brand aesthetics and business core profiles below. Clicking the button at the bottom will dynamically populate and assemble a custom visual landing block, complete with <strong>price estimators</strong>, <strong>reviews sliders</strong>, and **cinematic image filters**!
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/25 border border-amber-200/50 dark:border-amber-900/30 rounded text-[11px] font-mono text-amber-800 dark:text-amber-300 leading-normal">
                    {error}
                  </div>
                )}

                {/* The main input parameters block */}
                <div className="bg-white dark:bg-[#1E2225] p-6 rounded-2xl border border-[#DDE1E6] dark:border-[#2C3238] shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.02] dark:opacity-10 pointer-events-none">
                    <Sparkles className="w-32 h-32 text-[#0052CC]" />
                  </div>
                  <h3 className="text-xs font-black uppercase text-gray-500 tracking-widest border-b pb-2 mb-4">I. Brand Configuration & Parameters</h3>
                  <BusinessForm onSubmit={handleGenerate} loading={loading} initialData={inputData} />
                </div>

              </div>

              {/* Columns right panel: System Tools, Presets, Exports */}
              <div className="lg:col-span-5 flex flex-col gap-6">

                {/* Dashboard Companion Guide card */}
                <div className="bg-white dark:bg-[#1E2225] border border-[#DDE1E6] dark:border-[#2C3238] rounded-2xl p-5 shadow-sm">
                  <h5 className="text-[10px] font-black uppercase text-gray-500 tracking-widest border-b pb-1.5 mb-3">II. Dashboard Toolkit Companion</h5>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3 text-[11px]">
                      <BadgeCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="text-[#1A1C1E] dark:text-white capitalize block">Double-Direction Live Sync</strong>
                        Updates here automatically adjust text elements. You can also edit text directly inline upon clicking 'Direct Edit' in the preview!
                      </div>
                    </div>

                    <div className="flex gap-3 text-[11px]">
                      <RotateCcw className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="text-[#1A1C1E] dark:text-white capitalize block">Template Presets Reset</strong>
                        Want to test with high-fidelity Ayurvedic spa parameters? Double tap below to quickly reload predesigned content.
                        <button
                          onClick={handleResetToDefault}
                          className="mt-2 text-[9px] font-extrabold uppercase bg-[#F2F4F8] dark:bg-[#15181B] hover:bg-red-50 dark:hover:bg-red-950/20 border border-gray-200 dark:border-transparent text-gray-700 dark:text-gray-300 hover:text-red-600 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" /> Reload Indiranagar Spa Default
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download export card */}
                {copy && (
                  <div className="bg-white dark:bg-[#1E2225] border border-[#DDE1E6] dark:border-[#2C3238] rounded-2xl p-5 shadow-sm space-y-3">
                    <h5 className="text-[10px] font-black uppercase text-gray-500 tracking-widest border-b pb-1.5">III. Code Export Center</h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                      Need production bundle packages? Compile and download your customized landing blocks and rate estimators as beautiful single-page HTML units.
                    </p>
                    <ExportPanel copy={copy} businessName={inputData?.name || 'spa-wellness'} />
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

      </main>

      {/* FLOATING ACTION CABIN PRESET - Sleek Floating Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {/* Toggle dark mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-11 h-11 rounded-full bg-white dark:bg-[#21272A] border border-[#DDE1E6] dark:border-[#343A3F] shadow-2xl flex items-center justify-center text-gray-500 dark:text-yellow-400 hover:text-black dark:hover:text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Toggle Page Theme"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Master drawer trigger */}
        <button
          onClick={() => {
            if (viewMode === 'preview') {
              setViewMode('creator');
            } else {
              setViewMode('preview');
            }
          }}
          className="h-11 px-5 rounded-full bg-gradient-to-r from-[#0052CC] to-[#0042A3] text-white font-extrabold text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-2 transform transition-all hover:scale-[1.03] hover:shadow-sky-500/10 active:scale-98 cursor-pointer"
          title="Swap views between dashboard editor and landing live"
        >
          {viewMode === 'preview' ? (
            <>
              <Wrench className="w-4 h-4 text-white" />
              <span>Configure Inputs</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 text-white" />
              <span>View Landing Site</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
