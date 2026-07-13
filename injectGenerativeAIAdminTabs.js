const fs = require('fs');

const pagePath = "c:/Users/Paras Tomar/OneDrive/Desktop/RecentureSoft-Admin/app/admin/(dashboard)/website-pages/page.jsx";
let content = fs.readFileSync(pagePath, 'utf8');

const genAiButtons = `
                                {editPage.path === "/generative-ai" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("genai-hero")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'genai-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-techlogos")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'genai-techlogos' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Layers className="w-4 h-4" /> Tech Logos
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-about")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'genai-about' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <FileText className="w-4 h-4" /> About AI
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-services")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'genai-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Package className="w-4 h-4" /> AI Services
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-solutions")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'genai-solutions' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Briefcase className="w-4 h-4" /> Solutions
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-techstack")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'genai-techstack' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Code className="w-4 h-4" /> Tech Stack
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-whychoose")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'genai-whychoose' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <ShieldCheck className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-casestudies")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'genai-casestudies' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Star className="w-4 h-4" /> Case Studies
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-cta")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'genai-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Bottom CTA
                                        </button>
                                    </>
                                )}
`;

function getDynamicArrayUI(tabName, sectionName, fieldName, cardLabel, isList = false) {
    return `
                                {/* ${tabName.toUpperCase()} TAB */}
                                {activeEditTab === "${tabName}" && editPage.path === "/generative-ai" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">${sectionName} Settings</h3>
                                        </div>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Section Title</label>
                                                <input type="text" value={editFormData.content?.${fieldName}?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ${fieldName}: { ...editFormData.content?.${fieldName}, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="${sectionName}" />
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">${cardLabel} ({(editFormData.content?.${fieldName}?.cards || []).length})</h4>
                                                    <button 
                                                        onClick={() => {
                                                            const currentCards = editFormData.content?.${fieldName}?.cards || [];
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, ${fieldName}: { ...editFormData.content?.${fieldName}, cards: [...currentCards, {}] } } });
                                                        }}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" /> Add Item
                                                    </button>
                                                </div>
                                                {(editFormData.content?.${fieldName}?.cards || []).map((card, i) => {
                                                    return (
                                                    <div key={i} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/50 space-y-3 relative">
                                                        <div className="flex items-center justify-between">
                                                            <div className="font-medium text-sm text-slate-500">Item {i+1}</div>
                                                            <button 
                                                                onClick={() => {
                                                                    const currentCards = [...(editFormData.content?.${fieldName}?.cards || [])];
                                                                    currentCards.splice(i, 1);
                                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ${fieldName}: { ...editFormData.content?.${fieldName}, cards: currentCards } } });
                                                                }}
                                                                className="text-red-500 hover:text-red-600 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        
                                                        <input type="text" value={card.title || ""} onChange={(e) => {
                                                            const newCards = [...(editFormData.content?.${fieldName}?.cards || [])];
                                                            newCards[i] = { ...newCards[i], title: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, ${fieldName}: { ...editFormData.content?.${fieldName}, cards: newCards } } });
                                                        }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Title" />
                                                        
                                                        <textarea value={card.desc || ""} onChange={(e) => {
                                                            const newCards = [...(editFormData.content?.${fieldName}?.cards || [])];
                                                            newCards[i] = { ...newCards[i], desc: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, ${fieldName}: { ...editFormData.content?.${fieldName}, cards: newCards } } });
                                                        }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Description" rows={2} />
                                                        
                                                        ${fieldName === 'genAiCaseStudies' ? `
                                                            <input type="text" value={card.tech || ""} onChange={(e) => {
                                                                const newCards = [...(editFormData.content?.${fieldName}?.cards || [])];
                                                                newCards[i] = { ...newCards[i], tech: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, ${fieldName}: { ...editFormData.content?.${fieldName}, cards: newCards } } });
                                                            }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Tech Used (e.g. GPT-4, React)" />
                                                            <input type="text" value={card.result || ""} onChange={(e) => {
                                                                const newCards = [...(editFormData.content?.${fieldName}?.cards || [])];
                                                                newCards[i] = { ...newCards[i], result: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, ${fieldName}: { ...editFormData.content?.${fieldName}, cards: newCards } } });
                                                            }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Result (e.g. 75% Faster)" />
                                                        ` : ''}

                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Custom Image / Icon</label>
                                                            <ImageUploader 
                                                                value={card.image || ""} 
                                                                onChange={(url) => {
                                                                    const newCards = [...(editFormData.content?.${fieldName}?.cards || [])];
                                                                    newCards[i] = { ...newCards[i], image: url };
                                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ${fieldName}: { ...editFormData.content?.${fieldName}, cards: newCards } } });
                                                                }} 
                                                            />
                                                        </div>
                                                    </div>
                                                )})}
                                            </div>
                                        </div>
                                    </div>
                                )}
`;
}


