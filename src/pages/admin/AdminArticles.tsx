import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Search,
  Calendar,
  Clock,
  Save,
  X,
  Eye
} from 'lucide-react';
import { Article } from '../../types';

export const AdminArticles: React.FC = () => {
  const { db, saveArticle, deleteArticle, showToast } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle?.title || !editingArticle?.category) {
      showToast('Title and Category are required', 'error');
      return;
    }

    const payload: Article = {
      id: editingArticle.id || `article-${Date.now()}`,
      title: editingArticle.title || 'Untitled Article',
      slug: editingArticle.slug || editingArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      subtitle: editingArticle.subtitle || '',
      content: editingArticle.content || '',
      coverImage: editingArticle.coverImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
      category: editingArticle.category || db.categories[0]?.name || 'Islamic History',
      publishDate: editingArticle.publishDate || new Date().toISOString().split('T')[0],
      readTime: editingArticle.readTime || '8 min read',
      author: editingArticle.author || {
        name: db.branding.channelName,
        role: 'Chief Historian',
        avatar: db.branding.mainLogo
      },
      tags: typeof editingArticle.tags === 'string' ? (editingArticle.tags as string).split(',').map(t => t.trim()) : editingArticle.tags || ['History', 'Manuscripts'],
      isFeatured: !!editingArticle.isFeatured,
      status: (editingArticle.status as any) || 'published',
      keyTakeaways: editingArticle.keyTakeaways || []
    };

    saveArticle(payload);
    setEditingArticle(null);
    setIsNew(false);
  };

  const filteredArticles = db.articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5eedc]">
            Historical Articles & Manuscripts
          </h2>
          <p className="text-xs text-[#8c8a99]">
            Draft and publish scholarly longform essays and manuscript analyses.
          </p>
        </div>

        <button
          onClick={() => {
            setIsNew(true);
            setEditingArticle({
              category: db.categories[0]?.name || 'Islamic History',
              readTime: '10 min read',
              publishDate: new Date().toISOString().split('T')[0],
              status: 'published',
              isFeatured: false,
              tags: ['Islamic History', 'Manuscripts']
            });
          }}
          className="px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c8a99]" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Filter articles by title, category, or tags..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#100f17] border border-[#222130] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
        />
      </div>

      <div className="bg-[#100f17] border border-[#222130] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#beb9cb]">
            <thead className="bg-[#15141f] text-[#8e8c9b] font-cinzel uppercase text-[10px] tracking-wider border-b border-[#222130]">
              <tr>
                <th className="py-3 px-4">Article</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Read Time</th>
                <th className="py-3 px-4">Publish Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1a26]">
              {filteredArticles.map(art => (
                <tr key={art.id} className="hover:bg-[#15141e]/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-14 h-9 object-cover rounded-lg shrink-0 border border-[#2c2b3d]"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-[#ede9df] truncate max-w-xs sm:max-w-md">
                          {art.title}
                        </div>
                        <div className="text-[10px] text-[#737180] truncate">
                          {art.subtitle}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#1c1b29] text-[#d4af37] font-medium">
                      {art.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono">{art.readTime}</td>
                  <td className="py-3 px-4">{art.publishDate}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setIsNew(false);
                          setEditingArticle(art);
                        }}
                        className="p-1.5 rounded-lg bg-[#1a1926] hover:bg-[#252436] text-[#d4af37] transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete article "${art.title}"?`)) {
                            deleteArticle(art.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl bg-[#0e0d15] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh] gold-glow">
            <div className="flex items-center justify-between px-6 py-4 bg-[#14131d] border-b border-[#242332]">
              <h3 className="font-cinzel text-lg font-bold text-[#f5eedc]">
                {isNew ? 'Write New Historical Article' : 'Edit Article'}
              </h3>
              <button
                onClick={() => setEditingArticle(null)}
                className="p-1 rounded-lg text-[#8c8a99] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingArticle.title || ''}
                  onChange={e => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  placeholder="e.g. The Siege of Baghdad (1258): Anatomy of a Catastrophe"
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Subtitle & Overview
                </label>
                <input
                  type="text"
                  value={editingArticle.subtitle || ''}
                  onChange={e => setEditingArticle({ ...editingArticle, subtitle: e.target.value })}
                  placeholder="How geopolitical negligence and Mongol military engineering caused the fall..."
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    Category *
                  </label>
                  <select
                    value={editingArticle.category || db.categories[0]?.name}
                    onChange={e => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  >
                    {db.categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    Reading Time
                  </label>
                  <input
                    type="text"
                    value={editingArticle.readTime || ''}
                    onChange={e => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                    placeholder="12 min read"
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={editingArticle.coverImage || ''}
                  onChange={e => setEditingArticle({ ...editingArticle, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Article Body (Markdown Supported)
                </label>
                <textarea
                  rows={8}
                  value={editingArticle.content || ''}
                  onChange={e => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  placeholder="Write the full historical manuscript analysis here. Use ### for subheadings and > for quotes..."
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37] font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#222130]">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#1a1926] text-xs font-semibold text-[#8e8c9b] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
