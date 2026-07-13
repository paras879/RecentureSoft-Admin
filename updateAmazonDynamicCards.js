const fs = require('fs');
const path = require('path');

const pagePath = "c:/Users/Paras Tomar/OneDrive/Desktop/RecentureSoft-Admin/app/admin/(dashboard)/website-pages/page.jsx";
let content = fs.readFileSync(pagePath, 'utf8');

// Replace Amazon Services Static Array Form with Dynamic Array Form
const servicesStaticRegex = /<h4 className="font-semibold text-slate-800 dark:text-slate-200">Service Cards \(5 Cards\)<\/h4>\s*\{\[0,1,2,3,4\]\.map\(\(i\) => \([\s\S]*?\}\)\}\s*<\/div>/g;

const servicesDynamicJSX = `<div className="flex items-center justify-between">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Service Cards ({(editFormData.content?.amazonServices?.cards || [{},{},{},{},{}]).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentCards = editFormData.content?.amazonServices?.cards || [{},{},{},{},{}];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonServices: { ...editFormData.content?.amazonServices, cards: [...currentCards, {}] } } });
                                                    }}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" /> Add Card
                                                </button>
                                            </div>
                                            {(editFormData.content?.amazonServices?.cards || [{},{},{},{},{}]).map((card, i) => (
                                                <div key={i} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/50 space-y-3 relative">
                                                    <div className="flex items-center justify-between">
                                                        <div className="font-medium text-sm text-slate-500">Card {i+1}</div>
                                                        <button 
                                                            onClick={() => {
                                                                const currentCards = [...(editFormData.content?.amazonServices?.cards || [{},{},{},{},{}])];
                                                                currentCards.splice(i, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonServices: { ...editFormData.content?.amazonServices, cards: currentCards } } });
                                                            }}
                                                            className="text-red-500 hover:text-red-600 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                            title="Delete Card"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    
                                                    <input type="text" value={card.title || ""} onChange={(e) => {
                                                        const newCards = [...(editFormData.content?.amazonServices?.cards || [{},{},{},{},{}])];
                                                        newCards[i] = { ...newCards[i], title: e.target.value };
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonServices: { ...editFormData.content?.amazonServices, cards: newCards } } });
                                                    }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Service Title" />
                                                    
                                                    <textarea value={card.desc || ""} onChange={(e) => {
                                                        const newCards = [...(editFormData.content?.amazonServices?.cards || [{},{},{},{},{}])];
                                                        newCards[i] = { ...newCards[i], desc: e.target.value };
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonServices: { ...editFormData.content?.amazonServices, cards: newCards } } });
                                                    }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Service Description" rows={2} />
                                                    
                                                    <div>
                                                        <label className="block text-xs font-medium text-slate-500 mb-1">Custom Image / Icon (Optional)</label>
                                                        <ImageUploader 
                                                            value={card.image || ""} 
                                                            onChange={(url) => {
                                                                const newCards = [...(editFormData.content?.amazonServices?.cards || [{},{},{},{},{}])];
                                                                newCards[i] = { ...newCards[i], image: url };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonServices: { ...editFormData.content?.amazonServices, cards: newCards } } });
                                                            }} 
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>`;

content = content.replace(servicesStaticRegex, servicesDynamicJSX);

// Replace Amazon Benefits Static Array Form with Dynamic Array Form
const benefitsStaticRegex = /<h4 className="font-semibold text-slate-800 dark:text-slate-200">Benefit Cards \(6 Cards\)<\/h4>\s*\{\[0,1,2,3,4,5\]\.map\(\(i\) => \([\s\S]*?\}\)\}\s*<\/div>/g;

const benefitsDynamicJSX = `<div className="flex items-center justify-between">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Benefit Cards ({(editFormData.content?.amazonBenefits?.cards || [{},{},{},{},{},{}]).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentCards = editFormData.content?.amazonBenefits?.cards || [{},{},{},{},{},{}];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonBenefits: { ...editFormData.content?.amazonBenefits, cards: [...currentCards, {}] } } });
                                                    }}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" /> Add Card
                                                </button>
                                            </div>
                                            {(editFormData.content?.amazonBenefits?.cards || [{},{},{},{},{},{}]).map((card, i) => (
                                                <div key={i} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/50 space-y-3 relative">
                                                    <div className="flex items-center justify-between">
                                                        <div className="font-medium text-sm text-slate-500">Card {i+1}</div>
                                                        <button 
                                                            onClick={() => {
                                                                const currentCards = [...(editFormData.content?.amazonBenefits?.cards || [{},{},{},{},{},{}])];
                                                                currentCards.splice(i, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonBenefits: { ...editFormData.content?.amazonBenefits, cards: currentCards } } });
                                                            }}
                                                            className="text-red-500 hover:text-red-600 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                            title="Delete Card"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    
                                                    <input type="text" value={card.title || ""} onChange={(e) => {
                                                        const newCards = [...(editFormData.content?.amazonBenefits?.cards || [{},{},{},{},{},{}])];
                                                        newCards[i] = { ...newCards[i], title: e.target.value };
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonBenefits: { ...editFormData.content?.amazonBenefits, cards: newCards } } });
                                                    }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Benefit Title" />
                                                    
                                                    <textarea value={card.desc || ""} onChange={(e) => {
                                                        const newCards = [...(editFormData.content?.amazonBenefits?.cards || [{},{},{},{},{},{}])];
                                                        newCards[i] = { ...newCards[i], desc: e.target.value };
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonBenefits: { ...editFormData.content?.amazonBenefits, cards: newCards } } });
                                                    }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Benefit Description" rows={2} />
                                                    
                                                    <div>
                                                        <label className="block text-xs font-medium text-slate-500 mb-1">Custom Image / Icon (Optional)</label>
                                                        <ImageUploader 
                                                            value={card.image || ""} 
                                                            onChange={(url) => {
                                                                const newCards = [...(editFormData.content?.amazonBenefits?.cards || [{},{},{},{},{},{}])];
                                                                newCards[i] = { ...newCards[i], image: url };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, amazonBenefits: { ...editFormData.content?.amazonBenefits, cards: newCards } } });
                                                            }} 
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>`;

content = content.replace(benefitsStaticRegex, benefitsDynamicJSX);

fs.writeFileSync(pagePath, content, 'utf8');
console.log("Admin Dynamic Cards UI injected!");
