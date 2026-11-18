import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface StoredAdminConfig {
  username: string;
  salt: string;
  passwordHash: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const CREDENTIALS_FILE = path.join(DATA_DIR, 'admin-credentials.json');

// Secret used to sign session cookies
const globalStore = globalThis as unknown as {
  __narvia_admin_jwt_secret?: string;
};

if (!globalStore.__narvia_admin_jwt_secret) {
  globalStore.__narvia_admin_jwt_secret =
    process.env.ADMIN_JWT_SECRET || crypto.randomBytes(32).toString('hex');
}

const SECRET_KEY = globalStore.__narvia_admin_jwt_secret;

/**
 * Hash a password using PBKDF2 with SHA-512
 */
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

/**
 * Get active admin credentials (either from data file or env defaults)
 */
export function getAdminCredentials(): { username: string; salt: string; passwordHash: string; isCustom: boolean } {
  try {
    if (fs.existsSync(CREDENTIALS_FILE)) {
      const fileData = fs.readFileSync(CREDENTIALS_FILE, 'utf-8');
      const parsed: StoredAdminConfig = JSON.parse(fileData);
      if (parsed.username && parsed.salt && parsed.passwordHash) {
        return {
          username: parsed.username,
          salt: parsed.salt,
          passwordHash: parsed.passwordHash,
          isCustom: true,
        };
      }
    }
  } catch (err) {
    console.error('Error reading custom admin credentials:', err);
  }

  // Fallback to environment variables or default temp credentials
  const defaultUsername = process.env.ADMIN_USERNAME || 'admin';
  const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const defaultSalt = 'narvia_env_default_salt_2026';
  const defaultHash = hashPassword(defaultPassword, defaultSalt);

  return {
    username: defaultUsername,
    salt: defaultSalt,
    passwordHash: defaultHash,
    isCustom: false,
  };
}

/**
 * Verify provided username and password against current admin credentials
 */
export function verifyAdminCredentials(inputUsername: string, inputPassword: string): boolean {
  const current = getAdminCredentials();
  
  if (inputUsername !== current.username) {
    return false;
  }

  const computedHash = hashPassword(inputPassword, current.salt);
  
  try {
    const a = Buffer.from(computedHash, 'hex');
    const b = Buffer.from(current.passwordHash, 'hex');
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return computedHash === current.passwordHash;
  }
}

/**
 * Update and save new admin credentials to data/admin-credentials.json
 */
export function updateAdminCredentials(newUsername: string, newPassword: string): void {
  const newSalt = crypto.randomBytes(16).toString('hex');
  const newHash = hashPassword(newPassword, newSalt);

  const newConfig: StoredAdminConfig = {
    username: newUsername,
    salt: newSalt,
    passwordHash: newHash,
    updatedAt: new Date().toISOString(),
  };

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(newConfig, null, 2), 'utf-8');
}

/**
 * Generate a signed session token
 */
export function createAdminSessionToken(username: string): string {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const payload = `${username}:${expiresAt}`;
  const hmac = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex');
  return `${payload}:${hmac}`;
}

/**
 * Verify signed session token
 */
export function verifyAdminSessionToken(token: string | undefined | null): { valid: boolean; username?: string } {
  if (!token) return { valid: false };

  const parts = token.split(':');
  if (parts.length !== 3) return { valid: false };

  const [username, expiresAtStr, hmac] = parts;
  const expiresAt = parseInt(expiresAtStr, 10);

  if (isNaN(expiresAt) || Date.now() > expiresAt) {
    return { valid: false };
  }

  const expectedPayload = `${username}:${expiresAtStr}`;
  const expectedHmac = crypto.createHmac('sha256', SECRET_KEY).update(expectedPayload).digest('hex');

  try {
    const a = Buffer.from(hmac, 'hex');
    const b = Buffer.from(expectedHmac, 'hex');
    if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
      return { valid: true, username };
    }
  } catch {
    if (hmac === expectedHmac) {
      return { valid: true, username };
    }
  }

  return { valid: false };
}
