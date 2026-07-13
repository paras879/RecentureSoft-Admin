const fs = require('fs');
const path = require('path');

const pagePath = "c:/Users/Paras Tomar/OneDrive/Desktop/RecentureSoft-Admin/app/admin/(dashboard)/website-pages/page.jsx";
let content = fs.readFileSync(pagePath, 'utf8');

// We need to inject the tab buttons after the Amazon Hero tab
const amazonHeroButton = `                                        <button
                                            onClick={() => setActiveEditTab("amazon-hero")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'amazon-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Amazon Store Hero
                                        </button>`;

const additionalButtons = `
                                        <button
                                            onClick={() => setActiveEditTab("amazon-intro")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'amazon-intro' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <FileText className="w-4 h-4" /> Amazon Intro
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("amazon-services")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'amazon-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Package className="w-4 h-4" /> Amazon Services
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("amazon-process")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'amazon-process' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <ListChecks className="w-4 h-4" /> Amazon Process
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("amazon-benefits")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'amazon-benefits' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Star className="w-4 h-4" /> Amazon Benefits
                                        </button>`;

if (content.includes(amazonHeroButton) && !content.includes(`setActiveEditTab("amazon-intro")`)) {
    content = content.replace(amazonHeroButton, amazonHeroButton + additionalButtons);
    console.log("Injected buttons");
}

// We need to inject the tab contents right before the Amazon Hero Tab so they are together
const amazonHeroTabContent = `                                {/* AMAZON STORE HERO TAB */}`;

const newTabsContent = `
                                {/* AMAZON INTRO TAB */}
                                {activeEditTab === "amazon-intro" && editPage.path === "/amazon-store-management" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Intro Section Settings</h3>
                                        </div>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Intro Heading</label>
                                                    <input type="text" value={editFormData.content?.amazonIntro?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonIntro: { ...editFormData.content?.amazonIntro, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Manage Items Better with Amazon Store Management" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Intro Description</label>
                                                    <textarea value={editFormData.content?.amazonIntro?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonIntro: { ...editFormData.content?.amazonIntro, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[100px]" placeholder="Making a powerful presence on Amazon requires..." />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* AMAZON SERVICES TAB */}
                                {activeEditTab === "amazon-services" && editPage.path === "/amazon-store-management" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Services Section Settings</h3>
                                        </div>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Section Title</label>
                                                <input type="text" value={editFormData.content?.amazonServices?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonServices: { ...editFormData.content?.amazonServices, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Our Wide Range of Amazon Services" />
                                            </div>

                                            <div className="space-y-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Service Cards (5 Cards)</h4>
                                                {[0,1,2,3,4].map((i) => (
                                                    <div key={i} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                                                        <div className="font-medium text-sm text-slate-500">Card {i+1}</div>
                                                        <input type="text" value={editFormData.content?.amazonServices?.cards?.[i]?.title || ""} onChange={(e) => {
                                                            const newCards = [...(editFormData.content?.amazonServices?.cards || [{},{},{},{},{}])];
                                                            newCards[i] = { ...newCards[i], title: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonServices: { ...editFormData.content?.amazonServices, cards: newCards } } });
                                                        }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Service Title" />
                                                        <textarea value={editFormData.content?.amazonServices?.cards?.[i]?.desc || ""} onChange={(e) => {
                                                            const newCards = [...(editFormData.content?.amazonServices?.cards || [{},{},{},{},{}])];
                                                            newCards[i] = { ...newCards[i], desc: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonServices: { ...editFormData.content?.amazonServices, cards: newCards } } });
                                                        }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Service Description" rows={2} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* AMAZON PROCESS TAB */}
                                {activeEditTab === "amazon-process" && editPage.path === "/amazon-store-management" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Process Section Settings</h3>
                                        </div>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Section Title</label>
                                                <input type="text" value={editFormData.content?.amazonProcess?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonProcess: { ...editFormData.content?.amazonProcess, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Amazon Store Management Process" />
                                            </div>

                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Step 1 Title</label>
                                                    <input type="text" value={editFormData.content?.amazonProcess?.step1Title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonProcess: { ...editFormData.content?.amazonProcess, step1Title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white mb-3" placeholder="Analysis & Roadmap" />
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Step 1 Desc</label>
                                                    <textarea value={editFormData.content?.amazonProcess?.step1Desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonProcess: { ...editFormData.content?.amazonProcess, step1Desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={2} />
                                                </div>
                                                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Step 2 Title</label>
                                                    <input type="text" value={editFormData.content?.amazonProcess?.step2Title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonProcess: { ...editFormData.content?.amazonProcess, step2Title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white mb-3" placeholder="Launch & Support" />
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Step 2 Desc</label>
                                                    <textarea value={editFormData.content?.amazonProcess?.step2Desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonProcess: { ...editFormData.content?.amazonProcess, step2Desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={2} />
                                                </div>
                                                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Checklist Title</label>
                                                    <input type="text" value={editFormData.content?.amazonProcess?.checklistTitle || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonProcess: { ...editFormData.content?.amazonProcess, checklistTitle: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white mb-3" placeholder="Our Development Checklist" />
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Checklist Items (Comma separated)</label>
                                                    <textarea value={editFormData.content?.amazonProcess?.checklistItems?.join("\\n") || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonProcess: { ...editFormData.content?.amazonProcess, checklistItems: e.target.value.split("\\n") } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={6} placeholder="One item per line..." />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* AMAZON BENEFITS TAB */}
                                {activeEditTab === "amazon-benefits" && editPage.path === "/amazon-store-management" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Benefits Section Settings</h3>
                                        </div>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Section Title</label>
                                                <input type="text" value={editFormData.content?.amazonBenefits?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonBenefits: { ...editFormData.content?.amazonBenefits, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Benefits Of Professional Management" />
                                            </div>

                                            <div className="space-y-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Benefit Cards (6 Cards)</h4>
                                                {[0,1,2,3,4,5].map((i) => (
                                                    <div key={i} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                                                        <div className="font-medium text-sm text-slate-500">Card {i+1}</div>
                                                        <input type="text" value={editFormData.content?.amazonBenefits?.cards?.[i]?.title || ""} onChange={(e) => {
                                                            const newCards = [...(editFormData.content?.amazonBenefits?.cards || [{},{},{},{},{},{}])];
                                                            newCards[i] = { ...newCards[i], title: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonBenefits: { ...editFormData.content?.amazonBenefits, cards: newCards } } });
                                                        }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Benefit Title" />
                                                        <textarea value={editFormData.content?.amazonBenefits?.cards?.[i]?.desc || ""} onChange={(e) => {
                                                            const newCards = [...(editFormData.content?.amazonBenefits?.cards || [{},{},{},{},{},{}])];
                                                            newCards[i] = { ...newCards[i], desc: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonBenefits: { ...editFormData.content?.amazonBenefits, cards: newCards } } });
                                                        }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Benefit Description" rows={2} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
`;

if (content.includes(amazonHeroTabContent) && !content.includes(`{/* AMAZON INTRO TAB */}`)) {
    content = content.replace(amazonHeroTabContent, newTabsContent + amazonHeroTabContent);
    console.log("Injected contents");
    
    // Ensure Lucide icons are imported
    if (!content.includes('ListChecks')) {
        content = content.replace('LayoutTemplate', 'LayoutTemplate, FileText, Package, ListChecks, Star');
    }
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log("Complete");
