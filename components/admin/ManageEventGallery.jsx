"use client";

import { useState, useEffect } from "react";
import { Trash2, UploadCloud, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ManageEventGallery({ eventSlug }) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        year: new Date().getFullYear().toString(),
        title: "",
        image: "",
        eventSlug: eventSlug,
    });

    const fetchGallery = async () => {
        try {
            const res = await fetch(`/api/events/gallery?eventSlug=${eventSlug}`);
            if (res.ok) {
                const data = await res.json();
                setPhotos(data);
            }
        } catch (error) {
            console.error("Failed to fetch gallery:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventSlug]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) {
            alert("Please upload an image first.");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/events/gallery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                fetchGallery();
                setFormData(prev => ({ ...prev, title: "", image: "" })); // Keep year as is for continuous uploading
            } else {
                alert("Failed to save photo.");
            }
        } catch (error) {
            console.error("Error saving photo:", error);
            alert("An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this photo?")) return;
        
        try {
            const res = await fetch(`/api/events/gallery/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchGallery();
            } else {
                alert("Failed to delete photo.");
            }
        } catch (error) {
            console.error("Error deleting photo:", error);
        }
    };

    // Group photos by year
    const groupedPhotos = photos.reduce((acc, photo) => {
        const year = photo.year || "Unknown";
        if (!acc[year]) acc[year] = [];
        acc[year].push(photo);
        return acc;
    }, {});
    
    // Sort years descending
    const sortedYears = Object.keys(groupedPhotos).sort((a, b) => b - a);

    return (
        <div className="flex flex-col gap-6">
            <Link href="/admin/content/events" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors w-fit">
                <ArrowLeft className="w-4 h-4" /> Back to Events
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upload Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 sticky top-6 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Add New Photo</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Year</label>
                                <input required name="year" value={formData.year} onChange={handleChange} type="number" min="2000" max="2100" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 text-sm dark:text-white" placeholder="e.g. 2024" />
                                <p className="text-xs text-slate-500 mt-1">Photos with the same year are grouped together.</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title / Caption (Optional)</label>
                                <input name="title" value={formData.title} onChange={handleChange} type="text" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 text-sm dark:text-white" placeholder="e.g. Team Group Photo" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Photo</label>
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
                                            <img src={formData.image} alt="Preview" className="w-full h-40 object-cover rounded-lg mb-2 shadow-sm border border-slate-200 dark:border-white/10" />
                                            <span className="text-xs text-cyan-600 mt-1 font-medium">Click or drag to replace</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 py-6">
                                            <UploadCloud className="w-8 h-8 text-slate-600 dark:text-slate-300 mb-2" />
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Drag & Drop photo</p>
                                            <p className="text-xs">or click to browse</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button type="submit" disabled={isSubmitting || !formData.image} className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-cyan-600/20">
                                {isSubmitting ? "Adding..." : "Add Photo"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Gallery View */}
                <div className="lg:col-span-2">
                    {loading ? (
                        <div className="flex items-center justify-center p-12 text-slate-500">
                            <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading gallery...
                        </div>
                    ) : sortedYears.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-12 text-center shadow-sm">
                            <p className="text-slate-500 dark:text-slate-400">No photos added yet. Upload the first photo to create a gallery.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {sortedYears.map(year => (
                                <div key={year} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                                    <div className="px-5 py-3 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <span className="bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 px-2 py-0.5 rounded text-sm font-semibold">{groupedPhotos[year].length}</span>
                                            {year} Gallery
                                        </h4>
                                    </div>
                                    <div className="p-5 grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {groupedPhotos[year].map(photo => (
                                            <div key={photo._id} className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800 aspect-[4/3]">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={photo.image} alt={photo.title || "Gallery photo"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                                    {photo.title && <p className="text-white text-xs font-medium truncate mb-2">{photo.title}</p>}
                                                    <button 
                                                        onClick={() => handleDelete(photo._id)} 
                                                        className="self-end bg-red-500/80 hover:bg-red-500 text-white p-1.5 rounded-lg backdrop-blur-sm transition-colors"
                                                        title="Delete Photo"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
