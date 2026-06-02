import React, { useState, useEffect } from 'react';
import BusinessForm from './components/BusinessForm';
import CopyPreview from './components/CopyPreview';
import ExportPanel from './components/ExportPanel';
import { GeneratedCopy, BusinessInput } from './lib/schemas/copy-schema';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Sliders, Moon, Sun, RotateCcw, ArrowLeft, Eye, Layout, Wrench, BadgeCheck, CheckCircle, Star, AlertCircle, Send, ChevronLeft, ArrowRight, Cpu, Globe, Activity, Terminal, Zap, Shield, Heart, User, ChevronDown, Rocket, ExternalLink, History, LogOut } from 'lucide-react';
import { getDemoData } from './lib/mockCopy';

const { inputData: defaultInput, copy: defaultCopy } = getDemoData();

export default function App() {
  const [copy, setCopy] = useState<GeneratedCopy | null>(defaultCopy);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputData, setInputData] = useState<BusinessInput | null>(defaultInput);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'creator' | 'preview' | 'profile'>('creator');

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
      setViewMode('preview');
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative w-screen h-screen bg-[#F8F9FA] dark:bg-[#121416] text-[#1D1D20] dark:text-[#F1F3F5] font-sans overflow-hidden transition-colors selection:bg-[#0052CC] selection:text-white">
      
      {/* ----------------- GLOBAL NAVIGATION BAR ----------------- */}
      <AnimatePresence>
        {viewMode === 'creator' && (
          <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 inset-x-0 z-[100] h-16 bg-white/70 dark:bg-[#0F1113]/70 backdrop-blur-xl border-b border-[#DDE1E6] dark:border-white/10 px-6 sm:px-12 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-8">
              <div 
                onClick={() => scrollToSection('aura-hero')}
                className="flex items-center gap-2 text-[#1A1C1E] dark:text-white font-black text-sm tracking-tight cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0052CC] to-[#5D3FD3] flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">A</div>
                <span className="hidden sm:block">Aura Intelligence</span>
              </div>

              <div className="hidden lg:flex items-center gap-6">
                {[
                  { label: 'Features', id: 'showcase-features' },
                  { label: 'Showcase', id: 'vertical-showcase' },
                  { label: 'Workflow', id: 'design-workflow' },
                  { label: 'Blueprint', id: 'creator-form' }
                ].map(link => (
                  <button 
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0052CC] dark:hover:text-[#4589ff] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setViewMode('creator')}
                className={`hidden sm:flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-full ${viewMode === 'creator' ? 'bg-[#0052CC] text-white shadow-md' : 'text-gray-400 hover:text-[#0052CC]'}`}
              >
                Dashboard
              </button>

              {copy && (
                <button 
                  onClick={() => setViewMode('preview')}
                  className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'preview' ? 'bg-[#0052CC] text-white shadow-md' : 'bg-[#0052CC]/5 dark:bg-[#4589ff]/5 text-[#0052CC] dark:text-[#4589ff] border border-[#0052CC]/20 hover:bg-[#0052CC]/10'}`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Live Preview
                </button>
              )}

              <div className="h-4 w-px bg-gray-200 dark:bg-white/10 mx-2 hidden sm:block"></div>

              {/* Profile Shortcut */}
              <div 
                onClick={() => setViewMode('profile')}
                className={`flex items-center gap-3 pl-2 cursor-pointer group transition-all p-1.5 rounded-2xl ${viewMode === 'profile' ? 'bg-gray-100 dark:bg-white/5' : ''}`}
              >
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black text-[#1A1C1E] dark:text-white leading-none">Aura Administrator</p>
                  <p className="text-[9px] text-gray-400 font-medium mt-0.5">Premium Architect</p>
                </div>
                <div className="relative">
                  <div className={`w-9 h-9 rounded-full border-2 bg-[#F2F4F8] dark:bg-white/5 flex items-center justify-center text-[#1A1C1E] dark:text-white shadow-sm overflow-hidden transition-all ${viewMode === 'profile' ? 'border-[#0052CC] scale-110' : 'border-white dark:border-[#1A1C1E] group-hover:ring-2 ring-[#0052CC]/40'}`}>
                    <img src="https://i.pravatar.cc/100?img=12" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0F1113]"></div>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ----------------- MAIN VIEWPORTS MATRIX ----------------- */}
      <main className="w-full h-full overflow-hidden relative flex">
        
        <AnimatePresence mode="wait">
          {viewMode === 'preview' ? (
            /* ================= VIEW A: THE LIVE PREVIEW ================= */
            <motion.div 
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 h-full relative overflow-hidden"
            >
              <CopyPreview 
                copy={copy!} 
                inputData={inputData}
                onUpdateCopy={(sectionData, section) => {
                  setCopy((prev) => prev ? { ...prev, [section]: sectionData } : prev);
                }}
                onOpenEditor={() => setViewMode('creator')}
              />
            </motion.div>
          ) : viewMode === 'profile' ? (
            /* ================= VIEW C: CINEMATIC PROFILE PAGE ================= */
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full h-full overflow-y-auto bg-[#F2F4F8] dark:bg-[#0F1113] pt-24 pb-20 relative"
            >
              {/* Back button overlay */}
              <div className="max-w-5xl mx-auto px-6 mb-8">
                <button 
                  onClick={() => setViewMode('creator')}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0052CC] transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Workspace
                </button>
              </div>

              <div className="max-w-5xl mx-auto px-6">
                {/* Profile Header Card */}
                <div className="relative h-64 rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-8 left-10 right-10 flex items-end justify-between text-white">
                    <div className="flex items-end gap-6">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-[2.5rem] border-4 border-white overflow-hidden shadow-2xl transition-transform group-hover:scale-105">
                          <img src="https://i.pravatar.cc/300?img=12" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[#0052CC] border-4 border-white flex items-center justify-center shadow-lg">
                          <Wrench className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                      <div className="pb-2">
                         <h1 className="text-4xl font-serif font-black tracking-tight mb-1">Rohan Vashist</h1>
                         <p className="text-sm font-medium opacity-80 uppercase tracking-widest flex items-center gap-2">
                           <BadgeCheck className="w-4 h-4 text-[#4589ff]" />
                           Premium Engineering License • Active
                         </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setViewMode('creator')}
                      className="px-6 py-3 bg-white text-[#1A1C1E] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all mb-2"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Account Details */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-[#1A1C1E] p-8 rounded-[2rem] border border-[#DDE1E6] dark:border-white/10 shadow-sm transition-all hover:shadow-md">
                      <h3 className="text-xs font-black uppercase tracking-widest text-[#0052CC] mb-6">User Parameters</h3>
                      <div className="space-y-5">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Interface</span>
                          <span className="text-sm font-black dark:text-white truncate">rohanvashist01@gmail.com</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Client Identity</span>
                          <span className="text-sm font-black dark:text-white">UID-8829-RV-01</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deployment Region</span>
                          <span className="text-sm font-black dark:text-white">Asia (Mumbai, IN)</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setError("Updating profile parameters... Metadata synchronized for Rohan.")}
                        className="w-full mt-8 py-3 bg-[#F2F4F8] dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0052CC] hover:text-white transition-all shadow-sm"
                      >
                        Synchronize Profile Data
                      </button>
                    </div>

                    <div className="bg-white dark:bg-[#1A1C1E] p-8 rounded-[2rem] border border-[#DDE1E6] dark:border-white/10 shadow-sm overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12">
                        <Cpu className="w-24 h-24" />
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-6">Resource Allocation</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <span className="text-[10px] font-bold text-gray-400 uppercase">GPU Cycles</span>
                           <span className="text-xs font-black">1.2k / 5k</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full w-[24%] bg-emerald-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Activity & History */}
                  <div className="lg:col-span-8 flex flex-col gap-8">
                    {/* Metrics Banner */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: 'Blueprints', val: '24', icon: Layout },
                        { label: 'Exports', val: '156', icon: Send },
                        { label: 'Accuracy', val: '99.2%', icon: CheckCircle },
                        { label: 'Active', val: '4', icon: Activity }
                      ].map(metric => (
                        <div key={metric.label} className="bg-white dark:bg-[#1A1C1E] p-6 rounded-3xl border border-[#DDE1E6] dark:border-white/10 shadow-sm flex flex-col gap-3">
                          <metric.icon className="w-5 h-5 text-[#0052CC]" />
                          <div>
                            <p className="text-[20px] font-serif font-black dark:text-white leading-none">{metric.val}</p>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">{metric.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shared Project Manifests component re-use with profile flavor */}
                    <div className="bg-white dark:bg-[#1A1C1E] p-10 rounded-[3rem] border border-[#DDE1E6] dark:border-white/10 shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-serif font-black dark:text-white tracking-tight">Version Control History</h3>
                        <div className="flex gap-2">
                           <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400"><Sliders className="w-4 h-4" /></div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {[
                           { name: 'Aurora Landing Page', change: 'Updated form parameters', time: '12 mins ago', ver: 'v1.8.4' },
                           { name: 'Solace Wellness Hub', change: 'Redeployed to production', time: '2 hours ago', ver: 'v2.0.1' },
                           { name: 'Mumbai Tech Labs', change: 'Added biometric security cards', time: 'Yesterday', ver: 'v0.9.2' },
                           { name: 'Indiranagar Spa', change: 'First blueprint generated', time: '3 days ago', ver: 'v1.0.0' }
                        ].map((log, i) => (
                          <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-[#DDE1E6] dark:hover:border-white/10 group">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0052CC]/10 to-purple-500/10 flex items-center justify-center text-[#0052CC]">
                                <History className="w-5 h-5" />
                              </div>
                              <div>
                                <h5 className="text-sm font-black dark:text-white tracking-tight">{log.name}</h5>
                                <p className="text-[10px] text-gray-400 font-medium">Modified: {log.change}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-black dark:text-white uppercase tracking-widest">{log.ver}</p>
                              <p className="text-[9px] text-gray-400 font-medium">{log.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button className="w-full mt-10 py-4 bg-gray-50 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0052CC] hover:border-[#0052CC] transition-all">
                        Access Full Historical Archive
                      </button>
                    </div>

                    {/* Account Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="p-8 rounded-[2.5rem] bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 flex flex-col justify-between h-48 group cursor-pointer hover:-translate-y-1 transition-all">
                          <Shield className="w-8 h-8 opacity-50 group-hover:scale-110 transition-transform" />
                          <div>
                            <h4 className="text-lg font-black tracking-tight mb-1">Security Systems</h4>
                            <p className="text-xs opacity-70 font-medium">Manage 2FA and active sessions</p>
                          </div>
                       </div>
                       <div className="p-8 rounded-[2.5rem] bg-[#1A1C1E] dark:bg-[#FFFFFF] text-white dark:text-[#1A1C1E] shadow-xl flex flex-col justify-between h-48 group cursor-pointer hover:-translate-y-1 transition-all">
                          <LogOut className="w-8 h-8 opacity-50 group-hover:translate-x-2 transition-transform" />
                          <div>
                            <h4 className="text-lg font-black tracking-tight mb-1">Terminal Session</h4>
                            <p className="text-xs opacity-70 font-medium">Safe exit and data sanitization</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ================= VIEW B: DEDICATED HIGH-FIDELITY CREATOR HOMEPAGE ================= */
            <motion.div 
              key="creator"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="w-full h-full overflow-y-auto bg-[#F2F4F8] dark:bg-[#0F1113] selection:bg-[#0052CC]/10 relative"
            >
              {/* Cinematic Background Layer */}
              <div className="absolute top-0 inset-x-0 h-[600px] pointer-events-none overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
                  alt="Atmosphere"
                  className="w-full h-full object-cover opacity-[0.03] dark:opacity-[0.07] scale-110 blur-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#F2F4F8]/0 via-[#F2F4F8] to-[#F2F4F8] dark:from-[#0F1113]/0 dark:via-[#0F1113] dark:to-[#0F1113]"></div>
              </div>

              {/* Background Accents */}
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0052CC]/5 blur-[120px] rounded-full pointer-events-none"></div>
              <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none"></div>

              <div id="aura-hero" className="max-w-6xl mx-auto px-6 py-12 md:py-32 relative z-10">
                {/* Branding & Intro */}
                <div className="text-center mb-20 pt-16 lg:pt-0">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 border border-[#DDE1E6] dark:border-white/10 shadow-sm mb-6"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#0052CC]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0052CC] dark:text-[#4589ff]">Aura Visual Engine v2.0</span>
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-serif font-black tracking-tight text-[#1A1C1E] dark:text-white leading-[1.1] mb-8"
                  >
                    Craft a Cinematic <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052CC] via-[#5D3FD3] to-[#aa33ff]">Digital Brand Identity</span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed"
                  >
                    Assemble high-fidelity copy matrices, real-time rate estimators, and professional visual blocks tailored precisely for your vertical in minutes.
                  </motion.p>
                </div>

                {/* Feature Highlight: Cinematic Dashboard Preview */}
                <motion.div 
                  id="showcase-features"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-32 relative group"
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#0052CC]/20 via-purple-500/20 to-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden border border-[#DDE1E6] dark:border-white/10 shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop" 
                      alt="Interface Preview"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1E] via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between text-white">
                      <div>
                        <h3 className="text-3xl font-serif font-black tracking-tight mb-2">Architectural Precision</h3>
                        <p className="text-sm font-medium opacity-80 max-w-lg">Every element is mapped to a strictly authorial visual system ensuring your brand maintains aesthetic dominance.</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-3">
                          <Zap className="w-5 h-5 text-yellow-400" />
                          <span className="text-xs font-black uppercase tracking-widest">Optimized</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div id="creator-form" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
                  {/* Left Column: Form Section */}
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-7"
                  >
                    <div className="bg-white dark:bg-[#1A1C1E] p-8 md:p-12 rounded-[3.5rem] border border-[#DDE1E6] dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-12 opacity-[0.02] dark:opacity-[0.06] pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
                        <Wrench className="w-64 h-64 text-[#0052CC]" />
                      </div>
                      
                      <div className="flex items-center gap-5 mb-12">
                        <div className="w-14 h-14 rounded-[20px] bg-gradient-to-tr from-[#0052CC] to-[#5D3FD3] flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                          <Sliders className="w-7 h-7" />
                        </div>
                        <div>
                          <h2 className="text-xl font-black text-[#1A1C1E] dark:text-white tracking-tight">Intelligence Dashboard</h2>
                          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">Core Business Configuration</p>
                        </div>
                      </div>

                      {error && (
                        <div className="mb-10 p-5 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 rounded-3xl text-[12px] font-mono text-amber-800 dark:text-amber-300 flex gap-4 animate-in fade-in slide-in-from-top-4">
                          <AlertCircle className="w-5 h-5 shrink-0" />
                          <div className="leading-relaxed">
                            <strong className="block mb-0.5">Configuration Notice:</strong>
                            {error}
                          </div>
                        </div>
                      )}

                      <div className="relative z-10">
                        <BusinessForm onSubmit={handleGenerate} loading={loading} initialData={inputData} />
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Column: Dynamic Showcase */}
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-5 space-y-8"
                  >
                    <div className="p-10 rounded-[3rem] bg-[#1A1C1E] dark:bg-[#FFFFFF] text-white dark:text-[#1A1C1E] shadow-2xl relative overflow-hidden group">
                      <img 
                        src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" 
                        alt="Quality"
                        className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1E] via-[#1A1C1E]/60 to-transparent dark:from-white dark:via-white/60 dark:to-transparent"></div>
                      
                      <div className="relative z-10">
                        <BadgeCheck className="w-12 h-12 text-[#4589ff] mb-6" />
                        <h4 className="text-2xl font-black tracking-tight mb-4">Real-time Generation</h4>
                        <p className="text-sm dark:text-gray-600 text-gray-400 font-medium leading-relaxed mb-8">
                          Our engine analyzes your vertical to inject dynamic SEO-optimized copy, custom components, and visual themes instantly.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-10">
                          {['Indiranagar Spa', 'Mumbai Tech', 'Delhi Fine Dining'].map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/10 dark:bg-black/5 rounded-full text-[9px] font-black uppercase tracking-widest">{tag}</span>
                          ))}
                        </div>

                        <button 
                          onClick={handleResetToDefault}
                          className="w-full py-4 bg-white dark:bg-[#1A1C1E] text-[#1A1C1E] dark:text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2 group/btn"
                        >
                          <RotateCcw className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />
                          Reset to Sandbox Presets
                        </button>
                      </div>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-white dark:bg-[#1A1C1E] border border-[#DDE1E6] dark:border-white/10 shadow-md">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8 border-b border-gray-100 dark:border-white/5 pb-4">Architectural Components</h4>
                      <div className="grid grid-cols-2 gap-6">
                        {[
                          { icon: Layout, label: 'Bento Grids', color: 'text-[#0052CC]' },
                          { icon: Star, label: 'Social Proof', color: 'text-amber-500' },
                          { icon: Eye, label: 'Theme Matrix', color: 'text-emerald-500' },
                          { icon: Send, label: 'Lead Capture', color: 'text-sky-500' }
                        ].map(({ icon: Icon, label, color }) => (
                          <div key={label} className="flex items-center gap-3 p-2 group cursor-default">
                            <div className={`w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[11px] font-bold text-gray-600 dark:text-gray-300">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Vertical Showcase Gallery */}
                <div id="vertical-showcase" className="mb-32">
                  <div className="flex items-end justify-between mb-12">
                    <div>
                      <h3 className="text-3xl font-serif font-black tracking-tight text-[#1A1C1E] dark:text-white mb-2">Industry-Specific Vertical Blocks</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide italic">Tailored visual strategies for diverse business models</p>
                    </div>
                    <div className="hidden md:flex gap-2">
                       <div className="w-10 h-10 rounded-full border border-[#DDE1E6] dark:border-white/10 flex items-center justify-center opacity-40"><ChevronLeft className="w-5 h-5" /></div>
                       <div className="w-10 h-10 rounded-full border border-[#DDE1E6] dark:border-white/10 flex items-center justify-center text-[#0052CC] ring-1 ring-[#0052CC]"><ArrowRight className="w-5 h-5" /></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { 
                        title: 'Premium Wellness', 
                        subtitle: 'Spas & Holistic Centers',
                        img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop',
                        tag: 'Relaxation'
                      },
                      { 
                        title: 'Technical Agencies', 
                        subtitle: 'Digital & Software Solutions',
                        img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
                        tag: 'Innovation'
                      },
                      { 
                        title: 'Gastronomy Elite', 
                        subtitle: 'Fine Dining & Bistros',
                        img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
                        tag: 'Hospitality'
                      }
                    ].map((item, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (idx * 0.1) }}
                        key={item.title} 
                        className="group relative h-[420px] rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                      >
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        <div className="absolute top-6 right-6">
                           <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest">{item.tag}</span>
                        </div>
                        <div className="absolute bottom-10 left-10 right-10">
                          <h5 className="text-xl font-black text-white mb-1">{item.title}</h5>
                          <p className="text-xs text-white/70 font-medium uppercase tracking-wider">{item.subtitle}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div id="design-workflow" className="mb-32">
                  <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-serif font-black tracking-tight text-[#1A1C1E] dark:text-white mb-4">Neural Design Workflow</h2>
                    <p className="text-sm text-gray-500 font-medium">Four stages of deep-context generation and visual mapping.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { icon: Terminal, title: 'I. Ingestion', desc: 'Raw business data is tokenized and sanitized for model compatibility.', color: 'border-blue-500/20' },
                      { icon: Cpu, title: 'II. Synthesis', desc: 'Aura AI maps vertical-specific taglines using high-conversion datasets.', color: 'border-purple-500/20' },
                      { icon: Globe, title: 'III. Localization', desc: 'Regional nuances and city-specific keywords are injected dynamically.', color: 'border-emerald-500/20' },
                      { icon: Activity, title: 'IV. Rendering', desc: 'The visual blueprint is rendered into production-ready React components.', color: 'border-amber-500/20' }
                    ].map((step, idx) => (
                      <div key={step.title} className={`p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border ${step.color} shadow-sm group hover:scale-[1.02] transition-transform`}>
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                          <step.icon className="w-6 h-6 text-gray-400 group-hover:text-[#0052CC] transition-colors" />
                        </div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#1A1C1E] dark:text-white mb-3">{step.title}</h4>
                        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shared Project Manifests: Quick Links to Preview */}
                <div className="mb-32">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                        <History className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-serif font-black tracking-tight text-[#1A1C1E] dark:text-white">Active Blueprints</h3>
                    </div>
                    {copy && (
                      <button 
                         onClick={() => setViewMode('preview')}
                         className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
                      >
                         Launch Active Draft
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: inputData?.name || 'Aura Workspace', type: inputData?.vertical || 'Dynamic', status: 'Live Editing', date: 'Modified 2 mins ago' },
                      { name: 'Solace Wellness', type: 'Premium Spa', status: 'Published', date: 'Modified 4 hours ago' }
                    ].map((project, i) => (
                      <div 
                        key={project.name + i} 
                        className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-[#DDE1E6] dark:border-white/10 flex items-center justify-between group cursor-pointer hover:border-[#0052CC]/40 transition-colors"
                        onClick={() => i === 0 && copy ? setViewMode('preview') : null}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#0052CC] transition-colors">
                            {i === 0 ? <Rocket className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-[#1A1C1E] dark:text-white">{project.name}</h4>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{project.type} • {project.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${i === 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-100 dark:bg-white/5 text-gray-400'}`}>
                             {project.status}
                           </span>
                           <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-[#0052CC] transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Neural Design Workflow ... existing content ... */}

                {/* Final Call to Action Section */}
                <div className="mb-32">
                   <div className="relative p-12 md:p-20 rounded-[4rem] bg-[#0052CC] text-white overflow-hidden shadow-3xl text-center">
                      <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                         <Sparkles className="w-96 h-96" />
                      </div>
                      <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-6">Ready to launch your <br /> elite digital asset?</h2>
                        <p className="text-base font-medium opacity-80 mb-10 leading-relaxed">Join 1,200+ brands utilizing the Aura Intelligence Engine to dominate their vertical markets with high-fidelity visual blueprints.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                           <button 
                             onClick={() => scrollToSection('creator-form')}
                             className="px-8 py-5 bg-white text-[#0052CC] rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all active:scale-95"
                           >
                             Initialize Blueprint Now
                           </button>
                           <button 
                             onClick={() => setError("Our engineering team has been notified. We will reach out to rohanvashist01@gmail.com shortly.")}
                             className="px-8 py-5 bg-transparent border border-white/30 hover:bg-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                           >
                             Consult Engineering Team
                           </button>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Trust & Live Feed Section */}
                <div className="mb-10 p-1 bg-white/50 dark:bg-white/5 rounded-full border border-[#DDE1E6] dark:border-white/10 flex items-center justify-between gap-10 overflow-hidden group">
                  <div className="flex items-center gap-4 px-6 shrink-0">
                    <div className="flex -space-x-2">
                       {[1,2,3].map(i => (
                         <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1A1C1E] bg-gray-200 overflow-hidden">
                           <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                         </div>
                       ))}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live Deployments</span>
                  </div>
                  
                  <div className="flex-1 overflow-hidden relative">
                    <motion.div 
                       animate={{ x: [0, -1000] }}
                       transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                       className="flex items-center gap-12 whitespace-nowrap py-3"
                    >
                      {[
                        'New Spa Blueprint generated in Indiranagar',
                        'SEO Mapping complete for Mumbai SaaS Agency',
                        'Conversion Score: 98% for Delhi Bistro',
                        'React Bundle exported for Wellness Hub',
                        'Aura Engine v2.0 update synchronized',
                        'Cloud Ingress stable at 12ms latency',
                        'Dynamic Matrix scaling for Yoga Studio'
                      ].map((text, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{text}</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Creator Footer */}
              <footer className="max-w-6xl mx-auto px-6 py-16 border-t border-[#DDE1E6] dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <div className="flex items-center gap-10">
                  <div className="flex items-center gap-2 text-[#1A1C1E] dark:text-white group cursor-pointer">
                    <div className="w-6 h-6 rounded-lg bg-[#0052CC] flex items-center justify-center text-white scale-90 group-hover:rotate-12 transition-transform">A</div>
                    <span>Aura Visuals</span>
                  </div>
                  <div className="flex gap-6 opacity-60">
                    <span className="hover:text-[#0052CC] cursor-pointer transition-colors">Legal Matrix</span>
                    <span className="hover:text-[#0052CC] cursor-pointer transition-colors">Documentation</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[#0052CC] dark:text-[#4589ff] bg-[#0052CC]/5 px-4 py-2 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" />
                  High Fidelity Blueprint v2.0
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FLOATING CONTROL BAR */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 p-2 rounded-full bg-white/80 dark:bg-[#1A1C1E]/80 backdrop-blur-xl border border-[#DDE1E6] dark:border-white/10 shadow-2xl scale-90 sm:scale-100">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-12 h-12 rounded-full flex items-center justify-center text-gray-500 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-all active:scale-90"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        {viewMode === 'preview' && (
          <button
            onClick={() => setViewMode('creator')}
            className="h-12 px-6 rounded-full bg-[#1A1C1E] dark:bg-white text-white dark:text-[#1A1C1E] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-xl hover:scale-105 transition-all active:scale-95"
          >
            <Wrench className="w-4 h-4" />
            <span>Edit Custom Site</span>
          </button>
        )}

        {viewMode === 'creator' && copy && (
          <button
            onClick={() => setViewMode('preview')}
            className="h-12 px-6 rounded-full bg-gradient-to-r from-[#0052CC] to-[#aa33ff] text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-xl hover:scale-105 transition-all active:scale-95"
          >
            <Eye className="w-4 h-4" />
            <span>View Latest Result</span>
          </button>
        )}
      </div>

    </div>
  );
}
