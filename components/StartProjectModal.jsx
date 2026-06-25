"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle, ChevronDown } from "lucide-react";

export default function StartProjectModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        projectType: "",
        projectDetails: "",
    });
    
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState("");

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Optional: reset form after close (wait for exit animation)
            setTimeout(() => {
                if(status === "success") {
                    setStatus("idle");
                    setFormData({ name: "", email: "", projectType: "", projectDetails: "" });
                }
            }, 300);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen, status]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch("/api/project-inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus("success");
            } else {
                setStatus("error");
                setErrorMessage(data.message || "Failed to submit request.");
            }
        } catch {
            setStatus("error");
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                        className="relative w-full max-w-lg bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto"
                    >
                        {/* Glows */}
                        <div className="absolute top-0 inset-x-0 h-[200px] bg-gradient-to-b from-cyan-500/10 to-transparent dark:from-cyan-500/20 dark:to-transparent pointer-events-none" />
                        
                        <div className="relative p-6 sm:p-8">
                            <button 
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-white/10 transition-colors focus:outline-none"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {status === "success" ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle className="w-10 h-10 text-green-500 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Request Received!</h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm">
                                        Thank you for reaching out. Our technical team will review your project details and get back to you within 24 hours.
                                    </p>
                                    <button 
                                        onClick={onClose}
                                        className="px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors w-full"
                                    >
                                        Done
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="mb-8 pr-8">
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Start Your Project</h2>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">Tell us a bit about your requirements, and let's build something great together.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name</label>
                                                <input 
                                                    type="text" 
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all dark:text-white placeholder:text-slate-400 text-sm"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</label>
                                                <input 
                                                    type="email" 
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@company.com"
                                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all dark:text-white placeholder:text-slate-400 text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 relative">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Project Type</label>
                                            <div className="relative">
                                                <select 
                                                    name="projectType"
                                                    required
                                                    value={formData.projectType}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all dark:text-white appearance-none text-sm cursor-pointer"
                                                >
                                                    <option value="" disabled className="text-slate-400">Select an option...</option>
                                                    <option value="Enterprise Software">Enterprise Software</option>
                                                    <option value="Web Application">Web Application</option>
                                                    <option value="Mobile App">Mobile App</option>
                                                    <option value="AI / Machine Learning">AI / Machine Learning</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Project Details</label>
                                            <textarea 
                                                name="projectDetails"
                                                required
                                                value={formData.projectDetails}
                                                onChange={handleChange}
                                                placeholder="Briefly describe your goals, required features, or budget..."
                                                rows="4"
                                                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all dark:text-white placeholder:text-slate-400 text-sm resize-none"
                                            />
                                        </div>

                                        {status === "error" && (
                                            <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-lg">
                                                {errorMessage}
                                            </div>
                                        )}

                                        <button 
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                                        >
                                            {status === "loading" ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Sending Request...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="w-4 h-4 ml-1" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
