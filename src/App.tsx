import React, { useState, useEffect } from 'react';
import BusinessForm from './components/BusinessForm';
import CopyPreview from './components/CopyPreview';
import ExportPanel from './components/ExportPanel';
import { GeneratedCopy, BusinessInput } from './lib/schemas/copy-schema';
import { Sparkles, ArrowLeft, Moon, Sun } from 'lucide-react';

export default function App() {
  const [copy, setCopy] = useState<GeneratedCopy | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputData, setInputData] = useState<BusinessInput | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F1F3F5] dark:bg-[#121619] text-[#1A1C1E] dark:text-[#F1F3F5] font-sans overflow-hidden transition-colors">
      <header className="h-12 bg-white dark:bg-[#21272A] border-b border-[#DDE1E6] dark:border-[#343A3F] flex items-center justify-between px-4 shrink-0 shadow-sm transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0052CC] rounded flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-semibold tracking-tight text-sm uppercase dark:text-white">
            AI Website Copy Engine <span className="text-[#697077] dark:text-[#A2A9B0] font-normal">/ {inputData?.name ? inputData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'new-project'}</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-[#343A3F] transition-colors"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-[#697077]" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-mono font-medium text-[#4D5358] dark:text-[#A2A9B0] hidden sm:block">GEMINI-CONNECTED</span>
          </div>
          {copy && (
            <button
              onClick={() => setCopy(null)}
              className="text-[11px] font-bold text-[#697077] dark:text-[#A2A9B0] uppercase tracking-wider hover:text-[#1A1C1E] dark:hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> Start Over
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 flex gap-3 p-3 overflow-hidden">
        {!copy ? (
          <div className="w-full max-w-5xl mx-auto flex items-center lg:items-start flex-col lg:flex-row gap-8 overflow-y-auto h-full pr-2 pb-8 pt-6 lg:pt-12">
            <div className="flex-1 w-full max-w-xl mx-auto lg:mx-0 flex flex-col z-10">
              <div className="mb-6 lg:mb-8">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold tracking-tight text-[#1A1C1E] dark:text-[#F1F3F5] mb-3 leading-tight">
                  Automate your<br/>website copywriting.
                </h2>
                <p className="text-sm lg:text-base text-[#697077] dark:text-[#A2A9B0] leading-relaxed max-w-md">
                  Enter your business details below, and our Gemini-powered engine will generate conversion-optimised website copy, brand identity colors, and typography suggestions instantly.
                </p>
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded text-red-600 dark:text-red-400 text-xs font-mono shadow-sm">
                  {error}
                </div>
              )}
              <div className="bg-white dark:bg-[#21272A] p-5 lg:p-6 shadow-xl rounded-xl border border-[#DDE1E6] dark:border-[#343A3F] transition-colors relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03]  dark:opacity-10 pointer-events-none">
                  <Sparkles className="w-32 h-32 text-[#0052CC] mix-blend-multiply dark:mix-blend-screen" />
                </div>
                <BusinessForm onSubmit={handleGenerate} loading={loading} />
              </div>
            </div>

            <div className="hidden lg:flex flex-1 flex-col justify-center items-center min-h-[500px] w-full max-w-md relative mt-4">
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative z-10 border border-white/20 dark:border-[#343A3F]/50">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                  alt="Website design planning" 
                  className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5 flex flex-col justify-end p-8 text-white">
                  <h3 className="font-serif text-2xl font-bold mb-2">Crafting your story.</h3>
                  <p className="text-sm text-gray-300 leading-relaxed text-balance">
                    Every great business needs compelling copy. Provide the context, and watch the AI structure it for you.
                  </p>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#0052CC] rounded-full blur-[100px] opacity-20 dark:opacity-30 pointer-events-none"></div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-500 rounded-full blur-[80px] opacity-20 dark:opacity-30 pointer-events-none"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-3 w-full h-full min-h-0">
            <section className="w-full lg:w-72 flex flex-col shrink-0 h-full overflow-y-auto pr-1">
              <div className="bg-white dark:bg-[#21272A] rounded-lg border border-[#DDE1E6] dark:border-[#343A3F] flex flex-col shadow-sm transition-colors">
                <div className="p-3 border-b border-[#F2F4F8] dark:border-[#343A3F] flex items-center justify-between">
                  <h3 className="text-[11px] font-bold text-[#697077] dark:text-[#A2A9B0] uppercase tracking-wider">Business Config</h3>
                  <span className="text-[10px] text-[#0052CC] dark:text-[#4589ff] font-bold">REUSE_PROMPT_v4</span>
                </div>
                <div className="p-3 overflow-y-auto">
                  <BusinessForm onSubmit={handleGenerate} loading={loading} initialData={inputData} compact />
                </div>
              </div>
            </section>
            <section className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto pr-1">
              <CopyPreview 
                copy={copy} 
                inputData={inputData}
                onUpdateCopy={(sectionData, section) => {
                  setCopy((prev) => prev ? { ...prev, [section]: sectionData } : prev);
                }}
              />
            </section>
            <section className="w-full lg:w-64 shrink-0 h-full overflow-y-auto pr-1">
              <ExportPanel copy={copy} businessName={inputData?.name || 'business'} />
            </section>
          </div>
        )}
      </main>
      <footer className="h-8 bg-white dark:bg-[#21272A] border-t border-[#DDE1E6] dark:border-[#343A3F] flex items-center justify-between px-4 shrink-0 text-[10px] text-[#878D96] dark:text-[#697077] font-medium uppercase tracking-wider transition-colors">
        <div className="flex gap-4">
          <span>ENGINE_V1.0</span>
        </div>
        <div className="flex gap-4">
          <span>{inputData?.location || 'LOCAL_ENV'}</span>
        </div>
      </footer>
    </div>
  );
}
