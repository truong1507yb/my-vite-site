"use client";

import React, { useState } from 'react';
import { MOCK_BLOGS, BlogPost } from '../../../lib/mockData';
import { Sparkles, Calendar, Clock, ArrowRight, Eye } from 'lucide-react';

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-12 select-none">
      
      {/* Glow spot */}
      <div className="glow-spot-cyan top-[10%] left-[5%]" />

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest">Licensing Insights</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          The Licensing Blog
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-semibold">
          Stay informed on digital asset copyright laws, artificial intelligence search standards, and premium photography techniques.
        </p>
      </div>

      {selectedPost ? (
        /* Detailed Article View */
        <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto">
          <button 
            onClick={() => setSelectedPost(null)}
            className="text-xs font-semibold text-gray-400 hover:text-white mb-6 block transition-colors"
          >
            ← Back to blog index
          </button>
          
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-gray-950">
            <img src={selectedPost.coverUrl} alt={selectedPost.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase mb-3">
            <span className="text-[var(--color-primary-neon)]">{selectedPost.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedPost.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
            {selectedPost.title}
          </h2>

          <div className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium flex flex-col gap-4 border-t border-gray-900 pt-6 mt-6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id lorem vel velit viverra dignissim. 
              Praesent dictum ex sit amet tristique elementum. Vestibulum ut dolor scelerisque, porttitor nisl id, rhoncus ex.
            </p>
            <p className="font-semibold text-white">
              Key takeaway: Digital ledger hashing (SHA-256) establishes a mathematical proof of origin which is recognized in international licensing courts.
            </p>
            <p>
              Proin ac mi ut ex rhoncus facilisis eu scelerisque tortor. Donec sit amet erat sed velit rhoncus aliquet nec ac tellus. 
              Phasellus pretium elit at sem congue, eget aliquet dolor lacinia. Ut vitae massa arcu.
            </p>
          </div>
        </div>
      ) : (
        /* Blog Index list */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_BLOGS.map(blog => (
            <div key={blog.id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] bg-gray-900 overflow-hidden relative">
                  <img src={blog.coverUrl} alt={blog.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white uppercase tracking-widest px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>

                <div className="p-5 text-left">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase mb-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {blog.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-white leading-tight mb-2 hover:text-[var(--color-primary-neon)] transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 text-left">
                <button 
                  onClick={() => setSelectedPost(blog)}
                  className="text-xs font-bold text-[var(--color-primary-neon)] hover:underline flex items-center gap-1.5 transition-all mt-4"
                >
                  Read full article <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
