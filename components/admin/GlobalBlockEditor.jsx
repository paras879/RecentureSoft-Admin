"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    Save, Check, Plus, Trash2, AlertCircle, ArrowLeft,
    Layers, Upload, Image as ImageIcon, X, Loader2,
    ChevronDown, ChevronUp, ArrowUp, ArrowDown, LayoutGrid,
    Type, List, Lightbulb, Image, Footprints
} from "lucide-react";

const CLOUDINARY_CLOUD_NAME = "dgsebwvvs";
const CLOUDINARY_UPLOAD_PRESET = "recenturesoft_upload";

const CATEGORY_OPTIONS = [
    { value: "all", label: "All Pages (Poori Website)" },
    { value: "industries", label: "Industries" },
    { value: "solutions", label: "Solutions" },
];

const POSITION_OPTIONS = [
    { value: "top", label: "Top (Sabse Upar)" },
    { value: "bottom", label: "Bottom (Sabse Niche)" },
    { value: "before-footer", label: "Before Footer" },
];

const BLOCK_TYPES = [
    { type: "cards", label: "Cards Grid", icon: LayoutGrid },
    { type: "text", label: "Text Block", icon: Type },
    { type: "steps", label: "Steps / Process", icon: List },
    { type: "image", label: "Image", icon: Image },
    { type: "highlight", label: "Highlight Box", icon: Lightbulb },
];

// Cloudinary image upload helper
async function uploadToCloudinary(file) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    fd.append("cloud_name", CLOUDINARY_CLOUD_NAME);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: fd,
    });
    const data = await res.json();
    if (!data.secure_url) throw new Error(data.error?.message || "Upload failed");
    return data.secure_url;
}

// ─── Small UI helpers ──────────────────────────────────────────────

function Field({ label, children }) {
    return (
        <div className="space-y-1.5">
            {label && <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">{label}</label>}
            {children}
        </div>
    );
}

function Input({ value, onChange, placeholder, type = "text", rows }) {
    const cls = "w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm transition-all";
    return rows
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} className={`${cls} resize-none`} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />;
}

