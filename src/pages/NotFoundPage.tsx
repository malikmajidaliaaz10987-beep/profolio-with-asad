import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, MessageSquare } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="404 — Page Not Found | Asad Ali Awan"
        description="The requested page could not be found. Return to Asad Ali Awan's portfolio homepage."
        path="/404"
      />

      <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
        <div className="inline-block font-mono text-xs font-semibold px-3 py-1 rounded-full bg-[#1769FF]/10 text-[#1769FF] border border-[#1769FF]/20">
          Error 404 · Page Not Found
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          The requested page does not exist.
        </h1>

        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          The link you followed may be broken or the page may have been moved. You can navigate back to the home page or get in touch directly.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] text-white text-xs font-semibold transition-colors shadow-md shadow-[#1769FF]/20"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Asad</span>
          </Link>
        </div>
      </div>
    </>
  );
};
