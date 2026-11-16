import path from 'path';
import fs from 'fs';
import os from 'os';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { LeadRecord } from './types.js';

let cachedSupabase: SupabaseClient | null | undefined;
let resolvedLeadsFile: string | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedSupabase !== undefined) {
    return cachedSupabase;
  }

  const url = (process.env.SUPABASE_URL || '').trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

  if (url && key) {
    try {
      cachedSupabase = createClient(url, key);
      return cachedSupabase;
    } catch (err) {
      console.warn('[Supabase] Client initialization warning:', err);
    }
  }

  cachedSupabase = null;
  return null;
}

function getLocalLeadsFilePath(): string {
  if (resolvedLeadsFile) return resolvedLeadsFile;

  const projectDataDir = path.resolve(process.cwd(), 'data');
  const projectLeadsFile = path.join(projectDataDir, 'leads.json');

  try {
    if (!fs.existsSync(projectDataDir)) {
      fs.mkdirSync(projectDataDir, { recursive: true });
    }
    if (!fs.existsSync(projectLeadsFile)) {
      fs.writeFileSync(projectLeadsFile, JSON.stringify([], null, 2), 'utf-8');
    } else {
      fs.accessSync(projectLeadsFile, fs.constants.W_OK);
    }
    resolvedLeadsFile = projectLeadsFile;
    return resolvedLeadsFile;
  } catch {
    // Vercel serverless runtime has a read-only filesystem except os.tmpdir() (/tmp)
    const tmpFile = path.join(os.tmpdir(), 'asad_portfolio_leads.json');
    try {
      if (!fs.existsSync(tmpFile)) {
        fs.writeFileSync(tmpFile, JSON.stringify([], null, 2), 'utf-8');
      }
    } catch {
      // Ignore if /tmp initialization hits an edge error
    }
    resolvedLeadsFile = tmpFile;
    return resolvedLeadsFile;
  }
}

export function readLocalLeads(): LeadRecord[] {
  try {
    const filePath = getLocalLeadsFilePath();
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeLocalLeads(leads: LeadRecord[]): boolean {
  try {
    const filePath = getLocalLeadsFilePath();
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.warn('[Local Storage] Unable to write leads file:', err);
    return false;
  }
}

export function toSupabaseRow(lead: LeadRecord) {
  return {
    id: lead.id,
    full_name: lead.fullName,
    email: lead.email,
    phone: lead.phone || '',
    business_name: lead.businessName || '',
    country: lead.country,
    website: lead.website || '',
    service: lead.service,
    budget: lead.budget || 'Not Specified',
    timeline: lead.timeline || 'Flexible',
    project_description: lead.projectDescription,
    contact_preference: lead.contactPreference || 'Email',
    privacy_consent: Boolean(lead.privacyConsent),
    consent_timestamp: lead.consentTimestamp,
    submission_timestamp: lead.submissionTimestamp,
    lead_status: lead.leadStatus || 'New',
    admin_notes: lead.adminNotes || '',
    source: lead.source || 'website_form',
    admin_email_sent: Boolean(lead.adminEmailSent),
    customer_email_sent: Boolean(lead.customerEmailSent),
    updated_at: lead.updatedAt || lead.submissionTimestamp,
  };
}

export function fromSupabaseRow(row: any): LeadRecord {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone || '',
    businessName: row.business_name || '',
    country: row.country,
    website: row.website || '',
    service: row.service,
    budget: row.budget || 'Not Specified',
    timeline: row.timeline || 'Flexible',
    projectDescription: row.project_description,
    contactPreference: row.contact_preference === 'WhatsApp' ? 'WhatsApp' : 'Email',
    privacyConsent: Boolean(row.privacy_consent),
    consentTimestamp: row.consent_timestamp,
    submissionTimestamp: row.submission_timestamp,
    leadStatus: row.lead_status || 'New',
    adminNotes: row.admin_notes || '',
    source: row.source || 'website_form',
    adminEmailSent: Boolean(row.admin_email_sent),
    customerEmailSent: Boolean(row.customer_email_sent),
    updatedAt: row.updated_at || row.submission_timestamp,
  };
}

export function filterLeadsList(
  rawLeads: LeadRecord[],
  filters: {
    status?: string;
    country?: string;
    service?: string;
    dateRange?: string;
    search?: string;
  }
) {
  let leads = [...rawLeads];

  if (filters.status && filters.status !== 'All') {
    leads = leads.filter((l) => l.leadStatus === filters.status);
  }

  if (filters.country && filters.country !== 'All') {
    leads = leads.filter((l) => (l.country || '').toLowerCase() === filters.country!.toLowerCase());
  }

  if (filters.service && filters.service !== 'All') {
    leads = leads.filter((l) => (l.service || '').toLowerCase().includes(filters.service!.toLowerCase()));
  }

  if (filters.dateRange && filters.dateRange !== 'all') {
    const now = Date.now();
    let cutoff = 0;
    if (filters.dateRange === 'today') {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      cutoff = startOfDay.getTime();
    } else if (filters.dateRange === '7d') {
      cutoff = now - 7 * 24 * 60 * 60 * 1000;
    } else if (filters.dateRange === '30d') {
      cutoff = now - 30 * 24 * 60 * 60 * 1000;
    }
    if (cutoff > 0) {
      leads = leads.filter((l) => new Date(l.submissionTimestamp).getTime() >= cutoff);
    }
  }

  if (filters.search && filters.search.trim()) {
    const q = filters.search.trim().toLowerCase();
    leads = leads.filter(
      (l) =>
        (l.fullName || '').toLowerCase().includes(q) ||
        (l.email || '').toLowerCase().includes(q) ||
        (l.phone || '').toLowerCase().includes(q) ||
        (l.businessName && l.businessName.toLowerCase().includes(q)) ||
        (l.projectDescription || '').toLowerCase().includes(q)
    );
  }

  const total = leads.length;
  const newLeads = leads.filter((l) => l.leadStatus === 'New').length;
  const qualified = leads.filter((l) => l.leadStatus === 'Qualified').length;
  const converted = leads.filter((l) => l.leadStatus === 'Converted').length;

  return {
    metrics: { total, newLeads, qualified, converted },
    leads,
  };
}
