const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'app/admin/(dashboard)/website-pages/page.jsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Sidebar Tabs
const sidebarAnchor = `                                    <Search className="w-4 h-4" /> General Settings
                                </button>`;
const sidebarTabs = `
                                {editPage.path === "/cms" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("cms-hero")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'cms-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> CMS Hero
                                        </button>
                                        <button onClick={() => setActiveEditTab("cms-intro")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'cms-intro' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> CMS Intro
                                        </button>
                                        <button onClick={() => setActiveEditTab("cms-best")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'cms-best' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> CMS Best
                                        </button>
                                        <button onClick={() => setActiveEditTab("cms-services")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'cms-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> CMS Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("cms-process")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'cms-process' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> CMS Process
                                        </button>
                                        <button onClick={() => setActiveEditTab("cms-benefits")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'cms-benefits' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> CMS Benefits
                                        </button>
                                        <button onClick={() => setActiveEditTab("cms-chooseus")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'cms-chooseus' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> CMS Why Choose Us
                                        </button>
                                    </>
                                )}`;

const sidebarRegex = /<Search className="w-4 h-4" \/> General Settings\s*<\/button>/;

if (sidebarRegex.test(content) && !content.includes('setActiveEditTab("cms-hero")')) {
    content = content.replace(sidebarRegex, match => match + "\n" + sidebarTabs);
    console.log("Injected Sidebar Tabs");
}

