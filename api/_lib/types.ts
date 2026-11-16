import type { IncomingMessage, ServerResponse } from 'http';

export interface ApiRequest extends IncomingMessage {
  body?: any;
  query: Record<string, string | string[] | undefined>;
  params?: Record<string, string>;
}

export interface ApiResponse extends ServerResponse {
  status: (code: number) => ApiResponse;
  json: (data: any) => void;
  send: (body: any) => void;
}

export const ALLOWED_LEAD_STATUSES = [
  'New',
  'Contacted',
  'Qualified',
  'Converted',
  'Rejected',
] as const;

export type LeadStatus = (typeof ALLOWED_LEAD_STATUSES)[number];

export interface LeadRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  country: string;
  website: string;
  service: string;
  budget: string;
  timeline: string;
  projectDescription: string;
  contactPreference: 'Email' | 'WhatsApp';
  privacyConsent: boolean;
  consentTimestamp: string;
  submissionTimestamp: string;
  leadStatus: LeadStatus;
  adminNotes: string;
  source: string;
  adminEmailSent: boolean;
  customerEmailSent: boolean;
  updatedAt: string;
}

export function getClientIp(req: ApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].split(',')[0].trim();
  }
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

export async function readRequestBody(req: ApiRequest): Promise<Record<string, any>> {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') {
      try {
        const parsed = JSON.parse(req.body);
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch {
        return {};
      }
    }
    if (Buffer.isBuffer(req.body)) {
      try {
        const parsed = JSON.parse(req.body.toString('utf8'));
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch {
        return {};
      }
    }
    if (typeof req.body === 'object') {
      return req.body;
    }
    return {};
  }

  // Fallback: read raw stream if req.body was not pre-parsed by middleware
  if (req.readableEnded) return {};

  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer | string) => {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    });
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8').trim();
        if (!raw) return resolve({});
        const parsed = JSON.parse(raw);
        resolve(parsed && typeof parsed === 'object' ? parsed : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

export function getQueryString(
  query: Record<string, string | string[] | undefined> | undefined,
  key: string
): string | undefined {
  if (!query) return undefined;
  const value = query[key];
  if (Array.isArray(value)) return value[0];
  return typeof value === 'string' ? value : undefined;
}
