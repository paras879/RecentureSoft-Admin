"use client";

import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, ExternalLink, Edit, Trash2, Download, Reply } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";
import QuickReplyModal from "./QuickReplyModal";
import CategoryManagerModal from "./CategoryManagerModal";
import { useAdmin } from "@/components/admin/AdminProvider";

export default function AdminDataTable({ title, data, type }) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [deletingId, setDeletingId] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [replyModalOpen, setReplyModalOpen] = useState(false);
    const [replyRecipient, setReplyRecipient] = useState({ email: "", name: "" });
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const itemsPerPage = 10;

    const { admin } = useAdmin();
    const role = admin?.role || 'super_admin';
    const perms = admin?.permissions || {};

    const typeToModuleMap = {
        project: 'leads',
        meeting: 'meetings',
        contact: 'contact',
        blog: 'blogs',
        service: 'services',
        portfolio: 'portfolio',
        event: 'events',
        job: 'jobs',
        team: 'team',
        review: 'reviews',
        subscriber: 'subscribers',
        application: 'applications'
    };

    const moduleKey = typeToModuleMap[type];

    const hasAccess = (action) => {
        if (role === 'super_admin') return true;
        if (!moduleKey) return true;
        const key = `${moduleKey}_${action}`;
        const perm = perms[key];
        if (!perm) return true; // Default allow
        return perm.write !== false;
    };
    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this record? This action cannot be undone.")) return;

        setDeletingId(id);
        try {
            const res = await fetch(`/api/admin/records/${type}/${id}`, { method: "DELETE" });
            if (res.ok) {
                router.refresh();
                setSelectedIds(prev => prev.filter(i => i !== id));
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete record");
            }
        } catch (error) {
            console.error("Error deleting record:", error);
            alert("An error occurred while deleting the record");
        } finally {
            setDeletingId(null);
        }
    };

    const handleBulkDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} records?`)) return;

        try {
            const res = await fetch(`/api/admin/records/bulk`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type, ids: selectedIds })
            });
            if (res.ok) {
                router.refresh();
                setSelectedIds([]);
            } else {
                alert("Failed to delete records");
            }
        } catch(error) {
            console.error(error);
            alert("Error deleting records");
        }
    };

    const handleAddCategory = () => {
        setCategoryModalOpen(true);
    };

    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(paginatedData.map(item => item._id));
        } else {
            setSelectedIds([]);
        }
    };

    const toggleSelectRow = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleExportCSV = () => {
        if (data.length === 0) return;
        const keys = Object.keys(data[0]).filter(k => k !== "_id");
        let csvContent = "data:text/csv;charset=utf-8," 
            + keys.join(",") + "\n"
            + data.map(row => keys.map(k => {
                let cell = row[k] === null || row[k] === undefined ? "" : row[k];
                if (typeof cell === "string") cell = `"${cell.replace(/"/g, '""')}"`;
                return cell;
            }).join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${title.replace(/\s+/g, '_').toLowerCase()}_export.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const openReplyModal = (email, name) => {
        setReplyRecipient({ email, name });
        setReplyModalOpen(true);
    };

    const getColumns = () => {
        let cols = [];
        if (type === "project") {
            cols = [
                { label: "Date", key: "date" },
                { label: "Name", key: "name", render: (r) => <span className="font-semibold">{r.name}</span> },
                { label: "Email", key: "email", render: (r) => <span className="text-cyan-600">{r.email}</span> },
                { label: "Project Type", key: "projectType", render: (r) => <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 rounded-full text-xs font-medium">{r.projectType}</span> },
                { label: "Message", key: "message", render: (r) => <div className="max-w-xs truncate" title={r.message}>{r.message}</div> },
            ];
        } else if (type === "meeting") {
            cols = [
                { label: "Submitted", key: "submittedAt" },
                { label: "Name", key: "name", render: (r) => <span className="font-semibold">{r.name}</span> },
                { label: "Email", key: "email", render: (r) => <span className="text-cyan-600">{r.email}</span> },
                { label: "Meeting Date", key: "date", render: (r) => <span className="text-emerald-600 dark:text-emerald-400 font-medium">{r.date} at {r.time}</span> },
                { label: "Topic", key: "topic", render: (r) => <span className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 rounded-full text-xs font-medium">{r.topic}</span> },
            ];
        } else if (type === "contact") {
            cols = [
                { label: "Date", key: "date" },
                { label: "Name", key: "name", render: (r) => <span className="font-semibold">{r.name}</span> },
                { label: "Email", key: "email", render: (r) => <span className="text-cyan-600">{r.email}</span> },
                { label: "Subject", key: "subject", render: (r) => <span className="px-3 py-1 bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300 rounded-full text-xs font-medium">{r.subject || "No Subject"}</span> },
                { label: "Message", key: "message", render: (r) => <div className="max-w-xs truncate" title={r.message}>{r.message}</div> },
            ];
        } else if (type === "blog") {
            cols = [
                { label: "Date", key: "date" },
                { label: "Title", key: "title", render: (r) => <span className="font-semibold">{r.title}</span> },
                { label: "Category", key: "category", render: (r) => <span className="px-3 py-1 bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300 rounded-full text-xs font-medium">{r.category}</span> },
                { label: "Status", key: "published", render: (r) => (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${r.published ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300'}`}>
                        {r.published ? 'Published' : 'Draft'}
                    </span>
                )},
            ];
        } else if (type === "activity") {
            cols = [
                { label: "Date & Time", key: "createdAt" },
                { label: "Admin", key: "adminUsername", render: (r) => <span className="font-semibold">{r.adminUsername}</span> },
                { label: "Action", key: "action", render: (r) => (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                        ${r.action === 'CREATE' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : ''}
                        ${r.action === 'UPDATE' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' : ''}
                        ${r.action === 'DELETE' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' : ''}
                        ${r.action === 'LOGIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' : ''}
                        ${r.action === 'REPLY' ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400' : ''}
                    `}>
                        {r.action}
                    </span>
                )},
                { label: "Module", key: "module" },
                { label: "Description", key: "description" },
            ];
        }

        cols.push({ 
            label: "Actions", key: "actions", render: (r) => (
            <div className="flex items-center gap-1">
                {(type === "project" || type === "contact" || type === "meeting") && hasAccess("reply") && (
                    <button onClick={() => openReplyModal(r.email, r.name)} className="p-2 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 rounded-lg transition-colors" title="Reply Email">
                        <Reply className="w-4 h-4" />
                    </button>
                )}
                {type === "blog" && (
                    <>
                    <Link href={`/blog/${r.slug}`} target="_blank" className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View Blog">
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                    {hasAccess("edit") && (
                        <Link href={`/admin/content/blogs/edit/${r._id}`} className="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors" title="Edit Blog">
                            <Edit className="w-4 h-4" />
                        </Link>
                    )}
                    {hasAccess("delete") && <DeleteBlogButton id={r._id} />}
                    </>
                )}
                {type !== "blog" && hasAccess("delete") && (
                    <button 
                        onClick={(e) => handleDelete(r._id, e)}
                        disabled={deletingId === r._id}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete record"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>
        )});

        return cols;
    };

    const columns = getColumns();

    const filteredData = data.filter((item) => {
        if (!search) return true;
        const searchLower = search.toLowerCase();
        if (type === "blog") return (item.title?.toLowerCase().includes(searchLower) || item.category?.toLowerCase().includes(searchLower));
        return (item.name?.toLowerCase().includes(searchLower) || item.email?.toLowerCase().includes(searchLower) || item.topic?.toLowerCase().includes(searchLower) || item.subject?.toLowerCase().includes(searchLower) || item.projectType?.toLowerCase().includes(searchLower));
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const isAllCurrentPageSelected = paginatedData.length > 0 && paginatedData.every(item => selectedIds.includes(item._id));

    return (
        <div className="w-full flex flex-col gap-6">
            <QuickReplyModal 
                isOpen={replyModalOpen} 
                onClose={() => setReplyModalOpen(false)} 
                recipientEmail={replyRecipient.email}
                recipientName={replyRecipient.name}
                type={type}
            />
            
            <CategoryManagerModal 
                isOpen={categoryModalOpen}
                onClose={() => setCategoryModalOpen(false)}
            />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
                    {selectedIds.length > 0 && hasAccess("delete") && (
                        <button onClick={handleBulkDelete} className="text-sm px-3 py-1.5 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-500/20 dark:text-red-400 rounded-lg font-medium transition-colors">
                            Delete Selected ({selectedIds.length})
                        </button>
                    )}
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search records..." 
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <button onClick={handleExportCSV} className="p-2 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300" title="Export CSV">
                        <Download className="w-5 h-5" />
                    </button>
                    {type === "blog" && hasAccess("category") && (
                        <button onClick={handleAddCategory} className="px-4 py-2 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/20 rounded-xl hover:bg-cyan-100 dark:hover:bg-cyan-500/20 text-sm font-semibold transition-colors flex items-center gap-1">
                            Manage Categories
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                            <tr>
                                <th className="px-4 py-4 w-12">
                                    <input type="checkbox" className="rounded border-slate-300 dark:border-white/20 text-cyan-600 focus:ring-cyan-500" checked={isAllCurrentPageSelected} onChange={toggleSelectAll} />
                                </th>
                                {columns.map((col, i) => (
                                    <th key={i} className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {paginatedData.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-slate-500">
                                        No records found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-4">
                                            <input type="checkbox" className="rounded border-slate-300 dark:border-white/20 text-cyan-600 focus:ring-cyan-500" checked={selectedIds.includes(row._id)} onChange={() => toggleSelectRow(row._id)} />
                                        </td>
                                        {columns.map((col, j) => (
                                            <td key={j} className="px-6 py-4 text-slate-700 dark:text-slate-300">
                                                {col.render ? col.render(row) : row[col.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                        Showing {filteredData.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} records
                    </span>
                    <div className="flex items-center gap-2">
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-50"><ChevronLeft className="w-5 h-5" /></button>
                        <span className="text-sm font-medium">Page {page} of {totalPages}</span>
                        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-50"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
