"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobal } from '../context/GlobalContext';
import { Masonry } from '../components/masonry';
import { MOCK_COLLECTIONS } from '../lib/mockData';
import { 
  Search, SlidersHorizontal, ArrowRight, ShieldCheck, Sparkles, 
  TrendingUp, Award, Layers, Users, Zap, Check, CheckCircle2 
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { assets, upgradeMembership, membership } = useGlobal();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'nature' | 'urban' | 'architecture'>('all');

  // Filter featured assets based on activeTab
  const featuredAssets = assets.filter(asset => {
    const isTabMatch = activeTab === 'all' || asset.category.toLowerCase() === activeTab;
    return isTabMatch;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handlePricingUpgrade = (plan: 'Starter' | 'Pro' | 'Business') => {
    upgradeMembership(plan);
    alert(`Cảm ơn bạn đã đăng ký gói ${plan}! Gói hội viên của bạn đã được kích hoạt.`);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      
      {/* Glow backgrounds */}
      <div className="glow-spot-cyan top-[10%] left-[5%]" />
      <div className="glow-spot-purple top-[40%] right-[5%]" />

      {/* Hero Banner Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 border-b border-gray-900/60">
        
        {/* Animated badge */}
        <div className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary-neon)]" />
          <span className="text-[10px] font-bold text-gray-200 uppercase tracking-widest">Next-Gen Creative Licensing</span>
        </div>

        {/* Large premium title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none max-w-5xl mb-6">
          The Ultimate Source for <br className="hidden sm:inline" />
          <span className="text-gradient-neon">Digital Asset Licensing</span>
        </h1>

        <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed font-medium">
          Discover millions of high-fidelity, verified photos and videos with AI-powered semantic search and secure digital copyright assurance.
        </p>

        {/* Central Large Search Box */}
        <div className="w-full max-w-2xl mb-6 relative z-10">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-[0_15px_40px_rgba(0,0,0,0.4)] rounded-full">
            <Search className="absolute left-5 w-5 h-5 text-gray-400 pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search with AI (e.g., 'misty mountains at golden hour with dramatic lighting')..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-950/80 backdrop-blur-xl border-2 border-gray-900 focus:border-[var(--color-primary-neon)]/60 text-sm text-white py-4 pl-14 pr-32 rounded-full outline-none transition-all duration-300"
            />
            <button 
              type="submit" 
              className="absolute right-2 px-6 py-2.5 rounded-full btn-neon-gradient text-xs font-bold transition-all"
            >
              Search
            </button>
          </form>
        </div>

        {/* Search Suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-gray-500 font-semibold max-w-lg">
          <span>Try searching for:</span>
          <Link href="/search?q=cyberpunk" className="text-gray-300 hover:text-[var(--color-primary-neon)] transition-colors">cyberpunk</Link>
          <span>•</span>
          <Link href="/search?q=iceland" className="text-gray-300 hover:text-[var(--color-primary-neon)] transition-colors">iceland</Link>
          <span>•</span>
          <Link href="/search?q=stairs" className="text-gray-300 hover:text-[var(--color-primary-neon)] transition-colors">stairs minimalism</Link>
        </div>

      </section>

      {/* Statistics Section (Startup style) */}
      <section className="py-12 bg-gray-950/40 border-b border-gray-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-extrabold text-white">500,000+</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Premium Assets</span>
          </div>
          <div className="flex flex-col border-y sm:border-y-0 sm:border-x border-gray-900 py-6 sm:py-0">
            <span className="text-3xl sm:text-4xl font-extrabold text-white">50,000+</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Verified Creators</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-extrabold text-white">100+</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Countries Active</span>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Curated Collections</h2>
            <p className="text-sm text-gray-400 mt-2 font-medium">Explore fine-art galleries curated by professional editors.</p>
          </div>
          <Link href="/search" className="text-xs font-bold text-[var(--color-primary-neon)] hover:underline flex items-center gap-1">
            Browse all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_COLLECTIONS.map((c) => (
            <Link key={c.id} href={`/search?q=${encodeURIComponent(c.title)}`} className="group relative rounded-2xl overflow-hidden aspect-[4/3] block bg-gray-900">
              {/* Image Frame */}
              <img 
                src={c.coverUrl} 
                alt={c.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent p-6 flex flex-col justify-end">
                <span className="text-[9px] font-bold text-[var(--color-primary-neon)] uppercase tracking-widest">{c.assetCount} Assets</span>
                <h3 className="text-lg font-bold text-white mt-1 leading-tight group-hover:text-[var(--color-primary-neon)] transition-colors">{c.title}</h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Grid: Featured Assets with Tabs */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-900/60">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Trending Assets</h2>
            <p className="text-sm text-gray-400 mt-2 font-medium">Explore licensing assets trending globally right now.</p>
          </div>
          
          {/* Tab selection */}
          <div className="flex flex-wrap gap-2 text-xs font-bold text-gray-400">
            {(['all', 'nature', 'urban', 'architecture'] as const).map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-4.5 py-2 rounded-full border border-gray-900 hover:border-gray-800 transition-all uppercase tracking-wider ${
                  activeTab === tab 
                    ? 'bg-white text-black border-white hover:border-white shadow-lg' 
                    : ''
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry layout rendering */}
        <Masonry assets={featuredAssets} />
      </section>

      {/* Pricing Membership Section */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-900/60">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Flexible Membership Plans</h2>
          <p className="text-sm sm:text-base text-gray-400 mt-3 font-medium">
            Unlock ultimate downloads, verified digital licensing agreements, and priority support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Starter */}
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Starter</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">Perfect for individual developers and designers starting out.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-white">$19</span>
                <span className="text-xs text-gray-500 font-semibold">/month</span>
              </div>
              
              <ul className="flex flex-col gap-3.5 text-xs text-gray-300 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-primary-neon)]" /> 10 Downloads per month</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-primary-neon)]" /> Personal License Agreement</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-primary-neon)]" /> Standard Resolution</li>
                <li className="flex items-center gap-2 text-gray-500"><X className="w-4 h-4" /> Extended license usage</li>
              </ul>
            </div>
            
            <button 
              onClick={() => handlePricingUpgrade('Starter')}
              className="w-full mt-8 py-3 rounded-xl border border-gray-800 hover:border-white font-bold text-xs text-white bg-transparent transition-all"
            >
              {membership === 'Starter' ? 'Current Plan' : 'Subscribe Now'}
            </button>
          </div>

          {/* Card 2: Pro (Featured) */}
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between border-[var(--color-primary-neon)]/30 relative overflow-hidden bg-gradient-to-b from-gray-900/40 via-gray-900/10 to-transparent">
            {/* Featured Badge */}
            <div className="absolute top-4 right-4 bg-[var(--color-primary-neon)]/15 border border-[var(--color-primary-neon)]/35 text-[9px] font-bold text-[var(--color-primary-neon)] px-3 py-1 rounded-full uppercase tracking-widest">
              Most Popular
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Pro</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">Ideal for agencies and professional creators with scale.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-white">$49</span>
                <span className="text-xs text-gray-500 font-semibold">/month</span>
              </div>
              
              <ul className="flex flex-col gap-3.5 text-xs text-gray-300 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-primary-neon)]" /> 50 Downloads per month</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-primary-neon)]" /> Commercial License Agreement</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-primary-neon)]" /> HD & Ultra-HD Resolution</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-primary-neon)]" /> AI Similar Asset Recommendations</li>
              </ul>
            </div>
            
            <button 
              onClick={() => handlePricingUpgrade('Pro')}
              className="w-full mt-8 py-3 rounded-xl btn-neon-gradient text-xs font-bold transition-all"
            >
              {membership === 'Pro' ? 'Current Plan' : 'Subscribe Now'}
            </button>
          </div>

          {/* Card 3: Business */}
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Business</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">Designed for enterprise teams requiring multi-user access.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-white">$99</span>
                <span className="text-xs text-gray-500 font-semibold">/month</span>
              </div>
              
              <ul className="flex flex-col gap-3.5 text-xs text-gray-300 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-primary-neon)]" /> Unlimited Downloads</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-primary-neon)]" /> Extended & Exclusive Licenses</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-primary-neon)]" /> Priority DMCA & Support ticketing</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-primary-neon)]" /> API Access for bulk searches</li>
              </ul>
            </div>
            
            <button 
              onClick={() => handlePricingUpgrade('Business')}
              className="w-full mt-8 py-3 rounded-xl border border-gray-800 hover:border-white font-bold text-xs text-white bg-transparent transition-all"
            >
              {membership === 'Business' ? 'Current Plan' : 'Subscribe Now'}
            </button>
          </div>

        </div>
      </section>

      {/* Enterprise section (Desenio Style) */}
      <section id="enterprise" className="py-24 bg-gray-950/20 border-t border-gray-900/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex p-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-6">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">Enterprise Custom Licensing</h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Need custom pricing, legal indemnity, or exclusive visual rights for a global brand campaign? Our corporate team will curate specific agreements tailored exactly to your legal department's requirements.
          </p>
          <button 
            onClick={() => alert('Yêu cầu đã gửi! Đội ngũ của chúng tôi sẽ liên hệ lại bạn trong 2 giờ.')}
            className="px-8 py-3.5 btn-neon-outline rounded-full text-xs font-bold"
          >
            Contact Enterprise Team
          </button>
        </div>
      </section>

    </div>
  );
}

// Simple close element for grid
const X = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
