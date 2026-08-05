"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    Globe, Plus, Trash2, Pencil, ToggleLeft, ToggleRight,
    Layers, AlertCircle, Search, Eye, EyeOff
} from "lucide-react";

const CATEGORY_LABELS = {
    all: "All Pages (Poori Website)",
    industries: "Industries",
    solutions: "Solutions",
};

const POSITION_LABELS = {
    top: "Top (Sabse Upar)",
    bottom: "Bottom (Sabse Niche)",
    "before-footer": "Before Footer",
};

export default function SharedBlocksPage() {
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const fetchBlocks = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/global-blocks");
            const data = await res.json();
            if (data.success) setBlocks(data.blocks);
            else setError(data.error || "Failed to load");
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBlocks(); }, []);

    const handleToggle = async (block) => {
        try {
            await fetch(`/api/admin/global-blocks/${block._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: !block.isActive }),
            });
            setBlocks(prev => prev.map(b => b._id === block._id ? { ...b, isActive: !b.isActive } : b));
        } catch (e) {
            alert("Failed to toggle status");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Kya aap sure hain? Yeh block permanently delete ho jayega.")) return;
        setDeletingId(id);
        try {
            await fetch(`/api/admin/global-blocks/${id}`, { method: "DELETE" });
            setBlocks(prev => prev.filter(b => b._id !== id));
        } catch (e) {
            alert("Delete failed");
        } finally {
            setDeletingId(null);
        }
    };

    const filtered = blocks.filter(b =>
        b.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center">
                            <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Shared / Global Blocks</h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Ek baar banao, saare pages par automatically dikhao. Industries, Solutions, ya poori website — aap choose karo!
                    </p>
                </div>
                <Link
                    href="/admin/shared-blocks/new"
                    className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-sm font-medium transition-all shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    + Naya Shared Block Banao
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Block ka naam search karo..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
            </div>

            {/* Error */}
            {error && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                </div>
            )}

            {/* Content */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-16 text-center">
                    <Globe className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400 font-medium">
                        {search ? `"${search}" ke liye koi block nahi mila.` : "Abhi koi Shared Block nahi bana hai."}
                    </p>
                    {!search && (
                        <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
                            Upar se &quot;Naya Shared Block Banao&quot; par click karo.
                        </p>
                    )}
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {filtered.map((block) => (
                        <div
                            key={block._id}
                            className="group bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-white/20 transition-all"
                        >
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${block.isActive ? "bg-emerald-50 dark:bg-emerald-500/10" : "bg-slate-100 dark:bg-slate-800"}`}>
                                        <Layers className={`w-5 h-5 ${block.isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h2 className="text-base font-semibold text-slate-900 dark:text-white">{block.name}</h2>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${block.isActive ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                                                {block.isActive ? "Active (ON)" : "Inactive (OFF)"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                                            <span className="text-xs text-slate-400 dark:text-slate-500">
                                                📍 {CATEGORY_LABELS[block.targetCategory] || block.targetCategory}
                                            </span>
                                            <span className="text-xs text-slate-400 dark:text-slate-500">
                                                📌 {POSITION_LABELS[block.position] || block.position}
                                            </span>
                                            <span className="text-xs text-slate-400 dark:text-slate-500">
                                                🧩 {block.blockData?.blocks?.length || 0} sections
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Toggle active */}
                                    <button
                                        onClick={() => handleToggle(block)}
                                        title={block.isActive ? "Deactivate" : "Activate"}
                                        className={`p-2 rounded-lg border transition-colors ${block.isActive ? "border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10" : "border-slate-200 dark:border-white/10 text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"}`}
                                    >
                                        {block.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                    {/* Edit */}
                                    <Link
                                        href={`/admin/shared-blocks/${block._id}`}
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-cyan-600 hover:bg-cyan-700 text-white transition-colors shadow-sm"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                        Edit
                                    </Link>
                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDelete(block._id)}
                                        disabled={deletingId === block._id}
                                        className="p-2 rounded-lg border border-red-100 dark:border-red-500/20 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-40"
                                    >
                                        {deletingId === block._id
                                            ? <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                            : <Trash2 className="w-4 h-4" />
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
