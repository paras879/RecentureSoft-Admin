"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFaq, updateFaq } from "@/app/admin/actions";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function CreateFaqForm({ initialData = null }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const [formData, setFormData] = useState(initialData ? {
        ...initialData,
    } : {
        question: "",
        answer: "",
        order: 0,
        isActive: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = initialData 
                ? await updateFaq(initialData._id, formData)
                : await createFaq(formData);

            if (res.success) {
                router.push("/admin/content/faqs");
                router.refresh();
            } else {
                setError(res.error);
            }
        } catch (error) {
            console.error("FAQ submission error:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto flex flex-col gap-8 pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/content/faqs" className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {initialData ? "Edit FAQ" : "Create New FAQ"}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {initialData ? "Update the question or answer" : "Add a new frequently asked question"}
                        </p>
                    </div>
                </div>
                
                <button 
                    type="submit"
                    disabled={loading}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-cyan-500/25 flex items-center gap-2 disabled:opacity-70"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {initialData ? "Update FAQ" : "Save FAQ"}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-6">
                <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                    
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Question</label>
                        <input 
                            required
                            type="text"
                            name="question"
                            value={formData.question}
                            onChange={handleChange}
                            placeholder="e.g., What services do you offer?"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white font-medium"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Answer</label>
                        <textarea 
                            required
                            name="answer"
                            value={formData.answer}
                            onChange={handleChange}
                            placeholder="Provide a detailed answer here..."
                            className="w-full px-4 py-3 h-32 resize-y bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Display Order</label>
                            <input 
                                type="number"
                                name="order"
                                value={formData.order}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                            />
                            <p className="text-xs text-slate-500">Lower numbers appear first (e.g. 0, 1, 2)</p>
                        </div>

                        <div className="flex flex-col justify-center pt-5">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input 
                                        type="checkbox" 
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleChange}
                                        className="peer sr-only" 
                                    />
                                    <div className="w-11 h-6 bg-slate-200 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                                </div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Visible on Website</span>
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
}
