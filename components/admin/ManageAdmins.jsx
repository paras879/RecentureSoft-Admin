"use client";

import { useState, useEffect } from "react";
import { Trash2, UserPlus, Shield, ShieldAlert, KeyRound } from "lucide-react";
import { deleteAdmin, promoteAdmin, createNewAdmin } from "@/app/admin/actions";

export default function ManageAdmins() {
    const [adminsList, setAdminsList] = useState([]);
    
    // Add admin form state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'admin'
    });

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Existing Admins Table */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Existing Admins</h2>
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
                                    <tr key={admin._id} className="border-b border-slate-100 dark:border-white/5 last:border-0 group">
                                        <td className="py-4 text-sm text-slate-900 dark:text-white font-medium">{admin.username}</td>
                                        <td className="py-4 text-sm text-slate-600 dark:text-slate-300">{admin.email}</td>
                                        <td className="py-4">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${admin.role === 'super_admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300'}`}>
                                                {admin.role === 'super_admin' ? 'Super Admin' : 'Normal Admin'}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            {admin.username !== 'superadmin' ? (
                                                <div className="flex items-center justify-end gap-2 transition-opacity">
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

                {/* Add New Admin Form */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col gap-6 h-fit">
                    <div className="flex items-center gap-3">
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
                </div>

            </div>
        </div>
    );
}
