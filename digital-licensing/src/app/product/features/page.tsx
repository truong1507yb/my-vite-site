"use client";

import React from 'react';
import { 
  Sparkles, ShieldCheck, Cpu, Search, Lock, 
  BarChart3, RefreshCw, Layers 
} from 'lucide-react';

export default function FeaturesPage() {
  const featuresList = [
    {
      icon: <Search className="w-6 h-6 text-cyan-400" />,
      title: "AI Natural Language Search",
      desc: "Search using real world sentences instead of rigid tags. Our vector similarity model scans contextual images to find matches."
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: "AI Auto Tagging & Description",
      desc: "Automatically extracts EXIF configurations, categorizes color palettes, and writes detailed SEO-friendly visual descriptions on upload."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-blue-400" />,
      title: "Reverse Image Search",
      desc: "Drag-and-drop any external image to scan our entire registry database. Instantly verify licensing rights and photographer owners."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-450" />,
      title: "Blockchain Copyright Hash",
      desc: "Every asset is cryptographically hashed (SHA-256) and signed on the digital ledger to protect creative intellectual rights permanently."
    },
    {
      icon: <Lock className="w-6 h-6 text-rose-500" />,
      title: "Smart Watermark Protection",
      desc: "Generates high quality display watermarks and temporary signed download URLs, safeguarding original raw images from scrape bots."
    },
    {
      icon: <Layers className="w-6 h-6 text-amber-500" />,
      title: "Hand-Curated Collections",
      desc: "Visual mockups and editorial directories curated by professional layout artists, grouped dynamically by color or style."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-indigo-400" />,
      title: "Real-time Earning Analytics",
      desc: "Detailed dashboard charts displaying views, download conversions, and automated monthly licensing payouts."
    }
  ];

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20 select-none">
      
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest">Technological Core</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Next-Gen AI Platform Features
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-semibold">
          Explore the industry-leading artificial intelligence and security tools driving the licensing engine behind Desenio Group.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16">
        {featuresList.map((f, idx) => (
          <div 
            key={idx} 
            className="glass-card rounded-2xl p-6 flex gap-4 hover:border-cyan-500/30 transition-all"
          >
            <div className="p-3.5 rounded-xl bg-gray-950/60 border border-gray-900 shrink-0 h-12 flex items-center justify-center">
              {f.icon}
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white mb-1.5">{f.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise CTA */}
      <div className="glass-card rounded-3xl p-8 text-center relative overflow-hidden bg-gradient-to-r from-gray-950/80 to-transparent">
        <h3 className="text-lg font-extrabold text-white mb-2">Looking for custom API integrations?</h3>
        <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed mb-6 font-semibold">
          Connect our AI search indexing system directly into your corporate workflow tool. Download thousands of vectors or assets programmatically.
        </p>
        <button 
          onClick={() => alert('Đã gửi yêu cầu API! Đội ngũ kỹ thuật của chúng tôi sẽ liên hệ trong 24 giờ.')}
          className="px-6 py-2.5 btn-neon-gradient rounded-full text-xs font-bold text-black"
        >
          Request Developer Access
        </button>
      </div>

    </div>
  );
}
