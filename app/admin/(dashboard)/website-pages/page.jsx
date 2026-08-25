"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Filter, MoreVertical, Edit, Eye, EyeOff, LayoutTemplate, Globe, FileText, Smartphone, Laptop, Trash2, Briefcase, Code, Layers, Package, ShieldCheck, Star, CheckCircle2, XCircle, Save, Loader2, ArrowRight, ListChecks, ChevronDown, ChevronUp, ArrowUp, ArrowDown, GripVertical, Image as ImageIcon, Info, MapPin, Target } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useAdmin } from "@/components/admin/AdminProvider";
import ImageUploader from "@/components/admin/ImageUploader";
import BannerCustomizer from "@/components/admin/BannerCustomizer";

export default function WebsitePages() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newPageName, setNewPageName] = useState("");
    const [newPagePath, setNewPagePath] = useState("");
    const [newCategory, setNewCategory] = useState("None");
    const [newSubcategory, setNewSubcategory] = useState("");
    const [newTemplateType, setNewTemplateType] = useState("default");
    const [isSaving, setIsSaving] = useState(false);

    const [editPage, setEditPage] = useState(null);
    const [isViewOnly, setIsViewOnly] = useState(false);
    const [editFormData, setEditFormData] = useState({ seoTitle: "", seoDescription: "", content: {} });
    const [isSavingEdit, setIsSavingEdit] = useState(false);
    const [activeEditTab, setActiveEditTab] = useState("seo"); // 'seo', 'hero', 'about', 'services', 'stats'
    const [collapsedBlocks, setCollapsedBlocks] = useState({});

    const toggleBlockCollapse = (index) => {
        setCollapsedBlocks(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const { admin } = useAdmin();
    const role = admin?.role || 'super_admin';
    const perms = admin?.permissions || {};
    let canManage = true;
    let canCreate = true;
    if (role !== 'super_admin') {
        if (perms.pages) {
            canManage = perms.pages.manage !== false;
        }
        if (perms.create_page) {
            canCreate = perms.create_page.manage !== false;
        }
    }

    const handleAddPage = async () => {
        if (!newPageName || !newPagePath) return;
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/website-pages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newPageName,
                    path: newPagePath,
                    category: newCategory,
                    subcategory: newSubcategory,
                    templateType: newTemplateType
                })
            });
            const data = await res.json();
            if (data.success) {
                setPages([...pages, data.page]);
                setIsAddModalOpen(false);
                setNewPageName("");
                setNewPagePath("");
                setNewCategory("None");
                setNewSubcategory("");
                setNewTemplateType("default");
            } else {
                alert(data.message || "Failed to add page");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveEdit = async () => {
        setIsSavingEdit(true);
        try {
            const res = await fetch("/api/admin/website-pages", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: editPage._id,
                    seoTitle: editFormData.seoTitle,
                    seoDescription: editFormData.seoDescription,
                    content: editFormData.content,
                    templateType: editFormData.templateType,
                    category: editFormData.category,
                    subcategory: editFormData.subcategory
                })
            });
            const data = await res.json();
            if (data.success) {
                setPages(pages.map(p => p._id === editPage._id ? data.page : p));
                setEditPage(null);
            } else {
                alert("Failed to save changes: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while saving.");
        } finally {
            setIsSavingEdit(false);
        }
    };

    const togglePageStatus = async (pageId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        // Optimistic update
        setPages(pages.map(p => p._id === pageId ? { ...p, status: newStatus } : p));

        try {
            const res = await fetch("/api/admin/website-pages", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: pageId, status: newStatus })
            });
            const data = await res.json();
            if (!data.success) {
                // Revert on failure
                setPages(pages.map(p => p._id === pageId ? { ...p, status: currentStatus } : p));
            }
        } catch (err) {
            console.error(err);
            // Revert on failure
            setPages(pages.map(p => p._id === pageId ? { ...p, status: currentStatus } : p));
        }
    };

    const handleDeletePage = async (pageId, pageName) => {
        if (!window.confirm(`Are you sure you want to delete the page "${pageName}"? This action cannot be undone.`)) return;

        try {
            const res = await fetch(`/api/admin/website-pages?id=${pageId}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.success) {
                setPages(pages.filter(p => p._id !== pageId));
            } else {
                alert(data.message || "Failed to delete page");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while deleting.");
        }
    };

    const handleAddBlock = (type) => {
        const newBlocks = [...(editFormData.content?.crmBlocks || [])];
        if (type === 'text') newBlocks.push({ type: 'text', h2: '', h3: '', desc: '', list: '' });
        else if (type === 'highlight') newBlocks.push({ type: 'highlight', title: '', desc1: '', desc2: '' });
        else if (type === 'cards') newBlocks.push({ type: 'cards', title: '', items: [] });
        else if (type === 'steps') newBlocks.push({ type: 'steps', title: '', steps: [] });
        else if (type === 'image') newBlocks.push({ type: 'image', url: '', alt: '' });
        setEditFormData({ ...editFormData, content: { ...editFormData.content, crmBlocks: newBlocks } });
    };

    const handleUpdateBlock = (index, field, value) => {
        const newBlocks = [...(editFormData.content?.crmBlocks || [])];
        newBlocks[index] = { ...newBlocks[index], [field]: value };
        setEditFormData({ ...editFormData, content: { ...editFormData.content, crmBlocks: newBlocks } });
    };

    const handleRemoveBlock = (index) => {
        const newBlocks = [...(editFormData.content?.crmBlocks || [])];
        newBlocks.splice(index, 1);
        setEditFormData({ ...editFormData, content: { ...editFormData.content, crmBlocks: newBlocks } });
    };

    const handleMoveBlock = (index, direction) => {
        const newBlocks = [...(editFormData.content?.crmBlocks || [])];
        if (direction === 'up' && index > 0) {
            [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
        } else if (direction === 'down' && index < newBlocks.length - 1) {
            [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
        }
        setEditFormData({ ...editFormData, content: { ...editFormData.content, crmBlocks: newBlocks } });
    };

    useEffect(() => {
        fetch("/api/admin/website-pages")
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setPages(data.pages);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const pathsToHide = ['/services', '/sitemap', '/adminedit'];
    const filteredPages = pages.filter(p =>
        !pathsToHide.includes(p.path) &&
        (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.path.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Globe className="w-6 h-6 text-cyan-500" />
                        Manage Website Pages
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        View and manage all static routes on your website.
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden flex flex-col relative min-h-[400px]">

                <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-transparent flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full sm:max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search pages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}




                            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-900 dark:text-white"
                        />
                    </div>
                    {canCreate && (
                        <button onClick={() => setIsAddModalOpen(true)} className="w-full sm:w-auto px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <Plus className="w-4 h-4" />
                            Add New Page
                        </button>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-400 font-medium">
                            <tr>
                                <th className="px-6 py-4">Page Name</th>
                                <th className="px-6 py-4">URL Path</th>
                                <th className="px-6 py-4">Enable/Disable</th>
                                <th className="px-6 py-4 text-right">View & Edit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center">
                                        <Loader2 className="w-6 h-6 animate-spin text-cyan-500 mx-auto" />
                                        <p className="mt-2 text-slate-500">Loading pages...</p>
                                    </td>
                                </tr>
                            ) : filteredPages.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                        No pages found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredPages.map((page, idx) => {
                                    const pageId = `page_${page._id}`;
                                    let pageCanView = true;
                                    let pageCanManage = true;

                                    if (role !== 'super_admin') {
                                        if (perms[pageId]) {
                                            pageCanView = perms[pageId].view !== false;
                                            pageCanManage = perms[pageId].manage !== false;
                                        } else if (perms.pages) {
                                            pageCanView = perms.pages.view !== false;
                                            pageCanManage = perms.pages.manage !== false;
                                        }
                                    }

                                    if (!pageCanView) return null;

                                    return (
                                        <motion.tr
                                            key={page._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: (idx % 10) * 0.05 }}
                                            className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors group"
                                        >
                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                {page.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 rounded-md font-mono text-xs text-slate-500 dark:text-slate-400">
                                                    {page.path}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <label className={`relative inline-flex items-center ${pageCanManage ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
                                                    <input type="checkbox" className="sr-only peer" checked={page.status === 'active'} onChange={() => pageCanManage && togglePageStatus(page._id, page.status)} disabled={!pageCanManage} />
                                                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-cyan-500"></div>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-6">
                                                    <button onClick={() => {
                                                        setIsViewOnly(true);
                                                        setEditPage(page);
                                                        setActiveEditTab("seo");
                                                        setEditFormData({
                                                            seoTitle: page.seoTitle || "",
                                                            seoDescription: page.seoDescription || "",
                                                            content: page.content || {},
                                                            templateType: page.templateType || "default",
                                                            category: page.category || "None",
                                                            subcategory: page.subcategory || ""
                                                        });
                                                    }} className="inline-flex items-center justify-center p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View Page Data">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    {pageCanManage && page.status === 'active' && (
                                                        <button onClick={() => {
                                                            setIsViewOnly(false);
                                                            setEditPage(page);
                                                            setCollapsedBlocks({});
                                                            setActiveEditTab("seo");
                                                            setEditFormData({
                                                                seoTitle: page.seoTitle || "",
                                                                seoDescription: page.seoDescription || "",
                                                                content: page.content || {},
                                                                templateType: page.templateType || "default",
                                                                category: page.category || "None",
                                                                subcategory: page.subcategory || ""
                                                            });
                                                        }} className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-cyan-500 hover:bg-cyan-500/10 rounded-lg transition-colors" title="Edit Page">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {pageCanManage && (
                                                        <button onClick={() => handleDeletePage(page._id, page.name)} className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete Page">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add New Page Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 w-full max-w-md overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Page</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Page Name</label>
                                <input
                                    type="text"
                                    value={newPageName}
                                    onChange={(e) => setNewPageName(e.target.value)}
                                    placeholder="e.g. Terms & Conditions"
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">URL Path</label>
                                <input
                                    type="text"
                                    value={newPagePath}
                                    onChange={(e) => setNewPagePath(e.target.value)}
                                    placeholder="e.g. /terms"
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-900 dark:text-white font-mono"
                                />
                            </div>
                            {newTemplateType !== 'location-template' && (
                                <>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category (Navbar Link)</label>
                                        <select
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-900 dark:text-white"
                                        >
                                            <option value="None">None</option>
                                            <option value="Solutions">Solutions</option>
                                            <option value="Industries">Industries</option>
                                        </select>
                                    </div>
                                    {newCategory !== "None" && (
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Sub-Category (Column Title)</label>
                                            <input
                                                type="text"
                                                value={newSubcategory}
                                                onChange={(e) => setNewSubcategory(e.target.value)}
                                                placeholder="e.g. Web Development"
                                                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Template Type</label>
                                <select
                                    value={newTemplateType}
                                    onChange={(e) => {
                                        setNewTemplateType(e.target.value);
                                        if (e.target.value === 'location-template') {
                                            setNewCategory('None');
                                            setNewSubcategory('');
                                        }
                                    }}
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-900 dark:text-white"
                                >
                                    <option value="default">Default Blank Template</option>
                                    <option value="crm-template">CRM/Solutions Template</option>
                                    <option value="location-template">Location Pages Template</option>
                                    <option value="android-template">Android App Template</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddPage}
                                disabled={isSaving || !newPageName || !newPagePath}
                                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                {isSaving ? 'Saving...' : 'Add Page'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Form Modal (View or Edit) */}
            {editPage && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 md:p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 w-full max-w-5xl h-full max-h-[90vh] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    {isViewOnly ? <Eye className="w-6 h-6 text-cyan-500" /> : <LayoutTemplate className="w-6 h-6 text-cyan-500" />}
                                    {isViewOnly ? "View Page Data:" : "Edit Page:"} <span className="text-cyan-600 dark:text-cyan-400">{editPage.name}</span>
                                </h2>
                                <span className="px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md font-mono text-xs text-slate-600 dark:text-slate-300">
                                    {editPage.path}
                                </span>
                            </div>
                            <button onClick={() => setEditPage(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-1 bg-white dark:bg-slate-800 rounded-md shadow-sm border border-slate-200 dark:border-slate-700">
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-slate-50 dark:bg-[#020617]">

                            {/* Sidebar Tabs */}
                            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 p-4 space-y-2 bg-white dark:bg-slate-900/50 flex md:flex-col overflow-x-auto md:overflow-y-auto hide-scrollbar">
                                <button
                                    onClick={() => setActiveEditTab("seo")}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'seo' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    <Search className="w-4 h-4" /> General Settings
                                </button>
                                <button
                                    onClick={() => setActiveEditTab("banner-settings")}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'banner-settings' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    <ImageIcon className="w-4 h-4" /> Banner Settings
                                </button>

                                {editPage.path === "/crm" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("crm-page-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'crm-page-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> CRM Hero
                                        </button>
                                        <button onClick={() => setActiveEditTab("crm-page-intro")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'crm-page-intro' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> CRM Intro & Fundamentals
                                        </button>
                                        <button onClick={() => setActiveEditTab("crm-page-best")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'crm-page-best' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> CRM Best
                                        </button>
                                        <button onClick={() => setActiveEditTab("crm-page-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'crm-page-services' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> CRM Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("crm-page-process")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'crm-page-process' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> CRM Process
                                        </button>
                                        <button onClick={() => setActiveEditTab("crm-page-benefits")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'crm-page-benefits' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> CRM Benefits
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/cms" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("cms-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cms-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> CMS Hero
                                        </button>
                                        <button onClick={() => setActiveEditTab("cms-intro")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cms-intro' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> CMS Intro
                                        </button>
                                        <button onClick={() => setActiveEditTab("cms-best")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cms-best' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> CMS Best
                                        </button>
                                        <button onClick={() => setActiveEditTab("cms-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cms-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> CMS Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("cms-process")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cms-process' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> CMS Process
                                        </button>
                                        <button onClick={() => setActiveEditTab("cms-benefits")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cms-benefits' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> CMS Benefits
                                        </button>
                                        <button onClick={() => setActiveEditTab("cms-chooseus")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cms-chooseus' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> CMS Why Choose Us
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/blog" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("blog-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'blog-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Blog Hero
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/events" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("events-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'events-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Events Hero
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("events-timeline")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'events-timeline' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Events Timeline
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("events-stats")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'events-stats' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Culture Stats
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("events-video")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'events-video' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Video Reel
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("about")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'about' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> About Section
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("services")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Globe className="w-4 h-4" /> Services Header
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("stats")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'stats' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Globe className="w-4 h-4" /> Stats & Metrics
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/about" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("about-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'about-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> About Hero
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("about-timeline")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'about-timeline' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Globe className="w-4 h-4" /> Company Story
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("about-why")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'about-why' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("about-stats")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'about-stats' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Company Stats
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("about-culture")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'about-culture' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Culture Gallery
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("about-process")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'about-process' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> Process & Tech
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("about-leadership")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'about-leadership' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> Leadership & CTA
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/portfolio" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("portfolio-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'portfolio-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Portfolio Hero
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("portfolio-gallery")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'portfolio-gallery' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Globe className="w-4 h-4" /> Gallery Setup
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("portfolio-transform")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'portfolio-transform' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Transformations
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("portfolio-cta")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'portfolio-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> Call to Action
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/amazon-store-management" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("amazon-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'amazon-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Amazon Store Hero
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("amazon-intro")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'amazon-intro' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> Amazon Intro
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("amazon-services")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'amazon-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Package className="w-4 h-4" /> Amazon Services
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("amazon-process")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'amazon-process' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <ListChecks className="w-4 h-4" /> Amazon Process
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("amazon-benefits")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'amazon-benefits' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Star className="w-4 h-4" /> Amazon Benefits
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/opencart-development" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("opencart-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'opencart-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> OpenCart Hero
                                        </button>

                                        <button
                                            onClick={() => setActiveEditTab("opencart-intro")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'opencart-intro' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> OpenCart Intro
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("opencart-whatis")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'opencart-whatis' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Info className="w-4 h-4" /> What is OpenCart
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("opencart-benefits")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'opencart-benefits' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Star className="w-4 h-4" /> Key Benefits
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("opencart-solutions")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'opencart-solutions' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Package className="w-4 h-4" /> Solutions
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("opencart-process")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'opencart-process' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <ListChecks className="w-4 h-4" /> Development Cycle
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("opencart-industries")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'opencart-industries' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Globe className="w-4 h-4" /> Industries
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("opencart-cta")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'opencart-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> OpenCart CTA
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/magento-development" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("magento-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'magento-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Magento Hero
                                        </button>

                                        <button
                                            onClick={() => setActiveEditTab("magento-intro")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'magento-intro' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> Magento Intro
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("magento-reasons")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'magento-reasons' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Star className="w-4 h-4" /> Magento Reasons
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("magento-process")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'magento-process' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <ListChecks className="w-4 h-4" /> Magento Lifecycle
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("magento-benefits")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'magento-benefits' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Globe className="w-4 h-4" /> Magento Benefits
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("magento-services")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'magento-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Package className="w-4 h-4" /> Magento Services
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("magento-cta")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'magento-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Magento CTA
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/ebay-store-management" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("ebay-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ebay-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> eBay Store Hero
                                        </button>

                                        <button
                                            onClick={() => setActiveEditTab("ebay-intro")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ebay-intro' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> eBay Intro
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("ebay-value")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ebay-value' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Star className="w-4 h-4" /> Value Proposition
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("ebay-services")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ebay-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Package className="w-4 h-4" /> Primary Services
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("ebay-offerings")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ebay-offerings' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <ListChecks className="w-4 h-4" /> Additional Offerings
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("ebay-cta")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ebay-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> eBay CTA
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/wordpress-development-customization" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("wordpress-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'wordpress-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> WordPress Hero
                                        </button>

                                        <button
                                            onClick={() => setActiveEditTab("wp-intro")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'wp-intro' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> WP Intro
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("wp-concept")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'wp-concept' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Info className="w-4 h-4" /> WP Concept
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("wp-reasons")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'wp-reasons' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Star className="w-4 h-4" /> Why WP?
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("wp-services")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'wp-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Package className="w-4 h-4" /> WP Services
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("wp-choose-us")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'wp-choose-us' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <ShieldCheck className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("wp-process")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'wp-process' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <ListChecks className="w-4 h-4" /> WP Process
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("wp-cta")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'wp-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> WP CTA
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/news" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("news-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'news-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> News Hero
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("news-cta")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'news-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> News CTA
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/contact" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("contact-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'contact-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Contact Hero
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("contact-form")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'contact-form' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> Contact Form
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/ai-services" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'aiconsulting-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-techlogos")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'aiconsulting-techlogos' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Layers className="w-4 h-4" /> Tech Logos
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-about")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'aiconsulting-about' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> About Section
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-services")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'aiconsulting-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Package className="w-4 h-4" /> Services
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-solutions")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'aiconsulting-solutions' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Briefcase className="w-4 h-4" /> Solutions
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-industries")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'aiconsulting-industries' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Globe className="w-4 h-4" /> Industries
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-whychoose")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'aiconsulting-whychoose' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <ShieldCheck className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-casestudies")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'aiconsulting-casestudies' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Star className="w-4 h-4" /> Case Studies
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("aiconsulting-cta")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'aiconsulting-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Bottom CTA
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/rag-development" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("rag-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'rag-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-techlogos")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'rag-techlogos' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Code className="w-4 h-4" /> Tech Logos
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-about")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'rag-about' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Layers className="w-4 h-4" /> About Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'rag-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Package className="w-4 h-4" /> Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-solutions")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'rag-solutions' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Briefcase className="w-4 h-4" /> Solutions
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-whychoose")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'rag-whychoose' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Star className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-casestudies")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'rag-casestudies' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <FileText className="w-4 h-4" /> Case Studies
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-actionable")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'rag-actionable' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Target className="w-4 h-4" /> Actionable Insights
                                        </button>
                                        <button onClick={() => setActiveEditTab("rag-cta")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'rag-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <ArrowRight className="w-4 h-4" /> CTA
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/ai-chatbot-development" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("chatbot-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'chatbot-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("chatbot-techlogos")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'chatbot-techlogos' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Code className="w-4 h-4" /> Tech Logos
                                        </button>
                                        <button onClick={() => setActiveEditTab("chatbot-about")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'chatbot-about' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Layers className="w-4 h-4" /> About Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("chatbot-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'chatbot-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Package className="w-4 h-4" /> Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("chatbot-solutions")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'chatbot-solutions' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Briefcase className="w-4 h-4" /> Solutions
                                        </button>
                                        <button onClick={() => setActiveEditTab("chatbot-whychoose")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'chatbot-whychoose' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Star className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button onClick={() => setActiveEditTab("chatbot-casestudies")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'chatbot-casestudies' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <FileText className="w-4 h-4" /> Case Studies
                                        </button>
                                        <button onClick={() => setActiveEditTab("chatbot-cta")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'chatbot-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <ArrowRight className="w-4 h-4" /> CTA
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/ai-agent-development" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("agent-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'agent-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("agent-techlogos")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'agent-techlogos' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Code className="w-4 h-4" /> Tech Logos
                                        </button>
                                        <button onClick={() => setActiveEditTab("agent-about")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'agent-about' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Layers className="w-4 h-4" /> About Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("agent-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'agent-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Package className="w-4 h-4" /> Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("agent-solutions")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'agent-solutions' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Briefcase className="w-4 h-4" /> Solutions
                                        </button>
                                        <button onClick={() => setActiveEditTab("agent-whychoose")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'agent-whychoose' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Star className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button onClick={() => setActiveEditTab("agent-casestudies")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'agent-casestudies' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <FileText className="w-4 h-4" /> Case Studies
                                        </button>
                                        <button onClick={() => setActiveEditTab("agent-cta")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'agent-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <ArrowRight className="w-4 h-4" /> CTA
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/generative-ai" && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("genai-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'genai-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-techlogos")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'genai-techlogos' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Layers className="w-4 h-4" /> Tech Logos
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-about")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'genai-about' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> About AI
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-services")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'genai-services' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Package className="w-4 h-4" /> AI Services
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-solutions")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'genai-solutions' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Briefcase className="w-4 h-4" /> Solutions
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-techstack")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'genai-techstack' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Code className="w-4 h-4" /> Tech Stack
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-whychoose")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'genai-whychoose' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <ShieldCheck className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-casestudies")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'genai-casestudies' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <Star className="w-4 h-4" /> Case Studies
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("genai-cta")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'genai-cta' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Bottom CTA
                                        </button>
                                    </>
                                )}
                                {(editFormData.templateType === "crm-template" || editFormData.templateType === "location-template") && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("crm-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'crm-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        {editFormData.templateType === "location-template" && (
                                            <button
                                                onClick={() => setActiveEditTab("location-map")}
                                                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'location-map' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                            >
                                                <MapPin className="w-4 h-4" /> Map Highlight
                                            </button>
                                        )}
                                        <button
                                            onClick={() => setActiveEditTab("crm-content")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'crm-content' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> Page Content
                                        </button>

                                        {activeEditTab === 'crm-content' && (
                                            <div className="flex flex-col gap-1.5 pl-6 mt-1 mb-2">
                                                <button type="button" onClick={() => handleAddBlock('text')} className="text-left px-3 py-2 text-xs font-medium bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 rounded-lg transition-colors border border-cyan-100 dark:border-cyan-500/20 shadow-sm">+ Add Text Block</button>
                                                <button type="button" onClick={() => handleAddBlock('highlight')} className="text-left px-3 py-2 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-lg transition-colors border border-blue-100 dark:border-blue-500/20 shadow-sm">+ Add Highlight Box</button>
                                                <button type="button" onClick={() => handleAddBlock('cards')} className="text-left px-3 py-2 text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-500/20 rounded-lg transition-colors border border-purple-100 dark:border-purple-500/20 shadow-sm">+ Add Cards Section</button>
                                                <button type="button" onClick={() => handleAddBlock('steps')} className="text-left px-3 py-2 text-xs font-medium bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-lg transition-colors border border-rose-100 dark:border-rose-500/20 shadow-sm">+ Add Steps Section</button>
                                                <button type="button" onClick={() => handleAddBlock('image')} className="text-left px-3 py-2 text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/20 rounded-lg transition-colors border border-amber-100 dark:border-amber-500/20 shadow-sm">+ Add Image Banner</button>
                                            </div>
                                        )}
                                    </>
                                )}
                                {editFormData.templateType === "android-template" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("android-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'android-services' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Android Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("android-steps")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'android-steps' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Android Steps
                                        </button>
                                        
                                        <button onClick={() => setActiveEditTab("android-intro")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'android-intro' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <FileText className="w-4 h-4" /> Intro & Solutions
                                        </button>
                                        <button onClick={() => setActiveEditTab("android-whyus")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'android-whyus' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <CheckCircle2 className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button onClick={() => setActiveEditTab("android-benefits")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'android-benefits' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Android Benefits
                                        </button>
                                        <button onClick={() => setActiveEditTab("android-why-us")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'android-why-us' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button onClick={() => setActiveEditTab("android-faqs")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'android-faqs' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> FAQs
                                        </button>
                                    </>
                                )}



                                {editPage.path === "/python-development" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("py-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'py-hero' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Python Hero
                                        </button>
                                        <button onClick={() => setActiveEditTab("py-why")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'py-why' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why Python
                                        </button>
                                        <button onClick={() => setActiveEditTab("py-solutions")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'py-solutions' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Custom Solutions
                                        </button>
                                        <button onClick={() => setActiveEditTab("py-tech")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'py-tech' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Technologies
                                        </button>
                                        <button onClick={() => setActiveEditTab("py-growth")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'py-growth' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Business Growth
                                        </button>
                                        <button onClick={() => setActiveEditTab("py-approach")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'py-approach' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Approach & Industries
                                        </button>
                                        <button onClick={() => setActiveEditTab("py-whyus")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'py-whyus' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why Us & Tools
                                        </button>
                                        <button onClick={() => setActiveEditTab("py-faqs-cta")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'py-faqs-cta' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> FAQs & CTA
                                        </button>
                                    </>
                                )}







                                {editPage.path === "/next-js" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("nextjs-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'nextjs-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("nextjs-overview")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'nextjs-overview' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Cinematic Overview
                                        </button>
                                        <button onClick={() => setActiveEditTab("nextjs-features")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'nextjs-features' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Features & Details
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/node-js" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("nodejs-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'nodejs-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("nodejs-overview")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'nodejs-overview' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Cinematic Overview
                                        </button>
                                        <button onClick={() => setActiveEditTab("nodejs-features")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'nodejs-features' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Features & Details
                                        </button>

                                          <button onClick={() => setActiveEditTab("node-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'node-services' ? 'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                              <Briefcase className="w-4 h-4" /> Node Services
                                          </button>
                                          <button onClick={() => setActiveEditTab("node-whychoose")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'node-whychoose' ? 'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                              <Star className="w-4 h-4" /> Why Choose Us
                                          </button>
                                          <button onClick={() => setActiveEditTab("node-process")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'node-process' ? 'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                              <ListChecks className="w-4 h-4" /> Node Process
                                          </button>
                                    </>
                                )}


                                {editPage.path === "/react-native" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("reactnative-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'reactnative-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("reactnative-overview")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'reactnative-overview' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Cinematic Overview
                                        </button>
                                        <button onClick={() => setActiveEditTab("reactnative-features")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'reactnative-features' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Features & Details
                                        </button>
                                        <button onClick={() => setActiveEditTab("reactnative-steps")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'reactnative-steps' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Development Steps
                                        </button>
                                        <button onClick={() => setActiveEditTab("reactnative-why-choose")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'reactnative-why-choose' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why Choose Us
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/react" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("react-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'react-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("react-overview")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'react-overview' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Cinematic Overview
                                        </button>
                                        <button onClick={() => setActiveEditTab("react-features")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'react-features' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Features & Details
                                        </button>
                                        <button onClick={() => setActiveEditTab("react-hiring")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'react-hiring' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hiring Process
                                        </button>
                                        <button onClick={() => setActiveEditTab("react-steps")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'react-steps' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Development Process
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/seo-package" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("seopackage-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'seopackage-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> SEO Hero Tab
                                        </button>
                                        <button onClick={() => setActiveEditTab("seopackage-table")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'seopackage-table' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> SEO Packages Table
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/iphone-apps-development" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("iphone-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'iphone-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("iphone-solutions-intro")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'iphone-solutions-intro' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Intro & Solutions
                                        </button>
                                        <button onClick={() => setActiveEditTab("iphone-why-partner")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'iphone-why-partner' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why iOS & Partner
                                        </button>
                                        <button onClick={() => setActiveEditTab("iphone-process-ind")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'iphone-process-ind' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Process & Industries
                                        </button>
                                        <button onClick={() => setActiveEditTab("iphone-cta")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'iphone-cta' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> CTA Section
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/ipad-app-development" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("ipad-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ipad-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("ipad-intro-value")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ipad-intro-value' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Intro & Value Prop
                                        </button>
                                        <button onClick={() => setActiveEditTab("ipad-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ipad-services' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> iPad Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("ipad-process")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ipad-process' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Our Process
                                        </button>
                                        <button onClick={() => setActiveEditTab("ipad-whyus")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ipad-whyus' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why Choose Us & CTA
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/php-development" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("php-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'php-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("php-why")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'php-why' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why PHP
                                        </button>
                                        <button onClick={() => setActiveEditTab("php-about")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'php-about' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> About & Stats
                                        </button>
                                        <button onClick={() => setActiveEditTab("php-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'php-services' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("php-solutions")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'php-solutions' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Web Solutions
                                        </button>
                                        <button onClick={() => setActiveEditTab("php-process")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'php-process' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Process
                                        </button>
                                        <button onClick={() => setActiveEditTab("php-features")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'php-features' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Features & Tech
                                        </button>
                                        <button onClick={() => setActiveEditTab("php-whyus-cta")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'php-whyus-cta' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why Us & CTA
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/flutter" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("flutter-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'flutter-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("flutter-why")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'flutter-why' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why Flutter
                                        </button>
                                        <button onClick={() => setActiveEditTab("flutter-about")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'flutter-about' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> About & Stats
                                        </button>
                                        <button onClick={() => setActiveEditTab("flutter-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'flutter-services' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("flutter-solutions")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'flutter-solutions' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Industry Solutions
                                        </button>
                                        <button onClick={() => setActiveEditTab("flutter-process")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'flutter-process' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Process
                                        </button>
                                        <button onClick={() => setActiveEditTab("flutter-features")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'flutter-features' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Features & Tech
                                        </button>
                                        <button onClick={() => setActiveEditTab("flutter-whyus-cta")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'flutter-whyus-cta' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why Us & CTA
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/javascript-development" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("js-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'js-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("js-why")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'js-why' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why JavaScript
                                        </button>
                                        <button onClick={() => setActiveEditTab("js-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'js-services' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("js-tech")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'js-tech' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Technologies
                                        </button>
                                        <button onClick={() => setActiveEditTab("js-features")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'js-features' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Features & Image
                                        </button>
                                        <button onClick={() => setActiveEditTab("js-process")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'js-process' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Process
                                        </button>
                                        <button onClick={() => setActiveEditTab("js-solutions")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'js-solutions' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Business Solutions
                                        </button>
                                        <button onClick={() => setActiveEditTab("js-whyus-cta")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'js-whyus-cta' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why Us & CTA
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/laravel-development" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("laravel-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'laravel-hero' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("laravel-why")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'laravel-why' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why Laravel
                                        </button>
                                        <button onClick={() => setActiveEditTab("laravel-about")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'laravel-about' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> About & Stats
                                        </button>
                                        <button onClick={() => setActiveEditTab("laravel-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'laravel-services' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("laravel-industries")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'laravel-industries' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Industries
                                        </button>
                                        <button onClick={() => setActiveEditTab("laravel-process")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'laravel-process' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Process
                                        </button>
                                        <button onClick={() => setActiveEditTab("laravel-features")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'laravel-features' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Features & Tech
                                        </button>
                                        <button onClick={() => setActiveEditTab("laravel-whyus")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'laravel-whyus' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why Us & CTA
                                        </button>
                                    </>
                                )}

                                {editPage.path === "/cookies" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("cookies-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cookies-hero' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Settings
                                        </button>
                                        <button onClick={() => setActiveEditTab("cookies-sections")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cookies-sections' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Policy Sections
                                        </button>
                                        <button onClick={() => setActiveEditTab("cookies-faqs")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cookies-faqs' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> FAQs
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/content-writing" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("cw-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cw-hero' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("cw-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cw-services' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("cw-process")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cw-process' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Process
                                        </button>
                                        <button onClick={() => setActiveEditTab("cw-benefits")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cw-benefits' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Benefits
                                        </button>
                                        <button onClick={() => setActiveEditTab("cw-why-us")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cw-why-us' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why Choose Us
                                        </button>
                                        <button onClick={() => setActiveEditTab("cw-cta")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'cw-cta' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Intro & CTA
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/career" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("career-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'career-hero' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("career-content")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'career-content' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Career Content
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/privacy-policy" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("privacy-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'privacy-hero' ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero & Meta
                                        </button>
                                        <button onClick={() => setActiveEditTab("privacy-sections")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'privacy-sections' ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <FileText className="w-4 h-4" /> Policy Sections
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/terms" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("terms-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'terms-hero' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero & Meta
                                        </button>
                                        <button onClick={() => setActiveEditTab("terms-sections")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'terms-sections' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <FileText className="w-4 h-4" /> Terms Sections
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/salesforce" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("salesforce-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'salesforce-hero' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Settings
                                        </button>
                                        <button onClick={() => setActiveEditTab("salesforce-content")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'salesforce-content' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <FileText className="w-4 h-4" /> Page Content
                                        </button>
                                        <button onClick={() => setActiveEditTab("salesforce-lists")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'salesforce-lists' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Feature Lists
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/seo-service" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("seo-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'seo-hero' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("seo-content")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'seo-content' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <FileText className="w-4 h-4" /> Page Content
                                        </button>
                                        <button onClick={() => setActiveEditTab("seo-lists")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'seo-lists' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Features & Locations
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/social-networking" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("smo-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'smo-hero' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("smo-intro")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'smo-intro' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <FileText className="w-4 h-4" /> Intro Content
                                        </button>
                                        <button onClick={() => setActiveEditTab("smo-approach")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'smo-approach' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Approach
                                        </button>
                                        <button onClick={() => setActiveEditTab("smo-features")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'smo-features' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Offerings
                                        </button>
                                        <button onClick={() => setActiveEditTab("smo-cta")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'smo-cta' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Call to Action
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/web-design" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("wd-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'wd-hero' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("wd-intro")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'wd-intro' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <FileText className="w-4 h-4" /> Intro Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("wd-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'wd-services' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Services (What We Do)
                                        </button>
                                        <button onClick={() => setActiveEditTab("wd-tech")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'wd-tech' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Tech Stack & Advantages
                                        </button>
                                        <button onClick={() => setActiveEditTab("wd-cta")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'wd-cta' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Call to Action
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/dashboard" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("dash-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'dash-hero' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Dashboard Hero
                                        </button>
                                        <button onClick={() => setActiveEditTab("dash-intro")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'dash-intro' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Intro Content
                                        </button>
                                        <button onClick={() => setActiveEditTab("dash-features")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'dash-features' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Features List
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/solutions" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("sol-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'sol-hero' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Solutions Hero
                                        </button>
                                        <button onClick={() => setActiveEditTab("sol-cta")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'sol-cta' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Solutions CTA
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/ai-seo" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("ai-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ai-hero' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("ai-intro")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ai-intro' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <FileText className="w-4 h-4" /> Intro Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("ai-why")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ai-why' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Why AI for SEO
                                        </button>
                                        <button onClick={() => setActiveEditTab("ai-features")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ai-features' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Features Grid
                                        </button>
                                        <button onClick={() => setActiveEditTab("ai-cta")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'ai-cta' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Call to Action
                                        </button>
                                    </>
                                )}
                                {editPage.path === "/android-application-development" && (
                                    <>
                                        <button onClick={() => setActiveEditTab("android-hero")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'android-hero' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button onClick={() => setActiveEditTab("android-services")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'android-services' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <Layers className="w-4 h-4" /> Services
                                        </button>
                                        <button onClick={() => setActiveEditTab("android-steps")} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'android-steps' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <ListChecks className="w-4 h-4" /> Process Steps
                                        </button>
                                        