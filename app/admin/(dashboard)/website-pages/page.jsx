"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Loader2, Globe, Search, ArrowRight, CheckCircle2, XCircle, Plus, Edit, Eye, Trash2, Save, LayoutTemplate } from "lucide-react";
import { useAdmin } from "@/components/admin/AdminProvider";
import ImageUploader from "@/components/admin/ImageUploader";

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
                    templateType: editFormData.templateType
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

    const filteredPages = pages.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.path.toLowerCase().includes(searchQuery.toLowerCase())
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
                                                            templateType: page.templateType || "default"
                                                        });
                                                    }} className="inline-flex items-center justify-center p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View Page Data">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    {pageCanManage && page.status === 'active' && (
                                                        <button onClick={() => {
                                                            setIsViewOnly(false);
                                                            setEditPage(page);
                                                            setActiveEditTab("seo");
                                                            setEditFormData({
                                                                seoTitle: page.seoTitle || "",
                                                                seoDescription: page.seoDescription || "",
                                                                content: page.content || {},
                                                                templateType: page.templateType || "default"
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
                            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 p-4 space-y-2 bg-white dark:bg-slate-900/50 flex md:flex-col overflow-x-auto md:overflow-x-visible hide-scrollbar">
                                <button
                                    onClick={() => setActiveEditTab("seo")}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'seo' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    <Search className="w-4 h-4" /> General Settings
                                </button>
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
                                {(editFormData.templateType === "crm-template" || editFormData.templateType === "location-template") && (
                                    <>
                                        <button
                                            onClick={() => setActiveEditTab("crm-hero")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'crm-hero' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <LayoutTemplate className="w-4 h-4" /> Hero Section
                                        </button>
                                        <button
                                            onClick={() => setActiveEditTab("crm-content")}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeEditTab === 'crm-content' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        >
                                            <FileText className="w-4 h-4" /> Page Content
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Main Content Area */}
                            <fieldset disabled={isViewOnly} className="flex-1 overflow-y-auto p-6 space-y-6">

                                {/* SEO TAB */}
                                {activeEditTab === "seo" && (
                                    <div className="max-w-2xl space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">General & SEO Settings</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Template Type</label>
                                                <select
                                                    value={editFormData.templateType || "default"}
                                                    onChange={(e) => setEditFormData({ ...editFormData, templateType: e.target.value })}
                                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none transition-all shadow-sm"
                                                >
                                                    <option value="default">Default Blank Template</option>
                                                    <option value="crm-template">CRM/Solutions Template</option>
                                                    <option value="location-template">Location Pages Template</option>
                                                </select>
                                                <p className="text-xs text-slate-500 mt-1">Select "CRM Template" to enable the Section Builder and hero banner for this page.</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SEO Title</label>
                                                <input
                                                    type="text"
                                                    value={editFormData.seoTitle}
                                                    onChange={(e) => setEditFormData({ ...editFormData, seoTitle: e.target.value })}
                                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none transition-all shadow-sm"
                                                    placeholder="Page Title"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SEO Description</label>
                                                <textarea
                                                    value={editFormData.seoDescription}
                                                    onChange={(e) => setEditFormData({ ...editFormData, seoDescription: e.target.value })}
                                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none transition-all shadow-sm min-h-[120px] resize-y"
                                                    placeholder="Meta description for Google"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* HERO TAB (For Home Page) */}
                                {activeEditTab === "hero" && editPage.path === "/" && (
                                    <div className="max-w-3xl space-y-8">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Hero Section Settings (3 Slides)</h3>

                                        {[1, 2, 3].map((slideIndex) => (
                                            <div key={slideIndex} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                                <h4 className="text-md font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 border-b border-slate-100 dark:border-slate-700 pb-2">
                                                    Slide {slideIndex}
                                                </h4>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading Part 1 (Regular)</label>
                                                        <input
                                                            type="text"
                                                            value={editFormData.content?.hero?.[`slide${slideIndex}`]?.heading1 || ""}
                                                            onChange={(e) => setEditFormData({
                                                                ...editFormData,
                                                                content: { ...editFormData.content, hero: { ...editFormData.content.hero, [`slide${slideIndex}`]: { ...editFormData.content.hero?.[`slide${slideIndex}`], heading1: e.target.value } } }
                                                            })}
                                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading Accent (Colored)</label>
                                                        <input
                                                            type="text"
                                                            value={editFormData.content?.hero?.[`slide${slideIndex}`]?.headingAccent || ""}
                                                            onChange={(e) => setEditFormData({
                                                                ...editFormData,
                                                                content: { ...editFormData.content, hero: { ...editFormData.content.hero, [`slide${slideIndex}`]: { ...editFormData.content.hero?.[`slide${slideIndex}`], headingAccent: e.target.value } } }
                                                            })}
                                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading Part 2 (Regular)</label>
                                                        <input
                                                            type="text"
                                                            value={editFormData.content?.hero?.[`slide${slideIndex}`]?.heading2 || ""}
                                                            onChange={(e) => setEditFormData({
                                                                ...editFormData,
                                                                content: { ...editFormData.content, hero: { ...editFormData.content.hero, [`slide${slideIndex}`]: { ...editFormData.content.hero?.[`slide${slideIndex}`], heading2: e.target.value } } }
                                                            })}
                                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="pt-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                    <textarea
                                                        value={editFormData.content?.hero?.[`slide${slideIndex}`]?.desc || ""}
                                                        onChange={(e) => setEditFormData({
                                                            ...editFormData,
                                                            content: { ...editFormData.content, hero: { ...editFormData.content.hero, [`slide${slideIndex}`]: { ...editFormData.content.hero?.[`slide${slideIndex}`], desc: e.target.value } } }
                                                        })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none min-h-[60px] resize-y"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Primary Button</label>
                                                        <input
                                                            type="text"
                                                            value={editFormData.content?.hero?.[`slide${slideIndex}`]?.cta1 || ""}
                                                            onChange={(e) => setEditFormData({
                                                                ...editFormData,
                                                                content: { ...editFormData.content, hero: { ...editFormData.content.hero, [`slide${slideIndex}`]: { ...editFormData.content.hero?.[`slide${slideIndex}`], cta1: e.target.value } } }
                                                            })}
                                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Secondary Button</label>
                                                        <input
                                                            type="text"
                                                            value={editFormData.content?.hero?.[`slide${slideIndex}`]?.cta2 || ""}
                                                            onChange={(e) => setEditFormData({
                                                                ...editFormData,
                                                                content: { ...editFormData.content, hero: { ...editFormData.content.hero, [`slide${slideIndex}`]: { ...editFormData.content.hero?.[`slide${slideIndex}`], cta2: e.target.value } } }
                                                            })}
                                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Background Image URL</label>
                                                        <input
                                                            type="text"
                                                            value={editFormData.content?.hero?.[`slide${slideIndex}`]?.bg || ""}
                                                            onChange={(e) => setEditFormData({
                                                                ...editFormData,
                                                                content: { ...editFormData.content, hero: { ...editFormData.content.hero, [`slide${slideIndex}`]: { ...editFormData.content.hero?.[`slide${slideIndex}`], bg: e.target.value } } }
                                                            })}
                                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                            placeholder={`/hero_bg_${slideIndex}.webp`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* ABOUT TAB (For Home Page) */}
                                {activeEditTab === "about" && editPage.path === "/" && (
                                    <div className="max-w-3xl space-y-6">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">About Section Settings</h3>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading 1</label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.content?.about?.heading1 || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, about: { ...editFormData.content.about, heading1: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        placeholder="Software Development"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading Accent</label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.content?.about?.headingAccent || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, about: { ...editFormData.content.about, headingAccent: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        placeholder="& Digital Innovation"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading 2</label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.content?.about?.heading2 || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, about: { ...editFormData.content.about, heading2: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        placeholder="For Modern Businesses"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                    <textarea
                                                        value={editFormData.content?.about?.desc || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, about: { ...editFormData.content.about, desc: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none h-24"
                                                        placeholder="At RecentureSoft, we create powerful..."
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Features (One per line)</label>
                                                    <textarea
                                                        value={editFormData.content?.about?.features || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, about: { ...editFormData.content.about, features: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none h-32"
                                                        placeholder="Enterprise Web Applications&#10;Mobile App Development"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Images (URLs)</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image 1 URL</label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.content?.about?.image1 || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, about: { ...editFormData.content.about, image1: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        placeholder="/about/about1.jpg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image 2 URL</label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.content?.about?.image2 || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, about: { ...editFormData.content.about, image2: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        placeholder="/about/about2.jpg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image 3 URL</label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.content?.about?.image3 || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, about: { ...editFormData.content.about, image3: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        placeholder="/about/about3.jpg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SERVICES HEADER TAB (For Home Page) */}
                                {activeEditTab === "services" && editPage.path === "/" && (
                                    <div className="max-w-3xl space-y-6">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Services Section Header</h3>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading 1</label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.content?.services?.heading1 || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, services: { ...editFormData.content.services, heading1: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        placeholder="Enterprise"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading Accent</label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.content?.services?.headingAccent || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, services: { ...editFormData.content.services, headingAccent: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        placeholder="Solutions"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                                    <textarea
                                                        value={editFormData.content?.services?.desc || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, services: { ...editFormData.content.services, desc: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none min-h-[80px]"
                                                        placeholder="Scalable architecture built for the modern web..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STATS TAB (For Home Page) */}
                                {activeEditTab === "stats" && editPage.path === "/" && (
                                    <div className="max-w-3xl space-y-6">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Stats & Metrics Settings</h3>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Dashboard Header</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading 1</label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.content?.stats?.heading1 || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, stats: { ...editFormData.content.stats, heading1: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        placeholder="Business Intelligence"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Heading Accent</label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.content?.stats?.headingAccent || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, stats: { ...editFormData.content.stats, headingAccent: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        placeholder="Command Center"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Top Counters</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {[1, 2, 3, 4].map((num) => (
                                                    <div key={num} className="p-3 border border-slate-100 dark:border-slate-700 rounded-lg">
                                                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Counter {num} Label & Value</label>
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                value={editFormData.content?.stats?.[`counter${num}Label`] || ""}
                                                                onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, stats: { ...editFormData.content.stats, [`counter${num}Label`]: e.target.value } } })}
                                                                className="w-2/3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-sm outline-none"
                                                                placeholder="e.g. Total Projects"
                                                            />
                                                            <input
                                                                type="number"
                                                                value={editFormData.content?.stats?.[`counter${num}Value`] || ""}
                                                                onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, stats: { ...editFormData.content.stats, [`counter${num}Value`]: e.target.value } } })}
                                                                className="w-1/3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-sm outline-none"
                                                                placeholder="1240"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CRM TEMPLATE TABS */}
                                {activeEditTab === "crm-hero" && (editFormData.templateType === "crm-template" || editFormData.templateType === "location-template") && (
                                    <div className="max-w-3xl space-y-6">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">CRM Hero Settings</h3>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.content?.crmHero?.title || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmHero: { ...editFormData.content.crmHero, title: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        placeholder="e.g. Customer Relationship"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Highlight Word</label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.content?.crmHero?.highlight || ""}
                                                        onChange={(e) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmHero: { ...editFormData.content.crmHero, highlight: e.target.value } } })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                                        placeholder="e.g. Management"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-white/5">
                                                <ImageUploader
                                                    label="Banner Image (Desktop)"
                                                    value={editFormData.content?.crmHero?.desktopBanner || ""}
                                                    onChange={(val) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmHero: { ...editFormData.content.crmHero, desktopBanner: val } } })}
                                                />
                                                <ImageUploader
                                                    label="Banner Image (Mobile)"
                                                    value={editFormData.content?.crmHero?.mobileBanner || ""}
                                                    onChange={(val) => setEditFormData({ ...editFormData, content: { ...editFormData.content, crmHero: { ...editFormData.content.crmHero, mobileBanner: val } } })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeEditTab === "crm-content" && (editFormData.templateType === "crm-template" || editFormData.templateType === "location-template") && (
                                    <div className="max-w-4xl space-y-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Page Content Settings (Section Builder)</h3>
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => handleAddBlock('text')} className="px-3 py-1.5 text-xs font-medium bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 rounded hover:bg-cyan-200 transition-colors">Add Text</button>
                                                <button type="button" onClick={() => handleAddBlock('highlight')} className="px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded hover:bg-blue-200 transition-colors">Add Highlight Box</button>
                                                <button type="button" onClick={() => handleAddBlock('cards')} className="px-3 py-1.5 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded hover:bg-purple-200 transition-colors">Add Cards</button>
                                                <button type="button" onClick={() => handleAddBlock('steps')} className="px-3 py-1.5 text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 rounded hover:bg-rose-200 transition-colors">Add Steps</button>
                                                <button type="button" onClick={() => handleAddBlock('image')} className="px-3 py-1.5 text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded hover:bg-amber-200 transition-colors">Add Image</button>
                                            </div>
                                        </div>

                                        {(editFormData.content?.crmBlocks || []).length === 0 ? (
                                            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-dashed border-slate-300 dark:border-slate-600 text-center text-slate-500 dark:text-slate-400">
                                                No sections added yet. Click the buttons above to build your page.
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {(editFormData.content?.crmBlocks || []).map((block, index) => (
                                                    <div key={index} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 relative group">
                                                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button type="button" onClick={() => handleMoveBlock(index, 'up')} disabled={index === 0} className="p-1.5 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded shadow hover:text-cyan-500 disabled:opacity-50">↑</button>
                                                            <button type="button" onClick={() => handleMoveBlock(index, 'down')} disabled={index === (editFormData.content?.crmBlocks?.length || 0) - 1} className="p-1.5 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded shadow hover:text-cyan-500 disabled:opacity-50">↓</button>
                                                            <button type="button" onClick={() => handleRemoveBlock(index)} className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded shadow hover:bg-red-200">X</button>
                                                        </div>
                                                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">{block.type} BLOCK</div>

                                                        {block.type === 'text' && (
                                                            <div className="space-y-4">
                                                                <input type="text" value={block.h2 || ''} onChange={(e) => handleUpdateBlock(index, 'h2', e.target.value)} placeholder="Main Heading (H2) e.g. Why Choose Us?" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                                                <input type="text" value={block.h3 || ''} onChange={(e) => handleUpdateBlock(index, 'h3', e.target.value)} placeholder="Sub Heading (H3) e.g. Core Features" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                                                <textarea value={block.desc || ''} onChange={(e) => handleUpdateBlock(index, 'desc', e.target.value)} placeholder="Paragraph Text..." rows={4} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white resize-y" />
                                                                <textarea value={block.list || ''} onChange={(e) => handleUpdateBlock(index, 'list', e.target.value)} placeholder="Bullet Points (one per line)" rows={3} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white resize-y font-mono" />
                                                            </div>
                                                        )}

                                                        {block.type === 'highlight' && (
                                                            <div className="space-y-4">
                                                                <input type="text" value={block.title || ''} onChange={(e) => handleUpdateBlock(index, 'title', e.target.value)} placeholder="Box Title" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                                                <textarea value={block.desc1 || ''} onChange={(e) => handleUpdateBlock(index, 'desc1', e.target.value)} placeholder="First Paragraph" rows="3" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                                                <textarea value={block.desc2 || ''} onChange={(e) => handleUpdateBlock(index, 'desc2', e.target.value)} placeholder="Second Paragraph (optional)" rows="3" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                                            </div>
                                                        )}

                                                        {block.type === 'cards' && (
                                                            <div className="space-y-4">
                                                                <input type="text" value={block.title || ''} onChange={(e) => handleUpdateBlock(index, 'title', e.target.value)} placeholder="Section Title (e.g. Our Services)" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                                                <textarea
                                                                    value={block.items?.map(i => `${i.title}|${i.desc}`).join('\n') || ''}
                                                                    onChange={(e) => {
                                                                        const lines = e.target.value.split('\n');
                                                                        const parsed = lines.map(l => {
                                                                            const [t, ...d] = l.split('|');
                                                                            return { title: t, desc: d.join('|') };
                                                                        });
                                                                        handleUpdateBlock(index, 'items', parsed);
                                                                    }}
                                                                    placeholder="Cards: format as 'Title|Description' (one card per line)"
                                                                    rows="5"
                                                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white font-mono"
                                                                />
                                                                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4">
                                                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Cards Background Image (Peeche Image Lagayein)</label>
                                                                    <ImageUploader
                                                                        label="Upload Background Image"
                                                                        value={block.bgImageUrl || ""}
                                                                        onChange={(val) => handleUpdateBlock(index, 'bgImageUrl', val)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}

                                                        {block.type === 'steps' && (
                                                            <div className="space-y-4">
                                                                <input type="text" value={block.title || ''} onChange={(e) => handleUpdateBlock(index, 'title', e.target.value)} placeholder="Section Title (e.g. Our Process)" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                                                <textarea
                                                                    value={block.steps?.map(s => `${s.stage}|${s.desc}`).join('\n') || ''}
                                                                    onChange={(e) => {
                                                                        const lines = e.target.value.split('\n');
                                                                        const parsed = lines.map(l => {
                                                                            const [t, ...d] = l.split('|');
                                                                            return { stage: t, desc: d.join('|') };
                                                                        });
                                                                        handleUpdateBlock(index, 'steps', parsed);
                                                                    }}
                                                                    placeholder="Steps: format as 'Stage Name|Description' (one step per line)"
                                                                    rows="5"
                                                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white font-mono"
                                                                />
                                                            </div>
                                                        )}

                                                        {block.type === 'image' && (
                                                            <div className="space-y-4">
                                                                <ImageUploader
                                                                    label="Section Image"
                                                                    value={block.url || ""}
                                                                    onChange={(val) => handleUpdateBlock(index, 'url', val)}
                                                                />
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                    <input type="text" value={block.alt || ''} onChange={(e) => handleUpdateBlock(index, 'alt', e.target.value)} placeholder="Image Alt Text (optional)" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white" />
                                                                    <select value={block.size || 'large'} onChange={(e) => handleUpdateBlock(index, 'size', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white">
                                                                        <option value="small">Small (Max Width: md)</option>
                                                                        <option value="medium">Medium (Max Width: 3xl)</option>
                                                                        <option value="large">Large (Max Width: 5xl)</option>
                                                                        <option value="full">Full Width</option>
                                                                    </select>
                                                                    <select value={block.align || 'center'} onChange={(e) => handleUpdateBlock(index, 'align', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white">
                                                                        <option value="left">Align Left</option>
                                                                        <option value="center">Align Center</option>
                                                                        <option value="right">Align Right</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {block.type !== 'image' && (
                                                            <div className="border-t border-slate-200 dark:border-slate-700 pt-5 mt-5">
                                                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Optional Side Image (Left or Right)</label>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                    <ImageUploader
                                                                        label="Upload Side Image"
                                                                        value={block.imageUrl || ""}
                                                                        onChange={(val) => handleUpdateBlock(index, 'imageUrl', val)}
                                                                    />
                                                                    {block.imageUrl && (
                                                                        <select value={block.imageAlign || 'right'} onChange={(e) => handleUpdateBlock(index, 'imageAlign', e.target.value)} className="w-full h-fit bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white">
                                                                            <option value="right">Image on Right Side</option>
                                                                            <option value="left">Image on Left Side</option>
                                                                        </select>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                            </fieldset>
                        </div>

                        {/* Footer / Actions */}
                        <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-800/80 flex justify-end gap-3">
                            <button
                                onClick={() => setEditPage(null)}
                                className="px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-colors pointer-events-auto"
                            >
                                {isViewOnly ? 'Close' : 'Cancel'}
                            </button>
                            {!isViewOnly && (
                                <button
                                    onClick={handleSaveEdit}
                                    disabled={isSavingEdit}
                                    className="px-6 py-2.5 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-sm shadow-cyan-500/20"
                                >
                                    {isSavingEdit ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {isSavingEdit ? 'Saving Changes...' : 'Save All Changes'}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
