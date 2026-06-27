"use client";

import { useState, useEffect } from "react";
import { Trash2, Edit2, Plus, X, Loader2, UploadCloud, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        location: "",
        heroImage: "",
        featured: false,
    });

    const fetchEvents = async () => {
        try {
            const res = await fetch("/api/events");
            if (res.ok) {
                const data = await res.json();
                setEvents(data);
            }
        } catch (error) {
            console.error("Failed to fetch events:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
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
                setFormData(prev => ({ ...prev, heroImage: data.secure_url }));
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

    const handleOpenModal = (event = null) => {
        if (event) {
            setEditId(event._id);
            setFormData({
                title: event.title || "",
                date: event.date || "",
                location: event.location || "",
                heroImage: event.heroImage || "",
                featured: !!event.featured,
            });
        } else {
            setEditId(null);
            setFormData({
                title: "",
                date: "",
                location: "",
                heroImage: "",
                featured: false,
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editId ? `/api/events/${editId}` : "/api/events";
            const method = editId ? "PUT" : "POST";
            
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                fetchEvents();
                setIsModalOpen(false);
            } else {
                alert("Failed to save event.");
            }
        } catch (error) {
            console.error("Error saving event:", error);
            alert("An error occurred.");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this event and ALL its gallery photos?")) return;
        
        try {
            const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchEvents();
            } else {
                alert("Failed to delete event.");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50/50 dark:bg-white/[0.02]">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">All Events</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage event details and their photo galleries</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()} 
                    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Add Event
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-white/10 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50">
                            <th className="py-3 px-6 font-medium">Cover</th>
                            <th className="py-3 px-6 font-medium">Event Title</th>
                            <th className="py-3 px-6 font-medium">Subtitle/Date</th>
                            <th className="py-3 px-6 font-medium">Gallery Photos</th>
                            <th className="py-3 px-6 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="py-8 text-center text-sm text-slate-500">Loading events...</td></tr>
                        ) : events.length === 0 ? (
                            <tr><td colSpan="5" className="py-8 text-center text-sm text-slate-500">No events found. Add one to get started.</td></tr>
                        ) : (
                            events.map(event => (
                                <tr key={event._id} className="border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                    <td className="py-4 px-6">
                                        {event.heroImage ? (
                                            <div className="w-16 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={event.heroImage} alt={event.title} className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="w-16 h-10 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                <ImageIcon className="w-4 h-4 text-slate-400" />
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm text-slate-900 dark:text-white font-medium">{event.title}</div>
                                        {event.featured && <span className="inline-block px-2 py-0.5 mt-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 text-[10px] rounded font-semibold uppercase tracking-wider">Featured</span>}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">
                                        {event.date}
                                    </td>
                                    <td className="py-4 px-6">
                                        <Link href={`/admin/content/events/${event.slug}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-xs font-medium rounded-lg transition-colors">
                                            <ImageIcon className="w-3.5 h-3.5" />
                                            Manage Gallery ({event.photoCount || 0})
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2 justify-end">
                                            <button onClick={() => handleOpenModal(event)} className="p-2 text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 rounded-lg transition-colors" title="Edit Event">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(event._id)} className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Delete Event">
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
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{editId ? "Edit Event" : "Add New Event"}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Event Title</label>
                                <input required name="title" value={formData.title} onChange={handleChange} type="text" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 text-sm dark:text-white" placeholder="e.g. Holi Celebration" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date / Subtitle</label>
                                    <input name="date" value={formData.date} onChange={handleChange} type="text" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 text-sm dark:text-white" placeholder="e.g. MARCH 2025" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location (Optional)</label>
                                    <input name="location" value={formData.location} onChange={handleChange} type="text" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 text-sm dark:text-white" placeholder="e.g. Noida Office" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Main Cover Image</label>
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
                                    ) : formData.heroImage ? (
                                        <div className="flex flex-col items-center w-full">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={formData.heroImage} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2 shadow-sm border border-slate-200 dark:border-white/10" />
                                            <span className="text-xs text-slate-500 font-medium bg-slate-100 dark:bg-white/10 px-2 py-1 rounded-full truncate max-w-full">
                                                {formData.heroImage.split('/').pop()}
                                            </span>
                                            <span className="text-xs text-cyan-600 mt-1 font-medium">Click or drag to replace</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 py-4">
                                            <UploadCloud className="w-8 h-8 text-slate-600 dark:text-slate-300 mb-2" />
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Drag & Drop cover photo</p>
                                            <p className="text-xs">or click to browse</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer mt-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 rounded text-cyan-600 border-slate-300 dark:border-slate-600 focus:ring-cyan-500 dark:focus:ring-cyan-600 bg-white dark:bg-slate-700" />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Feature on homepage/top</span>
                            </label>

                            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-xl text-sm font-semibold transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-cyan-600/20">
                                    {editId ? "Update Event" : "Create Event"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
