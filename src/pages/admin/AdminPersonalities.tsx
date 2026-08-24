import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Award
} from 'lucide-react';
import { Personality } from '../../types';

export const AdminPersonalities: React.FC = () => {
  const { db, savePersonality, deletePersonality, showToast } = useCMS();
  const [editingPers, setEditingPers] = useState<Partial<Personality> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPers?.name || !editingPers?.era) {
      showToast('Name and Era are required', 'error');
      return;
    }

    const payload: Personality = {
      id: editingPers.id || `pers-${Date.now()}`,
      name: editingPers.name,
      arabicName: editingPers.arabicName || '',
      title: editingPers.title || 'Historical Figure',
      slug: editingPers.slug || editingPers.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      era: editingPers.era,
      category: editingPers.category || 'Military Commanders',
      birthYear: editingPers.birthYear || '592 CE',
      deathYear: editingPers.deathYear || '642 CE',
      portrait: editingPers.portrait || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      biography: editingPers.biography || '',
      quote: editingPers.quote,
      achievements: typeof editingPers.achievements === 'string'
        ? (editingPers.achievements as string).split('\n').filter(Boolean)
        : editingPers.achievements || ['Undefeated in military strategy.'],
      keyBattlesOrWorks: typeof editingPers.keyBattlesOrWorks === 'string'
        ? (editingPers.keyBattlesOrWorks as string).split(',').map(s => s.trim())
        : editingPers.keyBattlesOrWorks || []
    };

    savePersonality(payload);
    setEditingPers(null);
    setIsNew(false);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5eedc]">
            Historical Personalities & Scholars
          </h2>
          <p className="text-xs text-[#8c8a99]">
            Add, update, or edit biographies for commanders, caliphs, polymaths, and visionaries.
          </p>
        </div>

        <button
          onClick={() => {
            setIsNew(true);
            setEditingPers({
              category: 'Military Commanders',
              era: 'Rashidun Era'
            });
          }}
          className="px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Personality</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {db.personalities.map(pers => (
          <div
            key={pers.id}
            className="p-5 rounded-2xl bg-[#100f17] border border-[#222130] hover:border-[#d4af37]/50 transition-colors shadow-lg space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <img
                  src={pers.portrait}
                  alt={pers.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#d4af37]/40 shrink-0"
                />
                <div>
                  <h3 className="font-cinzel text-base font-bold text-[#f5eedc]">
                    {pers.name}
                  </h3>
                  <p className="text-xs text-[#d4af37] font-serif italic line-clamp-1">
                    "{pers.title}"
                  </p>
                  <span className="text-[10px] text-[#787685] font-mono">
                    {pers.era} ({pers.birthYear}–{pers.deathYear})
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#8e8c9b] line-clamp-2">
                {pers.biography}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1b1a26] flex items-center justify-between text-xs text-[#787685]">
              <span>{pers.category}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsNew(false);
                    setEditingPers(pers);
                  }}
                  className="p-1.5 rounded-lg bg-[#181724] hover:bg-[#222134] text-[#d4af37]"
                  title="Edit Personality"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${pers.name}"?`)) {
                      deletePersonality(pers.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400"
                  title="Delete Personality"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingPers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0e0d15] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh] gold-glow">
            <div className="flex items-center justify-between px-6 py-4 bg-[#14131d] border-b border-[#242332]">
              <h3 className="font-cinzel text-lg font-bold text-[#f5eedc]">
                {isNew ? 'Add Historical Personality' : 'Edit Personality Profile'}
              </h3>
              <button
                onClick={() => setEditingPers(null)}
                className="p-1 rounded-lg text-[#8c8a99] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPers.name || ''}
                    onChange={e => setEditingPers({ ...editingPers, name: e.target.value })}
                    placeholder="e.g. Khalid ibn al-Walid"
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    Arabic Name
                  </label>
                  <input
                    type="text"
                    value={editingPers.arabicName || ''}
                    onChange={e => setEditingPers({ ...editingPers, arabicName: e.target.value })}
                    placeholder="خالد بن الوليد"
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] font-amiri text-lg focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    Historical Epithet / Title
                  </label>
                  <input
                    type="text"
                    value={editingPers.title || ''}
                    onChange={e => setEditingPers({ ...editingPers, title: e.target.value })}
                    placeholder="The Drawn Sword of Allah"
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    Birth Year
                  </label>
                  <input
                    type="text"
                    value={editingPers.birthYear || ''}
                    onChange={e => setEditingPers({ ...editingPers, birthYear: e.target.value })}
                    placeholder="592 CE"
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    Death Year
                  </label>
                  <input
                    type="text"
                    value={editingPers.deathYear || ''}
                    onChange={e => setEditingPers({ ...editingPers, deathYear: e.target.value })}
                    placeholder="642 CE"
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Portrait Image URL
                </label>
                <input
                  type="text"
                  value={editingPers.portrait || ''}
                  onChange={e => setEditingPers({ ...editingPers, portrait: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Biography Overview
                </label>
                <textarea
                  rows={4}
                  value={editingPers.biography || ''}
                  onChange={e => setEditingPers({ ...editingPers, biography: e.target.value })}
                  placeholder="Deep biographical narrative..."
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Famous Historical Quote
                </label>
                <input
                  type="text"
                  value={editingPers.quote || ''}
                  onChange={e => setEditingPers({ ...editingPers, quote: e.target.value })}
                  placeholder="Do you see a space the size of a hand on my body without a scar..."
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#222130]">
                <button
                  type="button"
                  onClick={() => setEditingPers(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#1a1926] text-xs font-semibold text-[#8e8c9b] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Personality</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
