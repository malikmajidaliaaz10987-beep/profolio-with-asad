import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ProfileProvider } from './context/ProfileContext';
import { CookieProvider } from './context/CookieContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/common/BackToTop';
import { HireMeModal } from './components/common/HireMeModal';
import { CookieConsent } from './components/common/CookieConsent';
import { CookiePreferencesModal } from './components/common/CookiePreferencesModal';
import { PrivacyPolicyModal } from './components/common/PrivacyPolicyModal';
import { ChatbotWidget } from './components/common/ChatbotWidget';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { SkillsPage } from './pages/SkillsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll restoration helper (supports smooth scroll to #lead-form)
const ScrollToTopOnNav: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <CookieProvider>
          <BrowserRouter>
            <ScrollToTopOnNav />
            <div className="min-h-screen flex flex-col bg-[#101827] text-white selection:bg-[#1769FF] selection:text-white transition-colors duration-200">
              
              {/* Sticky 3-zone Top Bar */}
              <Navbar />

              {/* Main Page Content */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/skills" element={<SkillsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/cookie-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>

              {/* Authoritative Footer */}
              <Footer />

              {/* Interactive Global Modals & System Widgets */}
              <BackToTop />
              <ChatbotWidget />
              <HireMeModal />
              <CookieConsent />
              <CookiePreferencesModal />
              <PrivacyPolicyModal />
            </div>
          </BrowserRouter>
        </CookieProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}
