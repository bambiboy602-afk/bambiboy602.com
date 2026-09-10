import { VideoSourceType } from '../types';

/**
 * Extracts YouTube Video ID from various URL formats
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const cleanUrl = url.trim();

  // youtube.com/watch?v=ID
  const watchMatch = cleanUrl.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.+&v=)([^#&?]+)/);
  if (watchMatch && watchMatch[1]) return watchMatch[1];

  // youtu.be/ID
  const shortMatch = cleanUrl.match(/youtu\.be\/([^#&?]+)/);
  if (shortMatch && shortMatch[1]) return shortMatch[1];

  // youtube.com/embed/ID
  const embedMatch = cleanUrl.match(/youtube\.com\/embed\/([^#&?]+)/);
  if (embedMatch && embedMatch[1]) return embedMatch[1];

  // youtube.com/shorts/ID
  const shortsMatch = cleanUrl.match(/youtube\.com\/shorts\/([^#&?]+)/);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

  // Raw 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return cleanUrl;
  }

  return null;
}

/**
 * Extracts Google Drive File ID from shared links
 */
export function extractGoogleDriveId(url: string): string | null {
  if (!url) return null;
  const cleanUrl = url.trim();

  // drive.google.com/file/d/ID/view or /preview or /edit
  const fileMatch = cleanUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) return fileMatch[1];

  // drive.google.com/open?id=ID
  const openMatch = cleanUrl.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch && openMatch[1]) return openMatch[1];

  // drive.google.com/uc?id=ID
  const ucMatch = cleanUrl.match(/drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)/);
  if (ucMatch && ucMatch[1]) return ucMatch[1];

  return null;
}

/**
 * Automatically detects the video source type and returns an appropriate embed URL
 */
export function parseVideoUrl(url: string): {
  sourceType: VideoSourceType;
  embedUrl: string;
  thumbnailUrl: string;
} {
  const cleanUrl = url.trim();

  // 1. Check YouTube
  const ytId = extractYouTubeId(cleanUrl);
  if (ytId) {
    return {
      sourceType: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
    };
  }

  // 2. Check Google Drive
  const gdriveId = extractGoogleDriveId(cleanUrl);
  if (gdriveId) {
    return {
      sourceType: 'gdrive',
      embedUrl: `https://drive.google.com/file/d/${gdriveId}/preview`,
      thumbnailUrl: '',
    };
  }

  // 3. Fallback: Direct MP4 / GitHub
  return {
    sourceType: 'github_or_direct',
    embedUrl: cleanUrl,
    thumbnailUrl: '',
  };
}