// Image upload with preview
function ImageUploader({ value, onChange, label = "Background Image" }) {
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef(null);

    const handleFile = async (file) => {
        if (!file || !file.type.startsWith("image/")) return;
        setUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            onChange(url);
        } catch (e) {
            alert("Image upload failed: " + e.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">{label}</label>
            <div className="flex gap-2 items-start">
                <div className="flex-1">
                    <input
                        value={value || ""}
                        onChange={e => onChange(e.target.value)}
                        placeholder="URL paste karo ya neeche se upload karo..."
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                    />
                </div>
                <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-1.5 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 text-white rounded-lg text-xs font-medium transition-all whitespace-nowrap"
                >
                    {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    {uploading ? "Uploading..." : "Upload"}
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </div>
            {value && (
                <div className="relative w-full h-28 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── Cards block editor ────────────────────────────────────────────

function CardItem({ card, index, onChange, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) {
    const [open, setOpen] = useState(true);

    return (
        <div className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-white/[0.03] cursor-pointer" onClick={() => setOpen(o => !o)}>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Card {index + 1} {card.title ? `— ${card.title}` : ""}</span>
                <div className="flex items-center gap-1">
                    {!isFirst && <button type="button" onClick={e => { e.stopPropagation(); onMoveUp(index); }} className="p-1 text-slate-400 hover:text-slate-600"><ArrowUp className="w-3.5 h-3.5" /></button>}
                    {!isLast && <button type="button" onClick={e => { e.stopPropagation(); onMoveDown(index); }} className="p-1 text-slate-400 hover:text-slate-600"><ArrowDown className="w-3.5 h-3.5" /></button>}
                    <button type="button" onClick={e => { e.stopPropagation(); onRemove(index); }} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    {open ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                </div>
            </div>
            {open && (
                <div className="p-4 space-y-3 bg-white dark:bg-transparent">
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Title">
                            <Input value={card.title || ""} onChange={v => onChange(index, "title", v)} placeholder="Card title" />
                        </Field>
                        <Field label="Link (optional)">
                            <Input value={card.link || ""} onChange={v => onChange(index, "link", v)} placeholder="/contact" />
                        </Field>
                    </div>
                    <Field label="Description">
                        <Input value={card.desc || ""} onChange={v => onChange(index, "desc", v)} placeholder="Card description..." rows={3} />
                    </Field>
                    <Field label="Icon (emoji ya text)">
                        <Input value={card.icon || ""} onChange={v => onChange(index, "icon", v)} placeholder="e.g. 🚀 or BarChart" />
                    </Field>

                    {/* Background image section */}
                    <div className="pt-3 border-t border-slate-100 dark:border-white/5">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">🖼️ Card Background Image</p>
                        <ImageUploader
                            label="Background Image (optional)"
                            value={card.backgroundImage || ""}
                            onChange={v => onChange(index, "backgroundImage", v)}
                        />
                        {card.backgroundImage && (
                            <div className="mt-3 space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                                    Opacity: {card.backgroundOpacity ?? 50}%
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={card.backgroundOpacity ?? 50}
                                    onChange={e => onChange(index, "backgroundOpacity", Number(e.target.value))}
                                    className="w-full accent-cyan-500"
                                />
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>0% (poori image dikhegi)</span>
                                    <span>100% (bilkul dark)</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function CardsBlockEditor({ block, onChange }) {
    const items = block.items || [];

    const updateItem = (index, field, value) => {
        onChange({ ...block, items: items.map((it, i) => i === index ? { ...it, [field]: value } : it) });
    };
    const addItem = () => onChange({ ...block, items: [...items, { title: "", desc: "", link: "", icon: "", backgroundImage: "", backgroundOpacity: 50 }] });
    const removeItem = (index) => onChange({ ...block, items: items.filter((_, i) => i !== index) });
    const moveUp = (index) => {
        if (index === 0) return;
        const updated = [...items]; [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
        onChange({ ...block, items: updated });
    };
    const moveDown = (index) => {
        if (index === items.length - 1) return;
        const updated = [...items]; [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
        onChange({ ...block, items: updated });
    };

    return (
        <div className="space-y-4">
            <Field label="Section Title">
                <Input value={block.title || ""} onChange={v => onChange({ ...block, title: v })} placeholder="E.g. Our Solutions" />
            </Field>
            <div className="space-y-3">
                {items.map((card, i) => (
                    <CardItem
                        key={i}
                        card={card}
                        index={i}
                        onChange={updateItem}
                        onRemove={removeItem}
                        onMoveUp={moveUp}
                        onMoveDown={moveDown}
                        isFirst={i === 0}
                        isLast={i === items.length - 1}
                    />
                ))}
            </div>
            <button type="button" onClick={addItem} className="flex items-center gap-2 w-full justify-center px-4 py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 text-slate-600 dark:text-slate-400 hover:border-cyan-500 hover:text-cyan-600 transition-colors text-sm font-medium">
                <Plus className="w-4 h-4" />+ Card Add Karo
            </button>
        </div>
    );
}

// ─── Text block editor ────────────────────────────────────────────

function TextBlockEditor({ block, onChange }) {
    return (
        <div className="space-y-3">
            <Field label="Heading (H2)">
                <Input value={block.h2 || ""} onChange={v => onChange({ ...block, h2: v })} placeholder="Main heading..." />
            </Field>
            <Field label="Sub-heading (H3)">
                <Input value={block.h3 || ""} onChange={v => onChange({ ...block, h3: v })} placeholder="Sub-heading..." />
            </Field>
            <Field label="Description">
                <Input value={block.desc || ""} onChange={v => onChange({ ...block, desc: v })} placeholder="Paragraph text..." rows={4} />
            </Field>
            <Field label="List Items (ek item per line)">
                <Input value={block.list || ""} onChange={v => onChange({ ...block, list: v })} placeholder="Item 1&#10;Item 2&#10;Item 3" rows={4} />
            </Field>
        </div>
    );
}

// ─── Steps block editor ────────────────────────────────────────────

function StepsBlockEditor({ block, onChange }) {
    const steps = block.steps || [];
    const addStep = () => onChange({ ...block, steps: [...steps, { title: "", desc: "" }] });
    const removeStep = (i) => onChange({ ...block, steps: steps.filter((_, idx) => idx !== i) });
    const updateStep = (i, field, val) => onChange({ ...block, steps: steps.map((s, idx) => idx === i ? { ...s, [field]: val } : s) });

    return (
        <div className="space-y-3">
            <Field label="Section Title">
                <Input value={block.title || ""} onChange={v => onChange({ ...block, title: v })} placeholder="E.g. Our Process" />
            </Field>
            {steps.map((step, i) => (
                <div key={i} className="border border-slate-200 dark:border-white/10 rounded-xl p-4 space-y-2 bg-slate-50/50 dark:bg-white/[0.02]">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500">Step {i + 1}</span>
                        <button type="button" onClick={() => removeStep(i)} className="text-red-500 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                    <Input value={step.title || ""} onChange={v => updateStep(i, "title", v)} placeholder="Step title" />
                    <Input value={step.desc || ""} onChange={v => updateStep(i, "desc", v)} placeholder="Step description" rows={2} />
                </div>
            ))}
            <button type="button" onClick={addStep} className="flex items-center gap-2 w-full justify-center px-4 py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 text-slate-600 dark:text-slate-400 hover:border-cyan-500 hover:text-cyan-600 transition-colors text-sm font-medium">
                <Plus className="w-4 h-4" />+ Step Add Karo
            </button>
        </div>
    );
}

// ─── Image block editor ────────────────────────────────────────────

function ImageBlockEditor({ block, onChange }) {
    const images = block.images || [{ url: "", alt: "" }];
    const updateImage = (i, field, val) => onChange({ ...block, images: images.map((img, idx) => idx === i ? { ...img, [field]: val } : img) });
    const addImage = () => onChange({ ...block, images: [...images, { url: "", alt: "" }] });
    const removeImage = (i) => onChange({ ...block, images: images.filter((_, idx) => idx !== i) });

    return (
        <div className="space-y-4">
            {images.map((img, i) => (
                <div key={i} className="space-y-2 border border-slate-200 dark:border-white/10 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-500">Image {i + 1}</span>
                        {images.length > 1 && <button type="button" onClick={() => removeImage(i)} className="text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>}
                    </div>
                    <ImageUploader label="Image" value={img.url || ""} onChange={v => updateImage(i, "url", v)} />
                    <Input value={img.alt || ""} onChange={v => updateImage(i, "alt", v)} placeholder="Alt text (accessibility)" />
                </div>
            ))}
            <button type="button" onClick={addImage} className="flex items-center gap-2 w-full justify-center px-4 py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 text-slate-600 dark:text-slate-400 hover:border-cyan-500 hover:text-cyan-600 transition-colors text-sm font-medium">
                <Plus className="w-4 h-4" />+ Image Add Karo
            </button>
        </div>
    );
}

// ─── Highlight block editor ────────────────────────────────────────

function HighlightBlockEditor({ block, onChange }) {
    return (
        <div className="space-y-3">
            <Field label="Title">
                <Input value={block.title || ""} onChange={v => onChange({ ...block, title: v })} placeholder="Highlight title..." />
            </Field>
            <Field label="Description 1">
                <Input value={block.desc1 || ""} onChange={v => onChange({ ...block, desc1: v })} placeholder="First paragraph..." rows={3} />
            </Field>
            <Field label="Description 2">
                <Input value={block.desc2 || ""} onChange={v => onChange({ ...block, desc2: v })} placeholder="Second paragraph..." rows={3} />
            </Field>
        </div>
    );
}

// ─── Single Block Row ──────────────────────────────────────────────

function BlockRow({ block, index, onChange, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) {
    const [expanded, setExpanded] = useState(true);
    const BlockIcon = BLOCK_TYPES.find(t => t.type === block.type)?.icon || Layers;

    const renderEditor = () => {
        switch (block.type) {
            case "cards": return <CardsBlockEditor block={block} onChange={onChange} />;
            case "text": return <TextBlockEditor block={block} onChange={onChange} />;
            case "steps": return <StepsBlockEditor block={block} onChange={onChange} />;
            case "image": return <ImageBlockEditor block={block} onChange={onChange} />;
            case "highlight": return <HighlightBlockEditor block={block} onChange={onChange} />;
            default: return null;
        }
    };

    const typeLabel = BLOCK_TYPES.find(t => t.type === block.type)?.label || block.type;

    return (
        <div className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-white/[0.02]">
            {/* Block header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-white/[0.03] border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={() => setExpanded(e => !e)}>
                    <div className="w-7 h-7 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center">
                        <BlockIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{typeLabel}</span>
                    {!isFirst && <button type="button" onClick={e => { e.stopPropagation(); onMoveUp(); }} className="ml-2 p-1 text-slate-400 hover:text-slate-600"><ArrowUp className="w-3.5 h-3.5" /></button>}
                    {!isLast && <button type="button" onClick={e => { e.stopPropagation(); onMoveDown(); }} className="p-1 text-slate-400 hover:text-slate-600"><ArrowDown className="w-3.5 h-3.5" /></button>}
                </div>
                <div className="flex items-center gap-1">
                    <button type="button" onClick={() => setExpanded(e => !e)} className="p-1.5 text-slate-400 hover:text-slate-600">
                        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <button type="button" onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
            {/* Block body */}
            {expanded && (
                <div className="p-5">
                    {renderEditor()}
                </div>
            )}
        </div>
    );
}

// ─── Main Editor ──────────────────────────────────────────────────

export default function GlobalBlockEditor({ initialData, blockId }) {
    const router = useRouter();
    const isNew = !blockId;

    const [name, setName] = useState(initialData?.name || "");
    const [targetCategory, setTargetCategory] = useState(initialData?.targetCategory || "all");
    const [position, setPosition] = useState(initialData?.position || "bottom");
    const [isActive, setIsActive] = useState(initialData?.isActive !== false);
    const [blocks, setBlocks] = useState(initialData?.blockData?.blocks || []);

    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    const updateBlock = (index, updated) => {
        setBlocks(prev => prev.map((b, i) => i === index ? updated : b));
    };

    const removeBlock = (index) => setBlocks(prev => prev.filter((_, i) => i !== index));

    const addBlock = (type) => {
        const defaults = {
            cards: { type: "cards", title: "", items: [] },
            text: { type: "text", h2: "", h3: "", desc: "", list: "" },
            steps: { type: "steps", title: "", steps: [] },
            image: { type: "image", images: [{ url: "", alt: "" }] },
            highlight: { type: "highlight", title: "", desc1: "", desc2: "" },
        };
        setBlocks(prev => [...prev, defaults[type] || { type }]);
    };

    const moveUp = (index) => {
        if (index === 0) return;
        setBlocks(prev => { const a = [...prev]; [a[index - 1], a[index]] = [a[index], a[index - 1]]; return a; });
    };

    const moveDown = (index) => {
        setBlocks(prev => {
            if (index === prev.length - 1) return prev;
            const a = [...prev]; [a[index], a[index + 1]] = [a[index + 1], a[index]]; return a;
        });
    };

    const handleSave = async () => {
        if (!name.trim()) { setError("Block ka naam dena zaroori hai."); return; }
        setSaving(true); setError(""); setSaved(false);
        try {
            const payload = { name, targetCategory, position, isActive, blockData: { blocks } };
            const url = isNew ? "/api/admin/global-blocks" : `/api/admin/global-blocks/${blockId}`;
            const method = isNew ? "POST" : "PUT";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.error || "Save failed");
            setSaved(true);
            if (isNew && data.id) {
                setTimeout(() => router.push(`/admin/shared-blocks/${data.id}`), 1000);
            } else {
                setTimeout(() => setSaved(false), 3000);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.push("/admin/shared-blocks")} className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center">
                        <Layers className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                            {isNew ? "Naya Shared Block Banao" : "Shared Block Edit Karo"}
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Globally dikhane wala content block</p>
                    </div>
                </div>
                <button onClick={handleSave} disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-all shadow-sm"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saving ? "Save ho raha hai..." : saved ? "Save ho gaya!" : "Save Karo"}
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                </div>
            )}

            {/* Settings Card */}
            <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-5">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Block Settings</h2>

                <Field label="Block ka naam *">
                    <Input value={name} onChange={setName} placeholder="e.g. Aviation Services Block" />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Kahan Dikhana Hai? *</label>
                        <select
                            value={targetCategory}
                            onChange={e => setTargetCategory(e.target.value)}
                            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            {CATEGORY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Page par Kahan (Position)? *</label>
                        <select
                            value={position}
                            onChange={e => setPosition(e.target.value)}
                            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            {POSITION_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-xl">
                    <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">ON karo to website par dikhega</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsActive(v => !v)}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${isActive ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                    >
                        <span className={`w-3 h-3 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
                        {isActive ? "Active (ON)" : "Inactive (OFF)"}
                    </button>
                </div>
            </div>

            {/* Sections */}
            <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    Sections / Blocks (jo content website par dikhega)
                </h2>

                {blocks.map((block, index) => (
                    <BlockRow
                        key={index}
                        block={block}
                        index={index}
                        onChange={(updated) => updateBlock(index, updated)}
                        onRemove={() => removeBlock(index)}
                        onMoveUp={() => moveUp(index)}
                        onMoveDown={() => moveDown(index)}
                        isFirst={index === 0}
                        isLast={index === blocks.length - 1}
                    />
                ))}

                {/* Add block buttons */}
                <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Naya Section Add Karo:</p>
                    <div className="flex flex-wrap gap-2">
                        {BLOCK_TYPES.map(({ type, label, icon: Icon }) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => addBlock(type)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/5 transition-all text-xs font-medium"
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Save */}
            <div className="flex items-center justify-end gap-3 pt-2">
                <button onClick={() => router.push("/admin/shared-blocks")} className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                    Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-all shadow-sm"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saving ? "Saving..." : saved ? "Save ho gaya!" : "Save Karo"}
                </button>
            </div>
        </div>
    );
}
