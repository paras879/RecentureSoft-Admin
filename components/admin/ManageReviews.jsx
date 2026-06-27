"use client";

import { useState, useEffect } from "react";
import { Trash2, Edit2, Plus, X, Loader2, UploadCloud } from "lucide-react";

export default function ManageReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        company: '',
        rating: 5,
        avatar: '',
        text: ''
    });
    
    const fetchReviews = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/reviews');
            const data = await res.json();
            if (Array.isArray(data)) {
                setReviews(data);
            }
        } catch(e) {
            console.error("Error fetching reviews:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value) : value }));
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
                setFormData(prev => ({ ...prev, avatar: data.secure_url }));
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

    const handleOpenModal = (review = null) => {
        if (review) {
            setEditId(review._id);
            setFormData({
                name: review.name,
                role: review.role,
                company: review.company,
                rating: review.rating,
                avatar: review.avatar,
                text: review.text
            });
        } else {
            setEditId(null);
            setFormData({ name: '', role: '', company: '', rating: 5, avatar: '', text: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editId ? `/api/reviews/${editId}` : '/api/reviews';
            const method = editId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (res.ok) {
                fetchReviews();
                setIsModalOpen(false);
                setEditId(null);
                setFormData({ name: '', role: '', company: '', rating: 5, avatar: '', text: '' });
            } else {
                alert(`Failed to ${editId ? 'update' : 'add'} review.`);
            }
        } catch (error) {
            console.error(`Error ${editId ? 'updating' : 'adding'} review:`, error);
            alert(`Error ${editId ? 'updating' : 'adding'} review.`);
        }
    };

    const handleDelete = async (id, name) => {
        if (!confirm(`Are you sure you want to delete the review by ${name}?`)) return;
        try {
            const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchReviews();
            } else {
                alert("Failed to delete review.");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Existing Reviews</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage what clients say about RecentureSoft.</p>
                    </div>
                    <button 
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl transition-colors text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" /> Add Review
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-white/10 text-sm text-slate-500 dark:text-slate-400">
                                <th className="pb-3 font-medium">Photo</th>
                                <th className="pb-3 font-medium">Name</th>
                                <th className="pb-3 font-medium">Role</th>
                                <th className="pb-3 font-medium">Company</th>
                                <th className="pb-3 font-medium">Rating</th>
                                <th className="pb-3 font-medium">Review Text</th>
                                <th className="pb-3 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="7" className="py-8 text-center text-sm text-slate-500">Loading reviews...</td></tr>
                            ) : reviews.length === 0 ? (
                                <tr><td colSpan="7" className="py-8 text-center text-sm text-slate-500">No reviews found.</td></tr>
                            ) : (
                                reviews.map(review => (
                                    <tr key={review._id} className="border-b border-slate-100 dark:border-white/5 last:border-0 group">
                                        <td className="py-4">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-white/10">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="text-sm text-slate-900 dark:text-white font-medium">{review.name}</div>
                                        </td>
                                        <td className="py-4">
                                            <div className="text-sm text-slate-600 dark:text-slate-300">{review.role}</div>
                                        </td>
                                        <td className="py-4">
                                            <div className="text-sm text-slate-600 dark:text-slate-300">{review.company}</div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex gap-0.5">
                                                {Array.from({ length: review.rating }).map((_, i) => (
                                                    <svg key={i} className="w-4 h-4 text-cyan-500 fill-current" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 max-w-xs">{review.text}</p>
                                        </td>
                                        <td className="py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleOpenModal(review)}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors focus:opacity-100"
                                                    title="Edit Review"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(review._id, review.name)}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors focus:opacity-100"
                                                    title="Delete Review"
                                                >
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
            </div>

            {/* Add/Edit Review Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {editId ? 'Edit Review' : 'Add New Review'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Author Name</label>
                                <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 text-sm dark:text-white" placeholder="John Doe" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
                                    <input required name="role" value={formData.role} onChange={handleChange} type="text" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 text-sm dark:text-white" placeholder="CEO" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company</label>
                                    <input required name="company" value={formData.company} onChange={handleChange} type="text" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 text-sm dark:text-white" placeholder="Acme Corp" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Author Photo</label>
                                <div 
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`relative flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl transition-colors cursor-pointer overflow-hidden ${isDragging ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-500/10' : 'border-slate-300 dark:border-white/20 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
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
                                    ) : formData.avatar ? (
                                        <div className="flex flex-col items-center w-full">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={formData.avatar} alt="Preview" className="w-16 h-16 object-cover rounded-full mb-2 shadow-sm border border-slate-200 dark:border-white/10" />
                                            <span className="text-xs text-slate-500 font-medium bg-slate-100 dark:bg-white/10 px-2 py-1 rounded-full truncate max-w-full">
                                                {formData.avatar.split('/').pop()}
                                            </span>
                                            <span className="text-xs text-cyan-600 mt-1 font-medium">Click or drag to replace</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 py-2">
                                            <UploadCloud className="w-6 h-6 text-slate-600 dark:text-slate-300 mb-1" />
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Drag & Drop photo</p>
                                            <p className="text-xs">or click to browse</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rating (1-5)</label>
                                <input required name="rating" value={formData.rating} onChange={handleChange} type="number" min="1" max="5" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 text-sm dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Review Text</label>
                                <textarea required name="text" value={formData.text} onChange={handleChange} rows="4" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 text-sm dark:text-white" placeholder="Great service..."></textarea>
                            </div>
                            <div className="pt-2">
                                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2.5 rounded-xl transition-colors">
                                    {editId ? 'Update Review' : 'Save Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
