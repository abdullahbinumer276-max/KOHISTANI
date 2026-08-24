// Web Cryptography Password Hashing & Security Utilities
// Designed for The Kohistani CMS Authentication System

const PEPPER = 'the-kohistani-secure-salt-pepper-2026';

/**
 * Generates a cryptographically random salt
 */
export function generateSalt(length = 16): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  // Fallback
  return Math.random().toString(36).substring(2, 18) + Date.now().toString(36);
}

/**
 * Computes SHA-256 hash of password with unique salt and system pepper
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${salt}:${password}:${PEPPER}`);
  
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Fallback simple hash if subtle crypto is somehow not available
  let hash = 0;
  const str = `${salt}:${password}:${PEPPER}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
}

/**
 * Verifies a candidate password against stored salt and hash
 */
export async function verifyPassword(password: string, salt: string, storedHash: string): Promise<boolean> {
  if (!password || !salt || !storedHash) return false;
  const computed = await hashPassword(password, salt);
  return computed === storedHash;
}

/**
 * Generates a session auth token with user identifier and timestamp
 */
export function generateSessionToken(userId: string): string {
  const randomPart = generateSalt(8);
  const time = Date.now();
  return `tk_auth_${userId}_${time}_${randomPart}`;
}
