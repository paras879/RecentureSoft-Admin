"use client";

import { X } from "lucide-react";

export default function BlogViewModal({ isOpen, onClose, blog }) {
    if (!isOpen || !blog) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Blog Details</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="space-y-6">
                        {blog.image && (
                            <div className="w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Title</label>
                                <div className="text-slate-900 dark:text-white font-semibold">{blog.title}</div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Category</label>
                                <div className="text-cyan-600 dark:text-cyan-400">{blog.category}</div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Status</label>
                                <div>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${blog.published ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300'}`}>
                                        {blog.published ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Date Created</label>
                                <div className="text-slate-900 dark:text-white">{blog.date}</div>
                            </div>
                        </div>

                        {blog.tags && blog.tags.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Tags</label>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300 rounded-full text-xs font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {blog.excerpt && (
                            <div>
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Excerpt</label>
                                <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                    {blog.excerpt}
                                </p>
                            </div>
                        )}

                        {blog.content && (
                            <div>
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Content</label>
                                <div 
                                    className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 overflow-x-auto"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                />
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors text-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
