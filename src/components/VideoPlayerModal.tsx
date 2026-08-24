import React from 'react';
import { useCMS } from '../context/CMSContext';
import {
  X,
  Share2,
  ExternalLink,
  Clock,
  Eye,
  Calendar,
  Sparkles,
  Tag,
  CheckCircle,
  Youtube
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoPlayerModalProps {
  onNavigate?: (view: string, param?: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ onNavigate }) => {
  const { activeVideoModal, closeVideoModal, openShareModal, db } = useCMS();

  if (!activeVideoModal) return null;

  const video = activeVideoModal;
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-5xl bg-[#0B0B0B] border border-white/15 rounded-sm shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#111111] border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                {video.category}
              </span>
              {video.isFeatured && (
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#D4AF37] text-black">
                  Spotlight
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  openShareModal({
                    title: video.title,
                    url: window.location.href,
                    category: video.category
                  })
                }
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 text-xs font-medium uppercase tracking-wider transition-colors border border-white/10"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>

              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-700/40 text-red-300 text-xs font-medium uppercase tracking-wider transition-colors"
              >
                <Youtube className="w-3.5 h-3.5 text-red-500 fill-current" />
                <span className="hidden sm:inline">Watch on YouTube</span>
              </a>

              <button
                onClick={closeVideoModal}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Scrollable Area */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
            {/* Embedded YouTube Player */}
            <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-black border border-white/10 shadow-2xl">
              <iframe
                src={embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Video Details */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#F5F5F0] leading-tight">
                {video.title}
              </h2>

              {/* Meta stats bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/40 border-y border-white/10 py-2.5 font-mono">
                <span className="flex items-center gap-1.5 text-[#D4AF37]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Duration: {video.duration}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-white/40" />
                  <span>{video.views} views</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-white/40" />
                  <span>Published: {video.publishDate}</span>
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-serif text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
                  Documentary Synopsis
                </h4>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light whitespace-pre-line">
                  {video.description}
                </p>
              </div>

              {/* Key Takeaways */}
              {video.keyTakeaways && video.keyTakeaways.length > 0 && (
                <div className="p-5 bg-[#111111] border border-white/10 space-y-2.5 rounded-sm">
                  <h4 className="font-serif text-xs font-bold text-[#D4AF37] flex items-center gap-1.5 uppercase tracking-[0.2em]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Key Historical Takeaways</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-light">
                    {video.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Video Chapters */}
              {video.chapters && video.chapters.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-serif text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
                    Timeline Chapters
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {video.chapters.map((chap, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2.5 rounded-sm bg-[#111111] border border-white/10 text-xs text-white/70"
                      >
                        <span className="px-2 py-0.5 rounded-sm bg-black/60 font-mono text-[#D4AF37] font-semibold shrink-0 border border-white/5">
                          {chap.time}
                        </span>
                        <span className="truncate">{chap.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <Tag className="w-3.5 h-3.5 text-white/40 mr-1" />
                  {video.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-sm bg-[#111111] border border-white/10 text-[11px] text-white/60 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
