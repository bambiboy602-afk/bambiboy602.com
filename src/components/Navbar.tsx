import React from 'react';
import { Sparkles, ShoppingBag, User, Phone, Globe, Moon, Sun, GitBranch, Heart, Film } from 'lucide-react';
import { CreatorProfile } from '../types';

interface NavbarProps {
  profile: CreatorProfile;
  currentPage: 'home' | 'videos';
  onNavigateToHome: () => void;
  onNavigateToVideos: () => void;
  onScrollToProfile: () => void;
  onScrollToProducts: () => void;
  onScrollToChat: () => void;
  onScrollToLearner?: () => void;
  onScrollToContact: () => void;
  onOpenGitHubModal: () => void;
  onOpenResources?: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  currentPage,
  onNavigateToHome,
  onNavigateToVideos,
  onScrollToProfile,
  onScrollToProducts,
  onScrollToChat,
  onScrollToLearner,
  onScrollToContact,
  onOpenGitHubModal,
  onOpenResources,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-50/90 dark:bg-stone-950/90 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <button
          onClick={onScrollToProfile}
          className="flex items-center gap-3 text-left group"
        >
          <img
            src={profile.logoUrl}
            alt="B.A.M.B.I. Logo"
            className="w-10 h-10 object-contain rounded-xl shadow-sm group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black tracking-wider text-emerald-950 dark:text-emerald-300 font-serif">
                B.A.M.B.I.
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-bold">
                Peer Support
              </span>
            </div>
            <span className="block text-[11px] text-stone-500 dark:text-stone-400 font-medium truncate max-w-[160px] sm:max-w-xs">
              bambiboy602.com • By Bambi
            </span>
          </div>
        </button>

        {/* Center Nav Anchors */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-5 text-xs font-semibold text-stone-600 dark:text-stone-300">
          <button
            onClick={onScrollToProfile}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>

          {onOpenResources && (
            <button
              onClick={onOpenResources}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-800 dark:text-emerald-300 font-bold"
            >
              <span>4 Pillars Docs</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-700 text-white font-black">
                PDFs
              </span>
            </button>
          )}

          <button
            onClick={onScrollToChat}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-800 dark:text-emerald-300 font-bold"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Tom AI Bot</span>
          </button>

          {onScrollToLearner && (
            <button
              onClick={onScrollToLearner}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 text-stone-700 dark:text-stone-300 font-semibold"
            >
              <span>Learner Lab</span>
            </button>
          )}

          <button
            onClick={onScrollToProducts}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Pathway & Workbook</span>
          </button>

          <button
            onClick={onNavigateToVideos}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 bg-amber-100/70 dark:bg-amber-950/50 px-2.5 py-1 rounded-xl text-amber-900 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800/60"
          >
            <Film className="w-3.5 h-3.5 text-amber-600" />
            <span>Recovery Videos</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500 text-stone-950 font-black">
              10
            </span>
          </button>

          <button
            onClick={onScrollToContact}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span>Contact Card</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Recovery Videos quick button for mobile */}
          <button
            onClick={onNavigateToVideos}
            className="md:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold shadow-xs transition-colors"
          >
            <Film className="w-3.5 h-3.5" />
            <span>Videos</span>
          </button>

          {/* Quick Contact Button for mobile */}
          <button
            onClick={onScrollToContact}
            className="md:hidden inline-flex items-center gap-1 px-2 py-1.5 rounded-xl bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold"
          >
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span>Card</span>
          </button>

          {/* GitHub / Custom Domain Publish Guide */}
          <button
            onClick={onOpenGitHubModal}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-200/70 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold transition-colors"
            title="GitHub Pages & bambiboy602.com Deployment Guide"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub & Domain</span>
          </button>

          {/* Quick Call Button (Desktop) */}
          <a
            href={`tel:${profile.phone}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold shadow-sm transition-all"
            title="Call Bambi directly"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>602-767-2147</span>
          </a>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            title="Toggle Light / Dark Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Talk to Tom CTA */}
          <button
            onClick={() => {
              if (currentPage !== 'home') {
                onNavigateToHome();
                setTimeout(() => onScrollToChat(), 100);
              } else {
                onScrollToChat();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Talk to Tom</span>
          </button>
        </div>
      </div>
    </header>
  );
};
