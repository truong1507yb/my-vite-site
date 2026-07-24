"use client";

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobal } from '../../../context/GlobalContext';
import { 
  ChevronLeft, Camera, Calendar, ShieldCheck, Heart, 
  ShoppingCart, Info, Copy, Sparkles, CheckCircle2, ArrowRight, Layers, Award
} from 'lucide-react';
import { AiEditorModal } from '../../../components/AiEditorModal';

interface Params {
  id: string;
}

export default function ImageDetailPage({ params }: { params: Promise<Params> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const assetId = unwrappedParams.id;

  const { assets, photographers, addToCart, toggleFavorite, isFavorite } = useGlobal();

  // Fetch asset and photographer details
  const asset = assets.find(a => a.id === assetId);
  const p = asset ? photographers.find(p => p.id === asset.photographerId) : null;

  // Selected license configuration state
  const [selectedLicense, setSelectedLicense] = useState<'personal' | 'commercial' | 'extended' | 'exclusive'>('commercial');

  // AI Editor & Active version states
  const [isAiEditorOpen, setIsAiEditorOpen] = useState(false);
  const [activePreviewUrl, setActivePreviewUrl] = useState('');

  // Sync preview URL when asset loads - always default to Original image!
  useEffect(() => {
    if (asset) {
      const originalVersion = asset.versions.find(v => v.name.toLowerCase() === 'original' || v.id.endsWith('_orig')) || asset.versions[0];
      setActivePreviewUrl(originalVersion ? originalVersion.url : asset.originalUrl);
    }
  }, [asset]);

  if (!asset || !p) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Tác phẩm không tồn tại</h2>
        <Link href="/" className="text-xs text-[var(--color-primary-neon)] hover:underline">Quay lại trang chủ</Link>
      </div>
    );
  }

  const favorite = isFavorite(asset.id);
  const currentPrice = asset.prices[selectedLicense];

  // Calculate AI suggested assets (same category, excluding current one)
  const similarAssets = assets
    .filter(a => a.category === asset.category && a.id !== asset.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(asset, selectedLicense);
    alert(`Đã thêm "${asset.title}" (${selectedLicense.toUpperCase()} LICENSE) vào giỏ hàng thành công!`);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Navigation Row */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => router.back()} className="text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to gallery
        </button>
        
        <button 
          onClick={() => toggleFavorite(asset.id)}
          className={`flex items-center gap-1.5 text-xs font-semibold px-4.5 py-2 rounded-full border transition-all ${
            favorite 
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' 
              : 'border-gray-800 text-gray-300 hover:border-gray-700 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} /> 
          {favorite ? 'Added to Favorites' : 'Add to Favorites'}
        </button>
      </div>

      {/* Main Grid: Preview Left + Purchase Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Column: Image Workspace */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="relative bg-gray-950/70 border border-gray-900 rounded-3xl p-6 flex items-center justify-center min-h-[40vh] md:min-h-[60vh] overflow-hidden select-none">
            
            {/* Watermark grid overlay */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-4 grid-rows-4 opacity-[0.03] text-[9px] font-black text-white select-none">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center transform -rotate-45 uppercase tracking-widest">
                  DESENIO LICENSING
                </div>
              ))}
            </div>

            <img 
              src={activePreviewUrl} 
              alt={asset.title} 
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl relative z-10"
            />
          </div>

          {/* Version Switcher and AI Edit controls */}
          <div className="glass-card rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-[var(--color-primary-neon)]" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Image Versions ({asset.versions.length})</h4>
                <select 
                  value={asset.versions.find(v => v.url === activePreviewUrl)?.id || ''}
                  onChange={(e) => {
                    const selected = asset.versions.find(v => v.id === e.target.value);
                    if (selected) setActivePreviewUrl(selected.url);
                  }}
                  className="bg-gray-950 border border-gray-800 text-[11px] text-gray-300 font-bold p-1.5 rounded-lg outline-none cursor-pointer mt-1"
                >
                  {asset.versions.map(v => (
                    <option key={v.id} value={v.id}>{v.name} {v.isPrimary ? '(Primary)' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              onClick={() => setIsAiEditorOpen(true)}
              className="px-5 py-2.5 bg-purple-950/20 border border-purple-500/20 hover:border-purple-500/60 rounded-xl text-xs font-extrabold text-purple-300 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-4 h-4" /> Chỉnh sửa bằng AI
            </button>
          </div>

          {/* EXIF Data Panel */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-1.5 border-b border-gray-900 pb-3">
              <Camera className="w-4.5 h-4.5 text-[var(--color-primary-neon)]" /> Camera Exif & Geo Metadata
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
              <div>
                <span className="text-gray-500 d-block font-semibold mb-0.5">CAMERA</span>
                <strong className="text-gray-200">{asset.cameraBrand} {asset.cameraModel}</strong>
              </div>
              <div>
                <span className="text-gray-500 d-block font-semibold mb-0.5">LENS</span>
                <strong className="text-gray-200">{asset.lens}</strong>
              </div>
              <div>
                <span className="text-gray-500 d-block font-semibold mb-0.5">FOCAL LENGTH</span>
                <strong className="text-gray-200">{asset.focalLength}</strong>
              </div>
              <div>
                <span className="text-gray-500 d-block font-semibold mb-0.5">APERTURE</span>
                <strong className="text-gray-200">{asset.aperture}</strong>
              </div>
              <div>
                <span className="text-gray-500 d-block font-semibold mb-0.5">SHUTTER SPEED</span>
                <strong className="text-gray-200">{asset.shutterSpeed}</strong>
              </div>
              <div>
                <span className="text-gray-500 d-block font-semibold mb-0.5">ISO</span>
                <strong className="text-gray-200">{asset.iso}</strong>
              </div>
              <div>
                <span className="text-gray-500 d-block font-semibold mb-0.5">RESOLUTION</span>
                <strong className="text-gray-200">{asset.exif.resolution}</strong>
              </div>
              <div>
                <span className="text-gray-500 d-block font-semibold mb-0.5">DATE TAKEN</span>
                <strong className="text-gray-200">{asset.dateTaken}</strong>
              </div>
              <div>
                <span className="text-gray-500 d-block font-semibold mb-0.5">UPLOAD DATE</span>
                <strong className="text-gray-200">{asset.uploadDate}</strong>
              </div>
              <div>
                <span className="text-gray-500 d-block font-semibold mb-0.5">COUNTRY</span>
                <strong className="text-gray-200">{asset.country}</strong>
              </div>
              <div>
                <span className="text-gray-500 d-block font-semibold mb-0.5">CITY</span>
                <strong className="text-gray-200">{asset.city}</strong>
              </div>
              <div>
                <span className="text-gray-500 d-block font-semibold mb-0.5">FILE SIZE</span>
                <strong className="text-gray-200">24.5 MB</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: License Options & Purchases */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Main Info Box */}
          <div className="glass-card rounded-3xl p-6">
            <div className="border-b border-gray-900 pb-4 mb-4">
              <h1 className="text-2xl font-extrabold text-white leading-tight">{asset.title}</h1>
              <span className="text-[10px] font-bold text-[var(--color-primary-neon)] uppercase tracking-wider mt-1.5 inline-block">
                {asset.category}
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-6 font-medium">
              {asset.description}
            </p>

            {/* Photographer card */}
            <div className="flex items-center gap-3 p-3 bg-gray-950/40 border border-gray-900 rounded-2xl mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  {p.name}
                  {p.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary-neon)] fill-black" />}
                </h4>
                <p className="text-[10px] text-gray-500 font-semibold mt-0.5 truncate">@{p.username}</p>
              </div>
              <Link href={`/photographer/${p.id}`} className="text-[10px] font-bold text-[var(--color-primary-neon)] hover:underline shrink-0">
                Portfolio
              </Link>
            </div>

            {/* Discovery Categories tags */}
            {asset.discoveryCategories && asset.discoveryCategories.length > 0 && (
              <div className="border-t border-gray-900/60 pt-4 mb-4">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Discovery Streams</span>
                <div className="flex flex-wrap gap-1.5">
                  {asset.discoveryCategories.map(dc => (
                    <Link 
                      key={dc} 
                      href={`/discover?c=${dc.toLowerCase()}`}
                      className="bg-purple-500/10 border border-purple-500/25 text-[9px] font-bold text-purple-300 px-2 py-0.5 rounded-full"
                    >
                      {dc}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* AI Edit History logs */}
            {asset.aiHistory && asset.aiHistory.length > 0 && (
              <div className="border-t border-gray-900/60 pt-4">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block mb-2">AI Edit History</span>
                <div className="flex flex-col gap-2 font-mono text-[9px] text-gray-400 max-h-24 overflow-y-auto">
                  {asset.aiHistory.map(log => (
                    <div key={log.id} className="flex justify-between items-center bg-gray-950/40 p-2 border border-gray-900 rounded-lg">
                      <span className="truncate max-w-[70%]">{log.action}</span>
                      <span className="text-gray-600 shrink-0">{log.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Copyright Information Panel */}
          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-gray-900 mb-4">
              <Award className="w-4.5 h-4.5 text-amber-500" /> Copyright Protection
            </h3>
            
            <div className="flex flex-col gap-3 text-[11px] font-medium text-gray-450">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-900/40">
                <span>Copyright Holder</span>
                <strong className="text-white">© {asset.copyrightHolder || p.name}</strong>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-900/40">
                <span>Copyright Year</span>
                <strong className="text-white">{asset.copyrightYear || 2026}</strong>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-900/40">
                <span>Date Taken</span>
                <strong className="text-white">{asset.dateTaken}</strong>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-900/40">
                <span>Asset ID</span>
                <strong className="text-white font-mono">{asset.id}</strong>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-900/40">
                <span>Original Upload Date</span>
                <strong className="text-white">{asset.uploadDate}</strong>
              </div>
              <div className="flex flex-col gap-1.5 py-1.5 border-b border-gray-900/40">
                <span>Original File Hash (SHA-255)</span>
                <strong className="text-[9px] text-gray-500 font-mono break-all bg-black/40 p-2 rounded-lg border border-gray-900">{asset.assetHash}</strong>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-900/40">
                <span>Copyright Status</span>
                <strong className="text-emerald-450 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 text-[8px] font-bold uppercase">
                  Protected
                </strong>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span>Verification Status</span>
                <strong className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase border ${
                  asset.verificationStatus === 'verified'
                    ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-450'
                    : 'border-amber-500/25 bg-amber-500/10 text-amber-500'
                }`}>
                  {asset.verificationStatus}
                </strong>
              </div>
            </div>
          </div>

          {/* License Selection Box */}
          <div className="glass-card rounded-3xl p-6 flex flex-col gap-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-gray-900">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Digital Asset License
            </h3>

            {/* Licenses radio listing */}
            <div className="flex flex-col gap-3">
              
              {/* Personal */}
              <label 
                className={`flex justify-between items-center p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedLicense === 'personal' 
                    ? 'border-[var(--color-primary-neon)]/60 bg-gray-950/50' 
                    : 'border-gray-900 hover:border-gray-800 bg-transparent'
                }`}
                onClick={() => setSelectedLicense('personal')}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Personal License</span>
                  <span className="text-[10px] text-gray-500 font-semibold mt-0.5">Individual use, non-commercial</span>
                </div>
                <strong className="text-sm font-bold text-gray-200">${asset.prices.personal}</strong>
              </label>

              {/* Commercial */}
              <label 
                className={`flex justify-between items-center p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedLicense === 'commercial' 
                    ? 'border-[var(--color-primary-neon)]/60 bg-gray-950/50' 
                    : 'border-gray-900 hover:border-gray-800 bg-transparent'
                }`}
                onClick={() => setSelectedLicense('commercial')}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Commercial License</span>
                  <span className="text-[10px] text-gray-500 font-semibold mt-0.5">Marketing, ads, websites</span>
                </div>
                <strong className="text-sm font-bold text-gray-200">${asset.prices.commercial}</strong>
              </label>

              {/* Extended */}
              <label 
                className={`flex justify-between items-center p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedLicense === 'extended' 
                    ? 'border-[var(--color-primary-neon)]/60 bg-gray-950/50' 
                    : 'border-gray-900 hover:border-gray-800 bg-transparent'
                }`}
                onClick={() => setSelectedLicense('extended')}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Extended License</span>
                  <span className="text-[10px] text-gray-500 font-semibold mt-0.5">Resale products, print on demand</span>
                </div>
                <strong className="text-sm font-bold text-gray-200">${asset.prices.extended}</strong>
              </label>

              {/* Exclusive */}
              <label 
                className={`flex justify-between items-center p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedLicense === 'exclusive' 
                    ? 'border-[var(--color-primary-neon)]/60 bg-gray-950/50' 
                    : 'border-gray-900 hover:border-gray-800 bg-transparent'
                }`}
                onClick={() => setSelectedLicense('exclusive')}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Exclusive Buyout</span>
                  <span className="text-[10px] text-gray-500 font-semibold mt-0.5">Asset removed from marketplace</span>
                </div>
                <strong className="text-sm font-bold text-gray-200">${asset.prices.exclusive}</strong>
              </label>

            </div>

            {/* Price display and CTA button */}
            <div className="pt-3 border-t border-gray-900 flex flex-col gap-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Price:</span>
                <span className="text-2xl font-extrabold text-[var(--color-primary-neon)]">${currentPrice}</span>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full py-3.5 btn-neon-gradient rounded-xl font-extrabold text-xs flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4.5 h-4.5 text-black" /> Add to Cart
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* AI Suggested Similar Assets section */}
      {similarAssets.length > 0 && (
        <section className="border-t border-gray-900/60 pt-16">
          <div className="flex items-center gap-1.5 mb-10">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">AI Suggested Visuals</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarAssets.map(sa => (
              <Link key={sa.id} href={`/image/${sa.id}`} className="group relative rounded-2xl overflow-hidden aspect-[4/3] block bg-gray-900 border border-gray-950 hover:border-[var(--color-primary-neon)]/30 transition-all">
                <img src={sa.thumbnailUrl} alt={sa.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <h4 className="text-xs font-bold text-white truncate">{sa.title}</h4>
                  <span className="text-[9px] text-[var(--color-primary-neon)] font-bold mt-0.5">{sa.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* AI Editor Modal Overlay */}
      {isAiEditorOpen && (
        <AiEditorModal 
          assetId={asset.id}
          originalUrl={asset.originalUrl}
          onClose={() => setIsAiEditorOpen(false)}
        />
      )}

    </div>
  );
}
