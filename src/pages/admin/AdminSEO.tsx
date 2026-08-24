import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Globe,
  Save,
  Search,
  Sparkles,
  Share2,
  Check
} from 'lucide-react';

export const AdminSEO: React.FC = () => {
  const { db, updateSEO, showToast } = useCMS();
  const [formData, setFormData] = useState({
    metaTitle: db.seo.metaTitle,
    metaDescription: db.seo.metaDescription,
    keywords: db.seo.keywords,
    ogImage: db.seo.ogImage,
    twitterCard: db.seo.twitterCard,
    canonicalUrl: db.seo.canonicalUrl
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSEO(formData);
    showToast('SEO meta-tags and social graph configuration saved', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5eedc]">
          Search Engine Optimization & Social Sharing
        </h2>
        <p className="text-xs text-[#8c8a99]">
          Control global metadata, Google search indexing tags, Open Graph cards, and Twitter cards.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-[#100f17] border border-[#222130] shadow-2xl space-y-6">
        <h3 className="font-cinzel text-base font-bold text-[#f5eedc] flex items-center gap-2 border-b border-[#1f1e2c] pb-3">
          <Globe className="w-4 h-4 text-[#d4af37]" />
          <span>Global Search Engine Indexing</span>
        </h3>

        <div>
          <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
            Meta Title Tag (Google Title) *
          </label>
          <input
            type="text"
            required
            value={formData.metaTitle}
            onChange={e => setFormData({ ...formData, metaTitle: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
            Meta Description Tag (Google Snippet)
          </label>
          <textarea
            rows={3}
            value={formData.metaDescription}
            onChange={e => setFormData({ ...formData, metaDescription: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
            Global Search Keywords (Comma separated)
          </label>
          <input
            type="text"
            value={formData.keywords}
            onChange={e => setFormData({ ...formData, keywords: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
              Open Graph Share Card Image URL
            </label>
            <input
              type="text"
              value={formData.ogImage}
              onChange={e => setFormData({ ...formData, ogImage: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
              Canonical URL
            </label>
            <input
              type="text"
              value={formData.canonicalUrl}
              onChange={e => setFormData({ ...formData, canonicalUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Live Search Engine Simulation Box */}
        <div className="p-4 rounded-xl bg-[#14131e] border border-[#242335] space-y-1.5">
          <span className="text-[10px] text-[#8e8c9b] uppercase font-mono tracking-wider">
            Google Search Snippet Preview
          </span>
          <div className="text-blue-400 text-sm font-medium hover:underline cursor-pointer truncate">
            {formData.metaTitle}
          </div>
          <div className="text-emerald-500 text-xs font-mono">
            {formData.canonicalUrl || 'https://thekohistani.com'}
          </div>
          <div className="text-xs text-[#a5a3b2] line-clamp-2">
            {formData.metaDescription}
          </div>
        </div>

        <div className="pt-4 border-t border-[#1f1e2c] flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save SEO Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
