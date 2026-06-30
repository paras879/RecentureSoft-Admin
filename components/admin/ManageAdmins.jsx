"use client";

import React, { useState, useEffect } from "react";
import { Trash2, UserPlus, Shield, ShieldAlert, KeyRound, ChevronDown, ChevronUp, Save, Loader2, Check, X } from "lucide-react";
import { deleteAdmin, promoteAdmin, createNewAdmin, updateAdminPermissions } from "@/app/admin/actions";
import { motion, AnimatePresence } from "framer-motion";

const CONTENT_MODULES = [
    {
        id: 'blogs',
        label: 'Blogs',
        fields: [
            { id: 'view_all', label: 'View Blogs List' },
            { id: 'create', label: 'Create New Blog' },
            { id: 'edit', label: 'Edit Blog' },
            { id: 'delete', label: 'Delete Blog' },
            { id: 'title', label: 'Title Column' },
            { id: 'category', label: 'Category Column' },
            { id: 'images', label: 'Images & Media' },
            { id: 'content', label: 'Blog Content' },
            { id: 'status', label: 'Status & Visibility' }
        ]
    },
    {
        id: 'services',
        label: 'Services',
        fields: [
            { id: 'view_all', label: 'View Services List' },
            { id: 'create', label: 'Create Service' },
            { id: 'edit', label: 'Edit Service' },
            { id: 'delete', label: 'Delete Service' },
            { id: 'title', label: 'Title Column' },
            { id: 'description', label: 'Descriptions' },
            { id: 'images', label: 'Images & Icons' },
            { id: 'status', label: 'Status' }
        ]
    },
    {
        id: 'portfolio',
        label: 'Portfolio',
        fields: [
            { id: 'view_all', label: 'View Portfolio List' },
            { id: 'create', label: 'Create Project' },
            { id: 'edit', label: 'Edit Project' },
            { id: 'delete', label: 'Delete Project' },
            { id: 'title', label: 'Title Column' },
            { id: 'category', label: 'Category Column' },
            { id: 'images', label: 'Images' }
        ]
    },
    {
        id: 'events',
        label: 'Events & Gallery',
        fields: [
            { id: 'view_all', label: 'View Events List' },
            { id: 'create', label: 'Create Event' },
            { id: 'edit', label: 'Edit Event' },
            { id: 'delete', label: 'Delete Event' },
            { id: 'images', label: 'Manage Gallery' }
        ]
    },
    {
        id: 'jobs',
        label: 'Jobs & Careers',
        fields: [
            { id: 'view_all', label: 'View Jobs List' },
            { id: 'create', label: 'Create Job' },
            { id: 'edit', label: 'Edit Job' },
            { id: 'delete', label: 'Delete Job' },
            { id: 'title', label: 'Job Title' },
            { id: 'department', label: 'Department' }
        ]
    },
    {
        id: 'team',
        label: 'Team Members',
        fields: [
            { id: 'view_all', label: 'View Team List' },
            { id: 'create', label: 'Add Member' },
            { id: 'edit', label: 'Edit Member' },
            { id: 'delete', label: 'Delete Member' }
        ]
    },
    {
        id: 'reviews',
        label: 'Client Reviews',
        fields: [
            { id: 'view_all', label: 'View Reviews List' },
            { id: 'create', label: 'Add Review' },
            { id: 'edit', label: 'Edit Review' },
            { id: 'delete', label: 'Delete Review' }
        ]
    },
    {
        id: 'leads',
        label: 'Leads & Inquiries',
        fields: [
            { id: 'view_all', label: 'View Inquiries' },
            { id: 'delete', label: 'Delete Inquiries' },
            { id: 'client_details', label: 'Client Details' },
            { id: 'budget', label: 'Budget Details' }
        ]
    },
    {
        id: 'meetings',
        label: 'Meetings',
        fields: [
            { id: 'view_all', label: 'View Meetings' },
            { id: 'delete', label: 'Delete Meetings' }
        ]
    },
    {
        id: 'applications',
        label: 'Job Applications',
        fields: [
            { id: 'view_all', label: 'View Applications' },
            { id: 'delete', label: 'Delete Applications' },
            { id: 'resume', label: 'Download Resume' }
        ]
    },
    {
        id: 'contact',
        label: 'Contact Messages',
        fields: [
            { id: 'view_all', label: 'View Messages' },
            { id: 'delete', label: 'Delete Messages' },
            { id: 'reply', label: 'Reply to Message' }
        ]
    },
    {
        id: 'subscribers',
        label: 'Subscribers',
        fields: [
            { id: 'view_all', label: 'View Subscribers' },
            { id: 'delete', label: 'Delete Subscriber' }
        ]
    }
];

