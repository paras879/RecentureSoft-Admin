const fs = require('fs');
const path = require('path');

const pagePath = "c:/Users/Paras Tomar/OneDrive/Desktop/RecentureSoft-Admin/app/admin/(dashboard)/website-pages/page.jsx";
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Inject the tab buttons
const tabsInjectionPoint = `                                {editPage.path === "/contact" && (`;
const newsTabsButtons = `                                {editPage.path === "/news" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("news-hero")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'news-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> News Hero
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("news-cta")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'news-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <FileText className="w-4 h-4" /> News CTA
                                        </button>
                                    </>
                                )}
`;

if (content.includes(tabsInjectionPoint)) {
    content = content.replace(tabsInjectionPoint, newsTabsButtons + tabsInjectionPoint);
    console.log("Successfully injected news tab buttons");
} else {
    console.log("Failed to find tab buttons injection point");
}


// 2. Inject the tab contents
const contentInjectionPoint = `{/* CONTACT HERO TAB */}`;
const newsTabsJSX = `
                                {/* NEWS HERO TAB */}
                                {activeEditTab === "news-hero" && editPage.path === "/news" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">News Hero Settings</h3>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={editFormData.content?.newsHero?.isVisible !== false} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, newsHero: { ...editFormData.content?.newsHero, isVisible: e.target.checked } } })} className="sr-only peer" />
                                                <div className="relative w-12 h-6 bg-slate-300/80 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300/30 dark:peer-focus:ring-cyan-800/30 rounded-full peer dark:bg-slate-700/80 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 after:shadow-sm dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-blue-500 peer-checked:shadow-lg peer-checked:shadow-cyan-500/40 border border-slate-200 dark:border-slate-600"></div>
                                                <span className="text-sm font-medium text-slate-900 dark:text-gray-300">Visible</span>
                                            </label>
                                        </div>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Badge Text</label>
                                                    <input type="text" value={editFormData.content?.newsHero?.badge || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, newsHero: { ...editFormData.content?.newsHero, badge: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Live Updates" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Main Title</label>
                                                    <input type="text" value={editFormData.content?.newsHero?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, newsHero: { ...editFormData.content?.newsHero, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Tech News" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                    <textarea value={editFormData.content?.newsHero?.description || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, newsHero: { ...editFormData.content?.newsHero, description: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="Discover real-time global technology news..." />
                                                </div>
                                                
                                                <div className="md:col-span-2 flex items-center justify-between mt-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                                    <div>
                                                        <span className="block text-sm font-medium text-slate-900 dark:text-white">Hide Contact Button</span>
                                                        <span className="text-xs text-slate-500 dark:text-slate-400">Hide the default 'Contact Us' button in the Hero section</span>
                                                    </div>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input type="checkbox" checked={editFormData.content?.newsHero?.hideContactButton !== false} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, newsHero: { ...editFormData.content?.newsHero, hideContactButton: e.target.checked } } })} className="sr-only peer" />
                                                        <div className="relative w-10 h-5 bg-slate-300/80 peer-focus:outline-none rounded-full peer dark:bg-slate-700/80 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* NEWS CTA TAB */}
                                {activeEditTab === "news-cta" && editPage.path === "/news" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">News CTA Settings</h3>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={editFormData.content?.newsCTA?.isVisible !== false} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, newsCTA: { ...editFormData.content?.newsCTA, isVisible: e.target.checked } } })} className="sr-only peer" />
                                                <div className="relative w-12 h-6 bg-slate-300/80 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300/30 dark:peer-focus:ring-cyan-800/30 rounded-full peer dark:bg-slate-700/80 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 after:shadow-sm dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-blue-500 peer-checked:shadow-lg peer-checked:shadow-cyan-500/40 border border-slate-200 dark:border-slate-600"></div>
                                                <span className="text-sm font-medium text-slate-900 dark:text-gray-300">Visible</span>
                                            </label>
                                        </div>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CTA Title</label>
                                                    <input type="text" value={editFormData.content?.newsCTA?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, newsCTA: { ...editFormData.content?.newsCTA, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Media Inquiries" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                    <textarea value={editFormData.content?.newsCTA?.description || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, newsCTA: { ...editFormData.content?.newsCTA, description: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="Are you a journalist or analyst?..." />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Primary Button Text</label>
                                                    <input type="text" value={editFormData.content?.newsCTA?.primaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, newsCTA: { ...editFormData.content?.newsCTA, primaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Contact PR Team" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Secondary Button Text</label>
                                                    <input type="text" value={editFormData.content?.newsCTA?.secondaryBtnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, newsCTA: { ...editFormData.content?.newsCTA, secondaryBtnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Download Press Kit" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
`;

if (content.includes(contentInjectionPoint)) {
    content = content.replace(contentInjectionPoint, newsTabsJSX + contentInjectionPoint);
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log("Successfully injected news tabs into page.jsx!");
} else {
    console.log("Failed to find content injection point");
}
