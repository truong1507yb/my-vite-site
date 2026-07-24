"use client";

import React, { use, useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MOCK_INSPIRATION, InspirationItem } from '../../lib/mockData';
import { 
  Sparkles, Search, SlidersHorizontal, Eye, Heart, 
  Share2, ArrowUpRight, Bookmark, BookmarkCheck 
} from 'lucide-react';

function InspirationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeFilter, setActiveFilter] = useState<'newest' | 'trending' | 'views'>('newest');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom interactive saves list
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [itemsList, setItemsList] = useState<InspirationItem[]>(MOCK_INSPIRATION);

  // Sync tab query params from navbar
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      if (tab === 'trending') setActiveFilter('trending');
      if (tab === 'editor-choice' || tab === 'ai-recommended') setActiveFilter('newest');
    }
  }, [searchParams]);

  const toggleSave = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(prev => prev.filter(item => item !== id));
      setItemsList(prev => prev.map(item => item.id === id ? { ...item, likes: item.likes - 1 } : item));
    } else {
      setSavedIds(prev => [...prev, id]);
      setItemsList(prev => prev.map(item => item.id === id ? { ...item, likes: item.likes + 1 } : item));
      alert("Đã lưu vào bảng cảm hứng sáng tạo của bạn!");
    }
  };

  const handleShare = (title: string) => {
    navigator.clipboard.writeText(window.location.href);
    alert(`Đã sao chép liên kết chia sẻ cho "${title}"!`);
  };

  // Perform search / filtering
  const filteredItems = itemsList.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    const matchesText = !q || item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
    const matchesCat = activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesText && matchesCat;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (activeFilter === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (activeFilter === 'trending') return b.likes - a.likes;
    if (activeFilter === 'views') return b.views - a.views;
    return 0;
  });

  return (
    <div className="relative w-full pb-16">
      
      {/* Hero Banner Section */}
      <section className="relative min-h-[45vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-gray-950/20 border-b border-gray-900">
        <div className="glow-spot-purple top-[5%] left-[10%]" />
        
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest">Design Moodboard</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-none mb-4">
          Creative Inspiration Hub
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mb-8 leading-relaxed font-semibold">
          Unlock your next branding campaign, layout poster, or dark website theme with collections compiled by leading product directors.
        </p>

        {/* Local Search Input */}
        <div className="w-full max-w-lg relative">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search moodboards (e.g. mockups, grids)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 focus:border-purple-500/50 text-xs text-white py-3.5 pl-11 pr-4 rounded-xl outline-none"
          />
        </div>
      </section>

      {/* Categories & Sorting Filters Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-900/60 mb-10">
        
        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
          {['all', 'branding', 'poster', 'website', 'social media', 'architecture', 'seasonal'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 border rounded-full transition-all ${
                activeCategory === cat 
                  ? 'border-white bg-white text-black' 
                  : 'border-gray-900 hover:border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort order Selector */}
        <div className="flex items-center gap-3 text-xs font-bold text-gray-400 shrink-0">
          <span className="flex items-center gap-1"><SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" /> SORT BY:</span>
          <div className="flex gap-2">
            {(['newest', 'trending', 'views'] as const).map(f => (
              <button 
                key={f} 
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-lg border transition-all uppercase tracking-wider text-[9px] ${
                  activeFilter === f 
                    ? 'border-purple-500 bg-purple-500/10 text-purple-300' 
                    : 'border-gray-900 hover:border-gray-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

      </section>

      {/* Grid: Inspiration Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedItems.map(item => {
              const saved = savedIds.includes(item.id);
              
              return (
                <div key={item.id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div>
                    {/* Cover Frame */}
                    <div className="aspect-[16/10] bg-gray-900 overflow-hidden relative">
                      <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white uppercase tracking-widest px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="p-5">
                      <div className="flex justify-between items-center text-[10px] text-gray-500 font-semibold mb-2">
                        <span>by {item.author}</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-base font-extrabold text-white leading-tight mb-2 hover:text-purple-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-medium mb-4">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Metrics Bottom */}
                  <div className="p-5 border-t border-gray-900/60 flex items-center justify-between gap-4">
                    {/* Metrics Left */}
                    <div className="flex items-center gap-3 text-gray-500 font-semibold text-[10px]">
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {item.views.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {item.likes.toLocaleString()}</span>
                    </div>

                    {/* Button actions right */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleSave(item.id)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                          saved 
                            ? 'bg-purple-500 border-purple-500 text-black shadow-[0_0_10px_rgba(124,58,237,0.3)]' 
                            : 'border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white'
                        }`}
                        title="Save to Board"
                      >
                        {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => handleShare(item.title)}
                        className="w-8 h-8 rounded-lg border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition-all"
                        title="Copy Share Link"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => router.push(`/search?q=${encodeURIComponent(item.category)}`)}
                        className="h-8 px-4 rounded-lg bg-gray-900 border border-gray-800 hover:border-white text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1 transition-all"
                      >
                        Explore <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-950/20 border border-gray-900 rounded-3xl p-8 max-w-lg mx-auto">
            <p className="text-xs text-gray-500 font-semibold">No moodboards match your active search terms.</p>
          </div>
        )}
      </section>

    </div>
  );
}

export default function InspirationPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-xs text-gray-500 font-semibold uppercase tracking-widest animate-pulse font-mono">Loading creative moodboards...</div>
      </div>
    }>
      <InspirationContent />
    </Suspense>
  );
}