export default function ManageAdmins() {
    const [adminsList, setAdminsList] = useState([]);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'admin' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [expandedAdminId, setExpandedAdminId] = useState(null);
    const [editingPermissions, setEditingPermissions] = useState({});
    const [savingPermissions, setSavingPermissions] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedModuleId, setExpandedModuleId] = useState('blogs');

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

    useEffect(() => {
        fetchAdmins();
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
            const res = await createNewAdmin(formData.username, formData.email, formData.password, formData.role);
            if (res.success) {
                setFormData({ username: '', email: '', password: '', role: 'admin' });
                setIsModalOpen(false);
                alert("Admin successfully added!");
                fetchAdmins();
            } else {
                alert(res.error || "Failed to add admin.");
            }
        } catch (error) {
            alert("An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleAccordion = (admin) => {
        if (admin.role === 'super_admin') return;
        
        if (expandedAdminId === admin._id) {
            setExpandedAdminId(null);
        } else {
            setExpandedAdminId(admin._id);
            // Default to empty object if undefined
            setEditingPermissions(admin.permissions || {});
        }
    };

    const handlePermissionChange = (moduleId, type, value) => {
        setEditingPermissions(prev => {
            const updated = { ...prev };
            if (!updated[moduleId]) {
                updated[moduleId] = { read: false, write: false };
            }
            
            updated[moduleId][type] = value;
            
            if (type === 'write' && value === true) {
                updated[moduleId].read = true;
            }
            if (type === 'read' && value === false) {
                updated[moduleId].write = false;
            }
            
            return updated;
        });
    };

    const handleSavePermissions = async (adminId) => {
        setSavingPermissions(true);
        try {
            const res = await updateAdminPermissions(adminId, editingPermissions);
            if (res.success) {
                // Keep it open, just refresh list
                fetchAdmins();
            } else {
                alert(res.error || "Failed to update permissions.");
            }
        } catch(e) {
            alert("An error occurred while saving permissions.");
        } finally {
            setSavingPermissions(false);
        }
    };

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
                            Can manage content like blogs, services, portfolio, and view leads. Cannot access settings or manage other admins.
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
                            onClick={() => setIsModalOpen(true)} 
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
                                                <td colSpan="4" className="p-6">
                                                    <div className="flex flex-col gap-6 bg-white dark:bg-[#0f172a] p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                                                        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5">
                                                            <div>
                                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Content Permissions for {admin.username}</h3>
                                                                <p className="text-sm text-slate-500 mt-1">Check to grant Read/View access or Write/Manage access.</p>
                                                            </div>
                                                            <button 
                                                                onClick={() => handleSavePermissions(admin._id)}
                                                                disabled={savingPermissions}
                                                                className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-70"
                                                            >
                                                                {savingPermissions ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                                                Save Permissions
                                                            </button>
                                                        </div>
                                                        
                                                        <div className="flex flex-col gap-4">
                                                            {CONTENT_MODULES.map(module => (
                                                                <div key={module.id} className="flex flex-col border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-[#0b1120] shadow-sm transition-all duration-200">
                                                                    {/* Header */}
                                                                    <div 
                                                                        onClick={() => setExpandedModuleId(expandedModuleId === module.id ? null : module.id)}
                                                                        className={`px-6 py-4 cursor-pointer flex justify-between items-center select-none transition-colors duration-200 ${expandedModuleId === module.id ? 'bg-cyan-50 dark:bg-cyan-500/10 border-b border-cyan-100 dark:border-cyan-500/20' : 'bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/50'}`}
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            <h4 className={`font-semibold text-base transition-colors ${expandedModuleId === module.id ? 'text-cyan-700 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-300'}`}>{module.label}</h4>
                                                                        </div>
                                                                        <div className={`p-1 rounded-full transition-transform duration-300 ${expandedModuleId === module.id ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 rotate-180' : 'text-slate-400'}`}>
                                                                            <ChevronDown className="w-4 h-4" />
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    {/* Table of fields */}
                                                                    <AnimatePresence>
                                                                    {expandedModuleId === module.id && (
                                                                        <motion.div 
                                                                            initial={{ height: 0, opacity: 0 }}
                                                                            animate={{ height: "auto", opacity: 1 }}
                                                                            exit={{ height: 0, opacity: 0 }}
                                                                            transition={{ duration: 0.2 }}
                                                                            className="overflow-hidden"
                                                                        >
                                                                        <div className="overflow-x-auto">
                                                                        <table className="w-full text-left">
                                                                            <thead>
                                                                                <tr className="border-b border-slate-100 dark:border-white/5 bg-white dark:bg-[#0f172a]/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                                                    <th className="py-3 px-6 w-[40%]">Feature / Column</th>
                                                                                    <th className="py-3 px-6 w-[30%]">Read Access</th>
                                                                                    <th className="py-3 px-6 w-[30%]">Write / Manage Access</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody className="divide-y divide-slate-100 dark:divide-white/5 bg-white dark:bg-transparent">
                                                                                {module.fields.map(field => {
                                                                                    const key = `${module.id}_${field.id}`;
                                                                                    const perms = editingPermissions[key] || { read: false, write: false };
                                                                                    
                                                                                    return (
                                                                                        <tr key={field.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                                                                            <td className="py-3.5 px-6 text-sm text-slate-700 dark:text-slate-300 font-medium">
                                                                                                {field.label}
                                                                                            </td>
                                                                                            <td className="py-3.5 px-6">
                                                                                                <label className="flex items-center gap-2.5 cursor-pointer group w-fit">
                                                                                                    <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all duration-200 ${perms.read ? 'bg-cyan-500 border-cyan-500 shadow-sm shadow-cyan-500/20' : 'bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-600 group-hover:border-cyan-400'}`}>
                                                                                                        {perms.read && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                                                                                    </div>
                                                                                                    <input 
                                                                                                        type="checkbox" 
                                                                                                        className="hidden" 
                                                                                                        checked={perms.read} 
                                                                                                        onChange={(e) => handlePermissionChange(key, 'read', e.target.checked)} 
                                                                                                    />
                                                                                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 select-none group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">Allow View</span>
                                                                                                </label>
                                                                                            </td>
                                                                                            <td className="py-3.5 px-6">
                                                                                                <label className="flex items-center gap-2.5 cursor-pointer group w-fit">
                                                                                                    <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all duration-200 ${perms.write ? 'bg-purple-500 border-purple-500 shadow-sm shadow-purple-500/20' : 'bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-600 group-hover:border-purple-400'}`}>
                                                                                                        {perms.write && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                                                                                    </div>
                                                                                                    <input 
                                                                                                        type="checkbox" 
                                                                                                        className="hidden" 
                                                                                                        checked={perms.write} 
                                                                                                        onChange={(e) => handlePermissionChange(key, 'write', e.target.checked)} 
                                                                                                    />
                                                                                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 select-none group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">Allow Modify</span>
                                                                                                </label>
                                                                                            </td>
                                                                                        </tr>
                                                                                    );
                                                                                })}
                                                                            </tbody>
                                                                        </table>
                                                                        </div>
                                                                        </motion.div>
                                                                    )}
                                                                    </AnimatePresence>
                                                                </div>
                                                            ))}
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
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Admin</h2>
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
                                "Create Admin"
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
