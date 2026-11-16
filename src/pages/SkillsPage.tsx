import React, { useState } from 'react';
import { 
  Search, 
  Target, 
  Code2, 
  Cpu, 
  Wrench, 
  CheckCircle2, 
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import { SKILL_GROUPS, PROFESSIONAL_TOOLS } from '../data/portfolioData';
import { SEOHead } from '../components/common/SEOHead';
import { useLeadFormNavigation } from '../hooks/useLeadFormNavigation';

export const SkillsPage: React.FC = () => {
  const { scrollToLeadForm } = useLeadFormNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Marketing' | 'Development' | 'AI' | 'Tools'>('All');

  const filteredSkillGroups = SKILL_GROUPS.map((group) => {
    const matchesSearch = group.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.focusArea.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...group, skills: matchesSearch };
  }).filter((group) => {
    if (selectedCategory === 'Marketing') return group.categoryName.includes('Marketing');
    if (selectedCategory === 'Development') return group.categoryName.includes('Development');
    if (selectedCategory === 'AI') return group.categoryName.includes('AI');
    return group.skills.length > 0;
  });

  const filteredTools = PROFESSIONAL_TOOLS.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEOHead
        title="Skills & Expertise Dashboard — Asad Ali Awan"
        description="Explore the technical and marketing competencies of Asad Ali Awan: SEO, Google & Meta Ads, React, TypeScript, Prompt Engineering, and AI Automations."
        path="/skills"
        keywords={[
          'Digital Marketing Skills',
          'SEO Specialist Skills',
          'Google Ads Manager Expertise',
          'React Web Development Skills',
          'Prompt Engineering AI'
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* ========================================================= */}
        {/* HEADER & SEARCH CONTROLS                                  */}
        {/* ========================================================= */}
        <div className="space-y-6 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1769FF] tracking-wider uppercase">
            <span>Competency Dashboard</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Technical &amp; Marketing Proficiency</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Skills, Technologies &amp; Professional Tooling.
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            A comprehensive matrix of professional skills developed through practical hands-on implementation across performance marketing, modern web engineering, and artificial intelligence.
          </p>

          {/* Interactive Search Bar & Filters */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search any skill, tool, or discipline (e.g. SEO, React, Google Ads)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#17243A]/60 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#1769FF] transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {(['All', 'Marketing', 'Development', 'AI', 'Tools'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#1769FF] text-white shadow-sm'
                      : 'bg-[#17243A]/40 text-slate-400 hover:text-white hover:bg-[#17243A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SKILLS CATEGORIES SECTION                                 */}
        {/* ========================================================= */}
        {(selectedCategory === 'All' || selectedCategory !== 'Tools') && (
          <div className="space-y-10">
            {filteredSkillGroups.map((group) => (
              <div
                key={group.categoryName}
                className="p-8 sm:p-10 rounded-3xl bg-[#17243A]/30 border border-slate-800 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      {group.categoryName}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {group.description}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#16B89A]">
                    {group.skills.length} Competencies
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-white">{skill.name}</span>
                          <span className="text-[11px] font-mono text-slate-400">{skill.level}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {skill.focusArea}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 text-[#16B89A]">
                          <CheckCircle2 className="w-3 h-3" />
                          Applied Competency
                        </span>
                        <button
                          type="button"
                          onClick={() => scrollToLeadForm(skill.name)}
                          className="text-[#1769FF] hover:text-[#3d83ff] transition-colors cursor-pointer"
                        >
                          Request a Quote
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* PROFESSIONAL TOOLS DASHBOARD                              */}
        {/* ========================================================= */}
        {(selectedCategory === 'All' || selectedCategory === 'Tools') && (
          <div className="p-8 sm:p-10 rounded-3xl bg-[#17243A]/30 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Professional Tools &amp; Ecosystem
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Production platforms utilized for data analysis, search auditing, campaign execution, and web development.
                </p>
              </div>
              <span className="text-xs font-mono text-[#1769FF]">
                {filteredTools.length} Standard Platforms
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map((tool) => (
                <div
                  key={tool.name}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/80 text-[#1769FF] shrink-0 mt-0.5">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{tool.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{tool.category}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {tool.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center text-xs text-slate-400">
              <em>Note: Tools and technologies are presented as professional competencies and practical execution instruments, not speculative certifications.</em>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CONSULTATION BANNER                                       */}
        {/* ========================================================= */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-900 to-[#17243A] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-white">
              Looking for a Specific Technical Stack or Campaign Setup?
            </h3>
            <p className="text-xs text-slate-400">
              Let&apos;s evaluate your current tech infrastructure and customer acquisition channels.
            </p>
          </div>

          <button
            type="button"
            onClick={() => scrollToLeadForm()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] text-white text-xs font-semibold cursor-pointer transition-colors shrink-0 shadow-md shadow-[#1769FF]/20"
          >
            <span>Get a Free Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </>
  );
};
