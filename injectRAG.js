const fs = require('fs');
const path = require('path');

const pagePath = "c:/Users/Paras Tomar/OneDrive/Desktop/RecentureSoft-Admin/app/admin/(dashboard)/website-pages/page.jsx";
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Inject the tab buttons for RAG Development
const tabsInjectionPoint = `                                {editPage.path === "/ai-chatbot-development" && (`;
const ragTabsButtons = `                                {editPage.path === "/rag-development" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("rag-hero")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'rag-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-techlogos")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'rag-techlogos' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Code className="w-4 h-4" /> Tech Logos
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-about")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'rag-about' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Layers className="w-4 h-4" /> About Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-services")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'rag-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Package className="w-4 h-4" /> Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-solutions")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'rag-solutions' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Briefcase className="w-4 h-4" /> Solutions
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-whychoose")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'rag-whychoose' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Star className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-casestudies")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'rag-casestudies' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <FileText className="w-4 h-4" /> Case Studies
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-cta")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'rag-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <ArrowRight className="w-4 h-4" /> CTA
                                        </button>
                                    </>
                                )}
`;

if (content.includes(tabsInjectionPoint)) {
    if (!content.includes('editPage.path === "/rag-development"')) {
        content = content.replace(tabsInjectionPoint, ragTabsButtons + tabsInjectionPoint);
        console.log("Successfully injected RAG Development tab buttons");
    } else {
        console.log("Tab buttons already exist");
    }
} else {
    console.log("Failed to find tab buttons injection point");
}

