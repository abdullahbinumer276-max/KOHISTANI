import React from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Youtube,
  Twitter,
  Instagram,
  Facebook,
  Mail,
  Shield,
  Sparkles,
  ArrowUpRight,
  Sliders,
  Compass,
  Clock,
  BookOpen
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { db } = useCMS();

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-12 relative overflow-hidden text-white/60">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-artistic-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rotate-45 border border-[#D4AF37] flex items-center justify-center bg-black/40 shadow-sm shrink-0">
                <span className="-rotate-45 font-serif font-bold text-[#D4AF37] text-xs">TK</span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#F5F5F0]">
                  {db.branding.channelName}
                </h3>
                <p className="text-[10px] text-[#D4AF37] font-mono tracking-widest uppercase">
                  {db.branding.handle}
                </p>
              </div>
            </div>

            <p className="text-xs text-white/50 leading-relaxed max-w-md font-light">
              {db.branding.brandDescription}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              {db.branding.youtubeUrl && (
                <a
                  href={db.branding.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className="p-2.5 rounded-sm bg-[#111111] border border-white/10 hover:border-red-500/60 hover:text-red-400 text-white/60 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {db.branding.twitterUrl && (
                <a
                  href={db.branding.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter"
                  className="p-2.5 rounded-sm bg-[#111111] border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] text-white/60 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {db.branding.instagramUrl && (
                <a
                  href={db.branding.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2.5 rounded-sm bg-[#111111] border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] text-white/60 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {db.branding.facebookUrl && (
                <a
                  href={db.branding.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2.5 rounded-sm bg-[#111111] border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] text-white/60 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {db.branding.email && (
                <a
                  href={`mailto:${db.branding.email}`}
                  aria-label="Email Contact"
                  className="p-2.5 rounded-sm bg-[#111111] border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] text-white/60 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#F5F5F0] tracking-[0.2em] uppercase">
              Explore History
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <button
                  onClick={() => onNavigate('videos')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Documentary Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('timeline')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Interactive Timeline (570–1924 CE)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('personalities')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Historical Figures & Legends
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('articles')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Scholarly Articles & Longform
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Empires, Caliphates & Battles
                </button>
              </li>
            </ul>
          </div>

          {/* Key Empires & Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#F5F5F0] tracking-[0.2em] uppercase">
              Civilizations
            </h4>
            <ul className="space-y-2 text-xs font-light">
              {db.categories.slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate('categories', cat.slug)}
                    className="hover:text-[#D4AF37] transition-colors text-left flex items-center gap-1.5"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-white/30 font-amiri">
                      ({cat.arabicTitle})
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Channel & Management */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#F5F5F0] tracking-[0.2em] uppercase">
              Platform & CMS
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  About The Kohistani Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Inquiries & Collaborations
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('admin')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#111111] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] text-xs font-semibold transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Admin CMS Portal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>
            © {new Date().getFullYear()} <strong className="text-white/80">{db.branding.channelName}</strong>. All rights reserved. Cinematic Islamic History Platform.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:text-[#D4AF37]">
              Historiographical Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-[#D4AF37]">
              Contact Us
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('admin')} className="hover:text-[#D4AF37]">
              CMS Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
