import React from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  LayoutDashboard,
  Film,
  BookOpen,
  FolderTree,
  Clock,
  Users,
  Palette,
  Image,
  Mail,
  Search,
  Globe,
  Sliders,
  Shield,
  LogOut,
  ExternalLink,
  Download,
  Upload,
  RotateCcw
} from 'lucide-react';
import { UserRole } from '../../types';

interface AdminLayoutProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onExitAdmin: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onTabChange,
  onExitAdmin,
  children
}) => {
  const { db, activeUser, currentUser, logout, switchUserRole, exportDatabaseJSON, importDatabaseJSON, resetToDefaultData, showToast } = useCMS();

  const handleLogout = () => {
    logout();
    onExitAdmin();
  };

  const handleExport = () => {
    const json = exportDatabaseJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `the-kohistani-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Database exported successfully', 'success');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      if (content) {
        importDatabaseJSON(content);
      }
    };
    reader.readAsText(file);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, role: 'editor' },
    { id: 'videos', label: 'Videos & Documentaries', icon: Film, role: 'editor', count: db.videos.length },
    { id: 'articles', label: 'Articles & Longform', icon: BookOpen, role: 'editor', count: db.articles.length },
    { id: 'categories', label: 'Categories & Eras', icon: FolderTree, role: 'admin', count: db.categories.length },
    { id: 'timeline', label: 'Interactive Timeline', icon: Clock, role: 'editor', count: db.timeline.length },
    { id: 'personalities', label: 'Historical Figures', icon: Users, role: 'editor', count: db.personalities.length },
    { id: 'homepage', label: 'Homepage Builder', icon: Sliders, role: 'admin' },
    { id: 'branding', label: 'Branding & Channel', icon: Palette, role: 'super_admin' },
    { id: 'media', label: 'Media Library', icon: Image, role: 'editor', count: db.media.length },
    { id: 'messages', label: 'Messages Inbox', icon: Mail, role: 'admin', count: db.messages.filter(m => !m.isRead).length },
    { id: 'seo', label: 'SEO & Meta Tags', icon: Globe, role: 'admin' },
    { id: 'security', label: 'Users & Security', icon: Shield, role: 'super_admin' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 lg:w-72 bg-[#0B0B0B] border-r border-white/10 flex flex-col shrink-0">
        {/* Admin Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm overflow-hidden border border-[#D4AF37]/50 bg-black flex items-center justify-center">
              {db.branding.mainLogo ? (
                <img
                  src={db.branding.mainLogo}
                  alt={db.branding.channelName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="font-serif text-xs font-bold text-[#D4AF37]">TK</span>
              )}
            </div>
            <div>
              <div className="font-serif text-sm font-bold text-[#F5F5F0] tracking-wide">
                {db.branding.channelName}
              </div>
              <div className="text-[9px] text-[#D4AF37] font-mono tracking-widest uppercase">CMS & Command Center</div>
            </div>
          </div>

          <button
            onClick={onExitAdmin}
            title="View Live Public Website"
            className="p-1.5 rounded-sm text-white/50 hover:text-[#D4AF37] hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Logged in User Profile Info */}
        <div className="p-4 border-b border-white/10 bg-[#111111]/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center font-serif text-xs font-bold text-[#D4AF37] shrink-0">
              {currentUser?.name ? currentUser.name.charAt(0) : activeUser.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-serif font-bold text-[#F5F5F0] truncate flex items-center gap-1.5">
                <span>{currentUser?.name || activeUser.name}</span>
              </div>
              <div className="text-[10px] text-[#D4AF37] truncate font-mono font-bold">
                @{currentUser?.username || activeUser.username}
              </div>
              <div className="text-[9px] text-white/40 truncate font-mono">
                {currentUser?.email || activeUser.email}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log Out of CMS"
            className="p-1.5 rounded-sm bg-red-950/30 hover:bg-red-900/50 border border-red-800/40 text-red-300 hover:text-white transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Active Role Selector Switcher */}
        <div className="p-4 border-b border-white/10 bg-[#111111]/60">
          <div className="flex items-center justify-between text-xs text-white/60 mb-1.5 font-mono">
            <span>Role Switcher:</span>
            <span className="text-[10px] uppercase text-[#D4AF37] font-bold">
              {activeUser.role.replace('_', ' ')}
            </span>
          </div>
          <select
            value={activeUser.role}
            onChange={(e) => switchUserRole(e.target.value as UserRole)}
            className="w-full bg-black/60 border border-white/15 rounded-sm px-2.5 py-1.5 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4AF37] font-mono"
          >
            <option value="super_admin">Super Admin (All Access)</option>
            <option value="admin">Admin (Content & Settings)</option>
            <option value="editor">Editor (Content Only)</option>
          </select>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="p-3 flex-1 overflow-y-auto space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`admin-tab-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#D4AF37]'}`} />
                  <span className="tracking-wide">{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-sm text-[10px] font-mono ${
                      isActive ? 'bg-black/20 text-black font-bold' : 'bg-white/5 text-white/50 border border-white/10'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Database Backup & Reset Utility Footer */}
        <div className="p-4 border-t border-white/10 bg-[#070707] space-y-2">
          <div className="text-[9px] text-white/40 uppercase tracking-widest font-mono font-semibold">
            Database Backup & Sync
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-sm bg-[#111111] hover:bg-white/10 border border-white/10 text-[11px] text-white/80 transition-colors uppercase font-mono tracking-wider"
              title="Download JSON Database Backup"
            >
              <Download className="w-3 h-3 text-[#D4AF37]" />
              <span>Export</span>
            </button>

            <label className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-sm bg-[#111111] hover:bg-white/10 border border-white/10 text-[11px] text-white/80 transition-colors cursor-pointer uppercase font-mono tracking-wider">
              <Upload className="w-3 h-3 text-sky-400" />
              <span>Import</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset all content, videos, timeline, and branding to the default state?')) {
                resetToDefaultData();
              }
            }}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-sm bg-red-950/20 hover:bg-red-950/40 text-red-400 text-[10px] border border-red-900/30 transition-colors uppercase font-mono tracking-wider cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Database</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content View Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#050505] overflow-y-auto">
        {/* Top Bar */}
        <header className="px-6 py-4 bg-[#0B0B0B] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#F5F5F0] capitalize tracking-wide">
              {currentTab.replace('-', ' ')} Manager
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-black/40 border border-white/10 rounded-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-white/70 font-mono">
                {currentUser?.email || activeUser.email}
              </span>
            </div>

            <button
              onClick={onExitAdmin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[#D4AF37] uppercase tracking-wider transition-colors font-mono cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-red-950/30 hover:bg-red-900/50 border border-red-800/40 text-xs font-bold text-red-300 hover:text-white uppercase tracking-wider transition-colors font-mono cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </header>

        {/* Tab Subview */}
        <div className="p-6 lg:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};
