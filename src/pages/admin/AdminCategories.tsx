import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Sparkles
} from 'lucide-react';
import { Category } from '../../types';

export const AdminCategories: React.FC = () => {
  const { db, saveCategory, deleteCategory, showToast } = useCMS();
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name) {
      showToast('Category name is required', 'error');
      return;
    }

    const payload: Category = {
      id: editingCategory.id || `cat-${Date.now()}`,
      name: editingCategory.name,
      slug: editingCategory.slug || editingCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      arabicTitle: editingCategory.arabicTitle || '',
      description: editingCategory.description || '',
      coverImage: editingCategory.coverImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
      iconName: editingCategory.iconName || 'Landmark',
      colorAccent: editingCategory.colorAccent || '#d4af37',
      displayOrder: editingCategory.displayOrder || db.categories.length + 1
    };

    saveCategory(payload);
    setEditingCategory(null);
    setIsNew(false);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5eedc]">
            Empires, Eras & Categories
          </h2>
          <p className="text-xs text-[#8c8a99]">
            Manage the Islamic civilizational categories and historical eras.
          </p>
        </div>

        <button
          onClick={() => {
            setIsNew(true);
            setEditingCategory({
              displayOrder: db.categories.length + 1
            });
          }}
          className="px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {db.categories.map(cat => {
          const videoCount = db.videos.filter(v => v.category === cat.name).length;
          return (
            <div
              key={cat.id}
              className="p-5 rounded-2xl bg-[#100f17] border border-[#222130] hover:border-[#d4af37]/50 transition-colors shadow-lg space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-32 rounded-xl overflow-hidden relative bg-black">
                  <img
                    src={cat.coverImage}
                    alt={cat.name}
                    className="w-full h-full object-cover filter brightness-85"
                  />
                  <span className="absolute top-2 right-2 text-xs font-amiri text-[#f5e3a9] bg-black/70 px-2 py-0.5 rounded-full border border-[#d4af37]/30">
                    {cat.arabicTitle}
                  </span>
                </div>

                <div>
                  <h3 className="font-cinzel text-lg font-bold text-[#f5eedc]">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#8e8c9b] line-clamp-2 mt-1">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1b1a26] flex items-center justify-between text-xs text-[#787685]">
                <span>{videoCount} Documentaries</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsNew(false);
                      setEditingCategory(cat);
                    }}
                    className="p-1.5 rounded-lg bg-[#181724] hover:bg-[#222134] text-[#d4af37]"
                    title="Edit Category"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete category "${cat.name}"?`)) {
                        deleteCategory(cat.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-xl bg-[#0e0d15] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto gold-glow">
            <div className="flex items-center justify-between px-6 py-4 bg-[#14131d] border-b border-[#242332]">
              <h3 className="font-cinzel text-lg font-bold text-[#f5eedc]">
                {isNew ? 'Create New Category / Era' : 'Edit Category'}
              </h3>
              <button
                onClick={() => setEditingCategory(null)}
                className="p-1 rounded-lg text-[#8c8a99] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.name || ''}
                  onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  placeholder="e.g. Mamluk Sultanate"
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Arabic Script Title
                </label>
                <input
                  type="text"
                  value={editingCategory.arabicTitle || ''}
                  onChange={e => setEditingCategory({ ...editingCategory, arabicTitle: e.target.value })}
                  placeholder="e.g. دولة المماليك"
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] font-amiri text-lg focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={editingCategory.coverImage || ''}
                  onChange={e => setEditingCategory({ ...editingCategory, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Summary Description
                </label>
                <textarea
                  rows={3}
                  value={editingCategory.description || ''}
                  onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  placeholder="Brief historical scope of this dynasty or era..."
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#222130]">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#1a1926] text-xs font-semibold text-[#8e8c9b] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
