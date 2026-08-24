import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Clock,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  MapPin,
  Calendar
} from 'lucide-react';
import { TimelineEvent } from '../../types';

export const AdminTimeline: React.FC = () => {
  const { db, saveTimelineEvent, deleteTimelineEvent, showToast } = useCMS();
  const [editingEvent, setEditingEvent] = useState<Partial<TimelineEvent> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent?.title || !editingEvent?.year) {
      showToast('Title and Year are required', 'error');
      return;
    }

    const payload: TimelineEvent = {
      id: editingEvent.id || `timeline-${Date.now()}`,
      year: editingEvent.year || '636 CE',
      gregorianYear: Number(editingEvent.gregorianYear) || parseInt(editingEvent.year.replace(/\D/g, '')) || 636,
      hijriYear: editingEvent.hijriYear,
      title: editingEvent.title || 'Untitled Event',
      arabicTitle: editingEvent.arabicTitle,
      era: (editingEvent.era as any) || 'Rashidun Caliphate',
      category: editingEvent.category || db.categories[0]?.name || 'Islamic History',
      importanceLevel: (editingEvent.importanceLevel as any) || 'Major Milestone',
      location: editingEvent.location,
      summary: editingEvent.summary || '',
      fullDescription: editingEvent.fullDescription || editingEvent.summary || '',
      image: editingEvent.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
      relatedVideoId: editingEvent.relatedVideoId
    };

    saveTimelineEvent(payload);
    setEditingEvent(null);
    setIsNew(false);
  };

  const eras = [
    'Prophetic Era',
    'Rashidun Caliphate',
    'Umayyad Caliphate',
    'Abbasid Golden Age',
    'Al-Andalus',
    'Crusades & Ayyubids',
    'Ottoman Empire',
    'Mughal Empire'
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5eedc]">
            Interactive Timeline Events
          </h2>
          <p className="text-xs text-[#8c8a99]">
            Add and manage pivotal chronological turning points and battles.
          </p>
        </div>

        <button
          onClick={() => {
            setIsNew(true);
            setEditingEvent({
              era: 'Rashidun Caliphate',
              importanceLevel: 'Major Milestone',
              year: '636 CE',
              gregorianYear: 636
            });
          }}
          className="px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Timeline Event</span>
        </button>
      </div>

      <div className="space-y-3">
        {db.timeline.map(item => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-[#100f17] border border-[#222130] hover:border-[#d4af37]/50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="px-3 py-1.5 rounded-xl bg-[#1a1926] border border-[#2c2b3d] text-center shrink-0">
                <span className="font-mono text-xs font-bold text-[#d4af37] block">{item.year}</span>
                {item.hijriYear && <span className="text-[10px] text-[#737180] font-mono">{item.hijriYear}</span>}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-cinzel text-sm font-bold text-[#f5eedc]">
                    {item.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#1e1d2c] text-[#dedae8]">
                    {item.era}
                  </span>
                </div>
                <p className="text-xs text-[#8e8c9b] line-clamp-1 max-w-xl">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => {
                  setIsNew(false);
                  setEditingEvent(item);
                }}
                className="p-1.5 rounded-lg bg-[#181724] hover:bg-[#222134] text-[#d4af37]"
                title="Edit Event"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete event "${item.title}"?`)) {
                    deleteTimelineEvent(item.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400"
                title="Delete Event"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0e0d15] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh] gold-glow">
            <div className="flex items-center justify-between px-6 py-4 bg-[#14131d] border-b border-[#242332]">
              <h3 className="font-cinzel text-lg font-bold text-[#f5eedc]">
                {isNew ? 'Create Timeline Milestone' : 'Edit Timeline Event'}
              </h3>
              <button
                onClick={() => setEditingEvent(null)}
                className="p-1 rounded-lg text-[#8c8a99] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Milestone Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.title || ''}
                  onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  placeholder="e.g. The Battle of Yarmouk"
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    Gregorian Year Display *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEvent.year || ''}
                    onChange={e => setEditingEvent({ ...editingEvent, year: e.target.value })}
                    placeholder="636 CE"
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    Hijri Year Display
                  </label>
                  <input
                    type="text"
                    value={editingEvent.hijriYear || ''}
                    onChange={e => setEditingEvent({ ...editingEvent, hijriYear: e.target.value })}
                    placeholder="15 AH"
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    Era Classification *
                  </label>
                  <select
                    value={editingEvent.era || eras[0]}
                    onChange={e => setEditingEvent({ ...editingEvent, era: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  >
                    {eras.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    Geographic Location
                  </label>
                  <input
                    type="text"
                    value={editingEvent.location || ''}
                    onChange={e => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    placeholder="Yarmouk River, Levant"
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    Importance Level
                  </label>
                  <select
                    value={editingEvent.importanceLevel || 'Major Milestone'}
                    onChange={e => setEditingEvent({ ...editingEvent, importanceLevel: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Major Milestone">Major Milestone</option>
                    <option value="Decisive Battle">Decisive Battle</option>
                    <option value="Scientific Breakthrough">Scientific Breakthrough</option>
                    <option value="Empire Rise/Fall">Empire Rise/Fall</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Summary Description
                </label>
                <textarea
                  rows={2}
                  value={editingEvent.summary || ''}
                  onChange={e => setEditingEvent({ ...editingEvent, summary: e.target.value })}
                  placeholder="Concise overview of the historical occurrence..."
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Full Historical Narrative & Significance
                </label>
                <textarea
                  rows={4}
                  value={editingEvent.fullDescription || ''}
                  onChange={e => setEditingEvent({ ...editingEvent, fullDescription: e.target.value })}
                  placeholder="Detailed breakdown for the deep reading drawer..."
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#222130]">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#1a1926] text-xs font-semibold text-[#8e8c9b] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Milestone</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
