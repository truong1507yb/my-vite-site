"use client";

import React, { useState } from 'react';
import { 
  Heart, MessageSquare, Bookmark, Share2, Sparkles, 
  Send, User, Image as ImageIcon, CheckCircle2 
} from 'lucide-react';

interface HubPost {
  id: string;
  author: string;
  avatarUrl: string;
  verified: boolean;
  time: string;
  caption: string;
  imageUrl: string;
  likes: number;
  commentsCount: number;
  bookmarked: boolean;
  liked: boolean;
}

export default function HubPage() {
  // Feed list state
  const [posts, setPosts] = useState<HubPost[]>([
    {
      id: "hp1",
      author: "Marcus Sterling",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      verified: true,
      time: "2 giờ trước",
      caption: "Mới hoàn thành bộ ảnh kiến trúc thô mộc tại Berlin. Ánh sáng và bóng đổ hình học thật tuyệt vời!",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
      likes: 124,
      commentsCount: 18,
      bookmarked: false,
      liked: false
    },
    {
      id: "hp2",
      author: "Aria Takahashi",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
      verified: true,
      time: "5 giờ trước",
      caption: "Bình minh trên những cồn cát đỏ. Tự nhiên luôn là nguồn cảm hứng vĩnh cửu.",
      imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80",
      likes: 85,
      commentsCount: 6,
      bookmarked: true,
      liked: true
    }
  ]);

  // Form states to create post
  const [captionInput, setCaptionInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          liked: !p.liked,
          likes: p.liked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  const handleBookmark = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          bookmarked: !p.bookmarked
        };
      }
      return p;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captionInput.trim()) return;

    // Use default premium Unsplash landscape URL if input is empty
    const imgUrl = imageInput.trim() || "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=600&auto=format&fit=crop&q=80";

    const newPost: HubPost = {
      id: `hp_${Date.now()}`,
      author: "Truong Dev",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      verified: true,
      time: "Vừa xong",
      caption: captionInput.trim(),
      imageUrl: imgUrl,
      likes: 0,
      commentsCount: 0,
      bookmarked: false,
      liked: false
    };

    setPosts([newPost, ...posts]);
    setCaptionInput('');
    setImageInput('');
    alert('Đăng bài viết lên Creative Hub thành công!');
  };

  const handleShare = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/community/hub#${id}`);
    alert('Đã sao chép liên kết bài đăng!');
  };

  return (
    <div className="relative max-w-3xl mx-auto px-4 py-12 select-none">
      
      {/* Header */}
      <div className="text-left mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-6.5 h-6.5 text-[var(--color-primary-neon)]" /> Creative Hub
        </h1>
        <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">
          Share your inspirations, photos, and licensing layouts with the community
        </p>
      </div>

      {/* Share Box Form */}
      <div className="glass-card rounded-2xl p-5 mb-8">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4.5 flex items-center gap-1.5 pb-2 border-b border-gray-900">
          <Send className="w-4 h-4 text-purple-400" /> Share your work
        </h3>
        
        <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
          <textarea 
            placeholder="Write caption... What inspired this visual layout?" 
            value={captionInput}
            onChange={(e) => setCaptionInput(e.target.value)}
            required
            rows={2}
            className="w-full bg-gray-950 border border-gray-900 rounded-xl text-xs text-white px-3.5 py-3 outline-none"
          ></textarea>
          
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative w-full">
              <ImageIcon className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Optional image URL (e.g. Unsplash URL)..." 
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                className="w-full bg-gray-950 border border-gray-900 rounded-xl text-xs text-white py-2.5 pl-10 pr-4 outline-none"
              />
            </div>
            
            <button type="submit" className="w-full sm:w-auto px-6 py-2.5 btn-neon-gradient rounded-xl text-xs font-bold text-black shrink-0">
              Publish Post
            </button>
          </div>
        </form>
      </div>

      {/* Feed List */}
      <div className="flex flex-col gap-6">
        {posts.map(p => (
          <div key={p.id} id={p.id} className="glass-card rounded-3xl p-5 flex flex-col gap-4">
            
            {/* Header row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-gray-900 shrink-0">
                  <img src={p.avatarUrl} alt={p.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    {p.author}
                    {p.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary-neon)] fill-black" />}
                  </h4>
                  <span className="text-[10px] text-gray-500 font-semibold">{p.time}</span>
                </div>
              </div>
              
              <button 
                onClick={() => handleBookmark(p.id)}
                className={`text-gray-500 hover:text-white transition-colors ${p.bookmarked ? 'text-amber-500 hover:text-amber-500' : ''}`}
                title={p.bookmarked ? "Bookmarked" : "Bookmark"}
              >
                <Bookmark className={`w-4.5 h-4.5 ${p.bookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Caption */}
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              {p.caption}
            </p>

            {/* Visual Attachment */}
            {p.imageUrl && (
              <div className="rounded-2xl overflow-hidden bg-gray-950 border border-white/5 max-h-[400px]">
                <img src={p.imageUrl} alt="Attached Visual" className="w-full h-auto max-h-[400px] object-cover" />
              </div>
            )}

            {/* Actions & Counters */}
            <div className="flex items-center justify-between border-t border-gray-900/60 pt-3 text-gray-500 text-xs font-semibold">
              <div className="flex gap-4">
                <button 
                  onClick={() => handleLike(p.id)}
                  className={`flex items-center gap-1 hover:text-white transition-colors ${p.liked ? 'text-rose-500 hover:text-rose-500' : ''}`}
                >
                  <Heart className={`w-4 h-4 ${p.liked ? 'fill-current' : ''}`} />
                  <span>{p.likes} likes</span>
                </button>

                <button 
                  onClick={() => alert('Chức năng bình luận đang được phát triển!')}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{p.commentsCount} comments</span>
                </button>
              </div>

              <button 
                onClick={() => handleShare(p.id)}
                className="flex items-center gap-1 hover:text-white transition-colors"
                title="Copy share link"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
