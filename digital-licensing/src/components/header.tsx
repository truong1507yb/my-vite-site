"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobal } from '../context/GlobalContext';
import { 
  Search, Bell, MessageSquare, Heart, ShoppingCart, 
  User, Menu, X, ChevronDown, LayoutDashboard, LogOut, ShieldCheck, Sun, Moon 
} from 'lucide-react';

export const Header: React.FC = () => {
  const router = useRouter();
  const { cart, favorites, notifications, messages, markNotificationsRead, theme, toggleTheme } = useGlobal();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="main-header sticky top-0 z-50 glass-effect border-b border-card-border h-18 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left Side: Logo + Main Nav */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="flex flex-col select-none">
            <span className="font-extrabold text-lg tracking-wider text-white flex items-center">
              DESENIO
              <span className="text-[var(--color-primary-neon)] font-black text-xl leading-none">.</span>
              <span className="text-[var(--color-rose-neon)] font-black text-xl leading-none">.</span>
            </span>
            <span className="text-[9px] font-semibold tracking-[4px] text-gray-500 uppercase -mt-0.5">LICENSING</span>
          </Link>

          {/* Desktop Nav (Inspired by Shutterstock / 500px) */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-gray-400">
            {/* Discover Link */}
            <Link href="/discover" className="hover:text-white transition-colors">Discover</Link>

            {/* Inspiration Dropdown */}
            <div className="relative group py-2">
              <Link href="/inspiration" className="hover:text-white flex items-center gap-1 transition-colors">
                Inspiration <ChevronDown className="w-3.5 h-3.5" />
              </Link>
              <div className="absolute left-0 mt-2 w-48 bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-2xl hidden group-hover:block z-50">
                <Link href="/inspiration?tab=trending" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">Trending</Link>
                <Link href="/inspiration?tab=editor-choice" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">Editor's Choice</Link>
                <Link href="/inspiration?tab=ai-recommended" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">AI Recommended</Link>
              </div>
            </div>

            {/* Product Dropdown */}
            <div className="relative group py-2">
              <span className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer">
                Product <ChevronDown className="w-3.5 h-3.5" />
              </span>
              <div className="absolute left-0 mt-2 w-48 bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-2xl hidden group-hover:block z-50">
                <Link href="/product/features" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">AI Features</Link>
                <Link href="/product/pro" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">Desenio Pro</Link>
                <Link href="/product/mobile" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">Mobile App</Link>
                <Link href="/product/api" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">API Pricing</Link>
              </div>
            </div>

            {/* Community Dropdown */}
            <div className="relative group py-2">
              <span className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer">
                Community <ChevronDown className="w-3.5 h-3.5" />
              </span>
              <div className="absolute left-0 mt-2 w-48 bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-2xl hidden group-hover:block z-50">
                <Link href="/community/hub" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">Creative Hub</Link>
                <Link href="/community/quests" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">Photographer Quests</Link>
                <Link href="/community/blog" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">Licensing Blog</Link>
                <Link href="/community/forum" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">Community Forum</Link>
              </div>
            </div>

            {/* Company Dropdown */}
            <div className="relative group py-2">
              <span className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer">
                Company <ChevronDown className="w-3.5 h-3.5" />
              </span>
              <div className="absolute left-0 mt-2 w-48 bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-2xl hidden group-hover:block z-50">
                <Link href="/company/about" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">About Us</Link>
                <Link href="/company/sustainability" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">Sustainability</Link>
                <Link href="/company/press" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">Press Room</Link>
                <Link href="/company/careers" className="block px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">Careers</Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search powered by AI..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900/60 border border-gray-800 focus:border-[var(--color-primary-neon)]/50 focus:shadow-[0_0_15px_rgba(0,212,255,0.1)] rounded-full text-xs text-white py-2.5 pl-10 pr-4 outline-none transition-all duration-300"
            />
          </form>
        </div>

        {/* Right Side: Icons & Account */}
        <div className="flex items-center gap-3.5 sm:gap-4.5 text-gray-400">
          
          {/* Favorites */}
          <Link href="/dashboard?tab=wishlist" className="hover:text-white transition-colors relative" title="Favorites">
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--color-rose-neon)] text-[9px] font-bold text-white w-4 h-4 rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/cart" className="hover:text-white transition-colors relative" title="Shopping Cart">
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--color-primary-neon)] text-[9px] font-bold text-black w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => {
                setNotifDropdownOpen(!notifDropdownOpen);
                setProfileDropdownOpen(false);
                markNotificationsRead();
              }}
              className="hover:text-white transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 w-2 h-2 rounded-full"></span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-gray-950 border border-gray-800 rounded-2xl p-4 shadow-2xl z-50 animate-fade-in">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-800">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Thông báo</h4>
                  <span className="text-[10px] text-gray-500">Mới nhất</span>
                </div>
                <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="text-xs">
                      <div className="flex justify-between items-center">
                        <strong className="text-white font-semibold">{n.title}</strong>
                        <span className="text-[10px] text-gray-500">{n.time}</span>
                      </div>
                      <p className="text-gray-400 mt-0.5 leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <Link href="/dashboard?tab=messages" className="hover:text-white transition-colors relative" title="Messages">
            <MessageSquare className="w-5 h-5" />
            {messages.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-500 w-2 h-2 rounded-full"></span>
            )}
          </Link>

          {/* Theme Toggler (Light / Dark) */}
          <button 
            onClick={toggleTheme}
            className="hover:text-white transition-colors p-1"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <span className="h-5 w-[1px] bg-gray-800 hidden sm:block"></span>

          {/* Upload Button Desktop */}
          <Link href="/upload" className="hidden sm:inline-block text-xs font-bold text-white bg-gray-900 border border-gray-800 hover:border-[var(--color-primary-neon)] px-4.5 py-2 rounded-full transition-all">
            Upload
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setNotifDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--color-primary-neon)] to-[var(--color-secondary-neon)] p-[1.5px]">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 hidden sm:block" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl z-50">
                <div className="p-4 border-b border-gray-800">
                  <h4 className="text-xs font-bold text-white">Truong Dev</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">Admin & Photographer</p>
                </div>
                <div className="p-1.5 flex flex-col">
                  <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-gray-900/60 rounded-xl transition-all">
                    <LayoutDashboard className="w-4 h-4 text-gray-400" /> User Dashboard
                  </Link>
                  <Link href="/admin" className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-gray-900/60 rounded-xl transition-all">
                    <ShieldCheck className="w-4 h-4 text-amber-500" /> Admin Panel
                  </Link>
                  <hr className="border-gray-800 my-1.5" />
                  <button onClick={() => alert('Đăng xuất thành công')} className="flex items-center gap-2.5 px-3 py-2 text-xs text-rose-500 hover:bg-rose-950/20 rounded-xl transition-all w-full text-left">
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button className="lg:hidden hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-18 left-0 w-full bg-gray-950 border-b border-gray-900 p-6 flex flex-col gap-4.5 z-40 animate-fade-in shadow-2xl">
          <nav className="flex flex-col gap-4 text-sm font-semibold text-gray-400">
            <Link href="/" className="hover:text-white" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/search" className="hover:text-white" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
            <Link href="/search" className="hover:text-white" onClick={() => setMobileMenuOpen(false)}>Licensing</Link>
            <Link href="/#pricing" className="hover:text-white" onClick={() => setMobileMenuOpen(false)}>Membership</Link>
            <Link href="/upload" className="hover:text-white" onClick={() => setMobileMenuOpen(false)}>Upload Asset</Link>
          </nav>
          <div className="pt-4 border-t border-gray-900">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-gray-500 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-full text-xs text-white py-2 pl-9 pr-4 outline-none"
              />
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
