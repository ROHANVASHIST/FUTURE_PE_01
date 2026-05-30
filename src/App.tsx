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
          <div className="w-full max-w-2xl mx-auto flex flex-col overflow-y-auto h-full pr-2 pb-8">
            <div className="mb-4 mt-8">
              <h2 className="text-lg font-bold tracking-tight text-[#1A1C1E] dark:text-[#F1F3F5] uppercase">Business Configuration</h2>
              <p className="mt-1 text-xs text-[#697077] dark:text-[#A2A9B0]">Enter details to generate conversion-optimised website copy.</p>
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded text-red-600 dark:text-red-400 text-xs font-mono">
                {error}
              </div>
            )}
            <div className="bg-white dark:bg-[#21272A] p-4 shadow-sm rounded-lg border border-[#DDE1E6] dark:border-[#343A3F] transition-colors">
              <BusinessForm onSubmit={handleGenerate} loading={loading} />
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
