import React from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Play,
  Clock,
  Eye,
  Calendar,
  Sparkles,
  ArrowRight,
  Shield,
  Compass,
  Users,
  BookOpen,
  Youtube,
  CheckCircle,
  TrendingUp,
  Share2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { db, openVideoModal, openShareModal } = useCMS();
  const featuredVideo = db.videos.find(v => v.isFeatured) || db.videos[0];
  const latestVideos = db.videos.slice(0, 6);
  const featuredArticles = db.articles.slice(0, 3);
  const keyPersonalities = db.personalities.slice(0, 4);
  const timelinePreview = db.timeline.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F0] relative overflow-hidden">
      {/* Subtle Background Geometric Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-artistic-pattern z-0" />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20 z-10">
        {/* Right Cinematic Video Vignette Canvas */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[620px] z-0 overflow-hidden pointer-events-none opacity-40 lg:opacity-75">
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
          <img
            src={db.branding.heroBackground || "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2070&auto=format&fit=crop"}
            alt="Islamic Civilizations Backdrop"
            className="w-full h-full object-cover object-center grayscale-[40%] scale-105"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Featured Documentary Tag Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold"
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>{db.branding.channelName} • Islamic History Archive</span>
            </motion.div>

            {/* Main Cinematic Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.05] text-[#F5F5F0] font-normal"
            >
              Discover the <span className="text-[#D4AF37] italic font-serif">Untold Stories</span> of Islamic History
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-white/60 font-light leading-relaxed max-w-xl"
            >
              {db.branding.heroSubheading || "Journey through civilizations, meet legendary personalities, and explore the golden age of science and culture. A premium cinematic archive of Muslim heritage."}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {featuredVideo && (
                <button
                  id="hero-watch-featured-btn"
                  onClick={() => openVideoModal(featuredVideo)}
                  className="px-8 py-4 bg-[#D4AF37] hover:brightness-110 text-black font-bold uppercase text-xs tracking-widest transition-all duration-300 shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Latest Video</span>
                </button>
              )}

              <button
                id="hero-explore-timeline-btn"
                onClick={() => onNavigate('timeline')}
                className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md uppercase text-xs tracking-widest hover:bg-white/10 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Explore Timeline</span>
              </button>

              <a
                id="hero-subscribe-yt-btn"
                href={db.branding.youtubeUrl || 'https://youtube.com/@thekohistani'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-4 border border-red-800/40 bg-red-950/30 hover:bg-red-900/40 text-red-300 uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Youtube className="w-4 h-4 text-red-500 fill-current" />
                <span className="hidden sm:inline">YouTube</span>
              </a>
            </motion.div>

            {/* Quick Metrics Bar */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 max-w-xl">
              <div>
                <div className="font-serif text-2xl font-bold text-[#D4AF37]">1,400+</div>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-0.5">Years Chronicled</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-[#D4AF37]">{db.categories.length}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-0.5">Dynasties</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-[#D4AF37]">{db.videos.length}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-0.5">Documentaries</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-[#D4AF37]">{db.personalities.length}+</div>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-0.5">Titans & Polymaths</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED DOCUMENTARY SPOTLIGHT */}
      {featuredVideo && (
        <section className="py-20 bg-[#0A0A0A] border-y border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                  Featured Archive Release
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F0] mt-1">
                  Spotlight Documentary
                </h2>
              </div>
              <button
                onClick={() => onNavigate('videos')}
                className="text-xs uppercase tracking-widest text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>Full Archive</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Cinematic Featured Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111111] border border-white/10 rounded-sm p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Thumbnail with Artistic Gold Play Button */}
              <div
                className="lg:col-span-7 relative group rounded-sm overflow-hidden aspect-video bg-[#1A1A1A] cursor-pointer"
                onClick={() => openVideoModal(featuredVideo)}
              >
                <img
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Large Artistic Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/50 border border-[#D4AF37]/50 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:border-[#D4AF37] transition-all duration-300 shadow-2xl">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-[#D4AF37] border-b-[10px] border-b-transparent ml-1.5" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/90 font-mono">
                  <span className="px-2.5 py-1 bg-black/80 border border-white/10 uppercase tracking-wider">
                    {featuredVideo.duration}
                  </span>
                  <span className="px-2.5 py-1 bg-[#D4AF37] text-black font-bold uppercase tracking-wider">
                    {featuredVideo.category}
                  </span>
                </div>
              </div>

              {/* Documentary Meta and Information */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-[10px] font-bold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 uppercase tracking-widest">
                    {featuredVideo.category}
                  </span>
                  <span className="text-xs text-white/40 flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-[#D4AF37]" />
                    {featuredVideo.publishDate}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F0] leading-snug">
                  {featuredVideo.title}
                </h3>

                <p className="text-sm text-white/60 leading-relaxed line-clamp-3 font-light">
                  {featuredVideo.description}
                </p>

                {featuredVideo.keyTakeaways && (
                  <div className="space-y-2 pt-1 border-t border-white/5">
                    {featuredVideo.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-white/80">
                        <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => openVideoModal(featuredVideo)}
                    className="px-6 py-3.5 bg-[#D4AF37] hover:brightness-110 text-black font-bold uppercase text-xs tracking-widest transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Now</span>
                  </button>
                  <button
                    onClick={() =>
                      openShareModal({
                        title: featuredVideo.title,
                        url: window.location.href,
                        category: featuredVideo.category
                      })
                    }
                    className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white transition-colors"
                    title="Share Documentary"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. ACTIVE COLLECTIONS / EMPIRES & ERAS */}
      <section className="py-20 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">
                Active Collections
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F5F0]">
                Civilizations, Empires & Eras
              </h2>
            </div>
            <button
              onClick={() => onNavigate('categories')}
              className="text-xs uppercase tracking-widest text-[#D4AF37] hover:underline flex items-center gap-1 self-start md:self-auto"
            >
              <span>View All Eras</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {db.categories.map(cat => {
              const relatedCount = db.videos.filter(v => v.category === cat.name).length;
              return (
                <div
                  key={cat.id}
                  onClick={() => onNavigate('categories', cat.slug)}
                  className="w-full bg-[#111111] border border-white/10 rounded-sm overflow-hidden group cursor-pointer relative hover:border-[#D4AF37]/60 transition-all duration-300 shadow-xl"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={cat.coverImage}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
                    <span className="absolute top-3 right-3 text-xs font-amiri text-[#F5F5F0] bg-black/70 px-2 py-0.5 border border-[#D4AF37]/30">
                      {cat.arabicTitle}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-white/50 line-clamp-2 font-light leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/40 border-t border-white/5">
                      <span>{relatedCount} Docs</span>
                      <span className="text-[#D4AF37] font-semibold">Explore →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. LATEST DOCUMENTARIES ARCHIVE */}
      <section className="py-20 bg-[#0A0A0A] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                The Kohistani Productions
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F5F0]">
                Latest Documentaries & Chronicles
              </h2>
            </div>

            <button
              onClick={() => onNavigate('videos')}
              className="px-6 py-3 border border-white/20 bg-white/5 uppercase text-xs tracking-widest text-[#D4AF37] hover:bg-white/10 transition-colors flex items-center gap-2 self-start md:self-auto"
            >
              <span>Explore All {db.videos.length} Videos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestVideos.map(video => (
              <div
                key={video.id}
                onClick={() => openVideoModal(video)}
                className="group bg-[#111111] border border-white/10 rounded-sm overflow-hidden hover:border-[#D4AF37]/50 cursor-pointer transition-all duration-300 shadow-xl flex flex-col"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-[#1A1A1A]">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-xl">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 text-[9px] font-bold bg-[#D4AF37] text-black uppercase tracking-wider">
                    {video.category}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 text-[9px] font-medium bg-black/80 text-white font-mono">
                    {video.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-base font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs text-white/50 line-clamp-2 leading-relaxed font-light">
                      {video.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/40 font-mono">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {video.publishDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE TIMELINE ROADMAP */}
      <section className="py-20 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.4em]">
              Chronological Epochs
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F0]">
              Interactive Islamic History Timeline
            </h2>
            <p className="text-sm text-white/60 font-light">
              Witness the pivotal turning points that altered world geography and human civilization.
            </p>
          </div>

          <div className="relative border-l border-[#D4AF37]/40 pl-6 sm:pl-10 space-y-8 max-w-4xl mx-auto">
            {timelinePreview.map(item => (
              <div
                key={item.id}
                onClick={() => onNavigate('timeline', item.id)}
                className="relative group cursor-pointer"
              >
                {/* Node Diamond */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-3.5 h-3.5 rotate-45 bg-[#050505] border-2 border-[#D4AF37] group-hover:bg-[#D4AF37] transition-all" />

                <div className="p-6 bg-[#111111] border border-white/10 group-hover:border-[#D4AF37]/50 transition-all duration-300 space-y-2.5 rounded-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] font-mono text-xs font-bold">
                        {item.year}
                      </span>
                      {item.hijriYear && (
                        <span className="text-xs text-white/40 font-mono">({item.hijriYear})</span>
                      )}
                    </div>
                    <span className="text-sm text-white/70 font-amiri">{item.arabicTitle}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                    {item.summary}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-[#D4AF37]">
                    <span className="uppercase tracking-wider text-[10px] text-white/40 font-mono">Era: {item.era}</span>
                    <span className="flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform uppercase tracking-wider text-[11px]">
                      Read Account <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('timeline')}
              className="px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-widest hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all"
            >
              Open Full Interactive Timeline (570–1924 CE)
            </button>
          </div>
        </div>
      </section>

      {/* 6. HISTORICAL FIGURES & LEGENDS */}
      <section className="py-20 bg-[#0A0A0A] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Giants of History
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F5F0]">
                Legends of the Islamic World
              </h2>
            </div>

            <button
              onClick={() => onNavigate('personalities')}
              className="px-6 py-3 border border-white/20 bg-white/5 uppercase text-xs tracking-widest text-[#D4AF37] hover:bg-white/10 transition-colors flex items-center gap-2 self-start md:self-auto"
            >
              <span>View All Personalities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyPersonalities.map(pers => (
              <div
                key={pers.id}
                onClick={() => onNavigate('personalities', pers.slug)}
                className="group bg-[#111111] border border-white/10 rounded-sm overflow-hidden hover:border-[#D4AF37]/60 cursor-pointer transition-all duration-300 shadow-xl flex flex-col"
              >
                <div className="h-64 overflow-hidden relative bg-[#1A1A1A]">
                  <img
                    src={pers.portrait}
                    alt={pers.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-mono px-2 py-0.5 bg-black/80 text-[#D4AF37] border border-[#D4AF37]/30 uppercase tracking-wider">
                    {pers.era}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors">
                      {pers.name}
                    </h3>
                    <p className="text-xs text-[#D4AF37] font-serif italic">
                      "{pers.title}"
                    </p>
                    <p className="text-xs text-white/50 line-clamp-2 leading-relaxed font-light">
                      {pers.biography}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 text-[11px] text-white/40 flex items-center justify-between font-mono">
                    <span>{pers.birthYear} – {pers.deathYear}</span>
                    <span className="text-[#D4AF37] font-sans uppercase tracking-wider font-semibold text-[10px]">Biography →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SCHOLARLY ARTICLES & LONGFORM */}
      <section className="py-20 bg-[#050505] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Historiography & Longform
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F5F0]">
                Historical Chronicles & Manuscripts
              </h2>
            </div>

            <button
              onClick={() => onNavigate('articles')}
              className="px-6 py-3 border border-white/20 bg-white/5 uppercase text-xs tracking-widest text-[#D4AF37] hover:bg-white/10 transition-colors flex items-center gap-2 self-start md:self-auto"
            >
              <span>Browse All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredArticles.map(art => (
              <div
                key={art.id}
                onClick={() => onNavigate('articles', art.slug)}
                className="group bg-[#111111] border border-white/10 rounded-sm overflow-hidden hover:border-[#D4AF37]/50 cursor-pointer transition-all duration-300 shadow-xl flex flex-col"
              >
                <div className="h-48 overflow-hidden relative bg-[#1A1A1A]">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-bold bg-[#D4AF37] text-black uppercase tracking-wider">
                    {art.category}
                  </span>
                  <span className="absolute bottom-3 right-3 text-xs text-white/80 font-mono bg-black/70 px-2 py-0.5">
                    {art.readTime}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-base font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-white/50 line-clamp-2 leading-relaxed font-light">
                      {art.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                    <span className="font-mono">{art.publishDate}</span>
                    <span className="text-[#D4AF37] font-semibold flex items-center gap-1 uppercase tracking-wider text-[10px]">
                      Read Article <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. YOUTUBE SUBSCRIBE BANNER */}
      <section className="py-20 bg-gradient-to-b from-[#0A0A0A] to-[#050505] border-t border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="w-16 h-16 rounded-sm bg-red-950/40 border border-red-700/50 text-red-500 mx-auto flex items-center justify-center shadow-2xl">
            <Youtube className="w-8 h-8 fill-current" />
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F0]">
              Join {db.branding.channelName} on YouTube
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto font-light">
              Subscribe to <strong className="text-[#D4AF37]">{db.branding.handle}</strong> for weekly full-length documentary releases, battle breakdowns, and untold historical archives.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={db.branding.youtubeUrl || 'https://youtube.com/@thekohistani'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase text-xs tracking-widest transition-all shadow-2xl flex items-center gap-2.5 active:scale-95"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>Subscribe on YouTube</span>
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase tracking-widest text-white/80 transition-all"
            >
              Contact / Collaborate
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
