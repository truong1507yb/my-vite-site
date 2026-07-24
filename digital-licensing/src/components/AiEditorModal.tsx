"use client";

import React, { useState } from 'react';
import { Sparkles, Check, X, Shield, Crop, Image as ImageIcon, Sliders } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

interface AiEditorModalProps {
  assetId: string;
  originalUrl: string;
  onClose: () => void;
}

export const AiEditorModal: React.FC<AiEditorModalProps> = ({ assetId, originalUrl, onClose }) => {
  const { addAIRevision } = useGlobal();

  // Active AI filters configurations
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [saveMode, setSaveMode] = useState<'new' | 'overwrite'>('new');
  const [versionName, setVersionName] = useState('AI Enhanced Version');

  // Preview modification states
  const [isProcessing, setIsProcessing] = useState(false);

  const filtersList = [
    { id: "enhance", name: "Image Enhance", desc: "Tự động cân bằng sáng và tương phản" },
    { id: "upscale", name: "Upscale 4X", desc: "Tăng kích thước và độ sắc nét chi tiết" },
    { id: "nobg", name: "Remove Background", desc: "Tách nền ảnh nhanh chóng" },
    { id: "replacebg", name: "Replace Background", desc: "Thay đổi phông nền bằng mô tả AI" },
    { id: "removeobj", name: "Remove Object", desc: "Xóa vật thể thừa thông minh" },
    { id: "aifill", name: "AI Fill", desc: "Vẽ thêm chi tiết vào vùng được chọn" },
    { id: "expand", name: "Expand Image", desc: "Mở rộng góc nhìn bốn cạnh bằng AI" },
    { id: "style", name: "Style Transfer", desc: "Chuyển thể ảnh theo phong cách nghệ thuật" },
    { id: "color", name: "Color Correction", desc: "Tối ưu hóa bảng màu sắc chân thực" },
    { id: "relight", name: "Relight", desc: "Tái định vị hướng nguồn sáng chuyên nghiệp" },
    { id: "watermark", name: "Watermark Preview", desc: "Xem trước đóng dấu bản quyền an toàn" }
  ];

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId]
    );
  };

  const handleApplyAI = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      
      const resultUrl = activeFilters.length > 0 
        ? "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1000&auto=format&fit=crop&q=80"
        : originalUrl;

      // Determine version name based on filters
      let vName = versionName;
      if (activeFilters.includes("upscale")) {
        vName = "AI Upscaled";
      } else if (activeFilters.includes("nobg")) {
        vName = "Background Removed";
      } else if (activeFilters.includes("enhance")) {
        vName = "AI Enhanced";
      }

      // Always save as new to protect original image
      addAIRevision(assetId, vName, resultUrl, false);
      alert(`Đã xử lý AI và lưu thành công phiên bản mới: "${vName}"!`);
      onClose();
    }, 1200);
  };

  // Dynamically compute CSS filters based on selected toggles for client-side preview
  const getPreviewStyle = () => {
    let filterString = "";
    if (activeFilters.includes("enhance")) filterString += "brightness(1.15) contrast(1.1) ";
    if (activeFilters.includes("denoise")) filterString += "blur(0.2px) ";
    if (activeFilters.includes("sharpen")) filterString += "contrast(1.25) saturate(1.1) ";
    if (activeFilters.includes("color")) filterString += "saturate(1.3) hue-rotate(5deg) ";
    
    return {
      filter: filterString || undefined,
      opacity: activeFilters.includes("nobg") ? 0.85 : 1
    };
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="glass-card rounded-3xl w-full max-w-4xl bg-gray-950/95 border border-gray-800 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[70vh]">
        
        {/* Left Side: Preview screen workspace */}
        <div className="flex-1 bg-gray-950 p-6 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-gray-900">
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-[var(--color-primary-neon)]" /> AI Preview Workspace
            </span>
            {activeFilters.length > 0 && (
              <span className="text-[9px] font-bold text-[var(--color-primary-neon)] bg-[var(--color-primary-neon)]/15 border border-[var(--color-primary-neon)]/20 px-2 py-0.5 rounded-full">
                {activeFilters.length} AI Filters active
              </span>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center overflow-hidden rounded-2xl relative border border-gray-900 bg-gray-900/20">
            {isProcessing && (
              <div className="absolute inset-0 bg-black/60 z-20 flex flex-col items-center justify-center gap-3">
                <span className="w-8 h-8 border-2 border-[var(--color-primary-neon)] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold text-gray-300 font-mono">Running AI models...</span>
              </div>
            )}
            
            <img 
              src={originalUrl} 
              alt="AI Workspace Preview" 
              style={getPreviewStyle()}
              className="max-h-[45vh] w-auto object-contain rounded-lg shadow-xl transition-all duration-300"
            />
          </div>

          <div className="mt-4 text-[10px] text-gray-500 text-center font-medium">
            Drag/select options on the right. Preview displays mock filter effects.
          </div>
        </div>

        {/* Right Side: Options and controllers */}
        <div className="w-full md:w-80 p-6 flex flex-col justify-between overflow-y-auto shrink-0 bg-gray-950/40">
          <div>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-4.5 h-4.5 text-purple-400" /> AI Creative Editor
              </h3>
              <button onClick={onClose} className="text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of filters */}
            <div className="flex flex-col gap-2.5 max-h-[30vh] overflow-y-auto pr-1 mb-6">
              {filtersList.map(f => {
                const active = activeFilters.includes(f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => toggleFilter(f.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                      active 
                        ? 'border-purple-500/60 bg-purple-500/10 text-white' 
                        : 'border-gray-900 hover:border-gray-800 bg-transparent text-gray-400'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                      active ? 'border-purple-500 bg-purple-500 text-black' : 'border-gray-800'
                    }`}>
                      {active && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <div>
                      <h4 className="text-[11px] font-bold text-white leading-tight">{f.name}</h4>
                      <p className="text-[9px] text-gray-500 mt-0.5 leading-snug">{f.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Save options */}
            <div className="border-t border-gray-900 pt-4 flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Version Name</label>
                <input 
                  type="text" 
                  value={versionName}
                  onChange={(e) => setVersionName(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-900 rounded-lg text-[10px] text-white px-3 py-2 outline-none focus:border-purple-500/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-bold text-gray-550 uppercase tracking-wider">Lưu trữ bảo mật</label>
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-[9px] font-semibold text-purple-300 rounded-xl leading-relaxed">
                  Để bảo vệ bản quyền tuyệt đối, ảnh gốc ban đầu không bao giờ bị ghi đè. Hệ thống tự động lưu kết quả thành một phiên bản mới.
                </div>
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="flex gap-2.5 pt-4 border-t border-gray-900 mt-6">
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-800 hover:border-gray-700 text-xs font-bold text-gray-400 hover:text-white rounded-xl bg-transparent transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleApplyAI}
              disabled={isProcessing}
              className="flex-1 py-2.5 btn-neon-gradient rounded-xl text-xs font-bold text-black flex items-center justify-center gap-1"
            >
              Save Edition <Check className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
