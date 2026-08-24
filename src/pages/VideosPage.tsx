import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Search,
  Filter,
  Play,
  Clock,
  Eye,
  Calendar,
  Share2,
  SlidersHorizontal,
  Youtube,
  ArrowUpDown
} from 'lucide-react';
import { Video } from '../types';

interface VideosPageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const VideosPage: React.FC<VideosPageProps> = ({ onNavigate }) => {
  const { db, openVideoModal, openShareModal } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'popular'>('latest');

  // Filter & Sort
  const filteredVideos = db.videos
    .filter(v => {
      const matchCat = selectedCategory === 'All' || v.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      if (sortBy === 'oldest') return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
      if (sortBy === 'popular') {
        const getNum = (str: string) => parseFloat(str.replace(/[^0-9.]/g, '')) * (str.includes('M') ? 1000000 : str.includes('K') ? 1000 : 1);
        return getNum(b.views) - getNum(a.views);
      }
      return 0;
    });

  const categories = ['All', ...db.categories.map(c => c.name)];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20 relative bg-star-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header Title & Intro */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase font-mono">
              {db.branding.channelName} • Video Archives
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#F5F5F0] tracking-tight">
            Documentary Library
          </h1>
          <p className="text-sm sm:text-base text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Cinematic investigations into the grand caliphates, decisive military strategies, forgotten scholars, and monumental turning points of the Islamic world.
          </p>
        </div>

        {/* Filter and Search Toolbar */}
        <div className="bg-[#111111] border border-white/10 p-5 shadow-2xl space-y-4 rounded-sm">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search documentaries by title, battles, empires, or tags..."
                className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/15 text-sm text-[#F5F5F0] placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors rounded-sm"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-white/50 font-medium shrink-0 flex items-center gap-1 uppercase tracking-wider font-mono">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#D4AF37]" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-black/50 border border-white/15 px-3 py-2 text-xs font-medium text-[#F5F5F0] focus:outline-none focus:border-[#D4AF37] rounded-sm"
              >
                <option value="latest">Latest Releases</option>
                <option value="popular">Most Popular</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
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

        {/* Video Results Count */}
        <div className="flex items-center justify-between text-xs text-white/40 font-mono">
          <span>
            Displaying <strong className="text-[#D4AF37]">{filteredVideos.length}</strong> of {db.videos.length} productions
          </span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-[#D4AF37] hover:underline uppercase tracking-wider text-[11px]"
            >
              Reset category filter
            </button>
          )}
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-[#111111] border border-white/10 p-8 rounded-sm">
            <p className="font-serif text-lg font-bold text-[#F5F5F0]">No documentaries matched your criteria</p>
            <p className="text-xs text-white/50 font-light">Try searching for other keywords or clearing the category filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs text-[#D4AF37] font-bold uppercase tracking-wider rounded-sm border border-white/10"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <div
                key={video.id}
                onClick={() => openVideoModal(video)}
                className="group rounded-sm overflow-hidden bg-[#111111] border border-white/10 hover:border-[#D4AF37]/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-xl">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Badges */}
                  <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-black font-mono">
                    {video.category}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 text-[10px] font-medium bg-black/80 text-white font-mono border border-white/10">
                    {video.duration}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-base font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed font-light">
                      {video.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {video.views}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openShareModal({
                          title: video.title,
                          url: window.location.href,
                          category: video.category
                        });
                      }}
                      className="p-1 text-white/40 hover:text-[#D4AF37] transition-colors"
                      title="Share Video"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
