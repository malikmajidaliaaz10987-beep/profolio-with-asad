import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  BarChart3, 
  Code2, 
  Bot, 
  Search, 
  Target, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { PERSONAL_INFO, INITIAL_SERVICES, WORK_PROCESS } from '../data/portfolioData';
import { useProfile } from '../context/ProfileContext';
import { SEOHead } from '../components/common/SEOHead';
import { ProjectModal } from '../components/common/ProjectModal';
import { ProfileImage } from '../components/common/ProfileImage';
import { LeadForm } from '../components/common/LeadForm';
import { useLeadFormNavigation } from '../hooks/useLeadFormNavigation';
import { Project } from '../types';

export const HomePage: React.FC = () => {
  const { availabilityStatus, setAvailabilityStatus, projects, selectedServiceForInquiry } = useProfile();
  const { scrollToLeadForm } = useLeadFormNavigation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  const handleCycleAvailability = () => {
    const statuses: Array<typeof availabilityStatus> = [
      'Available for Projects',
      'Limited Availability',
      'Consulting Only',
      'Currently Booked'
    ];
    const currentIndex = statuses.indexOf(availabilityStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    setAvailabilityStatus(nextStatus);
  };

  return (
    <>
      <SEOHead
        title="Asad Ali Awan — Digital Marketing Specialist & Website Developer"
        description="Helping businesses grow through digital marketing, SEO strategy, Google & Meta Ads, modern website development, and AI solutions worldwide."
        path="/"
        keywords={[
          'Digital Marketing Specialist',
          'SEO Specialist',
          'Google Ads Management',
          'Meta Ads Specialist',
          'Website Developer',
          'AI Chatbot Development'
        ]}
      />

      <div className="space-y-24 sm:space-y-32 pb-24">
        
        {/* ========================================================= */}
        {/* HERO SECTION                                              */}
        {/* ========================================================= */}
        <section className="relative pt-8 sm:pt-16 overflow-hidden">
          {/* Subtle Ambient Light Gradients */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1769FF]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-24 right-1/4 w-96 h-96 bg-[#16B89A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Typographic Hierarchy */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Availability & Location Bar */}
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <button
                    onClick={handleCycleAvailability}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 transition-colors cursor-pointer group"
                    title="Click to toggle availability status"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#16B89A]" />
                    <span className="font-medium text-white">{availabilityStatus}</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-slate-200">· Click to change</span>
                  </button>

                  <span className="text-slate-400 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-[#1769FF]" />
                    US, UK, CA, AU & International
                  </span>
                </div>

                {/* Professional Name Lockup */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold tracking-widest text-[#1769FF] uppercase">
                    ASAD ALI AWAN
                  </div>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] text-balance">
                    Helping Businesses Grow Through Digital Marketing, Technology & AI.
                  </h1>
                </div>

                {/* Supporting Description */}
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  I help businesses build powerful digital experiences, attract the right audience, generate qualified leads and achieve sustainable online growth through strategic marketing and modern technology.
                </p>

                {/* Professional Identity Subtitle */}
                <p className="text-xs sm:text-sm font-medium text-slate-400">
                  Digital Marketing Specialist &amp; Web Developer.
                </p>

                {/* Action CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToLeadForm()}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] active:scale-95 text-white font-semibold text-sm transition-all duration-150 shadow-lg shadow-[#1769FF]/25 cursor-pointer whitespace-nowrap"
                  >
                    <span>Get a Free Consultation</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 active:scale-95 text-slate-200 hover:text-white font-medium text-sm border border-slate-700 transition-all duration-150 cursor-pointer whitespace-nowrap"
                  >
                    <span>Explore My Work</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-3 text-xs text-[#16B89A] hover:text-[#19d6b3] transition-colors"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

              {/* Right Column: Professional Profile Photo & Identity (Fixed Authentic Photograph) */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
                <div className="relative group max-w-md w-full">
                  
                  {/* Outer Framing Card */}
                  <div className="relative p-3 sm:p-4 rounded-3xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-sm">
                    
                    {/* Fixed Genuine Portrait Image (Non-editable through website) */}
                    <ProfileImage shape="rounded" size="hero" priority />

                    {/* Quick Trust Label */}
                    <div className="mt-3 px-2 flex items-center justify-between text-xs text-slate-300">
                      <div>
                        <div className="font-semibold text-white">Asad Ali Awan</div>
                        <div className="text-[11px] text-slate-400">International Specialist</div>
                      </div>
                      <span className="text-[11px] text-[#16B89A] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Profile
                      </span>
                    </div>

                  </div>

                </div>
              </div>

            </div>

            {/* Full-Width Capabilities Strip (below the hero split) */}
            <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <div className="text-slate-400">Specialization</div>
                <div className="text-sm font-semibold text-white mt-1">SEO &amp; Growth Marketing</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Technical &amp; Commercial Intent</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <div className="text-slate-400">Paid Acquisition</div>
                <div className="text-sm font-semibold text-white mt-1">Google &amp; Meta Ads</div>
                <div className="text-[11px] text-slate-400 mt-0.5">High-Converting Ad Funnels</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <div className="text-slate-400">Engineering</div>
                <div className="text-sm font-semibold text-white mt-1">React &amp; Modern Web</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Fast, Mobile-First Architecture</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <div className="text-slate-400">Next-Gen Tech</div>
                <div className="text-sm font-semibold text-white mt-1">AI Chatbots &amp; Workflows</div>
                <div className="text-[11px] text-slate-400 mt-0.5">24/7 Lead Qualification</div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* PROFESSIONAL INTRODUCTION & POSITIONING                   */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#17243A]/60 border border-slate-800 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-semibold text-[#16B89A] tracking-wider uppercase">
                  Professional Positioning
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Bridging the Gap Between Technical Engineering and Commercial Marketing.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Most businesses face a disconnect: creative marketers lack technical understanding, while software developers often ignore conversion funnels, search algorithms, and user acquisition economics.
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  My work bridges this exact gap. By integrating search strategy, paid media management, performant React engineering, and AI automation into a unified system, your business gains a modern, revenue-generating digital presence.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center space-y-4 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8">
                <div className="space-y-1">
                  <div className="text-xs text-slate-400">Primary Contact</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-semibold text-white hover:text-[#1769FF] transition-colors inline-block"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-400">Direct WhatsApp</div>
                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#16B89A] hover:text-[#19d6b3] transition-colors inline-flex items-center gap-1"
                  >
                    <span>{PERSONAL_INFO.phoneDisplay}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1769FF] hover:text-[#3d83ff] transition-colors"
                  >
                    <span>Read Full About Me Profile</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CORE SERVICES OVERVIEW                                    */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold text-[#1769FF] tracking-wider uppercase">
                Core Capabilities
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                Strategic Services Built for Business Growth.
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors self-start md:self-auto"
            >
              <span>Explore All 6 Detailed Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#1769FF]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIAL_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="group p-6 sm:p-7 rounded-2xl bg-[#17243A]/40 hover:bg-[#17243A]/80 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="text-slate-400">{srv.number}</span>
                    <span className="text-[#16B89A] font-sans">{srv.idealFor.slice(0, 32)}...</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#1769FF] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {srv.shortDesc}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                    {srv.subServices.slice(0, 3).map((sub, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1769FF] shrink-0 mt-0.5" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    to="/services"
                    className="text-xs font-medium text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>View Service</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => scrollToLeadForm(srv.title)}
                    className="text-xs font-semibold text-[#1769FF] hover:text-[#3d83ff] transition-colors cursor-pointer"
                  >
                    Request a Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* FEATURED PROJECTS PREVIEW                                 */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold text-[#16B89A] tracking-wider uppercase">
                Featured Work
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                Curated Projects &amp; Architecture Case Studies.
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Demonstration prototypes and architectural case studies illustrating real-world digital execution.
              </p>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors self-start md:self-auto"
            >
              <span>View Full Portfolio Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#16B89A]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer rounded-2xl bg-[#17243A]/40 hover:bg-[#17243A]/80 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-medium text-slate-200 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded border border-slate-700">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-base font-bold text-white group-hover:text-[#1769FF] transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1">
                      {project.tools.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1769FF] group-hover:text-[#3d83ff] transition-colors inline-flex items-center gap-1">
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>

                  {project.demoComponentKey && (
                    <span className="text-[11px] text-[#16B89A] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Live Demo
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* WHY WORK WITH ME                                          */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-semibold text-[#1769FF] tracking-wider uppercase">
              The Value Proposition
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Why Work With Me?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear principles that guide every client engagement and project deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#17243A]/30 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#1769FF]/10 border border-[#1769FF]/20 flex items-center justify-center text-[#1769FF]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Conversion-First Mindset</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Traffic is meaningless without action. Every website, landing page, and ad campaign is built to turn casual visitors into qualified inquiries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#17243A]/30 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#16B89A]/10 border border-[#16B89A]/20 flex items-center justify-center text-[#16B89A]">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">International Business Fluency</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Experienced collaborating with businesses in the US, UK, Canada, and Australia. Flexible overlap with international business timezones.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#17243A]/30 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Pristine Engineering</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Modern React, TypeScript, and semantic standards. Fast load times, accessible markup, and zero bloated code dependencies.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#17243A]/30 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Transparent Communication</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No jargon or obfuscation. Honest assessments of what will drive results, direct WhatsApp/email updates, and weekly progress logs.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* WORKING PROCESS                                           */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#17243A]/40 border border-slate-800">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-semibold text-[#16B89A] tracking-wider uppercase">
                Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                How We Work Together.
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                A structured four-step methodology ensuring clarity, accountability, and measurable results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WORK_PROCESS.map((proc) => (
                <div key={proc.step} className="space-y-3 relative">
                  <div className="text-2xl font-bold font-mono text-[#1769FF]">
                    {proc.step}
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {proc.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {proc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CLIENT PARTNERSHIP POLICY & AUTHENTIC TRUST               */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-[#16B89A] uppercase tracking-wider">
              Client Trust &amp; Integrity Policy
            </span>
            <h3 className="text-lg font-bold text-white">
              Authentic Relationships Over Fabricated Testimonials
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In an industry plagued by fabricated reviews and fake case study metrics, I prioritize radical honesty. I do not invent fake client testimonials or inflated revenue claims. I am currently onboarding international clients for pilot engagements and documented case studies.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => scrollToLeadForm('Business Growth Strategy')}
                className="text-xs font-semibold text-[#1769FF] hover:text-[#3d83ff] transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Start Your Project Partnership</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* EMBEDDED LEAD GENERATION SECTION (#lead-form)             */}
        {/* ========================================================= */}
        <section id="lead-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start p-6 sm:p-10 rounded-3xl bg-[#17243A]/50 border border-slate-800/90 shadow-2xl">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#16B89A] tracking-wider uppercase">
                  Free Consultation &amp; Quote
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Ready to Grow Your Business? Request a Custom Proposal.
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Whether you need a conversion-ready website, AI chatbot automation, or targeted Google &amp; Meta ad campaigns, submit your project details to receive a tailored roadmap.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16B89A] shrink-0 mt-0.5" />
                  <span>Direct communication with Asad Ali Awan—no middlemen or account handoffs.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16B89A] shrink-0 mt-0.5" />
                  <span>Automatic email confirmation and clear timeline assessment.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16B89A] shrink-0 mt-0.5" />
                  <span>Serving clients across the US, UK, Canada, Australia, and worldwide.</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#16B89A]/15 hover:bg-[#16B89A]/25 border border-[#16B89A]/40 text-[#16B89A] text-xs font-semibold transition-colors"
                >
                  <span>WhatsApp: {PERSONAL_INFO.phoneDisplay}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#101827]/90 border border-slate-800">
              <LeadForm initialService={selectedServiceForInquiry} />
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* STRONG FINAL CALL TO ACTION                               */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#17243A] via-[#101827] to-[#17243A] border border-slate-700/80 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              
              <span className="text-xs font-semibold text-[#16B89A] tracking-wider uppercase">
                Ready to Accelerate Your Growth?
              </span>

              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Have a Project in Mind? Let&apos;s Build Something Great Together.
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether you need a high-converting website, organic SEO expansion, Google &amp; Meta ad management, or custom AI chatbots, I am available to help you execute.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToLeadForm()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] active:scale-95 text-white font-semibold text-sm transition-all duration-150 shadow-lg shadow-[#1769FF]/25 cursor-pointer whitespace-nowrap"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#16B89A] hover:bg-[#139c82] active:scale-95 text-white font-semibold text-sm transition-all duration-150 shadow-lg shadow-[#16B89A]/20 cursor-pointer whitespace-nowrap"
                >
                  <span>Message on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-5 py-3.5 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};
