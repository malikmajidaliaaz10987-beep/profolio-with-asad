import { Project, ServiceItem, SkillCategory, ToolItem } from '../types';

const rawEnvWhatsApp =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WHATSAPP_NUMBER) || '923164227321';

const normalizeWhatsAppDigits = (input: string): string => {
  const digits = input.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 11) {
    return `92${digits.slice(1)}`;
  }
  return digits || '923164227321';
};

const configuredWhatsApp = normalizeWhatsAppDigits(rawEnvWhatsApp);
const defaultWhatsAppText = encodeURIComponent(
  'Hello Asad, I visited your portfolio website and would like to discuss a project.'
);

const formatPhoneDisplay = (digits: string): string => {
  if (digits === '923164227321') {
    return '+92 316 4227321 (03164227321)';
  }
  return `+${digits}`;
};

export const PERSONAL_INFO = {
  fullName: 'Asad Ali Awan',
  primaryTitle: 'Digital Marketing Specialist | SEO Strategist | Google Ads & Meta Ads Specialist | Website Developer | AI Solutions Specialist | Lead Generation Strategist',
  shortTitle: 'Digital Marketing Specialist & Web Developer',
  positioning: 'I help businesses strengthen their online presence, attract qualified customers, generate leads and grow through strategic digital marketing, professional website development and AI-powered solutions.',
  email: 'aliofficialtech1@gmail.com',
  phoneDisplay: formatPhoneDisplay(configuredWhatsApp),
  phoneRaw: configuredWhatsApp,
  whatsappUrl: `https://wa.me/${configuredWhatsApp}?text=${defaultWhatsAppText}`,
  location: 'International Remote Specialist (US, UK, CA, AU Timezone Friendly)',
  targetMarkets: ['United States', 'United Kingdom', 'Canada', 'Australia', 'Global Markets'],
  // Fixed professional photograph uploaded by Asad Ali Awan (non-editable through the website)
  defaultPortrait: '/assets/aistudio/photo_249801be.jpeg',
  heroWorkspaceImage: '/src/assets/images/hero_digital_workspace_1794419928946.jpg',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/asadaliawan',
    github: 'https://github.com/asadaliawan',
    whatsapp: `https://wa.me/${configuredWhatsApp}?text=${defaultWhatsAppText}`,
    email: 'mailto:aliofficialtech1@gmail.com'
  }
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'seo',
    number: '01',
    title: 'Search Engine Optimization (SEO)',
    shortDesc: 'Drive high-intent organic search traffic with data-backed technical and on-page optimization.',
    fullDesc: 'Comprehensive search optimization strategy built for long-term organic dominance, search visibility, and qualified inbound lead generation.',
    subServices: [
      'On-page SEO (Metadata, Heading hierarchy, Content relevance)',
      'Technical SEO (Crawlability, Core Web Vitals, Structured schema)',
      'Keyword Research & Intent Mapping',
      'SEO Content Strategy & Topical Authority',
      'Website Optimization & Speed Enhancement'
    ],
    benefits: [
      'Sustainable search engine visibility without ongoing ad click costs',
      'Higher commercial keyword rankings for your high-margin offerings',
      'Improved page speed, UX signals, and technical compliance',
      'Targeted reach into competitive US, UK, Canadian, and Australian search spaces'
    ],
    deliverables: [
      'Full technical SEO audit report & fix roadmap',
      'Curated high-intent keyword target matrix',
      'On-page title, meta, and heading optimizations',
      'Schema.org structured data deployment',
      'Monthly organic performance & ranking tracking'
    ],
    idealFor: 'B2B companies, service providers, and brands aiming to capture active search demand.',
    keywords: ['SEO Specialist', 'Technical SEO', 'Keyword Research', 'On-page Optimization', 'Search Strategy']
  },
  {
    id: 'google-ads',
    number: '02',
    title: 'Google Ads Management',
    shortDesc: 'Capture purchase-ready prospects actively searching for your exact solutions right now.',
    fullDesc: 'Precision PPC management designed to maximize return on ad spend (ROAS) and generate qualified sales opportunities through tightly managed search and display campaigns.',
    subServices: [
      'High-Intent Search Campaigns',
      'Display Advertising & Brand Recall',
      'Conversion Tracking & Google Tag Manager Setup',
      'Negative Keyword Scrubbing & Bid Optimization',
      'Landing Page Alignment & Quality Score Boosting'
    ],
    benefits: [
      'Direct exposure to buyers actively searching for immediate services',
      'Zero wasted budget through relentless negative keyword governance',
      'Accurate conversion tracking tied directly to business inquiries',
      'Structured A/B ad copy testing to steadily improve click-through rates'
    ],
    deliverables: [
      'Target account & campaign architecture build',
      'Precision ad copy variations with responsive search assets',
      'Full GTM conversion goal tracking verification',
      'Negative keyword lists and weekly search term hygiene',
      'Transparent weekly bid and CPA performance reports'
    ],
    idealFor: 'Businesses needing predictable inbound lead volume and fast market validation.',
    keywords: ['Google Ads Management', 'PPC Specialist', 'Conversion Tracking', 'Search Campaigns']
  },
  {
    id: 'meta-ads',
    number: '03',
    title: 'Meta Ads Management',
    shortDesc: 'Reach targeted buyer personas across Facebook and Instagram with high-converting creative funnels.',
    fullDesc: 'Strategic social advertising campaigns that build brand desire, capture qualified leads, and nurture warm audiences back to conversion.',
    subServices: [
      'Facebook Advertising Campaigns',
      'Instagram Advertising & Visual Storytelling',
      'Direct Lead Generation & Instant Form Campaigns',
      'Custom Audience Retargeting Strategies',
      'Creative Testing & Angle Diversification'
    ],
    benefits: [
      'Pinpoint audience demographic and interest targeting across US/UK/CA/AU',
      'Cost-effective lead generation with low barrier instant forms',
      'Systematic retargeting to re-engage site visitors who did not convert',
      'Data-driven creative iteration to combat ad fatigue'
    ],
    deliverables: [
      'Audience avatar research and targeting framework',
      'High-converting ad copy angles and creative directives',
      'Meta Pixel and Conversions API (CAPI) event setup',
      'Lead form configuration and CRM webhook notification',
      'Bi-weekly performance breakdowns and optimization logs'
    ],
    idealFor: 'E-commerce brands, coaching/consulting businesses, and localized service companies.',
    keywords: ['Meta Ads Specialist', 'Facebook Advertising', 'Instagram Ads', 'Lead Generation Campaigns']
  },
  {
    id: 'social-ads',
    number: '04',
    title: 'Social Media Advertising',
    shortDesc: 'Expand multi-channel reach with targeted video campaigns across YouTube and TikTok.',
    fullDesc: 'Multi-platform social media advertising strategies tailored to capture modern attention, educate buyers, and scale customer acquisition.',
    subServices: [
      'YouTube In-Stream & Discovery Ads',
      'TikTok Ads & Short-Form Video Strategy',
      'Multi-Channel Social Campaign Architecture',
      'Creative Hook & Script Structuring',
      'Audience Cross-Pollination & Funnel Nurturing'
    ],
    benefits: [
      'Capture video-first consumer and B2B buyer mindshare',
      'Test engaging hooks and short-form video angles quickly',
      'Diversify beyond a single ad platform to build channel resilience',
      'Drive traffic to dedicated conversion landing pages'
    ],
    deliverables: [
      'Multi-channel advertising strategy blueprint',
      'Video ad script frameworks and visual hooks',
      'Campaign setup and pixel attribution integration',
      'Audience segmentation and frequency capping management',
      'Continuous campaign monitoring and budget distribution'
    ],
    idealFor: 'Modern brands, SaaS businesses, and high-growth services seeking multi-touch attribution.',
    keywords: ['Social Media Advertising', 'YouTube Ads', 'TikTok Advertising', 'Social Funnels']
  },
  {
    id: 'web-dev',
    number: '05',
    title: 'Website Development',
    shortDesc: 'Fast, modern, responsive websites built with clean code and conversion-focused UI/UX.',
    fullDesc: 'Production-ready web development combining modern engineering (React, TypeScript, Tailwind CSS) with user-centric conversion architecture.',
    subServices: [
      'Modern Business & Corporate Websites',
      'High-Conversion Landing Pages',
      'Professional Portfolio & Executive Websites',
      'Mobile-First Responsive Web Design',
      'UI/UX Design & Conversion Rate Optimization (CRO)'
    ],
    benefits: [
      'Lightning-fast load speeds that improve conversion rates and SEO rankings',
      'Flawless cross-device responsive layout from smartphones to 4K displays',
      'Semantic, accessible code structure that builds lasting credibility',
      'Clean forms, interactive modals, and purposeful user journeys'
    ],
    deliverables: [
      'Complete production-ready web application / site code',
      'Fully responsive layouts with dark/light theme support',
      'Semantic SEO markup and OpenGraph integration',
      'Working contact and lead capture integrations',
      'Deployment assistance on modern platforms (Vercel, Netlify, Cloud Run)'
    ],
    idealFor: 'Startups, professionals, agencies, and businesses looking for an international-standard web presence.',
    keywords: ['Website Developer', 'React Developer', 'Landing Page Design', 'Responsive Web Design', 'UI/UX']
  },
  {
    id: 'ai-solutions',
    number: '06',
    title: 'AI Solutions & Automations',
    shortDesc: 'Deploy intelligent chatbots and modern AI workflows that streamline business operations.',
    fullDesc: 'Practical, results-oriented implementation of artificial intelligence tools, chatbots, automation pipelines, and prompt engineering.',
    subServices: [
      'Custom AI Customer Support & Lead Qualification Chatbots',
      'AI Workflow & Operations Automation Concepts',
      'AI Image Generation & Visual Assets for Marketing',
      'AI Video Concepts & Generative Media',
      'Prompt Engineering & Model Fine-Tuning Protocols'
    ],
    benefits: [
      '24/7 instant lead qualification and inquiry answers without delay',
      'Automated repetitive administrative and data ingestion tasks',
      'Accelerated visual marketing asset production at lower cost',
      'Competitive advantage by integrating modern AI capabilities early'
    ],
    deliverables: [
      'Custom knowledge-grounded chatbot architecture',
      'Workflow automation mapping and tool integration',
      'High-fidelity generative visual assets for campaigns',
      'Structured prompt libraries for team productivity',
      'Implementation documentation and user guidelines'
    ],
    idealFor: 'Forward-thinking companies seeking operational efficiency and 24/7 client response readiness.',
    keywords: ['AI Solutions Specialist', 'AI Chatbot Development', 'Prompt Engineering', 'AI Automation']
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'project-saas-platform',
    name: 'FluxFlow — Modern SaaS Platform & Marketing Web Portal',
    tagline: 'High-performance responsive web application & conversion landing page',
    description: 'A responsive full-stack SaaS web portal featuring clean product showcases, interactive dashboards, customer conversion funnels, and dark/light mode interfaces.',
    category: 'Website Development',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
    thumbnail: '/src/assets/images/project_web_platform_1794419929993.jpg',
    isDemoSample: true,
    featured: true,
    caseStudy: {
      clientType: 'B2B Software & Workflow Automation Company',
      targetMarket: 'United States & Canada',
      challenge: 'The client needed a modern, international-standard web application with exceptional Core Web Vitals, accessible mobile navigation, and seamless conversion pathways.',
      strategy: 'Engineered a modern React & TypeScript architecture with zero-pill visual discipline, lightning-fast rendering, semantic schema markup, and intuitive contact triggers.',
      deliverables: [
        'Complete responsive web application code',
        'Interactive live dashboard preview widget',
        'Validated lead capture modal',
        'Tailwind CSS dark/light theme switcher'
      ],
      outcomes: [
        'Demonstrates sub-2-second page loads',
        'Clean mobile-first viewport scaling across all screen sizes',
        'Zero console errors and WCAG AA accessibility compliance'
      ],
      technicalArchitecture: 'React 19 + TypeScript + Tailwind CSS v4 + Motion + Vite'
    },
    liveDemoUrl: 'https://asadaliawan.com/portfolio#demo-saas',
    demoComponentKey: 'saas-demo'
  },
  {
    id: 'project-seo-growth',
    name: 'ApexTech — Organic Search Growth & Keyword Architecture',
    tagline: 'Technical SEO audit, content roadmap, and high-intent keyword mapping',
    description: 'An in-depth demonstration of organic search strategy, technical crawlability optimization, structured data schemas, and high-intent commercial keyword clustering.',
    category: 'SEO Projects',
    tools: ['Google Search Console', 'Ahrefs Framework', 'Google Analytics 4', 'Schema.org JSON-LD'],
    thumbnail: '/src/assets/images/project_seo_analytics_1794419930015.jpg',
    isDemoSample: true,
    featured: true,
    caseStudy: {
      clientType: 'Enterprise Cloud & Managed IT Services Provider',
      targetMarket: 'United Kingdom & United States',
      challenge: 'Low organic visibility for competitive commercial keywords and indexing bottlenecks caused by slow JavaScript rendering and poor internal link structure.',
      strategy: 'Implemented full technical SEO remediation: resolved orphaned pages, deployed Schema.org Organization and Service JSON-LD, and mapped high-intent buyer keywords into dedicated topic clusters.',
      deliverables: [
        'Complete Technical SEO Audit & Checklist',
        'Topical Authority Keyword Hierarchy (50+ commercial phrases)',
        'Rich Snippet & BreadcrumbList structured data code',
        'Content optimization briefs for core service offerings'
      ],
      outcomes: [
        'Structured architecture optimized for Google Knowledge Graph',
        'Streamlined crawl budget efficiency with clean canonical tags',
        'Clear search intent alignment for international B2B inquiries'
      ],
      technicalArchitecture: 'JSON-LD Schema + Canonical URL management + Semantic HTML5'
    },
    liveDemoUrl: 'https://asadaliawan.com/portfolio#demo-seo',
    demoComponentKey: 'seo-demo'
  },
  {
    id: 'project-ai-chatbot',
    name: 'OmniAssist — Intelligent Lead Qualification & Support Bot',
    tagline: '24/7 autonomous chatbot with interactive conversation flows',
    description: 'An interactive AI chatbot designed to qualify inbound leads, answer product queries in real-time, collect contact details, and route high-value inquiries directly to sales teams.',
    category: 'AI Chatbots',
    tools: ['Gemini API', 'TypeScript', 'Prompt Engineering', 'State Machines', 'Tailwind CSS'],
    thumbnail: '/src/assets/images/project_ai_assistant_1794419930826.jpg',
    isDemoSample: true,
    featured: true,
    caseStudy: {
      clientType: 'International Consulting & Professional Services Practice',
      targetMarket: 'United States, Australia, United Kingdom',
      challenge: 'High volume of international website visitors bouncing outside standard business hours without leaving contact information or qualifying their budgets.',
      strategy: 'Designed and deployed an interactive conversational widget with prompt-engineered lead qualification logic, instant budget triage, and seamless email/WhatsApp notifications.',
      deliverables: [
        'Live interactive embeddable chatbot widget',
        'Custom system prompt for empathetic lead qualification',
        'Budget and project timeline extraction flow',
        'Local inquiry logging and automated contact transfer'
      ],
      outcomes: [
        'Provides instant answers to visitor questions 24/7',
        'Qualifies user intent and project scope before sales outreach',
        'Zero latency with smooth interactive UI state machine'
      ],
      technicalArchitecture: 'Client-side State Machine + Prompt Engineering Logic + Responsive Sheet Modal'
    },
    liveDemoUrl: 'https://asadaliawan.com/portfolio#demo-chatbot',
    demoComponentKey: 'chatbot-demo'
  },
  {
    id: 'project-google-ads-funnel',
    name: 'ProConvert — High-Intent Search Campaign & PPC Architecture',
    tagline: 'Google Ads search campaign structure with negative keyword matrix',
    description: 'A complete campaign architecture demonstration featuring tightly themed ad groups (STAGs), commercial ad copy variations, landing page alignment, and conversion tracking.',
    category: 'Google Ads',
    tools: ['Google Ads', 'Google Tag Manager', 'Google Analytics 4', 'Ad Copy Frameworks'],
    thumbnail: '/src/assets/images/project_seo_analytics_1794419930015.jpg',
    isDemoSample: true,
    featured: false,
    caseStudy: {
      clientType: 'Commercial Real Estate & Facility Management Firm',
      targetMarket: 'United States',
      challenge: 'High cost-per-click and low inquiry conversion due to broad match keyword waste and misaligned landing page messaging.',
      strategy: 'Restructured account into high-intent Single Theme Ad Groups, built a 300+ phrase negative keyword shield, and wrote benefit-focused responsive search ad copy.',
      deliverables: [
        'Account structure map with exact/phrase match tiers',
        'Negative keyword master repository to eliminate non-buyers',
        '12 responsive search ad copy assets with pinned high-performing headlines',
        'Custom GTM event trigger specification for lead forms'
      ],
      outcomes: [
        'Eliminated click leakage from student/job-seeker search queries',
        'Maintained high ad relevance and quality score indicators',
        'Provided repeatable blueprint for commercial lead acquisition'
      ]
    },
    liveDemoUrl: 'https://asadaliawan.com/portfolio#demo-google-ads'
  },
  {
    id: 'project-meta-funnel',
    name: 'AuraStyle — Meta Ads Lead Gen & Creative Retargeting Funnel',
    tagline: 'Full-funnel Facebook & Instagram advertising campaign system',
    description: 'Comprehensive paid social strategy combining top-of-funnel creative testing, mid-funnel social proof ads, and bottom-of-funnel instant form lead generation.',
    category: 'Meta Ads',
    tools: ['Meta Ads Manager', 'Facebook Pixel', 'Conversions API', 'Creative Angle Framework'],
    thumbnail: '/src/assets/images/project_web_platform_1794419929993.jpg',
    isDemoSample: true,
    featured: false,
    caseStudy: {
      clientType: 'Direct-to-Consumer & Premium Lifestyle Brand',
      targetMarket: 'Canada & United States',
      challenge: 'Ad fatigue and rising acquisition costs on traditional single-image social ads across Meta platforms.',
      strategy: 'Implemented dynamic angle testing (problem/solution, UGC-style hooks, product teardowns) paired with custom audience retargeting pools for 30-day website visitors.',
      deliverables: [
        '3-tier funnel architecture (Prospecting, Consideration, Retargeting)',
        'Copywriting angles tailored to distinct customer pain points',
        'Meta Pixel and standard event tracking setup',
        'Lead form sequence with qualifying questions'
      ],
      outcomes: [
        'Engineered systematically to combat creative saturation',
        'Streamlined mobile form capture with near-zero drop-off',
        'Documented guidelines for scaling ad spend responsibly'
      ]
    },
    liveDemoUrl: 'https://asadaliawan.com/portfolio#demo-meta-ads'
  },
  {
    id: 'project-ai-creatives',
    name: 'SynthStudio — AI Generative Marketing Assets & Prompt Suite',
    tagline: 'AI visual generation workflows for modern ad campaigns and branding',
    description: 'A curated framework demonstrating prompt engineering, high-fidelity AI imagery for advertising, brand asset generation, and automated creative production.',
    category: 'AI Creative Projects',
    tools: ['Gemini / Imagen 3', 'Prompt Engineering', 'Midjourney Standards', 'Digital Compositing'],
    thumbnail: '/src/assets/images/project_ai_assistant_1794419930826.jpg',
    isDemoSample: true,
    featured: false,
    caseStudy: {
      clientType: 'Creative Digital Studio & Marketing Agency',
      targetMarket: 'International Clients (US / UK / Global)',
      challenge: 'High cost and slow turnaround times for custom commercial photo shoots needed for social advertising campaigns.',
      strategy: 'Developed precision prompt recipes for editorial-grade commercial assets, studio product lighting, and branded visual backdrops with zero stock photo genericness.',
      deliverables: [
        'Curated prompt engineering recipe book for commercial visuals',
        'Asset generation pipeline for ad mockups and web hero banners',
        'Style consistency guidelines for brand cohesion',
        'Resolution and aspect-ratio optimization protocols'
      ],
      outcomes: [
        'Instant generation of commercial-grade visual assets',
        'Elimination of repetitive stock photo licensing fees',
        'Distinctive custom visual identity tailored for modern web interfaces'
      ]
    },
    liveDemoUrl: 'https://asadaliawan.com/portfolio#demo-ai-creatives'
  }
];

