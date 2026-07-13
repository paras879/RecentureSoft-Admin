const fs = require('fs');
const path = require('path');

const pagePath = "c:/Users/Paras Tomar/OneDrive/Desktop/RecentureSoft-Admin/app/admin/(dashboard)/website-pages/page.jsx";
let content = fs.readFileSync(pagePath, 'utf8');

const injectionPoint = `{/* HERO TAB (For Home Page) */}`;

const contactTabsJSX = `
                                {/* CONTACT HERO TAB */}
                                {activeEditTab === "contact-hero" && editPage.path === "/contact" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Contact Hero Settings</h3>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={editFormData.content?.contactHero?.isVisible !== false} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, contactHero: { ...editFormData.content?.contactHero, isVisible: e.target.checked } } })} className="sr-only peer" />
                                                <div className="relative w-12 h-6 bg-slate-300/80 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300/30 dark:peer-focus:ring-cyan-800/30 rounded-full peer dark:bg-slate-700/80 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 after:shadow-sm dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-blue-500 peer-checked:shadow-lg peer-checked:shadow-cyan-500/40 border border-slate-200 dark:border-slate-600"></div>
                                                <span className="text-sm font-medium text-slate-900 dark:text-gray-300">Visible</span>
                                            </label>
                                        </div>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading (Part 1)</label>
                                                    <input type="text" value={editFormData.content?.contactHero?.heading1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, contactHero: { ...editFormData.content?.contactHero, heading1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Delivering Enterprise Technology" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading Accent</label>
                                                    <input type="text" value={editFormData.content?.contactHero?.headingAccent || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, contactHero: { ...editFormData.content?.contactHero, headingAccent: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Worldwide" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                    <textarea value={editFormData.content?.contactHero?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, contactHero: { ...editFormData.content?.contactHero, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="RecentureSoft helps businesses build..." />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Primary Button Text</label>
                                                    <input type="text" value={editFormData.content?.contactHero?.primaryBtn || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, contactHero: { ...editFormData.content?.contactHero, primaryBtn: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Start a Project" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Secondary Button Text</label>
                                                    <input type="text" value={editFormData.content?.contactHero?.secondaryBtn || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, contactHero: { ...editFormData.content?.contactHero, secondaryBtn: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Schedule Consultation" />
                                                </div>
                                            </div>
                                        </div>

                                        <h4 className="text-md font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 pt-4 border-t border-slate-100 dark:border-slate-700">Trust Indicators</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[0, 1, 2, 3].map((index) => (
                                                <div key={index}>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Indicator {index + 1}</label>
                                                    <input type="text" value={editFormData.content?.contactHero?.trustIndicators?.[index] || ""} onChange={(e) => {
                                                        const newArr = [...(Array.isArray(editFormData.content?.contactHero?.trustIndicators) ? editFormData.content.contactHero.trustIndicators : Array(4).fill(""))];
                                                        newArr[index] = e.target.value;
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, contactHero: { ...editFormData.content?.contactHero, trustIndicators: newArr } } });
                                                    }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="500+ Projects Delivered" />
                                                </div>
                                            ))}
                                        </div>

                                        <h4 className="text-md font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 pt-4 border-t border-slate-100 dark:border-slate-700">Hero Stats</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[0, 1, 2, 3, 4].map((index) => (
                                                <div key={index} className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                                                    <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Stat {index + 1}</label>
                                                    <div className="space-y-2">
                                                        <input type="text" value={editFormData.content?.contactHero?.stats?.[index]?.value || ""} onChange={(e) => {
                                                            const newArr = [...(Array.isArray(editFormData.content?.contactHero?.stats) ? editFormData.content.contactHero.stats : Array(5).fill({}))];
                                                            newArr[index] = { ...newArr[index], value: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, contactHero: { ...editFormData.content?.contactHero, stats: newArr } } });
                                                        }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded px-3 py-1.5 text-sm text-slate-900 dark:text-white" placeholder="Value (e.g. 500+)" />
                                                        <input type="text" value={editFormData.content?.contactHero?.stats?.[index]?.label || ""} onChange={(e) => {
                                                            const newArr = [...(Array.isArray(editFormData.content?.contactHero?.stats) ? editFormData.content.contactHero.stats : Array(5).fill({}))];
                                                            newArr[index] = { ...newArr[index], label: e.target.value };
                                                            setEditFormData({ ...editFormData, content: { ...editFormData.content, contactHero: { ...editFormData.content?.contactHero, stats: newArr } } });
                                                        }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded px-3 py-1.5 text-sm text-slate-900 dark:text-white" placeholder="Label (e.g. Global Clients)" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CONTACT FORM TAB */}
                                {activeEditTab === "contact-form" && editPage.path === "/contact" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Contact Form Settings</h3>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={editFormData.content?.contactFormSection?.isVisible !== false} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, contactFormSection: { ...editFormData.content?.contactFormSection, isVisible: e.target.checked } } })} className="sr-only peer" />
                                                <div className="relative w-12 h-6 bg-slate-300/80 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300/30 dark:peer-focus:ring-cyan-800/30 rounded-full peer dark:bg-slate-700/80 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 after:shadow-sm dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-blue-500 peer-checked:shadow-lg peer-checked:shadow-cyan-500/40 border border-slate-200 dark:border-slate-600"></div>
                                                <span className="text-sm font-medium text-slate-900 dark:text-gray-300">Visible</span>
                                            </label>
                                        </div>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading (Part 1)</label>
                                                    <input type="text" value={editFormData.content?.contactFormSection?.heading1 || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, contactFormSection: { ...editFormData.content?.contactFormSection, heading1: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Let's build something" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading Accent</label>
                                                    <input type="text" value={editFormData.content?.contactFormSection?.headingAccent || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, contactFormSection: { ...editFormData.content?.contactFormSection, headingAccent: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="extraordinary." />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                    <textarea value={editFormData.content?.contactFormSection?.desc || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, contactFormSection: { ...editFormData.content?.contactFormSection, desc: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="Whether you need a full-scale enterprise transformation..." />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                                                    <input type="text" value={editFormData.content?.contactFormSection?.phone || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, contactFormSection: { ...editFormData.content?.contactFormSection, phone: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="+91 777 000 3288" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                                                    <input type="text" value={editFormData.content?.contactFormSection?.email || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, contactFormSection: { ...editFormData.content?.contactFormSection, email: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="info@recenturesoft.com" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

`;

if (content.includes(injectionPoint)) {
    content = content.replace(injectionPoint, contactTabsJSX + injectionPoint);
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log("Successfully injected contact tabs into page.jsx!");
} else {
    console.log("Error: Injection point not found in page.jsx");
}
