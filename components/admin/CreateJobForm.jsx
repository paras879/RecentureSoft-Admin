"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createJobOpening, updateJobOpening } from "@/app/admin/actions";

export default function CreateJobForm({ initialData = null }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    
    const [formData, setFormData] = useState(initialData ? { ...initialData } : {
        title: "",
        department: "",
        location: "",
        experience: "",
        jobType: "Full Time",
        description: "",
        status: true,
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
        setIsSubmitting(true);
        setError("");

        try {
            const res = initialData 
                ? await updateJobOpening(initialData._id, formData)
                : await createJobOpening(formData);

            if (res.success) {
                router.push("/admin/content/jobs");
                router.refresh();
            } else {
                setError(res.error);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto flex flex-col gap-6 pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/content/jobs" className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {initialData ? "Edit Job Opening" : "Create New Job Opening"}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {initialData ? "Update existing career listing details" : "Post a new position on the career page"}
                        </p>
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70"
                >
                    <Save className="w-4 h-4" /> 
                    {isSubmitting ? "Saving..." : "Save Job Opening"}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm">
                    {error}
                </div>
            )}

            <div className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-3">
                    Job Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Job Title *</label>
                        <input 
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Senior Frontend Developer"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Department *</label>
                        <input 
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Engineering, Marketing"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Location *</label>
                        <input 
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Noida, India (or Remote)"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Experience Required *</label>
                        <input 
                            type="text"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 2-5 Years"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Job Type</label>
                        <select 
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 justify-center pt-6">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                                type="checkbox"
                                name="status"
                                checked={formData.status}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 bg-slate-50 dark:bg-white/5"
                            />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Active (Visible on Website)</span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Job Description *</label>
                    <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="8"
                        placeholder="Detailed description of responsibilities, requirements, and benefits..."
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    ></textarea>
                </div>
            </div>
        </form>
    );
}
