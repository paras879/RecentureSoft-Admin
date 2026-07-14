const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'app/admin/(dashboard)/website-pages/page.jsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Sidebar Tabs
const sidebarTabs = `
                                {editPage.path === "/crm" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("crm-page-hero")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'crm-page-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> CRM Hero
                                        </button>
                                        <button onClick={() => setActiveEditTab("crm-page-intro")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'crm-page-intro' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> CRM Intro & Fundamentals
                                        </button>
                                        <button onClick={() => setActiveEditTab("crm-page-best")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'crm-page-best' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> CRM Best
                                        </button>
                                        <button onClick={() => setActiveEditTab("crm-page-services")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'crm-page-services' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> CRM Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("crm-page-process")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'crm-page-process' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> CRM Process
                                        </button>
                                        <button onClick={() => setActiveEditTab("crm-page-benefits")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'crm-page-benefits' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> CRM Benefits
                                        </button>
                                    </>
                                )}`;

const sidebarRegex = /<Search className="w-4 h-4" \/> General Settings\r?\n\s*<\/button>/;
if (!content.includes('setActiveEditTab("crm-page-hero")')) {
    if (sidebarRegex.test(content)) {
        content = content.replace(sidebarRegex, match => match + "\n" + sidebarTabs);
        console.log("Injected CRM Sidebar Tabs (via regex)");
    } else {
        console.log("Failed to find sidebar anchor");
    }
}

