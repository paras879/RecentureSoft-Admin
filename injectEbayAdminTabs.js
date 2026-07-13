const fs = require('fs');

const pagePath = "c:/Users/Paras Tomar/OneDrive/Desktop/RecentureSoft-Admin/app/admin/(dashboard)/website-pages/page.jsx";
let content = fs.readFileSync(pagePath, 'utf8');

function getDynamicArrayUI(tabName, sectionName, fieldName, cardLabel) {
    return `
                                {/* ${tabName.toUpperCase()} TAB */}
                                {activeEditTab === "${tabName}" && editPage.path === "/ebay-store-management" && (
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
                                                        <Plus className="w-4 h-4" /> Add Card
                                                    </button>
                                                </div>
                                                {(editFormData.content?.${fieldName}?.cards || []).map((card, i) => (
                                                    <div key={i} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/50 space-y-3 relative">
                                                        <div className="flex items-center justify-between">
                                                            <div className="font-medium text-sm text-slate-500">Card {i+1}</div>
                                                            <button 
                                                                onClick={() => {
                                                                    const currentCards = [...(editFormData.content?.${fieldName}?.cards || [])];
                                                                    currentCards.splice(i, 1);
                                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ${fieldName}: { ...editFormData.content?.${fieldName}, cards: currentCards } } });
                                                                }}
                                                                className="text-red-500 hover:text-red-600 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                                title="Delete Card"
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
                                                        
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Custom Image / Icon (Optional)</label>
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
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}`;
}

const introTab = `
                                {/* EBAY INTRO TAB */}
                                {activeEditTab === "ebay-intro" && editPage.path === "/ebay-store-management" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Intro Section Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Intro Heading</label>
                                                <input type="text" value={editFormData.content?.ebayIntro?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ebayIntro: { ...editFormData.content?.ebayIntro, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Intro Description</label>
                                                <textarea value={editFormData.content?.ebayIntro?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ebayIntro: { ...editFormData.content?.ebayIntro, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[100px]" />
                                            </div>
                                        </div>
                                    </div>
                                )}`;

const valueTab = `
                                {/* EBAY VALUE TAB */}
                                {activeEditTab === "ebay-value" && editPage.path === "/ebay-store-management" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Value Proposition Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Value Heading</label>
                                                <input type="text" value={editFormData.content?.ebayValue?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ebayValue: { ...editFormData.content?.ebayValue, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description 1</label>
                                                <textarea value={editFormData.content?.ebayValue?.desc1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ebayValue: { ...editFormData.content?.ebayValue, desc1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={2} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description 2</label>
                                                <textarea value={editFormData.content?.ebayValue?.desc2 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ebayValue: { ...editFormData.content?.ebayValue, desc2: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={2} />
                                            </div>
                                            <hr className="my-4 border-slate-200 dark:border-slate-700" />
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Highlight Box Title</label>
                                                <input type="text" value={editFormData.content?.ebayValue?.boxTitle || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ebayValue: { ...editFormData.content?.ebayValue, boxTitle: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Highlight Box Content (HTML Supported)</label>
                                                <textarea value={editFormData.content?.ebayValue?.boxDesc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ebayValue: { ...editFormData.content?.ebayValue, boxDesc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={3} />
                                            </div>
                                        </div>
                                    </div>
                                )}`;

const ctaTab = `
                                {/* EBAY CTA TAB */}
                                {activeEditTab === "ebay-cta" && editPage.path === "/ebay-store-management" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CTA Section Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CTA Title</label>
                                                <input type="text" value={editFormData.content?.ebayCTA?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ebayCTA: { ...editFormData.content?.ebayCTA, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CTA Description</label>
                                                <textarea value={editFormData.content?.ebayCTA?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ebayCTA: { ...editFormData.content?.ebayCTA, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Button Text</label>
                                                <input type="text" value={editFormData.content?.ebayCTA?.btnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ebayCTA: { ...editFormData.content?.ebayCTA, btnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                )}`;

const ebayTabsContent = `
${introTab}
${valueTab}
${getDynamicArrayUI("ebay-services", "Primary Services", "ebayServices", "Service Cards")}
${getDynamicArrayUI("ebay-offerings", "Additional Offerings", "ebayOfferings", "Offering Cards")}
${ctaTab}
`;

// Inject buttons
const ebayHeroButtonRegex = /<button[\s\S]*?onClick=\{\(\) => setActiveEditTab\("ebay-hero"\)\}[\s\S]*?<\/button>/;

const ebayAdditionalButtons = `
                                        <button
                                            onClick={() => setActiveEditTab("ebay-intro")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'ebay-intro' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <FileText className="w-4 h-4" /> eBay Intro
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("ebay-value")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'ebay-value' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Star className="w-4 h-4" /> Value Proposition
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("ebay-services")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'ebay-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Package className="w-4 h-4" /> Primary Services
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("ebay-offerings")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'ebay-offerings' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <ListChecks className="w-4 h-4" /> Additional Offerings
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("ebay-cta")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'ebay-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> eBay CTA
                                        </button>`;

if (content.match(ebayHeroButtonRegex) && !content.includes(`setActiveEditTab("ebay-intro")`)) {
    const matchedStr = content.match(ebayHeroButtonRegex)[0];
    content = content.replace(ebayHeroButtonRegex, matchedStr + "\n" + ebayAdditionalButtons);
}

// Inject Content Forms right before the eBay Hero Tab rendering
const ebayHeroTabContent = `                                {/* EBAY STORE HERO TAB */}`;
if (content.includes(ebayHeroTabContent) && !content.includes(`{/* EBAY INTRO TAB */}`)) {
    content = content.replace(ebayHeroTabContent, ebayTabsContent + "\n" + ebayHeroTabContent);
}

// Ensure ImageUploader is rendered dynamically for eBay Hero too
const ebayHeroDescRegex = /<textarea value=\{editFormData\.content\?\.ebayHero\?\.description \|\| ""\}[\s\S]*?<\/div>/;
if (content.match(ebayHeroDescRegex) && !content.includes('value={editFormData.content?.ebayHero?.bannerImage')) {
    const matchedStr = content.match(ebayHeroDescRegex)[0];
    const imageUploaderField = `\n                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hero Banner Image</label>
                                                    <ImageUploader 
                                                        value={editFormData.content?.ebayHero?.bannerImage || ""} 
                                                        onChange={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, ebayHero: { ...editFormData.content?.ebayHero, bannerImage: url } } })} 
                                                    />
                                                    <p className="text-xs text-slate-500 mt-1">Recommended size: 1920x1080 (WebP or WebM for videos)</p>
                                                </div>`;
    content = content.replace(ebayHeroDescRegex, matchedStr + imageUploaderField);
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log("eBay Admin Tabs Injected!");