const genAiContentForms = `
                                {/* GENAI HERO TAB */}
                                {activeEditTab === "genai-hero" && editPage.path === "/generative-ai" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Hero Section Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hero Title</label>
                                                <input type="text" value={editFormData.content?.genAiHero?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiHero: { ...editFormData.content?.genAiHero, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Highlighted Title</label>
                                                <input type="text" value={editFormData.content?.genAiHero?.titleHighlight || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiHero: { ...editFormData.content?.genAiHero, titleHighlight: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                <textarea value={editFormData.content?.genAiHero?.description || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiHero: { ...editFormData.content?.genAiHero, description: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[100px]" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hero Image</label>
                                                <ImageUploader value={editFormData.content?.genAiHero?.image || ""} onChange={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiHero: { ...editFormData.content?.genAiHero, image: url } } })} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Primary Button Text</label>
                                                <input type="text" value={editFormData.content?.genAiHero?.primaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiHero: { ...editFormData.content?.genAiHero, primaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Secondary Button Text</label>
                                                <input type="text" value={editFormData.content?.genAiHero?.secondaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiHero: { ...editFormData.content?.genAiHero, secondaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* GENAI ABOUT TAB */}
                                {activeEditTab === "genai-about" && editPage.path === "/generative-ai" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">About Section Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.genAiAbout?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiAbout: { ...editFormData.content?.genAiAbout, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description Part 1</label>
                                                <textarea value={editFormData.content?.genAiAbout?.desc1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiAbout: { ...editFormData.content?.genAiAbout, desc1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={2}/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description Part 2</label>
                                                <textarea value={editFormData.content?.genAiAbout?.desc2 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiAbout: { ...editFormData.content?.genAiAbout, desc2: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={2}/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">About Image</label>
                                                <ImageUploader value={editFormData.content?.genAiAbout?.image || ""} onChange={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiAbout: { ...editFormData.content?.genAiAbout, image: url } } })} />
                                            </div>

                                            <div className="space-y-4 border-t pt-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Stats Boxes</h4>
                                                    <button onClick={() => {
                                                        const currentStats = editFormData.content?.genAiAbout?.stats || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiAbout: { ...editFormData.content?.genAiAbout, stats: [...currentStats, {}] } } });
                                                    }} className="text-blue-600">
                                                        + Add Stat
                                                    </button>
                                                </div>
                                                {(editFormData.content?.genAiAbout?.stats || []).map((stat, i) => (
                                                    <div key={i} className="flex gap-2">
                                                        <input type="text" value={stat.stat || ""} placeholder="95%" className="w-1/3 bg-white border border-slate-200 rounded px-3 py-1" onChange={(e) => {
                                                            const stats = [...(editFormData.content?.genAiAbout?.stats || [])];
                                                            stats[i] = { ...stats[i], stat: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiAbout: { ...editFormData.content?.genAiAbout, stats } } });
                                                        }} />
                                                        <input type="text" value={stat.label || ""} placeholder="Accuracy" className="w-full bg-white border border-slate-200 rounded px-3 py-1" onChange={(e) => {
                                                            const stats = [...(editFormData.content?.genAiAbout?.stats || [])];
                                                            stats[i] = { ...stats[i], label: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiAbout: { ...editFormData.content?.genAiAbout, stats } } });
                                                        }} />
                                                        <button className="text-red-500" onClick={() => {
                                                            const stats = [...(editFormData.content?.genAiAbout?.stats || [])];
                                                            stats.splice(i, 1);
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiAbout: { ...editFormData.content?.genAiAbout, stats } } });
                                                        }}><Trash2 className="w-4 h-4"/></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TECH LOGOS TAB */}
                                {activeEditTab === "genai-techlogos" && editPage.path === "/generative-ai" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Technologies Logos Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Section Title</label>
                                                <input type="text" value={editFormData.content?.genAiTechLogos?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiTechLogos: { ...editFormData.content?.genAiTechLogos, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div className="space-y-4 border-t pt-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Tech Tags</h4>
                                                    <button onClick={() => {
                                                        const currentTags = editFormData.content?.genAiTechLogos?.tags || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiTechLogos: { ...editFormData.content?.genAiTechLogos, tags: [...currentTags, ""] } } });
                                                    }} className="text-blue-600">
                                                        + Add Tag
                                                    </button>
                                                </div>
                                                {(editFormData.content?.genAiTechLogos?.tags || []).map((tag, i) => (
                                                    <div key={i} className="flex gap-2">
                                                        <input type="text" value={tag || ""} placeholder="OpenAI" className="w-full bg-white border border-slate-200 rounded px-3 py-1" onChange={(e) => {
                                                            const tags = [...(editFormData.content?.genAiTechLogos?.tags || [])];
                                                            tags[i] = e.target.value;
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiTechLogos: { ...editFormData.content?.genAiTechLogos, tags } } });
                                                        }} />
                                                        <button className="text-red-500" onClick={() => {
                                                            const tags = [...(editFormData.content?.genAiTechLogos?.tags || [])];
                                                            tags.splice(i, 1);
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiTechLogos: { ...editFormData.content?.genAiTechLogos, tags } } });
                                                        }}><Trash2 className="w-4 h-4"/></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CTA TAB */}
                                {activeEditTab === "genai-cta" && editPage.path === "/generative-ai" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CTA Section Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                                                <input type="text" value={editFormData.content?.genAiCTA?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiCTA: { ...editFormData.content?.genAiCTA, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                <textarea value={editFormData.content?.genAiCTA?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiCTA: { ...editFormData.content?.genAiCTA, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={3}/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Primary Button</label>
                                                <input type="text" value={editFormData.content?.genAiCTA?.primaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiCTA: { ...editFormData.content?.genAiCTA, primaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Secondary Button</label>
                                                <input type="text" value={editFormData.content?.genAiCTA?.secondaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiCTA: { ...editFormData.content?.genAiCTA, secondaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                )}

${getDynamicArrayUI("genai-services", "Generative AI Services", "genAiServices", "Service Cards")}
${getDynamicArrayUI("genai-solutions", "Industry Solutions", "genAiSolutions", "Solution Cards")}
${getDynamicArrayUI("genai-whychoose", "Why Choose RecentureSoft", "genAiWhyChoose", "Reason Cards")}
${getDynamicArrayUI("genai-casestudies", "Case Studies", "genAiCaseStudies", "Study Cards")}

                                {/* TECH STACK TAB */}
                                {activeEditTab === "genai-techstack" && editPage.path === "/generative-ai" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Tech Stack Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Section Title</label>
                                                <input type="text" value={editFormData.content?.genAiTechStack?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiTechStack: { ...editFormData.content?.genAiTechStack, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Stack Categories</h4>
                                                    <button onClick={() => {
                                                        const currentStacks = editFormData.content?.genAiTechStack?.stacks || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiTechStack: { ...editFormData.content?.genAiTechStack, stacks: [...currentStacks, { category: '', items: '' }] } } });
                                                    }} className="text-blue-600">
                                                        + Add Category
                                                    </button>
                                                </div>
                                                {(editFormData.content?.genAiTechStack?.stacks || []).map((stack, i) => (
                                                    <div key={i} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 space-y-3 relative">
                                                        <div className="flex justify-between items-center">
                                                            <div className="font-medium text-sm text-slate-500">Category {i+1}</div>
                                                            <button className="text-red-500" onClick={() => {
                                                                const stacks = [...(editFormData.content?.genAiTechStack?.stacks || [])];
                                                                stacks.splice(i, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiTechStack: { ...editFormData.content?.genAiTechStack, stacks } } });
                                                            }}><Trash2 className="w-4 h-4"/></button>
                                                        </div>
                                                        <input type="text" value={stack.category || ""} placeholder="e.g. Frontend" className="w-full bg-white border border-slate-200 rounded px-3 py-2" onChange={(e) => {
                                                            const stacks = [...(editFormData.content?.genAiTechStack?.stacks || [])];
                                                            stacks[i] = { ...stacks[i], category: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiTechStack: { ...editFormData.content?.genAiTechStack, stacks } } });
                                                        }} />
                                                        <textarea value={Array.isArray(stack.items) ? stack.items.join(', ') : (stack.items || "")} placeholder="React, Next.js, Tailwind (Comma Separated)" className="w-full bg-white border border-slate-200 rounded px-3 py-2" onChange={(e) => {
                                                            const stacks = [...(editFormData.content?.genAiTechStack?.stacks || [])];
                                                            stacks[i] = { ...stacks[i], items: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, genAiTechStack: { ...editFormData.content?.genAiTechStack, stacks } } });
                                                        }} rows={2} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
`;


