"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGlobal } from '../../context/GlobalContext';
import { Masonry } from '../../components/masonry';
import { 
  Search, 
  SlidersHorizontal, 
  RefreshCw, 
  Calendar, 
  Camera, 
  Globe, 
  User, 
  BookOpen, 
  Layers
} from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const { assets } = useGlobal();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [orientationFilter, setOrientationFilter] = useState('all');
  const [resolutionFilter, setResolutionFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  // Advanced search states
  const [searchYear, setSearchYear] = useState('');
  const [searchMonth, setSearchMonth] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [searchCamera, setSearchCamera] = useState('');
  const [searchLens, setSearchLens] = useState('');
  const [searchPhotographer, setSearchPhotographer] = useState('');
  
  // Date Taken quick filters
  const [dateTakenFilter, setDateTakenFilter] = useState('all');
  const [quickCamera, setQuickCamera] = useState('all');
  const [quickLens, setQuickLens] = useState('all');
  const [quickCountry, setQuickCountry] = useState('all');

  // Load URL query params on mount
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Perform search filtering
  const filteredAssets = assets.filter(asset => {
    // 1. Text Search matching (Title, Description, Category, Tags, Camera, Lens, Country)
    const q = searchQuery.toLowerCase().trim();
    const matchesText = !q || 
      asset.title.toLowerCase().includes(q) ||
      asset.description.toLowerCase().includes(q) ||
      asset.category.toLowerCase().includes(q) ||
      (asset.country && asset.country.toLowerCase().includes(q)) ||
      (asset.cameraBrand && asset.cameraBrand.toLowerCase().includes(q)) ||
      (asset.cameraModel && asset.cameraModel.toLowerCase().includes(q)) ||
      (asset.lens && asset.lens.toLowerCase().includes(q)) ||
      asset.tags.some(t => t.toLowerCase().includes(q));

    // 2. Category matching
    const matchesCategory = categoryFilter === 'all' || 
      asset.category.toLowerCase() === categoryFilter.toLowerCase();

    // 3. Orientation matching
    let matchesOrientation = true;
    if (orientationFilter !== 'all') {
      const [w, h] = (asset.exif.resolution || "1920 x 1080").split(' x ').map(Number);
      const isLandscape = w > h;
      if (orientationFilter === 'landscape') matchesOrientation = isLandscape;
      if (orientationFilter === 'portrait') matchesOrientation = !isLandscape;
    }

    // 4. Resolution matching
    let matchesResolution = true;
    if (resolutionFilter !== 'all') {
      const [w] = (asset.exif.resolution || "1920 x 1080").split(' x ').map(Number);
      const isUltraHD = w >= 8000;
      if (resolutionFilter === 'ultrahd') matchesResolution = isUltraHD;
      if (resolutionFilter === 'hd') matchesResolution = !isUltraHD;
    }

    // 5. Date Taken Advanced Criteria (Year & Month)
    let matchesYear = true;
    if (searchYear) {
      matchesYear = !!(asset.dateTaken && asset.dateTaken.startsWith(searchYear));
    }
    let matchesMonth = true;
    if (searchMonth) {
      const monthPart = asset.dateTaken ? asset.dateTaken.substring(5, 7) : '';
      matchesMonth = monthPart === searchMonth.padStart(2, '0');
    }

    // 6. Advanced filters matching
    const matchesCountry = !searchCountry || !!(asset.country && asset.country.toLowerCase().includes(searchCountry.toLowerCase().trim()));
    const matchesCamera = !searchCamera || !!(
      (asset.cameraBrand && asset.cameraBrand.toLowerCase().includes(searchCamera.toLowerCase().trim())) ||
      (asset.cameraModel && asset.cameraModel.toLowerCase().includes(searchCamera.toLowerCase().trim()))
    );
    const matchesLens = !searchLens || !!(asset.lens && asset.lens.toLowerCase().includes(searchLens.toLowerCase().trim()));
    const matchesPhotographer = !searchPhotographer || !!(asset.copyrightHolder && asset.copyrightHolder.toLowerCase().includes(searchPhotographer.toLowerCase().trim()));

    // 7. Relative Date Taken Category: today, week, month, year
    let matchesDateTakenFilter = true;
    if (dateTakenFilter !== 'all' && asset.dateTaken) {
      const takenDateObj = new Date(asset.dateTaken);
      const diffMs = new Date().getTime() - takenDateObj.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      if (dateTakenFilter === 'today') matchesDateTakenFilter = diffDays <= 1;
      else if (dateTakenFilter === 'week') matchesDateTakenFilter = diffDays <= 7;
      else if (dateTakenFilter === 'month') matchesDateTakenFilter = diffDays <= 30;
      else if (dateTakenFilter === 'year') matchesDateTakenFilter = diffDays <= 365;
    }

    // 8. Quick sidebar filters
    const matchesQuickCamera = quickCamera === 'all' || (asset.cameraBrand && asset.cameraBrand.toLowerCase() === quickCamera.toLowerCase());
    const matchesQuickLens = quickLens === 'all' || (asset.lens && asset.lens.toLowerCase().includes(quickLens.toLowerCase()));
    const matchesQuickCountry = quickCountry === 'all' || (asset.country && asset.country.toLowerCase() === quickCountry.toLowerCase());

    return matchesText && matchesCategory && matchesOrientation && matchesResolution && 
           matchesYear && matchesMonth && matchesCountry && matchesCamera && matchesLens && 
           matchesPhotographer && matchesDateTakenFilter && matchesQuickCamera && matchesQuickLens && 
           matchesQuickCountry;
  });

  // Sort assets
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    }
    if (sortOrder === 'popular') {
      return b.downloads - a.downloads;
    }
    if (sortOrder === 'views') {
      return b.views - a.views;
    }
    return 0;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setOrientationFilter('all');
    setResolutionFilter('all');
    setSortOrder('newest');
    setSearchYear('');
    setSearchMonth('');
    setSearchCountry('');
    setSearchCamera('');
    setSearchLens('');
    setSearchPhotographer('');
    setDateTakenFilter('all');
    setQuickCamera('all');
    setQuickLens('all');
    setQuickCountry('all');
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Page Title */}
      <div className="mb-10 text-left">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Search className="w-7 h-7 text-[var(--color-primary-neon)]" /> Advanced Exif & Metadata Search
        </h1>
        <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">
          Found {sortedAssets.length} matching photographer licenses
        </p>
      </div>

      {/* Main Container: Sidebar + Results Grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
          
          {/* Main text keywords */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Search Keywords
            </h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Title, tags, info..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 focus:border-[var(--color-primary-neon)]/50 rounded-xl text-xs text-white py-2.5 px-3.5 outline-none"
              />
            </div>
          </div>

          {/* Quick filters box */}
          <div className="glass-card rounded-2xl p-5 flex flex-col gap-5">
            <div className="flex justify-between items-center pb-2 border-b border-gray-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--color-primary-neon)]" /> Advanced Filters
              </h3>
              <button 
                onClick={resetFilters} 
                className="text-[10px] font-bold text-gray-500 hover:text-[var(--color-rose-neon)] flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-2.5 h-2.5" /> Reset
              </button>
            </div>

            {/* Date Taken Relative Category filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-purple-400" /> Shot relative time
              </label>
              <select 
                value={dateTakenFilter}
                onChange={(e) => setDateTakenFilter(e.target.value)}
                className="bg-gray-950 border border-gray-800 text-xs text-white p-2.5 rounded-xl outline-none cursor-pointer"
              >
                <option value="all">Any Shot Time</option>
                <option value="today">Shot Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>

            {/* Quick Camera Brand filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Camera className="w-3 h-3 text-blue-400" /> Quick Camera Brand
              </label>
              <select 
                value={quickCamera}
                onChange={(e) => setQuickCamera(e.target.value)}
                className="bg-gray-950 border border-gray-800 text-xs text-white p-2.5 rounded-xl outline-none cursor-pointer"
              >
                <option value="all">All Brands</option>
                <option value="sony">Sony</option>
                <option value="canon">Canon</option>
                <option value="fujifilm">Fujifilm</option>
              </select>
            </div>

            {/* Quick Lens filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-orange-400" /> Quick Lens Filter
              </label>
              <select 
                value={quickLens}
                onChange={(e) => setQuickLens(e.target.value)}
                className="bg-gray-950 border border-gray-800 text-xs text-white p-2.5 rounded-xl outline-none cursor-pointer"
              >
                <option value="all">All Lenses</option>
                <option value="24-70mm">24-70mm</option>
                <option value="50mm">50mm</option>
                <option value="100-200mm">100-200mm</option>
              </select>
            </div>

            {/* Quick Country filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-emerald-400" /> Quick Country Filter
              </label>
              <select 
                value={quickCountry}
                onChange={(e) => setQuickCountry(e.target.value)}
                className="bg-gray-950 border border-gray-800 text-xs text-white p-2.5 rounded-xl outline-none cursor-pointer"
              >
                <option value="all">All Countries</option>
                <option value="vietnam">Vietnam</option>
                <option value="japan">Japan</option>
                <option value="iceland">Iceland</option>
                <option value="finland">Finland</option>
              </select>
            </div>
          </div>

          {/* Advanced EXIF fields card */}
          <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-gray-850">
              Manual EXIF Filters
            </h3>

            {/* Year & Month of Taken Date */}
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-gray-500 uppercase">Year</label>
                <input 
                  type="text" 
                  placeholder="2026"
                  value={searchYear}
                  onChange={(e) => setSearchYear(e.target.value)}
                  className="bg-gray-950 border border-gray-800 rounded-lg text-xs text-white p-2 outline-none"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-gray-500 uppercase">Month (01-12)</label>
                <input 
                  type="text" 
                  placeholder="07"
                  value={searchMonth}
                  onChange={(e) => setSearchMonth(e.target.value)}
                  className="bg-gray-950 border border-gray-800 rounded-lg text-xs text-white p-2 outline-none"
                />
              </div>
            </div>

            {/* Camera */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-bold text-gray-500 uppercase flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-blue-500" /> Camera Model
              </label>
              <input 
                type="text" 
                placeholder="e.g. EOS R5"
                value={searchCamera}
                onChange={(e) => setSearchCamera(e.target.value)}
                className="bg-gray-950 border border-gray-800 rounded-lg text-xs text-white p-2 outline-none"
              />
            </div>

            {/* Lens */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-bold text-gray-500 uppercase flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-orange-500" /> Lens Model
              </label>
              <input 
                type="text" 
                placeholder="e.g. f/2.8 GM"
                value={searchLens}
                onChange={(e) => setSearchLens(e.target.value)}
                className="bg-gray-950 border border-gray-800 rounded-lg text-xs text-white p-2 outline-none"
              />
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-bold text-gray-500 uppercase flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-emerald-500" /> Location Country
              </label>
              <input 
                type="text" 
                placeholder="e.g. Iceland"
                value={searchCountry}
                onChange={(e) => setSearchCountry(e.target.value)}
                className="bg-gray-950 border border-gray-800 rounded-lg text-xs text-white p-2 outline-none"
              />
            </div>

            {/* Photographer */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-bold text-gray-500 uppercase flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-pink-500" /> Photographer / copyright
              </label>
              <input 
                type="text" 
                placeholder="e.g. Sophia"
                value={searchPhotographer}
                onChange={(e) => setSearchPhotographer(e.target.value)}
                className="bg-gray-950 border border-gray-800 rounded-lg text-xs text-white p-2 outline-none"
              />
            </div>
          </div>

          {/* Standard Next select categories */}
          <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Category Stream
            </h3>
            <div className="flex flex-col gap-2">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-gray-950 border border-gray-800 text-xs text-white p-2.5 rounded-xl outline-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="nature">Nature</option>
                <option value="urban">Urban & Streets</option>
                <option value="architecture">Architecture</option>
              </select>
            </div>
          </div>

        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          {sortedAssets.length > 0 ? (
            <Masonry assets={sortedAssets} />
          ) : (
            <div className="text-center py-20 bg-gray-950/20 border border-gray-900/50 rounded-3xl p-8">
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-gray-500 mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">No matches found</h3>
              <p className="text-xs text-gray-500 font-medium">Try modifying your query or resetting filters above.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-xs text-gray-500 font-semibold uppercase tracking-widest animate-pulse font-mono">Running EXIF semantic search queries...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
