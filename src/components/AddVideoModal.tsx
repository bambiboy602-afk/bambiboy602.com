import React, { useState } from 'react';
import { X, Plus, Video, Youtube, HardDrive, FileVideo, Info, CheckCircle2 } from 'lucide-react';
import { RecoveryVideo } from '../types';
import { parseVideoUrl } from '../utils/videoHelpers';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVideo: (video: RecoveryVideo) => void;
}

export const AddVideoModal: React.FC<AddVideoModalProps> = ({ isOpen, onClose, onAddVideo }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<RecoveryVideo['category']>('Domino Effect');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  if (!isOpen) return null;

  const detected = parseVideoUrl(url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !title.trim()) return;

    const parsed = parseVideoUrl(url.trim());

    const newVideo: RecoveryVideo = {
      id: `custom-video-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'Recovery video by Bambi for B.A.M.B.I. Peer Support.',
      category,
      sourceType: parsed.sourceType,
      videoUrl: url.trim(),
      embedUrl: parsed.embedUrl,
      thumbnailUrl:
        parsed.thumbnailUrl ||
        'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=800&q=80',
      duration: duration.trim() || 'Video',
      dateAdded: new Date().toISOString().split('T')[0],
      featured: false,
    };

    onAddVideo(newVideo);
    onClose();
    // Reset form
    setUrl('');
    setTitle('');
    setDescription('');
    setDuration('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-sm">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Add Recovery Video
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Supports YouTube, Google Drive links, or direct MP4 / GitHub URLs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Video URL */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-stone-700 dark:text-stone-300">
                Video URL (YouTube, Google Drive, or GitHub) *
              </label>
              {url.trim() && (
                <span className="inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {detected.sourceType === 'youtube' && <Youtube className="w-3 h-3 text-red-600" />}
                  {detected.sourceType === 'gdrive' && <HardDrive className="w-3 h-3 text-blue-600" />}
                  {detected.sourceType === 'github_or_direct' && <FileVideo className="w-3 h-3 text-stone-600" />}
                  <span className="capitalize">{detected.sourceType.replace('_', ' ')} detected</span>
                </span>
              )}
            </div>
            <input
              type="url"
              required
              placeholder="https://www.youtube.com/watch?v=... or https://drive.google.com/file/d/.../view"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Tips for Google Drive and YouTube */}
          <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1 text-[11px] text-stone-600 dark:text-stone-300">
            <div className="flex items-center gap-1.5 font-bold text-stone-800 dark:text-stone-200">
              <Info className="w-3.5 h-3.5 text-emerald-600" />
              <span>How to link your videos:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-stone-500 dark:text-stone-400 pl-1">
              <li><strong>YouTube:</strong> Paste any public or unlisted video URL or short link.</li>
              <li><strong>Google Drive:</strong> Click "Share" on your Drive video, set to <em>"Anyone with the link can view"</em>, and paste that link here.</li>
              <li><strong>GitHub:</strong> Paste direct MP4 download or raw release link.</li>
            </ul>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 dark:text-stone-300">
              Video Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., How to Break the Domino Chain When Triggered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category & Duration row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-stone-700 dark:text-stone-300">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as RecoveryVideo['category'])}
                className="w-full py-2.5 px-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Domino Effect">Domino Effect (Pathway)</option>
                <option value="The Backpack & Load">The Backpack & Load</option>
                <option value="Street Stories">Street Stories & Ground Truths</option>
                <option value="Peer Guidance">Peer Guidance</option>
                <option value="Bambi Talks">Bambi Talks & Keynotes</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-stone-700 dark:text-stone-300">
                Duration (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., 10:45"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 dark:text-stone-300">
              Description / Key Takeaways
            </label>
            <textarea
              rows={3}
              placeholder="What core lessons, recovery tools, or topics are covered in this video?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!url.trim() || !title.trim()}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Add to Video Gallery</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
