import React, { useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Globe, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight, 
  Linkedin, 
  Github,
  Trash2,
  Inbox
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useProfile } from '../context/ProfileContext';
import { SEOHead } from '../components/common/SEOHead';
import { LeadForm } from '../components/common/LeadForm';

export const ContactPage: React.FC = () => {
  const { availabilityStatus, inquiries, deleteInquiry, selectedServiceForInquiry } = useProfile();
  const [showInquiryDrawer, setShowInquiryDrawer] = useState(false);

  return (
    <>
      <SEOHead
        title="Contact Asad Ali Awan — Start Your Project"
        description="Get in touch with Asad Ali Awan for digital marketing, SEO, Google & Meta Ads, website development, or AI solutions. Serving US, UK, Canada & global clients."
        path="/contact"
        keywords={[
          'Contact Asad Ali Awan',
          'Hire Digital Marketing Specialist',
          'Hire SEO Consultant',
          'Hire Website Developer',
          'Direct WhatsApp Contact'
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* ========================================================= */}
        {/* HEADER                                                    */}
        {/* ========================================================= */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#16B89A] tracking-wider uppercase">
            <span>Direct Inquiries</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">International Remote Specialist</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Have a Project in Mind? Let&apos;s Build Something Great Together.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            I work directly with ambitious businesses across the United States, United Kingdom, Canada, Australia, and worldwide. Send your project brief below, or connect directly on WhatsApp or Email.
          </p>
        </div>

        {/* ========================================================= */}
        {/* MAIN TWO-COLUMN CONTACT LAYOUT                            */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Channels & Information */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-7 rounded-2xl bg-[#17243A]/40 border border-slate-800 space-y-6">
              <h2 className="text-lg font-bold text-white">Direct Channels</h2>

              <div className="space-y-4">
                {/* Email Direct */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-[#1769FF]/10 text-[#1769FF] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[11px] text-slate-400 font-medium block">Official Email</span>
                    <span className="text-xs font-semibold text-white group-hover:text-[#1769FF] transition-colors truncate block">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </a>

                {/* WhatsApp Direct */}
                <a
                  href={`https://wa.me/${PERSONAL_INFO.phoneRaw}?text=${encodeURIComponent('Hello Asad, I would like to discuss an international project.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-[#16B89A]/10 text-[#16B89A] shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">Direct WhatsApp</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#16B89A] opacity-70 group-hover:opacity-100" />
                    </div>
                    <span className="text-xs font-semibold text-white group-hover:text-[#16B89A] transition-colors block">
                      {PERSONAL_INFO.phoneDisplay}
                    </span>
                  </div>
                </a>
              </div>

              {/* Availability & Response Times */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Current Status:</span>
                  <span className="text-[#16B89A] font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {availabilityStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Expected Response:</span>
                  <span className="text-slate-200 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Within 12–24 Hours
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Target Timezones:</span>
                  <span className="text-slate-200">US (EST/PST) · UK (GMT) · AU</span>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <span className="text-xs text-slate-400">Professional Links:</span>
                <a
                  href={PERSONAL_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  aria-label="GitHub profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Saved Inquiries Viewer Button */}
            {inquiries.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Inbox className="w-4 h-4 text-[#1769FF]" />
                  <span>{inquiries.length} Inquiries Logged Locally</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInquiryDrawer(!showInquiryDrawer)}
                  className="text-xs font-semibold text-[#1769FF] hover:text-[#3d83ff] transition-colors cursor-pointer"
                >
                  {showInquiryDrawer ? 'Hide Log' : 'Review Inquiries'}
                </button>
              </div>
            )}

            {/* Inquiries Log Drawer */}
            {showInquiryDrawer && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-semibold text-white">Submitted Lead Entries</span>
                  <span className="text-[10px] text-slate-400">Stored in browser localStorage</span>
                </div>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1">
                      <div className="flex items-center justify-between font-semibold text-white">
                        <span>{inq.fullName} ({inq.email})</span>
                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#16B89A]">{inq.projectType} · {inq.budgetRange}</div>
                      <p className="text-[11px] text-slate-300 line-clamp-2">{inq.projectDescription}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Full International Lead Generation Form */}
          <div id="lead-form" className="lg:col-span-7 scroll-mt-24">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#17243A]/40 border border-slate-800/90 shadow-xl">
              <LeadForm initialService={selectedServiceForInquiry} />
            </div>
          </div>

        </div>

      </div>
    </>
  );
};
