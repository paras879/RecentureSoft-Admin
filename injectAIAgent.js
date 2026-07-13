const fs = require('fs');
const path = require('path');

const pagePath = "c:/Users/Paras Tomar/OneDrive/Desktop/RecentureSoft-Admin/app/admin/(dashboard)/website-pages/page.jsx";
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Inject the tab buttons for AI Agent Development
const tabsInjectionPoint = `                                {editPage.path === "/generative-ai" && (`;
const aiAgentTabsButtons = `                                {editPage.path === "/ai-agent-development" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("agent-hero")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'agent-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("agent-techlogos")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'agent-techlogos' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Code className="w-4 h-4" /> Tech Logos
                                        </button>
                                        <button onClick={() => setActiveEditTab("agent-about")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'agent-about' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Layers className="w-4 h-4" /> About Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("agent-services")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'agent-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Package className="w-4 h-4" /> Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("agent-solutions")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'agent-solutions' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Briefcase className="w-4 h-4" /> Solutions
                                        </button>
                                        <button onClick={() => setActiveEditTab("agent-whychoose")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'agent-whychoose' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Star className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button onClick={() => setActiveEditTab("agent-casestudies")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'agent-casestudies' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <FileText className="w-4 h-4" /> Case Studies
                                        </button>
                                        <button onClick={() => setActiveEditTab("agent-cta")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'agent-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <ArrowRight className="w-4 h-4" /> CTA
                                        </button>
                                    </>
                                )}
`;

if (content.includes(tabsInjectionPoint)) {
    if (!content.includes('editPage.path === "/ai-agent-development"')) {
        content = content.replace(tabsInjectionPoint, aiAgentTabsButtons + tabsInjectionPoint);
        console.log("Successfully injected AI Agent Development tab buttons");
    } else {
        console.log("Tab buttons already exist");
    }
} else {
    console.log("Failed to find tab buttons injection point");
}

