const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'app/admin/(dashboard)/website-pages/page.jsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Sidebar Tabs
const sidebarTabs = `
                                {editPage.path === "/salesforce" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("salesforce-hero")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'salesforce-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> Salesforce Hero
                                        </button>
                                        <button onClick={() => setActiveEditTab("salesforce-intro")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'salesforce-intro' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> Intro Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("salesforce-whatWeDo")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'salesforce-whatWeDo' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> What We Do
                                        </button>
                                        <button onClick={() => setActiveEditTab("salesforce-integration")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'salesforce-integration' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> Integration Company
                                        </button>
                                        <button onClick={() => setActiveEditTab("salesforce-whatWeBring")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'salesforce-whatWeBring' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> What We Bring
                                        </button>
                                        <button onClick={() => setActiveEditTab("salesforce-solutionsDeliver")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'salesforce-solutionsDeliver' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> Solutions Deliver
                                        </button>
                                        <button onClick={() => setActiveEditTab("salesforce-whatWeCanDo")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'salesforce-whatWeCanDo' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> What We Can Do
                                        </button>
                                    </>
                                )}`;

const sidebarRegex = /<Search className="w-4 h-4" \/> General Settings\r?\n\s*<\/button>/;
if (!content.includes('setActiveEditTab("salesforce-hero")')) {
    if (sidebarRegex.test(content)) {
        content = content.replace(sidebarRegex, match => match + "\n" + sidebarTabs);
        console.log("Injected Salesforce Sidebar Tabs");
    } else {
        console.log("Failed to find sidebar anchor");
    }
}

