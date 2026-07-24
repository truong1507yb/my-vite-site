"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MediaAsset, Photographer, MOCK_ASSETS, MOCK_PHOTOGRAPHERS } from '../lib/mockData';

export interface CartItem {
  asset: MediaAsset;
  licenseType: 'personal' | 'commercial' | 'extended' | 'exclusive';
  price: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

export interface MessageItem {
  id: string;
  sender: string;
  text: string;
  time: string;
}

interface GlobalContextType {
  assets: MediaAsset[];
  photographers: Photographer[];
  cart: CartItem[];
  favorites: string[];
  membership: 'Free' | 'Starter' | 'Pro' | 'Business' | 'Enterprise';
  uploadedAssets: MediaAsset[];
  downloads: string[];
  notifications: NotificationItem[];
  messages: MessageItem[];
  addToCart: (asset: MediaAsset, licenseType: 'personal' | 'commercial' | 'extended' | 'exclusive') => void;
  removeFromCart: (assetId: string) => void;
  clearCart: () => void;
  toggleFavorite: (assetId: string) => void;
  isFavorite: (assetId: string) => boolean;
  upgradeMembership: (plan: 'Free' | 'Starter' | 'Pro' | 'Business' | 'Enterprise') => void;
  uploadAsset: (asset: Omit<MediaAsset, 'id' | 'views' | 'downloads' | 'likes' | 'uploadDate' | 'featured' | 'versions' | 'aiHistory' | 'status' | 'visibility' | 'verificationStatus' | 'assetHash'>) => string;
  downloadAsset: (assetId: string) => void;
  addAIRevision: (assetId: string, name: string, url: string, overwrite: boolean) => void;
  setPrimaryVersion: (assetId: string, versionId: string) => void;
  deleteVersion: (assetId: string, versionId: string) => void;
  updateDiscoveryCategories: (assetId: string, categories: string[]) => void;
  updateAssetMetadata: (assetId: string, updates: Partial<MediaAsset>) => void;
  markNotificationsRead: () => void;
  addMessage: (sender: string, text: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [membership, setMembership] = useState<'Free' | 'Starter' | 'Pro' | 'Business' | 'Enterprise'>('Free');
  const [downloads, setDownloads] = useState<string[]>([]);
  const [assets, setAssets] = useState<MediaAsset[]>([]);

  // Computed state for uploaded assets
  const uploadedAssets = assets.filter(a => a.id.startsWith('u_'));
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: "n1", title: "Cấp phép thành công", desc: "Giấy phép thương mại cho tác phẩm 'Cyberpunk Tokyo Rain' đã sẵn sàng.", time: "10 phút trước", read: false },
    { id: "n2", title: "Bảo mật nâng cao", desc: "Chữ ký mã hóa SHA-256 đã được đính kèm vào tất cả các giao dịch tải xuống.", time: "1 giờ trước", read: false }
  ]);
  const [messages, setMessages] = useState<MessageItem[]>([
    { id: "m1", sender: "Sophia Vanhoutte", text: "Chào bạn, tôi rất vui vì bạn đã thích các tác phẩm kiến trúc tối giản của tôi! Bạn có cần cấp phép độc quyền không?", time: "2 giờ trước" }
  ]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Initialize theme on client mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme_preference') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = systemDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme_preference', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  // Combine default assets and custom uploaded ones
  useEffect(() => {
    const savedCart = localStorage.getItem('licensing_cart');
    const savedFavs = localStorage.getItem('licensing_favorites');
    const savedMember = localStorage.getItem('licensing_membership');
    const savedDownloads = localStorage.getItem('licensing_downloads');
    const savedAssets = localStorage.getItem('licensing_assets');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedMember) setMembership(savedMember as any);
    if (savedDownloads) setDownloads(JSON.parse(savedDownloads));
    if (savedAssets) {
      setAssets(JSON.parse(savedAssets));
    } else {
      setAssets(MOCK_ASSETS);
    }
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const saveAssetsState = (newAssets: MediaAsset[]) => {
    setAssets(newAssets);
    localStorage.setItem('licensing_assets', JSON.stringify(newAssets));
  };

  const addToCart = (asset: MediaAsset, licenseType: 'personal' | 'commercial' | 'extended' | 'exclusive') => {
    const price = asset.prices[licenseType];
    const newCart = [...cart.filter(item => item.asset.id !== asset.id), { asset, licenseType, price }];
    setCart(newCart);
    saveToStorage('licensing_cart', newCart);
  };

  const removeFromCart = (assetId: string) => {
    const newCart = cart.filter(item => item.asset.id !== assetId);
    setCart(newCart);
    saveToStorage('licensing_cart', newCart);
  };

  const clearCart = () => {
    setCart([]);
    saveToStorage('licensing_cart', []);
  };

  const toggleFavorite = (assetId: string) => {
    const newFavs = favorites.includes(assetId)
      ? favorites.filter(id => id !== assetId)
      : [...favorites, assetId];
    setFavorites(newFavs);
    saveToStorage('licensing_favorites', newFavs);
  };

  const isFavorite = (assetId: string) => favorites.includes(assetId);

  const upgradeMembership = (plan: 'Free' | 'Starter' | 'Pro' | 'Business' | 'Enterprise') => {
    setMembership(plan);
    localStorage.setItem('licensing_membership', plan);
    
    // Add welcome notification
    const newNotif = {
      id: Date.now().toString(),
      title: `Chào mừng nâng cấp: ${plan}`,
      desc: `Gói thành viên ${plan} của bạn đã được kích hoạt. Hãy khám phá các ưu tiên hỗ trợ đặc quyền!`,
      time: "Vừa xong",
      read: false
    };
    setNotifications([newNotif, ...notifications]);
  };

  const uploadAsset = (asset: Omit<MediaAsset, 'id' | 'views' | 'downloads' | 'likes' | 'uploadDate' | 'featured' | 'versions' | 'aiHistory' | 'status' | 'visibility' | 'verificationStatus' | 'assetHash'>) => {
    const id = `u_${Date.now()}`;
    const hashChars = "0123456789abcdef";
    const randomHash = Array.from({ length: 64 }, () => hashChars[Math.floor(Math.random() * 16)]).join('');
    
    const newAsset: MediaAsset = {
      ...asset,
      id,
      views: 0,
      downloads: 0,
      likes: 0,
      uploadDate: new Date().toISOString().substring(0, 10),
      featured: false,
      versions: [
        { id: `v_${Date.now()}`, name: "Original", url: asset.url, isPrimary: true, createdDate: new Date().toISOString().substring(0, 10) }
      ],
      aiHistory: [],
      status: "active",
      visibility: "public",
      assetHash: randomHash,
      verificationStatus: 'pending'
    };
    const newAssets = [newAsset, ...assets];
    saveAssetsState(newAssets);
    return id;
  };

  const downloadAsset = (assetId: string) => {
    if (!downloads.includes(assetId)) {
      const newDownloads = [...downloads, assetId];
      setDownloads(newDownloads);
      saveToStorage('licensing_downloads', newDownloads);
      
      const newAssets = assets.map(a => a.id === assetId ? { ...a, downloads: a.downloads + 1 } : a);
      saveAssetsState(newAssets);
    }
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addMessage = (sender: string, text: string) => {
    const newMsg: MessageItem = {
      id: Date.now().toString(),
      sender,
      text,
      time: "Vừa xong"
    };
    setMessages([...messages, newMsg]);
  };

  const addAIRevision = (assetId: string, name: string, url: string, overwrite: boolean) => {
    const newAssets = assets.map(asset => {
      if (asset.id === assetId) {
        const newVersion = {
          id: `v_${Date.now()}`,
          name,
          url,
          isPrimary: !overwrite,
          createdDate: new Date().toISOString().split('T')[0]
        };

        let updatedVersions = [...asset.versions];
        if (overwrite) {
          updatedVersions = updatedVersions.map(v => v.isPrimary ? { ...v, url } : v);
        } else {
          updatedVersions = updatedVersions.map(v => ({ ...v, isPrimary: false }));
          updatedVersions.push(newVersion);
        }

        const primaryVersion = updatedVersions.find(v => v.isPrimary) || updatedVersions[0];

        const newHistoryLog = {
          id: `h_${Date.now()}`,
          action: `AI Enhanced: ${name}`,
          versionId: newVersion.id,
          date: new Date().toISOString().split('T')[0]
        };

        return {
          ...asset,
          versions: updatedVersions,
          url: primaryVersion.url,
          aiHistory: [newHistoryLog, ...asset.aiHistory]
        };
      }
      return asset;
    });
    saveAssetsState(newAssets);
  };

  const setPrimaryVersion = (assetId: string, versionId: string) => {
    const newAssets = assets.map(asset => {
      if (asset.id === assetId) {
        const updatedVersions = asset.versions.map(v => ({
          ...v,
          isPrimary: v.id === versionId
        }));
        const primary = updatedVersions.find(v => v.isPrimary) || updatedVersions[0];
        
        return {
          ...asset,
          versions: updatedVersions,
          url: primary.url
        };
      }
      return asset;
    });
    saveAssetsState(newAssets);
  };

  const deleteVersion = (assetId: string, versionId: string) => {
    const newAssets = assets.map(asset => {
      if (asset.id === assetId) {
        if (asset.versions.length <= 1) {
          alert("Không thể xóa phiên bản duy nhất còn lại!");
          return asset;
        }

        const filtered = asset.versions.filter(v => v.id !== versionId);
        let updatedVersions = [...filtered];
        const hasPrimary = updatedVersions.some(v => v.isPrimary);
        if (!hasPrimary && updatedVersions.length > 0) {
          updatedVersions[0].isPrimary = true;
        }

        const primary = updatedVersions.find(v => v.isPrimary) || updatedVersions[0];

        return {
          ...asset,
          versions: updatedVersions,
          url: primary ? primary.url : asset.url
        };
      }
      return asset;
    });
    saveAssetsState(newAssets);
  };

  const updateDiscoveryCategories = (assetId: string, categories: string[]) => {
    const newAssets = assets.map(asset => {
      if (asset.id === assetId) {
        return {
          ...asset,
          discoveryCategories: categories
        };
      }
      return asset;
    });
    saveAssetsState(newAssets);
  };

  const updateAssetMetadata = (assetId: string, updates: Partial<MediaAsset>) => {
    const newAssets = assets.map(asset => {
      if (asset.id === assetId) {
        const mergedUpdates = { ...updates };
        const newExif = {
          ...asset.exif,
          camera: updates.cameraBrand && updates.cameraModel 
            ? `${updates.cameraBrand} ${updates.cameraModel}` 
            : asset.exif.camera,
          lens: updates.lens || asset.exif.lens,
          iso: updates.iso !== undefined ? Number(updates.iso) : asset.exif.iso,
          aperture: updates.aperture || asset.exif.aperture,
          shutterSpeed: updates.shutterSpeed || asset.exif.shutterSpeed,
        };
        
        return {
          ...asset,
          ...mergedUpdates,
          exif: newExif
        };
      }
      return asset;
    });
    saveAssetsState(newAssets);
  };

  return (
    <GlobalContext.Provider value={{
      assets,
      photographers: MOCK_PHOTOGRAPHERS,
      cart,
      favorites,
      membership,
      uploadedAssets,
      downloads,
      notifications,
      messages,
      addToCart,
      removeFromCart,
      clearCart,
      toggleFavorite,
      isFavorite,
      upgradeMembership,
      uploadAsset,
      downloadAsset,
      markNotificationsRead,
      addMessage,
      theme,
      toggleTheme,
      addAIRevision,
      setPrimaryVersion,
      deleteVersion,
      updateDiscoveryCategories,
      updateAssetMetadata
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useGlobal must be used within GlobalProvider');
  return context;
};
