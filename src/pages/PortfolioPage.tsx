import React, { useState } from 'react';
import { 
  Plus, 
  ExternalLink, 
  Sparkles, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Filter, 
  Layers, 
  ArrowUpRight,
  X,
  Check
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { Project, ProjectCategory } from '../types';
import { SEOHead } from '../components/common/SEOHead';
import { ProjectModal } from '../components/common/ProjectModal';
import { useLeadFormNavigation } from '../hooks/useLeadFormNavigation';

export const PortfolioPage: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, resetProjects } = useProfile();
  const { scrollToLeadForm } = useLeadFormNavigation();
  
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  
  // Project Manager Form modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Form inputs
  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState<ProjectCategory>('Website Development');
  const [formTools, setFormTools] = useState('React, TypeScript, Tailwind CSS');
  const [formThumbnail, setFormThumbnail] = useState('/src/assets/images/project_web_platform_1794419929993.jpg');
  const [formChallenge, setFormChallenge] = useState('');
  const [formStrategy, setFormStrategy] = useState('');

  const categories: ProjectCategory[] = [
    'All',
    'Website Development',
    'SEO Projects',
    'Google Ads',
    'Meta Ads',
    'AI Chatbots',
    'AI Creative Projects'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const handleOpenAddModal = () => {
    setIsNewProject(true);
    setEditingProject(null);
    setFormName('');
    setFormTagline('');
    setFormDesc('');
    setFormCategory('Website Development');
    setFormTools('React, TypeScript, Tailwind CSS');
    setFormThumbnail('/src/assets/images/project_web_platform_1794419929993.jpg');
    setFormChallenge('Client needed a high-performance web experience to boost conversion rates.');
    setFormStrategy('Engineered modern component architecture with rigorous SEO and responsive UI.');
    setIsEditModalOpen(true);
  };

  const handleOpenEditModal = (p: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNewProject(false);
    setEditingProject(p);
    setFormName(p.name);
    setFormTagline(p.tagline);
    setFormDesc(p.description);
    setFormCategory(p.category);
    setFormTools(p.tools.join(', '));
    setFormThumbnail(p.thumbnail);
    setFormChallenge(p.caseStudy.challenge);
    setFormStrategy(p.caseStudy.strategy);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formDesc.trim()) return;

    const parsedTools = formTools.split(',').map((t) => t.trim()).filter(Boolean);

    if (isNewProject) {
      const newProj: Project = {
        id: `proj_${Date.now()}`,
        name: formName.trim(),
        tagline: formTagline.trim() || 'Custom Client Initiative',
        description: formDesc.trim(),
        category: formCategory,
        tools: parsedTools,
        thumbnail: formThumbnail.trim() || '/src/assets/images/project_web_platform_1794419929993.jpg',
        isDemoSample: false,
        featured: false,
        caseStudy: {
          clientType: 'Commercial Enterprise Client',
          targetMarket: 'United States & Canada',
          challenge: formChallenge.trim(),
          strategy: formStrategy.trim(),
          deliverables: ['Custom Architecture Implementation', 'Performance Benchmarking', 'Conversion Tracking'],
          outcomes: ['Verified functional execution', 'Semantic accessibility compliance']
        }
      };
      addProject(newProj);
    } else if (editingProject) {
      const updatedProj: Project = {
        ...editingProject,
        name: formName.trim(),
        tagline: formTagline.trim(),
        description: formDesc.trim(),
        category: formCategory,
        tools: parsedTools,
        thumbnail: formThumbnail.trim(),
        caseStudy: {
          ...editingProject.caseStudy,
          challenge: formChallenge.trim(),
          strategy: formStrategy.trim()
        }
      };
      updateProject(updatedProj);
    }

    setIsEditModalOpen(false);
  };

  return (
    <>
      <SEOHead
        title="Portfolio & Case Studies — Asad Ali Awan"
        description="Explore curated portfolio projects across website development, SEO architecture, Google & Meta Ads funnels, and AI chatbot automation."
        path="/portfolio"
        keywords={[
          'Web Development Portfolio',
          'SEO Case Studies',
          'Google Ads Campaigns',
          'Meta Ads Case Studies',
          'AI Chatbot Prototypes'
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* ========================================================= */}
        {/* HEADER & PORTFOLIO MANAGEMENT CONTROLS                   */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#16B89A] tracking-wider uppercase">
              <span>Work &amp; Case Studies</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Production &amp; Prototypes</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Selected Works &amp; Architecture Case Studies.
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Curated project slots illustrating execution across web development, search engine strategy, paid advertising funnels, and AI automation.
            </p>
          </div>

          {/* Project Management Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] text-white text-xs font-semibold transition-colors shadow-md shadow-[#1769FF]/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Reset portfolio projects back to default showcase?')) {
                  resetProjects();
                }
              }}
              title="Reset portfolio to initial demo projects"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TRANSPARENCY NOTICE (PROMPT REQUIREMENT)                  */}
        {/* ========================================================= */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16B89A]" />
            <span>
              <strong>Authentic Portfolio Notice:</strong> Displayed slots feature architecture demonstration models until proprietary client data is authorized for public release.
            </span>
          </div>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            You can add, edit, or remove any project above.
          </span>
        </div>

        {/* ========================================================= */}
        {/* CATEGORY FILTER TABS                                      */}
        {/* ========================================================= */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#1769FF] text-white font-semibold shadow-sm shadow-[#1769FF]/20'
                    : 'bg-[#17243A]/40 text-slate-400 hover:text-white hover:bg-[#17243A]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* PROJECT GALLERY GRID                                      */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProjectModal(project)}
              className="group cursor-pointer rounded-2xl bg-[#17243A]/40 hover:bg-[#17243A]/80 border border-slate-800 hover:border-slate-700 transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[10px] font-medium text-slate-200 bg-slate-900/85 backdrop-blur-sm px-2.5 py-0.5 rounded border border-slate-700">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Management Edit/Delete Quick Actions */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleOpenEditModal(project, e)}
                      className="p-1.5 rounded-lg bg-black/80 text-slate-200 hover:text-white hover:bg-black transition-colors"
                      title="Edit this project"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(project.id, e)}
                      className="p-1.5 rounded-lg bg-rose-950/80 text-rose-300 hover:text-white hover:bg-rose-900 transition-colors"
                      title="Delete this project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h2 className="text-base font-bold text-white group-hover:text-[#1769FF] transition-colors line-clamp-1">
                    {project.name}
                  </h2>
                  <p className="text-xs text-[#16B89A] font-medium">
                    {project.tagline}
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1">
                    {project.tools.map((tool) => (
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

              {/* Bottom Actions */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1769FF] group-hover:text-[#3d83ff] transition-colors inline-flex items-center gap-1">
                  <span>Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>

                {project.demoComponentKey ? (
                  <span className="text-[11px] text-[#16B89A] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Interactive Sandbox
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    Full Details
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* CUSTOM PROJECT PROPOSAL CTA                               */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#17243A]/40 border border-slate-800 text-center max-w-3xl mx-auto space-y-5">
          <span className="text-xs font-semibold text-[#16B89A] tracking-wider uppercase">
            Start Your Project
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Have a Specific Project Requirement in Mind?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            I work directly with founders, marketing heads, and technical leads to build conversion-focused digital systems. Let&apos;s evaluate your current site and discuss strategic milestones.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => scrollToLeadForm()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] text-white text-xs font-semibold cursor-pointer transition-colors shadow-md shadow-[#1769FF]/20"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </div>

      {/* Project Case Study & Sandbox Modal */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}

      {/* Project Manager Add / Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#17243A] border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white">
                {isNewProject ? 'Add New Portfolio Project' : 'Edit Project Details'}
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProjectForm} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. ApexGrowth — SEO Strategy"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Tagline / Short Subtitle</label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  placeholder="e.g. Technical SEO audit and keyword clustering"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ProjectCategory)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Website Development">Website Development</option>
                    <option value="SEO Projects">SEO Projects</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="AI Chatbots">AI Chatbots</option>
                    <option value="AI Creative Projects">AI Creative Projects</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tools / Tech (comma-separated)</label>
                  <input
                    type="text"
                    value={formTools}
                    onChange={(e) => setFormTools(e.target.value)}
                    placeholder="React, TypeScript, GTM"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Thumbnail Image Path or URL</label>
                <input
                  type="text"
                  value={formThumbnail}
                  onChange={(e) => setFormThumbnail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Case Study: Challenge</label>
                <textarea
                  rows={2}
                  value={formChallenge}
                  onChange={(e) => setFormChallenge(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Case Study: Strategy</label>
                <textarea
                  rows={2}
                  value={formStrategy}
                  onChange={(e) => setFormStrategy(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-700 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1769FF] hover:bg-[#1255d4] rounded-lg text-white font-semibold"
                >
                  {isNewProject ? 'Create Project' : 'Save Changes'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
};
