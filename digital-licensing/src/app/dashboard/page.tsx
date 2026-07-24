"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useGlobal } from '../../context/GlobalContext';
import { 
  Download, UploadCloud, Heart, LineChart, MessageSquare, 
  Settings, User, CheckCircle, TrendingUp, Sparkles, Star, ChevronRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock analytics data for Recharts
const MOCK_ANALYTICS_DATA = [
  { name: 'Mon', downloads: 14, revenue: 320 },
  { name: 'Tue', downloads: 22, revenue: 540 },
  { name: 'Wed', downloads: 18, revenue: 410 },
  { name: 'Thu', downloads: 29, revenue: 780 },
  { name: 'Fri', downloads: 35, revenue: 950 },
  { name: 'Sat', downloads: 42, revenue: 1200 },
  { name: 'Sun', downloads: 38, revenue: 1050 },
];

function DashboardContent() {
  const searchParams = useSearchParams();
  const { 
    membership, favorites, uploadedAssets, downloads, 
    assets, messages, addMessage 
  } = useGlobal();

  // Tab state
  const [activeTab, setActiveTab] = useState<'downloads' | 'uploads' | 'wishlist' | 'analytics' | 'messages'>('downloads');
  const [chatInput, setChatInput] = useState('');

  // Read URL params to set initial tab (e.g. from navbar redirects)
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['downloads', 'uploads', 'wishlist', 'analytics', 'messages'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, [searchParams]);

  // Fetch downloaded visual files
  const downloadedAssets = assets.filter(a => downloads.includes(a.id));

  // Fetch favorite visual files
  const favoriteAssets = assets.filter(a => favorites.includes(a.id));

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      addMessage("You", chatInput.trim());
      setChatInput('');
      
      // Auto reply simulation after 1s
      setTimeout(() => {
        addMessage("Sophia Vanhoutte", "Cảm ơn bạn! Yêu cầu của bạn đã được tiếp nhận. Tôi sẽ phản hồi sớm.");
      }, 1000);
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Glow spot */}
      <div className="glow-spot-cyan top-[20%] right-[10%]" />

      {/* Dashboard Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        
        {/* User Card */}
        <div className="flex items-center gap-4.5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[var(--color-primary-neon)] to-purple-500 p-[2px] shrink-0">
            <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center overflow-hidden">
              <span className="text-lg font-black text-white">TD</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">Truong Dev</h1>
              <span className="bg-[var(--color-primary-neon)]/15 border border-[var(--color-primary-neon)]/35 text-[9px] font-extrabold text-[var(--color-primary-neon)] px-2 py-0.5 rounded-full uppercase tracking-wider">
                {membership} Member
              </span>
            </div>
            <p className="text-xs text-gray-500 font-semibold mt-1">ID: 202672399 • Joined June 2023</p>
          </div>
        </div>

        {/* Action Right */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link href="/#pricing" className="flex-1 md:flex-none text-center px-6 py-2.5 btn-neon-gradient rounded-full text-xs font-bold text-black">
            Upgrade Plan
          </Link>
          <Link href="/upload" className="flex-1 md:flex-none text-center px-6 py-2.5 bg-gray-900 border border-gray-800 hover:border-white rounded-full text-xs font-bold text-white transition-all">
            Upload Asset
          </Link>
        </div>

      </div>

      {/* Main Container Grid: Sidebar Menu Left + Workspace Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Tabs Selector Menu */}
        <aside className="lg:col-span-3 flex flex-col gap-2">
          
          {/* Downloads */}
          <button 
            onClick={() => setActiveTab('downloads')}
            className={`flex items-center justify-between px-4.5 py-3.5 rounded-2xl border text-xs font-bold transition-all ${
              activeTab === 'downloads' 
                ? 'border-[var(--color-primary-neon)]/50 bg-[var(--color-primary-neon)]/5 text-white' 
                : 'border-gray-900 hover:border-gray-800 text-gray-400 hover:text-white bg-transparent'
            }`}
          >
            <span className="flex items-center gap-2.5"><Download className="w-4 h-4" /> Purchased Downloads</span>
            <span className="bg-gray-900 text-[10px] text-gray-400 font-bold px-2 py-0.5 rounded-full">{downloads.length}</span>
          </button>

          {/* Uploads */}
          <button 
            onClick={() => setActiveTab('uploads')}
            className={`flex items-center justify-between px-4.5 py-3.5 rounded-2xl border text-xs font-bold transition-all ${
              activeTab === 'uploads' 
                ? 'border-[var(--color-primary-neon)]/50 bg-[var(--color-primary-neon)]/5 text-white' 
                : 'border-gray-900 hover:border-gray-800 text-gray-400 hover:text-white bg-transparent'
            }`}
          >
            <span className="flex items-center gap-2.5"><UploadCloud className="w-4 h-4" /> My Uploads</span>
            <span className="bg-gray-900 text-[10px] text-gray-400 font-bold px-2 py-0.5 rounded-full">{uploadedAssets.length}</span>
          </button>

          {/* Wishlist */}
          <button 
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center justify-between px-4.5 py-3.5 rounded-2xl border text-xs font-bold transition-all ${
              activeTab === 'wishlist' 
                ? 'border-[var(--color-primary-neon)]/50 bg-[var(--color-primary-neon)]/5 text-white' 
                : 'border-gray-900 hover:border-gray-800 text-gray-400 hover:text-white bg-transparent'
            }`}
          >
            <span className="flex items-center gap-2.5"><Heart className="w-4 h-4" /> Favorites</span>
            <span className="bg-gray-900 text-[10px] text-gray-400 font-bold px-2 py-0.5 rounded-full">{favorites.length}</span>
          </button>

          {/* Analytics */}
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center justify-between px-4.5 py-3.5 rounded-2xl border text-xs font-bold transition-all ${
              activeTab === 'analytics' 
                ? 'border-[var(--color-primary-neon)]/50 bg-[var(--color-primary-neon)]/5 text-white' 
                : 'border-gray-900 hover:border-gray-800 text-gray-400 hover:text-white bg-transparent'
            }`}
          >
            <span className="flex items-center gap-2.5"><LineChart className="w-4 h-4" /> Earning Analytics</span>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          {/* Messages */}
          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center justify-between px-4.5 py-3.5 rounded-2xl border text-xs font-bold transition-all ${
              activeTab === 'messages' 
                ? 'border-[var(--color-primary-neon)]/50 bg-[var(--color-primary-neon)]/5 text-white' 
                : 'border-gray-900 hover:border-gray-800 text-gray-400 hover:text-white bg-transparent'
            }`}
          >
            <span className="flex items-center gap-2.5"><MessageSquare className="w-4 h-4" /> Message Center</span>
            <span className="bg-gray-900 text-[10px] text-gray-400 font-bold px-2 py-0.5 rounded-full">{messages.length}</span>
          </button>

        </aside>

        {/* Right: Active Workspace Container */}
        <div className="lg:col-span-9 glass-card rounded-3xl p-6 min-h-[50vh]">
          
          {/* TAB: DOWNLOADS */}
          {activeTab === 'downloads' && (
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-1.5 pb-2 border-b border-gray-900">
                <Download className="w-4 h-4 text-[var(--color-primary-neon)]" /> Purchased Downloads ({downloadedAssets.length})
              </h2>
              {downloadedAssets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {downloadedAssets.map((asset) => (
                    <div key={asset.id} className="glass-card rounded-2xl p-3 flex flex-col justify-between gap-3">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-950">
                        <img src={asset.thumbnailUrl} alt={asset.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white truncate">{asset.title}</h4>
                        <span className="text-[9px] text-gray-500 font-semibold">{asset.category}</span>
                      </div>
                      <a 
                        href={asset.originalUrl} 
                        download
                        className="w-full py-2 bg-gray-900 hover:bg-[var(--color-primary-neon)] border border-gray-800 hover:border-transparent text-white hover:text-black font-bold text-[10px] uppercase rounded-xl transition-all text-center flex items-center justify-center gap-1"
                        onClick={() => alert(`Đang tải ảnh gốc chất lượng cao cho "${asset.title}"...`)}
                      >
                        <Download className="w-3 h-3" /> Download original file
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-500">
                  <Download className="w-10 h-10 mx-auto mb-3 text-gray-700" />
                  <p className="text-xs font-semibold">Bạn chưa mua hoặc tải xuống tác phẩm nào.</p>
                  <Link href="/search" className="text-xs text-[var(--color-primary-neon)] hover:underline mt-2 inline-block">Khám phá ngay</Link>
                </div>
              )}
            </div>
          )}

          {/* TAB: UPLOADS */}
          {activeTab === 'uploads' && (
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-1.5 pb-2 border-b border-gray-900">
                <UploadCloud className="w-4 h-4 text-purple-400" /> My Uploaded Assets ({uploadedAssets.length})
              </h2>
              {uploadedAssets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {uploadedAssets.map((asset) => (
                    <div key={asset.id} className="glass-card rounded-2xl p-3 flex flex-col gap-3">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-950">
                        <img src={asset.thumbnailUrl} alt={asset.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white truncate">{asset.title}</h4>
                        <span className="text-[9px] text-[var(--color-primary-neon)] font-bold">{asset.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-500">
                  <UploadCloud className="w-10 h-10 mx-auto mb-3 text-gray-700" />
                  <p className="text-xs font-semibold">Bạn chưa đăng tải tác phẩm nào lên portfolio.</p>
                  <Link href="/upload" className="text-xs text-[var(--color-primary-neon)] hover:underline mt-2 inline-block">Đăng ảnh ngay</Link>
                </div>
              )}
            </div>
          )}

          {/* TAB: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-1.5 pb-2 border-b border-gray-900">
                <Heart className="w-4 h-4 text-rose-500" /> Favorites ({favoriteAssets.length})
              </h2>
              {favoriteAssets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {favoriteAssets.map((asset) => (
                    <div key={asset.id} className="glass-card rounded-2xl p-3 flex flex-col justify-between gap-3">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-950">
                        <img src={asset.thumbnailUrl} alt={asset.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white truncate">{asset.title}</h4>
                        <span className="text-[9px] text-gray-500 font-semibold">{asset.category}</span>
                      </div>
                      <Link 
                        href={`/image/${asset.id}`} 
                        className="w-full py-2 bg-gray-900 border border-gray-800 text-white font-bold text-[10px] uppercase rounded-xl hover:border-white transition-all text-center block"
                      >
                        Licensing options
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-500">
                  <Heart className="w-10 h-10 mx-auto mb-3 text-gray-700" />
                  <p className="text-xs font-semibold">Danh sách yêu thích đang trống.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-1.5 pb-2 border-b border-gray-900">
                <LineChart className="w-4 h-4 text-emerald-400" /> Earnings & Download Analytics
              </h2>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-5 bg-gray-950/40 border border-gray-900 rounded-2xl">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">MONTHLY EARNINGS</span>
                  <strong className="text-2xl font-extrabold text-[var(--color-primary-neon)] mt-1.5 block">$5,250.00</strong>
                </div>
                <div className="p-5 bg-gray-950/40 border border-gray-900 rounded-2xl">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">TOTAL DOWNLOADS</span>
                  <strong className="text-2xl font-extrabold text-white mt-1.5 block">183 downloads</strong>
                </div>
              </div>

              {/* Area Chart mapping */}
              <div className="h-72 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_ANALYTICS_DATA}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0a0a16', borderColor: '#1f2937', borderRadius: '12px' }} labelStyle={{ color: '#9ca3af' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#00D4FF" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* TAB: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="flex flex-col h-[50vh] justify-between">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5 pb-2 border-b border-gray-900">
                  <MessageSquare className="w-4 h-4 text-purple-400" /> Messaging Channels
                </h2>

                <div className="flex flex-col gap-3.5 max-h-[35vh] overflow-y-auto pr-2">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`max-w-[80%] rounded-2xl p-3.5 text-xs ${
                        msg.sender === 'You' 
                          ? 'bg-[var(--color-primary-neon)]/10 text-white self-end ml-auto border border-[var(--color-primary-neon)]/20' 
                          : 'bg-gray-950/60 border border-gray-900 text-gray-200 self-start mr-auto'
                      }`}
                    >
                      <div className="flex justify-between items-center gap-4 mb-1">
                        <strong className="font-bold">{msg.sender}</strong>
                        <span className="text-[9px] text-gray-500">{msg.time}</span>
                      </div>
                      <p className="leading-relaxed font-medium">{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-gray-900 pt-4 mt-2">
                <input 
                  type="text" 
                  placeholder="Nhập tin nhắn..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-grow bg-gray-950 border border-gray-900 focus:border-purple-500/50 rounded-xl text-xs text-white px-3.5 py-2.5 outline-none"
                />
                <button 
                  type="submit" 
                  className="px-6 py-2.5 btn-neon-gradient rounded-xl text-xs font-bold text-black hover:brightness-115 transition-all"
                >
                  Send
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-xs text-gray-500 font-semibold uppercase tracking-widest animate-pulse">Loading dashboard modules...</div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
