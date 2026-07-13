const fs = require('fs');

const pagePath = "c:/Users/Paras Tomar/OneDrive/Desktop/RecentureSoft-Admin/app/admin/(dashboard)/website-pages/page.jsx";
let content = fs.readFileSync(pagePath, 'utf8');

// Inject the sidebar buttons for AI Consulting
const buttonInjectionPoint = `                                {editPage.path === "/generative-ai" && (`
const aiConsultingButtons = `                                {editPage.path === "/ai-consulting-services" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-hero")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'aiconsulting-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-techlogos")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'aiconsulting-techlogos' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Layers className="w-4 h-4" /> Tech Logos
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-about")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'aiconsulting-about' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <FileText className="w-4 h-4" /> About Section
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-services")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'aiconsulting-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Package className="w-4 h-4" /> Services
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-solutions")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'aiconsulting-solutions' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Briefcase className="w-4 h-4" /> Solutions
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-industries")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'aiconsulting-industries' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Globe className="w-4 h-4" /> Industries
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-whychoose")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'aiconsulting-whychoose' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <ShieldCheck className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-casestudies")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'aiconsulting-casestudies' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Star className="w-4 h-4" /> Case Studies
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-cta")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'aiconsulting-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Bottom CTA
                                        </button>
                                    </>
                                )}
`;

if (!content.includes('editPage.path === "/ai-consulting-services"')) {
    content = content.replace(buttonInjectionPoint, aiConsultingButtons + buttonInjectionPoint);
    console.log("Injected AI Consulting buttons!");
}


