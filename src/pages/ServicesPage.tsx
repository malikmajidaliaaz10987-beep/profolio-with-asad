import React from 'react';
import { 
  CheckCircle2, 
  ArrowUpRight, 
  Search, 
  MousePointerClick, 
  Share2, 
  Video, 
  Code2, 
  Bot, 
  Sparkles,
  Layers
} from 'lucide-react';
import { INITIAL_SERVICES } from '../data/portfolioData';
import { SEOHead } from '../components/common/SEOHead';
import { useLeadFormNavigation } from '../hooks/useLeadFormNavigation';

export const ServicesPage: React.FC = () => {
  const { scrollToLeadForm } = useLeadFormNavigation();

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'seo':
        return <Search className="w-6 h-6 text-[#1769FF]" />;
      case 'google-ads':
        return <MousePointerClick className="w-6 h-6 text-[#16B89A]" />;
      case 'meta-ads':
        return <Share2 className="w-6 h-6 text-indigo-400" />;
      case 'social-ads':
        return <Video className="w-6 h-6 text-rose-400" />;
      case 'web-dev':
        return <Code2 className="w-6 h-6 text-sky-400" />;
      case 'ai-solutions':
        return <Bot className="w-6 h-6 text-amber-400" />;
      default:
        return <Layers className="w-6 h-6 text-[#1769FF]" />;
    }
  };

  return (
    <>
      <SEOHead
        title="Services — Asad Ali Awan | SEO, Google & Meta Ads, Web Dev, AI"
        description="Comprehensive digital marketing, search engine optimization, Google Ads, Meta Ads, modern website development, and AI solutions for international businesses."
        path="/services"
        keywords={[
          'SEO Services',
          'Google Ads Management',
          'Meta Ads Specialist',
          'Social Media Advertising',
          'Website Development',
          'AI Chatbot Development'
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        
        {/* ========================================================= */}
        {/* HEADER SECTION                                            */}
        {/* ========================================================= */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1769FF] tracking-wider uppercase">
            <span>Specialized Offerings</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Targeted International Execution</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight text-balance">
            Digital Marketing, Performance Advertising &amp; Modern Web Development.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Every service is engineered around business outcomes: search intent, qualified lead generation, lightning-fast load times, and scalable digital architectures.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-400">
            <span>Target Markets: US · UK · Canada · Australia</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#16B89A]">Remote Availability</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SIX DEDICATED SERVICE BLOCKS                              */}
        {/* ========================================================= */}
        <section className="space-y-12">
          {INITIAL_SERVICES.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="p-8 sm:p-10 rounded-3xl bg-[#17243A]/40 border border-slate-800/90 hover:border-slate-700 transition-all duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Overview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center">
                      {getServiceIcon(service.id)}
                    </div>
                    <span className="font-mono text-xs text-slate-400">
                      Service {service.number}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-xs text-[#16B89A] font-medium mt-1">
                      {service.shortDesc}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {service.fullDesc}
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                    <span className="text-slate-400 block text-[11px]">Primary Target:</span>
                    <span className="text-slate-200 font-medium">{service.idealFor}</span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => scrollToLeadForm(service.title)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] text-white text-xs font-semibold cursor-pointer transition-colors shadow-md shadow-[#1769FF]/20"
                    >
                      <span>Request a Quote</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Details: Subservices, Benefits & Deliverables */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:border-l lg:border-slate-800/80 lg:pl-8">
                  
                  {/* Sub-Services */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                      Core Disciplines Included
                    </h3>
                    <ul className="space-y-2">
                      {service.subServices.map((sub, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1769FF] shrink-0 mt-0.5" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-[#16B89A] uppercase tracking-wider">
                      Business Benefits
                    </h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16B89A] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tangible Deliverables (Full-Width within right column) */}
                  <div className="sm:col-span-2 pt-4 border-t border-slate-800/80 space-y-2">
                    <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      What You Receive (Tangible Deliverables)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                          <span className="text-[#1769FF]">›</span>
                          <span className="text-slate-300 truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </section>

        {/* ========================================================= */}
        {/* CUSTOM ENGAGEMENT CTA                                     */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#17243A]/40 border border-slate-800 text-center max-w-3xl mx-auto space-y-5">
          <span className="text-xs font-semibold text-[#16B89A] tracking-wider uppercase">
            Tailored Partnerships
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Need a Bundled Marketing &amp; Development Strategy?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Most businesses achieve the greatest leverage when combining modern web development with active search strategy and targeted Google/Meta ad funnels. Let&apos;s map out a customized project scope suited to your commercial goals.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => scrollToLeadForm('Business Growth Strategy')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] text-white text-xs font-semibold cursor-pointer transition-colors shadow-md shadow-[#1769FF]/20"
            >
              <span>Get a Free Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </div>
    </>
  );
};
