import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, SlidersHorizontal, Check, X } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieContext';

export const CookieConsent: React.FC = () => {
  const { isBannerOpen, acceptAll, rejectOptional, openPreferencesModal } = useCookieConsent();

  if (!isBannerOpen) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-[#17243A]/95 backdrop-blur-md border-t border-slate-700/80 shadow-2xl shadow-black/60 text-white animate-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Text Area */}
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#16B89A]" />
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Cookie &amp; Privacy Notice
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We use cookies to improve your browsing experience, analyze website traffic, and enhance our services. Optional cookies remain disabled until you choose your preferences. Review our{' '}
            <Link
              to="/privacy-policy"
              className="text-[#1769FF] underline hover:text-[#3d83ff] transition-colors"
            >
              Privacy &amp; Cookie Policy
            </Link>
            .
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0">
          <button
            type="button"
            onClick={acceptAll}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] active:scale-95 text-white text-xs font-semibold transition-colors shadow-md shadow-[#1769FF]/25 cursor-pointer whitespace-nowrap"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accept All</span>
          </button>

          <button
            type="button"
            onClick={rejectOptional}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white text-xs font-medium border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reject Optional Cookies</span>
          </button>

          <button
            type="button"
            onClick={openPreferencesModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#16B89A]" />
            <span>Customize Settings</span>
          </button>
        </div>

      </div>
    </div>
  );
};
