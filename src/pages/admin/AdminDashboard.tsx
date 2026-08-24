import React from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Film,
  BookOpen,
  FolderTree,
  Clock,
  Users,
  Mail,
  TrendingUp,
  PlusCircle,
  Eye,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface AdminDashboardProps {
  onTabChange: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onTabChange }) => {
  const { db, activeUser } = useCMS();

  const statCards = [
    { label: 'Total Documentaries', count: db.videos.length, icon: Film, color: 'text-amber-400', tab: 'videos' },
    { label: 'Published Articles', count: db.articles.length, icon: BookOpen, color: 'text-emerald-400', tab: 'articles' },
    { label: 'Historical Eras & Empires', count: db.categories.length, icon: FolderTree, color: 'text-blue-400', tab: 'categories' },
    { label: 'Timeline Milestones', count: db.timeline.length, icon: Clock, color: 'text-sky-400', tab: 'timeline' },
    { label: 'Scholars & Figures', count: db.personalities.length, icon: Users, color: 'text-purple-400', tab: 'personalities' },
    { label: 'Contact Inquiries', count: db.messages.length, icon: Mail, color: 'text-pink-400', tab: 'messages', unread: db.messages.filter(m => !m.isRead).length }
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#14131e] via-[#100f18] to-[#171624] border border-[#d4af37]/35 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 gold-glow">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-widest font-mono">
              The Kohistani Admin Control Suite
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#d4af37]/20 text-[#f5e3a9] font-mono">
              v2.0 Active
            </span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#fdfbf7]">
            Welcome, {activeUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#b5b2c4] max-w-xl">
            You have full live authority to create, edit, reorder, and customize all documentaries, articles, timelines, personalities, branding, and homepage modules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onTabChange('videos')}
            className="px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Video</span>
          </button>
          <button
            onClick={() => onTabChange('articles')}
            className="px-4 py-2.5 rounded-xl bg-[#1d1c2b] hover:bg-[#2a293c] border border-[#2d2c3e] text-xs font-semibold text-[#f0ede6] transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Article</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={() => onTabChange(stat.tab)}
              className="p-4 rounded-2xl bg-[#100f17] border border-[#222130] hover:border-[#d4af37]/50 cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-lg space-y-2"
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                {stat.unread !== undefined && stat.unread > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-950 text-red-300 font-mono font-bold">
                    {stat.unread} new
                  </span>
                )}
              </div>
              <div className="font-cinzel text-2xl font-bold text-[#f5eedc]">
                {stat.count}
              </div>
              <div className="text-[11px] text-[#8c8a99] font-medium leading-tight">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity / Content Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latest Inquiries / Messages */}
        <div className="p-6 rounded-2xl bg-[#100f17] border border-[#222130] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-base font-bold text-[#f5eedc] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#d4af37]" />
              <span>Recent Contact Inquiries</span>
            </h3>
            <button
              onClick={() => onTabChange('messages')}
              className="text-xs text-[#d4af37] hover:underline"
            >
              View Inbox ({db.messages.length}) →
            </button>
          </div>

          <div className="space-y-2.5">
            {db.messages.slice(0, 3).map(msg => (
              <div
                key={msg.id}
                onClick={() => onTabChange('messages')}
                className="p-3 rounded-xl bg-[#15141e] border border-[#232231] hover:border-[#d4af37]/40 cursor-pointer transition-colors space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#ede9df]">{msg.name}</span>
                  <span className="text-[10px] text-[#787685]">{msg.date}</span>
                </div>
                <p className="text-xs text-[#d4af37] truncate">{msg.subject}</p>
                <p className="text-[11px] text-[#8e8c9b] line-clamp-1">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Documentaries Summary */}
        <div className="p-6 rounded-2xl bg-[#100f17] border border-[#222130] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-base font-bold text-[#f5eedc] flex items-center gap-2">
              <Film className="w-4 h-4 text-[#d4af37]" />
              <span>Documentary Library Status</span>
            </h3>
            <button
              onClick={() => onTabChange('videos')}
              className="text-xs text-[#d4af37] hover:underline"
            >
              Manage Videos ({db.videos.length}) →
            </button>
          </div>

          <div className="space-y-2.5">
            {db.videos.slice(0, 3).map(vid => (
              <div
                key={vid.id}
                onClick={() => onTabChange('videos')}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#15141e] border border-[#232231] hover:border-[#d4af37]/40 cursor-pointer transition-colors"
              >
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-14 h-9 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-[#ede9df] truncate">
                    {vid.title}
                  </h4>
                  <p className="text-[11px] text-[#8e8c9b]">{vid.category} • {vid.duration}</p>
                </div>
                {vid.isFeatured && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 shrink-0 font-medium">
                    Featured
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
