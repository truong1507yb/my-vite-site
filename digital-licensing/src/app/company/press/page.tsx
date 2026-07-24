"use client";

import React from 'react';
import { Download, FileText, Calendar, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function PressRoomPage() {
  const news = [
    { title: "Desenio Licensing công bố cột mốc 500,000 tác phẩm bản quyền kỹ thuật số", date: "24 Tháng 7, 2026", desc: "Sự phát triển vũ bão của cộng đồng nhiếp ảnh thế giới thúc đẩy kho dữ liệu bản quyền đạt mốc kỷ lục mới." },
    { title: "Ra mắt tính năng AI Auto Tag bằng mạng nơ-ron tự động trích xuất EXIF", date: "12 Tháng 6, 2026", desc: "Hỗ trợ tối ưu hóa quy trình kiểm duyệt chất lượng hình ảnh của các đại lý thiết kế và thương hiệu toàn cầu." }
  ];

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20 select-none">
      
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-5">
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest">Press Room</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Press Kit & Media Assets
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-semibold">
          Download authorized brand logos, colors, press kits, and read the latest news updates about Desenio.
        </p>
      </div>

      {/* Grid: Download Press kit + Brand Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        
        {/* Kit */}
        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between items-start text-left">
          <div>
            <span className="text-[10px] font-bold text-[var(--color-primary-neon)] uppercase tracking-wider block mb-2">Assets Bundle</span>
            <h3 className="text-lg font-extrabold text-white mb-3">Download Press Kit</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-medium mb-6">
              Includes high-res vector logos (EPS, SVG), selected product screenshot frames, and official leadership photos.
            </p>
          </div>
          <button 
            onClick={() => alert('Đang tải xuống bộ Press Kit (desenio_press_kit_2026.zip)...')}
            className="px-5 py-2.5 bg-gray-900 border border-gray-800 hover:border-white text-xs font-bold text-white rounded-xl flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4" /> Download ZIP
          </button>
        </div>

        {/* Guidelines */}
        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between items-start text-left">
          <div>
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-2">Stylebook</span>
            <h3 className="text-lg font-extrabold text-white mb-3">Brand Identity Guidelines</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-medium mb-6">
              Learn how to utilize official colors, margins, minimum scaling, and custom fonts.
            </p>
          </div>
          <button 
            onClick={() => alert('Đang tải xuống tài liệu hướng dẫn thương hiệu (brand_guidelines_2026.pdf)...')}
            className="px-5 py-2.5 bg-gray-900 border border-gray-800 hover:border-white text-xs font-bold text-white rounded-xl flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-4 h-4" /> View PDF
          </button>
        </div>

      </div>

      {/* Latest Press Releases */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-10 text-center">Latest Press Releases</h2>
        <div className="flex flex-col gap-6 max-w-3xl mx-auto text-left">
          {news.map((item, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6">
              <span className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase mb-2">
                <Calendar className="w-3.5 h-3.5" /> {item.date}
              </span>
              <h4 className="text-sm font-extrabold text-white mb-2 leading-snug">{item.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
