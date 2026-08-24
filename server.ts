import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createServer as createViteServer } from 'vite';
import {
  initDatabase,
  getDatabase,
  saveDatabaseToDisk,
  findUserByCredential,
  findUserById,
  sanitizeUser,
  normalizeRole,
  DBUser
} from './server/db';
import { initialDatabase } from './src/data/initialData';

const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'the_kohistani_secure_jwt_secret_2026_super_admin';
const COOKIE_NAME = 'kohistani_session_token';

interface AuthTokenPayload {
  id: string;
  username: string;
  role: string;
}

// Extend Express Request to include auth user
declare global {
  namespace Express {
    interface Request {
      user?: DBUser;
    }
  }
}

/**
 * Authentication Middleware
 */
async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  let token: string | undefined;

  // 1. Check Authorization header: Bearer <token>
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  }

  // 2. Fallback to cookie
  if (!token && req.cookies && req.cookies[COOKIE_NAME]) {
    token = req.cookies[COOKIE_NAME];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in.'
    });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
    const user = findUserById(payload.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session. User not found in database.'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact the administrator.'
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Session expired or invalid token. Please log in again.'
    });
  }
}

/**
 * Super Admin Middleware
 */
function requireSuperAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user || normalizeRole(req.user.role) !== 'super_admin') {
    return res.status(403).json({
      success: false,
      message: 'Access restricted to Super Administrators only.'
    });
  }
  next();
}

