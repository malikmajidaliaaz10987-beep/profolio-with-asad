import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, SlidersHorizontal, Lock, Mail, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { useCookieConsent } from '../context/CookieContext';
import { PERSONAL_INFO } from '../data/portfolioData';

export const PrivacyPolicyPage: React.FC = () => {
  const { preferences, hasDecided, openPreferencesModal, acceptAll, rejectOptional } = useCookieConsent();

  const cookieCategories = [
    {
      name: 'Essential Cookies',
      status: 'Always Active',
      allowed: true,
      purpose: 'Maintains core site navigation, theme preference (Dark/Light), spam-protection timestamps, and your cookie consent choice.',
      retention: 'Persistent / Local Storage',
    },
    {
      name: 'Analytics Cookies',
      status: preferences.analytics ? 'Enabled' : 'Disabled',
      allowed: preferences.analytics,
      purpose: 'Measures aggregated page traffic and engagement metrics so site speed and content quality can be improved.',
      retention: 'Activated only after explicit opt-in',
    },
    {
      name: 'Marketing Cookies',
      status: preferences.marketing ? 'Enabled' : 'Disabled',
      allowed: preferences.marketing,
      purpose: 'Supports campaign attribution across Google Ads and Meta Ads when measuring marketing effectiveness.',
      retention: 'Activated only after explicit opt-in',
    },
    {
      name: 'Functional Cookies',
      status: preferences.functional ? 'Enabled' : 'Disabled',
      allowed: preferences.functional,
      purpose: 'Remembers optional convenience preferences such as assistant interaction state and interactive showcase settings.',
      retention: 'Activated only after explicit opt-in',
    },
  ];

  return (
    <>
      <SEOHead
        title="Privacy Policy & Cookie Policy — Asad Ali Awan"
        description="Read the Privacy Policy, GDPR data handling practices, and Cookie Policy for Asad Ali Awan."
        path="/privacy-policy"
        keywords={['Privacy Policy', 'Cookie Policy', 'GDPR Compliance', 'Asad Ali Awan']}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#16B89A] tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Legal &amp; Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Privacy Policy &amp; Cookie Policy
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            This policy explains how personal inquiry details and browser cookies are collected, stored, and protected across this website operated by <strong>Asad Ali Awan</strong>.
          </p>
          <p className="text-xs text-slate-400 font-mono">
            Policy Version: {preferences.policyVersion} · Last Updated: November 2026
          </p>
        </header>

        {/* Live Cookie Consent Controls */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#17243A]/60 border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white">Your Current Cookie Preferences</h2>
              <p className="text-xs text-slate-400">
                {hasDecided && preferences.consentTimestamp
                  ? `Last updated on ${new Date(preferences.consentTimestamp).toLocaleString()}`
                  : 'You have not opted into any optional cookies. Only Essential Cookies are currently active.'}
              </p>
            </div>
            <button
              type="button"
              onClick={openPreferencesModal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Manage Cookie Preferences</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cookieCategories.map((cat) => (
              <div
                key={cat.name}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white">{cat.name}</span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-mono ${
                      cat.allowed ? 'text-[#16B89A]' : 'text-slate-400'
                    }`}
                  >
                    {cat.allowed ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5" />
                    )}
                    {cat.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{cat.purpose}</p>
                <p className="text-[11px] text-slate-400 font-mono">{cat.retention}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={acceptAll}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white border border-slate-700 transition-colors cursor-pointer"
            >
              Accept All Cookies
            </button>
            <button
              type="button"
              onClick={rejectOptional}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            >
              Reject Optional Cookies
            </button>
          </div>
        </section>

        {/* Detailed Policy Sections */}
        <section className="space-y-8 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#1769FF]" />
              <span>1. Information Collected Through Lead Forms</span>
            </h2>
            <p>
              When you submit a project inquiry through our website or assistant, we collect only the details you voluntarily provide:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300 text-xs sm:text-sm">
              <li>Identity &amp; contact fields: Full Name, Email Address, Phone / WhatsApp Number, Company Name, and Country.</li>
              <li>Project scope fields: Service Interested In, optional Project Budget, Project Timeline, Website URL, and Project Details / Message.</li>
              <li>Verification metadata: Consent confirmation, submission timestamp, and automated anti-spam validation signals.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Purpose &amp; Legal Basis of Processing</h2>
            <p>
              Inquiry information is processed exclusively on the basis of your explicit consent and legitimate commercial interest to evaluate your project brief, send an automated acknowledgment email, and communicate regarding requested services. We never sell, rent, or trade your personal information with third-party data brokers.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Security, Storage &amp; Email Delivery</h2>
            <p>
              Submitted leads are transmitted over HTTPS and stored in a protected database protected by server-side authentication and row-level security policies. All email notifications are processed strictly on the server so API credentials and administrative addresses are never exposed in client-side code.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. GDPR &amp; International Data Rights</h2>
            <p>
              Depending on your jurisdiction (including the UK, EU/EEA, Canada, Australia, and US privacy frameworks), you retain the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300 text-xs sm:text-sm">
              <li>Request access to a copy of the inquiry records associated with your email address.</li>
              <li>Request correction of inaccurate contact or project details.</li>
              <li>Request permanent deletion of your inquiry record from our lead database.</li>
              <li>Withdraw consent for optional cookies at any time using the Cookie Settings control in the footer or above.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#16B89A]" />
              <span>Privacy Inquiries &amp; Data Deletion Requests</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              To exercise any privacy right or request removal of submitted inquiry details, contact{' '}
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#1769FF] underline font-medium">
                {PERSONAL_INFO.email}
              </a>.
            </p>
            <div className="pt-1">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16B89A] hover:underline"
              >
                <span>Return to Contact Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};
