import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  CheckCircle2,
  MessageCircle,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useCookieConsent } from '../../context/CookieContext';
import { parseApiJsonResponse } from '../../utils/api';

interface LeadFormProps {
  initialService?: string;
  onSuccess?: () => void;
  className?: string;
}

const SERVICES_LIST = [
  'Website Development',
  'AI Chatbot Development',
  'AI Automation',
  'AI Image Generation',
  'AI Video Generation',
  'SEO Services',
  'Social Media Marketing',
  'Meta Ads',
  'Google Ads',
  'TikTok Ads',
  'Business Growth Strategy',
  'Other',
] as const;

function mapInitialService(raw?: string): string {
  if (!raw) return 'Website Development';
  const exact = SERVICES_LIST.find((s) => s.toLowerCase() === raw.trim().toLowerCase());
  if (exact) return exact;

  const lower = raw.toLowerCase();
  if (lower.includes('chatbot')) return 'AI Chatbot Development';
  if (lower.includes('automation') || lower.includes('ai solution')) return 'AI Automation';
  if (lower.includes('image')) return 'AI Image Generation';
  if (lower.includes('video')) return 'AI Video Generation';
  if (lower.includes('seo')) return 'SEO Services';
  if (lower.includes('google ads')) return 'Google Ads';
  if (lower.includes('meta ads') || lower.includes('facebook') || lower.includes('instagram')) return 'Meta Ads';
  if (lower.includes('tiktok')) return 'TikTok Ads';
  if (lower.includes('social')) return 'Social Media Marketing';
  if (lower.includes('website') || lower.includes('landing') || lower.includes('react')) return 'Website Development';
  if (lower.includes('strategy') || lower.includes('consultation') || lower.includes('growth') || lower.includes('package')) {
    return 'Business Growth Strategy';
  }
  return 'Other';
}

function generateChallenge(): { a: number; b: number } {
  return {
    a: Math.floor(Math.random() * 7) + 2,
    b: Math.floor(Math.random() * 7) + 2,
  };
}

