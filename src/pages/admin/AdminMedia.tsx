import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Copy,
  Check,
  Search,
  Upload,
  Sparkles
} from 'lucide-react';
import { MediaItem } from '../../types';

export const AdminMedia: React.FC = () => {
  const { db, saveMedia, deleteMedia, showToast } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('Documentary Thumbnails');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCopy = (asset: MediaItem) => {
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset.id);
    showToast('Asset URL copied to clipboard', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newUrl.trim()) return;

    saveMedia({
      id: `med-${Date.now()}`,
      name: newName,
      url: newUrl,
      category: newCategory,
      size: '2.4 MB',
      uploadDate: new Date().toISOString().split('T')[0]
    });

    setNewName('');
    setNewUrl('');
    setShowAddModal(false);
  };

  const filteredMedia = db.media.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5eedc]">
            Media Library & Assets
          </h2>
          <p className="text-xs text-[#8c8a99]">
            Store and copy links for high-resolution Islamic calligraphy, maps, documentary covers, and thumbnails.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Asset</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c8a99]" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search media assets by name or tag..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#100f17] border border-[#222130] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMedia.map(asset => (
          <div
            key={asset.id}
            className="group rounded-2xl overflow-hidden bg-[#100f17] border border-[#222130] hover:border-[#d4af37]/50 transition-all shadow-xl flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden relative bg-black">
              <img
                src={asset.url}
                alt={asset.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] bg-black/80 text-[#d4af37] font-mono">
                {asset.category}
              </span>
            </div>

            <div className="p-4 space-y-3">
              <h4 className="text-xs font-semibold text-[#ede9df] truncate">
                {asset.name}
              </h4>

              <div className="flex items-center justify-between pt-2 border-t border-[#1b1a26]">
                <button
                  onClick={() => handleCopy(asset)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1a1926] hover:bg-[#252436] text-[11px] text-[#d4af37] transition-colors"
                >
                  {copiedId === asset.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`Remove media asset "${asset.name}"?`)) {
                      deleteMedia(asset.id);
                    }
                  }}
                  className="p-1 rounded text-[#737180] hover:text-red-400 transition-colors"
                  title="Delete Asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0e0d15] border border-[#d4af37]/40 rounded-2xl p-6 space-y-4 shadow-2xl gold-glow">
            <h3 className="font-cinzel text-lg font-bold text-[#f5eedc]">
              Add New Media Asset
            </h3>

            <form onSubmit={handleAddMedia} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Asset Title / Name *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Damascus Great Mosque Arch"
                  className="w-full px-3.5 py-2 bg-[#171622] border border-[#2c2b3d] rounded-xl text-xs text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Image URL *
                </label>
                <input
                  type="text"
                  required
                  value={newUrl}
                  onChange={e => setNewUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 bg-[#171622] border border-[#2c2b3d] rounded-xl text-xs text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#171622] border border-[#2c2b3d] rounded-xl text-xs text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Documentary Thumbnails">Documentary Thumbnails</option>
                  <option value="Article Covers">Article Covers</option>
                  <option value="Historical Portraits">Historical Portraits</option>
                  <option value="Civilization Banners">Civilization Banners</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#1a1926] text-xs text-[#8e8c9b]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase font-cinzel"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
