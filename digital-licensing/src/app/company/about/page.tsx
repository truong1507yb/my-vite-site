"use client";

import React from 'react';
import { Target, Eye, ShieldCheck, Heart, Sparkles, Calendar } from 'lucide-react';

export default function AboutPage() {
  const values = [
    { icon: <Target className="w-5 h-5 text-cyan-400" />, title: "Precision Focus", desc: "Delivering pixels of outstanding visual quality without compromises." },
    { icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />, title: "Digital Security", desc: "Pioneering SHA-256 blockchain authentication for visual assets." },
    { icon: <Heart className="w-5 h-5 text-rose-500" />, title: "Creative Care", desc: "Supporting creators directly with high percentages of transaction earnings." }
  ];

  const milestones = [
    { year: "2023", title: "Khởi tạo Desenio Licensing", desc: "Thành lập nền tảng với mục tiêu bảo vệ bản quyền hình ảnh bằng công nghệ blockchain." },
    { year: "2025", title: "Tích hợp AI Semantic Search", desc: "Thay thế thanh tìm kiếm thẻ tag truyền thống bằng công nghệ ngôn ngữ tự nhiên." },
    { year: "2026", title: "Mở rộng Desenio Pro", desc: "Phát hành gói hội viên Pro và bộ cổng dịch vụ tích hợp API doanh nghiệp lớn." }
  ];

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20 select-none">
      
      {/* Glow spot */}
      <div className="glow-spot-purple top-[10%] left-[5%]" />

      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest">About Our Group</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Redefining Visual Copyrights
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-semibold">
          Desenio Licensing is a global digital asset licensing platform engineered to connect creators and businesses with absolute security.
        </p>
      </div>

      {/* Sứ mệnh & Tầm nhìn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 items-stretch">
        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-[var(--color-primary-neon)] uppercase tracking-wider block mb-2">Our Mission</span>
            <h3 className="text-lg font-extrabold text-white mb-4">Empowering Visual Creatives</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              Cung cấp các công cụ tối ưu để nhiếp ảnh gia bảo vệ và kinh doanh chất xám của mình, đồng thời giúp doanh nghiệp tìm kiếm và cấp phép tài nguyên bản quyền một cách dễ dàng và minh bạch nhất.
            </p>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-2">Our Vision</span>
            <h3 className="text-lg font-extrabold text-white mb-4">A Frictionless Creative Economy</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              Trở thành cơ sở dữ liệu bản quyền hình ảnh lớn nhất thế giới được mã hóa hoàn toàn trên chuỗi khối số, nơi mọi hành động sao chép hoặc cấp phép đều được đăng ký tự động và minh bạch.
            </p>
          </div>
        </div>
      </div>

      {/* Giá trị cốt lõi */}
      <div className="mb-20">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-8 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-gray-950/60 border border-gray-900 flex items-center justify-center mx-auto mb-4">
                {v.icon}
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">{v.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-10 text-center">Company Timeline</h2>
        <div className="flex flex-col gap-6 max-w-xl mx-auto relative border-l border-gray-900 pl-6 text-left">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative">
              <span className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-[var(--color-primary-neon)] border-2 border-gray-950"></span>
              <span className="text-xs font-black text-[var(--color-primary-neon)]">{m.year}</span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mt-1">{m.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-medium mt-1">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
