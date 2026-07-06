"use client";

import { useState } from "react";
import { Loader2, UploadCloud, Image as ImageIcon } from "lucide-react";

export default function ImageUploader({ value, onChange, label = "Cover Image" }) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleImageUpload = async (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file (JPEG, PNG, WEBP).');
            return;
        }
        
        setUploadingImage(true);
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'recenturesoft_upload');
        uploadData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgsebwvvs');
        
        try {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgsebwvvs';
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: uploadData
            });
            const data = await res.json();
            
            if (data.secure_url) {
                onChange(data.secure_url);
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

    return (
        <div className="space-y-1.5">
            {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
            
            <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center p-4 md:p-6 border-2 border-dashed rounded-xl transition-colors cursor-pointer overflow-hidden ${isDragging ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-500/10' : 'border-slate-300 dark:border-slate-600 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
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
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <span className="text-sm font-medium">Uploading to Cloudinary...</span>
                    </div>
                ) : value ? (
                    <div className="flex flex-col items-center w-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={value} alt="Preview" className="w-full max-h-40 object-cover rounded-lg mb-3 shadow-sm border border-slate-200 dark:border-slate-700" />
                        <span className="text-xs text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full truncate max-w-full">
                            {value.split('/').pop()}
                        </span>
                        <span className="text-xs text-cyan-600 dark:text-cyan-400 mt-2 font-medium">Click or drag to replace image</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400 py-4">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-1">
                            <UploadCloud className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Drag & Drop image here</p>
                        <p className="text-xs">or click to browse from your computer</p>
                    </div>
                )}
            </div>

            <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                    type="text"
                    required
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Or paste direct Cloudinary URL"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:border-cyan-500 outline-none text-slate-600 dark:text-slate-300 text-sm"
                />
            </div>
        </div>
    );
}
