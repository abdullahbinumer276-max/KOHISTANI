import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  X,
  Copy,
  Check,
  Twitter,
  Facebook,
  Send,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ShareModal: React.FC = () => {
  const { activeShareModal, closeShareModal, showToast } = useCMS();
  const [copied, setCopied] = useState(false);

  if (!activeShareModal) return null;

  const currentUrl = window.location.href;
  const shareTitle = activeShareModal.title;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    showToast('Link copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`Discover "${shareTitle}" on The Kohistani – Islamic History Platform`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`Explore "${shareTitle}" on The Kohistani: ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-[#0B0B0B] border border-white/15 rounded-sm p-6 shadow-2xl space-y-5"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#F5F5F0] flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Share Archive Account</span>
            </h3>
            <button
              onClick={closeShareModal}
              className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-white/60 line-clamp-2 font-light">
            {shareTitle}
          </p>

          {/* Social Icons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={shareToTwitter}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-sm bg-[#111111] hover:bg-white/10 border border-white/10 text-xs text-white/80 hover:text-white transition-colors"
            >
              <Twitter className="w-4 h-4 text-sky-400" />
              <span className="font-mono text-[10px] uppercase">X / Twitter</span>
            </button>
            <button
              onClick={shareToWhatsApp}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-sm bg-[#111111] hover:bg-white/10 border border-white/10 text-xs text-white/80 hover:text-white transition-colors"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-[10px] uppercase">WhatsApp</span>
            </button>
            <button
              onClick={shareToFacebook}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-sm bg-[#111111] hover:bg-white/10 border border-white/10 text-xs text-white/80 hover:text-white transition-colors"
            >
              <Facebook className="w-4 h-4 text-blue-400" />
              <span className="font-mono text-[10px] uppercase">Facebook</span>
            </button>
          </div>

          {/* Direct Link Copy */}
          <div className="flex items-center gap-2 p-2 bg-black/60 rounded-sm border border-white/10">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 bg-transparent border-none text-xs text-white/50 px-2 focus:outline-none truncate font-mono"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-colors shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
