"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Globe, ShieldCheck, Award, Lock, ShieldAlert, CheckCircle2,
  Mail, ArrowRight 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="main-footer w-full bg-white dark:bg-[#0A0F1D] text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-900 transition-all select-none">
      
      {/* 8-Column Detailed Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-gray-100 dark:border-gray-900">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          
          {/* Col 1: Company */}
          <div className="flex flex-col">
            <h5 className="text-[11px] font-extrabold tracking-wider text-gray-900 dark:text-white uppercase mb-4">Company</h5>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <li><Link href="/company/about" className="hover:text-black dark:hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/company/careers" className="hover:text-black dark:hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/company/press" className="hover:text-black dark:hover:text-white transition-colors">Press Room</Link></li>
              <li><Link href="/company/sustainability" className="hover:text-black dark:hover:text-white transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Col 2: Product */}
          <div className="flex flex-col">
            <h5 className="text-[11px] font-extrabold tracking-wider text-gray-900 dark:text-white uppercase mb-4">Product</h5>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <li><Link href="/product/features" className="hover:text-black dark:hover:text-white transition-colors">AI Features</Link></li>
              <li><Link href="/product/pro" className="hover:text-black dark:hover:text-white transition-colors">Desenio Pro</Link></li>
              <li><Link href="/product/mobile" className="hover:text-black dark:hover:text-white transition-colors">Mobile App</Link></li>
              <li><Link href="/product/api" className="hover:text-black dark:hover:text-white transition-colors">API Pricing</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="flex flex-col">
            <h5 className="text-[11px] font-extrabold tracking-wider text-gray-900 dark:text-white uppercase mb-4">Resources</h5>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <li><Link href="/search" className="hover:text-black dark:hover:text-white transition-colors">Image Gallery</Link></li>
              <li><Link href="/search" className="hover:text-black dark:hover:text-white transition-colors">Asset Collections</Link></li>
              <li><Link href="/inspiration" className="hover:text-black dark:hover:text-white transition-colors">Creative Ideas</Link></li>
              <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Col 4: Community */}
          <div className="flex flex-col">
            <h5 className="text-[11px] font-extrabold tracking-wider text-gray-900 dark:text-white uppercase mb-4">Community</h5>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <li><Link href="/community/hub" className="hover:text-black dark:hover:text-white transition-colors">Creative Hub</Link></li>
              <li><Link href="/community/quests" className="hover:text-black dark:hover:text-white transition-colors">Creator Quests</Link></li>
              <li><Link href="/community/blog" className="hover:text-black dark:hover:text-white transition-colors">Licensing Blog</Link></li>
              <li><Link href="/community/forum" className="hover:text-black dark:hover:text-white transition-colors">Forum Discussions</Link></li>
            </ul>
          </div>

          {/* Col 5: Support & Legal */}
          <div className="flex flex-col">
            <h5 className="text-[11px] font-extrabold tracking-wider text-gray-900 dark:text-white uppercase mb-4">Support & Legal</h5>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">DMCA Policy</Link></li>
              <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Col 6: Newsletter & Social */}
          <div className="flex flex-col gap-4">
            <div>
              <h5 className="text-[11px] font-extrabold tracking-wider text-gray-900 dark:text-white uppercase mb-3">Newsletter</h5>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Cảm ơn bạn đã đăng ký!');
                  (e.target as HTMLFormElement).reset();
                }}
                className="relative flex items-center w-full"
              >
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  required
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white text-xs text-gray-900 dark:text-white py-2 pl-3 pr-8 rounded-xl outline-none"
                />
                <button type="submit" className="absolute right-1 w-6.5 h-6.5 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
            
            {/* Social Icons (Desenio Style) */}
            <div>
              <h5 className="text-[10px] font-extrabold tracking-wider text-gray-500 uppercase mb-2">Connect</h5>
              <div className="flex items-center gap-2.5 text-gray-400">
                <Link href="#" className="hover:text-blue-600 transition-colors" title="LinkedIn">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </Link>
                <Link href="#" className="hover:text-blue-500 transition-colors" title="Facebook">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </Link>
                <Link href="#" className="hover:text-pink-600 transition-colors" title="Instagram">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </Link>
                <Link href="#" className="hover:text-red-600 transition-colors" title="YouTube">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </Link>
                <Link href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors" title="GitHub">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Bottom Bar with Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Badges Left */}
        <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
          <span className="flex items-center gap-1.5 border border-gray-200 dark:border-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-md bg-gray-50 dark:bg-gray-900/40">
            <Globe className="w-3.5 h-3.5 text-blue-500" /> GLOBAL LICENSING
          </span>
          <span className="flex items-center gap-1.5 border border-gray-200 dark:border-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-md bg-gray-50 dark:bg-gray-900/40">
            <Award className="w-3.5 h-3.5 text-amber-500" /> VERIFIED CONTENT
          </span>
          <span className="flex items-center gap-1.5 border border-gray-200 dark:border-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-md bg-gray-50 dark:bg-gray-900/40">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> BLOCKCHAIN HASH
          </span>
          <span className="flex items-center gap-1.5 border border-gray-200 dark:border-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-md bg-gray-50 dark:bg-gray-900/40">
            <Lock className="w-3.5 h-3.5 text-indigo-500" /> SSL SECURED
          </span>
          <span className="flex items-center gap-1.5 border border-gray-200 dark:border-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-md bg-gray-50 dark:bg-gray-900/40">
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" /> DMCA PROTECTED
          </span>
        </div>

        {/* Legal & Status Right */}
        <div className="text-center md:text-right">
          <div className="flex justify-center md:justify-end gap-3.5 text-xs font-bold text-gray-500 mb-2">
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Accessibility</Link>
            <span className="text-gray-300 dark:text-gray-800">•</span>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> API Status: Online
            </Link>
          </div>
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-wider uppercase">
            COPYRIGHT © 2026 DESENIO GROUP, INC. ALL RIGHTS RESERVED
          </p>
        </div>

      </div>
    </footer>
  );
};
