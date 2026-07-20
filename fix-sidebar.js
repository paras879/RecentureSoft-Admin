const fs = require('fs');
const p = 'app/admin/(dashboard)/website-pages/page.jsx';
let c = fs.readFileSync(p, 'utf8');

const targetStr = `                                        <button onClick={() => setActiveEditTab("salesforce-lists")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'salesforce-lists' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> Feature Lists
                                        </button>
                                    </>
                                )}`;

const replacementStr = `                                        <button onClick={() => setActiveEditTab("salesforce-lists")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'salesforce-lists' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> Feature Lists
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/seo-service" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("seo-hero")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'seo-hero' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("seo-content")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'seo-content' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <FileText className="w-4 h-4" /> Page Content
                                        </button>
                                        <button onClick={() => setActiveEditTab("seo-lists")} className={\`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap \${activeEditTab === 'seo-lists' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}\`}>
                                            <LayoutTemplate className="w-4 h-4" /> Features & Locations
                                        </button>
                                    </>
                                )}`;

if (c.includes(targetStr)) {
    c = c.replace(targetStr, replacementStr);
    fs.writeFileSync(p, c);
    console.log("Success");
} else {
    console.log("Target string not found");
}
