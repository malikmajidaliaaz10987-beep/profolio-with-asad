import React, { createContext, useContext, useEffect, useState } from 'react';

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing' | 'functional';

export interface CookiePreferences {
  necessary: boolean; // always true
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  consentTimestamp: string | null;
  policyVersion: string;
}

interface CookieContextType {
  preferences: CookiePreferences;
  hasDecided: boolean;
  isBannerOpen: boolean;
  isPreferencesModalOpen: boolean;
  isPrivacyPolicyOpen: boolean;
  acceptAll: () => void;
  rejectOptional: () => void;
  saveCustomPreferences: (prefs: { analytics: boolean; marketing: boolean; functional: boolean }) => void;
  resetConsent: () => void;
  hasConsentFor: (category: ConsentCategory) => boolean;
  openPreferencesModal: () => void;
  closePreferencesModal: () => void;
  openPrivacyPolicy: () => void;
  closePrivacyPolicy: () => void;
}

declare global {
  interface Window {
    __COOKIE_CONSENT__?: CookiePreferences;
  }
}

const COOKIE_STORAGE_KEY = 'asad_cookie_consent_v1';
const POLICY_VERSION = '1.1.0';

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
  consentTimestamp: null,
  policyVersion: POLICY_VERSION,
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

/**
 * Utility helper so optional third-party scripts only initialize when explicit consent exists.
 */
export function runIfConsented(category: ConsentCategory, callback: () => void): boolean {
  if (typeof window === 'undefined') return false;
  if (category === 'necessary') {
    callback();
    return true;
  }
  const consent = window.__COOKIE_CONSENT__;
  if (consent && consent[category] === true) {
    callback();
    return true;
  }
  return false;
}

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return { ...DEFAULT_PREFERENCES, ...parsed, necessary: true };
        } catch {
          // ignore malformed storage
        }
      }
    }
    return DEFAULT_PREFERENCES;
  });

  const [hasDecided, setHasDecided] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(COOKIE_STORAGE_KEY);
    }
    return false;
  });

  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  useEffect(() => {
    if (!hasDecided) {
      const timer = setTimeout(() => setIsBannerOpen(true), 450);
      return () => clearTimeout(timer);
    }
  }, [hasDecided]);

  // Synchronize global consent guard so no optional scripts run before explicit opt-in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__COOKIE_CONSENT__ = preferences;
      window.dispatchEvent(
        new CustomEvent('cookie-consent-changed', { detail: preferences })
      );
    }
  }, [preferences]);

  const persist = (updated: CookiePreferences) => {
    setPreferences(updated);
    setHasDecided(true);
    setIsBannerOpen(false);
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(updated));
  };

  const acceptAll = () => {
    persist({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      consentTimestamp: new Date().toISOString(),
      policyVersion: POLICY_VERSION,
    });
  };

  const rejectOptional = () => {
    persist({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      consentTimestamp: new Date().toISOString(),
      policyVersion: POLICY_VERSION,
    });
  };

  const saveCustomPreferences = (custom: { analytics: boolean; marketing: boolean; functional: boolean }) => {
    persist({
      necessary: true,
      analytics: custom.analytics,
      marketing: custom.marketing,
      functional: custom.functional,
      consentTimestamp: new Date().toISOString(),
      policyVersion: POLICY_VERSION,
    });
    setIsPreferencesModalOpen(false);
  };

  const resetConsent = () => {
    localStorage.removeItem(COOKIE_STORAGE_KEY);
    setPreferences(DEFAULT_PREFERENCES);
    setHasDecided(false);
    setIsBannerOpen(true);
  };

  const hasConsentFor = (category: ConsentCategory): boolean => {
    if (category === 'necessary') return true;
    return hasDecided && preferences[category] === true;
  };

  const openPreferencesModal = () => setIsPreferencesModalOpen(true);
  const closePreferencesModal = () => setIsPreferencesModalOpen(false);

  const openPrivacyPolicy = () => setIsPrivacyPolicyOpen(true);
  const closePrivacyPolicy = () => setIsPrivacyPolicyOpen(false);

  return (
    <CookieContext.Provider
      value={{
        preferences,
        hasDecided,
        isBannerOpen,
        isPreferencesModalOpen,
        isPrivacyPolicyOpen,
        acceptAll,
        rejectOptional,
        saveCustomPreferences,
        resetConsent,
        hasConsentFor,
        openPreferencesModal,
        closePreferencesModal,
        openPrivacyPolicy,
        closePrivacyPolicy,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookieConsent = (): CookieContextType => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
};
