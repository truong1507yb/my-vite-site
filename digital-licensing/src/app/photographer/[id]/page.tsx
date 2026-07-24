"use client";

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useGlobal } from '../../../context/GlobalContext';
import { Masonry } from '../../../components/masonry';
import { 
  CheckCircle2, Camera, Calendar, Award, Star, 
  Users, Eye, Download, TrendingUp, Sparkles, UserPlus, UserCheck 
} from 'lucide-react';

interface Params {
  id: string;
}

export default function PhotographerPage({ params }: { params: Promise<Params> }) {
  const unwrappedParams = use(params);
  const photographerId = unwrappedParams.id;

  const { photographers, assets } = useGlobal();

  const photographer = photographers.find(p => p.id === photographerId);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(photographer ? photographer.followers : 0);

  if (!photographer) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Không tìm thấy nhiếp ảnh gia</h2>
        <Link href="/" className="text-xs text-[var(--color-primary-neon)] hover:underline">Quay lại trang chủ</Link>
      </div>
    );
  }

  // Filter assets matching this photographer
  const portfolioAssets = assets.filter(asset => asset.photographerId === photographer.id);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount(prev => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowerCount(prev => prev + 1);
    }
  };

  return (
    <div className="relative w-full pb-16">
      
      {/* Cover Banner */}
      <div className="h-60 sm:h-80 w-full relative overflow-hidden bg-gray-950">
        <img src={photographer.coverUrl} alt="Cover Banner" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
      </div>

      {/* Profile Header Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-10 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-900 pb-8">
          
          {/* Photographer Avatar + Name */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-24 h-24 sm:w-32 h-32 rounded-full overflow-hidden border-4 border-gray-950 bg-gray-900 shrink-0">
              <img src={photographer.avatarUrl} alt={photographer.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">{photographer.name}</h1>
                {photographer.verified && (
                  <span className="inline-flex items-center justify-center bg-[var(--color-primary-neon)]/15 border border-[var(--color-primary-neon)]/30 rounded-full p-0.5" title="Verified Creator">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[var(--color-primary-neon)] fill-black" />
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 font-semibold mt-1">@{photographer.username} • Professional Visual Artist</p>
              <div className="flex items-center gap-1.5 mt-2.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <strong className="text-xs text-white">{photographer.rating}</strong>
                <span className="text-[10px] text-gray-500">(Custom reviews)</span>
              </div>
            </div>
          </div>

          {/* Social Follow Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={handleFollowToggle}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                isFollowing 
                  ? 'bg-white/10 hover:bg-white/15 border border-white/20 text-white' 
                  : 'btn-neon-gradient text-black'
              }`}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="w-4 h-4" /> Following
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> Follow Creator
                </>
              )}
            </button>
            <button 
              onClick={() => alert(`Tin nhắn khẩn đã gửi đến ${photographer.name}!`)}
              className="px-6 py-2.5 rounded-full border border-gray-800 hover:border-gray-700 text-xs font-bold text-gray-300 hover:text-white transition-all bg-transparent"
            >
              Message
            </button>
          </div>

        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        
        {/* Card 1: Views */}
        <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Total Views</span>
            <strong className="text-lg font-extrabold text-white mt-1 block">{photographer.views.toLocaleString()}</strong>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Downloads */}
        <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Downloads</span>
            <strong className="text-lg font-extrabold text-white mt-1 block">{photographer.downloads.toLocaleString()}</strong>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Download className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Followers */}
        <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Followers</span>
            <strong className="text-lg font-extrabold text-white mt-1 block">{followerCount.toLocaleString()}</strong>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Creator Level */}
        <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Creator Level</span>
            <strong className="text-lg font-extrabold text-white mt-1 block">Elite Pro</strong>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Award className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Content Area: Bio + Portfolio Masonry */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Bio Details */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-gray-900 mb-3 flex items-center gap-1">
              <Camera className="w-4 h-4 text-purple-400" /> About Photographer
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              {photographer.bio}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 text-xs text-gray-500 font-semibold flex flex-col gap-3">
            <div className="flex justify-between">
              <span>MEMBER SINCE:</span>
              <strong className="text-gray-300">2023</strong>
            </div>
            <div className="flex justify-between">
              <span>LOCATION:</span>
              <strong className="text-gray-300">Paris, France</strong>
            </div>
            <div className="flex justify-between">
              <span>CREATIVE CATEGORY:</span>
              <strong className="text-[var(--color-primary-neon)]">Fine-Art Landscape</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Portfolio Grid */}
        <div className="lg:col-span-9 flex flex-col gap-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-1.5 mb-6">
              <Sparkles className="w-5.5 h-5.5 text-[var(--color-primary-neon)]" /> Visual Portfolio
            </h2>
            {portfolioAssets.length > 0 ? (
              <Masonry assets={portfolioAssets} />
            ) : (
              <div className="text-center py-20 bg-gray-950/20 border border-gray-900/50 rounded-2xl">
                <p className="text-gray-500 text-xs font-semibold">Chưa có tác phẩm nào tải lên.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
