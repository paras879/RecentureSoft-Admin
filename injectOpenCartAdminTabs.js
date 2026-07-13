const fs = require('fs');

const pagePath = "c:/Users/Paras Tomar/OneDrive/Desktop/RecentureSoft-Admin/app/admin/(dashboard)/website-pages/page.jsx";
let content = fs.readFileSync(pagePath, 'utf8');

function getDynamicArrayUI(tabName, sectionName, fieldName, cardLabel, hideDescAndImage = false) {
    return `
                                {/* ${tabName.toUpperCase()} TAB */}
                                {activeEditTab === "${tabName}" && editPage.path === "/opencart-development" && (
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
                                {/* OPENCART INTRO TAB */}
                                {activeEditTab === "opencart-intro" && editPage.path === "/opencart-development" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Intro Section Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Intro Heading</label>
                                                <input type="text" value={editFormData.content?.openIntro?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, openIntro: { ...editFormData.content?.openIntro, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Intro Description</label>
                                                <textarea value={editFormData.content?.openIntro?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, openIntro: { ...editFormData.content?.openIntro, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[100px]" />
                                            </div>
                                        </div>
                                    </div>
                                )}`;

const whatisTab = `
                                {/* OPENCART WHATIS TAB */}
                                {activeEditTab === "opencart-whatis" && editPage.path === "/opencart-development" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">What is OpenCart Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading</label>
                                                <input type="text" value={editFormData.content?.openWhatIs?.heading || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, openWhatIs: { ...editFormData.content?.openWhatIs, heading: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description 1</label>
                                                <textarea value={editFormData.content?.openWhatIs?.desc1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, openWhatIs: { ...editFormData.content?.openWhatIs, desc1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={3} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description 2</label>
                                                <textarea value={editFormData.content?.openWhatIs?.desc2 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, openWhatIs: { ...editFormData.content?.openWhatIs, desc2: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" rows={3} />
                                            </div>
                                        </div>
                                    </div>
                                )}`;

const ctaTab = `
                                {/* OPENCART CTA TAB */}
                                {activeEditTab === "opencart-cta" && editPage.path === "/opencart-development" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CTA Section Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CTA Title</label>
                                                <input type="text" value={editFormData.content?.openCTA?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, openCTA: { ...editFormData.content?.openCTA, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CTA Description</label>
                                                <textarea value={editFormData.content?.openCTA?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, openCTA: { ...editFormData.content?.openCTA, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Button Text</label>
                                                <input type="text" value={editFormData.content?.openCTA?.btnText || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, openCTA: { ...editFormData.content?.openCTA, btnText: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                )}`;

const opencartTabsContent = `
${introTab}
${whatisTab}
${getDynamicArrayUI("opencart-benefits", "Key Benefits", "openBenefits", "Benefit Cards")}
${getDynamicArrayUI("opencart-solutions", "End-To-End Solutions", "openSolutions", "Solution Cards")}
${getDynamicArrayUI("opencart-process", "Development Cycle", "openProcess", "Steps", true)}
${getDynamicArrayUI("opencart-industries", "Rich Industry Experience", "openIndustries", "Industries", true)}
${ctaTab}
`;

// Inject buttons
const opencartHeroButtonRegex = /<button[\s\S]*?onClick=\{\(\) => setActiveEditTab\("opencart-hero"\)\}[\s\S]*?<\/button>/;

const opencartAdditionalButtons = `
                                        <button
                                            onClick={() => setActiveEditTab("opencart-intro")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'opencart-intro' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <FileText className="w-4 h-4" /> OpenCart Intro
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("opencart-whatis")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'opencart-whatis' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Info className="w-4 h-4" /> What is OpenCart
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("opencart-benefits")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'opencart-benefits' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Star className="w-4 h-4" /> Key Benefits
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("opencart-solutions")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'opencart-solutions' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Package className="w-4 h-4" /> Solutions
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("opencart-process")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'opencart-process' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <ListChecks className="w-4 h-4" /> Development Cycle
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("opencart-industries")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'opencart-industries' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <Globe className="w-4 h-4" /> Industries
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("opencart-cta")}
                                            className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'opencart-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> OpenCart CTA
                                        </button>`;

if (content.match(opencartHeroButtonRegex) && !content.includes(`setActiveEditTab("opencart-intro")`)) {
    const matchedStr = content.match(opencartHeroButtonRegex)[0];
    content = content.replace(opencartHeroButtonRegex, matchedStr + "\n" + opencartAdditionalButtons);
}

// Inject Content Forms right before the OpenCart Hero Tab rendering
const opencartHeroTabContent = `                                {/* OPENCART HERO TAB */}`;
if (content.includes(opencartHeroTabContent) && !content.includes(`{/* OPENCART INTRO TAB */}`)) {
    content = content.replace(opencartHeroTabContent, opencartTabsContent + "\n" + opencartHeroTabContent);
}

// Ensure ImageUploader is rendered dynamically for OpenCart Hero too
const opencartHeroDescRegex = /<textarea value=\{editFormData\.content\?\.opencartHero\?\.description \|\| ""\}[\s\S]*?<\/div>/;
if (content.match(opencartHeroDescRegex) && !content.includes('value={editFormData.content?.opencartHero?.bannerImage')) {
    const matchedStr = content.match(opencartHeroDescRegex)[0];
    const imageUploaderField = `\n                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hero Banner Image</label>
                                                    <ImageUploader 
                                                        value={editFormData.content?.opencartHero?.bannerImage || ""} 
                                                        onChange={(url) => setEditFormData({ ...editFormData, content: { ...editFormData.content, opencartHero: { ...editFormData.content?.opencartHero, bannerImage: url } } })} 
                                                    />
                                                    <p className="text-xs text-slate-500 mt-1">Recommended size: 1920x1080 (WebP or WebM for videos)</p>
                                                </div>`;
    content = content.replace(opencartHeroDescRegex, matchedStr + imageUploaderField);
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log("OpenCart Admin Tabs Injected!");
