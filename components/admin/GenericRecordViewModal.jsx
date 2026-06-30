"use client";

import { X } from "lucide-react";

export default function GenericRecordViewModal({ isOpen, onClose, record, title = "Record Details" }) {
    if (!isOpen || !record) return null;

    const renderValue = (key, value) => {
        if (value === null || value === undefined || value === "") return <span className="text-slate-400">N/A</span>;
        
        // Handle Booleans (Status/Published)
        if (typeof value === "boolean") {
            return (
                <span className={`px-2 py-1 rounded text-xs font-medium ${value ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300'}`}>
                    {value ? 'Yes/Active' : 'No/Inactive'}
                </span>
            );
        }

        // Handle Arrays (Tags, Technologies, Features, Gallery Photos)
        if (Array.isArray(value)) {
            if (value.length === 0) return <span className="text-slate-400">None</span>;
            
            // Check if it's an array of image URLs (Cloudinary or extensions)
            const isImageArray = value.every(item => typeof item === "string" && (item.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) || item.includes("cloudinary.com") || item.includes("res.cloudinary.com")));
            
            if (isImageArray) {
                return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                        {value.map((url, idx) => (
                            <div key={idx} className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-white/10">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={url} alt={`Gallery ${idx+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                            </div>
                        ))}
                    </div>
                );
            }

            return (
                <div className="flex flex-wrap gap-2">
                    {value.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300 rounded-full text-xs font-medium">
                            {String(item)}
                        </span>
                    ))}
                </div>
            );
        }

        // Handle Images/Resume URLs
        if (typeof value === "string" && (key.toLowerCase().includes("image") || key.toLowerCase().includes("resume") || key.toLowerCase().includes("url"))) {
            if (value.startsWith("http") || value.startsWith("/")) {
                if (value.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i)) {
                    return (
                        <div className="w-full max-w-sm rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={value} alt="Preview" className="w-full h-auto object-cover" />
                        </div>
                    );
                }
                return (
                    <a href={value} target="_blank" rel="noreferrer" className="text-cyan-600 hover:underline break-all">
                        {value}
                    </a>
                );
            }
        }

        // Handle long text (Descriptions, Messages, Content)
        if (typeof value === "string" && value.length > 100) {
            // Check if it looks like HTML
            const hasHTML = /<[a-z][\s\S]*>/i.test(value);
            if (hasHTML) {
                return (
                    <div 
                        className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 overflow-x-auto"
                        dangerouslySetInnerHTML={{ __html: value }}
                    />
                );
            }
            return (
                <div className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 whitespace-pre-wrap">
                    {value}
                </div>
            );
        }

        // Default string/number
        return <div className="text-slate-900 dark:text-white font-medium break-words">{String(value)}</div>;
    };

    const formatLabel = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1') // insert a space before all caps
            .replace(/^./, str => str.toUpperCase()); // uppercase the first character
    };

    // Filter out _id, __v and empty internal keys
    const displayEntries = Object.entries(record).filter(([k, v]) => !["_id", "__v"].includes(k));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="flex flex-col gap-6">
                        {/* Display regular short fields in a grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {displayEntries.filter(([k, v]) => typeof v !== "string" || v.length <= 100).map(([key, value]) => (
                                <div key={key} className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400">{formatLabel(key)}</label>
                                    <div>{renderValue(key, value)}</div>
                                </div>
                            ))}
                        </div>

                        {/* Display long text fields and arrays below */}
                        {displayEntries.filter(([k, v]) => (typeof v === "string" && v.length > 100)).map(([key, value]) => (
                            <div key={key} className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">{formatLabel(key)}</label>
                                <div>{renderValue(key, value)}</div>
                            </div>
                        ))}
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
