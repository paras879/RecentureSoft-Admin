"use client";

import { useState, useEffect } from "react";
import { Trash2, Edit2, Plus, X, Loader2, UploadCloud, User as UserIcon } from "lucide-react";

export default function ManageTeam() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        quote: "",
        image: "",
    });

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        try {
            const res = await fetch("/api/team");
            if (res.ok) {
                const data = await res.json();
                setTeam(data);
            }
        } catch (error) {
            console.error("Failed to fetch team:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file (JPEG, PNG, WEBP).');
            return;
        }
        
        setUploadingImage(true);
        const uploadData = new FormData();
        uploadData.append('file', file);
        
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'Dynamic folders';
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgsebwvvs';
        
        uploadData.append('upload_preset', uploadPreset);
        uploadData.append('cloud_name', cloudName);
        
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: uploadData
            });
            const data = await res.json();
            
            if (data.secure_url) {
                setFormData(prev => ({ ...prev, image: data.secure_url }));
            } else {
                alert('Upload failed: ' + (data.error?.message || "Unknown error"));
            }
        } catch (err) {
            console.error(err);
            alert('Failed to upload image. Please try again.');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleImageUpload(e.dataTransfer.files[0]);
        }
    };

    const handleOpenModal = (member = null) => {
        if (member) {
            setEditId(member._id);
            setFormData({
                name: member.name || "",
                role: member.role || "",
                quote: member.quote || "",
                image: member.image || "",
            });
        } else {
            setEditId(null);
            setFormData({
                name: "",
                role: "",
                quote: "",
                image: "",
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) {
            alert("Please upload a profile photo.");
            return;
        }

        try {
            const url = editId ? `/api/team/${editId}` : "/api/team";
            const method = editId ? "PUT" : "POST";
            
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                fetchTeam();
                setIsModalOpen(false);
            } else {
                alert("Failed to save team member.");
            }
        } catch (error) {
            console.error("Error saving team member:", error);
            alert("An error occurred.");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to remove this team member?")) return;
        
        try {
            const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchTeam();
            } else {
                alert("Failed to delete.");
            }
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50/50 dark:bg-white/[0.02]">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Our Team</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage employee testimonials and quotes</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()} 
                    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Add Member
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-white/10 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50">
                            <th className="py-3 px-6 font-medium">Photo</th>
                            <th className="py-3 px-6 font-medium">Name & Role</th>
                            <th className="py-3 px-6 font-medium">Quote</th>
                            <th className="py-3 px-6 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" className="py-8 text-center text-sm text-slate-500">Loading team members...</td></tr>
                        ) : team.length === 0 ? (
                            <tr><td colSpan="4" className="py-8 text-center text-sm text-slate-500">No team members found. Add one to get started.</td></tr>
                        ) : (
                            team.map(member => (
                                <tr key={member._id} className="border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                    <td className="py-4 px-6">
                                        {member.image ? (
                                            <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800 shrink-0">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                                <UserIcon className="w-5 h-5 text-slate-400" />
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm text-slate-900 dark:text-white font-bold">{member.name}</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{member.role}</div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300 max-w-sm">
                                        <div className="line-clamp-2 italic">&quot;{member.quote}&quot;</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2 justify-end">
                                            <button onClick={() => handleOpenModal(member)} className="p-2 text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 rounded-lg transition-colors" title="Edit Member">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(member._id)} className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Delete Member">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 my-8">
                        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-white/10">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{editId ? "Edit Team Member" : "Add Team Member"}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-5 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                                    <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 text-sm dark:text-white" placeholder="e.g. Sarah Jenkins" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role / Position</label>
                                    <input required name="role" value={formData.role} onChange={handleChange} type="text" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 text-sm dark:text-white" placeholder="e.g. Senior Architect" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Quote / Review</label>
                                <textarea required name="quote" value={formData.quote} onChange={handleChange} rows="4" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 text-sm dark:text-white resize-none" placeholder="e.g. Joining RecentureSoft was the best career move..." />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Profile Photo</label>
                                <div 
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-colors cursor-pointer overflow-hidden ${isDragging ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-500/10' : 'border-slate-300 dark:border-white/20 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                >
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                handleImageUpload(e.target.files[0]);
                                            }
                                        }}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />

                                    {uploadingImage ? (
                                        <div className="flex flex-col items-center gap-2 text-cyan-600 dark:text-cyan-400 py-4">
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            <span className="text-sm font-medium">Uploading...</span>
                                        </div>
                                    ) : formData.image ? (
                                        <div className="flex flex-col items-center w-full">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded-full mb-3 shadow-sm border-2 border-white dark:border-slate-800" />
                                            <span className="text-xs text-cyan-600 mt-1 font-medium">Click or drag to replace</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 py-4">
                                            <UploadCloud className="w-8 h-8 text-slate-600 dark:text-slate-300 mb-2" />
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Drag & Drop photo</p>
                                            <p className="text-xs">or click to browse</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-xl text-sm font-semibold transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-cyan-600/20">
                                    {editId ? "Update Member" : "Add Member"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