const uiInjectionPoint = `                     {/* AI CHATBOT DEVELOPMENT: HERO */}`;
const ragUI = `
                     {/* RAG DEVELOPMENT: HERO */}
                     {activeEditTab === "rag-hero" && editPage.path === "/rag-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Hero Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.ragHero?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragHero: { ...editFormData.content?.ragHero, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Enterprise RAG" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title Highlight</label>
                                    <input type="text" value={editFormData.content?.ragHero?.titleHighlight || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragHero: { ...editFormData.content?.ragHero, titleHighlight: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Development Services" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea value={editFormData.content?.ragHero?.description || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragHero: { ...editFormData.content?.ragHero, description: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 min-h-[80px]" placeholder="Build intelligent AI applications..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Primary Button Text</label>
                                    <input type="text" value={editFormData.content?.ragHero?.primaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragHero: { ...editFormData.content?.ragHero, primaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Get Free Consultation" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Secondary Button Text</label>
                                    <input type="text" value={editFormData.content?.ragHero?.secondaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragHero: { ...editFormData.content?.ragHero, secondaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Talk to AI Experts" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Hero Image</label>
                                    <ImageUploader
                                        onUpload={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragHero: { ...editFormData.content?.ragHero, image: url } } })}
                                        defaultImage={editFormData.content?.ragHero?.image || "/images/rag-development/hero_rag.webp"}
                                    />
                                </div>
                            </div>
                        </div>
                     )}

                     {/* RAG DEVELOPMENT: TECH LOGOS */}
                     {activeEditTab === "rag-techlogos" && editPage.path === "/rag-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Tech Logos Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.ragTechLogos?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragTechLogos: { ...editFormData.content?.ragTechLogos, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="AI Technologies We Specialize In" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                                    <textarea value={editFormData.content?.ragTechLogos?.tags ? editFormData.content.ragTechLogos.tags.join(', ') : ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragTechLogos: { ...editFormData.content?.ragTechLogos, tags: e.target.value.split(',').map(s => s.trim()) } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="OpenAI, Gemini, Claude..." />
                                </div>
                            </div>
                        </div>
                     )}

                     {/* RAG DEVELOPMENT: ABOUT */}
                     {activeEditTab === "rag-about" && editPage.path === "/rag-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">About Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Heading</label>
                                    <input type="text" value={editFormData.content?.ragAbout?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragAbout: { ...editFormData.content?.ragAbout, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Unlock Your Data with RAG" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea value={editFormData.content?.ragAbout?.desc1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragAbout: { ...editFormData.content?.ragAbout, desc1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 min-h-[80px]" placeholder="Generative AI is powerful, but it hallucinates..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">About Image</label>
                                    <ImageUploader
                                        onUpload={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragAbout: { ...editFormData.content?.ragAbout, image: url } } })}
                                        defaultImage={editFormData.content?.ragAbout?.image || "/images/rag-development/about_rag.webp"}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Stats</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.ragAbout?.stats || []).map((stat, idx) => (
                                            <div key={idx} className="flex gap-4 items-center bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                                                <input type="text" value={stat.stat} onChange={(e) => {
                                                    const newStats = [...(editFormData.content?.ragAbout?.stats || [])];
                                                    newStats[idx].stat = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ragAbout: { ...editFormData.content?.ragAbout, stats: newStats } } });
                                                }} className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="200+" />
                                                <input type="text" value={stat.label} onChange={(e) => {
                                                    const newStats = [...(editFormData.content?.ragAbout?.stats || [])];
                                                    newStats[idx].label = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ragAbout: { ...editFormData.content?.ragAbout, stats: newStats } } });
                                                }} className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Projects Consulted" />
                                                <button type="button" onClick={() => {
                                                    const newStats = (editFormData.content?.ragAbout?.stats || []).filter((_, i) => i !== idx);
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ragAbout: { ...editFormData.content?.ragAbout, stats: newStats } } });
                                                }} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newStats = [...(editFormData.content?.ragAbout?.stats || []), { stat: "", label: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, ragAbout: { ...editFormData.content?.ragAbout, stats: newStats } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Stat
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* RAG DEVELOPMENT: SERVICES */}
                     {activeEditTab === "rag-services" && editPage.path === "/rag-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Services Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.ragServices?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragServices: { ...editFormData.content?.ragServices, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Our RAG Solutions" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <input type="text" value={editFormData.content?.ragServices?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragServices: { ...editFormData.content?.ragServices, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Custom RAG architectures..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Service Cards</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.ragServices?.cards || []).map((card, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Card #{idx + 1}</h4>
                                                    <button type="button" onClick={() => {
                                                        const newCards = (editFormData.content?.ragServices?.cards || []).filter((_, i) => i !== idx);
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, ragServices: { ...editFormData.content?.ragServices, cards: newCards } } });
                                                    }} className="text-red-500 hover:text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <input type="text" value={card.title} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.ragServices?.cards || [])];
                                                    newCards[idx].title = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ragServices: { ...editFormData.content?.ragServices, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Title" />
                                                <textarea value={card.desc} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.ragServices?.cards || [])];
                                                    newCards[idx].desc = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ragServices: { ...editFormData.content?.ragServices, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Description" rows={2} />
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newCards = [...(editFormData.content?.ragServices?.cards || []), { title: "", desc: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, ragServices: { ...editFormData.content?.ragServices, cards: newCards } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Service Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* RAG DEVELOPMENT: SOLUTIONS */}
                     {activeEditTab === "rag-solutions" && editPage.path === "/rag-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Solutions Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.ragSolutions?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragSolutions: { ...editFormData.content?.ragSolutions, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Business Challenges We Solve" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Solution Cards</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.ragSolutions?.cards || []).map((card, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Card #{idx + 1}</h4>
                                                    <button type="button" onClick={() => {
                                                        const newCards = (editFormData.content?.ragSolutions?.cards || []).filter((_, i) => i !== idx);
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, ragSolutions: { ...editFormData.content?.ragSolutions, cards: newCards } } });
                                                    }} className="text-red-500 hover:text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <input type="text" value={card.title} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.ragSolutions?.cards || [])];
                                                    newCards[idx].title = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ragSolutions: { ...editFormData.content?.ragSolutions, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Title" />
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newCards = [...(editFormData.content?.ragSolutions?.cards || []), { title: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, ragSolutions: { ...editFormData.content?.ragSolutions, cards: newCards } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Solution Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* RAG DEVELOPMENT: WHY CHOOSE */}
                     {activeEditTab === "rag-whychoose" && editPage.path === "/rag-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Why Choose Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.ragWhyChoose?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragWhyChoose: { ...editFormData.content?.ragWhyChoose, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Why Choose RecentureSoft" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Why Choose Cards</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.ragWhyChoose?.cards || []).map((card, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Card #{idx + 1}</h4>
                                                    <button type="button" onClick={() => {
                                                        const newCards = (editFormData.content?.ragWhyChoose?.cards || []).filter((_, i) => i !== idx);
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, ragWhyChoose: { ...editFormData.content?.ragWhyChoose, cards: newCards } } });
                                                    }} className="text-red-500 hover:text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <input type="text" value={card.title} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.ragWhyChoose?.cards || [])];
                                                    newCards[idx].title = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ragWhyChoose: { ...editFormData.content?.ragWhyChoose, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Title" />
                                                <textarea value={card.desc} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.ragWhyChoose?.cards || [])];
                                                    newCards[idx].desc = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ragWhyChoose: { ...editFormData.content?.ragWhyChoose, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Description" rows={2} />
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newCards = [...(editFormData.content?.ragWhyChoose?.cards || []), { title: "", desc: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, ragWhyChoose: { ...editFormData.content?.ragWhyChoose, cards: newCards } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Why Choose Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* RAG DEVELOPMENT: CASE STUDIES */}
                     {activeEditTab === "rag-casestudies" && editPage.path === "/rag-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Case Studies Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.ragCaseStudies?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragCaseStudies: { ...editFormData.content?.ragCaseStudies, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="RAG Case Studies" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Case Study Cards</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.ragCaseStudies?.cards || []).map((card, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Card #{idx + 1}</h4>
                                                    <button type="button" onClick={() => {
                                                        const newCards = (editFormData.content?.ragCaseStudies?.cards || []).filter((_, i) => i !== idx);
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, ragCaseStudies: { ...editFormData.content?.ragCaseStudies, cards: newCards } } });
                                                    }} className="text-red-500 hover:text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <input type="text" value={card.title} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.ragCaseStudies?.cards || [])];
                                                    newCards[idx].title = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ragCaseStudies: { ...editFormData.content?.ragCaseStudies, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Title" />
                                                <input type="text" value={card.problem} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.ragCaseStudies?.cards || [])];
                                                    newCards[idx].problem = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ragCaseStudies: { ...editFormData.content?.ragCaseStudies, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Problem" />
                                                <input type="text" value={card.solution} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.ragCaseStudies?.cards || [])];
                                                    newCards[idx].solution = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ragCaseStudies: { ...editFormData.content?.ragCaseStudies, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Solution" />
                                                <input type="text" value={card.result} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.ragCaseStudies?.cards || [])];
                                                    newCards[idx].result = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ragCaseStudies: { ...editFormData.content?.ragCaseStudies, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Result" />
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Image</label>
                                                    <ImageUploader
                                                        onUpload={(url) => {
                                                            const newCards = [...(editFormData.content?.ragCaseStudies?.cards || [])];
                                                            newCards[idx].image = url;
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, ragCaseStudies: { ...editFormData.content?.ragCaseStudies, cards: newCards } } });
                                                        }}
                                                        defaultImage={card.image || "/images/rag-development/hero_rag.webp"}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newCards = [...(editFormData.content?.ragCaseStudies?.cards || []), { title: "", problem: "", solution: "", result: "", image: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, ragCaseStudies: { ...editFormData.content?.ragCaseStudies, cards: newCards } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Case Study
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* RAG DEVELOPMENT: CTA */}
                     {activeEditTab === "rag-cta" && editPage.path === "/rag-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CTA Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.ragCTA?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragCTA: { ...editFormData.content?.ragCTA, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Implement Enterprise RAG Architecture" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea value={editFormData.content?.ragCTA?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragCTA: { ...editFormData.content?.ragCTA, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 min-h-[80px]" placeholder="Stop hallucinations and empower your AI..." />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Primary Button Text</label>
                                        <input type="text" value={editFormData.content?.ragCTA?.primaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragCTA: { ...editFormData.content?.ragCTA, primaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Book Free Consultation" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Secondary Button Text</label>
                                        <input type="text" value={editFormData.content?.ragCTA?.secondaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ragCTA: { ...editFormData.content?.ragCTA, secondaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Contact Us" />
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}
`;

if (content.includes(uiInjectionPoint)) {
    if (!content.includes('activeEditTab === "rag-hero"')) {
        content = content.replace(uiInjectionPoint, ragUI + uiInjectionPoint);
        console.log("Successfully injected RAG Development UI");
    } else {
        console.log("UI already exists");
    }
} else {
    console.log("Failed to find UI injection point");
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log("File saved successfully.");
