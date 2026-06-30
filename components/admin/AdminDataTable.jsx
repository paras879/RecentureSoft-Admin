"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Eye, Edit, Trash2, Download, Reply } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";
import QuickReplyModal from "./QuickReplyModal";
import CategoryManagerModal from "./CategoryManagerModal";
import ServiceViewModal from "./ServiceViewModal";
import BlogViewModal from "./BlogViewModal";
import GenericRecordViewModal from "./GenericRecordViewModal";
import { useAdmin } from "@/components/admin/AdminProvider";
import { deleteJobOpening, deleteSubscriber } from "@/app/admin/actions";

export default function AdminDataTable({ title, data, type }) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [deletingId, setDeletingId] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [replyModalOpen, setReplyModalOpen] = useState(false);
    const [replyRecipient, setReplyRecipient] = useState({ email: "", name: "" });
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [viewServiceModalOpen, setViewServiceModalOpen] = useState(false);
    const [selectedViewService, setSelectedViewService] = useState(null);
    const [viewBlogModalOpen, setViewBlogModalOpen] = useState(false);
    const [selectedViewBlog, setSelectedViewBlog] = useState(null);
    const [genericViewModalOpen, setGenericViewModalOpen] = useState(false);
    const [selectedGenericRecord, setSelectedGenericRecord] = useState(null);

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
        
        const perm = perms[moduleKey];
        if (!perm) return true; // DEFAULT-ALLOW
        
        // If they want to do an action (reply, edit, delete, category), they need 'manage' permission
        if (action === 'view') return perm.view !== false;
        return perm.manage !== false;
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this record? This action cannot be undone.")) return;

        setDeletingId(id);
        try {
            let res;
            if (type === "job") res = await deleteJobOpening(id);
            else if (type === "subscriber") res = await deleteSubscriber(id);
            else {
                const response = await fetch(`/api/admin/records/${type}/${id}`, { method: "DELETE" });
                res = await response.json();
                if (response.ok) res.success = true;
            }

            if (res && res.success) {
                router.refresh();
                setSelectedIds(prev => prev.filter(i => i !== id));
            } else {
                alert(res?.error || "Failed to delete record");
            }
        } catch (error) {
            console.error("Error deleting record:", error);
            alert("An error occurred while deleting.");
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

    const openServiceViewModal = (service) => {
        setSelectedViewService(service);
        setViewServiceModalOpen(true);
    };

    const openBlogViewModal = (blog) => {
        setSelectedViewBlog(blog);
        setViewBlogModalOpen(true);
    };

    const openGenericViewModal = (record) => {
        setSelectedGenericRecord(record);
        setGenericViewModalOpen(true);
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
                { label: "Phone", key: "phone", render: (r) => r.phone && r.phone !== "—" ? <span className="text-emerald-600 dark:text-emerald-400 font-medium">{r.phone}</span> : <span className="text-slate-400">—</span> },
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
        } else if (type === "portfolio") {
            cols = [
                { label: "Date", key: "date" },
                { label: "Project Title", key: "title", render: (r) => <span className="font-semibold">{r.title}</span> },
                { label: "Category", key: "category", render: (r) => <span className="px-3 py-1 bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300 rounded-full text-xs font-medium">{r.category}</span> },
                { label: "URL", key: "projectUrl", render: (r) => r.projectUrl ? <a href={r.projectUrl} target="_blank" className="text-cyan-600 hover:underline">{r.projectUrl}</a> : <span className="text-slate-400">N/A</span> },
                { label: "Technologies", key: "technologies", render: (r) => (
                    <div className="flex gap-1 flex-wrap max-w-xs">
                        {r.technologies?.slice(0, 3).map((t, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300 rounded text-[10px]">{t}</span>
                        ))}
                        {r.technologies?.length > 3 && <span className="px-2 py-0.5 bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300 rounded text-[10px]">+{r.technologies.length - 3}</span>}
                    </div>
                )},
            ];
        } else if (type === "service") {
            cols = [
                { label: "Date", key: "date" },
                { label: "Title", key: "title", render: (r) => <span className="font-semibold">{r.title}</span> },
                { label: "Slug", key: "slug", render: (r) => <span className="text-cyan-600">{r.slug}</span> },
                { label: "Status", key: "status", render: (r) => (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${r.status ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300'}`}>
                        {r.status ? 'Active' : 'Inactive'}
                    </span>
                )},
                { label: "Features", key: "features", render: (r) => (
                    <div className="flex gap-1 flex-wrap max-w-xs">
                        <span className="text-slate-500 text-xs">{r.features?.length || 0} features</span>
                    </div>
                )},
            ];
        } else if (type === "subscriber") {
            cols = [
                { label: "Date Subscribed", key: "date" },
                { label: "Email Address", key: "email", render: (r) => <span className="font-semibold">{r.email}</span> },
                { label: "Status", key: "status", render: (r) => (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${r.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300'}`}>
                        {r.status}
                    </span>
                )},
            ];
        } else if (type === "job") {
            cols = [
                { label: "Date", key: "date" },
                { label: "Job Title", key: "title", render: (r) => <span className="font-semibold">{r.title}</span> },
                { label: "Department", key: "department", render: (r) => <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 rounded-full text-xs font-medium">{r.department}</span> },
                { label: "Experience", key: "experience" },
                { label: "Status", key: "status", render: (r) => (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${r.status ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300'}`}>
                        {r.status ? 'Active' : 'Inactive'}
                    </span>
                )},
            ];
        } else if (type === "application") {
            cols = [
                { label: "Applied On", key: "createdAt", render: (r) => new Date(r.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }) },
                { label: "Name", key: "name", render: (r) => <span className="font-semibold text-gray-800">{r.name}</span> },
                { label: "Email", key: "email", render: (r) => <span className="text-cyan-600">{r.email}</span> },
                { label: "Phone", key: "phone" },
                { label: "Applied For", key: "applyFor", render: (r) => <span className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 rounded-full text-xs font-medium">{r.applyFor}</span> },
                { label: "Experience", key: "experience" },
                { label: "Resume", key: "resumeUrl", render: (r) => {
                    if (!r.resumeUrl) return <span>N/A</span>;
                    let fullUrl = r.resumeUrl?.startsWith("http") ? r.resumeUrl : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}${r.resumeUrl}`;
                        
                    const handleDownload = async (e) => {
                        e.preventDefault();
                        try {
                            const res = await fetch(fullUrl);
                            const blob = await res.blob();
                            const blobUrl = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = blobUrl;
                            a.download = `${r.name.replace(/\s+/g, '_')}_Resume.pdf`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            window.URL.revokeObjectURL(blobUrl);
                        } catch (err) {
                            window.open(fullUrl, '_blank');
                        }
                    };

                    return (
                        <div className="flex gap-3">
                            <button onClick={handleDownload} className="text-green-600 hover:underline flex items-center gap-1 font-medium bg-green-50 px-3 py-1 rounded-md transition-colors"><Download size={14} /> Download</button>
                        </div>
                    );
                }},
                { label: "Message", key: "message", render: (r) => <div className="max-w-[200px] truncate" title={r.message}>{r.message || "No message"}</div> },
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
                {(type === "project" || type === "contact" || type === "meeting" || type === "application" || type === "subscriber" || type === "review") && (
                    <>
                    {hasAccess("view") && (
                        <button onClick={() => openGenericViewModal(r)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View Details">
                            <Eye className="w-4 h-4" />
                        </button>
                    )}
                    </>
                )}
                {(type === "project" || type === "contact" || type === "meeting" || type === "application") && hasAccess("reply") && (
                    <button onClick={() => openReplyModal(r.email, r.name)} className="p-2 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 rounded-lg transition-colors" title="Reply Email">
                        <Reply className="w-4 h-4" />
                    </button>
                )}
                {type === "blog" && (
                    <>
                    {hasAccess("view") && (
                        <button onClick={() => openBlogViewModal(r)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View Blog">
                            <Eye className="w-4 h-4" />
                        </button>
                    )}
                    {hasAccess("edit") && (
                        <Link href={`/admin/content/blogs/edit/${r._id}`} className="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors" title="Edit Blog">
                            <Edit className="w-4 h-4" />
                        </Link>
                    )}
                    {hasAccess("delete") && <DeleteBlogButton id={r._id} />}
                    </>
                )}
                {type === "portfolio" && (
                    <>
                    {hasAccess("view") && (
                        <button onClick={() => openGenericViewModal(r)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View Portfolio">
                            <Eye className="w-4 h-4" />
                        </button>
                    )}
                    {hasAccess("edit") && (
                        <Link href={`/admin/content/portfolio/edit/${r._id}`} className="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors" title="Edit Portfolio">
                            <Edit className="w-4 h-4" />
                        </Link>
                    )}
                    </>
                )}
                {type === "service" && (
                    <>
                    {hasAccess("view") && (
                        <button onClick={() => openServiceViewModal(r)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View Service">
                            <Eye className="w-4 h-4" />
                        </button>
                    )}
                    {hasAccess("edit") && (
                        <Link href={`/admin/content/services/edit/${r._id}`} className="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors" title="Edit Service">
                            <Edit className="w-4 h-4" />
                        </Link>
                    )}
                    </>
                )}
                {type === "job" && (
                    <>
                    {hasAccess("view") && (
                        <button onClick={() => openGenericViewModal(r)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View Job">
                            <Eye className="w-4 h-4" />
                        </button>
                    )}
                    {hasAccess("edit") && (
                        <Link href={`/admin/content/jobs/edit/${r._id}`} className="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors" title="Edit Job">
                            <Edit className="w-4 h-4" />
                        </Link>
                    )}
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
        if (type === "portfolio") return (item.title?.toLowerCase().includes(searchLower) || item.technologies?.some(t => t.toLowerCase().includes(searchLower)));
        if (type === "service") return (item.title?.toLowerCase().includes(searchLower) || item.slug?.toLowerCase().includes(searchLower));
        if (type === "job") return (item.title?.toLowerCase().includes(searchLower) || item.department?.toLowerCase().includes(searchLower));
        if (type === "subscriber") return (item.email?.toLowerCase().includes(searchLower) || item.status?.toLowerCase().includes(searchLower));
        if (type === "application") return (item.name?.toLowerCase().includes(searchLower) || item.email?.toLowerCase().includes(searchLower) || item.applyFor?.toLowerCase().includes(searchLower));
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

            <ServiceViewModal
                isOpen={viewServiceModalOpen}
                onClose={() => setViewServiceModalOpen(false)}
                service={selectedViewService}
            />

            <BlogViewModal
                isOpen={viewBlogModalOpen}
                onClose={() => setViewBlogModalOpen(false)}
                blog={selectedViewBlog}
            />

            <GenericRecordViewModal
                isOpen={genericViewModalOpen}
                onClose={() => setGenericViewModalOpen(false)}
                record={selectedGenericRecord}
                title="View Record Details"
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
