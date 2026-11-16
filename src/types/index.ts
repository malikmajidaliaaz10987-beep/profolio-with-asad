export type ProjectCategory = 
  | 'All'
  | 'Website Development'
  | 'SEO Projects'
  | 'Google Ads'
  | 'Meta Ads'
  | 'AI Chatbots'
  | 'AI Creative Projects';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  tools: string[];
  thumbnail: string;
  isDemoSample: boolean;
  featured: boolean;
  caseStudy: {
    clientType: string;
    targetMarket: string;
    challenge: string;
    strategy: string;
    deliverables: string[];
    outcomes: string[];
    technicalArchitecture?: string;
  };
  liveDemoUrl?: string;
  demoComponentKey?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  subServices: string[];
  benefits: string[];
  deliverables: string[];
  idealFor: string;
  keywords: string[];
}

export interface SkillCategory {
  categoryName: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Specialist", "Advanced", "Proficient"
    focusArea: string;
  }[];
}

export interface ToolItem {
  name: string;
  role: string;
  category: 'Analytics & SEO' | 'Advertising & Growth' | 'Development' | 'Design & AI';
}

export type AvailabilityStatus = 
  | 'Available for Projects'
  | 'Limited Availability'
  | 'Consulting Only'
  | 'Currently Booked';

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  projectType: string;
  budgetRange: string;
  projectDescription: string;
  submittedAt: string;
}
