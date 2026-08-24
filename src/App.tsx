import React, { useState, useEffect } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { VideosPage } from './pages/VideosPage';
import { TimelinePage } from './pages/TimelinePage';
import { PersonalitiesPage } from './pages/PersonalitiesPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { ShareModal } from './components/ShareModal';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminVideos } from './pages/admin/AdminVideos';
import { AdminArticles } from './pages/admin/AdminArticles';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminTimeline } from './pages/admin/AdminTimeline';
import { AdminPersonalities } from './pages/admin/AdminPersonalities';
import { AdminHomepage } from './pages/admin/AdminHomepage';
import { AdminBranding } from './pages/admin/AdminBranding';
import { AdminMedia } from './pages/admin/AdminMedia';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminSEO } from './pages/admin/AdminSEO';
import { AdminSecurity } from './pages/admin/AdminSecurity';

const MainApp: React.FC = () => {
  const { isAuthenticated, isLoadingAuth } = useCMS();
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);
  const [adminTab, setAdminTab] = useState<string>('dashboard');

  // Sync with browser URL / hash for /login and /admin/* route support
  useEffect(() => {
    const handleUrlSync = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      const path = window.location.pathname.replace(/^\//, '');
      const target = hash || path;

      if (target === 'login') {
        setCurrentView('login');
      } else if (target.startsWith('admin')) {
        setCurrentView('admin');
        const parts = target.split('/');
        // e.g. admin/videos, admin/settings/security, admin/users
        if (parts.length >= 2) {
          if (parts[1] === 'settings' && parts[2] === 'security') {
            setAdminTab('security');
          } else if (parts[1] === 'users') {
            setAdminTab('security');
          } else if (parts[1] === 'settings') {
            setAdminTab('branding');
          } else {
            setAdminTab(parts[1]);
          }
        } else {
          setAdminTab('dashboard');
        }
      } else if (target) {
        const parts = target.split('/');
        setCurrentView(parts[0]);
        if (parts.length > 1) {
          setViewParam(parts[1]);
        }
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    return () => window.removeEventListener('popstate', handleUrlSync);
  }, []);

  const handleNavigate = (view: string, param?: string) => {
    if (view === 'login') {
      setCurrentView('login');
      window.history.pushState(null, '', '#/login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'admin') {
      setCurrentView('admin');
      if (param) {
        setAdminTab(param);
        window.history.pushState(null, '', `#/admin/${param}`);
      } else {
        window.history.pushState(null, '', '#/admin');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(view);
    setViewParam(param);
    window.history.pushState(null, '', `#/${view}${param ? `/${param}` : ''}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state while verifying backend session
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-[#070709] flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        <div className="font-serif text-[#D4AF37] tracking-widest text-sm uppercase">
          Verifying Encrypted Session...
        </div>
      </div>
    );
  }

  // Login Page View (/login)
  if (currentView === 'login') {
    if (isAuthenticated) {
      // Already authenticated, redirect to /admin
      return (
        <AdminLayout
          currentTab={adminTab}
          onTabChange={(tab) => {
            setAdminTab(tab);
            window.history.pushState(null, '', `#/admin/${tab}`);
          }}
          onExitAdmin={() => handleNavigate('home')}
        >
          {adminTab === 'dashboard' && <AdminDashboard onTabChange={(tab) => setAdminTab(tab)} />}
          {adminTab === 'videos' && <AdminVideos />}
          {adminTab === 'articles' && <AdminArticles />}
          {adminTab === 'categories' && <AdminCategories />}
          {adminTab === 'timeline' && <AdminTimeline />}
          {adminTab === 'personalities' && <AdminPersonalities />}
          {adminTab === 'homepage' && <AdminHomepage />}
          {adminTab === 'branding' && <AdminBranding />}
          {adminTab === 'media' && <AdminMedia />}
          {adminTab === 'messages' && <AdminMessages />}
          {adminTab === 'seo' && <AdminSEO />}
          {(adminTab === 'security' || adminTab === 'users') && <AdminSecurity />}
        </AdminLayout>
      );
    }

    return (
      <AdminLogin
        onLoginSuccess={() => {
          setCurrentView('admin');
          setAdminTab('dashboard');
          window.history.pushState(null, '', '#/admin');
        }}
        onCancel={() => handleNavigate('home')}
      />
    );
  }

  // Admin Portal View (/admin & /admin/*)
  if (currentView === 'admin') {
    // Route Protection: Redirect unauthorized users to Login
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => {
            setCurrentView('admin');
            setAdminTab('dashboard');
            window.history.pushState(null, '', '#/admin');
          }}
          onCancel={() => handleNavigate('home')}
        />
      );
    }

    return (
      <AdminLayout
        currentTab={adminTab}
        onTabChange={(tab) => {
          setAdminTab(tab);
          window.history.pushState(null, '', `#/admin/${tab}`);
        }}
        onExitAdmin={() => handleNavigate('home')}
      >
        {adminTab === 'dashboard' && <AdminDashboard onTabChange={(tab) => setAdminTab(tab)} />}
        {adminTab === 'videos' && <AdminVideos />}
        {adminTab === 'articles' && <AdminArticles />}
        {adminTab === 'categories' && <AdminCategories />}
        {adminTab === 'timeline' && <AdminTimeline />}
        {adminTab === 'personalities' && <AdminPersonalities />}
        {adminTab === 'homepage' && <AdminHomepage />}
        {adminTab === 'branding' && <AdminBranding />}
        {adminTab === 'media' && <AdminMedia />}
        {adminTab === 'messages' && <AdminMessages />}
        {adminTab === 'seo' && <AdminSEO />}
        {(adminTab === 'security' || adminTab === 'users') && <AdminSecurity />}
      </AdminLayout>
    );
  }

  // Public Website Pages
  return (
    <div className="min-h-screen bg-[#070709] text-[#e8e6df] flex flex-col font-sans selection:bg-[#d4af37] selection:text-black">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentView === 'home' && <Home onNavigate={handleNavigate} />}
        {currentView === 'videos' && <VideosPage onNavigate={handleNavigate} />}
        {currentView === 'timeline' && <TimelinePage onNavigate={handleNavigate} selectedEventId={viewParam} />}
        {currentView === 'personalities' && <PersonalitiesPage onNavigate={handleNavigate} selectedSlug={viewParam} />}
        {currentView === 'articles' && <ArticlesPage onNavigate={handleNavigate} selectedSlug={viewParam} />}
        {currentView === 'categories' && <CategoriesPage onNavigate={handleNavigate} selectedCategorySlug={viewParam} />}
        {currentView === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentView === 'contact' && <ContactPage onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Global Modals & Notifications */}
      <SearchModal onNavigate={handleNavigate} />
      <VideoPlayerModal />
      <ShareModal />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <CMSProvider>
      <MainApp />
    </CMSProvider>
  );
}

export default App;