async function startServer() {
  // Initialize Database & Seed initial accounts (hello19 / idk19)
  await initDatabase();

  const app = express();

  // Standard middleware
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use(cookieParser());

  // ==========================================
  // AUTHENTICATION API ROUTES
  // ==========================================

  /**
   * POST /api/auth/login
   * Validates username/email & password against bcrypt hashed password in database
   */
  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const { username, password, rememberMe } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username and password are required.'
        });
      }

      // Query user in backend database
      const user = findUserByCredential(username);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password. Please verify and try again.'
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'This account has been disabled by an administrator.'
        });
      }

      // Securely compare bcrypt hash
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password. Please verify and try again.'
        });
      }

      // Update last login
      user.lastLogin = new Date().toISOString();
      saveDatabaseToDisk();

      // Sign JWT session token (30 days if rememberMe, otherwise 24 hours)
      const expiresIn = rememberMe ? '30d' : '24h';
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: normalizeRole(user.role)
        },
        JWT_SECRET,
        { expiresIn }
      );

      // Set secure cookie
      res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
      });

      console.log(`[AUTH] Successful login for user: @${user.username} (${user.role})`);

      return res.json({
        success: true,
        message: 'Authentication successful',
        token,
        user: sanitizeUser(user)
      });
    } catch (error) {
      console.error('[AUTH] Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'An internal server error occurred during authentication.'
      });
    }
  });

  /**
   * GET /api/auth/me
   * Returns current authenticated user
   */
  app.get('/api/auth/me', authenticateToken, (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    return res.json({
      success: true,
      user: sanitizeUser(req.user)
    });
  });

  /**
   * POST /api/auth/logout
   */
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    res.clearCookie(COOKIE_NAME);
    return res.json({
      success: true,
      message: 'Logged out successfully'
    });
  });

  /**
   * POST /api/auth/change-password
   * Allows logged-in user to change their password securely
   */
  app.post('/api/auth/change-password', authenticateToken, async (req: Request, res: Response) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = req.user!;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Both current password and new password are required.'
        });
      }

      if (newPassword.length < 5) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 5 characters long.'
        });
      }

      // Verify old password against database bcrypt hash
      const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Current password does not match database records.'
        });
      }

      // Hash new password securely with bcrypt
      const newHash = await bcrypt.hash(newPassword, 10);
      user.passwordHash = newHash;
      user.updatedAt = new Date().toISOString();

      saveDatabaseToDisk();
      console.log(`[AUTH] Password changed successfully for @${user.username}`);

      return res.json({
        success: true,
        message: 'Password updated successfully in database.'
      });
    } catch (error) {
      console.error('[AUTH] Change password error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update password.'
      });
    }
  });

  /**
   * POST /api/auth/update-username
   * Allows Super Admin / User to change username
   */
  app.post('/api/auth/update-username', authenticateToken, async (req: Request, res: Response) => {
    try {
      const { newUsername } = req.body;
      const user = req.user!;

      if (!newUsername || !newUsername.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Username cannot be empty.'
        });
      }

      const clean = newUsername.trim().replace(/^@/, '');
      if (clean.length < 3) {
        return res.status(400).json({
          success: false,
          message: 'Username must be at least 3 characters.'
        });
      }

      // Check uniqueness in database
      const db = getDatabase();
      const existing = db.users.find(
        u => u.id !== user.id && u.username.toLowerCase() === clean.toLowerCase()
      );

      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Username @${clean} is already taken.`
        });
      }

      user.username = clean;
      user.updatedAt = new Date().toISOString();
      saveDatabaseToDisk();

      // Issue updated token
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: normalizeRole(user.role)
        },
        JWT_SECRET,
        { expiresIn: '30d' }
      );

      res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      console.log(`[AUTH] Username updated to @${clean} for user ${user.id}`);

      return res.json({
        success: true,
        message: `Username changed to @${clean}`,
        token,
        user: sanitizeUser(user)
      });
    } catch (error) {
      console.error('[AUTH] Update username error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update username.'
      });
    }
  });

  // ==========================================
  // USER MANAGEMENT API (Super Admin / Admin)
  // ==========================================

  /**
   * GET /api/users
   */
  app.get('/api/users', authenticateToken, (req: Request, res: Response) => {
    const db = getDatabase();
    const sanitized = db.users.map(sanitizeUser);
    return res.json({
      success: true,
      users: sanitized
    });
  });

  /**
   * POST /api/users
   * Creates a new admin / editor account
   */
  app.post('/api/users', authenticateToken, requireSuperAdmin, async (req: Request, res: Response) => {
    try {
      const { username, name, email, role, password, title, avatar } = req.body;

      if (!username || !name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username, full name, email, and initial password are required.'
        });
      }

      const cleanUsername = username.trim().replace(/^@/, '');
      const db = getDatabase();

      // Check uniqueness
      const existingUser = db.users.find(
        u => u.username.toLowerCase() === cleanUsername.toLowerCase() || u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this username or email already exists.'
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const now = new Date().toISOString();

      const newUser: DBUser = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        username: cleanUsername,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        passwordHash,
        role: role || 'admin',
        avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        title: title || 'Staff Historical Contributor',
        isActive: true,
        createdAt: now,
        updatedAt: now
      };

      db.users.push(newUser);
      saveDatabaseToDisk();

      console.log(`[USER] Created user @${newUser.username} (${newUser.role})`);

      return res.json({
        success: true,
        message: `Account for @${newUser.username} created successfully in database.`,
        user: sanitizeUser(newUser)
      });
    } catch (error) {
      console.error('[USER] Create user error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create user.'
      });
    }
  });

  /**
   * PUT /api/users/:id
   * Updates user details
   */
  app.put('/api/users/:id', authenticateToken, requireSuperAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    const db = getDatabase();

    const user = db.users.find(u => u.id === id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found in database.' });
    }

    if (updates.name) user.name = updates.name.trim();
    if (updates.email) user.email = updates.email.trim();
    if (updates.role) user.role = updates.role;
    if (updates.title !== undefined) user.title = updates.title;
    if (updates.avatar) user.avatar = updates.avatar;
    if (updates.username) {
      const clean = updates.username.trim().replace(/^@/, '');
      const duplicate = db.users.find(u => u.id !== id && u.username.toLowerCase() === clean.toLowerCase());
      if (duplicate) {
        return res.status(400).json({ success: false, message: `Username @${clean} is already in use.` });
      }
      user.username = clean;
    }

    user.updatedAt = new Date().toISOString();
    saveDatabaseToDisk();

    return res.json({
      success: true,
      message: `User @${user.username} updated successfully.`,
      user: sanitizeUser(user)
    });
  });

  /**
   * POST /api/users/:id/reset-password
   */
  app.post('/api/users/:id/reset-password', authenticateToken, requireSuperAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { newPassword } = req.body;

      if (!newPassword || newPassword.length < 5) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 5 characters long.'
        });
      }

      const db = getDatabase();
      const user = db.users.find(u => u.id === id);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found in database.' });
      }

      const newHash = await bcrypt.hash(newPassword, 10);
      user.passwordHash = newHash;
      user.updatedAt = new Date().toISOString();

      saveDatabaseToDisk();
      console.log(`[USER] Reset password for user @${user.username}`);

      return res.json({
        success: true,
        message: `Password reset successfully for @${user.username}.`
      });
    } catch (error) {
      console.error('[USER] Reset password error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to reset password.'
      });
    }
  });

  /**
   * PUT /api/users/:id/toggle-status
   */
  app.put('/api/users/:id/toggle-status', authenticateToken, requireSuperAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const db = getDatabase();
    const user = db.users.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found in database.' });
    }

    if (user.id === req.user?.id) {
      return res.status(400).json({ success: false, message: 'You cannot disable your own active account.' });
    }

    user.isActive = !user.isActive;
    user.updatedAt = new Date().toISOString();
    saveDatabaseToDisk();

    return res.json({
      success: true,
      message: `Account @${user.username} is now ${user.isActive ? 'Active' : 'Disabled'}.`,
      user: sanitizeUser(user)
    });
  });

  /**
   * DELETE /api/users/:id
   */
  app.delete('/api/users/:id', authenticateToken, requireSuperAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const db = getDatabase();

    const userIndex = db.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ success: false, message: 'User not found in database.' });
    }

    const user = db.users[userIndex];

    if (user.id === req.user?.id) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own active account.' });
    }

    const superAdminCount = db.users.filter(u => normalizeRole(u.role) === 'super_admin' && u.isActive).length;
    if (normalizeRole(user.role) === 'super_admin' && superAdminCount <= 1) {
      return res.status(400).json({ success: false, message: 'Cannot delete the only active Super Admin.' });
    }

    db.users.splice(userIndex, 1);
    saveDatabaseToDisk();

    return res.json({
      success: true,
      message: `Account @${user.username} deleted from database.`
    });
  });

  // ==========================================
  // CMS DATA & CONTENT API
  // ==========================================

  /**
   * GET /api/cms/data
   * Returns site content database
   */
  app.get('/api/cms/data', (req: Request, res: Response) => {
    const db = getDatabase();
    return res.json({
      success: true,
      data: {
        branding: db.branding,
        seo: db.seo,
        homepageSections: db.homepageSections,
        videos: db.videos,
        categories: db.categories,
        timeline: db.timeline,
        personalities: db.personalities,
        articles: db.articles,
        messages: db.messages,
        media: db.media,
        users: db.users.map(sanitizeUser)
      }
    });
  });

  /**
   * PUT /api/cms/data
   * Saves updated CMS data (Protected)
   */
  app.put('/api/cms/data', authenticateToken, (req: Request, res: Response) => {
    try {
      const updates = req.body;
      const db = getDatabase();

      if (updates.branding) db.branding = updates.branding;
      if (updates.seo) db.seo = updates.seo;
      if (updates.homepageSections) db.homepageSections = updates.homepageSections;
      if (updates.videos) db.videos = updates.videos;
      if (updates.categories) db.categories = updates.categories;
      if (updates.timeline) db.timeline = updates.timeline;
      if (updates.personalities) db.personalities = updates.personalities;
      if (updates.articles) db.articles = updates.articles;
      if (updates.messages) db.messages = updates.messages;
      if (updates.media) db.media = updates.media;

      saveDatabaseToDisk();

      return res.json({
        success: true,
        message: 'Database updated successfully on server.'
      });
    } catch (error) {
      console.error('[CMS] Save error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to persist CMS updates.'
      });
    }
  });

  /**
   * POST /api/cms/contact
   * Public contact form submission
   */
  app.post('/api/cms/contact', (req: Request, res: Response) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
      }

      const db = getDatabase();
      const newMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: name.trim(),
        email: email.trim(),
        subject: subject?.trim() || 'General Inquiry',
        message: message.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isRead: false,
        status: 'new' as const
      };

      db.messages.unshift(newMessage);
      saveDatabaseToDisk();

      return res.json({
        success: true,
        message: 'Your dispatch has been received by our historical archivists.',
        messageId: newMessage.id
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
  });

  /**
   * POST /api/cms/reset-default
   * Super Admin reset
   */
  app.post('/api/cms/reset-default', authenticateToken, requireSuperAdmin, async (req: Request, res: Response) => {
    try {
      const db = getDatabase();
      const currentUsers = [...db.users];

      db.branding = initialDatabase.branding;
      db.seo = initialDatabase.seo;
      db.homepageSections = initialDatabase.homepageSections;
      db.videos = initialDatabase.videos;
      db.categories = initialDatabase.categories;
      db.timeline = initialDatabase.timeline;
      db.personalities = initialDatabase.personalities;
      db.articles = initialDatabase.articles;
      db.messages = initialDatabase.messages;
      db.media = initialDatabase.media;
      db.users = currentUsers; // Keep existing users with hashed passwords

      saveDatabaseToDisk();

      return res.json({
        success: true,
        message: 'CMS database content reset to initial default archive data.'
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to reset database.' });
    }
  });

  // ==========================================
  // VITE & STATIC FILE SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=========================================`);
    console.log(` The Kohistani Server Running on port ${PORT}`);
    console.log(` Mode: ${process.env.NODE_ENV || 'development'}`);
    console.log(` Initial Super Admin: @hello19 / idk19`);
    console.log(`=========================================`);
  });
}

startServer().catch(err => {
  console.error('[SERVER] Fatal startup error:', err);
  process.exit(1);
});
