export interface CreatorProfile {
  name: string;
  organization: string;
  title: string;
  tagline: string;
  motto: string;
  bio: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  experienceYears: number;
  avatarUrl: string;
  logoUrl: string;
  businessCardUrl: string;
  pillars: {
    title: string;
    description: string;
    icon: string;
  }[];
  bambiLetters: {
    letter: string;
    word: string;
    meaning: string;
    color: string;
  }[];
  socials: {
    email: string;
    phone: string;
    website: string;
    chatLink: string;
  };
}

export interface ProductItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  imageUrl: string;
  badge: string;
  category: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  dimensions: string;
  format: string;
  previewUrl?: string;
  interactivePreview?: boolean;
}

export interface SearchSource {
  title?: string;
  uri?: string;
}

export type AvatarEmotion = 'idle' | 'greeting' | 'explaining' | 'happy' | 'thoughtful' | 'speaking' | 'talking';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  emotion?: AvatarEmotion;
  referencedProductId?: string;
  searchQueries?: string[];
  searchSources?: SearchSource[];
  isVoiceInput?: boolean;
}

export interface SharedChatConfig {
  url: string;
  title: string;
  description: string;
}

export type VideoSourceType = 'youtube' | 'gdrive' | 'github_or_direct';

export interface RecoveryVideo {
  id: string;
  title: string;
  description: string;
  category: 'Domino Effect' | 'The Backpack & Load' | 'Street Stories' | 'Peer Guidance' | 'Bambi Talks';
  sourceType: VideoSourceType;
  videoUrl: string;
  embedUrl: string;
  thumbnailUrl?: string;
  duration?: string;
  dateAdded?: string;
  featured?: boolean;
}

