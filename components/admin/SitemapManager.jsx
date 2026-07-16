"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    RefreshCw,
    Globe,
    MapPin,
    Shield,
    ChevronDown,
    ExternalLink,
    Check,
    AlertCircle,
    Clock,
    SlidersHorizontal,
} from "lucide-react";
import { formatDateIST } from "@/lib/formatDateIST";

const SECTION_ICONS = {
    information: Globe,
    locations: MapPin,
    legal: Shield,
};

const SECTION_COLORS = {
    information: {
        border: "border-blue-200 dark:border-blue-500/20",
        bg: "bg-blue-50 dark:bg-blue-500/5",
        headerBg: "bg-blue-50/80 dark:bg-blue-500/10",
        text: "text-blue-700 dark:text-blue-300",
        icon: "text-blue-500",
        badge: "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300",
    },
    locations: {
        border: "border-emerald-200 dark:border-emerald-500/20",
        bg: "bg-emerald-50 dark:bg-emerald-500/5",
        headerBg: "bg-emerald-50/80 dark:bg-emerald-500/10",
        text: "text-emerald-700 dark:text-emerald-300",
        icon: "text-emerald-500",
        badge: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    },
    legal: {
        border: "border-purple-200 dark:border-purple-500/20",
        bg: "bg-purple-50 dark:bg-purple-500/5",
        headerBg: "bg-purple-50/80 dark:bg-purple-500/10",
        text: "text-purple-700 dark:text-purple-300",
        icon: "text-purple-500",
        badge: "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300",
    },
};

const PRIORITY_OPTIONS = [
    { value: 0.1, label: "0.1 (Lowest)" },
    { value: 0.3, label: "0.3 (Low)" },
    { value: 0.5, label: "0.5 (Medium)" },
    { value: 0.7, label: "0.7 (High)" },
    { value: 0.9, label: "0.9 (Very High)" },
    { value: 1.0, label: "1.0 (Maximum)" },
];

const FREQUENCY_OPTIONS = [
    "always", "hourly", "daily", "weekly", "monthly", "yearly", "never"
];

function formatDate(dateStr) {
    if (!dateStr) return "—";
    return formatDateIST(dateStr);
}