export const SKILL_GROUPS: SkillCategory[] = [
  {
    categoryName: 'Digital Marketing & Growth',
    description: 'Performance-driven acquisition, search dominance, and conversion optimization.',
    skills: [
      { name: 'Search Engine Optimization (SEO)', level: 'Specialist', focusArea: 'Technical audits, on-page architecture, keyword intent' },
      { name: 'Google Ads Management', level: 'Specialist', focusArea: 'Search campaigns, bidding strategies, negative keyword hygiene' },
      { name: 'Meta Ads Management', level: 'Specialist', focusArea: 'Facebook & Instagram funnels, custom audiences, CAPI' },
      { name: 'Facebook Advertising', level: 'Advanced', focusArea: 'Interest targeting, lookalikes, creative testing' },
      { name: 'Instagram Advertising', level: 'Advanced', focusArea: 'Visual storytelling, Stories/Reels ads, engagement' },
      { name: 'YouTube Advertising', level: 'Proficient', focusArea: 'In-stream video campaigns, hook testing, viewer targeting' },
      { name: 'TikTok Advertising', level: 'Proficient', focusArea: 'Short-form ad formats, trend alignment, mobile conversions' },
      { name: 'Lead Generation', level: 'Specialist', focusArea: 'B2B qualification funnels, landing page alignment, instant forms' },
      { name: 'Conversion Optimization (CRO)', level: 'Advanced', focusArea: 'Friction reduction, call-to-action placement, user flow' }
    ]
  },
  {
    categoryName: 'Web Development & UI/UX',
    description: 'Clean, semantic, accessible, and high-performance modern web engineering.',
    skills: [
      { name: 'HTML5 & Semantic Markup', level: 'Specialist', focusArea: 'Accessibility, valid hierarchy, SEO crawlability' },
      { name: 'CSS3 & Modern Styling', level: 'Specialist', focusArea: 'Flexbox, CSS Grid, animations, CSS variables' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', focusArea: 'Asynchronous flows, DOM manipulation, state logic' },
      { name: 'TypeScript', level: 'Advanced', focusArea: 'Type safety, clean interfaces, maintainable codebases' },
      { name: 'React', level: 'Specialist', focusArea: 'Functional components, hooks, performance memoization' },
      { name: 'Tailwind CSS', level: 'Specialist', focusArea: 'Utility-first styling, design system tokens, responsive variants' },
      { name: 'Responsive Web Design', level: 'Specialist', focusArea: 'Mobile-first breakpoints, touch targets, fluid layouts' },
      { name: 'UI/UX Design', level: 'Advanced', focusArea: 'Visual hierarchy, typography, zero-pill discipline, UX flows' }
    ]
  },
  {
    categoryName: 'AI & Emerging Technology',
    description: 'Leveraging modern generative AI models and automation for business efficiency.',
    skills: [
      { name: 'AI Chatbots', level: 'Specialist', focusArea: 'Conversational design, state routing, lead capture' },
      { name: 'Prompt Engineering', level: 'Specialist', focusArea: 'System prompts, few-shot examples, parameter tuning' },
      { name: 'AI Image Generation', level: 'Advanced', focusArea: 'Commercial photorealistic prompts, lighting, composition' },
      { name: 'AI Video Generation', level: 'Proficient', focusArea: 'Generative video concepts, visual storyboard generation' },
      { name: 'AI Automation Concepts', level: 'Advanced', focusArea: 'Workflow integration, webhook data routing, lead qualification' }
    ]
  }
];

export const PROFESSIONAL_TOOLS: ToolItem[] = [
  { name: 'Google Analytics 4', role: 'Traffic analysis, user attribution, and conversion path tracking', category: 'Analytics & SEO' },
  { name: 'Google Search Console', role: 'Indexation monitoring, query performance, and Core Web Vitals', category: 'Analytics & SEO' },
  { name: 'Google Ads Manager', role: 'PPC search, display, and audience campaign deployment', category: 'Advertising & Growth' },
  { name: 'Meta Ads Manager', role: 'Facebook & Instagram campaign creation, budget pacing, and CAPI', category: 'Advertising & Growth' },
  { name: 'WordPress', role: 'Content management, SEO schema, and business site architecture', category: 'Development' },
  { name: 'Visual Studio Code', role: 'Modern code engineering, TypeScript, and version control', category: 'Development' },
  { name: 'Git & GitHub', role: 'Source code management, collaboration, and repository hosting', category: 'Development' },
  { name: 'Vite & Modern Tooling', role: 'High-speed build pipelines and optimized asset bundling', category: 'Development' },
  { name: 'Figma', role: 'Wireframing, interface prototypes, and design system planning', category: 'Design & AI' }
];

export const WORK_PROCESS = [
  {
    step: '01',
    title: 'Discovery & Strategic Alignment',
    description: 'We analyze your current digital presence, identify market opportunities in your target geographies (US, UK, CA, AU), define target buyer personas, and agree on clear performance objectives.'
  },
  {
    step: '02',
    title: 'Architecture & Execution',
    description: 'Whether launching an SEO campaign, building a high-speed website, or setting up targeted Google/Meta ad funnels, work is executed with clean engineering, precise copywriting, and tracking verification.'
  },
  {
    step: '03',
    title: 'Testing & Optimization',
    description: 'Every element is scrutinized: ad search queries are refined, on-page metrics and Core Web Vitals are benchmarked, conversion tracking is verified, and ad creative angles are tested.'
  },
  {
    step: '04',
    title: 'Scaled Growth & Transparent Reporting',
    description: 'Continuous monitoring, transparent communication, and iterative improvements that compound over time, providing sustainable returns on your digital investment.'
  }
];
