"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Globe, Plus, Edit, Trash2, Save, Loader2, X, ToggleLeft, ToggleRight,
    LayoutTemplate, ChevronDown, ChevronUp, ArrowUp, ArrowDown, Image as ImageIcon,
    FileText, Layers, List, AlignLeft
} from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

const CATEGORY_OPTIONS = [
    { value: "all", label: "All Pages (Poori Website)" },
    { value: "industries", label: "Industries Pages Only" },
    { value: "solutions", label: "Solutions Pages Only" },
];

const POSITION_OPTIONS = [
    { value: "top", label: "Top (Sabse Upar)" },
    { value: "bottom", label: "Bottom (Sabse Niche)" },
    { value: "before-footer", label: "Before Footer (Footer se pehle)" },
];

const BLOCK_TYPES = [
    { type: "cards", label: "Cards Grid", icon: LayoutTemplate },
    { type: "text", label: "Text Block", icon: AlignLeft },
    { type: "steps", label: "Steps / Process", icon: List },
    { type: "image", label: "Image", icon: ImageIcon },
    { type: "highlight", label: "Highlight Box", icon: Layers },
];

export default function SharedBlocksPage() {
    const [globalBlocks, setGlobalBlocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlock, setEditingBlock] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [collapsedBlocks, setCollapsedBlocks] = useState({});

    // Form state
    const [formName, setFormName] = useState("");
    const [formCategory, setFormCategory] = useState("all");
    const [formPosition, setFormPosition] = useState("bottom");
    const [formActive, setFormActive] = useState(true);
    const [formBlocks, setFormBlocks] = useState([]);

    useEffect(() => {
        fetchBlocks();
    }, []);

    const fetchBlocks = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/global-blocks");
            const data = await res.json();
            if (data.success) setGlobalBlocks(data.blocks);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const openCreateModal = () => {
        setEditingBlock(null);
        setFormName("");
        setFormCategory("all");
        setFormPosition("bottom");
        setFormActive(true);
        setFormBlocks([]);
        setCollapsedBlocks({});
        setIsModalOpen(true);
    };

    const openEditModal = (block) => {
        setEditingBlock(block);
        setFormName(block.name);
        setFormCategory(block.targetCategory);
        setFormPosition(block.position);
        setFormActive(block.isActive);
        setFormBlocks(block.blockData?.blocks || []);
        setCollapsedBlocks({});
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!formName.trim()) return alert("Block ka naam dalna zaroori hai!");
        setIsSaving(true);
        try {
            const payload = {
                name: formName,
                targetCategory: formCategory,
                position: formPosition,
                isActive: formActive,
                blockData: { blocks: formBlocks },
            };
            if (editingBlock) payload.id = editingBlock._id;

            const res = await fetch("/api/admin/global-blocks", {
                method: editingBlock ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.success) {
                setIsModalOpen(false);
                fetchBlocks();
            } else {
                alert(data.message || "Save nahi ho saka.");
            }
        } catch (e) {
            console.error(e);
            alert("Kuch error aa gaya, dobara try karo.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleToggleActive = async (block) => {
        try {
            await fetch("/api/admin/global-blocks", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: block._id, isActive: !block.isActive }),
            });
            fetchBlocks();
        } catch (e) { console.error(e); }
    };

    const handleDelete = async (block) => {
        if (!confirm(`"${block.name}" delete karna chahte hain?`)) return;
        try {
            await fetch(`/api/admin/global-blocks?id=${block._id}`, { method: "DELETE" });
            fetchBlocks();
        } catch (e) { console.error(e); }
    };

    // --- Block editor functions ---
    const addBlock = (type) => {
        const base = { id: Date.now().toString(), type };
        let newBlock = base;
        if (type === "cards") newBlock = { ...base, title: "", headingColor: "default", items: [] };
        else if (type === "text") newBlock = { ...base, h2: "", h3: "", desc: "", list: "" };
        else if (type === "steps") newBlock = { ...base, title: "", steps: [] };
        else if (type === "image") newBlock = { ...base, images: [] };
        else if (type === "highlight") newBlock = { ...base, title: "", desc1: "", desc2: "" };
        setFormBlocks(prev => [...prev, newBlock]);
    };

    const updateBlock = (index, field, value) => {
        setFormBlocks(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const removeBlock = (index) => {
        setFormBlocks(prev => prev.filter((_, i) => i !== index));
    };

    const moveBlock = (index, dir) => {
        setFormBlocks(prev => {
            const arr = [...prev];
            if (dir === "up" && index > 0) [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
            if (dir === "down" && index < arr.length - 1) [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
            return arr;
        });
    };

    // Card item helpers
    const addCardItem = (blockIndex) => {
        const updated = [...formBlocks];
        updated[blockIndex] = {
            ...updated[blockIndex],
            items: [...(updated[blockIndex].items || []), { title: "", desc: "", link: "", icon: "" }]
        };
        setFormBlocks(updated);
    };

    const updateCardItem = (blockIndex, itemIndex, field, value) => {
        const updated = [...formBlocks];
        const items = [...(updated[blockIndex].items || [])];
        items[itemIndex] = { ...items[itemIndex], [field]: value };
        updated[blockIndex] = { ...updated[blockIndex], items };
        setFormBlocks(updated);
    };

    const removeCardItem = (blockIndex, itemIndex) => {
        const updated = [...formBlocks];
        const items = [...(updated[blockIndex].items || [])];
        items.splice(itemIndex, 1);
        updated[blockIndex] = { ...updated[blockIndex], items };
        setFormBlocks(updated);
    };

    // Step helpers
    const addStep = (blockIndex) => {
        const updated = [...formBlocks];
        updated[blockIndex] = {
            ...updated[blockIndex],
            steps: [...(updated[blockIndex].steps || []), { title: "", desc: "" }]
        };
        setFormBlocks(updated);
    };

    const updateStep = (blockIndex, stepIndex, field, value) => {
        const updated = [...formBlocks];
        const steps = [...(updated[blockIndex].steps || [])];
        steps[stepIndex] = { ...steps[stepIndex], [field]: value };
        updated[blockIndex] = { ...updated[blockIndex], steps };
        setFormBlocks(updated);
    };

    const removeStep = (blockIndex, stepIndex) => {
        const updated = [...formBlocks];
        const steps = [...(updated[blockIndex].steps || [])];
        steps.splice(stepIndex, 1);
        updated[blockIndex] = { ...updated[blockIndex], steps };
        setFormBlocks(updated);
    };

    const inputCls = "w-full px-3 py-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-900 dark:text-white";
    const labelCls = "block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1";

    const renderBlockEditor = (block, index) => {
        const isCollapsed = collapsedBlocks[index];
        return (
            <div key={block.id || index} className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
                {/* Block Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                        <button onClick={() => moveBlock(index, "up")} className="p-1 text-slate-400 hover:text-cyan-500"><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button onClick={() => moveBlock(index, "down")} className="p-1 text-slate-400 hover:text-cyan-500"><ArrowDown className="w-3.5 h-3.5" /></button>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 capitalize">{block.type} Block</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setCollapsedBlocks(p => ({ ...p, [index]: !p[index] }))} className="p-1 text-slate-400 hover:text-cyan-500">
                            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                        </button>
                        <button onClick={() => removeBlock(index)} className="p-1 text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                    </div>
                </div>

                {/* Block Body */}
                {!isCollapsed && (
                    <div className="p-4 space-y-4">
                        {/* TEXT BLOCK */}
                        {block.type === "text" && (
                            <>
                                <div><label className={labelCls}>Heading (H2)</label><input className={inputCls} value={block.h2 || ""} onChange={e => updateBlock(index, "h2", e.target.value)} placeholder="Main heading..." /></div>
                                <div><label className={labelCls}>Sub Heading (H3)</label><input className={inputCls} value={block.h3 || ""} onChange={e => updateBlock(index, "h3", e.target.value)} placeholder="Sub heading..." /></div>
                                <div><label className={labelCls}>Description</label><textarea rows={3} className={inputCls} value={block.desc || ""} onChange={e => updateBlock(index, "desc", e.target.value)} placeholder="Description..." /></div>
                                <div><label className={labelCls}>List Items (ek line = ek item)</label><textarea rows={4} className={inputCls} value={block.list || ""} onChange={e => updateBlock(index, "list", e.target.value)} placeholder={"Item 1\nItem 2\nItem 3"} /></div>
                            </>
                        )}

                        {/* HIGHLIGHT BLOCK */}
                        {block.type === "highlight" && (
                            <>
                                <div><label className={labelCls}>Title</label><input className={inputCls} value={block.title || ""} onChange={e => updateBlock(index, "title", e.target.value)} /></div>
                                <div><label className={labelCls}>Description 1</label><textarea rows={2} className={inputCls} value={block.desc1 || ""} onChange={e => updateBlock(index, "desc1", e.target.value)} /></div>
                                <div><label className={labelCls}>Description 2</label><textarea rows={2} className={inputCls} value={block.desc2 || ""} onChange={e => updateBlock(index, "desc2", e.target.value)} /></div>
                            </>
                        )}

                        {/* IMAGE BLOCK */}
                        {block.type === "image" && (
                            <div className="space-y-2">
                                <label className={labelCls}>Image Upload karo</label>
                                <ImageUploader
                                    currentImage={(block.images && block.images[0]?.url) || ""}
                                    onUpload={(url) => {
                                        updateBlock(index, "images", [{ url, alt: block.title || "Image" }]);
                                    }}
                                />
                            </div>
                        )}

                        {/* CARDS BLOCK */}
                        {block.type === "cards" && (
                            <div className="space-y-4">
                                <div><label className={labelCls}>Section Title</label><input className={inputCls} value={block.title || ""} onChange={e => updateBlock(index, "title", e.target.value)} placeholder="E.g. Our Solutions" /></div>
                                <div className="space-y-3">
                                    {(block.items || []).map((item, itemIdx) => (
                                        <div key={itemIdx} className="border border-slate-200 dark:border-white/10 rounded-lg p-3 space-y-2 bg-slate-50/50 dark:bg-slate-900/30">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-cyan-600">Card {itemIdx + 1}</span>
                                                <button onClick={() => removeCardItem(index, itemIdx)} className="text-red-400 hover:text-red-600"><X className="w-3.5 h-3.5" /></button>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                <div><label className={labelCls}>Title</label><input className={inputCls} value={item.title || ""} onChange={e => updateCardItem(index, itemIdx, "title", e.target.value)} placeholder="Card title" /></div>
                                                <div><label className={labelCls}>Link (optional)</label><input className={inputCls} value={item.link || ""} onChange={e => updateCardItem(index, itemIdx, "link", e.target.value)} placeholder="/contact" /></div>
                                            </div>
                                            <div><label className={labelCls}>Description</label><textarea rows={2} className={inputCls} value={item.desc || ""} onChange={e => updateCardItem(index, itemIdx, "desc", e.target.value)} placeholder="Card description..." /></div>
                                        </div>
                                    ))}
                                    <button onClick={() => addCardItem(index)} className="w-full py-2 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-lg text-sm text-slate-500 hover:border-cyan-500 hover:text-cyan-600 transition-colors flex items-center justify-center gap-2">
                                        <Plus className="w-4 h-4" /> Card Add Karo
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEPS BLOCK */}
                        {block.type === "steps" && (
                            <div className="space-y-4">
                                <div><label className={labelCls}>Section Title</label><input className={inputCls} value={block.title || ""} onChange={e => updateBlock(index, "title", e.target.value)} placeholder="E.g. Our Process" /></div>
                                <div className="space-y-3">
                                    {(block.steps || []).map((step, stepIdx) => (
                                        <div key={stepIdx} className="border border-slate-200 dark:border-white/10 rounded-lg p-3 space-y-2 bg-slate-50/50 dark:bg-slate-900/30">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-cyan-600">Step {stepIdx + 1}</span>
                                                <button onClick={() => removeStep(index, stepIdx)} className="text-red-400 hover:text-red-600"><X className="w-3.5 h-3.5" /></button>
                                            </div>
                                            <div><label className={labelCls}>Title</label><input className={inputCls} value={step.title || ""} onChange={e => updateStep(index, stepIdx, "title", e.target.value)} /></div>
                                            <div><label className={labelCls}>Description</label><textarea rows={2} className={inputCls} value={step.desc || ""} onChange={e => updateStep(index, stepIdx, "desc", e.target.value)} /></div>
                                        </div>
                                    ))}
                                    <button onClick={() => addStep(index)} className="w-full py-2 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-lg text-sm text-slate-500 hover:border-cyan-500 hover:text-cyan-600 transition-colors flex items-center justify-center gap-2">
                                        <Plus className="w-4 h-4" /> Step Add Karo
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Globe className="w-6 h-6 text-cyan-500" />
                        Shared / Global Blocks
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Ek baar banao, saare pages par automatically dikhao. Industries, Solutions, ya poori website — aap choose karo!
                    </p>
                </div>
                <button onClick={openCreateModal} className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Naya Shared Block Banao
                </button>
            </div>

            {/* Blocks List */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                </div>
            ) : globalBlocks.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
                    <Globe className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Abhi koi Shared Block nahi bana hai.</p>
                    <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Upar se "Naya Shared Block Banao" par click karo.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {globalBlocks.map((block) => {
                        const cat = CATEGORY_OPTIONS.find(c => c.value === block.targetCategory);
                        const pos = POSITION_OPTIONS.find(p => p.value === block.position);
                        const blockCount = block.blockData?.blocks?.length || 0;
                        return (
                            <motion.div
                                key={block._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${block.isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white">{block.name}</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex flex-wrap gap-2">
                                            <span className="bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">{cat?.label || block.targetCategory}</span>
                                            <span className="bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded-full">{pos?.label || block.position}</span>
                                            <span className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">{blockCount} sections</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button onClick={() => handleToggleActive(block)} title={block.isActive ? "Band Karo" : "Chalu Karo"} className={`p-2 rounded-lg transition-colors ${block.isActive ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100" : "text-slate-400 bg-slate-100 dark:bg-white/5 hover:bg-slate-200"}`}>
                                        {block.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                                    </button>
                                    <button onClick={() => openEditModal(block)} className="p-2 rounded-lg text-cyan-600 bg-cyan-50 dark:bg-cyan-500/10 hover:bg-cyan-100 transition-colors">
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDelete(block)} className="p-2 rounded-lg text-red-500 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 transition-colors">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Edit / Create Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                        <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 20 }} className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl my-8">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/10">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {editingBlock ? "Shared Block Edit Karo" : "Naya Shared Block Banao"}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white"><X className="w-5 h-5" /></button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Name */}
                                <div>
                                    <label className={labelCls}>Block ka Naam (sirf aapke liye, website par nahi dikhega) *</label>
                                    <input className={inputCls} value={formName} onChange={e => setFormName(e.target.value)} placeholder="E.g. Industries Bottom CTA, All Pages Banner..." />
                                </div>

                                {/* Category & Position */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelCls}>Kahan Dikhana Hai? *</label>
                                        <select className={inputCls} value={formCategory} onChange={e => setFormCategory(e.target.value)}>
                                            {CATEGORY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelCls}>Page par Kahan (Position)? *</label>
                                        <select className={inputCls} value={formPosition} onChange={e => setFormPosition(e.target.value)}>
                                            {POSITION_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Active Toggle */}
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Status:</label>
                                    <button onClick={() => setFormActive(p => !p)} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${formActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-slate-100 text-slate-500 dark:bg-white/5"}`}>
                                        {formActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                                        {formActive ? "Active (ON)" : "Inactive (OFF)"}
                                    </button>
                                </div>

                                {/* Block Builder */}
                                <div>
                                    <label className={labelCls}>Sections / Blocks (jo content website par dikhega)</label>
                                    <div className="space-y-4">
                                        {formBlocks.map((block, i) => renderBlockEditor(block, i))}
                                    </div>

                                    {/* Add Block Buttons */}
                                    <div className="mt-4">
                                        <p className="text-xs text-slate-400 mb-2">Naya Section Add Karo:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {BLOCK_TYPES.map(bt => (
                                                <button key={bt.type} onClick={() => addBlock(bt.type)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-slate-300 dark:border-white/10 text-sm text-slate-600 dark:text-slate-400 hover:border-cyan-500 hover:text-cyan-600 transition-colors">
                                                    <bt.icon className="w-3.5 h-3.5" /> {bt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end gap-3 p-6 border-t border-slate-200 dark:border-white/10">
                                <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-medium">Cancel</button>
                                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50">
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {isSaving ? "Save ho raha hai..." : "Save Karo"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
