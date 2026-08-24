import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Users,
  Search,
  Sparkles,
  Award,
  BookOpen,
  Play,
  X,
  Swords,
  ChevronRight
} from 'lucide-react';
import { Personality } from '../types';

interface PersonalitiesPageProps {
  onNavigate: (view: string, param?: string) => void;
  selectedSlug?: string;
}

export const PersonalitiesPage: React.FC<PersonalitiesPageProps> = ({ onNavigate, selectedSlug }) => {
  const { db, openVideoModal } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePersonality, setActivePersonality] = useState<Personality | null>(() => {
    if (selectedSlug) {
      return db.personalities.find(p => p.slug === selectedSlug) || null;
    }
    return null;
  });

  const categories = ['All', ...Array.from(new Set(db.personalities.map(p => p.category)))];

  const filteredPersonalities = db.personalities.filter(pers => {
    const matchCat = selectedCategory === 'All' || pers.category === selectedCategory;
    const matchQuery =
      !searchQuery ||
      pers.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pers.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pers.era.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pers.biography.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20 relative bg-star-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header Title */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase font-mono">
              Commanders, Polymaths & Visionaries
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#F5F5F0] tracking-tight">
            Historical Personalities & Legends
          </h1>
          <p className="text-sm sm:text-base text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Profiles of the unyielding military generals, profound philosophers, mathematicians, and founders whose conviction defined Islamic civilization.
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
              placeholder="Search historical figures by name, title, achievements, or era..."
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

        {/* Personalities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPersonalities.map(pers => (
            <div
              key={pers.id}
              onClick={() => setActivePersonality(pers)}
              className="group rounded-sm overflow-hidden bg-[#111111] border border-white/10 hover:border-[#D4AF37]/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col"
            >
              <div className="h-64 overflow-hidden relative bg-black">
                <img
                  src={pers.portrait}
                  alt={pers.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-sm bg-black/80 text-[#D4AF37] border border-white/10 backdrop-blur-sm">
                  {pers.era}
                </span>
                <span className="absolute top-3 right-3 text-base font-amiri text-[#D4AF37] bg-black/80 px-2.5 py-0.5 rounded-sm border border-white/10">
                  {pers.arabicName}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors">
                    {pers.name}
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-medium font-serif italic">
                    "{pers.title}"
                  </p>
                  <p className="text-xs text-white/60 line-clamp-3 leading-relaxed font-light">
                    {pers.biography}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono">
                  <span>{pers.birthYear} – {pers.deathYear}</span>
                  <span className="text-[#D4AF37] font-semibold flex items-center gap-1 uppercase tracking-wider text-[11px]">
                    View Profile <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Personality Modal */}
        {activePersonality && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
            <div className="w-full max-w-3xl bg-[#0B0B0B] border border-white/15 rounded-sm shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#111111] border-b border-white/10">
                <span className="px-2.5 py-0.5 rounded-sm bg-black/60 text-[#D4AF37] font-mono text-xs font-semibold border border-[#D4AF37]/30">
                  {activePersonality.era} • {activePersonality.birthYear} – {activePersonality.deathYear}
                </span>
                <button
                  onClick={() => setActivePersonality(null)}
                  className="p-1 text-white/60 hover:text-white rounded-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <img
                    src={activePersonality.portrait}
                    alt={activePersonality.name}
                    className="w-32 h-32 rounded-sm object-cover border border-[#D4AF37]/40 shadow-xl shrink-0"
                  />
                  <div className="space-y-2">
                    <span className="text-xl font-amiri text-[#D4AF37]">
                      {activePersonality.arabicName}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F0]">
                      {activePersonality.name}
                    </h2>
                    <p className="text-sm text-[#D4AF37] font-serif italic">
                      "{activePersonality.title}"
                    </p>
                  </div>
                </div>

                {activePersonality.quote && (
                  <div className="p-4 rounded-sm bg-[#111111] border-l-2 border-[#D4AF37] text-xs sm:text-sm text-[#F5F5F0] font-serif italic">
                    "{activePersonality.quote}"
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-serif text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
                    Detailed Biography
                  </h4>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                    {activePersonality.biography}
                  </p>
                </div>

                {/* Major Achievements */}
                <div className="space-y-3">
                  <h4 className="font-serif text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#D4AF37]" />
                    <span>Major Historical Milestones & Achievements</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-light">
                    {activePersonality.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#D4AF37] font-bold mt-0.5">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Battles or Works */}
                {activePersonality.keyBattlesOrWorks && activePersonality.keyBattlesOrWorks.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="font-serif text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] flex items-center gap-1.5">
                      <Swords className="w-4 h-4 text-[#D4AF37]" />
                      <span>Key Engagements & Treatises</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activePersonality.keyBattlesOrWorks.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-sm bg-[#111111] border border-white/10 text-xs text-white/70 font-mono"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