const uiInjectionPoint = `                     {activeEditTab === "genai-hero" && editPage.path === "/generative-ai" && (`;
const aiAgentUI = `
                     {/* AI AGENT DEVELOPMENT: HERO */}
                     {activeEditTab === "agent-hero" && editPage.path === "/ai-agent-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Hero Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.aiDevelopmentHero?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentHero: { ...editFormData.content?.aiDevelopmentHero, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="AI Development" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title Highlight</label>
                                    <input type="text" value={editFormData.content?.aiDevelopmentHero?.titleHighlight || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentHero: { ...editFormData.content?.aiDevelopmentHero, titleHighlight: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Services" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea value={editFormData.content?.aiDevelopmentHero?.description || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentHero: { ...editFormData.content?.aiDevelopmentHero, description: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 min-h-[80px]" placeholder="Build intelligent AI-powered software solutions..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Primary Button Text</label>
                                    <input type="text" value={editFormData.content?.aiDevelopmentHero?.primaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentHero: { ...editFormData.content?.aiDevelopmentHero, primaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Get Free Consultation" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Secondary Button Text</label>
                                    <input type="text" value={editFormData.content?.aiDevelopmentHero?.secondaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentHero: { ...editFormData.content?.aiDevelopmentHero, secondaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Talk to AI Experts" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Hero Image</label>
                                    <ImageUploader
                                        onUpload={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentHero: { ...editFormData.content?.aiDevelopmentHero, image: url } } })}
                                        defaultImage={editFormData.content?.aiDevelopmentHero?.image || "/images/ai-development/hero_ai_development.webp"}
                                    />
                                </div>
                            </div>
                        </div>
                     )}

                     {/* AI AGENT DEVELOPMENT: TECH LOGOS */}
                     {activeEditTab === "agent-techlogos" && editPage.path === "/ai-agent-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Tech Logos Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.aiDevelopmentTechLogos?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentTechLogos: { ...editFormData.content?.aiDevelopmentTechLogos, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="AI Technologies We Specialize In" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                                    <textarea value={editFormData.content?.aiDevelopmentTechLogos?.tags ? editFormData.content.aiDevelopmentTechLogos.tags.join(', ') : ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentTechLogos: { ...editFormData.content?.aiDevelopmentTechLogos, tags: e.target.value.split(',').map(s => s.trim()) } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="OpenAI, Gemini, Claude..." />
                                </div>
                            </div>
                        </div>
                     )}

                     {/* AI AGENT DEVELOPMENT: ABOUT */}
                     {activeEditTab === "agent-about" && editPage.path === "/ai-agent-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">About Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Heading</label>
                                    <input type="text" value={editFormData.content?.aiDevelopmentAbout?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentAbout: { ...editFormData.content?.aiDevelopmentAbout, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Empowering Businesses with Custom AI" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea value={editFormData.content?.aiDevelopmentAbout?.desc1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentAbout: { ...editFormData.content?.aiDevelopmentAbout, desc1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 min-h-[80px]" placeholder="At RecentureSoft, we don't just build AI..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">About Image</label>
                                    <ImageUploader
                                        onUpload={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentAbout: { ...editFormData.content?.aiDevelopmentAbout, image: url } } })}
                                        defaultImage={editFormData.content?.aiDevelopmentAbout?.image || "/images/ai-development/about_ai_development.webp"}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Stats</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.aiDevelopmentAbout?.stats || []).map((stat, idx) => (
                                            <div key={idx} className="flex gap-4 items-center bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                                                <input type="text" value={stat.stat} onChange={(e) => {
                                                    const newStats = [...(editFormData.content?.aiDevelopmentAbout?.stats || [])];
                                                    newStats[idx].stat = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentAbout: { ...editFormData.content?.aiDevelopmentAbout, stats: newStats } } });
                                                }} className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="200+" />
                                                <input type="text" value={stat.label} onChange={(e) => {
                                                    const newStats = [...(editFormData.content?.aiDevelopmentAbout?.stats || [])];
                                                    newStats[idx].label = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentAbout: { ...editFormData.content?.aiDevelopmentAbout, stats: newStats } } });
                                                }} className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Projects Consulted" />
                                                <button type="button" onClick={() => {
                                                    const newStats = (editFormData.content?.aiDevelopmentAbout?.stats || []).filter((_, i) => i !== idx);
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentAbout: { ...editFormData.content?.aiDevelopmentAbout, stats: newStats } } });
                                                }} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newStats = [...(editFormData.content?.aiDevelopmentAbout?.stats || []), { stat: "", label: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentAbout: { ...editFormData.content?.aiDevelopmentAbout, stats: newStats } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Stat
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* AI AGENT DEVELOPMENT: SERVICES */}
                     {activeEditTab === "agent-services" && editPage.path === "/ai-agent-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Services Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.aiDevelopmentServices?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentServices: { ...editFormData.content?.aiDevelopmentServices, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Our Core AI Services" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Service Cards</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.aiDevelopmentServices?.cards || []).map((card, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Card #{idx + 1}</h4>
                                                    <button type="button" onClick={() => {
                                                        const newCards = (editFormData.content?.aiDevelopmentServices?.cards || []).filter((_, i) => i !== idx);
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentServices: { ...editFormData.content?.aiDevelopmentServices, cards: newCards } } });
                                                    }} className="text-red-500 hover:text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <input type="text" value={card.title} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiDevelopmentServices?.cards || [])];
                                                    newCards[idx].title = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentServices: { ...editFormData.content?.aiDevelopmentServices, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Title" />
                                                <textarea value={card.desc} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiDevelopmentServices?.cards || [])];
                                                    newCards[idx].desc = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentServices: { ...editFormData.content?.aiDevelopmentServices, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Description" rows={2} />
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newCards = [...(editFormData.content?.aiDevelopmentServices?.cards || []), { title: "", desc: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentServices: { ...editFormData.content?.aiDevelopmentServices, cards: newCards } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Service Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* AI AGENT DEVELOPMENT: SOLUTIONS */}
                     {activeEditTab === "agent-solutions" && editPage.path === "/ai-agent-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Solutions Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.aiDevelopmentSolutions?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentSolutions: { ...editFormData.content?.aiDevelopmentSolutions, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Business Challenges We Solve" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Solution Cards</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.aiDevelopmentSolutions?.cards || []).map((card, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Card #{idx + 1}</h4>
                                                    <button type="button" onClick={() => {
                                                        const newCards = (editFormData.content?.aiDevelopmentSolutions?.cards || []).filter((_, i) => i !== idx);
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentSolutions: { ...editFormData.content?.aiDevelopmentSolutions, cards: newCards } } });
                                                    }} className="text-red-500 hover:text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <input type="text" value={card.title} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiDevelopmentSolutions?.cards || [])];
                                                    newCards[idx].title = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentSolutions: { ...editFormData.content?.aiDevelopmentSolutions, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Title" />
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newCards = [...(editFormData.content?.aiDevelopmentSolutions?.cards || []), { title: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentSolutions: { ...editFormData.content?.aiDevelopmentSolutions, cards: newCards } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Solution Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* AI AGENT DEVELOPMENT: WHY CHOOSE */}
                     {activeEditTab === "agent-whychoose" && editPage.path === "/ai-agent-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Why Choose Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.aiDevelopmentWhyChoose?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentWhyChoose: { ...editFormData.content?.aiDevelopmentWhyChoose, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Why Choose RecentureSoft" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Why Choose Cards</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.aiDevelopmentWhyChoose?.cards || []).map((card, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Card #{idx + 1}</h4>
                                                    <button type="button" onClick={() => {
                                                        const newCards = (editFormData.content?.aiDevelopmentWhyChoose?.cards || []).filter((_, i) => i !== idx);
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentWhyChoose: { ...editFormData.content?.aiDevelopmentWhyChoose, cards: newCards } } });
                                                    }} className="text-red-500 hover:text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <input type="text" value={card.title} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiDevelopmentWhyChoose?.cards || [])];
                                                    newCards[idx].title = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentWhyChoose: { ...editFormData.content?.aiDevelopmentWhyChoose, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Title" />
                                                <textarea value={card.desc} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiDevelopmentWhyChoose?.cards || [])];
                                                    newCards[idx].desc = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentWhyChoose: { ...editFormData.content?.aiDevelopmentWhyChoose, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Description" rows={2} />
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newCards = [...(editFormData.content?.aiDevelopmentWhyChoose?.cards || []), { title: "", desc: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentWhyChoose: { ...editFormData.content?.aiDevelopmentWhyChoose, cards: newCards } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Why Choose Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* AI AGENT DEVELOPMENT: CASE STUDIES */}
                     {activeEditTab === "agent-casestudies" && editPage.path === "/ai-agent-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Case Studies Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.aiDevelopmentCaseStudies?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentCaseStudies: { ...editFormData.content?.aiDevelopmentCaseStudies, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Development Case Studies" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Case Study Cards</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.aiDevelopmentCaseStudies?.cards || []).map((card, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Card #{idx + 1}</h4>
                                                    <button type="button" onClick={() => {
                                                        const newCards = (editFormData.content?.aiDevelopmentCaseStudies?.cards || []).filter((_, i) => i !== idx);
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentCaseStudies: { ...editFormData.content?.aiDevelopmentCaseStudies, cards: newCards } } });
                                                    }} className="text-red-500 hover:text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <input type="text" value={card.title} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiDevelopmentCaseStudies?.cards || [])];
                                                    newCards[idx].title = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentCaseStudies: { ...editFormData.content?.aiDevelopmentCaseStudies, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Title" />
                                                <input type="text" value={card.problem} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiDevelopmentCaseStudies?.cards || [])];
                                                    newCards[idx].problem = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentCaseStudies: { ...editFormData.content?.aiDevelopmentCaseStudies, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Problem" />
                                                <input type="text" value={card.solution} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiDevelopmentCaseStudies?.cards || [])];
                                                    newCards[idx].solution = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentCaseStudies: { ...editFormData.content?.aiDevelopmentCaseStudies, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Solution" />
                                                <input type="text" value={card.result} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiDevelopmentCaseStudies?.cards || [])];
                                                    newCards[idx].result = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentCaseStudies: { ...editFormData.content?.aiDevelopmentCaseStudies, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Result" />
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Image</label>
                                                    <ImageUploader
                                                        onUpload={(url) => {
                                                            const newCards = [...(editFormData.content?.aiDevelopmentCaseStudies?.cards || [])];
                                                            newCards[idx].image = url;
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentCaseStudies: { ...editFormData.content?.aiDevelopmentCaseStudies, cards: newCards } } });
                                                        }}
                                                        defaultImage={card.image || "/images/ai-development/case_study_document.webp"}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newCards = [...(editFormData.content?.aiDevelopmentCaseStudies?.cards || []), { title: "", problem: "", solution: "", result: "", image: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentCaseStudies: { ...editFormData.content?.aiDevelopmentCaseStudies, cards: newCards } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Case Study
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* AI AGENT DEVELOPMENT: CTA */}
                     {activeEditTab === "agent-cta" && editPage.path === "/ai-agent-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CTA Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.aiDevelopmentCTA?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentCTA: { ...editFormData.content?.aiDevelopmentCTA, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Ready to Develop Your AI Solution?" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea value={editFormData.content?.aiDevelopmentCTA?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentCTA: { ...editFormData.content?.aiDevelopmentCTA, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 min-h-[80px]" placeholder="Contact our experts..." />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Primary Button Text</label>
                                        <input type="text" value={editFormData.content?.aiDevelopmentCTA?.primaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentCTA: { ...editFormData.content?.aiDevelopmentCTA, primaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Book Free Consultation" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Secondary Button Text</label>
                                        <input type="text" value={editFormData.content?.aiDevelopmentCTA?.secondaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiDevelopmentCTA: { ...editFormData.content?.aiDevelopmentCTA, secondaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Contact Us" />
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}
`;

if (content.includes(uiInjectionPoint)) {
    if (!content.includes('activeEditTab === "agent-hero"')) {
        content = content.replace(uiInjectionPoint, aiAgentUI + uiInjectionPoint);
        console.log("Successfully injected AI Agent Development UI");
    } else {
        console.log("UI already exists");
    }
} else {
    console.log("Failed to find UI injection point");
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log("File saved successfully.");
