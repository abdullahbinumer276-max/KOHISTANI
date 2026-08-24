import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Film,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Search,
  Eye,
  Star,
  Youtube,
  Play,
  Save,
  X,
  ExternalLink
} from 'lucide-react';
import { Video } from '../../types';

export const AdminVideos: React.FC = () => {
  const { db, saveVideo, deleteVideo, toggleFeaturedVideo, showToast } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingVideo, setEditingVideo] = useState<Partial<Video> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  };

  const handleYoutubeUrlChange = (url: string) => {
    const ytId = extractYoutubeId(url);
    if (ytId) {
      setEditingVideo(prev => ({
        ...prev,
        youtubeUrl: url,
        youtubeId: ytId,
        thumbnail: prev?.thumbnail || `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
      }));
    } else {
      setEditingVideo(prev => ({ ...prev, youtubeUrl: url }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo?.title || !editingVideo?.category) {
      showToast('Title and Category are required', 'error');
      return;
    }

    const videoPayload: Video = {
      id: editingVideo.id || `video-${Date.now()}`,
      title: editingVideo.title || 'Untitled Documentary',
      slug: editingVideo.slug || editingVideo.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      youtubeUrl: editingVideo.youtubeUrl || '',
      youtubeId: editingVideo.youtubeId || (editingVideo.youtubeUrl ? extractYoutubeId(editingVideo.youtubeUrl) : 'dQw4w9WgXcQ'),
      thumbnail: editingVideo.thumbnail || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
      duration: editingVideo.duration || '25:00',
      category: editingVideo.category || db.categories[0]?.name || 'Islamic History',
      description: editingVideo.description || '',
      publishDate: editingVideo.publishDate || new Date().toISOString().split('T')[0],
      views: editingVideo.views || '1.2K',
      isFeatured: !!editingVideo.isFeatured,
      tags: typeof editingVideo.tags === 'string' ? (editingVideo.tags as string).split(',').map(t => t.trim()) : editingVideo.tags || ['History', 'Islam'],
      keyTakeaways: editingVideo.keyTakeaways || []
    };

    saveVideo(videoPayload);
    setEditingVideo(null);
    setIsNew(false);
  };

  const filteredVideos = db.videos.filter(v =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5eedc]">
            Documentaries & YouTube Videos
          </h2>
          <p className="text-xs text-[#8c8a99]">
            Add, update, or feature YouTube video documentaries for the platform.
          </p>
        </div>

        <button
          onClick={() => {
            setIsNew(true);
            setEditingVideo({
              category: db.categories[0]?.name || 'Islamic History',
              duration: '28:40',
              publishDate: new Date().toISOString().split('T')[0],
              views: '10.5K',
              isFeatured: false,
              tags: ['Islamic History', 'Documentary']
            });
          }}
          className="px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Video</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c8a99]" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Filter documentaries by title, category, or tag..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#100f17] border border-[#222130] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
        />
      </div>

      {/* Table / List of Videos */}
      <div className="bg-[#100f17] border border-[#222130] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#beb9cb]">
            <thead className="bg-[#15141f] text-[#8e8c9b] font-cinzel uppercase text-[10px] tracking-wider border-b border-[#222130]">
              <tr>
                <th className="py-3 px-4">Video</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Views</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1a26]">
              {filteredVideos.map(vid => (
                <tr key={vid.id} className="hover:bg-[#15141e]/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-16 h-10 object-cover rounded-lg shrink-0 border border-[#2c2b3d]"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-[#ede9df] truncate max-w-xs sm:max-w-md">
                          {vid.title}
                        </div>
                        <div className="text-[10px] text-[#737180] font-mono truncate">
                          ID: {vid.youtubeId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#1c1b29] text-[#d4af37] font-medium">
                      {vid.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono">{vid.duration}</td>
                  <td className="py-3 px-4 font-mono">{vid.views}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleFeaturedVideo(vid.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        vid.isFeatured ? 'bg-amber-500/20 text-amber-300' : 'text-[#585664] hover:text-white'
                      }`}
                      title={vid.isFeatured ? 'Currently Featured' : 'Click to Feature'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setIsNew(false);
                          setEditingVideo(vid);
                        }}
                        className="p-1.5 rounded-lg bg-[#1a1926] hover:bg-[#252436] text-[#d4af37] transition-colors"
                        title="Edit Video"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete documentary "${vid.title}"?`)) {
                            deleteVideo(vid.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 transition-colors"
                        title="Delete Video"
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

      {/* Video Edit/Create Modal Drawer */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl bg-[#0e0d15] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh] gold-glow">
            <div className="flex items-center justify-between px-6 py-4 bg-[#14131d] border-b border-[#242332]">
              <h3 className="font-cinzel text-lg font-bold text-[#f5eedc]">
                {isNew ? 'Add New Documentary Video' : 'Edit Documentary'}
              </h3>
              <button
                onClick={() => setEditingVideo(null)}
                className="p-1 rounded-lg text-[#8c8a99] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Documentary Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingVideo.title || ''}
                  onChange={e => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  placeholder="e.g. The Conquest of Constantinople (1453)"
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    YouTube URL or Video Link
                  </label>
                  <input
                    type="text"
                    value={editingVideo.youtubeUrl || ''}
                    onChange={e => handleYoutubeUrlChange(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    YouTube Video ID
                  </label>
                  <input
                    type="text"
                    value={editingVideo.youtubeId || ''}
                    onChange={e => setEditingVideo({ ...editingVideo, youtubeId: e.target.value })}
                    placeholder="e.g. M3sC6wF4vLk"
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] font-mono focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Thumbnail Image URL
                </label>
                <input
                  type="text"
                  value={editingVideo.thumbnail || ''}
                  onChange={e => setEditingVideo({ ...editingVideo, thumbnail: e.target.value })}
                  placeholder="https://img.youtube.com/..."
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    Category *
                  </label>
                  <select
                    value={editingVideo.category || db.categories[0]?.name}
                    onChange={e => setEditingVideo({ ...editingVideo, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  >
                    {db.categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    Video Duration
                  </label>
                  <input
                    type="text"
                    value={editingVideo.duration || ''}
                    onChange={e => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    placeholder="34:20"
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                    View Count Display
                  </label>
                  <input
                    type="text"
                    value={editingVideo.views || ''}
                    onChange={e => setEditingVideo({ ...editingVideo, views: e.target.value })}
                    placeholder="45.2K"
                    className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
                  Description & Synopsis
                </label>
                <textarea
                  rows={4}
                  value={editingVideo.description || ''}
                  onChange={e => setEditingVideo({ ...editingVideo, description: e.target.value })}
                  placeholder="Detailed synopsis of the documentary..."
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={!!editingVideo.isFeatured}
                  onChange={e => setEditingVideo({ ...editingVideo, isFeatured: e.target.checked })}
                  className="w-4 h-4 accent-[#d4af37] rounded"
                />
                <label htmlFor="isFeatured" className="text-xs font-semibold text-[#ede9df] cursor-pointer">
                  Feature this video on the Homepage Spotlight Banner
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#222130]">
                <button
                  type="button"
                  onClick={() => setEditingVideo(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#1a1926] text-xs font-semibold text-[#8e8c9b] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Documentary</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