function AccordionSection({ section, entries, colors, isOpen, onToggle, onUpdate }) {
    const Icon = SECTION_ICONS[section];
    const [editingId, setEditingId] = useState(null);
    const [editPriority, setEditPriority] = useState(null);
    const [editFrequency, setEditFrequency] = useState(null);

    const handleEdit = (entry) => {
        setEditingId(entry._id);
        setEditPriority(entry.priority);
        setEditFrequency(entry.changeFrequency);
    };

    const handleSave = async (entryId) => {
        if (editPriority === null || !editFrequency) return;
        try {
            const res = await fetch(`/api/admin/sitemap/${entryId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priority: editPriority, changeFrequency: editFrequency }),
            });
            if (res.ok) {
                onUpdate();
                setEditingId(null);
            }
        } catch (e) {
            console.error("Failed to update sitemap entry", e);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditPriority(null);
        setEditFrequency(null);
    };

    return (
        <div className={`rounded-2xl border ${colors.border} ${colors.bg} overflow-hidden shadow-sm`}>
            <button
                onClick={onToggle}
                className={`w-full flex items-center justify-between px-6 py-5 ${colors.headerBg} transition-colors cursor-pointer`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${colors.bg}`}>
                        <Icon className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    <div className="text-left">
                        <h3 className={`font-semibold text-base ${colors.text}`}>
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {entries.length} {entries.length === 1 ? "page" : "pages"}
                        </p>
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className={`w-5 h-5 ${colors.icon}`} />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-5 pt-3 space-y-2">
                            {entries.length === 0 ? (
                                <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-8">
                                    No pages in this section yet.
                                </p>
                            ) : (
                                entries.map((entry) => (
                                    <div
                                        key={entry._id}
                                        className="group bg-white dark:bg-white/[0.03] rounded-xl border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-all"
                                    >
                                        <div className="px-4 py-3.5">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-sm text-slate-900 dark:text-white truncate">
                                                            {entry.name}
                                                        </span>
                                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider ${colors.badge}`}>
                                                            {entry.source}
                                                        </span>
                                                    </div>
                                                    <a
                                                        href={entry.canonical || entry.path}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-xs text-cyan-600 dark:text-cyan-400 hover:underline mt-1"
                                                    >
                                                        {entry.path}
                                                        <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                    <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {formatDate(entry.lastModified)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 shrink-0">
                                                    {editingId === entry._id ? (
                                                        <div className="flex items-center gap-2">
                                                            <select
                                                                value={editPriority}
                                                                onChange={(e) => setEditPriority(parseFloat(e.target.value))}
                                                                className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
                                                            >
                                                                {PRIORITY_OPTIONS.map((opt) => (
                                                                    <option key={opt.value} value={opt.value}>
                                                                        {opt.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <select
                                                                value={editFrequency}
                                                                onChange={(e) => setEditFrequency(e.target.value)}
                                                                className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
                                                            >
                                                                {FREQUENCY_OPTIONS.map((f) => (
                                                                    <option key={f} value={f}>
                                                                        {f}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <button
                                                                onClick={() => handleSave(entry._id)}
                                                                className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-500/30 transition-colors"
                                                            >
                                                                <Check className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={handleCancel}
                                                                className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-3">
                                                            <div className="text-right">
                                                                <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                                                    {entry.priority?.toFixed(1)}
                                                                </div>
                                                                <div className="text-[10px] text-slate-400 capitalize">
                                                                    {entry.changeFrequency}
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => handleEdit(entry)}
                                                                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 transition-all opacity-0 group-hover:opacity-100"
                                                            >
                                                                <SlidersHorizontal className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function SitemapManager() {
    const [data, setData] = useState({ information: [], locations: [], legal: [] });
    const [openSection, setOpenSection] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [syncMessage, setSyncMessage] = useState(null);
    const [totalCount, setTotalCount] = useState(0);

    const fetchSitemap = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/sitemap");
            const json = await res.json();
            if (json.success) {
                setData({
                    information: json.information || [],
                    locations: json.locations || [],
                    legal: json.legal || [],
                });
                setTotalCount(
                    (json.information?.length || 0) +
                    (json.locations?.length || 0) +
                    (json.legal?.length || 0)
                );
            }
        } catch (e) {
            console.error("Failed to fetch sitemap", e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSitemap();
    }, [fetchSitemap]);

    const handleSync = async () => {
        setIsSyncing(true);
        setSyncMessage(null);
        try {
            const res = await fetch("/api/admin/sitemap", { method: "POST" });
            const json = await res.json();
            if (json.success) {
                setSyncMessage({ type: "success", text: `Sitemap synced! ${json.count} active entries.` });
                await fetchSitemap();
            } else {
                setSyncMessage({ type: "error", text: json.error || "Sync failed" });
            }
        } catch (e) {
            setSyncMessage({ type: "error", text: "Failed to sync sitemap" });
        } finally {
            setIsSyncing(false);
            setTimeout(() => setSyncMessage(null), 5000);
        }
    };

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const sections = [
        { key: "information", entries: data.information, colors: SECTION_COLORS.information },
        { key: "locations", entries: data.locations, colors: SECTION_COLORS.locations },
        { key: "legal", entries: data.legal, colors: SECTION_COLORS.legal },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <RefreshCw className="w-6 h-6 text-cyan-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-xl text-sm text-slate-600 dark:text-slate-400">
                        <span className="font-semibold text-slate-900 dark:text-white">{totalCount}</span> total pages
                    </div>
                </div>
                <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-cyan-500/20"
                >
                    <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
                    {isSyncing ? "Syncing..." : "Sync Now"}
                </button>
            </div>

            <AnimatePresence>
                {syncMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm ${
                            syncMessage.type === "success"
                                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20"
                                : "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/20"
                        }`}
                    >
                        {syncMessage.type === "success" ? (
                            <Check className="w-4 h-4 shrink-0" />
                        ) : (
                            <AlertCircle className="w-4 h-4 shrink-0" />
                        )}
                        {syncMessage.text}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col gap-4">
                {sections.map(({ key, entries, colors }) => (
                    <AccordionSection
                        key={key}
                        section={key}
                        entries={entries}
                        colors={colors}
                        isOpen={openSection === key}
                        onToggle={() => toggleSection(key)}
                        onUpdate={fetchSitemap}
                    />
                ))}
            </div>
        </div>
    );
}
