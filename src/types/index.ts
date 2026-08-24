export type UserRole = 'super_admin' | 'admin' | 'editor';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title?: string;
  passwordHash: string;
  salt: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface VideoChapter {
  time: string;
  seconds: number;
  title: string;
}

export interface Video {
  id: string;
  youtubeId: string;
  youtubeUrl: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  duration: string;
  views: string;
  publishDate: string;
  isFeatured: boolean;
  isTrending?: boolean;
  thumbnail: string;
  chapters?: VideoChapter[];
  keyTakeaways?: string[];
  relatedArticleIds?: string[];
  relatedPersonalityIds?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  arabicTitle: string;
  description: string;
  coverImage: string;
  iconName: string;
  colorAccent: string;
  displayOrder: number;
  isFeatured?: boolean;
}

export interface TimelineEvent {
  id: string;
  title: string;
  arabicTitle?: string;
  year: string;
  gregorianYear: number;
  hijriYear?: string;
  era: 'Prophetic Era' | 'Rashidun Caliphate' | 'Umayyad Caliphate' | 'Abbasid Golden Age' | 'Al-Andalus' | 'Crusades & Ayyubids' | 'Ottoman Empire' | 'Mughal Empire' | 'Modern Era';
  category: string;
  summary: string;
  fullDescription: string;
  image: string;
  location?: string;
  importanceLevel: 'Major Milestone' | 'Decisive Battle' | 'Scientific Breakthrough' | 'Empire Rise/Fall';
  relatedVideoId?: string;
  relatedArticleId?: string;
}

export interface Personality {
  id: string;
  slug: string;
  name: string;
  arabicName: string;
  title: string; // e.g. "The Sword of Allah", "Conqueror of Jerusalem"
  era: string;
  birthYear: string;
  deathYear: string;
  category: string;
  biography: string;
  achievements: string[];
  portrait: string;
  keyBattlesOrWorks: string[];
  quote?: string;
  relatedEventIds?: string[];
  relatedVideoIds?: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishDate: string;
  coverImage: string;
  content: string;
  tags: string[];
  isFeatured: boolean;
  status: 'published' | 'draft' | 'scheduled';
  scheduledDate?: string;
  keyTakeaways?: string[];
  relatedVideoId?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  status: 'new' | 'replied' | 'archived';
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: string;
  size: string;
  uploadDate: string;
  dimensions?: string;
}

export interface HomepageSectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface BrandingSettings {
  channelName: string;
  handle: string;
  tagline: string;
  brandDescription: string;
  mainLogo: string;
  mobileLogo: string;
  favicon: string;
  brandAccentColor: string; // e.g. #d4af37
  brandBgDepth: string; // e.g. #070709
  heroHeading: string;
  heroSubheading: string;
  heroVideoUrl: string;
  heroBackground: string;
  heroPrimaryBtnText: string;
  heroPrimaryBtnLink: string;
  heroSecondaryBtnText: string;
  heroSecondaryBtnLink: string;
  youtubeUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  spotifyUrl: string;
  email: string;
  aboutStory: string;
  aboutMission: string;
  aboutVision: string;
  aboutProductionEthos: string;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  twitterCard: string;
  canonicalUrl: string;
}

export interface SiteDatabase {
  branding: BrandingSettings;
  seo: SEOSettings;
  homepageSections: HomepageSectionConfig[];
  videos: Video[];
  categories: Category[];
  timeline: TimelineEvent[];
  personalities: Personality[];
  articles: Article[];
  messages: ContactMessage[];
  media: MediaItem[];
  users: AdminUser[];
}
