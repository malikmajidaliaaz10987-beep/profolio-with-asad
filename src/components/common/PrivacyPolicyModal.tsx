import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieContext';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const PrivacyPolicyModal: React.FC = () => {
  const { isPrivacyPolicyOpen, closePrivacyPolicy, openPreferencesModal } = useCookieConsent();

  useEffect(() => {
    if (!isPrivacyPolicyOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePrivacyPolicy();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPrivacyPolicyOpen, closePrivacyPolicy]);

  if (!isPrivacyPolicyOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#17243A] border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-white max-h-[85vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#16B89A]" />
            <h3 id="privacy-policy-title" className="text-lg font-bold text-white">
              Privacy Policy &amp; Cookie Policy
            </h3>
          </div>
          <button
            type="button"
            onClick={closePrivacyPolicy}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close privacy policy"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="my-6 space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong>Last Updated: November 2026</strong>
          </p>
          <p>
            This policy explains how <strong>Asad Ali Awan</strong> collects, processes, and protects inquiry details and cookie preferences on this website.
          </p>

          <h4 className="text-sm font-bold text-white pt-2">1. Lead Form Information Collected</h4>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Contact details: Full Name, Email Address, Phone / WhatsApp Number (if provided), Company Name, and Country.</li>
            <li>Project details: Selected service, optional budget range, timeline, and project message.</li>
            <li>Consent record and submission timestamp.</li>
          </ul>

          <h4 className="text-sm font-bold text-white pt-2">2. How Data Is Used</h4>
          <p>
            Submitted inquiry data is used strictly to review your request, send an automatic confirmation receipt, and respond with a tailored proposal or consultation. Personal information is never sold or shared with third-party data brokers.
          </p>

          <h4 className="text-sm font-bold text-white pt-2">3. Cookie Categories &amp; Consent</h4>
          <p>
            Only <strong>Essential Cookies</strong> run automatically for core security and preference storage. <strong>Analytics Cookies</strong>, <strong>Marketing Cookies</strong>, and <strong>Functional Cookies</strong> remain blocked until you explicitly opt in.
          </p>

          <h4 className="text-sm font-bold text-white pt-2">4. Your Rights</h4>
          <p>
            You may request access, correction, or deletion of your inquiry data at any time by emailing{' '}
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#1769FF] underline">
              {PERSONAL_INFO.email}
            </a>.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                closePrivacyPolicy();
                openPreferencesModal();
              }}
              className="text-xs text-[#1769FF] hover:text-[#3d83ff] transition-colors cursor-pointer"
            >
              Customize Cookie Settings
            </button>
            <Link
              to="/privacy-policy"
              onClick={closePrivacyPolicy}
              className="inline-flex items-center gap-1 text-xs text-[#16B89A] hover:underline"
            >
              <span>Full Policy Page</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <button
            type="button"
            onClick={closePrivacyPolicy}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1769FF] hover:bg-[#1255d4] rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
