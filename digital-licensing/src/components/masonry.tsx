"use client";

import React from 'react';
import Link from 'next/link';
import { Camera, Calendar, Heart, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { MediaAsset } from '../lib/mockData';
import { useGlobal } from '../context/GlobalContext';

interface MasonryProps {
  assets: MediaAsset[];
}

export const Masonry: React.FC<MasonryProps> = ({ assets }) => {
  const { toggleFavorite, isFavorite, photographers } = useGlobal();

  const getPhotographer = (id: string) => {
    return photographers.find(p => p.id === id);
  };

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 w-full">
      {assets.map((asset) => {
        const p = getPhotographer(asset.photographerId);
        const favorite = isFavorite(asset.id);

        return (
          <div 
            key={asset.id} 
            className="break-inside-avoid relative group rounded-2xl overflow-hidden glass-card cursor-pointer"
          >
            {/* Asset Item Frame */}
            <Link href={`/image/${asset.id}`} className="block w-full">
              <div className="relative overflow-hidden w-full bg-gray-950">
                <img 
                  src={asset.thumbnailUrl} 
                  alt={asset.title}
                  className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
            </Link>

            {/* Float Favorite Button (Top Right) */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(asset.id);
              }}
              className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                favorite 
                  ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)] scale-105' 
                  : 'bg-black/40 backdrop-blur-md text-gray-300 hover:text-white border border-white/10 hover:border-white/20'
              }`}
              title="Add to Favorites"
            >
              <Heart className={`w-4.5 h-4.5 ${favorite ? 'fill-current' : ''}`} />
            </button>

            {/* Asset Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 p-5 flex flex-col justify-between pointer-events-none select-none">
              
              {/* Top Row: Artist details */}
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
                    <img src={p?.avatarUrl} alt={p?.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-200 flex items-center gap-1">
                    {p?.name}
                    {p?.verified && <CheckCircle2 className="w-3 h-3 text-[var(--color-primary-neon)] fill-black" />}
                  </span>
                </div>
                <span className="text-[9px] font-semibold text-gray-300 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {asset.uploadDate}
                </span>
              </div>

              {/* Bottom Row: Metadata & Details link */}
              <div className="flex justify-between items-end w-full">
                <div className="max-w-[70%]">
                  <h4 className="text-sm font-bold text-white leading-tight truncate">{asset.title}</h4>
                  <span className="text-[10px] font-bold text-[var(--color-primary-neon)] uppercase tracking-wider mt-0.5 inline-block">
                    {asset.category}
                  </span>
                </div>
                
                {/* Pointer Trigger */}
                <Link 
                  href={`/image/${asset.id}`}
                  className="pointer-events-auto bg-white/10 hover:bg-[var(--color-primary-neon)] text-white hover:text-black w-8 h-8 rounded-full border border-white/10 hover:border-transparent flex items-center justify-center transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};
