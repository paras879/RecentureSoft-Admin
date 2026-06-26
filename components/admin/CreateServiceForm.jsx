"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createService, updateService } from "@/app/admin/actions";
import { Loader2, ArrowLeft, Save, UploadCloud, Plus, X, GripVertical } from "lucide-react";
import Link from "next/link";

export default function CreateServiceForm({ initialData = null }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [uploadingIndex, setUploadingIndex] = useState(null); // tracks which slot is uploading
    
    const [formData, setFormData] = useState(initialData ? {
        ...initialData,
        features: Array.isArray(initialData.features) ? initialData.features.join(', ') : initialData.features,
        images: Array.isArray(initialData.images) && initialData.images.filter(Boolean).length > 0
            ? initialData.images.filter(Boolean)
            : [],
    } : {
        title: "",
        slug: "",
        shortDescription: "",
        description: "",
        features: "",
        images: [],
        icon: "",
        category: "Enterprise Engineering",
        colSpan: "lg:col-span-6",
        color: "cyan",
        accent: "from-cyan-500/20 to-blue-500/20",
        scene: "SoftwareDevGraphic",
        status: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleImageUpload = async (file, index) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file (JPEG, PNG, WEBP).');
            return;
        }
        
        setUploadingIndex(index);
        
        try {
            const uploadData = new FormData();
            uploadData.append('file', file);
            
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadData
            });
            const data = await res.json();
            
            if (data.secure_url) {
                setFormData(prev => {
                    const newImages = [...(prev.images || [])];
                    newImages[index] = data.secure_url;
                    return { ...prev, images: newImages };
                });
            } else {
                alert('Upload failed: ' + (data.error || 'Please try again'));
            }
        } catch (err) {
            console.error(err);
            alert('Failed to upload image. Please try again.');
        } finally {
            setUploadingIndex(null);
        }
    };

    // Add a new empty image slot
    const addImageSlot = () => {
        setFormData(prev => ({ ...prev, images: [...(prev.images || []), ""] }));
    };

    // Remove an image slot by index
    const removeImageSlot = (index) => {
        setFormData(prev => {
            const newImages = [...(prev.images || [])].filter((_, i) => i !== index);
            return { ...prev, images: newImages };
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleImageUpload(e.dataTransfer.files[0], index);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        setError("");

        try {
            const res = initialData 
                ? await updateService(initialData._id, formData)
                : await createService(formData);

            if (res.success) {
                router.push("/admin/content/services");
                router.refresh();
            } else {
                setError(res.error);
            }
        } catch (error) {
            console.error("Service creation error:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/content/services" className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {initialData ? "Edit Service" : "Add New Service"}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {initialData ? "Make changes to your service" : "Add a new service"}
                        </p>
                    </div>
                </div>
                
                <button 
                    type="submit"
                    disabled={loading}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-cyan-500/25 flex items-center gap-2 disabled:opacity-70"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {initialData ? "Update Service" : "Save Service"}
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
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Service Title</label>
                            <input 
                                required
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="E.g. Web Development"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white font-medium text-lg"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Custom Slug (Optional)</label>
                            <input 
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="E.g. web-development (auto-generated if empty)"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Short Description</label>
                            <textarea 
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                                placeholder="Brief summary for listings..."
                                className="w-full px-4 py-3 h-24 resize-none bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Description</label>
                            <textarea 
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Detailed description of the service..."
                                className="w-full px-4 py-3 h-48 resize-none bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Features (Comma separated)</label>
                            <input 
                                type="text"
                                name="features"
                                value={formData.features}
                                onChange={handleChange}
                                placeholder="Responsive Design, SEO Optimized, Fast Performance"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>

                        <div className="space-y-1.5 pt-4 border-t border-slate-100 dark:border-white/5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                            <input 
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="E.g. Enterprise Engineering"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>

                        <div className="space-y-1.5 pt-4 border-t border-slate-100 dark:border-white/5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">ColSpan (Bento Grid)</label>
                            <select 
                                name="colSpan"
                                value={formData.colSpan}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            >
                                <option value="lg:col-span-5">Small (5 Cols)</option>
                                <option value="lg:col-span-6">Medium (6 Cols)</option>
                                <option value="lg:col-span-7">Large (7 Cols)</option>
                                <option value="lg:col-span-12">Full Width (12 Cols)</option>
                            </select>
                        </div>

                        <div className="space-y-1.5 pt-4 border-t border-slate-100 dark:border-white/5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Theme Color</label>
                            <select 
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            >
                                <option value="cyan">Cyan</option>
                                <option value="blue">Blue</option>
                                <option value="purple">Purple</option>
                                <option value="teal">Teal</option>
                            </select>
                        </div>

                        <div className="space-y-1.5 pt-4 border-t border-slate-100 dark:border-white/5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Gradient Accent</label>
                            <input 
                                type="text"
                                name="accent"
                                value={formData.accent}
                                onChange={handleChange}
                                placeholder="E.g. from-cyan-500/20 to-blue-500/20"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>

                        <div className="space-y-1.5 pt-4 border-t border-slate-100 dark:border-white/5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">3D Scene Graphic</label>
                            <select 
                                name="scene"
                                value={formData.scene}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            >
                                <option value="SoftwareDevGraphic">Software & Dashboards</option>
                                <option value="WebDevGraphic">Web Platforms</option>
                                <option value="MobileAppGraphic">Mobile Apps</option>
                                <option value="DigitalMarketingGraphic">Digital Marketing</option>
                            </select>
                        </div>

                    </div>
                </div>

                {/* Sidebar Details Area */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                        <h3 className="font-semibold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-white/5">Settings</h3>
                        
                        <div className="flex items-center gap-3">
                            <input 
                                type="checkbox"
                                id="status"
                                name="status"
                                checked={formData.status}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                            />
                            <label htmlFor="status" className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                                Active (Show on website)
                            </label>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                        <h3 className="font-semibold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-white/5">Media</h3>
                        
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Slideshow Images
                                    <span className="ml-2 text-xs text-slate-400 font-normal">
                                        ({(formData.images || []).filter(Boolean).length} uploaded)
                                    </span>
                                </label>
                                <button
                                    type="button"
                                    onClick={addImageSlot}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 rounded-lg text-xs font-medium hover:bg-cyan-100 dark:hover:bg-cyan-500/20 transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Image
                                </button>
                            </div>

                            {(formData.images || []).length === 0 && (
                                <div
                                    onClick={addImageSlot}
                                    className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center">
                                        <Plus className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                    </div>
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Click to add your first image</p>
                                </div>
                            )}

                            <div className="flex flex-col gap-3">
                                {(formData.images || []).map((imgUrl, index) => (
                                    <div key={index} className="flex flex-col gap-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                                <GripVertical className="w-3 h-3" />
                                                Slide {index + 1}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeImageSlot(index)}
                                                className="flex items-center gap-1 px-2 py-0.5 text-[11px] text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors"
                                            >
                                                <X className="w-3 h-3" /> Remove
                                            </button>
                                        </div>

                                        <div
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, index)}
                                            className="relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-colors cursor-pointer overflow-hidden border-slate-200 dark:border-white/15 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-white/5"
                                        >
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files.length > 0) {
                                                        handleImageUpload(e.target.files[0], index);
                                                    }
                                                }}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />

                                            {uploadingIndex === index ? (
                                                <div className="flex flex-col items-center gap-2 text-cyan-600 dark:text-cyan-400 py-5">
                                                    <Loader2 className="w-6 h-6 animate-spin" />
                                                    <span className="text-xs font-medium">Uploading...</span>
                                                </div>
                                            ) : imgUrl ? (
                                                <div className="flex flex-col items-center w-full">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={imgUrl} alt={`Slide ${index + 1}`} className="w-full h-28 object-cover" />
                                                    <div className="w-full px-3 py-1.5 bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center gap-1.5">
                                                        <UploadCloud className="w-3 h-3 text-cyan-500" />
                                                        <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">✓ Uploaded — click to replace</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-1.5 text-slate-400 dark:text-slate-500 py-5">
                                                    <UploadCloud className="w-6 h-6" />
                                                    <p className="text-xs font-medium">Click or drag image here</p>
                                                    <p className="text-[10px]">PNG, JPG, WEBP</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {(formData.images || []).length > 0 && (
                                <button
                                    type="button"
                                    onClick={addImageSlot}
                                    className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-slate-300 dark:border-white/15 rounded-xl text-xs text-slate-500 dark:text-slate-400 hover:border-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5" /> Add another image
                                </button>
                            )}
                        </div>

                        <div className="space-y-1.5 pt-4 border-t border-slate-100 dark:border-white/5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Icon URL/Class (Optional)</label>
                            <input 
                                type="text"
                                name="icon"
                                value={formData.icon}
                                onChange={handleChange}
                                placeholder="e.g. lucide-web or image url"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
}
