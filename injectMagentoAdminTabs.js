const fs = require('fs');

const pagePath = "c:/Users/Paras Tomar/OneDrive/Desktop/RecentureSoft-Admin/app/admin/(dashboard)/website-pages/page.jsx";
let content = fs.readFileSync(pagePath, 'utf8');

// Function to generate dynamic array UI
function getDynamicArrayUI(tabName, sectionName, fieldName, cardLabel) {
    return `
                                {/* ${tabName.toUpperCase()} TAB */}
                                {activeEditTab === "${tabName}" && editPage.path === "/magento-development" && (
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
                                {/* MAGENTO INTRO TAB */}
                                {activeEditTab === "magento-intro" && editPage.path === "/magento-development" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Intro Section Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Intro Heading</label>
                                                <input type="text" value={editFormData.content?.magentoIntro?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, magentoIntro: { ...editFormData.content?.magentoIntro, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Intro Description</label>
                                                <textarea value={editFormData.content?.magentoIntro?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, magentoIntro: { ...editFormData.content?.magentoIntro, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[100px]" />
                                            </div>
                                        </div>
                                    </div>
                                )}`;

const ctaTab = `
                                {/* MAGENTO CTA TAB */}
                                {activeEditTab === "magento-cta" && editPage.path === "/magento-development" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CTA Section Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CTA Title</label>
                                                <input type="text" value={editFormData.content?.magentoCTA?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, magentoCTA: { ...editFormData.content?.magentoCTA, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CTA Description</label>
                                                <textarea value={editFormData.content?.magentoCTA?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, magentoCTA: { ...editFormData.content?.magentoCTA, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Button Text</label>
                                                <input type="text" value={editFormData.content?.magentoCTA?.btnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, magentoCTA: { ...editFormData.content?.magentoCTA, btnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                )}`;

const magentoTabsContent = `
${introTab}
${getDynamicArrayUI("magento-reasons", "Reasons Section", "magentoReasons", "Reason Cards")}
${getDynamicArrayUI("magento-process", "Lifecycle Process", "magentoProcess", "Steps")}
${getDynamicArrayUI("magento-benefits", "Benefits Section", "magentoBenefits", "Benefit Cards")}
${getDynamicArrayUI("magento-services", "Services List", "magentoServices", "Service Cards")}
${ctaTab}
`;

// Inject buttons
const magentoHeroButtonRegex = /<button[\s\S]*?onClick=\{\(\) => setActiveEditTab\("magento-hero"\)\}[\s\S]*?<\/button>/;

const magentoAdditionalButtons = `
                                        <button
                                            onClick={() => setActiveEditTab("magento-intro")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'magento-intro' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <FileText className="w-4 h-4" /> Magento Intro
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("magento-reasons")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'magento-reasons' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Star className="w-4 h-4" /> Magento Reasons
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("magento-process")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'magento-process' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <ListChecks className="w-4 h-4" /> Magento Lifecycle
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("magento-benefits")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'magento-benefits' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Globe className="w-4 h-4" /> Magento Benefits
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("magento-services")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'magento-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Package className="w-4 h-4" /> Magento Services
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("magento-cta")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'magento-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Magento CTA
                                        </button>`;

if (content.match(magentoHeroButtonRegex) && !content.includes(`setActiveEditTab("magento-intro")`)) {
    const matchedStr = content.match(magentoHeroButtonRegex)[0];
    content = content.replace(magentoHeroButtonRegex, matchedStr + "\n" + magentoAdditionalButtons);
}

// Inject Content Forms right before the Magento Hero Tab rendering
const magentoHeroTabContent = `                                {/* MAGENTO HERO TAB */}`;
if (content.includes(magentoHeroTabContent) && !content.includes(`{/* MAGENTO INTRO TAB */}`)) {
    content = content.replace(magentoHeroTabContent, magentoTabsContent + "\n" + magentoHeroTabContent);
}

// Ensure ImageUploader is rendered dynamically for Magento Hero too
const magentoHeroDescRegex = /<textarea value=\{editFormData\.content\?\.magentoHero\?\.description \|\| ""\}[\s\S]*?<\/div>/;
if (content.match(magentoHeroDescRegex) && !content.includes('value={editFormData.content?.magentoHero?.bannerImage')) {
    const matchedStr = content.match(magentoHeroDescRegex)[0];
    const imageUploaderField = `\n                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hero Banner Image</label>
                                                    <ImageUploader 
                                                        value={editFormData.content?.magentoHero?.bannerImage || ""} 
                                                        onChange={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, magentoHero: { ...editFormData.content?.magentoHero, bannerImage: url } } })} 
                                                    />
                                                    <p className="text-xs text-slate-500 mt-1">Recommended size: 1920x1080 (WebP or WebM for videos)</p>
                                                </div>`;
    content = content.replace(magentoHeroDescRegex, matchedStr + imageUploaderField);
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log("Magento Admin Tabs Injected!");
