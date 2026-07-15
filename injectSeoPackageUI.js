const fs = require('fs');

const filePath = 'c:\\Users\\Paras Tomar\\OneDrive\\Desktop\\RecentureSoft-Admin\\app\\admin\\(dashboard)\\website-pages\\page.jsx';
let content = fs.readFileSync(filePath, 'utf8');

if (content.includes('SEO PACKAGE HERO TAB')) {
    console.log('SEO Package panels already injected. Skipping.');
    process.exit(0);
}

const insertionMarker = '{/* IPHONE HERO TAB */}';

const seoPackagePanels = `{/* SEO PACKAGE HERO TAB */}
                                {activeEditTab === "seopackage-hero" && editPage.path === "/seo-package" && (
                                    <div className="max-w-3xl space-y-6">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">SEO Package — Hero Section</h3>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Badge</label>
                                                    <input type="text" value={editFormData.content?.heroBadge || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, heroBadge: e.target.value } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="e.g. Pricing & Plans" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                                                    <input type="text" value={editFormData.content?.heroTitle || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, heroTitle: e.target.value } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="e.g. SEO Package" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title Highlight (optional colored word)</label>
                                                    <input type="text" value={editFormData.content?.heroHighlight || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, heroHighlight: e.target.value } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="e.g. leave blank for none" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                    <textarea value={editFormData.content?.heroDescription || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, heroDescription: e.target.value } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" rows={3} placeholder="e.g. Choose the perfect SEO package..." />
                                                </div>
                                            </div>
                                            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Hero Banner Image</h4>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
                                                    <input type="text" value={editFormData.content?.heroImage || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, heroImage: e.target.value } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="/Banner/seo_package.webp" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image Alt Text</label>
                                                    <input type="text" value={editFormData.content?.heroImageAlt || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, heroImageAlt: e.target.value } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2" placeholder="seo-package Banner" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SEO PACKAGE TABLE TAB */}
                                {activeEditTab === "seopackage-table" && editPage.path === "/seo-package" && (
                                    <div className="max-w-5xl space-y-8">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">SEO Packages Comparison Table</h3>

                                        {/* Plans Section */}
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <h4 className="font-semibold text-slate-800 dark:text-slate-200 border-b pb-2">Plan Columns (locked to 4)</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {(editFormData.content?.plans || []).map((plan, idx) => (
                                                    <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 space-y-2">
                                                        <p className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">Plan {idx + 1}</p>
                                                        <div>
                                                            <label className="block text-xs text-slate-500 mb-1">Plan Name</label>
                                                            <input type="text" value={plan.name || ""} onChange={(e) => { const p = [...(editFormData.content?.plans || [])]; p[idx] = { ...p[idx], name: e.target.value }; setEditFormData({ ...editFormData, content: { ...editFormData.content, plans: p } }); }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-sm" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs text-slate-500 mb-1">Keywords Subtitle</label>
                                                            <input type="text" value={plan.keywords || ""} onChange={(e) => { const p = [...(editFormData.content?.plans || [])]; p[idx] = { ...p[idx], keywords: e.target.value }; setEditFormData({ ...editFormData, content: { ...editFormData.content, plans: p } }); }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-sm" placeholder="e.g. 20 keywords to be optimized" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs text-slate-500 mb-1">CTA Button Text</label>
                                                            <input type="text" value={plan.ctaText || ""} onChange={(e) => { const p = [...(editFormData.content?.plans || [])]; p[idx] = { ...p[idx], ctaText: e.target.value }; setEditFormData({ ...editFormData, content: { ...editFormData.content, plans: p } }); }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-sm" placeholder="Contact Us" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs text-slate-500 mb-1">CTA Button Link</label>
                                                            <input type="text" value={plan.ctaLink || ""} onChange={(e) => { const p = [...(editFormData.content?.plans || [])]; p[idx] = { ...p[idx], ctaLink: e.target.value }; setEditFormData({ ...editFormData, content: { ...editFormData.content, plans: p } }); }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-sm" placeholder="/contact" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Minimum Contract Period */}
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <h4 className="font-semibold text-slate-800 dark:text-slate-200 border-b pb-2">Minimum Contract Period (per plan)</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {(editFormData.content?.minContractPeriodValues || ["","","",""]).map((val, idx) => (
                                                    <div key={idx}>
                                                        <label className="block text-xs text-slate-500 mb-1">Plan {idx + 1}</label>
                                                        <input type="text" value={val || ""} onChange={(e) => { const v = [...(editFormData.content?.minContractPeriodValues || ["","","",""])]; v[idx] = e.target.value; setEditFormData({ ...editFormData, content: { ...editFormData.content, minContractPeriodValues: v } }); }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-sm" placeholder="6 Months" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Website Audit */}
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-3">
                                            <div className="flex items-center justify-between border-b pb-2">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Website Audit (✓ all plans)</h4>
                                                <button type="button" onClick={() => { const list = [...(editFormData.content?.websiteAudit || []), ""]; setEditFormData({ ...editFormData, content: { ...editFormData.content, websiteAudit: list } }); }} className="px-2 py-1 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs rounded">+ Add Item</button>
                                            </div>
                                            <div className="space-y-2">
                                                {(editFormData.content?.websiteAudit || []).map((item, idx) => (
                                                    <div key={idx} className="flex gap-2">
                                                        <input type="text" value={item || ""} onChange={(e) => { const list = [...(editFormData.content?.websiteAudit || [])]; list[idx] = e.target.value; setEditFormData({ ...editFormData, content: { ...editFormData.content, websiteAudit: list } }); }} className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-sm" />
                                                        <button type="button" onClick={() => { const list = [...(editFormData.content?.websiteAudit || [])]; list.splice(idx, 1); setEditFormData({ ...editFormData, content: { ...editFormData.content, websiteAudit: list } }); }} className="text-red-500 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* On-Page Optimization */}
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-3">
                                            <div className="flex items-center justify-between border-b pb-2">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">On-Page Optimization (✓ all plans)</h4>
                                                <button type="button" onClick={() => { const list = [...(editFormData.content?.onPageOptimization || []), ""]; setEditFormData({ ...editFormData, content: { ...editFormData.content, onPageOptimization: list } }); }} className="px-2 py-1 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs rounded">+ Add Item</button>
                                            </div>
                                            <div className="space-y-2">
                                                {(editFormData.content?.onPageOptimization || []).map((item, idx) => (
                                                    <div key={idx} className="flex gap-2">
                                                        <input type="text" value={item || ""} onChange={(e) => { const list = [...(editFormData.content?.onPageOptimization || [])]; list[idx] = e.target.value; setEditFormData({ ...editFormData, content: { ...editFormData.content, onPageOptimization: list } }); }} className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-sm" />
                                                        <button type="button" onClick={() => { const list = [...(editFormData.content?.onPageOptimization || [])]; list.splice(idx, 1); setEditFormData({ ...editFormData, content: { ...editFormData.content, onPageOptimization: list } }); }} className="text-red-500 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Content Marketing */}
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-3">
                                            <div className="flex items-center justify-between border-b pb-2">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Content Marketing Per Month (per-plan values)</h4>
                                                <button type="button" onClick={() => { const list = [...(editFormData.content?.contentMarketing || []), { name: "", values: ["","","",""] }]; setEditFormData({ ...editFormData, content: { ...editFormData.content, contentMarketing: list } }); }} className="px-2 py-1 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs rounded">+ Add Row</button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.contentMarketing || []).map((row, idx) => (
                                                    <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                                                        <div className="flex gap-2 mb-2">
                                                            <input type="text" value={row.name || ""} onChange={(e) => { const list = [...(editFormData.content?.contentMarketing || [])]; list[idx] = { ...list[idx], name: e.target.value }; setEditFormData({ ...editFormData, content: { ...editFormData.content, contentMarketing: list } }); }} className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-sm font-medium" placeholder="Feature name" />
                                                            <button type="button" onClick={() => { const list = [...(editFormData.content?.contentMarketing || [])]; list.splice(idx, 1); setEditFormData({ ...editFormData, content: { ...editFormData.content, contentMarketing: list } }); }} className="text-red-500 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                                                        </div>
                                                        <div className="grid grid-cols-4 gap-2">
                                                            {(row.values || ["","","",""]).map((val, vIdx) => (
                                                                <div key={vIdx}>
                                                                    <label className="block text-xs text-slate-400 mb-1">Plan {vIdx+1}</label>
                                                                    <input type="text" value={val || ""} onChange={(e) => { const list = [...(editFormData.content?.contentMarketing || [])]; const vals = [...(list[idx].values || [])]; vals[vIdx] = e.target.value; list[idx] = { ...list[idx], values: vals }; setEditFormData({ ...editFormData, content: { ...editFormData.content, contentMarketing: list } }); }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* SMO Per Month */}
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-3">
                                            <div className="flex items-center justify-between border-b pb-2">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">SMO Per Month (per-plan values)</h4>
                                                <button type="button" onClick={() => { const list = [...(editFormData.content?.smo || []), { name: "", values: ["","","",""] }]; setEditFormData({ ...editFormData, content: { ...editFormData.content, smo: list } }); }} className="px-2 py-1 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs rounded">+ Add Row</button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.smo || []).map((row, idx) => (
                                                    <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                                                        <div className="flex gap-2 mb-2">
                                                            <input type="text" value={row.name || ""} onChange={(e) => { const list = [...(editFormData.content?.smo || [])]; list[idx] = { ...list[idx], name: e.target.value }; setEditFormData({ ...editFormData, content: { ...editFormData.content, smo: list } }); }} className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-sm font-medium" placeholder="Feature name" />
                                                            <button type="button" onClick={() => { const list = [...(editFormData.content?.smo || [])]; list.splice(idx, 1); setEditFormData({ ...editFormData, content: { ...editFormData.content, smo: list } }); }} className="text-red-500 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                                                        </div>
                                                        <div className="grid grid-cols-4 gap-2">
                                                            {(row.values || ["","","",""]).map((val, vIdx) => (
                                                                <div key={vIdx}>
                                                                    <label className="block text-xs text-slate-400 mb-1">Plan {vIdx+1}</label>
                                                                    <input type="text" value={val || ""} onChange={(e) => { const list = [...(editFormData.content?.smo || [])]; const vals = [...(list[idx].values || [])]; vals[vIdx] = e.target.value; list[idx] = { ...list[idx], values: vals }; setEditFormData({ ...editFormData, content: { ...editFormData.content, smo: list } }); }} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* SMO Checks */}
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-3">
                                            <div className="flex items-center justify-between border-b pb-2">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">SMO Checklist Items (✓ all plans)</h4>
                                                <button type="button" onClick={() => { const list = [...(editFormData.content?.smoChecks || []), ""]; setEditFormData({ ...editFormData, content: { ...editFormData.content, smoChecks: list } }); }} className="px-2 py-1 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs rounded">+ Add Item</button>
                                            </div>
                                            <div className="space-y-2">
                                                {(editFormData.content?.smoChecks || []).map((item, idx) => (
                                                    <div key={idx} className="flex gap-2">
                                                        <input type="text" value={item || ""} onChange={(e) => { const list = [...(editFormData.content?.smoChecks || [])]; list[idx] = e.target.value; setEditFormData({ ...editFormData, content: { ...editFormData.content, smoChecks: list } }); }} className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-sm" />
                                                        <button type="button" onClick={() => { const list = [...(editFormData.content?.smoChecks || [])]; list.splice(idx, 1); setEditFormData({ ...editFormData, content: { ...editFormData.content, smoChecks: list } }); }} className="text-red-500 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Monthly Reporting */}
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-3">
                                            <div className="flex items-center justify-between border-b pb-2">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Monthly Reporting (✓ all plans)</h4>
                                                <button type="button" onClick={() => { const list = [...(editFormData.content?.reporting || []), ""]; setEditFormData({ ...editFormData, content: { ...editFormData.content, reporting: list } }); }} className="px-2 py-1 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs rounded">+ Add Item</button>
                                            </div>
                                            <div className="space-y-2">
                                                {(editFormData.content?.reporting || []).map((item, idx) => (
                                                    <div key={idx} className="flex gap-2">
                                                        <input type="text" value={item || ""} onChange={(e) => { const list = [...(editFormData.content?.reporting || [])]; list[idx] = e.target.value; setEditFormData({ ...editFormData, content: { ...editFormData.content, reporting: list } }); }} className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-sm" />
                                                        <button type="button" onClick={() => { const list = [...(editFormData.content?.reporting || [])]; list.splice(idx, 1); setEditFormData({ ...editFormData, content: { ...editFormData.content, reporting: list } }); }} className="text-red-500 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Customer Support */}
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-3">
                                            <div className="flex items-center justify-between border-b pb-2">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Customer Support (✓ all plans)</h4>
                                                <button type="button" onClick={() => { const list = [...(editFormData.content?.customerSupport || []), ""]; setEditFormData({ ...editFormData, content: { ...editFormData.content, customerSupport: list } }); }} className="px-2 py-1 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs rounded">+ Add Item</button>
                                            </div>
                                            <div className="space-y-2">
                                                {(editFormData.content?.customerSupport || []).map((item, idx) => (
                                                    <div key={idx} className="flex gap-2">
                                                        <input type="text" value={item || ""} onChange={(e) => { const list = [...(editFormData.content?.customerSupport || [])]; list[idx] = e.target.value; setEditFormData({ ...editFormData, content: { ...editFormData.content, customerSupport: list } }); }} className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-sm" />
                                                        <button type="button" onClick={() => { const list = [...(editFormData.content?.customerSupport || [])]; list.splice(idx, 1); setEditFormData({ ...editFormData, content: { ...editFormData.content, customerSupport: list } }); }} className="text-red-500 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

`;

if (!content.includes(insertionMarker)) {
    console.error('Insertion marker not found:', insertionMarker);
    process.exit(1);
}

content = content.replace(insertionMarker, seoPackagePanels + insertionMarker);
fs.writeFileSync(filePath, content, 'utf8');
console.log('SEO Package panels injected successfully.');
