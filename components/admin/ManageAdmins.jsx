"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { deleteAdmin } from "@/app/admin/actions";

export default function ManageAdmins() {
    const [adminsList, setAdminsList] = useState([]);

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

    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Existing Admins</h2>
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
                                                <button 
                                                    onClick={() => handleDeleteAdmin(admin._id, admin.username)}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                    title="Remove Access"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <span className="text-xs text-slate-400">Master</span>
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
            </div>
        </div>
    );
}