// 2. UI Blocks
const uiAnchor = `{/* EVENTS HERO TAB */}`;
const uiBlocks = `
                                {/* CMS HERO TAB */}
                                {activeEditTab === "cms-hero" && editPage.path === "/cms" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CMS Hero Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Badge Text</label>
                                                    <input type="text" value={editFormData.content?.cmsHero?.badge || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsHero: { ...editFormData.content?.cmsHero, badge: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="CMS Development" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Main Title</label>
                                                    <input type="text" value={editFormData.content?.cmsHero?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsHero: { ...editFormData.content?.cmsHero, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Content Management" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Highlight Word</label>
                                                    <input type="text" value={editFormData.content?.cmsHero?.highlight || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsHero: { ...editFormData.content?.cmsHero, highlight: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="System" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                    <textarea value={editFormData.content?.cmsHero?.description || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsHero: { ...editFormData.content?.cmsHero, description: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="Empowering businesses..." />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hero Banner Image (Cloudinary)</label>
                                                    <ImageUploader 
                                                        value={editFormData.content?.cmsHero?.bannerImage || ""} 
                                                        onChange={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsHero: { ...editFormData.content?.cmsHero, bannerImage: url } } })} 
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Banner Opacity Overlay (0 to 100)</label>
                                                    <input type="number" min="0" max="100" value={editFormData.content?.cmsHero?.bannerOpacity ?? 70} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsHero: { ...editFormData.content?.cmsHero, bannerOpacity: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="70" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CMS INTRO TAB */}
                                {activeEditTab === "cms-intro" && editPage.path === "/cms" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CMS Intro Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.cmsIntro?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsIntro: { ...editFormData.content?.cmsIntro, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="What is the role of CMS Development Company in India" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                <textarea value={editFormData.content?.cmsIntro?.description || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsIntro: { ...editFormData.content?.cmsIntro, description: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[120px]" placeholder="As the name implies..." />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CMS BEST TAB */}
                                {activeEditTab === "cms-best" && editPage.path === "/cms" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CMS Best Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.cmsBest?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsBest: { ...editFormData.content?.cmsBest, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Recenturesoft: The Best CMS Development Company" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description Paragraph 1</label>
                                                <textarea value={editFormData.content?.cmsBest?.desc1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsBest: { ...editFormData.content?.cmsBest, desc1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[100px]" placeholder="Recenturesoft's Custom CMS Solutions are specially designed..." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description Paragraph 2</label>
                                                <textarea value={editFormData.content?.cmsBest?.desc2 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsBest: { ...editFormData.content?.cmsBest, desc2: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[100px]" placeholder="Our range of CMS website development services..." />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CMS SERVICES TAB */}
                                {activeEditTab === "cms-services" && editPage.path === "/cms" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CMS Services Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.cmsServices?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsServices: { ...editFormData.content?.cmsServices, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="CMS Development Services In India" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Intro Paragraph</label>
                                                <textarea value={editFormData.content?.cmsServices?.intro || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsServices: { ...editFormData.content?.cmsServices, intro: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="Our experienced CMS developers are proficient..." />
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Services Items ({(editFormData.content?.cmsServices?.items || []).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentItems = editFormData.content?.cmsServices?.items || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsServices: { ...editFormData.content?.cmsServices, items: [...currentItems, { title: "", desc: "" }] } } });
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    Add Item
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.cmsServices?.items || []).map((item, idx) => (
                                                    <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg relative flex flex-col gap-3">
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                                                            <input type="text" value={item.title || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.cmsServices?.items || [])];
                                                                newItems[idx] = { ...newItems[idx], title: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsServices: { ...editFormData.content?.cmsServices, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="CMS Integrations" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                                                            <textarea value={item.desc || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.cmsServices?.items || [])];
                                                                newItems[idx] = { ...newItems[idx], desc: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsServices: { ...editFormData.content?.cmsServices, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm min-h-[60px]" placeholder="Our team can integrate a huge range..." />
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                const newItems = [...(editFormData.content?.cmsServices?.items || [])];
                                                                newItems.splice(idx, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsServices: { ...editFormData.content?.cmsServices, items: newItems } } });
                                                            }}
                                                            className="text-red-500 hover:text-red-600 absolute top-2 right-2 p-1 bg-white dark:bg-slate-800 rounded-full shadow-sm"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CMS PROCESS TAB */}
                                {activeEditTab === "cms-process" && editPage.path === "/cms" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CMS Process Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.cmsProcess?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsProcess: { ...editFormData.content?.cmsProcess, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Process Of CMS Development Company:" />
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Process Items ({(editFormData.content?.cmsProcess?.items || []).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentItems = editFormData.content?.cmsProcess?.items || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsProcess: { ...editFormData.content?.cmsProcess, items: [...currentItems, { title: "", desc: "" }] } } });
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    Add Item
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.cmsProcess?.items || []).map((item, idx) => (
                                                    <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg relative flex flex-col gap-3">
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                                                            <input type="text" value={item.title || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.cmsProcess?.items || [])];
                                                                newItems[idx] = { ...newItems[idx], title: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsProcess: { ...editFormData.content?.cmsProcess, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Review & Planning" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                                                            <textarea value={item.desc || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.cmsProcess?.items || [])];
                                                                newItems[idx] = { ...newItems[idx], desc: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsProcess: { ...editFormData.content?.cmsProcess, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm min-h-[60px]" placeholder="Our experts will first start by analysing..." />
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                const newItems = [...(editFormData.content?.cmsProcess?.items || [])];
                                                                newItems.splice(idx, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsProcess: { ...editFormData.content?.cmsProcess, items: newItems } } });
                                                            }}
                                                            className="text-red-500 hover:text-red-600 absolute top-2 right-2 p-1 bg-white dark:bg-slate-800 rounded-full shadow-sm"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CMS BENEFITS TAB */}
                                {activeEditTab === "cms-benefits" && editPage.path === "/cms" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CMS Benefits Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.cmsBenefits?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsBenefits: { ...editFormData.content?.cmsBenefits, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Benefits Of Implementing A CMS System:" />
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Benefits Items ({(editFormData.content?.cmsBenefits?.items || []).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentItems = editFormData.content?.cmsBenefits?.items || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsBenefits: { ...editFormData.content?.cmsBenefits, items: [...currentItems, { title: "", desc: "" }] } } });
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    Add Item
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.cmsBenefits?.items || []).map((item, idx) => (
                                                    <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg relative flex flex-col gap-3">
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                                                            <input type="text" value={item.title || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.cmsBenefits?.items || [])];
                                                                newItems[idx] = { ...newItems[idx], title: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsBenefits: { ...editFormData.content?.cmsBenefits, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Allows multiple users" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                                                            <textarea value={item.desc || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.cmsBenefits?.items || [])];
                                                                newItems[idx] = { ...newItems[idx], desc: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsBenefits: { ...editFormData.content?.cmsBenefits, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm min-h-[60px]" placeholder="Our CMS Development Company makes it easy..." />
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                const newItems = [...(editFormData.content?.cmsBenefits?.items || [])];
                                                                newItems.splice(idx, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsBenefits: { ...editFormData.content?.cmsBenefits, items: newItems } } });
                                                            }}
                                                            className="text-red-500 hover:text-red-600 absolute top-2 right-2 p-1 bg-white dark:bg-slate-800 rounded-full shadow-sm"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CMS CHOOSE US TAB */}
                                {activeEditTab === "cms-chooseus" && editPage.path === "/cms" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CMS Why Choose Us Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.cmsChooseUs?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsChooseUs: { ...editFormData.content?.cmsChooseUs, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Why Choose Our CMS Development Company?" />
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Why Choose Us Items ({(editFormData.content?.cmsChooseUs?.items || []).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentItems = editFormData.content?.cmsChooseUs?.items || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsChooseUs: { ...editFormData.content?.cmsChooseUs, items: [...currentItems, { title: "", desc: "" }] } } });
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    Add Item
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.cmsChooseUs?.items || []).map((item, idx) => (
                                                    <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg relative flex flex-col gap-3">
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                                                            <input type="text" value={item.title || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.cmsChooseUs?.items || [])];
                                                                newItems[idx] = { ...newItems[idx], title: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsChooseUs: { ...editFormData.content?.cmsChooseUs, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Trusted Team" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                                                            <textarea value={item.desc || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.cmsChooseUs?.items || [])];
                                                                newItems[idx] = { ...newItems[idx], desc: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsChooseUs: { ...editFormData.content?.cmsChooseUs, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm min-h-[60px]" placeholder="Our team of experienced members..." />
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                const newItems = [...(editFormData.content?.cmsChooseUs?.items || [])];
                                                                newItems.splice(idx, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsChooseUs: { ...editFormData.content?.cmsChooseUs, items: newItems } } });
                                                            }}
                                                            className="text-red-500 hover:text-red-600 absolute top-2 right-2 p-1 bg-white dark:bg-slate-800 rounded-full shadow-sm"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 mt-4">Footer Text</label>
                                                <textarea value={editFormData.content?.cmsChooseUs?.footerText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, cmsChooseUs: { ...editFormData.content?.cmsChooseUs, footerText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="Get in touch with our Best CMS Development Company..." />
                                            </div>
                                        </div>
                                    </div>
                                )}
`;

if (content.includes(uiAnchor) && !content.includes('activeEditTab === "cms-hero"')) {
    content = content.replace(uiAnchor, uiBlocks + "\n" + uiAnchor);
    console.log("Injected UI Blocks");
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log("Done");
