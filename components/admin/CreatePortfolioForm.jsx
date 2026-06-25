"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPortfolio, updatePortfolio } from "@/app/admin/actions";
import { Loader2, ArrowLeft, Image as ImageIcon, Save, UploadCloud } from "lucide-react";
import Link from "next/link";

export default function CreatePortfolioForm({ initialData = null }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    
    const [formData, setFormData] = useState(initialData ? {
        ...initialData,
        technologies: Array.isArray(initialData.technologies) ? initialData.technologies.join(', ') : initialData.technologies
    } : {
        title: "",
        slug: "",
        category: "Web Development",
        description: "",
        projectUrl: "",
        technologies: "",
        image: "", 
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
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
        
        // Use environment variables for Cloudinary
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
            setError("Please upload a cover image for the project.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = initialData 
                ? await updatePortfolio(initialData._id, formData)
                : await createPortfolio(formData);

            if (res.success) {
                router.push("/admin/content/portfolio");
                router.refresh();
            } else {
                setError(res.error);
            }
        } catch (error) {
            console.error("Portfolio creation error:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/content/portfolio" className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {initialData ? "Edit Project" : "Add New Project"}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {initialData ? "Make changes to your portfolio project" : "Add a new project to your portfolio"}
                        </p>
                    </div>
                </div>
                
                <button 
                    type="submit"
                    disabled={loading}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-cyan-500/25 flex items-center gap-2 disabled:opacity-70"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {initialData ? "Update Project" : "Save Project"}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                        
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Project Title</label>
                            <input 
                                required
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="E.g. E-Commerce Dashboard"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white font-medium text-lg"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Project Description</label>
                            <textarea 
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the project, what you built, and the challenges you solved..."
                                className="w-full px-4 py-3 h-48 resize-none bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Live URL (Optional)</label>
                            <input 
                                type="url"
                                name="projectUrl"
                                value={formData.projectUrl}
                                onChange={handleChange}
                                placeholder="https://example.com"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>

                    </div>
                </div>

                {/* Sidebar Details Area */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                        <h3 className="font-semibold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-white/5">Details</h3>
                        
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                            <select 
                                required
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            >
                                <option value="" disabled>Select a category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile Apps">Mobile Apps</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Custom Software">Custom Software</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Technologies (Comma separated)</label>
                            <input 
                                required
                                type="text"
                                name="technologies"
                                value={formData.technologies}
                                onChange={handleChange}
                                placeholder="React, Node.js, MongoDB"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                        <h3 className="font-semibold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-white/5">Project Image</h3>
                        
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Cover Image</label>
                            
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
                                    <div className="flex flex-col items-center gap-2 text-cyan-600 dark:text-cyan-400">
                                        <Loader2 className="w-8 h-8 animate-spin" />
                                        <span className="text-sm font-medium">Uploading to Cloudinary...</span>
                                    </div>
                                ) : formData.image ? (
                                    <div className="flex flex-col items-center w-full">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={formData.image} alt="Cover Preview" className="w-full h-32 object-cover rounded-lg mb-3 shadow-sm border border-slate-200 dark:border-white/10" />
                                        <span className="text-xs text-slate-500 font-medium bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full truncate max-w-full">
                                            {formData.image.split('/').pop()}
                                        </span>
                                        <span className="text-xs text-cyan-600 mt-2 font-medium">Click or drag to replace</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
                                        <div className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-1">
                                            <UploadCloud className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Drag & Drop image</p>
                                        <p className="text-xs">or click to browse</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
}
