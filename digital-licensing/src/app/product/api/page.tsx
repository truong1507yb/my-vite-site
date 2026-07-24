"use client";

import React from 'react';
import { Sparkles, Check, X, Code, HelpCircle } from 'lucide-react';

export default function ApiPricingPage() {
  const plans = [
    { name: "Free", price: "$0", desc: "For individual developer sandbox testing.", limit: "100 queries/mo" },
    { name: "Developer", price: "$49", desc: "For apps requiring standard search rates.", limit: "5,000 queries/mo" },
    { name: "Business", price: "$199", desc: "For creative teams indexing bulk vectors.", limit: "50,000 queries/mo" },
    { name: "Enterprise", price: "Custom", desc: "For high frequency programmatic usage.", limit: "Unlimited queries" }
  ];

  const features = [
    { title: "Query Limit", free: "100/mo", dev: "5,000/mo", biz: "50,000/mo", ent: "Unlimited" },
    { title: "API Keys", free: "1", dev: "3", biz: "10", ent: "Unlimited" },
    { title: "SLA uptime", free: <X className="w-4 h-4 text-red-500 mx-auto" />, dev: "99.9%", biz: "99.99%", ent: "99.999% Dedicated" },
    { title: "Reverse Image Search API", free: <X className="w-4 h-4 text-red-500 mx-auto" />, dev: <Check className="w-4 h-4 text-emerald-500 mx-auto" />, biz: <Check className="w-4 h-4 text-emerald-500 mx-auto" />, ent: <Check className="w-4 h-4 text-emerald-500 mx-auto" /> },
    { title: "Blockchain Hash Verification API", free: <Check className="w-4 h-4 text-emerald-500 mx-auto" />, dev: <Check className="w-4 h-4 text-emerald-500 mx-auto" />, biz: <Check className="w-4 h-4 text-emerald-500 mx-auto" />, ent: <Check className="w-4 h-4 text-emerald-500 mx-auto" /> },
    { title: "Support channel", free: "Forum", dev: "Email", biz: "Priority Email & Slack", ent: "Dedicated Account Manager" }
  ];

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20 select-none">
      
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-5">
          <Code className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest">Developer Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          API Subscription Pricing
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-semibold">
          Scale your design product indexing workflows with robust AI search APIs and digital ledger integration endpoints.
        </p>
      </div>

      {/* Cards Pricing Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 items-stretch">
        {plans.map((p, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-white mb-1.5">{p.name}</h3>
              <p className="text-[10px] text-gray-500 font-semibold mb-4 leading-relaxed">{p.desc}</p>
              
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-extrabold text-white">{p.price}</span>
                {p.price !== 'Custom' && <span className="text-[10px] text-gray-500 font-bold">/mo</span>}
              </div>

              <div className="text-[10px] font-bold text-gray-300 uppercase tracking-wider bg-gray-950/60 p-2.5 rounded-lg border border-gray-900 text-center">
                {p.limit}
              </div>
            </div>

            <button 
              onClick={() => alert(`Cảm ơn bạn! Yêu cầu đăng ký gói API ${p.name} đã được gửi.`)}
              className="w-full mt-6 py-2.5 bg-gray-900 border border-gray-800 hover:border-white text-xs font-bold text-white rounded-xl transition-all"
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="glass-card rounded-3xl p-6 overflow-x-auto mb-16">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-6 pb-2 border-b border-gray-900">
          Detailed Feature Comparison
        </h3>
        
        <table className="w-full text-center border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-900 text-gray-500 font-bold uppercase">
              <th className="pb-3 text-left">Features</th>
              <th className="pb-3">Free</th>
              <th className="pb-3">Developer</th>
              <th className="pb-3">Business</th>
              <th className="pb-3">Enterprise</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-900/60 text-gray-300 font-medium">
            {features.map((f, idx) => (
              <tr key={idx} className="hover:bg-gray-950/20 transition-all">
                <td className="py-4 text-left font-semibold text-white">{f.title}</td>
                <td className="py-4">{f.free}</td>
                <td className="py-4">{f.dev}</td>
                <td className="py-4">{f.biz}</td>
                <td className="py-4">{f.ent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
