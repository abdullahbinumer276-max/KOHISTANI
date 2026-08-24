import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  User,
  Share2,
  Tag,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { Article } from '../types';

interface ArticlesPageProps {
  onNavigate: (view: string, param?: string) => void;
  selectedSlug?: string;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ onNavigate, selectedSlug }) => {
  const { db, openShareModal } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(() => {
    if (selectedSlug) {
      return db.articles.find(a => a.slug === selectedSlug) || null;
    }
    return null;
  });

  const categories = ['All', ...Array.from(new Set(db.articles.map(a => a.category)))];

  const filteredArticles = db.articles.filter(art => {
    const matchCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchQuery =
      !searchQuery ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchQuery;
  });

  // Single Article Deep Reading View
  if (activeArticle) {
    return (
      <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20 relative bg-star-pattern">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          {/* Back Button */}
          <button
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-white bg-[#111111] px-4 py-2 rounded-sm border border-white/10 transition-colors uppercase tracking-wider font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-mono">
                {activeArticle.category}
              </span>
              <span className="text-xs text-white/40 font-mono">{activeArticle.readTime}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F5F0] leading-tight">
              {activeArticle.title}
            </h1>

            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">
              {activeArticle.subtitle}
            </p>

            {/* Author Credentials & Date */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={activeArticle.author.avatar}
                  alt={activeArticle.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/40"
                />
                <div>
                  <div className="text-sm font-semibold text-[#F5F5F0]">{activeArticle.author.name}</div>
                  <div className="text-xs text-white/50">{activeArticle.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-white/50 font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {activeArticle.publishDate}
                </span>
                <button
                  onClick={() =>
                    openShareModal({
                      title: activeArticle.title,
                      url: window.location.href,
                      category: activeArticle.category
                    })
                  }
                  className="p-2 rounded-sm bg-[#111111] hover:bg-white/10 text-white/70 hover:text-[#D4AF37] border border-white/10 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Hero Cover Image */}
          {activeArticle.coverImage && (
            <div className="rounded-sm overflow-hidden shadow-2xl border border-white/10">
              <img
                src={activeArticle.coverImage}
                alt={activeArticle.title}
                className="w-full h-80 sm:h-96 object-cover filter brightness-90"
              />
            </div>
          )}

          {/* Key Takeaways Box */}
          {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
            <div className="p-6 rounded-sm bg-[#111111] border border-white/15 space-y-3">
              <h3 className="font-serif text-xs font-bold text-[#D4AF37] flex items-center gap-2 uppercase tracking-[0.2em]">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Executive Historical Summary</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-light">
                {activeArticle.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Body Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-white/80 text-base leading-relaxed font-light">
            {activeArticle.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-serif text-xl sm:text-2xl font-bold text-[#F5F5F0] pt-4 border-b border-white/10 pb-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote key={idx} className="border-l-2 border-[#D4AF37] pl-4 py-2 my-4 italic text-[#F5F5F0] bg-[#111111] rounded-sm font-serif">
                    {paragraph.replace('> ', '')}
                  </blockquote>
                );
              }
              return (
                <p key={idx} className="text-base text-white/75 leading-relaxed font-light">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Article Tags */}
          {activeArticle.tags && (
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-white/40" />
              {activeArticle.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-sm bg-[#111111] border border-white/10 text-xs text-white/60 font-mono">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Articles Archive List
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20 relative bg-star-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header Title */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase font-mono">
              Manuscript Inquiries & Historiography
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#F5F5F0] tracking-tight">
            Historical Articles & Chronicles
          </h1>
          <p className="text-sm sm:text-base text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Academic investigations and narrative retellings analyzing classical Arabic, Persian, and Ottoman primary manuscripts.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#111111] border border-white/10 p-5 shadow-2xl space-y-4 rounded-sm">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search historical articles by title, author, or keywords..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/15 text-sm text-[#F5F5F0] placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors rounded-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-white/5 pt-3">
            {categories.map(cat => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all rounded-sm ${
                    active
                      ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                      : 'bg-black/40 hover:bg-white/10 text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(art => (
            <div
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="group rounded-sm overflow-hidden bg-[#111111] border border-white/10 hover:border-[#D4AF37]/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col"
            >
              <div className="h-52 overflow-hidden relative bg-black">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-black font-mono">
                  {art.category}
                </span>
                <span className="absolute bottom-3 right-3 text-xs text-white/90 font-mono bg-black/80 px-2 py-0.5 rounded-sm border border-white/10 backdrop-blur-sm">
                  {art.readTime}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed font-light">
                    {art.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono">
                  <span>{art.publishDate}</span>
                  <span className="text-[#D4AF37] font-semibold flex items-center gap-1 uppercase tracking-wider text-[11px]">
                    Read Article <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
