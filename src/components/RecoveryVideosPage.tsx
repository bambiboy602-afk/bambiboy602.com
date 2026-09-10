import React, { useState, useEffect } from 'react';
import {
  Film,
  Play,
  Share2,
  ExternalLink,
  Trash2,
  Plus,
  Search,
  Check,
  Youtube,
  HardDrive,
  FileVideo,
  Sparkles,
  ArrowLeft,
  X,
  Maximize2,
  Tag,
  Clock,
  Info,
} from 'lucide-react';
import { RecoveryVideo } from '../types';
import { AddVideoModal } from './AddVideoModal';

interface RecoveryVideosPageProps {
  videos: RecoveryVideo[];
  onAddVideo: (video: RecoveryVideo) => void;
  onDeleteVideo: (id: string) => void;
  onNavigateHome: () => void;
  onAskTomAboutVideo: (videoTitle: string, videoCategory: string) => void;
}

export const RecoveryVideosPage: React.FC<RecoveryVideosPageProps> = ({
  videos,
  onAddVideo,
  onDeleteVideo,
  onNavigateHome,
  onAskTomAboutVideo,
}) => {
  const [enlargedVideo, setEnlargedVideo] = useState<RecoveryVideo | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSourceFilter, setActiveSourceFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Domino Effect',
    'The Backpack & Load',
    'Street Stories',
    'Peer Guidance',
    'Bambi Talks',
  ];

  const filteredVideos = (videos || []).filter((video) => {
    if (!video) return false;
    const cat = video.category || 'Peer Guidance';
    const srcType = video.sourceType || 'youtube';
    const title = video.title || '';
    const desc = video.description || '';

    const matchesCat = activeCategory === 'All' || cat === activeCategory;
    const matchesSource =
      activeSourceFilter === 'All' ||
      (activeSourceFilter === 'youtube' && srcType === 'youtube') ||
      (activeSourceFilter === 'gdrive' && srcType === 'gdrive') ||
      (activeSourceFilter === 'direct' && srcType === 'github_or_direct');

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      title.toLowerCase().includes(q) ||
      desc.toLowerCase().includes(q) ||
      cat.toLowerCase().includes(q);

    return matchesCat && matchesSource && matchesSearch;
  });

  // Handle escape key to close enlarged video modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEnlargedVideo(null);
      }
    };
    if (enlargedVideo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [enlargedVideo]);

  const handleOpenEnlarged = (video: RecoveryVideo) => {
    setEnlargedVideo(video);
  };

  const handleDeleteVideo = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onDeleteVideo(id);
    if (enlargedVideo?.id === id) {
      setEnlargedVideo(null);
    }
  };

  const handleCopyShare = (video: RecoveryVideo, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!video?.videoUrl) return;
    navigator.clipboard.writeText(video.videoUrl);
    setCopiedId(video.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="recovery-videos-section" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline mb-2.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Profile &amp; Tom AI</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-amber-500 text-stone-950 shadow-sm">
              <Film className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
                  Recovery Video Library
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-xs font-bold">
                  {videos.length} Videos
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-[11px] font-mono">
                  3×6 Grid
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Compact video placeholders that enlarge into high-definition player. Click any video to enlarge.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button: Add Video */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Video Link</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search video placeholders by title or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>

          {/* Platform Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-200/70 dark:bg-stone-800/70 border border-stone-300/60 dark:border-stone-700 text-xs self-start md:self-auto">
            <button
              onClick={() => setActiveSourceFilter('All')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeSourceFilter === 'All'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              All Sources
            </button>
            <button
              onClick={() => setActiveSourceFilter('youtube')}
              className={`px-2.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                activeSourceFilter === 'youtube'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              <span>YouTube</span>
            </button>
            <button
              onClick={() => setActiveSourceFilter('gdrive')}
              className={`px-2.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                activeSourceFilter === 'gdrive'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5 text-blue-500" />
              <span>Google Drive</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3x6 Video Placeholders Grid (Smaller Placeholders that Enlarge on Click) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {filteredVideos.map((video) => {
          return (
            <div
              key={video.id}
              onClick={() => handleOpenEnlarged(video)}
              className="group bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500/70 dark:hover:border-emerald-500/70 p-2 sm:p-2.5 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between hover:scale-[1.03] active:scale-[0.98] relative"
              title={`Click to enlarge: ${video.title}`}
            >
              {/* Thumbnail Container with Enlarge indicator */}
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-950 mb-2">
                  <img
                    src={video.thumbnailUrl || 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=80'}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />

                  {/* Centered Small Play Overlay */}
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-600/90 text-white shadow-md flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 transition-all">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-white font-mono text-[9px] font-bold">
                      {video.duration}
                    </span>
                  )}

                  {/* Enlarge Hint Icon */}
                  <div className="absolute top-1.5 right-1.5 p-1 rounded bg-black/60 group-hover:bg-emerald-700 text-white opacity-0 group-hover:opacity-100 transition-all">
                    <Maximize2 className="w-3 h-3" />
                  </div>

                  {/* Source Icon */}
                  <div className="absolute top-1.5 left-1.5">
                    {video.sourceType === 'youtube' && (
                      <span className="p-0.5 px-1 rounded bg-black/70 text-red-400 text-[8px] font-bold flex items-center gap-0.5">
                        <Youtube className="w-2.5 h-2.5" />
                      </span>
                    )}
                    {video.sourceType === 'gdrive' && (
                      <span className="p-0.5 px-1 rounded bg-black/70 text-blue-400 text-[8px] font-bold flex items-center gap-0.5">
                        <HardDrive className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Category Pill & Enlarge Label */}
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider truncate max-w-[85px]">
                    {video.category || 'Recovery'}
                  </span>
                  <span className="text-[9px] font-medium text-stone-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-0.5 shrink-0 transition-colors">
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>Enlarge</span>
                  </span>
                </div>

                {/* Compact Title */}
                <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {video.title}
                </h3>
              </div>

              {/* Card Bottom: Quick Actions */}
              <div className="pt-2 mt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[10px] text-stone-500">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAskTomAboutVideo(video.title, video.category || '');
                  }}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-1 font-semibold transition-colors"
                  title="Ask Tom AI about this video"
                >
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  <span>Ask Tom</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleCopyShare(video, e)}
                    className="p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                    title="Copy video link"
                  >
                    {copiedId === video.id ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Share2 className="w-3 h-3" />
                    )}
                  </button>
                  <button
                    onClick={(e) => handleDeleteVideo(video.id, e)}
                    className="p-1 rounded hover:bg-rose-100 dark:hover:bg-rose-950/40 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                    title="Remove placeholder"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State when no videos match */}
      {filteredVideos.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
            <Film className="w-7 h-7" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
              {searchQuery || activeCategory !== 'All' || activeSourceFilter !== 'All'
                ? 'No matching video placeholders found'
                : 'Recovery Video Library Ready'}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              {searchQuery || activeCategory !== 'All' || activeSourceFilter !== 'All'
                ? 'Try resetting your search filters or check a different category.'
                : 'Click below to add your YouTube videos, Shorts, Pathway game demonstrations, or Google Drive links!'}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Video Link</span>
            </button>
            {(searchQuery || activeCategory !== 'All' || activeSourceFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                  setActiveSourceFilter('All');
                }}
                className="px-4 py-2.5 rounded-2xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Guide Banner for YouTube, G-Drive & Video Links */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Film className="w-5 h-5 text-amber-400" />
              <span>Hosting &amp; Adding Recovery Videos</span>
            </h3>
            <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
              You can keep your recovery videos in <strong>Google Drive</strong>, upload to <strong>YouTube</strong> (public or unlisted), or host MP4 files directly. Click <em>"+ Add Video Link"</em> to add any link to your 3×6 table anytime!
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-white text-stone-950 text-xs font-bold hover:bg-stone-100 shadow-md transition-all shrink-0"
          >
            + Add a Video Link Now
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-300 border-t border-white/10">
          <div>
            <span className="font-bold text-white flex items-center gap-1.5 mb-0.5">
              <Youtube className="w-3.5 h-3.5 text-red-400" />
              <span>YouTube</span>
            </span>
            <span>Paste any standard watch URL or Shorts link. Instant high-def embed.</span>
          </div>

          <div>
            <span className="font-bold text-white flex items-center gap-1.5 mb-0.5">
              <HardDrive className="w-3.5 h-3.5 text-blue-400" />
              <span>Google Drive</span>
            </span>
            <span>Set video share permissions to "Anyone with the link can view". Paste share URL.</span>
          </div>

          <div>
            <span className="font-bold text-white flex items-center gap-1.5 mb-0.5">
              <FileVideo className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct MP4 / Web</span>
            </span>
            <span>Paste the raw URL of any MP4 video hosted on your server or cloud storage.</span>
          </div>
        </div>
      </div>

      {/* ENLARGED VIDEO THEATER MODAL (When placeholder is clicked to enlarge) */}
      {enlargedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setEnlargedVideo(null)}
        >
          <div
            className="bg-stone-900 border border-stone-700 rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl flex flex-col text-stone-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-800 bg-stone-950/80">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {enlargedVideo.category || 'Recovery Talk'}
                </span>
                {enlargedVideo.duration && (
                  <span className="text-xs text-stone-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{enlargedVideo.duration}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={enlargedVideo.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Provider</span>
                </a>

                <button
                  onClick={() => setEnlargedVideo(null)}
                  className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Enlarged 16:9 Video Player */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
              {enlargedVideo.sourceType === 'youtube' && (
                <iframe
                  src={`${enlargedVideo.embedUrl}${enlargedVideo.embedUrl.includes('?') ? '&' : '?'}autoplay=1`}
                  title={enlargedVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}

              {enlargedVideo.sourceType === 'gdrive' && (
                <iframe
                  src={enlargedVideo.embedUrl}
                  title={enlargedVideo.title}
                  className="w-full h-full border-0"
                  allow="autoplay"
                  allowFullScreen
                />
              )}

              {enlargedVideo.sourceType === 'github_or_direct' && (
                <video
                  src={enlargedVideo.embedUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Video Details & Actions */}
            <div className="p-6 space-y-4 bg-stone-900">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {enlargedVideo.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {enlargedVideo.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onAskTomAboutVideo(enlargedVideo.title, enlargedVideo.category || '');
                      setEnlargedVideo(null);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                    <span>Discuss with Tom AI</span>
                  </button>

                  <button
                    onClick={(e) => handleCopyShare(enlargedVideo, e)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
                  >
                    {copiedId === enlargedVideo.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDeleteVideo(enlargedVideo.id)}
                    className="p-2 rounded-xl bg-stone-800 hover:bg-rose-950/60 text-stone-400 hover:text-rose-400 transition-colors"
                    title="Delete Video"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Troubleshooting Note */}
              <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-between gap-3 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>If third-party browser protection restricts embedded player playback:</span>
                </div>
                <a
                  href={enlargedVideo.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-400 hover:underline shrink-0"
                >
                  Open Direct Link →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Video Modal */}
      <AddVideoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVideo={onAddVideo}
      />
    </div>
  );
};
