"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useGlobal } from '../../context/GlobalContext';
import { 
  ShieldCheck, Users, Image as ImageIcon, CreditCard, 
  CheckCircle, AlertTriangle, Play, Loader2, Camera, Award, Globe, Edit3, Clipboard
} from 'lucide-react';

export default function AdminPage() {
  const { 
    assets, 
    setPrimaryVersion, 
    deleteVersion, 
    updateAssetMetadata 
  } = useGlobal();

  const [activeSubTab, setActiveSubTab] = useState<'pending' | 'verification' | 'exif' | 'metadata' | 'copyright' | 'security' | 'discovery' | 'versions' | 'ai'>('pending');
  
  // Custom states
  const [discoveryCategories, setDiscoveryCategories] = useState([
    { id: "dc1", name: "Nature", visible: true, order: 1, banner: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80" },
    { id: "dc2", name: "Business", visible: true, order: 2, banner: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=80" },
    { id: "dc3", name: "Technology", visible: true, order: 3, banner: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&auto=format&fit=crop&q=80" }
  ]);
  const [newCatName, setNewCatName] = useState('');

  const [aiProcessingList, setAiProcessingList] = useState([
    { id: "ap1", assetId: "a1", action: "Auto Enhance & Sharpening", status: "processing", progress: 65, startTime: "10:52 AM" },
    { id: "ap2", assetId: "a3", action: "Background Isolation Model", status: "completed", progress: 100, startTime: "10:45 AM" }
  ]);

  // Selected assets for individual tabs
  const [exifSelectedId, setExifSelectedId] = useState<string>(assets[0]?.id || '');
  const [metaSelectedId, setMetaSelectedId] = useState<string>(assets[0]?.id || '');
  const [selectedAssetId, setSelectedAssetId] = useState<string>('');

  // Metadata form edit states
  const selectedMetaAsset = assets.find(a => a.id === metaSelectedId);
  const [editDateTaken, setEditDateTaken] = useState('');
  const [editCameraBrand, setEditCameraBrand] = useState('');
  const [editCameraModel, setEditCameraModel] = useState('');
  const [editLens, setEditLens] = useState('');
  const [editIso, setEditIso] = useState<number>(100);
  const [editAperture, setEditAperture] = useState('');
  const [editShutter, setEditShutter] = useState('');
  const [editFocal, setEditFocal] = useState('');
  const [editCountry, setEditCountry] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editCopyrightHolder, setEditCopyrightHolder] = useState('');
  const [editCopyrightYear, setEditCopyrightYear] = useState<number>(2026);

  // Sync edits when meta selection changes
  React.useEffect(() => {
    if (selectedMetaAsset) {
      setEditDateTaken(selectedMetaAsset.dateTaken || '');
      setEditCameraBrand(selectedMetaAsset.cameraBrand || '');
      setEditCameraModel(selectedMetaAsset.cameraModel || '');
      setEditLens(selectedMetaAsset.lens || '');
      setEditIso(selectedMetaAsset.iso || 100);
      setEditAperture(selectedMetaAsset.aperture || '');
      setEditShutter(selectedMetaAsset.shutterSpeed || '');
      setEditFocal(selectedMetaAsset.focalLength || '');
      setEditCountry(selectedMetaAsset.country || '');
      setEditCity(selectedMetaAsset.city || '');
      setEditLocation(selectedMetaAsset.location || '');
      setEditCopyrightHolder(selectedMetaAsset.copyrightHolder || '');
      setEditCopyrightYear(selectedMetaAsset.copyrightYear || 2026);
    }
  }, [metaSelectedId, selectedMetaAsset]);

  const [pendingApprovals, setPendingApprovals] = useState([
    { id: "pe1", title: "Midnight Cyberpunk City", category: "Urban", author: "Sophia Vanhoutte", dupeCheck: "Passed (100% Unique)", thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&auto=format&fit=crop&q=80" },
    { id: "pe2", title: "Golden Desert Dunes", category: "Nature", author: "Aria Takahashi", dupeCheck: "Passed (100% Unique)", thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&auto=format&fit=crop&q=80" }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { time: "10:15 AM", user: "Truong Dev (Admin)", action: "Generated secure Signed URL for ID: a1", status: "Success" },
    { time: "09:42 AM", user: "User #8382", action: "Purchased Starter License for ID: a2 via Stripe", status: "Success" },
    { time: "08:12 AM", user: "Cloudflare", action: "Rate limit block on IP: 163.61.182.111 (brute-force prevention)", status: "Blocked" }
  ]);

  const handleApprove = (id: string, title: string) => {
    setPendingApprovals(prev => prev.filter(item => item.id !== id));
    alert(`Đã duyệt cấp phép bản quyền và kích hoạt Signed URL thành công cho "${title}"!`);
  };

  const handleReject = (id: string, title: string) => {
    setPendingApprovals(prev => prev.filter(item => item.id !== id));
    alert(`Đã từ chối tác phẩm "${title}". Thông báo giải trình đã được gửi đến tác giả.`);
  };

  const handleSaveMetadata = (e: React.FormEvent) => {
    e.preventDefault();
    if (!metaSelectedId) return;
    updateAssetMetadata(metaSelectedId, {
      dateTaken: editDateTaken,
      cameraBrand: editCameraBrand,
      cameraModel: editCameraModel,
      lens: editLens,
      iso: Number(editIso),
      aperture: editAperture,
      shutterSpeed: editShutter,
      focalLength: editFocal,
      country: editCountry,
      city: editCity,
      location: editLocation,
      copyrightHolder: editCopyrightHolder,
      copyrightYear: Number(editCopyrightYear)
    });
    alert("💾 Lưu chỉnh sửa siêu dữ liệu EXIF thành công!");
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Page Header */}
      <div className="mb-10 text-left">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-amber-500" /> Admin Command Center
        </h1>
        <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">
          Manage system, photographer licenses, metadata audits, and copyright verification logs
        </p>
      </div>

      {/* Admin Statistics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Total Members</span>
            <strong className="text-xl font-extrabold text-white mt-1 block">15,480</strong>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Photographers</span>
            <strong className="text-xl font-extrabold text-white mt-1 block">1,240</strong>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Monthly Gross</span>
            <strong className="text-xl font-extrabold text-emerald-450 mt-1 block">$48,250.00</strong>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-450">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Active Licenses</span>
            <strong className="text-xl font-extrabold text-white mt-1 block">{assets.length} items</strong>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <ImageIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap border-b border-gray-900 gap-6 mb-8 text-xs font-bold uppercase tracking-wider">
        <button 
          onClick={() => setActiveSubTab('pending')}
          className={`pb-3 border-b-2 transition-all ${activeSubTab === 'pending' ? 'border-amber-500 text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          Moderation Queue ({pendingApprovals.length})
        </button>

        <button 
          onClick={() => setActiveSubTab('verification')}
          className={`pb-3 border-b-2 transition-all ${activeSubTab === 'verification' ? 'border-amber-500 text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          Verification Queue
        </button>

        <button 
          onClick={() => setActiveSubTab('exif')}
          className={`pb-3 border-b-2 transition-all ${activeSubTab === 'exif' ? 'border-amber-500 text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          EXIF Viewer
        </button>

        <button 
          onClick={() => setActiveSubTab('metadata')}
          className={`pb-3 border-b-2 transition-all ${activeSubTab === 'metadata' ? 'border-amber-500 text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          Metadata Manager
        </button>

        <button 
          onClick={() => setActiveSubTab('copyright')}
          className={`pb-3 border-b-2 transition-all ${activeSubTab === 'copyright' ? 'border-amber-500 text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          Copyright Manager
        </button>
        
        <button 
          onClick={() => setActiveSubTab('discovery')}
          className={`pb-3 border-b-2 transition-all ${activeSubTab === 'discovery' ? 'border-amber-500 text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          Discovery
        </button>

        <button 
          onClick={() => setActiveSubTab('versions')}
          className={`pb-3 border-b-2 transition-all ${activeSubTab === 'versions' ? 'border-amber-500 text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          Versions
        </button>

        <button 
          onClick={() => setActiveSubTab('ai')}
          className={`pb-3 border-b-2 transition-all ${activeSubTab === 'ai' ? 'border-amber-500 text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          AI Jobs
        </button>

        <button 
          onClick={() => setActiveSubTab('security')}
          className={`pb-3 border-b-2 transition-all ${activeSubTab === 'security' ? 'border-amber-500 text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          Security Audit
        </button>
      </div>

      {/* 1. Moderation Queue Content */}
      {activeSubTab === 'pending' && (
        <div className="glass-card rounded-3xl p-6">
          <div className="table-responsive">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-900 text-gray-500 uppercase font-bold">
                  <th className="pb-3" style={{ width: '100px' }}>Thumbnail</th>
                  <th className="pb-3">Title / Creator</th>
                  <th className="pb-3">AI Duplicate Check</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900/60">
                {pendingApprovals.map(item => (
                  <tr key={item.id}>
                    <td className="py-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-950 border border-white/5">
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-4">
                      <strong className="text-white font-semibold block">{item.title}</strong>
                      <span className="text-[10px] text-gray-500 font-semibold mt-0.5 block">by {item.author}</span>
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 text-emerald-450 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" /> {item.dupeCheck}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="inline-flex gap-2">
                        <button 
                          onClick={() => handleApprove(item.id, item.title)}
                          className="px-3.5 py-1.5 bg-emerald-500 text-black hover:brightness-110 font-bold text-[10px] uppercase rounded-lg transition-all"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleReject(item.id, item.title)}
                          className="px-3.5 py-1.5 bg-transparent hover:bg-rose-950/20 text-rose-500 border border-gray-800 hover:border-rose-500/20 font-bold text-[10px] uppercase rounded-lg transition-all"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pendingApprovals.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500 font-semibold">
                      Moderation queue is completely clean!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Verification Queue Content */}
      {activeSubTab === 'verification' && (
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-900">Photographer Verification Queue</h3>
          <div className="table-responsive">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-900 text-gray-500 uppercase font-bold">
                  <th className="pb-3">Thumbnail</th>
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Copyright Holder</th>
                  <th className="pb-3">SHA-256 Hash</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900/60">
                {assets.map(asset => (
                  <tr key={asset.id}>
                    <td className="py-3">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-gray-950 border border-white/5">
                        <img src={asset.thumbnailUrl} alt={asset.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-3 font-semibold text-white">{asset.title}</td>
                    <td className="py-3 text-gray-300">{asset.copyrightHolder || "Sophia Vanhoutte"}</td>
                    <td className="py-3 font-mono text-[10px] text-gray-500">{asset.assetHash ? asset.assetHash.substring(0, 16) : 'N/A'}...</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 text-[9px] font-extrabold uppercase border px-2 py-0.5 rounded-full ${
                        asset.verificationStatus === 'verified'
                          ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-450'
                          : 'border-amber-500/20 bg-amber-500/10 text-amber-500'
                      }`}>
                        {asset.verificationStatus || 'pending'}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="inline-flex gap-2">
                        <button 
                          onClick={() => {
                            updateAssetMetadata(asset.id, { verificationStatus: 'verified' });
                            alert("Cấp chứng nhận tác quyền thành công!");
                          }}
                          disabled={asset.verificationStatus === 'verified'}
                          className="px-2.5 py-1 bg-emerald-500 text-black hover:brightness-110 font-bold text-[9px] uppercase rounded disabled:opacity-30"
                        >
                          Verify
                        </button>
                        <button 
                          onClick={() => {
                            updateAssetMetadata(asset.id, { verificationStatus: 'unverified' });
                            alert("Đã hủy chứng nhận tác quyền tác phẩm!");
                          }}
                          disabled={asset.verificationStatus === 'unverified'}
                          className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-500 font-bold text-[9px] uppercase rounded disabled:opacity-30"
                        >
                          Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. EXIF Viewer Content */}
      {activeSubTab === 'exif' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 glass-card rounded-2xl p-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-900">Danh sách tác phẩm</h3>
            <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2">
              {assets.map(a => (
                <button 
                  key={a.id}
                  onClick={() => setExifSelectedId(a.id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                    exifSelectedId === a.id 
                      ? 'border-amber-500 bg-gray-950/60' 
                      : 'border-gray-900 hover:border-gray-800 bg-transparent'
                  }`}
                >
                  <img src={a.thumbnailUrl} alt={a.title} className="w-10 h-8 object-cover rounded border border-white/5 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-white block truncate">{a.title}</span>
                    <span className="text-[9px] text-gray-500 font-semibold uppercase">{a.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 glass-card rounded-3xl p-6">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-900 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-amber-500" /> EXIF Data Dump
            </h3>
            {exifSelectedId && assets.find(a => a.id === exifSelectedId) ? (
              (() => {
                const target = assets.find(a => a.id === exifSelectedId)!;
                return (
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-semibold">
                      <div className="bg-black/30 p-3 rounded-lg border border-gray-900">
                        <span className="text-gray-500 block mb-1">Camera Brand</span>
                        <strong className="text-white">{target.cameraBrand || "N/A"}</strong>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg border border-gray-900">
                        <span className="text-gray-500 block mb-1">Camera Model</span>
                        <strong className="text-white">{target.cameraModel || "N/A"}</strong>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg border border-gray-900">
                        <span className="text-gray-500 block mb-1">Lens Model</span>
                        <strong className="text-white">{target.lens || "N/A"}</strong>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg border border-gray-900">
                        <span className="text-gray-500 block mb-1">ISO</span>
                        <strong className="text-white">{target.iso || "N/A"}</strong>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg border border-gray-900">
                        <span className="text-gray-500 block mb-1">Aperture</span>
                        <strong className="text-white">{target.aperture || "N/A"}</strong>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg border border-gray-900">
                        <span className="text-gray-500 block mb-1">Shutter Speed</span>
                        <strong className="text-white">{target.shutterSpeed || "N/A"}</strong>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg border border-gray-900">
                        <span className="text-gray-500 block mb-1">Focal Length</span>
                        <strong className="text-white">{target.focalLength || "N/A"}</strong>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg border border-gray-900">
                        <span className="text-gray-500 block mb-1">Date Taken</span>
                        <strong className="text-white">{target.dateTaken || "N/A"}</strong>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg border border-gray-900">
                        <span className="text-gray-500 block mb-1">Geo Location</span>
                        <strong className="text-white">{target.city}, {target.country}</strong>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Raw JSON Dump</span>
                      <pre className="bg-black/80 border border-gray-900 rounded-2xl p-4 text-[10px] font-mono text-emerald-400 overflow-x-auto max-h-48">
                        {JSON.stringify(target, null, 2)}
                      </pre>
                    </div>
                  </div>
                );
              })()
            ) : (
              <p className="text-xs text-gray-500 text-center py-8">Vui lòng chọn ảnh ở cột bên trái.</p>
            )}
          </div>
        </div>
      )}

      {/* 4. Metadata Manager Content */}
      {activeSubTab === 'metadata' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 glass-card rounded-2xl p-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-900">Chọn tác phẩm chỉnh sửa</h3>
            <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2">
              {assets.map(a => (
                <button 
                  key={a.id}
                  onClick={() => setMetaSelectedId(a.id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                    metaSelectedId === a.id 
                      ? 'border-amber-500 bg-gray-950/60' 
                      : 'border-gray-900 hover:border-gray-800 bg-transparent'
                  }`}
                >
                  <img src={a.thumbnailUrl} alt={a.title} className="w-10 h-8 object-cover rounded border border-white/5 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-white block truncate">{a.title}</span>
                    <span className="text-[9px] text-gray-500 font-semibold">{a.cameraBrand || 'Unknown Camera'}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 glass-card rounded-3xl p-6">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-5 pb-2 border-b border-gray-900 flex items-center gap-1.5">
              <Edit3 className="w-4 h-4 text-amber-500" /> Edit Metadata & EXIF Overrides
            </h3>

            {selectedMetaAsset ? (
              <form onSubmit={handleSaveMetadata} className="flex flex-col gap-4 text-xs">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Date Taken *</label>
                    <input 
                      type="date" 
                      value={editDateTaken} 
                      onChange={(e) => setEditDateTaken(e.target.value)} 
                      required
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg text-white px-3.5 py-2 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Camera Brand</label>
                    <input 
                      type="text" 
                      value={editCameraBrand} 
                      onChange={(e) => setEditCameraBrand(e.target.value)} 
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg text-white px-3.5 py-2 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Camera Model</label>
                    <input 
                      type="text" 
                      value={editCameraModel} 
                      onChange={(e) => setEditCameraModel(e.target.value)} 
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg text-white px-3.5 py-2 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Lens Model</label>
                    <input 
                      type="text" 
                      value={editLens} 
                      onChange={(e) => setEditLens(e.target.value)} 
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg text-white px-3.5 py-2 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">ISO</label>
                    <input 
                      type="number" 
                      value={editIso} 
                      onChange={(e) => setEditIso(Number(e.target.value))} 
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg text-white px-3.5 py-2 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Aperture</label>
                    <input 
                      type="text" 
                      value={editAperture} 
                      onChange={(e) => setEditAperture(e.target.value)} 
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg text-white px-3.5 py-2 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Shutter Speed</label>
                    <input 
                      type="text" 
                      value={editShutter} 
                      onChange={(e) => setEditShutter(e.target.value)} 
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg text-white px-3.5 py-2 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Focal Length</label>
                    <input 
                      type="text" 
                      value={editFocal} 
                      onChange={(e) => setEditFocal(e.target.value)} 
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg text-white px-3.5 py-2 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Country</label>
                    <input 
                      type="text" 
                      value={editCountry} 
                      onChange={(e) => setEditCountry(e.target.value)} 
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg text-white px-3.5 py-2 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">City</label>
                    <input 
                      type="text" 
                      value={editCity} 
                      onChange={(e) => setEditCity(e.target.value)} 
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg text-white px-3.5 py-2 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Copyright Holder</label>
                    <input 
                      type="text" 
                      value={editCopyrightHolder} 
                      onChange={(e) => setEditCopyrightHolder(e.target.value)} 
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg text-white px-3.5 py-2 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Copyright Year</label>
                    <input 
                      type="number" 
                      value={editCopyrightYear} 
                      onChange={(e) => setEditCopyrightYear(Number(e.target.value))} 
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg text-white px-3.5 py-2 outline-none"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 bg-amber-500 text-black hover:brightness-110 font-bold uppercase rounded-xl transition-all mt-4">
                  Lưu thay đổi Metadata
                </button>
              </form>
            ) : (
              <p className="text-xs text-gray-500 text-center py-8">Chọn tác phẩm ở cột bên trái để cấu hình.</p>
            )}
          </div>
        </div>
      )}

      {/* 5. Copyright Manager Content */}
      {activeSubTab === 'copyright' && (
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-900 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" /> Digital Copyright Registry
          </h3>
          <div className="table-responsive">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-900 text-gray-500 uppercase font-bold">
                  <th className="pb-3">Thumbnail</th>
                  <th className="pb-3">Title / Creator</th>
                  <th className="pb-3">Copyright Sign</th>
                  <th className="pb-3">Digital Fingerprint Hash (SHA-256)</th>
                  <th className="pb-3">Registration Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900/60">
                {assets.map(asset => (
                  <tr key={asset.id}>
                    <td className="py-4">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-gray-950 border border-white/5">
                        <img src={asset.thumbnailUrl} alt={asset.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-4">
                      <strong className="text-white font-semibold block">{asset.title}</strong>
                      <span className="text-[10px] text-gray-500 font-semibold mt-0.5 block">Asset ID: {asset.id}</span>
                    </td>
                    <td className="py-4 text-gray-300 font-semibold">
                      © {asset.copyrightHolder || "Sophia Vanhoutte"} ({asset.copyrightYear || 2026})
                    </td>
                    <td className="py-4">
                      <code className="text-[10px] font-mono text-gray-500 bg-black/40 px-2 py-1 rounded border border-gray-900">
                        {asset.assetHash || "f1a2382c...9acbf31"}
                      </code>
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 text-emerald-450 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[9px] uppercase">
                        ✓ Registered
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Security Audit Logs content */}
      {activeSubTab === 'security' && (
        <div className="glass-card rounded-3xl p-6">
          <div className="flex flex-col gap-3 font-mono text-xs">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="flex justify-between items-center p-3.5 bg-gray-950/40 border border-gray-900/60 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-bold">[{log.time}]</span>
                  <span className="text-amber-500 font-bold">{log.user}:</span>
                  <span className="text-gray-300 font-medium">{log.action}</span>
                </div>
                <span className={`font-bold uppercase tracking-wider text-[9px] px-2 py-0.5 rounded border ${
                  log.status === 'Success' 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-450' 
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                }`}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Discovery Tab Layout */}
      {activeSubTab === 'discovery' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 glass-card rounded-2xl p-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-900">Tạo danh mục Discovery</h3>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!newCatName.trim()) return;
                setDiscoveryCategories([...discoveryCategories, {
                  id: `dc_${Date.now()}`,
                  name: newCatName.trim(),
                  visible: true,
                  order: discoveryCategories.length + 1,
                  banner: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80"
                }]);
                setNewCatName('');
                alert('Tạo danh mục mới thành công!');
              }}
              className="flex flex-col gap-4"
            >
              <input 
                type="text" 
                placeholder="Tên danh mục (Ví dụ: Food, Sports)..." 
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                required
                className="w-full bg-gray-950 border border-gray-900 rounded-xl text-xs text-white px-3.5 py-2.5 outline-none"
              />
              <button type="submit" className="w-full py-2.5 btn-neon-gradient rounded-xl text-xs text-black font-bold">
                Tạo danh mục
              </button>
            </form>
          </div>

          <div className="lg:col-span-8 glass-card rounded-3xl p-6">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-900">Danh sách danh mục Discovery</h3>
            <div className="flex flex-col gap-3 text-xs">
              {discoveryCategories.map(cat => (
                <div key={cat.id} className="flex justify-between items-center p-3.5 bg-gray-950/40 border border-gray-900 rounded-xl">
                  <div className="flex items-center gap-3">
                    <img src={cat.banner} alt={cat.name} className="w-10 h-7 object-cover rounded border border-white/5" />
                    <strong className="text-white font-bold">{cat.name}</strong>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setDiscoveryCategories(prev => prev.map(c => c.id === cat.id ? { ...c, visible: !c.visible } : c));
                      }}
                      className={`px-3 py-1 text-[9px] font-bold uppercase rounded border ${
                        cat.visible ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-450' : 'border-gray-800 text-gray-500'
                      }`}
                    >
                      {cat.visible ? 'Visible' : 'Hidden'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Image Versions Tab Layout */}
      {activeSubTab === 'versions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 glass-card rounded-2xl p-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-900">Chọn tác phẩm</h3>
            <select 
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              className="w-full bg-gray-950 border border-gray-900 text-xs text-white p-2.5 rounded-xl outline-none"
            >
              <option value="">-- Chọn ảnh để xem phiên bản --</option>
              {assets.map(a => (
                <option key={a.id} value={a.id}>{a.title} ({a.versions.length} versions)</option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-8 glass-card rounded-3xl p-6">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-900">Lịch sử và Khôi phục phiên bản</h3>
            {selectedAssetId ? (
              <div className="flex flex-col gap-4">
                {assets.find(a => a.id === selectedAssetId)?.versions.map(v => (
                  <div key={v.id} className="flex justify-between items-center p-3.5 bg-gray-950/40 border border-gray-900 rounded-xl text-xs">
                    <div>
                      <strong className="text-white block font-bold">{v.name}</strong>
                      <span className="text-[10px] text-gray-500 font-semibold">{v.createdDate}</span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setPrimaryVersion(selectedAssetId, v.id);
                          alert('Đã đổi phiên bản chính thành công!');
                        }}
                        disabled={v.isPrimary}
                        className={`px-3 py-1.5 text-[9px] font-bold uppercase rounded-lg border transition-all ${
                          v.isPrimary ? 'border-amber-500/20 bg-amber-500/10 text-amber-500' : 'border-gray-800 hover:border-white text-white'
                        }`}
                      >
                        {v.isPrimary ? 'Primary' : 'Set Mặc định'}
                      </button>

                      <button 
                        onClick={() => {
                          deleteVersion(selectedAssetId, v.id);
                          alert('Đã xóa phiên bản thành công!');
                        }}
                        disabled={v.isPrimary}
                        className="px-3 py-1.5 border border-gray-800 hover:border-red-500/20 hover:bg-red-500/10 text-gray-500 hover:text-red-500 text-[9px] font-bold uppercase rounded-lg transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 font-semibold text-center py-6">Chọn một tác phẩm ở cột bên trái để quản lý các phiên bản chỉnh sửa.</p>
            )}
          </div>
        </div>
      )}

      {/* AI Processing Tab Layout */}
      {activeSubTab === 'ai' && (
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-900">Danh sách hàng đợi xử lý AI</h3>
          <div className="flex flex-col gap-3.5 text-xs">
            {aiProcessingList.map(item => (
              <div key={item.id} className="p-4 bg-gray-950/40 border border-gray-900 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                    <Loader2 className={`w-4 h-4 ${item.status === 'processing' ? 'animate-spin' : ''}`} />
                  </div>
                  <div>
                    <strong className="text-white block font-bold">{item.action}</strong>
                    <span className="text-[10px] text-gray-500 font-semibold">Tác phẩm ID: {item.assetId} • Bắt đầu: {item.startTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4.5">
                  <div className="w-32 bg-gray-900 h-2 rounded-full overflow-hidden border border-gray-800">
                    <div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${item.progress}%` }} />
                  </div>
                  <span className="font-bold text-[10px] text-purple-400 min-w-[32px]">{item.progress}%</span>
                  <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                    item.status === 'processing' ? 'border-amber-500/20 bg-amber-500/10 text-amber-500' : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-450'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
