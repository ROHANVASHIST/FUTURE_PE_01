import React, { useState } from 'react';
import { GeneratedCopy } from '../lib/schemas/copy-schema';
import { Download, FileText, Check, Copy, Palette } from 'lucide-react';

interface Props {
  copy: GeneratedCopy;
  businessName: string;
}

export default function ExportPanel({ copy, businessName }: Props) {
  const [copied, setCopied] = useState(false);

  const getMarkdown = () => {
    return `# ${copy.homepage.headline}
${copy.homepage.subheadline}

${copy.homepage.intro}

## Our Services

${copy.services.map(s => `### ${s.name}
*${s.tagline}*

${s.description}

**Why Us:** ${s.whyUs}`).join('\n\n')}

## Call to Action

**Button:** ${copy.cta.primary}
**Sub-copy:** ${copy.cta.supporting}
**Urgency:** ${copy.cta.urgency}
**Trust:** ${copy.cta.trust}`;
  };

  const escapeHtml = (unsafe: string) => {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
  };

  const getHtml = () => {
    const title = escapeHtml(businessName || 'Brand');
    return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${escapeHtml(copy.homepage.headline)}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Outfit', 'sans-serif'],
                        serif: ['Playfair Display', 'serif'],
                    },
                    colors: {
                        brand: {
                            50: '#f6f7f9',
                            100: '#eceef2',
                            500: '#1a1c1e',
                            900: '#000000',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
    </style>
</head>
<body class="bg-brand-50 text-brand-500 antialiased selection:bg-brand-500 selection:text-white">
    <!-- Navbar -->
    <nav class="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="font-serif italic font-semibold text-2xl tracking-tight text-brand-900">${title}</div>
            <div class="hidden md:flex space-x-8 text-sm font-medium tracking-wide text-gray-600">
                <a href="#services" class="hover:text-brand-900 transition-colors">Services</a>
                <a href="#booking" class="hover:text-brand-900 transition-colors">Booking</a>
            </div>
            <a href="#booking" class="bg-brand-900 text-white px-6 py-2.5 text-sm font-semibold rounded-full hover:bg-gray-800 transition-all">Book Now</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-40 pb-24 px-6 min-h-[90vh] flex flex-col justify-center items-center text-center">
        <div class="max-w-4xl mx-auto animate-fade-in">
            <h1 class="font-serif text-5xl md:text-7xl font-bold leading-tight mb-8 text-brand-900">
                ${escapeHtml(copy.homepage.headline)}
            </h1>
            <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
                ${escapeHtml(copy.homepage.subheadline)}
            </p>
            <p class="text-base text-gray-500 max-w-3xl mx-auto leading-relaxed mb-12">
                ${escapeHtml(copy.homepage.intro)}
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#booking" class="w-full sm:w-auto bg-brand-900 text-white px-8 py-4 rounded-full font-semibold tracking-wide hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
                    ${escapeHtml(copy.cta.primary)}
                </a>
            </div>
            <div class="mt-8 text-sm text-gray-500 flex items-center justify-center gap-2">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                ${escapeHtml(copy.cta.trust)}
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-24 px-6 bg-white">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16">
                <h2 class="font-serif text-4xl md:text-5xl font-bold text-brand-900 mb-4">Our Services</h2>
                <div class="w-24 h-1 bg-brand-900 mx-auto opacity-20"></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${copy.services.map(s => `
                <div class="group p-8 rounded-2xl bg-brand-50 border border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-xl">
                    <h3 class="text-xl font-bold text-brand-900 mb-2">${escapeHtml(s.name)}</h3>
                    <p class="text-sm font-semibold text-indigo-600 mb-4 tracking-wide uppercase">${escapeHtml(s.tagline)}</p>
                    <p class="text-gray-600 leading-relaxed mb-6">${escapeHtml(s.description)}</p>
                    <div class="pt-6 border-t border-gray-200">
                        <span class="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Why Choose Us</span>
                        <p class="text-sm font-medium text-brand-500 italic">${escapeHtml(s.whyUs)}</p>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section id="booking" class="py-24 px-6 bg-brand-900 text-white text-center">
        <div class="max-w-3xl mx-auto">
            <h2 class="font-serif text-4xl md:text-5xl font-bold mb-8 text-white">Ready to Elevate Your Experience?</h2>
            <p class="text-lg text-gray-300 mb-10 max-w-xl mx-auto">${escapeHtml(copy.cta.supporting)}</p>
            <button class="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 transform duration-200 block mx-auto w-full sm:w-auto">
                ${escapeHtml(copy.cta.primary)}
            </button>
            <div class="mt-8 inline-block bg-white/10 px-6 py-3 rounded-full text-sm font-medium text-red-200 backdrop-blur-sm border border-white/20">
                ✨ ${escapeHtml(copy.cta.urgency)}
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-brand-900 text-gray-400 py-12 px-6 border-t border-gray-800 text-center">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="font-serif italic text-xl text-white opacity-80">${title}</div>
            <div class="text-sm">&copy; 2026 ${title}. All rights reserved.</div>
        </div>
    </footer>
</body>
</html>`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(getMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const safeName = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const { baseHue, fontPair } = React.useMemo(() => {
    let hash = 0;
    const str = businessName || 'Brand';
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash);
    const fonts = [
      { h: 'Outfit', b: 'Inter' },
      { h: 'Playfair Display', b: 'DM Sans' },
      { h: 'Space Grotesk', b: 'Roboto' },
      { h: 'Cormorant', b: 'Montserrat' },
      { h: 'Syne', b: 'Work Sans' },
    ];
    return {
      baseHue: index % 360,
      fontPair: fonts[index % fonts.length]
    };
  }, [businessName]);

  const [customHue, setCustomHue] = useState<number | null>(null);
  const [customSat, setCustomSat] = useState<number | null>(null);

  React.useEffect(() => {
    setCustomHue(null);
    setCustomSat(null);
  }, [baseHue]);

  const currentHue = customHue !== null ? customHue : baseHue;
  const currentSat = customSat !== null ? customSat : 75;

  const brand = React.useMemo(() => {
    const accSat = Math.min(100, currentSat + 10);
    const bgSat = Math.max(0, currentSat - 60);

    const complementaryHue = (currentHue + 180) % 360;
    
    return {
      colors: {
        p: `hsl(${currentHue}, ${currentSat}%, 25%)`,
        a: `hsl(${complementaryHue}, ${accSat}%, 55%)`,
        b: `hsl(${currentHue}, ${bgSat}%, 98%)`,
      },
      fonts: fontPair
    };
  }, [currentHue, currentSat, fontPair]);

  return (
    <div className="flex flex-col gap-3">
      {/* BRAND IDENTITY */}
      <div className="bg-white dark:bg-[#21272A] rounded-lg border border-[#DDE1E6] dark:border-[#343A3F] p-3 flex flex-col gap-3 shrink-0 shadow-sm transition-colors">
        <h4 className="text-[10px] font-bold text-[#697077] dark:text-[#A2A9B0] uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5" />
          Brand Identity
        </h4>
        
        <div className="flex gap-2">
          <div className="flex-1 h-8 rounded-md shadow-inner border border-black/10" style={{ backgroundColor: brand.colors.p }} title="Primary"></div>
          <div className="flex-1 h-8 rounded-md shadow-inner border border-black/10" style={{ backgroundColor: brand.colors.a }} title="Accent"></div>
          <div className="flex-1 h-8 rounded-md shadow-inner border border-black/10" style={{ backgroundColor: brand.colors.b }} title="Background"></div>
        </div>

        <div className="flex flex-col gap-3 mt-1 mb-1">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[9px] text-[#697077] dark:text-[#A2A9B0] uppercase font-bold tracking-wider">
              <span>Hue</span>
              <span>{Math.round(currentHue)}°</span>
            </div>
            <input 
              type="range" min="0" max="360" 
              value={currentHue}
              onChange={(e) => setCustomHue(Number(e.target.value))}
              className="w-full h-1.5 bg-[#DDE1E6] dark:bg-[#343A3F] rounded-lg appearance-none cursor-pointer accent-[#0052CC]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[9px] text-[#697077] dark:text-[#A2A9B0] uppercase font-bold tracking-wider">
              <span>Saturation</span>
              <span>{Math.round(currentSat)}%</span>
            </div>
            <input 
              type="range" min="0" max="100" 
              value={currentSat}
              onChange={(e) => setCustomSat(Number(e.target.value))}
              className="w-full h-1.5 bg-[#DDE1E6] dark:bg-[#343A3F] rounded-lg appearance-none cursor-pointer accent-[#0052CC]"
            />
          </div>
        </div>

        <div className="bg-[#F8F9FA] dark:bg-[#1A1C1E] p-2.5 rounded border border-[#DDE1E6] dark:border-[#343A3F] font-mono text-[9px] text-[#4D5358] dark:text-[#A2A9B0] overflow-x-auto leading-relaxed">
<pre>{`:root {
  --font-heading: '${brand.fonts.h}', sans-serif;
  --font-body: '${brand.fonts.b}', sans-serif;
  
  --color-primary: ${brand.colors.p};
  --color-accent: ${brand.colors.a};
  --color-bg: ${brand.colors.b};
}`}</pre>
        </div>
      </div>

      {/* EXPORT OPTIONS */}
      <div className="bg-white dark:bg-[#21272A] rounded-lg border border-[#DDE1E6] dark:border-[#343A3F] p-3 flex flex-col gap-2 shrink-0 shadow-sm transition-colors">
        <h4 className="text-[10px] font-bold text-[#697077] dark:text-[#A2A9B0] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          Export Assets
        </h4>
        
        <button
          onClick={handleCopyMarkdown}
          className="flex items-center justify-between p-2 rounded border border-[#DDE1E6] dark:border-[#343A3F] hover:bg-[#F2F4F8] dark:hover:bg-[#343A3F] transition-colors group"
        >
          <span className="text-[11px] font-medium text-[#1A1C1E] dark:text-[#F1F3F5] flex items-center gap-2 transition-colors">
            {copied ? <Check className="w-3 h-3 text-[#28C840]" /> : <Copy className="w-3 h-3 text-[#697077] dark:text-[#A2A9B0] group-hover:text-[#1A1C1E] dark:group-hover:text-white transition-colors" />}
            Copy Source
          </span>
          <span className="text-[10px] text-[#878D96] dark:text-[#697077] font-mono">.md</span>
        </button>

        <button
          onClick={() => downloadFile(getMarkdown(), `${safeName}-copy.md`, 'text/markdown')}
          className="flex items-center justify-between p-2 rounded border border-[#DDE1E6] dark:border-[#343A3F] hover:bg-[#F2F4F8] dark:hover:bg-[#343A3F] transition-colors group"
        >
          <span className="text-[11px] font-medium text-[#1A1C1E] dark:text-[#F1F3F5] flex items-center gap-2 transition-colors">
            <Download className="w-3 h-3 text-[#697077] dark:text-[#A2A9B0] group-hover:text-[#1A1C1E] dark:group-hover:text-white transition-colors" />
            Download Source
          </span>
          <span className="text-[10px] text-[#878D96] dark:text-[#697077] font-mono">.md</span>
        </button>

        <button
          onClick={() => downloadFile(getHtml(), `${safeName}-copy.html`, 'text/html')}
          className="flex items-center justify-between p-2 rounded border border-[#DDE1E6] dark:border-[#343A3F] hover:bg-[#F2F4F8] dark:hover:bg-[#343A3F] transition-colors group"
        >
          <span className="text-[11px] font-medium text-[#1A1C1E] dark:text-[#F1F3F5] flex items-center gap-2 transition-colors">
            <Download className="w-3 h-3 text-[#697077] dark:text-[#A2A9B0] group-hover:text-[#1A1C1E] dark:group-hover:text-white transition-colors" />
            Static HTML
          </span>
          <span className="text-[10px] text-[#878D96] dark:text-[#697077] font-mono">.html</span>
        </button>
      </div>

      {/* LOG VIEWER ENHANCEMENT - Just visual */}
      <div className="bg-[#121619] rounded-lg p-3 flex flex-col shrink-0 text-xs font-mono shadow-xl border border-white/10 mt-auto min-h-[160px]">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
          <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Live Engine Log</span>
          <span className="text-[#28C840] text-[10px] tracking-wider">JSON_VALID</span>
        </div>
        <div className="overflow-hidden text-[#28C840]/90 leading-tight space-y-1.5 flex-1">
          <p><span className="text-[#0052CC]">POST</span> /api/generate ... <span className="text-white/90">200 OK</span></p>
          <p><span className="text-purple-400">ZOD:</span> System structure extracted</p>
          <div className="text-[10px] pl-2 border-l border-white/10 mt-2 space-y-1 truncate">
            <p>"homepage": {"{"}</p>
            <p className="pl-2 text-white/70 truncate">"headline": "{copy.homepage.headline.substring(0, 15)}...",</p>
            <p className="pl-2 text-white/70">...</p>
            <p>{"}"}</p>
          </div>
        </div>
        <div className="mt-2 text-white/30 italic text-[9px] flex justify-between">
          <span>// Auto-formatted</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
