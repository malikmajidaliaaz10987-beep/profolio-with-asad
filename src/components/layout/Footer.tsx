import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Linkedin, Github, Globe, ArrowUpRight, Lock, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useCookieConsent } from '../../context/CookieContext';

export const Footer: React.FC = () => {
  const { openPreferencesModal, openPrivacyPolicy } = useCookieConsent();

  return (
    <footer className="border-t border-slate-800 bg-[#0c121d] text-slate-400 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Col 1: Identity & Positioning */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="text-xl font-bold tracking-tight text-white hover:text-[#1769FF] transition-colors">
              ASAD ALI AWAN
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
              {PERSONAL_INFO.positioning}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Globe className="w-3.5 h-3.5 text-[#16B89A]" />
                Target Markets: US, UK, Canada, Australia &amp; Global
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Me</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio &amp; Work</Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-white transition-colors">Skills &amp; Tech</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1 text-xs">
                  <Lock className="w-3 h-3" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect & WhatsApp */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Direct Contact
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#1769FF]" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-[#16B89A]" />
                  <span>WhatsApp: {PERSONAL_INFO.phoneDisplay}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li className="pt-2 flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Asad Ali Awan. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={openPreferencesModal}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookie Settings
            </button>
            <span aria-hidden="true">·</span>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <span aria-hidden="true">·</span>
            <a href="/sitemap.xml" className="hover:text-slate-200 transition-colors">
              XML Sitemap
            </a>
            <span aria-hidden="true">·</span>
            <a href="/robots.txt" className="hover:text-slate-200 transition-colors">
              Robots.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
