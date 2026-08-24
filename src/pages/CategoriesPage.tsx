import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Compass,
  Film,
  BookOpen,
  Clock,
  ArrowRight,
  ChevronRight,
  Shield
} from 'lucide-react';
import { Category } from '../types';

interface CategoriesPageProps {
  onNavigate: (view: string, param?: string) => void;
  selectedCategorySlug?: string;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onNavigate, selectedCategorySlug }) => {
  const { db, openVideoModal } = useCMS();
  const [activeCategory, setActiveCategory] = useState<Category | null>(() => {
    if (selectedCategorySlug) {
      return db.categories.find(c => c.slug === selectedCategorySlug) || null;
    }
    return null;
  });

  // Single Category Exploration View
  if (activeCategory) {
    const relatedVideos = db.videos.filter(v => v.category === activeCategory.name);
    const relatedArticles = db.articles.filter(a => a.category === activeCategory.name);
    const relatedTimeline = db.timeline.filter(t => t.category === activeCategory.name);

    return (
      <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20 relative bg-star-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          {/* Header Banner */}
          <div className="relative rounded-sm overflow-hidden bg-black border border-white/15 shadow-2xl p-8 sm:p-12">
            <div className="absolute inset-0 z-0 opacity-40">
              <img
                src={activeCategory.coverImage}
                alt={activeCategory.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-2xl space-y-4">
              <button
                onClick={() => setActiveCategory(null)}
                className="text-xs text-[#D4AF37] hover:underline uppercase tracking-wider font-mono"
              >
                ← Back to All Civilizations & Eras
              </button>

              <div className="flex items-center gap-3">
                <span className="text-2xl font-amiri text-[#D4AF37]">
                  {activeCategory.arabicTitle}
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 rounded-sm">
                  Historical Realm
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#F5F5F0]">
                {activeCategory.name}
              </h1>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                {activeCategory.description}
              </p>
            </div>
          </div>

          {/* Related Documentaries */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-serif text-2xl font-bold text-[#F5F5F0]">
                Documentaries in this Realm ({relatedVideos.length})
              </h2>
            </div>

            {relatedVideos.length === 0 ? (
              <p className="text-xs text-white/50 bg-[#111111] p-6 rounded-sm border border-white/10 font-light">
                More documentaries currently in production for {activeCategory.name}.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedVideos.map(vid => (
                  <div
                    key={vid.id}
                    onClick={() => openVideoModal(vid)}
                    className="group rounded-sm overflow-hidden bg-[#111111] border border-white/10 hover:border-[#D4AF37]/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xl"
                  >
                    <div className="relative aspect-video overflow-hidden bg-black">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                      />
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 text-[10px] font-medium bg-black/80 text-white font-mono border border-white/10 rounded-sm">
                        {vid.duration}
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="font-serif text-base font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                        {vid.title}
                      </h3>
                      <p className="text-xs text-white/60 line-clamp-2 font-light">{vid.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // All Categories Grid
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20 relative bg-star-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header Title */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase font-mono">
              Civilizations, Caliphates & Dynasties
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#F5F5F0] tracking-tight">
            Islamic Civilizations Hub
          </h1>
          <p className="text-sm sm:text-base text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Explore the vast landscape of Islamic history categorized by historical era, empire, and decisive scientific and military movements.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {db.categories.map(cat => {
            const videoCount = db.videos.filter(v => v.category === cat.name).length;
            const articleCount = db.articles.filter(a => a.category === cat.name).length;
            return (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className="group rounded-sm overflow-hidden bg-[#111111] border border-white/10 hover:border-[#D4AF37]/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-2xl flex flex-col"
              >
                <div className="h-52 overflow-hidden relative bg-black">
                  <img
                    src={cat.coverImage}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 text-base font-amiri text-[#D4AF37] bg-black/80 px-3 py-1 rounded-sm border border-white/10 backdrop-blur-sm">
                    {cat.arabicTitle}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed line-clamp-3 font-light">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono">
                    <span>{videoCount} Videos • {articleCount} Articles</span>
                    <span className="text-[#D4AF37] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform uppercase tracking-wider text-[11px]">
                      Explore Realm <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
