const fs = require('fs');

const pagePath = "c:/Users/Paras Tomar/OneDrive/Desktop/RecentureSoft-Admin/app/admin/(dashboard)/website-pages/page.jsx";
let content = fs.readFileSync(pagePath, 'utf8');

function getDynamicArrayUI(tabName, sectionName, fieldName, cardLabel, hideDescAndImage = false) {
    return `
                                {/* ${tabName.toUpperCase()} TAB */}
                                {activeEditTab === "${tabName}" && editPage.path === "/wordpress-development-customization" && (
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
                                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">${cardLabel} ({(editFormData.content?.${fieldName}?.${hideDescAndImage ? 'steps' : 'cards'} || []).length})</h4>
                                                    <button 
                                                        onClick={() => {
                                                            const arrName = '${hideDescAndImage ? 'steps' : 'cards'}';
                                                            const currentCards = editFormData.content?.${fieldName}?.[arrName] || [];
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, ${fieldName}: { ...editFormData.content?.${fieldName}, [arrName]: [...currentCards, {}] } } });
                                                        }}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" /> Add Item
                                                    </button>
                                                </div>
                                                {(editFormData.content?.${fieldName}?.${hideDescAndImage ? 'steps' : 'cards'} || []).map((card, i) => {
                                                    const val = typeof card === 'string' ? { title: card } : card;
                                                    return (
                                                    <div key={i} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/50 space-y-3 relative">
                                                        <div className="flex items-center justify-between">
                                                            <div className="font-medium text-sm text-slate-500">Item {i+1}</div>
                                                            <button 
                                                                onClick={() => {
                                                                    const arrName = '${hideDescAndImage ? 'steps' : 'cards'}';
                                                                    const currentCards = [...(editFormData.content?.${fieldName}?.[arrName] || [])];
                                                                    currentCards.splice(i, 1);
                                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ${fieldName}: { ...editFormData.content?.${fieldName}, [arrName]: currentCards } } });
                                                                }}
                                                                className="text-red-500 hover:text-red-600 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                                title="Delete Item"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        
                                                        <input type="text" value={val.title || ""} onChange={(e) => {
                                                            const arrName = '${hideDescAndImage ? 'steps' : 'cards'}';
                                                            const newCards = [...(editFormData.content?.${fieldName}?.[arrName] || [])];
                                                            newCards[i] = { ...newCards[i], title: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, ${fieldName}: { ...editFormData.content?.${fieldName}, [arrName]: newCards } } });
                                                        }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Title" />
                                                        
                                                        ${!hideDescAndImage ? `
                                                        <textarea value={val.desc || ""} onChange={(e) => {
                                                            const newCards = [...(editFormData.content?.${fieldName}?.cards || [])];
                                                            newCards[i] = { ...newCards[i], desc: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, ${fieldName}: { ...editFormData.content?.${fieldName}, cards: newCards } } });
                                                        }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Description" rows={2} />
                                                        
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Custom Image / Icon (Optional)</label>
                                                            <ImageUploader 
                                                                value={val.image || ""} 
                                                                onChange={(url) => {
                                                                    const newCards = [...(editFormData.content?.${fieldName}?.cards || [])];
                                                                    newCards[i] = { ...newCards[i], image: url };
                                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, ${fieldName}: { ...editFormData.content?.${fieldName}, cards: newCards } } });
                                                                }} 
                                                            />
                                                        </div>
                                                        ` : ''}
                                                    </div>
                                                )})}
                                            </div>
                                        </div>
                                    </div>
                                )}`;
}

const introTab = `
                                {/* WP INTRO TAB */}
                                {activeEditTab === "wp-intro" && editPage.path === "/wordpress-development-customization" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Intro Section Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Intro Heading</label>
                                                <input type="text" value={editFormData.content?.wpIntro?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, wpIntro: { ...editFormData.content?.wpIntro, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Intro Description</label>
                                                <textarea value={editFormData.content?.wpIntro?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, wpIntro: { ...editFormData.content?.wpIntro, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[100px]" />
                                            </div>
                                        </div>
                                    </div>
                                )}`;

