"use client";

import React, { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function ImageUploader({ value, onChange, label = "Upload Image", className = "" }) {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'recenturesoft_upload');

            const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgsebwvvs'}/image/upload`, {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            if (res.ok && data.secure_url) {
                onChange(data.secure_url);
            } else {
                console.error("Upload failed", data);
                const errMsg = data.error?.message || "Failed to upload image. Please try again.";
                alert(`Upload Error: ${errMsg}`);
            }
        } catch (error) {
            console.error("Upload error", error);
            alert(`An error occurred while uploading: ${error.message}`);
        } finally {
            setIsUploading(false);
            e.target.value = null;
        }
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
            
            {value ? (
                <div className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-video bg-slate-100 dark:bg-slate-800">
                    <Image src={value} alt="Uploaded" fill sizes="300px" className="object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <label className="cursor-pointer p-2 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-sm transition-colors text-white">
                            <Upload className="w-5 h-5" />
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                        </label>
                        <button 
                            type="button" 
                            onClick={() => onChange("")} 
                            className="p-2 bg-red-500/80 hover:bg-red-500 rounded-full backdrop-blur-sm transition-colors text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    {isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                    )}
                </div>
            ) : (
                <label className="relative cursor-pointer flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-6 aspect-video">
                    {isUploading ? (
                        <>
                            <Loader2 className="w-8 h-8 text-cyan-500 animate-spin mb-2" />
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Uploading...</span>
                        </>
                    ) : (
                        <>
                            <div className="p-3 bg-white dark:bg-slate-700 rounded-full shadow-sm mb-1">
                                <ImageIcon className="w-6 h-6 text-slate-400 dark:text-slate-300" />
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Click to upload image</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG up to 10MB</span>
                        </>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                </label>
            )}
        </div>
    );
}
