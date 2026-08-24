import React from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Sparkles,
  Shield,
  BookOpen,
  Youtube,
  Award,
  Users,
  Compass,
  CheckCircle,
  Video
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { db } = useCMS();

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20 relative bg-star-pattern">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Header Story */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#D4AF37] mx-auto bg-[#111111] shadow-2xl">
            <img
              src={db.branding.mainLogo}
              alt={db.branding.channelName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase font-mono">
                The Channel & The Mission
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#F5F5F0] tracking-tight">
              About {db.branding.channelName}
            </h1>
            <p className="text-xs text-[#D4AF37] font-mono tracking-widest uppercase">
              {db.branding.handle}
            </p>
          </div>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed font-serif italic max-w-2xl mx-auto">
            "{db.branding.tagline}"
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-sm bg-[#111111] border border-white/10 space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-sm bg-black/60 text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/30">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#F5F5F0]">Our Mission</h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
              {db.branding.aboutMission}
            </p>
          </div>

          <div className="p-6 rounded-sm bg-[#111111] border border-white/10 space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-sm bg-black/60 text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/30">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#F5F5F0]">Our Vision</h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
              {db.branding.aboutVision}
            </p>
          </div>

          <div className="p-6 rounded-sm bg-[#111111] border border-white/10 space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-sm bg-black/60 text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/30">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#F5F5F0]">Production Ethos</h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
              {db.branding.aboutProductionEthos}
            </p>
          </div>
        </div>

        {/* The Origin Narrative */}
        <div className="p-8 sm:p-10 rounded-sm bg-[#111111] border border-white/15 space-y-6 shadow-2xl">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F0]">
            The Origin & Historical Philosophy
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-white/75 leading-relaxed font-light">
            <p>{db.branding.aboutStory}</p>
            <p>
              In an era dominated by superficial soundbites, Islamic history is frequently reduced to simplistic caricatures. We believe that true reverence for our heritage requires meticulous intellectual rigor, objective examination of historical context, and documentary cinematography worthy of classical empires.
            </p>
            <p>
              Whether analyzing the metallurgy of Ottoman super-cannons in 1453 or the double envelopment tactics of Khalid ibn al-Walid at Walaja, our team reconstructs historical reality using primary manuscripts translated directly from classical Arabic, Ottoman Turkish, Persian, and Latin.
            </p>
          </div>
        </div>

        {/* YouTube Community Action */}
        <div className="p-8 rounded-sm bg-gradient-to-r from-red-950/20 via-[#111111] to-red-950/20 border border-red-800/30 text-center space-y-6">
          <Youtube className="w-12 h-12 text-red-500 fill-current mx-auto" />
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#F5F5F0]">
              Subscribe on YouTube
            </h3>
            <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto font-light">
              Join thousands of history enthusiasts exploring our weekly documentary releases on {db.branding.handle}.
            </p>
          </div>
          <a
            href={db.branding.youtubeUrl || 'https://youtube.com/@thekohistani'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm bg-red-600 hover:bg-red-700 text-white font-serif font-bold text-xs uppercase tracking-widest transition-colors shadow-xl"
          >
            <Youtube className="w-4 h-4 fill-current" />
            <span>Open YouTube Channel</span>
          </a>
        </div>
      </div>
    </div>
  );
};