const conceptTab = `
                                {/* WP CONCEPT TAB */}
                                {activeEditTab === "wp-concept" && editPage.path === "/wordpress-development-customization" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">WordPress Concept Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Concept Heading</label>
                                                <input type="text" value={editFormData.content?.wpConcept?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, wpConcept: { ...editFormData.content?.wpConcept, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description 1</label>
                                                <textarea value={editFormData.content?.wpConcept?.desc1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, wpConcept: { ...editFormData.content?.wpConcept, desc1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={3} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description 2</label>
                                                <textarea value={editFormData.content?.wpConcept?.desc2 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, wpConcept: { ...editFormData.content?.wpConcept, desc2: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={3} />
                                            </div>
                                        </div>
                                    </div>
                                )}`;

const ctaTab = `
                                {/* WP CTA TAB */}
                                {activeEditTab === "wp-cta" && editPage.path === "/wordpress-development-customization" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CTA Section Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CTA Title</label>
                                                <input type="text" value={editFormData.content?.wpCTA?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, wpCTA: { ...editFormData.content?.wpCTA, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CTA Description</label>
                                                <textarea value={editFormData.content?.wpCTA?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, wpCTA: { ...editFormData.content?.wpCTA, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Button Text</label>
                                                <input type="text" value={editFormData.content?.wpCTA?.btnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, wpCTA: { ...editFormData.content?.wpCTA, btnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                )}`;

const wpTabsContent = `
${introTab}
${conceptTab}
${getDynamicArrayUI("wp-reasons", "Why Build A Website With WordPress?", "wpReasons", "Reason Cards")}
${getDynamicArrayUI("wp-services", "Our Range Of WordPress Services", "wpServices", "Service Cards")}
${getDynamicArrayUI("wp-choose-us", "Why Recenturesoft?", "wpChooseUs", "Features")}
${getDynamicArrayUI("wp-process", "Our Development Approach", "wpProcess", "Steps", true)}
${ctaTab}
`;

// Inject buttons
const wpHeroButtonRegex = /<button[\s\S]*?onClick=\{\(\) => setActiveEditTab\("wordpress-hero"\)\}[\s\S]*?<\/button>/;

const wpAdditionalButtons = `
                                        <button
                                            onClick={() => setActiveEditTab("wp-intro")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'wp-intro' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <FileText className="w-4 h-4" /> WP Intro
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("wp-concept")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'wp-concept' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Info className="w-4 h-4" /> WP Concept
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("wp-reasons")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'wp-reasons' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Star className="w-4 h-4" /> Why WP?
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("wp-services")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'wp-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Package className="w-4 h-4" /> WP Services
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("wp-choose-us")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'wp-choose-us' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <ShieldCheck className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("wp-process")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'wp-process' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <ListChecks className="w-4 h-4" /> WP Process
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("wp-cta")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'wp-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> WP CTA
                                        </button>`;

if (content.match(wpHeroButtonRegex) && !content.includes(`setActiveEditTab("wp-intro")`)) {
    const matchedStr = content.match(wpHeroButtonRegex)[0];
    content = content.replace(wpHeroButtonRegex, matchedStr + "\n" + wpAdditionalButtons);
}

// Inject Content Forms right before the WP Hero Tab rendering
const wpHeroTabContent = `                                {/* WORDPRESS HERO TAB */}`;
if (content.includes(wpHeroTabContent) && !content.includes(`{/* WP INTRO TAB */}`)) {
    content = content.replace(wpHeroTabContent, wpTabsContent + "\n" + wpHeroTabContent);
}

// Ensure ImageUploader is rendered dynamically for WP Hero too
const wpHeroDescRegex = /<textarea value=\{editFormData\.content\?\.wordpressHero\?\.description \|\| ""\}[\s\S]*?<\/div>/;
if (content.match(wpHeroDescRegex) && !content.includes('value={editFormData.content?.wordpressHero?.bannerImage')) {
    const matchedStr = content.match(wpHeroDescRegex)[0];
    const imageUploaderField = `\n                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hero Banner Image</label>
                                                    <ImageUploader 
                                                        value={editFormData.content?.wordpressHero?.bannerImage || ""} 
                                                        onChange={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, wordpressHero: { ...editFormData.content?.wordpressHero, bannerImage: url } } })} 
                                                    />
                                                    <p className="text-xs text-slate-500 mt-1">Recommended size: 1920x1080 (WebP or WebM for videos)</p>
                                                </div>`;
    content = content.replace(wpHeroDescRegex, matchedStr + imageUploaderField);
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log("WordPress Admin Tabs Injected!");
