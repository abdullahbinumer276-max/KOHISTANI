import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { initialDatabase } from '../src/data/initialData';
import { SiteDatabase, AdminUser, UserRole } from '../src/types';

export interface DBUser {
  id: string;
  username: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'super_admin' | 'admin' | 'editor';
  avatar: string;
  title?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface BackendDatabase extends Omit<SiteDatabase, 'users'> {
  users: DBUser[];
}

const DATA_DIR = path.join(process.cwd(), 'server', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// In-memory cache for fast read/write with periodic and on-demand disk persistence
let dbCache: BackendDatabase | null = null;

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Normalizes role string to standard lowercase format for CMS compatibility
 */
export function normalizeRole(role: string): UserRole {
  const lower = role.toLowerCase();
  if (lower.includes('super')) return 'super_admin';
  if (lower.includes('editor')) return 'editor';
  return 'admin';
}

/**
 * Initializes the database, seeding the initial Super Admin account if not present.
 */
export async function initDatabase(): Promise<BackendDatabase> {
  ensureDataDirectory();

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      dbCache = JSON.parse(raw);
    } catch (err) {
      console.error('[DB] Error parsing existing db.json, falling back to initial data', err);
    }
  }

  if (!dbCache) {
    console.log('[DB] Initializing fresh database from default seed...');
    dbCache = {
      branding: initialDatabase.branding,
      seo: initialDatabase.seo,
      homepageSections: initialDatabase.homepageSections,
      videos: initialDatabase.videos,
      categories: initialDatabase.categories,
      timeline: initialDatabase.timeline,
      personalities: initialDatabase.personalities,
      articles: initialDatabase.articles,
      messages: initialDatabase.messages,
      media: initialDatabase.media,
      users: []
    };
  }

  // Ensure users array exists
  if (!Array.isArray(dbCache.users)) {
    dbCache.users = [];
  }

  // Seed or verify the Initial Super Admin account (hello19 / idk19)
  const existingSuperAdmin = dbCache.users.find(
    u => u.username.toLowerCase() === 'hello19' || u.id === 'user-super-admin'
  );

  const defaultPasswordHash = await bcrypt.hash('idk19', 10);
  const now = new Date().toISOString();

  if (!existingSuperAdmin) {
    console.log('[DB] Seeding Initial Super Admin account: hello19');
    const initialSuperAdmin: DBUser = {
      id: 'user-super-admin',
      username: 'hello19',
      name: 'Super Administrator',
      email: 'superadmin@thekohistani.com',
      passwordHash: defaultPasswordHash,
      role: 'SUPER_ADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      title: 'Chief Historical Archivist & System Director',
      isActive: true,
      createdAt: now,
      updatedAt: now
    };
    dbCache.users.unshift(initialSuperAdmin);
  } else {
    // If the super admin exists, make sure it has required fields
    if (!existingSuperAdmin.passwordHash || !existingSuperAdmin.passwordHash.startsWith('$2')) {
      // Update with valid bcrypt hash if placeholder was present
      existingSuperAdmin.passwordHash = defaultPasswordHash;
      existingSuperAdmin.updatedAt = now;
    }
    if (!existingSuperAdmin.username) {
      existingSuperAdmin.username = 'hello19';
    }
    existingSuperAdmin.isActive = true;
  }

  // Also seed default staff users if users list only has super admin
  const editorUser = dbCache.users.find(u => u.username.toLowerCase() === 'tariq');
  if (!editorUser) {
    const editorPassHash = await bcrypt.hash('tariq2026', 10);
    dbCache.users.push({
      id: 'user-tariq-editor',
      username: 'tariq',
      name: 'Tariq Al-Mansoor',
      email: 'tariq@thekohistani.com',
      passwordHash: editorPassHash,
      role: 'EDITOR',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      title: 'Senior Historical Documentarian',
      isActive: true,
      createdAt: now,
      updatedAt: now
    });
  }

  const adminUser = dbCache.users.find(u => u.username.toLowerCase() === 'sara');
  if (!adminUser) {
    const adminPassHash = await bcrypt.hash('sara2026', 10);
    dbCache.users.push({
      id: 'user-sara-admin',
      username: 'sara',
      name: 'Dr. Sara Al-Husseini',
      email: 'sara@thekohistani.com',
      passwordHash: adminPassHash,
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      title: 'Manuscript & Cartography Curator',
      isActive: true,
      createdAt: now,
      updatedAt: now
    });
  }

  saveDatabaseToDisk();
  return dbCache;
}

/**
 * Atomically writes database to disk
 */
export function saveDatabaseToDisk(): void {
  if (!dbCache) return;
  try {
    ensureDataDirectory();
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(dbCache, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('[DB] Failed to save database to disk:', err);
  }
}

/**
 * Returns current database cache
 */
export function getDatabase(): BackendDatabase {
  if (!dbCache) {
    throw new Error('Database not initialized yet');
  }
  return dbCache;
}

/**
 * Finds user by username or email
 */
export function findUserByCredential(identifier: string): DBUser | undefined {
  const db = getDatabase();
  const clean = identifier.trim().toLowerCase().replace(/^@/, '');
  return db.users.find(
    u => u.username.toLowerCase() === clean || u.email.toLowerCase() === clean
  );
}

/**
 * Finds user by ID
 */
export function findUserById(id: string): DBUser | undefined {
  const db = getDatabase();
  return db.users.find(u => u.id === id);
}

/**
 * Returns sanitized user object (without passwordHash)
 */
export function sanitizeUser(user: DBUser): AdminUser {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    role: normalizeRole(user.role),
    avatar: user.avatar,
    title: user.title,
    passwordHash: '***',
    salt: '***',
    isActive: user.isActive,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin
  };
}
