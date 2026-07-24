"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobal } from '../../context/GlobalContext';
import { 
  UploadCloud, Sparkles, ShieldAlert, Cpu, 
  CheckCircle2, Loader2, ArrowRight 
} from 'lucide-react';

import { AiEditorModal } from '../../components/AiEditorModal';

export default function UploadPage() {
  const router = useRouter();
  const { uploadAsset } = useGlobal();

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Nature');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Metadata & EXIF States
  const [dateTaken, setDateTaken] = useState('');
  const [cameraBrand, setCameraBrand] = useState('');
  const [cameraModel, setCameraModel] = useState('');
  const [lens, setLens] = useState('');
  const [iso, setIso] = useState<number>(100);
  const [aperture, setAperture] = useState('f/4.0');
  const [shutterSpeed, setShutterSpeed] = useState('1/125s');
  const [focalLength, setFocalLength] = useState('50mm');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [copyrightHolder, setCopyrightHolder] = useState('Sophia Vanhoutte');
  const [copyrightYear, setCopyrightYear] = useState<number>(2026);
  const [isExifFound, setIsExifFound] = useState(false);
  
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Success flow states
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedAssetId, setUploadedAssetId] = useState('');
  const [uploadedAssetUrl, setUploadedAssetUrl] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // AI Assist Simulation states
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const [isCheckingDupes, setIsCheckingDupes] = useState(false);
  const [dupeCheckResult, setDupeCheckResult] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const previewUrl = URL.createObjectURL(file);
      setSelectedFile(previewUrl);
      
      const fileNameWithoutExt = file.name.split('.').slice(0, -1).join('.') || "Untitled Cinematic Landscape";
      setTitle(fileNameWithoutExt);
      
      simulateExifExtraction();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setSelectedFile(previewUrl);
      
      const fileNameWithoutExt = file.name.split('.').slice(0, -1).join('.') || "Untitled Landscape Capture";
      setTitle(fileNameWithoutExt);
      
      simulateExifExtraction();
    }
  };

  // Simulate EXIF reader
  const simulateExifExtraction = () => {
    const cameras = [
      { brand: "Sony", model: "Alpha 7R V", lens: "Sony FE 24-70mm f/2.8 GM II", iso: 100, aperture: "f/8.0", shutter: "1/160s", focal: "35mm" },
      { brand: "Canon", model: "EOS R5", lens: "Canon RF 50mm f/1.2L USM", iso: 800, aperture: "f/1.2", shutter: "1/80s", focal: "50mm" },
      { brand: "Fujifilm", model: "GFX 100S", lens: "GF 32-64mm f/4 R LM WR", iso: 200, aperture: "f/5.6", shutter: "1/125s", focal: "32mm" }
    ];
    const camera = cameras[Math.floor(Math.random() * cameras.length)];
    
    setCameraBrand(camera.brand);
    setCameraModel(camera.model);
    setLens(camera.lens);
    setIso(camera.iso);
    setAperture(camera.aperture);
    setShutterSpeed(camera.shutter);
    setFocalLength(camera.focal);
    
    const today = new Date();
    today.setDate(today.getDate() - Math.floor(Math.random() * 30));
    setDateTaken(today.toISOString().split('T')[0]);
    
    setCountry("Vietnam");
    setCity("Hanoi");
    setLocation("Old Quarter");
    
    setCopyrightHolder("Sophia Vanhoutte");
    setCopyrightYear(2026);
    
    setIsExifFound(true);
    alert("📸 Tự động trích xuất siêu dữ liệu EXIF thành công!");
  };

  const generateAITags = () => {
    if (!selectedFile) {
      alert("Vui lòng tải ảnh lên trước khi chạy AI!");
      return;
    }
    setIsGeneratingTags(true);
    // Simulate API call to OpenAI
    setTimeout(() => {
      setIsGeneratingTags(false);
      setTags(["sunset", "cinematic", "hdr", "8k resolution", "gold", "outdoor", "reflection"]);
      setDescription("A dramatic cinematic landscape capture rendered at sunset with professional EXIF configurations.");
    }, 1500);
  };

  const runDuplicateCheck = () => {
    if (!selectedFile) {
      alert("Vui lòng tải ảnh lên trước khi kiểm tra!");
      return;
    }
    setIsCheckingDupes(true);
    // Simulate duplicate check using Redis Fingerprinting
    setTimeout(() => {
      setIsCheckingDupes(false);
      setDupeCheckResult("0% Match. Unique asset. Safe for licensing.");
    }, 1200);
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim().toLowerCase()]);
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Vui lòng tải lên một tệp hình ảnh!");
      return;
    }

    const newId = uploadAsset({
      type: "image",
      title: title || "Tác phẩm không tiêu đề",
      description: description || "Chưa có mô tả tác phẩm.",
      url: selectedFile,
      originalUrl: selectedFile,
      thumbnailUrl: selectedFile,
      category,
      tags: tags.length > 0 ? tags : ["cinematic", "creative"],
      colors: ["#1F2937", "#6B7280"],
      photographerId: "p1", // Sophia Vanhoutte
      exif: {
        camera: cameraBrand && cameraModel ? `${cameraBrand} ${cameraModel}` : "Unknown Camera",
        lens: lens || "Unknown Lens",
        aperture: aperture || "f/4.0",
        shutterSpeed: shutterSpeed || "1/125s",
        iso: Number(iso) || 100,
        resolution: "9504 x 6336"
      },
      prices: {
        personal: 29,
        commercial: 149,
        extended: 399,
        exclusive: 1200
      },
      discoveryCategories: selectedCategories.length > 0 ? selectedCategories : [category],
      dateTaken: dateTaken || new Date().toISOString().split('T')[0],
      cameraBrand: cameraBrand || "Unknown",
      cameraModel: cameraModel || "Unknown",
      lens: lens || "Unknown",
      iso: Number(iso) || 100,
      aperture: aperture || "f/4.0",
      shutterSpeed: shutterSpeed || "1/125s",
      focalLength: focalLength || "50mm",
      country: country || "Unknown",
      city: city || "Unknown",
      location: location || "Unknown",
      copyrightHolder: copyrightHolder || "Sophia Vanhoutte",
      copyrightYear: Number(copyrightYear) || 2026
    });

    setUploadedAssetId(newId);
    setUploadedAssetUrl(selectedFile);
    setIsUploaded(true);
  };

  if (isUploaded) {
    return (
      <div className="relative max-w-lg mx-auto px-4 py-20 text-center select-none">
        <div className="glass-card rounded-3xl p-8 border border-gray-800 bg-gray-950/90 shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          
          <h2 className="text-xl font-black text-white mb-2">Upload thành công!</h2>
          <p className="text-xs text-gray-500 font-semibold mb-6">Tác phẩm của bạn đã được tải lên và lưu trữ an toàn dưới dạng ảnh gốc 100%.</p>

          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gray-900 mb-8 bg-gray-900/40">
            <img src={uploadedAssetUrl} alt="Uploaded Original Preview" className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button 
              type="button"
              onClick={() => setIsAiModalOpen(true)}
              className="w-full py-3.5 btn-neon-gradient rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4.5 h-4.5 text-black" /> ✨ AI Generate
            </button>

            <button 
              type="button"
              onClick={() => router.push('/dashboard')}
              className="w-full py-3.5 border border-gray-800 hover:border-gray-700 text-xs font-bold text-gray-400 hover:text-white rounded-xl bg-transparent transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        </div>

        {/* AI Editor Modal Overlay */}
        {isAiModalOpen && (
          <AiEditorModal 
            assetId={uploadedAssetId}
            originalUrl={uploadedAssetUrl}
            onClose={() => {
              setIsAiModalOpen(false);
              router.push('/dashboard');
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="mb-10 text-left">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <UploadCloud className="w-7 h-7 text-[var(--color-primary-neon)]" /> Upload Creative Assets
        </h1>
        <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">
          Upload photo or video to build your licensing portfolio
        </p>
      </div>

      {/* Main Grid: Drag & Drop Left + Metadata Right */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: File drop */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 min-h-[45vh] flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              isDragOver 
                ? 'border-[var(--color-primary-neon)] bg-[var(--color-primary-neon)]/5 shadow-[0_0_20px_rgba(0,212,255,0.15)]' 
                : 'border-gray-800 hover:border-gray-700 bg-transparent'
            }`}
          >
            {selectedFile ? (
              <div className="relative w-full h-full flex flex-col items-center">
                <img src={selectedFile} alt="Preview" className="max-h-[35vh] object-contain rounded-xl shadow-lg mb-4" />
                <button 
                  type="button" 
                  onClick={() => setSelectedFile(null)}
                  className="text-xs font-bold text-[var(--color-rose-neon)] hover:underline"
                >
                  Xóa và chọn tệp khác
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 mb-4 border border-gray-800">
                  <UploadCloud className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Drag and drop file here</h3>
                <p className="text-xs text-gray-500 font-medium max-w-sm mb-6 leading-relaxed">
                  Support High resolution JPG, PNG, WebP up to 100MB. Video support up to 500MB.
                </p>
                <input 
                  type="file" 
                  id="file-input"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden" 
                />
                <label 
                  htmlFor="file-input"
                  className="px-6 py-2.5 bg-gray-950 border border-gray-800 hover:border-white text-xs font-bold text-white rounded-full transition-all cursor-pointer"
                >
                  Browse Files
                </label>
              </div>
            )}
          </div>

          {/* AI Assistance Control */}
          <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-gray-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" /> AI Co-Pilot Assistant
            </h3>
            
            <div className="flex flex-wrap gap-3">
              <button 
                type="button" 
                onClick={generateAITags}
                disabled={isGeneratingTags}
                className="px-4 py-2.5 bg-purple-950/20 border border-purple-500/20 hover:border-purple-500/60 rounded-xl text-xs font-semibold text-purple-300 transition-all flex items-center gap-1.5"
              >
                {isGeneratingTags ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                Generate AI Tags & Desc
              </button>

              <button 
                type="button" 
                onClick={runDuplicateCheck}
                disabled={isCheckingDupes}
                className="px-4 py-2.5 bg-blue-950/20 border border-blue-500/20 hover:border-blue-500/60 rounded-xl text-xs font-semibold text-blue-300 transition-all flex items-center gap-1.5"
              >
                {isCheckingDupes ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Cpu className="w-3.5 h-3.5" />}
                Copyright Fingerprint Check
              </button>
            </div>

            {dupeCheckResult && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5" />
                <span>{dupeCheckResult}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Metadata Form */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="glass-card rounded-3xl p-6 flex flex-col gap-5">
            
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Asset Title</label>
              <input 
                type="text" 
                placeholder="Enter title (e.g. Iceland Horizon)" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-gray-950 border border-gray-800 focus:border-[var(--color-primary-neon)]/50 rounded-xl text-xs text-white px-3.5 py-2.5 outline-none"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Creative Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-950 border border-gray-900 focus:border-[var(--color-primary-neon)] rounded-xl text-xs text-white p-2.5 outline-none cursor-pointer"
              >
                <option value="Nature">Nature & Landscape</option>
                <option value="Urban">Urban & Cityscape</option>
                <option value="Architecture">Modern Architecture</option>
              </select>
            </div>

            {/* Discovery Categories (Multi-select checkboxes) */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Discovery Categories (Select multiple)</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-400 max-h-32 overflow-y-auto bg-gray-950 p-3.5 border border-gray-900 rounded-2xl">
                {["Nature", "Business", "Technology", "Architecture", "Luxury", "Travel", "Food", "Fashion", "Lifestyle", "Wildlife", "Minimal", "Branding", "Illustration", "AI Generated"].map(catName => {
                  const checked = selectedCategories.includes(catName);
                  return (
                    <label key={catName} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                      <input 
                        type="checkbox" 
                        checked={checked} 
                        onChange={() => {
                          setSelectedCategories(prev => 
                            prev.includes(catName) 
                              ? prev.filter(c => c !== catName) 
                              : [...prev, catName]
                          );
                        }}
                        className="accent-[var(--color-primary-neon)] cursor-pointer"
                      />
                      <span>{catName}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Tags manager */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Asset Tags</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Add a custom tag..." 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white px-3.5 py-2.5 outline-none"
                />
                <button 
                  type="button" 
                  onClick={handleAddTag}
                  className="px-4 py-2.5 bg-gray-900 border border-gray-800 text-xs font-bold text-white rounded-xl hover:border-white transition-all"
                >
                  Add
                </button>
              </div>

              {/* Tag badges listing */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1 bg-gray-900 border border-gray-800 text-[10px] font-semibold text-gray-300 px-3 py-1 rounded-full"
                    >
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => removeTag(idx)} 
                        className="text-gray-500 hover:text-white font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* EXIF & Copyright metadata form fields */}
            <div className="border-t border-gray-900 pt-4 flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                📅 Image EXIF & Copyright Details
              </h3>

              {isExifFound && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 rounded-xl">
                  ✓ EXIF data successfully extracted from image. You can edit manual overrides below.
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Date Taken *</label>
                  <input 
                    type="date" 
                    value={dateTaken}
                    onChange={(e) => setDateTaken(e.target.value)}
                    required
                    className="w-full bg-gray-950 border border-gray-900 rounded-lg text-xs text-white px-3 py-2 outline-none focus:border-[var(--color-primary-neon)]/50"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Camera Brand</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sony, Canon"
                    value={cameraBrand}
                    onChange={(e) => setCameraBrand(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-900 rounded-lg text-xs text-white px-3 py-2 outline-none focus:border-[var(--color-primary-neon)]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Camera Model</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Alpha 7R V"
                    value={cameraModel}
                    onChange={(e) => setCameraModel(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-900 rounded-lg text-xs text-white px-3 py-2 outline-none focus:border-[var(--color-primary-neon)]/50"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Lens Model</label>
                  <input 
                    type="text" 
                    placeholder="e.g. FE 24-70mm f/2.8"
                    value={lens}
                    onChange={(e) => setLens(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-900 rounded-lg text-xs text-white px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">ISO</label>
                  <input 
                    type="number" 
                    value={iso}
                    onChange={(e) => setIso(Number(e.target.value))}
                    className="w-full bg-gray-950 border border-gray-900 rounded-lg text-xs text-white px-3 py-2 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Aperture</label>
                  <input 
                    type="text" 
                    placeholder="e.g. f/4.0"
                    value={aperture}
                    onChange={(e) => setAperture(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-900 rounded-lg text-xs text-white px-3 py-2 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Shutter</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 1/125s"
                    value={shutterSpeed}
                    onChange={(e) => setShutterSpeed(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-900 rounded-lg text-xs text-white px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Focal Length</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 50mm"
                    value={focalLength}
                    onChange={(e) => setFocalLength(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-900 rounded-lg text-xs text-white px-3 py-2 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Country</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Vietnam"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-900 rounded-lg text-xs text-white px-3 py-2 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">City</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Hanoi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-900 rounded-lg text-xs text-white px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Copyright Holder</label>
                  <input 
                    type="text" 
                    value={copyrightHolder}
                    onChange={(e) => setCopyrightHolder(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-900 rounded-lg text-xs text-white px-3 py-2 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Copyright Year</label>
                  <input 
                    type="number" 
                    value={copyrightYear}
                    onChange={(e) => setCopyrightYear(Number(e.target.value))}
                    className="w-full bg-gray-950 border border-gray-900 rounded-lg text-xs text-white px-3 py-2 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Watermark option switch */}
            <div className="flex items-center justify-between p-3.5 bg-gray-950/30 border border-gray-900 rounded-2xl mt-2">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Bảo vệ Watermark bản quyền</span>
                <span className="text-[10px] text-gray-500 mt-0.5">Tự động chèn lưới ký số chống đánh cắp ảnh gốc</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4.5 h-4.5 accent-[var(--color-primary-neon)] cursor-pointer" />
            </div>

            {/* Submit button */}
            <button 
              type="submit" 
              className="w-full mt-4 py-3.5 btn-neon-gradient rounded-xl font-extrabold text-xs flex items-center justify-center gap-2"
            >
              Kích hoạt & Phát hành Giấy phép bản quyền <ArrowRight className="w-4.5 h-4.5 text-black" />
            </button>

          </div>
        </div>

      </form>

    </div>
  );
}
