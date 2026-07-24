"use client";

import React, { useState } from 'react';
import { MessageSquare, Users, AlertTriangle, ShoppingCart, HelpCircle, Send } from 'lucide-react';

interface ForumThread {
  id: string;
  category: 'general' | 'bug' | 'recommend' | 'market';
  title: string;
  author: string;
  replies: number;
  views: number;
  time: string;
}

export default function ForumPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'general' | 'bug' | 'recommend' | 'market'>('all');
  const [threadTitle, setThreadTitle] = useState('');
  const [threadCategory, setThreadCategory] = useState<'general' | 'bug' | 'recommend' | 'market'>('general');

  const [threads, setThreads] = useState<ForumThread[]>([
    { id: "ft1", category: "general", title: "Có nên dùng máy ảnh Trung Hông (Medium Format) để cấp bản quyền ảnh phong cảnh?", author: "Aria Takahashi", replies: 14, views: 320, time: "2 giờ trước" },
    { id: "ft2", category: "bug", title: "Lỗi tải ảnh SVG không load được hệ màu Pantone trên Illustrator", author: "Marcus Sterling", replies: 3, views: 54, time: "5 giờ trước" },
    { id: "ft3", category: "recommend", title: "Đề xuất thêm bộ lọc sắc độ màu RGB chi tiết hơn ở trang Tìm kiếm", author: "Truong Dev", replies: 8, views: 120, time: "1 ngày trước" },
    { id: "ft4", category: "market", title: "Cần mua bản quyền độc quyền ảnh flycam phong cảnh vịnh Hạ Long", author: "Sophia Vanhoutte", replies: 22, views: 510, time: "2 ngày trước" }
  ]);

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!threadTitle.trim()) return;

    const newThread: ForumThread = {
      id: `ft_${Date.now()}`,
      category: threadCategory,
      title: threadTitle.trim(),
      author: "You (Admin)",
      replies: 0,
      views: 1,
      time: "Vừa xong"
    };

    setThreads([newThread, ...threads]);
    setThreadTitle('');
    alert('Đăng chủ đề thảo luận mới thành công!');
  };

  const getCategoryDetails = (cat: string) => {
    switch (cat) {
      case 'general': return { name: 'Thảo luận', color: 'text-blue-400 border-blue-500/20 bg-blue-500/5', icon: <MessageSquare className="w-3.5 h-3.5" /> };
      case 'bug': return { name: 'Báo lỗi', color: 'text-red-400 border-red-500/20 bg-red-500/5', icon: <AlertTriangle className="w-3.5 h-3.5" /> };
      case 'recommend': return { name: 'Góp ý', color: 'text-amber-400 border-amber-500/20 bg-amber-500/5', icon: <HelpCircle className="w-3.5 h-3.5" /> };
      case 'market': return { name: 'Mua bán', color: 'text-purple-400 border-purple-500/20 bg-purple-500/5', icon: <ShoppingCart className="w-3.5 h-3.5" /> };
      default: return { name: 'General', color: 'text-gray-400 border-gray-800 bg-transparent', icon: null };
    }
  };

  const filteredThreads = threads.filter(t => activeTab === 'all' || t.category === activeTab);

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-12 select-none">
      
      {/* Header */}
      <div className="text-left mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <Users className="w-7 h-7 text-[var(--color-primary-neon)]" /> Community Forum
        </h1>
        <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">
          Ask questions, discuss design tags, report errors, and chat with local creatives
        </p>
      </div>

      {/* Grid Layout: Create Thread Left + Thread List Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Create Thread Form */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-900 flex items-center gap-1.5">
              <Send className="w-4 h-4 text-purple-400" /> Start Thread
            </h3>

            <form onSubmit={handleCreateThread} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Chủ đề</label>
                <input 
                  type="text" 
                  placeholder="Nhập tiêu đề thảo luận..." 
                  value={threadTitle}
                  onChange={(e) => setThreadTitle(e.target.value)}
                  required
                  className="w-full bg-gray-950 border border-gray-900 rounded-xl text-xs text-white px-3 py-2.5 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Chuyên mục</label>
                <select 
                  value={threadCategory}
                  onChange={(e) => setThreadCategory(e.target.value as any)}
                  className="bg-gray-950 border border-gray-900 rounded-xl text-xs text-white p-2.5 outline-none cursor-pointer"
                >
                  <option value="general">Thảo luận chung</option>
                  <option value="bug">Báo cáo lỗi kỹ thuật</option>
                  <option value="recommend">Ý kiến & Góp ý</option>
                  <option value="market">Góc Mua bán & Commission</option>
                </select>
              </div>

              <button type="submit" className="w-full py-2.5 btn-neon-gradient rounded-xl text-xs font-bold text-black flex items-center justify-center gap-1.5">
                Đăng bài <Send className="w-3.5 h-3.5 text-black" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Tab filters and Threads list */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          
          {/* Tab selector */}
          <div className="flex flex-wrap gap-2 text-[9px] font-bold uppercase tracking-wider text-gray-500">
            {['all', 'general', 'bug', 'recommend', 'market'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 border rounded-full transition-all ${
                  activeTab === tab 
                    ? 'border-white bg-white text-black' 
                    : 'border-gray-900 hover:border-gray-800'
                }`}
              >
                {tab === 'all' ? 'All Channels' : getCategoryDetails(tab).name}
              </button>
            ))}
          </div>

          {/* Threads Listing */}
          <div className="flex flex-col gap-3">
            {filteredThreads.map(t => {
              const details = getCategoryDetails(t.category);
              
              return (
                <div key={t.id} className="glass-card rounded-2xl p-4 flex justify-between items-center gap-4">
                  <div className="flex flex-col items-start gap-2">
                    <span className={`inline-flex items-center gap-1 border text-[9px] font-bold px-2 py-0.5 rounded-full ${details.color}`}>
                      {details.icon} {details.name.toUpperCase()}
                    </span>
                    <h4 className="text-xs font-bold text-white leading-snug hover:underline cursor-pointer">
                      {t.title}
                    </h4>
                    <span className="text-[10px] text-gray-500 font-semibold">by {t.author} • {t.time}</span>
                  </div>

                  <div className="text-right shrink-0 text-[10px] font-bold text-gray-500 flex flex-col gap-0.5">
                    <span>{t.replies} replies</span>
                    <span className="text-[9px] text-gray-600">{t.views} views</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
