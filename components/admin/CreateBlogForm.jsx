"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog, updateBlog } from "@/app/admin/actions";
import { Loader2, ArrowLeft, Image as ImageIcon, Save, UploadCloud } from "lucide-react";
import Link from "next/link";

export default function CreateBlogForm({ initialData = null }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    
    const [formData, setFormData] = useState(initialData ? {
        ...initialData,
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags
    } : {
        title: "",
        slug: "",
        excerpt: "",
        category: "",
        tags: "",
        author: "Paras Tomar",
        image: "/images/blogs/default.jpg", // default placeholder
        content: "",
        featured: false,
        published: true,
        readingTime: "5 min read",
        seoTitle: "",
        seoDescription: ""
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
        uploadData.append('upload_preset', 'recenturesoft_upload');
        uploadData.append('cloud_name', 'dgsebwvvs');
        
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dgsebwvvs/image/upload', {
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
        setLoading(true);
        setError("");

        try {
            const res = initialData 
                ? await updateBlog(initialData._id, formData)
                : await createBlog(formData);

            if (res.success) {
                router.push("/admin/blogs");
                router.refresh();
            } else {
                setError(res.error);
            }
        } catch (error) {
            console.error("Blog creation error:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs" className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {initialData ? "Edit Blog" : "Create New Blog"}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {initialData ? "Make changes to your existing article" : "Write and publish a new article"}
                        </p>
                    </div>
                </div>
                
                <button 
                    type="submit"
                    disabled={loading}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-cyan-500/25 flex items-center gap-2 disabled:opacity-70"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {initialData ? "Update Blog" : "Publish Blog"}
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
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Blog Title</label>
                            <input 
                                required
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter an engaging title..."
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white font-medium text-lg"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Content (Markdown Supported)</label>
                            <div className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500">
                                <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 border-b border-slate-200 dark:border-white/10 text-xs text-slate-500 font-mono">
                                    Use # for headings, **bold**, *italic*, [link](url)
                                </div>
                                <textarea 
                                    required
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    placeholder="Write your article here..."
                                    className="w-full h-[500px] p-4 bg-white dark:bg-slate-900/50 outline-none text-slate-900 dark:text-white font-mono text-sm resize-y"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Excerpt / Short Summary</label>
                            <textarea 
                                required
                                name="excerpt"
                                maxLength={300}
                                value={formData.excerpt}
                                onChange={handleChange}
                                placeholder="A brief 1-2 sentence summary of the article..."
                                className="w-full px-4 py-3 h-24 resize-none bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>

                    </div>
                </div>

                {/* Sidebar Details Area */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                        <h3 className="font-semibold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-white/5">Settings</h3>
                        
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
                                <option value="AI & Machine Learning">AI & Machine Learning</option>
                                <option value="Cloud Computing">Cloud Computing</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                                <option value="Business Strategy">Business Strategy</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tags (Comma separated)</label>
                            <input 
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="React, Next.js, API"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Author Name</label>
                            <input 
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                        <h3 className="font-semibold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-white/5">Media</h3>
                        
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
                                ) : formData.image && formData.image !== "/images/blogs/default.jpg" ? (
                                    <div className="flex flex-col items-center w-full">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={formData.image} alt="Cover Preview" className="w-full h-32 object-cover rounded-lg mb-3 shadow-sm border border-slate-200 dark:border-white/10" />
                                        <span className="text-xs text-slate-500 font-medium bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full truncate max-w-full">
                                            {formData.image.split('/').pop()}
                                        </span>
                                        <span className="text-xs text-cyan-600 mt-2 font-medium">Click or drag to replace image</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
                                        <div className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-1">
                                            <UploadCloud className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Drag & Drop image here</p>
                                        <p className="text-xs">or click to browse from your computer</p>
                                    </div>
                                )}
                            </div>

                            <div className="relative mt-3">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <ImageIcon className="h-4 w-4 text-slate-400" />
                                </div>
                                <input 
                                    type="text"
                                    name="image"
                                    required
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="Image URL"
                                    className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-500 dark:text-slate-400 text-xs"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                        <h3 className="font-semibold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-white/5">SEO & Meta</h3>
                        
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">SEO Title (Optional)</label>
                            <input 
                                type="text"
                                name="seoTitle"
                                value={formData.seoTitle}
                                onChange={handleChange}
                                placeholder="Optimized title for Google"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">SEO Description</label>
                            <textarea 
                                name="seoDescription"
                                value={formData.seoDescription}
                                onChange={handleChange}
                                placeholder="Meta description..."
                                className="w-full px-4 py-2 h-20 resize-none bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Reading Time</label>
                            <input 
                                type="text"
                                name="readingTime"
                                value={formData.readingTime}
                                onChange={handleChange}
                                placeholder="E.g. 8 min read"
                                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input 
                                    type="checkbox" 
                                    name="published"
                                    checked={formData.published}
                                    onChange={handleChange}
                                    className="peer sr-only" 
                                />
                                <div className="w-11 h-6 bg-slate-200 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Publish immediately</span>
                        </label>
                        
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input 
                                    type="checkbox" 
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                    className="peer sr-only" 
                                />
                                <div className="w-11 h-6 bg-slate-200 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Mark as Featured</span>
                        </label>
                    </div>

                </div>
            </div>
        </form>
    );
}
