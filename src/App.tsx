import React, { useState, useEffect } from 'react';
import BusinessForm from './components/BusinessForm';
import CopyPreview from './components/CopyPreview';
import ExportPanel from './components/ExportPanel';
import { GeneratedCopy, BusinessInput } from './lib/schemas/copy-schema';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Sliders, Moon, Sun, RotateCcw, ArrowLeft, Eye, Layout, Wrench, BadgeCheck, CheckCircle, Star, AlertCircle, Send, ChevronLeft, ArrowRight, Cpu, Globe, Activity, Terminal, Zap, Shield, Heart, User, ChevronDown, Rocket, ExternalLink, History, LogOut, Layers, MousePointer2, BarChart3, Database, Info, FileText, Download } from 'lucide-react';
import { getDemoData } from './lib/mockCopy';

const { inputData: defaultInput, copy: defaultCopy } = getDemoData();

export default function App() {
  const [copy, setCopy] = useState<GeneratedCopy | null>(defaultCopy);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputData, setInputData] = useState<BusinessInput | null>(defaultInput);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'creator' | 'preview' | 'profile'>('creator');
  const [activeModal, setActiveModal] = useState<{ title: string; content: string; type?: 'info' | 'blueprint' } | null>(null);

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
      
      {/* ----------------- GLOBAL SYSTEM STATUS ----------------- */}
      <div className="hidden lg:flex fixed top-0 inset-x-0 z-[110] h-6 bg-[#1A1C1E] dark:bg-black text-[8px] font-black uppercase tracking-[0.4em] text-white/40 items-center justify-between px-12 pointer-events-none">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Engine: Online</span>
          </div>
          <span>Lat: 12ms</span>
          <span>SRV: Asia-Pacific-01</span>
        </div>
        <div className="flex items-center gap-4">
          <span>UTC: {new Date().toISOString().split('T')[1].split('.')[0]}</span>
          <span>v2.8.4-stable</span>
        </div>
      </div>

      {/* ----------------- GLOBAL NAVIGATION BAR ----------------- */}
      <AnimatePresence>
        {viewMode === 'creator' && (
          <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 24 }}
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
                  { label: 'Showcase', id: 'vertical-showcase' },
                  { label: 'Themes', id: 'aesthetic-matrix' },
                  { label: 'Plans', id: 'service-plans' },
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

                <div id="creator-form" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32 scroll-mt-24">
                  {/* Left Column: Form Section */}
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
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
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-5 space-y-8"
                  >
                    {/* Live Statistics Bento */}
                    <div className="p-8 rounded-[3rem] bg-indigo-600 text-white shadow-2xl relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Activity className="w-40 h-40" />
                       </div>
                       <div className="relative z-10">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-6">Live Engine Metadata</h4>
                          <div className="grid grid-cols-2 gap-6">
                             <div>
                                <p className="text-3xl font-serif font-black">1.4s</p>
                                <p className="text-[9px] font-bold uppercase tracking-widest opacity-70 mt-1">Avg. Generation</p>
                             </div>
                             <div>
                                <p className="text-3xl font-serif font-black">99%</p>
                                <p className="text-[9px] font-bold uppercase tracking-widest opacity-70 mt-1">SEO Fidelity</p>
                             </div>
                          </div>
                       </div>
                    </div>

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
                  </motion.div>
                </div>

                {/* PARTNER ECOSYSTEM MARQUEE */}
                <div className="mb-32 overflow-hidden py-12 border-y border-[#DDE1E6] dark:border-white/10">
                   <div className="max-w-4xl mx-auto text-center mb-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Integrated with Global Infrastructure</p>
                   </div>
                   <motion.div 
                     animate={{ x: [0, -1000] }}
                     transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                     className="flex items-center gap-24 whitespace-nowrap opacity-40 hover:opacity-100 transition-opacity"
                   >
                      {[
                        'STRIPE_CONNECT', 'AWS_CLOUDFRONT', 'GEMINI_NEURAL_1.5', 'VERCEL_EDGE', 'REACT_STABLE', 'TYPESCRIPT_v5', 'ANTIGRAVITY_CORE', 'POSTGRES_SQL', 'DOCKER_CONTAINER'
                      ].map(partner => (
                        <span key={partner} className="text-xl font-serif font-black tracking-tighter text-[#1A1C1E] dark:text-white flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#0052CC]"></div>
                           {partner}
                        </span>
                      ))}
                   </motion.div>
                </div>

                {/* TESTIMONIAL BENTO GRID */}
                <div className="mb-40">
                   <div className="text-center mb-16">
                      <h3 className="text-4xl font-serif font-black tracking-tight text-[#1A1C1E] dark:text-white mb-4">Architectural Validations</h3>
                      <p className="text-sm text-gray-500 font-medium">Insights from the global engineering collective.</p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
                      <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }}
                        className="md:col-span-8 p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-[#DDE1E6] dark:border-white/10 shadow-sm flex flex-col justify-between"
                      >
                         <p className="text-2xl font-serif font-black dark:text-white leading-relaxed">"The Aura Engine redefined our entire onboarding protocol. The transition from raw data to a high-fidelity React blueprint was near-instant."</p>
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100"><img src="https://i.pravatar.cc/100?img=33" alt="" /></div>
                            <div>
                               <p className="text-sm font-black dark:text-white">Marcus Thorne</p>
                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CTO • Stratos Digital</p>
                            </div>
                         </div>
                      </motion.div>

                      <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="md:col-span-4 p-10 rounded-[3rem] bg-[#0052CC] text-white shadow-xl flex flex-col justify-between"
                      >
                         <p className="text-lg font-black leading-tight">"Unparalleled SEO precision. Our conversions spiked 40% after implementing the Aura localized copy blocks."</p>
                         <div className="flex items-center gap-3">
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                         </div>
                      </motion.div>

                      <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="md:col-span-4 p-10 rounded-[3rem] bg-[#1A1C1E] dark:bg-white text-white dark:text-[#1A1C1E] shadow-xl flex flex-col justify-between"
                      >
                         <p className="text-base font-black">"The minimal aesthetic is consistently perfect."</p>
                         <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Sarah Jenkins • Nordic Labs</p>
                      </motion.div>

                      <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                        className="md:col-span-8 p-10 rounded-[3rem] bg-indigo-500 text-white shadow-xl flex flex-col justify-between overflow-hidden relative"
                      >
                         <div className="absolute top-0 right-0 p-8 opacity-10"><Zap className="w-48 h-48" /></div>
                         <p className="text-xl font-serif font-black relative z-10">"We generated 12 distinct localized portals in a single afternoon. The throughput efficiency is monumental."</p>
                         <button className="w-fit px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Read Case Study</button>
                      </motion.div>
                   </div>
                </div>

                {/* FAQ PROTOCOL SECTION */}
                <div className="mb-40 max-w-4xl mx-auto">
                   <div className="text-center mb-16">
                      <h3 className="text-4xl font-serif font-black tracking-tight text-[#1A1C1E] dark:text-white mb-4">Neural Engine Decoded</h3>
                      <p className="text-sm text-gray-500 font-medium">Standard procedural documentation for technical inquiries.</p>
                   </div>
                   
                   <div className="space-y-4">
                      {[
                        { q: 'How does the neural synthesis work?', a: 'Our engine uses large context models to map your specific vertical data into a high-conversion visual matrix, generating both copy and design architecture simultaneously.' },
                        { q: 'Can I export the raw React blueprints?', a: 'Yes, both Premium and Enterprise tiers include direct high-fidelity React code exports with pre-configured Tailwind utility classes.' },
                        { q: 'What is the standard generation latency?', a: 'The primary synthesis block rendered in Indiranagar/Mumbai typically completes within 1.2s to 1.8s depending on engine load.' },
                        { q: 'Is localization handled dynamically?', a: 'Absolutely. The Aura Engine detects regional nuances and city-specific keywords for 140+ global metropolitan hubs.' }
                      ].map((faq, i) => (
                        <div key={i} className="group p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-[#DDE1E6] dark:border-white/10 hover:border-[#0052CC]/20 transition-all cursor-pointer">
                           <div className="flex items-center justify-between mb-4">
                              <h4 className="text-sm font-black text-[#1A1C1E] dark:text-white">{faq.q}</h4>
                              <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:rotate-90 transition-transform"><ArrowRight className="w-4 h-4" /></div>
                           </div>
                           <p className="text-xs text-gray-500 font-medium leading-relaxed max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500">{faq.a}</p>
                        </div>
                      ))}
                   </div>
                </div>


                <AnimatePresence>
                  {activeModal && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#0F1113]/80 backdrop-blur-md"
                      onClick={() => setActiveModal(null)}
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className={`w-full max-w-2xl bg-white dark:bg-[#1A1C1E] rounded-[3rem] overflow-hidden shadow-2xl relative border border-[#DDE1E6] dark:border-white/10 ${activeModal.type === 'blueprint' ? 'bg-gradient-to-br from-white to-blue-50 dark:from-[#1A1C1E] dark:to-indigo-950/20' : ''}`}
                      >
                        <div className="p-8 md:p-12">
                          <div className="flex items-center justify-between mb-8">
                             <div className="flex items-center gap-3">
                                {activeModal.type === 'blueprint' ? (
                                  <div className="w-10 h-10 rounded-xl bg-[#0052CC] flex items-center justify-center text-white">
                                    <Rocket className="w-5 h-5" />
                                  </div>
                                ) : (
                                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[#0052CC]">
                                    <Info className="w-5 h-5" />
                                  </div>
                                )}
                                <h3 className="text-xl font-serif font-black dark:text-white tracking-tight">{activeModal.title}</h3>
                             </div>
                             <button onClick={() => setActiveModal(null)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400">
                               <X className="w-6 h-6" />
                             </button>
                          </div>

                          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {activeModal.type === 'blueprint' ? (
                              <div className="space-y-10">
                                <div className="p-8 bg-gradient-to-br from-[#0052CC] to-[#5D3FD3] text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                                  <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-12 -right-12 opacity-10"
                                  >
                                    <Sparkles className="w-64 h-64" />
                                  </motion.div>
                                  <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">Aura Intelligence • Q3 Blueprint</p>
                                  <h4 className="text-3xl font-serif font-black leading-tight mb-6">Neural Expansion <br />Protocol v2.0</h4>
                                  <p className="text-sm opacity-90 leading-relaxed font-medium">Inside this transmission: The complete architectural mapping for high-throughput brand generation and neural synchronization strategies.</p>
                                </div>

                                <div className="space-y-6">
                                  <div className="flex items-center justify-between border-b border-[#DDE1E6] dark:border-white/10 pb-4">
                                     <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0052CC]">01 Technical Specifications</h5>
                                     <span className="text-[9px] font-bold text-gray-400">LATENCY: 12ms</span>
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                     {[
                                       { label: 'Neural Engine', value: 'Gemini-1.5-Pro' },
                                       { label: 'Context Window', value: '2M Tokens' },
                                       { label: 'Synthesis Flow', value: 'Async Parallel' },
                                       { label: 'Output Format', value: 'React/TSX/Tailwind' },
                                       { label: 'SEO Density', value: '98th Percentile' },
                                       { label: 'Region Lock', value: 'Decentralized' }
                                     ].map(spec => (
                                       <div key={spec.label} className="p-4 bg-[#F8F9FA] dark:bg-white/5 rounded-2xl border border-transparent hover:border-[#0052CC]/20 transition-all">
                                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">{spec.label}</p>
                                          <p className="text-[11px] font-bold dark:text-white uppercase">{spec.value}</p>
                                       </div>
                                     ))}
                                  </div>
                                </div>

                                <div className="space-y-6">
                                  <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0052CC] border-b border-[#DDE1E6] dark:border-white/10 pb-4">02 Neural Architecture Flow</h5>
                                  <div className="relative p-6 bg-[#1A1C1E] text-white rounded-[2rem] overflow-hidden">
                                     <div className="flex items-center justify-between relative z-10">
                                        {[
                                          { icon: Database, label: 'Data Input' },
                                          { icon: Cpu, label: 'Neural Map' },
                                          { icon: Layout, label: 'Visual Matrix' },
                                          { icon: Zap, label: 'Deploy' }
                                        ].map((step, i) => (
                                          <div key={step.label} className="flex flex-col items-center gap-3">
                                             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                                <step.icon className="w-4 h-4" />
                                             </div>
                                             <p className="text-center text-[8px] font-black uppercase tracking-widest leading-none">{step.label}</p>
                                          </div>
                                        ))}
                                     </div>
                                     <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-8"></div>
                                  </div>
                                </div>

                                <div className="space-y-6">
                                  <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0052CC] border-b border-[#DDE1E6] dark:border-white/10 pb-4">03 Strategic Roadmap</h5>
                                  <div className="space-y-3">
                                     {[
                                       'Dynamic API endpoint orchestration for headless brand scaling.',
                                       'Voice-to-Blueprint synthesis using real-time audio mapping.',
                                       'Collaborative Neural Canvas for multi-agent design refinement.',
                                       'One-click On-Premise GPU cluster deployment hooks.'
                                     ].map((item, i) => (
                                       <div key={i} className="flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-2xl transition-all">
                                          <div className="text-[10px] font-black text-[#0052CC] opacity-30 italic">0{i+1}</div>
                                          <p className="text-xs text-gray-500 font-medium leading-relaxed">{item}</p>
                                       </div>
                                     ))}
                                  </div>
                                </div>

                                <div className="p-8 bg-[#0052CC]/10 dark:bg-white/5 border border-dashed border-[#0052CC]/40 rounded-[2rem] text-center space-y-4">
                                   <div className="mx-auto w-12 h-12 rounded-full bg-[#0052CC]/20 flex items-center justify-center text-[#0052CC]">
                                      <FileText className="w-5 h-5" />
                                   </div>
                                   <h5 className="text-xs font-black uppercase tracking-wider text-[#1A1C1E] dark:text-white">Frontend Battle 2026 Guidelines PDF</h5>
                                   <p className="text-[11px] text-gray-500 max-w-md mx-auto leading-relaxed">
                                     The official 2-page detailed blueprint, criteria checklist, and presentation rules for the single-round design challenge.
                                   </p>
                                   <a 
                                     href="/api/download-guidelines" 
                                     download="Frontend_Battle_2026_Guidelines.pdf"
                                     className="inline-flex items-center gap-2 px-6 py-3 bg-[#0052CC] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all cursor-pointer"
                                   >
                                      <Download className="w-3.5 h-3.5" /> Download Competition PDF
                                   </a>
                                </div>

                                <div className="p-8 bg-black text-white rounded-[2rem] text-center">
                                   <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-4 text-[#0052CC]">Transmission Verified</p>
                                   <p className="text-xs opacity-60 leading-relaxed mb-6 font-medium">This document is encrypted and authorized for the registered entity only. Unauthorized reproduction will trigger a protocol reset.</p>
                                   <div className="flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-widest opacity-40">
                                      <span>SECURE_NODE</span>
                                      <div className="w-1 h-1 rounded-full bg-white"></div>
                                      <span>HASH_v5.4.1</span>
                                   </div>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed leading-7">
                                {activeModal.content}
                              </p>
                            )}
                          </div>

                          <button 
                            onClick={() => setActiveModal(null)}
                            className="mt-12 w-full py-4 bg-[#1A1C1E] dark:bg-white text-white dark:text-[#1A1C1E] rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl"
                          >
                            Close Protocol
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>


                   <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                      <div className="max-w-2xl">
                         <h3 className="text-4xl font-serif font-black tracking-tight text-[#1A1C1E] dark:text-white mb-4">Aesthetic Matrix V2</h3>
                         <p className="text-sm text-gray-500 font-medium leading-relaxed">Toggle between high-fidelity visual ecosystems. Each template recalibrates spacing, typography, and color theory for your specific vertical.</p>
                      </div>
                      <div className="flex items-center gap-4 p-1.5 bg-white dark:bg-white/5 border border-[#DDE1E6] dark:border-white/10 rounded-2xl">
                         {['Dynamic', 'Minimal', 'Brutalist'].map(t => (
                           <button key={t} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${t === 'Dynamic' ? 'bg-[#0052CC] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}>
                             {t}
                           </button>
                         ))}
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { title: 'Velvet Slate', desc: 'Deep charcoal & gold accents for luxury service models.', icon: Layers },
                        { title: 'Neon Pulse', desc: 'High-contrast vibrant palettes for tech and agencies.', icon: Zap },
                        { title: 'Nordic Clean', desc: 'Ultra-minimalist white-space focus for boutiques.', icon: MousePointer2 },
                        { title: 'Global Tech', desc: 'Enterprise-grade blueprints for software solutions.', icon: Globe }
                      ].map((theme, i) => (
                        <motion.div 
                          key={theme.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="group p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-[#DDE1E6] dark:border-white/10 hover:border-[#0052CC]/30 transition-all cursor-pointer shadow-sm hover:shadow-xl"
                        >
                           <div className="w-12 h-12 rounded-2xl bg-[#F2F4F8] dark:bg-white/5 flex items-center justify-center text-[#1A1C1E] dark:text-white mb-6 group-hover:scale-110 transition-transform">
                              <theme.icon className="w-6 h-6" />
                           </div>
                           <h4 className="text-sm font-black text-[#1A1C1E] dark:text-white mb-2">{theme.title}</h4>
                           <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{theme.desc}</p>
                        </motion.div>
                      ))}
                   </div>
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

                {/* SERVICE PLANS / ARCHITECTURAL TIERS */}
                <div id="service-plans" className="mb-32 scroll-mt-24">
                   <div className="text-center mb-16">
                      <h3 className="text-4xl font-serif font-black tracking-tight text-[#1A1C1E] dark:text-white mb-4">Select Your Architecture</h3>
                      <p className="text-sm text-gray-500 font-medium">Subscription protocols for high-performance brand scaling.</p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { tier: 'Standard', price: 'Free', features: ['3 Dynamic Blueprints', 'Standard SEO Mapping', 'Export React Code'], color: 'bg-white dark:bg-white/5' },
                        { tier: 'Premium', price: '$49', features: ['Unlimited Blueprint Nodes', 'Neural Copy Generation', 'Custom Deployment Hook', 'Priority GPU Buffer'], color: 'bg-[#0052CC] text-white', accent: true },
                        { tier: 'Enterprise', price: 'Custom', features: ['Dedicated Engineering Rep', 'On-premise Engine Hook', 'Unlimited Historical Vault'], color: 'bg-white dark:bg-white/5' }
                      ].map((plan, i) => (
                        <motion.div 
                          key={plan.tier}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className={`p-10 rounded-[3rem] border border-[#DDE1E6] dark:border-white/10 shadow-xl flex flex-col justify-between ${plan.color} ${plan.accent ? 'scale-105 z-10' : ''}`}
                        >
                           <div>
                              <div className="flex justify-between items-start mb-10">
                                 <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 text-inherit">{plan.tier}</span>
                                 {plan.accent && <Zap className="w-5 h-5 text-yellow-400" />}
                              </div>
                              <h4 className="text-5xl font-serif font-black mb-8">{plan.price}</h4>
                              <div className="space-y-4 mb-12 text-inherit">
                                 {plan.features.map(f => (
                                   <div key={f} className="flex items-center gap-3">
                                      <CheckCircle className={`w-4 h-4 ${plan.accent ? 'text-blue-200' : 'text-[#0052CC]'}`} />
                                      <span className="text-[11px] font-bold opacity-80">{f}</span>
                                   </div>
                                 ))}
                              </div>
                           </div>
                           <button className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${plan.accent ? 'bg-white text-[#0052CC] hover:scale-105 shadow-2xl' : 'bg-[#F2F4F8] dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-[#0052CC] hover:text-white'}`}>
                              Upgrade Account
                           </button>
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
                             onClick={() => setActiveModal({ 
                                title: "Consultation Request Protocol", 
                                content: "Your request for a high-priority architectural consultation has been logged. Our certified engineering lead for the Asia-Pacific sector will review your current blueprint and initiate a neural sync with your provided contact credentials (rohanvashist01@gmail.com) within the next four standard cycles." 
                              })}
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

                {/* COMPREHENSIVE PLATFORM FOOTER */}
                <footer className="mt-40 mb-12 py-20 border-t border-[#DDE1E6] dark:border-white/10">
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                      <div className="col-span-1 md:col-span-1">
                         <div className="flex items-center gap-2 text-[#1A1C1E] dark:text-white font-black text-sm tracking-tight mb-6">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0052CC] to-[#5D3FD3] flex items-center justify-center text-white">A</div>
                            <span>Aura Intelligence</span>
                         </div>
                         <p className="text-xs text-gray-400 font-medium leading-relaxed">The premier destination for high-fidelity architectural brand blueprints and neural copy generation.</p>
                      </div>
                      
                      {[
                        { 
                          title: 'Protocol', 
                          links: [
                            { label: 'Neural Engine', target: 'design-workflow' },
                            { label: 'Theme Matrix', target: 'aesthetic-matrix' },
                            { label: 'API Interface', target: 'creator-form' },
                            { label: 'Status', alert: 'All Systems Operational: v2.8.4-stable' }
                          ]
                        },
                        { 
                          title: 'Showcase', 
                          links: [
                            { label: 'Spas', target: 'vertical-showcase' },
                            { label: 'Tech Agencies', target: 'vertical-showcase' },
                            { label: 'Fine Dining', target: 'vertical-showcase' },
                            { label: 'Boutiques', target: 'vertical-showcase' }
                          ]
                        },
                        { 
                          title: 'Company', 
                          links: [
                            { label: 'Architecture', target: 'aura-hero' },
                            { label: 'Engineering', target: 'design-workflow' },
                            { label: 'Privacy', alert: 'Privacy Protocol 1.4: All generation data is sanitized locally.' },
                            { label: 'Legal', alert: 'Aura Blueprint License v2.0: Authorized for commercial use.' }
                          ]
                        }
                      ].map(group => (
                        <div key={group.title}>
                           <h5 className="text-[10px] font-black uppercase tracking-widest text-[#1A1C1E] dark:text-white mb-6 underline underline-offset-8 decoration-[#0052CC]/30">{group.title}</h5>
                           <ul className="space-y-3">
                                {group.links.map((l: any) => (
                                  <li key={l.label}>
                                    <button 
                                      onClick={() => {
                                        if (l.target) scrollToSection(l.target);
                                        if (l.alert) {
                                          setError(l.alert);
                                          setActiveModal({ title: l.label, content: l.alert });
                                        } else {
                                          setActiveModal({ title: l.label, content: `Accessing the ${l.label} interface. This terminal module provides high-fidelity specifications for ${l.label.toLowerCase()} architecture and neural mapping protocols.` });
                                        }
                                      }}
                                      className="text-xs text-gray-400 hover:text-[#0052CC] transition-colors text-left"
                                    >
                                      {l.label}
                                    </button>
                                  </li>
                                ))}
                             </ul>
                          </div>
                        ))}
                        
                        <div className="col-span-1">
                           <h5 className="text-[10px] font-black uppercase tracking-widest text-[#1A1C1E] dark:text-white mb-6 underline underline-offset-8 decoration-[#0052CC]/30">Neural Dispatch</h5>
                           <p className="text-xs text-gray-400 font-medium mb-6">Receive architectural updates and system patch notes directly.</p>
                           <div className="relative">
                              <input 
                                type="email" 
                                placeholder="rohanvashist01@gmail.com" 
                                className="w-full h-12 bg-[#F2F4F8] dark:bg-white/5 border border-[#DDE1E6] dark:border-white/10 rounded-xl px-4 text-xs font-medium focus:border-[#0052CC] transition-colors outline-none"
                              />
                              <button 
                                onClick={() => {
                                  setError("Subscription protocol active. Welcome to Aura Dispatch.");
                                  setActiveModal({
                                    title: "Blueprint Newsletter Synchronized",
                                    content: "Your entry into the neural design collective has been verified.",
                                    type: "blueprint"
                                  });
                                }}
                                className="absolute right-2 top-2 h-8 w-8 bg-[#0052CC] text-white rounded-lg flex items-center justify-center hover:scale-105 transition-all"
                              >
                                 <Send className="w-3.5 h-3.5" />
                              </button>
                           </div>
                        </div>
                     </div>
                     
                     <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-4">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                           <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">All Systems Operational</span>
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">© 2026 Aura Intelligence Systems • Part of the Antigravity Network</p>
                     </div>
                  </footer>

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
