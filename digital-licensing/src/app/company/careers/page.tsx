"use client";

import React, { useState } from 'react';
import { MOCK_JOBS } from '../../../lib/mockData';
import { Briefcase, MapPin, Clock, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [message, setMessage] = useState('');

  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !selectedJob) return;

    setAppliedJobs([...appliedJobs, selectedJob]);
    alert(`Đơn ứng tuyển cho vị trí "${selectedJob}" đã được tiếp nhận. Đội ngũ tuyển dụng sẽ phản hồi qua email ${email} trong vòng 3 ngày làm việc.`);
    
    // Reset form
    setFullName('');
    setEmail('');
    setPortfolioLink('');
    setMessage('');
    setSelectedJob('');
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-12 select-none">
      
      {/* Glow spot */}
      <div className="glow-spot-cyan top-[15%] right-[5%]" />

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-5">
          <Briefcase className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest">We are hiring</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Join the Creative Revolution
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-semibold">
          We are engineering the future of digital visual rights. Explore open departments and apply to join our global hybrid team.
        </p>
      </div>

      {/* Grid: Open Positions Left + Application Form Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Job Openings list */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-gray-900 mb-2">
            Open Positions ({MOCK_JOBS.length})
          </h2>

          <div className="flex flex-col gap-4 text-left">
            {MOCK_JOBS.map(job => {
              const hasApplied = appliedJobs.includes(job.title);

              return (
                <div key={job.id} className="glass-card rounded-2xl p-5 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-white mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-[10px] font-bold text-gray-500 uppercase">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-gray-900/60">
                    {hasApplied ? (
                      <span className="text-[10px] font-bold text-emerald-450 uppercase flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Applied
                      </span>
                    ) : (
                      <button 
                        onClick={() => setSelectedJob(job.title)}
                        className="px-4 py-2 bg-gray-900 border border-gray-800 hover:border-white text-xs font-bold text-white rounded-lg transition-all"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Application Form */}
        <div className="lg:col-span-6">
          <div className="glass-card rounded-3xl p-6 text-left">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-900 flex items-center gap-1.5">
              <Send className="w-4 h-4 text-purple-400" /> Online Application Form
            </h3>

            <form onSubmit={handleApplySubmit} className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Họ và tên</label>
                <input 
                  type="text" 
                  placeholder="Nguyễn Văn A" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full bg-gray-950 border border-gray-900 rounded-xl text-xs text-white px-3.5 py-2.5 outline-none"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Email liên hệ</label>
                <input 
                  type="email" 
                  placeholder="email@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-950 border border-gray-900 rounded-xl text-xs text-white px-3.5 py-2.5 outline-none"
                />
              </div>

              {/* Selected Position */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Vị trí ứng tuyển</label>
                <select 
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  required
                  className="bg-gray-950 border border-gray-900 rounded-xl text-xs text-white p-2.5 outline-none cursor-pointer"
                >
                  <option value="">-- Chọn vị trí ứng tuyển --</option>
                  {MOCK_JOBS.map(job => (
                    <option key={job.id} value={job.title}>{job.title} ({job.location})</option>
                  ))}
                </select>
              </div>

              {/* Portfolio Link */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Link Portfolio / LinkedIn</label>
                <input 
                  type="url" 
                  placeholder="https://github.com/username hoặc linkedin" 
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-900 rounded-xl text-xs text-white px-3.5 py-2.5 outline-none"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Lời nhắn giới thiệu</label>
                <textarea 
                  placeholder="Giới thiệu bản thân và kinh nghiệm của bạn..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full bg-gray-950 border border-gray-900 rounded-xl text-xs text-white px-3.5 py-2.5 outline-none"
                ></textarea>
              </div>

              <button type="submit" className="w-full py-3.5 btn-neon-gradient rounded-xl font-bold text-xs flex items-center justify-center gap-1.5">
                Submit Application <Send className="w-4 h-4 text-black" />
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
