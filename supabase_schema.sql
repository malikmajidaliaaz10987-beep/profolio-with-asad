-- Supabase SQL Schema for Asad Ali Awan Lead Generation System
-- Run this script in your Supabase Project -> SQL Editor

CREATE TABLE IF NOT EXISTS public.leads (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  business_name TEXT DEFAULT '',
  country TEXT NOT NULL,
  website TEXT DEFAULT '',
  service TEXT NOT NULL,
  budget TEXT DEFAULT 'Not Specified',
  timeline TEXT DEFAULT 'Flexible',
  project_description TEXT NOT NULL,
  contact_preference TEXT DEFAULT 'Email',
  privacy_consent BOOLEAN NOT NULL DEFAULT FALSE,
  consent_timestamp TIMESTAMPTZ,
  submission_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  lead_status TEXT NOT NULL DEFAULT 'New' CHECK (lead_status IN ('New', 'Contacted', 'Qualified', 'Converted', 'Rejected')),
  admin_notes TEXT DEFAULT '',
  source TEXT DEFAULT 'website_form',
  admin_email_sent BOOLEAN DEFAULT FALSE,
  customer_email_sent BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for fast admin dashboard filtering
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (lead_status);
CREATE INDEX IF NOT EXISTS idx_leads_country ON public.leads (country);
CREATE INDEX IF NOT EXISTS idx_leads_service ON public.leads (service);
CREATE INDEX IF NOT EXISTS idx_leads_submitted_at ON public.leads (submission_timestamp DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Security Policy: Block all anonymous/public SELECT, UPDATE, DELETE access.
-- Only the backend server using SUPABASE_SERVICE_ROLE_KEY bypasses RLS securely.
DROP POLICY IF EXISTS "Deny public read access" ON public.leads;
CREATE POLICY "Deny public read access"
  ON public.leads
  FOR SELECT
  TO anon, authenticated
  USING (false);

DROP POLICY IF EXISTS "Deny public write access" ON public.leads;
CREATE POLICY "Deny public write access"
  ON public.leads
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);