// 2. UI Blocks
const uiAnchorStr = `{/* EVENTS HERO TAB */}`;
const uiBlocks = `
                                {/* CRM HERO TAB */}
                                {activeEditTab === "crm-page-hero" && editPage.path === "/crm" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CRM Hero Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Badge Text</label>
                                                    <input type="text" value={editFormData.content?.crmHero?.badge || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmHero: { ...editFormData.content?.crmHero, badge: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="CRM Development" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Main Title</label>
                                                    <input type="text" value={editFormData.content?.crmHero?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmHero: { ...editFormData.content?.crmHero, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Customer Relationship" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Highlight Word</label>
                                                    <input type="text" value={editFormData.content?.crmHero?.highlight || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmHero: { ...editFormData.content?.crmHero, highlight: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Management" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hero Desktop Banner (Cloudinary)</label>
                                                    <ImageUploader 
                                                        value={editFormData.content?.crmHero?.bannerImage || ""} 
                                                        onChange={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmHero: { ...editFormData.content?.crmHero, bannerImage: url } } })} 
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hero Mobile Banner (Cloudinary)</label>
                                                    <ImageUploader 
                                                        value={editFormData.content?.crmHero?.bannerMobile || ""} 
                                                        onChange={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmHero: { ...editFormData.content?.crmHero, bannerMobile: url } } })} 
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Banner Opacity Overlay (0 to 100)</label>
                                                    <input type="number" min="0" max="100" value={editFormData.content?.crmHero?.bannerOpacity ?? 70} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmHero: { ...editFormData.content?.crmHero, bannerOpacity: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="70" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CRM INTRO & FUNDAMENTALS TAB */}
                                {activeEditTab === "crm-page-intro" && editPage.path === "/crm" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CRM Intro & Fundamentals</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <h4 className="font-semibold text-slate-800 dark:text-slate-200 border-b pb-2 mb-2">Intro Section</h4>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.crmIntro?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmIntro: { ...editFormData.content?.crmIntro, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="How Does CRM Development Company in India operate?" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Paragraph 1</label>
                                                <textarea value={editFormData.content?.crmIntro?.p1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmIntro: { ...editFormData.content?.crmIntro, p1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="CRM or Customer Relationship Management is a type of data-driven software..." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Paragraph 2</label>
                                                <textarea value={editFormData.content?.crmIntro?.p2 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmIntro: { ...editFormData.content?.crmIntro, p2: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="CRM software development services in India can help improve profitability..." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Paragraph 3</label>
                                                <textarea value={editFormData.content?.crmIntro?.p3 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmIntro: { ...editFormData.content?.crmIntro, p3: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="A powerful CRM solution offers a well-integrated platform..." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Paragraph 4</label>
                                                <textarea value={editFormData.content?.crmIntro?.p4 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmIntro: { ...editFormData.content?.crmIntro, p4: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="Also, without partnering with a CRM development company in India..." />
                                            </div>
                                            
                                            <h4 className="font-semibold text-slate-800 dark:text-slate-200 border-b pb-2 mb-2 mt-6">Fundamentals Section</h4>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fundamentals Heading</label>
                                                <input type="text" value={editFormData.content?.crmFundamentals?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmFundamentals: { ...editFormData.content?.crmFundamentals, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Below Are The Fundamental Benefits Of CRM Software Development Services In India:" />
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Fundamental Items ({(editFormData.content?.crmFundamentals?.items || []).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentItems = editFormData.content?.crmFundamentals?.items || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, crmFundamentals: { ...editFormData.content?.crmFundamentals, items: [...currentItems, ""] } } });
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    Add Item
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.crmFundamentals?.items || []).map((item, idx) => (
                                                    <div key={idx} className="relative flex flex-col gap-3">
                                                        <div className="flex gap-2">
                                                            <textarea value={item || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.crmFundamentals?.items || [])];
                                                                newItems[idx] = e.target.value;
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, crmFundamentals: { ...editFormData.content?.crmFundamentals, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm min-h-[60px]" placeholder="A CRM database of mutual contacts..." />
                                                            <button 
                                                                onClick={() => {
                                                                    const newItems = [...(editFormData.content?.crmFundamentals?.items || [])];
                                                                    newItems.splice(idx, 1);
                                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, crmFundamentals: { ...editFormData.content?.crmFundamentals, items: newItems } } });
                                                                }}
                                                                className="text-red-500 hover:text-red-600 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 h-fit"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CRM BEST TAB */}
                                {activeEditTab === "crm-page-best" && editPage.path === "/crm" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CRM Best Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.crmBest?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmBest: { ...editFormData.content?.crmBest, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Recenturesoft: The Best CRM Software Development Company In India" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description Paragraph 1</label>
                                                <textarea value={editFormData.content?.crmBest?.p1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmBest: { ...editFormData.content?.crmBest, p1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[100px]" placeholder="Recenturesoft offers full-scale software development services..." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description Paragraph 2</label>
                                                <textarea value={editFormData.content?.crmBest?.p2 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmBest: { ...editFormData.content?.crmBest, p2: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[100px]" placeholder="Moreover, our team has the most advanced tools..." />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CRM SERVICES TAB */}
                                {activeEditTab === "crm-page-services" && editPage.path === "/crm" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CRM Services Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.crmServices?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmServices: { ...editFormData.content?.crmServices, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Recenturesoft Services: CRM Development Company In India" />
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Services Items ({(editFormData.content?.crmServices?.items || []).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentItems = editFormData.content?.crmServices?.items || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, crmServices: { ...editFormData.content?.crmServices, items: [...currentItems, { title: "", desc: "" }] } } });
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    Add Item
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.crmServices?.items || []).map((item, idx) => (
                                                    <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg relative flex flex-col gap-3">
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                                                            <input type="text" value={item.title || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.crmServices?.items || [])];
                                                                newItems[idx] = { ...newItems[idx], title: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, crmServices: { ...editFormData.content?.crmServices, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Full Integration" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                                                            <textarea value={item.desc || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.crmServices?.items || [])];
                                                                newItems[idx] = { ...newItems[idx], desc: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, crmServices: { ...editFormData.content?.crmServices, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm min-h-[60px]" placeholder="Integrate platforms like WhatsApp, SFA, or Hubspot..." />
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                const newItems = [...(editFormData.content?.crmServices?.items || [])];
                                                                newItems.splice(idx, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, crmServices: { ...editFormData.content?.crmServices, items: newItems } } });
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

                                {/* CRM PROCESS TAB */}
                                {activeEditTab === "crm-page-process" && editPage.path === "/crm" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CRM Process Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.crmProcess?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmProcess: { ...editFormData.content?.crmProcess, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Process Of CRM Development Company In India" />
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Process Items ({(editFormData.content?.crmProcess?.items || []).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentItems = editFormData.content?.crmProcess?.items || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, crmProcess: { ...editFormData.content?.crmProcess, items: [...currentItems, { stage: "", desc: "" }] } } });
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    Add Item
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.crmProcess?.items || []).map((item, idx) => (
                                                    <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg relative flex flex-col gap-3">
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Stage Title</label>
                                                            <input type="text" value={item.stage || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.crmProcess?.items || [])];
                                                                newItems[idx] = { ...newItems[idx], stage: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, crmProcess: { ...editFormData.content?.crmProcess, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Stage 1: Design" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                                                            <textarea value={item.desc || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.crmProcess?.items || [])];
                                                                newItems[idx] = { ...newItems[idx], desc: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, crmProcess: { ...editFormData.content?.crmProcess, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm min-h-[60px]" placeholder="Analyse the business and software requirements..." />
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                const newItems = [...(editFormData.content?.crmProcess?.items || [])];
                                                                newItems.splice(idx, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, crmProcess: { ...editFormData.content?.crmProcess, items: newItems } } });
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

                                {/* CRM BENEFITS TAB */}
                                {activeEditTab === "crm-page-benefits" && editPage.path === "/crm" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CRM Benefits Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.crmBenefits?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmBenefits: { ...editFormData.content?.crmBenefits, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Benefits Of CRM Development Company In India" />
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Benefits Items ({(editFormData.content?.crmBenefits?.items || []).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentItems = editFormData.content?.crmBenefits?.items || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, crmBenefits: { ...editFormData.content?.crmBenefits, items: [...currentItems, { title: "", desc: "" }] } } });
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    Add Item
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.crmBenefits?.items || []).map((item, idx) => (
                                                    <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg relative flex flex-col gap-3">
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                                                            <input type="text" value={item.title || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.crmBenefits?.items || [])];
                                                                newItems[idx] = { ...newItems[idx], title: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, crmBenefits: { ...editFormData.content?.crmBenefits, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Marketing" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                                                            <textarea value={item.desc || ""} onChange={(e) => {
                                                                const newItems = [...(editFormData.content?.crmBenefits?.items || [])];
                                                                newItems[idx] = { ...newItems[idx], desc: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, crmBenefits: { ...editFormData.content?.crmBenefits, items: newItems } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm min-h-[60px]" placeholder="Develop multi-channel campaigns with email marketing..." />
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                const newItems = [...(editFormData.content?.crmBenefits?.items || [])];
                                                                newItems.splice(idx, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, crmBenefits: { ...editFormData.content?.crmBenefits, items: newItems } } });
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
`;

if (!content.includes('activeEditTab === "crm-page-hero"')) {
    content = content.replace(uiAnchorStr, uiBlocks + "\\n" + uiAnchorStr);
    console.log("Injected UI Blocks");
} else {
    console.log("CRM UI already present");
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log("Done");
