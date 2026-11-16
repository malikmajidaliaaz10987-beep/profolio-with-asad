import crypto from 'crypto';
import type { ApiRequest, ApiResponse } from './types.js';

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
export const MAX_LEAD_SUBMISSIONS_PER_HOUR = 15;
export const MAX_CHAT_MESSAGES_PER_HOUR = 60;
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export const leadIpCounts = new Map<string, { count: number; resetTime: number }>();
export const chatIpCounts = new Map<string, { count: number; resetTime: number }>();
const recentLeadHashes = new Map<string, number>();

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'asad_admin_2026';
}

function getSigningSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    `${getAdminPassword()}_asad_portfolio_hmac_key_v1`
  );
}

export function createAdminToken(): string {
  const payload = {
    role: 'admin',
    iat: Date.now(),
    exp: Date.now() + TOKEN_TTL_MS,
    nonce: crypto.randomBytes(8).toString('hex'),
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSigningSecret())
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminTokenValue(token: string): boolean {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [encodedPayload, providedSig] = parts;
  if (!encodedPayload || !providedSig) return false;

  const expectedSig = crypto
    .createHmac('sha256', getSigningSecret())
    .update(encodedPayload)
    .digest('base64url');

  const providedBuf = Buffer.from(providedSig, 'utf8');
  const expectedBuf = Buffer.from(expectedSig, 'utf8');
  if (providedBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(providedBuf, expectedBuf)) return false;

  try {
    const decoded = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    if (!decoded || decoded.role !== 'admin') return false;
    if (typeof decoded.exp !== 'number' || Date.now() > decoded.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export function authenticateAdminRequest(req: ApiRequest, res: ApiResponse): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Admin authentication token required' });
    return false;
  }

  const token = authHeader.slice(7).trim();
  if (!verifyAdminTokenValue(token)) {
    res.status(403).json({ error: 'Forbidden: Invalid or expired admin session token' });
    return false;
  }

  return true;
}

export function checkRateLimit(
  map: Map<string, { count: number; resetTime: number }>,
  ip: string,
  maxRequests: number
): boolean {
  const now = Date.now();
  const record = map.get(ip);
  if (!record || now > record.resetTime) {
    map.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (record.count >= maxRequests) {
    return false;
  }
  record.count += 1;
  return true;
}

export function buildLeadFingerprint(email: string, service: string, description: string): string {
  return crypto
    .createHash('sha256')
    .update(
      `${email.trim().toLowerCase()}|${service.trim().toLowerCase()}|${description.trim().toLowerCase()}`
    )
    .digest('hex');
}

export function isDuplicateSubmission(fingerprint: string): boolean {
  const now = Date.now();
  for (const [key, timestamp] of recentLeadHashes.entries()) {
    if (now - timestamp > DUPLICATE_WINDOW_MS) {
      recentLeadHashes.delete(key);
    }
  }
  const existing = recentLeadHashes.get(fingerprint);
  if (existing && now - existing <= DUPLICATE_WINDOW_MS) {
    return true;
  }
  recentLeadHashes.set(fingerprint, now);
  return false;
}
