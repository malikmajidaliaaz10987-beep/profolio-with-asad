import React, { useState } from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, Layers, Globe, Code2, Bot, Send } from 'lucide-react';
import { Project } from '../../types';
import { useProfile } from '../../context/ProfileContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { openHireModal } = useProfile();
  const [activeTab, setActiveTab] = useState<'case-study' | 'interactive-demo'>('case-study');
  
  // Interactive mini-demo states
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Hello! I am OmniAssist, an intelligent lead qualification demo bot. What kind of project are you looking to launch?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // SEO simulator state
  const [seoKeyword, setSeoKeyword] = useState('enterprise cloud migration services');
  const [analyzingSeo, setAnalyzingSeo] = useState(false);
  const [seoResult, setSeoResult] = useState<null | { intent: string; volume: string; difficulty: string; priority: string }>(null);

  if (!project) return null;

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      let botReply = "Thank you! I've noted that requirement. What is your estimated timeline or budget range for this initiative?";
      if (userText.toLowerCase().includes('budget') || userText.toLowerCase().includes('cost')) {
        botReply = "Our solutions are structured for high ROI. We can arrange a custom scope proposal tailored directly to your milestone goals.";
      } else if (userText.toLowerCase().includes('seo') || userText.toLowerCase().includes('google')) {
        botReply = "Excellent choice. Our SEO architecture emphasizes technical crawlability, structured JSON-LD schemas, and high-intent commercial keywords.";
      }
      setChatMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    }, 500);
  };

  const handleSimulateSeo = () => {
    setAnalyzingSeo(true);
    setTimeout(() => {
      setAnalyzingSeo(false);
      setSeoResult({
        intent: 'Commercial / High-Value Transactional',
        volume: '4,800/mo (US + UK)',
        difficulty: 'Medium-High (Topical cluster recommended)',
        priority: 'Tier 1 Target'
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#17243A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/80 bg-[#121c2d]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#16B89A] tracking-wider uppercase">
              {project.category}
            </span>
            {project.isDemoSample && (
              <span className="text-[11px] text-amber-300/90 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                Architectural Demonstration
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-slate-800 bg-[#142033]">
          <button
            onClick={() => setActiveTab('case-study')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'case-study'
                ? 'bg-[#1769FF] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Case Study Overview
          </button>

          {project.demoComponentKey && (
            <button
              onClick={() => setActiveTab('interactive-demo')}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'interactive-demo'
                  ? 'bg-[#16B89A] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Sandbox</span>
            </button>
          )}
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {activeTab === 'case-study' ? (
            <>
              {/* Media & Headline */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-5 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-lg">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-56 object-cover object-top"
                  />
                </div>
                
                <div className="md:col-span-7 space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {project.name}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    {project.tagline}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Case Study Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Globe className="w-4 h-4 text-[#1769FF]" />
                    <span>Client Profile & Market</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    <strong className="text-slate-200">Sector:</strong> {project.caseStudy.clientType}
                  </p>
                  <p className="text-xs text-slate-400">
                    <strong className="text-slate-200">Geography:</strong> {project.caseStudy.targetMarket}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Layers className="w-4 h-4 text-[#16B89A]" />
                    <span>Technical Architecture</span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono">
                    {project.caseStudy.technicalArchitecture || 'Modern Full-Stack & Conversion Framework'}
                  </p>
                </div>

              </div>

              {/* Problem & Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    The Challenge
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.caseStudy.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1.5">
                  <h4 className="text-xs font-bold text-[#16B89A] uppercase tracking-wider">
                    The Strategic Approach
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.caseStudy.strategy}
                  </p>
                </div>
              </div>

              {/* Deliverables & Outcomes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Core Deliverables
                  </h4>
                  <ul className="space-y-1.5">
                    {project.caseStudy.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1769FF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-[#16B89A] uppercase tracking-wider">
                    Key Outcomes & Impact
                  </h4>
                  <ul className="space-y-1.5">
                    {project.caseStudy.outcomes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16B89A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            /* Interactive Sandbox Mode */
            <div className="space-y-4">
              {project.demoComponentKey === 'chatbot-demo' && (
                <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-4 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-[#16B89A]" />
                      <span className="text-sm font-semibold">OmniAssist Live Demo Terminal</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Interactive Simulation</span>
                  </div>

                  <div className="h-60 overflow-y-auto space-y-3 p-3 bg-[#101827] rounded-lg border border-slate-800 text-xs">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] px-3 py-2 rounded-xl text-xs ${
                            msg.sender === 'user'
                              ? 'bg-[#1769FF] text-white'
                              : 'bg-slate-800 text-slate-200 border border-slate-700'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendChat} className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about website development, SEO, or campaign pricing..."
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#16B89A]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#16B89A] hover:bg-[#139c82] text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Send</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

              {project.demoComponentKey === 'seo-demo' && (
                <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#1769FF]" />
                      <span className="text-sm font-semibold">ApexTech Keyword Intent Analyzer</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Simulation Framework</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-300">Target Keyword or Service Phrase</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={seoKeyword}
                        onChange={(e) => setSeoKeyword(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#1769FF]"
                      />
                      <button
                        type="button"
                        onClick={handleSimulateSeo}
                        disabled={analyzingSeo}
                        className="px-4 py-2 bg-[#1769FF] hover:bg-[#1255d4] text-white rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-50"
                      >
                        {analyzingSeo ? 'Analyzing...' : 'Analyze Keyword'}
                      </button>
                    </div>
                  </div>

                  {seoResult && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                      <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
                        <span className="text-slate-400 block text-[10px]">Search Intent</span>
                        <span className="font-semibold text-white mt-1 block">{seoResult.intent}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
                        <span className="text-slate-400 block text-[10px]">Target Volume</span>
                        <span className="font-semibold text-[#16B89A] mt-1 block">{seoResult.volume}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
                        <span className="text-slate-400 block text-[10px]">SERP Competition</span>
                        <span className="font-semibold text-amber-300 mt-1 block">{seoResult.difficulty}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
                        <span className="text-slate-400 block text-[10px]">Cluster Status</span>
                        <span className="font-semibold text-[#1769FF] mt-1 block">{seoResult.priority}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {project.demoComponentKey === 'saas-demo' && (
                <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-[#1769FF]" />
                      <span className="text-sm font-semibold">FluxFlow Responsive Layout Inspection</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Interactive Viewport Inspector</span>
                  </div>

                  <p className="text-xs text-slate-300">
                    FluxFlow demonstrates modern component architecture with real-time responsive scaling, single-elevation cards, zero-pill discipline, and sub-2s rendering.
                  </p>

                  <div className="p-4 rounded-xl bg-[#101827] border border-slate-800 text-xs space-y-3">
                    <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                      <span>Render Benchmark</span>
                      <span className="text-[#16B89A] font-mono">1.2s Fast Initial Paint</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                      <span>Core Web Vitals</span>
                      <span className="text-[#16B89A] font-mono">LCP: 1.4s · CLS: 0.00 · FID: 12ms</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Theme System</span>
                      <span className="text-slate-200">Semantic CSS Variables + Tailwind v4 Dark Variant</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700/80 bg-[#121c2d]">
          <span className="text-xs text-slate-400">
            Interested in a similar deployment for your business?
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                openHireModal(project.name);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1769FF] hover:bg-[#1255d4] text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              <span>Discuss This Project</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
