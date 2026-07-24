"use client";

import React, { use, useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGlobal } from '../../context/GlobalContext';
import { Masonry } from '../../components/masonry';
import { 
  Sparkles, Search, SlidersHorizontal, ArrowUpRight, 
  MapPin, CheckCircle2, ChevronRight, Eye 
} from 'lucide-react';

const CATEGORIES_META: Record<string, { title: string; desc: string; banner: string; tags: string[] }> = {
  nature: {
    title: "Nature & Wilderness Licensing",
    desc: "Breathtaking landscapes, deep forests, wild creatures, and silent shores captured by verified outdoor creatives.",
    banner: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    tags: ["Iceland", "desert", "dunes", "wildlife", "fog", "sunrise", "mountains"]
  },
  business: {
    title: "Corporate & Teamwork Visuals",
    desc: "Modern office environments, collaborative teams, financial analytics, and workplace design for branding campaigns.",
    banner: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    tags: ["workspace", "collaboration", "startup", "strategy", "presentation", "financial"]
  },
  technology: {
    title: "Future Tech & Cybersecurity",
    desc: "AI neural networks, glowing server clusters, raw hardware electronics, and futuristic city lights.",
    banner: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80",
    tags: ["AI", "cyberpunk", "server", "coding", "robotics", "VR", "electronics"]
  },
  architecture: {
    title: "Modernist Structures & Geometry",
    desc: "Raw concrete bridges, symmetrical spiral staircases, and glass skyscraper highlights.",
    banner: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80",
    tags: ["stairs", "minimalism", "suspension", "steel", "concrete", "interior", "curves"]
  },
  luxury: {
    title: "High-End Luxury Aesthetics",
    desc: "Premium visual assets, editorial styling, gold textures, and clean luxury branding setups.",
    banner: "https://images.unsplash.com/photo-1493397862567-47fee858683f?w=1200&auto=format&fit=crop&q=80",
    tags: ["gold", "minimal", "interior", "editorial", "branding", "premium", "metallic"]
  }
};

function DiscoverContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { assets, photographers } = useGlobal();

  const [activeCategory, setActiveCategory] = useState('nature');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  // Load category from search params on mount
  useEffect(() => {
    const cat = searchParams.get('c');
    if (cat && CATEGORIES_META[cat.toLowerCase()]) {
      setActiveCategory(cat.toLowerCase());
    }
  }, [searchParams]);

  const meta = CATEGORIES_META[activeCategory] || CATEGORIES_META.nature;

  // Filter assets matching this category
  const filteredAssets = assets.filter(asset => {
    const isCategoryMatch = asset.discoveryCategories.some(
      c => c.toLowerCase() === activeCategory.toLowerCase()
    );
    const isSearchMatch = !searchQuery.trim() || 
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      asset.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return isCategoryMatch && isSearchMatch;
  });

  // Sort assets
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sortOrder === 'newest') return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    if (sortOrder === 'popular') return b.downloads - a.downloads;
    return 0;
  });

  const getPhotographer = (id: string) => {
    return photographers.find(p => p.id === id);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    router.push(`/discover?c=${cat}`);
  };

  return (
    <div className="relative w-full pb-16">
      
      {/* Category selection bar */}
      <div className="bg-gray-950/80 backdrop-blur-md border-b border-gray-900 sticky top-16 z-30 py-3.5 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex gap-2">
            {Object.keys(CATEGORIES_META).map(catKey => (
              <button 
                key={catKey}
                onClick={() => handleCategoryChange(catKey)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                  activeCategory === catKey
                    ? 'border-[var(--color-primary-neon)] bg-[var(--color-primary-neon)]/15 text-[var(--color-primary-neon)]'
                    : 'border-gray-900 text-gray-500 hover:text-white'
                }`}
              >
                {catKey}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 shrink-0">
            <span>SORT:</span>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-gray-900 border border-gray-800 text-xs text-white rounded-lg px-2.5 py-1 outline-none cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hero Category Banner */}
      <section className="h-72 w-full relative overflow-hidden bg-gray-950 flex items-center select-none">
        <img src={meta.banner} alt="Category Banner" className="w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
            <span className="text-[10px] font-extrabold text-[var(--color-primary-neon)] tracking-widest uppercase block mb-2">Discovery Streams</span>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-3">{meta.title}</h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium max-w-xl leading-relaxed">{meta.desc}</p>
          </div>
        </div>
      </section>

      {/* Suggested Tags & Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-900/60 mb-10 select-none">
        
        {/* Category tags suggestions */}
        <div className="flex flex-wrap gap-2 items-center text-[10px] font-semibold text-gray-500">
          <span>Trending Tags:</span>
          {meta.tags.map(tag => (
            <button 
              key={tag}
              onClick={() => {
                setSearchQuery(tag);
              }}
              className="px-2.5 py-1 bg-gray-900 border border-gray-800 hover:border-white text-gray-300 rounded-full transition-all"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Local Search input */}
        <div className="w-full md:w-80 relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder={`Search ${activeCategory}...`} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 focus:border-[var(--color-primary-neon)]/50 rounded-xl text-xs text-white py-2.5 pl-10 pr-4 outline-none"
          />
        </div>

      </section>

      {/* Featured Photographers block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 select-none">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Featured Creators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {photographers.slice(0, 4).map(p => (
            <div key={p.id} className="p-4 bg-gray-950/40 border border-gray-900 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/5">
                  <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-0.5">
                    {p.name}
                    {p.verified && <CheckCircle2 className="w-3 h-3 text-[var(--color-primary-neon)] fill-black" />}
                  </h4>
                  <span className="text-[9px] text-gray-500 font-semibold">@{p.username}</span>
                </div>
              </div>
              <button 
                onClick={() => router.push(`/photographer/${p.id}`)}
                className="p-1.5 hover:bg-gray-900 rounded-lg text-gray-500 hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Grid rendering */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sortedAssets.length > 0 ? (
          <Masonry assets={sortedAssets} />
        ) : (
          <div className="text-center py-20 bg-gray-950/20 border border-gray-900 rounded-3xl p-8 max-w-lg mx-auto">
            <p className="text-gray-500 text-xs font-semibold">No assets found in this category matching search filters.</p>
          </div>
        )}
      </section>

    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-xs text-gray-500 font-semibold uppercase tracking-widest animate-pulse font-mono">Loading discovery streams...</div>
      </div>
    }>
      <DiscoverContent />
    </Suspense>
  );
}
