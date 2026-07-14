const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'app/admin/(dashboard)/website-pages/page.jsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Sidebar Tabs
const sidebarTabs = `
                                {editPage.path === "/dashboard" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("dashboard-hero")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'dashboard-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> Dashboard Hero
                                        </button>
                                        <button onClick={() => setActiveEditTab("dashboard-content")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'dashboard-content' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> Dashboard Content
                                        </button>
                                    </>
                                )}`;

const sidebarRegex = /<Search className="w-4 h-4" \/> General Settings\r?\n\s*<\/button>/;
if (!content.includes('setActiveEditTab("dashboard-hero")')) {
    if (sidebarRegex.test(content)) {
        content = content.replace(sidebarRegex, match => match + "\n" + sidebarTabs);
        console.log("Injected Dashboard Sidebar Tabs");
    } else {
        console.log("Failed to find sidebar anchor");
    }
}

// 2. UI Blocks
const uiAnchorStr = `{/* EVENTS HERO TAB */}`;
const uiBlocks = `
                                {/* DASHBOARD HERO TAB */}
                                {activeEditTab === "dashboard-hero" && editPage.path === "/dashboard" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Dashboard Hero Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Badge Text</label>
                                                    <input type="text" value={editFormData.content?.hero?.badge || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, hero: { ...editFormData.content?.hero, badge: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Data Visualization" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Main Title</label>
                                                    <input type="text" value={editFormData.content?.hero?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, hero: { ...editFormData.content?.hero, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Custom Dashboard" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Highlight Word</label>
                                                    <input type="text" value={editFormData.content?.hero?.highlight || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, hero: { ...editFormData.content?.hero, highlight: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Development" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                    <textarea value={editFormData.content?.hero?.description || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, hero: { ...editFormData.content?.hero, description: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white min-h-[80px]" placeholder="Consolidate complex data into intuitive, real-time visual interfaces..." />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* DASHBOARD CONTENT TAB */}
                                {activeEditTab === "dashboard-content" && editPage.path === "/dashboard" && (
                                    <div className="max-w-3xl space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Dashboard Content Settings</h3>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                                                <input type="text" value={editFormData.content?.dashboardContent?.title || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, dashboardContent: { ...editFormData.content?.dashboardContent, title: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Transform Raw Data into" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subtitle</label>
                                                <input type="text" value={editFormData.content?.dashboardContent?.subtitle || ""} onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, dashboardContent: { ...editFormData.content?.dashboardContent, subtitle: e.target.value } } })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" placeholder="Actionable Insights" />
                                            </div>
                                            
                                            <div className="flex justify-between items-center mt-4">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Intro Paragraphs ({(editFormData.content?.dashboardContent?.introParagraphs || []).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentParas = editFormData.content?.dashboardContent?.introParagraphs || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, dashboardContent: { ...editFormData.content?.dashboardContent, introParagraphs: [...currentParas, ""] } } });
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    Add Paragraph
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(editFormData.content?.dashboardContent?.introParagraphs || []).map((para, idx) => (
                                                    <div key={idx} className="relative flex flex-col gap-3">
                                                        <div className="flex gap-2">
                                                            <textarea value={para || ""} onChange={(e) => {
                                                                const newParas = [...(editFormData.content?.dashboardContent?.introParagraphs || [])];
                                                                newParas[idx] = e.target.value;
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, dashboardContent: { ...editFormData.content?.dashboardContent, introParagraphs: newParas } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm min-h-[60px]" placeholder="In today's fast-paced digital economy..." />
                                                            <button 
                                                                onClick={() => {
                                                                    const newParas = [...(editFormData.content?.dashboardContent?.introParagraphs || [])];
                                                                    newParas.splice(idx, 1);
                                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, dashboardContent: { ...editFormData.content?.dashboardContent, introParagraphs: newParas } } });
                                                                }}
                                                                className="text-red-500 hover:text-red-600 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 h-fit"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex justify-between items-center mt-6">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Features ({(editFormData.content?.dashboardContent?.features || []).length})</h4>
                                                <button 
                                                    onClick={() => {
                                                        const currentFeatures = editFormData.content?.dashboardContent?.features || [];
                                                        setEditFormData({ ...editFormData, content: { ...editFormData.content, dashboardContent: { ...editFormData.content?.dashboardContent, features: [...currentFeatures, { iconName: "LayoutDashboard", title: "", desc: "", highlights: ["", "", ""] }] } } });
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    Add Feature
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                {(editFormData.content?.dashboardContent?.features || []).map((feat, idx) => (
                                                    <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg relative flex flex-col gap-3">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                                                                <input type="text" value={feat.title || ""} onChange={(e) => {
                                                                    const newFeats = [...(editFormData.content?.dashboardContent?.features || [])];
                                                                    newFeats[idx] = { ...newFeats[idx], title: e.target.value };
                                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, dashboardContent: { ...editFormData.content?.dashboardContent, features: newFeats } } });
                                                                }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Customizable Interfaces" />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-medium text-slate-500 mb-1">Icon Name</label>
                                                                <select value={feat.iconName || "LayoutDashboard"} onChange={(e) => {
                                                                    const newFeats = [...(editFormData.content?.dashboardContent?.features || [])];
                                                                    newFeats[idx] = { ...newFeats[idx], iconName: e.target.value };
                                                                    setEditFormData({ ...editFormData, content: { ...editFormData.content, dashboardContent: { ...editFormData.content?.dashboardContent, features: newFeats } } });
                                                                }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm">
                                                                    <option value="LayoutDashboard">LayoutDashboard</option>
                                                                    <option value="BarChart3">BarChart3</option>
                                                                    <option value="LineChart">LineChart</option>
                                                                    <option value="PieChart">PieChart</option>
                                                                    <option value="Activity">Activity</option>
                                                                    <option value="ShieldCheck">ShieldCheck</option>
                                                                    <option value="Zap">Zap</option>
                                                                    <option value="Database">Database</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                                                            <textarea value={feat.desc || ""} onChange={(e) => {
                                                                const newFeats = [...(editFormData.content?.dashboardContent?.features || [])];
                                                                newFeats[idx] = { ...newFeats[idx], desc: e.target.value };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, dashboardContent: { ...editFormData.content?.dashboardContent, features: newFeats } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm min-h-[60px]" placeholder="Drag-and-drop widgets and personalized layouts..." />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-500 mb-1">Highlights (comma separated)</label>
                                                            <input type="text" value={(feat.highlights || []).join(", ")} onChange={(e) => {
                                                                const newFeats = [...(editFormData.content?.dashboardContent?.features || [])];
                                                                newFeats[idx] = { ...newFeats[idx], highlights: e.target.value.split(",").map(s => s.trim()) };
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, dashboardContent: { ...editFormData.content?.dashboardContent, features: newFeats } } });
                                                            }} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Live data streams, Instant KPI tracking, Automated refresh" />
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                const newFeats = [...(editFormData.content?.dashboardContent?.features || [])];
                                                                newFeats.splice(idx, 1);
                                                                setEditFormData({ ...editFormData, content: { ...editFormData.content, dashboardContent: { ...editFormData.content?.dashboardContent, features: newFeats } } });
                                                            }}
                                                            className="text-red-500 hover:text-red-600 absolute top-2 right-2 p-1 bg-white dark:bg-slate-800 rounded-full shadow-sm"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
`;

if (!content.includes('activeEditTab === "dashboard-hero"')) {
    content = content.replace(uiAnchorStr, uiBlocks + "\n" + uiAnchorStr);
    console.log("Injected UI Blocks");
} else {
    console.log("Dashboard UI already present");
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log("Done");
