import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Sliders,
  Save,
  Sparkles,
  Eye,
  Check,
  Image,
  Layers
} from 'lucide-react';

export const AdminHomepage: React.FC = () => {
  const { db, updateBranding, showToast } = useCMS();
  const [formData, setFormData] = useState({
    heroHeading: db.branding.heroHeading,
    heroSubheading: db.branding.heroSubheading,
    heroPrimaryBtnText: db.branding.heroPrimaryBtnText,
    heroSecondaryBtnText: db.branding.heroSecondaryBtnText,
    heroBackground: db.branding.heroBackground
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding(formData);
    showToast('Homepage hero & layout settings updated', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5eedc]">
          Homepage Layout & Hero Builder
        </h2>
        <p className="text-xs text-[#8c8a99]">
          Customize the high-impact visual banners, hero copy, backdrop imagery, and call-to-action buttons.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-[#100f17] border border-[#222130] shadow-2xl space-y-6">
        <h3 className="font-cinzel text-base font-bold text-[#f5eedc] flex items-center gap-2 border-b border-[#1f1e2c] pb-3">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span>Cinematic Hero Section</span>
        </h3>

        <div>
          <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
            Main Hero Display Heading *
          </label>
          <input
            type="text"
            required
            value={formData.heroHeading}
            onChange={e => setFormData({ ...formData, heroHeading: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
            Hero Subheading / Hook
          </label>
          <textarea
            rows={3}
            value={formData.heroSubheading}
            onChange={e => setFormData({ ...formData, heroSubheading: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
            Hero Ambient Background Image URL
          </label>
          <input
            type="text"
            value={formData.heroBackground}
            onChange={e => setFormData({ ...formData, heroBackground: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
          />
          {formData.heroBackground && (
            <div className="mt-3 h-32 rounded-xl overflow-hidden border border-[#2c2b3d] relative">
              <img
                src={formData.heroBackground}
                alt="Hero preview"
                className="w-full h-full object-cover filter brightness-70"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] bg-black/80 text-[#d4af37] font-mono">
                Live Preview
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
              Primary Action Button Label
            </label>
            <input
              type="text"
              value={formData.heroPrimaryBtnText}
              onChange={e => setFormData({ ...formData, heroPrimaryBtnText: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
              Secondary Action Button Label
            </label>
            <input
              type="text"
              value={formData.heroSecondaryBtnText}
              onChange={e => setFormData({ ...formData, heroSecondaryBtnText: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#1f1e2c] flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Publish Homepage Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
