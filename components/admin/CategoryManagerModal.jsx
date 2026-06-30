"use client";

import { useState, useEffect } from "react";
import { X, Edit2, Trash2, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CategoryManagerModal({ isOpen, onClose }) {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState("");
    const [adding, setAdding] = useState(false);
    
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/blog-categories");
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (e) {
            console.error("Failed to fetch categories", e);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;
        setAdding(true);
        try {
            const res = await fetch("/api/admin/blog-categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newCategory })
            });
            if (res.ok) {
                const { category } = await res.json();
                setCategories([...categories, category]);
                setNewCategory("");
                router.refresh();
            } else {
                const err = await res.json();
                alert(err.error || "Failed to add category");
            }
        } catch (e) {
            console.error(e);
            alert("Error adding category");
        } finally {
            setAdding(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            const res = await fetch(`/api/admin/blog-categories/${id}`, { method: "DELETE" });
            if (res.ok) {
                setCategories(categories.filter(c => c._id !== id));
                router.refresh();
            } else {
                alert("Failed to delete category");
            }
        } catch (e) {
            console.error(e);
            alert("Error deleting category");
        }
    };

    const startEdit = (cat) => {
        setEditingId(cat._id);
        setEditValue(cat.name);
    };

    const handleSaveEdit = async (id) => {
        if (!editValue.trim()) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/blog-categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: editValue })
            });
            if (res.ok) {
                const { category } = await res.json();
                setCategories(categories.map(c => c._id === id ? category : c));
                setEditingId(null);
                router.refresh();
            } else {
                const err = await res.json();
                alert(err.error || "Failed to update category");
            }
        } catch (e) {
            console.error(e);
            alert("Error updating category");
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
            <div className="bg-white dark:bg-[#0f172a] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col max-h-[85vh]">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Manage Categories</h2>
                    <button onClick={onClose} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Add New */}
                <div className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
                    <form onSubmit={handleAdd} className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="New category name..."
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-500/50"
                        />
                        <button 
                            type="submit" 
                            disabled={adding || !newCategory.trim()}
                            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                        >
                            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            Add
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-2">
                    {loading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="w-6 h-6 text-cyan-500 animate-spin" />
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="text-center p-8 text-slate-500 text-sm">
                            No categories found. Add one above.
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-1 p-2">
                            {categories.map(cat => (
                                <li key={cat._id} className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                    {editingId === cat._id ? (
                                        <div className="flex items-center gap-2 flex-1 mr-4">
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-cyan-500/50 rounded-lg text-sm outline-none"
                                                autoFocus
                                                onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(cat._id)}
                                            />
                                            <button onClick={() => handleSaveEdit(cat._id)} disabled={saving} className="text-xs px-3 py-1.5 bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300 font-medium rounded-lg hover:bg-cyan-200 dark:hover:bg-cyan-500/30">
                                                Save
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-white/20">
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">{cat.name}</span>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => startEdit(cat)} className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors" title="Edit">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(cat._id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>
    );
}
