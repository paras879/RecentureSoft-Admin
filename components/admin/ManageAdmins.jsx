"use client";

import React, { useState, useEffect } from "react";
import { Trash2, UserPlus, Shield, ShieldAlert, KeyRound, ChevronDown, ChevronUp, Save, Loader2, Check, X, Edit2 } from "lucide-react";
import { deleteAdmin, promoteAdmin, createNewAdmin, updateAdminPermissions, updateAdminDetails } from "@/app/admin/actions";
import { motion, AnimatePresence } from "framer-motion";

const CONTENT_MODULES = [
    { id: 'pages', label: 'Website Pages' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'events', label: 'Events & Gallery' },
    { id: 'jobs', label: 'Jobs & Careers' },
    { id: 'team', label: 'Team Members' },
    { id: 'reviews', label: 'Client Reviews' },
    { id: 'leads', label: 'Leads & Inquiries' },
    { id: 'meetings', label: 'Meetings' },
    { id: 'applications', label: 'Job Applications' },
    { id: 'contact', label: 'Contact Messages' },
    { id: 'subscribers', label: 'Subscribers' },
    { id: 'chats', label: 'AI Chat History' },
    { id: 'create_page', label: 'Create a Page' }
];

export default function ManageAdmins() {
    const [adminsList, setAdminsList] = useState([]);
    const [websitePages, setWebsitePages] = useState([]);
    const [expandedModules, setExpandedModules] = useState({});
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'admin' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [expandedAdminId, setExpandedAdminId] = useState(null);
    const [editingPermissions, setEditingPermissions] = useState({});
    const [savingPermissions, setSavingPermissions] = useState(false);
    const [saveSuccessId, setSaveSuccessId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editAdminId, setEditAdminId] = useState(null);

    const fetchAdmins = async () => {
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (data.success) {
                setAdminsList(data.admins);
            }
        } catch(e) {
            console.error(e);
        }
    };

    const fetchWebsitePages = async () => {
        try {
            const res = await fetch('/api/admin/website-pages');
            const data = await res.json();
            if (data.success) {
                setWebsitePages(data.pages);
            }
        } catch(e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchAdmins();
        fetchWebsitePages();
    }, []);

    const handleDeleteAdmin = async (id, username) => {
        if (!confirm(`Are you sure you want to remove access for '${username}'?`)) return;
        const res = await deleteAdmin(id);
        if (res.success) {
            fetchAdmins();
        } else {
            alert(res.error || "Failed to delete admin");
        }
    };

    const handlePromoteAdmin = async (id, username) => {
        if (!confirm(`Are you sure you want to promote '${username}' to Super Admin? They will have full control over the system.`)) return;
        const res = await promoteAdmin(id);
        if (res.success) {
            fetchAdmins();
        } else {
            alert(res.error || "Failed to promote admin");
        }
    };

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            let res;
            if (editAdminId) {
                res = await updateAdminDetails(editAdminId, formData.username, formData.email, formData.role);
            } else {
                res = await createNewAdmin(formData.username, formData.email, formData.password, formData.role);
            }
            
            if (res.success) {
                setFormData({ username: '', email: '', password: '', role: 'admin' });
                setIsModalOpen(false);
                setEditAdminId(null);
                alert(editAdminId ? "Admin successfully updated!" : "Admin successfully added!");
                fetchAdmins();
            } else {
                alert(res.error || (editAdminId ? "Failed to update admin." : "Failed to add admin."));
            }
        } catch (error) {
            alert("An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenModal = (admin = null) => {
        if (admin) {
            setEditAdminId(admin._id);
            setFormData({ username: admin.username, email: admin.email, password: '', role: admin.role });
        } else {
            setEditAdminId(null);
            setFormData({ username: '', email: '', password: '', role: 'admin' });
        }
        setIsModalOpen(true);
    };

    const toggleAccordion = (admin) => {
        if (admin.role === 'super_admin') return;
        
        if (expandedAdminId === admin._id) {
            setExpandedAdminId(null);
        } else {
            setExpandedAdminId(admin._id);
            setEditingPermissions(admin.permissions || {});
        }
    };

    const handlePermissionChange = (moduleId, type, value) => {
        setEditingPermissions(prev => {
            const updated = { ...prev };
            if (!updated[moduleId]) {
                // Since system is Default-Allow, untracked modules are assumed true
                updated[moduleId] = { view: true, manage: true };
            }
            
            updated[moduleId][type] = value;
            
            if (type === 'manage' && value === true) {
                updated[moduleId].view = true; // Auto-grant view if manage is true
            }
            if (type === 'view' && value === false) {
                updated[moduleId].manage = false; // Auto-revoke manage if view is false
            }
            
            return updated;
        });
    };

    const handleSavePermissions = async (adminId) => {
        setSavingPermissions(true);
        try {
            const res = await updateAdminPermissions(adminId, editingPermissions);
            if (res.success) {
                fetchAdmins();
                setSaveSuccessId(adminId);
                setTimeout(() => setSaveSuccessId(null), 2500);
            } else {
                alert(res.error || "Failed to update permissions.");
            }
        } catch(e) {
            alert("An error occurred while saving permissions.");
        } finally {
            setSavingPermissions(false);
        }
    };

    const pageCategories = {};
    const uncategorizedPages = [];
    const locationPages = [];

    websitePages.forEach(p => {
        if (p.templateType === 'location-template') {
            locationPages.push(p);
        } else if (p.category === "Solutions" && p.subcategory) {
            if (!pageCategories[p.subcategory]) pageCategories[p.subcategory] = [];
            pageCategories[p.subcategory].push(p);
        } else {
            uncategorizedPages.push(p);
        }
    });

    const dynamicCategoryModules = Object.keys(pageCategories).map(catName => ({
        id: `cat_${catName.toLowerCase().replace(/\s+/g, '_')}`,
        label: catName,
        isCategory: true,
        pages: pageCategories[catName]
    }));
    
    const locationModule = locationPages.length > 0 ? [{
        id: 'cat_location_pages',
        label: 'Location Pages',
        isCategory: true,
        pages: locationPages
    }] : [];

    const allModules = [
        ...CONTENT_MODULES.filter(m => m.id !== 'pages'),
        { id: 'pages', label: 'Other Pages', isCategory: true, pages: uncategorizedPages },
        ...dynamicCategoryModules,
        ...locationModule
    ];

    return (
        <div className="flex flex-col gap-8 w-full">
            
            {/* Roles Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-2xl p-5 flex gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl h-fit">
                        <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-purple-900 dark:text-purple-300">Super Admin</h3>
                        <p className="text-sm text-purple-700/80 dark:text-purple-400/80 mt-1">
                            Has full master access. Can manage settings, create/delete other admins, and promote normal admins.
                        </p>
                    </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex gap-4">
                    <div className="p-3 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl h-fit">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">Normal Admin</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Can only access modules explicitly granted by the Super Admin. If access is not granted, the module remains completely locked.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8 w-full">
                
                {/* Existing Admins Table */}
                <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Existing Admins</h2>
                        <button 
                            onClick={() => handleOpenModal()} 
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <UserPlus className="w-4 h-4" /> Add New Admin
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-white/10 text-sm text-slate-500 dark:text-slate-400">
                                    <th className="pb-3 font-medium">Username</th>
                                    <th className="pb-3 font-medium">Email</th>
                                    <th className="pb-3 font-medium">Role</th>
                                    <th className="pb-3 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminsList.map(admin => (
                                    <React.Fragment key={admin._id}>
                                        <tr 
                                            onClick={() => toggleAccordion(admin)}
                                            className={`border-b border-slate-100 dark:border-white/5 last:border-0 group ${admin.role !== 'super_admin' ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5' : ''} ${expandedAdminId === admin._id ? 'bg-cyan-50/50 dark:bg-cyan-900/10' : ''}`}
                                        >
                                            <td className="py-4 px-2 text-sm text-slate-900 dark:text-white font-medium flex items-center gap-2">
                                                {admin.role !== 'super_admin' && (
                                                    expandedAdminId === admin._id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />
                                                )}
                                                {admin.username}
                                            </td>
                                            <td className="py-4 px-2 text-sm text-slate-600 dark:text-slate-300">{admin.email}</td>
                                            <td className="py-4 px-2">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${admin.role === 'super_admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300'}`}>
                                                    {admin.role === 'super_admin' ? 'Super Admin' : 'Normal Admin'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                {admin.username !== 'superadmin' ? (
                                                    <div className="flex items-center justify-end gap-2 transition-opacity" onClick={(e) => e.stopPropagation()}>
                                                        {admin.role !== 'super_admin' && (
                                                            <button 
                                                                onClick={() => handlePromoteAdmin(admin._id, admin.username)}
                                                                className="px-2 py-1.5 text-xs font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-md transition-colors border border-purple-100 dark:border-purple-500/20"
                                                                title="Promote to Super Admin"
                                                            >
                                                                Make Super Admin
                                                            </button>
                                                        )}
                                                        <button 
                                                            onClick={() => handleOpenModal(admin)}
                                                            className="p-1.5 text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 rounded-md transition-colors border border-slate-100 dark:border-white/5"
                                                            title="Edit Details"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteAdmin(admin._id, admin.username)}
                                                            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors border border-red-100 dark:border-red-500/20"
                                                            title="Remove Access"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md">Master</span>
                                                )}
                                            </td>
                                        </tr>
                                        {/* ACCORDION ROW */}
                                        {expandedAdminId === admin._id && admin.role !== 'super_admin' && (
                                            <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-white/10">
                                                <td colSpan="4" className="p-0 sm:p-6">
                                                    <div className="flex flex-col gap-6 bg-white dark:bg-[#0f172a] sm:rounded-xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
                                                        <div className="flex justify-between items-center p-6 pb-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                                                            <div>
                                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Strict Permissions for {admin.username}</h3>
                                                                <p className="text-sm text-slate-500 mt-1">If "Allow Modify" is unticked, the system explicitly blocks all edit/delete actions, even if bypassed.</p>
                                                            </div>
                                                            <button 
                                                                onClick={() => handleSavePermissions(admin._id)}
                                                                disabled={savingPermissions || saveSuccessId === admin._id}
                                                                className={`${saveSuccessId === admin._id ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-cyan-600 hover:bg-cyan-700'} text-white px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-90`}
                                                            >
                                                                {savingPermissions ? (
                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                ) : saveSuccessId === admin._id ? (
                                                                    <Check className="w-4 h-4 animate-in zoom-in" />
                                                                ) : (
                                                                    <Save className="w-4 h-4" />
                                                                )}
                                                                {saveSuccessId === admin._id ? 'Saved Successfully!' : 'Save Permissions'}
                                                            </button>
                                                        </div>
                                                        
                                                        <div className="overflow-x-auto">
                                                            <table className="w-full text-left">
                                                                <thead>
                                                                    <tr className="bg-white dark:bg-[#0f172a]/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-white/10">
                                                                        <th className="py-4 px-8 w-[40%]">Module Name</th>
                                                                        <th className="py-4 px-8 w-[30%]">Allow View (Read-Only)</th>
                                                                        <th className="py-4 px-8 w-[30%]">Allow Modify (Add/Edit/Delete)</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                                                    {allModules.map(module => {
                                                                        const permObj = editingPermissions[module.id] || {};
                                                                        const perms = { 
                                                                            view: permObj.view !== false, 
                                                                            manage: permObj.manage !== false 
                                                                        };
                                                                        
                                                                        const isCategoryModule = module.isCategory;
                                                                        const isExpanded = expandedModules[`${admin._id}_${module.id}`];

                                                                        const toggleModule = () => {
                                                                            setExpandedModules(prev => ({ ...prev, [`${admin._id}_${module.id}`]: !prev[`${admin._id}_${module.id}`] }));
                                                                        };

                                                                        return (
                                                                            <React.Fragment key={module.id}>
                                                                                <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                                                                    <td className="py-4 px-8 text-sm text-slate-700 dark:text-slate-300 font-medium">
                                                                                        <div className="flex items-center gap-2">
                                                                                            {isCategoryModule && module.pages && module.pages.length > 0 && (
                                                                                                <button onClick={toggleModule} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors text-slate-500">
                                                                                                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                                                                </button>
                                                                                            )}
                                                                                            {module.label}
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="py-4 px-8">
                                                                                        <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                                                                            <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all duration-200 ${perms.view ? 'bg-cyan-500 border-cyan-500 shadow-sm shadow-cyan-500/20' : 'bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-600 group-hover:border-cyan-400'}`}>
                                                                                                {perms.view && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                                                                            </div>
                                                                                            <input 
                                                                                                type="checkbox" 
                                                                                                className="hidden" 
                                                                                                checked={perms.view} 
                                                                                                onChange={(e) => {
                                                                                                    handlePermissionChange(module.id, 'view', e.target.checked);
                                                                                                    if (isCategoryModule && module.pages) {
                                                                                                        module.pages.forEach(p => handlePermissionChange(`page_${p._id}`, 'view', e.target.checked));
                                                                                                    }
                                                                                                }} 
                                                                                            />
                                                                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 select-none group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">Can View</span>
                                                                                        </label>
                                                                                    </td>
                                                                                    <td className="py-4 px-8">
                                                                                        <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                                                                            <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all duration-200 ${perms.manage ? 'bg-purple-500 border-purple-500 shadow-sm shadow-purple-500/20' : 'bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-600 group-hover:border-purple-400'}`}>
                                                                                                {perms.manage && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                                                                            </div>
                                                                                            <input 
                                                                                                type="checkbox" 
                                                                                                className="hidden" 
                                                                                                checked={perms.manage} 
                                                                                                onChange={(e) => {
                                                                                                    handlePermissionChange(module.id, 'manage', e.target.checked);
                                                                                                    if (isCategoryModule && module.pages) {
                                                                                                        module.pages.forEach(p => handlePermissionChange(`page_${p._id}`, 'manage', e.target.checked));
                                                                                                    }
                                                                                                }} 
                                                                                            />
                                                                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 select-none group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">Can Edit & Delete</span>
                                                                                        </label>
                                                                                    </td>
                                                                                </tr>
                                                                                {isCategoryModule && isExpanded && module.pages && module.pages.map(page => {
                                                                                    const subId = `page_${page._id}`;
                                                                                    const subPermObj = editingPermissions[subId] || {};
                                                                                    const subPerms = {
                                                                                        view: subPermObj.view !== false,
                                                                                        manage: subPermObj.manage !== false
                                                                                    };
                                                                                    return (
                                                                                        <tr key={subId} className="bg-slate-50/50 dark:bg-[#0f172a]/80 border-t border-slate-100 dark:border-white/5 transition-colors">
                                                                                            <td className="py-3 px-8 pl-14 text-sm text-slate-600 dark:text-slate-400 font-medium border-l-[3px] border-cyan-500/30">
                                                                                                ↳ {page.name}
                                                                                            </td>
                                                                                            <td className="py-3 px-8">
                                                                                                <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                                                                                    <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all duration-200 ${subPerms.view ? 'bg-cyan-500 border-cyan-500 shadow-sm shadow-cyan-500/20' : 'bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-600 group-hover:border-cyan-400'}`}>
                                                                                                        {subPerms.view && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                                                                                    </div>
                                                                                                    <input type="checkbox" className="hidden" checked={subPerms.view} onChange={(e) => handlePermissionChange(subId, 'view', e.target.checked)} />
                                                                                                </label>
                                                                                            </td>
                                                                                            <td className="py-3 px-8">
                                                                                                <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                                                                                    <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all duration-200 ${subPerms.manage ? 'bg-purple-500 border-purple-500 shadow-sm shadow-purple-500/20' : 'bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-600 group-hover:border-purple-400'}`}>
                                                                                                        {subPerms.manage && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                                                                                    </div>
                                                                                                    <input type="checkbox" className="hidden" checked={subPerms.manage} onChange={(e) => handlePermissionChange(subId, 'manage', e.target.checked)} />
                                                                                                </label>
                                                                                            </td>
                                                                                        </tr>
                                                                                    );
                                                                                })}
                                                                            </React.Fragment>
                                                                        );
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                                {adminsList.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="py-8 text-center text-sm text-slate-500">No admins found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add New Admin Form Modal */}
                <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-6 w-full max-w-md relative"
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-3 pr-8">
                                <div className="p-2.5 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-500 rounded-xl">
                                    <UserPlus className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{editAdminId ? "Edit Admin" : "Add New Admin"}</h2>
                            </div>

                            <form onSubmit={handleAddAdmin} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
                            <input 
                                type="text"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-cyan-500 text-sm dark:text-white"
                                placeholder="e.g. johndoe"
                            />
                        </div>
                        
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                            <input 
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-cyan-500 text-sm dark:text-white"
                                placeholder="john@company.com"
                            />
                        </div>

                        {!editAdminId && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                                <input 
                                    type="password"
                                    required
                                    minLength={6}
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-cyan-500 text-sm dark:text-white"
                                    placeholder="••••••••"
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Role</label>
                            <select 
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-cyan-500 text-sm dark:text-white cursor-pointer"
                            >
                                <option value="admin">Normal Admin</option>
                                <option value="super_admin">Super Admin</option>
                            </select>
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                editAdminId ? "Update Admin" : "Create Admin"
                            )}
                        </button>
                    </form>
                        </motion.div>
                    </motion.div>
                )}
                </AnimatePresence>

            </div>
        </div>
    );
}
