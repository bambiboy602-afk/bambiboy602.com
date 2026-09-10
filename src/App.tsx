import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProfileHeader } from './components/ProfileHeader';
import { ProductsSection } from './components/ProductsSection';
import { ContactCardSection } from './components/ContactCardSection';
import { OrderModal } from './components/OrderModal';
import { Footer } from './components/Footer';
import { GitHubPublishModal } from './components/GitHubPublishModal';
import { RecoveryVideosPage } from './components/RecoveryVideosPage';
import { BambiLearnerSection } from './components/BambiLearnerSection';
import { CommunityResourcesModal, PillarTab } from './components/CommunityResourcesModal';
import { INITIAL_CREATOR_PROFILE, INITIAL_PRODUCTS } from './data/creatorData';
import { INITIAL_RECOVERY_VIDEOS } from './data/recoveryVideosData';
import { ProductItem, RecoveryVideo } from './types';

export default function App() {
  const [profile] = useState(INITIAL_CREATOR_PROFILE);
  const [products] = useState(INITIAL_PRODUCTS);
  const [selectedOrderProduct, setSelectedOrderProduct] = useState<ProductItem | null>(null);
  const [externalPrompt, setExternalPrompt] = useState<string | undefined>(undefined);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState<boolean>(false);
  const [isCommunityResourcesOpen, setIsCommunityResourcesOpen] = useState<boolean>(false);
  const [activePillarTab, setActivePillarTab] = useState<PillarTab>('housing');

  const handleOpenPillar = (pillar: PillarTab) => {
    setActivePillarTab(pillar);
    setIsCommunityResourcesOpen(true);
  };

  // Recovery videos list with localStorage persistence
  const [videos, setVideos] = useState<RecoveryVideo[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bambi_recovery_videos');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            // Automatically strip any unwanted default placeholder video links
            const cleaned = parsed.filter(
              (v: RecoveryVideo) =>
                !v.videoUrl?.includes('dQw4w9WgXcQ') &&
                !v.embedUrl?.includes('dQw4w9WgXcQ')
            );
            if (cleaned.length > 0) {
              return cleaned;
            }
          }
        } catch (e) {
          console.error('Failed to parse saved recovery videos', e);
        }
      }
    }
    return INITIAL_RECOVERY_VIDEOS;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  // User's dedicated Google Gem router link for Tom
  const DEFAULT_TOM_CHAT_URL =
    'https://gemini.google.com/gem-labs/18N5hPnHt6w1c2xWobQaU5yaCpwfJ5_a4';

  const [sharedChatUrl, setSharedChatUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shared_chatbot_url');
      if (saved && (saved.includes('gemini.google.com') || saved.includes('gem-labs'))) {
        return saved;
      }
    }
    return DEFAULT_TOM_CHAT_URL;
  });

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Sync hash on load or change (e.g. #videos or #contact)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#videos') {
        setTimeout(() => scrollToSection('recovery-videos-section'), 100);
      } else if (window.location.hash === '#contact') {
        setTimeout(() => scrollToSection('contact-card-section'), 100);
      } else if (window.location.hash === '#chat') {
        setTimeout(() => scrollToSection('interactive-ai-avatar'), 100);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Video Management Handlers
  const handleAddVideo = (newVideo: RecoveryVideo) => {
    const updated = [newVideo, ...videos];
    setVideos(updated);
    localStorage.setItem('bambi_recovery_videos', JSON.stringify(updated));
  };

  const handleDeleteVideo = (id: string) => {
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    localStorage.setItem('bambi_recovery_videos', JSON.stringify(updated));
  };

  const handleAskTomAboutVideo = (videoTitle: string, videoCategory: string) => {
    setExternalPrompt(
      `Hey Tom, I was watching the recovery video "${videoTitle}" (${videoCategory}). What's the main takeaway from that, and how do we apply it on the street?`
    );
    scrollToSection('interactive-ai-avatar');
  };

  const handleAskAboutProduct = (product: ProductItem) => {
    setExternalPrompt(
      `Hey Tom, can you explain how the ${product.title} helps in recovery and how someone can use it?`
    );
    scrollToSection('interactive-ai-avatar');
  };

  const handleOrderProduct = (product: ProductItem) => {
    setSelectedOrderProduct(product);
  };

  const handleAskAuraFromOrder = (prompt: string) => {
    setExternalPrompt(prompt);
    scrollToSection('interactive-ai-avatar');
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans transition-colors selection:bg-emerald-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        profile={profile}
        currentPage="home"
        onNavigateToHome={() => scrollToSection('creator-profile')}
        onNavigateToVideos={() => scrollToSection('recovery-videos-section')}
        onScrollToProfile={() => scrollToSection('creator-profile')}
        onScrollToProducts={() => scrollToSection('products-for-sale')}
        onScrollToChat={() => scrollToSection('interactive-ai-avatar')}
        onScrollToLearner={() => scrollToSection('bambi-learner-section')}
        onScrollToContact={() => scrollToSection('contact-card-section')}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
        onOpenResources={() => handleOpenPillar('housing')}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <main id="main-content">
        {/* 1. Profile Header with Tom AI Bot fitted on the left (where contact card was) & Profile Bio on the right */}
        <ProfileHeader
          profile={profile}
          products={products}
          sharedChatUrl={sharedChatUrl}
          externalPrompt={externalPrompt}
          onClearExternalPrompt={() => setExternalPrompt(undefined)}
          onScrollToChat={() => scrollToSection('interactive-ai-avatar')}
          onScrollToProducts={() => scrollToSection('products-for-sale')}
          onScrollToVideos={() => scrollToSection('recovery-videos-section')}
          onScrollToContact={() => scrollToSection('contact-card-section')}
          onOpenPillar={handleOpenPillar}
        />

        {/* 2. Products for Sale (Pathway Domino Effect Game & B.A.M.B.I. Workbook) */}
        <ProductsSection
          products={products}
          onAskAboutProduct={handleAskAboutProduct}
          onOpenOrderModal={handleOrderProduct}
        />

        {/* 3. B.A.M.B.I. Interactive Learner Lab & RSM Mapping Engine */}
        <BambiLearnerSection
          onAskTom={(prompt) => {
            setExternalPrompt(prompt);
            scrollToSection('creator-profile');
          }}
        />

        {/* 4. Recovery Video Library (Directly visible on the page with full theater player, categories, & YouTube / GDrive streams) */}
        <RecoveryVideosPage
          videos={videos}
          onAddVideo={handleAddVideo}
          onDeleteVideo={handleDeleteVideo}
          onNavigateHome={() => scrollToSection('creator-profile')}
          onAskTomAboutVideo={handleAskTomAboutVideo}
        />

        {/* 5. Official Contact Card Section (At the bottom of the page with business card, phone 602-767-2147, and call/text buttons) */}
        <ContactCardSection
          profile={profile}
          onScrollToChat={() => scrollToSection('interactive-ai-avatar')}
          onScrollToVideos={() => scrollToSection('recovery-videos-section')}
          onScrollToProducts={() => scrollToSection('products-for-sale')}
        />
      </main>

      {/* Product Order / Reservation Modal */}
      <OrderModal
        product={selectedOrderProduct}
        onClose={() => setSelectedOrderProduct(null)}
        onAskAura={handleAskAuraFromOrder}
      />

      {/* GitHub & bambiboy602.com Deployment Guide Modal */}
      <GitHubPublishModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />

      {/* 4 Pillars Community Resources & Documents Modal */}
      <CommunityResourcesModal
        isOpen={isCommunityResourcesOpen}
        initialTab={activePillarTab}
        onClose={() => setIsCommunityResourcesOpen(false)}
        onOpenTomAI={() => scrollToSection('interactive-ai-avatar')}
      />

      {/* Footer with quick jumps to all sections */}
      <Footer
        profile={profile}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onScrollToChat={() => scrollToSection('interactive-ai-avatar')}
        onScrollToContact={() => scrollToSection('contact-card-section')}
        onNavigateToVideos={() => scrollToSection('recovery-videos-section')}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
      />
    </div>
  );
}
