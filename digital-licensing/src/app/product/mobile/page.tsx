"use client";

import React from 'react';
import { Smartphone, Download, QrCode, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

export default function MobileAppPage() {
  return (
    <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20 select-none">
      
      {/* Glow background */}
      <div className="glow-spot-cyan top-[10%] left-[20%]" />

      {/* Hero layout: Title Left + Phone Frame Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-20">
        
        {/* Texts left */}
        <div className="md:col-span-7 text-left">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-5">
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest">Mobile Companion</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            Desenio Mobile App <br />
            <span className="text-gradient-neon">Creative Licensing on the Go</span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-400 mb-8 leading-relaxed font-semibold">
            Search millions of high-resolution digital assets, manage purchased licenses, and synchronize downloads instantly with desktop apps using QR codes.
          </p>

          {/* Download Badges */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button 
              onClick={() => alert('Đang chuyển hướng tới Apple App Store...')}
              className="px-6 py-3.5 bg-gray-950 border border-gray-800 hover:border-white rounded-xl text-xs font-bold text-white flex items-center gap-2 transition-all"
            >
              <Smartphone className="w-4.5 h-4.5" /> Download for iOS
            </button>
            <button 
              onClick={() => alert('Đang chuyển hướng tới Google Play Store...')}
              className="px-6 py-3.5 bg-gray-950 border border-gray-800 hover:border-white rounded-xl text-xs font-bold text-white flex items-center gap-2 transition-all"
            >
              <Smartphone className="w-4.5 h-4.5" /> Download for Android
            </button>
          </div>
        </div>

        {/* Mock Phone Frame Right */}
        <div className="md:col-span-5 flex justify-center">
          <div className="w-64 h-[500px] border-8 border-gray-900 rounded-[36px] bg-gray-950/80 p-3 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            {/* Speaker line */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-gray-900 rounded-full z-20" />
            
            {/* Screen Workspace */}
            <div className="flex-1 flex flex-col justify-between pt-4 pb-2 text-center text-xs select-none">
              <div className="flex justify-between items-center px-2 text-[9px] font-bold text-gray-500">
                <span>9:41 AM</span>
                <span>DESENIO PRO</span>
              </div>

              {/* Sample visual card */}
              <div className="my-auto px-4">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-900 border border-white/5 shadow-inner mb-4 relative">
                  <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-white/80" />
                  </div>
                </div>
                <h4 className="text-[11px] font-extrabold text-white">Scan to Sync Desktop</h4>
                <p className="text-[9px] text-gray-500 font-semibold mt-1">Point your phone camera to download instantly.</p>
              </div>

              {/* Home bar */}
              <div className="w-24 h-1 bg-gray-800 rounded-full mx-auto" />
            </div>
          </div>
        </div>

      </div>

      {/* Features Synchronizations row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="glass-card rounded-2xl p-5">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-3">
            <QrCode className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">QR Fast Sync</h4>
          <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">Scan QR codes on desktop to load high-res assets to your photo stream.</p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-3">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">Offline Storage</h4>
          <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">Access downloaded certificates and layout vectors without net connections.</p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-450 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">AI Mobile Lens</h4>
          <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">Take dynamic photos to instantly reverse search licenses in our registry.</p>
        </div>
      </div>

    </div>
  );
}
