import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Palette,
  Save,
  Youtube,
  Globe,
  Mail,
  Shield,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';

export const AdminBranding: React.FC = () => {
  const { db, updateBranding, showToast } = useCMS();
  const [formData, setFormData] = useState({
    channelName: db.branding.channelName,
    handle: db.branding.handle,
    tagline: db.branding.tagline,
    mainLogo: db.branding.mainLogo,
    youtubeUrl: db.branding.youtubeUrl,
    email: db.branding.email,
    aboutMission: db.branding.aboutMission,
    aboutVision: db.branding.aboutVision,
    aboutProductionEthos: db.branding.aboutProductionEthos,
    aboutStory: db.branding.aboutStory
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding(formData);
    showToast('Branding and channel identity saved successfully', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5eedc]">
          Brand Identity & Channel Settings
        </h2>
        <p className="text-xs text-[#8c8a99]">
          Manage channel name, YouTube handles, logo avatars, contact emails, and brand ethos narratives.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-[#100f17] border border-[#222130] shadow-2xl space-y-6">
        <h3 className="font-cinzel text-base font-bold text-[#f5eedc] flex items-center gap-2 border-b border-[#1f1e2c] pb-3">
          <Palette className="w-4 h-4 text-[#d4af37]" />
          <span>Core Brand Attributes</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
              Channel Name *
            </label>
            <input
              type="text"
              required
              value={formData.channelName}
              onChange={e => setFormData({ ...formData, channelName: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
              YouTube Handle *
            </label>
            <input
              type="text"
              required
              value={formData.handle}
              onChange={e => setFormData({ ...formData, handle: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
            Brand Tagline / Motto
          </label>
          <input
            type="text"
            value={formData.tagline}
            onChange={e => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
              Official YouTube URL
            </label>
            <input
              type="text"
              value={formData.youtubeUrl}
              onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
              Inquiries Contact Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
            Channel Logo / Avatar URL
          </label>
          <input
            type="text"
            value={formData.mainLogo}
            onChange={e => setFormData({ ...formData, mainLogo: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <h3 className="font-cinzel text-base font-bold text-[#f5eedc] flex items-center gap-2 border-b border-[#1f1e2c] pb-3 pt-4">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span>About Page Narratives</span>
        </h3>

        <div>
          <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
            Mission Statement
          </label>
          <textarea
            rows={2}
            value={formData.aboutMission}
            onChange={e => setFormData({ ...formData, aboutMission: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
            Vision Statement
          </label>
          <textarea
            rows={2}
            value={formData.aboutVision}
            onChange={e => setFormData({ ...formData, aboutVision: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#8e8c9b] mb-1">
            Production & Research Ethos
          </label>
          <textarea
            rows={2}
            value={formData.aboutProductionEthos}
            onChange={e => setFormData({ ...formData, aboutProductionEthos: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-sm text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="pt-4 border-t border-[#1f1e2c] flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Branding Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