const formInjectionPoint = `                                {/* GENAI HERO TAB */}`
const getDynamicArrayUI = (tabId, path, stateKey, title, arrayName, label, extraFields = []) => {
    return \`                                {/* \${stateKey.toUpperCase()} \${arrayName.toUpperCase()} TAB */}
                                {activeEditTab === "\${tabId}" && editPage.path === "\${path}" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">\${title} Settings</h3>
                                        </div>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Section Title</label>
                                                <input type="text" value={editFormData.content?.\${stateKey}?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, \${stateKey}: { ...editFormData.content?.\${stateKey}, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">\${label} ({(editFormData.content?.\${stateKey}?.\${arrayName} || []).length})</h4>
                                                    <button 
                                                        onClick={() => {
                                                            const currentItems = editFormData.content?.\${stateKey}?.\${arrayName} || [];
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, \${stateKey}: { ...editFormData.content?.\${stateKey}, \${arrayName}: [...currentItems, {}] } } });
                                                        }}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" /> Add Item
                                                    </button>
                                                </div>
                                                {(editFormData.content?.\${stateKey}?.\${arrayName} || []).map((item, i) => {
                                                    return (
                                                    <div key={i} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/50 space-y-3 relative">
                                                        <div className="flex items-center justify-between">
                                                            <div className="font-medium text-sm text-slate-500">Item {i+1}</div>
                                                            <button 
                                                                onClick={() => {
                                                                    const currentItems = [...(editFormData.content?.\${stateKey}?.\${arrayName} || [])];
                                                                    currentItems.splice(i, 1);
                                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, \${stateKey}: { ...editFormData.content?.\${stateKey}, \${arrayName}: currentItems } } });
                                                                }}
                                                                className="text-red-500 hover:text-red-600 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        
                                                        <input type="text" value={item.title || item.name || ""} onChange={(e) => {
                                                            const newItems = [...(editFormData.content?.\${stateKey}?.\${arrayName} || [])];
                                                            if (item.name !== undefined) {
                                                                newItems[i] = { ...newItems[i], name: e.target.value };
                                                            } else {
                                                                newItems[i] = { ...newItems[i], title: e.target.value };
                                                            }
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, \${stateKey}: { ...editFormData.content?.\${stateKey}, \${arrayName}: newItems } } });
                                                        }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Title / Name" />
                                                        
                                                        \${extraFields.includes('desc') ? \`
                                                        <textarea value={item.desc || ""} onChange={(e) => {
                                                            const newItems = [...(editFormData.content?.\${stateKey}?.\${arrayName} || [])];
                                                            newItems[i] = { ...newItems[i], desc: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, \${stateKey}: { ...editFormData.content?.\${stateKey}, \${arrayName}: newItems } } });
                                                        }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Description" rows={2} />
                                                        \` : ''}
                                                        
                                                        \${extraFields.includes('case-study-fields') ? \`
                                                            <input type="text" value={item.problem || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.\${stateKey}?.\${arrayName} || [])];
                                                                newItems[i] = { ...newItems[i], problem: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, \${stateKey}: { ...editFormData.content?.\${stateKey}, \${arrayName}: newItems } } });
                                                            }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Problem" />
                                                            <input type="text" value={item.solution || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.\${stateKey}?.\${arrayName} || [])];
                                                                newItems[i] = { ...newItems[i], solution: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, \${stateKey}: { ...editFormData.content?.\${stateKey}, \${arrayName}: newItems } } });
                                                            }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Solution" />
                                                            <input type="text" value={item.result || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.\${stateKey}?.\${arrayName} || [])];
                                                                newItems[i] = { ...newItems[i], result: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, \${stateKey}: { ...editFormData.content?.\${stateKey}, \${arrayName}: newItems } } });
                                                            }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Result" />
                                                        \` : ''}

                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Custom Image / Icon</label>
                                                            <ImageUploader 
                                                                value={item.image || ""} 
                                                                onChange={(url) => {
                                                                    const newItems = [...(editFormData.content?.\${stateKey}?.\${arrayName} || [])];
                                                                    newItems[i] = { ...newItems[i], image: url };
                                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, \${stateKey}: { ...editFormData.content?.\${stateKey}, \${arrayName}: newItems } } });
                                                                }} 
                                                            />
                                                        </div>
                                                    </div>
                                                )})}
                                            </div>
                                        </div>
                                    </div>
                                )}
\`
}

const aiConsultingForms = \`
                                {/* AICONSULTING HERO TAB */}
                                {activeEditTab === "aiconsulting-hero" && editPage.path === "/ai-consulting-services" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Hero Section Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hero Title</label>
                                                <input type="text" value={editFormData.content?.aiConsultingHero?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingHero: { ...editFormData.content?.aiConsultingHero, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Highlighted Title</label>
                                                <input type="text" value={editFormData.content?.aiConsultingHero?.titleHighlight || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingHero: { ...editFormData.content?.aiConsultingHero, titleHighlight: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                <textarea value={editFormData.content?.aiConsultingHero?.description || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingHero: { ...editFormData.content?.aiConsultingHero, description: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[100px]" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hero Image</label>
                                                <ImageUploader value={editFormData.content?.aiConsultingHero?.image || ""} onChange={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingHero: { ...editFormData.content?.aiConsultingHero, image: url } } })} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Primary Button Text</label>
                                                <input type="text" value={editFormData.content?.aiConsultingHero?.primaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingHero: { ...editFormData.content?.aiConsultingHero, primaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Secondary Button Text</label>
                                                <input type="text" value={editFormData.content?.aiConsultingHero?.secondaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingHero: { ...editFormData.content?.aiConsultingHero, secondaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* AICONSULTING ABOUT TAB */}
                                {activeEditTab === "aiconsulting-about" && editPage.path === "/ai-consulting-services" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">About Section Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.aiConsultingAbout?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingAbout: { ...editFormData.content?.aiConsultingAbout, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description Part 1</label>
                                                <textarea value={editFormData.content?.aiConsultingAbout?.desc1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingAbout: { ...editFormData.content?.aiConsultingAbout, desc1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={2}/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description Part 2</label>
                                                <textarea value={editFormData.content?.aiConsultingAbout?.desc2 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingAbout: { ...editFormData.content?.aiConsultingAbout, desc2: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={2}/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">About Image</label>
                                                <ImageUploader value={editFormData.content?.aiConsultingAbout?.image || ""} onChange={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingAbout: { ...editFormData.content?.aiConsultingAbout, image: url } } })} />
                                            </div>

                                            <div className="space-y-4 border-t pt-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Stats Boxes</h4>
                                                    <button onClick={() => {
                                                        const currentStats = editFormData.content?.aiConsultingAbout?.stats || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingAbout: { ...editFormData.content?.aiConsultingAbout, stats: [...currentStats, {}] } } });
                                                    }} className="text-blue-600">
                                                        + Add Stat
                                                    </button>
                                                </div>
                                                {(editFormData.content?.aiConsultingAbout?.stats || []).map((stat, i) => (
                                                    <div key={i} className="flex gap-2">
                                                        <input type="text" value={stat.stat || ""} placeholder="95%" className="w-1/3 bg-white border border-slate-200 rounded px-3 py-1" onChange={(e) => {
                                                            const stats = [...(editFormData.content?.aiConsultingAbout?.stats || [])];
                                                            stats[i] = { ...stats[i], stat: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingAbout: { ...editFormData.content?.aiConsultingAbout, stats } } });
                                                        }} />
                                                        <input type="text" value={stat.label || ""} placeholder="Accuracy" className="w-full bg-white border border-slate-200 rounded px-3 py-1" onChange={(e) => {
                                                            const stats = [...(editFormData.content?.aiConsultingAbout?.stats || [])];
                                                            stats[i] = { ...stats[i], label: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingAbout: { ...editFormData.content?.aiConsultingAbout, stats } } });
                                                        }} />
                                                        <button className="text-red-500" onClick={() => {
                                                            const stats = [...(editFormData.content?.aiConsultingAbout?.stats || [])];
                                                            stats.splice(i, 1);
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingAbout: { ...editFormData.content?.aiConsultingAbout, stats } } });
                                                        }}><Trash2 className="w-4 h-4"/></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* AICONSULTING TECHLOGOS TAB */}
                                {activeEditTab === "aiconsulting-techlogos" && editPage.path === "/ai-consulting-services" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Technologies Logos Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Section Title</label>
                                                <input type="text" value={editFormData.content?.aiConsultingTechLogos?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingTechLogos: { ...editFormData.content?.aiConsultingTechLogos, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div className="space-y-4 border-t pt-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Tech Tags</h4>
                                                    <button onClick={() => {
                                                        const currentTags = editFormData.content?.aiConsultingTechLogos?.tags || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingTechLogos: { ...editFormData.content?.aiConsultingTechLogos, tags: [...currentTags, ""] } } });
                                                    }} className="text-blue-600">
                                                        + Add Tag
                                                    </button>
                                                </div>
                                                {(editFormData.content?.aiConsultingTechLogos?.tags || []).map((tag, i) => (
                                                    <div key={i} className="flex gap-2">
                                                        <input type="text" value={tag || ""} placeholder="OpenAI" className="w-full bg-white border border-slate-200 rounded px-3 py-1" onChange={(e) => {
                                                            const tags = [...(editFormData.content?.aiConsultingTechLogos?.tags || [])];
                                                            tags[i] = e.target.value;
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingTechLogos: { ...editFormData.content?.aiConsultingTechLogos, tags } } });
                                                        }} />
                                                        <button className="text-red-500" onClick={() => {
                                                            const tags = [...(editFormData.content?.aiConsultingTechLogos?.tags || [])];
                                                            tags.splice(i, 1);
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingTechLogos: { ...editFormData.content?.aiConsultingTechLogos, tags } } });
                                                        }}><Trash2 className="w-4 h-4"/></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* AICONSULTING CTA TAB */}
                                {activeEditTab === "aiconsulting-cta" && editPage.path === "/ai-consulting-services" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CTA Section Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                                                <input type="text" value={editFormData.content?.aiConsultingCTA?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingCTA: { ...editFormData.content?.aiConsultingCTA, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                <textarea value={editFormData.content?.aiConsultingCTA?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingCTA: { ...editFormData.content?.aiConsultingCTA, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={3}/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Primary Button</label>
                                                <input type="text" value={editFormData.content?.aiConsultingCTA?.primaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingCTA: { ...editFormData.content?.aiConsultingCTA, primaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Secondary Button</label>
                                                <input type="text" value={editFormData.content?.aiConsultingCTA?.secondaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, aiConsultingCTA: { ...editFormData.content?.aiConsultingCTA, secondaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                )}
\${getDynamicArrayUI("aiconsulting-services", "/ai-consulting-services", "aiConsultingServices", "Consulting Services", "cards", "Service Cards", ["desc"])}
\${getDynamicArrayUI("aiconsulting-solutions", "/ai-consulting-services", "aiConsultingSolutions", "Industry Solutions", "cards", "Solution Cards", [])}
\${getDynamicArrayUI("aiconsulting-industries", "/ai-consulting-services", "aiConsultingIndustries", "Industries We Consult", "cards", "Industry Cards", [])}
\${getDynamicArrayUI("aiconsulting-whychoose", "/ai-consulting-services", "aiConsultingWhyChoose", "Why Choose Us", "cards", "Reason Cards", ["desc"])}
\${getDynamicArrayUI("aiconsulting-casestudies", "/ai-consulting-services", "aiConsultingCaseStudies", "Case Studies", "cards", "Study Cards", ["case-study-fields"])}
\`;

if (!content.includes('activeEditTab === "aiconsulting-hero"')) {
    content = content.replace(formInjectionPoint, aiConsultingForms + formInjectionPoint);
    console.log("Injected AI Consulting forms!");
}

fs.writeFileSync(pagePath, content);
console.log("File saved.");