let modified = false;

// Inject buttons after the contact buttons
if (!content.includes('editPage.path === "/generative-ai"')) {
    const searchLine = '                                {editPage.path === "/contact" && (';
    const indexOfContact = content.indexOf(searchLine);
    if (indexOfContact !== -1) {
        // Find the closing )} of the contact block
        const contactBlockEnd = content.indexOf(')}', indexOfContact);
        if (contactBlockEnd !== -1) {
            const insertPos = contactBlockEnd + 2; // after )}
            content = content.slice(0, insertPos) + '\n' + genAiButtons + content.slice(insertPos);
            console.log("Injected Generative AI buttons!");
            modified = true;
        }
    }
}

// Inject forms after the contact forms
if (!content.includes('activeEditTab === "genai-hero"')) {
    const searchLine = '{activeEditTab === "contact-form" && editPage.path === "/contact" && (';
    const indexOfForm = content.indexOf(searchLine);
    if (indexOfForm !== -1) {
        // Now find the end of this form section. 
        // We know it ends with a div then )} at the end of the contact form.
        // Let's just find the first string of ')}' that appears after the "info@recenturesoft.com" placeholder.
        const indexOfPlaceholder = content.indexOf('placeholder="info@recenturesoft.com"', indexOfForm);
        if (indexOfPlaceholder !== -1) {
            const formEndPos = content.indexOf(')}', indexOfPlaceholder);
            if (formEndPos !== -1) {
                const insertPos = formEndPos + 2; // after )}
                content = content.slice(0, insertPos) + '\n' + genAiContentForms + content.slice(insertPos);
                console.log("Injected Generative AI forms!");
                modified = true;
            }
        }
    }
}

if (modified) {
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log("File saved.");
} else {
    console.log("Nothing was modified. Either it was already injected, or the markers were not found.");
}
