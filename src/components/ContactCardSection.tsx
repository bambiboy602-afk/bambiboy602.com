import React, { useState } from 'react';
import { CreatorProfile } from '../types';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  ExternalLink,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Share2,
  Heart,
  Eye,
  Maximize2,
  X,
} from 'lucide-react';

interface ContactCardSectionProps {
  profile: CreatorProfile;
  onScrollToChat: () => void;
  onScrollToVideos: () => void;
  onScrollToProducts: () => void;
}

export const ContactCardSection: React.FC<ContactCardSectionProps> = ({
  profile,
  onScrollToChat,
  onScrollToVideos,
  onScrollToProducts,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact-card-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10 items-center">
          {/* Left Column: Official Business Card Display */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative group w-full max-w-md">
              {/* Business Card Box - Restored to true 16:9 aspect ratio of 93f853.png */}
              <div
                onClick={() => setIsZoomed(true)}
                className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-[#A37B4D]/30 dark:border-stone-700 ring-1 ring-stone-400/30 dark:ring-stone-600 bg-[#C29D74] cursor-pointer transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-amber-900/20"
              >
                <img
                  src={profile.businessCardUrl}
                  onError={(e) => {
                    // Fallback to our authentic vector rendering of 93f853 if raster file is pending upload
                    if (!e.currentTarget.src.endsWith('/assets/business-card.svg')) {
                      e.currentTarget.src = '/assets/business-card.svg';
                    }
                  }}
                  alt="Bambi Official Business Card (93f853.png)"
                  className="w-full h-full object-cover"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold backdrop-blur-xs">
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Zoom &amp; Save Card</span>
                </div>
              </div>

              {/* Floating B.A.M.B.I. Crest */}
              <div className="absolute -bottom-5 -right-2 sm:-right-4 bg-white dark:bg-stone-800 shadow-xl rounded-2xl p-2.5 border border-stone-200 dark:border-stone-700 flex items-center gap-3">
                <img
                  src={profile.logoUrl}
                  alt="B.A.M.B.I. Logo"
                  className="w-10 h-10 object-contain rounded-xl"
                />
                <div className="pr-2">
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100 font-serif">
                    B.A.M.B.I.
                  </p>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    Peer Support Services
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-7 text-xs text-stone-500 dark:text-stone-400 text-center flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Click card above to preview full size</span>
            </p>
          </div>

          {/* Right Column: Direct Contact & Action Center */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
            {/* Contact Details List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${profile.phone}`}
                className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-amber-900 dark:text-amber-300 uppercase">Call or Text 24/7</p>
                  <p className="text-sm font-extrabold text-stone-900 dark:text-stone-100 font-mono">602-767-2147</p>
                </div>
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase">Email Directly</p>
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">bambiboy602@gmail.com</p>
                </div>
              </a>

              <a
                href={`https://${profile.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase">Official Website</p>
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100 font-mono">bambiboy602.com</p>
                </div>
              </a>

              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase">Service Area</p>
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100">Phoenix & Valley-Wide, AZ</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${profile.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Call 602-767-2147</span>
              </a>

              <a
                href={`sms:${profile.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send SMS Text</span>
              </a>

              <button
                onClick={handleCopyPhone}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs border border-stone-300 dark:border-stone-700 transition-all"
              >
                {copiedPhone ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedPhone ? 'Copied to Clipboard!' : 'Copy Phone'}</span>
              </button>

              <button
                onClick={onScrollToChat}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Ask Tom AI Online</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-[#C29D74]">
              <img
                src={profile.businessCardUrl}
                onError={(e) => {
                  if (!e.currentTarget.src.endsWith('/assets/business-card.svg')) {
                    e.currentTarget.src = '/assets/business-card.svg';
                  }
                }}
                alt="Bambi Official Business Card Full View"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-white text-xs sm:text-sm font-bold px-2">
              <p>B.A.M.B.I. Peer Support • 602-767-2147 • bambiboy602.com</p>
              <a
                href={profile.businessCardUrl}
                download="bambi-contact-card.png"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Save Card</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
