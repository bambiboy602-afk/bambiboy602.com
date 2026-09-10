import React from 'react';
import { Bot, Heart, Sparkles, Shield, ArrowUp, Phone, Mail, Globe, GitBranch } from 'lucide-react';
import { CreatorProfile } from '../types';

interface FooterProps {
  profile: CreatorProfile;
  onScrollToTop: () => void;
  onScrollToChat: () => void;
  onScrollToContact?: () => void;
  onNavigateToVideos?: () => void;
  onOpenGitHubModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  onScrollToTop,
  onScrollToChat,
  onScrollToContact,
  onNavigateToVideos,
  onOpenGitHubModal,
}) => {
  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-stone-100/80 dark:bg-stone-950/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Organization info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src={profile.logoUrl}
                alt="B.A.M.B.I. Logo"
                className="w-8 h-8 rounded-xl object-contain bg-white dark:bg-stone-900 p-0.5 border border-stone-200 dark:border-stone-700"
              />
              <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                B.A.M.B.I. Peer Support Services
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md leading-relaxed">
              "{profile.motto}" Real lived-experience peer support helping individuals navigate addiction recovery, housing, work resources, and legal assistance.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-stone-600 dark:text-stone-300">
              <a
                href={`tel:${profile.phone}`}
                className="inline-flex items-center gap-1 hover:text-emerald-600 font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>602-767-2147</span>
              </a>
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1 hover:text-emerald-600"
              >
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>bambiboy602@gmail.com</span>
              </a>
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <span className="text-stone-500">Phoenix, Arizona</span>
            </div>
          </div>

          {/* Col 2: Products & Curriculum */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
              Recovery Products & Media
            </p>
            <ul className="text-xs space-y-2 text-stone-600 dark:text-stone-300">
              <li>
                <strong>PATHWAY: Domino Effect Game</strong> ($34)
                <span className="block text-[11px] text-stone-500">Build the chain. Break the chain.</span>
              </li>
              <li>
                <strong>B.A.M.B.I. Participant Workbook</strong> ($19)
                <span className="block text-[11px] text-stone-500">6 Sessions + Backpack & Load exercises</span>
              </li>
              {onNavigateToVideos && (
                <li>
                  <button
                    onClick={onNavigateToVideos}
                    className="hover:text-emerald-600 font-semibold underline text-left"
                  >
                    Recovery Video Library (YouTube & Drive)
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Interactive & Crisis Line */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
              Resources & Crisis
            </p>
            <ul className="text-xs space-y-1.5 text-stone-600 dark:text-stone-300">
              <li>
                <button onClick={onScrollToChat} className="hover:text-emerald-600 underline text-left">
                  Talk to Tom AI (Voice & Search)
                </button>
              </li>
              {onScrollToContact && (
                <li>
                  <button onClick={onScrollToContact} className="hover:text-amber-600 font-semibold underline text-left">
                    Direct Contact Card (602-767-2147)
                  </button>
                </li>
              )}
              <li>
                <span className="text-rose-600 dark:text-rose-400 font-bold">In Immediate Crisis?</span>
                <span className="block text-[11px] text-stone-500">
                  Dial <strong>988</strong> (Lifeline) or <strong>911</strong>
                </span>
              </li>
              {onOpenGitHubModal && (
                <li>
                  <button
                    onClick={onOpenGitHubModal}
                    className="inline-flex items-center gap-1 hover:text-emerald-600"
                  >
                    <GitBranch className="w-3 h-3" />
                    <span>bambiboy602.com Domain Setup</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <p>© {new Date().getFullYear()} B.A.M.B.I. Peer Support Services • bambiboy602.com. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {onOpenGitHubModal && (
              <button
                onClick={onOpenGitHubModal}
                className="hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1"
              >
                <GitBranch className="w-3 h-3" />
                <span>GitHub Deployment</span>
              </button>
            )}
            <button
              onClick={onScrollToTop}
              className="flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100 transition-colors font-medium"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
