import React, { useState, useEffect, useRef } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Search,
  X,
  Film,
  Clock,
  Users,
  BookOpen,
  Compass,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchModalProps {
  onNavigate: (view: string, param?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onNavigate }) => {
  const { db, isSearchOpen, closeSearch, openVideoModal } = useCMS();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else openVideoModal ? undefined : null; // handled via global trigger
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const normalized = query.toLowerCase().trim();

  const matchingVideos = normalized
    ? db.videos.filter(
        v =>
          v.title.toLowerCase().includes(normalized) ||
          v.description.toLowerCase().includes(normalized) ||
          v.category.toLowerCase().includes(normalized) ||
          v.tags.some(t => t.toLowerCase().includes(normalized))
      )
    : [];

  const matchingTimeline = normalized
    ? db.timeline.filter(
        t =>
          t.title.toLowerCase().includes(normalized) ||
          t.summary.toLowerCase().includes(normalized) ||
          t.era.toLowerCase().includes(normalized) ||
          t.year.toLowerCase().includes(normalized)
      )
    : [];

  const matchingPersonalities = normalized
    ? db.personalities.filter(
        p =>
          p.name.toLowerCase().includes(normalized) ||
          p.title.toLowerCase().includes(normalized) ||
          p.biography.toLowerCase().includes(normalized)
      )
    : [];

  const matchingArticles = normalized
    ? db.articles.filter(
        a =>
          a.title.toLowerCase().includes(normalized) ||
          a.subtitle.toLowerCase().includes(normalized) ||
          a.category.toLowerCase().includes(normalized)
      )
    : [];

  const totalResults =
    matchingVideos.length +
    matchingTimeline.length +
    matchingPersonalities.length +
    matchingArticles.length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-3xl bg-[#0B0B0B] border border-white/15 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Search Header Input */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-[#111111]">
            <Search className="w-5 h-5 text-[#D4AF37]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search documentaries, battles, Ottoman, Salahuddin, Baghdad, timeline..."
              className="flex-1 bg-transparent border-none text-[#F5F5F0] placeholder-white/30 text-base focus:outline-none font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-white/50 hover:text-white px-2.5 py-1 bg-white/10 rounded-sm font-mono uppercase tracking-wider"
              >
                Clear
              </button>
            )}
            <button
              onClick={closeSearch}
              className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results Container */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {!normalized ? (
              <div className="py-8 text-center space-y-3">
                <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Popular archive searches:</p>
                <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                  {['Constantinople 1453', 'Khalid ibn al-Walid', 'House of Wisdom', 'Salahuddin Ayyubi', 'Yarmouk', 'Al-Andalus', 'Fatima al-Fihri'].map(
                    tag => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3 py-1.5 rounded-sm bg-[#111111] hover:bg-white/10 border border-white/10 text-xs text-white/80 hover:text-[#D4AF37] transition-colors font-light"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : totalResults === 0 ? (
              <div className="py-12 text-center text-white/40 space-y-2">
                <p className="font-serif text-base font-bold text-[#F5F5F0]">No historical records found</p>
                <p className="text-xs font-light">Try searching for empires, personalities, or key years (e.g. 1453, 636, Ottoman, Abbasid).</p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Videos */}
                {matchingVideos.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] font-serif">
                      <Film className="w-3.5 h-3.5" />
                      <span>Documentaries ({matchingVideos.length})</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {matchingVideos.map(vid => (
                        <div
                          key={vid.id}
                          onClick={() => {
                            closeSearch();
                            openVideoModal(vid);
                          }}
                          className="flex items-center gap-3 p-3 rounded-sm bg-[#111111] hover:bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 cursor-pointer transition-colors group"
                        >
                          <img
                            src={vid.thumbnail}
                            alt={vid.title}
                            className="w-16 h-10 object-cover rounded-sm shrink-0 filter brightness-90"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-sm font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] truncate">
                              {vid.title}
                            </h4>
                            <p className="text-xs text-white/40 font-mono">{vid.category} • {vid.duration}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline Events */}
                {matchingTimeline.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] font-serif">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Timeline Events ({matchingTimeline.length})</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {matchingTimeline.map(tl => (
                        <div
                          key={tl.id}
                          onClick={() => {
                            closeSearch();
                            onNavigate('timeline', tl.id);
                          }}
                          className="flex items-center gap-3 p-3 rounded-sm bg-[#111111] hover:bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 cursor-pointer transition-colors group"
                        >
                          <span className="px-2.5 py-1 rounded-sm bg-black/60 border border-[#D4AF37]/30 text-[#D4AF37] font-mono text-xs font-bold shrink-0">
                            {tl.year}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-sm font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] truncate">
                              {tl.title}
                            </h4>
                            <p className="text-xs text-white/40 truncate font-light">{tl.summary}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Personalities */}
                {matchingPersonalities.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] font-serif">
                      <Users className="w-3.5 h-3.5" />
                      <span>Historical Personalities ({matchingPersonalities.length})</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {matchingPersonalities.map(pers => (
                        <div
                          key={pers.id}
                          onClick={() => {
                            closeSearch();
                            onNavigate('personalities', pers.slug);
                          }}
                          className="flex items-center gap-3 p-3 rounded-sm bg-[#111111] hover:bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 cursor-pointer transition-colors group"
                        >
                          <img
                            src={pers.portrait}
                            alt={pers.name}
                            className="w-10 h-10 object-cover rounded-sm shrink-0 border border-white/10"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-sm font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] truncate">
                              {pers.name}
                            </h4>
                            <p className="text-xs text-white/40 font-mono">{pers.title} • {pers.era}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Articles */}
                {matchingArticles.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] font-serif">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Articles & Manuscripts ({matchingArticles.length})</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {matchingArticles.map(art => (
                        <div
                          key={art.id}
                          onClick={() => {
                            closeSearch();
                            onNavigate('articles', art.slug);
                          }}
                          className="flex items-center gap-3 p-3 rounded-sm bg-[#111111] hover:bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 cursor-pointer transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-sm font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] truncate">
                              {art.title}
                            </h4>
                            <p className="text-xs text-white/40 font-mono">{art.category} • {art.readTime}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
