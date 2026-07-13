const fs = require('fs');
const path = require('path');

const pagePath = "c:/Users/Paras Tomar/OneDrive/Desktop/RecentureSoft-Admin/app/admin/(dashboard)/website-pages/page.jsx";
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Inject the tab buttons for AI Chatbot Development
const tabsInjectionPoint = `                                {editPage.path === "/ai-agent-development" && (`;
const aiChatbotTabsButtons = `                                {editPage.path === "/ai-chatbot-development" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("chatbot-hero")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'chatbot-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("chatbot-techlogos")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'chatbot-techlogos' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Code className="w-4 h-4" /> Tech Logos
                                        </button>
                                        <button onClick={() => setActiveEditTab("chatbot-about")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'chatbot-about' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Layers className="w-4 h-4" /> About Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("chatbot-services")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'chatbot-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Package className="w-4 h-4" /> Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("chatbot-solutions")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'chatbot-solutions' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Briefcase className="w-4 h-4" /> Solutions
                                        </button>
                                        <button onClick={() => setActiveEditTab("chatbot-whychoose")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'chatbot-whychoose' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <Star className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button onClick={() => setActiveEditTab("chatbot-casestudies")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'chatbot-casestudies' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <FileText className="w-4 h-4" /> Case Studies
                                        </button>
                                        <button onClick={() => setActiveEditTab("chatbot-cta")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'chatbot-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <ArrowRight className="w-4 h-4" /> CTA
                                        </button>
                                    </>
                                )}
`;

if (content.includes(tabsInjectionPoint)) {
    if (!content.includes('editPage.path === "/ai-chatbot-development"')) {
        content = content.replace(tabsInjectionPoint, aiChatbotTabsButtons + tabsInjectionPoint);
        console.log("Successfully injected AI Chatbot Development tab buttons");
    } else {
        console.log("Tab buttons already exist");
    }
} else {
    console.log("Failed to find tab buttons injection point");
}

