import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  SiteDatabase,
  BrandingSettings,
  SEOSettings,
  HomepageSectionConfig,
  Video,
  Category,
  TimelineEvent,
  Personality,
  Article,
  ContactMessage,
  MediaItem,
  AdminUser,
  UserRole
} from '../types';
import { initialDatabase } from '../data/initialData';

const TOKEN_KEY = 'the_kohistani_auth_token_v4';

interface CMSContextType {
  db: SiteDatabase;
  activeUser: AdminUser;
  currentUser: AdminUser | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  
  // Real Backend Auth methods
  login: (usernameOrEmail: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  changeCurrentPassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  updateCurrentUsername: (newUsername: string) => Promise<{ success: boolean; message: string }>;
  
  // Real Backend User Management (Super Admin)
  createAdminUser: (data: { username: string; name: string; email: string; role: UserRole; password: string; title?: string; avatar?: string }) => Promise<{ success: boolean; message: string }>;
  updateAdminUser: (userId: string, updates: Partial<AdminUser>) => Promise<{ success: boolean; message: string }>;
  resetAdminUserPassword: (userId: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  toggleUserStatus: (userId: string) => Promise<{ success: boolean; message: string }>;
  deleteAdminUser: (userId: string) => Promise<{ success: boolean; message: string }>;
  
  switchUserRole: (role: UserRole) => void;
  updateBranding: (newBranding: Partial<BrandingSettings>) => void;
  updateSEO: (newSEO: Partial<SEOSettings>) => void;
  updateHomepageSections: (sections: HomepageSectionConfig[]) => void;
  
  // Videos
  saveVideo: (video: Video) => void;
  deleteVideo: (id: string) => void;
  toggleFeaturedVideo: (id: string) => void;
  
  // Categories
  saveCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  
  // Timeline
  saveTimelineEvent: (event: TimelineEvent) => void;
  deleteTimelineEvent: (id: string) => void;
  
  // Personalities
  savePersonality: (personality: Personality) => void;
  deletePersonality: (id: string) => void;
  
  // Articles
  saveArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  
  // Media
  saveMedia: (item: MediaItem) => void;
  deleteMedia: (id: string) => void;
  
  // Messages
  sendMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'isRead' | 'status'>) => Promise<boolean>;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  
  // Backup & Reset
  exportDatabaseJSON: () => string;
  importDatabaseJSON: (jsonString: string) => boolean;
  resetToDefaultData: () => Promise<void>;
  
  // Modals & UI State
  activeVideoModal: Video | null;
  openVideoModal: (video: Video) => void;
  closeVideoModal: () => void;
  
  activeShareModal: { title: string; url: string; category?: string } | null;
  openShareModal: (data: { title: string; url: string; category?: string }) => void;
  closeShareModal: () => void;
  
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // DB State initialized with defaults
  const [db, setDb] = useState<SiteDatabase>(initialDatabase);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Fallback active user when browsing in preview
  const defaultFallbackUser: AdminUser = {
    id: 'user-super-admin',
    username: 'hello19',
    name: 'Super Administrator',
    email: 'superadmin@thekohistani.com',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    title: 'Chief Historical Archivist & System Director',
    passwordHash: '***',
    salt: '***',
    isActive: true,
    createdAt: '2026-01-01'
  };

  const activeUser = currentUser || db.users.find(u => u.role === 'super_admin') || defaultFallbackUser;
  const isAuthenticated = Boolean(currentUser && currentUser.isActive);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Helper for authenticated fetch headers
  const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem(TOKEN_KEY);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  // Fetch full CMS data from server
  const fetchCMSData = useCallback(async () => {
    try {
      const res = await fetch('/api/cms/data');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setDb(json.data);
        }
      }
    } catch (err) {
      console.warn('[CMS] Failed to fetch server data, using local initial state:', err);
    }
  }, []);

  // Check current session from backend (/api/auth/me)
  const verifySession = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsLoadingAuth(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.user) {
          setCurrentUser(json.user);
        } else {
          localStorage.removeItem(TOKEN_KEY);
          setCurrentUser(null);
        }
      } else {
        localStorage.removeItem(TOKEN_KEY);
        setCurrentUser(null);
      }
    } catch (err) {
      console.warn('[AUTH] Error verifying backend session:', err);
      localStorage.removeItem(TOKEN_KEY);
      setCurrentUser(null);
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    verifySession();
    fetchCMSData();
  }, [verifySession, fetchCMSData]);

  // Persist DB updates to server
  const syncDbToServer = async (updatedDb: Partial<SiteDatabase>) => {
    try {
      await fetch('/api/cms/data', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedDb)
      });
    } catch (err) {
      console.error('[CMS] Failed to sync updates to backend server:', err);
    }
  };

  /**
   * Real Backend Login
   */
  const login = async (
    usernameOrEmail: string,
    password: string,
    rememberMe: boolean = true
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: usernameOrEmail.trim(),
          password,
          rememberMe
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || 'Invalid username or password.'
        };
      }

      // Save token
      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
      }

      setCurrentUser(data.user);
      await fetchCMSData(); // Refresh DB with latest state

      showToast(`Welcome back, ${data.user.name || data.user.username}!`, 'success');
      return { success: true };
    } catch (err) {
      console.error('[AUTH] Login network error:', err);
      return {
        success: false,
        message: 'Could not connect to the authentication server. Please try again.'
      };
    }
  };

  /**
   * Real Backend Logout
   */
  const logout = async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.warn('[AUTH] Logout API call error:', err);
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setCurrentUser(null);
      showToast('Logged out of Admin Portal.', 'info');
    }
  };

  /**
   * Change current user's password via backend
   */
  const changeCurrentPassword = async (
    oldPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Failed to update password.' };
      }

      showToast('Password securely updated in database.', 'success');
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: 'Server communication error while changing password.' };
    }
  };

  /**
   * Update current user's username via backend
   */
  const updateCurrentUsername = async (
    newUsername: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/auth/update-username', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ newUsername })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Failed to update username.' };
      }

      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
      }
      if (data.user) {
        setCurrentUser(data.user);
      }

      await fetchCMSData();
      showToast(data.message, 'success');
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: 'Failed to communicate with server.' };
    }
  };

  /**
   * Create New Admin User via Backend
   */
  const createAdminUser = async (data: {
    username: string;
    name: string;
    email: string;
    role: UserRole;
    password: string;
    title?: string;
    avatar?: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        return { success: false, message: resData.message || 'Failed to create user.' };
      }

      await fetchCMSData();
      showToast(resData.message, 'success');
      return { success: true, message: resData.message };
    } catch (err) {
      return { success: false, message: 'Server error while creating user account.' };
    }
  };

  /**
   * Update Admin User via Backend
   */
  const updateAdminUser = async (
    userId: string,
    updates: Partial<AdminUser>
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        return { success: false, message: resData.message || 'Failed to update user.' };
      }

      await fetchCMSData();
      if (currentUser && currentUser.id === userId && resData.user) {
        setCurrentUser(resData.user);
      }

      showToast(resData.message, 'success');
      return { success: true, message: resData.message };
    } catch (err) {
      return { success: false, message: 'Server communication error.' };
    }
  };

  /**
   * Reset user password via Backend
   */
  const resetAdminUserPassword = async (
    userId: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch(`/api/users/${userId}/reset-password`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ newPassword })
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        return { success: false, message: resData.message || 'Failed to reset password.' };
      }

      showToast(resData.message, 'success');
      return { success: true, message: resData.message };
    } catch (err) {
      return { success: false, message: 'Server error resetting password.' };
    }
  };

  /**
   * Toggle user active status via Backend
   */
  const toggleUserStatus = async (userId: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch(`/api/users/${userId}/toggle-status`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        return { success: false, message: resData.message || 'Failed to toggle status.' };
      }

      await fetchCMSData();
      showToast(resData.message, 'info');
      return { success: true, message: resData.message };
    } catch (err) {
      return { success: false, message: 'Server communication error.' };
    }
  };

  /**
   * Delete Admin User via Backend
   */
  const deleteAdminUser = async (userId: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        return { success: false, message: resData.message || 'Failed to delete user.' };
      }

      await fetchCMSData();
      showToast(resData.message, 'info');
      return { success: true, message: resData.message };
    } catch (err) {
      return { success: false, message: 'Server error deleting user.' };
    }
  };

  const switchUserRole = (role: UserRole) => {
    if (currentUser) {
      const updated = { ...currentUser, role };
      setCurrentUser(updated);
      showToast(`Switched active view role to: ${role.toUpperCase()}`, 'info');
    }
  };

  // Content Operations
  const updateBranding = (newBranding: Partial<BrandingSettings>) => {
    setDb(prev => {
      const updated = { ...prev, branding: { ...prev.branding, ...newBranding } };
      syncDbToServer({ branding: updated.branding });
      return updated;
    });
    showToast('Brand settings updated on server', 'success');
  };

  const updateSEO = (newSEO: Partial<SEOSettings>) => {
    setDb(prev => {
      const updated = { ...prev, seo: { ...prev.seo, ...newSEO } };
      syncDbToServer({ seo: updated.seo });
      return updated;
    });
    showToast('SEO settings updated on server', 'success');
  };

  const updateHomepageSections = (sections: HomepageSectionConfig[]) => {
    setDb(prev => {
      const updated = { ...prev, homepageSections: sections };
      syncDbToServer({ homepageSections: sections });
      return updated;
    });
    showToast('Homepage section layout saved', 'success');
  };

  const saveVideo = (video: Video) => {
    setDb(prev => {
      const exists = prev.videos.some(v => v.id === video.id);
      const videos = exists
        ? prev.videos.map(v => (v.id === video.id ? video : v))
        : [video, ...prev.videos];
      const updated = { ...prev, videos };
      syncDbToServer({ videos });
      return updated;
    });
    showToast(`Documentary "${video.title}" saved`, 'success');
  };

  const deleteVideo = (id: string) => {
    setDb(prev => {
      const videos = prev.videos.filter(v => v.id !== id);
      const updated = { ...prev, videos };
      syncDbToServer({ videos });
      return updated;
    });
    showToast('Documentary deleted', 'info');
  };

  const toggleFeaturedVideo = (id: string) => {
    setDb(prev => {
      const videos = prev.videos.map(v => (v.id === id ? { ...v, isFeatured: !v.isFeatured } : v));
      const updated = { ...prev, videos };
      syncDbToServer({ videos });
      return updated;
    });
  };

  const saveCategory = (category: Category) => {
    setDb(prev => {
      const exists = prev.categories.some(c => c.id === category.id);
      const categories = exists
        ? prev.categories.map(c => (c.id === category.id ? category : c))
        : [...prev.categories, category];
      const updated = { ...prev, categories };
      syncDbToServer({ categories });
      return updated;
    });
    showToast(`Category "${category.name}" saved`, 'success');
  };

  const deleteCategory = (id: string) => {
    setDb(prev => {
      const categories = prev.categories.filter(c => c.id !== id);
      const updated = { ...prev, categories };
      syncDbToServer({ categories });
      return updated;
    });
    showToast('Historical Category removed', 'info');
  };

  const saveTimelineEvent = (event: TimelineEvent) => {
    setDb(prev => {
      const exists = prev.timeline.some(e => e.id === event.id);
      const timeline = exists
        ? prev.timeline.map(e => (e.id === event.id ? event : e))
        : [...prev.timeline, event].sort((a, b) => a.gregorianYear - b.gregorianYear);
      const updated = { ...prev, timeline };
      syncDbToServer({ timeline });
      return updated;
    });
    showToast(`Timeline milestone "${event.title}" saved`, 'success');
  };

  const deleteTimelineEvent = (id: string) => {
    setDb(prev => {
      const timeline = prev.timeline.filter(e => e.id !== id);
      const updated = { ...prev, timeline };
      syncDbToServer({ timeline });
      return updated;
    });
    showToast('Timeline milestone removed', 'info');
  };

  const savePersonality = (personality: Personality) => {
    setDb(prev => {
      const exists = prev.personalities.some(p => p.id === personality.id);
      const personalities = exists
        ? prev.personalities.map(p => (p.id === personality.id ? personality : p))
        : [...prev.personalities, personality];
      const updated = { ...prev, personalities };
      syncDbToServer({ personalities });
      return updated;
    });
    showToast(`Personality archive "${personality.name}" saved`, 'success');
  };

  const deletePersonality = (id: string) => {
    setDb(prev => {
      const personalities = prev.personalities.filter(p => p.id !== id);
      const updated = { ...prev, personalities };
      syncDbToServer({ personalities });
      return updated;
    });
    showToast('Historical figure removed', 'info');
  };

  const saveArticle = (article: Article) => {
    setDb(prev => {
      const exists = prev.articles.some(a => a.id === article.id);
      const articles = exists
        ? prev.articles.map(a => (a.id === article.id ? article : a))
        : [article, ...prev.articles];
      const updated = { ...prev, articles };
      syncDbToServer({ articles });
      return updated;
    });
    showToast(`Article "${article.title}" saved`, 'success');
  };

  const deleteArticle = (id: string) => {
    setDb(prev => {
      const articles = prev.articles.filter(a => a.id !== id);
      const updated = { ...prev, articles };
      syncDbToServer({ articles });
      return updated;
    });
    showToast('Article removed', 'info');
  };

  const saveMedia = (item: MediaItem) => {
    setDb(prev => {
      const exists = prev.media.some(m => m.id === item.id);
      const media = exists ? prev.media.map(m => (m.id === item.id ? item : m)) : [item, ...prev.media];
      const updated = { ...prev, media };
      syncDbToServer({ media });
      return updated;
    });
    showToast('Media asset cataloged', 'success');
  };

  const deleteMedia = (id: string) => {
    setDb(prev => {
      const media = prev.media.filter(m => m.id !== id);
      const updated = { ...prev, media };
      syncDbToServer({ media });
      return updated;
    });
    showToast('Media asset removed', 'info');
  };

  const sendMessage = async (msg: Omit<ContactMessage, 'id' | 'date' | 'isRead' | 'status'>): Promise<boolean> => {
    try {
      const res = await fetch('/api/cms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await fetchCMSData();
        showToast('Your message has been sent to The Kohistani archivists.', 'success');
        return true;
      }
      showToast(data.message || 'Failed to send message', 'error');
      return false;
    } catch (err) {
      showToast('Network error sending message', 'error');
      return false;
    }
  };

  const markMessageRead = (id: string) => {
    setDb(prev => {
      const messages = prev.messages.map(m => (m.id === id ? { ...m, isRead: true } : m));
      const updated = { ...prev, messages };
      syncDbToServer({ messages });
      return updated;
    });
  };

  const deleteMessage = (id: string) => {
    setDb(prev => {
      const messages = prev.messages.filter(m => m.id !== id);
      const updated = { ...prev, messages };
      syncDbToServer({ messages });
      return updated;
    });
    showToast('Message deleted', 'info');
  };

  const exportDatabaseJSON = (): string => {
    return JSON.stringify(db, null, 2);
  };

  const importDatabaseJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.branding && parsed.videos && parsed.categories) {
        setDb(parsed);
        syncDbToServer(parsed);
        showToast('Database archive restored successfully', 'success');
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const resetToDefaultData = async (): Promise<void> => {
    try {
      const res = await fetch('/api/cms/reset-default', {
        method: 'POST',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await fetchCMSData();
        showToast('Database reset to original archive data.', 'info');
      }
    } catch (err) {
      showToast('Failed to reset database on server', 'error');
    }
  };

  // Modals state
  const [activeVideoModal, setActiveVideoModal] = useState<Video | null>(null);
  const openVideoModal = (video: Video) => setActiveVideoModal(video);
  const closeVideoModal = () => setActiveVideoModal(null);

  const [activeShareModal, setActiveShareModal] = useState<{ title: string; url: string; category?: string } | null>(null);
  const openShareModal = (data: { title: string; url: string; category?: string }) => setActiveShareModal(data);
  const closeShareModal = () => setActiveShareModal(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <CMSContext.Provider
      value={{
        db,
        activeUser,
        currentUser,
        isAuthenticated,
        isLoadingAuth,
        login,
        logout,
        changeCurrentPassword,
        updateCurrentUsername,
        createAdminUser,
        updateAdminUser,
        resetAdminUserPassword,
        toggleUserStatus,
        deleteAdminUser,
        switchUserRole,
        updateBranding,
        updateSEO,
        updateHomepageSections,
        saveVideo,
        deleteVideo,
        toggleFeaturedVideo,
        saveCategory,
        deleteCategory,
        saveTimelineEvent,
        deleteTimelineEvent,
        savePersonality,
        deletePersonality,
        saveArticle,
        deleteArticle,
        saveMedia,
        deleteMedia,
        sendMessage,
        markMessageRead,
        deleteMessage,
        exportDatabaseJSON,
        importDatabaseJSON,
        resetToDefaultData,
        activeVideoModal,
        openVideoModal,
        closeVideoModal,
        activeShareModal,
        openShareModal,
        closeShareModal,
        isSearchOpen,
        openSearch,
        closeSearch,
        toast,
        showToast
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
