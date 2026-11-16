import React, { useEffect, useState } from 'react';
import { X, Shield, BarChart3, Target, Sparkles, Check } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieContext';

export const CookiePreferencesModal: React.FC = () => {
  const { preferences, isPreferencesModalOpen, closePreferencesModal, saveCustomPreferences } = useCookieConsent();

  const [analytics, setAnalytics] = useState(preferences.analytics);
  const [marketing, setMarketing] = useState(preferences.marketing);
  const [functional, setFunctional] = useState(preferences.functional);

  // Sync draft state whenever modal opens or saved preferences update
  useEffect(() => {
    if (isPreferencesModalOpen) {
      setAnalytics(preferences.analytics);
      setMarketing(preferences.marketing);
      setFunctional(preferences.functional);
    }
  }, [isPreferencesModalOpen, preferences]);

  // Close modal with Escape key
  useEffect(() => {
    if (!isPreferencesModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePreferencesModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreferencesModalOpen, closePreferencesModal]);

  if (!isPreferencesModalOpen) return null;

  const handleSave = () => {
    saveCustomPreferences({ analytics, marketing, functional });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-pref-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-[#17243A] border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
          <div>
            <h3 id="cookie-pref-title" className="text-lg font-bold text-white">
              Customize Cookie Settings
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose which cookie categories you allow on your device. Optional categories remain off by default.
            </p>
          </div>
          <button
            type="button"
            onClick={closePreferencesModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close cookie preferences modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="my-6 space-y-4">
          
          {/* 1. Essential Cookies */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#16B89A]" />
                <span className="text-xs font-bold text-white">Essential Cookies</span>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-[#16B89A] border border-emerald-500/30">
                Always Active
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Required for core site operation, security protection, theme selection, and storing your cookie consent choice. These cannot be disabled.
            </p>
          </div>

          {/* 2. Analytics Cookies */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#1769FF]" />
                <span className="text-xs font-bold text-white">Analytics Cookies</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" aria-label="Toggle Analytics Cookies">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:ring-2 peer-focus:ring-[#1769FF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1769FF]"></div>
              </label>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Helps understand aggregated website traffic, popular service pages, and performance metrics. Blocked until you explicitly opt in.
            </p>
          </div>

          {/* 3. Marketing Cookies */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white">Marketing Cookies</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" aria-label="Toggle Marketing Cookies">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:ring-2 peer-focus:ring-[#1769FF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1769FF]"></div>
              </label>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Supports campaign attribution and advertising measurement across Google and Meta channels. Personal data is never sold to third parties.
            </p>
          </div>

          {/* 4. Functional Cookies */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Functional Cookies</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" aria-label="Toggle Functional Cookies">
                <input
                  type="checkbox"
                  checked={functional}
                  onChange={(e) => setFunctional(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:ring-2 peer-focus:ring-[#1769FF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1769FF]"></div>
              </label>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Enables optional convenience features such as assistant session continuity and interactive demonstration state.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-400 font-mono">
            Policy v{preferences.policyVersion}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closePreferencesModal}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#1769FF] hover:bg-[#1255d4] rounded-lg cursor-pointer transition-colors shadow-md shadow-[#1769FF]/20"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Preferences</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