// 2. UI Blocks
const uiAnchorStr = `{/* EVENTS HERO TAB */}`;
const uiBlocks = `
                                {/* SALESFORCE HERO TAB */}
                                {activeEditTab === "salesforce-hero" && editPage.path === "/salesforce" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Salesforce Hero Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Badge Text</label>
                                                    <input type="text" value={editFormData.content?.hero?.badge || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, hero: { ...editFormData.content?.hero, badge: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Salesforce Integration" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Main Title</label>
                                                    <input type="text" value={editFormData.content?.hero?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, hero: { ...editFormData.content?.hero, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Salesforce" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Highlight Word</label>
                                                    <input type="text" value={editFormData.content?.hero?.highlight || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, hero: { ...editFormData.content?.hero, highlight: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Solutions" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                    <textarea value={editFormData.content?.hero?.description || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, hero: { ...editFormData.content?.hero, description: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="Leverage the world's leading CRM platform..." />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hero Desktop Banner (Cloudinary)</label>
                                                    <ImageUploader 
                                                        value={editFormData.content?.hero?.bannerImage || ""} 
                                                        onChange={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, hero: { ...editFormData.content?.hero, bannerImage: url } } })} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SALESFORCE INTRO TAB */}
                                {activeEditTab === "salesforce-intro" && editPage.path === "/salesforce" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Intro Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.salesforceIntro?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceIntro: { ...editFormData.content?.salesforceIntro, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Increase Business Efficiency..." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Paragraph 1</label>
                                                <textarea value={editFormData.content?.salesforceIntro?.p1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceIntro: { ...editFormData.content?.salesforceIntro, p1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="The road to gaining customers goes through..." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Paragraph 2</label>
                                                <textarea value={editFormData.content?.salesforceIntro?.p2 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceIntro: { ...editFormData.content?.salesforceIntro, p2: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="We provide personalised services..." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Paragraph 3</label>
                                                <textarea value={editFormData.content?.salesforceIntro?.p3 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceIntro: { ...editFormData.content?.salesforceIntro, p3: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="Recenturesoft’s Salesforce puts your target customers..." />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SALESFORCE WHAT WE DO TAB */}
                                {activeEditTab === "salesforce-whatWeDo" && editPage.path === "/salesforce" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">What We Do Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.salesforceWhatWeDo?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeDo: { ...editFormData.content?.salesforceWhatWeDo, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="What we do?" />
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Items ({(editFormData.content?.salesforceWhatWeDo?.items || []).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentItems = editFormData.content?.salesforceWhatWeDo?.items || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeDo: { ...editFormData.content?.salesforceWhatWeDo, items: [...currentItems, ""] } } });
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    Add Item
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.salesforceWhatWeDo?.items || []).map((item, idx) => (
                                                    <div key={idx} className="relative flex gap-2">
                                                        <input type="text" value={item || ""} onChange={(e) => {
                                                            const newItems = [...(editFormData.content?.salesforceWhatWeDo?.items || [])];
                                                            newItems[idx] = e.target.value;
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeDo: { ...editFormData.content?.salesforceWhatWeDo, items: newItems } } });
                                                        }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Strategic assessment" />
                                                        <button 
                                                            onClick={() => {
                                                                const newItems = [...(editFormData.content?.salesforceWhatWeDo?.items || [])];
                                                                newItems.splice(idx, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeDo: { ...editFormData.content?.salesforceWhatWeDo, items: newItems } } });
                                                            }}
                                                            className="text-red-500 hover:text-red-600 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SALESFORCE INTEGRATION TAB */}
                                {activeEditTab === "salesforce-integration" && editPage.path === "/salesforce" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Integration Company Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.salesforceIntegration?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceIntegration: { ...editFormData.content?.salesforceIntegration, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Salesforce Integration Company in India" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Paragraph 1</label>
                                                <textarea value={editFormData.content?.salesforceIntegration?.p1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceIntegration: { ...editFormData.content?.salesforceIntegration, p1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="We help you achieve real, tangible, and significant business results..." />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SALESFORCE WHAT WE BRING TAB */}
                                {activeEditTab === "salesforce-whatWeBring" && editPage.path === "/salesforce" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">What We Bring Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.salesforceWhatWeBring?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeBring: { ...editFormData.content?.salesforceWhatWeBring, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="What we bring to your project?" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Intro Paragraph</label>
                                                <textarea value={editFormData.content?.salesforceWhatWeBring?.intro || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeBring: { ...editFormData.content?.salesforceWhatWeBring, intro: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[60px]" placeholder="Recenturesoft’s team is qualified to deliver..." />
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Items ({(editFormData.content?.salesforceWhatWeBring?.items || []).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentItems = editFormData.content?.salesforceWhatWeBring?.items || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeBring: { ...editFormData.content?.salesforceWhatWeBring, items: [...currentItems, ""] } } });
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    Add Item
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.salesforceWhatWeBring?.items || []).map((item, idx) => (
                                                    <div key={idx} className="relative flex gap-2">
                                                        <input type="text" value={item || ""} onChange={(e) => {
                                                            const newItems = [...(editFormData.content?.salesforceWhatWeBring?.items || [])];
                                                            newItems[idx] = e.target.value;
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeBring: { ...editFormData.content?.salesforceWhatWeBring, items: newItems } } });
                                                        }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Roll-out of the sales cloud" />
                                                        <button 
                                                            onClick={() => {
                                                                const newItems = [...(editFormData.content?.salesforceWhatWeBring?.items || [])];
                                                                newItems.splice(idx, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeBring: { ...editFormData.content?.salesforceWhatWeBring, items: newItems } } });
                                                            }}
                                                            className="text-red-500 hover:text-red-600 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 mt-4">Outro Paragraph</label>
                                                <textarea value={editFormData.content?.salesforceWhatWeBring?.outro || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeBring: { ...editFormData.content?.salesforceWhatWeBring, outro: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[60px]" placeholder="Recenturesoft comprehends the idea of being connected..." />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SALESFORCE SOLUTIONS DELIVER TAB */}
                                {activeEditTab === "salesforce-solutionsDeliver" && editPage.path === "/salesforce" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Solutions Deliver Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.salesforceSolutionsDeliver?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceSolutionsDeliver: { ...editFormData.content?.salesforceSolutionsDeliver, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Our salesforce solutions deliver:" />
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Items ({(editFormData.content?.salesforceSolutionsDeliver?.items || []).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentItems = editFormData.content?.salesforceSolutionsDeliver?.items || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceSolutionsDeliver: { ...editFormData.content?.salesforceSolutionsDeliver, items: [...currentItems, ""] } } });
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    Add Item
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.salesforceSolutionsDeliver?.items || []).map((item, idx) => (
                                                    <div key={idx} className="relative flex gap-2">
                                                        <input type="text" value={item || ""} onChange={(e) => {
                                                            const newItems = [...(editFormData.content?.salesforceSolutionsDeliver?.items || [])];
                                                            newItems[idx] = e.target.value;
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceSolutionsDeliver: { ...editFormData.content?.salesforceSolutionsDeliver, items: newItems } } });
                                                        }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Improved business efficiency" />
                                                        <button 
                                                            onClick={() => {
                                                                const newItems = [...(editFormData.content?.salesforceSolutionsDeliver?.items || [])];
                                                                newItems.splice(idx, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceSolutionsDeliver: { ...editFormData.content?.salesforceSolutionsDeliver, items: newItems } } });
                                                            }}
                                                            className="text-red-500 hover:text-red-600 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 mt-4">Outro Paragraph</label>
                                                <textarea value={editFormData.content?.salesforceSolutionsDeliver?.outro || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceSolutionsDeliver: { ...editFormData.content?.salesforceSolutionsDeliver, outro: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[60px]" placeholder="We also provide Salesforce add-ons..." />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SALESFORCE WHAT WE CAN DO TAB */}
                                {activeEditTab === "salesforce-whatWeCanDo" && editPage.path === "/salesforce" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">What We Can Do Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.salesforceWhatWeCanDo?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeCanDo: { ...editFormData.content?.salesforceWhatWeCanDo, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="What we can do" />
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Items ({(editFormData.content?.salesforceWhatWeCanDo?.items || []).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentItems = editFormData.content?.salesforceWhatWeCanDo?.items || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeCanDo: { ...editFormData.content?.salesforceWhatWeCanDo, items: [...currentItems, ""] } } });
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    Add Item
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.salesforceWhatWeCanDo?.items || []).map((item, idx) => (
                                                    <div key={idx} className="relative flex gap-2">
                                                        <textarea value={item || ""} onChange={(e) => {
                                                            const newItems = [...(editFormData.content?.salesforceWhatWeCanDo?.items || [])];
                                                            newItems[idx] = e.target.value;
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeCanDo: { ...editFormData.content?.salesforceWhatWeCanDo, items: newItems } } });
                                                        }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm min-h-[40px]" placeholder="Transform scattered customer..." />
                                                        <button 
                                                            onClick={() => {
                                                                const newItems = [...(editFormData.content?.salesforceWhatWeCanDo?.items || [])];
                                                                newItems.splice(idx, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeCanDo: { ...editFormData.content?.salesforceWhatWeCanDo, items: newItems } } });
                                                            }}
                                                            className="text-red-500 hover:text-red-600 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 h-fit"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 mt-4">Paragraph 1</label>
                                                <textarea value={editFormData.content?.salesforceWhatWeCanDo?.p1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeCanDo: { ...editFormData.content?.salesforceWhatWeCanDo, p1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Paragraph 2</label>
                                                <textarea value={editFormData.content?.salesforceWhatWeCanDo?.p2 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeCanDo: { ...editFormData.content?.salesforceWhatWeCanDo, p2: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Paragraph 3</label>
                                                <textarea value={editFormData.content?.salesforceWhatWeCanDo?.p3 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeCanDo: { ...editFormData.content?.salesforceWhatWeCanDo, p3: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Paragraph 4</label>
                                                <textarea value={editFormData.content?.salesforceWhatWeCanDo?.p4 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, salesforceWhatWeCanDo: { ...editFormData.content?.salesforceWhatWeCanDo, p4: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" />
                                            </div>
                                        </div>
                                    </div>
                                )}
`;

if (!content.includes('activeEditTab === "salesforce-hero"')) {
    content = content.replace(uiAnchorStr, uiBlocks + "\n" + uiAnchorStr);
    console.log("Injected UI Blocks");
} else {
    console.log("Salesforce UI already present");
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log("Done");
