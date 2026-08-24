import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Search,
  Menu,
  X,
  Youtube,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Film,
  Clock,
  Users,
  BookOpen,
  Compass,
  Mail,
  Home,
  Sliders
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { db, currentUser, isAuthenticated, openSearch } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'videos', label: 'Documentaries', icon: Film },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'personalities', label: 'Legends', icon: Users },
    { id: 'articles', label: 'Articles', icon: BookOpen },
    { id: 'categories', label: 'Empires & Eras', icon: Compass },
    { id: 'about', label: 'About', icon: null },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070709]/90 backdrop-blur-md border-b border-[#d4af37]/20 shadow-xl py-3'
          : 'bg-gradient-to-b from-[#070709]/95 via-[#070709]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <button
            id="nav-brand-logo"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group text-left transition-transform duration-200 active:scale-95"
          >
            <div className="w-10 h-10 border-2 border-[#D4AF37] flex items-center justify-center rotate-45 group-hover:scale-105 group-hover:bg-[#D4AF37]/10 transition-all shadow-md">
              {db.branding.mainLogo ? (
                <div className="-rotate-45 w-7 h-7 overflow-hidden flex items-center justify-center">
                  <img
                    src={db.branding.mainLogo}
                    alt={db.branding.channelName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <span className="-rotate-45 font-serif font-bold text-[#D4AF37] text-lg">K</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-serif tracking-[0.2em] font-bold uppercase text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                {db.branding.channelName}
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]">
                {db.branding.handle || 'Islamic History Archive'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs uppercase tracking-widest text-white/70">
            {navLinks.map(link => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => onNavigate(link.id)}
                  className={`py-1.5 transition-all duration-200 relative hover:text-[#D4AF37] cursor-pointer ${
                    isActive
                      ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] font-semibold'
                      : 'text-white/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Global Search Button */}
            <button
              id="nav-search-btn"
              onClick={openSearch}
              title="Search documentary archive (Cmd+K)"
              className="p-2 rounded-sm bg-white/5 border border-white/15 hover:border-[#D4AF37]/50 text-white/70 hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-xs uppercase tracking-wider"
            >
              <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline font-mono text-[10px] text-white/50">Search</span>
            </button>

            {/* YouTube Subscribe Quick Action */}
            <a
              id="nav-youtube-btn"
              href={db.branding.youtubeUrl || 'https://youtube.com/@thekohistani'}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-red-950/40 hover:bg-red-900/60 border border-red-700/40 text-red-300 hover:text-red-100 text-[11px] font-bold uppercase tracking-wider transition-all duration-200"
            >
              <Youtube className="w-3.5 h-3.5 text-red-500 fill-current" />
              <span>YouTube</span>
            </a>

            {/* Admin CMS Portal Switcher / Login */}
            <button
              id="nav-admin-btn"
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs transition-all duration-200 border cursor-pointer ${
                currentView.startsWith('admin')
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-lg shadow-[#D4AF37]/20'
                  : isAuthenticated
                  ? 'bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border-[#D4AF37]/50'
                  : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#D4AF37] border-white/15'
              }`}
            >
              {isAuthenticated ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold uppercase tracking-wider text-[11px]">
                    {currentUser?.role === 'super_admin' ? 'CMS (Owner)' : 'CMS (Active)'}
                  </span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="font-bold uppercase tracking-wider text-[11px]">CMS Login</span>
                </>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-sm bg-white/5 border border-white/15 text-white/80 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-[#252430] bg-[#0c0c11]/98 backdrop-blur-xl rounded-2xl p-4 shadow-2xl space-y-1">
            {navLinks.map(link => {
              const Icon = link.icon || Film;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#d4af37]/15 text-[#f5e3a9] border border-[#d4af37]/30'
                      : 'text-[#bbb8c4] hover:bg-[#181722] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#d4af37]" />
                  <span>{link.label}</span>
                </button>
              );
            })}

            <div className="pt-3 mt-3 border-t border-[#252430] flex flex-col gap-2">
              <a
                href={db.branding.youtubeUrl || 'https://youtube.com/@thekohistani'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-red-900/30 border border-red-700/40 text-red-300 text-xs font-semibold"
              >
                <Youtube className="w-4 h-4 text-red-500 fill-current" />
                <span>Visit YouTube Channel ({db.branding.handle})</span>
              </a>
              <button
                onClick={() => {
                  onNavigate('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold"
              >
                <Sliders className="w-4 h-4" />
                <span>Open Full Admin CMS Panel</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