export const LeadForm: React.FC<LeadFormProps> = ({ initialService, onSuccess, className = '' }) => {
  const { openPrivacyPolicy } = useCookieConsent();
  const formLoadedAtRef = useRef<number>(Date.now());

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [country, setCountry] = useState('United States');
  const [website, setWebsite] = useState('');
  const [service, setService] = useState(() => mapInitialService(initialService));
  const [budget, setBudget] = useState('Not Specified (Optional)');
  const [timeline, setTimeline] = useState('Within 1–2 Weeks');
  const [projectDescription, setProjectDescription] = useState('');
  const [contactPreference, setContactPreference] = useState<'Email' | 'WhatsApp'>('Email');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [hpCompany, setHpCompany] = useState(''); // Honeypot

  // Anti-spam challenge
  const [challenge, setChallenge] = useState<{ a: number; b: number }>(() => generateChallenge());
  const [spamAnswer, setSpamAnswer] = useState('');

  // Validation & Submission State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<null | {
    leadId: string;
    message: string;
    name: string;
    email: string;
    emailConfigured: boolean;
    adminEmailSent: boolean;
    customerEmailSent: boolean;
  }>(null);
  const [serverError, setServerError] = useState('');

  // Sync service dropdown if parent updates selected service
  useEffect(() => {
    if (initialService) {
      setService(mapInitialService(initialService));
    }
  }, [initialService]);

  const budgetOptions = [
    'Not Specified (Optional)',
    'Under $300',
    '$300–$500',
    '$500–$1,000',
    '$1,000–$3,000',
    '$3,000+',
  ];

  const timelineOptions = [
    'Immediately',
    'Within 1–2 Weeks',
    'Within 1 Month',
    'Flexible',
  ];

  const countriesList = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Netherlands',
    'United Arab Emirates',
    'Saudi Arabia',
    'Pakistan',
    'Singapore',
    'Other International',
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Full Name is required (minimum 2 characters).';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (phone.trim() && !/^[+\d\s().-]{6,24}$/.test(phone.trim())) {
      errs.phone = 'Please enter a valid phone or WhatsApp number.';
    }
    if (!country) {
      errs.country = 'Please select your country.';
    }
    if (!service) {
      errs.service = 'Please select the service you are interested in.';
    }
    if (!projectDescription.trim() || projectDescription.trim().length < 10) {
      errs.projectDescription = 'Please provide at least 10 characters describing your project details.';
    }
    if (!spamAnswer.trim() || Number(spamAnswer) !== challenge.a + challenge.b) {
      errs.spamAnswer = `Please solve ${challenge.a} + ${challenge.b} to verify your submission.`;
    }
    if (!privacyConsent) {
      errs.privacyConsent = 'You must agree to the Privacy Policy to submit your inquiry.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setServerError('');
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          businessName: businessName.trim(),
          country,
          website: website.trim(),
          service,
          budget,
          timeline,
          projectDescription: projectDescription.trim(),
          contactPreference,
          privacyConsent,
          _hp_company: hpCompany,
          _form_loaded_at: formLoadedAtRef.current,
          _spam_answer: Number(spamAnswer),
          _spam_expected: challenge.a + challenge.b,
          source: 'website_form',
        }),
      });

      const data = await parseApiJsonResponse(response);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setSubmissionSuccess({
        leadId: data.leadId,
        message:
          data.message ||
          'Thank you for contacting us! Your inquiry has been successfully received. We appreciate your interest and will get back to you as soon as possible.',
        name: fullName.trim(),
        email: email.trim(),
        emailConfigured: Boolean(data.emailConfigured),
        adminEmailSent: Boolean(data.adminEmailSent),
        customerEmailSent: Boolean(data.customerEmailSent),
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setServerError(err.message || 'Network error occurred. Please try again or message via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionSuccess(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setBusinessName('');
    setWebsite('');
    setBudget('Not Specified (Optional)');
    setProjectDescription('');
    setPrivacyConsent(false);
    setSpamAnswer('');
    setChallenge(generateChallenge());
    formLoadedAtRef.current = Date.now();
    setErrors({});
    setServerError('');
  };

  const encodedWhatsApp = submissionSuccess
    ? encodeURIComponent(
        `Hello Asad, I just submitted an inquiry on your website.\n\nName: ${submissionSuccess.name}\nEmail: ${submissionSuccess.email}\nPhone: ${phone || 'N/A'}\nService: ${service}\nBudget: ${budget}\n\nProject Details:\n${projectDescription}`
      )
    : encodeURIComponent('Hello Asad, I would like to discuss a project inquiry.');

  if (submissionSuccess) {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-[#17243A]/80 border border-slate-700/80 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#16B89A]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Inquiry Successfully Received
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto leading-relaxed">
            {submissionSuccess.message}
          </p>
          <div className="text-xs text-slate-400 space-y-1">
            <div>
              Reference ID: <span className="font-mono text-slate-200">{submissionSuccess.leadId}</span>
            </div>
            {submissionSuccess.customerEmailSent ? (
              <div className="text-[#16B89A]">
                A confirmation email has been sent to <span className="font-mono">{submissionSuccess.email}</span>.
              </div>
            ) : (
              <div className="text-slate-400">
                Your inquiry has been saved securely in our lead database.
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/${PERSONAL_INFO.phoneRaw}?text=${encodedWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#16B89A] hover:bg-[#139c82] text-white text-xs font-semibold transition-colors shadow-md shadow-[#16B89A]/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Directly on WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Project Follow-up - ${encodeURIComponent(submissionSuccess.name)}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors border border-slate-700"
          >
            <Mail className="w-4 h-4 text-[#1769FF]" />
            <span>Send Direct Email</span>
          </a>
        </div>

        <div className="pt-4 border-t border-slate-700/60">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`space-y-5 ${className}`}>
      
      {/* Header */}
      <div className="space-y-1.5 pb-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Start Your Project Inquiry
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Share your goals and project requirements below. Every inquiry is reviewed personally with confidential handling.
        </p>
      </div>

      {serverError && (
        <div role="alert" className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Hidden honeypot field for bot protection */}
      <input
        type="text"
        name="_hp_company"
        value={hpCompany}
        onChange={(e) => setHpCompany(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Row 1: Full Name & Email Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-full-name" className="block text-xs font-semibold text-slate-200 mb-1.5">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            id="lead-full-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. David Miller"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#1769FF] transition-colors ${
              errors.fullName ? 'border-rose-500' : 'border-slate-700 focus:border-[#1769FF]'
            }`}
          />
          {errors.fullName && <p className="mt-1 text-[11px] text-rose-400">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="lead-email" className="block text-xs font-semibold text-slate-200 mb-1.5">
            Email Address <span className="text-rose-400">*</span>
          </label>
          <input
            id="lead-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. david@company.com"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#1769FF] transition-colors ${
              errors.email ? 'border-rose-500' : 'border-slate-700 focus:border-[#1769FF]'
            }`}
          />
          {errors.email && <p className="mt-1 text-[11px] text-rose-400">{errors.email}</p>}
        </div>
      </div>

      {/* Row 2: Phone / WhatsApp Number & Company Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-phone" className="block text-xs font-semibold text-slate-200 mb-1.5">
            Phone / WhatsApp Number <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            id="lead-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +1 555 019 2834"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#1769FF] transition-colors ${
              errors.phone ? 'border-rose-500' : 'border-slate-700 focus:border-[#1769FF]'
            }`}
          />
          {errors.phone && <p className="mt-1 text-[11px] text-rose-400">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="lead-company" className="block text-xs font-semibold text-slate-200 mb-1.5">
            Company Name <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            id="lead-company"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. Miller Digital Ltd"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1769FF]"
          />
        </div>
      </div>

      {/* Row 3: Country & Service Interested In */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-country" className="block text-xs font-semibold text-slate-200 mb-1.5">
            Country <span className="text-rose-400">*</span>
          </label>
          <select
            id="lead-country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#1769FF]"
          >
            {countriesList.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lead-service" className="block text-xs font-semibold text-slate-200 mb-1.5">
            Service Interested In <span className="text-rose-400">*</span>
          </label>
          <select
            id="lead-service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#1769FF]"
          >
            {SERVICES_LIST.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Project Budget (Optional) & Project Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-budget" className="block text-xs font-semibold text-slate-200 mb-1.5">
            Project Budget <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <select
            id="lead-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#1769FF]"
          >
            {budgetOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lead-timeline" className="block text-xs font-semibold text-slate-200 mb-1.5">
            Project Timeline <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <select
            id="lead-timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#1769FF]"
          >
            {timelineOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 5: Website URL (Optional) & Preferred Contact Method */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div>
          <label htmlFor="lead-website" className="block text-xs font-semibold text-slate-200 mb-1.5">
            Website URL <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            id="lead-website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yourwebsite.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1769FF]"
          />
        </div>

        <div className="pb-1.5">
          <span className="block text-xs font-semibold text-slate-200 mb-2">
            Preferred Contact Method
          </span>
          <div className="flex items-center gap-6 text-xs text-slate-300">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="contactMethod"
                checked={contactPreference === 'Email'}
                onChange={() => setContactPreference('Email')}
                className="text-[#1769FF] focus:ring-[#1769FF]"
              />
              <span>Email</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="contactMethod"
                checked={contactPreference === 'WhatsApp'}
                onChange={() => setContactPreference('WhatsApp')}
                className="text-[#16B89A] focus:ring-[#16B89A]"
              />
              <span>WhatsApp</span>
            </label>
          </div>
        </div>
      </div>

      {/* Project Details / Message */}
      <div>
        <label htmlFor="lead-message" className="block text-xs font-semibold text-slate-200 mb-1.5">
          Project Details / Message <span className="text-rose-400">*</span>
        </label>
        <textarea
          id="lead-message"
          rows={4}
          required
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Describe your business goals, target audience, deliverables, or key milestones..."
          className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#1769FF] transition-colors resize-none ${
            errors.projectDescription ? 'border-rose-500' : 'border-slate-700 focus:border-[#1769FF]'
          }`}
        />
        {errors.projectDescription && (
          <p className="mt-1 text-[11px] text-rose-400">{errors.projectDescription}</p>
        )}
      </div>

      {/* Spam Protection Verification */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label htmlFor="lead-spam-check" className="text-xs font-medium text-slate-200">
            Spam Protection: What is <span className="font-mono font-bold text-[#16B89A]">{challenge.a} + {challenge.b}</span>? <span className="text-rose-400">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              id="lead-spam-check"
              type="number"
              inputMode="numeric"
              value={spamAnswer}
              onChange={(e) => setSpamAnswer(e.target.value)}
              placeholder="Answer"
              className={`w-24 px-3 py-1.5 rounded-lg bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1769FF] ${
                errors.spamAnswer ? 'border-rose-500' : 'border-slate-700'
              }`}
            />
            <button
              type="button"
              onClick={() => {
                setChallenge(generateChallenge());
                setSpamAnswer('');
              }}
              title="Refresh verification question"
              aria-label="Refresh verification question"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        {errors.spamAnswer && <p className="text-[11px] text-rose-400">{errors.spamAnswer}</p>}
      </div>

      {/* Privacy Consent Checkbox */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={privacyConsent}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
            className="mt-0.5 rounded border-slate-700 text-[#1769FF] focus:ring-[#1769FF]"
          />
          <span className="text-xs text-slate-300 leading-normal">
            I agree to the{' '}
            <button
              type="button"
              onClick={openPrivacyPolicy}
              className="text-[#1769FF] underline hover:text-[#3d83ff] cursor-pointer"
            >
              Privacy Policy
            </button>{' '}
            (<Link to="/privacy-policy" className="text-[#16B89A] hover:underline">full policy</Link>) and consent to being contacted regarding my project inquiry. <span className="text-rose-400">*</span>
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="mt-1 text-[11px] text-rose-400">{errors.privacyConsent}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16B89A]" />
          Protected lead handling. Zero spam policy.
        </span>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] active:scale-95 text-white font-semibold text-xs transition-all duration-150 cursor-pointer shadow-lg shadow-[#1769FF]/25 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Submitting Inquiry...</span>
            </>
          ) : (
            <>
              <span>Submit Inquiry</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

    </form>
  );
};
