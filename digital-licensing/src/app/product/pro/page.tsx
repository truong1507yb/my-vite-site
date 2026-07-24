"use client";

import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, HelpCircle, Mail, 
  ArrowRight, ShieldCheck, Award, Zap 
} from 'lucide-react';

export default function ProPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const benefits = [
    { title: "Commercial Legal Indemnity", desc: "Up to $10,000 legal cover guaranteeing all digital assets are certified authentic." },
    { title: "Direct DMCA Takedown", desc: "Access direct tools to request takedowns of scraped intellectual assets elsewhere." },
    { title: "API Integration Access", desc: "Automate lookups and downloads using our SDK client libraries." },
    { title: "Priority Support Ticket", desc: "Direct 1-on-1 account directors to curate visual assets for campaigns." }
  ];

  const faqs = [
    { q: "Gói bản quyền Desenio Pro hoạt động thế nào?", a: "Khi đăng ký hội viên, bạn sẽ nhận được một hạn mức tải xuống hình ảnh gốc không đóng dấu hàng tháng, đi kèm với tệp chứng nhận bản quyền kỹ thuật số (Blockchain Hash) riêng cho từng bức ảnh." },
    { q: "Tôi có thể hủy đăng ký bất kỳ lúc nào không?", a: "Hoàn toàn có thể. Gói hội viên của bạn sẽ tiếp tục hoạt động cho đến hết chu kỳ thanh toán hiện tại của bạn và không tự động gia hạn tiếp theo." },
    { q: "Có hỗ trợ xuất hóa đơn VAT công ty không?", a: "Có. Tất cả các giao dịch mua bản quyền qua cổng Stripe đều tự động xuất hóa đơn đỏ (VAT Invoice) gửi trực tiếp về email công ty đăng ký." }
  ];

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20 select-none">
      
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-5">
          <Award className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest">Premium membership</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Unleash Creative Power with <span className="text-gradient-neon">Desenio Pro</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-semibold">
          Unlock unlimited verified assets, extended corporate licensing models, and advanced AI automation.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {benefits.map((b, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-6 flex gap-4">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl shrink-0 h-11 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1">{b.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mb-20">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-8 text-center flex items-center justify-center gap-2">
          <HelpCircle className="w-5.5 h-5.5 text-[var(--color-primary-neon)]" /> Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              className="glass-card rounded-2xl p-5 cursor-pointer"
            >
              <div className="flex justify-between items-center text-xs font-bold text-white">
                <span>{faq.q}</span>
                <span className="text-gray-500">{activeFaq === idx ? '−' : '+'}</span>
              </div>
              {activeFaq === idx && (
                <p className="text-xs text-gray-400 leading-relaxed font-medium mt-3 pt-3 border-t border-gray-900">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Sales Form */}
      <div className="glass-card rounded-3xl p-8 max-w-xl mx-auto text-center">
        <div className="inline-flex p-3 rounded-full bg-cyan-500/10 text-cyan-400 mb-4">
          <Mail className="w-5.5 h-5.5" />
        </div>
        <h3 className="text-base font-extrabold text-white mb-2">Liên hệ đội ngũ Kinh doanh</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-6 font-semibold">
          Yêu cầu tư vấn bảng giá hợp đồng doanh nghiệp lớn, điều khoản bản quyền tùy chỉnh.
        </p>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            alert('Cảm ơn bạn! Yêu cầu liên hệ đã được gửi.');
            (e.target as HTMLFormElement).reset();
          }}
          className="flex flex-col gap-4 text-left"
        >
          <input 
            type="email" 
            placeholder="Email công ty của bạn" 
            required 
            className="w-full bg-gray-950 border border-gray-900 rounded-xl text-xs text-white px-3.5 py-3 outline-none"
          />
          <textarea 
            placeholder="Mô tả nhu cầu sử dụng..." 
            rows={3} 
            className="w-full bg-gray-950 border border-gray-900 rounded-xl text-xs text-white px-3.5 py-3 outline-none"
          ></textarea>
          <button type="submit" className="w-full py-3 btn-neon-gradient rounded-xl font-bold text-xs flex items-center justify-center gap-1.5">
            Submit Request <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </form>
      </div>

    </div>
  );
}
