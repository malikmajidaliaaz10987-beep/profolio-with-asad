import React, { useState, useEffect } from 'react';
import {
  Lock,
  Search,
  Download,
  Trash2,
  Globe,
  Mail,
  Phone,
  X,
  LogOut,
  RefreshCw,
  Database,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { parseApiJsonResponse } from '../utils/api';

interface LeadRecord {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  country: string;
  website?: string;
  service: string;
  budget: string;
  timeline: string;
  projectDescription: string;
  contactPreference: string;
  privacyConsent: boolean;
  submissionTimestamp: string;
  leadStatus: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Rejected';
  adminNotes?: string;
  source?: string;
  adminEmailSent?: boolean;
  customerEmailSent?: boolean;
}

interface HealthStatus {
  supabaseConfigured: boolean;
  emailConfigured: boolean;
  resendConfigured: boolean;
  adminEmailConfigured: boolean;
  storageMode: string;
}

export const AdminPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem('asad_admin_token');
  });

  // Login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [metrics, setMetrics] = useState({ total: 0, newLeads: 0, qualified: 0, converted: 0 });
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [dateRangeFilter, setDateRangeFilter] = useState('all');

  // Selected Lead Modal State
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [statusDraft, setStatusDraft] = useState<string>('New');
  const [notesDraft, setNotesDraft] = useState<string>('');
  const [isUpdatingLead, setIsUpdatingLead] = useState(false);

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await parseApiJsonResponse(res);
        setHealth(data);
      }
    } catch {
      // ignore
    }
  };

  const fetchLeads = async (authToken: string) => {
    setIsLoadingLeads(true);
    setFetchError('');
    try {
      const url = new URL('/api/admin/leads', window.location.origin);
      if (statusFilter !== 'All') url.searchParams.append('status', statusFilter);
      if (countryFilter !== 'All') url.searchParams.append('country', countryFilter);
      if (serviceFilter !== 'All') url.searchParams.append('service', serviceFilter);
      if (dateRangeFilter !== 'all') url.searchParams.append('dateRange', dateRangeFilter);
      if (searchTerm.trim()) url.searchParams.append('search', searchTerm.trim());

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.status === 401 || res.status === 403) {
        handleLogout();
        throw new Error('Session expired. Please log in again.');
      }

      const data = await parseApiJsonResponse(res);
      if (!res.ok) {
        throw new Error(data.error || 'Failed to load leads from backend.');
      }
      setLeads(data.leads || []);
      setMetrics(data.metrics || { total: 0, newLeads: 0, qualified: 0, converted: 0 });
    } catch (err: any) {
      setFetchError(err.message || 'Failed to load leads from backend.');
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchLeads(token);
      fetchHealth();
    }
  }, [token, statusFilter, countryFilter, serviceFilter, dateRangeFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await parseApiJsonResponse(res);

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      sessionStorage.setItem('asad_admin_token', data.token);
      setToken(data.token);
      setPasswordInput('');
    } catch (err: any) {
      setLoginError(err.message || 'Invalid password.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('asad_admin_token');
    setToken(null);
    setLeads([]);
  };

  const handleOpenLead = (lead: LeadRecord) => {
    setSelectedLead(lead);
    setStatusDraft(lead.leadStatus);
    setNotesDraft(lead.adminNotes || '');
  };

  const handleSaveLeadDetails = async () => {
    if (!selectedLead || !token) return;
    setIsUpdatingLead(true);

    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadStatus: statusDraft,
          adminNotes: notesDraft,
        }),
      });

      if (res.ok) {
        const updated = await parseApiJsonResponse(res);
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? updated.lead : l))
        );
        setSelectedLead(updated.lead);
        fetchLeads(token);
      }
    } catch (err) {
      console.error('Update lead error:', err);
    } finally {
      setIsUpdatingLead(false);
    }
  };

  const handleDeleteLead = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm('Are you certain you want to permanently delete this lead?')) return;
    if (!token) return;

    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        if (selectedLead?.id === id) setSelectedLead(null);
        fetchLeads(token);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleExportCsv = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/export', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `asad_leads_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  return (
    <>
      <SEOHead
        title="Admin Portal — Lead Management | Asad Ali Awan"
        description="Private administrative lead portal for Asad Ali Awan."
        path="/admin"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* If not authenticated: Show Login */}
        {!token ? (
          <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-[#17243A] border border-slate-700/80 shadow-2xl text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1769FF]/10 border border-[#1769FF]/20 flex items-center justify-center text-[#1769FF]">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h1 className="text-xl font-bold text-white tracking-tight">
                Private Admin Lead Portal
              </h1>
              <p className="text-xs text-slate-400">
                Authorized access for Asad Ali Awan only.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Administrator Password
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter administrator password..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#1769FF]"
                />
                <p className="mt-1.5 text-[10px] text-slate-400">
                  Default dev password: <code className="text-[#16B89A]">asad_admin_2026</code> (configured via <code>ADMIN_PASSWORD</code> env variable)
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] active:scale-95 text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {isLoggingIn ? 'Verifying Credentials...' : 'Authenticate & Enter'}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-8">
            
            {/* Top Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[#16B89A] tracking-wider uppercase font-mono">
                    Protected Dashboard
                  </span>
                  {health && (
                    <>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                        <Database className="w-3 h-3 text-[#1769FF]" />
                        DB: {health.supabaseConfigured ? 'Supabase PostgreSQL' : 'Local JSON Fallback'}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded border ${
                          health.emailConfigured
                            ? 'bg-emerald-500/10 text-[#16B89A] border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        <Mail className="w-3 h-3" />
                        {health.emailConfigured
                          ? 'Resend Email Active'
                          : 'Email Setup Needed (RESEND_API_KEY / ADMIN_EMAIL)'}
                      </span>
                    </>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Lead Generation &amp; Inquiries Management
                </h1>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    fetchLeads(token);
                    fetchHealth();
                  }}
                  disabled={isLoadingLeads}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                  title="Refresh leads"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingLeads ? 'animate-spin' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#16B89A]" />
                  <span>Export CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs font-medium border border-rose-800/60 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {fetchError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{fetchError}</span>
              </div>
            )}

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#17243A]/40 border border-slate-800">
                <span className="text-xs text-slate-400">Total Leads Received</span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                  {metrics.total}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#17243A]/40 border border-slate-800">
                <span className="text-xs text-slate-400">New Inquiries</span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#1769FF] mt-1">
                  {metrics.newLeads}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#17243A]/40 border border-slate-800">
                <span className="text-xs text-slate-400">Qualified Prospects</span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#16B89A] mt-1">
                  {metrics.qualified}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#17243A]/40 border border-slate-800">
                <span className="text-xs text-slate-400">Converted Clients</span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-purple-400 mt-1">
                  {metrics.converted}
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="p-4 rounded-2xl bg-[#17243A]/30 border border-slate-800 flex flex-col lg:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') fetchLeads(token);
                  }}
                  placeholder="Search by name, email, phone, company or keyword..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#1769FF]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  aria-label="Filter by status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Converted">Converted</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <select
                  aria-label="Filter by date range"
                  value={dateRangeFilter}
                  onChange={(e) => setDateRangeFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>

                <select
                  aria-label="Filter by country"
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="All">All Countries</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="United Arab Emirates">UAE</option>
                </select>

                <select
                  aria-label="Filter by service"
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="All">All Services</option>
                  <option value="Website Development">Website Development</option>
                  <option value="AI Chatbot">AI Chatbot Development</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="AI Image">AI Image Generation</option>
                  <option value="AI Video">AI Video Generation</option>
                  <option value="SEO">SEO Services</option>
                  <option value="Social Media">Social Media Marketing</option>
                  <option value="Meta Ads">Meta Ads</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="TikTok Ads">TikTok Ads</option>
                  <option value="Business Growth">Business Growth Strategy</option>
                </select>
              </div>
            </div>

            {/* Leads Table */}
            <div className="rounded-2xl border border-slate-800 bg-[#17243A]/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#17243A] text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Client Name &amp; Contact</th>
                      <th className="py-3 px-4">Phone / WhatsApp</th>
                      <th className="py-3 px-4">Country</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Budget</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400">
                          {isLoadingLeads ? 'Loading lead records...' : 'No inquiries match current filters.'}
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead) => (
                        <tr
                          key={lead.id}
                          onClick={() => handleOpenLead(lead)}
                          className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{lead.fullName}</div>
                            <div className="text-[11px] text-slate-400">{lead.email}</div>
                            {lead.businessName && (
                              <div className="text-[10px] text-slate-400">{lead.businessName}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap text-slate-300">
                            {lead.phone ? (
                              <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                                <Phone className="w-3 h-3 text-[#16B89A]" />
                                {lead.phone}
                              </span>
                            ) : (
                              <span className="text-slate-500">—</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="flex items-center gap-1">
                              <Globe className="w-3.5 h-3.5 text-slate-400" />
                              {lead.country}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-200">
                            {lead.service}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[#16B89A] whitespace-nowrap">
                            {lead.budget}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                                lead.leadStatus === 'New'
                                  ? 'bg-[#1769FF]/20 text-[#1769FF] border border-[#1769FF]/30'
                                  : lead.leadStatus === 'Qualified'
                                  ? 'bg-emerald-500/20 text-[#16B89A] border border-emerald-500/30'
                                  : lead.leadStatus === 'Converted'
                                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                  : lead.leadStatus === 'Rejected'
                                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                  : 'bg-slate-700/40 text-slate-300 border border-slate-600/40'
                              }`}
                            >
                              {lead.leadStatus}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                            {new Date(lead.submissionTimestamp).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={(e) => handleDeleteLead(lead.id, e)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Selected Lead Drawer / Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-[#17243A] border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Lead ID: {selectedLead.id} · {new Date(selectedLead.submissionTimestamp).toLocaleString()}
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedLead.fullName}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                  aria-label="Close lead details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px]">Email Address</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-[#1769FF] font-semibold break-all">
                    {selectedLead.email}
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px]">Phone / WhatsApp Number</span>
                  {selectedLead.phone ? (
                    <a href={`tel:${selectedLead.phone}`} className="text-[#16B89A] font-semibold font-mono">
                      {selectedLead.phone}
                    </a>
                  ) : (
                    <div className="text-slate-400">Not provided</div>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px]">Company &amp; Country</span>
                  <div className="text-white font-semibold">
                    {selectedLead.businessName ? `${selectedLead.businessName} · ` : ''}
                    {selectedLead.country} ({selectedLead.contactPreference})
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px]">Service &amp; Budget</span>
                  <div className="text-[#16B89A] font-semibold">
                    {selectedLead.service} · {selectedLead.budget}
                  </div>
                </div>
              </div>

              {/* Email Delivery Status */}
              <div className="flex flex-wrap items-center gap-3 text-[11px]">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${selectedLead.adminEmailSent ? 'text-[#16B89A]' : 'text-slate-500'}`} />
                  Admin Notification: {selectedLead.adminEmailSent ? 'Sent' : 'Not Sent'}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${selectedLead.customerEmailSent ? 'text-[#16B89A]' : 'text-slate-500'}`} />
                  Customer Confirmation: {selectedLead.customerEmailSent ? 'Sent' : 'Not Sent'}
                </span>
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                  Project Details / Message
                </span>
                <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedLead.projectDescription}
                </p>
              </div>

              {/* Status Update & Private Admin Notes */}
              <div className="space-y-4 pt-2 border-t border-slate-700 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    Update Lead Pipeline Status
                  </label>
                  <select
                    value={statusDraft}
                    onChange={(e) => setStatusDraft(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Converted">Converted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    Private Admin Notes (Visible only to you)
                  </label>
                  <textarea
                    rows={3}
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    placeholder="Add internal notes on follow-up, pricing discussion, or client communication..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 resize-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDeleteLead(selectedLead.id)}
                  className="text-xs text-rose-400 hover:text-rose-300 inline-flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Lead</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedLead(null)}
                    className="px-4 py-2 text-xs bg-slate-800 rounded-lg text-slate-300 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveLeadDetails}
                    disabled={isUpdatingLead}
                    className="px-5 py-2 text-xs font-semibold bg-[#1769FF] hover:bg-[#1255d4] rounded-lg text-white cursor-pointer"
                  >
                    {isUpdatingLead ? 'Saving...' : 'Save Updates'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
};
