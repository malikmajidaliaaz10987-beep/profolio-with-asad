import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Globe, 
  Target, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useProfile } from '../context/ProfileContext';
import { SEOHead } from '../components/common/SEOHead';
import { ProfileImage } from '../components/common/ProfileImage';
import { useLeadFormNavigation } from '../hooks/useLeadFormNavigation';

export const AboutPage: React.FC = () => {
  const { availabilityStatus } = useProfile();
  const { scrollToLeadForm } = useLeadFormNavigation();

  return (
    <>
      <SEOHead
        title="About Asad Ali Awan — Digital Marketing Specialist & Web Developer"
        description="Learn about Asad Ali Awan: His background, philosophy, approaches to digital marketing, website development, and emerging AI technologies."
        path="/about"
        keywords={[
          'About Asad Ali Awan',
          'Digital Marketing Specialist Profile',
          'SEO Strategist Background',
          'React Web Developer',
          'AI Solutions Consultant'
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20 sm:space-y-24">
        
        {/* ========================================================= */}
        {/* HEADER & BIOGRAPHICAL SPLIT                               */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1769FF] tracking-wider uppercase">
              <span>About Me</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Professional Profile</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight text-balance">
              Building at the Intersection of Marketing, Engineering &amp; AI.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              I am Asad Ali Awan, an international digital specialist focused on helping businesses build high-visibility digital footprints, attract qualified prospective buyers, and convert attention into measurable revenue.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Based remotely and collaborating seamlessly across US, UK, Canadian, and Australian timezones, my mission is to provide businesses with the technical and strategic agility required to win in today&apos;s competitive digital landscape.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <button
                type="button"
                onClick={() => scrollToLeadForm()}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] active:scale-95 text-white font-semibold transition-all duration-150 cursor-pointer shadow-md shadow-[#1769FF]/20"
              >
                <span>Get a Free Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="relative group max-w-sm w-full">
              <div className="relative p-3 rounded-3xl bg-[#17243A]/80 border border-slate-700/80 shadow-2xl backdrop-blur-sm">
                
                {/* Fixed Authentic Portrait */}
                <ProfileImage shape="rounded" size="hero" />
                
                <div className="mt-3 px-2 flex items-center justify-between text-xs text-slate-300">
                  <div>
                    <div className="font-semibold text-white">Asad Ali Awan</div>
                    <div className="text-[11px] text-[#16B89A]">{availabilityStatus}</div>
                  </div>
                  <span className="text-[11px] text-slate-400">Verified Profile</span>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ========================================================= */}
        {/* PERSONAL BRANDING STATEMENT                               */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#17243A]/40 border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#16B89A] tracking-wider uppercase">
              Brand Manifesto
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              &ldquo;Technology Without Distribution is Ineffective; Distribution Without a Solid Product is Wasteful.&rdquo;
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              My core conviction is that sustainable digital growth requires both ends of the equation. You cannot build a great website and hope visitors magically arrive without intentional search optimization and targeted advertising. Conversely, spending thousands on ad clicks without a fast, accessible, conversion-optimized landing page burns capital.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              I provide an integrated perspective that unites these disciplines: modern engineering foundations, data-driven customer acquisition, and intelligent automation that saves time.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* MY APPROACH TO THREE CORE PILLARS                         */}
        {/* ========================================================= */}
        <section className="space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold text-[#1769FF] tracking-wider uppercase">
              Core Methodologies
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              How I Approach Digital Disciplines.
            </h2>
            <p className="text-xs text-slate-400">
              Clear mental models and operational rigor applied to every engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Approach 1: Digital Marketing */}
            <div className="p-7 rounded-2xl bg-[#17243A]/30 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1769FF]/10 border border-[#1769FF]/20 flex items-center justify-center text-[#1769FF]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Approach to Digital Marketing
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                I do not rely on guesswork or vanity metrics. In digital marketing, every campaign begins with customer empathy and intent mapping: What specific problem is your buyer trying to solve?
              </p>
              <ul className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1769FF] shrink-0 mt-0.5" />
                  <span>Intent-aligned keyword targeting over generic volume</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1769FF] shrink-0 mt-0.5" />
                  <span>Relentless negative keyword filtering to safeguard ad spend</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1769FF] shrink-0 mt-0.5" />
                  <span>Transparent tracking tied directly to business inquiries</span>
                </li>
              </ul>
            </div>

            {/* Approach 2: Website Development */}
            <div className="p-7 rounded-2xl bg-[#17243A]/30 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#16B89A]/10 border border-[#16B89A]/20 flex items-center justify-center text-[#16B89A]">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Approach to Website Development
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A website is your 24/7 digital storefront and primary trust asset. It must load in under two seconds, adapt cleanly to all devices, and respect human typography principles.
              </p>
              <ul className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16B89A] shrink-0 mt-0.5" />
                  <span>Clean React + TypeScript component architectures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16B89A] shrink-0 mt-0.5" />
                  <span>Zero-pill visual restraint and balanced typographic hierarchy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16B89A] shrink-0 mt-0.5" />
                  <span>Semantic Schema.org metadata embedded for search crawlability</span>
                </li>
              </ul>
            </div>

            {/* Approach 3: AI Technologies */}
            <div className="p-7 rounded-2xl bg-[#17243A]/30 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Approach to AI Technologies
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rather than treating AI as a novelty or replacement for critical thinking, I treat it as a high-leverage force multiplier that accelerates real business workflows.
              </p>
              <ul className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>Intelligent chatbots that pre-qualify leads outside business hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>Commercial-grade generative visual workflows for ad creatives</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>Structured prompt engineering libraries for consistent team outputs</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* WORK PHILOSOPHY & PROFESSIONAL STRENGTHS                  */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <span className="text-xs font-semibold text-[#1769FF] tracking-wider uppercase">
              Guiding Principles
            </span>
            <h3 className="text-xl font-bold text-white">My Work Philosophy</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#16B89A] shrink-0 mt-0.5" />
                <span><strong>Radical Authenticity:</strong> Never exaggerate capability, fabricate case study metrics, or promise unrealistic overnight outcomes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#16B89A] shrink-0 mt-0.5" />
                <span><strong>Continuous Competency:</strong> Digital marketing algorithms and web technologies evolve rapidly; maintaining curiosity and deep domain study is non-negotiable.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#16B89A] shrink-0 mt-0.5" />
                <span><strong>Client Empathy:</strong> Understand the business owner&apos;s real economics, budget constraints, and operational goals before writing a single line of copy or code.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <span className="text-xs font-semibold text-[#16B89A] tracking-wider uppercase">
              Competitive Edge
            </span>
            <h3 className="text-xl font-bold text-white">Professional Strengths</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#1769FF] shrink-0 mt-0.5" />
                <span><strong>Cross-Functional Fluency:</strong> Comfortable writing TypeScript code, structuring Google Ads bidding models, or auditing schema markup with equal proficiency.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#1769FF] shrink-0 mt-0.5" />
                <span><strong>High-Agency Execution:</strong> Self-directed problem solver who drives initiatives from initial concept to live production deployment with minimal friction.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#1769FF] shrink-0 mt-0.5" />
                <span><strong>International Remote Collaboration:</strong> Clear, asynchronous documentation and responsive communication across US, UK, and Australian timezones.</span>
              </li>
            </ul>
          </div>

        </section>

        {/* ========================================================= */}
        {/* CAREER GOALS & VISION                                     */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-10 rounded-2xl bg-[#17243A]/40 border border-slate-800 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-[#16B89A] tracking-wider uppercase">
            Looking Ahead
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Long-Term Career Goals
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            My objective is to become a trusted, long-term digital growth partner for businesses across North America, the United Kingdom, and Australia. I measure success by the clarity, sustainability, and tangible return on investment generated for each business I collaborate with.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToLeadForm('Business Growth Strategy')}
              className="px-5 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              Start Your Project
            </button>
            <Link
              to="/services"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </section>

      </div>
    </>
  );
};