const uiInjectionPoint = `                     {/* AI AGENT DEVELOPMENT: HERO */}`;
const aiChatbotUI = `
                     {/* AI CHATBOT DEVELOPMENT: HERO */}
                     {activeEditTab === "chatbot-hero" && editPage.path === "/ai-chatbot-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Hero Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.aiChatbotHero?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotHero: { ...editFormData.content?.aiChatbotHero, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Enterprise AI" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title Highlight</label>
                                    <input type="text" value={editFormData.content?.aiChatbotHero?.titleHighlight || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotHero: { ...editFormData.content?.aiChatbotHero, titleHighlight: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Chatbot Development" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea value={editFormData.content?.aiChatbotHero?.description || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotHero: { ...editFormData.content?.aiChatbotHero, description: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 min-h-[80px]" placeholder="Enhance customer experience..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Primary Button Text</label>
                                    <input type="text" value={editFormData.content?.aiChatbotHero?.primaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotHero: { ...editFormData.content?.aiChatbotHero, primaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Get Free Consultation" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Secondary Button Text</label>
                                    <input type="text" value={editFormData.content?.aiChatbotHero?.secondaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotHero: { ...editFormData.content?.aiChatbotHero, secondaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Talk to AI Experts" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Hero Image</label>
                                    <ImageUploader
                                        onUpload={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotHero: { ...editFormData.content?.aiChatbotHero, image: url } } })}
                                        defaultImage={editFormData.content?.aiChatbotHero?.image || "/images/ai-chatbot/hero_ai_chatbot.webp"}
                                    />
                                </div>
                            </div>
                        </div>
                     )}

                     {/* AI CHATBOT DEVELOPMENT: TECH LOGOS */}
                     {activeEditTab === "chatbot-techlogos" && editPage.path === "/ai-chatbot-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Tech Logos Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.aiChatbotTechLogos?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotTechLogos: { ...editFormData.content?.aiChatbotTechLogos, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="AI Technologies We Specialize In" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                                    <textarea value={editFormData.content?.aiChatbotTechLogos?.tags ? editFormData.content.aiChatbotTechLogos.tags.join(', ') : ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotTechLogos: { ...editFormData.content?.aiChatbotTechLogos, tags: e.target.value.split(',').map(s => s.trim()) } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="OpenAI, Gemini, Claude..." />
                                </div>
                            </div>
                        </div>
                     )}

                     {/* AI CHATBOT DEVELOPMENT: ABOUT */}
                     {activeEditTab === "chatbot-about" && editPage.path === "/ai-chatbot-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">About Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Heading</label>
                                    <input type="text" value={editFormData.content?.aiChatbotAbout?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotAbout: { ...editFormData.content?.aiChatbotAbout, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Next-Generation Conversational AI" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea value={editFormData.content?.aiChatbotAbout?.desc1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotAbout: { ...editFormData.content?.aiChatbotAbout, desc1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 min-h-[80px]" placeholder="Our AI chatbots aren't just simple rule-based..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">About Image</label>
                                    <ImageUploader
                                        onUpload={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotAbout: { ...editFormData.content?.aiChatbotAbout, image: url } } })}
                                        defaultImage={editFormData.content?.aiChatbotAbout?.image || "/images/ai-chatbot/about_ai_chatbot.webp"}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Stats</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.aiChatbotAbout?.stats || []).map((stat, idx) => (
                                            <div key={idx} className="flex gap-4 items-center bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                                                <input type="text" value={stat.stat} onChange={(e) => {
                                                    const newStats = [...(editFormData.content?.aiChatbotAbout?.stats || [])];
                                                    newStats[idx].stat = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotAbout: { ...editFormData.content?.aiChatbotAbout, stats: newStats } } });
                                                }} className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="200+" />
                                                <input type="text" value={stat.label} onChange={(e) => {
                                                    const newStats = [...(editFormData.content?.aiChatbotAbout?.stats || [])];
                                                    newStats[idx].label = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotAbout: { ...editFormData.content?.aiChatbotAbout, stats: newStats } } });
                                                }} className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Projects Consulted" />
                                                <button type="button" onClick={() => {
                                                    const newStats = (editFormData.content?.aiChatbotAbout?.stats || []).filter((_, i) => i !== idx);
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotAbout: { ...editFormData.content?.aiChatbotAbout, stats: newStats } } });
                                                }} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newStats = [...(editFormData.content?.aiChatbotAbout?.stats || []), { stat: "", label: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotAbout: { ...editFormData.content?.aiChatbotAbout, stats: newStats } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Stat
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* AI CHATBOT DEVELOPMENT: SERVICES */}
                     {activeEditTab === "chatbot-services" && editPage.path === "/ai-chatbot-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Services Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.aiChatbotServices?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotServices: { ...editFormData.content?.aiChatbotServices, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Our Chatbot Services" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <input type="text" value={editFormData.content?.aiChatbotServices?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotServices: { ...editFormData.content?.aiChatbotServices, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Advanced conversational AI..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Service Cards</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.aiChatbotServices?.cards || []).map((card, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Card #{idx + 1}</h4>
                                                    <button type="button" onClick={() => {
                                                        const newCards = (editFormData.content?.aiChatbotServices?.cards || []).filter((_, i) => i !== idx);
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotServices: { ...editFormData.content?.aiChatbotServices, cards: newCards } } });
                                                    }} className="text-red-500 hover:text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <input type="text" value={card.title} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiChatbotServices?.cards || [])];
                                                    newCards[idx].title = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotServices: { ...editFormData.content?.aiChatbotServices, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Title" />
                                                <textarea value={card.desc} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiChatbotServices?.cards || [])];
                                                    newCards[idx].desc = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotServices: { ...editFormData.content?.aiChatbotServices, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Description" rows={2} />
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newCards = [...(editFormData.content?.aiChatbotServices?.cards || []), { title: "", desc: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotServices: { ...editFormData.content?.aiChatbotServices, cards: newCards } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Service Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* AI CHATBOT DEVELOPMENT: SOLUTIONS */}
                     {activeEditTab === "chatbot-solutions" && editPage.path === "/ai-chatbot-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Solutions Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.aiChatbotSolutions?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotSolutions: { ...editFormData.content?.aiChatbotSolutions, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Business Challenges We Solve" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Solution Cards</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.aiChatbotSolutions?.cards || []).map((card, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Card #{idx + 1}</h4>
                                                    <button type="button" onClick={() => {
                                                        const newCards = (editFormData.content?.aiChatbotSolutions?.cards || []).filter((_, i) => i !== idx);
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotSolutions: { ...editFormData.content?.aiChatbotSolutions, cards: newCards } } });
                                                    }} className="text-red-500 hover:text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <input type="text" value={card.title} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiChatbotSolutions?.cards || [])];
                                                    newCards[idx].title = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotSolutions: { ...editFormData.content?.aiChatbotSolutions, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Title" />
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newCards = [...(editFormData.content?.aiChatbotSolutions?.cards || []), { title: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotSolutions: { ...editFormData.content?.aiChatbotSolutions, cards: newCards } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Solution Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* AI CHATBOT DEVELOPMENT: WHY CHOOSE */}
                     {activeEditTab === "chatbot-whychoose" && editPage.path === "/ai-chatbot-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Why Choose Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.aiChatbotWhyChoose?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotWhyChoose: { ...editFormData.content?.aiChatbotWhyChoose, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Why Choose RecentureSoft" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Why Choose Cards</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.aiChatbotWhyChoose?.cards || []).map((card, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Card #{idx + 1}</h4>
                                                    <button type="button" onClick={() => {
                                                        const newCards = (editFormData.content?.aiChatbotWhyChoose?.cards || []).filter((_, i) => i !== idx);
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotWhyChoose: { ...editFormData.content?.aiChatbotWhyChoose, cards: newCards } } });
                                                    }} className="text-red-500 hover:text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <input type="text" value={card.title} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiChatbotWhyChoose?.cards || [])];
                                                    newCards[idx].title = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotWhyChoose: { ...editFormData.content?.aiChatbotWhyChoose, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Title" />
                                                <textarea value={card.desc} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiChatbotWhyChoose?.cards || [])];
                                                    newCards[idx].desc = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotWhyChoose: { ...editFormData.content?.aiChatbotWhyChoose, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Description" rows={2} />
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newCards = [...(editFormData.content?.aiChatbotWhyChoose?.cards || []), { title: "", desc: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotWhyChoose: { ...editFormData.content?.aiChatbotWhyChoose, cards: newCards } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Why Choose Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* AI CHATBOT DEVELOPMENT: CASE STUDIES */}
                     {activeEditTab === "chatbot-casestudies" && editPage.path === "/ai-chatbot-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Case Studies Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.aiChatbotCaseStudies?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotCaseStudies: { ...editFormData.content?.aiChatbotCaseStudies, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Chatbot Case Studies" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Case Study Cards</label>
                                    <div className="space-y-4">
                                        {(editFormData.content?.aiChatbotCaseStudies?.cards || []).map((card, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Card #{idx + 1}</h4>
                                                    <button type="button" onClick={() => {
                                                        const newCards = (editFormData.content?.aiChatbotCaseStudies?.cards || []).filter((_, i) => i !== idx);
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotCaseStudies: { ...editFormData.content?.aiChatbotCaseStudies, cards: newCards } } });
                                                    }} className="text-red-500 hover:text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <input type="text" value={card.title} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiChatbotCaseStudies?.cards || [])];
                                                    newCards[idx].title = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotCaseStudies: { ...editFormData.content?.aiChatbotCaseStudies, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Title" />
                                                <input type="text" value={card.problem} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiChatbotCaseStudies?.cards || [])];
                                                    newCards[idx].problem = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotCaseStudies: { ...editFormData.content?.aiChatbotCaseStudies, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Problem" />
                                                <input type="text" value={card.solution} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiChatbotCaseStudies?.cards || [])];
                                                    newCards[idx].solution = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotCaseStudies: { ...editFormData.content?.aiChatbotCaseStudies, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Solution" />
                                                <input type="text" value={card.result} onChange={(e) => {
                                                    const newCards = [...(editFormData.content?.aiChatbotCaseStudies?.cards || [])];
                                                    newCards[idx].result = e.target.value;
                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotCaseStudies: { ...editFormData.content?.aiChatbotCaseStudies, cards: newCards } } });
                                                }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Result" />
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Image</label>
                                                    <ImageUploader
                                                        onUpload={(url) => {
                                                            const newCards = [...(editFormData.content?.aiChatbotCaseStudies?.cards || [])];
                                                            newCards[idx].image = url;
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotCaseStudies: { ...editFormData.content?.aiChatbotCaseStudies, cards: newCards } } });
                                                        }}
                                                        defaultImage={card.image || "/images/ai-chatbot/hero_ai_chatbot.webp"}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const newCards = [...(editFormData.content?.aiChatbotCaseStudies?.cards || []), { title: "", problem: "", solution: "", result: "", image: "" }];
                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotCaseStudies: { ...editFormData.content?.aiChatbotCaseStudies, cards: newCards } } });
                                        }} className="w-full py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <Plus className="w-4 h-4" /> Add Case Study
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                     {/* AI CHATBOT DEVELOPMENT: CTA */}
                     {activeEditTab === "chatbot-cta" && editPage.path === "/ai-chatbot-development" && (
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CTA Settings</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={editFormData.content?.aiChatbotCTA?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotCTA: { ...editFormData.content?.aiChatbotCTA, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Ready to Build Your AI Chatbot?" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea value={editFormData.content?.aiChatbotCTA?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotCTA: { ...editFormData.content?.aiChatbotCTA, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 min-h-[80px]" placeholder="Contact our experts..." />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Primary Button Text</label>
                                        <input type="text" value={editFormData.content?.aiChatbotCTA?.primaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotCTA: { ...editFormData.content?.aiChatbotCTA, primaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Book Free Consultation" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Secondary Button Text</label>
                                        <input type="text" value={editFormData.content?.aiChatbotCTA?.secondaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiChatbotCTA: { ...editFormData.content?.aiChatbotCTA, secondaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="Contact Us" />
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}
`;

if (content.includes(uiInjectionPoint)) {
    if (!content.includes('activeEditTab === "chatbot-hero"')) {
        content = content.replace(uiInjectionPoint, aiChatbotUI + uiInjectionPoint);
        console.log("Successfully injected AI Chatbot Development UI");
    } else {
        console.log("UI already exists");
    }
} else {
    console.log("Failed to find UI injection point");
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log("File saved successfully.");
