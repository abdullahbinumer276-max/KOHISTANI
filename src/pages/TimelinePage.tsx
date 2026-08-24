import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Clock,
  Calendar,
  MapPin,
  Sparkles,
  Film,
  BookOpen,
  ArrowRight,
  Filter,
  Search,
  X,
  Play
} from 'lucide-react';
import { TimelineEvent } from '../types';

interface TimelinePageProps {
  onNavigate: (view: string, param?: string) => void;
  selectedEventId?: string;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ onNavigate, selectedEventId }) => {
  const { db, openVideoModal } = useCMS();
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalEvent, setActiveModalEvent] = useState<TimelineEvent | null>(() => {
    if (selectedEventId) {
      return db.timeline.find(t => t.id === selectedEventId) || null;
    }
    return null;
  });

  const eras = [
    'All',
    'Prophetic Era',
    'Rashidun Caliphate',
    'Umayyad Caliphate',
    'Abbasid Golden Age',
    'Al-Andalus',
    'Crusades & Ayyubids',
    'Ottoman Empire',
    'Mughal Empire'
  ];

  const filteredTimeline = db.timeline
    .filter(item => {
      const matchEra = selectedEra === 'All' || item.era === selectedEra;
      const matchQuery =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchEra && matchQuery;
    })
    .sort((a, b) => a.gregorianYear - b.gregorianYear);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20 relative bg-star-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header Title */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase font-mono">
              Chronological Codex
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#F5F5F0] tracking-tight">
            Islamic History Timeline
          </h1>
          <p className="text-sm sm:text-base text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            From the Prophetic revelation in Cave Hira in 610 CE to the zenith of the Ottoman, Safavid, and Mughal dynasties.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#111111] border border-white/10 p-5 shadow-2xl space-y-4 rounded-sm">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search historical events, years (e.g. 1453, 636, 1187), battles, or locations..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/15 text-sm text-[#F5F5F0] placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors rounded-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-white/5 pt-3">
            {eras.map(era => {
              const active = selectedEra === era;
              return (
                <button
                  key={era}
                  onClick={() => setSelectedEra(era)}
                  className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all rounded-sm ${
                    active
                      ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                      : 'bg-black/40 hover:bg-white/10 text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  {era}
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-[#D4AF37]/30 pl-6 sm:pl-10 space-y-10 max-w-4xl mx-auto">
          {filteredTimeline.map(item => {
            const relatedVideo = item.relatedVideoId ? db.videos.find(v => v.id === item.relatedVideoId) : null;
            return (
              <div key={item.id} className="relative group">
                {/* Node Milestone Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-3.5 h-3.5 bg-[#050505] border-2 border-[#D4AF37] group-hover:bg-[#D4AF37] transition-all" />

                <div className="p-6 bg-[#111111] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xl space-y-4 rounded-sm">
                  {/* Era & Year Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-black/60 text-[#D4AF37] font-mono text-xs font-bold border border-[#D4AF37]/30 rounded-sm">
                        {item.year}
                      </span>
                      {item.hijriYear && (
                        <span className="text-xs text-white/40 font-mono">({item.hijriYear})</span>
                      )}
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/70 border border-white/10 rounded-sm">
                        {item.era}
                      </span>
                    </div>

                    {item.arabicTitle && (
                      <span className="text-base font-amiri text-[#D4AF37]">
                        {item.arabicTitle}
                      </span>
                    )}
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors">
                      {item.title}
                    </h3>
                    {item.location && (
                      <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-mono">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                    )}
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      {item.summary}
                    </p>
                  </div>

                  {/* Importance & Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/40 text-white/50 border border-white/10 font-mono rounded-sm">
                      {item.importanceLevel}
                    </span>

                    <div className="flex items-center gap-2">
                      {relatedVideo && (
                        <button
                          onClick={() => openVideoModal(relatedVideo)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-700/40 text-red-300 text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm"
                        >
                          <Play className="w-3.5 h-3.5 fill-current text-red-500" />
                          <span>Watch Documentary</span>
                        </button>
                      )}

                      <button
                        onClick={() => setActiveModalEvent(item)}
                        className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[#D4AF37] uppercase tracking-wider transition-colors rounded-sm"
                      >
                        Read Full Account →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Event Detail Modal */}
        {activeModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
            <div className="w-full max-w-3xl bg-[#0B0B0B] border border-white/15 rounded-sm shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#111111] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-black/60 text-[#D4AF37] font-mono text-xs font-bold border border-[#D4AF37]/30 rounded-sm">
                    {activeModalEvent.year}
                  </span>
                  <span className="text-xs text-white/50 font-mono uppercase tracking-wider">{activeModalEvent.era}</span>
                </div>
                <button
                  onClick={() => setActiveModalEvent(null)}
                  className="p-1 text-white/60 hover:text-white rounded-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {activeModalEvent.image && (
                  <div className="w-full h-56 overflow-hidden bg-black relative rounded-sm border border-white/10">
                    <img
                      src={activeModalEvent.image}
                      alt={activeModalEvent.title}
                      className="w-full h-full object-cover filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
                  </div>
                )}

                <div className="space-y-3">
                  {activeModalEvent.arabicTitle && (
                    <div className="text-xl font-amiri text-[#D4AF37]">
                      {activeModalEvent.arabicTitle}
                    </div>
                  )}
                  <h2 className="font-serif text-2xl font-bold text-[#F5F5F0]">
                    {activeModalEvent.title}
                  </h2>
                  {activeModalEvent.location && (
                    <p className="text-xs text-[#D4AF37] flex items-center gap-1.5 font-mono">
                      <MapPin className="w-3.5 h-3.5" />
                      Location: {activeModalEvent.location}
                    </p>
                  )}
                </div>

                <div className="p-4 bg-[#111111] border border-white/10 space-y-2 rounded-sm">
                  <h4 className="font-serif text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
                    Historical Summary
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed font-light">
                    {activeModalEvent.summary}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-serif text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
                    Full Historical Narrative & Significance
                  </h4>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                    {activeModalEvent.fullDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
