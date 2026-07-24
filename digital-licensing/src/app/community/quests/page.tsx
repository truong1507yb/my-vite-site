"use client";

import React, { useState } from 'react';
import { MOCK_CHALLENGES, MOCK_LEADERBOARD } from '../../../lib/mockData';
import { 
  Trophy, Award, Calendar, Gift, Star, 
  Send, Users, CheckCircle2, Flame 
} from 'lucide-react';

export default function QuestsPage() {
  const [participatedIds, setParticipatedIds] = useState<string[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [submissionUrl, setSubmissionUrl] = useState('');

  const handleJoinQuest = (questId: string) => {
    setSelectedChallenge(questId);
  };

  const handleSubmitAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionUrl.trim()) return;

    if (selectedChallenge) {
      setParticipatedIds([...participatedIds, selectedChallenge]);
      alert("Nộp bài thi tham dự Challenge thành công! Đội ngũ Ban giám khảo sẽ chấm điểm và phản hồi sau khi kết thúc sự kiện.");
      setSubmissionUrl('');
      setSelectedChallenge(null);
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-12 select-none">
      
      {/* Glow background */}
      <div className="glow-spot-purple top-[10%] right-[5%]" />

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-5">
          <Trophy className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest">Photographer Quests</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Weekly Challenges & Leaderboards
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-semibold">
          Participate in curated photography quests, win financial cash rewards, and earn exclusive verified profile creator badges.
        </p>
      </div>

      {/* Main Grid: Challenges Left + Leaderboard Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Column: Active Quests */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-gray-900">
            <Flame className="w-4 h-4 text-purple-400" /> Active Quests
          </h2>

          {MOCK_CHALLENGES.map(q => {
            const hasJoined = participatedIds.includes(q.id);

            return (
              <div key={q.id} className="glass-card rounded-2xl p-6 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base font-extrabold text-white">{q.title}</h3>
                    <span className="bg-purple-500/15 border border-purple-500/35 text-[9px] font-extrabold text-purple-400 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium mb-4">
                    {q.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-gray-500">
                    <span className="flex items-center gap-1.5"><Gift className="w-4 h-4 text-amber-500" /> PRIZE: <strong className="text-gray-200">{q.prize}</strong></span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-purple-400" /> DEADLINE: <strong className="text-gray-200">{q.deadline}</strong></span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-900 flex justify-end">
                  {hasJoined ? (
                    <span className="text-[10px] font-extrabold text-emerald-450 uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Submitted
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleJoinQuest(q.id)}
                      className="px-5 py-2 btn-neon-gradient text-xs text-black font-bold rounded-lg transition-all"
                    >
                      Join Challenge
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Leaderboards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-gray-900">
            <Trophy className="w-4 h-4 text-amber-500" /> Global Leaderboard
          </h2>

          <div className="glass-card rounded-3xl p-5 flex flex-col gap-4">
            {MOCK_LEADERBOARD.map((user) => (
              <div key={user.rank} className="flex items-center justify-between p-3 bg-gray-950/40 border border-gray-900 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-black ${
                    user.rank === 1 ? 'text-amber-500' : user.rank === 2 ? 'text-gray-400' : 'text-amber-700'
                  }`}>
                    #{user.rank}
                  </span>
                  
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-0.5">{user.name}</h4>
                    <span className="text-[9px] text-gray-500 font-semibold">{user.downloads.toLocaleString()} sales</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-300 shrink-0">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {user.rating.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Submission Modal Form Overlay */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 w-full max-w-md bg-gray-950/90 shadow-2xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Nộp bài tham dự</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Vui lòng cung cấp link hình ảnh chất lượng cao hoặc tác phẩm của bạn để nộp vào cuộc thi.
            </p>

            <form onSubmit={handleSubmitAsset} className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Link hình ảnh dự thi (e.g. Unsplash URL)..." 
                value={submissionUrl}
                onChange={(e) => setSubmissionUrl(e.target.value)}
                required
                className="w-full bg-gray-950 border border-gray-900 rounded-xl text-xs text-white px-3.5 py-3 outline-none"
              />

              <div className="flex justify-end gap-2.5 pt-2">
                <button 
                  type="button" 
                  onClick={() => setSelectedChallenge(null)}
                  className="px-4 py-2 border border-gray-800 hover:border-gray-700 text-xs font-bold text-gray-400 hover:text-white rounded-xl bg-transparent"
                >
                  Hủy
                </button>
                <button type="submit" className="px-5 py-2 btn-neon-gradient text-xs text-black font-bold rounded-xl">
                  Nộp tác phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
